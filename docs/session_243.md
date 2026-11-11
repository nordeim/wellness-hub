# Session 243 — the WH-107 working transcript (the working log of the session that shipped WH-107)

The round opened ~04:57 UTC Nov 11 on a FRESH-CLONE workspace (the
WH-88/92/97/99/102/103 recovery class — the sandbox workspace had been
reset between sessions): the clone at `e40521f` + bun install 468 + the
`.env` from `.env.example` with a fresh AUTH_SECRET + db:push + db:seed
+ census MATCH + the chromium-1248 + chromium-headless-shell-1248
binaries installed (the browser cache carried only the stale
chromium-1200 — the package's 1.64.1 pin wants 1248; the documented
environment-repair class, not a code failure).

The five core docs read and validated (README + CLAUDE directly; the
AGENTS/PAD/SKILL mega-docs through targeted structural reads — the
round-records chain at 74, the §11 round-rows sub-table, the frontmatter
stamp at 2026-11-11, the docs-counts contract); the four driving docs
(session_240 + the session106 plan + the worklog + session_241)
validated against the tree at HEAD `e40521f`; the commits since the
WH-99 code cure audited DOCS-ONLY. The operator checklist re-verified
live, item by item (the `.env`/db contract, the `.env.example`
bidirectional keys, the vitest/playwright configs with the pinned e2e
db, the sitemap/robots/manifest handlers, the mobile-navigation
battery, the six `@source not` + the hover/dark `@custom-variant` +
the `--shadow-sm`/`--blur-sm` pins, the WH-94 dev-script cure, the
eslint skills-exclude).

The baseline gate ALL GREEN on the fresh-clone tree — lint 0/0 · tsc 0
· unit 383/383 (27 suites) · build OK · smoke 14/14 · e2e 72/72 ·
census MATCH · bun audit zero · the built CSS pipe-rule-FREE.

Watch round 96 ran (`node scripts/watch-round.mjs`): **THE JS-AXIS
WATCH** — the js axis MOVED
`/static/index-BdHnCkUB.js` → `/static/index-XTAoxhzo.js` (the
SIXTY-FIRST distinct bundle) while the css axis HELD at
`/static/index-Ba28FBHx.css` (cdn true, cfg true) — the reference
REDEPLOYED inside the round window on the js axis alone (the
single-axis class, the WH-93 precedent; the three-round quiet window
the WH-104/105/106 watches read closed at the redeploy). The login
geometry MATCH and the computed digest read **15/15 MATCH on the same
run** — the mobile header + the full drawer battery inside the digest
(escape + unlock + grow-auto-close all pass), every data-bearing
member green on its FIRST flight. The lesson-30 walk's instrument leg
— the session-local bundle-inventory diff (the WH-60/61 instrument
form), the old bundle fetched live against the new one — read the
delta **PLATFORM-LIBRARY-ONLY**: 511 added / 511 removed string
literals, every one a chunk-path string (504 `static/*` + 7 `./*`
platform-module references — the mass-rotation class), ZERO
wellness-domain strings moved.

The battery rode the session-local lifetime-owning driver rebuilt for
the round (the WH-96/98/100/102/105/106 lessons verbatim: boot →
warm-up → legs → kill inside one call; the pre-boot stale-port check;
the dev-server stdio fd-passthrough into a log file; the leg output
FILE-REDIRECTED; a try/catch per leg). Window 1 (eight legs): ALL
GREEN — login 38/38 + authviews 192/192 + moodform 20/20 + shell
61/61 + dashboard 105/105 + headers 192/192 + toolbars 114/114 + kpis
315/315 (1,037 members). The moodform leg's first flight crashed on a
session-local driver case-mismatch (`parity-moodForm.mjs` vs the
committed `parity-moodform.mjs` — a probe-infrastructure
misspending, zero parity finding); the corrected re-flight read 20/20
GREEN. While the reference limiter aged, the session107 plan was
drafted early per the house pattern (the docs-counts pin verified
green with the plan on disk, 14/14). Window 2 (nine legs, after the
reference limiter aged across the boundary): ALL GREEN on their FIRST
flights — profile 433/433 + account 146/146 + listinteriors 88/88 +
moodjourney 116/116 + calendar 92/92 + moodtiles 67/67 + schedmodal
89/89 + routines 697/697 + tutorials 790/790 (2,518 members). **The
SIXTY-NINTH full-width battery: 3,555/3,555, ZERO drifts, ZERO
transients, ZERO limiter trips.**

The watch-ledger re-base fired on the js axis (the move is live — the
WH-100 doctrine): the jsPath entry re-based to `XTAoxhzo` with the
WH-107 re-base block narrating the round's verification, born-verified
on the quiet state (the re-run reading "assets stable" at
Ba28FBHx/XTAoxhzo + the 15/15 digest).

