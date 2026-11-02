# WH-55 Remediation Plan — the standing audit round (session 55)

Date: 2026-11-03 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round; the
session_105/session54-plan/worklog/session_106 inputs; this round executes
the session_105 tail's suggested-next).

## Round inputs (validated live before this plan)

- Fresh clone to `ff5a0f8` (main, clean — the WH-54 ship `9e72118` + the
  operator's session_106 log push). The environment re-verified: bun 1.3.14,
  `.env` standing with a fresh 64-hex AUTH_SECRET, db:push + db:seed +
  census MATCH (users=1 templates=11 steps=50 tutorials=12 badges=8
  moods=1). The five docs + session_105 + the session54 plan (its execution
  record complete) + the worklog WH-54 entry + session_106 read and
  validated against the tree: the watch ledger at `r0DWh4vL.js`/
  `xihcXjhm.css`, the `probe-savebar-video.mjs` evidence standing, the
  instruction's checklist verified (the `.env`/db contract, `.env.example`
  tracked, the vitest/playwright configs 376/72 with the e2e db PINNED, the
  sitemap/robots/manifest handlers standing [smoke leg 12], the Tailwind v4
  pins, the eslint skills-exclude).
- One infrastructure note: the sandbox reset lost the Playwright browser
  cache — `bunx playwright install chromium` restored it before the
  baseline e2e (infrastructure, not source debt; the gate ran green after).
- **The baseline gate ALL GREEN at the exact WH-54 ship state: lint 0/0
  · tsc 0 · unit 376/376 (26 suites) · build OK · smoke 14/14 · e2e 72/72
  (the mobile-nav battery re-run explicitly — 8/8) · census MATCH ·
  `bun audit` zero.**
- The Mode C audit of the WH-54 commit (`9e72118`) + the operator's log
  push (`ff5a0f8`): CLEAN — the watch-ledger re-base diff, the probe
  evidence, the one screenshot mover and the docs ladder all match the
  documented doctrine.
- **The operator's SSH key verified CONSISTENT at intake**: the container
  coherent (cipher none, checkints MATCH, padding valid — the WH-54
  wrapper-string parse lesson applied), the seed derives the embedded pub
  exactly, comment `pete@pop-os`. One observation ledgered: the prior
  rounds' recorded fingerprint form (`205840936ded1b13`) is not
  reproducible from the natural fingerprint formulas this round — a
  fingerprint-FORMULA variance in the prior scratch scripts (never
  committed), not a key variance; the seed→pub derivation (the
  transport-corruption tripwire, the WH-52 class) is the substantive
  check and reads CONSISTENT, with the push itself the final proof.

## Findings (the round's decodes — all live, both apps)

**Watch round 44: FULLY QUIET — both axes stable.** css
`/static/index-xihcXjhm.css` (the THIRD consecutive round) + js
`/static/index-r0DWh4vL.js` (the round-43 final read, unchanged) — the
first fully-quiet read since round 43's js move. The same-run computed
digest read **15/15 MATCH**; NO ledger re-base (nothing moved — the watch
stays every-round regardless, a quiet round is a reading, never a
retirement).

