# Plan: JOSH-4 Transactions page

- **Spec:** [spec.md](./spec.md) (Status: Spec approved)
- **Status:** Draft

## Constitution check

| Rule | How the plan complies |
| --- | --- |
| 1 Static data | The page reads `getFinanceData()`. No fetches, APIs, or data changes. |
| 2 Next.js 16 | Read `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`. The page is a sync Server Component and uses no `params`/`searchParams` (Q3a), so none of the async request APIs apply. |
| 3 Types | `lib/types.ts` is unchanged. The new types (`SortOption`) live in `lib/transactions.ts`. |
| 4 Server by default | `app/transactions/page.tsx` stays a Server Component. Only `TransactionsView` is `"use client"`. |
| 5–7 Design | Built from Figma `101:364` using existing `--color-*`, `text-preset-*`, and `lucide-react` icons. The avatar is moved out of `TransactionsPreview`, not duplicated. |
| 8 Verification | `npm run lint`, `npm run test`, and `npm run build` run before Gate 4. |
| 9 Tests | Pure-logic unit tests plus component behaviour tests (see Test strategy). |
| 10 CI files | Untouched. |
| 11 Comments | Only for the stable-sort constraint. |
| 12–15 Process | JOSH ticket, joshjonesDEMO identity, session log, and specs all ship in the same PR. |

## Data shapes first

```ts
// lib/transactions.ts
export const PAGE_SIZE = 10;
export const SORT_OPTIONS = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];
export const ALL_CATEGORIES = "All Transactions";

export function getCategories(transactions: Transaction[]): string[];           // distinct, localeCompare-sorted
export function filterTransactions(transactions: Transaction[], query: string, category: string): Transaction[];
export function sortTransactions(transactions: Transaction[], sort: SortOption): Transaction[]; // stable, non-mutating
export function paginate<T>(items: T[], page: number, pageSize?: number): { items: T[]; page: number; pageCount: number };
// pageCount >= 1 even for empty input. page is clamped to [1, pageCount].

// lib/format.ts (additions)
export function formatTransactionDate(iso: string): string;   // en-GB, UTC -> "19 Aug 2024"
export function formatSignedAmount(amount: number): string;   // ">= 0" -> "+" + formatCurrency, else formatCurrency

// components/transactions/TransactionsView.tsx
type TransactionsViewProps = { transactions: Transaction[] };
// state: query: string, sort: SortOption, category: string, page: number
```

`Transaction` and `data/finance.json` are unchanged.

## Approach

1. **Pure logic in `lib/transactions.ts`.** `sortTransactions` uses one comparator per option. Descending options compare `b` to `a` rather than reversing an ascending result, and `Array.prototype.sort` is stable (ES2019), so ties keep their input order (FR-008).
2. **Shared formatting in `lib/format.ts`.** `formatTransactionDate` replaces the private `formatDisplayDate` in `TransactionsPreview` (FR-018). `formatSignedAmount` wraps `formatCurrency` (Must not: no second formatter).
3. **Shared avatar.** `TransactionAvatar` and its `AVATAR_ACCENTS` map move from `TransactionsPreview.tsx` to `components/transactions/TransactionAvatar.tsx`, and both pages import it.
4. **One client component, `TransactionsView`.** It renders the toolbar (search input with a lucide `Search` icon; native `<select>` for sort and category with a `ChevronDown` overlay), the `<table>`, the empty state, and `<Pagination>`. Handlers for search, sort, and category set their value and `page = 1` in the same event, so there is no effect-driven reset (FR-015).
5. **`Pagination`.** A presentational `<nav aria-label="Pagination">` with Prev, page buttons (`aria-current="page"` on the active one), and Next. Disabled states come from props.
6. **Page.** `app/transactions/page.tsx` renders the same `<main>` wrapper and `h1` as Overview, then `<TransactionsView transactions={data.transactions} />` inside a white `rounded-2xl` card.
7. **Overview link.** `TransactionsPreview` gets the same header-with-"See Details" pattern as `BudgetsCard` (FR-017).

**Alternatives considered**

| Option | Why not |
| --- | --- |
| Keep all state and logic inside the component | This fails NFR-004, and sort and pagination edge cases get hard to test through the DOM. |
| `useEffect` to reset the page on filter change | It causes an extra render and a lint warning (`react-hooks/set-state-in-effect`). Resetting inside the handlers is simpler and synchronous. |
| Render the Transactions table with `TransactionsPreview` | The layouts differ (a table vs. a list), and the spec says row markup isn't shared. |

