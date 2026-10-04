# Research and dependency policy

Use external research when current information materially improves the implementation.

## Verify current information for

- framework/library APIs;
- install commands;
- compatibility;
- package maintenance;
- accessibility behavior;
- browser support;
- registry syntax;
- licensing when copying substantial third-party code;
- current security advisories and secure configuration for security-sensitive libraries;
- package provenance/ownership when adding a dependency.

Prefer official documentation and upstream repositories.

## Component research

For a non-trivial interaction:
1. search local project components;
2. inspect installed dependencies;
3. inspect maintained primitives/registries;
4. compare a few plausible candidates when useful;
5. choose on behavior, accessibility, adaptability and dependency cost;
6. adapt the result to local design language.

Do not browse for trivial HTML/CSS that is safer to implement locally.

## No demo-copy import

Never copy a component demo wholesale. Remove:
- demo text;
- fake avatars;
- fake metrics;
- decorative badges;
- demo-specific imagery;
- irrelevant actions.

## Dependency threshold

A dependency should solve a meaningful problem better than local code.

Do not add a package solely for:
- one simple CSS effect;
- one icon;
- a tiny utility;
- an animation achievable cleanly with existing tools.

## Supply-chain checks

For a new dependency, especially one that executes during install/build/runtime:
- verify the exact package identity on the official registry and upstream repository;
- inspect maintenance and ownership/recent transfer signals;
- check known advisories and release notes;
- inspect install/postinstall scripts when risk warrants it;
- commit and preserve the lockfile;
- use deterministic/frozen installs in CI;
- prefer fewer packages and smaller privilege surface.

For CI actions/workflows, follow `rules/SECURITY.md`: least-privilege workflow tokens and full-SHA pinning for third-party actions.

## Record provenance

For substantial copied/adapted third-party code, preserve reasonable attribution/license requirements and document the source where useful.

## Freshness

If an API/library may have changed, verify it instead of relying on model memory.
