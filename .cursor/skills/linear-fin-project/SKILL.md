---
name: linear-fin-project
description: "Linear defaults for the finance-dashboard app — ALWAYS load this skill when working in this repo and the user mentions Linear at all (issue, ticket, project, cycle, assignee, backlog, CS- prefix, create/query/comment on issues). Unless they name another Linear project explicitly, every Linear project reference means JoshFinanceDashboard only — never infer a different project or ask which one. When the user says 'me', 'my issues', 'what am I assigned to', or similar, resolve to josh.jones@cursor.sh — do not use Linear's 'me' token. Applies to Linear MCP tools (list_issues, save_issue, get_issue, get_project, list_projects, list_comments, save_comment)."
---

# Linear conventions for finance-dashboard

## The only project to use

This codebase always uses the **JoshFinanceDashboard** Linear project in the **Cursor-Solutions** workspace, on the **Cursor Solutions** team (key `CS`):

https://linear.app/cursor-solutions/project/joshfinancedashboard-12dff551c174

Never create, search, or move issues on any other Linear project from this repo unless the user explicitly names a different one.

## Who "me" is

In this repo, conversational "me" / "my" / "what am I assigned to" always means **josh.jones@cursor.sh** (Linear user id `0b3f01be-65a8-4342-afc4-3f0df9bd9e1e`, display name `josh.jones2`).

Do **not** pass Linear MCP's `"me"` token for assignee. That token is the connected Linear account, which may not be josh.jones@cursor.sh. Always pass the email `josh.jones@cursor.sh` (or that user id).

## Rules

1. When creating any Linear issue, set `project` to `JoshFinanceDashboard` (or slug `joshfinancedashboard-12dff551c174`) and `team` to `Cursor Solutions` (or key `CS`). Do not prompt the user to choose a project or team — it's always this pair.
2. When listing or searching issues, always pass `project: "JoshFinanceDashboard"` (or the slug / id) unless the user explicitly asks otherwise.
3. When the user says "me", "my issues", "assigned to me", "what am I assigned to", or similar, set `assignee` to `josh.jones@cursor.sh`. Same for assigning a new issue to "me".
4. If a user references an issue key without a prefix (e.g. "ticket 696"), assume `CS-696`.
5. If the user explicitly names a different Linear project, team, or person, follow their instruction for that turn but do not change the default for subsequent turns.

## Quick reference

| Action | Default |
|--------|---------|
| Workspace | Cursor-Solutions (`cursor-solutions`) |
| Team | Cursor Solutions (key `CS`) |
| Team id | `020c5b56-8e8f-4192-a9ff-9ea126ba07ea` |
| Project | JoshFinanceDashboard |
| Project slug | `joshfinancedashboard-12dff551c174` |
| Project id | `b55973b9-1ff2-46aa-b41f-52d000fa5698` |
| Project URL | https://linear.app/cursor-solutions/project/joshfinancedashboard-12dff551c174 |
| Issue key prefix | `CS-` |
| "Me" / assignee | `josh.jones@cursor.sh` |
| "Me" user id | `0b3f01be-65a8-4342-afc4-3f0df9bd9e1e` |

## Example MCP calls

Listing issues in this project:

```json
{ "project": "JoshFinanceDashboard" }
```

Listing issues assigned to "me":

```json
{ "project": "JoshFinanceDashboard", "assignee": "josh.jones@cursor.sh" }
```

Creating an issue:

```json
{
  "title": "...",
  "team": "Cursor Solutions",
  "project": "JoshFinanceDashboard"
}
```

Creating an issue assigned to "me":

```json
{
  "title": "...",
  "team": "Cursor Solutions",
  "project": "JoshFinanceDashboard",
  "assignee": "josh.jones@cursor.sh"
}
```
