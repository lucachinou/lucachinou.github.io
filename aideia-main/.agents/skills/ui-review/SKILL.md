---
name: ui-review
description: Review a frontend diff or implementation for product consistency, generic AI patterns, component reuse, responsive/accessibility issues, unnecessary copy, and scope creep. Use for review rather than implementation.
---

# UI review

Read:
- ../../../rules/CORE.md
- ../../../rules/DESIGN_IDENTITY.md
- ../../../rules/UI_IMPLEMENTATION.md
- ../../../rules/ANTI_AI_SLOP.md
- ../../../rules/CONTENT.md
- ../../../rules/QA.md

## Review order

Prioritize findings by impact:

1. Broken behavior or regression.
2. Accessibility/usability failure.
3. Architecture/component duplication.
4. Inconsistency with local design system.
5. Responsive/state problems.
6. Generic/templated composition.
7. Unnecessary copy/decorative clutter.
8. Minor polish.

## Evidence

Point to concrete code or rendered behavior.

Do not report:
- personal style preference as a defect;
- "could be cleaner" without a specific reason;
- speculative issues unsupported by the diff/product.

## Anti-template review

Check whether the implementation:
- substituted a generic dashboard structure for product-specific composition;
- copied the source kit's visual identity;
- added cards/badges/glow/gradients without a structural reason;
- added filler content to occupy empty space;
- made this project resemble an unrelated project that also uses aideia.

## Output

Give actionable findings and safe correction paths. If there are no material findings, say so.
