@echo off
title EAS BUILD --PLATFORM ALL (EXPO CLOUD) - THE ELITE FLEET
color 0B
echo ======================================================================
echo          DANG CHAY LENH: eas build --platform all
echo ======================================================================
echo.
cd /d "%~dp0..\SmartCourtManagementSystem"

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot\"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=C:\Program Files\nodejs;%PATH%"

echo [1/2] Kiem tra dang nhap tai khoan Expo...
call npx eas-cli whoami
if %errorlevel% neq 0 (
    echo.
    echo ==================================================================
    echo [DANG NHAP TAI KHOAN EXPO]
    echo He thong dang mo trinh duyet... Sep chi can bam "Allow / Authorize"!
    echo (Tab trinh duyet @huutri222s-team cua sep da dang nhap san!)
    echo ==================================================================
    echo.
    call npx eas-cli login
)

echo.
echo ======================================================================
echo [2/2] DANG KHOI CHAY BUILD CLOUD: eas build --platform all
echo ======================================================================
echo.
call npx eas-cli build --platform all

echo.
echo ======================================================================
echo  HOAN TAT! XEM LINK TAI TREN HOAC TREN DASHBOARD EXPO:
echo  https://expo.dev
echo ======================================================================
pause
