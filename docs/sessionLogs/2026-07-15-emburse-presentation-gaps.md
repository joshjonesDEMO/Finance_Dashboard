# Session Log: Emburse presentation agenda alignment

- **Date:** 2026-07-15
- **Author:** Josh Jones
- **Related PR / branch:** `July_16_Bugbot_CloudAgent`
- **Issue / ticket:** n/a (demo prep)

## Problem / goal

The Emburse session invite promised three topics: Bugbot in the Cursor workflow,
best practices, and Cloud Agents acting on findings in the web or via PRs. The
deck agenda and content skewed toward rollout/implementation and underplayed
workflow mechanics, investigation, and the web path. Align the deck and demo
outline without adding a dedicated example-use-cases slide.

## Approach

- Replaced slide 2 agenda with the three invite topics verbatim.
- Added slide 4 (Emburse metrics) using existing `.cards` styles.
- Added slide 5 (Bugbot in the Cursor workflow): local → GitHub → CI.
- Added slide 7 (Three ways to resolve): Fix in Cursor, Fix in Web, Autofix.
- Added slide 8 (Cloud Agents: investigate and fix): investigation, async, PR delivery.
- Updated autonomous loop step 2 to "investigates and fixes."
- Rewrote `Emburse_Demo_Outline.md` with a deck slide map and phase cross-references.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Add example use cases slide | User explicitly skipped (fix 3) |
| Remove rollout/guardrails slides | Still useful for Emburse implementation conversation |
| Keep old internal agenda + add invite slide | Would duplicate and confuse attendees |

## Key decisions & tradeoffs

- **Decision:** Keep rollout slides (10–14) after new content — **Tradeoff:** longer deck (14 slides) but preserves implementation guidance.
- **Decision:** Demo outline through-line now mentions web path, not only "never leaves Cursor" — **Tradeoff:** more accurate to product, slightly less punchy tagline.

## Follow-ups / known gaps

- [ ] Dry-run presenter flow with new slide order before the call
- [x] Add `Emburse_Presentation_Talk_Track.md` for deck-only narration
