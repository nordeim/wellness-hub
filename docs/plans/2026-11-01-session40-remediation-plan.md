# WH-40 Remediation Plan — the sixth parity surface round (session 40)

Date: 2026-11-01 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set).

## Round inputs (validated live before this plan)

- Baseline pulled to `cf79124` (WH-39 shipped at `6d7b397` + pushed; the
  operator's `session_76` log push came in on the pull). The baseline gate
  re-run live: **lint 0/0 · tsc 0 · unit 369/369 (26 suites) · build OK ·
  smoke 14/14 · e2e 72/72 · census MATCH (moods=1) · `bun audit` zero** —
  the documented WH-39 ship state, reproduced.
- **Watch round 29: a genuine js MOVED** — PASS 1 fired MOVED on the js
  axis only: `/static/index-NVr-T2eL.js` → `/static/index-BzrvnYzb.js`
  (the NINTH distinct bundle; the CSS content hash STABLE at
  `/static/index-CMHVFeas.css` since round 28). The same-run PASS-2
  digest read **15/15 MATCH on the new bundle** — the walk the MOVED
  signal demands was already done by the companion in the same run.
- **The standing battery at FULL WIDTH — all six legs, all quiet on the
  new build** (the WH-39 plan's suggested-next (a), executed): parity-login
  **34/34** (fifth consecutive), parity-moodform **20/20** (sixth),
  parity-shell **61/61** (fourth — the instruction's mobile-menu emphasis,
  the drawer battery green again), parity-dashboard **105/105** (fourth),
  parity-headers **192/192** (third) — 412 computed members live-vs-live,
  zero manual evals. The rendered face held through the ninth js bundle.
- The standing blocks: the `.env`/db contract verified (census reads
  `<repo>/db/custom.db`), `.env.example` tracked and accurate, the
  vitest/playwright configs verified (369 unit / 72 e2e), the
  sitemap/robots route handlers verified (the smoke's ok-12 leg: sitemap +
  robots + manifest all 200), the Tailwind v4 pins standing in
  `globals.css`, the mobile drawer battery green (the watch's PASS-2
  surface + the e2e mobile-navigation/a11y specs inside the 72/72).

## Findings

- **F-1 [LOW, procedure]** — the watch ledger needs the round-29 re-base
  (the js axis only: `jsPath` → `/static/index-BzrvnYzb.js`; `cssPath`
  unchanged), born-verified on BOTH outcomes per the WH-34 doctrine (the
  firing state exercised by round 29's first run; the quiet state by the
  post-edit re-run). The single-axis move is the round-24/26 class — NOT
  a stable read; the cooling policy stays unborn (two-plus consecutive
  stable reads remain the threshold; round 29 broke round-28's streak
  before it started).
- **F-2 [MEDIUM, the round's core]** — **the parity net's SIXTH SURFACE:
  `scripts/parity-toolbars.mjs`** — the module toolbar family (the
  `TOOLBAR` record's two consumer pages — StudyResources + Learning —
  plus the landscape's eight absence pages). The WH-39 plan's (c)
  candidate chosen for its data independence (the Profile panels are
  UserPrefs-state-dependent, the lesson-41 class; the empty states are
  data-dependent on the demo accounts' shared zero state). DECODED LIVE
  FIRST (the doctrine, both apps, one login per side): **the landscape is
  a parity fact** — exactly 2 of the 10 non-dashboard pages render a
  search/filter toolbar row on BOTH apps (StudyResources: search + 2
  fixed-w-40 triggers; Learning: search + 1 fixed-w-48 trigger; the
  other 8 render none on both) — the WH-39 plan's own "10 pages"
  candidate description was a hypothesis the decode corrected (the
  lesson-41 premise class in miniature: a plan's candidate scope is a
  live fact, settled by the probe). Every scalar member is either
  byte-identical (the input's placeholder/h/pl/pr/border/r/fs/bg/color,
  the icons' w/h/color, the container's display/dir/gaps, the selects
  wrapper, the triggers' text/w/h/border/r/fs/fw/pl/pr/bg/color) or a
  member of exactly TWO known classes:
  1. the lesson-40 shadow var-chain zero-layers class (the input + every
     trigger: our build-time v4 emits the four `rgba(0,0,0,0) 0px 0px 0px
     0px` zero-layers before the real `rgba(0,0,0,0.05) 0px 1px 2px 0px`
     pair; the reference's CDN emits the real pair alone) — the
     parity-dashboard real-layers normalization, verbatim;
  2. **the transform-vs-translate INTER-PROPERTY class — the lesson-40/43
     geometry family's newest member**: the search icon's centering
     (`-translate-y-1/2`) computes as `transform: matrix(1, 0, 0, 1, 0,
     -10)` on the reference's CDN build vs our v4's SEPARATE-PROPERTY
     `translate: 0px -50%` (our computed `transform` reads `none` — a
     naive diff would read "ours has no transform at all", and a naive
     cure would ADD one). The rendered fact verified live on both apps:
     iconRect.top − wrapRect.top = **8px** and iconLeft = **12px** on
     both — the member is the bounding-box position, never either
     property's serialization.
  **NO real drift anywhere in the family** — the lesson-42 born-quiet
  prediction (the family was probed at WH-24 and pinned by the census;
  the decode found only serialization classes).
- **F-3 [LOW, positive]** — the standing blocks hold (the battery above,
  the drawer battery, the v4 pins, census, audit, the smoke's SEO legs);
  the neo-crm sibling recheck rides WP-3 (network).

## Work packages

- **WP-0** — this plan, validated against the tree: the decode's anchors
  vs our source (`TOOLBAR` in `src/lib/page-layout.ts`, the two consumer
  pages' forms, the WH-24 toolbar census in `tests/src-census.test.ts`),
  the ledger's current form (the re-base site), the docs-counts CANONICAL
  (NO flips this round — the parity script is a script, not a unit test;
  unit stays 369/26 suites, e2e stays 72 — the WH-36/38/39 flat-ladder
  precedent).
- **WP-1 (F-2)** — write `scripts/parity-toolbars.mjs`: PASS A the
  reference (ONE login → the 10 pages at 1280×900 → the member read),
  PASS B our dev server (ONE login → the same read), the
  member-by-member live-vs-live diff, exit 1 on any DRIFT/PROBE-ERROR.
  ~99 members: the landscape (10 pages — 2 toolbars + 8 absence pins) +
  StudyResources (the input 9 + the shadow real-layers member + the icon
  5 [w/h/color/left + the rendered top] + the container 5 + the selects
  wrapper 2 + the Filter icon 3 + the trigger count 1 + 2 triggers × 13
  scalars) + Learning (the same set, 1 trigger). ZERO-WRITE on both apps
  (login + read only). **Born-verify: the first flight must read
  all-MATCH, exit 0** (the decode pre-verified every member). Probe-bug
  loop if any member mis-anchors: fix the member, not the app.
- **WP-2 (F-1)** — the watch ledger re-base (the js axis) + the
  born-verification re-run (the quiet state: `assets stable` + 15/15).
- **WP-3 (F-3)** — the neo-crm sibling recheck (the live repo's SKILL
  version vs the vendored record).
- **WP-4** — the docs ladder: PAD §11 (the watch row's round-29 record +
  the F-2 sixth-surface row; §8.1 unchanged), AGENTS (the watch note:
  round 29 + the SIX-script standing battery + the sixth surface named),
  SKILL v1.37.0 → **v1.38.0** (the quick-reference parity row widened to
  six surfaces + **LESSON 44** + the version + the counts verified),
  README/CLAUDE counts verified unchanged (the lockstep pin), the worklog
  WH-40 entry, this plan's execution record, `docs/session_77.md`.
- **WP-5** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the ELEVENTH cross-round byte comparison,
  every mover root-caused before the ledger re-base, the ledger verified
  0 mismatches, census MATCH after.
- **WP-6** — the full gate re-verification on the final tree (the counts
  flat: 369/369 · 72/72 · census MATCH · audit zero — procedure-side
  changes only, but the gate re-runs green regardless).
- **WP-7** — the scratch cleanup (`scratch-decode-toolbars.mjs`,
  `scratch-icon-rect.mjs` deleted; zero residue) + the local commit + the
  SSH-wrapper push (main only, the runbook procedure, the key shredded
  after).

## Lesson 44 candidate (the round's class)

The lesson-40 family's newest member is an INTER-PROPERTY split: the
same rendered fact — an icon centered by `translateY(-50%)` — is
serialized by the reference's CDN runtime compiler into the composed
`transform: matrix(1, 0, 0, 1, 0, -10)` and by our build-time Tailwind
v4 into the SEPARATE `translate: 0px -50%` property (our computed
`transform` reads `none`). Two cures live in the family's doctrine: the
member is the bounding-box rendered position (the rect, verified 8px/12px
on both apps), never either property's string — and a computed
`transform: none` is NOT the absence of translation (a naive diff would
"fix" a working icon). The round also carries the landscape lesson: the
surface's SCOPE is itself a decode-settled fact (the WH-39 plan said
"10 pages"; the live enumeration reads 2 toolbar pages + 8 absence
pages — the absence pins are members of the same class, catching a
toolbar appearing or disappearing on either app).

## Suggested next (WH-41)

(a) the standing battery at full width (watch round 30 + the SIX parity
  scripts — seven reference logins/round total; watch the login
  rate-limit budget: 10/15min — the seven legs fit, an eighth does not);
(b) the cooling policy still needs two-plus consecutive stable reads —
  rounds 27 + 28 + 29 each moved an axis;
(c) the SEVENTH surface candidates: the Profile appearance panels (the
  tablist + the preset cards — partly data-dependent, the lesson-41
  class), the empty states (data-dependent on the demo accounts' shared
  zero state), or the module KPI rows (the `MODULE_KPI` record family,
  data-independent, the non-dashboard pages' stat rows);
(d) the standing blocks recheck.

---

## Execution record (WH-40, 2026-11-01)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree (the decode anchors
  vs `TOOLBAR` + the two consumer pages' forms + the WH-24 toolbar
  census; the ledger's re-base site; the docs-counts CANONICAL — NO
  flips, the count ladder FLAT).
- **WP-1 (F-2)** ✓ — `scripts/parity-toolbars.mjs` written (98 members:
  10 landscape + 51 studyResources + 37 learning — the plan's "~99"
  estimate corrected to the actual 98 when the member set finalized;
  the real-layers shadow normalization; the rendered-pos pair for the
  icon). Zero probe bugs at birth — the decode pre-verified every
  anchor. **Born-verified 98/98 MATCH on the first flight + stable on
  the second consecutive flight.**
- **WP-2 (F-1)** ✓ — the ledger re-based on the js axis, with the
  round's one deviation: the reference moved TWICE in the round (the
  ninth bundle `/static/index-BzrvnYzb.js` mid-round — the re-base edit
  landed on it and the born-verification re-run fired MOVED AGAIN on
  the TENTH `/static/index-DA6CuPbY.js`); re-based once to the round's
  FINAL read, born-verified on the quiet state (`assets stable` +
  15/15). Both same-run digests had read **15/15 MATCH** on their new
  bundles.
- **WP-3 (F-3)** ✓ — the neo-crm sibling at **v1.204.0** (UNCHANGED
  from the WH-39 record, informational).
- **WP-4** ✓ — PAD §11 (the watch row's round-29 record + the F-2
  sixth-surface row), AGENTS (round 29 + the SIX-script battery),
  SKILL v1.37.0 → v1.38.0 (the parity row widened to six surfaces +
  LESSON 44 + the version), README/CLAUDE verified unchanged
  (lockstep), worklog, this record, docs/session_77.md.
- **WP-5** ✓ — the ELEVENTH cross-round byte comparison: **32/34
  byte-stable, TWO movers root-caused as the sub-visible class**
  (29-quick-actions-hover: 5px/0.0004%/maxdelta 1, the IDENTICAL
  standing-precedent signature; 25-dark-login-focus: 77px/0.0067%/
  maxdelta 5, the same rasterization-phase family's first appearance —
  every diff pixel a ±1..5/255 neutral-edge-gray shift inside the
  input band, no hue/geometry change). All 34 health-checked; the
  ledger re-based, verified 0 mismatches; census MATCH after.
- **WP-6** ✓ — the full gate GREEN on the final tree (below).
- **WP-7** ✓ — the scratch probes deleted (scratch-decode-toolbars.mjs
  + scratch-icon-rect.mjs; zero residue); the commit + the SSH-wrapper
  push.

**The full gate GREEN**: lint 0/0 · tsc 0 · unit **369/369 (26
suites)** · build OK · smoke **14/14** · e2e **72/72** · census MATCH
(moods=1) · `bun audit` zero — the count ladder FLAT (the procedure-side
precedent), the lockstep pin GREEN.

**The round's one deviation from the plan**: the intra-round double js
move (the plan was written against the ninth bundle; the tenth landed
before the re-base) — handled by the doctrine's own rule (re-base once,
to the round's final read, born-verify the quiet state after).
