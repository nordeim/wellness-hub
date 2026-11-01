# Session-37 Remediation Plan — the demo-account data parity + the shell nav parity surface (WH-37)

**Task ID:** WH-37 · **Date:** 2026-11-01 · **Branch:** `main` (only)
**Mission:** the WH-36 plan's suggested next, executed on a round where
**watch round 26 fired a genuine js MOVED** — the SIXTH distinct bundle
(`/static/index-BKhnHaM4.js` → `/static/index-CcEolDtM.js`; the CSS
content hash STABLE at `index-BHjkUcdg.css` since round 20; the CDN
pipeline + frontend-config present) — so the cooling policy does NOT
start (round 25's stable streak broke again; two-plus CONSECUTIVE
stable reads remain the threshold). The same-run PASS-2 digest read
**15/15 MATCH on the new bundle** (the walk the MOVED signal demands,
done by the companion itself — the WH-33 design's payoff; the mobile
header + the FULL drawer battery included, the instruction's
mobile-menu emphasis verified on the round-26 build). Both parity
companions ran as the standing procedures and read QUIET:
**parity-moodform 20/20 MATCH** (its third consecutive quiet flight)
and **parity-login 34/34 MATCH** (its second) — the WH-36 plan's (d)
precondition landed, and the round's decode-first work opened the
parity net's THIRD SURFACE (the shell nav family — the plan's own
candidate list, chosen over the dashboard's stat-tile family because
it is data-INdependent and it IS the instruction's standing
mobile-menu emphasis).

The decode-first probes (five scratch reads, both apps live) found
TWO real parity gaps the standing batteries had never diffed — the
round's two cures:

- **F-2 (the round's core): the demo-account DATA parity gap.** The
  reference's demo account carries ONE mood entry (decoded live:
  mood "Good", energy 5, dated Oct 29 2026, no activities/gratitude/
  reflection) — and its rendered faces differ from ours on the SAME
  login in THREE places: the mental-health stat trio (ref
  **5.0/10 · 1 · 1** vs ours **0.0/10 · 0 · 0**), the dashboard's
  Mood Entries tile (ref **1** vs ours **0**), and the Recent
  Activity feed (ref's 💚 "Mood check-in / good / Oct 29" row vs
  ours' "No recent activity" empty state). The gap rode invisible
  through every green round since WH-28 (when the reference's demo
  account gained the entry): the watch pins the reference's
  "1 entry" against its own ledger, our census pins moods=0 against
  its own contract — two pins, two clocks (the lesson-39 class on
  the DATA axis), never diffed. The stale premise is even in the
  ledger: PAD §11's "Reference's empty-state data" row justifies our
  empty demo lists with "the reference's fresh account is also
  empty" — a FRESH signup account, conflated with THE demo account
  the parity doctrine actually mirrors.
- **F-3 (the widening + its first catches): the shell nav drift
  family.** The third-surface decode read both apps' desktop
  sidebar + mobile header + drawer member-by-member and found FIVE
  authored-literal drifts: the nav rows' **font-weight family** (the
  reference renders its rows AND its active pill at font-weight
  **400**; ours ship `font-medium` 500 on the rows +
  `font-semibold` 600 on the active pill — at BOTH nav sites,
  desktop and drawer), the drawer rows' **alpha ink** (the reference
  computes SOLID `rgb(63, 63, 70)`; ours ride
  `text-sidebar-foreground/80` — 80% alpha ≈ rgb(102,102,108) on
  the white sheet), and the wordmark block's **`-mt-0.5` arm** (the
  reference's brand column computes marginTop 0px / height 44px;
  ours −2px / 42px). Every OTHER member decoded equal — including
  the sidebar's own geometry (256px border-box with a 1px
  border-right on BOTH apps — the decode's one probe artifact, a
  structural-walk landing on the reference's inner 255px column,
  resolved by a chain read: the shadcn wrapper carries the border
  exactly like our aside) and the full mobile battery (header,
  trigger, title x=68, sheet, rows, hrefs, escape/unlock/grow).

