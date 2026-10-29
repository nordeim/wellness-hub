# Session-7 Remediation Plan — the exported-value census round

**Task ID:** WH-7 · **Date:** 2026-10-29 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ d6ad497`: session_9.md —
the WH-6 conversation's transcript; the tree is byte-identical to the WH-6
ship state `a35cd91` apart from that doc), re-probe the live reference for
new surfaces (the standing candidate), fix every identified gap with TDD,
lockstep the five docs + `worklog.md`, and push.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree):** lint 0/0 · tsc 0 · unit **331/331 (21 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **42/42** · db census MATCH
(users=1 templates=11 steps=50 tutorials=12 badges=8) · `bun audit`
**9 (4 high / 4 moderate / 1 low)** — the same count as the WH-6 ledger
but **re-triaged live: one NEW advisory chain** (below, F-6).

**The live reference re-probe (2026-10-29, logged in as the demo
account):** ALL 10 nav pages + Profile walked. **ZERO new surfaces since
WH-6** — the Account tab still read-only (name/email/role="user"
disabled), Preferences still the two checkboxes, Appearance unchanged
(3 modes, 8 presets, custom hex pair, font/background-image/style/
animation comboboxes). The **mobile drawer battery re-verified live on
BOTH apps**: 11 items on both; the reference drawer STAYS OPEN after a
nav click (its own quirk) while ours AUTO-CLOSES + releases the
scroll-lock (the documented superset); Escape closes on both; both
headers compute `blur(24px)` at z-index 10 (computed-style parity). The
reference's empty-sonner-toast overlay again intercepted the toggle
click for automation (its quirk, not ours — ours clicks cleanly). Zero
console errors on every walked surface of BOTH apps.

**Standing contracts re-verified:** `requireSession` on every non-public
handler (the 8 public: 7 auth + health — the documented design) ·
`force-dynamic`/`force-static` on all 31 API route files · the Tailwind
v4 pins standing (`@custom-variant hover` globals.css:20, `--shadow-sm`
:84, `--blur-sm` :93) and live in the browser (`--blur-sm: 4px`,
`--shadow-sm` at 5% alpha computed) · the SEO family solid (14-route
sitemap in the reference's byte format, robots, manifest) · `.env` ↔
`.env.example` byte-identical (both WELLNESS_*) · the mobile battery
(open → 11 items → drawer-nav → AUTO-CLOSE + lock release → Escape →
viewport-grow auto-close) green on our dev server · vitest/playwright
configs per the contract · zero TODO/console.log residue in src · zero
eslint-disable/ts-ignore/`as any` in src · zero bare `fetch` outside the
auth screens' login-family and the store (the login-card family is the
documented exception — pre-store surfaces) · zero sync-setState-in-effect
(all useEffect setState rides timers/listeners) · zero derived store
selectors without `useShallow`.

**Findings (by severity) — the WH-7 ledger, all in the
dead-exported-surface class the earlier census pins do not reach:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **Dead exported VALUE surface — 15 exports across 4 modules with ZERO consumers anywhere (production, tests, scripts):** `src/lib/page-layout.ts`: `DASHBOARD_TINTS`, `CARD`, `DIALOG_SUBMIT`, `MENU_CONTENT`, `MENU_ITEM`, `SEARCH_INPUT` (CARD's last consumer was the ui/card module retired at WH-4; the other five never shipped a consumer). `src/lib/constants.ts`: `NAV_ICONS` (+ the 10 lucide-react icon imports and the `LucideIcon` type import it exists to serve — nav-config.ts carries its own icons), `APP_LOGIN_SUBTITLE`. `src/components/shared/page-parts.tsx`: `OutlineButton`, `StatCard` (the dashboard hand-inlines its tiles via the STAT_CARD class constants — the component never shipped a JSX consumer). `src/lib/format.ts`: `formatMonthDayTime`, `formatWeekdayBulletTime`, `calendarFetchBounds` (zero callers anywhere). Exact class as WH-6's F-1, one layer wider: the WH-6 pin owns ONE contract module (api.ts); nothing gates individual exports elsewhere. | page-layout.ts, constants.ts, page-parts.tsx, format.ts | Retire all 15 + their now-orphaned imports; the export-census pin (F-5) owns the class |
| F-2 | **MEDIUM** | **The CRM-era dead subgraph of `src/lib/format.ts` — 18 exported functions** surviving on test pins alone. Production consumes exactly FOUR format functions (`formatDate` ×5 pages, `formatDateShort` ×3, `formatMonthYear` ×1, `formatMonthDayYearTime` ×2) + `MONTHS_SHORT` as their internal feed. Dead: the money family (`formatCurrency`, `formatCompactCurrency` — 12 test checks narrating CRM surfaces: "the reports uppercase-K variant", "the Sales Target formula", "the topbar hint"), relative time (`timeAgo`, `timeUntil` — 7 checks), the calendar family (`calendarGrid` — 4 checks, DUPLICATED by wellness.ts `monthGrid` which the events page actually uses and which is separately pinned in tests/wellness-helpers.test.ts; `calendarFetchBounds` — 0, its comment narrates CRM report periods), the date primitives (`isSameDay`, `startOfDay`, `endOfDay`, `addDays`, `startOfWeek`, `startOfMonth`, `subMonthsClamped`, `startOfYear`, `toLocalInputValue`, `formatTime`) whose only callers are the other dead functions — a self-feeding dead subgraph. The wellness domain has its own live primitives (toDayKey/isSameCalendarDay/dayDiff in wellness.ts). Per the route-census doctrine — "tests pin modules, they do not keep them alive" — the correct cure is retirement, with NEW pins landing first for the live format functions that lack them (formatDateShort, formatMonthYear, formatMonthDayYearTime). | src/lib/format.ts + tests/format.test.ts | Retire the 18 + 27 stale test checks; add 3 live-formatter pins; monthGrid already pinned in wellness-helpers |
| F-3 | **LOW** | **The dead CSS utility:** `@utility input-base` (globals.css:379) has ZERO class consumers — since the build commit (git-verified: never imported by any component; the Input component styles via the page-layout INPUT_BASE constant family, a different surface that happens to share the name). | src/app/globals.css:379-400 | Retire the block; the utility-liveness check (F-5) owns the class |
| F-4 | **LOW** | **Stale history-narration in live comments** (the WH-6 F-3 class, narrower): `src/lib/api.ts:63-71` narrates "the S36-P3 upload precedent / upload gate" and `src/lib/rate-limit.ts:5` narrates "the sessioned upload route at 20 (post-guard)" — the upload family retired at WH-4; the narration reads as live mechanics. The src-census pin gates cited TEST paths only, not cited retired surface. | api.ts, rate-limit.ts | Reword at the truth (name the retirement, the same comment cure as WH-6's F-1) |
| F-5 | **Systemic (the round's TDD feature)** | **No pin for the exported-value liveness class beyond api.ts, or for CSS-utility liveness.** WH-3 pinned the dep tree, WH-4 the route/ui module surface, WH-5 the docs' counts, WH-6 api.ts's export set + cited-test-paths + dup statements. Nothing test-gates (a) individual exported VALUES in the lib/shared modules (F-1's six page-layout exports survived because no pin walks export sites), (b) `@utility` blocks in globals.css (F-3's input-base survived since the build commit). F-1/F-2/F-3 are exactly these classes. | tests/ | **TDD:** extend `tests/src-census.test.ts` (the standing src-surface pin) with TWO checks: (1) the module export census — every exported `const`/`function` in the census modules (page-layout, constants, format, wellness, site, schemas, page-parts) must have a consumer outside its own module in src/ or tests/ (data feeds consumed same-module only keep the code but drop the `export` keyword); (2) the CSS-utility census — every `@utility NAME` block in globals.css must have `NAME` appearing as a class in src (components/lib/pages, excluding globals.css itself). RED at birth with exactly the F-1/F-3 offenders → cure → GREEN |
| F-6 | Informational | **The advisory posture moved under the same count:** the zod chain GHSA-mrhx-c7xc-m3w5 (memory exhaustion validating oversized constrained collections; fixed 4.6.6) — the DIRECT dep sits at 4.6.7 (NOT affected), but `eslint-config-next → eslint-plugin-react-hooks → zod@4.6.5` (dev-only lint toolchain) IS in range; no patched version exists above 4.6.7 on npm (latest = 4.6.7). Runtime exposure ZERO: both runtime array schemas (mood activities, study-resource tags) carry `.max(20)` — the advisory's exploit class is structurally blocked at the seam. No action; re-anchored in the docs (AGENTS + PAD §11) at WH-7. | the toolchain | No action; document |

**Clean checks (no findings):** the full baseline gate · the reference
probe (zero new surfaces; mobile battery green on both apps; header
computed parity blur(24px)/z-10) · requireSession/force-dynamic
coverage · the SEO family · the Tailwind pins (computed live) · `.env`
parity · the test configs · the db-path contract · the e2e isolation
contract · zero TODO/console residue · zero suppressions ·
`wellness.ts` fully live (every export has production call sites) · the
api.ts live twelve all live · no doc cites any retiring surface (the
count-ladder sites are the only doc impact).

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — extend `tests/src-census.test.ts`** with the two new checks: the module export census (validated by dry-run: RED with exactly the 15 dead exports of F-1 — 6 page-layout, 2 constants-value, 3 format-value, 2 page-parts, 2 format-from-F-2's set as they retire) and the CSS-utility census (RED with exactly `input-base`). Also flip docs-counts' CANONICAL to the post-landing truth: unitSuites 21→22 (export-census is a new suite? NO — it extends src-census.test.ts, suites STAY 21), unitChecks 331→final ladder (309: −27 format checks retired, +3 live-formatter pins, +2 census checks — exact at run time) | RED as predicted |
| 2 | **GREEN — F-1 (the dead exports):** retire the 15 dead values + their orphaned imports (NAV_ICONS takes the 10 lucide imports + LucideIcon with it; StatCard's LucideIcon type stays — SectionCard/PageHeader still use it) | pin GREEN on the export census |
| 3 | **GREEN — F-2 (the format.ts subgraph):** first land the 3 NEW live-formatter pins in tests/format.test.ts (formatDateShort, formatMonthYear, formatMonthDayYearTime — RED-less additions, they pass immediately; they pin already-working behavior), then retire the 18 dead functions + rewrite the file's section comments at the truth, then rewrite tests/format.test.ts: keep the live date-formatting checks (long date; em-dash restricted to formatDate), retire the 27 stale checks (currency ×12, relative time ×7, calendarGrid ×4, datetime-local ×1, session-68 ×5, date-block dead assertions ×3 — net −27) | ladder lands exactly |
| 4 | **GREEN — F-3 (the CSS utility):** delete the `@utility input-base` block from globals.css | pin GREEN on the utility census |
| 5 | **GREEN — F-4 (the comment cures):** api.ts:63-71 + rate-limit.ts:5 reworded at the truth (the upload family retired at WH-4; the narration names the retirement) | eyeball + rg-verify |
| 6 | **The count ladder:** run the unit suite → verify 331→309 checks / 21 suites (the exact arithmetic from WP-3); update EVERY count site in the same commit (README badge + stack table + testing + superset · AGENTS commands + gate order · CLAUDE build table + test pyramid · PAD §3.2 tree + §8.1 infra row + totals + §8.4 · SKILL §2 + §11) | rg-verified |
| 7 | **SKILL v1.4.0→v1.5.0 + advisory re-anchors:** the WH-7 provenance line · §11's count-recheck line names the new pin · AGENTS' + PAD §11's advisory posture re-anchored at WH-7 (the zod chain triage) | rg-verified |
| 8 | **Full gate re-run:** lint → typecheck → test (309) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` re-triage | full green |
| 9 | **Captures:** re-take the 16-file screenshot set from the remediated dev server (one logged-in session; 01-12 at 1280×900, 13-16 at 390×844 — the drawer walk live-verified during capture 16); md5 uniqueness; byte-stability vs the WH-6 set expected (F-1..F-4 touch zero visual surface). `.env`↔`.env.example` parity re-verify | captures |
| 10 | **worklog WH-7 entry + this plan's execution record + `docs/session_10.md`** (the round's transcript; session_9.md is the operator's own push, never clobbered) | worklog |
| 11 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **Retire, don't keep (F-1/F-2):** the exported-value doctrine is the
  WH-6 F-1 decision one layer wider — dead surface is drift liability,
  and "kept for future use" is speculative surface. The live format
  functions get NEW pins BEFORE the dead twins retire (the monthGrid
  precedent: the live implementation is already pinned in
  wellness-helpers.test.ts — the retirement of calendarGrid breaks
  nothing).
