# Session-16 Remediation Plan — the console-hygiene round (WH-16)

**Task ID:** WH-16 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 603d145`: WH-15 shipped at
`8baaef1` — the per-module page-identity round — plus the operator's
session_27.md transcript push), re-probe the live reference for new surfaces
AND seed-content/entity-API/compiled-CSS drift, fix every identified gap with
TDD, lockstep the five docs + `worklog.md`, and push.

> **Provenance note:** the reference did NOT redeploy since WH-15 — the
> compiled-CSS watch round 3 found the asset hash unchanged
> (`assets/index-heGLHP2e.css`, 89,409 bytes) and every content/behavior
> watch came back clean (identity map, drawer battery, seed 23/23, entity
> API 12/13/views:0, 404, placeholders, quick actions). The round's findings
> are therefore codebase-hygiene findings, led by a live-verified React 19
> hydration mismatch the gate could never see — the console-error class —
> plus the missing net that let it ship for fifteen rounds.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
workspace at `603d145`, environment carried over — `.env` present,
`db/custom.db` seeded, Playwright browsers installed, the dev server alive
from the prior session):** lint 0/0 · tsc 0 · unit **324/324 (21 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **42/42** · db census MATCH
(users=1 templates=11 steps=50 tutorials=12 badges=8) · `bun audit` **ZERO**
— the exact documented WH-15 ship state, no flake.

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 11 pages walked with computed-style H1 probes — every title
and every gradient stop byte-identical to the WH-15 identity map (Dashboard
indigo-600→purple-600→pink-600 … Profile indigo-600→purple-600). The
compiled-CSS watch round 3: **hash UNCHANGED** (`index-heGLHP2e.css`,
89,409 bytes — no redeployment). The seed-content watch round 5: **23/23
byte-for-byte** (11 template names + 12 tutorial titles). The entity-API
shape watch round 4 (HAR): **12 rows, 13 keys, `views: 0` on all 12**. The
drawer battery at 390×844: 11 items, the stays-open-after-nav quirk, and
the scroll-lock nuance re-verified (the reference sets `body{overflow:
hidden}` while the `html` scroller still scrolls — the lock is ineffective;
our working lock stays the e2e-pinned superset). The 404, the Watch-Now
placeholders (still href-less buttons) and the quick-action tiles all
unchanged. The login accent/card verified on both apps (the slate 3-stop
strip + white/95 card).

**One probe-hygiene event (F-4):** the reference's demo account shipped
into this round still carrying WH-15's **Ocean Blue preset** — that round's
theming-model probe applied the preset and clicked Save, but its revert
never saved. The round's first H1 probe read `sky-500→cyan-500` on the
brand family until the residue was caught (the module H1s were unchanged —
the fixed-vs-themeable split held exactly as WH-15 documented, which is
what exposed the anomaly). Cured live this round: Indigo Dream re-applied +
Save All Changes, the brand family verified back at `#6366f1 → #a855f7`
(computed). The probe protocol gains the check (see F-4's fix).

**Findings (by severity) — the WH-16 ledger, the console-hygiene class:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM (correctness/console)** | **The React 19 hydration mismatch on `<html>`.** The theme store's `onRehydrateStorage → applyTheme` runs at store-module init (the app-shell imports the store on every `(app)` route) and writes four client-only attributes onto `document.documentElement` — the `style` custom-property block (`--color-primary/--color-secondary/--color-primary-hover/--font-sans`), `data-card-style`, `data-animation`, `data-sidebar-style`, plus the `.dark` class in dark mode. When that module-eval wins the race against React's hydration of `<html>` (observed live this round on the cold-compile `/learning` load), React 19 logs `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up` with the full diff tree naming exactly those four client-only attributes. No functional damage observed (React keeps the client attributes — the theme renders; the probes confirm `dark:true`/`data-card-style:"elevated"`/the style block all live post-load), but it is an unhandled console-error class on a real timing window — and the canonical cure is one attribute. This is precisely the next-themes pattern (attributes on `<html>` before hydration → `suppressHydrationWarning`), shipped by every theme library in the ecosystem. | `src/app/layout.tsx:88` (the `<html lang="en">` element) · writer: `src/stores/theme-store.ts` `applyTheme` | `<html lang="en" suppressHydrationWarning>` + the why-comment. The suppression is scoped to the element itself (attributes + its text content) — child elements keep their own hydration checks, exactly as next-themes ships it |
| F-2 | **LOW (latent, the same class)** | **The `<main>` twin.** `applyTheme`'s `bgImageUrl` branch materializes a client-only `style` attribute on the `<main>` element when a background image is persisted (`background-image/size/attachment`) — the same pre-hydration-write mismatch class, one element down. Not observed live (the demo account carries no bg image — the empty-string writes are attribute no-ops), but the mechanism is identical and the cure is the same one attribute. | `src/components/layout/app-shell.tsx:90` (the `<main>` element) | `<main suppressHydrationWarning …>` + the why-comment |
| F-3 | **Systemic (the round's TDD feature)** | **No console-hygiene net anywhere in the gate.** The e2e suite asserts the DOM (headings, links, attributes, flows) but never reads the console — which is exactly how F-1 shipped through fifteen green rounds: the error fires on a timing window the assertions never observe and the text never reaches. The class needs a net that collects `console.error`/`console.warning`/`pageerror` events across the walked surfaces and asserts zero. Probes this round (fresh Playwright contexts, cold + warm + stored-preset + CPU-throttled passes, dev AND production standalone builds) came back clean on all 12 routes — the net is stable, strict-zero is achievable, and it becomes the permanent regression tripwire for every future React error/warning class (bad aria props, key warnings, hydration races, chunk errors). | `tests/e2e/shell.spec.ts` | The console-hygiene check: one e2e test walking all 11 module routes with the collectors attached, asserting the offender list is empty (the failure message lists every offender with its route for diagnosis). e2e 42→**43** |
| F-4 | **Informational (probe hygiene, cured live)** | **The reference account's preset residue.** WH-15's Ocean Blue probe Saved and its revert didn't — this round's probe started from a contaminated baseline (the brand family read sky/cyan until reset). The probe protocol needs the explicit check-and-reset step so the next round doesn't inherit (or ship!) a skewed baseline. | the probe protocol (SKILL §11 + this plan's narrative) | Cured live (Indigo Dream + Save, computed-verified). The protocol amendment lands in SKILL §11 (probe start: read the account's current preset FIRST; after any preset probe: apply the revert AND verify the save took) |

**Clean checks (no findings, documented):** the full baseline gate (42/42
e2e, no flake) · the reference probe's content/behavior layer (identity map
unchanged on all 11 pages, the drawer battery, the 404, the placeholders,
the quick actions) · the seed-content watch round 5 (23/23) · the
entity-API shape watch round 4 (12/13/views:0) · the compiled-CSS watch
round 3 (hash unchanged — no redeployment) · the zod↔prisma per-model
field-precision walk (9 owned models, every create/update schema field maps
1:1 to its model column; the prefs pair already pinned) · the compiled-CSS
class census dry-run (1,010 static class tokens across src/** — every one
compiles to a utility; the WH-15 `bg-card` phantom class stays cured) · the
bare-fetch sweep (the components' fetches are the documented auth-ladder
seam — login-card/reset-password-screen run pre-session, unit-pinned;
stores own everything else) · the Tailwind v4 pins standing (the hover
unwrap, `--shadow-sm`, `--blur-sm`, the three `@source not` directives, 115
`@theme` tokens, no config JS) · the SEO family (sitemap.xml/robots.txt/
manifest.json route handlers + og-image.png + the per-route
`pageMetadata()` factory; smoke check 12) · `.env` ↔ `.env.example` parity
(the AUTH_SECRET value only) · `DATABASE_URL="file:../db/custom.db"` with
`db/` at the repo root (census MATCH) · the vitest + playwright configs
(gate-proven; the e2e db pinned) · `skills/` excluded from all gates ·
`bun audit` ZERO · the mobile drawer battery green on both apps (ours
e2e-pinned: open, navigate, escape, viewport-grow auto-close, working
scroll lock).

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the hydration-suppression census in `tests/src-census.test.ts`:** layout.tsx's `<html>` element carries `suppressHydrationWarning`; app-shell.tsx's `<main>` element carries it (both read from source, with the finding's history in the check's narration). Flip docs-counts' `CANONICAL.unitChecks` 324→**325** AND `CANONICAL.e2eChecks` 42→**43** (the e2e net lands this round; both ladders move in this one commit per the count-ladder rule). RED verified: the census check fails on the two absent attributes; the ladder carriers fail until WP-3's doc lockstep | RED as predicted |
| 2 | **GREEN — the cure + the net:** (a) `layout.tsx`: `<html lang="en" suppressHydrationWarning>` with the why-comment (the theme store's pre-hydration writes — the four attributes + the `.dark` class; the next-themes canonical; scoped to the element, children keep their checks); (b) `app-shell.tsx`: `<main suppressHydrationWarning …>` with the why-comment (the bgImageUrl style write); (c) `tests/e2e/shell.spec.ts`: the console-hygiene check — collectors for `console` error/warning + `pageerror` attached before the walk, all 11 capitalized module routes, `main` visible per page, `expect(offenders, offenders.join("\n")).toEqual([])`. NOTE: the net PASSES pre- and post-cure (the probes were clean — the race window is not deterministically reproducible); its job is the class-level regression net, and the census check is F-1/F-2's RED→GREEN signal | census GREEN; tsc 0; the net green on the first run |
| 3 | **The count ladder + docs:** 324→**325** at all 13 live-tense unit sites; 42→**43** at every e2e site (README badge + testing section, AGENTS commands + testing conventions, CLAUDE pyramid, PAD §8.1 rows + totals, SKILL §4/§19); PAD §8.1: the shell row 6→**7**, the infra row 126→**127** (109+89+127=325) with the category list gaining the hydration-suppression census; SKILL §11 gains the probe-preset protocol amendment (F-4); SKILL v1.13.0→**v1.14.0** with §12 lesson 20: "the console is a surface the gate never read — an error class can ship for fifteen rounds behind green checks because assertions see the DOM, not the console; pin the console itself as a net, and cure the writer — a timing-race error is still an error" | rg-verified, docs-counts GREEN |
| 4 | **Full gate re-run:** lint → typecheck → test (**325**) → build → smoke 14/14 → e2e **43/43** → db census + `bun audit` ZERO | full green |
| 5 | **Captures:** re-take the 16-file set from the dev server. **All 16 predicted byte-stable** vs the WH-15 set (two React attributes render zero pixels; same-date 07-events — the today-cell does not move). md5 every file; verify non-blank + color diversity. `.env` ↔ `.env.example` parity re-verify. Delete the four scratch probe scripts (`scripts/console-probe-wh16*.mjs`, `scripts/class-census-wh16.mjs` — untracked scratch, removed before the commit) | captures + prediction check |
| 6 | **worklog WH-16 entry + this plan's execution record + `docs/session_28.md`** (the round's transcript; the operator's session_27.md push never clobbered) | worklog |
| 7 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **`suppressHydrationWarning` on the two elements, not a rewrite of the
  write path (the round's core decision):** the alternative — moving the
  pre-hydration theme application into an inline `<head>` script (the full
  next-themes architecture) — would change the theme boot seam, the store's
  ownership of the writes, and the flash behavior for zero additional
  correctness over the one-attribute cure. The zustand-persist-at-init
  write path is the documented design (ADR-006's local-first render); the
  mismatch is only the WARNING, and suppressing it on the two written
  elements is the canonical, minimal, ecosystem-standard cure. Revisit only
  if a future theme feature needs pre-paint application on first visit
  (the current path already applies pre-paint in practice).
- **The suppression is element-scoped and safe:** React's
  `suppressHydrationWarning` silences the diff warning for THAT element's
  attributes and text content only — child elements keep their own
  hydration checks (the next-themes precedent ships exactly this on
  `<html>`). No real mismatch on the walked surfaces is being hidden: the
  probes this round verified every page's rendered DOM matches the
  reference identity byte-for-byte.
- **The e2e net asserts strict zero, with no ignore list:** the production
  standalone build's console is clean on all 12 probed routes (the only
  noise classes observed were the React-DevTools `[info]` line — not an
  error/warning — and dev-mode-only HMR chatter, absent in the e2e
  artifact). If a legitimate benign warning class ever appears (a browser
  quirk, a dependency deprecation), the net FAILS and the round that
  introduces it must either cure it or pin the documented ignore entry —
  the house's "never weaken a guardrail silently" rule.
- **The hydration race is not deterministically reproducible, so the net
  cannot be its RED signal:** the unit census (the static attribute
  contract) is F-1/F-2's RED→GREEN; the net is the class-level tripwire
  (it would catch a hydration mismatch that fires on EVERY load — the
  deterministic forms of the class — plus every other console error class).
  Both ship in this round; their roles are narrated in the census + the
  spec.
- **F-4's protocol amendment rides SKILL §11 (not a §12 lesson):** the
  lesson-numbered entries are engineering-class distillations; the preset
  residue is a probe-protocol step (read the account's preset at probe
  start; verify the revert SAVED after preset probes). It lands as §11
  amendment + this plan's narrative.
- **The count ladder (exact):** 324 + 1 (the hydration-suppression census
  check in src-census.test.ts — an infra file, no new suite) = **325 unit
  checks / 21 suites**; 42 + 1 (the console-hygiene check in shell.spec.ts)
  = **43 e2e checks / 5 specs + 1 setup**; smoke stays 14; the §8.1 infra
  row 126+1 = **127** (109+89+127=325), the shell row 6+1 = **7**.
- **SKILL v1.13.0→v1.14.0 (the minor convention):** §12 lesson 20 is a new
  entry, not a correction.
- **The session file (WP-6):** the operator's numbering pushed session_27.md
  (the WH-15 raw transcript); this round's transcript file is
  `docs/session_28.md`, matching the house pattern.
- **Declined (documented, not taken):** the functional-superset round (real
  video URLs, OAuth wiring — fourteenth deferral; the Watch-Now
  placeholders re-verified href-less this round); the inline-script theme
  boot rewrite (see the core decision); widening the console net to the
  auth pages' post-login flows (the auth spec's territory — its surfaces
  are already walked by the reset-password + auth specs; the net covers the
  module walk where the theme store runs).

---

## 4. Execution record (2026-10-30, WH-16 — filled as executed)

- **Baseline gate (live, workspace at 603d145):** lint 0/0 · tsc 0 · unit
  324/324 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census MATCH ·
  bun audit ZERO — the documented WH-15 ship state, no flake. — §1
- **The reference probe:** the content/behavior layer clean (identity map
  unchanged on all 11 pages — computed H1 gradients byte-identical; the
  drawer battery; the 404; the placeholders; the quick actions; the login
  surfaces); the seed-content watch round 5 verified byte-for-byte (23/23);
  the entity-API watch round 4 verified (12 rows, 13 keys, views:0); the
  compiled-CSS watch round 3 verified (hash unchanged — no redeployment).
  The F-4 preset residue caught + cured (Indigo Dream re-applied + Save,
  the brand family computed-verified back at #6366f1→#a855f7). — §1
- **The codebase audit:** the console-hygiene walk (agent-browser + fresh
  Playwright contexts — cold, warm, stored-preset, CPU-throttled, dev +
  production builds) isolated F-1 (the one verified hydration-mismatch
  occurrence with the full React diff tree) from the reference's own
  console noise (its Tailwind-CDN warning + its untitled drawer — the
  documented foreign classes); the zod↔prisma field-precision walk clean;
  the compiled-CSS class census dry-run clean (1,010 tokens); the
  bare-fetch/Tailwind-pin/SEO/env/skills-exclusion clean classes
  re-verified. F-1 through F-4 enumerated with evidence. — §1
- (WP-1 through WP-7: filled as executed below.)

- **WP-1 (RED):** the hydration-suppression census check landed in
  `tests/src-census.test.ts` (layout.tsx's `<html>` + app-shell.tsx's
  `<main>` must carry `suppressHydrationWarning` — the check carries the
  F-1/F-2 history and names its e2e twin); the CANONICAL flips landed in
  the same step (`unitChecks` 324→**325**, `e2eChecks` 42→**43** — both
  ladders move in this one commit per the count-ladder rule). RED verified:
  exactly the census check (1 failed | 18 passed in src-census) + the 6
  docs-counts ladder carriers (the five docs + the §8.1 row arithmetic).
- **WP-2 (GREEN):** `suppressHydrationWarning` on `<html>` (layout.tsx,
  with the why-comment: the theme store's four client-only attributes +
  the `.dark` class, the next-themes canonical, element-scoped) and on
  `<main>` (app-shell.tsx, the bgImageUrl write class one element down);
  the e2e console-hygiene net in `shell.spec.ts` (the console/pageerror
  collectors attached before the walk, all 11 capitalized module routes,
  `main` visible + a 250ms settle per page, strict zero with the offender
  list in the failure message). tsc 0 on the first run; the census GREEN
  19/19; the net green on its first run (as designed — the race window is
  not deterministically reproducible; the net is the class-level tripwire,
  the census is the RED→GREEN signal).
- **WP-3 (the ladder + docs):** 324→**325** at all 13 live-tense unit
  sites; 42→**43** at every e2e site (README badge + table + testing
  section + superset row, AGENTS commands + gate order + the testing
  conventions gaining the console-net bullet, CLAUDE table + pyramid, PAD
  tree + §8.1 rows [infra 126→127 with the category list gaining the
  hydration-suppression census; shell 6→7 gaining the net] + totals +
  checklist, SKILL §2 table + §11 gate counts + the census list + §12
  lesson 20 + lesson 19's probe-preset coda + the description + the
  provenance + v1.13.0→**v1.14.0**). docs-counts GREEN 10/10.
- **WP-4 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **325/325 (21 suites)** · build OK · smoke 14/14 · e2e **43/43** (the
  console-hygiene net green as check 43) · db census MATCH · `bun audit`
  ZERO. One infrastructure event: the first e2e run tripped on a stray
  standalone server the round's own production probe had left on the
  pinned e2e port (3100) — killed, re-run, green.
- **WP-5 (captures):** the 16-file set via the house agent-browser
  procedure (desktop 1280×900, mobile 390×844). **14/16 byte-stable** —
  the prediction's core (the cure renders zero pixels) proven by every
  desktop page + the login surfaces. The two movers root-caused as
  interaction/raster artifacts, not app changes: (a) 14-mobile-dashboard —
  21 scattered pixels at Δ≤10, all at tile 4's rounded-corner
  anti-aliasing edges; deterministic within this session (an md5-identical
  re-run), so a raster-level difference vs the WH-15 capture moment; (b)
  16-mobile-drawer-nav-exercise — the trigger's focus-VISIBLE ring present
  in the WH-15 capture, absent in this round's; the trigger IS focused in
  both (activeElement verified live) — the ring's visibility is
  Chromium's focus-visible heuristic outcome of the two scripts'
  different interaction paths, and the focus-restore behavior itself is
  e2e-pinned. The scratch script's own two bugs were caught and cured
  mid-WP by its state assertions: the first attempt's 12 desktop "movers"
  were the script's viewport error (1280×800 vs the house 1280×900), and
  its mobile movers were the persistent-mouse-position hover states (the
  login click parks the cursor on stat tile 3 → the group-hover
  opacity-5→10 wash tints the capture; the drawer link under the cursor
  gains its hover tint) — cured by parking the mouse on the neutral
  header edge after login + a real trigger click for the drawer battery.
  The drawer auto-close proof held during capture 16 (the post-nav dialog
  unmounted, path-verified at /Exercise). All 16 verified non-blank.
  `.env` ↔ `.env.example` parity re-verified (the AUTH_SECRET value only).
- **WP-6:** the worklog WH-16 entry + this record + docs/session_28.md.
- **WP-7:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
