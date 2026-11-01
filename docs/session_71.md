续接 WH-36 周期。工作区 `git pull` 至 `00b50e0`（操作者推送 session_70）。指令引用 session_69 + session36 计划 + worklog + session_70 → **驱动 WH-37**（session36 计划的建议下一步：常设封锁复检 + 一命令监视第 26 轮〔稳定读即启动降温政策〕 + 双 parity 脚本常设伴跑 + (d) 若两个 parity 面连续安静，第三面候选：dashboard stat-tile 族或 sidebar 外壳）。

文档计数锁步核验（366/71 · SKILL v1.34.0 · .env 契约 `file:../db/custom.db` + db/ 根目录 · vitest/playwright 配置 · sitemap/robots/manifest/OG 全部在役）✓。**基线门禁全绿** —— lint 0/0 · tsc 0 · 366/366（25 suites）· build OK · smoke 14/14 · e2e 71/71 · census MATCH（WH-36 交付态）· `bun audit` 零。WH-36 diff 复核（12 文件，干净 —— parity 脚本 + 文档阶梯 + 四张 mover 捕获，零 src/ 变更）。neo-crm 兄弟复核：线上 SKILL 保持 **v1.202.0**（与 WH-36 记录一致，同族循环）。

审计阶段：读取 `skills/web-application` + `skills/tdd` + `skills/agent-browser` + `skills/skills-catalog` + `skills/tailwind-patterns`。

**本轮核心事件一：监视第 26 轮 —— 再次 MOVED（第六个 bundle）**。`/static/index-BKhnHaM4.js` → `/static/index-CcEolDtM.js`（CSS 自第 20 轮稳定；CDN + frontend-config 在役）—— 第 25 轮的稳定连胜再次打破，**降温政策仍未启动**（需连续两次以上稳定读）。同一登录的 PASS-2 摘要 **15/15 MATCH**（移动端头部 + 完整抽屉组在列 —— 指令的移动端菜单重点在第 26 轮构建上复验）；账本重基 + 双态 born-verify（MOVED 态 + 安静态）。双 parity 伴跑齐飞皆静：moodForm **20/20**（连续第三次）、login **34/34**（连续第二次）—— WH-36 计划 (d) 的前置条件落地。

**本轮核心事件二（F-2，MEDIUM）：演示账号数据 parity 缺口 —— 实时对实时解码并治愈**。由 census（moods=0）与 watch 账本（参考站 mentalHealth "1 entry, 5.0/10, streak 1"）的长期矛盾驱动，两个 scratch 探针双站活读演示账号：参考站渲染心理健康三统计 **5.0/10 · 1 · 1** + 旅程行 [Good / Oct 29, 2026 / Energy Level: 5/10]（无 activities/gratitude/reflection）+ dashboard 的 Mood Entries 瓦片 **1** + 动态流 💚 "Mood check-in / good / Oct 29" 行；我方渲染 **0.0/10 · 0 · 0** + 空旅程 + 瓦片 0 + "No recent activity"。三个面、同一登录、九轮绿灯（lesson 39 双时钟类落在**数据轴** —— 一个任何计算样式 parity 面都不覆盖的维度；§11 的"参考站新建账号也是空的"把新建账号与演示账号混为一谈）。**治愈（TDD）**：新 `tests/seed-parity.test.ts`（2 检查，RED at birth）→ 种子在演示用户 upsert 后直写**镜像心情记录**（good / energy 5 / **固定**当地正午 2026-10-29 —— 参考站行是固定数据；直接 Prisma 写入不触发徽章引擎，捕获态断言保持）+ census EXPECTED 0→1（前提修正）+ §11 行修正 + e2e 演示面 leg 钉住**渲染面**（CRUD 电池首位运行取原始态；a11y 套件的 afterEach 清理从"删全部"修正为"按固定日期保留种子行"—— 清理的实现编码了它那个时代的 pristine 定义）。

**本轮核心事件三（F-3，MEDIUM）：parity 网第三面 + 其解码捕获的 shell 导航漂移族**。第三面选定 **sidebar 外壳族**（数据无关 + 指令的移动端菜单重点；弃 dashboard stat-tile 候选）。五个 scratch 探针双站解码发现**五个底盘继承漂移**：导航行字重族（参考站双站行与激活钉均 **400**；我方 font-medium 500 + font-semibold 600）、抽屉行墨水（参考站实色 rgb(63,63,70)；我方 /80 alpha ≈ rgb(102,102,108) + 其死的 hover:text 亮臂）、字标块 -mt-0.5（-2px/42px vs 0px/44px）。其余全等 —— 含侧栏自身几何（双站 256px border-box + 1px 右边框；解码自身的探针伪影 —— 结构走查落在参考站 shadcn group 无边框包装层内的 255px 内柱 —— 由链读 + 有边框柱锚定解决）。**治愈（TDD）**：nav-weight census（RED at birth）→ 五字面量编辑（每个已解码等值臂保留）+ WH-30 census 双钉形随治愈同步翻转（lesson 36 教义）。**`scripts/parity-shell.mjs`**：61 解码背书成员（26 桌面 + 29 移动 + 6 渐变族）、每站一次登录、零写入、**计算值锚定**定位器（绝不结构走查）、渐变色标三元组 + ±1 板宽 + canvas 规范化墨水；三处探针课出生治愈（成员名错位、抽屉描述定位器、根子锚）→ **born-verified 61/61 MATCH**。

