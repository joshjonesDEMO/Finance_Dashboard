# Emburse x Cursor: Presentation Talk Track

High-level presenter guide for `[Emburse_Presentation.html](Emburse_Presentation.html)` (14 slides).

**Companion docs**

- Live demo: `[Emburse_Demo_Outline.md](Emburse_Demo_Outline.md)`
- Pre-call checklist: `[Emburse_Demo_Checklist.md](Emburse_Demo_Checklist.md)`

**Suggested session shape:** ~20 min deck (slides 1–10) → ~15 min live demo → ~5 min close (slides 11–14)

**Through line:** Detection is already working at Emburse. The opportunity is closing the loop — investigate a finding, fix it in the editor or on the web, land it via PR, with a human at the gate.

---



## Slide 1 — Title (~30 sec)

**On screen:** Emburse and Cursor · *From detection to resolution: closing the PR review loop*

**Say**

- Welcome the Emburse engineering team.
- Today: how Bugbot and Cloud Agents work together to move from *finding* issues to *resolving* them — without removing human judgment.

**Transition:** Walk through the agenda, then frame the problem.

---



## Slide 2 — Agenda (~1 min)

**On screen:** Three topics matching the session invite.

**Say**

1. **How Bugbot fits into the Cursor workflow** — where review runs, from the editor to GitHub.
2. **Best practices** — how to tune signal vs. noise before you automate.
3. **How Cloud Agents act on findings** — in the web or via PRs, asynchronously.

**Transition:** "Let's start with why this matters for your team right now."

---



## Slide 3 — The bottleneck (~2 min)

**On screen:** PR review is where velocity stalls.

**Say**

- Emburse ships faster with Agent; review capacity hasn't scaled the same way.
- Bugbot is already doing real work — roughly **1,600 PRs a week** — catching bugs, security issues, and quality problems.
- The friction isn't detection; it's the handoff: someone still has to open the finding, fix it, and shepherd re-review.
- **The gap:** turning a comment into a merged fix without a manual relay.

**Transition:** "Here's what that looks like in your numbers."

---



## Slide 4 — Emburse metrics (~1 min)

**On screen:** ~1,600 PRs/week · 3 finding categories · Manual resolution today.

**Say**

- **Detection is working** — Bugbot runs on every PR automatically.
- Findings span **bugs, security, and code quality**, posted inline where engineers already work.
- **Resolution is still manual** — that's the lever we're closing today.

**Transition:** "Same engine runs in three places in your workflow."

**Demo hook:** Reference these stats again when Bugbot comments appear live (Phase 2).

---



## Slide 5 — Bugbot in the Cursor workflow (~3 min)

**On screen:** Local → GitHub → CI

**Say**


| Step          | Key point                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| **01 Local**  | Run **Agent Review** or `/review-bugbot` on your branch diff *before* push. Same analysis engine as PR review. |
| **02 GitHub** | On PR open, Bugbot posts inline comments with explanation and fix suggestions — no manual trigger.             |
| **03 CI**     | The `Cursor Bugbot` check plus branch protection can block merge on unresolved high-severity findings.         |


- One engine, three surfaces: catch issues earlier, enforce them at merge time.

**Transition:** "Before we automate fixes, tune what Bugbot looks for."

**Demo hook:** Phases 1–2 in the demo outline.

---



## Slide 6 — Bugbot best practices (~3 min)

**On screen:** Six practice areas.

