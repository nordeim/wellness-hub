# Session 39 — WH-21, the form-modality round (the lost-commit rebuild)

2026-10-31. Remote main at `20dbd25` (WH-20 shipped at `0b7a9e2` + the
session-log pushes). This prompt (referencing session_37 + the session20
plan + the worklog + session_38) drives **WH-21**.

**The rebuild context:** the round was executed once before (local commit
`156c733`) but the session was interrupted at the push step — the workspace
reset and the commit was never pushed. This session re-cloned fresh and
re-derived the entire round from a live re-probe; nothing rides on the lost
session's notes (every finding re-verified first-hand on the reference
before the plan was written).

---

## The log

The workspace was gone — re-cloned. Remote main at `20dbd25`, the WH-20
ship state. The environment rebuilt: `.env` written (AUTH_SECRET via
openssl, the relative `DATABASE_URL="file:../db/custom.db"`),
`bun install`, `db:push`, `db:seed`. Reading the five docs + session_37 +
the session20 plan + the worklog + session_38:

The worklog's WH-20 entry gives this round's candidates: the un-walked
interaction families (the `active:`/`data-[state=]`/outline sweep) or a
functional superset if the reference redeployed. Setting up the round —
the Playwright browser binary needed reinstalling (the sandbox cache
mismatch again: the suite's 1.64 wants build 1248):

**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 335/335 (23 suites) ·
build OK · smoke 14/14 · e2e 57/57 · census MATCH. The documented WH-20
ship state, no flake.

Now the live reference probe. Logged in (agent-browser). The compiled-CSS
watch **round 9**:

CSS hash **UNCHANGED** (`index-heGLHP2e.css`) — no redeployment. Every
WH-15..WH-20 parity map still governs. Now the round's foundation
re-probed first-hand — first the Events create-form's DELIVERY:

The reference's "New Event" opens with **ZERO dialog overlays** (its only
fixed layers: the z-100 toast-viewport pair, its documented defect). The
form renders IN-FLOW — walking the title's ancestors: every
`position: static`. Decoding the card anatomy level by level (the title's
own div carries `font-semibold leading-none tracking-tight` at the
inherited 16px = text-base — NOT the dialog's text-lg; the card carries
`rounded-xl border bg-card text-card-foreground border-none shadow-xl`,
top=136, width 960, radius 12, border 0, the shadow-xl stack; the header
`flex flex-col space-y-1.5 p-6`; the content `p-6 pt-0`; the inner
`space-y-4`; the footer `flex justify-end gap-3` as the space-y-4's LAST
child):

