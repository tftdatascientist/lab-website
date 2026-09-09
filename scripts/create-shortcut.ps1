# create-shortcut.ps1 — jeden skrót LOKAI.lnk na pulpicie -> scripts\lokai-dual.ps1
# Aktualizuje w miejscu; kasuje stare nazwy z LEGACY_NAMES.
$ErrorActionPreference = "Stop"
$root    = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$target  = Join-Path $root "scripts\lokai-dual.ps1"
$desktop = [Environment]::GetFolderPath("Desktop")
$LEGACY_NAMES = @("lok-ai.lnk", "LOK-AI.lnk", "lokai.lnk")
foreach ($n in $LEGACY_NAMES) { $p = Join-Path $desktop $n; if (Test-Path $p) { Remove-Item $p; Write-Host "usunieto stary skrot: $n" } }

$lnk = Join-Path $desktop "LOKAI.lnk"
$ws  = New-Object -ComObject WScript.Shell
$s   = $ws.CreateShortcut($lnk)
$s.TargetPath       = "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe"
$s.Arguments        = "-NoProfile -ExecutionPolicy Bypass -File `"$target`""
$s.WorkingDirectory = $root
$s.Description      = "lok-ai.pl: stary design (3300) i nowy (3301) obok siebie"
$s.IconLocation     = "$env:SystemRoot\System32\shell32.dll,43"
$s.Save()
Write-Host "OK: $lnk -> $target"
