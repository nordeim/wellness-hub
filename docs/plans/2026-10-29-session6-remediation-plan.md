# Session-6 Remediation Plan — the src-surface census round

**Task ID:** WH-6 · **Date:** 2026-10-29 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 3370759`: session_7.md —
the WH-5 conversation's transcript; the tree is byte-identical to the WH-5
ship state `2a5bc76` apart from that doc), re-probe the live reference for
new surfaces (the standing WH-6 candidate from session_6/session_7), fix
every identified gap with TDD, lockstep the five docs + `worklog.md`, and
push.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on a fresh
clone):** `bun install` (468 pkgs) → `cp .env.example .env` → `db:push` →
`db:seed` (11/12/8) → lint 0/0 · tsc 0 · unit **328/328 (20 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **42/42** · db census MATCH
(users=1 templates=11 steps=50 tutorials=12 badges=8). One environment
note: the sandbox was reset — the Playwright Chromium binary had to be
reinstalled (`bunx playwright install chromium`) before the e2e leg; the
repo itself needed nothing.

**The live reference re-probe (the standing WH-6 candidate, logged in as
the demo account, 2026-10-29):** ALL 10 nav pages + Profile walked
(dashboard's four zero stat tiles + four quick actions; Routines' catalog
with Use This Template / Watch Video; Exercise/Mental Health/Assignments/
Reminders stat faces; Events' ←/Today/→ calendar; Study Resources' search
+ 2 comboboxes; Learning's search + category filter + Watch Now cards;
Goals' New Goal + stats; Profile's Appearance/Account/Preferences tabs —
Appearance with Light/Dark/Auto, 8 presets, custom hex pair, font
combobox, background-image URL field, sidebar-style/animation comboboxes).
**ZERO new surfaces since WH-5.** The Account tab is still READ-ONLY
(three disabled fields: name / email / role="user"); Preferences still
the two notification checkboxes.

**The mobile drawer battery (the operator's emphasized surface, at
390×844, live on BOTH apps):**

| Behavior | Reference | Ours |
|---|---|---|
| Drawer items | 11 (10 nav + Profile & Settings) | 11 |
| Drawer-nav click | navigates, drawer STAYS OPEN (its own quirk) | navigates, AUTO-CLOSE + scroll-lock released (the documented superset) |
| Escape | closes | closes |
| Header computed `backdrop-filter` | `blur(24px)` | `blur(24px)` — parity |
| Header computed z-index | 10 | 10 — parity |
| Live tokens | — | `--blur-sm: 4px`, `--shadow-sm: 0 1px 2px 0` at 5% alpha |

One reference-side quirk observed (not a parity gap against us): the
reference's empty sonner toast viewport (`fixed top-0 z-[100]`, full-width
at mobile widths) intercepts clicks on its own header toggle for
automation — our hand-rolled toast portal does not (our toggle clicks
cleanly). Zero console errors on the walked surfaces; both apps' Tailwind
pins live.

**Standing contracts re-verified:** the Tailwind v4 pins
(`@custom-variant hover` globals.css:20, `--shadow-sm` :84, `--blur-sm`
:93) · `requireSession` on every non-public handler (the 8 public: 7 auth
+ health — the documented design) · `force-dynamic` on all 31 API route
files (+3 `force-static` SEO routes) · the SEO family solid (14-route
sitemap in the reference's byte format, robots, manifest, icons) ·
`.env` ↔ `.env.example` byte-identical (both WELLNESS_*) · census claims
verified (models 15 · families 15 · ui 6 · suites 20 · specs 5 · layout 7)
· zero TODO/console.log residue · vitest/playwright configs per the
contract (Vitest matches `*.test.ts` only; Playwright boots the production
standalone on an isolated port with the pinned `db/e2e.db`).

**The dependency-advisory posture (re-triaged live):** `bun audit` = **9
(4 high / 4 moderate / 1 low), ALL dev-toolchain transitive** — unchanged
from the WH-5 ledger; zero runtime request-path chains.

**Findings (by severity) — the first genuine CODE findings since WH-4
(two rounds of pure doc drift), all in the dead-surface/hygiene class:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **The dead coercion-helper cluster + its maintenance lie.** Ten exported functions — `asString`, `isBadFK`, `asFKId`, `isBadString`, `isBadDate`, `isBadNumber`, `isBadBool`, `asNumber`, `asInt`, `asDate` (api.ts:213-309, ~97 lines) — have ZERO importers across the entire tree (every route imports only `ok/fail/ERR/parseBody/isGuarded/requireSession`; components/stores/tests/scripts import none; `src/lib/format.ts` has its own private live `asDate`). The defending comment narrates three surfaces that do not exist: "events' from/to windows" (the events route parses no query params — plain `findMany`), "the reports/export/search period+q parses" (CRM-era routes, retired at WH-1/WH-4), "tests/coercion-guards.test.ts, the living record" (the file does not exist). Zero `searchParams`/`URLSearchParams` usage anywhere in `src/app/api/` or `src/lib/`. The exact WH-4 F-1 class: dead surface + a comment defending it with nonexistent consumers. | src/lib/api.ts:213-309 | Retire the ten exports + rewrite the section comment at the truth; the api-export census (F-4) pins the export set |
| F-2 | **MEDIUM** | **Four duplicated unreachable `return ok(row);` statements** — the same copy-paste artifact at line 33 in four POST handlers (reminders, assignments, events, study-resources). Inert at runtime (the second return never executes) but a real defect that survived five audit rounds and the full gate (tsc's default `allowUnreachableCode` does not flag it; the ESLint chain carries no `no-unreachable`). Verified by an exact-duplicate-adjacent-line scan of the whole src tree — exactly these four sites. | src/app/api/{reminders,assignments,events,study-resources}/route.ts:32-33 | Delete the four duplicate lines; the dup-return census (F-4) pins the class |
| F-3 | **LOW** | **Eight stale `tests/*.test.ts` citations in code comments** (the WH-4 F-7 "CRM comment residue" class — these survived WH-4's comment sweep because they sit in src/scripts/prisma files, not the docs): `site.ts:1-2` cites tests/metadata.test.ts + tests/pwa-metadata.test.ts (real pins: tests/wellness-theme.test.ts + tests/boot-env.test.ts); `rate-limit.ts:14` cites tests/property.test.ts "P-n…P-q" (property testing retired at WH-3 with fast-check; real pin: tests/rate-limit.test.ts); `census.ts:5` cites tests/db-census.test.ts (real pin: tests/db-path.test.ts); `globals.css:19/145/152` cite tests/{profile,contacts,statcard}-family-parity.test.ts (real pin: tests/wellness-theme.test.ts reads globals.css); api.ts:220's citation folds into F-1's cure. Plus `site.ts:5` cites "app/sitemap.ts, app/robots.ts" — the real surfaces are `src/app/sitemap.xml/route.ts` + `src/app/robots.txt/route.ts` (deliberate explicit route handlers, not the Next metadata files). Also three DOC sites claim the dead helpers (AGENTS.md:74 + 132-133, CLAUDE.md:71: "URL-param GETs use the asString/asDate helpers") — cured in the same commit as F-1. | src/lib/site.ts, src/lib/rate-limit.ts, scripts/census.ts, src/app/globals.css, AGENTS.md, CLAUDE.md | Cure each citation at the real pin; the citation census (F-4) pins the class |
| F-4 | **Systemic (the round's TDD feature)** | **No pin for the src comment-citation / api-export / dup-statement classes.** WH-3 pinned the dependency tree, WH-4 the route/ui surface, WH-5 the docs' count claims — nothing test-gates (a) file citations inside src/scripts/prisma comments, (b) api.ts's export set, (c) duplicated unreachable statements. F-1..F-3 are exactly these classes; the F-1/F-3 lies survived five rounds of proofreading because proofreading is not a gate. | tests/ | **TDD:** `tests/src-census.test.ts` — 3 checks: (1) every `tests/<path>.test.ts` citation in src/**/*.{ts,tsx,css} + scripts/**/*.{ts,sh} + prisma/**/*.ts + the root config files exists on disk (globs must expand to ≥1 file); (2) src/lib/api.ts's exported-symbol set is exactly the live twelve; (3) zero duplicated adjacent `return` statements anywhere in src. RED at birth on F-1/F-2/F-3 → cure → GREEN |
| F-5 | Informational | `bun audit` 9 (4h/4m/1l) — all dev-toolchain transitive; unchanged from WH-5 | the toolchain | No action; the PAD §11 ledger row re-anchored at WH-6 |

