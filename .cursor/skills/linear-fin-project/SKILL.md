---
name: linear-fin-project
description: "JoshFinanceDashboard Linear defaults — ALWAYS load this skill when working in this repo and the user mentions Linear at all (tickets, issues, backlog, project, cycle, triage, create/query/comment on issues). Unless they name another project explicitly, every Linear reference means the JoshFinanceDashboard project only — never infer a different project or ask which one. Applies to Linear MCP tools (list_issues, get_issue, save_issue, get_project, save_comment) and any Linear-related workflows: force project = JoshFinanceDashboard and team = CS."
---

# Linear conventions for finance-dashboard

## The only project to use

This codebase always uses the **JoshFinanceDashboard** Linear project in the `cursor-solutions` workspace. Never create, search, or move issues outside this project from this repo.

| Reference | Value |
|-----------|-------|
| Project name | `JoshFinanceDashboard` |
| Project ID | `b55973b9-1ff2-46aa-b41f-52d000fa5698` |
| Project URL | https://linear.app/cursor-solutions/project/joshfinancedashboard-12dff551c174/issues |
| Team | `Cursor Solutions` (key `CS`) |

## Rules

1. When creating any Linear issue, set `team` to `CS` and `project` to `JoshFinanceDashboard`. Do not prompt the user to choose a project — it's always JoshFinanceDashboard.
2. When listing or searching issues (`list_issues`), always pass `project: "JoshFinanceDashboard"` unless the user explicitly asks otherwise.
3. When fetching a project (`get_project`), use `JoshFinanceDashboard` or the project ID above — not another project in the workspace.
4. If a user references an issue number without a prefix (e.g. "ticket 696"), assume `CS-696`.
5. If the user explicitly names a different Linear project, follow their instruction for that turn but do not change the default for subsequent turns.
6. When implementing work from a Linear issue, read the issue with `get_issue` first and check the project description for stack, design links, and related CS issues.

## Quick reference

| Action | Default |
|--------|---------|
| Project | `JoshFinanceDashboard` |
| Project ID | `b55973b9-1ff2-46aa-b41f-52d000fa5698` |
| Team key | `CS` |
| Issue identifier prefix | `CS-` |
| `list_issues` filter | `project: "JoshFinanceDashboard"` |

## Example MCP calls

Listing open issues:

```json
{ "project": "JoshFinanceDashboard", "orderBy": "updatedAt" }
```

Creating an issue:

```json
{ "title": "...", "team": "CS", "project": "JoshFinanceDashboard" }
```

Fetching an issue:

```json
{ "id": "CS-696" }
```

Fetching the project:

```json
{ "query": "JoshFinanceDashboard" }
```
