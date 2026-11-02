# Session 91 — WH-47 (the thirteenth parity surface round)

The workspace was RESET this session — fresh `git clone` to `fd96add` (main, clean; the WH-46 ship `2466037` + the operator's session_90 log push). The environment rebuilt from scratch: `bun install` (bun 1.3.14), `bunx playwright install chromium` (1248 — the sandbox cache carried 1200 only, the known first-run gap the WH-44 record documents), `.env` copied from `.env.example` with a fresh 64-hex AUTH_SECRET, `db:push` + `db:seed` + census MATCH (1/11/50/12/8 + 1 mood row). Per the WH-46 plan's suggested-next, this round is WH-47 (the driving instruction's session_89/session46-plan/worklog/session_90 set).

The five docs (AGENTS, CLAUDE, README, PAD, SKILL v1.44.0) + session_89 + the session46 plan + the worklog WH-46 entry + session_90 read and validated against the tree. The instruction's checklist items verified: the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"` → the repo-root `db/`), `.env.example` tracked and accurate, the vitest/playwright configs (375/72, the e2e db PINNED), the sitemap/robots/manifest route handlers (the smoke's ok-12 leg all 200 + the CONTENT re-verified live: the 14-url set + the 1.0/0.8 priorities, the robots directives, the manifest fields), the Tailwind v4 pins, the mobile drawer battery — re-run explicitly per the instruction's emphasis (8/8).

**The baseline gate re-run live, all green at the exact WH-46 ship state**: lint 0/0 · tsc 0 · unit 375/375 (26 suites) · build OK · smoke 14/14 · e2e 72/72 · census MATCH · bun audit zero. The WH-46 changes audited (Mode C): `scripts/parity-authviews.mjs` — the zero-login walk, the text-content anchors, the normalizations, the PINNED class, the budget discipline — all standing, clean; the watch ledger correctly re-based.

**Watch round 36 — a genuine js MOVED: the TWENTY-FIRST distinct bundle** (`/static/index-l0vUUttr.js` → `/static/index-OLDXOew4.js`; the CSS content hash STABLE at `index-CapATpwD.css` for the FOURTH consecutive round). The same-run digest **15/15 MATCH on the new bundle**. The ledger re-based on the js axis, born-verified BOTH outcomes.

**The standing battery's ninth full-width run — all TWELVE legs green** (paced across login windows; our dev server's own per-IP login limiter tripped mid-window — the WH-42 F-4 class's second instance, the decode's DEBUG flights spending the same budget; the dev server restarted per the lesson-46 doctrine, the three pending legs re-run paced): login 34/34 · moodForm 20/20 (one transient first-flight timeout, lesson 45) · shell 61/61 (the drawer battery) · dashboard 105/105 · headers 192/192 · toolbars **114/114** (the widened surface) · kpis 315/315 · routines 697/697 · tutorials 790/790 · profile 433/433 · account 146/146 · authviews 192/192 — **3,387 computed members live-vs-live, zero manual evals**.

The WH-47 remediation plan written + validated against the tree before executing (docs/plans/2026-11-02-session47-remediation-plan.md).

