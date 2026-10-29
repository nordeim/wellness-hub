# Session-4 Remediation Plan — the dead-surface retirement round

**Task ID:** WH-4 · **Date:** 2026-10-29 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 25e46fa`: session_3.md +
the prompt-to-review-3 touch-up), fix every identified gap with TDD,
lockstep the five docs + `worklog.md`, and push.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation):**
lint 0/0 · tsc 0 · unit **316/316 (17 suites)** · `bun run build` OK ·
smoke 14/14 · e2e **42/42** (5 specs + the auth setup project) · db census
MATCH (users=1 templates=11 steps=50 tutorials=12 badges=8) at
`<repo>/db/custom.db`.

**Verified against the live reference (2026-10-29, this session, logged in
as the demo account):** the reference's Profile → **Account tab is
READ-ONLY** (three disabled textboxes: name / email / **role="user"**) —
no editable Full Name, no photo upload, exactly our own construction. Its
mobile drawer (390×844, opened via JS — its own fixed header covers its
toggle's click point, the known reference-side quirk): **the same 11
items** (10 nav + the Profile & Settings footer), STAYS OPEN after
drawer-navigation (ours auto-closes — the documented kept superset),
Escape closes it. Its dashboard carries the same four zero stat tiles +
the four quick actions. **No upload surface and no avatar surface exists
anywhere on the reference.**

**Standing contracts re-verified:** the Tailwind v4 pins
(`@custom-variant hover` at globals.css:20, `--shadow-sm` re-pin at :84,
`--blur-sm` re-pin at :93) + live probes (the mobile header glass blur
renders; the drawer family e2e-pinned) · `.env`
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ·
`.env`/`.env.example` byte-identical · `force-dynamic` on all 34 API route
files (+3 `force-static` SEO routes = 37) · the SEO family solid (14-route
sitemap in the reference's byte format, robots, manifest, per-route
OG/Twitter via `pageMetadata()`, `/icon.png` + `/apple-icon.png` +
`/og-image.png` all present) · `requireSession` on every non-auth handler ·
the WH-2 signup-title fix + the WH-3 dead-dep census pin standing · zero
TODO/console.log residue · zero console errors across our live walk.

**The dependency-advisory posture (re-triaged live):** `bun audit` = **9
(4 high / 4 moderate / 1 low), ALL dev-toolchain transitive** —
deepmerge-ts via the prisma CLI, vite/launch-editor via vitest, the nested
zod@4.6.5 via eslint-plugin-react-hooks (our runtime zod is 4.6.7 — safe,
verified via `bun pm ls --all`), source-map-js via postcss. Unchanged from
the WH-3 ledger; zero runtime request-path chains.

**Findings (by severity):**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH** | **The dead users/uploads API surface cluster.** `GET /api/users` — the CRM-era "Owners list (for filter dropdowns + rep leaderboards)": zero consumers in the client (the store, every component, every page — grep-verified), and its comment is outright false for a single-user wellness domain. `PATCH /api/users` — the profile name/photo update: zero consumers; the reference's own account card is read-only (live-probed this session). `POST /api/upload` + `GET /api/uploads/[name]` — zero consumers; no upload surface exists on the reference; the only `photoUrl` writer is the dead PATCH and **nothing renders photoUrl** (the Avatar component that would render it is itself dead). The chain: `src/lib/uploads.ts` (consumed only by the dead routes), `profileUpdateSchema` (only the dead PATCH), the `User.photoUrl` + `User.avatarColor` columns, the `SessionUser` fields, `NAME_COLORS` at signup (only feeds the dead avatarColor), the `AppShell.user` prop (accepted, never rendered — the wellness reference has NO topbar avatar; its sidebar carries the whole nav). | `src/app/api/users/`, `src/app/api/upload/`, `src/app/api/uploads/`, `src/lib/uploads.ts`, `src/lib/schemas.ts`, `src/lib/auth.ts`, `src/app/api/auth/login/route.ts`, `prisma/schema.prisma`, `src/components/layout/app-shell.tsx` | **TDD:** a route-family census pin (RED at birth with the 3 dead families present) → retire the 3 route dirs + the uploads lib + the schema fields + the prop → `db:generate` + `db:push` (both scratch DBs re-push in their own setups) → doc lockstep (17→15 route families, the uploads rows retire) |
| F-2 | **HIGH** | **The signup CRM-role bug.** `src/app/api/auth/signup/route.ts:84` writes `role: count === 0 ? "admin" : "rep"` — fresh signups get NEO-CRM role vocabulary ("admin"/"**rep**") instead of the reference's own value ("**user**", live-probed on its account tab). The demo user is seeded `"user"` (correct), so the bug is invisible on the demo account but hits every fresh deployment: the first signup becomes "admin", everyone else becomes "rep" — a visible parity break on the Profile → Account tab. The `db.user.count()` query (line 68) exists only to feed this and the dead avatarColor assignment. No test pins the role values (grep-verified); no route gates on role (display-only, the reference's model). | `src/app/api/auth/signup/route.ts` | **TDD:** a signup-source pin (`role: "user"` present; `"rep"`/`"admin"`/`db.user.count` absent — RED at birth) → the cure (drop the count query + NAME_COLORS + the ternary; write `role: "user"`) → GREEN |
| F-3 | **HIGH** | **Seven dead CRM-era UI modules + a four-package cascade.** Zero importers repo-wide (grep-verified against every import form): `src/components/ui/avatar.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `dropdown.tsx`, `icons.tsx`, `table.tsx`. The wellness pages were built on `page-parts` (GradientButton/OutlineButton/SectionCard/StatCard) + the six live primitives (dialog, input, label, select, tabs, toast). Retiring the seven orphans four npm packages (their only importers are dead modules): `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `@radix-ui/react-slot`, `class-variance-authority`. | `src/components/ui/`, `package.json` | **TDD:** the WH-3 dead-dep census pin (`tests/dead-deps.test.ts`) goes RED with exactly the 4 orphaned packages after the module deletion → `bun remove` the four → clean reinstall (the WH-3 nested-copy lesson) → GREEN; a ui-module census pin locks the live set at 6 |
| F-4 | **MEDIUM** | **The NEO_* naming residue** (the round WH-3 itself suggested as "a natural WH-4 candidate"). CRM-era names on wellness mechanics: the env knobs `NEO_PROXY_HOPS` / `NEO_DISABLE_IN_APP_OTP` / `NEO_DISABLE_IN_APP_RESET` (boot-env's KNOWN set, rate-limit, signup/resend/forgot routes, playwright.config, `.env`, `.env.example`), the `neo_session` cookie (`auth.ts` + the auth.test pin + smoke check 06), the `neo-crm-dev-only-insecure-secret` dev fallback secret, the `__neoCrmPrisma` global (`db.ts`), the `neo-crm:chunk-reload-at` storage flag (`chunk-recovery.ts` + its pin). Historical references in comments (the digma/s-family provenance notes) stay as history — only CURRENT-mechanics names change. | 12 source files + 5 test files + smoke + playwright config + both env files | **TDD:** flip the existing pins first (auth.test SESSION_COOKIE, chunk-recovery CHUNK_RELOAD_FLAG, boot-env KNOWN set, auth-reset's env knob — all RED) → rename in the source (WELLNESS_* env knobs, `wellness_session`, the wellness dev secret, `__wellnessPrisma`, `wellness:chunk-reload-at`) → GREEN · **breaking-change note**: live sessions die once; deployments rename their env knobs (fail-closed defaults protect the seams meanwhile) |
| F-5 | LOW | The lockfile's stale `"activity-map"` workspace name (bun.lock:6 vs package.json "wellness-hub") — carried metadata from a pre-history workspace | `bun.lock` | Probe whether `bun install` syncs the name; if it demands a full lockfile regen, keep the WH-3 inert-metadata posture and document it in the ledger |
| F-6 | Informational | `bun audit` 9 (4h/4m/1l) — all dev-toolchain transitive; unchanged from WH-3 | the toolchain | No action; the PAD §11 ledger row re-anchored at this round |
| F-7 | LOW | **CRM-era comment residue** (the WH-3 F-3 class): (a) `src/lib/api.ts:60-75` — the `MAX_AUTH_BODY_BYTES` block enumerates the CRM's route family ("THIRTEEN routes (accounts/activities/contacts/events/leads x[root+[id]] + settings + users + reset)") — not one of those routes exists in the wellness tree; (b) `tests/auth-contract.test.ts:72` cites `tests/parse-body.test.ts` — a file that does not exist (the parseBody pins live in auth-contract itself); (c) the `.gitignore` `/uploads/` block's comment still narrates the retiring UploadFile mirror | the three files | Rewrite each at the wellness truth (the uploads guard entries STAY as belts — the gitignore line + the smoke-14 artifact check keep guarding; only the narration changes) |

**Clean checks (no findings):** ownership scoping on every `[id]` route ·
`requireSession` coverage (34/34) · the API envelope discipline · the SEO
family · the mobile-nav battery (re-verified live BOTH apps this round) ·
the Tailwind pins · the configs (vitest/playwright/postcss/next/tsconfig/
eslint) · the db-path contract · zero TODO/console.log residue · scripts/
all referenced · `.env`↔`.env.example` parity · no stray untracked files.

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the census + contract pins first:** (a) `tests/route-census.test.ts`: the API route-family census (the EXACT expected 15-family set — RED at birth with 18 dirs) + the ui-module census (the EXACT 6-module set — RED at birth with 13) + the layout/shared/lib module liveness census; (b) the signup-source pin (`role: "user"`, no count/NAME_COLORS — RED); (c) the pin-flips: auth.test SESSION_COOKIE → `wellness_session`, chunk-recovery CHUNK_RELOAD_FLAG → `wellness:chunk-reload-at`, boot-env KNOWN set → the WELLNESS_* trio, auth-reset's knob → `WELLNESS_DISABLE_IN_APP_RESET` (all RED) | RED ×7+ |
| 2 | **F-2 cure (GREEN):** the signup route writes `role: "user"`; the count query + NAME_COLORS + the ternary retire | pin GREEN |
| 3 | **F-1 cure (GREEN):** delete `src/app/api/users/`, `src/app/api/upload/`, `src/app/api/uploads/`, `src/lib/uploads.ts`, `src/components/ui/avatar.tsx`; drop `profileUpdateSchema` from schemas.ts; drop `avatarColor`+`photoUrl` from `prisma/schema.prisma` (User keeps id/email/name/passwordHash/verification\*/tokenVersion/resetToken\*/role), `SessionUser`, the login select, `src/types` User; drop the `AppShell.user` prop; `bun run db:generate` + `bun run db:push`; the route-census pin GREEN | pin GREEN |
| 4 | **F-3 cure (GREEN):** delete the remaining 6 dead ui modules (badge/button/card/dropdown/icons/table); the dead-deps census goes RED with exactly 4 → `bun remove @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-slot class-variance-authority` → clean reinstall + `db:generate` (the WH-3 lesson) → GREEN | pin GREEN |
| 5 | **F-4 cure (GREEN):** the de-NEO rename — `WELLNESS_PROXY_HOPS`/`WELLNESS_DISABLE_IN_APP_OTP`/`WELLNESS_DISABLE_IN_APP_RESET` (boot-env KNOWN set + rate-limit + signup/resend/forgot routes + playwright.config + login-card comments), `wellness_session` (auth.ts), the wellness dev secret, `__wellnessPrisma` (db.ts), `wellness:chunk-reload-at` (chunk-recovery.ts), the smoke check 06 grep, `.env` + `.env.example` | pins GREEN |
| 6 | **Doc lockstep:** README (17→15 families, the api tree, the env table NEO_*→WELLNESS_*), AGENTS (the uploads bullet retires, the rate-limit line drops "uploads 20", the env knobs, the counts), CLAUDE (rate limits, env table), PAD (§2 topology 17→15 + the uploads FS node, §3.2 tree, §4.1/§4.2 avatarColor/photoUrl, §6.1 uploads row + §6.4 traversal row, §6.2 uploads util, §9.2 env table, §11 ledger F-6 row), SKILL (§2/§3 the env contract, the User model row, the rate-limiter row, §12/§19/§20 as needed, frontmatter v1.1.0→v1.2.0 + provenance) + every count site (316→N / 17→M suites) in the same commit | rg-verified |
| 7 | **Full gate re-run:** lint → typecheck → test (exact new count) → build → smoke (check 06 renamed) → e2e (42; the storageState re-mints under the renamed cookie via the setup project) + db census + `bun audit` re-triage + the F-5 lockfile-name probe | full green |
| 8 | **Captures:** re-take the 16-file screenshot set from the remediated dev server (one logged-in session, md5-verified uniqueness); `.env`↔`.env.example` bidirectional parity re-verify (both now WELLNESS_*) | captures |
| 9 | **worklog + this plan's execution record** + `docs/session_4.md` (the round's transcript for the operator) | worklog |
| 10 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim on PATH — no ssh binary in this sandbox; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **Retire, don't keep (F-1/F-3):** the WH-3 round framed the uploads
  family as "a superset kept from the scaffold" — this round's live probe
  settles it: the wellness reference has NO upload surface and NO avatar
  surface (read-only account card, URL-based study resources, no upload UI
  anywhere on any probed page). A superset nothing can reach is not a
  feature — it is dead attack surface plus a maintenance lie. The
  web-application skill's dependency discipline ("every dependency must
  have a live import; the family repeatedly found and retired zero-import
  scaffold packages") extends to route families and UI modules the same
  way WH-3 extended it to packages. The `/api/users` GET's own comment
  ("rep leaderboards") is CRM vocabulary — indefensible in this domain.
- **The role column stays; the values fix (F-2):** the reference displays
  role="user" on its account tab — the column + the display are parity;
  only the CRM-era assignment values change. No gate exists on role
  (display-only) so the fix is behavior-invisible beyond the Account tab.
- **avatarColor retires with photoUrl (F-1):** its only renderer (the
  Avatar component) is dead and the reference has no avatar-color surface;
  carrying set-but-never-rendered data is the same dead-surface class.
  The `User` model keeps exactly what the surfaces consume:
  id/email/name/role + the auth funnel fields.
- **The de-NEO scope (F-4):** rename the CURRENT mechanics (env knobs,
  cookie, dev secret, prisma global, chunk flag) to the app's own
  namespace (`WELLNESS_*`, `wellness_session` — the web-application
  skill's `<APP>_*` pattern); KEEP the historical provenance comments
  (the digma/s-family session notes) — they are history, not drift. The
  breaking change (one forced logout per live session; deployments rename
  their env knobs) is documented in `.env.example`, the worklog and the
  commit message. The fail-closed defaults (unparsable hops → 1; unset
  kill-switches → demo delivery) keep every seam safe during the rename.
- **The Prisma column drop is safe:** both columns are dead/unrendered;
  the dev db re-pushes with `--accept-data-loss` (the pinned script); the
  e2e + smoke scratch DBs re-push schema in their own setups (verified);
  the seed writes neither field (verified).
- **Count ladder:** pins retire (-2 upload pins in auth-contract) and new
  suites land (the census suite); the exact new unit count is computed
  after the edits and EVERY count site (README badge, AGENTS table, CLAUDE
  tables, PAD §8, SKILL) updates in the same commit (`rg "316|17 suites"`
  the doc set). The e2e count stays 42 (no spec changes — the storageState
  re-mints under the renamed cookie via the setup project's fresh login).
- **Screenshots:** refresh in place — no visual surface changes this round
  (the retired routes/modules were unreachable), but the captures are the
  operator's standing ask; the 16-file inventory + canonical names stay.
- **F-5 (the lockfile name):** probe `bun install` first; a full lockfile
  regen is NOT worth the version-drift risk for inert carried metadata —
  if the probe shows no clean sync, the WH-3 inert-metadata posture stands
  and the ledger row says so.

---

## 4. Execution record (2026-10-29, WH-4 — filled as executed)

- **Baseline gate GREEN pre-remediation** (live): lint 0/0 · tsc 0 · unit
  316/316 (17 suites) · build OK · smoke 14/14 · e2e 42/42 · census MATCH.
- **WP-1 (RED):** 15 failing checks across 6 suites at peak — the two new
  suites (route-census ×3 RED at birth: 18 dirs / 13 ui modules / 10
  liveness offenders; signup-role ×2 RED at birth) + the four flipped
  pin-sites (auth ×3 incl. the DEV_SECRET constructions, boot-env ×5,
  chunk-recovery ×1, auth-reset ×1).
- **WP-2 (GREEN):** signup writes `role: "user"`; the count query +
  NAME_COLORS + ternary retired; pin 2/2 GREEN.
- **WP-3 (GREEN):** the 3 route dirs + `uploads.ts` + `avatar.tsx` +
  `profileUpdateSchema` + the Prisma columns + the SessionUser/types/
  login-select/AppShell-prop cleanups + the auth-contract upload pins
  retired; `db:generate` + `db:push` (dev db); route-census GREEN (15
  families). **Post-crash resume catches:** (a) `prisma/seed.ts` still
  wrote `avatarColor` in both upsert branches — the plan's "the seed
  writes neither field (verified)" claim was WRONG; cured before the
  push; (b) the stale `.next/types/validator.ts` (still importing the
  deleted routes) tripped typecheck — cleared by `rm -rf .next` before
  the fresh build.
- **WP-4 (GREEN):** the 6 remaining ui modules deleted; dead-deps census
  RED with exactly the 4 predicted packages; `bun remove` + the clean
  reinstall (`rm -rf node_modules && bun install`) + `db:generate` (the
  WH-3 fresh-node_modules lesson); both census pins GREEN.
- **WP-5 (GREEN):** the full de-NEO rename landed (source + tests +
  playwright config + smoke 06 + both env files + the timing-equalizer
  constant); the five flipped suites 99/99 GREEN (rate-limit.test.ts's
  hop knobs flipped WITH the source — the resume's coherence catch #2);
  historical provenance comments kept.
- **WP-5b (GREEN):** api.ts's route-family comment rewritten at the
  wellness truth; .gitignore narration rewritten (guard stays as a
  belt); auth-contract's stale citation was already cured pre-crash.
- **WP-6:** the doc lockstep complete (all five docs + every count
  site; the resume live-counted the .tsx census: 45 files / 26 client —
  both doc claims updated; SKILL §18's z-map row was doubly stale —
  select ships z-50, dropdown is dead — corrected; PAD §8.1 now carries
  exact per-row counts 109+89+121=319; SKILL v1.2.0 + the reversed
  rename decision documented in §3).
- **WP-7 (full gate, live):** lint 0/0 · tsc 0 · unit **319/319 (19
  suites)** · build OK · smoke **14/14** (check 06 greps
  `wellness_session`) · e2e **42/42** (storageState re-minted under the
  renamed cookie) · census MATCH · `bun audit` 9 (4h/4m/1l) unchanged ·
  the F-5 probe: `bun install` does NOT sync the lockfile workspace
  name — the inert-metadata posture stands (PAD §11 ledger row added).
- **WP-8:** all 16 captures re-taken (one logged-in dev-server session;
  01–12 at 1280×900, 13–16 at 390×844 with the drawer walk re-verified:
  open → 11 items → /Exercise → auto-close, zero console errors);
  md5-verified 16 unique; `.env` ↔ `.env.example` byte-identical (both
  WELLNESS_*, AUTH_SECRET="" placeholder posture).
- **WP-9:** worklog WH-4 entry + this record + `docs/session_4.md`.
- **WP-10:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
