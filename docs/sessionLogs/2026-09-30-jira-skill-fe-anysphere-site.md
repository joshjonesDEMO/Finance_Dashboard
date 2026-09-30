# Session Log: Point jira-fin-board at the fe-anysphere-demo site

- **Date:** 2026-09-30
- **Author:** Cursor Agent (for joshjonesDEMO)
- **Related PR / branch:** `cursor/jira-skill-fe-anysphere-site-44bd`
- **Issue / ticket:** (none)

## Problem / goal

`.cursor/skills/jira-fin-board/SKILL.md` sent agents to `3p-agents.atlassian.net`, but the JOSH project lives on `fe-anysphere-demo.atlassian.net` (cloud ID `564eb250-21c1-45d7-81f9-527d6bf705ad`). Beyond the URL, the skill said nothing about the project's real shape, so agents guessed at issue types, fields, and Figma references. Fix the site, pin the cloud ID, and make the nomenclature match the live project.

## Approach

- Read the live project through the Atlassian MCP before editing: project metadata, issue types, create-screen fields, workflow transitions, and all 20 JOSH issues.
- Rewrote only the site-specific and nomenclature parts of `main`'s skill and kept its structure and voice.
- Verified the board URL's JQL (`project = JOSH ORDER BY status ASC, cf[10019] ASC`) and the example JQL (`project = JOSH AND status != Done ORDER BY updated DESC`, which returns 19 issues) through the MCP using the UUID cloud ID.
- Applied the same fix to every branch that has an open PR, using each branch's own skill variant as the base (see below).

## What the live project showed

- Project `JOSH` is named "Josh's Space". Issue types: Epic, Feature, Story, Task, Bug, Subtask.
- Statuses: To Do, In Progress, In Progress (Cursor), In Review, Done. All transitions are global.
- `cf[10019]` is **Rank** (LexoRank), not Sprint. No JOSH issue is in a sprint.
- Acceptance criteria are a checklist inside the description, not a custom field. Descriptions follow `## Context / Goal / Scope / Out of scope / Acceptance criteria`, and bugs use `Steps to reproduce / Expected / Actual`.
- No ticket contains a figma.com link. Tickets cite file key `rJb9XS7DMeIaTRYtpH1RuK` and frames as `**Frame name** (\`node:id\`)`.
- `JOS` ("JoshJones") is a separate project on the same site that holds Atlassian onboarding tickets. `FIN` on this site is "FlowBuilder", which is unrelated.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Pass the site hostname as `cloudId` (as the `8_4_Cloud&Automations` branch does) | Works, but the UUID is the stable identifier and skips hostname resolution. |
| Drop the board URL because `cf[10019]` isn't Sprint | The field exists (as Rank) and the URL is the real list view, so keep it and label the field correctly. |
| Overwrite every branch's skill with `main`'s | Would erase branch-specific wording. Edited each variant in place instead. |

## Key decisions & tradeoffs

- **Decision:** Add rule 6 forbidding project `JOS`. **Tradeoff:** A user explicitly asking for `JOS` gets pushback despite rule 5. This is intentional, per Josh.
- **Decision:** Fix the example create call to use `issueTypeName` (the MCP's actual parameter) and include `cloudId`. **Tradeoff:** None. The old `issueType` key would have been rejected.
- **Decision:** On the three branches whose skill still targets `FIN`, switch the key to `JOSH`. **Tradeoff:** Changes more than the site line, but `FIN` on this site is FlowBuilder, so keeping it would send agents to the wrong project. Those branches' em-dash wording and other structure were kept.
- **Decision:** Skip branches with no open PR (`8_4_Cloud&Automations`, `Next_Demo`, and others). **Tradeoff:** They keep stale skill text until they are rebased or merged.

## Follow-ups / known gaps

- [ ] `figma-fin-design` lists Desktop - Home as `101:2`, but tickets (JOSH-10) cite `101:3`, and `101:3` is the actual "Desktop - Home" frame in the file. Worth reconciling in that skill.
- [ ] `cursor/josh-13-transactions-list-be2b`'s session log still links JOSH-13 on `3p-agents`. It was left alone because it is that branch's own audit record.
