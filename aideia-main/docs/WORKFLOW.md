# aideia workflow

## Why the workflow is layered

The root AGENTS.md stays intentionally short. Detailed workflows live in focused skills and references so an agent loads only what the current task needs.

This reduces instruction noise and makes it less likely that every task is forced through the same design recipe.

## Reliable project setup

Best reliability:

1. Put a pinned checkout/submodule of this private repo at `.aideia` in the target repository.
2. Add the shared block from `templates/TARGET_AGENTS.md` to the target root `AGENTS.md`.
3. Keep product-specific design decisions in the target repository.
4. Update the aideia revision intentionally, like any other shared dependency.

Windows helper:
`powershell -ExecutionPolicy Bypass -File <path-to-aideia>/tools/bootstrap-aideia.ps1 -Target <target-repo>`

Unix helper:
`sh <path-to-aideia>/tools/bootstrap-aideia.sh <target-repo>`

The bootstrap does not overwrite existing project instructions blindly.

## Existing product UI task

Typical sequence:

1. `ui-audit` when the surface/system is unfamiliar or inconsistent.
2. `design-direction` only if visual identity is missing, conflicting or generic.
3. `ui-implementation`.
4. `component-sourcing` only for interactions that benefit from external code.
5. `ui-copy` when visible text is part of the problem.
6. `visual-qa` before completion.

Do not run every skill mechanically.

## Greenfield UI

1. Understand product tasks and constraints.
2. Use `design-direction` to establish a visual fingerprint.
3. Create local `aideia.project.json` and/or design docs when useful.
4. Establish a small set of canonical primitives.
5. Implement screens from product information architecture rather than a generic template.
6. Run `visual-qa`.

## Non-UI code task

1. Read `rules/CORE.md` and `rules/ANTI_AI_CODE.md`.
2. If the change crosses a trust boundary, also read `rules/SECURITY.md`.
3. Follow the target repository's architecture.
4. Implement the smallest coherent change.
5. Run relevant tests/checks, including negative security tests when applicable.
6. Use `code-review` for substantial diffs and `security-review` for security-sensitive/risky diffs.

## UI review

Use `ui-review` when reviewing an implementation rather than building it.

It separates correctness, architecture, consistency, responsive/accessibility problems, generic-template problems and minor polish.

## Security-sensitive task

Typical sequence:

1. Load `rules/SECURITY.md`.
2. Map assets, actors, entry points, trust boundaries and security invariants.
3. Trace attacker-controlled input to sensitive sinks.
4. Verify route/object/field-level authorization and tenant boundaries.
5. Review sessions, secrets, external calls, dependencies and CI impact.
6. Test abuse, replay, duplicate and concurrency paths relevant to the feature.
7. Run project-native security checks plus the aideia heuristic scanner.
8. Use `security-review` before completion for substantial/risky changes.
9. Record material threat models using `templates/SECURITY_REVIEW.template.md` when useful.

Local heuristic scanner:

`node .aideia/tools/security-audit.mjs .`

Stricter local gate:

`node .aideia/tools/security-audit.mjs . --fail-on-high`

This scanner is deliberately incomplete and may produce false positives. It complements, rather than replaces, SAST/SCA/secret scanning/DAST/manual review.

Repository and delivery controls are documented in `docs/SECURITY_BASELINE.md`.

## Heuristic audit tool

Run:

`node .aideia/tools/aideia-audit.mjs .`

Optional JSON:

`node .aideia/tools/aideia-audit.mjs . --json`

Optional failure for high-confidence smells:

`node .aideia/tools/aideia-audit.mjs . --fail-on-high`

This tool is deliberately heuristic. Findings are review prompts, not automatic proof that code/design is wrong.

## Validate aideia itself

Run:

`node tools/validate-repo.mjs`

The validator checks skill manifests, JSON files and root instruction size.

An optional GitHub Actions workflow is provided at:
`templates/validate-aideia.workflow.yml`

Copy it to `.github/workflows/validate-aideia.yml` only in repositories where GitHub Actions is enabled and runners are available.

## Visual identity

For substantial UI work, the target product should have a clear stance across multiple design axes rather than one decorative gimmick.

See:
- `rules/DESIGN_IDENTITY.md`
- `schemas/aideia.project.schema.json`
- `templates/aideia.project.example.json`

## Updating aideia

Because the target project pins aideia, updating the standard is explicit.

This is desirable: an agent working on a feature should not suddenly receive changed global behavior halfway through the task.
