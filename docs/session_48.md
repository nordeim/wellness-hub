我将开始 WH-25 周期的迭代。驱动文档已推进到 session_46 —— 让我刷新工作区并检查外部推送（external push）传输了什么内容。
外部推送已更新 **`docs/session_46.md`**（122 行）—— 已同步至 `9e0073f`。本轮对应的 WH-25。正在读取新的驱动文档。
session_46 is the WH-24 transcript; its line-122 "Suggested next (WH-25)" gives this round's drivers: **(1) reference-redeployment watch (CSS hash r13), (2) the Profile tab panels' interior geometry (the never-walked family — colors/dark pairs walked at WH-17/18, field-by-field geometry never), (3) the capture-state doctrine codification (re-seed/assert badges=0 before captures — the 11-goals lesson), (4) the axe watch on the opacity-0 button.**

Verifying doc lockstep, then the baseline gate.
Docs locked at 347/63 · SKILL v1.22.0 · lesson 28 · census MATCH. Running the baseline gate.
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 347/347 · build OK · smoke 14/14 · e2e 63/63 · census MATCH. WH-24 ship state verified. Now reading our Profile page (this round's target surface) before probing.
我们的 Profile 页面已完全呈现（3 个标签页：外观/账户/偏好设置）。让我读取一下我们的标签栏，然后编写结合固定监视器（standing watches）的探测脚本。
我们的标签栏 + 所有面板的内侧已解码。正在写入 WH-25 探测器——固定监视 + Profile 标签面板的内部几何结构（本轮声明的目标）。
**探测结果已送达 — 重大偏差。** 监测项均正常（CSS r13 未变，seed r14 23/23，drawer 正常）。标签页面板呈现出真实发现：参考站点的 tablist 是 **`w-full grid-cols-3`**（我们的为 `max-w-xl`），标签页使用的是 stock form + `transition-all` 以及 ACTIVE `bg-white`，panel container 为 **`mt-2`**（我们的为 `mt-6`），Colors 面板包含 **`md:grid-cols-4`** + stock Label `mb-3 block` + **双圆形色板**（我们为：单个渐变色板）。Account/Preferences 面板返回为空（点击问题）。让我阅读一下我们的 Tabs 组件，然后重新探测。
我们的 Tabs 组件的文档描述了轨道，但探测显示参考站点的包装器是**全宽 (960px)**，而我们的页面则是 `max-w-xl`。让我获取完整的触发器类、包装器、Account/Preferences 面板（点击失败）以及保存按钮的完整类。
**主要解码发现**：wrapper 为 `w-full`（非 `max-w-xl`），面板为 `mt-2`（非 `mt-6`），Account 字段携带 `bg-gray-50` 禁用样式，Preferences 行为 `flex items-center justify-between p-4 rounded-lg border`，且带有**原生基础 `w-5 h-5` 复选框**（而非我们美化的 Checkbox —— 之前关于 WH-21 “零复选框” 的前提是错误的；那次探测从未打开过 Preferences 选项卡），Preferences 标题带有 Settings 图标，Account 标题带有 circle-user，且保存按钮的父级为 **`flex justify-end gap-3 sticky bottom-4`**（一个粘性保存栏）。让我探测一下 Colors tail + Typography/BG/Visual-Style 卡片内部结构，然后检查我们的组件。
**所有卡片内部结构已解码** —— 更多发现：picker 行 `grid md:grid-cols-2 gap-6`，color input `w-20 h-12`，picker 行 `gap-3`，font select `w-full`（我们的为 `sm:w-64`），typography 预览块 `mt-4 p-4 border rounded-lg` 带有 **text-lg font-sans** 预览 + 一个 "Preview of X" 行（我们的为：`bg-line-soft p-3` 单个 p），BG 提示 `mt-1 text-gray-500`，Visual Style 选择框 **全宽堆叠**（我们的为：3-col 网格）。让我检查一下我们的 Label/Checkbox 组件和 constants 标签。
Constants labels byte-parity ✓。我们自定义的 `Checkbox`（CRM 时代的 button-role 形式）对比参考站的**原生 `input w-5 h-5`** —— WH-21 关于“零 checkbox”的前提现已证实是错误的（那次探测从未打开过 Preferences 选项卡）。让我检查一下剩余的成员：preview tile、TABS_SEGMENTED、我们的 sidebar logout 以及 CHECKBOX 的 consumers。
预览磁贴已解码：**`linear-gradient(135deg, …)`** (to-br — 我们的为 to-right)。Tab 键盘 = 自动激活 ✓（已连接）。所有事实已收集完毕。让我检查一下 `TabsPanel` 的渲染以及 `Checkbox` 固定数据的 e2e 状态，然后编写计划。
所有事实和引脚位置已确认。让我检查一下 `achievements` API 的结构（用于捕获原则），然后编写 WH-25 计划。
所有事实已锁定。正在编写 WH-25 修复计划。
计划已编写。现在进行 **WP-1 RED** —— 即这两个 census 区块。
两个分类普查结果均显示为红色（24 个原因 + 退役原因）。现在进行 CANONICAL 翻转、interaction-contrast F-1 退役，以及 e2e 变更。
退役普查在 6 个原因处显示为红色 ✓。现在开始退役 `interaction-contrast` F-1 模块以及 a11y (e) 部分，然后添加 (j) 部分。
现在 a11y 规范为 —— 弃用 (e) 部分并添加 (j) 部分。
现在进行完整的单元 RED 运行。
**单元 RED 在预期的 8 个原因处保持不变。** 现在进行 **WP-2 GREEN**。首先是 `page-layout` 记录。
现在进行 `PRESET_CARD` 重新成员化 + `PROFILE_PANEL` 扩展 + `PROFILE_PREFS` 记录。
现在进行 profile 页面转换 —— 全量编辑。
接下来是 Typography、Background Image、Visual Style、Account 和 Preferences 面板。
现在是 Account glyph 的替换 + Preferences 面板的转换（Settings 图标、行、原生复选框）以及导入部分的更新。
现在进行导入更新（Checkbox out，UserCircle/PROFILE_PREFS in），以及 label.tsx Checkbox 的移除。
现在进行 `label.tsx` 中 Checkbox 的移除，以及 `tabs.tsx` 的注释修正。
所有转换已完成。正在运行 `tsc` + `lint` + `unit`。
`label.tsx` 顶部的 `CHECKBOX` 导入仍然存在。正在修复。
三个修复：颜色输入的 `arm` 顺序（参考：`w-20 h-12`）以及两处 `census` 读取，它们必须检查 `PROFILE_PREFS` 记录，而不是页面字面量。
几何数据普查已通过。退休普查需要其专属的 PP 读取（它引用了另一个区块的变量）。
所有普查结果均已通过。已运行完整单元测试。
**所有代码已通过 (GREEN) — 共 348 项检查。** 现已在 dev server 上进行实时的 GREEN 验证。
几乎完美 —— 每个数值都完全匹配（`tablist` 960/960，`circles` 24px，`tile` 135deg，`input` 80×48，`stack` Ys，`sticky bar`）。由于我的定位器问题，有两个成员读取为 `null`（行是一个 `<label>`，而不是 `div`；`Account icon` 匹配到了一个隐藏面板）。正在进行快速定向重新读取。
**所有成员均已按参考值完成验证**（circle-user 图标、行表单 16px/透明/居中、标题 16px）。现在进行 **WP-3 — 文档阶梯**。
所有计数已切换。现在进行 PAD §8.1 + §11 行。
现在开始处理 PAD §11 的 WH-25 行。
接下来是 AGENTS 事实和捕获原则，然后是 SKILL v1.23.0 + 第 29 课。
**348/348 GREEN.** WP-4 — build + smoke + e2e.
(j) 部分失败了。正在获取失败详情。
在 (j) 分支中也是同样的 `<label>`-vs-`<div>` 定位器 bug（box 读取已通过；仅 row 定位器有误）。正在修复。
**WP-4 GATE FULLY GREEN** — 348/348 · build OK · smoke 14/14 · **e2e 63/63**。现在进行 WP-5 —— 结合 F-9 徽章断言的捕获。
**29 字节稳定 + 刚好 1 个 mover (12-profile — 唯一被修改的页面) + 新增 31。** 正在验证新增的捕获，然后重新调整 ledger 的基准。
检查字符像素已验证（y 轴 148-158 处为 58px）。正在扫描卡片区域正确的 x 坐标处的行边框。
Row borders 已验证。保存栏没有粘性（页面较短 —— 处于常规流中）。正在定位右侧区域中的渐变按钮。
按钮已验证为右对齐，处于容器边缘 (1017..1144 对比 ~1152 边缘)。所有捕获内容均已验证。正在重新建立 ledger 并运行最终状态检查。
在捕获过程中，按预期重新植入（`capture-24` 键入再次触发了徽章 —— 根据准则，这是清理流程中已记录的步骤）。现在进行 WP-6 —— 工作日志、计划记录、`session_47.md`。
现在开始处理计划的执行记录以及 session_47.md。
现在是 WP-7 —— 最终的 gate 重新运行、commit 以及 SSH wrapper push。
该轮的所有变更（16 个修改 + 3 个新增），门禁全部通过。正在提交。
已创建 Commit `b60e7a6`。现在通过 SSH wrapper 进行推送。
**WH-25（个人资料 tab 面板几何结构回合）已完成并推送** — commit `b60e7a6` 已在远程 main 上（wrapper 已验证 远程 == 本地 HEAD，SSH 密钥已销毁，工作区干净，census 匹配）。

**本轮核心发现**：(1) 颜色-几何结构拆分适用于表面*内部* — WH-17/18 颜色探测映射了个人资料面板，但未遍历其字段，并且每个成员都存在偏差（`w-full` wrapper + `mt-2` 面板、双圆形预设色板、`w-20 h-12` 颜色输入、135° 预览卡片、堆叠的 Visual Style 选择框、`bg-gray-50` 账户输入、`p-4` 偏好设置行、粘性保存栏）；(2) **必须对超集的前提进行探测，而非假设** — WH-21 “参考环境无复选框”的说法是错误的（从未打开过偏好设置选项卡；参考环境自带原生空置的 `w-5 h-5` 复选框），因此自定义复选框 + 其深色模式修复 + 其 pin + 其 e2e 分支已全部退役；(3) 捕获状态原则已标准化（捕获前置断言 badges=0）。

**关卡检查**：lint 0/0 · tsc 0 · **348/348 (24 个套件)** · build OK · smoke 14/14 · **e2e 63/63**。捕获了 29 个稳定文件 + 1 个已找到根本原因的移动文件 + 新的像素级验证的 `31-profile-preferences`。文档已同步，SKILL v1.23.0 + 第 29 课，session_47.md 已写入。

**下一轮建议（WH-26）**：重新部署监控（CSS r13）；第 29 课审计（重新验证每一个缺失声明）；剩余未遍历的内部结构（登录系列字段行、心情表单的滑块 + 标签）；如果出现另一个残留类别，则进行捕获原则扩展。
