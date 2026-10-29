# Wellness Hub (EvolveWell) — Build Plan

**Task ID:** WH-1 · **Date:** 2026-10-29 · **Branch:** `main` (only)
**Mission:** Transform the NEO CRM scaffold (session-198 chassis) into a
production-grade clone of `https://evolve-well-d6cec85d.base44.app/` —
visual parity with the reference, functional **superset**.

---

## 1. Reference intelligence (live-verified 2026-10-29)

### 1.1 Identity
- External app name: **EvolveWell** (`<title>`, login hero "Welcome to EvolveWell").
- Sidebar brand: **Wellness Hub** — "Your personal companion".
- Font stack (computed): `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` — identical to the
  scaffold's pinned `--font-sans` (keep).

### 1.2 Routes (byte-extracted from the live DOM)
| Nav label | href | Page H1 |
|---|---|---|
| Dashboard | `/Dashboard` | Welcome Back! |
| Routine Templates | `/Routines` | Routine Templates |
| Exercise | `/Exercise` | Exercise Tracker |
| Mental Health | `/MentalHealth` | Mental Health Journal |
| Assignments | `/Assignments` | Assignments |
| Events | `/Events` | Events Calendar |
| Study Resources | `/StudyResources` | Study Resources |
| Reminders | `/Reminders` | Reminders |
| Learning | `/Learning` | Learning Center |
| Goals & Achievements | `/Goals` | Goals & Achievements |
| Profile & Settings (sidebar footer) | `/Profile` | Profile & Customization |

Logged-out root → login wall. Login page: "Welcome to EvolveWell",
Continue with Google, OR divider, email+password, Sign in,
Forgot password?, Need an account? Sign up.

