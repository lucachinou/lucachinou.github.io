# Using aideia with an AI coding agent

Do **not** paste the whole standard into every prompt. Keep task prompts short and make the repository/workspace carry the persistent guidance.

## Best setup: aideia is already attached to the target project

Use:

~~~text
Follow this project's AGENTS.md and the attached .aideia standard. Use the aideia workflow/skills relevant to this task, preserve the project's own visual identity, and verify the real result before finishing.

Task: <what I want changed>
~~~

That is the preferred everyday prompt.

## If aideia is not attached yet

Use:

~~~text
Before editing, connect the private repository GarfieldTVA/aideia to this workspace as the project's shared coding/UI standard (prefer a pinned .aideia checkout/submodule if your environment supports it). Then follow the target project's AGENTS.md plus aideia/AGENTS.md.

Do not treat aideia as a visual theme. This project owns its art direction.

If you cannot actually access GarfieldTVA/aideia, say so clearly instead of pretending to have read it.

Task: <what I want changed>
~~~

## Cross-repository mode

If the agent can directly read private GitHub repositories without attaching them:

~~~text
Read GarfieldTVA/aideia/AGENTS.md before implementation and load only the aideia rules/skills relevant to this task. Then inspect this repository's own code, UI and design system. Preserve its identity and behavior. Do not claim completion without the relevant QA.
~~~

## For a major UI redesign

Add only:

~~~text
Audit the existing UI first. If the visual direction is unclear or generic, define a product-specific visual fingerprint before implementation. Avoid generic dashboard composition and sourced-library demo aesthetics. Run visual QA on mobile and desktop at the end.
~~~

## For a security-sensitive change

Usually the normal prompt is enough because AGENTS.md triggers the security baseline. For a high-risk change, you can add:

~~~text
This change crosses a trust boundary. Load rules/SECURITY.md, map the security invariants and attacker-controlled inputs, test negative authorization/abuse/replay/concurrency paths that apply, and run the security-review workflow before declaring completion. Do not claim "100% secure"; report what was actually verified.
~~~

## For a focused bug/fix

Do not invoke every UI workflow unnecessarily.

~~~text
Keep the change scoped. Preserve unrelated behavior and styling. Follow the existing local pattern and run the relevant checks.
~~~

## Important

The shared repo should reduce prompt length, not create a second giant prompt.

The task prompt should mostly describe:
- the desired outcome;
- functional constraints;
- explicit references;
- anything that must not change.

Persistent engineering/design behavior belongs in aideia and the target repository.
