# Session 20 — WH-12: the pass-site census round

Remote is at `43d528c` — WH-11 shipped at `b5fdf5f` (the type-export census round: the whole-tree exported-type liveness pin, the API_EXPORTS 12→9 redistribution, SKILL v1.9.0), and session_19.md (the operator's WH-11 transcript push) is the only new file. The workspace pulled cleanly; the tree is byte-identical to the WH-11 ship state apart from that doc. The five core docs re-read in full (SKILL at v1.9.0), session_18 + the session11 plan + the worklog + session_19 reviewed, and the environment verified intact (deps, `.env` with `DATABASE_URL="file:../db/custom.db"`, `db/` at the repo root with custom/e2e/smoke, bun 1.3.14, `.env` ↔ `.env.example` parity).

**The baseline gate came back fully GREEN, no flake** — lint 0/0 · tsc 0 · 316/316 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census MATCH · `bun audit` ZERO. The documented WH-11 ship state is the live state.

The live reference re-probed (agent-browser, logged in as the demo account): all 10 nav pages + Profile walked — **ZERO new surfaces since WH-11**; every title in the documented pattern (Dashboard ships the bare "EvolveWell"); the Profile tabs unchanged (Appearance 3 modes + 8 presets; Account read-only; Preferences 2 checkboxes); the custom 404 re-verified; the mobile drawer battery at 390×844 re-verified (11 items; the reference's drawer STAYS OPEN after a drawer-nav to /Exercise with no scroll lock — its documented quirk; ours AUTO-CLOSES + releases, the e2e-pinned superset); the sonner-overlay quirk again intercepted its own toggle click (the JS-dispatch workaround, as every round); the reference's own console carries its documented warnings.

**NEW this round — the seed-content watch (a clean class verified for the first time):** the reference's 11 routine-template names and 12 tutorial titles were extracted from the live DOM (the difficulty-badge-preceding walk on /Routines; the img-alt walk on /Learning) and compared against `prisma/seed.ts` — **byte-for-byte parity on all 23 content names**. The seed data class had never been re-verified against the live reference since WH-1; a content edit on the reference's side would be invisible to every surface probe.

The standing clean classes re-verified: env-contract exact (six documented vars + three framework-internal), model-consumption 15/15 alive. The layout-module export sweep (nav-config + sidebar) found everything alive — documented as a clean class, not pinned (the house doctrine: pins land when a finding lands). The Tabs item-type fields both read (the documented WH-9 boundary holds).

The audit then turned to the one consumption surface no census reads: **the JSX PASS SITES**. The WH-9 prop census pins the destructured SHAPE of a fixed ten-component set — a surface pin, not a liveness pin. A whole-tree pass-site probe (33 component definitions walked with a balanced JSX attribute scanner) surfaced three findings:

- **F-1 (the pinned-but-dead prop):** `GradientButton.className` — zero pass sites across all 17 call sites in 9 files. The exact OptionChip.className precedent (same file, same cn-merge pattern — retired at WH-9), and the WH-9 `PROPPED_COMPONENTS` pin has carried it as "live surface" for three rounds: the pin pinned the shape, and a prop with zero passers rode inside it.
- **F-2 (the invented arms):** Checkbox's `className`/`defaultChecked`/`label`/`id` — never passed at the only two call sites (both controlled: `checked` + `onCheckedChange`, `aria-label` riding the spread, the wrapping parent `<label>` associating without an id). The dead machinery: the entire uncontrolled arm (useState + isControlled + setUncontrolled), the label-render arm (htmlFor + `CHECKBOX.row`/`CHECKBOX.label`), and `React.useId`/`inputId`. Stock shadcn's Checkbox carries no `label` prop — invented surface, the Session-71 `hideClose` class.
- **F-3 (the missing pin):** nothing tests the class — the cure is the whole-tree pass-site census.

**The stock-API boundary was drawn explicitly** (the L-71d4 doctrine made load-bearing): byte-stock shadcn wrapper SIGNATURES keep their shape — `Label.className`, the Dialog family's five never-customized classNames, `SelectContent`'s className+position, `SelectItem`'s className — pinned as an 8-entry allowlist (a conscious keep; `DialogContent.className` and `SelectTrigger.className` are LIVE customization seams). Invented surface — hand-rolled components like GradientButton and Checkbox — needs live passers.

The plan written and validated against the tree BEFORE executing (`docs/plans/2026-10-30-session12-remediation-plan.md`) — the census dry-run (the exact extractor + the three exemption classes, as a scratch script) returned **exactly the predicted 5 offenders, zero false positives**.

**WP-1 (RED):** the pass-site census landed in `tests/src-census.test.ts`; CANONICAL flipped 316→317 in the same step. RED verified with exactly the 5 predicted offenders; docs-counts RED with exactly the 6 ladder carriers.

**WP-2/WP-3/WP-3b (GREEN):** GradientButton's className retired (the merge collapsed to the bare constant); the Checkbox collapsed to controlled-only (both live props required — the `cols` doctrine); `CHECKBOX.row`/`CHECKBOX.label` retired from page-layout in the same commit (the TABS_PILL/EMPTY_STATE.title precedent); `PROPPED_COMPONENTS`'s GradientButton literal flipped to `[children]`. **tsc 0 on the first run**; src-census GREEN 11/11.

**WP-4 (the ladder):** 316→317 at all 13 live-tense sites (README ×4 · AGENTS commands + gate order · CLAUDE ×2 · PAD §7.1 tree + §8.1 totals + §9.3 pre-ship · SKILL §2 + §11); PAD §8.1's infra row 118→**119** (109+89+119=317 — the row-arithmetic pin green at the new truth); AGENTS' census bullet extended; SKILL v1.9.0→**v1.10.0** (description + provenance + §12 lesson 16: "a surface pin is not a liveness pin — pin the pass sites, and draw the stock-API boundary explicitly").

**WP-5 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit **317/317 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census MATCH · `bun audit` ZERO.

**WP-6 (captures):** all 16 re-taken from the dev server (01 pristine login first; the goals capture at the 2500ms settle; the drawer walk live-verified during capture 16 — the auto-close proof: the portal unmounted, zero role=dialog at /Exercise). md5: 16 unique, **15/16 byte-stable vs the WH-11 set; the one mover (07-events.png) root-caused to the DATE, not the code** — the WH-11 set was captured Oct 29 ~23:45, this round's at Oct 30 ~00:32, and the events calendar's today-cell highlight (`isSameCalendarDay`) moved 29→30 with the form's default date (`todayIso()`). The **stash-isolation experiment proved it**: the WH-11 tree (git-stashed, dev server hot-reloaded) and the WH-12 tree captured now at the same date are **byte-identical** (md5 `9a718af1`), and a same-minute determinism re-capture diffed 0 pixels — F-1/F-2 changed zero pixels, exactly as predicted. `.env` ↔ `.env.example` parity re-verified.

WP-7: the worklog WH-12 entry + the plan's execution record + this transcript. WP-8: commit to main + the SSH-wrapper push (paramiko shim; key outside the repo; dry-run → push → remote verify → shred).

**WH-12 轮完成** — 计数阶梯 **316→317** 精确落地，SKILL 升至 v1.10.0。

**本轮成果：**
- **基线全绿无 flake**：lint 0/0 · tsc 0 · 316/316 (21 suites) · build · smoke 14/14 · e2e 42/42 · census MATCH · audit ZERO —— WH-11 的治愈在新运行下保持
- **种子内容监视首次验证**（新 clean class）：参考站 11 个模板名 + 12 个教程标题与 prisma/seed.ts **逐字节一致**（WH-1 以来种子数据类首次对照活参考站复核）
- **三个发现，全部落在从未被普查的 JSX 传递点类**：F-1 GradientButton.className（17 个调用点零传递 —— OptionChip 先例同类、同文件；被 WH-9 形状 pin 当作 "live" 钉了三轮：**形状 pin 不是存活性 pin**）；F-2 Checkbox 的四个发明属性（非受控机制 + label 渲染臂 + CHECKBOX.row/label 全部死亡 —— Session-71 hideClose 的"非 stock 发明面"类）；F-3 类无 pin
- **stock-API 边界首次写明**（L-71d4 教义承载化）：byte-stock shadcn 包装签名保持原形（8 项 pinned allowlist —— Dialog 家族五个 className、SelectContent 的 className+position、SelectItem/Label 的 className），发明面必须活传递
- **计划落地前 dry-run 精确验证**：恰好 5 个 offender、零误报；**stash 隔离实验证明代码改动了零像素**（唯一变动的 07-events.png 根因为日期 29→30 的 today-cell 移动，非代码回归）
- **验证**：全门绿（lint 0/0 · tsc 0 · **317/317 / 21 suites** · smoke 14/14 · e2e 42/42 · census MATCH · audit ZERO）

**建议下一步**：普查层现已覆盖全部 VALUE 与 TYPE 声明形式 + JSX 传递点消费形式。WH-13 候选：第九次推迟决策的功能超集轮（真实视频 URL、OAuth 接线 —— 本轮再次核实为参考站自身的 intentional-parity 占位表面），或部署变化时的参考监听轮（种子内容监视类已建立，每轮重跑）。剩余未普查的声明形式（export default = 框架契约；vendored tw-animate 内的 CSS @property/@keyframes）已由其他机制钉住或 vendored。
