$url = "https://expo.dev/artifacts/eas/fkxq7lYzAeI52mKjOImzfT7n2ki5IntNvu-SmxLNsRs.apk"
$out1 = "c:\Users\pc\.gemini\antigravity-ide\scratch\SmartCourtManagementSystem\SmartCourtManagementSystem-Release.apk"
$out2 = "C:\Users\pc\StudioProjects\SmartCourtManagementSystem\SmartCourtManagementSystem-Release.apk"

Write-Output "Downloading APK from Expo Cloud..."
Invoke-WebRequest -Uri $url -OutFile $out1
Copy-Item $out1 $out2 -Force
$sizeMB = [math]::Round((Get-Item $out1).Length / 1MB, 2)
Write-Output "SUCCESS: Downloaded SmartCourtManagementSystem-Release.apk ($sizeMB MB)"
