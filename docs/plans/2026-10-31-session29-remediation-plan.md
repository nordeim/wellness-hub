# Session-29 Remediation Plan — the seeded-card vocabulary + the achievements-entity decode round (WH-29)

**Task ID:** WH-29 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** the WH-28 plan's own suggested next, executed against a
reference that did NOT move: the compiled-CSS watch round 17 read
STABLE (`/assets/index-heGLHP2e.css` + the bundle `index-Bn9GF0-W.js`
unchanged — no redeployment since WH-28), the sr list-side chip stayed
BLOCKED (the demo account still carries zero study-resource rows), and
the exercise/assignment/events/goals list interiors stayed BLOCKED (the
demo account still carries only the one mood row). With every
suggested-next door closed, the round turned to the surfaces the
data-gated rounds never opened: the SEEDED data-bearing cards (the
Routines template card, the Learning tutorial card — 11 + 12 rows on
BOTH apps since the seed) and the Goals Achievements section — and the
reference's own compiled bundle (the lesson-32 decode source) opened the
one surface the DOM cannot: the Achievements section's data model.

> **Reference probe (14 passes; writes = ZERO on the reference — every
> surface read at rest; on OUR app one probe write was made (a dark-mode
> flip through the real Profile UI, reverted after) plus the
> localStorage/theme probes):** the watch round 17 STABLE; the drawer
> battery on BOTH apps (288px sheet, 11 byte-identical capitalized
> hrefs, overflow-hidden + pointer-events-none lock, escape-close,
> viewport-grow auto-close — the instruction's mobile-menu emphasis,
> verified from both sides); the dashboard tiles byte-parity (the four
> labels + subtitles + values, modulo the reference's own mood row);
> the five module pages' empty states + KPI rows byte-parity; the Goals
> H1 gradient (same stops; v4's oklab form the documented
> computed-equal); the seeded catalogs rendering 11/11 + 12/12 on both
> apps; the Tailwind v4 pins live on our side (the real-UI dark flip
> activates `.dark` → zinc-950 body); the SEO surfaces serving
> (sitemap/robots/manifest 200 through the smoke ladder); the
> pixel-level corner probe (the routine card's strip) on the reference.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `4da40cd` = WH-28 shipped at `0b5cbd5` + the operator's
session-log push):** lint 0/0 · tsc 0 · unit **358/358 (25 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **66/66** (after the
sandbox's Playwright chromium-1248 install) · census MATCH — the exact
documented WH-28 ship state. **Plus the periodic `bun audit` duty: 1
MODERATE found (the minimatch advisory — F-H below), the documented
"zero vulnerabilities" posture drifted.**

**The audit method:** the standing watches re-run live, the two seeded
data-bearing cards decoded DOM-side on both apps, the Achievements
section decoded from the reference's own compiled bundle
(`/assets/index-Bn9GF0-W.js` — the `GU()` goals-page component:
`Ue.Achievement.list("-earned_date")` fills the section; the row
template + the empty-state conditional read in full), the WH-28 diff
re-reviewed through `skills/web-application`, `skills/tdd`,
`skills/agent-browser` and the `code-review` dimensions, and the
security-ledger `bun audit` re-triage. Findings (by severity) — the
WH-29 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-A | **LOW** | **Dead unreachable returns ×2** — the WH-era `awardBadges` insertion landed its new return BEFORE the old `return ok(row);` in exactly two POST routes and the old line survived as unreachable code. The WH-6 census never caught it: its rule matches only EXACT duplicated adjacent lines (`prev === curr`); these two differ in content (`return ok({ ...row, newBadges: fresh });` → `return ok(row);`). The class generalization: a `return`-terminated statement followed by ANY `return`-starting statement is unreachable — the second can never execute | `src/app/api/workouts/route.ts:35` + `src/app/api/mood-entries/route.ts:35` | Delete both dead lines + widen the WH-6 census rule from exact-duplicate to any-return-followed-by-return |
| F-B | **MEDIUM** | **The Learning difficulty chips ride the wrong Badge variant** — the reference carries TWO Badge variants on the same card: the category chip the SECONDARY family (`border-transparent shadow hover:bg-primary/80` + the `-100/-700` tint) and the difficulty chip the OUTLINE family (`border` + `text-foreground`, NO border-transparent/shadow/hover-arm/bg — 12 instances live). Ours renders every chip through the SECONDARY base; the difficulty chip gets `border-transparent shadow hover:bg-primary/80 bg-transparent` — an INVISIBLE border + a shadow + a hover arm the reference does not carry (a real rendered-face drift: the reference's "beginner" chip shows a visible gray outline and no shadow) | `src/components/shared/page-parts.tsx` (OptionChip) + `src/lib/constants.ts` (TUTORIAL_DIFFICULTIES) | The two-variant OptionChip: a `variant` prop (`"solid"` default — today's base; `"outline"` — the plain-border base); the Learning difficulty chips pass `variant="outline"` |
| F-C | **LOW]** | **The chip element tag** — the reference's chips are `<div>`s (its Badge is the stock shadcn div form); ours are `<span>`s. The WH-27 sr-chip lesson verbatim: an element-tag vocabulary hides behind identical visual faces | `page-parts.tsx` OptionChip (12+ live instances across 8 pages) | span→div (all call sites sit in div/flex containers — no invalid nesting) |
| F-D | **LOW** | **The seeded-card titles** — the reference's tutorial + routines card titles are bare `<div>`s at `font-semibold tracking-tight text-lg [line-clamp-2]`; ours are `<h3>`s carrying an extra `text-foreground` (computed-equal — the inherited ink; the class is string-level drift) | `learning-page.tsx` + `routines-page.tsx` + the `TUTORIAL_CARD.title` record | h3→div both sites + drop `text-foreground` from the record (the reference's own string) |
| F-E | **MEDIUM** | **The routines card clips the strip's corners** — the reference's card is `rounded-xl border bg-card text-card-foreground border-none shadow-lg hover:shadow-xl transition-all h-full flex flex-col group` with `overflow: VISIBLE` (computed, probed): its `h-2` category strip paints SQUARE corners past the 12px radius — pixel-verified (the corner scan reads amber `f59e0b` at x=0..10, y=0..7 where a clipped card would read the page background). Ours carries `overflow-hidden` — the strip follows the card's rounded silhouette. A real rendered-face drift at both top corners, plus the tag (section vs div) | `routines-page.tsx` + the TEMPLATE_CARD-family record | Remove `overflow-hidden` from the routines card class + section→div (the strip corners bleed exactly as the reference's do — its own face, matched deliberately) |
| F-F | **MEDIUM** | **The routines benefits list element vocabulary** — the reference renders a `div.space-y-1` of `<p class="text-xs text-gray-600 flex items-start gap-1">` rows (the ✓ span `text-green-500` inside); ours a `ul.space-y-1` of `<li>`s. Same layout, different tags — the WH-28 mood-list class (ul→div) again, one round later and on a seeded surface | `routines-page.tsx` | ul→div, li→p (the classes unchanged) |
| F-G | **MEDIUM — the round's core** | **The Achievements section's data model decoded from the reference's own bundle** (the lesson-32 source; zero rows made it unobservable through every prior round): the reference's `GU()` goals component fills the section from `Ue.Achievement.list("-earned_date")` — a PER-USER entity list (the demo account carries ZERO rows) — and renders `n.length === 0 ?` the bare empty-state paragraph (`text-center text-gray-500 py-12 text-sm` "Achievements will appear here as you progress!") `:` a vertical `div.space-y-3` of `p-4 rounded-xl border transition-all` tiles — earned: `bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200`; the icon `text-3xl` (+ `grayscale` unearned); the name an H5 `font-semibold text-gray-900 mb-1`; the description `text-xs text-gray-600 mb-2`; the bottom row an outline category Badge + the earned-only `text-xs text-amber-600 font-semibold` "+N pts". OURS renders an always-on 2×4 CATALOG grid (8 mini-tiles, earned + unearned) — the empty state is UNREACHABLE dead face (the API returns the full catalog so `badges.length` is never 0), the section action carries a "0/8 earned" chip the reference's header never carries, and the tile geometry is entirely our own. The catalog grid was never documented as a deviation (the PAD §11 carries no row for it — the "deviation nobody wrote down" class); the WH-17 code comment acknowledged the reference's empty state and shipped the grid anyway | `goals-page.tsx` + a new `ACHIEVEMENT_TILE` record | The earned-only conversion: the section body renders the EARNED badges (earnedAt != null) in the decoded vertical-tile shape; zero earned → the (now reachable) empty state; the "0/8 earned" action chip retires (the reference's header is title-only); the "of 8 total" KPI subtitle STAYS (the documented deviation — our Badge catalog is a real 8-row table; the reference's `n.length`-scoped subtitle is vacuous on its own data, "0 of 0"); the category chip OMITS (the reference's platform rows carry a category whose values are unobservable at zero rows — our Badge model has no category column; inventing one is not decode, and the points span rides `justify-end` to keep the reference's right-side placement) |
| F-H | **MEDIUM — cured live this round** | **The security-ledger census drifted: `bun audit` → 1 moderate** — minimatch `GHSA-g3hv-75wg-m249` (ReDoS via globparts amplification, `< 11.0.1`), reached through the eslint chains: the root `minimatch@3.1.5` (eslint/@eslint/eslintrc/@eslint/config-array/eslint-plugin-import/jsx-a11y/react, all `^3.x` ranges) + a nested `@typescript-eslint/typescript-estree/minimatch@10.2.6`. The documented posture ("ZERO vulnerabilities", the four WH-8 overrides) aged out — a new advisory landed under the locked versions | `package.json` overrides + `tests/dead-deps.test.ts` | **DONE (verified live):** the `minimatch: "11.0.3"` override (registry-latest) — `bun audit` → "No vulnerabilities found"; `bun run lint` clean (the eslint chains WORK on minimatch 11 — the override is range-breaking but API-compatible at every call site the lint gate exercises); the lockfile resolves minimatch at exactly ONE 11.0.3 (the nested 10.2.6 gone). This round's commit lands the PIN (the `PINNED_RESOLUTIONS` extension + the every-resolution scan, the s198 nested-copy doctrine) + the docs lockstep (AGENTS posture note → five overrides; PAD §10 ledger row) |

