# Component and UI source catalog

This file is a **research starting point**, not a mandatory stack. Verify current docs before installing anything.

## Behavior-first foundations

### Base UI
https://base-ui.com/

Use when:
- React project;
- you want accessible behavior without imposed visuals;
- the product needs its own distinctive styling.

Strength:
- unstyled, accessible primitives;
- good fit for a custom design system.

### Radix Primitives
https://www.radix-ui.com/primitives

Use when:
- React project;
- you need mature primitives such as dialogs, menus, popovers, tooltips, selects or tabs;
- accessibility/focus behavior matters.

Strength:
- unstyled;
- WAI-ARIA-oriented behavior;
- keyboard/focus management.

### React Aria
https://react-spectrum.adobe.com/react-aria/

Use when:
- accessibility and interaction behavior are primary;
- you want Adobe's headless/reactive primitives and hooks;
- the target stack fits it.

## Code-distribution layer

### shadcn/ui
https://ui.shadcn.com/

Use when:
- owning/editing component source inside the project is desirable;
- the project already uses shadcn conventions;
- a registry can distribute internal components/rules.

Important:
- shadcn is source distribution, not the product's visual identity;
- components.json can configure multiple namespaced registries;
- private registries can use authenticated headers/params;
- adapt imported source to the target system.

## Search/generation layer

### 21st
https://21st.dev/
https://docs.21st.dev/mcp

Use when:
- you want an agent to search real component implementations;
- you want several genuinely different directions before choosing;
- you want to build using conventions already present in the project.

Do not accept generated variants merely because they are visually busy. Apply aideia identity/content rules.

## Motion

### Motion
https://motion.dev/

Use for:
- state transitions;
- layout continuity;
- direct manipulation;
- purposeful interaction.

Respect reduced-motion preferences. Prefer restrained motion for ordinary UI.

### Motion Primitives
https://motion-primitives.com/

Use for:
- reusable animated interaction patterns when they actually fit the product.

Adapt styling and timing to the local system.

## Expressive component sources

### Magic UI
https://magicui.design/

### Aceternity UI
https://ui.aceternity.com/

Use selectively for:
- focal interactions;
- landing/marketing surfaces;
- expressive motion or special effects that fit the art direction.

High risk:
- importing demo aesthetics;
- generic "AI premium" look;
- stacking effects;
- making unrelated products converge visually.

Never use these as the default foundation for every screen.

## QA tooling

### Playwright
https://playwright.dev/

Use for:
- rendered end-to-end behavior;
- screenshot comparisons;
- responsive/state checks.

### Storybook
https://storybook.js.org/

Use for:
- component states;
- interaction tests;
- visual regression;
- accessibility checks.

Storybook's accessibility tooling uses axe-core; automated checks are useful but do not replace manual accessibility review.

## Tokens

### Design Tokens / Style Dictionary
https://styledictionary.com/

Use when:
- a project benefits from platform-independent design tokens;
- token generation is already part of the stack or clearly useful.

Do not add token infrastructure to a tiny project solely because aideia mentions it.

## Selection principle

Pick tools from the problem backward.

Do not choose a component library first and then design the product around what that library happens to demo.
