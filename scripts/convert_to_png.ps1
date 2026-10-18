Add-Type -AssemblyName System.Drawing
$srcPath = 'C:\Users\pc\.gemini\antigravity-ide\brain\a3dfc73d-0c92-416c-8c59-64f577626d54\smart_court_icon_1792288404936.jpg'
$assetsDir = 'C:\Users\pc\.gemini\antigravity-ide\scratch\SmartCourtManagementSystem\SmartCourtManagementSystem\assets'

$img = [System.Drawing.Image]::FromFile($srcPath)
$img.Save("$assetsDir\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Save("$assetsDir\adaptive-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Save("$assetsDir\splash.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Save("$assetsDir\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Write-Output "PNG conversion completed!"
