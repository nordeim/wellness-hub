# Session-35 Remediation Plan — the live-vs-live round (WH-35)

**Task ID:** WH-35 · **Date:** 2026-11-01 · **Branch:** `main` (only)
**Mission:** the WH-34 plan's own suggested next, executed against a
reference that moved AGAIN: **watch round 24 read a genuine MOVED on the
js axis** — `/static/index-CXmO9oF_.js` → `/static/index-BKhnHaM4.js`,
the FIFTH distinct JS bundle since round 20 — while the CSS content hash
stayed STABLE at `/static/index-BHjkUcdg.css` (unchanged since round 20)
and the CDN pipeline + `/api/frontend-config.js?v=3` remain present.
**NOT the second consecutive stable read** — the cooling policy does NOT
start; the watch stays every-round. The companion design's payoff landed
in the same run: the MOVED signal's demanded walk was satisfied by PASS
2's one-login digest in the SAME session — **15/15 computed surfaces
MATCH on the NEW bundle** (zero rendered-face drift through the fifth
bundle), the moodForm surface (the 15th, born at WH-34) holding on its
first post-birth round. Plus the WH-34 plan's suggested-next (c) landed:
the reference-side moodForm ledger exists, our side is pinned by the
(k) e2e leg, but NO procedure compares the two apps in the SAME round —
the e2e gate runs against our build, the watch against the reference, at
different moments. The cure is the committed same-round comparison:
`scripts/parity-moodform.mjs` — the live-vs-live read.

> **Reference probe (2 logins total this session — the watch round 24
> run + the parity script's born-verification PASS A; writes = ZERO on
> the reference — every surface read at rest; the mood form opened
> read-only and closed via Cancel, never submitted):** the watch round
> 24 through the committed script (PASS 1 the asset forms — the genuine
> js MOVED, the first TRUE-POSITIVE firing since the F-1 form cure: the
> hash genuinely changed this time; PASS 2 the one-login 15-surface
> computed digest — **15/15 MATCH**: the login geometry, the dashboard
> H1/tiles/gradient, the desktop shell (32px rows, 16px icons, 40px
> avatar, zero footers, zero landmarks), the Goals "Badges Earned 0 of
> 0", the routines 11-template 6/5 family split + the video-card
> computed set, the Schedule modal on BOTH families (3/5 circles), the
> learning trio, the calendar outline trio, the profile tablist, the
> mental-health demo state, the moodForm interior (its first
> post-birth verification), the sr zero-rows + upload field, the
> exercise/assignments zero-row states, the mobile header + the FULL
> drawer battery — the instruction's mobile-menu emphasis verified on
> the round-24 build). `bun audit` ZERO (the five-override posture
> holds).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `859c8aa` = WH-34 shipped + the operator's session_66
log push):** lint 0/0 · tsc 0 · unit **365/365 (25 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **71/71** · census MATCH — the
exact documented WH-34 ship state. **Plus the periodic `bun audit` duty:
ZERO vulnerabilities.** The instruction's checklist items verified on
the tree: the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"`
→ `<repo>/db/custom.db`, census MATCH), the vitest + playwright configs
in place and passing, the sitemap/robots/manifest/OG surfaces serving
(smoke check 12; the 14-route explicit-format handler read), the
Tailwind v4 pins present in `globals.css` (the hover unwrap, the dark
variant, `--shadow-sm`, `--blur-sm`, the three `@source not`),
`.env.example` tracked and accurate. The WH-34 diff reviewed (8 files —
docs + the watch script + the refreshed captures; clean). The neo-crm
sibling re-verified: the live repo's SKILL is at **v1.202.0**
(2026-11-01) — one re-validation bump past the v1.201.0 the WH-34 round
recorded, seven past our vendored v1.195.0, the same audit-round family
loop, no structural change to the tech-stack patterns.

**The audit method:** the watch round 24 through the committed
`scripts/watch-round.mjs` (the one-command procedure's second reuse —
it did its job twice over: the digest green on the new bundle AND the
PASS-1 form contract proven on its TRUE-POSITIVE branch), the WH-34
diff review, and the instruction's checklist items verified on the
tree. Our side of the (c) surface pre-verified in the gate: the (k)
leg green inside the 71/71 e2e battery.

