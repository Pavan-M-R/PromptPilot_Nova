# PromptPilot 🚀

**Advanced AI-Powered Prompt Generation System with Dynamic Intent Detection and Multi-Provider LLM Optimization**

PromptPilot is a sophisticated prompt engineering platform that transforms simple user inputs into high-quality, structured prompts using advanced algorithms, dynamic persona assignment, and multi-provider LLM optimization.

## 🌟 Key Features

### 🧠 **Advanced Algorithm Engine**
- **Dynamic Intent Detection**: Multi-dimensional classification with confidence scoring
- **Smart Persona Assignment**: Rule-based matching with dynamic synthesis for edge cases
- **Slot Extraction**: Critical information identification with assumption generation
- **Template Rendering**: Mode-specific prompt assembly (Basic vs Professional)
- **LLM Optimization**: API-first approach with multi-provider fallback chains

### 🔗 **Multi-Provider API Integration**
- **OpenAI Integration**: GPT-4o-mini with optimized parameters
- **Anthropic Integration**: Claude-3-Haiku with structured messaging
- **Google Gemini Integration**: Gemini-1.5-Flash with generation config
- **Intelligent Fallback**: Automatic provider switching on failures
- **Offline Mode**: Complete functionality without API dependencies

### 🎯 **Dual Generation Modes**
- **Basic Mode**: Clean, compact instructions without headings
- **Professional Mode**: Structured prompts with comprehensive sections
- **Context-Aware**: Adapts to user requirements and detected patterns
- **Quality Assurance**: Built-in validation and self-check mechanisms

### 🛡️ **Enterprise Features**
- **Safety Filtering**: Content policy violation detection
- **Private Mode**: Offline-only operation for sensitive environments
- **Strict Mode**: Clarification questions vs assumption generation
- **Performance Monitoring**: Detailed logging and metrics
- **Error Recovery**: Comprehensive fallback strategies

## 🏗️ Architecture Overview

### **System Components**

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                        │
│  ┌─────────────────┐  ┌─────────────────┐                │
│  │   Basic Mode    │  │ Professional    │                │
│  │   Interface     │  │    Mode         │                │
│  └─────────────────┘  └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend (FastAPI)                           │
│  ┌─────────────────────────────────────────────────────────┤
│  │           Advanced Orchestrator                         │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │  │ Preprocess  │ │   Intent    │ │    Slot     │      │
│  │  │  & Safety   │ │ Detection   │ │ Extraction  │      │
│  │  └─────────────┘ └─────────────┘ └─────────────┘      │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │  │   Persona   │ │   Prompt    │ │     LLM     │      │
│  │  │ Assignment  │ │  Rendering  │ │ Optimization│      │
│  │  └─────────────┘ └─────────────┘ └─────────────┘      │
│  └─────────────────────────────────────────────────────────┤
│  │              Multi-Provider LLM Layer                  │
│  │  ┌─────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │  │ OpenAI  │ │  Anthropic  │ │   Gemini    │          │
│  │  │Provider │ │  Provider   │ │  Provider   │          │
│  │  └─────────┘ └─────────────┘ └─────────────┘          │
│  └─────────────────────────────────────────────────────────┤
│                    In-Memory Database                      │
└─────────────────────────────────────────────────────────────┘
```

### **Algorithm Pipeline**

1. **Stage 1: Preprocessing & Safety**
   - Text normalization and cleaning
   - Language detection
   - Content policy violation scanning

2. **Stage 2: Intent Detection**
   - Multi-label keyword scoring
   - Task type classification (write, code, analyze, etc.)
   - Domain identification (software, marketing, etc.)
   - Tone and audience detection

3. **Stage 3: Slot Extraction**
   - Topic and goal identification
   - Constraint extraction
   - Must-include items detection
   - Critical slot analysis

4. **Stage 4: Persona Assignment**
   - Rule-based persona matching
   - Dynamic persona synthesis for edge cases
   - Voice and capability definition

5. **Stage 5: Prompt Rendering**
   - Mode-specific template selection
   - Section assembly and organization
   - Context integration

6. **Stage 6: LLM Optimization**
   - Multi-provider API calls
   - Structure validation
   - Quality enhancement

## 🚀 Quick Start

### **Prerequisites**
- Python 3.8+
- Node.js 16+
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PromptPilot
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

4. **Environment Configuration**
   ```bash
   cd backend
   # Edit .env file with your API keys
   ```

### **Running the Application**

1. **Start Backend Server**
   ```bash
   cd backend
   python server.py
   ```
   Server will run on `http://localhost:8000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   # or
   yarn start
   ```
   Application will open on `http://localhost:3000`

