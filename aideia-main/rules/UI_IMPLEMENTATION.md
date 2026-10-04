# UI implementation standard

## Goal
Build interfaces that are coherent with the target product, function correctly and look intentionally designed.

Consistency means shared visual grammar inside the product. It does **not** mean repeating one layout everywhere.

## Required workflow

### 1. Audit
Before writing new UI:
- inspect the current page and neighboring pages;
- find existing primitives and patterns;
- identify design tokens;
- inspect screenshots/reference media;
- identify interaction and responsive constraints.

### 2. Establish the local visual contract
Use the target project's existing art direction if available.

If missing, define only what is necessary:
- visual character;
- typography roles;
- color roles;
- geometry;
- spacing/density;
- surface treatment;
- iconography;
- motion behavior;
- product-specific motifs;
- explicit avoid list.

### 3. Reuse in this order
1. Existing project component.
2. Existing project primitive extended cleanly.
3. Approved external primitive/component adapted to the project.
4. New custom component.

Never create a parallel button/input/card/dialog system when the repository already has one.

### 4. Compose for the task
Let information architecture determine layout.

Do not automatically produce:
- hero + subtitle + CTA;
- four stat cards;
- bento grid;
- card grid for everything;
- generic sidebar dashboard;
- huge title plus explanatory paragraph.

Different screens may use different compositions while sharing one design language.

### 5. Tokenize repeatable decisions
Prefer project tokens for colors, type, radii, spacing, borders, elevation and motion. Avoid repeated magic values.

## Visual hierarchy
Prefer, in order:
1. layout/grouping;
2. spacing;
3. typography;
4. contrast;
5. border/surface;
6. decoration.

If hierarchy only works after adding glow, gradients and nested boxes, fix structure first.

## Cards
Cards are one grouping tool, not the default container. Consider whitespace, divider, section, row, list, table or bare panel first.

## Geometry
Use the project's geometry. Do not make every element a pill or every nested surface heavily rounded.

## Typography
Use typography to create hierarchy. Avoid oversized app headings, tiny gray explanations everywhere, gradient text by default, and too many near-identical text styles.

## Icons
Use one coherent icon language. Avoid mixing families or wrapping every icon in a colored bubble.

## Motion
Motion should communicate state, continuity, hierarchy, manipulation or feedback. Respect reduced-motion preferences where applicable.

## Responsive
Mobile is not desktop scaled down. Reconsider hierarchy, ordering and secondary information. Prevent overflow and keep primary actions usable.

At minimum, inspect a narrow mobile viewport around 390px and desktop around 1440px when relevant.

## Accessibility
Use semantic HTML, visible focus, proper labels, sufficient contrast and accessible primitives for complex interactions. Do not rely on color alone.

## Distinctness
If logo and product name disappear, the interface should still express the target project's character through several structural choices—typography, proportions, density, composition, imagery, geometry, material and interaction—not through one random gimmick.
