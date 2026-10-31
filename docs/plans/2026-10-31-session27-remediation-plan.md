# Session-27 Remediation Plan — the sr-form chip/rating decode round (WH-27)

**Task ID:** WH-27 · **Date:** 2026-10-31 · **Branch:** `main` (only)
**Mission:** the session26 plan's own suggested next, executed as three
legs: (a) **the login family's computed-interior e2e leg** (the round's
declared target — the five views' geometry was probe-verified at WH-26 but
NOTHING pins our computed values; the next redeployment's drift would be
caught only by the next manual probe); (b) **the sr tags chip `#`-prefix
question** — which opened onto the round's core finding: **the sr form's
chip is NOT the mood form's emerald family** (the reference's sr chip is
the stock Badge DEFAULT variant, a DIV, in a BARE row — our WH-26
conversion generalized the mood decode to the sr site); and (d) **the
rating-click re-verification** — which resolved the WH-26 "inert" claim as
FALSE (the reference's fill exists and renders the **⭐ emoji U+2B50**,
never the ★ text glyph — a codepoint the WH-26 probe's ☆/★ regex could
never match). Plus (c) the mood list interior — **BLOCKED, now
definitively**: the reference's OTP is EMAIL-ONLY (the register response
carries no code; the unverified account cannot log in) — the data-unblock
path is closed at the platform level.

> **Reference probe (11 passes; writes = ONE throwaway probe signup account
> `probe-wh27-<ts>@example.com`, isolated, unverified, on no pinned
> surface — the WH-26 documented-write class; every other surface read at
> rest or client-state-only):** the watches ALL CLEAN — the compiled-CSS
> watch **ROUND 15 UNCHANGED** (`/static/index-s8d1FO8M.css` — NO
> redeployment, every WH-26 parity map still governing), the seed watch
> ROUND 16 at **23/23 byte-for-byte** (11 template + 12 tutorial names,
> innerText-searched), the drawer battery (the 288px sheet, body lock, 12
> items, escape-unlock — opened via a JS click, the reference's own
> hamburger still toast-viewport-blocked), the preset hygiene clean (the
> brand surfaces at the default indigo→purple `135deg, rgb(99,102,241),
> rgb(168,85,247)`). The register flow now fires `/auth/register` → 200
> `{"message":"Registration successful. Please check your email for the
> verification code.","otp_expires_in_minutes":10}` — **NO in-app code**;
> the follow-up login reads "Please verify your email before logging in" —
> the branch closed. The sr form decode: the tags chip renders (a DIV —
> the WH-26 probe searched only spans) as the **stock Badge DEFAULT
> variant** `inline-flex items-center rounded-md border px-2.5 py-0.5
> text-xs font-semibold transition-colors focus:outline-none focus:ring-2
> focus:ring-ring focus:ring-offset-2 text-foreground gap-2` (22px,
> transparent bg, border rgb(229,229,229), ink rgb(10,10,10)) + the bare
> `<button type="button">×</button>` + the chips row **`flex flex-wrap
> gap-2` BARE** (the mood site keeps `mt-3`); the rating click renders
> **`⭐⭐⭐☆☆`** (the 3-star click: ⭐ U+2B50 for selected, ☆ for the
> rest); the "📝 Notes" combobox is the **Resource Type select** (8 emoji
> options, byte-parity with our RESOURCE_TYPES vocabulary) SET to "notes"
> at rest (foreground ink — the muted placeholder arm never applies); the
> field order + all 10 labels byte-parity; the mood chip re-confirmed via
> the WH-26 chipHtml (a SPAN + the emerald classes + the bare × button).

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the
pulled tree at `aec0ed9` = WH-26 shipped at `3dd575c` + the operator's
session-log push adding `docs/session_50.md`):** lint 0/0 · tsc 0 · unit
**350/350 (24 suites)** · `bun run build` OK · smoke **14/14** · e2e
**64/64** · census MATCH — the exact documented WH-26 ship state.

