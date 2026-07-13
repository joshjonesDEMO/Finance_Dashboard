# Emburse x Cursor: In-Cursor Demo Flow
### Review to resolution, shown live in the product

This is the hands-on companion to the deck. The deck explains the loop; this walks one change through it inside Cursor, following the review-and-resolution phase of the SDLC end to end. Run it as a live demo, driving Cursor and one pull request while you narrate.

**What to have ready before the call**
- A sample repo open in Cursor with Bugbot enabled on it
- A feature branch that contains one or two intentional issues (an unbounded retry loop, a missing null check, a hardcoded secret)
- A tab open to cursor.com/agents (the Agents window)
- The Bugbot dashboard open in a browser tab
- A connected public Slack channel if you want to show the notify-and-trigger step

**The through line to repeat:** the developer never leaves Cursor. A finding becomes a fix becomes a merged PR, with a human at the gate.

---

## Phase 0. Set the guardrails once (2 min)

Goal: show that quality standards live in the repo and are enforced automatically, not tribal knowledge.

1. In the repo, open `.cursor/BUGBOT.md`. Show a short root file with Emburse standards (for example: require tests for backend changes, flag dynamic execution, no hardcoded secrets).
2. Show a nested `backend/.cursor/BUGBOT.md` and explain that Bugbot pulls the root file plus any file it finds walking up from the changed code.
3. In the Bugbot dashboard, show Team Rules and one scoped-path rule (for example `src/api/**`). Mention the merge order: Team Rules, repo rules, BUGBOT.md, user rules.
4. Note that you can teach Bugbot inline by commenting `@cursor remember [fact]` on any PR, and it becomes a learned rule.

Say: "This is the setup layer you haven't tuned yet. Once these are in, every review across every repo enforces the same bar."

---

## Phase 1. Catch it before the PR, in the editor (3 min)

Goal: show the loop starts locally, so fewer issues even reach review.

1. Make a small change in the editor with Agent (Composer). Keep it realistic for their stack.
2. Run **Agent Review** on your local changes to get a dedicated review of the diff before you push.
3. Run the `/review-bugbot` skill in the agent to run the same Bugbot analysis locally against your branch. Point out it reviews your branch changes against the base branch.
4. Call out the sync behavior: `/review-bugbot` stores the patch ID of the reviewed diff, so when you open the PR with the same diff, Bugbot recognizes it and skips a duplicate review.

Say: "Best case, the issue is fixed before a reviewer ever sees it. Same engine, run from inside the editor."

---

## Phase 2. Open the PR, Bugbot reviews automatically (2 min)

Goal: show detection with no manual trigger.

1. Push the branch and open the PR (or use one that is pre-staged with issues that were not caught locally).
2. Show Bugbot posting inline comments with an explanation and a fix suggestion for each finding.
3. Show the `Cursor Bugbot` check on the PR. Explain branch protection: require this check, and enable fail-on-unresolved so high-severity findings actually block merge (findings default to neutral otherwise).

Say: "This is what already happens on about 1,600 of your PRs a week. The question is what happens next."

---

## Phase 3. From finding to fix, without leaving Cursor (4 min)

Goal: show the three ways to resolve a finding, escalating in autonomy.

1. **Fix in Cursor** — click the link on a Bugbot comment to open the issue directly in the editor, let Agent propose the fix, review the diff, accept.
2. **Fix in Web** — click through to cursor.com/agents to have a Cloud Agent take the same finding and work it in the background.
3. **Autofix** — show the Bugbot Autofix setting. When enabled, Bugbot spawns a Cloud Agent automatically, pushes the fix to a new branch, and comments the result back on the PR.

Point out the recommended posture: Autofix to a **new branch**, not the PR branch, so nothing merges unreviewed. Existing-branch mode is capped at 3 attempts to prevent loops.

Say: "Same finding, three levels of hands-on. You choose how much the human does versus how much the agent does."

---

## Phase 4. Watch the loop close (3 min)

Goal: show the full autonomous cycle in the Agents window.

1. Open cursor.com/agents and show the Cloud Agent that Autofix spawned, its plan, and the diff it produced.
2. Show the fix landing on a new branch and Bugbot re-reviewing that change.
3. Show the test suite running against the fix.
4. Land on the human step: the engineer reviews the agent's branch, approves, and merges.

The visible loop: **Detect (Bugbot) to Resolve (Cloud Agent) to Verify (re-review plus tests) to Approve (human merges).**

---

## Phase 5. Automate the trigger to match their appetite (3 min)

Goal: show they control when the loop fires, tied to the three automation levels from the deck.

1. Run the `/automate` skill and describe the workflow in plain language, or open cursor.com/automations.
2. Show the trigger options that map to their appetite:
   - **Full auto-fix:** Autofix enabled for all findings on chosen repos.
   - **Notify and trigger:** a Slack trigger (new message or emoji reaction) plus the Send to Slack tool. Bugbot posts findings to a channel, and a person kicks off the agent on demand.
   - **Risk-tiered (recommended start):** low-risk findings autofix to a new branch, medium and high are flagged for a human.
3. Show the permission scope. Set to Team Owned so runs bill to the team pool under a shared service account.

Say: "Start risk-tiered. Expand what auto-fixes as trust builds. Every one of these is a toggle, not a rebuild."

---

## Phase 6. Approve and merge (1 min)

1. Back on the PR, show the resolved Bugbot comments and the passing check.
2. Approve and merge.
3. Note the outcome to measure: review time saved per PR, and reviewer hours returned to feature work.

---

## Prereqs to name if asked
- Autofix requires on-demand usage pricing enabled and storage on (not Legacy Privacy Mode).
- Autofix uses the team's default agent model.
- `/review-bugbot` and `/review` are available in Cursor 3.7+ and at cursor.com/agents; CLI support is coming.
- Bugbot MCP support is available on Team and Enterprise plans.

## Fallbacks if something misbehaves live
- If a Bugbot review does not appear, comment `bugbot run` or `cursor review` on the PR to trigger it manually; add `verbose=true` for logs.
- If the Cloud Agent stalls, show the pre-staged completed run in the Agents window instead of waiting.
- Keep a merged example PR on hand so you can show a finished loop even if the live one runs long.