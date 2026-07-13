# Emburse demo checklist

Pre-call runbook for the live walkthrough in
[Emburse_Demo_Outline.md](Emburse_Demo_Outline.md). The outline is the talk
track; this file is the go/no-go list.

**Branch:** `July_16_Bugbot_CloudAgent`  
**PR base:** `UI-refactor` (not `main` — keeps the diff to demo commits only)

---

## Must be true before the call

### Repo and Bugbot

- [ ] This repo is open in Cursor with Bugbot enabled on GitHub
- [ ] `July_16_Bugbot_CloudAgent` is checked out and pushed
- [ ] Root [`.cursor/BUGBOT.md`](../.cursor/BUGBOT.md) and nested
      [`backend/.cursor/BUGBOT.md`](../backend/.cursor/BUGBOT.md) are in the
      branch
- [ ] Planted issues live in
      [`backend/lib/transactionSync.ts`](../backend/lib/transactionSync.ts)
      (hardcoded secret + unbounded retry)

### Bugbot dashboard

- [ ] Bugbot dashboard open in a browser tab
- [ ] At least one **Team Rule** ready to show
- [ ] One **scoped-path rule** for `backend/**` (outline says `src/api/**` —
      use this repo's path and say that aloud)
- [ ] Know merge order: Team Rules → repo rules → BUGBOT.md → user rules

### Autofix and Cloud Agents

- [ ] Autofix enabled, set to **new branch** mode (not PR branch)
- [ ] On-demand usage pricing enabled; storage on (not Legacy Privacy Mode)
- [ ] Tab open to [cursor.com/agents](https://cursor.com/agents)
- [ ] Pre-staged completed Cloud Agent run in Agents history (fallback if live
      Autofix stalls)

### Optional (Phase 5)

- [ ] Public Slack channel connected
- [ ] Send to Slack tool or automation ready for notify-and-trigger demo

### Branch protection

- [ ] `Cursor Bugbot` check required before merge
- [ ] Fail-on-unresolved enabled for high-severity findings (if demoing blocking)

### Fallbacks

- [ ] Know manual triggers: comment `bugbot run` or `cursor review` on the PR;
      add `verbose=true` for logs
- [ ] Previously merged example PR URL on hand (finished loop fallback)
- [ ] Screenshot or Agents history of a completed Autofix run

---

## Live click path (maps to outline phases)

| Phase | Time | What to do |
| --- | --- | --- |
| **0 — Guardrails** | 2 min | Open `.cursor/BUGBOT.md` → `backend/.cursor/BUGBOT.md` → dashboard Team Rules + scoped `backend/**` rule. Mention `@cursor remember [fact]` on PRs. |
| **1 — Local review** | 3 min | Small Agent edit in `backend/`. Run **Agent Review**, then `/review-bugbot`. Note patch-ID skip on PR open. |
| **2 — PR review** | 2 min | Push branch, open PR → `UI-refactor`. Show Bugbot inline comments + `Cursor Bugbot` check. |
| **3 — Fix paths** | 4 min | **Fix in Cursor** (comment link) → **Fix in Web** (Agents) → show **Autofix** setting (new branch). |
| **4 — Loop closes** | 3 min | Agents window: plan, diff, new branch. Bugbot re-review + `npm test`. Human approves. |
| **5 — Automations** | 3 min | `/automate` or cursor.com/automations. Show full auto / notify-trigger / risk-tiered. Team Owned billing. |
| **6 — Merge** | 1 min | Resolved comments, passing check, approve and merge. Cite review-time saved. |

**Through line:** the developer never leaves Cursor. A finding becomes a fix
becomes a merged PR, with a human at the gate.

---

## Dry-run validation (run once before the call)

1. [ ] `npm test` passes (planted bugs are untested — CI stays green)
2. [ ] `npm run lint` passes
3. [ ] Agent Review + `/review-bugbot` on branch diff flags secret + retry
4. [ ] PR opened `July_16_Bugbot_CloudAgent` → `UI-refactor`; Bugbot comments
       appear (or `bugbot run` works)
5. [ ] "Open in Cursor" link from a Bugbot comment works
6. [ ] Agents deep link from "Fix in Web" works
7. [ ] Timed full run-through: ~15–18 min

---

## Prereqs if asked

- Autofix requires on-demand usage pricing and storage on (not Legacy Privacy
  Mode)
- Autofix uses the team's default agent model
- `/review-bugbot` and `/automate` require Cursor 3.7+; CLI support coming

## What stays out of repo

These are configured in Cursor/GitHub/Slack, not in this codebase:

- Enabling Bugbot and Autofix in the dashboard
- Team Rules and scoped-path rules in Bugbot settings
- Slack automation wiring
- GitHub branch-protection UI
