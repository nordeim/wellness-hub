// The committed WATCH + COMPUTED SPOT-CHECK companion (WH-33, F-1 — the
// standing AGENTS note's own cure: "while the platform keeps the CDN, a
// runtime-compiled Tailwind can drift computed values WITHOUT a bundle
// hash change"). Until now the watch was a hand-driven probe — 15+ evals
// per round, living only in the session agent's head; the WH-29
// capture-round lesson applies verbatim: a procedure that is not a
// committed script is "not reconstructible without the original script".
// Two consecutive JS-bundle changes (rounds 20 + 21) confirmed the
// reference's active development cadence — the watch runs EVERY round
// now, and it must stay a one-command procedure.
//
//   node scripts/watch-round.mjs
//
// PASS 1 (logged out — no login): the ASSET WATCH — the compiled-CSS
//   form (`index-*.css`, either `/static/` or `/assets/` path shape),
//   the JS bundle, the `cdn.tailwindcss.com` Play-CDN pipeline, the
//   `/api/frontend-config.js` config script, and the login family's
//   standing geometry. The watch is INFORMATIONAL: a moved asset is the
//   signal to run the full lesson-30 walk, never a failure by itself.
// PASS 2 (ONE login — the demo credentials; the reference rate-limits
//   logins per IP, so exactly one per run): the COMPUTED SPOT-CHECK —
//   the canonical surface set probed computed-style and compared
//   against the LEDGER below. This is the CDN companion proper: it runs
//   EVERY round regardless of hash stability, because the runtime
//   compiler can move computed values without touching any bundle.
//
// ZERO-WRITE doctrine (enforced): the script navigates, opens
// read-only dialogs (the Schedule modal via Use This Template) and
// read-only inline forms (Add Resource — opened, never submitted), and
// never submits a create form anywhere on the reference.
//
// Output: a per-surface MATCH/DRIFT report. Exit 0 when every
// spot-check matches; exit 1 on any DRIFT or PROBE-ERROR — a drift is
// a FINDING for the round's plan (investigate, cure if it is a real
// parity gap, then re-base the LEDGER in the same commit — the
// md5-ledger doctrine).
//
// LEDGER PROVENANCE: every member below was probed live on the
// reference's round-21 build (2026-11-01, WH-33 — the JS bundle
// index-DT3tkBuH.js, the CSS content hash index-BHjkUcdg.css stable
// since round 20). The run itself is the ledger's verification: on the
// first run after any ledger edit, a mismatch is either a real drift
// (a finding) or a wrong member (fix the member before committing).
// WH-34, F-1 — the doctrine's own amendment: a ledger edit must
// birth-verify BOTH outcomes, the firing state AND the quiet state.
// The WH-33 re-base (the js asset's basename form) shipped without a
// PASS-1 re-run against the stable read; round 23 then fired a
// false-positive MOVED on an unchanged hash — the exact class the
// "the run itself is the ledger's verification" rule exists to catch,
// missed because the re-run only exercised the DRIFT branch.

import { chromium } from "@playwright/test";

const BASE = "https://evolve-well-d6cec85d.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

/** The canonical ledger — round-28 form (WH-39: the DOUBLE move —
 *  the CSS content hash changed for the SECOND TIME in two rounds
 *  (/static/index--nhcow2j.css -> /static/index-CMHVFeas.css) AND the
 *  js bundle moved again (/static/index-CaQQhuPL.js ->
 *  /static/index-NVr-T2eL.js, the EIGHTH distinct bundle) — the
 *  round-20/27 class (a stylesheet CONTENT change, the rarest signal,
 *  now twice in two rounds: the active-development cadence is the
 *  standing state). The same-run PASS-2 digest read 15/15 MATCH on
 *  the new assets, and the round's parity battery — the widened
 *  battery's first full run: login 34/34 (fourth), moodForm 20/20
 *  (fifth), shell 61/61 (third), dashboard 105/105 (third) — verified
 *  the rendered face byte-held through the css content move BEFORE
 *  the round's own FIFTH SURFACE parity-headers 192/192 (born this
 *  round, the PAGE_THEMES identity family) widened the net again). */
