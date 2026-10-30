The workspace carried over — `git pull 8baaef1 → 603d145` brought in the operator's session_27.md transcript push. This prompt references session_26 + plan15 + session_27 → the **WH-16 round**. Reading the five companion docs in full, then the session/plan/worklog set.

All docs internalized. The environment survived intact: `.env` with the correct relative `DATABASE_URL`, the seeded `db/`, the Playwright browsers — and the dev server itself still alive from the prior session. Now the baseline gate, fast signals first:

Fast signals GREEN: lint 0/0 · tsc 0 · **324/324 (21 suites)**. The heavy items:

**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · **324/324** · build OK · smoke 14/14 · e2e 42/42 · census MATCH · audit ZERO. The documented WH-15 ship state is the live state. Now the live reference probe:

Reference login loads. The form fields are in the documented pattern — logging in:

Logged in. The first H1 probe reads `sky-500→cyan-500` on the brand family — **Ocean Blue colors on a "clean" account**. Probing deeper before concluding drift: the main "Welcome Back!" H1 holds the documented indigo→purple→pink stops while the sidebar wordmark reads sky/cyan.

The split is EXACTLY the WH-15 theming model (module pairs fixed, brand family preset-themeable) — which means the account is carrying a saved PRESET, not a redesign. **WH-15's Ocean Blue probe Saved and its revert never did.** Curing the residue: Indigo Dream + Save All Changes, computed-verifying the brand back at #6366f1→#a855f7. This is F-4 — the probe-hygiene lesson (read the account's preset FIRST; verify reverts SAVE).

Now the full page walk. The SPA ignores pushState — real navigations per route, probing the VISIBLE main H1's computed gradient on all 11 pages:

All 11 titles + gradient stops byte-identical to the WH-15 identity map. The watches: the compiled-CSS watch round 3 (**hash UNCHANGED** — index-heGLHP2e.css, 89,409 bytes; no redeployment), the seed-content watch round 5 (11 template names + 12 tutorial titles — **23/23 byte-for-byte**), the entity-API watch round 4 via HAR (the platform-path fetch; **12 rows, 13 keys, views:0 on all** — the parity-keep evidence holds).

The drawer battery at 390×844: opens with 11 items, the stays-open-after-nav quirk holds at /Exercise, and the scroll-lock nuance re-verified — the reference sets `body{overflow:hidden}` while its `html` scroller still scrolls (the lock is ineffective; our working lock stays the e2e-pinned superset). The Watch-Now placeholders still href-less buttons, the 404 unchanged, the quick actions unchanged, the login slate surfaces matching on both apps.

**The reference probe: EVERY WATCH CLEAN.** No redeployment, no new surfaces. This round's findings will be codebase-side.

Now the codebase audit — starting with the schema↔model field precision (a documented uncensused boundary):

The zod↔prisma walk: 9 owned models, every create/update schema field maps 1:1 to its column. Clean.

The compiled-CSS class census dry-run (the WH-15 `bg-card` phantom class's detection method): 1,010 static class tokens across src/** — every one compiles to a utility. Clean. (The script's first run reported everything missing — its escape function was escaping hyphens, which compiled CSS keeps literal. Fixed, then clean.)

Now the console — a surface the gate has never read. Checking the running clone:

The console buffer shows three error/warning classes: a `cdn.tailwindcss.com` warning (the REFERENCE's own — base44 loads the Tailwind Play CDN; no such script loads on our pages, script-src verified), a Radix `DialogContent requires a DialogTitle` error (also the reference's — its own drawer; all OUR dialogs carry 1:1:1 Content/Title/Description, statically verified), and — the real one — **a React 19 hydration mismatch with the full diff tree naming OUR theme store's exact four client-only `<html>` attributes**: the style custom-property block, data-card-style, data-animation, data-sidebar-style.

