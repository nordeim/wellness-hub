# Session 204 — the WH-94 working-session log (watch round 83)

The workspace already carried the wellness-hub repo. Task plan set; the
round opened as **WH-94 (watch round 83)** on the SURVIVING workspace —
`git pull` fast-forwarded `495aa5f..e942b10` (one file: docs/session_203.md);
node_modules, `.env` and db/ all standing, the WH-88/92 fresh-clone recovery
class NOT needed. Current UTC at open: ~01:34 Nov 9 — ~50 minutes AFTER the
WH-93 captures landed (~00:44-45 UTC Nov 9), so this round's captures read
SAME-DAY Nov 9 faces against the WH-93 ledger's Nov 9 faces: the date-axis
family ("9" glyph) CARRIES, the WH-91 precedent class.

Stage 1: the five core docs (AGENTS with its round-record chain at 61
records, CLAUDE, README, the PAD's §11 tail at the WH-93 rows, the SKILL
frontmatter at stamp 2026-11-09) + the four driving docs (session_202, the
session93 plan, the worklog WH-93 head, session_203) read and validated
against the pulled tree. The operator's standing checklist re-verified
live: the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"` → the
repo-root db/ with custom.db + e2e.db + smoke.db), the tracked `.env.example`
(bidirectional, keys MATCH), the vitest/playwright configs (the e2e db
PINNED at `file:../db/e2e.db`), the sitemap/robots/manifest handlers, the
six `@source not` directives + the hover/dark custom-variants + the
shadow/blur re-pins, the eslint skills-exclude, zero TODO/FIXME in src.

Stage 2: the baseline gate — lint 0/0 · tsc 0 · unit 382/382 (27 suites, the
ladder FLAT at the WH-93 ship state) · build OK · smoke 14/14 · e2e 72/72 ·
census MATCH · bun audit zero. **BASELINE GATE ALL GREEN.**

Stage 3: the watch round 83. Reference reachable (200). **The QUIET read**:
both axes STABLE at the WH-93 re-based ledger — css `/static/index-CD4jDvim.css`
+ js `/static/index-C5r-NJye.js` (cdn true, cfg true — the second consecutive
quiet round on the re-based assets; a reading, never a retirement, NO
watch-ledger re-base). The login geometry MATCH and the computed digest
**15/15 MATCH** on the same run (the mobile header + the full drawer battery
inside the digest — escape + unlock + grow-auto-close all pass). The CDN
companion doctrine applies regardless: the full-width battery runs this
round as every round.

Stage 4: **the battery window 1 — THE COLLAPSE, AND THE FINDING (F-1)**. The
window-1 first flight failed on every our-side leg: the six logged-in legs
read navigation timeouts (`waitForSelector('main')` with 2×/4×/6×/7×
"waiting for … navigation to finish" retries), the authviews walk an
infinite "Forgot password?" click loop (the button detaching on every
click), 2× `POST /api/auth/login 400`, and the kpis leg's "Navigation to
/Routines is interrupted by another navigation to /login". The reference
side (PASS A) was green on every leg — the collapse was exclusively ours.
The login leg read **3 DRIFTS of 38** (googleHoverBorder + googleHoverBg +
googleHoverShadow) — three members that look like a reference-side hover
redeployment.

The diagnosis (a console + navigation trace against the still-running
server): **the `next dev -p 3000 2>&1 | tee dev.log` script writes the
server's own request log INTO the repo root, Turbopack's watcher sees every
write, and every logged request fires `[Fast Refresh] rebuilding` → a FULL
PAGE RELOAD — a self-sustaining loop** (`[nav] /login` every few hundred ms;
the login POST aborted with `net::ERR_ABORTED`; the `?`-suffixed HMR
navigations). The loop's three faces all root-caused: (a) the authviews
click loop (the view swap's DOM detached by the reload), (b) the 400 logins
(the fill wiped by a reload between fill and submit — the Zod seam correctly
rejecting the empty pair), (c) the never-settling navigations. And the 3
googleHover* drifts were the loop's poison fruit: the reload race read the
RESTING face (our `@theme` tokens already carry the reference's hover
values — `--color-google-border-hover: #ddd8d2` = 221,216,210 +
`--color-google-bg-hover: #f1eeea` = 241,238,234). **Both-ways verification
(the WH-34 doctrine applied to infrastructure): the tee'd server reproduces
the loop live; the no-tee control flight reads parity-login 38/38 +
parity-authviews 192/192 GREEN — the three drifts dissolved with the loop.**

The F-1 classification: **HIGH, infrastructure** — the dev script tees its
log into the watched tree; on the current sandbox the write stream triggers
the endless Fast-Refresh reload loop that collapses every dev-server-driven
procedure (the battery, the captures) and silently poisons parity reads.

Stage 5: **the F-1 cure (TDD RED → GREEN)**. The src-census
dev-script-hygiene pin written FIRST — verified RED at exactly the tee
violation (one failure) — then the cure: package.json's dev script
re-authored to `"dev": "next dev -p 3000"` (the tee dropped; the log writes
belong to the caller, outside the tree), the stale repo-root dev.log
removed, the two live-tense neo-crm_SKILL.md narrations updated (the
quick-start line + the tools table). GREEN. The count-ladder lockstep in
the same commit: the ladder 382 → 383 (the canonical + README ×4 + AGENTS ×2
+ CLAUDE ×2 + PAD ×3 + the SKILL ×2 + the §8.1 infra row 172 → 173
recomputed), the docs-counts pin 14/14 green through every doc edit. Lint
0/0 · tsc 0 on the cured tree.

Stage 6: **the battery window 1 RE-RUN on the cured tree** (the reference
limiter aged past the first flight's spend) — **ALL EIGHT legs green on
their first flights**: login 38/38 + authviews 192/192 + moodForm 20/20 +
shell 61/61 + dashboard 105/105 + headers 192/192 + toolbars 114/114 +
kpis 315/315 — 1,037 computed members, zero drifts, zero limiter trips.
The dev server verified-down after (the kill chain handles the bun → next
child).

Stage 7: **the capture round** (during the window-2 aging gap — the
procedure captures OUR app, zero reference logins): the fresh seed + the
canonical 34-file procedure on the cured `bun run dev` — ONE clean run, the
clean-account guards' FIFTH standing flight GREEN (badgesEarned=0 +
themeMode=light both asserted before the light set), census MATCH after,
34 captures landed ~02:15 UTC Nov 9. The **SIXTY-FIFTH cross-round byte
comparison against the WH-93 ledger: 34/34 STABLE, ZERO MOVERS** — the
date-axis family's SIXTEENTH expectation of the cycle reads CARRY (same-day
Nov 9 faces, the WH-91 precedent class), the 25 focus-ring interpolation
tail RESTED (fired at WH-90/91/92/93), the RESTING families (19 + 24 + 29)
held. NO ledger re-base: the md5 ledger untouched (the 34/34 zero-mover
read is its own born-verification), the watch ledger untouched (the quiet
round). The round's app-source change (the F-1 cure) carries no rendered
face — the captures' own proof.

