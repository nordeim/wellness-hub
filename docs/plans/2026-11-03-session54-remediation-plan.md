# WH-54 Remediation Plan — the standing audit round (session 54)

Date: 2026-11-03 · Branch: `main` only · Operator instruction: the standing
engagement (visual + functional parity with
`https://evolve-well-d6cec85d.base44.app/`, the audit→plan→TDD→gate→capture→
docs→commit→push cadence, the repo skills as the method set — the
web-application/tdd/agent-browser/clone-app-pat-pro set this round; the
session_103/session53-plan/worklog/session_104 inputs; this round executes
the session_103 tail's suggested-next).

## Round inputs (validated live before this plan)

- git pull to `64fe9c7` (main, clean — the WH-53 ship `27ad5e5` + the
  operator's session_104 log push). The environment re-verified: bun 1.3.14,
  `.env` standing with a fresh 64-hex AUTH_SECRET, db:push + db:seed +
  census MATCH (users=1 templates=11 steps=50 tutorials=12 badges=8
  moods=1). The five docs + session_103 + the session53 plan (its execution
  record complete) + the worklog WH-53 entry + session_104 read and
  validated against the tree: the watch ledger at `GX9h1ywM.js`/
  `xihcXjhm.css`, the `probe-customcolor.mjs` evidence standing, the
  instruction's checklist verified (the `.env`/db contract, `.env.example`
  tracked, the vitest/playwright configs 376/72 with the e2e db PINNED, the
  sitemap/robots/manifest handlers standing [smoke leg 12], the Tailwind v4
  pins, the eslint skills-exclude).
- **The baseline gate ALL GREEN at the exact WH-53 ship state: lint 0/0
  · tsc 0 · unit 376/376 (26 suites) · build OK · smoke 14/14 · e2e 72/72
  (the mobile-nav battery re-run explicitly — 8/8) · census MATCH ·
  `bun audit` zero.**
- The Mode C audit of the WH-53 commit (`27ad5e5`) + the operator's log
  push (`64fe9c7`): CLEAN — the watch-ledger re-base diff, the probe
  evidence, the three screenshot movers and the docs ladder all match the
  documented doctrine.
- **The operator's SSH key verified CONSISTENT at intake** (the WH-53 fix
  holds at the source): the container coherent (cipher none, checkints
  MATCH, padding valid), the seed derives the embedded pub exactly, pub
  sha256[:16] `205840936ded1b13`, comment `pete@pop-os`. (The round's own
  parse lesson: the OpenSSH private section is wrapped in ONE more
  length-prefixed string after the public-keys list — reading the
  checkints directly at the post-list offset reads the outer length field
  as a false checkint mismatch; caught and fixed before any conclusion was
  drawn. The verify-the-verifier doctrine applied BEFORE trusting a
  failure, this time catching the checker's own bug before it produced a
  false verdict.)

## Findings (the round's decodes — all live, both apps)

**Watch round 43: a js-axis move.** `/static/index-GX9h1ywM.js` →
`/static/index-r0DWh4vL.js` (the TWENTY-EIGHTH distinct bundle; the css
axis STABLE at `xihcXjhm`, the second consecutive round). The same-run
computed digest read **15/15 MATCH** on the new bundle — per the lesson-30
doctrine the full battery walked the move.

