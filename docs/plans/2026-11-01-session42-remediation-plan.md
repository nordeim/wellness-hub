# WH-42 Remediation Plan — the eighth parity surface round (session 42)

Date: 2026-11-01 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set).

## Round inputs (validated live before this plan)

- Fresh clone to `ce660e8` (WH-41 shipped at `5e981a5` + pushed; the
  operator's `session_80` log push came in on the clone). The environment
  rebuilt (bun 1.3.14 · chromium 1248 · a fresh 64-hex AUTH_SECRET ·
  db:push + db:seed · census MATCH: 15/24/10/23/12 + moods=1). The
  baseline gate re-run live, ALL GREEN at the exact WH-41 ship state:
  **lint 0/0 · tsc 0 · unit 369/369 (26 suites) · build OK · smoke 14/14
  · e2e 72/72 · census MATCH · `bun audit` zero**.
- **Watch round 31: the DOUBLE-AXIS move AGAIN** — the FOURTH css CONTENT
  change (`/static/index-T8A-IXoy.css` → `/static/index-DsYCKxwV.css`)
  AND the FOURTEENTH distinct js bundle (`/static/index-6yfO0HkE.js` →
  `/static/index-BH_eVSe7.js`). The same-run digest read **15/15 MATCH
  on the new assets** (the full output captured unfiltered — the
  lesson-45 sibling rule). Rounds 28+29+30+31 each moved at least one
  axis: the active-development cadence is the standing state; the
  cooling policy stays unborn.
- **The standing battery's FOURTH full-width run — all seven legs green
  on the new assets**: parity-login **34/34** (seventh consecutive — the
  zero-login leg), parity-moodform **20/20** (eighth — after ONE
  transient first-flight PROBE-ERROR on our side, closed by the doctrine
  as the post-login cookie-commit race class: the immediate re-run 20/20
  + a second re-run 20/20, no app change made — LESSON 45 verbatim),
  parity-shell **61/61** (sixth — the drawer battery, the instruction's
  mobile-menu emphasis), parity-dashboard **105/105** (sixth),
  parity-headers **192/192** (fifth), parity-toolbars **98/98** (third),
  parity-kpis **315/315** (fourth) — **825 computed members
  live-vs-live, zero manual evals**. The rendered face byte-held through
  the double-axis move.
- The standing blocks verified on the tree: the `.env`/db contract
  (`DATABASE_URL="file:../db/custom.db"` → `<repo>/db/custom.db`, the
  census reads it), `.env.example` tracked and accurate, the
  vitest/playwright configs (369 unit / 72 e2e), the sitemap/robots/
  manifest route handlers (the smoke's ok-12 leg all 200), the Tailwind
  v4 pins standing in `globals.css` (`@custom-variant hover` +
  `@custom-variant dark` + `--shadow-sm` + `--blur-sm` + the three
  `@source not`), the mobile drawer battery green inside the 72/72.

## Findings

- **F-1 [MEDIUM, the round's core DATA finding — a REAL drift]** —
  **the routine-template GRID ORDER drifts**: the reference re-ordered
  its eleven seeded templates. Decode-settled live on BOTH apps, two
  consecutive same-round reads identical:
  - reference: [10-Minute Home Workout, 5-Minute Morning Energizer, The
    Pomodoro Power Study Session, Self-Care Sunday Reset, Calm Evening
    Wind-Down, Focused Study Session, Creative Flow Session, Energizing
    Morning Kickstart, Self-Care Sunday, Quick Productivity Reset,
    Peaceful Evening Wind-Down]
  - ours (the WH-24 frozen seed order): [5-Minute Morning Energizer,
    10-Minute Home Workout, Pomodoro, Calm Evening Wind-Down, Self-Care
    Sunday Reset, Creative Flow, Quick Productivity, Energizing Morning,
    Self-Care Sunday, Focused Study, Peaceful Evening]
  - the SET is identical (all eleven names, all content fields — titles,
    descriptions, durations, difficulties, tips, benefits — byte-equal
    per card); only the SEQUENCE differs (positions 1-2 swapped, 4-5
    swapped, and the video block reshuffled: Focused Study 10→6,
    Creative Flow 6→7, Quick Productivity 7→10). The order is part of
    the rendered face (a user sees the cards in sequence); the class is
    the lesson-41 DATA-axis family — the seeded-content watch byte-pins
    the eleven NAMES and the e2e finds templates by text, so the ORDER
    rode invisible through every round since WH-24. The two-clocks gap:
    our seed order was decoded once (WH-24) and never re-diffed.
  - **The cure**: re-order `prisma/seed.ts`'s `ROUTINE_TEMPLATES` array
    to the reference's live order (the `sortOrder` fields renumbered
    with the array — the API orders by `sortOrder` asc, the e2e finders
    are text-based, the census count is unchanged). TDD: the RED unit
    pin FIRST (the seed-parity suite's fs-read pattern extended — the
    order contract), then the seed edit, then GREEN.
- **F-2 [MEDIUM, the round's core — the parity net's EIGHTH SURFACE]**
  — **`scripts/parity-routines.mjs`** — the routines template-card
  family (the `ROUTINE_VIDEO_CARD` record + the seeded-card face + the
  `ROUTINE_CATEGORY_GRADIENTS` map), the WH-41 plan's suggested-next (c)
  candidate, DECODED LIVE FIRST (the doctrine, both apps, one login per
  side, zero-write; the decode ran twice — the second flight after the
  our-side rate-limiter lesson below). The decode settled:
  - the landscape: the `grid md:grid-cols-2 lg:grid-cols-3 gap-6` grid
    (3×304px @ 24px gap at 1280), eleven cards, exactly SIX carrying
    the video zone (160px `overflow-hidden` + `object-cover` img + the
    `rgba(0,0,0,0.4)` overlay @opacity-0 + the 32px/12px white Watch
    Video button + the 16px icon at mr-8px) and FIVE bare — identical
    split on both apps; the Browse Templates h2 (24px/700/gray-900/
    mb-16px) + the 16px gray-600 mb-24px subtitle.
  - per card, every member byte-identical or a known class: the card
    chrome (radius 12px, borderW 0px/style none/color rgb(229,229,229),
    overflow visible — the square-corner strip fact, bg white, flex
    column), the 8px category strip (the gradient pairs), the video
    zone set, the title (a bare DIV at 18px/600/-0.45px), the difficulty
    chip (12px/600, yellow-100 moderate / green-100 easy, transparent
    border, radius 6px), the description (14px gray-600), the meta rows
    (14px gray-600, 16px icons), the Pro Tip tile (amber-50/amber-200/
    radius 8px/p-12px, the 12px amber-800 label), the Benefits family
    (the 12px/600 gray-700 label + the `text-xs text-gray-600` rows
    with the green-500 ✓ spans — the decode's close-up proved both
    apps' rows identical), and the Use This Template button (36px
    full-width, 14px white, the category gradient pair, radius 6px,
    the 16px ArrowRight at ml-8px) + the DATA texts as-is (the
    parity-dashboard doctrine).
  - **exactly THREE serialization classes**: (1) the lesson-40 gradient
    stop-triples (the strip + the button), (2) the lesson-40 shadow
    var-chain zero-layers (the card's shadow-lg + the button's shadow),
    (3) **a NEW third class: the alpha-black oklab form** — our v4
    compiles `bg-black/40` to `oklab(0 0 0 / 0.4)` where the reference's
    CDN emits `rgba(0, 0, 0, 0.4)` (the lesson-40 color class's ALPHA
    form, the WH-39 oklab-alpha-stop sibling on a backgroundColor);
    normalized to the alpha value pair.
  - **two DOM-shape differences with ZERO rendered-face consequence**
    (decoded, documented, not cured — the lesson-27 same-pixels-
    different-trees class): the reference wraps each card in an
    anonymous block div inside the grid (and the grid in another
    anonymous block before the `max-w-7xl` container), and wraps the
    Benefits label + list in a `div.mb-4` where ours puts them in the
    card body directly. The anchor lesson: the card root is the
    12px-radius ancestor of the Use This Template button — never "the
    grid child" (the wrapper defeats it on the reference).
  - **the ORDER member**: the title sequence compared positionally —
    the surface that would have caught F-1 the day the reference moved.
- **F-3 [LOW, procedure]** — the watch ledger re-based on BOTH axes
  (round 31's double move), the born-verification re-run pending (paced
  for the login budget below).
- **F-4 [LOW, the round's probe lesson]** — **the our-side login
  rate-limiter trip**: the decode's second flight read ZERO cards on
  our app — the dev server's own per-IP login limiter (10/15min,
  `src/lib/rate-limit.ts`, per-process) had counted the battery's nine
  local logins + the debug-chain flight + the decode flight = eleven in
  the window; the eleventh answered the login wall. Closed as probe
  infrastructure (the LESSON 45 sibling on OUR side of the pair): the
  fix was the dev-server RESTART (the limiter is per-process — its
  threat model is remote attackers, not local probes), never an app
  change; the immediate re-run read all eleven cards. **LESSON 46
  candidate**: the local probe budget is a budget too — pace the
  battery + the decode flights (or restart the dev server between
  phases); a first-flight zero-card read on a decoded-quiet family is
  infrastructure until reproduced.
- **F-5 [LOW, positive]** — the standing blocks hold (the battery
  above, the drawer battery, the v4 pins, census, audit, the smoke's
  SEO legs); the neo-crm sibling recheck rides WP-4 (network).

## The login-budget ledger (the round's pacing constraint)

The reference rate-limits logins 10/15min per IP; our dev server
likewise (per-process). The round's spend: the reference — watch 1 +
moodform 3 (the transient flight + two closure re-runs) + shell 1 +
dashboard 1 + headers 1 + toolbars 1 + kpis 1 + the debug-chain 1 +
the decode 2 (the first flight's PASS A + the second flight's) ≈ 13,
saved by the sliding window (the flights span >15 min). The remaining
reference logins (the decode's third flight if needed + the
routines-parity born-verification ×3 + the watch born-verification 1)
must be paced across the window — the born-verification flights are
the round's tail; the window will have cleared by then. Our side: the
dev server restart resets the local limiter (F-4's lesson applied).

## Work packages

- **WP-0** — this plan, validated against the tree: the seed's
  `sortOrder` scheme (0-10, array order) + the API's
  `orderBy: [{ sortOrder: "asc" }]`, the e2e finders (text-based,
  order-independent — the sibling leg + the (q) leg verified), the
  docs-counts CANONICAL (unitSuites 26 / unitChecks 369 — the F-1 pin
  EXTENDS `tests/seed-parity.test.ts`, flipping ONLY unitChecks
  369→370; every doc site updates in the SAME commit per the
  count-ladder rule), the ledger re-base sites (both axes, done), the
  capture-round ledger (the routines captures will move — the order
  cure is a deliberate our-side face change, root-caused at WP-6).
- **WP-1 (F-1)** — the TDD order cure: RED (the order `it` in
  `tests/seed-parity.test.ts` — the fs-read pattern, asserting the
  sortOrder-sorted key sequence equals the decoded reference order) →
  run FAIL → the seed reorder (the array re-sequenced + sortOrder
  renumbered) → run PASS → `bun run db:push && bun run db:seed` →
  census MATCH (templates=11 unchanged). The e2e re-verified on the
  cured tree inside the WP-6 gate.
- **WP-2 (F-2)** — write `scripts/parity-routines.mjs` (modeled on the
  kpis precedent): PASS A the reference (ONE login → /Routines at
  1280×900 → the member read), PASS B our dev server (ONE login → the
  same read), the member-by-member live-vs-live diff, exit 1 on any
  DRIFT/PROBE-ERROR. ~700 members: the landscape (grid 3 + counts 2 +
  h2 4 + sub 3 + the ORDER member 1) + per plain card ~53 + per video
  card ~69 (the card 8 + strip 3 + video 16 + title 6 + chip 6 + desc
  3 + meta 5 + tip 7 + benefits 6 + useBtn 9). The THREE normalizers
  (realLayers + gradientStops verbatim from the kpis precedent + the
  NEW alphaBlack form). ZERO-WRITE on both apps. **Born-verify: the
  first flight must read all-MATCH, exit 0** (the decode pre-verified
  every member on the cured order); then two more consecutive flights
  for stability (the kpis ×3 precedent).
- **WP-3 (F-3)** — the watch ledger born-verification re-run on the
  quiet state (`assets stable` + 15/15).
- **WP-4 (F-5)** — the neo-crm sibling recheck (the live repo's SKILL
  version vs the vendored record).
- **WP-5** — the docs ladder: PAD §11 (the F-1 order-drift row + the
  F-2 eighth-surface row + the watch round-31 record + the F-4
  lesson-46 row), PAD §8.1 (the seed-parity row 2→3 checks + the
  totals 369→370), AGENTS (the watch note: round 31 + the EIGHT-script
  standing battery + the unit-count sites), SKILL v1.39.0 → **v1.40.0**
  (the parity row widened to EIGHT surfaces + **LESSON 46** [the local
  probe budget] + the version + the counts), README/CLAUDE counts (the
  lockstep pin), the worklog WH-42 entry, this plan's execution record,
  `docs/session_81.md`.
- **WP-6** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the THIRTEENTH cross-round byte
  comparison — the routines captures expected to move (the order cure,
  the deliberate our-side change: root-caused as such, never a silent
  re-base), every other mover root-caused before the ledger re-base,
  the ledger verified 0 mismatches, census MATCH after. Then the FULL
  GATE re-run on the final tree (the count ladder moves: unit 370/370;
  e2e 72/72 flat; build/smoke/lint/tsc green).
- **WP-7** — the scratch cleanup (`scratch-decode-routines.mjs`,
  `scratch-debug-chain.mjs`, `scratch-benefits-probe.mjs`,
  `scratch-compare.mjs` deleted; zero residue) + the local commit +
  the SSH-wrapper push (main only, the runbook procedure, the key
  shredded after).

## Lesson 46 candidate (the round's class)

The parity probes' login budget is symmetric: the REFERENCE's 10/15min
wall is the known constraint, but OUR dev server runs the same
per-process limiter — a full battery (seven scripts) plus a decode's
worth of local logins trips it on OUR side first (the battery's flights
cluster inside the window; the reference's spend is spread across the
round's wall-clock). The lesson: the local probe budget is a budget
too — pace the flights across the window, or restart the dev server
between the battery and the decode phases (the limiter is per-process;
its threat model is remote attackers, not localhost probes). The
failure mode reads exactly like app drift (a zero-card read, a login
wall redirect) — the LESSON 45 doctrine applies verbatim: reproduce
before curing; the restart-and-re-run closes it in one flight.

## Suggested next (WH-43)

(a) the standing battery at full width (watch round 32 + the EIGHT
  parity scripts — nine reference logins/round; the budget's edge,
  ZERO headroom for a transient re-run: a transient flight means the
  window must slide before the re-run, the round's own pacing lesson);
(b) the cooling policy still needs two-plus consecutive stable reads —
  rounds 28+29+30+31 each moved an axis;
(c) the NINTH surface candidates: the Profile appearance panels (the
  tablist + preset cards — partly data-dependent), the empty states
  (data-dependent on the demo accounts' shared zero state), or the
  Learning tutorial-card family (data-independent, the seeded-content
  watch already byte-pins the 12 tutorial titles);
(d) the standing blocks recheck + the reference's template-order watch
  (the order member joined the standing battery at WP-2 — the next
  reference re-order fires the surface's ORDER line same-round).

---

## Execution record (WH-42, 2026-11-01)

Executed as written, all work packages landed — with the round's two
escalations both riding F-2's born-flight (the plan forecast the order
drift as F-1; the benefits trim was unforecast):

- **WP-0** ✓ — the plan validated against the tree (the seed's
  sortOrder scheme + the API's orderBy + the text-based e2e finders +
  the docs-counts CANONICAL + the ledger re-base sites).
- **WP-1 (F-1)** ✓ — the TDD order cure: the grid-order contract RED
  (the sortOrder-sorted key sequence vs the decoded reference order),
  the `ROUTINE_TEMPLATES` array re-sequenced (a surgical reorder
  script; sortOrder renumbered with the array), GREEN, reseed, census
  MATCH (the counts never moved).
- **WP-2 (F-2)** ✓ — `scripts/parity-routines.mjs` written (697
  members: 13 landscape incl. the ORDER member + 5 plain × ~53 + 6
  video × ~69; the three normalizers incl. the NEW alphaBlack form).
  **The born-flight fired 691/697 — six real drifts, all
  `benefits.texts` on the six video cards**: the reference re-authored
  its template content's SECOND half (the video templates' benefit
  rows trimmed to three; ours rendered four — the plain five carried
  three all along, which is why the WH-24 decode never saw the
  split). The second TDD cure landed inside WP-2: the benefits-trim
  contract RED → the six 4th benefit rows trimmed from the seed →
  GREEN → reseed → census MATCH. **Born-verified 697/697 on the cured
  tree + stable on three more consecutive flights** (the last on the
  round's final asset state, the fifteenth bundle).
- **WP-3 (F-3)** ✓ — the watch ledger re-based, with the round's
  escalation: the FOURTH consecutive intra-round move (the FIFTEENTH
  bundle `qi2AnSYN` fired during the first re-base's own
  born-verification); re-based once to the round's final read,
  born-verified on the quiet state (`assets stable` + 15/15).
- **WP-4 (F-5)** ✓ — the neo-crm sibling at **v1.204.0** (UNCHANGED
  from the WH-39/40/41 record, informational).
- **WP-5** ✓ — PAD §11 (the watch row's round-31 record + the F-1
  order/benefits row + the F-2 eighth-surface row + the F-4 lesson-46
  row) + §8.1 (the seed-parity row 2→4 checks + the totals), AGENTS
  (round 31 + the EIGHT-script battery), SKILL v1.39.0 → v1.40.0 (the
  parity row widened to EIGHT surfaces + LESSON 46 + the version),
  README/CLAUDE counts, worklog, this record, docs/session_81.md. The
  count ladder moved 369 → 371 (the two seed-parity contracts); every
  doc site updated in the same commits — the lockstep pin caught one
  missed PAD site live (the enforcer working as designed).
- **WP-6** ✓ — the capture round + the full gate on the final tree
  (below).
- **WP-7** ✓ — the scratch probes deleted (scratch-decode-routines,
  scratch-debug-chain, scratch-benefits-probe, scratch-compare; zero
  residue); the commit + the SSH-wrapper push.

**The round's deviations from the plan**: (1) the benefits trim
(unforecast — the born-flight's six-drift finding, cured TDD-style
inside WP-2 with its own RED→GREEN); (2) the watch's intra-round
fifteenth-bundle move (the plan forecast the re-base; the WH-40/41
intra-round class held for the fourth consecutive round — re-based
once to the final read per the doctrine); (3) **the gate caught two
order-dependent e2e pins the plan's WP-0 check had cleared
incorrectly** — the sibling leg's `.first()` picker on Use This
Template (positional; now text-scoped to the family-A card via the
(q) leg's `has:` filter pattern) and the (p) leg's first-video-card +
aria-label pins (both named Creative Flow Session, the OLD order's
first video card; both now Focused Study Session, the reference's
re-ordered grid) — the drift guards firing exactly as designed on the
deliberate face change, updated with the documented causes, the count
ladder staying FLAT at 72.
