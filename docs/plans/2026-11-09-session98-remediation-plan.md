# WH-98 Remediation Plan — the both-axes-twice watch + THE STANDING QUARTET RE-BASE (session 98 / session_213 + session_214)

Date: 2026-11-09 (UTC) · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/` — see the session_213/session97-plan/
worklog/session_214 inputs for the exact reference), the audit→plan→TDD→gate→
capture→docs→commit→push cadence, the repo skills as the method set (the
web-application/tdd/agent-browser/clone-app-pat-pro set; the skills/ folder
excluded from checking/testing/compilation). The operator's explicit checklist
re-verified standing at intake on the SURVIVING workspace (one git pull
fast-forward 037b784..cc960ca, one file: docs/session_214.md — the first
surviving intake since WH-96): the `.env`/db contract
(`DATABASE_URL="file:../db/custom.db"`, the `db/` folder at the repo root,
custom.db + e2e.db + smoke.db standing after the gate), the tracked
`.env.example` (bidirectional, keys MATCH, only AUTH_SECRET's value differs by
design), the vitest/playwright configs (the e2e db PINNED at `file:../db/e2e.db`),
the sitemap/robots/manifest handlers (src/app/sitemap.xml + robots.txt +
manifest.json, smoke leg 12), the mobile-navigation battery (the e2e spec + the
watch digest's drawer legs — escape + unlock + grow-auto-close all green this
round, live on BOTH apps), and the eslint skills-exclude.

## Round inputs (validated live before this plan)

- The five docs + session_213 (the WH-97 working-session transcript) +
  session_214 (the WH-97 round summary) + the session97 plan (its execution
  record complete, all 9 WPs closed) + the worklog WH-97 entry read and
  validated against the tree at HEAD `cc960ca`.
- The baseline gate ALL GREEN on the standing tree — lint 0/0 · tsc 0 · unit
  383/383 (27 suites, the ladder FLAT at the WH-97 ship state) · build OK ·
  smoke 14/14 (the SEO family green: sitemap + robots + manifest) · e2e
  72/72 (the mobile-nav battery inside the ladder) · census MATCH · bun
  audit zero.
- The standing checklist items re-verified: the six Tailwind v4 `@source not`
  directives + the hover/dark `@custom-variant` pins + the `--shadow-sm`/
  `--blur-sm` re-pins, the WH-94 F-1 dev-script cure standing
  (`"dev": "next dev -p 3000"` — no tee), the playwright e2e db pin, the
  SEO route handlers, the eslint skills ignore, zero TODO/FIXME markers in
  src, the SKILL frontmatter stamp 2026-11-09 (this session98 plan is ALSO
  Nov 9 — the stamp STAYS, the WH-79 freshness contract holds).
- Current UTC at round open: ~08:06 Nov 9 — the WH-97 captures landed
  ~06:43 UTC Nov 9, so this round's captures land SAME-DAY Nov 9 faces vs
  the ledger's Nov 9 faces — the date-axis family's TWENTIETH expectation
  of the cycle reads CARRY (the WH-91 precedent class): the FIVE
  date-bearing faces (07-events + 26-events-inline-form + 27-dark-mood-form
  + 28-routines-schedule-modal + 32-mentalhealth-form-interior) read
  byte-stable; the family re-arms on the Nov 9 → Nov 10 crossing, carrying
  to WH-99.
- The WH-96 F-1 lesson applied and EXTENDED this round (see the infra
  finding): the dev server stdio → FILE in the OS fd-passthrough form —
  a userland `.pipe(createWriteStream)` drain still wedges under a frozen
  execSync event loop (the 64 KB pipe fill), so the session-local drivers
  pass the file descriptor straight to the child.

## Findings (the round's reads — all live, both apps)

**Watch round 87: BOTH AXES MOVED TWICE INTRA-ROUND — the WH-71
both-axes-twice class, the first since round 60.** The first read: the css
axis `/static/index-CD4jDvim.css` → `/static/index-B7INj5W8.css` (the
NINETEENTH css form, ending the three-round quiet css streak) PAIRED with
the js axis `/static/index-C7ULD4QH.js` → `/static/index-CvdSKjj0.js` (the
FIFTY-FIFTH distinct bundle) — the second double-axis move in three rounds
(the WH-92/70 class). The born-verification flight after the md5-ledger
re-base read BOTH MOVED AGAIN: css `B7INj5W8` → `/static/index-a762OGh_.css`
(the TWENTIETH css form) + js `CvdSKjj0` → `/static/index-BRjocVCb.js` (the
FIFTY-SIXTH distinct bundle) — three reference deployments inside the round
window. The stability re-read read the SAME `a762OGh_`/`BRjocVCb` pair. The
login geometry MATCH on every read; the computed digest read **15/15 MATCH
on EVERY read — all four flights, both moved pairs** (the mobile header +
the full drawer battery inside the digest — escape + unlock +
grow-auto-close all pass). Per the WH-71 intra-round doctrine the watch
ledger re-based ONCE to the round's FINAL read (`a762OGh_` + `BRjocVCb`),
born-verified on the quiet state: the re-run reads "assets stable" + the
15/15 digest.

**The battery: ZERO drifts — the standing tree verified, NO code cure.**
The SIXTIETH full-width run across two reference login windows (the
reference limiter aged across the boundary): window 1 ALL EIGHT legs green
(login 38/38 + authviews 192/192 + moodForm 20/20 + shell 61/61 + dashboard
105/105 + headers 192/192 + toolbars 114/114 + kpis 315/315 — 1,037 computed
members), window 2 ALL NINE green (profile 433/433 + account 146/146 +
listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 + moodtiles 67/67
+ routines 697/697 + tutorials 790/790 + schedmodal 89/89 — 2,518 computed
members) — **3,555/3,555 across all SEVENTEEN surfaces, ZERO drifts, ZERO
reference-limiter trips** (the two grid legs green — the WH-92 reorder cure
holds). Four first-flight transients re-verified green on their second
flights (moodForm in window 1, moodjourney + calendar + moodtiles in
window 2 — the fresh-boot compile-settle class, the WH-93 account-leg
re-flight precedent).

**THE INFRA FINDING (session-local, ZERO repo impact — the WH-96 F-1
family's sibling): the sandbox reaps background dev servers between
operator tool calls, and a userland-drained stdio pipe still wedges under
execSync.** Two silent server deaths mid-battery (the parity legs'
ours-side navigations timing out on a dead :3000 — the git tree byte-clean
through every incident; the standing tree's own battery legs had already
run green on the pre-death server). The cure, both parts session-local:
(1) the window/capture/watch drivers now own the server's FULL LIFETIME
inside one call (boot → legs → kill — no cross-call survival required);
(2) the first capture driver's `stdout.pipe(createWriteStream)` form
REPRODUCED the WH-96 F-1 wedge at the exact recorded failure point
(capture-round.mjs:136, the second /Events goto): execSync freezes the
driver's event loop → the server's request log fills the 64 KB pipe buffer
→ the server's main thread blocks writing its log → the capture's next
goto times out. Re-cured at the OS level: `stdio: ["ignore", fd, fd]`
fd-passthrough — the kernel drains the log with no userland dependency —
after which the canonical 34-file capture procedure completed clean in one
run. The committed instruments (capture-round.mjs, the parity legs, the
watch) are untouched and correct; the wedge lived in the session-local
driver's stdio design, exactly the WH-96 F-1 diagnosis's class.

**The SIXTY-NINTH cross-round byte comparison: FOUR movers, all
environmental, ZERO app-source — the EXACT WH-97 quartet re-firing at its
recorded signatures.** The canonical 34-file procedure on the
fd-passthrough dev server — ONE clean run, the clean-account guards' NINTH
standing flight GREEN (badgesEarned=0 + themeMode=light, the fail-closed
design), census MATCH after. The movers: (a) **25-dark-login-focus** at its
EXACT recorded signature (77 px / 0.0067% / maxdelta 5 / bbox 367x121 at
(457,562) — the WH-20 focus-ring interpolation-tail habitat, its FIFTEENTH
recorded firing); (b) **29-quick-actions-hover** at its recorded
dither-phase signature (5 px / 0.0004% / maxdelta 1 / bbox 5x5 at
(503,326) — the WH-39 canvas-dither family, its THIRD consecutive
capture-axis firing); (c)+(d) **the paired thumbnail-decode dither** —
10-learning + 30-tutorial-card-hover BOTH moving at the IDENTICAL 149 px /
0.0129% / maxdelta 2 / bbox 191x169 at (719,666), the remote-asset decode
class born at WH-97, its SECOND recorded firing at the same region inside
the Learning grid's card-2 thumbnail IMG (the seeded remote unsplash asset
photo-1507003211169-0a1dd7228f2d; the tutorials parity leg 790/790 green
the same round proves every datum byte-held). The captures landed ~09:15
UTC Nov 9 on SAME-DAY Nov 9 faces — the date-axis family's TWENTIETH
expectation reads CARRY (the five date-bearing faces byte-held; the family
re-arms on the Nov 9 → Nov 10 crossing, carrying to WH-99). RESTING: 19 +
24.

## The ToDo list (the round's work packages)

- [x] **WP-1 — the intake + the surviving-workspace verification + the
  baseline gate**: one git pull fast-forward (037b784..cc960ca, one file)
  + the standing checklist re-verified live + the baseline gate ALL GREEN
  (lint 0/0 · tsc 0 · unit 383/383 · build OK · smoke 14/14 · e2e 72/72 ·
  census MATCH · bun audit zero).
- [x] **WP-2 — the watch round 87 (the both-axes-twice intra-round
  double move)**: the first read's double-axis move (css CD4jDvim →
  B7INj5W8, the NINETEENTH form; js C7ULD4QH → CvdSKjj0, the FIFTY-FIFTH
  bundle), the born-verification flight's second double move (css →
  a762OGh_, the TWENTIETH form; js → BRjocVCb, the FIFTY-SIXTH), the
  stability re-read holding the same pair; the login geometry MATCH and
  the computed digest 15/15 MATCH on every read; the watch ledger re-based
  ONCE to the round's FINAL read per the WH-71 doctrine, born-verified
  "assets stable" + the 15/15 digest.
- [x] **WP-3 — the battery windows 1 + 2 (the SIXTIETH full-width run)**:
  window 1 ALL EIGHT legs green (1,037 members), window 2 ALL NINE green
  (2,518 members) — 3,555/3,555 across all SEVENTEEN surfaces, ZERO
  drifts, ZERO reference-limiter trips; the four first-flight transients
  re-verified green (the fresh-boot compile-settle class).
- [x] **WP-4 — the session-local infra finding classified + cured (NO repo
  impact)**: the cross-call server-reaping deaths documented; the
  driver-owns-the-server-lifetime pattern adopted; the userland
  `.pipe(createWriteStream)` stdio wedge root-caused at the exact WH-96
  F-1 failure point and re-cured at the OS fd-passthrough level; the
  canonical capture then completing clean in one run — the committed
  instruments untouched and correct.
- [x] **WP-5 — the capture round + the SIXTY-NINTH cross-round byte
  comparison**: the canonical 34-file procedure on the fd-passthrough dev
  server — ONE clean run, the clean-account guards' NINTH standing flight
  GREEN (badgesEarned=0 + themeMode=light), census MATCH after — the
  comparison read FOUR movers, all environmental, ZERO app-source: the
  EXACT WH-97 quartet (25 + 29 + the paired 10/30 thumbnail-decode
  dither) re-firing at its recorded signatures.
- [x] **WP-6 — the movers' classification: all environmental, no cure** —
  the git tree byte-clean at HEAD; the battery zero-drift; the parity legs
  green; the movers root-caused + pixel-diffed against the git HEAD (WH-97)
  captures.
- [x] **WP-7 — the ledger re-bases**: the md5 ledger re-based at WH-98 per
  the WH-70 structural-assertion doctrine (assertions BEFORE any write
  green on the FIRST pass; the FOUR mover rows [10 + 25 + 29 + 30]
  re-hashed, the WH-97 block demoted to prior narration, the WH-84 block
  retired — its number rolled onto the re-bases list), born-verified
  34/34 ZERO MOVERS; the watch ledger re-based (BOTH entries — the css →
  a762OGh_, the js → BRjocVCb), born-verified on the quiet state.
- [x] **WP-8 — the docs ladder**: this plan (+ its execution record) + the
  session_215 log + the worklog WH-98 entry (prepended, born-verified) +
  the AGENTS round-87 record (the chain asserted at 65 before the append,
  66 after) + the PAD §11 rows (the two WH-98 rows: the
  both-axes-twice-watch/standing-quartet re-base row + the
  driver-lifetime/date-axis CARRY row — the phrase-collision check clean
  before the insert) + the SKILL frontmatter stamp STAYS 2026-11-09 (the
  same-date plan, the WH-79 freshness contract); the count ladder FLAT at
  383/27 (no code cure, no test edits — the docs-counts pin green through
  every doc edit).
- [x] **WP-9 — the full gate on the final tree**: lint 0/0 · tsc 0 · unit
  383/383 (27 suites, the ladder FLAT) · build OK · smoke 14/14 · e2e
  72/72 (the mobile-nav battery inside the ladder) · census MATCH · bun
  audit zero — ALL GREEN on the final tree.
- [x] **WP-10 — the ship**: committed on main only and pushed through the
  SSH wrapper with the explicit
  `--remote git@github.com:nordeim/wellness-hub.git` (the WH-75 lesson),
  the remote ref verified, the operator key shredded (materialized outside
  the repo at 0600, never printed); the working-session transcript
  (session_215.md) shipped in the round commit per the house pattern; the
  round-summary transcript (session_216.md) as the follow-up commit.

## TDD note

The round carries NO code cure — the battery read zero drifts on all
seventeen surfaces, the watch's double-axis double-move is the reference's
own redeployment (verified no-rendered-face-change by the 15/15 digest on
every read + the zero-drift battery on the first moved pair), and the
capture comparison's four movers are all environmental (the EXACT WH-97
quartet at its recorded signatures — the standing 25/29 families + the
paired 10/30 thumbnail-decode dither born at WH-97). The standing tree is
its own verification (the WH-93/95/96/97 no-cure precedent). The count
ladder stays FLAT at 383/27. The capture procedure's standing guards
(badgesEarned=0 + themeMode=light) fly unmodified — their ninth standing
flight since the WH-90 cure. The session-local infra finding (the
cross-call server reaping + the userland pipe wedge) touches NO committed
file: the committed drivers/legs/procedures are correct as they stand; the
cures live in the round's session-local driver patterns (documented in the
session_215 transcript for the next round's operator). The date-axis CARRY
expectation is a HOLD, not a drift: the "9"→"10" two-glyph family arms on
the Nov 9 → Nov 10 crossing (the first two-glyph signature of the cycle —
WH-99's comparison must expect the FIVE date-bearing faces to move if its
captures land past ~00:00 UTC Nov 10).

## Execution record (appended after the work packages landed)

- The intake: one git pull fast-forward on the SURVIVING workspace
  (037b784..cc960ca, one file: docs/session_214.md); the five core docs +
  the four driving docs validated against the tree; the standing checklist
  re-verified live. The baseline gate ALL GREEN (lint 0/0 · tsc 0 · unit
  383/383 [27 suites] · build OK · smoke 14/14 · e2e 72/72 · census MATCH
  · bun audit zero).
- The watch (round 87): BOTH AXES MOVED TWICE INTRA-ROUND (css
  CD4jDvim → B7INj5W8 → a762OGh_ — the TWENTIETH css form; js C7ULD4QH →
  CvdSKjj0 → BRjocVCb — the FIFTY-SIXTH distinct bundle; the WH-71
  both-axes-twice class, three reference deployments inside the window);
  the login geometry MATCH and the computed digest 15/15 MATCH on EVERY
  read (all four flights, both moved pairs; the mobile header + the full
  drawer battery inside the digest — escape + unlock + grow-auto-close
  all pass). The watch ledger re-based ONCE to the round's FINAL read
  (a762OGh_ + BRjocVCb) per the WH-71 intra-round doctrine, born-verified
  "assets stable" + the 15/15 digest.
- The battery (the SIXTIETH full-width run): window 1 ALL EIGHT legs
  green (login 38/38 + authviews 192/192 + moodForm 20/20 + shell 61/61 +
  dashboard 105/105 + headers 192/192 + toolbars 114/114 + kpis 315/315 —
  1,037 members; the moodForm leg's first flight a transient crash,
  re-flighted GREEN per the WH-93 precedent), window 2 ALL NINE green
  (profile 433/433 + account 146/146 + listinteriors 88/88 + moodjourney
  116/116 + calendar 92/92 + moodtiles 67/67 + routines 697/697 +
  tutorials 790/790 + schedmodal 89/89 — 2,518 members; three first-flight
  transients re-flighted GREEN — the fresh-boot compile-settle class) —
  3,555/3,555 across all SEVENTEEN surfaces, ZERO drifts, ZERO
  reference-limiter trips (the reference limiter aged across the window
  boundary; the our-side limiter reset at each driver boot — the
  per-process in-memory design working FOR the round for once).
- The session-local infra finding (WP-4): the sandbox's cross-call
  process reaping killed two background dev servers mid-battery (the
  parity legs' ours-side navigations timing out on a dead :3000; the git
  tree byte-clean through every incident) — cured by the
  driver-owns-the-server-lifetime pattern (boot → legs → kill inside one
  call); the first capture driver's userland `.pipe(createWriteStream)`
  stdio drain then REPRODUCED the WH-96 F-1 wedge at the exact recorded
  failure point (capture-round.mjs:136, the second /Events goto — execSync
  freezes the driver's event loop, the 64 KB pipe fills, the server blocks
  writing its log) — re-cured at the OS fd-passthrough level
  (`stdio: ["ignore", fd, fd]`), after which the canonical capture
  completed clean in one run. Session-local instrumentation, NOT a repo
  defect — the committed instruments untouched and correct.
- The capture round (the SIXTY-NINTH cross-round byte comparison): the
  canonical 34-file procedure on the fd-passthrough dev server — the
  clean-account guards' NINTH standing flight GREEN (badgesEarned=0 +
  themeMode=light, the fail-closed design), census MATCH after. FOUR
  movers, all environmental, ZERO app-source: the EXACT WH-97 quartet —
  the 25 tail at its EXACT recorded signature (its fifteenth firing) +
  the 29 dither class at its recorded signature (its third consecutive
  capture-axis firing) + the paired 10/30 thumbnail-decode dither at the
  identical 149 px / 0.0129% / maxdelta 2 / bbox 191x169 at (719,666)
  (its second recorded firing; the tutorials parity leg 790/790 green the
  same round proves every datum byte-held). The captures landed ~09:15
  UTC Nov 9 on SAME-DAY Nov 9 faces — the date-axis family's TWENTIETH
  expectation reads CARRY (RESTING: 19 + 24; the family re-arms on the
  Nov 9 → Nov 10 crossing, carrying to WH-99).
- The ledger re-bases: the md5 ledger re-based at WH-98 (the four mover
  rows re-hashed; the WH-97 block demoted to prior narration; the WH-84
  block retired — its number rolled onto the re-bases list; the
  structural assertions green BEFORE the write, born-verified 34/34 ZERO
  MOVERS); the watch ledger re-based (BOTH entries — the css → a762OGh_,
  the js → BRjocVCb — after the intra-round second move, born-verified on
  the quiet state).
- The full gate green on the final tree + the docs ladder: this plan (+
  its execution record) + the session_215 log + the worklog WH-98 entry +
  the AGENTS round-87 record (the chain at 66 records) + the PAD §11 rows
  (the two WH-98 rows); the SKILL frontmatter stamp stays 2026-11-09
  (the same-date session98 plan, the WH-79 freshness contract); the
  docs-counts pin green through every doc edit (the count ladder FLAT at
  383/27).
