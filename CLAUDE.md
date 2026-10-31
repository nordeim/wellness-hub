---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# Wellness Hub

## Core Identity & Purpose

Wellness Hub is a production-grade clone of the reference student-wellness
app EvolveWell (`https://evolve-well-d6cec85d.base44.app/`), built as a
single Next.js 16 App Router application. It gives a student everything the
reference offers — dashboard, routine templates, exercise tracking, a mood
journal, assignments, an events calendar, study resources, reminders, a
learning center and a gamified goals/achievements engine — plus a deliberate
functional superset: real email-verification and password-reset flows, a
live theming engine and a full test battery. Maintained by
nordeim; pushes go to `git@github.com:nordeim/wellness-hub.git` (main only,
via `docs/ssh_git_wrapper_v3.py`).

Key technical decisions that shape everything else: hand-rolled scrypt +
HMAC cookie auth (no NextAuth), one Zustand store for all server state (no
React Query), Zod at every API body boundary, Prisma/SQLite at the repo root,
and Tailwind v4 CSS-first theming.

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

1. **ANALYZE** — deep requirement mining; never surface-level assumptions
2. **PLAN** — structured roadmap; present before executing
3. **VALIDATE** — explicit checkpoint before implementation
4. **IMPLEMENT** — modular, tested, documented builds
5. **VERIFY** — the full gate (lint → typecheck → test → build → smoke → e2e)
6. **DELIVER** — commit to main; push via the SSH wrapper

### Project-Specific Principles

- **Parity first, superset second**: match the reference's visuals exactly
  (computed-style probes, not eyeballing); add functionality only where the
  reference is missing it (auth ladder, theming, achievements).
- **Pure seams**: domain logic (streaks, points, badges, codecs) lives in
  `src/lib/` as node-safe functions, Vitest-pinned; components stay thin.
- **The gate is the only CI**: there is no hosted CI — nothing ships without
  the local gate passing.

## Implementation Standards

### General Coding Practices

- Early returns over nested conditionals
- Composition over inheritance
- Self-documenting names; comments explain "why", not "what"
- Test-Driven Development: RED → GREEN → REFACTOR (pin the seam in
  `tests/*.test.ts` first)

### Language & Framework Guidelines

- **TypeScript full strict**; `bun run build` is the type gate
  (`ignoreBuildErrors` is NOT set).
- **React 19**: no `forwardRef`; `useEffect` never calls `setState`
  synchronously — it is an ESLint ERROR here. Dialogs remount forms via
  `key`; loaders use `startTransition`.
- **Next.js 16 App Router**: server components by default; `"use client"`
  only at interactive leaves. Route handlers under `src/app/api/`, guarded
  by `requireSession()`.
- **Tailwind v4**: CSS-first — NO `tailwind.config.js`. Tokens live in
  `@theme` inside `src/app/globals.css` as LITERAL hex values (no `var()`
  chains inside `@theme`). Keep the pinned fixes: `@custom-variant hover`,
  `--shadow-sm`, `--blur-sm` re-pins, the three `@source not` directives.
  **The per-module page identity (WH-15)**: every module page consumes its
  `PAGE_THEMES` entry (`src/lib/page-layout.ts`) — wash, H1 stops, button
  pair, container, header form. The module pairs are FIXED v3 classes; only
  the brand family rides `--primary`/`--secondary`.
- **Zod ^4**: every mutating route validates through `parseBody()` +
  `src/lib/schemas.ts`. No route parses URL params (the CRM-era
  `asString`/`asDate` family retired at WH-6 — `tests/src-census.test.ts`
  pins the api export surface).
- **Prisma**: SQLite via `DATABASE_URL="file:../db/custom.db"` — resolved
  against `prisma/schema.prisma` by `src/lib/db-path.ts` (never against
  `process.cwd()`). Tag/step/benefit arrays are JSON string columns decoded
  at the boundary.

## Development Workflow

### Environment Setup