## File map

Nothing outside this list is touched.

| File | Change | Covers |
| --- | --- | --- |
| `lib/transactions.ts` | new | FR-006–FR-012, NFR-004 |
| `lib/format.ts` | modify: add `formatTransactionDate` and `formatSignedAmount` | FR-004, FR-005 |
| `components/transactions/TransactionAvatar.tsx` | new (moved from `TransactionsPreview`) | FR-003 |
| `components/transactions/Pagination.tsx` | new | FR-013, FR-014 |
| `components/transactions/TransactionsView.tsx` | new, `"use client"` | FR-002–FR-016, NFR-001–NFR-003 |
| `app/transactions/page.tsx` | modify: replace placeholder | FR-001, FR-002 |
| `components/overview/TransactionsPreview.tsx` | modify: shared avatar/date/amount, add "See Details" link | FR-017, FR-018 |
| `tests/lib/transactions.test.ts` | new | AC 3–7 (logic level), 8, 11 |
| `tests/lib/format.test.ts` | modify: add cases | AC 2 |
| `tests/components/TransactionsView.test.tsx` | new | AC 2, 5–11 |
| `tests/components/Pagination.test.tsx` | new | AC 8, 11 (disabled/current states) |
| `tests/components/TransactionsPreview.test.tsx` | modify: date assertion to "19 Aug 2024", add link test | AC 12, 13 |
| `specs/JOSH-4-transactions-page/*`, `docs/sessionLogs/2026-09-30-transactions-page.md` | update | process |

`components/shell/PlaceholderPage.tsx` stays, because Budgets, Pots, and Recurring Bills still use it.

## Test strategy

| AC | Test |
| --- | --- |
| 1 | Manual: dev server and recording, plus `npm run build` prerendering `/transactions` |
| 2 | `format.test.ts`: `formatTransactionDate("2024-08-19")` gives "19 Aug 2024", `formatSignedAmount(1200)` gives "+$1,200.00", `(-55.5)` gives "-$55.50", `(0)` gives "+$0.00". `TransactionsView.test.tsx`: the rendered row has those strings, and the amount has the `text-secondary-green` class for positives. |
| 3 | `transactions.test.ts`: each of the 6 options on a fixture with duplicate names and duplicate dates. Tied rows keep input order in both directions, and the input isn't mutated. |
| 4 | `transactions.test.ts`: Highest/Lowest on +1200, -6.5, -250. |
| 5 | `transactions.test.ts` `getCategories`. `TransactionsView.test.tsx`: select a category, then All Transactions. |
| 6 | `transactions.test.ts` `filterTransactions("  EMMA ")`. View test: type, then clear. |
| 7 | View test: search + category + sort combined. |
| 8 | `transactions.test.ts` `paginate` on 23 items (pages 1 and 3). View test: 23 fixtures show 10 rows, click "3" shows 3 rows, Next disabled. |
| 9 | View test: go to page 3, change each control, page 1 is current. |
| 10 | View test: no-match search shows "No transactions found." and no navigation named Pagination. |
| 11 | `paginate([])` and `paginate(10 items)` give `pageCount` 1. `Pagination.test.tsx`: both buttons disabled. |
| 12, 13 | `TransactionsPreview.test.tsx`: link `href="/transactions"`, date "19 Aug 2024". |
| 14 | Manual: narrow-viewport check in the recording. |

## Risks

- **Time-zone drift.** `new Date("2024-08-19")` parses as UTC midnight. Formatting it with `timeZone: "UTC"` keeps the date stable in every TZ. It's covered by the format test.
- **Native select styling.** The open menu uses the OS look (accepted in Q4a). The closed state matches Figma.
- **Figma caret.** Figma uses a filled caret icon. `lucide-react` only has outline chevrons, and constitution rule 7 means no new icon dependency, so a small visual difference is accepted.
- **Overview date change** alters visible Overview text (approved in Q2a).
- **Conflicts with PRs #8 and #9** in `app/transactions/page.tsx`.

## Definition of done

- Every task in `tasks.md` is ticked with its check passing.
- `npm run lint`, `npm run test`, and `npm run build` are clean.
- The screen recording covers AC 1, 5, 6, 10, 12, and 14, alongside the Figma frame.
- The spec-verifier subagent reports no "not met" items.
- The session log is updated.

## Log

- 2026-09-30. Status: Draft. Plan drafted after Gate 1.
