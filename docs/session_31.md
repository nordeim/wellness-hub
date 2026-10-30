I'll continue the multi-generation remediation task. This generation references `session_28.md` + `session_29.md` + `session16-remediation-plan.md`. Let me set up my task plan and start.
工作区已存在。我来刷新它并检查状态。
Pull brought in `docs/session_29.md` (the new generation doc). Let me check the docs structure and read the core documents.
`2026-10-30-session16-remediation-plan.md` exists — confirming generation (28,29)+plan16. Let me read the session docs and plan.
Now let me read the session16 remediation plan (this generation's plan) and the worklog's most recent entries.
The plan16 was fully executed (WH-16 round). The current prompt references session_28 + plan16 + session_29 — this is the **WH-17 round**. Let me mark progress and read the core docs.
Now the README and the architecture document.
The PAD is large — let me read it via the persisted output in key sections.
Now the SKILL doc — let me check its structure and read the key sections.
Now let me check the worklog's latest entry (WH-16) to understand the current state.
Docs internalized. This is the **WH-17 round**. Let me validate the environment state and understanding against the codebase.
Environment intact. Now the baseline gate — fast signals first.
Fast signals green: lint 0/0 · tsc 0 · **325/325 (21 suites)**. Now the heavy gate items: build → smoke → e2e.
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 325/325 · build OK · smoke 14/14 · e2e 43/43 · census MATCH · audit ZERO. Now the live reference probe with agent-browser.
Logged in. Per the probe-protocol amendment, the first check is the account's current preset state (the WH-16 lesson) — probing the brand family + the main H1 gradients.
Preset state CLEAN — brand family at default indigo→purple (#6366f1→#a855f7), no residue. Now the full 11-page H1 identity walk.
All 11 H1 identities byte-identical to the WH-15 map. Now the compiled-CSS asset-hash watch (round 4) and the seed-content watch.
CSS hash UNCHANGED (index-heGLHP2e, 89,409 bytes) — no redeployment. Now seed-content watch round 6.
11 template names captured. Now tutorial titles from /Learning, then compare against our seed.
Now verify the 23 seed names against our own seeded db byte-for-byte.
Seed watch round 6: 23/23 byte-for-byte. Now the entity-API shape watch round 5 via network capture.
Direct fetch fails (needs platform auth). Let me use agent-browser's network capture capability.
Entity-API watch round 5: 12 rows/13 keys/views:0 — holds. Now the mobile drawer battery at 390×844.
The sonner-overlay interception (documented quirk). Using JS dispatch as previous rounds did.
Drawer: 11 items, body:hidden/html:visible (the documented ineffective lock). Now the stays-open-after-nav quirk.
Stays-open quirk holds. Now Watch-Now placeholders + 404 + quick actions.
404 + quick actions + Watch-Now placeholders all unchanged. Quick login-surface check with a fresh session.
**REFERENCE PROBE COMPLETE — EVERY WATCH CLEAN** (no redeployment; identity map, seeds, API shape, drawer, 404, placeholders, quick actions, login all byte-stable; preset hygiene clean). This round's findings will be codebase-side. Now the audit — starting with the recent WH-16 changes and the skills catalog.
Let me read the web-application skill (per the prompt) and check the standing audit classes.
The web-application skill §2 names the exact gap the worklog suggested: **"A11y | axe-core (Playwright) | A11y assertions in the e2e suite, not just manual review"**. The README claims an accessibility superset but no test pins it. Let me first complete the standing audit sweep, then investigate the a11y surface.
WH-16 changes are clean. Now the standing audit classes — Tailwind pins, SEO family, configs.
All standing classes clean. Now the deeper audit — the a11y surface. First, what the docs claim vs what the tests pin.
The docs claim contrast/focus/touch-target guarantees with zero assertion layer — the exact WH-16 pattern ("a surface the gate never reads"). Let me probe the running app for real a11y violations first.
Viewport was still mobile. Note: heading-skip 1→3 also exists on the reference (parity-shared). Let me run a real axe audit — installing @axe-core/playwright to get the true violation inventory.
Real WCAG 2.1 AA violations found. Let me get the exact details per class.
Detailed inventory in hand. The critical parity question: does the **reference** carry these same violations? Let me probe its chips and tabs.
The reference's chips use **green-700/green-100** — ours use **emerald-600/emerald-50**. That's a parity divergence AND an a11y violation. Let me check the reference's Learning chips and compute exact ratios.
Major finding — the reference's Learning chips are **blue-700/purple-700/emerald-700/pink-700 on -100 tints** while ours use amber-600/emerald-600 on -50. Let me inspect our constants and compute the contrast ratios.
The chip vocabulary may be a **pre-redesign capture** (WH-15 probed H1s/buttons/washes but not chips). Let me compute contrast ratios and systematically compare all chip surfaces on both apps.
**The smoking gun**: the reference's chips ALL pass AA (4.57–5.92:1) while ours ALL FAIL (3.07–4.48:1) — our chip vocabulary is a stale pre-redesign capture. Fixing parity fixes a11y. Let me map every chip surface on both apps.
The reference's chips are `bg-blue-100 text-blue-700` (Badge primitive) and difficulty is plain `text-foreground`. Let me extract the complete chip maps from every reference page.
The reference's chip map is completely different: `-100/-700` tints, `rounded-md`, `font-semibold` — and Learning difficulty is untinted. Let me check the reference's Goals badges, Profile tabs, and the remaining chip surfaces.
The reference's Goals shows an empty-state for badges — our 8-badge catalog is a **superset surface** (no parity constraint on its colors). Now the reference's Profile tabs.
More parity findings: the reference's active theme chip is **near-black on indigo-50** (ours: indigo-500 on primary/10). Let me check the reference's "Active" status text and our Profile component.
The inactive tabs are parity-identical (both apps fail AA there — reference-shared). The theme chip is a true divergence. Let me find our appearance-section component.
The reference's Theme Mode picker is a different **anatomy** entirely (border-2 cards, flex-col). Let me dump the full reference Appearance panel structure.
Same section inventory, different anatomy. Let me dump the reference's full Appearance structure for precise comparison.
Let me check the reference's inactive tab trigger class to complete the parity picture.
The parity on the tab strip is deliberate and component-narrated. Now let me run axe against the REFERENCE itself to establish the reference-shared vs ours-only split definitively.
**Definitive evidence**: the reference's own tab strip fails AA (parity-shared), but its chips pass while ours fail (ours-only divergence). Let me map where OUR chips render and check the mobile viewport + login surface.
Let me complete the violation inventory: our login page + mobile viewport.
One new surface: the open drawer has a color-contrast violation. Let me identify it.
Reference uses `text-gray-500` (passes); ours uses `text-subtle` gray-400 (fails) — another ours-only divergence. Let me check our sidebar/mobile-nav components.
Desktop divergence confirmed too. Let me re-verify why the desktop axe walk missed it.
The gradient wash makes desktop sidebar checks "incomplete" (axe limitation) — the mobile drawer (solid bg) is the assertion surface. The audit inventory is complete. Let me verify the remaining source sites.
All sources identified. Let me enumerate the full vocabulary set in constants.ts to scope the fix.
Let me probe the reference chip's computed geometry (radius/border/shadow) and hover behavior to define the exact parity target.
The audit picture is nearly complete. One more probe — the reference's active preset card state (our "Active" label is a superset that fails AA).
Let me examine the tabs track classes and the token system to scope the tab-strip fix.
The design is clear. Let me check what existing tests pin the chip vocabularies/anatomy and the docs-counts structure before writing the plan.
The fix maps cleanly to our `text-muted` token (exact parity with the reference's gray-500). Let me verify bun audit stays zero with the new devDep.
Let me scope the Profile panels' shell anatomy vs the reference's Card primitive — checking our SECTION_CARD record and the profile page structure.
The Profile panels carry pre-redesign shells (border+p-5) while other pages use the redesign form. Let me verify the reference's panel shell pattern is uniform.
Let me read the rest of the profile page and capture the reference's panel header icons for the complete fix spec.
The audit is complete. Now writing the WH-17 remediation plan.
Plan written. Now validating it against the codebase — first the e2e storageState pattern and docs-counts sites.
The docs-counts structure is clear (e2eSpecs 5→6 too). Now let me check the palette pin block for the pairs the migration needs.
The reference's purple-700 probed as #7e22ce (v4 value, not v3). Let me check the reference's compiled CSS directly for the authoritative values.
The reference's compiled sheet is the oracle. Let me extract all needed chip pairs byte-exact.
All reference values verified as v3 (purple-700 #7e22ce IS v3 — I misremembered). The plan validates. Now **WP-1 (RED)** — first, the src-census header to match house style.
Now writing the WP-1 RED artifacts — the chip-vocabulary census check first.
The `require()` approach is wrong for this ESM test file. Let me fix with a proper static import like the other tests use.
Now the e2e a11y net spec.
Now the CANONICAL flips in docs-counts.
**RED verified** — exactly the census check + the 6 ladder carriers. Now verify the a11y net RED against the current tree.
**A11y net RED verified with exactly the audit's inventory.** Now **WP-2 (GREEN)** — the cures. First: the OptionChip anatomy.
Now the 13 vocabularies in constants.ts.
One error: TEMPLATE_DIFFICULTIES.easy must be **green** (the reference's verified map), not emerald. Fixing.
Two expected issues: `TEMPLATE_DIFFICULTIES` is module-private (use its accessor), and the migration orphaned some `-600` pins. Let me see the full lists.
Pin surgery lists in hand: retire 3 orphans, add 16 new pins (+neutral-600 for the tabs fix coming). Let me view the pin block.
Now the pin surgery in globals.css — retire 3 orphans, add 17 new pins, update the block narration.
107 pins, not 109 — let me run the census to get the authoritative count.
Expected: neutral-600 awaits the tabs fix. Now fix the census's private-vocabulary import (use the accessor).
Now the remaining cures — (d) Watch-Now labels, (e) Goals text, (f) subtitles, (g) tabs track.
Now the Profile panels rework — reading the full file first.
E2E-compatible. Now the Profile rework — first the records in page-layout.ts.
Now rework the profile page panels to consume the records.
Fast signals green — census 20/20. Full unit suite now.
The 6 failures are exactly the docs-ladder carriers (WP-3's scope). Now rebuild and verify the a11y net GREEN.
One straggler: the Typography preview line (text-muted on line-soft). Fixing.
**A11Y NET GREEN — all checks pass.** Now a visual sanity check of the reworked surfaces against the reference.
Panels match the reference exactly (moon/palette/type/image/sparkles icons). Now the chips.
**Chips byte-identical to the reference.** WP-2 complete. Now **WP-3** — the count ladder + docs. Let me enumerate all sites.
All sites enumerated. Updating README first.
Now the PAD — §8.1 rows, totals, checklist, and the known-issues entry.
Now the SKILL doc — frontmatter, §2, §8 rewrite, §11, §12 lesson 21.
The row-count pin needs its literal flipped (5→6 e2e rows). Let me see and update the check.
**326/326 GREEN.** Now **WP-4** — the full gate in order.
**FULL GATE GREEN — 46/46 e2e.** Now **WP-5** — the captures via the house agent-browser procedure.
7 movers, 9 stable. Two deviations from prediction to root-cause: 02 stable (subtitle expected to move it) and 14 moved (unexpected). Let me diff.
02's subtitle sliver is below the glyph fold — byte-stable is legitimate. Now re-take 14 with a verified mouse park.
14 is deterministic raster noise (21px, Δ≤7 — the documented WH-16 artifact class). Let me verify 15/16's diff regions are the subtitle.
The drawer subtitle computes #3f3f46 — unexpected. Let me check the MOBILE_NAV_SHEET record.
The subtitle fix is live and correct. All movers root-caused. Now verify capture health + cleanup.
All healthy. Now **WP-6** — the worklog entry, the plan's execution record, and session_30.md.
Now the session_30.md transcript.
Now **WP-7** — final verification, commit, and push.
Committed. Now the SSH-wrapper push — reading the runbook first.
The shim survives. Writing the key outside the repo, then dry-run.
**Push verified — remote main @ `64c8eaa` == local HEAD, key shredded, tree clean.**
**WH-17 (the a11y-assertion round) complete and pushed to `main @ 64c8eaa`.**

**What the round found and shipped:**

1. **Reference probe — every watch clean** (second consecutive no-redeployment round): H1 identity 11/11, CSS hash unchanged, seed 23/23, entity API 12/13/views:0, drawer battery, 404, placeholders — and the preset-hygiene check read **clean at probe start for the first time** (the WH-16 protocol amendment working).

2. **The round's core finding (F-1, HIGH)**: our entire chip vocabulary was a stale build-era capture — the reference's redesign moved its chips to the Badge anatomy with `-100/-700` pairs (all AA-passing) while ours rode `-50/-600` (every rendered chip failed WCAG AA at 3.07–3.58:1), invisible to green gates AND pixel captures because captures pin *our* pages. Re-captured as maps: three family-level changes decoded (Routines easy=green/moderate=yellow; Learning categories blue/pink/emerald/green/purple/orange; difficulties untinted) — now **computed byte-identical to the reference**.

3. **The Profile parity completion (F-2)**: all 8 appearance panels migrated to the reference's Card anatomy (border-2 theme-mode cards, preset cards, gradient preview tile, moon/palette/type/image/sparkles headers), plus the Watch-Now label-in-name cure, the Goals/subtitle/tabs contrast fixes (the tab strip as the documented accessible superset — the reference fails AA there too, axe-verified on it).

4. **The systemic net (F-7)**: a new e2e a11y net — axe-core at WCAG 2.1 A+AA over every module route + the open drawer + login, **strict zero** (deterministic RED: 57 violation nodes pre-cure) — the third assertion surface after the DOM and the console. `@axe-core/playwright` returned as a devDep with its live import; audit stays ZERO.

**Gate:** lint 0 · tsc 0 · **326/326** unit · smoke 14/14 · **e2e 46/46**. **Captures:** 7 movers all root-caused, 9 stable. SKILL v1.15.0 with lesson 21; all five docs + worklog + `session_30.md` lockstepped.

**Suggested next:** widen the net to WCAG 2.2 tags, or the functional-superset round when the reference next redeploys.
