# Session-19 Remediation Plan — the dark-corners + preset-axis round (WH-19)

**Task ID:** WH-19 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ c15fe12`: WH-18 shipped at
`c555eae` — the dark-mode round — plus the session_33.md transcript push),
re-probe the live reference for new surfaces AND
seed-content/entity-API/compiled-CSS drift, fix every identified gap with
TDD, lockstep the five docs + `worklog.md`, and push.

> **Provenance note:** the reference did NOT redeploy since WH-15 — the
> compiled-CSS watch round 6 found the asset hash unchanged
> (`assets/index-heGLHP2e.css`) and every content/behavior watch came back
> clean (identity map 11/11 byte-identical, drawer battery, seed 23/23,
> entity API 12 rows/13 keys/views:0, 404, placeholders, quick actions)
> — and the probe-preset protocol held with zero contamination this round
> (no flips performed; the account read CLEAN at probe start: Indigo Dream,
> `#6366f1→#a855f7` computed). The round's findings are codebase-side —
> led by the surfaces **outside the WH-18 net's walk set** (the login
> family's unwalked views + the 404) and the **preset axis**, measured for
> the first time (WH-18's own suggested next).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
workspace at `c15fe12`, environment carried over — `.env` present with the
relative `DATABASE_URL="file:../db/custom.db"`, `db/` seeded at the repo
root, Playwright browsers installed, the dev server alive):** lint 0/0 ·
tsc 0 · unit **328/328 (21 suites)** · `bun run build` OK · smoke **14/14**
· e2e **50/50** · db census MATCH (users=1 templates=11 steps=50
tutorials=12 badges=8) · `bun audit` **ZERO** — the exact documented WH-18
ship state, no flake. Standing classes re-verified: the four Tailwind v4
pins (`@custom-variant hover`, `--shadow-sm`, `--blur-sm`, `@custom-variant
dark`) + the three `@source not` directives in `globals.css`; the SEO
family (sitemap routes + robots + manifest 200, smoke check 12); the
mobile-nav battery (the reference's drawer re-walked live at 390×844: 11
items + Close, the stays-open-after-nav quirk, clean teardown).

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 11 pages walked with computed-style H1 probes — every
title and gradient stop byte-identical to the WH-15 identity map. The
compiled-CSS watch round 6: **hash UNCHANGED** (no redeployment). The
seed-content watch round 8: **23/23 byte-for-byte** (11 template names +
12 tutorial titles). The entity-API shape watch round 7 (the page-context
fetch with the base44 bearer token): **12 rows, 13 keys, `views: 0` on all
12**. The drawer battery at 390×844 (11 items + Close, the stays-open
after-nav quirk, clean teardown), the 404, the 12 href-less Watch-Now
placeholder buttons, the quick actions — all unchanged. **Probe hygiene:
zero events this round** — no preset/mode flips were performed on either
account (the reference's empty z-100 toast viewport intercepts clicks at
the drawer trigger's upper point — its own platform defect, noted in the
parity ledger below; OURS is `pointer-events-none`, the correct shadcn
form — verified computed).

