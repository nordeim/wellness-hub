# WH-80 Remediation Plan — the standing audit round (session 80 / session_161)

Date: 2026-11-06 (UTC) · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/` — see the session_159/session79-plan/
worklog/session_160 inputs for the exact reference), the audit→plan→TDD→gate→
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
watch round 69 read the JS axis MOVED (`CqEsEwKA` → `B83bBhZf`) with the CSS
axis STABLE (`BSn5NNZl`) and the computed digest 15/15 MATCH — the moved
bundle carries zero computed drift, so the watch ledger's jsPath re-bases to
the round's final read in this round's commit (the intra-round doctrine) —
the FORTY-SECOND full-width battery, the FIFTY-FIRST capture round (the
date-axis carries again if the captures stay same-day Nov 6) — and ONE real
cure (F-1 below)**.

## Round inputs (validated live before this plan)

- The five docs + session_159 + session_160 + the session79 plan (its
  execution record complete) + the worklog WH-79 entry read and validated
  against the tree at HEAD `ec59b2e`; the workspace RECOVERED from a full
  sandbox recycle (a fresh clone — the standing recovery: install, .env,
  db push/seed/census, chromium install).
- The baseline gate ALL GREEN on the recovered tree — the evidence the
  clone is the exact WH-79 ship state: lint 0/0 · tsc 0 · unit 379/379
  (26 suites, the ladder FLAT at the WH-79 total) · build OK · smoke 14/14
  (the SEO family green: sitemap + robots + manifest) · e2e 72/72 (the
  mobile-nav battery inside the ladder) · census MATCH · bun audit zero.
- The standing checklist items re-verified: the six Tailwind v4
  `@source not` directives (globals.css L37-42) + the hover/dark
  `@custom-variant` pins + the `--shadow-sm`/`--blur-sm` re-pins, the
  playwright e2e db pin, the SEO route handlers, the eslint skills ignore,
  every tech-stack version claim (installed next 16.4.2 / react 19.3.1 /
  ts 5.9.3 / tailwind 4.3.3 / prisma 6.19.3 / zod 4.6.7 / zustand 5.0.15
  all match the doc set), the e2e spec distribution (22+11+7+8+8+15+1=72),
  the `.env.example` completeness (every `process.env.*` read the code makes
  is documented), zero TODO/FIXME markers in src/scripts/prisma.

## Findings (the round's reads — all live, both apps)

**Watch round 69**: the JS axis MOVED — `/static/index-CqEsEwKA.js` →
`/static/index-B83bBhZf.js` — with the CSS axis STABLE
(`/static/index-BSn5NNZl.css`, cdn true, cfg true), the login family's
standing geometry MATCH, and the computed digest **15/15 MATCH** on the
one-login PASS 2 (the mobile header + drawer battery inside the digest:
header padL 24px, trigger 28px r8px, title x=68; drawer 288px, border-r
1px, X none, 11 hrefs, rows 32px, escape + unlock + grow-auto-close all
pass). The moved bundle is the standing platform-chunk-hash-rotation class
(zero app-face change through the move): the digest is the proof, the
battery + captures the full confirmation. The watch ledger's jsPath
re-bases to `B83bBhZf` in this round's commit per the intra-round doctrine
(re-based ONCE to the round's final read, born-verified on the quiet
state).

**THE ROUND'S ONE FINDING-CURE (F-1): DEPLOYMENT.md — the unswept sixth
doc carrying five stale claims.** `docs/DEPLOYMENT.md` is referenced from
README ("the details live in docs/DEPLOYMENT.md") and carries OPERATIONAL
claims an operator acts on, but the docs-counts pin's DOCS set covers only
the five companion docs — DEPLOYMENT.md rides outside every scan. The
WH-80 audit found five live-tense claims gone false:

1. **The ORBITAL name slip (three sites)** — §1 "ORBITAL ships as a single
   Next.js standalone build", §3 `https://orbital.example.com`, §4
   `file:/var/lib/orbital/custom.db`. The app is Wellness Hub everywhere
   else; "ORBITAL" is the sibling-project copy-paste genus the repo's own
   `docs/web-app-codebase-evaluation-report.md` documented in the siblings
   ("zero-balance/DEPLOYMENT.md says 'ORBITAL ships…' — copy-paste
   artifact from sibling project — Cosmetic [V]") — the same artifact live
   in THIS repo's deployment doc.
2. **§1's stale route counts** — "the 29 API route files (41 verb
   handlers)": the tree carries **31 route files** and **48 verb
   handlers** (8 DELETE + 15 GET + 16 POST + 9 PUT, counted recursively
   under src/app/api). Neither number is owned by any pin (the
   route-census pins the 15 FAMILIES, not the file/handler counts).
