# Project instructions

## Shared baseline

This project uses the private aideia standard.

Before implementation, read:
- `.aideia/AGENTS.md`
- the aideia rule/skill files relevant to the current task.

Any change touching authentication, authorization, sessions, APIs, databases, admin actions, uploads, payments/economy, secrets, outbound URLs/webhooks, parsers, infrastructure or CI/CD must also read `.aideia/rules/SECURITY.md`. Use the `security-review` skill for substantial or risky security-sensitive changes.

For substantial frontend work, also inspect:
- `aideia.project.json` when present;
- `docs/design/ART_DIRECTION.md` when present;
- `docs/design/DESIGN_SYSTEM.md` when present;
- existing screens/components/tokens/references.

## Precedence

1. Current explicit user requirement.
2. This project's functionality and local instructions.
3. This project's art direction/design system.
4. Shared aideia quality/workflow guidance.

aideia does not define this project's visual theme.

If `.aideia` is unavailable or incomplete, say so rather than pretending its rules were loaded.
