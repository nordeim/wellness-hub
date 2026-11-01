I'll start by setting up a task plan and refreshing the workspace.
The workspace exists. Let me check the git status and pull the latest:
工作区已刷新。现在让我阅读这五个核心文档：
Repo is up to date. The core docs are large (AGENTS.md 40KB, Architecture Doc 101KB, SKILL.md 137KB). Let me read the smaller ones myself and delegate deep-reading of the large ones to parallel agents:
现在让我将三份大型核心文档的深入阅读任务委派给并行 Agent，同时我将亲自审查会话历史记录：
Excellent briefings. Now let me review the session history documents:
Now let me read the worklog (latest entry — WH-35):
I now have full context: **WH-35 shipped at `8fa0021`** (366 unit / 71 e2e gate green; parity script born; ink-split cure). This session drives **WH-36** per the WH-35 plan's suggested next steps. Let me update my task plan and validate the codebase contracts:
Env contracts verified. Let me check the test configs, sitemap, and Tailwind v4 pins:
All standing contracts verified. Now let me run the baseline gate (lint → typecheck → unit):
Lint 0/0 · tsc 0 · unit 366/366. Now the production build:
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 366/366 (25 suites) · build OK · smoke 14/14 · e2e 71/71. Let me run the census + audit posture checks:
Census MATCH · audit zero. Now the audit phase — let me review the skills catalog:
Let me review the key skills for this round (tailwind-patterns for the v4 check, tdd, and the watch/parity scripts):
The skill references confirm the standing v4 pin doctrine. Now let me examine the watch/parity scripts and run **watch round 25** — the core WH-36 procedure:
**Watch round 25: assets STABLE + 15/15 MATCH** — the first consecutive stable read since round 24's move (cooling policy needs two-plus, so not yet). Now the parity companion — it needs our dev server. Let me boot it:
**Parity companion: 20/20 MATCH** — the WH-35 ink cure holds on both apps. Now let me audit the WH-35 diff (the recent changes) and re-verify the neo-crm sibling:
The WH-35 diff is clean — exactly the documented ink-split cure + parity script + docs. Now re-verify the neo-crm sibling:
neo-crm sibling: **v1.202.0, unchanged** from WH-35's record. Now let me study the (d)-leg candidate — the login family — examining the watch's login probe, our login page, and the parity script structure:
Now let me examine the login card component to design the parity-login member set:
I have the full login card structure. Let me check the documented reference login face details in the PAD:
Let me examine the (l)-leg — our login family's e2e pins:
The (l)-leg map is clear. Per the decode-before-pin doctrine, let me write a scratch probe to read BOTH apps' login faces live — the member correspondence check before designing the parity script:
Outstanding decode — 27 scalar members already match. Three classes of serialization diffs (the oklab/rgba platform class) and one selector lesson (our badge). Let me probe our badge's computed radius and the alpha-color canvas normalization:
Both key decode results: (1) our `rounded-full` computes `3.35544e+07px` (v4 `calc(infinity)`) vs reference `9999px` — needs is-round normalization; (2) the canvas compositing normalization makes both alpha colors byte-identical. The audit is complete. Let me check the AGENTS watch passage (the doc update site for the new script):
All doc update sites identified. Now let me write the WH-36 remediation plan:
The plan's execution record must reflect only what's actually done (WP-0) — let me correct it to the honest pre-execution state:
Now **WP-1 — the F-2 cure**: writing `scripts/parity-login.mjs`:
Now the born-verification — the first flight of the new parity surface:
**Born-verified: 34/34 MATCH, exit 0** — the second parity surface is born quiet. Let me clean up the scratch probe and run the full gate:
**WP-2 FULL GATE GREEN** — lint 0/0 · tsc 0 · 366/366 · build OK · smoke 14/14 · e2e 71/71. Now **WP-3 — the docs ladder**. First the PAD §11 watch row:
Now let me add the WH-36 F-2 row to the PAD §11 findings table:
Now the AGENTS.md watch note update:
Now the SKILL doc — version bump, quick-reference row, and lesson 40:
Now lesson 40 — appending after lesson 39:
Now let me verify the docs-counts lockstep pin reads GREEN with the doc edits, then write the worklog entry:
Now update the plan's execution record with actuals:
Now **WP-4 — captures**. Let me check the capture procedure and run it:
34 captures taken, census MATCH. Now the SEVENTH cross-round byte comparison:
30/34 byte-stable with FOUR movers (25/29/30 have per-file precedents; **10-learning is new**). Let me read the full ledger history and pixel-diff the movers to root-cause:
Image viewing isn't available to this model — the pixel data tells the story clearly though (16 px, maxdelta 7, two tiny glyph-edge clusters — antialiasing class). Let me quantify the other three movers for the root-cause record:
All four movers quantified. Three have per-file precedent classes; 10-learning is first-time — let me verify what surface that capture holds and confirm the sub-visible class:
The diff pixels are gray glyph-edge tones on the learning page's amber wash — the text-rasterization class. Root cause complete. Now re-base the ledger with the WH-36 record:
Ledger verified. Let me update the plan's WP-4 record with the actual comparison result, then write session_69.md:
Now let me write session_69.md — the session log convention:
Now the final pre-commit gate on the full edited state:
**FINAL GATE FULLY GREEN.** Now **WP-5 — commit + push**. Let me read the SSH wrapper runbook:
Runbook internalized. Let me check the ssh shim situation and materialize the key:
No ssh binary — paramiko 5.1.0 available. Let me deploy the Appendix A shim to the workspace bin/:
Now materialize the operator key outside the repo and sanity-check it:
Key verified. Now the commit — staging the round's changeset:
Committed as `601c296`. Now the SSH-wrapper push — dry-run first:
Dry-run passed (fast-forward `9933838..601c296`). Executing the real push:
**Pushed and remote-verified at `601c296`.** Now shred the operator key and verify final state:
All work shipped. Let me finalize the task list:
**WH-36 已交付并推送** — `main` 分支提交 `601c296`，远端已验证，SSH 密钥已销毁，工作区干净。

