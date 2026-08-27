# Session Log: Transactions list page (JOSH-13)

- **Date:** 2026-08-19
- **Author:** joshjonesDEMO
- **Related PR / branch:** `cursor/josh-13-transactions-list-be2b`
- **Issue / ticket:** [JOSH-13](https://3p-agents.atlassian.net/browse/JOSH-13)

## Problem / goal

`/transactions` was still a placeholder. Overview already showed a 5-item preview from `finance.json`. JOSH-13 is the full list, newest-first, matching Overview row styling — not the Figma table with search/sort/pagination.

## Approach

- Extracted a shared `TransactionListItem` (and `formatTransactionDate`) so Overview and `/transactions` cannot drift.
- Added `getAllTransactions` as the full-list API; `getLatestTransactions` is now a slice of that.
- Replaced `PlaceholderPage` with Overview chrome (`main` + `h1` + `Card`) and a labeled list of every transaction.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Reuse `TransactionsPreview` on the page | Card heading "Transactions" plus `aria-label="Recent transactions"` is preview chrome, not a page list |
| Duplicate row markup in a new list | Would fail the "match Overview styling" AC the first time either side is tweaked |
| Wait for JOSH-15 before extracting | Extract is the cheapest way to meet JOSH-13's styling AC; JOSH-15 is largely done as a side effect |
| Follow Figma Desktop - Transactions table | Out of scope; search/sort/filter/pagination are JOSH-10/11/12/16/17 |
| `getLatestTransactions(data, data.transactions.length)` | Full-list helper is the API the page should own |

## Key decisions & tradeoffs

- **Decision:** Overview stacked row (name + `category • date`, signed amount) instead of Figma's 4-column table — **Tradeoff:** the page looks like a long Overview list; later tickets will restyle into columns in one shared item.
- **Decision:** `TransactionsList` renders in caller order and does not sort — **Tradeoff:** a misuse (unsorted props) shows unsorted rows; sort lives in `getAllTransactions` where the page calls it.
- **Decision:** No empty-state copy — **Tradeoff:** an empty JSON array is a blank card until JOSH-16.

## Follow-ups / known gaps

- [ ] JOSH-15 can likely be closed or reduced — shared `TransactionListItem` landed here
- [ ] Search, filter, sort, pagination, recurring badge remain separate tickets
- [ ] Figma table layout is still the target for those later tickets
