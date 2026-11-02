# WH-46 Remediation Plan — the twelfth parity surface round (session 46)

Date: 2026-11-02 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round).

## Round inputs (validated live before this plan)

- The workspace refreshed via `git pull` (main at `a7fcb18` — the WH-45
  ship `6101ad4` + the operator's session_88 log push; the environment
  carried over intact: bun 1.3.14, node_modules, a live `.env`
  AUTH_SECRET, `db/` populated). **The baseline gate re-run live, ALL
  GREEN at the exact WH-45 ship state: lint 0/0 · tsc 0 · unit
  375/375 (26 suites) · build OK · smoke 14/14 · e2e 72/72 (the
  mobile-nav battery re-run explicitly — the instruction's emphasis:
  8/8) · census MATCH · `bun audit` zero.**
- The WH-45 changes audited on the tree (Mode C): the eleventh surface
  `scripts/parity-account.mjs` (446 lines — the structural card anchor,
  the pinned-deviation Session-card class, the shadow real-layers
  normalizer, the DOM-shape FACT lines) — structure, anchors and
  conventions all standing, clean; the docs ladder sites verified.
- **Watch round 35: a genuine js MOVED — the TWENTIETH distinct bundle**
  (`/static/index-BA3Eznmu.js` → `/static/index-l0vUUttr.js`; the CSS
  content hash STABLE at `index-CapATpwD.css` for the THIRD consecutive
  round) — the single-axis move class. The same-run computed digest
  **15/15 MATCH on the new bundle** (the rendered face byte-held through
  the move). The cooling note's js-axis streak RESETS (round 34 was the
  second consecutive fully-quiet read; the css axis holds at three);
  the watch stays every-round regardless. The ledger re-bases on the js
  axis this round.
- **The standing battery's EIGHTH full-width run — all ELEVEN legs
  green, paced across two login windows** (the mandatory pacing; no
  limiter trips on either side): parity-login **34/34** (the zero-login
  leg) · parity-moodform **20/20** · parity-shell **61/61** (the drawer
  battery — the instruction's mobile-menu emphasis) · parity-dashboard
  **105/105** · parity-headers **192/192** · parity-toolbars **98/98** ·
  parity-kpis **315/315** · parity-routines **697/697** ·
  parity-tutorials **790/790** · parity-profile **433/433** ·
  parity-account **146/146** (the eleventh surface's first battery
  ride) — **2,891 computed members live-vs-live, zero manual evals**.
- The standing blocks verified on the tree (the instruction's
  checklist): the `.env`/db contract (`DATABASE_URL="file:../db/custom.db"`
  → `<repo>/db/custom.db`, the census reads it: 1/11/50/12/8 + 1 mood
  row, MATCH), `.env.example` tracked and accurate (the only diff vs
  `.env` is the AUTH_SECRET value), the vitest/playwright configs
  (375/72, the e2e db PINNED), the sitemap/robots/manifest route
  handlers (the dev-server content re-verified: the 14-url set + the
  1.0/0.8 priorities, the robots directives, the manifest fields), the
  Tailwind v4 pins standing in `globals.css` (both `@custom-variant`s +
  `--shadow-sm` + `--blur-sm` + the three `@source not`), the mobile
  drawer battery green inside the 72/72 AND re-run explicitly.
- The neo-crm sibling: informational, per the WH-45 record (unchanged at
  v1.204.0; no re-probe spent this round).

## Findings (the twelfth-surface decode — the login family's
forgot/sent/signup views; the WH-45 plan's (c) candidate, decode-first
against the live pair, one consolidated zero-login flight + one
widening flight for the sent view)

