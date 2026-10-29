# Wellness Hub

[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tests](https://img.shields.io/badge/tests-313%20unit%20+%2041%20e2e-brightgreen)](#testing)
[![License](https://img.shields.io/badge/license-MIT-blue)](#license)

A complete, self-hostable **student wellbeing application** — a production-grade
clone of the reference app
[EvolveWell](https://evolve-well-d6cec85d.base44.app/) with an intentional
functional superset. Track exercise, mood, assignments, events and goals in
one indigo-gradient Next.js app that runs entirely on your machine.

## Overview

The reference app is a personal wellness companion for students: a dashboard
with live stats, routine templates, an exercise log, a mood journal, an
assignment tracker, an events calendar, study resources, reminders, a
learning center and a gamified goals/achievements engine. This repo rebuilds
all of it as a single Next.js App Router application with Prisma/SQLite
persistence and hand-rolled scrypt + HMAC cookie auth, then goes further than
the reference: real email-verification and password-reset flows, a live
theming engine (Light/Dark/Auto + 8 color presets), streaks and auto-awarded
badges, CSV/PDF export, per-route SEO metadata, and a full
Vitest + Playwright test battery pinning all of it in place.

## Key Features

| Feature | Description |
|---------|-------------|
| 🏠 Dashboard | Live stat tiles (workouts this week, journal streak, active assignments, upcoming events), quick actions, recent activity |
| 📋 Routine Templates | 11 seeded templates with steps, benefits and pro tips; schedule any into "My Routines" |
| 💪 Exercise Tracker | Log workouts by type/intensity/duration with history and delete |
| 🧘 Mental Health | 5-emoji mood picker, energy slider, tag chips, streak math |
| 📚 Assignments | Priority-tracked assignments with completion and due-date sorting |
| 📅 Events | Month calendar with event dots, upcoming list, create/delete |
| 📖 Study Resources | 8 resource types, 5-star ratings, tag chips, search filter |
| ⏰ Reminders | Type/priority/repeat model with completion and status derivation |
| 🎓 Learning Center | 12 seeded tutorials with category/difficulty filters and search |
| 🏆 Goals & Achievements | Points engine, goal progress logging, 8-badge auto-award catalog |
| 🎨 Profile & Customization | Light/Dark/Auto mode, 8 color presets, font/radius/animation preferences — applied live, synced server-side |
| 🔐 Auth ladder | Signup with hashed OTP verification, forgot/reset password, login rate limiting, session revocation |

## Architecture

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js (App Router) | 16.4 | Full-stack React: RSC pages + route handlers |
| UI runtime | React | 19 | Server components, `useActionState`-free hand-rolled store |
| Language | TypeScript | 5.9 | Full strict mode; `bun run build` is the type gate |
| Styling | Tailwind CSS | 4.3 | CSS-first `@theme` config (no `tailwind.config.js`) |
| Components | Radix UI primitives | 1.3–2.4 | Dialog, dropdown, select, popover, tabs — shadcn-style |
| State | Zustand | 5 | Single client store (`src/stores/wellness-store.ts`) |
| ORM | Prisma | 6.19 | Schema + SQLite driver |
| Database | SQLite | — | `db/custom.db` at the repo root, git-ignored |
| Validation | Zod | 4 | Every API body boundary (`parseBody()`) |
| Charts | recharts | 3.10 | Dashboard trends |
| PDF | jspdf | 4.2 | Export helper (dompurify pinned to 3.4.17 via override) |
| Unit tests | Vitest | 5 | 313 checks / 16 suites |
| E2E tests | Playwright | 1.64 | 41 checks against the production standalone server |

```mermaid
flowchart TB
    Browser[Browser: RSC pages + Zustand store] --> App[Next.js 16 App Router]
    App --> Pages["(app) route group\n11 modules + dual-case aliases"]
    App --> API["Route handlers /api/*\nrequireSession + parseBody(zod) + ok/ERR envelope"]
    API --> Prisma[Prisma 6]
    Prisma --> SQLite[("db/custom.db — repo root")]
    API --> Auth["scrypt + HMAC cookie\nrate-limited, tokenVersion revocation"]
```

## File Hierarchy

```
wellness-hub/
├── 📂 src/app/
│   ├── 📂 (app)/            # Auth-guarded route group: 11 module pages
│   │   ├── 📂 Dashboard/    # Capitalized aliases mirroring the reference's hrefs
│   │   └── 📂 dashboard/    # Canonical lowercase folders (re-export aliases)
│   ├── 📂 api/              # 17 route-handler families (auth, CRUD, dashboard, prefs)
│   ├── 📂 login/  signup/  reset-password/
│   └── 📄 globals.css       # Tailwind v4 @theme tokens + dark mode
├── 📂 src/components/
│   ├── 📂 layout/           # app-shell, sidebar, mobile-nav (Radix Sheet drawer), login-card
│   ├── 📂 shared/           # Module pages' shared parts (stat cards, dialogs, calendars)
│   └── 📂 ui/               # Radix-based primitives (button, dialog, select, toast…)
├── 📂 src/lib/              # wellness.ts (streaks/points/badges), auth, api, schemas, db-path, rate-limit
├── 📂 src/stores/           # wellness-store.ts, theme-store.ts (CSS-variable engine)
├── 📂 prisma/schema.prisma  # 14 models (User → owned wellness entities, cascade)
├── 📂 tests/                # Vitest suites + 📂 e2e/ Playwright specs
├── 📂 docs/                 # plans/, screenshots/, deployment + SSH push runbooks
├── 📂 db/                   # SQLite databases (git-ignored)
└── 📄 worklog.md            # Session-by-session engineering log
```

## Quick Start

Requires **Node.js ≥ 20** and **bun ≥ 1.1**.

1. Clone and install:

   ```bash
   git clone https://github.com/nordeim/wellness-hub.git
   cd wellness-hub
   bun install
   ```

2. Configure the environment:

   ```bash
   cp .env.example .env
   # set AUTH_SECRET: openssl rand -hex 32
   ```

3. Create and seed the database:

   ```bash
   bun run db:push    # push prisma/schema.prisma to db/custom.db
   bun run db:seed    # seed 11 templates, 12 tutorials, 8 badges + demo user
   ```

4. Start the dev server:

   ```bash
   bun run dev        # http://localhost:3000
   ```

### Verify Setup

- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/login` → `200`
- Log in with the demo account: `sepnetflix2023@outlook.com` / `$Abcd1234`
- The dashboard greets "Welcome Back!" with the four stat tiles.

## Environment Variables

| Variable | Purpose | Notes |
|----------|---------|-------|
| `DATABASE_URL` | SQLite path, resolved against `prisma/schema.prisma` | Default `file:../db/custom.db` → `<repo>/db/custom.db` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for SEO metadata, sitemap, manifest | Inlined at build time |
| `AUTH_SECRET` | HMAC session-signing secret | **Required in production** — min 16 chars; boot fails hard without it |
| `NEO_PROXY_HOPS` | Trusted proxy depth for rate-limit IP keying | Unset = 1; `0` = direct; fails closed |
| `NEO_DISABLE_IN_APP_OTP` | Set `1` when a real mail transport exists — hides the OTP from signup responses | Optional |
| `NEO_DISABLE_IN_APP_RESET` | Set `1` when a real mail transport exists — hides the reset link | Optional |

## Testing

```bash
bun run test         # Vitest — 313 checks, 16 suites (node-safe seams)
bun run test:e2e     # Playwright — 41 checks (run `bun run build` first:
                     # boots the PRODUCTION standalone server on an isolated
                     # port with its own scratch db/e2e.db)
bun run lint         # eslint, --max-warnings 0
bun run typecheck    # tsc --noEmit (fast signal; `bun run build` is the gate)
bun run gate         # lint → typecheck → test → build → smoke → e2e
```

The e2e battery covers: the auth ladder (login wall, wrong credentials, OTP
lockout ladder, reset funnel, session revocation), the mobile drawer (open,
navigate, escape, viewport-grow auto-close, scroll-lock), the shell (sidebar
nav, dual-case routes, active state, quick actions), and a CRUD cycle
through every wellness module including goal completion → points.

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#6366f1` (indigo-500) | Buttons, active nav, links |
| `--secondary` | `#a855f7` (purple-500) | Gradient partner, accents |
| Gradient | `linear-gradient(135deg, #6366f1, #a855f7)` | Headings, hero tiles, active pills |
| `--color-sidebar` | `rgb(250 250 250)` | The light sidebar face (dark: `#111113`) |
| Font | `--font-sans` (system stack + Apple/Segoe/Noto emoji) | Whole app — matches the reference's computed stack |

Dark mode rides the `.dark` class token overrides in `globals.css`; the
theme store also writes live presets as CSS custom properties on `<html>`.

## Superset over the Reference

- Email-verification signup ladder + forgot/reset password + login rate
  limiting + session revocation (`tokenVersion`)
- Real Light/Dark/Auto mode + 8 color presets applied live
- Points + streaks + 8-badge auto-award achievements engine
- Robust search/filters on Assignments, Study Resources, Learning
- PWA manifest + per-route OpenGraph/Twitter metadata + `sitemap.xml`
- Accessibility superset: focus rings, aria states, 44px touch targets
- Zod validation at every API boundary; bounded readers; per-IP rate limits
- 313 unit + 41 e2e checks pinning the behavior

## Deployment

`bun run build` produces a self-contained `.next/standalone/` artifact
(`bun run start` boots it). Set `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL` and an
absolute `DATABASE_URL` before building — the details live in
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `bun run db:push` writes outside the repo | Ensure `DATABASE_URL` stays the relative `file:../db/custom.db` — `src/lib/db-path.ts` resolves it against `prisma/schema.prisma` |
| Production boot refuses to start (`AUTH_SECRET` error) | Generate one: `openssl rand -hex 32`, set it in the environment — the boot gate is intentional |
| Mobile drawer hover styles look "stuck" | Tailwind v4 hover fix is `@custom-variant hover (&:hover)` in `globals.css` — do not remove the session-80 unwrap pin |
| `shadow-sm` looks too heavy | Already re-pinned in `globals.css` (`--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)`) — keep the re-pin |

## Contributing

- **TDD flow** (RED → GREEN → REFACTOR): pin a behavior in
  `tests/*.test.ts` first, then implement. E2E specs join the corresponding
  `tests/e2e/*.spec.ts`.
- **Tailwind v4**: CSS-first config — no `tailwind.config.js`; tokens live in
  `@theme` inside `src/app/globals.css`.
- **React 19**: no `forwardRef`; `useEffect` never calls `setState`
  synchronously (an ESLint ERROR here).
- **Main branch only** — no feature branches; pushes go through
  `docs/ssh_git_wrapper_v3.py` (see
  [`docs/how-to-git-push-using-ssh-wrapper_SKILL.md`](docs/how-to-git-push-using-ssh-wrapper_SKILL.md)).

## License

[MIT](LICENSE) © 2026 nordeim
