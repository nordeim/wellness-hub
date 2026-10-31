# Session-32 Remediation Plan — the routines video-card round (WH-32)

**Task ID:** WH-32 · **Date:** 2026-11-01 · **Branch:** `main` (only)
**Mission:** the WH-31 plan's own suggested next, executed against a
reference that moved AGAIN — and this time it is a RENDERED-FACE change,
not a platform rebuild: **the watch round 20 flipped with a NEW CSS
CONTENT hash** (`/static/index-s8d1FO8M.css` → `/static/index-BHjkUcdg.css`
— the first stylesheet CONTENT change since round 16; rounds 16 and 19
moved only the path shape), a NEW JS bundle (`index-BFu7mt5f.js`, was
`index-5-N3MB6y.js`), the `cdn.tailwindcss.com` Play-CDN pipeline still
present. Per the lesson-30 doctrine (a redeployment resets every standing
map), the round re-walked every standing surface computed-style on the
new build — **one drift found, everything else byte-parity**.

> **Reference probe (30+ passes; writes = ZERO on the reference — every
> surface read at rest; on OUR app the login/session and the drawer
> batteries, all reverted):** the watch round 20 (the CSS content hash +
> the JS bundle + the CDN pipeline); the dashboard (the "Welcome Back!"
> H1 at 36px/700 with its to-right indigo→purple→pink gradient, the
> tiles 0/1/0/0, the Quick Actions `grid grid-cols-2 gap-3` at 12px gap
> with h-24 96px cells + 16px icons, the 💚 feed); the mobile header
> interior at 390px (padL 24px, the 28×28 r8 trigger, the 16px ink icon,
> the title at x=68, one child, sticky z-10 blur(24px)); the drawer
> battery (the 288px sheet, the border-r 1px rgb(229,229,229), the X
> display:none, the 11 capitalized hrefs, the 32px rows, the initial
> focus on the sheet div, escape-close + unlock, the viewport-grow
> auto-close, the scroll lock via `data-scroll-locked` +
> pointer-events:none); the desktop nav rows (32px, 16px icons,
> transition-all); the Profile avatar card (40×40); the footer absence
> (0 footer elements); the ZERO-landmark shell (aside 0, nav 0 — the
> WH-31 (o) pin premise unchanged, its icons still not aria-hidden); the
> Goals page ("Badges Earned 0 of 0", the bare empty-state paragraph, the
> H1 yellow→orange gradient — the earned tile still reference-side
> blocked); the StudyResources page (zero rows, the "Upload File
> (optional)" field in the INLINE form, no overlays); the MentalHealth
> page (1 entry, 5.0/10, streak 1; the mood form's mb-4 label, the
> min=1 slider, the 60px gratitude + 96px h-24 reflection textareas, the
> five 104px tiles with the Good tile's blue→cyan gradient — BOTH apps
> identical); the Learning page (12 cards, the opacity-0 Watch Now, the
> outline DIV chips at border rgb(229,229,229) no shadow); the Profile
> page (the 960px tablist, the 3 tabs, the 4 Radix comboboxes, the
> Background Image section); the Events calendar (the outline trio
> ←/Today/→ at 1px rgb(229,229,229), the gap-2 grid); the Routines page
> (**THE DRIFT — F-1 below**; the Schedule modal still 672px, no Cancel,
> the 3 solid purple-500 step circles, the gradient-50 desc tile — the
> WH-22 map holds); the Assignments zero-row omission (no list section
> at 0 rows); the Exercise H1 gradient (36px/700, to right
> rgb(234,88,12) → rgb(220,38,38)); the login family (the h1 30px/700,
> the 48×368 r12 inputs, the 48px submit — both apps identical); the
> login card glass (bg-white/95, blur(4px), r16 — the --blur-sm pin's
> own surface, both apps); `bun audit` ZERO (the five-override posture
> holds).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
cloned tree at `103dd7a` = WH-31 shipped at `2c5ddc8` + the operator's
session-log push):** lint 0/0 · tsc 0 · unit **364/364 (25 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **69/69** · census MATCH —
the exact documented WH-31 ship state. **Plus the periodic `bun audit`
duty: ZERO vulnerabilities.** The instruction's checklist items verified
on the tree: the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"`
→ `<repo>/db/custom.db`, census MATCH), the vitest + playwright configs
in place and passing, the sitemap/robots/manifest/OG surfaces serving
(smoke check 12), the Tailwind v4 pins present in `globals.css`,
`.env.example` tracked and accurate. The neo-crm sibling re-verified for
the family patterns (same scripts/stack/docs structure — the vendored
`neo-crm_SKILL.md` + the live repo both confirm).

