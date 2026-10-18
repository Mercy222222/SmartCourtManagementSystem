$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
[Environment]::SetEnvironmentVariable('ANDROID_HOME', $sdkPath, 'User')

$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$platformTools = "$sdkPath\platform-tools"
$emulatorPath = "$sdkPath\emulator"

$paths = $userPath -split ';' | Where-Object { $_ -ne '' }
if ($paths -notcontains $platformTools) {
    $paths += $platformTools
}
if ($paths -notcontains $emulatorPath) {
    $paths += $emulatorPath
}

$newPath = $paths -join ';'
[Environment]::SetEnvironmentVariable('Path', $newPath, 'User')

Write-Output "SUCCESS: ANDROID_HOME is set to $sdkPath"
Write-Output "SUCCESS: Added platform-tools and emulator to PATH"
