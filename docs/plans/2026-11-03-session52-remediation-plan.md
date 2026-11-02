# WH-52 Remediation Plan — the semantic-token migration round (session 52)

Date: 2026-11-03 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round; the
session_99/session51-plan/worklog/session_100 inputs; this round executes
the session_100 tail's suggested-next).

## Round inputs (validated live before this plan)

- Fresh clone to `3767f5a` (main, clean — the WH-51 ship `52f500e` + the
  operator's session_100 log push). The environment rebuilt: bun 1.3.14,
  chromium 1248, `.env` copied with a fresh 64-hex AUTH_SECRET, db:push +
  db:seed + census MATCH (users=1 templates=11 steps=50 tutorials=12
  badges=8 moods=1).
- The five docs (AGENTS, CLAUDE, README, PAD, SKILL v1.49.0) + session_99
  + the session51 plan (its execution record complete) + the worklog
  WH-51 entry + session_100 read and validated against the tree: the
  WH-51 cure's three sites byte-verified (`od -c` on the ternary — the
  known `[m`-swallowing display artifact, not a defect), the watch
  ledger at `CEYMtRjl.js`/`CapATpwD.css`, `scripts/parity-moodtiles.mjs`
  in place, zero scratch residue, the instruction's checklist verified
  (`.env`/db contract, `.env.example` tracked, vitest/playwright configs
  375/72, sitemap/robots/manifest route handlers standing [smoke leg
  12], Tailwind v4 pins, eslint skills-exclude).
- **The baseline gate ALL GREEN at the exact WH-51 ship state: lint 0/0
  · tsc 0 · unit 375/375 (26 suites) · build OK · smoke 14/14 · e2e
  72/72 (the mobile-nav battery re-run explicitly — 8/8) · census MATCH
  · `bun audit` zero.**
- The Mode C audit of the WH-51 commit (`52f500e`): CLEAN — the record +
  shared arms + composed ternary follow the ROUTINE_CATEGORY_GRADIENTS
  precedent; the capture-24 row-wait cure is a deterministic
  rendered-fact wait; the watch ledger re-base born-verified; the
  standing config blocks re-verified (the playwright db pin, the vitest
  scoping, the @theme v3 pins, the eslint ignores, the SEO handlers).

## Findings (the round's decodes — all live, both apps)

**Watch round 41: a DOUBLE-AXIS move — the round-20/27/28/30/31/32
class.** css `/static/index-CapATpwD.css` → `/static/index-DbZzBCYa.css`
(the SIXTH css CONTENT change in the watch's history, the first since
round 32 — the rarest signal) + js `index-CEYMtRjl.js` →
`index-CC9AG2Dw.js` (the TWENTY-FIFTH distinct bundle). The same-run
computed digest read **15/15 MATCH** — but per the lesson-30 doctrine
the full battery walked the move (below).

