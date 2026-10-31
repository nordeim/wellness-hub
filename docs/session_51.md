续接 WH-27 周期。工作区完整（上一轮 WH-26 已交付推送 `3dd575c`）。第一步：git pull 核实操作员推送内容。

外部推送只新增 **`docs/session_50.md`**（204 行，操作员对 WH-26 轮的转录）—— 远程 `aec0ed9`。指令引用 session_49 + session26-plan + worklog + session_50 → **驱动 WH-27**。session26 计划的建议下一步：(a) 登录系列 computed-interior e2e leg，(b) sr chip `#` 前缀问题，(c) 心情列表内部（需参考站数据），(d) 评分点击态复核。

文档计数锁步核验（350/64 · SKILL v1.24.0 · .env 契约 · db/ 根目录）✓。**基线门禁全绿** —— lint 0/0 · tsc 0 · 350/350（24 suites）· build OK · smoke 14/14 · e2e 64/64 · census MATCH（`aec0ed9` 的 WH-26 交付态）。

审计阶段：读取 `skills/web-application/SKILL.md`（§0.8 "每个用户可见表面交付前须有 e2e pin" —— 正是目标 (a) 的缺口类）+ `skills/tdd`（期望值须来自独立真值源 = 活体探测）。

**参考站探测 Pass 1**（监视 + 数据解锁尝试）：CSS hash 第 15 轮**未变**（无重新部署，WH-26 地图全部有效）✓。种子监视首轮选择器失效（h3 匹配不到卡标题）→ 后续修正。注册探针：填错字段顺序（3 输入是 Email/Password/Confirm 而非 name/email/password）→ 修正后 register 200 `{"message":"Registration successful. Please check your email for the verification code.","otp_expires_in_minutes":10}` —— **无应用内验证码**。

**Pass 2（登录分支探针）**：未验证账号登录被拒（"Please verify your email before logging in"）→ **(b)/(c) 数据解锁路径在平台层面关闭**（一次性探针账号无法携带数据）。记为 PAD §11 常设阻塞行。

**Pass 3-4（sr 表单客户端态）**：表单按钮全量地图带来**新表面** —— "📝 Notes" combobox（后解码为 Resource Type 选择器，8 个 emoji 选项与我们词汇字节对等，resting 已选 "notes" 前景色 —— F-5 伪线索在 Pass 11 退役：`data-[placeholder]` arm 存在但永不生效，lesson-30 类）。评分点击：5☆ → 点击第 3 颗 → DOM 只剩 2☆ —— **解码器陷阱**：选中星翻转的是 **⭐ EMOJI（U+2B50）**，我的 ☆/★ 正则永远匹配不到 emoji 码点（WH-26 探针同坑）。全量 HTML dump 定论：`⭐⭐⭐☆☆`。

**Pass 5-8（chip 解码四连）**：mood 表单 chip 用真实键盘事件成功（emerald SPAN + bare × —— WH-26 chipHtml 权威确认）；sr 表单 tags chip 前三次失败（合成 setter 不达 React state；/tag/i 误匹配搜索框；/chapter/ 误匹配标题框）→ 真实键盘 + /midterm/ 匹配 + 全元素搜索定论：**sr chip 是 DIV（非 span！）**，类为 **stock Badge DEFAULT 变体** `inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold … text-foreground gap-2`（22px、透明底、border rgb(229,229,229)、ink rgb(10,10,10)）+ bare × + 行 `flex flex-wrap gap-2` BARE —— **与 mood 表单的 emerald 家族完全不同**！WH-26 转换把 mood 解码泛化到了 sr 站点 —— 本轮核心发现。

**Pass 9-10（修正监视）**：种子 11/11 + 12/12 innerText 字节校验 ✓；抽屉 288px + 锁 + escape ✓；预设卫生（默认 indigo→purple）✓。**Pass 11**：类型选择器 resting 前景色（F-5 退役）。

