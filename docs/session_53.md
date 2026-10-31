续接 WH-28 周期。工作区被重置 —— git clone 重建（远程 main 位于 f5118e4 = WH-27 交付 278a12f + 操作员的 session_52 转录推送）。指令引用 session_51 + session27-plan + worklog + session_52 → **驱动 WH-28**（session27 计划的建议下一步：the redeployment watch round）。

文档计数锁步核验（352/65 · SKILL v1.25.0 · .env 契约 · db/ 根目录）✓。**基线门禁全绿** —— lint 0/0 · tsc 0 · 352/352（24 suites）· build OK · smoke 14/14 · e2e 65/65（沙盒 Playwright 浏览器补装后）· census MATCH（f5118e4 的 WH-27 交付态）。

审计阶段：读取 `skills/web-application` + `skills/tdd` + `skills/agent-browser`；14 轮参考站探测（登录 + 监视 + 新可解码面 + bundle 解码）。

**编译 CSS 监视第 16 轮触发** —— `/static/index-s8d1FO8M.css` → `/assets/index-heGLHP2e.css`：**参考站重新部署**（WH-15 以来首次；路径形状本身改变）。WH-15..27 的全部常设对照图逐面活体复核 —— **全部成立**（登录系列 h1 30px/700/w368 · h2 24px/700/h32 · 输入 48px · 3×44×368 字节等位；种子 11/11 + 12/12；抽屉电池双端 288px/11 条 href 字节等位/锁/escape/自动关闭；预设卫生；模块 H1 同色标；排版系统栈双端同算）。常设 pin 发挥了作用。

**本轮核心发现：参考站 demo 账号现在携带数据**（1 条心情记录 good/5/Oct-29）—— WH-26/27 记录为"平台层封锁"的 (c) 心情列表内部 + (b) feed 对共享 demo 账号的既有行**开放**（只读探测；参考站零写入）。四个数据承载面首次可解码；参考站自己的编译 bundle（`/assets/index-Bn9GF0-W.js`，可 grep 反混淆）成为 DOM 只能显示结果、无法显示公式的权威解码源：

- **F-1 [HIGH]** 心情列表 "Your Journey" 内部：标签行 `flex items-center justify-between mb-2` 以 **H4** 承载 text-lg gray-900（18px/600 —— 我方 14px p），日期为**独立右侧 span** text-sm gray-500（我方 ml-2 内联）；容器 div.space-y-4（我方 ul/space-y-3）；瓦片 transition-all。
- **F-2 [HIGH]** Recent Activity feed 构建器（bundle 解码，WH-27 前零行不可观测）：**仅三类**（exercise `${type} workout`+`${duration} minutes` 🏃 实体日期；mood "Mood check-in"+原始值 💚 实体日期；**仅已完成作业** `${title}`+"Completed" ✅ updated_date），合并 + 日期倒序 + 截 8 —— 我方五类自拟标题（"Logged a N-minute workout"）、💪/📚 字形、逐类预截 5、终截 5、**createdAt 键控**（同数据我方渲染 "Oct 31" 而参考站 "Oct 29"）。
- **F-3 [MEDIUM]** 统计瓦片公式（bundle 解码）：Avg Energy `(sum/length).toFixed(1)` → "5.0/10"（我方 "5/10"）；Current Streak `min(7, 条数)` —— **非连续日 streak**（2 天前的记录：参考站 1、我方 0）。
- **F-4 [MEDIUM]** shell 元素标签漂移（lesson-31 类）：参考站侧栏字标 `<h2>`、移动端玻璃头标题 `<h1>`（桌面隐藏、移动双 h1 —— 其自身语义）；我方均为 `<span>`。
- **F-5 [PROCESS]** 重新部署本身 —— 常设图全部成立；监视学说更新为匹配双路径形状。

**编写 WH-28 计划**（352→358/24→25 + 65→66 + 33→34 捕获阶梯）。WP-0 校验后 **WP-1 RED**：displayStreak pin + activity-feed spec（新 suite 2 checks）+ 三个 src-census 块（mood-entry-list / activity-feed / shell-tag）+ e2e feed leg + CANONICAL 翻转 —— 全量 unit RED 恰好落在预期成因（3 census + 6 docs-counts + displayStreak + 模块缺失）。

**WP-2 GREEN**：`MOOD_ENTRY_LIST` record + mentalhealth 页转换（ul→div、h4 标签、日期外移至右侧组毗邻我方 delete 超集）；`displayStreak` seam（**双消费者分割**：瓦片镜像参考站 stub，徽章引擎保留真实连续日数学 —— "7-Day Streak" 徽章自述 "7 days in a row" 要求之）；瓦片 toFixed(1) + displayStreak；纯 seam `src/lib/activity-feed.ts` + 路由转换（moods take 5→50）+ 页面字形图 🏃/💚/✅ + div 容器（feed + upcoming 列表）+ wire kind 联合收窄；双 shell 标签转换。**两处 WP 中途捕获治愈**：WH-11 导出类型 census（seam 接口去导出；spec 改纯字面量）+ 仪表盘姊妹 ul 列表（reminders/events 随 feed 转 div）。**一处 e2e 捕获治愈**：shell spec 的 build 期 `level: 2 toBeHidden` 断言（span 期空洞通过）重定向为参考站语义（h2 字标桌面可见 + h1 移动标题桌面隐藏）。

