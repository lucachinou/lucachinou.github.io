# Security engineering baseline

This file is a **mandatory engineering baseline** for changes that cross a trust boundary: authentication, authorization, sessions, APIs, databases, admin features, uploads, payments/economy, secrets, external URLs/webhooks, parsers, background jobs, infrastructure, CI/CD or anything handling private/sensitive data.

It is not a claim that a project is "100% secure". Security is an evidence-based risk-reduction process. Never describe a project as secure merely because these rules were followed.

## Security model

Assume:
- the browser/client is hostile and can be modified;
- request bodies, headers, cookies, route params, filenames, URLs and metadata are attacker-controlled;
- authenticated users may be malicious;
- IDs are discoverable unless authorization prevents access;
- retries, replay, race conditions and duplicated requests happen;
- dependencies, CI actions and build tooling are part of the attack surface;
- internal services and "private" endpoints still require explicit authorization.

Prefer **deny by default**, least privilege, defense in depth, explicit invariants and fail-closed behavior.

## Before implementation: map the trust boundary

For a security-relevant change, identify:
1. assets being protected;
2. actors/roles/tenants;
3. entry points and untrusted inputs;
4. data stores and external services;
5. trust boundaries and privilege transitions;
6. actions with irreversible or financial impact;
7. failure, retry, replay and concurrency behavior;
8. abuse cases, not only happy paths.

For substantial changes, record the result using `templates/SECURITY_REVIEW.template.md`.

## Authentication

- Prefer battle-tested framework/provider primitives over custom authentication.
- Never store plaintext passwords or fast password hashes. If passwords are stored locally, prefer Argon2id with current OWASP-recommended parameters; use a maintained library.
- Login, reset, verification and recovery endpoints need throttling/abuse controls appropriate to the product.
- Password-reset / email-verification tokens must be random, single-use, purpose-bound and expire.
- Do not reveal whether an account exists unless the product intentionally accepts that disclosure.
- Regenerate/rotate the session identifier after authentication and privilege changes.
- Support session invalidation on logout and after credential/security-sensitive changes.
- High-impact operations should support re-authentication or step-up authentication when appropriate.
- Never invent cryptography, token formats or authentication protocols.

## Sessions and browser credentials

Prefer server-managed sessions in `HttpOnly; Secure` cookies. For a normal first-party session:
- use `SameSite=Strict` when compatible, otherwise justify `Lax`;
- prefer a `__Host-` cookie prefix where possible;
- keep the cookie scope narrow;
- use reasonable idle and absolute expiration;
- rotate sessions after privilege changes.

Do **not** store session IDs, refresh tokens or equivalent credentials in `localStorage` or `sessionStorage`.

If bearer/JWT access tokens are used:
- validate signature/MAC using an expected algorithm;
- reject `alg=none` and algorithm confusion;
- validate issuer, audience, expiry/not-before and token purpose;
- keep lifetimes short enough for the risk;
- design revocation/rotation where required;
- never trust client-provided role/tenant/permission claims without server-side validation.

## Authorization / IDOR / tenancy

Authentication is not authorization.

For every non-public operation:
- authorize on the server;
- validate permission on **every request**;
- check the specific object/resource, action and tenant;
- derive identity/role/tenant from trusted server-side context;
- deny by default when no rule explicitly grants access;
- protect field-level mutations, not only routes;
- prevent mass assignment by allowlisting mutable fields;
- do not rely on hidden buttons, obscure routes, unpredictable IDs or frontend checks.

For multi-tenant data:
- include tenant/ownership constraints in the data access path;
- avoid fetching an object globally and checking tenant only in UI;
- use database policies/RLS as defense in depth when the stack supports it;
- test cross-user and cross-tenant access explicitly.

Admin/support/impersonation functions require separate authorization, strong audit logs and minimal privilege.

## Input validation and injection

Validate untrusted input on the server at the boundary:
- type;
- length;
- range;
- structure/schema;
- allowed enum/state;
- canonical form where relevant.

Prefer allowlists for bounded domains. Client-side validation is UX only.

Never build interpreter commands by concatenating untrusted data:
- SQL/NoSQL: use parameterized APIs/query builders and validate dynamic identifiers separately;
- OS commands: avoid shell invocation; pass arguments as structured arrays; never interpolate user data into a shell string;
- HTML: rely on framework escaping; use context-aware output encoding;
- templates/LDAP/XPath/regex/etc.: use safe APIs and constrained inputs.

Treat `eval`, `new Function`, dynamic code loading and unsafe deserialization as exceptional high-risk behavior requiring explicit justification and review.

Normalize and constrain filesystem paths; prevent `../`, symlink and alternate-encoding traversal.

## XSS, DOM and browser isolation

