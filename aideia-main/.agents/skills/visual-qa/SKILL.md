---
name: visual-qa
description: Verify a frontend change after implementation by inspecting rendered UI, responsive behavior, states, accessibility basics, and visual consistency. Use before declaring a substantial UI task complete.
---

# Visual QA

Read:
- ../../../rules/QA.md
- ../../../rules/ANTI_AI_SLOP.md
- ../../../rules/DESIGN_IDENTITY.md

## Required checks when available

1. Run typecheck/lint/tests/build relevant to the change.
2. Render the changed screen.
3. Inspect at least:
   - narrow mobile around 390px;
   - desktop around 1440px;
   - any layout-changing breakpoint.
4. Exercise important interactive states.
5. Check keyboard/focus behavior for interactive components.
6. Inspect loading, empty, error and disabled states when relevant.
7. Compare against local art direction/references.
8. Perform an anti-slop pass on the **rendered result**.
9. Review the diff for scope creep and duplicated primitives.

## Prefer deterministic evidence

If the project supports them, use:
- Playwright screenshots;
- Storybook stories;
- visual regression;
- accessibility checks;
- existing E2E flows.

Do not approve changed screenshot baselines blindly.

## Completion report

State:
- checks run;
- visual viewports/states inspected;
- issues fixed;
- checks unavailable and why.

Do not say "pixel perfect" unless there is an actual reference and comparison.
