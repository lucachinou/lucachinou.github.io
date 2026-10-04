---
name: code-review
description: Review a code diff for regressions, unnecessary generated-code complexity, duplicated abstractions, error-handling problems, type escapes, dependency bloat, and violations of the target repository's conventions. Use for code review across frontend or backend.
---

# Code review

Read:
- ../../../rules/CORE.md
- ../../../rules/ANTI_AI_CODE.md

If the diff touches a trust boundary (auth, authorization, sessions, APIs, database access, admin, uploads, money/economy, secrets, outbound URLs/webhooks, parsers, infrastructure or CI/CD), also read ../../../rules/SECURITY.md and perform the security-review workflow rather than treating security as a generic code-review checkbox.

## Review priority

1. Correctness/regressions.
2. Security/data integrity.
3. Broken contracts and error handling.
4. Duplicated or conflicting architecture.
5. Unnecessary complexity/dependencies.
6. Type-safety problems.
7. Maintainability problems.
8. Minor cleanup.

## Generated-code smell pass

Specifically check:
- new abstractions with only one trivial caller;
- duplicate utilities/components/types;
- broad catches that hide failures;
- fabricated fallback data;
- unnecessary dependencies;
- comments that paraphrase code;
- type-system escape hatches;
- unrelated refactors;
- premature optimization;
- placeholder behavior presented as finished.

## Evidence

Tie findings to concrete code and explain the failure mode.

Do not flag style preference that conflicts with established local conventions.

Offer the smallest safe correction, not a gratuitous rewrite.
