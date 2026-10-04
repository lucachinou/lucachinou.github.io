# Definition of done

A coding agent must not claim completion merely because files were edited.

Run relevant checks when available. If one cannot be run, report that clearly.

## Engineering checks
- Typecheck passes when applicable.
- Lint passes or new violations are explained.
- Relevant tests pass.
- Build succeeds when practical.
- No accidental debug logs.
- No dead imports/components introduced.
- No secrets or local machine paths committed.
- Security-sensitive changes include negative authorization/abuse tests, not only happy paths.
- New/changed dependencies and CI permissions were reviewed when applicable.

## Security gate

When a change crosses a trust boundary, apply `rules/SECURITY.md` and use the `security-review` skill for substantial/risky diffs.

At minimum, verify applicable:
- unauthenticated and wrong-role access is denied;
- cross-user/cross-tenant object access is denied;
- untrusted input cannot reach SQL/shell/HTML/filesystem/URL fetchers unsafely;
- secrets/tokens are not exposed to source, logs or client storage;
- replay/duplicate/concurrency behavior preserves business invariants;
- production errors fail safely and redact sensitive internals.

Supplement project-native tooling with:
`node .aideia/tools/security-audit.mjs . --fail-on-high`

A clean scanner result is not proof of security.

## UI functional checks
Verify relevant primary/secondary actions, navigation, validation, loading/error/disabled states and overlay keyboard behavior.

## Visual checks
Inspect rendered output, not only source.

At minimum when applicable:
- narrow mobile around 390px;
- desktop around 1440px;
- any breakpoint where the layout mode changes.

Look for overflow, clipped text, broken wrapping, horizontal scroll, overlaps, inconsistent spacing/radii, stray colors, low contrast, icon misalignment and unstable layout.

## Visual regression
When the project already supports Playwright, Storybook, screenshots or another visual-regression system, use it. Update baselines intentionally; never blindly accept them.

## Content pass
Remove demo/filler copy, fake stats, repeated explanations and leaked internal text. Verify labels match actions and errors help recovery.

## Anti-slop pass
Review rules/ANTI_AI_SLOP.md against the **rendered result**.

Check whether:
- too many things became cards;
- decoration compensates for weak hierarchy;
- the page copied a generic dashboard layout;
- sourced components still look like their demo library;
- the design could belong to almost any unrelated product.

## Scope pass
Review the diff:
- Did unrelated areas change?
- Did a visual task alter business logic?
- Was an existing component duplicated?
- Was a dependency added without enough value?

Clean these up before declaring completion.
