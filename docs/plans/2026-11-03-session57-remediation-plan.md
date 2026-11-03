# WH-57 Remediation Plan — the standing audit round (session 57 / session_111)

Date: 2026-11-03 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set; the
session_109/session56-plan/worklog/session_110 inputs; this round executes
the session_109 tail's suggested-next). The operator's explicit checklist
re-verified standing at intake: the `.env`/db contract
(`DATABASE_URL="file:../db/custom.db"`, the `db/` folder at the repo root,
the db-path seam + `tests/db-path.test.ts` pin), the tracked
`.env.example`, the vitest/playwright configs (376/72 with the e2e db
PINNed in `playwright.config.ts`), the sitemap/robots/manifest handlers
(smoke leg 12), the Tailwind v4 pins (all six: hover, dark, shadow-sm,
blur-sm, the three `@source not`), the mobile-navigation battery (the
e2e 7-check spec + parity-shell 61/61 — the drawer family), and the
eslint skills-exclude. Nothing to re-fix: the tree already matches every
item; this round's work is the standing audit cadence itself.

## Round inputs (validated live before this plan)

- `git pull` to `3f68c4c` (main, clean — the WH-56 ship `4223786` + the
  operator's session_110 log push). Environment rebuilt per the bootstrap
  contract: bun 1.3.14, `.env` standing (`DATABASE_URL="file:../db/custom.db"`),
  db:push + db:seed + census MATCH (users=1 templates=11 steps=50
  tutorials=12 badges=8 moods=1). The five docs + session_109 +
  session_110 + the session56 plan (its execution record complete) + the
  worklog WH-56 entry read and validated against the tree: the watch
  ledger at `C_KCpRIS.js`/`xihcXjhm.css` (the WH-56 re-base), the
  `probe-preferences.mjs` evidence standing, the md5 ledger at its WH-56
  base (34 files, the Nov 3 date-axis re-base).
- **The baseline gate ALL GREEN at the exact WH-56 ship state: lint 0/0
  · tsc 0 · unit 376/376 (26 suites) · build OK · smoke 14/14 · e2e
  72/72 (the mobile-nav battery inside — tests 35–41 of the ladder) ·
  census MATCH.**

## Findings (the round's decodes — all live, both apps)

**Watch round 46: FULLY QUIET — both axes stable.** css
`/static/index-xihcXjhm.css` for the FIFTH consecutive round + js
`/static/index-C_KCpRIS.js` (the round-45 final read) unchanged — the
second fully-quiet read in the standing era (the round-44 precedent).
The same-run computed digest read **15/15 MATCH**. No watch ledger
re-base (nothing moved — the watch stays every-round regardless; a quiet
round is a reading, never a retirement).

**The battery (all seventeen surfaces, the NINETEENTH full-width run,
split across the reference login windows per the lesson-46 doctrine):
ALL GREEN — 3,555/3,555** — login 38/38 (the zero-login leg) · moodForm
20/20 · shell 61/61 (the drawer battery — the instruction's mobile-menu
emphasis) · dashboard 105/105 · headers 192/192 · toolbars 114/114 ·
kpis 315/315 · routines 697/697 · tutorials 790/790 · profile 433/433 ·
account 146/146 · authviews 192/192 (the zero-login leg) ·
listinteriors 88/88 · moodjourney 116/116 · calendar 92/92 · schedmodal
89/89 · moodtiles 67/67. The standing data-blocked re-checks rode the
battery green at their empty states.

**The twentieth-surface candidate walk (the session_109 tail's
suggested-next: the Profile Preferences tab's notification-checkbox
non-default states): RETIRED on a live dual-app decode.**
`scripts/probe-notifications.mjs` committed as the round's evidence
(the WH-53/WH-55/WH-56 props-instrument class; zero fires, zero writes
on both apps) — the decode rides the checkbox-anchored App Preferences
panel on the PREFERENCES tab (the WH-56 tab-placement lesson mirrored):

- **The pair's at-rest state: BOTH CHECKED on both apps** ([true,true])
  — our theme store defaults both true (`notificationsEnabled: true` /
  `weeklyReminders: true`, the store's own literals); the reference's
  shared account carries both checked. The checked face is the SHARED
  at-rest rendering; the non-default (unchecked) state stays
  WRITE-blocked on the reference (the Base44 persist channel), ours the
  live-apply + `/api/prefs` persist superset.
- **The wiring decode**: the reference's onChange reads
  `p=>r({...n,notifications_enabled:p.target.checked})` /
  `p=>r({...n,weekly_goal_reminder:p.target.checked})` — the Base44
  state-spread setter alone (form-state buffered; NO immediate apply
  call, unlike the Background Image's setter+apply double); ours reads
  `(e)=>theme.setTheme({notificationsEnabled: e.target.checked})` — the
  store patch → applyTheme → the fire-and-forget /api/prefs sync (the
  cross-device superset). The field names ride the Base44 snake_case
  vocabulary (`notifications_enabled` / `weekly_goal_reminder`,
  SINGULAR "reminder") against our camelCase pair — the inert name
  mapping (the `background_image` precedent).
- **The computed faces byte-identical**: the native bare checkbox
  family (20px × 20px, appearance auto, accentColor auto, cursor
  default) + the row titles identical on both ("Enable Notifications"
  + "Weekly Goal Reminders" — parity-account's pinned texts).
- **The row-cursor split (ref auto / ours default) root-caused as the
  UA-stylesheet derivative of the WH-25 LABEL-association superset**:
  the probe's bare-element arm (inline, ours-only) reads a bare
  `<label>` at cursor default and a bare `<div>` at cursor auto with
  ZERO authored cursor rules — the DOM-SHAPE FACT family (the
  parity-account rowTag FACT precedent), documented, not cured.
- **The instrument's own first-flight bug** (the round's infrastructure
  note): the probe's first flight anchored the reference's rows at the
  grandparent (its rows are DIVs — the anchor landed on the rows
  CONTAINER, both boxes reading row 1's title), caught against
  parity-account's pinned title texts, cured to the parity-account
  anchor (`closest("label") || parentElement`), re-run clean — the
  "first-flight probe errors are INFRASTRUCTURE until reproduced" rule
  applied to the instrument itself.

**The capture round (the TWENTY-EIGHTH cross-round byte comparison):
31/34 byte-stable, THREE movers — ALL root-caused before the re-base.**
**The date-axis re-check (the session_109 tail's prescribed re-check):
ALL SIX WH-56 date-axis movers are back to BYTE-STABLE** — this round's
captures render the same Nov 3 faces as the WH-56 re-based ledger (no
midnight crossing between them), confirming the WH-56 classification
exactly (07-events + 26-events-inline-form + 27-dark-mood-form +
28-routines-schedule-modal + 32-mentalhealth-form-interior +
29-quick-actions-hover all stable). The three movers, pixel-diffed
against the git HEAD (WH-56) captures: 10-learning (8 px / 0.0007%,
maxdelta 7 — the identical parameters to its WH-53 record) = the
standing SUB-VISIBLE RASTERIZATION signature; 24-dark-exercise-rows
(4 px / 0.0003%, maxdelta 17) = the documented capture-24 WRITE-FACE
habitat; 30-tutorial-card-hover (15 px / 0.0013%, maxdelta 29) = the
documented HOVER-FACE habitat. The md5 ledger re-based to the round's
final read, born-verified 34/34 ZERO MOVERS against the re-based
ledger.

## The ToDo list (the round's work packages)

- [x] **WP-1 — the watch round 46**: both axes stable (the second
  fully-quiet read) + the computed digest 15/15 MATCH. No signal: the
  battery ordered anyway (the every-round doctrine).
- [x] **WP-2 — the battery, all seventeen surfaces** (the NINETEENTH
  full-width run): 3,555/3,555 green, split across the reference login
  windows per the lesson-46 doctrine (two windows ~15 min apart; the
  dev server restarted between phases per the same doctrine).
- [x] **WP-3 — the twentieth-surface candidate walk**: the App
  Preferences checkbox pair's non-default states RETIRED on the live
  dual-app decode; `scripts/probe-notifications.mjs` committed as the
  evidence (zero fires, zero writes on both apps).
- [x] **WP-4 — the capture round**: the 34-file set under the
  capture-state doctrine (fresh seed, badgesEarned=0 asserted, the
  phase-split, the ONE login, the capture-24 write position); the
  TWENTY-EIGHTH byte comparison 31/34, the three movers root-caused
  (pixel-diffed vs the WH-56 git HEAD captures), the date-axis re-check
  CONFIRMED (all six WH-56 movers byte-stable on same-day faces), the
  md5 ledger re-based to the round's final read, born-verified 34/34
  ZERO MOVERS.
- [x] **WP-5 — the watch ledger**: NO re-base (the fully-quiet read —
  nothing moved; the WH-55 precedent).
- [x] **WP-6 — the full gate on the final tree** (see the execution
  record; the mobile-nav battery re-run explicitly inside the e2e leg).
- [x] **WP-7 — the docs ladder + the commit/push** (this plan + its
  execution record, the session log, the worklog WH-57 entry, the
  AGENTS round-46 record; README/CLAUDE/SKILL flat — no count sites
  changed; the docs-counts pin 376/72 untouched).

## TDD note

No application source changed this round (the findings were procedural:
the md5 ledger re-base + the probe evidence + the capture bytes) — the
TDD seam discipline applies to source changes, and the ladder is FLAT
(unit 376/376, e2e 72/72, zero test changes). The probe script is a
decode instrument, not a seam: no vitest pin applies (the WH-55/WH-56
probe precedents).

## Execution record (appended after the work packages landed)

- The full gate on the final tree: **lint 0/0 · tsc 0 · unit 376/376
  (26 suites, the ladder FLAT) · build OK · smoke 14/14 · e2e 72/72**
  (the mobile-navigation battery re-run explicitly inside the e2e leg —
  tests 35–41 of the ladder) · census MATCH after the capture reseed.
- The commit: `:fire: fix: WH-57 audit round — ...` on `main` only,
  pushed via the SSH wrapper (`python3 docs/ssh_git_wrapper_v3.py
  --key-file <key outside the repo> --remote
  git@github.com:nordeim/wellness-hub.git`), the remote ref verified ==
  local HEAD, the operator key shredded after.
