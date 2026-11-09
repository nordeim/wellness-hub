# WH-94 Remediation Plan — the standing watch round + THE DEV-SCRIPT RELOAD-LOOP CURE (session 94 / session_202 + session_203)

Date: 2026-11-09 (UTC) · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/` — see the session_202/session93-plan/
worklog/session_203 inputs for the exact reference), the audit→plan→TDD→gate→
capture→docs→commit→push cadence, the repo skills as the method set (the
web-application/tdd/agent-browser/clone-app-pat-pro set; the skills/ folder
excluded from checking/testing/compilation). The operator's explicit checklist
re-verified standing at intake on the SURVIVING workspace (the round opened
~01:34 UTC Nov 9 — ~50 minutes AFTER the WH-93 captures landed at ~00:44-45 UTC
Nov 9, so this round's captures read SAME-DAY Nov 9 faces against the WH-93
ledger's Nov 9 faces: the date-axis family ("8"→"9" glyph) CARRIES, the
WH-91 precedent class — the next fire arms on the Nov 9 → Nov 10 crossing):
the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"`, the `db/` folder
at the repo root, custom.db + e2e.db + smoke.db standing), the tracked
`.env.example` (bidirectional, keys MATCH, only AUTH_SECRET's value differs by
design), the vitest/playwright configs (the e2e db PINNED at `file:../db/e2e.db`),
the sitemap/robots/manifest handlers (smoke leg 12), the mobile-navigation
battery (the e2e spec + the watch digest's drawer legs — escape + unlock +
grow-auto-close all green this round), and the eslint skills-exclude.

## Round inputs (validated live before this plan)

- The five docs + session_202 (the WH-93 working-session transcript) +
  session_203 (the WH-93 round summary) + the session93 plan (its execution
  record complete, all 8 WPs closed) + the worklog WH-93 entry read and
  validated against the pulled tree at HEAD `e942b10` (the workspace SURVIVED
  the round boundary — `git pull` fast-forwarded `495aa5f..e942b10`, one file:
  docs/session_203.md; node_modules, `.env` and db/ all standing, the WH-88/92
  fresh-clone recovery class NOT needed).
- The baseline gate ALL GREEN on the pulled tree — lint 0/0 · tsc 0 · unit
  382/382 (27 suites, the ladder FLAT at the WH-93 ship state) · build OK ·
  smoke 14/14 (the SEO family green: sitemap + robots + manifest) · e2e 72/72
  (the mobile-nav battery inside the ladder) · census MATCH · bun audit zero.
- The standing checklist items re-verified: the six Tailwind v4 `@source not`
  directives + the hover/dark `@custom-variant` pins + the `--shadow-sm`/
  `--blur-sm` re-pins, the playwright e2e db pin, the SEO route handlers, the
  eslint skills ignore, every tech-stack version claim, zero TODO/FIXME
  markers in src, the SKILL frontmatter stamp 2026-11-09 (this session94 plan
  is ALSO Nov 9 — the stamp STAYS, the WH-79 freshness contract holds).
- Current UTC at round open: ~01:34 Nov 9 — the WH-93 captures landed
  ~00:44-45 UTC Nov 9, so this round's captures land SAME-DAY Nov 9 faces vs
  the WH-93 ledger's Nov 9 faces — the date-axis family CARRIES (the
  SIXTEENTH expectation of the cycle reads HOLD, the WH-91 precedent class):
  the FIVE date-bearing faces (07-events + 26-events-inline-form +
  27-dark-mood-form + 28-routines-schedule-modal + 32-mentalhealth-form-
  interior) read byte-stable; the family re-arms on the Nov 9 → Nov 10
  crossing, carrying to WH-95.

## Findings (the round's reads — all live, both apps)

