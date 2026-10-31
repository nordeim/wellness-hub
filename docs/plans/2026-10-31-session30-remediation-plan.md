# Session-30 Remediation Plan — the shell-chrome geometry round (WH-30)

**Task ID:** WH-30 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** the WH-29 plan's own suggested next, executed against a
reference that did NOT move: the compiled-CSS watch round 18 read
STABLE (`/assets/index-heGLHP2e.css` + the bundle `index-Bn9GF0-W.js`
unchanged — no redeployment since WH-28), the standing data blocks held
(the demo account still carries ONLY the one mood row — the sr list-side
chip + the four list interiors re-checked and still zero-row), and the
earned-achievement tile stayed reference-side-blocked (the Goals page
still reads "Badges Earned 0 of 0 total" — no operator write since
WH-29). With the watch, the blocks and the bundle all quiet, the audit
turned to the surfaces NO round ever geometry-probed: **the shell chrome
itself** — the mobile glass header's INTERIOR, the sidebar/drawer nav
row family, the Profile card, and the app footer — the chrome the WH-15
identity probe mapped by COLOR and the e2e battery pinned by BEHAVIOR,
never by computed box. The driving instruction's mobile-menu emphasis
led the round straight to the loudest finding.

> **Reference probe (16 passes; writes = ZERO on the reference — every
> surface read at rest; on OUR app one dark flip + the drawer batteries
> on both sides, all reverted):** the watch round 18 STABLE; the
> standing blocks re-checked (sr zero rows, the four list interiors zero
> rows, one mood row only); the mobile drawer battery byte-parity on
> BOTH apps (the 288px sheet, 11 byte-identical capitalized hrefs, body
> lock, escape-close, viewport-grow auto-close — the instruction's
> mobile-menu emphasis, verified from both sides); the drawer close
> button + sheet structure byte-identical; the dashboard tiles + the
> Goals page parity (modulo the reference's own mood row + the two
> documented WH-29 deviations); the select triggers computed-equal; the
> brand block parity (badge 40×40 rounded-2xl, the 135deg gradient
> wordmark, the tagline); the mobile header interior decoded at 390px
> on both apps (the round's core); the sidebar nav rows + the Profile
> card + the footer existence decoded at 1280 on both apps; the toast
> component's stock classes decoded from the reference's own bundle
> (never observed rendering live — the Session-131 DOM-dead doctrine
> re-checked); the logged-in and logged-out root-route behaviors probed
> on both apps; `bun audit` ZERO (the five-override posture holds).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `861636a` = WH-29 shipped at `73d0aea` + the operator's
session-log push):** lint 0/0 · tsc 0 · unit **362/362 (25 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **67/67** · census MATCH —
the exact documented WH-29 ship state. **Plus the periodic `bun audit`
duty: ZERO vulnerabilities** (no drift since the WH-29 re-anchor).

**The audit method:** the standing watches re-run live, the shell
chrome's computed boxes decoded side-by-side on both apps (the WH-29
lesson-33 doctrine applied to the chrome: the surfaces the color probe
and the behavior battery never measured), the WH-29 diff re-reviewed
(`git diff 4da40cd..73d0aea` through the `skills/web-application`,
`skills/tdd` and `skills/agent-browser` lenses — clean), and the
reference's own bundle decoded for the toast component's stock classes.
Findings (by severity) — the WH-30 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH — the round's core** | **The mobile chrome family: the glass header's INTERIOR + the drawer sheet's own face** — the surfaces the WH-15 probe (which read the BAR's colors: bg-white/60, blur-24, the border) and the drawer battery (which reads the SHEET's width/links/lock) never decoded. Live-probed at 390px on both apps: (a) the header padding — the reference `px-6` (24px) vs ours `px-4` (16px), an 8px/side drift; (b) the interior structure — the reference wraps (trigger + title) in a `div.flex.items-center.gap-4` LEFT CLUSTER with no right-side element, while ours is `justify-between` + a `SPAN.w-10` right-side spacer → the title's left edge computes **68px on the reference vs 126px on ours** (a 58px drift — the loudest mobile deviation, on every page); (c) the trigger — the reference `h-7 w-7 p-2 rounded-lg hover:bg-gray-100` (28×28, radius 8px) with `[&_svg]:size-4` (16px) ink rgb(10,10,10) icon + the sr-only "Toggle Sidebar" span, vs ours `h-10 w-10 rounded-md hover:bg-sidebar-hover` (40×40, radius 6px) with an h-5 w-5 (20px) gray-500 rgb(107,114,128) icon + aria-label + a REDUNDANT sr-only "Open navigation" span (aria-label wins — two competing names, the span is dead weight). The reference's 28×28 passes WCAG 2.5.8's 24px floor (our "44px" doc claim was already inaccurate at 40px — F-7); (d) the drawer sheet — the reference's sheet carries `gap-4 border-r [&>button]:hidden` + `sm:max-w-sm w-[--sidebar-width]`: its close X is **HIDDEN** (display:none, the authored arm — verified: `document.querySelector` on the open sheet reads display none; the drawer closes via Escape/scrim/route-change only), its content a flex column at 16px gaps with a 1px right border; OURS renders the X VISIBLE (a rendered-face superset with no ledger row — the F-4 class) at `border-0` with no gap (the header-to-first-link spacing computes 50px vs the reference's 61px, and the initial focus differs with it: the reference's focus falls to the sheet div, ours to the visible X) | `src/lib/page-layout.ts` (MOBILE_HEADER, MOBILE_NAV_SHEET) · `src/components/layout/app-shell.tsx` · `tests/e2e/a11y.spec.ts` (the two drawer walks' close mechanism) | The MOBILE_HEADER record gains the interior members (the wrapper `flex items-center gap-4`, the trigger `h-7 w-7 p-2 rounded-lg hover:bg-gray-100` + the 16px ink icon) + `px-4`→`px-6`; the app-shell conversion (the wrapper div, the spacer span + the redundant sr-only span RETIRED, the trigger's new form). The sheet gains the reference's `gap-4 border-r [&>button]:hidden` arms (w-72 stays — computed-equal to w-[--sidebar-width] at 288px). OUR kept supersets: the aria-expanded/controls/haspopup attrs, the focus-visible ring, the pointer-events-none toast viewport (the reference's own hamburger is unclickable on its redeployed build — deliberately not mirrored). The a11y spec's two drawer walks close via Escape (the Close button is hidden — the reference's own mechanism) |
| F-2 | **MEDIUM** | **The sidebar nav row family** (desktop + drawer — never geometry-probed): the reference's rows compute **32px tall** (`h-8` capping `py-3`) with **16px icons** (`[&>svg]:size-4`), `hover:bg-gray-50` (#f9fafb) and `transition-all duration-300`; ours compute **40px desktop** (`py-2.5`, uncapped) / **44px drawer** (`py-3`, uncapped) with 20px icons (`h-5 w-5`), `hover:bg-sidebar-hover` (#f4f4f5) and `transition-colors`. The ACTIVE pill's gradient/text/shadow are computed-EQUAL (the WH-15 pins hold) — only the row geometry rides the family, plus our active pill's `hover:opacity-95` arm (the reference's active carries no hover arm) | `src/lib/page-layout.ts` (NAV_LAYOUT, MOBILE_NAV_SHEET) · `src/components/layout/{sidebar,mobile-nav}.tsx` | The row records converge on the reference's form: `h-8` + `py-3` + the icon `h-4 w-4` + `hover:bg-gray-50` (+ our dark twin) + `transition-all duration-300`; the active pill keeps its gradient family and drops the hover:opacity-95 arm |
| F-3 | **MEDIUM** | **The Profile card** (the desktop sidebar footer + the drawer's footer entry): the reference renders the AVATAR-CARD anatomy at both sites — `a > div.flex.items-center.gap-3.p-3.rounded-xl.hover:bg-gray-50.transition-colors` carrying the `w-10 h-10 rounded-full` avatar with the INLINE 135deg indigo→purple gradient + the white lucide User icon at `w-5 h-5`, then `flex-1 min-w-0` with `p.font-medium.text-sm.truncate.text-gray-900` + `p.text-xs.truncate.text-gray-500` — inside the footer container `flex.flex-col.gap-2.border-t.border-gray-100.p-4` (64px tall). OURS: the desktop footer a bare lucide icon + the two-line text (54px, no avatar); the drawer a 36px-circle icon row. Three different faces across the two apps and the two sites | `src/lib/page-layout.ts` (a new PROFILE_CARD record; NAV_LAYOUT.footerGroup/footerLink retire) · `src/components/layout/{sidebar,mobile-nav}.tsx` + `nav-config.ts` (the User icon) | The shared PROFILE_CARD record (the decoded classes + our dark twins) consumed at BOTH sites; the footer container converges on `flex flex-col gap-2 border-t border-gray-100 p-4` (+ the dark twin) |
| F-4 | **MEDIUM — the lesson-33 class** | **The APP_FOOTER existence** — our `© 2026 Wellness Hub · Made with 💜 for your wellbeing` strip renders inside MAIN on every module page; the reference carries **ZERO footer elements on every page probed** (Goals/Dashboard/StudyResources — the body ends at the content, `document.querySelectorAll("footer")` = 0). The footer is a CRM-chassis inheritance (the app-shell comment says "the chassis placement") that NO round ever wrote a PAD §11 row for — the WH-29 lesson-33 class verbatim: a superset face shipped without a ledger row is a bug nobody can defend. It survived twenty-nine rounds because the WH-20 round CURED its dark pairs (treating it as a keeper surface) instead of asking whether it should exist | `src/lib/page-layout.ts` (APP_FOOTER) · `src/components/layout/app-shell.tsx` · `tests/e2e/a11y.spec.ts` (the WH-20 dark-footer leg) | **RETIRED**: the APP_FOOTER record + the app-shell `<footer>` block + the dark-footer e2e leg + the docs' references (SKILL §8's footer walk passage, PAD §11's WH-20 row gains the retirement note). The retirement is the parity cure — the reference's pages simply end |
| F-5 | **LOW — document-only** | **The toast card anatomy** — decoded from the reference's own bundle (the stock shadcn Radix toast: `rounded-md border p-6 pr-8 shadow-lg` + `items-center justify-between space-x-4 overflow-hidden transition-all` + the swipe/animate arms; the title `text-sm font-semibold`; the description `text-sm opacity-90`; the close the stock `h-8 px-3` bordered ToastClose). OURS is the hand-rolled `rounded-xl p-3.5 items-start gap-3` + `text-sm font-medium` + `text-xs text-muted` + the bare p-1 X + the variant icons. **The Session-131 doctrine re-checked and standing**: the reference's toast system is DOM-DEAD (the component tree + the empty viewport render in the bundle/DOM, but ZERO toasts observed on any trigger path — the WH-26 viewport finding was the empty container) — no live face to parity; our toast is the functional superset (the WH-20 contrast pins, the variant signal, the hover-pause) | `docs` only (PAD §11) | A PAD §11 deviation row: our superset toast face documented against the reference's own (never-observed-rendering) stock anatomy, the bundle decode recorded. No code change — the Session-131 retirement doctrine stands |
| F-6 | **LOW — document-only** | **The root-route behavior** — live-probed both ways on both apps: the reference serves the DASHBOARD AT `/` when authenticated (the path stays `/`, "Welcome Back!" renders there) and bounces guests to `/login?from_url=<absolute-root-url>` (its client-side guard); OURS 307s `/` → `/Dashboard` (authed) and `/` → bare `/login` (guest — no from_url on the ROOT bounce; the (app) group's GuestLoginRedirect carries it). The rendered faces are identical in all four cases; the URL surface differs (the post-login address bar: `/` vs `/Dashboard`). The WH-1 root-page comment ("A server redirect models both") documented the MODELING, never the deviation | `docs` only (PAD §11) — `src/app/page.tsx` unchanged | A PAD §11 deviation row: the URL-surface difference + the modeling note + the from_url gap on the root bounce. No restructure — rendering the dashboard at `/` would add a third dashboard route surface with SEO/canonicalization costs the reference's SPA does not carry |
| F-7 | **LOW — the docs narration** | **The touch-target + icon-convention claims** — SKILL §8 says "44px minimum on mobile (the drawer trigger is h-10 w-10 + padding…)" — inaccurate twice over (h-10 = 40px; no padding). AGENTS + SKILL say "sidebar nav icons uniform `h-5 w-5` stroke-2" — the reference's nav icons compute 16px (`[&>svg]:size-4`). After F-1/F-2 the claims need the reference-matched truth | SKILL §8 + AGENTS (the conventions lines) | The touch-target claim re-anchored at the WCAG 2.5.8 24px floor (the reference-matched 28×28 trigger passes; the nav pills ride the 32px rows); the icon convention re-anchored at the reference's 16px nav icons (`h-4 w-4`), the content-icon line unchanged |

**The positive findings (the round's clean classes — verified, not
assumed):** the mobile drawer battery byte-parity on BOTH apps (the
288px sheet, 11 byte-identical capitalized hrefs, the lock, escape,
viewport-grow auto-close); the drawer close button + sheet structure
byte-identical (the `absolute right-4 top-4` X at 16×16 on both); the
brand block parity (the 40×40 rounded-2xl badge, the 135deg gradient
wordmark at 18px, the tagline); the active pill's gradient/text/shadow
computed-equal; the dashboard tiles + KPI rows byte-parity (modulo the
reference's own mood row); the Goals page parity (the two documented
WH-29 deviations unchanged); the select triggers computed-equal
(border-line = border-input, 160×36 both); the h1 gradients
computed-equal (the oklab form); the watch round 18 STABLE (the
standing maps hold un-re-probed per the doctrine); the standing blocks
re-checked (the lesson-32 doctrine); `bun audit` ZERO; the SEO surfaces
serving (sitemap/robots/manifest 200 through the smoke ladder); the
baseline gate fully green pre-remediation.

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 25 | **25** | none — the pins ride existing suites |
| Unit checks | 362 | **364** | +2: the shell-geometry census block (the MOBILE_HEADER interior + the NAV row family + the PROFILE_CARD consumption, one block) + the footer-retirement census block (APP_FOOTER gone, no `<footer>` in the app tree) |
| E2E checks | 67 | **68** | +2 −1: the (m) mobile-header interior leg (mobile-navigation.spec.ts — the computed geometry at 390px: the 24px padding, the 28×28 trigger at radius 8px, the 16px ink icon, the 68px title X, no spacer span) + the (n) shell chrome leg (shell.spec.ts — the 32px nav rows, the 16px icons, the 40×40 avatar, NO footer element) − the WH-20 (c) dark-footer leg (RETIRED with the footer) |
| §8.1 rows | wellness 7/93 · infra 12/160 · CRUD 21 | recompute at RED (the infra row +2, the e2e rows re-bucketed) | the measured value flips CANONICAL in the same commit |
| Captures | 34 | **34** | re-based; expected MOVERS: essentially every page capture (the sidebar rows shrink 40→32px on all desktop pages, the footer strip vanishes from all of them, the mobile header re-clusters on all mobile captures) — the round's largest capture re-base since WH-15; the 32/33 form-interior procedure-state class should VANISH (the committed procedure's first cross-round byte comparison — the WH-29 suggested-next (d)) |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 362→364,
e2eChecks 67→68) land with every doc site in the SAME commit. If the
RED run lands a different exact count, the measured value flips
CANONICAL in the same commit — the doctrine is lockstep, not prophecy.

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full: the MOBILE_HEADER/NAV_LAYOUT/
MOBILE_NAV_SHEET/APP_FOOTER records, the app-shell header + footer
blocks, the sidebar nav + footer components, the mobile-nav drawer +
its footer entry, nav-config's NAV_FOOTER_ITEMS icon, the WH-28
shell-tag census pins (the h1/h2 tags — untouched by the interior
conversion), the WH-15 shell-record census pins (the literal updates
the cure forces), the WH-20 dark-footer + toast-hover legs, the WH-12
pass-site + WH-9 props census scopes, the docs-counts CANONICAL, the
globals.css v3 palette pin block (gray-50/100 presence), the
interaction-arm dark-pair census's exemption list (the new
hover:bg-gray-50/100 arms need dark twins).

### WP-1 — RED (the pins before the cures)
1. `tests/src-census.test.ts` +2 blocks:
   - the **shell-geometry census** (WH-30): MOBILE_HEADER.bar carries
     `px-6`; the record gains the interior members (the wrapper
     `flex items-center gap-4`, the trigger `h-7 w-7 p-2 rounded-lg
     hover:bg-gray-100`, the icon `h-4 w-4` + the ink) consumed at
     app-shell; NO `w-10` spacer span in the header; NAV_LAYOUT.link/
     linkActive + MOBILE_NAV_SHEET.link/linkActive carry `h-8` + the
     16px icon + `hover:bg-gray-50` (+ the dark twins) +
     `transition-all duration-300`; the active pill carries NO
     hover:opacity arm; the PROFILE_CARD record (the avatar anatomy)
     consumed at BOTH the sidebar footer and the drawer footer;
   - the **footer-retirement census** (WH-30): APP_FOOTER absent from
     page-layout.ts; no `<footer` element anywhere in src/; app-shell
     carries no APP_FOOTER import.
2. `tests/e2e/mobile-navigation.spec.ts` +1 test: the (m) leg — at
   390px the header's computed paddingLeft 24px, the trigger box 28×28
   at borderRadius 8px, its svg 16×16 at rgb(10,10,10), the title's
   bounding x ≈ 68px (the left-cluster geometry), no right-side
   spacer element.
3. `tests/e2e/shell.spec.ts` +1 test: the (n) leg — the nav rows'
   computed height 32px with 16px svgs, the Profile card's 40×40
   rounded-full gradient avatar, `footer` count ZERO on the page.
4. `tests/e2e/a11y.spec.ts`: the WH-20 (c) dark-footer leg RETIRED
   (the footer no longer exists).
5. The CANONICAL flips (362→364, 67→68) + the §8.1 rows. Full unit
   RED run at exactly the expected causes.

### WP-2 — GREEN (the cures)
1. F-1: `page-layout.ts` — MOBILE_HEADER.bar `px-4`→`px-6` + the new
   interior/trigger/icon members (+ the probe provenance comment + our
   dark twins); `app-shell.tsx` — the wrapper `div.flex.items-center.
   gap-4` around (trigger + h1), the spacer SPAN retired, the
   trigger's new class family (keeping our aria attrs + the ring).
2. F-2: NAV_LAYOUT + MOBILE_NAV_SHEET — the link/linkActive records at
   `h-8` + `py-3` + the icon `h-4 w-4` + `hover:bg-gray-50` + the
   dark twins + `transition-all duration-300`; the active pill's
   `hover:opacity-95` retired; sidebar.tsx + mobile-nav.tsx consume.
3. F-3: the PROFILE_CARD record (the p-3 rounded-xl card, the w-10
   h-10 rounded-full gradient avatar + the white User `h-5 w-5`, the
   truncate title/subtitle pair, the `flex flex-col gap-2 border-t
   border-gray-100 p-4` container + our dark twins); nav-config's
   footer item gains the User icon; both consumption sites convert.
4. F-4: the APP_FOOTER record + the app-shell footer block retired.
5. globals.css: the gray-50 pin joins the v3 block if the WH-14
   census fires (gray-100/900/500 expected present already).
6. Live verification on the dev server at the reference's computed
   values: the header's 24px padding + the 68px title X + the 28×28
   trigger at 8px radius with the 16px ink icon; the 32px nav rows
   with 16px icons on desktop AND in the drawer; the 64px Profile
   card with the 40×40 avatar at both sites; NO footer on any page;
   the dark twins verified through the real Profile UI flip +
   reverted.

### WP-3 — the e2e/audit verification
The (m)/(n) legs + the standing battery re-run; the a11y net's
zero-violation walk (the smaller trigger + rows must not trip
target-size at WCAG 2.2 AA — 28/32px ≥ the 24px floor; the avatar
icon + the header ink re-checked); the console-hygiene net on the
touched shell routes.

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **364/364 (25 suites)** · build OK · smoke
14/14 · e2e **68/68** · db census MATCH · `bun audit` zero (the
networked posture check, outside the gate per the doctrine).

### WP-5 — the docs ladder
PAD §11 (the F-1..F-4 retirement/cure rows + the F-5 toast deviation
row + the F-6 root-route deviation row + the WH-20 footer row's
retirement note), PAD §8.1 (the recomputed rows), AGENTS (the
shell-chrome doctrine passage + the icon-convention re-anchor + the
touch-target re-anchor + the counts), SKILL v1.27.0 → **v1.28.0**
(§8's WH-30 passage + **lesson 34**: "the shell chrome is a probe
surface like any other — the WH-15 identity round mapped the chrome's
COLORS and the e2e battery pinned its BEHAVIOR, but the computed BOXES
(padding, wrapper structure, row heights, icon sizes, an element's
very EXISTENCE) shipped unmeasured through twenty-nine rounds; the
footer survived because a later round CURED its dark pairs instead of
asking whether it should exist — a keeper-surface assumption is a
deviation wearing a pin's clothes; and the loudest drift hides where
the probe's vocabulary stops: 'the header' is not one surface, it is
a bar + an interior + a trigger + an icon"), README + CLAUDE (the
counts), worklog WH-30 (top), the plan's execution record,
`docs/session_57.md`.

### WP-6 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set). The
34-file set re-taken through the COMMITTED procedure; the movers
root-caused (expected: the full desktop set — the nav rows + the
footer; the full mobile set — the header; the 32/33 procedure-state
class VANISHING is the round's own verification of the WH-29
suggested-next (d)); the md5 ledger re-based at 34 files.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--key-file <key outside
repo>` + `--remote git@github.com:nordeim/wellness-hub.git`, main
only) → remote verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-0** — validated: every cure site read; the shell-tag census
  pins confirmed untouched by the interior conversion (the h1/h2 tags
  keep their classes); the dark-pair census's scope confirmed to cover
  the new hover arms.
- **WP-1 RED** — the pins landed at exactly the expected causes: the
  shell-geometry census + the footer-retirement census (2 checks), the
  (m) header-interior leg, the (n) shell-chrome leg, the dark-footer
  leg's retirement, the CANONICAL flips (362→364, 67→68) — the full
  unit RED at the 2 census + 6 docs-counts sites.
- **WP-2 GREEN** — the MOBILE_HEADER record (the bare px-6 bar + the
  interior/trigger/triggerIcon members) + the app-shell conversion;
  the NAV_LAYOUT/MOBILE_NAV_SHEET rows at the 32px h-8 family; the
  SIDEBAR_HEADER/SIDEBAR_NAV_ZONE/SIDEBAR_FOOTER_ZONE records + the
  three-zone conversions; the PROFILE_CARD record + the shared
  component at both sites; the sheet's border-r + hidden-X + the inner
  column; the footer retirement (+ its two dead tokens + the orphaned
  scrollbar-thin @utility). SEVEN mid-WP census catches cured: the
  mis-targeted pin sites (the zone consts vs object members; the
  app-shell vs sidebar consumption sites), the WH-15 shell census's
  member collision (the helper went BLOCK-SCOPED — PROFILE_CARD.title
  vs MOBILE_HEADER.title), the WH-14 dead tokens (--color-sidebar-hover
  + --color-gray-800 + the .dark override), the WH-7 orphaned
  @utility, the nav-source test's ProfileCard share, the trigger
  icon's flex-shrink (12px without shrink-0 — the reference's own
  [&_svg]:shrink-0 arm). ONE e2e catch: rounded-full serializes
  3.35544e+07px in the standalone build (the leg parses the number).
- **LIVE-VERIFIED** on the dev server at the reference's computed
  values: the header (padL 24px, the trigger 28×28 at radius 8px, the
  icon 16×16 ink rgb(10,10,10), the title at x=68, no right element);
  the desktop rows (32px, 16px icons, the divider 1px, the avatar
  40×40 + the 20px User, footers 0, the footer zone pinned at the
  aside bottom); the drawer (the X display:none, the border-r 1px
  rgb(229,229,229), the sheet 288px, the rows 32px/16px, the avatar
  40px, the header divider 1px, the footer zone pinned to the sheet
  bottom, 11 links, the initial focus on the sheet div, Escape closes
  + unlocks); the dark twins through the real Profile UI (the dividers
  neutral-800, the trigger ink #fafafa, the nav hover wash
  rgb(38,38,38) under a REAL pointer hover); the census MATCH after.
- **WP-3/WP-4** — the full gate GREEN: lint 0/0 · tsc 0 · unit
  **364/364 (25 suites)** · build OK · smoke **14/14** · e2e **68/68**
  (the (m)/(n) legs passing; the a11y net's drawer walks closing via
  Escape; the target-size rule clean at the 28×28 trigger).
- **WP-5 docs** — PAD §11's four WH-30 rows + the WH-20 row's
  footer-leg retirement note + §8.1 recomputed (infra 12/162;
  mobile-nav 7, shell 8, a11y 20); AGENTS (the shell-chrome doctrine +
  the icon-convention + touch-target re-anchors + the counts); SKILL
  v1.27.0→v1.28.0 (§8's WH-30 passage + LESSON 34 + the re-anchors);
  README + CLAUDE (the counts); the worklog WH-30 entry; this record;
  docs/session_57.md.
- **WP-6 captures** — the doctrine LIVE; the committed procedure's
  FIRST cross-round run, with 27-dark-mood-form JOINING the procedure
  (the WH-26 ad-hoc file's procedural home; 34 procedural captures).
  **6 byte-stable + 28 movers (all root-caused)**: 27 EXPECTED CURES
  (the shell chrome on every page capture — the light desktop set's
  diffs confined to the sidebar column; the mobile set's to the header
  cluster + the drawer's face; the dark set; the interiors' shells;
  the hovers' shells; the mood list's shell) + 1 PROCEDURE-STATE
  (25-dark-login-focus, the ring's interpolation instant at 0.007%).
  The md5 ledger re-based at 34 files, the full-set verification
  0 mismatches.
- **WP-7** — the commit + the SSH-wrapper push (main only), the key
  shredded after.

**Suggested next (for WH-31):** (a) the standing blocks re-check (the
sr list-side chip + the four list interiors — the lesson-32 doctrine);
(b) the watch round 19 (/assets/ shape); (c) the reference-side earned
tile (still zero rows); (d) the reference's sidebar UL/LI menu-item
wrappers (the mechanism difference documented in this plan's scope —
our nav/list semantic is the a11y-equivalent form; a future round may
decode whether the reference's a11y tree reads differently).
