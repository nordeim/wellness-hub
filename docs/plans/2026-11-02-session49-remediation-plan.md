# WH-49 Remediation Plan — the fifteenth parity surface round (session 49)

Date: 2026-11-02 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round; the
session_93/session48-plan/worklog/session_94 inputs; this round executes
the WH-48 plan's suggested-next).

## Round inputs (validated live before this plan)

- Fresh clone to `a5e8931` (main, clean — the WH-48 ship `b8f57f2` + the
  operator's session_94 log push). The environment rebuilt: bun 1.3.14,
  chromium 1248 reinstalled (the sandbox cache carried 1200 only — the
  known first-run gap), `.env` copied with a fresh 64-hex AUTH_SECRET,
  db:push + db:seed + census MATCH (users=1 templates=11 steps=50
  tutorials=12 badges=8 moods=1).
- The five docs (AGENTS, CLAUDE, README, PAD, SKILL v1.46.0) + session_93
  + the session48 plan + the worklog WH-48 entry + session_94 read and
  validated against the tree. The instruction's checklist items verified:
  the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"` → the
  repo-root `db/`, census MATCH), `.env.example` tracked and accurate, the
  vitest/playwright configs (375/72, the e2e db PINNED at `db/e2e.db`), the
  sitemap/robots/manifest route handlers standing (smoke leg 12 green),
  the Tailwind v4 pins standing in `globals.css`, the mobile drawer
  battery — re-run explicitly per the instruction's emphasis (8/8).
- **The baseline gate re-run live, ALL GREEN at the exact WH-48 ship
  state: lint 0/0 · tsc 0 · unit 375/375 (26 suites) · build OK · smoke
  14/14 · e2e 72/72 (the mobile-nav battery re-run explicitly — 8/8) ·
  census MATCH · `bun audit` zero.**
