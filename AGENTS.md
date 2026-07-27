<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a self-contained Next.js 16 finance dashboard with no external services or databases — all data is static JSON in `data/finance.json`.

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (webpack, port 3000) |
| Lint | `npm run lint` (ESLint flat config) |
| Test | `npm test` (Vitest + jsdom) |
| Build | `npm run build` (Turbopack) |

### Notes

- Node.js 22 LTS is used (managed via nvm). The update script handles `npm install`.
- `npm run dev` runs Next.js with `--webpack` and starts very quickly (~300ms). `npm run dev:turbo` uses Turbopack instead. No environment variables or `.env` files are needed for normal development.
- Sentry is opt-in only: it is aliased to a no-op unless `ENABLE_SENTRY=true`/`NEXT_PUBLIC_ENABLE_SENTRY=true` (or production). Use `npm run dev:sentry` to exercise it; a real DSN is needed for events to actually send.
- Tests are Vitest with jsdom (`tests/**/*.test.{ts,tsx}`); run them with `npm test` (one-off) or `npm run test:watch`.
- Only the Overview page (`/`) has real content; other sidebar pages (Transactions, Budgets, Pots, Recurring Bills) are placeholders.