**WH-37 计数阶梯**：单元 366→**369**（25→**26** suites：+seed-parity 套件 ×2 + nav-weight census ×1）、e2e 71→**72**（+演示面 leg）、§8.1 行重算（infra 165 + 新 seed-parity 行 + CRUD 23；锁步钉自身的单元行期望 3→4 随行翻转）。

**WP-5 全量门禁**：lint 0/0 · tsc 0 · unit **369/369（26 suites）** · build OK · smoke 14/14 · e2e **72/72** · census MATCH（moods=1）· `bun audit` 零。src/ 变更恰为五字面量 + 种子/census。

**WP-6 文档阶梯**：PAD §11（watch 行 round-26 + F-2/F-3 行 + 修正行 + §8.1 + 计数）+ AGENTS（计数 + watch 注记：第三面 + 三脚本常设伴跑）+ SKILL v1.34.0→**v1.35.0**（parity 行扩为三面 + **lesson 41** + 版本 + 计数）+ README/CLAUDE 计数锁步 + worklog WH-37 + 计划执行记录 + 本文档。

**WP-7 捕获**：34 文件集经提交程序重取（捕获态教义在役；census MATCH）。第八次跨轮逐字节比对：**两个治愈是设计内像素 mover**（种子数据改变 dashboard/心理健康面；字重/墨水/mt 改变所有带侧栏的面）——每个 mover 先溯源到两个治愈类之一再重基，外加已知亚可见先例类。账本重基，核验 0 错配。

## WH-37 交付内容

**轮次核心发现（lesson 41）**：演示账号本身就是 parity 面 —— 其**数据状态**（不只是外观）必须实时对实时 diff；且前提的主体是会移动的活事实。参考站演示账号九轮前获得一条心情记录，此后三个渲染面在两套全绿钉组后悄然漂移（watch 钉参考站"1 entry"于其账本、census 钉我方 0 于其契约 —— 双时钟落在数据轴）。陈旧前提的解剖：§11 用"参考站**新建**账号也是空的"论证演示列表为空 —— 写下时对演示账号也为真，watch 账本开始钉 "1 entry" 后无人重读。治愈形状：种子镜像解码行（**固定日期** —— 相对日期会让两面随时间漂移）、渲染面进门禁（e2e leg —— 源钉会偏离渲染现实）、census 契约携带修正前提、"恢复原始态"的清理从删全部修正为保留种子行（清理的实现编码了它那个时代的 pristine 定义）。次课（解码自身的伪影）：结构走查不是定位器 —— 255 对 256 的"侧栏漂移"是走查落在参考站内柱；parity 定位器锚定**计算值事实**（根子、渐变文本元素、有边框板）。

- **F-1..F-3 全部处置**：第 26 轮 MOVED 入册（第六 bundle；15/15；重基双态验证）；**数据 parity 治愈**（种子镜像心情记录 + census 0→1 + seed-parity 套件 + e2e 演示面 leg + §11 行修正 + a11y 清理修正）；**shell 导航漂移族治愈**（五字面量 + nav-weight census + WH-30 双钉形同步翻转）+ **parity 网第三面**（`scripts/parity-shell.mjs`，born-verified 61/61）。
- **门禁全绿**：369/369 单元（26 suites）· 14/14 冒烟 · 72/72 e2e · census MATCH（moods=1）· bun audit 零。
- **文档锁步**：SKILL **v1.35.0 + lesson 41**、PAD §11（watch 行 + F-2/F-3 行 + 修正行 + §8.1）、AGENTS、README/CLAUDE 计数、worklog、计划执行记录、docs/session_71.md。

**建议下一步 (WH-38)**：(a) 常设封锁复检；(b) `node scripts/watch-round.mjs` 监视第 27 轮（降温政策仍需连续两次以上稳定读）；(c) 全部三个 parity 脚本作为常设伴跑（moodForm 一次登录、login 零登录、shell 一次登录 —— 与 watch 合计每轮四次参考站登录）；(d) 第四面候选：dashboard 的 stat-tile 族（F-2 治愈后其数据值按构造已可比）或模块页头（PAGE_THEMES 身份族）。
