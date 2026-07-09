# Session Log: Intentional XSS sink for Security review demo

- **Date:** 2026-07-09
- **Author:** Josh Jones
- **Related PR / branch:** auth
- **Issue / ticket:** n/a (demo)

## Problem / goal

Re-introduce a small, deliberately-introduced, low-risk security vulnerability
on the `auth` branch so Cursor's Security review feature can detect it during
a demo. This is not intended to ship to production.

## Approach

- Render transaction merchant names in `TransactionsPreview` via React's
  `dangerouslySetInnerHTML` instead of escaped JSX text.
- This creates a classic XSS sink: any HTML in `tx.name` would be injected into
  the DOM unescaped.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Hardcoded fake secret/API key | Noisier and less representative of real code patterns |
| `Math.random()` for tokens | Weaker, less universally recognized finding |
| `dangerouslySetInnerHTML` XSS sink | Textbook finding; easy for Security review to flag |

## Key decisions & tradeoffs

- **Decision:** Use `dangerouslySetInnerHTML` on `tx.name`. — **Tradeoff:**
  Introduces a real (if low-severity) XSS vector. Risk is low because data
  comes only from trusted static `data/finance.json` with no user input.

## Follow-ups / known gaps

- [ ] Do NOT merge to main — revert after the Security review demo.
