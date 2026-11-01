# Session-33 Remediation Plan — the watch-companion round (WH-33)

**Task ID:** WH-33 · **Date:** 2026-11-01 · **Branch:** `main` (only)
**Mission:** the WH-32 plan's own suggested next, executed against a
reference that moved AGAIN — but this time in the JS layer ONLY: **the
watch round 21 read a NEW JS bundle (`index-DT3tkBuH.js`, was
`index-BFu7mt5f.js`) with the CSS CONTENT hash STABLE**
(`/static/index-BHjkUcdg.css` — unchanged from round 20), the
`cdn.tailwindcss.com` Play-CDN pipeline + `/api/frontend-config.js?v=3`
still present. **Two consecutive JS-bundle changes = the active
development cadence the suggested-next (b) predicted.** Per the
lesson-30 doctrine the full walk re-ran on the new build — **every
standing map byte-parity, ZERO rendered-face drift** (the JS change
shipped no observable face change).

> **Reference probe (30+ passes; writes = ZERO on the reference — every
> surface read at rest; the Schedule modal opened read-only via Use This
> Template, the sr inline form opened but never submitted, the drawer
> battery exercised and reverted):** the watch round 21 (the asset forms
> above); the dashboard (the "Welcome Back!" H1 at 36px/700 with the
> indigo→purple→pink gradient, the tiles 0/1/0/0, the Quick Actions
> grid); the mobile header at 390px (padL 24px, the 28×28 r8 trigger,
> the title at x=68, sticky z-10 blur(24px)); the drawer battery (the
> 288px sheet, the border-r 1px rgb(229,229,229), the X display:none,
> the 11 capitalized hrefs ending /Profile, the 32px rows, the initial
> focus on the sheet div, escape-close + unlock, the viewport-grow
> auto-close, the scroll lock); the desktop shell (the 32px nav rows,
> the 16px icons, the 40px gradient-circle avatar, ZERO footers, ZERO
> landmarks — the WH-31 (o) pin premise unchanged); the Goals standing
> block ("Badges Earned 0 of 0", zero tiles); the four list interiors
> (workouts 0, assignments 0 with the section omission, events 0, moods
> 1 with the 😊 Good Oct 29 row); the sr block (zero rows + the "Upload
> File (optional)" field in the INLINE form, no overlays); the Learning
> page (12 imgs, 12 Watch Now, the outline DIV chips at border
> rgb(229,229,229) no shadow); the Events calendar (the outline trio
> ←/Today/→ at 1px rgb(229,229,229), the 8px gap grid); the Profile
> page (the 960px tablist, the 3 tabs, the 4 comboboxes, the Background
> Image section); the Routines page (11 templates, the 6/5 family
> split, the video-card computed set: the 160px h-40 zone overflow
> hidden, the img object-cover with alt = the template name, the
> overlay rgba(0,0,0,0.4) at opacity 0, the 32px white text-xs Watch
> Video button, `group` on the card); the Schedule modal on BOTH
> families (family-A "5-Minute Morning Energizer" = 3 step circles,
> family-B "Creative Flow Session" = 5 — **the (c) decode below**);
  `bun audit` ZERO (the five-override posture holds).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `31be693` = WH-32 shipped at `bcfcc85` + the operator's
session-log push):** lint 0/0 · tsc 0 · unit **365/365 (25 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **70/70** · census MATCH —
the exact documented WH-32 ship state. **Plus the periodic `bun audit`
duty: ZERO vulnerabilities.** The instruction's checklist items
verified on the tree: the `.env`/db contract
(`DATABASE_URL="file:../db/custom.db"` → `<repo>/db/custom.db`, census
MATCH), the vitest + playwright configs in place and passing, the
sitemap/robots/manifest/OG surfaces serving (smoke check 12), the
Tailwind v4 pins present in `globals.css` (the hover unwrap, the dark
variant, `--shadow-sm`, `--blur-sm`, the three `@source not`),
`.env.example` tracked and accurate. The tree hygiene clean (dev.log /
test-results / tsbuildinfo all ignored, the working tree clean). The
neo-crm sibling re-verified for the family patterns (the vendored
`neo-crm_SKILL.md` v1.195.0 — same scripts/stack/docs structure).

**The audit method:** the watch re-run live (round 21 — the JS-bundle
change caught same-session), the lesson-30 redeployment walk applied in
full (15+ standing surfaces re-probed computed-style on the NEW build
through agent-browser), the WH-32 diff reviewed through the
`skills/web-application`, `skills/tdd` and `skills/agent-browser`
lenses, and the instruction's checklist items verified on the tree.

Findings (by severity) — the WH-33 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **LOW — the round's core, a procedure gap** | **The watch's computed spot-check companion is still a MANUAL probe.** The standing AGENTS note (WH-31, re-read at WH-32) says it plainly: "while the platform keeps the CDN, a runtime-compiled Tailwind can drift computed values WITHOUT a bundle hash change (the watch may need a computed spot-check companion)". This round's (d) probe ran it manually — 15+ hand-driven evals across the standing surfaces, the same multi-pass procedure every round now that the reference develops actively (two consecutive bundle changes). The WH-29 capture-round lesson applies verbatim: a procedure that lives only in the agent's head is "not reconstructible without the original script" — the watch + the spot-check deserve the same committed-procedure cure the capture round got | `scripts/watch-round.mjs` (NEW — the committed procedure) | **Cure**: the committed `scripts/watch-round.mjs` — PASS 1 the asset watch (the CSS/JS forms + the CDN pipeline + frontend-config, read logged-out — no login), PASS 2 the one-login computed-value spot-check (the canonical surface set below) with a per-surface MATCH/DRIFT report and a non-zero exit on drift. Runs manually each round (network-dependent — OUTSIDE the gate, the capture-round.mjs pattern; `scripts/capture-round.mjs` is the precedent and is docs-referenced only, no test pin) |
| F-2 | **LOW — positive, decoded + pin-worthy** | **The (c) probe: the Schedule modal's family-A/B split decoded.** The modal's ANATOMY is identical across families (672px, the title-only header, the date/time/notes fields, the Schedule This Routine primary, no Cancel, the gradient-50 description tile, the solid purple-500 circles) — the split is the STEP COUNT: family-A "5-Minute Morning Energizer" renders **3** step circles, family-B "Creative Flow Session" renders **5** — data-driven through each template's own steps on BOTH apps (our seed carries 3 and 5 on exactly those templates; our modal maps `scheduling.steps` dynamically — parity by construction, no cure needed). The gap: our e2e exercises the modal ONLY through family-A (the sibling leg schedules "5-Minute Morning Energizer") — the dynamic step rendering + the family-B seed data are unpinned | `tests/e2e/wellness-crud.spec.ts` (+1 test — the **(q) leg**) | **Cure**: the (q) e2e leg — open the family-B modal (Creative Flow Session's Use This Template), assert the 5 purple-500 step circles + a family-B step title (the "Set up inspiring space" first step) — the (o) born-green standing-pin precedent, guarding the dynamic rendering and the seed's step data |
| F-3 | **LOW — document-only, the watch record** | **The watch round 21 event**: the reference redeployed with a NEW JS bundle (`index-BFu7mt5f.js` → `index-DT3tkBuH.js`) while the CSS content hash stayed STABLE (`/static/index-BHjkUcdg.css`) — the CDN pipeline + `/api/frontend-config.js?v=3` still present. The lesson-30 walk: every standing map byte-parity, ZERO rendered-face drift — the JS change shipped no observable face change. Two consecutive bundle changes confirm the active development cadence (the suggested-next (b) prediction) — the watch runs EVERY round while the cadence holds | `Project_Architecture_Document.md` §11 (the watch row updated to round 21) · AGENTS.md (the watch note) · the new script's ledger | The watch row + the AGENTS note updated with the round-21 record |
| F-4 | **LOW — positive findings, verified** | The standing blocks (the suggested-next (a)): re-checked — the sr list-side chip + the four list interiors still zero-row (workouts 0, assignments 0 with the section omission, events 0, moods 1), the Goals earned tile still reference-side blocked ("Badges Earned 0 of 0"). The instruction's mobile-menu emphasis: the drawer battery verified BYTE-PARITY on the round-21 build (the 288px sheet, the hidden X, the border-r, the 32px rows, the 11 hrefs, the initial focus, escape + unlock, the viewport-grow auto-close). The zero-landmark shell unchanged (aside 0, nav 0 — the (o) pin premise). The Tailwind v4 pins all present in `globals.css`; no new v4 bug class in OUR compiled build. The (d) manual spot-check: the CDN pipeline has NOT drifted any computed value (the video-card set, the calendar trio, the nav rows, the drawer sheet, the mobile header — all byte-parity with the pinned maps) | — | No action (the standing doctrine) |

