# Session 45 — WH-24, the sibling-card families + module-toolbar round

2026-10-31. Remote main at `fa23d20` (WH-23 shipped at `dcd239a` + the
user's session-log push adding `docs/session_44.md` — the WH-23
transcript). This prompt (referencing session_43 + the session23 plan +
the worklog + session_44) drives **WH-24**.

---

## The log

The workspace was intact at the WH-23 ship state — `git pull` brought
the one new commit (the session-log push). Reading the five docs +
session_43 + the session23 plan + the worklog + session_44, validated
against the tree. WH-23's "Suggested next" names this round: **the
Learning tutorial cards' own geometry pass (the one card family WH-23
did not walk) + the Events calendar card's anatomy (never
field-probed) + the 2.4.13 AAA ring decision (the ledger row governs)
+ the CSS-hash watch**.

**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 344/344 (24 suites) ·
build OK · smoke 14/14 · e2e 61/61 · census MATCH (the environment
intact from the WH-23 round; no re-seed needed).

The skills audit (web-application-engineering + the catalog): the
parity-pin doctrine (computed-style/geometry assertions, not class
lists) governs the round's every check.

Now the live reference probe — **12 passes, 15 logins, zero writes,
zero probe-hygiene events**. The compiled-CSS watch **round 12:
UNCHANGED** (`index-heGLHP2e.css`) — no redeployment, every
WH-15..WH-23 parity map still governing. The seed watch **round 13:
23/23 byte-for-byte** (innerText-searched). The preset hygiene clean.
The drawer battery at 390×844: the 288px sheet with 11 links, body
locked, the stays-open quirk on a REAL link click, escape + unlock.

The round's targets, walked field-by-field (computed styles + DOM +
the full HTML; the hover families with a REAL pointer, settled):

**F-1, the Learning tutorial cards** — the reference is a
**GROUP-HOVER REVEAL family**: the card is the `group`, the cover's img
carries `group-hover:scale-105 transition-transform duration-300`, the
scrim is `bg-black/0` going 20% black on hover, and the Watch Now
button is the stock-base **rounded-md RECTANGLE** at `opacity-0 →
group-hover:opacity-100` — ours shipped a permanent black/30 scrim +
an always-visible rounded-full pill (the resting card never matched).
The body rides the CardHeader/CardContent split (`flex flex-col
space-y-1.5 p-6` holding the title row `flex items-start justify-between
gap-2 mb-2` + the chips row `flex flex-wrap gap-2`; `p-6 pt-0` holding
`text-sm text-gray-600 line-clamp-3`), the title is `font-semibold
tracking-tight text-lg line-clamp-2` (18px, clamped), and the grid is
`md:grid-cols-2 lg:grid-cols-3 gap-6`.

**F-2, the Events calendar card** — the one card that escaped the
WH-23 cure (it never rides the SectionCard component; its header was
hand-built at the pre-WH-23 `px-5 py-4`). The reference: the
CardHeader/CardContent forms, the title classes ON the justify-between
row (the month text a bare span), the nav `flex gap-2` of the stock
OUTLINE trio with **TEXT arrows ←/→** (computed: the border
rgb(229,229,229), the bg white, the hovered wash rgb(245,245,245) =
our line-soft, the hovered label rgb(23,23,23)), the bare `grid
grid-cols-7 gap-2` inside `p-6 pt-0`, the day numbers `mb-1`, the
events container `space-y-1`. The day cells' borders + hover + the
today gradient: ALREADY parity (re-verified with a real pointer).

**The siblings the walk opened onto** (the lesson-26/27 method):
**F-3** the module toolbars (Learning + StudyResources, probed at 1280
AND 390): the reference rides the STOCK Input + `pl-10` (the Search
icon `h-5 w-5 text-gray-400`), the selects in a **Filter-icon `flex
items-center gap-2` wrapper** at FIXED w-48/w-40, the container `flex
flex-col md:flex-row gap-4` — ours shipped hand-rolled `py-2 text-sm
shadow-xs pl-9` strings + `w-full sm:w-*` breakpoints. **F-4** the
shared OptionChip lacked the stock Badge arms (`transition-colors
focus:ring-2 … shadow hover:bg-primary/80` — the chip MAP + the
lowercase raw-value TEXT were already parity, re-verified). **F-5**
the routines template cards: the reference renders **NO thumbnail and
NO Watch Video anywhere** (imgCount 0 — its own data carries the
fields its UI omits; ours rendered them for 6 of 11 seeded cards),
the meta rows clock/calendar at `w-4 h-4` (ours: Clock/Sun at
h-3.5), the Benefits rows `items-start gap-1` with the **✓ text
glyph** (ours: CheckCircle2), the grid `md:grid-cols-2 lg:grid-cols-3
gap-6`, the "Browse Templates" heading `text-2xl font-bold text-gray-900
mb-4` + the 16px `text-gray-600 mb-6` subtitle, and the button
`w-full mt-auto` ALONE in the category pair + `hover:opacity-90` +
ArrowRight + `shadow`.

**The map question — probed BOTH consumers before changing the shared
record**: the ROUTINE_CATEGORY_GRADIENTS map's `hover:from-600/to-600`
arms belong to the MODULE primaries (probed live on New Event +
Log Workout: both carry them + shadow-lg), NOT to the template button
(the reference runs two button families side by side). The map went
BARE; the PAGE_THEMES buttons keep their arms — an over-broad first
sweep almost flattened them, caught by diffing and restored.