The buffer accumulates (console clear doesn't), so isolating per-page with fresh Playwright contexts — cold, warm, stored-preset, 8×-CPU-throttled, dev AND production standalone builds:

Every fresh-context pass is CLEAN — the mismatch fired exactly once, on the cold-compile /learning load in agent-browser (module-eval won the race against hydration). The mechanism: the theme store's `onRehydrateStorage → applyTheme` runs at store-module init (app-shell imports it on every route) and writes the attributes onto `<html>` before hydration. React "won't patch up" the diff but keeps the client attributes (the theme renders — `dark:true`, the dataset attrs, and the style block all verified live post-load). **F-1: a real, timing-window hydration error with the canonical one-attribute cure — `suppressHydrationWarning` (the next-themes pattern).**

The twin: `applyTheme`'s bgImageUrl branch materializes a client-only style attribute on `<main>` when a background image is persisted — **F-2, the same class one element down.**

And the systemic gap: no test anywhere reads the console — which is exactly how F-1 shipped through fifteen green rounds. **F-3: the e2e console-hygiene net.** The remaining audit classes (bare-fetch sweep, Tailwind pins, SEO family, env contract) all clean. Writing the remediation plan:

Plan landed and validated against the tree (the element locations, the census structure, the 13 unit-ladder sites, the e2e sites, the §8.1 rows). Now **WP-1 (RED)** — the hydration-suppression census check + both CANONICAL flips:

**RED verified** — exactly the census check + the 6 ladder carriers. Now **WP-2 (GREEN)**: the `suppressHydrationWarning` attributes with their why-comments on `<html>` and `<main>`, and the console-hygiene net in shell.spec.ts (collectors before the walk, all 11 capitalized routes, strict zero, the offender list in the failure message). Census GREEN 19/19, tsc 0 first run.

**WP-3** — the ladder and the five docs: 324→325 at all 13 unit sites, 42→43 at every e2e site, §8.1's infra row 127 (109+89+127=325) and shell row 7, SKILL lesson 20 + lesson 19's probe-preset coda, v1.13.0→v1.14.0. docs-counts GREEN 10/10; full unit suite **325/325 (21 suites)**.

**WP-4** — the full gate. The first e2e run trips on a port conflict: the round's own production probe left a standalone server on the pinned e2e port — killed it, re-ran. **FULL GATE GREEN: lint 0/0 · tsc 0 · 325/325 · build OK · smoke 14/14 · e2e 43/43** — the console-hygiene net green as check 43.

**WP-5** — the captures. First attempt: 14 of 16 "move" — investigating before narrating. The pixel diff exposes the scratch script's own two bugs: the desktop set was shot at 1280×800 (the house convention is 1280×900 — all 12 desktop movers are the script, not the app), and the mobile movers are hover states — the login click parks the cursor on stat tile 3, whose `group-hover` wash (opacity 5→10%) tints the capture; the drawer link under the cursor gains its hover tint. The fix: park the mouse on the neutral header edge after login + a real trigger click for the drawer battery.

Re-taken with the house procedure: **14/16 byte-stable** — the prediction's core (the cure renders zero pixels) proven by every desktop page + the login surfaces. The two remaining movers root-caused: 14-mobile-dashboard differs by 21 scattered pixels at Δ≤10, all at tile 4's rounded-corner anti-aliasing edges — deterministic within this session (an md5-identical re-run), so raster-level noise vs the WH-15 moment; and 16's trigger focus ring — the trigger IS focused in both captures (activeElement verified), the ring's visibility being Chromium's focus-visible heuristic outcome of the two scripts' different interaction paths. The behavior itself is e2e-pinned. The drawer auto-close proof held (the post-nav dialog unmounted at /Exercise).

**WP-6** — the worklog entry, the plan's execution record, this transcript. The scratch probe/capture scripts removed before the commit.

**WP-7** — staging the tree (no .env/db/keys/scratch), the commit, and the SSH-wrapper push (the paramiko shim, key outside the repo, dry-run then push, remote verified, key shredded).

**WH-16 complete and pushed to `main`.**

The round's defining finding: the **console** — a surface every gate assertion was blind to. The theme store's pre-hydration `<html>` writes produce a React 19 hydration-mismatch error on a real timing window (caught once in ~50 loads, never in the deterministic probes — "it doesn't reproduce" is a property of the harness, not of the bug). The cure is the canonical next-themes attribute on the two written elements; the net is the new e2e check that walks every module route asserting zero console errors/warnings — so the NEXT error class of this kind cannot ship invisibly. Plus the probe-hygiene catch: WH-15's Ocean Blue preset had been sitting saved on the reference account for a whole round.

**Gate:** lint 0 · tsc 0 · **325/325** unit · smoke 14/14 · **e2e 43/43** · audit 0. **Captures:** 14/16 byte-stable (the two movers root-caused as interaction/raster artifacts). All five docs + worklog + `session_28.md` lockstepped; SKILL v1.14.0.
