# WH-68 Remediation Plan — the standing audit round (session 68 / session_133)

Date: 2026-11-04 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set; the
session_131/session67-plan/worklog/session_132 inputs; this round executes
the session_131 tail's suggested-next). The operator's explicit checklist
re-verified standing at intake: the `.env`/db contract
(`DATABASE_URL="file:../db/custom.db"`, the `db/` folder at the repo root,
the db-path seam + `tests/db-path.test.ts` pin), the tracked
`.env.example`, the vitest/playwright configs (376/72 with the e2e db
PINNED in `playwright.config.ts`), the sitemap/robots/manifest handlers
(smoke leg 12), the Tailwind v4 pins (all six: hover, dark, shadow-sm,
blur-sm, the three `@source not`), the mobile-navigation battery (the e2e
spec + parity-shell 61/61 — the drawer family), and the eslint
skills-exclude. Nothing to re-fix: the tree already matches every item;
this round's work is the standing audit cadence itself — this round's
core finding is the reference's FIRST js-bundle move since WH-61.

## Round inputs (validated live before this plan)

- Fresh clone state (the sandbox workspace was reset): git clone to
  `4c927f0` (main, clean — the WH-67 ship `dc1b091` + the operator's
  session_131 log push). Environment bootstrapped per the contract:
  bun 1.3.14, `.env` created from the tracked `.env.example`
  (`DATABASE_URL="file:../db/custom.db"` + a fresh 64-hex `AUTH_SECRET`),
  db:push + db:seed + census MATCH (users=1 templates=11 steps=50
  tutorials=12 badges=8 moods=1). The five docs + session_131 +
  session_132 + the session67 plan (its execution record complete) +
  the worklog WH-67 entry read and validated against the tree: the watch
  ledger at `6xnUqbWf.js`/`BVWWKVEJ.css` (the WH-61 re-base), the md5
  ledger at its WH-67 base (34 files, the Nov 4 faces). The scratch
  comparator + pixdiff + bundle-diff tooling REBUILT this round (the
  sandbox reset wiped /tmp — the committed capture procedure made the
  round fully reconstructible, exactly the class the WH-29 commit exists
  to prevent).
- **The baseline gate ALL GREEN at the exact WH-67 ship state: lint 0/0
  · tsc 0 · unit 376/376 (26 suites) · build OK · smoke 14/14 · e2e
  72/72 (the mobile-nav battery inside the ladder — re-run explicitly
  8/8) · census MATCH.** ONE infrastructure note at intake: the
  sandbox's Playwright browser cache was stale (chromium-1200 vs the
  package's 1248), restored with `npx playwright install chromium`
  before the baseline e2e — the documented WH-60/WH-63/WH-67 class;
  neither source debt.
- The date-axis intake reading: the round started ~07:18 UTC Nov 4 —
  ~16.7 h BEFORE the Nov 4 -> Nov 5 one, and the WH-67 ledger already
  carries the Nov 4 faces (its captures ~03:49 UTC Nov 4) — so same-day
  faces were expected and the session_131 tail's re-fire prediction
  (premised on the captures crossing the Nov 5 midnight) was NOT
  expected to land (the WH-61 doctrine-amendment class).

## Findings (the round's reads — all live, both apps)