Findings (by severity) — the WH-35 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **LOW — the round's maintenance core: the fifth bundle + the ledger re-base** | **Watch round 24 = a genuine js MOVED** — `/static/index-CXmO9oF_.js` → `/static/index-BKhnHaM4.js` (the fifth distinct JS bundle since round 20: `BFu7mt5f` → `DT3tkBuH` → `CXmO9oF_` → `BKhnHaM4`, on top of round 19's), the CSS content hash STABLE at `/static/index-BHjkUcdg.css` since round 20, the CDN pipeline + frontend-config still present. The active-cadence signal continues — **the second consecutive stable read did NOT happen; the cooling policy does not start** (the WH-34 plan's own wording: two-plus stable reads would start one). The PASS-2 digest ran in the same login on the NEW bundle: **15/15 MATCH, zero rendered-face drift** — the walk the MOVED signal demands was satisfied by the same run (the companion design's payoff: the watch fires, the walk is already done). The F-1 form contract (WH-34) is now proven on BOTH branches in production: round 23 read `assets stable` on the quiet state, round 24 fired MOVED on a real hash change — the first true-positive firing since the cure | `scripts/watch-round.mjs` (the LEDGER `jsPath` entry) | **Cure**: the ledger re-bases to `jsPath: "/static/index-BKhnHaM4.js"` — the md5-ledger doctrine (the ledger re-bases in the same commit as any cure), with the WH-34 amendment applied: the re-base birth-verifies BOTH outcomes — the re-run must read `WATCH assets stable` against the new bundle (the quiet state), not just the firing state that round 24 already exercised |
| F-2 | **LOW — the (c) gap + the REAL DRIFT its first run caught: the form-submit ink family** | **The two pin sets live on two clocks — and the first live-vs-live read proved the gap was real.** The reference's moodForm interior is ledgered in the watch script (WH-34, F-3); OUR side is pinned by the (k) e2e leg; both read green this session. But the two verifications ran at DIFFERENT moments against DIFFERENT builds — each app is compared against its own yesterday, never against the other's today. The cure — `scripts/parity-moodform.mjs` (PASS A the reference's form, PASS B ours, the member-by-member live-vs-live diff) — was born-verified this round, and **its first run caught a genuine cross-app drift no pin had ever compared**: `saveEntryColor` — the reference inks the form submits **neutral-50 `rgb(250, 250, 250)`**, OUR side inks them **white `rgb(255, 255, 255)`** (the shared `GRADIENT_BUTTON_BASE` carries `text-white`). The follow-up probes (2 more logins, all read-only) decoded the FULL family split: the reference's seven INLINE FORM-CARD submits (Save Workout, Save Entry, Create Goal, Create Event, Create Assignment, Create Reminder, Add Resource) all ink neutral-50, while its header/activator primaries (7) + the routines card activator + the Schedule modal's submit + the big Profile save all ink WHITE — our activators/modal/save parity holds; ONLY the 7 form-submit call sites drift (5/255, sub-visible but computed). The gap's provenance: the WH-34 watch ledger recorded the reference's `saveEntryColor: 250` and the (k) leg pinned the TILE ink white (correct — the tile family IS white) — nobody ever diffed the two apps' SAVE inks; the drift rode invisible through every green round since WH-15 | `src/lib/page-layout.ts` (the button constants) · `src/components/shared/page-parts.tsx` (GradientButton) · the 7 form-submit call sites | **Cure**: the ink split made structural — `GRADIENT_BUTTON_SUBMIT` = `GRADIENT_BUTTON_COMPACT` with exactly the `text-white` → `text-neutral-50` arm swapped (by construction; the census pins the byte-diff === the one arm), GradientButton gains the `submit` prop, the 7 form-submit call sites pass it (the activators/modal/Profile stay compact-white — parity verified). Pinned by: a new unit census (the constant's byte-diff + the 7 pass-sites + the activator family's absence of the arm) + the (k) leg extension (`saveEntryColor: rgb(250, 250, 250)` — the rendered-leaf proof). Born-verified by the parity script re-run: 20/20 members MATCH |
| F-3 | **LOW — positive, the standing record** | **The standing blocks all hold on the round-24 build.** The mobile drawer battery (the instruction's mobile-menu emphasis) verified TWICE this session: the watch's PASS-2 surface (288px sheet, border-r, hidden X, 32px rows, 11 hrefs, escape + unlock + viewport-grow auto-close) AND the e2e battery's 7-check mobile-navigation spec inside the 71/71 gate. The Tailwind v4 pins standing in `globals.css` (no new v4 bug class — the reference's CDN pipeline does not touch our compiled build). Census MATCH; `bun audit` zero; the WH-34 diff clean; the neo-crm sibling live at v1.202.0 (same family loop) | `Project_Architecture_Document.md` §11 (the watch row) | Document-only: the round-24 record lands in the watch row + the AGENTS watch note |

**No MEDIUM findings; no CRITICAL; no parity drift.** The round is a
watch-and-harden round in the WH-33/34 mold: the reference moved (the
fifth bundle), the face held (15/15), and the cures are the routine
ledger re-base (F-1) + the committed same-round comparison procedure
(F-2) + the docs ladder (F-3's record).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 25 | **26** | +1 — `tests/form-submit-ink.test.ts` (the ink census) |
| Unit checks | 365 | **366** | +1 — the F-2b ink census (the parity script itself stays outside the gate — the capture-round no-pin precedent) |
| E2E checks | 71 | **71** | none |
| §8.1 rows | infra 163 · a11y 22 · CRUD 22 | **unchanged** | no test change |
| Captures | 34 | **34** | the same committed set — expected byte-stable (zero rendered-face change this round; movers only as the known rasterization/transition-instant/date-rollover classes, root-caused before any re-base) |

**No CANONICAL flips in `tests/docs-counts.test.ts`** — the count ladder
is flat this round; the lockstep pin should read GREEN untouched after
the docs ladder (prose-only edits: the watch row, the AGENTS note, the
SKILL version bump + lesson 39).

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full this session: the watch script's LEDGER
block (the jsPath entry + its form-contract comment) + the PASS-1
comparison + the moodForm probe block (lines 585-679 — the member family
the parity script reuses) + the gotoApp helper + the login flow + the
report/exit machinery; our side's (k) leg (a11y.spec.ts:1224-1313 — the
member correspondence: the space-y-6 ladder, the mb-4 label, the 8px
min-1 track, the h-24 reflection, the 36px Cancel, the active-tile
label white) + our form source (`mentalhealth-page.tsx`: the
`useState("good")`/`useState(5)` defaults, the h2 heading, the
space-y-6 wrapper, the "Choose your mood" label, min={1}, the h-24
textarea, the Save Entry); the docs-counts CANONICAL block (no flips);
the PAD §11 watch row + the WH-34 rows (the update sites); the AGENTS
watch passage; the SKILL lesson slot + quick-reference table; the
capture-round procedure + the md5 ledger format.

### WP-1 — the F-1 cure (the ledger re-base, born-verified both ways)
The firing state is already observed and recorded above: round 24's
PASS-1 report read MOVED on the js axis with the hash genuinely
changed — the true-positive branch, live. The cure:
1. `scripts/watch-round.mjs` LEDGER: `jsPath:
   "/static/index-CXmO9oF_.js"` → `jsPath: "/static/index-BKhnHaM4.js"`
   (the probe's return form — the FORM CONTRACT comment already pins
   it; only the value moves).
2. The ledger header comment gains the round-24 provenance line (the
   fifth bundle, the CSS stable, the 15/15 digest on the new bundle).
3. Born-verification (the WH-34 amendment — BOTH outcomes): re-run the
   script — PASS 1 must read `WATCH assets stable (css
   /static/index-BHjkUcdg.css, js /static/index-BKhnHaM4.js, cdn true,
   cfg true)` — the quiet state against the new entry — and PASS 2
   must read 15/15 MATCH, exit 0. (If the reference deploys AGAIN
   mid-session, the run catches it — a real move, re-base again; the
   loop is honest, the WH-33 lesson.)

### WP-2 — the F-2 cure (the parity script — born-verified, and its first run caught the ink drift)
1. `scripts/parity-moodform.mjs`: PASS A — the reference probe (goto
   /login → the watch's login flow → gotoApp /MentalHealth → open New
   Entry → settle on the "How are you feeling today?" heading → read
   the computed member set in the same two-evaluate form the watch's
   moodForm block uses → close via Cancel → assert the form left the
   DOM). PASS B — the our-side probe (the dev server at
   localhost:3000, the demo login, the same read). Then the DIFF: the
   two live reads compared member-by-member (18 scalar members + 2
   gradient-stop families). A member MISSING on either side is a
   DRIFT (a probe error is an exit-1 failure, the standing
   machinery). The report prints per-member MATCH/DRIFT + a final
   line; exit 0 only when every member matches.
2. The zero-write doctrine in code and comment (both apps: open
   read-only, close via Cancel — never a submit).
3. Born-verification: the first run read 19/20 MATCH + **1 DRIFT —
   `saveEntryColor`: ref `rgb(250, 250, 250)` vs ours `rgb(255, 255,
   255)`** — the live-vs-live read catching what both pin sets missed
   (the script's designed purpose, proven on its first flight; the
   drift becomes WP-2b's cure). One script bug cured at birth (the
   gotoApp helper wrapped in a probe returned undefined on success —
   the plain-async form, the watch's own pattern).

### WP-2b — the F-2 drift cure (the form-submit ink family — TDD)
1. **RED**: the new unit census `tests/form-submit-ink.test.ts` —
   (a) `GRADIENT_BUTTON_SUBMIT` exists and its byte-diff vs
   `GRADIENT_BUTTON_COMPACT` is EXACTLY the `text-white` →
   `text-neutral-50` arm; (b) the pass-site count: exactly 7
   `<GradientButton` call sites carry the `submit` prop (the seven
   form submits: exercise/goals/events/mentalhealth/assignments/
   reminders/studyresources); (c) GradientButton's composition: the
   `submit` prop selects SUBMIT over COMPACT. Plus the (k) leg
   extension (the rendered proof: our Save Entry inks
     `rgb(250, 250, 250)`). Plus the CANONICAL flip unitChecks 365→366
   — the full unit RED at exactly the docs-counts lockstep sites.
2. **GREEN**: `GRADIENT_BUTTON_SUBMIT` in page-layout.ts (the
   `.replace("text-white", "text-neutral-50")` construction on
   COMPACT — the two constants can never drift apart except on the
   ink arm), the `submit?: boolean` prop on GradientButton, the 7
   call-site edits, the (k) leg's new expect.
3. **Born-verification**: the parity script re-run reads **20/20
   MATCH** (both apps, same round — the live-vs-live proof); the
   dev-server form faces re-probed; the gate GREEN.

### WP-3 — the full gate
lint 0/0 · tsc 0 · unit **365/365 (25 suites)** · build OK · smoke
14/14 · e2e **71/71** · census MATCH. No src/ change ships (both cures
procedure-side) — the console-hygiene net and the standing battery
should read unchanged. `bun audit` zero (the networked posture check,
outside the gate per the doctrine).

### WP-4 — the docs ladder
PAD §11 (the watch row's round-24 update: the fifth bundle, the CSS
stable, the 15/15 digest on the new bundle, the no-cooling-policy
outcome, the F-1 form contract's both-branches proof; the F-2
parity-script row), AGENTS (the watch note: round 24 + the re-base
doctrine applied + the parity script named), SKILL v1.32.0 →
**v1.33.0** (the parity-script passage + **LESSON 39**: "two pin sets
on two apps are two clocks — each app is compared against its own
yesterday, never against the other's today; the strongest parity check
is the same-round live-vs-live read, because either app can drift
between its own pin rounds while both pins stay green"), the
README/CLAUDE counts (unchanged — no flips, verified against the
lockstep pin), the worklog WH-35 entry (top), this plan's execution
record, `docs/session_67.md` (the session log convention: the round
commit carries the summary doc).

### WP-5 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set). The
34-file set re-taken through the COMMITTED procedure
(`bun run db:seed && node scripts/capture-round.mjs` against the dev
server) — expected byte-stable across the set (zero rendered-face
change this round); any movers root-caused (the known
rasterization/transition-instant/form-interior-caret/date-rollover
classes) before the ledger re-base; the cross-round comparison run +
recorded (the SIXTH under the committed procedure).

### WP-6 — commit + push
`.env.example` re-verified against the tree (no env surface change
this round; it stays tracked + accurate). `git add` → commit → the
SSH-wrapper push (`--key-file <key outside repo>` + `--remote
git@github.com:nordeim/wellness-hub.git`, main only) → remote
verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-0** — validated: every cure site read (the watch script's
  LEDGER/PASS-1/moodForm blocks + the login flow, the (k) leg's map,
  our form source's member correspondence, the docs-counts CANONICAL
  block [no flips — the count ladder flat], the PAD §11 watch row, the
  AGENTS watch passage, the SKILL lesson slot + quick-reference table,
  the capture-round procedure + the ledger format).
- **WP-1** — the re-base landed: `jsPath:
  "/static/index-BKhnHaM4.js"` + the round-24 provenance line in the
  ledger header. Born-verification: the re-run read `WATCH assets
  stable (css /static/index-BHjkUcdg.css, js /static/index-BKhnHaM4.js,
  cdn true, cfg true)` + **15/15 MATCH, exit 0** — both branches of
  the form contract now exercised on the new entry (round 24's
  true-positive firing, this run's quiet state). VERIFIED LIVE.
- **WP-2** — `scripts/parity-moodform.mjs` committed: PASS A the
  reference read, PASS B our dev-server read, the member-by-member
  live-vs-live diff. Born-verification: the FIRST flight read **19/20
  MATCH + 1 DRIFT — `saveEntryColor`: ref rgb(250,250,250) vs ours
  rgb(255,255,255)** — the live-vs-live read catching a real parity
  gap both pin sets had missed (the script's designed purpose, proven
  on its first flight; the drift became WP-2b's cure). One script bug
  cured at birth (the gotoApp helper wrapped in a probe returned
  undefined on success — the plain-async form, the watch's own
  pattern). Two follow-up reference probes (read-only, zero writes)
  decoded the full family split: the seven form submits neutral-50;
  the activators + the routines card + the Schedule modal + the
  Profile save white.
- **WP-2b** — the ink cure landed exactly as planned, TDD: **RED** at
  the expected sites (the gradient-ink pin failed at birth [1 failed];
  the CANONICAL flip failed the docs-counts lockstep at exactly the 6
  sites; the (k) leg's RED evidence = the parity run's live read of
  our 255). **GREEN**: `GRADIENT_BUTTON_SUBMIT` (the
  `.replace("text-white", "text-neutral-50")` construction on COMPACT)
  + the `submit` prop on GradientButton + the 7 call-site edits + the
  (k) leg's `saveEntryColor` expect. ONE mid-WP census catch: the
  GradientButton tree count is 16, not 18 — the Schedule modal rides
  its own `SCHEDULE_MODAL.button` constant (pinned separately, its
  text-white arm correct); the census corrected before the green run.
  **Born-verification**: the parity re-run reads **20/20 MATCH, exit
  0** + the rendered verification on the dev server (all 7 form
  submits neutral-50; the tile family, the 7 activators, the routines
  card, the Schedule modal and the Profile save all white) + tsc 0 +
  lint 0.
- **WP-3** — the full gate GREEN: lint 0/0 · tsc 0 · unit **366/366
  (25 suites)** · build OK · smoke 14/14 · e2e **71/71** (the (k) leg
  extension green in the battery) · census MATCH · bun audit zero. The
  src/ change: the ink split alone (page-layout.ts + page-parts.tsx +
  the 7 pages) — every other surface byte-stable.
- **WP-4 docs** — PAD §11 (the watch row's round-24 update + the F-2
  parity-script/ink-split row + the white-ink family row's neutral-50
  sub-family amendment [goals 1.84 the worst, measured] + §8.1's infra
  row 163→164 + the three count sites), AGENTS (the watch note: round
  24 + the re-base + the parity script named), SKILL v1.32.0→v1.33.0
  (the quick-reference table's parity row + LESSON 39 + the version +
  the §2 pin mention), README/CLAUDE counts flipped in lockstep (13
  sites + the badge), the worklog WH-35 entry, this record,
  docs/session_67.md. The lockstep pin GREEN (10/10).
- **WP-5 captures** — the doctrine LIVE (badgesEarned=0 asserted
  before the light set; census MATCH after); the SIXTH cross-round
  byte comparison: **30/34 byte-stable, FOUR movers all root-caused
  before the re-base** — 26-events-inline-form (0.0333%, maxdelta
  exactly 15 = the 5-per-channel × 3 ink delta) = THE F-2b CURE BY
  DESIGN (the Create Event submit's glyph pixels at the new
  neutral-50 ink — the only form-submit capture whose button rides
  inside the 900px fold; the taller forms' submits sit below the fold,
  their new ink verified LIVE by the parity 20/20 + the 7-button
  rendered pass); 25-dark-login-focus (0.0067%) = the file's own
  focus-instant precedent (WH-33/34); 29-quick-actions-hover
  (0.0004%, 5px) + 30-tutorial-card-hover (0.0015%, 17px) = the
  sub-visible rasterization/hover-instant classes (WH-31/32). All 34
  files health-checked; the ledger re-based, verified 0 mismatches.
- **WP-6** — the commit + the SSH-wrapper push (main only), the key
  shredded after.

---

**Suggested next (for WH-36):** (a) the standing blocks re-check; (b)
`node scripts/watch-round.mjs` — watch round 25 (the cooling policy
still needs two-plus CONSECUTIVE stable reads; round 24 broke the
streak); (c) `node scripts/parity-moodform.mjs` — the same-round
dual-app read (now a standing procedure — run it alongside the watch
each round, or every other round if the watch cools); (d) the parity
script's member set could widen to a second surface (the login family
is the natural next — the reference's (l)-leg map vs our login views)
if the moodForm run stays quiet a few rounds.
