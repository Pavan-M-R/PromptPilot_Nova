# PowerShell script to start the backend server

cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload