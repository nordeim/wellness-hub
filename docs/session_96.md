I'll start executing this comprehensive task. Let me first set up a TODO plan, then begin Phase 1.
Workspace has been reset. Cloning the repo fresh:
Repo cloned successfully on `main` branch. Let me check the latest commits and confirm the current session docs:
Latest commit is `a5e8931` (session_94 log, 2026-11-02). Now let me read the core documentation files:
Let me read AGENTS.md directly in chunks:
Now let me read README.md and the SKILL doc:
Now let me read the latest status docs — session_94, session_93, and the session48 remediation plan:
Now let me read the session48 remediation plan and worklog tail:
I now have full context. The tree is at WH-48 ship state; per the session48 plan's suggested-next, this round executes **WH-49**. Let me read the worklog tail and check the environment state:
Environment needs rebuilding (fresh clone): node_modules and .env missing. Let me rebuild:
db/ is empty (only .gitkeep), chromium cache has 1200 (e2e expects 1248 — the known first-run gap). Let me install dependencies and set up the environment:
Census MATCH. Now let me check the Playwright chromium version and read the skills catalog (Phase 2 method set):
Method set confirmed. Let me review the web-application skill's core rules, then install chromium and run the baseline gate:
Now let me install the required chromium and run the baseline gate (lint → typecheck → unit → build → smoke → e2e):
Lint and tsc clean. Now unit tests:
Smoke 14/14. Now the e2e battery:
E2E 72/72. Mobile-nav battery explicitly (per the instruction's emphasis) + audit + census:
**BASELINE GATE FULLY GREEN at the WH-48 ship state** (lint 0/0 · tsc 0 · 375/375 · build · 14/14 · 72/72 · mobile-nav 8/8 · census MATCH · audit zero). 

Now Phase 2 — auditing the WH-48 code artifacts (Mode C). Let me verify the F-1/F-2 cures and the fourteenth surface:
All WH-48 artifacts standing. Let me verify the Sitemap/SEO implementation and .env.example (Phase 4 checklist):
Sitemap/SEO verified — comprehensive and standing. **Phase 2 audit verdict: CLEAN** (WH-48 artifacts standing, all checklist blocks verified).

Now Phase 3 — the parity round (WH-49 per the plan's suggested-next). Let me study the watch/battery script conventions:
Now let me boot the dev server and run watch round 38:
**Watch round 38: FULLY QUIET** — both axes stable, 15/15 MATCH. Now the standing battery. Let me check the parity script structure first, then run Window 1:
Each script does ONE login per app. Running battery Window 1 (login + moodForm + shell + dashboard + headers + toolbars — 5 ref logins + watch's 1 = 6 in window):
Window 1 complete (login 34/34 · moodForm 20/20 · shell 61/61 · dashboard 105/105 · headers 192/192 · toolbars 114/114). Restarting the dev server (lesson-46) and preparing the Window-2 pace. Meanwhile, studying the fifteenth-surface candidates on our side (zero reference cost):
Now let me study the parity script conventions from the most recent surface (parity-listinteriors), then write the decode probe:
I have the full model. Let me check the calendar card title and routines card structure to build the decode selectors:
parity-routines already covers the template card interiors. Let me verify its benefit/tip coverage and check what the calendar surface coverage is:
The calendar day-cell interiors are the genuine fifteenth-surface candidate (routines benefits already covered by surface 8). Let me confirm no script reads the day cells, then check the reference window budget:
The fifteenth surface = **the Events calendar card's day-cell interiors** (uncovered by any surface; routines benefits already pinned by surface 8). Writing the scratch decode probe — our-side flight first (zero reference cost):
Our-side decode rich: card 632×660, 30 day cells + 0 spacers (Nov 2026), today at idx 1, plain cell 96px min-h/8px radius/gray-200 border, today cell violet-100→purple-100 gradient. Now the reference-side flight (1 ref login):
Reference decode nearly identical. Let me see the full reference output tail and compare our weekday header:
All below-header members **byte-identical**. Only gap: the reference's header DOM shape (my `h2` selector missed it). Writing a targeted header probe:
Reference header decoded: title row is a plain DIV (ours is h2 — the semantic superset class), same computed face (16px/600/-0.4px). Nav trio identical geometry. Completing the comparison on our side:
Header tree **byte-identical** (only H2-vs-DIV tag difference — the documented semantic superset). **Decode settled: the fifteenth surface is born-quiet — ZERO real drift.** 

Now Phase 5 — writing the WH-49 remediation plan (validated against the tree during the decode):
Plan validated. Now **WP-1 — the FIFTEENTH SURFACE** `scripts/parity-calendar.mjs`:
Fixing an editing artifact in the pairs list:
I need to fix a regex escape bug — the runPass callback is a real function (not a string), so `\\d` would be wrong there:
Now the **born-verification flight 1** (reference window has rolled — the decode flights aged out):
Template literal interpolation bug — let me find the `${` inside HELPERS:
Found it — backticks around `in oklab` inside the HELPERS template literal terminate it early. Fixing:
The card anchor fails on both apps. Let me check the actual bytes of the regex in the file:
Regex bytes look correct. Let me debug the helpers directly on the dev server:
Found it — the weekday headers concatenate as "SunMonTue..." with no word boundaries, so `\bSun\b` never matches. Fixing the anchor:
**Flight 1: 92/92 MATCH.** Born-flights 2 and 3:
**Fifteenth surface born-verified 92/92 ×3.** Now WP-2 — battery completion. Restarting the dev server (lesson-46) then Window 2:
Window 2 complete (kpis 315/315 · routines 697/697 · tutorials 790/790 · profile 433/433). While the login window rolls for Window 3, starting the docs ladder (WP-3). Checking the count-pin sites:
The parity row found (line 449). Let me apply the docs ladder edits with a Python script (surgical edits on the giant lines):
Now PAD §11 — finding the WH-48 rows to append after:
Now verifying the docs-counts lockstep, then running battery Window 3:
**THE STANDING BATTERY COMPLETE — all FOURTEEN legs + the fifteenth green: 3,395 computed members live-vs-live.** Now WP-4 — the capture round (twentieth cross-round byte comparison):
**TWENTIETH cross-round comparison: 34/34 byte-stable — ZERO movers** (even the standing signatures quiet this round; no ledger re-base needed). Now WP-5 — the full gate on the final tree:
**FULL GATE GREEN on the final tree** (lint 0/0 · tsc 0 · 375/375 · build · 14/14 · 72/72 · mobile-nav 8/8 · census MATCH · audit zero). Completing the docs ladder — worklog entry, plan execution record, session_95:
Now the plan's execution record and session_95:
Now WP-7 — scratch cleanup, final verification, and the commit. First the SSH runbook:
Runbook internalized. Now the commit — checking the change set:
Commit `64009ac` landed, tree clean. Now the SSH push per the runbook — key to /tmp, check ssh binary:
No ssh binary, no paramiko — the Appendix A path. Installing paramiko and deploying the shim:
Now writing the operator key to a 0600 file in /tmp (never inside the repo) and running the fingerprint sanity check:
Key parses (ed25519). Dry-run (authenticates, touches no refs):
Dry-run green. The real push:
Push verified — remote `main @ 64009ac == local HEAD`, tracking ref synced, key shredded. Cleaning up and finalizing:
**WH-49 已完整交付并推送到 main 分支**（commit `64009ac`，远程已验证 == 本地 HEAD，密钥已销毁，无新建分支）。

本次会话完整走完了既定流程：

1. **环境重建 + 基准验证**：全新克隆至 `a5e8931`（WH-48 发版态），bun/chromium 1248/.env/db 重建，census MATCH；五核心文档 + session_93/session48 计划/worklog/session_94 读取并对照代码树验证。**基准门禁全绿**（lint 0/0 · tsc 0 · 375/375 · build · 14/14 · 72/72 · 移动端导航 8/8 显式重跑 · census MATCH · audit 零）；指令清单各项（.env/DB 路径、vitest/playwright 配置、sitemap/SEO、Tailwind v4 pins、移动端抽屉）全部核实站立。
2. **Watch 第 38 轮：连续第二个全静读**（双轴稳定，15/15 MATCH，无需重基）。
3. **本轮核心——第十五奇偶校验面（Events 日历卡 day-cell 内景）出生即静默**：解码先行（双侧飞行 + 定向 header 探针）发现**零真实漂移**——卡片铬框/标题行/导航三件套/网格/星期表头/日期格/TODAY 渐变（rgb 色标三元组）全部字节一致；例程 benefits/tip 候选发现即退役（第八面已覆盖）。`parity-calendar.mjs` **92 成员，出生验证 92/92 ×3**；日期派生成员两侧实时计算，吸收两课脚本构建教训。
4. **常设电池第十一次全宽：十四腿 + 第十五面全绿**（3,395 计算成员，两窗口拆分，无限流触发）；**抓取轮 34/34 字节稳定——零 mover**。
5. **文档阶梯 + 最终门禁**：SKILL v1.47.0（十五面）、PAD §11、AGENTS、worklog、计划执行记录、session_95；计数阶梯持平 375；最终树全门禁 GREEN；草稿探针清零；经 SSH wrapper 推送。

**WH-50 建议下一步**：watch 第 39 轮 + 十五脚本全宽电池；第十六面候选（模块创建表单 ERROR 态内景、Profile 保存栏瞬态、暗色日历内景）；常设封锁复检 + 预设目录 watch。