**The battery (all seventeen surfaces, the sixteenth full-width run, split
across the reference login windows per the lesson-46 doctrine; the dev
server restarted between windows): ALL GREEN — 3,555/3,555, ZERO drift
through the js move** — login 38/38 (the zero-login leg) · moodForm 20/20 ·
shell 61/61 (the drawer battery, the instruction's mobile-menu emphasis) ·
dashboard 105/105 · headers 192/192 · toolbars 114/114 · kpis 315/315 ·
routines 697/697 · tutorials 790/790 · profile 433/433 · account 146/146 ·
authviews 192/192 · listinteriors 88/88 · moodjourney 116/116 · calendar
92/92 · schedmodal 89/89 · moodtiles 67/67. The standing data-blocked
re-checks rode the battery green at their empty states (listinteriors'
goals page + moodjourney's upcoming list — the emptyP 88px family both
apps).

**The eighteenth-surface candidate walk (the session_103 tail's
suggested-next, decode-first): ALL THREE RETIRED.**

- **(a) The reference's own DARK-mode family — the documented INERT-PARITY
  keep.** The reference renders the Theme Mode card grid with no functional
  dark rendering (parity-profile 433/433 pins the grid's geometry
  byte-identical); our Light/Dark/Auto engine stays the functional
  superset, its dark-state walks green in the e2e battery the same round.
- **(b) The Profile save-bar's dirty-state face — RETIRED as
  wiring-equivalent + write-blocked.** The reference's Save All Changes
  button is STATELESS at rest: domDisabled false, aria-disabled null,
  cursor pointer, zero data-dirty markers in the page, no gating source in
  the onClick props — the exact family of ours (the always-enabled bar +
  the 300ms saving state). The dirty state itself is WRITE-blocked on the
  reference (making it dirty = changing a control = a persist to the shared
  account), so the at-rest wiring facts are the decodable surface;
  parity-profile's 433 members pin the at-rest faces byte-identical.
- **(c) The routines template card's video family beyond the reveal face —
  RETIRED as wiring-equivalent.** The reference's Watch Video button opens
  a NEW TAB at the same placeholder youtube URL family (`window.open`, no
  in-page modal, the page URL unchanged) — the exact family of ours
  (`window.open(t.videoUrl, "_blank", "noopener,noreferrer")`). The
  probe's one artifact documented: the popup's interception through the
  sandbox's `google.com/sorry` network layer shows the `continue=` target
  (`youtube.com/watch?v=example-study` — the placeholder family both seeds
  carry) — a network artifact, not a face difference; the at-rest reveal
  faces are pinned byte-identical by parity-routines 697/697.

## Work packages

- **WP-1 — LANDED.** The watch ledger re-based ONCE to the round's final
  read (js `r0DWh4vL`; the css axis unchanged at `xihcXjhm`), with the
  round-43 record; born-verified on BOTH outcomes (the firing state read
  live at the round's first watch flight; the quiet state "assets stable"
  + the 15/15 digest after the edit — and no intra-round move: the final
  read is the same bundle).
- **WP-2 — LANDED.** The sixteenth full-width battery run, all seventeen
  surfaces green (3,555/3,555), split across the reference login windows;
  the dev server restarted between windows (the lesson-46 doctrine); no
  limiter trips on either side (the reference logins kept under the
  10/15min edge; the our-side logins likewise).
- **WP-3 — LANDED.** The candidate walk retired all three candidates on
  live decodes (the probe committed as the round's evidence:
  `scripts/probe-savebar-video.mjs` — the save-bar props + the video
  click-face instrument; ONE reference flight + ONE our-side flight,
  zero-write, the write-blocked decode instrument class).
- **WP-4 — LANDED.** The capture round (the 25th cross-round byte
  comparison): 33/34 byte-stable, ONE mover root-caused before the
  re-base — 29-quick-actions-hover (5 px / 0.00043%, maxdelta 1, the
  identical parameters to its WH-53 record) = the standing sub-visible
  rasterization signature (the hover captures are its standing habitat);
  the ledger re-based, verified 34/34; census MATCH after (the capture
  write + re-seed leaves the seed contract holding).
- **WP-5 — LANDED.** The full gate on the final tree: lint 0/0 · tsc 0 ·
  unit 376/376 (the ladder FLAT — a quiet round, no test changes) · build
  OK · smoke 14/14 · e2e 72/72 (the mobile-nav battery re-run explicitly —
  8/8) · census MATCH · bun audit zero.
- **WP-6 — this plan's docs ladder:** AGENTS (the round-43 record), PAD
  §11 (the watch row's round-43 record + the WH-54 candidate-walk
  retirement row), the worklog WH-54 entry, this plan + its execution
  record, `docs/session_105.md`. README/CLAUDE/SKILL carry no count sites
  this round (the ladder flat); the SKILL version stays v1.50.0 (no new
  lesson or surface — the round's decodes reinforced the standing
  write-blocked/wiring-equivalent lessons).
- **WP-7 — the commit + the SSH-wrapper push to `main`** (no new
  branches; the operator key materialized outside the repo and shredded
  after, per the runbook; the key verified consistent at intake).

## The round's deviations from the plan

One, absorbed in-flight: the candidate probe's first flight missed the
reference's video card (a `main img[loading=lazy]` anchor — OUR
implementation attribute, not the reference's); the probe re-anchored to
the parity-routines discovery (`main button` filtered by the `/Watch
Video/i` text test, the pin-verified anchor) and the second flight decoded
clean. The extra flight's reference login stayed inside the window budget
(nine reference logins this window — under the 10/15min edge).
