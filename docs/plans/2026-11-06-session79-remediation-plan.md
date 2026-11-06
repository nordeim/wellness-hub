# WH-79 Remediation Plan — the standing audit round (session 79 / session_158)

Date: 2026-11-06 (UTC) · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set; the
session_156/session78-plan/worklog/session_157 inputs). The operator's
explicit checklist re-verified standing at intake: the `.env`/db contract
(`DATABASE_URL="file:../db/custom.db"`, the `db/` folder at the repo root,
the db-path seam + `tests/db-path.test.ts` pin, census MATCH), the tracked
`.env.example` (bidirectional), the vitest/playwright configs (the e2e db
PINNED in `playwright.config.ts`), the sitemap/robots/manifest handlers
(smoke leg 12), the mobile-navigation battery (the e2e spec + parity-shell
61/61 — the drawer family, re-run green this round), and the eslint
skills-exclude. **This round: a QUIET watch on both axes expected against
the WH-77 re-based baseline, the FORTY-FIRST full-width battery, the
FIFTIETH capture round — the date-axis re-arms on the Nov 6 → Nov 7 UTC
crossing (the round opened 01:08 UTC Nov 6; same-day Nov 6 faces expected
against the WH-78 ledger's Nov 6 faces, the expectation carrying to WH-80
unless the captures run past ~00:00 UTC Nov 7) — and ONE real cure** (the
SKILL frontmatter freshness drift: `last_updated: 2026-11-03` stale across
TWO SKILL-editing rounds, cured RED→GREEN by the new frontmatter-freshness
scan, the count ladder moving 378 → 379 with every doc site in the same
commit).

## Round inputs (validated live before this plan)

- The five docs + session_156 + session_157 + the session78 plan (its
  execution record complete) + the worklog WH-78 entry read and validated
  against the tree at HEAD `8fb7bd7` (the session_157 transcript commit on
  the WH-78 ship `827e797`); the workspace SURVIVED the sandbox recycle
  again (the files intact, the processes dead — the recovery: `bun install`
  verified [473 installs, no changes] + the `.env` already present with its
  AUTH_SECRET + the chromium-1248 cache intact + `db:push`/`db:seed`/census
  MATCH [users=1 templates=11 steps=50 tutorials=12 badges=8 moods=1
  earned=0]).
- The baseline gate ALL GREEN on the intact tree — the evidence the
  workspace is the exact WH-78 ship state: lint 0/0 · tsc 0 · unit
  377→378/378 (26 suites, the ladder FLAT at the WH-78 total) · build OK ·
  smoke 14/14 (the SEO family green: sitemap + robots + manifest) · e2e
  72/72 (the mobile-nav battery inside the ladder) · census MATCH · bun
  audit zero. The standing checklist items re-verified: the six Tailwind v4
  `@source not` directives (globals.css L37-42), the playwright e2e db pin
  (`E2E_DATABASE_URL = "file:../db/e2e.db"`), the SEO route handlers
  (`src/app/sitemap.xml|robots.txt|manifest.json/route.ts`), the eslint
  `skills` ignore, the WH-78 diff audited (17 files — the docs ladder + the
  seven screenshot movers + the ledger + the docs-counts scan; zero app
  source changes, exactly as the round record claims).

## Findings (the round's reads — all live, both apps)

**Watch round 68: the QUIET read** — both axes STABLE at the WH-77/78
baseline (css `/static/index-BSn5NNZl.css` + js
`/static/index-CqEsEwKA.js`, cdn true, cfg true), the login family's
standing geometry MATCH (h1 30px/700, inputs 48px×368px r12px), and the
computed digest **15/15 MATCH** on the one-login PASS 2 (the mobile header
+ drawer battery inside the digest: header padL 24px, trigger 28px r8px,
title x=68; drawer 288px, border-r 1px, X none, 11 hrefs, rows 32px,
escape + unlock + grow-auto-close all pass). Per the WH-55 precedent the
quiet round is a reading, never a retirement: NO watch-ledger re-base.

**The battery (the FORTY-FIRST full-width run, all seventeen surfaces)**:
ALL GREEN — **3,555/3,555** (login 38/38 + authviews 192/192 the two
zero-login legs + moodForm 20/20 + shell 61/61 the drawer battery +
dashboard 105/105 + headers 192/192 + toolbars 114/114 + kpis 315/315 +
routines 697/697 + tutorials 790/790 + profile 433/433 + account 146/146 +
listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 + schedmodal
89/89 + moodtiles 67/67), split across two reference login windows per
the lesson-46 doctrine. ONE transient absorbed: parity-kpis' first
flight read 5/10 — the lesson-45 reproduce-before-curing doctrine
applied, the immediate re-run **315/315 MATCH** (an infrastructure
transient, not a reference move; the re-run spent the window's 10th
reference login, the verified-kill dev-server restart executed at the
boundary per the WH-74 amendment: the next dev process matched, the
port confirmed free, the server confirmed live; the limiter window aged
out before window 2). ZERO limiter trips.

