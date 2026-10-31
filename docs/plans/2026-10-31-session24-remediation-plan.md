# Session-24 Remediation Plan — the sibling-card families + the module toolbar round (WH-24)

**Task ID:** WH-24 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** close the surface families WH-23's own ledger pointed at —
**the Learning tutorial cards' geometry pass** (the one card family WH-23
did not walk) **+ the Events calendar card's anatomy** (the
justify-between header + the day cells — never field-probed) — which
opened, per the lesson-26/27 method, onto the sibling families the same
probes exposed: **the module toolbar family** (the search inputs + the
Filter-icon select wrappers), **the shared chip/badge form**, and **the
routines template-card family** (the thumbnails the reference never
renders). Plus the standing watches and the **WCAG 2.4.13 AAA ring
decision** (the ledger row governs).

> **Reference probe (12 passes, zero writes, zero probe-hygiene events;
> 13 logins):** the compiled-CSS watch **round 12** — the asset hash
> UNCHANGED (`assets/index-heGLHP2e.css`): no redeployment, every
> WH-15..WH-23 parity map still governing. The seed watch **round 13:
> 23/23 byte-for-byte** (11 template names + 12 tutorial titles,
> innerText-searched). The preset hygiene clean. The drawer battery at
> 390×844: the 288px sheet with 11 links + Close, body locked, the
> stays-open-after-nav quirk on a REAL link click, escape-close +
> unlock. The z-100 toast viewport intercepted one trigger click (its
> documented defect — the synthetic-click convention).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `fa23d20` = WH-23 shipped at `dcd239a` + the user's
session-log push adding `docs/session_44.md`; environment intact,
census MATCH):** lint 0/0 · tsc 0 · unit **344/344 (24 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **61/61** — the exact
documented WH-23 ship state, no flake.

**The round's audit class — the sibling surface families** (the
lesson-27 method: one card family's dedicated geometry walk opens its
siblings; the surfaces mapped by identity or never opened as the
subject). The method: computed styles + DOM + the full HTML of every
member, the hover families read with a REAL pointer (settled ≥400 ms).