**The audit method:** the watch re-run live (round 20 — the content-hash
redeployment caught same-session), the lesson-30 redeployment walk
applied in full (15+ standing surfaces re-probed computed-style on the
NEW build, both apps side-by-side through agent-browser), the WH-31 diff
reviewed through the `skills/web-application`, `skills/tdd` and
`skills/agent-browser` lenses, and the instruction's checklist items
verified on the tree.

Findings (by severity) — the WH-32 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH — the round's core, a rendered-face parity drift** | **The routines template cards' VIDEO family renders now.** The reference's round-20 build changed the card RENDERER: the SIX templates carrying `thumbnail`/`videoUrl` fields (Creative Flow Session, Quick Productivity Reset, Energizing Morning Kickstart, Self-Care Sunday, Focused Study Session, Peaceful Evening Wind-Down — the last six of the eleven, in grid order) now render, between the h-2 category strip and the card header, a `relative h-40 overflow-hidden` thumbnail zone (160px at every viewport, probed at 1280 AND 390): the img `w-full h-full object-cover group-hover:scale-105 transition-transform duration-300` with `alt` = the template name (unsplash URLs — byte-identical to the fields OUR seed already carries on exactly those six), the group-hover reveal overlay `absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center`, and inside it the Watch Video button `shadow h-8 rounded-md px-3 text-xs bg-white text-gray-900 hover:bg-gray-100` with the lucide Play `w-4 h-4 mr-2` — a BUTTON that navigates to the template's `videoUrl`. The card class now carries `group` (all 11 — the reveal family's scope). The five family-A templates (no thumbnail field) render exactly as before. OURS renders NONE of it — the WH-24 retirement ("the reference's own data carries the fields its UI omits") was correct against the OLD build's face and is now WRONG against the new build's: the fields RENDER now, so parity demands we render them. Our seed already carries the exact six thumbnail/videoUrl pairs (URLs verified against the live build) — only the renderer changes | `src/app/(app)/routines/routines-page.tsx` (the card + the new conditional zone) · `src/lib/page-layout.ts` (the new `ROUTINE_VIDEO_CARD` record) · `tests/src-census.test.ts` (the census pin) · `tests/e2e/a11y.spec.ts` (the (p) reveal leg) | **Cure (TDD)**: the `ROUTINE_VIDEO_CARD` record in page-layout.ts (the probed members: wrap/img/overlay/watchBtn), the conditional thumbnail zone in the card (between the strip and the header, on `t.thumbnail`), `group` on the card class, the Watch Video button with our kept supersets (the `aria-label="Watch Video: <name>"` form + `_blank` `noopener,noreferrer` navigation — the Learning `watch()` precedent, the same external-URL safety class), the census pin + the (p) e2e leg, the count ladder + the docs ladder |
| F-2 | **LOW — document-only** | **The watch round 20 event**: the reference redeployed with a CSS CONTENT change (the first since round 16 — `/static/index-s8d1FO8M.css` → `/static/index-BHjkUcdg.css`), a new JS bundle (`index-BFu7mt5f.js`), the CDN pipeline still present (`cdn.tailwindcss.com` + `/api/frontend-config.js?v=3`). The lesson-30 walk's outcome: ONE rendered-face change (F-1), every other standing map byte-parity — a PARTIAL redesign (the routines renderer), not a platform rebuild | `docs/Project_Architecture_Document.md` §11 (the watch row updated to round 20) · AGENTS.md (the watch note) | The watch row + the AGENTS note updated with the round-20 record |
| F-3 | **LOW — positive findings, verified** | The standing blocks (the WH-31 suggested-next (a)): re-checked — the sr list-side chip + the four list interiors still zero-row (workouts 0, assignments 0 — the omission holds, events 0, moods 1). The earned tile (suggested-next (c)): still reference-side-blocked ("Badges Earned 0 of 0"). The instruction's mobile-menu emphasis: the drawer battery verified BYTE-PARITY on the NEW build (the 288px sheet, the hidden X, the border-r, the 32px rows, the 11 hrefs, escape, auto-close, the scroll lock) — OUR side pinned green by the standing e2e battery. The Tailwind v4 pins all present in `globals.css` (the hover unwrap, the dark variant, `--shadow-sm`, `--blur-sm`, the three `@source not`); no new v4 bug class in OUR compiled build. The a11y-tree forms unchanged on both apps (the (o) pin premise holds — the reference still ships zero landmarks, its icons still not aria-hidden) | — | No action (the standing doctrine) |

**No MEDIUM findings beyond F-1; no CRITICAL.** The one HIGH is the
routines video-card drift — a pure parity gap, no security/correctness
dimension (the external URLs are seed data carried since WH-24; the
button opens them in a new tab with noopener).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 25 | **25** | none — the new census rides `tests/src-census.test.ts` |
| Unit checks | 364 | **365** | +1: the routines video-card census (the record's members, the page's consumption, the `group` class, the conditional zone, the superset arms) |
| E2E checks | 69 | **70** | +1: the **(p) leg** (`a11y.spec.ts` — the routines video-card reveal family: the resting opacity-0 button + the h-40 thumbnail zone + the hover reveal, the (h) tutorial-card precedent on the routines surface) |
| §8.1 rows | infra 162 · a11y 21 | **infra 163 · a11y 22** | the measured values flip CANONICAL in the same commit |
| Captures | 34 | **34** | the same committed set — the routines captures (03 + the dark 18) are EXPECTED movers this round (the F-1 cure changes the rendered face); root-caused as the cure itself, then the ledger re-base |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 364→365,
e2eChecks 69→70) land with every doc site in the SAME commit. If the RED
run lands a different exact count, the measured value flips CANONICAL in
the same commit — the doctrine is lockstep, not prophecy.

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full: the routines-page.tsx card block (the
WH-24 comment retiring the video branches — the retirement's premise
named), the page-layout.ts records (TUTORIAL_CARD's structure as the
sibling-family precedent), the src-census.test.ts patterns (the
SCHEDULE_MODAL member census + the comment-stripping doctrine), the
a11y.spec.ts (h)-leg structure (the resting/hover probe pattern, the
REAL-pointer doctrine), the docs-counts CANONICAL block, the PAD §8.1
rows + §11 ledger, the AGENTS watch passage + the routines passages, the
SKILL §8 + §12 (lesson 35 — lesson 36 lands after it), the
capture-round.mjs procedure.