> **Reference probe (this session's budget: the watch round-26 run
> [its one login] + the parity-moodform run [one login] + the
> parity-login run [zero] + the seven decode probes [one login
> each, all read-only, ZERO writes] ≈ nine reference logins; writes
> = ZERO on the reference — every surface read at rest):** the watch
> round 26 (PASS 1 the sixth-bundle MOVED + PASS 2 the 15/15
> digest), the parity companions 20/20 + 34/34, the data decode
> (two probes — both apps' dashboard tiles + feed rows + the
> mental-health stats/journey rows), the shell decode (three
> probes — the 26-member computed set, the focused weight/alpha
> re-verify, the sidebar chain), the drawer-header decode, and the
> brand micro-decode (the wordmark block + the badge). `bun audit`
> ZERO (the five-override posture holds).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `00b50e0` = WH-36 shipped at `601c296` + the
operator's session_70 log push):** lint 0/0 · tsc 0 · unit **366/366
(25 suites)** · `bun run build` OK · smoke **14/14** · e2e **71/71**
· census MATCH — the exact documented WH-36 ship state. **Plus the
periodic `bun audit` duty: ZERO vulnerabilities.** The instruction's
checklist items verified on the tree: the `.env`/db contract
(`DATABASE_URL="file:../db/custom.db"` → `<repo>/db/custom.db`,
census MATCH), the vitest + playwright configs in place and passing,
the sitemap/robots/manifest/OG surfaces serving (smoke check 12; the
14-route explicit-format handler), the Tailwind v4 pins present in
`globals.css` (the hover unwrap, the dark variant, `--shadow-sm`,
`--blur-sm`, the three `@source not`), `.env.example` tracked and
accurate. The WH-36 diff reviewed (12 files: the parity-login script
+ the docs ladder + the four mover captures; clean — exactly the
documented second-surface round, zero src/ changes). The neo-crm
sibling re-verified: the live repo's SKILL is at **v1.202.0**
(2026-11-01) — unchanged from the WH-36 round's record, the same
family loop, no structural change to the tech-stack patterns.

**The audit method:** the baseline gate live, the watch round 26
through the committed script, both parity companions, the WH-36 diff
review, seven decode probes (both apps live, member-by-member), and
the instruction's checklist items verified on the tree.

