# Session-20 Remediation Plan — the interaction-states round (WH-20)

**Task ID:** WH-20 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 9e2c1d5`: WH-19 shipped at
`64814e0` plus the session-log pushes), re-probe the live reference for new
surfaces AND seed/entity/compiled-CSS drift, then close the audit class
WH-19's own ledger pointed at — **the interaction states under the
computed-contrast doctrine** (focus rings, hover arms, the row surfaces the
state walks never render) — with TDD cures, lockstep docs, captures and the
push.

> **Provenance note:** the reference did NOT redeploy since WH-15 — the
> compiled-CSS watch **round 7** found the asset hash unchanged
> (`assets/index-heGLHP2e.css`), and every content/behavior watch came back
> clean (the H1 identity map 11/11 byte-identical via the visible-main-H1
> walk; the seed watch **round 9**: 23/23 byte-for-byte [11 template names +
> 12 tutorial titles]; the entity-API shape watch **round 8** via the
> page-context bearer fetch: 12 rows, 13 keys, `views: 0` on all 12; the
> drawer battery at 390×844: 11 items + Close, the stays-open-after-nav
> quirk, clean teardown; the 404; the 12 href-less Watch-Now placeholders).
> **Zero probe-hygiene events** — no flips were performed on the reference
> account (read at probe start: Indigo Dream, `#6366f1→#a855f7` computed,
> no `style` residue). The dev account's audit flip (dark, via the real
> Profile UI) was reverted with the `/api/prefs` read verified (`mode=light
> primary=#6366f1`) BEFORE the plan was written. The reference's own
> keyboard-focus states were probed for the first time: **its nav links and
> primary submit ship NO visible focus indicator** (outline `2px
> rgba(0,0,0,0)` transparent, no ring classes; its submit focuses to a 3px
> WHITE outline invisible on the white card) — the defect class our
> focus-visible superset exists to beat; its login INPUT ring (white 2px
> offset + slate-400 2px) is the one focus surface it does ship — and ours
> is byte-identical to it (probed both, same computed layers).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on a fresh
clone at `9e2c1d5`, environment rebuilt — `.env` written with the relative
`DATABASE_URL="file:../db/custom.db"`, `bun install`, `db:push`, `db:seed`,
Playwright chromium installed [the sandbox cache carried 1200; the suite's
1.64 wants 1248]):** lint 0/0 · tsc 0 · unit **330/330 (22 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **53/53** · db census MATCH
(users=1 templates=11 steps=50 tutorials=12 badges=8) · `bun audit` **ZERO** —
the exact documented WH-19 ship state, no flake.

**The round's audit class — the interaction states under the
computed-contrast doctrine (WH-19's own "suggested next").** The method: a
live oklab-aware focus-ring probe (the WH-19 computed-contrast instrument's
ring form — ink/ring color vs the nearest OPAQUE ancestor background,
composited alpha, oklab-parsed), driven by REAL keyboard Tab walks (program
`focus()` does not match `:focus-visible` after mouse use) over the shell,
the Profile chips, a module dialog, and the login family — in BOTH modes —
plus a hover probe (real `agent-browser hover`, synthetic `mouseenter` does
not set `:hover`) on the toast's close button, and an arm-level static sweep
of every `hover:`/`focus:` palette arm in `src/` for dark siblings.

**The methodology find of the round (a probe-hygiene class of our own):**
elements carrying `transition-all` interpolate box-shadow — a computed-style
read synchronous with `.focus()` returns the transition's t≈0 frame (five
transparent zero layers) and false-flags a healthy ring as invisible. Every
ring read in this audit settled ≥400 ms first. The first dark-walk numbers
for the Profile chips were exactly this artifact — re-probed settled, the
chips are GREEN (2px `#d4d4d8` @ 11.99:1).

Findings (by severity) — the WH-20 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH** | The login-family DARK FOCUS RINGS ride `dark:focus:ring-neutral-600` (#52525b) — **2.32:1** against the dark card (neutral-900 #171717) and **2.11:1** against the input's own `bg-neutral-800/60` blend (#202021) — below the 3:1 non-text minimum a focus indicator needs (1.4.11). The WH-19 round paired the ARMS (census-complete) but the chosen ring COLOR is sub-contrast — the white 2px offset (17.93:1) does the indicating alone, the ring adds nothing. Live-measured on /login dark: the input's layers = white offset ✓ + `rgb(82,82,82)` ring ✗. Four records, four sites: LOGIN_LAYOUT.input, LOGIN_RESET_LAYOUT's input, LOGIN_SIGNUP_LAYOUT's input, NOT_FOUND_LAYOUT.homeButton — each also carries the same-class `dark:focus:border-neutral-600` (2.11:1, the border arm of the indicator) | `src/lib/login-reset.ts:114,186` · `src/lib/page-layout.ts:421,521` | ring → `dark:focus:ring-neutral-400` (**7.11:1** vs the card, 6.45:1 vs the input blend — the family's own icon-ink step, `dark:text-neutral-400` is already the inputIcon's arm); border → `dark:focus:border-neutral-500` (**3.43:1** — the border is the indicator's secondary arm, a step softer than the ring by design) |
| F-2 | **HIGH (the round's defining class)** | The toast close button's HOVER arm has no dark pair: `hover:text-neutral-900` on the dark toast card renders the hovered X at `rgb(23,23,23)` on the hover wash `rgb(28,28,31)` = **1.05:1 — the dismiss glyph vanishes exactly when the user aims at it**. Live-confirmed with a real hover (toast triggered by a workout save). The resting X passes (text-subtle token, 7.0:1); ONLY the interaction state is broken — the class no net reads: the WH-18 dark toast walk asserted the toast's resting render; axe never hovers, no e2e ever hovered | `src/components/ui/toast.tsx:144` | add `dark:hover:text-neutral-100` (**15.59:1** vs the dark hover wash) |
| F-3 | **HIGH** | APP_FOOTER ships ZERO dark pairs — `border-gray-200 bg-white … text-gray-500` + the link's `hover:text-gray-800` — a **WHITE footer strip on every dark module page** (live-read: `rgb(255,255,255)` bg, 19.9:1 against the dark page — the loudest possible island). Both dark walks passed it: its self-contrast is AA-fine (gray-500 on white 4.83:1) and axe reads ink-vs-own-bg — the WH-19 light-island class (the 404's twin), on the most-travelled surface of all | `src/lib/page-layout.ts:29-35` (APP_FOOTER) | `dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400` (text **7.85:1**) + link `dark:hover:text-neutral-200` (**15.72:1**) |
| F-4 | **MEDIUM (coherence)** | The module pages' inline ACTION buttons are light-only — nine sites: six red delete buttons (`text-red-600 hover:bg-red-50` — resting icon **3.12:1** vs the effective dark row card, marginal against the 3:1 non-text bar; hover paints a red-50 LIGHT ISLAND flash in dark), the routines emerald start (`text-emerald-600` 4.0:1, hover `bg-emerald-50` island), the routines red delete, and the Profile Log-out (`border-red-200 bg-red-50 …` — a full red-50 island button in the dark Session panel, the F-1 class's button form) | `src/app/(app)/{exercise:155,reminders:245,studyresources:296,assignments:228,events:272,goals:237,routines:147+155}/…` + `profile/profile-page.tsx:415` | the WH-19 reset-circle precedent family: `dark:text-red-400 dark:hover:bg-red-950/50` (icon **5.46–6.4:1**), `dark:text-emerald-400 dark:hover:bg-emerald-950/50` (**7.85:1**), Log-out `dark:border-red-900 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/60` (**6.01:1**) |
| F-5 | **LOW (reference-shared)** | The LIGHT login input ring (white 2px offset + slate-400 2px) computes **2.56:1** (ring vs offset) / 2.45:1 (vs the slate-50 page) — below 3:1. **Byte-identical to the reference's own computed ring** (probed on both apps: `rgb(255,255,255) 0 0 0 2px, rgb(148,163,184) 0 0 0 4px`) — the reference's one working focus surface, mirrored exactly. Per the parity doctrine (the preset-axis precedent): **documented, NOT cured** — deviating would fork our login focus identity from the reference's own | the same four records' light arms + the PAD §11 ledger | a ledger entry + the arithmetic pinned (the pin asserts the documented ratios so a future re-pin cannot drift silently) |
| F-6 | **MEDIUM (method — the walk-set gap, lesson 23 again)** | The dark e2e walks render EMPTY module lists (the demo account ships empty by design) — the ROW surfaces (delete buttons, chips, the complete-circle) never render in any dark OR light walk; and NO net anywhere walks a HOVER state or reads a FOCUS ring's color. The interaction states are the fourth assertion-surface class the gate never read (DOM → console → semantics → **interaction**) | `tests/e2e/a11y.spec.ts` | the net widening: (a) a data-bearing dark row leg (create one workout via the API with the storageState cookie, walk /Exercise in dark, assert the delete button's computed icon color ≥3:1 and the row renders), (b) the dark login ring leg (keyboard-focus the email input, parse the box-shadow ring layer, assert ≥3:1 — the F-1 class can never return), (c) the dark footer leg (the footer's computed bg must be the dark pair — the F-3 class), (d) the toast-hover leg (trigger, real hover, assert the X's computed color ≥3:1 — the F-2 class) |

