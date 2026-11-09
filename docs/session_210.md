# Session 210 — the WH-96 working-session log (watch round 85)

The workspace SURVIVED the round boundary (the first surviving round since
WH-93): one `git pull` fast-forward `66169b0..b0889c0` (one file:
docs/session_209.md — the WH-95 round summary). The round opened as
**WH-96 (watch round 85)** at ~04:18 UTC Nov 9 — ~30 minutes AFTER the
WH-95 captures (~03:47-50 UTC Nov 9), so this round's captures read
SAME-DAY Nov 9 faces against the ledger's Nov 9 faces: the date-axis family
("9"→"10" two-glyph flip) CARRIES, the EIGHTEENTH expectation of the cycle —
the family re-arms on the Nov 9 → Nov 10 crossing, carrying to WH-97.

Stage 1: the five core docs + the four driving docs (session_208,
session_209, the session95 plan, the worklog) read and validated against the
surviving tree at `b0889c0`. The operator's standing checklist re-verified
live: the `.env`/db contract (DATABASE_URL="file:../db/custom.db" → the
repo-root db/ with custom.db + e2e.db + smoke.db), the tracked
`.env.example`, the vitest/playwright configs (the e2e db PINNED at
`file:../db/e2e.db`), the sitemap/robots/manifest handlers
(src/app/sitemap.xml + robots.txt + manifest.json), the six `@source not`
directives + the hover/dark custom-variants + the shadow/blur re-pins, the
WH-94 F-1 dev-script cure standing (no tee), the eslint skills-exclude, zero
TODO/FIXME in src.

Stage 2: the baseline gate — lint 0/0 · tsc 0 · unit 383/383 (27 suites,
the ladder FLAT at the WH-95 ship state) · build OK · smoke 14/14 · e2e
72/72 · census MATCH · bun audit zero. **BASELINE GATE ALL GREEN.**

Stage 3: the watch round 85. Reference reachable (200). **The QUIET read**:
both axes STABLE at the WH-93 re-based ledger (css `CD4jDvim` + js
`C5r-NJye`, cdn true, cfg true — the FOURTH consecutive quiet round; a
reading, never a retirement, NO watch-ledger re-base). The login geometry
MATCH and the computed digest **15/15 MATCH** on the same run (the mobile
header + the full drawer battery inside the digest — escape + unlock +
grow-auto-close all pass). The CDN companion doctrine applies: the
full-width battery runs this round as every round.

Stage 4: the battery window 1 — **THE FINDING (F-1)**. The first flight:
legs 1-5 GREEN (login 38/38 + authviews 192/192 + moodForm 20/20 + shell
61/61 + dashboard 105/105), then legs 6-8 (headers, toolbars, kpis)
collapsed with navigation timeouts on OUR side. The immediate re-run:
headers 192/192 GREEN, then toolbars + kpis collapsed again — the WH-66
first-flight-errors-are-infrastructure class suspected. The live evidence
ruled the suspects out one by one: no OOM (2.6 GB available), no stray
chromium, no db writes from the login (db/custom.db mtime untouched — the
WH-94 F-1 watcher class ruled out), the wedged next-server's main thread in
a pure-utime spin with all workers idle, and a SELF-RECOVERY (~200 in
0.096s once the driver exited). The reference-limiter arithmetic: the
failed first flights spent the 10/10 login budget (each leg's PASS A ran
before its PASS B collapsed) — the aging boundary (~15 min) before the
re-flights.

Stage 5: the isolated re-flights — fresh boot per leg (restart isolation):
**headers 192/192 + toolbars 114/114 + kpis 315/315 all GREEN** — window 1
complete 8/8 (1,037 computed members). The capture round then failed
DETERMINISTICALLY at capture-round.mjs:136 (the second /Events goto) at
exactly ~48s, TWICE, on fresh servers — the deterministic form demanded the
bisection: (a) the verbatim canonical-cut probe (the exact pre-136 sequence
on a nohup file-stdio server) — NO HANG; (b) the same sequence with snaps
writing into docs/screenshots/ — NO HANG (the watcher-load class ruled
out); (c) the exact driver re-run (X — the dev server's stdio PIPED into
the driver) — the hang REPRODUCED a third time at exactly ~48s; (d) the
same driver with the dev server's stdio → FILE (Y) — the FULL canonical
capture round completed clean in 107s. **The root cause: the session-local
window drivers piped the dev server's stdio into data-event listeners, then
ran the legs back-to-back inside `execSync` with no event-loop turns — the
server's request/compile logs filled the 64 KB pipe buffer, the main thread
BLOCKED writing its log, and the server stopped serving until the driver
unfroze.** The deterministic ~48s fill point is the byte-count-deterministic
log volume of the canonical capture sequence; the window-1 leg-6 collapse
is the same pipe filling across the eight-leg loop. Session-local
instrumentation; ZERO app-source (the tree byte-clean at HEAD through every
incident — the committed instruments and the WH-94-cured dev script
untouched).

