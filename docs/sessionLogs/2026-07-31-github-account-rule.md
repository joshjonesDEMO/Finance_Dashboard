# Session Log: Pin GitHub identity to joshjonesDEMO

- **Date:** 2026-07-31
- **Author:** Josh Jones (via Cursor agent)
- **Related PR / branch:** main (rule + local git config)
- **Issue / ticket:** none

## Problem / goal

Two GitHub accounts are logged into gh on this machine: `joshjones-cursor`
(active, no write access to this repo) and `joshjonesDEMO` (repo owner). A
remote branch delete failed with 403 until the owner token was used manually.
Goal: all commits, pushes, and gh API writes in this repo should use
`joshjonesDEMO` without manual token juggling.

## Approach

- Added `.cursor/rules/github-account.mdc` (alwaysApply) telling agents to
  author commits as joshjonesDEMO and to use
  `GH_TOKEN=$(gh auth token --user joshjonesDEMO)` for gh write calls.
- Added a repo-local git credential helper (`.git/config`, not committed) that
  serves the joshjonesDEMO token from gh's keyring, so plain `git push` also
  authenticates correctly for both the user and agents.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| `gh auth switch` to joshjonesDEMO | Changes the active account machine-wide, affecting other repos that expect joshjones-cursor |
| `credential.<url>.username` hint | gh's credential helper refuses to serve tokens for a non-active account, breaking push entirely |
| Rule only, no git config | User's own terminal pushes would still fail with 403 |

## Key decisions & tradeoffs

- **Decision:** repo-local credential helper shells out to
  `gh auth token --user joshjonesDEMO` at push time — **Tradeoff:** depends on
  gh keyring login staying valid; no token is stored in the repo.

## Follow-ups / known gaps

- [ ] Commit author was already joshjonesDEMO via global git config; if the
      global config ever changes, set it locally in this repo.
