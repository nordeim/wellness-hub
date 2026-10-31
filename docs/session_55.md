续接 WH-29 周期。工作区重置 —— git clone 重建（远程 main 位于 4da40cd = WH-28 交付 0b5cbd5 + 操作者的 session_54 转录推送）。指令引用 session_53 + session28-plan + worklog + session_54 → **驱动 WH-29**（session28 计划的建议下一步：sr 列表侧 chip 复检 + CSS 监视第 17 轮 + 四个列表内部复检）。

文档计数锁步核验（358/66 · SKILL v1.26.0 · .env 契约 `file:../db/custom.db` + db/ 根目录 · vitest/playwright 配置 · sitemap/robots/manifest）✓。**基线门禁全绿** —— lint 0/0 · tsc 0 · 358/358（25 suites）· build OK · smoke 14/14 · e2e 66/66（沙盒 chromium-1248 补装后）· census MATCH（4da40cd 的 WH-28 交付态）。

审计阶段：读取 `skills/web-application` + `skills/tdd` + `skills/agent-browser` + `skills/skills-catalog`；14 轮参考站探测（零参考站写入；我方一次暗色翻转经真实 Profile UI，已还原）。

**本轮核心处境：三扇建议下一步的门全部关闭** —— 编译 CSS 监视第 17 轮 **STABLE**（`/assets/index-heGLHP2e.css` + bundle `index-Bn9GF0-W.js` 未变，WH-28 以来无重新部署）；参考站 demo 账号仍仅一条心情行（sr 列表侧 chip + exercise/assignment/events/goals 列表内部依旧零行封锁）。审计转向数据封锁轮从未打开的面：**两个种子数据承载卡**（Routines 模板卡 + Learning 教程卡，两端 11+12 行自种子起即可解码，从未解码）+ **Goals Achievements 区段** —— 且参考站自己的编译 bundle（lesson 32 解码源）打开了 DOM 无法打开的一扇：**实体模型**。

**F-A..F-H 八项发现**：
- **F-A [LOW]** workouts + mood-entries POST 各存一行不可达死代码 `return ok(row);`（awardBadges 插入类）—— WH-6 census 只匹配**完全相同**的相邻 return（`prev === curr`），这两行内容不同；治愈 = 删两行 + 规则放宽为任意 return-后随-return。
- **F-B [MEDIUM]** Learning 难度 chip 走错 Badge 变体：参考站同一卡上两种变体 —— 分类 chip SECONDARY 族（border-transparent + shadow + hover 臂 + 着色）、难度 chip **OUTLINE 族**（裸 `border` + text-foreground，无 shadow/hover/bg，12 实例；计算值 border rgb(229,229,229)、shadow none —— 我方 secondary 基底渲染成隐形边框 + 阴影）。治愈 = OptionChip 双变体（`variant="outline"`）。
- **F-C [LOW]** chip 元素标签：参考站是 stock shadcn Badge **DIV**（我方 span —— sr-chip 教训施于全部 12+ 实例）。
- **F-D [LOW]** 两卡标题：参考站裸 **DIV**（`font-semibold tracking-tight text-lg [line-clamp-2]`）；我方 h3 + 多余 text-foreground（计算等价）。
- **F-E [MEDIUM]** routines 卡：参考站卡 `overflow: VISIBLE`（计算探针）—— 其 h-2 分类条以**方角**越过 12px 圆角（像素验证：角部扫描读得 amber f59e0b 于 x=0..10/y=0..7，裁剪卡应读页面背景）；我方 overflow-hidden 裁成圆角 —— 未记录偏差。治愈 = 移除裁剪 + section→div，两端像素字节一致。
- **F-F [MEDIUM]** routines benefits 列表：div.space-y-1 + p 行（我方 ul/li —— WH-28 mood 列表同类，晚一轮落在种子面上）。
- **F-G [MEDIUM，本轮核心]** **Achievements 区段实体模型从参考站 bundle 解码**（`GU()` 组件）：`Achievement.list("-earned_date")` 填充 —— **按用户行表**（demo 账号零行 → 空态是 FACE 而非数据缺口）；行模板：垂直 `space-y-3` + `p-4 rounded-xl border transition-all` 瓦片（earned：yellow-50→amber-50 渐变 + yellow-200 边框）+ text-3xl 图标 + **H5** 名称 + xs 描述 + 底行 outline 分类徽章 + earned 独有 amber "+N pts"。我方一直渲染 8 徽章目录网格 —— 空态**不可达死面**（API 返回全目录，长度条件永不归零），WH-17 起经代码注释知晓、十二轮全绿存活（注释不是账本行）。治愈 = `ACHIEVEMENT_TILE` record + earned-only 渲染 + 可达空态 + "0/8 earned" action chip 退役（参考站头仅标题）；"of 8 total" KPI 副标题保留目录语义 + 分类 chip 省略（值在零行下不可观测；我方 Badge 模型无 category 列 —— 编造不是解码）—— 两项 PAD §11 记录偏差。
- **F-H [MEDIUM，审计中先行治愈]** **安全账本漂移**：`bun audit` → 1 moderate（minimatch GHSA-g3hv-75wg-m249，经 eslint 链：根 3.1.5 + 嵌套 typescript-estree 10.2.6）—— WH-8"零漏洞"姿态老化。治愈 = `minimatch: "11.0.3"` override（registry-latest，跨版本但 API 兼容 —— eslint 9.39.5 于 11.0.3 上 lint 全绿，audit 读 "No vulnerabilities found"，lockfile 单一 11.0.3 解析）+ every-resolution pin。