**The positive findings (the round's clean classes — verified, not
assumed):** the drawer battery byte-parity on BOTH apps (the
instruction's mobile-menu emphasis); the watch round 17 stable (no
redeployment — the standing maps hold un-re-probed per the doctrine);
the dashboard tile labels/subtitles/values byte-parity; the five module
pages' empty states + KPI rows byte-parity (Reminders/Exercise/
Assignments/Events/Goals — labels, values, subtitles, the amber-500
Target + purple-500 Award icon tints all matching); the Goals H1
gradient stops identical; the Use This Template button
computed-equal INCLUDING hover (the reference's `hover:bg-primary/90`
paints its background-color UNDER its opaque gradient — unobservable;
ours omits the invisible arm); the `Badges Earned` icon + the Goals
Completed subtitle semantics matching; the seeded catalogs 11/11 +
12/12 rendering on both apps; the Tailwind v4 pins live (the real-UI
dark flip verified); the SEO surfaces serving; the sr list-side chip +
the four list interiors standing blocks re-checked (still zero demo
rows — the lesson-32 re-check doctrine held).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 25 | **25** | none — the pins ride existing suites |
| Unit checks | 358 | **362** | +1 the dead-return census widening (the WH-6 rule's assertion EXTENDED in place — the same `it`, the rule's message updated) · wait — the widening edits the existing test; the +4 = +3 src-census blocks (the chip-family two-variant census, the achievements-section census, the routines-card census) + 1 dead-deps block (the minimatch resolution pin, the every-copy scan) |
| E2E checks | 66 | **67** | +1 "goals: the achievements section — the reference's earned-only vertical tiles (the catalog grid retired)" (wellness-crud: by this leg first_workout + mood_first are earned → the section renders ≥2 tiles in the decoded shape; assert the vertical tile class family + the count < 8 (the catalog never renders wholesale) + the decoded tile members) |
| §8.1 rows | wellness 7/93 · infra 12/156 · CRUD 20 | **wellness 7/93 · infra 13/160 · CRUD 21** | +1 infra file row (dead-deps +1 check) · CRUD +1 check (same file) — recompute at RED time; the measured value flips CANONICAL in the same commit |
| Captures | 34 | **34** | re-based; expected MOVERS: 03-routines (the strip's square corners + the div/p benefits — pixel-visible at both top corners), 10-learning (the difficulty chips' shadow → visible outline), 11-goals (the catalog grid → the empty state at the seeded zero — the round's largest face change), 18-dark-routines (the same corner class in dark), plus any WH-28-era documented movers that re-move. No NEW file — the round's surfaces all live inside existing captures |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 358→362,
e2eChecks 66→67) land with every doc site in the SAME commit. If the
RED run lands a different exact count, the measured value flips
CANONICAL in the same commit — the doctrine is lockstep, not prophecy.

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full (the OptionChip component + its 9 call
sites, the TUTORIAL_DIFFICULTIES/difficultyMeta vocabularies, the
TUTORIAL_CARD record, the routines page's card + benefits + button
blocks, the goals page's KPI row + Achievements section, the
achievements API's badges shape, the Badge model + seed, the WH-6
census rule, the dead-deps PINNED_RESOLUTIONS block, the docs-counts
CANONICAL, the wellness-crud goals leg, the e2e's badge-earning order
(first_workout + mood_first earned before the goals leg)).