### WP-1 — RED (the pins before the cures)
1. `tests/docs-counts.test.ts`: the CANONICAL flips (unitChecks 364→365,
   e2eChecks 69→70) — the full unit RED lands at exactly the docs-counts
   sites (the count-ladder doctrine: the flip precedes the legs so the
   suite can never pass with a stale count).
2. `tests/src-census.test.ts` +1 census: the **routines video-card
   census** — (a) the `ROUTINE_VIDEO_CARD` record exists in
   page-layout.ts with the probed members (wrap `relative h-40
   overflow-hidden`, img `w-full h-full object-cover
   group-hover:scale-105 transition-transform duration-300`, overlay
   `absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
   transition-opacity flex items-center justify-center`, watchBtn the
   stock base + `shadow h-8 rounded-md px-3 text-xs bg-white
   text-gray-900 hover:bg-gray-100`); (b) the routines page consumes the
   record (the zone rendered conditionally on `t.thumbnail`, BETWEEN the
   strip and the header); (c) the card class carries `group`; (d) the
   Watch Video button carries the aria-label superset + the `_blank`
   noopener navigation (the Learning precedent). RED at birth (the
   record does not exist).
3. `tests/e2e/a11y.spec.ts` +1 test: the **(p) leg** — the routines
   video-card reveal family: the six seeded video cards render the h-40
   thumbnail zone (the img + its alt), the Watch Video button rests at
   opacity-0 inside the black/40 overlay, and a REAL pointer hover
   reveals it (opacity 1) — the (h) leg's probe pattern on the routines
   surface, reading the oklab alpha + scale-property forms (the WH-21
   lesson). RED at birth.

