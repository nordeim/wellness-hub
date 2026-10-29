# Session-10 Remediation Plan — the docs-counts pin-gap round (WH-10)

**Task ID:** WH-10 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 664c276`: session_15.md —
the operator's WH-9 transcript push; the tree byte-identical to the WH-9
ship state `6978534` apart from that doc), re-probe the live reference for
new surfaces, fix every identified gap with TDD, lockstep the five docs +
`worklog.md`, and push.

> **Provenance note:** the census layers now reach props, members,
> exports, values, modules, routes, docs, deps and lockfile resolutions —
> but the WH-10 audit found the docs-counts pin itself has two blind
> spots of its own: a compound spelling the forbidden-forms list cannot
> see, and the §8.1 distribution table's row-level arithmetic (only the
> TOTALS are pinned). Both findings are drift the pin's own mechanism
> was built to catch — this round closes the pin gaps with the same
> finding-driven doctrine as every census extension before it.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `664c276`):** lint 0/0 · tsc 0 · unit **314/314 (21
suites)** · `bun run build` OK · smoke **14/14** · e2e **42/42** · db
census MATCH (users=1 templates=11 steps=50 tutorials=12 badges=8) ·
`bun audit` **ZERO** — the exact documented WH-9 ship state, no flake
drawn this round (the WH-9 step-assertion cure holds).

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 10 nav pages + Profile walked — **ZERO new surfaces
since WH-9**; every title in the documented pattern ("Routines |
EvolveWell", …; /Dashboard ships the bare "EvolveWell"). The Appearance
tab unchanged (3 modes, 8 presets, the custom hex pair); the mobile
drawer battery at 390×844: 11 items, the reference's stays-open-after-nav
quirk re-verified (drawer still open at /Exercise, no scroll lock) while
ours AUTO-CLOSES + releases (the e2e-pinned superset); the sonner-overlay
quirk again intercepted its own toggle click (worked around via JS
dispatch, as every round before); the reference's own console carries its
documented warnings (the tailwind CDN notice + the Radix DialogTitle/
Description a11y gaps in ITS drawer — ours compiles Tailwind properly and
the drawer carries titles). "Continue with Google" present on both
logins.

**Findings (by severity) — the WH-10 ledger, both in the docs-count
class the pin owns:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **The hyphenated "14-model" spelling** — PAD carries "the 14-model domain" LIVE-TENSE at two sites while the schema has 15 models (verified: 15 `^model` declarations). The WH-5 round that cured this class fixed the spaced spelling ("14 models" → forbidden form) and PAD §4.1's "Fourteen models" heading (also forbidden) — but the compound adjective form escaped both the cure and the pin: `FORBIDDEN_FORMS` lists `"14 models"` and `"Fourteen models"`, neither of which matches "14-model". The claim survived five audit rounds inside the pin's own home doc. | Project_Architecture_Document.md:58 (§3.2 stack table) + :758 (§12 key-files table) | Cure both sites to "15-model"; add `"14-model"` to `FORBIDDEN_FORMS` (a spelling that can never be true of this tree — the schema never had 14) |
| F-2 | **MEDIUM** | **PAD §8.1's infra row carries 138 checks where the tree's truth is 116** — the row's file list is right (10 files) but the count is inflated by exactly the 22 checks WH-7 retired (331→309: the format.ts CRM-era subgraph + the dead-value tests). Root cause verified via `git log -L`: the row was NEVER decremented at WH-7 (it went 121→130 at WH-5, 130→133 at WH-6, then held 133 through WH-7's −22, and WH-8/WH-9 incremented the stale base: 133→136→138). The totals line (314) is pinned and correct — the row-level arithmetic is unpinned and drifted. The auth row (6/109) and wellness row (5/89) re-verified correct (12+20+22+25+10+20=109; 26+13+19+10+21=89); the five e2e rows re-verified correct (11+6+6+18+1=42). | Project_Architecture_Document.md:603 (§8.1 test-distribution table) | Cure the row to the post-round truth (116 + this round's +1 = **117**); pin the §8.1 row arithmetic (F-3) |
| F-3 | **Systemic (the round's TDD feature)** | **No pin for the §8.1 distribution table's row-level arithmetic.** The docs-counts pin asserts the TOTALS (presence-of-truth per doc + computed tree counts) — nothing verifies the table's rows SUM to those totals. F-2 is exactly this gap: a retirement decremented the pinned total (331→309, lockstep-enforced) while the unpinned row above it kept the stale count, and four subsequent rounds hand-incremented the wrong base. The per-row numbers are the table's entire content — a distribution table whose rows don't sum is a lie with a true bottom line. | tests/docs-counts.test.ts | **TDD:** the §8.1 row-arithmetic check — parse the table's `| Unit — … |` rows (files, checks cells) and `| E2E — … |` rows (checks cell), assert the unit sums equal `CANONICAL.unitSuites`/`CANONICAL.unitChecks` and the e2e sum equals `CANONICAL.e2eChecks`. RED at birth with 109+89+138=336 ≠ 314. Arithmetic (not per-row presence) so a legitimate category redistribution never trips it — only arithmetic falsehood and total moves do (the count-ladder rule). |

**Clean checks (no findings, documented):** the full baseline gate (42/42,
no flake) · the reference probe (zero new surfaces; the drawer battery;
the Appearance/Account/Preferences states; the reference's own console
warnings) · the WH-9 diff review (tabs/theme-store/sidebar/page-parts
surgeries verified clean against their plan; comments re-anchored; the
Profile call site dropped `variant` correctly) · the Tailwind v4 pins
standing in globals.css (`@custom-variant hover`, `--shadow-sm`,
`--blur-sm`, literal-hex `@theme`) · the mobile-nav e2e battery green in
the baseline (our auto-close superset) · `.env` `DATABASE_URL=
"file:../db/custom.db"` with `db/` at the repo root, census MATCH ·
`.env` ↔ `.env.example` parity (identical except `AUTH_SECRET` — the
designed state) · vitest.config.ts matches `*.test.ts` only;
playwright.config.ts pins its own `db/e2e.db` + isolated port · the SEO
family (sitemap.xml/robots.txt/manifest.json route handlers in the
reference's exact formats; per-route metadata on all 11 modules; smoke
check 12 green) · `skills/` excluded from lint/tsc/vitest (verified in
all three configs) · the e2e §8.1 rows + the auth/wellness unit rows
re-verified correct · the PAD §11 known-issues register accurate
(advisory-zero row current; OAuth/video/empty-state rows still the
documented intentional parity) · the compound-form sweep beyond the pin
("8-badge", "15-family", "14-check" all verified correct — the ONLY
stale compound is F-1's).

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the pin extensions in `tests/docs-counts.test.ts`:** (a) `"14-model"` appended to `FORBIDDEN_FORMS`; (b) the §8.1 row-arithmetic check (+1 check: the unit rows' files sum = 21 / checks sum = CANONICAL.unitChecks, the e2e rows' checks sum = 42). Flip `CANONICAL.unitChecks` 314→**315** in the same step (post-landing truth; the per-doc claim checks carry the ladder RED until WP-3). RED verified with exactly the predicted failures: the forbidden-forms check names PAD's two "14-model" sites; the row-arithmetic check names 336 ≠ 315; the five docs' claim checks miss their 315-forms | RED as predicted |
| 2 | **GREEN — F-1 (the compound-spelling cure):** PAD:58 "the 14-model domain" → "the 15-model domain"; PAD:758 "The 14-model domain" → "The 15-model domain" | forbidden-forms GREEN |
| 3 | **GREEN — F-2 (the infra row cure):** PAD:603's checks cell 138 → **117** (the tree's 116 + this round's new check, which rides docs-counts.test.ts — an infra file); the row's file list stays 10 | row-arithmetic GREEN (109+89+117=315) |
| 4 | **The count ladder + SKILL:** unit 314→**315** / suites stay 21 at EVERY live-tense doc site (README badge + stack table + testing section + superset · AGENTS commands table + gate order · CLAUDE build table + test pyramid · PAD §7.1 tree + §8.1 totals line + §9.3 pre-ship · SKILL §2 stack table + §11 pre-ship); SKILL v1.7.0→**v1.8.0** (description + provenance + §11 + §12 lesson 14: "a pin's forbidden-forms list must cover the compound spellings, and a distribution table needs row-arithmetic pinning — totals-only pinning leaves the rows free to drift") | rg-verified, docs-counts GREEN 10/10 |
| 5 | **Full gate re-run:** lint → typecheck → test (**315**) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` ZERO | full green |
| 6 | **Captures:** re-take the 16-file screenshot set from the remediated dev server (one logged-in desktop session + one mobile session; 01 pristine login first); md5 uniqueness; F-1/F-2/F-3 touch ZERO product surface (two doc cells + a test file) so all 16 expected byte-stable vs the WH-9 set modulo deterministic-render noise (the WH-9 11-goals settle precedent); `.env` ↔ `.env.example` parity re-verify | captures |
| 7 | **worklog WH-10 entry + this plan's execution record + `docs/session_16.md`** (the round's transcript; the operator's session_15.md push never clobbered) | worklog |
| 8 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **Arithmetic over per-row presence (F-3):** the row-arithmetic check
  parses the table and asserts the SUMS — a legitimate category
  redistribution (a test file moving between rows) keeps the arithmetic
  true and never trips the pin; only arithmetic falsehood (F-2's class:
  a retirement decremented the total but not a row) and total moves (the
  count-ladder rule) trip it. Per-row presence claims would force pin
  literal updates on every redistribution — noise that teaches agents to
  reach for the literal instead of the truth.
