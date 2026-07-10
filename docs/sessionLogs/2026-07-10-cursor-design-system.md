# Session Log: Add Cursor design system doc

- **Date:** 2026-07-10
- **Author:** Agent
- **Related PR / branch:** `UI-refactor`
- **Issue / ticket:** —

## Problem / goal

Bring the Cursor brand design system into the finance-dashboard repo as the UI source of truth so UI work on this branch follows shared tokens, type, and component guidance — and so it clearly outranks the older Figma personal-finance-app design system when they conflict.

## Approach

- Copied the design system HTML into `docs/cursor-design-system.html`.
- Replaced that file with **v3** (`cursor-design-system-v3.html`) as the new source of truth.
- Encoded priority in `.cursor/rules/cursor-design-system.mdc` (always apply), `AGENTS.md`, and the Figma skill so agents prefer the Cursor doc over Figma tokens/styles.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Put under `.cursor/` only | Less discoverable for humans reviewing the repo; `docs/` is the existing home for project documentation |
| Keep Figma design system as equal authority | User designated v3 as source of truth that should take priority |
| Convert to Markdown/CSS tokens immediately | Land the reference first; token extraction follows when applying the system in code |

## Key decisions & tradeoffs

- **Decision:** Keep a single path `docs/cursor-design-system.html` (overwrite with v3; no `v3` suffix in-repo) — **Tradeoff:** No side-by-side archive of the prior HTML in git history until committed; history will show the replace.
- **Decision:** Cursor design system beats Figma for visual tokens/rules; Figma remains for screen layout — **Tradeoff:** Agents must reconcile two sources instead of blindly copying Figma styles.
- **Decision:** Always-on Cursor rule for design-system priority — **Tradeoff:** Slightly more always-context, but avoids silent Figma-first regressions on UI work.

## Follow-ups / known gaps

- [ ] Map tokens from the doc into the app’s CSS / Tailwind theme when the UI refactor starts
- [ ] Reconcile existing Overview UI toward v3 tokens where it still follows Figma-only values
