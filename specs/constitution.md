# Finance Dashboard constitution

- **Status:** Draft
- **Sources:** `AGENTS.md`, `.cursor/rules/*.mdc`, `.cursor/skills/*/SKILL.md`, `.github/workflows/ci.yml`, `.github/pull_request_template.md`

These are the non-negotiable rules every spec, plan, and change in this repo is checked against.

## Architecture

1. **Static data only.** All app data comes from `data/finance.json` via `lib/data.ts`. No APIs, databases, auth backends, or runtime data generators.
2. **Next.js 16 App Router.** Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/`, and follow any deprecation notices there over prior knowledge.
3. **Types live in `lib/types.ts`.** Do not change the shape of `FinanceData` or its members without a spec that says so.
4. **Server by default.** Pages are Server Components. Add `"use client"` only to the smallest component that needs state or browser APIs.

## Design

5. **Figma is the design source.** The file is `rJb9XS7DMeIaTRYtpH1RuK` (personal-finance-app) unless a ticket gives an explicit other URL. Implement from `get_design_context` on the cited frame, and reuse Design System (`182:285`) tokens.
6. **Use existing tokens.** Colors come from `app/globals.css` (`--color-*`) and `lib/theme.ts`. Type comes from `text-preset-*` utilities. Do not hardcode hex values or invent new tokens.
7. **Reuse before creating.** Extend existing components (`components/ui/*`, `lib/format.ts`) rather than duplicating them.

## Quality

8. **Verification is `npm run lint`, `npm run test`, and `npm run build`.** All three must pass locally before review, and CI runs the same three.
9. **Test behavior, not wiring.** Vitest + Testing Library under `tests/`. Cover business rules, sorting/filtering/date math, and regressions. Don't test constants or framework glue.
10. **Never edit `.github/ci-demo.yml` or `.github/workflows/` to make CI pass.**
11. **Comments explain only non-obvious why.** No narration, and no ticket/Slack links in code.

## Process

12. **Jira is project JOSH** on fe-anysphere-demo.atlassian.net. Never JOS or any other project.
13. **Git identity is joshjonesDEMO.** Never push to `main`, never force-push, never merge from an agent.
14. **Every non-trivial change ships a session log** in `docs/sessionLogs/` (copied from `TEMPLATE.md`) in the same PR, and the PR uses `.github/pull_request_template.md`.
15. **Specs ship with code.** `specs/<feature-id>/` lives in the same PR as the implementation.

## Log

- 2026-09-30. Status: Draft. Drafted from AGENTS.md, rules, skills, and CI for JOSH-4 (first Full-track feature).
