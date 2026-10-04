# Anti-AI code smells

These are common failure patterns in generated code. They are not absolute bans; use judgment and local project conventions.

## 1. Abstraction before need
Do not create a service/factory/manager/provider/helper layer for a single simple call just because it "looks scalable".

Prefer the simplest boundary that matches current requirements.

## 2. Parallel utilities
Search before creating:
- formatters;
- API clients;
- hooks;
- validation helpers;
- date utilities;
- constants;
- types;
- component primitives.

A second almost-identical helper is usually worse than extending the canonical one.

## 3. Catch-and-hide
Do not wrap broad blocks in `try/catch` and silently return null/default data.

Handle errors where recovery is real. Otherwise preserve the error path.

## 4. Fake resilience
Do not invent fallback data, fake success states or alternate behavior to keep a demo looking functional.

Failure should remain visible when the real dependency fails.

## 5. Comment noise
Do not add comments that merely restate syntax.

Bad:
`// Increment the counter`

Useful:
`// API returns cents; keep integer arithmetic here to avoid rounding drift.`

## 6. Premature optimization
Do not add memoization, caching, concurrency, virtualization or complex batching without evidence it is needed.

## 7. Dependency for triviality
Do not add a package for one tiny helper, icon or CSS effect that existing code can handle cleanly.

## 8. Generic "enterprise" architecture
Do not introduce repositories, DTO layers, event buses, factories or adapters solely because they are common patterns. Use them when the codebase/problem actually benefits.

## 9. Type escape hatches
Do not reach for `any`, unchecked casts or non-null assertions to silence the type system when the real model can be represented.

Follow the target project's typing level and conventions.

## 10. Giant rewrite for a local task
Do not reformat, rename or restructure unrelated code while implementing a focused change.

## 11. Prop/state duplication
Avoid copying props/server state into local state without a synchronization reason.

## 12. Effect-driven architecture
In reactive UI frameworks, do not use effects as a default mechanism for derived state or ordinary event handling.

## 13. Placeholder implementation
Do not leave TODO flows, mock branches or stubbed success paths while presenting the feature as complete.

## 14. Defensive code without a threat
Do not add dozens of null checks, coercions and fallback branches against states the actual contract excludes. Validate at real trust boundaries.

## 15. Inconsistent invention
Do not invent a new naming convention, directory pattern or API style inside an established repository.

## Review question
Could a maintainer explain why each new abstraction, dependency and fallback exists based on a concrete product/engineering need? If not, simplify.
