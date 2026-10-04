---
name: project-bootstrap
description: Connect a target repository to the shared private GarfieldTVA/aideia standard and create the minimal local files needed for reliable agent use. Use when setting up aideia in a project, not during ordinary feature work.
---

# Project bootstrap

Read:
- ../../../templates/PROJECT_AI_BOOTSTRAP.md
- ../../../rules/DESIGN_IDENTITY.md

## Goal

Make aideia reliably available **inside the target workspace** rather than depending only on an agent following a private cross-repository URL.

## Preferred setup

If Git access to the private repository is available:

1. Add aideia as a pinned Git submodule at `.aideia` or otherwise place a read-only checkout there.
2. Add/update the target root `AGENTS.md` using the aideia target stub.
3. Create local `docs/design/ART_DIRECTION.md` and `docs/design/DESIGN_SYSTEM.md` only when useful.
4. Create `aideia.project.json` for substantial UI products when a machine-readable visual contract helps.
5. Preserve any existing target-project instructions; do not overwrite them blindly.

## Update policy

The target project should be able to update the pinned aideia revision intentionally. Do not silently track a changing remote during a coding task.

## Fallback

If a submodule/checkout is not possible, copy the minimal target stub plus the needed aideia rules into the workspace and record their source revision.

Never claim cross-repository rules were read when they were not accessible.
