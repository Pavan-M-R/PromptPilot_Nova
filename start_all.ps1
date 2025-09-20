# PowerShell script to start both backend and frontend servers

# Start the backend server in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; uvicorn server:app --host 0.0.0.0 --port 8001 --reload"

# Wait a moment for the backend to initialize
Start-Sleep -Seconds 3

# Start the frontend server in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; yarn start"

Write-Host "Started both servers. The application will be available at:"
Write-Host "Backend API: http://localhost:8001"
Write-Host "Frontend UI: http://localhost:3000"