```bash
bun install
cp .env.example .env        # then set AUTH_SECRET: openssl rand -hex 32
bun run db:push             # schema → db/custom.db
bun run db:seed             # 11 templates, 12 tutorials, 8 badges, demo user
bun run dev                 # http://localhost:3000
```

Demo login: `sepnetflix2023@outlook.com` / `$Abcd1234`.

### Build Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Development server (port 3000) |
| `bun run build` | Production standalone build (the type gate) |
| `bun run start` | Boot the standalone server |
| `bun run lint` | ESLint (`--max-warnings 0`) |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run test` | Vitest unit suite (347 checks) |
| `bun run test:e2e` | Playwright (63 checks; build first) |
| `bun run gate` | The full chain in one command |

## Testing Strategy

### Test Pyramid

- **Unit (Vitest, 347 checks / 24 suites)**: pure seams — auth helpers,
  db-path contract, wellness math (streaks/points/badges), schemas,
  theme engine, formatters, the dead-dependency census, the route/ui
  module census, the signup role pin, the docs-counts lockstep pin,
  the src-surface census pin.
- **E2E (Playwright, 63 checks — 6 specs + the auth setup project)**: the
  real UI in Chromium against the
  production standalone server — auth ladder, mobile drawer battery, shell
  nav (both route-case families, + the console-hygiene net: zero console
  errors/warnings on every module route), the a11y net (axe-core at
  WCAG 2.1+2.2 A+AA: zero violations on every module route, the open drawer
  and the login page — plus the WH-18 dark-state walks: the dark module
  routes + drawer, the OS-dark corner, the dark login, the transient
  select/toast surfaces; plus the WH-19 widenings — the dark corners
  (signup/reset-password/the 404), the light computed-contrast leg (the
  alpha-card family), the auto-mode listener), and a CRUD cycle through
  every module.

### Test Commands

```bash
bun run test                  # unit layer
bun run test:e2e              # e2e layer (requires bun run build)
bunx vitest run tests/wellness-stats.test.ts   # a single suite
CI=1 bunx playwright test tests/e2e/mobile-navigation.spec.ts  # one spec
```

E2E isolation contract: the suite boots on an isolated port with its own
`db/e2e.db` (PINNED in `playwright.config.ts`); the `setup` project signs in
once and shares the session cookie via `storageState` (auth endpoints are
rate-limited per IP — per-test logins would trip the limiter).

## Code Quality Standards

### Linting & Formatting

```bash
bun run lint        # eslint . --max-warnings 0 — must exit clean
bun run typecheck   # tsc --noEmit — must exit clean
```

Hard rules enforced by lint: no synchronous `setState` in `useEffect`;
`skills/` and build output dirs are ignored (do not un-ignore).

## Git & Version Control

### Branching Strategy

- **`main` only** — no feature branches, no new branches. All work commits
  directly to main.

### Commit Standards

- Conventional Commits with emoji prefixes: `:tada: feat: …`,
  `:bug: fix: …`, `:memo: docs: …`.
- Atomic commits (one logical change per commit).
- Never commit `.env`, `*.key`, `db/*.db`, `node_modules/`.
- Push via the SSH wrapper (not a plain `git push`):
  `python3 docs/ssh_git_wrapper_v3.py --key-file <key> --remote git@github.com:nordeim/wellness-hub.git`
  — runbook: `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`.

## Error Handling & Debugging

### Error Handling Approach

- API handlers answer ONLY with the `{ ok, data } | { ok, error }` envelope
  (`ok()` / `fail()` / `ERR.*` from `src/lib/api.ts`) — never bare throws.
- Zod failures → 400 with a field-level message; auth failures → 401 via
  `requireSession()`; ownership mismatches → 404 (no enumeration).
- The app ships `error.tsx` + `global-error.tsx` boundaries with a
  chunk-recovery retry (`src/lib/chunk-recovery.ts`).

### Debugging Tools

- `bun run db:census` — verify the db path resolved to the repo root and
  the row counts.
- `docs/screenshots/` — reference captures of every page (desktop + mobile).
- `agent-browser` (Vercel) for computed-style probes against the live
  reference before changing any visual.

## Communication & Documentation

### Documentation Standards

- Explain "why", not just "what"; document assumptions and constraints.
- The four companion docs are maintained in lockstep:
  `README.md` (onboarding), `AGENTS.md` (the agent contract),
  `CLAUDE.md` (this workflow reference),
  `Project_Architecture_Document.md` (the definitive blueprint).
- `worklog.md` at the repo root carries the session-by-session log; update
  it in the same commit as the change it describes.

## Project-Specific Standards

### Architecture

- Route groups: `src/app/(app)/` holds the 11 guarded module pages — each
  module has a canonical lowercase folder AND a capitalized alias folder
  (the reference's own hrefs are `/Dashboard`, `/Routines`, …). Both are
  pinned by e2e; do not "fix" the duplication.
- One Zustand store (`src/stores/wellness-store.ts`) holds all server
  state; `AppShell.hydrate()` fills it once; actions refresh affected
  slices. `theme-store.ts` writes CSS custom properties on `<html>` and
  syncs `UserPrefs` via `/api/prefs`.
- Domain seams: `src/lib/wellness.ts` (streaks, points, badge awarding,
  reminder status, tag codec) — pure, node-safe, unit-pinned.
- Server-side badge awarding happens in `src/lib/badges-server.ts` at the
  CRUD seams — never in components.

### API Design

- Envelope: `{ ok, data } | { ok, error: { code, message } }`.
- Every handler: `requireSession()` → `parseBody(zod)` → prisma → `ok()`.
- Every mutation checks ownership (the record's `userId` must match the
  session's) — a mismatch answers 404.
- Public auth routes are rate-limited per IP/15 min: login 10, signup 10,
  resend 5, verify 20, forgot 10, reset 10.

### Database / Data Layer

- Prisma + SQLite; `db/` at the repo root, git-ignored.
- `DATABASE_URL="file:../db/custom.db"` — relative, resolved against
  `prisma/schema.prisma` (contract pinned in `tests/db-path.test.ts`).
- 15 models: `User`, `Workout`, `MoodEntry`, `Assignment`, `Event`,
  `StudyResource`, `Reminder`, `Goal`, `Badge` (catalog), `UserBadge`,
  `RoutineTemplate`, `RoutineStep`, `UserRoutine`, `Tutorial`, `UserPrefs`.
- All user-owned rows cascade-delete with the user; list reads are bounded.
- Seed is idempotent: content tables (templates, tutorials, badges) are
  wiped and re-seeded; the demo user lands by UPSERT-BY-EMAIL.

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | SQLite path (relative, resolved against `prisma/schema.prisma`) | `file:../db/custom.db` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for SEO/sitemap/manifest (build-time inlined) | `http://localhost:3000` |
| `AUTH_SECRET` | HMAC session secret — **required in production**, min 16 chars, boot fails hard | `openssl rand -hex 32` |
| `WELLNESS_PROXY_HOPS` | Trusted proxy depth for rate-limit IP keying (unset=1) | `""` |
| `WELLNESS_DISABLE_IN_APP_OTP` | `1` = hide the signup OTP from responses (real mail transport) | `""` |
| `WELLNESS_DISABLE_IN_APP_RESET` | `1` = hide the reset link from responses | `""` |

## Anti-Patterns to Avoid

- **Do not remove the Tailwind v4 pins** in `globals.css` (the hover
  unwrap, `--shadow-sm`, `--blur-sm`) — each is a fixed bug.
- **Do not add `tailwind.config.js`** — v4 CSS-first only.
- **Do not "fix" the dual-case route folders** — intentional aliases.
- **Do not inline an absolute `DATABASE_URL`** or resolve it against
  `process.cwd()`.
- **Do not award badges client-side** or compute points in components.
- **Do not bypass the store** with bare `fetch` in components.
- **Do not create feature branches** — main only.
