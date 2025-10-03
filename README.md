PromptPilot 🚀
An intelligent platform for transforming simple ideas into high-quality, structured prompts for Large Language Models.

PromptPilot is a full-stack application designed to streamline and enhance the process of prompt engineering. Instead of manually crafting complex prompts, users can provide a basic input, and PromptPilot's orchestration pipeline intelligently enriches it with context, structure, and persona, generating an optimized prompt ready for use with leading LLMs like OpenAI, Google Gemini, and Anthropic.

✨ Key Features
Advanced Prompt Orchestration: Automatically analyzes user intent and enriches prompts with predefined personas and contextual data.

Multi-Provider LLM Support: Seamlessly integrates with OpenAI, Google Gemini, and Anthropic APIs, with a built-in fallback system for reliability.

User-Friendly Interface: A clean, modern UI built with React and Tailwind CSS, offering modes for both simple and advanced prompt creation.

Secure Authentication: JWT-based user authentication to manage user history and data securely.

Prompt History: Allows users to save, review, and reuse previously generated prompts all locally.

Developer-First API: A well-documented FastAPI backend that can be used to power other applications.

⚙️ How It Works
PromptPilot uses a modular backend pipeline to systematically enhance a user's initial input.

Input & Intent Detection: The user provides a basic prompt (e.g., "explain black holes to a child"). The system first analyzes the input to determine the core intent.

Persona Assignment: Based on the intent, a suitable persona is selected (e.g., "a friendly science teacher").

Context Injection & Slot Filling: The system injects relevant keywords, constraints, and formatting instructions to create a detailed, structured prompt.

LLM Integration: The final, enhanced prompt is sent to the selected LLM provider (e.g., Gemini).

Optimized Output: The high-quality response from the LLM is returned to the user.

🛠️ Tech Stack

Frontend: React.js Tailwind CSS JavaScript

Backend: Python FastAPI

Database: PostgreSQL (via Supabase)

LLM APIs: OpenAI Google Gemini Anthropic

🚀 Getting Started
Follow these instructions to set up and run the project locally.

Prerequisites
Python 3.8+

Node.js 16+ with npm or yarn

API keys for at least one LLM provider (OpenAI, Gemini, or Anthropic)

A free Supabase account for the database.

Installation & Setup
Clone the repository:

git clone [https://github.com/](https://github.com/)[Your-GitHub-Username]/promptpilot.git
cd promptpilot

Configure Backend:

Navigate to the backend directory: cd backend

Create a .env file from the example: cp .env.example .env

Add your API keys and Supabase credentials to the .env file.

Install dependencies: pip install -r requirements.txt

Configure Frontend:

Navigate to the frontend directory: cd ../frontend

Create a .env file: cp .env.example .env

The REACT_APP_BACKEND_URL should already be set to http://localhost:8001.

Install dependencies: npm install

Running the Application
Start the Backend Server:

# From the /backend directory
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

Start the Frontend Application (in a new terminal):

# From the /frontend directory
npm start

The application should now be running at http://localhost:3000.

🗺️ Project Roadmap
[ ] Implement On-Device Model: Develop and integrate a smaller, offline model for basic prompt structuring to reduce API reliance.

[ ] Team Collaboration: Add features for teams to share and collaborate on prompt libraries.

[ ] Prompt Versioning: Implement a system to track changes and versions of prompts.

[ ] Expanded LLM Support: Add support for more models, including open-source alternatives.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.