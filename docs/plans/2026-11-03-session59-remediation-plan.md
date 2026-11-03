# WH-59 Remediation Plan — the standing audit round (session 59 / session_115)

Date: 2026-11-03 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set; the
session_113/session58-plan/worklog/session_114 inputs; this round executes
the session_113 tail's suggested-next). The operator's explicit checklist
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

- `git pull` to `fa634b2` (main, clean — the WH-58 ship `ab5c3c2` + the
  operator's session_114 log push). Environment rebuilt per the bootstrap
  contract: bun 1.3.14, `.env` standing (`DATABASE_URL="file:../db/custom.db"`),
  db:push + db:seed + census MATCH (users=1 templates=11 steps=50
  tutorials=12 badges=8 moods=1). The five docs + session_113 +
  session_114 + the session58 plan (its execution record complete) + the
  worklog WH-58 entry read and validated against the tree: the watch
  ledger at `C_KCpRIS.js`/`xihcXjhm.css` (the WH-56 re-base), the
  `probe-usetemplate.mjs` evidence standing, the md5 ledger at its
  WH-58 base (34 files, the Nov 3 same-day re-base).
- **The baseline gate ALL GREEN at the exact WH-58 ship state: lint 0/0
  · tsc 0 · unit 376/376 (26 suites) · build OK · smoke 14/14 · e2e
  72/72 (the mobile-nav battery inside — tests 35–41 of the ladder) ·
  census MATCH.**

## Findings (the round's decodes — all live, both apps)

**Watch round 48: FULLY QUIET — both axes stable.** css
`/static/index-xihcXjhm.css` for the SEVENTH consecutive round + js
`/static/index-C_KCpRIS.js` (the round-45 final read) unchanged — the
FOURTH fully-quiet read of the standing era (the round-44/46/47
precedents). The same-run computed digest read **15/15 MATCH**. No watch
ledger re-base (nothing moved; the watch stays every-round regardless —
a quiet round is a reading, never a retirement).

**The battery (all seventeen surfaces, the TWENTY-FIRST full-width run,
split across the reference login windows per the lesson-46 doctrine):
ALL GREEN — 3,555/3,555** — login 38/38 (the zero-login leg) · moodForm
20/20 · shell 61/61 (the drawer battery — the instruction's mobile-menu
emphasis) · dashboard 105/105 · headers 192/192 · toolbars 114/114 ·
kpis 315/315 · routines 697/697 · tutorials 790/790 · profile 433/433 ·
account 146/146 · authviews 192/192 (the zero-login leg) ·
listinteriors 88/88 · moodjourney 116/116 · calendar 92/92 · schedmodal
89/89 · moodtiles 67/67. The standing data-blocked re-checks rode the
battery green at their empty states (listinteriors' goals page +
moodjourney's upcoming list; the watch's exercise spot-check + the OTP
sent view via authviews).

**The twenty-second-surface candidate walk (the session_113 tail's
suggested-next queue: the dashboard quick-action cells' focus rings —
the last read-only candidate): RETIRED on a live dual-app decode.**
`scripts/probe-quickactionfocus.mjs` committed as the round's evidence
(the WH-53/55/56/57/58 props-instrument class + the WH-20 doctrine ON
THE KEYBOARD AXIS — a REAL Tab key press, never a programmatic
`.focus()` (the `:focus-visible` heuristic only arms on real keyboard
input), and a ≥400 ms settle before the read; zero fires, zero writes
on both apps):

- **Both apps' cells take real-keyboard focus** (tookFocus=true on both;
  the anchor is the first tab stop on both apps — the probe's bounded
  Tab walk lands on the "Log Exercise" cell).
- **The authored ring renders IDENTICALLY on both apps**: the 1px
  `rgb(10, 10, 10)` ring layer + the shadow-sm real layer — the
  reference fires it at its SECOND tab stop (the nested `<button>` of
  the documented invalid `<a><button>` nest, its CDN form
  `rgb(255,255,255) 0px 0px 0px 0px, rgb(10,10,10) 0px 0px 0px 1px,
  rgba(0,0,0,0.05) 0px 1px 2px 0px`), ours at its SINGLE valid stop
  (the `<Link>` anchor, the v4 zero-layer-prefix form — the documented
  lesson-40 var-chain class; the ring layer + real shadow pair are the
  rendered facts, equal on both).
