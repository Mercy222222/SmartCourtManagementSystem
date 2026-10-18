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
call npx expo prebuild --platform android --clean --no-install

echo.
echo [2/2] Bien dich APK bang Gradle tren may...
cd android
call gradlew.bat assembleDebug

echo.
echo =======================================================
echo  BUILD THANH CONG!
echo  File APK nam tai:
echo  SmartCourtManagementSystem\android\app\build\outputs\apk\debug\app-debug.apk
echo =======================================================
pause
