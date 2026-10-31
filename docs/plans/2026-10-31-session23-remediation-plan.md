# Session-23 Remediation Plan — the dashboard + card-family geometry round (WH-23)

**Task ID:** WH-23 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** re-probe the live reference (the standing watches), then close
the surface family WH-22's own ledger pointed at — **the dashboard
quick-action hover family** (one surface read resting only) **+ the
scroll-capped modal's keyboard walk** — which opened onto the wider class:
**the surfaces WH-15's identity probe mapped by COLOR were never walked
field-by-field for GEOMETRY**. Every list card, stat tile and empty state
on the reference was re-read live this round (computed styles + DOM, real
pointer for the hover families). Plus the standing environmental/SEO/menu
verifications.

> **Reference probe (11 passes, zero writes, zero probe-hygiene events):**
> the compiled-CSS watch **round 11** — the asset hash UNCHANGED
> (`assets/index-heGLHP2e.css`): no redeployment, so every WH-15..WH-22
> parity map still governs. The seed watch **round 12: 23/23
> byte-for-byte** (11 template names + 12 tutorial titles, text-searched
> against the seed's actual names). The preset hygiene clean (no `style`
> residue on `<html>`). The drawer battery at 390×844: opens with 11
> links + Close on the 288px w-72 sheet, body locked; the
> **stays-open-after-nav quirk HOLDS** (re-verified with a REAL link click
> — both panels open + body still locked on /Exercise; the earlier
> synthetic-dispatch close was the probe artifact, not the behavior);
> escape-closes, body unlocked. The z-100 toast viewport intercepted one
> trigger click (its documented defect — the synthetic-click convention).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `8d4b0d7` = WH-22 shipped at `db79bf4` + the session-log
push; environment rebuilt: `db:push` + `db:seed` + census MATCH):** lint
0/0 · tsc 0 · unit **342/342 (24 suites)** · `bun run build` OK · smoke
**14/14** · e2e **60/60** (incl. the 6-check mobile drawer battery) — the
exact documented WH-22 ship state, no flake.

**The round's audit class — the card-family GEOMETRY (the surfaces the
WH-15 identity probe mapped by color and every later round trusted).** The
method: walk every card on the reference's dashboard + all nine module
pages (the CardHeader/CardContent fingerprint, computed styles, the full
HTML of each anatomy), read the hover families with a REAL pointer
(settled ≥400 ms — the WH-20 doctrine), and walk the Schedule modal's
keyboard path (Tab order, initial focus, the below-the-fold scroll
behavior).