- Avoid `innerHTML`, `dangerouslySetInnerHTML` and raw HTML rendering. If unavoidable, sanitize with a maintained context-appropriate library and test bypass cases.
- Do not place secrets in HTML, JS bundles, source maps or client-readable environment variables.
- For `postMessage`, use an exact expected origin and validate message shape/source; do not use `*` for sensitive messages.
- Validate redirect targets with an allowlist or safe relative-URL policy.
- Configure a restrictive Content Security Policy. Prefer nonces/hashes and avoid broad `unsafe-inline`/`unsafe-eval` exceptions.
- Use `frame-ancestors` (or equivalent) to control framing/clickjacking.
- Use HTTPS and appropriate HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy` and a deliberate `Permissions-Policy`.
- Do not treat CSP as the primary XSS defense; it is defense in depth.

## CSRF and cross-origin policy

Cookie-authenticated state-changing requests need CSRF protection appropriate to the framework:
- use framework CSRF tokens/synchronizer or signed double-submit patterns where applicable;
- validate `Origin`/Fetch Metadata when practical as defense in depth;
- keep state-changing operations off GET;
- do not rely on SameSite alone for all threat models.

CORS:
- disable it when unnecessary;
- allow only explicit trusted origins/methods/headers;
- never combine credentialed requests with an effectively wildcard origin policy;
- remember CORS is a browser read policy, not server-side authorization.

## APIs, GraphQL, WebSockets and RPC

- Enforce authentication/authorization at each resolver/handler.
- Restrict allowed HTTP methods and content types.
- Set request/header/body limits before parsing large inputs.
- Bound pagination, query complexity, recursion and batch sizes.
- Apply rate limits/quotas to abuse-prone or expensive operations; use identity/device/IP signals as appropriate, not IP alone.
- Ensure errors do not expose stack traces, SQL, secrets or internal topology in production.
- WebSockets need authentication, authorization for each sensitive message, origin policy and revalidation when permissions can change.
- For GraphQL, enforce resolver-level authorization and depth/complexity limits; do not assume a protected root resolver protects nested objects.

## SSRF and outbound requests

Any feature that fetches a user-influenced URL is security-sensitive.

Prefer a fixed allowlist of destinations. Otherwise:
- accept only required schemes (normally HTTPS);
- parse with a real URL parser, not regex alone;
- reject embedded credentials and ambiguous encodings;
- resolve DNS and block loopback, private, link-local, multicast, reserved and cloud metadata destinations as appropriate;
- consider IPv4/IPv6, alternate numeric IP forms and DNS rebinding;
- re-check the destination after redirects; preferably disable redirects unless required;
- never forward internal credentials/cookies to arbitrary hosts;
- set connection/read timeouts, response-size limits and redirect limits;
- restrict egress at the network layer when possible.

Do not assume a hostname is safe merely because the first DNS resolution looked public.

## File uploads and archives

For uploads:
- allowlist required extensions;
- validate file signature/content, not only `Content-Type`;
- generate server-side filenames/keys;
- limit filename length, file size, dimensions/pages and total quota;
- store outside executable/web roots or in isolated object storage;
- serve with safe content disposition/type;
- require authorization for private files;
- scan/sanitize/CDR where risk warrants it;
- strip unnecessary metadata when appropriate;
- never execute uploaded content.

For ZIP/archive/document processing:
- defend against path traversal ("Zip Slip");
- cap expanded size, file count and compression ratio to mitigate decompression bombs;
- process in a restricted environment for high-risk formats.

## Data, privacy and cryptography

- Minimize collection and retention.
- Classify sensitive data and restrict access by need.
- Use TLS for data in transit.
- Use established platform encryption/KMS mechanisms for protected data at rest where appropriate.
- Use authenticated encryption (AEAD) for application-level encryption; do not design custom crypto.
- Use a CSPRNG for secrets, tokens and security-sensitive randomness; never `Math.random()`.
- Separate encryption keys from encrypted data when practical.
- Design key/secret rotation and revocation before they are needed.
- Never log passwords, access/refresh/session tokens, private keys, raw payment data or other secrets.
- Pseudonymize/minimize personal data in logs and analytics.

## Secrets

- Never commit secrets, private keys, production credentials or real `.env` files.
- Keep secrets server-side in an environment/secret manager.
- Give each environment/service the minimum secret permissions it needs.
- Prefer short-lived/dynamic credentials and OIDC/workload identity over long-lived cloud keys when available.
- Treat secret rotation, revocation and incident response as part of the design.
- If a secret is exposed, removing it from the latest commit is insufficient: revoke/rotate it and handle repository/history/log exposure appropriately.
- Never send private source or secrets to an unapproved external service.

## Business logic, money, inventory and high-value state

Protect invariants on the server, not in UI:
- balances cannot be created by client input;
- discounts/rewards/coupons cannot be replayed or stacked outside intended rules;
- ownership cannot be transferred without explicit authorization;
- quantities and prices are computed from trusted server-side data;
- sensitive transitions use transactions/atomic operations.

For retryable or financially meaningful actions:
- design idempotency keys or equivalent duplicate-request protection;
- verify webhook signatures and expected sender/purpose;
- enforce replay windows/nonces/event IDs where supported;
- handle out-of-order and duplicate events;
- use database constraints/transactions/locking to prevent race-condition double-spend or duplicate redemption.

Never trust a client-provided price, privilege, payout, balance, permission or "success" flag.

## Dependencies and supply chain

Every dependency is executable trust.

Before adding one:
- check the official package/registry and upstream repository;
- inspect maintenance, ownership, release recency and security history;
- avoid typosquatting/near-name packages;
- prefer fewer dependencies and smaller privilege surface;
- commit the lockfile and use deterministic/frozen installs in CI;
- review install/postinstall scripts for unusual packages;
- remove unused dependencies.

Use automated dependency/vulnerability updates where practical, but review breaking/security-sensitive changes.

For release/build systems:
- generate an SBOM/provenance when the project risk justifies it;
- prefer reproducible, reviewable build inputs;
- follow current SLSA/OpenSSF guidance for higher-assurance supply chains.

## GitHub / CI/CD hardening

CI is production infrastructure.

- Set `permissions: read-all` or narrower by default and grant write scopes only to the job that needs them.
- Pin third-party GitHub Actions to a full commit SHA; tags are mutable.
- Do not expose repository/environment secrets to untrusted fork PR code.
- Avoid `pull_request_target` with checkout/execution of untrusted PR code.
- Prefer OIDC short-lived credentials over static cloud secrets.
- Protect deployment environments and high-impact approvals.
- Enable branch protection/rulesets appropriate to the project.
- Require review for security-critical code; consider CODEOWNERS for auth, payments, infrastructure and security configuration.
- Disable force-pushes/deletions on protected release/default branches unless intentionally required.
- Enable dependency alerts/updates and secret scanning/push protection when available.
- Do not let workflows approve/merge arbitrary changes with unnecessarily broad tokens.
- Log important pipeline/configuration changes.

## Logging, monitoring and errors

Log security-relevant events with enough context to investigate:
- login/recovery failures and suspicious throttling;
- privilege/role/admin changes;
- sensitive data export;
- security configuration changes;
- high-value state transitions;
- rejected authorization attempts where signal is useful;
- webhook/signature failures.

Logs must:
- redact secrets/tokens and unnecessary PII;
- resist log injection (structured logging / sanitized fields);
- use correlation/request IDs;
- be access-controlled and retained intentionally;
- avoid becoming a second sensitive-data database.

Production errors should be useful to operators but not disclose sensitive internals to users.

## Environment and infrastructure

- Separate development/staging/production credentials and data.
- Do not use production secrets/data in local fixtures unless explicitly sanitized.
- Disable debug/admin consoles in production.
- Run services with least OS/cloud/database privilege.
- Patch supported runtimes/base images and remove unnecessary services/packages.
- Restrict inbound and outbound network access where practical.
- Set resource/time limits to reduce DoS blast radius.
- Backups must be encrypted/access-controlled and restoration should be tested.
- Security configuration belongs in versioned/reviewable infrastructure where possible.

## Security testing

Security-sensitive work is incomplete without negative tests.

Where relevant, test:
- unauthenticated access;
- wrong-role access;
- cross-user / cross-tenant object access;
- field/mass-assignment abuse;
- malformed/extreme inputs;
- injection payload classes;
- CSRF/cross-origin behavior;
- upload type/size/archive limits;
- SSRF redirect/DNS/private-network cases;
- duplicate/replayed requests;
- race/concurrency behavior;
- expired/revoked sessions/tokens;
- webhook replay/signature failures;
- production error redaction.

Use project-appropriate tooling: unit/integration tests, SAST, dependency audit, secret scanning, IaC scanning, DAST/fuzzing for exposed parsers/endpoints and manual review for authorization/business logic.

A scanner passing is **not** proof of security.

## Non-negotiable red flags

Do not ship:
- hardcoded credentials/private keys;
- TLS certificate verification disabled;
- authentication tokens in URLs;
- authorization enforced only in the frontend;
- string-concatenated SQL or shell commands with untrusted input;
- wildcard CORS used as a shortcut for credentialed/private APIs;
- unvalidated open redirects or user-controlled outbound fetches;
- production debug endpoints or stack traces;
- secrets in logs;
- unsafe deserialization of untrusted data;
- custom cryptography when maintained standard primitives exist;
- "temporary" security bypasses without an explicit bounded mitigation plan.

## Completion gate

Before claiming a security-relevant change is done:
1. identify the attack surface changed;
2. state the authorization invariant;
3. trace untrusted input to sensitive sinks;
4. inspect secrets/dependencies/CI impact;
5. run relevant negative tests and security checks;
6. review failure/retry/concurrency paths;
7. report anything that could not be verified.

Never write "secure", "safe", "fully protected", "no vulnerabilities" or equivalent as a factual completion claim unless the exact limited property has been independently demonstrated. Prefer: **"No issue found in the checks performed; residual risk remains."**
