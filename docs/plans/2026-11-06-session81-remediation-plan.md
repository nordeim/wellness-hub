# WH-81 Remediation Plan — the standing audit round (session 81 / session_164)

Date: 2026-11-06 (UTC) · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/` — see the session_162/session80-plan/
worklog/session_163 inputs for the exact reference), the audit→plan→TDD→gate→
capture→docs→commit→push cadence, the repo skills as the method set (the
web-application/tdd/agent-browser/clone-app-pat-pro set; the skills/ folder
excluded from checking/testing/compilation). The operator's explicit checklist
re-verified standing at intake on the FRESH-CLONE workspace (the sandbox
recycled: the recovery ran the first-run procedure — bun install [468
packages], .env created from .env.example with a fresh AUTH_SECRET, db:push/
db:seed/census MATCH, chromium-1248 installed): the `.env`/db contract
(`DATABASE_URL="file:../db/custom.db"`, the `db/` folder at the repo root,
census MATCH), the tracked `.env.example` (bidirectional — every custom env
var the code reads is present), the vitest/playwright configs (the e2e db
PINNED at `file:../db/e2e.db`), the sitemap/robots/manifest handlers (smoke
leg 12), the mobile-navigation battery (the e2e spec 7/7 + parity-shell
61/61 — the drawer family), and the eslint skills-exclude. **This round:
watch round 70 read BOTH AXES MOVED (css `BSn5NNZl` → `Bx9xPHC1`, the
SEVENTEENTH css content change + js `B83bBhZf` → `Dd6vzWqe`, the
FORTY-SEVENTH distinct bundle) with the computed digest 15/15 MATCH — the
moved assets carry zero computed drift, so the watch ledger's cssPath +
jsPath re-base to the round's final reads in this round's commit (the
intra-round doctrine) — the FORTY-THIRD full-width battery caught the round's
finding: THE REFERENCE RE-ORDERED BOTH CONTENT GRIDS (the WH-42/43 class,
the THIRD firing)**.

## Round inputs (validated live before this plan)

- The five docs + session_162 + session_163 + the session80 plan (its
  execution record complete) + the worklog WH-80 entry read and validated
  against the tree at HEAD `973da27`; the workspace RECOVERED from a full
  sandbox recycle (a fresh clone — the standing recovery: install, .env,
  db push/seed/census, chromium install).
- The baseline gate ALL GREEN on the recovered tree — the evidence the
  clone is the exact WH-80 ship state: lint 0/0 · tsc 0 · unit 380/380
  (26 suites, the ladder FLAT at the WH-80 total) · build OK · smoke 14/14
  (the SEO family green: sitemap + robots + manifest) · e2e 72/72 (the
  mobile-nav battery inside the ladder) · census MATCH.
- The standing checklist items re-verified: the six Tailwind v4
  `@source not` directives + the hover/dark `@custom-variant` pins + the
  `--shadow-sm`/`--blur-sm` re-pins, the playwright e2e db pin, the SEO
  route handlers, the eslint skills ignore, every tech-stack version claim
  (installed next 16.4.2 / react 19.3.1 / ts 5.9.3 / tailwind 4.3.3 /
  prisma 6.19.3 / zod 4.6.7 / zustand 5.0.15 / vitest 5.0.5 / playwright
  1.64.1 all match the doc set), the e2e spec distribution (72 checks),
  the `.env.example` completeness (every `process.env.*` read the code
  makes is documented), zero TODO/FIXME markers in src/scripts/prisma.

## Findings (the round's reads — all live, both apps)

**Watch round 70**: BOTH axes MOVED — css `/static/index-BSn5NNZl.css` →
`/static/index-Bx9xPHC1.css` + js `/static/index-B83bBhZf.js` →
`/static/index-Dd6vzWqe.js` — with the login family's standing geometry
MATCH and the computed digest **15/15 MATCH** on the one-login PASS 2 (the
mobile header + drawer battery inside the digest: header padL 24px, trigger
28px r8px, title x=68; drawer 288px, border-r 1px, 11 hrefs, rows 32px,
escape + unlock + grow-auto-close all pass). The lesson-30 full walk (the
battery, below) confirmed zero computed drift through both moves — the
platform-move class on both axes. The watch ledger's cssPath + jsPath
re-base to the round's final reads in this round's commit per the
intra-round doctrine (re-based ONCE to the round's final read,
born-verified on the quiet state).

**THE ROUND'S FINDING (F-1): the reference re-ordered BOTH content grids —
the WH-42/43 class, the THIRD firing.** The battery's live ORDER members +
per-card datum members caught both moves on their first flights:

1. **routines 639/697 (58 drift members)** — the eleven-template SET and
   every per-template datum byte-equal (titles, chips, descs, metas,
   benefit rows, strip/use-button gradient stops all present at their
   datum-identical forms), only the SEQUENCE moved. The new reference
   grid order: 10-Minute Home Workout leads, 5-Minute Morning Energizer
   second (the pair swap); Self-Care Sunday Reset ↔ Calm Evening Wind-Down
   swap (positions 4/5); Focused Study Session slides 10→6, Creative Flow
   Session 7→6+1, Quick Productivity Reset 7→10 (the middle reshuffle);
   Pomodoro (3), Energizing Morning Kickstart (8), Self-Care Sunday (9),
   Peaceful Evening Wind-Down (11) held. SEVEN sortOrder renumbers.
   Reproduced ×2 (two same-round reads identical — decode-settled).
2. **tutorials 719/790 (71 drift members)** — the twelve-tutorial SET and
   every per-tutorial datum byte-equal (imgs, durations, titles, descs,
   chip families), only the SEQUENCE moved. The new reference grid order:
   The Power of Tiny Habits leads, Self-Compassion for Perfectionists
   second, Overcoming Procrastination third, Building Morning Routines
   fourth, Beating Decision Fatigue fifth, The Science of Motivation
   sixth; positions 7-8 (Healthy Meal Prep Guide, Building Better Habits)
   held AGAIN (the WH-76 precedent); the tail reshuffled: 10-Minute
   Morning Yoga Flow ninth, Mindfulness Meditation for Anxiety tenth,
   Time Management Mastery eleventh, Effective Study Techniques twelfth.
   TEN sortOrder renumbers. Reproduced ×3 (decode-settled).

The reorder's expected capture-round consequence (the WH-76 precedent):
the five grid faces move — 03-routines + 18-dark-routines (the routine
grid's new card sequence), 10-learning + 30-tutorial-card-hover (the
tutorial grid's), 28-routines-schedule-modal (the capture script's
`.first()` anchor opening the NEW first template — 10-Minute Home Workout,
a family-B/five-circle modal where the WH-80 face opened 5-Minute Morning
Energizer's family-A/three-circle form).

**THE CURE (RED→GREEN)**: re-author the two grid-order pins in
`tests/seed-parity.test.ts` (the byOrder lists → the new decoded
sequences) — RED at birth with exactly the two reorder hits against the
shipping seed — then GREEN: renumber the seed's sortOrder fields (the
seven routine renumbers + the ten tutorial renumbers), re-seed, and move
the position-pinned e2e site (the a11y video-card battery's
`videoCards[0]` + its hover-reveal + aria-label anchors → Focused Study
Session, the new first video card; the named-card probes are
position-agnostic and stay). The schedmodal parity + watch anchors are
name-based (position-insensitive — no change). No new check is added: the
count ladder stays FLAT at 380 (the two byOrder lists are re-authored,
not added).

## The ToDo list (the round's work packages)

- [x] **WP-1 — the intake + the baseline gate**: the fresh-clone recovery
  (install, .env + AUTH_SECRET, db push/seed/census MATCH, chromium-1248)
  + the baseline gate ALL GREEN on the recovered tree (lint 0/0 · tsc 0 ·
  unit 380/380 · build OK · smoke 14/14 · e2e 72/72 · census MATCH) — the
  evidence the clone is the exact WH-80 ship state.
- [x] **WP-2 — the watch round 70**: the double-axis move read (css
  `BSn5NNZl` → `Bx9xPHC1` + js `B83bBhZf` → `Dd6vzWqe`, the login
  geometry MATCH); the computed digest 15/15 MATCH (the mobile drawer
  battery inside); the ledger cssPath + jsPath re-base prepared for the
  round's commit (the intra-round doctrine — re-based ONCE to the round's
  final reads, born-verified after the edit).
- [x] **WP-3 — the battery**: the FORTY-THIRD full-width run across two
  reference login windows (the verified-kill dev-server restart at the
  window boundary per the WH-74 amendment), the two reorder drifts caught
  + decode-settled, ONE own-limiter trip absorbed (the verified-kill
  restart — the in-memory limiter resets).
- [x] **WP-4 — THE CURE (TDD)**: the two grid-order pins re-authored RED
  at birth (exactly the two reorder hits) → the seed's seventeen sortOrder
  renumbers (GREEN) → re-seed + census MATCH → the a11y video-card
  position pins moved to the new first video card → the two drifted legs
  re-flighted (routines 697/697 + tutorials 790/790 expected).
- [x] **WP-5 — the capture round**: the canonical unmodified 34-file
  procedure on the fresh seed; the FIFTY-SECOND byte comparison; every
  mover root-caused + pixel-diffed against the git HEAD (WH-80) captures;
  the five reorder faces classified as the cure's own effect; the standing
  alternation families classified; the date-axis read recorded.
- [x] **WP-6 — the md5 ledger re-base** (if movers): the ledger re-based
  at WH-81 per the WH-70 structural-assertion doctrine, born-verified
  34/34.
- [x] **WP-7 — the full gate on the final tree**: lint 0/0 · tsc 0 · unit
  380/380 (the ladder FLAT with the docs-counts pin re-verified after
  every doc edit) · build OK · smoke 14/14 · e2e 72/72 · census MATCH ·
  bun audit zero.
- [x] **WP-8 — the docs ladder + the ship**: this plan (+ its execution
  record) + the session_164 log + the worklog WH-81 entry + the AGENTS
  round-70 record + the PAD §11 rows — committed on main only and pushed
  through the SSH wrapper with the explicit `--remote
  git@github.com:nordeim/wellness-hub.git` (the WH-75 lesson), the remote
  ref verified, the operator key shredded.

## TDD note

ONE cure this round (both grid renumbers land as the same RED→GREEN
change, the WH-76 precedent): the two grid-order pins re-authored FIRST
(RED at birth against the shipping seed — exactly the two reorder hits,
no more), then the seed's sortOrder fields renumbered (GREEN), the
position-pinned e2e sites moved in the same change, and the two drifted
parity legs re-flighted to prove the rendered face now mirrors the
reference's live grids. The truth source is the reference's live grid
order (the battery's ORDER + per-card members, decode-settled on
same-round reads). No new check is added — the count ladder stays FLAT
at 380.

## Execution record (appended after the work packages landed)

- The full gate on the final tree: **lint 0/0 · tsc 0 · unit 380/380
  (26 suites, the ladder FLAT with the docs-counts pin green — the two
  re-authored grid-order pins GREEN with the seventeen sortOrder
  renumbers) · build OK · smoke 14/14 · e2e 72/72** (the
  mobile-navigation battery inside the ladder, the drawer family green)
  · census MATCH · bun audit zero.
- The watch + battery detail (the standing procedure): watch round 70
  read BOTH axes moved (css BSn5NNZl -> Bx9xPHC1 + js B83bBhZf ->
  Dd6vzWqe) with the computed digest 15/15 MATCH on the same run (the
  mobile header + the full drawer battery inside the digest — escape +
  unlock + grow-auto-close all pass) — the lesson-30 full walk (the
  battery) confirming zero computed drift through both moves; the
  FORTY-THIRD full-width battery run: the two zero-login legs + fifteen
  surfaces green (login 38/38 + authviews 192/192 + moodForm 20/20 +
  shell 61/61 + dashboard 105/105 + headers 192/192 + toolbars 114/114 +
  kpis 315/315 + profile 433/433 + account 146/146 + listinteriors
  88/88 + moodjourney 116/116 + calendar 92/92 + schedmodal 89/89 +
  moodtiles 67/67) with the TWO reorder legs (routines 639/697 +
  tutorials 719/790) the round's finding — decode-settled, cured, and
  re-flighted 697/697 + 790/790; ONE own-limiter trip absorbed (the
  moodtiles leg's pass B — the verified-kill restart, the in-memory
  limiter resetting, the leg re-flighted 67/67).
- The capture round (the FIFTY-SECOND cross-round byte comparison): the
  canonical unmodified 34-file procedure on the post-cure fresh seed
  (badgesEarned=0 asserted, the light logged-out family first, ONE
  login, the phase-split, the 34 mood-mirror write last, re-seed +
  census MATCH after) — the captures landing same-day Nov 6 UTC faces vs
  the WH-80 ledger's Nov 6 faces (no midnight crossed — the date-axis
  CARRIES to WH-82, the "6"->"7" glyph family re-arming on the Nov 6 ->
  Nov 7 crossing).
- The movers accounting: SIX movers, all root-caused + pixel-diffed against
  the git HEAD (WH-80) captures — the FIVE reorder faces (03-routines
  98,366 px / 18-dark-routines 98,122 px / 10-learning 359,655 px /
  30-tutorial-card-hover 354,599 px — the two grids' new card
  sequences, magnitudes matching the WH-76 reorder precedent exactly —
  + 28-routines-schedule-modal 229,943 px, the capture script's
  `.first()` anchor opening the NEW first template's family-B
  five-circle modal where the WH-80 face opened the family-A
  three-circle form) + ONE standing environmental instance
  (29-quick-actions-hover 4 px / maxdelta 1 / bbox 5x5 at (503,326) —
  the maxdelta-1 family re-firing at its signature parameters after
  its WH-79/80 rest); RESTING: 24-dark-exercise-rows (the
  orange-corner family) + 25-dark-login-focus (the WH-20 habitat,
  byte-stable after its WH-79/80 double). The md5 ledger re-based at
  WH-81 (the WH-81 block born, WH-80 demoted, WH-71 rolled to the
  re-bases list, the six mover rows re-hashed), born-verified 34/34
  ZERO MOVERS — the re-base script's structural assertions green on
  the first pass (the WH-70 doctrine held).
- The watch ledger's cssPath + jsPath re-based to the round's final
  reads (Bx9xPHC1.css / Dd6vzWqe.js) per the intra-round doctrine,
  born-verified on the quiet state: the re-run after the edit reads
  "assets stable" + the 15/15 digest.
- The instrument scratch scripts (the byte comparison, the pixel diff,
  the md5 re-base) ran session-local outside the repo — the standing
  precedent (the committed scripts/watch-round.mjs and
  scripts/capture-round.mjs own the reconstructible procedures).
- The ship: the commit on `main` only (the round's change-set + the docs
  ladder), then the SSH-wrapper push with the operator key materialized
  outside the repo (0600, never printed, shredded after) and the explicit
  `--remote git@github.com:nordeim/wellness-hub.git` argument (the WH-75
  lesson). The remote ref verified == local HEAD.
