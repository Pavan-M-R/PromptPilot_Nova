from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import asyncio
import json
import logging
from datetime import datetime
import os
from enum import Enum

# LLM Client imports
import google.generativeai as genai
from openai import AsyncOpenAI
import anthropic

# Database imports
from supabase_config import get_supabase_client

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Prompt Enhancer API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class IntentType(str, Enum):
    CODING = "coding"
    WRITING = "writing"
    CREATIVITY = "creativity"
    PROBLEM_SOLVING = "problem_solving"
    ANALYSIS = "analysis"
    DEBUGGING = "debugging"
    REFACTORING = "refactoring"
    DOCUMENTATION = "documentation"
    BRAINSTORMING = "brainstorming"
    GENERAL = "general"

class PromptRequest(BaseModel):
    user_prompt: str
    user_id: Optional[str] = None
    context: Optional[str] = None

class EnhancedPromptResponse(BaseModel):
    original_prompt: str
    enhanced_prompt: str
    detected_intent: IntentType
    assigned_role: str
    llm_response: str
    processing_time: float
    llm_used: str
    session_id: str

class GeneratePromptRequest(BaseModel):
    user_input: str
    mode: str  # "sniper" or "titan"
    include_rag: Optional[bool] = False
    validation_level: Optional[str] = "standard"
    include_examples: Optional[bool] = True
    include_clarifications: Optional[bool] = True

class GeneratePromptResponse(BaseModel):
    quick_prompt: Optional[str] = None
    professional_prompt: Optional[str] = None
    suggestions: Optional[Dict[str, Any]] = None
    processing_time: float
    llm_used: str

class LLMProvider(str, Enum):
    GEMINI = "gemini"
    OPENAI = "openai"
    CLAUDE = "claude"

# LLM Configuration
class LLMConfig:
    def __init__(self):
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.claude_api_key = os.getenv("CLAUDE_API_KEY")
        
        # Initialize clients
        if self.gemini_api_key:
            genai.configure(api_key=self.gemini_api_key)
        
        self.openai_client = AsyncOpenAI(api_key=self.openai_api_key) if self.openai_api_key else None
        self.claude_client = anthropic.AsyncAnthropic(api_key=self.claude_api_key) if self.claude_api_key else None

llm_config = LLMConfig()

# Intent Recognition System
class IntentRecognizer:
    def __init__(self):
        self.intent_patterns = {
            IntentType.CODING: [
                "write code", "function", "class", "algorithm", "programming", "script",
                "implement", "code for", "python", "javascript", "java", "c++", "sql"
            ],
            IntentType.DEBUGGING: [
                "debug", "fix bug", "error", "not working", "issue", "problem with code",
                "troubleshoot", "exception", "stack trace"
            ],
            IntentType.REFACTORING: [
                "refactor", "optimize", "improve code", "clean up", "restructure",
                "make better", "performance"
            ],
            IntentType.WRITING: [
                "write", "article", "blog", "essay", "content", "copy", "text",
                "documentation", "manual", "guide", "tutorial"
            ],
            IntentType.CREATIVITY: [
                "creative", "brainstorm", "ideas", "innovative", "design", "concept",
                "imagine", "story", "creative writing"
            ],
            IntentType.PROBLEM_SOLVING: [
                "solve", "solution", "how to", "strategy", "approach", "method",
                "calculate", "math", "logic", "puzzle"
            ],
            IntentType.ANALYSIS: [
                "analyze", "review", "evaluate", "assess", "compare", "examine",
                "study", "research", "investigate"
            ]
        }
    
    async def detect_intent_with_llm(self, user_prompt: str) -> IntentType:
        """Use LLM to detect intent when pattern matching is insufficient"""
        intent_prompt = f"""
        Analyze the following user prompt and classify it into one of these categories:
        - coding: Code generation, programming tasks
        - debugging: Fixing bugs, troubleshooting code issues
        - refactoring: Code optimization, improvement, restructuring
        - writing: Content creation, documentation, articles
        - creativity: Brainstorming, creative ideas, design concepts
        - problem_solving: Mathematical problems, logical puzzles, strategic solutions
        - analysis: Data analysis, review, evaluation, comparison
        - general: General questions or tasks that don't fit other categories
        
        User prompt: "{user_prompt}"
        
        Respond with only the category name (one word).
        """
        
        try:
            # Try Gemini first
            if llm_config.gemini_api_key:
                model = genai.GenerativeModel('gemini-2.5-pro')
                response = await asyncio.to_thread(model.generate_content, intent_prompt)
                intent_str = response.text.strip().lower()
                
                # Map response to IntentType
                for intent in IntentType:
                    if intent.value in intent_str:
                        return intent
            
            return IntentType.GENERAL
        except Exception as e:
            logger.error(f"LLM intent detection failed: {e}")
            return IntentType.GENERAL
    
    async def detect_intent(self, user_prompt: str) -> IntentType:
        """Detect user intent from prompt"""
        prompt_lower = user_prompt.lower()
        
        # Pattern-based detection first
        intent_scores = {}
        for intent, patterns in self.intent_patterns.items():
            score = sum(1 for pattern in patterns if pattern in prompt_lower)
            if score > 0:
                intent_scores[intent] = score
        
        if intent_scores:
            # Return intent with highest score
            return max(intent_scores, key=intent_scores.get)
        
        # Fallback to LLM-based detection
        return await self.detect_intent_with_llm(user_prompt)

# Role Assignment System
# RoleAssigner class removed - now using dynamic LLM-based role generation

# MasterPromptConstructor class removed - now using dynamic LLM-based prompt generation

# LLM Service with Fallback
class LLMService:
    def __init__(self):
        self.providers = [LLMProvider.GEMINI, LLMProvider.OPENAI, LLMProvider.CLAUDE]
    
    async def call_gemini(self, prompt: str) -> str:
        """Call Gemini API"""
        if not llm_config.gemini_api_key:
            raise Exception("Gemini API key not configured")
        
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = await asyncio.to_thread(model.generate_content, prompt)
        return response.text
    
    async def call_openai(self, prompt: str) -> str:
        """Call OpenAI API"""
        if not llm_config.openai_client:
            raise Exception("OpenAI API key not configured")
        
        response = await llm_config.openai_client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=4000,
            temperature=0.7
        )
        return response.choices[0].message.content
    
    async def call_claude(self, prompt: str) -> str:
        """Call Claude API"""
        if not llm_config.claude_client:
            raise Exception("Claude API key not configured")
        
        response = await llm_config.claude_client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=4000,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return response.content[0].text
    
    async def generate_with_fallback(self, prompt: str) -> tuple[str, str]:
        """Generate response with fallback system"""
        last_error = None
        
        for provider in self.providers:
            try:
                logger.info(f"Trying {provider.value}...")
                
                if provider == LLMProvider.GEMINI:
                    response = await self.call_gemini(prompt)
                elif provider == LLMProvider.OPENAI:
                    response = await self.call_openai(prompt)
                elif provider == LLMProvider.CLAUDE:
                    response = await self.call_claude(prompt)
                
                logger.info(f"Successfully generated response using {provider.value}")
                return response, provider.value
                
            except Exception as e:
                logger.warning(f"{provider.value} failed: {str(e)}")
                last_error = e
                continue
        
        # If all providers fail
        raise HTTPException(
            status_code=503,
            detail=f"All LLM providers failed. Last error: {str(last_error)}"
        )

# Database Service
class DatabaseService:
    def __init__(self):
        self.supabase = None
    
    async def initialize(self):
        """Initialize the database connection"""
        if self.supabase is None:
            self.supabase = await get_supabase_client()
    
    async def log_prompt_session(self, session_data: dict) -> str:
        """Log prompt session to database"""
        try:
            await self.initialize()
            result = self.supabase.table('prompt_sessions').insert(session_data).execute()
            return result.data[0]['id'] if result.data else None
        except Exception as e:
            logger.error(f"Database logging failed: {e}")
            return None
    
    async def get_user_sessions(self, user_id: str, limit: int = 10) -> List[dict]:
        """Get user's recent prompt sessions"""
        try:
            await self.initialize()
            result = self.supabase.table('prompt_sessions').select('*').eq('user_id', user_id).order('created_at', desc=True).limit(limit).execute()
            return result.data
        except Exception as e:
            logger.error(f"Failed to fetch user sessions: {e}")
            return []

