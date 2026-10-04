---
name: security-review
description: Perform a security-focused review or pre-merge audit for code touching authentication, authorization, sessions, APIs, databases, admin features, uploads, payments/economy, secrets, external URLs/webhooks, parsers, infrastructure or CI/CD. Trace trust boundaries and attacker-controlled data, test negative authorization/abuse paths, inspect supply-chain and configuration risk, and report evidence-backed findings without claiming perfect security.
---

# Security review

Read:
- ../../../rules/SECURITY.md
- ../../../rules/CORE.md
- ../../../rules/RESEARCH_AND_DEPENDENCIES.md
- ../../../rules/QA.md

Use the target project's own security architecture and framework conventions when they are stronger or more specific.

## 1. Scope the attack surface

From the diff and surrounding code, identify:
- entry points/routes/resolvers/jobs/webhooks;
- roles and tenants;
- sensitive data/assets;
- databases/files/queues/caches;
- external calls;
- secrets/credentials;
- privilege transitions;
- high-value or irreversible state changes.

Do not review only the changed lines when the security property depends on callers, middleware, database policy or deployment configuration.

## 2. Build explicit security invariants

Write down the rules that must always remain true.

Examples:
- only the owner or an admin may mutate resource X;
- a tenant must never read another tenant's records;
- a payment/event ID is processed at most once;
- the browser never receives a server secret;
- an uploaded file is never executable;
- an outbound URL can never reach internal/metadata networks.

Then verify where each invariant is enforced.

## 3. Trace untrusted data source -> transformation -> sink

For each attacker-controlled input, trace it into:
- database queries;
- HTML/DOM;
- shell/process execution;
- filesystem paths;
- URL fetchers;
- redirects;
- templates;
- logs;
- deserializers/parsers;
- authorization decisions;
- money/inventory/state changes.

Prefer proving safety through APIs and structure (parameterization, schemas, object-scoped queries, capability boundaries) rather than string filtering.

## 4. Authorization matrix

For every sensitive endpoint/action, test or reason through:
- anonymous user;
- valid user on own object;
- valid user on another user's object;
- same-role user in another tenant;
- lower-privilege role;
- admin/support role;
- stale/revoked session;
- direct API call bypassing UI.

Check route-level, object-level and field-level authorization. Look specifically for IDOR/BOLA and mass assignment.

## 5. Authentication/session review

Inspect:
- cookie/token storage;
- session rotation/invalidation;
- reset/verification token lifecycle;
- JWT validation claims/algorithm;
- CSRF and Origin handling;
- login/recovery abuse controls;
- privilege-change re-auth when relevant.

Treat custom auth/crypto as high-risk and prefer replacement with maintained primitives.

## 6. Browser/client review

Check:
- DOM XSS / raw HTML;
- CSP and security headers;
- sensitive data in client bundles/source maps;
- postMessage origin checks;
- redirects;
- CORS;
- token use in local/session storage;
- client-side-only security decisions.

## 7. Backend/API review

Check:
- server-side schema/range/size validation;
- parameterized database access;
- shell/process invocation;
- request body and pagination limits;
- SSRF/outbound URL policy;
- uploads/archive handling;
- websocket/resolver authorization;
- error redaction;
- rate/abuse controls for expensive/high-value operations.

## 8. Business-logic and concurrency review

For money, credits, inventory, rewards, quotas, coupons, votes, bookings or other finite/value-bearing resources:
- derive value server-side;
- enforce state machine transitions;
- use idempotency/deduplication;
- verify transaction boundaries and database constraints;
- consider simultaneous requests and retries;
- test duplicate/out-of-order webhooks;
- look for integer/precision/rounding edge cases where relevant.

## 9. Secrets, dependencies and supply chain

Inspect:
- new dependencies and their provenance;
- lockfile changes;
- package install scripts;
- secrets in source/config/logs;
- GitHub Actions permissions;
- actions pinned to immutable SHAs;
- untrusted PR code interacting with secrets;
- deployment credentials and OIDC/static-key choices.

If the task depends on current package/security guidance, verify official upstream documentation rather than model memory.

## 10. Negative tests

Prefer tests that prove rejection, not only success.

Add/run the relevant cases from `rules/SECURITY.md`. For a critical invariant, a regression test is strongly preferred.

Use the target project's existing security tools. The aideia heuristic scanner can supplement them:

`node .aideia/tools/security-audit.mjs .`

For a stricter local gate:

`node .aideia/tools/security-audit.mjs . --fail-on-high`

Heuristic findings require human/agent verification; a clean result is not proof of security.

## Finding format

Prioritize exploitable failure modes.

For each finding include:
- severity: Critical / High / Medium / Low;
- exact file/location;
- violated security invariant;
- realistic failure mode/impact;
- smallest safe remediation;
- a regression test or verification step.

Avoid speculative noise. Do not inflate severity merely because a pattern looks suspicious.

## Severity guide

**Critical**
- unauthenticated/low-privilege path to broad secret, admin, production, financial or cross-tenant compromise;
- remote code execution or equivalent catastrophic compromise;
- exposed active high-privilege credentials.

**High**
- practical account takeover;
- cross-tenant/large sensitive-data access;
- arbitrary file write/read in meaningful scope;
- SSRF reaching sensitive internal/cloud metadata;
- high-impact business-logic double-spend/replay;
- CI/deployment compromise with meaningful write/secret access.

**Medium**
- constrained sensitive-data exposure;
- exploitable XSS with limited scope;
- missing defense-in-depth with a plausible bypass path;
- abuse/DoS weakness with meaningful operational impact.

**Low**
- hardening gap with limited standalone impact;
- security observability/documentation weakness.

Severity depends on the actual product context.

## Completion

Conclude with:
- what was checked;
- what was tested;
- unresolved findings;
- what could not be verified.

Never conclude that the project is "100% secure". A valid conclusion is: **No issue found in the checks performed; this is not proof that no vulnerability exists.**
