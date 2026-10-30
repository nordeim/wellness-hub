# Session-18 Remediation Plan — the dark-mode round (WH-18)

**Task ID:** WH-18 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ b485241`: WH-17 shipped at
`64c8eaa` — the a11y-assertion round — plus the operator's session_31.md
transcript push), re-probe the live reference for new surfaces AND
seed-content/entity-API/compiled-CSS drift, fix every identified gap with
TDD, lockstep the five docs + `worklog.md`, and push.

> **Provenance note:** the reference did NOT redeploy since WH-17 — the
> compiled-CSS watch round 5 found the asset hash unchanged
> (`assets/index-heGLHP2e.css`) and every content/behavior watch came back
> clean (identity map 11/11 byte-identical, drawer battery, seed 23/23,
> entity API 12 rows/13 keys/views:0, 404, placeholders, quick actions,
> login surfaces) — and the probe-preset protocol amendment held: the
> account read CLEAN (Indigo Dream, `#6366f1→#a855f7` computed) at probe
> start, and the round's own Dark-mode flip was reverted + verified at
> probe end. The round's findings are codebase-side — led by the **dark
> mode rendered state**, which every gate assertion, every capture and
> every net has ignored through seventeen rounds (the WH-16/WH-17 error
> class, one surface over again: the console → the semantics → **the
> rendered states**).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
workspace at `b485241`, environment carried over — `.env` present with the
relative `DATABASE_URL="file:../db/custom.db"`, `db/` seeded at the repo
root, Playwright browsers installed, the dev server alive):** lint 0/0 ·
tsc 0 · unit **326/326 (21 suites)** · `bun run build` OK · smoke **14/14**
· e2e **46/46** · db census MATCH (users=1 templates=11 steps=50
tutorials=12 badges=8) · `bun audit` **ZERO** — the exact documented WH-17
ship state, no flake. `.env` ↔ `.env.example` parity verified (identical
key sets). Standing classes re-verified: the three `@source not`
directives + the hover unwrap + the shadow/blur re-pins in `globals.css`;
the SEO family (sitemap routes + robots + manifest 200, smoke check 12);
the mobile-nav battery (the reference's drawer re-walked live at 390×844:
11 items + Close, the stays-open-after-nav quirk, the ineffective
scroll-lock `body{hidden}/html{visible}`, clean teardown).

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 11 pages walked with computed-style H1 probes — every
title and gradient stop byte-identical to the WH-15 identity map (the
probe corrected mid-round: the first H1 selector caught the hidden mobile
brand header; the visible-H1 filter is the walk's form). The
compiled-CSS watch round 5: **hash UNCHANGED** (no redeployment). The
seed-content watch round 7: **23/23 byte-for-byte** (11 template names +
12 tutorial titles). The entity-API shape watch round 6 (HAR via the
browser context): **12 rows, 13 keys, `views: 0` on all 12**. The drawer
battery, the 404, the href-less Watch-Now placeholders (12 buttons), the
quick actions, the login slate surfaces all unchanged. **The reference's
own Dark mode probed for the first time (the parity oracle for this
round's class): its Dark toggle is visually INERT** — body stays white,
`--primary` unchanged (`0 0% 9%`), the post-click screenshot samples 683
light / 0 dark of 736 pixels — the "partially-broken dark" the AGENTS
ledger documents, now pixel-evidenced. **The reference's preset catalog
is byte-identical to ours** (Indigo Dream/Ocean Blue/Forest Green/Sunset
Orange/Rose Pink/Royal Purple/Crimson Red/Golden Yellow) — the preset
white-on-gradient contrast class (Golden Yellow ≈ 1.8:1) is
**reference-shared** (it ships the identical pair) and axe-incomplete
(gradients) — documented in the ledger, NOT cured (the parity doctrine).

**The round's audit class — the dark mode rendered state, read for the
first time.** The method: axe-core (WCAG 2.1 A+AA **and the 2.2 tags**)
walked in three states the gate never reads — (a) the class-flipped Dark
mode (via the real Profile UI path), (b) the reverse corner (OS-dark
preference + mode=light, via Playwright `colorScheme: "dark"`), (c) the
mobile pages at 390×844 and the 320px reflow — plus computed-color reads
of every flagged element, the compiled production stylesheet read as the
oracle, and a source-level census of the `dark:` vocabulary. Findings
(by severity) — the WH-18 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **CRITICAL** | The dark variant strategy mismatch: the compiled stylesheet wraps EVERY `dark:*` utility in `@media (prefers-color-scheme:dark)` (Tailwind v4's default dark variant) while the theme engine flips a `.dark` CLASS on `<html>` — the two strategies never meet. 77 `dark:` occurrences across 4 files (routines/mentalhealth/reminders pages + page-layout.ts: the WH-15 page-root washes, the login family's full dark vocabulary, the WH-14 950-wash re-pins) are un-activatable by the mode toggle. Corner A (mode=dark, OS=light): tokens swap (surface `#18181b`) but utilities don't fire → light text values on dark cards — **138 axe violation nodes across 8 routes** (Routines 83, Events 28, Goals 12, Profile 5, MentalHealth 3, Reminders 3, Exercise 2, Assignments 2; Dashboard/Learning/StudyResources axe-incomplete under gradient washes but equally broken). Corner B (mode=light, OS=dark): the media query fires without the class → gray-400 on WHITE cards (2.54:1) — **every OS-dark user sees broken light mode without touching anything** (live-verified: fg `rgb(156,163,175)` on card `rgb(255,255,255)`) | `src/app/globals.css` (missing declaration) | `@custom-variant dark (&:where(.dark, .dark *));` — the class-based dark variant, the canonical v4 form (documented in the repo's own skills corpus: `skills/react19-vite-spa-fastify-drizzle-sqlite/SKILL.md`), the **sixth Tailwind v4 pin** |
| F-2 | HIGH | The missing `dark:` pairs — surfaces with NO dark variant that fail once F-1 is cured: the Events weekday headers (`text-gray-600`, 7 nodes on the calendar card), the Profile info box (`bg-line-soft … text-gray-600`) + the tab triggers (`text-neutral-600` — the WH-17 superset — 5 nodes), the Goals badge-catalog `text-xs text-gray-600` ×2, the Learning video-placeholder icon (`text-gray-400` on the fixed gray-100 thumbnail) + the floating search pill (`bg-white/95` — a light island), **the toast (fixed `bg-white` + token text → text-foreground `#fafafa` on white = INVISIBLE toasts in dark — every CRUD confirmation unreadable)**, the Select focus arm (`focus:bg-line-soft focus:text-neutral-900` → near-black on near-black — the highlighted option unreadable while focused), the error pages (fixed light `bg-slate-50` islands) | events/profile/goals/learning pages, `ui/toast.tsx`, `ui/select.tsx`, page-layout records, `app/error.tsx`, `app/global-error.tsx` | add the `dark:` pair at each site (the v3/neutral families already pinned; new pairs gain their pins) |
| F-3 | HIGH | The login surface ignores the chosen mode: the theme store mounts only inside the (app) group (AppShell + Profile) — `/login`, `/signup`, `/reset-password` never load it, so the `.dark` class + preset vars never apply there (live-verified: the class vanishes on /login). The LOGIN_LAYOUT carries a full authored dark vocabulary (`dark:bg-neutral-900/95`, `dark:from-neutral-900`…) that can only ever fire on the OS preference — the wrong trigger — and login-card's own no-dark: classes (`text-slate-500/700`, the OTP input `bg-white`) have no dark state | `src/app/layout.tsx`, `src/components/layout/login-card.tsx`, `reset-password-screen.tsx` | a `ThemeBoot` client component in the root layout (the store's persist middleware rehydrates + applies at module init — the pre-hydration write class WH-16 already suppressed on `<html>`/`<main>`), + the missing login-family dark: pairs |
| F-4 | MEDIUM | The auto-mode live-flip is narrated, not built: `theme-store.ts`'s header comment says "flips the .dark class live (the listener stays attached)" — there is NO `addEventListener` anywhere in the tree; auto users get the mode at load, and an OS scheme flip while the app is open does nothing (the stale-narration class, WH-6's genus) | `src/stores/theme-store.ts` | attach the real `matchMedia("(prefers-color-scheme: dark)").addEventListener("change", …)` listener at store init (client-guarded), re-resolving the class on auto |
| F-5 | MEDIUM | The gate never read the rendered STATES: every net (DOM, console, a11y), every capture (16 PNGs, all light), every e2e walks light mode only — the state a user flips in one Profile click shipped broken through seventeen green rounds. The a11y net's own WH-17 doctrine ("run the walk on BOTH apps") not applied to the state axis | `tests/e2e/a11y.spec.ts`, `tests/e2e/shell.spec.ts` | the net widening: the dark-mode a11y walk (every module route + the open drawer, axe at 2.1+2.2 tags, strict zero, console-clean too), the OS-dark corner (colorScheme dark + mode light → no `.dark` class + axe zero), the dark login (seeded persisted state), the interaction surfaces in dark (an open Select + a live toast), and the 2.2 tag widening on the existing light walks (probed clean — the widening pins it) |

