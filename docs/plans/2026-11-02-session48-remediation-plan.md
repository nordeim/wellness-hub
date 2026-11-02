# WH-48 Remediation Plan — the fourteenth parity surface round (session 48)

Date: 2026-11-02 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round; the
session_91/session47-plan/worklog/session_92 inputs; this round executes
the WH-47 plan's suggested-next).

## Round inputs (validated live before this plan)

- Workspace refreshed via git pull (main at `a16d73d` — the WH-47 ship
  `4cfbfe2` + the operator's session_92 log push; the environment carried
  over intact: bun 1.3.14, node_modules, a live `.env` AUTH_SECRET, db/
  populated, chromium 1248). The five docs (AGENTS, CLAUDE, README, PAD,
  SKILL v1.45.0) + session_91 + the session47 plan + the worklog WH-47
  entry + session_92 read and validated against the tree.
- **The baseline gate re-run live, ALL GREEN at the exact WH-47 ship
  state: lint 0/0 · tsc 0 · unit 375/375 (26 suites) · build OK · smoke
  14/14 · e2e 72/72 (the mobile-nav battery re-run explicitly — the
  instruction's emphasis: 8/8) · census MATCH · `bun audit` zero.**
- The WH-47 changes audited on the tree (Mode C): the thirteenth surface
  `scripts/parity-listinteriors.mjs` (the ONE-login/FOUR-route/ZERO-WRITE
  budget discipline, the `div, section` card anchor, the PINNED
  transition-vocabulary member, the F-1 verification members riding the
  sr y-ladder) + `TOOLBAR.card` at both consumer pages + the widened
  parity-toolbars (the bounded chrome-climb anchor) + the watch ledger
  correctly re-based on the js axis — structure, anchors and conventions
  all standing, clean.
- The standing blocks verified on the tree (the instruction's
  checklist): the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"`
  → `<repo>/db/custom.db`, the census reads it: MATCH), `.env.example`
  tracked and accurate, the vitest/playwright configs (375/72, the e2e
  db PINNED at `db/e2e.db`), the sitemap/robots/manifest route handlers
  standing, the Tailwind v4 pins standing in `globals.css`, the mobile
  drawer battery green inside the 72/72 AND re-run explicitly.
- **Watch round 37: FULLY QUIET — both axes stable** (css
  `index-CapATpwD.css` + js `index-OLDXOew4.js`, the round-36 final read,
  unchanged) — the first fully-quiet read since round 36's move. The
  same-run digest **15/15 MATCH**. A quiet round is a reading, never a
  retirement — the watch stays every-round regardless; NO ledger re-base
  (nothing moved).
- **The standing battery's Window 1 green** (6 reference logins): login
  **34/34** (the zero-login leg) · moodForm **20/20** · shell **61/61**
  (the drawer battery, the instruction's mobile-menu emphasis) ·
  dashboard **105/105** · headers **192/192**. Window 2 (7 legs + the
  zero-login authviews) PENDING the reference window roll — paced per
  the lesson-46 doctrine.
- The neo-crm sibling: informational, per the WH-45/46/47 records (no
  re-probe spent this round).

## Findings (the fourteenth-surface decode — the WH-47 plan's (c)
candidates, decode-first against the live pair: ONE consolidated
reference flight + ONE our-side flight, then two targeted isolation
probes — the tile3 probe and the subs-scope probe)

