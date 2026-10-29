# Session-9 Remediation Plan — the component-prop/member census round (WH-9)

**Task ID:** WH-9 · **Date:** 2026-10-30 · **Branch:** `main` (only)
**Mission:** audit the shipped tree (remote `main @ 0feccce`: session_13.md —
the operator's WH-8 transcript push + prompt-to-review-4.md; the tree
byte-identical to the WH-8 ship state `1442f3b` apart from those two docs),
re-probe the live reference for new surfaces, fix every identified gap with
TDD, lockstep the five docs + `worklog.md`, and push.

> **Provenance note:** this round takes the F-7 surgery WH-8 declined
> ("variant liveness is a different surface class needing its own pin") —
> the class-wide sweep found the dead surface reaches well beyond tabs:
> five components carry dead props, and the theme store carries a dead
> member. The findings ledger below is this round's fresh audit's.

---

## 1. Audit summary (the verified ledger)

**Baseline gates (all run live this session, pre-remediation, on the pulled
tree at `0feccce`):** lint 0/0 · tsc 0 · unit **312/312 (21 suites)** ·
`bun run build` OK · smoke **14/14** · e2e **42/41 + 1 flake** (see F-1)
· db census MATCH (users=1 templates=11 steps=50 tutorials=12 badges=8)
· `bun audit` **ZERO** — the documented WH-8 ship state, plus one
load-sensitive e2e race the shipping round's own gate never drew.

**The live reference re-probe (2026-10-30, logged in as the demo
account):** all 10 nav pages + Profile walked — **ZERO new surfaces since
WH-8**; every title in the documented pattern ("Routines | EvolveWell", …;
/Dashboard ships the bare "EvolveWell"). The Account tab still read-only
(three disabled fields, role="user"); Preferences still the two checked
checkboxes; Appearance unchanged (3 modes, 8 presets, custom hex pair,
font/bg-image/sidebar-style/card-style/animation comboboxes) — and the
Appearance tab carries **NO reset button** (live-verified: the round's
F-3 retirement is parity-safe). The **mobile drawer battery re-verified
live at 390×844**: 11 items on the reference; its drawer STAYS OPEN after
a drawer-nav to /Exercise with NO scroll-lock (its own quirk) while ours
AUTO-CLOSES + releases the scroll-lock (the e2e-pinned superset); the
reference's empty sonner-toast overlay again intercepted its own toggle
click for automation (its quirk, not ours — ours clicks cleanly). The
Learning page: 12 "Watch Now" buttons; the reference's no-link tutorial
click no-ops (ours toasts the coming-soon note and opens real links in a
new tab — the documented intentional-parity state). The login page:
"Continue with Google" present on both (the unconfigured-OAuth parity
surface). Zero console errors on every walked surface.

**Findings (by severity) — the WH-9 ledger, the prop/member classes the
earlier census pins do not reach:**

