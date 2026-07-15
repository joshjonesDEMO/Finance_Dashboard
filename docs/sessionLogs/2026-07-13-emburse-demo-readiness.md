# Session Log: Emburse live demo readiness

- **Date:** 2026-07-13
- **Author:** Josh Jones
- **Related PR / branch:** `July_16_Bugbot_CloudAgent` → `UI-refactor`
- **Issue / ticket:** n/a (demo prep)

## Problem / goal

Prepare the Finance Dashboard repo so every phase of
`docs/Emburse_Demo_Outline.md` can be run live for the Emburse x Cursor demo.
The outline assumes Bugbot rules, nested path standards, intentional findings on
a feature branch, and operator notes for dashboard/Slack/Autofix setup that
lives outside the repo.

## Approach

- Added root `.cursor/BUGBOT.md` and nested `backend/.cursor/BUGBOT.md` for
  Phase 0 guardrails walkthrough.
- Created `backend/lib/transactionSync.ts` as an untested, demo-only module (not
  wired into the Next.js app) with two intentional issues matching the outline:
  hardcoded API token and unbounded retry loop.
- Added `docs/Emburse_Demo_Checklist.md` as the pre-call go/no-go runbook mapped
  to outline phases 0–6.
- Left existing `lib/insights.ts` planted bugs from the July 7 demo untouched so
  this PR narrative stays focused on the backend module.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Reuse `lib/insights.ts` math/off-by-one bugs | Outline explicitly names secret + retry; different story |
| Plant bugs in tested `lib/format.ts` / `lib/data.ts` | Would fail CI and upstage Bugbot |
| Target PR base `main` | Would include entire UI-refactor diff, not just demo commits |
| Add null-deref crash bug | Too obvious; could break build |

## Key decisions & tradeoffs

- **Decision:** PR base is `UI-refactor`, not `main` — **Tradeoff:** audience
  must understand why the base branch is non-default.
- **Decision:** Bugs live in untested `backend/` module — **Tradeoff:** no test
  coverage for new code (acceptable; Bugbot may note it).
- **Decision:** Checklist documents external toggles rather than automating them
  in-repo — **Tradeoff:** presenter must verify dashboard settings manually.

## Planted bugs (intentional — do not fix during live demo)

- **Hardcoded secret:** `fetchTransactionBatch` uses inline bearer token instead
  of an environment variable.
- **Unbounded retry:** `syncTransactionsWithRetry` uses `while (true)` with no
  max attempts or backoff.

## Follow-ups / known gaps

- [x] Rewrote root + nested `BUGBOT.md` to read as real Emburse product
      standards (money correctness, secrets, bounded retries) — removed
      meta “demo planted issue” language so Phase 0 holds up in front of
      the team
- [ ] Dry-run: Agent Review + `/review-bugbot` on branch before the call
- [ ] Open PR `July_16_Bugbot_CloudAgent` → `UI-refactor` and confirm Bugbot
      comments
- [ ] Pre-stage completed Cloud Agent run and merged example PR as fallbacks
- [ ] After the demo, revert planted bugs or merge fixes on a follow-up branch