### WP-1 — RED (the pins before the cures)
1. `tests/src-census.test.ts` — the WH-6 dead-return rule WIDENED in
   place (any `return…;` line followed by a `return`-starting line is
   unreachable — the exact-duplicate constraint dropped; the message
   updated to name the awardBadges-insertion class). Expected RED at
   the two live sites.
2. `tests/src-census.test.ts` +3 blocks:
   - the chip-family census (WH-29): OptionChip renders a DIV; the
     solid base is today's string; the outline base is the
     plain-border form (NO border-transparent/shadow/hover arm); the
     Learning page's difficulty chips pass the outline variant while
     its category chip + the routines/events/goals/reminders/
     assignments/exercise chips ride the solid base;
   - the achievements-section census (WH-29): the goals page renders
     earned-only rows through the `ACHIEVEMENT_TILE` record (the
     space-y-3 container, the p-4/rounded-xl/border/transition-all +
     the yellow-50→amber-50 earned gradient tile, the text-3xl icon,
     the H5 name, the xs description, the amber-600 "+N pts"); the
     empty state's paragraph is REACHABLE (the render condition is
     the EARNED count, never the catalog length); the "0/8 earned"
     action chip retired; the 2×4 catalog grid retired;
   - the routines-card census (WH-29): the card is a DIV with NO
     overflow-hidden (the strip's square corners are the reference's
     own face); the benefits list is a div/p family; both seeded-card
     titles are DIVs.