**The audit method:** the standing watches + the declared targets probed
live on the reference (11 passes), the same surfaces read on our dev
server, and the WH-26 diff re-reviewed through `skills/web-application`
(the e2e-pin-per-surface contract), `skills/tdd` (expected values from
the independent probe, never our own code) and the `code-review`
dimensions. Findings (by severity) — the WH-27 ledger:

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **HIGH (the core)** | **The sr form's tags chip family.** Our WH-26 conversion applied the MOOD form's emerald `TAG_CHIP` to BOTH sites. The reference's sr chip (probed live, client-state, twice — the chips render as a DIV the WH-26 span-search could never see): the **stock Badge DEFAULT variant** `inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground gap-2` (computed: 22px tall, transparent bg, border 1px rgb(229,229,229), ink rgb(10,10,10), 12px/600) + the bare × button + the chips row **`flex flex-wrap gap-2` BARE** (the mood site's row is `flex flex-wrap gap-2 mt-3` — the two sites differ in chip family AND row). The WH-26 plan's "the chip family decodes from the mood form" generalization was wrong for the sr site | `studyresources-page.tsx` + `SR_CHIP` (the new record) | the `SR_CHIP` record (the Badge-default classes in our computed-equal tokens: border-line=its border-input, text-ink=its text-foreground + our dark twins) + the sr page conversion (span→div, TAG_CHIP retires from the sr site; the mood site KEEPS the emerald family) |
| F-2 | **MEDIUM** | **The rating fill glyph.** The reference's click state is INTERACTIVE (the WH-26 "the reference's own click state is inert" narration is FALSE): clicking the 3rd star renders **`⭐⭐⭐☆☆`** — the selected stars flip to the **⭐ EMOJI (U+2B50)**, the unselected stay ☆ (U+2606). Our picker renders **★ (U+2605)** for selected. The WH-26 probe's (and this round's first three passes') `☆/★` regex could never match the emoji codepoint — the full-HTML dump resolved it | `studyresources-page.tsx` (the picker's fill) + the WH-26 comment | the fill glyph flips to `⭐`; the radiogroup semantics + the click-toggle stay the functional superset; the page comment + the RATING_PICKER record comment correct |
| F-3 | **MEDIUM (the declared target a)** | **The login family's computed-interior has NO standing pin.** The five views' geometry (the h1 30px/700/w368, the h2 24px/700/368×32, the back button 14px/500/gap8/h20, the 3 signup inputs at h44, the sent iconCircle 64×64 + the callout w368, the 6 code inputs at 40×44 in the gap-6px wrap, the resend 14px/500/rgb(51,65,85)) was probe-verified at WH-26 and re-verified on our dev server THIS round (every value computes equal) — but no e2e leg pins it. A redeployment's drift on the login family is currently caught only by the next manual probe | `tests/e2e/a11y.spec.ts` | the new **(l) leg** — a logged-out describe walking the five views (signin → signup → reset → sent → verify) reading the computed geometry at the reference's probed values |
| F-4 | **LOW (the standing block)** | **The reference's OTP is EMAIL-ONLY.** The register response carries no code (`"Please check your email"`, `otp_expires_in_minutes: 10`); the unverified account cannot log in ("Please verify your email before logging in"). The (b) sr LIST-side chip format + (c) the mood list "Your Journey" interior stay **DATA-BLOCKED** — the data-unblock path is closed at the platform level (no throwaway account can carry data). Our in-app OTP demo mode (the `WELLNESS_DISABLE_IN_APP_OTP` kill-switch family) stays the documented self-hosting superset | the docs ladder (WP-3) | the PAD §11 standing-block row (documented, not cured — re-try only on a future redeployment that ships in-app delivery) |
| F-5 | ~~LOW~~ **RETIRED** | ~~The sr Resource Type select's unset face~~ — the reference's trigger span reads "📝 Notes" at **rgb(10,10,10) foreground** with `hasDataPlaceholder: false`: the select is SET to "notes" at rest, byte-parity with our `EMPTY.type = "notes"`. A false lead from reading the class string (the `data-[placeholder]:text-muted-foreground` arm exists in the class but never applies — the lesson-30 class again: read the RENDERED leaf, not the arm) | — | none (the retirement recorded here) |

