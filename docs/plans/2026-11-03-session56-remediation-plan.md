# WH-56 Remediation Plan — the standing audit round (session 56 / session_109)

Date: 2026-11-03 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set; the
session_107/session55-plan/worklog/session_108 inputs; this round executes
the session_108 tail's suggested-next). The operator's explicit checklist
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

- Fresh clone to `cccca81` (main, clean — the WH-55 ship `ccf27d0` + the
  operator's session_108 log push). Environment rebuilt per the bootstrap
  contract: bun 1.3.14, `.env` standing with a fresh 64-hex AUTH_SECRET,
  db:push + db:seed + census MATCH (users=1 templates=11 steps=50
  tutorials=12 badges=8 moods=1). The five docs + session_107 +
  session_108 + the session55 plan (its execution record complete) + the
  worklog WH-55 entry read and validated against the tree: the watch
  ledger at `r0DWh4vL.js`/`xihcXjhm.css`, the `probe-typography.mjs`
  evidence standing, the md5 ledger at its WH-54 base (34 files,
  WH-55-confirmed).
- One infrastructure note: the sandbox reset lost the Playwright browser
  cache — `bunx playwright install chromium` restored it before the
  baseline gate (infrastructure, not source debt; the gate ran green
  after).
- **The baseline gate ALL GREEN at the exact WH-55 ship state: lint 0/0
  · tsc 0 · unit 376/376 (26 suites) · build OK · smoke 14/14 · e2e
  72/72 (the mobile-nav battery inside — tests 35–41 of the ladder) ·
  census MATCH.**

## Findings (the round's decodes — all live, both apps)

**Watch round 45: the js axis MOVED — the signal for the full lesson-30
walk.** js `/static/index-r0DWh4vL.js` → `/static/index-C_KCpRIS.js` (the
TWENTY-NINTH distinct bundle; the css axis STABLE at `xihcXjhm` for the
FOURTH consecutive round). The same-run computed digest read **15/15
MATCH** on the new bundle — the move carried ZERO rendered-face change
(the single-axis bundle-refresh class, the round-43 precedent).

**The battery (all seventeen surfaces, the EIGHTEENTH full-width run,
split across the reference login windows per the lesson-46 doctrine):
ALL GREEN — 3,555/3,555** — login 38/38 (the zero-login leg) · moodForm
20/20 · shell 61/61 (the drawer battery — the instruction's mobile-menu
emphasis) · dashboard 105/105 · headers 192/192 · toolbars 114/114 · kpis
315/315 · routines 697/697 · tutorials 790/790 · profile 433/433 ·
account 146/146 · authviews 192/192 · listinteriors 88/88 · moodjourney
116/116 · calendar 92/92 · schedmodal 89/89 · moodtiles 67/67. The
standing data-blocked re-checks rode the battery green at their empty
states (listinteriors' goals page + moodjourney's upcoming list; the
watch's exercise spot-check + the OTP sent view via authviews).

**The nineteenth-surface candidate walk (the session_108 tail's
suggested-next: the Profile Background Image input + the Visual Style
selects' non-default states): RETIRED on a live dual-app decode.**
`scripts/probe-preferences.mjs` committed as the round's evidence (the
WH-53/WH-55 props-instrument class + the ancestor-walk arm, zero fires;
zero-write on both apps):

- **The tab-placement decode (this round's own lesson)**: the panels
  ride the APPEARANCE tab on BOTH apps (our AppearancePanel carries
  Theme Mode + Colors + Typography + Background Image + Visual Style;
  the reference's Appearance tab carries the same five cards — its
  Preferences tab carries only the App Preferences checkboxes, as does
  ours). The probe normalizes to Appearance exactly as parity-profile
  does; anchoring the Visual Style panel by a header-text node NEVER
  matches the reference (its panel titles are DIVs — the
  parity-profile "the titles are DATA" lesson): the vs panel anchors on
  its combobox inventory instead (the innermost ancestor holding all
  three triggers).
- **The Background Image input's non-default state — wiring-EQUIVALENT,
  the reference WRITE-blocked** (the decoded Base44 form pattern): at
  rest both apps render the identical placeholder
  (`https://images.unsplash.com/...`), the identical empty DOM value,
  the identical "Pro tip" hint, controlled=true on both. The onChange
  sources (read, never fired): the reference's
  `p=>{r({...n,background_image:p.target.value}),a(p.target.value)}`
  (the Base44 state-spread setter + an immediate apply call — the
  live-apply channel) vs ours
  `(e)=>theme.setTheme({bgImageUrl:e.target.value||null})` (the store
  patch → applyTheme → the `<main>` client-only style branch [the WH-16
  suppressHydrationWarning family] + the fire-and-forget /api/prefs
  sync — the cross-device superset). The reference's field name decodes
  as `background_image` (the Base44 field vocabulary; ours is
  `bgImageUrl`) — an inert name mapping, not a face.
- **The three Visual Style selects' non-default states — the at-rest
  faces byte-identical + the framework-shape class on the live channel**:
  the trigger labels identical on both ("Gradient (Colorful)" /
  "Elevated (3D Shadows)" / "Full (Smooth & Fluid)"), the triggers'
  own props carry no value (controlled=false on both — the value lives
  on the Select root), and the ancestor-walk found NO handler on EITHER
  app (NONE/NONE/NONE on both — the Radix root renders no DOM element,
  the WH-55 Typography finding's own class). The non-default selection
  is WRITE-blocked on the reference (persists to the shared account);
  ours stays the live-apply + persist superset.

**The capture round (the TWENTY-SEVENTH cross-round byte comparison):
28/34 byte-stable, SIX movers — ALL root-caused before the re-base.**
The root cause is the **date-axis crossing**: the ledger's captures
(WH-54-based, WH-55-confirmed byte-stable) rendered Nov 2's faces
(~23:30 UTC); this round's captures render Nov 3's (~02:00 UTC) — the
midnight crossing sits between them, and the mover set maps EXACTLY to
the `todayIso()`-defaulting date faces, verified in source:
07-events (the calendar's today ring + the upcoming filter's
`new Date()`), 26-events-inline-form (the form's date input),
27-dark-mood-form + 32-mentalhealth-form-interior (the mood form's
`useState(todayIso())` date field), 28-routines-schedule-modal (the
schedule modal's date state) — plus 29-quick-actions-hover (the
standing SUB-VISIBLE RASTERIZATION signature, deterministic across this
round's consecutive runs). The consecutive-run comparison (run2 vs the
final read) additionally measured the two environmental write/hover
habitats: 24-dark-exercise-rows (the capture-24 write face) +
30-tutorial-card-hover — 32/34 byte-identical across the consecutive
runs. The classification is the root cause: the source is IDENTICAL to
the WH-55 tree (zero git diff this round).

**The round's own infrastructure deviations (both absorbed per the
lesson-46 doctrine, neither source debt):**

1. **ONE our-side post-login cold-compile race** — the batch-2 first
   flights (parity-profile/account/authviews) on the freshly restarted
   dev server presented the auth-wall loop face (the documented
   "transient post-login cookie-commit/cold-compile races present
   exactly like auth-wall redirects" class); cross-checked with curl
   (the API 200s on direct POST), cured by the clean restart + route
   warm-up, the flights re-run clean (all three surfaces green at
   433/146/192).
2. **ONE reference-side diagnostic artifact** — two consecutive
   first-flight timeouts traced to a mis-keyed diagnostic URL (the
   diagnostic's own bug — the reference itself was never down; curl
   200 + a clean re-run on the correct URL within the minute). A
   textbook reproduction of the "first-flight probe errors are
   INFRASTRUCTURE until reproduced" rule before any cure was attempted.

## The ToDo list (the round's work packages — all landed)

- [x] **WP-1 — the watch round 45**: PASS 1 read the js MOVED
  (`r0DWh4vL` → `C_KCpRIS`) + PASS 2 the computed digest 15/15 MATCH on
  the new bundle. The signal consumed: the full lesson-30 walk ordered
  (the battery + the capture + the ledger re-base in the same commit).
- [x] **WP-2 — the battery, all seventeen surfaces** (the EIGHTEENTH
  full-width run): 3,555/3,555 green, split across the reference login
  windows per the lesson-46 doctrine (two windows, ~25 min apart; the
  dev server restarted between phases per the same doctrine). The
  standing data-blocked re-checks rode green.
- [x] **WP-3 — the nineteenth-surface candidate walk**: the Background
  Image input + the Visual Style selects RETIRED on the live dual-app
  decode; `scripts/probe-preferences.mjs` committed as the evidence
  (zero fires, zero writes on both apps).
- [x] **WP-4 — the capture round**: the 34-file set under the
  capture-state doctrine (fresh seed, badgesEarned=0 asserted, the
  phase-split, the ONE login, the capture-24 write position); the
  TWENTY-SEVENTH byte comparison 28/34, the six movers root-caused
  (the date-axis crossing + the standing rasterization signature), the
  md5 ledger re-based to the round's final read, born-verified 34/34
  ZERO MOVERS against the re-based ledger.
- [x] **WP-5 — the watch ledger re-base**: `jsPath` re-based to
  `/static/index-C_KCpRIS.js` with the WH-56 history block; born-verified
  on the quiet state per the WH-34 doctrine (the re-run after the edit
  reads "assets stable" + the 15/15 digest — the firing state AND the
  quiet state both exercised).
- [x] **WP-6 — the full gate on the final tree** (see the execution
  record; the mobile-nav battery re-run explicitly inside the e2e leg).
- [x] **WP-7 — the docs ladder + the commit/push** (this plan + its
  execution record, the session_109 log, the worklog WH-56 entry, the
  AGENTS round-45 record, the PAD §11 retirement row; README/CLAUDE/
  SKILL flat — no count sites changed; the docs-counts pin
  376/72 untouched).

## TDD note

No application source changed this round (the findings were procedural:
the two ledger re-bases + the probe evidence + the capture bytes) — the
TDD seam discipline applies to source changes, and the ladder is FLAT
(unit 376/376, e2e 72/72, zero test changes). The probe script is a
decode instrument, not a seam: no vitest pin applies (the WH-55
probe-typography precedent).

## Execution record (appended after the work packages landed)

- The full gate on the final tree: **lint 0/0 · tsc 0 · unit 376/376
  (26 suites, the ladder FLAT) · build OK · smoke 14/14 · e2e 72/72**
  (the mobile-navigation battery re-run explicitly inside the e2e leg —
  tests 35–41 of the ladder) · census MATCH after the capture reseed.
- The commit: `:fire: fix: WH-56 audit round — ...` on `main` only,
  pushed via the SSH wrapper (`python3 docs/ssh_git_wrapper_v3.py
  --key-file <key outside the repo> --remote
  git@github.com:nordeim/wellness-hub.git`), the remote ref verified ==
  local HEAD, the operator key shredded after.