**The positive findings (the round's clean classes — measured, not assumed):**
the focus-ring SYSTEM passes contrast in BOTH modes on every walked surface —
sidebar links 2px `#d4d4d8` @ **12.13:1** dark / `#0a0a0a` @ **19.8:1**
light; the Profile mode/preset chips **11.99:1**; the tabs (ring+offset)
**10.24–15.13:1**; the dialog inputs/select trigger **11.99:1**; the
submit's ring-over-card **12.13:1** (the ring's true adjacency is the CARD,
not the button face — outset rings measure against the parent, a probe
refinement this round). The 1px `ring-1` family (INPUT_BASE/BUTTON_BASE/
SELECT_TRIGGER) passes the claimed A+AA set — **2.4.13 Focus Appearance is
Level AAA in WCAG 2.2** (verified against the W3C Understanding doc), outside
the claimed conformance; recorded in the ledger as the deferred AAA upgrade,
not a defect. The mobile drawer family is dark-safe (token surfaces +
dark-paired glass header — re-verified against the reference's own drawer
battery, 11 items + stays-open quirk + clean teardown, unchanged). The four
Tailwind v4 pins + the three `@source not` directives hold in `globals.css`;
no new v4 bug class in the drawer family (the one suspected case — the
"missing" chip rings — was the t=0 transition artifact, above).