**The positive findings (the round's clean classes — verified, not
assumed):** the watches ALL CLEAN (the CSS hash round 15 unchanged, the
seed 23/23, the drawer battery, the preset hygiene); the sr form's field
ORDER + all 10 labels byte-parity (the WH-26 F-4/F-9 conversions hold);
the Resource Type vocabulary byte-parity (the 8 emoji options: values +
labels + icons) + the resting trigger face parity (set to "notes",
foreground ink — F-5's retirement); the mood form's chip re-confirmed
(the emerald SPAN + the bare × button — the WH-26 chipHtml is
authoritative; this round's first span-read hit an ancestor-span artifact,
cured by the direct-text filter); the sr tags INPUT row `flex gap-2 mb-2`
✓ re-verified; the Personal Notes textarea (the stock `min-h-[60px]`
form + the placeholder parity); our login family computing at every one
of the reference's probed values (the (l) leg's expected-value table,
verified live this round); the register/login/reset network behavior
re-verified (the WH-26 changed-fact narrations hold).

---

## 2. The count ladder (the lockstep plan)

| Total | From | To | Delta |
|---|---|---|---|
| Unit suites | 24 | **24** | — |
| Unit checks | 350 | **352** | +1 the sr chip-family census (the SR_CHIP record + the sr consumption + the TAG_CHIP retirement on the sr site + the div form + the bare row + the × superset + the mood site's retention) · +1 the rating-glyph census (the ⭐ fill + the ★ retirement + the radiogroup retention) |
| E2E checks | 64 | **65** | +1 the (l) login-family computed-interior leg (the five views: the h1/h2/back geometry, the 3×44px signup inputs, the 64×64 sent icon + the callout width, the 6×40×44 code inputs in the gap-6px wrap, the resend ink) |
| §8.1 infra row | 12 files / 151 | **12 / 153** | +2 in src-census |
| §8.1 a11y row | 20 | **21** | +1 the (l) leg |
| Captures | 32 | **33** | +33-sr-form-interior (the round's surface: the form open with two tags chipped + the 3-star rating clicked). Expected MOVERS: NONE among the existing 32 (the cures live inside the sr form, which no existing capture shows open — the page-level 08-studyresources renders the form closed); the 19 raster-noise class documented (the WH-26 acceptable-mover precedent) |

CANONICAL flips in `tests/docs-counts.test.ts` (unitChecks 350→352,
e2eChecks 64→65) land with every doc site in the SAME commit.

---

## 3. Work packages

### WP-1 — RED (the pins before the cures)
1. **The sr chip-family census** (`tests/src-census.test.ts`, appended):
   the `SR_CHIP` record exists with the Badge-default classes in our
   computed-equal tokens (`border-line`, `text-ink`, the focus ring
   family, `gap-2`); the sr page consumes `SR_CHIP.chip` +
   `SR_CHIP.row`; the sr page does NOT consume `TAG_CHIP` (the
   retirement); the chip renders as a `<div>` (the reference's own form);
   the chips row is BARE (no `mt-3`); the × stays bare with the
   aria-label superset; the MOOD page keeps `TAG_CHIP` (the emerald
   family + the mt-3 row — the two-site split). Expected RED: the missing
   record + the wrong family + the wrong tag + the wrong row.
2. **The rating-glyph census** (appended): the sr form's rating buttons
   render `⭐` (U+2B50) for the selected stars and `☆` for the rest; the
   `★` (U+2605) form retires; the radiogroup semantics stay
   (`role="radiogroup"` + the radio roles + aria-checked). Expected RED:
   the ⭐ missing / the ★ present.
3. **The (l) e2e leg** (`tests/e2e/a11y.spec.ts`, a new logged-out
   describe): walk the five views (signin at /login → the signup switcher
   → back → the Forgot-password link → the reset submit → back → the
   signup submit → verify) and read the computed geometry: the h1
   30px/700/rgb(15,23,42)/w368; the h2 24px/700/368×32 on every view; the
   back button 14px/500/rgb(100,116,139)/gap8/h20; the 3 signup inputs at
   h44; the sent iconCircle 64×64 + the callout w368; the 6 code inputs at
   40×44 in the flex gap-6px wrap; the resend 14px/500/rgb(51,65,85).
   Expected RED: none of the reads fail (our values already compute equal
   — the leg is the STANDING PIN, born green; the RED proof rides the
   unit side).
4. **The CANONICAL flips** (unitChecks 350→352, e2eChecks 64→65). Full
   unit RED run at exactly the expected causes (the 2 censuses + the five
   docs-counts sites + the §8.1 arithmetic).

### WP-2 — GREEN (the cures)
1. `src/lib/page-layout.ts`: the `SR_CHIP` record —
   `chip: "inline-flex items-center rounded-md border border-line px-2.5
   py-0.5 text-xs font-semibold transition-colors focus:outline-none
   focus:ring-2 focus:ring-ring focus:ring-offset-2 text-ink gap-2
   dark:border-neutral-700 dark:text-neutral-100"` (the reference's
   Badge-default in our computed-equal tokens + our dark twins — the
   documented superset over its light-only form) + `row: "flex
   flex-wrap gap-2"` — with the probe provenance in its comment block
   (the two-site split: the mood emerald ≠ the sr Badge).
2. `studyresources-page.tsx`: the chips `<div key={tag}
   className={SR_CHIP.chip}>` (the span retires) + the row
   `className={SR_CHIP.row}`; the `TAG_CHIP` import retires; the WH-26
   tags comment corrects (the emerald narration → the Badge family).
3. The rating fill: `{n <= form.rating ? "⭐" : "☆"}` + the comment
   correction (the "inert" narration → the interactive ⭐ fill, the
   codepoint note) + the RATING_PICKER record's comment corrects.
4. Live verification on the dev server at the reference's computed values
   (the chip 22px/transparent/rgb(229,229,229) border/rgb(10,10,10) ink +
   the bare × + the row gap 8 bare; the rating ⭐⭐⭐☆☆ after the 3-star
   click) + the probe hygiene (zero writes — the form cancels).

### WP-3 — the docs ladder
PAD §11 (the sr-chip retirement row + the OTP standing-block row + the
WH-26 narration corrections inside the form-interior row), PAD §8.1
(infra 153, a11y 21), AGENTS (the form-interior passage's sr-chip +
rating corrections), SKILL v1.24.0 → **v1.25.0** (§8's WH-27 passage +
**lesson 31**), README + CLAUDE.md (the counts), worklog WH-27 (top),
the plan's execution record, `docs/session_51.md`.

### WP-4 — the full gate
lint 0/0 · tsc 0 · unit **352/352 (24 suites)** · build OK · smoke
14/14 · e2e **65/65** · db census MATCH.

### WP-5 — captures
The doctrine LIVE (badgesEarned === 0 asserted before the light set). The
32-file set re-taken (expected movers: none among the page-level
captures; the 19 raster-noise class the documented exception) + **1
NEW**: 33-sr-form-interior (the form open — two tags chipped, the 3-star
rating clicked: the Badge chips + the ⭐ fill in one capture). The md5
ledger re-based at 33 files.

### WP-6 — the records
The worklog entry, the plan's execution record, session_51.md.

### WP-7 — commit + push
`git add` → commit → the SSH-wrapper push (`--key-file <key outside repo>`
+ `--remote git@github.com:nordeim/wellness-hub.git`, main only) → remote
verification → key shred.

---

## 4. Execution record (filled at ship time)

- **WP-1 RED** — the sr chip-family census + the rating-glyph census written
  and verified RED at the expected causes (the missing SR_CHIP record + the
  ★ fill); the (l) e2e leg written (one TS signature cured: Array.find
  returns undefined — `?? null`); the CANONICAL flips 350→352/64→65; the
  full unit RED run at exactly the 8 expected causes (the 2 censuses + the
  five docs-counts sites + the §8.1 arithmetic).
- **WP-2 GREEN** — the SR_CHIP record (the Badge-default classes in our
  computed-equal tokens + our dark twins) + the sr page conversion
  (span→div, TAG_CHIP retired from the sr site, the tags comment corrected)
  + the rating fill flip (★→⭐, the comment + the RATING_PICKER narration
  corrected). LIVE-VERIFIED at the reference's computed values on the dev
  server (every read matching — the chip's DIV tag, 22px, transparent bg,
  the 1px rgb(229,229,229) border, rgb(10,10,10) ink, 12px/600, radius 6,
  the bare row gap-8/mt-0, the chip↔chip gap 8, the bare × with the
  aria-label superset, the ⭐⭐⭐☆☆ click state with the aria-checked
  ladder; ONE live-verify expected-value bug cured mid-run: the chip's
  `inline-flex` class BLOCKIFIES to computed `flex` inside the flex row —
  spec behavior, identical on both apps, proven with a bare-div control;
  zero DB writes).
- **WP-3** — PAD §11 (the sr-chip/rating retirement row + the OTP
  standing-block row + the WH-26 form-interior row's narration
  corrections), PAD §8.1 (infra 153, a11y 21), AGENTS (the TWO-SITE SPLIT
  passage + the ⭐ codepoint + the (l) leg + the counts), SKILL
  v1.24.0→v1.25.0 (§8's WH-27 passage + lesson 31 + the counts), README +
  CLAUDE (the counts), docs-counts 10/10.
- **WP-4** — lint 0/0 · tsc 0 · unit **352/352 (24 suites)** · build OK
  · smoke 14/14 · e2e **65/65** (the (l) leg passing at 6.7s) · census
  MATCH (after ONE hygiene catch: the wh27-local-login probe's signup
  residue left a second user row in the dev db that the seed never wipes
  [the deleteMany list covers domain tables, not users] — the row deleted
  via the cascade, the re-seed + census MATCH the documented house step).
- **WP-5** — the doctrine LIVE (badgesEarned=0 asserted before the light
  set; the capture-24 write earning First-Step mid-round; the post-round
  re-seed + census MATCH). **31 byte-stable · 1 mover root-caused · 1
  NEW**: 29-quick-actions-hover = the raster-noise class (TWO takes this
  round, TWO different noise patterns — 5px then 36k px of ±1-2 RGB on
  gradient-dithered near-white pixels, maxΔ 2/255, zero visual difference —
  the run-to-run proof; the session-40 acceptable-mover precedent; the
  ledger re-based with the root cause). The NEW
  33-sr-form-interior pixel-verified: 23,493 border-line chip-border px +
  752 gold ⭐ px at rgb(253,216,53) + 1,938 ☆ ink px + 2,542 zinc Add px +
  **ZERO emerald-100 px** — the Badge-family cure's proof. ONE
  capture-procedure carry: the dark login family at the DESKTOP viewport
  (the main script left the viewport at 390×844 after phase E's drawer —
  the same bug class the WH-26 retakes cured; all four re-taken
  byte-stable). The md5 ledger re-based at **33 files**.
- **WP-6/WP-7** — the worklog WH-27 entry, this record,
  docs/session_51.md, the commit, the SSH-wrapper push
  (--key-file + --remote git@github.com:nordeim/wellness-hub.git, main
  only) with the key shredded after.

**Suggested next (for WH-28):** (a) the sr LIST-side chip + the mood list
interior — BLOCKED at the platform level (the email-only OTP); re-try on
a future redeployment watch round (the standing PAD §11 row); (b) the
login family's DARK computed-interior (the (l) leg pins the light face;
the five views' dark pairs are census-pinned but the computed geometry
was never walked in dark — a one-leg widening); (c) the reference's
redeployment watch (the CSS hash round 16 — the second redeployment moved
the login family's facts once already; the standing pins now catch the
drift same-day); (d) the ⭐ emoji's platform-rendering question (the
emoji glyph renders via the platform emoji font — the capture round
should pixel-verify our ⭐ against the reference's on the same Chromium).