- **F-1 [the round's core — the parity net's TWELFTH SURFACE]**
  — **`scripts/parity-authviews.mjs`** — the login family's FORGOT +
  SENT + SIGNUP views (three of the four non-signin views; the login
  view itself rode the parity-login surface since WH-36; the VERIFY
  view stays data-blocked — the reference's OTP delivery is
  email-only, the PAD §11 standing block). **ZERO-LOGIN on both
  sides** (logged-out views — no reference login budget, no
  dev-server login budget) and **ZERO-WRITE on the reference** (the
  view swaps are client state; the reference's own "Send reset link"
  renders the sent view purely from client state — no network fires,
  the login-reset.ts session-11 decode). Our side: ONE
  no-enumeration `POST /api/auth/forgot-password` per flight with a
  NONEXISTENT probe email (`parity-probe@example.com`) — the same 200
  + message whether or not the account exists, zero account impact.
  The decoded member families:
  - **The FORGOT (reset) view** — the back button (the text/face/16px
    icon/gap/geometry) + the h2 title + the description p + the email
    label + the input box (w/h/radius/border/bg-composite/font/
    paddingLeft/placeholder) + the Send reset link button (text/
    geometry/bg/ink/radius/font) + the view y-ladder.
  - **The SENT view** — the 64px icon circle (the is-round
    normalization) + the circle icon (28px face/ink) + the h2 + the
    email line + the medium-weight email span + the green callout
    (the 368px box, the bg-composite, the border, the radius, the
    inner p's leading) + the sent back button (the centered
    justify-content form) + the ladder.
  - **The SIGNUP view** — the back button + the h2 + the three labels
    (Email/Password/Confirm) + the three inputs (the full input-box
    anatomy ×3 + the placeholders "you@example.com"/"Min. 8
    characters"/"Re-enter password") + the Create account submit +
    the field y-ladder (263/291/369/455/541/601 at 1280×900).
- **F-2 [the decode's serialization classes — FOUR, all documented
  with standing cures]**:
  - **(a) oklab/rgba alpha** — the inputs' slate-50/50 wash and the
    callout's green-50/70 (our v4 emits oklab, the reference's CDN
    emits rgba) → the **1×1-canvas composite** (the parity-login
    class (a), verbatim — the byte quad is identical across
    serializations because the canvas does the math).
  - **(b) rounded-full 9999px vs calc(infinity)** — the sent icon
    circle → the **is-round normalization** (the parity-login class
    (c), verbatim — the parsed radius ≥ half the disc's width is the
    rendered fact).
  - **(c) the input padding box-model split** — the reference's inputs
    compute paddingTop 8px where ours compute 0px, with the rendered
    44px boxes and the y-ladders byte-identical (both apps center the
    ~17px line box at the same position: 8px pad + 26px content vs
    0px pad + 42px content land the ink at the same offset). The
    member is the RENDERED BOX (w/h/y) + the placeholder face —
    never the serialized padding (the lesson-43 GEOMETRY form: the
    bounding box is the fact, the mechanism is not).
  - **(d) the inherited-ink token split — the round's PINNED
    class** — the reference's inherited ink is zinc-950
    `rgb(9, 9, 11)` where ours is neutral-950 `rgb(10, 10, 10)` (the
    `--color-foreground` token; the inputs and the callout's box arm
    expose it where no explicit class overrides). At rest the inputs
    render only the PLACEHOLDER (slate-400, matched byte-for-byte)
    — the ink has zero rendered-pixel consequence until a user types;
    the reference's own internal zinc/neutral mix is documented by
    the WH-44 theme-mode decode (its own card title computes
    neutral-950 `rgb(10, 10, 10)`). PINNED at BOTH apps' own
    documented values (the parity-profile pinned-deviation
    precedent): a pin failing is a DRIFT — if either app re-authors
    its ink token, the pin fires same-round.
