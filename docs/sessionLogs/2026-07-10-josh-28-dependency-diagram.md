# Session Log: JOSH-28 dependency diagram

- **Date:** 2026-07-10
- **Author:** Cursor Cloud Agent
- **Related PR / branch:** `cursor/josh-28-dependency-diagram-8cf8`
- **Issue / ticket:** [JOSH-28](https://3p-agents.atlassian.net/browse/JOSH-28)

## Problem / goal

JOSH-28 requested a dependency review of the finance-dashboard repo: map direct and notable transitive npm packages, internal modules, and runtime relationships; flag critical dependencies (security, maintenance risk, SPOFs, outdated packages); and attach or link the diagram in the Jira issue.

## Approach

- Installed dependencies and ran `npm ls`, `npm audit`, and `npm outdated` for factual dependency and vulnerability data.
- Traced all `import` statements across `app/`, `components/`, `lib/`, and infrastructure files to build the internal module graph.
- Produced `docs/dependency-diagram.md` with Mermaid diagrams covering: npm direct/transitive deps, internal module layers, runtime request flow, and a risk-flag table.
- No application code changes — documentation-only deliverable.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Auto-generated dep graph tool (e.g. `madge`, `dependency-cruiser`) | Adds a dev dependency for a one-time audit; manual trace is sufficient for this small codebase (~20 source files). |
| Fixing audit vulnerabilities in same PR | Out of scope for JOSH-28; documented as recommendations instead. |

## Key decisions & tradeoffs

- **Decision:** Single markdown doc with embedded Mermaid diagrams — **Tradeoff:** Mermaid renders in GitHub/Jira with plugins but not everywhere; diagrams are also described in tables for accessibility.
- **Decision:** Flag `data/finance.json` as a critical SPOF alongside framework deps — **Tradeoff:** Not an npm package, but it's the only data source and blocks real-world usage.
- **Decision:** Separate prod vs. dev risk severity — **Tradeoff:** `vite`/`undici` CVEs are high severity but dev-only; called out explicitly to avoid false alarms.

## Follow-ups / known gaps

- [ ] Upgrade `next@16.2.4` → `16.2.10` and `@sentry/nextjs` to latest (security patches).
- [ ] Post Jira comment linking to the doc (no Atlassian MCP available in this environment).
- [ ] Consider `dependency-cruiser` if the codebase grows beyond the current ~20 source files.