**活体验证**（一次镜像写入：参考站 demo 行 good/5/Oct-29 + 一条过去日期 workout；随后 re-seed，census MATCH）：瓦片 **"1"/"5.0/10"/"1"** 与参考站字节一致；h4 标签 18px/600/rgb(17,24,39) + 日期 14px/rgb(107,114,128)，左缘位置相同（justify-between 展开；我方 delete 占 40px 右差）；feed 行 💚/"Mood check-in"/"good"/"Oct 29" + 🏃/"cardio workout"/"30 minutes"/"Oct 21"（**实体日期** —— createdAt 漂移治愈）；字标 h2 桌面可见 + 移动标题 h1 移动可见（双 h1 —— 参考站自身语义）。

**WP-3 文档阶梯**：五文档计数位锁步（358/25 + 66/6+1）；PAD §11（WH-28 行 + 部分解除封锁行 + NaN 空例偏差 + 监视形状学说）+ §8.1（wellness 7/93 · infra 12/156 · CRUD 20）；AGENTS（card-family 段补全 + 监视学说 + 计数）；SKILL v1.25.0→**v1.26.0**（§8 WH-28 段 + **lesson 32**）；README/CLAUDE 计数。docs-counts 10/10 绿。

**WP-4 全量门禁**：lint 0/0 · tsc 0 · unit **358/358（25 suites）** · build OK · smoke 14/14 · e2e **66/66**（新 feed leg 2.2s 通过）· census MATCH。

**WP-5 捕获轮**（doctrine LIVE：光集前断言 badgesEarned=0；轮末 re-seed + census MATCH）：三版程序迭代后 **28 byte-stable · 5 movers（全部根因归档）· 1 NEW**。movers：05（预期治愈 —— "0/10"→"0.0/10" 瓦片）；19（光栅噪声类：160px maxΔ1/255）；29（预期治愈、feed 之面：Recent Activity 行渲染新三类构建器，而 WH-27 期捕获显示退役的五类行 —— 旧程序把 capture-24 写入留到 29 之后所致，本轮复刻之）；32/33（程序态类：旧脚本未记录的表单微态 + 滚动，best-alignment 解码 ~136/128px，残差 ~14% —— 原脚本不可得则不可重建；表单内部本轮已活体验证）。NEW **34-mood-list-interior**：参考站 demo 行镜像 + 瓦片 "1"/"5.0/10"/"1" + H4 标签行（内容校验：emerald hero + 蓝→青 chip + 非空 census）。账本以 34 文件重基。**三条捕获程序教训**：单暗色种子上下文把暗态泄漏进浅色登出捕获（01/13 —— 按相位分割）；登出/登录循环触发登录限流器（重拍轮 —— 双上下文设计全程仅登录一次）；旧程序的写入留存至 29（feed 行之面）。

**WP-6 记录**：worklog WH-28 条目 + 计划执行记录 + 本文件。

**WP-7** —— 本地 commit + SSH wrapper push（--key-file + --remote git@github.com:nordeim/wellness-hub.git，仅 main），密钥用后销毁。

## WH-28 交付内容

**轮次核心发现（lesson 32）**：数据封锁面不是关闭面 —— 封锁可在**无重新部署**下解除（demo 账号自身数据变化）；常设封锁是关于参考站状态的假设而非属性 —— 每轮复核。参考站自己的编译 bundle 是权威解码源（可 grep 反混淆）—— DOM 显示值而不显示公式时（统计瓦片 "5.0/10" 是 toFixed(1) 还是 floor？），从 bundle 读公式（`e.length>0?Math.min(7,e.length):0` —— Current Streak 是**条数截 7** 而非连续日）。一个 seam 服务两个需要不同公式的消费者时（瓦片要参考站 stub、徽章引擎要真实数学），**按消费者分割 seam**（WH-27 双站点学说施于消费者）。

- **F-1/F-2/F-3/F-4 全部治愈**：MOOD_ENTRY_LIST record + displayStreak seam + activity-feed 纯 seam + 双 shell 标签转换 + wire 类型收窄。
- **关卡全绿**：358/358 单元（25 suites）· 14/14 冒烟 · 66/66 e2e · census MATCH。
- **捕获**：28 byte-stable + 5 movers（全根因）+ 新 34-mood-list-interior；账本 34 文件重基。

**建议下一步 (WH-29)**：(a) sr 列表侧 chip —— 剩余常设封锁（demo 账号无 study-resource 行；每轮复检——封锁可如心情那样解除）；(b) 参考站下次重新部署监视（CSS hash 第 17 轮，/assets/ 形状）；(c) exercise/assignment/events/goals 列表内部（同一数据承载类——demo 账号今日仅心情行；操作者每记一条新行即开一面）；(d) 32/33 表单内部捕获微态（仅当未来轮重定基线时可重建——账本注记携带程序）。
