仓库已克隆 — main 分支已处于 WH-19 审计轮次（基于 vitest/playwright 测试、db/ 目录以及 docs/ 目录）。现在开始审查核心文档：
WH-19 is shipped at `64814e0`. Now reading session_36, plan19, and worklog to understand the current round:
WH-19 已上线；按照惯例，此 prompt（引用了 session_35 + plan19 + session_36）驱动 **WH-20**。正在阅读剩余的核心文档：
Now reading the PAD (Project Architecture Document):
Now reading wellness-hub_SKILL.md and worklog.md:
Now the worklog (newest entries at top per house format):
The picture is complete: WH-19 shipped, worklog's "Suggested next" points to **interaction states under the computed-contrast doctrine** (focus rings in dark, dialog-over-gradient) or a functional-superset round if the reference redeployed. Setting up the environment now:
Browsers present. Running the baseline gate — fast signals first:
E2E setup project failed — investigating:
Browser build mismatch (have 1200, Playwright 1.64 wants 1248). Installing:
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 330/330 (22 suites) · build OK · smoke 14/14 · e2e 53/53. Checking the advisory posture, then the live reference probe:
Audit ZERO. Now the live reference probe — checking the agent-browser skill convention first:
Password went into the wrong field — using refs instead:
Logged in. Probe hygiene first — reading the account's current preset state:
CSS hash **UNCHANGED** (`index-heGLHP2e.css`) — watch round 7, no redeployment. Checking the brand-family preset state:
账户正常 — 品牌系列读取 Indigo Dream (135deg, #6366f1→#a855f7)。现在进行 H1 identity walk。先获取我们的 map，然后开始 walk：
Our map read. Walking the reference's 11 pages reading each H1 gradient:
First H1 is the sidebar brand — need the main-content H1:
**H1 identity walk: 11/11 byte-identical.** Now seed-content watch round 9 (template names + tutorial titles):
Templates 11/11 ✓. Now tutorial titles on /Learning:
**Seed watch round 9: 23/23 byte-for-byte.** Now entity-API shape watch round 8 (page-context bearer fetch):
**Entity-API watch round 8: 12 rows / 13 keys / views:0 — holds.** Now the drawer battery at 390×844 (the mobile-nav emphasis):
参考的 z-100 toast viewport 正在拦截 click（它记录在案的缺陷）。正在分派 synthetic click：
Drawer open with 11 items. Testing the stays-open-after-nav quirk:
Stays-open quirk holds. Clean teardown check:
**REFERENCE PROBE COMPLETE — EVERY WATCH CLEAN** (preset CLEAN, H1 11/11, CSS hash unchanged r7, seed 23/23 r9, entity API 12/13/views:0 r8, drawer battery 11 items + quirk + teardown, 404, 12 placeholders). Zero probe-hygiene events. No redeployment → this round audits the **interaction states** (WH-19's suggested next). Starting our dev server:
Logged in. Building the audit inventory — first the static analysis of focus-ring classes:
Login-family records are paired. Checking the wider component surface — all focus sites beyond those records:
Focus rings ride the `--ring` token. Checking its light/dark values:
The audit class: focus-visible rings in dark + interaction states — never measured. Let me check the theme-store hydration flow before probing (probe hygiene):
localStorage `wellness-theme` rehydrates synchronously and applies WITHOUT a server PUT — the clean probe path. Running the dark-mode focus-ring probe:
Dark didn't apply — server prefs may hydrate over local state. Checking the flow:
Output looks corrupted — reading the file directly:
`const e]` is a syntax error — but the gate passed?! Checking git status:
The committed line IS a syntax error, yet the gate passed. Investigating — running tsc unfiltered now:
tsconfig includes the file yet tsc exits 0. Hex-dumping the exact bytes:
The od dump shows the file is CORRECT (`const [me]`) — my Bash display pipeline eats `[x` sequences. The codebase is fine. Now checking app-shell's server-prefs sync (why dark didn't apply):
The server-prefs pull wins over untouched-local — the Profile-UI flip is the house probe path. First, static inventory of the ui primitives' focus/hover classes:
Static inventory: primitives ride `focus-visible:ring-1 ring-ring` (token-based). Before flipping our app, capturing the reference's own focus-visible behavior (the parity read for this round):
Reference's submit focus = 3px WHITE outline (invisible on white card — a defect class). Probing its sidebar nav focus:
Outline transparent — no focus indicator on reference sidebar links. Verifying with real keyboard Tab (focus-visible vs focus):
Reference keyboard focus = INVISIBLE (transparent outlines, no rings) — a reference defect class; our focus system is the superset. Now probing OUR app's focus states (light first):
Ring present. Building the full oklab-aware focus-ring probe (the WH-19 instrument, focus edition):
Light sidebar rings pass (2px #0a0a0a @ 19.8:1). Walking Profile tabs, chips, selects:
Tab uses real keyboard focus-visible. Walking via Tab:
Light-mode focus system solid (rings 18.9–19.8:1) — but the **1px rings** (INPUT_BASE/BUTTON_BASE family) raise the WCAG 2.2 Focus Appearance (2.4.13) size question. Now flipping to dark via the Profile UI for the dark axis:
深色模式已开启。正在运行深色模式下的焦点遍历：
**重大发现** — 深色模式下的 `mode/preset chips` 显示了一个不可见的 `focus ring`（3% alpha @ 0.07px），而浅色模式下则能显示正确的 1px 环。正在检查 chip 源码：
Display filter mangles bracket sequences — using Read tool instead:
The chips carry proper `ring-2 ring-ring` classes — but measure broken in dark. Reading the full computed shadow + CSS vars:
The ring VAR is set (`--tw-ring-shadow: 0 0 0 calc(2px) #d4d4d8`) but the computed box-shadow is five transparent zeros — a declaration is beating the ring's box-shadow composition. Hunting the culprit in globals.css:
The 5-transparent-layer shadow is a **transition artifact** — `transition-all` means my synchronous read caught t≈0 of the box-shadow transition. Re-probing with settle time:
Ring is FINE after settle (2px #d4d4d8 @ 12:1) — t=0 transition artifact confirmed. Re-running the dark walk with settle time:
Dark rings all pass on shell + chips. Now the module surfaces — dialog inputs, tabs, selects, module buttons in dark:
Programmatic focus doesn't match focus-visible after mouse use. Using real Tab inside the dialog:
All dark dialog surfaces pass contrast (11.99–17.72:1); the 1px family raises the WCAG 2.4.13 size question. Verifying the exact normative text:
Key facts established: 2.4.13 Focus Appearance is **AAA** (not in our claimed A+AA set); our rings pass contrast everywhere. Now probing the suspect classes: the login dark input ring and toast hover:
**Findings emerging:** (1) dark login input ring = neutral-600 @ **2.29:1** vs the dark card (fails 3:1) — our own dark superset, curable; (2) light login ring is reference-shared (byte-identical to the reference's own) → ledger per parity doctrine. Checking the toast hover arm and sidebar-hover token in dark:
**Finding #2:** toast close button `hover:text-neutral-900` — no dark pair (the X turns invisible on the dark toast card on hover). Verifying live — triggering a toast in dark and hovering its close button:
Synthetic events don't trigger :hover — using real agent-browser hover:
**Finding #2 confirmed live:** hovered X = rgb(23,23,23) on rgb(28,28,31) ≈ **1.08:1 — invisible**. Now the systematic sweep — all hover/focus arms lacking dark pairs:
14 unpaired hover arms — but cn() may compose dark pairs from other literals. Checking the actual sites:
The e2e dark walk likely saw only EMPTY lists — row surfaces (delete buttons) never rendered. I have live rows (created 2 workouts). Measuring the delete button in dark:
Delete button in dark ≈3.12:1 (marginal) with a light-island hover. Checking the remaining page-layout sites:
**APP_FOOTER has NO dark pairs — a white footer island on every dark page.** Verifying live:
Footer confirmed as a white island in dark. Reading the profile danger button and page-layout:314 sites:
THEME_MODE_PICKER false positive (comment text). Refining the ledger — sweeping `active:` arms and all `dark:focus:ring` sites:
Four `dark:focus:ring-neutral-600` sites confirmed (the exact WH-19 color choice — paired but sub-3:1). Checking the mobile header + drawer dark pairs (the prompt's mobile-menu emphasis):
Mobile nav family is token-safe (dark pairs + token surfaces ✓). The audit ledger is complete. Computing the exact ratios for the findings:
F-4's resting icons actually pass 3:1 (3.12–3.67) — downgrading to the coherence class; the strict failures are F-1 (2.32) and F-2 (1.05). Checking the gray icon-button sites for completeness:
Compiling the final F-1/F-4 site inventory for the plan:
Audit complete. Reverting the dark flip (probe hygiene) and verifying, then checking our light login ring's byte-parity vs the reference:
Byte-identical light ring confirmed (F-5 parity exact). The audit is complete and the account is clean. Writing the WH-20 remediation plan:
Plan written. Validating against the codebase — the a11y spec's existing structure (the widening's foundation):
Now the docs-counts CANONICAL block and src-census structure:
The WH-19 census already pairs the login records' arms — the F-1 defect is the twin's VALUE. Verifying the v3 hex values I'll pin:
All palette values exist except `neutral-200` (+1 v3 pin). Validation complete — executing **WP-1 (RED)**. First the census extension:
Checking the test file's imports for `readdirSync` and `relative`:
Census unexpectedly PASSED — debugging the walk:
The test passes but debug finds the arm — testing the twin regex in isolation:
matchAll cloning aside — checking whether the recursive walk even reaches `(app)`:
Found it — my gate regex `/(:hover|:focus)/` is inverted (Tailwind writes `hover:`, not `:hover`), so every string was skipped. Fixing:
**RED verified — 13 deterministic failures** including two sites my sweep missed (`hover:bg-black` in learning + routines). Examining those:
The `hover:bg-black/40` sites are video-overlay scrims (mode-independent by design — like the dialog overlay). Adding exemption (c):

上代在 “添加豁免 (c)”（`hover:bg-black/40` 视频遮罩）步骤被打断 — census diff 里只有豁免 (a)(b)。先读 WH-20 完整计划与 worklog，恢复执行上下文：
计划完整在手。上代被打断于 WP-1 (RED) 的豁免 (c) 添加。建立本会话 TODO 并恢复执行：
第一步：验证上代的 RED 失败清单（确认 14 站点 + scrim 误报），再添加豁免 (c)：
RED 清单确认：13 失败 = F-3 footer link + F-2 toast + F-4 的 9 个模块站点（含 profile 的 `hover:bg-red-100`）+ 2 个 `hover:bg-black` scrim。查看 scrim 上下文确认豁免 (c) 的依据：
确认：两个 `hover:bg-black/40` 均为视频缩略图遮罩（`bg-black/30` + `text-white`）— 与 dialog overlay 同类，模式无关。添加豁免 (c)：
重新运行 census — 预期 RED 从 13 → 11（2 个 scrim 误报被结构性豁免，11 个真实失败 = F-2 + F-3 link + F-4×9）：
RED 完美锁定：11 失败 = F-2 + F-3 link + F-4×9，与审计 ledger 一致。WP-1.1 完成。现在写 WP-1.2 算术 pin — 先看 WH-19 preset-contrast 先例的结构：
现在写 WP-1.2。先查 palette pin 块（v3 hex 值表）与 F-1 站点的当前 class strings：
F-1/F-2/F-3/F-4 全部站点当前值确认。查行卡的 dark 背景（F-4 pin 的计算基准）与 BUTTON_CLASSES：
写 WP-1.2 前最后确认：globals.css 的 `.dark` override 块中 `--line-soft` 的 dark 值与 toast 站点上下文：
`--line-soft` dark = #1c1c1f ✓（F-2 hover wash 基准）。所有输入齐备，写 WP-1.2 算术 pin（新 suite）：
修复 Log-out face 提取里的残留错误：
运行 interaction pin 的 RED 验证（预期 4 检查全失败：F-1 2.29/2.08、F-2 无 arm、F-3 无 pair、F-5 ledger 行不存在）：
RED 完美：4/4 检查按审计发现的确切原因失败。WP-1.2 完成。现在 WP-1.3 e2e 四腿 — 先看 playwright config 的 storageState 模式与 workouts API：
查 exercise 删除成功路径的 toast 触发与 workouts API 的 date 字段默认：
toast 触发路径确认：保存成功 `toast.success("Workout logged — great job! 🎉")`。看表单 DOM（id/label）以编写 e2e 填表：
toast X 按钮：`aria-label="Dismiss notification"`。查 login 页 email input 的定位锚点：
所有锚点齐备。现在写 e2e 四腿（WP-1.3）追加到 a11y.spec.ts：
检查 eslint 对 `eval` 的规则（我用了 `window.eval`，可能违反 lint）：
lint 通过。改 CANONICAL（WP-1.4）：unitSuites 22→23、unitChecks 330→335、e2eChecks 53→57：
验证 tsc 与 lint（快信号），随后跑 e2e 四腿 RED：
tsc 在 (b) 腿的 evaluate 匿名函数上报隐式 any。修复类型注解：
tsc/lint 绿。运行 e2e 四腿的 RED（先确认 playwright webServer 配置）：
部分失败是 probe 引擎问题（evaluate 闭包变量）。看各腿具体失败信息：
(c) 是真 RED（白岛 255 命中）。修 probe 引擎闭包 bug；先看 (b) 的 boxShadow 实际值：
(b) 的 #email 聚焦成功但 boxShadow 无 ring 层 — 查 LoginCard 里 #email 的实际 className：
(b) 需要实证调试。在腿内临时输出 URL 与 boxShadow，快速验证：
谜底揭晓：dark ring = `rgb(82,82,82)`（neutral-600，真 RED）— 但我的层解析正则 `(?=,|$)` lookahead 对 `) 0px 0px` 形态失败。修 (b) 解析 + elementContrast 闭包 bug：

继续 WH-20 执行。修正 (b) 层解析与 `elementContrast` 闭包 bug（debug 已证实：dark ring = `rgb(82,82,82)` neutral-600 真 RED，层序 = [透明×2, 白 offset 2px, ring 4px]）：
重跑四腿 RED 验证：
**WP-1 (RED) 全部验证完成** — 精确命中审计值：(b) ring `rgb(82,82,82)`@2.29:1、(c) 白岛、(d) hover X@1.05:1（ink 23,23,23 on 28,28,31）；(a) 3.12:1 边缘通过（F-4 审计已降级为 coherence 类，其确定性 RED 在 census/pin）。进入 WP-2 (GREEN)：
homeButton（521 行）是 `dark:hover:border-neutral-600`（非 focus-border），sed 未匹配。单独修复其 ring 与 hover border：
F-1 完成（4 站点）。剩余 `dark:hover:border-neutral-600` 命中（events 205/page-layout 327/408）不在 F-1 ledger 内（tab/Google 按钮面，走查已过），不越界扩改。F-2 + F-3：
F-4 九站点批量修复：
9 站点全中。跑 census + pin 验证 GREEN，并检查 palette pin（neutral-200）：
与计划预测一致：+1 v3 pin（neutral-200）。添加 pin：
sed 的 regex 点号吞掉了撇号（`item's`→`item.s`）。用 Edit 精确修复两行注释：
只剩 F-5 的 PAD §11 ledger 行（WP-3 文档工作）。先跑 e2e 四腿 GREEN 验证，再一次性做文档：
e2e 仍红 — 查详细失败值（可能 webServer 缓存了旧构建）：
源码已改但 e2e 仍见旧值 — webServer 用的是旧构建。查 webServer 命令：
webServer 复用 `.next/standalone` 旧构建。重建后重跑四腿：
四腿全 GREEN — WP-2 完成。进入 WP-3 文档阶梯。先看 PAD §11 ledger 与 §8.1 现状：
更新 PAD §8.1 行（infra 10→11 文件/131→136，a11y 10→14）与 §11 ledger 四行：
§11 ledger 追加四行（WH-20 退休 + F-5 parity + 参考键盘焦点 + 1px AAA 注记）：
现在扫描五文档所有旧计数站点并更新：
验证 docs-counts pin 并检查 SKILL 版本块：
sed 静默失败两次 — 改用 Edit 工具精确替换：
docs-counts 全绿。完成 AGENTS a11y 条目扩写 + SKILL v1.18.0 + lesson 24：
SKILL 三处更新（§2 pins 列表 + §8 e2e 牙齿 + §12 lesson 24 + 版本）：
§9 的 "five-member" 自 WH-18 起就漏了 dark 变体 pin（第六 pin）— 顺手外科修复（加 A-4b 行，不动既有编号），再写 lesson 24：
追加 lesson 24 到 §12：
lesson 24 被 cat 到了文件末尾（§19 之后）— 需移入 §12 的 lesson 23 之后：
运行全单元套件验证文档 lockstep：
335/335（23 suites）与 CANONICAL 精确一致 — WP-3 完成。WP-4 全门禁：
一个 e2e 失败（crud spec 的 exercise 腿）— 读失败详情：
根因明确：CRUD spec 断言 "Total Workouts" 精确 = 1，而我的 (a) 腿（API 建行）与 (d) 腿（真实表单保存）各留了一行 — e2e db 共享导致污染。在 afterEach 加 API 清理（失败也自愈，且 global-setup 每轮重播种兜底）：
重跑全套 e2e 验证 CRUD 修复：
57/57 全绿。db census + 现有截图清单：
dev db 有探针残留（上代审计创建的 workouts + badge）— 按处方重播种并复核：
WP-4 完成（全门禁绿 + census MATCH）。WP-5 截图 — 查上代的截图程序：
推断上代截图程序（尺寸/形式），重建 WH-20 截图脚本：
写 WH-20 截图脚本（house 程序：规范化 → 23 复拍 + 24/25 新增 → mover 分析）。先看 auth.setup 的登录选择器：
修复脚本中裸路径 goto（需 `${BASE}` 前缀）：
重跑截图脚本：
prefs 字段是 `primaryColor` 而非 `primary` — 修正检查：
主结果：19/23 byte-stable + 24/25 新增。两个疑点必须实证：(1) 17/18/19 为何 byte-stable（footer 是否在视口内且 cure 生效）；(2) 23-dark-404 MOVER — 根因是路径名渲染进 span（我用了 wh20- 前缀 vs WH-19 的 wh19-）。先验证 footer 与 404：
Footer 实证：cure 生效（rgb(10,10,10)），但 top=900 恰在 900px 视口折叠线下 — 0px 可见，byte-stable 是诚实的（below-fold 类）。重拍 23（用 WH-19 的 wh19- 路由名，404 span 渲染真实路径文本）：
23 byte-stable 复原（根因：404 span 渲染真实路径名）。做 Δ7 像素级 mover 分析 + 24/25 质检：
数值合理但按惯例做目视确认 — Read 24/25 两图：
改用程序化验证（行卡的 neutral-800 像素带 + 焦点 ring 层）：
24/25 双验证通过。更新 ledger 至 25 文件集：
WP-6：写 worklog WH-20 条目（置顶）、plan 执行记录、session_37.md。先看 worklog 头部结构：
写 WH-20 worklog 条目（置顶）：
填 plan 执行记录 + 写 session_37.md：
WP-7。先读 SSH wrapper 使用说明与 .gitignore 状态：
准备阶段（排除 wh20-* 脚本）并 commit：
Commit `0b7a9e2` 完成。执行 SSH wrapper push（密钥→/tmp 0600，shim 探测，dry-run→push→验证→shred）：
Dry-run 成功（远程 main 在 9e2c1d5，将推 0b7a9e2）。执行真实 push：
推送成功（远程 main @ 0b7a9e2 == 本地 HEAD，密钥已销毁）。最终状态检查：
**WH-20（交互状态轮）已完成并推送** — commit `0b7a9e2` 已在远程 main（远程验证 == 本地 HEAD，密钥已 shred）。

## 本轮交付摘要

**恢复点**：上代中断于 WP-1 豁免 (c)。本会话完成豁免 (c)（视频遮罩）→ census RED 锁定 11 站点 → 算术 pin 4/4 失败 → e2e 四腿以审计精确值失败（ring 2.29、白岛 255、hover X 1.05）→ GREEN 15 站点修复 → 全门禁 → 截图 → 记录 → 推送。

**核心发现**（"pairing is not contrast"）：WH-19 配对了 login 家族的 ARMS（census 完备）但 twin 的**值**低于对比度 — 这是三层防护的教训，现已以三层 pin 固化：census（臂的存在）+ 算术 pin（值）+ e2e 四腿（活态）。

**三轮内捕获并修复的工件 bug**：census 门正则倒置（`:hover` vs `hover:`）、page.evaluate 闭包 ReferenceError、(b) 腿 lookahead 解析（debug 实证层序后改 split+spread 排序）；外加两个全套件捕获 — wellness-crud 跨 spec 行污染（afterEach API 清理+验证）与 `.next/standalone` 陈旧构建教训。

**门禁**：lint 0/0 · tsc 0 · **335/335 (23 suites)** · build OK · smoke 14/14 · **e2e 57/57** · census MATCH · audit ZERO。
**截图**：23/23 byte-stable（暗色 footer 变化恰在 y=900 折叠线下 — 0px 可见，实证 rgb(10,10,10)）；23-dark-404 mover 根因（span 渲染真实路径名）复拍稳定；新增 24/25 双验证。
**文档**：五文档 lockstep（335/23/57）+ PAD §11 四行 + SKILL v1.18.0（lesson 24 + §9 A-4b 第六 pin 修正）。

**Suggested next**（供下代）：active:/data-[state=] 未走查族、WCAG 2.4.13 AAA 升级决策（1px→2px）、参考站重部署时（CSS-hash watch round 7 今日 clean）的功能超集轮。
