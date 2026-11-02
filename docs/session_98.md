I'll begin executing this comprehensive task. Let me start with Phase 1: refreshing the workspace and reviewing the documentation.
The workspace has been reset — the `wellness-hub` directory is empty. I'll clone the repo fresh.
The repo is cloned successfully. This is a mature project with extensive history (WH-49 audit round just completed, 15 parity surfaces, full test battery). Let me set up my task plan and begin the review.
All referenced docs exist. Let me check their sizes and read the latest status docs first.
The project already has vitest/playwright configured. Let me read the status docs first — session_96 (newest), session_95, and the session49 remediation plan.
Session 96 confirms the WH-49 round was completed and pushed (commit `d6ddc8c`). The tree is at WH-49 ship state. Now let me read the session49 remediation plan and worklog tail.
The plan's execution record confirms WH-49 landed completely. Now let me read the worklog tail and the core docs.
I have the WH-49 picture. Now let me read the core documentation — AGENTS.md and README.md first.
AGENTS.md is fully reviewed. Now CLAUDE.md and README.md.
Now let me examine the PAD and SKILL doc structures, then read key sections.
Let me review the SKILL doc's lessons section (critical for methodology) and its parity surface row.
I have deep context now. Let me validate understanding against the codebase structure — the environment, src tree, scripts, and skills catalog.
The environment needs rebuilding (fresh clone): `.env` missing, `db/` empty, node_modules absent. Let me check the skills catalog and start the environment rebuild.
Environment check: bun 1.3.14 ✓, node 24 ✓, but chromium cache has 1200 (e2e expects 1248 — the known first-run gap from session_95). Let me rebuild the environment now.
`.env` created with the required `DATABASE_URL="file:../db/custom.db"` and fresh AUTH_SECRET. Now the database:
Census MATCH. Now let me handle the chromium version (cache has 1200, e2e expects 1248):
Chromium 1248 installed. Environment fully rebuilt. Now the baseline gate (lint → typecheck → unit):
375/375 unit tests green. Now build + smoke:
Smoke 14/14. Now the e2e battery:
E2E 72/72 ✓. Mobile-nav battery explicitly (per the instruction's emphasis):
**BASELINE GATE FULLY GREEN at the WH-49 ship state** — lint 0/0 · tsc 0 · unit 375/375 · build · smoke 14/14 · e2e 72/72 · mobile-nav 8/8 · census MATCH · audit zero. This exactly reproduces the documented ship state.
Now Phase 2 — the audit. Let me verify the checklist blocks and audit the WH-49 artifacts:
Configs verified — e2e db PINNED at `db/e2e.db`, vitest scoped to src/tests only (skills/ excluded). Now the Tailwind v4 pins and eslint exclusion:
All Tailwind v4 pins standing, eslint excludes `skills/`. Now auditing the WH-49 artifact (parity-calendar.mjs) and the sitemap/SEO implementation:
The fifteenth surface is standing and clean. Now verifying the sitemap/SEO implementation:
Sitemap/SEO verified standing. **Phase 2 audit verdict: CLEAN** — all checklist blocks verified (env contract, configs, Tailwind pins, sitemap/robots/manifest, WH-49 artifact, audit zero). 

Now Phase 3 — the WH-50 parity round. Let me check the watch script conventions and boot the dev server:
Dev server up. Running watch round 39:
**Watch round 39: FULLY QUIET** — assets stable (css `CapATpwD` + js `OLDXOew4`), digest 15/15 MATCH — the third consecutive fully-quiet read. Now the standing battery, Window 1 (5 login-legs + zero-login legs):
**Window 1 complete**: login 34/34 · moodForm 20/20 · shell 61/61 · dashboard 105/105 · headers 192/192 · toolbars 114/114 — all green. Restarting the dev server (lesson-46) and studying the sixteenth-surface candidate (form ERROR-state interiors) on our side while the reference window rolls:
Our client-side validation surfaces a toast error. Let me study the toast component and check what the reference renders on a bad submit — first our side (zero reference cost):
Now let me write the our-side decode probe for the sixteenth-surface candidate (form ERROR-state interiors). First, check the form opening mechanics:
Both our forms surface client-side toast errors. Now the our-side decode flight (zero reference cost) — capturing the ERROR-state toast anatomy:
Our-side exercise ERROR-state decoded (toast: white bg, red-200 border, 12px radius, 18px red-500 icon, 14px/500 title). The events button text differs — let me check:
Our-side error states decoded — both render the same toast family. Now the reference-side flight (ONE login). Let me check the reference's button labels from the parity-headers surface first:
Now the reference-side decode flight (ONE login) — capturing whatever error state the reference renders (toast or field-level):
The reference showed NO toast and NO field-level errors on bad submit — but the events probe clicked the wrong button (calendar "→"). Critical: I must verify whether the exercise submit actually created a row (ZERO-WRITE concern). One careful re-probe:
**CRITICAL DECODE FINDING**: The reference's exercise form uses **native HTML5 validation** (`required: true` on the duration input, `type="submit"` button, form wrapper) — the bad submit was BLOCKED by the browser (native bubble = browser UI, not DOM). **ZERO-WRITE held** (form still open, no rows created, no toast). The reference renders **NO DOM error face** on a bad submit — our toast is the deliberate superset. The ERROR-state candidate retires on a false premise.

Let me now probe the dark-mode flip mechanism on the reference (the other sixteenth-surface candidate — dark calendar interior):
Both candidates retire on false premises — the reference has **no dark mode** (our Light/Dark/Auto is the documented superset) and no DOM error face. Let me check what parity-profile covers to evaluate the tab-interior candidates:
**The sixteenth-surface candidate settles: the Profile Account + Preferences tab interiors** — completely unread by any surface (parity-profile covers only the Appearance family), doctrine-safe (view-state tab clicks only, the exact class parity-profile already uses). Let me decode — our-side flight first:
Our-side decode rich — Account (2 cards, 3 disabled inputs at gray-50) + Preferences (1 card, 2 native checkbox rows). Now the reference flight:
Nearly born-quiet — the disabled inputs are byte-identical; ours adds the Session card (the documented superset). But wait — let me check what parity-account already covers (the eleventh surface):
The Account/Preferences tabs are already surface 11 (parity-account) — candidate retires on discovery. **The strongest remaining candidate: the Schedule modal's full interior** — probed at WH-22 but never diffed live-vs-live (the watch reads only width + circles). Let me study the SCHEDULE_MODAL record:
The full modal structure is clear. Let me check how the watch opens the modal (to model the surface's anchors on the proven pattern):
The watch's modal-opening pattern is proven. Now the decode flight for the Schedule modal's full interior — our side first. Checking the template data:
Family A carries tips (the Remember inset renders). Writing the decode probe — our-side flight:
The watch probes the reference only — its selector is the reference's vocabulary. For our side, let me check parity-routines' card anchor:
The chrome anchor found the wrong element. Let me debug the dialog structure:
The dialog structure is clear — but my probe opened the wrong card (over-climb bug — the ancestor walk hit the shared grid; lesson-47/48 class). The chrome IS the `[role="dialog"]` element. Fixing the anchor to the 12px card root:
Our-side decode nearly complete — but the `primary` anchor grabbed the close X (last in DOM). Fixing to the wide button:
Our-side decode complete (primary: 622×36, purple-500→pink-500 stops). Now the reference flight:
**A real drift candidate found!** The Remember inset: reference 76px vs ours 96px (Δ20 — likely one extra text line), shifting everything below by ~20-32px. Also the reference's steps aren't `<li>` elements (anchor artifact). Let me run a targeted isolation probe on both apps:
**ROOT CAUSE DECODED!** The reference's Remember inset is a **two-p structure**: `<p class="text-xs font-semibold text-purple-700 mb-1">💪 Remember:</p>` + `<p class="text-xs text-gray-700">{tips}</p>` — while ours renders raw text at the inherited 16px/24px. That's the Δ20 (ref 76px vs ours 96px). Our-side probe hit the dev-server login limiter (lesson-46) — restarting:
**Root cause confirmed on both apps.** Ours: raw 16px text (96px). Reference: two text-xs ps (76px). Now let me find the unit test that pins SCHEDULE_MODAL and the dark-twin conventions:
The census block is found. Checking the purple dark-twin convention in the codebase:
Checking the @theme palette pins (the pins⇔usage equivalence rule) for purple shades:
`purple-700` is pinned and in use; `purple-400` is NOT pinned (retired). Let me check the dark-pair census rules and how other colored -700 inks carry dark twins:
Let me verify the design-token census (pins⇔usage equivalence) rules:
All census requirements confirmed. Let me check if the capture set includes the Schedule modal, then write the WH-50 plan:
Capture 28 reads the modal — the cure will move it (expected, root-caused). Now writing the WH-50 remediation plan (Phase 5):
Plan written and validated. Now **WP-1 — the F-1 cure, TDD-style (RED first)**. Widening the census:
Both edits landed. Running the census — expecting **RED**:
**RED confirmed** — exactly the 4 expected failures. Now **GREEN** — the record members, the purple-400 pin, and the JSX re-author:
Now the purple-400 v3 pin in @theme (the WH-14 pins⇔usage equivalence):
**GREEN** — 49/49. Full unit suite to confirm the count ladder:
375/375 flat + tsc clean. Verifying the cure live — restart dev server (lesson-46) and re-probe:
**CURE VERIFIED LIVE** — the inset reads 76/160, byte-identical to the reference. Now **WP-2 — the sixteenth surface**. Let me check the alpha-normalization convention from parity-login:
All conventions gathered. Writing the sixteenth surface:
Now the born-verification **flight 1**:
A PROBE-ERROR — the reference redirected to the login wall (the lesson-45 infrastructure class, or the login limiter). Per doctrine: wait for the window to roll, then retry. Meanwhile, let me check how many reference logins this window consumed and wait:
Flight 1: 64/96 — 32 drifts, a residual Δ12 on the y-ladder. Let me see the full drift pattern:
Three issues: (1) my step-tile anchor only scans DIVs (ours are `<li>` — the tag-anchor artifact again), (2) chrome.rect compares the shadow string too, (3) **a REAL new drift**: our field labels are Δ4 taller each (ladder: date Δ4, time Δ8, textarea Δ12). Let me decode the label difference:
Our Label uses `leading-none` (14px line box) — but ours measures 24px vs the reference's 20px. Something else adds height. Probing the label computed styles on both apps:
Our label: inline, lh 14px, the input lands at 636. Now the reference's labels:
**ROOT CAUSE #2 DECODED**: the reference's inputs ride `mt-1` (4px); ours `mt-2` (8px) — Δ4 per field, compounding down the ladder. Let me check all three fields' exact classes:
The date input's computed mt is definitive (ref 4px vs ours 8px). Let me read all three fields' computed margins on both apps:
The textarea's measured class (`mt-2 flex min-h-[60px]...`) doesn't match TEXTAREA_FIELD — let me check what's actually rendering:
**The full picture**: `TEXTAREA_FIELD` itself carries `mt-2` (the WH-22 generalization), but the reference's Schedule modal fields all ride **mt-1 (4px)** — a scoped drift (the other forms' captures are byte-stable, so this is modal-specific). Extending the cure TDD-style — RED first:
RED confirmed. Now GREEN — the record member and the JSX cure:
F-1b GREEN. Now fixing the surface script's two anchor bugs (the `<li>` tag-anchor and the chrome shadow compare):
Both fixes applied. Now the born-verification flight on the cured tree:
**89/89 MATCH!** The cure landed byte-identical. Born-verification flights 2 and 3:
**The sixteenth surface born-verified 89/89 ×3.** Now the battery completion — the zero-login authviews leg first, then Window 2 after the reference window rolls:
**Window 2 complete** — all green. Restarting the dev server (lesson-46) and pacing for Window 3:
**THE STANDING BATTERY COMPLETE — all 16 surfaces green: 3,484 computed members live-vs-live.** Now the capture round (WP-5):
The ledger has a comment header — let me compare properly (md5 lines only):
Format mismatch (column order). Comparing by name→hash mapping:
2 movers of 34. Capture 28 is the cure's expected face. Capture 29 needs root-causing before any re-base:
**Both movers root-caused**: 28 = the cures' deliberate face (expected); 29 = the standing rasterization signature (5px, maxdelta 1, sub-visible). Re-basing the ledger:
Ledger re-based, 34/34 verified. Now **the full gate on the final tree**:
**FULL GATE GREEN on the final tree** — lint 0/0 · tsc 0 · 375/375 · build · 14/14 · 72/72 · mobile-nav 8/8 · census MATCH · audit zero. Now the docs ladder. Finding the SKILL parity row:
The SKILL parity row is a giant line. Applying the docs ladder edits surgically with Python:
The emoji escape created invalid surrogates. Redoing with proper Unicode escapes:
**The first failed run truncated the SKILL file** (open("w") truncates before the write raised). Restoring from git and redoing safely:
Docs-counts lockstep green. Now the PAD §11 rows:
Now the watch row's round-39 record in PAD:
Now the AGENTS.md updates — the watch/battery section:
The AGENTS structure is clear. Applying the three WH-50 edits:
Now the worklog WH-50 entry (prepended at top):
Now the plan's execution record and session_97:
Now session_97.md:
Session 97 written. Now WP-7 — scratch cleanup and final verification:
Tree is clean. Final verification — docs-counts lockstep + the unit suite (the docs edits landed after the gate):
All green. Now the SSH push runbook:
Runbook internalized. Committing the round:
Commit `68399e8` landed, tree clean. No `ssh` binary — deploying the Appendix A paramiko shim:
Key parses (ed25519). Dry-run first:
Dry-run green — remote at `d6ddc8c`, fast-forward to `68399e8` ready. The real push:
**PUSH VERIFIED** — remote `main @ 68399e8 == local HEAD`, tracking ref synced, key shredded, main branch only. Cleaning up:
**WH-50 已完整交付并推送到 main 分支**（commit `68399e8`，远程已验证 == 本地 HEAD，密钥已销毁，无新建分支）。

本次会话完整走完了既定七阶段流程：

1. **环境重建 + 基准验证**：全新克隆至 `d6ddc8c`（WH-49 发版态），bun/chromium 1248/.env/db 重建，census MATCH；五核心文档 + session_95/session49 计划/worklog/session_96 读取并对照代码树验证。**基准门禁全绿**（lint 0/0 · tsc 0 · 375/375 · build · 14/14 · 72/72 · 移动端导航 8/8 显式重跑 · census MATCH · audit 零）；指令清单各项（.env/DB 路径、vitest/playwright、sitemap/SEO、Tailwind v4 pins）全部核实站立。

2. **第十六奇偶校验面候选解码（decode-first）**：WH-49 计划的四个候选全部退役——参考站表单坏提交走**原生 HTML5 校验**（浏览器气泡非 DOM 面，零写已验证）；参考站**没有暗色模式**；Profile 标签页已是第十一面；目标进度记录持续数据封锁。

3. **本轮核心——Schedule 模态完整内景，两处真实漂移 TDD 治愈**：Remember 插槽（参考站双 P text-xs 家族 76px vs 我方裸文本 96px，Δ20）+ 字段间距（mt-1 4px vs mt-2 8px，Δ4×3 复合下移）。RED 先行治愈，计数阶梯持平 375，purple-400 pin 重回 @theme，**实机验证与参考站字节一致**。`parity-schedmodal.mjs` **89 成员出生验证 89/89 ×3**。

4. **验证体系**：Watch 第 39 轮连续第三个全静读；常设电池第十二次全宽（十六面，**3,484 计算成员**全绿）；抓取轮 32/34 字节稳定（两个 mover 全部根因后重基）；最终树全门禁 GREEN；文档阶梯（SKILL v1.48.0、PAD、AGENTS、worklog、session_97）同步完成。
