---
name: figma-fin-design
description: "Figma defaults for the finance-dashboard app — ALWAYS load this skill when working in this repo and the user mentions Figma at all (design, mockup, screen, component, or a figma.com URL). Visual tokens/styles come from docs/cursor-design-system.html first; this skill covers the personal-finance-app Figma file (key rJb9XS7DMeIaTRYtpH1RuK) for layout and screens — never ask which file, and never guess a different one. Applies to the Figma MCP tools (get_design_context, get_screenshot, get_metadata, use_figma, search_design_system, generate_figma_design) and Figma skills (figma-use, figma-generate-design, figma-generate-library, figma-code-connect)."
---

# Figma conventions for finance-dashboard

## The only file to use

This codebase's UI is built from a single Figma file, **personal-finance-app** (file key `rJb9XS7DMeIaTRYtpH1RuK`). Never search for, open, or reference a different Figma file from this repo unless the user explicitly provides another `figma.com` URL for that turn.

## Key nodes

| Reference | node-id (URL form) | nodeId (MCP form) | URL |
|-----------|--------------------|--------------------|-----|
| Desktop - Home | `101-2` | `101:2` | https://www.figma.com/design/rJb9XS7DMeIaTRYtpH1RuK/personal-finance-app?node-id=101-2 |
| Design System | `182-285` | `182:285` | https://www.figma.com/design/rJb9XS7DMeIaTRYtpH1RuK/personal-finance-app?node-id=182-285 |

Convert `-` to `:` in the node-id when calling MCP tools (e.g. `get_design_context`, `get_metadata`).

## Priority vs Cursor design system

**`docs/cursor-design-system.html` (Cursor Design System v3) is the UI source of truth** and takes priority over this Figma file for tokens, type, spacing, radii, accent usage, and visual rules. Use Figma for screen layout/structure and product-specific composition. When Figma and the Cursor doc conflict, follow the Cursor doc. See `.cursor/rules/cursor-design-system.mdc`.

## Rules

1. Default `fileKey` for every Figma MCP call in this repo is `rJb9XS7DMeIaTRYtpH1RuK`. Don't prompt the user to choose a file — it's always this one.
2. If the user references "the design", "the mockup", "the app design", or "Home" without a URL, use the Desktop - Home node (`101:2`).
3. If the user references "the design system", "tokens", "components", or "styles" without a URL, prefer `docs/cursor-design-system.html` first; use the Figma Design System node (`182:285`) only for product-screen specifics not covered by that doc.
4. Before implementing UI from this Figma file, call `get_design_context` on the relevant node, then reconcile styles against `docs/cursor-design-system.html` (not only the Figma Design System node).
5. Follow the standard Figma MCP workflow rules: always load `figma-use` before any `use_figma` call, and `figma-generate-design` when translating a full page/screen from this file into code.
6. If the user explicitly gives a different Figma URL, follow it for that turn only — don't change the repo default for subsequent turns.

## Quick reference

| Action | Default |
|--------|---------|
| File key | `rJb9XS7DMeIaTRYtpH1RuK` |
| File name | `personal-finance-app` |
| Home screen node | `101:2` |
| Design system node | `182:285` |

## Example MCP calls

Reading the Home screen:

```json
{ "fileKey": "rJb9XS7DMeIaTRYtpH1RuK", "nodeId": "101:2" }
```

Reading the design system:

```json
{ "fileKey": "rJb9XS7DMeIaTRYtpH1RuK", "nodeId": "182:285" }
```
