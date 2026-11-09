# WH-96 Remediation Plan — the standing quiet watch + THE DRIVER-PIPE WEDGE (session 96 / session_208 + session_209)

Date: 2026-11-09 (UTC) · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/` — see the session_208/session95-plan/
worklog/session_209 inputs for the exact reference), the audit→plan→TDD→gate→
capture→docs→commit→push cadence, the repo skills as the method set (the
web-application/tdd/agent-browser/clone-app-pat-pro set; the skills/ folder
excluded from checking/testing/compilation). The operator's explicit checklist
re-verified standing at intake on the SURVIVING workspace (the first
surviving-workspace round since WH-93: one `git pull` fast-forward
`66169b0..b0889c0`, one file — docs/session_209.md, the WH-95 round summary;
node_modules + `.env` + db/ all standing from the WH-95 session): the `.env`/db
contract (`DATABASE_URL="file:../db/custom.db"`, the `db/` folder at the repo
root, custom.db + e2e.db + smoke.db standing after the gate), the tracked
`.env.example` (bidirectional, keys MATCH, only AUTH_SECRET's value differs by
design), the vitest/playwright configs (the e2e db PINNED at
`file:../db/e2e.db`), the sitemap/robots/manifest handlers (src/app/sitemap.xml
+ robots.txt + manifest.json, smoke leg 12), the mobile-navigation battery
(the e2e spec + the watch digest's drawer legs — escape + unlock +
grow-auto-close all green this round), and the eslint skills-exclude.

## Round inputs (validated live before this plan)

- The five docs + session_208 (the WH-95 working-session transcript) +
  session_209 (the WH-95 round summary) + the session95 plan (its execution
  record complete, all 10 WPs closed) + the worklog WH-95 entry read and
  validated against the surviving tree at HEAD `b0889c0`.
- The baseline gate ALL GREEN on the pulled tree — lint 0/0 · tsc 0 · unit
  383/383 (27 suites, the ladder FLAT at the WH-95 ship state) · build OK ·
  smoke 14/14 (the SEO family green: sitemap + robots + manifest) · e2e
  72/72 (the mobile-nav battery inside the ladder) · census MATCH · bun
  audit zero.
- The standing checklist items re-verified: the six Tailwind v4 `@source not`
  directives + the hover/dark `@custom-variant` pins + the `--shadow-sm`/
  `--blur-sm` re-pins, the WH-94 F-1 dev-script cure standing
  (`"dev": "next dev -p 3000"` — no tee), the playwright e2e db pin, the
  SEO route handlers, the eslint skills ignore, zero TODO/FIXME markers in
  src, the SKILL frontmatter stamp 2026-11-09 (this session96 plan is ALSO
  Nov 9 — the stamp STAYS, the WH-79 freshness contract holds).
- Current UTC at round open: ~04:18 Nov 9 — the WH-95 captures landed
  ~03:47-50 UTC Nov 9, so this round's captures land SAME-DAY Nov 9 faces vs
  the ledger's Nov 9 faces — the date-axis family's EIGHTEENTH expectation of
  the cycle reads CARRY (the WH-91 precedent class): the FIVE date-bearing
  faces (07-events + 26-events-inline-form + 27-dark-mood-form +
  28-routines-schedule-modal + 32-mentalhealth-form-interior) read
  byte-stable; the family re-arms on the Nov 9 → Nov 10 crossing, carrying
  to WH-97.

## Findings (the round's reads — all live, both apps)

**Watch round 85: the QUIET read.** Both axes STABLE at the WH-93 re-based
ledger — css `/static/index-CD4jDvim.css` + js `/static/index-C5r-NJye.js`
(cdn true, cfg true — the FOURTH consecutive quiet round on the re-based
assets: a reading, never a retirement, NO watch-ledger re-base), the login
geometry MATCH, and the computed digest **15/15 MATCH** on the SAME RUN (the
mobile header + the full drawer battery inside the digest — escape + unlock +
grow-auto-close all pass). The CDN companion doctrine applies regardless:
the full-width battery runs this round as every round.

**THE FINDING (F-1, HIGH — session-local driver instrumentation, NOT a repo
defect): the undrained-pipe wedge.** The battery's window-1 first flight
collapsed at leg 6 (headers — a navigation timeout on OUR side after legs 1-5
green on their first flights: login 38/38 + authviews 192/192 + moodForm
20/20 + shell 61/61 + dashboard 105/105), and the immediate re-run repeated
the collapse on its legs 2-3 (toolbars + kpis) while its leg 1 (headers
192/192) went GREEN — the WH-66 first-flight-errors-are-infrastructure
class. The live evidence ruled the usual suspects out one by one: no OOM (2.6
GB available), no stray chromium, no db writes from the login (db/custom.db
mtime untouched — the WH-94 F-1 watcher class ruled out), the wedged
next-server's main thread in a pure-utime spin with all workers idle, and a
SELF-RECOVERY (~200 in 0.096s after the driver exited). The capture round
then failed DETERMINISTICALLY at capture-round.mjs:136 (the second /Events
goto) at exactly ~48s, TWICE, on fresh servers — and the bisection isolated
it: (a) the verbatim canonical-cut probe (the exact pre-136 sequence on a
nohup file-stdio server) — NO HANG; (b) the same sequence + snaps writing
into docs/screenshots/ — NO HANG (the watcher-load class ruled out); (c) the
exact driver re-run (the dev server's stdio PIPED into the driver) — the
hang REPRODUCED a third time at exactly 48s; (d) the same driver with the
dev server's stdio → FILE — the FULL canonical capture round completed clean
(107s). **The root cause: the session-local window drivers spawned the dev
server with PIPED stdio drained by data-event listeners, then ran the
parity/capture legs back-to-back inside `execSync` with NO event-loop turns —
the dev server's request/compile logs filled the 64 KB pipe buffer, the
server's main thread BLOCKED writing its log, and the server stopped serving
until the driver unfroze.** The deterministic ~48s fill point is the
byte-count-deterministic log volume of the canonical capture sequence; the
window-1 leg-6 collapse is the same pipe filling across the eight-leg
execSync loop. **The classification — ZERO app-source:** the git tree
byte-clean at HEAD through every incident (the zero-drift battery + the
git-clean captures are the proof), the committed instruments
(capture-round.mjs, the parity-*.mjs set, watch-round.mjs) untouched and
correct, the WH-94-cured no-tee dev script standing, and the prior
fifty-seven full-width batteries ran on drivers that drained or
file-redirected their servers' stdio. The window-1 legs 6-8 completed GREEN
on isolated single-leg re-flights (fresh boot per leg — the WH-66 re-run
precedent; the reference limiter aged ~15 min across the boundary after the
failed first flights spent the 10/10 login budget).

**The battery: ZERO drifts — the standing tree verified, NO code cure.** The
FIFTY-EIGHTH full-width run across two reference login windows: window 1
ALL EIGHT legs green (login 38/38 + authviews 192/192 + moodForm 20/20 +
shell 61/61 + dashboard 105/105 green on their first flights; headers
192/192 + toolbars 114/114 + kpis 315/315 green on the isolated re-flights —
1,037 computed members), window 2 ALL NINE green on their FIRST flights on
the F-1-cured file-stdio driver (profile 433/433 + account 146/146 +
listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 + moodtiles
67/67 + routines 697/697 + tutorials 790/790 + schedmodal 89/89 — 2,518
computed members) — **3,555/3,555 across all SEVENTEEN surfaces, ZERO
drifts, ZERO limiter trips** (the two grid legs green — the WH-92 reorder
cure holds).

**The SIXTY-SEVENTH cross-round byte comparison: 34/34 ZERO MOVERS.** The
canonical 34-file procedure on the Y-cured driver — ONE clean run, the
clean-account guards' SEVENTH standing flight GREEN (badgesEarned=0 +
themeMode=light, the fail-closed design), census MATCH after; the
intermediate partial captures of the failed wedge attempts fully overwritten
by the clean run. The captures landed ~05:14-16 UTC Nov 9 on SAME-DAY Nov 9
faces — the date-axis family's EIGHTEENTH expectation reads CARRY (the five
date-bearing faces byte-stable). The 25-dark-login-focus interpolation tail
RESTED (its thirteenth firing was WH-95); the 29 dither-phase class RESTED
(its first capture-axis firing was WH-95); the resting families (19 + 24 +
30) held. **NO ledger re-base on either ledger:** the md5 ledger untouched
(the 34/34 zero-mover read is its own born-verification — the WH-94
precedent), the watch ledger untouched (the quiet round on both axes). The
git tree byte-clean at HEAD after the captures — the standing PNG set
byte-identical to the WH-95 ship state, the zero-mover read's own proof.

## The ToDo list (the round's work packages)

- [x] **WP-1 — the intake + the surviving-workspace verification + the
  baseline gate**: the workspace SURVIVED the round boundary (the first
  surviving round since WH-93 — one `git pull` fast-forward
  `66169b0..b0889c0`, one file: docs/session_209.md) + the standing
  checklist re-verified live + the baseline gate ALL GREEN (lint 0/0 · tsc 0
  · unit 383/383 · build OK · smoke 14/14 · e2e 72/72 · census MATCH · bun
  audit zero).
- [x] **WP-2 — the watch round 85 (the QUIET read)**: both axes STABLE at
  the WH-93 re-based ledger (css `CD4jDvim` + js `C5r-NJye`, cdn true, cfg
  true — the fourth consecutive quiet round); the login geometry MATCH and
  the computed digest 15/15 MATCH on the same run (the mobile header + the
  full drawer battery inside the digest — escape + unlock + grow-auto-close
  all pass); NO watch-ledger re-base (the quiet-axis doctrine: a reading,
  never a retirement).
- [x] **WP-3 — the battery window 1 + THE F-1 FINDING (the undrained-pipe
  wedge, root-caused by bisection)**: legs 1-5 green on their first flights;
  the leg-6/7/8 collapse diagnosed live (the suspects ruled out one by one:
  OOM, chromium strays, the db-write watcher class, the GC-storm reading),
  the reference-limiter budget arithmetic (10/10 spent by the failed first
  flights → the aging boundary), then the isolated single-leg re-flights —
  headers 192/192 + toolbars 114/114 + kpis 315/315 GREEN — window 1
  complete 8/8 (1,037 members); the bisection trail (the canonical-cut
  probe, the watcher-load probe, the exact-driver repro X, the file-stdio
  cure Y) isolating the undrained-pipe root cause — session-local driver
  instrumentation, ZERO app-source (the tree byte-clean at HEAD through
  every incident).
- [x] **WP-4 — the capture round + the SIXTY-SEVENTH cross-round byte
  comparison**: the canonical 34-file procedure on the Y-cured driver — ONE
  clean run (107s), both clean-account guards GREEN on their SEVENTH
  standing flight (badgesEarned=0 + themeMode=light, the fail-closed
  design), census MATCH after — the comparison read against the ledger:
  **34/34 ZERO MOVERS** (the date-axis family's eighteenth expectation
  CARRY — same-day Nov 9 faces, ~05:14-16 UTC captures; the 25 tail + the
  29 dither class + the resting families 19 + 24 + 30 all byte-held; the
  failed attempts' partial captures fully overwritten by the clean run).
- [x] **WP-5 — the battery window 2 on the F-1-cured file-stdio driver**:
  ALL NINE legs green on their FIRST flights (profile 433/433 + account
  146/146 + listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 +
  moodtiles 67/67 + routines 697/697 + tutorials 790/790 + schedmodal
  89/89 — 2,518 members) — the FIFTY-EIGHTH full-width run reading
  **3,555/3,555 across all SEVENTEEN surfaces, ZERO drifts, ZERO limiter
  trips**.
- [x] **WP-6 — the movers' classification: NONE** — the zero-mover read
  needs no both-ways verification (no mover rows to classify); the standing
  tree's byte-stability is the read's own proof.
- [x] **WP-7 — NO ledger re-bases**: the md5 ledger UNTOUCHED (the 34/34
  zero-mover read is its own born-verification — the WH-94 no-re-base
  precedent); the watch ledger UNTOUCHED (the quiet round on both axes —
  the fourth consecutive).
- [x] **WP-8 — the docs ladder**: this plan (+ its execution record) + the
  session_210 log + the worklog WH-96 entry (prepended, born-verified) +
  the AGENTS round-85 record (the chain asserted at 63 before the append,
  64 after — script surgery on the giant line) + the PAD §11 rows (the two
  WH-96 rows: the F-1 driver-pipe finding row + the quiet-watch/date-axis
  CARRY row — the phrase-collision check clean before the insert) + the
  SKILL frontmatter stamp STAYS 2026-11-09 (the same-date plan, the WH-79
  freshness contract); the count ladder FLAT at 383/27 (no code cure, no
  test edits — the docs-counts pin green through every doc edit).
- [x] **WP-9 — the full gate on the final tree**: lint 0/0 · tsc 0 · unit
  383/383 (27 suites, the ladder FLAT) · build OK · smoke 14/14 · e2e
  72/72 (the mobile-nav battery inside the ladder) · census MATCH · bun
  audit zero · the built CSS pipe-rule-FREE — ALL GREEN on the final tree.
- [x] **WP-10 — the ship**: committed on main only and pushed through the
  SSH wrapper with the explicit
  `--remote git@github.com:nordeim/wellness-hub.git` (the WH-75 lesson),
  the remote ref verified, the operator key shredded (materialized outside
  the repo at 0600, never printed); the working-session transcript
  (session_211.md) as the follow-up commit per the house pattern.

## TDD note

The round carries NO code cure — the battery read zero drifts on all
seventeen surfaces, the watch read both axes quiet, and the capture
comparison read zero movers, so the standing tree is its own verification
(the WH-93/95 no-cure precedent). The round's one finding (F-1) is
SESSION-LOCAL driver instrumentation: the undrained-pipe wedge was
reproduced deterministically (X), cured in the drivers (Y — the dev server's
stdio → FILE), and verified BOTH ways per the WH-34 doctrine applied to the
infrastructure axis (the piped-stdio driver wedges at the byte-deterministic
fill point; the file-stdio driver completes the full canonical procedure
clean) — the committed instruments and the repo tree are untouched by the
finding (the git tree byte-clean at HEAD through every incident, the
zero-drift battery + the git-clean captures the proof). The count ladder
stays FLAT at 383/27. The capture procedure's standing guards
(badgesEarned=0 + themeMode=light) fly unmodified — their seventh standing
flight since the WH-90 cure. The date-axis CARRY expectation is a HOLD, not
a drift: the "9"→"10" two-glyph family arms on the Nov 9 → Nov 10 crossing
(the first two-glyph signature of the cycle — WH-97's comparison must
expect the FIVE date-bearing faces to move if its captures land past
~00:00 UTC Nov 10).

## Execution record (appended after the work packages landed)

- The intake: the workspace SURVIVED (the first surviving round since
  WH-93) — one `git pull` fast-forward `66169b0..b0889c0` (one file:
  docs/session_209.md); the five core docs + the four driving docs
  validated against the tree at HEAD `b0889c0`; the standing checklist
  re-verified live. The baseline gate ALL GREEN (lint 0/0 · tsc 0 · unit
  383/383 [27 suites] · build OK · smoke 14/14 · e2e 72/72 · census MATCH
  · bun audit zero).
- The watch (round 85): the QUIET read — both axes STABLE at the WH-93
  re-based ledger (css `/static/index-CD4jDvim.css` + js
  `/static/index-C5r-NJye.js`, cdn true, cfg true — the FOURTH consecutive
  quiet round); the login geometry MATCH and the computed digest **15/15
  MATCH** on the SAME RUN (the mobile header + the full drawer battery
  inside the digest — escape + unlock + grow-auto-close all pass); NO
  watch-ledger re-base.
- The battery window 1: legs 1-5 GREEN on their first flights (login 38/38
  + authviews 192/192 + moodForm 20/20 + shell 61/61 + dashboard 105/105);
  the F-1 undrained-pipe wedge collapsed legs 6-8 (headers/toolbars/kpis —
  navigation timeouts on our side); the diagnosis + the isolated re-flights
  (headers 192/192 + toolbars 114/114 + kpis 315/315 GREEN, fresh boot per
  leg, the reference limiter aged across the boundary) — window 1 complete
  8/8, 1,037 computed members.
- The F-1 bisection (the WH-34 doctrine on the infrastructure axis): the
  canonical-cut probe NO HANG → the watcher-load probe NO HANG → the exact
  driver re-run X the hang REPRODUCED (third time, exactly ~48s at
  capture-round.mjs:136) → the file-stdio driver Y the FULL canonical
  capture round completed clean (107s). The root cause: the drivers' piped
  dev-server stdio + the back-to-back execSync leg loops with no
  event-loop turns = the 64 KB pipe fills with the server's request/compile
  logs, the main thread blocks writing, the server stops serving until the
  driver unfreezes. Session-local instrumentation; ZERO app-source.
- The capture round (the SIXTY-SEVENTH cross-round byte comparison): the
  canonical 34-file procedure on the Y-cured driver — ONE clean run, both
  clean-account guards GREEN on their SEVENTH standing flight
  (badgesEarned=0 + themeMode=light, the fail-closed design), census MATCH
  after. The comparison read against the ledger: **34/34 ZERO MOVERS** —
  the date-axis family's EIGHTEENTH expectation reads CARRY (same-day Nov 9
  faces, ~05:14-16 UTC captures; the family re-arms on the Nov 9 → Nov 10
  crossing, carrying to WH-97); the 25 tail RESTED; the 29 dither class
  RESTED; the resting families (19 + 24 + 30) held; the git tree byte-clean
  at HEAD after the captures (the zero-mover read's own proof).
- The battery window 2 on the F-1-cured file-stdio driver: ALL NINE legs
  green on their FIRST flights (profile 433/433 + account 146/146 +
  listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 + moodtiles
  67/67 + routines 697/697 + tutorials 790/790 + schedmodal 89/89 — 2,518
  members) — **the FIFTY-EIGHTH full-width run: 3,555/3,555 across all
  SEVENTEEN surfaces, ZERO drifts, ZERO limiter trips**.
- NO ledger re-bases: the md5 ledger UNTOUCHED (the zero-mover read is its
  own born-verification); the watch ledger UNTOUCHED (the quiet round).
- The full gate green on the final tree + the docs ladder: this plan (+ its
  execution record) + the session_210 log + the worklog WH-96 entry + the
  AGENTS round-85 record (the chain at 64 records) + the PAD §11 rows (the
  two WH-96 rows); the SKILL frontmatter stamp stays 2026-11-09 (the
  same-date session96 plan, the WH-79 freshness contract); the docs-counts
  pin green through every doc edit (the count ladder FLAT at 383/27).
- The instrument scratch scripts (the window drivers + the bisection
  probes + the isolated-leg runner + the capture drivers) ran session-local
  outside the repo — the standing precedent (the committed
  scripts/watch-round.mjs, scripts/capture-round.mjs and the parity-*.mjs
  own the reconstructible procedures). The probe-scratch PNGs the bisection
  wrote into docs/screenshots/ were removed before the ship — the folder
  back at the canonical 34-file set, byte-identical to HEAD.
