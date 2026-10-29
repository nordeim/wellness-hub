# Session-2 Remediation Plan — the post-ship audit round

**Task ID:** WH-2 · **Date:** 2026-10-29 · **Branch:** `main` (only)
**Mission:** audit the shipped Wellness Hub clone (commit 5c3de25 + the
remote's doc commits), fix every identified gap, create
`wellness-hub_SKILL.md`, and push.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session):**
lint 0/0 · tsc 0 · unit 313/313 (16 suites) · `bun run build` OK ·
smoke 14/14 · e2e **42/42** (6 files — after the chromium 1248 install).

**Verified against the live reference (2026-10-29):** the reference's
mobile drawer opens with the same 11 nav items; the login card, dashboard
headings, and route set all still match. Tailwind v4 pins standing
(`@custom-variant hover`, `--shadow-sm`, `--blur-sm`). `.env` /
`.env.example` keys match exactly (`DATABASE_URL="file:../db/custom.db"` +
`db/` at the repo root). Sitemap (14 routes), robots.txt, manifest.json,
and the per-route OG/Twitter metadata family all verified standing.

**Findings (by severity):**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH** | The `/signup` page's live `<title>` is **"Sign up \| NEO CRM"** — a rebrand straggler from the CRM chassis; user-visible brand drift on the only SEO surface of the page (curl-verified: `<title>Sign up | NEO CRM</title>`). Its doc comments also reference the CRM-era "doubled suffix" pin, which no longer applies (the root template now reads `%s \| Wellness Hub`). | `src/app/signup/page.tsx:13` | Change the metadata title to `"Sign up \| Wellness Hub"`; refresh the stale comments. **TDD:** extend `tests/wellness-theme.test.ts` with a rebrand-pin that scans the whole `src/app` route layer for the string `NEO CRM` in `.tsx` page sources — RED against the current file, GREEN after the fix — so the residue can never return. |
| F-2 | **MEDIUM** | Doc count drift: every root doc says **41 e2e checks / 5 specs**; the actual battery is **42 checks / 6 files** (auth 11 + mobile-nav 6 + shell 6 + wellness-crud 10 + reset-password 8 = 41 in the named 5 specs, PLUS the `[setup]` project's 1 authenticate-demo-user entry = 42 total in 6 files). The PAD's distribution table also omits the setup project. | README badge + table + testing §, AGENTS commands table + gate order, CLAUDE build/test tables, PAD §8.1 + key-files | Update all four docs to "42 e2e checks (5 specs + the auth setup project)" and correct the PAD table with a setup-project row. |
| F-3 | **LOW** | `neo-crm_SKILL.md` (12,578 lines, the CRM's distillate) still sits at the repo root next to four docs that describe the wellness domain — it reads as a fifth canonical doc to any newcomer and is the wrong SKILL for this codebase. | repo root | Superseded this round by the new `wellness-hub_SKILL.md`; keep the file (it is the operator's distillate of the CRM chassis era and documents the chassis patterns the wellness app inherited) but note its status inside the new SKILL.md's provenance. No deletion — history is the operator's call. |
| F-4 | **Informational** | Internal identifiers keep the `neo_`/`neo-crm` names (`neo_session` cookie, `NEO_PROXY_HOPS`/`NEO_DISABLE_*` env vars, `__neoCrmPrisma` global, the timing-equalizer constant, `CHUNK_RELOAD_FLAG`). These are documented contracts in all four root docs (and the env vars are pinned by `boot-env.ts` + `.env.example`); renaming them now would churn every doc and test for zero user-visible gain. | `src/lib/{auth,db,password,rate-limit,chunk-recovery,boot-env}.ts` | **Declined** (documented decision): the identifiers are internal-only, contract-pinned, and invisible to users. Revisit only if the operator asks for a full rebrand. |
| F-5 | **Informational** | The reference site re-checked today: all 11 routes, the drawer behavior, the login card, and the dashboard remain in parity. No new reference-side surfaces since the build session. | live probe | No action needed. |

**Clean checks (no findings):**: ownership scoping on every `[id]` route
(`findFirst({ where: { id, userId } })` before every update/delete) ·
`requireSession` on every non-auth handler · rate limits on all public
auth routes + uploads · upload route pre-gates Content-Length before
buffering · sitemap/robots/manifest byte formats preserved · no
`console.log`/debug residue · no TODO/FIXME · no placeholder content ·
`.env.example` matches `.env` key-for-key · dark tokens, `@theme` literal
values, z-index scale all per contract.

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|---|---|
| 1 | **F-1 TDD pin**: write the `src/app` NEO-CRM rebrand scan into `tests/wellness-theme.test.ts` → confirm **RED** (the signup page trips it) | 1 RED |
| 2 | Fix `src/app/signup/page.tsx` (title + comments) → pin goes **GREEN** | GREEN |
| 3 | Full gate re-run: lint → typecheck → test (314 now) → build → smoke → e2e (42) | full green |
| 4 | **F-2 doc lockstep**: correct the e2e counts (42 / 5 specs + setup) across README, AGENTS, CLAUDE, PAD; add the setup row to PAD §8.1 | rg-verified |
| 5 | Refresh `docs/screenshots/` (desktop pages + the mobile set at 390×844, drawer open + drawer-navigation) from the remediated dev server | captures |
| 6 | **Create `wellness-hub_SKILL.md`** per `skills/distill-codebase-skill` + `skills/to-distill-project-into-skill` — the wellness-domain distillate (identity, contracts, pins, gates, provenance) superseding `neo-crm_SKILL.md` | skill |
| 7 | Update `worklog.md` (the WH-2 entry) + this plan's execution record | worklog |
| 8 | Commit to main; push via `docs/ssh_git_wrapper_v3.py` (paramiko shim; key outside the repo; dry-run then push; shred the key) | remote main |

## 3. Decisions (open questions, decided)

- **Unit count 313 → 314**: the F-1 pin adds exactly one test to
  `tests/wellness-theme.test.ts`; the docs' "313" mentions update in the
  same stroke (the count-the-things doctrine).
- **Screenshots**: refresh in place — the existing 16-file set is the
  right inventory; only pixels change.
- **`neo-crm_SKILL.md` retention**: kept as chassis-era provenance; the new
  `wellness-hub_SKILL.md` points at it and supersedes it for this tree.