Stage 6: the capture round on the Y-cured driver — the canonical 34-file
procedure, ONE clean run, the clean-account guards' SEVENTH standing flight
GREEN (badgesEarned=0 + themeMode=light), census MATCH after, the failed
attempts' partial captures fully overwritten. The **SIXTY-SEVENTH
cross-round byte comparison: 34/34 ZERO MOVERS** — the date-axis family's
EIGHTEENTH expectation reads CARRY (same-day Nov 9 faces, ~05:14-16 UTC
captures); the 25 focus-ring tail RESTED (its thirteenth firing was WH-95);
the 29 dither-phase class RESTED (its first capture-axis firing was WH-95);
the resting families (19 + 24 + 30) held. NO ledger re-base on either
ledger (the zero-mover read is its own born-verification; the watch ledger
untouched — the quiet round). The probe-scratch PNGs the bisection wrote
into docs/screenshots/ removed — the folder back at the canonical 34-file
set, byte-identical to HEAD (git status clean).

Stage 7: the battery window 2 on the F-1-cured file-stdio driver — **ALL
NINE legs green on their FIRST flights** (profile 433/433 + account 146/146
+ listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 + moodtiles
67/67 + routines 697/697 + tutorials 790/790 + schedmodal 89/89 — 2,518
computed members). **The FIFTY-EIGHTH full-width run: 3,555/3,555 across
all SEVENTEEN surfaces, ZERO drifts, ZERO limiter trips.**

Stage 8: the docs ladder — this session96 plan (+ its execution record) +
the session_210 log + the worklog WH-96 entry (prepended, born-verified) +
the AGENTS round-85 record (the chain asserted at 63 before the append, 64
after — script surgery on the giant line) + the PAD §11 rows (the two
WH-96 rows: the F-1 driver-pipe finding row + the quiet-watch/date-axis
CARRY row — the phrase-collision check clean before the insert) + the SKILL
frontmatter stamp STAYS 2026-11-09 (the same-date plan, the WH-79 freshness
contract; the docs-counts pin green through every doc edit).

Stage 9: the full gate on the final tree — lint 0/0 · tsc 0 · unit 383/383
· build OK · smoke 14/14 · e2e 72/72 · census MATCH · bun audit zero · the
built CSS pipe-rule-FREE. **FULL GATE GREEN.**

Stage 10: the ship — the round commit on main only (the session96 plan +
the session_210 log + the worklog WH-96 entry + the AGENTS round-85 record
+ the PAD §11 rows; the captures byte-identical — no image files in the
commit, the zero-mover round's own form), pushed through the SSH wrapper
with the explicit remote, the operator key materialized outside the repo at
0600 and shredded after, the remote ref verified. This transcript the
follow-up commit.

## Round Summary (WH-96 / watch round 85)

**Workspace & baseline** — the first SURVIVING workspace since WH-93 (one
git pull, one file); the five core docs + the driving set reviewed and
validated against the tree. Baseline gate ALL GREEN: lint 0/0 · tsc 0 ·
unit 383/383 (27 suites) · build OK · smoke 14/14 · e2e 72/72 · census
MATCH · bun audit zero.

**The round's findings** — the watch quiet on both axes (the fourth
consecutive quiet round at the WH-93 re-based ledger, the digest 15/15);
THE FINDING (F-1, session-local): the undrained-pipe wedge — the window
drivers' piped dev-server stdio + the back-to-back execSync leg loops
filled the 64 KB pipe with the server's logs and blocked its main thread
mid-battery; root-caused by a five-step bisection (the canonical-cut probe,
the watcher-load probe, the exact-driver repro X, the file-stdio cure Y),
cured in the drivers (stdio → FILE), and verified both ways; ZERO
app-source, no code cure — the count ladder FLAT at 383/27. The battery
zero-drift 3,555/3,555 across all seventeen surfaces (window 1's legs 6-8
green on isolated re-flights per the WH-66 precedent; window 2 all
first-flight green on the cured driver); the SIXTY-SEVENTH byte comparison
34/34 ZERO MOVERS (the date-axis EIGHTEENTH expectation CARRY; the 25 tail
+ the 29 dither class + the resting families all byte-held).

**No re-bases, no code cure** — the md5 ledger untouched (the zero-mover
read its own born-verification); the watch ledger untouched (the quiet
round); the date-axis family re-arms on the Nov 9 → Nov 10 crossing (the
"9"→"10" two-glyph flip — the first of its kind in the cycle), carrying to
WH-97.

**Shipped** — the round commit + this transcript, pushed via the SSH
wrapper with the explicit remote, the remote ref verified, the operator key
shredded, main branch only. Docs ladder landed in lockstep: the session96
plan, the session_210 log, the worklog WH-96 entry, the AGENTS round-85
record (the chain at 64), the PAD §11 rows, the SKILL stamp at 2026-11-09.

**Next (WH-97)**: watch round 86 — the date-axis family FIRES on the
Nov 9 → Nov 10 crossing (the "9"→"10" TWO-GLYPH flip — a two-glyph
signature, the first of its kind in the cycle: the five date-bearing faces
are expected movers if the captures land past ~00:00 UTC Nov 10); the
resting families (19 + 24 + 29 + 30) and the 25 tail at their next
flights; the re-based `CD4jDvim`/`C5r-NJye` assets' next read; the F-1
lesson carried forward — the session drivers boot the dev server with
stdio → FILE, never pipes into a frozen execSync event loop.
