# Session-31 Remediation Plan — the redeployment-watch round (WH-31)

**Task ID:** WH-31 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** the WH-30 plan's own suggested next, executed against a
reference that DID move: **the compiled-CSS watch round 19 flipped** —
`/assets/index-heGLHP2e.css` → `/static/index-s8d1FO8M.css` (the PRE-round-16
content hash — the stylesheet content is byte-identical, the PATH SHAPE moved
back), the JS bundle is NEW (`index-5-N3MB6y.js`, was `index-Bn9GF0-W.js`),
and the platform now loads `cdn.tailwindcss.com` (the Tailwind Play CDN —
runtime-compiled classes) plus `/api/frontend-config.js?v=3`. A redeployment
resets every standing map (the lesson-30 doctrine) — so the round's first
duty was the FULL re-verification walk, surface by surface, live on the new
build. **The walk's outcome: every standing map holds BYTE-PARITY** (the
ledger below) — the redeployment is a platform rebuild (same faces, new
pipeline), not a redesign. With the visual/behavioral maps quiet, the audit
turned to the one layer no round ever decoded: **the a11y TREE** — the
WH-30 suggested-next (d), the mechanism difference its plan scoped but
never decoded: what does each app's navigation read like in the
accessibility tree? The answer is the round's core finding (F-1).