| # | Severity | Finding | Location | Fix |
|---|----------|---------|----------|-----|
| F-1 | **MEDIUM** | **The goals e2e determinism race** — the "+1 times" progress clicks at lines 130-131 run back-to-back UNASSERTED; a click dispatched on the list node mid-re-render (detached between actionability and dispatch) is silently lost. Observed live in this round's baseline gate: the goal stuck at 2/3 after three dispatched clicks, "Goal completed" never fired; 6/6 green on `--repeat-each=5` in isolation — a load-sensitive flake the battery must not carry. | tests/e2e/wellness-crud.spec.ts:130 | **CURED at baseline:** the step assertion `Progress logged: 2/3 times` between clicks #2 and #3 — asserts #2's effect AND guarantees the refresh landed before #3's dispatch (the detach window closes by construction). e2e count stays 42; zero product surface touched. |
| F-2 | **MEDIUM** | **The component-prop dead surface (the WH-8 F-7 class, swept wide):** `Tabs` — the `underline` variant (the DEFAULT arm — zero call sites; the only live call site is the Profile strip's `segmented`) and the `pill` variant (zero call sites; drags `TABS_PILL` from page-layout — its only consumer), the no-`cols` fallback arm (`flex items-center gap-1 overflow-x-auto scrollbar-thin` — Profile always passes `cols={3}`), and the `count` prop (zero call sites; drags the red-badge span arm); `SectionCard.bodyClassName` (zero call sites — 11 live SectionCard sites pass icon/title/children, 2 pass action); `EmptyState.title` (zero call sites — all 11 sites pass icon+hint only; drags `EMPTY_STATE.title` from page-layout); `OptionChip.className` (zero call sites — all sites pass label/tint/text, one passes icon); `SidebarNav.onNavigate` + `SidebarFooter.onNavigate` (zero call sites — app-shell renders both BARE; the drawer has carried its own styled nav since the build). | tabs.tsx, page-parts.tsx, sidebar.tsx, page-layout.ts | Retire all; the component-prop census (F-5) owns the class |
| F-3 | **MEDIUM** | **The theme store's dead `reset` member** — zero call sites anywhere (the Profile page consumes all 10 ThemeState fields + `setTheme`; nothing reads `reset`; the error-boundary `reset: () => void` props and the password-reset routes are unrelated surfaces). The reference's Appearance tab carries NO reset surface (live-verified this round) — the action was speculative superset that never shipped a consumer. | src/stores/theme-store.ts | Retire `reset` (the ThemeState action + its implementation block; `ThemeData`'s Omit list drops to `setTheme`); the theme-store member census (F-5) owns the class |
| F-4 | **LOW** | **sidebar.tsx's phantom-sharing header comment** — "Shared navigation list — rendered inside BOTH the desktop sidebar and the mobile drawer so the two stay in lockstep" narrates an architecture that does not exist: the drawer has carried its own `DrawerNav` (the sheet-styled family) since the build; `SidebarNav`/`SidebarFooter` render in the desktop sidebar only. The comment is the WH-8 F-2 residue class (a live-tense lie) and it is precisely the fiction that justifies the dead `onNavigate` prop. | sidebar.tsx | Reword at the truth (the desktop sidebar renders these; the drawer's own `DrawerNav` carries the sheet-styled copy) |
| F-5 | **Systemic (the round's TDD feature)** | **No pin for the component-prop class or the theme-store member surface.** WH-8's store census reads `WellnessState` members (wellness-store only); the ui-export census reads export-block names; the value census reads exported values — NEITHER sees a component's accepted props/variants (the dead `underline` default arm hid inside tabs for eight rounds) nor the theme store's members (its own `ThemeState` interface, never walked). F-2/F-3 are exactly these classes. | tests/src-census.test.ts | **TDD:** (1) the component-prop census — for each audited component, extract the destructured prop names from the function signature and assert equality against the pinned live surface (the api-export-surface doctrine: drift trips in either direction); RED at birth with exactly F-2's offenders; (2) the theme-store member census — the WH-8 extraction pattern widened: every `ThemeState` member must be consumed at a `useThemeStore` call site (the assigned variable's member accesses, production files outside the store); RED at birth with exactly `reset`. Both cure GREEN in the same commit. |

**Clean checks (no findings, documented):** the full baseline gate (post-F-1)
· the reference probe (zero new surfaces; the drawer battery; the
Account/Preferences/Appearance states; no reset on the reference) · **all
15 prisma models alive** (≥3 `db.<model>` consumers each — the
model-consumption class verified clean; no pin this round per the
finding-driven doctrine) · **the env contract complete** (every
app-managed `process.env` read documented in `.env.example`;
`NODE_ENV`/`NEXT_RUNTIME`/`NEXT_PHASE` are Next-injected — verified clean,
no pin this round) · `toast.description` live (the Google button's
two-arg call) · `LoginCard.mode` live (login default + signup) ·
`MobileNav.open/onOpenChange` both live · the ui primitives carry no
invented props (SelectTrigger/Content/Item, Input, Label, Dialog are
passthrough + primitive defaults) · `GRID_COLS` kept whole (the
Session-66 precedent: the map is the `cols` prop's compile table; retire
maps only when fully dead) · `.env` ↔ `.env.example` parity (identical
except `AUTH_SECRET` — the designed state) · requireSession on every
non-public handler · the SEO family (smoke check 12) · the Tailwind v4
pins standing in globals.css · the page-layout/constants/format/wellness
value surfaces (the WH-7/WH-8 censuses own them).

---

## 2. Remediation sequence (TDD)

| # | Work package | Gate |
|---|--------------|------|
| 1 | **RED — the two new pins:** the component-prop census + the theme-store member census land in `tests/src-census.test.ts` (+2 checks). Flip docs-counts' CANONICAL unitChecks 312→**314** in the same step (post-landing truth; the per-doc claim checks carry the ladder RED until WP-6). RED verified with exactly the predicted offenders: the F-2 prop list (tabs' variant/count/fallback, bodyClassName, EmptyState.title, OptionChip.className, onNavigate ×2) + theme-store's `reset` | RED as predicted |
| 2 | **GREEN — F-2a (the tabs surgery):** retire the `variant` prop (the union collapses to its only live value — a one-value prop carries no information; the component always renders the segmented track), make `cols` required (the no-cols fallback arm dies), retire `count` from the item type + the red-badge span; the Profile call site drops `variant="segmented"`; `TABS_PILL` retires from page-layout in the SAME commit (the value census trips otherwise — its consumer died with the pill branch); the header comment re-anchored at the Profile-strip truth | pin GREEN + typecheck + e2e |
| 3 | **GREEN — F-2b (the page-parts surgery):** retire `SectionCard.bodyClassName` (the `cn` merge collapses to the bare constant), `EmptyState.title` (the `{title && …}` arm dies; `EMPTY_STATE.title` retires from page-layout in the SAME commit), `OptionChip.className` (the param, the `cn` merge, the span's className arm) | pin GREEN + typecheck |
| 4 | **GREEN — F-2c + F-4 (the sidebar surgery):** retire `onNavigate` from `SidebarNav` + `SidebarFooter` (both `onClick={onNavigate}` arms die with the prop); cure the header comment at the truth (the desktop sidebar renders these; the drawer's own `DrawerNav` carries the sheet-styled copy — the phantom "BOTH" sharing retired with the prop that served it) | pin GREEN + e2e |
| 5 | **GREEN — F-3 (the theme store):** retire `reset` from `ThemeState` + the implementation block; `ThemeData = Omit<ThemeState, "setTheme">` (the Omit list drops `reset`); `DEFAULTS` stays (the initial state, `partialize`, and `syncPrefsFromServer`'s localTouched probe all consume it) | pin GREEN + typecheck |
| 6 | **The count ladder + SKILL:** unit 312→**314** / suites stay 21 at EVERY doc site (README badge + stack table + testing + superset · AGENTS commands + gate order + the census bullet · CLAUDE build table + test pyramid · PAD §3.2 tree + §8.1 infra row + totals + §8.4 checklist · SKILL §2 + §11); SKILL v1.6.0→**v1.7.0** (description + provenance + §11 pre-ship + §12 lesson 13) | rg-verified |
| 7 | **Full gate re-run:** lint → typecheck → test (314) → build → smoke 14/14 → e2e 42/42 → db census + `bun audit` ZERO | full green |
| 8 | **Captures:** re-take the 16-file screenshot set from the remediated dev server (one logged-in session; 01-12 at 1280×900, 13-16 at 390×844 — the drawer walk live-verified during capture 16); md5 uniqueness; F-2/F-3 touch zero visual surface (dead props, a dead store member) so 01-15 expected byte-stable vs the WH-8 set modulo deterministic-render noise; `.env` ↔ `.env.example` parity re-verify | captures |
| 9 | **worklog WH-9 entry + this plan's execution record + `docs/session_14.md`** (the round's transcript; the operator's session_13.md push never clobbered) | worklog |
| 10 | **Commit to main; push** via `docs/ssh_git_wrapper_v3.py` (the paramiko shim for the no-ssh-binary sandbox, per docs/how-to-git-push-using-ssh-wrapper_SKILL.md; key OUTSIDE the repo; dry-run then push; shred the key after) — **main only, no new branches** | remote main |

---

## 3. Decisions (open questions, decided)

- **Collapse the variant, don't keep it (F-2a):** the `variant` prop with
  one possible value carries no information — every call site renders
  identically without it. The full surgery (drop the prop, hardcode the
  segmented track) follows the WH-6/7/8 retire-don't-keep doctrine; the
  dead `underline` default arm is exactly the class the ui-export and
  value censuses cannot see (a default arm hides a dead branch behind a
  live prop).
- **`cols` becomes required (F-2a):** the no-`cols` fallback arm
  (`flex items-center gap-1 overflow-x-auto scrollbar-thin`) exists for a
  call site that never shipped — the Profile strip always passes 3. The
  required prop closes the arm by construction; `GRID_COLS` stays whole
  (the Session-66 precedent — the map is the compile-time lookup the
  Tailwind v4 scanner needs; entry-level liveness is a different class,
  declined).
- **Same-commit retirement for the dragged constants:** `TABS_PILL` and
  `EMPTY_STATE.title` lose their last consumers inside this round's
  edits — retiring them in the same commit keeps the WH-7/WH-8 value
  censures GREEN throughout (an out-of-order retirement would trip the
  value census the moment the consumer died).
- **The theme census reads the CURRENT interface (F-5):** like the WH-8
  store census, the member list is extracted from `ThemeState` on every
  run — a re-added dead member fails the census at its next execution.
  The consumption extraction follows the live access forms: the assigned
  variable at `useThemeStore()` call sites (`const theme = …` then
  `theme.member`) — the same-file variable-name scoping that killed the
  fake-consumer class at WH-8.
- **The component-prop census pins the ACCEPTED surface (F-5):** the
  destructured prop names per audited component, asserted equal to the
  pinned literal (the api-export-surface doctrine). Drift trips in
  either direction: a re-added dead prop fails the equality; a
  consciously added live one forces the pin's literal update in the same
  commit — the surface change becomes conscious, which is the census's
  entire job.
- **The e2e/visual surface is untouched (F-1..F-3 are pixel-invisible):**
  dead props, a dead store member, and a comment cure render byte-equal.
  Captures 01-15 expected byte-stable vs the WH-8 set; 16 carries the
  standing timing-frame drift. The e2e battery (42) re-verifies the
  drawer walk and the Profile strip post-surgery.
- **The count ladder (exact):** 312 + 1 (component-prop census) + 1
  (theme-store member census) = **314 checks / 21 suites** (both ride
  src-census.test.ts; no new suite). The e2e count stays 42 (F-1 is an
  in-body assertion insert, not a new test); the smoke count stays 14.
- **Declined (documented, not taken):** the model-consumption census and
  the env-contract census — both classes verified CLEAN this round (all
  15 models alive; the env contract complete); pins follow findings (the
  WH-3..WH-8 doctrine — every census pin to date was born from a real
  finding in its class). The functional-superset round (real video URLs,
  OAuth wiring) — the probe re-confirmed the intentional-parity state
  (the reference's own no-link tutorials no-op; its OAuth button is the
  same unconfigured surface); it stays the operator's call.
- **The session file (WP-9):** the operator's numbering pushed
  session_13.md (the WH-8 transcript); this round's transcript file is
  `docs/session_14.md`, matching the house pattern.

---

## 4. Execution record (2026-10-30, WH-9 — filled as executed)

- **Baseline gate (live, pulled tree at 0feccce):** lint 0/0 · tsc 0 ·
  unit 312/312 (21 suites) · build OK · smoke 14/14 · e2e 41/42 + the
  F-1 race (goal stuck at 2/3, completion toast never fired) · census
  MATCH · bun audit ZERO. F-1 cured at baseline; full gate re-run GREEN
  42/42.
- **The reference probe: zero new surfaces; the drawer battery green on
  the reference (11 items, stays-open quirk, no scroll lock); the
  Account tab read-only; Preferences ×2; Appearance 3/8/presets/
  comboboxes with NO reset button; the sonner-overlay quirk re-observed;
  the Learning video surface and the login OAuth button at the
  documented intentional-parity state.** — §1.
- **WP-1 (RED):** the two pins landed in src-census.test.ts — the
  component-prop census (the destructure extraction, the spread tail
  dropped) and the theme-store member census (the assigned-variable
  member-access extraction). RED at birth with EXACTLY the predicted
  offenders: the six prop-surface mismatches (tabs' `variant`,
  SectionCard's `bodyClassName`, EmptyState's `title`, OptionChip's
  `className`, SidebarNav/SidebarFooter's `onNavigate`) + theme-store's
  `reset`. docs-counts' CANONICAL flipped to 314/21 in the same step;
  the per-doc claims carried the ladder RED until WP-6.
- **WP-2 (GREEN, F-2a):** the tabs surgery — `variant` retired (the
  segmented track renders unconditionally), `cols` required (the
  fallback arm died), `count` gone from the item type + the red-badge
  span; the Profile call site dropped `variant`; `TABS_PILL` retired
  from page-layout in the same commit; the header comment re-anchored.
- **WP-3 (GREEN, F-2b):** SectionCard.bodyClassName, EmptyState.title
  (`EMPTY_STATE.title` retired same-commit), OptionChip.className —
  all with retirement notes.
- **WP-4 (GREEN, F-2c+F-4):** `onNavigate` retired from both sidebar
  exports; the phantom-sharing comment cured at the truth.
- **WP-5 (GREEN, F-3):** the theme store's `reset` retired (the member,
  the implementation block, the Omit entry); DEFAULTS stays.
- **WP-6 (the ladder):** 312→314 at every doc site (README ×4, AGENTS
  commands + gate order + the census bullet, CLAUDE ×2, PAD tree +
  §8.1 infra row 136→138 + totals + §8.4, SKILL §2 + §11); SKILL
  v1.6.0→v1.7.0 (description + provenance + §11 pre-ship + §12 lesson
  13). docs-counts GREEN 9/9.
- **WP-7 (the full gate, live, post-cure):** lint 0/0 · tsc 0 · unit
  **314/314 (21 suites)** · build OK · smoke 14/14 · e2e 42/42 · census
  MATCH · `bun audit` ZERO.
- **WP-8 (captures):** all 16 re-taken (01 pristine login first; the
  drawer walk live-verified during capture 16 — the auto-close proof
  upgraded to the portal-unmount check: zero `role=dialog` elements at
  /Exercise). md5: 16 unique. One drift vs the WH-8 set — 11-goals,
  0.466% in a 140×64 bottom-left box — convergence-tested: a 2500ms
  settle re-capture is byte-identical to the WH-8 take (an entrance-
  animation settle frame, not a content change); the settled take
  installed. Final: **16/16 byte-identical to the WH-8 set**. `.env` ↔
  `.env.example` parity verified (identical except AUTH_SECRET).
- **WP-9:** the worklog WH-9 entry + this record + docs/session_14.md.
- **WP-10:** commit to main + the SSH-wrapper push (paramiko shim; key
  outside the repo; dry-run → push → remote verify → shred).
