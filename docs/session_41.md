# Session 41 — WH-22, the Schedule-modal content round

2026-10-31. Remote main at `2212072` (WH-21 shipped at `4ae3f65` + the
user's session-log push adding `docs/session_40.md` — the rebuilt WH-21
round's transcript). This prompt (referencing session_39 + the session21
plan + the worklog + session_40) drives **WH-22**.

---

## The log

The workspace was reset — re-cloned fresh. Remote main at `2212072`.
session_40 is my own WH-21 rebuild's transcript. The environment rebuilt:
`.env` (AUTH_SECRET via openssl, the relative `DATABASE_URL`), `bun
install`, `db:push`, `db:seed`, the Playwright browser reinstalled (the
sandbox cache reset to 1200 again; the suite's 1.64 wants 1248). Reading
the five docs + session_39 + the session21 plan + the worklog +
session_40, validated against the tree. WH-21's "Suggested next" names
this round: **the Routines Schedule modal's field-by-field parity read —
the one modal surface whose CONTENT was never probed**.

**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 340/340 (24 suites) ·
build OK · smoke 14/14 · e2e 60/60 (incl. the 6-check mobile drawer
battery — the mobile-menu verification) · census MATCH.

Now the live reference probe. Logged in. The compiled-CSS watch **round
10**:

CSS hash **UNCHANGED** (`index-heGLHP2e.css`) — no redeployment. Now the
seed watch round 11 — the tutorial titles on /Learning:

3/12?! — a FALSE ALARM: my expected-list was faulty (titles I invented,
not the seed's). Re-probing against the seed's actual names — the
reference's page carries all 12 byte-for-byte. The template names next:
11/11 with OUR seed's names. **Seed watch round 11: 23/23.** The drawer
battery at 390×844 (the trigger click intercepted once by the reference's
z-100 toast viewport — its documented defect, the synthetic-click
convention):

The drawer opens with 11 items + Close on the 288px w-72 sheet; the
stays-open-after-nav quirk HOLDS; escape-closes; body unlocked. The
preset hygiene clean (no style residue). **REFERENCE PROBE COMPLETE —
every watch clean.**

Now the round's target — the Schedule modal's CONTENT. Opening the
reference's "Use This Template" on the FIRST template (morning category)
and walking every member:

The reference's modal decoded: 672px wide, the title "Schedule: <name>",
three labels ("When? (Date)" / "What time? (Optional)" / "Personal Notes
(Optional)"), a date input defaulting to today, a time input, a notes
textarea, the primary "Schedule This Routine", and a "Close" (the corner
X). The inner text walk: a "💪 Remember:" block, a "Routine Steps:" list
with numbered steps, each step a title + duration + description.

The primary's face — the stock shadcn base + `shadow h-9 px-4 py-2
w-full` + **`bg-gradient-to-r from-purple-500 to-pink-500
hover:from-purple-600 hover:to-pink-600 text-white`** — purple→pink. Is
that the module family or the template category's? Opening the FOURTH
template (an evening-category one — its category gradient is
indigo/purple):

**Module-fixed confirmed** — the evening template renders the same
purple→pink button and the same solid purple-500 number circles. The
module family, never the category gradient. Now the steps' inner DOM (the
text walk finds "Drink a glass of water"):

The step row: `flex items-start gap-3 p-3 bg-gray-50 rounded-lg` — a
**gray-50 tile** per step, the number a **solid purple-500 circle**
(`flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs
flex items-center justify-center font-semibold`), and the text block
THREE separate `<p>`s: `font-medium text-sm` (title), `text-xs
text-gray-600` (duration), `text-xs text-gray-500 mt-1` (description).
The Remember block: `bg-white/80 p-3 rounded-lg`, the ink inherited
near-black — NOT our amber callout. And the wrapper structure: the
button's parent is a `space-y-6` with FOUR children:

The full nesting decoded — and one more find: child 1 is a
**purple→pink gradient-50 TILE** (`bg-gradient-to-r from-purple-50
to-pink-50 p-4 rounded-lg`) carrying the DESCRIPTION (`text-sm
text-gray-700 mb-3`) with the Remember block NESTED inside it. The
description does NOT live in a DialogDescription — the header is
title-only. The steps section (`p.font-semibold.mb-3` label + the ol),
the fields in a **`grid gap-4`**, and the button as the LAST child —
**w-full, NO Cancel** (the corner X is the dismiss).

**THE AUDIT COMPLETE — six content deviations** (the width 512 vs 672,
the description tile, the steps' tiles + preset-themeable tint circles,
the fields wrapper, the no-Cancel w-full footer, the brand-vs-module
primary pair) + the step circle's white-on-purple-500 **3.96:1** (an AA
failure byte-identical to the reference's own — the parity doctrine:
documented, pinned, not cured). The positive findings: the labels
byte-identical, the field labels' text exact, the date defaults today on
both, the title form exact, the toast + "1 scheduled" flow pinned.

Back home — reading our routines-page modal: `max-w-lg`, a
DialogDescription, the amber callout, the bare `bg-primary/10` circle
list, DIALOG_GROUP fields, and a Cancel + brand-indigo GradientButton
pair. Every member deviating while the modality was parity. Checking the
retirement surface: routines is the LAST consumer of DialogDescription
AND DialogFooter — the conversion retires both from dialog.tsx +
DIALOG_FOOTER from page-layout (the ui-export + value censuses own it).
The purple/pink v3 pins all exist. GradientButton's className prop
retired at WH-12 — the button rides a self-contained string (the WH-21
lesson-25 form). Writing the plan
(docs/plans/2026-10-31-session22-remediation-plan.md).

**WP-1 RED** — the schedule-modal census (the record's ten probed
members + the w-full module-pair button + the dark twins + NO Cancel +
NO DialogDescription + PAGE_THEMES.routines.button non-empty):
**RED at the missing record.** The gradient-ink circle pin: **RED at
the missing circle + the row's missing mention.** The e2e routines-leg
extension (the 672 width, no Cancel, the purple→pink stops, the solid
circle, the gradient tile): **RED at the Cancel count 1.** The CANONICAL
flip 340→342. The full unit RED: the 2 new tests + the docs-counts
lockstep.

**WP-2 GREEN** — the SCHEDULE_MODAL record (the ten members + our dark
superset twins: the tile neutral-800/60→neutral-900/60, the remember
neutral-800, the inks gray-400) + the button composing
PAGE_THEMES.routines.button (the map's canonical home — the slot empty
since WH-15; the one dropped arm the reference's dead
`hover:bg-primary/90` stock leftover) + the conversion + the
retirements. TWO census bugs of my own cured: the Cancel check matched
my own COMMENT (comments now stripped — the WH-13 lesson), and the
button regex missed the template-literal form. The family-count
correction 15→16 (filling the button slot grew PAGE_THEMES' non-empty
buttons — the WH-21 family test's own arithmetic caught its count; the
routines pair 3.53 joined the table). tsc 0 · lint 0/0. **LIVE-VERIFIED
on the dev server at the reference's computed values**: the dialog
672px, Cancel 0, the button 622px (the content box) at 36px h-9 with
`linear-gradient(rgb(168, 85, 247), rgb(236, 72, 153))`, the circle
`rgb(168, 85, 247)` + white, the tile
`linear-gradient(rgb(250, 245, 255), rgb(253, 242, 248))`, the step tile
`rgb(249, 250, 251)` radius 8, the description INSIDE the tile. The dark
superset verified live (the neutral-800/60 tiles, the neutral-800 inset,
the ink rgb(250,250,250), the circle unchanged). Probe hygiene: the
modal closed, the mode reverted, verified via /api/prefs (light /
#6366f1).

**WP-3** — 342 at every site, the §8.1 rows (infra 12/143, the crud
row's WH-22 note), the §11 rows (the schedule-modal retirement + the
family row widened: the routines pair 3.53 + the step circle 3.96), the
AGENTS coda, SKILL v1.19.0→v1.20.0 + **lesson 26** ("the surface your
probes keep skipping is the one you open to read something else — a
surface that is ALWAYS a means to another end becomes a blind spot no
walk-set enumeration catches, because it IS in the walk set, just never
as the subject; and probe the module-vs-category question explicitly").
**Full unit suite GREEN: 342/342 (24 suites).**

**WP-4 — the gate, and the round's catch.** The first e2e run: 59/60 —
the routines leg failed at the width read **671**. A sub-pixel rounding?
Widening to ±1 — and the next run read **665**. Not rounding: the
dialog's **zoom-in-95 animate-in interpolates the transform scale**
(0.95→1.0 over 200ms) and the bounding rect returns the animated frame —
the WH-20 settle doctrine, dialog-animation edition. Settling ≥400ms
before the geometry read: the width reads 672 ✓ — and the leg then
failed at the button width: **btn 622 vs dialog 672** — which IS w-full
(672 − 2×24px padding − 2×1px border = the content box 622). Fixing the
arithmetic — and the leg then failed at the CLICK:

**THE SEVENTH DEVIATION, found by the gate**: "element is outside of the
viewport" — the primary sat below the fold. Our DialogContent ships no
scroll cap; the reference's carries **`max-h-[90vh] overflow-y-auto`**
(re-probed: maxHeight 519px = 90% of its 577px viewport, overflowY auto
— the tall content scrolls INSIDE the dialog). The exact form our
retired DIALOG_WIDE carried. Cured + the census member added. Rebuilt,
re-run: **e2e 60/60.**

**WP-5 — the captures**: **27/27 byte-stable** (zero movers — same-day
captures, and the cures live inside a CLOSED modal so 03-routines is
unchanged) + the NEW 28-routines-schedule-modal (the modal open: the
gradient tile at 7,078 purple-50 + 7,656 pink-50 px, the step circles at
278 purple-500 px — the primary sits below the in-dialog scroll fold
exactly as the reference's own does; its computed face is pinned by the
e2e leg). The ledger re-based at 28 files. The account left clean.

**WP-6/WP-7** — the worklog entry, the plan's execution record, this
transcript, the commit, the SSH-wrapper push.

---

## The delivery summary

**The round's core find:** the Routines Schedule modal — the reference's
ONE modal — was opened by at least four rounds (WH-15 probed its
overlay, WH-21 its modality, the e2e battery clicks through it every
run) yet its CONTENT was never read field-by-field. Every content member
deviated: the width (512 vs 672), the description (a DialogDescription
vs the reference's gradient-50 TILE with the nested Remember inset), the
steps (a preset-themeable tint-circle list vs gray-50 tiles with solid
module-pair circles), the fields, the footer (a Cancel pair vs the
w-full primary alone), and the primary's face (the brand pair vs the
routines module pair). Cured behind the SCHEDULE_MODAL record + the
schedule-modal census + the extended e2e leg — with DialogFooter,
DialogDescription and DIALOG_FOOTER retiring with their last consumer,
and the seventh deviation (the scroll cap) found by the gate itself when
the primary fell below the fold.

**Gate:** lint 0/0 · tsc 0 · **342/342 (24 suites)** · build OK · smoke
14/14 · **e2e 60/60** · census MATCH.

**Suggested next (WH-23):** the dashboard quick-action hover family (the
group-hover surfaces read resting only), the 2.4.13 AAA decision (the
ledger row governs), a functional-superset round on redeployment (the
CSS-hash watch continues — round 10 today), and the in-dialog scroll
surfaces' keyboard walk (the scroll-capped modal family — the net never
walked a scrolled dialog).
