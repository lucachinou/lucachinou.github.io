# Security review

Use this document for substantial security-sensitive changes. Keep it specific to the project/change; delete irrelevant sections rather than filling them with boilerplate.

## Change

- Feature/change:
- Owner:
- Date:
- Reviewers:
- Relevant PR/commit:

## Assets

What is valuable or sensitive here?

- 
- 

## Actors and roles

| Actor/role | Trusted capabilities | Must never be able to |
| --- | --- | --- |
| Anonymous |  |  |
| User |  |  |
| Admin/support |  |  |
| Service/webhook |  |  |

## Trust boundaries and data flow

Describe the path from entry point to sensitive sink:

```text
client -> edge/API -> authn -> authz -> validation -> business logic -> DB/external service
```

External systems:
- 

Secrets/credentials touched:
- 

## Security invariants

These should be precise enough to turn into tests.

- [ ] 
- [ ] 
- [ ] 

## Abuse cases

Consider:
- direct API calls that bypass UI;
- object ID substitution / cross-tenant access;
- field injection / mass assignment;
- replay / duplicate requests;
- concurrent requests / race conditions;
- malformed, oversized or adversarial inputs;
- dependency/CI compromise;
- stolen/stale credentials;
- external service failure or malicious responses.

Project-specific abuse cases:
- 
- 

## Authorization matrix

| Operation | Anonymous | Own resource | Other user's resource | Other tenant | Admin |
| --- | --- | --- | --- | --- | --- |
|  | Deny |  | Deny | Deny |  |

## Data validation and sinks

| Input | Validation | Sensitive sink | Safe primitive used |
| --- | --- | --- | --- |
|  |  |  |  |

Review sinks: SQL/NoSQL, HTML/DOM, shell, filesystem, URL fetchers, redirects, parsers/deserializers, logs, authorization decisions.

## Browser/session

- [ ] Credentials are not exposed to JS unless the architecture explicitly requires it.
- [ ] Session cookie flags/lifetime/rotation are appropriate.
- [ ] CSRF/cross-origin behavior is deliberate.
- [ ] Raw HTML / postMessage / redirects are reviewed.
- [ ] CSP/security headers are appropriate to the deployment.

## SSRF / uploads / parsers

Delete sections that do not apply.

Outbound URL controls:
- 

Upload/archive controls:
- 

Parser/resource limits:
- 

## Business logic and concurrency

State machine / invariants:
- 

Atomicity / transaction / locking:
- 

Idempotency / replay handling:
- 

## Secrets and privacy

- [ ] No secrets committed or logged.
- [ ] Least-privilege credentials.
- [ ] Rotation/revocation path exists where needed.
- [ ] Sensitive data is minimized and intentionally retained.
- [ ] Client/source maps/analytics do not expose sensitive values.

## Supply chain / CI

- [ ] Lockfile/deterministic install.
- [ ] New dependencies reviewed for provenance/maintenance/necessity.
- [ ] CI token permissions are least privilege.
- [ ] Third-party Actions are pinned to full commit SHAs.
- [ ] Untrusted PR code cannot read deployment/repository secrets.
- [ ] Dependency alerts / secret scanning / branch protection are enabled where available.

## Negative tests

- [ ] Unauthenticated.
- [ ] Wrong role.
- [ ] Cross-user/cross-tenant.
- [ ] Malformed/extreme input.
- [ ] Replay/duplicate.
- [ ] Concurrency/race.
- [ ] Expired/revoked credential.
- [ ] Failure path/error redaction.
- [ ] Project-specific abuse tests.

Commands/results:
```text

```

## Findings

| Severity | Location | Invariant / failure mode | Remediation | Verification |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Residual risk / unverified areas

- 
- 

## Conclusion

Do not claim "100% secure". State exactly what was checked and what remains unverified.
