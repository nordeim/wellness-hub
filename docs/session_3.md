I'll pick up the new task. Let me set up the work plan and start by refreshing the workspace.
The local repo shows commits beyond what I expected — a WH-2 audit round appears to have already happened. Let me pull to make sure I'm current.
Pull brought in `docs/session_2.md`. The workspace is now at `0f159d9`. Note that `docs/worklog.md` was deleted in a prior commit — let me survey the current structure.
The repo is large (3329 files, mostly skills/). Let me check for `wellness-hub_SKILL.md` and locate the key docs.
`wellness-hub_SKILL.md` and `worklog.md` both exist at root — a WH-2 audit round already happened. Now let me review the key session docs to understand current status.
我已了解当前状态：WH-1 构建了应用，WH-2 进行了一次审计，修复了 `/signup` 的品牌重塑滞后问题，并提炼了 `wellness-hub_SKILL.md`。这是下一轮审计任务（WH-3）。现在让我检查一下 `worklog.md` 和 `wellness-hub_SKILL.md`。
现在让我查看根目录文档和 wellness-hub_SKILL.md。
AGENTS.md 已完成审阅 — 是最新的。让我来阅读 README.md 和 CLAUDE.md。
Now the PAD (783 lines) — reading in full.
Let me read the PAD directly in chunks.
PAD 已审阅 — 一致。现在开始审阅 wellness-hub_SKILL.md。
所有五份文档已审阅——它们内容一致且详尽。现在让我检查环境状态，并审阅仓库技能以进行审计。
Environment is intact (deps installed, `.env` correct with `DATABASE_URL="file:../db/custom.db"`, db/ populated). Now let me review the skills catalog and the web-application skill for the audit contract.
Now let me read the web-application skill — the audit contract.
web-application 技能已完全内化 —— 这是审计合同（§0–§20 + 经验教训）。现在让我运行基线门禁。首先，检查 package.json 中的 scripts。
Baseline lint 0/0 · tsc 0 · unit 314/314. Now the build.
**Full baseline gate is GREEN: lint 0/0 · tsc 0 · unit 314/314 · build OK · smoke 14/14 · e2e 42/42.** Now the systematic audit per the web-application skill's dimensions.
`useShallow` is absent — let me check how the store is consumed to verify there's no allocating-selector trap.
Store consumption uses whole-store subscription (stable reference — safe from the allocating-selector trap; no derived selectors exist). Now checking API route hygiene: `force-dynamic`, `requireSession` coverage, and the Tailwind pins.
This public GET serving route is a potential doc/code mismatch — the PAD says "only the owner reads" uploads. Let me examine the full uploads family.
Found a real doc/code mismatch candidate: the `GET /api/uploads/[name]` route is **public** (capability-URL model, 128-bit random names) while AGENTS.md/PAD claim "only serves the owning user's files". Let me see the rest of the upload route and continue the audit.
Upload POST is well-guarded. Now let me check dependency health (live imports + bun audit) and the Tailwind pins.
Several suspicious zero-import hits. Let me verify each thoroughly before concluding.
This is a major audit thread — possible dead dependencies AND stale doc claims. Let me verify exhaustively before concluding.
Major findings confirmed. Let me trace the git history to understand whether these features existed and were lost, or the docs were always stale.
This is a significant discovery cluster. The critical question now: does the reference app's dashboard have charts (making this a parity GAP, not just dead deps)? Let me examine the dashboard page.
The dashboard has **no charts** — stat tiles + quick actions + lists only. Now let me verify the reference site's dashboard (via the reference image and a live probe later) and check globals.css for chart tokens and the Tailwind pins.
Let me see the full bun audit output to categorize the advisories.
All 9 advisories are dev-toolchain transitive — but let me verify the installed zod version (flagged as direct dep `<4.6.6`?) and the dompurify chain state.
Advisory posture: 9 all dev-toolchain (prisma CLI, vitest/vite, eslint's nested zod 4.6.5, postcss) — runtime zod is safe at 4.6.7. Now let me audit the SEO/sitemap surfaces (a specific user ask).
Sitemap implementation is solid (14 routes, byte-exact format) — but there's **CRM-era comment residue** in the sitemap route (an s142 note about `/about` + `/contact` and "`/` is now the PUBLIC landing page" — false for the wellness domain). Let me verify the root page behavior and manifest.
SEO family is thorough; the s142 comment is stale CRM residue. Now let me verify the WH-2 signup fix is standing, check configs, and run the db census.
All standing. Now the config files and mobile-nav component.
Configs are solid (one stale "CRM" mention in vitest.config's comment header). Now the mobile-nav component — the user's emphasized area.
Mobile-nav is solid (Radix Sheet, e2e-pinned). Now the reference-site comparison. Let me check the agent-browser skill and boot our dev server.
Dev server is up and agent-browser is available. Let me walk the reference site — first the login, then the dashboard (to settle the charts/export parity question).
**Confirmed: the reference dashboard has NO charts and NO export buttons** — our dashboard structure matches exactly (4 stat tiles + quick actions + 3 lists). The recharts/jspdf claims are pure dead weight. Now the reference's mobile navigation at 390×844.
The reference's fixed glass header covers the toggle at the click point. Let me scroll to top and retry.
The reference's own fixed header covers its toggle's click point (a reference-side DOM quirk). Let me click via JS directly.
The reference's drawer is open — 10 nav items + Profile & Settings footer (11 total), matching ours. Let me test navigation through the reference drawer.
URL is /Exercise — let me check whether the reference drawer closed after navigation.
Notable: the reference's drawer **stays open** after navigation — our app's route-change auto-close is a documented kept superset (improvement). Let me close the reference drawer and verify escape behavior.
Reference drawer verified: opens (11 items), stays open on nav (ours auto-closes — documented superset), Escape closes. Now the same walk on OUR app.
Our drawer: opens (11 items), navigates to /Exercise, **auto-closes** (superset working), zero console errors. Mobile-nav parity confirmed on both apps. Let me do a final console-error sweep and verify a couple more of our pages.
Let me double-check the reference's module pages for any export/chart features (to be certain nothing is missing on our side).
No export/chart UI anywhere on the reference. Let me finish the audit with the remaining config checks.
The audit picture is complete. Let me run the final verification checks before writing the remediation plan.
所有检查已完成——审核情况已完整并经过验证。现在让我精确定位文档中的每一处错误声明和计数引用，然后再制定修复计划。
All claim sites located. Now let me verify the census-scan roots (globals.css imports, prisma-env) and write the remediation plan.
The CSS imports a **vendored** `./vendor/tw-animate.css` — let me check if the `tw-animate-css` npm package itself is dead too.
**Sixth dead dep found**: the app imports the *vendored* `src/app/vendor/tw-animate.css`, not the `tw-animate-css` npm package. Let me check what prisma-env spawns (for the whitelist) and then finalize the plan.
`prisma` is spawned via `bun x prisma` (whitelist-able CLI). Let me survey the existing test suites before designing the census pin.
16 suites confirmed. Let me run the definitive census across ALL packages now (this validates the plan's core claim before I write it).
8 hits — but two look like false positives (`@tailwindcss/postcss` is the PostCSS plugin key; `react-dom` is React's renderer). Let me verify both.
`react-dom` is a required peer of `next` (whitelist), `@tailwindcss/postcss` is a quoted plugin key (the scan must count quoted config references). Let me refine the probe to the quoted-occurrence model and confirm the exact dead list.
**Census confirmed: exactly 6 dead dependencies.** Now let me write the remediation plan.
Plan written. Now executing TDD — **WP-1: the RED census pin**.
**RED confirmed** — exactly the 6 offenders caught. Now **WP-2: the cure** — remove the dead packages via the package manager, then the orphaned override + dead CSS.
Packages removed. Now the orphaned `overrides` block.
Now the dead CSS in globals.css — the chart tokens and the chart-no-outline utility.
Pin is GREEN, but stale physical directories remain in node_modules. Let me verify the lockfile and do a clean reinstall (the nested-copy lesson from the family history).
Residue persists — let me check the lockfile's 4 remaining references (they may be legitimate transitive deps now).
The remaining references are **legitimate transitive deps** (axe-core via eslint-plugin-jsx-a11y, fast-check@3 via effect). Let me confirm what brings in `effect` and verify the direct-dep sections are clean.
The lockfile's root section is clean — but it says `"name": "activity-map"` while package.json says "wellness-hub". Let me investigate.
Lockfile diff is exactly the dead packages (the "activity-map" name is pre-existing at HEAD — inert carried metadata, not worth lockfile churn). Let me verify the full diff including dompurify.
Lockfile diff is exactly right (the dead transitive subtrees gone with them). Now the full unit suite for the exact new count.
Count dropped and exit 1 — something failed. Let me see what.
The clean reinstall dropped the generated Prisma client. Regenerating and re-running.
**GREEN: 316/316 / 17 suites** (census suite = 2 tests). Now **WP-4 (F-3): the stale comment fixes**.
F-3 done. Now **WP-3 (F-2): the uploads security-posture doc corrections**.
The §6.4 "Path traversal" row needs the accurate mechanism too.
Now **WP-5: the F-1 doc lockstep** — purging the false claims. Starting with README.md.
README done. Now AGENTS.md.
AGENTS.md done. Now CLAUDE.md.
CLAUDE.md done. Now the PAD — the larger edit set.
Now the PAD's testing section + known-issues ledger.
PAD done. Now the wellness-hub_SKILL.md — let me locate all its claim sites precisely.
SKILL edits done. Let me add the WH-3 lesson to §12 and update the frontmatter description.
Now verifying the doc lockstep — no stale claims remain.
Doc lockstep is clean (all remaining mentions are intentional WH-3 history). Now **WP-6: the full gate re-run**.
**FULL GATE GREEN: lint 0/0 · tsc 0 · unit 316/316 · build · smoke 14/14 · e2e 42/42 · audit 9 all-dev-toolchain (the retired chains gone).** Now **WP-7: the screenshot captures** from the remediated dev server.
The old set used different mobile names (13-mobile-login, 14-mobile-dashboard, 15-mobile-nav-open, 16-mobile-drawer-nav-exercise). Let me fix my mis-named captures to match the established inventory.
**16 captures, 16 unique md5s** — the set is genuine. Now updating the plan's execution record and the worklog.
Now the worklog WH-3 entry.
Worklog updated. Final verification pass before the commit.
Screenshots show no diff — let me confirm the re-captures are byte-identical to the committed set (a zero-pixel-change proof).
**Byte-identical captures — zero pixels changed** (the strongest visual non-regression proof). Final checks, then the push setup. Let me consult the SSH-wrapper runbook.
Runbook internalized. Now the commit (main only), then the SSH-wrapper push.
Committed `104f8be` to main. Now the SSH-wrapper push — writing the key and deploying the paramiko shim per the runbook.
Key parses (ed25519). Now deploying the paramiko shim.
Dry-run clean (fast-forward `0f159d9..104f8be`). Real push now.
The push itself was already verified by the wrapper (`remote verified: refs/heads/main @ 104f8be == local HEAD`) — my bare `ls-remote` just lacked `GIT_SSH_COMMAND`. Let me verify once with it set, then shred.
The WH-3 audit round is complete and pushed — remote `main @ 104f8be` verified, key shredded, main only.

**The audit's headline find:** six dead dependencies (jspdf, recharts, html2canvas-pro, fast-check, axe-core, tw-animate-css) shipped three rounds with zero imports — CRM residue whose "CSV/PDF export/charts" features never existed in the wellness tree (the reference was live-probed: no charts, no export UI anywhere). Cured TDD-style: a new dead-dep census pin went RED with exactly those 6, then GREEN after `bun remove` + the orphaned dompurify override + dead chart CSS retired. Also fixed: the overstated uploads security-posture docs, CRM-era comment residue, and all count/claim lockstep (now 316 unit / 17 suites).

**Full gate green:** lint 0/0 · tsc 0 · 316/316 · build · smoke 14/14 · e2e 42/42 · mobile-nav parity re-verified live on both apps · screenshots byte-identical (zero pixels changed — proof the retirement touched nothing visible).

**Suggested next:** review `wellness-hub_SKILL.md` v1.1.0's new lesson 8 ("a dependency is a doc claim"); if you'd like the internal `NEO_*` env contract or the lockfile's stale `activity-map` workspace name cleaned up, that's a natural WH-4 candidate.