- The WH-48 changes audited on the tree (Mode C): the fourteenth surface
  `scripts/parity-moodjourney.mjs` (the ONE-login/TWO-route/ZERO-WRITE
  budget discipline, the PINNED-DEVIATION delete-button member, the
  stop-triples gradient convention) + the F-1/F-2 cures in
  `mentalhealth-page.tsx` (the days p's inline `text-xs text-gray-500
  dark:text-gray-400` form + the delete button's `h-7` with the record
  comments) + the widened WH-24 MODULE_KPI census block + the ledger
  re-base — structure, anchors and conventions all standing, clean.
- **Watch round 38: FULLY QUIET** — both axes stable (css
  `index-CapATpwD.css` + js `index-OLDXOew4.js`, the round-37 final read,
  unchanged — the second consecutive fully-quiet read). The same-run
  digest **15/15 MATCH**. NO ledger re-base (nothing moved; the watch
  stays every-round regardless).
- **The standing battery's Window 1 green** (5 reference logins + the
  watch's): login **34/34** (the zero-login leg) · moodForm **20/20** ·
  shell **61/61** (the drawer battery, the instruction's mobile-menu
  emphasis) · dashboard **105/105** · headers **192/192** · toolbars
  **114/114**. Window 2 + 3 PENDING the reference window roll — paced
  per the lesson-46 doctrine (the dev server restarted between windows).
- The neo-crm sibling: informational, per the WH-45..48 records (no
  re-probe spent this round).

## Findings (the fifteenth-surface decode — the WH-48 plan's (c)
candidates, decode-first against the live pair: ONE our-side flight +
ONE reference flight + ONE targeted header probe per side)

- **F-1 [LOW, positive — the round's core: the FIFTEENTH SURFACE
  candidate decoded BORN-QUIET] — the Events calendar card's day-cell
  interiors read byte-identical on both apps.** The full anatomy, decoded
  live on both apps at 1280×900: the card chrome (12px radius,
  border-none, white, **632×660 at (288,136)**); the header family (the
  p-24 header block; the title row — flex, 16px/600, letter-spacing
  -0.4px, 584×32 at y=160; the month SPAN "November 2026" — block,
  137×16 at (312,168); the nav trio — h=32, radius 6px, 1px
  rgb(229,229,229) border, white bg, 12px font, the x-ladder
  750/794/860 with widths 36/59/36); the grid (display grid, 7 columns
  ≈76.5px, **gap 8px**, 584×556 at (312,216)); the weekday headers (7×
  77×36 at y=216 — center, 14px/600, rgb(75,85,99), py-8); the landscape
  (**37 grid kids = 7 headers + 0 leading spacers + 30 day cells**
  [November 2026 opens on a Sunday], todayIdx 1); the plain day cell
  (min-h 96px, p-8, radius 8px, 1px rgb(229,231,235) border,
  transparent bg, cursor pointer, transition-all, **77×96 at (312,260)**);
  the plain dayNum (14px/500, rgb(55,65,81), margin-bottom 4px, 59×20 at
  (321,269)); the TODAY cell (border rgb(196,181,253) = violet-300, the
  violet-100→purple-100 `to right bottom` gradient — stop triples
  237,233,254 → 243,232,255, the KNOWN v4 `in oklab`/`%`-hints
  serialization class, compared by the moodjourney stop-triples
  convention); the TODAY dayNum (rgb(109,40,217) = violet-700); the
  events box (block, 0 children at the demo state); the cell ladder
  (week 1 at y=260, week 2 at y=364 — the 104px stride). **ZERO real
  drift** — the born-quiet landing class (the kpis/account/authviews
  precedents; no cure, no unit pin, the surface is the round's artifact).
- **F-2 [LOW — the DOM-shape fact, documented not cured]** — the title
  row's tag: ours an `<h2>` (with the identical SPAN + nav subtree),
  the reference's a plain `<div>` — the same-pixels-different-trees
  semantic superset class (the lesson-27/48 form; the parity-routines
  `<h3>`-retirement precedent documents the reference's bare-div
  vocabulary on the seeded-card titles — its calendar title row rides
  the same form). The SPAN/nav/BUTTON subtree is byte-identical on both
  apps. The surface documents the fact; the a11y net pins our superset.
- **F-3 [LOW — the candidate retired]** — the WH-48 plan's other (c)
  candidate, "the routines template card's benefits/tip interiors," was
  found ALREADY COVERED by the eighth surface (`parity-routines.mjs`
  697 members include tip.label/labelFs/labelColor/tileBg/tileBorder/
  tileRadius/tileP + benefits.labelFs/… — decoded live at WH-42). The
  candidate retired; the calendar carried the round.
- **F-4 [LOW — the watch's quiet round]** — round 38 fully quiet on both
  axes (the second consecutive); NO ledger re-base. The watch stays
  every-round regardless (the standing doctrine).
- **F-5 [LOW — deferred, the standing ledger note]** — the sibling
  delete-button sites at a data-bearing state remain unmeasurable on
  the reference (its demo account carries zero rows on
  exercise/assignments/reminders/events/sr, and the ZERO-WRITE doctrine
  forbids creating any) — the WH-48 F-2 deferral stands unchanged.

## Work packages

- **WP-0** — this plan, validated against the tree during the decode:
  the events page's calendar section (`CALENDAR` record +
  `SECTION_CARD` in `src/lib/page-layout.ts`, the `monthGrid`/`leading`
  logic in `events-page.tsx`), the reference's own header anatomy (the
  targeted probe), the eighth surface's benefits/tip coverage (the
  candidate retirement), the watch ledger state (quiet, round 38).
- **WP-1 (F-1 — the FIFTEENTH SURFACE)** — write
  `scripts/parity-calendar.mjs` (modeled on the decode flights): the
  calendar card's FULL computed anatomy — the card chrome, the header
  family (the title row + the month SPAN + the nav trio), the grid, the
  weekday headers, the landscape counts (date-derived, computed live —
  never hardcoded: the month title, the day-cell count, the spacer
  count, the today index, the today ladder), the plain cell + dayNum,
  the TODAY cell + dayNum (gradients by their rgb STOP TRIPLES — the
  moodjourney convention), the events box, the cell ladder — ONE login
  per app, ONE route (/events), ZERO-WRITE; the H2/DIV DOM-shape fact
  documented in the header comment (F-2). **Born-verify ×3 consecutive
  flights** (the reference login budget: 3, paced inside the windows).
- **WP-2 (the battery completion)** — Window 2 after the reference
  window rolls: kpis **315/315** · routines **697/697** · tutorials
  **790/790** · profile **433/433**. Window 3 (the next roll): account
  **146/146** · authviews **192/192** (zero-login) · listinteriors
  **88/88** · moodjourney **116/116** (+ the fifteenth surface's
  born-flights joining the cadence). The dev server restarted between
  windows per the lesson-46 doctrine (the per-process limiter shares the
  budget with the decode flights — the WH-42 F-4 class's third instance
  is the standing caution).
- **WP-3 (the docs ladder)** — SKILL v1.46.0 → **v1.47.0** (the parity
  row widened to FIFTEEN surfaces + the parity-calendar entry), PAD §11
  (the fifteenth-surface born-quiet row + the watch row's round-38
  quiet record), AGENTS (round 38 + the FIFTEEN-script battery), README/
  CLAUDE (no count sites — the ladder flat), the worklog WH-49 entry,
  this plan's execution record, `docs/session_95.md`. The count ladder
  FLAT at 375 (no unit pins — no src drift found; the round's code
  artifact is the surface script itself); the docs-counts lockstep
  green.
- **WP-4 (the capture round)** — `bun run db:seed && node
  scripts/capture-round.mjs`, the TWENTIETH cross-round byte comparison.
  ZERO cures this round → the captures EXPECTED byte-stable modulo the
  standing signatures (25-dark-login-focus [the focus-phase family,
  seventh round] + the 27/32 sub-visible rasterization family at
  maxdelta 1); any other mover root-caused before any re-base, the
  ledger verified 0 mismatches, census MATCH after.
- **WP-5 (the full gate)** — the full gate re-run on the final tree
  (lint → tsc → 375 → build → smoke → 72 e2e + the mobile-nav battery
  explicit) + census MATCH + bun audit zero.
- **WP-6 (the screenshots)** — the 34-file capture set refreshed ONLY if
  a walked face moved (zero cures this round → expected unchanged; the
  capture round's ledger comparison is the verification).
- **WP-7** — the scratch cleanup (the three scratch probes deleted;
  zero residue) + the local commit + the SSH-wrapper push (main only,
  the runbook procedure, the key shredded after).

## The round's class (no new lesson)

The decode carried the existing canon end-to-end: the lesson-40
stop-triples convention (the TODAY cell's gradient), the lesson-27/48
DOM-shape vocabulary class (the H2/DIV title row), and the
lesson-41/44 born-quiet landing discipline (the kpis/account/authviews
precedents — a surface that decodes clean is a FINDING of parity, not a
round without one). No new lesson candidate.

## Suggested next (WH-50)

(a) the standing battery at full width (watch round 39 + the FIFTEEN
  parity scripts — the two-window pacing stays mandatory);
(b) the fifteenth surface's stability flights join the standing
  cadence;
(c) the SIXTEENTH surface candidates: the module create-forms'
  ERROR-state interiors (the Zod validation messages both apps render
  on a bad submit — a state class no surface reads), the goals page's
  progress-logging interior at a data-bearing state (the reference's
  own demo account carries none — data-blocked, same class as F-5), the
  Profile save bar's transient states, the dark-mode calendar interior
  (the a11y net walks it; no parity surface does);
(d) the standing blocks recheck + the preset-catalog watch.

## Execution record (WH-49, 2026-11-02)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree during the decode
  (the events page's calendar section + the CALENDAR/SECTION_CARD
  records, the reference's header anatomy, the eighth surface's
  benefits/tip coverage, the watch ledger state).
- **WP-1 (the FIFTEENTH SURFACE)** ✓ — `scripts/parity-calendar.mjs`
  written: **92 members**, ONE login per app, ONE route (/events),
  ZERO-WRITE (the month never navigated); the date-derived members
  computed live on each app; gradients by their rgb STOP TRIPLES (the
  moodjourney convention); the title row anchored by STRUCTURE never
  tag; the calendar card matched by the 'SunMonTue' SEQUENCE. Born-
  verified **92/92 ×3 consecutive flights — BORN-QUIET** (two
  script-construction iterations absorbed: a backtick inside a HELPERS
  comment terminates the template literal — the WH-48 session's own
  display-artifact class now caught at syntax time; and a \b-anchored
  weekday regex never matches — the headers concatenate in textContent
  with no word boundaries, the decode's own artifact lesson).
- **WP-2 (the battery completion)** ✓ — Window 2: kpis 315/315 ·
  routines 697/697 · tutorials 790/790 · profile 433/433; Window 3:
  account 146/146 · authviews 192/192 (zero-login) · listinteriors
  88/88 · moodjourney 116/116 (+ Window 1's login 34/34 · moodForm
  20/20 · shell 61/61 · dashboard 105/105 · headers 192/192 · toolbars
  114/114) — the eleventh full-width run at FOURTEEN legs + the
  fifteenth, **3,395 computed members live-vs-live**, zero manual
  evals; the dev server restarted between windows (lesson-46); no
  limiter trips.
- **WP-3 (the docs ladder)** ✓ — SKILL v1.46.0 → v1.47.0 (the parity
  row widened to FIFTEEN surfaces + the parity-calendar entry + the
  battery-note login-count FOURTEEN), PAD §11 (the watch row's
  round-38 quiet record + the fifteenth-surface row), AGENTS (the
  round-38 record + the FIFTEEN-script battery note + the fifteenth
  surface's own record), README/CLAUDE (no count sites), the worklog
  WH-49 entry, this record, docs/session_95.md. The count ladder FLAT
  at 375; the docs-counts lockstep green.
- **WP-4 (the capture round)** ✓ — the TWENTIETH cross-round byte
  comparison, **34/34 byte-stable — ZERO movers** (even the standing
  signatures — 25-dark-login-focus + the 27/32 sub-visible
  rasterization family — read quiet this round); NO ledger re-base;
  the re-seed + census MATCH after.
- **WP-5 (the full gate)** ✓ — the full gate re-run GREEN on the final
  tree: lint 0/0 · tsc 0 · unit 375/375 · build OK · smoke 14/14 ·
  e2e 72/72 (the mobile-nav battery 8/8, re-run explicitly per the
  instruction's emphasis) · census MATCH · bun audit zero.
- **WP-6 (the screenshots)** ✓ — the 34-file capture set refreshed by
  the committed procedure; every capture byte-identical to the ledger
  (zero movers — the zero-cure round's expected outcome; the ledger
  unchanged in the same commit).
- **WP-7** ✓ — the scratch probes (scratch-decode-cal.mjs +
  scratch-decode-cal-header.mjs + scratch-debug-cal.mjs) deleted +
  the local commit + the SSH-wrapper push.

**The round's deviations from the plan**: none — the decode, the
born-verification, the battery, the capture round, and the docs ladder
all landed exactly as planned (the two script-construction iterations
on the surface were absorbed inside WP-1 without a login-budget
impact beyond the plan's single decode reference flight).

