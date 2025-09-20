from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
import logging
from pathlib import Path
from typing import List, Optional, Dict, Any
import uuid
import jwt
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
import bcrypt
from datetime import datetime, timedelta, timezone
import re
import json

# Import our modules
from database import connect_to_database, close_database_connection, get_database, is_using_supabase
from supabase_config import get_supabase_client

# Load environment variables first
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Add imports for dynamic prompt generation
import sys
sys.path.append('.')
from prompt_enhancer import DynamicPromptGenerator, LLMService
from models import (
    User, UserCreate, UserLogin, UserUpdate,
    AnalyticsEvent, AnalyticsEventCreate,
    UserSession, Prompt, PromptCreate, PromptGenerate,
    DailyMetrics, DataExportRequest, DataDeletionRequest
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Security
security = HTTPBearer()

# Initialize services
llm_service = LLMService()
dynamic_generator = DynamicPromptGenerator(llm_service)

# Database lifecycle
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_database()
    yield
    # Shutdown
    await close_database_connection()

# Create FastAPI app
app = FastAPI(
    title="PromptPilot API",
    description="Advanced AI Prompt Engineering Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Router
api_router = APIRouter(prefix="/api")

# Authentication helpers
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user_id
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_current_user(user_id: str = Depends(verify_token)) -> User:
    db = get_database()
    
    if is_using_supabase():
        user_data = await db.get_user_by_id(user_id)
    else:
        user_data = db.users.get(user_id)
    
    if user_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return User(**user_data)

# Basic Routes
@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    db_status = await check_database_health()
    return {
        "status": "healthy",
        "database": db_status,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@api_router.post("/register")
async def register(user_data: UserCreate):
    """Register a new user"""
    db = get_database()
    
    # Check if user already exists
    if is_using_supabase():
        existing_user = await db.get_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
    else:
        # In-memory database check
        for existing_user in db.users.values():
            if existing_user["email"] == user_data.email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
    
    # Hash password
    hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())
    
    # Create user
    user = User(
        id=str(uuid.uuid4()),
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_password.decode('utf-8'),
        is_active=True,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    
    # Save to database
    if is_using_supabase():
        await db.create_user(user.model_dump())
    else:
        db.users[user.id] = user.model_dump()
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }
    }

@api_router.post("/login")
async def login(user_data: UserLogin):
    """Login user"""
    db = get_database()
    
    # Find user
    if is_using_supabase():
        user_doc = await db.get_user_by_email(user_data.email)
    else:
        # In-memory database search
        user_doc = None
        for user_id, user_data_stored in db.users.items():
            if user_data_stored["email"] == user_data.email:
                user_doc = user_data_stored
                break
    
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    user = User(**user_doc)
    
    # Verify password
    if not bcrypt.checkpw(user_data.password.encode('utf-8'), user.hashed_password.encode('utf-8')):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }
    }

@api_router.get("/profile")
async def get_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    return {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
        "created_at": current_user.created_at,
        "is_active": current_user.is_active
    }

@api_router.post("/prompts/generate")
async def generate_prompt(request: PromptGenerate, current_user: User = Depends(get_current_user)):
    """Dynamic prompt generation using LLM-based enhancement"""
    try:
        start_time = datetime.now()
        
        # Generate prompts based on mode
        if request.mode == 'sniper':
            quick_prompt, llm_used = await dynamic_generator.generate_sniper_prompt(
                request.user_input, 
                include_examples=getattr(request, 'include_examples', True)
            )
            professional_prompt = quick_prompt  # Same for sniper mode
        else:  # titan mode
            professional_prompt, llm_used = await dynamic_generator.generate_titan_prompt(
                request.user_input,
                include_examples=getattr(request, 'include_examples', True),
                validation_level=getattr(request, 'validation_level', 'standard')
            )
            quick_prompt = professional_prompt  # Same for titan mode
        
        # Generate suggestions
        suggestions = await dynamic_generator.generate_suggestions(request.user_input, request.mode)
        
        processing_time = (datetime.now() - start_time).total_seconds() * 1000
        
        # Create prompt record
        prompt = Prompt(
            id=str(uuid.uuid4()),
            user_id=current_user.id,
            raw_input=request.user_input,
            generated_output=quick_prompt if request.mode == 'sniper' else professional_prompt,
            detected_role="Dynamic AI Assistant",
            persona="Expert Assistant",
            source="dynamic_generation",
            analytics={
                "input_length": len(request.user_input),
                "output_length": len(quick_prompt if request.mode == 'sniper' else professional_prompt),
                "processing_time": processing_time,
                "mode_used": request.mode,
                "llm_used": llm_used
            },
            created_at=datetime.now(timezone.utc)
        )
        
        # Save to database
        try:
            db = get_database()
            if is_using_supabase():
                await db.create_prompt(prompt.model_dump())
            else:
                db.prompts[prompt.id] = prompt.model_dump()
        except Exception as db_error:
            logger.warning(f"Database save failed: {db_error}")
        
        return {
            "quick_prompt": quick_prompt,
            "professional_prompt": professional_prompt,
            "metadata": {
                "detected_intent": {"name": "dynamic", "slug": "dynamic"},
                "assigned_persona": {"name": "Dynamic AI Assistant", "slug": "dynamic"},
                "confidence_score": 0.9,
                "processing_time": processing_time,
                "validation_passed": True,
                "llm_used": llm_used
            },
            "suggestions": suggestions,
            "source": "dynamic_generation"
        }
        
    except Exception as e:
        logger.error(f"Prompt generation failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prompt generation failed: {str(e)}"
        )

@api_router.get("/prompts")
async def get_prompts(current_user: User = Depends(get_current_user)):
    """Get user's prompts"""
    db = get_database()
    
    if is_using_supabase():
        user_prompts = await db.get_user_prompts(current_user.id, limit=50)
    else:
        user_prompts = [prompt for prompt in db.prompts.values() if prompt["user_id"] == current_user.id]
        # Sort by created_at descending and limit to 50
        user_prompts.sort(key=lambda x: x["created_at"], reverse=True)
        user_prompts = user_prompts[:50]
    
    return user_prompts

@api_router.get("/database/status")
async def get_database_status(current_user: User = Depends(get_current_user)):
    """Get database status"""
    db = get_database()
    
    if is_using_supabase():
        return {
            "database_type": "supabase",
            "connected": db.is_connected(),
            "status": "connected" if db.is_connected() else "disconnected",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    else:
        return {
            "database_type": "in_memory",
            "connected": True,
            "status": "connected",
            "users_count": len(db.users),
            "prompts_count": len(db.prompts),
            "timestamp": datetime.now(timezone.utc).isoformat()
        }

# Include API router
app.include_router(api_router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "PromptPilot API", "status": "running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)