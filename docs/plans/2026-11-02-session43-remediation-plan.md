# WH-43 Remediation Plan — the ninth parity surface round (session 43)

Date: 2026-11-02 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round).

## Round inputs (validated live before this plan)

- Fresh clone to `954a42d` (main, clean; the operator's session_82 log push
  on top of the WH-42 ship `0a277e5`). The environment rebuilt (bun 1.3.14 ·
  chromium 1248 reinstalled — the sandbox cache carried 1200 only, the known
  first-run gap · a fresh 64-hex AUTH_SECRET · db:push + db:seed · census
  MATCH: 15/24/10/23/12 + moods=1). **The baseline gate re-run live, ALL
  GREEN at the exact WH-42 ship state: lint 0/0 · tsc 0 · unit 371/371
  (26 suites) · build OK · smoke 14/14 · e2e 72/72 (the mobile-nav battery
  re-run explicitly too — the instruction's emphasis: 8/8) · census MATCH ·
  `bun audit` zero.**
- **Watch round 32: the DOUBLE-AXIS move AGAIN** — the FIFTH css CONTENT
  change (`/static/index-DsYCKxwV.css` → `/static/index-CapATpwD.css`) AND
  the SIXTEENTH distinct js bundle (`/static/index-qi2AnSYN.js` →
  `/static/index-a8mtclnh.js`). The same-run digest read **15/15 MATCH on
  the new assets** (the full output captured unfiltered). Rounds 28-32 each
  moved at least one axis — the active-development cadence is the standing
  state; the cooling policy stays unborn.
- **The standing battery's FIFTH full-width run — all EIGHT legs green on
  the new assets**: parity-login **34/34** (the zero-login leg) ·
  parity-moodform **20/20** (after ONE transient first-flight PASS-A
  timeout — the page.goto /MentalHealth 30s class, closed by the immediate
  re-run 20/20, no app change: LESSON 45 verbatim) · parity-shell **61/61**
  (the drawer battery — the instruction's mobile-menu emphasis) ·
  parity-dashboard **105/105** · parity-headers **192/192** ·
  parity-toolbars **98/98** · parity-kpis **315/315** · parity-routines
  **697/697** (the net's widest) — **1,522 computed members live-vs-live,
  zero manual evals**. The rendered face byte-held through the double-axis
  move.
- The standing blocks verified on the tree: the `.env`/db contract
  (`DATABASE_URL="file:../db/custom.db"` → `<repo>/db/custom.db`, the
  census reads it), `.env.example` tracked and accurate (bidirectional),
  the vitest/playwright configs (371 unit / 72 e2e), the sitemap/robots/
  manifest route handlers (the smoke's ok-12 leg all 200), the Tailwind v4
  pins standing in `globals.css` (`@custom-variant hover` +
  `@custom-variant dark` + `--shadow-sm` + `--blur-sm` + the three
  `@source not`), the mobile drawer battery green inside the 72/72 AND
  re-run explicitly.
- The neo-crm sibling rechecked: **v1.204.0**, unchanged from the WH-42
  record (informational).

## Findings

- **F-1 [MEDIUM, the round's core DATA finding — a REAL drift, the WH-42
  lesson-41 class AGAIN]** — **the tutorial GRID ORDER drifts**: the
  reference re-ordered its twelve seeded tutorials. Decode-settled live on
  BOTH apps (two consecutive same-round reads identical):
  - reference (by our seed keys): [tiny_habits, self_compassion,
    2_minute_rule, morning_routines, decision_fatigue, science_of_motivation,
    meal_prep, better_habits, yoga_flow, mindfulness, time_management,
    study_techniques]
  - ours (the frozen seed order): [2_minute_rule, morning_routines,
    tiny_habits, science_of_motivation, self_compassion, decision_fatigue,
    meal_prep, better_habits, mindfulness, study_techniques, yoga_flow,
    time_management]
  - the SET is identical (all twelve titles; the per-title DATA —
    descriptions, durations, categories, difficulties, thumbnails —
    byte-equal, verified: ref card 1 "The Power of Tiny Habits" carries
    duration 16:30 + thumbnail photo-1434030216411-0b793f4b4173, both equal
    to our seed's tiny_habits row); positions 7-8 (meal_prep, better_habits)
    already align; the head (1-6) and the tail (9-12) reshuffle. The ORDER
    is part of the rendered face (the user sees the cards in sequence) —
    the exact class the WH-42 round cured for the ROUTINE_TEMPLATES grid:
    the watch byte-pins the tutorial COUNTS (12 imgs / 12 Watch Now), the
    seeded-content watch byte-pins the 12 TITLES as a SET, and the e2e
    finds tutorials by text — the ORDER rode invisible.
  - **The cure**: re-order `prisma/seed.ts`'s `TUTORIALS` array to the
    reference's live order (the `sortOrder` fields renumbered with the
    array — the API orders by sortOrder asc; verified in the tutorials
    route). TDD: the RED unit pin FIRST (the seed-parity suite's fs-read
    pattern extended — the tutorials order contract), then the seed edit,
    then GREEN, then reseed + census MATCH (tutorials=12 unchanged).
  - The e2e learning leg is text-based (getByText/getByLabel, zero
    positional pickers — verified) — the order cure cannot break it.

- **F-2 [MEDIUM, the round's core — the parity net's NINTH SURFACE]**
  — **`scripts/parity-tutorials.mjs`** — the Learning tutorial-card family
  (the `TUTORIAL_CARD` record + the OptionChip pair), the WH-42 plan's
  suggested-next (c) candidate, DECODED LIVE FIRST (the doctrine, both
  apps, one login per side, zero-write; the decode needed three vocabulary
  fixes — see F-5). The decode settled:
  - the landscape: the `grid md:grid-cols-2 lg:grid-cols-3 gap-6` grid
    (3×304px @ 24px gaps at 1280, both apps byte-equal), twelve cards on
    both, the search input ("Search tutorials..." placeholder on both).
  - per card, every member byte-identical or a known class: the card chrome
    (radius 12px, borderW 0px, bg white, `overflow-hidden` flex column),
    the cover (aspect-video, the gray-100→gray-200 wash), the img
    (object-cover, the group-hover scale family), the overlay
    (absolute inset-0, the RESTING transparent black), the Watch Now button
    (36px, radius 6px, white bg, gray-900 text, opacity-0 resting), the
    duration chip (absolute bottom-2 right-2, bg-black/70, white 12px,
    px-2 py-1, radius 4px), the title (bare DIV, 18px/600/-0.45px,
    line-clamp-2), the chip pair (the category solid `rounded-md border
    px-2.5 py-0.5 text-xs font-semibold` + the difficulty outline twin),
    the description (14px gray-600 line-clamp-3) + the DATA texts as-is.
  - **exactly THREE serialization classes** (all known): (1) the lesson-40
    gradient stop-triples (the cover wash), (2) the lesson-40 shadow
    real-layers (the card shadow-lg), (3) the WH-42 alpha-black oklab form
    (the overlay's `bg-black/0` AND the duration chip's `bg-black/70`).
  - **DOM-shape differences with ZERO rendered-face consequence** (decoded,
    documented, not cured — the lesson-27 class): the reference's duration
    chip is a DIV where ours is a SPAN (same computed face); the reference
    renders `border bg-card text-card-foreground border-none` on the card
    root where ours reads `border-none bg-surface` (same computed values);
    the reference's search input is `type="text"` where ours is
    `type="search"` — see F-4 (the one candidate with a POSSIBLE rendered
    consequence: the Chromium clear button).

- **F-3 [LOW, procedure]** — the watch ledger re-based on BOTH axes (round
  32's double move: the FIFTH css content change + the SIXTEENTH bundle),
  the born-verification re-run paced for the login budget (the WH-34
  doctrine: the re-run after the edit reads "assets stable" + 15/15).

- **F-4 [LOW, to settle in the decode's consolidated flight]** — the search
  input TYPE split: ours `type="search"` (learning + studyresources — the
  only two sites), the reference's `/Learning` input `type="text"`
  (verified). The QUESTION: does Chromium render a clear (✕) button on
  focused+contented type=search inputs that type=text lacks — a REAL
  interaction-state difference (the WH-20 class) — or is it sub-visible?
  The consolidated flight probes `::-webkit-search-cancel-button` computed
  styles on both apps + reads the reference's studyresources input type.
  If REAL → the cure is the two-line `type="text"` switch (the e2e's
  getByLabel anchor is unaffected); if sub-visible → document as the
  DOM-shape class.

- **F-5 [LOW, the round's probe lesson — LESSON 47 candidate]** — the
  decode's own decoder needed THREE vocabulary fixes before it read the
  reference at all, each the same genus: **a decoder's selector vocabulary
  must match the reference's DOM vocabulary**:
  (a) the aria-label superset — our Watch Now buttons carry
  `aria-label="Watch Now: <title>"` (the a11y superset); the reference's
  carry NO aria-label — an aria-label-keyed anchor reads zero cards on the
  reference (anchor by text content);
  (b) the element-tag vocabulary — the reference's duration chip and chips
  are DIVs where ours are SPAN/DIV — a tag-keyed querySelector misses;
  (c) the CSS BLOCKIFICATION rule — `inline-flex` chips inside the flex
  chips-row compute `display: flex` (flex items are blockified), so a
  display-keyed filter NEVER matches on either app — anchor STRUCTURALLY
  (the title row's next sibling's children), never by computed display.
  Plus the budget pacing amendment: the decode's DEBUG flights spend the
  SAME reference-login budget as the battery (the round tripped the
  reference limiter once and OUR dev limiter once — lesson 46 on both
  sides of the pair); pace the debug flights ≥10 min apart or batch them
  into one consolidated probe.

- **F-6 [LOW, positive]** — the standing blocks hold (the battery above,
  the drawer battery ×2, the v4 pins, census, audit, the smoke's SEO
  legs); the neo-crm sibling unchanged at v1.204.0.

## Work packages

- **WP-0** — this plan, validated against the tree: the seed's TUTORIALS
  `sortOrder` scheme (0-11, array order) + the tutorials route's
  `orderBy: [{ sortOrder: "asc" }]` (verified), the e2e learning leg
  (text-based, order-independent — verified), the docs-counts CANONICAL
  (unitSuites 26 / unitChecks 371 — the F-1 pin EXTENDS
  `tests/seed-parity.test.ts`, flipping ONLY unitChecks 371→372; every doc
  site updates in the SAME commit per the count-ladder rule), the watch
  ledger re-base sites (both axes), the capture-round ledger (the Learning
  captures will move — the order cure is a deliberate our-side face
  change, root-caused at WP-6).
- **WP-1 (F-1)** — the TDD order cure: RED (the tutorials order `it` in
  `tests/seed-parity.test.ts` — the fs-read pattern, asserting the
  sortOrder-sorted key sequence equals the decoded reference order) → run
  FAIL → the seed reorder (the array re-sequenced + sortOrder renumbered)
  → run PASS → `bun run db:push && bun run db:seed` → census MATCH
  (tutorials=12 unchanged).
- **WP-2 (F-2 + F-4)** — the consolidated reference flight (ONE reference
  login, batched per F-5): the full tutorial-card member read with the
  FIXED decoder (structural chips anchor + the duration-chip finder + the
  input type + the cancel-button probe) + the reference's studyresources
  input type. Then write `scripts/parity-tutorials.mjs` (modeled on the
  kpis/routines precedents): PASS A the reference (ONE login → /Learning
  at 1280×900 → the member read), PASS B our dev server (ONE login → the
  same read), the member-by-member live-vs-live diff, exit 1 on any
  DRIFT/PROBE-ERROR. ~600 members: the landscape (grid 4 + counts 2 +
  search 2) + per card ~47 (the card 6 + cover 5 + img 4 + overlay 5 +
  btn 9 + dur 8 + title 7 + chips 2×7 + desc 4 + the DATA texts 3). The
  THREE normalizers (realLayers + gradientStops verbatim + alphaBlack).
  ZERO-WRITE on both apps. **Born-verify: the first flight must read
  all-MATCH, exit 0** (the decode pre-verified every member on the cured
  order); then two more consecutive flights for stability (the kpis ×3
  precedent).
- **WP-3 (F-3)** — the watch ledger re-base on both axes + the
  born-verification re-run on the quiet state (`assets stable` + 15/15).
- **WP-4 (F-4)** — the search-input type decision, decode-settled: if the
  cancel button renders on ours and not the reference → the type="text"
  cure at the two sites + the src-census pin (no `type="search"` in src/);
  if sub-visible → the PAD's DOM-shape ledger row (documented, not cured).
- **WP-5 (F-6)** — the docs ladder: PAD §11 (the F-1 order-drift row + the
  F-2 ninth-surface row + the watch round-32 record + the F-5 lesson-47
  row) + §8.1 (the seed-parity row 4→5 checks + the totals 371→372),
  AGENTS (round 32 + the NINE-script standing battery + the unit-count
  sites), SKILL v1.40.0 → **v1.41.0** (the parity row widened to NINE
  surfaces + **LESSON 47** + the version + the counts), README/CLAUDE
  counts (the lockstep pin), the worklog WH-43 entry, this plan's
  execution record, `docs/session_83.md`.
- **WP-6** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the FOURTEENTH cross-round byte comparison —
  the Learning captures expected to move (the order cure, the deliberate
  our-side change: root-caused as such, never a silent re-base), every
  other mover root-caused before the ledger re-base, the ledger verified 0
  mismatches, census MATCH after. Then the FULL GATE re-run on the final
  tree (the count ladder moves: unit 372/372; e2e 72/72 flat;
  build/smoke/lint/tsc green).
- **WP-7** — the scratch cleanup (`scratch-decode-tutorials.mjs`,
  `scratch-debug-chain.mjs`, `scratch-verify-interior.mjs`,
  `scratch-chips-check.mjs`, `scratch-dom-debug.mjs` deleted; zero
  residue) + the local commit + the SSH-wrapper push (main only, the
  runbook procedure, the key shredded after).

## Lesson 47 candidate (the round's class)

A parity decoder's SELECTOR VOCABULARY is itself a surface: our own a11y
supersets (aria-labels), the reference's element-tag choices (DIV vs SPAN),
and CSS blockification (inline-flex chips inside flex containers compute
display:flex — a display-keyed filter matches NOTHING on either app) all
hide behind identical rendered faces. Anchor STRUCTURALLY (the element's
position in the tree relative to a stable landmark), never by attribute
presence or computed display; and treat the decode's DEBUG flights as
budget spenders — the same reference login window the battery drains (the
round tripped BOTH limiters: the reference's once, our dev server's once —
lesson 46 applies symmetrically; batch the debug questions into one
consolidated flight, pace the flights ≥10 min apart).

## Suggested next (WH-44)

(a) the standing battery at full width (watch round 33 + the NINE parity
  scripts — ten reference logins/round is OVER the budget; the pacing
  amendment: split the battery across two login windows or accept the
  transient re-run cost);
(b) the cooling policy still needs two-plus consecutive stable reads —
  rounds 28-32 each moved an axis;
(c) the TENTH surface candidates: the Profile appearance panels (the
  tablist + preset cards — partly data-dependent), the empty states
  (data-dependent), the goals achievements tiles (data-dependent on the
  demo's zero state), the events calendar family (data-dependent);
(d) the standing blocks recheck + the tutorial-order watch (the ORDER
  member joins the standing battery at WP-2 — the next reference
  re-order fires the surface's ORDER line same-round).

---

## Execution record (WH-43, 2026-11-02)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree (the TUTORIALS
  sortOrder scheme + the route's orderBy + the text-based e2e leg +
  the docs-counts CANONICAL + the ledger re-base sites).
- **WP-1 (F-1)** ✓ — the TDD order cure: the tutorial grid-order
  contract RED (the sortOrder-sorted key sequence vs the decoded
  reference order), the `TUTORIALS` array re-sequenced (a surgical
  reorder script — whose first form anchored on the TYPE ANNOTATION's
  `[` and mangled the array; caught by the seed run's syntax error,
  restored + re-run with the `= [` anchor), sortOrder renumbered,
  GREEN, reseed, census MATCH (tutorials=12 unchanged).
- **WP-2 (F-2 + F-4)** ✓ — the consolidated reference flight read the
  full member set (the fixed decoder) + the sr input type + the
  cancel-button probe; the F-4 verdict: REAL (the Chromium clear
  button on type=search — the interaction-state class) → cured at both
  sites TDD-style (the search-input census RED → the type="text" flip
  → GREEN). `scripts/parity-tutorials.mjs` written (**790 members** —
  the net's NEW widest surface: the landscape incl. the ORDER member +
  the sr fact + per card ~64; the three normalizers). **Born-verified
  790/790 on the cured tree + stable on two more consecutive flights +
  one final flight on the round's final asset state (the seventeenth
  bundle).**
- **WP-3 (F-3)** ✓ — the watch ledger re-based on both axes, with the
  round's escalation: the SEVENTEENTH bundle fired during the first
  re-base's own born-verification (the intra-round class, the FIFTH
  consecutive round); re-based once to the round's final read,
  born-verified on the quiet state (`assets stable` + 15/15).
- **WP-4 (F-4)** ✓ — decode-settled REAL, cured (above).
- **WP-5 (F-6)** ✓ — PAD §11 (the watch row's round-32 record + the
  F-1/F-2/F-4/F-5 rows) + §8.1 (the seed-parity row 4→5 + the infra
  row 165→166 + the totals), AGENTS (round 32 + the NINE-script
  battery), SKILL v1.40.0 → v1.41.0 (the parity row widened to NINE
  surfaces + LESSON 47), README/CLAUDE counts, worklog, this record,
  docs/session_83.md. The count ladder moved 371 → **373** (the
  seed-parity tutorial order contract + the src-census search-input
  census — the suite count FLAT at 26); the intra-round self-catch:
  the first lockstep pass wrote 372 before the src-census pin landed —
  the re-run's 373 caught it and every site was re-fixed in the same
  commit.
- **WP-6** ✓ — the capture round + the full gate on the final tree
  (below).
- **WP-7** ✓ — the scratch probes deleted (scratch-decode-tutorials,
  scratch-debug-chain, scratch-verify-interior, scratch-chips-check,
  scratch-dom-debug, scratch-cancel-button; zero residue) + the local
  commit + the SSH-wrapper push.

**The round's deviations from the plan**: (1) the F-1 reorder script's
first form anchored on the type annotation's bracket — caught by the
seed run's own syntax error, restored from git, re-run with the
correct `= [` anchor (no residue); (2) the count ladder's two-step
(371 → 372 → 373) — the plan forecast only the seed-parity contract;
the src-census search-input census (the F-4 cure's pin) moved the
total a second time, and the first lockstep pass raced it — caught by
the re-run and re-fixed; (3) the watch's intra-round seventeenth
bundle (the plan forecast the re-base; the WH-40/41/42 intra-round
class held for the fifth consecutive round — re-based once to the
final read per the doctrine).