**The round's audit class — the surfaces outside the WH-18 walk set, plus
the preset axis.** The method: live computed-contrast probes (ink vs the
nearest opaque ancestor background — an oklab-aware parser; axe cannot
resolve the alpha-card-over-gradient family) on every login-family route
in dark, the 404 in dark, the module dialogs in dark (clean — zero fails,
the dialog is token-based), the 8-preset live walk (each applied through
the real Profile UI, the active pill + wordmark computed), and the
WCAG relative-luminance math on the preset gradient stops. Findings (by
severity) — the WH-19 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH** | The dark corners the WH-18 net never walked — lesson 22's own coda (the net walked what it knew; the surfaces OUTSIDE the walk set shipped with the same broken class). Five records carry zero or partial dark pairs, live-measured in dark: **LOGIN_SIGNUP_LAYOUT** — title `text-slate-900` on the dark card = **1.0:1 (invisible "Create your account")**, labels `text-slate-700` ×3 = 1.73:1, back link 3.77:1, the input a light island (`bg-slate-50/50 border-slate-200`), the submit's face invisible (`bg-slate-900` ≈1.1:1 vs the card); **LOGIN_LAYOUT.subtitle** — `text-slate-500` on the dark card = **3.77:1**, renders on /login ("Sign in to continue") + all three reset states — **axe FALSE-PASSED it** (the alpha card over the page gradient returns incomplete; the WH-18 dark-login walk stayed green with a real AA failure on the page); **LOGIN_LAYOUT.inputIcon/logoBadge/logoGlow/accent** — the unpaired decorative members (light tile face, gray icons, light hairline in dark); **LOGIN_RESET_LAYOUT** — description `text-slate-600`, `send`/`resetInput` light islands, the sent view (`sentIconWrap` `bg-slate-100`, `sentIcon`/`sentEmailLine`/`sentEmailSpan`/`sentBack` unpaired, `sentCallout` the green-50/200/700 family), the reset screen's inline circles/callout (`bg-red-50`+`text-red-600`, `bg-emerald-50`+`text-emerald-600`, the red-200/50/70 error callout); **LOGIN_VERIFY_LAYOUT** — back/iconWrap/icon/title/emailLine/emailSpan/submit/resendLine/resendButton/hint all unpaired; **NOT_FOUND_LAYOUT** — the entire 404 is a **light island in dark** (page root stays `bg-slate-50`; h1 slate-300, divider bg-slate-200, h2 slate-800, p slate-600, pathSpan slate-700, the white bordered homeButton) — the WH-18 "error pages get dark pairs" decision covered error.tsx + global-error.tsx but missed not-found.tsx, the family's third member | `src/lib/login-reset.ts` (the four LAYOUT records), `src/lib/page-layout.ts` (LOGIN_LAYOUT + NOT_FOUND_LAYOUT), `src/components/layout/login-card.tsx` (the sprout icon `text-slate-900`), `src/components/layout/reset-password-screen.tsx` (the circles + error callout) | complete the dark pairs on every color-bearing member of the five records, following the LOGIN_LAYOUT paired precedents (the WH-18-established dark identity: slate-100/300/400 texts, neutral-700/800 surfaces, white-inverted submits, the neutral-800/950 tile family) |
| F-2 | **MEDIUM (measured)** | The preset axis, measured for the first time: **ALL 8 presets fail WCAG AA** for white ink on the brand-gradient surfaces (the worst stop governs): Indigo Dream **3.96**, Royal Purple **4.23**, Rose Pink **3.53**, Sunset Orange **2.80**, Ocean Blue **2.77**, Crimson Red **2.80**, Forest Green **1.98**, Golden Yellow **1.92**. The WH-18 ledger documented only "Golden Yellow ≈1.8:1" — the entry understates the class by seven presets. The class is reference-shared (the catalog is byte-identical; the engine is the reference's own) → per the WH-18 parity doctrine: **documented, NOT cured** (deviating would fork our preset engine from the reference's own) | the PAD §11 ledger entry + `src/lib/constants.ts` COLOR_PRESETS | upgrade the ledger entry to the full measured table + pin the arithmetic (a unit test computing the worst-stop ratios from COLOR_PRESETS and asserting the documented numbers — the WH-10 "pin the arithmetic" doctrine: a preset value change forces a re-measure) |
| F-3 | **MEDIUM (method)** | Axe false-passes the alpha-over-gradient family: the WH-18 dark-login walk ran axe at 2.1+2.2 tags and stayed GREEN while /login carried a real 3.77:1 AA failure (LOGIN_LAYOUT.subtitle) — the card's `bg-white/95`+`dark:bg-neutral-900/95` over the page gradient returns axe color-contrast **incomplete** (not a violation). The net needs a computed-contrast leg for the login-family routes (the alpha-card family) in BOTH modes — the same gap class as the gradients (the documented axe-incomplete family), now with a live false-pass to prove it | `tests/e2e/a11y.spec.ts` | a computed-contrast helper (ink vs nearest opaque ancestor, oklab-aware) + assertions on /login, /signup, /reset-password in light AND dark |
| F-4 | **LOW (net widening)** | The auto-mode live-flip listener (the WH-18 F-4 cure) has no test: nothing flips `colorScheme` mid-flight with mode=auto — the listener's whole point | `tests/e2e/a11y.spec.ts` (or shell.spec.ts) | an e2e: set mode=auto through the Profile UI → `page.emulateMedia({ colorScheme: "dark" })` → the `.dark` class must appear; `"light"` → must clear (explicit Light/Dark choices ignore the OS — assert that too) |

