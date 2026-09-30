# JOSH-4: Transactions page

- **Status:** Spec approved
- **Track:** Full. A new page, 4+ new or changed files, and new client-side list logic.
- **Feature ID:** JOSH-4-transactions-page
- **Branch:** `cursor/josh-4-transactions-page` (from `origin/main`)
- **Sources:**
  - Slack request: https://cursor-solutions.slack.com/archives/C0BFU03CWD8/p1790774896175549
  - Jira primary: [JOSH-4](https://fe-anysphere-demo.atlassian.net/browse/JOSH-4) "Build Transactions page from Overview preview"
  - Jira included: [JOSH-17](https://fe-anysphere-demo.atlassian.net/browse/JOSH-17) pagination
  - Jira follow-ups: [JOSH-18](https://fe-anysphere-demo.atlassian.net/browse/JOSH-18) seed data, [JOSH-11](https://fe-anysphere-demo.atlassian.net/browse/JOSH-11) avatar images, [JOSH-12](https://fe-anysphere-demo.atlassian.net/browse/JOSH-12) mobile layouts
  - Figma: `rJb9XS7DMeIaTRYtpH1RuK`, **Desktop - Transactions** (`101:364`), Design System (`182:285`)

## Outcomes

- A user opening **Transactions** in the sidebar sees every transaction in `data/finance.json` in a table that matches the Figma frame, instead of a placeholder.
- A user can narrow and reorder the list (search, sort, category) and page through it.
- A user on Overview can jump from the Transactions preview to the full page.

## In scope / Out of scope

**In scope**
- Replace the `/transactions` placeholder with the full page.
- A toolbar with search by name, a sort dropdown, and a category dropdown, per Figma `101:364`.
- A table with columns Recipient / Sender, Category, Transaction Date, and Amount.
- Client-side pagination at 10 rows per page with Prev, numbered pages, and Next. This is JOSH-17.
- An empty state when no transactions match.
- A "See Details" link on the Overview Transactions card, reusing the header-and-link pattern from `BudgetsCard` and `PotsSummary`.
- Shared helpers for the avatar, date, and signed amount, used by both Overview and Transactions. Row markup is not shared, and each page keeps its own row layout and divider.
- Switching Overview dates to the Figma format "19 Aug 2024".

**Out of scope**
- Creating, editing, or deleting transactions, and any persistence.
- Changes to `data/finance.json` (JOSH-18).
- Real avatar images from Figma assets (JOSH-11). Colored initials stay.
- Mobile/tablet frames and bottom navigation (JOSH-12). The table only has to stay usable at narrow widths (NFR-003).
- Search debounce, a clear-search button, and searching on category.
- Collapsing page numbers with an ellipsis. Every page number is shown.
- Syncing filter state to the URL.
- Sidebar changes (its `/transactions` active state already exists).
- Budgets, Pots, and Recurring Bills pages.

## Constraints

- Constitution rules 1–15 (`specs/constitution.md`).
- Static data only. `FinanceData` and `Transaction` types don't change.
- Tokens only from `app/globals.css` / `lib/theme.ts` and `text-preset-*`.
- `app/transactions/page.tsx` stays a Server Component that reads `getFinanceData()` and passes `transactions` to one `"use client"` component (constitution rule 4).
- Overview changes are limited to FR-016 and FR-017. Existing Overview tests keep passing, except the date assertion that FR-017 updates.

## Decisions already made

- **Fresh build on JOSH-4.** Open PRs [#8](https://github.com/joshjonesDEMO/Finance_Dashboard/pull/8) and [#9](https://github.com/joshjonesDEMO/Finance_Dashboard/pull/9) are not reused (approver, Slack, 2026-09-30).
- **Base on `origin/main`.** `SpecDrivenDevelopment` is a strict ancestor of `main`.
- **Current data yields one page.** `finance.json` has 10 transactions from Nov 2022, so the live page shows one page. Multi-page behaviour is proven with fixture data.
- **Categories come from the data.** The Figma frame shows only the closed dropdown. Offering categories with no transactions would only produce empty results.
- **Highest and Lowest sort use the signed amount.** Highest puts the largest income first. Lowest puts the largest expense first.

## Requirements

### Functional

- **FR-001** `/transactions` renders a page titled "Transactions" and no longer renders `PlaceholderPage`.
- **FR-002** The page lists transactions from `getFinanceData().transactions`, 10 per page.
- **FR-003** Each row shows the avatar (colored initial), name, category, date, and amount.
- **FR-004** Dates format as `Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })` on the ISO date. For example, `2024-08-19` becomes "19 Aug 2024".
- **FR-005** Amounts use `formatCurrency`, with thousands separators. `amount >= 0` shows `+` in `secondary-green`, and `amount < 0` shows `-` in `grey-900`. For example: "+$1,200.00" and "-$55.50".
- **FR-006** The default sort is Latest.
- **FR-007** Sort options:
  - Latest: date descending.
  - Oldest: date ascending.
  - A to Z / Z to A: name compared with `localeCompare(…, "en", { sensitivity: "base" })`.
  - Highest: signed amount descending.
  - Lowest: signed amount ascending.
- **FR-008** Ties keep the original data order in every sort direction. A descending sort is not built by reversing an ascending one.
- **FR-009** The category dropdown shows "All Transactions" first, then each distinct category in the data, sorted with `localeCompare`.
- **FR-010** Choosing a category shows only transactions in that category. "All Transactions" shows every category.
- **FR-011** Search matches the name only. It is case-insensitive, ignores leading and trailing whitespace, and applies on every keystroke. A blank search matches everything.
- **FR-012** Filters apply first (search AND category), then sort, then pagination.
- **FR-013** Pagination shows Prev, one button per page, and Next. The current page is marked with `aria-current="page"` and the active style.
- **FR-014** Prev is disabled on page 1, and Next is disabled on the last page.
- **FR-015** Changing search, sort, or category resets to page 1.
- **FR-016** When nothing matches, the table rows are replaced by "No transactions found." and pagination is hidden.
- **FR-017** The Overview Transactions card shows a "See Details" link to `/transactions`.
- **FR-018** Overview transaction dates use the FR-004 format.

### Non-functional

- **NFR-001** The page matches Figma `101:364` using existing tokens:
  - White `rounded-2xl` card.
  - 40px inputs with a `beige-500` border and 8px radius.
  - Column headers in `text-preset-5` `grey-500`.
  - Row dividers in `grey-100`.
  - Active page button in `grey-900` with white text.
- **NFR-002** Accessibility:
  - Search, sort, and category each have a label.
  - The list is a real `<table>` with `<th scope="col">` headers.
  - The pager is a `<nav aria-label="Pagination">`.
  - Dropdowns are native `<select>` elements styled to the tokens.
- **NFR-003** Below `md` (768px), the Category and Transaction Date header and data cells are hidden (`hidden md:table-cell`), and the name cell shows category and date under the name. At `md` and above, the name cell shows only the name.
- **NFR-004** Filtering, sorting, pagination, and category listing are pure functions in `lib/transactions.ts` with unit tests. The client component only holds state and renders.
- **NFR-005** `npm run lint`, `npm run test`, and `npm run build` all pass.

## Acceptance criteria

Criterion 1 runs against the real data. The rest run against fixture arrays passed to the `lib/transactions.ts` functions or to the client component's `transactions` prop.

1. **Given** the app is running, **when** I open `/transactions`, **then** I see the "Transactions" heading, the toolbar, and a table of all 10 transactions, newest first, with no placeholder text. (FR-001, FR-002, FR-006)
2. **Given** rows of -55.50 on 2024-08-19 and +1200 on 2024-08-11, **when** they render, **then** the first shows "-$55.50" in grey-900 with "19 Aug 2024", and the second shows "+$1,200.00" in green with "11 Aug 2024". (FR-003–FR-005)
3. **Given** rows that include two with the same name and two with the same date, **when** I choose each sort option, **then** rows order as FR-007 says, and tied rows keep their original relative order in both directions. (FR-007, FR-008)
4. **Given** amounts +1200, -6.50, and -250, **when** I sort Highest, **then** the order is +1200, -6.50, -250. **When** I sort Lowest, **then** it is -250, -6.50, +1200. (FR-007)
5. **Given** categories "Groceries", "Bills", and "Bills", **when** the dropdown renders, **then** it offers All Transactions, Bills, Groceries. **When** I choose Bills, **then** only the two Bills rows show, and **when** I choose All Transactions, **then** all rows return. (FR-009, FR-010)
6. **Given** names "Emma Richardson" and "Daniel Carter", **when** I type "  EMMA ", **then** only Emma Richardson shows. **When** I clear the search, **then** both show. (FR-011)
7. **Given** a search and a category are both set, **when** I change sort, **then** only rows matching both show, in the new order. (FR-012)
8. **Given** 23 transactions, **when** the component renders, **then** 10 rows show, pages 1–3 are offered, page 1 is `aria-current`, and Prev is disabled. **When** I click 3, **then** 3 rows show and Next is disabled. (FR-002, FR-013, FR-014)
9. **Given** I am on page 3, **when** I change search, sort, or category, **then** page 1 is current. (FR-015)
10. **Given** a search with no matches, **when** it applies, **then** "No transactions found." shows and there is no Pagination nav. (FR-016)
11. **Given** 10 or fewer matching rows, **when** the component renders, **then** one page button shows and Prev and Next are both disabled. (FR-013, FR-014)
12. **Given** the Overview Transactions card, **when** it renders, **then** it has a "See Details" link with `href="/transactions"`. (FR-017)
13. **Given** an Overview transaction dated 2024-08-19, **when** it renders, **then** it shows "19 Aug 2024". (FR-018)
14. **Given** a viewport under 768px wide, **when** `/transactions` renders, **then** there is no horizontal scroll, and each row shows its category and date under the name. This is checked manually in the recording. (NFR-003)

## Must not

- Must not modify `data/finance.json`, `lib/types.ts` shapes, `.github/ci-demo.yml`, or `.github/workflows/`.
- Must not add dependencies.
- Must not change Overview beyond FR-017 and FR-018.
- Must not hardcode hex colors or introduce new design tokens.
- Must not add a second currency formatter. Sign handling wraps `formatCurrency`.

## Clarifications

Answered at Gate 1 by U0BM4GCCCLE ("All approved"), so the recommended option (a) applies to each: 1a, 2a, 3a, 4a.

- **Q1. Related ticket scope.**
  - (a) Include JOSH-17 pagination. JOSH-18 seed data, JOSH-11 avatars, and JOSH-12 mobile are follow-ups.
  - (b) As (a), plus JOSH-18, so the live page shows multiple pages.
  - (c) JOSH-4 only, with no pagination.
- **Q2. Overview date format.**
  - (a) Switch Overview to Figma's "19 Aug 2024" so both pages match.
  - (b) Keep Overview's "Aug 19, 2024". Only Transactions uses the Figma format.
- **Q3. Filter state.**
  - (a) Local React state, which resets on refresh.
  - (b) URL query params (`?q=&sort=&category=&page=`), which makes views shareable and back-button friendly.
- **Q4. Dropdowns.**
  - (a) Native `<select>` styled to the tokens. This is accessible for free, though the open menu uses the OS look.
  - (b) A custom listbox that matches Figma's open state exactly. This means more code and hand-rolled keyboard/ARIA support.

## Log

- 2026-09-30. Status: Draft. Spec drafted from JOSH-4, JOSH-17, and Figma `101:364`. Approver U0BM4GCCCLE chose a fresh build on JOSH-4 (https://cursor-solutions.slack.com/archives/C0BFU03CWD8/p1790775146559869). Critic and verifier subagent model: inherit.
- 2026-09-30. Status: Draft. spec-critic review (independent, model inherit) returned 2 blockers and 5 majors. Facts resolved in the spec: date locale, currency format, table collapse, sort semantics, test fixtures, and scope leaks. Product decisions moved to Q1–Q4.
- 2026-09-30. Status: Spec approved. Gate 1 approved by U0BM4GCCCLE (https://cursor-solutions.slack.com/archives/C0BFU03CWD8/p1790775715806389), with the recommended answers 1a, 2a, 3a, 4a. Scope: JOSH-4 + JOSH-17. Follow-ups: JOSH-18, JOSH-11, JOSH-12.
