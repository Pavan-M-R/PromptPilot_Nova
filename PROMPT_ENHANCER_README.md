# 🚀 Prompt Enhancer Backend

A powerful AI-driven tool that dynamically analyzes user prompts, detects intent, assigns expert roles, and constructs super-detailed master prompts to guarantee the best possible output from Large Language Models (LLMs).

## 🌟 Features

### 🧠 Dynamic Intent Recognition
- **Smart Classification**: Automatically detects user intent from free-form language
- **Multiple Detection Methods**: Pattern-based matching + LLM-based classification fallback
- **Supported Intents**: 
  - `coding` - Code generation, programming tasks
  - `debugging` - Bug fixes, troubleshooting
  - `refactoring` - Code optimization and improvement
  - `writing` - Content creation, documentation
  - `creativity` - Brainstorming, innovative ideas
  - `problem_solving` - Mathematical problems, logical solutions
  - `analysis` - Data analysis, evaluation, comparison
  - `general` - General queries

### 👨‍💼 Automatic Role & Persona Assignment
- **Expert Roles**: Dynamically assigns high-authority personas based on detected intent
- **Context-Aware**: Roles are tailored to specific task requirements
- **Examples**:
  - Coding → "Senior Software Engineer with 10+ years experience"
  - Writing → "Professional Technical Writer"
  - Debugging → "Software Debugging Expert"

### 🏗️ Master Prompt Construction
- **Structured Enhancement**: Builds comprehensive, context-rich prompts
- **Key Sections**:
  - Role/Perspective (expert persona)
  - Task Definition (clear objectives)
  - Requirements & Constraints
  - Output Guidelines
  - Intent-specific instructions

### 🔄 LLM Fallback System
- **Primary**: Google Gemini
- **Secondary**: OpenAI GPT-4
- **Tertiary**: Anthropic Claude
- **Smart Retry**: Automatic fallback on timeout, rate-limit, or errors

### 💾 Complete Database Logging
- **Session Tracking**: All prompts, enhancements, and responses logged
- **Performance Metrics**: Processing time, LLM usage statistics
- **User History**: Retrieve past sessions and analytics
- **Intent Analytics**: Track detection accuracy and patterns

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Virtual environment (recommended)
- Supabase account and database
- At least one LLM API key (Gemini required, others optional)

### 1. Setup Environment

```bash
# Clone and navigate to project
cd 111PromptPilot-main

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows
# source venv/bin/activate     # Linux/Mac

# Install dependencies
pip install -r backend\prompt_enhancer_requirements.txt
```

### 2. Configure Environment Variables

Update `backend\.env` with your API keys:

```env
# Required - Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Required - Primary LLM
GEMINI_API_KEY=your-gemini-api-key

# Optional - Fallback LLMs
OPENAI_API_KEY=your-openai-api-key
CLAUDE_API_KEY=your-claude-api-key

# Server Configuration
PROMPT_ENHANCER_PORT=8001
PROMPT_ENHANCER_HOST=0.0.0.0
```

### 3. Setup Database

Run the database schema in your Supabase SQL Editor:

```bash
# Copy and execute the contents of:
backend\prompt_enhancer_schema.sql
```

### 4. Start the Server

**Option A: Using PowerShell Script (Recommended)**
```powershell
.\start_prompt_enhancer.ps1
```

**Option B: Direct Python**
```bash
cd backend
python start_prompt_enhancer.py
```

### 5. Verify Installation

```bash
# Test the components
cd backend
python test_prompt_enhancer.py
```

## 📡 API Endpoints

### POST `/enhance-prompt`
Main endpoint for prompt enhancement.

**Request:**
```json
{
  "user_prompt": "Write a function to sort a list",
  "user_id": "user123",
  "context": "Python programming task"
}
```

**Response:**
```json
{
  "original_prompt": "Write a function to sort a list",
  "enhanced_prompt": "You are a Senior Software Engineer...",
  "detected_intent": "coding",
  "assigned_role": "You are a Senior Software Engineer...",
  "llm_response": "Here's a comprehensive solution...",
  "processing_time": 2.34,
  "llm_used": "gemini",
  "session_id": "session_1234567890_5678"
}
```

### GET `/user-sessions/{user_id}`
Retrieve user's prompt history.

**Parameters:**
- `user_id`: User identifier
- `limit`: Number of sessions to return (default: 10)

### GET `/health`
Health check and available LLMs.

