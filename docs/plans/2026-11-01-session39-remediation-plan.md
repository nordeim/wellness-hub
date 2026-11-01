# WH-39 Remediation Plan — the fifth parity surface round (session 39)

Date: 2026-11-01 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set).

## Round inputs (validated live before this plan)

- Baseline pulled to `c2c4bd8` (WH-38 shipped + pushed; the operator's
  `session_74` log push came in on the pull). The baseline gate re-run
  live: **lint 0/0 · tsc 0 · unit 369/369 (26 suites) · build OK · smoke
  14/14 · e2e 72/72 · census MATCH (moods=1) · `bun audit` zero** — the
  documented WH-38 ship state, reproduced.
- **Watch round 28: the DOUBLE move AGAIN** — PASS 1 fired MOVED on BOTH
  axes: the CSS content hash `index--nhcow2j.css` → `index-CMHVFeas.css`
  (the second stylesheet CONTENT change in two rounds — the rarest
  signal, twice) + the js bundle `index-CaQQhuPL.js` → `index-NVr-T2eL.js`
  (the EIGHTH distinct bundle). The same-run PASS-2 digest read
  **15/15 MATCH on the new assets**.
- **The widened battery's FIRST full run — all five legs, all quiet on
  the NEW build**: parity-login **34/34** (fourth consecutive),
  parity-moodform **20/20** (fifth), parity-shell **61/61** (third),
  parity-dashboard **105/105** (third) — 220 computed members
  live-vs-live, zero manual evals. The rendered face held byte-for-byte
  through the round-28 CSS content move.
- The standing blocks: the mobile drawer battery green (the watch's
  PASS-2 surface + the e2e mobile-navigation/a11y specs inside the
  72/72), the Tailwind v4 pins standing in `globals.css`, `.env`/db
  contract verified (census reads `<repo>/db/custom.db`), `.env.example`
  tracked, vitest/playwright configs verified (369 unit / 72 e2e), the
  sitemap/robots route handlers verified (byte-format pins, the
  canonical-route list).

## Findings

