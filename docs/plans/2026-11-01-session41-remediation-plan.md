# WH-41 Remediation Plan — the seventh parity surface round (session 41)

Date: 2026-11-01 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set).

## Round inputs (validated live before this plan)

- Fresh clone to `e2b34c6` (WH-40 shipped at `b01265f` + pushed; the
  operator's `session_78` log push came in on the pull — 79 lines
  narrating the WH-40 ship). The baseline gate re-run live: **lint 0/0
  · tsc 0 · unit 369/369 (26 suites) · build OK · smoke 14/14 · e2e
  72/72 · census MATCH (moods=1) · `bun audit` zero** — the documented
  WH-40 ship state, reproduced.
- **Watch round 30: the DOUBLE move — the THIRD css CONTENT change**
  (`/static/index-CMHVFeas.css` → `/static/index-T8A-IXoy.css`) AND the
  ELEVENTH distinct js bundle (`/static/index-DA6CuPbY.js` →
  `/static/index-B3stYFo-.js`). The same-run PASS-2 digest read
  **15/15 MATCH on the new assets** — the walk the MOVED signal demands
  was already done by the companion in the same run.
- **The standing battery at FULL WIDTH — all six legs, all quiet on the
  new build** (the WH-40 plan's suggested-next (a), executed):
  parity-login **34/34** (sixth consecutive), parity-moodform **20/20**
  (seventh — see F-4 for the one transient first-flight flake),
  parity-shell **61/61** (fifth — the instruction's mobile-menu
  emphasis, the drawer battery green again), parity-dashboard
  **105/105** (fifth), parity-headers **192/192** (fourth),
  parity-toolbars **98/98** (second) — **510 computed members
  live-vs-live, zero manual evals**. The rendered face held through the
  third css content move and the eleventh bundle move.
- The standing blocks: the `.env`/db contract verified (census reads
  `<repo>/db/custom.db`), `.env.example` tracked and accurate, the
  vitest/playwright configs verified (369 unit / 72 e2e), the
  sitemap/robots route handlers verified (the smoke's ok-12 leg:
  sitemap + robots + manifest all 200), the Tailwind v4 pins standing
  in `globals.css`, the mobile drawer battery green (the shell
  companion's drawer leg + the e2e mobile-navigation/a11y specs inside
  the 72/72).

## Findings

- **F-1 [LOW, procedure]** — the watch ledger needs the round-30
  re-base on BOTH axes (`cssPath` → `/static/index-T8A-IXoy.css`,
  `jsPath` → `/static/index-B3stYFo-.js`), born-verified on BOTH
  outcomes per the WH-34 doctrine (the firing state exercised by round
  30's first run; the quiet state by the post-edit re-run). The
  double-axis move is the round-27/28/29 class — the
  active-development cadence is the standing state; the cooling policy
  stays unborn (two-plus consecutive stable reads remain the
  threshold; rounds 27+28+29+30 each moved at least one axis).
- **F-2 [MEDIUM, the round's core]** — **the parity net's SEVENTH
  SURFACE: `scripts/parity-kpis.mjs`** — the `MODULE_KPI` record
  family, the non-dashboard pages' stat rows (the WH-40 plan's (c)
  candidate). The data-independence case strengthened by the decode:
  the demo accounts share the zero state AND the one-entry mood state,
  so even the DATA values are comparable by construction (the
  parity-dashboard doctrine). DECODED LIVE FIRST (the doctrine, both
  apps, one login per side, zero-write): **the landscape is a parity
  fact** — exactly 5 of the 10 non-dashboard pages render a KPI row on
  BOTH apps, each exactly 3 tiles in a `grid` at `304px 304px 304px`
  with a 24px gap (exercise: the orange→red hero + Total
  Minutes/Calories plain; mentalhealth: the emerald→teal hero + Avg
  Energy/Current Streak plain; assignments: Pending plain + the
  green→emerald Completed hero + Urgent plain; reminders: all three
  plain; goals: the yellow→amber Total Points hero + Goals
  Completed/Badges Earned plain), and 5 render none on both (routines,
  events, studyresources, learning, profile — the absence pins are
  members, catching a KPI row appearing or disappearing on either
  app). Every scalar member is byte-identical (the grid geometry, the
  labels' 14px/4px-mb/gray-600-or-hero--100-tint, the values'
  36px/700/40px-lh, the DATA values as-is — 0 everywhere except
  mentalhealth's 1/"5.0/10"/1, identical on both apps' demo accounts;
  the icon colors incl. the hero `-100` tints, the wrap's 24px
  padding, the row's flex/center/space-between, the tile radius 12px,
  the 0px border, the plain tile's white bg) or a member of exactly
  TWO KNOWN classes:
  1. the lesson-40 gradient stop-triples class (the hero tiles: the
     reference serializes `linear-gradient(to right bottom, rgb(a, b,
     c), rgb(d, e, f))` vs our v4's `linear-gradient(to right bottom
     in oklab, rgb(a, b, c) 0%, rgb(d, e, f) 100%)` — the rgb triples
     are identical; the moodForm/dashboard precedent verbatim);
  2. the lesson-40 shadow var-chain zero-layers class (the reference's
     CDN emits two `rgba(0,0,0,0)` zero-layers before the real
     `rgba(0,0,0,0.1) 0px 10px 15px -3px` + `rgba(0,0,0,0.1) 0px 4px
     6px -4px` pair; our build-time v4 emits four zero-layers before
     the same real pair) — the real-layers filter, the
     parity-dashboard precedent verbatim.
  **NO real drift anywhere in the family** — the lesson-42 born-quiet
  prediction (the family was probed field-by-field at WH-23 and pinned
  by the card-geometry census; the decode found only the two known
  serialization classes — the net's first surface to land with ZERO
  unknown classes).
- **F-3 [LOW, positive]** — the standing blocks hold (the battery
  above, the drawer battery, the v4 pins, census, audit, the smoke's
  SEO legs); the neo-crm sibling recheck rides WP-3 (network).
- **F-4 [LOW, procedure — the round's lesson]** — the transient
  first-flight PROBE-ERROR: parity-moodform's first PASS B (our side)
  timed out on the New Entry button — the post-login `/MentalHealth`
  document request redirected to the login wall ONCE, although the
  login POST had answered 200 and the dashboard visit had rendered.
  The cross-checks (a curl login + `/MentalHealth` with the cookie:
  200, no redirect; the script's immediate re-run: 20/20 MATCH; the
  watch's own moodForm read in the same round: MATCH) closed it as
  PROBE INFRASTRUCTURE — the post-login cookie-commit /
  cold-compile race class, not app drift. No app change made; the
  doctrine: a first-flight PROBE-ERROR on a quiet family is
  reproduced before it is cured — never patched from one read
  (the Appendix-B "reproduce before trusting" rule, now in the
  parity-probe domain). LESSON 45.

## Work packages

- **WP-0** — this plan, validated against the tree: the decode's
  anchors vs our source (`MODULE_KPI` + `PAGE_KPI_GRIDS` + `STAT_CARD`
  in `src/lib/page-layout.ts`, the five consumer pages' KPI sections,
  the WH-23 card-geometry census in `tests/src-census.test.ts`), the
  ledger's current form (the re-base site), the docs-counts CANONICAL
  (NO flips this round — the parity script is a script, not a unit
  test; unit stays 369/26 suites, e2e stays 72 — the WH-36/38/39/40
  flat-ladder precedent).
- **WP-1 (F-2)** — write `scripts/parity-kpis.mjs`: PASS A the
  reference (ONE login → the 10 pages at 1280×900 → the member read),
  PASS B our dev server (ONE login → the same read), the
  member-by-member live-vs-live diff, exit 1 on any
  DRIFT/PROBE-ERROR. ~315 members: the landscape (10 pins) + per KPI
  page (the grid's 3 + the tile count 1) + per tile 19 (iconColor,
  label, labelFs, labelMb, labelColor, value, valueFs, valueFw,
  valueLh, valueColor, tileBgStops [normalized], tileBgColor,
  tileShadowReal [normalized], tileRadius, tileBorder, wrapP,
  rowDisplay, rowAlign, rowJustify) — the 48×48 SVG anchor (the
  `MODULE_KPI.bigIcon` signature; nothing else on the walked pages
  renders a 48px icon, decode-verified on both apps). ZERO-WRITE on
  both apps (login + read only). **Born-verify: the first flight must
  read all-MATCH, exit 0** (the decode pre-verified every member).
  Probe-bug loop if any member mis-anchors: fix the member, not the
  app.
- **WP-2 (F-1)** — the watch ledger re-base (BOTH axes) + the
  born-verification re-run (the quiet state: `assets stable` + 15/15).
- **WP-3 (F-3)** — the neo-crm sibling recheck (the live repo's SKILL
  version vs the vendored record).
- **WP-4** — the docs ladder: PAD §11 (the watch row's round-30
  record + the F-2 seventh-surface row + the F-4 transient-probe
  row; §8.1 unchanged), AGENTS (the watch note: round 30 + the
  SEVEN-script standing battery + the seventh surface named), SKILL
  v1.38.0 → **v1.39.0** (the quick-reference parity row widened to
  seven surfaces + **LESSON 45** [the transient first-flight
  probe-error class: reproduce before curing] + the version + the
  counts verified), README/CLAUDE counts verified unchanged (the
  lockstep pin), the worklog WH-41 entry, this plan's execution
  record, `docs/session_79.md`.
- **WP-5** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the TWELFTH cross-round byte comparison,
  every mover root-caused before the ledger re-base, the ledger
  verified 0 mismatches, census MATCH after.
- **WP-6** — the full gate re-verification on the final tree (the
  counts flat: 369/369 · 72/72 · census MATCH · audit zero —
  procedure-side changes only, but the gate re-runs green regardless).
- **WP-7** — the scratch cleanup (`scratch-decode-kpis.mjs` deleted;
  zero residue) + the local commit + the SSH-wrapper push (main only,
  the runbook procedure, the key shredded after).

## Lesson 45 candidate (the round's class)

The parity probes are themselves distributed systems: a first-flight
PROBE-ERROR on a family the decode just settled is INFRASTRUCTURE
until reproduced — the post-login cookie-commit race (the session
cookie not yet committed to the jar when the next document navigation
fires) presents exactly as an auth-wall redirect, the class a naive
operator would "cure" by touching the auth ladder. The doctrine:
reproduce before curing (the Appendix-B rule in the parity-probe
domain) — re-run the script, cross-check the seam outside the browser
(curl + the cookie), and only then classify. A transient that cannot
be reproduced is logged (F-4), never patched.

## Suggested next (WH-42)

(a) the standing battery at full width (watch round 31 + the SEVEN
  parity scripts — eight reference logins/round total; watch the
  login rate-limit budget: 10/15min — the eight legs fit, a ninth
  does not);
(b) the cooling policy still needs two-plus consecutive stable reads —
  rounds 27+28+29+30 each moved an axis;
(c) the EIGHTH surface candidates: the Profile appearance panels (the
  tablist + preset cards — partly data-dependent, the lesson-41
  class), the empty states (data-dependent on the demo accounts'
  shared zero state), or the Routines template-card family (the
  `ROUTINE_VIDEO_CARD` record — data-independent, the seeded-content
  watch already byte-pins the 11 template names);
(d) the standing blocks recheck.

---

## Execution record (WH-41, 2026-11-01)

Executed as written, all work packages landed — with the round's one
deviation escalating beyond the plan's F-1 forecast (the watch's
intra-round moves):

- **WP-0** ✓ — the plan validated against the tree (the decode anchors
  vs `MODULE_KPI` + `PAGE_KPI_GRIDS` + `STAT_CARD` + the five consumer
  pages' KPI sections + the WH-23 card-geometry census; the ledger's
  re-base site; the docs-counts CANONICAL — NO flips, the count ladder
  FLAT).
- **WP-1 (F-2)** ✓ — `scripts/parity-kpis.mjs` written (315 members:
  10 landscape + 5×4 grid/count + 15 tiles × 19; the plan's "~315"
  estimate exact; the gradient stop-triples + the shadow real-layers
  normalizations; the 48×48 SVG anchor). Zero probe bugs at birth —
  the decode pre-verified every anchor. **Born-verified 315/315 MATCH
  on the first flight + stable on the second and third consecutive
  flights** (the third flight taken on the round's final asset state
  after the revert).
- **WP-2 (F-1)** ✓ — the ledger re-based, with the round's deviation
  ESCALATED: the plan forecast a double-axis re-base; the round
  delivered an INTRA-ROUND TRIPLE js move + a REVERT (the eleventh
  bundle on the first run, the twelfth firing during the first re-base's
  born-verification, the thirteenth firing during the second — **its
  digest fired the battery's FIRST 1-DRIFT read** — and the platform
  then REVERTING to the twelfth within minutes, the standing face
  reading 15/15 clean). Re-based once to the round's FINAL read (the
  reverted twelfth `/static/index-6yfO0HkE.js`), born-verified on the
  quiet state (`assets stable` + 15/15).
- **WP-3 (F-3)** ✓ — the neo-crm sibling at **v1.204.0** (UNCHANGED
  from the WH-39/40 record, informational).
- **WP-4** ✓ — PAD §11 (the watch row's round-30 record + the F-2
  seventh-surface row + the F-4 transient-probe row + the transient-
  thirteenth row), AGENTS (round 30 + the SEVEN-script battery),
  SKILL v1.38.0 → v1.39.0 (the parity row widened to seven surfaces +
  LESSON 45 + the version), README/CLAUDE verified unchanged
  (lockstep — the docs-counts pin GREEN 10/10), worklog, this record,
  docs/session_79.md.
- **WP-5** ✓ — the TWELFTH cross-round byte comparison: **31/34
  byte-stable, THREE movers root-caused as the sub-visible class
  before the re-base** (29-quick-actions-hover: 5px/0.0004%/maxdelta
  1, the IDENTICAL standing signature; 25-dark-login-focus:
  77px/0.0067%/maxdelta 5, the WH-40 signature verbatim — every diff
  pixel a ±1..5/255 neutral-gray shift; 10-learning: 16px/0.0014%/
  maxdelta 7 in a 26×23px header-band region, the family's NEW member
  — the structural check reading identical region averages and ±1
  non-white-pixel geometry). All 34 health-checked; the ledger
  re-based, verified 0 mismatches; census MATCH after.
- **WP-6** ✓ — the full gate GREEN on the final tree (below).
- **WP-7** ✓ — the scratch probe deleted (scratch-decode-kpis.mjs;
  zero residue); the commit + the SSH-wrapper push.

**The full gate GREEN**: lint 0/0 · tsc 0 · unit **369/369 (26
suites)** · build OK · smoke **14/14** · e2e **72/72** · census MATCH
(moods=1) · `bun audit` zero — the count ladder FLAT (the procedure-side
precedent), the lockstep pin GREEN.

**The round's deviations from the plan**: (1) the watch's intra-round
triple move + revert (the plan forecast one double-axis re-base; the
doctrine's own rule — re-base once, to the round's final read — held
through two extra firings); (2) the transient thirteenth bundle's
1-DRIFT digest (unforecast — handled as the round's F-finding: the
drift was real but the reference's own rollback removed it; the
lesson-45 sibling logged: capture the FULL watch output every run).