**Clean checks (no findings):** the full baseline gate · the reference
probe (zero new surfaces; mobile battery green on both apps; header
computed parity) · requireSession/force-dynamic coverage · the SEO family
· the Tailwind pins · `.env` parity · the test configs · the db-path
contract · the e2e isolation contract · zero TODO/console residue ·
`bun.lock`/package.json unchanged since WH-5.

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — `tests/src-census.test.ts` first:** the citation census (every cited `tests/*.test.ts` path exists; globs expand ≥1) — RED with exactly the 8 stale citations · the api-export census (the exported-symbol set equals the live twelve: ApiError, ApiResult, ok, fail, ERR, requireSession, isGuarded, MAX_AUTH_BODY_BYTES, isBodyTooLarge, BoundedJson, readBoundedJson, parseBody) — RED with the 10 dead exports · the dup-return census (zero duplicated adjacent return lines in src) — RED with exactly the 4 sites. Also flip docs-counts' CANONICAL to the post-landing truth (unitSuites 20→21, unitChecks 328→331) so its computed checks stay GREEN while its 5 per-doc claim checks go RED (the docs still say 328/20) — the count-ladder mechanics | RED as predicted |
| 2 | **GREEN — F-1 (the api.ts retirement):** delete api.ts:213-309 (the ten dead exports) + rewrite the section comment at the truth: the coercion family retired at WH-6; every JSON body rides `parseBody` + the zod seam; no route parses URL params (the last URL-param consumers were CRM-era). Cure the three doc sites (AGENTS.md:74 + 132-133, CLAUDE.md:71) in the same commit | pin GREEN on the export census |
| 3 | **GREEN — F-2 (the dup returns):** delete the four duplicated `return ok(row);` lines (reminders, assignments, events, study-resources route.ts:33) | pin GREEN on the dup census |
| 4 | **GREEN — F-3 (the citation cures):** site.ts:1-2 → tests/wellness-theme.test.ts + tests/boot-env.test.ts · site.ts:5 → src/app/sitemap.xml/route.ts + src/app/robots.txt/route.ts · rate-limit.ts:14 → tests/rate-limit.test.ts (drop the property-testing narration — fast-check retired at WH-3) · census.ts:5 → tests/db-path.test.ts · globals.css:19/145/152 → tests/wellness-theme.test.ts | pin GREEN on the citation census |
| 5 | **The count ladder:** run the unit suite → 328→331 / 20→21; update EVERY count site in the same commit (README badge + stack table + testing + superset ledger · AGENTS commands + gate order + testing conventions · CLAUDE build table + test pyramid · PAD §3.2 tree + §8.1 infra row + totals + §8.4 · SKILL §2 + §11 + §20 + the pin's own CANONICAL literal) | rg-verified |
| 6 | **SKILL v1.3.0→v1.4.0 + PAD ledger:** the provenance block's WH-6 re-validation line · §11's count-recheck line names the new pin · §12 lesson 10 ("citations and exports are surface too — a comment defending dead code with nonexistent files is a maintenance lie; pin the src surface the way the routes are pinned") · AGENTS' advisory posture re-anchored (WH-5→WH-6 round) + PAD §11's audit row re-anchored | rg-verified |
| 7 | **Full gate re-run:** lint → typecheck → test (331) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` re-triage | full green |
| 8 | **Captures:** re-take the 16-file screenshot set from the remediated dev server (one logged-in session; 01-12 at 1280×900, 13-16 at 390×844 — the drawer walk live-verified during capture); md5-verified uniqueness; `.env`↔`.env.example` parity re-verify. NOTE: agent-browser resolves relative paths against its own daemon CWD — save with absolute paths | captures |
| 9 | **worklog + this plan's execution record + `docs/session_8.md`** (the round's transcript for the operator — session_7.md is the operator's own push, not clobbered) | worklog |
| 10 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **Retire, don't keep (F-1):** the coercion family has zero consumers and
  zero citations that point at real files. Keeping "for future URL-param
  routes" is speculative surface — the web-application skill's dependency
  discipline ("every dependency must have a live import within one commit
  of being added") applies to exported surface the same way. If a future
  route needs query-param parsing, the zod seam already covers it
  (`parseBody` + a query schema), and the api-export census owns the
  change consciously.
- **The export census, not export-level liveness for all of src (F-4
  scope):** a tree-wide export-level liveness census would false-positive
  on legitimate surfaces (types, constants consumed by tests, the
  theme-store's exports). api.ts is the app's contract module — THE
  surface a route imports — so its export set is the honest census
  target. The general class stays covered by the route-census pin's
  module-level liveness (every src module has a production importer).
- **The citation census reads comments as data (presence-of-truth, not
  absence-of-error):** the check scans source text for
  `tests/<path>.test.ts` references and asserts every cited path exists
  (a `*` in the citation is treated as a glob and must expand to ≥1
  file). It does not parse prose or forbid phrasing — a comment may
  reword freely as long as every file it names is real. History is NOT
  exempt inside src (a history comment citing a retired test file is
  exactly how F-3 survived) — history belongs in worklog/plans/session
  files, which the scan does not read.
- **No FORBIDDEN_FORMS addition for the asString class:** the
  docs-counts pin's forbidden list admits only forms that "can never
  appear in legitimate history" — `asString`/`asDate` WILL appear in the
  SKILL's WH-6 provenance line (one of the five docs) narrating the
  retirement. The code-side enforcement is the api-export census; the
  three doc sites cure in the same commit under the code-wins rule.
- **F-2 severity:** the duplicate returns are behaviorally inert
  (unreachable) — MEDIUM rather than HIGH because four production route
  handlers carry a real defect class that every gate (tsc, ESLint, five
  audit rounds, 42 e2e checks) missed, not because anything misbehaves.
  The dup-return census makes the class a tested contract.
- **The count ladder (WP-5):** the pin lands as suite #21 → suites
  20→21, checks 328→331 (the pin's own 3 checks). The e2e count stays 42;
  the smoke count stays 14. docs-counts' CANONICAL flips to 21/331 at
  WP-1 (post-landing truth) so only its per-doc claim checks carry the
  ladder RED — the same mechanics as WH-5's WP-1.
- **Screenshots (WP-8):** refresh in place — F-1/F-2/F-3 touch zero
  visual surface (dead exports, unreachable lines, comments), so captures
  01-15 are expected byte-identical to the WH-5 set; the captures remain
  the operator's standing ask, and byte-stability is itself the parity
  proof.
- **The session file (WP-9):** the operator's numbering pushed
  session_7.md (the WH-5 conversation's transcript); this round's
  transcript file is `docs/session_8.md`, matching the house pattern
  (the round writes its own session file, never clobbering the
  operator's).

---

## 4. Execution record (2026-10-29, WH-6 — filled as executed)

- **Baseline gate GREEN pre-remediation** (live, fresh clone): lint 0/0 ·
  tsc 0 · unit 328/328 (20 suites) · build OK · smoke 14/14 · e2e 42/42 ·
  census MATCH (the Playwright browser binary reinstalled first — the
  sandbox was reset, the repo was not).
- **The reference probe: zero new surfaces; the mobile battery green on
  both apps; header computed parity (blur 24px, z-10); the reference's
  empty-toast-overlay quirk noted** — see §1.
- **WP-1 (RED):** `tests/src-census.test.ts` born with 3 checks; RED at
  birth with exactly the predicted offenders — the citation census
  listing all 8 stale citations (globals.css ×3, api.ts, rate-limit.ts,
  site.ts ×2, census.ts), the api-export census RED with the 10 dead
  exports (22 exported vs the live 12), the dup-return census RED with
  exactly the 4 sites. docs-counts' CANONICAL flipped to 21/331 in the
  same step (post-landing truth) — its computed checks stayed GREEN,
  its 5 per-doc claim checks carried the ladder RED. **Two pin-self
  catches at the RED runs:** the glob conversion's first form re-ate
  its own inserted star (`**` → `.*` → `.[^/]*` under the single-star
  pass — `vitest.config.ts`'s `tests/**/*.test.ts` false-tripped), and
  the second form required a segment for `**/` (zero-segment globs
  never matched) — fixed with placeholder passes + `(?:.*/)?` for
  `**/` (picomatch zero-or-more semantics); the pin caught its own
  bugs before they shipped.
- **WP-2 (F-1 cure):** api.ts:213-309 (the ten dead exports + the
  triple-stale comment) retired at the truth — the replacement comment
  names the retirement, the zero-consumer evidence, and the pin that
  owns the export surface; the three doc sites cured (AGENTS.md:74 +
  132-133, CLAUDE.md:71 — "no route parses URL params").
- **WP-3 (F-2 cure):** the four duplicated `return ok(row);` lines
  deleted (reminders, assignments, events, study-resources route.ts:33).
- **WP-4 (F-3 cures):** site.ts:1-2 → tests/wellness-theme.test.ts +
  tests/boot-env.test.ts · site.ts:5 → src/app/sitemap.xml/route.ts +
  src/app/robots.txt/route.ts · rate-limit.ts:14 → tests/rate-limit.test.ts
  (the property-testing narration retired with its WH-3-retired
  fast-check context) · census.ts:5 → tests/db-path.test.ts ·
  globals.css:19/145/152 → tests/wellness-theme.test.ts → the pin
  GREEN 3/3.
- **WP-5 (count ladder):** unit 328→331 (+3) / suites 20→21; every
  count site updated in the same commit (README badge + stack table +
  testing + superset ledger · AGENTS commands + gate order + the new
  src-surface census bullet in testing conventions · CLAUDE build
  table + test pyramid · PAD §3.2 tree + §8.1 infra row 9/130→10/133 +
  totals + §8.4 · SKILL §2 + §11); rg-swept: zero remaining
  328/20-suite mentions outside the intentional history (the SKILL
  provenance block).
- **WP-6:** SKILL v1.3.0→v1.4.0 (description + the WH-6 provenance
  line) · §11's pre-ship line names the src-surface census · §12
  lesson 10 ("citations and exports are surface too") · AGENTS'
  advisory posture re-anchored (WH-5→WH-6 round) + PAD §11's audit row
  re-anchored.
- **WP-7 (full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **331/331 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 ·
  census MATCH · `bun audit` 9 (4h/4m/1l) — the posture unchanged,
  re-anchored at WH-6.
- **WP-8 (captures):** all 16 re-taken in one logged-in session
  (01-12 at 1280×900; 13-16 at 390×844 — the drawer walk
  live-verified during capture 16: open → 11 items → drawer-nav →
  AUTO-CLOSED); md5: 16 unique; **captures 01-15 byte-identical to
  the WH-5 set** (git shows only 16-mobile-drawer-nav-exercise.png
  changed — deterministic rendering, zero visual surface moved this
  round, exactly as predicted: F-1/F-2/F-3 touch no visual surface);
  `.env` ↔ `.env.example` byte-identical.
- **WP-9:** the WH-6 worklog entry + this record +
  `docs/session_8.md`.
- **WP-10:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
