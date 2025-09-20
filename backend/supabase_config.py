import os
import logging
from typing import Optional, Dict, Any, List
from supabase import create_client, Client
from datetime import datetime, timezone
import json

logger = logging.getLogger(__name__)

def serialize_datetime(obj):
    """Convert datetime objects to ISO format strings for JSON serialization"""
    if isinstance(obj, dict):
        return {key: serialize_datetime(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [serialize_datetime(item) for item in obj]
    elif isinstance(obj, datetime):
        return obj.isoformat()
    else:
        return obj

class SupabaseDatabase:
    def __init__(self):
        self.client: Optional[Client] = None
        self.connected = False
        
    async def connect(self):
        """Initialize Supabase connection"""
        try:
            supabase_url = os.getenv('SUPABASE_URL')
            supabase_key = os.getenv('SUPABASE_ANON_KEY')
            
            if not supabase_url or not supabase_key:
                logger.error("Missing Supabase credentials in environment variables")
                return False
                
            self.client = create_client(supabase_url, supabase_key)
            
            # Test connection
            response = self.client.table('users').select('id').limit(1).execute()
            
            self.connected = True
            logger.info("✅ Supabase database connected successfully")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to connect to Supabase: {e}")
            self.connected = False
            return False
    
    async def disconnect(self):
        """Close Supabase connection"""
        self.client = None
        self.connected = False
        logger.info("🔌 Supabase connection closed")
    
    def is_connected(self) -> bool:
        """Check if connected to Supabase"""
        return self.connected and self.client is not None
    
    # User operations
    async def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new user"""
        try:
            # Serialize datetime objects to ISO format strings
            serialized_data = serialize_datetime(user_data)
            response = self.client.table('users').insert(serialized_data).execute()
            return response.data[0] if response.data else {}
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            raise
    
    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Get user by email"""
        try:
            response = self.client.table('users').select('*').eq('email', email).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error getting user by email: {e}")
            return None
    
    async def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user by ID"""
        try:
            response = self.client.table('users').select('*').eq('id', user_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error getting user by ID: {e}")
            return None
    
    async def update_user(self, user_id: str, update_data: Dict[str, Any]) -> bool:
        """Update user data"""
        try:
            update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
            response = self.client.table('users').update(update_data).eq('id', user_id).execute()
            return len(response.data) > 0
        except Exception as e:
            logger.error(f"Error updating user: {e}")
            return False
    
    # Prompt operations
    async def create_prompt(self, prompt_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new prompt"""
        try:
            # Serialize datetime objects to ISO format strings
            serialized_data = serialize_datetime(prompt_data)
            response = self.client.table('prompts').insert(serialized_data).execute()
            return response.data[0] if response.data else {}
        except Exception as e:
            logger.error(f"Error creating prompt: {e}")
            raise
    
    async def get_user_prompts(self, user_id: str, limit: int = 50) -> List[Dict[str, Any]]:
        """Get user's prompts"""
        try:
            response = (
                self.client.table('prompts')
                .select('*')
                .eq('user_id', user_id)
                .order('created_at', desc=True)
                .limit(limit)
                .execute()
            )
            return response.data or []
        except Exception as e:
            logger.error(f"Error getting user prompts: {e}")
            return []
    
    async def delete_prompt(self, prompt_id: str, user_id: str) -> bool:
        """Delete a prompt"""
        try:
            response = (
                self.client.table('prompts')
                .delete()
                .eq('id', prompt_id)
                .eq('user_id', user_id)
                .execute()
            )
            return len(response.data) > 0
        except Exception as e:
            logger.error(f"Error deleting prompt: {e}")
            return False
    
    # Analytics operations
    async def create_analytics_event(self, event_data: Dict[str, Any]) -> bool:
        """Create analytics event"""
        try:
            response = self.client.table('analytics_events').insert(event_data).execute()
            return len(response.data) > 0
        except Exception as e:
            logger.error(f"Error creating analytics event: {e}")
            return False
    
    async def get_analytics_events(self, user_id: str, limit: int = 100) -> List[Dict[str, Any]]:
        """Get user's analytics events"""
        try:
            response = (
                self.client.table('analytics_events')
                .select('*')
                .eq('user_id', user_id)
                .order('timestamp', desc=True)
                .limit(limit)
                .execute()
            )
            return response.data or []
        except Exception as e:
            logger.error(f"Error getting analytics events: {e}")
            return []

# Global Supabase instance
supabase_db = SupabaseDatabase()

async def get_supabase_client() -> SupabaseDatabase:
    """Get Supabase database client"""
    return supabase_db

async def init_supabase():
    """Initialize Supabase connection"""
    return await supabase_db.connect()

async def close_supabase():
    """Close Supabase connection"""
    await supabase_db.disconnect()