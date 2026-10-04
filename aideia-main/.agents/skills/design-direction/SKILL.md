---
name: design-direction
description: Define or repair a product-specific visual direction before substantial frontend design work when the target project has weak, missing, conflicting, or overly generic art direction. Do not use for tiny isolated CSS fixes.
---

# Design direction

Read:
- ../../../rules/DESIGN_IDENTITY.md
- references/design-axes.md

## Inputs

Inspect:
- product purpose and primary user tasks;
- existing rendered screens;
- current components/tokens;
- brand/game/product assets;
- explicit user references;
- existing art-direction docs.

## Workflow

1. Summarize product-specific evidence.
2. Identify the current visual fingerprint across the design axes.
3. Identify three tempting generic patterns that would make this product feel templated.
4. Choose or refine a coherent fingerprint tied to the product.
5. Define one optional signature motif only if the product supports one.
6. State what stays consistent across pages and what may vary.
7. Write/update local art-direction docs or `aideia.project.json` when persistent guidance is useful.
8. Do not redesign yet unless the task also asks for implementation.

## Output quality

A direction is weak if it can be pasted unchanged into an unrelated SaaS, casino, game launcher and ecommerce site.

Avoid vague words such as "modern", "premium", "clean" or "futuristic" unless translated into concrete visual decisions.

Never select a style randomly just to be different.
