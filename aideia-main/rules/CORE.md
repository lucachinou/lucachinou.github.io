# Core engineering rules

## Inspect before changing
Inspect relevant files, nearby architecture, components, utilities, tokens and data flow before implementing. Find the existing solution before creating a second one.

## Preserve behavior by default
A visual task does not authorize business-logic changes. A refactor does not authorize a redesign. A bug fix does not authorize unrelated architecture replacement.

## Prefer local consistency
Match the target repository's established language/framework patterns, naming, state management, data fetching, validation, errors, tests and component boundaries.

## Avoid duplication
Before adding a helper, hook, component, token, API client or utility:
1. search for an equivalent;
2. extend it when coherent;
3. create new only when genuinely necessary.

## Dependency discipline
Add dependencies only when they materially improve correctness, accessibility, maintainability or implementation quality. Prefer maintained, documented packages and avoid overlapping libraries.

Never execute opaque remote scripts merely to save time.

## Truthful implementation
Do not fabricate API responses, production data, user counts, revenue, testimonials, security claims, live activity, success states or integrations.

## Edge states
For meaningful features, consider loading, empty, error, disabled, permission, partial-data and retry states where relevant.

## Security/privacy
Do not expose secrets or private data. Do not weaken auth, authorization, validation or security policy to simplify a flow.

For any change crossing a trust boundary (auth, sessions, APIs, database access, admin, uploads, money/economy, secrets, outbound URLs/webhooks, parsers, infrastructure or CI/CD), read and apply `rules/SECURITY.md`. Treat the client as hostile, authorize server-side, deny by default and verify negative/abuse paths before completion.

## Comments
Comment non-obvious decisions and constraints, not line-by-line mechanics.

## Finish the task
Run relevant checks, inspect the actual output and remove placeholders, dead code and accidental leftovers.
