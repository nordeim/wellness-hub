# Session-36 Remediation Plan — the parity net's second surface (WH-36)

**Task ID:** WH-36 · **Date:** 2026-11-01 · **Branch:** `main` (only)
**Mission:** the WH-35 plan's suggested next, executed on a round that
read QUIET on both standing procedures: **watch round 25 read `assets
stable`** — both content hashes unchanged (`/static/index-BHjkUcdg.css`
stable since round 20, `/static/index-BKhnHaM4.js` stable since round
24's re-base), the CDN pipeline + `/api/frontend-config.js?v=3` present —
and the PASS-2 one-login digest read **15/15 MATCH** (zero rendered-face
drift). This is the **first consecutive stable read after round 24's
genuine js MOVED** — per the doctrine (two-plus CONSECUTIVE stable
reads), the cooling policy does NOT start yet; if round 26 reads stable
too, it does (a documented doctrine change, not a silent one). The
same-round dual-app companion **`scripts/parity-moodform.mjs` ran as the
standing procedure** (the WH-35 plan's (c)): **20/20 members MATCH** —
the WH-35 ink-split cure holding on both apps in the same round, the
surface's SECOND consecutive quiet flight (the born-verification re-run
+ this round).

With the moodForm dual-run quiet for two consecutive flights, the WH-35
plan's (d) precondition lands: **the parity member set widens to a
second surface — the LOGIN FAMILY, the app's root face.** The two-clocks
gap (lesson 39) is still open for it: the watch's PASS-1 login probe
pins the REFERENCE's login geometry (5 members: h1 30px/700, inputs
48×368 r12px), our (l) e2e leg pins OUR five views' computed interior —
two pin sets on two clocks, never diffed in the same round. The login
family is the natural second surface for a structural reason beyond
precedent: it is the app's ROOT face (the first thing every visitor
sees), and the parity read of it is the CHEAPEST possible probe —
**ZERO logins on either side** (the logged-out surface needs no
session), zero clicks, zero writes.

> **Reference probe (this session's budget: the watch round-25 run [its
> one login] + the parity-moodform run [one login] + the login-face
> decode probes [ZERO logins — the logged-out /login reads needed no
> session]; writes = ZERO on the reference — every surface read at
> rest):** the watch round 25 (PASS 1 assets stable both axes + cdn/cfg
> present + the login geometry surface green; PASS 2 the 15/15 digest —
> the login geometry, the dashboard, the shell, goals, routines, the
> Schedule modal both families, learning, calendar, profile, mental
> health, the moodForm interior, sr, exercise, assignments, the mobile
> header + FULL drawer battery — the instruction's mobile-menu emphasis
> verified on the round-25 build); the parity-moodform 20/20; the
> login-face decode (the member correspondence check for the new
> surface — see the audit below). `bun audit` ZERO (the five-override
> posture holds).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `9933838` = WH-35 shipped at `8fa0021` + the operator's
session_68 log push):** lint 0/0 · tsc 0 · unit **366/366 (25 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **71/71** · census MATCH —
the exact documented WH-35 ship state. **Plus the periodic `bun audit`
duty: ZERO vulnerabilities.** The instruction's checklist items verified
on the tree: the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"`
→ `<repo>/db/custom.db`, census MATCH), the vitest + playwright configs
in place and passing, the sitemap/robots/manifest/OG surfaces serving
(smoke check 12; the 14-route explicit-format handler read), the
Tailwind v4 pins present in `globals.css` (the hover unwrap, the dark
variant, `--shadow-sm`, `--blur-sm`, the three `@source not`),
`.env.example` tracked and accurate. The WH-35 diff reviewed (28 files:
the 7 call-site `submit` flips + `page-layout.ts` + `page-parts.tsx` +
the tests + the docs + the refreshed captures + the parity script;
clean — exactly the documented ink-split cure). The neo-crm sibling
re-verified: the live repo's SKILL is at **v1.202.0** (2026-11-01) —
unchanged from the WH-35 round's record, the same family loop, no
structural change to the tech-stack patterns.

**The audit method:** the baseline gate live, the watch round 25 through
the committed script, the parity-moodform standing run, the WH-35 diff
review, the login-face decode probes (two scratch reads — both apps'
/login computed faces, member-by-member, zero logins), and the
instruction's checklist items verified on the tree.