Findings (by severity) — the WH-23 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH (the declared target)** | The Quick Actions family. Ours: the deviating SECTION_CARD header + `grid grid-cols-2` with `border-r/border-t border-line` DIVIDERS + `<Link>` cells `px-4 py-6 … hover:bg-line-soft` (a background wash on hover) + icons `h-6 w-6 text-muted group-hover:text-primary` (the icon turns indigo) at strokeWidth 1.75. The reference (probed live, real pointer, settled): the shadcn Card + CardHeader `flex flex-col space-y-1.5 p-6` + title `font-semibold leading-none tracking-tight flex items-center gap-2` (the plus icon INSIDE, `w-5 h-5`, inherited foreground) + body `p-6 pt-0` + grid **`grid grid-cols-2 gap-3`** (a 12px gap, **NO dividers**) + cells = unclassed `<a href>` wrapping a `<button>` carrying the stock shadcn base + **`px-4 py-2 w-full h-24`** (fixed 96px) + `flex flex-col items-center justify-center gap-2 border-none` + per-module DEAD gradient arms (`from-orange-500 to-red-500 bg-opacity-5 hover:bg-opacity-10` — computed TRANSPARENT at rest and hover, verified: the v3-era forms compose with nothing) + `transition-all group`; **the hover family: the icon SCALES to matrix(1.1)** (`group-hover:scale-110 transition-transform`) **+ the label lightens** rgb(10,10,10)→rgb(23,23,23) (`hover:text-accent-foreground` ≈ neutral-900) — **NO background wash, NO icon color change** (the icon stays `text-gray-700` rgb(55,65,81), stroke 2); labels `text-sm font-medium` inheriting the cell ink. Verified on two cells (Log Exercise + Mood Check) with revert reads. Per-module pairs: Log Exercise orange→red / Mood Check emerald→teal / Add Assignment blue→cyan / New Event violet→purple | `dashboard-page.tsx` (the Quick Actions section) | the QUICK_ACTIONS record (page-layout) + the conversion; our `<Link>` stays (the reference's `<a><button>` nesting is invalid HTML — the documented superset class, like the tab-strip precedent); dark twins on the icon + hover arm (the interaction-arm census); the QA keyboard focus = the reference's UA default outline on the anchor — our `focus-visible:ring-1` mirror keeps the stock base (the PAD §11 focus-superset row governs the width question) |
| F-2 | **HIGH (the blast radius)** | The SECTION_CARD anatomy deviates on EVERY list card. Ours: header `flex items-center gap-2 px-5 py-4 border-b border-line` + the icon a `text-muted shrink-0` sibling + title `font-semibold text-foreground` + body `p-5`. The reference (probed on every list card across the dashboard + 9 module pages): header **`flex flex-col space-y-1.5 p-6`** (NO bottom border), the title **`font-semibold leading-none tracking-tight`** with the icon INSIDE the title row (`w-5 h-5`, **inherited foreground rgb(10,10,10) — NOT muted**), body **`p-6 pt-0`**. Per-card icon presence: WITH icons — Dashboard ×4 (plus/activity/bell/calendar), Reminders "Upcoming Reminders" (clock), Goals "Active Goals" (target) + "Achievements" (trophy); WITHOUT — Exercise "Recent Workouts", MentalHealth "Your Journey", Events "Upcoming Events" + the calendar card. Two of our dashboard icons are also WRONG (Upcoming Reminders: ours BarChart3 vs bell; Upcoming Events: ours CalendarPlus vs calendar) | `page-layout.ts` (SECTION_CARD) + `page-parts.tsx` (SectionCard) + 8 consumer pages | SECTION_CARD's new members + the SectionCard component (the icon becomes OPTIONAL for the per-card parity) + the per-page icon set; our `<h2>` title stays (the reference's are bare divs — our heading semantics is the documented a11y superset; the e2e `getByRole("heading")` legs depend on it) |
| F-3 | **MEDIUM** | The Recent Activity items. Ours: an Activity lucide icon in a `bg-primary/10` tinted square + title `Mood check-in: good` + the full `formatMonthDayYearTime` datetime + gratitude detail. The reference (probed live on its one mood entry): the item row **`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors`** + the icon a **2xl EMOJI** (`<span class="text-2xl">💚</span>`) + title **`font-medium text-gray-900 truncate`** "Mood check-in" (the mood value NOT in the title) + detail **`text-sm text-gray-500`** "good" (the value as its own line) + the right-edge date **`text-xs text-gray-400`** "Oct 29" (`formatDateShort` exists and produces exactly this) | `dashboard-page.tsx` + `api/dashboard/route.ts` | the item anatomy + the API's title/detail split (mood: "Mood check-in" + the mood label as detail) + the emoji per kind; the unobservable kinds (workout/assignment/event/goal — no data on the reference account) keep our titles in the reference's FORM (documented superset). **The emoji source question** (the reference's 💚 for "good" vs our MOODS' 😊): settled at GREEN verification with one batched login — either the activity feed uses fixed per-kind glyphs (mood=💚) or the reference's mood vocabulary itself differs (which would fire a second finding on the MentalHealth tiles) | 
| F-4 | **MEDIUM** | The dashboard stat tiles' geometry. Ours: `cn(STAT_CARD.card, "p-5")` (20px, children directly on the card) + iconTile `p-3 rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center text-white mb-4` + icons `h-5 w-5` strokeWidth 1 fill="currentColor" + no mb-1 rhythm. The reference: card + wash + a **`relative p-6` content wrapper** + an **`flex items-start justify-between mb-4` icon row** + iconTile **`p-3 rounded-2xl bg-gradient-to-br <pair> shadow-lg`** (no flex/center arms) + the icon **`w-6 h-6 text-white` stroke 2, NO fill** + label `text-sm font-medium text-gray-600 mb-1` + value `text-3xl font-bold text-gray-900 mb-1` + sub `text-sm text-gray-500` | `page-layout.ts` (STAT_CARD) + `dashboard-page.tsx` | STAT_CARD gains `content`/`iconRow` members, the iconTile simplifies, the mb-1 arms land, the icon loses the fill/stroke overrides (the lucide defaults); the wash + `hover:shadow-xl` + `group-hover:opacity-10` arms are ALREADY parity (verified live — the only stat-tile members that were) |
| F-5 | **MEDIUM** | The module KPI tiles (5 pages × 3 tiles) — ours carry NO icons and the wrong padding/rhythm. Ours: `cn(STAT_CARD.hero/card, "p-5")` + label `text-sm font-medium text-gray-600` + value stacked, nothing else. The reference: a **`p-6 pt-6` wrapper** + a **`flex items-center justify-between` row** (the label+value left, a **BIG `w-12 h-12` module-tinted icon right**) + hero labels **`text-<module>-100 text-sm mb-1`** + plain labels **`text-gray-600 text-sm mb-1`** (NO font-medium) + values `text-4xl font-bold` (+`text-gray-900` on plain). The probed per-page icon sets: Exercise dumbbell `text-orange-100` / clock `text-orange-500` / flame `text-red-500`; MentalHealth heart `text-emerald-100` / trending-up `text-emerald-500` / smile `text-yellow-500`; Assignments clock `text-blue-500` / circle-check `text-green-100` / circle-alert `text-red-500` (the green→emerald hero is the SECOND tile); Reminders clock `text-purple-500` / circle-alert `text-red-500` / check `text-green-500` (NO hero tile); Goals sparkles `text-yellow-100` / target `text-amber-500` / award `text-purple-500`. Events + StudyResources carry NO KPI row on the reference (ours already match) | `page-layout.ts` (a MODULE_KPI record) + the 5 pages | the record + the 5 conversions; the 15 label texts verified byte-identical (positive finding) so only the anatomy moves |
| F-6 | **LOW** | The empty states. Ours: the icon-chip EmptyState (`flex flex-col items-center justify-center py-12 text-center` + a 48px `bg-line-soft` round chip + hint `mt-1 text-sm text-muted`). The reference: module lists ship a **bare `<p class="text-center text-gray-500 py-12">`** (the full body innerHTML verified — NO icon chip); the dashboard's upcoming empties are **`text-gray-500 text-center py-8`** (no text-sm); Achievements adds `text-sm`; StudyResources ships its own special card (**`p-6 py-20 text-center` + a `w-16 h-16 text-gray-300 mx-auto mb-4` book-open + `text-gray-500 text-lg`**) | `page-layout.ts` (EMPTY_STATE) + `page-parts.tsx` (EmptyState) + ~10 call sites | EMPTY_STATE simplifies to the p forms (+ dark twins); the EmptyState `icon` prop + the `icon`/`iconGlyph` members RETIRE with their last consumer (the value census owns it); the hint TEXTS are byte-identical everywhere observable (positive finding — only the form moves) |
| F-7 | **MEDIUM (behavioral)** | The empty-data OMISSION. Our Assignments page renders the "Your Assignments" card + empty state at 0 rows; our Routines page renders "My Routines" + empty state. The reference (full innerText verified): **/Assignments ends after the KPI row** (the list section is OMITTED at 0 rows) and **/Routines shows only the templates** (the scheduled section omitted) — while Exercise/Goals/Reminders/StudyResources DO ship their empty-state cards. The reference's conditional rendering is the parity form | `assignments-page.tsx` + `routines-page.tsx` | the sections render only when rows exist (`{rows.length > 0 && …}`); the populated forms are unobservable on the reference (zero-write doctrine — we never create data there) so our card titles/structures stay for the populated state (documented); ONE e2e leg retargets (the assignments empty-state assertion at wellness-crud:71 asserts the section's ABSENCE instead) |
| F-8 | **MEDIUM (the second declared target — OUR pin)** | The scroll-capped modal's keyboard walk — the net never walked a scrolled dialog. The reference decoded live this round: initial focus = **the first field (the date input)**, Tab order **fields → primary → the corner X** (the trap holds), **the below-the-fold primary SCROLLS INTO VIEW** when focused (the dialog's scrollTop 0→82 — the native focus scroll inside the `max-h-[90vh] overflow-y-auto` container), Escape closes + body unlocks (focus restores to the body on the reference — our Radix trigger-restore is the documented superset). Our dialog should match (Radix + the WH-22 scroll cap) but no leg ever pinned it | `tests/e2e/a11y.spec.ts` (the new leg) | the keyboard-walk leg: open the Schedule modal, assert the initial focus, Tab to the primary, assert the scroll + the visibility, Escape + unlock — the scrolled-dialog class joins the interaction-states net |