**The capture round (the FIFTIETH cross-round byte comparison)**:
31/34 byte-stable, THREE movers root-caused + pixel-diffed against the
git HEAD (WH-78) captures (the app source IDENTICAL to the WH-78 tree
outside the tests/docs ladder):

**THE ROUND'S ONE FINDING-CURE (F-1): the SKILL frontmatter freshness
drift.** `wellness-hub_SKILL.md`'s frontmatter carries
`last_updated: 2026-11-03` — but the SKILL body was materially edited in
BOTH subsequent rounds: WH-77 (2026-11-05, the pre-ship block's stale
369/369 annotation cured to the live total) and WH-78 (2026-11-06, the
three Appendix-B rows cured + the two count-ladder sites moved). The
version field legitimately held at v1.50.0 (the session53 convention: the
version bumps only on a new lesson or surface — scan additions are not
surfaces, the WH-77/WH-78 precedent), but the DATE stamp is a live-tense
freshness claim that went false at WH-77 and stayed false through WH-78 —
two doc-cure rounds that cured stale claims while leaving their own file's
freshness stamp stale. Neither DOC_CLAIMS (no canonical date pin) nor
FORBIDDEN_FORMS (2026-11-03 was a real date once — it is history, not a
never-true form) nor any census can see it: the presence-of-truth
blind-spot class (WH-77: the command-annotation form; WH-78: the set-claim
form; WH-79: the metadata-freshness form). THE CURE (RED→GREEN): the new
frontmatter-freshness scan in `tests/docs-counts.test.ts` — the SKILL
frontmatter's `last_updated` must carry the NEWEST `docs/plans/` plan date
(the round ledger on disk is the tree-computable truth: every round ships
exactly one dated plan; the stamp becomes a validated-through stamp), RED
at birth with exactly one hit (2026-11-03 vs the live 2026-11-06) → GREEN:
the stamp cured to 2026-11-06. The scan itself adds one check: the count
ladder moves 378 → 379 with CANONICAL + every doc site in the SAME commit
(README ×4 + AGENTS ×2 + CLAUDE ×2 + PAD ×4 + the §8.1 infra row 170 → 171
with the scan named + SKILL ×2 — the lockstep pin green only when every
site agrees).

## The ToDo list (the round's work packages)

- [x] **WP-1 — the intake + the baseline gate**: the survived-recycle
  recovery (install verified, .env present, chromium-1248 cache intact, db
  push/seed/census MATCH) + the baseline gate ALL GREEN on the intact tree
  — the evidence the workspace is the exact WH-78 ship state.
- [x] **WP-2 — the watch round 68**: the QUIET read (both axes stable at
  `BSn5NNZl` / `CqEsEwKA`, cdn + cfg true, the login geometry MATCH); the
  computed digest 15/15 MATCH; NO watch-ledger re-base (the WH-55
  precedent).
- [x] **WP-3 — the battery**: the FORTY-FIRST full-width run across two
  reference login windows (the window-1 transient recorded + reproduced
  green per the lesson-45 doctrine; the verified-kill restart at the
  boundary per the WH-74 amendment), zero limiter trips.
- [x] **WP-4 — the capture round**: the canonical unmodified 34-file
  procedure on the fresh seed; the FIFTIETH byte comparison; every mover
  root-caused + pixel-diffed against the git HEAD (WH-78) captures; the
  standing alternation families classified; the date-axis carry recorded.
- [x] **WP-5 — THE CURE (TDD)**: the frontmatter-freshness scan RED at
  birth (exactly one hit: the stale 2026-11-03 stamp) → the stamp cured
  GREEN to the live plan-ledger date → the count ladder moved 378 → 379
  with every doc site in the same commit → the docs-counts pin re-verified
  green + the full unit suite 379/379.
- [x] **WP-6 — the ledger re-base**: the md5 ledger re-based at WH-79 (the
  WH-79 block born, WH-78 demoted to prior, WH-69 rolled to the re-bases
  list, the mover rows re-hashed), born-verified 34/34 ZERO MOVERS — the
  re-base script's structural assertions green before any write (the
  WH-70 doctrine).
- [x] **WP-7 — the full gate on the final tree**: lint 0/0 · tsc 0 · unit
  379/379 (the ladder FLAT at the new total with the docs-counts pin
  re-verified after the doc edits) · build OK · smoke 14/14 · e2e 72/72 ·
  census MATCH · bun audit zero.