**The textarea family** — the SR false-positive exposed it, then the
family probe settled it (every form the reference renders: events +
studyresources + exercise + assignments + mentalhealth ×2 + the
Schedule modal — all eight byte-identical `flex min-h-[60px] w-full
rounded-md border border-input bg-transparent px-3 py-2 text-base
shadow-sm … md:text-sm`): ours shipped `min-h-16/min-h-20` (64/80px) +
text-sm-only + shadow-xs hand-rolled strings on all ten call sites.
The TEXTAREA_FIELD record + the ten conversions.

**F-6, the 2.4.13 decision WRITTEN DOWN**: NOT ADOPTING — the claimed
conformance is WCAG 2.1+2.2 A+AA; 2.4.13 Focus Appearance is Level
AAA; the 1px ring family passes 1.4.11 non-text contrast in both modes
(11.99–19.8:1) and the 2px surfaces already exceed its geometry
metrics. Revisit only if the conformance claim moves to AAA. The PAD
§11 row now carries the decision, not the deferral.

Writing the plan
(docs/plans/2026-10-31-session24-remediation-plan.md), validated
against the tree, then executed.

**WP-1 RED** — the card-family geometry census (the TUTORIAL_CARD +
CALENDAR records + both pages' consumption): **RED at the missing
record.** The module-toolbar + chip-form census: **RED at the missing
TOOLBAR record.** The routines template-card census: **RED at 12
causes.** The CANONICAL flips 344→347/61→63. The full unit RED at
exactly the 9 expected causes.

**WP-2 GREEN** — the four records + the OptionChip re-arm + the five
page conversions. FIVE mid-WP finds cured in the same stroke: the
textarea family (the false positive that found a real deviation), the
(h) leg's overlay locator (the img's SIBLING, not the parent's), the
oklab alpha form (`bg-black/0` computes `oklab(0 0 0 / 0)` in v4 —
the assertions pin the oklab strings), the map's two-family question,
and the watchBtn's explicit dark twin (the mode-independent white
face). **LIVE-VERIFIED at the reference's computed values**: the
resting card (opacity 0, the scrim transparent, the scale none) + the
hovered reveal (opacity 1, oklab(0 0 0 / 0.2), scale 1.05), the
toolbar (paddingLeft 40px, the trigger 192px, the funnel icon), the
calendar (the hovered Today rgb(245,245,245)/rgb(23,23,23) EXACTLY
the reference's computed), the textarea 60px/14px, the template card
(imgCount 0, the button 256px, the 24px/700 heading), the mobile 390
(the search 16px, one column).

**WP-3** — 347/63 at every site; the §8.1 rows (infra 148, a11y 19);
§11 (the sibling-families retirement + the 2.4.13 DECISION); AGENTS
(the card-family fact's WH-24 widening + the a11y bullet); SKILL
v1.22.0 + **lesson 28** ("parity is a property of the RENDERED FACE,
not the data — a branch the reference never renders is a deviation
however truthful its condition; when a walk opens a family, walk the
whole family in the same visit; and when a shared record's arms
differ between surfaces, probe BOTH consumers before changing the
record"). **Full unit suite GREEN: 347/347 (24 suites).**

**WP-4 — the gate**: lint 0/0 · tsc 0 · **347/347** · build OK · smoke
14/14 · **e2e 63/63** (the new (h) hover-reveal + (i) calendar-anatomy
legs green; axe passes the opacity-0 button on the /Learning walk).

**WP-5 — the captures**: the 29-file set re-taken — **19 byte-stable +
10 movers, all root-caused**: nine this round's own cures (the
template cards, the calendar, the toolbar, the learning cards, the row
chips, the textareas behind the open forms) and **11-goals — the
badge-residue CORRECTION**: the WH-23 ledger's first badge tile
carried the EARNED state (bg-primary/5 = rgb(247,247,254) — the
residue of their capture-24 workout's "First Step" badge, their own
capture-order lesson), which the cleanly-seeded db renders UNEARNED
(bg-line-soft/40 = rgb(251,251,251)) — an environmental artifact
corrected, not a code change. The NEW **30-tutorial-card-hover**
pixel-verified: 9,743 darkened pixels (the 20% scrim) + 1,139
new-white pixels (the revealed button). The ledger re-based at 30
files.

**WP-6/WP-7** — the worklog entry, the plan's execution record, this
transcript, the commit, the SSH-wrapper push.

---

## The delivery summary

**The round's core find:** the declared targets (the tutorial cards +
the calendar card) opened onto the wider sibling class — ONE FAMILY'S
WALK OPENS ITS SIBLINGS, AND PARITY IS A PROPERTY OF THE RENDERED
FACE, NOT THE DATA. The tutorial cards are a group-hover reveal family
(never our permanent scrim + always-visible pill); the calendar card
escaped the WH-23 cure through a hand-built header; the module
toolbars, the chip's Badge arms, the textareas (all ten, all deviating
the same way) and the template cards' phantom thumbnail face all
deviated in the same visit's probes — and the shared-record question
(the gradient map's hover arms) was settled by probing BOTH consumers:
the reference runs two button families side by side. Plus the 2.4.13
AAA decision written down (not adopting — out of the claimed A+AA
conformance).

**Gate:** lint 0/0 · tsc 0 · **347/347 (24 suites)** · build OK · smoke
14/14 · **e2e 63/63** · census MATCH.

**Suggested next (WH-25):** the reference-redeployment round if the
CSS-hash watch moves (round 12 today); the Profile tab panels' interior
geometry (the colors + dark pairs walked, the field-by-field geometry
never); the capture-state doctrine codification (re-seed or assert
badges=0 BEFORE the light set — the 11-goals mover's lesson); and the
axe-watch note on the opacity-0 button (green today, the
documented-ignore-entry doctrine if a future axe version disagrees).
