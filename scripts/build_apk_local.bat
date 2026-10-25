@echo off
title BUILD APK (LOCAL OFFLINE) - THE ELITE FLEET
echo =======================================================
echo    BUILD FILE APK ANDROID CUC BO (LOCAL OFFLINE)
echo    KHONG CAN TAI KHOAN EXPO - KHONG CAN CHO HANG DOI CLOUD
echo =======================================================
cd /d "%~dp0..\SmartCourtManagementSystem"

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot\"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=C:\Program Files\nodejs;C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot\bin;%LOCALAPPDATA%\Android\Sdk\platform-tools;%PATH%"

echo [1/2] Tao thu muc native Android (Prebuild)...
call "C:\Program Files\nodejs\npx.cmd" expo prebuild --platform android --clean --no-install

echo.
echo [2/2] Bien dich APK bang Gradle tren may...
cd android
call gradlew.bat assembleDebug

echo.
echo =======================================================
echo  BUILD THANH CONG!
echo =======================================================
cd ..
if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    copy /Y "android\app\build\outputs\apk\debug\app-debug.apk" "..\SmartCourt-v1.0.0.apk"
    copy /Y "android\app\build\outputs\apk\debug\app-debug.apk" "SmartCourt-v1.0.0.apk"
    echo File APK da duoc copy ra: SmartCourtManagementSystem\SmartCourt-v1.0.0.apk
)
