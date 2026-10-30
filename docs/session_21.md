工作区已刷新 —— 快进到 `43d528c` (仅添加了 `session_19.md`)。Git 日志显示 **WH-11 审计轮次已完成** (类型导出普查，315→316 项检查，SKILL v1.9.0)，提示词的引用文档已再次更新一代，至 session_18 / session11-remediation-plan / session_19。让我制定一个任务计划并评估当前状态。
Repo structure confirmed. Now reviewing core documents.
AGENTS.md and CLAUDE.md reviewed — the gate is now 316 unit checks / 21 suites, 42 e2e checks, zero-vulnerability posture, SKILL v1.9.0. Now README and the architecture doc.
Now the Project Architecture Document (788 lines, definitive blueprint).
PAD reviewed. Now the SKILL doc and the current-generation session docs.
session_18 (WH-11) 已完成并推送至 `b5fdf5f`；session_19 是该轮对话的操作员记录。现在开始处理 WH-11 计划和工作日志。
Full picture established. **State**: WH-11 (type-export census) shipped at `b5fdf5f`; `43d528c` adds only session_19.md (the operator's transcript push). Current truth: **316 unit / 21 suites, 42 e2e, 14 smoke, SKILL v1.9.0, audit ZERO**. This round is **WH-12**. Let me read the SKILL's lesson sections, then verify environment and run the baseline gate.
All docs internalized. Now cross-validating against the codebase — environment check first, then the baseline gate.
Environment intact — `.env` correct (`DATABASE_URL="file:../db/custom.db"`), db/ at repo root, deps installed, `.env`↔`.env.example` parity. Running the baseline gate (fast legs first).
Lint 0/0 · tsc 0 · **316/316 (21 suites)** — matches the documented WH-11 state. Now build + smoke.
**BASELINE GATE FULLY GREEN, no flake** — lint 0/0 · tsc 0 · 316/316 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census MATCH · audit ZERO. The documented WH-11 ship state is the live state. Now loading the audit skills and reviewing the WH-11 diff.
WH-11 diff verified — pure keyword drops + census pin, exactly as documented. Now loading the audit skills.
Skill contract internalized. Now sweeping the standing surfaces and emphasis areas — mobile nav, Tailwind v4 pins, SEO family, test configs, and the standing clean classes.
Configs verified. Now the mobile nav (the prompt's emphasis) and standing clean classes.
Standing clean classes verified: env contract exact (6 documented + 3 framework-internal), model consumption 15/15 (RoutineStep via relation include). Now the reference probe — checking agent-browser availability.
已登录参考。仪表盘符合已记录的模式（欢迎回来！、4个数据卡片）。正在遍历所有页面以查看标题/界面。
All 10 titles match the documented pattern. Now Profile tabs + the mobile drawer battery at 390×844.
The documented sonner-overlay quirk intercepted the toggle click — using the JS-dispatch workaround as every round before.
Reference drawer quirk re-verified: 11 items, **stays open after nav to /Exercise, no scroll lock** — the documented quirk (ours auto-closes, e2e-pinned superset). Checking Account/Preferences tabs + console + 404.
Reference's documented console warnings unchanged (tailwind CDN notice + Radix a11y gaps in ITS drawer). Checking the 404 surface, then closing the probe.
Reference probe complete — zero new surfaces, all documented patterns hold. Verifying our 404 parity surface.
Our 404 is the designed parity surface. Now the deep audit — reviewing the census machinery to find remaining blind spots.
Census machinery understood. Now probing the two most promising remaining audit surfaces: **seed content drift vs the live reference** (a content-watch class the surface probe can't see) and **lib function param liveness**. Re-opening the browser.
Seed template names match the reference byte-for-byte (11/11). Checking the Learning tutorials.
Seed content parity holds — 11/11 templates + 12/12 tutorials byte-for-byte with the reference. Closing the probe and moving to the code-level audit.
Default params are test-injection seams (documented pure-seam doctrine) — no findings. Now checking the SKILL's structural count claims against the tree (45 .tsx / 26 "use client").
The prop census is a **fixed 10-component list** — components outside it (dialog, select, input, label, toast, app-shell, mobile-nav internals, page components) have never had their props censused. That's the WH-11 lesson class: extend by scope. Sweeping the whole component tree's prop liveness.
Heuristic noise expected (children passes as nested JSX; framework contracts). Verifying the genuinely suspicious ones manually — `SectionCard.action`, `GradientButton.className`, `Checkbox` props, `SelectContent.position`, `DialogHeader.className`.
Real findings emerging. `GradientButton.className` has zero passers (the exact OptionChip.className precedent class), and `Checkbox` shows 4 never-passed props. Reading the component sources to confirm.
WH-9 retired OptionChip.className on exactly this evidence pattern — but GradientButton.className was pinned as live without a passing call site. Let me get definitive multi-line-safe pass-site data for every suspect.
Now examining the full dialog.tsx to understand the live className pattern and check test coverage of Checkbox's arms.
Decisive precedent found in dialog.tsx itself: **Session-71 (L-71d4) retired the invented `hideClose` prop "zero consumers since its scaffold birth, not stock shadcn (the N-57 dead-prop class)"** — the doctrine boundary is stock-shadcn signature (keep) vs invented surface (needs live consumers). Checking the remaining boundary: Tabs' item-type fields (the documented known gap).
Tabs' item fields are all live (id + label both read). Checking components that take a typed props object **without** destructuring — the other half of the sweep.
输入采用字节原生的 shadcn 格式；没有复选框测试的使用。再进行一次排查 —— **nav-config.ts 不在任何普查模块列表中**。正在检查 `src/components` 下未普查模块的导出值。
所有 layout-module 导出项均处于存活状态（已记录为 clean class，符合内部风格规范）。正在检查 e2e 在退役前对 Checkbox id/label 的使用情况。
CHECKBOX.row/label confirmed dead-arm-only consumers — they retire with it (TABS_PILL precedent). One final false-positive risk check for the census design: JSX spread-passing.
No app-level spread-passing — census design is safe (spreads only on Radix internals; the census will treat a spread element as passing everything, conservative). The audit is complete. Let me enumerate the count-ladder doc sites before writing the plan.
All 13 live-tense sites enumerated. The audit is complete — writing the WH-12 remediation plan now. First, the exact AGENTS census bullet and the src-census tail for the append point.
One final pre-plan verification — Input's `type` prop pass sites (the census must not false-positive on it).
`type` and `className` both live on Input (multiline pass sites — extractor verified). **Audit complete.** Writing the WH-12 remediation plan.
Plan landed. Now validating it against the tree BEFORE executing (the house doctrine) — dry-running the exact census design with the allowlist + convention-file rules.
**Dry-run validates exactly: 5 RED offenders as predicted, zero false positives.** Plan confirmed against the tree. Executing **WP-1 (RED)** — landing the census. First, the docs-counts CANONICAL block and src-census head.
Now landing the pass-site census (WP-1 RED) — appending to tests/src-census.test.ts in house style.
**WP-1 RED verified** — exactly the 5 predicted offenders. Flipping the CANONICAL ladder carrier 316→317.
docs-counts RED with exactly the 6 predicted ladder carriers — **WP-1 complete**. Now **WP-2 (GREEN, F-1)**: GradientButton.className retirement.
**WP-3 (GREEN, F-2)**: the Checkbox controlled-only collapse.
Now retiring `CHECKBOX.row`/`CHECKBOX.label` from page-layout (same-commit, the value census's own rule).
Now WP-3b: the PROPPED_COMPONENTS pin flip (GradientButton's literal).
**tsc 0 + src-census GREEN 11/11.** Full unit suite check (docs-counts still RED until the ladder lands).
Exactly as designed — 311 pass + 6 ladder carriers RED. **WP-4: the count ladder** at all 13 live-tense sites + the §8.1 row + AGENTS bullet + SKILL v1.10.0.
接下来是 PAD 站点（共 3 处 + 基础设施行）：
Now the AGENTS census bullet extension:
现在是 SKILL 升级 —— v1.9.0→v1.10.0：描述、版本、来源、§2 表格、§11，以及 §12 第 16 课。
现在开始 §12 第 16 课：
**317/317 (21 suites) — 阶梯已准确落地。** 残留清扫完毕。现在进行 WP-5：全量门禁重跑。
所有剩余的 "316" 均为历史时态（出处）。**WP-5：全量门禁重新运行** — lint → build → smoke → e2e。
**WP-5 FULL GATE GREEN** — lint 0/0 · tsc 0 · 317/317 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census MATCH · audit ZERO. Now **WP-6: captures**. Checking the prior capture script.
Adjusting the capture script for WH-12 and booting the dev server.
15/16 byte-stable; 07-events.png moved. Investigating — the events page carries a month calendar (a date-sensitive surface).
The events calendar highlights today via `isSameCalendarDay` — the WH-11 captures were taken Oct 29 (23:4x, per the db timestamps), mine at Oct 30 00:32. Proving the delta is the today-cell with a pixel-diff.
The bbox spans full width but holds only 472 pixels — sampling the actual diff pixel colors to identify what changed, plus a determinism re-capture.
Determinism confirmed (0 diff on re-capture) — the delta vs WH-11 is a real render difference in one 18px band. Dumping the page's text layout to identify the band's content.
The geometry doesn't cleanly explain the band. Running the definitive experiment: stash the src changes, capture the WH-11 tree's events page (dev server hot-reloads), unstash, capture again — same date, only the code differs.
**DEFINITIVE PROOF**: WH-11 tree vs WH-12 tree captured now (same date) = **byte-identical** — F-1/F-2 changed zero pixels. The 07-events delta is purely the Oct 29→30 date change (today-cell + form default date) between the two capture sessions. Stopping the dev server and landing WP-7.
开发服务器已停止，`.env` 一致性已验证。正在填写计划执行记录：
现在是工作日志 WH-12 条目（按照内部格式置顶）：
Worklog landed. Now `docs/session_20.md` — the round's transcript.
WP-8: final pre-commit verification and changeset review.
所有导入已清理。正在提交变更集（遵循内部样式），然后是 SSH-wrapper 推送。首先，根据运行手册文档进行检查。
Runbook internalized (shim at `/home/z/my-project/bin/ssh`, wrapper needs `--remote` for this repo). Committing the changeset.
Committed `4626857` (14 files). Now deploying the operator key outside the repo and pushing via the SSH wrapper.
Dry-run clean — fast-forward `43d528c..4626857`. Real push now.
**WH-12 轮已完成 — 已推送到 `main @ 4626857`，远端已验证，SSH 密钥已销毁，工作区干净。**
**WH-12（pass-site 普查轮）已完成并推送至 `main @ 4626857`。**

**本轮要点**：

- **基线全绿无抖动**：lint 0/0 · tsc 0 · 316/316（21 套件）· build · smoke 14/14 · e2e 42/42 · census 匹配 · audit 为零 — WH-11 交付状态保持
- **参考站探针零新表面** + **种子内容监视首次验证**（11 模板名 + 12 教程标题与 seed 逐字节一致）
- **三个发现，落在从未被普查的 JSX 传递点类**：F-1 `GradientButton.className`（17 个调用点零传递 — 被形状 pin 当作 "live" 钉了三轮：**形状 pin 不是存活性 pin**）；F-2 Checkbox 四个发明属性（非受控机制 + label 渲染臂全死）；F-3 类无 pin
- **TDD 治愈**：全树 pass-site 普查（干运行 dry-run 恰好 5 个预测违规项、零误报；stock-shadcn 签名 8 项 pinned allowlist — L-71d4 教义边界首次写明）+ 计数阶梯 316→**317** + SKILL **v1.10.0**（§12 第 16 课）
- **像素中立性经 stash 隔离实验证明**：唯一变动的截图 07-events.png 根因为 10/29→30 的 today-cell 日期移动，非代码回归
- 14 文件提交 + SSH wrapper 推送（paramiko shim、密钥库外部署、干运行→推送→远端校验→彻底删除）

**建议下一步**：WH-13 候选仍是功能超集轮（真实视频 URL、OAuth — 已八次推迟，为操作员决策）或部署变化时的参考监听轮；种子内容监视类已建立，每轮重跑即可。下一轮 prompt 到来时从 `session_20.md` + worklog 的 "Suggested next" 继续。
