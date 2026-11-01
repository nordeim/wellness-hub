# WH-45 Remediation Plan — the eleventh parity surface round (session 45)

Date: 2026-11-02 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round).

## Round inputs (validated live before this plan)

- The workspace refreshed via `git pull` (main at `e7c94f0` — the WH-44
  ship `88c081c` + the operator's session_86 log push; the environment
  carried over intact: bun 1.3.14, node_modules, .env with a live
  AUTH_SECRET, db/ populated). **The baseline gate re-run live, ALL GREEN
  at the exact WH-44 ship state: lint 0/0 · tsc 0 · unit 375/375 (26
  suites) · build OK · smoke 14/14 · e2e 72/72 (the mobile-nav battery
  re-run explicitly — the instruction's emphasis: 8/8) · census MATCH ·
  `bun audit` zero.**
- **Watch round 34: FULLY QUIET — the first round since 20 with BOTH
  axes stable** (css `index-CapATpwD.css` + js `index-BA3Eznmu.js`, the
  round-33 final read, unchanged) and the computed digest **15/15
  MATCH**. This is the SECOND consecutive fully-quiet read on the same
  asset state (the round-33 born-verification was the first) — the
  doctrine's two-plus threshold: **the COOLING NOTE lands this round**
  (the reference's active-development cadence has cooled; the watch
  stays every-round regardless — a quiet round is a reading, never a
  retirement).
- **The standing battery's SEVENTH full-width run — all TEN legs green,
  paced across two login windows** (the mandatory WH-44 amendment: five
  reference logins per window, no limiter trips on either side):
  parity-login **34/34** (the zero-login leg) · parity-moodform **20/20**
  · parity-shell **61/61** (the drawer battery — the instruction's
  mobile-menu emphasis) · parity-dashboard **105/105** · parity-headers
  **192/192** · parity-toolbars **98/98** · parity-kpis **315/315** ·
  parity-routines **697/697** · parity-tutorials **790/790** ·
  parity-profile **433/433** (the tenth surface's first battery ride) —
  **2,745 computed members live-vs-live, zero manual evals**.
- The WH-44 changes audited on the tree (Mode C): the COLOR_PRESETS
  re-authoring (16 decoded hex values), the four face cures (the
  mode-card neutral-950 ink, the preset-label block arm, the color
  inputs' stock form, the icon-less Save button), the preset-catalog
  parity contract + the face-cures census pins, the
  `scripts/parity-profile.mjs` surface (433 members, the
  pinned-deviation class) — all standing, the battery green.
- The standing blocks verified on the tree (the instruction's
  checklist): the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"`
  → `<repo>/db/custom.db`, the census reads it), `.env.example` tracked
  and accurate (the only diff vs `.env` is the AUTH_SECRET value, by
  design), the vitest/playwright configs (375 unit / 72 e2e, the e2e db
  PINNED), the sitemap/robots/manifest route handlers (the smoke's
  ok-12 leg all 200 + the CONTENT verified this round: the sitemap's
  url set + priorities, the robots directives, the manifest fields),
  the Tailwind v4 pins standing in `globals.css` (`@custom-variant
  hover` + `@custom-variant dark` + `--shadow-sm` + `--blur-sm` + the
  three `@source not`), the mobile drawer battery green inside the
  72/72 AND re-run explicitly.
- The neo-crm sibling: unchanged at v1.204.0 (informational, rechecked
  from the WH-44 record; no re-probe spent this round).

## Findings (the eleventh-surface decode — the Profile's Account +
Preferences tabs, the WH-44 plan's (c) candidates; decode-first, two
consolidated flights, one debug flight on the row-vocabulary)

- **F-1 [the round's core — the parity net's ELEVENTH SURFACE]**
  — **`scripts/parity-account.mjs`** — the Profile's Account + Preferences
  tab interiors (the two tabs the tenth surface left unread; one login
  per app, both tabs read in the same flight — the tab clicks are view
  state only, ZERO-WRITE). The decoded member families:
  - **The Account tab** — the Account Information card (the chrome +
    the header pads + the title face + the 20px title icon) + the three
    disabled inputs (the full computed anatomy: the gray-50 wash, the
    6px radius, the 14px font, the 4/12 padding, the line border, the
    not-allowed cursor, **the opacity 0.5 disabled arm**) + the three
    labels (the 14px/500/inline face) + the group rhythm (the input
    y-ladder 280/364/448).
  - **The Preferences tab** — the App Preferences card + the two
    checkbox rows (the full anatomy: 912×78, flex items-center
    justify-between, p-4, rounded-lg 8px, the line border, transparent
    bg, gap normal) + the title face (16px/500/ink) + the subtitle face
    (14px/gray-500) + the native 20×20 checkboxes.
  - **THE DECODE VERDICT: born-quiet** — every shared member reads
    byte-identical on both apps (the inputs' 14 computed members, the
    labels, the y-ladders, the row geometry, the checkbox forms). The
    net's second surface to land with ZERO real drift (the kpis
    precedent — the WH-24/25-probed family landing born-quiet per the
    lesson-42 doctrine).