## WH-36 — parity 网第二面轮次摘要

**基准检查**：拉取至 `9933838`（操作者 session_68 推送已同步）。全量门禁通过 — lint 0/0 · tsc 0 · **366/366**（25 个测试套件）· build OK · 冒烟测试 14/14 · e2e **71/71** · census 匹配 · `bun audit` 为 0。所有清单项已验证（`.env`/db 契约、vitest/playwright、sitemap/robots/manifest/OG、Tailwind v4 pins、`.env.example`、neo-crm 同级仓库 v1.202.0 无变化、WH-35 diff 干净）。

**核心工作 — `scripts/parity-login.mjs`（parity 网第二面）**：moodForm parity 连续两次安静飞行后，WH-35 计划的 (d) 前置条件落地，parity 成员集扩至 **login 族**（应用根面）。**先解码后成文**：27 个标量成员双侧活读全 MATCH，外加解码出三类序列化差异（oklab/rgba、渐变语法、`calc(infinity)` vs 9999px）——三个规范化全部读取**渲染事实**（1×1 canvas 合成、rgb 色标三元组、is-round 谓词）。**零登录、零交互**（迄今最净探针），born-verified **34/34 MATCH**。

**监视第 25 轮**：连续第一次稳定读（双哈希不变，15/15 MATCH）——降温政策仍差一轮，第 26 轮若稳定即启动。

**门禁/捕获/文档**：全量门禁再次通过；34 文件捕获（第七次跨轮比对：30/34 逐字节稳定，4 个 mover 全部溯源——10-learning 为文本光栅化类首次着陆）；SKILL **v1.34.0 + lesson 40**、PAD/AGENTS/worklog/session_69 锁步更新。

**WH-37 建议**：监视第 26 轮（稳定即启动降温）；双 parity 脚本常设伴跑；若两面持续安静，第三面候选为 dashboard stat-tile 族或 sidebar 外壳。
