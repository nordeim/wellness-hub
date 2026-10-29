# Session 16 — WH-10: the docs-counts pin-gap round

Remote is at `664c276` — WH-9 shipped at `6978534` (the component-prop/member censuses, the goals-e2e determinism cure, SKILL v1.7.0), and session_15.md (the operator's WH-9 transcript push) is the only new file. The workspace pulled cleanly; the tree is byte-identical to the WH-9 ship state apart from that doc. The five core docs re-read in full (SKILL at v1.7.0), session_14 + the session9 plan + the worklog + session_15 reviewed, and the environment verified intact (deps, `.env`, `db/`, bun 1.3.14).

**The baseline gate came back fully GREEN, no flake** — lint 0/0 · tsc 0 · 314/314 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census MATCH · `bun audit` ZERO. The WH-9 step-assertion cure holds under a fresh run; the documented ship state is the live state.

The live reference re-probed (agent-browser, logged in as the demo account): all 10 nav pages + Profile walked — **ZERO new surfaces since WH-9**; every title in the documented pattern; the Appearance tab unchanged (3 modes, 8 presets, the custom hex pair); the mobile drawer battery at 390×844 re-verified (11 items; the reference's drawer STAYS OPEN after a drawer-nav to /Exercise with no scroll lock — its documented quirk; ours AUTO-CLOSES + releases, the e2e-pinned superset); the sonner-overlay quirk again intercepted its own toggle click (the JS-dispatch workaround, as every round); the reference's own console carries its documented warnings (the tailwind CDN notice + the Radix DialogTitle/Description a11y gaps in ITS drawer — ours compiles Tailwind properly and the drawer carries titles). "Continue with Google" present on both logins.

The audit, per the repo's own skills (the web-application contract's count-claims doctrine; `skills/` excluded), turned inward — the census layers now reach every surface class from deps to props, so this round audited **the pin that guards the docs**. Three findings, all in the docs-count class:

- **F-1 (the compound spelling):** PAD carries "the 14-model domain" LIVE-TENSE at §3.2:58 and §12:758 while the schema has 15 models. The WH-5 round that cured this class fixed the spaced spelling ("14 models" → forbidden form) and PAD §4.1's spelled-out heading — but the compound-adjective form escaped both the cure and the list, and survived five audit rounds inside the pin's own home doc.
- **F-2 (the row arithmetic):** PAD §8.1's infra row carries 138 checks where the tree's truth is 116. Root-caused via `git log -L`: the row was never decremented at WH-7 (the −22 retirement that took the suite 331→309 decremented the pinned TOTAL but nobody recomputed the ROW), and WH-8/WH-9 hand-incremented the stale base (133→136→138). The totals line (314) is pinned and correct — the row-level arithmetic is unpinned and drifted. The auth row (6/109) and wellness row (5/89) re-verified correct; the five e2e rows re-verified correct (11+6+6+18+1=42).
- **F-3 (the missing pin):** nothing verifies the §8.1 table's rows sum to the pinned totals — a distribution table whose rows don't sum is a lie with a true bottom line.

The plan written and validated against the tree BEFORE executing (`docs/plans/2026-10-30-session10-remediation-plan.md` — the row-extraction dry-run predicted exactly 336/21 unit sums, the 42 e2e sum, the two compound sites, and the infra truth of 116; the decisions: arithmetic over per-row presence so a legitimate redistribution never trips; the forbidden form at the drift phrase; the infra row cures to 117 — the new check itself rides docs-counts.test.ts, an infra file; the ladder 314+1 = 315 / suites stay 21; the session file is session_16.md).

**WP-1 (RED):** the two pin extensions landed in `tests/docs-counts.test.ts` — the §8.1 row-arithmetic check (unit rows' files/checks + e2e rows' checks must sum to the canonical totals; the bare-number cell parse is a split-on-pipe, because adjacent `| N | M |` cells share a pipe a consuming regex loses every second cell — caught in the pre-landing dry-run) and the new forbidden form. CANONICAL flipped 314→315 in the same step. RED verified with exactly the predicted failures: the row-arithmetic check 336 ≠ 315 (the F-2 drift caught at birth), the forbidden-forms check naming PAD's two compound sites, the five per-doc claim checks carrying the ladder RED.

**The pin then taught its own lesson twice.** First, the bare `"14-model"` prefix form false-positived on the SKILL's own legitimate WH-5 history narration ("the 14-models count") — the flat substring scan cannot distinguish history from claims, so the form re-pinned at the drift PHRASE (`"14-model domain"`). Then, after the ladder landed, the SKILL's own new lesson 14 — which quoted the forbidden forms verbatim to narrate them — tripped the check on itself. A doc cannot QUOTE a forbidden form; the narration re-worded to describe without spelling, and that rule became the lesson's final clause.

**WP-2/WP-3 (GREEN):** both PAD compound sites cured to "the 15-model domain"; the infra row cured to `| 10 | 117 |` (the tree's 116 + this round's new check, with the row's category list naming the row-arithmetic check). Row arithmetic GREEN: 109+89+117 = 315.

**WP-4 (the ladder):** 314→315 at all 13 live-tense sites (README ×4 · AGENTS commands + gate order · CLAUDE ×2 · PAD §7.1 tree + §8.1 totals + §9.3 pre-ship · SKILL §2 + §11); AGENTS' docs-counts bullet carries the WH-10 extension note; SKILL v1.7.0→**v1.8.0** (description + provenance + §12 lesson 14: "a pin's blind spots are finding classes of their own"). docs-counts GREEN 10/10.

**WP-5 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit **315/315 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census MATCH · `bun audit` ZERO.

**WP-6 (captures):** all 16 re-taken from the dev server (01 pristine login first; the goals capture at the WH-9 2500ms settle; the drawer walk live-verified during capture 16 — the auto-close proof: the portal unmounted, zero role=dialog at /Exercise). md5: 16 unique, **16/16 byte-identical to the WH-9 set** — zero visual surface moved, exactly as predicted for two doc cells + a test file. `.env` ↔ `.env.example` parity verified (identical except `AUTH_SECRET` — the designed state).

WP-7: the worklog WH-10 entry + the plan's execution record + this transcript. WP-8: commit to main + the SSH-wrapper push (paramiko shim; key outside the repo; dry-run → push → remote verify → shred).

**WH-10 轮完成** — 远端 `main` 已验证，SSH 密钥已销毁，工作区干净。

**本轮成果：**
- **基线全绿无 flake**：lint 0/0 · tsc 0 · 314/314 (21 suites) · build · smoke 14/14 · e2e 42/42 · census MATCH · audit ZERO —— WH-9 的步骤断言治愈在全新运行下保持
- **审计转向"守门人本身"**：三个发现全部落在 docs-count 类 —— F-1 连字符复合词 "14-model domain" 在 PAD §3.2/§12 存活了五轮（WH-5 治愈了空格与拼写形式，唯独漏掉复合形容词形式）；F-2 §8.1 infra 行 138 vs 真值 116（git log -L 根因：WH-7 的 −22 只减了被钉住的总数，没人重算行，三轮后续在错误基数上手加）；F-3 行级算术无 pin
- **TDD 治愈 + pin 的自我教育**：行算术检查（行必须加和到 canonical 总数 —— 合法重分布不误报，算术错误必报；split-on-pipe 解析修复了相邻单元格共享管道的吞噬问题）；pin 在落地过程中两次纠正自身 —— 裸前缀形式误伤了 SKILL 自己的合法历史叙述（改为钉住漂移短语），随后 SKILL 自己的第 14 课因逐字引用禁用形式而触发检查（叙述改为描述而不拼写 —— 该规则成为第 14 课的收尾条款）
- **计数阶梯 314→315** 精确落地（13 个 live-tense 站点 + SKILL v1.8.0）
- **验证**：全门绿（lint 0/0 · tsc 0 · **315/315 / 21 suites** · smoke 14/14 · e2e 42/42 · census MATCH · **audit ZERO**）；截图 16 张与 WH-9 集逐字节一致

**建议下一步**：普查层现已覆盖总数与行算术、全部三种计数拼写、以及从依赖到 props 的每一类表面。WH-11 候选：第七次延迟的功能超集轮（真实视频 URL、OAuth 接线）、模型普查/env 契约 pin 轮（若该清类出现发现才启动）、或部署变化时的参考监听轮。
