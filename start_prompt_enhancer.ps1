# Prompt Enhancer Backend Startup Script for Windows
# This script activates the virtual environment and starts the Prompt Enhancer API server

Write-Host "🚀 Starting Prompt Enhancer Backend..." -ForegroundColor Green

# Check if virtual environment exists
if (Test-Path "venv\Scripts\Activate.ps1") {
    Write-Host "📦 Activating virtual environment..." -ForegroundColor Yellow
    & .\venv\Scripts\Activate.ps1
} else {
    Write-Host "⚠️  Virtual environment not found. Please run setup first." -ForegroundColor Red
    Write-Host "Run: python -m venv venv" -ForegroundColor Yellow
    Write-Host "Then: .\venv\Scripts\Activate.ps1" -ForegroundColor Yellow
    Write-Host "Then: pip install -r backend\prompt_enhancer_requirements.txt" -ForegroundColor Yellow
    exit 1
}

# Check if required packages are installed
Write-Host "🔍 Checking dependencies..." -ForegroundColor Yellow

try {
    python -c "import fastapi, uvicorn, google.generativeai, supabase" 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
        pip install -r backend\prompt_enhancer_requirements.txt
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
            exit 1
        }
    }
} catch {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    pip install -r backend\prompt_enhancer_requirements.txt
}

# Change to backend directory
Set-Location backend

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found in backend directory" -ForegroundColor Red
    Write-Host "Please create a .env file with your API keys" -ForegroundColor Yellow
    exit 1
}

# Start the server
Write-Host "🌟 Starting Prompt Enhancer API Server..." -ForegroundColor Green
Write-Host "📍 Server will be available at: http://localhost:8001" -ForegroundColor Cyan
Write-Host "📚 API Documentation: http://localhost:8001/docs" -ForegroundColor Cyan
Write-Host "📊 Health Check: http://localhost:8001/health" -ForegroundColor Cyan
Write-Host "" 
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "" 

try {
    python start_prompt_enhancer.py
} catch {
    Write-Host "❌ Failed to start server: $_" -ForegroundColor Red
    exit 1
} finally {
    Write-Host "🛑 Prompt Enhancer Backend stopped" -ForegroundColor Yellow
    Set-Location ..
}