**F-2 (the round's giant finding) confirmed live** — the reference's
module create-forms are INLINE EXPANDING CARDS in the page flow, not
dialogs. Ours ship as 512px Radix modal overlays. Now the modality map's
other side — the Routines flow:

The reference's "Use This Template" opens a REAL MODAL (`fixed inset-0
z-50 bg-black/80` + the fixed 50%/50% z-50 672px panel) — the exact shadcn
anatomy our Routines page already mirrors. The split is: inline cards for
the create-forms, modal for the scheduling flow. And the Profile →
Preferences tab: **ZERO checkboxes** (our notification pair is the
functional superset — its dark cure is unconstrained by parity).

Now the mood selector on the reference's MentalHealth form:

The reference's selector decoded: `grid grid-cols-2 md:grid-cols-5 gap-3`
of **block-stacked tiles** — `p-4 rounded-2xl border-2 transition-all`
(173×104 at this viewport, radius 16, display block), emoji `text-4xl
mb-2` (36px), label `text-sm font-medium text-gray-700` (14px), inactive
`border-gray-200 hover:border-gray-300`, and the active tile (found by its
backgroundImage): `bg-gradient-to-br from-blue-500 to-cyan-500 text-white
border-transparent shadow-lg scale-105` — computed
`linear-gradient(to right bottom, rgb(59, 130, 246), rgb(6, 182, 212))`,
white ink, 181×109 = 173×1.05, `transform: matrix(1.05, …)` via ITS
pipeline, no aria-pressed. **The reference probe complete** — zero
probe-hygiene events.

**REFERENCE PROBE COMPLETE — every round-critical fact re-verified live.**
Now the audit on our tree. The static sweep first: the `active:` family is
EMPTY (zero Tailwind active: arms — the suggested-next listed it
speculatively); the `data-[state=]` family beyond tabs is animation-only;
the outline-color family is EMPTY (all outline-none + ring). But the
`data-[state=checked]:` arms on CHECKBOX.control carry **no dark pairs** —
`border-neutral-900` + `data-[state=checked]:bg-neutral-900`: the dark
Preferences wash computes #1a1a1d (surface #18181b + the label row's
bg-line-soft/40) and neutral-900 (#171717) on it ≈ **1.12:1**. Booting the
dev server to verify live:

**F-1 confirmed live**: the checked box in dark fills rgb(23,23,23) on the
wash — invisible; the unchecked box (no glyph) a completely invisible
control. The checkbox restored, the mode reverted, both verified via
/api/prefs. Now the mood pills' values: the active pill
(`border-primary bg-primary/10 text-primary`) computes **3.95:1 light /
3.59:1 dark** at 14px text — AA-failing AND the wrong theming model (the
reference's own active tile is its FIXED blue→cyan pair). And the
fixed-gradient white-ink family, never measured — computing the whole
table from the v3 pins:

The math is decisive: **all 16 pairs fail AA** at the worst stop — goals
1.92 the worst; every pair byte-identical to the reference's own buttons →
per the parity doctrine: documented + pinned, not cured. And the
e2e surface mapped: the CRUD battery's 2 `getByRole("dialog")` locators +
the toast leg ride the modality being cured. **The audit complete.**
Writing the plan (docs/plans/2026-10-31-session21-remediation-plan.md) —
the findings ledger, the count ladder (340/24/60), the seven WPs. Validated
against the tree: every dialog.tsx export keeps a consumer post-conversion
(routines + app-shell + mobile-nav); DIALOG_GROUP keeps its field-group
consumers; and the BUTTON_CLASSES geometry analysis — v4's preflight sets
`svg { display: block }`, so removing `inline-flex` from the SHARED string
would shift every icon button's glyph (the events calendar chevrons among
them): the mood tile must ride a self-contained string.

**WP-1 RED.** The form-modality census appended to src-census:

**RED verified — 14 deterministic failures (2×7), exactly the audit's
inventory.** Now the two interaction-contrast extensions (the F-1 checkbox
pin — the dark arms + the wash arithmetic + the light fill pinned at
17.93; the F-3 tile pin — the seven anatomy substrings): both RED on the
missing arms / the pill form. Now the gradient-ink suite
(tests/gradient-ink.test.ts, NEW — the family table computed from the live
records + the v3 pins, the ALL-FAIL class claim, the PAD §11 ledger
lockstep; the mood tile's pair pinned AT the reference's own 2.43): both
RED on the missing ledger row / the missing gradient. Now the e2e legs —
the 2 CRUD retargets, the /Amazing/ exact clicks, the toast leg retargeted
to the mood form, the afterEach mood cleanup, the +1 CRUD modality leg,
the +2 a11y legs ((e) the dark checkbox walk, (f) the dark mood-tile
walk), the CANONICAL flips 335→340 / 23→24 / 57→60. The full-suite RED:
**11 failures** (the 5 new tests + the docs-counts lockstep on the moved
totals) — **340 checks / 24 suites empirical, the exact planned ladder.**
The e2e RED against the pre-cure build: the modality leg + (e) + (f)
failing; the retargeted legs passing (their locators are
modality-agnostic). One leg bug caught at design time from the lost
session's debugged conclusions: the Preferences tab is a `role=tab` (not a
button), the tile lift rides the `scale` property (not transform), the
row's alpha token computes in **oklab** (the (e) leg's reader converts
page-side).

**WP-2 GREEN.** The FORM_CARD record + the checkbox dark pairs in
page-layout.ts; the 7 page conversions — Events, Exercise, MentalHealth
by hand (the mood-tile cure inside the MentalHealth form: the
self-contained tile string, aria-pressed kept as our semantics superset),
the remaining four via an idempotent script. Two script artifacts caught
by tsc (a double-brace title wrap; an over-greedy sed eating the
ternary's closing brace) and cured immediately. tsc 0 · lint 0/0. The
full unit run: the census + both pins + the tile GREEN — only the
docs-counts + ledger-row failures remain (WP-3). Live-verified on the
dev server at the reference's own computed values:

**The Events inline card: top=136, width 960, radius 12, border 0,
position static, no scroll lock, zero dialog roles — with the
byte-identical shadow-xl stack and the footer `flex justify-end gap-3`.**
The mood tiles: **173×104, the active 181×109 via `scale: 1.05`
(transform none), the exact gradient stops, white ink, the inactive
border rgb(229,231,235) = gray-200.** The dark checkbox: **fill/border
rgb(163,163,163) + glyph rgb(10,10,10); the unchecked border visible.**
Probe hygiene: the checkbox restored + verified, the mode reverted to
Light, the preset read Indigo Dream.

**WP-3 — the docs ladder.** 340/24/60 at every live-tense site across the
five docs; the §8.1 rows (infra 12/141, a11y 16, crud+reset 19); the PAD
§11 rows (the form-modality retirement + the fixed-gradient family
table); the AGENTS form-modality architecture fact + the a11y bullet's
WH-21 widening; the SKILL v1.18.0→v1.19.0 (§2's enumeration, the e2e
narration, §8's WH-21 passage, **lesson 25**: the delivery mechanism is an
assertion surface of its own — probe the MODALITY, not just the content).
**Full unit suite GREEN: 340/340 (24 suites).**

**WP-4 — the full gate.** The dev server killed first (the stale-build
lesson). lint 0/0 · tsc 0 · 340/340 (24 suites) · build OK · smoke 14/14 ·
**e2e 60/60** — all five new legs GREEN on the first post-cure run (the
rebuild designed from the lost session's debugged conclusions) · db census
MATCH (zero probe residue).

**WP-5 — the captures.** The house procedure (Light + Indigo Dream
normalized + verified before any capture fired): **23/25 byte-stable.**
Two movers — root-causing before they ship:

07-events differs in a 166×96 region; 24-dark-exercise-rows in a 7×9
glyph box (54 px). The 24 samples read as a digit glyph swap; the 07
committed samples carry violet tones where the new is plain. Scanning
both versions for violet pixels by grid block:

**Both movers root-caused as THE DAY ROLL**: the violet TODAY cell sits at
grid block (8,7) in the committed capture and (9,7) in the new one — the
calendar's today highlight advanced one column, Oct 30 (Friday) → Oct 31
(Saturday); and the 24 row's date text "Oct 30"→"Oct 31" — the 7×9px
glyph. The WH-20 captures were taken 2026-10-30; this round runs 10-31.
The same acceptable-mover class as the WH-20 route-name lesson:
date-dependent content renders into the pixels; the capture is honest.
The two NEW captures verified programmatically: 26-events-inline-form
(the white FORM_CARD band at **90.5%** of the card zone) and
27-dark-mood-form (the active tile's gradient stops at **1,248 blue-500
px + 1,320 cyan-500 px**). The md5 ledger re-based at **27 files**. The
account left clean: light / #6366f1 / rows 0 verified / both checkboxes
true.

**WP-6** — the worklog WH-21 entry, the plan's execution record, this
transcript. **WP-7** — the commit + the SSH-wrapper push.

---

## The delivery summary

**The round's core find:** the reference's seven module create-forms are
INLINE EXPANDING CARDS in the page flow — ours shipped as 512px Radix
modal overlays through twenty rounds while every probe read the forms'
CONTENT from inside the opened overlay. The delivery mechanism was never
the question. Cured behind the form-modality census (2×7 sites) + the
FORM_CARD record (the probed anatomy) + the e2e modality leg. Plus: the
checkbox's invisible dark state (F-1, the `data-[state=checked]:` arms the
hover/focus census never covered), the mood selector's tile anatomy + theming
model (F-3), and the fixed-gradient white-ink family measured for the first
time (F-4: all 16 pairs AA-fail at the worst stop, all reference-shared —
documented + pinned, not cured).

**Gate:** lint 0/0 · tsc 0 · **340/340 (24 suites)** · build OK · smoke
14/14 · **e2e 60/60** · census MATCH.

**Suggested next (WH-22):** the Routines Schedule modal's field-by-field
parity read (the one modal whose CONTENT was never probed), the reference's
tile focus states if it redeploys, the 2.4.13 AAA decision (the ledger row
governs), a functional-superset round on redeployment.