Findings (by severity) — the WH-37 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **LOW — procedure** | **Watch round 26: a genuine js MOVED — the SIXTH distinct bundle** (`/static/index-BKhnHaM4.js` → `/static/index-CcEolDtM.js`; the CSS content hash STABLE at `/static/index-BHjkUcdg.css` since round 20; the CDN pipeline + frontend-config present) — NOT the second consecutive stable read, so the cooling policy does NOT start (round 25's stable streak broke; the watch stays every-round). The same-run PASS-2 digest read **15/15 MATCH on the new bundle** — the walk the MOVED signal demands, already done by the companion in the same run (the WH-33 design's payoff); the mobile header + FULL drawer battery green (the instruction's mobile-menu emphasis on the round-26 build) | `scripts/watch-round.mjs` (the LEDGER) | The ledger re-base: `jsPath` → `/static/index-CcEolDtM.js`, born-verified on BOTH outcomes (the firing state already exercised this round; the quiet state re-verified after the edit) |
| F-2 | **MEDIUM — the round's core: the demo-account DATA parity gap** | **The reference's demo account carries ONE mood entry and ours carries ZERO — three rendered faces differ on the same login** (the mental-health stat trio 5.0/10·1·1 vs 0.0/10·0·0; the dashboard Mood Entries tile 1 vs 0; the Recent Activity feed's 💚 "Mood check-in / good / Oct 29" row vs the "No recent activity" empty state). Decoded live through two scratch probes (both apps, the demo login): the reference's journey row renders `[Good / Oct 29, 2026 / Energy Level: 5/10]` with NO activities/gratitude/reflection lines — the entry's full data contract. The gap rode invisible since WH-28 (when the reference's demo account gained the row — the WH-28 decode itself says "the demo account's existing mood row opened all three read-only"): the watch's mentalHealth surface pins the reference's "1 entry, 5.0/10, streak 1" against its OWN ledger, our census pins moods=0 against its OWN contract, and PAD §11's "Reference's empty-state data" row justifies the empty demo lists with "the reference's fresh account is also empty" — a FRESH signup conflated with THE demo account. Two pins, two clocks, on the DATA axis — lesson 39's class in a dimension no parity surface covered | `prisma/seed.ts` + `scripts/census.ts` + `tests/seed-parity.test.ts` (new) + `tests/e2e/wellness-crud.spec.ts` (one leg) + PAD §11 | **Cure (TDD)**: the seed writes the MIRRORED demo mood entry (mood "good", energy 5, date **2026-10-29 fixed** — the reference's own row is fixed data; local-noon form so no timezone shifts the rendered date; activities/gratitude/reflection absent) right after the demo-user upsert (a direct Prisma write — the badge engine awards only at the API seams, so `userBadges` stays 0 and the capture-state doctrine's `badgesEarned=0` assertion holds). The census contract flips `moodEntries: 0 → 1` with the corrected comment (the DEMO account's face, not the fresh-account face). The new unit suite pins the seed source's demo-entry contract + the census EXPECTED (366→368, 25→26 suites). The new e2e leg pins the RENDERED demo face (the journey row + the tile + the feed row — the rendered-face pin, the round's own lesson: source pins can drift from rendered reality) (71→72). Born-verified: `db:seed` + census MATCH + the live face |
| F-3 | **MEDIUM — the widening + its decode catches: the shell nav drift family** | **The third-surface decode found five authored-literal drifts, live-verified on both apps:** (1) the desktop nav rows' `font-medium` (ours 500 vs the reference's **400**); (2) the desktop active pill's `font-semibold` (ours 600 vs **400** — the reference's active state distinguishes by gradient + white ink ONLY, never by weight); (3) the drawer rows' `font-medium` + the `text-sidebar-foreground/80` alpha arm (ours 500 + oklab(…/0.8) ≈ rgb(102,102,108) vs the reference's **400 + SOLID rgb(63,63,70)**; the `hover:text-sidebar-foreground` arm retires with the /80 — un-dimming a solid base is a no-op); (4) the drawer active pill's `font-semibold` (600 vs **400**); (5) the wordmark block's `-mt-0.5` (ours marginTop −2px / column 42px vs the reference's **0px / 44px**). Every other decoded member is EQUAL: the sidebar geometry (256px border-box + 1px border-right on BOTH — the decode's one artifact, a structural walk landing on the reference's inner 255px column, resolved by the chain read), the wordmark/badge/active-pill/ avatar gradient stop-triples, the 32px rows + 16px icons + 14px/zinc-700 ink, the three-zone borders/pads, the FULL mobile battery (the px-6 bar, the 28×28 r8 trigger, the title x=68, the 288px sheet, the hidden X, the 11 hrefs, escape + unlock + grow-auto-close). The weight/alpha/mt drifts are chassis inheritances no round ever diffed — the watch's desktopShell surface reads geometry only, the e2e asserts behavior only, and the WH-30 geometry decode predated the live-vs-live method | `src/lib/page-layout.ts` (NAV_LAYOUT.link/linkActive/brandSubtitle + MOBILE_NAV_SHEET.link/linkActive) + `scripts/parity-shell.mjs` (new) + `tests/src-census.test.ts` (the nav-weight census) | **Cure (TDD)**: the five literal edits (the weight arms + the /80 arm + its dead hover arm + the mt arm all retire — the records keep every decoded-equal arm). The new census `it` pins the absences (no `font-medium`/`font-semibold` in the four row records, no `/80`, no `mt-0.5`) + the solid ink + the 400 weights (368→369). **`scripts/parity-shell.mjs`** — the parity net's THIRD SURFACE: PASS A the reference (one login), PASS B ours (one login), the ~45-member live-vs-live diff across the desktop sidebar + the mobile header + the drawer battery (the gradient stop-triples + the ±1 sidebar-width normalization + the drawer-ink canvas normalization for any future alpha arm), zero-write on both apps (open → read → Escape; the grow-close cycle). Born-verified: the first flight reads ALL-MATCH on the cured tree |

**No CRITICAL findings.** Both cures are parity restorations in the
codebase's own doctrine (match the reference's rendered face on the
same login); the round also carries the standing records (F-1's
re-base) and the docs ladder.

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 25 | **26** | +1 — `tests/seed-parity.test.ts` (the demo-account data parity contract) |
| Unit checks | 366 | **369** | +2 (the seed source pin + the census EXPECTED pin) +1 (the nav-weight census `it` in `tests/src-census.test.ts`) |
| E2E checks | 71 | **72** | +1 — the demo-face leg in `tests/e2e/wellness-crud.spec.ts` (the seeded mood entry's rendered face: the journey row + the tile + the feed row) |
| §8.1 rows | infra 164 · CRUD 22 | **infra 165 · seed-parity 2 · CRUD 23** | the nav-weight census joins the infra row; the seed-parity suite gets its own row; the demo-face leg joins the CRUD row — every row recomputed, never hand-incremented |
| Captures | 34 | **34** | the same committed set — the two cures are DESIGNED pixel movers (the seeded data changes the dashboard/mental-health faces; the weight/ink/mt changes move every sidebar-bearing face); every mover root-caused to one of the two cures' classes before the re-base |

**CANONICAL flips in `tests/docs-counts.test.ts`:** unitChecks
366→369, unitSuites 25→26, e2eChecks 71→72 — and every doc site in
the SAME commit (the lockstep pin is the enforcer).

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full this session: the seed's demo-user block
+ the wipe list (`prisma/seed.ts`), the census EXPECTED block
(`scripts/census.ts`), the five drift literals + their consumers
(`src/lib/page-layout.ts` NAV_LAYOUT/MOBILE_NAV_SHEET +
`sidebar.tsx` + `mobile-nav.tsx`), the census pins that guard them
(`tests/src-census.test.ts`'s shell-contract block — no pin holds
the weight/alpha/mt arms), the e2e legs that walk the touched
surfaces (mobile-navigation's 7 checks, shell's 8, the CRUD mood +
feed + achievements legs — all member-scoped, none weight/count
sensitive; the `mood_first` badge condition `moodEntries >= 1`
unchanged by the seeded row — the badge fires at the first API
create either way, and the seed's direct Prisma write never calls
`awardBadges`, so `userBadges` stays 0), the docs-counts CANONICAL
block, the §8.1 rows, the PAD §11 rows (the watch row + the
empty-state-data row + the WH-30 shell row + the parity rows), the
AGENTS watch passage (line 197) + the commands table, the SKILL
quick-reference table (the parity row) + the lesson slot, the
capture-round procedure + the md5 ledger format, and the session-doc
convention (`docs/session_71.md` rides the round commit). The
decode probes verified every member live on BOTH apps (the two-cure
drift sets above are decode-backed, not imagined).

### WP-1 — the F-2 cure: the demo mood entry (TDD)
1. **RED**: `tests/seed-parity.test.ts` (new suite) — (a) the seed
   source pin: `prisma/seed.ts` creates exactly one demo mood entry
   (mood "good", energy 5, the fixed 2026-10-29 date, no
   activities/gratitude/reflection writes), sourced through the
   fs-read pattern (the route-census form — the seed is executable,
   not importable); (b) the census pin: `scripts/census.ts`'s
   EXPECTED reads `moodEntries: 1`. Both fail against the current
   tree (no entry; EXPECTED 0).
2. **GREEN**: the seed block (right after the demo-user upsert: a
   direct `db.moodEntry.create` with `userId: demo.id`, mood
   "good", energy 5, `date: new Date(2026, 9, 29, 12, 0, 0)` —
   local noon Oct 29 2026, stable across timezone offsets; no
   optional fields) + the census flip (`moodEntries: 1`, the
   comment corrected: the per-user domain tables seed empty EXCEPT
   the demo mood entry — the reference's own DEMO-account face, not
   its fresh-account face).
3. **The e2e leg** (the rendered-face pin): `wellness-crud.spec.ts`
   gains "the demo account's seeded mood entry renders the
   reference's demo face" — /MentalHealth asserts the journey row
   ("Good", "Oct 29, 2026", "Energy Level: 5/10") + the stat trio
   ("5.0/10", streak "1", total "1"); /dashboard asserts the
   "Mood Entries" tile reads 1 + the feed row ("Mood check-in",
   "good", "Oct 29", 💚). The RED evidence is the live decode's read
   (ours renders the empty face — probe #1/#2 this session).
4. **Born-verification**: `bun run db:seed` → `bun run db:census`
   reads moods=1 MATCH → the dev-server face re-read live (the
   journey row + the tile + the feed row render the reference's
   demo face).

### WP-2 — the F-3 cure: the five shell literals (TDD)
1. **RED**: the nav-weight census `it` in `tests/src-census.test.ts`
   (beside the WH-15 shell-contract block): the four row records
   carry NO `font-medium`/`font-semibold` (the reference's 400),
   `MOBILE_NAV_SHEET.link` carries NO `/80` alpha arm (the solid
   sidebar-foreground ink) and NO `hover:text-sidebar-foreground`
   (a no-op on a solid base), and `NAV_LAYOUT.brandSubtitle` carries
   NO `mt-0.5` (the reference's marginTop 0 / the 44px column).
   Fails against the current literals.
2. **GREEN**: the five literal edits in `src/lib/page-layout.ts` —
   `NAV_LAYOUT.link` (font-medium out), `NAV_LAYOUT.linkActive`
   (font-semibold out), `NAV_LAYOUT.brandSubtitle` (-mt-0.5 out),
   `MOBILE_NAV_SHEET.link` (font-medium + `/80` + the dead
   hover:text arm out), `MOBILE_NAV_SHEET.linkActive` (font-semibold
   out). No consumer changes (the records flow through the existing
   ternaries); every decoded-equal arm stays.
3. **Born-verification**: the dev-server computed re-read (the rows
   400 / the active 400 / the drawer ink solid rgb(63,63,70) / the
   brand column 44px) — then the parity script's first flight
   (WP-3) is the live-vs-live proof.

### WP-3 — the F-3 companion: `scripts/parity-shell.mjs` (born-verified)
1. The script, modeled on the parity-login/moodform machinery
   (probe / gotoApp / report / exit semantics):
   - **PASS A** (the reference, ONE login): /Dashboard at 1280×900
     → the desktop member read → 390×844 → the header read → the
     drawer open/read/Escape → the reopen/grow-close cycle.
   - **PASS B** (our dev server, ONE login): the same reads.
   - **The DIFF**: member-by-member, MATCH/DRIFT + a final line;
     exit 0 only when every member matches.
2. The member set (~45 scalars + 6 gradient families, all
   decode-backed): the desktop sidebar (the root-child-anchored
   width + border, the wordmark text/size/weight/gradient, the
   subtitle text/size/color/marginTop, the brand column height, the
   badge 40/40/16 + stops, the row 32px/16px-icon/14px/zinc-700/
   **400**, the active 32px/white/**400**/stops, the footer border/
   pad, the avatar 40/stops), the mobile header (padL/padT/borderB,
   the trigger 28/28/8 + the 16px icon, the title x=68/18px/stops,
   the text), the drawer (the ±1 width, borderR + color, the hidden
   X, the 11 hrefs, the row 32px/14px/**400**/SOLID ink, the active
   **400**/white, the drawer-brand title 18/700/stops + the
   description 12px/gray-500, the footer avatar 40, escape-closes +
   scroll-unlock + grow-auto-close).
   Normalizations: the gradient stop-triples (the standing class),
   the ±1 width tolerance (the WH-22 doctrine), the canvas composite
   for any alpha ink (the lesson-40 class, ready for future arms).
   Locators are computed-value anchors, NOT structural walks (the
   decode's own artifact lesson: the 255-vs-256 sidebar came from a
   walk landing on two different levels — anchor at the app-root's
   child, the gradient-text element, the bordered sheet).
3. **The zero-write doctrine**: open read-only → read → Escape; the
   grow-close cycle is the reference's own auto-close behavior. ONE
   login per app, no submits, no tile clicks.
4. **Born-verification**: the first flight on the cured tree reads
   ALL-MATCH, exit 0.

### WP-4 — the F-1 cure: the watch ledger re-base
`jsPath: "/static/index-BKhnHaM4.js"` → `"/static/index-CcEolDtM.js"`
(the firing state already exercised by round 26's run; the quiet
state birth-verified after the edit — the re-run reads `assets
stable` + 15/15, exit 0, per the WH-34 doctrine: a ledger edit
birth-verifies BOTH outcomes).

### WP-5 — the full gate
lint 0/0 · tsc 0 · unit **369/369 (26 suites)** · build OK · smoke
14/14 · e2e **72/72** · census MATCH (moods=1). `bun audit` zero
(the networked posture check, outside the gate per the doctrine).
The src/ changes: the five literals (page-layout.ts) — the
console-hygiene net, the a11y net (the drawer walks + the module
routes with the now-rendering journey row) and the standing battery
should read clean; any failure is cured, never pinned around.

### WP-6 — the docs ladder
- **PAD §11**: the watch row's round-26 update (the sixth bundle +
  the 15/15 digest + no cooling); the **F-2 row** (the demo-account
  data parity gap + the cure); the **F-3 row** (the shell nav drift
  family + the cure + the third surface); the **§11
  "Reference's empty-state data" row AMENDED** (the demo account now
  mirrors the reference's demo face — one seeded mood entry; the
  fresh-account claim stays true for fresh signups); §8.1's rows +
  the totals (369/26 + 72).
- **AGENTS.md**: the commands table + the gate order (369/72); the
  watch note (round 26 + the re-base); the parity row in the
  architecture facts (the THIRD surface named).
- **CLAUDE.md / README.md**: the counts in lockstep (the pin
  verifies); the README's e2e battery description gains the
  demo-face leg.
- **wellness-hub_SKILL.md**: v1.34.0 → **v1.35.0** (the
  quick-reference parity row widened to three surfaces + **LESSON
  41** + the version); the §8.1-mirroring counts.
- **worklog.md**: the WH-37 entry (the convention: it rides the same
  commit).
- **This plan's execution record** + **docs/session_71.md** (the
  round summary doc).

**The lesson candidate (lesson 41)**: the demo ACCOUNT is itself a
parity surface — its DATA state, not just its chrome, must be
diffed live-vs-live. The reference's demo account gained a mood row
nine rounds ago; the watch pinned "1 entry" green against its own
ledger, our census pinned moods=0 green against its own contract,
and three rendered faces drifted apart behind both green pins —
lesson 39's two-clocks class on the DATA axis, a dimension no
computed-style parity surface covers. The stale premise's anatomy:
"a FRESH account is also empty" was written when it was true of the
demo account too, and nobody re-read the premise when the watch
ledger began pinning "1 entry" — a premise is a live fact about a
subject that moves. The cure's shape: the seed mirrors the decoded
row (a fixed date, the reference's own data being fixed), the
rendered face is pinned in the gate (the e2e leg — a source pin can
drift from rendered reality), and the census contract carries the
corrected premise. Second half (the decode's own artifact): a
structural walk is not a locator — the 255-vs-256 sidebar "drift"
was the walk landing on the reference's inner column; anchor parity
locators at computed-value facts (the root's child, the
gradient-text element, the bordered sheet), and re-read any walk
that reports a drift before believing it.

### WP-7 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set —
the seeded entry does NOT award: the seed writes directly, the
badge engine awards only at the API seams). The 34-file set
re-taken through the committed procedure (`bun run db:seed && node
scripts/capture-round.mjs` against the dev server). Expected
movers, all root-caused BEFORE the re-base: the F-2 class (the
dashboard/mental-health faces — 02, 05, 14, 17, 34 at minimum) and
the F-3 class (every sidebar-bearing face — the weight/ink/mt
changes move glyph pixels across the desktop + drawer captures);
plus the known sub-visible classes (the rasterization/focus-instant
precedents). The EIGHTH cross-round comparison recorded in the
ledger header.

### WP-8 — commit + push
`.env.example` re-verified against the tree (no env surface change
this round; stays tracked + accurate). The scratch decode probes
DELETED (the zero-residue doctrine). `git add` → commit → the
SSH-wrapper push (`--key-file <key outside repo>` + `--remote
git@github.com:nordeim/wellness-hub.git`, main only) → remote
verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-0** — validated: every cure site read (the list above); the
  decode probes verified both drift sets live on BOTH apps; the
  e2e/census impact analysis done (the mood CRUD/feed/achievements
  legs member-scoped; `mood_first` fires at the first API create
  either way; the capture-state assertion unaffected). PLUS one
  impact found at execution time and cured with the F-2 work: the
  a11y suite's afterEach mood cleanup deleted ALL rows ("restore
  pristine" implemented as the old era's pristine = zero rows) —
  amended to preserve the seeded row by its fixed 2026-10-29 date
  (lesson 41's cleanup half).
- **WP-1** — RED: both seed-parity checks failed at birth (no demo
  entry; EXPECTED 0). GREEN: the seed block + the census flip.
  Born-verified: `db:seed` runs the entry; census reads moods=1
  MATCH; the demo-face e2e leg pins the rendered face (running
  FIRST in the CRUD battery on the pristine state).
- **WP-2** — RED: the nav-weight census failed at birth (all five
  drifts present). GREEN: the five literal edits; the WH-30 census's
  two pinned forms (the `font-[a-z]+` regex requirement + the full
  sheetLink literal) flipped WITH the cure per the lesson-36
  doctrine. Born-verified: the unit census green + the parity
  flight's computed reads (rows 400 / active 400 / solid ink /
  col 44px).
- **WP-3** — `scripts/parity-shell.mjs` committed: 61 members (26
  desktop + 29 mobile + 6 gradient families). Three probe lessons
  cured at birth (two member-name mismatches; the
  drawer-description locator walking to our gradient span instead of
  the Description; the root-child anchor stopping at the reference's
  borderless shadcn group wrapper — refined to the BORDERED-COLUMN
  walk: the first full-height ancestor carrying a right border).
  **Born-verified: 61/61 MATCH, exit 0** on the cured tree.
- **WP-4** — the ledger re-based to `/static/index-CcEolDtM.js`;
  born-verified on BOTH outcomes (the firing state: the round-26
  first run's MOVED; the quiet state: the post-edit re-run reading
  `assets stable` + 15/15, exit 0).
- **WP-5** — the full gate GREEN at the NEW counts: lint 0/0 · tsc 0
  · unit **369/369 (26 suites)** · build OK · smoke **14/14** · e2e
  **72/72** · census MATCH (moods=1) · `bun audit` zero. The count
  ladder: +3 unit checks (the seed-parity suite ×2 + the nav-weight
  census), suites 25→26, +1 e2e (the demo-face leg), the §8.1 rows
  recomputed (infra 165 · the new seed-parity row · CRUD 23) — the
  lockstep pin GREEN (the pin's own unit-row expectation flipped 3→4
  with the new row).
- **WP-6** — the docs ladder landed: PAD §11 (the watch row's
  round-26 record + the F-2 row + the F-3 row + the amended
  empty-state-data row + §8.1 + the counts), AGENTS (the counts +
  the watch note naming the third surface + the three-script
  standing companion), SKILL v1.34.0→**v1.35.0** (the parity row
  widened to three surfaces + **LESSON 41** + the version), README/
  CLAUDE in lockstep, the worklog WH-37 entry, this record,
  docs/session_71.md.
- **WP-7** — the captures re-taken through the committed procedure
  (badgesEarned=0 asserted; census MATCH after, moods=1). The EIGHTH
  cross-round byte comparison: **7/34 byte-stable, 27 movers all
  root-caused before the re-base** — the F-2 data class BY DESIGN
  (02/05/14/17/34 + 29: the seeded row renders the journey/stats/
  tile/feed faces, 29's 21.3% being the capture's own
  "with-the-feed-row" account state joined by the seeded row), the
  F-3 shell class BY DESIGN (03-12 + 15/18/19 + 24/26-28/30-33: the
  weight/ink/mt pixels, the isolated regions reading exactly the
  x[0-255] sidebar column), and the known precedents (25's
  focus-instant, 77 px/0.0067%, the fifth consecutive round; 29/30's
  residual sub-visible arms). The 7 byte-stable: the logged-out faces
  (01/13/20-23) + 16 (the drawer closes on route-change — neither
  sidebar nor data). The ledger re-based, verified 0 mismatches.
- **WP-8** — the scratch decode probes deleted (zero residue); the
  commit + the SSH-wrapper push (main only), the key shredded
  after.

---

**Suggested next (for WH-38):** (a) the standing blocks re-check; (b)
`node scripts/watch-round.mjs` — watch round 27 (the cooling policy
still needs two-plus consecutive stable reads; round 26 broke the
streak again); (c) all THREE parity scripts as the standing
companions (moodForm one login, login zero, shell one — four
reference logins per round with the watch); (d) the fourth-surface
candidates: the dashboard's stat-tile family (NOW data-clean to
compare — the F-2 cure makes the tile values match by construction)
or the module page headers (the PAGE_THEMES identity family).