---

## 2. Remediation sequence (TDD)

**WP-1 (RED — the pins, written first):**
1. `tests/src-census.test.ts` — the **interaction-arm dark-pair census**: a
   whole-tree walk of every quoted class string in `src/` (app + components
   + lib, comments excluded); every palette-colored `hover:`/`focus:` arm
   must carry its `dark:hover:`/`dark:focus:` sibling in the same string.
   Two STRUCTURAL exemptions, written down: (a) token-referencing arms
   (`hover:bg-line-soft`, `hover:bg-sidebar-hover`, `hover:text-foreground`,
   `hover:text-primary`, `hover:bg-primary-hover` …) — the token flips in
   dark by construction; (b) the both-mode light-gray family
   (`gray-200/300/400` — the reference's own faint-unchecked-circle
   anatomy, visible on both modes). The corpus at RED: the 14-site sweep
   (F-1's four records, F-2's toast arm, F-3's footer, F-4's nine sites —
   the grays exempt).
2. `tests/interaction-contrast.test.ts` (new) — the **interaction-contrast
   arithmetic pin** (the preset-contrast doctrine applied to interaction
   colors): reads the audited class strings from the source files (stable
   anchor substrings), maps the palette steps to their v3 hex values, and
   asserts the measured table — the four dark ring pairs ≥3:1, the border
   arm ≥3:1, the toast hover pair ≥3:1, the footer dark text ≥4.5:1, the
   module action arms ≥3:1, AND the two reference-shared LIGHT ring ratios
   pinned AT their documented values (2.56 / 2.45 — the parity pin: a
   change to the light arms forces the ledger and this pin to move
   together).
