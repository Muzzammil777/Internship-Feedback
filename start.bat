@echo off
title MoviCloud Startup Script
echo =======================================================
echo    MoviCloud Internship Feedback System Startup
echo =======================================================

echo.
echo [1/4] Installing Backend Dependencies...
cd backend
call pip install -r requirements.txt
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to install backend dependencies.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/4] Starting Backend Server...
start "Backend (FastAPI)" cmd /k "title Backend Server && uvicorn app.main:app --reload"
cd ..

echo.
echo [3/4] Installing Frontend Dependencies...
cd frontend
call npm install
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to install frontend dependencies.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [4/4] Starting Frontend Server...
start "Frontend (Vite)" cmd /k "title Frontend Server && npm run dev"
cd ..

echo.
echo =======================================================
echo Startup successfully initiated!
echo -------------------------------------------------------
echo.
echo The backend API is starting at:  http://localhost:8000
echo The frontend is starting at:     http://localhost:5173
echo.
echo Two new terminal windows have been opened for the servers.
echo To stop the servers, just close those terminal windows.
echo =======================================================
pause