# Dynamic Prompt Generator using LLM API
class DynamicPromptGenerator:
    def __init__(self, llm_service):
        self.llm_service = llm_service
    
    async def generate_sniper_prompt(self, user_input: str, include_examples: bool = True) -> tuple[str, str]:
        """Generate a concise, focused prompt using LLM API"""
        generation_prompt = f"""
You are an expert prompt engineer. Create a CONCISE, FOCUSED prompt for the following user request.

User Request: "{user_input}"

Generate a SHORT, PRECISE prompt (50-150 words) that:
- Gets straight to the point
- Includes essential context only
- Uses clear, direct language
- Focuses on immediate actionable results
- Avoids unnecessary elaboration

{"Include 1-2 brief examples if helpful." if include_examples else "Do not include examples."}

Return ONLY the generated prompt, no explanations or meta-commentary.
"""
        
        response, llm_used = await self.llm_service.generate_with_fallback(generation_prompt)
        return response.strip(), llm_used
    
    async def generate_titan_prompt(self, user_input: str, include_examples: bool = True, validation_level: str = "standard") -> tuple[str, str]:
        """Generate a comprehensive, structured prompt using LLM API"""
        validation_instructions = {
            "minimal": "Include basic validation steps.",
            "standard": "Include thorough validation and error checking.",
            "strict": "Include comprehensive validation, edge cases, and quality assurance steps."
        }
        
        generation_prompt = f"""
You are an expert prompt engineer. Create a COMPREHENSIVE, PROFESSIONAL prompt for the following user request.

User Request: "{user_input}"

Generate a DETAILED, STRUCTURED prompt (300-800 words) that includes:

1. **Clear Role Definition**: Specify the AI's expertise and perspective
2. **Detailed Task Description**: Break down what needs to be accomplished
3. **Context and Background**: Provide relevant background information
4. **Specific Requirements**: List clear, actionable requirements
5. **Output Format**: Specify the desired structure and format
6. **Quality Guidelines**: Include standards for excellence
7. **Constraints and Considerations**: Mention limitations or special considerations
{"8. **Examples**: Provide relevant examples to illustrate expectations" if include_examples else ""}

Validation Level: {validation_level}
{validation_instructions.get(validation_level, "")}

Create a prompt that ensures high-quality, comprehensive results. Use professional language and clear structure.

Return ONLY the generated prompt, no explanations or meta-commentary.
"""
        
        response, llm_used = await self.llm_service.generate_with_fallback(generation_prompt)
        return response.strip(), llm_used
    
    async def generate_suggestions(self, user_input: str, mode: str) -> Dict[str, Any]:
        """Generate suggestions and insights using LLM API"""
        suggestion_prompt = f"""
Analyze the following user request and provide helpful insights:

User Request: "{user_input}"
Mode: {mode}

Provide a JSON response with:
1. "clarifying_questions": Array of 2-3 questions that could help refine the request
2. "assumptions_made": Array of 2-3 assumptions you're making about the request
3. "improvement_tips": Array of 2-3 tips for better results

Return ONLY valid JSON, no explanations.
"""
        
        try:
            response, _ = await self.llm_service.generate_with_fallback(suggestion_prompt)
            # Try to parse JSON, fallback to structured format if parsing fails
            import json
            return json.loads(response.strip())
        except:
            # Fallback to basic suggestions if JSON parsing fails
            return {
                "clarifying_questions": [
                    "What specific outcome are you looking for?",
                    "Are there any constraints or requirements I should know about?"
                ],
                "assumptions_made": [
                    "Assuming you want a comprehensive response",
                    "Assuming standard quality expectations"
                ],
                "improvement_tips": [
                    "Provide more specific context for better results",
                    "Consider breaking complex requests into smaller parts"
                ]
            }

# Initialize services
intent_recognizer = IntentRecognizer()
llm_service = LLMService()
db_service = DatabaseService()
dynamic_generator = DynamicPromptGenerator(llm_service)