**No MEDIUM findings; no CRITICAL; no parity drift.** The round is a
watch-and-harden round: the reference held, and the cures are the
committed watch procedure (F-1) + the family-B modal pin (F-2) + the
docs ladder (F-3).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 25 | **25** | none |
| Unit checks | 365 | **365** | none — the watch script is a procedure (scripts/), not a seam; capture-round.mjs set the no-pin precedent |
| E2E checks | 70 | **71** | +1: the **(q) leg** (`wellness-crud.spec.ts` — the family-B Schedule modal: the 5 dynamic step circles + the family-B step title) |
| §8.1 rows | infra 163 · a11y 22 · CRUD 21 | **infra 163 · a11y 22 · CRUD 22** | the CRUD row +1 (the (q) leg rides the CRUD spec); the measured value flips CANONICAL in the same commit |
| Captures | 34 | **34** | the same committed set — expected ALL byte-stable this round (zero rendered-face change; movers only as the known rasterization/transition-instant classes, root-caused before any re-base) |

CANONICAL flips in `tests/docs-counts.test.ts` (e2eChecks 70→71) land
with every doc site in the SAME commit. If the RED run lands a
different exact count, the measured value flips CANONICAL in the same
commit — the doctrine is lockstep, not prophecy.

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full: the wellness-crud.spec.ts routines leg
(the sibling (q) locator patterns — the `div.group` card scoping, the
Use This Template role locator, the 450ms settle doctrine), the
routines-page.tsx steps rendering (the `scheduling.steps.map` + the
`SCHEDULE_MODAL.stepNum` span — the `rounded-full bg-purple-500`
circle), the seed's family-A/B step lists (3 + 5 — read this session),
the docs-counts CANONICAL block (e2eChecks 70), the PAD §8.1 CRUD row +
§8.4 + the §11 watch row, the AGENTS watch passage + the counts sites,
the SKILL §8 + §12 (lesson 36 — lesson 37 lands after it), the
capture-round.mjs procedure (the pattern the watch script copies: the
clean imports, the one-login doctrine, the execSync re-seed, the
console report).

