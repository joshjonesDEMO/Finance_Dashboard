# Emburse x Cursor: In-Cursor Demo Flow
### Review to resolution, shown live in the product

This is the hands-on companion to `docs/Emburse_Presentation.html`. The deck frames the story; this walks one change through it inside Cursor. Run it as a live demo, driving Cursor and one pull request while you narrate.

**Related:** deck talk track in [`Emburse_Presentation_Talk_Track.md`](Emburse_Presentation_Talk_Track.md)

**What to have ready before the call**
- A sample repo open in Cursor with Bugbot enabled on it
- A feature branch that contains one or two intentional issues (an unbounded retry loop, a missing null check, a hardcoded secret)
- A tab open to cursor.com/agents (the Agents window)
- The Bugbot dashboard open in a browser tab
- A connected public Slack channel if you want to show the notify-and-trigger step

**The through line to repeat:** a finding is investigated, fixed in the editor or on the web, and lands as a merged PR — with a human at the gate.

---

## Deck slide map

Use this to stay aligned with the presentation while you demo.

| Deck slide | Topic | Demo phase |
| --- | --- | --- |
| 1 | Title | — |
| 2 | Agenda | Open with the three invite topics |
| 3 | The bottleneck | Set context before Phase 2 |
| 4 | Emburse metrics | Reference ~1,600 PRs/week when Bugbot comments appear |
| 5 | Bugbot in the Cursor workflow | Phases 1–2 (local review → PR review → CI check) |
| 6 | Bugbot best practices | Phase 0 (rules and BUGBOT.md) |
| 7 | Three ways to resolve | Phase 3 (Fix in Cursor, Fix in Web, Autofix) |
| 8 | Cloud Agents: investigate and fix | Phases 3–4 (investigation, async Agents window, PR delivery) |
| 9 | Autonomous review loop | Phase 4 (Detect → Resolve → Verify → Approve) |
| 10 | Automation levels | Phase 5 |
| 11–14 | Guardrails, rollout, next steps | Close after Phase 6 |

---

## Phase 0. Set the guardrails once (2 min)

**Deck:** slide 6 (Bugbot best practices)

Goal: show that quality standards live in the repo and are enforced automatically, not tribal knowledge.

1. In the repo, open `.cursor/BUGBOT.md`. Show a short root file with Emburse standards (for example: require tests for backend changes, flag dynamic execution, no hardcoded secrets).
2. Show a nested `backend/.cursor/BUGBOT.md` and explain that Bugbot pulls the root file plus any file it finds walking up from the changed code.
3. In the Bugbot dashboard, show Team Rules and one scoped-path rule (for example `src/api/**`). Mention the merge order: Team Rules, repo rules, BUGBOT.md, user rules.
4. Note that you can teach Bugbot inline by commenting `@cursor remember [fact]` on any PR, and it becomes a learned rule.

Say: "This is the setup layer you haven't tuned yet. Once these are in, every review across every repo enforces the same bar."

---

## Phase 1. Catch it before the PR, in the editor (3 min)

**Deck:** slide 5, step 01 (Local — review before you push)

Goal: show the loop starts locally, so fewer issues even reach review.

**Branch:** `July_16_Bugbot_CloudAgent` → `UI-refactor` (see
[`Emburse_Demo_Checklist.md`](Emburse_Demo_Checklist.md)). The branch already
includes planted issues in `backend/lib/transactionSync.ts` (hardcoded bearer
token + unbounded retry). The live edit below **adds to** that module — do not
fix those bugs yet; that is Phases 3–4.

### Best live change (recommended)

Add API response validation to the existing sync module. Realistic for Emburse,
fast (~2–4 min agent time), and keeps the planted secret/retry in the diff so
Bugbot has rich findings to work with in Phases 2–4.

**Agent prompt:**

> Add a `validateTransactionBatch` helper in `backend/lib/transactionSync.ts`
> that checks each batch has an `id`, positive `amount`, and non-empty
> `merchant`. Call it in `fetchTransactionBatch` before returning. This is prep
> for Emburse expense ingest — don't wire it into the Next.js app yet.

**Why this change**

| Criterion | How it lands |
| --- | --- |
| Interesting | Real integration work — validating untrusted API payloads |
| Fast | One helper + a few lines in `fetchTransactionBatch` |
| Bugbot-rich | Planted secret and retry stay in the diff; nested `backend/.cursor/BUGBOT.md` can flag missing tests for the new validation path |
| On-narrative | Matches Phase 0 guardrails (secrets, bounded retries, validate before use) |
| Safe | Avoids `lib/format.ts` / `lib/data.ts` — bugs there fail CI and upstage Bugbot |