**The positive findings (the round's clean classes — verified, not
assumed):** the stat-tile labels + subs byte-identical (4 tiles); the
module KPI labels byte-identical (15 tiles across 5 pages); the quick
action labels + hrefs byte-identical; the empty-state hint texts
byte-identical (exercise/reminders/goals ×2/studyresources); the welcome
header + subtitle byte-identical; the dashboard upcoming empty texts
byte-identical; the stat-tile wash + `hover:shadow-xl` +
`group-hover:opacity-10` arms already parity (verified live with a real
pointer — the only stat-tile members that were); the events +
studyresources pages carry no KPI row on either app; the drawer battery
green (incl. the stays-open quirk on a REAL click); the SEO surface green
(sitemap.xml + robots.txt + manifest.json as byte-verified route handlers,
re-read this round); the Tailwind v4 pin set intact (the round's only
v4-adjacent facts: the dead `bg-opacity-*` arms are v3-era strays that
generate nothing in v4 — exactly like the reference's own computed
transparent; and the QA hover family's `group-hover:scale-110` rides the
`scale` PROPERTY per the WH-21 lesson — the e2e hover leg reads the
property, not the transform pipeline).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 24 | **24** | — (the checks land in existing suites) |
| Unit checks | 342 | **344** | +1 card-geometry census (src-census: the QUICK_ACTIONS/MODULE_KPI/SECTION_CARD/STAT_CARD members + consumption + the per-page icon parity) · +1 empty-form + omission census (the EMPTY_STATE forms, the retirement, the two omission conditionals) |
| E2E checks | 60 | **61** | +1 the scroll-capped keyboard walk (a11y.spec) · the assignments empty-state leg retargets IN PLACE (no count change) |
| §8.1 infra row | 12 files / 143 | **12 / 145** | the two censuses land in src-census |
| §8.1 a11y row | 16 | **17** | the keyboard-walk leg |
| Captures | 28 | **29** | +29-quick-actions-hover (the round's surface: the first cell hovered, the icon scaled). Expected MOVERS: 02/04/05/06/07/08/09/10/11 + 14 + 17/18 (every page whose cards changed — root-caused as this round's own cures; the ledger re-based with the cause noted) |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 342→344,
e2eChecks 60→61) land with every doc site in the SAME commit.

