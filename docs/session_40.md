The repo is at WH-20's shipped commit. Let me pull the latest and check for the new session docs the user referenced.
Pulled new commit `20dbd25` adding `docs/session_38.md` — the driver for the next round. Let me read the key docs.
session_38 logs the previous session completing WH-20. Per house convention, this prompt drives **WH-21**. Let me review the core docs — worklog's latest entry, session_37 tail, and the standing docs.
`.env` and `db/` are correctly placed. Now reading the standing docs.
Docs internalized. Now a quick scan of PAD's key sections (§11 ledger, §8.1 test distribution) and README, then I'll set up the round.
All docs internalized. The WH-20 "Suggested next" gives this round's candidates: (a) the `active:`/`data-[state=]`/outline-family interaction sweep, (b) the WCAG 2.4.13 AAA ring upgrade, (c) functional superset if the reference redeployed. Setting up the round:
Baseline lint/tsc/test/build/smoke all green. The db census shows one UserBadge of probe residue (WH-20's capture round created an API workout that auto-awarded a badge — the rows were normalized but the badge survived). Checking the seed's wipe scope, then reseeding per the house prescription:
Census MATCH. Now the e2e baseline:
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 335/335 (23 suites) · build OK · smoke 14/14 · e2e 57/57 · census MATCH (dev db reseeded — one UserBadge of WH-20 capture residue). Checking the advisory posture, then starting the live reference probe:
Logged in. Watch round 8 — the compiled-CSS asset hash (the redeployment signal):
CSS hash **UNCHANGED** (`index-heGLHP2e.css`) — watch round 8, no redeployment. Continuing the standing watch classes for the record — seed watch round 10 (template names + tutorial titles):
That's our side. Reading the reference's seed content through its UI pages (the watch convention):
Found it — bun auto-loads `/home/z/my-project/.env` (the sandbox workspace file), whose absolute `DATABASE_URL` overrides the repo's relative one for scratch scripts. Overriding inline (shell env beats .env files in bun):
Templates 11/11 ✓. Now tutorial titles on /Learning:
Seed watch r10: **23/23 byte-for-byte**. Now the entity-API watch round 9 — finding the live endpoint via the page's own network:
**Entity-API watch r9: 12 rows / 13 keys / views:0 — holds.** Now probe hygiene — the account's preset state, then the H1 identity walk:
账户无误 — 品牌系列读取到 **Indigo Dream** (135deg, #6366f1→#a855f7)。现在进行 H1 身份遍历 —— 先获取我们的地图，然后走查参考站点：
All five read the same 2-stop gradient — suspicious; `main h1` may be matching a brand-family element. Reading the H1 text alongside:
The first `h1` is the drawer brand title; the module H1 is the second. Re-walking with the correct selector:
**H1 identity walk: 11/11 byte-identical** (all stops match our `PAGE_THEMES` map exactly). Now the drawer battery at 390×844:
Drawer opens with 11 items ✓. Testing the stays-open-after-nav quirk:
`offsetParent` is null for fixed-position elements — re-checking with rect-based visibility:
Stays-open quirk **holds** (288×844 visible after nav). Clean teardown check:
Clean teardown ✓. One more standing watch — the href-less Watch-Now placeholders on /Learning:
12/12 href-less Watch-Now placeholders ✓. **REFERENCE PROBE COMPLETE — EVERY WATCH CLEAN** (preset CLEAN, H1 11/11, CSS hash r8 unchanged, seed 23/23 r10, entity API r9, drawer battery 11+quirk+teardown, 12 placeholders). No redeployment → **WH-21 audits the un-walked interaction families** (the `active:` arms, `data-[state=]` surfaces, the outline-focus family) under the computed-contrast doctrine. Booting our dev server:
Port 3000 is occupied by a stale server from a previous session. Killing it and starting fresh (the stale-build lesson from WH-20):
Dev server ready. Starting the **static inventory** of the three un-walked families — first all `active:` arms:
Those are TypeScript parameter names, not Tailwind arms. Checking for actual Tailwind `active:` variant utilities in class strings:
Zero Tailwind `active:` arms exist in the tree — that family is empty (the suggested-next listed it speculatively). The `data-[state=` sites are animation-only except tabs. Examining the tabs active-state styling:
Tabs carry their dark pair (`dark:data-[state=active]:bg-neutral-800`). Now the systematic sweep — all color-bearing `data-[state=` arms and the outline-focus family:
Static finding #1: `CHECKBOX.control` ships `data-[state=checked]:bg-neutral-900` + `border-neutral-900` with **no dark pair** — a checked box on a dark card may be invisible. Sweeping the remaining state-variant families for completeness:
Two more sites to verify. Checking the Profile checkbox consumers and the dark surface token values:
Dark surface is `#18181b`; the checkbox's `neutral-900` (#171717) box computes ~1.1:1 against it — **the checked fill AND unchecked border are invisible in dark**. This is a real gap (our superset surface — the reference's dark mode is itself broken, per PAD). Continuing the sweep — outline-color focus sites:
The ring family is token-based (mode-safe), and palette `focus:` arms are already gated by the WH-20 census. The outline-color family is empty (all `outline-none`+ring). Now examining `label.tsx` — its comment mentions `aria-checked` switch-like surfaces on filter rails:
The Checkbox mirrors the reference's own anatomy (light = byte-parity `#171717`; dark = our superset, freely curable). Now the live-value axis — logging into our dev app and probing:
Logged in. Flipping to dark via the Profile UI (the house probe path), then probing the checkboxes:
Checked fill confirmed invisible in dark (rgb(23,23,23) on ≈#1a1a1d ≈ 1.12:1). The glyph renders white ✓ — but the *unchecked* state (no glyph + invisible border) would be a completely invisible control. Verifying live:
**F-1 confirmed live**: unchecked in dark = transparent bg + #171717 border + no glyph → invisible control. Re-checking the box (probe hygiene — it PUTs to server prefs):
Prefs restored ✓ (both true). Now the tabs VALUE axis in dark (the `data-[state=active]` family) — the Profile tab strip is right here:
Tabs in dark: the active pill bg is 1.14:1 on the track (near-invisible ornament), but the state is carried by the text differential (white 15.9:1 vs neutral-400 6.5:1) — the stock shadcn/reference family. Now the dashboard quick-action `group-hover:text-primary` value in dark:
Hovered icon in dark = #6366f1 on #09090b = **4.12:1 ✓** (passes 3:1 non-text). The dark audit surface is complete: one real defect (F-1 checkbox). Flipping back to Light (probe hygiene), then the reference parity reads:
Account normalized (light / Indigo Dream). Now the reference's Profile page — checkbox + tab strip parity reads:
Reference tabs byte-identical to ours (active white/#0a0a0a, track #f5f5f5; inactive #737373 — our documented neutral-600 superset). The reference shows **zero checkboxes** on its Profile — checking what its Preferences section actually carries:
**Confirmed: the reference has NO notification checkboxes** — the Preferences pair is our functional superset, so the dark cure is unconstrained by parity. The audit ledger is nearly complete. One last sweep for other stateful toggle surfaces (`aria-pressed`/`aria-selected` beyond tabs):
Three `aria-pressed` toggle surfaces with conditional class swaps. Reading their active/inactive records in page-layout:
`THEME_MODE_PICKER` and `PRESET_CARD` are green (documented mode-independent / token forms). The **mood chips** (`border-primary bg-primary/10 text-primary`) compute ≈4.29:1 light / ≈3.37:1 dark for 14px text — potentially failing. Is this the reference's own form? Probing its mood selector:
The mood chips live inside the New Entry dialog. Opening it:
The active mood chip shows white ink with `backgroundColor: transparent` — its fill must be a gradient. Reading `backgroundImage`:
The reference's own active mood chip = **blue→cyan gradient + white text (2.30:1 — its own AA failure class)**, while ours is a `primary/10` tint + primary ink (4.29:1). Different forms. Checking our form's provenance in the source:
Our mood chips shipped at WH-15 with a `primary/10` form — but the reference's own active chip is a **fixed blue→cyan gradient + white ink** (its module-pair family, not preset-themeable). Ours is both a visual deviation AND rides the wrong theming model. This is the un-walked transient surface class. Reading the full dialog form:
The energy slider rides `accent-[var(--color-primary)]`. Checking the reference's slider accent + our dark rendering:
The reference's slider is `accent: auto` (UA default); ours is preset-coordinated — a settled superset. The mood chip is the real finding. Checking our journal-tile gradient (the blue→cyan family we already mirror):
The mood chip needs the class context: our module buttons + journal tiles already mirror the reference's fixed gradient pairs with white ink — a family never measured. Computing the whole fixed-pair white-ink table from the pinned v3 values:
The math is decisive: the **entire fixed-gradient white-ink family fails AA** (goals 1.92:1 worst) — all byte-identical to the reference's own buttons (never measured, a genuine ledger gap); the checkbox cure picks itself (neutral-400 at 6.88:1 + neutral-950 glyph at 7.85:1); the mood chip fails AA in both modes in its current form (3.95/3.59) AND rides the wrong theming model. Verifying the reference chip's geometry before writing the plan:
That caught a card, not the chip. Re-probing with height filtering:
The reference's mood selector uses large 109px tiles (16px text, radius 16) — not pills. Reading the full selector anatomy:
The reference's selector = 5 large tiles (~173×104, rounded-2xl, 16px text); ours = 40px rounded-full pills. Measuring our rendered form:
Our selector deviates on the full anatomy (40px pills/14px vs 104px tiles/16px + the color form). Checking the reference's dialog width + tile layout to scope the mirror precisely:
The reference's dialog is 912px with a 5-col grid. Checking whether that width is its standard dialog or special to this one — probing another module dialog:
The reference's module dialog = 912px (960 outer). Comparing our own Exercise dialog width directly:
Our dialog = 512px overlay; the reference's form ancestors are all `position: static` — its "dialog" may render **inline**, not as an overlay. Verifying:
The reference's form is open with **zero fixed layers and no scroll lock** — inline, not modal. Checking where the form sits in the DOM:
**MAJOR FINDING**: the reference's module forms are **inline expanding cards** (`rounded-xl border` inside the page's max-w-6xl container, in-flow, no overlay, no scroll-lock) — ours are Radix modal overlays. Verifying the pattern across more reference modules:
Events is inline too (form open, zero fixed layers). Snapshotting to see the form's position in the page:
The reference's form = inline card titled "Create New Event" between the trigger and the calendar. Opening our Events form for the full comparison:
Ours: same title "Create New Event" but delivered as a 512px modal. Checking one more reference surface (Routines "Use This Template") to map the modality pattern completely:
**The reference DOES use modals** — the Routines "Schedule" flow opens `fixed inset-0 z-50 bg-black/80` (identical to our overlay anatomy). So the split is: **inline cards for module create-forms, modals for the scheduling flow**. Mapping the remaining reference modules:
Assignments: **INLINE confirmed** (same 912×364 in-flow card). Finishing the map — Reminders, StudyResources, Goals:
**Modality map complete**: all 7 module create-forms are inline cards on the reference (only Routines' Schedule flow is a modal, matching ours). This is the round's giant finding — a 7-surface modality deviation that shipped through 20 rounds (the forms' content is parity; the delivery mechanism isn't). Probing the reference's inline card anatomy precisely for the cure pin:
The card = the **stock shadcn Card anatomy** (`rounded-xl border bg-card text-card-foreground border-none shadow-xl` + CardHeader `flex flex-col space-y-1.5 p-6` + CardContent `p-6 pt-0`). Reading the title typography + full shadow:
The card anatomy is fully decoded (stock shadcn Card family, `text-base` semibold title). One more probe — the mood tile's inner layout (173×104 geometry):
Mood tile decoded: `p-4 rounded-2xl border-2 transition-all` + gray-200/300 inactive + gradient active, emoji 36px / label 14px block-stacked. Final verification — our Routines flow is a modal (the parity match) and our Card component inventory:
The CRUD spec needs only 3 dialog-locator retargets (the schedule one stays). Two last anatomy probes — the reference's form footer layout + whether its card headers carry descriptions:
The audit is nearly complete. Checking whether the reference's form headers carry descriptions on other modules (ours have `DialogDescription`s):
Reference headers = title only, no descriptions. Reading our Events form fully to map the conversion surface:
One more probe — the mood tile's exact flex layout (row vs col):
Tile decoded: block layout, stacked centered children, active adds `shadow-lg scale-105`. Checking the reference's mobile form of the tile grid (390px):
`grid grid-cols-2 md:grid-cols-5 gap-3`. **The audit is complete.** Compiling the conversion inventory — all Dialog consumers and the descriptions to retire:
Inventory complete: 7 pages convert, routines keeps its Dialog, mobile-nav uses `DialogOverlay` only. Reading the house plan format, then writing the WH-21 plan:
Now mapping every e2e dependency on the dialog forms before writing the plan:
The e2e retarget surface is small (2 CRUD locators + 1 toast-leg button). Checking the dialog.tsx export surface (the value-census constraint after the conversion):
All constraints mapped. Checking the captures ledger infrastructure, then writing the plan:
All infrastructure mapped. Writing the WH-21 remediation plan:
**WP-1 RED** — starting with the census extension. Reading the src-census structure around the interaction-arm census:
The census structure is clear. Appending the WH-21 form-modality census:
**RED verified — 14 deterministic failures** (2×7, exactly the audit's inventory). Now the interaction-contrast pin extensions. Reading the existing pin:
The pin structure is clear. Checking `PROFILE_PANEL.body` (the checkbox's effective backdrop base) before writing the extensions:
`PROFILE_PANEL` confirms the backdrop chain (surface + line-soft/40 wash = #1a1a1d). Writing the two pin extensions:
Now the gradient-ink pin (the new suite):
3 RED failures at the exact planned causes (the missing ledger rows + one arithmetic correction: the light fill's true ratio is 17.93, not my plan's estimate). Fixing the pin value and checking the neutral-950 palette pin:
`neutral-950` is already pinned — no palette surgery needed. Now the e2e legs. Reading the CRUD spec's form flows:
Now the a11y spec — retargeting the toast leg and adding the two new legs:
tsc 0 · lint clean. Getting the empirical unit count for the CANONICAL flip:
**RED verified — 5 failures at the exact planned causes** (census 14 sites, both pins' missing arms, the missing ledger rows, + the docs-counts census itself tripping on the moved totals). Empirical: **340 unit checks / 24 suites**. Reading the CANONICAL block:
CANONICAL flipped (340/24/60). **WP-1 RED complete.** Now **WP-2 GREEN** — first the FORM_CARD record + checkbox cure in page-layout.ts:
Now the FORM_CARD record — placing it after PROFILE_PANEL:
FORM_CARD added. Checking the page container rhythm, then converting the seven pages:
Containers are `space-y-8` ✓. Converting Events — reading the exact block boundaries:
Converting Events — the import changes first:
Now the block transformation — the Dialog block becomes the inline card placed after `</PageHeader>`:
The footer must sit INSIDE the `space-y-4` rhythm (the reference's form structure). Fixing the nesting:
The card must sit right below the trigger (after PageHeader), not at the page bottom. Moving the block:
Events done (card after PageHeader, zero Dialog refs). Surveying the remaining six pages' Dialog blocks:
The structure is uniform. Reading Exercise's block to confirm the exact shape before scripting the remaining conversions:
The `{/*` brace isn't matched. Fixing:
The JSX comment closes with `*/}` — my pattern misses the brace. Fixing:
**Found it**: under `re.VERBOSE` the spaces in `<Dialog open=...` are stripped. Dropping VERBOSE:
MentalHealth's description is multi-line. Fixing the pattern + making re-runs idempotent:
All seven converted, tsc clean. Now the F-3 mood-tile cure:
`BUTTON_CLASSES` carries `inline-flex` — the reference's tiles are block-stacked. Removing it:
Census + checkbox pins GREEN. Checking the two remaining failures are only the missing ledger rows:
Both remaining failures are only the PAD ledger rows (WP-3). Running the full unit suite for the state:
The expected 8 (docs + ledger rows only). **WP-2 cures complete.** Live-verifying the converted surfaces on the dev server before the docs ladder:
**The inline card is live at top=136 — byte-parity positioning with the reference** (its Events card also top=136), no overlay, no scroll-lock, radius 12, border 0. Verifying the full shadow + the mood tiles:
Shadow-xl is byte-identical to the reference ✓. The tiles didn't render — checking the form state:
**Tiles are byte-parity**: 173×104, 5-col grid, 12px gap, radius 16 — exactly the reference's geometry. Verifying the active state + the dark checkbox:
Active tile at 181px = 173×1.05 — the scale-105 lift, exactly the reference's measured geometry (Tailwind v4's `scale` property, hence `transform: none`). Now the dark checkbox:
**Checkbox cure verified live**: border/fill `#a3a3a3` + glyph `#0a0a0a` in dark — visible at 6.88:1/7.85:1. Verifying the unchecked state + restoring (probe hygiene):
Unchecked box now visible (neutral-400 border) ✓. Prefs restored but mode is still dark — normalizing to light:
Account normalized. **WP-3 — the docs ladder.** Starting with the PAD §11 ledger rows:
Adding the WH-21 ledger rows to PAD §11:
Both pins GREEN (8/8). Now the §8.1 rows + all count claims. Checking what claim strings the pin expects:
Now the §8.1 row recomputation in the PAD:
The gradient-ink suite has TWO tests — the infra row is 141, not 140:
The CRUD spec gained only ONE test — the crud+reset row is 19:
**Full unit suite: 340/340 (24 suites) — GREEN.** Now the AGENTS.md architecture facts + a11y bullet widening:
Now the SKILL updates — version, §8 passage, lesson 25, and the §2 record list:
Docs stay green. Now the worklog WH-21 entry (the house format — newest at top):
The worklog entry records the expected gate — now **WP-4** runs it for real (build → smoke → e2e):
3 e2e failures to debug — reading each precisely:
The (e) leg clicks "Appearance" as a button but it's a `role=tab` (and the default anyway). Fixing, then debugging (f) and the CRUD flow:
The CRUD mood flow passes now (the earlier failure was the stale-locator timing). The (f) leg's `transform` read is wrong — Tailwind v4's `scale-105` uses the `scale` property, not `transform`:
The inactive-border assertion fails. Debugging live on the dev server:
The dev-server read shows the hover arm winning (`dark:hover:border-neutral-600`). Checking what the e2e actually read:
`rgb(64,64,64)` is a transition midpoint (neutral-600→700 at t≈0.41) — the tile was hovered and the read caught the un-hover transition mid-flight (my own round's settle doctrine, applied to the pointer). Fixing: park the pointer + settle before the read:
Parked pointer + settle still reads `#404040` steadily — that's not a transition, it's the actual computed value. Checking whether `neutral-700` is v3-pinned or riding Tailwind v4's default:
Our `@theme` deliberately pins `neutral-700: #404040` (an earlier round's pin) — the computed `rgb(64,64,64)` is CORRECT. My assertion expected the v3 default. Fixing:
All three legs pass. Full e2e suite:
CRUD passes 12/12 alone — the failure is order-dependent (a11y runs first). Reproducing with just those two specs:
The strict violation: the a11y dark-toast leg saves an "Amazing" mood entry (to fire the toast) and nobody deletes it — the later CRUD mood flow then matches two "Amazing" buttons. Checking why the baseline never hit this:
The a11y toast leg saves an "Amazing" entry and never deletes it (probe residue — the WH-16 db-hygiene lesson); the worker scheduling shift exposed it. Fixing both sides — the toast leg cleans up, and the Amazing clicks go exact:
**E2E 60/60 — FULLY GREEN.** Completing the gate (census + audit):
**WP-4 complete — the full gate green.** Now **WP-5 captures**. Reading the WH-20 capture script to adapt:
Writing the WH-21 capture script:
24 byte-stable + 2 NEW + **1 MOVER: 23-dark-404** (same route name as committed — unexpected). Investigating: re-taking it twice to check for nondeterminism:
Deterministic — the 404 genuinely moved. Extracting the committed version for a pixel diff:
140 pixels in a tiny 19×12 text box — cropping both regions to see what changed:
Sub-pixel AA differences only (1px glyph-run widths) — no content change. Asking the DOM what text lives at those coordinates:
The diff is sub-pixel AA inside the unchanged `wh20-no-such-route` span (same text, same color, same geometry, runs match within 1px) — the changed stylesheet bundle re-flowed the fractional glyph positions. The acceptable-mover class: root-caused, ledger re-based. Verifying the two NEW captures programmatically, then updating the ledger:
26's card band is 81.7% white ✓. The Events button is violet→purple (not blue) — refining both checks:
Both captures verified (the white inline card + the violet/purple Events family; the dark form with blue→cyan tile content). Updating the md5 ledger for all 27 files:
Ledger updated. Now updating the worklog entry with the capture record (the entry needs the captures passage):
Now the plan's execution record:
Now session_39.md — the session transcript:
session_39.md written. **WP-7** — final verification, then commit + push. Running the full unit suite once more as insurance (docs changed since):
Staging (excluding the scratch scripts) and committing:
Commit `156c733` created. Now the SSH-wrapper push — reading the runbook procedure:
`ssh` exists — no shim needed. Writing the key, dry-run, then push:
No ssh binary after all — deploying the Appendix A paramiko shim:
The dry-run reports non-fast-forward — the remote moved ahead. Checking:
Remote is at `20dbd25` — our parent, so the push IS a fast-forward. The error looks odd — full dry-run output:
The wrapper defaulted to the CRM-era `task-management` remote — it needs `--remote` for wellness-hub:

I'll continue from where the session stopped — the WH-21 commit `156c733` was created and the push failed because the SSH wrapper defaulted to the wrong remote. Let me first verify the current workspace state.
Confirmed: `session_39.md` and the WH-21 plan are missing from the remote — the round must be fully rebuilt. Let me rebuild context from the docs.
The worklog's giant single-line entries exceed the read limits — the key facts are already in the session log from the user's message. Let me set up the environment first, then dig into the codebase files I need to rebuild WH-21.
Deps installed. Now let me read the key test files to understand the census structure and CANONICAL block.
Now I understand the CANONICAL/docs-counts structure. Let me read the core layout library and the pages to convert.
I now have the full page-layout.ts picture. Let me read the Events page and the dialog component to map the conversion surface.
The Events page structure is clear. Let me now read the MentalHealth page (mood chips + form), the dialog component, and the remaining pages' Dialog blocks.
The mood chips are at lines 196-217. Now let me read the interaction-contrast pin, the src-census WH-20 tail, and the e2e specs.
Now let me survey the Dialog consumers across all pages, the Profile checkbox sites, and the routines/mobile-nav Dialog usage.
All Dialog exports keep consumers via routines + app-shell + mobile-nav — no retirement needed. Now the Profile checkboxes and the remaining pages' form structure.
The (e) leg picture is clear: dark flip on the default Appearance tab, then the Preferences tab for checkboxes. Let me check the API families for mood-entry cleanup, then read the PAD §8.1/§11 and SKILL doc structure.
Let me read the preset-contrast pin (the model for the gradient-ink suite) and the PAD §11 ledger.
Now let me check the globals.css token set and @theme palette pins — the FORM_CARD record needs `bg-card`/`text-card-foreground` tokens.
The `bg-card` token doesn't exist — our FORM_CARD must ride `bg-surface`/`text-ink`. Now a critical geometry question: whether removing `inline-flex` from BUTTON_CLASSES moves icon buttons elsewhere. Let me check Tailwind v4's preflight svg handling.
Confirmed: v4 preflight sets `svg { display: block }` — so removing `inline-flex` from the shared BUTTON_CLASSES would shift every icon button (breaking byte-stable captures). The mood tile must be a self-contained class string instead. Let me now read the remaining pages' Dialog blocks.
I have the full picture now. Before writing the plan, let me run the standing reference watch (the house convention — the reference may have redeployed since the lost session). First, check the agent-browser tooling.
Logged in. Now the CSS-hash watch (round 9 — the redeployment signal):
**CSS hash UNCHANGED** (`index-heGLHP2e.css`) — watch round 9, no redeployment. All the lost session's probe findings hold. Now verifying the round's core finding live — the inline-card modality on Events:
Card anatomy fully decoded — footer = `flex justify-end gap-3` inside the `space-y-4`. Now the mood-tile anatomy on MentalHealth:
Tile anatomy fully decoded. Now the two confirmation probes — the Routines modal (the exception) and the reference's Profile Preferences (the checkbox superset):
The modality split confirmed. Final probe — the reference's Profile Preferences (the checkbox superset):
**REFERENCE PROBE COMPLETE — every round-critical fact re-verified live** (CSS hash unchanged r9, inline-card anatomy, mood tiles, Routines modal split, zero reference checkboxes; zero probe-hygiene events). Now let me verify the environment contract and the baseline gate before writing the plan.
The fresh clone needs `.env` + db setup. Let me set that up and run the baseline gate:
Unit baseline green (335/335, 23 suites). Now the build + smoke + e2e baseline:
The known browser-build mismatch (documented in WH-20's log). Installing:
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 335/335 (23 suites) · build OK · smoke 14/14 · e2e 57/57 · census MATCH. Let me check the house plan format, then write the WH-21 plan:
I have the plan format. Let me compute the gradient-ink table (the F-4 ledger numbers) before writing the plan:
The table is computed — all 16 fixed-gradient pairs fail AA (goals 1.92 worst), and the checkbox numbers match the session log exactly (17.93/6.88/7.85). Now writing the WH-21 plan:
Now **WP-1 RED** — the form-modality census appended to src-census.test.ts:
**RED verified — 14 deterministic failures (2×7), exactly the audit's inventory.** Now the interaction-contrast extensions. First check the palette pins needed:
All pins exist. Now writing the two interaction-contrast extensions:
Both extensions RED at the exact planned causes. Now the gradient-ink suite (the new file):
Gradient-ink RED at the exact causes (missing ledger row + missing gradient). Now the e2e legs. First, the Checkbox component's rendered anatomy:
Now the CRUD spec retargets + the new modality leg:
Now the a11y spec — the (d) retarget, the afterEach mood cleanup, and the new (e)/(f) legs:
Now the CANONICAL flips in docs-counts.test.ts:
tsc clean. Now the full unit RED run:
**WP-1 RED verified** — the 5 new tests fail at the audit's exact causes + the docs-counts lockstep trips on the moved totals. Empirical: **340 checks / 24 suites** (exactly the planned ladder). Now the e2e RED verification against the pre-cure build:
**e2e RED verified — 3 failures at the exact planned causes** (the (e) checkbox, the (f) tiles, the modality leg). **WP-1 complete.** Now **WP-2 GREEN** — first the FORM_CARD record + checkbox cure in page-layout.ts:
Now the checkbox dark cure:
Now the 7 page conversions. Events first:
Events done. Now Exercise:
I removed the Exercise dialog but haven't inserted the inline form yet. Let me check the PageHeader location and insert it:
Exercise done. Now MentalHealth — the form conversion + the mood-tile cure together:
MentalHealth done. Now the remaining four pages — let me read their Dialog blocks:
The pattern is uniform. Let me check the comment lines before each remaining Dialog block, then script the conversions:
The regex misses the closing `}` of the JSX comment. Fixing:
The title already carried its braces — double-wrapped. Fixing the four lines:
The sed ate the ternary's closing brace too. Restoring it:
All 7 converted, tsc + lint clean. Now the unit GREEN check:
The cures are GREEN — only the docs-counts + ledger-row failures remain (WP-3 work). Now the live dev-server verification:
**Inline card verified live — byte-parity with the reference** (top=136, width 960, radius 12, border 0, static, no scroll lock, zero dialog roles). Now the full shadow + footer + mood tiles:
Card anatomy fully byte-parity (shadow-xl stack identical). Now the mood tiles:
**Mood tiles verified — byte-parity** (173×104, scale 1.05 via the v4 property, active 181×109, the exact gradient stops). Now the dark checkbox:
**Checkbox cure verified live** (fill/border rgb(163,163,163), glyph rgb(10,10,10)) — but the row's bg reads as **oklab** (Tailwind v4's alpha colors), which my (e) leg's rgba-only parser would fail on. Fixing the leg to parse oklab in-page:
tsc clean. Now the unchecked-box verification + probe hygiene (restore light):
**WP-2 complete** — all cures verified live + probe hygiene clean. Now **WP-3 — the docs ladder**. First, find all the stale count sites:
Now the §8.1 rows:
Now the PAD §11 ledger rows — the modality retirement + the gradient-ink family:
PAD done. Now AGENTS.md — the form-modality architecture fact + the a11y bullet widening:
Now the SKILL updates. Let me read §8 and the §12 lessons tail:
SKILL updated. Now verify the docs lockstep with the full unit suite:
**340/340 (24 suites) — GREEN.** Now the worklog entry:
Worklog entry in. Now **WP-4 — the full gate**. Kill the dev server first (the stale-build lesson), then build + smoke + e2e:
**WP-4 GATE GREEN — e2e 60/60** (all new legs passed on the first post-cure run). Now the census + the full gate summary:
**WP-4 complete — full gate green.** Now **WP-5 — the captures**. Let me check the capture tooling:
The capture script must be rebuilt (scratch scripts aren't committed). Let me check the auth setup pattern first:
The drawer trigger's name doesn't match. Let me find it:
`removeInitScript` doesn't exist — init scripts persist per page. Restructuring: a fresh page for the post-dark-set captures:
23/25 byte-stable, 2 movers (07-events, 24-dark-exercise-rows). The house rule: root-cause before shipping. Let me diff the pixels:
24 is a tiny 7×9 glyph (the row's date "30"→"31" — the day rolled). 07 shows a violet region that vanished — likely the calendar's TODAY cell moving with the date. Let me verify:
**Both movers root-caused: the DAY ROLLED** — the calendar's violet TODAY cell advanced one column (block 8→9) and the row's date glyph "30"→"31" (7×9px). Same acceptable-mover class as the WH-20 route-name lesson (date-dependent content renders into the pixels). Now the new captures' content verification:
Both new captures verified (90.5% white card band; the gradient stops present). Re-basing the md5 ledger to 27 files:
**WP-5 complete.** Now WP-6 — the records. First the worklog tail with the actual gate/capture results:
Now the plan's execution record + session_39.md:
Now the final insurance run + WP-7. Let me check the git status and run the last verification:
All files accounted for (`.env` correctly absent — gitignored). Now the commit with the house-style message:
Commit `4ae3f65` created. Now the SSH-wrapper push — reading the runbook:
The shim works. Now the key → /tmp (0600), fingerprint check, dry-run:
Dry-run clean — fast-forward `20dbd25..4ae3f65`. The real push:
**PUSH VERIFIED — remote main @ `4ae3f65` == local HEAD.** Key shredded, tree clean.
**WH-21（form-modality 轮）已完成并推送** — commit `4ae3f65` 已在远程 main（验证 == 本地 HEAD，密钥已销毁）。

## 本轮交付摘要

**恢复点**：上一代的 commit `156c733` 因 session 中断于 push 步骤而丢失（远程停在 `20dbd25`）。本次从 fresh clone 完整重建：**所有发现均在写计划前于参考站重新实证**（CSS hash watch round 9 未变 → 无 redeployment，WH-15..20 的 parity map 全部有效）。

**核心发现（F-2，modality deviation）**：参考站的 7 个模块 create-form 是**页面流内的 inline expanding cards**（实测 Events：零 overlay、全 static 祖先、无滚动锁、top=136、shadow-xl 栈、footer `flex justify-end gap-3` 位于 `space-y-4` 内）——我们 20 轮以来一直用 512px Radix modal 交付。表单**内容**一直是 parity；**交付机制**从未被质疑过。已转换全部 7 页（新 `FORM_CARD` record；参考站的 Routines Schedule 才是 modal，与我们已有的镜像一致）。

**其余治愈**：F-1 深色 checkbox 不可见（`data-[state=checked]:` 状态臂是 hover/focus census 的盲区 → neutral-400/neutral-950 深色对）；F-3 心情选择器 40px pills（错误的 preset-themeable 模型）→ 参考站自身的 173×104 block-stacked tiles + 固定 blue→cyan 渐变；F-4 固定渐变白字家族**首次测量**（16 对全部 AA 失败，goals 1.92 最差，全部与参考站字节一致 → 按 parity doctrine 记入 ledger + pin，不治愈）。

**门禁**：lint 0/0 · tsc 0 · **340/340 (24 suites)** · build OK · smoke 14/14 · **e2e 60/60** · census MATCH。计数阶梯 335→340/23→24/57→60 精确落地；TDD RED（census 14 站点 + pin 精确成因 + e2e 3 腿）全部实证后才 GREEN。

**截图**：23/25 byte-stable；两个 mover 根因为**日期翻转**（日历的"今日"紫格移列 + 行日期字形 30→31，同 WH-20 route-name 类）+ 新增 26/27（inline form 白卡带 90.5%、深色渐变 tile）。md5 ledger 重基于 27 文件。账户规范化验证（light/Indigo Dream/rows 0）。

**文档**：五文档 lockstep + PAD §11 两行 + §8.1 三行 + AGENTS 架构事实 + SKILL v1.19.0（lesson 25："交付机制本身就是断言面 — 探测 MODALITY，而非仅内容"）+ worklog/plan 记录/session_39.md。

**建议下一轮（WH-22）**：Routines Schedule modal 的逐字段 parity 读取（唯一内容从未逐字段探测过的 modal）、参考站 redeployment 时的功能超集轮、2.4.13 AAA 决策（ledger 行继续治理）。
