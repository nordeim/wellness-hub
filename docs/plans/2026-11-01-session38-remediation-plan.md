# WH-38 Remediation Plan — the fourth parity surface round (session 38)

Date: 2026-11-01 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set).

## Round inputs (validated live before this plan)

- Baseline pulled to `8a2cdb5` (the operator's `session_72` log push; WH-37
  shipped at `ef0aaa5`, confirmed on the remote). The baseline gate re-run
  live: **lint 0/0 · tsc 0 · unit 369/369 (26 suites) · build OK · smoke
  14/14 · e2e 72/72 · census MATCH (moods=1) · `bun audit` zero** — the
  documented WH-37 ship state, reproduced.
- **Watch round 27: a genuine DOUBLE move** — PASS 1 fired MOVED on BOTH
  axes: the CSS content hash `index-BHjkUcdg.css` → `index--nhcow2j.css`
  (**the first stylesheet CONTENT change since round 20**) + the js bundle
  `index-CcEolDtM.js` → `index-CaQQhuPL.js` (the SEVENTH distinct bundle).
  The same-run PASS-2 digest read **15/15 MATCH on the new assets** — the
  walk the MOVED signal demands, done by the companion itself.
- The three parity companions ran as the standing battery, all quiet ON THE
  NEW BUILD: **login 34/34** (third consecutive), **moodForm 20/20**
  (fourth), **shell 61/61** (second — the WH-37 plan's (d) precondition for
  the fourth surface has landed).
- The standing blocks: the mobile drawer battery green twice (the watch's
  PASS-2 surface + the e2e mobile-navigation/a11y specs inside the 72/72),
  the Tailwind v4 pins standing in `globals.css`, `.env`/db contract
  verified (census reads `<repo>/db/custom.db`), `.env.example` tracked.

## Findings

- **F-1 [LOW, procedure]** — the watch ledger needs the round-27 re-base
  (both axes: `cssPath` → `/static/index--nhcow2j.css`, `jsPath` →
  `/static/index-CaQQhuPL.js`), born-verified on BOTH outcomes per the
  WH-34 doctrine (the firing state was exercised by this round's first
  run; the quiet state by the post-edit re-run). The double move is the
  round-20 class (a CSS CONTENT change — the rarest signal; round 20's
  carried one real face change) — which makes the round's core (F-2) the
  correct response: deepen the same-round verification battery.
- **F-2 [MEDIUM, the round's core]** — **the parity net's FOURTH SURFACE:
  `scripts/parity-dashboard.mjs`** — the dashboard stat-tile family (the
  app's main face; the WH-37 plan's (d) candidate whose data values became
  comparable by construction at the F-2 seed cure). The two-clocks gap it
  closes: the watch's `dashboard` surface pins the reference's H1 + tile
  LABEL/VALUE presence against its ledger, our e2e pins label visibility +
  the Mood-Entries tile value — the tiles' computed CHROME (the STAT_CARD
  anatomy: card/wash/content/iconRow/iconTile/icon/label/value/sub) has
  never been diffed same-round, and the DATA values never live-vs-live.
  DECODED LIVE FIRST (the doctrine): **105 scalar members probed on both
  apps — 94 MATCH + 11 known-class** (the 8 tile gradients + the h1Bg =
  the lesson-40 oklab/rgb serialization class, same stop-triples; the
  grid locator = a probe artifact, the reference's header nests the grid
  one level closer to the h1 than ours — cured by anchoring the grid on
  the CARDS: walk up from tile[0]'s card until the element contains
  tile[1]'s card AND computes `display: grid`). NO real drift — the
  family is byte-parity INCLUDING the data values (0/1/0/0 + all four
  sub-texts + both header texts) — the WH-37 F-2 seed cure's payoff.
- **F-3 [LOW, positive]** — the standing blocks hold (the battery above,
  the drawer battery, the v4 pins, census, audit); the neo-crm sibling
  recheck rides WP-3 (network).

## Work packages

- **WP-0** — this plan, validated against the tree: the decode's anchors
  vs our source (`STAT_CARD`/`PAGE_KPI_GRIDS` in `src/lib/page-layout.ts`,
  the dashboard page's tile markup — the label-text → card →
  wash/iconTile/value/sub chain matches our authored structure), the
  ledger's current form (the re-base sites), the docs-counts CANONICAL
  (NO flips this round — the cure is procedure-side; the §8.1 infra row
  counts `tests/*.test.ts` only, unit stays 369/26 suites, e2e stays 72 —
  the WH-36 flat-ladder precedent).
- **WP-1 (F-2)** — write `scripts/parity-dashboard.mjs`: PASS A the
  reference (ONE login → `/Dashboard` at 1280×900 → the member read),
  PASS B our dev server (ONE login → the same read), the member-by-member
  live-vs-live diff, exit 1 on any DRIFT/PROBE-ERROR. ~105 members: the
  header (h1 text/fs/fw + gradient stops, subtitle text/fs/color), the
  KPI grid (cols at 1280, gap — the card-anchored locator), and all four
  tiles' full computed anatomy (cardBg/R/shadow/W, washStops/opacity,
  iconTileStops/W/R, iconW/color, label fs/fw/color/mb, value
  text/fs/fw/color/mb, sub text/fs/color). The standing normalizations:
  gradients compare their rgb STOP TRIPLES (lesson 40); the DATA members
  (valueText/subText) compared as-is — a data drift is a finding to
  decode (the lesson-41 live-fact class), never a silent re-base.
  ZERO-WRITE on both apps (login + read only). **Born-verify: the first
  flight must read all-MATCH, exit 0** (the decode pre-verified every
  member; the flight proves nothing moved between the decode and the
  flight). Probe-bug loop if any member mis-anchors: fix the member, not
  the app.