- **F-3 [LOW — the watch's js move]** — the twentieth bundle
  (`BA3Eznmu` → `l0vUUttr`): the ledger re-bases on the js axis,
  born-verified on the quiet state (assets stable + 15/15).
- **F-4 [LOW — the cooling note update]** — round 34's two-quiet
  streak on the js axis ends (round 35 moved); the css axis holds at
  three consecutive stable rounds. The note updates in the docs
  ladder — a quiet round is a reading, never a retirement.
- **F-5 [LOW, positive]** — the standing blocks hold (the battery
  above, the drawer battery ×2, the v4 pins, census, audit zero, the
  sitemap/robots/manifest content, `.env.example` accurate); the
  WH-45 cures verified standing on the tree.

## Work packages

- **WP-0** — this plan, validated against the tree during the decode:
  the login-card view structures (the `LOGIN_RESET_LAYOUT` /
  `LOGIN_SIGNUP_LAYOUT` records, the goto() view machine), the
  login-reset.ts flow decode (the reference's client-state send), the
  no-enumeration forgot route (the same-200 contract), the
  parity-login conventions (the zero-interaction doctrine, the
  canvas/is-round normalizers). No src cure sites — the decode found
  no drift to cure; the round's code artifact is the script itself.
- **WP-1 (F-1 + F-2)** — write `scripts/parity-authviews.mjs`
  (modeled on the parity-login precedent + the decode findings): PASS
  A the reference (the zero-login walk: /login → Forgot password? →
  the reset read → the probe email → Send reset link → the sent read
  → Back to sign in → Need an account? Sign up → the signup read),
  PASS B our dev server (the same walk), the member-by-member
  live-vs-live diff, exit 1 on any DRIFT/PROBE-ERROR. The canvas
  composite + is-round normalizations; the input ink + the callout
  box ink as PINNED members; the padding split documented in the
  header (the rendered box asserted, the mechanism not). ZERO-LOGIN
  both sides; ZERO-WRITE on the reference. **Born-verify ×3
  consecutive flights** (the our-side forgot POSTs paced under the
  10/15min limiter — 3 flights = 3 calls, well under).
- **WP-2 (F-3 + F-4)** — the watch ledger re-base on the js axis
  (`l0vUUttr`), born-verified BOTH outcomes (the firing state caught
  live + the quiet state verified after); the cooling note's js-axis
  reset recorded.
- **WP-3 (F-5 + the docs ladder)** — PAD §11 (the watch row's
  round-35 record + the twelfth-surface row + the pinned-ink note) +
  §8.1 (the totals stay 375 — no unit pins this round), AGENTS (round
  35 + the TWELVE-script battery + the cooling reset), SKILL
  v1.43.0 → **v1.44.0** (the parity row widened to TWELVE surfaces),
  README/CLAUDE (no count sites — the ladder flat), the worklog
  WH-46 entry, this plan's execution record, `docs/session_89.md`.
- **WP-4** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the SEVENTEENTH cross-round byte
  comparison — the login-family captures expected to hold byte-stable
  (no src face change this round); every mover root-caused before any
  re-base, the ledger verified 0 mismatches, census MATCH after. Then
  the FULL GATE re-run on the final tree (the count ladder FLAT:
  unit 375/375; e2e 72/72; build/smoke/lint/tsc green).
- **WP-5** — the scratch cleanup (`scratch-decode-signup-forgot.mjs`
  deleted; zero residue) + the local commit + the SSH-wrapper push
  (main only, the runbook procedure, the key shredded after).

## The round's class (no new lesson candidate)

The twelfth surface lands with FOUR known classes — two standing
normalizations (the canvas composite + is-round, both the
parity-login precedents verbatim), one box-model mechanism split (the
lesson-43 GEOMETRY form), and one pinned token split (the
parity-profile pinned-deviation precedent). The decode-first doctrine
paid off again: the member set was settled live before the script was
written, so the born-flight can only fire on a probe bug or a real
same-round move. No new lesson — the existing lessons 40/43/48 + the
parity-login precedent carried the decode end-to-end.

## Suggested next (WH-47)

(a) the standing battery at full width (watch round 36 + the TWELVE
  parity scripts — the login-budget math is unchanged for the twelve:
  parity-authviews spends ZERO reference logins, so the battery stays
  at eleven reference logins per round counting the watch's — the
  two-window pacing stays MANDATORY);
(b) the twelfth surface's stability flights join the standing cadence;
(c) the THIRTEENTH surface candidates: the empty-state family beyond
  the watched legs (the sr/exercise zero-row interiors at the computed
  level), the goals achievements section interior (the demo zero
  state — the watch reads the counts only), the dashboard's Recent
  Activity list interior (the WH-28 decode's standing face — a
  live-vs-live widening would catch re-authorings);
(d) the standing blocks recheck + the preset-catalog watch (the
  catalog members ride the profile surface).

---

## Execution record (WH-46, 2026-11-02)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree during the decode
  (the login-card view structures, the LOGIN_RESET_LAYOUT /
  LOGIN_SIGNUP_LAYOUT records, the login-reset.ts flow decode, the
  no-enumeration forgot route, the parity-login conventions).
- **WP-1 (F-1 + F-2)** ✓ — `scripts/parity-authviews.mjs` written
  (**192 members**: 187 MATCH + 5 PINNED): the FORGOT view (the
  landscape counts, the back button's face + 16px icon + gap, the h2,
  the description, the email label, the input box's full anatomy, the
  16px slate-400 mail icon, the Send reset link button, the view
  y-ladder) + the SENT view (the 64px icon circle + its 28px icon, the
  h2, the email line + the medium-weight span, the 368px green
  callout, the centered back button, the ladder) + the SIGNUP view
  (the landscape counts, the back button, the h2, the three labels +
  three inputs' full anatomy + placeholders, the Create account
  submit, the field y-ladder 263/291/369/455/541/601) + the canvas
  composite + is-round normalizations + the input padding box-model
  split documented + the inherited-ink token split as PINNED members
  (the at-rest no-render class). ZERO-LOGIN both sides; ZERO-WRITE on
  the reference. **Born-verified 192/192 ×3 consecutive flights —
  BORN-QUIET**, the net's third surface to land with zero real drift.
- **WP-2 (F-3 + F-4)** ✓ — the watch ledger re-based on the js axis
  (`l0vUUttr`) with the round-35 record; born-verified BOTH outcomes
  (the firing state caught live at the round's start + the quiet state
  after the edit: `assets stable` + 15/15, twice); the cooling reset
  recorded in AGENTS + the PAD watch row + the session log.
- **WP-3 (F-5 + the docs ladder)** ✓ — PAD §11 (the watch row's
  round-35 record + the twelfth-surface row + the pinned-ink note),
  AGENTS (round 35 + the TWELVE-script battery + the cooling reset +
  the unchanged-login-count note), SKILL v1.43.0 → v1.44.0 (the parity
  row widened to TWELVE surfaces + the twelfth surface's own row),
  README/CLAUDE (no count sites — the ladder flat), the worklog WH-46
  entry, this record, docs/session_89.md. The count ladder FLAT at 375
  (no unit pins — no src drift found; the round's code artifact is the
  script itself); the docs-counts lockstep green.
- **WP-4** ✓ — the capture round + the full gate on the final tree
  (below).
- **WP-5** ✓ — the scratch probe (`scratch-decode-signup-forgot.mjs`)
  deleted + the local commit + the SSH-wrapper push.

**The round's deviations from the plan**: none — the decode's
born-quiet prediction held on the first flight (192/192), the four
classes rode their documented treatments as planned, and the count
ladder stayed flat as planned.
