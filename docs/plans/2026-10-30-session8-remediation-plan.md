# Session-8 Remediation Plan — the member/export census round (WH-8)

**Task ID:** WH-8 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 7bb216c`: session_11.md —
the operator's WH-7 transcript push; the tree byte-identical to the WH-7 ship
state `af5b91c` apart from that doc), re-probe the live reference for new
surfaces, fix every identified gap with TDD, lockstep the five docs +
`worklog.md`, and push.

> **Provenance note:** the interrupted WH-8 session (workspace reset before
> commit) had landed its WP-1..WP-8 uncommitted; that work was lost with the
> sandbox. This plan RE-DERIVES the round from a fresh audit of `7bb216c`
> rather than reconstructing the lost diff — the findings ledger below is the
> fresh audit's, at one conscious widening (the ui-export census) beyond the
> interrupted session's five-item ledger.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the fresh
clone at `7bb216c`):** lint 0/0 · tsc 0 · unit **309/309 (21 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **42/42** · db census MATCH
(users=1 templates=11 steps=50 tutorials=12 badges=8) · `bun audit`
**9 (4 high / 4 moderate / 1 low)** — the exact documented WH-7 ship state.

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 10 nav pages + Profile walked. **ZERO new surfaces since
WH-7** — every page title matches the documented pattern
("Routines | EvolveWell", …; /Dashboard ships the bare "EvolveWell"); the
Account tab still read-only (name/email/role="user" disabled); Preferences
still the two checked checkboxes; Appearance unchanged (3 modes, 8 presets,
custom hex pair, font/background-image/style/animation comboboxes). The
**mobile drawer battery re-verified live at 390×844**: 11 items on the
reference; its drawer STAYS OPEN after a drawer-nav to /Exercise with NO
scroll-lock (its own quirk) while ours AUTO-CLOSES + releases the scroll-lock
(the e2e-pinned superset); the reference's empty sonner-toast overlay again
intercepted its own toggle click for automation (its quirk, not ours — ours
clicks cleanly).

**Findings (by severity) — the WH-8 ledger, the member/export classes the
earlier census pins do not reach:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **The store's dead members — SIX with zero production consumers:** the state fields `user` (write-only since WH-4's user-chip retirement — hydrate writes it, nothing reads it; the Profile page receives its `user` as a server prop) and `prefs` (written only by the dead `fetchPrefs`; the theme store owns the prefs surface via its own `/api/prefs` client — `syncPrefsFromServer()` in app-shell), plus the actions `refreshUser`, `fetchPrefs`, `updateWorkout`, `updateMoodEntry` (zero call sites anywhere — the exercise/mental-health pages destructure only create/delete). The interrupted session's grep-based census design false-negatived `user` (the word is everywhere) and `prefs` (the theme test + route-census string) — the extraction-based census below closes both holes honestly. | src/stores/wellness-store.ts | Retire all six; the store-member census (F-6) owns the class |
| F-2 | **LOW** | **CRM-era narration in live comments reading as live mechanics** (the WH-7 F-4 class, in the ui primitives + root faces): `tabs.tsx` narrates the variant consumers as "the Activities priority tabs and the Settings tabs", "the Reports tab bar", "space-y-6 on settings/reports; bare on activities", "mt-4 space-y-2 on activities, mt-2 space-y-4 on settings, mt-2 on reports", "the activities Overdue tab's red badge" — pages that never shipped in this domain (the only live consumer is the Profile page's segmented strip); `dialog.tsx` narrates the footer families as "(Lead/Account/Contact)" and "(Event/Activity)" and DialogDescription as staying "for our unverifiable-superset surfaces (the contacts scan-card dialog); entity-dialogs no longer renders it" — four wellness module pages DO render DialogDescription; `layout.tsx` cites the pipe-separator probe as "Accounts \| Wellness Hub" and `not-found.tsx` cites "/accounts" + "/about" — routes that never shipped here; `label.tsx` cites "the New Account dialog" as the measurement site. | tabs.tsx, dialog.tsx, layout.tsx, not-found.tsx, label.tsx | Reword at the wellness truth (name the live consumers; the Radix-contract facts stay) |
| F-3 | **MEDIUM** | **The advisory posture can go to ZERO — all 9 advisories clear with four version overrides** (registry-verified 2026-10-30): `vite` 8.3.0→**8.3.5** (clears the 6-advisory vite/launch-editor family: GHSA-9jrq-w75r-8gcw, GHSA-rq7h-c2jc-7f22, GHSA-698v-4r3x-3vcv, GHSA-r825-w8mm-5pxw, GHSA-587h-7wmj-h5pm, GHSA-vfpm-58rq-9qcg), `deepmerge-ts` 7.1.5→**8.0.2** (GHSA-ggr8-5vv4-36mx, the prisma CLI chain), `source-map-js` 1.2.1→**1.2.2** (GHSA-68fv-2mgg-jv7q, in-range for postcss ^1.2.1), `zod` nested 4.6.5→**4.6.7** (GHSA-mrhx-c7xc-m3w5, the eslint-plugin peer copy joins our direct 4.6.7). This SUPERSEDES the WH-7 "no patched target" triage: 4.6.7 IS now the fix target for the last copy too, and the WH-6/WH-7 "no-mid-rotation" posture yields to the audit-zero posture the overrides buy. deepmerge-ts 8 is an out-of-range force over @prisma/config's 7.1.5 pin — the prisma legs (db:push/generate/seed/census) must re-verify live post-override. | package.json overrides + bun.lock | The four overrides + reinstall; the lockfile-resolution pin (F-6) owns the posture offline; docs re-anchor |
| F-4 | **LOW** | **Four same-module data-feed exports with zero consumers anywhere (production, tests, scripts):** `SESSION_TTL_MS` (auth.ts — used twice same-module), `DEFAULT_DATABASE_URL` (db-path.ts — the effective-URL fallback), `proxyHopDepth` (rate-limit.ts — clientKey's helper), `applyTheme` (theme-store.ts — the store's own applier, ×4 same-module). The WH-7 value census module set stopped at page-layout/constants/format/wellness/site/schemas/page-parts; these four lived one layer wider (auth/db-path/rate-limit/theme-store). | auth.ts, db-path.ts, rate-limit.ts, theme-store.ts | Keep the code, drop the `export` keyword; the value-census module-set extension (F-6) owns the class |
| F-5 | **MEDIUM** | **Seven dead ui-module exports** (the ui layer's export surface was never census-pinned — WH-4 pinned module liveness, WH-7 the lib/shared value surface): `DialogPortal`, `DialogClose`, `DialogFooterWide` (dialog.tsx), `Textarea` (input.tsx), `SelectGroup`, `SelectLabel`, `SelectSeparator` (select.tsx) — zero consumers across src/tests/scripts. `DialogFooterWide`'s retirement orphans `DIALOG_FOOTER_WIDE` (page-layout.ts — its only consumer), which retires with it. | dialog.tsx, input.tsx, select.tsx, page-layout.ts | Retire all eight; the ui-export census (F-6) owns the class |
| F-6 | **Systemic (the round's TDD feature)** | **No pin for the store-member, ui-export or lockfile-resolution classes.** WH-7's value census reads `export const/function` declarations — the store's members live inside `WellnessState` (never an export site), and the ui modules export via `export { … }` blocks (invisible to the WH-7 regex). Nothing test-gates the advisory posture either (bun audit is network-bound; the gate must stay offline-runnable — but the LOCKFILE's resolved versions are offline-readable). F-1/F-4/F-5 are exactly these classes. | tests/ | **TDD:** (1) the store-member census — every `WellnessState` member consumed at a `useWellnessStore` call site (destructure or selector) in a production file outside the store; RED at birth with exactly the six F-1 names; (2) the ui-export census — every name in the six ui modules' export blocks has a consumer outside its own module (src+tests+scripts+prisma corpus); RED at birth with exactly the seven F-5 names; (3) the lockfile-resolution pin — bun.lock resolves vite 8.3.5, deepmerge-ts 8.0.2, source-map-js 1.2.2 and zod at exactly one 4.6.7; RED at birth against the shipping resolutions. All three cure GREEN in the same commit. |
| F-7 | Informational | **Declined (documented, not taken):** the tabs `underline`/`pill` variants and the `count` prop have zero call sites (the Profile page is the only Tabs consumer, `segmented`) — a component-API surgery the round declines: variant liveness is a different surface class needing its own pin, and the comment cure (F-2) already stops the dead variants from narrating live consumers. Deferred as the WH-9 candidate. | tabs.tsx | Document |

**Clean checks (no findings):** the full baseline gate · the reference probe
(zero new surfaces; the drawer battery green on the reference; the
documented quirks unchanged) · requireSession on every non-public handler ·
force-dynamic/force-static coverage · the SEO family (smoke check 12:
sitemap + robots + manifest 200) · the Tailwind v4 pins standing in
globals.css · `.env` ↔ `.env.example` byte-identical (rebuilt this session
from the example) · the vitest/playwright configs per contract · the db-path
contract (census MATCH) · zero TODO/console.log residue · zero
eslint-disable/ts-ignore/`as any` in src · zero bare `fetch` outside the
sanctioned sites · zero sync-setState-in-effect · the mobile battery
e2e-pinned (42/42 includes the drawer walk).

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the three new pins:** the store-member census + the ui-export census extend `tests/src-census.test.ts` (+2 checks); the lockfile-resolution pin lands in `tests/dead-deps.test.ts` (+1 check). Flip docs-counts' CANONICAL unitChecks 309→**312** in the same step (post-landing truth; the per-doc claim checks carry the ladder RED until WP-7). RED verified with exactly the predicted offenders: the six store members, the seven ui exports, the four lockfile resolutions | RED as predicted |
| 2 | **GREEN — F-1 (the store):** retire `user`, `prefs`, `refreshUser`, `fetchPrefs`, `updateWorkout`, `updateMoodEntry` from WellnessState + the implementation (hydrate's user write, logout's user/prefs clears, the dead CRUD update pair from the crud spreads, the `UserPrefs` type import — `User` stays for `call<User>`); the header comment's "session" narration cures with the edit | pin GREEN + typecheck + e2e |
| 3 | **GREEN — F-4 (the data feeds):** drop the `export` keyword from the four same-module feeds; extend `VALUE_CENSUS_MODULES` with the remaining lib seam modules (auth, boot-env, chunk-recovery, db-path, db, login-reset, password, rate-limit, utils, verification, verification-server) + `src/stores/theme-store.ts`, and widen that census's consumer corpus with scripts/ + prisma/ (their `runtimeDatabaseUrl`/`hashPassword`/`db` imports are production consumption — verified before the extension) | pin GREEN |
| 4 | **GREEN — F-5 (the ui exports):** retire `DialogPortal`, `DialogClose`, `DialogFooterWide` from dialog.tsx, `Textarea` from input.tsx, `SelectGroup`/`SelectLabel`/`SelectSeparator` from select.tsx, and the orphaned `DIALOG_FOOTER_WIDE` from page-layout.ts (its comment dies with DialogFooterWide — the F-2 cure lands here for dialog.tsx) | pin GREEN + e2e |
| 5 | **GREEN — F-2 (the comment cures):** tabs.tsx (variant consumers → the Profile strip; the wrapper/panel className examples → the live truth; the count-badge narration → the API fact), dialog.tsx (the footer families → the live dialogs; DialogDescription → the four module pages that render it), layout.tsx (the pipe probe example → "Dashboard \| Wellness Hub"), not-found.tsx (the /accounts + /about examples → the wellness routes), label.tsx (the measurement site → the module dialogs) | rg-verify: zero CRM-entity narration in live mechanics |
| 6 | **GREEN — F-3 (the overrides):** land `"overrides": { deepmerge-ts, source-map-js, vite, zod }` in package.json (bun-managed, not hand-edited lockfiles); `bun install`; verify `bun audit` → **0 vulnerabilities**; re-verify the prisma legs live (db:generate, db:push, db:seed, db:census — the deepmerge-ts 8 out-of-range force is the risk site); keep the trailing newline package.json's bun rewrite drops | audit ZERO + prisma legs live |
| 7 | **The count ladder + posture re-anchor:** unit 309→**312** / suites stay 21 at EVERY doc site (README badge + stack table + testing + superset · AGENTS commands + gate order · CLAUDE build table + test pyramid · PAD §3.2 tree + §8.1 infra row + totals + §8.4 checklist + §11 advisory row · SKILL §2 + §11); the advisory posture re-anchored WH-7→WH-8 in AGENTS + PAD §11 (9 accepted → ZERO via the four overrides; the lockfile pin owns it offline); SKILL v1.5.0→**v1.6.0** (description + provenance + §11 + §12 lesson 12) | rg-verified |
| 8 | **Full gate re-run:** lint → typecheck → test (312) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` ZERO | full green |
| 9 | **Captures:** re-take the 16-file screenshot set from the remediated dev server (one logged-in session; 01-12 at 1280×900, 13-16 at 390×844 — the drawer walk live-verified during capture 16); md5 uniqueness; F-1..F-5 touch zero visual surface (dead members, dead exports, comments, dev-dep overrides) so 01-15 expected stable vs the WH-7 set modulo deterministic-render noise; `.env` ↔ `.env.example` parity re-verify | captures |
| 10 | **worklog WH-8 entry + this plan's execution record + `docs/session_12.md`** (the round's transcript; the operator's session_11.md push never clobbered) | worklog |
| 11 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **Retire, don't keep (F-1):** the six store members follow the WH-6/WH-7
  doctrine — dead surface is drift liability; "kept for future use" is
  speculative surface. The `user` field's retirement is the conscious
  widening over the interrupted session's five-item ledger: the extraction
  census has no whitelist hole to explain, and `hydrate()`'s external
  behavior is identical (the `me.ok` check still gates the catalog load; no
  component ever read the field — the Profile page's `user` is a server
  prop, the (app) layout owns the guard).
