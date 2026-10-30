---
name: wellness-hub
description: "Complete engineering skill for the Wellness Hub codebase: Next.js 16 App Router + React 19 + TypeScript strict + Tailwind CSS 4 (CSS-first @theme) + Radix/shadcn primitives + one Zustand store + Prisma 6/SQLite at the repo root + Zod-4-validated API + scrypt/HMAC cookie auth + a three-tier test suite and a single-command quality gate. Distilled from the WH-1 domain replacement (the NEO CRM chassis became the EvolveWell wellness clone), the WH-2 audit round, the WH-3 dead-dep census round, the WH-4 dead-surface retirement round, the WH-5 doc-lockstep pin round, the WH-6 src-surface census round, the WH-7 exported-value census round, the WH-8 member/export census round (the advisory-zero overrides), the WH-9 component-prop/member census round (the variant-API retirement), the WH-10 docs-counts pin-gap round (the §8.1 row-arithmetic pin), the WH-11 type-export census round (the exported-type liveness pin) and the WH-12 pass-site census round (the JSX pass-site prop-liveness pin). Every rule traces to a verified fact on the 2026-10-30 tree."
version: 1.10.0
last_updated: 2026-10-30
provenance: "Supersedes neo-crm_SKILL.md (the chassis-era distillate, kept at the repo root as provenance for the inherited engineering). Distilled per skills/to-distill-project-into-skill + skills/distill-codebase-skill at the WH-2 ship state (commit 5c3de25 + the WH-2 remediation, gate green at lint 0/0 · tsc 0 · 314/314 unit [16 suites] · build OK · smoke 14/14 · e2e 42/42). Re-validated at WH-3 (2026-10-29): the dead-dep census round — six zero-import packages (jspdf, recharts, html2canvas-pro, fast-check, axe-core, tw-animate-css) + the orphaned dompurify override + the dead chart CSS retired with the TDD pin `tests/dead-deps.test.ts`; gate green at lint 0/0 · tsc 0 · 316/316 unit (17 suites) · build OK · smoke 14/14 · e2e 42/42. Re-validated at WH-4 (2026-10-29): the dead-surface retirement round — the dead users/uploads route family + the CRM-era avatar chain (avatarColor/photoUrl, never rendered) + seven dead ui modules + four orphaned packages retired with the TDD pin `tests/route-census.test.ts`; the signup CRM-role bug fixed (`role: \"user\"`, `tests/signup-role.test.ts`); the NEO_* env knobs/cookie/namespace renamed to WELLNESS_* / wellness_session; gate green at lint 0/0 · tsc 0 · 319/319 unit (19 suites) · build OK · smoke 14/14 · e2e 42/42. Re-validated at WH-5 (2026-10-29): the doc-lockstep pin round — the fresh-clone gate run green end-to-end on a clean machine (install → push → seed → census → tsc → unit → build → smoke 14/14 → e2e 42/42 → dev boot), the live reference re-probed (zero new surfaces; mobile-nav parity re-verified on both apps; both headers compute blur(24px)), four doc-drift cures (the 14-models count → 15, PAD §5.3's dead primitives list, SKILL §17's header-blur attribution, the z-40/z-[60] z-map), and the docs-counts lockstep pin landed (`tests/docs-counts.test.ts`) making the five docs' live-tense count claims a tested contract; gate green at lint 0/0 · tsc 0 · 328/328 unit (20 suites) · build OK · smoke 14/14 · e2e 42/42. Re-validated at WH-6 (2026-10-29): the src-surface census round — the fresh-clone baseline gate re-verified green (328/328, 20 suites; the sandbox's Playwright browser binary reinstalled, the repo untouched), the live reference re-probed (ZERO new surfaces on all 10 pages + Profile; the account tab still read-only; the mobile drawer battery re-verified live on BOTH apps; both headers compute blur(24px) at z-10), the first genuine code findings since WH-4 cured TDD-first (the ten-export dead coercion cluster in api.ts narrated by a nonexistent test file, four duplicated unreachable `return ok(row);` statements in the reminders/assignments/events/study-resources POST handlers, eight stale tests/*.test.ts citations across src/scripts comments + the wrong sitemap/robots paths in site.ts) with the TDD pin `tests/src-census.test.ts` (cited-test-path existence · the api.ts export surface · zero duplicated adjacent returns); gate green at lint 0/0 · tsc 0 · 331/331 unit (21 suites) · build OK · smoke 14/14 · e2e 42/42. Re-validated at WH-7 (2026-10-29): the exported-value census round — the baseline gate re-verified green (331/331, 21 suites), the live reference re-probed (ZERO new surfaces on all 10 pages + Profile; the account tab still read-only; the mobile drawer battery re-verified live on BOTH apps; both headers compute blur(24px) at z-10), the format.ts CRM-era subgraph (money/relative-time/calendar/date-primitive families, 18 exported functions pinned only by tests narrating CRM surfaces) + fifteen dead exported values across page-layout/constants/page-parts + the dead @utility input-base retired TDD-first behind the extended src-census pin (the module export liveness census · the CSS-utility liveness census), with the live formatters gaining their first pins in the same commit; gate green at lint 0/0 · tsc 0 · 309/309 unit (21 suites) · build OK · smoke 14/14 · e2e 42/42. Re-validated at WH-8 (2026-10-30): the member/export census round — the workspace re-cloned fresh (the interrupted first WH-8 session's uncommitted work lost to a sandbox reset; the round re-derived from a fresh audit), the live reference re-probed (ZERO new surfaces on all 10 pages + Profile; the account tab still read-only; the reference's drawer stays-open quirk re-verified at 390×844), the store's six dead members (the write-only user + prefs slices, the zero-call-site refreshUser/fetchPrefs/updateWorkout/updateMoodEntry) + seven dead ui-module exports (DialogPortal/DialogClose/DialogFooterWide/Textarea/SelectGroup/SelectLabel/SelectSeparator + the orphaned DIALOG_FOOTER_WIDE/DIALOG_TEXTAREA) + four same-module data feeds (SESSION_TTL_MS/DEFAULT_DATABASE_URL/proxyHopDepth/applyTheme, un-exported) retired TDD-first behind the store-member + ui-export + value-census extensions, the CRM-era comment narrations cured at the wellness truth, and `bun audit` taken to ZERO via the four overrides (vite 8.3.5, deepmerge-ts 8.0.2, source-map-js 1.2.2, zod 4.6.7 — all registry-latest) with the lockfile-resolution pin carrying the posture inside the offline gate; gate green at lint 0/0 · tsc 0 · 312/312 unit (21 suites) · build OK · smoke 14/14 · e2e 42/42. Re-validated at WH-9 (2026-10-30): the component-prop/member census round — the baseline gate caught a load-sensitive goals-e2e race (the unasserted back-to-back progress clicks; a click dispatched on the detaching node is silently lost) cured with a step assertion, the live reference re-probed (ZERO new surfaces; the drawer battery green; the reference's Appearance tab carries NO reset button — the retirement's parity evidence), and the F-7-deferred variant-API surgery landed: tabs' `underline`/`pill` variants + `count` + the no-cols fallback (dragging TABS_PILL), SectionCard.bodyClassName, EmptyState.title (dragging EMPTY_STATE.title), OptionChip.className, SidebarNav/SidebarFooter's onNavigate + the phantom-sharing comment (the drawer has carried its own sheet-styled nav since the build), and the theme store's dead `reset` member — all behind the component-prop census + the theme-store member census; gate green at lint 0/0 · tsc 0 · 314/314 unit (21 suites) · build OK · smoke 14/14 · e2e 42/42. Re-validated at WH-10 (2026-10-30): the docs-counts pin-gap round — the baseline gate re-verified green (314/314, 21 suites; no flake — the WH-9 step-assertion cure holds), the live reference re-probed (ZERO new surfaces; the drawer battery green; the reference's own console warnings documented), and two pin blind spots cured TDD-first: the §8.1 infra row had drifted 22 checks stale (WH-7's retirement decremented the pinned total but nobody recomputed the row; three later rounds hand-incremented the wrong base) behind the new row-arithmetic check (the unit rows' files/checks and the e2e rows' checks must sum to the canonical totals), and the hyphenated fourteen-models phrasing had lived in PAD §3.2/§12 through the WH-5 cure and the forbidden-forms list behind the new drift-phrase forbidden form (pinned at the phrase, not the bare prefix — the flat substring scan cannot distinguish the SKILL's own legitimate history narration); gate green at lint 0/0 · tsc 0 · 315/315 unit (21 suites) · build OK · smoke 14/14 · e2e 42/42. Re-validated at WH-11 (2026-10-30): the type-export census round — the baseline gate re-verified green (315/315, 21 suites), the live reference re-probed (ZERO new surfaces; the drawer battery green; the Profile tabs and 404 unchanged), both standing clean classes verified clean (model-consumption 15/15 alive, env-contract exact parity), and the type-declaration surface censused for the first time: the dead UserPrefs domain interface (the orphan of WH-8's store-slice retirement) retired, twenty same-module-only exported types un-exported (the WH-8 data-feed doctrine's type form — the declarations stay, module-private), the WH-6 api-export canonical set redistributed 12→9 in the same commit, and the whole-tree exported-type liveness census landed as the pin (no fixed module list — a new module exporting types is covered at birth); gate green at lint 0/0 · tsc 0 · 316/316 unit (21 suites) · build OK · smoke 14/14 · e2e 42/42. Re-validated at WH-12 (2026-10-30): the pass-site census round — the baseline gate re-verified green (316/316, 21 suites), the live reference re-probed (ZERO new surfaces; the drawer battery green; the seed-content watch verified byte-for-byte — 11 template names + 12 tutorial titles), and the JSX PASS-SITE surface censused for the first time: GradientButton's never-passed className (pinned as live by the WH-9 surface pin for three rounds — a surface pin is not a liveness pin) and Checkbox's four invented arms (className/defaultChecked/label/id — the uncontrolled machinery + the label-render arm + CHECKBOX.row/label retired with them) cured behind the whole-tree pass-site census (children · byte-stock shadcn wrapper signatures · Next.js convention files the pinned exemptions); gate green at lint 0/0 · tsc 0 · 317/317 unit (21 suites) · build OK · smoke 14/14 · e2e 42/42."
---

