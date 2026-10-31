# Session-21 Remediation Plan — the form-modality round (WH-21)

**Task ID:** WH-21 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** re-probe the live reference (the standing watches), audit the
un-walked interaction families WH-20's ledger pointed at (the `active:` /
`data-[state=]` / outline-focus sweep), then cure the round's findings —
headed by **the modality deviation**: the reference's seven module
create-forms are INLINE EXPANDING CARDS in the page flow, not modal dialogs —
with TDD cures, lockstep docs, captures and the push.

> **Provenance note (the lost-commit rebuild):** the WH-21 round was executed
> once before (commit `156c733`, created locally) but the session was
> interrupted at the push step — the workspace reset and the commit was never
> pushed (remote `main` stayed at `20dbd25`). This plan re-derives the round
> from a fresh clone: every finding below was RE-PROBED live on the reference
> this session before this plan was written (the modality anatomy, the mood
> tiles, the Routines modal, the zero-checkbox Preferences — all re-read
> first-hand; nothing rides on the lost session's notes alone).

> **Reference probe (all watches clean, zero probe-hygiene events):** the
> compiled-CSS watch **round 9** — the asset hash UNCHANGED
> (`assets/index-heGLHP2e.css`): **no redeployment**, so every WH-15..WH-20
> parity map still governs. Re-probed live this session: (1) the reference's
> Events create-form opens with **ZERO dialog overlays** — its only fixed
> layers are the z-100 toast-viewport pair (its documented defect) — and
> renders an in-flow card at `top=136`, width 960 (the viewport's container),
> `borderRadius 12px`, `borderWidth 0`, the `shadow-xl` stack, the classes
> `rounded-xl border bg-card text-card-foreground border-none shadow-xl` +
    header `flex flex-col space-y-1.5 p-6` + title
    `font-semibold leading-none tracking-tight` (inherited 16px = text-base) +
    content `p-6 pt-0` + inner `space-y-4` + footer **`flex justify-end gap-3`
    as the LAST child of the `space-y-4`**; (2) the reference's mood selector
    = `grid grid-cols-2 md:grid-cols-5 gap-3` of **block-stacked tiles**
    (`p-4 rounded-2xl border-2 transition-all`, 173×104 at the 1024 viewport,
    radius 16, emoji `text-4xl mb-2`, label `text-sm font-medium
    text-gray-700`, inactive `border-gray-200 hover:border-gray-300`, active
    `bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-transparent
    shadow-lg scale-105` — computed `matrix(1.05)` via ITS transform pipeline,
    white ink on the blue→cyan gradient); (3) the reference's Routines
    "Use This Template" flow opens a REAL MODAL (`fixed inset-0 z-50
    bg-black/80` overlay + `fixed left-[50%] top-[50%] z-50` 672px panel —
    the exact shadcn anatomy our Routines page already mirrors); (4) the
    reference's Profile → Preferences tab carries **ZERO checkboxes** (our
    notification pair is the functional superset — its dark cure is
    unconstrained by parity).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on a fresh
clone at `20dbd25`, environment rebuilt — `.env` written with the relative
`DATABASE_URL="file:../db/custom.db"`, `bun install`, `db:push`, `db:seed`,
Playwright chromium reinstalled [the sandbox cache mismatch again: the
suite's 1.64 wants build 1248]):** lint 0/0 · tsc 0 · unit **335/335
(23 suites)** · `bun run build` OK · smoke **14/14** · e2e **57/57** · db
census MATCH — the exact documented WH-20 ship state, no flake.

**The round's audit class — the un-walked interaction families (WH-20's own
"suggested next") + the modality surface.** The method: the static sweep of
the `active:` / `data-[state=]` / outline-color families (the WH-20 census's
sibling classes), live oklab-aware computed-contrast probes in both modes,
and — the find that reframed the round — **opening the reference's module
forms and reading their DELIVERY MECHANISM** (overlay layers, scroll lock,
position, geometry), not just their content.

Findings (by severity) — the WH-21 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH** | `CHECKBOX.control` ships `border-neutral-900` + `data-[state=checked]:bg-neutral-900 data-[state=checked]:text-neutral-50` with **NO dark pairs** — on the dark Preferences wash (surface `#18181b` + the `bg-line-soft/40` label row = `#1a1a1d`) the checked fill/border compute **≈1.12:1 (invisible)** and the UNCHECKED box (no glyph) is a **completely invisible control**. Live-confirmed in dark on /Profile. Not covered by the WH-20 census (the `data-[state=checked]:` arm is not a hover:/focus: arm) and never walked (the dark Profile walk renders the tab's default state; the axe dark walk passes the resting pair as AA-fine ink-on-own-bg). Our superset: the reference ships ZERO checkboxes | `src/lib/page-layout.ts` (CHECKBOX.control) | dark pairs: `dark:border-neutral-400 dark:data-[state=checked]:bg-neutral-400 dark:data-[state=checked]:border-neutral-400` (**6.88:1** vs the wash) + `dark:data-[state=checked]:text-neutral-950` (glyph **7.85:1** on the fill); the light values stay pinned (fill vs white **17.93:1**) |
| F-2 | **HIGH (the round's giant finding — the modality deviation)** | **All 7 module create-forms ship as 512px Radix MODAL overlays** (`DialogContent` fixed 50%/50% + `bg-black/80` + scroll lock) while **the reference ships them as INLINE EXPANDING CARDS in the page flow** — in-flow (all ancestors `position: static`), no overlay, no scroll lock, the card at `top=136` directly below the page header (probed on Events; verified inline on Assignments + all seven; the forms' CONTENT is parity — the field sets, the labels, the buttons — the DELIVERY MECHANISM never was). Only the Routines "Schedule" flow is a modal on the reference (and ours already mirrors it). The deviation shipped through twenty rounds because every probe read the forms' content INSIDE the opened overlay — the overlay itself was never the question | the 7 pages: Events, Exercise, MentalHealth, Assignments, Reminders, StudyResources, Goals (`<Dialog open…>` blocks) | convert each to the `FORM_CARD` inline form (the new page-layout record): the card `<section>` right after `</PageHeader>` in the container's `space-y-8` flow, `{open && …}` conditional, header `p-6` + title-only (the reference's headers carry **no descriptions** — the `DialogDescription`s retire), body `p-6 pt-0` > `space-y-4` with the footer `flex justify-end gap-3` as its last child; the wide-cap local (`DIALOG_WIDE` in studyresources) retires (the inline card is container-width); Routines + mobile-nav + app-shell keep their Dialog usage (every dialog.tsx export keeps a consumer) |
| F-3 | **MEDIUM** | The MentalHealth mood selector ships **40px rounded-full pills** (`h-10 rounded-full border px-4`, active `border-primary bg-primary/10 text-primary` — **3.95:1 light / 3.59:1 dark at 14px text, AA-failing**, AND riding the preset-themeable model when the reference's own active tile is the **FIXED blue→cyan gradient + white ink** — its module-pair family, never `--primary`), while the reference ships the **173×104 block-stacked tile grid** decoded above. Both a visual deviation and the wrong theming model | `src/app/(app)/mentalhealth/mentalhealth-page.tsx` (the MOODS map) | mirror the reference's anatomy: the self-contained tile string `p-4 rounded-2xl border-2 transition-all text-center` + emoji `block text-4xl mb-2` + label `block text-sm font-medium text-gray-700` (+ our `dark:text-gray-400` superset pair) + the grid `grid grid-cols-2 md:grid-cols-5 gap-3`; inactive `border-gray-200 hover:border-gray-300` (+ our `dark:border-neutral-700 dark:hover:border-neutral-600` superset — the reference's light-only form is its own broken-dark class); active the fixed gradient pair + `text-white border-transparent shadow-lg scale-105` (Tailwind v4: the `scale` property, hence `transform: none` — the reference's matrix(1.05) twin); `aria-pressed` stays (our semantics superset — the reference's tiles carry none). The tile does NOT compose `BUTTON_CLASSES` (its `inline-flex` + `transition-colors` fight the block-stacked `transition-all` form; every other BUTTON_CLASSES consumer stays byte-identical) |
| F-4 | **LOW (the ledger gap — reference-shared)** | **The entire fixed-gradient white-ink family was never measured**: white on the worst stop of every module button pair, every routine-category pair and the brand pair — ALL fail WCAG AA 4.5:1: exercise 2.80 · mentalhealth 2.49 · assignments 2.43 · events 3.96 · studyresources 3.68 · reminders 3.67 · **goals 1.92 (worst)** · brand 3.96 · morning 2.15 · exercise-cat 3.53 · study 2.43 · evening 3.96 · self_care 2.49 · creative 3.53 · productivity 3.96 · the mood tile's own pair 2.43. All byte-identical to the reference's own buttons (its module-pair family — the preset engine does not re-skin them) → per the parity doctrine: **documented, pinned, NOT cured** | the PAGE_THEMES buttons + ROUTINE_CATEGORY_GRADIENTS + GRADIENT_BUTTON + the mood tile | the PAD §11 ledger row carrying the full measured table + the arithmetic pin (`tests/gradient-ink.test.ts` — computes the table from the v3 palette pins; a value change forces the ledger + the pin to move together, the preset-contrast precedent) |
| F-5 | **MEDIUM (method — the delivery mechanism is an assertion surface)** | The e2e CRUD battery locates the forms via `getByRole("dialog")` (2 sites) and the a11y toast leg opens the exercise DIALOG to fire its toast — the modality conversion retargets all three; and the toast leg's mood-entry residue (a saved "Amazing" entry nobody deletes) collides with the later CRUD mood flow's `/Amazing/` regex (two matching buttons — the strict-mode violation the worker-scheduling shift exposed) | `tests/e2e/wellness-crud.spec.ts` · `tests/e2e/a11y.spec.ts` | the CRUD retargets (the form titles as plain text — the inline cards carry no dialog role), the `/Amazing/` clicks go `exact: true`, the toast leg retargets to the mood form (the inline card's "Save Entry" fires "Mood check-in saved") and the describe's afterEach gains the mood-entry API cleanup (delete + verify, the workout-cleanup pattern), +1 CRUD leg pinning the modality itself (no `[role=dialog]`, the form in-flow, the page not scroll-locked, Cancel closes), +2 a11y legs: (e) the dark checkbox (the F-1 class can never return — fill/border ≥3:1 on the wash, the glyph ≥3:1 on its fill, the unchecked border visible), (f) the dark mood tiles (the active tile's `scale` = 1.05 — the Tailwind v4 property — and its gradient stops; the inactive border `rgb(64, 64, 64)` — the pinned `neutral-700: #404040`, read with the pointer parked + settled) |

**The positive findings (the round's clean classes — measured, not assumed):**
the `active:` family is EMPTY in the tree (zero Tailwind `active:` arms — the
suggested-next listed it speculatively); the `data-[state=]` family beyond
tabs is animation-only; the tabs' active state carries its dark pair
(`dark:data-[state=active]:bg-neutral-800`, the WH-18 cure) and its state is
carried by the text differential (white 15.9:1 vs neutral-400 6.5:1 — the
stock shadcn/reference family, the active pill bg a near-invisible 1.14:1
ornament on the track, documented); the outline-color focus family is EMPTY
(all `outline-none` + ring); the ring family is token-based (mode-safe); the
dashboard quick-action `group-hover:text-primary` computes 4.12:1 in dark
(passes the 3:1 non-text bar); the `aria-pressed` toggle surfaces
(THEME_MODE_PICKER, PRESET_CARD) are the documented mode-independent/token
forms.

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 23 | **24** | +`tests/gradient-ink.test.ts` |
| Unit checks | 335 | **340** | +1 form-modality census (src-census) · +2 interaction-contrast extensions (the F-1 checkbox pin, the F-3 tile pin) · +2 gradient-ink tests |
| E2E checks | 57 | **60** | +1 CRUD modality leg · +2 a11y legs (e)/(f) |
| §8.1 infra row | 11 files / 136 | **12 / 141** | the gradient-ink suite joins; the census + pin extensions |
| §8.1 a11y row | 14 | **16** | the (e)/(f) legs |
| §8.1 crud+reset row | 18 | **19** | the modality leg |

CANONICAL flips in `tests/docs-counts.test.ts` (unitSuites 23→24, unitChecks
335→340, e2eChecks 57→60) land with every doc site in the SAME commit (the
lockstep pin enforces it).

---

## 3. Work packages

### WP-1 — RED (the pins before the cures)
1. **The form-modality census** (`tests/src-census.test.ts`, appended): for
   each of the 7 pages — (1) NO `ui/dialog` import may remain, (2) the
   FORM_CARD record must be consumed. Expected RED: **14 sites (2×7)**.
2. **The interaction-contrast extensions** (`tests/interaction-contrast.test.ts`,
   +2 its): the F-1 checkbox pin (the dark arms exist + fill/border ≥3:1 vs
   the `#1a1a1d` wash + the glyph ≥3:1 on its fill + the light fill pinned at
   17.93) and the F-3 tile pin (the tile anatomy strings + the active
   gradient pair + white ink pinned at the parity value + the inactive
   faint-arm pairs + the dark twins). Expected RED: both (the missing arms,
   the pill form).
3. **The gradient-ink suite** (`tests/gradient-ink.test.ts`, NEW — 2 tests):
   the fixed-pair white-ink table computed from the v3 pins, every pair
   pinned at its documented ratio + the class claim (<4.5 all — "if a value
   change makes one pass, the ledger + the pin move together") + the PAD §11
   ledger row lockstep; and the mood tile's active pair pinned at 2.43 (the
   reference's own AA failure — the parity doctrine, NOT a ≥4.5 assertion).
   Expected RED: the missing ledger rows.
4. **The e2e retargets + the new legs**: the 2 CRUD dialog locators, the
   `/Amazing/` exact clicks, the toast leg's mood-form retarget + the
   afterEach mood cleanup, the +1 CRUD modality leg, the +2 a11y legs (e)/(f).
5. **The CANONICAL flips** (above). Full-suite RED run: the new tests fail
   at the audit's exact causes; the docs-counts pin trips on the moved totals
   until WP-3 lands.

### WP-2 — GREEN (the cures)
1. `src/lib/page-layout.ts`: the **FORM_CARD** record (after PROFILE_PANEL)
   + the **checkbox dark pairs** (CHECKBOX.control).
2. The 7 page conversions (Dialog → the inline FORM_CARD; the descriptions
   retire; the footer moves inside the `space-y-4`; the studyresources
   `DIALOG_WIDE` local retires).
3. The **mood-tile cure** (the self-contained tile string — no BUTTON_CLASSES
   composition).
4. Live verification on the dev server: the inline card at top=136 (the
   reference's own position), no overlay, no scroll lock, shadow-xl, the
   tiles' geometry (173×104 @1024), the dark checkbox values.

### WP-3 — the docs ladder
PAD §11 (the modality retirement row + the gradient-ink family row + the
mood-tile parity note inside it), PAD §8.1 (the three rows), AGENTS (the
form-modality architecture fact + the a11y bullet widening), SKILL v1.18.0 →
**v1.19.0** (§2 records + §8 passage + **lesson 25**), worklog WH-21 (top),
the plan's execution record, `docs/session_39.md`.

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **340/340 (24 suites)** · build OK · smoke 14/14 ·
e2e **60/60** · db census MATCH.

### WP-5 — captures
The 25 committed captures re-taken (expected: byte-stable — the cures move
zero resting light pixels by construction; the mood-tile + form changes live
behind closed forms/inside dialogs the page captures never opened) + **2
NEW**: 26 (a light module page with the inline form OPEN — the white card
band) and 27 (the dark MentalHealth form — the gradient tiles). The md5
ledger re-based (27 files). Any mover root-caused before it ships (the
WH-20 404 lesson: sub-pixel AA from a reflowed stylesheet bundle is the
acceptable-mover class — document it).

### WP-6 — the records
The worklog entry, the plan's execution record, session_39.md.

### WP-7 — commit + push
`git add` (the scratch scripts excluded) → commit → the SSH-wrapper push
(`--remote git@github.com:nordeim/wellness-hub.git`, main only) → remote
verification.

---

## 4. Execution record (filled at ship time)

- **WP-1 RED** — verified live: the form-modality census at its deterministic
  14-site inventory (2×7); the F-1 pin on the missing dark arms; the F-3 pin
  on the pill form (6 missing members); the gradient-ink suite on the
  missing PAD ledger row + the missing gradient; the e2e RED (the modality
  leg, (e), (f) failing against the pre-cure build — the retargeted legs
  passing as designed, their locators modality-agnostic); the CANONICAL
  flips 335→340 / 23→24 / 57→60; the full-suite RED at 11 failures (the 5
  new tests + the docs-counts lockstep on the moved totals), 340 checks /
  24 suites empirical — the exact planned ladder.
- **WP-2 GREEN** — the FORM_CARD record + the checkbox dark pairs +
  the 7 conversions (Events/Exercise/MentalHealth by hand; the remaining
  four via an idempotent script — two script artifacts (a double-brace
  title wrap, an over-greedy sed eating the ternary's brace) caught by
  tsc and cured immediately) + the mood-tile cure (the self-contained
  string). Live-verified on the dev server at the reference's own computed
  values: the Events card top=136 / width 960 / radius 12 / border 0 /
  static / no scroll lock / zero dialog roles / the byte-identical
  shadow-xl stack / the footer `flex justify-end gap-3`; the tiles
  173×104 with the active 181×109 via `scale: 1.05` (transform none) and
  the exact gradient stops; the dark checkbox fill/border rgb(163,163,163)
  + glyph rgb(10,10,10); the unchecked border visible. Probe hygiene:
  prefs restored + verified (light / #6366f1 / both checkboxes true).
- **WP-3** — the counts at every live-tense site, §8.1 (infra 12/141,
  a11y 16, crud+reset 19), §11 (the modality retirement + the
  fixed-gradient family table), AGENTS (the architecture fact + the a11y
  widening), SKILL v1.19.0 (§2 + §8 + lesson 25), the full unit suite
  GREEN at 340/340 (24 suites).
- **WP-4** — lint 0/0 · tsc 0 · 340/340 (24 suites) · build OK ·
  smoke 14/14 · e2e **60/60** (all five new legs GREEN on the first
  post-cure run) · db census MATCH.
- **WP-5** — 23/25 byte-stable; TWO movers root-caused as THE DAY ROLL
  (07-events: the calendar's violet TODAY cell advanced one column —
  the committed capture was taken 2026-10-30, this round 10-31;
  24-dark-exercise-rows: the API row's date glyph "30"→"31", a 7×9px
  box — both the WH-20 route-name mover class: date-dependent content
  renders into the pixels); the NEW 26 (the white FORM_CARD band at
  90.5% of the card zone) + 27 (the gradient stops at 1,248 blue-500 +
  1,320 cyan-500 px); the md5 ledger re-based at 27 files.
- **WP-6/WP-7** — the worklog WH-21 entry, this record,
  docs/session_39.md, the commit, the SSH-wrapper push.

**Suggested next (for WH-22):** (a) the reference's own tile focus states
(if it ever redeploys — the CSS-hash watch continues), (b) the WCAG 2.4.13
AAA ring upgrade decision (still deferred, the ledger row governs),
(c) a functional-superset round if the reference redeploys (the watch
rounds continue), (d) the Routines "Schedule" modal's inline-form parity
read on the reference (its Schedule flow's field set vs ours — the one
modal surface whose CONTENT was never probed field-by-field).
