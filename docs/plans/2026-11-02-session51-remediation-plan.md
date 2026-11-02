# WH-51 Remediation Plan — the seventeenth parity surface round (session 51)

Date: 2026-11-02 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round; the
session_97/session50-plan/worklog/session_98 inputs; this round executes
the WH-50 plan's suggested-next).

**Execution note (the sandbox reset):** this round's first execution
completed its decode + cure + surface + battery + capture + gate + docs
ladder live, but the sandbox was recycled BEFORE the commit/push step —
the work re-applies here from the fresh clone at `df95a20` (the WH-50
ship + the operator's session_98 log push), with every cure re-verified
live on the rebuilt tree (the decode facts carried from the first
execution's flights; the born-flights + the battery + the capture round
re-run as the fresh evidence).

## Round inputs (validated live before this plan)

- Fresh clone to `df95a20` (main, clean). The environment rebuilt: bun
  1.3.14, chromium 1248 reinstalled (the sandbox cache carried 1200
  only — the known first-run gap), `.env` copied with a fresh 64-hex
  AUTH_SECRET, db:push + db:seed + census MATCH (users=1 templates=11
  steps=50 tutorials=12 badges=8 moods=1).
- The five docs (AGENTS, CLAUDE, README, PAD, SKILL v1.48.0) + session_97
  + the session50 plan + the worklog WH-50 entry + session_98 read and
  validated against the tree (the prior session's full review; the
  instruction's checklist verified: the `.env`/db contract
  (`DATABASE_URL="file:../db/custom.db"` → the repo-root `db/`, census
  MATCH), `.env.example` tracked and accurate, the vitest/playwright
  configs (375/72, the e2e db PINNED at `db/e2e.db`), the
  sitemap/robots/manifest route handlers standing (smoke leg 12 green),
  the Tailwind v4 pins standing in `globals.css`, the mobile drawer
  battery re-run explicitly (8/8)).
- **The baseline gate re-run live on the rebuilt tree, ALL GREEN at the
  exact WH-50 ship state: lint 0/0 · tsc 0 · unit 375/375 (26 suites) ·
  build OK · smoke 14/14 · e2e 72/72 (the mobile-nav battery re-run
  explicitly — 8/8) · census MATCH · `bun audit` zero.**
- The WH-50 changes audited on the tree (Mode C, the prior session): the
  sixteenth surface `scripts/parity-schedmodal.mjs` (the budget
  discipline, the 12px card-root anchor, the shape-anchored step tiles,
  the standing normalizations) + the F-1/F-1b cures (the SCHEDULE_MODAL
  record's rememberLabel/rememberBody/field members, the routines-page
  two-p JSX, the purple-400 v3 pin, the census widening) — standing,
  clean. One display-artifact investigated during the audit (the census
  file's dark-twin loop line renders as `for (const ember, twin]`
  through diff/sed pipes; `od -c` shows the true bytes `for (const
  [member, twin]` — valid syntax, the tests green, no action).
- **Watch round 40 (the first execution's read): a DOUBLE js move inside
  one round** — the TWENTY-SECOND bundle `/static/index-OLDXOew4.js` →
  `/static/index-CnKzudiR.js` at the round's start, then the
  TWENTY-THIRD `/static/index-CnKzudiR.js` → `/static/index-DktuqXUx.js`
  mid-round (the css axis STABLE at `index-CapATpwD.css` through both
  moves); the same-run digest **15/15 MATCH on BOTH new bundles**. The
  re-execution re-reads the watch fresh (WP-4 re-bases to the final
  read, both outcomes born-verified).
- The neo-crm sibling: informational, per the WH-45..50 records.

## Findings (the seventeenth-surface decode — the WH-50 plan's (c)
candidates walked decode-first; TWO retirements before the real one)

- **F-1 [MEDIUM — the round's core: the mood form's NON-DEFAULT tile
  SELECTED states drift — 4 of the 5 active gradients wrong on our side]
  — decoded live on both apps (ONE our-side flight + TWO reference
  flights; the second completed the Amazing tile cut from the first
  flight's output + read the inactive family at rest).** The reference's
  active tile carries a PER-MOOD gradient pair (decoded stops):
  😄 Amazing `from-green-500 to-emerald-500` (34,197,94 → 16,185,129) ·
  😊 Good `from-blue-500 to-cyan-500` (59,130,246 → 6,182,212 — the ONLY
  pair we render) · 😐 Okay `from-yellow-500 to-amber-500`
  (234,179,8 → 245,158,11 — the to-stop is AMBER-500 #f59e0b; the first
  decode mis-named it orange-500 and the cure's own live re-verification
  caught the wrong pair before the ledger locked it — name palette
  stops by their HEX, never by eyeball) · 😔 Low
  `from-orange-500 to-red-500` (249,115,22 → 239,68,68) · 😢 Struggling
  `from-red-500 to-pink-500` (239,68,68 → 236,72,153). OURS renders the
  Good pair for ALL five moods (`MOOD_FORM.active`'s one
  `bg-gradient-to-br from-blue-500 to-cyan-500` arm — the WH-26 decode
  read the DEFAULT-selected tile only, both apps opening with Good
  pre-selected; the standing surfaces' "no click" doctrine never opened
  the other four states). Every OTHER active-tile member reads
  byte-identical: white ink, 2px transparent border, the shadow-lg
  real-layers pair, the 1.05 lift, 181×109, the label 14px/500 white,
  the icon 36px. The INACTIVE family is uniform on both apps (gray-200
  border rgb(229,231,235), neutral ink, bg none) — no per-mood inactive
  drift. **LESSON 49 (the round's new class): the interaction-STATE axis
  of a multi-state control is a surface of its own — a "no click"
  doctrine that reads only the resting/default state pins ONE state of
  an N-state control** (the mood tiles' four non-default pairs shipped
  wrong through twenty-six green rounds BECAUSE every standing pin — the
  watch's moodForm leg, parity-moodform's read, the e2e (f) leg — read
  the SAME default face; three pins, one state, zero coverage).
- **F-2 [LOW — the DOM-shape + serialization facts, documented not
  cured]** — the reference's tile children are DIV,DIV (icon div +
  label div); ours are spans (the semantic-superset class, the
  lesson-27/48 vocabulary). The reference's CDN compiles `scale-105` to
  `transform: matrix(1.05, 0, 0, 1.05, 0, 0)`; our v4 compiles to the
  `scale` property (1.05) — the known WH-21 pipeline class, the surface
  reads the EFFECTIVE lift (either axis), never the serialized form.
  The gradient strings serialize differently (`to right bottom` bare vs
  `to right bottom in oklab` + `%` hints) — the lesson-40 stop-triples
  convention.
- **F-3 [LOW — the WH-50 (c) candidates retired on decoded false
  premises / discovery]** — (a) the events upcoming-list card interior
  at the demo state: RETIRES on discovery — the WH-23 empty-form census
  already decoded the reference's bare-empty form live (its body is
  just `<div class="space-y-3"></div>`, no empty-state message) and the
  SectionCard chrome family is pinned by the standing surfaces
  (listinteriors/calendar); the card adds no unread member family.
  (b) the login family's focus-ring states: RETIRES on discovery — the
  WH-20 round decoded the reference's light ring (white 2px offset +
  slate-400 2px), PAD §11 documents the reference-shared contrast
  findings, the e2e (b) leg pins our dark ring (real Tab, settled), and
  capture 25 signs the family. (c) the goals progress-logging interior
  stays data-blocked (the standing F-5 class).
