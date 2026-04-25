@echo off
title MoviCloud Startup Script
set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%ROOT_DIR%backend"
set "FRONTEND_DIR=%ROOT_DIR%frontend"
set "PYTHON_EXE=%ROOT_DIR%.venv\Scripts\python.exe"
echo =======================================================
echo    MoviCloud Internship Feedback System Startup
echo =======================================================

echo.
echo [1/4] Installing Backend Dependencies...
pushd "%BACKEND_DIR%"
call "%PYTHON_EXE%" -m pip install -r requirements.txt
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to install backend dependencies.
    popd
    pause
    exit /b %ERRORLEVEL%
)
popd

echo.
echo [2/4] Starting Backend Server...
start "Backend (FastAPI)" /D "%BACKEND_DIR%" "%PYTHON_EXE%" -m uvicorn app.main:app --reload --host 0.0.0.0

echo.
echo [3/4] Installing Frontend Dependencies...
pushd "%FRONTEND_DIR%"
call npm install
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Failed to install frontend dependencies.
    popd
    pause
    exit /b %ERRORLEVEL%
)
popd

echo.
echo [4/4] Starting Frontend Server...
start "Frontend (Vite)" /D "%FRONTEND_DIR%" cmd /k npm run dev -- --host

echo.
echo =======================================================
echo Startup successfully initiated!
echo -------------------------------------------------------
echo.
echo The backend API is starting at:  http://localhost:8000
echo The frontend is starting at:     http://localhost:5173
echo.
echo For MOBILE access (same Wi-Fi), open:
echo   Frontend: http://192.168.31.56:5173
echo   Backend:  http://192.168.31.56:8000
echo =======================================================
pause
