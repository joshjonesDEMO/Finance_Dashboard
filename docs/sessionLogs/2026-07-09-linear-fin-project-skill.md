# Session Log: Linear project skill for finance-dashboard

- **Date:** 2026-07-09
- **Author:** Cursor agent
- **Related PR / branch:** (pending)
- **Issue / ticket:** —

## Problem / goal

Add a project-scoped Linear skill so agent references to "Linear tickets" always target the JoshFinanceDashboard project, matching the existing Figma and Jira skills.

## Approach

- Mirrored structure of `figma-fin-design` and `jira-fin-board` skills.
- Resolved project metadata via Linear MCP (`get_project`) from the user-provided URL.
- Stored skill at `.cursor/skills/linear-fin-project/SKILL.md`.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Personal skill (`~/.cursor/skills/`) | User asked for project skill; Figma/Jira are repo-scoped |
| Team-only scoping (`team: CS`) | Too broad — CS team may have other projects |

## Key decisions & tradeoffs

- **Decision:** Scope all Linear MCP calls to `project: JoshFinanceDashboard` and `team: CS` — **Tradeoff:** Explicit overrides required if user wants another Linear project in this repo.

## Follow-ups / known gaps

- [ ] None — skill is self-contained
