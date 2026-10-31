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
| Unit tests (364 checks) | `bun run test` | Vitest, node-safe seams |
| Browser E2E (69 checks) | `bun run test:e2e` | Needs `bun run build` first |
| Smoke the standalone artifact | `bun run smoke` | Needs build first |
| DB census (path + counts) | `bun run db:census` | |
| The full gate in one command | `bun run gate` | lint → tsc → test → build → smoke → e2e |
| Prisma client after schema edit | `bun run db:generate` | |
| Recreate DB from schema | `bun run db:push` | `--accept-data-loss` is pinned in the script |
| Seed content + demo user | `bun run db:seed` | Idempotent; wipes/reseeds content tables |

**Gate order before every push:** `bun run lint` → `bun run typecheck` →
`bun run test` (364) → `bun run build` → `bun run smoke` →
`CI=1 bun run test:e2e` (69: 6 specs + the auth setup project) — or the
one-command `bun run gate`. There is
no hosted CI; the local gate is the only gate. `typescript.ignoreBuildErrors`
is NOT set — a type error fails `bun run build`, and the explicit
`typecheck` step stays in the chain as the faster signal. `bun audit` runs
periodically OUTSIDE the gate (network dependency; the gate must stay
offline-runnable). The advisory posture (re-anchored 2026-10-31, the
WH-29 round): **ZERO vulnerabilities** — the FIVE package.json
`overrides` (vite 8.3.5, deepmerge-ts 8.0.2, source-map-js 1.2.2, zod
4.6.7, minimatch 11.0.3 — all registry-latest) hold the posture. The
WH-29 re-anchor: the WH-8 four-override posture had AGED OUT — a new
advisory (minimatch GHSA-g3hv-75wg-m249, ReDoS) landed under the locked
versions between the periodic `bun audit` re-triages, reached through
the eslint chains (root 3.1.5 + a NESTED typescript-estree 10.2.6); the
override is RANGE-BREAKING but API-compatible at every call site the
lint gate exercises (eslint 9.39.5 runs clean on 11.0.3 — the gate is
the proof). The offline gate carries the posture through the
lockfile-resolution pin (`tests/dead-deps.test.ts` — the five override
versions, exactly one zod at 4.6.7, and EVERY minimatch resolution at
11.0.3 — the nested-copy scan); the dead-dep census pin keeps
zero-import packages from returning.

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
- **The per-module page identity is a MAP, not scattered literals (WH-15)**: every module page consumes its `PAGE_THEMES` entry from `src/lib/page-layout.ts` (the page-root wash, the H1 gradient stops, the button pair, the container width, the header form) — the reference's 2026-10-30 redesign, probed live. The MODULE pairs are fixed v3 classes (NOT preset-themeable — verified on the reference's own preset engine); only the brand family (wordmark, badge, active pills, mobile/drawer titles) rides `--primary`/`--secondary`. The page-theme census pins the map's coverage, pin-completeness and consumption.
- **The shell chrome's INTERIOR is a probe surface like any other (WH-30)**:
  the WH-15 identity round mapped the chrome's COLORS and the e2e battery
  pinned its BEHAVIOR, but the computed BOXES shipped unmeasured through
  twenty-nine rounds. The decoded contracts: the mobile glass header is
  the bare bar (`px-6`, no flex utilities of its own) wrapping (trigger +
  h1) in `MOBILE_HEADER.interior` (`flex items-center gap-4` — a LEFT
  CLUSTER, no right element; the title computes x=68 at 390px); the
  trigger is `h-7 w-7 p-2 rounded-lg hover:bg-gray-100` with the 16px
  `shrink-0` ink icon (the shrink guard matters: the p-2 content box is
  12px and flex-shrink reads 12px without it); the nav rows (desktop +
  drawer) are the 32px `h-8` family with `h-4 w-4` icons, the gray-50
  hover (+ dark twin) and `transition-all duration-300`; the sidebar is
  the THREE-ZONE structure (the `border-b` header zone, the `p-3` flex-1
  nav zone, the `border-t` p-4 footer zone — `SIDEBAR_HEADER` /
  `SIDEBAR_NAV_ZONE` / `SIDEBAR_FOOTER_ZONE`); the Profile card is the
  shared `PROFILE_CARD` (the 40px gradient-circle avatar + the white
  User + the truncate pair) at BOTH footer sites; the drawer's sheet
  carries `border-r border-line` + the reference's authored
  `[&>button]:hidden` (its close X is display:none — the drawer closes
  via Escape/scrim/route-change, and the a11y walks use Escape); and the
  drawer's content is the `flex h-full w-full flex-col` column so the
  footer zone PINS to the sheet bottom. **The app carries NO footer**
  (the © strip retired at WH-30 — the reference renders none; the
  footer-retirement census owns the absence). OUR kept supersets: the
  aria-* attrs, the focus-visible rings, the pointer-events-none toast
  viewport — and the SEMANTIC LAYER (WH-31): the reference's nav ships
  ZERO landmarks (an anonymous `generic` + `list > listitem > link`
  column, its icons NOT aria-hidden — decoded through the accessibility
  snapshot on its round-19 rebuild); ours is the deliberate
  `complementary` + `navigation "Main navigation"` + aria-hidden icons
  + aria-current form at BOTH nav sites, pinned by the a11y spec's (o)
  leg — do NOT "fix" the landmarks toward the reference's landmark-free
  form (same pixels, different trees; ours is the WCAG-superior one).
