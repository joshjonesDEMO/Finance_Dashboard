# Session Logs

An audit trail of agent-assisted work on this project. Each meaningful unit of
work (typically one PR) gets a short markdown log capturing **the reasoning**:
the goal, the approach, alternatives considered, decisions made, and tradeoffs
discussed. Reviewers read these to understand *why* the code looks the way it
does — not to re-read the code itself.

## How it works

1. When you start a non-trivial piece of work, copy [`TEMPLATE.md`](./TEMPLATE.md)
   to `docs/sessionLogs/YYYY-MM-DD-<kebab-slug>.md`.
2. Fill it in **as you go**, while context is fresh — not at the end. The agent
   is instructed to do this automatically (see `.cursor/rules/session-log.mdc`).
3. Commit the log alongside your code changes. It ships in the same PR.
4. The PR checklist includes a reminder so it doesn't get skipped.

## What belongs here

- Curated reasoning: problem, approach, alternatives, decisions, tradeoffs,
  follow-ups.

## What does NOT belong here

- Full, unedited agent transcripts (too noisy for review). The template has a
  commented-out `Raw transcript` section scaffolded in for later, if you ever
  want compliance-grade raw archives — enable it per-log or via a Cursor hook.
- Secrets, tokens, or credentials.

## Naming

`YYYY-MM-DD-<kebab-slug>.md` — e.g. `2026-06-12-add-transactions-page.md`.
Date-prefixing keeps the directory chronologically sortable.
