# Session-17 Remediation Plan — the a11y-assertion round (WH-17)

**Task ID:** WH-17 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ fd19180`: WH-16 shipped at
`00f569b` — the console-hygiene round — plus the operator's session_29.md
transcript push), re-probe the live reference for new surfaces AND
seed-content/entity-API/compiled-CSS drift, fix every identified gap with
TDD, lockstep the five docs + `worklog.md`, and push.

> **Provenance note:** the reference did NOT redeploy since WH-16 — the
> compiled-CSS watch round 4 found the asset hash unchanged
> (`assets/index-heGLHP2e.css`, 89,409 bytes) and every content/behavior
> watch came back clean (identity map 11/11, drawer battery, seed 23/23,
> entity API 12/13/views:0, 404, placeholders, quick actions, login
> surfaces) — and the probe-preset protocol amendment held: the account's
> preset read CLEAN (Indigo Dream, `#6366f1→#a855f7` computed) at probe
> start. The round's findings are codebase-side again — led by the
> accessibility surface, which the gate has never read (the exact WH-16
> error class: a surface the gate never reads), and by the parity
> divergences the a11y walk EXPOSED on surfaces the pixel captures never
> diffed against the reference (the chip vocabulary and the Profile
> appearance panels — both captured at build time, never re-probed through
> the redesign).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
workspace at `fd19180`, environment carried over — `.env` present with the
relative `DATABASE_URL="file:../db/custom.db"`, `db/` seeded at the repo
root, Playwright browsers installed, the dev server alive from the prior
session):** lint 0/0 · tsc 0 · unit **325/325 (21 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **43/43** · db census MATCH
(users=1 templates=11 steps=50 tutorials=12 badges=8) · `bun audit` **ZERO**
— the exact documented WH-16 ship state, no flake. `.env` ↔ `.env.example`
parity verified (the AUTH_SECRET value only).

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 11 pages walked with computed-style H1 probes — every title
and every gradient stop byte-identical to the WH-15 identity map. The
compiled-CSS watch round 4: **hash UNCHANGED** (no redeployment). The
seed-content watch round 6: **23/23 byte-for-byte**. The entity-API shape
watch round 5 (HAR): **12 rows, 13 keys, `views: 0` on all 12**. The drawer
battery at 390×844: 11 items, the stays-open-after-nav quirk, the
scroll-lock nuance re-verified (`body{overflow:hidden}` while `html` still
scrolls). The 404, the Watch-Now placeholders (still href-less buttons),
the quick-action tiles and the login slate surfaces all unchanged. The
probe-preset check (the SKILL §11 amendment): **the account read CLEAN**
(brand family at the Indigo Dream default — no residue this round).

**The round's audit class — the accessibility surface, read for the first
time.** The method: a full axe-core walk (WCAG 2.1 A + AA tags) of every
module route + the login page + the open mobile drawer, on BOTH apps (the
reference walked with the same tags for the parity split), plus
computed-color/geometry probes of every flagged surface and every chip
vocabulary on both apps. Findings (by severity) — the WH-17 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH (parity + a11y)** | **The chip anatomy + vocabulary diverges from the reference's post-redesign chips — and every divergent pair fails WCAG AA.** Ours (the `OptionChip` primitive + the 13 `OptionMeta` vocabularies): `rounded-full px-2.5 py-0.5 text-xs font-medium` with `bg-*-50 text-*-600` pairs — emerald-600 on emerald-50 **3.58:1**, amber-600 on amber-50 **3.07:1** (axe `color-contrast`, 11 nodes on Routines + 19 on Learning). The reference (probed live this round, computed): the shadcn Badge anatomy `rounded-md border px-2.5 py-0.5 text-xs font-semibold` (radius 6px, 1px transparent border, no visible shadow, no visible hover) with `bg-*-100 text-*-700` pairs — **every one passes AA** (green 4.57, yellow 4.58, blue 5.49, purple 5.92, emerald 4.84, pink 5.14). The verified maps: Routines difficulty easy=`bg-green-100 text-green-700`, moderate=`bg-yellow-100 text-yellow-700` (NOT emerald/amber — different families); Learning categories productivity=blue, life_skills=pink, mental_health=emerald, wellness=green, study_skills=purple, exercise=orange (all -100/-700 — our map had amber/indigo/emerald/teal/blue/red, four wrong families); **Learning difficulties UNTINTED** (`text-foreground`, no bg — ours renders them as tinted chips). The vocabulary was "decoded live from the reference's DOM" at BUILD time (2026-10-29, constants.ts header) and never re-probed through the WH-15 redesign — the pixel captures pin OUR pages, not the reference's chips, and the H1/button/wash probes never touched the chip layer. | `src/components/shared/page-parts.tsx:136` (OptionChip) · `src/lib/constants.ts` (13 vocabularies) | Re-capture the anatomy + the verified vocabularies; migrate the unverifiable vocabularies (the empty-demo surfaces: workouts, moods, priorities, event/resource/reminder/goal vocabularies) to the same `-100/-700` system keeping our color families; the Learning difficulties go untinted. All pairs must pass AA (verified by the net) |
| F-2 | **HIGH (parity + a11y)** | **The Profile appearance panels still carry the pre-redesign shell, and the Theme Mode picker anatomy diverges — the active chips fail AA.** The reference (probed): every panel is the shadcn Card anatomy — `rounded-xl border bg-card border-none shadow-lg` + header `flex flex-col space-y-1.5 p-6` (title `font-semibold leading-none tracking-tight flex items-center gap-2` + the lucide header icons moon/palette/type/image/sparkles at `w-5 h-5`) + body `p-6 pt-0` (+ `space-y-6` on the multi-block panels). Ours: 8 panels hardcoded `rounded-xl border border-line bg-surface p-5 shadow-lg` with `h2 mb-3` titles (the build-era form — the WH-15 redesign's card anatomy reached every module page's SectionCard but never the Profile panels). The **Theme Mode picker**: reference = `grid grid-cols-3 gap-3` of `p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2` cards with `w-6 h-6` icons + `font-medium` labels — active `border-indigo-500 bg-indigo-50` (near-black text ≈ 15:1, FIXED palette classes not preset-themeable), inactive `border-gray-200 hover:border-gray-300`; ours = `flex flex-wrap gap-2` of `h-10 rounded-md border px-5` chips — active `border-primary bg-primary/10 text-primary` = indigo-500 on a 10% wash **3.71:1 (AA FAIL)**. The **preset cards**: reference `p-3 rounded-xl border hover:shadow-md transition-all text-left` (no visible active state); ours `rounded-lg … hover:-translate-y-0.5` + our superset active ring + the `text-primary` "Active" label (**4.1:1, AA FAIL** — the reference carries no such label). The **preview tile**: reference `p-6 rounded-xl text-white text-center font-semibold` (the gradient tile); ours a `text-xs text-muted` paragraph | `src/app/(app)/profile/profile-page.tsx:103-312` | Migrate the 8 panels to the reference's Card anatomy; the Theme Mode picker to the border-2 card grid (fixed indigo active pair); the preset cards to the reference anatomy with the Active label restyled to pass AA (`text-foreground`); the preview tile to the gradient form |
| F-3 | **MEDIUM (a11y, WCAG 2.5.3)** | **`label-content-name-mismatch` on the 12 Watch-Now overlay buttons** (axe, serious): each carries `aria-label={`Watch ${t.title}`}` — the accessible name does not contain the visible text "Watch Now" (the Label in Name rule). Our superset aria-labels; the reference's buttons carry none (its own axe run flags them `button-name` — the reference's own defect class). | `src/app/(app)/learning/learning-page.tsx:117` | `aria-label={`Watch Now: ${t.title}`}` — the visible text becomes part of the accessible name (the superset fixed properly) |
| F-4 | **MEDIUM (a11y, superset surface)** | **The Goals badge-catalog requirement text fails AA by a hair**: `text-muted` (#6b7280) on `bg-line-soft/40` = **4.48:1** (8 nodes). The badge catalog with requirement text is OUR functional superset (the reference renders an empty state "Achievements will appear here as you progress!" — live-verified this round), so no parity constraint applies. | `src/app/(app)/goals/goals-page.tsx:285,296` | The requirement/description text goes `text-foreground`-family (or the card wash lightens) — the superset surface, free to fix |
| F-5 | **LOW (parity + a11y)** | **The sidebar/drawer footer subtitle diverges and fails AA**: ours `text-subtle` (#9ca3af) = **3.1:1** (flagged in the open drawer — the mobile drawer's solid sheet resolves; the desktop sidebar rides the gradient wash where axe bails "incomplete"); the reference `text-gray-500` = **our `text-muted` token exactly** (#6b7280, ≈4.5:1 pass — computed-verified on both apps' desktop sidebars). | `src/components/layout/sidebar.tsx:72` · `src/lib/page-layout.ts:231` (`footerSubtitle`) | `text-subtle` → `text-muted` at both sites (the token keeps its other consumers: toast, font preview, energy line) |
| F-6 | **LOW (reference-shared — decided: the accessible superset)** | **The Profile inactive tab triggers fail AA at 4.35:1** (#737373 inherited from the track's `text-muted-ink` over the `bg-line-soft` strip) — and the **reference fails identically** (its own Profile axe run flags the same two triggers — the parity is exact and deliberate, `tabs.tsx` header documents it). The decision: we ALREADY supersede this surface's keyboard defect (the reference's `tabIndex=-1` tabs vs our roving tabindex — the tabs.tsx documented superset); the contrast superset is the same class. The README's "Accessibility superset" claim and SKILL §8's AA math stay false under the mirror. | `src/lib/page-layout.ts:404` (`TABS_SEGMENTED.track`) | The track's text goes to a passing neutral (`text-muted` fails too at 4.35 — the fix is the darker `text-neutral-600` ≈ 6.4:1, a fixed palette class joining the pin block); documented in tabs.tsx's header + the PAD known-issues ledger as the accessible superset over the reference's own failing pair |
| F-7 | **Systemic (the round's TDD feature)** | **No accessibility assertion layer anywhere in the gate** — the docs claim WCAG AA (README's superset row, SKILL §8's contrast math) but zero tests read semantics: exactly how the console-error class shipped fifteen green rounds (WH-16's lesson 20, one surface over). The family pattern exists (`skills/web-application/SKILL.md` §2: "A11y \| axe-core (Playwright) \| A11y assertions in the e2e suite, not just manual review"); axe-core shipped as a chassis devDep and was correctly retired at WH-3 as a zero-import — the return is justified ONLY with its live consumer. | `tests/e2e/` | The e2e a11y net: `tests/e2e/a11y.spec.ts` — three checks (the 11 module routes walked with AxeBuilder at WCAG 2.1 A+AA tags; the open mobile drawer at 390×844; the logged-out login page), strict zero violations post-fix (F-1..F-6 are the deterministic RED — this net IS reproducibly red pre-cure, unlike WH-16's timing race), the offender list (route + rule + target) in the failure message. `@axe-core/playwright@4.14.0` joins as a devDep WITH its live import (the dead-dep census stays honest) — `bun audit` verified ZERO with it installed. Plus the unit chip-vocabulary census (F-1's static contract) in `tests/src-census.test.ts` |

**Clean checks (no findings, documented):** the full baseline gate (43/43
e2e, no flake) · the reference probe's every watch (identity 11/11, seed
23/23, API 12/13/views:0, CSS hash unchanged, drawer battery, 404,
placeholders, quick actions, login surfaces, preset hygiene) · the WH-16
diff itself (the hydration suppressions canonical; the console net green)
· the mobile drawer e2e battery (6/6 in the gate) · the Tailwind v4 pins
standing (the hover unwrap, `--shadow-sm`, `--blur-sm`, the three
`@source not` directives) · the SEO family (sitemap.xml/robots.txt/
manifest.json route handlers + og-image.png + the per-route
`pageMetadata()` factory; smoke check 12) · the vitest + playwright
configs (gate-proven; the e2e db pinned) · `.env` ↔ `.env.example` parity
· `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root
(census MATCH) · `skills/` excluded from all gates · `bun audit` ZERO
(including with the new devDep) · our login page axe-CLEAN pre-fix (the
superset inputs all labeled, buttons named) · the reference's OWN a11y
state mapped for the parity ledger (its Dashboard carries a
`text-gray-400` contrast fail, its Learning an unnamed button, its
Profile four unnamed buttons + two unlabeled sliders + the tab-strip
fails — our superset is ahead on every one of those surfaces).

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the two new pins:** (a) the chip-vocabulary census check in `tests/src-census.test.ts` (every `OptionMeta` vocabulary's tint is `bg-*-100`/`bg-gray-100`/`bg-transparent` and its text is `text-*-700`/`text-gray-600`/`text-foreground`; the `OptionChip` anatomy carries `rounded-md border font-semibold` — the reference's Badge form, with the probe evidence in the narration); (b) the e2e a11y net `tests/e2e/a11y.spec.ts` (three checks as F-7 designs them). Flip docs-counts' `CANONICAL.unitChecks` 325→**326** AND `CANONICAL.e2eChecks` 43→**46**. RED verified: the census check fails on the current `-50/-600` vocabulary; the net fails on the current violations (Routines 11 + Learning 31 + Goals 8 + Profile 6 + drawer 1 nodes); the ladder carriers fail until WP-3 | RED as predicted |
| 2 | **GREEN — the cures:** (a) `OptionChip` → the reference's Badge anatomy; (b) the 13 vocabularies → the `-100/-700` system (the three reference-verified maps byte-exact: Routines green/yellow, Learning blue/pink/emerald/green/purple/orange, Learning difficulties untinted; the ten unverifiable vocabularies keep our families at -100/-700); (c) the Profile panels → the reference's Card anatomy (the 8 shells + the Theme Mode border-2 card grid + the preset cards + the Active label + the preview tile + the header icons moon/palette/type/image/sparkles); (d) the Watch-Now aria-labels; (e) the Goals badge text; (f) the footerSubtitle + sidebar subtitle → `text-muted`; (g) the tabs track → `text-neutral-600` (the v3 pin joins the block). New v3 pins for every newly-used palette pair (the pins⇔usage census, both directions) | census GREEN; the net GREEN on all three checks; tsc 0 |
| 3 | **The count ladder + docs:** 325→**326** at all live-tense unit sites; 43→**46** at every e2e site; PAD §8.1: the infra row 127→**128** (109+89+128=326) with the category list gaining the chip-vocabulary census, a NEW e2e row (a11y net: 1 spec, 3 checks); README badge + testing + superset rows (the a11y row gains the net); AGENTS commands + the testing-conventions a11y-net bullet; CLAUDE table + pyramid; SKILL §4 counts + §8 rewrite (the net + the corrected contrast math + the tab superset) + §11 gate counts + §12 lesson 21 + description + provenance + v1.14.0→**v1.15.0**; PAD known-issues: the tab-strip superset entry; worklog WH-17 | rg-verified, docs-counts GREEN |
| 4 | **Full gate re-run:** lint → typecheck → test (**326**) → build → smoke 14/14 → e2e **46/46** (the a11y net green as checks 44–46) → db census + `bun audit` ZERO | full green |
| 5 | **Captures:** re-take the 16-file set. **Predicted movers: 03-routines, 10-learning, 11-goals, 12-profile, 15-mobile-nav-open, 16-mobile-drawer-nav-exercise** (the chip-bearing pages, the Profile panels, the drawer subtitle). **Predicted stable: 01-login, 02-dashboard, 04-exercise, 05-mentalhealth, 06-assignments, 07-events, 08-studyresources, 09-reminders, 13-mobile-login, 14-mobile-dashboard** (empty lists render no chips; the sidebar subtitle is below the mobile fold at capture height? — verify: if 14 shows the sidebar subtitle region it moves too; root-cause any unpredicted mover before narrating). md5 every file; verify non-blank. `.env` ↔ `.env.example` parity re-verify. Remove the scratch probe scripts (`scripts/axe-*.mjs`, `scripts/seed-watch-wh17.mjs`, `scripts/contrast-calc-wh17.mjs` — untracked scratch, removed before the commit) | captures + prediction check |
| 6 | **worklog WH-17 entry + this plan's execution record + `docs/session_30.md`** (the round's transcript) | worklog |
| 7 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **The a11y net asserts WCAG 2.1 A+AA (`wcag2a`, `wcag2aa`, `wcag21a`,
  `wcag21aa`), strict zero, no ignore list:** post-fix every walked surface
  passes (the fixes are the deterministic RED — this net is reproducible,
  unlike WH-16's timing-race net). WCAG 2.2 tags deferred (the docs' claim
  is AA; a future round can widen). If a legitimate benign class ever
  appears, the net FAILS and the round cures it or pins the documented
  ignore entry — the console-net doctrine verbatim.
- **The axe "incomplete" results (gradient washes) are not violations and
  the net ignores them by construction** — axe cannot resolve backgrounds
  under CSS gradients (28 incomplete nodes on our Dashboard alone); the
  net asserts `violations`, not `incomplete`. The mobile drawer (solid
  sheet) is the assertion surface for the sidebar-family colors the
  desktop gradient hides.
- **F-6 takes the superset, not the mirror:** the reference's own tab
  strip fails AA (axe-verified on the reference this round — the exact
  same two triggers); mirroring it would leave the README's superset
  claim false and un-pinnable. We already supersede this surface's
  keyboard defect (the roving tabindex over the reference's
  `tabIndex=-1` — the tabs.tsx documented precedent). The cost: the
  inactive tab text darkens (#737373 → #525252, the 12-profile capture
  moves); the deviation is documented in tabs.tsx's header + the PAD
  known-issues ledger (the "a deviation nobody wrote down is a bug
  nobody can defend" rule).
- **The chip fix is a MAP re-capture, not a color tweak (the WH-15
  lesson):** the reference's chips differ from ours in FAMILY (easy is
  green not emerald; moderate is yellow not amber; the Learning category
  families are four-for-six different), in STEP (-100/-700 not -50/-600),
  in SHAPE (rounded-md not rounded-full), in WEIGHT (semibold not
  medium), and in one surface's EXISTENCE (the Learning difficulties are
  untinted). Pin the map (the unit census), not the instances.
- **The unverifiable vocabularies migrate to the same system:** the demo
  account is empty on both apps, so the workout/mood/priority/event/
  resource/reminder/goal chips have no reference surface to probe — but
  leaving them at -50/-600 would leave the a11y claim false on the first
  row a user creates (and the e2e CRUD spec's rows render them). Keeping
  our color families at -100/-700 is the minimal consistent migration;
  the unit census pins the system, the net pins the rendered surfaces.
- **@axe-core/playwright returns as a devDep WITH its live import:** the
  WH-3 retirement was correct (zero imports); the dead-dep census stays
  the guard — the package returns only because the a11y spec imports
  `AxeBuilder` (verified: `bun audit` ZERO with it installed; the
  lockfile-resolution pin untouched — no overrides needed).
- **The count ladder (exact):** 325 + 1 (the chip-vocabulary census
  check in src-census.test.ts — an infra file, no new suite) = **326 unit
  checks / 21 suites**; 43 + 3 (the a11y net's three checks in
  a11y.spec.ts) = **46 e2e checks / 6 specs + 1 setup**; smoke stays 14;
  the §8.1 infra row 127+1 = **128** (109+89+128=326); a new e2e row:
  a11y net, 1 spec, 3 checks.
- **SKILL v1.14.0→v1.15.0 (the minor convention):** §12 lesson 21 is a
  new entry, not a correction.
- **The session file (WP-6):** the operator's numbering pushed
  session_29.md (the WH-16 raw transcript); this round's transcript file
  is `docs/session_30.md`, matching the house pattern.
- **Declined (documented, not taken):** the functional-superset round
  (real video URLs, OAuth wiring — fifteenth deferral; the Watch-Now
  placeholders re-verified href-less this round, and F-3 fixes their
  accessible names instead); re-probing the reference's create-dialog
  chips (the empty account renders none — the unverifiable-vocabulary
  decision above); migrating the Account/Preferences tab interiors beyond
  the panel shells (the reference's account tab is read-only and its
  panels follow the same Card anatomy — the shell migration covers the
  structure; the tab interiors keep our superset forms); WCAG 2.2 tags
  (see the net decision).

---

## 4. Execution record (2026-10-30, WH-17 — filled as executed)

- **Baseline gate (live, workspace at fd19180):** lint 0/0 · tsc 0 · unit
  325/325 (21 suites) · build OK · smoke 14/14 · e2e 43/43 · census MATCH
  · bun audit ZERO — the documented WH-16 ship state, no flake. — §1
- **The reference probe:** every watch clean (identity 11/11, CSS hash
  unchanged round 4, seed 23/23 round 6, entity API 12/13/views:0 round
  5, drawer battery, 404, placeholders, quick actions, login surfaces);
  the preset-hygiene check CLEAN at probe start. — §1
- **The codebase audit:** the a11y walk (axe, WCAG 2.1 A+AA) on both
  apps isolated six findings (F-1..F-6) + the systemic gap (F-7); the
  reference's own a11y state mapped (its Dashboard/Learning/Profile
  violations documented as the parity ledger's reference side). — §1
- (WP-1 through WP-7: filled as executed below.)

- **WP-1 (RED):** the chip-vocabulary census check landed in
  `tests/src-census.test.ts` (the system regex over all 13 vocabularies +
  the three reference-verified maps byte-exact + the OptionChip anatomy
  read from page-parts.tsx source; TEMPLATE_DIFFICULTIES rides its
  exported `difficultyMeta` accessor — the map is module-private per the
  WH-8 data-feed doctrine, and a test-only re-export would trip the
  exported-value census); the CANONICAL flips landed in the same step
  (`unitChecks` 325→**326**, `e2eChecks` 43→**46**, `e2eSpecs` 5→**6**);
  the e2e a11y net landed as `tests/e2e/a11y.spec.ts` (three checks: the
  module walk, the open drawer at 390×844, the logged-out login via a
  per-describe storageState override). RED verified: exactly the census
  check (the stale -50/-600 vocabulary) + the net's deterministic
  violations (Routines 11 + Learning 19+12 + Goals 8 + Profile 6 nodes
  on the walk, 1 on the drawer — the login page was already clean) + the
  6 docs-counts ladder carriers.
- **WP-2 (GREEN):** the OptionChip re-captured at the reference's Badge
  anatomy (`rounded-md border border-transparent px-2.5 py-0.5 text-xs
  font-semibold`); the 13 vocabularies migrated (118 tint/text fields;
  the three reference-verified maps byte-exact — Routines easy=green/
  moderate=yellow, the Learning categories blue/pink/emerald/green/
  purple/orange, the difficulties untinted `bg-transparent
  text-foreground`); the Profile panels migrated to the new
  PROFILE_PANEL/THEME_MODE_PICKER/PRESET_CARD records in page-layout.ts
  (the reference's Card shell + the moon/palette/type/image/sparkles
  header icons + the border-2 mode-card grid with the fixed indigo
  active pair + the preset cards + the gradient preview tile); the
  Watch-Now labels (`Watch Now: ${t.title}`); the Goals badge text at
  `text-gray-600` with the card-level `opacity-60` dimming retired (an
  axe-invisible compounding hazard — the effective fg compounds far
  below the reported ratio); the footerSubtitle + sidebar subtitle at
  `text-muted` (the reference's text-gray-500 = our token exactly); the
  tabs track at `text-neutral-600` (6.4:1); the palette pin surgery
  (+17 pins: 13 verified against the reference's own compiled sheet —
  amber/blue/cyan/emerald/orange/pink/purple/yellow 100+700 — with the
  teal/sky/indigo pairs pinned v3 directly [no reference surface], plus
  neutral-600; the 3 orphaned pins retired with the chips that used
  them: green-600, sky-50, sky-600 — the block now exactly 107 pairs).
  One straggler caught by the net mid-WP: the Typography preview line
  (text-muted on line-soft → text-gray-600). The net GREEN on all three
  checks; the chips computed-verified BYTE-IDENTICAL to the reference
  (easy rgb(21,128,61)/rgb(220,252,231), moderate rgb(161,98,7)/
  rgb(254,249,195), productivity blue-700/blue-100, study skills
  purple-700/purple-100, beginner untinted near-black);
  `@axe-core/playwright@4.14.0` joined as a devDep WITH its live import
  (`bun audit` ZERO with it installed).
- **WP-3 (the ladder + docs):** 325→**326** at all 13 live-tense unit
  sites; 43→**46** + 5→**6 specs** at every e2e site (README badge +
  table + testing section + the superset row gaining the net, AGENTS
  commands + the a11y-net testing-conventions bullet, CLAUDE table +
  pyramid, PAD tree + §8.1 rows [infra 127→128 with the category list
  gaining the chip-vocabulary census; the NEW a11y-net row: 1 spec, 3
  checks] + totals + checklist + the tab-strip known-issues entry, SKILL
  §2 table + §8 rewrite + §11 gate counts + the census list + §12
  lesson 21 + the description + the provenance + v1.14.0→**v1.15.0**).
  The §8.1 e2e-row count pin's own literal flipped 5→6 in the same
  commit (the count-ladder rule for the pin's literals). docs-counts
  GREEN 10/10.
- **WP-4 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **326/326 (21 suites)** · build OK · smoke 14/14 · e2e **46/46** (the
  a11y net green as checks 44–46) · db census MATCH · `bun audit` ZERO.
- **WP-5 (captures):** the 16-file set via the house agent-browser
  procedure (desktop 1280×900, mobile 390×844, the mouse parked on the
  neutral header edge, a real trigger click for the drawer battery —
  the trigger located by its aria-label after the first attempt's
  text-match miss). **7 movers, 9 stable.** The movers root-caused:
  03-routines (the chip row — bbox exactly the difficulty-chip strip),
  10-learning (the chips + the Watch buttons), 11-goals (the badge text
  + the opacity retirement), 12-profile (the panel rework — 13.2% of
  pixels, the round's intended movement), 15-mobile-nav-open (the drawer
  subtitle at its exact line), 16-mobile-drawer-nav-exercise (the same
  subtitle on the post-nav page), and 14-mobile-dashboard — the
  DOCUMENTED artifact: 21 pixels at Δ≤7 (mean Δ1.06), deterministic
  within the session (an md5-identical re-take), the same 21-pixel
  anti-aliasing class WH-16 recorded for this exact capture. 02-dashboard
  byte-stable with the sidebar subtitle's change verified live-computed
  instead (the changed glyph ink sits below the 900px capture fold — the
  subtitle's line box top is y=894). All 16 verified non-blank +
  color-diverse. `.env` ↔ `.env.example` parity re-verified (the
  AUTH_SECRET value only).
- **WP-6:** the worklog WH-17 entry + this record + docs/session_30.md.
- **WP-7:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