- **The card family rides the reference's CardHeader/CardContent GEOMETRY (WH-23) — and its sibling families with it (WH-24)**: every list card (the shared `SectionCard` + the dashboard's hand-built Quick Actions card) uses `flex flex-col space-y-1.5 p-6` headers (NO bottom border, the title `font-semibold leading-none tracking-tight`, the optional icon INSIDE the title row at `h-5 w-5` inherited ink — per-card: Exercise/MentalHealth/Events ship the bare title) + `p-6 pt-0` bodies — pinned by the card-geometry census. The Quick Actions grid is `grid grid-cols-2 gap-3` (a 12px gap, never dividers) of fixed `h-24` cells (the `QUICK_ACTIONS` record) whose hover family is the ICON SCALE (`group-hover:scale-110`) + the label lighten — NEVER a background wash or an icon color flip; the reference's `[&_svg]:size-4` WINS over the icon's own `w-6 h-6` (the icon computes 16px). The module KPI rows ride the `MODULE_KPI` record (the `p-6 pt-6` wrapper + the justify-between row + the BIG `w-12 h-12` module-tinted right icons). The empty states are BARE centered paragraphs (`EMPTY_STATE.p`/`.dash` — the icon chip retired at WH-23; StudyResources ships its own special card); the reference OMITS the Assignments + Routines list sections at zero rows (conditional rendering) and the events page's empty body is the bare empty list. The Recent Activity items are 2xl-emoji rows with the mood VALUE as its own detail line + the `formatDateShort` date (the reference's 💚 is a fixed per-kind glyph — its mood vocabulary is byte-identical to ours). WH-28 completed the feed's BUILDER (decoded from the reference's own bundle — zero rows made it unobservable through WH-27): THREE kinds only (exercise `${type} workout` + `${duration} minutes` 🏃; mood "Mood check-in" + the raw value 💚; COMPLETED assignments only `${title}` + "Completed" ✅ at `updatedAt`), the row dates keyed off the ENTITY date fields (never createdAt — the drift that rendered "Oct 31" where the reference renders "Oct 29" on identical data), merged + sorted by date DESC + capped at 8, in a DIV container — the pure seam `src/lib/activity-feed.ts` builds it, the wire `at` stays our name, the e2e feed leg pins the entity-date source (a PAST-dated workout through the real form). The mood list "Your Journey" interior (the WH-26/27 standing block, lifted at WH-28 by the demo account's own data): the label row `flex items-center justify-between mb-2` carries the label as an H4 at `text-lg` gray-900 (18px/600) with the date as its OWN right-side span at `text-sm text-gray-500` (justify-between spreads them); the list container is a DIV at `space-y-4` (16px); the tile `transition-all` — the `MOOD_ENTRY_LIST` record owns it, our delete superset riding in the right-side group beside the date. The mood page's stat tiles mirror the reference's own bundle formulas: Avg Energy `(sum/length).toFixed(1)` ("5.0/10"); Current Streak `min(7, entry count)` — NOT a consecutive-day streak — behind the `displayStreak` seam, while the BADGE ENGINE keeps the real math (`currentStreak`: the "7-Day Streak" badge's own description "7 days in a row" demands it — the TWO-CONSUMER SPLIT, the WH-27 two-site doctrine applied to a seam's consumers). The shell's element tags: the sidebar wordmark is an `<h2>` and the mobile glass-header title an `<h1>` (hidden at desktop, two visible h1s at mobile — the reference's own semantics). The Learning tutorial cards are a GROUP-HOVER REVEAL family (the `TUTORIAL_CARD` record: the img `group-hover:scale-105`, the scrim `bg-black/0 → group-hover:bg-black/20`, the Watch Now button `opacity-0 → group-hover:opacity-100` — NEVER a permanent scrim or an always-visible pill) in the `md:grid-cols-2 lg:grid-cols-3 gap-6` grid. The Events calendar card rides the `CALENDAR` record (the CardHeader/CardContent forms, the title classes ON the justify-between row, the stock OUTLINE nav trio with TEXT arrows ←/→ at `flex gap-2`, the bare gap-2 grid, the `mb-1` day numbers). The chip family is the stock shadcn Badge — a DIV — in TWO variants (WH-29): the solid/secondary base (border-transparent + shadow + the hover arm + the tint — the category chips everywhere + the routines easy/moderate chips) and the OUTLINE base (a plain VISIBLE border + text-foreground, NO shadow/hover/bg — the Learning difficulty chips, 12 instances, byte-parity verified: border rgb(229,229,229), shadow none); the `OptionChip` variant prop owns the split. The seeded-card titles are bare DIVs at `font-semibold tracking-tight text-lg [line-clamp-2]` (no text-foreground — the reference's own strings), the routines card computes overflow VISIBLE (its h-2 strip paints SQUARE corners past the 12px radius — pixel-verified on both apps; never re-add overflow-hidden there), and the routines benefits list is a div/p family. The Goals Achievements section renders EARNED badges only (WH-29, bundle-decoded): the reference's Achievement entity is a PER-USER row table (its demo account carries zero rows — the empty state is the FACE), rendered as vertical `ACHIEVEMENT_TILE` tiles; the always-on 8-badge catalog grid retired (the "0/8 earned" action chip with it — the reference's header is title-only); the catalog-scope "of 8 total" KPI subtitle is the documented PAD §11 deviation, as is the tile's omitted category chip (the values are unobservable; our Badge model has no category column). The module toolbars ride the `TOOLBAR` record (the stock Input + `pl-10`, the Search/Filter icons `h-5 w-5 text-gray-400`, the selects in the Filter-icon wrapper at FIXED w-48/w-40, the `flex flex-col md:flex-row gap-4` container) and the form textareas the `TEXTAREA_FIELD` stock form (`min-h-[60px] text-base md:text-sm shadow-sm`); the OptionChip is the stock shadcn Badge (the `hover:bg-primary/80` arm included). The routines template cards render NO thumbnail and NO Watch Video (the reference's own data carries the fields its UI omits — parity is a property of the RENDERED FACE) and their Use This Template button is the BARE category pair + `hover:opacity-90 w-full mt-auto shadow` (the 600 hover arms belong to PAGE_THEMES' module primaries only). The Profile tab panels ride the probed WH-25 geometry: the Tabs wrapper `w-full` + the panels `mt-2`, the stock Label + `mb-3 block` preset section with TWO-CIRCULAR-SWATCH preset cards + the `w-20 h-12` color inputs + the 135deg preview tile, the STACKED Visual Style selects, the `bg-gray-50` disabled Account inputs, the Preferences rows at `p-4 rounded-lg border` with **NATIVE bare `w-5 h-5` checkboxes** (the custom Checkbox retired at WH-25 with its false WH-21 premise — do NOT reintroduce it), and the `flex justify-end gap-3 sticky bottom-4` save bar.
- **The module create-forms are INLINE CARDS, not dialogs (WH-21)**: the seven action pages (Events, Exercise, MentalHealth, Assignments, Reminders, StudyResources, Goals) render their create/edit forms as inline expanding cards in the page flow (the `FORM_CARD` record from `src/lib/page-layout.ts` — `rounded-xl border bg-surface text-ink border-none shadow-xl`, the `p-6` header, the `p-6 pt-0` body, the `flex justify-end gap-3` footer inside the `space-y-4`), placed directly below the page header, conditionally rendered — the reference's own modality (probed live: its forms open with zero overlays, no scroll lock). Only the Routines "Schedule" flow is a modal (on both apps). The form-modality census + the e2e modality leg pin it — do NOT reintroduce Dialog there; `ui/dialog` keeps its consumers in routines/app-shell/mobile-nav. The Routines "Schedule" flow IS a dialog on both apps — and its CONTENT rides the `SCHEDULE_MODAL` record (WH-22, probed field-by-field: the 672px width, the title-only header, the gradient-50 description tile with the nested Remember inset, the gray-50 step tiles with solid purple-500 circles, the grid-gap-4 fields, and the w-full module-pair primary — NO Cancel). `DialogFooter`/`DialogDescription`/`DIALOG_FOOTER` retired at WH-22 with their last consumer — the ui-export + value censuses own that retirement. **The forms' INTERIOR field geometry rides the WH-26 records** (probed field-by-field on the redeployed reference): the trailing dense fields pair two-wide in the `FORM_GRID` record (`grid md:grid-cols-2 gap-4` — events [Date/Time/Category/Location] · exercise [Type/Duration/Intensity/Calories/Date] · assignments [Subject/Due/Priority/Hours] · reminders [RemindMeOn/Type/Priority/Repeat] · goals ONE grid [Category/Frequency/Target/Unit/Deadline] · sr [Title/Subject] + [Type/ExamDate]); the mood form is the ONE form whose wrapper deviates (`MOOD_FORM`: `space-y-6` where its siblings ride `space-y-4`, the mood label `mb-4 block` with the grid BARE, the tile label STATE-CONDITIONAL — `labelActive` flips to `text-white`, never a constant label ink [the F-1 bug: the constant gray-700 rendered gray on the blue gradient], the 8px gray-200 range at **min=1**, the Low/High `text-gray-500 mt-1`, the h-24 reflection); the footer/Add buttons ride the `FORM_BUTTONS` record (the stock outline Cancel `h-9 px-4`; the Add the solid zinc `bg-neutral-900` — the reference's `--primary` is the shadcn stock zinc rgb(23,23,23), NOT its brand pair); the tag chips ride a **TWO-SITE SPLIT** (WH-27: the mood form the `TAG_CHIP` emerald family [`bg-emerald-100 text-emerald-700`, the × BARE, the row `mt-3`]; the sr form the `SR_CHIP` stock-Badge DEFAULT family — a DIV [`inline-flex items-center rounded-md border border-line px-2.5 py-0.5 text-xs font-semibold … text-ink gap-2`, the × BARE, the row BARE] — NEVER generalize one site's family to the other); the sr rating picker the `RATING_PICKER` text-star form (five bare `text-2xl` buttons — the lucide Star icons retired from the FORM; the click fill is the **⭐ EMOJI U+2B50** for selected + ☆ for the rest, never the ★ text glyph [the WH-27 codepoint decode — a ☆/★ regex cannot match the emoji]; the list card's read-only Star display is a separate unprobed surface); and the sr upload field the `UPLOAD_FIELD` render-only mirror. The form-grid + form-interior + sr-chip-family + rating-glyph censuses pin every member.
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
  **WH-26 correction:** the redeployed reference's Study Resources form
  now carries a bare "Upload File (optional)" stock file input — the
  surface is mirrored at the RENDER-ONLY face level (the native picker
  opens; nothing persists — the `/api/upload` retirement stays: the
  reference's own field wires to nothing observable either).

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
- `@custom-variant dark (&:where(.dark, .dark *));` — the WH-18 pin: v4's
  DEFAULT dark variant compiles every `dark:` utility to the
  `prefers-color-scheme` media query (the OS preference), but this app's
  theme engine flips a `.dark` CLASS on `<html>` — without the pin the two
  strategies never meet (dark mode shipped broken through seventeen green
  rounds: swapped tokens with light text values in dark, gray-400 on white
  cards for every OS-dark user in light).
- The three `@source not` directives (WH-14) — Tailwind v4's automatic
  content detection scans every TRACKED file; without the exclusions the
  `skills/` + `docs/` markdown corpus compiles into the production
  stylesheet (71% dead weight before the pin). Pinned by the src-census.
- Dark mode = `.dark` class token overrides, same file.
- The compiled-CSS watch (the reference's redeployment detector) moved to `/assets/` at round 16 (2026-10-31: `/static/index-s8d1FO8M.css` → `/assets/index-heGLHP2e.css`), then flipped BACK at round 19 (WH-31, same day: `/assets/index-heGLHP2e.css` → `/static/index-s8d1FO8M.css` — the PRE-round-16 content hash, so the stylesheet content is byte-identical and only the path shape moved), with a NEW JS bundle (`index-5-N3MB6y.js`) and the platform adding `cdn.tailwindcss.com` (the Tailwind Play CDN — runtime-compiled classes) + `/api/frontend-config.js?v=3`. The WH-31 lesson-30 walk re-verified EVERY standing map byte-parity on the new build (a platform rebuild, not a redesign). The watch matches BOTH path shapes (`/static/` and `/assets/`) — and while the platform keeps the CDN, a runtime-compiled Tailwind can drift computed values WITHOUT a bundle hash change (the watch may need a computed spot-check companion). The WH-15 washes carry `dark:` neutral variants (our superset over the reference's partially-broken dark).
- The 26 redesign palette pairs joined the session-88 pin block (121 pairs total, all v3-verified — the equivalence census holds in both directions; WH-19 added the login-family dark-pair pins: emerald-400/950, green-400/900/950, neutral-500, red-400/900) — the pins⇔usage census holds in both directions.

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
- Icons are lucide-react: sidebar nav icons uniform `h-4 w-4` stroke-2
  (the reference's 16px — WH-30), content icons `h-4 w-4`; the brand
  badge's Sparkles + the Profile avatar's User stay `h-5 w-5` (the
  reference's own 20px inside the 40px tiles).
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
  call site, every exported TYPE anywhere in src has a consumer
  outside its own module (the WH-11 whole-tree walk — a same-module-only
  type cures by dropping the `export` keyword, keeping the declaration),
  and every component's destructured props are PASSED at a JSX call site
  (the WH-12 whole-tree pass-site census — `children`, the byte-stock
  shadcn wrapper signatures, and the Next.js convention files are the
  pinned exemptions; a surface pin is not a liveness pin — a prop with
  zero passers is dead surface, stock wrapper shapes keep their shape),
  and every schema field is consumed at a READ site (the WH-13
  column-liveness census — writes and wire declarations do not keep a
  column alive: the completedAt quartet retired with its seam writes and
  wire members; `@updatedAt` is the stock-schema boundary and
  `Tutorial.views` rides the SCHEMA_PARITY_KEEPS list — the reference's
  own entity carries it, verified live), and every @theme token is
  consumed (the WH-14 design-token census — a utility hit or a var()
  read; declarations, `.dark` overrides and runtime setProperty writes
  are authorship, not consumption), and the Tailwind source scan stays
  pinned (the three `@source not` directives) and every used palette
  pair carries its v3 pin (the pins⇔usage equivalence, both
  directions). The
  WH-6/WH-7/WH-8/WH-9/WH-11/WH-12/WH-13 pin — same doctrine as the
  dead-dep, route/ui and docs-counts census pins.
- The capture-state doctrine (WH-25, the 11-goals lesson): the screenshot
  procedure ASSERTS a clean account BEFORE the light set — the
  achievements API's `badgesEarned` must read 0 (an earned badge from a
  prior capture's API write is environmental residue that silently moves
  the ledger; the WH-24 11-goals mover was exactly this). If the
  assertion fails, `bun run db:seed` and re-run — never re-base the
  ledger on a dirty account.
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
- The console-hygiene net (WH-16, in `tests/e2e/shell.spec.ts`) walks
  every module route asserting ZERO console errors/warnings — an error
  class the DOM-asserting checks can never see (the hydration mismatch
  that shipped fifteen green rounds). Its cure rides
  `suppressHydrationWarning` on `<html>`/`<main>` (pinned by the
  hydration-suppression census in `tests/src-census.test.ts`); a new
  console error on the walked pages fails the gate — cure it or pin a
  documented ignore entry, never silence the net.
- The a11y net (WH-17, in `tests/e2e/a11y.spec.ts`) walks every module
  route + the open mobile drawer + the login page with axe-core at
  WCAG 2.1+2.2 A+AA tags asserting ZERO violations — the semantics layer the
  DOM-asserting checks never read (the chip vocabulary, the Watch-Now
  labels and the theme-mode chips all shipped AA-failing through sixteen
  green rounds). `@axe-core/playwright` rides as a devDep WITH its live
  import (the WH-3 retirement reversed only because the consumer
  arrived); a new violation fails the gate — cure it or pin a documented
  ignore entry. The chip vocabulary's `-100/-700` system is pinned
  structurally by the chip-vocabulary census in `tests/src-census.test.ts`.
  The WH-18 widening: the net also walks the DARK state (every module
  route + the drawer, flipped through the Profile UI and reverted with a
  PUT-landing verification), the OS-dark corner (`colorScheme: "dark"` +
  mode light — pure light, no `.dark` class), the dark login (the seeded
  persisted state — the ThemeBoot mount's pin) and the transient
  select/toast surfaces — the rendered-STATES axis the light-only walks
  never read (dark mode shipped broken through seventeen green rounds).
  The WH-19 widening: the DARK CORNERS (the surfaces outside the walk set —
  /signup, /reset-password and the 404, whose pathname span was also the
  app's one SSR/client hydration mismatch: React #418's whole-tree
  regeneration deleted applyTheme's pre-hydration writes off <html>; cured
  by the isClient guard), the LIGHT computed-contrast leg (the alpha-card
  family axe returns color-contrast INCOMPLETE for — measured directly,
  oklab-aware, both modes, the WCAG large-text rule applied per element)
  and the AUTO-MODE listener walk (page.emulateMedia flips mid-flight;
  explicit choices ignore the OS). The WH-20 widening: the
  INTERACTION-STATES legs — the fourth assertion-surface class the gate
  never read (DOM → console → semantics → interaction; axe never hovers,
  never focuses, and the state walks render resting pages only): the
  data-bearing dark row walk (one row created through the API — the empty
  lists the state walks render never showed the delete buttons), the
  dark login focus ring (real keyboard Tab, ≥400 ms settle — the
  transition-all box-shadow interpolation reads t≈0 transparent if
  sampled synchronously), the dark footer (the white strip that passed
  every walk because its self-contrast is AA-fine) and the toast-hover
  probe (a REAL pointer event; synthetic mouseenter never sets :hover).
  The unit side pins the same axis: the interaction-arm dark-pair census
  (every palette hover:/focus: arm carries its dark twin — token arms,
  the gray-200/300/400 both-mode family and the black-scrim overlays are
  the documented structural exemptions) + the interaction-contrast
  arithmetic pin (pairing is not contrast — the pin computes the twin's
  VALUE from the v3 palette pins against the rendered surface). The
  WH-21 widening: the FORM-MODALITY axis (the delivery mechanism is an
  assertion surface of its own — the reference's create-forms are inline
  cards, not dialogs; pinned by the form-modality census + the CRUD
  modality leg) + the dark checkbox walk (the F-1 class: state arms
  (`data-[state=checked]:`) the hover/focus census never covered) + the
  dark mood-tile walk (Tailwind v4's `scale-105` compiles to the `scale`
  PROPERTY, not `transform` — read the property, not the old pipeline) +
  the gradient-ink arithmetic pin (the whole fixed-gradient white-ink
  family measured: all 16 pairs AA-fail at the worst stop + the four KPI
  hero-label -100 tints (WH-23: 2.45/2.19/2.07/1.79), all
  reference-shared — documented in PAD §11, pinned, not cured). The
  WH-23 widening: the card-geometry + empty-form/omission censuses (the
  identity probe read color, never geometry — the CardHeader/
  CardContent anatomy, the gap-3 Quick Actions grid, the scale-110
  hover family, the MODULE_KPI big icons, the bare-paragraph empty
  states, the zero-row section omissions) + the scroll-capped keyboard
  walk (the (g) leg: the initial focus, the trap, the below-fold
  primary's scroll-into-view — the net never walked a scrolled dialog).
  The WH-24 widening: the sibling-family censuses (the tutorial card's
  group-hover REVEAL family, the calendar card's CardHeader/CardContent
  + outline nav, the module-toolbar stock forms, the chip's Badge arms,
  the routines template-card face) + the hover-reveal and
  calendar-anatomy e2e legs ((h)/(i) — the resting opacity-0 button
  read in the oklab alpha form, the outline trio's computed colors). The WH-25 swap:
  the (e) dark-checkbox leg RETIRED with its false premise (the
  reference's Preferences controls are NATIVE bare checkboxes — the
  WH-21 claim it pinned was written without opening the tab) and the
  (j) Profile tab-region computed-geometry leg replaced it. The WH-26
  widening: the (k) mood-form computed-interior leg (the field
  interiors the modality/card rounds never field-walked — the
  space-y-6 group ladder, the mb-4 mood label, the 8px gray-200 track
  at min 1, the h-24 reflection, the stock footer buttons, the emerald
  chip client-state, and THE ACTIVE TILE'S LABEL COLOR: the WH-21 F-3
  pin asserted the button's `text-white` arm while the label span's
  constant gray-700 overrode it — a pin must assert the RENDERED LEAF). The WH-27
  widening: the (l) login-family computed-interior leg (the five views'
  geometry probe-verified at WH-26, pinned standing at WH-27 — the
  h1/h2/back ladder, the 44px signup inputs, the 64px sent icon, the
  6×40×44 code inputs: the NEXT redeployment's login-family drift is
  caught same-day) + the sr-chip-family + rating-glyph censuses (the
  two-site chip split + the ⭐ emoji fill — the WH-27 probes' decoder
  lessons: an element-tag vocabulary [span vs div] and a codepoint
  vocabulary [⭐ vs ★] both hide behind identical visual faces).

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