### 1.3 Design system (computed-style probes + VLM walk)
- **Theme:** primary `#6366f1` (indigo-500), secondary `#a855f7` (purple-500).
- **Gradient family** (135deg text / to-r backgrounds):
  - Sidebar wordmark: `font-bold text-lg bg-clip-text text-transparent` +
    `linear-gradient(135deg, #6366f1, #a855f7)`.
  - Page H1: `text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600
    bg-clip-text text-transparent mb-2` (36px, #4f46e5 → #9333ea).
  - Primary buttons: shadcn base + `h-10 rounded-md px-8 bg-gradient-to-r
    from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600
    text-white shadow-lg`.
- **Sidebar:** light — bg `rgb(250,250,250)` (neutral-50), w ~255px,
  `border-r` neutral-200; shadcn Sidebar menu buttons (rounded-xl 12px,
  zinc-700 text rgb(63,63,70), p-2 → 12px 16px); active = light indigo
  wash + indigo text + bold.
- **Mobile chrome:** sticky glassy header `bg-white/60 backdrop-blur-xl
  border-b border-gray-100 px-6 py-4 md:hidden` + "Toggle Sidebar" button;
  drawer = white sheet (dark overlay) with the same nav.
- **Cards:** `rounded-xl border bg-card text-card-foreground border-none
  shadow-lg` — 12px radius, no border, shadow-lg. Page bg gray-50.
- **Stat cards:** pastel tinted (red-50 + red icon / emerald + emerald-50 /
  blue-50 + blue / amber-50 + amber), icon chip top, label, big number,
  subtext. KPI grids start at 1 col on phones.
- Body: white bg, #0a0a0a foreground.

### 1.4 Domain model (base44 entities decoded live)
`RoutineTemplate` (10 seeded, with tasks[] steps, benefits[], pro tips,
video_url, thumbnail), `UserRoutine` (scheduled from a template: date, time,
notes), `Tutorial` (12 seeded: category, difficulty, duration, thumbnail,
video_url, views), `Workout`, `MoodEntry`, `Assignment`, `Event`,
`StudyResource`, `Reminder`, `Goal`, `Achievement` (empty — badges are
code-defined), `User` (role/full_name/email).

### 1.5 Form + option vocabularies (live-captured)
- **Workout:** type 🏃 Cardio / 💪 Strength Training / 🧘 Yoga / ⚽ Sports /
  🚶 Walking / 🚴 Cycling / 🏊 Swimming / 🏋️ Other; duration (min, required);
  intensity Light/Moderate/Intense; calories; date; notes. Stats: Total
  Workouts / Total Minutes / Calories Burned. List: Recent Workouts.
- **MoodEntry:** mood 😄 Amazing / 😊 Good / 😐 Okay / 😔 Low / 😢 Struggling;
  energy slider 0–10 (default 5, Low/High labels); activities tags (+Add);
  gratitude; daily reflection; date. Stats: Total Entries / Avg Energy /10 /
  Current Streak days. List: "Your Journey".
- **Assignment:** title*, description, subject, due date, priority
  Low/Medium/High/Urgent, estimated hours. Stats: Pending / Completed /
  Urgent.
- **Event:** title*, description, date, time (opt), category
  Personal/Work/Social/Health/Education/Other, location (opt). Month grid
  Sun–Sat, ← Today →, event dots; side panel Upcoming Events.
- **StudyResource:** title*, subject*, description, type 📝 Notes / 🎥 Video /
  ✍️ Practice Test / 📚 Textbook / 📄 Article / 🌐 Website / 🃏 Flashcards /
  📎 Other, exam date, url, file, tags, personal notes, 5-star rating.
  Toolbar: search "Search resources, tags..." + All Subjects + All Types.
- **Reminder:** title*, details, remind-at (date+time), type
  Custom/Assignment/Event/Goal/Routine, priority, repeat
  No Repeat/Daily/Weekly/Monthly. Stats: Upcoming / Overdue / Completed.
- **Goal:** title*, description, category Exercise/Mental Health/Learning/
  Productivity/Personal/Other, frequency Daily/Weekly/Monthly/Yearly/One Time,
  target value*, unit*, deadline (opt). Stats: Total Points / Goals Completed
  (of N) / Badges Earned (of N). Sections: Active Goals + Achievements.
- **Routine scheduling:** "Use This Template" → dialog "Schedule: <name>" with
  description, 💪 Remember (pro tip), numbered steps (title/duration/desc),
  When? date, What time? opt, Personal Notes opt, Schedule This Routine.
- **Learning:** search "Search tutorials..." + category combobox (All
  Categories → productivity/life skills/mental health/wellness/study
  skills/exercise) + cards (thumbnail, duration chip, title, category chip,
  difficulty chip, Watch Now).
- **Profile tabs:** Appearance (Theme Mode Light/Dark/Auto; presets Indigo
  Dream, Ocean Blue, Forest Green, Sunset Orange, Rose Pink, Royal Purple,
  Crimson Red, Golden Yellow; primary/secondary color inputs; font family;
  bg image URL; sidebar style Gradient (Colorful)…; card style Elevated (3D
  Shadows)…; animation level Full (Smooth & Fluid)…) · Account (Full Name /
  Email / Role, disabled) · Preferences (Enable Notifications, Weekly Goal
  Reminders — both checked) · Save All Changes ✨.

---

## 2. Architecture decisions

1. **Domain replacement on the CRM chassis.** Keep the engineering
   chassis (auth ladder + rate limits, API envelope, db-path, layout
   shell, Radix Sheet mobile nav, ui kit, gate/sweep tooling, Vitest +
   Playwright configs). Replace the CRM domain (schema, pages, APIs,
   stores, constants, tests) with the wellness domain.
2. **Prisma schema** (SQLite, `file:../db/custom.db` at repo root):
   `User` (auth ladder kept) + `Workout`, `MoodEntry`, `Assignment`,
   `Event`, `StudyResource`, `Reminder`, `Goal`, `Badge` (catalog) +
   `UserBadge`, `RoutineTemplate`, `RoutineStep`, `UserRoutine`,
   `Tutorial`, `UserPrefs` (theme singleton per user). All owned by
   `userId` (cascade delete). JSON fields via string columns + zod at
   the boundary (no Prisma list primitives).
3. **APIs**: one route family per module under `/api/…` with
   `requireSession` + `parseBody(zod)` + `ok/ERR` envelope (the
   scaffold's proven pattern), plus `/api/dashboard` aggregate and
   `/api/prefs` for the theme sync superset.
4. **Theme engine (superset done right):** zustand `theme-store` writes
   CSS custom properties (`--primary`, `--secondary`, derived hovers,
   radius, animation) on `<html>`; persisted to localStorage; optional
   server sync via `/api/prefs`. Dark mode via `.dark` class + tokens.
   All component classes reference tokens so presets re-skin the app.
5. **Visual parity**: new `page-layout.ts` wellness contract set; the
   shadcn-style sidebar port (`rounded-xl` menu buttons); gradient
   headings; pastel stat cards; `md:hidden` glassy mobile header.
6. **Gamification (functional superset):** goals award points on
   completion; badge catalog (8 seeded definitions) auto-awarded
   server-side at the CRUD seams; page shows earned/total.
7. **Route aliases:** canonical lowercase folders + capitalized re-export
   pages for the reference's hrefs (the scaffold's proven dual-path
   pattern, adapted to the wellness set).
8. **CRM retirement:** delete accounts/contacts/leads/opportunities/
   activities/reports/settings/(marketing) CRM surfaces, their APIs,
   `crm-store`, CRM libs (lead-filters, account-health, saved-reports,
   reports-data, dashboard-data) and the 138 CRM test suites; keep
   generic infra (auth, api, csv, pdf-export, format, rate-limit,
   db-path, chunk-recovery, boot-env, utils) and re-point their tests.

## 3. Build sequence

| # | Work package | Gate |
|---|---|---|
| 0 | `.env` (DATABASE_URL=file:../db/custom.db), db/ root | boot |
| 1 | prisma schema + seed (templates w/ steps, tutorials, badges, demo user) | db:push + db:seed |
| 2 | types, constants (emoji vocab), zod schemas, stats/points/badges libs | unit tests |
| 3 | API route family (11 modules + dashboard + prefs) | curl smoke |
| 4 | theme tokens + theme-store + globals.css | visual |
| 5 | shell: nav-config, sidebar, mobile glass header + Sheet drawer, topbar, login/signup/reset rebrand | 390px walk |
| 6 | 11 pages + dialogs (shared page-parts) | browser |
| 7 | CRM retirement sweep | grep + tsc |
| 8 | Vitest suites (domain + kept infra) + Playwright e2e battery (auth ladder, CRUD cycles, mobile nav, filters, theme) | full gate |
| 9 | agent-browser parity pass + screenshots → docs/screenshots/ | VLM + DOM diff |
| 10 | docs (AGENTS/CLAUDE/README/PAD), worklog, commits ×2, SSH pushes | remote main |

## 4. Superset ledger (over the reference)

Email-verification signup ladder + forgot/reset password + login rate
limiting · real dark mode (Light/Dark/Auto) · theme presets live-applied ·
CSV/PDF export of workouts/journal/goals · robust search + subject/type
filters · achievements engine (points + 8 badges, auto-award) · streaks ·
PWA manifest + per-route SEO metadata · accessibility superset (focus
rings, aria states, 44px targets) · e2e-tested mobile drawer · zod
validation at every boundary · bounded readers + rate limits · SQLite
at repo root with path normalization · full Vitest/Playwright suites.

## 5. Risks / open questions (decided)

- **Google OAuth button:** kept for parity; without OAuth credentials it
  toasts "not configured on this deployment" (honest superset behavior).
- **Watch Video / Watch Now:** reference links to placeholder youtube
  URLs (`example-*`). We open the URL in a new tab (same behavior) and
  keep thumbnails from Unsplash (the reference's own source).
- **File upload for study resources:** implement URL-based resources +
  a local upload endpoint reuse (uploads infra kept) — functional parity
  without external storage keys.
- **Reference empty-state data:** all reference lists were empty (fresh
  account). Our seeded demo account ships empty lists too (parity), with
  the seed's `--demo` switch able to populate sample data for exploration.
