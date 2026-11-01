# Session 83 — WH-43 (the ninth parity surface round)

The workspace was re-cloned fresh (the sandbox reset between rounds): main at `954a42d` — the WH-42 ship `0a277e5` + the operator's session_82 log push. Per the WH-42 plan's suggested-next, this round is WH-43 (the driving instruction's session_81/session42-plan/worklog/session_82 set).

The environment rebuilt in the intake: bun 1.3.14 install, the .env copied from .env.example with a fresh 64-hex AUTH_SECRET, db:push + db:seed + census MATCH (15/24/10/23/12 + the demo mood entry, moods=1). The Playwright chromium 1248 binary reinstalled (the sandbox cache carried 1200 only — the known first-run gap).

The five docs (AGENTS, CLAUDE, README, PAD, SKILL v1.40.0) + session_81 + the session42 plan + the worklog WH-42 entry + session_82 read and validated against the tree. The instruction's checklist items verified on the tree: the .env/db contract (`DATABASE_URL="file:../db/custom.db"` → the repo-root db/), the vitest/playwright configs (371→ the live count), the sitemap/robots/manifest handlers (the smoke's ok-12 leg), the Tailwind v4 pins, .env.example, the mobile drawer battery — re-run explicitly per the instruction's emphasis (8/8).

**The baseline gate re-run live, all green at the exact WH-42 ship state**: lint 0/0 · tsc 0 · unit 371/371 (26 suites) · build OK · smoke 14/14 · e2e 72/72 · census MATCH · bun audit zero.

**Watch round 32 — the DOUBLE-AXIS move AGAIN + the fifth consecutive intra-round move.** PASS 1 fired both axes: the FIFTH css CONTENT change (`DsYCKxwV` → `CapATpwD`, the css content axis moving for the THIRD consecutive round) + the SIXTEENTH bundle (`a8mtclnh`); the same-run digest read 15/15 MATCH. The ledger re-based on both axes; the born-verification re-run fired the SEVENTEENTH bundle (`DrgN_FlZ`) — re-based once to the round's final read, born-verified on the quiet state (`assets stable` + 15/15).

**The standing battery's fifth full-width run — all eight legs green through the moves**: login 34/34 (eighth, the zero-login leg) · moodForm 20/20 (ninth — after one transient first-flight PASS-A timeout, the page.goto class, closed by the immediate re-run: lesson 45 verbatim) · shell 61/61 (seventh — the drawer battery, the instruction's mobile-menu emphasis) · dashboard 105/105 (seventh) · headers 192/192 (sixth) · toolbars 98/98 (fourth) · kpis 315/315 (fifth) · routines 697/697 (second) — **1,522 computed members live-vs-live, zero manual evals**.