**Watch round 57: the js-axis SINGLE MOVE — the first since the WH-61
re-base** (js `/static/index-6xnUqbWf.js` ->
`/static/index-BL63jJGe.js`, the THIRTY-THIRD distinct bundle — six
stable rounds between; the css axis STABLE at
`/static/index-BVWWKVEJ.css` for the NINTH consecutive round); the
same-run computed digest read **15/15 MATCH** on the new bundle. The
**bundle-inventory diff** (the WH-60/61 instrument leg, rebuilt as
scratch tooling): the pair byte-differs only in lazy-loaded
PLATFORM-CHUNK HASH strings (80 of 252 fixed windows differ —
AuthContext/I18nProvider/base/AuthAPI/useFeatureFlags/... — the
platform's chunk-hash rotation, zero wellness-module strings),
IDENTICAL sizes (100,534 B both) + identical app href inventories +
identical wellness-module string counts — **the WH-52/53/60/61
platform-move class, zero app-face change.** The watch ledger re-based
to the round's final read (`BL63jJGe.js`), born-verified on the quiet
state (the re-run reads "assets stable" + the 15/15 digest — the WH-34
both-outcomes doctrine: the firing state observed at the round read,
the quiet state verified after the edit).

**The battery (all seventeen surfaces, the THIRTIETH full-width run,
split across the reference login windows per the lesson-46 doctrine):
ALL GREEN — 3,555/3,555** — login 38/38 (the zero-login leg) ·
moodForm 20/20 · shell 61/61 (the drawer battery — the instruction's
mobile-menu emphasis) · dashboard 105/105 · headers 192/192 · toolbars
114/114 · kpis 315/315 · routines 697/697 · tutorials 790/790 ·
profile 433/433 · account 146/146 · authviews 192/192 (the second
zero-login leg) · listinteriors 88/88 · moodjourney 116/116 · calendar
92/92 · schedmodal 89/89 · moodtiles 67/67. **The js move walked at
zero drift — the rendered face byte-held through the platform's
redeployment.** ZERO transients this round — both windows clean on
their first flights — and zero limiter trips either side.

**The capture round (the THIRTY-NINTH cross-round byte comparison):
32/34 byte-stable, TWO movers ALL root-caused before the re-base, each
pixel-diffed against the git HEAD (WH-67) captures.** NO DATE-AXIS
CROSSING — the doctrine amendment (the WH-61 class, exactly as the
intake reading predicted): this round ran ~07:34 UTC Nov 4, BEFORE the
Nov 4 -> Nov 5 UTC midnight, and the WH-67 ledger already carries the
Nov 4 faces (its captures ~03:49 UTC Nov 4) — same-day faces, so the
session_131 tail's predicted re-fire did not land (its premise was the
captures crossing the Nov 5 midnight); the expectation carries to
WH-69's captures (the SIXTH carry of the cycle). The two movers, both
the standing sub-visible habitats at their identical recorded
parameters: 10-learning (9 px / 0.0008%, maxdelta 7, bbox 11x2) the
maxdelta-7 RASTERIZATION family (the WH-53/58/59/64/67 records'
identical parameters; re-fired here after its WH-67 re-fire — a
consecutive re-fire) + 29-quick-actions-hover (5 px / 0.0004%,
maxdelta 1, bbox 5x5) the maxdelta-1 RASTERIZATION family (the
WH-58/60/61/63/64/65/66/67 records' identical parameters; re-fired
here — a consecutive re-fire, its fourth). 25-dark-login-focus (the
WH-20 focus-ring interpolation-tail habitat) held BYTE-STABLE for the
third consecutive round. The source is IDENTICAL to the WH-67 tree
(zero git diff outside docs/screenshots + the watch ledger's re-based
entry) — the classification is the root cause, no cure required. The
md5 ledger re-based to the round's final read (the WH-68 block born,
the WH-67 block demoted to prior, the WH-58 prior rolled to the
re-bases list, the two mover entries re-hashed), born-verified **34/34
ZERO MOVERS**.

## The ToDo list (the round's work packages)

- [x] **WP-1 — the watch round 57**: the js-axis single move (the
  THIRTY-THIRD bundle, the first since WH-61); the same-run digest
  15/15 MATCH; the bundle-inventory diff run on the move (the WH-60/61
  instrument leg — platform-chunk-hash rotation only, zero app-face
  change); the watch ledger re-based + born-verified on the quiet
  state.
- [x] **WP-2 — the battery, all seventeen surfaces** (the THIRTIETH
  full-width run): 3,555/3,555 green, split across the reference login
  windows per the lesson-46 doctrine (the zero-login legs first;
  window 1's twelve surfaces, then the capture round, then window 2's
  five). Zero limiter trips either side; zero transients — both
  windows clean on their first flights. The js move walked at zero
  drift.
- [x] **WP-3 — the capture round**: the 34-file set under the
  capture-state doctrine (fresh seed, badgesEarned=0 asserted, the
  phase-split, the ONE login, the capture-24 write position); the
  THIRTY-NINTH byte comparison 32/34, the TWO movers root-caused
  (pixel-diffed vs the WH-67 git HEAD captures) and NO date-axis
  crossing (the WH-61 doctrine-amendment class — the intake reading
  held; the expectation carries to WH-69, the SIXTH carry of the
  cycle); the md5 ledger re-based to the round's final read,
  born-verified 34/34 ZERO MOVERS.
- [x] **WP-4 — the full gate on the final tree** (see the execution
  record; the mobile-nav battery re-run explicitly inside the e2e leg).
- [x] **WP-5 — the docs ladder + the commit/push** (this plan + its
  execution record, the session_133 log, the worklog WH-68 entry, the
  AGENTS round-57 record, the PAD §11 row; README/CLAUDE/SKILL flat —
  no count sites changed; the docs-counts pin 376/72 untouched).

## TDD note

No application source changed this round (the findings were procedural:
the watch ledger re-base + the md5 ledger re-base + the capture bytes +
the date-axis reading + the bundle-inventory classification) — the TDD
seam discipline applies to source changes, and the ladder is FLAT by
design (the WH-55 through WH-67 precedents).

## Execution record (appended after the work packages landed)

- The full gate on the final tree: **lint 0/0 · tsc 0 · unit 376/376
  (26 suites, the ladder FLAT) · build OK · smoke 14/14 · e2e 72/72**
  (the mobile-navigation battery inside the ladder, re-run explicitly
  8/8) · census MATCH after the capture reseed · bun audit zero.
- The docs-counts lockstep pin re-verified after the doc edits (unit
  376/376 with the new docs in the tree — the established pre-ship
  check).
- The commit: `:fire: fix: WH-68 audit round — ...` on `main` only,
  pushed via the SSH wrapper (`python3 docs/ssh_git_wrapper_v3.py
  --key-file <key outside the repo> --remote
  git@github.com:nordeim/wellness-hub.git`), the remote ref verified ==
  local HEAD, the operator key shredded after.