- **WP-2 (F-1)** — the watch ledger re-base (both axes) + the
  born-verification re-run (the quiet state: `assets stable` + 15/15).
- **WP-3 (F-3)** — the neo-crm sibling recheck (the live repo's SKILL
  version vs the vendored record).
- **WP-4** — the docs ladder: PAD §11 (the watch row's round-27 record +
  the F-2 fourth-surface row; §8.1 unchanged), AGENTS (the watch note:
  round 27 + the FOUR-script standing battery + the fourth surface
  named), SKILL v1.35.0 → **v1.36.0** (the quick-reference parity row
  widened to four surfaces + **LESSON 42** + the version + the counts
  verified), README/CLAUDE counts verified unchanged (the lockstep pin),
  the worklog WH-38 entry, this plan's execution record,
  `docs/session_73.md`.
- **WP-5** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the NINTH cross-round byte comparison, every
  mover root-caused before the ledger re-base, the ledger verified 0
  mismatches, census MATCH after.
- **WP-6** — the full gate re-verification on the final tree (the counts
  flat: 369/369 · 72/72 · census MATCH · audit zero — procedure-side
  changes only, but the gate re-runs green regardless).
- **WP-7** — the scratch cleanup (`scratch-decode-dashboard.mjs`
  deleted; zero residue) + the local commit + the SSH-wrapper push (main
  only, the runbook procedure, the key shredded after).

## Lesson 42 candidate (the round's class)

The widening's payoff arc, completed: the round-20 precedent (a CSS
content move carried ONE real rendered-face change, found by a manual
walk) vs round 27 (a CSS content move verified byte-held by the widest
same-round battery yet — the 15-surface digest + three parity companions
+ the fourth surface's decode, 250+ computed members, zero manual evals).
The net's design rule the arc teaches: **each surface lands only after
the existing surfaces read quiet two-plus consecutive flights (the
precondition discipline), and it lands DECODED — the decode pre-verifies
every member, so a new surface is born quiet unless the family it covers
was never decoded before** (the shell's five catches vs the dashboard's
zero: the shell family had never been probed, the dashboard family was
probed at WH-23 + data-cured at WH-37). The lesson also records the
grid-anchor artifact's rule: anchor on RENDERED FACTS (label texts, the
display:grid common ancestor), never on header-nesting depth — the
same-anchor class as the WH-37 bordered-column lesson.

## Suggested next (WH-39)

(a) the standing battery (watch round 28 + the FOUR parity scripts —
five reference logins/round total, or four if the dashboard surface
proves redundant with the watch's dashboard digest); (b) the cooling
policy still needs two-plus consecutive stable reads — round 27 broke
any streak; (c) the FIFTH surface candidates: the module page headers
(the PAGE_THEMES identity family, data-independent) or the profile page
(the tablist + the appearance presets); (d) the standing blocks recheck.

---

## Execution record (WH-38, 2026-11-01)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree (the decode anchors vs
  `STAT_CARD`/`PAGE_KPI_GRIDS` + the dashboard tile markup; the ledger
  form; the docs-counts CANONICAL — NO flips, the count ladder FLAT).
- **WP-1 (F-2)** ✓ — `scripts/parity-dashboard.mjs` written (105 members:
  header 9 + grid 2 + 4 tiles × 24; the gradient stop-triples + the
  shadow real-layers normalizations; the DATA members as-is; the
  card-anchored grid locator). Two probe lessons at birth, both cured
  in place: the fixed settle raced the reference's async aggregate (the
  tiles render only after it resolves — cured by the tile-label WAIT,
  `text=Workouts This Week`), and one evaluate argument-order slip.
  **Born-verified 105/105 MATCH on the first flight + stable on the
  second consecutive flight.**
- **WP-2 (F-1)** ✓ — the ledger re-based on BOTH axes; born-verified on
  the quiet state (`assets stable` + 15/15; the firing state was
  exercised by round 27's first run).
- **WP-3 (F-3)** ✓ — the neo-crm sibling at v1.202.0 (unchanged).
- **WP-4** ✓ — PAD §11 (the watch row's round-27 record + the F-2
  fourth-surface row), AGENTS (round 27 + the FOUR-script battery),
  SKILL v1.36.0 (the parity row widened + LESSON 42 + the version + the
  STALE e2e-battery row caught and cured: wellness-crud 14→15, total
  71→72 — a doc-drift outside the lockstep pin's canonical sites, found
  by the round's own docs pass), README/CLAUDE verified unchanged
  (lockstep GREEN 10/10), worklog, this record, docs/session_73.md.
- **WP-5** ✓ — the NINTH cross-round byte comparison: **32/34
  byte-stable (the cleanest yet), TWO movers both root-caused as the
  standing precedents** (25: 77px/0.0067%/maxdelta 5 — the sixth
  consecutive round at the identical focus-instant signature; 29:
  5px/0.0004%/maxdelta 1 — the sub-visible hover-instant class). All 34
  health-checked; the ledger re-based, verified 0 mismatches.
- **WP-6** ✓ — the full gate GREEN on the final tree (below).
- **WP-7** ✓ — the scratch probes deleted; the commit + the
  SSH-wrapper push.

**The full gate GREEN**: lint 0/0 · tsc 0 · unit **369/369 (26
suites)** · build OK · smoke **14/14** · e2e **72/72** · census MATCH
(moods=1) · `bun audit` zero — the count ladder FLAT (the procedure-side
precedent), the lockstep pin GREEN.

**The round's one deviation from the plan**: none — the plan held as
written. The capture record's phrase in the worklog ("the execution
addendum") was filled with the WP-5 numbers after the comparison ran.
