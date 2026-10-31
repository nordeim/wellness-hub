# Session-22 Remediation Plan — the Schedule-modal content round (WH-22)

**Task ID:** WH-22 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** re-probe the live reference (the standing watches), then close
the one surface WH-21's own ledger pointed at — **the Routines "Schedule"
modal's CONTENT**: the only modal whose field-by-field anatomy was never
probed (every prior round opened it to verify its MODALITY, never its
fields). Plus the standing environmental/SEO/menu verifications.

> **Reference probe (all watches clean, zero probe-hygiene events):** the
> compiled-CSS watch **round 10** — the asset hash UNCHANGED
> (`assets/index-heGLHP2e.css`): no redeployment, so every WH-15..WH-21
> parity map still governs. The seed watch **round 11: 23/23
> byte-for-byte** (11 template names + 12 tutorial titles — the first probe
> pass used a faulty expected-list and false-alarmed; re-probed against the
> seed's actual names, all 23 match). The 12 href-less Watch-Now
> placeholders hold. The drawer battery at 390×844: opens with 11 items +
> Close (the 288px w-72 left sheet), the stays-open-after-nav quirk HOLDS
> (288px visible on /Exercise post-nav), escape-closes, body unlocked. The
> preset hygiene clean (no `style` residue on `<html>`). The reference's
> z-100 toast-viewport click-interception fired once during the battery
> (its documented defect — the synthetic-click convention).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on a fresh
clone at `2212072` — WH-21 shipped at `4ae3f65` + the session-log push,
environment rebuilt: `.env` written with the relative
`DATABASE_URL="file:../db/custom.db"`, `bun install`, `db:push`, `db:seed`,
Playwright chromium reinstalled [the sandbox cache reset to 1200 again; the
suite's 1.64 wants 1248]):** lint 0/0 · tsc 0 · unit **340/340 (24
suites)** · `bun run build` OK · smoke **14/14** · e2e **60/60** (incl. the
6-check mobile drawer battery — the mobile-menu verification) · db census
MATCH — the exact documented WH-21 ship state, no flake.

**The round's audit class — the Schedule modal's CONTENT (WH-21's own
"suggested next": "the one modal surface whose CONTENT was never probed
field-by-field").** The method: open the reference's "Use This Template"
flow on TWO templates of different categories (the module-vs-category
question), walk every member's computed style + DOM (title, description,
the Remember block, the steps list, the fields, the footer, the primary's
face), and read the full nesting (the wrapper children, the field-group
structure).

Findings (by severity) — the WH-22 ledger. **Every member of the modal's
CONTENT deviates; the modality itself is parity** (a real modal on both
apps — the WH-21 probe already confirmed the fixed overlay + 50%/50%
panel):

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | The dialog's width: ours `max-w-lg` (512px) vs the reference's **672px (`max-w-2xl`)**, padding 24px, gap 16px — the probed geometry | `routines-page.tsx` (DialogContent) | `className="max-w-2xl"` |
| F-2 | **MEDIUM** | The description + Remember block: ours a `DialogDescription` in the header + a bare amber callout (`bg-amber-50 text-amber-800`) in the flow; the reference's = **a purple→pink gradient-50 TILE** (`bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg`) carrying the description (`text-sm text-gray-700 mb-3`) with the Remember block NESTED inside as a `bg-white/80 p-3 rounded-lg` inset (the ink inherited near-black — rgb(10,10,10)) | `routines-page.tsx` (the header + the tips block) | the DialogDescription retires; the tile + the nested remember inset (our dark superset pairs on both) |
| F-3 | **MEDIUM (the theming-model class again)** | The steps list: ours a bare `space-y-3` list with `bg-primary/10 text-primary` number circles (**the preset-themeable model** — the mood-pill class from WH-21) and the duration inline `({duration})`; the reference's = `p.font-semibold.mb-3` "Routine Steps:" + `ol.space-y-2` of **per-step gray-50 tiles** (`flex items-start gap-3 p-3 bg-gray-50 rounded-lg`), the number a **solid purple-500 circle with white ink** (`flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-semibold` — FIXED module pair, verified on 2 different-category templates), the title/duration/description as THREE separate `<p>`s (`font-medium text-sm` / `text-xs text-gray-600` / `text-xs text-gray-500 mt-1`) | `routines-page.tsx` (the steps block) | the SCHEDULE_MODAL record's step members + our dark superset twins on the tile/inks |
| F-4 | **LOW** | The fields wrapper: ours `DIALOG_GROUP.group` (space-y-2 groups inside a space-y-4); the reference's = a **`grid gap-4`** of bare label+input groups (the inputs' `mt-2` spacing — which ours already carry) | `routines-page.tsx` (the fields block) | `grid gap-4` + bare groups |
| F-5 | **MEDIUM** | The footer: ours a **Cancel + primary pair** (`DialogFooter` flex-col-reverse sm:justify-end); the reference's = **the primary ALONE, `w-full`** (no Cancel — the corner X is the dismiss; the button sits as the LAST child of the content wrapper) | `routines-page.tsx` (the footer) | the Cancel button + the DialogFooter retire; the primary becomes w-full in the flow |
| F-6 | **MEDIUM** | The primary's face: ours `GradientButton` with NO gradient prop → **defaults to the BRAND indigo→purple pair**; the reference's = the stock shadcn button base + `shadow h-9 px-4 py-2 w-full` + **the routines MODULE pair** `bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white` (module-fixed: verified — the morning template AND the evening template both render purple→pink; the pair matches the routines H1's purple/pink family, NOT the template category's gradient) | `routines-page.tsx` (the submit) | `PAGE_THEMES.routines.button` gains the module pair (the map's canonical home — the slot has been empty since WH-15) and the modal's primary composes it (the self-contained string, the WH-21 lesson-25 form: the w-full + shadow anatomy never fit GRADIENT_BUTTON's auto-width form) |
| F-7 | **LOW (the ledger gap — reference-shared)** | The step circle's white ink on solid purple-500 computes **3.96:1** at text-xs (12px semibold — not large text) — an AA failure for the number, byte-identical to the reference's own circle → per the parity doctrine (the gradient-ink family precedent): mirrored, documented in the PAD §11 family row, pinned — NOT cured | the SCHEDULE_MODAL.stepNum | the gradient-ink suite's third check (the circle pinned AT the reference's own 3.96) + the ledger row widened |

**The positive findings (the round's clean classes — verified, not
assumed):** the labels are the stock shadcn Label (byte-identical to
ours); the three field labels' text matches byte-for-byte ("When? (Date)"
/ "What time? (Optional)" / "Personal Notes (Optional)"); the date input
defaults to today on both apps; the time + notes textarea match; the
corner X (DialogClose) exists on both; the title form "Schedule: <name>"
matches; the success toast + "1 scheduled" flow matches (the e2e leg
already pins it); the mobile drawer battery green on BOTH apps (the
reference's 11-item sheet + the stays-open quirk re-verified live; our
6-check e2e battery green in the baseline); the SEO surface green
(sitemap.xml + robots.txt + manifest.json as byte-verified explicit route
handlers — re-read this session); the Tailwind v4 pin set intact (the six
pins, no new v4 issues — the round's only v4-adjacent fact is WH-21's
scale-property lesson, already documented).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 24 | **24** | — (the checks land in existing suites) |
| Unit checks | 340 | **342** | +1 schedule-modal census (src-census) · +1 step-circle pin (gradient-ink) |
| E2E checks | 60 | **60** | the routines CRUD leg EXTENDED in place (the modal's geometry + face assertions — no new test) |
| §8.1 infra row | 12 files / 141 | **12 / 143** | the two new checks land in existing files |
| Captures | 27 | **28** | +28-routines-schedule-modal (the round's surface, the modal OPEN) |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 340→342) land
with every doc site in the SAME commit.

---

## 3. Work packages

### WP-1 — RED (the pins before the cures)
1. **The schedule-modal census** (`tests/src-census.test.ts`, appended):
   the routines page must (a) ride the SCHEDULE_MODAL record (the probed
   members as substring checks), (b) carry NO Cancel button in the schedule
   dialog, (c) `PAGE_THEMES.routines.button` non-empty (the module pair),
   (d) NO DialogDescription in the schedule header. Expected RED: all four
   causes.
2. **The gradient-ink extension** (`tests/gradient-ink.test.ts`, +1 test):
   the step circle's white-on-purple-500 pinned AT 3.96 (the parity
   doctrine — NOT a ≥4.5 assertion) + the PAD §11 ledger row lockstep (the
   row must name the step circle). Expected RED: the missing circle + the
   row's missing mention.
3. **The e2e extension** (`tests/e2e/wellness-crud.spec.ts`, the routines
   leg in place): after the form opens — the dialog's width 672, no Cancel
   button, the primary's computed background-image carrying the purple +
   pink stops, w-full. Expected RED: the width (512), the Cancel presence,
   the indigo→purple stops.
4. **The CANONICAL flips** (unitChecks 340→342). Full-suite RED run.

### WP-2 — GREEN (the cures)
1. `src/lib/page-layout.ts`: the **SCHEDULE_MODAL** record (the probed
   anatomy + our dark superset twins) + `PAGE_THEMES.routines.button` = the
   module pair.
2. `src/app/(app)/routines/routines-page.tsx`: the modal conversion —
   max-w-2xl, the header title-only, the gradient tile (desc + nested
   remember), the steps (tiles + solid circles + the three-p form), the
   fields grid, the w-full module-pair primary (the Cancel + DialogFooter
   retire).
3. Live verification on the dev server: the width, the tile's computed
   gradient stops, the circle's fill, the button's stops + w-full, the dark
   superset pairs.

### WP-3 — the docs ladder
PAD §11 (the schedule-modal retirement row + the gradient-ink family row
widened with the step circle), PAD §8.1 (the infra row 143), AGENTS (the
form-modality fact's Schedule-modal coda), SKILL v1.19.0 → **v1.20.0**
(§8's WH-22 passage + **lesson 26**), worklog WH-22 (top), the plan's
execution record, `docs/session_41.md`.

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **342/342 (24 suites)** · build OK · smoke 14/14 ·
e2e **60/60** · db census MATCH.

### WP-5 — captures
The 27-file set re-taken (expected: byte-stable — the cures live inside a
CLOSED modal; 03-routines captures the closed state) + **1 NEW**:
28-routines-schedule-modal (the modal OPEN — the gradient tile + the steps
+ the w-full primary). The md5 ledger re-based (28 files). Movers
root-caused before shipping (the day-roll class: the WH-21 captures were
taken 2026-10-31; if this round runs the same day, zero day-roll movers
expected).

### WP-6 — the records
The worklog entry, the plan's execution record, session_41.md.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--remote
git@github.com:nordeim/wellness-hub.git`, main only) → remote verification.

---

## 4. Execution record (filled at ship time)

- **WP-1 RED** — verified live: the schedule-modal census at the missing
  record; the gradient-ink circle pin at the missing circle + the PAD
  row's missing mention; the e2e leg at the Cancel count 1; the CANONICAL
  flip 340→342; PLUS the family-count correction 15→16 discovered at
  GREEN time (the button slot filled at WP-2 grew PAGE_THEMES' non-empty
  buttons by one — the WH-21 family test's own arithmetic caught its
  count; the routines pair 3.53 joined the documented table).
- **WP-2 GREEN** — the SCHEDULE_MODAL record (ten probed members + the
  dark superset twins) + PAGE_THEMES.routines.button (the module pair)
  + the conversion + THE RETIREMENTS (DialogFooter + DialogDescription
  from dialog.tsx, DIALOG_FOOTER from page-layout — routines was their
  last consumer; DIALOG_GROUP dropped from the routines import). TWO
  census bugs of my own cured mid-WP (the Cancel check matched the
  page's own COMMENT — comments now stripped, the WH-13 lesson; the
  button regex missed the template-literal form). LIVE-VERIFIED at the
  reference's computed values: 672px, Cancel 0, the button 622px (the
  content box) at purple→pink `rgb(168,85,247)→rgb(236,72,153)`, the
  circle purple-500 + white, the tile `rgb(250,245,255)→rgb(253,242,248)`,
  the step tile gray-50 radius 8, the description INSIDE the tile; the
  dark superset verified live (neutral-800/60 tiles, the neutral-800
  inset, the flipped ink, the mode-independent circle).
- **WP-4's gate catch — THE SEVENTH DEVIATION (found by the e2e leg's
  click timeout, the gate finding the audit's gap)**: the primary sat
  below the fold — our DialogContent ships no scroll cap while the
  reference's carries **`max-h-[90vh] overflow-y-auto`** (probed:
  maxHeight 519px = 90% of its 577px viewport, overflowY auto — the
  tall content scrolls INSIDE the dialog). Cured with
  `className="max-w-2xl max-h-[90vh] overflow-y-auto"` (the exact form
  our retired DIALOG_WIDE carried) + the census member. TWO e2e-leg
  calibration finds cured in the same stroke (both the settle doctrine's
  new instances): the zoom-in-95 animate-in interpolates the transform
  scale — a geometry read mid-animation returns 665–671 (settle ≥400 ms
  before reading); and the w-full assertion's arithmetic is the CONTENT
  box (672 − 2×24px padding − 2×1px border = 622), not the border box.
- **WP-3 the docs ladder** — 342 at every site, §8.1 infra 12/143 + the
  crud row's WH-22 note, §11 (the schedule-modal retirement row + the
  family row widened with the routines pair 3.53 + the step circle
  3.96), AGENTS's form-modality coda, SKILL v1.20.0 + lesson 26.
- **WP-4** — lint 0/0 · tsc 0 · **342/342 (24 suites)** · build OK ·
  smoke 14/14 · e2e **60/60** · census MATCH.
- **WP-5** — **27/27 byte-stable** (zero movers — same-day captures, and
  the cures live inside a CLOSED modal so 03-routines is unchanged) +
  the NEW 28-routines-schedule-modal (the modal open: the gradient tile
  at 7,078 purple-50 + 7,656 pink-50 px, the step circles at 278
  purple-500 px; the primary sits below the in-dialog scroll fold
  exactly as the reference's own does — its computed face is pinned by
  the e2e leg). The ledger re-based at 28 files. The account left clean
  (light / #6366f1 / rows 0 verified).
- **WP-6/WP-7** — the worklog entry, this record, session_41.md, the
  commit, the SSH-wrapper push.

**Suggested next (for WH-23):** (a) the reference's OTHER never-probed
surface — its dashboard's quick-action tiles' hover states (the
group-hover family, one surface read resting only), (b) the WCAG 2.4.13
AAA ring decision (still deferred, the ledger row governs), (c) a
functional-superset round if the reference redeploys (the CSS-hash watch
continues — round 10 today), (d) the in-dialog scroll surfaces' a11y walk
(the scroll-capped modal family: keyboard focus traversal through the
scrollable content — the net never walked a scrolled dialog).