**Say** (hit the high-signal items; don't read every card)

- **Team rules + BUGBOT.md** — encode Emburse standards once; every repo inherits them. Nested `BUGBOT.md` files apply by path.
- **Learned rules** — Bugbot improves from PR history; teach inline with `@cursor remember [fact]`.
- **Effort levels** — more reasoning on critical paths, lean elsewhere.
- **Incremental review** — only new changes since the last pass; less noise on active PRs.
- **Branch protection** — require the Bugbot check; fail on unresolved highs.
- **Scoped paths** — target backend, API, or frontend rules separately.

**Frame:** "Get more signal, less noise — *then* turn on Autofix."

**Transition:** "Once Bugbot finds something, you have three ways to resolve it."

**Demo hook:** Phase 0 (guardrails walkthrough).

---



## Slide 7 — Three ways to resolve a finding (~3 min)

**On screen:** Fix in Cursor · Fix in Web · Autofix

**Say**

- **Same finding, escalating autonomy** — you choose how hands-on to be.
- **Fix in Cursor** — click the Bugbot comment link; Agent proposes the fix in the editor; you accept.
- **Fix in Web** — open `cursor.com/agents`; Cloud Agent investigates in the background while you watch plan and diff.
- **Autofix** — Bugbot spawns a Cloud Agent automatically, pushes to a **new branch**, posts results back on the original PR.

**Emphasize:** Recommended posture is Autofix to a **new branch**, not the PR branch — nothing merges unreviewed.

**Transition:** "Under the hood, Cloud Agents do more than apply a patch."

**Demo hook:** Phase 3.

---



## Slide 8 — Cloud Agents: investigate and fix (~2 min)

**On screen:** Investigate · async · deliver via PR · human at the gate

**Say**

- Cloud Agents **investigate** first — read the finding, trace context, propose a targeted fix.
- They work **async** in the Agents window at `cursor.com/agents` — the developer isn't blocked.
- They **deliver via PR** — open or update a branch and comment back on the original PR.
- A **human still approves and merges** — automation assists; it doesn't bypass review.

**Transition:** "Those pieces form a repeatable loop."

**Demo hook:** Phases 3–4 (Agents window).

---



## Slide 9 — The autonomous review loop (~2 min)

**On screen:** Detect → Resolve → Verify → Approve

**Say**


| Step        | What happens                                                                |
| ----------- | --------------------------------------------------------------------------- |
| **Detect**  | Bugbot reviews the PR; flags bugs, security, and quality issues.            |
| **Resolve** | Cloud Agent investigates and fixes; pushes to a new branch; updates the PR. |
| **Verify**  | Fix re-enters Bugbot review and your test suite.                            |
| **Approve** | Engineer reviews the agent branch and merges.                               |


**Repeat the through line:** Finding → investigated fix → verified → human merge.

**Transition:** "You control how much of that loop runs automatically."

**Demo hook:** Phase 4 (watch the loop close).

---



## Slide 10 — Choosing your automation level (~3 min)

**On screen:** Full auto-fix · Notify and trigger · Risk-tiered (recommended)

**Say** (advance fragments if presenting live; all three show in print)

- **Full auto-fix** — every finding autofixes; fastest, least oversight; best for low-risk repos.
- **Notify and trigger** — Slack or Teams alert; team kicks off the agent on demand; human stays in control.
- **Risk-tiered (recommended start)** — low-risk autofixes to a new branch; medium and high flagged for a human.

**Recommend:** Start risk-tiered on 2–3 pilot repos; expand as trust builds. Every level is a dashboard toggle.

**Transition:** "A few guardrails make this safe at org scale."

**Demo hook:** Phase 5 (automations).

---

## Slide 11 — Guardrails (~2 min)

**On screen:** Built for scale

**Say**

- Start conservative; expand as trust builds — every control is a **dashboard toggle**.
- Autofix lands on a **new branch**, not the PR branch.
- **Branch protection** requires the Bugbot check before merge.
- **Team rules and scoped paths** enforce org standards automatically.
- **Auto-retry capped at 3** attempts to prevent fix loops.

**Transition:** "Here's a practical rollout path."

---



## Slide 12 — Phased rollout (~2 min)

**On screen:** Tune → Assist → Automate

**Say**


| Phase           | Focus                                                         |
| --------------- | ------------------------------------------------------------- |
| **1: Tune**     | Bugbot deep dive, team rules, `BUGBOT.md`, branch protection. |
| **2: Assist**   | Autofix to new branch, Slack notifications, pilot 2–3 repos.  |
| **3: Automate** | Risk-tiered autofix, expand repos, measure review time saved. |


**Frame:** Crawl, walk, run — match automation to confidence.

**Transition:** Pause on the core message.

---



## Slide 13 — Statement (~30 sec)

**On screen:** *Move from finding issues to resolving them, without taking humans out of the decision.*

**Say**

- Read the line; let it land. Don't over-explain.
- This is the outcome: faster resolution, same engineering judgment.

**Transition:** "Concrete next steps for Emburse."

---



## Slide 14 — Next steps (~2 min)

**On screen:** Six action items + doc links

**Say** (pick what to commit to on the call)

1. **Pick pilot repos** for Autofix.
2. **Add team rules and** `BUGBOT.md` to those repos.
3. **Enable branch protection** with the Bugbot check.
4. **Agree on a starting automation level** — recommend risk-tiered — and wire a Slack trigger if using notify-and-trigger.
5. **Tune Cloud Agent runs** with skills, rules, and environment setup.
6. **Define success:** review time saved per PR.

**Close**

- Point to doc links on slide.
- Offer Q&A.
- If demo ran: reference the PR/branch the audience just saw.

---

