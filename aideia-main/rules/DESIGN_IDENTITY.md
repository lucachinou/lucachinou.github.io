# Design identity system

## Purpose

aideia must make work more coherent **inside a project** without making unrelated projects converge on one aesthetic.

The stable layer is quality. The variable layer is art direction.

## Visual fingerprint

For substantial UI work, identify the project's stance on these axes:

1. **Density** — sparse / comfortable / compact / information-dense
2. **Geometry** — sharp / restrained-radius / soft / pill-heavy only when justified
3. **Surface model** — flat / bordered / layered / elevated / textured
4. **Typography character** — neutral / editorial / technical / playful / display-led
5. **Contrast** — quiet / balanced / high / dramatic
6. **Color behavior** — monochrome-led / sparse accent / semantic-rich / expressive
7. **Composition** — grid-regular / asymmetric / editorial / tool-like / immersive
8. **Navigation** — top-led / side-led / contextual / command-led / in-world
9. **Motion** — nearly static / snappy / mechanical / soft / expressive
10. **Imagery** — none / product screenshots / photography / illustration / 3D / game-native
11. **Data treatment** — prose-led / list-led / table-led / chart-led / spatial
12. **Signature motif** — one product-specific recurring visual or interaction idea, or none

Do not select values randomly. Derive them from product function, audience, existing code/assets and reference material.

## Anti-template requirement

Before a major redesign, identify at least three generic patterns that would be easy but wrong for this product.

Examples:
- generic four-stat-card dashboard;
- oversized marketing hero inside an application;
- glass + purple gradient for "premium";
- bento grid used without information-architecture reason;
- every feature as icon + heading + paragraph card.

Then avoid those patterns unless product evidence specifically supports them.

## Coherence rule

Reuse within the target project:
- typography roles;
- token semantics;
- control behavior;
- spacing logic;
- state language;
- icon family;
- surface model;
- motion character.

Do **not** force every page to reuse:
- the same hero;
- the same card grid;
- the same content width;
- the same section rhythm;
- the same focal composition.

## Product-specific distinctness

A distinctive UI should emerge from the product, not from decorative novelty.

Prefer signals such as:
- domain-native information structures;
- game/item/material motifs;
- editorial rhythm;
- tool density;
- unusual but useful navigation;
- characteristic typography;
- purposeful spatial composition.

Avoid "uniqueness" created by arbitrary glow, particles, gradients, random 3D or unusual radii.

## Machine-readable profile

When the target project contains `aideia.project.json`, use it as the concise visual contract.

If no profile exists and the task is a substantial UI build/redesign, create or update one only when appropriate for the target repository. Use the schema and template from aideia.

The profile should describe decisions, not implementation trivia.
