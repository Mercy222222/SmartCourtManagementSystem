@echo off
title CAI DAT ANDROID STUDIO - SMART COURT TEAM
echo =======================================================
echo     TRIEU HI & THE ELITE FLEET - HO TRO CAI DAT
echo =======================================================

:: Kiem tra quyen Administrator va tu dong xin quyen
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [THONG BAO] Dang yeu cau quyen Administrator de cai dat...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process cmd.exe -ArgumentList '/c \"\"%~f0\"\"' -Verb RunAs"
    exit /b
)

echo.
echo [1/3] Dang bat dau cai dat Android Studio...
winget install --id Google.AndroidStudio -e --accept-package-agreements --accept-source-agreements

if %errorlevel% neq 0 (
    echo [LUU Y] Mo trang web tai bo cai Android Studio truc tiep tu Google...
    start https://developer.android.com/studio
)

echo.
echo [2/3] Cau hinh bien moi truong ANDROID_HOME...
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk" >nul 2>&1

echo.
echo [3/3] Kiem tra va khoi dong Android Studio...
if exist "%ProgramFiles%\Android\Android Studio\bin\studio64.exe" (
    echo Tim thay Android Studio! Dang khoi chay...
    start "" "%ProgramFiles%\Android\Android Studio\bin\studio64.exe"
)

echo.
echo =======================================================
echo   CAI DAT HOAN TAT! SANG BUOC BAT MAY AO VA CHAY APP!
echo =======================================================
pause