**The battery (all seventeen surfaces, the seventeenth full-width run,
split across the reference login windows per the lesson-46 doctrine):
ALL GREEN — 3,555/3,555 on the quiet state** — login 38/38 (the
zero-login leg) · moodForm 20/20 · shell 61/61 (the drawer battery, the
instruction's mobile-menu emphasis) · dashboard 105/105 · headers 192/192 ·
toolbars 114/114 · kpis 315/315 · routines 697/697 · tutorials 790/790 ·
profile 433/433 · account 146/146 · authviews 192/192 · listinteriors
88/88 · moodjourney 116/116 · calendar 92/92 · schedmodal 89/89 ·
moodtiles 67/67. ONE our-side limiter trip absorbed mid-window (the
typography probe's extra flights spent the 11th our-side login — the
WH-42 F-4 class; the dev server restarted per the lesson-46 doctrine,
the flights re-run clean). The standing data-blocked re-checks rode the
battery green at their empty states (listinteriors' goals page +
moodjourney's upcoming list).

**The eighteenth-surface candidate walk (the session_105 tail's
suggested-next): ALL THREE RETIRED.**

- **(a) The reference's own signup-OTP delivery face beyond the sent
  view — DATA-BLOCKED STANDING, re-checked.** The reference's OTP
  delivery is email-only (the WH-27 probe: its register response carries
  no in-app code), so the verify view with a real code is unreachable
  without receiving the reference's email; the at-rest sent view is
  re-pinned green by parity-authviews 192/192 the same round, and OUR
  in-app OTP delivery stays the documented functional superset (the
  `WELLNESS_DISABLE_IN_APP_OTP` kill-switch family).
- **(b) The exercise history rows beyond the zero-row state —
  DATA-BLOCKED STANDING, re-checked.** 0 workouts on the reference's
  demo account (creating one would WRITE, the zero-write doctrine); the
  zero-row state re-read green by the watch's exercise spot-check the
  same round ("No workouts" both apps).
- **(c) The Profile Typography preview's non-default font state —
  RETIRED as wiring-equivalent + write-blocked on a live dual-app
  decode.** `scripts/probe-typography.mjs` committed as the round's
  evidence (the WH-53 write-blocked decode instrument class: the
  React-props read + a NEW ancestor-walk arm, ZERO fires). The at-rest
  faces read byte-identical on both apps: the fox paragraph's `text-lg
  font-sans` class family, the computed font-family resolution SHARED
  WITH THE BODY (both apps' quick-brown-fox lines compute the identical
  system stack), the trigger's "System Default" text, the "Preview of
  System Default" label (ours + the documented dark twin), one combobox
  trigger each. The live-apply channel is wiring-EQUIVALENT: BOTH apps'
  preview paragraphs ride the `font-sans` utility (the token consumer),
  so a non-default selection re-resolves the preview live on both (ours
  through the theme store's `--font-sans` write on `<html>` + the
  fire-and-forget `/api/prefs` sync; the reference's runtime-CDN Tailwind
  compiles `font-sans` through the same var chain). The Select's
  onValueChange is DOM-UNREACHABLE on BOTH apps (the Radix root renders
  no DOM element — the ancestor walk found no handler within 12 levels
  on either side, the framework-shape class). The non-default state
  itself is WRITE-blocked on the reference (the selection persists to
  the shared account — the decoded Base44 form pattern). The probe's
  artifacts documented: the reference's `--font-sans` reads EMPTY at
  :root at rest vs ours reading the stack (the lesson-40
  resolved-values-are-the-contract class — both apps' COMPUTED
  font-families are byte-identical) + the our-side limiter trip (above).

**The capture round (the TWENTY-SIXTH cross-round byte comparison):
34/34 byte-stable — ZERO MOVERS, the first fully-stable capture in the
comparison's history** (the standing sub-visible rasterization
signatures all quiet the same round); NO ledger re-base; census MATCH
after.

## Work packages

- **WP-1 — LANDED.** The watch round 44 read fully quiet (both axes
  stable, the digest 15/15) — NO ledger re-base (nothing moved).
- **WP-2 — LANDED.** The seventeenth full-width battery run, all
  seventeen surfaces green (3,555/3,555), split across the reference
  login windows; the dev server restarted after the mid-window limiter
  trip (the lesson-46 doctrine); the standing data-blocked re-checks
  rode green at their empty states.
- **WP-3 — LANDED.** The candidate walk retired all three candidates
  ((a)+(b) re-checked at their standing data-blocked surfaces, (c) on
  the live dual-app decode; the probe committed as the round's evidence:
  `scripts/probe-typography.mjs` — the typography wiring instrument,
  ONE reference flight + ONE our-side flight per run, zero-write, the
  write-blocked decode instrument class with the new ancestor-walk arm).
- **WP-4 — LANDED.** The capture round (the 26th cross-round byte
  comparison): 34/34 byte-stable, ZERO movers — the first fully-stable
  capture in the comparison's history; NO ledger re-base; census MATCH
  after.
- **WP-5 — LANDED.** The full gate on the final tree: lint 0/0 · tsc 0 ·
  unit 376/376 (the ladder FLAT — a quiet round, no test changes) ·
  build OK · smoke 14/14 · e2e 72/72 (the mobile-nav battery re-run
  explicitly — 8/8) · census MATCH · bun audit zero.
- **WP-6 — this plan's docs ladder:** AGENTS (the round-44 record), PAD
  §11 (the watch row's round-44 record + the WH-55 candidate-walk
  retirement row), the worklog WH-55 entry, this plan + its execution
  record, `docs/session_107.md`. README/CLAUDE/SKILL carry no count
  sites this round (the ladder flat); the SKILL version stays v1.50.0
  (no new lesson or surface — the round's decode reinforced the standing
  write-blocked/wiring-equivalent lessons).
- **WP-7 — the commit + the SSH-wrapper push to `main`** (no new
  branches; the operator key materialized outside the repo and shredded
  after, per the runbook; the key verified consistent at intake).

## The round's deviations from the plan

Two, both absorbed in-flight:
1. The sandbox reset lost the Playwright browser cache — the baseline
   e2e's first run failed on the missing Chromium executable
   (infrastructure, not source debt); `bunx playwright install chromium`
   restored it and the gate ran green after.
2. The typography probe's iterated flights (the ancestor-walk arm was
   added after the first flight's decode showed the trigger-level props
   carry no handler) spent the 11th our-side login and tripped OUR dev
   server's login limiter (the WH-42 F-4 class) — the dev server
   restarted per the lesson-46 doctrine, the final flight re-run clean.