3. `tests/dead-deps.test.ts` +1 block: the minimatch pin —
   `PINNED_RESOLUTIONS` gains `minimatch: "11.0.3"`; the every-copy
   scan (every `minimatch@X.Y.Z` resolution in the lockfile is
   11.0.3 — the s198 nested-copy doctrine).
4. `tests/e2e/wellness-crud.spec.ts` +1 test: the achievements leg.
5. The CANONICAL flips (358→362, 66→67) + the §8.1 rows. Full unit
   RED run at exactly the expected causes.

### WP-2 — GREEN (the cures)
1. F-A: delete the two dead `return ok(row);` lines.
2. F-B/F-C: the OptionChip conversion — `variant?: "solid" | "outline"`
   (default solid); the outline base
   `inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs
   font-semibold transition-colors focus:outline-none focus:ring-2
   focus:ring-ring focus:ring-offset-2 text-foreground`; the element
   span→div; the Learning difficulty chips pass `variant="outline"`.
3. F-D: the two title conversions (h3→div, the `text-foreground` drop
   from TUTORIAL_CARD.title).
4. F-E: the routines card — `overflow-hidden` dropped, section→div
   (the reference's own face: the strip corners bleed past the radius).
5. F-F: the benefits ul→div, li→p.
6. F-G: the `ACHIEVEMENT_TILE` record (the decoded classes + our dark
   twins) + the goals-page conversion: the section body filters
   `earnedAt != null`, renders the vertical tiles, the empty state on
   the earned count, the action chip retired.
7. Live verification on the dev server: the Learning difficulty chips'
   computed border-color visible + shadow none (vs the category chip's
   shadow); the chips + titles + card tags as DIVs; the routines card
   corner pixel probe (amber at the corner where the clip was); the
   goals page's empty state at the seeded zero; then ONE badge-earning
   write (a workout through the API → First Step) to verify the earned
   tile's rendered face at the decoded geometry — then re-seed, census
   MATCH.

### WP-3 — the e2e/audit verification
The new achievements leg + the standing battery re-run; the a11y net's
zero-violation walk (the div/p conversions + the outline chips + the
H5 names must not trip axe; the H3→div title conversions REDUCE
heading semantics — the a11y walk owns the verdict).

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **362/362 (25 suites)** · build OK · smoke
14/14 · e2e **67/67** · db census MATCH · `bun audit` zero (the
networked posture check, outside the gate per the doctrine).

### WP-5 — the docs ladder
PAD §11 (the F-A..F-H rows + the achievements data-model deviation
rows: the category-chip omission + the "of 8 total" subtitle scope),
PAD §8.1 (the recomputed rows), PAD §10 (the security-ledger row: the
minimatch re-triage, five overrides), AGENTS (the chip two-variant
doctrine + the achievements earned-only doctrine + the routines-card
overflow note + the five-override posture note + the counts), SKILL
v1.26.0 → **v1.27.0** (§8's WH-29 passage + **lesson 33**: "the
reference's ENTITY MODEL is decodable from its bundle —
`Achievement.list()` is a PER-USER row table, not a catalog; the
section's empty state at zero rows is the FACE, not a data gap; and a
superset face shipped without a PAD deviation row is a bug nobody can
defend — the catalog grid was known-different since WH-17 and survived
twelve green rounds because the deviation lived in a code comment, not
the ledger"), README + CLAUDE (the counts + the feature-table row
reworded: the 8-badge auto-award ENGINE, the display now earned-only),
worklog WH-29 (top), the plan's execution record, `docs/session_55.md`.

### WP-6 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set). The
34-file set re-taken; the movers root-caused (expected: 03/18 the
strip corners, 10 the chip outline, 11 the achievements face); the md5
ledger re-based at 34 files.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--key-file <key outside
repo>` + `--remote git@github.com:nordeim/wellness-hub.git`, main
only) → remote verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-0** — validated: every cure site read; the e2e badge-order
  dependency confirmed (first_workout + mood_first + goal_first precede
  the goals leg in the spec's execution order).
- **WP-1 RED** — the pins landed at exactly the expected causes: the
  widened WH-6 rule (the two dead returns), the three src-census blocks
  (the chip-family / achievements-section / routines-card cures all
  missing), the dead-deps minimatch pin (GREEN at birth — the F-H cure
  had landed live during the audit, before the plan was written), the
  e2e achievements leg, the CANONICAL flips — the full unit RED at the
  4 src-census + 6 docs-counts sites.
- **WP-2 GREEN** — the two dead returns deleted; the OptionChip
  conversion (span→div + the variant prop's solid/outline split); the
  Learning difficulty chips pass variant="outline"; both seeded-card
  titles → DIV (the text-foreground drop); the routines card's
  overflow-hidden dropped + section→div; the benefits ul/li → div/p;
  the ACHIEVEMENT_TILE record + the goals-page conversion (earned-only,
  the reachable empty state, the action chip retired). THREE mid-WP
  census catches cured: the WH-17 chip-anatomy + WH-24 chip-arms
  regexes (updated to read the SOLID_BASE/OUTLINE_BASE constants), the
  WH-9 props pin (the variant prop added consciously), the WH-14
  palette pins (yellow-200/900/950). ONE e2e catch: the achievements
  leg's settle-wait (the .or() matched the PRE-HYDRATION empty branch —
  the leg now waits for a TILE, the only legal settled state; the empty
  state is owned by the capture round + the census's reachability
  condition).
- **LIVE-VERIFIED** on the dev server: the difficulty chips byte-parity
  (DIV · shadow none · border rgb(229,229,229) · bg transparent);
  the chips/titles/cards as DIVs; the routines card corner pixel scan
  (f59e0b at x=0..10/y=0..7 — byte-identical to the reference's); the
  Goals empty state REACHABLE at the seeded zero; ONE badge-earning
  write → the earned tile at the decoded geometry (the yellow→amber
  gradient, the H5 name, "+10 pts", the 🏃 text-3xl icon, the
  space-y-3 container) — then re-seeded, census MATCH.
- **WP-3/WP-4** — the full gate GREEN: lint 0/0 · tsc 0 · unit
  **362/362 (25 suites)** · build OK · smoke **14/14** · e2e **67/67**
  · census MATCH · `bun audit` ZERO.
- **WP-5 docs** — PAD §11's four WH-29 rows + §10's security row
  re-anchored at FIVE overrides + §8.1 recomputed (infra 12/160, CRUD
  21); AGENTS (the chip/achievements/routines-card doctrines + the
  five-override posture + counts); CLAUDE (the badges passage + the
  counts); README (the feature row + counts); SKILL v1.27.0 (§8's
  WH-29 passage + LESSON 33 + the provenance re-validation); the
  worklog WH-29 entry; this record; docs/session_55.md.
- **WP-6 captures** — the 34-file set re-taken under the doctrine
  (badgesEarned=0 asserted before the light set); **21 byte-stable +
  13 movers (all root-caused)**; the md5 ledger re-based at 34 files.
  The movers: 6 EXPECTED CURES (03-routines + 18-dark-routines the
  strip's square corners; 10-learning + 30-tutorial-card-hover the
  outline chips + the DIV titles; 11-goals the achievements face — the
  round's largest pixel change; 28-routines-schedule-modal the changed
  card rows behind the overlay) + 7 PROCEDURE-STATE (16 the drawer's
  focus-return timing; 23 the dark context's seed state; 24 the write's
  non-feed fields — the exercise-list row's intensity/calories text;
  25 the Tab focus target; 29 the hover transition's sampling instant;
  32/33 the standing form-interior class, re-based at this round's
  COMMITTED procedure). TWO capture-procedure cures shipped with the
  round: scripts/capture-round.mjs is now committed (the 32/33
  "not reconstructible" class ends here) and the 34 write's zod-400
  (a wrong field name — energyLevel vs the schema's energy, the first
  run silently captured the EMPTY STATE) taught the assert-the-write's-
  status doctrine; the corrected 34 is BYTE-STABLE against the WH-28
  base (md5-identical).
- **WP-7** — the commit + the SSH-wrapper push (main only), the key
  shredded after.

**Suggested next (for WH-30):** (a) the sr list-side chip + the four
list interiors — the standing blocks, re-checked each round (the
lesson-32 doctrine; each new demo row opens one); (b) the watch round
18; (c) the earned-achievement tile's DATA-BEARING face — the decoded
template renders on our side at WH-29's verification write; the
reference's own rows (if the operator ever earns one there) would
confirm the category-chip values + the unearned arm's live use; (d) the
32/33 form-interior captures' micro-states (unchanged posture).
