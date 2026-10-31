远程仓库已更新（3dd575c → aec0ed9）—— 操作员推送了 WH-26 会话日志。正在拉取。
只有 `docs/session_50.md`（204 行）到达了——这是操作员对我 WH-26 轮次的记录。指令中引用的 session_49 + session26-plan + worklog + session_50 驱动了 **WH-27**。正在阅读操作员的记录。
session_50 确认：WH-26 已在 `3dd575c` 处交付；指令（引用 session_49 + session26-plan + worklog + session_50）推动了 **WH-27**。计划中 WH-27 的建议后续步骤：(a) 登录系列 computed-interior e2e 分支，(b) sr chip `#` 前缀问题，(c) mood 列表内部（受限于参考数据），(d) 重部署监控时的 rating-click 重新验证。

让我根据代码树验证当前的文档状态并准备环境。
文档已锁定至 350/64 · SKILL v1.24.0 · 环境约定保持不变。正在运行 baseline gate。
**基准门禁全部通过 (BASELINE GATE FULLY GREEN)** — lint 0/0 · tsc 0 · 350/350 (24 个套件) · build OK · smoke 14/14 · e2e 64/64 · census 匹配 (census MATCH)。在 `aec0ed9` 处的准确 WH-26 交付状态。

接下来进行审计阶段。让我查阅一下技能目录 (skills catalog)，以获取相关的审计技能。
TDD 技能已内化——该仓库的准则一致（期望值 = 实时参考探测，绝非我们自己的代码）。现在进入参考探测阶段。让我检查一下上一轮的探测基础设施以便复用。
WH-26 pass1 登录系列数据已完成 —— 这是 e2e 环节的真值来源。让我检查一下 `probe-signup` 的结果，看看参考项目中是如何进行验证的（这是解除 (b)/(c) 数据的关键）。
WH-26 探测仅捕获了请求——参考项目的应用内 OTP 交付情况未知（这是解锁 (b)/(c) 的关键）。正在编写 WH-27 探测：监视 + 一次性探测账户 + 数据创建 + 两个列表内部的遍历。
**监控清理：CSS hash 第 15 轮未变更**（无新的重新部署——所有 WH-26 映射仍然有效）。但 `hasCode: false` —— 让我检查一下验证视图和注册响应中的实际内容。
没有注册的 POST 请求触发 —— 3 个输入框是 Email/Password/Confirm，但我填写时用的是 name/email/password。正在修复填充并重新运行探测。
**分支决策数据**：参考项目的注册返回 `{"message":"Registration successful. Please check your email for the verification code.","otp_expires_in_minutes":10}` —— **仅通过邮件发送 OTP，无应用内代码**。数据解锁路径已关闭。让我验证一下探测账户的登录行为以作彻底确认，然后读取监控结果。
**分支已关闭**：“请在登录前验证您的邮箱” —— 未经证实的探测账号无法执行任何操作。项目 (b)/(c) 在数据层面保持阻塞；项目 (d) + sr 的 form-side chip 格式为 client-state（客户端状态），且未解密（WH-26 的 tags-Add 点击关闭了表单）。正在编写第 3 轮（pass 3）—— demo 账号的 sr 表单，仅限 client-state。
发现一个宝库：表单的按钮映射显示了一个 **“📝 Notes”可折叠按钮**（这是一个 WH-26 解码中遗漏的新界面元素）—— 而且评分点击将 DOM 从 5 个星星重新渲染为了 2 个。chip 探测器匹配到了搜索框（“搜索资源、标签...”）。正在修复这两个问题。
**(d) 已解码**：参考项目的评分点击渲染为 `⭐⭐⭐☆☆` —— 选中项会切换为 **⭐ 表情符号 (U+2B50)**，未选中项保持 ☆。我们渲染的是 ★ (U+2605) —— 这存在实际的字形偏差。现在来排查 Chip 故障。
标题占位符（"e.g., Chapter 5 Notes"）首先匹配了 /chapter/。正在修复为仅 /midterm/ 并重新运行。
在 sr 表单上点击了“添加”，但未渲染任何 chip。合成 setter 可能未同步到 React。正在使用真实键盘输入进行写入，并传入 5。
情绪控制功能正常（`emerald chip` 已渲染）；`sr` 标签输入甚至无法保持输入的数值。是时候对 `sr` 表单的结构进行完整的 `HTML` 转储了。
输入被点击占用（已清除），但没有任何 `span` 渲染。该 `chip` 可能根本不是 `span`。让我搜索整个 `DOM` 中的标签文本，并读取表单清单。
sr 表单清单已完成解码 —— 包括一个 “Personal Notes (optional)” 标签（即 📝 折叠项）以及带有 “(optional)” 后缀的标签。让我检查我们自己的表单标签以便对比，然后找到那个缺失的 chip（搜索所有元素，而不仅仅是 `span`）。
我们所有的标签都匹配 ✓。但探测发现了偏差：参考项目的 Personal Notes 处于一个 📝 折叠项之后（我们的是始终可见的），并且评分填充字符是 ⭐ 而不是 ★。让我检查一下 WH-26 探测是否看到了 Notes 按钮，然后进行最终的 chip DOM 搜索。
📝 折叠功能确实是一项新发现（WH-26 的“备注”匹配属于练习表单）。进行最终的芯片探测 —— 完整的行转储。
**主要发现**：sr 表单的 chip 是一个 **DIV**，带有 `inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold` —— 这是 **stock Badge 家族**，而不是 mood 表单的 emerald pill！我们 WH-26 的转换过度泛化了。让我获取完整的 class，以及 `×` 和行。
Chip 类名在 80 个字符处被截断，且该 chip 位于一个兄弟行中。再来一次仔细检查——获取完整的 chip HTML 和 chips 行。
**完整的 sr chip 解码**：`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground gap-2` —— 这是 **stock Badge family**（我们的 OptionChip 原语！），22px 高，纯色 ×，行 `flex flex-wrap gap-2`。mood 表单使用的是 emerald pill；sr 表单则不同。现在进行来自 pass 7 的 📝 Notes 折叠解码。
这不是一个可折叠组件，而是 **shadcn SelectTrigger** (`role="combobox"`, `data-state="closed"`)，其占位符为 "📝 Notes"——一个未设置的 select 组件。正在打开其 listbox 以解码选项及完整的表单结构。
**资源类型选项已解码**：8 个表情符号选项（📝 Notes、🎥 Video、✍️ Practice Test、📚 Textbook、📄 Article、🌐 Website、🃏 Flashcards、📎 Other）——触发器将第一个显示为未设置占位符。让我对比一下我们的 Resource Type 选项和字段顺序。
我们的词汇与字节完全一致 ✓。让我检查一下我们的 Resource Type Select 渲染（触发显示 + 选项形式）。
我们的项目渲染了 emoji + label ✓。让我完成监控验证 —— 读取 pass 1 的 seed watch、drawer battery 和 preset hygiene 结果。
监控读取结果偏薄——我这次的 `selectors` 与 WH-26 的工作形式不匹配。让我检查一下 WH-26 `authed` 探针的 `selectors`。
工作表单读取了 `main.innerText`。让我获取我们 seed 的 11 个模板名称和 12 个教程标题，以进行字节搜索。
正在编写修正后的监控探测（第 10 轮）。
**全部通过，确认无误**：seed 11/11 + 12/12 ✓，drawer 288px + lock + escape ✓，preset 默认 indigo ✓，CSS hash 未更改 ✓。在撰写计划前，让我先核实两个遗留问题 —— mood chip 的行类（pass 5 数据）以及我们 EMPTY 表单的类型默认值。
已确认：心情行有 `mt-3`，`sr` 行是空的（两处均需要不同的记录）。我们的表单默认 `type: "notes"`，而参考项未设置。让我对比一下参考项的 `sr` chip 类与我们 `OptionChip` 原始类。
sr chip = 默认的 Badge 变体 + `gap-2`。但是 pass 5 发现了 **mood chip 的 × 并不是一个按钮**（文本字形）——这与 WH-26 计划中 “× 按钮为 BARE” 的说法相矛盾。让我检查一下 WH-26 捕获的内容。
**明确的** (WH-26 chipHtml)：mood chip 的 × 确实是一个裸按钮 —— 我对 pass 5 的读取选中了一个祖先 `span`。mood site ✓ 保持原样。在最终确定 F-5 之前，对参考项目的 `type-select` `span` 进行一次快速检查 —— 是处于 muted 还是 normal `ink`。
找到了错误的组合框（工具栏过滤器）。细化至 📝 触发器。
F-5 已弃用 —— 参考选择已设置（前景色，“📝 Notes”，无数据占位符）：与我们的一致完全一致。探测阶段已完成。在制定计划之前，让我检查一下 a11y 规范是如何访问登录页面的（针对 F-3 阶段）。
我们的视图已映射。现在正在从 WH-26 pass1 数据中提取参考项目的探测值——即 (l) 阶段将固定的成员。
参考值已提取。正在验证我们的应用登录系列在相同数值下的表现（开发服务器仍在运行中）。
三个视图完全匹配 ✓。Verify 视图的探测需要一个修复（两个密码都已填充）以及 callout 选择器。让我检查一下我们已发送的 callout 标记，然后重新运行。
**(l) 部分的值表已验证** — 我们的应用在所有地方的计算结果都已达到参考值（h1 30px、h2 24px/700、back 14px/500/gap8、inputs 44px、icon 64×64、code inputs 6×40×44、wrap gap 6px、resend 契合）。探测阶段已完成。最后一个转换问题 — 我们默认情况下 `border` 的 token 映射。
Token 映射已确认 (`border-line`/`text-ink` = 引用项目的 `border-input`/`text-foreground`，计算结果相等)。所有发现已锁定。让我读取当前的 `sr chip` 标记以进行精确编辑，然后制定计划。
所有 markup 已映射。正在编写 WH-27 修复计划。
计划已制定。现在开始 WP-1 RED —— 首先是 `src-census.test.ts` 中的两个人口普查区块，附加在 WH-26 form-interior 人口普查之后。
现在处理 (l) e2e leg 和 CANONICAL 翻转。将 (l) leg 追加到 a11y spec 中。
让我验证一下 (l) 分支的结构落点——即 (k) 测试是位于嵌套的 `describe` 中，还是位于文件顶层。
(l) describe 位于顶层（在 WH-20 describe 于 1227 行关闭之后） ✓。让我验证一下文件尾部并运行类型检查。
WP-1 RED 已在预期的成因处验证 ✓。正在修复 (l) 段落中的一个 TS 错误。
类型检查已通过。现在进行 CANONICAL 切换和完整的 unit RED 运行。
**WP-1 RED 已完全按计划验证** —— 8 个预期的原因。现在进行 WP-2 GREEN。首先是 `SR_CHIP` 记录，紧跟在 `TAG_CHIP` 之后。
现在进行 sr 页面转换：chip span→div，SR_CHIP 消耗，TAG_CHIP 停用，导入，以及评分字形反转和注释修正。
现在修正 RATING_PICKER 记录的注释，然后进行类型检查、lint 和 census 重跑。
Cures GREEN (37/37)。现在进行动态验证 —— 检查 `dev server` 是否正常运行，然后读取 `sr chip` + `rating`。
一个不匹配项：我们 chip 的计算样式 `display` 读取为 `flex`，而不是 `inline-flex`。让我检查一下 chip 的 `class` 是否正确渲染，以及参考项目的计算样式 `display` 是多少。
class 包含 `inline-flex`，但计算结果为 `flex` —— 让我检查一下编译后的 CSS 工具。
编译后的 CSS 中存在 `.inline-flex { display: inline-flex; }`。让我排查一下是哪条规则覆盖了该 chip。
**排查到问题，并非缺陷**：chips 行（chips row）是一个 flex 容器，并且根据 Flexbox 规范，flex 项的 `display` 会被块化（blockified）——在行内时，`inline-flex` 计算为 `flex`（参考项目的 chip 也是如此 —— 类字符串完全一致，父级结构相同）。该检查的预期值有误。正在修复并重新运行。
**WP-2 已完全通过 (GREEN)** — 所有实时读取均匹配，无数据库写入。现在进行 WP-3，文档梯队。首先处理 PAD §8.1 的行。
现在进行 PAD 计数、§11 行以及 WH-26 form-interior 行的叙述修正。
现在是 PAD §11 —— WH-26 form-interior 行中的两处叙述修正，以及两行新的 WH-27。
PAD 已完成。现在进行 AGENTS —— form-interior 段落的修正与计数。
现在是 AGENTS a11y 要点 —— (l) 部分。
现在处理 README 和 CLAUDE 的计数，接着是 SKILL（版本提升、§8 篇幅、第 31 课、计数）。
现在处理 SKILL 的 §8 WH-27 段落和第 31 课。
所有文档站点已更新。正在运行 docs-counts lockstep，随后执行 full gate。
**352/352 通过。** 现在进行构建、冒烟测试和 e2e 测试。
**门禁绿色（全部通过）** (352/352 · 14/14 · 65/65 — (l) 部分已通过)。但普查（census）检测到了探测残留：我的 `wh27-local-login` 探针在 `custom.db` 中遗留了一个注册用户（该行在重新设置种子（reseed）后依然存在 — 种子（seed）从不清除用户）。正在进行清理。
Census 匹配 — WP-4 已完全通过。现在进行 WP-5：编写一个干净的 WH-27 捕获脚本（包含所有 33 个捕获，并结合 WH-26 的程序经验）。
5 个 movers —— 预计为零。正在将每一个与 `git HEAD` 的原始版本进行 pixel-diff 对比，以找出根本原因。
找到了：**29 = ±1 光栅噪声**（文档记录的类）；**20/21/22/25 是在移动端视口下拍摄的** —— 脚本在 phase E 的抽屉之后从未重置视口（与 WH-26 retake 首次通过时遇到的是同一个 bug）。正在全新的桌面上下文中重新拍摄这四个。
29 的 retake diff 变大了 (36k px) —— 让我来定位一下大部分变更所在的位置。
第 850 行区域在接近白色的渐变带上是 ±1–2 RGB 的误差 —— 这是相同的栅格化噪声类别，本次运行范围更广（两次运行，两种模式：5px 与 36k px —— 这是证明存在“运行间噪声”的证据）。正在整理最终的对比结果并重建账本。
现在进行新捕获 33 的像素验证 —— Badge chips、⭐ 填充、圆角 + 边框。
**捕获 33 个像素验证结果** — 徽章边框 ✓, ⭐ 金色填充 (752 px) ✓, ☆ 墨迹 ✓, **无翡翠色渲染 (0 px)** ✓。WP-5 已完成。捕获后的重新播种（标准步骤）。
Census 匹配。现在进行 WP-6 —— worklog 条目、计划执行记录以及 session_51.md。
工作日志已记录。现在处理计划的执行记录。
现在处理 docs/session_51.md。
WP-6 已完成。现在进行 WP-7 —— 最终验证、提交和推送。
已提交（16 个文件）。现在进行 SSH-wrapper 推送 —— 先进行 dry-run。
Dry-run 通过（远程在 aec0ed9，我们的提交 278a12f）。正在重新编写密钥以进行正式推送。
**已推送并验证** — 远程 `main` 分支现在位于 278a12f。最终清理：验证密钥销毁情况和代码树状态。
**WH-27 已完成并推送** — commit `278a12f` 已在 GitHub `main` 分支上验证，密钥已销毁，代码树干净。

