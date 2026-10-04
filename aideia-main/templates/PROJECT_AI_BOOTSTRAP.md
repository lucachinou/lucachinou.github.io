# Project AI bootstrap

Use this when connecting a product repository to the aideia standard.

## Recommended local files

Create/maintain in the target project:
- AGENTS.md
- docs/design/ART_DIRECTION.md
- docs/design/DESIGN_SYSTEM.md
- design/references/ when visual references exist

Optional adapters:
- CLAUDE.md
- GEMINI.md
- .github/copilot-instructions.md
- .cursor/rules/

## Minimal target-project AGENTS.md

~~~md
# Project instructions

Before implementation, follow the shared aideia standard from:
GarfieldTVA/aideia

Read its AGENTS.md and all rules relevant to this task.
For any trust-boundary/security-sensitive change, explicitly load `rules/SECURITY.md` and use the `security-review` skill when the change is substantial or risky.

Then follow this project's local files:
- docs/design/ART_DIRECTION.md
- docs/design/DESIGN_SYSTEM.md

aideia defines quality and workflow.
This repository defines product behavior and visual identity.

Do not replace this project's art direction with aideia examples.
~~~

## Private-repository access

The coding agent needs authorized access to GarfieldTVA/aideia.

If it cannot fetch/read the private repository, provide these files in the workspace or attach them. Mentioning a private GitHub URL does not magically reveal its contents.

## First project audit

Before a major UI rewrite, ask the agent to:
1. inventory existing UI primitives;
2. inventory styling/tokens;
3. identify duplicated components;
4. infer current art direction from actual code/screenshots;
5. fill ART_DIRECTION.md;
6. fill DESIGN_SYSTEM.md;
7. only then redesign major surfaces.

This prevents a generic template from replacing an established product identity.

## First security audit

For a project with authentication, APIs, private data, admin capabilities, uploads, external fetches/webhooks, money/economy state or deployment credentials:
1. map trust boundaries and roles/tenants;
2. identify security-critical routes/jobs/webhooks;
3. document authorization invariants;
4. inventory secrets and privileged credentials;
5. review dependency/CI permissions;
6. run project-native security tooling and `.aideia/tools/security-audit.mjs`;
7. create a project-specific review from `templates/SECURITY_REVIEW.template.md` for material risks.

Do not claim the project is fully secure because a checklist/scanner passed.