- **The census modules set (F-5 scope):** page-layout, constants, format,
  wellness, site, schemas (the lib seam modules) + page-parts (the
  shared component module). NOT the whole tree: a tree-wide
  export-level liveness census was already rejected at WH-6 (false
  positives on legitimate type/constant surfaces consumed by tests).
  The chosen set is where F-1 actually lived — the layout-constant and
  domain-vocab modules that hand class strings and option metadata to
  components. Types (`interface`/`type`) stay EXEMPT (internal-use type
  exports are an ergonomic, not drift liability — the F-3-class
  type exports like OptionMeta/ColorPreset/BadgeCounts keep their
  keyword). Data feeds consumed only same-module (TEMPLATE_DIFFICULTIES,
  MONTHS_SHORT, emailSchema, passwordSchema, DEFAULT_SITE_URL) keep the
  code but drop the `export` keyword — the census reads `export const/
  function` sites only.
- **formatTime retires with F-2** despite a live-looking pin: its only
  production consumer family is the events page, which uses wellness.ts
  `formatTimeString` (the live twin). The pin was the CRM-era test.
- **The count ladder (exact):** 331 − 27 (format retirements) + 3
  (live-formatter pins) + 2 (census checks) = **309 checks / 21
  suites** (the pin extends src-census.test.ts — no new suite).
  docs-counts' CANONICAL flips to 309 at WP-1 (post-landing truth) so
  only its per-doc claim checks carry the ladder RED. The e2e count
  stays 42; the smoke count stays 14.
