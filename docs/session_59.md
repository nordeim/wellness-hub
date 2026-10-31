续接 WH-30 周期。工作区重置后重新 clone 至 `71df19e`（操作者推送 session_58）。指令引用 session_57 + session30-plan + worklog + session_58 → **驱动 WH-31**（session30 计划的建议下一步：常设封锁复检 + 监视第 19 轮 + 参考站侧 earned 瓦片 + 参考站侧栏的 UL/LI menu-item 包裹）。

文档计数锁步核验（364/68 · SKILL v1.28.0 · .env 契约 `file:../db/custom.db` + db/ 根目录 · vitest/playwright 配置 · sitemap/robots/manifest/OG 全部在役）✓。**基线门禁全绿** —— lint 0/0 · tsc 0 · 364/364（25 suites）· build OK · smoke 14/14 · e2e 68/68 · census MATCH（c7532c8 的 WH-30 交付态）· `bun audit` 零（五 override 姿态保持）。

审计阶段：读取 `skills/web-application` + `skills/tdd` + `skills/agent-browser` + `skills/skills-catalog`；neo-crm 兄弟仓库族模式复核；24 轮参考站探测（零参考站写入；我方两端抽屉电池，全部还原）。

**本轮核心事件：监视第 19 轮翻转 —— 参考站重新部署**。编译 CSS 移回 `/static/index-s8d1FO8M.css`（**round-16 之前的内容哈希** —— 样式表内容逐字节相同，仅路径形状回移）、新 JS bundle（`index-5-N3MB6y.js`）、平台新增 `cdn.tailwindcss.com`（Tailwind Play CDN —— 运行时编译）+ `/api/frontend-config.js?v=3`。按 lesson-30 学说（"重新部署重置每一张常设地图"），本轮第一职责是在新构建上执行**全量复验走查**：15+ 常设面逐一计算样式探测 —— 移动端头部内部（padL 24px、28×28 r8 触发器、16px 墨色图标、标题 x=68）、两端抽屉电池（288px sheet、border-r、隐藏 X、11 个大写链接、32px 行、Escape、视口增长自动关闭、滚动锁定）、桌面导航行、Profile 头像卡、footer 缺席、仪表盘磁贴/Quick Actions/信息流、Goals 空态、sr 页（零行 + INLINE 表单中的 Upload File 字段）、心情表单内部、Learning 卡、Profile 标签页、登录族 + 卡片玻璃、日历、Routines 卡 + Schedule 模态、H1 渐变、Assignments 零行省略 —— **全部逐字节对等**：平台重建，非重设计。WH-30 diff 经技能透镜复审（干净）。

**F-1..F-3 三项发现**：
- **F-1 [LOW，本轮核心] 外壳的 A11Y 树**（建议下一步 (d) 的答案）：参考站**零地标** —— 桌面侧栏为匿名 `generic` 包裹 h2 字标 + `list > listitem[level=1] > link` 列（shadcn Sidebar `peer/menu-button` 族），抽屉同为 dialog 内 list 形式，且其导航图标 **未 aria-hidden**（每个链接在树中暴露一个无标签 image 节点）。我方：`complementary` > `navigation "Main navigation"` > aria-hidden 图标 + aria-current，两导航位皆然。同像素，异树 —— 我方为刻意的 WCAG 超集。PAD §11 记录 + (o) e2e leg 钉住（漂移守卫）。
- **F-2 [LOW，仅记录] 监视第 19 轮记录**：重部署 + CDN 管线注记 + 全图保持的结论；两种路径形状（/static/ 与 /assets/）均已出现 —— 平台保留 CDN 期间，运行时编译的 Tailwind 可在**无 bundle 哈希变化**下漂移计算值（监视或需计算值抽查伴侣）。PAD 监视行 + AGENTS 注记更新。
- **F-3 [LOW，正面发现]**：常设封锁复检（sr chip + 四列表内部仍零行；一条心情行保持）；earned 瓦片仍封锁；移动端抽屉电池两端逐字节对等（指令的移动端菜单侧重）；Tailwind v4 pins 全在役，无新 bug 类。

