---
name: ui-implementation
description: Implement or redesign frontend UI after the product identity and existing component system are understood. Use for pages, components, styling, responsive work, interaction and motion. Do not use as a substitute for auditing an unfamiliar UI first.
---

# UI implementation

Read:
- ../../../rules/UI_IMPLEMENTATION.md
- ../../../rules/DESIGN_IDENTITY.md
- ../../../rules/ANTI_AI_SLOP.md
- ../../../rules/CONTENT.md
- ../../../rules/QA.md

Use `component-sourcing` only when a non-trivial interaction actually benefits from external code.

## Before coding

Confirm from the target project:
- what behavior must remain unchanged;
- which primitives/tokens already exist;
- what local visual identity is authoritative;
- which page states matter;
- which breakpoints matter.

If identity is unclear for a substantial design task, use `design-direction` first.
If the existing UI is unfamiliar or inconsistent, use `ui-audit` first.

## Implementation loop

1. Build the smallest coherent structure that serves the task.
2. Reuse canonical local primitives.
3. Establish hierarchy with layout/spacing/type before decoration.
4. Implement real content and states; do not invent filler.
5. Add motion only where it communicates something.
6. Check responsive behavior while building, not only at the end.
7. Keep unrelated surfaces untouched.
8. Remove abandoned experiments/dead code.

## Finish

Use `visual-qa` before declaring substantial UI work complete.

The rendered product, not the source diff, is the final artifact.