- **F-1 [LOW, procedure]** — the watch ledger needs the round-28 re-base
  (both axes: `cssPath` → `/static/index-CMHVFeas.css`, `jsPath` →
  `/static/index-NVr-T2eL.js`), born-verified on BOTH outcomes per the
  WH-34 doctrine (the firing state exercised by round 28's first run;
  the quiet state by the post-edit re-run). The double move is the
  round-20/27 class (a CSS CONTENT change) — which makes the round's
  core (F-2) the correct response: widen the same-round verification
  battery (the WH-38 precedent's own arc).
- **F-2 [MEDIUM, the round's core]** — **the parity net's FIFTH SURFACE:
  `scripts/parity-headers.mjs`** — the module page headers family (the
  PAGE_THEMES identity family, the WH-38 plan's (c) candidate, the
  data-independent one). The two-clocks gap it closes: the watch's
  per-surface digests pin the reference's H1 TEXT/fs per page against
  its ledger, but the headers' computed CHROME (the H1 gradient stops,
  the subtitle geometry, the page-root WASH, the container width, the
  activator button pair) has never been diffed same-round live-vs-live
  as a FAMILY — and parity-dashboard owns only the dashboard's single
  header. DECODED LIVE FIRST (the doctrine): **all 10 non-dashboard
  pages probed on both apps — every scalar member either byte-identical
  (h1Text/h1Fs/h1Fw/h1Mb, subText/subFs/subColor, rootMinH, contMaxW,
  contW — plus the activator's text/color/h/r/fw/fs on all 7 action
  pages) or a member of exactly three known classes**:
  1. the lesson-40 stop-triple class (h1Bg + btnBg: opaque stops,
     same rgb triples, `in oklab`-syntax wrapper vs the CDN's bare
     form) — the `stopsOf` precedent comparison;
  2. **the oklab ALPHA-stop serialization class — NEW**: the page-root
     washes' third stop (`to-X-50/30`) computes as `oklab(L a b / 0.3)`
     on our v4 build vs the reference's `rgba(r, g, b, 0.3)`; the
     6-decimal oklab re-converts to sRGB with a sub-byte channel
     drift (the indigo-50 case: ±3/255 in green before alpha), which
     shifts the canvas gradient DITHER phase — quantified on all 10
     washes composited over white at 64×64: **maxDelta 1/255, 0.21%–
     1.44% of bytes** (the sub-visible class — the pixel-quantify
     precedent's own maxdelta-1 threshold; the same-string control
     reads BYTE-EQUAL, so the machinery is deterministic). The member:
     wash stop-1/2 exact triples + the composited wash under the
     documented maxdelta-1/≤2% tolerance + the stop count;
  3. **the margin-collapse equivalence class — NEW**: our subtitle
     carries `mt-1` (computed 4px) where the reference's carries none
     (0px), but the h1's `mb-2` (8px, byte-identical both sides)
     collapses over it — the RENDERED gap is 8px on both apps. The
     member: the bounding-box gap (sub.top − h1.bottom), never the
     serialized margin — the lesson-40 doctrine's geometry form.
  Plus one PROBE ARTIFACT cured in the design: the decode's generic
  button walk over-climbed on the stacked pages (caught the reference's
  "All Categories" filter trigger on Learning and the "Appearance" tab
  trigger on Profile — the reference's stacked header nests one level
  shallower than ours) — the committed script reads the activator ONLY
  on the 7 action pages (the `PAGE_THEMES.stacked` fact, itself pinned
  by the page-theme census), anchored as the container's first visible
  button in DOM order (the header renders before the toolbars).
  **NO real drift anywhere in the family** — the surface can be born
  quiet (the decode's prediction).
- **F-3 [LOW, positive]** — the standing blocks hold (the battery above,
  the drawer battery, the v4 pins, census, audit); the neo-crm sibling
  recheck rides WP-3 (network).

## Work packages

- **WP-0** — this plan, validated against the tree: the decode's anchors
  vs our source (`PAGE_THEMES`/`PAGE_HEADER` in `src/lib/page-layout.ts`,
  the PageHeader component's stacked/row forms in
  `src/components/shared/page-parts.tsx`, the 7 action pages' activator
  buttons, the 3 stacked pages' bare blocks), the ledger's current form
  (the re-base sites), the docs-counts CANONICAL (NO flips this round —
  the §8.1 infra row counts `tests/*.test.ts` only, unit stays 369/26
  suites, e2e stays 72 — the WH-36/38 flat-ladder precedent).
- **WP-1 (F-2)** — write `scripts/parity-headers.mjs`: PASS A the
  reference (ONE login → the 10 pages at 1280×900 → the member read),
  PASS B our dev server (ONE login → the same read), the
  member-by-member live-vs-live diff, exit 1 on any DRIFT/PROBE-ERROR.
  ~167 members: per page (10) — h1Text/Fs/Fw/Bg(stops)/Mb, subText/Fs/
  Color/Gap(rendered), washStops12(exact) + washPixels(maxdelta-1
  tolerance) + washStopCount, rootMinH, contMaxW, contW (12 + the wash
  composite); per action page (7) — btnText/Bg(stops)/Color/H/R/Fw (6).
  ZERO-WRITE on both apps (login + read only). **Born-verify: the first
  flight must read all-MATCH, exit 0** (the decode pre-verified every
  member; the flight proves nothing moved between the decode and the
  flight). Probe-bug loop if any member mis-anchors: fix the member,
  not the app.
- **WP-2 (F-1)** — the watch ledger re-base (both axes) + the
  born-verification re-run (the quiet state: `assets stable` + 15/15).
- **WP-3 (F-3)** — the neo-crm sibling recheck (the live repo's SKILL
  version vs the vendored record).
- **WP-4** — the docs ladder: PAD §11 (the watch row's round-28 record +
  the F-2 fifth-surface row; §8.1 unchanged), AGENTS (the watch note:
  round 28 + the FIVE-script standing battery + the fifth surface
  named), SKILL v1.36.0 → **v1.37.0** (the quick-reference parity row
  widened to five surfaces + **LESSON 43** + the version + the counts
  verified), README/CLAUDE counts verified unchanged (the lockstep
  pin), the worklog WH-39 entry, this plan's execution record,
  `docs/session_75.md`.
- **WP-5** — the capture round: `bun run db:seed && node
  scripts/capture-round.mjs`, the TENTH cross-round byte comparison,
  every mover root-caused before the ledger re-base, the ledger
  verified 0 mismatches, census MATCH after.
- **WP-6** — the full gate re-verification on the final tree (the counts
  flat: 369/369 · 72/72 · census MATCH · audit zero — procedure-side
  changes only, but the gate re-runs green regardless).
- **WP-7** — the scratch cleanup (`scratch-decode-headers.mjs`,
  `scratch-oklab-check.mjs`, `scratch-wash-pixels.mjs` deleted; zero
  residue) + the local commit + the SSH-wrapper push (main only, the
  runbook procedure, the key shredded after).

## Lesson 43 candidate (the round's class)

The fifth surface's decode found two NEW equivalence classes the net
had never met, both curable by the same doctrine (compare the rendered
fact, not the serialization): (a) the v4 oklab ALPHA-stop — the
compiler emits `oklab(L a b / a)` for `to-X-50/30`, whose 6-decimal
re-conversion to sRGB drifts sub-byte from the palette triple, and the
difference is INVISIBLE at 8-bit composite (quantified: maxdelta 1/255
on ≤1.44% of bytes, the dither phase shift; the same-string control
deterministic) — the member is the composited pixels under the
documented maxdelta-1 tolerance, never a naive string diff; and (b)
the margin-collapse pair — our `mt-1` subtitle under the reference's
bare one renders the SAME 8px gap under the h1's `mb-2`; the member is
the bounding-box gap, never the computed margin-top. Both are the
lesson-40 family's newest members: the oklab stop is its COLOR form
(alpha), the collapse is its GEOMETRY form (margin). The lesson also
records the round-28 arc: the CSS content hash moved TWICE in two
rounds — the active-development cadence is now the standing state, and
the widened battery (five scripts, 220+167 members) is what keeps each
rarest-signal round a one-command verification.

## Suggested next (WH-40)

(a) the standing battery at full width (watch round 29 + the FIVE
  parity scripts — six reference logins/round total; watch the login
  rate-limit budget: 10/15min — the six legs fit, a seventh does not);
(b) the cooling policy still needs two-plus consecutive stable reads —
  rounds 27 + 28 both broke any streak;
(c) the SIXTH surface candidates: the Profile page's appearance panels
  (the tablist + the preset cards — partly data-dependent, the
  lesson-41 class) or the module toolbars (the `TOOLBAR` record family,
  data-independent, 10 pages) or the empty states (the `EMPTY_STATE`
  family — data-dependent on the demo accounts' shared zero state);
(d) the standing blocks recheck.

---

## Execution record (WH-39, 2026-11-01)

Executed as written, all work packages landed:

- **WP-0** ✓ — the plan validated against the tree (the decode anchors
  vs `PAGE_THEMES`/`PAGE_HEADER` + the PageHeader component's
  stacked/row forms + the 7 activator buttons; the ledger's re-base
  sites; the docs-counts CANONICAL — NO flips, the count ladder FLAT).
- **WP-1 (F-2)** ✓ — `scripts/parity-headers.mjs` written (192 members:
  10 pages × 15 header/wash/container members + 7 action pages × 6
  activator members — the plan's "~167" estimate corrected to the
  actual 192 when the wash's three-form comparison + the probe guards
  finalized; the stopsOf precedent for the opaque gradients; the
  composited-wash maxdelta-1/≤2% tolerance member for the oklab alpha
  stops; the bounding-box gap for the subtitle; the action-page-only
  button guard). Zero probe bugs at birth — the decode pre-verified
  every anchor. **Born-verified 192/192 MATCH on the first flight +
  stable on the second consecutive flight.**
- **WP-2 (F-1)** ✓ — the ledger re-based on BOTH axes; born-verified on
  the quiet state (`assets stable` + 15/15; the firing state was
  exercised by round 28's first run).
- **WP-3 (F-3)** ✓ — the neo-crm sibling at **v1.204.0** (MOVED from
  the v1.202.0 record — the sibling's own cadence, informational).
- **WP-4** ✓ — PAD §11 (the watch row's round-28 record + the F-2
  fifth-surface row), AGENTS (round 28 + the FIVE-script battery),
  SKILL v1.36.0 → v1.37.0 (the parity row widened to five surfaces +
  LESSON 43 + the version), README/CLAUDE verified unchanged (lockstep
  GREEN 10/10), worklog, this record, docs/session_75.md.
- **WP-5** ✓ — the TENTH cross-round byte comparison: **33/34
  byte-stable (the cleanest yet), ONE mover root-caused as the standing
  precedent** (29-quick-actions-hover: 5px/0.0004%/maxdelta 1, bbox
  x[503-508] y[326-331] — the IDENTICAL signature to the WH-38 record).
  All 34 health-checked (29 desktop 1280×900 + 5 mobile 390×844); the
  ledger re-based, verified 0 mismatches.
- **WP-6** ✓ — the full gate GREEN on the final tree (below).
- **WP-7** ✓ — the scratch probes deleted (scratch-decode-headers.mjs +
  scratch-oklab-check.mjs + scratch-wash-pixels.mjs; zero residue); the
  commit + the SSH-wrapper push.

**The full gate GREEN**: lint 0/0 · tsc 0 · unit **369/369 (26
suites)** · build OK · smoke **14/14** · e2e **72/72** · census MATCH
(moods=1) · `bun audit` zero — the count ladder FLAT (the procedure-side
precedent), the lockstep pin GREEN.

**The round's one deviation from the plan**: none — the plan held as
written (the member count corrected 167→192 at WP-1, the plan's own
"~" estimate).
