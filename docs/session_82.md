Clone successful — we're on `main`. I can see WH-40 and a WH-41 audit commit already in history. Let me set up a TODO plan and review the docs to understand the current state.
Now reviewing the session records and remediation plan (reading session_79, session_80, the session41 plan, and the tail of worklog).
session_79/80 confirm WH-41 shipped at `5e981a5` — so this round is **WH-42**. Reading the session41 plan and worklog tail next.
WH-41 plan reviewed — this round is **WH-42**. The suggested next: (a) full-width battery (watch round 31 + seven parity scripts), (b) cooldown watch, (c) eighth surface candidate (Routines `ROUTINE_VIDEO_CARD` family preferred — data-independent), (d) standing blocks recheck. Now reviewing core docs.
AGENTS.md fully internalized. Now CLAUDE.md and README.md.
Now checking the PAD structure and SKILL version/lessons (tail sections).
SKILL v1.39.0 with lesson 45 confirmed — docs match the WH-41 ship. Now validating the tree: scripts, tests, package.json, and standing blocks.
Tree matches documented state. Checking the skills catalog for relevant skills.
Now validating standing blocks on the tree: Tailwind v4 pins, vitest/playwright configs, sitemap/SEO surface, db-path.
All standing blocks verified. Setting up the environment now (bun install, .env, db push/seed, census).
Environment rebuilt — census MATCH (moods=1). Running the baseline gate in stages (lint → tsc → unit first).
Smoke 14/14. Now e2e — checking the Playwright chromium version first (known first-run gap).
**FULL BASELINE GATE GREEN** — lint 0/0 · tsc 0 · unit 369/369 · build OK · smoke 14/14 · e2e 72/72. Running bun audit, then starting the dev server for the parity battery.
Dev server up. Running **watch round 31** — with FULL output capture this time (the lesson-45 sibling rule).
**Watch round 31: ANOTHER DOUBLE-AXIS move** — css `T8A-IXoy` → `DsYCKxwV` (the FOURTH css content change) + js `6yfO0HkE` → `BH_eVSe7` (the FOURTEENTH bundle). The same-run digest read **15/15 MATCH** on the new assets — the rendered face held. Full output captured per lesson-45.

Now the seven parity companions at full width (7 reference logins — with the watch's 1, that's 8/10 budget).
PROBE-ERROR on parity-moodform PASS B — the lesson-45 class (first-flight transient). Per doctrine: reproduce before curing. Re-running.
Transient did NOT reproduce — **20/20 MATCH ×2 re-runs** (closed as probe infrastructure per lesson 45, no app change). Login budget: 9/10 used after the remaining five. Continuing the battery.
**THE STANDING BATTERY AT FULL WIDTH — ALL SEVEN LEGS GREEN on the new assets**: login 34/34 (7th) · moodForm 20/20 (8th, transient closed) · shell 61/61 (6th) · dashboard 105/105 (6th) · headers 192/192 (5th) · toolbars 98/98 (3rd) · kpis 315/315 (4th) — **825 computed members live-vs-live, zero manual evals**. The rendered face byte-held through the double-axis move.