**The probe-hygiene events (the SKILL §11 protocol):** the round's own
Dark-mode UI flip contaminated the demo account's SERVER prefs (the
fire-and-forget PUT) — caught at the next probe by the account-state
check, reverted through the UI (the Light click PUTs), and verified by
reading `/api/prefs` (themeMode "light") before the clean corner probe
ran. The reference account's own Dark flip was reverted + verified (the
active chip reads Light) at probe end.

---

## 2. Remediation sequence (TDD)

**WP-1 (RED — the pins, written first):**
1. `tests/src-census.test.ts` — the **dark-variant pin**: `globals.css`
   must declare `@custom-variant dark (&:where(.dark, .dark *));` (the
   root-cause declaration; the same census family as the `@source not`
   pin) + the **ThemeBoot mount pin**: the root layout renders
   `<ThemeBoot />` (the login-surface state mount).
2. `tests/e2e/a11y.spec.ts` — the net widening (all at
   `wcag2a/wcag2aa/wcag21a/wcag21aa/wcag22a/wcag22aa`):
   the dark-mode walk (flip Dark via the Profile UI → every module route
   + the open drawer → strict zero + a zero-console collector → revert to
   Light via the UI at the end, the probe-hygiene protocol inside the
   suite), the OS-dark corner (`colorScheme: "dark"` + mode light → no
   `.dark` class + axe zero on the walked routes), the dark login
   (logged-out context, the persisted dark state seeded via
   `addInitScript` → the `.dark` class applies + axe zero), and the
   dark-interaction check (an open Select's highlighted option + a live
   toast, axe-scoped, strict zero).
