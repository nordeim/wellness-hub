# Session-3 Remediation Plan — the dead-weight retirement round

**Task ID:** WH-3 · **Date:** 2026-10-29 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 0f159d9`), fix every
identified gap with TDD, lockstep the five docs + `worklog.md`, and push.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation):**
lint 0/0 · tsc 0 · unit 314/314 (16 suites) · `bun run build` OK ·
smoke 14/14 · e2e **42/42** (5 specs + the auth setup project).

**Verified against the live reference (2026-10-29, this session):** the
reference's dashboard carries the SAME construction as ours (four stat
tiles + Quick Actions + Recent Activity + Upcoming Reminders/Events) —
**no charts, no export UI on any probed surface** (dashboard, Exercise,
Routines, Goals, StudyResources all walked). The reference's mobile
drawer opens with the same 11 items (10 nav + the Profile & Settings
footer); its drawer STAYS OPEN after drawer-navigation (ours auto-closes
— the documented kept superset); Escape closes it on both. The
reference's toggle is covered by its own fixed header at the click point
(its own DOM quirk; ours is clean). Zero console errors on our side
across the walk.

**Standing contracts re-verified:** the Tailwind v4 pins
(`@custom-variant hover` at globals.css:20, `--shadow-sm` re-pin at :84,
`--blur-sm` re-pin at :93) · `.env` `DATABASE_URL="file:../db/custom.db"`
with `db/` at the repo root · db census MATCH (users=1 templates=11
steps=50 tutorials=12 badges=8) · `.env`/`.env.example` byte-identical ·
`force-dynamic` on all 34 route files · `requireSession` on every
non-auth handler (the one exception is F-2's documented-public serving
route) · the WH-2 signup-title fix standing + the src/app NEO-CRM scan
pin green · sitemap (14 routes)/robots/manifest byte formats standing ·
52 .tsx / 28 `"use client"` · zero TODO/console.log residue.

**Findings (by severity):**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH** | **Six dead dependencies** — zero quoted references anywhere in the scanned roots (src, tests, scripts, prisma, the five root configs): `jspdf` (dep), `recharts` (dep), `html2canvas-pro` (dep), `fast-check` (devDep), `axe-core` (devDep), `tw-animate-css` (devDep — the app uses the VENDORED `src/app/vendor/tw-animate.css`, not the package). None was ever imported by the wellness tree (they are CRM-chassis residue: `src/lib/csv.ts`/`pdf-export.ts` were deleted in the WH-1 domain replacement — `git ls-tree 8ec9df4 src/lib/` proves it — while their packages stayed in `package.json`). The orphaned `overrides.dompurify = "3.4.17"` pin exists ONLY for jspdf's transitive chain → retires with it. Dead CSS rides along: the `--color-chart-1..6` tokens (globals.css:123-128) and the `chart-no-outline` `@utility` (globals.css:379-385) reference a chart library that is never imported. **False doc claims cluster** (the audit's real bite): README/AGENTS/CLAUDE/PAD/SKILL all claim "Charts \| recharts" table rows, "PDF \| jspdf" rows, "CSV/PDF export" superset features, "fast-check property tests", "axe-core e2e teeth", and a "chart palette" — none exists in the tree. Live-probed this session: the reference has NO charts and NO export UI → retirement has ZERO parity impact. | `package.json`, `src/app/globals.css`, five docs | **TDD:** a dead-dependency census pin (RED against the shipping tree with exactly the 6 offenders) → remove the 6 packages + the orphaned override + the dead CSS → `bun install` (lockfile regen; dompurify leaves the tree entirely) → pin GREEN. Doc lockstep: purge the false claims, correct the counts (314→315 unit, 16→17 suites). |
| F-2 | **MEDIUM** | **Uploads security-posture doc mismatch**: `GET /api/uploads/[name]` is PUBLIC — a capability-URL model (32-hex content-random names = 128-bit unguessable, `UPLOAD_NAME_RE` charset pin = no traversal surface, content-types pinned to images, immutable caching) — the route's own comment documents the deliberate reason (the reference's `file_urls` are public CDN links). But AGENTS.md says "only serves the owning user's files" and PAD §6.1 says "only the owner reads" — both OVERSTATE the posture. The POST half (upload) is sessioned + rate-limited correctly; only the doc claims about reads are wrong. | `AGENTS.md` (uploads bullet), `PAD` §6.1 row + §6.4 XSS row | Fix the DOCS to the honest capability-URL truth (the code is the deliberate reference-parity design; the docs drifted). |
| F-3 | **LOW** | **CRM-era comment residue**: (a) `src/app/sitemap.xml/route.ts` carries an s142 comment claiming "+ /about + /contact" and "`/` stays 1.0 — it is now the PUBLIC landing page" — false for the wellness domain (the root is the login-wall redirect; the array has 14 wellness routes, no /about, no /contact). (b) `vitest.config.ts`'s header says "pure domain seams of the CRM … CSV codec" — the CRM and the CSV codec are both gone. | the two files | Rewrite both comment blocks at the wellness truth. |
| F-4 | **Informational** | `bun audit`: 9 advisories (4 high, 4 moderate, 1 low), ALL dev-toolchain transitive — prisma CLI's `deepmerge-ts`, vitest's `vite`/`launch-editor` family, `eslint-plugin-react-hooks`' nested zod 4.6.5 (our runtime zod is 4.6.7 — safe), postcss's `source-map-js`. After F-1 retires jspdf there are ZERO runtime advisory chains. Accepted posture per the family doctrine (no mid-rotation toolchain bumps). | the toolchain | No action; PAD §11 ledger row updated at the post-cure census. |

**Clean checks (no findings):** ownership scoping on every `[id]` route ·
`requireSession` coverage (above) · the uploads POST's Content-Length
pre-gate · store consumption patterns (whole-store subscription — a
stable reference; zero allocating selectors, no `useShallow` trap) ·
`next.config.ts` artifact hygiene (the F-170a excludes + the trailing
`.env` removal) · the health route's honest 503 · the ESLint
`skills/` ignore standing · no new reference-side surfaces.

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|---|---|
| 1 | **F-1 TDD pin (RED)**: `tests/dead-deps.test.ts` — the census: every `package.json` dep/devDep must carry ≥1 QUOTED reference across the scanned roots (src/**/*.{ts,tsx,css}, tests/**/*.{ts,tsx}, scripts/**/*.ts, prisma/**/*.ts, the five root configs) OR sit on the TOOLCHAIN whitelist with a documented reason (`prisma` the CLI via `bun x`, `eslint` the lint bin, `typescript` the compiler, `tailwindcss` the engine behind `@tailwindcss/postcss`, `react-dom` next's required peer renderer, `@types/*` ambient). RED at birth with exactly 6 offenders | RED ×6 |
| 2 | **F-1 cure (GREEN)**: remove jspdf/recharts/html2canvas-pro from `dependencies`, fast-check/axe-core/tw-animate-css from `devDependencies`, the `overrides` block (dompurify); delete the dead CSS (chart tokens + `chart-no-outline`); `bun install` (lockfile regen); verify dompurify/recharts/jspdf absent from the tree; pin GREEN | GREEN |
| 3 | **F-2 doc fix**: AGENTS uploads bullet + PAD §6.1 row + §6.4 XSS row rewritten at the capability-URL truth | rg-verified |
| 4 | **F-3 comment fixes**: the sitemap s142 block + the vitest.config header | rg-verified |
| 5 | **F-1 doc lockstep**: purge the false claims — README (Overview "CSV/PDF export", stack-table rows ×2, superset ledger), AGENTS (charts conventions line, the jspdf advisory note), CLAUDE ("CSV/PDF export" phrase), PAD (§1.2 rows ×2, §3.2 tree line, §8.2 fast-check line, §11 ledger row), SKILL (§2 rows ×2, §3 config note, §8 axe-core line, §12 lesson 6 reframe, §19 chart-palette row, Appendix B) + ALL count sites 314→315 / 16→17 suites + SKILL frontmatter v1.0.0→v1.1.0 + provenance | rg-verified |
| 6 | **Full gate re-run**: lint → typecheck → test (315/315, 17 suites) → build → smoke → e2e (42/42) + `bun audit` post-cure census | full green |
| 7 | **Captures**: re-take the 16-file screenshot set from the remediated dev server (login once, one session, md5-verify uniqueness) | captures |
| 8 | **worklog + this plan's execution record** + `.env.example` bidirectional parity re-verify (no env change this round — it rides unchanged) | worklog |
| 9 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (paramiko shim; key outside the repo; dry-run then push; shred the key) | remote main |

---

## 3. Decisions (open questions, decided)

- **Retire, don't build (F-1):** the "CSV/PDF export" superset claims were
  never true of this tree — the lib seams were deleted with the CRM
  retirement while the packages stayed. The reference (live-probed) has
  no charts and no export UI, so building them would INVENT scope beyond
  parity. The skill's dependency discipline ("every dependency must have
  a live import; run a dead-dependency census periodically — the family
  repeatedly found and retired zero-import scaffold packages") mandates
  retirement. The false claims go; the features do not come.
- **The `overrides.dompurify` "do not remove" guard is superseded:** the
  guard (AGENTS + SKILL §2) protected against re-introducing jspdf's
  vulnerable transitive chain. With jspdf retired the chain cannot
  exist; the guard is rewritten at the new truth (zero runtime advisory
  chains; all remaining advisories dev-toolchain).
- **SKILL §12 lesson 6 stays as history, reframed:** the override-vs-update
  mechanism lesson (s198) remains true and transferable; its example
  chain was retired at WH-3 — the lesson gains a closing note, not a
  deletion.
- **The vendored `src/app/vendor/tw-animate.css` STAYS:** it is the live
  animation engine (`@import`ed by globals.css); only the unreferenced
  npm package goes. (Vendoring is the sanctioned form per the
  web-application skill §12.)
- **F-2 fixes docs, not code:** the public capability-URL serving is the
  deliberate reference-parity design (the route's comment documents it);
  the POST half stays sessioned + rate-limited. Only the overstated doc
  claims about reads change.
- **Count ladder:** the census pin adds exactly one suite with two tests
  (the census itself + the whitelist-reason check):
  314→316 checks, 16→17 suites. Every count site updates in the same
  commit (`rg "314|16 suites"` the doc set).
- **Screenshots:** refresh in place — no visual surface changes this
  round (dead CSS tokens were unreferenced), but the round's captures
  are the operator's standing ask; the 16-file inventory stays.

---

## 4. Execution record (2026-10-29, WH-3 — the plan validated then executed)

- **WP-1 (RED, verified):** `tests/dead-deps.test.ts` written first; RED at
  birth against the shipping tree with **exactly the 6 predicted
  offenders** (axe-core, fast-check, html2canvas-pro, jspdf, recharts,
  tw-animate-css) — the whitelist-reason check born green as designed.
- **WP-2 (GREEN, verified):** `bun remove` retired the six packages; the
  orphaned `overrides.dompurify` block hand-removed (a config edit, not a
  dependency change); the dead CSS retired (the six `--color-chart-*`
  tokens + the `chart-no-outline` utility, each replaced by a WH-3
  history note); `bun install` regenerated the lockfile (the diff:
  exactly the 6 direct entries + the override block + their transitive
  subtrees — @babel/runtime, @reduxjs/toolkit, the @types/d3-* family,
  dompurify itself); a **clean reinstall** (`rm -rf node_modules && bun
  install`) made the physical tree match the lockfile exactly (the
  WH-2-era nested-copy lesson), followed by `bun run db:generate` (a
  fresh node_modules drops the generated Prisma client — caught live
  when the auth suite ENOENT'd `.prisma/client/default`, cured by the
  regenerate). Census pin **GREEN** (2/2). Residue note: `axe-core@4.13`
  + `fast-check@3.23` remain in the tree as LEGITIMATE transitive deps
  (eslint-plugin-jsx-a11y via eslint-config-next; effect via
  @prisma/config) — different majors, dev-toolchain chains, not ours.
- **WP-3 (F-2):** AGENTS uploads bullet + PAD §6.1/§6.4 rows rewritten at
  the capability-URL truth (including the accurate traversal mechanism:
  `UPLOAD_NAME_RE` charset pinning, not path prefix-checks).
- **WP-4 (F-3):** the sitemap s142 comment block + the vitest.config
  header rewritten at the wellness truth.
- **WP-5 (doc lockstep, rg-verified):** every false claim purged — the
  remaining dead-dep/CSV/PDF/314 mentions in the doc set are exclusively
  the intentional WH-3 history (the SKILL provenance, the retired ledger
  row, the new §12 lesson 8). Counts now 316/17 suites everywhere.
  SKILL bumped v1.0.0 → **v1.1.0** (description + provenance carry the
  WH-3 round).
- **WP-6 (full gate, all live, post-cure):** lint 0/0 · tsc 0 · unit
  **316/316 (17 suites)** · build OK · smoke 14/14 · e2e **42/42** ·
  `bun audit` **9 (4 high / 4 moderate / 1 low), all dev-toolchain
  transitive** — zero jspdf/dompurify/recharts chains remain (they left
  the audit entirely with the packages).
- **WP-7 (captures):** all 16 screenshots re-taken from the remediated
  dev server in ONE logged-in browser session — 01-login +
  02-dashboard … 12-profile at 1280×900, 13-mobile-login +
  14-mobile-dashboard + 15-mobile-nav-open + 16-mobile-drawer-nav-exercise
  at 390×844 (the drawer walk re-verified live: open → navigate to
  /Exercise → auto-close). **md5-verified: 16 unique files.** (A
  first-pass naming slip — three mobile captures saved under
  non-canonical names — was caught by the md5/uniqueness check and
  redone at the canonical 13-16 inventory.)
- **`.env.example`:** unchanged this round (no env surface moved);
  bidirectional parity with `.env` re-verified (byte-identical).
- **Mobile-nav parity re-verified live (both apps, this round):** the
  reference drawer opens with the same 11 items, STAYS OPEN after
  drawer-navigation (ours auto-closes — the documented superset), Escape
  closes both; the reference's own toggle is covered by its fixed header
  at the click point (its DOM quirk; ours is clean). Zero console
  errors on our walk.

