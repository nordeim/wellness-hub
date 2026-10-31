import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";

/** WH-20 (F-1..F-5): the interaction-contrast arithmetic pin — the
 * preset-axis doctrine (WH-19's tests/preset-contrast.test.ts) applied to
 * the interaction states. The WH-19 round paired the login family's ARMS
 * (census-complete) but its chosen ring COLOR shipped sub-contrast
 * (`dark:focus:ring-neutral-600` — 2.29:1 vs the dark card, 2.08:1 vs the
 * input blend, both below the 3:1 non-text minimum of 1.4.11), and the
 * surfaces outside those records shipped interaction arms with NO dark
 * value at all (the toast's hovered dismiss X at 1.05:1 on the dark card —
 * invisible exactly when the user aims at it; APP_FOOTER a white strip on
 * every dark page; nine module action buttons painting light-island
 * flashes in dark). The census (tests/src-census.test.ts, the WH-20 leg)
 * pins the dark twin's EXISTENCE; this pin computes the twin's VALUE —
 * pairing is not contrast.
 *
 * Method (the audit's instrument, made pure): every ratio is computed
 * from the v3 palette pins in globals.css's @theme block (the
 * session-88 contract — the values the compiled stylesheet actually
 * ships), against the surface the arm renders on, with the background
 * blends the browser composites expressed in the same arithmetic
 * (alpha over the parent). All ratios are WCAG relative luminance
 * (sRGB), matching the live oklab-aware probe to within its display
 * rounding (the audit's browser-measured 2.32/7.11/6.45/3.43 vs this
 * pin's 2.29/7.11/6.45/3.43 — the same numbers at pin precision). */

// ---- the math (WCAG 2.x relative luminance + contrast ratio) ----------
const chan = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
};
const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const ratioHex = (ink: string, bg: string) => ratio(lum(ink), lum(bg));
/** Alpha-over-parent blend, the compositor's arithmetic (rounded per
 * channel) — `dark:bg-neutral-800/60` over the dark card blends #262626
 * at 60% onto #171717 → #202020 (the browser displays #202021; the
 * one-step display rounding moves no ratio by more than 0.01). */
const blend = (fgHex: string, alpha: number, bgHex: string) => {
  const mix = (fg: number, bg: number) => Math.round(alpha * fg + (1 - alpha) * bg);
  const f = (n: number) => n.toString(16).padStart(2, "0");
  const r = parseInt(fgHex.slice(1, 3), 16), g = parseInt(fgHex.slice(3, 5), 16), b = parseInt(fgHex.slice(5, 7), 16);
  const R = parseInt(bgHex.slice(1, 3), 16), G = parseInt(bgHex.slice(3, 5), 16), B = parseInt(bgHex.slice(5, 7), 16);
  return `#${f(mix(r, R))}${f(mix(g, G))}${f(mix(b, B))}`;
};

