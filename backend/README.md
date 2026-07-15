# Backend (demo module)

This directory exists for the Emburse x Cursor live demo. It is **not** wired
into the Next.js app.

## Intentional planted issues

`backend/lib/transactionSync.ts` contains two deliberate issues for Bugbot to
catch during the demo:

1. **Hardcoded secret** — inline API bearer token in `fetchTransactionBatch`
2. **Unbounded retry loop** — `while (true)` in `syncTransactionsWithRetry`

Do not fix these during the live walkthrough. See
`docs/sessionLogs/2026-07-13-emburse-demo-readiness.md` for context.