- **F-1 [MEDIUM — the round's core, a REAL rendered-face drift] — the
  MH page's "days" sub-line rides `text-sm` where the reference's rides
  `text-xs`.** The decode's journey-ladder comparison caught a
  systematic Δ4: our Your Journey card sits at y=300 where the
  reference's sits at y=296 (and our card h=210 vs its 206, our tile
  h=122 vs its 118, our row h=72 vs its 68, our labelRow h=32 vs its
  28). The tile3 isolation probe root-caused the ladder's lower half:
  the MH KPI row's third tile ("Current Streak") carries a `days`
  sub-line — **the reference's computes `fs 12px / lh 16px` (`text-xs`)
  where ours computes `fs 14px / lh 20px` (`STAT_CARD.sub` =
  `text-sm`)** — a 4px tile-height drift (ours 132 vs ref 128) that
  lowers everything below the KPI row on the page (the whole Your
  Journey card + its interior ladder sits 4px lower). The subs-scope
  probe then settled the TWO-SITE SPLIT (the WH-27 doctrine): the
  reference's DASHBOARD tile subs and GOALS tile subs all compute
  `fs 14px / lh 20px` (`text-sm`) byte-identical to ours — **only the
  MH page's "days" site is `text-xs` on the reference** (its own
  per-site inconsistency). parity-kpis read green through it (its
  member set reads the tiles' label/value/icon anatomy, never the
  sub-line or the tile HEIGHT — the lesson-48 interior-anchored
  blind-spot class, the WH-47 F-1 sibling). **The cure (TDD): widen
  the existing WH-24 MODULE_KPI census it() block (the count ladder
  stays FLAT — the widening rides the existing block, the WH-47
  precedent) RED-first: `mentalhealth-page.tsx`'s days p must carry
  `text-xs text-gray-500 dark:text-gray-400` (the reference's
  probed form), while the dashboard + goals subs keep
  `STAT_CARD.sub` (their sites are `text-sm` on both apps).**
- **F-2 [MEDIUM — the superset-GEOMETRY class, the WH-47 F-1's
  sibling] — the journey tile's delete button rides `h-8` (32px) where
  the reference's labelRow box is 28px.** The same decode's Δ4 upper
  half: our labelRow computes h=32 because the delete superset's
  button (`h-8` = 32px) sets the row's height over the reference's 28px
  (the H4's `text-lg` 28px line box) — inflating the content column
  (row h 72 vs 68), the tile (122 vs 118) and the card (210 vs 206)
  by 4px each. The reference carries no delete anywhere (our
  documented functional superset — kept); the cure holds BOTH (the
  superset AND the rendered face): **`h-8` → `h-7` (28px — exactly the
  reference's labelRow line box; WCAG 2.5.8-compliant at 28px ≥ the
  24px floor)**, scoped to the MH site (the decoded face — the only
  data-bearing row that renders at the demo state on either app);
  the sibling pages' delete buttons stay `h-8` this round (no
  reference-mirrored face renders at their demo state — zero rows;
  the class documented here, deferred with the WH-48 ledger note).
- **F-3 [LOW, positive — the decode's born-quiet families] — the
  Upcoming Reminders/Events card interiors read byte-identical.** The
  dashboard's right column (both cards): the card chrome (12px radius,
  white, shadow-lg, 304×180), the header (flex, p-24, h=68), the title
  (16px/600 rgb(10,10,10)), the 20px title icon, the body
  (`0px 24px 24px`, h=112, childCount 1), the empty paragraphs
  ("No upcoming reminders"/"No upcoming events" at 16px/400
  rgb(107,114,128) centered, 256×88) — every member byte-identical on
  both apps, y-ladders included (364/432 and 568/636).
- **F-4 [LOW — the watch's quiet round]** — round 37 fully quiet on
  both axes; NO ledger re-base (nothing moved). The watch stays
  every-round regardless (the standing doctrine).
- **F-5 [LOW — data, the STANDING deviation, not a finding]** — the
  goals page's third KPI tile reads "of 8 total" (ours) vs "of 0
  total" (the reference's) — the DOCUMENTED PAD §11 deviation (the
  catalog-scope subtitle; the reference's Achievement entity is a
  per-user row table, its demo account carries zero rows). The subs
  scope probe re-verified both sides' text form byte-identical
  (text-sm, gray-500) — only the data differs, per the standing
  ledger.
