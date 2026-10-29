# Session 18 — WH-11: the type-export census round

Remote is at `3826a3e` — WH-10 shipped at `b5628f2` (the docs-counts pin-gap round: the §8.1 row-arithmetic pin, the compound-spelling forbidden form, SKILL v1.8.0), and session_17.md (the operator's WH-10 transcript push) is the only new file. The workspace pulled cleanly; the tree is byte-identical to the WH-10 ship state apart from that doc. The five core docs re-read in full (SKILL at v1.8.0), session_16 + the session10 plan + the worklog + session_17 reviewed, and the environment verified intact (deps, `.env`, `db/`, bun 1.3.14, `.env` ↔ `.env.example` parity).

**The baseline gate came back fully GREEN, no flake** — lint 0/0 · tsc 0 · 315/315 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census MATCH · `bun audit` ZERO. The documented WH-10 ship state is the live state.

The live reference re-probed (agent-browser, logged in as the demo account): all 10 nav pages + Profile walked — **ZERO new surfaces since WH-10**; every title in the documented pattern (Dashboard ships the bare "EvolveWell"); the Profile tabs unchanged (Appearance 3 modes + 8 presets; Account read-only ×3; Preferences 2 checkboxes); the custom 404 ("Page Not Found" / "Go Home") re-verified — ours ships the designed parity surface; the mobile drawer battery at 390×844 re-verified (11 items; the reference's drawer STAYS OPEN after a drawer-nav to /Exercise with no scroll lock — its documented quirk; ours AUTO-CLOSES + releases, the e2e-pinned superset); the sonner-overlay quirk again intercepted its own toggle click (the JS-dispatch workaround, as every round); the reference's own console carries its documented warnings (the tailwind CDN notice + the Radix DialogTitle/Description a11y gaps in ITS drawer).

Both standing clean classes (the WH-10 worklog's WH-11 candidates) swept and verified **clean**: model-consumption (all 15 Prisma models consumed — RoutineStep's model via the routine-templates route's relation include, UserPrefs's model via the prefs route's generated client) and env-contract (src reads exactly the six documented vars + three framework-internal; parity holds).

The audit then turned to the one declaration surface no census reads: **the TYPE layer**. Every pin in the tree reads value declarations (`export function/const` — the WH-7 value census), export-block NAMES (the WH-8 ui census), destructured props (WH-9), or member accesses (WH-8/WH-9) — the `export type`/`export interface` form sailed through five census-extension rounds uncensused. Four findings:

- **F-1 (the dead interface):** `UserPrefs` in src/types/index.ts — 13 lines, ZERO consumers (nothing imports it; nothing in-module references it). The prefs route types through the generated Prisma client + `prefsSchema`; the prefs client surface lives in the theme store's own state. The interface is the orphan of WH-8's store-slice retirement — its would-be consumer was the dead `prefs` slice.
- **F-2 (the dead keywords):** twenty same-module-only exported types — the declarations are alive (they type their modules' own functions/state/maps) but no file anywhere imports them by name: the WH-8 data-feed doctrine's type form. ToastVariant, ToastItem · ApiError, ApiResult, BoundedJson · SessionPayload · BootEnvReport · ChunkStorage, ReloadDeps · OptionMeta, ColorPreset · RateLimitResult · BadgeCounts, ReminderStatus · ThemeMode, ThemeState, ThemeData · AchievementsData, WellnessState · RoutineStep.
- **F-3 (the missing pin):** nothing tests the class.
- **F-4 (the same-commit consequence):** the WH-6 `API_EXPORTS` canonical set pins the three api types — the cure forces the 12→9 redistribution under the pin's own count-ladder rule.

The plan written and validated against the tree BEFORE executing (`docs/plans/2026-10-30-session11-remediation-plan.md`) — and the validation caught **two corrections before any code moved**: (a) the audit's first census pass had counted the src-census pin's own narration text as consumption (the pin names `WellnessState`/`ThemeState`/the api trio in its machinery), hiding five of the twenty F-2 offenders — the corrected corpus excludes the pin's own file (the WH-7 SELF rule); (b) the fixed 13-module census list was replaced by a **whole-tree walk** (103 modules, 39 declarations, 21 offenders, zero false positives — framework contracts need no exported types, so the walk needs no list, and a new module exporting types is covered at birth).

**WP-1 (RED):** the type-liveness census landed in `tests/src-census.test.ts`; CANONICAL flipped 315→316 in the same step. RED verified with exactly the 21 predicted offenders; docs-counts RED with exactly the 6 ladder carriers.

**WP-2/WP-3/WP-3b (GREEN):** the dead interface retired (13 lines); all twenty `export` keywords dropped (each verified exactly-once; the declarations stay, module-private) — **tsc 0 on the first run**, the compile-time-only prediction held; the member-census extraction regexes match without the export prefix (verified pre-plan), so the WH-8/WH-9 pin machinery survived the drops. `API_EXPORTS` redistributed 12→**9**; the check title and AGENTS' "pinned live twelve" narration flipped with it.

**WP-4 (the ladder):** 315→316 at all 13 live-tense sites (README ×4 · AGENTS commands + gate order · CLAUDE ×2 · PAD §7.1 tree + §8.1 totals + §9.3 pre-ship · SKILL §2 + §11); PAD §8.1's infra row 117→**118** (109+89+118=316 — the WH-10 row-arithmetic pin green at the new truth); AGENTS' census bullet extended; SKILL v1.8.0→**v1.9.0** (description + provenance + §12 lesson 15: "census regexes see only the declaration forms they were written for — and a census must never consume its own narration").

**WP-5 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit **316/316 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census MATCH · `bun audit` ZERO.

**WP-6 (captures):** all 16 re-taken from the dev server (01 pristine login first; the goals capture at the 2500ms settle; the drawer walk live-verified during capture 16 — the auto-close proof: the portal unmounted, zero role=dialog at /Exercise). md5: 16 unique, **16/16 byte-identical to the WH-10 set** — zero visual surface moved, exactly as predicted for compile-time-only surgery. `.env` ↔ `.env.example` parity re-verified.

WP-7: the worklog WH-11 entry + the plan's execution record + this transcript. WP-8: commit to main + the SSH-wrapper push (paramiko shim; key outside the repo; dry-run → push → remote verify → shred).

**WH-11 轮完成** — 计数阶梯 **315→316** 精确落地，SKILL 升至 v1.9.0。

**本轮成果：**
- **基线全绿无 flake**：lint 0/0 · tsc 0 · 315/315 (21 suites) · build · smoke 14/14 · e2e 42/42 · census MATCH · audit ZERO —— WH-10 的治愈在新运行下保持
- **两个 standing clean class 验证为净**：模型消费普查（15/15 存活 —— RoutineStep 经关系 include 消费、UserPrefs 的模型经生成客户端消费）与环境契约普查（六个文档化变量精确对等）
- **四个发现，全部落在从未被普查的 TYPE 声明类**：F-1 死亡的 UserPrefs 域接口（WH-8 store-slice 退休的孤儿，13 行零消费者）；F-2 二十个仅同模块消费的导出类型（声明存活、export 关键字死亡 —— WH-8 data-feed 教义的类型形态）；F-3 类无 pin；F-4 治愈强制 API_EXPORTS 12→9 同提交重分布
- **计划落地前验证纠正了审计自身两次**：首轮普查把 pin 自己的叙述文本计为消费（藏了 5 个 offenders —— WH-7 SELF 规则的再证明）；固定模块清单换成全树遍历（103 模块、零误报、新模块出生即覆盖）
- **验证**：全门绿（lint 0/0 · tsc 0 · **316/316 / 21 suites** · smoke 14/14 · e2e 42/42 · census MATCH · audit ZERO）；截图 16 张与 WH-10 集逐字节一致（纯编译期手术，零运行时字节移动）

**建议下一步**：普查层现已覆盖全部 VALUE 与 TYPE 声明形式（function/const、export 块、type/interface、props、members、utilities、routes、docs 计数 + 行算术、deps + lockfile resolutions）。WH-12 候选：第八次推迟决策的功能超集轮（真实视频 URL、OAuth 接线 —— 本轮再次核实为参考站自身的 intentional-parity 占位表面），或部署变化时的参考监听轮。剩余未普查的声明形式（export default = 框架契约；vendored tw-animate 内的 CSS @property/@keyframes）已由其他机制钉住或 vendored。