本地登录系列读数（(l) leg 期望值表）：五视图全部与参考站探测值计算相等（h1 30px、h2 24px/700、back 14px/500/gap8、3×44px 输入、64×64 图标、6×40×44 码框、gap 6px、resend ink）—— 修正两处探针（双密码填充 + green-50 callout 选择器）后 verify 视图 6 框全读。

**编写 WH-27 计划**（F-1 sr chip 家族 / F-2 ⭐ 码点 / F-3 (l) leg / F-4 OTP 常设阻塞 / F-5 退役）。WP-0 校验后 **WP-1 RED**：sr-chip 家族 census + 评分码点 census + (l) leg（一处 TS 签名修正：Array.find 返回 undefined）+ CANONICAL 350→352/64→65 —— 全量 unit RED 恰好 8 个预期成因。

**WP-2 GREEN**：`SR_CHIP` record（计算相等 token：border-line/text-ink + dark twins）+ sr 页转换（span→div、TAG_CHIP 从 sr 站点退役、注释更正）+ 评分填充 ★→⭐。**活体验证**：一处期望值 bug（chip 的 `inline-flex` 类在 flex 行内被规范为计算值 `flex` —— CSS 规范行为，双端一致，裸 div 对照证明）修正后**全部读数与参考站计算值一致**（chip DIV/22px/透明/1px rgb(229,229,229)/rgb(10,10,10)/12px/600/r6、行 BARE gap-8/mt-0、chip↔chip gap 8、× bare + aria-label 超集、⭐⭐⭐☆☆ + aria-checked 阶梯；零 DB 写）。

**WP-3 文档阶梯**：PAD §11（sr-chip/rating 退役行 + OTP 常设阻塞行 + WH-26 行叙述更正）+ §8.1（infra 153、a11y 21）；AGENTS（TWO-SITE SPLIT 段落 + ⭐ 码点 + (l) leg + 计数）；SKILL v1.24.0→**v1.25.0**（§8 WH-27 段 + **lesson 31**：解码器词汇须匹配平台的渲染词汇 —— 全量 HTML dump、emoji vs 文本码点、div vs span；一个 record 服务两个站点时须逐站点探测；解码落地后显式 pin 两侧 SPLIT）；README/CLAUDE 计数。docs-counts 10/10 绿。

**WP-4 全量门禁**：unit **352/352** · build OK · smoke 14/14 · e2e **65/65**（(l) leg 6.7s 通过）· census 首跑 **MISMATCH（users=2）** —— wh27-local-login 探针的注册残留（seed 的 deleteMany 不清 users 表）→ 级联删除 + re-seed + census MATCH。

**WP-5 捕获轮**：单脚本 33 捕获（整合 WH-26 程序教训：themeMode 轮询键、Escape 关抽屉、/wh19-no-such-route、cardio/30/moderate、Tab ×2、29 前规范化）。首轮 27 stable + 5 movers + 1 new → 根因：**20/21/22/25 是移动端视口拍摄**（脚本 E 阶段后未复位 viewport —— WH-26 retake 同坑，桌面上下文重拍全部 byte-stable）；**29 = 光栅噪声**（两轮两种噪声图样：5px 与 36k px ±1-2 RGB，maxΔ 2/255，运行间证明，session_40 先例）。**终局：31 byte-stable · 1 mover（29，根因记录）· 1 NEW**。33-sr-form-interior 像素验证：23,493 border-line 边框 px + 752 金色 ⭐ px + 1,938 ☆ 墨 px + 2,542 zinc Add px + **0 emerald-100 px**（Badge 家族治愈证明）。ledger 以 33 文件重基。捕获后 re-seed + census MATCH。

**WP-6 记录**：worklog WH-27 条目 + 计划执行记录 + 本文件。

**WP-7** —— 本地 commit + SSH wrapper push（--key-file + --remote git@github.com:nordeim/wellness-hub.git，仅 main），密钥用后销毁。