**The round's core — the module toolbars' CARD WRAPPER (F-1), decoded live then cured TDD-style.** The thirteenth-surface decode (the WH-46 plan's four (c) candidates, one reference flight + one our-side flight + three isolation probes) caught a 48px y-offset on the sr special empty card (ref y=252 vs ours y=204); the isolation probes root-caused it: **the reference wraps BOTH consumer toolbars (StudyResources + Learning) in the card chrome** (`rounded-xl border bg-card text-card-foreground border-none shadow-lg` + `p-6`; h=84 = the 36px row + 2×24px; radius 12px; white bg; shadow-lg) where ours rendered the bare flex row — a real rendered-face drift that EIGHT green full-width battery runs read around (the interior-anchored member sets never read the wrapper: the lesson-48 blind-spot class). Cured TDD-style: the WH-24 module-toolbar census widened RED-first (4 failures) → `TOOLBAR.card` born in `src/lib/page-layout.ts` (the SECTION_CARD chrome family + p-6) + the two consumer pages wrapped → GREEN (the count ladder FLAT at 375 — the widening rides the existing it() block). **parity-toolbars widened with 16 wrapper members** (98 → 114; the card chrome + the real-layers shadow + h=84 + the rendered row offsets 24/24 — the padding as GEOMETRY; the card anchor CLIMBS to the chrome because the reference nests the row inside a p-6 content div at a different DOM depth — the first widened flight caught that split itself), born-verified 114/114 ×2 on the cured tree.

**F-2 the serialization class**: the feed row's `transitionProperty` — the reference's CDN six-property v3 list vs our v4's ten-property expansion (both apps author the same `transition-colors`; the property only renders during a hover transition — the at-rest no-render class). PINNED at both apps' own documented values; no src cure.

**The THIRTEENTH SURFACE — `scripts/parity-listinteriors.mjs`**: the dashboard's Recent Activity feed interior + the exercise zero-row empty + the sr special empty card + the goals Achievements empty state — **88 members (87 MATCH + 1 PINNED)**, ONE login per app, FOUR routes, ZERO-WRITE; the card anchor matches `div, section` (our SectionCards are `<section>` elements — the semantic superset). Born-verified **88/88 ×3 consecutive flights** — the sr y-ladder members (252/332/412) verified the F-1 cure live on both apps.

The capture round: the EIGHTEENTH cross-round byte comparison — **30/34 byte-stable, FOUR movers ALL root-caused as the F-1 cure's deliberate our-side face changes** (08-studyresources + 10-learning = the wrapper's primary face; 30-tutorial-card-hover + 33-sr-form-interior = the below-fold 48px ladder shift; the interiors themselves byte-pinned by the standing surfaces); the ledger re-based, verified 0 mismatches, census MATCH after.