- [x] **WP-8 — the docs ladder + the ship**: this plan (+ its execution
  record) + the session_158 log + the worklog WH-79 entry + the AGENTS
  round-68 record + the PAD §11 rows (the two WH-79 rows: the
  date-axis-carry row + the movers/watch/cure row) — README/CLAUDE/SKILL
  carrying the count-ladder move (378 → 379, the lockstep pin green);
  committed on main only and pushed through the SSH wrapper with the
  explicit `--remote git@github.com:nordeim/wellness-hub.git` (the WH-75
  lesson), the remote ref verified, the operator key shredded.

## TDD note

ONE cure this round, landed RED→GREEN per the doctrine: the
frontmatter-freshness scan written FIRST (RED at birth against the shipping
SKILL — exactly one hit, the stale `last_updated: 2026-11-03` vs the live
plan-ledger date 2026-11-06), then the stamp cured (GREEN), then the
ladder's own consequence (the +1 check moving 378 → 379) carried through
CANONICAL + every doc site in the SAME commit per the count-ladder rule —
the lockstep pin green only when every site agrees. The scan's truth
source is the `docs/plans/` filename dates (pure filesystem, no git, no
network — the pin philosophy held); the stamp's semantics upgrade from
"content-changed date" (unpinnable) to "validated-through date" (pinnable)
is the cure's own documentation move — narrated in the scan's comment
block, the same way the WH-77/WH-78 scans narrate their exemptions. The
md5 re-base script's structural assertions (WP-6) run green before any
write — the WH-70 guardrails standing ready.

## Execution record (appended after the work packages landed)

- The full gate on the final tree: **lint 0/0 · tsc 0 · unit 379/379
  (26 suites, the ladder FLAT at the new total with the docs-counts pin
  re-verified after every doc edit — 13/13 in the docs-counts suite,
  the frontmatter-freshness scan GREEN with the stamp cured) · build OK ·
  smoke 14/14 · e2e 72/72** (the mobile-navigation battery inside the
  ladder, the drawer family green) · census MATCH · bun audit zero.
- The battery + capture detail (the standing procedure): the FORTY-FIRST
  run's 3,555/3,555 with the two zero-login legs run first (login 38 +
  authviews 192), window 1 (moodForm + shell + dashboard + headers +
  toolbars + kpis [the transient + the reproduced re-run] + routines),
  the verified-kill dev-server restart, the limiter window aged out,
  window 2 (tutorials + profile + account + listinteriors + moodjourney +
  calendar + schedmodal + moodtiles); the capture round on the fresh seed
  (badgesEarned=0 asserted, the light logged-out family first, ONE login,
  the phase-split + the 34 mood-mirror write last, re-seed + census MATCH
  after) — the captures landing ~01:51 UTC Nov 6, same-day faces vs the
  WH-78 ledger's Nov 6 faces.
- The FIFTIETH comparison's final accounting: THREE movers, all
  classified standing environmental instances — 24-dark-exercise-rows
  re-firing at its EXACT WH-78-record parameters (the orange-corner
  family's alternation now standing), 25-dark-login-focus re-firing at
  its EXACT WH-76-record parameters (the WH-20 habitat), and 30-
  tutorial-card-hover's NEW sub-visible instance (the thumbnail
  brown-edge anti-aliasing band — root-caused, classified, no cure);
  RESTING: 10-learning (a second consecutive rest) + 29-quick-actions-
  hover (after its triple). The date-axis CARRIED (the FIRST expectation
  of the new cycle) — the re-arm moves to the Nov 6 → Nov 7 crossing.
- The md5 ledger re-based at WH-79 (the WH-79 block born, WH-78 demoted
  to prior, WH-69 rolled to the re-bases list, the three mover rows
  re-hashed), born-verified 34/34 ZERO MOVERS — the re-base script's
  structural assertions tripping once on the first pass BEFORE any write
  (the WH-78 block's two-line tail form; the assertion cured to the true
  form — the WH-70 doctrine held, the ledger never written in the failed
  state).
- The instrument scratch scripts (the byte comparison, the pixel-diff,
  the md5 re-base, the 30-region probe) ran session-local outside the
  repo — the standing precedent (the committed `scripts/watch-round.mjs`
  and `scripts/capture-round.mjs` own the reconstructible procedures).
- The ship: the commit on `main` only (the round's change-set + the
  docs ladder), then the SSH-wrapper push with the operator key
  materialized outside the repo (0600, never printed, shredded after)
  and the explicit `--remote git@github.com:nordeim/wellness-hub.git`
  argument (the WH-75 lesson — the wrapper's default remote points at
  the old task-management repo; the dry-run doctrine catches it). The
  remote ref verified == local HEAD.
