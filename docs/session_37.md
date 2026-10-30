# Session 37 — the WH-20 round transcript (the interaction-states round)

This session pair continues the remediation chain. The prompt references
session_35 + plan19 + session_36 — per the house convention, the newest
session pair + plan drives the NEXT round: **WH-20**, the
interaction-states round (WH-19's own "Suggested next": the interaction
states under the computed-contrast doctrine). The numbering formula broke
this generation — the prompt advanced to (35,36)+plan19 instead of the
predicted (34,35)+plan19 — so the round is identified by the referenced
files, not the formula.

## Session A (interrupted)

git pull — already at `9e2c1d5`: WH-19 shipped at `64814e0` plus the
session-log pushes. The five companion docs, session_35, plan19, the
worklog and session_36 internalized; the tree validated against the WH-19
ledger.

**Baseline gate (live, pre-remediation):** lint 0/0 · tsc 0 · unit
330/330 (22 suites) · build OK · smoke 14/14 · e2e 53/53 · db census
MATCH · bun audit ZERO — the documented WH-19 ship state, no flake.

**Live reference probe — every watch clean:** the H1 identity map 11/11
byte-identical; the compiled-CSS watch round 7 — the asset hash UNCHANGED
(`index-heGLHP2e.css`), no redeployment; the seed watch round 9: 23/23;
the entity-API watch round 8: 12 rows / 13 keys / `views:0`; the drawer
battery at 390×844 (11 items + Close, the stays-open quirk, clean
teardown); the 404; the 12 href-less placeholders. Zero probe-hygiene
events. **The reference's own keyboard-focus states read for the first
time: INVISIBLE** — its nav links carry `outline: 2px rgba(0,0,0,0)`
transparent with no rings, its submit focuses to a 3px WHITE outline
invisible on the white card; its login INPUT ring is the one focus
surface it does ship, and ours is byte-identical to it (the F-5 parity
evidence).

**The audit (the interaction states):** live oklab-aware focus-ring
probes driven by REAL keyboard Tab walks (program focus() does not match
:focus-visible after mouse use) over the shell, the Profile chips, a
module dialog and the login family in BOTH modes; a REAL-pointer hover
probe on the toast's close button (synthetic mouseenter never sets
:hover); an arm-level static sweep. **The methodology find:** elements
carrying `transition-all` interpolate box-shadow — a synchronous
computed-style read returns the t≈0 frame (five transparent zero layers)
and false-flags a healthy ring as invisible; every ring read settled
≥400 ms first (the Profile chips' first dark-walk numbers were exactly
this artifact — settled, they read 2px #d4d4d8 @ 11.99:1, GREEN).

**Findings:** F-1 [HIGH] the login family's dark focus rings —
`dark:focus:ring-neutral-600` at 2.32:1 vs the dark card (2.29 at pin
precision), 2.11:1 vs the input blend; the WH-19 round paired the ARMS
census-complete but the twin's VALUE was sub-contrast — **pairing is not
contrast**. F-2 [HIGH] the toast's hovered dismiss glyph at 1.05:1
(live-confirmed with a REAL hover — the glyph vanishes exactly when the
user aims at it). F-3 [HIGH] APP_FOOTER — zero dark pairs, a white strip
on every dark page (live-read rgb(255,255,255); every walk passed it
because its self-contrast is AA-fine — the light-island class, the 404's
twin, on the most-travelled surface of all). F-4 [MEDIUM] nine module
action sites light-only (the red deletes at 3.12:1 marginal resting with
red-50 light-island hover flashes; the Profile Log-out a full red-50
island in the dark Session panel). F-5 [LOW, reference-shared] the light
login ring at 2.56/2.45 — byte-identical to the reference's own computed
ring → documented, NOT cured, per the parity doctrine. F-6 [MEDIUM,
method] the dark walks render EMPTY module lists so the ROW surfaces
never render in any walk, and no net anywhere walks a HOVER state or
reads a FOCUS ring's color — the fourth assertion-surface class the gate
never read (DOM → console → semantics → interaction).

The plan written (`docs/plans/2026-10-30-session20-remediation-plan.md`)
and validated against the codebase. **WP-1 (RED) began:** the census
diff landed with exemptions (a)+(b), RED verified at 13 failures — then
the session was interrupted at the exemption-(c) step (the two
`hover:bg-black` scrim sites: learning + routines video overlays).

## Session B (this session)

Resumed from the summary + the uncommitted workspace: the census diff,
the draft plan, four scratch scripts. git pull — already up to date at
`9e2c1d5`.

**Exemption (c) added** (the BLACK OVERLAY SCRIM — the arm exempted ONLY
when the string also carries the resting `bg-black/…` layer): the RED
settled at the deterministic 11-site inventory (F-2 + the F-3 link +
F-4's nine) — matching the audit ledger exactly.

**The interaction-contrast arithmetic pin written**
(`tests/interaction-contrast.test.ts`): reads the audited class strings,
maps the palette steps to the v3 pins, computes the ratios — RED 4/4 on
the audit's exact causes (F-1 at 2.29/2.08; the missing arms; the absent
PAD §11 ledger row).

**The e2e four legs written** (the data-bearing dark row walk with the
API row; the dark login focus ring on real Tab; the dark footer probe;
the toast-hover probe on a REAL pointer). First RED run exposed two
artifact bugs: the probe's `ReferenceError` (page.evaluate serializes the
function body — a Node-side closure constant is invisible in the page
context; the probe source now rides the evaluate ARGS) and the (b) leg's
layer parse (a lookahead regex matched nothing on the computed
`) 0px 0px` form — debug-probed: the layers read `rgba(0,0,0,0) ×2,
rgb(255,255,255) 0 0 0 2px, rgb(82,82,82) 0 0 0 4px`; split on the color
boundary, sort by spread, take the outermost opaque). The census's own
first run had passed spuriously — its gate regex `/(:hover|:focus)/` was
INVERTED (Tailwind writes `hover:`, not `:hover`) — caught in Session A.

