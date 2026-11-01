I'll start by internalizing the operating instructions and setting up the workspace. This is a complex multi-phase task, so let me create a structured plan first.
Workspace has been reset. Cloning the repository now.
Repo cloned and clean on `main`. Now let me review the project structure and key documentation.
Repo cloned. Let me check file sizes first, then read the key documentation files.
The lines are very long. Let me use bash to read the files in manageable chunks.
Now let me read CLAUDE.md and README.md.
Now the Project Architecture Document:
Now let me read the SKILL.md, session logs, and remediation plan.
Now the session logs and remediation plan:
Let me check the worklog tail and the skills catalog.
Current state understood: WH-42 shipped at `0a277e5`, and `954a42d` is the operator's session-log push. This round is **WH-43**. Let me verify what the latest commit contains and check the skills catalog.
Let me read the key skills the user pointed to. First, sizes:
Key skills internalized. Now let me set up the environment. First, check package.json and configs:
Census MATCH. Now validating standing blocks on the tree (Tailwind v4 pins, configs, sitemap/SEO, db-path):
All standing blocks verified. Running the baseline gate — fast signals first:
Known first-run gap: chromium-1248 needed. Installing:
**FULL BASELINE GATE GREEN**: lint 0/0 · tsc 0 · unit 371/371 · build OK · smoke 14/14 · e2e 72/72 · census MATCH. Running bun audit, then starting the parity work:
Now the audit phase. Let me examine the recent WH-42 changes and audit the codebase against the skill contracts:
Now let me start the dev server and run the watch round + parity battery against the reference. First, checking the scripts:
**Watch round 32: the DOUBLE-AXIS move AGAIN** — css `DsYCKxwV` → `CapATpwD` (the FIFTH css content change) + js `qi2AnSYN` → `a8mtclnh` (the SIXTEENTH bundle). The same-run digest read **15/15 MATCH** — the rendered face held. Now running the standing parity battery (the eight scripts):
First-flight PROBE-ERROR (the lesson-45 class) — re-running immediately per doctrine:
Transient closed — 20/20 MATCH. Continuing the battery:
**THE STANDING BATTERY AT FULL WIDTH — ALL EIGHT LEGS GREEN** (login 34/34 · moodForm 20/20 · shell/drawer 61/61 · dashboard 105/105 · headers 192/192 · toolbars 98/98 · kpis 315/315 · routines 697/697 — **1,522 computed members live-vs-live**). Now the neo-crm sibling recheck and the watch ledger re-base:
neo-crm sibling confirmed at **v1.204.0, unchanged**. Now the round's core: the watch ledger re-base + the NINTH surface (Learning tutorial-card family, the WH-42 plan's preferred candidate). Let me study our source first:
Now let me study the parity script pattern (the kpis precedent) before writing the decode probe:
Battery complete. Now a focused audit pass on the WH-42 changes (Mode C discipline), plus the mobile-nav spec explicitly (the instruction's emphasis):
Audit of recent changes is clean (reorder + trim pinned, battery green). Now the round's core — the **NINTH SURFACE decode** (Learning tutorial-card family). Writing the scratch decode probe per the decode-first doctrine:
The reference read ZERO cards — the login budget's edge (lesson 46): ~9-10 reference logins spent in the window by the battery. Verifying the rate-limit hypothesis before anything else:
The reference's login needs browser-level verification, so curl can't test the limiter. Per lesson 45/46: the battery spent the window — the decode must wait for the 15-min slide. Using the wait productively — checking the capture-round script and drafting the plan:
Still zero cards after the window slid — reproduced twice, so this is now a real probe finding to isolate (Mode B). Writing a debug chain:
The page loads fine — 12 imgs, 14 buttons. The decode's `aria-label` anchor is wrong: that's OUR a11y superset; the reference anchors by text. Fixing the anchor (lesson 27: the decoder must match the reference's vocabulary):
The decode now reads 12 cards both sides — with **REAL findings**: the tutorial GRID ORDER differs (the WH-42 lesson-41 class again), plus `dur: null` on the reference (duration chips?) and `searchPlaceholder: null`. Investigating the two probe-vocabulary questions before concluding:
The verification settles it — **probe-vocabulary bugs in my decoder, not app drift**: the reference's duration chip and chips are **DIVs** (mine looked for spans — lesson 27's element-tag vocabulary class), and its search input is `type="text"` (mine required `type="search"`). Also visible: the reference's card 1 is "The Power of Tiny Habits" with duration **16:30** — the ORDER differs. Fixing the decoder and re-running:
Now OUR side tripped its own login limiter (lesson 46 — `you@example.com` = we landed on the login wall; 11 local logins in the window). The cure: dev-server restart, never an app change:
Both sides read fully now. The decode settles: **one REAL drift — the tutorial GRID ORDER** (the WH-42 lesson-41 class again) — plus all-known serialization classes. Note: my `dur` finder picked the overlay (first absolute child), not the duration chip — will fix in the committed script. Let me compare our seed's tutorial order against the decoded reference order:
Let me verify what our OptionChip renders (to confirm the chips comparison story):
No chip diffs appeared despite differing per-position categories — I need to see the actual chips arrays. Focused check:
Both sides read EMPTY — a systematic probe bug. Debugging the actual DOM structure:
**Root cause found** — the CSS blockification rule: chips and buttons inside flex containers compute `display: flex`, not `inline-flex` (flex items are blockified) — my filter could never match. Also revealed: our duration chip is a **span**, the reference's a **div** (the lesson-27 tag-vocabulary class), and this reference flight hit the login wall again (budget). Fixing the decoder with structural anchors:
While the reference login window cools, let me examine the watch ledger for the re-base and prepare the TDD pin:
Let me check the e2e learning leg for positional pickers (the WH-42 lesson):
e2e learning leg is text-based, order-independent. Now writing the WH-43 remediation plan:
Plan written. Now **WP-1: the TDD order cure — RED first**. Let me study the existing grid-order contract pattern:
Now writing the RED pin (the tutorials grid-order contract):
**RED confirmed.** Now GREEN — the surgical seed reorder (the WH-42 precedent):
**GREEN.** Reseed + census:
The reorder broke the seed syntax — let me inspect and fix:
Found it — my script matched the `[` in the type annotation `SeedTutorial[]` instead of the array literal. Restoring and redoing with the correct anchor:
Minor formatting drift (a blank line after `[`) — fixing to match the original shape exactly:
**WP-1 complete** (RED→GREEN, census MATCH). Now the count ladder 371→372 — finding the canonical + every doc site:
Now the count-ladder lockstep update (371→372, every site in the same commit). First checking the §8.1 row arithmetic:
Arithmetic checks out (109+93+165+5=372). Applying the lockstep updates:
**372/372 GREEN.** Now WP-2: the consolidated reference flight — extending the decoder with the F-4 probes (input type + cancel button + studyresources), batched into ONE flight per the lesson-47 pacing:
The order cure is **VERIFIED live** — every data member now matches per-position; only the 4 known serialization classes remain. Let me see the F-4 probe results (the tail):
All 12 cards: exactly the 4 known classes, zero data drift. Now the F-4 cancel-button question needs only OUR side (the reference's type=text never renders one) — probing our dev server alone:
The pseudo-element read is inconclusive via getComputedStyle (a known Chromium quirk), but Chromium's documented behavior is clear: `type=search` renders a clear ✕ with content, `type=text` never does — and it also maps to `searchbox` vs `textbox` in the a11y tree. **F-4 verdict: a REAL interaction-state difference → CURE** (the WH-20 class). First let me study the parity-routines script conventions for the ninth surface:
Now writing the committed **ninth surface** — `scripts/parity-tutorials.mjs`:
The born-flight needs the F-4 cure in place first. TDD: the RED pin — let me check the src-census structure for the natural home:
Now the F-4 RED pin — the search-input census in src-census:
**RED confirmed.** Now GREEN — flipping both sites:
The `strip` helper is block-scoped. Fixing with an inline read:
**GREEN 48/48.** Now the parity-tutorials **born-flight** (the first flight must read all-MATCH):
**BORN-VERIFIED: 790/790 MATCH, exit 0** — the ninth surface lands born-quiet, and at 790 members it's the net's NEW widest surface. Two more stability flights (the ×3 precedent):
**790/790 ×3 consecutive — the ninth surface is born-verified stable.** Now WP-3: the watch ledger re-base on both axes:
The born-verify fired the SEVENTEENTH bundle (the intra-round class, fifth consecutive round). Checking the digest, then re-basing once to the final read:
15/15 MATCH on the seventeenth bundle. Re-basing once to the final read + born-verify:
**WP-3 complete** — ledger born-verified on the quiet state. One final parity-tutorials flight on the round's final asset state (the kpis precedent):
**790/790 on the final state.** Now WP-5: the docs ladder. Starting with PAD §11:
Now the SKILL ladder (v1.40.0 → v1.41.0 + LESSON 47 + the parity row):
Lockstep GREEN. Now the worklog WH-43 entry:
I left a messy line in the worklog and need to recheck the count arithmetic — the src-census pin also added a test. Verifying:
True count is **373** — my earlier 372 updates predate the src-census pin. Fixing all sites to 373 (+ the infra row 165→166):
Now the plan's execution record and the session log:
Now the capture round (WP-6) — fresh seed, then the fourteenth cross-round byte comparison:
30/34 byte-stable, FOUR movers. Root-causing each before the re-base — quantifying the two standing signatures:
All four root-caused: two deliberate (the order cure: 10-learning + 30-tutorial-card-hover at ~0.32% each) + two standing signatures (25 at 77px/maxΔ5 verbatim; 29 at 5px/maxΔ1). Re-basing the ledger:
The regex had a double-space bug. Fixing:
**Ledger verified 0 mismatches.** Now the FULL GATE re-run on the final tree:
**FULL GATE GREEN**: lint 0/0 · tsc 0 · unit 373/373 · build OK · smoke 14/14 · e2e 72/72 · census MATCH · audit zero. Now the session log + scratch cleanup (WP-7):
Tree is clean. Now the commit — first the SSH push runbook:
No ssh binary and no paramiko — deploying the Appendix A shim. First install paramiko and read the shim:
Shim deployed. Now the commit (Conventional Commits with the WH-43 narrative):
Committed `7cd412c`. Now the SSH-wrapper push — materializing the key (outside the repo, 0600):
Dry-run authenticated. Real push:
**WH-43 is fully delivered** — committed `7cd412c`, pushed and verified (remote `main` == local HEAD, key + shim shredded, main branch only, no new branches).

**The round**: the baseline gate reproduced the WH-42 ship state exactly (371/371 · 72/72 · audit zero); watch round 32 caught the reference's fifth CSS content change + a sixteenth, then seventeenth, JS bundle — with the same-run digest and the full 8-leg battery (**1,522 computed members**) proving the rendered face held. The round's core: the parity net's **ninth surface** (`parity-tutorials.mjs`, 790 members — the new widest), whose decode caught two real drifts — the reference **re-ordered its tutorial grid** and our search inputs rendered `type="search"` where the reference uses `type="text"` (a Chromium clear-button interaction gap). Both cured TDD-style (RED→GREEN), born-verified 790/790 ×3, mobile drawer battery green throughout, and the full gate passed on the final tree (373/373 · 72/72 · census MATCH).

**Suggested next** (WH-44): split the now nine-script battery across two login windows; the tenth-surface candidates are the Profile appearance panels or the empty-states family; and the cooling policy still awaits two consecutive stable asset reads.
