#!/usr/bin/env python3
"""
Prompt Enhancer Backend Startup Script

This script starts the Prompt Enhancer API server with proper configuration
and environment setup.
"""

import os
import sys
import uvicorn
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Load environment variables
from dotenv import load_dotenv
load_dotenv(backend_dir / '.env')

def main():
    """Start the Prompt Enhancer API server"""
    
    # Get configuration from environment
    host = os.getenv('PROMPT_ENHANCER_HOST', '0.0.0.0')
    port = int(os.getenv('PROMPT_ENHANCER_PORT', 8001))
    
    # Check for required API keys
    required_keys = ['GEMINI_API_KEY', 'SUPABASE_URL', 'SUPABASE_ANON_KEY']
    missing_keys = []
    
    for key in required_keys:
        if not os.getenv(key):
            missing_keys.append(key)
    
    if missing_keys:
        print("❌ Missing required environment variables:")
        for key in missing_keys:
            print(f"   - {key}")
        print("\nPlease update your .env file with the required API keys.")
        sys.exit(1)
    
    # Check optional API keys
    optional_keys = ['OPENAI_API_KEY', 'CLAUDE_API_KEY']
    available_llms = ['Gemini']  # Gemini is required
    
    if os.getenv('OPENAI_API_KEY'):
        available_llms.append('OpenAI')
    if os.getenv('CLAUDE_API_KEY'):
        available_llms.append('Claude')
    
    print("🚀 Starting Prompt Enhancer API Server...")
    print(f"📍 Server: http://{host}:{port}")
    print(f"🤖 Available LLMs: {', '.join(available_llms)}")
    print(f"📊 Health Check: http://{host}:{port}/health")
    print(f"📚 API Docs: http://{host}:{port}/docs")
    print("\n" + "="*50)
    
    try:
        # Import and run the FastAPI app
        uvicorn.run(
            "prompt_enhancer:app",
            host=host,
            port=port,
            reload=True,  # Enable auto-reload for development
            log_level="info",
            access_log=True
        )
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()