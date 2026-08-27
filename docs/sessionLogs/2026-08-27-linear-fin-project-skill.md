# Session Log: Linear project skill — "me" resolution

- **Date:** 2026-08-27
- **Author:** agent
- **Related PR / branch:** main
- **Issue / ticket:** n/a

## Problem / goal

The repo already had `linear-fin-project` on main (2026-07-09) pinning JoshFinanceDashboard. Conversational "me" / "what am I assigned to" still followed Linear MCP's connected-account token, which can be a different user than josh.jones@cursor.sh.

## Approach

Replace the skill on `main` with the version that keeps the existing project pin and always assigns/queries `josh.jones@cursor.sh` instead of MCP `"me"`. Structure still mirrors `figma-fin-design` and `jira-fin-board`.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Use Linear MCP `"me"` for assignee | `"me"` is the connected Linear account, which may not be josh.jones@cursor.sh (the project also has josh.jones.cursor@gmail.com). |
| Commit on `Next_Demo` then merge | User asked for the skill on `main`. |
| Personal skill under `~/.cursor/skills/` | Figma/Jira skills are repo-scoped; this one should match. |

## Key decisions & tradeoffs

- **Decision:** Always pass `assignee: "josh.jones@cursor.sh"` instead of `"me"` — **Tradeoff:** slightly more verbose MCP calls; avoids silently querying the wrong user.
- **Decision:** Default team is Cursor Solutions (`CS`) because that is the only team on JoshFinanceDashboard — **Tradeoff:** creating an issue still requires `team` in Linear MCP; we fill it automatically rather than asking.

## Follow-ups / known gaps

- [ ] Commit is local on `main` until pushed.
