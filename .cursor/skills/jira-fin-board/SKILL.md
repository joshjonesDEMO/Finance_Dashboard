---
name: jira-fin-board
description: "JOSH/finance-dashboard Jira defaults. ALWAYS load this skill when working in this repo and the user mentions Jira at all, including boards, backlogs, sprints, epics, stories, tickets, issue keys, the JOSH board, the JOSH project, or creating, querying, triaging, and commenting on issues. Unless they name another project explicitly, every Jira board or project reference means project key JOSH only. Never infer a different board or ask which project. Applies to Atlassian MCP and skills such as triage-issue, spec-to-backlog, capture-tasks-from-meeting-notes, generate-status-report, and search-company-knowledge. Force JOSH and project = JOSH in JQL."
---

# Jira conventions for finance-dashboard

## The only board to use

This codebase always uses the **JOSH** Jira board (project key `JOSH`) in the user's connected Jira account:

https://3p-agents.atlassian.net/jira/software/projects/JOSH/list?jql=project%20%3D%20JOSH%20ORDER%20BY%20status%20ASC%2C%20cf%5B10019%5D%20ASC

Never create, search, or move issues on any other board from this repo.

## Rules

1. When creating any Jira issue (bug, task, story, epic, sub-task), set the project key to `JOSH`. Do not prompt the user to choose a board. It is always JOSH.
2. When searching Jira (JQL or MCP search tools), scope queries to `project = JOSH` unless the user explicitly asks otherwise.
3. When other Atlassian skills (e.g. `triage-issue`, `spec-to-backlog`) ask which project to target, answer `JOSH` automatically without re-asking the user.
4. If a user references an issue key without a prefix (e.g. "ticket 123"), assume `JOSH-123`.
5. If the user explicitly names a different project, follow their instruction for that turn but do not change the default for subsequent turns.

## Quick reference

| Action | Default |
|--------|---------|
| Board | [JOSH issue list](https://3p-agents.atlassian.net/jira/software/projects/JOSH/list?jql=project%20%3D%20JOSH%20ORDER%20BY%20status%20ASC%2C%20cf%5B10019%5D%20ASC) |
| Project key | `JOSH` |
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
