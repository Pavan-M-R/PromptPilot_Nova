# PromptPilot - Complete SaaS Platform Setup Instructions

## 🎯 Overview
PromptPilot is a full-stack SaaS prompt engineering platform that transforms vague ideas into structured, role-aware master prompts using advanced offline algorithms.

## 📁 Project Structure
```
promptpilot/
├── backend/                 # FastAPI Backend
│   ├── server.py           # Main API server with advanced algorithm
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables (API keys)
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── App.js         # Main React application
│   │   ├── App.css        # Comprehensive styling with dark/light themes
│   │   └── index.js       # Entry point
│   ├── package.json       # Node.js dependencies
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── .env              # Frontend environment variables
├── scripts/               # Utility scripts
└── test_result.md        # Comprehensive testing results
```

## 🚀 Quick Setup

### Prerequisites
- Python 3.8+ with pip
- Node.js 16+ with yarn
- MongoDB (local or cloud)

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend/
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables in `.env`:
   ```env
   MONGO_URL="mongodb://localhost:27017"
   DB_NAME="promptpilot_db"
   JWT_SECRET_KEY="your-secure-jwt-secret-key"
   
   # Optional API Keys (replace placeholders)
   GEMINI_API_KEY="your-gemini-api-key-here"
   OPENAI_API_KEY="your-openai-api-key-here"
   ANTHROPIC_API_KEY="your-anthropic-api-key-here"
   ```

4. Start the backend server:
   ```bash
   uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend/
   ```

2. Install Node.js dependencies:
   ```bash
   yarn install
   ```

3. Configure environment variables in `.env`:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8001
   ```

4. Start the frontend development server:
   ```bash
   yarn start
   ```

## 🔑 API Keys Configuration

### Optional: External API Integration
Replace the placeholders in `backend/.env` with your actual API keys:

1. **Google Gemini API**: Get from https://aistudio.google.com/app/apikey
2. **OpenAI API**: Get from https://platform.openai.com/api-keys
3. **Anthropic Claude API**: Get from https://console.anthropic.com/

**Note**: The system works perfectly with just the offline algorithm without any API keys!

## 🧠 Core Features

### Advanced Offline Algorithm
- **Smart Role Detection**: Automatically identifies user roles (Software Developer, Data Scientist, Content Writer, Teacher, etc.)
- **Dynamic Persona Assignment**: Creates expert-level personas for each detected role
- **Master Prompt Generation**: Generates 5000+ character structured prompts with comprehensive sections
- **Multi-Role Support**: Supports 10+ professional roles with specialized expertise

### SaaS Platform Features
- **User Authentication**: Secure JWT-based registration and login
- **Theme Toggle**: Professional dark/light mode switching
- **Prompt History**: Save, organize, and manage generated prompts
- **Export System**: Export prompts as TXT and Markdown files
- **Responsive Design**: Mobile-first UI that works on all devices
- **Profile Management**: Update user preferences and settings

## 🧪 Testing

The platform has been comprehensively tested:
- **Backend**: 8/8 tests passing (authentication, API endpoints, algorithm)
- **Frontend**: 10/10 tests passing (UI, navigation, functionality)
- **Integration**: End-to-end user flows validated

## 🔧 Technology Stack

### Backend
- **FastAPI**: High-performance async Python web framework
- **MongoDB**: Document database with Motor async driver
- **JWT**: Secure authentication with bcrypt password hashing
- **Pydantic**: Data validation and serialization

### Frontend  
- **React 18**: Modern component-based UI library
- **CSS3**: Advanced styling with CSS variables and responsive design
- **Axios**: HTTP client for API communication
- **Context API**: State management for user authentication

## 📊 Database Schema

### Users Collection
```javascript
{
  id: "uuid",
  username: "string",
  email: "string", 
  password_hash: "string",
  theme: "dark|light",
  created_at: "datetime",
  updated_at: "datetime"
}
```

### Prompts Collection
```javascript
{
  id: "uuid",
  user_id: "string",
  raw_input: "string",
  generated_output: "string",
  detected_role: "string",
  persona: "string", 
  source: "offline_algorithm|api",
  created_at: "datetime"
}
```

## 🚀 Deployment

### Production Considerations
1. Use HTTPS in production (update `REACT_APP_BACKEND_URL`)
2. Set strong JWT secret key
3. Configure MongoDB with authentication
4. Set proper CORS origins
5. Use environment variables for all secrets

### Docker Deployment (Optional)
The application can be containerized using Docker for easy deployment.

## 🆘 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running and accessible
2. **Port Conflicts**: Change ports in environment variables if needed
3. **CORS Errors**: Update CORS_ORIGINS in backend `.env`
4. **Module Not Found**: Run `pip install -r requirements.txt` and `yarn install`

### Support
- Check `test_result.md` for detailed testing information
- All API endpoints are documented in the FastAPI automatic docs at `/docs`
- Frontend components are well-structured and commented

## 🎉 Success!

Once both servers are running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Docs: http://localhost:8001/docs

**PromptPilot is ready to transform your vague ideas into master prompts!**

---

*Built with ❤️ - A professional SaaS platform for prompt engineering*