**WH-29 计划**（358→362/25 + 66→67 + 34 捕获阶梯）。WP-1 RED：WH-6 规则放宽 + 三个 src-census 块（chip 双变体 / achievements earned-only / routines 卡词汇）+ dead-deps minimatch pin + e2e achievements leg + CANONICAL 翻转 —— 全量 unit RED 恰落预期成因（4 census + 6 docs-counts；dead-deps 生而 GREEN —— F-H 已先行）。

**WP-2 GREEN**：两行死代码删除；OptionChip 转换（span→div + variant 双基底）；Learning 难度 chip 传 outline；两卡标题 div 化（text-foreground 退役）；routines 卡 overflow-hidden 移除 + section→div；benefits div/p 化；`ACHIEVEMENT_TILE` record + goals 页转换。**三处 WP 中途 census 治愈**：WH-17/WH-24 chip 规则改读 SOLID_BASE/OUTLINE_BASE 常量；WH-9 props pin 有意识加 variant；WH-14 调色板 pin 增 yellow-200/900/950。**一处 e2e 治愈**：achievements leg 的 settle-wait（`.or(空态)` 匹配到**预水合**空分支 —— achievements===undefined 渲染同一段落；改等 TILE，该点套件中唯一合法稳态）。

**活体验证**（dev server）：难度 chip 字节对等（DIV · shadow none · border rgb(229,229,229) · bg transparent —— 两端计算值一致）；chips/标题/卡全 DIV；routines 卡角部像素扫描 f59e0b —— 与参考站字节一致；Goals 空态在种子零态可达 + 网格消失；一次徽章赚取写入（workout 经 API）→ earned 瓦片于解码几何（渐变 + H5 "First Step" + "+10 pts" + 🏃 text-3xl + space-y-3 容器）—— 随后 re-seed，census MATCH。

**WP-3/WP-4 全量门禁**：lint 0/0 · tsc 0 · unit **362/362（25 suites）** · build OK · smoke 14/14 · e2e **67/67**（新 achievements leg）· census MATCH · `bun audit` 零。

**WP-5 文档阶梯**：PAD §11 四行（achievements 退役 + 两项记录偏差 + 种子卡词汇退役 + 死 return 退役）+ §10 安全行重锚**五 override** + §8.1（infra 12/160 · CRUD 21）；AGENTS（chip 双变体 + achievements + routines 卡学说 + 五 override 姿态 + 计数）；CLAUDE（badges 段 + 计数）；README（特性行 + 计数）；SKILL v1.26.0→**v1.27.0**（§8 WH-29 段 + **lesson 33** + provenance 再验证）；docs-counts 10/10 绿。

**WP-6 捕获轮**（doctrine LIVE：光集前断言 badgesEarned=0）：**21 byte-stable + 13 movers（全部根因）**。movers：6 项预期治愈（03/18 条带方角；10/30 outline chip + DIV 标题；11 achievements 之面；28 遮罩后变更卡行）+ 7 项程序态（16 抽屉焦点归还时序；23 暗态登出上下文种子态；24 写入的非 feed 字段；25 Tab 焦点目标；29 悬停过渡采样瞬时；32/33 常设表单内部类）。**两项捕获程序治愈随轮交付**：`scripts/capture-round.mjs` 首次入库（32/33"不可重建"类就此终结）；34 写入的 zod-400（字段名 energyLevel vs schema 的 energy —— 首跑静默拍到空态）教训**断言写入状态**；修正后 34 对 WH-28 基准 **BYTE-STABLE**（md5 一致）。账本 34 文件重基，全量 md5 校验 0 错配。

**WP-7** —— 本地 commit + SSH wrapper push（--key-file + --remote git@github.com:nordeim/wellness-hub.git，仅 main），密钥用后销毁。

## WH-29 交付内容

**轮次核心发现（lesson 33）**：参考站的**实体模型**可从其 bundle 解码 —— `Achievement.list()` 是按用户行表而非目录；区段在零行下的空态是 FACE 而非数据缺口；bundle 解码不止公式（lesson 32）—— 它解码数据模型（哪个实体、每用户什么行、零态意味着什么）与渲染模板（元素词汇、变体臂、条件结构）。且超集面无账本行即不可辩护 —— 目录网格自 WH-17 经注释知晓不同，十二轮全绿存活，因为偏差住在代码注释里而非 PAD 账本。

- **F-A..F-H 全部治愈**：achievements earned-only 转换（目录网格退役）+ chip 双变体 + DIV 词汇清扫 + 条带方角像素对等 + 死 return + 规则放宽 + minimatch override。
- **门禁全绿**：362/362 单元（25 suites）· 14/14 冒烟 · 67/67 e2e · census MATCH · bun audit 零。
- **捕获**：21 byte-stable + 13 movers（全根因）；捕获程序入库；34 修正后字节稳定。

**建议下一步 (WH-30)**：(a) sr 列表侧 chip + 四列表内部 —— 常设封锁，每轮复检（lesson 32）；(b) 监视第 18 轮（/assets/ 形状）；(c) earned 徽章瓦片的**数据承载面**在参考站侧的确认（操作者若在参考站赚取一枚，其分类 chip 值 + unearned 臂即开）—— 我方瓦片已按解码模板渲染；(d) 捕获程序已入库 —— 32/33 程序态类应于 WH-30 首次跨轮字节对比中消失。
