# aideia

Use aideia as a **quality and workflow standard**, never as a shared visual theme.

## Always

- Inspect the target repository before editing.
- Preserve working behavior unless the task explicitly changes it.
- Reuse existing architecture/components before creating parallel systems.
- Never invent product facts, metrics, testimonials, features or filler copy.
- Do not redesign unrelated surfaces.
- Validate the real result before claiming completion.

## Load only what the task needs

- General engineering: `rules/CORE.md` + `rules/ANTI_AI_CODE.md`
- Security-sensitive/trust-boundary work: `rules/SECURITY.md` + skill `security-review`
- Existing UI audit: skill `ui-audit`
- New/unclear visual direction: skill `design-direction`
- Frontend implementation: skill `ui-implementation`
- External kit/component research: skill `component-sourcing`
- Visible copy cleanup: skill `ui-copy`
- Final rendered verification: skill `visual-qa`
- General code review: skill `code-review`
- UI-specific review: skill `ui-review`
- Attach aideia to another repository: skill `project-bootstrap`

For substantial frontend work, read `rules/DESIGN_IDENTITY.md`.

Security is not UI-specific. Any change touching auth, authorization, sessions, APIs, databases, admin actions, uploads, payments/economy, secrets, outbound URLs/webhooks, parsers, infrastructure or CI/CD must load `rules/SECURITY.md`.

## Identity rule

The target project owns its typography, colors, geometry, density, surfaces, iconography, imagery, motion and composition.

If a local `aideia.project.json`, art-direction file, design system, screenshots or established UI exists, it outranks aideia examples.

If identity is unclear, infer a product-specific direction from product evidence. Do not fall back to generic "modern SaaS" styling.

## Completion

Do not stop after generating code. Use the relevant QA/review workflow and explicitly report checks that could not be run.
