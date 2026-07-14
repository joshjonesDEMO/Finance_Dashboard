# Emburse — Finance Dashboard review standards

Bugbot applies these rules on every pull request in this repository. They encode
how we ship expense, balance, and transaction UI safely — not tribal knowledge
passed in Slack.

Merge order when multiple rule sources apply: **Team Rules → repository rules →
this file (and nested `**/BUGBOT.md`) → user rules**.

---

## Security (blocking)

Treat this product as money-adjacent. Prefer false positives over silent risk.

- **No hardcoded secrets.** Flag API keys, bearer tokens, webhook secrets, and
  service credentials committed in source. Require `process.env` (or a secrets
  manager) for anything that authenticates to Emburse or third-party APIs.
- **No dynamic code execution.** Flag `eval`, `new Function`, and
  `vm.runInContext` / similar. There is no approved use of these in this app.
- **Do not log credentials or PII.** Flag logging of Authorization headers,
  tokens, full card numbers, or raw expense payloads.
- **XSS and unsafe HTML.** Flag `dangerouslySetInnerHTML` and unescaped HTML
  from user or API data unless the sink is clearly sanitized and justified.

## Money and data correctness (blocking)

Incorrect math here is a product bug, not a polish issue.

- **Savings, rates, and balances** must use the documented denominator and
  sign conventions (e.g. savings rate = net / income, not expenses). Flag
  inverted ratios and off-by-one list slices that change what users see.
- **Currency display** must go through shared formatters in `lib/format.ts`
  (or an equivalent shared helper). Do not invent ad-hoc `$` string math in
  components.
- **Nullable API / sync payloads** must be validated before field access.
  Assume network and vendor responses can be missing or partial.

## Backend and integrations (`backend/**`)

Outbound sync and API client code is higher trust.

- Changes under `backend/` **must** add or update Vitest coverage for new
  behavior. Flag backend diffs with no corresponding test changes.
- Retry / polling around network calls **must** be bounded (max attempts +
  backoff). Flag unbounded `while (true)` or recursive retry with no ceiling.
- Nested rules in `backend/.cursor/BUGBOT.md` apply when those paths change;
  do not weaken them in favor of this root file.

## Frontend quality (non-blocking unless security/money)

- Prefer existing overview/shell components and design tokens from
  `docs/cursor-design-system.html` over one-off styling.
- New exported helpers in `lib/` should document inputs, outputs, and failure
  modes (JSDoc is fine).
- Prefer extending covered modules (`lib/data.ts`, `lib/format.ts`, tested
  components) carefully — regressions there fail CI and user trust together.

## Process

- Non-trivial PRs should include a session log under `docs/sessionLogs/` that
  captures goal, approach, and tradeoffs (no secrets in the log).
- Prefer small, reviewable diffs. Flag drive-by refactors unrelated to the PR
  title when they obscure the real change.