3. `tests/e2e/a11y.spec.ts` — the **interaction-states net** (F-6): the
   four legs — the data-bearing dark row walk, the dark login ring probe,
   the dark footer probe, the toast-hover probe (all computed-contrast,
   oklab-aware, reusing the WH-19 helper; settle-time on every
   transition-carrying read).
4. The CANONICAL flips in `tests/docs-counts.test.ts` (330→new unit,
   22→23 suites, 53→new e2e — exact numbers fixed at implementation).
5. **Verify the RED**: the census fails on the 14-site inventory; the
   arithmetic pin fails on the four records' current arms (2.32/2.11) and
   the missing dark pairs; the e2e legs fail live (the stash-isolation
   experiment for the e2e RED, the house method: cures stashed, tree
   rebuilt, the new legs run pre-cure).

**WP-2 (GREEN — the cures, one class at a time):**
1. **F-1** — the four input/homeButton sites: `dark:focus:ring-neutral-600`
   → `dark:focus:ring-neutral-400`; `dark:focus:border-neutral-600` →
   `dark:focus:border-neutral-500`.
2. **F-2** — toast.tsx: `+ dark:hover:text-neutral-100`.
3. **F-3** — APP_FOOTER: `+ dark:border-neutral-800 dark:bg-neutral-950
   dark:text-neutral-400` on the footer, `+ dark:hover:text-neutral-200` on
   the link.
4. **F-4** — the nine module sites: the six+one red deletes `+
   dark:text-red-400 dark:hover:bg-red-950/50`; the emerald start `+
   dark:text-emerald-400 dark:hover:bg-emerald-950/50`; the Profile Log-out
   `+ dark:border-red-900 dark:bg-red-950/50 dark:text-red-400
   dark:hover:bg-red-900/60`.
5. **The palette pins**: run the pins⇔usage census; every new pair gains
   its v3 pin in the session-88 block (expected additions: neutral-100,
   neutral-200, neutral-400, neutral-800 if new as consumed — the census is
   the authoritative list).
6. Re-run the net: the census + arithmetic pins green; the four e2e legs
   green live (each cure verified computed, not eyeballed).

