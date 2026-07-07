# Session Log: Financial Insights card (BugBot demo)

- **Date:** 2026-07-07
- **Author:** Josh Jones
- **Related PR / branch:** `demo/financial-insights-card`
- **Issue / ticket:** n/a (demo)

## Problem / goal

Showcase Cursor BugBot on a pull request. We need a realistic, self-contained
feature change that contains two intentionally planted bugs — one Low severity
and one Medium severity — so that BugBot flags them during PR review.

## Approach

- Added a new "Financial Insights" card to the Overview page rather than
  editing the heavily unit-tested `lib/format.ts` / `lib/data.ts`. Planting
  bugs in tested code would turn CI red and upstage BugBot; keeping the change
  in fresh, untested files keeps CI green so BugBot is the thing that catches
  the issues.
- New `lib/insights.ts` holds two small helpers; `InsightsCard.tsx` renders
  them; wired into `app/page.tsx`.

## Planted bugs (intentional — do not "fix" without context)

- **Medium — wrong savings-rate math:** `getSavingsRate` divides net savings
  by `balance.expenses` instead of `balance.income`. The savings rate is a
  user-facing financial metric that is wrong on the normal path (no crash),
  which is why it's Medium rather than Low.
- **Low — off-by-one:** `getBudgetsAtRisk` returns `slice(0, limit + 1)`,
  yielding one more item than the caller requested. Minor, cosmetic list
  overflow with no correctness/security impact -> Low.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Plant bugs in `formatCurrency` / `getLatestTransactions` | Covered by existing tests; would fail CI instead of relying on BugBot |
| Add a null-deref / crash bug | Too obvious and could break the build; wanted subtle, review-worthy bugs |

## Key decisions & tradeoffs

- **Decision:** Bugs live in a new, untested feature — **Tradeoff:** the new
  code has no test coverage (acceptable, and itself something BugBot may note).

## Follow-ups / known gaps

- [ ] After the BugBot demo, revert this branch or fix both bugs
      (`net / balance.income`, and `slice(0, limit)`).