**RED verified live pre-cure at the audit's exact measures:** (b)
rgb(82,82,82) @ 2.29:1, (c) rgb(255,255,255) white island, (d) ink
rgb(23,23,23) on rgb(28,28,31) @ 1.05:1; (a) green-by-marginal at 3.12:1
— exactly the F-4 downgrade the audit ledger predicted.

**WP-2 (GREEN):** F-1's four sites (ring → `dark:focus:ring-neutral-400`
@ 7.11:1/6.45:1; border → `dark:focus:border-neutral-500` @ 3.43:1; the
homeButton's hover twin → neutral-500 in the same stroke), F-2
(`dark:hover:text-neutral-100` @ 15.59:1), F-3 (the footer's full dark
pair @ 7.85:1 + the link @ 15.72:1), F-4's nine sites + the Log-out.
+1 v3 pin (neutral-200 — exactly the plan's prediction). The e2e re-run
after `bun run build` — **the stale-build lesson: the webServer reuses
`.next/standalone`; the cures were in src but the server served the
pre-cure classes until the rebuild.** All four legs GREEN
computed-verified.

**The full-suite catch:** the wellness-crud spec asserts the Total
Workouts stat at exactly 1 while the (a)/(d) legs' rows persisted in the
shared e2e db — the describe's afterEach now deletes every workout
through the API and VERIFIES the deletion (the WH-16 verify-the-revert
lesson applied to the db; the next run's global-setup reseed the
backstop). 57/57.

**WP-3 (the ladder + docs):** 335/23/57 at every live-tense site; the
§8.1 rows recomputed (the infra row 11 files/136, the a11y row 14;
109+90+136=335; 11+6+7+14+1+18=57); the PAD §11 ledger's four new rows;
the AGENTS a11y-net bullet widened; the SKILL v1.17.0→v1.18.0 + lesson 24
+ the §9 A-4b cure (the stale five-member v4-family header never carried
the sixth pin, @custom-variant dark). docs-counts GREEN 10/10.

**WP-4 (the full gate):** lint 0/0 · tsc 0 · 335/335 (23 suites) ·
build OK · smoke 14/14 · e2e 57/57 · census MATCH (the dev db reseeded —
three workouts + one badge of the audit's own probe residue) · bun audit
ZERO.

**WP-5 (captures):** the house procedure with FULL normalization (Light
+ Indigo Dream, both verified via /api/prefs before any capture fires).
**23/23 BYTE-STABLE** — the cures move zero LIGHT pixels by construction,
and the dark footer change sits BELOW THE FOLD (the footer's top lands at
exactly y=900 in the 1280×900 viewport — 0 captured pixels;
live-verified rgb(10,10,10) on the dev server). One mover root-caused:
23-dark-404 — the 404's span renders the REAL unmatched path, so the
capture route name is part of the pixels; re-taken on the WH-19 route
name → byte-stable. The NEW set: **24-dark-exercise-rows** (the API row
visible, verified 44,515 px in the row-card band) + **25-dark-login-focus**
(the neutral-400 ring's face, verified 2,508 neutral-400 px + 4,739
white px in the card zone). The md5 ledger (25 files) committed; the
account normalized + reverted (rows 0/0, Light — both verified).

**WP-6:** the worklog WH-20 entry + the plan's execution record + this
transcript.

**WP-7:** staged (no .env/db/keys; the wh20-* scratch scripts stay
untracked), committed to main, the SSH-wrapper push — then the
`update session log` commit.
