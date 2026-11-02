# WH-50 Remediation Plan — the sixteenth parity surface round (session 50)

Date: 2026-11-02 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round; the
session_95/session49-plan/worklog/session_96 inputs; this round executes
the WH-49 plan's suggested-next).

## Round inputs (validated live before this plan)

- Fresh clone to `d6ddc8c` (main, clean — the WH-49 ship `64009ac` + the
  operator's session_96 log push). The environment rebuilt: bun 1.3.14,
  chromium 1248 reinstalled (the sandbox cache carried 1200 only — the
  known first-run gap), `.env` copied with a fresh 64-hex AUTH_SECRET,
  db:push + db:seed + census MATCH (users=1 templates=11 steps=50
  tutorials=12 badges=8 moods=1).
- The five docs (AGENTS, CLAUDE, README, PAD, SKILL v1.47.0) + session_95
  + the session49 plan + the worklog WH-49 entry + session_96 read and
  validated against the tree. The instruction's checklist verified: the
  `.env`/db contract (`DATABASE_URL="file:../db/custom.db"` → the
  repo-root `db/`, census MATCH), `.env.example` tracked and accurate, the
  vitest/playwright configs (375/72, the e2e db PINNED at `db/e2e.db`), the
  sitemap/robots/manifest route handlers standing (smoke leg 12 green),
  the Tailwind v4 pins standing in `globals.css`, the mobile drawer
  battery re-run explicitly (8/8).
- **The baseline gate re-run live, ALL GREEN at the exact WH-49 ship
  state: lint 0/0 · tsc 0 · unit 375/375 (26 suites) · build OK · smoke
  14/14 · e2e 72/72 (the mobile-nav battery re-run explicitly — 8/8) ·
  census MATCH · `bun audit` zero.**
- The WH-49 changes audited on the tree (Mode C): the fifteenth surface
  `scripts/parity-calendar.mjs` (the ONE-login/ONE-route/ZERO-WRITE
  budget discipline, the date-derived members computed live, the
  'SunMonTue' SEQUENCE anchor, the stop-triples convention) — standing,
  clean.
- **Watch round 39: FULLY QUIET** — both axes stable (css
  `index-CapATpwD.css` + js `index-OLDXOew4.js`, the round-38 final read,
  unchanged — the THIRD consecutive fully-quiet read). The same-run
  digest **15/15 MATCH**. NO ledger re-base.
- **The standing battery's Window 1 green** (5 reference logins + the
  watch's): login **34/34** (the zero-login leg) · moodForm **20/20** ·
  shell **61/61** (the drawer battery, the instruction's mobile-menu
  emphasis) · dashboard **105/105** · headers **192/192** · toolbars
  **114/114**. Windows 2+3 PENDING the reference window roll — paced per
  the lesson-46 doctrine.
- The neo-crm sibling: informational, per the WH-45..49 records.

## Findings (the sixteenth-surface decode — the WH-49 plan's (c)
candidates walked decode-first; FOUR retirements before the real one)

- **F-1 [MEDIUM — the round's core: the Schedule modal's REMEMBER INSET
  INTERIOR drifts Δ20] — decoded live on both apps (ONE reference flight
  + ONE our-side flight + ONE targeted isolation probe per side).** The
  reference's Remember inset is a TWO-P family at `text-xs` (12px): the
  label `<p class="text-xs font-semibold text-purple-700 mb-1">💪
  Remember:</p>` (16px line + 4px margin) + the body `<p
  class="text-xs text-gray-700">` (2 lines × 16px) — total 76px. OURS
  renders the raw text `💪 Remember: {tips}` as ONE inherited-16px/24px
  text node (3 lines × 24px) — total 96px. The Δ20 inflates the
  description tile (ref 160 vs ours 180) and shifts the whole ladder
  below: the fields grid y 604→624, the date input y 632→656, the time
  input y 712→740, the textarea y 792→824, the primary y 876→908. The
  WH-22 record pinned the inset's CHROME (`bg-white/80 p-3 rounded-lg`)
  but never its INTERIOR — the same lesson-48 blind-spot class (a
  surface's wrapper is part of its anatomy; so is an inset's content
  structure). Every other modal member reads byte-identical: the overlay
  (rgba/oklab alpha — the lesson-40 class), the chrome (672×810 at
  (304,45), r-8, white, p-24, max-h 810 = 90vh, overflow-y auto, gap-16,
  the shadow real-layers), the header (18px/600, 622×18 at y=70), the
  descTile stops (250,245,255 → 253,242,248), the descP (14px
  rgb(55,65,81) mb-12), the stepsLabel (16px/600 mb-12), the 3 step
  tiles (flex gap-12 p-12 gray-50 r-8, 622×80), the circles (24×24,
  purple-500, white 12px/600), the step title/duration/desc faces, the
  3 labels (14px/500), the inputs (622×36, r-6, 4/12, 1px
  rgb(229,229,229)), the textarea (min-h 60, r-6, 8/12, shadow-sm), the
  fields grid (grid gap-16), the primary ("Schedule This Routine"
  622×36, r-6, white 14px/500, stops 168,85,247 → 236,72,153).