const LEDGER = {
  // The watch (informational — reported, never fails the run).
  // FORM CONTRACT (WH-34, F-1): both asset entries carry the probe's
  // RETURN form — the FULL PATH. The WH-33 re-base wrote jsBundle as the
  // bare basename while the probe returns "/static/index-*.js", so the js
  // comparison could NEVER read stable and PASS 1 fired a false-positive
  // MOVED on every quiet round (round 23 proved it live: both content
  // hashes unchanged, the js axis still read "run the full lesson-30
  // walk"). An informational signal that always fires is a signal that
  // gets ignored — the entry is jsPath now, form-matched to cssPath.
  // WH-43 re-base (round 32: the FIFTH css CONTENT change
  // /static/index-DsYCKxwV.css -> /static/index-CapATpwD.css — the
  // css content axis moved for the THIRD consecutive round; the same-
  // run digest read 15/15 MATCH on the new assets, and the round's
  // standing battery — the FIFTH full-width run, all EIGHT legs green
  // (login 34/34 + moodForm 20/20 + shell 61/61 + dashboard 105/105 +
  // headers 192/192 + toolbars 98/98 + kpis 315/315 + routines 697/697
  // — 1,522 computed members) — verified the rendered face byte-held
  // through the double-axis move. WH-44: the css axis read STABLE at
  // CapATpwD for the second consecutive round.)
  // WH-53 re-base (round 42: a DOUBLE-AXIS move again — the second
  // consecutive round on both axes): the SEVENTH css CONTENT change in
  // the watch's history (DbZzBCYa -> xihcXjhm) + the js bundle moving
  // to the TWENTY-SEVENTH distinct bundle (jFHbfiCi -> GX9h1ywM, read
  // stable at both the round's first and final reads — no intra-round
  // move this window). Unlike round 41's css move (which carried the
  // Google button's --sem-* re-skin), THIS css move carried ZERO
  // rendered-face change: the same-run digest read 15/15 MATCH and the
  // round's standing battery — the FIFTEENTH full-width run, all
  // SEVENTEEN surfaces green (login 38/38 + moodForm 20/20 + shell
  // 61/61 + dashboard 105/105 + headers 192/192 + toolbars 114/114 +
  // kpis 315/315 + routines 697/697 + tutorials 790/790 + profile
  // 433/433 + account 146/146 + authviews 192/192 + listinteriors
  // 88/88 + moodjourney 116/116 + calendar 92/92 + schedmodal 89/89 +
  // moodtiles 67/67 — 3,555 computed members) — verified the rendered
  // face byte-held through the double-axis move. The capture round
  // (the 24th cross-round byte comparison) corroborated: 31/34
  // byte-stable, the three movers all the standing sub-visible
  // rasterization signatures. Re-based ONCE to the round's final read
  // per the doctrine, born-verified on the quiet state: the re-run
  // after this edit reads "assets stable" + the 15/15 digest).
  // WH-60 re-base (round 49: a DOUBLE-AXIS move — the round-20/27/28/
  // 30/31/32/41/42 class): the EIGHTH css CONTENT change in the
  // watch's history and the FIRST since round 42 (xihcXjhm ->
  // BVWWKVEJ — seven stable rounds between) + the js bundle moving to
  // the THIRTIETH distinct bundle (C_KCpRIS -> CCUlq8S3, read stable
  // at the round's final read). The css move carried ZERO app-face
  // change — the round's bundle-rule diff (the lesson-30 walk's new
  // instrument leg) read the delta PLATFORM-LIBRARY-ONLY: 33 added /
  // 24 removed / 0 changed rules, every one a Base44 component-family
  // class (the cmdk command-menu re-authoring, the --sem-* design
  // tokens, the space-* spacing scale, the dialog sizing family) —
  // zero wellness-module classes touched. The same-run digest read
  // 15/15 MATCH on the new assets, and the round's standing battery —
  // the TWENTY-SECOND full-width run, all SEVENTEEN surfaces green
  // (login 38/38 + moodForm 20/20 + shell 61/61 + dashboard 105/105 +
  // headers 192/192 + toolbars 114/114 + kpis 315/315 + routines
  // 697/697 + tutorials 790/790 + profile 433/433 + account 146/146 +
  // authviews 192/192 + listinteriors 88/88 + moodjourney 116/116 +
  // calendar 92/92 + schedmodal 89/89 + moodtiles 67/67 — 3,555
  // computed members) — verified the rendered face byte-held through
  // the double-axis move. Re-based ONCE to the round's final read
  // per the doctrine, born-verified on the quiet state: the re-run
  // after this edit reads "assets stable" + the 15/15 digest).
  // WH-69 re-base (round 58: a DOUBLE-AXIS move — the round-20/27/28/
  // 30/31/32/41/42/49/50 class): the NINTH css CONTENT change in the
  // watch's history and the FIRST since round 49 (BVWWKVEJ ->
  // D-0IF5pE — TEN stable rounds between) + the js bundle moving to
  // the THIRTY-FOURTH distinct bundle (BL63jJGe -> D8Mh9heQ, the
  // second consecutive js-moving round). The css move carried ZERO
  // app-face change — the round's atom-level rule diff (the WH-60
  // instrument leg) read the delta PLATFORM-UTILITY-ONLY: 19 added /
  // 5 removed atoms, every one a Base44 platform class (the --sem-*
  // semantic tokens, the group\/template reveal arms, the space-*
  // spacing scale, the rtl helper) — zero wellness-module classes
  // touched. The same-run digest read 15/15 MATCH on the new assets,
  // and the round's standing battery — the THIRTY-FIRST full-width
  // run, all SEVENTEEN surfaces green (login 38/38 + moodForm 20/20 +
  // shell 61/61 + dashboard 105/105 + headers 192/192 + toolbars
  // 114/114 + kpis 315/315 + routines 697/697 + tutorials 790/790 +
  // profile 433/433 + account 146/146 + authviews 192/192 +
  // listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 +
  // schedmodal 89/89 + moodtiles 67/67 — 3,555 computed members) —
  // verified the rendered face byte-held through the double-axis
  // move. Re-based ONCE to the round's final read per the doctrine,
  // born-verified on the quiet state: the re-run after this edit
  // reads "assets stable" + the 15/15 digest).
  // WH-70 re-base (round 59: a DOUBLE-AXIS move — the round-20/27/28/
  // 30/31/32/41/49/50/58 class, the SECOND consecutive double-axis
  // round): the TENTH css CONTENT change in the watch's history and
  // the SECOND consecutive css-moving round (D-0IF5pE -> PQ9m1YkN) +
  // the js bundle moving to the THIRTY-SIXTH distinct bundle
  // (DsWj__ul -> BT2PWZna). The css move carried ZERO app-face
  // change — the round's atom-level rule diff (the WH-60/61
  // instrument leg) read the delta PLATFORM-UTILITY-ONLY: 4 added /
  // 1 removed atoms, every one a Base44 platform class (the
  // !size-[14px] important-size utility, the basis-[280px]
  // flex-basis arbitrary, the ring-fill-premium-primary +
  // ring-sem-text-secondary --sem-* semantic ring tokens; removed:
  // the bg-[color:var(--sem-bg-subtle)] semantic bg utility) — zero
  // wellness-module classes touched. The js pair's bundle-inventory
  // diff read PLATFORM-CHUNK-INVENTORY-CHANGE-ONLY (the
  // size-DIFFERING class, unlike the WH-52/53/60/61/68/69
  // size-identical rotations): 473 added / 468 removed differing
  // string literals, EVERY one a chunk-path string (zero non-path on
  // either side) + identical wellness-module string counts (8=8) +
  // net FIVE new chunk entries (six new platform feature stems —
  // composer, skillUsed, useSlashConnectors,
  // InviteCollaboratorsModal, useWorkspaceMemberSuggestions,
  // formatInviteError, every one a Base44 platform feature; one
  // removed: projectLabel), sizes 100,534 -> 100,777 B (+243 B =
  // the net-new chunk-path literals + the __vite__mapDeps index
  // renumbering + the chunk-name->path lookup array's five new
  // entries — verified by normalizing all chunk-path forms and the
  // mapDeps arrays: the remainders then differ only inside the
  // lookup array's own structure) — zero app-face change. The
  // same-run digest read 15/15 MATCH on the new assets, and the
  // round's standing battery — the THIRTY-SECOND full-width run,
  // all SEVENTEEN surfaces green (login 38/38 + moodForm 20/20 +
  // shell 61/61 + dashboard 105/105 + headers 192/192 + toolbars
  // 114/114 + kpis 315/315 + routines 697/697 + tutorials 790/790 +
  // profile 433/433 + account 146/146 + authviews 192/192 +
  // listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 +
  // schedmodal 89/89 + moodtiles 67/67 — 3,555 computed members) —
  // verified the rendered face byte-held through the double-axis
  // move. Re-based ONCE to the round's final read per the doctrine,
  // born-verified on the quiet state: the re-run after this edit
  // reads "assets stable" + the 15/15 digest).
  // WH-71 re-base (round 60: the THIRD consecutive DOUBLE-AXIS move —
  // AND the intra-round second double-axis move, the first round where
  // BOTH axes moved TWICE in the round's window [the WH-52/61/69
  // intra-round class, now on both axes]: the css axis PQ9m1YkN ->
  // C9yocF_M at the round's first read [the ELEVENTH css content
  // change, the THIRD consecutive css-moving round], then -> Bt66wgTd
  // at the born-verification flight [the TWELFTH]; the js axis
  // BT2PWZna -> DbT6cXt1 [the THIRTY-SEVENTH distinct bundle], then
  // -> DyOb2xUE [the THIRTY-EIGHTH]). The same-run computed digest
  // read 15/15 MATCH on EVERY generation (the round read, the
  // battery's window, and the born-verification re-run). The
  // instrument legs (the WH-60/61 doctrine) read BOTH pairs
  // platform-only: pair 1's css atom-level rule diff read the delta
  // PLATFORM-UTILITY-ONLY [161 added / 126 removed atoms — the --sem-*
  // semantic token arms (the --table-sticky-fade -> --table-row-fill
  // rename family, the --sem-shadow-scroll-edge token + its dark twin,
  // the data-[state=active] tab family re-skinned from hard hex to
  // --sem-* tokens), the --space-* scale arms, the
  // z-[2147483000..002] max z-index trio, the sm:before reveal arms,
  // the max-sm utilities, the aspect-[1344/734]/min-w-[960/1200px]/
  // max-w-[80ch]/pt-[12vh]/!size-auto/rounded-[36px] arbitraries —
  // zero wellness-module classes; the only wellness-ish regex hits
  // are the data-[state=...] pseudo-state arms ("stat" matches
  // "state"), a platform tab family] + pair 1's js bundle-inventory
  // diff read PLATFORM-CHUNK-MASS-ROTATION + minor inventory change
  // [469 added / 470 removed differing string literals, EVERY one a
  // chunk-path string (the sonner toast CSS string byte-identical
  // both sides); ~463 of ~810 chunk entries hash-rotated (810 ->
  // 809); net THREE new platform stems (logoImageUtils,
  // marketingOsRequestLog, useWorkspaceDirectConnect) / THREE removed
  // (button, hover-card, useAppIntegrationsData) — every stem a
  // Base44 platform feature, zero wellness-module names; sizes
  // 100,777 -> 101,401 B, the +624 B = the hash-length differences
  // across the rotated chunk-path literals + the net-new entries —
  // verified by the full stem-set difference]; pair 2's css atom diff
  // read PLATFORM-UTILITY-ONLY [5 added / 1 removed — max-w-[375px],
  // lg:w-[min(440px,45%)], lg:border-s, lg:px-space-8; removed
  // max-lg:items-center] + pair 2's js inventory diff read pure
  // PLATFORM-CHUNK-HASH-ROTATION-ONLY [464 added / 464 removed, every
  // one a chunk-path string; SIZE-IDENTICAL at 101,401 chars — the
  // classic WH-52/53/60/61/68 rotation class] — ZERO app-face change
  // through either move. The round's standing battery — the
  // THIRTY-THIRD full-width run, all SEVENTEEN surfaces green
  // (3,555/3,555, two first-flight transients absorbed + the
  // documented dev-server limiter restart between window 1 and the
  // capture phase) — verified the rendered face byte-held through the
  // double-axis moves. Re-based ONCE to the round's FINAL read per
  // the intra-round doctrine (the WH-52/61/69 precedent), born-
  // verified on the quiet state: the re-run after this edit reads
  // "assets stable" + the 15/15 digest).
  // WH-75 re-base (round 64, the css axis — the intra-round move class,
  // the WH-52/61/69/71 precedent): the axis held at Bt66wgTd for the
  // FIFTH consecutive round through the round's first read, then moved
  // AT THE BORN-VERIFICATION FLIGHT of the pair-1 js re-base —
  // Bt66wgTd -> wRLS_qWB, the THIRTEENTH css CONTENT change in the
  // watch's history. The move carried ZERO app-face change — the
  // round's atom-level rule diff (the WH-60/61 instrument leg) read
  // the delta PLATFORM-UTILITY-ONLY: 3 added / 3 removed atoms
  // (added: !size-space-3-5, bg-fill-standard-primary,
  // ring-fill-standard-primary; removed: !size-[14px],
  // bg-fill-premium-primary, ring-fill-premium-primary — the premium->
  // standard fill-token rename family + the spacing-scale size swap;
  // zero wellness-module classes) + the same-run computed digest read
  // 15/15 MATCH on every generation (the round's first flight AND the
  // born-verification flight) + the round's standing battery — the
  // THIRTY-SEVENTH full-width run, all SEVENTEEN surfaces green at
  // 3,555/3,555 — verified the rendered face byte-held through the
  // moves. Re-based ONCE to the round's FINAL read per the
  // intra-round doctrine, born-verified on the quiet state: the re-run
  // after this edit reads "assets stable" + the 15/15 digest).
  // WH-76 re-base (round 65, the css axis — the double-axis move class,
  // the WH-52/61/69/70 precedent, PLUS the intra-round re-fire — the
  // axis moved TWICE in the round's window): the axis moved at the
  // round's first read — wRLS_qWB -> CCUAZokn, the FOURTEENTH css
  // CONTENT change in the watch's history — then moved AGAIN at the
  // second born-verification flight — CCUAZokn -> Cs31Ex97, the
  // FIFTEENTH css CONTENT change (the round's FINAL read). BOTH moves
  // carried ZERO app-face change — the round's atom-level rule diffs
  // (the WH-60/61 instrument leg) read the deltas PLATFORM-UTILITY-ONLY:
  // pair 1: 12 added / 26 removed atoms (removed: the --sem-*
  // semantic-token utility retirement family — border-[color:var(--
  // sem-border-default|secondary|border-standard)], the bg-[var(--
  // sem-fill-default|standard-primary|surface-*)] family, the
  // text-[color:var(--sem-text-*)]/text-[var(--sem-text-|fg-secondary)]
  // family, the focus-visible ring pair, the group-hover text pairs;
  // added: the marquee keyframes + animate-marquee pair, the
  // bg-[color:var(--sem-fill-standard-light-default)] + neutral-200/950
  // tokens, pe-6, motion-reduce:flex/!transform-none, sm:py-14, the
  // group-hover --sem-text-icon-primary pair; zero wellness-module
  // classes) + pair 3: ONE atom added (.sm:pt-space-2 — a platform
  // spacing-scale utility), ZERO removed, sizes 922,779 -> 922,822
  // (+43), zero wellness-module classes + the same-run computed digest
  // read 15/15 MATCH on EVERY generation + the round's standing
  // battery — the THIRTY-EIGHTH full-width run, all SEVENTEEN
  // surfaces green at 3,555/3,555 (the routines/tutorials legs cured
  // to the reference's grid re-order, everything else byte-held) —
  // verified the rendered face byte-held through the moves. Re-based
  // ONCE to the round's FINAL read (Cs31Ex97) per the intra-round
  // doctrine, born-verified on the quiet state: the re-run after this
  // edit reads "assets stable" + the 15/15 digest).
  // WH-77 re-base (round 66, the css axis — the single-move class): the
  // axis moved at the round's first read — Cs31Ex97 -> BSn5NNZl, the
  // SIXTEENTH css CONTENT change in the watch's history — then HELD at
  // the re-base's own born-verification flight (the round's FINAL
  // read). The move carried ZERO app-face change — the round's
  // atom-level rule diff (the WH-60/61 instrument leg) read the delta
  // PLATFORM-UTILITY-ONLY: 8 added / 1 removed atoms, ZERO body
  // changes, zero wellness-module classes (added: the arbitrary-variant
  // heading-typography family — the descendant h1/h2/h3/h4
  // font-semibold + h1 text-lg + h2 text-base set + the :is(h1..h4)
  // mt-space-2 margin member + an h-[1800px] height utility; removed:
  // the !shadow important-shadow utility) + the same-run computed
  // digest read 15/15 MATCH on every generation (the round's first
  // flight AND the born-verification flight) + the round's standing
  // battery — the THIRTY-NINTH full-width run, all SEVENTEEN surfaces
  // green at 3,555/3,555 — verified the rendered face byte-held through
  // the move. Re-based ONCE to the round's FINAL read (BSn5NNZl),
  // born-verified on the quiet state: the re-run after this edit reads
  // "assets stable" + the 15/15 digest).
  cssPath: "/static/index-BSn5NNZl.css",
  // WH-44 re-base (round 33: the EIGHTEENTH bundle
  // /static/index-DrgN_FlZ.js -> /static/index-BgVoVawV.js, then the
  // NINETEENTH /static/index-BA3Eznmu.js firing during the re-base's own
  // born-verification — the WH-40/41/42/43 intra-round class, the SIXTH
  // consecutive round with an intra-round move; the css axis STABLE at
  // CapATpwD for the second consecutive round. The same-run digest read
  // 15/15 MATCH on every bundle, and the round's standing battery — the
  // SIXTH full-width run, all NINE legs green (login 34/34 + moodForm
  // 20/20 + shell 61/61 + dashboard 105/105 + headers 192/192 + toolbars
  // 98/98 + kpis 315/315 + routines 697/697 + tutorials 790/790 — 2,312
  // computed members) — verified the rendered face byte-held through the
  // moves. Re-based ONCE to the round's final read per the doctrine,
  // born-verified on the quiet state: the re-run after this edit reads
  // "assets stable" + the 15/15 digest).
  // WH-46 re-base (round 35: the TWENTIETH bundle
  // /static/index-BA3Eznmu.js -> /static/index-l0vUUttr.js — the
  // single-axis move class; the css axis STABLE at CapATpwD for the
  // THIRD consecutive round. The cooling note's js-axis streak RESETS
  // — round 34 was the second consecutive fully-quiet read, round 35
  // moved; the watch stays every-round regardless. The same-run digest
  // read 15/15 MATCH on the new bundle, and the round's standing
  // battery — the EIGHTH full-width run, all ELEVEN legs green (login
  // 34/34 + moodForm 20/20 + shell 61/61 + dashboard 105/105 + headers
  // 192/192 + toolbars 98/98 + kpis 315/315 + routines 697/697 +
  // tutorials 790/790 + profile 433/433 + account 146/146 — 2,891
  // computed members) — verified the rendered face byte-held through
  // the move. Re-based ONCE to the round's final read per the
  // doctrine, born-verified on the quiet state: the re-run after this
  // edit reads "assets stable" + the 15/15 digest).
  // WH-47 re-base (round 36: the TWENTY-FIRST bundle
  // /static/index-l0vUUttr.js -> /static/index-OLDXOew4.js — the
  // single-axis move class again; the css axis STABLE at CapATpwD for
  // the FOURTH consecutive round. The same-run digest read 15/15 MATCH
  // on the new bundle, and the round's standing battery — the NINTH
  // full-width run, all TWELVE legs green (login 34/34 + moodForm
  // 20/20 + shell 61/61 + dashboard 105/105 + headers 192/192 +
  // toolbars 114/114 — the WH-47-widened card-wrapper members riding
  // the F-1 cure + kpis 315/315 + routines 697/697 + tutorials 790/790
  // + profile 433/433 + account 146/146 + authviews 192/192 + the
  // thirteenth surface listinteriors 88/88 — 3,387 computed members)
  // — verified the rendered face byte-held through the move. Re-based
  // ONCE to the round's final read per the doctrine, born-verified on
  // the quiet state: the re-run after this edit reads "assets stable"
  // + the 15/15 digest).
  // WH-51 re-base (round 40: a MULTI-move round on the js axis — the
  // reference cycled THREE bundles inside the round's window
  // (OLDXOew4 -> CnKzudiR -> DktuqXUx -> CEYMtRjl, the TWENTY-FOURTH
  // distinct bundle at the re-execution's final read — the
  // active-development cadence at its fastest; the css axis STABLE at
  // CapATpwD through every move, the SIXTH consecutive round). The
  // same-run digest read 15/15 MATCH on EVERY new bundle, and the
  // round's standing battery — the THIRTEENTH full-width run, all
  // SEVENTEEN surfaces green (login 34/34 + moodForm 20/20 + shell
  // 61/61 + dashboard 105/105 + headers 192/192 + toolbars 114/114 +
  // kpis 315/315 + routines 697/697 + tutorials 790/790 + profile
  // 433/433 + account 146/146 + authviews 192/192 + listinteriors
  // 88/88 + moodjourney 116/116 + calendar 92/92 + schedmodal 89/89 +
  // the SEVENTEENTH surface moodtiles 67/67 — 3,551 computed members)
  // — verified the rendered face byte-held through the moves. Re-based
  // ONCE to the re-execution's final read per the doctrine,
  // born-verified on the quiet state: the re-run after this edit
  // reads "assets stable" + the 15/15 digest).
  // WH-52 re-base (round 41: a DOUBLE-AXIS move — the round-20/27/28/30/
  // 31/32 class): the SIXTH css CONTENT change in the watch's history
  // and the FIRST since round 32 (CapATpwD -> DbZzBCYa) + the js axis
  // moving TWICE in the round's window (CEYMtRjl -> CC9AG2Dw ->
  // jFHbfiCi, the TWENTY-SIXTH distinct bundle at the final read —
  // the intra-round move class). The css move carried the round's
  // core: the reference's --sem-* platform-token migration re-skinned
  // the login Google button (the F-1 cure — the login surface's 2
  // members the ONLY drift in the 3,551-member battery + the widened
  // hover members; every other face byte-held). The same-run digest
  // read 15/15 MATCH on EVERY new bundle, and the round's standing
  // battery — the FOURTEENTH full-width run, all SEVENTEEN surfaces
  // green on the cured tree (login 38/38 widened + moodForm 20/20 +
  // shell 61/61 + dashboard 105/105 + headers 192/192 + toolbars
  // 114/114 + kpis 315/315 + routines 697/697 + tutorials 790/790 +
  // profile 433/433 + account 146/146 + authviews 192/192 +
  // listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 +
  // schedmodal 89/89 + moodtiles 67/67 — 3,555 computed members)
  // — verified the rendered face byte-held through the moves. Re-based
  // ONCE to the round's final read per the doctrine, born-verified on
  // the quiet state: the re-run after this edit reads "assets stable"
  // + the 15/15 digest).
  // WH-75 re-base (round 64, the js axis — the intra-round move class,
  // the WH-52/61/69/71 precedent, the axis moving TWICE in the round's
  // window): the bundle moved for the FIRST time since the WH-71
  // re-base — the axis having held through the rounds 61-63 three
  // consecutive quiet reads — DyOb2xUE -> DqIZHgU- at the round's
  // first read (the THIRTY-NINTH distinct bundle), then ->
  // D7qeWGXk at the born-verification flight of the pair-1 re-base
  // (the FORTIETH distinct bundle). BOTH pairs read platform-only: pair
  // 1's bundle-inventory diff (the WH-60/61 instrument leg) read
  // PLATFORM-CHUNK-MASS-ROTATION + minor inventory change [467 added /
  // 465 removed differing string literals, EVERY one a chunk-path
  // string (zero non-path on either side) + the wellness-term string
  // sets reading 8=8 (every differing member a Base44 platform
  // chunk-path rotation, zero wellness-module names) + ~462 of ~815
  // chunk entries hash-rotated + net THREE new platform stems
  // (channelConnectionWidgetConfig, createLocalStorageStore,
  // companion-agent.bi) / ONE removed (is-renderable); sizes
  // 101,401 -> 101,535 (+134)] + pair 2's inventory diff read pure
  // PLATFORM-CHUNK-HASH-ROTATION-ONLY [465 added / 465 removed, every
  // one a chunk-path string, ZERO stem changes, SIZE-IDENTICAL at
  // 101,535 — the classic WH-52/53/60/61/68/71 rotation class] — ZERO
  // app-face change through either move. The same-run computed digest
  // read 15/15 MATCH on EVERY generation, and the round's standing
  // battery — the THIRTY-SEVENTH full-width run, all SEVENTEEN surfaces
  // green (login 38/38 + moodForm 20/20 + shell 61/61 + dashboard
  // 105/105 + headers 192/192 + toolbars 114/114 + kpis 315/315 +
  // routines 697/697 + tutorials 790/790 + profile 433/433 + account
  // 146/146 + authviews 192/192 + listinteriors 88/88 + moodjourney
  // 116/116 + calendar 92/92 + schedmodal 89/89 + moodtiles 67/67 —
  // 3,555 computed members) — verified the rendered face byte-held
  // through the moves. Re-based ONCE to the round's FINAL read (the
  // pair-2 generation) per the intra-round doctrine, born-verified on
  // the quiet state: the re-run after this edit reads "assets stable"
  // + the 15/15 digest).
  // WH-76 re-base (round 65: the js axis moved THRICE in the round's
  // window — the WH-52/61/69/71/75 intra-round class at its most
  // active, paired with the css axis's own double move; the css
  // axis's own re-base recorded at cssPath above): the round's window
  // read the js axis move THREE times — D7qeWGXk -> DOP63f79 at the
  // round's first read (the FORTY-FIRST distinct bundle), then ->
  // Bt3yZ54q at the pair-1 re-base's own born-verification flight
  // (the FORTY-SECOND), then -> -TayNEml at the pair-2 re-base's own
  // born-verification flight (the FORTY-THIRD distinct bundle, the
  // round's FINAL read). EVERY pair read platform-only: pair 1's
  // bundle-inventory diff (the WH-60/61 instrument leg) read
  // PLATFORM-CHUNK-MASS-ROTATION + minor inventory change — 489
  // added / 485 removed differing string literals, EVERY one a
  // chunk-path string (the first-read classifier's 14/13 "non-path"
  // tokens were all dots-in-stem chunk paths — cant-radio.store,
  // import-repo.bi, channel-onboarding.bi, app-publish.store,
  // index.umd, usePublishBi.bi, kanban.bi, the companion-agent.bi
  // WH-75 family — zero true non-path on either side) + net ELEVEN
  // new platform stems (plan, action, DisabledControlTooltip,
  // HubSpotContactModal, OAuthRedirectReturnHandler,
  // userAppsSocketManager, CheckoutBackReturnHandler, tierVisibility,
  // artifactView, agentWorking, workspaceRenewalDate) / SEVEN removed
  // (BillingAPI, useGitHubGitRoutesMode, UserNotifications,
  // useMyBuilderProfile, MenuLink, github, useTalkToSales — every
  // stem a Base44 platform feature, zero wellness-module names) +
  // chunk entries ~818 -> ~821; sizes 101,535 -> 101,795 chars
  // (+260, the hash-length differences across the rotated chunk-path
  // literals + the net-new entries); pair 2's inventory diff read
  // pure PLATFORM-CHUNK-HASH-ROTATION-ONLY — 470 added / 471
  // removed, every one a chunk-path string, ZERO non-path on either
  // side, ZERO new stems / ONE removed (ClickSmall), chunk entries
  // ~842 -> ~841, sizes 101,795 -> 101,751 chars (−44, the
  // hash-length differences + the one removed entry); pair 3's
  // inventory diff read pure PLATFORM-CHUNK-HASH-ROTATION-ONLY —
  // 470 added / 470 removed, every one a chunk-path string, ZERO
  // non-path, ZERO stem changes either direction, SIZE-NEAR-
  // IDENTICAL at 101,751 -> 101,755 (+4) — the classic
  // WH-52/53/60/61/68/71/75 rotation class — ZERO app-face change
  // through any move, no cure required. The same-run digest read
  // 15/15 MATCH on EVERY generation (the round's first flight AND
  // both born-verification flights); the round's battery walked the
  // moves at 3,555/3,555 (the THIRTY-EIGHTH full-width run, the
  // routines/tutorials legs cured to the reference's grid
  // re-order); the capture round (the 47th byte comparison) read
  // 27/34 with the SEVEN movers root-caused (FIVE curable reorder
  // faces + the two standing sub-visible habitats) and NO
  // date-axis crossing (same-day Nov 5 faces — the FOURTH carry of
  // the cycle, carrying to WH-77). Re-based ONCE to the round's
  // FINAL read (the pair-3 generation) per the intra-round doctrine,
  // born-verified on the quiet state: the re-run after this edit
  // reads "assets stable" + the 15/15 digest.
  // WH-77 re-base (round 66: the js axis moved TWICE in the round's
  // window — the WH-52/61/69/71/75/76 intra-round class, paired with
  // the css axis's own single move; the css axis's own re-base recorded
  // at cssPath above): the round's window read the js axis move —
  // -TayNEml -> BXRa7LsX at the round's first read (the FORTY-FOURTH
  // distinct bundle), then -> CqEsEwKA at the re-base's own
  // born-verification flight (the FORTY-FIFTH distinct bundle, the
  // round's FINAL read). EVERY pair read platform-only: pair 1's
  // bundle-inventory diff (the WH-60/61 instrument leg) read
  // PLATFORM-CHUNK-HASH-ROTATION (the mass form) — 746 added / 739
  // removed differing string literals, EVERY one a chunk-path string
  // (the first-read classifier's 15/15 "non-path" tokens were all
  // dots-in-stem RELATIVE chunk paths — the ./AuthContext-*.js, the
  // I18nProvider-*.js, the vendor-react-*.js, the vendor-ui-*.js
  // family, zero true non-path on either side) + ZERO stem changes
  // (the 15-stem relative-path family IDENTICAL on both sides, only
  // the hash suffixes rotated) + chunk entries ~890 -> ~897; sizes
  // 101,755 -> 102,119 chars (+364, the hash-length differences
  // across the rotated chunk-path literals + the net-new absolute
  // entries); pair 2's inventory diff read pure PLATFORM-CHUNK-HASH-
  // ROTATION-ONLY — 476 added / 476 removed, every one a chunk-path
  // string (471 absolute + the 5-member relative family), ZERO stem
  // changes either direction, SIZE-IDENTICAL at 102,119 chars (delta
  // 0) — the classic WH-52/53/60/61/68/71 rotation class — ZERO
  // app-face change through any move, no cure required. The same-run
  // digest read 15/15 MATCH on EVERY generation (the round's first
  // flight AND the born-verification flight); the round's battery
  // walked the moves at 3,555/3,555 (the THIRTY-NINTH full-width run,
  // every surface byte-held); the capture round (the 48th byte
  // comparison) read 32/34 with the TWO movers root-caused (the
  // 10-learning text-antialiasing band habitat + the standing 29
  // maxdelta-1 rasterization family re-firing) and NO date-axis
  // crossing (same-day Nov 5 faces — the FIFTH carry of the cycle,
  // carrying to WH-78). Re-based ONCE to the round's FINAL read
  // (CqEsEwKA) per the intra-round doctrine, born-verified on the
  // quiet state: the re-run after this edit reads "assets stable" +
  // the 15/15 digest.
  jsPath: "/static/index-CqEsEwKA.js",
  // WH-71 re-base (round 60: the THIRD consecutive double-axis round
  // — AND the first round where the js axis moved TWICE PAIRED with
  // the css axis moving TWICE [the intra-round move class on both
  // axes, the WH-52/61/69 precedent]: BT2PWZna -> DbT6cXt1 at the
  // round's first read [the THIRTY-SEVENTH distinct bundle], then ->
  // DyOb2xUE at the born-verification flight [the THIRTY-EIGHTH];
  // the css axis's own two moves recorded at cssPath above). The
  // same-run computed digest read 15/15 MATCH on EVERY bundle. The
  // bundle-inventory diff (the WH-60/61 instrument leg) read BOTH
  // pairs platform-only: pair 1 read PLATFORM-CHUNK-MASS-ROTATION +
  // minor inventory change — 469 added / 470 removed differing
  // string literals, EVERY one a chunk-path string (the sonner toast
  // CSS string byte-identical both sides; zero non-path either side)
  // + ~463 of ~810 chunk entries hash-rotated (the mass-rotation
  // class — every platform chunk rebuilt) + net THREE new platform
  // stems (logoImageUtils, marketingOsRequestLog,
  // useWorkspaceDirectConnect) / THREE removed (button, hover-card,
  // useAppIntegrationsData) — sizes 100,777 -> 101,401 B (the +624 B
  // = the hash-length differences across the rotated chunk-path
  // literals + the net-new entries, verified by the full stem-set
  // difference); pair 2 read pure PLATFORM-CHUNK-HASH-ROTATION-ONLY —
  // 464 added / 464 removed, every one a chunk-path string,
  // SIZE-IDENTICAL at 101,401 chars — the classic WH-52/53/60/61/68
  // rotation class. ZERO app-face change through either move, no
  // cure required. The same-run digest read 15/15; the round's
  // battery walked the moves at 3,555/3,555 (the THIRTY-THIRD
  // full-width run); the capture round (the 42nd byte comparison)
  // read 32/34 with both movers root-caused as the standing
  // sub-visible habitats (25-dark-login-focus the WH-20
  // interpolation-tail family + 29-quick-actions-hover the
  // maxdelta-1 rasterization family) and NO date-axis crossing
  // (same-day Nov 4 faces — the round's captures landed ~23:05 UTC
  // Nov 4, before the Nov 5 UTC midnight; the expectation carries to
  // WH-72, the NINTH carry of the cycle). Re-based ONCE to the
  // round's FINAL read per the intra-round doctrine, born-verified
  // on BOTH outcomes (the firing state at the round read; the quiet
  // state via the re-run — "assets stable" + the 15/15 digest).
  // WH-70 re-base (round 59: the js-axis move paired with the css
  // axis's own move — the double-axis class, the SECOND consecutive
  // double-axis round; the css axis's own re-base recorded at cssPath
  // above). The round's window read the js axis move ONCE, stable at
  // the new hash across the round's flights: DsWj__ul -> BT2PWZna
  // (the THIRTY-SIXTH distinct bundle at the final read). The
  // same-run computed digest read 15/15 MATCH on the new bundle. The
  // bundle-inventory diff (the WH-60/61 instrument leg): the pair
  // reads PLATFORM-CHUNK-INVENTORY-CHANGE-ONLY — 473 added / 468
  // removed differing string literals, EVERY one a chunk-path string
  // (zero non-path on either side; the static\/<name>-<hash>.js
  // inventory + the .\/ relative import form + the template-literal
  // embeds) + identical wellness-module string counts (8=8) + net
  // FIVE new chunk entries (six new platform feature stems —
  // composer, skillUsed, useSlashConnectors,
  // InviteCollaboratorsModal, useWorkspaceMemberSuggestions,
  // formatInviteError; one removed: projectLabel — every addition a
  // Base44 platform feature, zero wellness-module names), sizes
  // 100,534 -> 100,777 B (the size-DIFFERING class: the +243 B is
  // the net-new chunk-path literals + the __vite__mapDeps index
  // renumbering + the chunk-name->path lookup array's five new
  // entries, verified by normalization) — the
  // WH-52/53/60/61/68/69 platform-move class with feature growth,
  // zero app-face change. The round's standing battery — the
  // THIRTY-SECOND full-width run, all SEVENTEEN surfaces green
  // (login 38/38 + moodForm 20/20 + shell 61/61 + dashboard
  // 105/105 + headers 192/192 + toolbars 114/114 + kpis 315/315 +
  // routines 697/697 + tutorials 790/790 + profile 433/433 +
  // account 146/146 + authviews 192/192 + listinteriors 88/88 +
  // moodjourney 116/116 + calendar 92/92 + schedmodal 89/89 +
  // moodtiles 67/67 — 3,555 computed members) — verified the
  // rendered face byte-held through the move. The capture round (the
  // 41st cross-round byte comparison) corroborated: 33/34
  // byte-stable, the ONE mover root-caused before the re-base
  // (25-dark-login-focus the WH-20 focus-ring interpolation-tail
  // habitat [77px/0.0067%, maxdelta 5, bbox 367x121, its identical
  // recorded parameters; re-fired here after four consecutive
  // byte-stable rounds — the family's standing
  // re-fire/byte-stable alternation]); NO date-axis crossing — the
  // round ran ~13:20 UTC Nov 4, BEFORE the Nov 4 -> Nov 5 UTC
  // midnight, and the WH-69 ledger already carries the Nov 4 faces
  // (its captures ~09:38 UTC Nov 4) — same-day faces, the WH-56
  // mover class does not fire; the expectation carries to WH-71
  // (the EIGHTH carry of the cycle). Re-based ONCE to the round's
  // FINAL read per the doctrine, born-verified on the quiet state:
  // the re-run after this edit reads "assets stable" + the 15/15
  // digest).
  // WH-69 re-base (round 58: the js-axis INTRA-ROUND move — the
  // WH-52/61 class; the css axis's own re-base recorded at cssPath
  // above, read STABLE at D-0IF5pE across every flight of the round).
  // The round's window read the js axis move TWICE: BL63jJGe ->
  // D8Mh9heQ (the round's first flight — the THIRTY-FOURTH distinct
  // bundle, walked by the full battery + the capture round) ->
  // DsWj__ul (the born-verification flight, settled across THREE
  // consecutive flights ~20 s apart — the THIRTY-FIFTH distinct
  // bundle at the final read). The same-run computed digest read 15/15
  // MATCH on EVERY bundle. The bundle-inventory diff (the WH-60/61
  // instrument leg, run on BOTH pairs): each pair reads IDENTICAL
  // sizes (100,534 B) with every differing string literal a chunk-path
  // string (the first pair 492/492 — the static\/<name>-<hash>.js
  // inventory + the .\/ relative import form + the two
  // template-literal embeds; the second pair 466/466 — every one
  // .js-referencing) + identical wellness-module string counts — the
  // WH-52/53/60/61/68 platform-move class, zero app-face change. The
  // round's standing battery — the THIRTY-FIRST full-width run, all
  // SEVENTEEN surfaces green (login 38/38 + moodForm 20/20 + shell
  // 61/61 + dashboard 105/105 + headers 192/192 + toolbars 114/114 +
  // kpis 315/315 + routines 697/697 + tutorials 790/790 + profile
  // 433/433 + account 146/146 + authviews 192/192 + listinteriors
  // 88/88 + moodjourney 116/116 + calendar 92/92 + schedmodal 89/89 +
  // moodtiles 67/67 — 3,555 computed members) — verified the rendered
  // face byte-held through the moves. The capture round (the 40th
  // cross-round byte comparison) corroborated: 33/34 byte-stable, the
  // ONE mover root-caused before the re-base (29-quick-actions-hover
  // the maxdelta-1 rasterization family [5px/0.0004%, maxdelta 1,
  // bbox 5x5, a consecutive re-fire after WH-67/68]); NO date-axis
  // crossing — the round ran ~09:38 UTC Nov 4, BEFORE the Nov 4 ->
  // Nov 5 UTC midnight, and the WH-68 ledger already carries the Nov 4
  // faces (its captures ~07:34 UTC Nov 4) — same-day faces, the WH-56
  // mover class does not fire; the expectation carries to WH-70 (the
  // SEVENTH carry of the cycle). Re-based ONCE to the round's FINAL
  // read per the doctrine, born-verified on the quiet state: the
  // re-run after this edit reads "assets stable" + the 15/15 digest).
  // WH-68 re-base (round 57: the js-axis SINGLE move — the WH-46/47
  // single-axis class; the css axis STABLE at BVWWKVEJ for the NINTH
  // consecutive round). The round's window read the js axis move
  // ONCE: 6xnUqbWf -> BL63jJGe (the THIRTY-THIRD distinct bundle at
  // the final read, the first js move since the WH-61 re-base — six
  // stable rounds between). The same-run computed digest read 15/15
  // MATCH on the new bundle. The bundle-inventory diff (the WH-60/61
  // instrument leg): the pair byte-differs only in lazy-loaded
  // PLATFORM-CHUNK HASH strings (80 of 252 fixed windows differ —
  // AuthContext/I18nProvider/base/AuthAPI/useFeatureFlags/... — the
  // platform's chunk-hash rotation, zero wellness-module strings),
  // IDENTICAL sizes (100,534 B both) + identical app href
  // inventories + identical wellness-module string counts — the
  // WH-52/53/60/61 platform-move class, zero app-face change. The
  // round's standing battery — the THIRTIETH full-width run, all
  // SEVENTEEN surfaces green (login 38/38 + moodForm 20/20 + shell
  // 61/61 + dashboard 105/105 + headers 192/192 + toolbars 114/114 +
  // kpis 315/315 + routines 697/697 + tutorials 790/790 + profile
  // 433/433 + account 146/146 + authviews 192/192 + listinteriors
  // 88/88 + moodjourney 116/116 + calendar 92/92 + schedmodal 89/89 +
  // moodtiles 67/67 — 3,555 computed members) — verified the rendered
  // face byte-held through the move. The capture round (the 39th
  // cross-round byte comparison) corroborated: 32/34 byte-stable, the
  // two movers BOTH root-caused before the re-base (10-learning the
  // maxdelta-7 rasterization family [9px/0.0008%, maxdelta 7, bbox
  // 11x2, a consecutive re-fire after WH-67] + 29-quick-actions-hover
  // the maxdelta-1 rasterization family [5px/0.0004%, maxdelta 1,
  // bbox 5x5, a consecutive re-fire after WH-65/66/67]); NO date-axis
  // crossing — the round ran ~07:34 UTC Nov 4, BEFORE the Nov 4 ->
  // Nov 5 UTC midnight, and the WH-67 ledger already carries the Nov 4
  // faces (its captures ~03:49 UTC Nov 4) — same-day faces, the WH-56
  // mover class does not fire; the expectation carries to WH-69 (the
  // SIXTH carry of the cycle). Re-based ONCE to the round's FINAL read
  // per the doctrine, born-verified on the quiet state: the re-run
  // after this edit reads "assets stable" + the 15/15 digest).
  // WH-61 re-base (round 50: the js-axis INTRA-ROUND move — the
  // WH-52 class; the css axis STABLE at BVWWKVEJ for the SECOND
  // consecutive round). The round's window read the js axis move
  // TWICE: CCUlq8S3 -> BFKdKLB4 (the first flight) -> 6xnUqbWf (the
  // born-verification flight, settled across THREE consecutive
  // flights ~5 min apart — the THIRTY-SECOND distinct bundle at the
  // final read). The same-run computed digest read 15/15 MATCH on
  // EVERY bundle. The bundle-inventory diff (the WH-60 instrument
  // leg, run on BOTH moves): each pair byte-differs only in
  // lazy-loaded PLATFORM-CHUNK HASH strings (229 hunks CCUlq8S3-vs-
  // BFKdKLB4, 469 rough hunks BFKdKLB4-vs-6xnUqbWf — UserAppMain/
  // TotpSetupDialog/MfaSettings/WebApp/status-banner/mixpanelUtils/
  // ... — the platform's chunk-hash rotation, zero wellness-module
  // strings), identical sizes (100,538 B all three) + identical app
  // href inventories — the WH-52/53/60 platform-move class, zero
  // app-face change. The round's standing battery — the
  // TWENTY-THIRD full-width run, all SEVENTEEN surfaces green (login
  // 38/38 + moodForm 20/20 + shell 61/61 + dashboard 105/105 + headers
  // 192/192 + toolbars 114/114 + kpis 315/315 + routines 697/697 +
  // tutorials 790/790 + profile 433/433 + account 146/146 + authviews
  // 192/192 + listinteriors 88/88 + moodjourney 116/116 + calendar
  // 92/92 + schedmodal 89/89 + moodtiles 67/67 — 3,555 computed
  // members) — verified the rendered face byte-held through the
  // moves. The capture round (the 32nd cross-round byte comparison)
  // corroborated: 31/34 byte-stable, the three movers ALL
  // root-caused before the re-base (25 the WH-20 focus-ring
  // interpolation-tail [fourth consecutive round, identical
  // parameters] + 29 the maxdelta-1 rasterization family + 30 the
  // documented transient hover-face habitat re-fired after three
  // byte-stable rounds [the WH-57 maxdelta-29 family]); NO date-axis
  // crossing — the round ran ~23:00 UTC Nov 3, before the Nov 4 UTC
  // midnight, the browser-local faces still Nov 3. Re-based ONCE to
  // the round's FINAL read per the WH-52 intra-round doctrine,
  // born-verified on the quiet state: the re-run after this edit
  // reads "assets stable" + the 15/15 digest).
  // WH-60 re-base (round 49: the DOUBLE-AXIS move — see the cssPath
  // block above for the round's full record; the js axis moved to
  // the THIRTIETH distinct bundle C_KCpRIS -> CCUlq8S3, the css axis
  // moving xihcXjhm -> BVWWKVEJ [the EIGHTH css content change, the
  // first since round 42 — seven stable rounds between]. The
  // same-run computed digest read 15/15 MATCH on the new bundle, the
  // full seventeen-surface battery walked the move at zero drift
  // (3,555/3,555, the TWENTY-SECOND full-width run), and the bundle-
  // rule diff read the css delta platform-library-only (33/24/0 —
  // the cmdk/sem-token/space-scale families, zero app-face classes).
  // Re-based ONCE to the round's final read per the doctrine,
  // born-verified on the quiet state: the re-run after this edit
  // reads "assets stable" + the 15/15 digest).
  // WH-56 re-base (round 45: the js-axis move — the TWENTY-NINTH
  // distinct bundle; the css axis STABLE at xihcXjhm for the FOURTH
  // consecutive round). r0DWh4vL -> C_KCpRIS read at the round's first
  // watch flight; the same-run computed digest read 15/15 MATCH on the
  // new bundle, and the round's standing battery — the EIGHTEENTH
  // full-width run, all SEVENTEEN surfaces green (login 38/38 +
  // moodForm 20/20 + shell 61/61 + dashboard 105/105 + headers 192/192
  // + toolbars 114/114 + kpis 315/315 + routines 697/697 + tutorials
  // 790/790 + profile 433/433 + account 146/146 + authviews 192/192 +
  // listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 +
  // schedmodal 89/89 + moodtiles 67/67 — 3,555 computed members)
  // — verified the rendered face byte-held through the move. The
  // capture round (the 27th cross-round byte comparison) corroborated:
  // 28/34 byte-stable, the six movers ALL root-caused before the
  // re-base (the date-axis crossing class: the ledger's Nov 2 faces
  // vs this round's Nov 3 faces on the todayIso()-defaulting date
  // forms [07/26/27/28/32] + the standing sub-visible rasterization
  // signature on 29; the intra-run write/hover habitats 24/30 read
  // 32/34 byte-identical across consecutive runs). The round's own
  // infrastructure deviations absorbed per the lesson-46 doctrine:
  // ONE our-side post-login cold-compile race on the freshly
  // restarted dev server (the batch-2 first flights — the auth-wall
  // loop presentation, cured by the clean restart, the flights re-run
  // clean) + ONE reference transient mid-round (two consecutive
  // first-flight timeouts on a mis-keyed diagnostic URL — the URL
  // itself the bug, the reference never down; the probe re-ran clean).
  // Re-based ONCE to the round's final read per the doctrine,
  // born-verified on the quiet state: the re-run after this edit
  // reads "assets stable" + the 15/15 digest).
  // WH-54 re-base (round 43: the js-axis move — the TWENTY-EIGHTH
  // distinct bundle; the css axis STABLE at xihcXjhm for the second
  // consecutive round). GX9h1ywM -> r0DWh4vL read at the round's first
  // watch flight; the same-run computed digest read 15/15 MATCH on the
  // new bundle, and the round's standing battery — the SIXTEENTH
  // full-width run, all SEVENTEEN surfaces green (login 38/38 +
  // moodForm 20/20 + shell 61/61 + dashboard 105/105 + headers 192/192
  // + toolbars 114/114 + kpis 315/315 + routines 697/697 + tutorials
  // 790/790 + profile 433/433 + account 146/146 + authviews 192/192 +
  // listinteriors 88/88 + moodjourney 116/116 + calendar 92/92 +
  // schedmodal 89/89 + moodtiles 67/67 — 3,555 computed members)
  // — verified the rendered face byte-held through the move. The capture
  // round (the 25th cross-round byte comparison) corroborated: 33/34
  // byte-stable, the one mover (29-quick-actions-hover 5px maxdelta 1)
  // the standing sub-visible rasterization signature. Re-based ONCE to
  // the round's final read per the doctrine, born-verified on the quiet
  // state: the re-run after this edit reads "assets stable" + the 15/15
  // digest).
  cdnPipeline: true,
  frontendConfig: true,
  // The computed spot-check (the CDN companion — MATCH/DRIFT):
  login: { h1Fs: "30px", h1Weight: "700", inputH: "48px", inputW: "368px", inputR: "12px" },
  dashboard: {
    h1: "Welcome Back!",
    h1Fs: "36px",
    h1Weight: "700",
    gradient: ["79, 70, 229", "147, 51, 234", "219, 39, 119"],
    tiles: ["Workouts This Week", "0", "Mood Entries", "1", "Active Assignments", "Goals Completed"],
  },
  mobileHeader: { padL: "24px", triggerW: "28px", triggerH: "28px", triggerR: "8px", titleX: 68 },
  drawer: {
    width: 288,
    borderR: "1px",
    borderRColor: "rgb(229, 229, 229)",
    xDisplay: "none",
    cappedHrefs: 11,
    rowH: "32px",
    escapeCloses: true,
    growAutoCloses: true,
  },
  desktopShell: {
    rowH: "32px",
    iconW: "16px",
    avatarW: "40px",
    avatarGradient: ["99, 102, 241", "168, 85, 247"],
    footers: 0,
    asides: 0,
    navs: 0,
  },
  goals: { badges: "Badges Earned", zero: "0", of: "of 0 total", tiles: 0 },
  routines: {
    templates: 11,
    withImg: 6,
    withWatch: 6,
    zoneH: "160px",
    zoneOverflow: "hidden",
    imgFit: "cover",
    overlayBg: "rgba(0, 0, 0, 0.4)",
    overlayOpacity: "0",
    watchBtnH: "32px",
    watchBtnBg: "rgb(255, 255, 255)",
    watchBtnFs: "12px",
  },
  scheduleModal: {
    width: 672,
    familyACircles: 3,
    familyBCircles: 5,
  },
  learning: { imgs: 12, watchNow: 12, chipBorder: "rgb(229, 229, 229)" },
  calendar: { trioBorder: "rgb(229, 229, 229)", gap: "8px" },
  profile: { tablistW: 960, tabs: 3, comboboxes: 4 },
  mentalHealth: { entries: "1", avg: "5.0/10", streak: "1", journey: "Your Journey" },
  // WH-34 (F-3, the (d) surface): the mood form's computed interior —
  // every member probed live this round (three passes: the structural
  // ladder, the active-tile/Save-Entry states, the default open state).
  // The form opens with GOOD pre-selected on BOTH apps (our
  // useState("good") — the default-state question settled by a dedicated
  // probe), so the active-tile read needs NO click: the zero-write
  // doctrine at its cleanest (open → read → Cancel).
  moodForm: {
    heading: "How are you feeling today?",
    groupCount: 7, // the ONE space-y-6 form (its siblings ride space-y-4)
    groupGap: 24, // the space-y-6 ladder's computed gap
    moodLabelMb: 16, // the mb-4 label→grid gap
    tiles: 5, // Amazing/Good/Okay/Low/Struggling
    activeTileText: "😊Good", // the DEFAULT-selected tile (no click)
    activeTileStops: ["59, 130, 246", "6, 182, 212"], // blue-500 → cyan-500
    activeTileColor: "rgb(255, 255, 255)",
    inactiveTileBorder: "rgb(229, 231, 235)", // gray-200
    energyLabel: "Energy Level: 5/10", // the useState(5) default, both apps
    rangeH: 8, // the h-2 track
    rangeMin: "1", // min=1 (the schema's min(0) stays the API superset)
    rangeBg: "rgb(229, 231, 235)", // the gray-200 track
    lowHighMt: "4px", // mt-1
    lowHighColor: "rgb(107, 114, 128)", // gray-500
    reflectH: 96, // the h-24 reflection
    reflectMinH: "60px", // the stock gratitude form both textareas share
    cancelH: 36, // the h-9 outline Cancel
    saveEntryH: 36,
    saveEntryStops: ["16, 185, 129", "20, 184, 166"], // emerald-500 → teal-500
    saveEntryColor: "rgb(250, 250, 250)", // neutral-50 ink
  },
  studyResources: { empty: "No resource", uploadField: "Upload File (optional)" },
  exercise: { empty: "No workouts" },
  assignments: { listSectionAbsent: true },
};

const results = [];
const report = (surface, ok, detail) => {
  results.push({ surface, ok, detail });
  console.log(`${ok ? "MATCH " : "DRIFT "} ${surface}: ${detail}`);
};
const probe = async (fn) => {
  try {
    return await fn();
  } catch (e) {
    return { __error: String(e).slice(0, 200) };
  }
};

/**
 * SPA-safe navigation: `waitUntil: "load"` fires BEFORE the reference's
 * React tree renders the route (the first run's lesson — every probe
 * that read straight after goto raced an unrendered page and read
 * nulls). Land on the route, wait for the app shell's <main>, then
 * settle for the route content.
 */
const gotoApp = async (route, { sel = "main", settleMs = 900 } = {}) => {
  await page.goto(`${BASE}${route}`, { waitUntil: "load" });
  await page.waitForSelector(sel, { timeout: 15000 });
  await page.waitForTimeout(settleMs);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

// ---------- PASS 1: the asset watch (logged out — no login) ----------
console.log("--- PASS 1: the asset watch (informational) ---");
// The login page carries no <main> — its shell is the bare auth card.
await gotoApp("/login", { sel: "h1" });

const assets = await probe(() =>
  page.evaluate(() => {
    const css = Array.from(document.querySelectorAll("link[rel=stylesheet]"))
      .map((l) => new URL(l.href).pathname)
      .find((p) => /index-.*\.css$/.test(p));
    const js = Array.from(document.querySelectorAll("script[src]"))
      .map((s) => new URL(s.src).pathname)
      .find((p) => /index-.*\.js$/.test(p));
    const cdn = Array.from(document.querySelectorAll("script[src]")).some((s) =>
      s.src.includes("cdn.tailwindcss.com"),
    );
    const cfg = Array.from(document.querySelectorAll("script[src]")).some((s) =>
      s.src.includes("frontend-config"),
    );
    return { css, js, cdn, cfg };
  }),
);
if (assets.__error) {
  console.log(`PROBE-ERROR assets: ${assets.__error}`);
} else {
  const moved = [];
  if (assets.css !== LEDGER.cssPath) moved.push(`css ${LEDGER.cssPath} -> ${assets.css}`);
  if (assets.js !== LEDGER.jsPath) moved.push(`js ${LEDGER.jsPath} -> ${assets.js}`);
  if (assets.cdn !== LEDGER.cdnPipeline) moved.push(`cdnPipeline -> ${assets.cdn}`);
  if (assets.cfg !== LEDGER.frontendConfig) moved.push(`frontendConfig -> ${assets.cfg}`);
  console.log(
    moved.length === 0
      ? `WATCH  assets stable (css ${assets.css}, js ${assets.js}, cdn ${assets.cdn}, cfg ${assets.cfg})`
      : `WATCH  MOVED since the ledger — ${moved.join("; ")} — run the full lesson-30 walk`,
  );
}

// The login family's standing geometry (the (l)-leg map's reference side).
const loginFace = await probe(() =>
  page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const input = document.querySelector("input[type=email]");
    const hs = h1 ? getComputedStyle(h1) : null;
    const is = input ? getComputedStyle(input) : null;
    const r = input ? input.getBoundingClientRect() : null;
    return {
      h1Fs: hs ? hs.fontSize : null,
      h1Weight: hs ? hs.fontWeight : null,
      inputH: r ? `${Math.round(r.height)}px` : null,
      inputW: r ? `${Math.round(r.width)}px` : null,
      inputR: is ? is.borderRadius : null,
    };
  }),
);
if (loginFace.__error) {
  report("login", false, `PROBE-ERROR ${loginFace.__error}`);
} else {
  const L = LEDGER.login;
  const diffs = Object.keys(L).filter((k) => loginFace[k] !== L[k]);
  report(
    "login",
    diffs.length === 0,
    diffs.length === 0
      ? `h1 ${loginFace.h1Fs}/${loginFace.h1Weight}, inputs ${loginFace.inputH}x${loginFace.inputW} r${loginFace.inputR}`
      : diffs.map((k) => `${k} ${L[k]} -> ${loginFace[k]}`).join("; "),
  );
}

// ---------- PASS 2: the one login, then the computed spot-check ----------
console.log("--- PASS 2: the computed spot-check (ONE login) ---");
await page.fill("input[type=email]", EMAIL);
await page.fill("input[type=password]", PASSWORD);
await page.click("button[type=submit]");
await page.waitForURL(`${BASE}/`);
await page.waitForSelector("main", { timeout: 15000 });
await page.waitForTimeout(1200); // the tiles render async — the first run raced them

// — the dashboard —
{
  const d = await probe(() =>
    page.evaluate(() => {
      const h1 = Array.from(document.querySelectorAll("h1")).find((h) => h.offsetParent !== null);
      const cs = h1 ? getComputedStyle(h1) : null;
      const body = document.querySelector("main").textContent.replace(/\s+/g, " ");
      return {
        h1: h1 ? h1.textContent.trim() : null,
        h1Fs: cs ? cs.fontSize : null,
        h1Weight: cs ? cs.fontWeight : null,
        gradient: cs ? cs.backgroundImage : null,
        body,
      };
    }),
  );
  if (d.__error) report("dashboard", false, `PROBE-ERROR ${d.__error}`);
  else {
    const L = LEDGER.dashboard;
    const miss = L.tiles.filter((t) => !d.body.includes(t));
    const gradMiss = L.gradient.filter((stop) => !d.gradient.includes(stop));
    const ok =
      d.h1 === L.h1 && d.h1Fs === L.h1Fs && d.h1Weight === L.h1Weight && miss.length === 0 && gradMiss.length === 0;
    report(
      "dashboard",
      ok,
      ok
        ? `H1 "${d.h1}" ${d.h1Fs}/${d.h1Weight}, gradient stops + tiles 0/1/0/0 all present`
        : `h1 ${d.h1}/${d.h1Fs}/${d.h1Weight}; tiles missing [${miss}]; gradient missing [${gradMiss}]`,
    );
  }
}

// — the desktop shell (rows/icons/avatar/footers/landmarks) —
{
  const s = await probe(() =>
    page.evaluate(() => {
      const row = Array.from(document.querySelectorAll('a[href^="/Exercise"]')).find(
        (a) => a.offsetParent !== null,
      );
      const icon = row ? row.querySelector("svg") : null;
      const prof = Array.from(document.querySelectorAll('a[href^="/Profile"]')).find(
        (a) => a.offsetParent !== null,
      );
      const circle = prof ? prof.querySelector("[class*=rounded-full]") : null;
      const cs = circle ? getComputedStyle(circle) : null;
      return {
        rowH: row ? getComputedStyle(row).height : null,
        iconW: icon ? getComputedStyle(icon).width : null,
        avatarW: cs ? cs.width : null,
        avatarGradient: cs ? cs.backgroundImage : null,
        footers: document.querySelectorAll("footer").length,
        asides: document.querySelectorAll("aside").length,
        navs: document.querySelectorAll("nav").length,
      };
    }),
  );
  if (s.__error) report("desktopShell", false, `PROBE-ERROR ${s.__error}`);
  else {
    const L = LEDGER.desktopShell;
    const gradMiss = L.avatarGradient.filter((g) => !s.avatarGradient.includes(g));
    const diffs = [];
    if (s.rowH !== L.rowH) diffs.push(`rowH ${L.rowH} -> ${s.rowH}`);
    if (s.iconW !== L.iconW) diffs.push(`iconW ${L.iconW} -> ${s.iconW}`);
    if (s.avatarW !== L.avatarW) diffs.push(`avatarW ${L.avatarW} -> ${s.avatarW}`);
    if (gradMiss.length) diffs.push(`avatarGradient missing [${gradMiss}]`);
    if (s.footers !== L.footers) diffs.push(`footers ${L.footers} -> ${s.footers}`);
    if (s.asides !== L.asides) diffs.push(`asides ${L.asides} -> ${s.asides}`);
    if (s.navs !== L.navs) diffs.push(`navs ${L.navs} -> ${s.navs}`);
    report(
      "desktopShell",
      diffs.length === 0,
      diffs.length === 0
        ? `rows ${s.rowH}, icons ${s.iconW}, avatar ${s.avatarW}, footers ${s.footers}, landmarks 0`
        : diffs.join("; "),
    );
  }
}

// — the goals standing block —
{
  const g = await probe(async () => {
    await gotoApp("/Goals");
    return page.evaluate(() => {
      const t = document.querySelector("main").textContent.replace(/\s+/g, " ");
      return {
        badges: t.includes("Badges Earned"),
        zero: /Badges Earned\s*0/.test(t),
        of: t.includes("of 0 total"),
        tiles: document.querySelectorAll("main [class*=space-y-3] [class*=rounded-xl]").length,
      };
    });
  });
  if (g.__error) report("goals", false, `PROBE-ERROR ${g.__error}`);
  else {
    const L = LEDGER.goals;
    const ok = g.badges && g.zero && g.of && g.tiles === L.tiles;
    report(
      "goals",
      ok,
      ok
        ? `"Badges Earned 0 of 0 total", ${g.tiles} tiles (the demo account's own state)`
        : `badges=${g.badges} zero=${g.zero} of=${g.of} tiles ${L.tiles} -> ${g.tiles}`,
    );
  }
}

// — the routines family split + the video-card computed set —
{
  const r = await probe(async () => {
    await gotoApp("/Routines");
    // The video family's marker: the thumbnail imgs (the first run raced
    // an unrendered grid and read "no video card" — wait for the imgs).
    await page.waitForSelector("main .rounded-xl.border img", { timeout: 15000 });
    await page.waitForTimeout(600);
    return page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll("main .rounded-xl.border")).filter((c) =>
        c.querySelector("img, h3, [class*=font-semibold]"),
      );
      const withImg = cards.filter((c) => c.querySelector("img"));
      const card = withImg[0];
      if (!card) return { __error: "no video card" };
      const zone = card.querySelector("[class*=h-40]");
      const img = card.querySelector("img");
      const btn = Array.from(card.querySelectorAll("button")).find((b) => /Watch Video/i.test(b.textContent));
      const ov = btn ? btn.parentElement : null;
      const zcs = zone ? getComputedStyle(zone) : null;
      const ics = img ? getComputedStyle(img) : null;
      const bcs = btn ? getComputedStyle(btn) : null;
      const ocs = ov ? getComputedStyle(ov) : null;
      return {
        templates: cards.length,
        withImg: withImg.length,
        withWatch: cards.filter((c) =>
          Array.from(c.querySelectorAll("button")).some((b) => /Watch Video/i.test(b.textContent)),
        ).length,
        zoneH: zcs ? zcs.height : null,
        zoneOverflow: zcs ? zcs.overflow : null,
        imgFit: ics ? ics.objectFit : null,
        overlayBg: ocs ? ocs.backgroundColor : null,
        overlayOpacity: ocs ? ocs.opacity : null,
        watchBtnH: bcs ? bcs.height : null,
        watchBtnBg: bcs ? bcs.backgroundColor : null,
        watchBtnFs: bcs ? bcs.fontSize : null,
      };
    });
  });
  if (r.__error) report("routines", false, `PROBE-ERROR ${r.__error}`);
  else {
    const L = LEDGER.routines;
    const diffs = Object.keys(L).filter((k) => r[k] !== L[k]);
    report(
      "routines",
      diffs.length === 0,
      diffs.length === 0
        ? `11 templates (6 video + 5 plain), the video-card computed set (zone ${r.zoneH}/${r.zoneOverflow}, overlay ${r.overlayBg} @${r.overlayOpacity}, btn ${r.watchBtnH} ${r.watchBtnFs})`
        : diffs.map((k) => `${k} ${L[k]} -> ${r[k]}`).join("; "),
    );
  }
}

// — the Schedule modal on BOTH families (read-only — never submitted) —
{
  const m = await probe(async () => {
    const open = async (cardText) => {
      await gotoApp("/Routines");
      await page.waitForSelector("main .rounded-xl.border img");
      const card = page.locator("main .rounded-xl.border").filter({ hasText: cardText }).first();
      await card.getByRole("button", { name: /Use This Template/i }).click();
      await page.waitForSelector('[role="dialog"]');
      await page.waitForTimeout(450); // the zoom-in-95 settle doctrine
      const out = await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"]');
        const circles = d
          ? Array.from(d.querySelectorAll("span.rounded-full")).filter(
              (s) => getComputedStyle(s).backgroundColor === "rgb(168, 85, 247)",
            )
          : [];
        return {
          width: d ? Math.round(d.getBoundingClientRect().width) : null,
          circles: circles.length,
        };
      });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      return out;
    };
    const familyA = await open("5-Minute Morning Energizer");
    const familyB = await open("Creative Flow Session");
    return { familyA, familyB };
  });
  if (m.__error) report("scheduleModal", false, `PROBE-ERROR ${m.__error}`);
  else {
    const L = LEDGER.scheduleModal;
    const ok =
      m.familyA.width === L.width &&
      m.familyA.circles === L.familyACircles &&
      m.familyB.width === L.width &&
      m.familyB.circles === L.familyBCircles;
    report(
      "scheduleModal",
      ok,
      ok
        ? `${L.width}px on both families; circles A=${m.familyA.circles} B=${m.familyB.circles} (the family split — data, not renderer)`
        : `A ${JSON.stringify(m.familyA)} B ${JSON.stringify(m.familyB)} vs ${JSON.stringify(L)}`,
    );
  }
}

// — the learning trio —
{
  const l = await probe(async () => {
    await gotoApp("/Learning");
    return page.evaluate(() => {
      const chips = Array.from(document.querySelectorAll("main [class*=border]")).filter((c) => {
        const cs = getComputedStyle(c);
        return cs.border === `1px solid ${"rgb(229, 229, 229)"}` && cs.boxShadow === "none";
      });
      return {
        imgs: document.querySelectorAll("main img").length,
        watchNow: Array.from(document.querySelectorAll("main button")).filter((b) =>
          /Watch Now/i.test(b.textContent),
        ).length,
        chipBorder: chips.length > 0,
      };
    });
  });
  if (l.__error) report("learning", false, `PROBE-ERROR ${l.__error}`);
  else {
    const L = LEDGER.learning;
    const ok = l.imgs === L.imgs && l.watchNow === L.watchNow && l.chipBorder;
    report(
      "learning",
      ok,
      ok ? `${l.imgs} imgs, ${l.watchNow} Watch Now, outline chips at rgb(229,229,229)` : JSON.stringify(l),
    );
  }
}

// — the events calendar —
{
  const c = await probe(async () => {
    await gotoApp("/Events");
    return page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("main button")).filter(
        (b) => b.offsetParent !== null && /^[←→]$|^Today$/.test(b.textContent.trim()),
      );
      const ok = btns.length === 3 && btns.every((b) => getComputedStyle(b).border.includes("rgb(229, 229, 229)"));
      const gap = btns[0] ? getComputedStyle(btns[0].parentElement).gap : null;
      return { trio: ok, gap };
    });
  });
  if (c.__error) report("calendar", false, `PROBE-ERROR ${c.__error}`);
  else {
    const ok = c.trio && c.gap === LEDGER.calendar.gap;
    report("calendar", ok, ok ? `outline trio 1px rgb(229,229,229), gap ${c.gap}` : JSON.stringify(c));
  }
}

// — the profile tablist —
{
  const p = await probe(async () => {
    await gotoApp("/Profile");
    return page.evaluate(() => {
      const tablist = document.querySelector("[role=tablist]");
      return {
        tablistW: tablist ? Math.round(tablist.getBoundingClientRect().width) : null,
        tabs: document.querySelectorAll("[role=tab]").length,
        comboboxes: document.querySelectorAll("[role=combobox]").length,
      };
    });
  });
  if (p.__error) report("profile", false, `PROBE-ERROR ${p.__error}`);
  else {
    const L = LEDGER.profile;
    const ok = p.tablistW === L.tablistW && p.tabs === L.tabs && p.comboboxes === L.comboboxes;
    report(
      "profile",
      ok,
      ok ? `tablist ${p.tablistW}px, ${p.tabs} tabs, ${p.comboboxes} comboboxes` : JSON.stringify(p),
    );
  }
}

// — the mental-health demo state —
{
  const mh = await probe(async () => {
    await gotoApp("/MentalHealth");
    return page.evaluate(() => {
      const t = document.querySelector("main").textContent.replace(/\s+/g, " ");
      return {
        entries: /Total Entries\s*1/.test(t) ? "1" : null,
        avg: t.includes("5.0/10") ? "5.0/10" : null,
        streak: /Current Streak\s*1/.test(t) ? "1" : null,
        journey: t.includes("Your Journey"),
      };
    });
  });
  if (mh.__error) report("mentalHealth", false, `PROBE-ERROR ${mh.__error}`);
  else {
    const L = LEDGER.mentalHealth;
    const ok =
      mh.entries === L.entries && mh.avg === L.avg && mh.streak === L.streak && mh.journey;
    report(
      "mentalHealth",
      ok,
      ok ? `1 entry, 5.0/10 avg, streak 1, the Your Journey list` : JSON.stringify(mh),
    );
  }
}

// — the mood form's computed interior (WH-34, F-3 — the (d) surface; the
//   (k) leg's map on our side, the reference side finally ledgered: the
//   form rides the SAME inline-card modality as the sr form — opened
//   read-only, closed via Cancel, ZERO-WRITE) —
{
  const mf = await probe(async () => {
    await gotoApp("/MentalHealth");
    const openBtn = page.locator("main button", { hasText: /New Entry/i }).first();
    await openBtn.click();
    // settle on the form's own heading (the SPA-render lesson: never read
    // straight after the click)
    await page.waitForSelector("text=How are you feeling today?", { timeout: 8000 });
    await page.waitForTimeout(450);
    const read = await page.evaluate(() => {
      const range = document.querySelector("input[type='range']");
      if (!range) return { error: "no range (form not open?)" };
      let card = range;
      while (card && card !== document.body) {
        if ((card.getAttribute("class") || "").includes("shadow-xl")) break;
        card = card.parentElement;
      }
      const heading = Array.from(card.querySelectorAll("h2, h3, [class*='font-semibold']")).find((h) =>
        /How are you feeling today\?/i.test(h.textContent || ""),
      );
      // the body (p-6 pt-0) → its ONE child = the space-y-6 wrapper → the groups
      const body = Array.from(card.children).find((c) => (c.getAttribute("class") || "").includes("pt-0"));
      const wrapper = body?.firstElementChild;
      const groups = wrapper ? Array.from(wrapper.children) : [];
      const grid = card.querySelector("div[class*='grid-cols-2']");
      const tiles = grid ? Array.from(grid.querySelectorAll("button")) : [];
      // the DEFAULT-selected tile — no click: both apps open with Good
      // pre-selected (probed; our useState("good") twin)
      const active = tiles.find((t) => (getComputedStyle(t).backgroundImage || "").includes("gradient"));
      const inactive = tiles.find((t) => t !== active);
      const labels = Array.from(card.querySelectorAll("label"));
      const energyLabel = labels.find((l) => /Energy/i.test(l.textContent || ""));
      const textareas = Array.from(card.querySelectorAll("textarea"));
      const reflect = textareas[textareas.length - 1];
      const buttons = Array.from(card.querySelectorAll("button"));
      const cancel = buttons.find((b) => b.textContent.trim() === "Cancel");
      const save = buttons.find((b) => /Save Entry/i.test(b.textContent.trim()));
      return {
        heading: heading?.textContent.trim(),
        wrapperCls: wrapper?.getAttribute("class"),
        groupCount: groups.length,
        groupGap:
          groups.length >= 2
            ? Math.round(groups[1].getBoundingClientRect().y - groups[0].getBoundingClientRect().y - groups[0].getBoundingClientRect().height)
            : null,
        moodLabelMb:
          grid && labels[0]
            ? Math.round(grid.getBoundingClientRect().y - labels[0].getBoundingClientRect().bottom)
            : null,
        tiles: tiles.length,
        activeTileText: active?.textContent.replace(/\s+/g, "").trim(),
        activeTileBg: active ? getComputedStyle(active).backgroundImage : null,
        activeTileColor: active ? getComputedStyle(active).color : null,
        inactiveTileBorder: inactive ? getComputedStyle(inactive).borderColor : null,
        energyLabel: energyLabel?.textContent.replace(/\s+/g, " ").trim(),
        rangeH: Math.round(range.getBoundingClientRect().height),
        rangeMin: range.min,
        rangeBg: getComputedStyle(range).backgroundColor,
        lowHighMt: null,
        lowHighColor: null,
        reflectH: reflect ? Math.round(reflect.getBoundingClientRect().height) : null,
        reflectMinH: reflect ? getComputedStyle(reflect).minHeight : null,
        cancelH: cancel ? Math.round(cancel.getBoundingClientRect().height) : null,
        saveEntryH: save ? Math.round(save.getBoundingClientRect().height) : null,
        saveEntryBg: save ? getComputedStyle(save).backgroundImage : null,
        saveEntryColor: save ? getComputedStyle(save).color : null,
      };
    });
    if (read.error) return read;
    // the Low/High row (computed AFTER the card walk — its locator needs
    // the collapsed-text match, evaluated in the same context)
    const lowHigh = await page.evaluate(() => {
      const range = document.querySelector("input[type='range']");
      let card = range;
      while (card && card !== document.body) {
        if ((card.getAttribute("class") || "").includes("shadow-xl")) break;
        card = card.parentElement;
      }
      const row = Array.from(card.querySelectorAll("div")).find(
        (d) => d.textContent.replace(/\s+/g, "") === "LowHigh" && d.querySelector("span"),
      );
      return row
        ? { lowHighMt: getComputedStyle(row).marginTop, lowHighColor: getComputedStyle(row.querySelector("span")).color }
        : { lowHighMt: null, lowHighColor: null };
    });
    // close read-only via Cancel (the inline form's own affordance —
    // Escape is not it, probed)
    await page.getByRole("button", { name: "Cancel", exact: true }).click();
    await page.waitForTimeout(400);
    const closed = await page.evaluate(() => {
      const range = document.querySelector("input[type='range']");
      return range === null;
    });
    return { ...read, ...lowHigh, closed };
  });
  if (mf.__error) report("moodForm", false, `PROBE-ERROR ${mf.__error}`);
  else if (mf.error) report("moodForm", false, `PROBE-ERROR ${mf.error}`);
  else {
    const L = LEDGER.moodForm;
    const activeStopsOk = L.activeTileStops.every((s) => (mf.activeTileBg || "").includes(s));
    const saveStopsOk = L.saveEntryStops.every((s) => (mf.saveEntryBg || "").includes(s));
    const ok =
      mf.heading === L.heading &&
      (mf.wrapperCls || "").includes("space-y-6") &&
      mf.groupCount === L.groupCount &&
      mf.groupGap === L.groupGap &&
      mf.moodLabelMb === L.moodLabelMb &&
      mf.tiles === L.tiles &&
      mf.activeTileText === L.activeTileText &&
      activeStopsOk &&
      mf.activeTileColor === L.activeTileColor &&
      mf.inactiveTileBorder === L.inactiveTileBorder &&
      mf.energyLabel === L.energyLabel &&
      mf.rangeH === L.rangeH &&
      mf.rangeMin === L.rangeMin &&
      mf.rangeBg === L.rangeBg &&
      mf.lowHighMt === L.lowHighMt &&
      mf.lowHighColor === L.lowHighColor &&
      mf.reflectH === L.reflectH &&
      mf.reflectMinH === L.reflectMinH &&
      mf.cancelH === L.cancelH &&
      mf.saveEntryH === L.saveEntryH &&
      saveStopsOk &&
      mf.saveEntryColor === L.saveEntryColor &&
      mf.closed;
    report(
      "moodForm",
      ok,
      ok
        ? `space-y-6 x${mf.groupCount}@${mf.groupGap}px, mb-4 ${mf.moodLabelMb}px, ${mf.tiles} tiles (default ${mf.activeTileText} blue→cyan), range 8px/min1 gray-200, Low/High mt-1 gray-500, reflect ${mf.reflectH}px, Cancel/Save Entry 36px (emerald→teal), closed via Cancel`
        : JSON.stringify(mf),
    );
  }
}

