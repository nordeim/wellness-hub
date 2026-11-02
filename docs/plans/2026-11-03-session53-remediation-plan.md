# WH-53 Remediation Plan — the standing audit round (session 53)

Date: 2026-11-03 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round; the
session_101/session52-plan/worklog/session_102 inputs; this round executes
the session_101 tail's suggested-next).

## Round inputs (validated live before this plan)

- Fresh clone to `93f7661` (main, clean — the WH-52 ship `85a9aef` + the
  operator's session_102 log push). The environment rebuilt: bun 1.3.14,
  chromium 1248, `.env` copied with a fresh 64-hex AUTH_SECRET, db:push +
  db:seed + census MATCH (users=1 templates=11 steps=50 tutorials=12
  badges=8 moods=1).
- The five docs (AGENTS, CLAUDE, README, PAD, SKILL v1.50.0) + session_101
  + the session52 plan (its execution record complete) + the worklog
  WH-52 entry + session_102 read and validated against the tree: the
  WH-52 cure's four `@theme` tokens + the `LOGIN_LAYOUT.google`
  re-author byte-verified, the watch ledger at
  `jFHbfiCi.js`/`DbZzBCYa.css`, the login-views token pin + the src-census
  WH-19 widening in place, zero scratch residue, the instruction's
  checklist verified (`.env`/db contract, `.env.example` tracked,
  vitest/playwright configs 376/72, sitemap/robots/manifest route handlers
  standing [smoke leg 12], Tailwind v4 pins, eslint skills-exclude).
- **The baseline gate ALL GREEN at the exact WH-52 ship state: lint 0/0
  · tsc 0 · unit 376/376 (26 suites) · build OK · smoke 14/14 · e2e
  72/72 (the mobile-nav battery re-run explicitly — 8/8) · census MATCH
  · `bun audit` zero.**
- The Mode C audit of the WH-52 commit (`85a9aef`): CLEAN — the four
  tokens carry their decoded literal hexes with the LESSON-50 doctrine in
  the comment; the member re-author keeps the dark twins; the login-views
  pin covers the four arms + the negatives + the dark twins + the literal
  hexes; the src-census widening's twin-OR-flip rule holds on the tree.
- **The operator's SSH key verified CONSISTENT this round** (the WH-52
  transport corruption fixed at the source): the seed derives the
  embedded pub exactly, the container checks/padding/pub-copies all
  coherent. (The round's own artifact lesson: the first verification
  script compared PyNaCl's `crypto_sign_seed_keypair(seed)[1]` — the
  64-byte SECRET key — against the 32-byte pub; PyNaCl returns
  `(pk, sk)`, pk FIRST. The key was always good; the checker was wrong.
  Same class as the WH-52 parser mislabel: verify the verifier before
  trusting a failure.)

## Findings (the round's decodes — all live, both apps)

**Watch round 42: a DOUBLE-AXIS move — the second consecutive round on
both axes.** css `/static/index-DbZzBCYa.css` →
`/static/index-xihcXjhm.css` (the SEVENTH css CONTENT change in the
watch's history) + js `index-jFHbfiCi.js` → `index-GX9h1ywM.js` (the
TWENTY-SEVENTH distinct bundle; stable at both the round's first and
final reads — no intra-round move this window). The same-run computed
digest read **15/15 MATCH** — per the lesson-30 doctrine the full
battery walked the move.

