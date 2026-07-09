# Session Log: Figma conventions skill for finance-dashboard (consolidated)

- **Date:** 2026-07-09
- **Author:** Cursor Agent
- **Related PR / branch:** dev
- **Issue / ticket:** (none)

## Problem / goal

The Figma MCP has no way to know which Figma file/nodes this repo's design is
based on, so every Figma question would require the user to re-paste links or
the agent to guess/search. Add a project skill that pins the canonical file
and nodes, mirroring the existing `jira-fin-board` skill pattern.

## Approach

- Initially created `.cursor/skills/figma-finance-dashboard-design/SKILL.md`
  on this branch, parsing the two user-provided Figma URLs to get the file
  key (`rJb9XS7DMeIaTRYtpH1RuK`) and node IDs (`101-2` → `101:2` "Desktop -
  Home", `182-285` → `182:285` "Design System").
- Discovered a near-duplicate skill, `.cursor/skills/figma-fin-design/`,
  already existed and was committed on `dev` (from a separate session) with
  the same file key/nodes but slightly different structure (it included an
  explicit URL-form vs. MCP-form node-id conversion table).
- Compared both and consolidated into a single skill, keeping the
  `figma-fin-design` name/structure and merging in the unique value from the
  other draft: the `figma-generate-diagram` prerequisite reminder and the
  note (from `AGENTS.md`) that only the Overview page has real implemented
  content, so other sidebar pages may not have a matching Figma frame yet.
- Deleted `.cursor/skills/figma-finance-dashboard-design/` entirely to avoid
  having two skills compete/conflict on the same trigger conditions.

## Alternatives considered

| Option | Why not chosen |
| --- | --- |
| Keep both skills | Two skills with overlapping "always load on any Figma mention" triggers and slightly different rules would be confusing and redundant. |
| Keep `figma-finance-dashboard-design`, delete `figma-fin-design` | User explicitly asked to standardize on the `figma-fin-design` name/location. |

## Key decisions & tradeoffs

- **Decision:** Standardize on `figma-fin-design` as the single source of truth — **Tradeoff:** none meaningful; it was already the version committed on `dev`.
- **Decision:** Merge in the "Overview page is the only real page" note and the `figma-generate-diagram` prerequisite rule — **Tradeoff:** slightly longer skill file, but avoids losing useful context that was only in the duplicate.

## Follow-ups / known gaps

- [ ] If sidebar placeholder pages (Transactions, Budgets, Pots, Recurring Bills) get designed in Figma later, add their node IDs to `figma-fin-design/SKILL.md`.
- [ ] No automated check that the referenced node IDs still exist in the Figma file — verify manually if the design file is restructured.
