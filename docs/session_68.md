The workspace exists. Let me refresh it with `git pull` and check the current state.
Workspace is clean and up to date. Now let me review the core documentation files.
`git pull` brought in a new `docs/session_66.md`. Now let me read the core documentation files.
Now let me read the remaining core docs.
Now let me read the session history docs — session_65, session_66, and the session34 remediation plan.
Now let me read the session34 remediation plan and the latest worklog entries.
I now have full context: **WH-34 shipped at `859c8aa`** (watch round 23 = first stable read; F-1 jsPath form cure; moodForm 15th watch surface; 365/71 gate green). This session drives **WH-35** per the WH-34 plan's suggested next steps. Let me set up the task plan.
Let me check the sizes of the key skills and read the PAD's key sections.
Now let me read PAD §11 (the watch row — key update site this round) and the tailwind-patterns skill.
Now let me read the tailwind-patterns skill and the watch-round script (the core procedure for this round).
Tailwind skill internalized. Now let me verify the codebase contracts (task 2).
Env/test contracts verified. Now the sitemap/SEO surfaces and Tailwind v4 pins.
All contracts verified (sitemap 14-route byte-format handler, robots, manifest, all five Tailwind v4 pins). Now the baseline gate.
Lint 0/0 · tsc 0 · unit 365/365. Now the production build.
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 365/365 (25 suites) · build OK · smoke 14/14 · e2e 71/71 · census MATCH · `bun audit` zero. The documented WH-34 ship state holds exactly.

Now the audit phase — driving **WH-35**. Let me review the watch script first, then run watch round 24.
**Watch round 24 — key events:**
1. **The JS bundle moved AGAIN**: `index-CXmO9oF_.js` → `index-BKhnHaM4.js` (a fifth distinct bundle) — **NO second consecutive stable read**, so the cooling policy does not start; the watch stays every-round.
2. **15/15 spot-checks MATCH** on the new bundle — zero rendered-face drift; the MOVED signal's demanded walk is satisfied by the same run's digest (the WH-33 companion design working as intended).
3. The moodForm surface (15th) held on its first post-birth round.

Let me check the PASS-1 reporting detail (css/cdn/cfg states) and then build the (c) combined moodForm run.
PASS 1 semantics confirmed: css stable, cdn+cfg present, js genuinely moved (a real hash change — the F-1 form contract now proven on both outcomes across rounds: quiet-state "stable" in round 23, true-firing "MOVED" in round 24).

Now let me study the (c) target — our (k) leg's mood-form pin and our form code — to design the combined run.
Our (k) leg pins our side's form interior. Now let me read the watch script's moodForm probe block to design the (c) combined run.
I have the full watch-script picture. Now let me review the WH-34 diff (the recent change to audit) and check the neo-crm sibling.
WH-34 diff is clean (docs + watch script + captures only). Let me re-verify the live neo-crm sibling for drift.
Live neo-crm sibling: **v1.202.0** (2026-11-01) — one bump past WH-34's v1.201.0 record, same family loop, no structural change.

The audit is nearly complete. Let me check the capture-round procedure + md5 ledger (for WP-5), then start the dev server for the (c) combined run.
Now let me seed the DB and boot the dev server for the (c) combined run.
Dev server is up (login:200, sitemap:200). Let me quickly confirm our form's member correspondence before writing the plan.
All members confirmed on our side. The audit is complete — three findings (F-1 ledger re-base, F-2 the combined-run gap, F-3 the standing record). Now let me write the WH-35 remediation plan.
Plan written. Now **WP-1 — the F-1 cure**: the ledger re-base to the new bundle.
F-1 cure applied. Now the born-verification re-run (must read `assets stable` + 15/15 MATCH, exit 0).
**WP-1 GREEN, born-verified** — `assets stable` on the quiet state + 15/15 MATCH, exit 0. Both branches of the form contract now exercised on the new entry.

Now **WP-2 — the F-2 cure**: the parity-moodform script. Let me check our login flow's redirect shape first.
Our login lands on `/` (the authed dashboard). Now let me write the parity script.
A script bug: my `gotoApp` wraps in `probe`, returning `undefined` on success. Let me fix it to the watch's plain-async form (throwing propagates to the outer probe).
The live-vs-live run **caught a real drift on its first run**: `saveEntryColor` — reference `rgb(250, 250, 250)` (neutral-50) vs ours `rgb(255, 255, 255)` (pure white). Let me investigate our Save Entry button.
Root cause located: our `GRADIENT_BUTTON_BASE` carries `text-white` (rgb 255,255,255); the reference's Save Entry inks **neutral-50** (rgb 250,250,250) — a real cross-app drift the two pin sets never compared (the (k) leg pins the tile ink, the watch ledger pins the reference's save ink; nobody diffed them). Let me check the shared button-family constants, then probe the reference's family ink across several buttons.
The zinc-solid family already carries `text-neutral-50` — the gradient family's `text-white` is the odd one out. Let me check our page-primary labels, then probe the reference's gradient-button family ink across surfaces (one login).
The decode is decisive — the reference carries a **two-family ink split**:
- **Header/activator primaries** (Log Workout, New Event, New Goal, New Entry, Add Resource, New Reminder) + the Profile big save: `rgb(255,255,255)` — **white**
- **Form submits** (Save Entry, Save Workout): `rgb(250,250,250)` — **neutral-50**

