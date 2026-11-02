# WH-47 Remediation Plan — the thirteenth parity surface round (session 47)

Date: 2026-11-02 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round).

## Round inputs (validated live before this plan)

- Fresh clone to `fd96add` (main, clean; the WH-46 ship `2466037` + the
  operator's session_90 log push). The environment rebuilt (bun 1.3.14,
  chromium 1248 reinstalled — the sandbox cache carried 1200 only, the
  known first-run gap, the WH-44 record's class), `.env` copied with a
  fresh 64-hex AUTH_SECRET, db:push + db:seed + census MATCH (1/11/50/12/8
  + 1 mood row).
- **The baseline gate re-run live, ALL GREEN at the exact WH-46 ship
  state: lint 0/0 · tsc 0 · unit 375/375 (26 suites) · build OK · smoke
  14/14 · e2e 72/72 (the mobile-nav battery re-run explicitly — the
  instruction's emphasis: 8/8) · census MATCH · `bun audit` zero.**
- The WH-46 changes audited on the tree (Mode C): the twelfth surface
  `scripts/parity-authviews.mjs` (540 lines — the zero-login walk, the
  text-content button anchors, the canvas/is-round normalizations, the
  PINNED inherited-ink class, the budget discipline) — structure,
  anchors and conventions all standing, clean; the watch ledger
  correctly re-based on both axes (css `CapATpwD` + js `l0vUUttr`).
- The standing blocks verified on the tree (the instruction's
  checklist): the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"`
  → `<repo>/db/custom.db`, the census reads it: MATCH), `.env.example`
  tracked and accurate (the only diff vs `.env` is the AUTH_SECRET
  value), the vitest/playwright configs (375/72, the e2e db PINNED at
  `db/e2e.db`), the sitemap/robots/manifest route handlers standing
  (`src/app/sitemap.xml/route.ts` + `robots.txt/route.ts` +
  `manifest.json` + `og-image.png` — the smoke's ok-12 leg all 200), the
  Tailwind v4 pins standing in `globals.css` (both `@custom-variant`s +
  `--shadow-sm` + `--blur-sm` + the three `@source not`), the mobile
  drawer battery green inside the 72/72 AND re-run explicitly.
- **Watch round 36: a genuine js MOVED — the TWENTY-FIRST distinct
  bundle** (`/static/index-l0vUUttr.js` → `/static/index-OLDXOew4.js`;
  the CSS content hash STABLE at `index-CapATpwD.css` for the FOURTH
  consecutive round) — the single-axis move class. The same-run
  computed digest **15/15 MATCH on the new bundle** (the rendered face
  byte-held through the move). The ledger re-bases on the js axis this
  round.
- **The standing battery's ninth full-width run** (paced across login
  windows): login **34/34** (the zero-login leg) · moodForm **20/20**
  (after one transient first-flight timeout closed by the immediate
  re-run — lesson 45 verbatim) · shell **61/61** (the drawer battery,
  the instruction's mobile-menu emphasis) · dashboard **105/105** ·
  headers **192/192** · toolbars **98/98** · kpis **315/315** ·
  routines **697/697** · authviews **192/192** (the twelfth surface's
  first battery ride, flight 1) — the tutorials/profile/account legs
  PENDING a paced re-run: our dev server's own per-IP login limiter
  tripped mid-window (the WH-42 F-4 class — the decode's debug flights
  spend the same budget as the battery; the dev server restarted per
  the lesson-46 doctrine, the legs re-run paced).
- The neo-crm sibling: informational, per the WH-45/46 records (no
  re-probe spent this round).

## Findings (the thirteenth-surface decode — the WH-46 plan's (c)
candidates, decode-first against the live pair: ONE consolidated
reference flight + ONE our-side flight, then three isolation probes on
the sr/learning ladders + margins)

- **F-1 [MEDIUM — the round's core, a REAL rendered-face drift] — the
  module toolbars ride inside a CARD WRAPPER on the reference; ours
  render the bare flex row.** The decode's sr-page ladder caught a
  48px y-offset on the special empty card (ref y=252 vs ours y=204);
  the isolation probes root-caused it: the reference's toolbar — on
  BOTH consumer pages (StudyResources + Learning) — is wrapped in the
  card chrome `rounded-xl border bg-card text-card-foreground
  border-none shadow-lg` with `p-6` padding (the card computes h=84 =
  the 36px flex row + 2×24px padding; radius 12px; bg white;
  shadow-lg), where ours renders the bare `flex flex-col md:flex-row
  gap-4` row (h=36, no chrome). The whole page ladder below the
  toolbar sits 48px lower on the reference (the sr special card, the
  Learning tutorial grid at y=252 vs 204). The internal anatomy is
  byte-identical (why parity-toolbars read green through eight
  full-width runs: its member set reads the toolbar's INTERIOR — the
  input/icons/selects/wrapper row — never the card AROUND it, the same
  blind-spot class as the WH-24 probe that documented "the stock
  family" without the wrapper). The wrapper is the SECTION_CARD card
  form verbatim (our `SECTION_CARD.card` = `bg-surface text-ink
  rounded-xl border-none shadow-lg` renders the identical computed
  face: white bg, no border, shadow-lg, 12px radius). **The cure
  (TDD): the WH-24 module-toolbar census widens RED-first — the
  TOOLBAR record gains a `card` member (the SECTION_CARD chrome
  family) and both consumer pages must wrap their toolbar container in
  it — then `src/lib/page-layout.ts` + the two pages GREEN.** The
  parity-toolbars surface widens with the wrapper members (the card
  chrome/radius/bg/shadow/h + the inner row's y-offset inside it) so
  the class can never ship invisible again.
- **F-2 [LOW — a serialization class, pinned not cured] — the
  transition-colors compiled-vocabulary split.** The feed row's
  `transitionProperty` computes the v3-era six-property list on the
  reference's CDN build (`color, background-color, border-color,
  text-decoration-color, fill, stroke`) vs our v4's ten-property
  expansion (adds `outline-color` + the three `--tw-gradient-*` custom
  properties). BOTH apps author the same `transition-colors` class —
  the compiled vocabulary is the toolchain's own, and the property
  only renders during a hover transition (the at-rest no-render
  class, the parity-authviews inherited-ink precedent). Treatment:
  PINNED at both apps' own documented values in the thirteenth
  surface (a pin failing is a DRIFT); no src cure — our authored class
  is already the reference's own.
- **F-3 [LOW, positive — the decode's born-quiet families] — the four
  candidate interiors read byte-identical** (the WH-46 plan's (c)
  list, settled live): the dashboard Recent Activity row (the card
  chrome 12px/border-none/white/632×160 + the header title + 20px
  icon + the row flex/flex-start/gap-12/p-12/radius-8 + the 💚 glyph
  24px/32px + the title 16px/500/gray-900 + the detail 14px/gray-500
  + the SPAN date 12px/gray-400 + the full y-ladder), the exercise
  zero-row empty (the "Recent Workouts" card, icon-less header, the
  empty paragraph 16px/gray-500/centered at the byte-identical
  y=344/w=912/h=120), the sr special empty card (the p-6 py-20 body +
  the 64px gray-300 BookOpen + the 18px/400/gray-500 hint — interior
  byte-identical; the y-offset is F-1's ladder, fully explained), and
  the goals Achievements empty state (the title + 20px trophy icon +
  the 14px/gray-500/centered paragraph, bodyChildCount 1).
- **F-4 [LOW — the watch's js move]** — the twenty-first bundle
  (`l0vUUttr` → `OLDXOew4`): the ledger re-bases on the js axis,
  born-verified on the quiet state (assets stable + 15/15).
- **F-5 [LOW — the battery's limiter trip, the WH-42 class's second
  instance]** — our dev server's per-IP login limiter tripped
  mid-battery (the decode's debug flights spent the same budget; the
  three scratch probes after the battery's Window 1 pushed the count
  over 10/15min). The doctrine held: restart the dev server between
  the battery and any decode phase (lesson 46), and pace the decode's
  DEBUG flights like battery flights (lesson 47's budget note,
  applied symmetrically this time).

## Work packages

- **WP-0** — this plan, validated against the tree during the decode:
  the TOOLBAR record + its two consumer pages + the WH-24 census
  block (`tests/src-census.test.ts`), the SECTION_CARD chrome family,
  the parity-toolbars member set, the four candidate interiors' DOM
  structures (the `<section>` vs `<div>` card-tag split — our semantic
  superset, the card anchor must match both), the dashboard feed
  builder (`src/lib/activity-feed.ts` — the WH-28 decode's standing
  face).
- **WP-1 (F-1, TDD)** — the toolbar card-wrapper cure: (a) RED —
  widen the WH-24 module-toolbar census in `tests/src-census.test.ts`
  (the TOOLBAR record must carry a `card` member at the SECTION_CARD
  chrome form; both consumer pages must wrap their toolbar container
  in `TOOLBAR.card` with the `p-6` padding); (b) GREEN —
  `src/lib/page-layout.ts` gains `TOOLBAR.card` (the
  `cn(SECTION_CARD.card, "p-6")` form — a single member, the record's
  own doctrine), the StudyResources + Learning pages wrap their
  toolbar divs; (c) the live verification — the reference's computed
  wrapper anatomy (radius 12px, bg white, shadow-lg, h=84, the row at
  +24px inside) re-read on the cured tree.
- **WP-2 (F-1's standing pin)** — widen `scripts/parity-toolbars.mjs`
  with the wrapper members: the card's chrome (radius/bg/shadow-form/
  h) + the inner row's y-offset inside the card (the +24px padding
  member) + the wrapper's landscape fact (the card is a 12px-radius
  panel on both apps). Born-verify the widened surface ×2 flights on
  the cured tree.
- **WP-3 (F-3 + F-2 — the THIRTEENTH SURFACE)** — write
  `scripts/parity-listinteriors.mjs` (modeled on the decode): the
  dashboard Recent Activity row interior + the exercise zero-row
  empty + the sr special empty card + the goals Achievements empty
  state — ONE login per app, four pages, ZERO-WRITE (login + read
  only, the cleanest read class), the card anchors matching `div,
  section` (our `<section>` semantic superset), the F-2
  transition-vocabulary split as PINNED members (both apps at their
  own documented values), the sr card's y-ladder riding the F-1 cure
  (y=252 on both after the wrapper lands). **Born-verify ×3
  consecutive flights.**
- **WP-4 (F-4)** — the watch ledger re-base on the js axis
  (`OLDXOew4`), born-verified BOTH outcomes (the firing state caught
  live at the round's start + the quiet state verified after).
- **WP-5 (the battery completion + the docs ladder)** — the paced
  re-runs of tutorials/profile/account (the limiter-trip recovery)
  + the authviews stability flights ×2 more (the ×3 born-verification
  joining the standing cadence); the docs ladder: PAD §11 (the F-1
  row + the F-2 serialization-class row + the thirteenth-surface
  row), AGENTS (round 36 + the THIRTEEN-script battery + the
  F-1/F-5 notes), SKILL v1.44.0 → **v1.45.0** (the parity row
  widened to THIRTEEN surfaces + the thirteenth surface's own row),
  README/CLAUDE (no count sites — the ladder flat), the worklog
  WH-47 entry, this plan's execution record, `docs/session_91.md`.
  The count ladder: the census widening adds unit checks (the
  docs-counts lockstep recomputed in the same commit).
- **WP-6** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the EIGHTEENTH cross-round byte
  comparison — the toolbar pages' captures EXPECTED to move (the F-1
  cure is a deliberate our-side face change: the sr/learning captures
  re-based after root-causing, the WH-44 precedent); every other
  mover root-caused before any re-base, the ledger verified 0
  mismatches, census MATCH after. Then the FULL GATE re-run on the
  final tree.
- **WP-7** — the scratch cleanup (the four scratch probes deleted;
  zero residue) + the local commit + the SSH-wrapper push (main only,
  the runbook procedure, the key shredded after).

## The round's class (no new lesson candidate)

The F-1 finding is the lesson-48 family's THIRD instance (the section
vocabulary is app-specific; a surface conversion must decode the FULL
computed anatomy of every element it touches — the toolbar's WRAPPER
was never a member of the WH-24/40 records, so eight full-width
battery runs read green around it). The decode-first doctrine paid off
again: the y-ladder caught what the interior-anchored surfaces
couldn't see. The F-2 class is the parity-authviews inherited-ink
precedent's sibling (the toolchain's own serialization, pinned at both
apps' values). No new lesson — the existing lessons 40/43/47/48 + the
battery conventions carried the decode end-to-end.

## Suggested next (WH-48)

(a) the standing battery at full width (watch round 37 + the THIRTEEN
  parity scripts — the reference-login count rises to twelve per round
  counting the watch's: the two-window pacing stays MANDATORY, and the
  decode's DEBUG flights now pace against BOTH limiters explicitly);
(b) the thirteenth surface's stability flights join the standing
  cadence;
(c) the FOURTEENTH surface candidates: the mood list "Your Journey"
  tile interiors (the WH-26/27 records pinned the label row + list
  container; the per-tile interior never rode a live-vs-live read),
  the Upcoming Reminders/Events dashboard cards' interiors (the
  zero-row faces), the exercise/mental-health KPI-row → list-card
  ladders at the seeded demo state;
(d) the standing blocks recheck + the preset-catalog watch.

---

## Execution record (WH-47, 2026-11-02)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree during the decode
  (the TOOLBAR record + consumers + the WH-24 census block, the
  SECTION_CARD chrome, the parity-toolbars member set, the four
  candidate interiors' DOM structures, the activity-feed builder).
- **WP-1 (F-1, TDD)** ✓ — the census widened RED-first (4 failures:
  the card member + the SECTION_CARD extension + the two page wraps)
  → `TOOLBAR.card` born in `src/lib/page-layout.ts` (the
  `bg-surface text-ink rounded-xl border-none shadow-lg p-6` form, the
  SECTION_CARD chrome family) + the StudyResources + Learning pages'
  toolbar containers wrapped → GREEN (unit 375/375 — the count ladder
  FLAT, the widening rides the existing WH-24 it() block).
- **WP-2 (F-1's standing pin)** ✓ — `scripts/parity-toolbars.mjs`
  widened with 16 wrapper members (the card chrome radius/bg/border/
  borderColor + the real-layers shadow + h=84 + the rendered row
  offsets 24/24; the card anchor CLIMBS to the chrome — the first
  widened flight caught the reference's p-6-content-div DOM depth
  split, the fixed anchor born-verified **114/114 ×2 consecutive
  flights** on the cured tree).
- **WP-3 (F-3 + F-2 — the THIRTEENTH SURFACE)** ✓ —
  `scripts/parity-listinteriors.mjs` written: the feed interior + the
  exercise zero-row empty + the sr special empty card + the goals
  Achievements empty state, **88 members (87 MATCH + 1 PINNED** — the
  transition-colors compiled-vocabulary split), ONE login per app,
  FOUR routes, ZERO-WRITE, the `div, section` card anchor. Born-
  verified **88/88 ×3 consecutive flights** — the sr y-ladder
  (252/332/412) verified the F-1 cure live on both apps.
- **WP-4 (F-4)** ✓ — the watch ledger re-based on the js axis
  (`OLDXOew4`) with the round-36 record; born-verified BOTH outcomes
  (the firing state caught live at the round's start + the quiet state
  after the edit: `assets stable` + 15/15).
- **WP-5** ✓ — the battery completed through the limiter recovery
  (tutorials 790/790 + profile 433/433 + account 146/146 re-run paced
  after the dev-server restart; authviews 192/192 ×3 flights — the
  stability cadence); the docs ladder shipped (PAD §11's four sites,
  AGENTS round 36 + the THIRTEEN-script battery, SKILL v1.45.0, the
  worklog WH-47 entry, this record, docs/session_91.md); the count
  ladder FLAT at 375; the docs-counts lockstep green.
- **WP-6** ✓ — the capture round: the EIGHTEENTH cross-round byte
  comparison, **30/34 byte-stable** — the FOUR movers (08-studyresources
  + 10-learning + 30-tutorial-card-hover + 33-sr-form-interior) all
  root-caused as the F-1 cure's deliberate our-side face changes (the
  wrapper's primary face + the below-fold 48px ladder shift; the
  interiors themselves byte-pinned by the standing surfaces); the
  ledger re-based with the WH-47 record, verified 0 mismatches, census
  MATCH after. The FULL GATE re-run GREEN on the final tree (below).
- **WP-7** ✓ — the scratch probes (scratch-decode-thirteenth.mjs +
  scratch-probe-card.mjs + scratch-probe-srladder.mjs +
  scratch-probe-learning.mjs + scratch-probe-margins.mjs) deleted +
  the local commit + the SSH-wrapper push.

**The round's deviations from the plan**: one — the decode's debug
flights tripped OUR dev server's login limiter mid-battery (the plan's
F-5 finding became a live event: the WH-42 F-4 class's second
instance), recovered by the lesson-46 doctrine (restart + paced
re-runs) with no battery leg lost; the F-1 cure + the widenings +
the born-verifications all landed exactly as planned.
