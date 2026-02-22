@echo off
chcp 65001 >nul
REM Pinokio + OpenClaw Integration Test (Windows)

echo === Pinokio + OpenClaw Integration Test ===
echo.

REM 1. Check if openclaw is built
echo Step 1: Check openclaw build...
cd /d D:\Code\goldieopenclaw
if not exist "dist" (
    echo   [!] openclaw not built, building now...
    call pnpm build
) else (
    echo   [OK] openclaw already built
)

REM 2. Check openclaw dependencies
echo.
echo Step 2: Check openclaw dependencies...
if not exist "node_modules" (
    echo   [!] Dependencies not installed, installing now...
    call pnpm install
) else (
    echo   [OK] Dependencies already installed
)

REM 3. Check pinokio status
echo.
echo Step 3: Check pinokio configuration...
cd /d D:\Code\goldieopenclaw\pinokio
if exist "main-standalone.js" (
    echo   [OK] main-standalone.js exists
) else (
    echo   [X] main-standalone.js does not exist
    exit /b 1
)

if exist "node_modules\electron\dist\electron.exe" (
    echo   [OK] electron installed
) else (
    echo   [X] electron not installed
    exit /b 1
)

echo.
echo === Ready ===
echo.
echo You can now start with:
echo.
echo   cd D:\Code\goldieopenclaw\pinokio
echo   npm start
echo.
echo This will:
echo   1. Start Pinokio Electron app
echo   2. Auto-start OpenClaw in 3 seconds (from source)
echo   3. Auto-stop OpenClaw when Pinokio closes
echo.
pause
