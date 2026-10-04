---
name: component-sourcing
description: Research and integrate external UI primitives, registries, component kits, or motion components for a non-trivial frontend interaction. Use when existing local components are insufficient. Do not use for simple markup that should be implemented locally.
---

# Component sourcing

Read:
- ../../../rules/COMPONENT_SOURCES.md
- ../../../rules/RESEARCH_AND_DEPENDENCIES.md
- ../../../rules/DESIGN_IDENTITY.md

## Workflow

1. Search the target repository first.
2. Inspect already-installed libraries.
3. If external research is needed, verify current official docs.
4. Compare plausible choices on:
   - behavior;
   - accessibility;
   - adaptability;
   - dependency cost;
   - maintenance;
   - fit with the current stack.
5. Choose the least invasive strong solution.
6. Adapt it to local tokens, geometry, typography, icons, density, motion and states.
7. Remove demo text, fake data and library-specific decoration.
8. Verify licensing/attribution when substantial source is copied.
9. Test the integrated component in the actual page, not only in isolation.

## Important

The source library supplies behavior/code, not the finished product identity.

Do not always choose the same library across unrelated projects.
