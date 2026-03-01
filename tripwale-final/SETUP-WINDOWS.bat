@echo off
echo ================================================
echo   TripWale Setup Script (Windows)
echo ================================================

echo.
echo [1/3] Setting up Backend...
cd tripwale-backend
if not exist .env (
    copy .env.example .env
    echo .env created from .env.example
) else (
    echo .env already exists
)
call npm install
echo Backend dependencies installed!

echo.
echo [2/3] Setting up Frontend...
cd ..\tripwale-frontend
call npm install
echo Frontend dependencies installed!

echo.
echo [3/3] Done! Now run these in separate terminals:
echo.
echo   Terminal 1 (Backend):
echo     cd tripwale-backend
echo     npm run dev
echo.
echo   Terminal 2 (Frontend):
echo     cd tripwale-frontend
echo     npm run dev
echo.
echo   Admin Login:
echo     URL:      http://localhost:3000/admin/login
echo     Email:    admin@tripwale.in
echo     Password: Admin@123
echo.
echo ================================================
pause