### WP-1 — RED (the pins before the cures)
1. `tests/docs-counts.test.ts`: the CANONICAL flip (e2eChecks 70→71)
   — the full unit RED lands at exactly the docs-counts lockstep
   sites (the count-ladder doctrine: the flip precedes the leg so the
   suite can never pass with a stale count).
2. `tests/e2e/wellness-crud.spec.ts` +1 test: the **(q) leg** — the
   family-B Schedule modal's dynamic step count (the 5 circles + the
   "Set up inspiring space" first step + the family-split context:
   family-A's sibling leg above schedules the 3-step template). RED at
   birth (the test does not exist; the CANONICAL flip is the unit-side
   RED).

### WP-2 — GREEN (the cures)
1. The **(q) leg** implementation: goto /Routines → scope the Creative
   Flow Session card (`div.group` filtered by the exact title text)
   → click its Use This Template → assert the dialog title → count
   the `span.rounded-full.bg-purple-500` circles (5) → assert the
   first step title → Escape. Born-green expectations verified LIVE
   on the dev server before the gate (the (o) leg precedent — a pin
   born green is a standing drift guard, not a cure of a bug).
2. `scripts/watch-round.mjs` (NEW): the committed watch + computed
   spot-check companion —
   - PASS 1 (no login): open the reference login page, read the
     stylesheet href (the `index-*.css` form + the `/static/`//`assets/`
     path shape), the `index-*.js` bundle, the `cdn.tailwindcss.com`
     script, the `/api/frontend-config.js` — reported as the WATCH
     (informational: what moved since the ledger; a move is the signal
     to run the walk, never a failure).
   - PASS 2 (one login — the demo credentials; the rate-limiter
     doctrine): the canonical computed-value spot-check set, every
     member from this round's verified probes — the login h1; the
     dashboard H1 + tiles; the mobile header at 390 (padL/trigger/
     title-x); the drawer battery (open → sheet width/border-r/X/
     hrefs/rows/focus → escape + unlock); the desktop shell (rows/
     icons/avatar/footers/landmarks); the Goals standing block; the
     Routines family split + the video-card computed set; the Schedule
     modal on BOTH families (3 + 5 circles — opened read-only, never
     submitted); the Learning trio; the calendar outline trio; the
     Profile tablist. Each surface MATCH/DRIFT against the CANONICAL
     ledger at the top of the script; a drift or a probe error exits
     non-zero with the report; the ledger re-bases in the same commit
     as any cure (the md5-ledger doctrine).
   - ZERO-WRITE doctrine enforced in code and comment: the script
     navigates, opens dialogs and read-only forms, and never submits
     a create form anywhere.
   - Run live against the reference in WP-2 — the run itself is the
     ledger's born-verification (every member probed this round; a
     mismatch is investigated before the commit).

