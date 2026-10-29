# Session-5 Remediation Plan — the doc-lockstep pin round

**Task ID:** WH-5 · **Date:** 2026-10-29 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ aec1ba8`: session_5.md —
the WH-4 conversation transcript), run the two standing WH-5 candidates
(the fresh-clone gate + the live reference re-probe), fix every identified
gap with TDD, lockstep the five docs + `worklog.md`, and push.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation):**
lint 0/0 · tsc 0 · unit **319/319 (19 suites)** · `bun run build` OK ·
smoke 14/14 · e2e **42/42** · db census MATCH (users=1 templates=11
steps=50 tutorials=12 badges=8).

**The fresh-clone gate (the standing WH-5 candidate #1 — run live this
session, per the web-application skill §15's "fresh-clone verification is
a periodic gate of its own"):** a pristine `git clone` at `aec1ba8` →
`bun install` (468 pkgs) → `cp .env.example .env` → `db:push` (client
generated) → `db:seed` (11/12/8) → census MATCH → tsc 0 → unit 319/319 →
build OK → **smoke 14/14 against the fresh standalone artifact** (incl.
the boot-gate probe + the artifact-hygiene check) → **e2e 42/42** → dev
boot: /login 200, demo login → `wellness_session` cookie, dashboard
`ok:true`, sitemap.xml served in the reference's byte format. **ZERO
findings — the pristine path works exactly as the README quickstart
documents.** The pruned standalone artifact validates end-to-end on a
clean machine.

**The live reference re-probe (the standing WH-5 candidate #2 — logged
in as the demo account, 2026-10-29):** ALL 10 nav pages + Profile walked
(dashboard's four zero stat tiles + four quick actions; Routines'
template catalog; Exercise/Mental Health/Assignments/Reminders stat
faces; Events' calendar ←/Today/→; Study Resources' search + 2
comboboxes; Learning's search + category filter + Watch Now cards;
Goals' New Goal + stats; Profile's Appearance/Account/Preferences tabs
with the 8 color presets). **ZERO new surfaces since WH-4.** The
Account tab is still READ-ONLY (three disabled fields: name /
email / role="user"). The mobile drawer at 390×844: the same 11 items
(10 nav + Profile & Settings footer), STAYS OPEN after drawer-nav (the
reference's own quirk; ours auto-closes — the documented superset),
Escape closes it. Our drawer walk: 11 items → drawer-nav → AUTO-CLOSE
(expanded released) + main scroll-lock released → Escape closes + lock
released. **Both apps' mobile headers compute `backdrop-filter:
blur(24px)`** (`backdrop-blur-xl` — parity verified live on both sides
this round). Our tokens live: `--blur-sm: 4px`, `--shadow-sm:
0 1px 2px 0` at 5% alpha (the A-1/A-2 re-pins render).

**Standing contracts re-verified:** the Tailwind v4 pins
(`@custom-variant hover` at globals.css:20, `--shadow-sm` :84,
`--blur-sm` :93, `@theme` literal-hex — the two `var()` hits inside the
`@theme` span are the pin's own comments) · `.env`
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ·
`.env`/`.env.example` byte-identical (both WELLNESS_*) · `force-dynamic`
on all 31 API route files (+3 `force-static` SEO routes = 34) ·
`requireSession` on every non-public handler (the 8 public: 7 auth +
health — the documented design) · the SEO family solid (14-route
sitemap in the reference's byte format, robots, manifest,
`src/app/icon.png` + `apple-icon.png` + `public/og-image.png`) · the
WH-4 cures coherent (zero NEO residue beyond one intentional history
comment; zero retired-surface residue beyond history notes + the guard
belts; seed writes `role: "user"` in both branches; 6 ui modules; 15
API families) · rate limits verified at code level (login 10 / signup
10 / resend 5 / verify 20 / forgot 10 / reset 10 per 15 min) · zero
TODO/console.log residue · DEPLOYMENT.md clean · census claims verified
(7 layout files · 19 unit suites · 5 e2e specs · 45 .tsx / 26 client ·
11 templates / 50 steps / 12 tutorials / 8 badges).

**The dependency-advisory posture (re-triaged live):** `bun audit` = **9
(4 high / 4 moderate / 1 low), ALL dev-toolchain transitive** — unchanged
from the WH-3/WH-4 ledger; zero runtime request-path chains.

**Findings (by severity) — every one is DOC drift; the code tree is
fully green:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **The "14 models" count claim is wrong — the schema has 15.** Five live-tense claim sites say "14 models" while `grep -c "^model" prisma/schema.prisma` = **15** AND every doc's own enumeration lists 15 items (User, Workout, MoodEntry, Assignment, Event, StudyResource, Reminder, Goal, Badge, UserBadge, RoutineTemplate, RoutineStep, UserRoutine, Tutorial, UserPrefs). PAD:264's decomposition "14 models: User + 11 owned entities + prefs singleton" doesn't even sum to 14 (truth: User + 10 owned entities incl. the UserPrefs singleton + 4 seeded content models = 15); PAD:408 says "Fourteen models in three genera" over a correct 1+10+4 enumeration. The claim survived four audit rounds because no pin enforces it — the exact "count the things" doctrine violation. | README.md:90, CLAUDE.md:222, Project_Architecture_Document.md:264+408, wellness-hub_SKILL.md:375 | Fix all five sites to 15 (+ the decomposition); the docs-counts pin (F-6) locks it |
| F-2 | LOW | **PAD §5.3's primitives enumeration is stale.** Lists "button (variants: default/outline/ghost/destructive), dialog + sheet, select, dropdown, tabs, toast (the z-[100] portal), input, card, skeleton" — but button/card/dropdown were deleted at WH-4, "skeleton" never existed in the wellness tree, and `label` (live) is missing. §3.2's tree comment was updated at WH-4; §5.3 was missed. | Project_Architecture_Document.md §5.3 | Rewrite at the six-live-primitives truth (dialog, input, label, select, tabs, toast; Radix rides dialog/select/label; the mobile drawer is the Radix Sheet built on the dialog primitive in mobile-nav.tsx) |
| F-3 | LOW | **SKILL §17's mobile-header claim is technically wrong.** "the glassy mobile header (`md:hidden` sticky, backdrop-blur-sm at the re-pinned 4px)" — the header's glass is `backdrop-blur-xl` (computed `blur(24px)`, the reference's own value — parity live-verified on BOTH apps this round); the `--blur-sm: 4px` re-pin serves the LOGIN CARD's glass (login-card.tsx, the A-2 story). SKILL §4/§9 carry the correct login-card claim; only §17 conflates the two. | wellness-hub_SKILL.md §17 | Fix §17: the header rides `backdrop-blur-xl` (24px, the reference's own); the 4px `--blur-sm` re-pin serves the login card |
| F-4 | LOW | **The z-map claims are stale in two docs.** AGENTS:140-141: "topbar z-40, drawer/dialogs z-50, dropdown portals z-[60], toasts z-[100]" — no `z-40` and no `z-[60]` class exists anywhere in src (the dropdown module retired at WH-4; the select is z-50). SKILL §18's topbar row: "Topbar / glass header \| z-40 \| src/components/layout/mobile-nav.tsx" — the header is **z-10** and lives in app-shell.tsx via `MOBILE_HEADER.bar` (page-layout.ts:60). Truth: header z-10 · drawer/dialogs/select z-50 · toasts z-[100]. | AGENTS.md:140-141, wellness-hub_SKILL.md §18 | Fix both at the z-10/z-50/z-[100] truth |
| F-5 | LOW | **next.config.ts:13-27 narrates the retired upload family in present tense** (the F-7 class): "the upload family's runtime-computed fs paths … make @vercel/nft fall back to tracing the WHOLE repo root" — the upload family is retired (WH-4); the excludes stay as hygiene belts (the smoke check 14 + the build script's `rm -f` double-cure). | next.config.ts:13-27 | Rewrite the narration at the wellness truth (the excludes are the standing artifact-hygiene belt; the upload cause is history); the entries STAY |
| F-6 | **Systemic (the round's TDD feature)** | **No docs-counts pin.** The web-application skill §14: "Test counts are documentation claims … the proven mechanism is neo-crm's `tests/docs-counts.test.ts`, which puts every live-tense count site under the unit gate: a stale count anywhere fails `bun run test`." F-1..F-4 are exactly this drift class — four rounds of proofreading did not catch what a pin would have. | tests/ | **TDD:** `tests/docs-counts.test.ts` — compute the tree's counts live (models=15, API families=15, ui modules=6, .tsx=45, client=26, unit suites=N, e2e specs=5, layout components=7) vs canonical literals + assert each of the five docs carries its canonical claims + forbid the known-wrong forms ("14 models"). RED at birth on F-1 → cure the docs → GREEN |
| F-7 | Informational | `bun audit` 9 (4h/4m/1l) — all dev-toolchain transitive; unchanged from WH-4 | the toolchain | No action; the PAD §11 ledger row re-anchored at WH-5 |

**Clean checks (no findings):** the full baseline gate · the fresh-clone
gate (ZERO findings) · the reference probe (zero new surfaces; mobile-nav
parity on both apps; Tailwind pins live) · the WH-4 cures coherent ·
ownership scoping · the envelope discipline · the store patterns · the
configs (vitest/playwright/postcss/next/tsconfig/eslint) · the db-path
contract · the SEO family · rate limits · `.env`↔`.env.example` parity ·
zero TODO/console.log residue · no stray untracked files.

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — `tests/docs-counts.test.ts` first:** the canonical-counts table (models 15 · API families 15 · route files 31+3 · ui modules 6 · .tsx 45 / client 26 · unit suites (computed) · e2e specs 5 (computed) · layout components 7 · unit checks (literal, the count-ladder rule) · e2e checks 42 · smoke 14 · seed 11/50/12/8) — tree-computed counts must equal the canonicals; each of the five docs must carry its canonical claims; the forbidden forms ("14 models") absent. RED at birth via F-1 (5 doc sites) | RED |
| 2 | **GREEN — the doc cures:** the five "14 models" sites → 15 (+ PAD:264's decomposition "User + 10 owned entities (incl. the UserPrefs singleton) + 4 seeded content models"; PAD:408 "Fifteen") · PAD §5.3 → the six live primitives · SKILL §17 → backdrop-blur-xl (24px, the reference's own — parity-verified) with the 4px re-pin credited to the login card · AGENTS z-line + SKILL §18 topbar row → z-10 header (app-shell via MOBILE_HEADER.bar) / z-50 drawer+dialogs+select / z-[100] toasts, no z-40/z-[60] mention · next.config.ts narration → the wellness truth (history kept, entries stay) | pin GREEN |
| 3 | **The count ladder:** run the unit suite → the new total (319 + the docs-counts checks) and the new suite count (19→20); update EVERY count site in the same commit (README badge + Testing, AGENTS table + gate order, CLAUDE tables, PAD §8.1/§8.4, SKILL §2/§11 + the pin's own canonical literal) | rg-verified |
| 4 | **SKILL v1.3.0 + PAD ledger:** the provenance block's WH-5 re-validation line (the fresh-clone gate green, the reference probe zero-new-surfaces, the docs-counts pin landed, the four doc-drift cures) · §11's count-recheck line names the pin · §12 lesson 9 ("count claims need a pin, not a proofread" — the 14-models claim survived four proofread rounds while every doc's own enumeration listed 15) · §14/§16 as needed · PAD §11 the audit row re-anchored at WH-5 + the docs-counts row added | rg-verified |
| 5 | **Full gate re-run:** lint → typecheck → test (exact new count) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` re-triage | full green |
| 6 | **Captures:** re-take the 16-file screenshot set from the remediated dev server (one logged-in session, md5-verified uniqueness); `.env`↔`.env.example` parity re-verify | captures |
| 7 | **worklog + this plan's execution record + `docs/session_6.md`** (the round's transcript for the operator — session_5.md is the operator's own push, not clobbered) | worklog |
| 8 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim on PATH — no ssh binary in this sandbox; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **The docs are the rotting surface; the pin is the cure (F-6):** four
  remediation rounds cleaned the code to fully-green (this round's audit
  found ZERO code findings — every finding is doc drift). The
  web-application skill §19's "documentation is a product surface: stale
  docs are bugs" + §14's count-lockstep mechanism (neo-crm's
  `tests/docs-counts.test.ts`) is the proven cure: convert the five
  docs' live-tense count/technical claims from "proofread each round"
  to "tested contract". The pin computes what the tree can compute
  (models, families, modules, files, suites, specs) and keeps the
  non-computable totals (unit checks, e2e checks, smoke checks, seed
  rows) as canonical literals under the same-commit count-ladder rule
  the pin itself enforces.