3. **§3's pre-cure AUTH_SECRET behavior** — "shorter values fall back to
   the insecure dev constant (with a server warning) instead of the
   run-time error an absent value raises": this describes the
   PRE-session-169/170 behavior. The shipping boot gate
   (`src/lib/boot-env.ts` L54-59 + `src/instrumentation.ts`, pinned by
   `tests/boot-env.test.ts` + smoke leg 13 "the secretless production
   boot refuses to serve") refuses to boot on a missing OR short
   AUTH_SECRET in production — the opposite operational posture. An
   operator reading §3 would believe a short secret merely degrades.
4. **§6's stale health shape** — `curl -s https://your-host/api/health #
   {"status":"ok",...}`: the live endpoint answers
   `{"ok":true,"data":{"status":"healthy","db":"up"}}` (session-36's
   honest-503 cure moved the status off "ok" and the envelope wraps it;
   verified live this round).

**THE CURE (RED→GREEN)**: a new sixth-doc claims scan in
`tests/docs-counts.test.ts` — DEPLOYMENT.md joins the pin's coverage with
the four claim forms: (a) the sibling-name forbidden forms (zero
`orbital`/`ORBITAL` matches, case-insensitive — a sibling name can never
be legitimate in this repo's deployment doc), (b) the route-count claim
computed LIVE from the tree (every `NN API route files (NN verb handlers)`
claim must match the recursive walk — tree drift trips the pin), (c) the
AUTH_SECRET row must carry the fail-hard form ("refuses to boot" — the
shipping behavior's own vocabulary, the same phrase family as the boot
gate's message), and (d) the health example must carry the live shape
("healthy"). RED at birth with exactly the five hits → GREEN: the four
doc claims cured. The scan itself adds one check: the count ladder moves
379 → 380 with CANONICAL + every doc site in the SAME commit.

## The ToDo list (the round's work packages)

- [x] **WP-1 — the intake + the baseline gate**: the fresh-clone recovery
  (install, .env + AUTH_SECRET, db push/seed/census MATCH, chromium-1248)
  + the baseline gate ALL GREEN on the recovered tree (lint 0/0 · tsc 0 ·
  unit 379/379 · build OK · smoke 14/14 · e2e 72/72 · census MATCH ·
  audit zero) — the evidence the clone is the exact WH-79 ship state.
- [x] **WP-2 — the watch round 69**: the JS-axis move read
  (`CqEsEwKA` → `B83bBhZf`, CSS stable, cdn + cfg true, the login
  geometry MATCH); the computed digest 15/15 MATCH (the mobile drawer
  battery inside); the ledger jsPath re-base prepared for the round's
  commit (the intra-round doctrine — re-based ONCE to the round's final
  read, born-verified after the edit).
- [x] **WP-3 — the battery**: the FORTY-SECOND full-width run across two
  reference login windows (the verified-kill dev-server restart at the
  window boundary per the WH-74 amendment), zero limiter trips expected.
- [x] **WP-4 — the capture round**: the canonical unmodified 34-file
  procedure on the fresh seed; the FIFTY-FIRST byte comparison; every
  mover root-caused + pixel-diffed against the git HEAD (WH-79) captures;
  the standing alternation families classified; the date-axis read
  recorded.
- [x] **WP-5 — THE CURE (TDD)**: the sixth-doc claims scan RED at birth
  (exactly the five hits: the three ORBITAL sites + the two stale route
  counts + the pre-cure AUTH_SECRET row + the stale health shape) → the
  four DEPLOYMENT.md claims cured GREEN → the count ladder moved 379 →
  380 with every doc site in the same commit → the docs-counts pin
  re-verified green + the full unit suite 380/380.
- [x] **WP-6 — the md5 ledger re-base** (if movers): the ledger re-based
  at WH-80 per the WH-70 structural-assertion doctrine, born-verified
  34/34.
- [x] **WP-7 — the full gate on the final tree**: lint 0/0 · tsc 0 · unit
  380/380 (the ladder FLAT at the new total with the docs-counts pin
  re-verified after the doc edits) · build OK · smoke 14/14 · e2e 72/72 ·
  census MATCH · bun audit zero.
- [x] **WP-8 — the docs ladder + the ship**: this plan (+ its execution
  record) + the session_161 log + the worklog WH-80 entry + the AGENTS
  round-69 record + the PAD §11 rows — README/CLAUDE/SKILL carrying the
  count-ladder move (379 → 380, the lockstep pin green); committed on
  main only and pushed through the SSH wrapper with the explicit
  `--remote git@github.com:nordeim/wellness-hub.git` (the WH-75 lesson),
  the remote ref verified, the operator key shredded.

## TDD note

ONE cure this round, landed RED→GREEN per the doctrine: the sixth-doc
claims scan written FIRST (RED at birth against the shipping DEPLOYMENT.md
— exactly the five hits, no more), then the four claims cured (GREEN),
then the ladder's own consequence (the +1 check moving 379 → 380) carried
through CANONICAL + every doc site in the SAME commit per the
count-ladder rule — the lockstep pin green only when every site agrees.
The scan's truth sources are the tree itself (the recursive route walk —
the same philosophy as the models scan) and the shipping behavior's own
vocabulary (the boot gate's "refuses to boot" phrase family + the live
health shape). History narration stays exempt by construction: the scan
reads only DEPLOYMENT.md's claim forms (the route-count sentence pattern,
the AUTH_SECRET table row, the §6 health example line, the name forms).

## Execution record (appended after the work packages landed)

- The full gate on the final tree: **lint 0/0 · tsc 0 · unit 380/380
  (26 suites, the ladder FLAT at the new total with the docs-counts pin
  re-verified after every doc edit — 14/14 in the docs-counts suite, the
  sixth-doc claims scan GREEN with all four claims cured) · build OK ·
  smoke 14/14 · e2e 72/72** (the mobile-navigation battery inside the
  ladder, the drawer family green) · census MATCH · bun audit zero.
- The watch + battery + capture detail (the standing procedure): watch
  round 69 read the js axis move (CqEsEwKA -> B83bBhZf, the css axis
  stable) with the computed digest 15/15 MATCH on the same run; the
  FORTY-SECOND full-width battery run green at 3,555/3,555 on every
  surface's first flight (zero transients, zero limiter trips, the
  verified-kill dev-server restart at the window boundary); the capture
  round on the fresh seed (badgesEarned=0 asserted, the light
  logged-out family first, ONE login, the phase-split + the 34
  mood-mirror write last, re-seed + census MATCH after) — the captures
  landing ~03:25 UTC Nov 6, same-day faces vs the WH-79 ledger's Nov 6
  faces.
- The FIFTY-FIRST comparison's final accounting: THREE movers, all
  classified standing environmental instances — 10-learning re-firing
  at the maxdelta-7 family's signature parameters (9 px / bbox 11x2 —
  fired WH-69 + WH-77, rested WH-78 + WH-79), 25-dark-login-focus
  re-firing at its EXACT recorded parameters (77 px / maxdelta 5 /
  bbox 367x121 — the habitat's third fire: WH-76, WH-79, WH-80), and
  30-tutorial-card-hover re-firing at its EXACT WH-79-birth parameters
  (17 px / maxdelta 40 / bbox 8x31 — the instance's second firing);
  RESTING: 24-dark-exercise-rows (the orange-corner family, after its
  WH-78/79 double) + 29-quick-actions-hover (the maxdelta-1 family,
  after its WH-76/77/78 triple). The date-axis CARRIED (the SECOND
  carry of the cycle) — the re-arm moves to the Nov 6 -> Nov 7
  crossing.
- The md5 ledger re-based at WH-80 (the WH-80 block born, WH-79
  demoted to prior, WH-70 rolled to the re-bases list, the stale
  duplicate tail line cleaned, the three mover rows re-hashed),
  born-verified 34/34 ZERO MOVERS — the re-base script's structural
  assertions tripping once on the first pass BEFORE any write (the
  WH-79 block's blank-line tail form; the assertion cured to the true
  form — the WH-70 doctrine held, the ledger never written in the
  failed state).
- The watch ledger's jsPath re-based to the round's final read
  (B83bBhZf) per the intra-round doctrine, born-verified on the quiet
  state: the re-run after the edit reads "assets stable" + the 15/15
  digest.
- The GREEN cure landed in lockstep: the four DEPLOYMENT.md claims
  cured (the Wellness Hub name at all three sites, the 31/48 route
  counts, the fail-hard AUTH_SECRET row, the live health shape) + the
  count ladder moved 379 -> 380 with CANONICAL + every doc site in
  the SAME commit (README x4 + AGENTS x2 + CLAUDE x2 + PAD x3 + the
  §8.1 infra row 171 -> 172 with the scan named + SKILL x2).
- The instrument scratch scripts (the byte comparison, the pixel
  diff, the md5 re-base) ran session-local outside the repo — the
  standing precedent (the committed scripts/watch-round.mjs and
  scripts/capture-round.mjs own the reconstructible procedures).
- The ship: the commit on `main` only (the round's change-set + the
  docs ladder), then the SSH-wrapper push with the operator key
  materialized outside the repo (0600, never printed, shredded after)
  and the explicit `--remote git@github.com:nordeim/wellness-hub.git`
  argument (the WH-75 lesson). The remote ref verified == local HEAD.
