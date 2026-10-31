The repo is cloned and shows a mature codebase with extensive prior sessions. Let me review the core documentation.
Now let me check the docs folder and session documents.
I now have a clear picture: WH-31 shipped (a11y-tree round), and this session drives **WH-32**. Let me review the repo skills catalog and key skill files, then verify the codebase state.
Let me review the remaining core docs' structure and the codebase state in parallel.
Structure matches the docs. Now setting up the environment and running the baseline gate.
Database resolves to repo root as documented. Running the baseline gate now.
Smoke 14/14. Now checking Playwright browsers and running e2e.
Version mismatch — the sandbox has Chromium 1200 but Playwright 1.64 needs 1248. Installing.
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · unit 364/364 (25 suites) · build OK · smoke 14/14 · e2e 69/69 · census MATCH. The documented WH-31 ship state is confirmed. 

Now the audit phase. Let me run the periodic `bun audit` duty and check the agent-browser tooling for the reference-site probe.
**WATCH ROUND 20: the reference REDEPLOYED again — and this time the CSS content hash CHANGED** (`/static/index-s8d1FO8M.css` → `/static/index-BHjkUcdg.css` — new stylesheet content, not just a path move), plus a new JS bundle (`index-BFu7mt5f.js`). Per the lesson-30 doctrine, every standing map must be re-verified. Logging in.
Landed at `/` (consistent with WH-30 F-6), tiles 0/1/0/0 + 💚 — the documented demo state. Since the CSS content hash changed, I'll now walk the standing maps on this new build. Dashboard first:
The H1 reads "Wellness Hub" at 18px with the brand gradient — that's NOT the documented "Welcome Back!" map. Let me screenshot the full dashboard to see what changed.
The first `h1` is the (hidden) mobile-header title — expected per the WH-30 map. Let me probe precisely, checking visibility.
H1s match the documented map exactly. The Quick Actions grid needs a broader search — let me inspect the dashboard structure.
Quick Actions grid found: `grid-cols-2 gap-3` at 12px gap — matches the map. Checking cell heights and the feed:
Quick Actions: 96px cells, 16px icons — byte-parity holds. Now the mobile navigation (the instruction's particular emphasis) at 390×844:
Mobile header byte-parity holds (padL 24, 28×28 r8 trigger, 16px icon, title x=68, one child). Now the drawer battery:
The covering elements are the reference's own toast viewports (z-100, pointer-events auto — a known reference quirk; ours is pointer-events-none, a kept superset). Clicking the trigger programmatically:
Drawer sheet geometry byte-parity (288px, border-r 1px rgb(229,229,229), 11 capitalized hrefs, 32px rows). Checking the close button, scroll-lock mechanism, and initial focus:
Scroll lock confirmed via Radix `data-scroll-locked` + pointer-events:none. Testing Escape-close and viewport-grow auto-close:
Full drawer battery passes on the new build. Now the desktop nav rows and shell chrome:
Shell chrome parity holds (32px rows, 16px icons, 40×40 avatar, zero footers, zero landmarks — the WH-31 F-1 form). Walking the module pages now:
Goals map holds (earned tile still zero-row reference-side). Continuing with StudyResources and MentalHealth:
`/StudyResource` 404s — let me navigate via the actual sidebar link instead of guessing the URL.
Upload field + inline modality hold. Probing MentalHealth mood form interior:
Stats match the documented state (1 entry, 5.0/10, streak 1). Opening the New Entry form to probe its interior:
The reflection shows 60px but the map says h-24 (96px) — possible drift. Let me verify this textarea is the mood reflection:
The reflection IS h-24 (96px) — my first probe caught the gratitude textarea (60px stock). Both textareas match the map. Checking the mood tile selection state:
The Good tile carries a blue→cyan gradient. Let me boot our app and run the identical probe for the parity comparison:
Mood tiles byte-parity (same 5 tiles, Good pre-selected with identical blue→cyan gradient, 104px). Continuing the walk — Learning, Profile, Events, Routines on the reference:
The reference now shows "Watch Video" buttons on Routines — the documented map says template cards render NO Watch Video. Investigating closely:
**MAJOR DRIFT**: the reference's Routines page now renders thumbnails + Watch Video overlays — the documented map says NO thumbnail/NO Watch Video. Mapping this precisely:
The reference now renders 11 templates in TWO families: 5 original (no thumbnail) + 6 NEW video-style cards (160px thumbnail, group-hover Watch Video overlay). Comparing with our app:
**CORE FINDING CONFIRMED**: Both apps carry the same 11 template titles, but the reference's new build now RENDERS thumbnails + Watch Video overlays on the last 6 templates (fields its data always carried — the old build omitted them; the new one renders them). Our app renders neither. Let me decode the family-B card structure fully:
Decoding the remaining family-B cards' image URLs and the Watch Video click behavior:
Our seed already carries the exact thumbnail/videoUrl data for those 6 templates — only the renderer omits them. Checking the Watch Video click behavior on the reference:
The button navigates to the videoUrl. Let me check how our app renders the analogous Learning "Watch Now" button, and inspect our routines card component:
Reference Learning Watch Now matches our map (button, h-9). Let me finish the reference walk — Profile, Assignments, Exercise H1, login family:
The last eval ran on /Exercise (stale navigation). Re-probing Assignments cleanly:
Assignments zero-row omission confirmed (no list section at 0 rows). Now the login family in a fresh session (logged-out state):
Login family byte-parity holds (30px/700, 48×368 r12, blur(4px) glass). Same probe on our app:
Our login card probe missed the element (e2e (l) pin passes at baseline). Targeting our card directly:
Our login card glass matches (blur 4px, white/95, r16). Now checking the reference's family-B category strips vs our seed mapping:
Category mapping is exact — strips will match automatically. Quick 390px check of the family-B card on the reference:
The audit found the Routines page changed — the Schedule modal may have too. Verifying the WH-22 map still holds:
Schedule modal holds (672px, no Cancel, 3 purple circles). One final structural check — does the reference's family-A card carry `group` too?
The audit walk is complete. Let me verify the sitemap/SEO surfaces and do the neo-crm tech-stack review to complete the instruction checklist:
Sitemap/robots/SEO surfaces verified. Quick neo-crm tech-stack review (the instruction's reference repo):
neo-crm confirms the family patterns (same scripts, stack, docs structure — wellness-hub is a faithful sibling). Checking the SKILL doc structure for the docs ladder:
Now let me study the docs-counts pin structure and the a11y/e2e spec patterns for the plan:
Let me check the session-doc conventions before writing the plan:
The audit is complete. Now let me update my TODO list and write the WH-32 remediation plan.
The plan is written. Now WP-0 validation — re-reading every cure site against the plan before executing. First the routines-template-card census (does it pin the old face?):
Key validation catch: the existing WH-24 census **forbids** the thumbnail branch and Watch Video — the pin guards the OLD face and must be flipped in the same commit. Checking the data path (API → store → page) for the thumbnail fields:
Data path confirmed — full rows flow to the page. Now reading the routines page header/imports to prepare the exact edits:
WP-0 validation complete — all cure sites read, the data path confirmed, the WH-24 census's (a) block identified as the old-face pin to flip. Executing **WP-1 RED** now:
Now the new WH-32 census in src-census.test.ts. Let me find the right placement (after the WH-24 routines template-card census):
Now flipping the WH-24 census's (a) block — the old-face pin that forbids the video family:
Now the (p) e2e leg. Let me look at the (o) leg's ending to append after it:
**WP-1 RED verification** — the unit suite should fail at exactly the expected sites:
**WP-1 RED verified** — exactly the expected 7 failures (the WH-32 census RED at birth + the 6 docs-counts lockstep sites). Now **WP-2 GREEN** — the cure. First the `ROUTINE_VIDEO_CARD` record:
One correction — the reference's button base drops `rounded-md text-sm` (its arms carry them). Matching its exact composition to avoid a text-sm/text-xs cascade conflict:
Now the routines-page.tsx cure — the Play import, `group` on the card, the conditional zone, and the rewritten WH-24 comment:
The cure is in. Verifying the census suite goes GREEN:
The WH-29 routines-card census also pins the old card class. Reading it:
The WH-29 census pins the card class without `group` (its own probe comment notes the reference's card already carried `group`). Flipping the pin:
src-census GREEN (46/46). Running the full unit suite to confirm the 365 count:
**365/365 as planned** — only the 6 docs-counts lockstep failures remain (WP-5 cures them with the docs ladder). Now lint + typecheck:
Clean. Now the live parity verification — probing our app's new video-card face against the reference's decoded map:
Parity catch — in the routines family the opacity fade lives on the **overlay** (bg-black/40 + opacity-0), not the button (that's the Learning family's form). My (p) leg asserts the wrong element. Fixing the leg:
Verifying our overlay's resting opacity and hover reveal live (matching the reference's decoded form):
Resting state matches the reference exactly. Testing our hover reveal with a real pointer:
Synthetic events don't set `:hover` (the known doctrine). Using agent-browser's real pointer hover:
**Hover reveal verified live**: overlay 0→1, img scale none→1.05 (the v4 scale property). The implementation matches the reference's family. Now the build + full e2e:
The (p) leg is GREEN on the production build. Running the full e2e suite:
**E2E 70/70 GREEN** — the (p) leg plus the entire standing battery including the axe walks over the new video cards. Completing WP-4 with smoke + census + audit:
**WP-4 GREEN** — smoke 14/14, census MATCH, bun audit zero. Now **WP-5 — the docs ladder**. First, finding every count site:
All count sites mapped. Executing the docs ladder — README first:
Now AGENTS.md — the counts, the watch note, and the routines passage:
Now the AGENTS watch note update (round 20):
Now CLAUDE.md counts:
Now the PAD — counts, §8.1 rows, §8.4, and the §11 ledger rows:
Now the §8.1 row updates (infra 162→163 + video-card census; a11y 21→22 + the (p) leg):
Now the PAD §11 ledger — the watch row update and the new F-1 deviation row:
Now the SKILL doc — version bump, counts, §8 passage, the WH-24 claim update, and lesson 36:
Docs-counts lockstep GREEN (10/10). Now the worklog entry, session doc, and plan execution record:
Now the session_61.md summary doc:
Now **WP-6 — the capture round**. Re-seeding first (the capture-state doctrine), then running the committed procedure:
All 34 captures taken. Running the cross-round byte comparison against the md5 ledger:
29/34 byte-stable, 5 movers. Root-causing each before the ledger re-base — the old versions are in git:
Verifying the Schedule-modal mover's diff region is the backdrop (not the modal face):
All 5 movers root-caused (2 = the F-1 cure by design; 1 = the cure's backdrop knock-on, 95% of diffs outside the modal column; 2 = sub-visible rasterization/transition-instant classes). Re-basing the ledger with the WH-32 record:
Ledger verified 34/34. Let me visually verify the new routines capture shows the video cards:
The change is localized exactly at the first video card's zone (y 800+, below the five bare cards) — capture verification complete. Filling the plan's execution record:
Updating the worklog's remaining placeholders:
Now the final full gate before the commit:
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 365/365 · build OK · 14/14 smoke · 70/70 e2e. Now **WP-7 — commit + push**. Checking the tree state and the commit-message convention:
Tree state is clean and expected. Committing with the established convention:
Committed as `bcfcc85`. Now the SSH-wrapper push — reading the runbook first:
The runbook is clear. Setting up the key (outside the repo) and checking the ssh/paramiko tooling:
No ssh binary — deploying the Appendix A paramiko shim (outside the repo) and materializing the key:
The key parses (ed25519). Running the dry-run first (touches no refs):
Dry-run passed — fast-forward `103dd7a..bcfcc85`. Executing the real push:
**Push verified and key shredded.** Final cleanup of the TODO list:
**WH-32 已交付并推送** — main 分支的提交 `bcfcc85`，远程仓库已由 wrapper 验证，SSH 密钥用后销毁，工作树干净。

**本轮回顾：**

- **监视第 20 轮捕获参考站重新部署** —— 首次 CSS **内容哈希**变更（`index-s8d1FO8M.css` → `index-BHjkUcdg.css`，新 JS bundle，Play-CDN 管线仍在）。按 lesson-30 学说全量复验 15+ 常设面：除一处外全部逐字节对等。
- **F-1 [HIGH] 核心发现**：参考站渲染器变更 —— 携带 thumbnail/videoUrl 的 **六个模板**现在渲染 h-40 缩略图区 + Watch Video 悬停显现族。我方 WH-24 退役（“其 UI 省略这些字段”）连续九轮正确、本轮失效。同轮治愈：`ROUTINE_VIDEO_CARD` 记录 + 条件渲染区 + (p) e2e leg + census，**两枚旧面钉随治愈同 commit 翻转**（lesson 36 的核心）。
- **移动端导航**（指令重点）：两端抽屉电池逐字节对等（288px、隐藏 X、32px 行、Escape、滚动锁、视口增长自动关闭）。
- **门禁全绿**：lint 0/0 · tsc 0 · unit **365/365** · build · smoke 14/14 · e2e **70/70** · census MATCH · `bun audit` 零。
- **捕获**：29/34 逐字节稳定；5 个迁移者全部根因（2 = 治愈本身、1 = 背景连带、2 = 亚可见渲染类）；账本重基 34 文件 0 错配。
- 指令清单全部核验：`.env`/db 根目录契约、vitest/playwright、sitemap/robots/manifest/OG、Tailwind v4 pins、`.env.example`、文档锁步（SKILL v1.30.0 + lesson 36）。

建议下一阶段（WH-33）：监视第 21 轮（内容哈希形态 —— 连续第二次内容变更将指示活跃开发节奏）+ family-A/B 的 Schedule 模态内容拆分 + CDN 管线计算值抽查伴侣。