**Alternative (richer findings):** ask Agent to add Vitest tests for the happy
path only (“don't change the retry logic yet”). Bugbot can then flag the secret,
unbounded retry, *and* incomplete retry/backoff test coverage.

**Avoid during the demo:** full Transactions page (too slow), fixing
`lib/insights.ts` (different story), “fix all issues” in Phase 1 (kills later
phases), or wiring sync into the app via an API route (extra scope, same
Bugbot payoff).

**One-liner for the audience:** “We're adding Emburse expense sync validation —
the kind of small integration change that ships hundreds of times a week, and
exactly where secrets and retry logic tend to slip through.”

### Steps

1. Run the prompt above (or the test alternative) in Agent (Composer) on
   `backend/lib/transactionSync.ts`.
2. Run **Agent Review** on your local changes to get a dedicated review of the diff before you push.
3. Run the `/review-bugbot` skill in the agent to run the same Bugbot analysis locally against your branch. Point out it reviews your branch changes against the base branch.
4. Call out the sync behavior: `/review-bugbot` stores the patch ID of the reviewed diff, so when you open the PR with the same diff, Bugbot recognizes it and skips a duplicate review.

Say: "Best case, the issue is fixed before a reviewer ever sees it. Same engine, run from inside the editor."

---

## Phase 2. Open the PR, Bugbot reviews automatically (2 min)

**Deck:** slides 4–5, steps 02–03 (GitHub review + CI check)

Goal: show detection with no manual trigger.

1. Push the branch and open the PR (or use one that is pre-staged with issues that were not caught locally).
2. Show Bugbot posting inline comments with an explanation and a fix suggestion for each finding.
3. Show the `Cursor Bugbot` check on the PR. Explain branch protection: require this check, and enable fail-on-unresolved so high-severity findings actually block merge (findings default to neutral otherwise).

Say: "This is what already happens on about 1,600 of your PRs a week. Detection is working — the question is what happens next."

---

## Phase 3. Three ways to resolve a finding (4 min)

**Deck:** slides 7–8 (Three ways to resolve + Cloud Agents investigate and fix)

Goal: show escalating autonomy on the same finding, with investigation before the fix.

1. **Fix in Cursor** — click the link on a Bugbot comment to open the issue directly in the editor, let Agent propose the fix, review the diff, accept.
2. **Fix in Web** — click through to cursor.com/agents. Show the Cloud Agent **investigate** the finding: read context, form a plan, and work the fix in the background while you watch the Agents window.
3. **Autofix** — show the Bugbot Autofix setting. When enabled, Bugbot spawns a Cloud Agent automatically, investigates the issue, pushes the fix to a new branch, and comments the result back on the PR.

Point out the recommended posture: Autofix to a **new branch**, not the PR branch, so nothing merges unreviewed. Existing-branch mode is capped at 3 attempts to prevent loops.

Say: "Same finding, three levels of hands-on. The agent investigates first, then proposes the fix — in the editor, on the web, or automatically."

---

## Phase 4. Watch the loop close (3 min)

**Deck:** slides 8–9 (Cloud Agents + autonomous review loop)

Goal: show the full async cycle in the Agents window and how the fix returns via PR.

1. Open cursor.com/agents and show the Cloud Agent run: its investigation, plan, and the diff it produced.
2. Show the fix landing on a new branch and Bugbot re-reviewing that change.
3. Show the test suite running against the fix.
4. Land on the human step: the engineer reviews the agent's branch, approves, and merges.

The visible loop: **Detect (Bugbot) → Resolve (Cloud Agent investigates and fixes) → Verify (re-review plus tests) → Approve (human merges).**

---

## Phase 5. Automate the trigger to match their appetite (3 min)

**Deck:** slide 10 (Choosing your automation level)

Goal: show they control when the loop fires.

1. Run the `/automate` skill and describe the workflow in plain language, or open cursor.com/automations.
2. Show the trigger options that map to their appetite:
   - **Full auto-fix:** Autofix enabled for all findings on chosen repos.
   - **Notify and trigger:** a Slack trigger (new message or emoji reaction) plus the Send to Slack tool. Bugbot posts findings to a channel, and a person kicks off the agent on demand.
   - **Risk-tiered (recommended start):** low-risk findings autofix to a new branch, medium and high are flagged for a human.
3. Show the permission scope. Set to Team Owned so runs bill to the team pool under a shared service account.

Say: "Start risk-tiered. Expand what auto-fixes as trust builds. Every one of these is a toggle, not a rebuild."

---

## Phase 6. Approve and merge (1 min)

**Deck:** slides 11–14 (guardrails, rollout, next steps)

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
