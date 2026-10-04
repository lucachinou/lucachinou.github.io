---
name: ui-audit
description: Audit an existing frontend before redesigning or extending it. Use when you need to understand current visual language, duplicated primitives, inconsistent tokens, layout patterns, content problems, or sources of generic AI-looking UI. Do not use for greenfield projects with no existing UI.
---

# Existing UI audit

Read:
- ../../../rules/DESIGN_IDENTITY.md
- ../../../rules/ANTI_AI_SLOP.md
- ../../../rules/CONTENT.md

## Inspect

1. Main routes/screens relevant to the task.
2. Shared layout/chrome.
3. Canonical UI primitives.
4. Styling/token sources.
5. Fonts/icons/assets.
6. Responsive behavior.
7. Repeated patterns and obvious one-offs.
8. Visible copy.
9. Existing screenshots/tests/stories.

## Produce an evidence-based audit

Identify:
- what is already coherent and should be preserved;
- the current visual fingerprint;
- duplicated or competing primitives;
- accidental style drift;
- generic template patterns;
- accessibility/usability concerns;
- unnecessary copy/decorative UI;
- the smallest system-level fixes that would improve consistency.

Do not call something "bad" merely because it is not your preferred style.

## Before redesigning

Separate:
- **identity problems** — the product has no clear visual stance;
- **consistency problems** — the stance exists but implementation drifts;
- **composition problems** — page structure does not fit the task;
- **polish problems** — spacing, alignment, states, motion;
- **behavior bugs** — functionality is wrong.

Do not solve one category by unnecessarily rewriting all others.