**WP-3 (the ladder + the five docs):** every count site (README badge +
tables + testing §, AGENTS commands + gate order + the a11y-net bullet's
widening, CLAUDE tables + pyramid, PAD tree + §8.1 rows + totals + the
§11 ledger — the interaction-states round rows [the three retirements +
the reference-shared light-ring entry + the reference's invisible-keyboard-
focus entry + the 1px-ring AAA note], SKILL §2/§8/§11/§12 — **lesson 24**:
"the interaction states are a surface the gate never read — axe never
hovers, never focuses, and the state walks render resting pages only; and a
computed-style probe of a transitioning property reads t≈0 — settle before
you measure" + v1.17.0→**v1.18.0**). docs-counts GREEN.

**WP-4 (the full gate, live, post-cure):** lint → tsc → unit → build →
smoke → e2e (the widened net green as the new checks) → `bun audit` ZERO →
db census MATCH.

**WP-5 (the captures):** the 23-file set re-taken via the house procedure
(the cures move zero LIGHT pixels — the movers must be none beyond the
documented raster class; the DARK set gains the intended movers: the
dark pages' footer + row buttons) **+ the NEW set**: 24-dark-exercise-rows
(the data-bearing dark row surface, the cured delete buttons visible),
25-dark-login-focus (the input carrying its keyboard focus ring, the
neutral-400 ring's face) — each verified non-blank + genuinely dark + the
account normalized (Light + Indigo Dream, `/api/prefs`-verified) before any
capture fires.

**WP-6 (the records):** the worklog WH-20 entry, this plan's execution
record, `docs/session_37.md` (the round transcript).

**WP-7 (the ship):** stage (no `.env`/db/keys — the WH-20 scratch scripts
`scripts/wh20-*.ts|js|py|sh` stay untracked), commit to `main`, the
SSH-wrapper push (`--remote git@github.com:nordeim/wellness-hub.git`, the
paramiko shim on PATH, key outside the repo, dry-run → push → remote
verify → shred), then the `update session log` commit.

---

## 3. Decisions (open questions, decided)

1. **The dark ring step is neutral-400, not the module token's neutral-300**
   — the login family keeps its slightly-softer-than-module character (the
   reference's own ring is one step softer than its module surfaces too),
   and neutral-400 is already the family's icon ink (`dark:text-neutral-400`
   inputIcon). 7.11:1 clears 3:1 with the same margin family the WH-19
   pairs target.
2. **The border arm cures to neutral-500 (3.43:1), not neutral-400** — the
   border is the indicator's secondary arm; matching the ring exactly would
   double the visual weight of the focus state. One step apart reads as
   ring-then-edge, the two-color indicator technique (C40) in miniature.
3. **F-5 is documented, not cured** (the parity doctrine, the preset-axis
   precedent): the light ring is the reference's own computed anatomy,
   byte-identical on both apps. The ledger entry carries the measured
   ratios and the pin enforces them.
4. **The both-mode gray exemption is structural, not enumerated ad hoc** —
   `gray-200/300/400` is the reference's own faint-affordance family (its
   unchecked circle anatomy), visible on both modes by construction; the
   census documents the boundary so a future audit re-litigates the RULE,
   not the instances.
5. **The data-bearing row leg creates its row via the API** (the
   storageState cookie, `POST /api/workouts`) rather than seeding — the
   e2e db stays the seeded contract; one API row is invisible to every
   other spec's assertions (each walks its own freshly-seeded or
   self-created state), and the CRUD spec's own rows demonstrate the
   pattern is safe.
6. **The 1px rings stay 1px** — 2.4.13 is AAA (verified against the W3C
   Understanding doc), outside the claimed A+AA conformance; the ledger
   records the deferred AAA upgrade so the decision is written down, not
   re-litigated. Nothing in this round changes the claimed conformance
   level.
7. **The light-mode faint affordances (the gray-300 unchecked circle) are
   out of scope** — reference-anatomy mirrors, icon-class (axe does not
   read SVG ink), light-mode-only, and pre-existing; the F-6 leg's row
   walk surfaces them to the nets where they can be judged on evidence,
   not speculation.

---

## 4. Execution record (2026-10-30, WH-20 — filled as executed)

- **WP-1 (RED):** executed across the session interruption. The census landed with the 11-site deterministic inventory (F-2's toast arm, the F-3 footer link, F-4's nine module sites) after exemption (c) — the BLACK OVERLAY SCRIM — removed the two video-overlay false positives the audit sweep itself had missed (learning + routines hover:bg-black/40; the scrim exemption requires the resting bg-black/… layer in the same string, so a bare hover:bg-black elsewhere still needs its twin). The interaction-contrast arithmetic pin (tests/interaction-contrast.test.ts, +4 checks) failed 4/4 on the audit's exact causes: F-1 at 2.29/2.08 (neutral-600), F-2/F-3/F-4 on the missing arms, F-5 on the absent ledger row. The e2e four legs failed at the audit's exact measures — (b) rgb(82,82,82)@2.29:1, (c) rgb(255,255,255) white island, (d) ink rgb(23,23,23) on rgb(28,28,31)@1.05:1 — with (a) green-by-marginal at 3.12:1, exactly the F-4 downgrade the audit ledger predicted (its deterministic RED lives in the census + the pin). THREE artifact bugs cured mid-WP, each caught by its own RED mismatch: the census's first run passed spuriously (the gate regex /(:hover|:focus)/ was INVERTED — Tailwind writes hover:, not :hover), the e2e probe's ReferenceError (page.evaluate serializes the function body — a Node-side closure constant is invisible in the page context; the probe source now rides the evaluate ARGS), and the (b) leg's layer parse (a lookahead regex matched nothing on the computed `) 0px 0px` form — split on the color boundary, sort by spread, take the outermost opaque). The CANONICAL flips: 330→335 / 22→23 suites / 53→57.
- **WP-2 (GREEN):** F-1's four sites — the two login inputs + the signup input (ring → dark:focus:ring-neutral-400 @ 7.11:1 vs the card / 6.45:1 vs the input blend; border → dark:focus:border-neutral-500 @ 3.43:1, the indicator's secondary arm one step softer than the ring by design) and the 404 homeButton (ring → neutral-400; its hover border twin → neutral-500 in the same stroke). F-2: the toast's dark:hover:text-neutral-100 (15.59:1 vs the dark hover wash). F-3: the footer's full dark pair (dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 @ 7.85:1) + the link's dark:hover:text-neutral-200 (15.72:1). F-4: the seven red deletes + the routines emerald start (+dark:text-red-400 +dark:hover:bg-red-950/50; +dark:text-emerald-400 +dark:hover:bg-emerald-950/50) and the Profile Log-out (dark:border-red-900 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/60). The palette surgery: +1 v3 pin (neutral-200 — exactly the plan's predicted addition); the pins⇔usage census green. The e2e re-run GREEN — all four legs computed-verified. TWO full-suite catches cured: the wellness-crud cross-spec row pollution (the spec asserts Total Workouts at exactly 1 while the (a)/(d) legs' rows persisted in the shared e2e db — the describe's afterEach now deletes every workout through the API and VERIFIES the deletion, the next run's reseed the backstop) and the stale .next/standalone lesson (the webServer serves what was last built — the GREEN run needed bun run build before the server could see the cures).
- **WP-3 (docs):** 335/23/57 at every live-tense site (README badge + tables + testing §; AGENTS commands + the a11y-net bullet's WH-20 widening; CLAUDE tables + pyramid; PAD tree + §8.1 rows [the infra row 11 files/136, the a11y row 14] + totals + the §11 ledger's FOUR new rows [the interaction-states retirement, the light-ring parity entry at 2.56/2.45, the reference's invisible-keyboard-focus entry, the 1px-ring AAA deferral]; SKILL §2's pins list + §8's WH-20 passage + v1.17.0→v1.18.0 + §12 LESSON 24 + the §9 A-4b cure — the stale five-member v4-family header never carried the sixth pin). docs-counts GREEN 10/10.
- **WP-4 (gate):** lint 0/0 · tsc 0 · unit 335/335 (23 suites) · build OK · smoke 14/14 · e2e 57/57 · db census MATCH (after reseeding the dev db — three workouts + one badge of the audit's own probe residue) · bun audit ZERO.
- **WP-5 (captures):** the 23-file set re-taken via the house procedure with FULL normalization — ALL BYTE-STABLE (zero unintended movers; the cures move zero LIGHT pixels by construction, and the dark footer change sits BELOW THE FOLD: the footer's top lands at exactly y=900 in the 1280×900 viewport, 0 captured pixels, live-verified rgb(10,10,10) on the dev server). ONE mover root-caused and re-taken: 23-dark-404 — the 404's span renders the REAL unmatched path, so the capture route name is part of the pixels; re-taken on the WH-19 route name → byte-stable. The NEW set: 24-dark-exercise-rows (the API row visible on the dark Exercise page, verified 44,515 px in the row-card band) + 25-dark-login-focus (the #email carrying its real keyboard focus, the neutral-400 ring's face, verified 2,508 neutral-400 px + 4,739 white px in the card zone). The md5 ledger (25 files) committed; the account normalized + reverted (rows 0/0, Light — both verified).
- **WP-6 (records):** the worklog WH-20 entry + this record + docs/session_37.md.
- **WP-7 (ship):** staged (no .env/db/keys; the wh20-* scratch scripts stay untracked), committed to main, the SSH-wrapper push (--remote git@github.com:nordeim/wellness-hub.git, the paramiko shim, key outside the repo, dry-run → push → remote verify → shred), then the session-log commit.