**The round's core — the parity net's NINTH SURFACE, `scripts/parity-tutorials.mjs`** (the Learning tutorial-card family, the WH-42 plan's (c) candidate). DECODED LIVE FIRST — and the decode itself carried the round's lesson: the probe needed THREE vocabulary fixes before it read the reference at all (**LESSON 47**): (a) our Watch Now buttons carry `aria-label` (the a11y superset) where the reference's carry none — the anchor must key on TEXT CONTENT; (b) the reference's duration chip + chips are DIVs (the lesson-27 tag class); (c) the CSS BLOCKIFICATION rule — inline-flex chips inside the flex chips-row compute display:flex on BOTH apps, so a display-keyed filter matches NOTHING — the chips anchor STRUCTURALLY (the title row's next sibling's children). The round also tripped BOTH login limiters once each (the reference's during the debug flights — closed by the window slide; our dev server's after the battery — closed by the restart, lesson 46 symmetric).

**F-1 the TDD order cure (RED→GREEN)**: the decode found the reference's tutorial grid RE-ORDERED — the WH-42 lesson-41 class's second instance (the head 1-6 + tail 9-12 reshuffled, positions 7-8 held, the SET + every per-title data field byte-identical). The seed-parity suite grew the tutorial grid-order contract (RED), the `TUTORIALS` array re-sequenced (a surgical reorder script — its first form anchored on the type annotation's bracket and mangled the array; caught by the seed run's own syntax error, restored, re-run with the `= [` anchor), sortOrder renumbered, GREEN, census MATCH (tutorials=12 unchanged). The e2e learning leg verified text-based — no e2e change needed.

**F-4 the search-input TYPE cure (RED→GREEN)**: our two search inputs shipped `type="search"` where the reference's are `type="text"` — sub-DOM at rest, but Chromium renders a clear (✕) button on type=search with content that type=text never shows (an interaction-state difference, the WH-20 class) + the a11y tree maps searchbox vs textbox. Both sites flipped to `type="text"`; the WH-43 search-input census added to the src-census suite (RED first, GREEN after); the live pins are parity-tutorials' `landscape.searchType` + `sr.type` members.

**The born-flight confirmed the order cure on the live read**: **790/790 ×3 consecutive + one final flight on the round's final asset state** — the net's NEW widest surface (the landscape incl. the ORDER member + the sr input fact + per card ~64: the card chrome/cover/img/overlay/Watch-Now/duration-chip/title/chip-pair/desc anatomy + the DATA texts + img src as-is; the three normalizers — realLayers + gradientStops + alphaBlack, on BOTH the overlay's bg-black/0 AND the duration chip's bg-black/70).

The count ladder moved 371 → **373** (the seed-parity tutorial order contract + the src-census search-input census — the suite count FLAT at 26); the docs-counts CANONICAL + every doc site updated in the same commits — the intra-round self-catch: the first lockstep pass wrote 372 before the src-census pin landed, and the re-run's 373 caught it.

The neo-crm sibling rechecked: v1.204.0, unchanged (informational).

The docs ladder: PAD §11 (the watch row's round-32 record + the F-1 tutorial-order row + the F-2 ninth-surface row + the F-4 search-input row + the F-5 lesson-47 row) + §8.1 (the seed-parity row 4→5 + the infra row 165→166 + the totals 373), AGENTS (round 32 + the NINE-script battery + the budget note), SKILL v1.40.0 → **v1.41.0** (the parity row widened to NINE surfaces + **LESSON 47**), README/CLAUDE counts, the worklog WH-43 entry, the plan's execution record, this log.

**The FOURTEENTH cross-round byte comparison: 30/34 byte-stable, FOUR movers root-caused before the re-base** — 10-learning + 30-tutorial-card-hover (the deliberate our-side face change: the tutorial order cure) + 25-dark-login-focus (the standing signature VERBATIM: 77px/maxΔ5, the fourth consecutive round at the identical stats) + 29-quick-actions-hover (the standing signature's quietest read: 5px/maxΔ1). The ledger re-based, verified 0 mismatches; census MATCH after.

The scratch probes deleted (scratch-decode-tutorials, scratch-debug-chain, scratch-verify-interior, scratch-chips-check, scratch-dom-debug, scratch-cancel-button); the full gate re-run GREEN on the final tree (lint 0/0 · tsc 0 · **373/373** · build OK · 14/14 · **72/72** · census MATCH · audit zero); the commit + the SSH-wrapper push.

## WH-43 轮次总结

**基准**：全新 clone 至 `954a42d`；环境重建（bun 1.3.14 · chromium 1248 · 新 `AUTH_SECRET` · db push/seed · census MATCH）；基准门禁全绿复现 WH-42 发版态（371/371 · 72/72 · audit 零）。

**Watch 第 32 轮**：双轴移动再现（第五次 css 内容变更 + 第 16 个 bundle）+ 轮内第 17 个 bundle（连续第五轮）；同行摘要 15/15 MATCH；账本重基至轮末终读，静息态 born-verified。

**常设电池第五次全宽全绿**：八腿 **1,522 成员**（login 34/34 ×8 · moodForm 20/20 ×9 · shell 61/61 ×7 · dashboard 105/105 ×7 · headers 192/192 ×6 · toolbars 98/98 ×4 · kpis 315/315 ×5 · routines 697/697 ×2）。

**F-1 两个 TDD 治愈**：参考站重排了 12 个教程的网格顺序（WH-42 lesson-41 类第二例）→ seed-parity 教程顺序契约 RED→seed 重排→GREEN；我们的两处搜索框 `type="search"` vs 参考站 `type="text"`（Chromium 清除按钮 + a11y 树差异）→ src-census 搜索框普查 RED→两处翻转为 text→GREEN。

**F-2 第九面**：`scripts/parity-tutorials.mjs`（**790 成员——本网新最宽面**：ORDER 成员 + sr input 事实 + 每卡 ~64 解剖成员 + DATA 原样；三个序列化类归一化——覆盖 overlay 与时长徽片两处 alpha-black）。**Born-verified 790/790 ×3 + 终态一飞**。

**LESSON 47**：解码器的选择器词汇表本身就是一面——按文本内容与树中位置锚定，绝不按属性存在性（我们的 aria-label 超集）或计算 display（flex 子项块化规则：inline-flex 在 flex 容器内计算为 display:flex，显示过滤在两侧都匹配不到任何东西）；解码的调试飞行与电池消耗同一登录预算（本轮两侧限流器各触发一次——批量化调试问题、飞行间隔 ≥10 分钟）。

**门禁/文档**：全门禁 GREEN（lint 0/0 · tsc 0 · **373/373** · build OK · 14/14 · 72/72 · census MATCH · audit 零）；计数阶梯 371→**373**（lockstep 钉 GREEN，轮内自查抓到 372 的中间态）；SKILL **v1.41.0 + LESSON 47**、PAD §11/§8.1、AGENTS、README/CLAUDE、worklog、计划执行记录、session_83；第 14 次字节比对 **30/34 稳定**（四移动者全部根因）；已提交并经 SSH wrapper 推送至 main。

**WH-44 建议下一步**：(a) 全宽电池（watch 第 33 轮 + 九脚本——十次参考登录/轮，超预算舒适边缘：跨两个登录窗口拆分或接受瞬态重跑成本）；(b) 降温仍需连续两次稳定读（28-32 轮每轮皆动）；(c) 第十面候选：Profile 外观面板（部分数据依赖）、空状态族（数据依赖）、Goals 成就砖（demo 零态数据依赖）、Events 日历族（数据依赖）；(d) 常设封锁复检 + 教程顺序 watch（ORDER 成员已入常设电池）。
