# Session-11 Remediation Plan — the type-export census round (WH-11)

**Task ID:** WH-11 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 3826a3e`: session_17.md —
the operator's WH-10 transcript push; the tree byte-identical to the WH-10
ship state `b5628f2` apart from that doc), re-probe the live reference for
new surfaces, fix every identified gap with TDD, lockstep the five docs +
`worklog.md`, and push.

> **Provenance note:** the census layers reach every VALUE surface (deps →
> lockfile resolutions → routes/modules → docs' counts and row arithmetic →
> src comments/exports/statements → exported values/CSS utilities → store
> members → ui export blocks → component props → theme members) — but every
> one of those regexes reads `export function/const` or export-block NAMES.
> The WH-11 audit found the **type-declaration surface** (`export type` /
> `export interface`) has never been censused: one hand-written domain
> interface is fully dead, and fifteen more exported types are consumed only
> inside their own modules — the exact class the WH-8 data-feed doctrine
> says cures by dropping the `export` keyword.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the pulled
tree at `3826a3e`):** lint 0/0 · tsc 0 · unit **315/315 (21
suites)** · `bun run build` OK · smoke **14/14** · e2e **42/42** · db
census MATCH (users=1 templates=11 steps=50 tutorials=12 badges=8) ·
`bun audit` **ZERO** — the exact documented WH-10 ship state, no flake.

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 10 nav pages + Profile walked — **ZERO new surfaces since
WH-10**; every title in the documented pattern (Dashboard ships the bare
"EvolveWell"; every inner route pipes "X | EvolveWell"); the Profile tabs
unchanged (Appearance 3 modes + 8 presets; Account read-only ×3;
Preferences 2 checkboxes); the mobile drawer battery at 390×844: 11 items,
the reference's stays-open-after-nav quirk re-verified (drawer still open at
/Exercise, no scroll lock) while ours AUTO-CLOSES + releases (the
e2e-pinned superset, 42/42 green in this round's baseline); the
sonner-overlay quirk again intercepted its own toggle click (the JS-dispatch
workaround, as every round); the reference's own console carries its
documented warnings (the tailwind CDN notice + the Radix DialogTitle/
Description a11y gaps in ITS drawer). "Continue with Google" present on the
login. The custom 404 ("Page Not Found" / "Go Home") re-verified — ours
ships the designed parity surface (session-12/194).

**Findings (by severity) — the WH-11 ledger, all in the type-export class
no census reads:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **The dead `UserPrefs` interface** — 13 lines (themeMode…updatedAt), ZERO consumers anywhere: nothing imports it (verified: the only `UserPrefs` matches outside the file are the Prisma MODEL declaration — a separate generated entity), and nothing inside `src/types/index.ts` references it either. The prefs ROUTE types through `db.userPrefs` (the generated client) + `prefsSchema` (Zod); the prefs CLIENT surface lives in the theme store's own state. The interface is the orphan of WH-8's store-slice retirement (its would-be consumer was the dead `prefs` slice) and survived three more rounds because the WH-7 value-census regex reads only `export (async) function` / `export const` — `export interface` is invisible to every census in the tree. | src/types/index.ts:173-185 | Retire the interface entirely (zero same-module references — nothing to keep) |
| F-2 | **MEDIUM** | **Twenty same-module-only exported types carry a dead `export` keyword** — each is referenced ONLY inside its own declaring module (the declarations are alive: they type the module's own functions/state/maps), but no file anywhere imports them by name. This is the WH-8 data-feed class in its type form: the export keyword is dead API surface that invites imports that shouldn't exist and inflates the module's perceived contract. The twenty, by module: `ToastVariant`, `ToastItem` (toast.tsx) · `ApiError`, `ApiResult`, `BoundedJson` (api.ts — the envelope vocabulary; the store's `call()` types the envelope through its own `Result`, never these) · `SessionPayload` (auth.ts) · `BootEnvReport` (boot-env.ts) · `ChunkStorage`, `ReloadDeps` (chunk-recovery.ts) · `OptionMeta`, `ColorPreset` (constants.ts) · `RateLimitResult` (rate-limit.ts) · `BadgeCounts`, `ReminderStatus` (wellness.ts) · `ThemeMode`, `ThemeState`, `ThemeData` (theme-store.ts) · `AchievementsData`, `WellnessState` (wellness-store.ts) · `RoutineStep` (types/index.ts — alive as the structural type of `RoutineTemplate.steps`). Five of the twenty — the store state contracts and the api envelope trio — hid from the audit's first census pass because that pass counted the src-census pin's own narration text (which names `WellnessState`/`ThemeState`/the api trio in its machinery) as a "consumer"; the corrected corpus excludes the pin's own text (the WH-7 SELF rule) and they surfaced. | 11 modules (list at left) | Drop the `export` keyword on each (the WH-8 doctrine: keep the declaration, un-export it); tsc is the gate — types are compile-time only. The WH-8/WH-9 member-census extraction regexes (`interface WellnessState \{`, `interface ThemeState \{`) match WITHOUT the export prefix — the pin machinery survives the drop (verified pre-plan) |
| F-3 | **Systemic (the round's TDD feature)** | **No pin for the exported-TYPE liveness surface.** The value census reads `export function/const`; the ui-export census reads `export { … }` blocks; the member censuses read destructures — the `export type/interface` declaration form sailed through five census-extension rounds uncensused, and F-1 lived inside it. | tests/src-census.test.ts | **TDD:** the exported-type liveness census — a WHOLE-TREE walk (every ts/tsx under src/, 103 modules — no fixed module list to maintain, a new module exporting types is covered at birth, and framework contracts need no exported types so the walk has zero false positives; dry-run verified: 39 declarations, 21 offenders, no noise). The check: every `export type/interface NAME` must be referenced in a corpus file OTHER than its declaring module (the WH-7 corpus design: src + tests + scripts + prisma, minus the module itself, minus the pin's own text). RED at birth with exactly the 21 offenders (F-1's interface + F-2's twenty) |
| F-4 | **Systemic (a same-commit consequence, not a new audit finding)** | **The WH-6 api-export census pins a 12-member canonical set that includes the three api types** (`ApiError`, `ApiResult`, `BoundedJson` in `API_EXPORTS`). F-2's cure takes api.ts's type exports to zero — the pinned set must flip 12→**9** in the SAME commit (the count-ladder rule the pin itself documents: "api.ts may grow exports, but only consciously — the canonical set flips in the same commit as the new export"). AGENTS' census bullet narrates "the pinned live twelve" — the doc site flips with it. | tests/src-census.test.ts:46-59 + AGENTS.md:176 | `API_EXPORTS` drops the three type names (the 9 VALUE exports stay); the check title "(12)" → "(9)"; AGENTS' "pinned live twelve" → "pinned live nine" |

**Clean checks (no findings, documented):** the full baseline gate (42/42,
no flake) · the reference probe (zero new surfaces; the drawer battery; the
Profile/404 states; the reference's own console warnings) · **the
model-consumption census** (a standing WH-11 candidate, now verified clean:
all 15 Prisma models consumed by the app — RoutineStep's model via the
routine-templates route's `include: { steps: … }` relation, UserPrefs's
model via `api/prefs/route.ts`) · **the env-contract census** (the other
standing candidate, verified clean: src reads exactly the six documented
vars + three framework-internal `NEXT_*`/`NODE_ENV` — `.env` ↔
`.env.example` parity holds) · the WH-10 diff review (docs + test file
only, exactly as its plan predicted) · the `export { … }` re-export bridges
in auth.ts/verification-server.ts are documented intentional surface
(session-163's import-compatibility shims; the declarations live in the
censused password.ts) · `export default` is framework contract surface
(pages/layouts/error boundaries), pinned by the route census · the vendored
`src/app/vendor/tw-animate.css` imported at globals.css:2 · the Tailwind v4
pins standing (`@custom-variant hover`, literal-hex `@theme`, `--shadow-sm`,
`--blur-sm`) · the SEO family (smoke check 12 green) · `.env`
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ·
vitest/playwright configs per the contract · `skills/` excluded from
lint/tsc/vitest (verified in all three configs).

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the type-liveness census in `tests/src-census.test.ts`:** the whole-tree walk (every ts/tsx under src/) + `exportedTypes()` (`^export (?:type\|interface) (\w+)`) + the check "every exported type has a consumer outside its declaring module" (the WH-7 corpus: src + tests + scripts + prisma, minus the declaring module, minus the pin's own text). Flip docs-counts' `CANONICAL.unitChecks` 315→**316** in the same step. RED verified with exactly the predicted 21 offenders | RED as predicted |
| 2 | **GREEN — F-1 (the dead interface):** delete `UserPrefs` from src/types/index.ts (13 lines; zero same-module references) | census loses one offender |
| 3 | **GREEN — F-2 (the twenty keyword drops):** drop `export` from `ToastVariant`, `ToastItem`, `ApiError`, `ApiResult`, `BoundedJson`, `SessionPayload`, `BootEnvReport`, `ChunkStorage`, `ReloadDeps`, `OptionMeta`, `ColorPreset`, `RateLimitResult`, `BadgeCounts`, `ReminderStatus`, `ThemeMode`, `ThemeState`, `ThemeData`, `AchievementsData`, `WellnessState`, `RoutineStep` — the declarations stay, module-private | census GREEN; tsc 0 |
| 3b | **F-4 (the same-commit redistribution):** `API_EXPORTS` drops `ApiError`/`ApiResult`/`BoundedJson` (12→**9**); the check title "(12)" → "(9)"; AGENTS:176 "the pinned live twelve" → "the pinned live nine" | api-export census GREEN |
| 4 | **The count ladder + SKILL:** unit 315→**316** / suites stay 21 at EVERY live-tense doc site (README badge + stack table + testing section + superset · AGENTS commands table + gate order · CLAUDE build table + test pyramid · PAD §7.1 tree + §8.1 totals line + §9.3 pre-ship · SKILL §2 stack table + §11 pre-ship); PAD §8.1's infra row 117→**118** (the new census check rides src-census.test.ts — an infra file; the row's category list gains "type-export census"); the src-census's infra-row narration in AGENTS' census bullet carries the WH-11 extension; SKILL v1.8.0→**v1.9.0** (description + provenance + §12 lesson 15) | rg-verified, docs-counts GREEN |
| 5 | **Full gate re-run:** lint → typecheck → test (**316**) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` ZERO | full green |
| 6 | **Captures:** re-take the 16-file screenshot set from the remediated dev server (one logged-in desktop session + one mobile session; 01 pristine login first; the goals capture at the WH-9 2500ms settle); md5 uniqueness; F-1..F-3 are TYPE-ONLY surgery — types are erased at compile time, zero runtime surface moves — so all 16 expected byte-stable vs the WH-10 set; `.env` ↔ `.env.example` parity re-verify | captures |
| 7 | **worklog WH-11 entry + this plan's execution record + `docs/session_18.md`** (the round's transcript; the operator's session_17.md push never clobbered) | worklog |
| 8 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **Same-module references do not count as type consumers (the WH-7 corpus
  rule, extended to types):** the value census already excludes the
  declaring module ("same-module consumption does not count — that is what
  the `export` keyword un-cures in the data-feed class"). A type referenced
  only inside its own module is module-private machinery; the export
  keyword on it is dead API surface. The cure keeps the declaration and
  drops the keyword — exactly the WH-8 `applyTheme`/`SESSION_TTL_MS`
  precedent, now in type form.
- **The pin's own text is excluded from the corpus (the WH-7 SELF rule,
  load-bearing this round):** the src-census test names `WellnessState`,
  `ThemeState` and the api envelope trio in its own machinery — the
  audit's first census pass counted that narration as consumption and hid
  five of the twenty F-2 offenders. The corrected corpus (the pin's own
  text excluded) surfaced them. A census that consumes its own narration
  is a pin guarding nothing.
- **WHOLE-TREE walk over a fixed module list (F-3):** the value census's
  fixed 20-module list exists because `export const/function` appears in
  route files as framework-contract surface (handlers, `dynamic`, config
  values) — a whole-tree VALUE walk would false-positive on framework
  contracts. The TYPE surface has no such contracts: nothing in Next.js
  App Router requires an exported type from a route/page/layout file, and
  the dry-run across all 103 src modules found zero false positives. The
  walk needs no list maintenance, and a new module exporting types is
  covered at birth — the exact blind-spot class this round cures.
- **Tests count as type consumers (the WH-8 ui-export census rule):** the
  corpus includes tests/ — a test-imported type is alive (retirement is a
  conscious same-commit act). The census verified none of the twenty-one
  is test-imported either (external=0 across the whole corpus).
- **The corpus includes scripts/ + prisma/ (the WH-7 design):** the seed
  and CLI wrappers are production consumers of the lib seam. Verified:
  none of the twenty-one appears there.
- **`UserPrefs` retires fully; the twenty keep their declarations:** the
  interface has zero same-module references (nothing in types/index.ts
  uses it — `RoutineTemplate.steps` is the contrast case: RoutineStep IS
  the structural type of a live exported interface's field, so its
  declaration must stay, only its keyword drops). An unreferenced
  declaration is dead code; a referenced-but-unimported declaration is
  private machinery.
- **The API_EXPORTS redistribution is a same-commit flip (F-4):** the
  WH-6 pin's own doctrine ("the canonical set flips in the same commit as
  the new export") governs the shrink too — the three api type names leave
  the 12-set, the 9 VALUE exports stay, the check title and AGENTS'
  "pinned live twelve" narration flip with it.
- **The census pins the LIVE type surface (not a frozen list):** the check
  reads every src module's declarations at run time and asserts external
  consumption — a new exported type without a consumer trips it; a
  legitimately redistributed consumer keeps it green. No literal list to
  maintain.
- **The count ladder (exact):** 315 + 1 (the type-liveness census check,
  riding src-census.test.ts) = **316 checks / 21 suites** (no new suite).
  The e2e count stays 42; the smoke count stays 14; the §8.1 infra row
  117+1 = **118** (row arithmetic now enforced by the WH-10 pin:
  109+89+118=316).
- **SKILL v1.9.0 (not a patch bump):** every audit round since WH-3 has
  bumped the minor — §12 lesson 15 ("census regexes see only the
  declaration forms they were written for — the type surface sailed
  through five rounds because every pin read `export function/const` or
  export blocks; and a census that counts its own narration as
  consumption guards nothing — exclude the pin's own text from its
  corpus") is a new entry, not a correction.
- **The e2e/visual surface is untouched (F-1..F-3 are compile-time-only
  surgery):** erasing `export` keywords and a dead interface changes zero
  runtime bytes. Captures expected byte-stable vs the WH-10 set; the
  battery (42) re-verifies the drawer walk and the Profile strip.
- **The session file (WP-7):** the operator's numbering pushed
  session_17.md (the WH-10 raw transcript); this round's transcript file is
  `docs/session_18.md`, matching the house pattern.
- **Declined (documented, not taken):** the functional-superset round
  (real video URLs, OAuth wiring) — the probe re-confirmed the
  intentional-parity state for the seventh time; it stays the operator's
  call. A fresh-clone verification — this round touches zero install/env/
  db-path surface (type keywords only); WH-8's fresh clone + this round's
  green gate cover the posture; re-run it when a round touches those
  surfaces again.

---

## 4. Execution record (2026-10-30, WH-11 — filled as executed)

- **Baseline gate (live, pulled tree at 3826a3e):** lint 0/0 · tsc 0 ·
  unit 315/315 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · bun audit ZERO — the documented WH-10 ship state, no flake. — §1
- **The reference probe:** zero new surfaces; the drawer battery green on
  the reference (11 items, stays-open quirk, no scroll lock); the Profile
  tabs unchanged; the 404 surface re-verified; the reference's own console
  warnings documented; the OAuth/video surfaces at the documented
  intentional-parity state. — §1
- **The plan's pre-landing validation (the doctrine) caught two
  corrections before any code moved:** (a) the audit's first census pass
  counted the src-census pin's own narration text as consumption — the
  corrected corpus (the WH-7 SELF rule: the pin's own file excluded)
  surfaced FIVE more F-2 offenders (`WellnessState`, `ThemeState`,
  `ApiError`, `ApiResult`, `BoundedJson` — the store-state and envelope
  contracts), taking the round from 16 to 21 offenders; (b) the fixed
  13-module list was replaced by the WHOLE-TREE walk (103 modules, zero
  false positives — the dry-run verified both designs side by side). The
  validation also surfaced F-4 (the API_EXPORTS redistribution) before it
  could bite mid-landing.
- **WP-1 (RED):** the type-liveness census landed in
  `tests/src-census.test.ts` (the whole-tree walk + the SELF-excluded
  corpus + the WH-8-doctrine failure message). CANONICAL flipped 315→316
  in the same step. RED verified with exactly the predicted 21 offenders;
  docs-counts RED with exactly the 6 ladder carriers (the row-arithmetic
  check + the five per-doc claim checks).
- **WP-2 (GREEN, F-1):** the dead `UserPrefs` interface retired from
  src/types/index.ts (13 lines, zero same-module references).
- **WP-3 (GREEN, F-2):** all twenty `export` keywords dropped (each
  verified exactly-once by the landing script): ToastVariant, ToastItem,
  ApiError, ApiResult, BoundedJson, SessionPayload, BootEnvReport,
  ChunkStorage, ReloadDeps, OptionMeta, ColorPreset, RateLimitResult,
  BadgeCounts, ReminderStatus, ThemeMode, ThemeState, ThemeData,
  AchievementsData, WellnessState, RoutineStep — the declarations stay,
  module-private. **tsc 0** on the first run (the compile-time-only
  prediction held); src-census GREEN 10/10.
- **WP-3b (GREEN, F-4):** `API_EXPORTS` redistributed 12→**9** (the three
  api type names dropped; the comment narrates the redistribution and why
  the envelope types were safe to un-export); the check title "(12)" →
  "(9)"; AGENTS' "the pinned live twelve" → "the pinned live nine".
- **WP-4 (the ladder):** 315→316 at all 13 live-tense sites (README badge
  + stack + testing + superset · AGENTS commands + gate order · CLAUDE
  build table + test pyramid · PAD §7.1 tree + §8.1 totals + §9.3
  pre-ship · SKILL §2 + §11); PAD §8.1's infra row 117→**118** with the
  category list gaining "type-export censuses"; AGENTS' census bullet
  extended (the type census + the WH-11 pin-provenance line); SKILL
  v1.8.0→**v1.9.0** (description + provenance + §11 + §12 lesson 15).
  docs-counts GREEN 10/10; unit suite **316/316 (21 suites)**.
- **WP-5 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **316/316 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · `bun audit` ZERO.
- **WP-6 (captures):** all 16 re-taken from the dev server (01 pristine
  login first; the goals capture at the inherited 2500ms settle; the
  drawer walk live-verified during capture 16 — the auto-close proof: the
  portal unmounted, zero role=dialog at /Exercise). md5: 16 unique,
  **16/16 byte-identical to the WH-10 set** — zero visual surface moved,
  exactly as predicted for compile-time-only surgery. `.env` ↔
  `.env.example` parity re-verified (identical except AUTH_SECRET).
- **WP-7:** the worklog WH-11 entry + this record + docs/session_18.md.
- **WP-8:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