**The battery (all seventeen surfaces, 3,555 members, split across the
reference login windows per the lesson-46 doctrine): ALL GREEN —
login 38/38 (the zero-login leg) · moodForm 20/20 · shell 61/61 (the
drawer battery, the instruction's mobile-menu emphasis) · dashboard
105/105 (the value settle-poll leg) · headers 192/192 · toolbars
114/114 · kpis 315/315 · routines 697/697 (the ORDER members re-read
green) · tutorials 790/790 (the ORDER members re-read green) · profile
433/433 · account 146/146 · authviews 192/192 · listinteriors 88/88 ·
moodjourney 116/116 · calendar 92/92 · schedmodal 89/89 · moodtiles
67/67. ZERO drift through the double-axis move — unlike round 41's css
move (which carried the Google button re-skin), THIS css content change
carried no rendered-face change on any walked surface.

**The eighteenth-surface candidate walk (the session_101 tail's
suggested-next, decode-first): ALL THREE RETIRED.**

- **(a) The preset picker's custom-color input state — RETIRED as
  wiring-equivalent + write-blocked.** The interaction itself (a color
  change) WRITES on the reference (its onChange persists to the shared
  account's prefs) — the zero-write doctrine forbids firing it. The
  wiring was therefore decoded ZERO-WRITE via React props inspection
  (`__reactProps$` — reading the handler source never fires it;
  `scripts/probe-customcolor.mjs`, committed as the round's evidence):
  the reference's color inputs AND hex inputs share the SAME live-apply
  onChange — `p=>r({...n,primary_color:p.target.value})` (spread the
  state, set the field, call the setter — no debounce, no gating) — the
  exact family of ours (`theme.setTheme({ primaryColor:
  e.target.value })`, the live skin + fire-and-forget `/api/prefs`
  sync). Both apps: 2 color inputs + 2 hex inputs, all controlled, the
  same at-rest values (#6366f1/#a855f7 — pinned by parity-profile's
  433 members). The probe's one artifact: a `main *`-anchored gradient
  leaf matched the REFERENCE's sidebar wordmark (its sidebar lives
  INSIDE its `<main>` — the WH-31 landmark-free DOM class; ours is a
  `complementary` outside main) — a DOM-shape artifact, not a face
  difference; the wordmark family is pinned byte-identical by
  parity-shell/parity-headers.
- **(b) The goals progress-logging flow — data-blocked STANDING.** The
  reference's demo account carries 0 goals (the watch digest's "Badges
  Earned 0 of 0 total", 0 tiles + parity-listinteriors' single-body
  goals page), so the progress-logging face is unobservable without
  writing a goal on the reference — forbidden. Retires as data-blocked
  (the WH-49/50 standing class).
- **(c) The events upcoming form beyond the empty state — data-blocked
  STANDING.** parity-moodjourney read the reference's upcoming list at
  the EMPTY state this round (`upcoming.events.emptyP.h: 88` both
  apps) — 0 events standing; creating one on the reference is a write.
  Retires as data-blocked.

**The F-2 axis re-read (the session_101 tail's third item): the shared
account's data churn.** parity-dashboard's t1 (Mood Entries) read green
through the settle-poll on this round's battery run (105/105); no
data-axis drift. The reference's own mood tile + MH page still carry
the 1-entry state byte-identically.

## Work packages

- **WP-1 — LANDED.** The watch ledger re-based ONCE on BOTH axes (css
  `xihcXjhm` + js `GX9h1ywM`) with the round-42 record; born-verified
  on BOTH outcomes (the firing state read live twice before the edit;
  the quiet state "assets stable" + 15/15 after it).
- **WP-2 — LANDED.** The fifteenth full-width battery run, all
  seventeen surfaces green (3,555/3,555), split across the reference
  login windows; the our-side login limiter restarted between windows
  (the lesson-46 doctrine) with one transient absorbed (the reference's
  post-redeploy on-demand compile exceeding a fixed wait — re-run
  green, the standing WH-51 class).
- **WP-3 — LANDED.** The candidate walk retired all three candidates on
  live decodes (the probe committed as the round's evidence; the
  data-blocked retirements documented above).
- **WP-4 — LANDED.** The capture round (the 24th cross-round byte
  comparison): 31/34 byte-stable, THREE movers ALL root-caused before
  the re-base — 10-learning (9 px / 0.0008%, maxdelta 7) +
  25-dark-login-focus (77 px / 0.0067%, maxdelta 5) +
  29-quick-actions-hover (5 px / 0.0004%, maxdelta 1) = the standing
  sub-visible rasterization signatures (the focus-ring captures are
  their standing habitat alongside the hover captures); the ledger
  re-based, verified 34/34; census MATCH after (the capture write +
  re-seed leaves the seed contract holding).
- **WP-5 (this plan's only remaining gate) — the full gate on the final
  tree** (lint · tsc · unit 376 · build · smoke · e2e 72 with the
  mobile-nav battery re-run explicitly · census · audit). The count
  ladder is FLAT this round (no test changes — a quiet round).
- **WP-6 — the docs ladder:** AGENTS (the round-42 record), PAD §11
  (the watch row's round-42 record + the candidate-walk retirement
  row), the worklog WH-53 entry, this plan + its execution record,
  `docs/session_103.md`. README/CLAUDE/SKILL carry no count sites this
  round (the ladder flat); the SKILL version stays v1.50.0 (no new
  lesson or surface — the round's decodes reinforced standing lessons).
- **WP-7 — the commit + the SSH-wrapper push to `main`** (no new
  branches; the operator key materialized outside the repo and
  shredded after, per the runbook; the key verified consistent at
  intake).

## The round's deviations from the plan

One, absorbed in-flight: the capture round's first run tripped OUR OWN
login limiter (18 our-side logins across the battery + the probe — the
WH-42 F-4 class); the dev-server restart + re-seed re-run captured
clean. And one checker artifact (the PyNaCl pk/sk index) documented in
the round inputs — the key itself needed no repair this round.