- **The reference's FIRST stop renders the UA DEFAULT outline**
  (`outline-style: auto`, 1px, rgba(10,10,10,0.5)) on its BARE anchor
  (radius 0px, shadow none, transition 0s — the unstyled nest wrapper):
  the invalid-nesting artifact ours deliberately supersedes (the WH-23
  documented superset class — "Our cells stay `<Link>` anchors (the
  reference's `<a><button>` nesting is invalid HTML)"), and our authored
  `focus-visible:ring-1 ring-ring` on the single valid stop is the
  AGENTS-documented kept superset ("the focus-visible rings" — the
  WCAG-superior form, same pixels, different trees).
- **The relax behavior CLEAN on both**: Tabbed off, the reference's
  anchor outline returns to none and our ring layer is gone (the
  boxShadow returns to the at-rest four-zero-layer + shadow-sm form).
- **The href decode IDENTICAL** (`/Exercise` on both — the deep-link
  wiring); the onClick decode: the reference's
  `function k(T){r&&r(T),T.defaultPrevented||E(T)}` (the minified
  react-router navigate family) vs ours the next/link handler — both
  navigation handlers, read WITHOUT firing (zero-write).
- The at-rest computed split (ref boxShadow none / radius 0px /
  transition 0s vs ours the shadow-sm + 6px + 0.15s) = the
  DOM-SHAPE FACT family (the read anchors the reference's bare nest
  wrapper vs our cell anchor — the reference's RENDERED cell face is
  the nested button, pinned byte-identical by parity-dashboard's 105
  members, green the same round); the outlineColor serialization split
  (rgba vs oklab at /0.5) = the lesson-40 resolved-values class.

**The capture round (the THIRTIETH cross-round byte comparison): 32/34
byte-stable, TWO movers — ALL root-caused before the re-base, each
pixel-diffed against the git HEAD (WH-58) captures.** NO date-axis
crossing this round either — the captures render the same Nov 3 faces
as the WH-58 ledger (the round ran ~05:00 UTC, BEFORE the Nov 4 UTC
midnight; the WH-58 re-fire expectation now lands between this ledger
and WH-60's captures — root-caused on sight when it fires). The two
movers: 24-dark-exercise-rows (5 px / 0.0004%, maxdelta 17, bbox 4×2) =
the documented capture-24 WRITE-FACE habitat (the just-written workout
row's moment — the WH-56/57/58 family, the identical parameters to its
WH-58 record); 25-dark-login-focus (77 px / 0.0067%, maxdelta 5,
bbox 367×121 = the focused input's ring area) = the WH-20 focus-ring
INTERPOLATION-TAIL habitat (the transition-all box-shadow settle's
sub-visible tail state between runs — the identical parameters to its
WH-58 record, its second consecutive round as a mover, the same
sub-visible signature). The md5 ledger re-based to the round's final
read, born-verified **34/34 ZERO MOVERS** against the re-based ledger.

## The ToDo list (the round's work packages)

- [x] **WP-1 — the watch round 48**: both axes stable (the FOURTH
  fully-quiet read) + the computed digest 15/15 MATCH. No signal: the
  battery ordered anyway (the every-round doctrine).
- [x] **WP-2 — the battery, all seventeen surfaces** (the TWENTY-FIRST
  full-width run): 3,555/3,555 green, split across the reference login
  windows per the lesson-46 doctrine (two windows; the dev server
  restarted between phases per the same doctrine).
- [x] **WP-3 — the twenty-second-surface candidate walk**: the dashboard
  quick-action cells' focus rings RETIRED on the live dual-app decode;
  `scripts/probe-quickactionfocus.mjs` committed as the evidence (the
  WH-20 doctrine on the keyboard axis; zero fires, zero writes on both
  apps). The session_111 tail's read-only candidate queue is now
  EXHAUSTED.
- [x] **WP-4 — the capture round**: the 34-file set under the
  capture-state doctrine (fresh seed, badgesEarned=0 asserted, the
  phase-split, the ONE login, the capture-24 write position); the
  THIRTIETH byte comparison 32/34, the two movers root-caused
  (pixel-diffed vs the WH-58 git HEAD captures), NO date-axis crossing
  (same-day Nov 3 faces — the round ran before the Nov 4 UTC midnight),
  the md5 ledger re-based to the round's final read, born-verified
  34/34 ZERO MOVERS.
- [x] **WP-5 — the watch ledger**: NO re-base (the fully-quiet read —
  nothing moved; the WH-55 precedent).
- [x] **WP-6 — the full gate on the final tree** (see the execution
  record; the mobile-nav battery re-run explicitly inside the e2e leg).
- [x] **WP-7 — the docs ladder + the commit/push** (this plan + its
  execution record, the session log, the worklog WH-59 entry, the
  AGENTS round-48 record, the PAD §11 retirement row; README/CLAUDE/
  SKILL flat — no count sites changed; the docs-counts pin 376/72
  untouched).

## TDD note

No application source changed this round (the findings were procedural:
the md5 ledger re-base + the probe evidence + the capture bytes) — the
TDD seam discipline applies to source changes, and the ladder is FLAT
(unit 376/376, e2e 72/72, zero test changes). The probe script is a
decode instrument, not a seam: no vitest pin applies (the
WH-55/56/57/58 probe precedents).

## Execution record (appended after the work packages landed)

- The full gate on the final tree: **lint 0/0 · tsc 0 · unit 376/376
  (26 suites, the ladder FLAT) · build OK · smoke 14/14 · e2e 72/72**
  (the mobile-navigation battery re-run explicitly inside the e2e leg —
  tests 35–41 of the ladder) · census MATCH after the capture reseed.
- The commit: `:fire: fix: WH-59 audit round — ...` on `main` only,
  pushed via the SSH wrapper (`python3 docs/ssh_git_wrapper_v3.py
  --key-file <key outside the repo> --remote
  git@github.com:nordeim/wellness-hub.git`), the remote ref verified ==
  local HEAD, the operator key shredded after.