Findings (by severity) — the WH-36 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **LOW — positive, the standing record** | **Watch round 25: the first consecutive STABLE READ since round 24's genuine move.** Both content hashes unchanged (`index-BHjkUcdg.css` stable since round 20; `index-BKhnHaM4.js` stable since the WH-35 re-base), the CDN pipeline + frontend-config present, the PASS-2 digest **15/15 MATCH** (the moodForm surface's second post-birth round green; the mobile header + drawer battery green — the instruction's mobile-menu emphasis). The cooling policy needs two-plus consecutive stable reads: round 25 is the FIRST after round 24 broke the streak — **no cooling yet**; a stable round 26 starts it (every-round → every-other-round, a documented doctrine change) | `Project_Architecture_Document.md` §11 (the watch row) + `AGENTS.md` (the watch note) | Document-only: the round-25 record lands in the watch row + the AGENTS note |
| F-2 | **LOW — the round's core: the parity net's second surface** | **The two-clocks gap (lesson 39) is closed for the moodForm only.** Every OTHER surface family still rides two pin sets that never meet: the watch's PASS-1 login probe (the reference's geometry, 5 members) and our (l) e2e leg (our five views' computed interior) — both green this session, on two clocks. The moodForm parity run has now been quiet for TWO consecutive flights (the born-verification 20/20 + this round's 20/20) — the WH-35 plan's (d) precondition satisfied. **The login-family decode (this session, zero logins): 27 scalar members already compute equal live-vs-live** (the h1 30px/700/rgb(15,23,42)/368px, the subtitle 16px/rgb(100,116,139), the inputs 48×368 r12px border slate-200, the submit 48px r12px bg-slate-900/white, the card 448px r16px, the accent 4px, the google button 54px r12px, the divider slate-200, the texts "Welcome to EvolveWell"/"Sign in to continue"/"Continue with Google"/"Sign in") — **plus three serialization classes the moodForm doctrine already owns, decoded live:** (a) the oklab/rgba platform class — our BUILD-TIME v4 compiler serializes alpha colors as `oklab(...)` while the reference's CDN serializes `rgba(...)` (inputBg, cardBg); (b) the gradient class — both stop sets carry the same `rgb()` triples with different surrounding syntax (shellBg slate-50→slate-100, accentBg slate-200→300→200, logoDiscBg slate-200→300); (c) the radius class — our `rounded-full` computes `3.35544e+07px` (v4's `calc(infinity * 1px)`) vs the reference's `9999px` — visually identical at 96px (both ≥ the 48px half-width → a full circle), but a raw member would false-DRIFT | `scripts/` (a new committed procedure) | **Cure**: `scripts/parity-login.mjs` — PASS A the reference's /login (**ZERO logins — the logged-out surface**), PASS B our dev server's /login, the 34-member live-vs-live diff. The serialization classes normalized the doctrine way: alpha colors through a 1×1 canvas composite (the fill-over-opaque-black readout is byte-identical across serializations — decoded live: `124,125,126,255` and `242,242,242,255` on BOTH apps), gradients through their rgb stop triples (the parity-moodform form), the disc radius through an is-round normalization (parsed radius ≥ half-width). Exit 0 only when every member matches |
| F-3 | **LOW — positive, the standing record** | **The standing blocks all hold on the round-25 build.** The mobile drawer battery (the instruction's mobile-menu emphasis) verified TWICE this session: the watch's PASS-2 surface (288px sheet, border-r, hidden X, 32px rows, 11 hrefs, escape + unlock + viewport-grow auto-close) AND the e2e battery's 7-check mobile-navigation spec inside the 71/71 gate. The Tailwind v4 pins standing in `globals.css` (no new v4 bug class — the reference's CDN pipeline does not touch our compiled build; the login decode itself exercised our compiled alpha/radius classes and found only the documented serialization forms). Census MATCH; `bun audit` zero; the WH-35 diff clean; the neo-crm sibling live at v1.202.0 (unchanged) | `Project_Architecture_Document.md` §11 (the standing rows) | Document-only: the standing record rides the F-1/F-2 rows |

**No MEDIUM findings; no CRITICAL; no parity drift.** The round is a
widen-and-record round in the WH-34/35 mold: both standing procedures
read quiet, and the cure is the parity net's widening (F-2) + the docs
ladder (F-1/F-3's records).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 25 | **25** | none — the new script is a procedure (the parity-moodform no-pin precedent: scripts stay OUTSIDE the gate) |
| Unit checks | 366 | **366** | none |
| E2E checks | 71 | **71** | none |
| §8.1 rows | infra 164 · a11y 22 · CRUD 22 | **unchanged** | no test change |
| Captures | 34 | **34** | the same committed set — expected byte-stable (zero src/ change this round; movers only as the known rasterization/transition-instant classes, root-caused before any re-base) |

**No CANONICAL flips in `tests/docs-counts.test.ts`** — the count ladder
is flat this round; the lockstep pin should read GREEN untouched after
the docs ladder (prose-only edits: the watch row's round-25 update, the
AGENTS note, the SKILL version bump + the parity-login row).

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full this session: the watch script's PASS-1
login probe block + the LEDGER login entry + the report machinery; the
parity-moodform script end-to-end (the probe/gotoApp/report forms — the
new script's direct model); the login-card source (the signin view's
full render: the logoWrap/glow/badge ladder, the title/subtitle, the
google button, the divider, the form, the footer) + `LOGIN_LAYOUT` in
`page-layout.ts`; the (l) leg's signin-view member reads
(a11y.spec.ts:1333+); the docs-counts CANONICAL block (no flips); the
PAD §11 watch row + the WH-35 rows (the update sites); the AGENTS watch
passage (line 197); the SKILL quick-reference table (line 448-449) +
the lesson slot; the capture-round procedure + the md5 ledger format.
The login-face decode probes run live on BOTH apps (the 27-member
scalar correspondence + the three serialization classes + the canvas
normalization byte-verified) — the member set below is decode-backed,
not imagined.

### WP-1 — the F-2 cure: `scripts/parity-login.mjs` (born-verified)
1. The script, modeled on parity-moodform.mjs's machinery (probe /
gotoApp with `sel: "h1"` / report / exit semantics):
   - **PASS A** (the reference, ZERO logins): `goto /login` → settle
     on the h1 → the computed member read (one evaluate).
   - **PASS B** (our dev server, ZERO logins): the same read.
   - **The DIFF**: member-by-member, `MATCH`/`DRIFT` + a final line;
     exit 0 only when every member matches.
2. The member set (34, decode-backed):
   - **27 scalar members** (direct equality): `h1Text`, `h1Fs`,
     `h1Fw`, `h1Color`, `h1W`, `subText`, `subFs`, `subColor`,
     `inputH`, `inputW`, `inputR`, `inputBorder`, `submitText`,
     `submitH`, `submitR`, `submitBg`, `submitColor`, `cardW`,
     `cardR`, `accentH`, `googleText`, `googleH`, `googleR`,
     `googleBorder`, `googleColor`, `googleBg`, `dividerLineBg`.
   - **2 canvas-normalized members**: `inputBgNorm`, `cardBgNorm` —
     the 1×1 canvas composite (fill the computed color over opaque
     black, read the byte quad; identical across oklab/rgba
     serializations — byte-verified this session on both apps).
   - **3 gradient stop-triple members**: `shellBg` (slate-50 →
     slate-100), `accentBg` (slate-200 → 300 → 200), `logoDiscBg`
     (slate-200 → 300) — the parity-moodform doctrine: both
     serializations carry the same `rgb()` triples.
   - **2 normalized-geometry members**: `logoDiscW` (96), and
     `logoDiscRound` (the parsed radius ≥ half-width → true — the
     9999px-vs-calc(infinity) class normalized).
3. The locators (face-identical across both apps, decode-verified):
   the h1 / `input[type=email]` / `button[type=submit]` direct
   selectors; the card via the shadow-2xl walk from the email input;
   the logoDisc via the first gradient-bearing element 40..200px wide
   inside the card (the glow/badge family — the read is
   structurally consistent on both apps); the accent via the card's
   absolutely-positioned ≤8px child; the google button via its text;
   the divider line via the "or" label walk; the shell via the
   gradient-bearing ancestor walk of the card.
4. **The zero-interaction doctrine** (stronger than zero-write): the
   login probe performs NO clicks, NO logins, NO writes on either
   app — the cleanest parity procedure yet (the surface is the
   logged-out face; nothing needs opening).
5. **Born-verification**: the first run must read **34/34 MATCH,
   exit 0** (the decode pre-verified every member this session — a
   first-flight DRIFT would mean one of the two apps moved between
   the decode and the run: investigate before curing, the standing
   machinery).

### WP-2 — the full gate
lint 0/0 · tsc 0 · unit **366/366 (25 suites)** · build OK · smoke
14/14 · e2e **71/71** · census MATCH. No src/ change ships (the cure is
procedure-side, the capture-round no-pin precedent) — the
console-hygiene net and the standing battery should read unchanged.
`bun audit` zero (the networked posture check, outside the gate per the
doctrine).

### WP-3 — the docs ladder
PAD §11 (the watch row's round-25 update: the first consecutive stable
read, the no-cooling-yet outcome, the 15/15 digest; the F-2
parity-login row: the second surface, the zero-login doctrine, the
three serialization classes + their normalizations), AGENTS (the watch
note: round 25 + the parity-login script named + the zero-login
doctrine), SKILL v1.33.0 → **v1.34.0** (the quick-reference table's
parity row widened to name both surfaces + the round's lesson — see
below + the version), the README/CLAUDE counts (unchanged — no flips,
verified against the lockstep pin), the worklog WH-36 entry, this
plan's execution record, `docs/session_69.md` (the session log
convention: the round commit carries the summary doc).