- **Pin scope — presence-of-truth, not absence-of-error:** the pin
  asserts each doc CARRIES its canonical claims (lockstep enforcement)
  and forbids only unambiguously-wrong forms ("14 models"). It does NOT
  parse prose or forbid rewording — a doc may rephrase freely as long
  as the canonical numbers stay present. History sections (SKILL's
  provenance block, worklog, plans) are exempt by construction: the pin
  reads only the five docs, and the forbidden forms are chosen so they
  never appear in legitimate history (the model count never was 14).
- **15 is the truth (F-1):** verified twice — `grep -c "^model"` = 15
  and every doc's own genus enumeration lists 15 items. The
  decomposition: User (1) + owned entities (10: Workout, MoodEntry,
  Assignment, Event, StudyResource, Reminder, Goal, UserRoutine,
  UserBadge, UserPrefs-the-singleton) + seeded content (4: Badge,
  RoutineTemplate, RoutineStep, Tutorial) = 15.
- **The z-map truth (F-4):** `MOBILE_HEADER.bar` = `sticky top-0 z-10
  md:hidden … backdrop-blur-xl` (page-layout.ts:60, rendered by
  app-shell.tsx:73); the drawer/dialogs/select are z-50; toasts
  z-[100]. No z-40 or z-[60] class exists in src. AGENTS' z-line and
  SKILL §18's topbar row update to this; mobile-nav.tsx's own
  comment ("the sheet z-50, below toasts 100") is already correct.
