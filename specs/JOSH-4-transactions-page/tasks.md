# Tasks: JOSH-4 Transactions page

- **Plan:** [plan.md](./plan.md)
- **Status:** Approved

Legend: `[ ]` todo, `[x]` done (its check passed), `[?]` blocked on a spec/plan question, `[!]` escalated.

Each task is test first: write or extend its tests, watch them fail, implement, then run its verification.

- [x] **T1. Shared formatters**
  - Files: `lib/format.ts`, `tests/lib/format.test.ts`
  - Covers: FR-004, FR-005
  - Depends on: none
  - Verify: `npx vitest run tests/lib/format.test.ts`
- [x] **T2. List logic**
  - Files: `lib/transactions.ts`, `tests/lib/transactions.test.ts`
  - Covers: FR-006–FR-012, NFR-004
  - Depends on: none
  - Verify: `npx vitest run tests/lib/transactions.test.ts`
- [x] **T3. Move `TransactionAvatar`; update Overview preview**
  - Files: `components/transactions/TransactionAvatar.tsx`, `components/overview/TransactionsPreview.tsx`, `tests/components/TransactionsPreview.test.tsx`
  - Covers: FR-003, FR-017, FR-018
  - Depends on: T1
  - Verify: `npx vitest run tests/components/TransactionsPreview.test.tsx`
- [x] **T4. Pagination component**
  - Files: `components/transactions/Pagination.tsx`, `tests/components/Pagination.test.tsx`
  - Covers: FR-013, FR-014, NFR-002
  - Depends on: none
  - Verify: `npx vitest run tests/components/Pagination.test.tsx`
- [ ] **T5. `TransactionsView` client component**
  - Files: `components/transactions/TransactionsView.tsx`, `tests/components/TransactionsView.test.tsx`
  - Covers: FR-002–FR-016, NFR-001–NFR-003
  - Depends on: T1–T4
  - Verify: `npx vitest run tests/components/TransactionsView.test.tsx`
- [ ] **T6. Wire the page**
  - Files: `app/transactions/page.tsx`
  - Covers: FR-001, FR-002
  - Depends on: T5
  - Verify: `npm run build` prerenders `/transactions`, and the page is checked in the dev server
- [ ] **T7. Full verification and evidence**
  - Files: `specs/JOSH-4-transactions-page/*`, `docs/sessionLogs/2026-09-30-transactions-page.md`
  - Covers: NFR-005, AC 1 and 14
  - Depends on: T1–T6
  - Verify:
    - `npm run lint`, `npm run test`, and `npm run build` all pass.
    - Screen recording saved.
    - spec-verifier run.

## Coverage

| Requirement | Task(s) |
| --- | --- |
| FR-001 | T6 |
| FR-002 | T5, T6 |
| FR-003 | T3, T5 |
| FR-004, FR-005 | T1 (T5 renders) |
| FR-006–FR-012 | T2 (T5 wires) |
| FR-013, FR-014 | T4, T5 |
| FR-015, FR-016 | T5 |
| FR-017, FR-018 | T3 |
| NFR-001, NFR-003 | T5 |
| NFR-002 | T4, T5 |
| NFR-004 | T2 |
| NFR-005 | T7 |

Every task covers at least one requirement, and every requirement has at least one task.

## Log

- 2026-09-30. Status: Draft. Tasks drafted with the plan.
- 2026-09-30. Status: Approved. Gate 3 approved by U0BM4GCCCLE (https://cursor-solutions.slack.com/archives/C0BFU03CWD8/p1790777211249139).
