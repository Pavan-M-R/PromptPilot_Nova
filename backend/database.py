import logging
import os
from typing import Optional, Dict, Any, List, Union
from supabase_config import get_supabase_client, init_supabase, close_supabase

logger = logging.getLogger(__name__)

# In-memory storage for all data (fallback)
class InMemoryDatabase:
    def __init__(self):
        self.users = {}
        self.prompts = {}
        self.analytics_events = []
        self.user_sessions = {}
        self.intents = {}
        self.personas = {}
        self.knowledge_documents = {}
        
    def clear_all(self):
        """Clear all in-memory data"""
        self.users.clear()
        self.prompts.clear()
        self.analytics_events.clear()
        self.user_sessions.clear()
        self.intents.clear()
        self.personas.clear()
        self.knowledge_documents.clear()

# Global database instances
db_instance = InMemoryDatabase()
use_supabase = False
supabase_client = None

async def connect_to_database():
    """Initialize database connection (Supabase or in-memory fallback)"""
    global use_supabase, supabase_client
    
    # Check if Supabase credentials are available
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_ANON_KEY')
    
    if supabase_url and supabase_key:
        logger.info("🚀 Attempting to connect to Supabase database")
        try:
            success = await init_supabase()
            if success:
                supabase_client = await get_supabase_client()
                use_supabase = True
                logger.info("✅ Supabase database connected successfully")
                return
        except Exception as e:
            logger.warning(f"⚠️ Supabase connection failed: {e}")
    
    # Fallback to in-memory database
    logger.info("🚀 Using in-memory database (fallback)")
    logger.info("✅ In-memory database ready for use")
    use_supabase = False
    await create_indexes()

# Alias for backward compatibility
connect_to_mongo = connect_to_database

async def close_database_connection():
    """Close database connection"""
    global use_supabase, supabase_client
    
    if use_supabase and supabase_client:
        await close_supabase()
        logger.info("🔌 Supabase connection closed")
    else:
        logger.info("🔌 Clearing in-memory database")
        db_instance.clear_all()
    
    use_supabase = False
    supabase_client = None

# Alias for backward compatibility
close_mongo_connection = close_database_connection

def get_database():
    """Get database instance (Supabase or in-memory)"""
    if use_supabase and supabase_client:
        return supabase_client
    return db_instance

def is_using_supabase() -> bool:
    """Check if using Supabase database"""
    return use_supabase

async def create_indexes():
    """Initialize database structure"""
    try:
        if use_supabase:
            logger.info("📊 Supabase database schema ready")
        else:
            logger.info("📊 In-memory database structure initialized")
    except Exception as e:
        logger.warning(f"⚠️ Failed to initialize database structure: {e}")

async def check_database_health():
    """Check in-memory database health"""
    try:
        # Always healthy for in-memory database
        logger.debug("✅ In-memory database health check: Always healthy")
        return True
    except Exception as e:
        logger.debug(f"❌ Database health check failed: {e}")
        return False

async def get_connection_status():
    """Get in-memory database status"""
    status = {
        "connected": True,
        "client_exists": True,
        "database_exists": True,
        "collections": ["users", "prompts", "analytics_events", "user_sessions", "intents", "personas", "knowledge_documents"],
        "error": None,
        "type": "in_memory",
        "data_counts": {
            "users": len(db_instance.users),
            "prompts": len(db_instance.prompts),
            "analytics_events": len(db_instance.analytics_events),
            "user_sessions": len(db_instance.user_sessions),
            "intents": len(db_instance.intents),
            "personas": len(db_instance.personas),
            "knowledge_documents": len(db_instance.knowledge_documents)
        }
    }
    
    return status