# API Endpoints
@app.post("/enhance-prompt", response_model=EnhancedPromptResponse)
async def enhance_prompt(request: PromptRequest):
    """Main endpoint to enhance user prompts"""
    start_time = datetime.now()
    session_id = f"session_{int(start_time.timestamp())}_{hash(request.user_prompt) % 10000}"
    
    try:
        # Step 1: Detect intent
        logger.info(f"Processing prompt: {request.user_prompt[:100]}...")
        detected_intent = await intent_recognizer.detect_intent(request.user_prompt)
        logger.info(f"Detected intent: {detected_intent}")
        
        # Step 2: Generate enhanced prompt using dynamic generator
        enhanced_prompt, llm_used = await dynamic_generator.generate_sniper_prompt(
            request.user_prompt, 
            include_examples=True
        )
        
        # Step 3: Generate response with the enhanced prompt
        llm_response, response_llm = await llm_service.generate_with_fallback(enhanced_prompt)
        
        # Step 4: Calculate processing time
        processing_time = (datetime.now() - start_time).total_seconds()
        
        # Step 5: Prepare response
        response = EnhancedPromptResponse(
            original_prompt=request.user_prompt,
            enhanced_prompt=enhanced_prompt,
            detected_intent=detected_intent,
            assigned_role="Dynamic AI Assistant",  # Dynamic role assignment
            llm_response=llm_response,
            processing_time=processing_time,
            llm_used=llm_used,
            session_id=session_id
        )
        
        # Step 6: Log to database
        session_data = {
            'session_id': session_id,
            'user_id': request.user_id,
            'original_prompt': request.user_prompt,
            'enhanced_prompt': enhanced_prompt,
            'detected_intent': detected_intent.value,
            'assigned_role': response.assigned_role,
            'llm_response': llm_response,
            'llm_used': llm_used,
            'processing_time': processing_time,
            'context': request.context,
            'created_at': start_time.isoformat()
        }
        
        await db_service.log_prompt_session(session_data)
        logger.info(f"Session {session_id} completed successfully")
        
        return response
        
    except Exception as e:
        logger.error(f"Error processing prompt: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/prompts/generate", response_model=GeneratePromptResponse)
async def generate_prompt(request: GeneratePromptRequest):
    """Generate prompts dynamically using LLM API based on selected mode"""
    start_time = datetime.now()
    
    try:
        logger.info(f"Generating {request.mode} prompt for: {request.user_input[:100]}...")
        
        # Generate prompt based on selected mode only
        llm_used = "unknown"
        if request.mode == "sniper":
            quick_prompt, llm_used = await dynamic_generator.generate_sniper_prompt(
                request.user_input, 
                request.include_examples
            )
            professional_prompt = None
        elif request.mode == "titan":
            professional_prompt, llm_used = await dynamic_generator.generate_titan_prompt(
                request.user_input, 
                request.include_examples,
                request.validation_level
            )
            quick_prompt = None
        else:
            raise HTTPException(status_code=400, detail="Invalid mode. Must be 'sniper' or 'titan'")
        
        # Generate suggestions if requested
        suggestions = None
        if request.include_clarifications:
            suggestions = await dynamic_generator.generate_suggestions(request.user_input, request.mode)
        
        # Calculate processing time
        processing_time = (datetime.now() - start_time).total_seconds()
        
        response = GeneratePromptResponse(
            quick_prompt=quick_prompt,
            professional_prompt=professional_prompt,
            suggestions=suggestions,
            processing_time=processing_time,
            llm_used=llm_used
        )
        
        logger.info(f"Successfully generated {request.mode} prompt in {processing_time:.2f}s")
        return response
        
    except Exception as e:
        logger.error(f"Error generating prompt: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/user-sessions/{user_id}")
async def get_user_sessions(user_id: str, limit: int = 10):
    """Get user's prompt session history"""
    try:
        sessions = await db_service.get_user_sessions(user_id, limit)
        return {"sessions": sessions}
    except Exception as e:
        logger.error(f"Error fetching user sessions: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch sessions: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "available_llms": [
            provider.value for provider in [LLMProvider.GEMINI, LLMProvider.OPENAI, LLMProvider.CLAUDE]
            if getattr(llm_config, f"{provider.value}_api_key") or getattr(llm_config, f"{provider.value}_client")
        ]
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Prompt Enhancer API",
        "version": "1.0.0",
        "endpoints": [
            "/enhance-prompt",
            "/prompts/generate",
            "/user-sessions/{user_id}",
            "/health"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)