# Session-34 Remediation Plan — the stable-read round (WH-34)

**Task ID:** WH-34 · **Date:** 2026-11-01 · **Branch:** `main` (only)
**Mission:** the WH-33 plan's own suggested next, executed against a
reference that finally held still: **watch round 23 is the STABLE READ —
both content hashes unchanged** (`/static/index-BHjkUcdg.css` +
`/static/index-CXmO9oF_.js`, the CDN pipeline + `/api/frontend-config.js?v=3`
still present), the committed watch script's 14-surface computed digest
**ALL MATCH**. After four bundles in two days (rounds 20–22), the first
stable round — the cooling note the WH-33 plan's own prediction tree named.
But the watch's PASS-1 report read **"MOVED" for the js asset anyway — a
FALSE POSITIVE**: the ledger's `jsBundle` entry was born (at the WH-33
re-base) in the BARE-BASENAME form (`index-CXmO9oF_.js`) while the probe
returns the FULL PATH (`/static/index-CXmO9oF_.js`), so the js comparison
`assets.js !== LEDGER.jsBundle` can NEVER read stable — **the round's core
finding (F-1)**. Plus the two WH-33 suggested-next probes, both landed:
**(c)** the `/api/frontend-config.js` payload DECODED (present since round
19, never opened — it is the Base44 PLATFORM's runtime config, zero
wellness-app face values), and **(d)** the mood-form computed interior
decoded + joining the watch script's canonical set as its 15th surface.

> **Reference probe (5 logins total this session — the watch run + three
> mood-form probes + one default-state probe; writes = ZERO on the
> reference — every surface read at rest; the mood form opened read-only
> and closed via Cancel, a tile clicked once for the active-state read,
> never submitted):** the watch round 23 through the committed script
> (PASS 1 the asset forms — the false-positive MOVED read on the js axis
> with the content hash STABLE, the (b) signal degraded by the F-1 form
> bug; PASS 2 the one-login 14-surface computed digest — **14/14 MATCH**:
> the login geometry, the dashboard H1/tiles/gradient, the desktop shell
> (32px rows, 16px icons, 40px avatar, zero footers, zero landmarks), the
> Goals "Badges Earned 0 of 0", the routines 11-template 6/5 family split
> + the video-card computed set, the Schedule modal on BOTH families
> (3/5 circles), the learning trio, the calendar outline trio, the
> profile tablist, the mental-health demo state, the sr zero-rows +
> upload field, the exercise/assignments zero-row states, the mobile
> header + the FULL drawer battery — the instruction's mobile-menu
> emphasis verified again on the round-23 read); the `/api/frontend-config.js`
> payload fetched logged-out and decoded (the (c) probe — the full key
> inventory below); the mood form's computed interior read in three
> passes (the structural ladder, the active-tile/Save Entry states, the
> default open state). `bun audit` ZERO (the five-override posture holds).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `da69542` = WH-33 shipped at `d1b4773` + the operator's
session-log push):** lint 0/0 · tsc 0 · unit **365/365 (25 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **71/71** · census MATCH — the
exact documented WH-33 ship state. **Plus the periodic `bun audit` duty:
ZERO vulnerabilities.** The instruction's checklist items verified on the
tree: the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"` →
`<repo>/db/custom.db`, census MATCH), the vitest + playwright configs in
place and passing, the sitemap/robots/manifest/OG surfaces serving (smoke
check 12; the sitemap route read — the 14-route explicit-format handler),
the Tailwind v4 pins present in `globals.css` (the hover unwrap, the dark
variant, `--shadow-sm`, `--blur-sm`, the three `@source not`), `.env.example`
tracked and accurate. The neo-crm sibling re-verified: the live repo's
SKILL is at **v1.201.0** (2026-11-01) — six re-validation bumps past our
vendored v1.195.0, the same audit-round family loop, no structural change
to the tech-stack patterns the instruction references it for.

**The audit method:** the watch round 23 through the committed
`scripts/watch-round.mjs` (the one-command procedure's first reuse — it
did its job: the 14-surface digest green, and its PASS-1 report exposed
the F-1 form bug), the two WH-33 suggested-next probes ((c) + (d)) run
live through Playwright against the reference, the WH-33 diff reviewed
(docs + the watch script + the refreshed captures — clean), and the
instruction's checklist items verified on the tree.