- **F-6 [LOW — the journey interior's born-quiet members]** — the
  tile's own anatomy read byte-identical on both apps apart from the
  two Δ4 stacks: the chip (64×64, radius 16px, the
  blue-500→cyan-500 `to right bottom` gradient, shadow-lg, 30px
  emoji), the row (flex flex-start gap-16), the label (H4 18px/600
  gray-900), the date (SPAN 14px gray-500 "Oct 29, 2026"), the energy
  p (14px gray-700 "Energy Level: 5/10"), the tile transition
  (`all 0.15s`), the container (block, one child) — all matched
  byte-for-byte in the decode.

## Work packages

- **WP-0** — this plan, validated against the tree during the decode:
  the MH page's KPI rows + the Your Journey section
  (`MOOD_ENTRY_LIST` + `SectionCard`), the dashboard's right column,
  `STAT_CARD.sub`'s eight consumers (the two-site split's scope), the
  delete-button family (`h-8` at six pages), the WH-24 MODULE_KPI
  census block (`tests/src-census.test.ts`), the parity-kpis member
  set (the blind-spot class), the watch ledger state (quiet).
- **WP-1 (F-1 + F-2, TDD)** — the two Δ4 cures, RED-first:
  (a) RED — widen the existing WH-24 MODULE_KPI census it() block with
  the two MH-site pins (the days p's `text-xs text-gray-500
  dark:text-gray-400` form; the delete button's `h-7` form at the MH
  site) — the count ladder stays FLAT at 375 (the widening rides the
  existing it() block, the WH-47 precedent);
  (b) GREEN — `mentalhealth-page.tsx`: the days p drops
  `STAT_CARD.sub` for the reference's `text-xs text-gray-500
  dark:text-gray-400` form (inline at the call site — the two-site
  split documented in the record comment); the delete button's
  `h-8` → `h-7` (the labelRow line-box cure);
  (c) the live verification — the journey ladder re-read on the cured
  tree: the card at y=296 h=206, the tile at y=360 h=118, the row
  h=68, the labelRow h=28 — byte-identical to the reference's decode.
- **WP-2 (F-1/F-2's standing pin + F-3/F-6 — the FOURTEENTH SURFACE)**
  — write `scripts/parity-moodjourney.mjs` (modeled on the decode): the
  MH page's Your Journey tile interior (the FULL computed anatomy:
  card chrome + header/body + container + tile + row + chip + labelRow
  + label + date + energy + the delete-superset PINNED-DEVIATION
  member class) + the KPI-row → journey-card LADDER (the KPI grid
  bottom, the gap 32, the card y) + the MH KPI tile3's sub-line
  (fs/lh — the F-1 cure's verification member) + the dashboard's
  Upcoming Reminders/Events card interiors (F-3's born-quiet families
  as standing members) — ONE login per app, THREE routes
  (/mentalhealth, /dashboard), ZERO-WRITE; the delete button as a
  PINNED-DEVIATION member (ours present at h=7 28px, the reference's
  absent — the parity-account Session-card precedent; a pin failing
  is a DRIFT). **Born-verify ×3 consecutive flights.**
- **WP-3 (the battery completion)** — Window 2 paced after the
  reference login window rolls (the decode's three probe flights +
  Window 1's six have the window at its edge): toolbars **114/114** ·
  kpis **315/315** · routines **697/697** · tutorials **790/790** ·
  profile **433/433** · account **146/146** · authviews **192/192**
  (zero-login) · listinteriors **88/88** — plus the fourteenth
  surface's born-flights joining the cadence. The dev server restarted
  between windows per the lesson-46 doctrine.
- **WP-4 (the docs ladder)** — PAD §11 (the F-1 cure row + the F-2
  superset-geometry row + the fourteenth-surface row + the watch
  row's round-37 quiet record), AGENTS (round 37 + the
  FOURTEEN-script battery + the Δ4 lesson note), SKILL v1.45.0 →
  **v1.46.0** (the parity row widened to FOURTEEN surfaces), README/
  CLAUDE (no count sites — the ladder flat), the worklog WH-48 entry,
  this plan's execution record, `docs/session_93.md`. The count
  ladder FLAT at 375; the docs-counts lockstep green.
- **WP-5 (the capture round)** — `bun run db:seed && node
  scripts/capture-round.mjs`, the NINETEENTH cross-round byte
  comparison — the MH page's captures EXPECTED to move (the two Δ4
  cures are deliberate our-side face changes: 12-mentalhealth* + the
  below-fold ladder shifts; the WH-44/47 precedent); every other mover
  root-caused before any re-base, the ledger verified 0 mismatches,
  census MATCH after. Then the FULL GATE re-run on the final tree
  (lint → tsc → 375 → build → smoke → 72 e2e + the mobile-nav battery
  explicit).
- **WP-6 (the screenshots)** — the dev-server captures refreshed under
  `docs/screenshots/` if any walked face moved (the MH page + the
  journey tile); the instruction's Phase-6 artifact set.
- **WP-7** — the scratch cleanup (the four scratch probes deleted;
  zero residue) + the local commit + the SSH-wrapper push (main only,
  the runbook procedure, the key shredded after).

## The round's class (the lesson-49 candidate)

The F-1 finding is the lesson-48 family's FOURTH instance (a record's
INTERIOR members anchored the surface so green that the SUB-LINE —
the one element that governs the TILE HEIGHT and with it the whole
page ladder — was never a member; parity-kpis' 315 members read the
tiles' label/value/icon anatomy, never the sub-line or the height).
The F-2 finding is its sibling on the SUPERSET side (the WH-30
doctrine's own form): a functional superset's GEOMETRY is part of the
rendered face it lives in — the delete button's h-8 overrode the
labelRow's 28px line box and the whole tile grew 4px. Candidate
lesson 49: **a member set that pins an interior's elements must also
pin the elements' VERTICAL CONTRIBUTIONS (line-heights, explicit
heights) — the ladder is a member like any other; and a superset
control must FIT the line box it joins (h-7 not h-8 at a 28px row),
or the face it supersedes drifts by exactly the surplus.**

## Suggested next (WH-49)

(a) the standing battery at full width (watch round 38 + the FOURTEEN
  parity scripts — the two-window pacing stays mandatory; the decode's
  probe flights pace against BOTH limiters explicitly);
(b) the fourteenth surface's stability flights join the standing
  cadence;
(c) the FIFTEENTH surface candidates: the sibling delete-button sites
  at a data-bearing state (the reference's own row interiors —
  exercise/assignments/reminders/events/sr at one row each, the
  reference carrying no delete: the row-height superset-geometry
  class measured live), the Events calendar card's day-cell interiors,
  the routines template card's benefits/tip interiors;
(d) the standing blocks recheck + the preset-catalog watch.


## Execution record (WH-48, 2026-11-02)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree during the decode
  (the MH page's KPI rows + the Your Journey section, the dashboard's
  right column, STAT_CARD.sub's eight consumers, the delete-button
  family, the WH-24 MODULE_KPI census block, the parity-kpis member
  set, the watch ledger state).
- **WP-1 (F-1 + F-2, TDD)** ✓ — the census widened RED-first (3
  failures: the days p's text-xs form + the STAT_CARD.sub-at-MH ban +
  the h-7 pin) → the days p re-authored inline
  (`text-xs text-gray-500 dark:text-gray-400`) + the delete button's
  `h-8` → `h-7` → GREEN (unit 375/375 — the count ladder FLAT, the
  widening rides the existing it() block). **Verified live: the journey
  ladder byte-identical on both apps** (card y=296 h=206, header h=64,
  body y=360 h=142, tile y=360 h=118, row y=385 h=68, labelRow h=28,
  the days sub fs 12px/lh 16px).
- **WP-2 (the FOURTEENTH SURFACE)** ✓ — `scripts/parity-moodjourney.mjs`
  written: the journey tile interior + the days-sub ladder + both
  Upcoming cards, **116 members**, ONE login per app, TWO routes,
  ZERO-WRITE; the delete button as a PINNED-DEVIATION member; gradients
  by their rgb STOP TRIPLES (the parity-moodform convention — v4's
  `to bottom right` + `in oklab` + `%` position hints vs the CDN's bare
  `to right bottom`). Born-verified **116/116 ×3 consecutive flights**
  on the cured tree.
- **WP-3 (the battery completion)** ✓ — Window 2 paced after the
  reference login window rolled: toolbars 114/114 · kpis 315/315 ·
  routines 697/697 · tutorials 790/790 · profile 433/433 · account
  146/146 · authviews 192/192 · listinteriors 88/88 (+ Window 1's
  login 34/34 · moodForm 20/20 · shell 61/61 · dashboard 105/105 ·
  headers 192/192) — the tenth full-width run at THIRTEEN legs + the
  fourteenth, **3,303 computed members live-vs-live**, zero manual
  evals.
- **WP-4 (the docs ladder)** ✓ — PAD §11 (the F-1/F-2 cure row + the
  goals-subtitle re-verification row + the fourteenth-surface row + the
  watch row's round-37 quiet record), AGENTS (round 37 + the
  FOURTEEN-script battery + the third-instance limiter note), SKILL
  v1.45.0 → v1.46.0 (the parity row widened to FOURTEEN surfaces),
  README/CLAUDE (no count sites), the worklog WH-48 entry, this record,
  docs/session_93.md. The count ladder FLAT at 375; the docs-counts
  lockstep green.
- **WP-5 (the capture round)** ✓ — the NINETEENTH cross-round byte
  comparison, **29/34 byte-stable — FIVE movers ALL root-caused before
  the re-base**: 05-mentalhealth (80,310 px / 6.97%, maxdelta 247, the
  changed band starting exactly at row 136 — the KPI grid's y) +
  34-mood-list-interior (97,922 px / 8.50%) = the cures' deliberate
  face changes; 27-dark-mood-form (7,045 px / 0.61%, maxdelta 1) +
  32-mentalhealth-form-interior (9,728 px / 0.84%, maxdelta 1) = the
  sub-visible rasterization signature (the standing
  29-quick-actions-hover family; maxdelta 1 excludes the caret-blink
  axis; the form interiors byte-pinned by parity-moodform 20/20);
  25-dark-login-focus (77 px / 0.0067%, maxdelta 5) = the standing
  focus-phase signature (the sixth consecutive round). The ledger
  re-based, verified 0 mismatches, census MATCH after. The FULL GATE
  re-run GREEN on the final tree (lint 0/0 · tsc 0 · 375/375 · build
  OK · smoke 14/14 · e2e 72/72 with the mobile-nav battery 8/8 explicit
  · bun audit zero).
- **WP-6 (the screenshots)** ✓ — the 34-file capture set refreshed by
  the committed procedure (the mh/mentalhealth captures carrying the
  cures' faces; the ledger re-based in the same commit).
- **WP-7** ✓ — the scratch probes (scratch-decode-fourteenth.mjs +
  scratch-decode-fourteenth-ref.mjs + scratch-probe-tile3.mjs +
  scratch-probe-subs.mjs) deleted + the local commit + the SSH-wrapper
  push.

**The round's deviations from the plan**: one — the decode's DEBUG
flights tripped OUR dev server's login limiter MID-DECODE (the plan's
F-4/F-5 classes' live event: the WH-42 F-4 class's THIRD instance),
recovered by the lesson-46 doctrine (restart + paced re-runs) with no
flight lost; the two cures + the born-verifications all landed exactly
as planned. The fourteenth surface's born-flights took extra debugging
iterations (the chip's gradient serialization — v4's `in oklab` + `%`
position hints + `to bottom right` word order — resolved by adopting
the standing parity-moodform stop-triples convention verbatim).