Now **F-1: the watch ledger re-base on BOTH axes**, then the eighth-surface work.
Ledger re-based (born-verify comes later, paced for the login budget). Now scoping the **EIGHTH SURFACE** — the Routines template-card family (`ROUTINE_VIDEO_CARD`). Reading our source first.
The routines card anatomy is fully mapped in our source. Now studying the parity-kpis script as the precedent for the eighth surface (the anchor + normalization patterns).
The kpis pattern is clear. Let me check how the watch anchors its routines probe (the existing partial coverage), then write the scratch decode probe.
The watch anchors routines cards via `main .rounded-xl.border` (reference-only). Before writing the scratch decode probe, let me check the seeded-card record in page-layout for the exact documented card face.
Full anatomy mapped. Writing the scratch decode probe now (decode-first doctrine — one login per app, zero-write).
The anchor climbed one level too far — the captured "card" is a wrapper (first child 304×552 = the real card). Let me inspect the saved output to compare both apps' DOM shapes.
The members read per-card correctly but the card-level anchor climbed too far. Debugging the ancestor chain directly.
**KEY DECODE FINDING**: the reference wraps each card in an anonymous block div inside the grid (ours puts the card directly in the grid) — same pixels, different trees (the lesson-27 DOM-shape class). Also the ref card base carries `border bg-card text-card-foreground` before `border-none`. The anchor must be the **12px-radius element**, not the grid child. Fixing the probe.
The reference read is complete and rich — but OUR pass read 0 cards: **our dev app's own login rate limiter (10/15min) tripped** after 10 local logins. Also spotted: the reference's benefit rows read `rgb(55, 65, 81)` (gray-700) with NO span check — a potential drift family. Restarting the dev server (resets the per-process limiter) and probing the benefits family closely.
**MAJOR DECODE FINDING — a REAL data drift**: the reference's card #1 benefit row reads "✓ **Boosts energy**" vs our seed's "✓ **Increases energy**" — the reference's seed CONTENT has changed (the active-development cadence). The DOM shapes differ harmlessly (an extra wrapper div — same pixels). Dumping our seed to enumerate the full data diff.
**CRITICAL FINDING — the template GRID ORDER differs!** The reference re-ordered its 11 templates: ref starts [10-Min Home Workout, 5-Min Morning Energizer, ...] vs our [5-Min Morning Energizer, 10-Min Home Workout, ...], plus swaps at positions 4-5 and a reshuffled video block. The 552 vs 546px "height diff" was just the order swap (different cards at position 1). Checking how our API orders templates before deciding the cure.
The API orders by `sortOrder` — so the cure is a seed sortOrder update. Checking the seed's assignment scheme.
The cure is a seed sortOrder re-order. Checking what the seed-parity test pins (names set vs order) before writing the plan.
The e2e finds templates by text (position-independent) — the order cure won't break it, and no test pins order. Now re-running the full decode (our side was rate-limited before).
Both apps read 11 cards — same set. Now a proper structured comparison: order diff + member-by-member (matched by title).
**THE DECODE IS COMPLETE — verdict**:
- **ONE REAL DRIFT: the template grid ORDER** (confirmed on two consecutive reads)
- **ONE NEW serialization class**: `overlayBg` — our v4 `oklab(0 0 0 / 0.4)` vs the ref's `rgba(0, 0, 0, 0.4)` (the lesson-40 alpha form)
- The `benefits.rowColor` "drift" was my scratch selector bug (matched the label/tip-label on each side — the close-up proved both apps' rows are identical `text-gray-600` + green-500 ✓)
- Two DOM-shape differences (wrapper divs) — same pixels, no cure, document only

Now checking the seed keys, the e2e family-B picker, and the docs-counts canonical before writing the plan.
The e2e is order-independent. Now the docs-counts canonical structure for the count update planning.
All checks complete — the e2e and watch are order-independent, the docs-counts canonical structure is understood. Writing the **WH-42 remediation plan** now.
Plan written. **WP-0 validated** (sortOrder scheme, API orderBy, text-based e2e finders, docs-counts canonical — all checked above). Now **WP-1: the TDD order cure** — RED first.
**RED confirmed** — the pin fails exactly as expected. Now **GREEN**: reordering the seed array. Reading the full ROUTINE_TEMPLATES block first.
The blocks are large — doing the reorder with a script (parse blocks, re-sequence, renumber sortOrder).
Reorder landed. **GREEN check** now.
**GREEN + census MATCH.** Now the docs-counts lockstep: unit count moves 369 → 370. Confirming the new total first.
**370/370.** Now the lockstep: updating the canonical + every doc site in this commit. Finding all 369 sites first.
Updating all count sites 369 → 370 + the §8.1 row (2 → 3 checks).
The pin caught a missed PAD site. Finding it.
**WP-1 complete** (RED→GREEN, census MATCH, lockstep green at 370). Now **WP-2: writing `scripts/parity-routines.mjs`** — the eighth surface.
**Born-flight 1: 691/697 — SIX REAL DRIFTS, one family**: the reference now renders only THREE benefit rows on the six video templates (ours render four — the 4th row dropped in the reference's content re-authoring, the same edit class as the order change). Checking for existing benefits pins before the cure.
The censuses pin renderer forms only — no data pins break. **TDD: RED first** — adding the benefits contract to the seed-parity suite.
**RED confirmed.** Now **GREEN** — trimming the six 4th benefits.
**GREEN — 4/4.** Reseeding and updating the count ladder to 371.
No leftovers, pin green at 371. Now **parity-routines born-verification flight 2** (the cured tree).
**BORN-VERIFIED 697/697.** Two more stability flights (the ×3 precedent).
**697/697 ×3 consecutive.** The eighth surface is born-verified stable — the net's widest (697 members). Now **WP-3: the watch ledger born-verification** on the quiet state.
**ANOTHER intra-round move — the FIFTEENTH bundle** (`BH_eVSe7` → `qi2AnSYN`) fired during the born-verification. Digest 15/15 MATCH on the new bundle. Re-basing the ledger once to the round's final read (the WH-40/41 doctrine).
**Ledger born-verified on the quiet state** — assets stable + 15/15. One final routines-parity flight on the round's final asset state (the kpis precedent).
697/697 on the final state. **WP-4: the neo-crm sibling recheck.**
**WP-4 ✓** — sibling unchanged at v1.204.0. Now **WP-5: the docs ladder**. Starting with PAD §11.
Appending the WH-42 records to PAD §11 — the watch row first, then the three new rows.
Watch row updated. Now the three new §11 rows after the WH-41 rows.
PAD §11 done. Now the AGENTS.md watch note — round 31 + the eight-script battery.
AGENTS.md done. Now the SKILL ladder: version bump, the parity row, and LESSON 46.
Lockstep green. Now the worklog WH-42 entry (newest-first).
Prepending the WH-42 entry to the worklog.
Worklog done. Now the plan's execution record.
Now **WP-6: the capture round** — the thirteenth cross-round byte comparison.
**30/34 byte-stable, FOUR movers.** Root-causing each before any re-base — checking #28's picker first, then quantifying 25 (the standing signature).
Capture 28 uses a positional `.first()` picker — the first card changed with the order cure, so the modal content moved (same deliberate-cause class as 03/18). Now quantifying mover 25 (the standing sub-visible signature).
**25 = the standing signature verbatim** (77px/0.0067%/maxΔ5). All four movers root-caused. Re-basing the capture ledger with the documented causes.
Ledger re-based, 0 mismatches. Now the **full gate re-run on the final tree**.
**E2E failure** — the routines schedule test. Investigating (this is likely my order cure interacting with the test).
The test used a positional `.first()` picker but asserted the old first template's name — order-dependence the cure exposed. Reading the full test to fix the picker properly.
The gate caught a real order-dependent picker in the sibling leg (my WP-0 check missed it — the (q) leg was text-based but this one wasn't). Fixing it with the (q) leg's text-scoped pattern.
The filter coerced my locator to a string. Comparing with the (q) leg's exact working pattern.
The (q) leg uses `has:`, not `hasText:`. Fixing.
16/16. Full e2e suite re-run for the gate.
The (p) leg failed — the video-card family. Getting the failure detail.
The (p) leg's order pin fired exactly as designed — the guard catching the deliberate order cure. Updating the pin to the new reference order.
The aria-label pin follows the first video card too. Updating with the same note.
**FULL GATE GREEN: lint 0/0 · tsc 0 · unit 371/371 · build OK · smoke 14/14 · e2e 72/72 · census MATCH · audit zero.** Updating the plan's execution record with the e2e pin updates, then the session log.
Now writing `docs/session_81.md` (the round's session log, per the established format).
Session log written. **WP-7: scratch cleanup + commit.**
Tree clean. Final strict check — lint + typecheck after the e2e edits (the last full gate's lint predates them).
**Final tree fully green.** Committing.
Committed `0a277e5`. Now the SSH-wrapper push — reading the runbook first.
I need the full shim code from Appendix A. Let me extract the whole Python block and save it. Let me view the rest of the shim. Deploying the shim + materializing the key.
Dry-run authenticated. Real push now.
**Pushed and verified** — remote main @ `0a277e5` == local HEAD. Shredding the key and doing the final check.
**PUSHED AND VERIFIED** — the remote main is at `0a277e5` == local HEAD, the tracking ref synced, the wrapper's temp key shredded. Now:
1. Shred the operator key (/tmp/wh-deploy.key) ✓
2. Final git status check ✓ (clean tree, on main, HEAD = 0a277e5)

The WH-42 round is fully delivered. Let me do a final line-by-line check of the user's requirements:

1. ✅ Refresh local workspace (git clone — the workspace had been reset)
2. ✅ Review AGENTS.md, CLAUDE.md, README.md, Project_Architecture_Document.md, wellness-hub_SKILL.md (all read + validated against the tree)
3. ✅ Review docs/session_79.md, docs/plans/2026-11-01-session41-remediation-plan.md, worklog.md, docs/session_80.md (all read; confirmed WH-41 shipped at 5e981a5, this round = WH-42)
4. ✅ Validated understanding against codebase (all standing blocks verified: .env/db contract, vitest/playwright configs, sitemap/robots/manifest, Tailwind v4 pins, drawer battery)
5. ✅ Audited codebase with repo skills (the web-application SKILL's contracts; the decode-first doctrine; skills/ excluded from checks — the gate ignores it)
6. ✅ Visual/functional parity with the reference (the watch + 8 parity scripts, 697-member new surface, two real drifts found + cured)
7. ✅ Mobile navigation menu check (parity-shell drawer battery 61/61 sixth consecutive + the mobile-nav e2e inside 72/72)
8. ✅ Tailwind v4 bugs (pins verified standing; the new alpha-black oklab class normalized)
9. ✅ .env DATABASE_URL="file:../db/custom.db" (verified; db/ at repo root; census reads it)
10. ✅ vitest + playwright test suites (verified; unit count 369 → 371 with new contracts; e2e 72/72)
11. ✅ Sitemap + SEO (the sitemap/robots/manifest handlers verified; the smoke's ok-12 leg all 200)
12. ✅ Comprehensive remediation plan + ToDo (docs/plans/2026-11-01-session42-remediation-plan.md, validated against the tree, executed meticulously, TDD: both cures RED→GREEN)
13. ✅ Screenshots under docs/screenshots/ (the capture round: 34 captures refreshed, the 4 movers root-caused, ledger re-based)
14. ✅ .env.example (verified accurate + tracked; included in the commit — well, it was already tracked and unchanged; the commit includes the repo state)
15. ✅ Documentation updated (SKILL v1.40.0 + lesson 46, PAD §11/§8.1, AGENTS, README/CLAUDE counts, worklog, session_81)
16. ✅ git commit + push via SSH wrapper to git@github.com:nordeim/wellness-hub.git (main only, no new branches, key shredded)
17. ✅ neo-crm tech stack patterns referenced (the sibling recheck v1.204.0 unchanged)

All requirements delivered. Let me update the TODO list to completed and write the final summary.
**WH-42 轮次已完全交付** — 已提交 `0a277e5` 并推送（远程验证 `refs/heads/main @ 0a277e5 == local HEAD`，密钥已销毁，仅限 main 分支，无新分支）。

**基准**：全新克隆至 `ce660e8`；环境已重建（bun 1.3.14 · chromium 1248 · 新增 `AUTH_SECRET` · db push/seed · census 匹配）；基准验证全绿，重现了 WH-41 的交付状态（lint 0/0 · tsc 0 · **369/369** · build 正常 · smoke 14/14 · **e2e 72/72** · 审计无风险）。操作员清单已在代码树中逐项验证（`.env`/db 契约、vitest+playwright 配置、sitemap/robots/manifest 处理程序、Tailwind v4 锁定、`.env.example`、移动端抽屉测试套件）。

**第 31 轮监测 — 双轴移动 + 第四次连续轮内移动**：第四个 css 内容变更（`T8A-IXoy`→`DsYCKxwV`）+ 第 14 个 bundle `BH_eVSe7`，然后**第一个** `qi2AnSYN` 在其自身重定基线的 born-verification 期间触发。每个同轮 digest 均为 **15/15 匹配**（根据 lesson-45 规则未过滤捕获）；ledger 重定基线一次至最终读取，静态验证。

**核心交付 — parity net 的第八个维度**：`scripts/parity-routines.mjs`（**697 个成员，该网络最宽维度**，包含 ORDER 成员 + DATA 文本原样；12px-radius 卡片锚点；三个已知类，包括**新增的 alpha-black oklab 形式**）。其诞生过程捕获了本轮的两个**真实数据漂移** — 参考应用重新排序了其 11 个模板网格**并**将其视频模板的权益行修剪为三行 — 两者均通过 TDD 方式修复（seed-parity grid-order + benefits-trim 契约，RED→GREEN，全程 census 匹配）。**出生验证 697/697 ×4**。现有测试套件第四次全宽运行：**825 个计算成员，全部通过**（login ×7 · moodForm ×8 · shell/drawer ×6 · dashboard ×6 · headers ×5 · toolbars ×3 · kpis ×4）。

**捕获**：门禁捕获了两个与顺序相关的 e2e pins（文本限定；计数阶梯在 72 处保持持平），且第 13 个跨轮比较在 4 个迁移器根本原因分析后读取到 **30/34 字节稳定**。单元计数阶梯 369→**371**，每个文档站点均在同一提交中（lockstep pin GREEN，实时捕获了一个遗漏的 PAD 站点）。文档：**SKILL v1.40.0 + LESSON 46**（本地探测器预算 — 我们的 dev server 会触发其自身的登录限制器；在治愈前重现）、PAD §11/§8.1、AGENTS、worklog、计划执行记录、`docs/session_81.md`。最终代码树门禁通过。

**WH-43 建议后续步骤**：全宽测试套件（9 次参考登录 — 预算边缘，零瞬态余量）；第九个维度候选（Learning 教程卡片 / Profile 面板 / 空状态）；template-order watch 现在是一个常设成员。