---

## 3. Work packages

### WP-1 — RED (the pins before the cures)
1. **The card-geometry census** (`tests/src-census.test.ts`, appended):
   the QUICK_ACTIONS record's members (the gap-3 grid, the h-24 w-full
   cell base, the dead gradient arms, the scale-110 icon, the
   no-font-medium label) + its consumption on the dashboard; the
   MODULE_KPI record (the p-6 pt-6 wrapper, the justify-between row, the
   w-12 h-12 big icons, the label forms) + the five pages' tiles; the
   SECTION_CARD new members (the p-6 header, NO border-b, the
   leading-none tracking-tight title, the p-6 pt-0 body, the icon INSIDE
   the title row at inherited ink); the STAT_CARD content/iconRow members
   + the iconTile simplification + the mb-1 arms. Expected RED: all the
   missing members + the deviating current strings.
2. **The empty-form + omission census** (`tests/src-census.test.ts`,
   appended): EMPTY_STATE's p forms (the py-12 module form, the py-8
   dashboard form, the StudyResources special card), the `icon` prop's
   retirement from EmptyState (no destructured icon), the icon/iconGlyph
   members' retirement, the per-page icon parity (Exercise/MentalHealth/
   Events SectionCards carry NO icon; Reminders/Goals/dashboard carry
   theirs), the omission conditionals on Assignments + Routines.
   Expected RED: the current forms + the missing conditionals.