- **F-4 [LOW — the watch's double js move]** — round 40's intra-round
  double move (the first since the watch went every-round; css stable;
  digest 15/15 on both bundles). The ledger re-bases on the js axis in
  WP-4 to the re-execution's final read, both outcomes born-verified.
- **F-5 [LOW — deferred, the standing ledger note]** — the sibling
  delete-button sites at a data-bearing state remain unmeasurable on
  the reference (its demo account carries zero rows; the ZERO-WRITE
  doctrine forbids creating any) — the WH-48/49/50 F-5 deferral stands
  unchanged.

## Work packages

- **WP-0** — this plan, validated against the tree during the decode:
  the MOODS record (`src/lib/constants.ts` lines 61-67), the MOOD_FORM
  record (`src/lib/page-layout.ts` lines 746-757 — the active member's
  single-pair arm), the mood-tile JSX
  (`src/app/(app)/mentalhealth/mentalhealth-page.tsx` lines ~139-165 —
  the `mood === m.value ? MOOD_FORM.active : MOOD_FORM.inactive`
  ternary), the census block (`tests/src-census.test.ts` lines
  ~2880-2935), the gradient-ink mood-tile pin
  (`tests/gradient-ink.test.ts` — the second it() block, the 2.43
  lockstep), the interaction-contrast ANATOMY + consumption pins
  (`tests/interaction-contrast.test.ts` lines ~230-286), the @theme
  pins (all eight shades ALREADY pinned at their v3 values — green-500
  #22c55e, emerald-500 #10b981, yellow-500 #eab308, amber-500 #f59e0b,
  orange-500 #f97316, red-500 #ef4444, pink-500 #ec4899, blue-500
  #3b82f6, cyan-500 #06b6d4 — no new pins needed), the capture set
  (captures 27-dark-mood-form + 32-mentalhealth-form-interior read the
  DEFAULT-active form — the cure does NOT move them), the e2e (f) leg
  (reads the DEFAULT active tile — stays green; its comment's "the
  FIXED blue→cyan active pair" phrasing updates in the same commit).
- **WP-1 (F-1 — the CURE, TDD)** — RED: widen the src-census MOOD_FORM
  block (the MOOD_ACTIVE_GRADIENTS record's five decoded pairs + the
  MOOD_FORM.active shared-arms pin + the page's consumption pin
  `cn(MOOD_FORM.active, MOOD_ACTIVE_GRADIENTS[m.value])`) + widen the
  gradient-ink mood-tile pin (the five pairs' worst-stop table — 2.28 /
  2.43 / 1.92 / 2.80 / 3.53, all AA-failing, reference-shared, pinned
  not cured; the PAD lockstep asserts pair+ratio ADJACENCY) + widen the
  interaction-contrast ANATOMY (the shared arms) + the five-pair pin +
  the consumption pin → GREEN: the `MOOD_ACTIVE_GRADIENTS` record born
  in `src/lib/page-layout.ts` (the ROUTINE_CATEGORY_GRADIENTS
  precedent: value → fixed pair) + MOOD_FORM.active re-authored as the
  shared arms alone ("text-white border-transparent shadow-lg
  scale-105") + the page's tile ternary composing the per-mood pair +
  the PAD §11 fixed-gradient row widened (the four new pairs' ratios +
  the mood-tiles family note) + the e2e (f) comment touch-up. The count
  ladder rides the existing it() blocks (the WH-47..50 precedent — FLAT
  at 375). Verified live: all five active faces byte-identical to the
  reference's.
- **WP-2 (the SEVENTEENTH SURFACE)** — write
  `scripts/parity-moodtiles.mjs` (modeled on the decode flights): for
  EACH of the five tiles — the active face (the per-mood STOP TRIPLES,
  the white ink, the 2px transparent border, the shadow-lg real-layers
  pair, the EFFECTIVE 1.05 lift [ours the scale property, the
  reference's transform matrix — the is-lift normalization], the label
  color/fs/weight [tag-agnostic: the LAST element child, ours span the
  reference's div], the icon fs, the 181×109 rect) + the INACTIVE
  family at rest (the gray-200 border, the neutral ink, bg none) + the
  at-rest default (Good pre-selected, the zero-click face, its gradient
  by STOP TRIPLES — the lesson-40 serialization class) + the zero-write
  close (Cancel + the form-left-the-DOM proof). ONE login per app, ONE
  route (/MentalHealth + the New Entry open), ZERO-WRITE (tile clicks
  are client state; the form closes via Cancel; nothing is ever
  submitted). **Born-verify ×3 consecutive flights** (the reference
  login budget: 3, paced inside the windows).
- **WP-3 (the standing battery)** — the full-width run at SEVENTEEN
  surfaces, SPLIT across the reference login windows (the dev server
  restarted between windows per the lesson-46 doctrine): login 34/34
  (the zero-login leg) · moodForm 20/20 · shell 61/61 (the drawer
  battery, the instruction's mobile-menu emphasis) · dashboard 105/105
  · headers 192/192 · toolbars 114/114 · kpis 315/315 · routines
  697/697 · tutorials 790/790 · profile 433/433 · account 146/146 ·
  authviews 192/192 (zero-login) · listinteriors 88/88 · moodjourney
  116/116 · calendar 92/92 · schedmodal 89/89 · moodtiles 67/67.
- **WP-4 (the watch + the ledger re-base)** — the fresh watch read (the
  re-execution's own round; the first execution read the double move),
  the ledger re-based ONCE to the round's FINAL read, born-verifying
  BOTH outcomes (the firing state caught live + the quiet state after
  the edit: assets stable + the digest 15/15 — the round-35/36
  doctrine).
- **WP-5 (the docs ladder)** — SKILL v1.48.0 → **v1.49.0** (the parity
  row widened to SEVENTEEN surfaces + the parity-moodtiles entry) +
  LESSON 49 in the lessons canon, PAD §11 (the F-1 cure row + the
  seventeenth-surface row + the watch row's round-40 record + the
  fixed-gradient row widened), AGENTS (round 40 + the
  SEVENTEEN-script battery note + the seventeenth surface's own
  record), README/CLAUDE (no count sites — the ladder flat), the
  worklog WH-51 entry, this plan's execution record,
  `docs/session_99.md`. The count ladder FLAT at 375; the docs-counts
  lockstep green.
- **WP-6 (the capture round + the full gate)** — `bun run db:seed &&
  node scripts/capture-round.mjs`, the TWENTY-SECOND cross-round byte
  comparison. ZERO expected movers (the cure does not move the
  default-active form the captures read; the four corrected pairs live
  on the non-default tile states, pinned live-vs-live by
  parity-moodtiles 67/67); any mover root-caused before any re-base,
  the ledger verified 0 mismatches, census MATCH after. The full gate
  re-run on the final tree (lint → tsc → 375 → build → smoke → 72 e2e +
  the mobile-nav battery explicit) + census MATCH + bun audit zero.
- **WP-7** — the scratch cleanup (the decode probes deleted; zero
  residue) + the local commit + the SSH-wrapper push (main only, the
  runbook procedure, the key shredded after).

## The round's class (a new lesson)

**LESSON 49: the interaction-STATE axis of a multi-state control is a
surface of its own** — a "no click" doctrine that reads only the
resting/default state pins ONE state of an N-state control (the mood
tiles' four non-default active gradients shipped wrong through
twenty-six green rounds BECAUSE every standing pin read the SAME default
face; three pins, one state, zero coverage). The class generalizes
lesson 24 (the rendered-STATES axis) from page-level states (dark,
hover, focus) to the PER-OPTION states of a stateful input control. The
lesson joins the canon at WP-5 with the WH-51 number.

## Suggested next (WH-52)

(a) the standing battery at full width (watch round 41 + the SEVENTEEN
  parity scripts — the two-window pacing stays mandatory);
(b) the seventeenth surface's stability flights join the standing
  cadence;
(c) the EIGHTEENTH surface candidates: the energy slider's NON-DEFAULT
  thumb states (the slider's own value axis — client state, zero-write
  via Cancel), the reflection textarea's focus/caret face, the routines
  category filter chips' selected states (client state);
(d) the standing blocks recheck + the preset-catalog watch.

## Execution record (WH-51, 2026-11-02)

Executed as written across TWO executions (the sandbox reset between
them — the first execution completed its decode + cure + surface +
battery + capture + gate + docs ladder live but was recycled BEFORE the
commit; the work re-applied from a fresh clone at `df95a20` with every
cure re-verified live, the evidence below the re-execution's own):

- **WP-0** ✓ — the plan validated against the tree during the decode
  (the MOOD_FORM record + the mood-tile JSX + the three census/pin
  blocks + the @theme pins [all eight shades already standing] + the
  capture set + the e2e (f) leg).
- **WP-1 (the CURE, TDD)** ✓ — RED: the three widenings landed exactly
  as designed (the src-census MOOD_ACTIVE_GRADIENTS + shared-arms +
  consumption pins; the gradient-ink five-pair table with the
  PAD-adjacent lockstep; the interaction-contrast ANATOMY + five-pair +
  consumption pins — 3 failures, the expected set) → GREEN: the record
  born in page-layout.ts + MOOD_FORM.active reduced to the shared arms
  + the page's composing ternary + the PAD fixed-gradient row widened +
  the e2e (f) comment touch-up. The count ladder FLAT at 375 (the
  widenings ride the existing it() blocks). **Verified live: all five
  active faces byte-identical to the reference's** (parity-moodtiles'
  own reads; the amber correction — the Okay to-stop rgb(245,158,11) is
  AMBER-500, not orange-500 — caught by the first execution's live
  re-verification BEFORE the pin locked the wrong pair, and carried
  into the re-execution's RED set from the start).
- **WP-2 (the SEVENTEENTH SURFACE)** ✓ — `scripts/parity-moodtiles.mjs`
  written: **67 members**, ONE login per app, ONE route, ZERO-WRITE
  (tile clicks are client state; Cancel close + the form-left-the-DOM
  proof); the per-tile members (the stop triples + ink + border +
  real-layers shadow + the EFFECTIVE lift [the is-lift normalization] +
  the label trio [tag-agnostic, the LAST element child] + the icon fs +
  the rect) + the at-rest family (the default-active gradient by its
  stop triples — the lesson-40 serialization class, absorbed inside the
  first execution's born-flight). Born-verified **67/67 ×3 consecutive
  flights** on the cured tree.
- **WP-3 (the battery)** ✓ — the THIRTEENTH full-width run at SEVENTEEN
  surfaces, split across the reference login windows (the dev server
  restarted between windows, lesson-46): login 34/34 (the zero-login
  leg) · moodForm 20/20 · shell 61/61 (the drawer battery, the
  instruction's mobile-menu emphasis) · dashboard 105/105 · headers
  192/192 · toolbars 114/114 · kpis 315/315 · routines 697/697 ·
  tutorials 790/790 · profile 433/433 · account 146/146 · authviews
  192/192 · listinteriors 88/88 · moodjourney 116/116 · calendar 92/92
  · schedmodal 89/89 · moodtiles 67/67 — **3,551 computed members
  live-vs-live, zero manual evals**; no limiter trips on the reference
  side.
- **WP-4 (the watch + the re-base)** ✓ — round 40 read a MULTI-move
  round on the js axis (THREE bundles inside the round's window:
  `OLDXOew4` → `CnKzudiR` → `DktuqXUx` → `CEYMtRjl`, the TWENTY-FOURTH
  distinct bundle at the final read; the css axis STABLE at `CapATpwD`
  through every move, the SIXTH consecutive round); the digest 15/15 on
  EVERY new bundle; the ledger re-based ONCE to the final read,
  born-verified BOTH outcomes (the firing state caught live + the quiet
  state after the edit: assets stable + 15/15).
- **WP-5 (the docs ladder)** ✓ — SKILL v1.48.0 → v1.49.0 (the parity
  row widened to SEVENTEEN surfaces + the parity-moodtiles entry +
  LESSON 49 in the canon), PAD §11 (the F-1 cure row + the
  seventeenth-surface row + the watch row's round-40 multi-move record
  + the fixed-gradient row's per-mood table), AGENTS (round 40 + the
  SEVENTEEN-script battery note + the seventeenth surface's own
  record), README/CLAUDE (no count sites), the worklog WH-51 entry,
  this record, docs/session_99.md. The count ladder FLAT at 375; the
  docs-counts lockstep green.
- **WP-6 (the capture round + the full gate)** ✓ — the TWENTY-SECOND
  cross-round byte comparison: the FIRST run fired TWO movers, both
  root-caused live before any re-base — 10-learning (8 px / 0.0007%,
  maxdelta 7) = the standing sub-visible rasterization class;
  24-dark-exercise-rows (11.78%, the workout row MISSING) = a TIMING
  RACE in the capture procedure itself: the freshly-restarted dev
  server's on-demand /Exercise compile exceeded the snap's fixed 400ms
  wait (the first run of a fresh-clone round is the exposed class). The
  re-run read BOTH byte-stable to the ledger — **ZERO real drift, NO
  ledger re-base** — and the race itself CURED in the committed
  procedure: `waitForSelector("text=30 min")` (the row-only duration
  text) before the capture-24 snap; the fixed procedure verified
  **34/34 byte-stable, ZERO movers**. One limiter instance absorbed
  mid-capture (our dev server's own login limiter — the WH-42 F-4
  class; the dev server restarted + the capture re-run, lesson 46).
  The full gate re-run GREEN on the final tree: lint 0/0 · tsc 0 ·
  unit 375/375 · build OK · smoke 14/14 · e2e 72/72 (the mobile-nav
  battery 8/8, re-run explicitly per the instruction's emphasis) ·
  census MATCH · bun audit zero.
- **WP-7** ✓ — the scratch cleanup (the decode probes deleted; zero
  residue) + the local commit + the SSH-wrapper push (main only, the
  runbook procedure, the key shredded after).

**The round's deviations from the plan**: one — the capture round's
first run fired the procedure's own timing race (a plan-unforeseen
environmental catch: 24-dark-exercise-rows captured the zero-row state
against the freshly-restarted dev server's on-demand compile). The
root-cause walk (the pixel-diff + the re-run + the row-wait cure in the
committed procedure) landed inside WP-6 without a plan re-issue (the
same decode-first doctrine the plan itself rides; the execution record
carries the cure).