**The positive findings (the round's clean classes):** the module dialogs
in dark are clean (zero computed-contrast fails — the dialog is
token-based, the WH-18 audit's finding holds live); the preset engine
applies all 8 presets live byte-exact through the real Profile UI; our
toast viewport is `pointer-events-none` (the reference's own z-100
container is `pointer-events: auto` and genuinely intercepts clicks at
the top strip — its platform defect, noted in the parity ledger; ours is
the correct shadcn form, not mirrored).

---

## 2. Remediation sequence (TDD)

**WP-1 (RED — the pins, written first):**
1. `tests/src-census.test.ts` — the **dark-pair completeness census** for
   the login family: every color-bearing member of LOGIN_LAYOUT,
   LOGIN_SIGNUP_LAYOUT, LOGIN_RESET_LAYOUT, LOGIN_VERIFY_LAYOUT and
   NOT_FOUND_LAYOUT carries a `dark:` sibling (no exemptions — the
   decorative members pair too; the coherence cure is the point). The
   census walks the record string literals in `src/lib/login-reset.ts`
   and `src/lib/page-layout.ts` + the two component files' inline
   color classes in the family (the sprout icon, the circles, the
   callout).
2. `tests/e2e/a11y.spec.ts` — the net widening: the dark walk extended to
   **/signup, /reset-password (invalid state), the 404 route** (axe at
   the 2.1+2.2 tags, strict zero, console-clean) + the
   **computed-contrast leg** (the oklab-aware helper, asserted ≥4.5 on
   every text element of /login, /signup, /reset-password in BOTH modes)
   + the **auto-listener e2e** (F-4).
3. `tests/preset-contrast.test.ts` (new) — the **preset-axis arithmetic
   pin**: computes the worst-stop ratio for each of the 8 COLOR_PRESETS
   (white ink, WCAG relative luminance) and asserts the documented table
   (the PAD §11 entry's numbers) matches — a value change anywhere in
   COLOR_PRESETS forces the ledger + this pin to move together.
4. The CANONICAL flips in `tests/docs-counts.test.ts` (the ladder:
   328→new unit, 50→new e2e, the §8.1 rows — exact numbers fixed at
   implementation).
5. **Verify the RED**: the census pin fails (the five records' unpaired
   members), the three new dark walks fail with the audit's inventory
   (the signup title 1.0:1 + labels 1.73:1; the reset subtitle 3.77:1;
   the 404 light island), the computed-contrast leg fails on /login dark
   (the subtitle), the auto e2e fails if the listener regresses, the
   preset pin fails against the OLD ledger text (the "Golden Yellow
   only" entry), the ladder carriers fail.

**WP-2 (GREEN — the cures, one record at a time):**
1. **LOGIN_LAYOUT** (page-layout.ts): `subtitle` → `dark:text-slate-400`;
   `inputIcon` → `dark:text-neutral-400`; `logoBadge` →
   `dark:from-neutral-800 dark:to-neutral-900 dark:text-slate-300`;
   `logoGlow` → `dark:from-neutral-800 dark:to-neutral-900`; `accent` →
   `dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800`.
2. **LOGIN_SIGNUP_LAYOUT** (login-reset.ts): `back` →
   `dark:text-slate-400 dark:hover:text-slate-200`; `title` →
   `dark:text-slate-100`; `inputIcon` → `dark:text-neutral-400`; `label`
   → `dark:text-slate-300`; `input` → `dark:border-neutral-700
   dark:bg-neutral-800/60 dark:placeholder:text-slate-500`; `submit` →
   `dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200`.
3. **LOGIN_RESET_LAYOUT**: `description` → `dark:text-slate-400`;
   `send` → the submit pair; `resetInput` → the input pair;
   `sentIconWrap` → `dark:bg-neutral-800`; `sentIcon` →
   `dark:text-slate-300`; `sentEmailLine` → `dark:text-slate-400`;
   `sentEmailSpan` → `dark:text-slate-200`; `sentCallout` →
   `dark:bg-green-950/50 dark:border-green-900`; `sentCalloutText` →
   `dark:text-green-400`; `sentBack` → `dark:text-slate-400
   dark:hover:text-slate-200`.
4. **LOGIN_VERIFY_LAYOUT**: `back`/`iconWrap`/`icon`/`title`/`emailLine`/
   `emailSpan`/`submit`/`resendLine`/`resendButton`/`hint` → the same
   family pairs.
5. **NOT_FOUND_LAYOUT** (page-layout.ts): `page` → `dark:bg-neutral-950`;
   `h1` → `dark:text-neutral-600`; `divider` → `dark:bg-neutral-800`;
   `h2` → `dark:text-slate-100`; `p` → `dark:text-slate-400`;
   `pathSpan` → `dark:text-slate-300`; `homeButton` →
   `dark:bg-neutral-900 dark:border-neutral-700 dark:text-slate-300
   dark:hover:bg-neutral-800 dark:hover:border-neutral-600
   dark:focus:ring-neutral-600`.
6. **The inline sites**: login-card.tsx's sprout icon →
   `dark:text-slate-300`; reset-password-screen.tsx's invalid circle →
   `dark:bg-red-950/50` + `dark:text-red-400` (CircleAlert), the done
   circle → `dark:bg-emerald-950/50` + `dark:text-emerald-400` (Lock),
   the error callout → `dark:border-red-900 dark:bg-red-950/50
   dark:text-red-400`.
7. **The palette pins**: run the pins⇔usage census; every new pair gains
   its v3 pin in the session-88 block (expected additions: red-400,
   green-400, emerald-400, green-950, emerald-950, red-900, green-900,
   neutral-500 as consumed — the census is the authoritative list).
8. Re-run the net: the three new dark walks + the computed-contrast leg
   strict zero everywhere; the corners computed-verified live.

**WP-3 (the ladder + the five docs):** every count site (README badge +
tables + testing §, AGENTS commands + gate order + the a11y-net bullet's
widening, CLAUDE tables + pyramid, PAD tree + §8.1 rows + totals + the
known-issues ledger — the preset entry upgraded to the full measured
table + the new reference toast-viewport quirk entry + the
dark-corners entry retired, SKILL §2/§8/§11/§12 — **lesson 23**:
"the net walks what it knows — the walk set is a surface of its own;
audit the states AND the routes the net never walked, and when axe
returns incomplete, measure it yourself" + v1.16.0→**v1.17.0**).
docs-counts GREEN.

**WP-4 (the full gate, live, post-cure):** lint → tsc → unit → build →
smoke → e2e (the widened net green as the new checks) → `bun audit` ZERO
→ db census MATCH.

**WP-5 (the captures):** the 20-file set re-taken (the pair fixes move
zero light pixels — verify: movers must be none beyond the documented
raster class) **+ the NEW dark-corner set**: 21-dark-signup,
22-dark-reset-password, 23-dark-404 — the first captures of the cured
corners, each verified non-blank + genuinely dark.

**WP-6 (the records):** the worklog WH-19 entry, this plan's execution
record, `docs/session_34.md` (the round transcript).

**WP-7 (the ship):** stage (no `.env`/db/keys/scratch — the probe
scripts stay untracked), commit to `main`, the SSH-wrapper push (the
paramiko shim, key outside the repo, dry-run → push → remote verify →
shred).

---

## 3. Decisions (open questions, decided)

1. **The dark vocabulary follows the LOGIN_LAYOUT paired precedents** —
   slate-100/300/400 texts, neutral-700/800 surfaces, white-inverted
   submits, the neutral-800/950 tile family. One family, one identity
   (the WH-18-established dark identity; the reference has no working
   dark to mirror — the superset doctrine).
2. **The preset contrast class is documented, NOT cured** (the WH-18
   parity doctrine stands): the catalog is byte-identical and the engine
   is the reference's own; deviating would fork our preset engine from
   the reference's. The ledger entry upgrades to the full measured
   8-preset table, and the arithmetic is pinned so the claim cannot
   drift silently.
3. **The computed-contrast leg is scoped to the login family** (the
   alpha-card routes: /login, /signup, /reset-password, both modes) —
   the module routes ride token surfaces that axe resolves fine; the
   404's flat page bg resolves fine too (the leg covers it via the dark
   walk).
4. **No exemptions in the dark-pair census** — the decorative members
   (accent, glow, icons, the badge tile) pair too: the coherence cure is
   the point, and a blanket census is structurally simpler than an
   enumerated exemption list that drifts.
5. **The auto-listener e2e rides `page.emulateMedia`** (no OS-level
   mutation); the mode is set to auto through the real Profile UI once,
   then the emulation flips are asserted on the `.dark` class, and an
   explicit-Light assertion confirms the picker's promise (explicit
   choices ignore the OS).
6. **The scratch probe scripts** (`scripts/preset-contrast.ts`,
   `scripts/dark-corner-probe.ts`, the WH-18 set) stay untracked (the
   house pattern — `scripts/` holds only the three tracked tools).

---

## 4. Execution record (2026-10-30, WH-19 — filled as executed)

- **WP-1 (RED):** the dark-pair completeness census appended to
  `tests/src-census.test.ts` (the arm-level rule: every chromatic arm of the
  five login-family records carries its dark twin — variant chain and
  utility type, no exemptions) + `tests/preset-contrast.test.ts` (the
  arithmetic pin: computes the worst-stop ratios from COLOR_PRESETS,
  asserts the PAD §11 table — a value change forces the ledger and the pin
  to move together) + the e2e widening in `a11y.spec.ts` (the dark corners
  walk, the light computed-contrast leg, the auto-mode listener) + the
  CANONICAL flips (328→330, 21→22 suites, 50→53). **RED verified:** the
  census failed with the deterministic 76-arm inventory (the audit's live
  measurements + the arm-level stragglers the live probe cannot see: the
  placeholder/focus/hover arms on already-paired members); the preset pin
  failed on the PAD's single-patient entry; the docs-counts carriers failed
  until WP-3. The e2e RED ran via the house **stash-isolation experiment**
  (the cures stashed, the tree rebuilt, the walks run pre-cure): the dark
  corners + the light contrast leg failed with the audit's inventory; the
  auto-listener passed (the WH-18 cure's regression net — as designed).
  One e2e artifact bug caught and cured mid-WP (the probe string was a
  function expression, never invoked — the IIFE form landed).
- **WP-2 (GREEN):** the dark pairs across LOGIN_LAYOUT (subtitle,
  inputIcon, logoBadge, logoGlow, accent + the google/input/footerLink
  straggler arms), LOGIN_SIGNUP_LAYOUT, LOGIN_RESET_LAYOUT (the reset +
  sent views), LOGIN_VERIFY_LAYOUT, NOT_FOUND_LAYOUT (the whole 404), the
  inline sites (the sprout icon, the reset circles, the error callout) —
  76 arms paired. **The round's deepest finding, caught by the net
  mid-WP:** the 404 still failed the .dark-class assertion, and the root
  cause was NOT a missing pair — the 404's pathname span was the app's one
  SSR/client hydration mismatch (usePathname on the SERVER for an
  unmatched route returns Next's internal "_not-found"; the client renders
  the real path → React #418 → the whole-tree client regeneration → the
  patch DELETED applyTheme's pre-hydration writes off <html>). The
  evidence chain: a module-eval marker (the store DOES evaluate on the
  404), an applyTheme counter (it RUNS with themeMode dark), a
  MutationObserver (the writes land at t≈150, something deletes them at
  t≈200), the console (React #418), and the SSR HTML (the span SSRs
  "_not-found"). **Cured by the isClient guard** (useSyncExternalStore's
  server snapshot — the React-blessed client-only pattern; no effect, no
  setState, the hydration renders the same "…" placeholder the server
  did, then the subscription flips it to the real path). PLUS the F-5
  cure the audit found beyond the plan: the 404 display heading's ink
  superseded off the reference's own 1.42:1 (slate-500 in light at
  4.54:1, neutral-500 in dark at 4.18:1 — the tab-strip precedent's next
  member). **+8 v3 pins** (emerald-400/950, green-400/900/950,
  neutral-500, red-400/900 — the pins⇔usage census green at **121 = 121**).
  The pre-existing record pins (login-views, login-reset) updated to the
  new literal forms in the same stroke — including the resetInput guard's
  retarget (the bare "h-11 " token now matches our own "sm:h-11 dark:…"
  suffix; the guard excludes the login form's h-11-BASED token instead).
  One documented console-ignore entry added to the dark-corners walk (the
  browser's network-level "Failed to load resource: 404" for the
  deliberately-visited unmatched route — the expected status, not an app
  error).
- **WP-3 (the ladder + docs):** 328→**330** / 21→**22 suites** / 46→**53**
  e2e at every live-tense site (the §8.1 rows recomputed: the wellness row
  5→6 files/89→90 for the preset pin, the infra row 130→131, the a11y row
  7→**10**; 109+90+131=330; 11+6+7+10+1+18=53). The PAD §11 ledger: the
  preset entry upgraded to the full measured 8-preset table + FOUR new
  rows (the reference's z-100 toast-viewport quirk, the dark-corners
  retirement, the 404-hydration retirement, the 404 display-heading
  superset deviation). README/AGENTS/CLAUDE (the counts + the a11y-net
  descriptions + the pin count 113→121) + the SKILL's stale §11 e2e line
  ("46/46" — a narration the docs-counts pin never covered; cured to
  53/53) + SKILL v1.16.0→**v1.17.0** with §8's incomplete-is-not-a-pass
  amendment + **§12 lesson 23**. docs-counts GREEN 10/10.
- **WP-4 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **330/330 (22 suites)** · build OK · smoke 14/14 · e2e **53/53** · db
  census MATCH · `bun audit` ZERO.
- **WP-5 (captures):** the 20-file set re-taken via the house procedure.
  **19/20 BYTE-STABLE**; the one mover root-caused as the INTENDED
  movement (20-dark-login at 1% Δ>7 — the login family's dark pairs: the
  badge tile, the glow, the accent strip, the subtitle going dark-native).
  **TWO probe-hygiene events caught and cured live** (the §11 protocol's
  own class, both mine): the audit's dark-mode flip had left the account's
  server prefs dark — the first capture run's whole "light" set rendered
  DARK (96% pixel movement); and the preset walk had ended on Golden
  Yellow (each click PUTs) — the second run's brand family + preset cards
  rendered Golden Yellow. The capture script gained the full
  normalization step (Light + Indigo Dream + the /api/prefs verification
  of BOTH) before any capture fires. **The NEW dark-corner set 21-23**
  (21-dark-signup, 22-dark-reset-password, 23-dark-404): the first
  captures of the cured corners, each verified carrying the .dark class,
  the 404's span verified rendering the REAL path ("wh19-no-such-route" —
  the hydration cure's face). The dev account reverted with the PUT
  verified.
- **WP-6:** the worklog WH-19 entry + this record + `docs/session_34.md`.
- **WP-7:** staging the tree (no `.env`/db/keys/scratch — the probe and
  capture scripts stay untracked), the commit, and the SSH-wrapper push.