- **F-6 posture:** no `overrides` pin is added for the eslint-plugin
  zod chain — overriding a transitive dev-toolchain dep to force a
  downgrade/upgrade has no patched target (4.6.7 IS the latest; the
  affected range is ≤4.6.5 per OSV, and the plugin resolves 4.6.5 only
  because bun dedupes the peer). The runtime posture is the honest
  answer: the direct dep is 4.6.7 (not affected), the seam caps every
  array at `.max(20)`. Document, don't override.
- **The session file (WP-10):** the operator's numbering pushed
  session_9.md (the WH-6 transcript); this round's transcript file is
  `docs/session_10.md`, matching the house pattern.
- **Screenshots (WP-9):** refresh in place — F-1..F-4 touch zero visual
  surface (dead exports, dead CSS never rendered, comment rewords), so
  captures 01-15 are expected byte-identical to the WH-6 set;
  byte-stability is itself the parity proof.

---

## 4. Execution record (2026-10-29, WH-7 — filled as executed)

- **Baseline gate GREEN pre-remediation (live):** lint 0/0 · tsc 0 ·
  unit 331/331 (21 suites) · build OK · smoke 14/14 · e2e 42/42 ·
  census MATCH · bun audit 9 re-triaged (the zod chain: F-6).
- **The reference probe: zero new surfaces; the mobile battery green on
  both apps; header computed parity (blur 24px, z-10); the reference's
  empty-toast-overlay quirk re-observed.** — see §1.
