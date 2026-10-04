# Sources and conventions

aideia keeps substantive guidance in `rules/` and focused `SKILL.md` files. Tool-specific adapters stay thin.

## OpenAI / Codex

AGENTS.md discovery and layered project instructions:
https://developers.openai.com/codex/agent-configuration/agents-md

Agent Skills:
https://developers.openai.com/codex/build-skills

Relevant current behavior:
- Codex layers repository instructions by directory.
- Root/project instructions have a combined byte budget, so critical guidance should stay concise.
- Skills use progressive disclosure: name/description first, full instructions only when invoked/matched.
- OpenAI recommends focused skills, concise descriptions and explicit inputs/outputs.

## GitHub Copilot

Repository instructions:
https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions

## Cursor

Project rules:
https://docs.cursor.com/context/rules

## Gemini CLI

GEMINI.md context:
https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html

## Claude Code

Project memory/instructions:
https://docs.anthropic.com/en/docs/claude-code/memory

## Security engineering

OWASP Top 10 (current web application risk awareness baseline):
https://top10.owasp.org/

OWASP Application Security Verification Standard (ASVS):
https://owasp.org/projects/asvs

OWASP Cheat Sheet Series:
https://cheatsheetseries.owasp.org/

Particularly relevant cheat sheets:
- Authorization: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- Session Management: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- Password Storage: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- SQL Injection Prevention: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
- SSRF Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html
- File Upload: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- Content Security Policy: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
- REST Security: https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
- Secrets Management: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- Logging: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- Software Supply Chain Security: https://cheatsheetseries.owasp.org/cheatsheets/Software_Supply_Chain_Security_Cheat_Sheet.html
- CI/CD Security: https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html

OpenSSF source-control / repository best practices:
https://best.openssf.org/SCM-BestPractices/

OpenSSF Scorecard:
https://openssf.org/scorecard/

SLSA supply-chain specification:
https://slsa.dev/spec/

GitHub Actions secure-use guidance:
https://docs.github.com/en/actions/reference/security/secure-use

GitHub secret scanning / push protection:
https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning
https://docs.github.com/en/code-security/concepts/secret-security/push-protection

Security guidance changes over time. Use these as primary sources and verify current framework/provider-specific documentation before implementation.

## Component distribution

shadcn components.json / registries:
https://ui.shadcn.com/docs/components-json
https://ui.shadcn.com/docs/registry

21st agent/MCP workflow:
https://docs.21st.dev/mcp

## Accessible primitive foundations

Base UI:
https://base-ui.com/

Radix Primitives:
https://www.radix-ui.com/primitives

React Aria:
https://react-spectrum.adobe.com/react-aria/

## Motion

Motion accessibility/reduced motion:
https://motion.dev/docs/react-accessibility

## UI QA

Playwright screenshot comparisons:
https://playwright.dev/docs/test-snapshots

Storybook visual testing:
https://storybook.js.org/docs/writing-tests/visual-testing

Storybook accessibility testing:
https://storybook.js.org/docs/writing-tests/accessibility-testing

## Tokens

Style Dictionary design tokens:
https://styledictionary.com/info/tokens/

## Maintenance

These ecosystems change. The catalog is a starting point, not frozen truth.

When an agent is about to install or call a changing library/tool, it should verify current official documentation rather than trust this file blindly.
