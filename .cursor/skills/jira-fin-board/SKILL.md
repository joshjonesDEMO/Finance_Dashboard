---
name: jira-fin-board
description: "JOSH Jira defaults — ALWAYS load this skill when working in this repo and the user mentions Jira at all (board, backlog, sprint, epic, story, ticket, issue key, JOSH board, JOSH project, create/query/triage/comment on issues). Unless they name another project explicitly, every Jira board/project reference means project key JOSH only — never infer a different board or ask which project. Applies to Atlassian MCP and skills (triage-issue, spec-to-backlog, capture-tasks-from-meeting-notes, generate-status-report, search-company-knowledge): force JOSH and project = JOSH in JQL."
---

# Jira conventions for finance-dashboard

## The only board to use

This codebase always uses the **JOSH** Jira board (project key `JOSH`, board 89) in the user's connected Jira account:

https://3p-agents.atlassian.net/jira/software/projects/JOSH/boards/89

Never create, search, or move issues on any other board from this repo.

## Rules

1. When creating any Jira issue (bug, task, story, epic, sub-task), set the project key to `JOSH`. Do not prompt the user to choose a board — it's always JOSH.
2. When searching Jira (JQL or MCP search tools), scope queries to `project = JOSH` unless the user explicitly asks otherwise.
3. When other Atlassian skills (e.g. `triage-issue`, `spec-to-backlog`) ask which project to target, answer `JOSH` automatically without re-asking the user.
4. If a user references an issue key without a prefix (e.g. "ticket 123"), assume `JOSH-123`.
5. If the user explicitly names a different project, follow their instruction for that turn but do not change the default for subsequent turns.

## Quick reference

| Action | Default |
|--------|---------|
| Project key | `JOSH` |
| Board | `89` |
| Board URL | https://3p-agents.atlassian.net/jira/software/projects/JOSH/boards/89 |
| JQL scope | `project = JOSH` |
| Issue key prefix | `JOSH-` |

## Example MCP calls

Creating an issue:

```json
{ "projectKey": "JOSH", "issueType": "Task", "summary": "..." }
```

Searching:

```jql
project = JOSH AND status != Done ORDER BY updated DESC
```