- **The census is extraction-based, not word-grep:** the store-member census
  reads actual `useWellnessStore` call sites (destructure names + selector
  member accesses) in production files outside the store. This kills the
  fake-consumer class the interrupted session fought (route-census's
  `"prefs"` string, wellness-theme.test's "prefs" prose) by construction —
  string literals in test files are not destructures. Tests stay OUT of the
  store census corpus (the WH-4 doctrine: tests pin modules, they do not
  keep them alive).
- **The ui-export census counts tests as consumers** (the WH-7 value-census
  design): a ui export a test imports is alive; the seven retirees have zero
  consumers in src+tests+scripts+prisma (verified by scan before writing the
  pin).
- **The lockfile pin over an audit pin:** `bun audit` needs the network; the
  gate must stay offline-runnable (AGENTS doctrine). The lockfile's resolved
  versions ARE the posture, offline-readable — the pin asserts vite 8.3.5,
  deepmerge-ts 8.0.2, source-map-js 1.2.2, exactly-one zod at 4.6.7. An
  override removal or a resolution drift trips the unit gate, not a silent
  doc.
- **The override posture (F-3) supersedes WH-7's triage:** at WH-7 no
  patched zod target existed above 4.6.7 and the toolchain posture was
  "accept + re-triage". The four overrides change the calculus: ZERO
  advisories is strictly better, all four targets are the registry's latest
  (verified 2026-10-30), three of the four are in-range bumps, and the one
  out-of-range force (deepmerge-ts 8 over @prisma/config's 7.1.5 pin) is
  verified live through the prisma legs before the ship. e2e stability
  re-verified through the full gate re-run.
- **Declined (F-7):** the tabs variant/count-prop retirement — a component
  API surgery on a surface with no liveness pin; the comment cure stops the
  lie, the surgery waits for its own round. The e2e-visible behavior of
  every retired surface is covered by the existing battery (42 checks).
- **The count ladder (exact):** 309 + 1 (store census) + 1 (ui-export
  census) + 1 (lockfile pin) = **312 checks / 21 suites** (the src-census
  extension adds no suite; the lockfile pin rides dead-deps.test.ts). The
  e2e count stays 42; the smoke count stays 14.
- **The session file (WP-10):** the operator's numbering pushed
  session_11.md (the WH-7 transcript); this round's transcript file is
  `docs/session_12.md`, matching the house pattern.
- **Screenshots (WP-9):** refresh in place — the round touches zero visual
  surface; capture 01-15 expected byte-stable vs the WH-7 set (16 carries
  the standing timing-frame drift).

---

## 4. Execution record (2026-10-30, WH-8 — filled as executed)

- **Baseline gate GREEN pre-remediation (live, fresh clone at 7bb216c):**
  lint 0/0 · tsc 0 · unit 309/309 (21 suites) · build OK · smoke 14/14 ·
  e2e 42/42 · census MATCH · bun audit 9 (4h/4m/1l).
- **The reference probe: zero new surfaces; the drawer battery green on the
  reference (11 items, stays-open quirk, no scroll lock); the Account tab
  read-only; Preferences ×2; the sonner-overlay quirk re-observed.** — §1.
- **WP-1 (RED):** the three pins landed — the store-member census
  (extraction-based: destructure names + selector accesses at
  `useWellnessStore` call sites, production files only), the ui-export
  census (export-block names, src+tests+scripts+prisma corpus), and the
  lockfile-resolution pin (the four override versions + exactly-one zod).
  RED at birth with EXACTLY the predicted offenders: the six store members
  (user, prefs, refreshUser, fetchPrefs, updateWorkout, updateMoodEntry),
  the seven ui exports (DialogPortal, DialogClose, DialogFooterWide,
  Textarea, SelectGroup, SelectLabel, SelectSeparator), the vite 8.3.5
  resolution miss. docs-counts' CANONICAL flipped to 312/21 in the same
  step; the per-doc claim checks carried the ladder RED until WP-7 (the
  lockstep mechanism working as designed).
- **WP-2 (GREEN, F-1):** the six members retired — WellnessState lost
  `user`/`prefs` and the four dead actions; hydrate's two branches
  converged (the me probe now only gates the catalog bootstrap, with the
  convergence comment); logout's clear-set dropped the two dead fields;
  the `UserPrefs` type import died with fetchPrefs (`User` stays for
  `call<User>`); the crud spreads dropped the two dead update pairs.
- **WP-3 (GREEN, F-4):** the four feeds un-exported (SESSION_TTL_MS,
  DEFAULT_DATABASE_URL, proxyHopDepth, applyTheme — code kept, keyword
  dropped, the retirement noted in-comment); VALUE_CENSUS_MODULES widened
  to all 19 lib seam modules + theme-store (api.ts stays out — its own
  canonical-set pin owns it); the value census corpus widened with
  scripts/ + prisma/ (runtimeDatabaseUrl/hashPassword/db verified as
  production consumers first).
- **WP-4 (GREEN, F-5):** the seven ui exports retired — dialog.tsx keeps
  Dialog/DialogOverlay/DialogTrigger/DialogContent/DialogHeader/
  DialogFooter/DialogTitle/DialogDescription (DialogContent now rides
  DialogPrimitive.Portal directly); input.tsx exports Input only;
  select.tsx exports Select/SelectValue/SelectTrigger/SelectContent/
  SelectItem; the orphaned DIALOG_FOOTER_WIDE + DIALOG_TEXTAREA retired
  from page-layout with the retirement note.
- **WP-5 (GREEN, F-2):** the comment cures landed — tabs.tsx (the variant
  consumers now name the Profile strip; the wrapper/panel examples at the
  live truth; the count badge narrated as API surface), dialog.tsx (the
  footer family + DialogDescription's live consumers named), layout.tsx
  ("Routines | EvolveWell" probe example), not-found.tsx (the CRM route
  examples generalized), label.tsx (the measurement site). rg-swept: the
  only remaining CRM-entity mentions in src are the retirement notes
  themselves.
- **WP-6 (GREEN, F-3):** the four overrides landed in package.json
  (bun-install-managed); `bun update vite` forced the optional-peer
  re-resolution bun's override alone doesn't trigger (the stray
  dependencies entry it added was removed — vite is vitest's peer, not
  ours); `bun audit` → **No vulnerabilities found**; the prisma legs
  re-verified LIVE with deepmerge-ts 8.0.2 (db:generate, db:push,
  db:seed, db:census — all green, the out-of-range force is safe);
  package.json's trailing newline preserved; the description's em-dash
  restored after a python-rewrite escape (caught by the git diff review).
- **WP-7 (the ladder + re-anchor):** unit 309→312 / suites stay 21 at
  every doc site (README ×4, AGENTS commands + gate order + census bullet,
  CLAUDE ×2, PAD tree + §6.1 advisory row + §8.1 infra row 133→136 +
  totals + §8.4 checklist + §11 advisory row, SKILL §2 + §11); the
  advisory posture re-anchored WH-7→WH-8 (9 accepted → ZERO via the four
  overrides; the lockfile pin owns it offline); SKILL v1.5.0→v1.6.0
  (description + provenance + §11 pre-ship + §12 lesson 12: word-grep
  liveness censuses lie in both directions). docs-counts GREEN 9/9;
  rg-swept: zero live-tense 309s outside the exempt provenance history.
- **WP-8 (full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **312/312 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · `bun audit` **ZERO vulnerabilities**.
- **WP-9 (captures):** all 16 re-taken in one logged-in desktop session +
  one mobile session (01 pristine login first — the WH-7 procedure lesson
  applied; the drawer walk live-verified during capture 16: open →
  drawer-nav to /Exercise → AUTO-CLOSED). md5: 16 unique. **13 of 16
  byte-identical to the WH-7 set**; the three changed captures
  pixel-quantified benign: 10-learning (a 3×41px sliver, 0.000%), 12-profile
  (0.000%, sub-threshold), 16 (0.447%, the standing mobile-header
  timing-frame drift documented every round). Zero visual surface moved,
  exactly as predicted. .env ↔ .env.example parity verified (identical
  except AUTH_SECRET — the designed state).
- **WP-10:** the worklog WH-8 entry + this record + docs/session_12.md.
- **WP-11:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
