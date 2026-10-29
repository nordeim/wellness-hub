# AGENTS.md — Wellness Hub

Single Next.js 16 App Router app that clones the reference student-wellness
app EvolveWell (`https://evolve-well-d6cec85d.base44.app/`): dashboard,
routine templates, exercise, mental health, assignments, events, study
resources, reminders, learning, goals & achievements and profile/theme
customization, with Prisma/SQLite persistence, scrypt + HMAC cookie auth and
one Zustand client store. Clone remote:
`https://github.com/nordeim/wellness-hub.git`; pushes go to the SSH remote
via `docs/ssh_git_wrapper_v3.py`.

## Commands

| Task | Command | Notes |
|------|---------|-------|
| Install | `bun install` | bun ≥ 1.1 |
| Dev server (port 3000) | `bun run dev` | |
| Production build (standalone) | `bun run build` | The build IS the type gate |
| Production server | `bun run start` | Boots `.next/standalone` |
| Lint | `bun run lint` | `--max-warnings 0` |
| Type check | `bun run typecheck` | Fast signal, run before test |
| Unit tests (316 checks) | `bun run test` | Vitest, node-safe seams |
| Browser E2E (42 checks) | `bun run test:e2e` | Needs `bun run build` first |
| Smoke the standalone artifact | `bun run smoke` | Needs build first |
| DB census (path + counts) | `bun run db:census` | |
| The full gate in one command | `bun run gate` | lint → tsc → test → build → smoke → e2e |
| Prisma client after schema edit | `bun run db:generate` | |
| Recreate DB from schema | `bun run db:push` | `--accept-data-loss` is pinned in the script |
| Seed content + demo user | `bun run db:seed` | Idempotent; wipes/reseeds content tables |

**Gate order before every push:** `bun run lint` → `bun run typecheck` →
`bun run test` (316) → `bun run build` → `bun run smoke` →
`CI=1 bun run test:e2e` (42: 5 specs + the auth setup project) — or the
one-command `bun run gate`. There is
no hosted CI; the local gate is the only gate. `typescript.ignoreBuildErrors`
is NOT set — a type error fails `bun run build`, and the explicit
`typecheck` step stays in the chain as the faster signal. `bun audit` runs
periodically OUTSIDE the gate (network dependency; the gate must stay
offline-runnable). The advisory posture (re-anchored 2026-10-30, the
WH-8 round): **ZERO vulnerabilities** — the four package.json `overrides`
(vite 8.3.5, deepmerge-ts 8.0.2, source-map-js 1.2.2, zod 4.6.7 — all
registry-latest on 2026-10-30) cleared the nine dev-toolchain advisories
the WH-6/WH-7 rounds had triaged as accepted (the WH-7 "no patched
target" zod triage aged out: 4.6.7 IS the fix target for the last
in-range copy too). The offline gate carries the posture through the
lockfile-resolution pin (`tests/dead-deps.test.ts` — vite/deepmerge-ts/
source-map-js at their override versions, exactly one zod at 4.6.7);
the dead-dep census pin keeps zero-import packages from returning.

First-run setup: `bun install && cp .env.example .env && bun run db:push &&
bun run db:seed && bun run dev`. Demo login: `sepnetflix2023@outlook.com` /
`$Abcd1234` (mirrors the reference app). **`.env` is untracked** — copy
`.env.example` and set `AUTH_SECRET` (`openssl rand -hex 32`).

## Architecture facts you would otherwise guess wrong

- **Auth is hand-rolled** (`src/lib/auth.ts` + the pure `src/lib/password.ts`
  seam): scrypt hashes (`scrypt:salt:hash`) + HMAC-SHA256 signed stateless
  cookie `wellness_session` (7-day TTL) carrying a **tokenVersion** revocation
  dimension — a password reset increments the live row's version and every
  pre-reset cookie dies at the `getSessionUser` comparison. The
  password-reset funnel: `POST /api/auth/forgot-password` (no-enumeration
  200, crypto-random token, 60-min TTL, in-app `resetUrl` delivery behind
  `WELLNESS_DISABLE_IN_APP_RESET`) + `POST /api/auth/reset-password`
  (atomic single-use conditional consumption) + the `/reset-password` page.
  The login miss branch burns a timing-equalizer scrypt. `requireSession()`
  guards every route handler; the `(app)` route-group layout redirects
  unauthenticated page visits. No NextAuth, no JWTs, no middleware. Public
  auth routes are rate-limited per IP/15 min — login 10, signup 10, resend
  5, verify 20, forgot 10, reset 10 (`src/lib/rate-limit.ts`,
  per-process) — keyed on the LAST `x-forwarded-for` hop behind the
  deploy-declared `WELLNESS_PROXY_HOPS` depth (unset=1, 0=direct, unparsable
  fails closed).