Findings (by severity) — the WH-24 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH (the declared target)** | **The Learning tutorial-card family.** Ours: the grid `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5` (20px gaps, 2-col only at sm–xl) + the card without `group` + the thumbnail a plain `aspect-video` block + a PERMANENT black/30 scrim + an ALWAYS-VISIBLE rounded-full white/95 "Watch Now" pill + the duration badge `px-1.5 py-0.5 font-medium` + a single `p-4` body with the h3 `font-semibold text-foreground` (16px, unclamped) + the chips row `mt-1.5 flex flex-wrap gap-1.5` + the description `mt-2 text-sm text-muted` (unclamped). The reference (probed live, real pointer, settled, two cards of different categories): the grid **`grid md:grid-cols-2 lg:grid-cols-3 gap-6`** (24px gaps, 2-col from md, 3-col from lg) + the card **`rounded-xl border bg-card text-card-foreground border-none shadow-lg hover:shadow-xl transition-all overflow-hidden group`** (the shadow-lg→xl hover verified: `0 10px 15px` → `0 20px 25px`) + the thumbnail **`relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden`** whose `<img>` carries **`group-hover:scale-105 transition-transform duration-300`** + the overlay **`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all`** (INVISIBLE at rest) + the Watch Now button **`opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100`** (the stock base + `shadow h-9 px-4 py-2`, a rounded-md RECTANGLE revealed on hover, the Play icon `w-5 h-5 mr-2`) + the duration badge **`px-2 py-1`** (no font-medium) + the body the CardHeader/CardContent split (**`flex flex-col space-y-1.5 p-6`** + **`p-6 pt-0`**) + the title row **`flex items-start justify-between gap-2 mb-2`** wrapping the title **`font-semibold tracking-tight text-lg line-clamp-2`** (18px, 2-line clamp) + the chips row **`flex flex-wrap gap-2`** as the header's second child + the description **`text-sm text-gray-600 line-clamp-3`** in the body block | `learning-page.tsx` + a TUTORIAL_CARD record (page-layout) | the record + the conversion; our h3 title keeps heading semantics (the a11y superset, the SectionCard precedent) carrying the reference's classes; our aria-label on the Watch button stays (the reference's button has no label — our superset); dark twins per the WH-23 pattern (the desc `dark:text-gray-400`, the thumb gradient's existing dark arms) |
| F-2 | **HIGH (the declared target)** | **The Events calendar card.** Ours: the hand-built header `flex items-center justify-between px-5 py-4` (the PRE-WH-23 form — the calendar card escaped the card-geometry round because it never rides the SectionCard component) + the month title `font-semibold text-foreground` + the nav `flex items-center gap-1` of ghost buttons `cn(BUTTON_CLASSES, "h-8 rounded-md px-2 hover:bg-line-soft")` with lucide ChevronLeft/Right + the grid `grid grid-cols-7 gap-2 p-4 pt-2` directly on the card + the day number a span `text-sm font-medium` + the events container `mt-1 flex flex-wrap gap-0.5`. The reference (probed live): the card rides the CardHeader/CardContent anatomy — the header **`flex flex-col space-y-1.5 p-6`** wrapping the title row **`font-semibold leading-none tracking-tight flex items-center justify-between`** (the title classes ON the row; the month text a bare `<span>`; computed 16px/600/rgb(10,10,10)) + the nav row **`flex gap-2`** of the stock OUTLINE buttons (**`border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs`** — computed: the border rgb(229,229,229), the bg white, the hovered bg **rgb(245,245,245)** = our line-soft, the hovered text rgb(23,23,23)) with **TEXT arrows ←/→** (no lucide glyphs, no aria-labels — ours keep the aria-labels, the superset) + the body **`p-6 pt-0`** wrapping the bare **`grid grid-cols-7 gap-2`** (no grid padding) + the day number a div **`text-sm font-medium mb-1 text-gray-700`** + the events container **`space-y-1`** | `events-page.tsx` + a CALENDAR record (page-layout) | the record + the conversion; the title row becomes our h2 (heading semantics kept) carrying the row classes; the nav buttons compose BUTTON_CLASSES + the outline arms in our computed-equal tokens (`border-line`/`bg-surface`/`hover:bg-line-soft`/`hover:text-neutral-900` + the dark twin + the focus arms the reference carries); the day cells' borders/hover/today-gradient are ALREADY parity (verified with a real pointer — the positive finding) |
| F-3 | **MEDIUM** | **The module-toolbar family (Learning + StudyResources).** Ours: the container `flex flex-col sm:flex-row gap-3` + a HAND-ROLLED search input string (`py-2 text-sm shadow-xs ... pl-9`) + the Search icon `h-4 w-4 text-muted` + the selects as bare container children at `w-full sm:w-48`/`w-full sm:w-40` + NO filter icon. The reference (probed live on both pages, desktop + 390px): the container **`flex flex-col md:flex-row gap-4`** + the search wrapper **`flex-1 relative`** holding the Search icon **`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`** + the input the STOCK shadcn form (`border-input ... py-1 text-base md:text-sm shadow-sm transition-colors ... placeholder:text-muted-foreground ... pl-10` — computed-equal to our `Input` component + `pl-10`) + the selects in a **`flex items-center gap-2`** wrapper LED by the **lucide Filter icon `w-5 h-5 text-gray-400`**, the triggers FIXED **`w-48`** (Learning) / **`w-40`** ×2 (StudyResources) — fixed at every viewport (the mobile 390px reads: the trigger 192px, the search full-width) | `learning-page.tsx` + `studyresources-page.tsx` + a TOOLBAR record (page-layout) | the record + the two conversions; our `Input` component already renders the stock form (border-line computes rgb(229,229,229) = the reference's border-input) — the hand-rolled strings retire; our aria-labels on the search inputs stay (the reference's input carries NO aria-label — our superset); the fixed trigger widths mirror (the mobile layout changes: the selects no longer full-width) |
| F-4 | **MEDIUM** | **The shared chip/badge form.** Ours: `inline-flex items-center gap-1 rounded-md border border-transparent px-2.5 py-0.5 text-xs font-semibold`. The reference (probed on the tutorial cards + the routines template chips): the stock shadcn Badge — **`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80`** + the tint (no `gap` arm). The MAP and the TEXT are already parity (the six category tints blue/pink/emerald/green/purple/orange + the untinted difficulties, the lowercase raw values — re-verified live, the WH-17 pin holds); only the FORM deviates | `page-parts.tsx` (OptionChip) | the stock arms land on the shared component (all chip faces are the Badge family on the reference); the `gap-1` arm retires (the reference has none — the one icon consumer, the StudyResources type chips, renders an UNOBSERVABLE face at zero rows, documented); `hover:bg-primary/80` is a token arm (the interaction-arm census's structural exemption) |
| F-5 | **MEDIUM** | **The routines template-card family.** Ours: the grid `grid grid-cols-1 md:grid-cols-2 gap-6` + the thumbnail block (`h-40` + the permanent-scrim Watch Video overlay) rendering for the 6 of 11 seeded templates that carry thumbnails + a SECOND "Watch Video" button (videoUrl && !thumbnail) + the meta rows Clock/**Sun** at `h-3.5 w-3.5` + the Benefits rows `flex items-center gap-2` with CheckCircle2 `h-4 w-4` + the "Browse Templates" heading `text-xl font-semibold text-foreground` + `text-sm text-muted` + the Use This Template an auto-width GradientButton in a `mt-auto flex items-center justify-between gap-2` row. The reference (probed live, the full card HTML): the grid **`grid md:grid-cols-2 lg:grid-cols-3 gap-6`** + the card **strip → header → body** with **NO thumbnail and NO Watch Video anywhere** (imgCount 0, hasWatchVideo false — its own template data carries the fields its UI never renders) + the meta rows clock/**calendar** at **`w-4 h-4`** + the Benefits rows **`flex items-start gap-1`** with the text glyph **`✓`** (`text-green-500` span, no lucide) + the heading **`text-2xl font-bold text-gray-900 mb-4`** + the subtitle **`text-gray-600 mb-6`** (16px) + the button **`w-full mt-auto`** (alone, full card width) + **`hover:opacity-90`** + the **ArrowRight `w-4 h-4 ml-2`** icon in the category pair (the dead `hover:bg-primary/90` stock arm dropped per the SCHEDULE_MODAL precedent) | `routines-page.tsx` | the conversions; the thumbnail/Watch-Video branches RETIRE from the face (the seed DATA keeps the fields — parity is a property of the RENDERED FACE, not the data); the "My Routines" omission at zero rows already parity (verified: the reference renders no such section) |
| F-6 | **LOW (governance)** | **The WCAG 2.4.13 AAA ring decision** — deferred since WH-20, re-suggested every round. The decision is written down this round and the row closes: **NOT ADOPTING** — the claimed conformance is WCAG 2.1+2.2 **A+AA**; 2.4.13 Focus Appearance (Obscured) is Level AAA in WCAG 2.2; the 1px ring family passes 1.4.11 non-text contrast everywhere (11.99–19.8:1, both modes, measured); the 2px surfaces (sidebar links, the login family, the tabs) already exceed 2.4.13's geometry metrics. Revisit ONLY if the conformance claim moves to AAA | PAD §11 (the row's status) | the decision recorded; no code change |

**The positive findings (the round's clean classes — verified, not
assumed):** the chip MAP byte-parity (the six category tints + the
untinted difficulties, re-verified live on the rendered badges); the chip
TEXT parity (the lowercase raw values — our constants already carry
them); the day cells' borders + hover + the today-cell gradient
byte-parity (read with a real pointer: the non-today hover
rgb(249,250,251)/rgb(209,213,219), the revert clean, the violet-100→
purple-100 gradient + the violet-300 border + the violet-700 number);
the weekday headers byte-parity (`text-center text-sm font-semibold
text-gray-600 py-2`); the template card's strip + CardHeader/
CardContent + Pro Tip + description byte-parity (ours already); the
routines grid gap-6 parity (only the column counts differ); the page
containers (`max-w-7xl mx-auto space-y-8`) parity; the events outer
grid computed-equal (`grid lg:grid-cols-3 gap-6`); the drawer battery
green (incl. the stays-open quirk on a REAL click); the "My Routines"
zero-row omission parity; the SEO surface (re-read this round:
sitemap.xml + robots.txt + manifest.json as byte-verified route
handlers); the Tailwind v4 pin set intact; the StudyResources resource
cards UNOBSERVABLE at zero rows (the reference renders only its special
empty card — the WH-23 pin governs; no new finding possible there).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 24 | **24** | — (the checks land in existing suites) |
| Unit checks | 344 | **347** | +1 the card-family geometry census (src-census: the TUTORIAL_CARD + CALENDAR records' members + consumption) · +1 the module-toolbar + chip-form census (the TOOLBAR record, the stock search form, the Filter wrappers, the fixed widths, the OptionChip badge arms) · +1 the routines template-card census (the thumbnail/Watch-Video retirement, the meta rows, the Benefits glyphs, the grid, the heading, the w-full button) |
| E2E checks | 61 | **63** | +1 the tutorial card's hover-reveal family (a11y.spec — a real pointer: the resting opacity-0 button + the hovered reveal + the img scale) · +1 the calendar's computed anatomy (a11y.spec — the nav outline form, the today-cell gradient, the day-cell geometry) |
| §8.1 infra row | 12 files / 145 | **12 / 148** | the three censuses land in src-census |
| §8.1 a11y row | 17 | **19** | the two new legs |
| Captures | 29 | **30** | +30-tutorial-card-hover (the round's surface: the first card hovered, the img scaled + the scrim + the revealed button). Expected MOVERS: 03-routines (the grid/thumbnails/button), 10-learning (the cards/toolbar), 07-events (the calendar), 08-studyresources (the toolbar), 26/28 (the cured pixels behind the open form/modal scrim) — root-caused as this round's own cures; the ledger re-based with the cause noted |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 344→347,
e2eChecks 61→63) land with every doc site in the SAME commit.

---

## 3. Work packages

### WP-1 — RED (the pins before the cures)
1. **The card-family geometry census** (`tests/src-census.test.ts`,
   appended): the TUTORIAL_CARD record's members (the gap-6 grid with
   the md/lg col arms, the `group` card, the overflow-hidden thumb, the
   scale-105 img, the bg-black/0→20 overlay, the opacity-0→100
   rectangle button with the w-5 h-5 icon, the px-2 py-1 badge, the
   CardHeader/CardContent split, the line-clamp-2 title, the gap-2
   chips row, the line-clamp-3 desc) + its consumption on the learning
   page; the CALENDAR record (the CardHeader/CardContent consumption,
   the title-row form, the flex gap-2 nav row, the outline nav button
   with the text arrows, the bare gap-2 grid, the mb-1 day number, the
   space-y-1 events container) + the events page's consumption.
   Expected RED: the missing records + the deviating current strings.
2. **The module-toolbar + chip-form census** (appended): the TOOLBAR
   record (the container, the flex-1 relative search wrapper, the
   w-5 h-5 gray-400 icons, the selects wrapper with the Filter icon,
   the fixed w-48/w-40 triggers) + both pages' consumption + the
   OptionChip's stock badge arms (transition-colors, the focus ring-2
   family, the shadow, the hover:bg-primary/80) + the gap-1
   retirement. Expected RED: the current forms.
3. **The routines template-card census** (appended): NO thumbnail
   branch, NO Watch Video (both buttons), the w-4 h-4 clock/calendar
   meta icons, the items-start gap-1 ✓-glyph Benefits rows, the
   md:grid-cols-2 lg:grid-cols-3 gap-6 grid, the text-2xl font-bold
   heading + the text-gray-600 mb-6 subtitle, the w-full mt-auto
   hover:opacity-90 button with the ArrowRight. Expected RED: all the
   current forms.
4. **The e2e legs** (`tests/e2e/a11y.spec.ts`): the tutorial
   hover-reveal leg (resting: the button opacity 0, the overlay
   transparent; hovered with a real pointer + settled: the button
   opacity 1, the overlay 20% black, the img's scale property 1.05 —
   the WH-21 lesson: read the scale PROPERTY) + the calendar anatomy
   leg (the nav button's border 1px + the white bg + the hovered
   line-soft, the today cell's gradient stops, a day cell's 8px
   radius + 96px min-height). New legs — the RED discipline applies
   to the censuses (F-1..F-5's cures); the legs pin the cured state.
5. **The CANONICAL flips** (unitChecks 344→347, e2eChecks 61→63).
   Full-suite RED run.

### WP-2 — GREEN (the cures)
1. `src/lib/page-layout.ts`: the **TUTORIAL_CARD** record (card/cover
   members + header/titleRow/title/chipsRow/body/desc + the dark
   twins), the **CALENDAR** record (headerRow/navRow/navBtn/grid/
   dayNum/dayEvents), the **TOOLBAR** record (container/searchWrap/
   searchIcon/selectsWrap/filterIcon).
2. `src/components/shared/page-parts.tsx`: the OptionChip's stock
   badge arms (the gap-1 retirement).
3. `learning-page.tsx`: the toolbar conversion (the Input + pl-10, the
   Filter wrapper, the fixed w-48) + the card conversion (the grid,
   the group card, the reveal family, the split body).
4. `studyresources-page.tsx`: the toolbar conversion (the Filter
   wrapper + the fixed w-40s).
5. `events-page.tsx`: the calendar card conversion (the CardHeader/
   CardContent forms, the title row, the outline nav with the text
   arrows, the bare grid, the mb-1 day numbers, the space-y-1
   container).
6. `routines-page.tsx`: the template card conversion (the thumbnail +
   Watch Video retirement, the meta icons, the Benefits glyphs, the
   grid, the heading, the w-full button).
7. Live verification on the dev server at the reference's computed
   values (the tutorial card's resting + hovered states with a real
   pointer; the calendar's header/nav/today cell; the toolbars at
   1280 + 390; the routines grid + the button) + the axe check of the
   opacity-0 Watch Now button (the a11y net's /Learning walk — if
   axe flags the invisible-at-rest text, the documented-ignore-entry
   doctrine decides, never a silent pass).

### WP-3 — the docs ladder
PAD §11 (the WH-24 retirement row + the 2.4.13 DECISION row), PAD §8.1
(infra 148, a11y 19), AGENTS (the card-family fact's WH-24 widening:
the group-hover card family + the toolbar + the badge form), SKILL
v1.21.0 → **v1.22.0** (§8's WH-24 passage + **lesson 28**), worklog
WH-24 (top), the plan's execution record, `docs/session_45.md`.

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **347/347 (24 suites)** · build OK · smoke
14/14 · e2e **63/63** · db census MATCH.

### WP-5 — captures
The 29-file set re-taken (expected movers root-caused per file — this
round's own cures) + **1 NEW**: 30-tutorial-card-hover (the Learning
page, the first card hovered with a real pointer + settled — the img
at scale 1.05, the 20% scrim, the revealed Watch Now button). The md5
ledger re-based at 30 files.

### WP-6 — the records
The worklog entry, the plan's execution record, session_45.md.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--remote
git@github.com:nordeim/wellness-hub.git`, main only) → remote verification.

---

## 4. Execution record (filled at ship time)

- **WP-1 RED** — verified live: the card-family geometry census at the
  missing TUTORIAL_CARD record (the first deterministic cause); the
  module-toolbar + chip-form census at the missing TOOLBAR record; the
  routines template-card census at 12 causes; the CANONICAL flips
  344→347/61→63; the full unit RED at exactly the 9 expected causes
  (the 3 censuses + the five docs-counts sites + the §8.1 arithmetic).
- **WP-2 GREEN** — the four records (TUTORIAL_CARD + CALENDAR + TOOLBAR
  + TEXTAREA_FIELD) + the OptionChip re-arm + the five page conversions
  (learning ×2 surfaces, studyresources, events, routines), all as
  planned. FIVE mid-WP finds cured in the same stroke: (a) the census's
  first textarea sweep over-matched — the false positives on the
  events location row + the SR form fields led to the textarea FAMILY
  probe (every form the reference renders, all eight byte-identical
  `min-h-[60px] text-base md:text-sm shadow-sm`), which found the
  textareas genuinely deviating too (ours: min-h-16/min-h-20 +
  text-sm-only + shadow-xs) — the TEXTAREA_FIELD record + all ten call
  sites converted; (b) the (h) leg's overlay locator read the img's
  PARENT'S sibling instead of the img's sibling — the button read null
  until corrected; (c) the oklab alpha form — Tailwind v4 computes
  `bg-black/0` as `oklab(0 0 0 / 0)`, so the (h) leg's scrim assertions
  pin the oklab strings (the WH-21 alpha-token lesson's e2e form);
  (d) the shared-record question — the ROUTINE_CATEGORY_GRADIENTS map's
  600 hover arms: an over-broad sweep almost retired the PAGE_THEMES
  module buttons' arms too, caught and restored by diffing (the
  reference runs TWO button families side by side — the module
  primaries darken their stops on hover [probed live on New Event +
  Log Workout: `hover:from-600 hover:to-600` + shadow-lg], the template
  button is opacity-90 alone [probed: `shadow` + no 600s] — the map
  went BARE, the module buttons keep their arms, the census pins the
  distinction); (e) the watchBtn's `hover:bg-gray-100` needed its dark
  twin for the interaction-arm census — declared explicitly (the
  button's white face is mode-independent, the wash stays gray-100 in
  both modes). LIVE-VERIFIED on the dev server at the reference's
  computed values: the tutorial card RESTING (the button opacity 0, the
  scrim oklab(0 0 0 / 0), the img scale none, the desc clamp 3, the
  title 18px clamp 2, the grid 24px gaps) and HOVERED with a real
  pointer (the button opacity 1, the scrim oklab(0 0 0 / 0.2), the img
  scale 1.05); the toolbar (the search paddingLeft 40px + the stock
  class + the funnel icon + the trigger 192px); the chip (the badge
  arms, radius 6px, weight 600); the calendar (the CardHeader/
  CardContent forms, the h2 row, the ←/Today/→ nav at the border
  rgb(229,229,229) + white bg + 32px + 6px radius, the hovered Today
  rgb(245,245,245)/rgb(23,23,23) EXACTLY the reference's computed, the
  bare grid, the 8px day-cell radius, the mb-1 day number, the today
  gradient + the violet-300 border); the textarea 60px/14px; the
  template card (the 3-col grid, imgCount 0, no Watch Video, the button
  256px, the clock/calendar/arrow-right icons, the 24px/700 heading);
  the mobile 390 (the search 16px text-base, the trigger 192px, one
  column).
- **WP-3** — 347/63 at every site; §8.1 (infra 12/148, a11y 19); §11
  (the sibling-families retirement row + the 2.4.13 DECISION row —
  not adopting, out of the claimed A+AA conformance); AGENTS (the
  card-family fact's WH-24 widening + the a11y bullet's WH-24 passage);
  SKILL v1.22.0 + **lesson 28**.
- **WP-4** — lint 0/0 · tsc 0 · **347/347 (24 suites)** · build OK ·
  smoke 14/14 · **e2e 63/63** (the (h) hover-reveal + (i)
  calendar-anatomy legs green; axe passes the opacity-0 button on the
  /Learning walk).
- **WP-5** — the 29-file set re-taken: **19 byte-stable** (01/02/04/05/
  06/09/12/13/14/15/16/17/19/20/21/22/23/25/29) + **10 movers, all
  root-caused**: 03/18 (the template cards — the grid, the thumbnail
  retirement, the button, the meta/benefits glyphs, the heading), 07
  (the calendar), 08 (the toolbar), 10 (the cards + the toolbar), 24
  (the row chip's badge arms + the form textarea), 26/27/28 (the cured
  pixels behind the open form/modal + the textareas), and **11-goals —
  the badge-residue CORRECTION**: the WH-23 ledger's first badge tile
  carried the EARNED state (bg-primary/5 = rgb(247,247,254), the
  residue of their capture-24 workout's "First Step" badge — their own
  capture-order lesson), which the cleanly-seeded db renders UNEARNED
  (bg-line-soft/40 = rgb(251,251,251)) — an environmental artifact
  corrected, not a code change; the ledger re-based on the clean state.
  The NEW **30-tutorial-card-hover** pixel-verified: 9,743 darkened
  pixels (the 20% scrim over the img) + 1,139 new-white pixels (the
  revealed Watch Now button) in the first card's cover region. The
  ledger re-based at 30 files.
- **WP-6/WP-7** — the worklog entry, this record, session_45.md, the
  commit, the SSH-wrapper push.

**Suggested next (for WH-25):** (a) the Reference-Redeployment round if
the CSS-hash watch moves (round 12 today — index-heGLHP2e.css still
governing); (b) the remaining never-walked families the lesson-28
method points at: the Profile tab panels' interior geometry (the
Appearance/Notifications/Preferences tab bodies — the WH-17/18 rounds
walked their colors + dark pairs, never their field-by-field geometry),
and the routine template card's populated Schedule modal fields (the
date/time defaults probed at WH-22, the note textarea's field form now
parity — but the modal's REMAINING field labels were read as a set,
never member-by-member); (c) a **capture-state doctrine codification**:
the 11-goals mover exposed that the ledger can carry environmental
residue (an earned badge from a prior capture's API write) — the
house procedure should re-seed (or assert badges=0) BEFORE the light
set, not after the captures; (d) the axe-walk of the opacity-0 Watch
Now button held green this round — if a future axe version flags
invisible-at-rest text, the documented-ignore-entry doctrine decides.