- **WP-1 (RED):** the src-census pin extended with the module export
  census + the CSS-utility census; RED at birth with exactly the 18
  predicted dead exports (the 15 F-1 values + the 3 data feeds that cure
  by un-exporting) and the one dead utility. **Two pin-self catches:**
  the pin's own comment first "consumed" the offender names it narrated
  (cured class-neutral + the pin's own file excluded from its corpus),
  and the export census correctly left the test-consumed format
  functions for WP-3's conscious same-commit retirement. docs-counts'
  CANONICAL flipped to 309/21 in the same step. One later lint catch:
  the loop variable named `module` tripped
  @next/next/no-assign-module-variable — renamed.
- **WP-2 (GREEN, F-1):** the fifteen dead values + their orphaned
  imports retired (NAV_ICONS took its ten lucide-react imports + the
  LucideIcon type import with it; page-parts dropped its now-orphaned
  STAT_CARD/BUTTON_CLASSES imports).
- **WP-3 (GREEN, F-2):** the three live-formatter pins landed FIRST
  (formatDateShort / formatMonthYear / formatMonthDayYearTime — they
  had shipped unpinned), then the 18 dead functions retired and
  tests/format.test.ts rewritten 29 → 5 checks (27 stale checks retired
  with the surface they lied about); format.ts rewritten to the four
  live formatters + their private feeds.
- **WP-4 (GREEN, F-3):** the @utility input-base block deleted.
- **WP-5 (GREEN, F-4):** the api.ts body-gate comment + the
  rate-limit.ts header cured at the truth — the upload narration retired
  with its surface, the WH-7 lines added.
- **WP-6 (the count ladder):** 331→309 at every doc site in the same
  commit (README ×4, AGENTS ×2 + the extended census bullet, CLAUDE ×2,
  PAD ×3, SKILL §2 + §11); rg-swept clean of live-tense 331s.
- **WP-7:** SKILL v1.4.0→v1.5.0 (the description + provenance + §11 +
  §12 lesson 11); the advisory posture re-anchored at WH-7 in AGENTS +
  PAD §11 (the zod-chain triage).
- **WP-8 (full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **309/309 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 ·
  census MATCH · bun audit 9 (4h/4m/1l) — re-triaged, re-anchored.
- **WP-9 (captures):** all 16 re-taken in one logged-in session; the
  drawer walk live-verified during capture 16. One procedure catch:
  capture 01 first tripped against the WH-6 set — the WH-6 take
  captured the pristine empty login form, the first WH-7 take caught
  the filled email mid-login (VLM-compared the diff region: placeholder
  vs typed text — procedure variance, zero app-surface drift); re-taken
  pristine: **captures 01-15 byte-identical to the WH-6 set** (only 16
  changed — the same timing-frame drift as every prior round);
  .env ↔ .env.example byte-identical.
- **WP-10:** the worklog WH-7 entry + this record +
  docs/session_10.md.
- **WP-11:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