### WP-3 — the e2e verification
The (q) leg + the standing battery re-run (70+1 = 71); the console net
unchanged (no src/ change — the (q) leg asserts, the watch script
lives outside the app tree).

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **365/365 (25 suites)** · build OK · smoke
14/14 · e2e **71/71** · db census MATCH · `bun audit` zero (the
networked posture check, outside the gate per the doctrine).

### WP-5 — the docs ladder
PAD §11 (the F-1 procedure row + the F-3 watch row updated to round
21 — the JS-bundle-only change, the zero-drift walk outcome, the
active-cadence signal; the F-2 row documenting the family-split
decode + the (q) pin), PAD §8.1 (the CRUD row 21→22 + the totals) +
§8.4 (365/365 · 71/71), AGENTS (the watch note updated to round 21 +
the watch-script procedure named + the counts), SKILL v1.30.0 →
**v1.31.0** (§8's (q) leg passage + **lesson 37**: "the watch is a
hash, but the CDN is a compiler — a stable content hash proves the
stylesheet didn't change, not that the computed values didn't; the
only hash-proof probe of a runtime-compiled pipeline is the computed
value itself. And two consecutive bundle changes with zero face drift
teach the cadence lesson: when the reference develops actively, the
walk must become a committed one-command procedure or it will be
skipped under time pressure — the capture-round lesson, applied to
the watch" + the counts), README (the counts), CLAUDE (the counts),
worklog WH-33 (top), the plan's execution record, `docs/session_63.md`
(the session log convention).

### WP-6 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set). The
34-file set re-taken through the COMMITTED procedure — expected
byte-stable across the set (zero rendered-face change this round);
any movers root-caused (the known rasterization/transition-instant
classes) before the ledger re-base.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--key-file <key outside
repo>` + `--remote git@github.com:nordeim/wellness-hub.git`, main
only) → remote verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-0** — validated: every cure site read (the sibling leg's
  locator patterns, the step rendering + the stepNum circle, the
  seed's 3/5 step lists, the CANONICAL block, the docs sites, the
  capture-round pattern).
- **WP-1 RED** — the CANONICAL flip (e2eChecks 70→71) + the (q) leg:
  the full unit RED at exactly the 6 expected docs-counts lockstep
  sites.
- **WP-2 GREEN** — the (q) leg verified GREEN on the production build
  (the family-B five circles + the "Set up inspiring space" first
  step + the read-only Escape). The watch-round.mjs script written
  and iterated live — **the first run exposed THREE probe lessons
  cured in the same round**: (1) `waitUntil: "load"` fires before the
  SPA renders (five surfaces raced and read nulls — the gotoApp
  helper now waits for a route-content marker + settles); (2) a
  document-wide href count picks up the page's own capitalized links
  (15 vs 11 on the dashboard route — the count now scopes to the
  sheet); (3) **the study-resources route decode**: the reference's
  true href is the PLURAL `/StudyResources` (its own sidebar link;
  the singular 404s on full load — the session-62 narrative's
  URL-guess trap; OUR app already ships the plural form, no parity
  gap). The final run: **14/14 MATCH, exit 0** — and the watch itself
  caught a SECOND mid-session bundle change (round 22:
  `index-DT3tkBuH.js` → `index-CXmO9oF_.js`, CSS still stable), the
  computed set verified on the NEWEST bundle; the ledger re-based to
  the round-22 form in the same commit.
- **WP-3/WP-4** — the full gate GREEN: lint 0/0 · tsc 0 · unit
  365/365 (25 suites) · build OK · smoke 14/14 · e2e **71/71** ·
  census MATCH · bun audit zero.
- **WP-5 docs** — PAD §11 (the watch row's round-21+22 update + the
  F-1 companion row closed + the F-2 family-split row) + §8.1 (the
  CRUD row 21→22 with the (q) leg description) + §8.4 (71/71); AGENTS
  (the watch note's rounds-21+22 record + the script named + the
  counts); SKILL v1.30.0→v1.31.0 (§8's (q) passage + the
  e2e-battery table's stale 42-distribution cured to the live 71 form
  + LESSON 37 + the counts); README (the badge + the counts); CLAUDE
  (the counts); the worklog WH-33 entry; this record;
  docs/session_63.md. Docs-counts lockstep GREEN (365/365 unit).
- **WP-6 captures** — the doctrine LIVE (badgesEarned=0 asserted
  before the light set; census MATCH after); the FOURTH cross-round
  byte comparison: **28/34 byte-stable, SIX movers all root-caused
  before the re-base**: 07-events (1.81%) + 26-events-inline-form
  (0.90%) = **THE DATE-ROLLOVER CLASS** (the calendar band flipped
  "October 2026" → "November 2026" across midnight — the WH-32 base
  was captured pre-midnight 10-31, this set after midnight 11-01,
  verified live; a NEW procedure-state class: cross-month capture
  sessions legitimately move every date-keyed face);
  25-dark-login-focus (0.0069%, delta 4 — the file's own precedent
  class); 27-dark-mood-form + 32-mentalhealth-form-interior (0.0115%
  both, IDENTICAL narrow regions x[336-358] y[856-864] — the standing
  form-interior caret band); 28-routines-schedule-modal (0.0118% —
  the same narrow-band class inside the modal; the modal's own face
  unchanged, the (q)/sibling legs assert it live in the gate). The
  md5 ledger re-based at 34 files with the WH-33 record, verified 0
  mismatches.
- **WP-7** — the commit + the SSH-wrapper push (main only), the key
  shredded after.

---

**Suggested next (for WH-34):** (a) the standing blocks re-check; (b)
**the watch round 23 through the committed script (one command now —
`node scripts/watch-round.mjs`)** — rounds 21+22 both moved the JS
bundle with the CSS stable; a THIRD consecutive JS move confirms the
cadence as the norm, a stable read starts the cooling note; (c) the
reference's `/api/frontend-config.js` payload decode (the pipeline's
config surface — present since round 19, never decoded); (d) the
mood-form computed interior joins the watch script's canonical set
(this round read the LIST interior + stats only — the form's own
field members ride the (k) leg's map on our side and were verified
last at WH-32).
