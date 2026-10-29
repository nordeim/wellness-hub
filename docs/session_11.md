Remote is at `d6ad497` — WH-6 shipped at `a35cd91`, and `session_9.md` (the WH-6 transcript, operator's push) is the only new file. This round is **WH-7**. Let me review the remaining core docs and check workspace state.
Core docs reviewed — all five docs are internally consistent at the WH-6 ship state (331 unit / 21 suites, SKILL v1.4.0). The worklog's WH-6 entry matches `session_9.md`. This round is **WH-7**. Now verifying the baseline gate on the current tree:
Now the systematic audit, checking standing contracts and hunting for new finding classes (WH-7 candidates):
Standing contracts verified clean. Now hunting for WH-7 candidate finding classes — the classes no pin covers yet. Let me sweep several dimensions:
Now writing the WH-7 remediation plan:
**WP-1 (RED)** — extend the src-census pin with the two new checks:
Now writing the two new census checks (RED first):
Now flip the docs-counts CANONICAL to the post-landing truth (309/21):
**RED verified with exactly the predicted offenders** — 18 dead exports + 1 dead CSS utility. Note the RED includes the data-feed class (TEMPLATE_DIFFICULTIES, MONTHS_SHORT, DEFAULT_SITE_URL, emailSchema, passwordSchema) which cures via un-exporting — exactly as designed. Also note `calendarGrid/formatCurrency/etc` aren't flagged because tests still consume them — their retirement (WP-3) makes the pin stay green via same-commit test updates.

**WP-2 (GREEN — F-1):** retire the dead exports. First page-layout.ts:
Now constants.ts — retire NAV_ICONS (+ lucide imports) and APP_LOGIN_SUBTITLE, un-export TEMPLATE_DIFFICULTIES:
Now page-parts.tsx — retire OutlineButton and StatCard:
Now **WP-3 (GREEN — F-2)**: the format.ts subgraph. First read the full file, then land the new pins, then retire:
Now rewriting format.ts to only the live surface:
Now rewrite tests/format.test.ts — keep live checks, add the 3 new pins:
**WP-4 (GREEN — F-3)**: retire the dead CSS utility:
**WP-5 (GREEN — F-4)**: cure the stale upload narration in api.ts and rate-limit.ts:
The data-feed class cures by un-exporting (TEMPLATE_DIFFICULTIES already done, MONTHS_SHORT done in the rewrite). Now the remaining three:
**Pin GREEN 5/5.** Now the full unit run to verify the count ladder:
Exactly as predicted — the ladder RED is carried by the docs-counts per-doc claim checks (the docs still say 331). The arithmetic landed exactly: **309 checks / 21 suites**. Now **WP-6** — the count ladder across every doc site:
**309/309 across 21 suites — the ladder lands exactly as computed.** Now **WP-7**: SKILL v1.5.0 + advisory re-anchors:
Now the advisory posture re-anchors in AGENTS.md and PAD §11:
Now **WP-8** — the full gate re-run:
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 309/309 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census MATCH. Now **WP-9** — the captures. Restart the dev server with the remediated code and re-take the 16-file set:
**Captures 01-15 now byte-identical to the WH-6 set** (only 16 differs — the same timing-frame drift as previous rounds). Zero visual surface moved, exactly as predicted. Close the browser and move to **WP-10** — the worklog, session_10, and the execution record:
Now fill the plan's execution record:
Committed (21 files, +508/−722 — a net −214 lines, the retirement round's signature). Now **WP-11** — the SSH-wrapper push. Reading the runbook first:
**Push verified — remote `main @ af5b91c` == local HEAD.** Now shred the operator key per the contract:
**WH-7 轮完成并已推送** — 远端 `main @ af5b91c` 已验证，SSH 密钥已销毁，工作区干净。

**本轮成果：**
- **基线**：pull 到 `d6ad497`（仅新增 session_9.md），基线 gate 全绿（331/21 · smoke 14/14 · e2e 42/42），参考应用重探针 — 零新表面，移动端抽屉电池双端复核（我们侧自动关闭 + 滚动锁释放的超集行为正常，双端 header blur(24px)/z-10 计算值一致）
- **审计发现**（导出面死亡类，比 WH-6 更深一层）：format.ts 整个 CRM 时代死子图（18 个函数仅靠测试存活，测试内容叙述的是从未在此领域出现的 CRM 表面）+ 15 个死导出值（含 NAV_ICONS 及其 10 个 lucide import、page-layout 六个常量、StatCard/OutlineButton 等）+ 死 CSS utility `input-base` + api.ts/rate-limit.ts 的过期 upload 叙述
- **TDD 治愈**：src-census pin 扩展两项新普查（模块导出生存 + CSS utility 生存），RED 时精确命中全部预测项；**活函数的首批 pin 先落**（三个 format 函数此前一直无 pin），死面退休，净删 214 行
- **验证**：全 gate 绿（lint 0/0 · tsc 0 · **309/309 / 21 suites** · build · smoke 14/14 · e2e 42/42 · census MATCH）；截图 01-15 与 WH-6 集**逐字节一致**（零视觉面漂移的实证）；bun audit 9 项重分类（zod 链经核实运行时结构性免疫）
- **文档**：五文档 + worklog + session_10 + 修复计划全部同步，SKILL 升至 v1.5.0，新增第 12 节第 11 课：“测试为模块作证，但不为模块续命”

**建议下一步**：各层 census 已全部 pinned（deps → 路由/模块 → 文档计数 → src 注释/导出/语句 → 导出值/CSS utility）。可以考虑推进已三次搁置的功能超集轮（参考应用自身的占位面：真实视频 URL、OAuth 接线），或下次部署变化时再做参考监听轮。