- **F-2 [MEDIUM — the Session card, resolved as the LEDGERED superset]**
  — the reference's Account tab carries exactly ONE card (Account
  Information; `cardCount: 1`); ours renders TWO (the Session card with
  the "Sign out of this device" description + the red Log out button).
  This is NOT a new finding to cure: the PAD §11 WH-25 row already
  ledgers it — "Our Session card (the logout) stays the functional
  superset — the reference's Account tab carries no logout surface."
  The eleventh surface carries it as **PINNED-DEVIATION members** (the
  parity-profile precedent: the Session card's chrome + title + p +
  button asserted at OUR documented values; a pin failing is a DRIFT —
  if the reference ever GAINS a logout surface, the pin fires
  same-round).
- **F-3 [LOW — the DOM-shape facts, the lesson-48 family continues]**
  — the reference's Account section title is a plain DIV (ours an H2 —
  our semantic superset); its Preferences row title/subtitle are Ps
  (ours SPANs — the reference computes display:block where our spans
  compute inline, but the rendered face is identical: the row heights
  78px and the checkbox y-ladders match byte-for-byte); the reference's
  Account labels are unwired (no `for=`) where ours carry htmlFor (our
  a11y superset, the WH-25 note). All documented as DOM-shape facts in
  the script's header — never cured (the lesson-27 same-face class).
- **F-4 [LOW, watch — the cooling note]** — round 34 is the second
  consecutive fully-quiet read (both asset axes stable + 15/15): the
  COOLING NOTE lands in the docs ladder (AGENTS + the PAD watch row).
  No ledger re-base (nothing moved).
- **F-5 [LOW, positive]** — the standing blocks hold (the battery
  above, the drawer battery ×2, the v4 pins, census, audit zero, the
  sitemap/robots/manifest CONTENT verified, `.env.example` accurate);
  the WH-44 cures verified standing on the tree.

## Work packages

- **WP-0** — this plan, validated against the tree during the decode:
  the Profile page structure (`profile-page.tsx`'s AccountPanel +
  PreferencesPanel + the tab definitions), the PROFILE_PANEL /
  PROFILE_PREFS records (`src/lib/page-layout.ts`), the PAD §11 WH-25
  Session-card ledger row (the F-2 provenance), the parity-profile.mjs
  conventions (the login flow, the structural anchors, the
  pinned-deviation class). No src cure sites — the decode found no
  drift; the round's code artifact is the script itself.
- **WP-1 (F-1 + F-2 + F-3)** — write `scripts/parity-account.mjs`
  (modeled on the parity-profile precedent): PASS A the reference (ONE
  login → /Profile at 1280×900 → the Account tab → the member read →
  the Preferences tab → the member read), PASS B our dev server (the
  same reads), the member-by-member live-vs-live diff, exit 1 on any
  DRIFT/PROBE-ERROR. The shadow real-layers normalization (the
  lesson-40 class). The Session card as PINNED-DEVIATION members; the
  DOM-shape facts in the header. ZERO-WRITE on both apps. **Born-verify
  ×3 consecutive flights** (paced for the login budget; the dev server
  restarted before the flight battery per lesson 46).
- **WP-2 (F-4)** — the watch quiet-state record: no ledger re-base
  (nothing moved); the cooling note drafted for the docs ladder.
- **WP-3 (F-5 + the docs ladder)** — PAD §11 (the watch row's round-34
  record + the eleventh-surface row) + §8.1 (the totals stay 375 — no
  unit pins this round), AGENTS (round 34 + the ELEVEN-script battery +
  the cooling note), SKILL v1.42.0 → **v1.43.0** (the parity row
  widened to ELEVEN surfaces), README/CLAUDE counts (the battery
  members note), the worklog WH-45 entry, this plan's execution record,
  `docs/session_87.md`.
