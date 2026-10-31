# Session 47 — WH-25, the Profile tab-panel geometry round

2026-10-31. Remote main at `9e0073f` (WH-24 shipped at `afe0b88` + the
user's session-log push adding `docs/session_46.md` — the WH-24
transcript). This prompt (referencing session_45 + the session24 plan +
the worklog + session_46) drives **WH-25**.

---

## The log

The workspace was intact at the WH-24 ship state — `git pull` brought
the one new commit (the session-log push). Reading the five docs +
session_45 + the session24 plan + the worklog + session_46, validated
against the tree. WH-24's "Suggested next" names this round: **the
Profile tab panels' interior geometry (the colors + dark pairs walked
at WH-17/18, the field-by-field geometry never) + the capture-state
doctrine codification (the 11-goals lesson) + the redeployment watch**.

**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 347/347 (24 suites) ·
build OK · smoke 14/14 · e2e 63/63 · census MATCH.

The live reference probe — **4 passes, zero writes, zero probe-hygiene
events**. The compiled-CSS watch **round 13: UNCHANGED**
(`index-heGLHP2e.css`). The seed watch **round 14: 23/23
byte-for-byte**. The preset hygiene clean. The drawer battery green
(the stays-open quirk on a REAL click). The tab keyboard model
verified: ArrowRight moves focus AND selection — our Tabs already
wires it.

The round's target, walked field-by-field:

**The tab region** — the reference's wrapper is **`w-full`** (the
tablist computes 960px = the full container; ours shipped `max-w-xl`)
with the panel shells at **`mt-2`** (ours `mt-6`). The trigger stock
form + the track are already parity (our Session-12/23 pins hold; the
`text-neutral-600` inactive ink stays the documented WH-17 a11y
superset).

**The five Appearance cards**: the Colors card rides the stock Label +
**`mb-3 block`** with the **`md:grid-cols-4`** preset grid of
**TWO-CIRCULAR-SWATCH** cards (`flex gap-2 mb-2` holding two `w-6 h-6
rounded-full` divs with inline solid colors — ours shipped ONE
gradient bar), the picker rows **`md:grid-cols-2 gap-6`** with the
color input the stock form + **`w-20 h-12`** (80×48 — ours 56×36) and
the hex input carrying a placeholder, and the preview tile the
**135deg (to-br)** inline gradient (ours: to-right). The Typography
select is **`w-full`** (ours: sm:w-64) with the preview a **`mt-4 p-4
border rounded-lg`** block at **`text-lg font-sans`** + a
"Preview of X" line (ours: a bg-line-soft p-3 single-p). The Visual
Style selects are **STACKED full-width** in the space-y-6 body (ours: a
3-col grid). The BG hint is `text-xs text-gray-500 mt-1`.

**The Account card**: the disabled inputs carry the **`bg-gray-50`**
wash; the title icon is **circle-user** (ours: UserRound). Our Session
card (the logout) stays the functional superset — the reference's
Account tab carries no logout surface (probed true this round).

**The Preferences card + the round's second core finding**: the title
carries the Settings icon (ours: bare); the rows are `flex
items-center justify-between p-4 rounded-lg border` with the title at
unsized `font-medium`; and the controls are **NATIVE bare
`input[type=checkbox] w-5 h-5`** — **the WH-21 claim "the reference
ships ZERO checkboxes, probed live" was FALSE**: that probe never
opened the Preferences tab. The CRM-chassis custom Checkbox (the
Session-17 button-role form), its WH-21 dark-state cure, its
interaction-contrast F-1 pin and its a11y (e) leg all shipped on the
untested premise through four green rounds — the component, the
CHECKBOX record, the pin and the leg retired with the premise, and the
new (j) leg pins the tab region's computed geometry.

**The save bar**: `flex justify-end gap-3 sticky bottom-4` (ours: a
bare div).

Writing the plan
(docs/plans/2026-10-31-session25-remediation-plan.md), validated,
then executed.

**WP-1 RED** — the profile-geometry census at **24 causes**; the
checkbox-retirement census at **6 causes**; the CANONICAL flip 347→348;
the full unit RED at exactly the 8 expected causes.

**WP-2 GREEN** — the record changes (the PRESET_CARD swatch
re-membering, PROFILE_PANEL's bodySpaced4, the PROFILE_PREFS record,
the CHECKBOX retirement) + the full page conversion + the Checkbox
retirement + the (e)→(j) swap. THREE mid-WP finds: the color-input arm
ORDER (the reference writes `w-20 h-12` — the census caught our
`h-12 w-20`), two census checks reading the PAGE for record-borne
classes (now reading the record + the consumption site), and the (j)
leg's `<label>` row locator. **LIVE-VERIFIED at the reference's
computed values**: the tablist 960 == the container 960 + the panel
marginTop 8px; the two 24px circles at the exact solid colors; the
color input 80×48; the tile `linear-gradient(135deg, rgb(99,102,241),
rgb(168,85,247))`; the preview block 1px solid + 18px; the three
selects STACKED (Ys 1520/1612/1704); bg-gray-50 + circle-user; the two
native 20px checkboxes + the row form (16px padding, transparent,
center, the 16px title); the save bar sticky/flex-end/16px.

**WP-3** — 348/63 at every site; the §8.1 rows (infra 149, the a11y
row's swap); §11 (the profile-geometry retirement + the false-premise
correction); AGENTS (the Profile passage + the a11y swap + **the
capture-state doctrine bullet**); SKILL v1.23.0 + **lesson 29**. **Full
unit suite GREEN: 348/348 (24 suites).**

**WP-4 — the gate**: lint 0/0 · tsc 0 · **348/348** · build OK · smoke
14/14 · **e2e 63/63** (the (j) leg green; the axe walks pass the
native checkboxes in both modes).

**WP-5 — the captures**: the round run with the F-9 doctrine LIVE (the
badgesEarned=0 assertion passing at the start; the capture-24 API write
earning the First-Step badge mid-round as expected — the post-round
re-seed the documented house step). The 30-file set re-taken: **29
byte-stable + exactly ONE mover (12-profile — the only page this round
touched)**. The NEW **31-profile-preferences** pixel-verified: 58 dark
glyph pixels (the UA check mark inside the 20px native box), the row
borders at y248/325/342/419/445, the save button right-aligned at the
container edge. The ledger re-based at 31 files.

**WP-6/WP-7** — the worklog entry, the plan's execution record, this
transcript, the commit, the SSH-wrapper push.

---

## The delivery summary

**The round's core finds:** (1) the color-geometry split applies
WITHIN a surface — the WH-17/18 color probes mapped the Profile panels
without ever walking their fields, and every member deviated (the
wrapper, the panels, the swatches, the picker rows, the tile angle, the
preview block, the stack, the wash, the rows, the save bar); (2) a
superset's premise must be probed, not assumed — the WH-21 "reference
ships ZERO checkboxes" claim was written without opening the
Preferences tab, and the custom Checkbox + its cure + its pins + its
leg all shipped on the false premise (the native form + the (j) leg
replaced them); (3) the capture-state doctrine codified (the
achievements assertion before the light set).

**Gate:** lint 0/0 · tsc 0 · **348/348 (24 suites)** · build OK · smoke
14/14 · **e2e 63/63** · census MATCH.

**Suggested next (WH-26):** the redeployment round if the CSS-hash
watch moves (round 13 today); the lesson-29 audit (re-verify every
standing absence claim the supersets cite); the remaining never-walked
interiors (the login family's signup/verify/sent field rows, the mood
form's energy-slider + tag-chips interior); the capture-doctrine
extension (a `db:seed` before every capture round if another residue
class appears).
