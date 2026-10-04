param(
  [string]$Target = ".",
  [string]$RepoUrl = "git@github.com:GarfieldTVA/aideia.git",
  [switch]$CreateProfile
)

$ErrorActionPreference = "Stop"
$targetPath = (Resolve-Path $Target).Path
Push-Location $targetPath

try {
  git rev-parse --is-inside-work-tree | Out-Null
  if (-not (Test-Path ".aideia")) {
    git submodule add -b main $RepoUrl .aideia
  } else {
    git submodule update --init --recursive .aideia
  }

  $block = @"
<!-- aideia:start -->
## Shared aideia baseline

Before implementation, read .aideia/AGENTS.md and the aideia rules/skills relevant to the task.
For any trust-boundary/security-sensitive work (auth, authorization, sessions, APIs, database access, admin, uploads, money/economy, secrets, outbound URLs/webhooks, parsers, infrastructure or CI/CD), read .aideia/rules/SECURITY.md and use the security-review skill for substantial/risky changes.
For substantial UI work, inspect this project's local art direction, design system, aideia.project.json if present, existing components and rendered screens.
This project owns its visual identity. aideia defines quality/workflow, not a universal theme.
If .aideia is unavailable, say so instead of pretending its rules were loaded.
<!-- aideia:end -->
"@

  $agentsPath = Join-Path $targetPath "AGENTS.md"
  if (Test-Path $agentsPath) {
    $existing = Get-Content $agentsPath -Raw
    $pattern = '(?s)<!-- aideia:start -->.*?<!-- aideia:end -->'
    if ($existing -match $pattern) {
      $updated = [regex]::Replace($existing, $pattern, $block)
    } else {
      $updated = $existing.TrimEnd() + [Environment]::NewLine + [Environment]::NewLine + $block + [Environment]::NewLine
    }
    Set-Content -Path $agentsPath -Value $updated -Encoding utf8
  } else {
    Copy-Item ".aideia/templates/TARGET_AGENTS.md" $agentsPath
  }

  if ($CreateProfile -and -not (Test-Path "aideia.project.json")) {
    Copy-Item ".aideia/templates/aideia.project.example.json" "aideia.project.json"
  }

  Write-Host "aideia attached to $targetPath"
  Write-Host "Review AGENTS.md and pin/commit the submodule revision intentionally."
} finally {
  Pop-Location
}
