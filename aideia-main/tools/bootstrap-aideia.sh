#!/usr/bin/env sh
set -eu

TARGET="${1:-.}"
REPO_URL="${AIDEIA_REPO_URL:-git@github.com:GarfieldTVA/aideia.git}"

cd "$TARGET"
git rev-parse --is-inside-work-tree >/dev/null

if [ ! -e .aideia ]; then
  git submodule add -b main "$REPO_URL" .aideia
else
  git submodule update --init --recursive .aideia
fi

START='<!-- aideia:start -->'
END='<!-- aideia:end -->'
BLOCK="$START
## Shared aideia baseline

Before implementation, read .aideia/AGENTS.md and the aideia rules/skills relevant to the task.
For any trust-boundary/security-sensitive work (auth, authorization, sessions, APIs, database access, admin, uploads, money/economy, secrets, outbound URLs/webhooks, parsers, infrastructure or CI/CD), read .aideia/rules/SECURITY.md and use the security-review skill for substantial/risky changes.
For substantial UI work, inspect this project's local art direction, design system, aideia.project.json if present, existing components and rendered screens.
This project owns its visual identity. aideia defines quality/workflow, not a universal theme.
If .aideia is unavailable, say so instead of pretending its rules were loaded.
$END"

if [ -f AGENTS.md ]; then
  if grep -q "$START" AGENTS.md; then
    awk -v block="$BLOCK" '
      BEGIN { inblock=0 }
      $0 == "<!-- aideia:start -->" { print block; inblock=1; next }
      $0 == "<!-- aideia:end -->" { inblock=0; next }
      !inblock { print }
    ' AGENTS.md > AGENTS.md.tmp
    mv AGENTS.md.tmp AGENTS.md
  else
    printf "\n\n%s\n" "$BLOCK" >> AGENTS.md
  fi
else
  cp .aideia/templates/TARGET_AGENTS.md AGENTS.md
fi

printf "%s\n" "aideia attached. Review AGENTS.md and pin/commit the submodule revision intentionally."