**WH-31 计划**（364/364 · 68→69 + 34 捕获阶梯）。WP-1 RED：CANONICAL 翻转（e2eChecks 68→69）—— 全量 unit RED 恰落 6 处预期成因（docs-counts 五文档 + §8.1 行）。

**WP-2 GREEN**：(o) a11y-tree leg —— 一处中途捕获（leg 自身预期：nav 携带 10 个模块链接，ProfileCard 为 footer 区的第 11 个 —— leg 现按两站真实结构钉住）。无代码治愈（发现为仅记录 + 钉）。

**WP-3/WP-4 全量门禁**：lint 0/0 · tsc 0 · unit **364/364（25 suites）** · build OK · smoke 14/14 · e2e **69/69**（(o) leg 通过）· census MATCH。

**WP-5 文档阶梯**：PAD §11 两行（a11y 树超集 + 监视行 round-19 更新）+ §8.1（a11y 21）+ README 触达目标 bullet 的 WH-30 残留修复（F-7 重锚漏掉的 "44px" 拼写）；AGENTS（round-19 监视注记 + shell-chrome 段的 a11y 树学说 + 计数）；SKILL v1.28.0→**v1.29.0**（§8 的 WH-31 段 + **lesson 35** + 计数）；README + CLAUDE（计数）；docs-counts 10/10 绿。

**WP-6 捕获轮**（doctrine LIVE：光集前断言 badgesEarned=0）：第二次跨轮字节对比 —— **32/34 逐字节稳定**（本轮自身结论的验证：重部署未移动任何面；我方代码未改任何渲染面）。两个迁移者（全部根因，25-dark-login-focus 先例类）：10-learning（16/1,152,000 px，0.0014%，delta≤7 —— 首张教程卡缩略图边缘；Learning 页承载应用唯一的照片缩略图，headless-Chromium 构建的栅格化差异最先显现处）+ 29-quick-actions-hover（5/1,152,000 px，0.0004%，delta≤1 —— 悬停磁贴图标边缘）。根因：**跨会话 headless-Chromium 栅格化差异**（本会话全新安装的 chromium_headless_shell-1248 vs WH-30 的构建）；两个迁移者在本会话两次拍摄中完全一致复现。账本 34 文件重基，校验 0 错配。

**WP-7** —— 本地 commit + SSH wrapper push（--key-file + --remote git@github.com:nordeim/wellness-hub.git，仅 main），密钥用后销毁。

## WH-31 交付内容

**轮次核心发现（lesson 35）**：A11Y 树本身是一个探测面 —— 计算盒探测读几何（WH-23/30 走查），axe 网读违例（WH-17+ 扩展），但两者都不读**树的形状**：哪些地标存在、AT 用户听到什么。参考站的 round-19 重建经无障碍快照解码：其导航为零地标形式（匿名 generic + list > listitem > link，图标未隐藏）；我方为 complementary + navigation + 隐藏图标 + aria-current。同像素，异树 —— 分歧对之前每一类探测不可见。当机制差异藏于语义层，在两应用上解码**树**（无障碍快照，而非 DOM），把所选形式记入账本，并用常设 e2e leg 钉住 —— "向参考站修齐"的诱惑正是超集消亡之路，唯有钉能回答它。

- **F-1..F-3 全部处置**：a11y 树超集记录 + (o) 钉；监视 round-19 记录 + CDN 管线注记；常设封锁与移动端电池全部复核。
- **门禁全绿**：364/364 单元（25 suites）· 14/14 冒烟 · 69/69 e2e · census MATCH · bun audit 零。
- **捕获**：32 逐字节稳定 + 2 迁移者（全部根因 —— 跨会话 Chromium 栅格化差异）；账本 34 文件重基 0 错配。

**建议下一步 (WH-32)**：(a) 常设封锁复检（sr chip + 四列表内部）；(b) 监视第 20 轮（两种路径形状 —— /static/ 与 /assets/）；(c) 参考站侧 earned 瓦片（仍零行）；(d) `cdn.tailwindcss.com` 管线在稳定前每轮一条监视注记（运行时编译的 Tailwind 可在无 bundle 哈希变化下漂移计算值 —— 监视或需计算值抽查伴侣）。