// — the study-resources block (the inline form opened read-only) —
{
  const sr = await probe(async () => {
    // The reference's true href is the PLURAL /StudyResources (its own
    // sidebar link; the singular 404s — a full-load quirk the WH-33
    // first run rediscovered: the session-62 narrative's URL-guess trap).
    await gotoApp("/StudyResources");
    const t1 = await page.evaluate(() => document.querySelector("main").textContent.replace(/\s+/g, " "));
    const addBtn = page.locator("main button", { hasText: /Add Resource/i }).first();
    if ((await addBtn.count()) === 0) {
      return { empty: t1.includes("No resource") ? "No resource" : null, uploadField: null };
    }
    await addBtn.click();
    await page.waitForTimeout(400);
    return page.evaluate(() => ({
      empty: document.querySelector("main").textContent.includes("No resource") ? "No resource" : null,
      uploadField: Array.from(document.querySelectorAll("input[type=file]"))
        .filter((i) => i.offsetParent !== null)
        .some((i) => (i.parentElement?.parentElement?.textContent || "").includes("Upload File (optional)"))
        ? "Upload File (optional)"
        : null,
      dialogs: document.querySelectorAll('[role="dialog"]').length,
    }));
  });
  if (sr.__error) report("studyResources", false, `PROBE-ERROR ${sr.__error}`);
  else {
    const L = LEDGER.studyResources;
    const ok = sr.empty === L.empty && sr.uploadField === L.uploadField;
    report(
      "studyResources",
      ok,
      ok ? `zero rows + the inline "Upload File (optional)" field (no overlay)` : JSON.stringify(sr),
    );
  }
}

// — the exercise + assignments zero-row states —
{
  const ex = await probe(async () => {
    await gotoApp("/Exercise");
    return page.evaluate(() => document.querySelector("main").textContent.replace(/\s+/g, " "));
  });
  if (ex.__error) report("exercise", false, `PROBE-ERROR ${ex.__error}`);
  else {
    const ok = ex.includes(LEDGER.exercise.empty);
    report("exercise", ok, ok ? `"${LEDGER.exercise.empty}" (the zero-row state)` : "empty state missing");
  }
  const asg = await probe(async () => {
    await gotoApp("/Assignments");
    return page.evaluate(() => {
      const t = document.querySelector("main").textContent.replace(/\s+/g, " ");
      return { noList: !/Recent Assignments|assignment list/i.test(t) };
    });
  });
  if (asg.__error) report("assignments", false, `PROBE-ERROR ${asg.__error}`);
  else {
    const ok = asg.noList === LEDGER.assignments.listSectionAbsent;
    report("assignments", ok, ok ? "the zero-row section omission (no list section)" : JSON.stringify(asg));
  }
}

// — the mobile header + the drawer battery (390px, ending back at desktop) —
{
  const mb = await probe(async () => {
    await gotoApp("/Dashboard");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(600);
    const header = await page.evaluate(() => {
      const hdr = document.querySelector("header");
      const title = hdr ? hdr.querySelector("h1") : null;
      const trig = hdr ? hdr.querySelector("button") : null;
      const tcs = trig ? getComputedStyle(trig) : null;
      return {
        padL: hdr ? getComputedStyle(hdr).paddingLeft : null,
        triggerW: tcs ? tcs.width : null,
        triggerH: tcs ? tcs.height : null,
        triggerR: tcs ? tcs.borderRadius : null,
        titleX: title ? Math.round(title.getBoundingClientRect().x) : null,
      };
    });
    // open the drawer
    await page.evaluate(() => document.querySelector("header button").click());
    await page.waitForTimeout(800);
    const drawer = await page.evaluate(() => {
      const cand = Array.from(document.querySelectorAll("div")).filter((d) => {
        const r = d.getBoundingClientRect();
        const cs = getComputedStyle(d);
        return r.width >= 287 && r.width <= 289 && r.height > 600 && parseFloat(cs.borderRightWidth) > 0;
      });
      const s = cand[0];
      if (!s) return { sheetFound: false };
      const cs = getComputedStyle(s);
      const x = s.querySelector("button");
      const links = Array.from(s.querySelectorAll("a"));
      const rows = links.map((a) => getComputedStyle(a).height);
      return {
        sheetFound: true,
        width: Math.round(s.getBoundingClientRect().width), // the border-box rect
        borderR: cs.borderRightWidth,
        borderRColor: cs.borderRightColor,
        xDisplay: x ? getComputedStyle(x).display : "none",
        // Scoped to the SHEET (the document-wide count picks up the
        // dashboard's own capitalized Quick Action links — the first
        // run's 15-vs-11 lesson; the sheet's own set is the 10 module
        // links + the Profile card).
        cappedHrefs: links.filter((a) => /^\/[A-Z]/.test(a.getAttribute("href") || "")).length,
        rowH: rows[0],
        focusOnSheet: document.activeElement.classList.contains("fixed"),
      };
    });
    // escape closes + unlocks
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    const afterEscape = await page.evaluate(() => {
      const cand = Array.from(document.querySelectorAll("div")).filter((d) => {
        const r = d.getBoundingClientRect();
        return r.width >= 287 && r.width <= 289 && r.height > 600;
      });
      return {
        closed: cand.length === 0,
        unlocked: !document.documentElement.dataset.scrollLocked,
      };
    });
    // reopen, then grow the viewport — the drawer must auto-close
    await page.evaluate(() => document.querySelector("header button").click());
    await page.waitForTimeout(800);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.waitForTimeout(800);
    const afterGrow = await page.evaluate(() => {
      const cand = Array.from(document.querySelectorAll("div")).filter((d) => {
        const r = d.getBoundingClientRect();
        return r.width >= 287 && r.width <= 289 && r.height > 600;
      });
      return { closed: cand.length === 0 };
    });
    return { header, drawer, afterEscape, afterGrow };
  });
  if (mb.__error) {
    report("mobileHeader+drawer", false, `PROBE-ERROR ${mb.__error}`);
  } else {
    const H = LEDGER.mobileHeader;
    const D = LEDGER.drawer;
    const diffs = [];
    for (const k of Object.keys(H)) if (mb.header[k] !== H[k]) diffs.push(`${k} ${H[k]} -> ${mb.header[k]}`);
    if (!mb.drawer.sheetFound) diffs.push("sheet not found");
    else {
      // ±1 the engine's sub-pixel rounding of the 288px sheet (the WH-22
      // modal-width doctrine, applied to the drawer).
      if (Math.abs(mb.drawer.width - D.width) > 1) diffs.push(`width ${D.width} -> ${mb.drawer.width}`);
      if (mb.drawer.borderR !== D.borderR) diffs.push(`borderR ${D.borderR} -> ${mb.drawer.borderR}`);
      if (mb.drawer.borderRColor !== D.borderRColor) diffs.push(`borderRColor -> ${mb.drawer.borderRColor}`);
      if (mb.drawer.xDisplay !== D.xDisplay) diffs.push(`xDisplay ${D.xDisplay} -> ${mb.drawer.xDisplay}`);
      if (mb.drawer.cappedHrefs !== D.cappedHrefs) diffs.push(`hrefs ${D.cappedHrefs} -> ${mb.drawer.cappedHrefs}`);
      if (mb.drawer.rowH !== D.rowH) diffs.push(`rowH ${D.rowH} -> ${mb.drawer.rowH}`);
    }
    if (!mb.afterEscape.closed) diffs.push("escape did not close");
    if (!mb.afterEscape.unlocked) diffs.push("scroll lock held after escape");
    if (!mb.afterGrow.closed) diffs.push("viewport-grow did not auto-close");
    report(
      "mobileHeader+drawer",
      diffs.length === 0,
      diffs.length === 0
        ? `header padL ${mb.header.padL}, trigger ${mb.header.triggerW} r${mb.header.triggerR}, title x=${mb.header.titleX}; drawer ${mb.drawer.width}px, border-r ${mb.drawer.borderR} ${mb.drawer.borderRColor}, X ${mb.drawer.xDisplay}, ${mb.drawer.cappedHrefs} hrefs, rows ${mb.drawer.rowH}, escape + unlock + grow-auto-close all pass`
        : diffs.join("; "),
    );
  }
}

await browser.close();

// ---------- the report ----------
const drifts = results.filter((r) => !r.ok);
console.log("---");
console.log(
  `WATCH-ROUND RESULT: ${results.length - drifts.length}/${results.length} spot-checks MATCH` +
    (drifts.length > 0 ? `, ${drifts.length} DRIFT — investigate, cure, re-base the LEDGER in the same commit` : ""),
);
process.exit(drifts.length > 0 ? 1 : 0);
