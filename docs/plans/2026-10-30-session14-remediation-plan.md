# Session-14 Remediation Plan — the design-token census round (WH-14)

**Task ID:** WH-14 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 48f6b3c`: WH-13 shipped at
`33865c4` — the schema-field census round — plus the operator's
session_23.md transcript push), re-probe the live reference for new surfaces
AND seed-content/entity-API drift, fix every identified gap with TDD,
lockstep the five docs + `worklog.md`, and push.

> **Provenance note:** every prior census reads a code-surface declaration
> form — exported values (WH-7), members (WH-8/WH-9), exported types
> (WH-11), JSX pass sites (WH-12), Prisma columns (WH-13). None of them
> reads the DESIGN-SYSTEM layer: the `@theme` token block in
> `globals.css` (the app's own design tokens) and the Tailwind v4 SOURCE
> SCAN that compiles the production stylesheet. The WH-14 audit walked
> both, live, and found the round's three findings there.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the fresh
clone at `48f6b3c`, environment bootstrapped from `.env.example` +
`db:push` + `db:seed`):** lint 0/0 · tsc 0 · unit **318/318 (21
suites)** · `bun run build` OK · smoke **14/14** · e2e **42/42** · db
census MATCH (users=1 templates=11 steps=50 tutorials=12 badges=8) ·
`bun audit` **ZERO** — the exact documented WH-13 ship state, no flake
(one environment-only hurdle: the sandbox's Playwright browser binary
was missing on the fresh clone — `bunx playwright install chromium`
reinstalled it, the repo untouched; the known WH-6-class sandbox reset).

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 10 nav pages + Profile walked — **ZERO new surfaces since
WH-13**; every title in the documented pattern (Dashboard ships the bare
"EvolveWell"); the mobile drawer battery at 390×844: 11 items, the
stays-open-after-nav quirk re-verified (drawer still open at /Exercise,
no scroll lock — ours AUTO-CLOSES + releases, the e2e-pinned superset,
42/42 green in this round's baseline); the sonner-overlay quirk again
intercepted its own toggle click (the JS-dispatch workaround, as every
round); the Profile tabs re-verified in full (Appearance incl. the
Background-Image / Image-URL surface + Quick Presets + the color/font/
sidebar/card/animation selectors; Account read-only; Preferences = the
two documented toggle rows); the "Watch Video" buttons still carry no
real hrefs (the intentional-parity placeholder state); the 404 surface
re-verified.

**The seed-content watch (round 3 of the class):** the reference's 11
routine-template names (card-text walk on /Routines) and 12 tutorial
titles (img-alt walk on /Learning) compared against `prisma/seed.ts` —
**byte-for-byte parity on all 23 content names**, no reference drift.

**The entity-API shape watch (round 2 of the class):** the reference's
Tutorial entity API HAR-probed live
(`entities/Tutorial?sort=-created_date` — 12 rows, 13 keys, `views: 0`
on all 12, its UI never displays it) — the SCHEMA_PARITY_KEEPS evidence
holds; no drift.

**Findings (by severity) — the WH-14 ledger, in the DESIGN-SYSTEM layer
no census reads:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **59 dead `@theme` tokens** (of 131 declared). (a) 10 semantic: `--color-primary-foreground`, `--color-sidebar-active` (the active pill was built on `bg-primary/10 text-primary` — the token is dead since birth), `--color-sidebar-accent-foreground` (**written** by the theme store's `applyTheme` at `theme-store.ts:66`, **read by nobody** — the WH-8 write-only-member class as a CSS custom property), `--color-line-strong`, `--color-success-soft`, `--color-warning`, `--color-warning-soft`, `--color-danger-soft`, `--color-info`, `--color-info-soft` (the toast's info variant rides `text-primary`; only `text-success`/`text-danger` are live); (b) 3 radius: `--radius-card`/`--radius-button`/`--radius-pill` (zero `rounded-card/button/pill` usage); (c) 2 animate + 2 keyframes: `--animate-fade-in`/`--animate-slide-in-right` + their `@keyframes` (the "Animations for Radix primitives" comment is stale — the Radix pairs ride the vendored tw-animate.css: `animate-in/out`, `fade-in-0`, `slide-in-from-left`…); (d) 44 unused v3 palette re-pins (the session-88 block's own documented contract is "every literal (family, step) pair **used in src/**" — 44 of 94 pinned pairs have zero usage). Riding the dead set: 3 `.dark` overrides (`sidebar-active`, `sidebar-accent-foreground`, `line-strong`) and the theme-store write. | `src/app/globals.css` @theme + .dark · `src/stores/theme-store.ts:66` | Drop the 59 declarations + the 2 `@keyframes` + the 3 dark overrides + the theme-store write; reword the two stale comments (the Radix-animation one retires with its tokens; the session-88 tail restates the used-pairs contract) |
| F-2 | **HIGH (infra)** | **The unpinned Tailwind source scan.** Tailwind v4's automatic content detection scans every TRACKED file in the repo — the operator's `skills/` catalog (373 skills of engineering markdown), `docs/` (session transcripts + plans), and the root `.md` corpus (worklog, SKILL, PAD, neo-crm_SKILL.md 1.15 MB) — none of which renders a single element. The production stylesheet carried **1,013 of 1,419 selectors (71% of 160,639 bytes) of markdown-born dead weight** (e.g. `.bg-cyan-400`, `.bg-red-400`, `.bg-purple-400`, `.accent-danger`, ~1,000 more compiled from documentation examples). | `src/app/globals.css` (no source pin) | The three `@source not` directives (`../../skills`, `../../docs`, `../**/*.md`) — **validated live this round before landing**: the rebuild compiles to **75,648 bytes (−53%)**, the token-level selector diff shows **zero src-used selectors lost**, e2e **42/42** and smoke **14/14** green on the pinned build |
| F-3 | **MEDIUM (parity)** | **The session-88 pin gap: 19 USED palette pairs ride v4 defaults.** The contract ("every literal pair used in src/ is re-pinned to its v3 value") is violated by 19 pairs the sweep missed or that landed after it: `amber-600`, `amber-950`, `blue-950`, `emerald-500`, `emerald-950`, `indigo-50`, `indigo-600`, `neutral-700`, `neutral-800`, `neutral-950`, `pink-50`, `pink-600`, `red-950`, `sky-50`, `sky-600`, `teal-50`, `teal-600`, `violet-50`, `violet-600` — the constants' chip-tint vocabulary (workout/mood/priority/category/type/frequency chips) and the dark-mode 950 washes. **14 of the 19 verified against the reference's own live compiled stylesheet** (`static/index-eZhxKCJC.css`, fetched this round: `.text-teal-600{rgb(13 148 136)}`, `.text-sky-600{rgb(2 132 199)}`, `.text-violet-600{rgb(124 58 237)}`, `.text-indigo-600{rgb(79 70 229)}`, `.text-amber-600{rgb(217 119 6)}`, `.text-emerald-500{rgb(16 185 129)}`, `.text-pink-600{rgb(219 39 119)}`, `.bg-teal-50{rgb(240 253 250)}`, `.bg-sky-50{rgb(240 249 255)}`, `.bg-violet-50{rgb(245 243 255)}`, `.bg-indigo-50{rgb(238 242 255)}`, `.bg-neutral-700/800/950{rgb(64 64 64)/(38 38 38)/(10 10 10)}`) — our unpinned copies compute the v4 re-derived values (e.g. teal-600 `#009588` vs the reference's `#0d9488`), a live-probed drift on every chip surface. The 5 absent-from-reference pairs (`amber/blue/emerald/red-950`, `pink-50` — our dark-mode + flashcards superset) pin to the standard v3 defaults. | `src/app/globals.css` session-88 block | Add the 19 v3 pins. **Pixel movement expected**: the chip-tint text colors change on the tint-bearing captures (the login Sprout icon `emerald-500`, the type/mood/priority/category/frequency chips across Exercise/Mental Health/Assignments/Events/Study Resources/Reminders/Learning/Goals/Dashboard) — the first intentional capture movement since WH-9, predicted here and verified by md5 at capture time (the dark-only pairs move nothing in light-mode captures) |
| F-4 | **Systemic (the round's TDD feature)** | **No pin for either surface.** No census reads `@theme` tokens, the source-scan directives, or the pin-completeness contract. F-1 rode thirteen rounds through six census-extension rounds; F-2's 85 KB of markdown-born CSS shipped through every capture round (never rendered, so never caught); F-3's drift is invisible to every existing pin. | `tests/src-census.test.ts` | **TDD:** (a) the @theme token liveness census — every declared token must be consumed (a utility-suffix hit in the app-source class-token corpus OR a `var()` read in app source; the `.dark` override keys must all reference live tokens; `@keyframes` inside `@theme` must belong to a live `--animate-*`); (b) the source-scan directive pin (the three `@source not` lines, structurally); (c) the palette pin-completeness check — every USED `(family, step)` pair in the class-token corpus (family ∈ the v3 palette families) must carry a `@theme` pin; together with (a) this pins the pins⇔usage equivalence in BOTH directions |

**Clean checks (no findings, documented):** the full baseline gate (42/42,
no flake) · the reference probe (zero new surfaces; the drawer battery; the
Profile tabs incl. both apps' Background-Image surface; the 404) · the
seed-content watch round 3 (23/23 byte-for-byte) · the entity-API shape
watch round 2 (12 rows / 13 keys / views:0) · the compiled-CSS **class**
census dry-run (464 static class tokens from `src/**` — every one present
in the compiled stylesheet or the custom classes; zero dead class strings;
the extraction's 7 initial false positives were ternary comparison values
(`=== "completed"`) and a `goto("signup")` argument, not classes — the
WH-13 vocabulary lesson re-learned) · the zod↔schema field map (every
zod field maps to a live column or computed member; `prefsSchema` ↔
UserPrefs exact) · `DashboardData`'s 9 derived members all consumed by
the dashboard page · the vendored `tw-animate.css` live (imported at
globals.css:2; its utilities power the drawer/dialog/toast animations) ·
the env-contract census (six documented vars; `.env` ↔ `.env.example`
key parity, AUTH_SECRET value only) · `package.json` scripts all live ·
zero console.log/TODO/debugger markers · `skills/` excluded from
lint/tsc/vitest · the Tailwind v4 pins standing (`@custom-variant hover`,
literal-hex `@theme`, `--shadow-sm`, `--blur-sm`) · the SEO family
(`sitemap.xml`/`robots.txt`/`manifest.json` route handlers; smoke check
12) · `db/` at the repo root with `DATABASE_URL="file:../db/custom.db"`
(resolved against `prisma/schema.prisma`; census MATCH) · vitest +
playwright configs per the contract · the WH-13 diff review (16 files,
exactly as its plan documented) · `bun audit` ZERO.

**The dry-runs (the plan's pre-landing validation, the house doctrine):**
the token census ran as three scratch probes against the live tree
(`scripts/theme-token-census-*.py`) — v1's 27 candidates refined to v2's
131-token classification after two false-pass classes were caught (the
compiled CSS's `:root` variable dump contains every token NAME — a
compiled-presence test false-passes; and the markdown-scan pollution
compiles `.rounded-card`/`.rounded-pill` from `skills/` examples — a
compiled-selector test false-passes): the app-source class-token corpus
is the only consumption oracle, and it returned **exactly 72 live + 59
dead** with every live classification spot-verified by Grep (amber-300/
500, emerald-200, rose-200, gray-800, cyan-600, blue-600/700 all real
class strings; the sidebar family's live four verified in page-layout)
· the pin-gap probe (`scripts/palette-pin-gap.py`) returned exactly 19
used-but-unpinned pairs (one artifact — `offset-2` from `ring-offset-2`
— excluded by the palette-family allowlist) · the F-2 fix was validated
end-to-end BEFORE this plan (selector diff, e2e, smoke, byte count).

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the three census checks in `tests/src-census.test.ts`:** (a) the @theme token liveness census (model: the WH-13 schema census — walk `@theme` blocks, extract tokens, assert consumption via utility-suffix OR var() read; fold in the dark-override key liveness + the @keyframes ownership assertions); (b) the source-scan directive pin (the three exact `@source not` lines present in globals.css); (c) the palette pin-completeness check (every used pair pinned, family ∈ the v3 palette families). Flip docs-counts' `CANONICAL.unitChecks` 318→**321** in the same step. RED verified: (a) fails with exactly the 59 predicted dead tokens; (b) GREEN at birth only if the F-2 directives are re-applied first — they are (this plan's F-2 fix precedes WP-1; the pin locks it); (c) fails with exactly the 19 predicted unpinned pairs | RED as predicted |
| 2 | **GREEN — F-1 + F-3:** globals.css drops the 59 token declarations + the 2 `@keyframes` + the 3 dark overrides; the session-88 comment tail restates the used-pairs contract at the post-cure truth; the stale Radix-animation comment retires with its tokens; the 19 v3 pins land in the session-88 block (14 reference-verified + 5 standard-v3); `theme-store.ts` drops the `--color-sidebar-accent-foreground` write. Rebuild + verify: tsc 0, the census (a) GREEN at 72 live tokens, (c) GREEN at 69 pinned = 69 used, the compiled CSS re-measured (~75 KB held, the 19 new pins add bytes only as USED utilities — no pollution path reopens) | census GREEN; tsc 0; unit 321/321 after WP-3 |
| 3 | **The count ladder + docs:** 318→**321** at all 13 live-tense sites (README badge + stack + testing + superset · AGENTS commands + gate order · CLAUDE build table + test pyramid · PAD §3.2 tree + §8.1 totals + §9.3 pre-ship · SKILL §2 + §11); PAD §8.1's infra row 120→**123** (109+89+123=321) with the category list gaining the design-token census; SKILL §19's table cure (the 5 dead-token rows drop: primary-foreground, sidebar-active, line-strong folds into the line row, warning/info/soft rows retire or restate at the live truth; the palette-block line restates the 69-pair census-enforced contract); PAD §5.2 gains the @source pin narration; AGENTS' Tailwind-pins section gains the source-scan pin line + the census bullet extends; SKILL v1.11.0→**v1.12.0** (description + provenance + §11 + §12 lesson 18: "a design token is a declaration like any other — the consumption verb for a TOKEN is the utility or the var() read; and the compiled stylesheet is not a liveness oracle — it carries every declared token's name and every markdown-mentioned class") | rg-verified, docs-counts GREEN |
| 4 | **Full gate re-run:** lint → typecheck → test (**321**) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` ZERO | full green |
| 5 | **Captures:** re-take the 16-file set from the dev server (the WH-13 script, adjusted). **Movers predicted**: the tint-bearing captures (01/13 login — the emerald-500 Sprout icon; 02 dashboard; 03 routines; 04 exercise; 05 mentalhealth; 06 assignments; 07 events; 08 studyresources; 09 reminders; 10 learning; 11 goals; 14 mobile-dashboard — the chip surfaces) — the 19 v3 pins change chip text/icon colors from the v4 re-derived values to the reference's own; the dark-only pairs (950s, neutral-700/800) move nothing in light mode; 12 profile / 15 mobile-login-nav / 16 mobile-drawer-nav expected byte-stable (no tint surfaces). md5 every file; the movers list verified against this prediction. `.env` ↔ `.env.example` parity re-verify | captures + predicted-mover check |
| 6 | **worklog WH-14 entry + this plan's execution record + `docs/session_24.md`** (the round's transcript; the operator's session_23.md push never clobbered) | worklog |
| 7 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **A token's consumption verb is the UTILITY or the var() READ (the
  round's lesson, the WH-8/WH-13 doctrine's token form):** the census
  counts a token live only when a class string in app source carries a
  utility resolving to it (`text-amber-600`, `rounded-xl`…
  `shadow-sm`, `backdrop-blur-sm` — both re-pins pass naturally as
  utilities, no exemption needed) or a `var(--token)` read exists in app
  source (the globals body rules read `--color-foreground`/`--color-line`/
  `--color-ring`/`--font-sans`; the mental-health slider reads
  `--color-primary` via `accent-[var(--color-primary)]`). A declaration
  (`@theme`), an override (`.dark`), and a runtime WRITE
  (`setProperty`) are authorship, not consumption —
  `--color-sidebar-accent-foreground` was written by the theme store on
  every preset apply and read by nobody.
- **The compiled stylesheet is NOT a liveness oracle:** it contains (a)
  every declared token's name in the `:root` variable dump (a
  compiled-presence test false-passes dead tokens) and (b) every class
  string mentioned in ANY tracked file — `skills/` documentation examples
  were compiling 71% of the stylesheet. The census's consumption corpus is
  app source only; the F-2 directives stop the pollution at the source.
- **The F-2 fix is exclusion, not allowlist:** the three `@source not`
  directives (skills, docs, *.md) keep Tailwind's automatic detection for
  everything else (src/**, config files, any future asset). An explicit
  `@source` allowlist would be a stronger pin but a riskier change (a
  new class in a non-scanned location would silently not compile); the
  house keeps the change surgical. Zero src-used selectors were lost —
  proven by the token-level diff, not asserted.
- **The 44 unused palette pins retire; the 19 used-but-unpinned pairs
  gain pins — the contract pins BOTH directions:** the session-88 block's
  own documented contract is "every literal pair used in src/". The
  retirement direction follows the WH-3 chart-token precedent (six
  zero-consumer `--color-chart-*` tokens retired); the completion
  direction follows the contract's own wording, with 14 of 19 values
  verified against the reference's live compiled stylesheet this round
  (the other 5 — the dark-mode 950s + `pink-50` — are our superset and
  pin to the standard v3 palette the block already carries). After the
  cure: 69 pinned pairs = 69 used pairs, exactly, census-enforced.
- **The capture movement is intentional and predicted (the first since
  WH-9):** the 19 pins change rendered colors on chip surfaces (the
  reference's own values — the drift cure). The movers are enumerated in
  WP-5; the md5 ledger verifies the prediction. Byte-stability is the
  rule ONLY for zero-pixel rounds; this round's movement is the parity
  fix itself, narrated as such in the worklog + session doc.
- **The keyframes die with their tokens:** `@keyframes fade-in` /
  `slide-in-right` live inside `@theme` and exist only to feed their
  dead `--animate-*` tokens; the census asserts the ownership relation
  (a keyframe inside `@theme` must belong to a live animate token).
- **The dark-block liveness folds into the token census (not a separate
  check):** every `.dark` override key must reference a live `@theme`
  token — after the cure, 13 overrides, all live. A dead token's
  override is dead weight of the second order.
- **The count ladder (exact):** 318 + 3 (the token census + the
  source-scan pin + the pin-completeness check, all riding
  src-census.test.ts — an infra file) = **321 checks / 21 suites** (no
  new suite). e2e stays 42; smoke stays 14; the §8.1 infra row 120+3 =
  **123** (109+89+123=321, the row-arithmetic pin green at the new
  truth).
- **SKILL v1.11.0→v1.12.0 (the minor convention):** §12 lesson 18 is a
  new entry, not a correction.
- **The session file (WP-6):** the operator's numbering pushed
  session_23.md (the WH-13 raw transcript); this round's transcript file
  is `docs/session_24.md`, matching the house pattern.
- **Declined (documented, not taken):** the functional-superset round
  (real video URLs, OAuth wiring — twelfth deferral; the probe re-confirmed
  the reference's own placeholder state: its Watch Video buttons carry no
  hrefs); the per-model field-precision widening and the className
  common-word tightening (zero offenders — the compiled-CSS class census
  dry-run returned 464/464 live; the house pins when a finding lands, and
  none did — though the class-census DESIGN is recorded here for the
  round that needs it); the explicit `@source` allowlist (see above).

---

## 4. Execution record (2026-10-30, WH-14 — filled as executed)

- **Baseline gate (live, fresh clone at 48f6b3c):** lint 0/0 · tsc 0 ·
  unit 318/318 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · bun audit ZERO — the documented WH-13 ship state, no flake. — §1
- **The reference probe:** zero new surfaces; the drawer battery green on
  the reference (11 items, stays-open quirk, no scroll lock); the Profile
  tabs re-verified; the 404 re-verified; the seed-content watch round 3
  verified byte-for-byte (11 templates + 12 tutorials); the entity-API
  watch round 2 verified (12 rows, 13 keys, views:0). — §1
- **The plan's pre-landing validation:** the token census dry-run
  classified 131 tokens → 72 live + 59 dead, every live classification
  spot-verified; the pin-gap probe returned exactly 19 pairs; the F-2 fix
  validated end-to-end (75,648 bytes, zero lost selectors, e2e 42/42,
  smoke 14/14). — §1
- (WP-1 through WP-7: filled as executed below.)

- **WP-1 (RED):** the three census checks landed in `tests/src-census.test.ts`
  (the @theme token liveness census with the dark-override + keyframes
  ownership assertions folded in · the source-scan directive pin · the
  palette pin-completeness check); CANONICAL flipped 318→321 in the same
  step. RED verified with exactly the predicted sets: the token census
  failed with the 59 dead tokens + the 3 dark-override-of-dead entries +
  the 2 orphan keyframes (64 entries); the pin-completeness check failed
  with exactly the 19 predicted pairs; the source-scan pin GREEN at birth
  (the F-2 fix precedes the pin, as the plan documents); docs-counts RED
  with exactly the 6 ladder carriers.
- **WP-2 (GREEN, F-1 + F-3):** globals.css dropped the 59 token
  declarations (10 semantic + 3 radius + 2 animate + 44 palette), the 2
  `@keyframes`, and the 3 dead `.dark` overrides; the session-88 comment
  restated at the post-cure truth (the 69-pair contract, the WH-14
  retirement + completion narrated); the stale Radix-animation comment
  retired with its tokens; the 19 v3 pins landed in family order; the
  feedback comment reworded at the live toast pair;
  `theme-store.ts` dropped the `--color-sidebar-accent-foreground`
  write (with the retirement narration). **tsc 0 on the first run**; the
  census GREEN 15/15; the palette recount 69 exactly. The rebuilt
  stylesheet: **73,950 bytes** (vs the WH-13 160,639 — the −54% posture:
  the @source exclusions hold, the 19 new pins compile as USED
  utilities only).
- **WP-3 (the ladder):** 318→321 at all 13 live-tense sites (README badge
  + stack + testing + superset · AGENTS commands + gate order · CLAUDE
  build table + test pyramid · PAD §3.2 tree + §8.1 totals + §9.3
  pre-ship · SKILL §2 + §11); PAD §8.1's infra row 120→**123**
  (109+89+123=321, the row-arithmetic pin green at the new truth) with
  the category list gaining the design-token/source-scan/palette-pin
  censuses; SKILL §4's brand + sidebar-family lines cured at the live
  truth (the primary-foreground drop; the active-pill narration —
  `bg-primary/10 text-primary`, no dedicated token); SKILL §19's five
  dead-token rows dropped + the line row restated + the palette-block
  line restated at the 69-pair census-enforced contract; PAD §5.2 gained
  the source-scan row; AGENTS' Tailwind-pins section gained the @source
  pin line + the census bullet extended; SKILL v1.11.0→**v1.12.0**
  (description + provenance + §12 lesson 18). docs-counts GREEN 10/10;
  the full unit suite **321/321 (21 suites)**.
- **WP-4 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **321/321 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · `bun audit` ZERO.
- **WP-5 (captures):** all 16 re-taken from the dev server (one
  script-in-one-invocation boot — the sandbox kills the server between
  calls; 01 pristine login first; the goals capture at the 2500ms
  settle; the drawer walk live-verified during capture 16 — the
  auto-close proof: the drawer closed after the /Exercise nav). md5:
  **13 moved, 3 stable** — exactly the predicted class: the movers are
  the tint-bearing surfaces (01/13 login — the emerald-500 Sprout icon;
  02/03/04/05/06/09/10/11 — the chip vocabulary; 14/15/16 — the mobile
  surfaces incl. the drawer-over-dashboard and the post-nav Exercise
  page), the stable three are 07-events + 08-studyresources (the
  fresh-seeded db renders zero rows — no chips to move; the empty state
  carries no tint) and 12-profile (no tint surface — as predicted).
  All 16 verified non-blank with healthy color diversity. `.env` ↔
  `.env.example` parity re-verified (the AUTH_SECRET value only).
- **WP-6:** the worklog WH-14 entry + this record + docs/session_24.md.
- **WP-7 (pending at record time):** commit to main + the SSH-wrapper
  push (paramiko shim; key outside the repo; dry-run → push → remote
  verify → shred).
