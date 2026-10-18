@echo off
title BUILD EXPO (EAS CLOUD) - THE ELITE FLEET
color 0A
echo ======================================================================
echo          TRIEU HI ^& THE ELITE FLEET - EXPO CLOUD BUILD
echo ======================================================================
echo.
cd /d "%~dp0..\SmartCourtManagementSystem"

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot\"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=C:\Program Files\nodejs;%PATH%"

echo [1/3] Kiem tra tai khoan Expo (EAS)...
call npx eas-cli whoami
if %errorlevel% neq 0 (
    echo.
    echo ==================================================================
    echo [BUOC 1: DANG NHAP EXPO]
    echo He thong se mo trinh duyet de sep dang nhap tai khoan Expo.
    echo (Neu chua co tai khoan, sep co the chon Register/Sign up bang Google)
    echo ==================================================================
    echo.
    call npx eas-cli login
)

echo.
echo ======================================================================
echo [BUOC 2: CHON CHE DO BUILD TREN EXPO CLOUD]
echo  [1] Build file APK Android (Khuyen dung - cai truc tiep len moi dien thoai)
echo  [2] Build ca 2 nen tang Android va iOS (eas build --platform all)
echo  [3] Build file AAB Android (de publish len Google Play Store)
echo ======================================================================
set /p build_choice="Sep chon che do [1, 2 hoac 3] (Mac dinh la 1): "

if "%build_choice%"=="2" (
    echo.
    echo Dang khoi chay: npx eas-cli build --platform all --profile preview
    call npx eas-cli build --platform all --profile preview
) else if "%build_choice%"=="3" (
    echo.
    echo Dang khoi chay: npx eas-cli build --platform android --profile production
    call npx eas-cli build --platform android --profile production
) else (
    echo.
    echo Dang khoi chay: npx eas-cli build --platform android --profile preview (XUAT FILE .APK)
    call npx eas-cli build --platform android --profile preview
)

echo.
echo ======================================================================
echo  BUILD HOAN TAT!
echo  Sep co the quet ma QR hoac click vao duong link tren de tai file ve!
echo ======================================================================
pause