**The battery (all seventeen surfaces, 3,551 members, split across the
reference login windows per the lesson-46 doctrine):** fifteen legs
green — moodForm 20/20 · shell 61/61 (the drawer battery, the
instruction's mobile-menu emphasis) · headers 192/192 · toolbars 114/114
· kpis 315/315 · routines 697/697 · tutorials 790/790 · profile 433/433
· account 146/146 · authviews 192/192 · listinteriors 88/88 ·
moodjourney 116/116 · calendar 92/92 · schedmodal 89/89 · moodtiles
67/67 — and TWO findings:

- **F-1 (the round's core): the login Google button's family moved.**
  parity-login fired **2 DRIFT of 34** — `googleBorder` ref
  `rgb(233, 230, 224)` vs ours `rgb(226, 232, 240)` (slate-200),
  `googleColor` ref `rgb(15, 14, 14)` vs ours `rgb(51, 65, 85)`
  (slate-700). Decoded live (zero-login — the logged-out face): the
  reference re-authored the button onto a **platform semantic-token
  layer** — `bg-[var(--sem-surface-interactive-white-default)]`,
  `text-[color:var(--sem-text-icon-primary)]`,
  `border-[var(--sem-border-light-default)]`, hover
  `--sem-surface-interactive-white-hover` +
  `--sem-border-default-default` — the Base44 platform's `--sem-*`
  migration riding the css content change. The RESOLVED facts: at-rest
  border `rgb(233,230,224)` (#e9e6e0, a WARM gray — not stone-200
  #e7e5e4, not slate-200), ink `rgb(15,14,14)` (#0f0e0e), bg white;
  hover border `rgb(221,216,210)` (#ddd8d2), hover bg `rgb(241,238,234)`
  (#f1eeea), ink unchanged on hover, shadow-sm both. The geometry is
  byte-identical (54×368, r12, 1px border, gap 12, fs 16/fw 500); the
  icon is 20×20 and INERT on hover (the reference's `group` class is a
  platform convention, no effect). The token RAW values read empty at
  `:root` (defined at another scope) — the resolved computed values are
  the contract (lesson 40). The same re-authored button sits on the
  reference's login view only — its client-swap signup view still has
  NO Google button (our documented decode holds), and its `/signup`
  URL now REDIRECTS to `/login` (the WH-46 decode had it 404 — a
  routing note, not a rendered-face drift; our `/signup` page stays the
  documented working superset).

- **F-2 (the data axis): the dashboard t1 value flickers on the
  reference.** parity-dashboard fired **1 DRIFT of 105 —
  intermittently**: `t1_valueText` ref 0 vs ours 1 on two of four
  runs; a follow-up poll read ref **0×6 consecutive** (1.2s apart);
  one battery re-run in between read MATCH (ref 1). Ours reads a
  stable 1 (the standing post-e2e residue — the demo seed itself has
  workouts=0). The reference's t1 was 1 through thirteen prior
  full-width runs. Classification pending the settle flight (WP-3):
  a reference-side transient (its aggregate re-resolving after the
  round's double redeploy) vs a real demo-data change on the shared
  account (the feed read settles it).

**The eighteenth-surface candidate walk (the session_100 tail's
suggested-next, decode-first, our-side flight + ONE batched reference
flight):** (a) the energy slider at a non-default value — **retires**:
both apps render the identical at-rest AND moved faces (8px gray-200
track, no fill on move, appearance none, value 5→8 via the same
keyboard steps; the thumb pseudo-read rides WP-3's settle flight to
close it thoroughly); (b) the Daily Reflection textarea focused —
**retires**: the rendered focus faces are byte-identical (border
`rgb(229,229,229)`, the `rgb(10,10,10)` 1px ring, the 0.05-alpha sm
shadow, h=60 — ours carrying the v4 var-chain zero-layers
serialization artifact, the known lesson-40 class); (c) the routines
filter chips — **retires on a false premise**: NEITHER app carries a
chips row on /routines (the reference's page shows only the template
grid; ours the same — the session_100 prescription's premise was
wrong, the lesson-41 premise class).

## Work packages

- **WP-1 (F-1, TDD):** RED — a new `it` in `tests/login-views.test.ts`
  pinning `LOGIN_LAYOUT.google`'s four token-consuming arms
  (`border-google-border`, `text-google-ink`,
  `hover:border-google-border-hover`, `hover:bg-google-bg-hover`) + the
  negatives (the four slate arms gone) + the dark twins retained; the
  same block pins the four @theme tokens' literal hex (the
  literal-hex doctrine); AND the `src-census` WH-19 dark-pair census
  WIDENED — custom @theme color-token arms join the walk (the google
  arms are the first custom arms in LOGIN_LAYOUT; without the widening
  they'd silently escape the blanket), the rule staying honest:
  a custom arm is dark-covered by EITHER a `dark:` twin of the same
  utility head OR its token carrying a `.dark` override (the
  semantic tokens' own mechanism — `--color-ring`/`--color-foreground`
  flip; the google arms carry explicit twins). The ladder moves
  **375 → 376** (one new `it`; the census widening rides its existing
  block — the WH-47 precedent). GREEN — four tokens in `@theme`
  (`--color-google-border: #e9e6e0`, `--color-google-ink: #0f0e0e`,
  `--color-google-border-hover: #ddd8d2`,
  `--color-google-bg-hover: #f1eeea`) + the `LOGIN_LAYOUT.google`
  light arms re-authored onto them (the dark arms untouched — our
  documented dark superset). Live verification: parity-login 34/34.
- **WP-2 (F-1's verification net, lesson 49's own doctrine):**
  `scripts/parity-login.mjs` WIDENED with a Google-button HOVER pass —
  +4 members (hoverBorder, hoverBg, hoverInk-unchanged,
  hoverShadowPresence), 34 → **38**; the zero-login/zero-write
  invariants HOLD (a hover is client-state, no click, no login — the
  docstring's "no interactions" clause amended to "no clicks, ONE
  hover pass"). Born-verified 38/38 ×3 consecutive flights.
- **WP-3 (F-2):** the settle flight (ONE reference login, batched):
  the dashboard feed rows (a workout row dated this week ⇒ the 0s are
  the reference's transient aggregate; no row ⇒ a real demo-data
  change on the shared account) + the t1 value poll + the energy
  slider's THUMB pseudo-element styles on both apps (closing candidate
  (a) thoroughly). Response per the classification: a procedure
  hardening on `parity-dashboard` (the value settle-poll — the
  rendered-fact wait doctrine, the WH-51 capture-24 cure's own class)
  or a PAD §11 documentation row (the shared-account data axis).
- **WP-4:** the watch ledger re-base on BOTH axes (css `DbZzBCYa` + js
  `CC9AG2Dw`) — born-verified on BOTH outcomes (the firing state and
  the quiet state).
- **WP-5:** the battery re-ride of the touched legs on the cured tree
  (login 38/38; dashboard per WP-3's outcome).
- **WP-6:** the capture round — the TWENTY-THIRD cross-round byte
  comparison; the login-family captures are the cure's deliberate
  face (the changed band root-caused before any re-base, the standing
  doctrine); `.env.example` re-verified against the tree.
- **WP-7:** the docs ladder — SKILL v1.49.0 → v1.50.0 (the parity row
  login 34→38 + the round's records + LESSON 50), PAD §11 (the F-1
  cure row + the F-2 axis row + the watch row's round-41 double-move
  record), AGENTS (round 41 + the battery counts), the count-ladder
  sites 375 → 376 across all five docs (the lockstep enforcer), the
  worklog WH-52 entry, this plan's execution record,
  `docs/session_101.md`; `docs-counts` lockstep green.
- **WP-8:** the full gate on the final tree (lint 0/0 · tsc 0 · unit
  376/376 · build · smoke 14/14 · e2e 72/72 · the mobile-nav battery
  re-run explicitly · census MATCH · audit zero).
- **WP-9:** the commit + the SSH-wrapper push to `main` (no new
  branches), the operator key materialized outside the repo and
  shredded after (the runbook).

## The round's class (a new lesson)

**LESSON 50 (candidate): a platform's semantic-token migration lands as
a css-content move carrying ONE quiet re-skin — pin the RESOLVED face
and author non-palette values as tokens, never as the nearest palette
neighbor.** The reference moved its Google button onto `--sem-*`
platform tokens; every hash-watcher saw only the css move, the digest
read 15/15, and only the zero-login login surface caught the two
members. The resolved border `#e9e6e0` is NEITHER slate-200 nor
stone-200 — "the nearest palette class" would have been silent drift
(the WH-51 amber/orange lesson's own form: name values by their HEX).
The cure authors the four resolved values as @theme tokens (the
literal-hex doctrine), and the hover arms — which NO surface read —
join the net the same round (lesson 49 applied to its own successor).

## Suggested next (WH-53)

The watch (round 42) + the seventeen-surface battery on the cured tree
(login now 38); the eighteenth-surface candidates from the standing
unwalked set (the preset picker's custom-color input state, the goals
progress-logging flow — data-blocked standing, the events upcoming form
beyond the empty state); the F-2 axis re-read (the shared account's
data churn is a standing watch candidate); the routines/tutorials ORDER
members re-read (the reference's active development keeps re-ordering).

## Execution record (WH-52, 2026-11-03)

Executed to completion, same-day, all nine work packages:

- **WP-1 (F-1, TDD) — LANDED.** RED: the login-views `it` (the four
  token arms + the negatives + the dark twins retained + the four
  @theme literal-hex pins) failed exactly as expected; the src-census
  WH-19 widening (custom @theme color-token arms join the dark-pair
  walk — the twin OR the token's own `.dark` override, the flip
  mechanism verified live on `--color-ring`/`--color-foreground`)
  introduced ZERO surprise firings on the standing tree (the widening
  is a no-op until the cure lands). GREEN: the four tokens
  (`--color-google-border: #e9e6e0`, `--color-google-ink: #0f0e0e`,
  `--color-google-border-hover: #ddd8d2`,
  `--color-google-bg-hover: #f1eeea`) + the `LOGIN_LAYOUT.google`
  light-arm re-author (the dark arms untouched). Ladder 375 → 376
  with all count sites updated in the same commit (the lockstep
  enforcer green). Live: parity-login 34/34.
- **WP-2 — LANDED.** parity-login widened with the hover pass (+4
  members → 38; zero-login/zero-write held — one hover, no clicks);
  born-verified **38/38 ×3 consecutive flights**.
- **WP-3 — LANDED, with a decode correction.** The settle flights
  classified the dashboard drift as the reference's post-redeploy
  VALUE-resolution race (its Mood Entries tile reads **1 stably,
  5/5 polls**, its MH page carrying the entry live; the intermittent
  0s are pre-resolution reads) — NOT a data change. The cure is the
  VALUE settle-poll on parity-dashboard (two consecutive identical
  reads, bounded), verified 105/105 ×2. The decode's own correction:
  the drifting member `t1_valueText` is the MOOD ENTRIES tile (the
  script's t0..t3 naming), not Workouts — the first settle flight
  polled the wrong tile and the classification flight corrected it
  (re-check which member a name reads before classifying its drift).
  The slider's THUMB pseudo-element read closed candidate (a)
  byte-identically.
- **WP-4 — LANDED.** The ledger re-based ONCE on BOTH axes (css
  `DbZzBCYa` + js `jFHbfiCi`, the TWENTY-SIXTH bundle — the round's
  intra-round move class), born-verified on BOTH outcomes (the firing
  state live, the quiet state "assets stable" + 15/15).
- **WP-5 — LANDED.** The touched legs re-ridden green on the cured
  tree: login 38/38 (×3), dashboard 105/105 (×2). The other fifteen
  legs' green runs stand (the cure touched only the login-family
  member + four NEW tokens — no other surface reads either).
- **WP-6 — LANDED.** The 23rd cross-round byte comparison: 29/34
  byte-stable, five movers ALL root-caused before the re-base (01 +
  13 = the cure's deliberate faces, the pixel bands exactly the
  button's rects at maxdelta 71; 10/29/30 = the standing sub-visible
  rasterization signatures); the ledger re-based, verified 34/34;
  `.env.example` re-verified against the tree (unchanged — no new env
  contracts this round).
- **WP-7 — LANDED.** SKILL v1.50.0 (the parity row login 34 → 38 +
  LESSON 50), PAD §11 (three new rows + the watch row's round-41
  record), AGENTS (round 41 + the candidate-walk record), the
  count-ladder sites 375 → 376 across all five docs, the worklog
  entry, this record, `docs/session_101.md`; docs-counts 10/10.
- **WP-8 — LANDED.** The full gate green on the final tree (lint 0/0
  · tsc 0 · unit 376/376 · build OK · smoke 14/14 · e2e 72/72 with
  the mobile-nav battery re-run explicitly 8/8 · census MATCH · bun
  audit zero).
- **WP-9 — LANDED.** The commit + the SSH-wrapper push to `main`
  (no new branches; the operator key materialized outside the repo
  and shredded after, per the runbook).

**The round's deviations from the plan**: one — the F-2 settle
flight's first poll read the wrong tile (the t0..t3 naming vs the
label assumption; the workouts tile reads 0=0 on both apps, masking
the question). The correction flight (polling the Mood Entries tile
directly + the MH page state in the same login) settled the
classification; the plan's WP-3 response tree resolved to the
procedure-hardening branch, exactly as written.
