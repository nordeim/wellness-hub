# Session-15 Remediation Plan — the per-module page-identity round (WH-15)

**Task ID:** WH-15 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 50c8cab`: WH-14 shipped at
`8f85fa0` — the design-token census round — plus the operator's session_25.md
transcript push), re-probe the live reference for new surfaces AND
seed-content/entity-API/compiled-CSS drift, fix every identified gap with TDD,
lockstep the five docs + `worklog.md`, and push.

> **Provenance note:** the reference REDEPLOYED since WH-14. Its stylesheet
> moved from `static/index-eZhxKCJC.css` (907,432 bytes — the bundle WH-14
> probed) to `assets/index-heGLHP2e.css` (89,409 bytes — a rebuilt, purged
> bundle), and with it a comprehensive visual redesign: a per-module gradient
> identity layered over unchanged content, structure and behavior. Every
> content/behavior watch came back CLEAN this round (titles, drawer battery,
> seed content 23/23, entity API 12/13/views:0, 404, Watch-Video
> placeholders, quick actions) — the drift is entirely visual. This is the
> reference-listening round session_24 named as the WH-15 candidate.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
workspace at `50c8cab`, environment carried over — `.env` present,
`db/custom.db` seeded, Playwright browsers installed):** lint 0/0 · tsc 0 ·
unit **321/321 (21 suites)** · `bun run build` OK · smoke **14/14** · e2e
**42/42** · db census MATCH (users=1 templates=11 steps=50 tutorials=12
badges=8) · `bun audit` **ZERO** — the exact documented WH-14 ship state, no
flake, no environment hurdles.

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 10 nav pages + Profile walked — page titles/texts, nav
labels, the drawer battery (11 items; the stays-open-after-nav quirk; no
scroll lock — ours AUTO-CLOSES, the e2e-pinned superset), the 404 surface,
the Watch-Video placeholders (still no hrefs), the quick-action tiles and
the Profile tabs all UNCHANGED. The seed-content watch round 4: **23/23
byte-for-byte parity** (11 template names + 12 tutorial titles). The
entity-API shape watch round 3 (HAR): **12 rows, 13 keys, `views: 0` on all
12** — the SCHEMA_PARITY_KEEPS evidence holds. The compiled-CSS watch round
2: **the asset hash MOVED** (`index-eZhxKCJC` → `index-heGLHP2e`) — the
trigger for the redesign audit below.

**Findings (by severity) — the WH-15 ledger, the reference's 2026-10-30
visual redesign:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH (parity)** | **The per-module page-identity system.** Every page now carries module-specific gradients, containers and header forms — probed live on all 11 pages (computed `background-image`, element widths, display modes): the H1 `text-4xl font-bold bg-gradient-to-r <module stops> bg-clip-text … mb-2` (block-spanning on Dashboard/Routines/Learning/Profile where the gradient covers the full 960px row; shrink-wrapped on the 7 action pages); the primary button `bg-gradient-to-r from-<m1>-500 to-<m2>-500` (INCLUDING the dialogs' submit buttons — "Save Workout" probed orange→red); the page-root wash `min-h-screen bg-gradient-to-br from-<m1>-50 via-white to-<m2>-50/30 p-4 md:p-8`; the content container `max-w-{5,6,7}xl mx-auto space-y-8`; the subtitle `text-gray-600`. The 11-page map (probed): Dashboard indigo-600→purple-600→pink-600 / slate-50→indigo-50/30 / 7xl / block · Routines purple-600→pink-600→rose-600 / purple-50→pink-50/30 / 7xl / block · Exercise orange-600→red-600 / orange-50→red-50/30 / 6xl / flex · MentalHealth emerald-600→teal-600 / emerald-50→teal-50/30 / 6xl / flex · Assignments blue-600→cyan-600 / blue-50→cyan-50/30 / 6xl / flex · Events violet-600→purple-600 / violet-50→purple-50/30 / 7xl / flex · StudyResources blue-600→indigo-600 / blue-50→indigo-50/30 / 7xl / flex · Reminders rose-600→purple-600 / rose-50→purple-50/30 / 6xl / flex · Learning amber-600→orange-600 / amber-50→orange-50/30 / 7xl / block · Goals yellow-600→amber-600→orange-600 / yellow-50→amber-50/30 / 7xl / flex · Profile indigo-600→purple-600 / slate-50→indigo-50/30 / 5xl / block. Buttons (where present): the module 500-pair; Profile's "Save All Changes" rides the BRAND pair (preset-driven — verified: Ocean Blue re-skinned the brand surfaces to sky-500→cyan-500 while the Exercise button stayed orange→red — **the module pairs are FIXED, not themeable**). | the 11 `src/app/(app)/*/-page.tsx` files + `src/lib/page-layout.ts` | The `PAGE_THEMES` map (wash + heading + button + container + header form per module) in `page-layout.ts`; the pages consume their theme; `PageHeader` gains the theme's heading classes; `GradientButton` gains the per-module `gradient` prop (brand default kept for Profile) |
| F-2 | **HIGH (parity)** | **The shell redesign.** (a) the app-root wash `bg-gradient-to-br from-slate-50 via-white to-slate-50` (probed 1280×1800) — ours: solid `bg-background`; (b) the sidebar wash `bg-gradient-to-br from-white via-gray-50 to-white` — ours: solid `bg-sidebar`; (c) the brand wordmark (sidebar H2, mobile header H1, drawer title) all `linear-gradient(135deg, …)` — **to-br** — ours: `to-r`; (d) the brand badge `rounded-2xl` (probed 16px) — ours: `rounded-xl`; (e) the DESKTOP active nav item is now the gradient pill (135deg, white text, rounded-xl — probed on "Dashboard") — ours: `bg-primary/10 text-primary` light wash; (f) the drawer active pill + footer avatars: to-br — ours: to-r; (g) the LOGIN page went monochrome slate: the card accent `from-slate-200 via-slate-300 to-slate-200`, the logo glow + tile `from-slate-200 to-slate-300` (the logo itself is now a hosted `<img>` — our Sprout badge remains the documented stand-in; the GRADIENT surfaces are the parity targets). The preset engine still re-skins the brand family (verified live: Ocean Blue → sky/cyan on brand + active pill, modules unchanged). | `src/lib/page-layout.ts` (SHELL_LAYOUT, NAV_LAYOUT, MOBILE_HEADER, MOBILE_NAV_SHEET, LOGIN_LAYOUT) · `src/components/layout/{app-shell,sidebar,mobile-nav,login-card}.tsx` | The records carry the redesign: the two washes, the to-br angles everywhere in the brand family, `rounded-2xl` badge, the gradient active pill, the slate login pairs |
| F-3 | **MEDIUM (parity)** | **The stat/card redesign.** (a) Dashboard's 4 stat tiles: white `rounded-xl … border-none shadow-lg hover:shadow-xl` cards + an `absolute inset-0 bg-gradient-to-br <pair> opacity-5 group-hover:opacity-10` gradient wash + a `p-3 rounded-2xl bg-gradient-to-br <pair> shadow-lg` 48×48 icon tile; label `text-gray-600` 14px, value 30px `text-gray-900`, sub `text-gray-500` 14px (ours: pastel `bg-*-50` cards, solid icon chips, gray-500 label, gray-400 12px sub); tile pairs: Workouts orange-500→red-500, Mood emerald-500→teal-500, Assignments blue-500→cyan-500, Events yellow-500→amber-600. (b) The module stat rows: ONE gradient hero tile (`rounded-xl border-none shadow-lg bg-gradient-to-br <pair> text-white`, value 36px white, label in the module's -100 tint — Exercise "Total Workouts" orange-100, Assignments "Completed" green-500→emerald-500 + green-100) + TWO plain white tiles — probed on Exercise/MentalHealth/Assignments/Goals; Reminders carries NO hero (3 white tiles); StudyResources has no stat row. (c) Routines template cards: borderless `rounded-xl … border-none shadow-lg hover:shadow-xl h-full flex flex-col group` + the `h-2 bg-gradient-to-r <category pair>` top bar + p-6 sections + the bordered amber pro-tip box + per-category gradient "Use This Template" buttons — the 7-category map probed: morning amber-500→orange-500 · exercise red-500→pink-500 · study blue-500→cyan-500 · evening indigo-500→purple-500 · self_care emerald-500→teal-500 · creative pink-500→rose-500 · productivity violet-500→purple-500. (d) Learning cards: the `relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200` thumbnail. (e) Events calendar: per-day `min-h-24 p-2 rounded-lg border` cells (ours: `min-h-20 border-b border-r` grid), today = `bg-gradient-to-br from-violet-100 to-purple-100 border-violet-300` + violet-700 date, others `border-gray-200 hover:border-gray-300 hover:bg-gray-50`. (f) MentalHealth mood tiles: `w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-3xl shadow-lg`. | the module page files + `page-layout.ts` (STAT_CARD, SECTION_CARD, PAGE_KPI_GRIDS) + `page-parts.tsx` | The stat-row anatomy per page (hero + white tiles), the category-gradient map (`ROUTINE_CATEGORY_GRADIENTS`), the calendar cell redesign, the mood-tile gradients, the gray thumbnails |
| F-4 | **MEDIUM (design-system)** | **The palette pin block grows by ~40 pairs.** The redesign's class vocabulary uses `(family, step)` pairs the 69-pair session-88 block doesn't carry (purple-600, rose-600, orange-600, red-600, emerald-600, cyan-600, yellow-600, the 500-family button pairs, the 50-family wash pairs, the 100-family tints, slate-200/300, gray-100/200/300…). The WH-14 palette pin-completeness census (pins⇔usage, both directions) FAILS with the exact missing list the moment the classes land — the RED signal doubles as the pin worklist. | `src/app/globals.css` session-88 block | Add every missing pin (v3 values — the reference's own compiled stylesheet carries them; spot-verify the load-bearing ones against `assets/index-heGLHP2e.css`) |
| F-5 | **Systemic (the round's TDD feature)** | **No pin for the page-theme map.** The per-module identity (11 themes × 5 surfaces), the shell contract (the to-br brand family, the washes, the gradient active pill, the rounded-2xl badge), the login monochrome pairs and the category-gradient map are unpinned — a future edit could drop a wash or revert an angle silently. | `tests/src-census.test.ts` | **TDD:** (a) the page-theme census — `PAGE_THEMES` covers exactly the 11 live modules, every module page consumes its theme, every palette pair in the map is pinned in `@theme`, `ROUTINE_CATEGORY_GRADIENTS` covers exactly the 7 seed categories; (b) the shell-contract census — the brand-family records carry `bg-gradient-to-br`, the badge `rounded-2xl`, `NAV_LAYOUT.linkActive` the gradient pill, the shell washes present; (c) the login-monochrome census — the accent/glow/badge slate pairs. CANONICAL 321→**324** |

**Clean checks (no findings, documented):** the full baseline gate (42/42
e2e, no flake) · the reference probe's content/behavior layer (zero new
textual surfaces; the drawer battery; the 404; the placeholders; the quick
actions) · the seed-content watch round 4 (23/23) · the entity-API shape
watch round 3 (12/13/views:0) · the preset theming model (brand-only —
verified live with Ocean Blue) · the reference's dark mode remains the
partially-broken surface our proper `.dark` token system supersedes (dark
body + light cards probed; not a parity target) · the login card body
(white/95, shadow-2xl, the slate-900 submit, the Google outline — all
unchanged) · the H1 typography (36px/700 both apps) · the sidebar/main
geometry (256/1024) · `.env` ↔ `.env.example` parity (the AUTH_SECRET value
only) · `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root
(census MATCH) · the SEO family (sitemap/robots/manifest — smoke check 12)
· the vitest + playwright configs (gate-proven) · `skills/` excluded from
all gates · `bun audit` ZERO.

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the three census checks in `tests/src-census.test.ts`:** (a) the page-theme census (the map's 11 keys = the live modules; every module page source references its `PAGE_THEMES.<key>`; every palette pair in the map's class strings carries a `@theme` pin; the category map covers the 7 seed categories); (b) the shell-contract census (the brand-family records' `bg-gradient-to-br` angle; `brandBadge`'s `rounded-2xl`; `linkActive`'s gradient pill; the root/sidebar washes); (c) the login-monochrome census (the accent's 3-stop slate pair; the glow/badge slate pair). Flip docs-counts' `CANONICAL.unitChecks` 321→**324**. RED verified: (a) fails on the missing map; (b)/(c) fail on the current to-r/solid records | RED as predicted |
| 2 | **GREEN — the redesign lands:** `page-layout.ts` gains `PAGE_THEMES` + `ROUTINE_CATEGORY_GRADIENTS` + the stat-tile records and the record cures (PAGE_ROOT themed wash + `p-4 md:p-8`, PAGE_HEADER `text-4xl`/`mb-2`/gray-600 subtitle + block/flex header forms, NAV_LAYOUT to-br brand + rounded-2xl badge + gradient active pill, MOBILE_HEADER/MOBILE_NAV_SHEET to-br, SHELL_LAYOUT washes, LOGIN_LAYOUT slate, STAT_CARD/SECTION_CARD/PAGE_KPI_GRIDS at the new anatomy); `page-parts.tsx` — `PageHeader` gains the theme prop, `SectionCard` restyles borderless; `GradientButton` gains the optional `gradient` prop (brand default); `app-shell.tsx`/`sidebar.tsx`/`mobile-nav.tsx`/`login-card.tsx` consume the cured records; the 11 pages consume their themes (wash root + container + header + stat rows + module surfaces: the calendar cells, the mood tiles, the gray thumbnails, the category bars/buttons, the hero tiles); `globals.css` gains the missing pins (the WH-14 census's RED list is the worklist). Dark-mode superset: the washes carry `dark:` neutral variants; the saturated gradients stay; the tokens flip as today | census GREEN; tsc 0; unit 324/324 after WP-3 |
| 3 | **The count ladder + docs:** 321→**324** at all 13 live-tense sites; PAD §8.1's infra row 123→**126** (109+89+126=324) with the category list gaining the page-theme census; PAD §5 (the design-system reference) rewritten at the redesign truth (the per-module identity table, the shell washes, the stat-tile anatomy, the preset-model split: brand-only themeable); SKILL §1/§4/§19 at the redesign truth; README's design-system table + key-features row; AGENTS' architecture facts gain the page-theme line; SKILL v1.12.0→**v1.13.0** (§12 lesson 19: "a reference is a moving target — watch the compiled CSS hash, and when the deployment changes, re-probe the computed styles, not the DOM text") | rg-verified, docs-counts GREEN |
| 4 | **Full gate re-run:** lint → typecheck → test (**324**) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` ZERO | full green |
| 5 | **Captures:** re-take the 16-file set from the dev server. **All 16 predicted to move** — the redesign touches every page's wash/header/stats (the largest intentional movement since WH-1; narrated as the parity fix itself). md5 every file; verify non-blank + color diversity. `.env` ↔ `.env.example` parity re-verify | captures + prediction check |
| 6 | **worklog WH-15 entry + this plan's execution record + `docs/session_26.md`** (the round's transcript; the operator's session_25.md push never clobbered) | worklog |
| 7 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **The module gradients are FIXED palette classes, not theme tokens (the
  round's core architectural decision):** verified live — applying Ocean
  Blue re-skinned the reference's brand surfaces (wordmark, active pill →
  sky-500→cyan-500) while the Exercise button/H1/wash stayed orange→red.
  Our `--primary`/`--secondary` tokens keep driving the brand family
  (wordmark, badge, active pills, header/drawer titles, footer avatars,
  Profile's save button); the module surfaces ride hardcoded `(family,
  step)` classes exactly as the reference compiles them. The preset e2e
  (asserts `--color-primary` + the dark class) is unaffected.
- **The interpolation drift stays accepted (the WH-1 posture):** the
  reference (v3-era CSS) renders plain-sRGB `linear-gradient(to right, …)`;
  our Tailwind v4 compiles `to right in oklab`. The house accepted oklab at
  WH-1 (every computed-style parity probe since has run on the v4 build);
  matching sRGB would require arbitrary-value gradients — a fragility
  trade for an invisible delta. Re-affirmed, not reopened.
- **The login logo stays the Sprout badge (the documented stand-in):** the
  reference's logo is now a hosted `<img>` (supabase asset) — an
  asset-level change we neither hotlink nor download. The parity targets
  are the gradient SURFACES (the slate accent/glow/tile), which we match
  exactly; our Sprout icon continues to stand in for their image.
- **Dark mode remains our superset:** the reference's dark mode is
  partially broken (dark body + light cards/washes — probed). Our `.dark`
  token system stays; the new washes gain `dark:` neutral variants; the
  saturated gradient surfaces (H1s, buttons, hero tiles, icon tiles) ride
  the same classes in dark — saturated on dark, exactly the readable
  behavior our superset demands.
- **The hero-tile label tints follow the module family (the -100 step):**
  Exercise orange-100, Assignments green-100 (both probed);
  MentalHealth/Goals probed at implementation time (expected emerald-100/
  yellow-100 by the pattern) — recorded in the execution record.
- **`PageHeader` gains a `theme` prop (not a per-page className):** the
  theme is a structured record (heading classes + header form) consumed by
  the shared component — the pass-site census stays green (all 11 pages
  pass it), and a 12th page cannot render themeless.
- **`GradientButton`'s `gradient` prop is optional with the brand default:**
  Profile's save button IS the brand pair (probed); the module pages pass
  their pair. The hover pair (`hover:from-primary-hover
  hover:to-secondary-hover`) stays on the brand default; module buttons
  probe the reference's hover at implementation time and match it.
- **The count ladder (exact):** 321 + 3 (the page-theme census + the
  shell-contract census + the login-monochrome census, all riding
  src-census.test.ts — an infra file) = **324 checks / 21 suites** (no new
  suite). e2e stays 42; smoke stays 14; the §8.1 infra row 123+3 = **126**
  (109+89+126=324).
- **SKILL v1.12.0→v1.13.0 (the minor convention):** §12 lesson 19 is a new
  entry, not a correction.
- **The session file (WP-6):** the operator's numbering pushed session_25.md
  (the WH-14 raw transcript); this round's transcript file is
  `docs/session_26.md`, matching the house pattern.
- **Declined (documented, not taken):** the functional-superset round
  (real video URLs, OAuth wiring — thirteenth deferral; the Watch-Video
  placeholders re-verified); matching the reference's broken dark mode
  (ours is the documented superset); the sRGB interpolation match (see
  above); hotlinking the reference's hosted logo image (see above).

---

## 4. Execution record (2026-10-30, WH-15 — filled as executed)

- **Baseline gate (live, workspace at 50c8cab):** lint 0/0 · tsc 0 · unit
  321/321 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census MATCH ·
  bun audit ZERO — the documented WH-14 ship state, no flake. — §1
- **The reference probe:** the content/behavior layer clean (titles, drawer
  battery, 404, placeholders, quick actions, Profile tabs); the
  seed-content watch round 4 verified byte-for-byte (23/23); the
  entity-API watch round 3 verified (12 rows, 13 keys, views:0); the
  compiled-CSS watch round 2 caught the redeployment (the hash moved) and
  triggered the redesign audit: F-1 through F-5 enumerated with live
  computed-style evidence on all 11 pages + the shell + the login. — §1
- (WP-1 through WP-7: filled as executed below.)

- **WP-1 (RED):** the three census checks landed in `tests/src-census.test.ts`
  (the page-theme census — the map's 11 keys = the live modules, every
  module page references `PAGE_THEMES.<module>`, every theme pair pinned,
  the category map = the 7 seed categories; the shell-contract census —
  the brand-family to-br records, the rounded-2xl badge, the gradient
  active pill with white text, the root/sidebar washes; the
  login-monochrome census — the accent's 3-stop slate pair + the
  glow/badge pairs); CANONICAL flipped 321→**324**; the
  PROPPED_COMPONENTS pin updated in the same step (PageHeader +`theme`,
  GradientButton +`gradient` — the count-ladder rule). RED verified:
  exactly the 3 census checks + the 6 docs-counts ladder carriers.
- **WP-2 (GREEN):** `page-layout.ts` gained `PAGE_THEMES` (the 11-entry
  map) + `ROUTINE_CATEGORY_GRADIENTS` (the 7 categories) +
  `routineCategoryStops`; `PAGE_ROOT` retired (its 11-page consumer base
  moved to the themed roots — the bare form had no other consumer);
  `PAGE_HEADER` at the redesign anatomy (text-4xl, mb-2, the gray-600
  subtitle, the row/stacked header forms); `STAT_CARD` rebuilt (the
  white card + the 5%-opacity wash + the rounded-2xl iconTile + the
  hero/heroLabel/heroValue forms); `SECTION_CARD` borderless; the
  GRADIENT_BUTTON split (the un-exported BASE + the big brand default +
  the COMPACT module form); the shell records cured (the two washes with
  dark: neutral variants, the to-br brand family, the rounded-2xl badge,
  the gradient active pill, the slate login pairs + the logoBadge resize
  with the dead `logo` member retired); `page-parts.tsx` (PageHeader's
  theme prop — the stacked pages render the bare block so the H1 spans
  the row; GradientButton's gradient prop); the 11 pages restructured
  (the themed root + container + header + the hero/white stat rows + the
  module surfaces — the events calendar's one-grid anatomy with empty
  leading spacers and no trailing week, the journal entry cards with the
  gradient emoji tiles, the learning gray thumbnails, the routines
  category bars + per-category buttons, the dialog submits
  module-gradient); the login card gained the accent strip; globals.css
  gained the 26 pins family-ordered (95 pairs = the 95 used pairs) and
  lost the three dead declarations (`--color-secondary-hover` + its
  theme-store write — the write-only class again; blue-950/emerald-950
  — the retired dark pastel tints). **tsc 0 on the first run**; the
  census GREEN 18/18; the live parity spot-probe on the running dev
  server verified every page's H1/button/wash against the reference
  inventory + the Dashboard tiles, the Exercise hero (the orange-100
  label at the exact reference value), the 11 routines bars, the events
  today cell (violet-700 at the exact reference value) and the login
  surfaces. Two live-probe catches cured mid-WP: the `bg-card` utility
  (no `--color-card` token exists — the classes computed transparent;
  cured to the `bg-surface` token) and the login accent strip (the
  reference's login carries it; ours had never rendered it).
- **WP-3 (the ladder):** 321→**324** at all 13 live-tense sites; PAD
  §8.1's infra row 123→**126** (109+89+126=324) with the category list
  gaining the page-theme census; PAD §5 rewritten at the redesign truth
  (the brand/module split, the 11-page identity map table, the category
  map, the stat-tile anatomy); README's design-system table + superset
  row; AGENTS' architecture facts + Tailwind section; CLAUDE's Tailwind
  bullet; SKILL §1/§4/§11/§19 + §12 lesson 19 + the description + the
  provenance; SKILL v1.12.0→**v1.13.0**. The full unit suite
  **324/324 (21 suites)**.
- **WP-4 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **324/324 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · `bun audit` ZERO. The rebuilt stylesheet: **98,723 bytes**
  (vs the WH-14 73,950 — the +25 KB is the redesign's gradient/wash
  vocabulary; still −38% vs the pre-WH-14 160,639).
- **WP-5 (captures):** all 16 re-taken from the dev server. The mobile
  set re-taken once after the scratch script's two bugs were caught by
  its own state assertions (the agent-browser eval SyntaxError class —
  `() => {}()` without wrapping parens is a syntax error, not an IIFE;
  and the brittle fixed-z-50 class probe — cured to the computed-position
  form; the drawer-open capture pixel-verified [#fafafa wash + zinc nav
  text], the post-nav capture path-verified + orange-H1-verified). md5:
  **16/16 moved** — the plan's prediction (the largest intentional
  movement since WH-1, the parity fix itself). All 16 verified non-blank
  with healthy color diversity. `.env` ↔ `.env.example` parity
  re-verified (the AUTH_SECRET value only).
- **WP-6:** the worklog WH-15 entry + this record + docs/session_26.md.
- **WP-7:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
