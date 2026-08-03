# Session Log: Soft overview demo bug for cloud agents

- **Date:** 2026-08-03
- **Author:** joshjonesDEMO
- **Related PR / branch:** `8_4_Cloud&Automations`
- **Issue / ticket:** n/a (demo setup)

## Problem / goal

Need a reproducible Overview regression for a cloud-agents demo: the page should still load (nav + widget chrome) while data is obviously wrong, so an agent can be tasked to find and restore the real finance payload.

## Approach

- Corrupt the payload in `getFinanceData()` (empty transactions/bills, NaN money fields, `"Error"` labels) instead of throwing.
- Teach `formatCurrency` to render `"###"` for non-finite amounts so widgets never crash on NaN.
- Leave overview components and `finance.json` untouched so the natural fix is restoring `getFinanceData()` to return the JSON as-is.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Hard throw / typo that crashes `/` | Too severe — hides nav and widgets; less readable on stage |
| Break individual overview components | Harder for an agent to spot one choke point; more files to clean up |
| Flip `.github/ci-demo.yml` fail flags | CI-only signal; does not produce the visual soft failure |

## Key decisions & tradeoffs

- **Decision:** Soft-corrupt at `getFinanceData` + `formatCurrency` guard — **Tradeoff:** Vitest stays green (fixtures bypass live data); demo signal is visual/runtime, not a red unit suite.
- **Decision:** Keep real `finance.json` import — **Tradeoff:** Bug is obvious in `lib/data.ts`, which is the intended agent target.

## Follow-ups / known gaps

- [ ] After the demo, revert `getFinanceData()` (and optionally keep the non-finite `formatCurrency` guard as hardening).
- [ ] Budget rows all use category `"Error"`, so React keys collide — acceptable for the demo, not for production.