The capture round (the canonical 34-file procedure on the
fd-passthrough dev server after a fresh seed, the driver owning the
server lifetime in capture mode): the clean-account guards'
EIGHTEENTH standing flight GREEN (badgesEarned=0 + themeMode=light),
all 34 faces in ONE clean run, census MATCH after.

The byte comparison (the session-local forensics pass over the md5
ledger, the any-channel-delta metric): **THREE movers, 31 stable**.
The five date-bearing faces byte-HELD — the date-axis family's
TWENTY-NINTH expectation reads CARRY (the captures landed ~05:50 UTC
Nov 11, same-day Nov 11 faces). The movers, all at their EXACT
recorded environmental signatures: 10-learning (9 px / 0.0008% /
maxdelta 7 / bbox 11x2 at (328,170) — the WH-100-born SVG-circle edge
dither family, its FOURTH firing, re-firing after its three-round
rest) + 25-dark-login-focus (77 px / 0.0067% / maxdelta 5 / bbox
367x121 at (457,562) — the WH-20 focus-ring interpolation-tail
habitat, its NINETEENTH recorded firing, the second consecutive) +
29-quick-actions-hover (5 px / 0.0004% / maxdelta 1 / bbox 5x5 at
(503,326) — the WH-39 canvas-dither family, its EIGHTH capture-axis
firing, re-firing after its one-round rest at WH-106). RESTING: 19 +
24 + 30 (the mid-paint transient class, the orange KPI-corner family,
the paired thumbnail-decode family). The session-local forensics
lesson: Pillow 11.3's `getbbox()` on a uniform-alpha RGBA diff image
ignores the RGB bands (a 77-px real delta first read as bbox-None) —
the forensics diff runs in RGB mode.

The md5 ledger re-based at WH-107 behind the WH-70
structural-assertion doctrine (assertions green BEFORE the write on
the FIRST pass: 34 rows; the THREE movers verified disk-vs-ledger;
the 31 stable rows byte-held; the head line; the WH-105 one-line
prior; the WH-106 block; the WH-93 block; the list line). The edits:
the head line → "re-based at WH-107 (2026-11-11), 34 files"; the top
header → "prior re-base (WH-106, 2026-11-11)"; the WH-105 one-liner
replaced by the WH-106 one-liner (its block's opening line, verbatim);
the WH-107 full block written; the WH-93 block retired; the list
gained WH-93 (sorted insert) + WH-106 (appended); the THREE mover rows
[10 + 25 + 29] re-hashed. Born-verified 34/34 ZERO MOVERS.

The docs ladder: the session107 plan's WP-1..WP-9 checkboxes closed +
the execution record appended; the phrase-collision check clean on
every drafted block BEFORE its insert (the forbidden forms); the SKILL
frontmatter stamp staying 2026-11-11 (the same-date session107 plan,
the WH-79 freshness contract — the docs-counts pin re-run green with
the plan on disk, 14/14); the session_242 round summary written; the
worklog WH-107 entry prepended (the 108th); the AGENTS round-96
record inserted after the Round 95 record (the chain 74 → 75, asserted
before the insert); the PAD §11 two WH-107 rows inserted after the
WH-106 pair (asserted before the insert). The docs-counts pin green
through every doc edit (14/14; the unit suite re-run inside the final
gate with the pin in the run).

The full gate ALL GREEN on the final tree: lint 0/0 · tsc 0 · unit
383/383 (27 suites) · build OK · smoke 14/14 · e2e 72/72 (the
mobile-nav battery inside the ladder) · census MATCH · bun audit zero
· the built CSS pipe-rule-FREE.

The ship: the round commit `5e8d787` (10 files — the three mover
PNGs, the re-based md5 ledger, the watch-ledger re-base, the
session107 plan, the session_242 summary, the worklog entry, the
AGENTS round-96 record, the PAD §11 rows) staged in the house style
(`:memo: docs:` — the no-code-cure round prefix, the WH-93
js-axis-move precedent), pushed through the SSH wrapper with the
explicit `--remote git@github.com:nordeim/wellness-hub.git` (the
paramiko shim rebuilt from the runbook's Appendix A on PATH — the
sandbox has no OpenSSH binary; the operator key materialized outside
the repo at 0600, its ed25519 fingerprint verified, never printed in
any log), the dry-run green (`e40521f..5e8d787` ready), the real push
`e40521f..5e8d787 HEAD -> main`, the remote ref verified twice (the
wrapper's own post-push verification + the SSH-free HTTPS read ==
local HEAD), the tracking ref synced, and the operator key shredded
after (overwritten with random bytes, then removed). This session_243
working transcript rides the follow-up commit per the house pattern.