**The lesson candidate (lesson 40)**: the login decode's serialization
classes generalize lesson 39's cure — a live-vs-live read must compare
RENDERED FACTS, not serialized strings: two compilers can emit
`oklab(...)`, `rgba(...)`, `9999px`, and `calc(infinity * 1px)` for the
same rendered color/radius, and a naive string diff would false-DRIFT
on every one of them. The normalizations (canvas compositing for alpha
colors, rgb stop triples for gradients, is-round for infinite radii)
read the fact the pixels carry, not the syntax the compiler chose.

### WP-4 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set). The
34-file set re-taken through the COMMITTED procedure
(`bun run db:seed && node scripts/capture-round.mjs` against the dev
server) — expected byte-stable across the set (zero rendered-face
change this round); any movers root-caused (the known
rasterization/transition-instant/focus-instant/date-rollover classes)
before the ledger re-base; the cross-round comparison run + recorded
(the SEVENTH under the committed procedure).

### WP-5 — commit + push
`.env.example` re-verified against the tree (no env surface change
this round; it stays tracked + accurate). `git add` → commit → the
SSH-wrapper push (`--key-file <key outside repo>` + `--remote
git@github.com:nordeim/wellness-hub.git`, main only) → remote
verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-0** — validated: every cure site read (the list above); the
  login-face decode run live on both apps — 27 scalars MATCH, the
  three serialization classes decoded, the canvas + is-round
  normalizations byte-verified. The member set is decode-backed.
