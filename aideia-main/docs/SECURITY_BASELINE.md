# Repository and delivery security baseline

This complements `rules/SECURITY.md` with repository, CI/CD and release controls. Apply proportionally to the project risk.

## Recommended baseline for active repositories

### Source control
- Protect the default/release branches with GitHub rulesets/branch protection.
- Disallow force-push and branch deletion for protected branches unless there is a documented need.
- Require pull-request review for sensitive repositories; use CODEOWNERS for auth, payments/economy, infrastructure, deployment and security configuration.
- Require status checks that actually exercise the affected code.
- Keep administrator bypass narrow and auditable.
- Require MFA at the account/organization level where available.

### GitHub Actions
- Set the default `GITHUB_TOKEN` to read-only and grant narrower write scopes per job.
- Pin third-party actions to full immutable commit SHAs.
- Allow only required actions/reusable workflows where practical.
- Do not run untrusted fork code with repository/environment secrets.
- Treat `pull_request_target` as dangerous when combined with checkout/execution of attacker-controlled code.
- Prefer OIDC/workload identity for cloud deployment instead of long-lived cloud credentials.
- Separate build/test from privileged deployment.
- Protect production environments with scoped secrets and approvals appropriate to the project.

### Secret protection
- Enable GitHub secret scanning and push protection where the plan/repository supports them.
- Keep production secrets out of repository files and CI logs.
- Use separate credentials per environment/service.
- Rotate/revoke leaked credentials immediately; history rewriting alone does not invalidate a secret.

### Dependencies
- Keep a committed lockfile.
- Use frozen/deterministic install commands in CI.
- Enable dependency vulnerability alerts.
- Use automated dependency update tooling when it improves response time, but review changes.
- Remove unused dependencies.
- For critical/release artifacts, consider SBOM and provenance generation.

### Build/release integrity
- Build releases from protected, reviewed commits.
- Minimize who/what can publish packages or deploy.
- Prefer short-lived credentials and scoped publisher identities.
- Preserve provenance/attestations for higher-assurance artifacts.
- Verify artifact hashes/signatures where the ecosystem supports it.

## Application security verification

OWASP Top 10 is an awareness baseline, not a complete verification standard. For substantial applications, use OWASP ASVS as the deeper requirements catalog.

A practical default:
- ordinary authenticated web app: target an ASVS Level 2-style assurance mindset;
- low-risk brochure/static site: use only applicable controls;
- critical/high-value system: perform project-specific threat modeling and deeper independent testing.

Do not copy every ASVS requirement mechanically. Map applicable requirements to the actual architecture and data.

## Security tooling layers

No single scanner is sufficient. Prefer complementary layers:

1. **Secret scanning** — accidental credentials/keys.
2. **SCA/dependency scanning** — known vulnerable packages.
3. **SAST** — risky code/data-flow patterns.
4. **IaC/container scanning** — deployment misconfiguration and vulnerable images.
5. **DAST/API testing** — behavior of a running system.
6. **Fuzz/property tests** — parser/state-machine edge cases.
7. **Manual authorization/business-logic review** — areas scanners routinely miss.
8. **Runtime logs/alerts** — detection after deployment.

The aideia `tools/security-audit.mjs` scanner is intentionally only a fast heuristic pre-review layer.

## High-risk change triggers

Require an explicit security review when a change:
- adds or changes auth/session logic;
- introduces a new admin/support capability;
- changes tenant/resource authorization;
- handles payments, credits, balances, rewards, inventory or irreversible state;
- adds upload/archive/document parsing;
- fetches user-controlled URLs or adds webhooks;
- adds a deserializer/template/interpreter boundary;
- adds a new public API or WebSocket message type;
- changes encryption, key handling or secrets;
- changes CI permissions/deployment/publishing;
- adds a high-privilege dependency or native binary;
- exposes new private/sensitive data.

## Incident-readiness minimum

For systems with real users or valuable data:
- know how to revoke sessions/tokens/keys;
- know who can rotate deployment/database credentials;
- retain enough security/audit logs to investigate;
- document backup/restore for critical data;
- keep dependency/runtime upgrade paths maintainable;
- avoid one shared credential with a huge blast radius.

## External references

The detailed source links are maintained in `docs/SOURCES.md`. Re-check current official guidance for rapidly changing frameworks, package managers, GitHub settings and cloud providers.