// ---- the v3 palette pins (globals.css @theme — the session-88 block) --
const css = readFileSync(join(import.meta.dirname, "..", "src", "app", "globals.css"), "utf8");
const V3 = new Map<string, string>();
for (const m of css.matchAll(/--color-([a-z]+-\d{3}|[a-z]+-\d{2}): (#[0-9a-f]{6})/g)) {
  V3.set(m[1], m[2]);
}
const v3 = (pair: string, why: string) => {
  const hex = V3.get(pair);
  expect(hex, `${why}: ${pair} must carry its v3 @theme pin in globals.css (the session-88 contract — add the pin in the same commit as the usage)`).toBeTruthy();
  return hex!;
};

// ---- the audited backgrounds (documented so the pin cannot drift) -----
const DARK_CARD = "#171717"; // neutral-900 — the login card dark:bg-neutral-900/95
const ROW_CARD_DARK = "#262626"; // neutral-800 — the module row card's effective dark value
const TOAST_WASH_DARK = css.match(/\.dark\s*\{[^}]*--color-line-soft: (#[0-9a-f]{6})/)?.[1] ?? "#1c1c1f"; // the toast close button's hover:bg-line-soft in dark
const INPUT_BLEND = () => blend(v3("neutral-800", "the input's dark bg"), 0.6, DARK_CARD); // dark:bg-neutral-800/60 over the card

// ---- the arm extractors ------------------------------------------------
type Arm = { site: string; cls: string };
function armsIn(file: string, anchor: RegExp, site: string): Arm[] {
  const src = readFileSync(join(import.meta.dirname, "..", file), "utf8");
  const out: Arm[] = [];
  for (const m of src.matchAll(/"([^"\n]*)"/g)) {
    if (anchor.test(m[1]!)) out.push({ site, cls: m[1]! });
  }
  return out;
}
/** The first `dark:(…)utility-color-step` capture in a string. */
const darkArm = (cls: string, util: string) =>
  cls.match(new RegExp(`dark:(?:hover:|focus:|focus-visible:)?${util}-([a-z]+-\\d+)`))?.[1];

// ---- F-1: the login family's dark focus rings + borders ----------------
it("WH-20 F-1: the login family's dark focus arms compute ≥3:1 — the ring against both its backgrounds, the border against the input blend", () => {
  const sites = [
    ...armsIn("src/lib/login-reset.ts", /dark:focus:ring-/, "login-reset.ts (the two login inputs)"),
    ...armsIn("src/lib/page-layout.ts", /dark:focus:ring-/, "page-layout.ts (the signup input + the 404 homeButton)"),
  ];
  expect(sites.length, "the audit's four F-1 sites must all be reading (two login inputs, one signup input, the 404 homeButton)").toBeGreaterThanOrEqual(4);

  const offenders: string[] = [];
  for (const { site, cls } of sites) {
    const ring = darkArm(cls, "ring");
    if (!ring) { offenders.push(`${site}: no dark:focus:ring- arm found in "${cls}"`); continue; }
    const ringHex = v3(ring, `the ${site} focus ring`);
    const rCard = ratioHex(ringHex, DARK_CARD);
    if (rCard < 3) offenders.push(`${site}: dark:focus:ring-${ring} vs the dark card = ${rCard.toFixed(2)}:1 (<3:1 — the WH-19 choice shipped 2.29:1; the cure is neutral-400 at 7.11:1)`);
    const rBlend = ratioHex(ringHex, INPUT_BLEND());
    if (rBlend < 3) offenders.push(`${site}: dark:focus:ring-${ring} vs the input blend ${INPUT_BLEND()} = ${rBlend.toFixed(2)}:1 (<3:1; neutral-400 clears at 6.45:1)`);

    const border = cls.match(/dark:focus:border-([a-z]+-\d+)/)?.[1];
    if (border) {
      const rb = ratioHex(v3(border, `the ${site} focus border`), INPUT_BLEND());
      if (rb < 3) offenders.push(`${site}: dark:focus:border-${border} vs the input blend = ${rb.toFixed(2)}:1 (<3:1; the cure is neutral-500 at 3.43:1)`);
    }
  }
  expect(offenders, "F-1: every dark focus ring must compute ≥3:1 against BOTH its backgrounds (card + input blend) and every focus border ≥3:1 against the blend — the ring is the keyboard user's only indicator in dark").toEqual([]);
});

// ---- F-2 + F-3: the toast hover arm + the footer's dark text ------------
it("WH-20 F-2/F-3: the toast's hovered dismiss glyph and the footer's dark ink compute ≥3:1 (text ≥4.5:1)", () => {
  const offenders: string[] = [];

  // F-2 — the toast close button (toast.tsx): the HOVER arm must carry a
  // dark value that clears the hover wash. RED ships none at all —
  // hover:text-neutral-900 renders the hovered X at 1.05:1 on the dark
  // card (invisible exactly when the user aims at it).
  const toast = armsIn("src/components/ui/toast.tsx", /hover:text-neutral-900/, "toast.tsx (the close button)");
  if (toast.length !== 1) offenders.push(`toast.tsx: expected exactly one close-button site, read ${toast.length}`);
  for (const { cls } of toast) {
    const hover = cls.match(/dark:hover:text-([a-z]+-\d+)/)?.[1];
    if (!hover) { offenders.push(`toast.tsx: no dark:hover:text- arm in "${cls}" (the hovered X is 1.05:1 on the dark card — the round's defining find)`); continue; }
    const r = ratioHex(v3(hover, "the toast hover ink"), TOAST_WASH_DARK);
    if (r < 3) offenders.push(`toast.tsx: dark:hover:text-${hover} vs the dark hover wash ${TOAST_WASH_DARK} = ${r.toFixed(2)}:1 (<3:1; neutral-100 clears at 15.59:1)`);
  }

  // F-3 — APP_FOOTER (page-layout.ts): the resting text must clear 4.5:1
  // against the footer's own dark bg, the link's hover arm 3:1. RED ships
  // a WHITE strip on every dark page (border-gray-200 bg-white text-gray-500).
  const footer = armsIn("src/lib/page-layout.ts", /border-gray-200 bg-white px-4/, "page-layout.ts (APP_FOOTER)");
  if (footer.length !== 1) offenders.push(`APP_FOOTER: expected one footer string, read ${footer.length}`);
  for (const { cls } of footer) {
    const bg = cls.match(/dark:bg-([a-z]+-\d+)/)?.[1];
    const text = cls.match(/(?:^|\s)dark:text-([a-z]+-\d+)/)?.[1];
    if (!bg || !text) { offenders.push(`APP_FOOTER: no dark:bg-/dark:text- pair in "${cls}" (a white strip on every dark page — the loudest possible island)`); continue; }
    const bgHex = v3(bg, "the footer's dark bg");
    const rText = ratioHex(v3(text, "the footer's dark ink"), bgHex);
    if (rText < 4.5) offenders.push(`APP_FOOTER: dark:text-${text} vs dark:bg-${bg} = ${rText.toFixed(2)}:1 (<4.5:1 text; neutral-400 on neutral-950 clears at 7.85:1)`);
  }
  const link = armsIn("src/lib/page-layout.ts", /hover:text-gray-800/, "page-layout.ts (the footer link)");
  if (link.length !== 1) offenders.push(`the footer link: expected one link string, read ${link.length}`);
  for (const { cls } of link) {
    const hover = cls.match(/dark:hover:text-([a-z]+-\d+)/)?.[1];
    if (!hover) { offenders.push(`the footer link: no dark:hover:text- arm in "${cls}"`); continue; }
    const r = ratioHex(v3(hover, "the footer link's hover ink"), v3("neutral-950", "the footer's dark bg"));
    if (r < 3) offenders.push(`the footer link: dark:hover:text-${hover} vs neutral-950 = ${r.toFixed(2)}:1 (<3:1; neutral-200 clears at 15.72:1)`);
  }
  expect(offenders, "F-2/F-3: the interaction ink must clear contrast IN THE STATE THE USER SEES IT — the hovered glyph and the dark footer").toEqual([]);
});

// ---- F-4: the nine module action arms -----------------------------------
it("WH-20 F-4: the module action arms' dark resting icons compute ≥3:1 against the dark row card (the Log-out button against its own blend)", () => {
  const offenders: string[] = [];
  const SITES = [
    "src/app/(app)/assignments/assignments-page.tsx",
    "src/app/(app)/events/events-page.tsx",
    "src/app/(app)/exercise/exercise-page.tsx",
    "src/app/(app)/goals/goals-page.tsx",
    "src/app/(app)/reminders/reminders-page.tsx",
    "src/app/(app)/routines/routines-page.tsx",
    "src/app/(app)/studyresources/studyresources-page.tsx",
  ] as const;
  for (const file of SITES) {
    // The red delete family + the routines emerald start: every site
    // that ships a palette text- arm with NO dark twin yet reads here.
    for (const { cls } of armsIn(file, /text-(?:red|emerald)-600 hover:bg-/, `${file} (the action buttons)`)) {
      const ink = darkArm(cls, "text");
      if (!ink) { offenders.push(`${file}: no dark:text- arm in "${cls}" (the resting icon rides the light-only red-600/emerald-600 — 3.13:1 marginal, the hover a red-50 light-island flash)`); continue; }
      const r = ratioHex(v3(ink, "the action icon"), ROW_CARD_DARK);
      if (r < 3) offenders.push(`${file}: dark:text-${ink} vs the dark row card = ${r.toFixed(2)}:1 (<3:1)`);
    }
  }
  // The Profile Log-out button — a full red-50 island in the dark
  // Session panel; its ink is read against the button's OWN blend.
  for (const { cls } of armsIn("src/app/(app)/profile/profile-page.tsx", /border-red-200 bg-red-50/, "profile-page.tsx (the Log-out button)")) {
    const ink = darkArm(cls, "text");
    const face = cls.match(/dark:bg-([a-z]+-\d+)(\/\d+)?/);
    if (!ink || !face) { offenders.push(`Log-out: no dark:text-/dark:bg- pair in "${cls}" (a red-50 island button in the dark Session panel)`); continue; }
    const over = face[2] ? Number(face[2].slice(1)) : 1;
    const bg = blend(v3(face[1]!, "the Log-out face"), over, ROW_CARD_DARK);
    const r = ratioHex(v3(ink, "the Log-out ink"), bg);
    if (r < 3) offenders.push(`Log-out: dark:text-${ink} vs the button's dark blend ${bg} = ${r.toFixed(2)}:1 (<3:1)`);
  }
  expect(offenders, "F-4: every module action icon must clear 3:1 in its resting state on the dark row surface — the state walks render empty lists, so no net ever read these").toEqual([]);
});

// ---- F-5: the reference-shared light rings — pinned, not cured ----------
it("WH-20 F-5: the light login ring is pinned AT its documented parity values (2.56 / 2.45) — the reference's own anatomy, byte-identical on both apps", () => {
  // The parity doctrine (the preset-axis precedent): the light ring is
  // the reference's one working focus surface — white 2px offset +
  // slate-400 2px, computed identically on both apps (probed). Deviating
  // would fork our login focus identity from the reference's own. The
  // pin asserts the MEASURED ratios stay exactly at the documented
  // ledger values: a change to the light arms forces the PAD §11 ledger
  // entry AND this pin to move together — never silently.
  const site = armsIn("src/lib/login-reset.ts", /focus:ring-slate-400/, "login-reset.ts (the light input ring)");
  expect(site.length, "the light ring site must still read (the anchor is the ring's light arm)").toBeGreaterThanOrEqual(1);
  const slate400 = v3("slate-400", "the light ring's ink");

  const rOffset = ratioHex(slate400, "#ffffff"); // the white ring-offset layer
  const rPage = ratioHex(slate400, v3("slate-50", "the light page wash"));
  expect(Math.abs(rOffset - 2.56), `the ring vs its white offset must stay pinned at the documented 2.56:1 (measured ${rOffset.toFixed(2)}:1) — reference-shared, per the parity doctrine`).toBeLessThan(0.005);
  expect(Math.abs(rPage - 2.45), `the ring vs the slate-50 page must stay pinned at the documented 2.45:1 (measured ${rPage.toFixed(2)}:1) — reference-shared, per the parity doctrine`).toBeLessThan(0.005);

  // The PAD §11 ledger must carry the entry (the lockstep leg).
  const pad = readFileSync(join(import.meta.dirname, "..", "Project_Architecture_Document.md"), "utf8");
  const row = pad.split("\n").find((l) => l.includes("Light login focus ring"));
  expect(row, "the PAD §11 ledger must carry the light login focus ring row (the F-5 parity entry)").toBeTruthy();
  expect(row!.includes("2.56") && row!.includes("2.45"), "the ledger row must carry both documented ratios (2.56 / 2.45)").toBe(true);
});

// ---- F-1 (WH-21): RETIRED at WH-25 ----------------------------------------
// The custom Checkbox this block pinned retired with its false premise:
// the WH-21 claim "the reference ships ZERO checkboxes, probed live"
// was written without opening the Preferences tab — the live read shows
// NATIVE bare input[type=checkbox] w-5 h-5 controls there. The
// CRM-chassis component, its dark-state cure, this arithmetic pin and
// the a11y (e) leg all shipped on the untested premise; the native form
// carries no custom fill/border/glyph to measure (the UA renders it,
// and the dark a11y walk passes it natively).

// ---- F-3 (WH-21): the mood tile's anatomy — the reference's own form ------
it("WH-21 F-3: the mood selector rides the reference's block-stacked tile anatomy (the fixed blue→cyan active pair, the faint gray inactive arms + our dark twins)", () => {
  // The reference's mood selector (probed live, 2026-10-31): a
  // grid grid-cols-2 md:grid-cols-5 gap-3 of BLOCK-STACKED tiles —
  // `p-4 rounded-2xl border-2 transition-all` (173×104 at the 1024
  // viewport, radius 16), emoji `text-4xl mb-2` (36px), label
  // `text-sm font-medium text-gray-700` (14px), inactive
  // `border-gray-200 hover:border-gray-300`, active
  // `bg-gradient-to-br from-blue-500 to-cyan-500 text-white
  // border-transparent shadow-lg scale-105`. Ours shipped 40px
  // rounded-full pills on the PRESET-THEMEABLE model (active
  // border-primary bg-primary/10 text-primary — 3.95:1 light / 3.59:1
  // dark at 14px, AA-failing AND the wrong theming model: the
  // reference's active tile is its fixed module-pair family, never
  // --primary). The white-ink AA failure of the active pair
  // (2.43:1 at the worst stop) is reference-shared — pinned in
  // tests/gradient-ink.test.ts, NOT cured here. The dark twins on the
  // inactive arms are OUR superset (the reference's light-only form is
  // its own broken-dark class); the label's dark:text-gray-400 is the
  // PAGE_HEADER.subtitle precedent pair. aria-pressed stays (our
  // semantics superset — the reference's tiles carry none).
  const src = readFileSync(join(import.meta.dirname, "..", "src", "app", "(app)", "mentalhealth", "mentalhealth-page.tsx"), "utf8");
  const ANATOMY: [string, string][] = [
    ["p-4 rounded-2xl border-2 transition-all", "the tile's own geometry (the reference's block-stacked tile, not a pill)"],
    ["bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-transparent shadow-lg scale-105", "the active tile (the reference's FIXED module pair + white ink — never the preset-themeable primary)"],
    ["border-gray-200 hover:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600", "the inactive tile (the reference's faint gray arms + our dark twins)"],
    ["grid grid-cols-2 md:grid-cols-5 gap-3", "the tile grid (the reference's 2-col mobile / 5-col desktop form)"],
    ["text-4xl mb-2", "the emoji glyph (36px, block-stacked)"],
    ["text-sm font-medium text-gray-700", "the label (14px, the reference's gray-700 ink)"],
    ["dark:text-gray-400", "the label's dark pair (the PAGE_HEADER.subtitle precedent — the superset over the reference's light-only form)"],
  ];
  const missing = ANATOMY.filter(([cls]) => !src.includes(cls)).map(([, why]) => why);
  expect(
    missing,
    "the mood selector must ride the reference's tile anatomy — every decoded member present (the WH-21 F-3 cure; the 40px pill form was both an AA failure and the wrong theming model)",
  ).toEqual([]);
  // The old pill form must be gone.
  expect(src.includes("rounded-full border px-4"), "the old 40px rounded-full pill form must be retired (the reference ships tiles)").toBe(false);
  expect(src.includes('aria-pressed={mood === m.value}'), "the tiles keep aria-pressed (our semantics superset over the reference's unlabelled state)").toBe(true);
});
