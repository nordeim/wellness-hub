# Session-26 Remediation Plan — the form-interior geometry round (WH-26)

**Task ID:** WH-26 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** the reference **REDEPLOYED** (the compiled-CSS watch round 14:
`assets/index-heGLHP2e.css` → `/static/index-s8d1FO8M.css`) — this round
re-verifies every standing parity map against the redeployed reference AND
closes the surface family WH-25's own ledger pointed at: **the create-forms'
interior field geometry** (the WH-21 round pinned the CARD, the footer and
the modality; the field interiors — the grids, the sliders, the chips, the
pickers — were never field-walked), which opened onto the round's second
core finding: **the active mood tile's label renders GRAY on the blue
gradient** — the WH-21 "白字" pin asserted the button's `text-white` arm
while the label span's constant `text-gray-700` overrode it (the lesson-29
class: a pin must assert the RENDERED LEAF, not the parent's arm). Plus the
**changed-fact corrections** (the /signup 404 → auth-wall bounce; the
reference's upload-surface absence claim now FALSE) and the **new reference
defects** (the toast viewport lost `pointer-events-none` — its own mobile
hamburger is unclickable by real pointers; deliberately NOT mirrored).

> **Reference probe (12 passes; the only write = one probe signup account
> `probe-wh26-<ts>@example.com`, isolated, on no pinned surface; every
> other surface read at rest or client-state-only):** the CSS-hash watch
> **round 14 MOVED** (`assets/index-heGLHP2e.css` → `/static/index-s8d1FO8M.css`)
> — the redeployment. The standing maps re-verified at speed: the login
> family's five views (signin/signup/reset/sent/verify — the stacks, the
> back-button ladders, the field rows, the six code inputs at 40×44, the
> sent callout) byte-parity · the seven module button pairs (orange→red,
> emerald→teal, blue→cyan, violet→purple, blue→indigo, rose→purple,
> yellow→amber) · the mobile header bar · the Profile tab region (the
> 1024px tablist, mt-2 panels, the two native 20px checkboxes, the row
> form) · the Schedule modal (672px, title-only, no Cancel) · the drawer
> (the 288px sheet, 11 links, scroll-lock, the stays-open quirk,
> escape-close — opened via a JS click because the redeployed reference's
> own toast viewport intercepts the trigger) · the seed content (the 12
> tutorial + 11 template titles) · the login card (the h1 30px, the
> google button, the 48px inputs, the stock submit) · the 4-cell Quick
> Actions grid. The changed facts: `/signup` now **200 + an auth-wall
> bounce to `/login?from_url=…`** (was 404); the reset flow now fires a
> real `POST /auth/reset-password-request` (the s11 "no network call"
> narration is stale — our session-163 wiring was already correct); the
> studyresources form now carries an **Upload File (optional)** field; the
> toast viewport lost `pointer-events-none` AND `gap-2` (the
> elementFromPoint proof: a pointer at the hamburger's center hits the
> overlay, not the trigger).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the fresh
clone at `ac668a8` = WH-25 shipped at `b60e7a6` + the session-log push
adding `docs/session_48.md`; census MATCH):** lint 0/0 · tsc 0 · unit
**348/348 (24 suites)** · `bun run build` OK · smoke **14/14** · e2e
**63/63** — the exact documented WH-25 ship state, no flake (the Playwright
browser reinstalled for build 1248 first).