## ⚙️ Configuration

### **Environment Variables (.env)**

```bash
# Security
JWT_SECRET_KEY="your-jwt-secret-key-change-in-production"

# CORS Configuration
CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"

# System Behavior
PRIVATE_MODE=false          # true = offline only, no API calls
STRICT_MODE=false           # true = ask questions vs make assumptions

# API Keys (Add your keys for optimal performance)
OPENAI_API_KEY="your-openai-api-key-here"
ANTHROPIC_API_KEY="your-anthropic-api-key-here"
GEMINI_API_KEY="your-gemini-api-key-here"
```

### **API Key Setup**

1. **OpenAI** (Recommended)
   - Get API key from: https://platform.openai.com/api-keys
   - Best quality optimization

2. **Anthropic** (Fallback)
   - Get API key from: https://console.anthropic.com/
   - Excellent alternative

3. **Google Gemini** (Cost-effective)
   - Get API key from: https://makersuite.google.com/app/apikey
   - Budget-friendly option

## 📖 Usage Guide

### **Basic Mode**
Perfect for quick, straightforward prompts:
- Clean, compact instructions
- No section headers
- Essential requirements only
- Fast generation

**Example Input:** "Write a code for login page"

**Generated Output:**
```
You are Senior Software Engineer. precise, pragmatic, security-first.

Your task: Write a code for login page

Requirements: Audience: technical; Format: code
Guidelines: Follow coding best practices; Include error handling; Document code clearly

Deliver your response as a code file now.
```

### **Professional Mode**
Ideal for complex, structured requirements:
- Comprehensive sections
- Detailed instructions
- Quality criteria
- Self-check mechanisms

**Example Output:**
```
[System Role & Persona]
You are Senior Software Engineer. Voice: precise, pragmatic, security-first.
Goals: build robust systems; ensure scalability; maintain code quality

[High-level Objective]
Write a code for login page about the requested task.

[Detailed Instructions]
Tasks: code
Output form: code file
Length target: long (~1200 words)

[Quality Bar / Acceptance Criteria]
- Relevance: 100% to technical audience
- Completeness: covers all required sections
- Style: adheres to neutral tone; scannable
- Verification: flag uncertain facts

[Self-check before finalizing]
- Output format followed?
- All must-include points integrated?
- Persona voice consistent throughout?
- Constraints respected?
```

## 🔧 API Reference

### **Generate Prompt**
```http
POST /api/prompts/generate
Content-Type: application/json
Authorization: Bearer <jwt-token>

{
  "user_input": "Write a code for login page",
  "mode": "basic",  // "basic" or "professional"
  "include_rag": true,
  "validation_level": "standard"
}
```

**Response:**
```json
{
  "quick_prompt": "...",
  "professional_prompt": "...",
  "metadata": {
    "detected_intent": {
      "name": "code",
      "slug": "code"
    },
    "assigned_persona": {
      "name": "Senior Software Engineer",
      "slug": "software_architect"
    },
    "confidence_score": 0.95,
    "processing_time": 0.234,
    "optimization": {
      "provider_used": "openai",
      "optimization_applied": true
    }
  },
  "suggestions": {
    "clarifying_questions": [],
    "assumptions_made": ["Assume Python as programming language"]
  },
  "source": "advanced_orchestrator_api"
}
```

