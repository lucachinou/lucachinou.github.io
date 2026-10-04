# aideia

Central AI development standard for GarfieldTVA projects.

aideia is **not a reusable visual theme**. It is a quality/workflow layer for coding agents: better code, less generated-code bloat, stronger UI coherence, less generic "AI slop", better component sourcing and real QA.

## Recommended use

The most reliable setup is to attach this private repository to a target project as a **pinned `.aideia` checkout/submodule** and let the target root `AGENTS.md` point to it.

Why: telling an agent "go read this private repo" only works when that agent actually has cross-repository authorization. Putting aideia in the workspace makes the standard explicit and reproducible.

See `docs/WORKFLOW.md`.

Windows helper:
`powershell -ExecutionPolicy Bypass -File <path-to-aideia>/tools/bootstrap-aideia.ps1 -Target <target-repo>`

Unix helper:
`sh <path-to-aideia>/tools/bootstrap-aideia.sh <target-repo>`

## Everyday AI prompt

Once attached:

> Follow this project's AGENTS.md and the attached .aideia standard. Use only the aideia workflows relevant to this task, preserve the project's own visual identity, and verify the real result before finishing. Task: <what I want>

The full prompt recipes are in `prompts/USE_AIDEIA.md`.

## Architecture

### Small root instructions
`AGENTS.md` contains only stable, high-value rules.

### Focused skills
Detailed workflows live under `.agents/skills/` so agents can load them progressively:

- `project-bootstrap`
- `ui-audit`
- `design-direction`
- `ui-implementation`
- `component-sourcing`
- `ui-copy`
- `visual-qa`
- `code-review`
- `security-review`
- `ui-review`

### Rules
- `rules/CORE.md`
- `rules/SECURITY.md`
- `rules/ANTI_AI_CODE.md`
- `rules/DESIGN_IDENTITY.md`
- `rules/UI_IMPLEMENTATION.md`
- `rules/ANTI_AI_SLOP.md`
- `rules/CONTENT.md`
- `rules/COMPONENT_SOURCES.md`
- `rules/RESEARCH_AND_DEPENDENCIES.md`
- `rules/QA.md`

### Project identity

For projects that need a persistent machine-readable visual contract:

- `schemas/aideia.project.schema.json`
- `templates/aideia.project.example.json`

The profile describes a project's **visual fingerprint** across density, geometry, surfaces, typography, contrast, color behavior, composition, navigation, motion, imagery and data treatment.

This is the main protection against "same design every time".

### Tools

`tools/aideia-audit.mjs` scans a target project for high-signal generated-code/UI smells such as filler phrases, empty catches, excessive large rounding, effect stacking and repeated type escape hatches.

`tools/security-audit.mjs` adds a fast local heuristic pass for high-risk security patterns such as disabled TLS verification, committed key/token signatures, dynamic code execution, unsafe deserialization, credentials in Web Storage, wildcard CORS, raw HTML sinks and risky process execution.

Both tools are deliberately heuristic: findings are prompts for review, not automatic proof of a defect, and a clean result is not proof of security.

`tools/validate-repo.mjs` validates aideia's own skill manifests, JSON files and root-instruction size.

An opt-in GitHub Actions workflow template is available at `templates/validate-aideia.workflow.yml`.

Security guidance:
- `rules/SECURITY.md` — application/security engineering baseline;
- `docs/SECURITY_BASELINE.md` — repository, CI/CD and delivery hardening;
- `templates/SECURITY_REVIEW.template.md` — project/change threat-model and review worksheet.

## Core principle

**Share the quality bar and visual grammar rules, not the composition.**

Inside one project:
- reuse its tokens;
- reuse its primitives;
- reuse its interaction language;
- reuse its state language.

Across projects:
- vary composition;
- vary density;
- vary geometry;
- vary material;
- vary typography character;
- vary signature motifs based on the product.

The product should look designed for itself, not like the same AI template with different copy.

## Current component research

See `docs/COMPONENT_CATALOG.md`.

The catalog covers behavior-first foundations such as Base UI/Radix/React Aria, code distribution via shadcn registries, agent-oriented discovery via 21st, Motion, selective expressive libraries, Storybook and Playwright.

## Agent adapters

Thin adapters are included for:
- OpenAI/Codex via `AGENTS.md` and skills;
- Claude Code via `CLAUDE.md`;
- Gemini via `GEMINI.md`;
- GitHub Copilot via `.github/copilot-instructions.md`;
- Cursor via `.cursor/rules/aideia.mdc`.

Tool-specific adapters stay small. The actual standard lives in rules/skills so it is not duplicated across agents.
