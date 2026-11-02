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
| Unit tests (375 checks) | `bun run test` | Vitest, node-safe seams |
| Browser E2E (72 checks) | `bun run test:e2e` | Needs `bun run build` first |
| Smoke the standalone artifact | `bun run smoke` | Needs build first |
| DB census (path + counts) | `bun run db:census` | |
| The full gate in one command | `bun run gate` | lint → tsc → test → build → smoke → e2e |
| Prisma client after schema edit | `bun run db:generate` | |
| Recreate DB from schema | `bun run db:push` | `--accept-data-loss` is pinned in the script |
| Seed content + demo user | `bun run db:seed` | Idempotent; wipes/reseeds content tables |

**Gate order before every push:** `bun run lint` → `bun run typecheck` →
`bun run test` (375) → `bun run build` → `bun run smoke` →
`CI=1 bun run test:e2e` (72: 6 specs + the auth setup project) — or the
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
- **The card family rides the reference's CardHeader/CardContent GEOMETRY (WH-23) — and its sibling families with it (WH-24)**: every list card (the shared `SectionCard` + the dashboard's hand-built Quick Actions card) uses `flex flex-col space-y-1.5 p-6` headers (NO bottom border, the title `font-semibold leading-none tracking-tight`, the optional icon INSIDE the title row at `h-5 w-5` inherited ink — per-card: Exercise/MentalHealth/Events ship the bare title) + `p-6 pt-0` bodies — pinned by the card-geometry census. The Quick Actions grid is `grid grid-cols-2 gap-3` (a 12px gap, never dividers) of fixed `h-24` cells (the `QUICK_ACTIONS` record) whose hover family is the ICON SCALE (`group-hover:scale-110`) + the label lighten — NEVER a background wash or an icon color flip; the reference's `[&_svg]:size-4` WINS over the icon's own `w-6 h-6` (the icon computes 16px). The module KPI rows ride the `MODULE_KPI` record (the `p-6 pt-6` wrapper + the justify-between row + the BIG `w-12 h-12` module-tinted right icons). The empty states are BARE centered paragraphs (`EMPTY_STATE.p`/`.dash` — the icon chip retired at WH-23; StudyResources ships its own special card); the reference OMITS the Assignments + Routines list sections at zero rows (conditional rendering) and the events page's empty body is the bare empty list. The Recent Activity items are 2xl-emoji rows with the mood VALUE as its own detail line + the `formatDateShort` date (the reference's 💚 is a fixed per-kind glyph — its mood vocabulary is byte-identical to ours). WH-28 completed the feed's BUILDER (decoded from the reference's own bundle — zero rows made it unobservable through WH-27): THREE kinds only (exercise `${type} workout` + `${duration} minutes` 🏃; mood "Mood check-in" + the raw value 💚; COMPLETED assignments only `${title}` + "Completed" ✅ at `updatedAt`), the row dates keyed off the ENTITY date fields (never createdAt — the drift that rendered "Oct 31" where the reference renders "Oct 29" on identical data), merged + sorted by date DESC + capped at 8, in a DIV container — the pure seam `src/lib/activity-feed.ts` builds it, the wire `at` stays our name, the e2e feed leg pins the entity-date source (a PAST-dated workout through the real form). The mood list "Your Journey" interior (the WH-26/27 standing block, lifted at WH-28 by the demo account's own data): the label row `flex items-center justify-between mb-2` carries the label as an H4 at `text-lg` gray-900 (18px/600) with the date as its OWN right-side span at `text-sm text-gray-500` (justify-between spreads them); the list container is a DIV at `space-y-4` (16px); the tile `transition-all` — the `MOOD_ENTRY_LIST` record owns it, our delete superset riding in the right-side group beside the date. The mood page's stat tiles mirror the reference's own bundle formulas: Avg Energy `(sum/length).toFixed(1)` ("5.0/10"); Current Streak `min(7, entry count)` — NOT a consecutive-day streak — behind the `displayStreak` seam, while the BADGE ENGINE keeps the real math (`currentStreak`: the "7-Day Streak" badge's own description "7 days in a row" demands it — the TWO-CONSUMER SPLIT, the WH-27 two-site doctrine applied to a seam's consumers). The shell's element tags: the sidebar wordmark is an `<h2>` and the mobile glass-header title an `<h1>` (hidden at desktop, two visible h1s at mobile — the reference's own semantics). The Learning tutorial cards are a GROUP-HOVER REVEAL family (the `TUTORIAL_CARD` record: the img `group-hover:scale-105`, the scrim `bg-black/0 → group-hover:bg-black/20`, the Watch Now button `opacity-0 → group-hover:opacity-100` — NEVER a permanent scrim or an always-visible pill) in the `md:grid-cols-2 lg:grid-cols-3 gap-6` grid. The Events calendar card rides the `CALENDAR` record (the CardHeader/CardContent forms, the title classes ON the justify-between row, the stock OUTLINE nav trio with TEXT arrows ←/→ at `flex gap-2`, the bare gap-2 grid, the `mb-1` day numbers). The chip family is the stock shadcn Badge — a DIV — in TWO variants (WH-29): the solid/secondary base (border-transparent + shadow + the hover arm + the tint — the category chips everywhere + the routines easy/moderate chips) and the OUTLINE base (a plain VISIBLE border + text-foreground, NO shadow/hover/bg — the Learning difficulty chips, 12 instances, byte-parity verified: border rgb(229,229,229), shadow none); the `OptionChip` variant prop owns the split. The seeded-card titles are bare DIVs at `font-semibold tracking-tight text-lg [line-clamp-2]` (no text-foreground — the reference's own strings), the routines card computes overflow VISIBLE (its h-2 strip paints SQUARE corners past the 12px radius — pixel-verified on both apps; never re-add overflow-hidden there), and the routines benefits list is a div/p family. The Goals Achievements section renders EARNED badges only (WH-29, bundle-decoded): the reference's Achievement entity is a PER-USER row table (its demo account carries zero rows — the empty state is the FACE), rendered as vertical `ACHIEVEMENT_TILE` tiles; the always-on 8-badge catalog grid retired (the "0/8 earned" action chip with it — the reference's header is title-only); the catalog-scope "of 8 total" KPI subtitle is the documented PAD §11 deviation, as is the tile's omitted category chip (the values are unobservable; our Badge model has no category column). The module toolbars ride the `TOOLBAR` record (the stock Input + `pl-10`, the Search/Filter icons `h-5 w-5 text-gray-400`, the selects in the Filter-icon wrapper at FIXED w-48/w-40, the `flex flex-col md:flex-row gap-4` container) and the form textareas the `TEXTAREA_FIELD` stock form (`min-h-[60px] text-base md:text-sm shadow-sm`); the OptionChip is the stock shadcn Badge (the `hover:bg-primary/80` arm included). The routines template cards render the VIDEO family on the six templates
carrying the fields (WH-32: the reference's round-20 build renders the
h-40 thumbnail + the Watch Video reveal overlay — `ROUTINE_VIDEO_CARD`;
the WH-24 "its UI omits the fields" retirement REVERSED when its
renderer learned to draw them; the five field-less templates render the
bare face) and their Use This Template button is the BARE category pair +
`hover:opacity-90 w-full mt-auto shadow` (the 600 hover arms belong to
PAGE_THEMES' module primaries only). The Profile tab panels ride the probed WH-25 geometry: the Tabs wrapper `w-full` + the panels `mt-2`, the stock Label + `mb-3 block` preset section with TWO-CIRCULAR-SWATCH preset cards + the `w-20 h-12` color inputs + the 135deg preview tile, the STACKED Visual Style selects, the `bg-gray-50` disabled Account inputs, the Preferences rows at `p-4 rounded-lg border` with **NATIVE bare `w-5 h-5` checkboxes** (the custom Checkbox retired at WH-25 with its false WH-21 premise — do NOT reintroduce it), and the `flex justify-end gap-3 sticky bottom-4` save bar.
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
- The compiled-CSS watch (the reference's redeployment detector) moved to `/assets/` at round 16 (2026-10-31: `/static/index-s8d1FO8M.css` → `/assets/index-heGLHP2e.css`), then flipped BACK at round 19 (WH-31, same day: `/assets/index-heGLHP2e.css` → `/static/index-s8d1FO8M.css` — the PRE-round-16 content hash, so the stylesheet content was byte-identical and only the path shape moved), with a NEW JS bundle (`index-5-N3MB6y.js`) and the platform adding `cdn.tailwindcss.com` (the Tailwind Play CDN — runtime-compiled classes) + `/api/frontend-config.js?v=3`. **Round 20 (WH-32, 2026-11-01): the first stylesheet CONTENT change since round 16** — `/static/index-s8d1FO8M.css` → `/static/index-BHjkUcdg.css` + a new JS bundle (`index-BFu7mt5f.js`), the CDN pipeline still present. The lesson-30 walk found exactly ONE rendered-face change (the routines video-card family — the WH-32 F-1 cure); every other standing map held byte-parity. **Rounds 21+22 (WH-33, same day): the JS bundle moved TWICE more** (`index-BFu7mt5f.js` → `index-DT3tkBuH.js` → `index-CXmO9oF_.js` — four distinct bundles in two days) with the CSS content hash STABLE — the active development cadence the WH-32 plan predicted; the walks (manual round 21 + the committed script's 14-surface digest on the newest bundle) found ZERO rendered-face drift. The watch matches BOTH path shapes (`/static/` and `/assets/`) — and the CDN companion question is CLOSED (WH-33): the watch + the computed spot-check are the committed one-command `scripts/watch-round.mjs` (PASS 1 the asset forms logged-out; PASS 2 the one-login computed digest with a MATCH/DRIFT report — network-dependent, OUTSIDE the gate; the ledger re-bases in the same commit as any cure). While the reference's cadence holds, run it EVERY round — a stable content hash does not prove the computed values didn't move (the runtime-compiled CDN layer has no bundle hash to watch). **Round 23 (WH-34, same day): the STABLE READ** — both content hashes unchanged, the digest **15/15 MATCH** (the `moodForm` surface joined as the 15th: the form's computed interior, open read-only → Cancel, the default Good tile pre-selected on BOTH apps) — the first quiet round since 20; one stable round is a cooling NOTE, not a policy (two-plus start one). The WH-34 F-1 cure rides the script itself: the ledger's asset entries BOTH carry the probe's RETURN form (the full path — `cssPath` + `jsPath`); a bare-basename entry can never match and degenerates its axis into an always-fired MOVED (the false-positive class the WH-33 re-base born and round 23 caught live). A ledger edit birth-verifies BOTH outcomes — the firing state AND the quiet state. The `/api/frontend-config.js` payload is DECODED (WH-34): the Base44 platform's runtime config (telemetry/CAPTCHA/OAuth flags, the platform GIT_SHA) — zero app-face values, which is why the bundle hash moves while the face holds. **Round 24 (WH-35, same day): a genuine js MOVED — the FIFTH distinct bundle** (`index-CXmO9oF_.js` → `index-BKhnHaM4.js`; CSS stable since round 20) — NOT the second stable read, no cooling policy; the same run's digest read **15/15 MATCH on the new bundle** (the walk done by the companion itself), and the ledger re-based + born-verified on the quiet state. **The same-round dual-app companion (WH-35): `scripts/parity-moodform.mjs`** — PASS A the reference's mood form, PASS B our dev server's, the member-by-member live-vs-live diff (exit 1 on drift; zero-write on both apps). Its first flight caught the form-submit ink drift (the WH-35 cure): two pin sets on two apps are two clocks — each app is compared against its own yesterday; the live-vs-live read closes the skew. Run it alongside the watch each round (the dev server must be up). **Round 25 (WH-36, same day): the first consecutive STABLE READ since round 24's move** — both content hashes unchanged, the digest **15/15 MATCH**, the parity-moodform companion **20/20 MATCH** (its second consecutive quiet flight). **Round 26 (WH-37, same day): a genuine js MOVED again — the SIXTH distinct bundle** (`index-BKhnHaM4.js` → `index-CcEolDtM.js`; CSS stable since round 20) — the stable streak broke again, NO cooling policy yet; the same run's digest read **15/15 MATCH on the new bundle**; the ledger re-based + born-verified on the quiet state. The parity companions: moodForm **20/20** (third consecutive quiet), login **34/34** (second) — and **the net's THIRD SURFACE (WH-37): `scripts/parity-shell.mjs`** — the shell nav family (the desktop sidebar + the mobile glass header + the drawer battery — the instruction's mobile-menu emphasis), ONE login per app, zero-write, born-verified **61/61 MATCH**. Run all THREE parity scripts alongside the watch each round (the dev server must be up). **Round 27 (WH-38, same day): the DOUBLE move — the CSS content hash changed for the FIRST TIME since round 20** (`index-BHjkUcdg.css` → `index--nhcow2j.css`) AND the js bundle moved again (`index-CcEolDtM.js` → `index-CaQQhuPL.js`, the SEVENTH distinct bundle) — the round-20 class (a stylesheet CONTENT change, the rarest signal). The same-run digest read **15/15 MATCH on the new assets**, and the parity battery — login **34/34** (third), moodForm **20/20** (fourth), shell **61/61** (second) + the new fourth surface — verified the rendered face byte-held through the css move. The ledger re-based on BOTH axes, born-verified on the quiet state. **The parity net's FOURTH SURFACE (WH-38): `scripts/parity-dashboard.mjs`** — the dashboard stat-tile family, the app's main face (the WH-37 seed cure made the tile DATA values comparable by construction): ONE login per app, zero-write (login + read, nothing clicked), 105 members (the page header + the KPI grid + all four tiles' full computed anatomy + the DATA values as-is — a data drift is a finding to decode, the lesson-41 class), the gradient stop-triples + the shadow real-layers normalizations (the v4 var-chain zero-layers), born-verified **105/105 MATCH**. Run all FOUR parity scripts alongside the watch each round (the dev server must be up; five reference logins total per round). **Round 28 (WH-39, same day): the DOUBLE move AGAIN — the CSS content hash changed for the SECOND TIME in two rounds** (`index--nhcow2j.css` → `index-CMHVFeas.css`) AND the js bundle moved again (`index-CaQQhuPL.js` → `index-NVr-T2eL.js`, the EIGHTH distinct bundle) — the active-development cadence is the standing state. The same-run digest read **15/15 MATCH on the new assets**, and the widened battery's first full run — login **34/34** (fourth), moodForm **20/20** (fifth), shell **61/61** (third), dashboard **105/105** (third) — verified the rendered face byte-held through the second css content move. **The parity net's FIFTH SURFACE (WH-39): `scripts/parity-headers.mjs`** — the module page headers family (the PAGE_THEMES identity map, all 10 non-dashboard pages; data-independent): ONE login per app, zero-write, **192 members** (the H1 + subtitle + page-root wash + container per page + the activator pair on the 7 action pages), the gradient stop-triples + the oklab alpha-stop composited-wash tolerance (maxdelta 1/≤2% — lesson 43) + the bounding-box subtitle gap (the margin-collapse class) normalizations, born-verified **192/192 MATCH**. Run all FIVE parity scripts alongside the watch each round (the dev server must be up; six reference logins total per round — inside the 10/15min login budget). **Round 29 (WH-40, same day): a genuine js MOVED — TWICE in the round** (`/static/index-NVr-T2eL.js` → `/static/index-BzrvnYzb.js` mid-round, then the TENTH distinct bundle `/static/index-DA6CuPbY.js` before the re-base landed; the CSS content hash STABLE at `index-CMHVFeas.css` since round 28) — the single-axis move class, NOT a stable read; the cooling policy stays unborn. Both same-run digests read **15/15 MATCH on their new bundles**, and the standing battery's second full-width run — login **34/34** (fifth), moodForm **20/20** (sixth), shell **61/61** (fourth), dashboard **105/105** (fourth), headers **192/192** (third), 412 computed members live-vs-live — verified the rendered face byte-held through both moves. The ledger re-based on the js axis, born-verified on the quiet state. **The parity net's SIXTH SURFACE (WH-40): `scripts/parity-toolbars.mjs`** — the module toolbar family (the `TOOLBAR` record's two consumer pages — StudyResources + Learning — plus the LANDSCAPE fact: the eight absence pages are members, catching a toolbar appearing or disappearing on either app): ONE login per app, zero-write, **98 members** (the input/icon/container/selects-wrapper/Filter-icon anatomy + the triggers' 12 members each + the 10 landscape pins), the shadow real-layers normalization (the lesson-40 class) + the RENDERED bounding-box icon position (the lesson-44 inter-property class: the reference's CDN computes `-translate-y-1/2` as a transform matrix, our v4 as the separate `translate` property — the rect is the member, verified 8px/12px on both), born-verified **98/98 MATCH**. Run all SIX parity scripts alongside the watch each round (the dev server must be up; seven reference logins total per round — inside the 10/15min login budget). **Round 30 (WH-41, same day): the hottest cadence yet — an INTRA-ROUND TRIPLE js move + a REVERT, riding the THIRD css CONTENT change** (`index-CMHVFeas.css` → `index-T8A-IXoy.css` + the ELEVENTH bundle `/static/index-B3stYFo-.js` on the first run, then the TWELFTH `/static/index-6yfO0HkE.js` firing during the first re-base's born-verification, then the THIRTEENTH `/static/index-DBRn9GKt.js` firing during the second — whose digest fired the battery's FIRST 1-DRIFT read — and then the platform REVERTING to the twelfth within minutes, the standing face reading 15/15 clean on it). The transient thirteenth carried a real one-surface rendered-face change the rollback removed; its surface detail was lost to a filtered first read — the lesson-45 sibling: capture the FULL watch output every run (a transient deployment can vanish before the re-run; the drift detail IS the finding). The ledger re-based ONCE to the round's final read (the reverted twelfth), born-verified on the quiet state. The standing battery's third full-width run — login **34/34** (sixth), moodForm **20/20** (seventh, after one transient first-flight PROBE-ERROR closed as the post-login cookie-commit race — lesson 45: reproduce before curing), shell **61/61** (fifth), dashboard **105/105** (fifth), headers **192/192** (fourth), toolbars **98/98** (second) — **510 computed members live-vs-live**. **The parity net's SEVENTH SURFACE (WH-41): `scripts/parity-kpis.mjs`** — the `MODULE_KPI` record family, the non-dashboard pages' stat rows (the 5 consumer pages' 3-tile rows + the LANDSCAPE fact: the 5 absence pages are members): ONE login per app, zero-write, **315 members** (10 landscape + 5×4 grid/count + 15 tiles × 19 — the icon/label/value/tile/wrap/row anatomy + the DATA values as-is under the shared demo state), the 48×48 SVG anchor (the `MODULE_KPI.bigIcon` signature), the gradient stop-triples + the shadow real-layers normalizations (both lesson-40 classes — the net's first surface to land with ZERO unknown serialization classes), born-verified **315/315 MATCH** — the net's widest surface. **Round 31 (WH-42, same day): the DOUBLE-AXIS move AGAIN — the FOURTH css CONTENT change** (`index-T8A-IXoy.css` → `index-DsYCKxwV.css`) + the FOURTEENTH bundle `/static/index-BH_eVSe7.js` on the first run, then the FIFTEENTH `/static/index-qi2AnSYN.js` firing during the first re-base's own born-verification — the WH-40/41 intra-round class, the fourth consecutive round with an intra-round move; every same-run digest **15/15 MATCH on its own bundle**, the ledger re-based once to the round's final read, born-verified on the quiet state. The standing battery's fourth full-width run — login **34/34** (seventh), moodForm **20/20** (eighth, after one transient first-flight PROBE-ERROR closed by two re-runs — lesson 45), shell **61/61** (sixth), dashboard **105/105** (sixth), headers **192/192** (fifth), toolbars **98/98** (third), kpis **315/315** (fourth) — **825 computed members live-vs-live**. **The parity net's EIGHTH SURFACE (WH-42): `scripts/parity-routines.mjs`** — the routines template-card family (the `ROUTINE_VIDEO_CARD` record + the seeded-card face + the `ROUTINE_CATEGORY_GRADIENTS` map): ONE login per app, zero-write, **697 members** (13 landscape incl. the ORDER member — the rendered card SEQUENCE is a member — + 5 plain cards × ~53 + 6 video cards × ~69 — the card chrome/strip/video-zone/title/chip/desc/meta/tip/benefits/button anatomy + the DATA texts as-is), the 12px-radius card anchor (the reference's per-card wrapper defeats a "grid child" walk), the gradient stop-triples + the shadow real-layers + the ALPHA-BLACK oklab form (our v4's `oklab(0 0 0 / 0.4)` vs the CDN's `rgba(0, 0, 0, 0.4)` — the lesson-40 color class's ALPHA sibling) normalizations, born-verified **697/697 on the cured tree + stable on three more consecutive flights** — the net's widest surface by more than 2×, and its born-flight caught the round's two REAL data drifts (the reference re-ordered its template grid + trimmed the video templates' benefit rows to three — both cured TDD-style, the seed-parity suite's grid-order + benefits-trim contracts). Run all NINE parity scripts alongside the watch each round (the dev server must be up; NINE reference logins total per round — OVER the 10/15min budget's comfort edge: split the battery across two login windows or pace any re-run across the 15-min window, and note OUR dev server runs the same per-process login limiter — restart it between the battery and any decode phase, the lesson-46 doctrine). **Round 32 (WH-43, 2026-11-02): the DOUBLE-AXIS move AGAIN — the FIFTH css CONTENT change** (`index-DsYCKxwV.css` → `index-CapATpwD.css`, the css content axis moving for the THIRD consecutive round) **+ the SIXTEENTH bundle** `/static/index-a8mtclnh.js` on the first run, then the SEVENTEENTH `/static/index-DrgN_FlZ.js` firing during the first re-base's own born-verification — the intra-round class, the FIFTH consecutive round. The same-run digest **15/15 MATCH**; the standing battery's fifth full-width run — all eight legs, **1,522 computed members live-vs-live** — verified the rendered face byte-held through the move. **The parity net's NINTH SURFACE (WH-43): `scripts/parity-tutorials.mjs`** — the Learning tutorial-card family (the `TUTORIAL_CARD` record + the OptionChip pair): ONE login per app, zero-write, **790 members** (the landscape incl. the ORDER member + the sr input fact + per card ~64 — the card chrome/cover/img/overlay/Watch-Now/duration-chip/title/chip-pair/desc anatomy + the DATA texts + img src as-is), the three normalizers (stop-triples + real-layers + the WH-42 alpha-black form, on both the overlay AND the duration chip), born-verified **790/790 ×3 + the final-state flight** — the net's NEW widest surface; its decode caught the round's REAL data drift (the reference re-ordered its twelve tutorials — the WH-42 lesson-41 class's second instance, cured TDD-style: the seed-parity tutorial grid-order contract) + the search-input TYPE split (ours type="search" vs the reference's type="text" — the Chromium clear-button superset, cured at both sites + pinned by the WH-43 search-input census). LESSON 47 rode the decode itself: a decoder's selector vocabulary must match the reference's DOM vocabulary (our aria-label supersets, the reference's DIV chips, the CSS blockification of inline-flex flex items — anchor STRUCTURALLY, never by attribute presence or computed display), and the decode's DEBUG flights spend the same login budget as the battery (batch them, pace ≥10 min apart). **Round 33 (WH-44, 2026-11-02): a genuine js MOVED — the EIGHTEENTH distinct bundle** (`index-DrgN_FlZ.js` → `index-BgVoVawV.js`; the CSS content hash STABLE at `index-CapATpwD.css` for the SECOND consecutive round — the first two-round css stability since round 20) — the single-axis move class; the same-run digest **15/15 MATCH on the new bundle**, and the standing battery's sixth full-width run — all NINE legs inside ONE login window (nine reference logins, no limiter trips), **2,312 computed members live-vs-live** — verified the rendered face byte-held. The ledger re-based on the js axis — and the re-base's own born-verification fired the NINETEENTH bundle (`index-BgVoVawV.js` → `index-BA3Eznmu.js`, the intra-round class, the SIXTH consecutive round), re-based ONCE to the round's final read, born-verified on the quiet state (`assets stable` + 15/15). **The parity net's TENTH SURFACE (WH-44): `scripts/parity-profile.mjs`** — the Profile appearance family (the tablist + the five section cards + the Theme Mode grid + the Colors/presets family + the picker/color/hex inputs + the preview tile + the Typography/Background Image/Visual Style families + the Save bar): ONE login per app, ZERO-WRITE (the Appearance tab click is view state only), **433 members** (the net's second-widest), the structural card-chrome anchor (the reference's section titles are DIVs — lesson 48: the section vocabulary is app-specific, anchor by the 12px-radius panel, read titles as DATA), and the net's first **PINNED-DEVIATION member class** (the two WH-17 ledgered supersets — the inactive-tab a11y ink + the active-preset ring/label/row-stretch — asserted at BOTH apps' own documented values; a pin failing is a DRIFT, never a silent re-base). Its decode caught the round's REAL data drift — **the reference RE-AUTHORED its preset catalog** (7 of 8 pairs moved to monochromatic steps; cured TDD-style: the wellness-domain preset-catalog parity contract + COLOR_PRESETS re-authored + the preset-contrast table + the PAD row recomputed) — plus four computed-face cures (the mode-card neutral-950 ink, the preset-label block arm, the color inputs' stock form, the icon-less Save button). LESSON 48: the section vocabulary itself is app-specific (DIV titles vs our H2 semantic superset) AND a prior round's prose shorthand ("the stock form") is not a contract — decode the FULL computed anatomy of every element a conversion touches. Run all TEN parity scripts alongside the watch each round (the dev server must be up; TEN reference logins total per round counting the watch's — split the battery across two login windows, and restart the dev server between the battery and any decode phase, the lesson-46 doctrine). **Round 34 (WH-45, 2026-11-02): FULLY QUIET — the first round since 20 with BOTH axes stable** (css `index-CapATpwD.css` + js `index-BA3Eznmu.js`, the round-33 final read, unchanged) and the same-run digest **15/15 MATCH** — the SECOND consecutive fully-quiet read on the same asset state (the round-33 born-verification was the first): **the COOLING NOTE** — the reference's active-development cadence has cooled (rounds 28-33 each moved at least one axis); the watch stays every-round regardless (a quiet round is a reading, never a retirement — the CDN layer carries no bundle hash to watch). **The standing battery's seventh full-width run — all TEN legs green, paced across two login windows** (the mandatory amendment; five reference logins per window, no limiter trips on either side): login 34/34 + moodForm 20/20 + shell 61/61 (the drawer battery, the instruction's mobile-menu emphasis) + dashboard 105/105 + headers 192/192 + toolbars 98/98 + kpis 315/315 + routines 697/697 + tutorials 790/790 + profile 433/433 (the tenth surface's first battery ride) — **2,745 computed members live-vs-live, zero manual evals**. **The parity net's ELEVENTH SURFACE (WH-45): `scripts/parity-account.mjs`** — the Profile's Account + Preferences tab interiors (the two tabs the tenth surface left unread; the WH-44 plan's (c) candidates, decode-settled live first per the doctrine): ONE login per app, both tabs read in the same flight (the tab clicks are view state only), ZERO-WRITE, **146 members** (the Account Information card's chrome/header pads/title face/20px icon + the three disabled inputs' FULL 14-member computed anatomy — the gray-50 wash, the 6px radius, the 14px font, the 4/12 padding, the line border, the not-allowed cursor, the opacity-0.5 disabled arm — + the three labels' faces + the group y-ladder 280/364/448 + the Preferences card + the two checkbox rows' full anatomy — 912×78, flex items-center justify-between, p-4, rounded-lg 8px, the line border, transparent bg — + the title/subtitle faces + the native 20×20 checkboxes), the 12px-radius card-chrome anchor (lesson 48), the shadow real-layers normalization (lesson 40), the SESSION CARD as PINNED-DEVIATION members (the PAD §11 WH-25 ledgered logout superset — the reference's Account tab carries exactly ONE card; ours renders the Session card, and if the reference ever GAINS a logout surface the count pin fires same-round), and the DOM-shape facts (the section titles DIV/H2, the Preferences row texts P/SPAN, the reference's unwired labels vs our htmlFor a11y superset). **Born-verified 146/146 ×3 consecutive flights — BORN-QUIET**, the net's second surface to land with zero real drift (the kpis precedent: the WH-24/25 probes pinned these families' source forms and the decode confirmed the rendered faces byte-held). Run all ELEVEN parity scripts alongside the watch each round (the dev server must be up; ELEVEN reference logins total per round counting the watch's — split the battery across two login windows, and restart the dev server between the battery and any decode phase, the lesson-46 doctrine). **Round 35 (WH-46, 2026-11-02): a genuine js MOVED — the TWENTIETH distinct bundle** (`/static/index-BA3Eznmu.js` → `/static/index-l0vUUttr.js`; the CSS content hash STABLE at `index-CapATpwD.css` for the THIRD consecutive round) — the single-axis move class; the cooling note's js-axis streak RESETS (round 34 was the second consecutive fully-quiet read; the watch stays every-round regardless — a quiet round is a reading, never a retirement). The same-run digest read **15/15 MATCH on the new bundle**, and **the standing battery's eighth full-width run — all ELEVEN legs green, paced across two login windows** (no limiter trips on either side): login 34/34 + moodForm 20/20 + shell 61/61 (the drawer battery, the instruction's mobile-menu emphasis) + dashboard 105/105 + headers 192/192 + toolbars 98/98 + kpis 315/315 + routines 697/697 + tutorials 790/790 + profile 433/433 + account 146/146 (the eleventh surface's first battery ride) — **2,891 computed members live-vs-live, zero manual evals** — verified the rendered face byte-held through the move. The ledger re-based on the js axis, born-verified on the quiet state (`assets stable` + 15/15, twice). **The parity net's TWELFTH SURFACE (WH-46): `scripts/parity-authviews.mjs`** — the login family's FORGOT + SENT + SIGNUP views (three of the four non-signin views; the login view rode parity-login since WH-36; the verify view stays data-blocked — the reference's OTP delivery is email-only, the PAD §11 standing block): **ZERO-LOGIN on both sides** (logged-out views — no login budget) and **ZERO-WRITE on the reference** (the view swaps are client state; the reference's own "Send reset link" renders the sent view purely from client state — no network fires); our side: ONE no-enumeration forgot POST per flight with a nonexistent probe email (zero account impact). **192 members** (187 MATCH + 5 PINNED — the inherited-ink token split: ref zinc-950 rgb(9,9,11) vs our neutral-950 rgb(10,10,10) at the inputs + the callout's box arm, the at-rest no-render class, the parity-profile pinned-deviation precedent), the canvas-composite + is-round normalizations (both the parity-login precedents verbatim) + the input padding box-model split documented (ref pt 8px vs ours 0px — the rendered 44px boxes byte-identical, the lesson-43 GEOMETRY form). Born-verified **192/192 ×3 consecutive flights — BORN-QUIET** (the third surface to land with zero real drift). Run all TWELVE parity scripts alongside the watch each round (the dev server must be up; the reference-login count is UNCHANGED at eleven per round counting the watch's — parity-authviews spends ZERO reference logins — split the battery across two login windows, and restart the dev server between the battery and any decode phase, the lesson-46 doctrine). **Round 36 (WH-47, 2026-11-02): a genuine js MOVED — the TWENTY-FIRST distinct bundle** (`/static/index-l0vUUttr.js` → `/static/index-OLDXOew4.js`; the CSS content hash STABLE at `index-CapATpwD.css` for the FOURTH consecutive round) — the single-axis move class again. The same-run digest read **15/15 MATCH on the new bundle**, and **the standing battery's ninth full-width run — all TWELVE legs green** (our dev server's own login limiter tripped mid-window — the WH-42 F-4 class's second instance: the decode's DEBUG flights spend the same budget as the battery; the dev server restarted per the lesson-46 doctrine, the three pending legs re-run paced): login 34/34 + moodForm 20/20 (one transient first-flight timeout, lesson 45) + shell 61/61 (the drawer battery, the instruction's mobile-menu emphasis) + dashboard 105/105 + headers 192/192 + toolbars **114/114** (the WH-47-widened card-wrapper members riding the F-1 cure) + kpis 315/315 + routines 697/697 + tutorials 790/790 + profile 433/433 + account 146/146 + authviews 192/192 — **3,387 computed members live-vs-live, zero manual evals** — verified the rendered face byte-held through the move. The ledger re-based on the js axis, born-verified on the quiet state (`assets stable` + 15/15). **The round's core — the module toolbars' CARD WRAPPER (the WH-47 F-1 cure, TDD)**: the reference wraps BOTH consumer toolbars (StudyResources + Learning) in the card chrome (`rounded-xl border bg-card text-card-foreground border-none shadow-lg` + `p-6` — the card computes h=84 = the 36px flex row + 2×24px padding, radius 12px, white bg, shadow-lg); ours shipped the bare flex row through EIGHT green full-width battery runs (the interior-anchored member set never read the wrapper — the lesson-48 blind-spot class: a surface's WRAPPER is part of its computed anatomy). The decode caught it through the sr-page y-ladder (the reference's special empty card sits 48px lower, y=252 vs 204 — the whole page ladder below the toolbar shifts). Cured TDD-style: the WH-24 module-toolbar census widened RED-first (the TOOLBAR record gains a `card` member at the SECTION_CARD chrome family + p-6; both consumer pages must wrap TOOLBAR.container in TOOLBAR.card) → the record + the two pages GREEN; **parity-toolbars widened with 16 wrapper members** (the card chrome radius/bg/border/borderColor + the real-layers shadow + h=84 + the rendered row offsets 24/24 — the padding as GEOMETRY, the lesson-43 form; the card anchor CLIMBS to the chrome because the reference nests the row inside a p-6 content div at a different DOM depth than ours — the lesson-47/48 vocabulary class), born-verified 114/114 ×2 on the cured tree. **The parity net's THIRTEENTH SURFACE (WH-47): `scripts/parity-listinteriors.mjs`** — the list interiors + empty states at the demo state (the WH-46 plan's (c) candidates, decode-settled live first): ONE login per app, FOUR routes, ZERO-WRITE, **88 members** (87 MATCH + 1 PINNED — the transition-colors compiled-vocabulary split: the reference's CDN six-prop list vs our v4 ten-prop expansion, both apps authoring the same class, the at-rest no-render class, the parity-authviews inherited-ink precedent) — the dashboard's Recent Activity feed interior (the card chrome + the row's flex/flex-start/gap-12/p-12/radius-8 anatomy + the 💚 glyph 24px/32px + the title/detail/date faces + the y-ladder) + the exercise zero-row empty (the icon-less "Recent Workouts" header + the empty paragraph at the byte-identical y=344/w=912/h=120) + the sr special empty card (the p-6-py-20 body + the 64px gray-300 BookOpen + the 18px hint + the y-ladder 252/332/412 — the F-1 cure's verification members) + the goals Achievements empty state; the card anchor matches `div, section` (our SectionCards are `<section>` elements — the semantic superset). Born-verified **88/88 ×3 consecutive flights**. Run all FOURTEEN parity scripts alongside the watch each round (the dev server must be up; the reference-login count is now THIRTEEN per round counting the watch's — parity-moodjourney spends one — split the battery across two login windows, and pace the decode's DEBUG flights against BOTH limiters: our dev server runs the same per-process limiter and the WH-47 round tripped it mid-battery, the WH-42 F-4 class's second instance — restart it between the battery and any decode phase, the lesson-46 doctrine; the WH-48 round tripped it MID-DECODE, the class's third instance — the decode's probe flights spend the same budget as battery flights: pace them the same way). **Round 37 (WH-48, 2026-11-02): FULLY QUIET — both axes stable** (css `index-CapATpwD.css` + js `index-OLDXOew4.js`, the round-36 final read, unchanged — the first fully-quiet read since round 36's move); the same-run digest **15/15 MATCH**; NO ledger re-base (nothing moved — the watch stays every-round regardless, a quiet round is a reading, never a retirement). The standing battery's tenth full-width ran SPLIT across the reference login windows (the decode's probe flights spent the same budget — OUR dev server's own limiter tripped MID-DECODE, the WH-42 F-4 class's THIRD instance: the dev server restarted + the pending flights re-run paced, the lesson-46 doctrine): login 34/34 (the zero-login leg) + moodForm 20/20 + shell 61/61 (the drawer battery, the instruction's mobile-menu emphasis) + dashboard 105/105 + headers 192/192 + toolbars 114/114 + kpis 315/315 + routines 697/697 + tutorials 790/790 + profile 433/433 + account 146/146 + authviews 192/192 + listinteriors 88/88 + the fourteenth surface moodjourney 116/116 — **3,303 computed members live-vs-live, zero manual evals**. The round's core (the WH-48 Δ4 stack): the MH page's "Current Streak" tile's `days` sub-line rode `STAT_CARD.sub` (text-sm, 14px/20px) where the reference's rides `text-xs` (12px/16px) — its OWN two-site split (its dashboard/goals subs stay text-sm, the subs-scope probe settled it), a 4px KPI-row drift lowering the whole journey ladder; AND the journey tile's delete button rode `h-8` (32px) over the reference's 28px `text-lg` labelRow line box — the superset-GEOMETRY class (a functional superset's GEOMETRY is part of the rendered face it lives in); both decoded live, cured TDD-style (the WH-24 MODULE_KPI census widened RED 3 failures → GREEN, the count ladder FLAT at 375), and verified live (the journey ladder byte-identical on both apps: card y=296 h=206, tile y=360 h=118, row y=385 h=68, labelRow h=28). The capture round: the NINETEENTH cross-round byte comparison 29/34 byte-stable — FIVE movers ALL root-caused (05-mentalhealth + 34-mood-list-interior = the cures' deliberate faces, the changed band starting exactly at row 136 [the KPI grid's y]; 27-dark-mood-form + 32-mentalhealth-form-interior = the sub-visible rasterization signature at maxdelta 1, the standing 29-quick-actions-hover family; 25-dark-login-focus = the standing focus-phase signature, the sixth consecutive round); the ledger re-based, verified 0 mismatches, census MATCH after. The full gate green on the final tree (lint 0/0 · tsc 0 · 375/375 · build OK · smoke 14/14 · e2e 72/72 with the mobile-nav battery 8/8 explicit · bun audit zero). **The parity net's FOURTEENTH SURFACE (WH-48): `scripts/parity-moodjourney.mjs`** — the mood list "Your Journey" tile interior + the MH KPI row's days-sub ladder + the dashboard's Upcoming Reminders/Events card interiors (the WH-47 plan's (c) candidates, decode-settled live first): ONE login per app, TWO routes (/mentalhealth + /dashboard), ZERO-WRITE, **116 members**, the delete button as a PINNED-DEVIATION member (ours present at the 28px line box, the reference's absent — the parity-account Session-card precedent), gradients by their rgb STOP TRIPLES (the parity-moodform convention), born-verified **116/116 ×3** on the cured tree. The round's core (the WH-48 Δ4 stack, decoded live then cured TDD-style): the MH page's "Current Streak" tile's `days` sub-line rode `STAT_CARD.sub` (text-sm, 14px/20px) where the reference's rides `text-xs` (12px/16px) — its OWN two-site split (its dashboard/goals subs stay text-sm), the cure SCOPED to the MH site; and the journey tile's delete button rode `h-8` (32px) over the reference's 28px `text-lg` labelRow line box — the superset-GEOMETRY class (a functional superset's GEOMETRY is part of the rendered face it lives in), the cure `h-8` → `h-7` (28px, WCAG 2.5.8-compliant); both pinned by the WH-24 MODULE_KPI census widening (RED 3 failures → GREEN; the count ladder FLAT at 375, the widening rides the existing it() block, the WH-47 precedent). **The parity net's SECOND SURFACE (WH-36): `scripts/parity-login.mjs`** — the login family, the app's root face: PASS A the reference's /login, PASS B ours, the 34-member live-vs-live diff — **ZERO logins on either side** (the logged-out face; no rate-limit budget), ZERO interactions (no clicks at all). The three serialization classes a naive string diff would false-DRIFT on are normalized in the script: alpha colors via the 1×1-canvas composite, gradients via their rgb stop triples, `rounded-full`'s `calc(infinity)` vs the CDN's 9999px via the is-round check (lesson 40: compare RENDERED FACTS, not serialized strings). Run it alongside the watch each round too. The WH-15 washes carry `dark:` neutral variants (our superset over the reference's partially-broken dark).
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