### GET `/`
API information and available endpoints.

## 🧪 Testing

### Run Test Suite
```bash
cd backend
python test_prompt_enhancer.py
```

### Manual API Testing

**Using curl:**
```bash
curl -X POST "http://localhost:8001/enhance-prompt" \
  -H "Content-Type: application/json" \
  -d '{
    "user_prompt": "Help me debug this Python error",
    "user_id": "test_user",
    "context": "Learning Python"
  }'
```

**Using Python requests:**
```python
import requests

response = requests.post(
    "http://localhost:8001/enhance-prompt",
    json={
        "user_prompt": "Create a REST API with FastAPI",
        "user_id": "developer123"
    }
)

print(response.json())
```

## 📊 Database Schema

### Core Tables
- **`prompt_sessions`**: Main session data with prompts and responses
- **`intent_analytics`**: Intent detection accuracy tracking
- **`llm_performance`**: LLM performance and fallback statistics
- **`user_preferences`**: User-specific settings and preferences
- **`prompt_templates`**: Reusable prompt templates

### Analytics Views
- **`session_analytics`**: Daily session statistics by intent and LLM
- **`user_activity_summary`**: User engagement and usage patterns

## 🔧 Configuration

### Intent Recognition Tuning
Modify `IntentRecognizer.intent_patterns` in `prompt_enhancer.py` to add custom patterns:

```python
self.intent_patterns = {
    IntentType.CODING: [
        "write code", "function", "algorithm", 
        # Add your custom patterns here
    ]
}
```

### Custom Roles
Update `RoleAssigner.role_mappings` to customize expert personas:

```python
self.role_mappings = {
    IntentType.CODING: [
        "You are a Senior Software Engineer...",
        # Add your custom roles here
    ]
}
```

### LLM Provider Priority
Modify `LLMService.providers` to change fallback order:

```python
self.providers = [LLMProvider.GEMINI, LLMProvider.OPENAI, LLMProvider.CLAUDE]
```

## 🚨 Troubleshooting

### Common Issues

**1. "API key not configured" Error**
- Verify your `.env` file has the correct API keys
- Ensure environment variables are loaded properly

**2. Database Connection Failed**
- Check Supabase URL and keys in `.env`
- Verify database schema is applied
- Ensure RLS is disabled (as per main project setup)

**3. LLM Request Timeout**
- Check internet connection
- Verify API keys are valid and have quota
- Try different LLM provider

**4. Import Errors**
- Ensure all dependencies are installed: `pip install -r prompt_enhancer_requirements.txt`
- Verify virtual environment is activated

### Debug Mode
Enable detailed logging by setting log level:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 📈 Performance Optimization

### Caching
- Implement Redis caching for frequent prompts
- Cache intent detection results
- Store common role assignments

### Async Optimization
- All LLM calls are async
- Database operations use async clients
- Concurrent request handling

### Monitoring
- Track processing times per component
- Monitor LLM fallback frequency
- Analyze intent detection accuracy

## 🔐 Security Considerations

- **API Keys**: Store securely in environment variables
- **Input Validation**: All inputs validated with Pydantic
- **Rate Limiting**: Implement rate limiting for production
- **Logging**: Sensitive data excluded from logs
- **Database**: Use RLS policies for multi-tenant scenarios

## 🚀 Production Deployment

### Docker Deployment
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/prompt_enhancer_requirements.txt .
RUN pip install -r prompt_enhancer_requirements.txt
COPY backend/ .
EXPOSE 8001
CMD ["python", "start_prompt_enhancer.py"]
```

### Environment Variables for Production
```env
# Production settings
PROMPT_ENHANCER_HOST=0.0.0.0
PROMPT_ENHANCER_PORT=8001
LOG_LEVEL=INFO

# Security
JWT_SECRET_KEY=your-production-secret
CORS_ORIGINS=https://yourdomain.com

# Database
SUPABASE_URL=your-production-supabase-url
SUPABASE_ANON_KEY=your-production-anon-key
```

## 📚 API Documentation

Once the server is running, visit:
- **Interactive Docs**: http://localhost:8001/docs
- **ReDoc**: http://localhost:8001/redoc
- **OpenAPI JSON**: http://localhost:8001/openapi.json

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is part of the PromptPilot suite. See the main project license for details.

---

**🎯 Ready to enhance your prompts? Start the server and begin creating super-detailed, expert-level prompts that guarantee the best LLM outputs!**