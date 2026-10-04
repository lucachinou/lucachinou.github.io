# External component and UI-kit sourcing

## Goal
Use high-quality existing work when it improves the result, without turning the product into a collage of demo components.

## Search first for complex interactions
Before hand-building a non-trivial interaction, check:
1. the target project's existing components;
2. its installed libraries;
3. maintained official component primitives;
4. approved external registries/kits when appropriate.

Do not search the web for trivial markup that is simpler and safer to implement locally.

## Source categories

### Behavior/accessibility foundations
Good candidates:
- Base UI
- React Aria
- Radix UI

Use primarily for robust behavior, semantics, focus management and accessibility.

### Application primitives
Good candidate:
- shadcn/ui and compatible registries

Treat copied source as project-owned code that must be reviewed and adapted. Never assume demo styling is the target design.

### Motion
Good candidates:
- Motion
- Motion Primitives

Use motion for state, continuity and interaction, not simply because a demo looks impressive.

### Expressive/visual components
Potential sources:
- 21st.dev
- Magic UI
- Aceternity UI
- other maintained registries that fit the target stack

Use selectively. These are implementation material and inspiration, not a visual identity to copy wholesale.

## Selection rules
When several choices are plausible:
- inspect more than one option when practical;
- prefer the strongest interaction/accessibility foundation;
- prefer simpler dependencies;
- prefer code that adapts cleanly;
- reject visual gimmicks that fight local art direction;
- do not always choose the same library across unrelated projects.

## Integration rules
Adapt sourced components to local:
- typography;
- spacing;
- radius;
- borders;
- colors;
- icon language;
- motion timing;
- states;
- responsive behavior.

Remove demo copy, fake content, irrelevant controls, library branding and redundant wrappers.

## Cohesion
Avoid visually mixing several component kits on one screen.

Combining a behavior primitive from one source, local styling and a motion utility from another is fine if the finished UI reads as one system.

## Current documentation
If web/docs access exists, verify current APIs and install instructions before using a library. Prefer official documentation and official registries over random snippets.

## Security/licensing
Before copying third-party code or adding dependencies:
- identify the exact official registry/upstream source and reject look-alike/typosquat packages;
- check licensing where relevant;
- avoid opaque/minified snippets and unexplained install scripts;
- inspect maintenance, ownership changes, release history, open security advisories and compatibility;
- prefer the smallest dependency/permission surface that solves the problem;
- keep lockfiles and deterministic installs;
- review new `postinstall`/install hooks and native binaries;
- never send private source/secrets to random external tools.

For security-sensitive dependencies or code, also apply `rules/SECURITY.md`.

## One-foundation principle
For a new product, prefer one primary primitive foundation. Add another library only for a distinct need rather than duplicating the same primitive set.