- **WP-4** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the SIXTEENTH cross-round byte comparison
  — the Account/Preferences captures expected to hold byte-stable (no
  src face change this round); every mover root-caused before any
  re-base, the ledger verified 0 mismatches, census MATCH after. Then
  the FULL GATE re-run on the final tree (the count ladder FLAT:
  unit 375/375; e2e 72/72; build/smoke/lint/tsc green).
- **WP-5** — the scratch cleanup (`scratch-decode-acct-prefs.mjs`
  deleted; zero residue) + the local commit + the SSH-wrapper push
  (main only, the runbook procedure, the key shredded after).

## The round's class (no new lesson candidate)

The eleventh surface lands born-quiet — the decode-first doctrine's
payoff round: the WH-24/25 probes pinned these families' source forms
years-of-rounds ago, the WH-44 face-cures round widened the Profile
coverage, and this round's decode confirms the shared faces byte-held.
The lesson-48 vocabulary class applies one more time (the P/SPAN row
vocabulary) but adds nothing new to the canon — the existing lessons
48 (structural anchors + full-anatomy decodes) and 47 (text-anchored
selectors) carried this decode end-to-end.

## Suggested next (WH-46)

(a) the standing battery at full width (watch round 35 + the ELEVEN
  parity scripts — twelve reference logins/round is OVER the 10/15min
  budget: the two-window pacing stays MANDATORY);
(b) the cooling watch: round 34 was the second consecutive quiet read;
  a third extends the note, a move resets it;
(c) the TWELFTH surface candidates: the empty states family beyond the
  watched legs (the sr/exercise zero-row interiors at the computed
  level), the goals achievements tiles (the demo zero state — the
  watch reads the counts only), the login family's forgot/sent views
  (the (l) leg pins the geometry; a live-vs-live surface would catch
  re-authorings);
(d) the standing blocks recheck + the preset-catalog watch (the catalog
  members ride the profile surface).

---

## Execution record (WH-45, 2026-11-02)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree during the decode
  (the Profile panel structures, the PROFILE_PANEL/PROFILE_PREFS
  records, the PAD §11 WH-25 Session-card ledger row — F-2's
  provenance confirmed, the parity-profile conventions).
- **WP-1 (F-1 + F-2 + F-3)** ✓ — `scripts/parity-account.mjs` written
  (**146 members**: 141 MATCH + 5 PINNED): the Account tab (the Account
  Information card's chrome/header/title/20px icon + the three disabled
  inputs' FULL 14-member computed anatomy — incl. the opacity-0.5
  disabled arm — + the three labels + the group y-ladder 280/364/448) +
  the Preferences tab (the card + the two checkbox rows' full anatomy +
  the title/subtitle faces + the native 20×20 checkboxes) + the Session
  card as PINNED-DEVIATION members (the count pin + the
  title/description/button anatomy at our documented values) + the
  DOM-shape facts (DIV/H2 titles, P/SPAN row texts, the unwired-labels
  a11y superset) in the header. **Born-verified 146/146 ×3 consecutive
  flights — BORN-QUIET**, the net's second surface to land with zero
  real drift (the kpis precedent).
- **WP-2 (F-4)** ✓ — the watch round-34 quiet record: no re-base (both
  axes stable); the cooling note landed in AGENTS + the PAD watch row +
  the session log.
- **WP-3 (F-5 + the docs ladder)** ✓ — PAD §11 (the watch row's
  round-34 record + the eleventh-surface row) + §8.1 (the totals flat
  at 375), AGENTS (round 34 + the ELEVEN-script battery + the cooling
  note), SKILL v1.42.0 → v1.43.0 (the parity row widened to ELEVEN
  surfaces), README/CLAUDE (no count sites — the ladder flat), the
  worklog WH-45 entry, this record, docs/session_87.md. The count
  ladder FLAT at 375 (no unit pins — no src drift found; the round's
  code artifact is the script itself); the docs-counts lockstep green.
- **WP-4** ✓ — the capture round + the full gate on the final tree
  (below).
- **WP-5** ✓ — the scratch probe (`scratch-decode-acct-prefs.mjs`)
  deleted + the local commit + the SSH-wrapper push.

**The round's deviations from the plan**: none — the plan's born-quiet
prediction held on the first flight (146/146), the Session card rode
the pinned-deviation class as planned, and the count ladder stayed
flat as planned.