- **The e2e rows ride the same check (F-3):** the `| E2E — … |` rows'
  bare-number cells (their spec-count cells carry words: "1 spec",
  "2 specs", "1 setup") sum to `CANONICAL.e2eChecks` — the same
  construction, protecting the table's lower half.
- **`"14-model"` joins FORBIDDEN_FORMS (F-1):** the schema never had 14
  models — the compound spelling can never be true, exactly the
  forbidden-form membership rule. The spaced and spelled-out forms stay;
  the list now covers all three spellings of the same lie.
- **The infra row cures to 117, not 116 (F-2):** the new row-arithmetic
  check rides docs-counts.test.ts — an infra-category file — so the
  row's post-round truth is 116 + 1. Curing to 116 would leave the sum
  at 314 ≠ 315 and the pin RED; the cure and the ladder land together.
- **The count ladder (exact):** 314 + 1 (the §8.1 row-arithmetic check,
  riding docs-counts.test.ts) = **315 checks / 21 suites** (no new
  suite). The e2e count stays 42; the smoke count stays 14.
- **SKILL v1.8.0 (not a patch bump):** every audit round since WH-3 has
  bumped the minor — the §12 lessons index is the SKILL's living memory
  and lesson 14 (the pin-gap class) is a new entry, not a correction.