- **API envelope is `{ ok, data } | { ok, error: { code, message } }`** —
  build responses with `ok()` / `fail()` / `ERR.*` from `src/lib/api.ts`.
  Every body route validates through the Zod seam (zod ^4:
  `src/lib/schemas.ts` + `parseBody()`); no route parses URL params
  (the CRM-era coercion helpers retired at WH-6; the api-export census
  owns `src/lib/api.ts`'s surface). The store's `call()` helper
  (`src/stores/wellness-store.ts`) is the only sanctioned client — no bare
  `fetch` in components.
- **All server state lives in one Zustand store** — no React Query, no
  SWR. `AppShell` calls `hydrate()` once on mount; actions call the API,
  then refresh affected slices. The theme lives in
  `src/stores/theme-store.ts` — it writes CSS custom properties on
  `<html>` and syncs to `UserPrefs` via `/api/prefs`.
- **Badges award server-side at the CRUD seams** (`src/lib/badges-server.ts`)
  — never in components. Points: goal completion awards the
  frequency-derived value (`GOAL_FREQUENCY_POINTS`); `Total Points = sum of
  completed goal points + earned badge points`.
- **Streaks/points/tag-codec are pure seams** in `src/lib/wellness.ts` —
  node-safe, Vitest-pinned (`tests/wellness-*.test.ts`). Components pass
  plain data; never import the store into a lib.
- **`useEffect` never calls setState synchronously** (React 19 lint rule is
  an ERROR here). Patterns in use: dialogs remount their form via `key`
  changes; loaders use `startTransition`; every list fetch goes through
  the store.
- **Route aliases are intentional**: each module has a canonical lowercase
  folder (`src/app/(app)/dashboard/`) AND a capitalized alias folder
  (`src/app/(app)/Dashboard/`) mirroring the reference app's own hrefs
  (`/Dashboard`, `/Routines`, …). Do not "fix" the case duplication — the
  e2e battery pins both route families rendering.
- **`DATABASE_URL` is relative on purpose**: `file:../db/custom.db` is
  resolved against `prisma/schema.prisma` (exactly like the Prisma CLI) by
  `src/lib/db-path.ts`, so the CLI, `next build` and the running server all
  land on `<repo>/db/custom.db` regardless of the process working
  directory. The contract is pinned in `tests/db-path.test.ts`. Do not
  inline an absolute path or resolve it against `process.cwd()`.
- **`AUTH_SECRET` fails hard at boot in production** — missing or shorter
  than 16 chars and the server refuses to serve (`src/instrumentation.ts`
  → `src/lib/boot-env.ts`). Dev/test fall back to the insecure dev-only
  constant with a server warning.
- **The upload route family is RETIRED (WH-4)** — zero consumers, and
  the reference carries no upload surface anywhere (live-probed: its
  account card is read-only; Study Resources use URL-based fields).
  Do NOT re-add `/api/upload` or an avatar surface without a live
  reference page to mirror; the route-census pin
  (`tests/route-census.test.ts`) owns the 15-family API set.

## Tailwind CSS v4 pins (do not remove)

All live in `src/app/globals.css`; each one is a real bug fixed once:

- `@custom-variant hover (&:hover);` — the session-80 unwrap: without it
  hover styles compile to `@media (hover)` wrapped variants that never
  fire on real pointers in this app's component shapes.
- `--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);` — v4 renamed the shadow
  scale; the re-pin keeps the reference's computed tiny outline.
- `--blur-sm: 4px;` — same family; keeps the login card's glass at the
  reference's strength.
- `@theme` holds LITERAL hex values — no `var()` chains inside `@theme`.
- Dark mode = `.dark` class token overrides, same file.

## Conventions that differ from defaults

- TypeScript full strict; the build is the type gate.
- Validation rides the Zod seam at every body boundary; no route parses
  URL params (the CRM-era `asString`/`asNumber`/`asDate` family retired
  at WH-6 with zero consumers — `tests/src-census.test.ts` pins the
  api export surface).
- The app renders NO charts — the reference's dashboard carries stat tiles
  + lists only (live-probed); recharts was retired at WH-3 as a dead dep
  (never imported; the census pin enforces the tree stays chart-free or a
  real import lands with the package).
- Icons are lucide-react: sidebar nav icons uniform `h-5 w-5` stroke-2,
  content icons `h-4 w-4`.
- z-index stays on the flat scale: the mobile glass header z-10
  (app-shell via `MOBILE_HEADER.bar` in `src/lib/page-layout.ts`),
  drawer/dialogs/select portals z-50, toasts z-[100].
- Emoji vocab lives in `src/lib/constants.ts` (`MOODS`, `WORKOUT_TYPES`,
  `EVENT_CATEGORIES`, …) — `OptionMeta[]` with the emoji glyph carried as
  the label. Components never hardcode the glyphs.
- ESLint ignores `skills/` (the operator's skill catalog, not app code)
  plus build output dirs — don't remove those ignores.

## Testing conventions

- Unit (Vitest): pure seams only — `src/lib/*` and their contracts
  (`tests/*.test.ts`, matched by `vitest.config.ts`). No component tests;
  the RSC layer is covered by e2e instead.
- The docs-counts pin (`tests/docs-counts.test.ts`) keeps the five docs'
  live-tense count claims under the unit gate — a stale count anywhere
  fails `bun run test`. When a total moves (a test added/retired, a
  model, a route family), update the pin's CANONICAL literals AND every
  doc site in the SAME commit; the pin is the lockstep enforcer. The
  WH-10 extension: PAD §8.1's test-distribution rows must SUM to the
  canonical totals (a retirement that decrements the total but not a
  row trips the arithmetic — recompute the row, don't hand-increment),
  and the forbidden-forms list covers the compound spellings (pinned at
  the drift PHRASE — a doc cannot quote a forbidden form, so history
  narrates it without spelling it).
- The src-surface census pin (`tests/src-census.test.ts`) keeps the app
  tree's hygiene under the unit gate: every `tests/*.test.ts` file cited
  in src/scripts/prisma comments must exist (a comment defending code
  with a nonexistent file is a maintenance lie), `src/lib/api.ts`'s
  export surface is the pinned live nine, no duplicated adjacent
  `return` statements ship, every exported VALUE in the census modules
  (every lib seam module + the theme store + page-parts) has a consumer
  outside its own module, every `@utility` block in globals.css has a
  class consumer, every `WellnessState` member is consumed at a
  `useWellnessStore` call site, every ui-module export has a consumer,
  each audited component's destructured props match the pinned live
  surface, every `ThemeState` member is consumed at a `useThemeStore`
  call site, and every exported TYPE anywhere in src has a consumer
  outside its own module (the WH-11 whole-tree walk — a same-module-only
  type cures by dropping the `export` keyword, keeping the declaration).
  The WH-6/WH-7/WH-8/WH-9/WH-11 pin — same doctrine as the dead-dep,
  route/ui and docs-counts census pins.
- E2E (Playwright): boots the PRODUCTION standalone server on an isolated
  port with its own `db/e2e.db` (schema-pushed + seeded by the global
  setup). The e2e database is PINNED in `playwright.config.ts` — a stray
  `DATABASE_URL` can never point the suite at the dev db.
- E2E auth: the `setup` project signs the demo user in ONCE and saves the
  session cookie; every spec starts from that `storageState` because the
  auth endpoints are rate-limited per IP (per-test logins would trip the
  limiter mid-suite). `tests/e2e/auth.spec.ts` opts out with an empty state.
- `tests/e2e/e2e-port.ts` allocates the isolated port — don't hardcode
  ports in specs.
- The mobile-nav battery (`tests/e2e/mobile-navigation.spec.ts`) pins the
  drawer: open, navigate, escape-close, viewport-grow auto-close,
  scroll-lock. If you touch `src/components/layout/mobile-nav.tsx`, run it
  explicitly.

## Git

- **`main` only.** No feature branches, no new branches.
- Conventional Commits with emoji prefixes: `:tada: feat: …`,
  `:memo: docs: …`, `:bug: fix: …`.
- Never commit `.env`, `*.key`, `db/*.db`, or `node_modules/` (all
  gitignored; `.env` is untracked deliberately).
- Push through the SSH wrapper from the repo root:
  `PATH="/path/to/ssh-shim-dir:$PATH" python3 docs/ssh_git_wrapper_v3.py --key-file <key outside repo> --remote git@github.com:nordeim/wellness-hub.git`
  — runbook: `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` (the wrapper
  preflights for an `ssh` binary; sandboxes without one deploy the Appendix
  A paramiko shim on PATH first). Remote: `git@github.com:nordeim/wellness-hub.git`.