**Watch round 83: the QUIET read.** Both axes STABLE at the WH-93 re-based
ledger — css `/static/index-CD4jDvim.css` + js `/static/index-C5r-NJye.js`
(cdn true, cfg true — a quiet round on BOTH axes: a reading, never a
retirement, NO watch-ledger re-base), the login geometry MATCH, and the
computed digest **15/15 MATCH** on the SAME RUN (the mobile header + the full
drawer battery inside the digest — escape + unlock + grow-auto-close all
pass). The CDN companion doctrine applies regardless: the full-width battery
runs this round as every round (the runtime compiler can move computed values
without touching any bundle).

**THE FINDING (F-1, HIGH — infrastructure): `bun run dev` TEES ITS OWN LOG
INTO THE WATCHED TREE, AND THE WRITE LOOP COLLAPSES EVERY DEV-SERVER-DRIVEN
PROCEDURE.** The battery's window-1 first flight failed on ALL SIX our-side
logged-in legs (moodForm + shell + dashboard + headers + toolbars + kpis —
every leg a navigation timeout: `waitForSelector('main')` with 2×/4×/6×/7×
"waiting for … navigation to finish" retries) + the authviews walk (an
infinite "Forgot password?" click loop — the button detaching from the DOM on
every click, the page re-navigating to /login each time) + 2×
`POST /api/auth/login 400` (the form values wiped pre-submit) + the kpis leg's
"Navigation to /Routines is interrupted by another navigation to /login" (the
aborted login's missing cookie). The reference side (PASS A) was GREEN on
every leg that completed its read — the collapse was exclusively OUR side.
**The live diagnosis (console + navigation trace, captured against the
still-running server): the `next dev -p 3000 2>&1 | tee dev.log` script
writes the server's own request log INTO THE REPO ROOT, and Turbopack's file
watcher sees every write → `[Fast Refresh] rebuilding` → a FULL PAGE RELOAD
on every logged request → each reload generates MORE requests/log writes → a
self-sustaining reload loop** (`[nav] /login` every few hundred ms; the login
POST aborted with `net::ERR_ABORTED` mid-flight; the `?`-suffixed HMR reload
navigations). The loop's three rendered faces, all root-caused: (a) the
authviews click loop (the view swap's DOM detached by the reload before the
client state could land), (b) the 400 logins (the fill wiped by a reload
between fill and submit — the Zod seam correctly rejecting the empty pair),
(c) the navigation timeouts (the page never settling long enough for
`main` to read stable). **The verification, BOTH WAYS (the WH-34
both-states doctrine applied to infrastructure): the tee'd server reproduces
the loop live; the no-tee server (`bunx next dev -p 3000`, output redirected
OUTSIDE the tree) reads GREEN end-to-end — parity-login 38/38 MATCH +
parity-authviews 192/192 MATCH on the same clean run.**

**The F-1 class ALSO poisoned the round's first parity reads — the 3
googleHover* FALSE DRIFTS, root-caused + dissolved.** The window-1 login leg
first read `googleHoverBorder` ref 221,216,210 vs ours 233,230,224 +
`googleHoverBg` ref 241,238,234 vs ours 255,255,255 + `googleHoverShadow` ref
shadow vs ours none — three members that look like a reference-side
redeployment of the Google button's hover family. The decode: our `@theme`
tokens ALREADY carry the reference's hover values
(`--color-google-border-hover: #ddd8d2` = 221,216,210 +
`--color-google-bg-hover: #f1eeea` = 241,238,234 + the `hover:shadow-sm` arm),
and ours read the RESTING values — the reload loop raced the hover probe
(the hover landed, a reload wiped the computed state, the read caught the
fresh pre-hover face). The clean re-run reads all three MATCH (38/38) — the
drifts dissolved with the loop; NO parity cure, NO reference movement; the
F-1 false-drift class is the battery's own poison fruit, and the standing
doctrine applies: an our-side probe error voids the round's drift reads from
the same flight.

## The ToDo list (the round's work packages)

- [x] **WP-1 — the intake + the baseline gate**: the workspace SURVIVED the
  round boundary (git pull fast-forward `495aa5f..e942b10`, one file:
  docs/session_203.md; node_modules/.env/db/ standing) + the standing
  checklist re-verified + the baseline gate ALL GREEN (lint 0/0 · tsc 0 ·
  unit 382/382 · build OK · smoke 14/14 · e2e 72/72 · census MATCH · bun
  audit zero) — the evidence the tree is the exact WH-93 ship state.
- [x] **WP-2 — the watch round 83 (the QUIET read)**: both axes STABLE at the
  WH-93 re-based ledger (css `CD4jDvim` + js `C5r-NJye`, cdn true, cfg
  true); the login geometry MATCH and the computed digest 15/15 MATCH on the
  same run (the mobile header + the full drawer battery inside the digest —
  escape + unlock + grow-auto-close all pass); NO watch-ledger re-base (the
  quiet-axis doctrine: a reading, never a retirement).
- [x] **WP-3 — the F-1 finding + the live diagnosis**: window 1's first
  flight collapsed on the six our-side logged-in legs + the authviews walk
  (the navigation loop + the detached-element click loop + 2× 400 logins +
  the aborted POST) — diagnosed live against the still-running server with a
  console + navigation trace: the tee'd `dev.log` inside the watched tree
  fires a Fast Refresh full-reload on every logged request (the
  self-sustaining loop); the no-tee control flight reads parity-login
  38/38 + parity-authviews 192/192 GREEN — the 3 googleHover* false drifts
  root-caused (the reload race) + dissolved with the loop.
- [x] **WP-4 — THE F-1 CURE (TDD RED → GREEN)**: the src-census
  dev-script-hygiene pin written FIRST + verified RED (exactly the tee
  violation, one failure), then the two-line cure GREEN: package.json's dev
  script drops the `| tee dev.log` (`"dev": "next dev -p 3000"`), the stale
  repo-root `dev.log` removed, and the two live-tense `neo-crm_SKILL.md`
  narrations (the quick-start line + the tools table's `dev.log (tee'd)`
  entry) updated to the cured shape; the count-ladder lockstep in the SAME
  commit: the pin moved the ladder 382 → 383 (the canonical literal +
  every live-tense doc site: README ×4 + AGENTS ×2 + CLAUDE ×2 + PAD ×3 +
  the SKILL ×2 + the §8.1 infra row 172 → 173 recomputed + the docs-counts
  pin's canonical), the pin 14/14 green through every doc edit.
- [x] **WP-5 — the battery window 1 RE-RUN on the cured tree** (the six
  logged-in legs, the reference limiter aged past the first flight's spend):
  login + authviews GREEN on the clean control flight (38/38 + 192/192) +
  moodForm 20/20 + shell 61/61 + dashboard 105/105 + headers 192/192 +
  toolbars 114/114 + kpis 315/315 re-run against the CURED `bun run dev` —
  ALL EIGHT legs green on their first flights, 1,037 + 192 = the window's
  computed members live-vs-live, ZERO drifts, ZERO limiter trips.
- [x] **WP-6 — the battery window 2** (the verified-kill dev-server
  boundary + the reference limiter aged across it ~02:24 UTC): the nine
  remaining surfaces ALL GREEN on their first flights (profile 433/433 +
  account 146/146 + listinteriors 88/88 + moodjourney 116/116 + calendar
  92/92 + moodtiles 67/67 + routines 697/697 + tutorials 790/790 +
  schedmodal 89/89) — the FIFTY-SIXTH full-width run reading **3,555/3,555
  across all SEVENTEEN surfaces, ZERO drifts, ZERO limiter trips**; the
  two grid legs green on their first flights (the WH-92 reorder cure
  holds).
- [x] **WP-7 — the capture round + the SIXTY-FIFTH cross-round byte
  comparison**: the canonical 34-file procedure on the fresh seed (both
  clean-account guards standing — their FIFTH standing flight:
  badgesEarned=0 + themeMode=light both asserted before the light set, the
  fail-closed design), census MATCH after — the comparison read against
  the WH-93 ledger: **34/34 STABLE, ZERO MOVERS** — the date-axis family's
  SIXTEENTH expectation of the cycle reads CARRY (the captures landed
  ~02:15 UTC Nov 9 on SAME-DAY Nov 9 faces vs the ledger's Nov 9 faces),
  the 25 focus-ring interpolation tail RESTED (fired at WH-90/91/92/93),
  the RESTING families (19 + 24 + 29) held.
- [x] **WP-8 — the ledger re-bases (CONDITIONAL — movers only)**: NO movers
  fired — the md5 ledger UNTOUCHED (the WH-93 re-based form stands; the
  byte comparison's 34/34 zero-mover read is the on-disk ledger's own
  born-verification) and the watch ledger UNTOUCHED (the quiet round on
  both axes: css `CD4jDvim` + js `C5r-NJye` held — a reading, never a
  retirement).
- [x] **WP-9 — the full gate on the final tree**: lint 0/0 · tsc 0 · unit
  383/383 (27 suites, the ladder MOVED by the F-1 pin) · build OK · smoke
  14/14 · e2e 72/72 (the mobile-nav battery inside the ladder) · census
  MATCH · bun audit zero · the built CSS pipe-rule-FREE — ALL GREEN on the
  final tree.
- [x] **WP-10 — the docs ladder + the ship**: this plan (+ its execution
  record) + the session_204 log + the worklog WH-94 entry (prepended,
  born-verified) + the AGENTS round-83 record (the chain asserted at 61
  before the append, 62 after — script surgery on the giant line) + the PAD
  §11 rows (the two WH-94 rows: the F-1 dev-script reload-loop cure row +
  the quiet-watch/date-axis CARRY row — the phrase-collision check clean
  before the insert) + the SKILL frontmatter stamp STAYS 2026-11-09 (the
  same-date plan, the WH-79 freshness contract; the docs-counts pin 14/14
  green through every doc edit) — committed on main only and pushed
  through the SSH wrapper with the explicit
  `--remote git@github.com:nordeim/wellness-hub.git` (the WH-75 lesson),
  the remote ref verified, the operator key shredded; the
  working-session transcript (session_205.md) as the follow-up commit per
  the house pattern.

## TDD note

The round's code axis is the F-1 infrastructure cure: the pin
(`tests/src-census.test.ts`'s dev-script-hygiene block) is written FIRST and
verified RED against the tee'd script, then the two-line cure (package.json +
the stale dev.log removal + the two neo-crm_SKILL.md narration lines) reads
GREEN, and the count-ladder lockstep lands in the SAME commit (382 → 383,
the §8.1 infra row recomputed 172 → 173 — the WH-10 doctrine). The parity
surfaces carry NO cure this round: the watch's quiet read + the digest's
15/15 + the clean-flight re-runs are the standing tree's own proof, and the
3 googleHover* members dissolved as the F-1 loop's artifacts (verified BOTH
ways — the loop reproduces the drifts, the clean flight reads 38/38). The
capture procedure's standing guards (badgesEarned=0 + themeMode=light) fly
unmodified — their fifth standing flight since the WH-90 cure. The
date-axis CARRY expectation is a HOLD, not a drift: if the five date-bearing
faces move DESPITE the same-day faces, the round investigates before any
re-hash (the F-1 class taught this round: an our-side procedure artifact
reads as a drift until root-caused).

## Execution record (appended after the work packages landed)

- The watch (round 83): the QUIET read — both axes STABLE at the WH-93
  re-based ledger (css `/static/index-CD4jDvim.css` + js
  `/static/index-C5r-NJye.js`, cdn true, cfg true — the second consecutive
  quiet round on the re-based assets; a quiet round is a reading, never a
  retirement, NO watch-ledger re-base on either axis); the login geometry
  MATCH and the computed digest **15/15 MATCH** on the SAME RUN (the mobile
  header + the full drawer battery inside the digest — escape + unlock +
  grow-auto-close all pass).
- THE FINDING + THE CURE (F-1, HIGH — infrastructure, TDD RED → GREEN): the
  battery's window-1 first flight collapsed on every our-side leg — the
  live diagnosis (console + navigation trace) read the tee'd `dev.log`
  inside the watched tree firing a `[Fast Refresh] rebuilding` FULL PAGE
  RELOAD on every logged request: a self-sustaining loop (the authviews
  click loop, 2× 400 logins with the fill wiped pre-submit, the login POST
  aborted mid-flight, the 2×/4×/6×/7× never-settling navigations) + the
  three googleHover* FALSE drifts (the reload race reading the resting
  face; our `@theme` tokens already carry the reference's hover values).
  Verified BOTH ways per the WH-34 doctrine: the tee'd server reproduces
  the loop live; the no-tee control flight reads parity-login 38/38 +
  parity-authviews 192/192 GREEN. The cure: the src-census
  dev-script-hygiene pin written FIRST + verified RED (exactly the tee
  violation), then `package.json`'s dev script re-authored to
  `"dev": "next dev -p 3000"` (the tee dropped; the log writes belong to
  the caller, outside the tree), the stale repo-root `dev.log` removed, the
  two `neo-crm_SKILL.md` narrations updated — GREEN, the ladder 382 → 383
  (the WH-10 lockstep: the canonical + README ×4 + AGENTS ×2 + CLAUDE ×2 +
  PAD ×3 + the SKILL ×2 + the §8.1 infra row 172 → 173 recomputed; the
  docs-counts pin 14/14 green through every doc edit).
- The battery (the FIFTY-SIXTH full-width run, two reference login windows
  per the lesson-46 doctrine): window 1 on the CURED tree — ALL EIGHT legs
  green on their first flights (login 38/38 + authviews 192/192 + moodForm
  20/20 + shell 61/61 + dashboard 105/105 + headers 192/192 + toolbars
  114/114 + kpis 315/315); the boundary (the verified-kill dev-server
  down + the reference limiter aged across it to ~02:24 UTC), then window 2
  — ALL NINE GREEN on their first flights (profile 433/433 + account
  146/146 + listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 +
  moodtiles 67/67 + routines 697/697 + tutorials 790/790 + schedmodal
  89/89) — **3,555/3,555 across all SEVENTEEN surfaces, ZERO drifts, ZERO
  limiter trips** (the two grid legs green on their first flights — the
  WH-92 reorder cure holds).
- The capture round (the SIXTY-FIFTH cross-round byte comparison): the
  canonical 34-file procedure on the fresh seed — ONE clean run, both
  clean-account guards GREEN on their FIFTH standing flight
  (badgesEarned=0 + themeMode=light, the fail-closed design), census MATCH
  after. The comparison read against the WH-93 ledger: **34/34 STABLE,
  ZERO MOVERS** — the date-axis family's SIXTEENTH expectation of the
  cycle reads CARRY (the captures landed ~02:15 UTC Nov 9 on SAME-DAY
  Nov 9 faces vs the WH-93 ledger's Nov 9 faces — the WH-91 precedent
  class; the family re-arms on the Nov 9 → Nov 10 crossing, carrying to
  WH-95); the 25 focus-ring interpolation tail RESTED (fired at
  WH-90/91/92/93); the RESTING families (19 + 24 + 29) held. The app
  source's round change (the F-1 cure) carries no rendered face — the
  captures' own proof. NO ledger re-base: the md5 ledger untouched (the
  34/34 zero-mover read is the on-disk ledger's own born-verification),
  the watch ledger untouched (the quiet round).
- The instrument scratch scripts (the window drivers + the diagnosis
  probe + the capture round shell) ran session-local outside the repo —
  the standing precedent (the committed scripts/watch-round.mjs and
  scripts/capture-round.mjs own the reconstructible procedures).
