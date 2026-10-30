# Session-12 Remediation Plan — the pass-site prop-liveness census round (WH-12)

**Task ID:** WH-12 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 43d528c`: session_19.md —
the operator's WH-11 transcript push; the tree byte-identical to the WH-11
ship state `b5fdf5f` apart from that doc), re-probe the live reference for
new surfaces AND for seed-content drift (a first for the class), fix every
identified gap with TDD, lockstep the five docs + `worklog.md`, and push.

> **Provenance note:** the WH-9 component-prop census pins the destructured
> SHAPE of a fixed ten-component sweep set ("each audited component's
> destructured props equal the pinned live surface"). It is a surface
> pin, not a liveness pin: a prop can sit pinned as "live" for three
> rounds while no call site ever passes it — and one did. The WH-12 audit
> walked the PASS SITES of every component under src/ (33 definitions)
> and found two live-flagged props clusters with zero passers, plus the
> missing pin for the class.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the pulled
tree at `43d528c`):** lint 0/0 · tsc 0 · unit **316/316 (21
suites)** · `bun run build` OK · smoke **14/14** · e2e **42/42** · db
census MATCH (users=1 templates=11 steps=50 tutorials=12 badges=8) ·
`bun audit` **ZERO** — the exact documented WH-11 ship state, no flake.

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 10 nav pages + Profile walked — **ZERO new surfaces since
WH-11**; every title in the documented pattern (Dashboard ships the bare
"EvolveWell"; every inner route pipes "X | EvolveWell"); the Profile tabs
unchanged (Appearance 3 modes + 8 presets; Account read-only; Preferences
2 checkboxes); the mobile drawer battery at 390×844: 11 items, the
reference's stays-open-after-nav quirk re-verified (drawer still open at
/Exercise, no scroll lock — ours AUTO-CLOSES + releases, the e2e-pinned
superset, 42/42 green in this round's baseline); the sonner-overlay quirk
again intercepted its own toggle click (the JS-dispatch workaround, as
every round); the reference's own console carries its documented warnings
(the tailwind CDN notice + the Radix DialogTitle/Description a11y gaps in
ITS drawer). The custom 404 ("404" / "Page Not Found" / "Go Home")
re-verified — ours ships the designed parity surface.

**The seed-content watch (a NEW clean class, verified for the first
time):** the reference's 11 routine-template names and 12 tutorial titles
extracted from the live app (DOM walk) and compared against
`prisma/seed.ts` — **byte-for-byte parity on all 23 content names** (the
seed data class had never been re-verified against the live reference
since WH-1; a content edit on the reference's side would be invisible to
every surface probe).

**Findings (by severity) — the WH-12 ledger, all in the prop PASS-SITE
class no census reads:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **`GradientButton.className` — zero pass sites.** All 17 call sites across 9 files pass `onClick`/`disabled` + children; none ever passes `className`. The exact OptionChip.className precedent (same file, same `cn(CONST, className)` merge pattern — retired at WH-9 F-2b), and the WH-9 `PROPPED_COMPONENTS` pin has carried it as "live surface" (`["children", "className"]`) for three rounds: the surface pin pinned the SHAPE, and a prop with zero passers rode inside it. | src/components/shared/page-parts.tsx:32-42 | Retire the param; the `cn(GRADIENT_BUTTON, className)` merge collapses to the bare constant; the `PROPPED_COMPONENTS` literal flips `["children", "className"]` → `["children"]` in the SAME commit (the count-ladder rule for the prop pin) |
| F-2 | **MEDIUM** | **`Checkbox`'s invented arms — four never-passed props + dead machinery.** The only two call sites (profile-page's Preferences pair) are both CONTROLLED (`checked` + `onCheckedChange`; `aria-label` rides the `...props` spread). Never passed anywhere: `className`, `defaultChecked`, `label`, `id`. The dead machinery they feed: the entire uncontrolled arm (`useState(defaultChecked ?? false)` + `isControlled` branching + `setUncontrolled`), the label-render arm (`if (!label) return box` + the `htmlFor` label + `CHECKBOX.row`/`CHECKBOX.label`), and `React.useId`/`inputId`. Stock shadcn's Checkbox carries NO `label` prop — the arm is invented surface, the Session-71 `hideClose` class ("zero consumers … not stock shadcn"). | src/components/ui/label.tsx:29-97 + src/lib/page-layout.ts:219-224 | Collapse to the controlled-only box: destructure `{ checked, onCheckedChange, ...props }`, both live props REQUIRED (the WH-9 `cols` doctrine — the uncontrolled fallback dies); the uncontrolled machinery, the label arm, and `useId` retire; `CHECKBOX.row` + `CHECKBOX.label` retire from page-layout in the SAME commit (their only consumer is the dead arm — the TABS_PILL/EMPTY_STATE.title precedent; the value census trips otherwise) |
| F-3 | **Systemic (the round's TDD feature)** | **No pin for the prop PASS-SITE liveness surface.** The WH-9 prop census is (a) a fixed 10-component list — the other 23 components with destructured props ride no census; (b) surface-equality semantics (destructure == pinned literal), not liveness — F-1 rode INSIDE the pinned set for three rounds. A surface pin is not a liveness pin. | tests/src-census.test.ts | **TDD:** the whole-tree JSX pass-site census — walk every ts/tsx under src/, extract each component's destructured props (function + const-arrow forms), assert every prop is PASSED as a JSX attribute at some call site anywhere in src/ (same-module sites count — an internal render site is live), with three pinned exemption classes: `children` (JSX-nested, never an attribute), the byte-stock shadcn signature props (the Session-71 doctrine boundary: stock signatures keep their shape — allowlist below), and Next.js convention files (layout/error/global-error receive framework props — skipped as framework contract, the export-default doctrine). An element carrying a `{...spread}` attribute counts as passing EVERYTHING (conservative — the tree has zero app-level spreads today; all six are Radix internals). RED at birth with exactly F-1's one + F-2's four offenders |

**The stock-API allowlist (pinned in the census, the L-71d4 doctrine
boundary — byte-stock shadcn wrapper signatures keep their shape; the
ui layer is documented "shadcn-style" and `DialogContent.className` /
`SelectTrigger.className` / `Input`'s `className`+`type` are all LIVE at
call sites — the wrappers are not dead, only never-customized):**

| Component | Allowlisted props | Why byte-stock |
|---|---|---|
| `ui/dialog.tsx:DialogOverlay` | className | the stock shadcn overlay destructure |
| `ui/dialog.tsx:DialogHeader` | className | the stock shadcn header (`React.ComponentProps<"div">`) |
| `ui/dialog.tsx:DialogFooter` | className | the stock shadcn footer |
| `ui/dialog.tsx:DialogTitle` | className | the stock shadcn title |
| `ui/dialog.tsx:DialogDescription` | className | the stock shadcn description |
| `ui/select.tsx:SelectContent` | className, position | the stock shadcn content (position default "popper" + the Viewport conditional are byte-stock) |
| `ui/select.tsx:SelectItem` | className | the stock shadcn item |
| `ui/label.tsx:Label` | className | the stock shadcn label |

Adding a stock prop to a wrapper is a CONSCIOUS act (flip the allowlist
literal in the same commit); a NEW invented prop anywhere trips the census
at birth. `Checkbox` gets NO allowlist entry — it is hand-rolled (no
Radix underneath; the "stock Radix-style" comment describes the reference's
button-role PATTERN, not a shadcn wrapper), so the invented surface follows
the OptionChip/GradientButton liveness doctrine.

**Clean checks (no findings, documented):** the full baseline gate (42/42,
no flake) · the reference probe (zero new surfaces; the drawer battery; the
Profile/404 states; the reference's own console warnings) · **the
seed-content watch** (11 template names + 12 tutorial titles byte-for-byte
vs the live reference) · the env-contract census (exactly the six
documented vars + three framework-internal) · the model-consumption census
(15/15 alive — RoutineStep via the relation include) · the layout-module
export sweep (nav-config's `NAV_ITEMS`/`NAV_FOOTER_ITEMS`/`isNavActive`
+ sidebar's `SidebarNav`/`SidebarFooter`/`BrandMark` all live; the modules
ride no value-census entry — a clean class documented, not pinned, per the
house doctrine) · the Tabs item-type fields (`id` + `label` both read
inside the component — the documented WH-9 known boundary holds; no
widening without a finding) · the Tailwind v4 pins standing
(`@custom-variant hover`, literal-hex `@theme`, `--shadow-sm`, `--blur-sm`)
· the SEO family (smoke check 12 green) · `.env`
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ·
vitest/playwright configs per the contract · `skills/` excluded from
lint/tsc/vitest (verified in all three configs) · the WH-11 diff review
(pure `export`-keyword drops + the census pin, exactly as its plan
documented) + the session_19 doc-only review.

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the pass-site census in `tests/src-census.test.ts`:** the whole-tree walk (component defs via `function Name({…})` + `const Name = ({…}) =>`), the balanced JSX attribute scanner (strings/braces/nested JSX skipped; a spread attribute passes everything), the three exemption classes (children · the stock allowlist above · the Next.js convention files `layout.tsx`/`error.tsx`/`global-error.tsx`/`not-found.tsx`/`page.tsx`/`loading.tsx`/`template.tsx` skipped as framework contract). Flip docs-counts' `CANONICAL.unitChecks` 316→**317** in the same step. RED verified with exactly the predicted 5 offenders (GradientButton's `className` + Checkbox's `className`/`defaultChecked`/`label`/`id`) | RED as predicted |
| 2 | **GREEN — F-1 (GradientButton):** drop the `className` param; `className={cn(GRADIENT_BUTTON, className)}` → the bare `GRADIENT_BUTTON` constant (the OptionChip retirement form); the retirement comment cites the pass-site evidence (17 sites / 9 files / zero passers) | census loses one offender |
| 3 | **GREEN — F-2 (Checkbox):** the controlled-only collapse — destructure `{ checked, onCheckedChange, ...props }`, both required; the `useState`/`isControlled`/`setUncontrolled` machinery, the `label`/`id`/`defaultChecked`/`className` params, the `React.useId`/`inputId` wiring, and the label-render arm retire; `CHECKBOX.row` + `CHECKBOX.label` retire from page-layout in the SAME commit (the value census's TABS_PILL/EMPTY_STATE.title precedent); the interface drops the three dead fields, `checked`/`onCheckedChange` flip required; the comment narrates the controlled-only truth + the wrapping-label association (the parent `<label>` associates without `id`; `aria-label` rides the spread) | census GREEN; tsc 0; e2e 42/42 |
| 3b | **F-1's same-commit pin consequence:** `PROPPED_COMPONENTS`'s GradientButton literal flips `["children", "className"]` → `["children"]` (the prop pin's own count-ladder rule) | prop census GREEN |
| 4 | **The count ladder + SKILL:** unit 316→**317** / suites stay 21 at EVERY live-tense doc site (README badge + stack table + testing section + superset · AGENTS commands table + gate order · CLAUDE build table + test pyramid · PAD §7.1 tree + §8.1 totals + §9.3 pre-ship · SKILL §2 stack table + §11 pre-ship); PAD §8.1's infra row 118→**119** (109+89+119=317 — the WH-10 row-arithmetic pin green at the new truth; the row's category list gains "pass-site census"); AGENTS' census bullet extended (the pass-site census + the stock-allowlist doctrine); SKILL v1.9.0→**v1.10.0** (description + provenance + §12 lesson 16) | rg-verified, docs-counts GREEN |
| 5 | **Full gate re-run:** lint → typecheck → test (**317**) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` ZERO | full green |
| 6 | **Captures:** re-take the 16-file screenshot set from the remediated dev server (one logged-in desktop session + one mobile session; 01 pristine login first; the goals capture at the inherited 2500ms settle; the drawer walk live-verified during capture 16). F-1 is compile-time-only (a param never passed); F-2 removes the button's `id` attribute + the (never-rendered) label arm's DOM — pixel-invisible changes, all 16 expected byte-stable vs the WH-11 set; `.env` ↔ `.env.example` parity re-verify | captures |
| 7 | **worklog WH-12 entry + this plan's execution record + `docs/session_20.md`** (the round's transcript; the operator's session_19.md push never clobbered) | worklog |
| 8 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **A surface pin is not a liveness pin (the round's lesson):** the WH-9
  prop census asserts destructure == pinned literal — it catches drift in
  either DIRECTION of the shape, but it cannot see whether a pinned prop
  has a living PASSER. GradientButton.className sat pinned as live for
  three rounds with zero passers. The new census pins the PASS SITES
  (what callers actually write), and the two pins coexist: the shape pin
  forces conscious additions (a new prop flips the literal in the same
  commit); the pass-site pin kills never-passed surface at birth.
- **The stock-API boundary (Session-71's own doctrine, made explicit):**
  the L-71d4 `hideClose` retirement justified itself as "not stock
  shadcn" — the corollary is that byte-stock shadcn SIGNATURES keep their
  shape. The allowlist above pins the eight never-customized stock
  wrappers per file:Component; each entry is a conscious keep (the
  wrapper layer stays shadcn-shaped; `DialogContent.className` and
  `SelectTrigger.className` are LIVE customization seams, so the family's
  className param is real API, not vestige). Invented surface —
  GradientButton (hand-rolled page-parts), Checkbox (hand-rolled,
  no Radix underneath) — follows the liveness doctrine. The boundary is
  "byte-stock wrapper signature" vs "invented prop", NOT "ui/ folder vs
  anywhere else".
- **Same-module JSX call sites COUNT as pass sites:** an internal render
  site (`<DrawerNav onNavigate={…}>` inside mobile-nav) is a live passer.
  This differs deliberately from the export-liveness corpora (which
  exclude the declaring module): a prop is interface surface RENDERED, an
  export is interface surface IMPORTED — different liveness verbs.
- **`children` is exempt globally:** passed as JSX-nested content, never
  an attribute — the scanner would false-positive every layout component.
- **Next.js convention files are skipped as framework contract:** layout/
  error/global-error/not-found/page/loading/template receive their props
  from the framework renderer, not from JSX in the tree — the same
  doctrine that classifies `export default` as framework contract
  (WH-11's decision). The four current convention components
  (RootLayout, AppLayout, ErrorPage, GlobalError) ride no census; a
  future convention file is covered by the filename rule.
- **A spread attribute passes everything:** `<Comp {...obj} />` marks all
  of Comp's props as passed — the conservative reading (the census never
  false-positives on a spread; it can only miss dead props hiding behind
  one, and the tree has ZERO app-level spreads today — all six
  spread-attribute elements are the Radix wrappers' own `{...props}`
  internals). Documented as the census's known boundary; widen if a
  spread ever lands on an app component.
- **`checked`/`onCheckedChange` flip REQUIRED on Checkbox (the `cols`
  doctrine):** the uncontrolled fallback was the only meaning of
  optionality, and it is dead — a one-possible-mode prop set carries no
  information. Both live call sites pass both props; tsc is the gate.
- **`CHECKBOX.row`/`CHECKBOX.label` retire same-commit (the value
  census's own rule):** their only consumers are the dying label arm —
  leaving them would trip the WH-7 value census the moment the arm dies;
  retiring them before the arm lands trips it early. One commit.
- **The count ladder (exact):** 316 + 1 (the pass-site census check,
  riding src-census.test.ts — an infra file) = **317 checks / 21 suites**
  (no new suite). The e2e count stays 42; the smoke count stays 14; the
  §8.1 infra row 118+1 = **119** (row arithmetic now enforced by the
  WH-10 pin: 109+89+119=317).
- **SKILL v1.9.0→v1.10.0 (the minor convention):** every audit round
  since WH-3 bumps the minor — §12 lesson 16 ("a surface pin is not a
  liveness pin — pin the pass sites, and draw the stock-API boundary
  explicitly: the L-71d4 doctrine says invented surface needs live
  consumers, stock signatures keep their shape") is a new entry, not a
  correction.
- **The e2e/visual surface:** F-1 is compile-time-only. F-2 removes the
  button's `id` attribute and the never-rendered label arm — a DOM change
  with zero pixels attached (the two call sites never hit the arm; the
  id was never referenced by any test — verified: no e2e/unit selector
  touches the checkbox ids). Captures expected byte-stable vs the WH-11
  set; the battery (42) re-verifies the Profile Preferences surface.
- **The session file (WP-7):** the operator's numbering pushed
  session_19.md (the WH-11 raw transcript); this round's transcript file
  is `docs/session_20.md`, matching the house pattern.
- **Declined (documented, not taken):** the functional-superset round
  (real video URLs, OAuth wiring — ninth deferral; the probe re-confirmed
  the intentional-parity state; it stays the operator's call); the
  nav-config/sidebar value-census widening (a clean class with zero
  offenders — the house doctrine pins when a finding lands, and none
  did); the Tabs item-type field widening (the documented WH-9 boundary
  holds — `id` and `label` are both read); a fresh-clone verification
  (this round touches zero install/env/db-path surface — F-1/F-2 are
  component surgery; WH-8's fresh clone covers the posture; re-run when
  a round touches those surfaces again).

---

## 4. Execution record (2026-10-30, WH-12 — filled as executed)

- **Baseline gate (live, pulled tree at 43d528c):** lint 0/0 · tsc 0 ·
  unit 316/316 (21 suites) · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · bun audit ZERO — the documented WH-11 ship state, no flake. — §1
- **The reference probe:** zero new surfaces; the drawer battery green on
  the reference (11 items, stays-open quirk, no scroll lock); the Profile
  tabs unchanged; the 404 surface re-verified; the seed-content watch
  verified byte-for-byte (11 templates + 12 tutorials). — §1
- **The plan's pre-landing validation (the doctrine):** the census
  dry-run (the exact extractor + exemption design, run as a scratch
  script before any test moved) returned **exactly the predicted 5
  offenders, zero false positives** — the stock allowlist, the
  convention-file rule, and the spread rule all held on the first pass.
- **WP-1 (RED):** the pass-site census landed in `tests/src-census.test.ts`
  (the whole-tree walk + the balanced JSX attribute scanner + the three
  exemption classes). CANONICAL flipped 316→317 in the same step. RED
  verified with exactly the predicted 5 offenders; docs-counts RED with
  exactly the 6 ladder carriers (the row-arithmetic check + the five
  per-doc claim checks).
- **WP-2 (GREEN, F-1):** GradientButton's `className` param retired; the
  merge collapsed to the bare `GRADIENT_BUTTON` constant; the retirement
  comment carries the pass-site evidence (17 sites / 9 files / zero
  passers).
- **WP-3 (GREEN, F-2):** the Checkbox controlled-only collapse — the
  uncontrolled machinery (useState/isControlled/setUncontrolled), the
  label-render arm, useId/inputId, and the four dead params retired;
  `checked`/`onCheckedChange` flipped required; `CHECKBOX.row` +
  `CHECKBOX.label` retired from page-layout in the same commit. **tsc 0**
  on the first run; src-census GREEN 11/11.
- **WP-3b (F-1's pin consequence):** `PROPPED_COMPONENTS`'s
  GradientButton literal flipped to `["children"]`; the prop census GREEN.
- **WP-4 (the ladder):** 316→317 at all 13 live-tense sites (README badge
  + stack + testing + superset · AGENTS commands + gate order · CLAUDE
  build table + test pyramid · PAD §7.1 tree + §8.1 totals + §9.3
  pre-ship · SKILL §2 + §11); PAD §8.1's infra row 118→**119**
  (109+89+119=317, the row-arithmetic pin green at the new truth) with
  the category list gaining "pass-site censuses"; AGENTS' census bullet
  extended; SKILL v1.9.0→**v1.10.0** (description + provenance + §12
  lesson 16). docs-counts GREEN 10/10; unit suite **317/317 (21
  suites)**.
- **WP-5 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **317/317 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · `bun audit` ZERO.
- **WP-6 (captures):** all 16 re-taken from the dev server (01 pristine
  login first; the goals capture at the inherited 2500ms settle; the
  drawer walk live-verified during capture 16 — the auto-close proof:
  the portal unmounted, zero role=dialog at /Exercise). md5: 16 unique,
  **15/16 byte-stable vs the WH-11 set; the one mover (07-events.png)
  root-caused to the DATE, not the code**: the WH-11 set was captured
  Oct 29 ~23:45 and this round's at Oct 30 ~00:32 — the events page's
  today-cell highlight (29→30) and the form's default date moved. The
  stash-isolation experiment proved it: the WH-11 tree (stashed) and the
  WH-12 tree captured NOW at the same date are **byte-identical**
  (`9a718af1…`), and a same-minute re-capture diffed 0 pixels — F-1/F-2
  changed zero pixels, exactly as predicted. `.env` ↔ `.env.example`
  parity re-verified (the AUTH_SECRET value only).
- **WP-7:** the worklog WH-12 entry + this record + docs/session_20.md.
- **WP-8:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
