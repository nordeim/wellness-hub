# Session-25 Remediation Plan — the Profile tab-panel geometry round (WH-25)

**Task ID:** WH-25 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** close the surface family WH-24's own ledger pointed at —
**the Profile tab panels' interior geometry** (the WH-17/18 rounds
walked the panels' COLORS + dark pairs; the field-by-field geometry of
the tab region + every interior block was never walked) — which opened
onto the round's second core finding: **the WH-21 "reference ships ZERO
checkboxes" premise is FALSE** (the Preferences tab ships NATIVE bare
`input[type=checkbox] w-5 h-5` — the WH-21 probe never opened the tab),
so the CRM-chassis Checkbox component, its dark-state cure, its
arithmetic pins and its e2e leg all shipped on a false premise. Plus
the **capture-state doctrine codification** (the 11-goals badge-residue
lesson) and the standing watches.

> **Reference probe (4 passes, zero writes, zero probe-hygiene events):**
> the compiled-CSS watch **round 13** — the asset hash UNCHANGED
> (`assets/index-heGLHP2e.css`): no redeployment, every WH-15..WH-24
> parity map still governing. The seed watch **round 14: 23/23
> byte-for-byte**. The preset hygiene clean. The drawer battery at
> 390×844: the 288px sheet with 11 links, body locked, the
> stays-open-after-nav quirk on a REAL link click, escape-close +
> unlock. The tab keyboard model verified: ArrowRight moves focus AND
> selection (automatic activation — our Tabs already wires it).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `9e0073f` = WH-24 shipped at `afe0b88` + the user's
session-log push adding `docs/session_46.md`; census MATCH):** lint 0/0
· tsc 0 · unit **347/347 (24 suites)** · `bun run build` OK · smoke
**14/14** · e2e **63/63** — the exact documented WH-24 ship state, no
flake.

