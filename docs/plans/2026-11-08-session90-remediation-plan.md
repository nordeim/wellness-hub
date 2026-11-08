# WH-90 Remediation Plan — the theme-residue cure round (session 90 / session_191)

Date: 2026-11-08 (UTC) · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/` — see the session_190/session89-plan/
worklog/session_191 inputs for the exact reference), the audit→plan→TDD→gate→
capture→docs→commit→push cadence, the repo skills as the method set (the
web-application/tdd/agent-browser/clone-app-pat-pro set; the skills/ folder
excluded from checking/testing/compilation). The operator's explicit checklist
re-verified standing at intake on the SURVIVING workspace (the sandbox carried
over from WH-89: the tree at `f1e93fb` + the operator's session_191 log commit
pulled to `164c322`; the recovery was the LIGHT form — the pull, the census
MATCH, the gate): the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"`,
the `db/` folder at the repo root), the tracked `.env.example` (bidirectional,
keys MATCH, only AUTH_SECRET's value differs by design), the vitest/playwright
configs (the e2e db PINNED at `file:../db/e2e.db`), the sitemap/robots/manifest
handlers (smoke leg 12), the mobile-navigation battery (the e2e spec + the
watch digest's drawer legs — escape + unlock + grow-auto-close all green this
round), and the eslint skills-exclude. **This round: watch round 79 read BOTH
AXES STABLE at the WH-87 re-based ledger (css `/static/index-BYRIvMx2.css` +
js `/static/index-IYL2plGx.js`, cdn true, cfg true — the FOURTH consecutive
quiet round on the re-based assets) with the computed digest 15/15 MATCH — and
the round's finding: the battery's logged-in legs read a THEME-RESIDUE false
drift (the WH-89 surgical 19 re-capture's dark flip survived the re-seed on
the UserPrefs row the seed never wipes), root-caused at the token level and
cured TDD-first below.**

## Round inputs (validated live before this plan)

- The five docs + session_190 (the WH-89 transcript) + session_191 (the WH-89
  log/summary) + the session89 plan (its execution record complete) + the
  worklog WH-89 entry read and validated against the tree at HEAD `164c322`;
  the workspace SURVIVED from WH-89 (the light recovery, the WH-83/84/89
  precedent).
- The baseline gate ALL GREEN on the surviving tree — lint 0/0 · tsc 0 · unit
  380/380 (26 suites, the ladder FLAT) · build OK · smoke 14/14 (the SEO
  family green: sitemap + robots + manifest) · e2e 72/72 (the mobile-nav
  battery inside the ladder; the chromium cache carried over intact) · census
  MATCH · bun audit zero · the built CSS pipe-rule-FREE.
- The standing checklist items re-verified: the six Tailwind v4 `@source not`
  directives + the hover/dark `@custom-variant` pins + the `--shadow-sm`/
  `--blur-sm` re-pins, the playwright e2e db pin, the SEO route handlers, the
  eslint skills ignore, every tech-stack version claim, zero TODO/FIXME
  markers in src/scripts/prisma, the SKILL frontmatter stamp 2026-11-08
  matching the newest plan date (this session90 plan is same-date — the stamp
  stays, the WH-79 freshness contract).
- Current UTC at round open: ~01:33 Nov 8 — the date-axis family ("8"→"9"
  glyph) re-arms only past ~00:00 UTC **Nov 9**; this round's captures land
  same-day Nov 8 faces vs the WH-89 ledger's Nov 8 faces → the TWELFTH
  expectation of the cycle reads CARRY unless the round runs past the
  crossing.

## Findings (the round's reads — all live, both apps)

**Watch round 79: BOTH AXES STABLE — the FOURTH consecutive quiet round on
the WH-87 re-based assets.** The read: css `/static/index-BYRIvMx2.css` + js
`/static/index-IYL2plGx.js`, cdn true, cfg true, the login geometry MATCH,
and the computed digest **15/15 MATCH** on the same run (the mobile header +
the full drawer battery inside the digest). A quiet round is a reading, never
a retirement — NO watch-ledger re-base.

**F-1 (the round's headline): the THEME-RESIDUE class — the WH-25
clean-account doctrine's gap on the theme axis.** The battery's window-1
legs: login 38/38 + authviews 192/192 green on first flights (the logged-out
family — fresh contexts boot the default light; the server prefs only apply
after login), then moodForm read **3 DRIFT of 20** (inactiveTileBorder /
rangeBg / lowHighColor) and shell **5 DRIFT of 61** (subColor / navRowColor /
drawerBorderRColor / dDescColor / rowColorNorm). Every drift value is the
`.dark` token family on OUR side vs the light family on the reference's:
`--color-line #27272a` = rgb(39,39,42) · `--color-muted #a1a1aa` =
rgb(161,161,170) · `--color-sidebar-foreground #d4d4d8` = rgb(212,212,216) ·
`--color-neutral-700 #404040` = rgb(64,64,64) · `--color-gray-400 #9ca3af` =
rgb(156,163,175) — against the reference's gray-200 rgb(229,231,235) /
gray-500 rgb(107,114,128) / zinc-700 rgb(63,63,70) / line rgb(229,229,229).

**The root cause (verified in the db, not inferred)**: the demo account's
`UserPrefs.themeMode = 'dark'` with `updatedAt` = 00:55:56 UTC Nov 8 — the
WH-89 surgical 19 re-capture's dark flip ("fresh seed, one login, the dark
flip through the real UI"), the round's LAST prefs write. The main 34-file
run landed ~00:52 with its own light flip-back intact; the surgical
re-capture then flipped dark and nothing flipped back. The re-seed cannot
cure it: `prisma/seed.ts`'s idempotent wipe covers the domain + content
tables and the demo-user UPSERT-BY-EMAIL, but NEVER touches UserPrefs — the
row (and its dark mode) rides through every `bun run db:seed`. The WH-25
doctrine's cure command ("assertion fails → re-seed and re-run") is
therefore broken ON THE THEME AXIS: the seed does not restore the clean
account it promises. The WH-89 final gate never saw it (e2e runs on
`db/e2e.db`, smoke on `db/smoke.db`; the census counts rows, not prefs) —
exactly the two-clocks class the battery exists to catch, and it did: the
false drifts are the battery WORKING, the state was dirty.

**The cure (TDD, the smallest root-cause fix)**:

1. **The seed restores the clean account on the theme axis** — the wipe
   block gains `db.userPrefs.deleteMany({ where: { user: { email:
   "sepnetflix2023@outlook.com" } } })`. The prefs seam's lazy create at
   `GET /api/prefs` restores the schema defaults (themeMode "light", the
   stock indigo/purple preset pair, system font) on the next read — the
   same defaults a fresh database boots with.
2. **The capture procedure asserts the light state** — the clean-account
   assertion block (the badgesEarned guard, WH-29) gains a sibling
   `themeMode === "light"` read of `/api/prefs` before the light set: the
   same early-fail guard, the same "re-seed and re-run" cure message, so a
   dirty theme state can never again silently corrupt a capture round.
3. **The structural pins** (the fs-read pattern the seed-parity and
   route-census pins own — the seed and the capture script are executable
   scripts, not importable modules): a new `tests/clean-account.test.ts`
   suite pins (a) the seed's wipe block carries the demo-UserPrefs reset
   and (b) the capture script carries the themeMode guard. RED first
   (written before the cure, verified failing), then GREEN.
4. **The count ladder moves 380 → 382** (+1 suite, 26 → 27): the
   docs-counts pin's CANONICAL literals + the PAD §8.1 seed-parity row
   (files +1, checks +2, the rows summing to the canonical totals) + every
   live-tense doc site (README's badge + claims, AGENTS, CLAUDE, PAD, the
   SKILL) in the SAME commit — the WH-10 lockstep doctrine.

## The ToDo list (the round's work packages)

- [x] **WP-1 — the intake + the baseline gate**: the surviving-workspace
  recovery (the pull `f1e93fb..164c322` bringing the operator's session_191
  log + the census MATCH + the chromium cache intact) + the baseline gate
  ALL GREEN (lint 0/0 · tsc 0 · unit 380/380 · build OK · smoke 14/14 ·
  e2e 72/72 · census MATCH · bun audit zero) — the evidence the tree is the
  exact WH-89 ship state.
- [x] **WP-2 — the watch round 79**: BOTH AXES STABLE at the WH-87 re-based
  ledger (BYRIvMx2.css + IYL2plGx.js, cdn true, cfg true — the fourth
  consecutive quiet round); the login geometry MATCH and the computed
  digest 15/15 MATCH on the same run; NO watch-ledger re-base.
- [x] **WP-3 — the battery + the finding**: window 1's logged-out legs
  green on first flights (login 38/38 + authviews 192/192); the logged-in
  legs read the F-1 theme-residue false drifts (moodForm 3 + shell 5, every
  value the .dark token family) — root-caused to the UserPrefs residue,
  NOT a reference move (the reference renders its own light faces; the
  watch digest 15/15 + the logged-out legs green prove it).
- [x] **WP-4 — the F-1 cure (TDD)**: RED — `tests/clean-account.test.ts`
  written first, verified failing against the uncured tree (2 failed);
  GREEN — the seed's demo-UserPrefs reset + the capture script's
  themeMode guard (2 passed); the live-state cure (re-seed, the
  UserPrefs row verified gone); the false-drift legs re-run green
  (moodForm 20/20 + shell 61/61); the battery window 1 completed clean
  (dashboard 105/105 + headers 192/192 + toolbars 114/114 + kpis
  315/315 — the four legs green on their first flights post-cure).
- [x] **WP-5 — the battery window 2**: the verified-kill dev-server restart
  at the boundary (the reference limiter aged across it), then the nine
  remaining surfaces green on their first flights (profile 433/433 +
  account 146/146 + listinteriors 88/88 + moodjourney 116/116 + calendar
  92/92 + moodtiles 67/67 + routines 697/697 + tutorials 790/790 +
  schedmodal 89/89) — the FIFTY-SECOND full-width run 3,555/3,555.
- [x] **WP-6 — the capture round**: the canonical 34-file procedure on the
  fresh seed (asserting badgesEarned=0 AND themeMode=light — the F-1
  guard's first standing flight, GREEN) — the SIXTY-FIRST cross-round
  byte comparison 33/34, ONE mover: 25-dark-login-focus at its EXACT
  recorded signature (77 px / 0.0067% / maxdelta 5 / bbox 367x121 at
  (457,562) — the WH-20 focus-ring interpolation-tail habitat; fired
  WH-76/79/80/82/83/84/85/88, rested WH-87/89); the date-axis family
  read CARRY (the captures landed ~02:31-33 UTC Nov 8, same-day Nov 8
  faces vs the WH-89 ledger's Nov 8 faces — the TWELFTH expectation of
  the cycle; the "8"→"9" glyph family re-arms past ~00:00 UTC Nov 9,
  carrying to WH-91), the FIVE date-bearing faces byte-held; RESTING:
  10 + 19 + 24 + 29 + 30.
- [x] **WP-7 — the md5 ledger re-base**: per the WH-70 structural-assertion
  doctrine — assertions BEFORE any write (green after two session-local
  script repairs, both aborting BEFORE any write: the separator parsing
  + the re-bases-list tail line), the ONE mover row (25) re-hashed, the
  WH-89 block demoted, the WH-79 block retired + rolled onto the
  re-bases list, born-verified 34/34 ZERO MOVERS.
- [x] **WP-8 — the full gate on the final tree**: lint 0/0 · tsc 0 · unit
  382/382 (27 suites, the ladder MOVED by the F-1 cure +2, the
  docs-counts pin green through every doc edit) · build OK · smoke 14/14 ·
  e2e 72/72 · census MATCH · bun audit zero.
- [x] **WP-9 — the docs ladder + the ship**: this plan (+ its execution
  record) + the session_192 log + the worklog WH-90 entry + the AGENTS
  round-79 record + the PAD §11 rows (the F-1 row + the date-axis CARRY
  row + the movers/watch row) + the count-ladder doc updates (README
  badge + claims, AGENTS, CLAUDE, PAD §8.1, the SKILL — every live-tense
  380/26 site moved to 382/27 in the SAME commit) — committed on main
  only and pushed through the SSH wrapper with the explicit `--remote
  git@github.com:nordeim/wellness-hub.git` (the WH-75 lesson), the remote
  ref verified, the operator key shredded; the working-session transcript
  (session_193.md) as the follow-up commit per the house pattern.

## TDD note

THE round's code axis is the F-1 cure — the first code cure since WH-87's
reorder cure, walked strictly RED→GREEN: the `tests/clean-account.test.ts`
pins written FIRST and verified RED against the uncured tree (the seed
without the UserPrefs reset, the capture script without the themeMode
guard), then the two-file cure turns them GREEN, then the live state is
cured (re-seed) and the false-drift legs re-run clean — the battery's own
reads as the regression evidence. The count ladder moves 380 → 382 under
the WH-10 lockstep doctrine (the pin's CANONICAL literals + every doc site
in the SAME commit). The capture procedure's guard addition is a committed,
documented procedure evolution — the WH-29 precedent (the script's own
header narrates its fixes 1-7; this is fix 8) — NOT a session-local
variation: the md5 ledger's cross-round comparibility rides the committed
procedure, and the guard changes no capture's rendering path (it only
fails earlier on a dirty account).

## Execution record (appended after the work packages landed)

- The F-1 cure (TDD, RED→GREEN): `tests/clean-account.test.ts` written
  FIRST and verified RED (2 failed — the seed without the UserPrefs reset,
  the capture script without the themeMode guard), then the two-file cure
  (the seed's `db.userPrefs.deleteMany({ where: { user: { email:
  "sepnetflix2023@outlook.com" } } })` + the capture guard) turned it
  GREEN (2 passed); the live state cured (the re-seed verified the
  UserPrefs row GONE — the lazy create at GET /api/prefs owns the
  rebuild); the false-drift legs re-run green on the cured state
  (moodForm 20/20 + shell 61/61, the 3+5 false drifts gone). The count
  ladder 380 → 382 (27 suites): the docs-counts pin's CANONICAL literals
  + the PAD §8.1 seed-parity row (1→2 files, 5→7 checks — the rows
  summing to the canonical totals) + every live-tense doc site (README
  badge + 3 claims, AGENTS ×2, CLAUDE ×2, PAD ×3, the SKILL ×2) in the
  SAME commit, the pin 14/14 green.
- The battery (the FIFTY-SECOND full-width run, two reference login
  windows per the lesson-46 doctrine): window 1 green (login 38/38 +
  authviews 192/192 + moodForm 20/20 + shell 61/61 + dashboard 105/105 +
  headers 192/192 + toolbars 114/114 + kpis 315/315 — the two re-verified
  legs + four first flights post-cure), window 2 green on first flights
  (profile 433/433 + account 146/146 + listinteriors 88/88 + moodjourney
  116/116 + calendar 92/92 + moodtiles 67/67 + routines 697/697 +
  tutorials 790/790 + schedmodal 89/89) — **3,555/3,555 across all
  SEVENTEEN surfaces, ZERO real drifts, ZERO limiter trips** (the eight
  false drifts the F-1 residue's own face, cured + re-verified).
- The capture round (the SIXTY-FIRST cross-round byte comparison): the
  canonical 34-file procedure on the fresh seed — ONE clean run, the F-1
  guard's first standing flight GREEN ("clean account asserted:
  badgesEarned=0" + "clean account asserted: themeMode=light"), ZERO
  limiter trips (the pacing-note restart at the battery→capture boundary
  + the reference limiter aged across it). The comparison read **33/34,
  ONE mover**: 25-dark-login-focus at its EXACT recorded signature (77
  px / 0.0067% / maxdelta 5 / bbox 367x121 at (457,562) — the WH-20
  focus-ring interpolation-tail habitat; fired
  WH-76/79/80/82/83/84/85/88, rested WH-87/89). The date-axis family
  CARRIED (the TWELFTH expectation: the captures landed ~02:31-33 UTC
  Nov 8, same-day Nov 8 faces vs the WH-89 ledger's Nov 8 faces, no
  midnight crossed — the "8"→"9" glyph family re-arms past ~00:00 UTC
  Nov 9, carrying to WH-91); the FIVE date-bearing faces byte-held;
  RESTING: 10 + 19 + 24 + 29 + 30.
- The md5 ledger re-based at WH-90 (the ONE mover row re-hashed: 25; the
  WH-89 block demoted to prior narration; the WH-79 block retired — its
  number rolled onto the re-bases list), the structural assertions green
  after two session-local script repairs (both aborting BEFORE any
  write — the separator parsing + the re-bases-list tail line; the
  WH-70 doctrine held), born-verified 34/34 ZERO MOVERS.
- The instrument scratch scripts (the byte comparison + the pixel diff +
  the ledger re-base) ran session-local outside the repo — the standing
  precedent (the committed scripts/watch-round.mjs and
  scripts/capture-round.mjs own the reconstructible procedures).
- The full gate on the final tree: **lint 0/0 · tsc 0 · unit 382/382 (27
  suites, the ladder MOVED +2 with the docs-counts pin green — the SKILL
  stamp verified at 2026-11-08, the same-date session90 plan) · build OK
  · smoke 14/14 · e2e 72/72** (the mobile-navigation battery inside the
  ladder) · census MATCH · bun audit zero.
- The ship: the commit on `main` only (the F-1 cure + the count ladder +
  the mover capture + the md5 ledger + the docs ladder), then the
  SSH-wrapper push with the operator key materialized outside the repo
  (0600, never printed, shredded after) and the explicit `--remote
  git@github.com:nordeim/wellness-hub.git` (the WH-75 lesson). The
  remote ref verified == local HEAD. The working-session transcript
  (session_193.md) as the follow-up commit per the house pattern.
