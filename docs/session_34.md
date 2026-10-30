# Session 34 — the WH-19 round record (the dark-corners + preset-axis round)

The workspace carried over — `git pull c555eae → c15fe12` brought in the
operator's session_33.md transcript push. The prompt referencing session_32 +
plan18 + session_33 drives the **WH-19 round**: the surfaces OUTSIDE the
WH-18 net's walk set (lesson 22's own coda) plus the preset axis (WH-18's own
suggested next).

**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 328/328 (21 suites) ·
build OK · smoke 14/14 · e2e 50/50 · census MATCH · audit ZERO. The
documented WH-18 ship state, no flake.

**THE LIVE REFERENCE PROBE — every watch clean** (identity 11/11 via the
visible-H1 walk, the CSS hash unchanged round 6 — no redeployment, the seed
watch round 8 at 23/23, the entity-API watch round 7 at 12/13/views:0 via the
page-context bearer fetch, the drawer battery, the 404, the 12 href-less
Watch-Now placeholders, the quick actions) — with ZERO probe-hygiene events
(no flips performed on either account). Plus one new parity read: the
reference's empty z-100 toast viewport is `pointer-events: auto` across the
full-width top strip and genuinely intercepts clicks (live-caught at the
drawer trigger's upper point); OURS is the shadcn `pointer-events-none` form —
the superset, noted in the PAD §11 ledger.

**The audit found five findings + the round's deepest catch:**

1. **F-1 (HIGH) — the dark corners**: five records outside the WH-18 walk set
   shipped with the same broken class. Live-measured: the signup view's title
   **1.0:1 on the dark card** (an invisible "Create your account"), its labels
   1.73:1 ×3, LOGIN_LAYOUT.subtitle **3.77:1 on /login with axe
   FALSE-PASSING it** (the alpha card over the page gradient returns
   color-contrast incomplete — the WH-18 dark-login walk stayed green with a
   real AA failure on the page), the sent/verify views, the whole 404 as a
   full light island.
2. **F-2 (measured) — the preset axis**: ALL 8 presets fail WCAG AA for white
   ink on the brand gradient (Indigo Dream 3.96, Royal Purple 4.23, Rose Pink
   3.53, Sunset/Crimson 2.80, Ocean Blue 2.77, Forest Green 1.98, Golden
   Yellow 1.92) — the WH-18 ledger had documented only Golden Yellow.
   Reference-shared → documented not cured; the table pinned.
3. **F-3 (method)** — an axe "incomplete" is not a pass: the net gained a
   computed-contrast leg (oklab-aware, the WCAG large-text rule per element,
   both modes).
4. **F-4** — the auto-mode listener gained its walk (emulateMedia mid-flight;
   explicit choices ignore the OS).
5. **F-5 (found mid-audit)** — the 404 display heading: the reference's own
   404 ships slate-300 on slate-50 at 1.42:1 (live-probed on the reference);
   superseded per the WH-17 doctrine (slate-500/neutral-500).

**The deepest catch — the 404's hydration text mismatch.** After every pair
landed, the 404 STILL failed the .dark-class assertion. The root cause was
not a class: usePathname on the SERVER for an unmatched route returns Next's
internal `"_not-found"` — the SSR rendered the meaningless internal route
name while the client rendered the real path → React #418 → the whole-tree
client regeneration → the patch **DELETED applyTheme's pre-hydration writes
off `<html>`** (the .dark class, the preset style block, the data attrs).
Caught live through a five-step evidence chain: a module-eval marker (the
store DOES evaluate on the 404), an applyTheme counter (it RUNS with
themeMode dark), a MutationObserver (the writes land at t≈150; something
deletes them at t≈200), the console (React #418), and the SSR HTML (the
"_not-found" span). A pre-hydration write that survives hydration on TEN
pages was deleted on the eleventh — the mismatch is per-PAGE, and the page
nobody walked was the one that broke the theme. **Cured by the isClient
guard** (useSyncExternalStore's server snapshot — the React-blessed
client-only pattern).

**The TDD sequence:** the dark-pair completeness census (the arm-level rule —
every chromatic arm of the five records carries its dark twin, no exemptions)
+ the preset-axis arithmetic pin + the e2e widening + the CANONICAL flips
(328→330, 21→22, 50→53). RED verified — including the stash-isolation
experiment for the e2e (the cures stashed, the tree rebuilt, the walks run
pre-cure: the dark corners + the light leg failed with the audit's
inventory). GREEN: the 76 arms paired, the isClient guard, the F-5 superset,
+8 v3 pins (121=121), the record pins updated, one documented console-ignore
entry (the expected 404-status network message).

**The captures — with two probe-hygiene events caught and cured live** (both
mine): the audit's dark-mode flip had left the account's server prefs dark —
the first capture run's whole "light" set rendered DARK (96% pixel movement,
caught by the mover analysis); and the preset walk had ended on Golden Yellow
(each click PUTs) — the second run's brand family rendered the wrong preset.
The capture script gained the full normalization step (Light + Indigo Dream,
both verified via /api/prefs, BEFORE any capture fires). Final state: 19/20
byte-stable + the intended mover (20-dark-login — the login family's dark
pairs) + the NEW dark-corner set 21-23, each verified carrying the .dark
class, the 404's span rendering the REAL path.

**Gate:** lint 0 · tsc 0 · **330/330 (22 suites)** · smoke 14/14 · **e2e
53/53** · census MATCH · audit 0. docs-counts GREEN 10/10. All five docs +
worklog + this record lockstepped; SKILL v1.17.0 with §12 lesson 23 ("the
net walks what it knows — the walk set is a surface of its own; and an axe
incomplete is not a pass").

**Suggested next:** the interaction states under the computed-contrast
doctrine (focus-visible rings in dark, the dialog-over-gradient surfaces), or
the functional-superset round when the reference next redeploys (the CSS-hash
watch will catch it — round 6 clean today).
