$emulatorExe = Join-Path $env:LOCALAPPDATA "Android\Sdk\emulator\emulator.exe"
$arguments = "-avd Medium_Phone_API_37.0"

$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $emulatorExe
$psi.Arguments = $arguments
$psi.UseShellExecute = $true

$proc = [System.Diagnostics.Process]::Start($psi)
Write-Output "Emulator process started with PID: $($proc.Id)"