- **F-2 [LOW — the DOM-shape fact, documented not cured]** — the
  reference's step tiles are plain DIVs; ours are `<li>` elements inside
  an `<ol>` (the semantic superset — the lesson-27/48 class; the first
  decode's `<li>`-anchored probe read stepCount 0 on the reference — the
  anchor artifact, cured by the shape-based anchor in the surface).
- **F-3 [LOW — the WH-49 (c) candidates retired on decoded false
  premises]** — (a) the module create-forms' ERROR-state interiors: the
  reference's bad submit is blocked by NATIVE HTML5 validation (the
  duration input carries `required`, the Save button is `type="submit"`
  inside a real `<form>`) — the browser's validation bubble is browser
  UI, NOT a DOM face; there is nothing to mirror (our toast error
  channel is the deliberate a11y superset the a11y net walks; our forms
  are `<section>`-wrapped with JS validation). ZERO-WRITE verified (the
  form stayed open, no rows created, no toast fired on the reference).
  (b) the dark-mode calendar interior: the reference HAS NO dark mode
  (our Light/Dark/Auto engine is the documented README superset; its
  "Dark" text is a Visual-Style label, not a mode chip). (c) the Profile
  Account/Preferences tabs: ALREADY the eleventh surface
  (`parity-account.mjs`, 146 members) — rediscovered by this round's
  decode, retired on discovery. (d) the goals progress-logging interior
  stays data-blocked (the standing F-5 class). The Schedule modal's
  interior carried the round (the watch reads its width + circles only;
  the WH-22 record never re-verified live as a diffed surface).