> **Reference probe (24 passes; writes = ZERO on the reference — every
> surface read at rest; on OUR app the drawer batteries on both sides,
> all reverted):** the watch round 19 (the CSS hash + the JS bundle + the
> CDN script); the mobile header interior at 390px (padL 24px, the
> 28×28 r8 trigger, the 16px ink icon, the title at x=68, one child);
> the drawer battery (the 288px sheet, the border-r 1px
> rgb(229,229,229), the X display:none, the 11 capitalized hrefs, the
> 32px rows, the initial focus on the sheet div, escape-close, the
> viewport-grow auto-close, the scroll lock); the desktop nav rows (32px,
> 16px icons, transition-all .3s); the Profile avatar card (40×40); the
> footer absence (0 footer elements); the dashboard (the tiles 0/1/0/0,
> the Quick Actions grid-cols-2 at 12px gap with h-24 cells, the 💚 feed
> row at its entity date); the Goals page ("Badges Earned 0 of 0", the
> bare empty-state paragraph — suggested-next (c) still blocked); the
> StudyResources page (zero rows, the "Upload File (optional)" field in
> the INLINE form, no overlay); the MentalHealth page (1 entry, 5.0/10,
> streak 1; the mood form's mb-4 label, the min=1 8px slider, the h-24
> reflection, inline); the Learning page (12 cards, the opacity-0 Watch
> Now, the outline DIV chips at border rgb(229,229,229) with no shadow);
> the Profile page (the 960px tablist, the 3 tabs, the mt-2 panels, the
> native 20px checkboxes, the Radix comboboxes, the preset cards with
> the Active marker, the Background Image section); the login family
> (the h1 30px/700, the 48×368 r12 inputs, the 48px submit — both apps
> identical); the login card glass (bg-white/95, blur(4px), r16 — the
> --blur-sm pin's own surface); the Events calendar (the outline trio,
> the gap-2 grid, 31 cells); the Routines cards (11 templates, the
> visible overflow, the h-2 strip's square corners); the Exercise H1
> gradient (to right, rgb(234,88,12) → rgb(220,38,38), 36px/700 — both
> apps); the Schedule modal (672px, no Cancel, the solid purple-500 24px
> circles, the Remember inset); the Assignments zero-row omission; the
> sidebar + drawer a11y TREES on both apps (the round's core);
> `bun audit` ZERO (the five-override posture holds).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
cloned tree at `71df19e` = WH-30 shipped at `c7532c8` + the operator's
session-log push):** lint 0/0 · tsc 0 · unit **364/364 (25 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **68/68** · census MATCH —
the exact documented WH-30 ship state. **Plus the periodic `bun audit`
duty: ZERO vulnerabilities.**

**The audit method:** the watch re-run live (round 19 — the
redeployment caught same-session), the lesson-30 redeployment walk
applied in full (15+ standing surfaces re-probed computed-style on the
NEW build, both apps side-by-side), the WH-30 diff re-reviewed
(`git diff 861636a..c7532c8` through the `skills/web-application`,
`skills/tdd` and `skills/agent-browser` lenses — the shell records, the
layout conversions and the census pins all clean), the a11y trees
decoded on both apps (the agent-browser accessibility snapshot — the
suggested-next (d) answer), and the instruction's checklist items
verified on the tree (.env/db contract, vitest+playwright configs, the
sitemap/robots/manifest/OG surfaces live, the Tailwind v4 pins present,
`.env.example` tracked and accurate).

Findings (by severity) — the WH-31 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **LOW — the round's core, document-only + a standing pin** | **The shell's a11y TREE decoded (the WH-30 suggested-next (d) answered): the reference ships NO landmarks anywhere** — its desktop sidebar is an anonymous `generic` wrapper carrying `h2` + `list > listitem[level=1] > link` (the shadcn Sidebar `peer/menu-button` / `group/menu-item` family), its drawer the same list form inside the `dialog`; its nav-link icons are **NOT aria-hidden** (every link exposes an unlabeled `image` node in the tree). OURS: `complementary` (the `<aside>`) > `navigation "Main navigation"` (the `<nav aria-label>`) > text-only links (icons `aria-hidden="true"`) — at BOTH nav sites (sidebar + drawer), with `aria-current="page"` on the active row. Same pixels, different trees. Ours is the WCAG-superior form (landmark navigation is jumpable by AT; clean accessible names; both pass axe at AA — the reference's tree is valid-but-anonymous, ours is valid-and-named). The class: a superset that lives in the SEMANTIC layer, invisible to every computed-box probe (which reads geometry) and to the axe net (which reads violations, not shape) | `src/components/layout/sidebar.tsx` + `mobile-nav.tsx` (already correct) · `docs/Project_Architecture_Document.md` §11 (the deviation row) · `tests/e2e/a11y.spec.ts` (the drift-guard pin) | **Document + pin, do NOT match**: a PAD §11 deviation row (the decoded trees, both directions); the **(o) e2e leg** — the a11y-tree drift guard asserting OUR form (the `complementary` + `navigation` landmarks at both sites, the aria-hidden icons, the aria-current active row) so a future round cannot "fix" the superset toward the reference's landmark-free form (the WH-27 (l) standing-pin precedent: the pin exists for the NEXT redeployment) |
| F-2 | **LOW — document-only** | **The watch round 19 event**: the reference redeployed — the CSS path shape moved BACK (`/assets/index-heGLHP2e.css` → `/static/index-s8d1FO8M.css`, the pre-round-16 content hash), the JS bundle is new (`index-5-N3MB6y.js`), and the platform added `cdn.tailwindcss.com` (the Tailwind Play CDN — runtime-compiled classes) + `/api/frontend-config.js?v=3`. The full lesson-30 walk re-verified every standing map BYTE-PARITY on the new build (the ledger in the probe block): the redeployment is a platform rebuild, not a redesign. The watch doctrine's shape note: BOTH path shapes (`/static/` and `/assets/`) have now been observed across builds — the watch must keep matching both (the WH-30 note already pins this) | `docs/Project_Architecture_Document.md` §11 (the watch row updated to round 19) · AGENTS.md (the watch note) | The watch row + the AGENTS note updated with the round-19 record (the redeployment, the CDN pipeline, the all-maps-hold outcome) |
| F-3 | **LOW — positive findings, verified** | The standing blocks (suggested-next (a)): re-checked — the sr list-side chip + the four list interiors still zero-row, the demo account still carries ONLY the one mood row. The earned tile (suggested-next (c)): still reference-side-blocked ("Badges Earned 0 of 0 total" — no operator write). The instruction's mobile-menu emphasis: the drawer battery verified BYTE-PARITY on BOTH apps this session (the 288px sheet, the hidden X, the border-r, the 32px rows, the 11 hrefs, escape, auto-close, the scroll lock). The Tailwind v4 pins all present in `globals.css` (the hover unwrap, the dark variant, `--shadow-sm`, `--blur-sm`, the three `@source not`); no new v4 bug class surfaced (the reference's own CDN pipeline change does not affect our compiled build) | — | No action (the standing doctrine — each new demo row opens one block) |

**No MEDIUM/HIGH findings.** The WH-30 cures survive the redeployment
byte-for-byte; the codebase audit (the WH-30 diff + the tree) is clean;
all instruction checklist items verified standing.

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 25 | **25** | none |
| Unit checks | 364 | **364** | none — the CANONICAL literal flip (`e2eChecks` 68→69) rides the existing docs-counts suite |
| E2E checks | 68 | **69** | +1: the (o) a11y-tree drift-guard leg (`a11y.spec.ts` — the landmark form at both nav sites, the aria-hidden icons, the aria-current row) |
| §8.1 rows | a11y 20 | **a11y 21** | the measured value flips CANONICAL in the same commit |
| Captures | 34 | **34** | the second cross-round byte comparison under the committed procedure — expected ALL byte-stable (zero code changes to rendered faces, the reference's faces unchanged): the round's own proof that the redeployment moved nothing |

CANONICAL flips in `tests/docs-counts.test.ts` (e2eChecks 68→69) land
with every doc site in the SAME commit. If the RED run lands a
different exact count, the measured value flips CANONICAL in the same
commit — the doctrine is lockstep, not prophecy.

---

## 3. Work packages

### WP-0 — plan validation (done pre-write, re-checked post-write)
Every cure site read in full: the a11y.spec.ts structure (the 20
existing tests, the (l) leg's placement pattern for the new (o) leg),
the sidebar.tsx + mobile-nav.tsx a11y surfaces (the `<aside>`, the
`<nav aria-label>`, the aria-hidden icons, the aria-current rows — all
already correct), the docs-counts CANONICAL block, the PAD §11 ledger
rows + §8.1 table, the AGENTS watch passage, the SKILL §8 + §12
(lesson 34 — lesson 35 lands after it), the capture-round.mjs procedure
(the 34-file set, the doctrine phases).

### WP-1 — RED (the pins before the cures)
1. `tests/docs-counts.test.ts`: the CANONICAL flip (`e2eChecks`
   68→69) — the full unit RED lands at exactly the docs-counts sites
   (the count-ladder doctrine: the flip precedes the leg so the suite
   can never pass with a stale count).
2. `tests/e2e/a11y.spec.ts` +1 test: the **(o) leg** — the shell's
   a11y tree: the desktop sidebar exposes `complementary` (the aside)
   wrapping `navigation` (the nav with `aria-label="Main navigation"`)
   whose links carry `aria-hidden="true"` icons; the drawer's sheet
   (role `dialog`) exposes the SAME `navigation` landmark; the active
   row carries `aria-current="page"`; the reference's decoded tree
   (the landmark-free `list > listitem > link` form, the
   not-aria-hidden icons) recorded in the leg's comment as the
   deliberate divergence. GREEN-on-landing is expected and correct
   (the WH-27 (l) standing-pin precedent — the pin guards the NEXT
   redeployment, and the RED side of this round is the count ladder).

### WP-2 — GREEN (the cures)
No code cures — the finding is document-only + the pin. The (o) leg
IS the deliverable. If the leg lands RED at an unexpected site, that
is a finding (cure it before proceeding).

### WP-3 — the e2e/audit verification
The (o) leg + the standing battery re-run (68+1 = 69); the console
net + the axe walks on the touched routes.

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **364/364 (25 suites)** · build OK · smoke
14/14 · e2e **69/69** · db census MATCH · `bun audit` zero (the
networked posture check, outside the gate per the doctrine).

### WP-5 — the docs ladder
PAD §11 (the F-1 a11y-tree deviation row — the decoded trees, both
directions, our superset named; the F-2 watch row updated to round 19
— the redeployment, the CDN pipeline note, the all-maps-hold outcome),
PAD §8.1 (the a11y row 20→21), AGENTS (the watch note updated to
round 19 + the a11y-tree doctrine sentence in the shell-chrome passage
+ the counts), SKILL v1.28.0 → **v1.29.0** (§8's WH-31 passage +
**lesson 35**: "the a11y TREE is a probe surface of its own — the
computed-box probes read geometry, the axe net reads violations, but
neither reads the tree SHAPE: the reference ships its nav as an
anonymous `list > listitem > link` with NOT-aria-hidden icons (zero
landmarks anywhere in the shell); ours ships `complementary` +
`navigation` + hidden icons. Same pixels, different trees — and a
semantic superset needs a PIN to stay deliberate: the 'fix it toward
the reference' temptation is exactly how supersets die" + the counts),
README + CLAUDE (the counts), worklog WH-31 (top), the plan's
execution record, `docs/session_59.md`.

### WP-6 — captures
The doctrine LIVE (badgesEarned=0 asserted before the light set). The
34-file set re-taken through the COMMITTED procedure — the second
cross-round byte comparison: expected ALL 34 byte-stable (the round
changed zero rendered faces). Any mover is root-caused before the
ledger re-base (a mover here would falsify the round's own
conclusion — treat it as a finding, not noise). [Ship-time note: two
movers landed and were root-caused as the cross-session
headless-Chromium rasterization class — sub-visible (0.0014% /
0.0004%), stable across this session's takes; see the execution
record.]

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--key-file <key outside
repo>` + `--remote git@github.com:nordeim/wellness-hub.git`, main
only) → remote verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-0** — validated: every cure site read; the (o) leg's placement
  pattern confirmed against the (l) leg; the a11y surfaces confirmed
  already-correct in both nav components.
- **WP-1 RED** — the CANONICAL flip landed; the full unit RED at the
  expected docs-counts sites.
- **WP-2 GREEN** — the (o) leg landed with ONE mid-WP catch: the leg's
  own first expectation mis-counted the nav (the nav carries the 10
  MODULE links — the ProfileCard is the footer zone's 11th, OUTSIDE the
  nav landmark); the leg now pins the true structure at both sites
  (nav 10 + the ProfileCard link in the sheet's footer zone, outside
  the nav). GREEN after the fix; zero unexpected REDs beyond it.
- **WP-3/WP-4** — the full gate GREEN: lint 0/0 · tsc 0 · unit
  **364/364 (25 suites)** · build OK · smoke **14/14** · e2e **69/69**.
- **WP-5 docs** — PAD §11's two WH-31 rows + §8.1 (a11y 21); AGENTS
  (the round-19 watch note + the a11y-tree doctrine + the counts);
  SKILL v1.28.0→v1.29.0 (§8's WH-31 passage + lesson 35 + the counts);
  README + CLAUDE (the counts); the worklog WH-31 entry; this record;
  docs/session_59.md.
- **WP-6 captures** — the doctrine LIVE; the second cross-round byte
  comparison: **32/34 byte-stable** — the round's conclusion verified
  (the redeployment moved nothing; our tree changed zero rendered
  faces). TWO movers, both root-caused (the 25-dark-login-focus
  precedent class — sub-visible rendering instants, not face changes):
  10-learning (16/1,152,000 px, 0.0014%, max channel delta 7 — the
  first tutorial card's thumbnail edge; the Learning page carries the
  app's only photo thumbnails, where a headless-Chromium build's
  rasterization variance shows first) + 29-quick-actions-hover
  (5/1,152,000 px, 0.0004%, max channel delta 1 — the hovered tile's
  icon edge). Root cause: CROSS-SESSION headless-Chromium
  rasterization variance (the sandbox's fresh chromium_headless_shell
  install vs WH-30's build); both movers reproduced identically across
  this session's two takes. The md5 ledger re-based at 34 files with
  the WH-31 record, verified 0 mismatches.
- **WP-7** — the commit + the SSH-wrapper push (main only), the key
  shredded after.

**Suggested next (for WH-32):** (a) the standing blocks re-check (the
sr list-side chip + the four list interiors — the lesson-32 doctrine);
(b) the watch round 20 (BOTH path shapes — `/static/` and `/assets/`);
(c) the reference-side earned tile (still zero rows); (d) the
reference's `cdn.tailwindcss.com` pipeline worth one watch note per
round until stable (a runtime-compiled Tailwind can drift computed
values WITHOUT a bundle hash change — the watch may need a computed
spot-check companion if the platform keeps the CDN).
