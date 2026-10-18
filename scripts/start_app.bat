@echo off
title SMART COURT MOBILE APP - THE ELITE FLEET
echo =======================================================
echo    DANG KHOI CHAY UNG DUNG SMART COURT MANAGEMENT
echo    (INFINITY PADEL - REACT NATIVE / EXPO SDK 52)
echo =======================================================
cd /d "%~dp0..\SmartCourtManagementSystem"

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot\"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=C:\Program Files\nodejs;C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot\bin;%LOCALAPPDATA%\Android\Sdk\platform-tools;%LOCALAPPDATA%\Android\Sdk\emulator;%PATH%"

:: Kiem tra xem may ao da bat chua
adb devices | findstr /i "emulator" >nul 2>&1
if %errorlevel% neq 0 (
    echo [THONG BAO] Dang tu dong khoi dong May ao Android...
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0run_emulator.ps1"
    echo Dang cho may ao san sang...
    adb wait-for-device
)

echo.
echo =======================================================
echo [TRANG THAI]: May ao Android da ket noi thanh cong!
echo Dang nap ung dung vao may ao...
echo =======================================================
echo.

npx expo start --android
pause
