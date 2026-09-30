---
name: jira-fin-board
description: "JOSH/finance-dashboard Jira defaults. ALWAYS load this skill when working in this repo and the user mentions Jira at all, including boards, backlogs, sprints, epics, stories, tickets, issue keys, the JOSH board, the JOSH project, or creating, querying, triaging, and commenting on issues. Unless they name another project explicitly, every Jira board or project reference means project key JOSH only. Never infer a different board or ask which project. Applies to Atlassian MCP and skills such as triage-issue, spec-to-backlog, capture-tasks-from-meeting-notes, generate-status-report, and search-company-knowledge. Force JOSH and project = JOSH in JQL."
---

# Jira conventions for finance-dashboard

## The only board to use

This codebase always uses the **JOSH** Jira project ("Josh's Space", project key `JOSH`) on the `fe-anysphere-demo.atlassian.net` site:

https://fe-anysphere-demo.atlassian.net/jira/software/projects/JOSH/list?jql=project%20%3D%20JOSH%20ORDER%20BY%20status%20ASC%2C%20cf%5B10019%5D%20ASC

Pass `cloudId: "564eb250-21c1-45d7-81f9-527d6bf705ad"` on every Atlassian MCP call. Don't call `getAccessibleAtlassianResources` to look it up.

Never create, search, or move issues on any other board from this repo.

## Rules

1. When creating any Jira issue (bug, task, story, epic, sub-task), set the project key to `JOSH`. Do not prompt the user to choose a board. It is always JOSH.
2. When searching Jira (JQL or MCP search tools), scope queries to `project = JOSH` unless the user explicitly asks otherwise.
3. When other Atlassian skills (e.g. `triage-issue`, `spec-to-backlog`) ask which project to target, answer `JOSH` automatically without re-asking the user.
4. If a user references an issue key without a prefix (e.g. "ticket 123"), assume `JOSH-123`.
5. If the user explicitly names a different project, follow their instruction for that turn but do not change the default for subsequent turns.
6. Never use project `JOS` ("JoshJones"). It is on the same site but is a different project, not an alias or typo of `JOSH`.

## Project shape

- **Issue types:** Epic, Feature, Story, Task, Bug, Subtask. Feature, Story, Task, and Bug sit under an Epic via `parent`.
- **Statuses:** To Do, In Progress, In Progress (Cursor), In Review, Done. Every transition is global; get transition IDs from `getTransitionsForJiraIssue`.
- **Fields:** `cf[10019]` in the board URL is **Rank** (board order), not Sprint. JOSH doesn't use sprints. Acceptance criteria are a checklist in the description, not a custom field.
- **Descriptions** use `## Context`, `## Goal`, `## Scope`, `## Out of scope`, `## Acceptance criteria`. Bugs add `## Steps to reproduce`, `## Expected`, `## Actual`.
- **Figma references** have no figma.com links. Tickets cite the file key `rJb9XS7DMeIaTRYtpH1RuK` and frames as name plus node ID, e.g. ``**Desktop - Pots** (`101:919`)``. Pass those straight to the Figma MCP as `fileKey` and `nodeId` (see `figma-fin-design`), and cite frames the same way in new tickets.

## Quick reference

| Action | Default |
|--------|---------|
| Site | `fe-anysphere-demo.atlassian.net` |
| Cloud ID | `564eb250-21c1-45d7-81f9-527d6bf705ad` |
| Board | [JOSH issue list](https://fe-anysphere-demo.atlassian.net/jira/software/projects/JOSH/list?jql=project%20%3D%20JOSH%20ORDER%20BY%20status%20ASC%2C%20cf%5B10019%5D%20ASC) |
| Project key | `JOSH` ("Josh's Space") |
| JQL scope | `project = JOSH` |
| Issue key prefix | `JOSH-` |
| Never use | `JOS` ("JoshJones") |

## Example MCP calls

Creating an issue:

```json
{ "cloudId": "564eb250-21c1-45d7-81f9-527d6bf705ad", "projectKey": "JOSH", "issueTypeName": "Task", "summary": "..." }
```

Searching:

```jql
project = JOSH AND status != Done ORDER BY updated DESC
```