Findings (by severity) — the WH-34 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **LOW — the round's core, a false-positive generator in the watch's own machinery** | **The watch script's js-ledger entry was born in the WRONG FORM.** The ledger's `cssPath` carries the FULL PATH (`/static/index-BHjkUcdg.css` — matching the probe's return form, so the css comparison works), but `jsBundle` carries the BARE BASENAME (`index-CXmO9oF_.js` — the WH-33 re-base wrote the bare form), while the probe returns `assets.js` as the full path (`/static/index-CXmO9oF_.js`). The comparison `assets.js !== LEDGER.jsBundle` is therefore ALWAYS TRUE — the js axis can never read "stable". This round proved it live: round 23 is the genuinely stable read (both content hashes unchanged) yet PASS 1 reported `js index-CXmO9oF_.js -> /static/index-CXmO9oF_.js — run the full lesson-30 walk`. An informational signal that always fires is a signal that gets ignored — the boy-who-cried-wolf failure mode, lesson 37's own subject now in miniature INSIDE the watch's machinery. The WH-33 first-run lessons (the SPA race, the href scoping) were all FALSE-NEGATIVE classes; this is the first FALSE-POSITIVE class, and it was born at the ledger re-base — the one edit made without a re-run of PASS 1 against the quiet state | `scripts/watch-round.mjs` (the LEDGER block + the PASS-1 comparison) | **Cure**: the ledger entry normalized to the probe's return form and renamed for form-consistency — `jsBundle: "index-CXmO9oF_.js"` → `jsPath: "/static/index-CXmO9oF_.js"` (both axes now full-path, both comparisons identical in form; a path-shape move `/static/` ↔ `/assets/` still fires the watch, which is CORRECT — the doctrine reads "a move is the signal to run the walk"). A comment pins the form contract at the ledger. **Born-verification**: the re-run reads `WATCH assets stable` on the js axis — the quiet state verified, not just the firing state |
| F-2 | **LOW — positive, decoded (the (c) probe), document-only** | **The reference's `/api/frontend-config.js` payload decoded** (present since round 19, never opened until now). It is `window.__APP_CONFIG__` — the Base44 **PLATFORM's** runtime config, not the wellness app's: `BACKEND_URL`/`SDK_BACKEND_URL`/`PLATFORM_URL` (app.base44.com), `MIXPANEL_ENABLED: true`, `FROG_ENABLED: true`, `TURNSTILE_SITE_KEY` + the three `TURNSTILE_*_ENABLED` arms (login + password-reset CAPTCHA), `GOOGLE_CLIENT_ID` (OAuth), four `DATADOG_*` RUM arms, the platform `GIT_SHA`, `FIVERR_*` marketplace URLs, `APP_FLAVOR: "platform"`, and a `PRE_AUTH_FLAGS`/`PRE_AUTH_EXPERIMENTS` block (incl. an `auth-signup-free-tagline` variant assignment). **ZERO wellness-app face/design values** — the config is the platform shell's runtime environment, which also EXPLAINS the redeployment cadence: the platform's own deploys move the bundle hash while the app's face holds (exactly what rounds 21+22 observed). No parity gap: our self-hosted clone deliberately carries no third-party telemetry/CAPTCHA — our own scrypt+HMAC ladder + per-IP rate limits serve those seams (and the reference's Turnstile arms are the platform's, not the app's) | `Project_Architecture_Document.md` §11 (the watch row's round-23 note) | Document-only: the decode joins the watch row's record — the config surface is now DECODED, closing the WH-33 suggested-next (c) |
| F-3 | **LOW — positive, decoded (the (d) probe) + a watch-set extension** | **The mood-form computed interior decoded on the reference — and it joins the watch script's canonical set as the 15th surface.** The full read: the form card (`rounded-xl border bg-card border-none shadow-xl`) → body `p-6 pt-0` → ONE `div.space-y-6` wrapper → **7 field groups at 24px gaps** (the ONE space-y-6 form — its siblings ride space-y-4, the (k) leg's map); the "Choose your mood" label at **mb-4 (16px label→grid gap)**; the **5 tiles** (😄Amazing 😊Good 😐Okay 😔Low 😢Struggling) with the DEFAULT OPEN STATE pre-selecting **Good** — the `bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-transparent shadow-lg scale-105` active family (`rgb(59,130,246) → rgb(6,182,212)`) — matching OUR `useState("good")` byte-parity (the default-state question settled by a dedicated probe: BOTH apps open Good-selected); the inactive border gray-200 `rgb(229,231,235)`; the **8px gray-200 range at min=1** with the default "Energy Level: 5/10" (our `useState(5)`); the Low/High `mt-1` gray-500; the h-24 (96px) reflection + the 60px gratitude; the h-9 (36px) outline Cancel; the **Save Entry** submit at 36px with the `from-emerald-500 to-teal-500` gradient (`rgb(16,185,129) → rgb(20,184,166)`, ink `rgb(250,250,250)`) — byte-parity with our `PAGE_THEMES.mentalhealth.button`. The gap: the watch script's mood surface reads the LIST interior + stats only — the form's own computed set rides no ledger surface (the WH-33 suggested-next (d) named it) | `scripts/watch-round.mjs` (+1 canonical surface — the LEDGER `moodForm` entry + the probe block) | **Cure**: the `moodForm` surface joins PASS 2 — open New Entry read-only (settle on the "How are you feeling today?" heading), read the computed set (the wrapper ladder, the 5 tiles with the DEFAULT-SELECTED Good tile's gradient/color, the inactive border, the range family, the Low/High, the reflection heights, the Cancel/Save Entry family), close via Cancel (the zero-write doctrine — no click needed: the default state carries the active tile). The ledger born from this round's verified probes; the born-verification run reads 15/15 MATCH |
| F-4 | **LOW — the standing blocks + the watch record** | **Watch round 23 = the stable read.** Both content hashes unchanged (`index-BHjkUcdg.css` + `index-CXmO9oF_.js` — the first round since 20 with zero asset movement), the CDN pipeline + frontend-config still present, the 14-surface computed digest ALL MATCH. After the four-bundles-in-two-days cadence (rounds 20–22), the cooling note the WH-33 plan's own prediction tree named: "a stable read starts the cooling note". The standing blocks all hold (the mobile drawer battery byte-parity — the instruction's mobile-menu emphasis, verified on the round-23 read; the Tailwind v4 pins standing; census MATCH; `bun audit` zero). The watch doctrine stays "EVERY round while the cadence holds" — one stable round is a cooling NOTE, not a cooling POLICY (the WH-33 plan's own wording; two-plus stable rounds would start one) | `Project_Architecture_Document.md` §11 (the watch row) · AGENTS.md (the watch note) · the watch script's ledger comment | The round-23 record + the cooling note land in the watch row/note; the watch keeps running every round |

**No MEDIUM findings; no CRITICAL; no parity drift.** The round is a
watch-and-harden round in the WH-33 mold: the reference held, and the
cures are the watch's own false-positive fix (F-1) + the canonical set's
moodForm extension (F-3) + the docs ladder (F-2/F-4 records).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 25 | **25** | none |
| Unit checks | 365 | **365** | none — both cures are procedure-side (`scripts/watch-round.mjs`, the capture-round no-pin precedent: network-dependent procedures live outside the gate, docs-referenced only) |
| E2E checks | 71 | **71** | none |
| §8.1 rows | infra 163 · a11y 22 · CRUD 22 | **unchanged** | no test change |
| Captures | 34 | **34** | the same committed set — expected ALL byte-stable this round (zero rendered-face change; movers only as the known rasterization/transition-instant/date-rollover classes, root-caused before any re-base) |

**No CANONICAL flips in `tests/docs-counts.test.ts`** — the count ladder
is flat this round; the lockstep pin should read GREEN untouched after
the docs ladder (prose-only edits: the watch row, the AGENTS note, the
SKILL version bump + lesson 38).

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full this session: the watch script's LEDGER
block + PASS-1 comparison + the mentalHealth surface block (the
extension site) + the sr inline-form precedent (the open-read-only/
close pattern) + the gotoApp helper + the report/probe machinery; the
docs-counts CANONICAL block (no flips); the PAD §11 watch row + the
F-1 companion row (the round-23 update sites); the AGENTS watch
passage; the SKILL §8/§12 sites (lesson 37's successor slot); the
capture-round procedure + the md5 ledger format; the (k) leg's map
(our side's mood-form pin — the reference decode compared against it);
the PAGE_THEMES.mentalhealth entry (the Save Entry button parity).

### WP-1 — the F-1 cure (RED observed → GREEN verified)
The RED state is already observed and recorded above: round 23's PASS-1
report reads MOVED on the js axis while the content hash is stable —
the false positive, live. The cure:
1. `scripts/watch-round.mjs` LEDGER: `jsBundle: "index-CXmO9oF_.js"` →
   `jsPath: "/static/index-CXmO9oF_.js"` (the probe's return form; both
   axes full-path now).
2. The PASS-1 comparison + the moved-report strings follow the rename.
3. A comment at the ledger pins the form contract: both entries carry
   the probe's return form (the full path); a bare-basename entry can
   never match and degenerates the axis into an always-fired signal
   (this round's lesson).
4. Born-verification: re-run the script — PASS 1 must read
   `WATCH assets stable (css /static/index-BHjkUcdg.css, js
   /static/index-CXmO9oF_.js, cdn true, cfg true)` — the quiet state
   verified (the run also re-verifies the 15-surface digest of WP-2 in
   the same login).

### WP-2 — the F-3 cure (the moodForm surface)
1. The LEDGER gains the `moodForm` entry — every value from this
   round's verified probes (the structural ladder, the tile family,
   the range family, the textareas, the buttons).
2. The probe block (after the mentalHealth block): gotoApp
   /MentalHealth → click "New Entry" → settle on the "How are you
   feeling today?" heading → read the computed set in one evaluate
   (walk the range → the shadow-xl card → the body → the space-y-6
   wrapper; count the groups + the first gap; the grid tiles; the
   DEFAULT-selected tile's gradient/color (no click — the default
   state carries it, the zero-write doctrine at its cleanest); the
   range height/min/track; the Low/High; the reflection + gratitude
   heights; the Cancel/Save Entry heights + the Save Entry gradient
   stops + ink) → close via Cancel → assert the form left the DOM.
3. MATCH/DRIFT against the ledger; a drift or probe error exits
   non-zero (the standing machinery).
4. Born-verification: the same run as WP-1 — 15/15 MATCH, exit 0.

### WP-3 — the full gate
lint 0/0 · tsc 0 · unit **365/365 (25 suites)** · build OK · smoke
14/14 · e2e **71/71** · census MATCH. No src/ change ships (the
watch script lives outside the app tree; the docs ladder is docs) —
the console-hygiene net and the standing battery should read
unchanged. `bun audit` zero (the networked posture check, outside the
gate per the doctrine).

### WP-4 — the docs ladder
PAD §11 (the watch row's round-23 update: the stable read + the
cooling note + the F-1 form-bug record + the F-2 config decode + the
15-surface set; the F-1 cure gets its own RETIRED-to-closed row), 
AGENTS (the watch note: round 23 stable + the jsPath form contract +
the moodForm surface named + the cooling-note doctrine), SKILL
v1.31.0 → **v1.32.0** (the watch-script passages updated + **LESSON
38**: "verify the watch's QUIET state, not just its firing state — a
ledger entry born in a different form than its probe returns is a
false-positive generator: the comparison can never read stable, the
informational signal fires every round, and a signal that always
fires is a signal that gets ignored. The WH-33 first-run lessons were
all false-NEGATIVE classes (races and scoping — surfaces reading
DRIFT that should read MATCH); the re-base introduced the first
false-POSITIVE class (a surface reading MOVED that should read
stable) because the one edit made without a re-run was the ledger
itself. Birth-verify every ledger edit against BOTH outcomes"), the
README/CLAUDE counts (unchanged — no flips, verified against the
lockstep pin), the worklog WH-34 entry (top), this plan's execution
record, `docs/session_65.md` (the session log convention: the round
commit carries the summary doc).

### WP-5 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set). The
34-file set re-taken through the COMMITTED procedure
(`bun run db:seed && node scripts/capture-round.mjs` against the dev
server) — expected byte-stable across the set (zero rendered-face
change this round); any movers root-caused (the known
rasterization/transition-instant/form-interior-caret classes) before
the ledger re-base; the cross-round comparison run + recorded.

### WP-6 — commit + push
`.env.example` re-verified against the tree (no env surface change
this round; it stays tracked + accurate). `git add` → commit → the
SSH-wrapper push (`--key-file <key outside repo>` + `--remote
git@github.com:nordeim/wellness-hub.git`, main only) → remote
verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-0** — validated: every cure site read (the watch script's
  LEDGER/PASS-1/mentalHealth blocks + the sr inline-form precedent, the
  docs-counts CANONICAL block [no flips — the count ladder flat], the
  PAD §11 watch row + companion row, the AGENTS watch passage, the SKILL
  lesson slot + the quick-reference table, the (k) leg's map +
  PAGE_THEMES.mentalhealth, the capture-round procedure + the ledger
  format).
- **WP-1** — the F-1 cure landed exactly as planned: `jsBundle` →
  `jsPath: "/static/index-CXmO9oF_.js"` (both axes full-path,
  form-matched), the FORM CONTRACT pinned in a ledger comment, the
  LEDGER PROVENANCE doctrine amended (birth-verify BOTH outcomes). The
  born-verification run read `WATCH assets stable (css
  /static/index-BHjkUcdg.css, js /static/index-CXmO9oF_.js, cdn true,
  cfg true)` — the quiet state verified, the false-positive class dead.
- **WP-2** — the moodForm surface joined PASS 2 with the
  LEDGER.moodForm entry born from this round's probes. ONE probe lesson
  surfaced on the first run and was cured in-place (the
  heading-locator class): the reference's form title is NOT an `<h2>`
  — the first run read `heading: undefined` and DRIFTed with every
  other value matching; the locator widened to the `h2, h3,
  [class*='font-semibold']` family (the stock card-title form) and the
  re-run read **15/15 MATCH, exit 0** (the same run verifying WP-1's
  quiet state — one login, both cures).
- **WP-3** — the full gate GREEN: lint 0/0 · tsc 0 · unit 365/365
  (25 suites) · build OK · smoke 14/14 · e2e 71/71 · census MATCH ·
  bun audit zero. No src/ change shipped.
- **WP-4 docs** — PAD §11 (the watch row's round-23 stable-read update
  carrying the config decode + the moodForm 15-surface note + the F-1
  false-positive class; the F-1 cure row RETIRED-to-closed; the F-3
  moodForm row documented + ledgered), AGENTS (the watch note: round 23
  + the jsPath form contract + the birth-verify-both-outcomes doctrine
  + the config decode), SKILL v1.31.0→v1.32.0 (the quick-reference
  table's watch-round row + LESSON 38 + the version), README/CLAUDE
  counts verified unchanged against the lockstep pin (flat count
  ladder), the worklog WH-34 entry, this record, docs/session_65.md.
- **WP-5 captures** — the doctrine LIVE (badgesEarned=0 asserted
  before the light set; census MATCH after); the FIFTH cross-round
  byte comparison: **34/34 byte-stable, ZERO movers — the cleanest
  round yet** (zero rendered-face change shipped; and for the first
  time no procedure-state class fired either: the WH-33 base and this
  set were captured on the SAME calendar day 2026-11-01 — no
  date-rollover, no focus-instant, no caret band; all 34 files
  health-checked: PNG signatures, sizes, byte-entropy). The ledger's
  data lines unchanged; the header carries the WH-34 record.
- **WP-6** — the commit + the SSH-wrapper push (main only), the key
  shredded after.

---

**Suggested next (for WH-35):** (a) the standing blocks re-check; (b)
`node scripts/watch-round.mjs` — a SECOND consecutive stable read
starts the actual cooling policy (the watch could drop to every-other-
round cadence, a documented doctrine change, not a silent one); (c)
the reference's Turnstile arms decoded further IF the signup/login
flows ever observably change (the config surface is decoded; the
CAPTCHA arms are platform-side — a face-side change would surface in
the standing maps first); (d) the watch script's moodForm surface
compared against OUR dev server's (k)-leg values in one combined run
(the reference-side ledger exists now; an our-side comparison pass
would catch a same-round drift on either app).
