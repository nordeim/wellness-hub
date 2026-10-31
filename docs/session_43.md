# Session 43 — WH-23, the dashboard + card-family geometry round

2026-10-31. Remote main at `8d4b0d7` (WH-22 shipped at `db79bf4` + the
user's session-log push adding `docs/session_42.md` — the WH-22
transcript). This prompt (referencing session_41 + the session22 plan +
the worklog + session_42) drives **WH-23**.

---

## The log

The workspace was intact at the WH-22 ship state — `git pull` brought
the one new commit (the session-log push). Reading the five docs +
session_41 + the session22 plan + the worklog + session_42, validated
against the tree. WH-22's "Suggested next" names this round: **the
dashboard quick-action hover family (one surface read resting only) +
the scroll-capped modal's keyboard walk**.

**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 342/342 (24 suites) ·
build OK · smoke 14/14 · e2e 60/60 · census MATCH (the db re-pushed +
re-seeded; the environment otherwise intact from the WH-22 round).

Now the live reference probe. Logged in — the compiled-CSS watch
**round 11**: the asset hash **UNCHANGED** (`index-heGLHP2e.css`) — no
redeployment, every WH-15..WH-22 parity map still governing. The seed
watch **round 12: 23/23 byte-for-byte** (the template names +
tutorial titles text-searched against the seed's actual list). The
preset hygiene clean. The drawer battery at 390×844: 11 items + Close
on the 288px sheet, body locked, **the stays-open-after-nav quirk
re-verified with a REAL link click** (both panels still open + body
still locked on /Exercise — an earlier synthetic-dispatch close was the
probe artifact, not the behavior), escape-close, body unlocked.

Now the round's target — the Quick Actions. The reference's dashboard
walked: the section's card is the shadcn CardHeader/CardContent anatomy
(`flex flex-col space-y-1.5 p-6` + the title
`font-semibold leading-none tracking-tight flex items-center gap-2`
with the plus icon INSIDE) + the body `p-6 pt-0` + the grid **`grid
grid-cols-2 gap-3`** — a 12px gap, **no dividers** (ours shipped border
dividers through twenty-three rounds). The cells: unclassed `<a href>`
wrapping a `<button>` carrying the stock shadcn base + `px-4 py-2
w-full h-24` + per-module gradient arms (`from-orange-500 to-red-500
bg-opacity-5 hover:bg-opacity-10` — **computed TRANSPARENT at rest and
hover, verified**: the v3-era forms compose with nothing). The hover
family read with a REAL pointer + settled: **the icon SCALES to
matrix(1.1)** (`group-hover:scale-110 transition-transform`) **+ the
label lightens** rgb(10,10,10)→rgb(23,23,23) — **NO background wash,
NO icon color change** (the icon stays text-gray-700, stroke 2). Ours
shipped `hover:bg-line-soft` + `group-hover:text-primary` — a
completely different interaction family.

The walk widened (the lesson-26 method — one surface's dedicated read
opens its family): every list card on the dashboard + all nine module
pages carries the same CardHeader/CardContent anatomy ours deviated
from (px-5 py-4 + border-b + a text-muted icon sibling + p-5 body).
Per-card icon presence decoded: Exercise/MentalHealth/Events ship the
BARE title; the Dashboard ×4 + Reminders + Goals carry theirs (and two
of ours were the wrong glyph: BarChart3→bell, CalendarPlus→calendar,
Award→trophy, BellRing→clock). The stat tiles: the wash + the
hover:shadow-xl arms were already parity — but the geometry never
walked (the `relative p-6` content wrapper, the justify-between icon
row, the mb-1 rhythm, the w-6 h-6 default-stroke icons). The module
KPI tiles on five pages: **BIG `w-12 h-12` module-tinted right icons
ours never shipped at all** (dumbbell/clock/flame, heart/trending-up/
smile, clock/circle-check/circle-alert, clock/circle-alert/check,
sparkles/target/award — each in its module's tint). The empty states:
**BARE centered paragraphs** (`text-center text-gray-500 py-12`, the
dashboard's py-8 form, the StudyResources special big-icon card) —
ours shipped a 48px icon chip. The Recent Activity item: a **2xl
EMOJI row** (`<span class="text-2xl">💚</span>` + "Mood check-in" +
the mood VALUE as its own detail + the "Oct 29" short date). And the
zero-row forms: **the reference OMITS the Assignments + Routines list
sections entirely at zero rows** (its /Assignments ends after the KPI
row; its /Routines shows only the templates), and its events page's
empty body is the bare empty list — no message.

The Schedule modal's keyboard walk (the second target): the reference
decoded — the initial focus = the date input, the Tab order
fields → primary → corner X (the trap), **the below-fold primary
SCROLLS INTO VIEW when focused** (scrollTop 0→82), Escape + unlock.
Both apps walk Chromium's SEGMENTED date/time inputs natively (Tab
cycles the month/day/year segments before leaving the field).

Writing the plan
(docs/plans/2026-10-31-session23-remediation-plan.md).

**WP-1 RED** — the card-geometry census (the QUICK_ACTIONS/MODULE_KPI/
SECTION_CARD/STAT_CARD members + the five pages' icons + the per-page
parity + the retirements): **RED at the missing record.** The
empty-form + omission census: **RED at all 16 causes.** The prop-pin
flip (EmptyState's icon retired). The two e2e retargets + the new (g)
keyboard-walk leg. The CANONICAL flips 342→344/60→61. The full unit
RED at exactly the 9 expected causes.

**WP-2 GREEN** — the four records + the two components (the SectionCard
icon optional + inside the title row; the EmptyState a bare paragraph)
+ the eight page conversions + the dashboard + the API mood title/detail
split + the two omissions + the events bare list. THREE mid-WP finds:
the census's component checks matched only the SIGNATURE (the
body-slice form now); the (g) leg's fixed 3-tab walk broke on the
segmented date inputs (the leg now walks up to 12 and asserts the
primary + X are REACHED); and the batched reference login settled the
three deferred facts — **the mood vocabulary is byte-identical to ours**
(five tiles 😄😊😐😔😢, the same grid — a false 4-tile first read
cured by a grid-children census; the feed's 💚 is therefore a FIXED
per-kind glyph), **the events empty body is the bare empty list**, and
**the reference's QA icon computes 16px** (its `[&_svg]:size-4` WINS
over the svg's own w-6 h-6 — the arm restored to our cell string).
**LIVE-VERIFIED at the reference's computed values**: the QA structure,
**the hover family byte-parity with a real pointer** (the transparent
bg, the label 10→23, the icon gray-700 at scale 1.1, the revert), the
stat tile geometry, the module KPI row, the list-card header + the
bare-p empty, the omission. The gradient-ink family widened with the
KPI hero labels (2.45/2.19/2.07/1.79 — all reference-shared
AA failures, pinned not cured).

**WP-3** — 344/61 at every site, the §8.1 rows, the §11 ledger (the
card-geometry retirement + the family row widened), AGENTS's card-family
fact, SKILL v1.21.0 + **lesson 27** ("an identity probe reads COLOR; the
GEOMETRY needs its own walk — read the COMPUTED size never the class
string, and read the hover families with a real pointer"). **Full unit
suite GREEN: 344/344 (24 suites).**

**WP-4 — the gate**: lint 0/0 · tsc 0 · **344/344** · build OK · smoke
14/14 · **e2e 61/61** (the (g) leg green — our dialog conformed; the
retargeted CRUD legs green).

**WP-5 — the captures**: the 28-file set re-taken — **9 byte-stable +
19 movers, all root-caused as this round's own cures** (the card
geometry, the empty forms, the omissions, the cured pixels behind the
drawer/forms/scrim). One capture-order lesson: the 24-row's API
residue leaked into the first 29 take's Recent Activity feed — the
cleanup now runs BEFORE the new capture. The NEW
**29-quick-actions-hover** pixel-verified: the label ink
rgb(10,10,10)→rgb(23,23,23) (exactly the reference's computed values),
the icon zone 44→59 gray-700 px (the 1.1 scale), the cell bg pure white
through the hover. The ledger re-based at 29 files.

**WP-6/WP-7** — the worklog entry, the plan's execution record, this
transcript, the commit, the SSH-wrapper push.

---

## The delivery summary

**The round's core find:** the WH-15 identity probe mapped every card
family by its COLORS — and twenty-three rounds of green gates trusted
the map. The geometry was never read: the Quick Actions grid ships
12px gaps (not our dividers) with fixed h-24 cells whose hover is an
icon scale + a label lighten (never our bg wash + indigo icon); the
reference's `[&_svg]:size-4` wins its own cascade (the icon computes
16px — a specificity question only a computed read answers); every
list card rides the CardHeader/CardContent anatomy; the module KPI
tiles carry big tinted right icons ours never shipped; the empty
states are bare paragraphs; the Recent Activity is an emoji feed; and
two pages OMIT their list sections at zero rows. All cured behind the
QUICK_ACTIONS + MODULE_KPI records + the SECTION_CARD/STAT_CARD/
EMPTY_STATE re-memberings + the censuses + the retargeted legs — with
the mood vocabulary verified byte-identical (the feed's 💚 is a fixed
per-kind glyph, not a vocabulary deviation).

**Gate:** lint 0/0 · tsc 0 · **344/344 (24 suites)** · build OK · smoke
14/14 · **e2e 61/61** · census MATCH.

**Suggested next (WH-24):** the Learning tutorial cards' own geometry
pass (the one card family this round did not walk), the Events calendar
card's anatomy (the justify-between header + the day cells — never
field-probed), the 2.4.13 AAA ring decision (the ledger row governs),
and a functional-superset round if the reference redeploys (the CSS-hash
watch continues — round 11 today).