3. The CANONICAL flips in `tests/docs-counts.test.ts` (the ladder:
   326→328 unit, 46→50 e2e, the §8.1 rows — exact numbers fixed at
   implementation).
4. **Verify the RED**: the census pin fails (no declaration), the dark
   walk fails with the audit's inventory (138 nodes), the corner fails
   (gray-400-on-white), the dark login fails (no class), the ladder
   carriers fail.

**WP-2 (GREEN — the cures, one surface at a time):**
1. **The variant pin** (F-1): the `@custom-variant dark` declaration in
   `globals.css` beside the hover unwrap — then re-verify the compiled
   stylesheet (the media wrapper gone, the `:where(.dark, .dark *)`
   selector in) and both corners live (class-flip dark works; OS-dark +
   light is pure light).
2. **The missing pairs** (F-2): Events weekday headers, Profile info box
   + tab triggers, Goals badge text, Learning thumbnail icon + search
   pill, the toast (`dark:bg-neutral-900` + dark border pairs), the
   Select focus arm (`dark:focus:text-…`), the error pages — each pair
   chosen from the already-pinned neutral/gray families where possible;
   new pairs gain their v3 pins in the same commit (the pins⇔usage
   census, both directions).
3. **ThemeBoot** (F-3): the tiny client component in the root layout +
   the login-family dark: pairs (login-card's slate texts, the OTP input).
4. **The auto listener** (F-4): the real matchMedia change listener at
   store init (client-guarded) + the comment brought to the truth.
5. Re-run the dark walk + the corner + the login + the interactions —
   **strict zero everywhere**, the chips/cards computed-verified in dark.

**WP-3 (the ladder + the five docs):** every count site (README badge +
tables + testing §, AGENTS commands + gate order + the pins list gaining
the sixth entry + the a11y-net bullet, CLAUDE tables, PAD tree + §8.1
rows + totals + the known-issues ledger, SKILL §2/§4/§8/§11/§12 —
**lesson 22**: "a rendered state is a surface the gate never reads — the
mode a user flips in one click shipped broken through seventeen green
rounds because every net, capture and e2e walked light; walk EVERY
flippable state, and read the compiled stylesheet as the oracle for
variant-strategy bugs — the media-query wrap was visible in the bundle
all along" + v1.15.0→**v1.16.0**). docs-counts GREEN.

**WP-4 (the full gate, live, post-cure):** lint → tsc → unit → build →
smoke → e2e (the dark net green as the new checks) → `bun audit` ZERO →
db census MATCH.

**WP-5 (the captures):** the 16-file light set re-taken (the pair fixes
move zero light pixels — verify: the movers must be none beyond the
documented raster class) **+ the NEW dark set**: the dark dashboard, one
dark module page, the dark drawer, the dark login — the first captures
of the state this round cured, saved as `17-dark-dashboard.png` …
`20-dark-login.png` (or the house naming), each verified non-blank.

**WP-6 (the records):** the worklog WH-18 entry, this plan's execution
record, `docs/session_32.md` (the round transcript).

**WP-7 (the ship):** stage (no `.env`/db/keys/scratch — the probe
scripts under `scripts/` are scratch and stay untracked or get cleaned),
commit to `main`, the SSH-wrapper push (the paramiko shim, key outside
the repo, dry-run → push → remote verify → shred).

---

## 3. Decisions (open questions, decided)

1. **The dark visual identity is OURS to choose (the superset doctrine).**
   The reference's Dark toggle is inert (pixel-evidenced this round) —
   there is no reference dark to mirror. The identity: the neutral-900
   wash family the WH-15 authors already chose (`dark:from-neutral-900
   dark:via-neutral-950 dark:to-neutral-900`), the zinc-ish token set
   already in `.dark`, and the gray-300/400 text ladder — the vocabulary
   the tree already carries, completed.
2. **The preset white-on-gradient contrast (Golden Yellow) is NOT cured.**
   The reference ships the identical preset pair (its catalog is
   byte-identical) — parity-shared, and axe-incomplete (gradient
   backgrounds) on both apps. Documented in the PAD known-issues ledger
   as the reference-shared class. (A future round could darken the preset
   pill text; that would be a superset deviation from the reference's own
   preset engine — not this round's call.)
3. **The net's tag set widens to WCAG 2.2 for ALL walks** (light and
   dark): the light walks are already clean at 2.2 (probed this round),
   so the widening is free and pins the standard the docs will claim.
   The docs' claim moves from "WCAG 2.1 A+AA" to "WCAG 2.1+2.2 A+AA".
4. **ThemeBoot is a side-effect client component in the root layout** —
   the store's persist middleware rehydrates synchronously from
   localStorage at module init and applies the class + vars; the
   pre-hydration write class is the one WH-16 already suppressed on
   `<html>`/`<main>` (pinned by the hydration-suppression census — no new
   suppression needed). The e2e console net covers the new mount (zero
   console output expected).
5. **The dark-mode e2e flips revert at the end of the test** (the UI
   Light click, which PUTs) — the probe-hygiene protocol INSIDE the
   suite, so subsequent specs (the CRUD/preset battery) see the light
   server prefs. The e2e runs against its own scratch db/e2e.db — the
   dev account is never touched.
6. **The error pages get dark pairs** (not left as light islands): the
   ThemeBoot mount makes the class apply there too, and a light island
   under a dark html is the same incoherence this round cures — three
   classes each, cheap.
7. **The scratch probe scripts** (`scripts/axe-*-probe.ts`,
   `axe-dark-colors.ts`, `os-dark-light-probe.ts`, `seed-watch.ts`) are
   the round's audit evidence, not product surface — they stay out of the
   commit (the scripts/ folder is the workspace's own; only
   `census.ts`/`prisma-env.ts`/`smoke-test.sh` are tracked).

---

## 4. Execution record (2026-10-30, WH-18 — filled as executed)

- **WP-1 (RED):** the dark-variant pin + the ThemeBoot-mount census appended
  to `tests/src-census.test.ts`; the CANONICAL flips (326→**328**, 46→**50**,
  layout 7→8 / tsx 45→46 / client 26→27); four new walks in
  `tests/e2e/a11y.spec.ts` + the 2.2 tag widening. **RED verified:** exactly
  the 2 census pins (no declaration, no ThemeBoot) + the 4 dark walks (the
  dark state failing with the audit's inventory — 10 offender families
  across the module routes; the corner failing on the media leak's
  gray-404-on-white; the dark login failing the class assertion; the
  interactions failing on the invisible toast + the unreadable highlight)
  + the 8 docs-counts carriers. **The suite-isolation lesson, learned
  live:** the first full-spec run left the e2e account's server prefs dark
  (a failed test aborted before its in-test revert) and the NEXT run's
  light walk inherited dark pages — cured three ways: the light walk
  normalizes its mode first (the self-healing backstop), both dark
  describes revert in an `afterEach`, and every revert VERIFIES THE PUT
  LANDED (an `/api/prefs` poll — `setTheme`'s server sync is
  fire-and-forget; the WH-16 "verify reverts SAVE" lesson applied to the
  suite's own hygiene).
- **WP-2 (GREEN):** the `@custom-variant dark (&:where(.dark, .dark *));`
  declaration landed beside the hover unwrap — the compiled bundle
  re-verified as the oracle: **ZERO `prefers-color-scheme` wraps remain,
  the `:where(.dark,.dark *)` selectors are in** (101,641 bytes). The
  missing pairs (~20 sites across events/profile/goals/learning pages +
  page-layout records + toast + select + the error pages + the login
  family incl. the OTP input). ThemeBoot in the root layout. The real
  auto-mode matchMedia listener + the comment brought to the truth. **+6
  v3 pins** (blue-300/400, emerald-800, rose-800, neutral-100/400 — the
  pins⇔usage census green at **113 = 113**; the block narration's drifted
  "109" corrected against the census's arithmetic; AGENTS' staler "95"
  corrected too). **Three stragglers the net caught mid-WP and cured:**
  the Events day cells (21 nodes — the day numbers + the cell
  borders/hover), the Profile active mode card's label (the inherited
  dark foreground on the fixed indigo-50 chip → the explicit
  `text-neutral-900`), the login divider label (`text-slate-500` without
  its dark pair). **The net GREEN on all 8 checks**; both corners
  computed-verified live (Routines gray-400 on `#09090b`, Events gray-400
  on `#18181b`, the active card near-black on `rgb(238,242,255)`).
- **WP-3 (the ladder + docs):** 326→**328** at all live-tense unit sites;
  46→**50** at every e2e site (the a11y row 3→**7** checks; the §8.1 infra
  row 128→**130** [109+89+130=328]; 11+6+7+7+1+18=50). README (badge +
  stack table + testing + superset + the dark-mode design-system
  paragraph + the NEW troubleshooting row), AGENTS (commands + gate order
  + the SIXTH Tailwind pin + the a11y-net bullet's dark-state widening +
  the 113-pin count), CLAUDE (tables + pyramid), PAD (tree + §8.1 rows +
  totals + checklist + the tree annotation + TWO known-issues entries:
  the reference-shared preset contrast + the retired dark-mode-broken),
  SKILL (frontmatter v1.15.0→**v1.16.0** + the description + the
  provenance + §2 rows + §8 + §11 + the census list + **§12 lesson 22** +
  the 27-of-46 counts). docs-counts GREEN **10/10**.
- **WP-4 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **328/328 (21 suites)** · build OK · smoke 14/14 · e2e **50/50** (the
  four dark walks green; the light walks green at the widened 2.1+2.2
  tags) · db census MATCH · `bun audit` ZERO.
- **WP-5 (captures):** the 16-file light set re-taken via the house
  procedure (the mouse parked on the neutral header edge; a real trigger
  click for the drawer). **14/16 BYTE-STABLE**; the two movers
  root-caused: 10-learning at 0 pixels above Δ7 (a 4×5 bbox of
  sub-threshold antialiasing — the documented raster class) and
  12-profile at 221 pixels in the active theme-mode card's label bbox —
  the intended ink change (#0a0a0a inherited → the explicit #171717).
  **The NEW dark set 17–20** (17-dark-dashboard, 18-dark-routines,
  19-dark-mobile-nav-open, 20-dark-login): the first captures of the
  cured state, each verified non-blank + genuinely dark (1283+/1290
  sampled pixels non-white). The dev account reverted with the PUT
  verified (`themeMode=light` read back from `/api/prefs`).
- **WP-6:** the worklog WH-18 entry + this record + `docs/session_32.md`.
- **WP-7:** staging the tree (no `.env`/db/keys/scratch — the probe
  scripts stay untracked), the commit, and the SSH-wrapper push.
