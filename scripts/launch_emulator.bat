@echo off
title KHOI DONG ANDROID EMULATOR - THE ELITE FLEET
echo =======================================================
echo    DANG KHOI CHAY MAY AO ANDROID (PIXEL/MEDIUM PHONE)
echo =======================================================
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=%ANDROID_HOME%\emulator;%ANDROID_HOME%\platform-tools;%PATH%"

echo [1/2] Dang kiem tra danh sach may ao (AVD)...
"%ANDROID_HOME%\emulator\emulator.exe" -list-avds

echo.
echo [2/2] Dang bat may ao Android...
start "" "%ANDROID_HOME%\emulator\emulator.exe" -avd Medium_Phone_API_37.0

echo.
echo =======================================================
echo  May ao Android da duoc kich hoat thanh cong!
echo  Hay doi 10-20 giay de may ao khoi dong xong, sau do
echo  chay 'scripts\start_app.bat' roi go phim 'a' de mo app!
echo =======================================================
timeout /t 5