- **The header-blur truth (F-3):** both apps' headers compute
  blur(24px) (`backdrop-blur-xl`) — parity live-verified this round.
  SKILL §17's claim that the header carries the 4px `--blur-sm` re-pin
  is wrong; the re-pin serves the login card (SKILL §4/§9 + AGENTS +
  globals.css:89 all already carry the correct login-card claim).
- **The count ladder (WP-3):** the pin lands as suite #20 → the suite
  count 19→20 and the check count 319→319+N everywhere in the same
  commit; the pin's own canonical literal updates with the ladder
  (write the suite with the provisional literal → run → set the final
  total → update every site including the pin → re-run → GREEN). The
  e2e count stays 42 (no spec changes); the smoke count stays 14.
- **next.config.ts narration (F-5):** the excludes entries STAY (the
  smoke check 14 + the `rm -f .env` double-cure are the standing
  belts); only the present-tense "the upload family … make" narration
  becomes the history-carrying wellness truth.
- **Screenshots (WP-6):** refresh in place — no visual surface changes
  this round (every finding is docs/tests/comments), but the captures
  are the operator's standing ask; the 16-file inventory + canonical
  names stay.
- **The session file (WP-7):** the operator's numbering pushed
  session_5.md (the WH-4 conversation's transcript) — this round's
  transcript file is `docs/session_6.md`, matching the WH-4 pattern
  (the round writes its own session file in the house style).

---

## 4. Execution record (2026-10-29, WH-5 — filled as executed)

- **Baseline gate GREEN pre-remediation** (live): lint 0/0 · tsc 0 ·
  unit 319/319 (19 suites) · build OK · smoke 14/14 · e2e 42/42 ·
  census MATCH.
- **The fresh-clone gate GREEN** (live, zero findings) — see §1.
- **The reference probe: zero new surfaces; mobile parity both apps;
  the Tailwind pins live** — see §1.
- **WP-1 (RED):** `tests/docs-counts.test.ts` born with 9 checks (3
  tree-computed · 5 per-doc claims · 1 forbidden-forms); RED at birth
  with exactly the predicted offenders — 6 failing (all 5 per-doc
  claim checks + the forbidden-forms check listing all 9 stale hits:
  "14 models" ×5 docs, "Fourteen models", "button (variants",
  "topbar z-40", "dropdown portals z-[60]", "backdrop-blur-sm at the
  re-pinned 4px"); the 3 computed checks GREEN at birth (canonicals
  set to the post-landing truth: suites=20 incl. the pin itself).
- **WP-2 (GREEN — the doc cures):** the five 14-models sites → 15
  (+ PAD:264's decomposition + PAD:408 "Fifteen") · PAD §5.3 → the six
  live primitives · SKILL §17 → backdrop-blur-xl (the reference's own
  24px; the 4px re-pin credited to the login card) · AGENTS' z-line +
  SKILL §18's topbar row → the z-10 header truth · next.config.ts's
  narration → the wellness truth (the excludes stay as the belt) →
  the pin GREEN 9/9. **Two self-catches at the re-run:** the pin
  caught the round's own lesson-9 prose quoting the forbidden form
  (reworded to the hyphenated "14-models" — the WH-4 lesson-echo
  repeated), and a DOC_CLAIMS key typo (PAD without `.md`) — both
  cured before GREEN.
- **WP-3 (the count ladder):** unit 319→328 (+9) / suites 19→20;
  every count site updated in the same commit (README badge + stack
  table + testing + superset ledger · AGENTS commands + gate order +
  the new docs-counts pin bullet in testing conventions · CLAUDE
  build table + test pyramid · PAD §3.2 tree + §8.1 infra row
  8/121→9/130 + totals + §8.4 · SKILL §2 + §11 + §20); rg-swept: the
  remaining 319/19-suite mentions in the doc set are exclusively the
  intentional history (SKILL's provenance + the WH-5 lesson).
- **WP-4:** SKILL v1.2.0→v1.3.0 (description + the WH-5 provenance
  line) · §11's count-recheck line names the pin · §12 lesson 9
  ("count claims need a pin, not a proofread") · AGENTS' advisory
  posture re-anchored (WH-3→WH-5 round) · PAD §11's audit row
  re-anchored.
- **WP-5 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **328/328 (20 suites)** · build OK · smoke 14/14 · e2e 42/42 ·
  census MATCH · `bun audit` 9 (4h/4m/1l) — the posture unchanged,
  re-anchored at WH-5.
- **WP-6 (the captures):** all 16 re-taken in one logged-in session
  (01-12 at 1280×900; 13-16 at 390×844 — the drawer walk live-verified
  during the capture: open → 11 items → drawer-nav → AUTO-CLOSED);
  md5: 16 unique; **captures 01-15 byte-identical to the WH-4 set**
  (git shows only 16-mobile-drawer-nav-exercise.png changed —
  deterministic rendering, zero visual surface moved this round);
  `.env` ↔ `.env.example` byte-identical. **One capture slip caught
  and cured:** agent-browser resolves relative paths against its own
  daemon CWD, not the shell's — the first 16 files landed at the repo
  root and were moved into `docs/screenshots/` (verified by md5 +
  git's byte-identical diff).
- **WP-7:** the WH-5 worklog entry + this record +
  `docs/session_6.md`.
- **WP-8:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