- **WP-1** — `scripts/parity-login.mjs` committed: PASS A the
  reference (zero logins), PASS B our dev server (zero logins), the
  34-member live-vs-live diff. Born-verification: the first flight
  read **34/34 MATCH, exit 0** — the second surface born quiet (the
  decode pre-verified it; the run confirmed nothing moved between
  the decode and the flight). VERIFIED LIVE.
- **WP-2** — the full gate GREEN: lint 0/0 · tsc 0 · unit **366/366
  (25 suites)** · build OK · smoke 14/14 · e2e **71/71** · census
  MATCH · bun audit zero. No src/ change (the cure procedure-side).
- **WP-3 docs** — PAD §11 (the watch row's round-25 update + the F-2
  parity-login row), AGENTS (the watch note: round 25 + the
  parity-login script + the zero-login doctrine + the cooling
  threshold), SKILL v1.33.0→v1.34.0 (the quick-reference parity row
  widened to both surfaces + LESSON 40 + the version), README/CLAUDE
  counts unchanged (verified against the lockstep pin — GREEN
  10/10), the worklog WH-36 entry, this record, docs/session_69.md.
- **WP-4 captures** — the 34-file set re-taken through the committed
  procedure (the doctrine LIVE — badgesEarned=0 asserted before the
  light set; census MATCH after); the SEVENTH cross-round byte
  comparison: **30/34 byte-stable, FOUR movers all root-caused before
  the re-base** — 10-learning (16 px, 0.0014%, maxdelta 7, two
  glyph-edge clusters) = the sub-visible TEXT-RASTERIZATION class
  (the standing WH-31/32 rasterization family's first landing on this
  file; the watch round 25's learning surface read MATCH on the same
  build — the computed face identical); 25-dark-login-focus
  (0.0067%) = the file's own focus-instant precedent (WH-33/34/35);
  29-quick-actions-hover (0.0004%, 5px) + 30-tutorial-card-hover
  (0.0015%, 17px) = the sub-visible rasterization/hover-instant
  classes (WH-31/32/35). All 34 files health-checked; the ledger
  re-based, verified 0 mismatches.
- **WP-5** — the commit + the SSH-wrapper push (main only), the key
  shredded after.

---

**Suggested next (for WH-37):** (a) the standing blocks re-check; (b)
`node scripts/watch-round.mjs` — watch round 26: **a stable read starts
the cooling policy** (every-round → every-other-round — a documented
doctrine change in the AGENTS note, not a silent one); (c) both parity
scripts as the standing companions (`parity-moodform.mjs` needs the dev
server; `parity-login.mjs` needs only the dev server — zero logins
either way on the login surface); (d) if BOTH parity surfaces stay
quiet for a few rounds, the net's third surface candidates: the
dashboard's stat-tile family or the sidebar shell (each needs the
one-login budget on the reference side).