Our `GradientButton` uses `text-white` for BOTH families — the form submits drift. Let me enumerate all call sites and the dialog submit paths.
The inventory splits cleanly: 8 header/activator sites (white — parity holds) vs 8 form-submit sites (need neutral-50) + the routines card/modal pair to verify. Let me probe the remaining reference surfaces (one more login).
Goals + Events submits decode **neutral-50** (the split holds); the card activator decodes **white**. Three reads missed (label ambiguity / modal timing). Let me check our own labels, then re-probe with scoped all-gradient-buttons reads.
**The complete decode** — the reference's gradient-button ink split:

| Family | Ink | Our state |
|---|---|---|
| Header/activator primaries (7) + routines card + Profile big save | `rgb(255,255,255)` white | ✓ parity |
| **Inline form-card submits (7: Save Workout, Save Entry, Create Goal/Event/Assignment/Reminder, Add Resource)** | `rgb(250,250,250)` neutral-50 | ✗ **we render white** |
| Schedule modal submit | white | ✓ parity |

A real parity gap — caught by the parity script's first run, exactly its designed purpose. Let me check the dialog inventory, then update the plan and execute the cure TDD-style.
The cure scope is confirmed and contained. The parity script's first run caught a real parity gap — the round's core finding. Let me update the plan with the upgraded F-2 finding and the new cure work package.
Plan updated. Now **WP-2b — TDD RED first**. Let me check the docs-counts CANONICAL block and an existing census for the pattern.
There's an existing `gradient-ink.test.ts` — the natural home for the ink census. Let me read it.
The gradient-ink suite is the natural home for the ink-split pin (+1 check, no new suite). Now the **TDD RED** — the new pin block + the CANONICAL flip + the (k) leg extension. The RED evidence for the rendered value is already observed live (the parity run's `ref 250 vs ours 255`).
Now the new pin block at the end of the suite:
Let me verify the exact GradientButton count before the RED run (my comment arithmetic needs checking).
**16** total — the Schedule modal rides its own `SCHEDULE_MODAL.button` constant, not GradientButton. Let me check that constant's ink, then fix the census count.
`SCHEDULE_MODAL.button` carries `text-white` — correct per the probe (modal = white). Fixing the census count to 16:
Now the CANONICAL flip (365 → 366) and the (k) leg extension:
Now the (k) leg extension — add the saveEntryColor read + expect:
Now run the RED — the gradient-ink suite must fail at birth (import of the nonexistent constant) + docs-counts at the lockstep sites:
**RED verified at exactly the expected sites** — the ink pin fails at birth (1 failed), docs-counts fails at the 6 lockstep sites. Now the **GREEN**: the constant, the prop, the 7 call sites.
Now the GradientButton component gains the `submit` prop:
Now the 7 call-site edits:
GREEN at the pin level (4/4, tsc 0, lint 0). Now the born-verification — the parity re-run (dev server hot-reloads the cure):
**20/20 MATCH — born-verified.** The parity script's first flight caught the drift; the cure restored byte-parity. Let me also verify the other 6 form submits render correctly on our dev server (the census pins the source; this verifies the rendered result).
5 form reads missed (the "last shadow-xl" heuristic picked the wrong card — the form card isn't last in DOM order). Let me scope to the card containing the Cancel button:
**Fully verified rendered**: all 7 form submits neutral-50, the tile family + activators + modal + Profile save white. Let me clean up the scratch probes and compute the neutral-50 worst ratio for the docs.
The neutral-50 worst pair (goals) = **1.84**. Now the **docs ladder (WP-4)**. First the count flips across the five docs:
The §8.1 row-arithmetic pin — the infra row (which owns gradient-ink) needs 163 → 164:
Lockstep GREEN (10/10). Now the PAD §11 rows — the watch row's round-24 update, the new F-2 row, and the white-ink row amendment:
Now the AGENTS.md watch note:
Now the SKILL doc — version bump, the parity passage, and lesson 39:
Now let me add lesson 39, bump the version, and update the quick-reference table:
Now the worklog WH-35 entry:
Now update the plan's execution record with actual results:
Now write session_67.md (the round's summary doc, per the convention):
Docs ladder complete. Now **WP-3 — the full gate**:
The WH-9 component-prop census needs the new `submit` prop registered. Let me find the pin site:
Unit **366/366** GREEN. Now build + smoke + e2e:
**WP-3 FULL GATE GREEN** — lint 0/0 · tsc 0 · 366/366 · build OK · smoke 14/14 · e2e 71/71 · census MATCH · audit zero. Now **WP-5 — the capture round**:
34 captures taken, census MATCH. Now the sixth cross-round byte comparison:
The script landed in my sandbox scripts dir (fine — it's a scratch tool, not a deliverable). Let me run it:
The regex missed the ledger format. Let me inspect the raw data lines:
**30/34 byte-stable, 4 movers.** Let me root-cause each (the WH-32 doctrine: root-caused before any re-base) — pixel-diff against the committed base:
All 4 movers root-caused:
- **26-events-inline-form** (0.033%, maxdelta exactly **15** = 5/255 × 3 channels): the **cure-by-design** — the Create Event submit's glyph pixels at the new neutral-50 ink (the button's text band, right-aligned in the form footer)
- **25-dark-login-focus** (0.0067%): the file's own focus-ring interpolation-instant precedent (WH-33/34)
- **29-quick-actions-hover** (0.0004%, 5px) + **30-tutorial-card-hover** (0.0015%, 17px): the sub-visible rasterization/hover-instant classes (WH-31/32 precedents)
- The byte-stable form-interiors (27/32/33): their submits sit below the 900px capture fold (taller forms) — those submits' new ink was verified live by the parity run + the 7-button rendered pass instead

Now re-base the ledger with the WH-35 record:
Ledger verified (34 files, 0 mismatches). Now the capture health check + worklog/plan record updates:
Now the final pre-commit gate on the full edited state:
Changeset clean (25 modified + 3 new files). Now **WP-6 — commit + push**. Let me read the SSH wrapper runbook:
Runbook internalized. Let me commit the round, then execute the push sequence:
Committed as `8fa0021`. Now the SSH-wrapper push sequence — materialize the key outside the repo, dry-run, then push:
Dry-run passed (fast-forward `b53cda6..8fa0021`). The remote had moved to `b53cda6` (the operator's session_66 log push — already in my local via the initial `git pull`). Executing the real push:
**WH-35 shipped and pushed** — remote verified at `8fa0021` == local HEAD. Now shred the operator key and verify final state:
**WH-35 已交付并推送** — `main` 分支提交 `8fa0021`，远端已验证，SSH 密钥已销毁，工作区干净。

## WH-35 — 实时比对轮次

**基准检查**：已拉取至 `859c8aa`（操作员的 session_66 日志推送已同步至 `b53cda6`）。完整门禁测试通过 — lint 0/0 · tsc 0 · 365/365 · 构建正常 · 冒烟测试 14/14 · e2e 71/71 · census 匹配 · `bun audit` 无漏洞。所有清单项已验证（.env/db 协议、vitest/playwright、sitemap/robots/manifest/OG、Tailwind v4 标记、.env.example、移动端抽屉组件、neo-crm 同级仓库 v1.202.0）。

**核心发现 — 第 39 课**：*双时钟下的双重限制设置*。新的 `scripts/parity-moodform.mjs`（同轮实时对比双应用读取：PASS A 参考，PASS B 我们的开发服务器）在**首次运行**时捕获了一个真实的均等性差距，此前没有任何 pin 曾进行过对比：参考应用将其 **7 个内联表单卡片提交**渲染为 **neutral-50 `rgb(250,250,250)`**，而我们的共享按钮基色（button base）为**白色** — 这种 5/255 的偏差自 WH-15 以来一直未被发现，存在于两组全绿的 pin 组之后（watch 分类账记录了 250；我们的 (k) 支路固定了磁贴（tile）系列的白色 — 没有人对比过提交按钮的墨色）。

**TDD 治愈方案**：`GRADIENT_BUTTON_SUBMIT` = `GRADIENT_BUTTON_COMPACT` 仅交换了 `text-white → text-neutral-50` 臂（按结构设计，字节差异已固定），加上 7 个调用点的 `submit` prop。RED（失败测试）在预期的位置失败 → GREEN（测试通过） → **出生验证：实时比对（parity）重跑 20/20 匹配** + 所有 7 个提交及所有系列在开发服务器上的渲染验证。

**此外**：监控第 24 轮捕获到了**第五个不同的 JS bundle**（`index-BKhnHaM4.js`，CSS 自第 20 轮以来保持稳定） — 无连续稳定读取，冷却策略暂缓；在同一次运行中，15/15 表面在新 bundle 上匹配；分类账重定基并经过出生验证。

**计数阶梯**：365 → **366** 个单元（25 个套件）· 71 个 e2e · 文档同步（SKILL **v1.33.0 + 第 39 课**，PAD §11 ×3 行，AGENTS，README/CLAUDE，worklog，session_67.md）· 捕获：30/34 字节稳定，4 个移动点（movers）均已定位根本原因（一个是按设计治愈；三个是已知的瞬时类）。

**下一轮建议 (WH-36)**：将 parity 脚本与监控作为常设配套程序运行；如果情绪表单（moodForm）保持静默，扩大实时比对成员集（登录系列是下一个自然目标）。
