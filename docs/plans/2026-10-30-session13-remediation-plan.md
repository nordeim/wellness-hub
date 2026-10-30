# Session-13 Remediation Plan — the schema-field census round (WH-13)

**Task ID:** WH-13 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 7f867b0`: session_21.md —
the operator's WH-12 transcript push; the tree byte-identical to the WH-12
ship state `4626857` apart from that doc), re-probe the live reference for
new surfaces AND seed-content drift, fix every identified gap with TDD,
lockstep the five docs + `worklog.md`, and push.

> **Provenance note:** every prior census reads the app's TS/TSX surface —
> exported values (WH-7), members (WH-8/WH-9), exported types (WH-11), JSX
> pass sites (WH-12). None of them reads the DATA LAYER: a Prisma column
> can be written at a route seam, declared on the payload wire, and read by
> nobody — invisible to every existing pin, exactly as the store's write-only
> `user` member was invisible to word-grep (WH-8). The WH-13 audit walked all
> 161 scalar fields of the 15-model schema and found one such cluster.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the pulled
tree at `7f867b0`):** lint 0/0 · tsc 0 · unit **317/317 (21
suites)** · `bun run build` OK · smoke **14/14** · e2e **42/42** · db
census MATCH (users=1 templates=11 steps=50 tutorials=12 badges=8) ·
`bun audit` **ZERO** — the exact documented WH-12 ship state, no flake.

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 10 nav pages + Profile walked — **ZERO new surfaces since
WH-12**; every title in the documented pattern (Dashboard ships the bare
"EvolveWell"; every inner route pipes "X | EvolveWell"); the mobile drawer
battery at 390×844: 11 items, the reference's stays-open-after-nav quirk
re-verified (drawer still open at /Exercise, no scroll lock — ours
AUTO-CLOSES + releases, the e2e-pinned superset, 42/42 green in this
round's baseline); the sonner-overlay quirk again intercepted its own
toggle click (the JS-dispatch workaround, as every round); the reference's
own console carries its documented warnings (the tailwind CDN notice + the
Radix DialogTitle/Description a11y gaps in ITS drawer). The custom 404
("404" / "Page Not Found" / 'The page "NoSuchPage" could not be found in
this application.' / "Go Home") re-verified. The Profile tabs re-verified
in full (Appearance 3 modes + 8 presets + Typography + Background Image /
Image URL (optional) with the Unsplash placeholder — the surface our
profile-page already carries byte-parity at `profile-page.tsx:243-255`;
Account; Preferences). The "Watch Video" buttons still carry no real hrefs
(placeholder URLs in the data layer — the documented intentional-parity
state).

**The seed-content watch (round 2 of the class):** the reference's 11
routine-template names (leaf-text walk on /Routines) and 12 tutorial titles
(img-alt walk on /Learning) compared against `prisma/seed.ts` —
**byte-for-byte parity on all 23 content names**. No drift on the
reference's side.

**Findings (by severity) — the WH-13 ledger, in the COLUMN-liveness class
no census reads:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **Four write-only `completedAt` columns** (the fifth candidate, `Tutorial.views`, was re-ruled a conscious parity KEEP mid-round — see the decisions). `Assignment.completedAt`, `Reminder.completedAt`, `Goal.completedAt`, `UserRoutine.completedAt` — written at the four completion seams (`completedAt: body.X === "completed" ? new Date() : null`), declared on the wire (four payload-type members in `src/types/index.ts`), and read by NOBODY: zero component reads, zero store reads, zero query usage (no where/orderBy/select), zero zod fields, zero test assertions, zero reference counterpart (the reference's live-captured form intelligence — build plan §1.5 — carries NO completion-timestamp field in any module's forms or stats). The class: WH-4's never-rendered-column form + WH-8's write-only-member form, as a COLUMN. | `prisma/schema.prisma:104,160,182,266` · the 4 PATCH seams (`src/app/api/{assignments,goals,reminders,routines}/[id]/route.ts`) · `src/types/index.ts:45,86,103,154` | Drop the four columns (schema), the four write spreads (routes — `data: { ...body }` suffices), the four wire members (payload types), the two seam-comment narrations reworded; `Tutorial.views` STAYS (the parity keep) — no schema/wire change to it; `db:generate` + `db:push` (the script's pinned `--accept-data-loss`); e2e/smoke scratch dbs re-derive from the schema automatically |
| F-2 | **Systemic (the round's TDD feature)** | **No pin for the COLUMN-liveness surface.** Every existing census reads TS/TSX declarations or JSX pass sites; none reads the data layer. A column can be written + transported + never read — F-1 rode twelve rounds through five census-extension rounds. | `tests/src-census.test.ts` | **TDD:** the schema-field liveness census — walk `prisma/schema.prisma`'s model blocks, extract every scalar field, assert each is consumed at a READ site: (a) any non-comment occurrence in a `.tsx` (the component/store read layer), (b) a `.field` member access in any corpus file, (c) a prisma query-context line (select/where/orderBy/include) carrying the field key. Corpus: `src/**.ts(.tsx)` + `prisma/seed.ts`, **all `*.test.ts` excluded** (the WH-7 tests-don't-keep-alive rule, which also satisfies the WH-11 SELF rule structurally — the pin cannot consume its own narration). Exemptions: `@updatedAt` columns (the stock-schema boundary: Prisma-managed audit columns keep their shape — the WH-12 stock-API doctrine's schema form). RED at birth with exactly the 4 predicted offenders (the completedAt quartet; Tutorial.views rides the SCHEMA_PARITY_KEEPS list) |

**The stock-schema boundary (pinned in the census, the WH-12 doctrine's
schema form):** the ten `@updatedAt` columns (User, Workout, MoodEntry,
Assignment, Event, StudyResource, Reminder, Goal, UserRoutine, UserPrefs)
are Prisma-managed audit metadata — the `@updatedAt` directive is stock
Prisma, the same conscious-keep class as the byte-stock shadcn wrapper
signatures. `completedAt` is an invented column (no directive, no reader)
— invented data surface needs live readers, stock directives keep their
shape. The boundary is "stock Prisma directive" vs "invented column",
NOT "nullable vs required".

**Clean checks (no findings, documented):** the full baseline gate (42/42,
no flake) · the reference probe (zero new surfaces; the drawer battery; the
Profile tabs incl. the Background-Image surface both apps carry; the 404;
the reference's own console warnings) · **the seed-content watch round 2**
(11 template names + 12 tutorial titles byte-for-byte vs the live
reference) · the env-contract census (exactly the six documented vars +
NEXT_PHASE/NEXT_RUNTIME/NODE_ENV framework-internal) · the
model-consumption census (15/15 alive — RoutineStep via the
routine-templates relation include) · `sortOrder` consumed via `orderBy`
at 4 sites (routine-templates + steps, badges-server ×2 + achievements,
tutorials) · `bgImageUrl` LIVE (theme-store applies
`main.style.backgroundImage`) · the optional-field spot battery
(calories/notes/examDate/earnedAt/personalNotes/gratitude/color/icon/
thumbnail/description all READ by components — `b.earnedAt` + `b.color` +
`b.icon` at goals-page:286-307) · globals.css plain-class liveness (only
`.dark`, consumed by the theme store's classList toggle) · public/ assets
(`og-image.png` referenced 4× in site.ts + layout.tsx; apple-icon.png +
icon.png are file conventions) · the `@utility` census standing
(`scrollbar-thin` pinned) · the Tailwind v4 pins standing
(`@custom-variant hover`, literal-hex `@theme`, `--shadow-sm`,
`--blur-sm`) · the SEO family (smoke check 12 green) · `.env`
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ·
vitest/playwright configs per the contract · `skills/` excluded from
lint/tsc/vitest (verified in all three configs) · the WH-12 diff review
(the GradientButton/Checkbox surgery + the pass-site census, exactly as
its plan documented) + the session_21 doc-only review.

**The dry-run (the plan's pre-landing validation, the house doctrine):**
the exact READ-site test (a/b/c + the @updatedAt exemption + the
*.test.ts exclusion) run as a scratch script against the WH-12 tree
returned the predicted 4 offenders, zero false positives — then the
second pass caught the design's own blind spot: JSX comment blocks
(`{/*`) in .tsx files counted as occurrences, and behind them rode
**Tutorial.views** (never written, never read, `@default(0)`-filled). The
isComment fix (adding `{/*`) re-validated at **exactly 5 offenders** —
and the fifth then got re-ruled a parity keep (the Decisions). The probe's
own vocabulary lesson re-learned mid-audit: two "zero-read-site" scares (iconEmoji,
thumbnailUrl) were hallucinated FIELD NAMES (the schema carries `icon` and
`thumbnail`) — always read the declaration, never the mental model.

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the schema-field census in `tests/src-census.test.ts`:** the model-block walk + the scalar-field extraction (2-space + type-token regex, the same form as the dry-run), the READ-site test (a/b/c), the `@updatedAt` stock exemption, the `*.test.ts` corpus exclusion. Flip docs-counts' `CANONICAL.unitChecks` 317→**318** in the same step. RED verified with exactly the predicted 5 offenders (the completedAt quartet + Tutorial.views) | RED as predicted |
| 2 | **GREEN — F-1 (the four columns):** schema drops the 4 declarations; the 4 PATCH seams drop the completedAt spreads (`data: { ...body }`; goals keeps its points-frequency spread); the 2 seam comments reworded (the badge check narration stays, the stamping narration goes); `src/types/index.ts` drops the 4 members; `bun run db:generate` + `bun run db:push` (dev db altered in place — rows survive, census counts unchanged) | census GREEN; tsc 0; unit 318/318 |
| 3 | **The count ladder + docs:** 317→**318** at all 13 live-tense sites (README badge + stack + testing + superset · AGENTS commands + gate order · CLAUDE build table + test pyramid · PAD §3.2 tree + §8.1 totals + §9.3 pre-ship · SKILL §2 + §11); PAD §8.1's infra row 119→**120** (109+89+120=318, the row-arithmetic pin green at the new truth) with the category list gaining the schema-field census; PAD §4.2's two field-contract narrations drop `completedAt` (Assignment: "(pending/completed)"; Reminder: "`completed`"); SKILL §20's interface reference drops the three `completedAt?` narrations; AGENTS' census bullet extended; SKILL v1.10.0→**v1.11.0** (description + provenance + §12 lesson 17) | rg-verified, docs-counts GREEN |
| 4 | **Full gate re-run:** lint → typecheck → test (**318**) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` ZERO | full green |
| 5 | **Captures:** re-take the 16-file set from the dev server (the WH-12 script, adjusted). F-1 is data-layer surgery — zero DOM surface touched; all 16 expected byte-stable vs the WH-12 set (same date Oct 30 — the events today-cell holds; the goals capture at the inherited 2500ms settle; the drawer walk live-verified during capture 16). `.env` ↔ `.env.example` parity re-verify | captures |
| 6 | **worklog WH-13 entry + this plan's execution record + `docs/session_22.md`** (the round's transcript; the operator's session_21.md push never clobbered) | worklog |
| 7 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **Writes do not keep a column alive (the round's lesson):** the five
  columns were written (four of them at least) at every completion seam and
  transported on every response — and read by nobody. The consumption verb
  for a COLUMN is the READ (a component access, a store access, a query
  key); a write expression is authorship, not consumption — the same
  doctrine that retired the WH-8 write-only store members and the WH-4
  never-rendered columns. The census therefore counts READ sites only,
  and the write spreads die with the columns they fed.
- **The stock-schema boundary (the WH-12 doctrine's schema form):** the
  ten `@updatedAt` columns stay — the `@updatedAt` directive is stock
  Prisma (framework-managed audit metadata, like `export default` and the
  Next.js convention files). `completedAt` is an invented column and
  follows the liveness doctrine. The boundary is the DIRECTIVE, not the
  name or nullability — a future `@updatedAt`-free audit column is
  invented surface and needs live readers.
- **The corpus excludes ALL `*.test.ts` files (not just the pin's own):**
  this satisfies the WH-11 SELF rule structurally (the pin cannot consume
  its own narration) AND enforces the WH-7 rule (tests pin modules; they
  do not keep them alive) — test-only consumption was never liveness.
  `prisma/seed.ts` stays IN the corpus: it is production code (the content
  tables' only writer), and its local-constant reads (`.sortOrder`) are
  real member accesses — harmless here because every seed-read field also
  carries a query or component read.
- **The census's known boundary (documented, the WH-9 doctrine):** the
  field test is name-global, not per-model — a field name shared by
  several models passes if ANY model's usage reads it (e.g. `description`
  passes on the Learning page's `t.description` even if a hypothetical
  second model's description were dead). Widen when a finding lands in
  the gap; the class that actually happened (a uniquely-named dead column)
  is covered at birth. Common-word fields (a field named like a CSS token)
  can false-pass via className strings in `.tsx` — the pass-site census
  carries the same class of boundary (a spread passes everything).
- **Tutorial.views is a conscious parity KEEP, not a retirement (the
  round's re-ruling):** the initial audit classified it as the class's
  purest form (never written — the @default(0) fills it; never read;
  wire-declared). The live verification then settled it: the reference's
  OWN entity API returns `views: 0` on all 12 tutorials (HAR probe of
  `entities/Tutorial?sort=-created_date` this round — keys: category,
  created_by_id, created_date, description, difficulty, duration, id,
  is_sample, thumbnail, title, updated_date, video_url, views) while its
  UI never displays it. The reference carries its own dead-weight field;
  the parity-first doctrine mirrors it — the exact shape of the
  Watch-Video-placeholder ruling (PAD §11: the reference's own
  placeholders are mirrored deliberately). The keep rides the census's
  SCHEMA_PARITY_KEEPS list (the WH-12 STOCK_ALLOWLIST's schema mechanism:
  a conscious keep, flipped in the same commit as any change); the
  completedAt quartet has NO reference counterpart (invented schema
  authorship) and retires.
- **The db cure is in-place, not a reseed:** `db:push --accept-data-loss`
  (already pinned in the script) ALTERs `db/custom.db` — rows survive
  minus the four columns; the census counts (users=1 templates=11
  steps=50 tutorials=12 badges=8) are row counts and stay MATCH; the demo
  session cookie survives (no reseed, no user-row churn). The e2e and
  smoke scratch dbs re-derive from the schema on their next run
  (`global-setup` schema-push + `smoke-test.sh:55` `db:push`) — no manual
  step needed.
- **The e2e/visual surface:** F-1 is data-layer surgery — zero pixels
  move. The completion flows keep their driving booleans
  (`Assignment.status`, `Reminder.completed`, `Goal.status`,
  `UserRoutine.completed` — all live, all read); the e2e battery (42)
  asserts those, never `completedAt` (verified: zero occurrences in
  tests/). Captures expected 16/16 byte-stable vs the WH-12 set.
- **The count ladder (exact):** 317 + 1 (the schema-field census check,
  riding src-census.test.ts — an infra file) = **318 checks / 21 suites**
  (no new suite). e2e stays 42; smoke stays 14; the §8.1 infra row
  119+1 = **120** (row arithmetic now enforced: 109+89+120=318).
- **SKILL v1.10.0→v1.11.0 (the minor convention):** §12 lesson 17 ("writes
  do not keep a column alive — the consumption verb for a column is the
  READ; and the stock boundary in the schema is the DIRECTIVE") is a new
  entry, not a correction.
- **The session file (WP-6):** the operator's numbering pushed
  session_21.md (the WH-12 raw transcript); this round's transcript file
  is `docs/session_22.md`, matching the house pattern.
- **Declined (documented, not taken):** the functional-superset round
  (real video URLs, OAuth wiring — tenth deferral; the probe re-confirmed
  the reference's own placeholder state: its Watch Video buttons carry no
  hrefs, its OAuth button is the demo button — wiring real ones would
  BREAK parity, so it stays the operator's call); the per-model field
  precision widening and the common-word tightening (zero offenders today
  — the house doctrine pins when a finding lands, and none did); the
  schema-level relation-field census (relation fields are Prisma join
  machinery — the `include`/`where` usage is already visible to the
  READ-site test through the scalar FK columns).

---

## 4. Execution record (2026-10-30, WH-13 — filled as executed)

- **Baseline gate (live, pulled tree at 7f867b0):** lint 0/0 · tsc 0 ·
  unit 317/317 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · bun audit ZERO — the documented WH-12 ship state, no flake. — §1
- **The reference probe:** zero new surfaces; the drawer battery green on
  the reference (11 items, stays-open quirk, no scroll lock); the Profile
  tabs incl. the Background-Image surface re-verified on both apps; the
  404 re-verified; the seed-content watch round 2 verified byte-for-byte
  (11 templates + 12 tutorials). — §1
- **The plan's pre-landing validation:** the READ-site census dry-run
  returned exactly the predicted 4 offenders with zero false positives
  (146 READ-live + 10 stock-exempt + 4 DEAD + 1 parity-keep). — §1
- **WP-1 (RED):** the schema-field census landed in `tests/src-census.test.ts`
  (the model-block walk + the READ-site test (a/b/c) + the @updatedAt
  stock exemption + the SCHEMA_PARITY_KEEPS list); CANONICAL flipped
  317→318 in the same step. RED verified with exactly the 4 predicted
  offenders; docs-counts RED with exactly the 6 ladder carriers.
- **WP-2 (GREEN, F-1):** schema dropped the 4 completedAt declarations;
  the 4 PATCH seams dropped the completedAt spreads (`data: { ...body }`;
  goals kept its points-frequency spread); the 2 seam comments reworded;
  `src/types/index.ts` dropped the 4 members. `db:generate` +
  `db:push` — the dev db altered IN PLACE (sqlite PRAGMA check: the
  quartet gone from Assignment/Reminder/Goal/UserRoutine; Tutorial KEPT
  its views column). **tsc 0 on the first run**; the census GREEN 12/12.
- **WP-3 (the ladder):** 317→318 at all 13 live-tense sites (README badge
  + stack + testing + superset · AGENTS commands + gate order · CLAUDE
  build table + test pyramid · PAD §3.2 tree + §8.1 totals + §9.3
  pre-ship · SKILL §2 + §11); PAD §8.1's infra row 119→**120**
  (109+89+120=318, the row-arithmetic pin green at the new truth) with
  the category list gaining "schema-field"; PAD §4.2's two
  field-contract narrations cured (the completedAt drops narrated at the
  WH-13 truth); SKILL §20's three interface-reference narrations dropped;
  AGENTS' census bullet extended; SKILL v1.10.0→**v1.11.0** (description
  + provenance + §11 + §12 lesson 17). docs-counts GREEN 10/10; the full
  unit suite **318/318 (21 suites)**.
- **WP-4 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **318/318 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · `bun audit` ZERO.
- **WP-5 (captures):** all 16 re-taken from the dev server (one logged-in
  desktop session + one mobile session; 01 pristine login first; the
  goals capture at the inherited 2500ms settle; the drawer walk
  live-verified during capture 16 — the auto-close proof: the portal
  unmounted, zero role=dialog at /Exercise). md5: 16 unique, **16/16
  byte-stable vs the WH-12 set, 0 moved** — the data-layer-surgery
  prediction held exactly (07-events.png held too: same date, the
  today-cell did not move). `.env` ↔ `.env.example` parity re-verified
  (the AUTH_SECRET value only). The capture-script fix: capture-wh12.cjs
  carried a corrupted md5-destructure line from a post-run edit
  (restored in capture-wh13.cjs).
- **WP-6:** the worklog WH-13 entry + this record + docs/session_22.md.
- **WP-7 (pending at record time):** commit to main + the SSH-wrapper
  push (paramiko shim; key outside the repo; dry-run → push → remote
  verify → shred).