**The round's audit class — the Profile tab panels' interior geometry**
(the lesson-27/28 method: the surface family the color walks never
field-verified; one family's walk opens its siblings). The method:
computed styles + DOM + the full HTML of every member, both modes
inherited from the standing walks.

Findings (by severity) — the WH-25 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH** | **The Tabs region.** Ours: the wrapper `max-w-xl` (576px) + the panel shells `mt-6`. The reference (probed live): the wrapper **`w-full`** (the tablist computes 960px = the full container) + the panel shell **`mt-2`** carrying `space-y-6` (ours: `mt-6` + the space-y-6 in the panels' content wrapper) | `profile-page.tsx` (the Tabs call) + `tabs.tsx` (the comment narration) | the wrapper flips to `w-full`, the panels to `mt-2`; the tabs.tsx comment's `max-w-xl` narration corrects. The track/trigger forms are already parity (the stock Radix trigger + `data-[state=active]:bg-background` ≈ our `bg-white` — computed-equal; our `text-neutral-600` inactive ink stays the documented WH-17 a11y superset, PAD §11) |
| F-2 | **HIGH** | **The Colors card.** Ours: the "Quick Presets" label a plain `<p class="text-sm font-medium text-foreground">` in a space-y-2 group; the preset grid `grid-cols-2 sm:grid-cols-4 gap-3`; the swatch ONE gradient bar `mb-2 block h-8 w-full rounded-md bg-gradient-to-r` (inline `to right`); the preset label `text-xs font-medium text-foreground`; the picker rows `grid-cols-1 sm:grid-cols-2 gap-4` of space-y-2 groups with `mt-2 flex items-center gap-2` rows + the color input `h-9 w-14 cursor-pointer rounded-md border border-line bg-transparent`; the preview tile `bg-gradient-to-r` + inline `linear-gradient(to right, …)`. The reference (probed live): the label the STOCK Label + **`mb-3 block`**; the grid **`grid-cols-2 md:grid-cols-4 gap-3`**; the swatches **TWO solid circles** — `flex gap-2 mb-2` holding two `w-6 h-6 rounded-full` divs with inline solid backgrounds; the label `text-xs font-medium` (inherits); the picker rows **`grid md:grid-cols-2 gap-6`** of BARE div groups with **`flex gap-3 items-center mt-2`** rows + the color input the STOCK form + **`w-20 h-12 cursor-pointer`** (80×48 — ours 56×36) + the hex input carrying `placeholder` = the current value; the preview tile **`linear-gradient(135deg, …)`** (to-br, no gradient class — pure inline style) | `profile-page.tsx` + `PRESET_CARD` (page-layout) | the PRESET_CARD re-membering (swatches/swatch/the label's inherited ink) + the conversions; our active ring + "Active" label stay (the functional superset, already documented in the record's comment) |
| F-3 | **HIGH** | **The Typography card.** Ours: the font select `mt-2 w-full sm:w-64`; the preview a single `mt-3 rounded-lg bg-line-soft p-3 text-sm text-gray-600` p + a separate `mt-1 text-xs text-muted` "Preview of X" line. The reference: the select **`w-full`** (no sm: arm); the preview a **`mt-4 p-4 border rounded-lg`** BLOCK holding `<p class="text-lg font-sans">The quick brown fox…</p>` + `<p class="text-sm text-gray-600 mt-2 font-sans">Preview of X</p>` (the border block, not the bg wash; the preview at text-lg, not text-sm) | `profile-page.tsx` | the conversion |
| F-4 | **MEDIUM** | **The Background Image card.** Ours: the body `p-6 pt-0` + a space-y-2 group; the hint `mt-2 text-xs text-muted`. The reference: the body **`p-6 pt-0 space-y-4`**; the group BARE; the hint **`text-xs text-gray-500 mt-1`** | `profile-page.tsx` | the conversion |
| F-5 | **HIGH** | **The Visual Style card.** Ours: the three selects in a **`grid grid-cols-1 sm:grid-cols-3 gap-4`** (a 3-column row on desktop). The reference: the body **`p-6 pt-0 space-y-6`** with the three selects STACKED full-width, each in a bare div (one per row — a vertical stack, never a grid) | `profile-page.tsx` | the conversion (the stack) |
| F-6 | **MEDIUM** | **The Account card.** Ours: the title icon `UserRound`; the disabled inputs the stock form + `mt-2` (no bg). The reference: the title icon **`circle-user`** (UserCircle); the disabled inputs the stock form + **`bg-gray-50 mt-2`** (the disabled wash); the body `p-6 pt-0 space-y-4` | `profile-page.tsx` | the glyph swap + the bg-gray-50 arm + the body form; our Session card (the logout) stays the functional superset (documented in PAD §11 with this round's row) |
| F-7 | **HIGH (the round's second core finding)** | **The Preferences card + the false WH-21 premise.** Ours: the title BARE "App Preferences" (no icon); the rows `flex items-start justify-between gap-4 rounded-lg border border-line bg-line-soft/40 px-4 py-3`; the row text `block text-sm font-medium` + `block text-xs text-muted`; the controls our CUSTOM button-role `Checkbox` (the CRM-chassis Session-17 form — `CHECKBOX.control`, the WH-21 dark-state cure, the interaction-contrast F-1 arithmetic pin, the a11y (e) leg). The reference (probed live): the title carries the **Settings icon**; the rows **`flex items-center justify-between p-4 rounded-lg border`** (items-center, NO gap arm, NO bg wash, p-4); the row text **`font-medium`** (unsized, 16px) + **`text-sm text-gray-500`**; the controls **NATIVE bare `<input type="checkbox" class="w-5 h-5" checked>`** — the simplest possible form. **The WH-21 claim "the reference ships ZERO checkboxes, probed live" is FALSE** — that probe never opened the Preferences tab; the custom Checkbox + its cure + its pins + its leg shipped on the untested premise through four rounds | `profile-page.tsx` + `label.tsx` (the Checkbox export) + `page-layout.ts` (the CHECKBOX record) + `interaction-contrast.test.ts` (the F-1 pins) + `a11y.spec.ts` (the (e) leg) | the conversion to the native form (our `<label>` wrapper association + aria-label stay — the a11y superset); **the Checkbox ui export RETIRES** (both consumers gone — the ui-export census owns it), the CHECKBOX record retires, the interaction-contrast F-1 it() retires, the a11y (e) leg retires (the native checkbox has no custom fill/border/glyph to measure — the UA renders it, and the dark walk passes it natively); the WH-21 docs' premise corrects (PAD §11 + the SKILL §8 passage) |
| F-8 | **MEDIUM** | **The save bar.** Ours: the Save button in a bare `<div>`. The reference: **`flex justify-end gap-3 sticky bottom-4`** — right-aligned + STICKY (the floating save bar) | `profile-page.tsx` | the conversion (the sticky bar; the button itself is byte-parity — our GRADIENT_BUTTON minus the reference's dead `hover:bg-primary/90` stock arm, the SCHEDULE_MODAL precedent) |
| F-9 | **MEDIUM (the doctrine)** | **The capture-state doctrine** — the 11-goals badge-residue lesson from WH-24: the ledger can carry environmental residue (an earned badge from a prior capture's API write). The house procedure must **assert `badgesEarned === 0` BEFORE the light set** (the achievements API returns the count), failing loudly with the re-seed instruction | the capture script + AGENTS/SKILL | the assertion lands in the capture procedure + the doctrine documented |

**The positive findings (the round's clean classes — verified, not
assumed):** the panel card shells byte-parity (PROFILE_PANEL's card +
header + title forms — the WH-17 pins hold); the card TITLES byte-parity
(Theme Mode/Colors/Typography/Background Image/Visual Style/Account
Information/App Preferences); the Theme Mode picker byte-parity
(`grid grid-cols-3 gap-3` + the border-2 cards — the WH-17 pins hold);
the preset card form byte-parity (`p-3 rounded-xl border hover:shadow-md
transition-all text-left`); the select VALUES byte-parity (the labels
"System Default"/"Gradient (Colorful)"/"Elevated (3D Shadows)" — our
constants byte-identical); the stock Label byte-parity (our ui Label =
the reference's form, the S13-P13 pin); the tab keyboard model parity
(automatic activation, probed live); the trigger stock form parity (the
Session-12/23 pins hold); the save button byte-parity modulo the dead
arm; the constants' preset hex values parity (the inline circle colors
match our COLOR_PRESETS values); the watches all clean (CSS r13, seed
r14 23/23, drawer + stays-open quirk, preset hygiene).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 24 | **24** | — |
| Unit checks | 347 | **348** | +1 the profile-geometry census (src-census: the Tabs region + the five cards + the rows + the native checkbox + the save bar) · +1 the checkbox-retirement census (no Checkbox import, the CHECKBOX record gone, the native form, the label.tsx export surface) · **−1 the interaction-contrast F-1 it()** (retires with the false premise) |
| E2E checks | 63 | **63** | −1 the (e) dark-checkbox leg (retires with the premise) · +1 the new (j) Profile tab-region computed-geometry leg (the wrapper 960px, the panel mt-2, the native checkbox 20px, the sticky save bar) |
| §8.1 infra row | 12 files / 148 | **12 / 149** | +2 in src-census, −1 in interaction-contrast |
| §8.1 a11y row | 19 | **19** | −1 +1 in place |
| Captures | 30 | **31** | +31-profile-preferences (the round's surface: the Preferences tab open — the native checkboxes + the cured rows + the sticky save bar). Expected MOVERS: 12-profile (the only page touched — root-caused as this round's own cures); the ledger re-based |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 347→348,
e2eChecks 63 unchanged) land with every doc site in the SAME commit.

---

## 3. Work packages

### WP-1 — RED (the pins before the cures)
1. **The profile-geometry census** (`tests/src-census.test.ts`,
   appended): the Tabs region (the `w-full` wrapper, the `mt-2` panels,
   the max-w-xl/mt-6 retirements), the five card bodies (the space-y
   forms), the Colors members (the Label `mb-3 block`, the
   `md:grid-cols-4`, the two circular swatches, the picker rows
   `md:grid-cols-2 gap-6` + `flex gap-3 items-center mt-2` + the color
   input `w-20 h-12`, the 135deg preview), the Typography (the w-full
   select, the `mt-4 p-4 border rounded-lg` preview block with
   `text-lg font-sans`), the BG (the `mt-1` gray-500 hint), the Visual
   Style (the STACKED space-y-6, the grid-cols-3 retirement), the
   Account (the UserCircle glyph, the `bg-gray-50` disabled wash), the
   Preferences (the Settings icon, the row form `flex items-center
   justify-between p-4 rounded-lg border`, the row text forms), the save
   bar (`flex justify-end gap-3 sticky bottom-4`). Expected RED: all
   the current forms.
2. **The checkbox-retirement census** (appended): the profile page
   imports NO Checkbox from ui/label; the native `input type="checkbox"`
   with `w-5 h-5` renders twice; the CHECKBOX record is GONE from
   page-layout; `label.tsx`'s export block carries Label only.
   Expected RED: all four causes.
3. **The e2e changes** (`tests/e2e/a11y.spec.ts`): the (e) leg RETIRES
   (the false premise); the new (j) leg lands (the Profile tab region:
   the tablist's full-width read, the panel shell's mt-2, the native
   checkbox's 20×20 computed box, the save bar's `position: sticky` +
   `justify-content: flex-end` + `bottom: 16px`).
4. **The interaction-contrast F-1 it() retires** (the file edit).
5. **The CANONICAL flips** (unitChecks 347→348). Full-suite RED run.

### WP-2 — GREEN (the cures)
1. `src/lib/page-layout.ts`: the PRESET_CARD re-membering (swatches/
   swatch/the label), the PROFILE_PANEL `bodySpaced4` member, a
   PROFILE_PREFS record (row/title/subtitle/checkbox), the CHECKBOX
   record's retirement.
2. `src/app/(app)/profile/profile-page.tsx`: the full conversion — the
   Tabs `w-full`, the panels `mt-2`, the five cards' bodies, the Colors
   members, the Typography preview block, the BG hint, the Visual Style
   stack, the Account glyph + wash, the Preferences rows + the NATIVE
   checkboxes, the sticky save bar.
3. `src/components/ui/label.tsx`: the Checkbox export retires (the
   comment block with it).
4. `src/components/ui/tabs.tsx`: the comment's `max-w-xl` narration
   corrects.
5. `tests/interaction-contrast.test.ts`: the F-1 it() retires.
6. `tests/e2e/a11y.spec.ts`: the (e) leg retires, the (j) leg lands.
7. Live verification on the dev server at the reference's computed
   values (the tablist width, the panel margin, the swatch circles, the
   color input 80×48, the preview 135deg, the stacked selects, the
   native checkbox 20×20, the save bar sticky) + the axe walk of
   /Profile in both modes (the native checkbox passes natively).

### WP-3 — the docs ladder
PAD §11 (the profile-geometry retirement row + the WH-21 premise
correction note on the checkbox cure's history + the Session-card
superset note), PAD §8.1 (infra 149), AGENTS (the profile-tab facts +
the capture-doctrine bullet), SKILL v1.22.0 → **v1.23.0** (§8's WH-25
passage + **lesson 29**), worklog WH-25 (top), the plan's execution
record, `docs/session_47.md`.

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **348/348 (24 suites)** · build OK · smoke
14/14 · e2e **63/63** · db census MATCH.

### WP-5 — captures
The capture procedure gains the **badges=0 assertion** (F-9 — the
achievements API count checked BEFORE the light set, failing loudly
with the re-seed instruction). The 30-file set re-taken (expected
mover: 12-profile — this round's own cures; root-caused per file) +
**1 NEW**: 31-profile-preferences (the Preferences tab open — the
native checkboxes + the cured rows + the sticky save bar). The md5
ledger re-based at 31 files.

### WP-6 — the records
The worklog entry, the plan's execution record, session_47.md.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--remote
git@github.com:nordeim/wellness-hub.git`, main only) → remote verification.

---

## 4. Execution record (filled at ship time)

- **WP-1 RED** — verified live: the profile-geometry census at 24 causes
  (the max-w-xl/mt-6 forms, the one-bar swatch, the sm: arms, the
  to-right tile, the bg-line-soft preview, the 3-col stack, the bare
  title, the old row form, the bare save div); the checkbox-retirement
  census at 6 causes (the Checkbox import, the native count, the w-5
  h-5 class, the CHECKBOX record, the label.tsx export, the component
  body); the CANONICAL flip 347→348; the full unit RED at exactly the
  8 expected causes.
- **WP-2 GREEN** — the record changes (PRESET_CARD's swatches/swatch
  re-membering, PROFILE_PANEL's bodySpaced4, the PROFILE_PREFS record,
  the CHECKBOX retirement) + the full page conversion + the label.tsx
  Checkbox retirement + the tabs.tsx comment corrections + the
  interaction-contrast F-1 retirement + the (e)→(j) e2e swap. THREE
  mid-WP finds cured: (a) the color-input arm ORDER (the reference
  writes `w-20 h-12`; our first conversion wrote `h-12 w-20` — same
  computed values, different string; the census caught it and the
  string flipped to the probed order); (b) two census checks read the
  PAGE source for record-borne classes (the Preferences row + checkbox
  classes live in the PROFILE_PREFS record — the checks now read the
  record + the consumption site, the WH-23 body-slice doctrine's record
  form; the retirement census needed its own record read after the
  first fix landed in the other block); (c) the (j) leg's row locator —
  the row is a `<label>` (our association superset), not a div
  (the leg's `closest("label")`), and the Account glyph read needed the
  VISIBLE panel filter (the hidden panels stay mounted — a bare
  tabpanel query reads the first in DOM order). LIVE-VERIFIED at the
  reference's computed values: the tablist 960 == the container 960 +
  the panel marginTop 8px; the label `mb-3 block` + 12px; the two 24px
  circles at the exact solid colors; the color input 80×48; the tile
  `linear-gradient(135deg, rgb(99,102,241), rgb(168,85,247))`; the
  preview block 1px solid + the 18px text; the three selects STACKED
  (the Ys 1520/1612/1704); bg-gray-50 + circle-user; the two native
  20px checkboxes + the row label form (16px padding, transparent bg,
  center align, the 16px title); the save bar sticky/flex-end/16px.
- **WP-3** — 348/63 at every site; §8.1 (infra 12/149 with the F-1
  retirement noted, the a11y row's WH-25 swap); §11 (the
  profile-geometry retirement row with the false-premise correction +
  the Session-card superset note); AGENTS (the card-family fact's
  Profile passage + the a11y bullet's WH-25 swap + the capture-state
  doctrine bullet); SKILL v1.23.0 + **lesson 29**.
- **WP-4** — lint 0/0 · tsc 0 · **348/348 (24 suites)** · build OK ·
  smoke 14/14 · **e2e 63/63** (the (j) leg green after the label
  locator fix; the axe walks pass the native checkboxes in both modes).
- **WP-5** — the capture round run with the F-9 doctrine LIVE (the
  badgesEarned=0 assertion passing at the start; the capture-24 API
  write earning the First-Step badge mid-round as expected — the
  post-round re-seed the documented house step, the census MATCH after
  it). The 30-file set re-taken: **29 byte-stable + exactly ONE mover
  (12-profile — the only page this round touched, root-caused as this
  round's own cures)**. The NEW **31-profile-preferences**
  pixel-verified: 58 dark glyph pixels (the UA check mark at y148-158
  inside the 20px native box), the row borders at y248/325/342/419/445,
  the save button right-aligned at the container edge
  (x1017..1144 of ~1152). The ledger re-based at 31 files.
- **WP-6/WP-7** — the worklog entry, this record, session_47.md, the
  commit, the SSH-wrapper push.

**Suggested next (for WH-26):** (a) the reference-redeployment round if
the CSS-hash watch moves (round 13 today — index-heGLHP2e.css still
governing); (b) the lesson-29 audit: re-verify EVERY standing absence
claim the supersets cite (the logout Session card's "the reference
carries no logout surface" — probed true this round; the Watch-Video
placeholder URLs; the reference's "read-only account" — all now
re-verified or queued); (c) the remaining never-walked interiors the
color-geometry split points at: the login family's interior field
geometry (the card's computed interiors were walked at WH-19/20 — the
signup/verify/sent views' field rows never), and the mood form's
energy-slider + tag-chips interior (the WH-21 round walked the mood
tiles; the slider + chips rows below were never field-probed); (d) the
capture-doctrine extension: the achievements assertion now covers the
badge residue class — the workout/mood rows are cleaned by the script,
but a `db:seed` BEFORE every capture round would make the whole class
structurally impossible (the doctrine's next step if another residue
class appears).
