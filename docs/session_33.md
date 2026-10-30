I'll continue with the current generation's remediation task (sessions 30/31 + plan17). Let me set up the task tracking and start by refreshing the workspace.
The workspace exists from previous generations. Let me check git status and pull the latest changes.
The repo is clean and up to date — last commit is the WH-17 audit round. Let me pull to confirm freshness and check the docs structure.
The pull brought in `docs/session_31.md` — a new commit. Let me check the latest log and read the key documents.
上一轮是 WH-17（a11y round）。最新的拉取提交 `b485241` 添加了 `docs/session_31.md` —— 这是当前这一代的会话记录。现在让我来阅读关键文档。先从 `session_31.md`（最新）和 `session_30.md` 开始。
`session_31.md` is the transcript of the completed WH-17 round (pushed at `64c8eaa`). Let me read `session_30.md` and check whether plan17 already has an execution record.
`session_30.md` and `session_31.md` are both transcripts of the completed WH-17 round. The current prompt (referencing session_30 + plan17 + session_31) therefore drives the **WH-18 round**. Let me read plan17's execution record and the worklog's WH-17 entry.
Plan17 was fully executed. This round is **WH-18**. Now let me read the core docs. Starting with AGENTS.md and README.md.
现在让我查看 PAD 结构和关键部分，以及 SKILL 文档的 frontmatter。
Docs internalized. The state: WH-17 shipped at `64c8eaa` (+ operator's session_31 push at `b485241`); gate green at 326 unit / 46 e2e. This round is **WH-18**. Let me verify the environment and validate understanding against the codebase.
Environment intact: `.env` carries the relative `DATABASE_URL`, `db/` seeded at repo root, dev server alive, census MATCH. Now the baseline gate — fast signals first.
Fast signals GREEN: lint 0/0 · tsc 0 · **326/326 (21 suites)**. Now the heavy gate items.
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 326/326 · build OK · smoke 14/14 · e2e 46/46. Let me verify the advisory posture, then start the live reference probe.
Advisory posture ZERO, e2e db pinned. Baseline is the documented WH-17 ship state. Now the **live reference probe** — first checking the agent-browser tooling per the house procedure.
Logged in. Per the probe-preset protocol amendment, the first check is the account's preset state — the brand family.
Preset check CLEAN (Indigo Dream `#6366f1→#a855f7` — no residue). Now the 11-page H1 identity walk + the compiled-CSS asset-hash watch (round 5).
所有页面都报告了品牌家族的渐变——探针获取到了错误的元素（可能是移动端页眉的 H1）。让我更仔细地探查所有标题。
The correct probe needs the visible H1. Let me get our PAGE_THEMES map first, then re-walk the reference with the corrected probe.
Our map in hand. Re-walking the reference with the corrected visible-H1 probe.
All 11 H1 identities byte-identical to the WH-15 map; CSS hash UNCHANGED (`index-heGLHP2e`) — watch round 5 clean, no redeployment. Now the seed-content watch round 7.
Reference seeds captured (12 tutorials + 11 templates). Comparing against our seeded db byte-for-byte.
Seed watch round 7: **23/23 byte-for-byte**. Now the entity-API shape watch round 6 via network capture.
The Tutorial entity API is visible. Let me fetch its shape from within the authenticated page context.
Entity-API watch round 6: **12 rows / 13 keys / views:0** — holds. Now the drawer battery at 390×844.
Drawer open with the 11 nav items + Close. Now the stays-open-after-nav quirk.
Stays-open quirk holds. Now close and verify teardown, then the remaining watches (404, Watch-Now placeholders, quick actions).
**REFERENCE PROBE COMPLETE — EVERY WATCH CLEAN** (identity map 11/11, CSS hash unchanged, seed 23/23, entity API 12/13/views:0, drawer battery, 404, placeholders, quick actions, preset hygiene). No redeployment — this round's findings are codebase-side. Now the codebase audit, starting with the repo skills catalog.
The web-application skill internalized. Now the audit — starting with this round's natural candidate: widening the a11y net to WCAG 2.2 (the session_31 suggestion). First, let me examine the current a11y net spec.
The current net pins WCAG 2.1 A+AA with WCAG 2.2 explicitly deferred to "a future widening round". Let me probe whether WCAG 2.2 tags produce real findings on our app — an ad-hoc axe probe against the dev server.
WCAG 2.2 tags came back **completely clean** on desktop routes + drawer. But the net's mobile coverage only asserts the open drawer — not the mobile pages themselves. Let me widen the probe: full axe walk at 390×844 on every module route, plus a 320px reflow check (WCAG 1.4.10).
Mobile axe walk + 320px reflow: **all clean**. The a11y surface holds at 2.1+2.2. But there are two rendered STATES the gate has never read: **dark mode** and the **8 color presets** — both live user-flippable via the Profile. Let me probe dark mode with axe.
Dark class lost — the store likely re-syncs from server prefs. Let me read the rehydration logic.
The server-prefs sync overrides untouched local state — that's the documented last-write-wins. The real user path is the Profile's Theme Mode picker. Let me flip Dark through the UI instead.
**MAJOR FINDING** — dark mode (a rendered state the gate has never read): **138 color-contrast violation nodes** across 8 module routes, plus the `/login` page **loses the dark class entirely**. Let me verify the contrast math and the dark card background.
The math doesn't obviously fail (gray-400 on #18181b ≈ 7:1) — let me read the actual computed colors of the flagged elements in dark mode.
**THE SMOKING GUN**: computed fg is `rgb(75,85,99)` — **gray-600, the light value** — while the card bg IS the dark token `#18181b`. The `.dark` class applies (tokens swap) but the `dark:` **utilities never fire**. That's the classic Tailwind v4 bug: without `@custom-variant dark`, `dark:` compiles to `@media (prefers-color-scheme)` instead of the `.dark` class. Let me verify.
**ROOT CAUSE CONFIRMED at the compiled-CSS level**: every `dark:*` utility in the production bundle is wrapped in `@media (prefers-color-scheme:dark)` — the Tailwind v4 default — while our engine flips a `.dark` **class**. The two strategies never meet: tokens swap but utilities don't fire. This is the sixth member of the Tailwind v4 bug family, and it means Dark mode is visually broken for every user who flips it. Let me complete the audit — census the `dark:` usage and check the reverse direction (OS-dark user in Light mode).
77 `dark:` occurrences across 4 files. Now the reverse direction — an OS-dark user who explicitly chooses Light mode (media matches, class absent).
The probe shows `darkClass: true` — my earlier UI flip **contaminated the account's server-side prefs** (the exact residue class the WH-16 protocol amendment warns about). Let me revert the account to light via the UI (which PUTs to the server), then run the clean OS-dark-in-light probe.
**REVERSE BREAK CONFIRMED** — account reverted (server prefs verified light), and the clean OS-dark + mode=light corner shows **gray-400 on white cards (2.54:1)**: every OS-dark user sees broken light mode without touching anything. Both corners broken by the same root cause. Now the remaining audit questions — first, why `/login` loses the dark class.
The theme store only mounts inside the (app) group — `/login` never loads it. And `page-layout.ts` line 389 has `dark:bg-neutral-900/95` — let me check which record that is and whether the login surface consumes it.
The login surface carries a full dark vocabulary on the **media strategy** while the app pages ride the **class strategy** — two incompatible halves. Let me census the text utilities lacking `dark:` siblings (the post-fix failures) across the tree.
Census shows missing `dark:` pairs on Events weekday headers, Profile info box, Goals badge text, Learning thumbnail/search pill, plus the login-family and error pages. Let me also census fixed `bg-white` surfaces on app pages and check the sidebar/sheet washes.
The toasts carry fixed `bg-white` — if their text rides tokens (which flip light in dark), that's white-on-white. Let me check.
**Another severe finding**: toasts are fixed `bg-white` with token text — in dark mode the text flips to `#fafafa` on white = **invisible toasts**. Let me check the remaining primitives (dialog, select, input) for the same pattern.
Select uses tokens but its focus arm is fixed `focus:text-neutral-900` — near-black on the dark `line-soft` in dark mode. Let me check the dialog content surface, then complete the audit with the preset contrast question.
Dialog is token-based (dark-safe). Let me check the reference's own preset palette for the parity ledger, and our mobile sheet + Profile panel surfaces.
Sheet and panels are token-based ✓. Now the reference's own preset palette for the parity ledger.
The reference's presets are **identical to ours** (including Golden Yellow — parity-shared class). Let me check the reference's dark-mode surface for the parity ledger.
The reference has the same Light/Dark/Auto picker. Let me flip its Dark and inspect what actually happens — the "partially-broken dark" parity evidence.
The reference's "Dark" is 93% light pixels — definitively the broken surface AGENTS documents. Our working dark is the superset. Reverting the reference account to Light (probe hygiene).
Reference reverted to Light (active chip verified). The audit picture is complete. Let me verify the standing classes (Tailwind pins, env parity, SEO) and check the palette pin block for the pairs the dark fixes will consume.
All standing classes verified. One design question remains — where the auto-mode media listener lives, before I decide the login-surface mount shape.
The audit is nearly complete. One more confirmation — the repo's Tailwind v4 skill documentation for the canonical class-based dark variant fix (the prompt's warning zone).
The canonical fix form is confirmed in the repo's own skills corpus. Let me do the final standing checks (sitemap content, SEO) then write the plan.
SEO family standing clean. The audit is complete — time to write the WH-18 remediation plan. Let me check the house plan structure first.
Plan written. Now validating it against the codebase — the e2e patterns, census structure, and docs-counts sites.
The plan validates. Now **WP-1 (RED)** — the pins first. Let me view the src-census tail to append the new pins in house style.
Now writing the WP-1 RED artifacts — the two census pins first.
**RED verified** — exactly the 2 new census checks fail (328 total). Now the e2e net widening. Let me check the toast lifetime and a convenient Select surface for the interactions test.
All selectors confirmed. Before writing the e2e net, let me scope the exact Profile-page dark pairs needed — the PRESET_CARD and THEME_MODE_PICKER records.
Complete fix inventory in hand. Now the e2e net extension — the a11y spec widening.
Let me simplify the drawer-in-dark section — `setViewportSize` mid-test instead of the new-context dance.
Now the docs-counts CANONICAL flips (the ladder carriers).
The edit broke the object structure (duplicates + lost closing). Fixing.
**RED verified for the unit set** — exactly the 2 census pins + 8 ladder carriers. Now the e2e RED verification.
All 4 new tests RED, 3 existing GREEN. Let me verify each failure is for the *expected* reason (violations, not selector flakiness).
The light walk now fails too — 10 offenders. That's a test-isolation break: the dark walk's server-prefs flip races the light walk running in a parallel worker. Let me check the parallelism config.
`workers: 1` — serial. The light walk's failure means the account state persisted dark from run 1's failed revert (or the e2e db isn't reset per run). Let me inspect the light walk's actual offenders and the e2e setup's reset behavior.
Confirmed — the light walk inherited the DARK state from the previous run's failed revert (the e2e prefs persist across runs). Two cures: `afterEach` reverts in the dark describes + self-healing normalization in the light walk.
Isolation hardened. **WP-1 RED complete.** Now **WP-2 (GREEN)** — cure #1: the variant pin in globals.css.
Variant pin in. Now the missing pairs — let me read the full LOGIN_LAYOUT record and login-card's own classes to scope the login-family fixes.
The OTP digits inherit `#fafafa` on white — invisible in dark. Let me check the pin block for the pairs I'm about to use, then apply all the F-2/F-3 cures.
缺失的 PIN：neutral-400, neutral-100, emerald-800, rose-800, blue-400。现在开始批量应用所有 F-2 修复——先处理四个模块页面。
Now the page-layout records (TABS_SEGMENTED + THEME_MODE_PICKER) and the toast/select components.
现在是登录系列（OTP 输入框 + slate/blue 文本）和重置密码界面。
Now the error pages.
Error pages done. Now **ThemeBoot** (F-3) — the component + the root-layout mount.
ThemeBoot 已挂载。接下来是 **F-4** —— theme-store 中真正的自动模式监听器。
Listener in. Now the palette pins — let me run the pins⇔usage census to get the authoritative missing-pin list.
The census names exactly 6 missing pins. Adding them to the session-88 block.
Pins added. The pin-block narration carries a pair count — let me update it.
Census GREEN — 113 pins = 113 used pairs. Both narration sites are stale (globals says 109, AGENTS says 95 — the WH-17 truth was 107). Fixing both.
Now the fast signals on the cured tree.
Unit state: the 2 census pins GREEN, tree counts GREEN — only the 6 doc-site carriers remain (WP-3's scope). Now rebuild and verify the compiled-CSS strategy flip.
**Compiled-CSS oracle confirms the cure**: zero `prefers-color-scheme`, the `:where(.dark,.dark *)` selectors are in. Now the dark e2e walks against the rebuilt production server.
The interactions test passes now. Three remain — inspecting each failure.
Three distinct classes remain. Let me get the full failure details (login + the OS-dark corner).
The corner passes alone — its full-run failure is the fire-and-forget PUT racing context teardown (the WH-16 "verify reverts SAVE" lesson). Three real stragglers remain. Let me look at the day cells and the mode-card label.
Three targeted fixes: the events day cells, the active mode-card label, the login divider label — plus the afterEach PUT-landing hardening.
Now the afterEach PUT-landing hardening (the WH-16 "verify reverts SAVE" lesson applied to the suite).
All cures in. Rebuild and re-run the full a11y spec.
**A11Y NET FULLY GREEN — all 8 tests, all four dark-state walks.** Let me do a live computed-color sanity check of the cured dark state on the dev server.
All three straggler classes verified cured with computed colors — the dark state is live and correct. Now **WP-3** — the count ladder + five docs. Let me enumerate every site.
All sites enumerated. Executing the doc lockstep — README first.
README done. Now AGENTS.md — counts, the sixth Tailwind pin, and the a11y-net bullet.
AGENTS 已完成。现在开始 CLAUDE.md。
CLAUDE done. Now the PAD — §8.1 rows, totals, tree, checklist, known issues.
PAD done. Now the SKILL doc — frontmatter, §2/§8/§11/§12, and the count sites.
Now the SKILL provenance + §2/§8/§11/§12 + all count sites via a scripted pass.
All 7 landed. Now the SKILL file-count sites + §12 lesson 22.
All SKILL edits in. Running docs-counts to verify the lockstep.
Docs lockstep GREEN 10/10. Full unit suite now.
**328/328 GREEN.** Now **WP-4** — the full gate from the top.
**FULL GATE GREEN — e2e 50/50** (the ladder landed exactly). Final gate items: audit + census.
Gate fully green. **WP-5** — the captures. Light set re-take + the new dark set, via the house procedure.
All 20 captured, account reverted (PUT verified). Now the capture health check + the mover analysis.
All healthy — the dark set is genuinely dark (1283+/1290 non-white pixels). Now the mover analysis vs the committed WH-17 set.
Movers root-caused: **14/16 byte-stable**; 10-learning is sub-threshold raster noise (0 pixels above Δ7); 12-profile is the intended active-mode-card ink change (221 px). Now checking which scripts are tracked, then WP-6.
Scratch scripts stay untracked (house pattern). **WP-6** — the worklog entry, plan execution record, and session_32.md. Let me check the worklog head format.
Writing the WH-18 worklog entry.
Worklog in. Now the plan's execution record.
Now `session_32.md` — the round transcript.
WP-6 done. **WP-7** — final verification, staging, commit, push. Final unit run + staging check.
328/328 green. Staging the tree (excluding scratch scripts).
Staged tree clean (32 files, no secrets). Committing with the house-style message.
Committed `c555eae`. Now the SSH-wrapper push — reading the runbook first.
The shim survived from the previous round. Writing the key outside the repo and running the wrapper (dry-run first).
Dry-run clean (`b485241..c555eae`). Real push now.
The wrapper shredded its internal copy — my source key file needs manual cleanup per the runbook.
**WH-18 (the dark-mode round) complete and pushed to `main @ c555eae`** — remote verified, key shredded, tree clean.

## What the round found and shipped

1. **Reference probe — every watch clean** (third consecutive no-redeployment round): H1 identity 11/11, CSS hash unchanged, seed 23/23, entity API 12/13/views:0, drawer battery, 404, placeholders — plus **two new parity probes**: the reference's own Dark toggle is *visually inert* (683/736 sampled pixels stay light post-click — our working dark is the superset), and its preset catalog is byte-identical to ours.

2. **The round's core finding (F-1, CRITICAL — the Tailwind v4 bug the prompt warned about)**: every `dark:*` utility compiled to `@media (prefers-color-scheme:dark)` (v4's default) while the theme engine flips a `.dark` **class** — the strategies never met. Dark mode shipped broken through 17 green rounds: **138 axe violation nodes across 8 routes** in dark, and gray-400-on-white (2.54:1) for every OS-dark user in light. Cured with the canonical `@custom-variant dark (&:where(.dark, .dark *))` — the sixth v4 pin, form verified from the repo's own skills corpus, compiled bundle re-verified as the oracle.

3. **The companion cures**: ~20 missing dark pairs (incl. **invisible toasts** and the **unreadable select highlight**), **ThemeBoot** (the login family now carries the chosen mode), the auto-mode listener (narrated since build, never built), +6 palette pins (113=113).

4. **The systemic net (F-5)**: the a11y net widened to the **rendered-states axis** — the dark walk, the OS-dark corner, the dark login, and the select/toast interactions, all at **WCAG 2.1+2.2 A+AA** strict zero.

**Gate:** lint 0 · tsc 0 · **328/328** unit · smoke 14/14 · **e2e 50/50** · audit 0. **Captures:** 14/16 byte-stable + the new dark set (17–20). All five docs + worklog + `session_32.md` lockstepped; SKILL v1.16.0 with lesson 22.

**Suggested next:** the preset axis (8 presets × the walk, computed-contrast-led under gradients), or the functional-superset round when the reference next redeploys.
