# lokai-dual.ps1 — stary i nowy design lok-ai.pl obok siebie.
#   3300 = STARY (gałąź main, katalog lab-website)          -> to samo, co produkcja
#   3301 = NOWY  (gałąź redesign-ccud, katalog lab-website-redesign)
# Jeśli port już odpowiada, serwer nie jest uruchamiany drugi raz — otwiera się tylko przeglądarka.
# Uruchomienie: skrót LOKAI.lnk na pulpicie (scripts\create-shortcut.ps1) albo:
#   powershell -ExecutionPolicy Bypass -File scripts\lokai-dual.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$old  = $root
$new  = Join-Path (Split-Path -Parent $root) "lab-website-redesign"

function Test-Port([int]$port) {
    try { $c = New-Object Net.Sockets.TcpClient; $c.Connect("127.0.0.1", $port); $c.Close(); return $true } catch { return $false }
}
function Start-Dev([string]$dir, [int]$port, [string]$label) {
    if (-not (Test-Path (Join-Path $dir "package.json"))) { Write-Host "BRAK katalogu: $dir"; return }
    if (Test-Port $port) { Write-Host "$label : port $port juz odpowiada, pomijam start"; return }
    $cmd = "`$Host.UI.RawUI.WindowTitle = 'lok-ai $label :$port'; Set-Location -LiteralPath '$dir'; npx next dev -p $port"
    Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-Command", $cmd | Out-Null
    Write-Host "$label : start na $port ($dir)"
}

Start-Dev $old 3300 "STARY"
Start-Dev $new 3301 "NOWY"

# czekaj na oba (maks. 90 s), potem otworz obie karty
$deadline = (Get-Date).AddSeconds(90)
while ((Get-Date) -lt $deadline -and -not ((Test-Port 3300) -and (Test-Port 3301))) { Start-Sleep -Milliseconds 800 }
Start-Process "http://localhost:3300/"
Start-Process "http://localhost:3301/"
Write-Host "STARY: http://localhost:3300   NOWY: http://localhost:3301"