3. **The e2e keyboard-walk leg** (`tests/e2e/a11y.spec.ts`): open the
   Schedule modal → the initial focus is the date input → Tab through →
   the primary receives focus AND is visible (the in-dialog scroll
   followed) → Escape closes + the body unlocks. Expected RED: none of
   the assertions exist (new leg) — the leg must be verified RED by
   running it against the pre-cure build WITHOUT the assertions' helper
   (i.e. the leg itself is new; the RED check is that it PASSES on the
   current dialog — it pins existing behavior, the F-8 class — so the
   RED step is the census pair: if the dialog already conforms, the leg
   documents it; the RED discipline applies to F-1..F-7's cures).
4. **The e2e retarget** (`tests/e2e/wellness-crud.spec.ts:71`): the
   assignments empty-state assertion flips to the section's ABSENCE.
   Expected RED before the omission cure: the section still renders.
5. **The CANONICAL flips** (unitChecks 342→344, e2eChecks 60→61).
   Full-suite RED run.

### WP-2 — GREEN (the cures)
1. `src/lib/page-layout.ts`: the **QUICK_ACTIONS** record (the CardHeader/
   CardContent forms, the gap-3 grid, the cell base string —
   self-contained per the lesson-25 form, NEVER composing BUTTON_CLASSES —
   + the per-module dead-pair map, the scale-110 icon with its dark twin,
   the inheriting label), the **MODULE_KPI** record (wrap/row/labels/
   values/bigIcon), the **SECTION_CARD** re-membering, the **STAT_CARD**
   extension (content/iconRow + the iconTile simplification + the mb-1
   arms), the **EMPTY_STATE** simplification (+ the StudyResources
   special).
2. `src/components/shared/page-parts.tsx`: the SectionCard (the icon
   optional, inside the title row, inherited ink) + the EmptyState (the
   bare-p form, the icon prop retires).
3. The 8 consumer pages: the per-card icon parity (Exercise/MentalHealth/
   Events drop theirs; Reminders/Goals keep; the dashboard's two wrong
   icons cure to bell/calendar) + the Assignments/Routines omission
   conditionals.
4. `src/app/(app)/dashboard/dashboard-page.tsx`: the Quick Actions
   conversion + the stat-tile restructure + the Recent Activity item
   anatomy + the upcoming empty forms.
5. The 5 module pages' KPI rows: the MODULE_KPI conversions with the
   probed per-page icon sets.
6. `src/app/api/dashboard/route.ts`: the mood item's title/detail split.
7. Live verification on the dev server (the QA hover with a real pointer
   at the reference's computed values — the transparent bg, the matrix
   1.1 icon, the 10→23 label; a stat tile's geometry; a module KPI row; a
   list-card header; the empty forms) + **ONE batched reference login**
   settling the three deferred facts: the mood-picker emoji vocabulary
   (F-3's emoji source), the events page's Upcoming Events empty body,
   the QA cell's icon computed size (the `[&_svg]:size-4` override
   question). Any fact that fires a new deviation gets cured in the same
   WP or documented for WH-24 if it is a surface family of its own.

### WP-3 — the docs ladder
PAD §11 (the card-geometry retirement row + the QA-focus/omission notes),
PAD §8.1 (infra 145, a11y 17, the crud row's WH-23 note), AGENTS (the
card-family facts + the empty-form doctrine), SKILL v1.20.0 → **v1.21.0**
(§8's WH-23 passage + **lesson 27**: "an identity probe reads COLOR; the
GEOMETRY needs its own walk — a surface mapped by identity is not
field-verified, and every later round trusts the map. Schedule the
geometry pass per surface family, and read the hover families with a real
pointer — the resting read cannot see the interaction"), worklog WH-23
(top), the plan's execution record, `docs/session_43.md`.

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **344/344 (24 suites)** · build OK · smoke 14/14 ·
e2e **61/61** · db census MATCH.

### WP-5 — captures
The 28-file set re-taken (expected movers: 02/04-11 + 14 + 17/18 — this
round's own cures; root-caused per file, the ledger re-based) + **1 NEW**:
29-quick-actions-hover (the dashboard, the first cell hovered with a real
pointer + settled — the icon at matrix(1.1), the label lightened; the
hover state pinned in pixels). The md5 ledger re-based at 29 files.

### WP-6 — the records
The worklog entry, the plan's execution record, session_43.md.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--remote
git@github.com:nordeim/wellness-hub.git`, main only) → remote verification.

---

## 4. Execution record (filled at ship time)

- **WP-1 RED** — verified live: the card-geometry census at the missing
  QUICK_ACTIONS record (the first deterministic cause); the empty-form +
  omission census at all 16 causes; the WH-9 prop pin at the EmptyState
  icon destructure; the CANONICAL flips 342→344/60→61; the full unit RED
  at exactly 9 expected causes (the 2 censuses + the prop pin + the five
  docs-counts sites + the §8.1 arithmetic).
- **WP-2 GREEN** — the four records + the two components + the eight page
  conversions + the dashboard + the API split, all as planned. THREE
  mid-WP finds cured: (a) the census's SectionCard/EmptyState checks
  matched only the function SIGNATURE (the body-slice form now reads the
  real render); (b) the (g) leg's fixed 3-tab walk broke on Chromium's
  SEGMENTED date/time inputs (Tab walks the month/day/year segments
  before leaving the field — on BOTH apps, the reference's own walk
  shows the same native behavior) — the leg now walks up to 12 presses
  and asserts the primary + the X are REACHED; (c) the batched reference
  login settled the three deferred facts — the mood vocabulary is
  byte-identical to ours (five tiles 😄😊😐😔😢, the same grid — a
  false 4-tile first read cured by a grid-children census; the feed's 💚
  is therefore a FIXED per-kind glyph), the events page's empty body is
  the BARE empty list (the message retired there + the e2e leg
  retargeted to the row's disappearance), and the reference's QA icon
  computes 16px (its `[&_svg]:size-4` WINS the cascade over the svg's
  own w-6 h-6 — the arm restored to our cell string). LIVE-VERIFIED at
  the reference's computed values: the QA structure + the hover family
  byte-parity with a real pointer (the transparent bg, the label
  10→23, the icon gray-700 at scale 1.1, the revert), the stat tile
  geometry, the module KPI row, the list-card header + the bare-p empty,
  the omission (h2s=[] at 0 rows). The gradient-ink family widened with
  the KPI hero labels as its -100-tint members (2.45/2.19/2.07/1.79).
- **WP-3** — 344/61 at every site; §8.1 (infra 12/145, a11y 17, the
  crud row's WH-23 note); §11 (the card-geometry retirement row + the
  family row widened); AGENTS (the card-family fact + the a11y
  widening); SKILL v1.21.0 + **lesson 27**.
- **WP-4** — lint 0/0 · tsc 0 · **344/344 (24 suites)** · build OK ·
  smoke 14/14 · **e2e 61/61** · census MATCH.
- **WP-5** — the 28-file set re-taken: **9 byte-stable** (01/10/12/13/
  20/21/22/23/25) + **19 movers, all root-caused as this round's own
  cures** (02-09/11 the card geometry + the empty forms + the
  omissions; 14/15/16/17/18/19 the cured dashboard/routines pixels
  behind the drawer or in dark; 24 the exercise KPI row; 26/27 the
  cured anatomy behind the open forms; 28 the omitted My-Routines card
  behind the modal's scrim). ONE capture-order lesson cured mid-WP: the
  24-row's API residue leaked into the first 29 take's Recent Activity
  feed — the cleanup now runs BEFORE the new capture. The NEW
  **29-quick-actions-hover** pixel-verified: the label ink
  rgb(10,10,10)→rgb(23,23,23) (exactly the reference's computed
  values), the icon zone 44→59 gray-700 px (the 1.1 scale), the cell bg
  pure white through the hover (no wash). The ledger re-based at 29
  files.
- **WP-6/WP-7** — the worklog entry, this record, session_43.md, the
  commit, the SSH-wrapper push.

**Suggested next (for WH-24):** (a) the Learning tutorial cards' own
geometry pass (the `text-lg line-clamp-2` titles + the
hover:shadow-xl transition-all overflow-hidden card forms — the one
card family this round did not walk), (b) the Events calendar card's
anatomy (the justify-between header + the day cells — the violet TODAY
cell moved in the WH-21 captures but the calendar was never
field-probed), (c) the WCAG 2.4.13 AAA ring decision (still deferred,
the ledger row governs), (d) a functional-superset round if the
reference redeploys (the CSS-hash watch continues — round 11 today).
