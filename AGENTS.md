<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a self-contained Next.js 16 finance dashboard with no external services or databases — all data is static JSON in `data/finance.json`.

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `npm ci` (or `npm install`) |
| Dev server | `npm run dev` (webpack, port 3000) |
| Lint | `npm run lint` (ESLint flat config) |
| Test | `npm run test` (Vitest, jsdom) |
| Build | `npm run build` (uses Turbopack) |

### Notes

- Node.js 22 is already the default in this environment; no nvm step is needed. The update script runs `npm ci` against the committed `package-lock.json` (leaves a clean git tree; `npm install` also works but rewrites a benign `libc` diff into the lockfile).
- `npm run dev` runs the webpack dev server (starts in ~250ms); `npm run dev:turbo` uses Turbopack. No environment variables or `.env` files are needed. Sentry is opt-in via `npm run dev:sentry`.
- Overview (`/`) and Transactions (`/transactions`) have real content from `data/finance.json`. Other sidebar pages (Budgets, Pots, Recurring Bills) are placeholders.
- Tests are Vitest + Testing Library under `tests/` (run with `npm run test`, watch with `npm run test:watch`).
- GitHub Actions CI (`.github/workflows/ci.yml`) runs `lint`, `test`, and `build` on every PR. Demo pass/fail overrides live in `.github/ci-demo.yml`.