Stage 8: **the battery window 2** (the limiter aged to ~02:24 UTC): **ALL
NINE GREEN on their first flights** — profile 433/433 + account 146/146 +
listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 + moodtiles
67/67 + routines 697/697 + tutorials 790/790 + schedmodal 89/89. **The
FIFTY-SIXTH full-width run: 3,555/3,555 across all SEVENTEEN surfaces, ZERO
drifts, ZERO limiter trips** (the two grid legs green on their first
flights — the WH-92 reorder cure holds).

Stage 9: the docs ladder — the session94 plan's WPs closed + its execution
record + the worklog WH-94 entry (prepended, born-verified) + the AGENTS
round-83 record (the chain asserted at 61 first, 62 after — script surgery
on the giant line, no manual edits) + the PAD §11 rows (the two WH-94
rows: the F-1 dev-script reload-loop cure row + the quiet-watch/date-axis
CARRY row — the phrase-collision check clean before the insert) + the SKILL
frontmatter stamp STAYS 2026-11-09 (the same-date plan, the WH-79 freshness
contract).

Stage 10: the full gate on the final tree + the ship (the round commit on
main only, pushed through the SSH wrapper with the operator key materialized
outside the repo at 0600 and shredded after, the remote ref verified; the
working-session transcript session_205.md as the follow-up commit per the
house pattern).

## Round Summary (WH-94 / watch round 83)

**Workspace & baseline** — the workspace survived the round boundary (one
`git pull` fast-forward, one file). Five core docs + the driving set
(session_202, session_203, the session93 plan, the worklog) reviewed and
validated against the codebase. Baseline gate ALL GREEN: lint 0/0 · tsc 0 ·
unit 382/382 (27 suites) · build OK · smoke 14/14 (the SEO family green) ·
e2e 72/72 (the mobile-nav battery green) · census MATCH · bun audit zero.

**The round's finding + cure** — **F-1 (HIGH, infrastructure)**: `bun run
dev` teed its own request log into the watched repo tree; Turbopack's
watcher fired a Fast Refresh full-reload on every logged request — a
self-sustaining reload loop that collapsed window 1's first flight and
poisoned the round's first parity reads (3 false googleHover* drifts).
Diagnosed live both ways (the loop trace on the tee'd server; 38/38 +
192/192 green on the no-tee control). Cured TDD RED → GREEN: the
dev-script-hygiene pin (RED at exactly the tee violation) + the tee drop +
the stale dev.log removal + the two neo-crm_SKILL.md narrations; the ladder
382 → 383 (the WH-10 lockstep, every doc site + the §8.1 infra row; the
docs-counts pin 14/14).

**The verification** — the quiet watch (both axes stable at the WH-93
re-based ledger, the digest 15/15); the FIFTY-SIXTH full-width battery on
the cured tree **3,555/3,555 across all seventeen surfaces, zero drifts,
zero limiter trips** (every leg green on its first flight); the SIXTY-FIFTH
byte comparison **34/34 zero movers** (the date-axis sixteenth expectation
CARRIES — same-day Nov 9 faces; the 25 tail rested; the clean-account
guards' fifth standing flight); no ledger re-base on either ledger.

**Shipped** — the round commit (package.json + the src-census pin + the
docs lockstep + the neo-crm_SKILL narrations + the session94 plan + this log
+ the worklog + the AGENTS round-83 record + the PAD rows), pushed via the
SSH wrapper with the explicit remote, the remote ref verified, the operator
key shredded, main branch only. The working-session transcript
(session_205.md) as the follow-up commit.

**Next (WH-95)**: watch round 84 — the date-axis family re-arms on the
Nov 9 → Nov 10 crossing; the resting families (19 + 24 + 29) and the 25
tail at their next flights; the re-based `CD4jDvim`/`C5r-NJye` assets' next
read.