## WH-27 交付内容

**轮次核心发现（解码器课程）**：WH-26 探测器搜索了 `span` 元素，而参考项目的 sr chip 是一个 **DIV**，并且其 ☆/★ 正则表达式永远无法匹配 **⭐ 表情符号 (U+2B50)** — 两个解码器陷阱在 WH-26 结论（“sr chip 从未渲染”、“评级不活跃”）中隐藏了两处真实偏差：

- **F-1**：sr 表单的 chip 是 **stock Badge DEFAULT variant**（22px，透明，border rgb(229,229,229)），而不是 mood 表单的 emerald pill — 已通过新的 `SR_CHIP` 记录 + span→div 转换修复（**双站点分离**：mood 保留 emerald + mt-3）
- **F-2**：参考项目的评级填充会渲染 `⭐⭐⭐☆☆` — 我们的 ★ 已被修复为 ⭐
- **F-3**：新的 **(l) e2e 分段** 固定了登录系列五个视图的计算几何结构（下次重新部署时当天捕获漂移）
- **F-4**：参考项目的 OTP 仅限邮箱 — (b)/(c) 数据表面保持平台级阻塞（PAD 常设阻塞行）
- **F-5** 已作废（类型选择在两个应用上均已 SET）

**关卡全绿**：352/352 单元测试 · 14/14 冒烟测试 · 65/65 e2e · 普查匹配 · 31 个字节稳定的捕获 + 新的像素验证 `33-sr-form-interior`（**无 emerald 像素**）· SKILL v1.25.0 + 课程 31。

**建议下一步 (WH-28)**：暗黑登录系列计算内部扩展、⭐ 平台渲染像素检查以及 CSS 哈希监控第 16 轮。
