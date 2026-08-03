# Session Log: JOSH-10 Due Soon currency total

- **Date:** 2026-08-03
- **Author:** joshjonesDEMO
- **Related PR / branch:** `cursor/josh-10-due-soon-total-29c6`
- **Issue / ticket:** [JOSH-10](https://fe-anysphere-demo.atlassian.net/browse/JOSH-10)

## Problem / goal

Overview Recurring Bills showed Due Soon as a bill count in the large value slot, while Paid Bills and Total Upcoming showed currency totals. Figma Desktop - Home expects Due Soon as a monetary total for design parity.

## Approach

- Reused the existing `sumAmounts` + `formatCurrency` path already used for Paid / Upcoming.
- Computed `dueSoonTotal` from absolute amounts and rendered `dueSoonDisplay` as the large value.
- Matched Paid / Upcoming amount styling (`text-preset-2 font-bold text-secondary-red`).
- Added a unit test asserting `-$185.00` for the fixture bills (80 + 45 + 60).

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Keep count as large value and only change Figma | Ticket and design both require a currency total |
| New helper dedicated to Due Soon | Unnecessary; existing helpers already cover this |

## Key decisions & tradeoffs

- **Decision:** Mirror Paid / Upcoming exactly (abs sum, negative currency string, shared classes) — **Tradeoff:** Due Soon loses its previous distinct large typography (`text-preset-1` / grey), which was inconsistent with the other rows anyway.
- **Decision:** Keep the subtitle count (`N bills`) unchanged — **Tradeoff:** Count remains available without competing with the monetary total.

## Follow-ups / known gaps

- [ ] Full Recurring Bills page (`/recurring-bills`) remains a placeholder (out of scope for JOSH-10)