The docs ladder: PAD §11 (the F-1 cure row + the F-2 row + the thirteenth-surface row + the watch row's round-36 record), AGENTS (round 36 + the THIRTEEN-script battery), SKILL v1.44.0 → **v1.45.0** (the parity row widened to THIRTEEN surfaces), README/CLAUDE (no count sites — the ladder flat), the worklog WH-47 entry, the plan + its execution record, this log. The count ladder FLAT at 375; the docs-counts lockstep green.

The full gate re-run GREEN on the final tree; the scratch probes deleted (zero residue); the commit + the SSH-wrapper push.

## WH-47 轮次总结

**基准**：全新 clone 至 `fd96add`（本会话沙箱重置）；环境从零重建（bun 1.3.14 · chromium 1248 重装——已知首轮缺口 · 新 AUTH_SECRET · db push/seed · census MATCH）。基准门禁全绿复现 WH-46 发版态（lint 0/0 · tsc 0 · **375/375** · build OK · 14/14 · **72/72** — 移动端导航 8/8 显式重跑 · census MATCH · audit 零）。指令清单逐项核验（.env/db 契约、.env.example、vitest/playwright、sitemap/robots/manifest 内容层加验、Tailwind v4 钉、抽屉电池）。WH-46 变更审计通过（parity-authviews 结构/锚点/钉类全站立）。

**Watch 第 36 轮：js 轴再动**——第 21 个 bundle（`l0vUUttr` → `OLDXOew4`；css 连续第四轮稳于 `CapATpwD`）。同行摘要 **15/15 MATCH**；账本重基，双态出生验证。

**常设电池第九次全宽（十二腿，3,387 成员）**：我方 dev server 登录限流器中途触发（WH-42 F-4 类第二次实例——解码调试飞行与电池共用预算；按 lesson 46 重启 + 配速补跑后全绿）：login 34/34 · moodForm 20/20 · shell 61/61（抽屉电池） · dashboard 105/105 · headers 192/192 · **toolbars 114/114（拓宽后）** · kpis 315/315 · routines 697/697 · tutorials 790/790 · profile 433/433 · account 146/146 · authviews 192/192。

**F-1 本轮核心——模块工具栏的卡片包装层**：sr 页 y 阶梯 48px 偏移（参考站 252 vs 我方 204）触发解码；隔离探针定位根因：**参考站两个工具栏页面（StudyResources + Learning）的工具栏都包裹在卡片铬层内**（rounded-xl + bg-card + border-none + shadow-lg + p-6，h=84 = 36px 行 + 双 24px 垫；半径 12px、白底、shadow-lg），我方此前八轮全绿电池一直渲染裸 flex 行——内部锚定的成员集从未读过包装层（lesson-48 盲区类）。TDD 治愈：WH-24 工具栏 census 先红（4 失败）→ `TOOLBAR.card` 落地（SECTION_CARD 铬系 + p-6）+ 两页包装 → 绿（计数阶梯持平 375——拓宽挂在既有 it() 块内）。**parity-toolbars 拓宽 16 个包装层成员**（98 → 114；铬层 + 真实层阴影 + h=84 + 渲染行偏移 24/24——垫作为几何；卡片锚点向上攀爬到铬层，因参考站在不同 DOM 深度嵌套 p-6 内容 div——首次拓宽飞行当场抓到该分裂），治愈树上出生验证 114/114 ×2。

**F-2 序列化类**：feed 行 transitionProperty——参考站 CDN 六属性 v3 列表 vs 我方 v4 十属性展开（双方 authored 同一 transition-colors 类；该属性仅在悬停过渡时渲染——静息无渲染类）。按双站各自值钉住，无 src 治愈。

**第十三面 `scripts/parity-listinteriors.mjs`**：dashboard Recent Activity feed 内景 + exercise 零行空态 + sr 特殊空卡 + goals Achievements 空态——**88 成员（87 MATCH + 1 PINNED）**，每次飞行各一次登录、四路由、零写；卡片锚点匹配 div/section（我方 SectionCard 为 `<section>`——语义超集）。**出生验证 88/88 ×3**——sr y 阶梯成员（252/332/412）在两侧实时验证了 F-1 治愈。

**抓取轮（第十八次跨轮字节比对）**：**30/34 字节稳定，四个 mover 全部根因为 F-1 治愈的我方刻意面孔变更**（08-sr + 10-learning = 包装层主面孔；30-tutorial-hover + 33-sr-form = 折叠线下 48px 阶梯位移；内景本身由常设面字节钉住）；账本重基，验证 0 不匹配，其后 census MATCH。

**门禁/文档**：计数阶梯持平 **375**（census 拓宽挂在既有 it() 块，无新测试用例；docs-counts 锁步绿）；PAD §11（F-1 治愈行 + F-2 行 + 第十三面行 + watch 行第 36 轮记录）、AGENTS（第 36 轮 + 十三脚本电池）、SKILL **v1.45.0**（奇偶行扩至十三面 + 工具栏拓宽注记）、README/CLAUDE（无计数站点）、worklog WH-47、计划执行记录、session_91；全门禁最终树 GREEN；草稿探针清零；已提交并经 SSH wrapper 推送至 main。

**WH-48 建议下一步**：(a) 全宽电池（watch 第 37 轮 + 十三脚本——参考登录数现为每轮十二次：两窗口拆分仍为强制项，且解码的调试飞行须同时对照双侧限流器配速）；(b) 第十三面稳定性飞行入常设节律；(c) 第十四面候选：mood 列表 "Your Journey" 逐块内景（WH-26/27 钉了标签行 + 列表容器，逐块内景从未 live-vs-live 读过）、dashboard Upcoming Reminders/Events 卡内景（零行面孔）、exercise/mental-health KPI 行 → 列表卡阶梯（种子 demo 态）；(d) 常设封锁复检 + 预设目录 watch。
