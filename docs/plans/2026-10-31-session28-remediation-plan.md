# Session-28 Remediation Plan — the data-bearing surfaces round (WH-28)

**Task ID:** WH-28 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** the WH-27 plan's own suggested next, executed as the
redeployment-watch round it anticipated — and the watch FIRED: the
reference's compiled-CSS hash moved for the first time since WH-15
(`/static/index-s8d1FO8M.css` → `/assets/index-heGLHP2e.css`, the path
shape itself changed — round 16). Every standing parity map re-verified
live on the redeployed reference, and the round's core discovery: **the
reference's demo account now carries data** (1 mood entry, "good",
energy 5, dated Oct 29) — the "data-blocked at the platform level"
class the WH-26/27 rounds recorded for the mood surfaces is **OPEN for
the shared demo account's existing rows** (read-only probing of them;
no writes). With real data on both sides, four data-bearing faces
became decodable for the first time — and the reference's own compiled
bundle (`/assets/index-Bn9GF0-W.js`, greppable through the minifier)
proved an authoritative decode source for the formulas the DOM cannot
show (the stat-tile math).

> **Reference probe (14 passes; writes = ZERO on the reference — the
> demo account's existing mood row read at rest; every other surface
> read at rest or client-state-only; on OUR app one probe write was
> made (a mood entry mirroring the reference's row), live-verified,
> then re-seeded — census MATCH after):** the compiled-CSS watch
> **ROUND 16 REDEPLOYED** (`/assets/index-heGLHP2e.css` — the
> `/static/` prefix became `/assets/`); the login family re-verified
> byte-for-byte through the redeployment (the h1 30px/700/w368, the
> h2 24px/700/h32, the login inputs 48px, the Google button 54px, the
> signup 3×44×368 with byte-identical placeholders); the seed watch
> 11/11 templates + 12/12 tutorials (titles + durations byte-parity);
> the drawer battery (288px sheet, 11 links with byte-identical
> capitalized hrefs, `fixed inset-0 z-50 bg-black/80` overlay, body
> lock, escape-unlock — the reference's own hamburger still
> toast-viewport-blocked, opened via a JS click); the preset hygiene
> (the brand surfaces at the default 135deg indigo→purple); the
> typography (the system stack computes on both — the platform's
> Google-Fonts `@import` never applies to the body); the module H1s
> (Exercise: the same orange-600→red-600 to-r stops); the ⭐/☆
> codepoint parity on both apps (`2b50`/`2606` — the WH-27 cure
> holding); the mobile drawer battery byte-parity on BOTH apps (the
> instruction's emphasis — 288px, the same 11 hrefs, the same lock,
> escape and viewport-grow auto-close); the Tailwind v4 pins all live
> on our side (the `.dark` class activates zinc-950, the hover classes
> present, the full gate green).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `f5118e4` = WH-27 shipped at `278a12f` + the
operator's session-log push adding `docs/session_52.md`):** lint 0/0 ·
tsc 0 · unit **352/352 (24 suites)** · `bun run build` OK · smoke
**14/14** · e2e **65/65** · census MATCH — the exact documented WH-27
ship state.

**The audit method:** the standing watches + the newly-decodable
data-bearing surfaces probed live on the reference (14 passes), the
same surfaces read on our dev server (one mirroring write, re-seeded
after), the reference's compiled bundle decoded for the formulas, and
the WH-27 diff re-reviewed through `skills/web-application`,
`skills/tdd`, `skills/agent-browser` and the `code-review` dimensions.
Findings (by severity) — the WH-28 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH (the round's core)** | **The mood list "Your Journey" entry interior.** Blocked since WH-26 ("data-blocked at the platform level"); the demo account's existing row unblocked it. The reference's entry (live decode): the label row `flex items-center justify-between mb-2` carries `<h4 class="font-semibold text-lg text-gray-900">Good</h4>` LEFT + a **separate** `<span class="text-sm text-gray-500">Oct 29, 2026</span>` RIGHT (justify-between spreads them); ours renders `<p class="text-sm font-semibold text-foreground">Good<span class="ml-2 font-normal text-muted">Oct 29, 2026</span></p>` — one paragraph, the date INLINE after the label: **the label computes 18px/600 on the reference vs 14px/600 on ours, and the date sits far-right there vs inline-left here** (a real rendered-face drift, invisible to every zero-data walk). The list container: the reference `div.space-y-4` (16px gap) vs ours `ul.space-y-3` (12px) — tag AND gap drift. The entry tile: the reference `transition-all` vs ours `transition` (computed-equal for the hover shadow — fixed in the same stroke, class parity) | `mentalhealth-page.tsx` + the new `MOOD_ENTRY_LIST` record | the `MOOD_ENTRY_LIST` record (the reference's classes + our dark twins) + the page conversion: ul→div (`space-y-4`), li→div tile, the label p→h4, the date OUT of the label into the right-side group beside our delete superset (label left / date+delete right — the reference's spread preserved) |
| F-2 | **HIGH** | **The Recent Activity feed builder — fully decoded for the first time** (from the reference's own bundle; zero rows made it unobservable through WH-27). The reference's builder carries **THREE kinds only**: exercise `` `${a.type} workout` `` + `` `${a.duration} minutes` `` (🏃, date = the entity's `date` field), mood `"Mood check-in"` + the raw mood value (💚, date = the entity's `date` field), and **completed assignments only** `` `${a.title}` `` + `"Completed"` (✅, date = `updated_date`); merged, sorted by date DESC, capped at **8**; the row container `div.space-y-3`; the row date renders date-fns `"MMM d"` of the **entity date** — with identical data the reference renders "Oct 29" while ours renders "Oct 31" (**ours keys the row date off `createdAt`** — a real data-value drift). Ours: FIVE kinds (workout/mood/assignment/event/goal) with invented titles ("Logged a 30-minute workout"), glyphs 💪/📚 (the reference's are 🏃/✅), per-kind pre-caps of 5, a final cap of 5, `ul` container, createdAt dates | `api/dashboard/route.ts` (the builder) + `dashboard-page.tsx` (the render) + the new pure seam | the pure seam `src/lib/activity-feed.ts` (`recentActivityFeed({workouts, moods, assignments})` — the reference's exact shape in our wire names: kind/id/title/detail/at with `at` = the entity date; completed assignments only, keyed off `updatedAt`) + the route conversion (drop the 5-kind builder; the moods read take 5→50 — the reference's own mood-list bound) + the page conversion (the ACTIVITY_EMOJI map corrects to the reference's 🏃/💚/✅, the container ul→div, the `recentActivity` wire type's kind union narrows to the three live kinds) |
| F-3 | **MEDIUM** | **The mood page stat-tile VALUES with data** (the formulas decoded from the reference's own bundle — the DOM shows the results, the bundle shows the math): **Avg Energy** — the reference renders `(e.reduce((S,j)=>S+j.energy_level,0)/e.length).toFixed(1)` → **"5.0/10"**; ours renders `averageEnergy(...)` raw → **"5/10"** (the one-decimal format drift; our seam already rounds to one decimal — only the FORMAT at the call site is missing). **Current Streak** — the reference renders `e.length>0?Math.min(7,e.length):0` → **entry count capped at 7, NOT a consecutive-day streak** (an entry 2 days ago reads 1 there, 0 on ours — identical data, different numbers). The cure splits the seam by consumer (the WH-27 two-site doctrine): the TILE mirrors the reference's stub; the **badge engine keeps the real consecutive-day math** — the "7-Day Streak" badge's own description ("Journal your mood 7 days in a row") demands it. The empty-case deviation is documented: the reference renders "NaN/10" at zero entries (its own bug — `(0/0).toFixed(1)`); ours deliberately renders "0.0/10" | `mentalhealth-page.tsx` (both tiles) + the new `displayStreak` seam | `{avgEnergy.toFixed(1)}/10` at the call site + the pure seam `displayStreak(entryCount)` = `Math.min(7, entryCount)` in `src/lib/wellness.ts` (the bundle provenance in its comment; `currentStreak` unchanged for the badge engine) |
| F-4 | **MEDIUM** | **The shell family element-tag drift** (the WH-27 lesson-31 class, now on the shell — the tag vocabulary was never probed before the sr-chip round taught it): the reference's **sidebar wordmark is an `<h2>`** and its **mobile glass-header title is an `<h1>`** (hidden at desktop, shown at mobile — two visible h1s there, exactly the reference's own semantics); ours renders both as `<span>`s. The a11y net passes either way (no WCAG rule pins heading tags here) — but the reference's own element vocabulary is the parity target, and the tag layer is what the next DOM-level probe reads | `sidebar.tsx` (BrandMark) + `app-shell.tsx` (the mobile header) | the two tag conversions: `NAV_LAYOUT.brandWordmark` span→`<h2>`, `MOBILE_HEADER.title` span→`<h1>` (classes unchanged — the BRAND family stays exactly as pinned) |
| F-5 | **PROCESS (the watch event)** | **The reference REDEPLOYED** — the compiled-CSS watch round 16: `/static/index-s8d1FO8M.css` → `/assets/index-heGLHP2e.css` (the path SHAPE changed; the hash moved for the first time since WH-15). Every standing parity map re-verified live this round (the login family, the seed, the drawer, the preset hygiene, the module H1s, the typography): all HOLD through the redeployment — the standing pins did their job. The watch doctrine update: the compiled-CSS watch must match BOTH path shapes (`/static/` and `/assets/`) from now on | the docs ladder (WP-5) | no code change — the doctrine row (PAD §11 + AGENTS) |

**The positive findings (the round's clean classes — verified, not
assumed):** the mobile drawer battery byte-parity on BOTH apps (288px
panel, the same 11 capitalized hrefs, the same overlay/lock/escape/
auto-close — the instruction's "mobile menu working as expected"
verified from both sides); the Tailwind v4 pins all live (the `.dark`
class flips zinc-950, hover classes present, the pins' census tests
green); the ⭐/☆ codepoint parity (2b50/2606 both apps); the stat-card
constructions match (the emerald→teal gradient hero computes equal on
both — v4's oklab form, the documented computed-equal); the login
family geometry byte-parity THROUGH the redeployment; the empty-state
texts byte-parity ("No recent activity" / "No upcoming reminders" /
"No upcoming events"); the SEO surfaces serving (sitemap.xml in the
reference's exact format, robots.txt, manifest.json); the seed watch
23/23 byte-for-byte; the capture-state doctrine applied (the probe's
badge residue re-seeded — census MATCH).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 24 | **25** | +1 `tests/activity-feed.test.ts` (the new pure seam's spec) |
| Unit checks | 352 | **358** | +1 `displayStreak` (the min(7,count) pin, wellness-stats) · +3 the src-census blocks (the mood-entry-list census, the activity-feed census, the shell-tag census) · +2 the activity-feed spec (the 3-kind rows + the date-source/sort/cap) |
| E2E checks | 65 | **66** | +1 "dashboard: the Recent Activity feed — the reference's 3-kind builder with entity dates" (wellness-crud: a workout with a PAST-dated date field → the feed row asserts the 🏃 glyph, "cardio workout", "30 minutes" and the PAST short date — the createdAt-drift pin) |
| §8.1 infra row | 12 files / 153 | **13 / 159** | +1 file (activity-feed.test.ts), +6 checks |
| Captures | 33 | **34** | +34-mood-list-interior (the round's surface: the Your Journey list with the reference's demo row mirrored + the stat tiles at "5.0/10"/streak 1 + the dashboard feed row). Expected MOVERS: 05-mentalhealth only (the Avg Energy tile at zero entries flips "0/10"→"0.0/10" — a real pixel change); the shell tag conversions move no pixels; the 19 raster-noise class stays documented |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 352→358,
unitSuites 24→25, e2eChecks 65→66) land with every doc site in the
SAME commit. If the RED run lands a different exact count (a census
block splits, a spec gains a case), the measured value flips CANONICAL
in the same commit — the doctrine is lockstep, not prophecy.

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full (the mentalhealth page's list section,
the dashboard page's feed render + emoji map, the dashboard route's
builder + reads, sidebar.tsx BrandMark, app-shell.tsx's mobile
header, wellness.ts's currentStreak/averageEnergy, the
`src/types/index.ts` wire type, the WORKOUT_TYPES vocabulary, the
Assignment model's `updatedAt`); the e2e/spec structures mapped
(wellness-crud's exercise/mood blocks — the `#workout-date` input);
the census shapes mapped (src-census's block style,
wellness-stats's `currentStreak` describe).

### WP-1 — RED (the pins before the cures)
1. `tests/wellness-stats.test.ts` +1: `displayStreak` mirrors the
   reference's tile stat (`min(7, 0/1/7/20) → 0/1/7/7`) — expected
   RED: the export does not exist.
2. `tests/activity-feed.test.ts` (NEW, +1 suite, +2 checks): the
   three kinds' rows (exercise `${type} workout` + `${duration}
   minutes` 🏃 at the entity date; mood "Mood check-in" + the raw
   value 💚 at the entity date; completed assignments only
   `${title}` + "Completed" ✅ at `updatedAt`; pending assignments
   never appear) — expected RED: the module does not exist.
3. `tests/src-census.test.ts` +3 blocks:
   the mood-entry-list census (the `MOOD_ENTRY_LIST` record exists
   with the reference's classes; the page consumes it; the container
   is a DIV at `space-y-4`; the label is an H4 at `text-lg` + the
   separate date span; the tile `transition-all`; the old ul/p/
   inline-date forms retire),
   the activity-feed census (the seam's 3-kind shape; the route
   consumes `recentActivityFeed`; the page's ACTIVITY_EMOJI map is
   exactly {workout: 🏃, mood: 💚, assignment: ✅}; the feed container
   is a DIV; the five-kind builder + the 💪/📚 glyphs retire),
   the shell-tag census (sidebar.tsx renders the wordmark as `<h2>`;
   app-shell.tsx renders the mobile title as `<h1>`).
4. The e2e leg (wellness-crud +1): create a workout with a PAST date
   via `#workout-date`, then on /Dashboard assert the feed row (the
   🏃 glyph, "cardio workout", "30 minutes", the past "MMM d" date —
   NOT today's).
5. The CANONICAL flips (352→358, 24→25, 65→66) + the §8.1 rows. Full
   unit RED run at exactly the expected causes.

### WP-2 — GREEN (the cures)
1. `src/lib/page-layout.ts`: the `MOOD_ENTRY_LIST` record —
   container `space-y-4`, tile `p-6 rounded-2xl border border-gray-100
   hover:shadow-lg transition-all dark:border-neutral-800`, row
   `flex items-start gap-4`, chip `w-16 h-16 shrink-0 rounded-2xl
   bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center
   justify-center text-3xl shadow-lg`, labelRow `flex
   items-center justify-between mb-2`, label `font-semibold text-lg
   text-gray-900 dark:text-gray-100`, date `text-sm text-gray-500
   dark:text-gray-400`, energy `text-sm text-gray-600 mb-3
   dark:text-gray-400` — the probe provenance in the comment block.
2. `mentalhealth-page.tsx`: the list conversion (ul→div, li→div, the
   label p→h4, the date OUT of the label into the right-side group
   with the delete button; the energy/activities/gratitude/reflection
   lines unchanged — our superset).
3. `src/lib/wellness.ts`: the `displayStreak` seam
   (`Math.min(7, entryCount)`) with the bundle provenance +
   `currentStreak`'s comment gaining the split note (the tile vs the
   badge engine).
4. `mentalhealth-page.tsx` (tiles): `{avgEnergy.toFixed(1)}/10` +
   `displayStreak(moodEntries.length)`.
5. `src/lib/activity-feed.ts` (NEW): the pure seam — the reference's
   exact shape in our wire names; `src/types/index.ts`: the
   `recentActivity` kind union narrows to
   `"workout" | "mood" | "assignment"`.
6. `api/dashboard/route.ts`: the builder replaced by the seam call;
   the moods read take 5→50.
7. `dashboard-page.tsx`: ACTIVITY_EMOJI corrects to 🏃/💚/✅; the
   feed container ul→div (the row classes already match the
   reference's `flex items-start gap-3 p-3 rounded-lg
   hover:bg-gray-50 transition-colors` + our dark twins).
8. `sidebar.tsx` + `app-shell.tsx`: the two tag conversions
   (span→h2 wordmark; span→h1 mobile title) — the classes untouched.
9. Live verification on the dev server at the reference's computed
   values (the mirrored mood row: the label 18px/600/gray-900, the
   date far-right at 14px/gray-500, the 16px container gap, the tile
   transition-all; the tiles "5.0/10" + streak 1; the feed row
   "cardio workout"/"30 minutes"/🏃/the past date; the wordmark h2 +
   the mobile title h1) — then the write cleaned (re-seed, census
   MATCH).

### WP-3 — the e2e/audit verification
The new e2e leg + the standing battery re-run; the a11y net's
zero-violation walk (the h4/h2/h1 conversions must not trip axe).

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **358/358 (25 suites)** · build OK · smoke
14/14 · e2e **66/66** · db census MATCH.

### WP-5 — the docs ladder
PAD §11 (the F-1..F-5 rows + the NaN empty-case deviation + the
watch-shape doctrine), PAD §8.1 (13/159, the a11y row unchanged at
21), AGENTS (the card-family doctrine: the mood list interior + the
feed builder + the shell tags + the streak split + the counts),
SKILL v1.25.0 → **v1.26.0** (§8's WH-28 passage + **lesson 32**: "a
data-blocked surface is not a closed surface — the block can lift
without a redeployment (the demo account's OWN data changed); re-
check every standing block each round; and the reference's own
compiled bundle is an authoritative decode source — greppable
through the minifier — for every formula the DOM can only show the
results of"), README + CLAUDE (the counts), worklog WH-28 (top), the
plan's execution record, `docs/session_53.md`.

### WP-6 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set).
The 33-file set re-taken (expected movers: 05-mentalhealth — the
"0/10"→"0.0/10" tile; the 19 raster-noise class the documented
exception) + **1 NEW**: 34-mood-list-interior — the clean 33 taken
FIRST, then ONE mirroring write (the reference's demo row: good/5/
Oct-29-dated), the capture taken (the Your Journey list + the tiles
at "5.0/10"/streak 1 + the dashboard feed), then re-seed + census
MATCH (the write earns Self-Aware +10 — the post-round re-seed the
documented house step). The md5 ledger re-based at 34 files.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--key-file <key outside
repo>` + `--remote git@github.com:nordeim/wellness-hub.git`, main
only) → remote verification → key shred.

---

---

## 4. Execution record (filled at ship time)

- **WP-0** — the plan validated pre-write against every cure site (the
  mentalhealth list section, the dashboard page's feed render + emoji map,
  the dashboard route's builder + reads, sidebar.tsx BrandMark,
  app-shell.tsx's mobile header, wellness.ts's seams, the wire type, the
  WORKOUT_TYPES vocabulary, the Assignment.updatedAt column, the e2e form
  locators).
- **WP-1 RED** — the pins landed at exactly the expected causes: the
  displayStreak pin (the import miss), the activity-feed spec (the module
  miss), the three src-census blocks (the missing record/consumptions), the
  e2e feed leg, the CANONICAL flips — the full unit RED at the 3 census
  blocks + the 6 docs-counts sites + displayStreak + the module-miss.
- **WP-2 GREEN** — the MOOD_ENTRY_LIST record + the mentalhealth conversion
  (ul→div container, the h4 label, the date out into the right-side group
  beside the delete superset); the displayStreak seam (the TWO-CONSUMER
  SPLIT); the tiles at toFixed(1) + displayStreak; the activity-feed seam +
  the route conversion (the moods take 5→50) + the page's glyph map
  (🏃/💚/✅) + the div containers (the feed + the upcoming lists) + the wire
  kind-union narrowing; the two shell tag conversions. TWO mid-WP catches
  cured: the WH-11 exported-type census (the seam's interfaces un-exported —
  the spec restructured to plain literals) and the dashboard's sibling ul
  lists (the upcoming reminders/events lists converted with the feed).
  ONE e2e catch cured: the shell spec's build-era `level: 2 toBeHidden`
  assertion (vacuous through the span era) retargeted to the reference's
  semantics (the h2 wordmark VISIBLE at desktop + the h1 mobile title
  hidden — the tag census's e2e counterpart).
- **LIVE-VERIFIED** on the dev server at the reference's computed values
  (ONE mirroring write — the reference's demo row good/5/Oct-29 + a
  past-dated workout; then re-seeded, census MATCH): the tiles
  "1"/"5.0/10"/"1" byte-matching the reference; the h4 label 18px/600/
  rgb(17,24,39) + the date 14px/rgb(107,114,128) at identical left-edge
  positions (the justify-between spread, our delete accounting for the
  40px right-side difference); the feed rows 💚/"Mood check-in"/"good"/
  "Oct 29" + 🏃/"cardio workout"/"30 minutes"/"Oct 21" (the ENTITY dates —
  the createdAt drift cured); the wordmark h2 shown at desktop + the mobile
  title h1 shown at mobile (two visible h1s — the reference's own
  semantics).
- **WP-3/WP-4** — the docs ladder (the five docs' count sites in lockstep;
  PAD §11's WH-28 row + the partially-lifted block + the NaN deviation +
  the watch doctrine; §8.1 wellness 7/93 / infra 12/156 / CRUD 20; AGENTS's
  card-family + watch passages; SKILL v1.26.0 + §8's WH-28 passage +
  LESSON 32; README + CLAUDE). The full gate GREEN: lint 0/0 · tsc 0 ·
  unit **358/358 (25 suites)** · build OK · smoke **14/14** · e2e
  **66/66** · census MATCH.
- **WP-5 captures** — the doctrine LIVE (badgesEarned=0 asserted before the
  light set; the post-round re-seed + census MATCH). **28 byte-stable · 5
  movers (all root-caused) · 1 NEW**: 05-mentalhealth (the EXPECTED cure —
  the "0/10"→"0.0/10" tile); 19-dark-mobile-nav-open (the raster-noise
  class: 160px, maxDelta 1/255, 100% within ±2 RGB); 29-quick-actions-hover
  (the EXPECTED cure, the feed's face: the Recent Activity row renders the
  new 3-kind builder where the WH-27-era capture showed the retired
  five-kind row — visible because the prior procedure left the capture-24
  write in the account through 29, replicated this round); 32/33 (the
  procedure-state class: the prior script's undocumented form micro-state +
  scroll, the best-alignment decode ~136/128px with ~14% residual — not
  reconstructible without the original script; the form interiors
  live-verified this round). The NEW **34-mood-list-interior** — the
  round's surface (the Your Journey list with the reference's demo row
  mirrored + the tiles at "1"/"5.0/10"/"1" + the H4 label row), content
  verified (the emerald hero + the blue→cyan chip + the non-blank census).
  The md5 ledger re-based at 34 files. THREE capture-procedure lessons
  recorded: the single dark-seeded context leaked the dark mode into the
  light logged-out captures (01/13 — split by phase); the logout/login
  cycles tripped the login rate limiter mid-suite (the retake runs — the
  two-context design logs in ONCE); the prior procedure's write stayed in
  the account through 29 (the feed row's face).
- **WP-6/WP-7** — the worklog WH-28 entry, this record, docs/session_53.md,
  the commit, the SSH-wrapper push (main only), the key shredded after.

**Suggested next (for WH-29):** (a) the sr LIST-side chip format — the
remaining standing block (no study-resource rows on the demo account;
re-check each round — the block can lift the way the mood one did);
(b) the reference's next redeployment watch (the CSS hash round 17 —
`/assets/` shape); (c) the exercise/assignment/events/goals list
interiors with data (the same data-bearing class this round opened —
the demo account carries only the mood row today; each new row the
operator logs opens another); (d) the 32/33 form-interior captures'
micro-states (reconstructible only if a future round re-decides the
baseline — the ledger note carries the procedure).
