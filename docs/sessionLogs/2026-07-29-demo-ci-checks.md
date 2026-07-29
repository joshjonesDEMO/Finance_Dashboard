# Session Log: Demo-controllable GitHub Actions CI

- **Date:** 2026-07-29
- **Author:** Josh Jones
- **Related PR / branch:** (pending)
- **Issue / ticket:** n/a

## Problem / goal

Add believable PR CI checks (lint, unit tests, build) for demos, with a single committed file that can force any check to pass or fail without changing application code.

## Approach

- One workflow (`.github/workflows/ci.yml`) with three separate jobs so GitHub shows distinct checks.
- Flat config at `.github/ci-demo.yml`: each of `lint` / `test` / `build` is `pass` (run real npm script) or `fail` (exit 1 with a clear demo message).
- Documented in the PR template and `AGENTS.md`.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Branch-name keyed config | Extra indirection; editing the config on the demo branch is simpler for ad-hoc flips |
| Commit/PR title markers | Easy to forget; less visible than a dedicated file |
| GitHub repo Variables | Requires UI access and doesn't travel with the demo branch |
| Single combined CI job | Harder to show one red check while others stay green |

## Key decisions & tradeoffs

- **Decision:** Separate jobs for lint/test/build — **Tradeoff:** more Actions minutes, clearer demo UI.
- **Decision:** Forced `fail` skips the real script — **Tradeoff:** failure logs are obviously demo-driven, not a real lint/test/build error; acceptable for controllable demos.
- **Decision:** When `pass`, use real exit codes — **Tradeoff:** a broken branch can still go red even if the demo intended green.

## Follow-ups / known gaps

- [ ] Optionally enable these as required status checks in GitHub branch protection (`lint`, `test`, `build`)
- [ ] Revert `.github/ci-demo.yml` to all `pass` before merging demo branches if a green merge is required