# Wellness Hub — Complete Engineering Skill

> **How to use this document:** the single-source engineering reference for extending, debugging, auditing, or replicating THIS codebase. §1–§20 are the contracts; every version, hex, count, and file path was verified against the tree at distillation. **When code and this document disagree, the code wins — then fix this document in the same commit.**
>
> **Companion documents (all five stay in lockstep):** `README.md` (user-facing), `AGENTS.md` (operator quick-reference), `CLAUDE.md` (agent workflow contract), `Project_Architecture_Document.md` (the blueprint + 8 ADRs), and this SKILL.md. Stale docs are bugs.
>
> **Excluded from all checking/testing/compilation:** the `skills/` folder (the operator's catalog, ESLint-ignored — never lint, typecheck, or "fix" it).

---

## §1 Project Identity & Design Philosophy

**One sentence:** Wellness Hub is a production-grade, self-hostable clone of the student-wellness reference app EvolveWell (`https://evolve-well-d6cec85d.base44.app/`) — 11 modules (dashboard, routine templates, exercise, mood journal, assignments, events, study resources, reminders, learning, goals/achievements, profile) with a deliberate functional superset.

**Design thesis:** *parity-first, computed-style-probed*. The reference's visuals are the contract — every color, shadow, blur, and font was live-probed via computed styles and DOM reads (never eyeballed), then pinned in `@theme` with the probe evidence in comments. The look: light neutral surfaces (`#f9fafb` wash), the indigo→purple brand pair (`#6366f1`/`#a855f7`, 135deg text gradients, to-r button gradients), the near-white sidebar (`rgb(250 250 250)` with `rounded-xl` menu buttons), pastel stat tiles with saturated chips, and the glassy `md:hidden` mobile header + Radix Sheet drawer with the solid gradient active pill.

**Non-negotiable rules:**
- **Parity before superset.** Match the reference exactly; add functionality (auth ladder, theming, achievements, export, SEO) only where the reference lacks it.
- **The login wall is the root face.** Logged-out `/` → `/login` (the reference serves its auth screen at the root); no marketing layer.
- **Anti-generic within parity:** the brand pair comes only from tokens; no hardcoded hexes in components (the pastel tiles carry authored inline tints decoded from the reference — those ARE the parity data, not drift).
- **Degrade, never fail.** Optional integrations (Google OAuth without credentials, placeholder video URLs) answer honest "not configured" toasts and new-tab opens, never 500s.

**Verification:** an agent reading §1 alone must refuse to add a marketing landing page, a second nav genus, or an unpinned color — that is the test.

## §2 Tech Stack & Environment

| Layer | Technology | Version | Critical note |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.4.2 | `output: "standalone"`; the build IS the type gate (`ignoreBuildErrors` unset) |
| UI runtime | React | 19.3.1 | No `forwardRef`; `"use client"` only at interactive leaves (26 of 45 .tsx files) |
| Language | TypeScript | 5.9.3 | Full strict; never loosen — `tsc --noEmit` + the build both gate |
| Styling | Tailwind CSS | 4.3.3 | CSS-first: NO `tailwind.config.js`; tokens in `@theme` in `src/app/globals.css`; the v4 bug pins live in the same file |
| PostCSS | @tailwindcss/postcss | ^4 | The only plugin; missing it = unstyled pages |
| Primitives | Radix UI (shadcn genus) | dialog 1.3.1 / label 2.1.17 / select 2.4.1 | `src/components/ui/*` — the SIX live modules (dialog, input, label, select, tabs, toast; input/tabs/toast hand-rolled) — the ui-module census pin locks the set |
| State | Zustand | 5.0.15 | ONE store (`wellness-store`) + the theme-store writer |
| ORM / DB | Prisma / SQLite | 6.19.3 | `DATABASE_URL="file:../db/custom.db"` — RELATIVE, resolved against `prisma/schema.prisma` by `src/lib/db-path.ts` (pinned by `tests/db-path.test.ts`); `db/` at the repo root, git-ignored |
| Validation | Zod | 4.6.7 | Every API body boundary via `parseBody()`; enums from `src/lib/constants.ts` |
| Charts | — | — | The app renders NO charts — the reference's dashboard carries stat tiles + lists only (live-probed at WH-1 and WH-3); recharts shipped three rounds as a zero-import CRM residue and was retired at WH-3 |
| Icons | lucide-react | 0.525.0 | The reference's own bundle-decoded version — a PARITY pin; nav icons h-5 w-5 stroke-2, content h-4 w-4 |
| Unit tests | Vitest | 5.0.5 | Node env; `*.test.ts` only; `@` alias; 317 checks / 21 suites (incl. the dead-dep + lockfile-resolution + route/ui-module + docs-counts + src-surface + store-member + ui-export + component-prop + theme-member + type-export + pass-site pins) |
| E2E | @playwright/test | 1.64.1 | Production standalone server, isolated port, PINNED `db/e2e.db`; 42 checks (5 specs + the auth setup project) |
| Runtime | Bun | 1.3.14 | All scripts run from the repo root |

**Dependency discipline:** every dep carries a live import (`bun pm ls` + rg to verify); dead deps get retired — `tests/dead-deps.test.ts` ENFORCES it (every package.json entry needs a quoted reference in the scanned roots or a TOOLCHAIN-whitelist reason). WH-3 history: the `overrides.dompurify = "3.4.17"` pin (the WH-1-era cure for jspdf's transitive chain) was retired WITH jspdf — the package was never imported by the wellness tree, so removing it removed the advisory chain entirely; the census pin now guards the whole dep tree.

## §3 Bootstrapping & Configuration

```bash
git clone https://github.com/nordeim/wellness-hub.git
cd wellness-hub
bun install
cp .env.example .env        # then: AUTH_SECRET=$(openssl rand -hex 32)
bun run db:push             # schema → db/custom.db (--accept-data-loss pinned in the script)
bun run db:seed             # idempotent: 11 templates / 50 steps / 12 tutorials / 8 badges + demo user
bun run dev                 # http://localhost:3000 — demo: sepnetflix2023@outlook.com / $Abcd1234
```

**Config files that carry non-obvious weight:** `next.config.ts` (standalone output), `tsconfig.json` (full strict + the `@/` alias), `eslint.config.mjs` (ignores `skills/` + build dirs — do not un-ignore), `vitest.config.ts` (matches `src/**/*.test.ts` + `tests/**/*.test.ts` — e2e `*.spec.ts` files ride Playwright, never Vitest), `playwright.config.ts` (the isolated-port + PINNED e2e db + storageState doctrine), `postcss.config.mjs`.

**The environment contract (exactly six vars — add only with an ADR):**

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | `file:../db/custom.db` — relative, resolved against `prisma/schema.prisma` (never CWD; the standalone server runs from `.next/standalone/`) |
| `AUTH_SECRET` | **prod: hard** | HMAC session key ≥16 chars; missing/short in production = the boot REFUSES to serve (`src/instrumentation.ts` → `src/lib/boot-env.ts`); dev falls back with a warning |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical origin for metadataBase/OG/sitemap/robots/manifest — INLINED AT BUILD TIME |
| `WELLNESS_PROXY_HOPS` | prod-behind-proxy | Trusted proxy depth for rate-limit IP keying (unset=1, 0=direct, unparsable fails CLOSED) |
| `WELLNESS_DISABLE_IN_APP_OTP` | prod | `1` = hide the signup OTP from responses when a real mail transport owns delivery |
| `WELLNESS_DISABLE_IN_APP_RESET` | prod | `1` = hide the reset link from responses |

`.env` is untracked; `.env.example` mirrors the contract key-for-key (verified bidirectional). The identifiers carry the app's own `WELLNESS_*` namespace — renamed from the chassis-era `NEO_*` at WH-4 (the earlier keep-the-name decision reversed: the family had zero user-visible gain as `NEO_*` and every doc/test/deployment site changed once, cleanly; live sessions died once at the cookie rename, by design; the boot-env flag-typo guard + fail-closed defaults kept every seam safe through the rename).

## §4 The Design System (Code-First)

The full contract lives in `@theme` in `src/app/globals.css` (verified hex-for-hex at distillation):

**Brand:** `--color-primary: #6366f1` · `--color-secondary: #a855f7` · hovers `#4f46e5` / `#9333ea` · `--color-primary-foreground: #fafafa`. The gradient family: `linear-gradient(to right, #6366f1, #a855f7)` on primary buttons; 135deg as clipped text on headings and the sidebar wordmark.

**Sidebar family (live-probed):** `--color-sidebar: #fafafa` · hover `#f4f4f5` · active `#eef2ff` · foreground `#3f3f46` · accent-foreground `#4f46e5`; `rounded-xl` (12px) menu buttons. Dark: `#111113` sidebar / `#1c1c1f` hover (`.dark` overrides).

**Surfaces/neutrals:** `--color-background: #f9fafb` (the main wash) · `--color-surface: #ffffff` · `--color-foreground: #0a0a0a` · `--color-muted: #6b7280` · `--color-subtle: #9ca3af` · lines `#e5e5e5` / `#e5e7eb` / `#f5f5f5` · ring `#0a0a0a`.

**Feedback:** success `#10b981`/`#ecfdf5` · warning `#f59e0b`/`#fffbeb` · danger `#ef4444`/`#fef2f2` · info `#06b6d4`/`#ecfeff`.

**Typography:** `--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` — byte-extracted from the reference's preflight; the emoji fonts in the stack render the mood/resource glyphs on every OS. ZERO webfonts (the reference loads none on the app shell).

**Radius:** card `0.75rem` · button `0.5rem` · pill `9999px`. **Shadows:** `--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)` (the v4 re-pin — see §9). **Blur:** `--blur-sm: 4px` (the v4 re-pin).

**Keyframes (2):** `fade-in` (0.2s ease-out — Radix enter) and `slide-in-right` (0.25s cubic-bezier(0.32,0.72,0,1) — the mobile drawer). The VENDORED `src/app/vendor/tw-animate.css` (imported by globals.css) carries the rest of the Radix pairs — the `tw-animate-css` npm package itself was a zero-import residue retired at WH-3; add animation utilities to the vendored file, never the package.

**THE V3 PALETTE RE-PIN (session-88 family):** v4's default palette is NOT v3's in oklch — 56 of 118 literal classes diverged visibly. `@theme` re-pins EVERY literal (family, step) pair used in src/ to the v3 values (amber-50 `#fffbeb` … yellow-800 `#854d0e`, ~60 entries). Never delete this block; adding a new literal color class requires adding its v3 value here.

**Dark mode:** the `.dark` class overrides the semantic tokens in a dedicated block in the same file (e.g. `--color-background: #09090b`, `--color-surface: #18181b`, `--color-sidebar: #101014` — pinned by `tests/wellness-theme.test.ts`).

**Verification:** `rg "--color-" src/app/globals.css` against this list; `tests/wellness-theme.test.ts` pins the brand pair, the sidebar hexes, and the dark cascade.

## §5 Component Architecture & Patterns

**The layer model (the Golden Rule: data flows DOWN from the API through the store into components; events flow UP through store actions; nothing skips a layer):**

```
Layer 0  Content data      prisma/seed.ts + Badge/RoutineTemplate/Tutorial tables — DATA, never components
Layer 1  Pure seams        src/lib/wellness.ts (streaks/points/badges/status/codec), password.ts, format.ts — node-safe, Vitest-pinned, NO store/prisma imports
Layer 2  Server surface    src/app/api/* handlers + src/lib/{auth,api,badges-server}.ts — requireSession → parseBody(zod) → ownership → prisma → ok()/fail(); badges award HERE
Layer 3  Client stores     src/stores/{wellness-store,theme-store}.ts — the ONLY fetch path (call()); actions refresh affected slices
Layer 4  Components        src/components/{layout,shared,ui} + page shells — thin; plain data into Layer 1 helpers; dialogs remount forms via key
Layer 5  Routes            src/app/(app)/* dual-case pages + auth pages — aliases only re-export; NO logic
```

**Directory map:** `src/components/layout/` (7 files — app-shell, sidebar, mobile-nav, nav-config, login-card, guest-login-redirect, reset-password-screen) · `src/components/shared/` (the cross-module page-parts: stat cards, dialogs, calendar, star rating) · `src/components/ui/` (the six live primitives: dialog, input, label, select, tabs, toast — Radix rides dialog/select/label; the ui-module census pin in `tests/route-census.test.ts` locks the set; the seven CRM-era modules avatar/badge/button/card/dropdown/icons/table retired at WH-4). 45 .tsx files total; 26 are `"use client"` (the interactive leaves + shell).

**Client vs server decision:** RSC by default; `"use client"` only where interactivity demands it (dialogs, forms, the drawer, the theme boot). The `(app)` layout is a server component that reads the session and redirects; everything below it that mutates is a client island talking to the store.

**Auth pattern:** `requireSession()` (never raw cookie reads) inside every handler; `isGuarded(guard)` narrowing; the `(app)` layout as the page-level wall — handlers enforce independently (defense in depth).

## §6 Custom Hooks Deep Dive

This codebase has NO custom hooks directory — the reactive seams are the two Zustand stores, and that is the deliberate pattern:

- **`useWellnessStore`** (`src/stores/wellness-store.ts`, ~600 lines): ALL server state, one store, sliced by module. `hydrate()` is called ONCE by `AppShell` on mount; `call()` is the only sanctioned fetch path (adds `credentials: "include"`, unwraps the envelope, throws `EnvelopeError` on `!ok`, refreshes the affected slice after mutations). Why: an 11-module app with per-route fetches drifts on error handling within a week; one `call()` keeps the envelope greppable and the toasts uniform.
- **`useThemeStore`** (`src/stores/theme-store.ts`, ~200 lines): writes `--color-primary`/`--color-secondary` (plus derived hovers via the private `shade(hex, 0.88)` helper) directly on `<html>` — ONE write re-skins every gradient surface because all v4 utilities compile to `var(--color-*)`. Persists to localStorage (instant pre-hydration render) AND fire-and-forget PUTs `/api/prefs` (`fetch(...).catch(() => null)` — the local state never waits on the network). Toggles the `.dark` class.

**If you find yourself writing a `useX` hook:** first check whether the logic belongs in `src/lib/wellness.ts` (pure — preferred), the store (server state), or the component (trivially local). A new hook file needs a story for why none of those three fit.

## §7 Content Management & Data Ingestion

**Seeded content (the reference's own data, decoded live from its base44 entity APIs at build time — byte-exact):**
- **11 RoutineTemplates** (with **50 RoutineSteps**, cascade children): name, description, category (morning/exercise/study/evening/selfcare/creative/productivity), timeOfDay, display duration, difficulty (easy/moderate), `benefits` JSON array, tipsForProcrastinators, videoUrl, thumbnail.
- **12 Tutorials**: title, description, category, videoUrl, duration, difficulty (beginner/intermediate), views.
- **8 Badge definitions** (the catalog): key, name, description, emoji icon, tint color, points, sortOrder.

**Where:** `prisma/seed.ts` (~500 lines) — idempotent by design: content tables are wiped and reseeded every run; the demo user lands via UPSERT-BY-EMAIL so session cookies survive a reseed. Verified census: `bun run db:census` → `users=1 templates=11 steps=50 tutorials=12 badges=8` + the demo user's owned rows.

**How to add content:** add the object to the seed's array → run `bun run db:seed` → update the census expectations (`scripts/census.ts`) + the doc counts (README/AGENTS/CLAUDE/PAD/this SKILL) in the same commit. Adding a content row is a 3-step process; touching 5+ files means you broke a contract somewhere.

**JSON-columns rule:** Prisma SQLite has no list primitives — arrays (steps, benefits, tags, activities) are JSON string columns with the codec in `src/lib/wellness.ts` and zod schemas at the boundary. Never parse them ad hoc in components.

## §8 Accessibility (WCAG AA) Implementation

- **Contrast:** body `#0a0a0a` on `#f9fafb` ≈ 17:1; muted `#6b7280` on white ≈ 4.8:1 (AA); the brand pair `#6366f1` on white ≈ 4.6:1 (AA for the button-face usage; the gradient buttons carry white `#fafafa` foreground ≈ 4.5:1).
- **Focus:** the shadcn near-black ring (`--color-ring: #0a0a0a`); the universal base sets `outline-color` at 50% (the D-193a1 half-pin); focus-visible utilities on every interactive primitive.
- **Reduced motion:** the `@media (prefers-reduced-motion: reduce)` block collapses ALL animations/transitions to 0.01ms — plus the `animationLevel` pref (full/subtle/none) gates the app's own animation classes server- AND client-side.
- **Touch targets:** 44px minimum on mobile (the drawer trigger is h-10 w-10 + padding, the nav pills are full-height rows).
- **ARIA:** Radix primitives carry their own roles/states (dialog, listbox, tabs); the drawer is a Radix Sheet with `data-state` + focus-trap + escape + scroll-lock (e2e-pinned); toasts ride the aria-live region.
- **E2E teeth:** the mobile-nav battery pins keyboard operability (escape-close, focus restore) — if you touch the drawer, run `tests/e2e/mobile-navigation.spec.ts` explicitly. (axe-core shipped as a devDep from the chassis but was never imported — retired at WH-3 by the dead-dep census; the keyboard pins are Playwright-native, not axe-driven.)

## §9 Anti-Patterns & Common Bugs

**The five-member Tailwind v4 bug family (all pinned in `src/app/globals.css` — each was a REAL bug; removing a pin regresses parity):**

| # | Bug | Symptom | The pin |
|---|---|---|---|
| A-1 | v4 renamed the shadow scale (v3 shadow-sm → v4 shadow-xs) | Our `shadow-sm` compiled one step heavier than the reference's computed `0 1px 2px 0 rgb(0 0 0/.05)` | `--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)` (session-9) |
| A-2 | v4 renamed the blur scale (v3 blur-sm 4px → v4 blur-xs) | The login card's `backdrop-blur-sm` glass computed blur(8px) vs the reference's blur(4px) | `--blur-sm: 4px` (session-10) |
| A-3 | v4 re-derived the default palette (not v3-in-oklch) | 56 of 118 literal classes diverged visibly (blue-600, red-600, green-400, amber-400, purple-600, cyan-400…) | the ~60-entry v3 re-pin block (session-88) |
| A-4 | v4's default `hover:` compiles wrapped in `@media (hover)` | Hover styles never fired on real pointers in this component shape | `@custom-variant hover (&:hover);` (session-80 — the unwrap) |
| A-5 | `var()` chains inside `@theme` | v4 resolves the block once; chains broke token derivation | LITERAL hex values only inside `@theme` |

**The WH-1/WH-2 rebrand bug (HIGH — the one the audit caught):**
- **A-6 — the straggler brand.** The `/signup` page's metadata title still read `"Sign up | NEO CRM"` after the whole-domain rebrand — invisible to every count-based test, live on the SEO surface (curl-verified). Root cause: rebrand sweeps that only grep for the OLD brand in `title:` literals miss strings quoted in comments and absolutions; the signup title was "special" (an ABSOLUTE title carrying the brand inline). Fix: corrected + pinned by the `tests/wellness-theme.test.ts` WH-2 scan — the whole `src/app` route layer must be literally NEO-CRM-free, comments included. **Lesson: brand rebrands need a filesystem-scan pin, not per-file assertions.**

**Other fixed-once bugs (do not reintroduce):**
- **A-7 — CWD-relative db paths.** `process.env.DATABASE_URL` relative to CWD silently writes elsewhere when the standalone server runs from `.next/standalone/`. The contract: resolve against `prisma/schema.prisma` (`src/lib/db-path.ts`), pinned by `tests/db-path.test.ts`.
- **A-8 — per-test logins in e2e.** The auth endpoints are rate-limited per IP (login 10/15min); per-test logins trip the limiter mid-suite. The doctrine: the `setup` project signs in ONCE, every spec rides the storageState cookie.
- **A-9 — sync setState in useEffect.** A React 19 lint ERROR here (not a warning). Dialogs remount forms via `key`; loaders use `startTransition`.
- **A-10 — the e2e db leak.** A stray `DATABASE_URL` in the environment must NEVER point the e2e suite at the dev db — the URL is PINNED in `playwright.config.ts` (`db/e2e.db`), and the smoke leg carries its own throwaway secret.

## §10 Debugging Guide

| Symptom | Cause | Fix |
|---|---|---|
| `bun run db:push` writes outside the repo | `DATABASE_URL` changed to an absolute/CWD-relative path | Restore `file:../db/custom.db`; the db-path seam resolves against `prisma/schema.prisma` |
| Production boot exits with the AUTH_SECRET message | The boot gate (intentional) | `AUTH_SECRET=$(openssl rand -hex 32)` in the process env — never commit it |
| Hover states dead on desktop | The A-4 pin was removed | Restore `@custom-variant hover (&:hover)` |
| Shadows/glass look "too heavy" | The A-1/A-2 pins were removed | Restore `--shadow-sm` / `--blur-sm` |
| A literal color looks off-brand vs the reference | The A-3 re-pin block lost an entry | Re-pin the (family, step) pair to the v3 value |
| e2e suite fails at setup with 429s | Something logs in per-test | Use the storageState; never add per-test logins to specs that share the demo user |
| e2e boots against the dev db | The PINNED url was env-driven | It is PINNED — check `playwright.config.ts` was not edited |
| `<title>` shows the old brand on some page | A rebrand straggler | The WH-2 scan in `tests/wellness-theme.test.ts` catches it — run it |
| A page 404s at the capitalized route | The alias folder lost its re-export | Restore `export { default, metadata } from "../<lowercase>/page"` |
| The drawer stays open after route change | The auto-close on viewport/route was broken | Run `tests/e2e/mobile-navigation.spec.ts`; check the Sheet's onOpenChange wiring |

## §11 Pre-Ship Checklist

```bash
bun run lint          # 0 warnings, ALWAYS first
bun run typecheck     # tsc --noEmit — the fast signal
bun run test          # 317/317 (21 suites)
bun run build         # the type gate + the standalone artifact
bun run smoke         # 14/14 (the standalone boot + ladder on db/smoke.db)
CI=1 bun run test:e2e # 42/42 (5 specs + the setup project, db/e2e.db)
bun run db:census     # users=1 templates=11 steps=50 tutorials=12 badges=8 + owned rows
bun audit             # OUTSIDE the gate (network dep); ZERO since WH-8 (the overrides); re-triage in the PAD ledger
```

- One command: `bun run gate` (lint → typecheck → test → build → smoke → CI=1 e2e). There is no hosted CI — the local gate is the only gate.
- Before push: `git status` clean; `.env`/`db/*.db`/`*.key` NEVER in the tree; screenshots refreshed if any visual surface moved; the five docs' counts re-verified — the docs-counts pin (`tests/docs-counts.test.ts`) fails `bun run test` on a stale count; when a total moves, update the pin's CANONICAL literals + every doc site in the SAME commit. The src-surface census (`tests/src-census.test.ts`) gates the app tree's hygiene the same way: cited test files must exist, api.ts's export surface must be the pinned live set, no duplicated adjacent returns ship, every exported VALUE in the census modules (every lib seam module + the theme store + page-parts) has a consumer, every @utility block in globals.css has a class consumer, every `WellnessState` member is consumed at a `useWellnessStore` call site, every ui-module export has a consumer, each audited component's destructured props equal the pinned live surface, every `ThemeState` member is consumed at a `useThemeStore` call site, and every exported TYPE anywhere in src has a consumer outside its own module (the WH-11 whole-tree extension — a same-module-only type cures by dropping the `export` keyword, keeping the declaration) (the WH-7/WH-8/WH-9/WH-11 extensions). The lockfile-resolution pin (`tests/dead-deps.test.ts`) holds the advisory-zero override versions (vite 8.3.5, deepmerge-ts 8.0.2, source-map-js 1.2.2, one zod at 4.6.7) inside the offline gate — `bun audit` stays a periodic OUTSIDE-the-gate duty (it needs the network).
- Push ONLY via `docs/ssh_git_wrapper_v3.py` (dry-run, then push, then verify the remote ref; the key lives OUTSIDE the repo and is shredded after). Main branch only — no new branches, ever.

## §12 Lessons Learnt & How to Avoid Them

1. **Probe, don't eyeball (WH-1).** Every visual pin came from computed-style reads and byte extractions of the live reference. Eyeballing produced zero of the @theme values. → When touching any visual surface, re-probe the reference first (`agent-browser eval getComputedStyle(...)`).
2. **The reference itself has defects — match deliberately, not blindly (WH-1).** The reference's own sidebar text renders below the 900px fold on its deploy; its signup button 404s; its video URLs are placeholders. Each was decoded, documented, and deliberately improved or mirrored — the deviations live in the PAD's known-issues ledger. → A deviation nobody wrote down is a bug nobody can defend.
3. **Rebrand sweeps need filesystem-scan pins (WH-2/A-6).** The signup title survived a whole-domain rebrand because no test scanned for it. → Pin the INVARIANT ("src/app contains no NEO CRM string"), not the instances.
4. **Count the things (WH-2).** The docs said 41 e2e; the tree ran 42 (the setup project was never counted). → When a count changes, `rg "<old>"` the whole doc set in the same commit.
5. **The chassis was the right call (WH-1).** Replacing the CRM's domain on its auth/envelope/db-path/shell chassis (457 files, +9,147/−105,780) shipped in one round precisely because the infra was already pinned. → Port battle-tested seams; don't rewrite them.
6. **The override mechanism beats the update for transitive advisories (s198, inherited).** `bun update dompurify` hoisted the root AND left a nested vulnerable copy; `overrides.dompurify` in `package.json` + a clean reinstall reproduced the lockfile exactly. → Transitive fixes ride overrides + pins, never ad-hoc updates. (WH-3 coda: when the chain's root consumer turned out to be a dead dep, the override retired WITH it — the deeper rule is the census: no package without a live import, then the override question never arises.)
7. **Rate limits shape test architecture (A-8).** The per-IP login limiter forced the storageState doctrine. → Design test fixtures around your own security posture, not against it.
8. **A dependency is a doc claim (WH-3).** Six packages shipped three rounds with zero imports while five docs claimed their features (charts, PDF export, property tests, axe teeth) — the WH-1 domain replacement deleted the CRM's csv/pdf-export seams but left their packages, and every doc inherited the claim. → The census pin (`tests/dead-deps.test.ts`) makes the dependency tree a TESTED contract: a package without a live import fails the gate, and its doc claims die with it. Never write a feature row for a package the tree does not import.
9. **Count claims need a pin, not a proofread (WH-5).** The wrong model-count heading (a "14-models" claim) lived in all five docs through four audit rounds while the schema had 15 — and every doc's OWN ENUMERATION listed 15 items under the wrong heading; nobody counts another writer's list. The same round found three more stale technical claims (a dead primitives list, a wrong blur attribution, a z-map naming a z-40 layer no class uses). → The docs-counts pin (`tests/docs-counts.test.ts`) computes what the tree can count and fails `bun run test` on any doc that stops carrying the canonical claims: proofreading is not a gate, a pin is.
10. **Citations and exports are surface too (WH-6).** Ten dead coercion helpers shipped five rounds narrated as "surviving on the URL-param surfaces" — defended by a comment citing a test file that never existed, while zero routes parsed URL params at all; four POST handlers shipped a duplicated unreachable `return` that no gate flagged. → A comment defending dead code with nonexistent files is a maintenance lie: the src-surface census pin (`tests/src-census.test.ts`) makes cited-test-path existence, the api.ts export surface and statement hygiene TESTED contracts — the same doctrine that pinned the dep tree (WH-3), the route/ui surface (WH-4) and the docs' counts (WH-5).
11. **Tests pin modules; they do not keep them alive (WH-7).** An entire CRM-era format subgraph — money formatters, relative-time labels, a calendar grid duplicated by wellness.ts monthGrid, and the date primitives feeding only itself — survived six rounds BECAUSE tests pinned it: the checks narrated CRM surfaces ("the reports uppercase-K variant", "the Sales Target formula") that never shipped in this domain, and 15 more dead exported values plus a dead CSS @utility shipped alongside. → A test that pins dead code is a live-looking lie; liveness is a property of PRODUCTION consumers. The exported-value + CSS-utility census (the src-census pin's WH-7 extension) walks export sites so the class cannot return — and when retiring test-pinned surface, land the live twins' pins FIRST (the three live formatters had shipped unpinned; their pins and the retirement landed in one commit).
12. **Word-grep liveness censuses lie in both directions (WH-8).** The store carried a write-only `user` field for four rounds and a dead `prefs` slice — invisible to any word-boundary census because "user" is everywhere and "prefs" lives in the theme test's prose and the route census's API-family list (fake consumers), while a grep for member names would also have "flagged" nothing real. The ui layer carried seven dead re-exports because the WH-7 value census read only `export const/function` declarations — the `export { … }` blocks were invisible. → Liveness censuses must read the CONSUMPTION SITES (destructures + selectors at `useWellnessStore` call sites, export-block names), not word occurrences; and a same-module data feed cures by dropping the `export` keyword, keeping the code. The advisory posture went to ZERO the same round — versions are offline-readable lockfile facts, so the posture is a TESTED contract (`tests/dead-deps.test.ts`), not a doc claim.
13. **Props are a census class of their own (WH-9).** The dead `underline` default arm hid inside tabs for eight rounds BEHIND A LIVE PROP — the ui-export census saw the export name, the value census saw the constants, the store census saw WellnessState; none of them saw the surface between them (a component's ACCEPTED props). The theme store's dead `reset` rode the same gap (the WH-8 census walked WellnessState only), and SidebarNav's `onNavigate` survived on a comment narrating a drawer sharing that never existed — the comment was the prop's only consumer. → Pin the surface at the DESTRUCTURE (the api-export-surface doctrine: drift trips in either direction); a prop with one possible value carries no information — collapse it; and when a comment is a prop's only justification, the comment cure and the retirement land together. Known census boundary, documented: fields nested inside a prop's TYPE (the tabs item's former `count`) ride no census — widen when a finding lands in the gap.
14. **A pin's blind spots are finding classes of their own (WH-10).** The docs-counts pin held the TOTAL (314, lockstep-enforced) for five rounds while the §8.1 infra row above it drifted 22 checks stale — WH-7's retirement decremented the total but nobody recomputed the row, and three subsequent rounds hand-incremented the wrong base; a distribution table whose rows don't sum is a lie with a true bottom line. The same round caught the compound spelling: the hyphenated fourteen-models phrasing lived in PAD §3.2/§12 through the WH-5 cure and the forbidden-forms list, because the list's spaced and spelled-out entries don't match the hyphenated compound. → Pin the ARITHMETIC, not just the totals (rows must sum to the canonical counts — a legitimate redistribution never trips it, arithmetic falsehood always does); and forbidden-forms lists must cover the compound spellings a false count hides in — but pinned at the drift PHRASE, never the bare prefix, because the flat substring scan cannot distinguish history (or this very lesson) from live claims: a doc cannot QUOTE a forbidden form, so the narration must describe it without spelling it.
15. **Census regexes see only the declaration forms they were written for — and a census must never consume its own narration (WH-11).** The type-declaration surface (`export type`/`export interface`) sailed through five census-extension rounds because every pin read value declarations (`export function/const`), export-block names, or member accesses — a dead hand-written domain interface (the orphan of a retired store slice) and twenty same-module-only exported types lived inside the gap. The audit's first census pass ALSO missed five of the twenty because it counted the src-census pin's own machinery text (which names the store-state and envelope types) as consumption — a census that counts its own narration as consumption guards nothing. → Extend liveness censuses by DECLARATION FORM, not just by module (a whole-tree walk beats a fixed list wherever framework contracts don't force the list); always exclude the pin's own file from its corpus; and a same-module-only TYPE cures by dropping the `export` keyword, keeping the declaration — the data-feed doctrine's type form.
16. **A surface pin is not a liveness pin — pin the PASS SITES, and draw the stock-API boundary explicitly (WH-12).** The WH-9 prop census pins the destructured SHAPE of a fixed ten-component set (drift trips in either direction of the shape) — but a prop can sit pinned as "live surface" for three rounds while zero call sites ever pass it: GradientButton.className rode inside the pinned set, and Checkbox carried four invented props feeding an uncontrolled arm and a label-render arm no caller ever exercised. The fix pins what callers actually WRITE: the whole-tree JSX pass-site census (a prop is live when some call site — same-module included — passes it), with the exemptions the doctrine draws explicitly: `children` (JSX-nested), byte-stock shadcn wrapper signatures (the L-71d4 hideClose retirement's own justification — "not stock shadcn" — implies stock signatures keep their shape; the never-customized stock props live in a pinned allowlist, a conscious keep), and Next.js convention files (framework-rendered props, the export-default doctrine). A spread attribute passes everything (the conservative reading — the census never false-positives; it can only miss dead props hiding behind one, and the tree has zero app-level spreads). → When pinning interface surface, ask what the pin actually proves: a shape pin proves the signature didn't drift; only a consumption pin (importers for exports, passers for props, readers for members) proves the surface is alive — and the boundary between "stock API shape" and "invented surface" must be written down, or every future audit re-litigates it.

## §13 Pitfalls to Avoid

- **Don't add `tailwind.config.js`** — v4 CSS-first only; tokens live in `@theme`.
- **Don't remove any pin in `globals.css`** (the A-1..A-4 family + the v3 palette block + the dark overrides).
- **Don't "fix" the dual-case route folders** — the capitalized aliases are the reference's own hrefs; both families are e2e-pinned.
- **Don't resolve `DATABASE_URL` against `process.cwd()`** or inline an absolute path — the db-path seam is the contract.
- **Don't award badges or compute points client-side** — `src/lib/badges-server.ts` at the CRUD seams is the only awarding site (tamper-proof, testable).
- **Don't bare-`fetch` in components** — the store's `call()` is the only sanctioned path.
- **Don't import the store into `src/lib/*` seams** — pure means node-safe and Vitest-runnable.
- **Don't add per-test logins** in e2e specs (the limiter doctrine).
- **Don't loosen `noImplicitAny`, skip the smoke leg, or weaken a lint rule to ship** — a green gate achieved by weakening the gate is not a fix.
- **Don't hardcode emoji glyphs in components** — every vocab lives in `src/lib/constants.ts` as `OptionMeta[]` with the glyph as the label.
- **Don't un-ignore `skills/` in ESLint** — the catalog is the operator's, not app code.

## §14 Best Practices

- **TDD at the seams:** write the failing pin FIRST (`tests/*.test.ts`), then fix, then verify RED→GREEN on the record (the WH-2 flow: pin RED against the bug → fix → GREEN → full gate).
- **The envelope is the only response shape:** `{ ok, data } | { ok, error: { code, message } }` via `ok()/fail()/ERR.*` — greppable, uniform, testable.
- **Every mutation:** `requireSession()` → `parseBody(zod)` → `findFirst({ where: { id, userId } })` ownership check → prisma → `awardBadges()` at the seam → `ok()`.
- **Types:** `interface` for object shapes (the `src/types/index.ts` domain set), `type` for unions; strict mode; no `any`.
- **Comments explain WHY:** the file headers in this codebase carry the probe evidence and session history — keep that voice; don't strip it, don't write what-comments.
- **Docs in lockstep:** README, AGENTS, CLAUDE, PAD, SKILL, worklog — a behavior change that doesn't update its docs in the same commit is half-shipped.
- **Idempotent seeds:** content wipes + reseed; users UPSERT by unique key.
- **Secrets:** env-only; `AUTH_SECRET` fails hard in production; the smoke leg uses a throwaway secret so it's immune to the shell env.

## §15 Coding Patterns

**The guarded mutation handler (every body route copies this):**
```typescript
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireSession();                    // 401 via the envelope
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;                             // Next 16: params is a Promise
  const parsed = await parseBody(req, workoutUpdateSchema); // 400 with a field message
  if (!parsed.ok) return parsed.response;
  const existing = await db.workout.findFirst({ where: { id, userId: guard.user.id } });
  if (!existing) return ERR.NOT_FOUND();                  // 404 — ownership = scoping, no enumeration
  const row = await db.workout.update({ where: { id }, data: parsed.data });
  return ok(row);
}
```

**The dual-case route alias (aliases carry NO logic):**
```typescript
// src/app/(app)/Dashboard/page.tsx
export { default, metadata } from "../dashboard/page";
```

**The pure domain seam (`src/lib/wellness.ts`):**
```typescript
export function currentStreak(dates: (Date | string)[], now: Date = new Date()): number {
  if (dates.length === 0) return 0;
  const keys = [...new Set(dates.map((d) => toDayKey(d)))].sort();
  const last = keys[keys.length - 1];
  if (dayDiff(now, last) > 1) return 0;      // forgiving: today OR yesterday keeps it live
  let streak = 1;
  for (let i = keys.length - 1; i > 0; i--) {
    if (dayDiff(keys[i], keys[i - 1]) === 1) streak++;
    else break;
  }
  return streak;
}
```

**The filesystem-scan pin (the WH-2 rebrand guard):**
```typescript
it("WH-2 (F-1): every page/route source in src/app is NEO-CRM-free", () => {
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(".tsx"))
        if (readFileSync(full, "utf8").includes("NEO CRM")) offenders.push(full);
    }
  };
  walk(path.resolve(import.meta.dirname, "..", "src", "app"));
  expect(offenders).toEqual([]);
});
```

**The theme token write (`src/stores/theme-store.ts`):**
```typescript
document.documentElement.style.setProperty("--color-primary", preset.primary);
document.documentElement.style.setProperty("--color-secondary", preset.secondary);
document.documentElement.style.setProperty("--color-primary-hover", shade(preset.primary, 0.88));
// one write re-skins the app — every v4 utility compiles to var(--color-*)
```

## §16 Coding Anti-Patterns

| Don't | Do instead |
|---|---|
| `fetch("/api/...")` in a component | `useWellnessStore().call(...)` — the envelope, cookie, error toast, and slice-refresh ride it |
| `db.workout.findUnique({ where: { id } })` then check userId | `findFirst({ where: { id, userId: guard.user.id } })` — scoping IS the ownership check |
| Absolute `DATABASE_URL` in `.env` | The relative `file:../db/custom.db` + the db-path seam |
| `tailwind.config.js` / `@config` | `@theme` in `globals.css` |
| `bg-blue-600` expecting v3 blue | The v3 re-pin block carries `#2563eb`; adding a new literal requires adding its v3 value |
| A new `useX` hook for server state | The store slice + `call()` |
| Emoji literals in JSX | The `OptionMeta` vocab in `src/lib/constants.ts` |
| Per-spec `page.goto("/login")` + fill | The shared storageState from the setup project |
| `catch { /* ignore */ }` | `catch { return ERR.INTERNAL(); }` — the envelope always answers |
| Deleting a pin comment because it "looks stale" | The comment IS the history; update it, never strip it |

## §17 Responsive Breakpoint Reference

Tailwind v4 defaults (no custom breakpoints — verified): `sm 640px` · `md 768px` · `lg 1024px` · `xl 1280px` · `2xl 1536px`.

- **The one load-bearing breakpoint: `md 768px`** — below it, the shell renders the glassy mobile header (`md:hidden` sticky, `backdrop-blur-xl` — the reference's own computed blur(24px), live-verified on both apps; the 4px `--blur-sm` re-pin serves the LOGIN CARD's glass, §9 A-2) + the Radix Sheet drawer; at/above it, the static sidebar. The drawer auto-closes when the viewport grows past md (e2e-pinned).
- **The `(app)` main area:** `lg:` grid columns on the dashboard stat tiles and two-panel pages (calendar + upcoming, catalog + detail); `md:` two-column dialogs.
- **Mobile testing:** the e2e mobile battery runs at 390×844 (iPhone 14-class); the screenshot set carries the 390px faces (`docs/screenshots/13-16`). Test any drawer/shell change at 390×844 before shipping.

## §18 Z-Index Layer Map

The flat scale (enforced by review; no ad-hoc `z-[9999]`):

| Layer | Value | Where | Purpose |
|---|---|---|---|
| Glass header | z-10 | `src/components/layout/app-shell.tsx` (`MOBILE_HEADER.bar`, `src/lib/page-layout.ts`) | The sticky mobile header (the header is NOT in mobile-nav — that file is the drawer) |
| Sheet drawer + dialogs + select portals | z-50 | mobile-nav + `ui/dialog.tsx` + `ui/select.tsx` | The drawer, modal surfaces and the Radix select content (the reference ships z-50 — the scaffold-era z-[60] draft was corrected at WH-1; `ui/dropdown.tsx` retired at WH-4) |
| Toasts | z-[100] | `ui/toast.tsx` | The notification portal — always on top |

Conflict rule: nothing may exceed 100; a new overlay joins an existing layer, never invents a higher one.

## §19 Color Reference (Complete)

Every hex below was verified against `src/app/globals.css` at distillation. **Forbidden:** hardcoded hexes in components (brand surfaces ride tokens; the authored pastel tile tints ARE reference-decoded data and are exempt — they live inline in the tile components as the decoded parity values). **The dark set** rides the `.dark` class overrides (sidebar `#111113`, hover `#1c1c1f`, background `#09090b`, surface `#18181b`, sidebar `#101014`).

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#6366f1` | Buttons, active nav, links, chips (indigo-500) |
| `--color-secondary` | `#a855f7` | Gradient partner (purple-500) |
| `--color-primary-hover` | `#4f46e5` | Hover pair |
| `--color-secondary-hover` | `#9333ea` | Hover pair |
| `--color-primary-foreground` | `#fafafa` | On-brand text |
| `--color-sidebar` | `#fafafa` | The light sidebar face |
| `--color-sidebar-hover` | `#f4f4f5` | Nav hover |
| `--color-sidebar-active` | `#eef2ff` | Nav active wash |
| `--color-sidebar-foreground` | `#3f3f46` | Nav text |
| `--color-background` | `#f9fafb` | The main wash |
| `--color-surface` | `#ffffff` | Cards, sheets, inputs |
| `--color-foreground` | `#0a0a0a` | Body text |
| `--color-muted` | `#6b7280` | Secondary text |
| `--color-subtle` | `#9ca3af` | Tertiary text |
| `--color-line` / `-strong` / `-soft` | `#e5e5e5` / `#e5e7eb` / `#f5f5f5` | Borders |
| `--color-ring` | `#0a0a0a` | Focus ring |
| `--color-success` / `-soft` | `#10b981` / `#ecfdf5` | Positive states |
| `--color-warning` / `-soft` | `#f59e0b` / `#fffbeb` | Caution states |
| `--color-danger` / `-soft` | `#ef4444` / `#fef2f2` | Destructive states |
| `--color-info` / `-soft` | `#06b6d4` / `#ecfeff` | Neutral accent states |
| Chart palette | — | RETIRED at WH-3 with recharts — the app renders no charts; the six `--color-chart-*` tokens carried zero consumers and left `globals.css` in the same stroke |

Plus the ~60-entry v3 palette re-pin block (amber-50 `#fffbeb` → yellow-800 `#854d0e`) — the full list lives in `globals.css`; the CONTRACT is "every literal (family, step) used in src/ is re-pinned to its v3 value".

## §20 The Complete TypeScript Interface Reference

The domain contract lives in `src/types/index.ts` (mirrors `prisma/schema.prisma` — 15 models):

- **`Result<T, E>`** — the envelope's type: `{ ok: true; data: T } | { ok: false; error: E }`.
- **`User`** — id, email, name, role (`"user"` — display-only, the reference's own account-tab value; fresh signups write it directly, no first-boot admin ladder), the verification funnel fields, tokenVersion (the CRM-era avatarColor/photoUrl columns retired at WH-4 — set but never rendered).
- **Owned entities:** **`Workout`** (type/durationMinutes/intensity/caloriesBurned?/notes?/date) · **`MoodEntry`** (mood/energy 0–10/activities as JSON string?/gratitude?/reflection?) · **`Assignment`** (title/subject?/dueDate?/priority/estimatedHours?/status/completedAt?) · **`EventItem`** (title/description?/date/time "HH:mm"/category/location?) · **`StudyResource`** (title/subject/description?/type/examDate?/url?/tags JSON?/personalNotes?/rating 1–5?) · **`Reminder`** (title/details?/remindAt/type/priority/repeat/completed/completedAt?) · **`Goal`** (title/description?/category/frequency/targetValue/currentValue/unit/deadline?/points/status/completedAt?).
- **`Badge`** (the catalog row) + earned rows via the API. **`RoutineStep`** · **`RoutineTemplate`** (with steps[]) · **`UserRoutine`** (templateId? nullable — custom routines allowed). **`Tutorial`**. **`UserPrefs`** — the theme singleton: themeMode (light/dark/auto), primaryColor, secondaryColor, fontFamily, sidebarStyle, cardStyle, animationLevel, notificationsEnabled, weeklyReminders.
- **`DashboardData`** — the aggregate the dashboard route composes: the four stat values, recent activity, upcoming reminders/events.

**Environment interface (the six-var contract — see §3).** **Auth interfaces:** the session payload (`uid, iat, exp, v` — the tokenVersion dimension); the store's `call()` unwrap types.

---

## Appendix A — The Meticulous Approach (the six-phase workflow)

1. **ANALYZE** — deep requirement mining; probe the reference live before touching a visual surface.
2. **PLAN** — write the plan to `docs/plans/<date>-<session>.md` before executing.
3. **VALIDATE** — re-check the plan against the tree (every claim greppable) before implementing.
4. **IMPLEMENT** — TDD at the seams: the pin goes RED first, then the fix, then GREEN.
5. **VERIFY** — the full gate (`bun run gate`) + the browser walk at 1280×900 and 390×844; screenshots refreshed on any visual change.
6. **DELIVER** — the five docs + worklog in the same commit; the SSH-wrapper push (dry-run → push → remote-ref verify → key shred); main only.

## Appendix B — Quick Reference Card

| Thing | Where / Value |
|---|---|
| Identity constants | `src/lib/constants.ts` — `APP_NAME "Wellness Hub"`, `APP_TAGLINE "Your personal companion"`, `APP_LOGIN_TITLE "Welcome to EvolveWell"` |
| Every dropdown vocab | `src/lib/constants.ts` — `WORKOUT_TYPES`, `MOODS`, `ASSIGNMENT_PRIORITIES`, `EVENT_CATEGORIES`, `RESOURCE_TYPES`, `REMINDER_TYPES`, `REMINDER_REPEATS`, `GOAL_CATEGORIES`, `GOAL_FREQUENCIES` (+ `GOAL_FREQUENCY_POINTS`), `TEMPLATE_DIFFICULTIES`, `TUTORIAL_CATEGORIES/DIFFICULTIES`, `COLOR_PRESETS` (8), `THEME_MODES`, `FONT_FAMILIES`, `SIDEBAR/CARD_STYLES`, `ANIMATION_LEVELS` |
| The points engine | `GOAL_FREQUENCY_POINTS` + `src/lib/wellness.ts` (goal completion → points; `Total Points = Σ completed goal points + Σ earned badge points`) |
| The badge engine | `src/lib/badges-server.ts` — 8 definitions, awarded at the CRUD seams |
| Streak math | `src/lib/wellness.ts` `currentStreak()` — date-keyed, forgiving (today-or-yesterday) |
| The envelope | `src/lib/api.ts` — `ok` / `fail` / `ERR.*` / `parseBody` / `requireSession` / `isGuarded` |
| The db-path seam | `src/lib/db-path.ts` (pinned: `tests/db-path.test.ts`) |
| The rate limiter | `src/lib/rate-limit.ts` — login 10 / signup 10 / resend 5 / verify 20 / forgot 10 / reset 10 per IP/15min (the uploads 20 window retired with the dead route at WH-4) |
| The boot gate | `src/instrumentation.ts` → `src/lib/boot-env.ts` |
| SEO surfaces | `src/app/sitemap.xml/route.ts` (14 routes) · `robots.txt/route.ts` · `manifest.json/route.ts` · `src/lib/site.ts` (`pageMetadata()` factory) |
| The smoke ladder | `scripts/smoke-test.sh` — 14 checks incl. the boot-gate probe + artifact hygiene |
| The e2e battery | `tests/e2e/` — auth 11 · mobile-nav 6 · shell 6 · wellness-crud 10 · reset-password 8 · setup 1 = 42 |
| Screenshots | `docs/screenshots/01-16` — 12 desktop + 4 mobile (390×844) faces |
| Push runbook | `docs/how-to-git-push-using-ssh-wrapper_SKILL.md` + `docs/ssh_git_wrapper_v3.py` (paramiko shim for no-ssh sandboxes) |
| Session log | `worklog.md` (the WH-1/WH-2 entries at the head) |
| Chassis provenance | `neo-crm_SKILL.md` — the CRM-era distillate of the inherited engineering (superseded by this file, kept as history) |