**The round's audit class — the create-forms' interior field geometry**
(the lesson-27/29 method: the surface family the modality/card rounds never
field-walked; one family's walk opens its siblings). The method: the full
DOM + computed styles + the pixel analysis of every member, both the
reference (post-redeployment) and our dev server.

Findings (by severity) — the WH-26 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH (the bug)** | **The active mood tile's label.** Ours: the label span carries a CONSTANT `text-gray-700 dark:text-gray-400` — on the active tile the button's `text-white` is overridden by the span, so the ACTIVE label renders gray-700 (rgb(55,65,81)) on the blue→cyan gradient (live-read on our dev server). The reference: the active tile's label carries **`text-sm font-medium text-white`** (the div flips with the tile state). The WH-21 F-3 pin claimed 白字 but asserted the BUTTON's arm, never the rendered label span — the bug shipped through five green rounds | `mentalhealth-page.tsx` (the tile label) + `MOOD_FORM` (the new record) | the label class becomes state-conditional: active `text-white`, inactive `text-gray-700 dark:text-gray-400` — pinned by the new census + the (k) e2e leg's computed read |
| F-2 | **HIGH** | **The mood form's wrapper + label spacing.** Ours: the body wrapper `space-y-4` (16px group gaps) + the mood label bare + the grid `mt-2` (12px label→grid gap). The reference: **`<form class="space-y-6">`** (24px group gaps — the mood form is the ONE form that deviates from its space-y-4 siblings) + the mood label **`mb-4 block`** (a 16px gap) + the grid BARE | `mentalhealth-page.tsx` | the wrapper flips to `space-y-6`; the label gains `mb-4 block`; the grid's `mt-2` retires |
| F-3 | **HIGH** | **The energy slider.** Ours: `mt-3 w-full accent-[var(--color-primary)]` + **min=0** — the native accent slider, 16px tall, indigo. The reference: **`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer`** + **min=1** — an 8px gray-200 track whose thumb renders as the NATIVE blue circle (Chrome keeps a default thumb under `appearance:none` — pixel-verified: 164 blue px at the 44%-of-track position; the accentColor computes `auto`) | `mentalhealth-page.tsx` + `MOOD_FORM` | the class conversion + `min={1}` (the schema's `min(0)` stays our API superset — the form is the face); the label→range gap becomes the reference's 13px line-box artifact (the `mt-3` retires); the dark track twin `dark:bg-neutral-700` (our documented dark superset) |
| F-4 | **HIGH** | **The field-grid family (all six sibling forms).** The reference pairs the trailing fields in **`grid md:grid-cols-2 gap-4`**: events [Date, Time, Category, Location] · exercise [Type, Duration, Intensity, Calories, Date] · assignments [Subject, Due Date, Priority, Estimated Hours] · reminders [Remind Me On, Type, Priority, Repeat] · goals ONE grid [Category, Frequency, Target, Unit, Deadline] · studyresources [Title, Subject] + [Resource Type, Exam Date]. Ours: events/exercise/assignments ALL STACKED single-column; reminders a `sm:grid-cols-3` with Remind Me On stacked; goals TWO `sm:grid-cols-2` grids with different membership; studyresources stacked + an [Exam, URL] `sm:grid-cols-2` | the six module pages + `FORM_GRID` (the new record) | the conversions — each page's trailing fields re-homed into the `FORM_GRID` record; the `sm:grid-cols-3`/`sm:grid-cols-2` forms retire |
| F-5 | **HIGH** | **The form Add buttons (mood activities + sr tags).** Ours: the outline form (`h-9 rounded-md border border-line px-4 hover:bg-line-soft` — bg transparent, live-read). The reference: the stock SOLID primary — **`bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2`** — whose `--primary` computes **rgb(23,23,23)** (the shadcn stock zinc; the reference's `--primary` is NOT its brand pair — its brand gradient rides explicit classes) | `mentalhealth-page.tsx` + `studyresources-page.tsx` + `FORM_BUTTONS.add` | the fixed-value conversion `bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 h-9 px-4 py-2` (the reference's computed face at its own token value) + the dark twins `dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200` (our superset) |
| F-6 | **HIGH** | **The tag-chip family (mood activities + sr tags).** Ours: `inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary` + the × at `text-primary/70 hover:text-primary` + the row `mt-2 flex flex-wrap gap-1.5`. The reference: **`px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center gap-2`** (bg rgb(209,250,229), ink rgb(4,120,87) — AA at ~5.9:1) + the × button **BARE** (zero classes) + the row **`flex flex-wrap gap-2 mt-3`** | both pages + `TAG_CHIP` (the new record) | the conversion (both sites); the × keeps our `aria-label` superset but goes class-bare; the dark twins on the chip (`dark:bg-emerald-900/50 dark:text-emerald-300`); the sr tags row flips to the reference's `flex gap-2 mb-2` (the 4px artifact label gap, live-measured) |
| F-7 | **MEDIUM** | **The form Cancel buttons (all seven forms).** Ours: `h-10 rounded-md border border-line px-8 hover:bg-line-soft` (40px tall, 32px padding, live-read). The reference: the stock OUTLINE — **`border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2`** (36px, 16px) | the seven pages + `FORM_BUTTONS.cancel` | the token-computed-equal conversion: `border border-line bg-surface shadow-sm hover:bg-line-soft hover:text-ink h-9 px-4 py-2` (--line #e5e5e5 = their --input; --line-soft #f5f5f5 = their --accent; --surface = their --background — all computed-equal, the WH-25 token doctrine) |
| F-8 | **MEDIUM** | **The reflection textarea.** Ours: the plain `TEXTAREA_FIELD` (60px). The reference: **`mt-2 h-24`** (96px — live-read) | `mentalhealth-page.tsx` | `cn(TEXTAREA_FIELD, "h-24")` |
| F-9 | **MEDIUM (the lesson-29 catch)** | **The studyresources Upload File field.** The WH-4 absence claim "the reference carries no upload surface anywhere (live-probed)" is FALSE on the redeployed reference: the form carries **"Upload File (optional)"** — a bare stock `<input type="file">` + `flex-1` inside a `flex items-center gap-2` row. Ours: MISSING entirely | `studyresources-page.tsx` + `UPLOAD_FIELD` (the new record) | the field lands (our `Input type="file" className="flex-1"` — the stock form + the file: arms already ride `INPUT_BASE`); RENDER-ONLY: the native picker opens, no persistence, no `/api/upload` route (the reference's own surface mirrored at the face level — the WH-4 route-retirement pin stays; the PAD §11 row documents the mirror) |
| F-10 | **MEDIUM** | **The sr Rating picker.** Ours: lucide `Star` icons `h-6 w-6 gap-1` with amber fill. The reference: **five bare `<button type="button" class="text-2xl">☆</button>`** in a **`flex gap-2`** row (the ink near-black rgb(10,10,10)) | `studyresources-page.tsx` + `RATING_PICKER` (the new record) | the text-star conversion (☆/★ at text-2xl, gap-2); our `radiogroup`/`aria-checked` semantics + the amber-free fill (★ for n ≤ rating) stay the functional superset |
| F-11 | **MEDIUM** | **The Low/High row.** Ours: `flex justify-between text-xs text-subtle` (8px gap via the group's space-y). The reference: **`flex justify-between text-xs text-gray-500 mt-1`** (an 11px gap — the artifact + mt-1) | `mentalhealth-page.tsx` + `MOOD_FORM.lowHigh` | the conversion (text-gray-500 + mt-1 + the dark twin `dark:text-gray-400`) |
| F-12 | **LOW (the doc corrections)** | **The changed facts.** (a) `/signup`: 404 → **200 + auth-wall bounce** to `/login?from_url=…` — the SKILL §12 lesson-2 + login-card comment narrations correct (our working `/signup` page stays the documented superset — the reference still has no public signup page); (b) the reference's reset flow now fires a real network request (the `login-reset.ts` header's "no network call fires" narration is stale; our session-163 wiring already correct); (c) the reference's toast viewport lost `pointer-events-none` + `gap-2` — **its mobile hamburger is unclickable by real pointers** (the elementFromPoint proof) — our stock `pointer-events-none` viewport deliberately NOT mirrored (the PAD §11 defect row); (d) our tags-input Enter-to-add stays (the reference's Enter does nothing — our superset, now documented) | the docs ladder (WP-3) | the narrations correct; no code change |

**The positive findings (the round's clean classes — verified, not
assumed):** the FORM_CARD family byte-parity (the card, the header, the
title, the body, the footer — the WH-21 pins hold on the redeployed
reference); the form wrappers `space-y-4` on the six siblings (the mood
form's `space-y-6` is its own); the label→control gap mechanism
computed-EQUAL at 12px on both apps (the inline-label line-box artifact +
the controls' `mt-2` — our `space-y-2` groups are the computed-equal
mechanism, kept); the label stock form byte-parity (the reference's labels
carry NO `htmlFor` — ours keeps the association superset); the mood tile
anatomy byte-parity (211×104, the active `bg-gradient-to-br from-blue-500
to-cyan-500 text-white border-transparent shadow-lg scale-105` — the FULL
string, the pass-3 truncation resolved; the inactive border pair; the
`text-4xl mb-2` icon); the tile grid `grid grid-cols-2 md:grid-cols-5
gap-3`; the textareas' stock form (`min-h-[60px]`, the WH-24 pin); the
date input's `mt-2`; the footer `flex justify-end gap-3`; the Save buttons
byte-parity (the module pairs); the reminders field types
(`datetime-local`); the login family's five views ALL byte-parity on the
redeployed reference (the WH-19/20 computed walks + the s11/s21/s79/s96/s111
pins all hold); the standing maps listed in the header quote; the tags row
`flex gap-2 mb-2` + the 4px label gap (live-measured).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 24 | **24** | — |
| Unit checks | 348 | **350** | +1 the form-grid family census (src-census: the six pages' grids, the `sm:` retirements) · +1 the form-interior census (the MOOD_FORM members, the FORM_BUTTONS forms, the TAG_CHIP family, the upload field, the rating picker, the min=1, the h-24, the active-label white, the accent-arm retirements) |
| E2E checks | 63 | **64** | +1 the (k) mood-form computed-interior leg (the wrapper's 24px gaps, the label mb 16px, the range h-8/min-1, the Low/High row, the reflection 96px, the Cancel 36px + the surface wash, the Add rgb(23,23,23), the chip emerald pair, the ACTIVE LABEL rgb(255,255,255)) |
| §8.1 infra row | 12 files / 149 | **12 / 151** | +2 in src-census |
| §8.1 a11y row | 19 | **20** | +1 the (k) leg |
| Captures | 31 | **32** | +32-mentalhealth-form-interior (the round's surface: the form open — the slider, the chips, the reflection, the footer). Expected MOVERS: 26-events-inline-form + 27-dark-mood-form (the only two open-form captures — both root-caused as this round's own cures); the ledger re-based |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 348→350,
e2eChecks 63→64) land with every doc site in the SAME commit.

---

## 3. Work packages

### WP-1 — RED (the pins before the cures)
1. **The form-grid family census** (`tests/src-census.test.ts`, appended):
   the six pages' trailing-field groups read the `FORM_GRID.grid` record
   (`grid md:grid-cols-2 gap-4`) with the field MEMBERSHIP pinned per page
   (events: Date/Time/Category/Location · exercise: Type/Duration/
   Intensity/Calories/Date · assignments: Subject/Due/Priority/Hours ·
   reminders: RemindMeOn/Type/Priority/Repeat · goals: ONE grid
   Category/Frequency/Target/Unit/Deadline · studyresources:
   Title/Subject + Type/ExamDate); the retirements (the stacked
   single-column trailing fields, the `sm:grid-cols-3` reminders grid, the
   `sm:grid-cols-2` goals grids, the sr [Exam, URL] grid). Expected RED:
   the six grid causes + the four retirement causes.
2. **The form-interior census** (appended): the MOOD_FORM record's members
   (the wrapper `space-y-6` + the `space-y-4` retirement, the mood label
   `mb-4 block`, the bare grid, the ACTIVE label `text-white` + the
   constant-gray retirement, the range classes + `min={1}` + the
   accent-arm retirement, the Low/High `text-gray-500 mt-1` + the
   text-subtle retirement, the reflection `h-24`); the FORM_BUTTONS
   (cancel `h-9 px-4` + the surface/shadow arms + the h-10/px-8
   retirements ×7; add `bg-neutral-900` + the outline retirements ×2); the
   TAG_CHIP family (the chip classes + the primary/10 retirement + the ×
   bare + the row `gap-2 mt-3` ×2 + the sr tags row `flex gap-2 mb-2` +
   the mt-2 retirement); the UPLOAD_FIELD (the label + the `flex items-
   center gap-2` wrap + the `type="file"` + `flex-1`); the RATING_PICKER
   (the `flex gap-2` row + the `text-2xl` stars + the Star-icon
   retirement). Expected RED: every current form.
3. **The (k) e2e leg** (`tests/e2e/a11y.spec.ts`, appended): open the
   mood form through the UI; read the computed interior — the group-gap
   ladder (two adjacent group tops 24px apart), the mood label's
   marginBottom 16px, the range height 8px + min "1", the Low/High
   marginTop 4px + color rgb(107,114,128), the reflection height 96, the
   Cancel height 36 + backgroundColor rgb(255,255,255), the Add
   backgroundColor rgb(23,23,23), the chip (added client-side) backgroundColor
   rgb(209,250,229) + height 28, the ACTIVE tile label color
   rgb(255,255,255). Expected RED: every read.
4. **The CANONICAL flips** (unitChecks 348→350, e2eChecks 63→64). Full
   unit RED run at exactly the expected causes.

### WP-2 — GREEN (the cures)
1. `src/lib/page-layout.ts`: the new records — `FORM_GRID`,
   `FORM_BUTTONS` (cancel/add), `TAG_CHIP`, `MOOD_FORM` (label/grid/tile/
   active/inactive/icon/labelActive/labelInactive/range/lowHigh),
   `RATING_PICKER`, `UPLOAD_FIELD` — each with the probe provenance in
   its comment block (the reference's computed values + the token
   doctrine notes + our dark-superset twins).
2. `src/app/(app)/mentalhealth/mentalhealth-page.tsx`: the wrapper
   `space-y-4`→`space-y-6`; the mood label `mb-4 block` (the grid's
   `mt-2` retires); the tile label state-conditional (F-1); the range
   conversion + `min={1}`; the Low/High row; the reflection `h-24`; the
   Add → `FORM_BUTTONS.add`; the chips → `TAG_CHIP`; the Cancel →
   `FORM_BUTTONS.cancel`.
3. `src/app/(app)/events/events-page.tsx`: the four trailing fields →
   `FORM_GRID`; the Cancel.
4. `src/app/(app)/exercise/exercise-page.tsx`: the five fields →
   `FORM_GRID` (Notes stays a bare group); the Cancel.
5. `src/app/(app)/assignments/assignments-page.tsx`: the four trailing →
   `FORM_GRID`; the Cancel.
6. `src/app/(app)/reminders/reminders-page.tsx`: RemindMeOn + the three
   selects → ONE `FORM_GRID` (the `sm:grid-cols-3` retires); the Cancel.
7. `src/app/(app)/goals/goals-page.tsx`: the five fields → ONE
   `FORM_GRID` (the two `sm:grid-cols-2` grids retire); the Cancel.
8. `src/app/(app)/studyresources/studyresources-page.tsx`: [Title,
   Subject] + [Type, ExamDate] → `FORM_GRID` (the URL moves to a bare
   group); the Upload field lands (F-9); the tags row `flex gap-2 mb-2`
   + the Add → `FORM_BUTTONS.add` + the chips → `TAG_CHIP`; the rating →
   `RATING_PICKER` (F-10); the Cancel.
9. Live verification on the dev server at the reference's computed values
   (the gap ladder, the tile label, the slider's track/thumb pixels, the
   button faces, the chip pair) + the probe hygiene (zero prefs writes;
   the client-state chips removed).

### WP-3 — the docs ladder
PAD §11 (the four new rows: the form-interior retirement row, the upload
mirror note, the toast-viewport defect row, the /signup + Enter superset
corrections), PAD §8.1 (infra 151, a11y 20), AGENTS (the card-family
fact's form-interior passage + the WH-4 upload-absence correction + the
a11y bullet's (k) leg), SKILL v1.23.0 → **v1.24.0** (§8's WH-26 passage +
**lesson 30**), README + CLAUDE.md (the counts), worklog WH-26 (top), the
plan's execution record, `docs/session_49.md`.

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **350/350 (24 suites)** · build OK · smoke
14/14 · e2e **64/64** · db census MATCH.

### WP-5 — captures
The capture procedure rides the WH-25 doctrine LIVE (the achievements
`badgesEarned === 0` assertion BEFORE the light set — fail loudly +
`bun run db:seed`, never re-base on a dirty account). The 31-file set
re-taken (expected movers: 26 + 27 — the two open-form captures,
root-caused per file) + **1 NEW**: 32-mentalhealth-form-interior (the
form open — the slider, the chips, the reflection, the footer). The md5
ledger re-based at 32 files.

### WP-6 — the records
The worklog entry, the plan's execution record, session_49.md.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--key-file <key outside repo>`
+ `--remote git@github.com:nordeim/wellness-hub.git`, main only) → remote
verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-1 RED** — the form-grid family census + the form-interior census +
  the (k) e2e leg written and verified RED at the expected causes; the
  CANONICAL flips 348→350/63→64; the full unit RED run at exactly the
  predicted failures (the 2 censuses + the five docs-counts sites + the
  §8.1 arithmetic).
- **WP-2 GREEN** — the six records (FORM_GRID, FORM_BUTTONS, TAG_CHIP,
  MOOD_FORM, RATING_PICKER, UPLOAD_FIELD) + the seven page conversions +
  the emerald-300/900 @theme tokens + FOUR mid-WP finds cured in the
  same stroke: (a) the gradient-ink + interaction-contrast F-3 pins
  moved to the RECORD + consumption-site form (the body-slice doctrine —
  they went RED at the record move, not at a regression), the F-3
  ANATOMY gaining the labelActive/labelInactive pair as separate
  members; (b) the census's mb-4 check read the record + consumption;
  (c) the Star-retirement check scoped to the FORM region (the LIST
  display is a separate unprobed surface); (d) the emerald dark twins'
  tokens. LIVE-VERIFIED at the reference's computed values on the dev
  server (every interior read matching, the tile geometry ladder
  173×104/181×109/211×104, zero DB writes).
- **WP-3** — PAD §11 (the form-interior retirement row + the upload
  mirror + the /signup route change + the Enter superset + the
  toast-viewport update), PAD §8.1 (infra 151, a11y 20), AGENTS (the
  form-interior passage + the WH-4 correction + the (k) leg), SKILL
  v1.23.0→v1.24.0 (§8's WH-26 passage + lesson 30 + one stale 57/57
  count site caught), README + CLAUDE (the counts), docs-counts 10/10.
- **WP-4** — lint 0/0 · tsc 0 · unit **350/350 (24 suites)** · build OK
  · smoke 14/14 · e2e **64/64** · census MATCH.
- **WP-5** — the doctrine LIVE (badgesEarned=0 asserted before the
  light set; the capture-24 write earning First-Step mid-round; the
  post-round re-seed + census MATCH). **28 byte-stable · 3 movers
  root-caused** (26 + 27 = this round's own cures, the only two
  open-form captures, 21.0%/13.9%; 19 = the ±1 RGB raster-noise class,
  two identical takes producing two different noise patterns, zero
  visual difference, the session-40 acceptable-mover precedent) +
  **1 NEW** (32-mentalhealth-form-interior, pixel-verified: the emerald
  chips, the gray-200 track, the gradient tile, the zinc Add, the
  native blue thumb). TWO capture-procedure finds cured mid-WP: the
  canonical bogus route (/wh19-no-such-route — the 404's span
  interpolates the pathname) and the capture-24 row body (the e2e (a)
  leg's exact cardio/30/moderate form); the 25 ring needs Tab ×2. The
  md5 ledger re-based at **32 files**.
- **WP-6/WP-7** — the worklog WH-26 entry, this record,
  docs/session_49.md, the commit, the SSH-wrapper push
  (--key-file + --remote git@github.com:nordeim/wellness-hub.git, main
  only) with the key shredded after.

**Suggested next (for WH-27):** (a) the login family's computed-interior
e2e leg (the five views' geometry now verified by probe — a standing pin
would catch the NEXT redeployment's drift the same day); (b) the sr tags
chip text format (the `#` prefix question — our sr chips render `#tag`,
the reference's mood chips carry no prefix; the sr chip never rendered in
the probes because its textContent includes the trailing × — a one-read
verification when the reference's account carries a resource); (c) the
mood list interior (the reference demo account carries zero mood entries
— the "Your Journey" rows' interior geometry remains unwalked until the
reference account has data); (d) the reference's rating-click state (the
☆→★ fill was ambiguous in the probes — our interactive superset ships;
re-verify on the next redeployment watch).