### **Authentication**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "your-username",
  "password": "your-password"
}
```

## 🧪 Advanced Features

### **Dynamic Persona Synthesis**
When no predefined persona matches the request, the system dynamically creates one:
- Analyzes task type and domain
- Generates appropriate voice and capabilities
- Creates domain-specific best practices
- Assigns relevant strengths and constraints

### **Intent Detection Algorithm**
Multi-dimensional classification system:
- **Task Types**: write, code, analyze, explain, design, etc.
- **Domains**: software, marketing, product, finance, etc.
- **Output Forms**: code, blog post, report, email, etc.
- **Tone**: formal, friendly, persuasive, neutral
- **Audience**: technical, executive, students, general

### **Slot Extraction Engine**
Intelligent information extraction:
- **Topic Identification**: First meaningful phrase analysis
- **Goal Detection**: Imperative pattern matching
- **Constraint Parsing**: Format and requirement extraction
- **Must-Include Items**: Critical content identification
- **Assumption Generation**: Smart defaults for missing information

## 🛠️ Development

### **Project Structure**
```
PromptPilot/
├── backend/
│   ├── server.py              # FastAPI application
│   ├── advanced_orchestrator.py # Core algorithm engine
│   ├── database.py            # In-memory database
│   ├── models.py              # Data models
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment configuration
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── components/       # UI components
│   │   └── services/         # API services
│   ├── package.json          # Node.js dependencies
│   └── public/               # Static assets
└── README.md                 # This file
```

### **Key Components**

#### **Advanced Orchestrator**
- `AdvancedOrchestrator`: Main algorithm engine
- `LLMOptimizer`: Multi-provider API management
- `IntentResult`: Intent classification data structure
- `PersonaCard`: Persona definition and capabilities
- `SlotResult`: Extracted information and assumptions

#### **API Providers**
- `OpenAIProvider`: GPT-4o-mini integration
- `AnthropicProvider`: Claude-3-Haiku integration
- `GeminiProvider`: Gemini-1.5-Flash integration

### **Adding New Personas**
```python
{
    "id": "custom_persona",
    "name": "Custom Expert",
    "match": {
        "task_any": ["custom_task"],
        "domain_any": ["custom_domain"]
    },
    "voice": "professional, knowledgeable",
    "best_practices": [
        "Follow industry standards",
        "Provide actionable advice"
    ]
}
```

### **Extending Intent Detection**
```python
self.task_keywords = {
    "new_task": ["keyword1", "keyword2", "keyword3"]
}

self.domain_keywords = {
    "new_domain": ["domain_word1", "domain_word2"]
}
```

## 🔒 Security

### **Authentication**
- JWT-based authentication system
- Secure password hashing with bcrypt
- Session management and token validation

### **API Security**
- API key encryption and secure storage
- Request rate limiting and timeout controls
- CORS configuration for frontend access

### **Content Safety**
- Automated content policy violation detection
- Safe refusal scaffolding for blocked content
- PII redaction in logs and analytics

## 📊 Performance

### **Optimization Features**
- Async processing for API calls
- Intelligent caching for repeated requests
- Provider fallback for reliability
- Timeout controls for responsiveness

### **Monitoring**
- Detailed logging for all algorithm stages
- Performance metrics and timing data
- Provider usage statistics
- Error tracking and recovery logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow existing code style and patterns
- Add comprehensive tests for new features
- Update documentation for API changes
- Ensure backward compatibility

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### **Common Issues**

**Q: API calls are not working**
A: Check your API keys in the .env file and ensure they're valid.

**Q: Server won't start**
A: Verify Python dependencies are installed: `pip install -r requirements.txt`

**Q: Frontend build fails**
A: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Q: Prompts are not optimized**
A: Ensure at least one API key is configured and PRIVATE_MODE=false

### **Getting Help**
- Check the logs for detailed error messages
- Verify environment configuration
- Ensure all dependencies are installed
- Test with basic examples first

## 🚀 Roadmap

### **Upcoming Features**
- Vector database integration for semantic search
- RAG (Retrieval Augmented Generation) system
- Chrome extension for contextual prompting
- Advanced analytics and usage insights
- Multi-language support
- Custom persona training

### **Performance Improvements**
- Response caching and optimization
- Batch processing capabilities
- Advanced error recovery
- Real-time collaboration features

---

**Built with ❤️ for the AI community**

*PromptPilot - Transforming ideas into perfect prompts*