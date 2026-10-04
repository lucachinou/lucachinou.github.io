Use AGENTS.md as the primary repository instruction file.

For frontend/UI work, read the referenced files under rules/ before implementation, especially UI_IMPLEMENTATION.md, ANTI_AI_SLOP.md, CONTENT.md, COMPONENT_SOURCES.md and QA.md.

For any trust-boundary/security-sensitive work (auth, authorization, sessions, APIs, database access, admin, uploads, money/economy, secrets, outbound URLs/webhooks, parsers, infrastructure or CI/CD), read rules/SECURITY.md and use the security-review skill for substantial/risky changes.

Do not treat aideia as a reusable visual theme. Preserve the target project's local art direction and design system.

Do not invent filler copy, fake data, fake product claims or unnecessary decorative sections.

Inspect existing code/components before adding new abstractions, and validate rendered UI rather than stopping after source edits.