- **F-4 [LOW — the watch's quiet round]** — round 39 fully quiet on both
  axes (the third consecutive); NO ledger re-base. The watch stays
  every-round regardless (the standing doctrine).
- **F-5 [LOW — deferred, the standing ledger note]** — the sibling
  delete-button sites at a data-bearing state remain unmeasurable on the
  reference (its demo account carries zero rows; the ZERO-WRITE doctrine
  forbids creating any) — the WH-48 F-5 deferral stands unchanged.

## Work packages

- **WP-0** — this plan, validated against the tree during the decode: the
  SCHEDULE_MODAL record (`src/lib/page-layout.ts` lines 803-821 — the
  `remember` member's chrome-only form), the routines page's Remember JSX
  (the raw-text form at line ~306), the census block
  (`tests/src-census.test.ts` lines ~1790-1840 — the MEMBERS list + the
  dark-twin loop), the purple-400 pin gap (`globals.css` @theme pins
  purple-50/100/500/600/700 — purple-400 retired with the stat-card bar
  maps), the capture set (capture 28 `28-routines-schedule-modal` reads
  the modal — the cure's expected mover).
- **WP-1 (F-1 — the CURE, TDD)** — RED: widen the SCHEDULE_MODAL census
  block (the MEMBERS list gains `rememberLabel` "text-xs font-semibold
  text-purple-700 mb-1" + `rememberBody` "text-xs text-gray-700"; the
  dark-twin loop gains `rememberLabel` → `dark:text-purple-400` +
  `rememberBody` → `dark:text-gray-400`) → GREEN: the two record members
  born in `src/lib/page-layout.ts` + the purple-400 v3 pin
  (`--color-purple-400: #c084fc`) added to @theme in the same commit
  (the WH-14 pins⇔usage equivalence) + the routines-page Remember inset
  re-authored as the two-p family (the label `💪 Remember:` + the body
  `{tips}`). The count ladder rides the existing it() block (the
  WH-47/48/49 precedent — FLAT at 375). Verified live: the inset 76px,
  the tile 160, the ladder below byte-identical to the reference's.
- **WP-2 (the SIXTEENTH SURFACE)** — write
  `scripts/parity-schedmodal.mjs` (modeled on the decode flights): the
  modal's FULL computed interior — the overlay (the alpha normalized via
  the canvas composite — the parity-login convention), the chrome (the
  geometry + the shadow real-layers + the scroll cap), the header, the
  descTile (the stop-triples), the two-p Remember family (the F-1 cure's
  verification members), the stepsLabel, the step tiles (SHAPE-anchored —
  the bg-gray-50 p-3 r-8 family, never `<li>`), the circles, the step
  title/duration/desc, the labels, the date/time inputs, the textarea,
  the fields grid, the primary (the stop-triples), the y-ladder — ONE
  login per app, ONE route (/routines + the Use This Template open on
  the family-A template "5-Minute Morning Energizer"), ZERO-WRITE
  (opened, read, closed via Escape — never submitted; the watch's own
  read-only interaction). The card anchor: the 12px-radius card root
  carrying the template name (the parity-routines convention — the
  over-climb cure). **Born-verify ×3 consecutive flights** (the
  reference login budget: 3, paced inside the windows).
- **WP-3 (the battery completion)** — Window 2 after the reference
  window rolls: kpis **315/315** · routines **697/697** · tutorials
  **790/790** · profile **433/433**. Window 3 (the next roll): account
  **146/146** · authviews **192/192** (zero-login) · listinteriors
  **88/88** · moodjourney **116/116** · calendar **92/92** (+ the
  sixteenth surface's born-flights joining the cadence). The dev server
  restarted between windows per the lesson-46 doctrine (this round's own
  THIRD limiter instance already absorbed: the decode flights spent the
  budget mid-round; the dev server restarted + the probes re-run).
- **WP-4 (the docs ladder)** — SKILL v1.47.0 → **v1.48.0** (the parity
  row widened to SIXTEEN surfaces + the parity-schedmodal entry), PAD
  §11 (the F-1 cure row + the sixteenth-surface row + the watch row's
  round-39 quiet record + the F-3 retirement rows), AGENTS (round 39 +
  the SIXTEEN-script battery note + the native-validation fact), README/
  CLAUDE (no count sites — the ladder flat), the worklog WH-50 entry,
  this plan's execution record, `docs/session_97.md`. The count ladder
  FLAT at 375 (the widening rides the existing it() block); the
  docs-counts lockstep green.
- **WP-5 (the capture round + the full gate)** — `bun run db:seed &&
  node scripts/capture-round.mjs`, the TWENTY-FIRST cross-round byte
  comparison. ONE cure this round → the EXPECTED mover:
  `28-routines-schedule-modal` (the Remember inset + the ladder below —
  the cure's deliberate face change, the WH-44/47/48 precedent); any
  other mover root-caused before any re-base, the ledger verified 0
  mismatches, census MATCH after. The full gate re-run on the final tree
  (lint → tsc → 375 → build → smoke → 72 e2e + the mobile-nav battery
  explicit) + census MATCH + bun audit zero.
- **WP-6 (the screenshots)** — the 34-file capture set refreshed by the
  committed procedure (capture 28's face moved with the cure); the
  ledger re-based on the mover in the same commit.
- **WP-7** — the scratch cleanup (the six scratch probes deleted; zero
  residue) + the local commit + the SSH-wrapper push (main only, the
  runbook procedure, the key shredded after).

## The round's class (no new lesson)

The decode carried the existing canon end-to-end: the lesson-48
wrapper/interior blind-spot class (the WH-22 record pinned the inset's
chrome, never its content structure — the same class's second instance
at the sub-card level), the lesson-40 serialization classes (the alpha
canvas composite + the shadow real-layers + the stop-triples), the
lesson-27/48 DOM-shape vocabulary (the DIV step tiles vs our `<li>`
superset), and the lesson-47 anchor discipline (the over-climb cure: the
12px card root, never the grid; the shape-anchored step tiles, never the
tag). No new lesson candidate.

## Suggested next (WH-51)

(a) the standing battery at full width (watch round 40 + the SIXTEEN
  parity scripts — the two-window pacing stays mandatory);
(b) the sixteenth surface's stability flights join the standing
  cadence;
(c) the SEVENTEENTH surface candidates: the mood form's non-default
  tile SELECTED states (the four unselected emoji families' gradients —
  client state, zero-write via Cancel), the events upcoming-list card
  interior at the demo state, the login family's focus-ring states;
(d) the standing blocks recheck + the preset-catalog watch.

## Execution record (WH-50, 2026-11-02)

Executed as written, all work packages landed — with ONE decode-time
widening absorbed inside WP-1 (the F-1b field-gap drift the F-1 decode's
y-ladder exposed, isolated by a targeted mt-probe):

- **WP-0** ✓ — the plan validated against the tree during the decode
  (the SCHEDULE_MODAL record + the routines Remember JSX + the census
  block + the purple-400 pin gap + the capture set's modal member).
- **WP-1 (the CURES, TDD)** ✓ — RED: the census widened (the
  rememberLabel/rememberBody members + their dark twins + [decode-time
  widening] the `field` "mt-1" member + the three-field consumption
  pin) → GREEN: the two-p record members + the `field` member born in
  page-layout.ts + the routines-page Remember inset re-authored + the
  date/time Inputs riding `SCHEDULE_MODAL.field` + the textarea via the
  tailwind-merge `cn(TEXTAREA_FIELD, SCHEDULE_MODAL.field)` override +
  the purple-400 v3 pin re-added to @theme. The count ladder FLAT at
  375 (the widenings ride the existing it() block). **Verified live:
  the inset 76px, the tile 160, the ladder below byte-identical to the
  reference's** (the primary y=876 both apps).
- **WP-2 (the SIXTEENTH SURFACE)** ✓ — `scripts/parity-schedmodal.mjs`
  written: **89 members**, ONE login per app, ONE route, ZERO-WRITE
  (opened, read, Escape); the card anchor: the 12px-radius card root
  (the over-climb cure); the step tiles SHAPE-anchored (tag-agnostic);
  the standing serialization normalizations (the canvas alpha + the
  stop-triples + the real-layers shadow + the is-round). Born-verified
  **89/89 ×3 consecutive flights** (one born-flight PROBE-ERROR
  absorbed: the reference login wall — the window budget, retried after
  the roll, lesson 45/46; two anchor iterations absorbed inside the
  flight: the `<li>`-only step anchor + the chrome.rect shadow leak).
- **WP-3 (the battery completion)** ✓ — Window 2: kpis 315/315 ·
  routines 697/697 · tutorials 790/790 · profile 433/433; Window 3:
  account 146/146 · listinteriors 88/88 · moodjourney 116/116 ·
  calendar 92/92 (+ Window 1's login 34/34 · moodForm 20/20 · shell
  61/61 · dashboard 105/105 · headers 192/192 · toolbars 114/114 +
  authviews 192/192 zero-login) — the twelfth full-width run at FIFTEEN
  legs + the sixteenth, **3,484 computed members live-vs-live**, zero
  manual evals; the dev server restarted between windows (lesson-46);
  no limiter trips on the reference side.
- **WP-4 (the docs ladder)** ✓ — SKILL v1.47.0 → v1.48.0 (the parity
  row widened to SIXTEEN surfaces + the parity-schedmodal entry + the
  battery-note FIFTEEN logins), PAD §11 (the sixteenth-surface row +
  the F-1/F-1b cure row + the watch row's round-39 quiet record),
  AGENTS (round 39 + the battery-count note + the sixteenth surface's
  own record), README/CLAUDE (no count sites), the worklog WH-50 entry,
  this record, docs/session_97.md. The count ladder FLAT at 375; the
  docs-counts lockstep green.
- **WP-5 (the capture round + the full gate)** ✓ — the TWENTY-FIRST
  cross-round byte comparison, **32/34 byte-stable, TWO movers ALL
  root-caused before the re-base**: 28-routines-schedule-modal = the
  cures' primary face; 29-quick-actions-hover (5 px / 0.0004%,
  maxdelta 1) = the standing sub-visible rasterization signature. The
  ledger re-based, verified 34/34, census MATCH after. The full gate
  re-run GREEN on the final tree: lint 0/0 · tsc 0 · unit 375/375 ·
  build OK · smoke 14/14 · e2e 72/72 (the mobile-nav battery 8/8,
  re-run explicitly per the instruction's emphasis) · census MATCH ·
  bun audit zero.
- **WP-6 (the screenshots)** ✓ — the 34-file capture set refreshed by
  the committed procedure; capture 28's face moved with the cure (the
  ledger re-based in the same commit).
- **WP-7** ✓ — the scratch probes (scratch-decode-errstate.mjs +
  scratch-decode-errstate-ref.mjs + scratch-decode-errstate-ref2.mjs +
  scratch-decode-darkflip.mjs + scratch-decode-proftabs.mjs +
  scratch-decode-schedmodal.mjs + scratch-decode-remember.mjs +
  scratch-decode-labels.mjs + scratch-dbg-modal.mjs +
  scratch-decode-mt.mjs + the docs-ladder scripts) deleted + the local
  commit + the SSH-wrapper push.

**The round's deviations from the plan**: one — the F-1b field-gap
drift was not a plan finding (the plan's F-1 was the Remember inset
alone); the sixteenth-surface born-flight's y-ladder exposed the Δ4
stack, the targeted mt-probe isolated it (all three fields' computed
marginTop 4px vs our 8px), and the cure + the census widening + the
purple-400 pin landed inside WP-1 without a plan re-issue (the same
decode-first doctrine the plan itself rides; the execution record
carries the widening).