### WP-2 — GREEN (the cure)
1. `src/lib/page-layout.ts`: the `ROUTINE_VIDEO_CARD` record — the
   probed members with the WH-32 decode comment (the round-20
   redeployment, the six-template family, the retirement reversed) +
   the dark twins where the reference is light-only (none needed: the
   overlay/button faces are mode-independent whites — the TUTORIAL_CARD
   watchBtn precedent).
2. `src/app/(app)/routines/routines-page.tsx`: `group` added to the
   card class (the reference's own unconditional class — verified on
   all 11); the conditional thumbnail zone between the strip and the
   header (`{t.thumbnail && (...)}`) consuming the record; the Watch
   Video button with the aria-label + `_blank` noopener navigation (the
   Learning `watch()` precedent — the reference's same-tab navigation
   is a UX hazard on an external URL; the superset is documented in the
   census + this plan). The WH-24 comment rewritten: the retirement
   reversed at WH-32 with the redeployment as its cause.
3. The page-theme census's routines-template-card expectations updated
   if they pin the retired face (read them first; flip the pin literals
   to the new face in the same commit — a pin that guards the OLD face
   is the F-1 class cured).

### WP-3 — the e2e verification
The (p) leg + the standing battery re-run (69+1 = 70); the console net +
the axe walks on /Routines (the new external images + the reveal button
must stay AA-clean — the img alt + the button's aria-label carry it).

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **365/365 (25 suites)** · build OK · smoke
14/14 · e2e **70/70** · db census MATCH · `bun audit` zero (the
networked posture check, outside the gate per the doctrine).

### WP-5 — the docs ladder
PAD §11 (the F-1 row — the drift decoded, the cure, the retirement
reversed; the F-2 watch row updated to round 20 — the content-hash
change, the one-face redesign outcome), PAD §8.1 (infra 163 · a11y 22 +
the totals) + §8.4 (365/365 · 70/70), AGENTS (the routines passage —
the video family renders now; the watch note updated to round 20; the
counts), SKILL v1.29.0 → **v1.30.0** (§8's WH-32 passage + **lesson
36**: "a retirement is a map of the reference's face AT PROBE TIME —
when the watch flips with a CONTENT hash, re-read every retirement's
premise before anything else: the WH-24 'its UI omits the fields' was
true for nine rounds and false the moment its renderer learned to draw
them; the seed data carrying the fields is what made the cure a
renderer-only change" + the counts), README (the counts + the
Routine Templates feature bullet), CLAUDE (the counts), worklog WH-32
(top), the plan's execution record, `docs/session_61.md`.

### WP-6 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set). The
34-file set re-taken through the COMMITTED procedure — the third
cross-round byte comparison: the routines captures (03-routines + the
dark 18) are EXPECTED movers (the F-1 cure changes the rendered face);
every other capture expected byte-stable. Movers root-caused before the
ledger re-base; the ledger re-based with the WH-32 record.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--key-file <key outside
repo>` + `--remote git@github.com:nordeim/wellness-hub.git`, main
only) → remote verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-0** — validated: every cure site read; the census + leg patterns
  confirmed; the seed's six thumbnail/videoUrl pairs verified against
  the live build (byte-identical URLs); the TWO old-face pins located
  (the WH-24 census's forbid-branch block + the WH-29 card-class
  regex), both flipped in the same commit as the cure.
- **WP-1 RED** — the CANONICAL flips (unitChecks 364→365, e2eChecks
  69→70) + the WH-32 routines video-card census (RED at birth) + the
  (p) e2e leg: the full unit RED at exactly the 7 expected sites (the
  census + the 6 docs-counts lockstep failures).
- **WP-2 GREEN** — the `ROUTINE_VIDEO_CARD` record (ONE composition
  catch: the reference's own button base DROPS the stock `rounded-md
  text-sm` — its arms carry rounded-md + text-xs; composing the full
  stock base would put text-sm and text-xs in one attribute, a cascade
  race) + the routines-page cure (the conditional zone, `group` on the
  card, the Play import, the rewritten WH-24 comment naming the
  reversal) + the two old-face pins flipped (the WH-24 census's (a)
  block rewritten to the still-true conditional half; the WH-29 regex
  extended with `group`). ONE mid-WP catch on the (p) leg: the first
  draft asserted the BUTTON's opacity (the Learning (h) family's
  form) — the routines family's fade lives on the OVERLAY (bg-black/40
  constant, its OPACITY fades; the two sibling families are INVERSES
  of each other); the leg re-targeted at the overlay's opacity + the
  constant scrim, the button height (h-8 = 32px) added. LIVE-verified
  on the dev server with a real-pointer hover: the overlay 0→1, the
  img's `scale` property none→1.05 (the v4 form), the six/five split,
  the alt texts, the aria-label.
- **WP-3/WP-4** — the full gate GREEN: lint 0/0 · tsc 0 · unit
  **365/365 (25 suites)** · build OK · smoke **14/14** · e2e
  **70/70** (the (p) leg + the axe walks over the new video cards:
  zero violations) · census MATCH · `bun audit` zero.
- **WP-5 docs** — PAD §11 (the F-1 cure row + the watch row's round-20
  update) + §8.1 (infra 163 · a11y 22, the (p) leg described) + §8.4
  (365/365 · 70/70) + the tree counts; AGENTS (the routines passage's
  WH-32 reversal + the round-20 watch note + the counts); SKILL
  v1.29.0→v1.30.0 (§8's (p) leg passage + the WH-24 walk's reversal
  note + **lesson 36** + the counts); README (the counts + the Routine
  Templates feature bullet); CLAUDE (the counts); the worklog WH-32
  entry; this record; docs/session_61.md. Docs-counts 10/10 green.
- **WP-6 captures** — the doctrine LIVE (badgesEarned=0 asserted before
  the light set); the third cross-round byte comparison: **29/34
  byte-stable**, FIVE movers all root-caused before the re-base:
  03-routines + 18-dark-routines (15.0%/15.0%, delta 255/250 — THE
  F-1 CURE BY DESIGN: the six video templates render the h-40
  thumbnail zone on both modes; the change localized to the video-card
  band, y 800+ in the viewport); 28-routines-schedule-modal (4.5%,
  delta 51 — the cure's KNOCK-ON: 95% of the differing samples sit
  OUTSIDE the 672px modal column [2932 outside vs 147 inside] — the
  backdrop behind the scrim now renders the thumbnails; the modal's
  own face unchanged, the WH-22 map re-verified live this round);
  10-learning (0.0014%, delta 5 — the cross-session headless-Chromium
  rasterization class, the WH-31 mover's same file + same magnitude);
  25-dark-login-focus (0.0069%, delta 4 — the sub-visible rendering
  instant, the file's own precedent class). The md5 ledger re-based at
  34 files with the WH-32 record, verified 0 mismatches.
- **WP-7** — the commit + the SSH-wrapper push (main only), the key
  shredded after.

**Suggested next (for WH-33):** (a) the standing blocks re-check; (b)
the watch round 21 (the content-hash form — a SECOND consecutive
content change would signal an active development cadence on the
reference; the watch note per round until stable); (c) the family-A/B
split on the reference's OWN Schedule modal (the six video templates'
schedule content vs the five plain ones — unprobed this round); (d) the
`cdn.tailwindcss.com` pipeline's computed-value spot-check companion
(runtime-compiled Tailwind can drift computed values WITHOUT a bundle
hash change — the standing WH-31 note).
