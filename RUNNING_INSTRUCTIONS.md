# Running PromptPilot

## Quick Start

### Option 1: Start Everything with One Command (PowerShell)

Run the following command to start both backend and frontend servers in separate windows:

```powershell
.\start_all.ps1
```

### Option 2: Start Servers Individually

1. Start the backend server first:
   - Using PowerShell: `.\start_backend.ps1`
   - Using Command Prompt: `start_backend.bat`

2. Start the frontend server in a new terminal:
   - Using PowerShell: `.\start_frontend.ps1`
   - Using Command Prompt: `start_frontend.bat`

## Backend Server Details

To start the backend server, you have several options:

### Option 1: Using PowerShell Script

```powershell
.\start_backend.ps1
```

### Option 2: Using Batch File

```cmd
start_backend.bat
```

### Option 3: Manual Command

If you prefer to run the command directly in PowerShell:

```powershell
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Important Note:** When using PowerShell, make sure to use semicolons (`;`) for command chaining, not ampersands (`&&`) like in bash:

```powershell
# Correct in PowerShell
cd backend; uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Incorrect in PowerShell (will cause error)
cd backend && uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

## Frontend Server Details

To start the frontend server, you have several options:

### Option 1: Using PowerShell Script

```powershell
.\start_frontend.ps1
```

### Option 2: Using Batch File

```cmd
start_frontend.bat
```

### Option 3: Manual Command

If you prefer to run the command directly:

```powershell
cd frontend
yarn start
```

The frontend will be available at http://localhost:3000

## Accessing the Application

Once both servers are running:
- Backend API: http://localhost:8001
- Frontend UI: http://localhost:3000