# WH-44 Remediation Plan — the tenth parity surface round (session 44)

Date: 2026-11-02 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round).

## Round inputs (validated live before this plan)

- Fresh clone to `f4a12b9` (main, clean; the operator's session_84 log push
  on top of the WH-43 ship `7cd412c`). The environment rebuilt (bun 1.3.14 ·
  chromium 1248 reinstalled — the sandbox cache carried 1200 only, the known
  first-run gap · a fresh 64-hex AUTH_SECRET · db:push + db:seed · census
  MATCH). **The baseline gate re-run live, ALL GREEN at the exact WH-43 ship
  state: lint 0/0 · tsc 0 · unit 373/373 (26 suites) · build OK · smoke
  14/14 · e2e 72/72 (the mobile-nav battery re-run explicitly — the
  instruction's emphasis: 8/8) · census MATCH · `bun audit` zero.**
- **Watch round 33: the js bundle moved AGAIN** — `/static/index-DrgN_FlZ.js`
  → `/static/index-BgVoVawV.js` (the EIGHTEENTH distinct bundle; the css
  axis STABLE at `index-CapATpwD.css` for the second consecutive round).
  The same-run digest read **15/15 MATCH on the new bundle** (the full
  output captured unfiltered) — the rendered face held. Rounds 28-33 each
  moved at least one axis; the cooling policy stays unborn.
- **The standing battery's SIXTH full-width run — all NINE legs green**:
  parity-login **34/34** (the zero-login leg) · parity-moodform **20/20** ·
  parity-shell **61/61** (the drawer battery — the instruction's
  mobile-menu emphasis) · parity-dashboard **105/105** · parity-headers
  **192/192** · parity-toolbars **98/98** · parity-kpis **315/315** ·
  parity-routines **697/697** · parity-tutorials **790/790** (the net's
  widest) — **2,312 computed members live-vs-live, zero manual evals**, the
  whole battery inside ONE login window (nine reference logins, under the
  10/15min budget — no limiter trips on either side).
- The standing blocks verified on the tree: the `.env`/db contract
  (`DATABASE_URL="file:../db/custom.db"` → `<repo>/db/custom.db`, the census
  reads it), `.env.example` tracked and accurate, the vitest/playwright
  configs (373 unit / 72 e2e), the sitemap/robots/manifest route handlers
  (the smoke's ok-12 leg all 200), the Tailwind v4 pins standing in
  `globals.css` (`@custom-variant hover` + `@custom-variant dark` +
  `--shadow-sm` + `--blur-sm` + the three `@source not`), the mobile drawer
  battery green inside the 72/72 AND re-run explicitly.
- The neo-crm sibling rechecked: **v1.204.0**, unchanged from the WH-43
  record (informational).
- The WH-43 changes audited on the tree (Mode C): the search-input flips
  (both sites `type="text"`), the TUTORIALS re-sequencing, the
  grid-order + search-input census pins — all standing, the battery green.

## Findings (the WH-43 plan's (c) candidate decoded — the Profile
appearance panels; the decode-first doctrine, three consolidated flights,
the vocabulary lessons applied)

- **F-1 [HIGH — the round's core DATA finding, the WH-42/43 lesson-41
  class's THIRD instance]** — **the reference RE-AUTHORED its preset
  catalog: 7 of its 8 Quick-Preset pairs changed** (the decoded live
  values, two consecutive same-round reads identical; the primary swatches
  of 5 presets held, the secondaries of 7 changed + both swatches of 3):
  - Indigo Dream: `#6366f1`/`#a855f7` — UNCHANGED (the brand pair)
  - Ocean Blue: `#0ea5e9`/`#06b6d4` (secondary indigo-500 → cyan-500)
  - Forest Green: `#10b981`/`#059669` (secondary lime-500 → emerald-600)
  - Sunset Orange: `#f97316`/`#fb923c` (secondary rose-500 → orange-400)
  - Rose Pink: `#ec4899`/`#f472b6` (BOTH: rose-500/pink-500 →
    pink-500/pink-400)
  - Royal Purple: `#9333ea`/`#a855f7` (BOTH: violet-500/indigo-500 →
    purple-600/purple-500)
  - Crimson Red: `#dc2626`/`#ef4444` (BOTH: red-500/orange-500 →
    red-600/red-500)
  - Golden Yellow: `#eab308`/`#facc15` (secondary amber-500 → yellow-400)
  The pattern: monochromatic same-hue step pairs (500/400 or 600/500)
  replacing our two-hue pairs. The SET of labels and the ORDER held (all
  8, byte-identical sequence — no re-order this time). **The cure**:
  `COLOR_PRESETS` in `src/lib/constants.ts` re-authored to the decoded
  pairs, TDD: the preset-catalog parity pin RED first (a new `it()` in
  `tests/wellness-theme.test.ts` asserting the exact 16 hex values +
  labels + order), then the constants edit, then GREEN. Ripples handled:
  the PAD §11 preset-contrast ledger row recomputes (the table is
  derived from COLOR_PRESETS — `tests/preset-contrast.test.ts` computes
  it, so the pin stays green by construction; the PAD row's VALUES
  rewrite in the same commit); the e2e preset leg survives (it clicks
  Forest Green and asserts `--color-primary: #10b981` — the PRIMARY
  held); the demo default (Indigo Dream) unchanged → the brand face, the
  preview tile and the parity-login/shell surfaces all ride the same
  pair.

- **F-2 [MEDIUM]** — **the inactive tab ink**: the reference's inactive
  Profile tabs compute `rgb(115, 115, 115)` (neutral-500); ours ship
  `rgb(82, 82, 82)` (neutral-600). Cure: the inactive tab's text arm in
  `src/components/ui/tabs.tsx` flips to `text-neutral-500` (TDD: the
  src-census tab-ink pin — or the wellness-theme pin's neighborhood —
  RED first).

- **F-3 [MEDIUM]** — **the active Theme-Mode card ink**: the reference's
  active mode card (Light, the demo default) computes `rgb(10, 10, 10)`
  (neutral-950); ours ship `rgb(23, 23, 23)` (neutral-900 — the WH-17
  "FIXED indigo active pair" note's text arm, now drifted or mis-pinned
  originally). The border + bg arms MATCH (indigo-500 border, indigo-50
  bg). Cure: `THEME_MODE_PICKER.active`'s text arm flips to
  `text-neutral-950` (the same census pin family as F-2).

- **F-4 [MEDIUM]** — **the preset label's line-box drift**: the
  reference's preset label is a block `P` (display:block, 12px/16px); ours
  is a bare inline `SPAN` — the inline span rides the button's 20px strut
  line box, making every INACTIVE preset card 82px tall against the
  reference's 74px (the +8 line-box class). Cure:
  `PRESET_CARD.label` gains `block` (the computed face then byte-matches:
  12px/16px/500/rgb(10,10,10)/block); the ACTIVE card keeps its
  documented superset (the ring + "✓ Active" label + the 102px row —
  the WH-17 decision, ledgered in the PAD, pinned as FACTS in the new
  surface, never a silent re-base).

- **F-5 [LOW]** — **the color inputs' missing stock form**: the
  reference's `input[type=color]` carries the stock Input arms
  (`rounded-md text-sm` + the `4px 12px` padding — computed 6px radius,
  14px font); ours are bare (0px radius, 16px font, 0 padding). Cure: the
  two call sites in `profile-page.tsx` gain `rounded-md text-sm px-3
  py-1` (the w-20 h-12 cursor-pointer arms stay).

- **F-6 [LOW]** — **the Save bar's icon superset retires**: the
  reference's Save All Changes button is TEXT-ONLY ("Save All Changes ✨"
  — the emoji rides the text): 207px wide. Ours prepend a Sparkles icon
  (+16px icon +8px gap = the exact 24px width delta, 231px). Cure: the
  icon drops from the button in `profile-page.tsx` (the reference's own
  form; the ✨ emoji stays in the text on both).

- **F-7 [the round's core — the parity net's TENTH SURFACE]**
  — **`scripts/parity-profile.mjs`** — the Profile appearance family (the
  WH-43 plan's (c) candidate, decode-settled this round by THREE
  consolidated flights): the tablist (the 3 tabs' full anatomy — the
  active white+shadow card, the inactive transparent+neutral-500 pair,
  the 317px grid cells, the selected identity) + the five section cards
  (the 12px-radius chrome, the title face, the body pads — anchored
  STRUCTURALLY by the card chrome, the titles read as DATA: the
  reference's are DIVs, ours H2s — the lesson-27 same-face class) + the
  Theme Mode grid (the 3 cards' anatomy + the active pair + the
  aria-pressed superset facts) + the Colors family (the 8 preset cards'
  chrome + the swatch-pair DATA as-is + the labels + the ORDER + the
  active-superset facts; the picker rows; the color inputs; the hex
  inputs; the preview tile with the gradient stop-triples) + the
  Typography (the combo + the quick-brown-fox preview block) + the
  Background Image (the input + the Pro-tip hint) + the Visual Style
  (the 3 combos) + the Save bar (the sticky wrapper + the button, the
  gradient stop-triples + the shadow real-layers). ONE login per app,
  ZERO-WRITE (the Appearance tab click is view state only — never a
  preset/mode click, those write prefs on ours). **Born-verify: the
  first flight must read all-MATCH, exit 0** (the decode pre-verified
  every member on the cured tree); then two more consecutive flights
  for stability (the kpis ×3 precedent). Estimated ~330 members.

- **F-8 [LOW, procedure]** — the watch ledger re-base on the js axis
  (round 33's `BgVoVawV` move; the same-run digest already read 15/15
  MATCH on the new bundle — the re-base is the bookkeeping), the
  born-verification re-run on the quiet state.

- **F-9 [LOW, the round's decode lesson — LESSON 48 candidate]** — the
  decode's THIRD vocabulary family in two rounds (after lesson 47's
  anchors): the reference's Profile section titles are NOT heading tags
  (plain DIVs where ours are H2s — the semantic superset is ours), its
  preset label is a P (ours a SPAN), its preview tile a DIV (ours a P),
  its swatch row a DIV (ours a SPAN) — all same-computed-face (verified
  field-by-field). The decoder anchored the sections STRUCTURALLY (the
  12px-radius card chrome — the only shared vocabulary) and read the
  titles as data. Plus the F-5 lesson: a prior round's "the stock form"
  shorthand (WH-25's color-input note) aged — the exact class list is
  the contract; a surface conversion must decode the FULL computed
  anatomy, not trust the prior note's shorthand.

- **F-10 [LOW, positive]** — the standing blocks hold (the battery above,
  the drawer battery ×2, the v4 pins, census, audit, the smoke's SEO
  legs); the neo-crm sibling unchanged at v1.204.0; the battery ran
  inside ONE login window without tripping either limiter.

## Work packages

- **WP-0** — this plan, validated against the tree: the COLOR_PRESETS
  source form (16 hex values at `src/lib/constants.ts:234`), the
  tabs/theme-picker/preset-card records at `src/lib/page-layout.ts` +
  `src/components/ui/tabs.tsx`, the profile-page call sites (the color
  inputs, the Save button), the preset-contrast test's derivation, the
  docs-counts CANONICAL (unitChecks 373 → 374 — the F-1 pin extends
  `tests/wellness-theme.test.ts`, the suite count FLAT at 26), the watch
  ledger re-base site (js axis), the capture-round ledger (the Profile
  captures 31 + 12 will move — the catalog cure is a deliberate
  our-side face change, root-caused at WP-6).
- **WP-1 (F-1)** — the TDD catalog cure: RED (the preset-catalog parity
  `it()` asserting the 8 decoded pairs + labels + order) → run FAIL →
  the constants re-author → run PASS → the PAD §11 contrast-row values
  rewrite in the same commit (the test recomputes them — print +
  transcribe).
- **WP-2 (F-2 + F-3 + F-4 + F-5 + F-6)** — the five computed-face cures,
  each with its pin (the tab-ink + mode-ink + preset-label census pins
  join `tests/src-census.test.ts` RED-first; the color-input + save-bar
  forms ride the new surface's live members — the src pins keep the
  source structurally honest). Re-run the unit suite + the affected e2e
  legs (the profile preset leg).
- **WP-3 (F-7)** — write `scripts/parity-profile.mjs` (modeled on the
  tutorials/routines precedents): PASS A the reference (ONE login →
  /Profile at 1280×900 → the Appearance tab → the member read), PASS B
  our dev server (ONE login → the same read), the member-by-member
  live-vs-live diff, exit 1 on any DRIFT/PROBE-ERROR. The three
  normalizers (gradientStops + realLayers + the zero-alpha-layer filter).
  The active-superset + DOM-shape facts pinned as annotated members (the
  WH-17 ledger + the lesson-27 class — facts, never silent re-bases).
  ZERO-WRITE on both apps. **Born-verify ×3 consecutive flights** (paced
  for the login budget: ≥10 min apart, the dev server restarted before
  the battery of flights per lesson 46).
- **WP-4 (F-8)** — the watch ledger re-base on the js axis + the
  born-verification re-run on the quiet state (`assets stable` + 15/15).
- **WP-5 (F-9 + F-10)** — the docs ladder: PAD §11 (the F-1 catalog row +
  the F-2/F-3/F-4/F-5/F-6 rows + the watch round-33 record + the
  F-7 tenth-surface row + the F-9 lesson-48 row) + §8.1 (the
  wellness-theme row +1 + the totals 373→374), AGENTS (round 33 + the
  TEN-script battery), SKILL v1.41.0 → **v1.42.0** (the parity row
  widened to TEN surfaces + **LESSON 48**), README/CLAUDE counts, the
  worklog WH-44 entry, this plan's execution record, `docs/session_85.md`.
- **WP-6** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the FIFTEENTH cross-round byte comparison —
  the Profile captures expected to move (the catalog cure + the four
  face cures, the deliberate our-side changes: root-caused as such,
  never a silent re-base), every other mover root-caused before the
  ledger re-base, the ledger verified 0 mismatches, census MATCH after.
  Then the FULL GATE re-run on the final tree (the count ladder moves:
  unit 374/374; e2e 72/72 flat; build/smoke/lint/tsc green).
- **WP-7** — the scratch cleanup (`scratch-decode-profile.mjs`,
  `scratch-debug-ref.mjs`, `scratch-diff-profile.mjs`,
  `scratch-decode-v3.mjs` deleted; zero residue) + the local commit +
  the SSH-wrapper push (main only, the runbook procedure, the key
  shredded after).

## Lesson 48 candidate (the round's class)

A surface's SECTION VOCABULARY is itself app-specific: the reference's
Profile section titles are plain DIVs (ours H2s — our semantic superset),
its preset label a P (ours a SPAN), its preview tile a DIV (ours a P) —
every one same-computed-face, every one a decoder trap if the anchor keys
on the tag. The only shared vocabulary is the CARD CHROME (the 12px-radius
panel) — anchor there, read the titles/labels as DATA. And a prior round's
prose note ("the stock form") is shorthand, not a contract: a surface
conversion must decode the FULL computed anatomy of every element it
touches, or the un-decoded arms (the color input's radius/font/padding)
drift for nine rounds behind green checks — exactly the class the
computed-style net exists to catch.

## Suggested next (WH-45)

(a) the standing battery at full width (watch round 34 + the TEN parity
  scripts — eleven reference logins/round is OVER the 10/15min budget:
  the pacing amendment is now MANDATORY — split the battery across two
  login windows, the round-33 single-window run worked only because the
  watch's PASS-1 leg spends nothing);
(b) the cooling policy still needs two-plus consecutive stable reads —
  rounds 28-33 each moved an axis;
(c) the ELEVENTH surface candidates: the Personal Info tab interior (the
  disabled-input wash + the circle-user glyph — the WH-25 notes), the
  Preferences tab rows (the native checkboxes + the row anatomy), the
  empty states family (the reference's zero-row forms + the bare
  centered paragraphs), the goals achievements tiles (demo zero state);
(d) the standing blocks recheck + the preset-catalog watch (the catalog
  member joins the standing battery at WP-3 — the next reference
  re-author fires the surface's DATA lines same-round).

---

## Execution record (WH-44, 2026-11-02)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree (the COLOR_PRESETS
  source form, the tabs/theme-picker/preset-card records, the
  profile-page call sites, the preset-contrast derivation, the
  docs-counts CANONICAL, the ledger re-base sites). One plan deviation
  found during validation: the F-2 "cure" target (the inactive tab ink
  #737373) is the ALREADY-LEDGERED WH-17 accessible superset (PAD §11 —
  the reference's own ink fails AA at 4.35:1 on its track; ours
  supersedes at 7.17:1) — the decode independently rediscovered the
  documented deviation; F-2 resolved as NO-CURE (the parity script
  pins it as the deviation), per the WH-17/WH-20 axe-visible-defect
  doctrine.
- **WP-1 (F-1)** ✓ — the TDD catalog cure: the wellness-domain
  preset-catalog parity contract RED (the exact 16 hex values + labels
  + order), COLOR_PRESETS re-authored to the decoded monochromatic
  pairs, GREEN; the preset-contrast documented table recomputed (all 8
  values moved; all still < 4.5) + the PAD §11 preset row rewritten in
  the same commit (the pin's PAD-scan leg drove it). The e2e preset
  leg survived (Forest Green's primary held).
- **WP-2 (F-3 + F-4 + F-5 + F-6)** ✓ — the four computed-face cures,
  each RED-first in the src-census WH-44 face-cures census: the
  mode-card ink neutral-950, the preset-label block arm, the color
  inputs' stock form (both sites), the icon-less Save button (the
  census's first form was too broad — the h-4 w-4 check caught the
  Account tab's logout icon; refined to the save-bar GradientButton
  call itself, the lesson-15 census-scope class).
- **WP-3 (F-7)** ✓ — `scripts/parity-profile.mjs` written (433 members
  — the net's second-widest; the structural card-chrome anchor, the
  swatch-pair preset anchor, the after-swatch-row label anchor, the
  two normalizers, the PINNED-DEVIATION member class for the two WH-17
  ledgered supersets). **Born-verified 433/433 ×3 consecutive
  flights** — the first flight's 9 drifts were all decoder/pin-design
  fixes (the label anchor's last-child poison, the +20 superset delta
  vs the +28 estimate, the row-1 grid stretch), applied and re-flown
  before the ×3 count began.
- **WP-4 (F-8)** ✓ — the watch ledger re-based on the js axis
  (BgVoVawV) — and the re-base's own born-verification fired the
  NINETEENTH bundle (BA3Eznmu, the intra-round class, the sixth
  consecutive round; the same-run digest 15/15 MATCH on it too) —
  re-based ONCE to the round's final read, born-verified on the quiet
  state (assets stable + 15/15).
- **WP-5 (F-9 + F-10)** ✓ — PAD §11 (the watch row's round-33 record +
  the F-1 catalog row + the F-3..F-6 face-cures row + the F-7
  tenth-surface row + the F-9 lesson-48 row) + §8.1 (the
  wellness-domain row 93→94 + the infra row 166→167 + the totals
  375), AGENTS (round 33 + the TEN-script battery), SKILL v1.41.0 →
  v1.42.0 (the parity row widened to TEN surfaces + LESSON 48),
  README/CLAUDE counts, the worklog WH-44 entry, this record,
  docs/session_85.md. The count ladder moved 373 → **375** (the
  preset-catalog contract + the face-cures census; the suite count
  FLAT at 26).
- **WP-6** ✓ — the capture round + the full gate on the final tree
  (below).
- **WP-7** ✓ — the scratch probes deleted (scratch-decode-profile,
  scratch-debug-ref, scratch-diff-profile, scratch-decode-v3; zero
  residue) + the local commit + the SSH-wrapper push.

**The round's deviations from the plan**: (1) F-2 resolved as the
already-ledgered WH-17 superset (above — the plan's proposed cure would
have broken the zero-violation a11y net at 4.35:1); (2) the count ladder
moved +2 (373→375), not the plan's +1 — the preset-catalog contract
landed as its own `it()` (the WH-43 precedent) rather than an extension
of the existing labels pin; (3) the first born-flight's 9 drifts were
decoder/pin-design iterations (the label anchor, the +20 delta, the
row-1 stretch) — the plan's "the decode pre-verified every member" held
for the APP members, the pin-design members needed the flight.