- **The e2e/visual surface is untouched (F-1..F-3 are pixel-invisible):**
  two doc cells and a test file render byte-equal. Captures expected
  byte-stable vs the WH-9 set; the battery (42) re-verifies the drawer
  walk and the Profile strip.
- **The session file (WP-7):** the operator's numbering pushed
  session_15.md (the WH-9 transcript); this round's transcript file is
  `docs/session_16.md`, matching the house pattern.
- **Declined (documented, not taken):** the functional-superset round
  (real video URLs, OAuth wiring) — the probe re-confirmed the
  intentional-parity state for the sixth time; it stays the operator's
  call. A full fresh-clone verification — this round touches zero
  product surface, zero deps, zero env contract (WH-8's fresh clone +
  this round's green gate cover the posture); re-run it when a round
  touches install/env/db-path surfaces again.

---

## 4. Execution record (2026-10-30, WH-10 — filled as executed)

- **Baseline gate (live, pulled tree at 664c276):** lint 0/0 · tsc 0 ·
  unit 314/314 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · bun audit ZERO — the documented WH-9 ship state, no flake.
- **The reference probe:** zero new surfaces; the drawer battery green
  on the reference (11 items, stays-open quirk, no scroll lock); the
  Appearance tab unchanged (3/8/hex, no reset); the reference's own
  console warnings documented; the OAuth/video surfaces at the
  documented intentional-parity state. — §1.
- **WP-1 (RED):** the two pin extensions landed in `tests/docs-counts.test.ts` — `"14-model domain"` appended to `FORBIDDEN_FORMS` and the §8.1 row-arithmetic check (unit rows' files/checks + e2e rows' checks sum to the canonical totals; the bare-number cell parse is a split-on-pipe, because adjacent `| N | M |` cells share a pipe a consuming regex loses every second cell — caught in the pre-landing dry-run). CANONICAL flipped 314→315 in the same step. RED verified with exactly the predicted failures: the row-arithmetic check 336 ≠ 315 (the F-2 drift caught at birth), the forbidden-forms check naming PAD's two compound sites, and the five per-doc claim checks carrying the ladder RED. **Two mid-WP refinements the pin itself forced:** (a) the bare `"14-model"` prefix form false-positived on the SKILL's own legitimate WH-5 history narration ("the 14-models count") — the flat substring scan cannot distinguish history from claims, so the form re-pinned at the drift PHRASE `"14-model domain"`; (b) the SKILL's own lesson 14 + provenance note initially QUOTED the forbidden forms verbatim and tripped the check on themselves — a doc cannot quote a forbidden form, so the narration re-worded to describe without spelling (the lesson's final clause is this exact rule).
- **WP-2 (GREEN, F-1):** PAD:58 + PAD:758 cured to "the 15-model domain" / "The 15-model domain".
- **WP-3 (GREEN, F-2):** PAD:603's infra row cured to `| 10 | 117 |` (the tree's 116 + this round's new check, which rides docs-counts.test.ts — an infra file; the row's category list gained "§8.1 row arithmetic" to name the new check). Row-arithmetic flipped GREEN: 109+89+117 = 315.
- **WP-4 (the ladder):** 314→315 at all 13 live-tense sites (README badge + stack + testing + superset · AGENTS commands + gate order · CLAUDE build table + test pyramid · PAD §7.1 tree + §8.1 totals + §9.3 pre-ship · SKILL §2 + §11); AGENTS' docs-counts bullet carries the WH-10 extension note; SKILL v1.7.0→**v1.8.0** (description + provenance + §12 lesson 14). docs-counts GREEN 10/10.
- **WP-5 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit **315/315 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census MATCH · `bun audit` ZERO.
- **WP-6 (captures):** all 16 re-taken from the dev server (01 pristine login first; the goals capture carries the WH-9 settle lesson at 2500ms; the drawer walk live-verified during capture 16 — auto-close proof: the portal unmounted, zero role=dialog at /Exercise). md5: 16 unique, **16/16 byte-identical to the WH-9 set** — zero visual surface moved, exactly as predicted for two doc cells + a test file. `.env` ↔ `.env.example` parity re-verified (identical except AUTH_SECRET).
- **WP-7:** the worklog WH-10 entry + this record + docs/session_16.md.
- **WP-8:** commit to main + the SSH-wrapper push (paramiko shim; key outside the repo; dry-run → push → remote verify → shred).
