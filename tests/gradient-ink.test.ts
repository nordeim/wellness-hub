import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import { GRADIENT_BUTTON, PAGE_THEMES, ROUTINE_CATEGORY_GRADIENTS } from "../src/lib/page-layout";

/** WH-21 (F-4): the fixed-gradient white-ink arithmetic pin — the
 * preset-axis doctrine (WH-19's tests/preset-contrast.test.ts) applied to
 * the FIXED gradient family. The module pages' primary buttons, the routine
 * category buttons and the brand pair all ride white ink
 * (`text-white`) on their FIXED v3 gradient pairs (the pairs the preset
 * engine does NOT re-skin — verified live at WH-15: applying the
 * reference's Ocean Blue preset re-skinned its brand surfaces while its
 * Exercise button stayed orange→red). Measured for the first time at
 * WH-21: the ENTIRE family fails WCAG AA (4.5:1) at the worst stop —
 * goals 1.92:1 the worst — and every pair is byte-identical to the
 * reference's own buttons (its module-pair family) → per the parity
 * doctrine: documented, NOT cured. This pin computes the table from the
 * live records + the v3 palette pins at runtime and asserts the PAD §11
 * ledger carries the same numbers — a pair or value change anywhere
 * forces the ledger and this pin to move together (the WH-10 "pin the
 * arithmetic" doctrine, the preset-contrast precedent). */

// WCAG 2.x relative luminance + contrast ratio (the preset-contrast math).
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
const WHITE_LUM = lum("#ffffff");

/** The worst-stop ratio: white ink on the gradient's lighter moment — the
 * conservative measure for a gradient surface (the preset-contrast
 * doctrine: the worst stop governs). */
const worstStopRatio = (fromHex: string, toHex: string) =>
  Math.min(ratio(WHITE_LUM, lum(fromHex)), ratio(WHITE_LUM, lum(toHex)));

// ---- the v3 palette pins (globals.css @theme — the session-88 block) --
const css = readFileSync(join(import.meta.dirname, "..", "src", "app", "globals.css"), "utf8");
const V3 = new Map<string, string>();
for (const m of css.matchAll(/--color-([a-z]+-\d{3}): (#[0-9a-f]{6})/g)) {
  V3.set(m[1]!, m[2]!);
}
const v3 = (pair: string, why: string) => {
  const hex = V3.get(pair);
  expect(hex, `${why}: ${pair} must carry its v3 @theme pin in globals.css (the session-88 contract — add the pin in the same commit as the usage)`).toBeTruthy();
  return hex!;
};

/** The RESTING stops of a gradient class string (the hover:-prefixed -600
 * arms are the hover pair, not the resting surface). */
function stops(cls: string): { from: string; to: string } {
  const from = cls.match(/(?<!hover:)from-([a-z]+-\d+)/)?.[1];
  const to = cls.match(/(?<!hover:)to-([a-z]+-\d+)/)?.[1];
  expect(from && to, `a gradient pair must carry resting from-/to- stops (read "${cls}")`).toBeTruthy();
  return { from: from!, to: to! };
}

// The live family: the seven module buttons + the brand pair + the seven
// routine categories (the records the pages render; the mood tile's pair
// is pinned by the second test below — it lives inline in the page).
const FAMILY: { name: string; cls: string }[] = [
  ...Object.entries(PAGE_THEMES)
    .filter(([, t]) => t.button !== "")
    .map(([name, t]) => ({ name: `${name} (button)`, cls: t.button })),
  { name: "brand (GRADIENT_BUTTON)", cls: GRADIENT_BUTTON },
  ...Object.entries(ROUTINE_CATEGORY_GRADIENTS).map(([cat, cls]) => ({
    name: `routines ${cat}`,
    cls,
  })),
];

it("WH-21: the fixed-gradient white-ink table — every pair measured, all AA-failing, the PAD ledger carrying the same numbers (the arithmetic pin)", () => {
  expect(FAMILY.length, "the family must read its sixteen members (8 module buttons [the routines pair joined at WH-22 — the Schedule modal's primary] + the brand pair + 7 routine categories)").toBe(16);

  const computed = FAMILY.map(({ name, cls }) => {
    const { from, to } = stops(cls);
    return { name, r: worstStopRatio(v3(from, `${name}'s from-stop`), v3(to, `${name}'s to-stop`)) };
  });

  // The class claim: the WHOLE family fails AA at the worst stop. If a
  // value change makes a pair pass, the PAD ledger entry AND this class
  // claim move together — the family is reference-shared (byte-identical
  // buttons on both apps), so a unilateral re-pair would fork our module
  // identity from the reference's own.
  for (const { name, r } of computed) {
    expect(
      r,
      `${name}: white ink on the worst stop = ${r.toFixed(2)}:1 — the family's documented class is ALL-FAIL (<4.5:1, reference-shared); if this pair now passes, the PAD §11 row and this claim move in the SAME commit`,
    ).toBeLessThan(4.5);
  }

  // The lockstep: the PAD §11 ledger row must carry the full measured
  // table — the row cannot silently understate the family again (the
  // preset-contrast doctrine: the WH-18 ledger had documented only
  // "Golden Yellow ≈1.8:1" for a class of eight).
  const pad = readFileSync(join(import.meta.dirname, "..", "Project_Architecture_Document.md"), "utf8");
  const row = pad.split("\n").find((l) => l.includes("Fixed-gradient white-ink contrast"));
  expect(row, "the PAD §11 ledger must carry the fixed-gradient white-ink row (the WH-21 F-4 entry)").toBeTruthy();
  for (const { name, r } of computed) {
    const spelled = r.toFixed(2);
    expect(
      row!.includes(spelled),
      `the PAD fixed-gradient row must carry the measured ${spelled} ratio (the ${name} pair) — the ledger carries the full table, not a summary`,
    ).toBe(true);
  }
  expect(row!.includes("1.92"), "the row must name goals 1.92 — the family's worst pair").toBe(true);

  // ---- WH-23: the KPI hero labels — the family's -100-TINT members ----
  // The module hero tiles carry their -100 tint inks on the SAME fixed
  // pairs (probed live: text-orange-100 on the orange→red hero, etc.) —
  // a reference-shared low-contrast class the family row now names.
  // Measured from the live tints + the v3 pins: all four fail AA.
  const HERO_LABELS: { name: string; ink: string; from: string; to: string }[] = [
    { name: "exercise hero label", ink: "orange-100", from: "orange-500", to: "red-500" },
    { name: "mentalhealth hero label", ink: "emerald-100", from: "emerald-500", to: "teal-500" },
    { name: "assignments hero label", ink: "green-100", from: "green-500", to: "emerald-500" },
    { name: "goals hero label", ink: "yellow-100", from: "yellow-500", to: "amber-600" },
  ];
  for (const { name, ink, from, to } of HERO_LABELS) {
    const inkLum = lum(v3(ink, `${name}'s ink`));
    const r = Math.min(
      ratio(inkLum, lum(v3(from, `${name}'s from-stop`))),
      ratio(inkLum, lum(v3(to, `${name}'s to-stop`))),
    );
    expect(
      r,
      `${name}: the -100 tint on the worst stop = ${r.toFixed(2)}:1 — the family's tinted-ink class is ALL-FAIL (<4.5:1, reference-shared); if a pair now passes, the PAD §11 row and this claim move in the SAME commit`,
    ).toBeLessThan(4.5);
    expect(
      row!.includes(r.toFixed(2)),
      `the PAD fixed-gradient row must carry the measured ${r.toFixed(2)} ratio (the ${name}) — the ledger carries the full table`,
    ).toBe(true);
  }
});

it("WH-21: the mood tile's active pair — the reference's own blue→cyan + white ink, pinned AT its documented 2.43:1 (the parity doctrine, NOT a ≥4.5 assertion)", () => {
  // The reference's own active mood tile (probed live, 2026-10-31): the
  // FIXED blue→cyan gradient + white ink — its module-pair family, never
  // the preset-themeable --primary. White on the worst stop (cyan-500)
  // computes 2.43:1 — an AA failure for 14px text, but byte-identical to
  // the reference's own selector (the parity doctrine, the preset-axis
  // precedent): documented + pinned, NOT cured. Deviating would fork our
  // mood selector's identity from the reference's own. The pin asserts
  // the pair STAYS the reference's own stops AND the ratio stays pinned
  // at the documented value — a change to either forces the PAD §11 row
  // and this pin to move together.
  // WH-26: the pair moved into the MOOD_FORM record (page-layout.ts) —
  // the pin reads the RECORD + the page's consumption site (the WH-23
  // body-slice doctrine). And per the F-1 lesson (a pin asserts the
  // RENDERED LEAF, never the parent's arm): the active label's own
  // text-white arm is pinned here too — the WH-21 form asserted the
  // BUTTON's text-white while the label span's constant gray-700 rode
  // over it for five rounds (the label is state-conditional since the
  // WH-26 cure).
  const layout = readFileSync(join(import.meta.dirname, "..", "src", "lib", "page-layout.ts"), "utf8");
  const page = readFileSync(join(import.meta.dirname, "..", "src", "app", "(app)", "mentalhealth", "mentalhealth-page.tsx"), "utf8");
  const mfBlock = layout.match(/export const MOOD_FORM = \{([\s\S]*?)\n\} as const;/);
  const mfActive = mfBlock?.[1]?.match(/active:\s*"([^"]*)"/)?.[1] ?? "";
  const mfLabelActive = mfBlock?.[1]?.match(/labelActive:\s*"([^"]*)"/)?.[1] ?? "";
  const active = mfActive.match(/bg-gradient-to-br from-([a-z]+-\d+) to-([a-z]+-\d+) text-white/);
  expect(
    active,
    "the mood tile's active state must ride the reference's fixed gradient pair + white ink (from-blue-500 to-cyan-500 text-white — the module-pair family, never the preset-themeable primary)",
  ).toBeTruthy();
  expect(
    mfLabelActive.includes("text-white"),
    "the active tile's RENDERED label must carry its own text-white arm (the F-1 lesson: the button's arm never reaches the label span — the constant gray-700 label rendered GRAY on the gradient through five green rounds)",
  ).toBe(true);
  expect(
    page.includes("MOOD_FORM.labelActive : MOOD_FORM.labelInactive"),
    "the page must consume the label's STATE-CONDITIONAL pair (the record + the consumption site — the body-slice doctrine)",
  ).toBe(true);
  const r = worstStopRatio(v3(active![1]!, "the mood tile's from-stop"), v3(active![2]!, "the mood tile's to-stop"));
  expect(
    Math.abs(r - 2.43),
    `white on the tile's worst stop must stay pinned at the documented 2.43:1 (measured ${r.toFixed(2)}:1) — the reference's own AA-failing form, mirrored per the parity doctrine`,
  ).toBeLessThan(0.005);

  // The lockstep: the PAD row must carry the mood tile's number.
  const pad = readFileSync(join(import.meta.dirname, "..", "Project_Architecture_Document.md"), "utf8");
  const row = pad.split("\n").find((l) => l.includes("Fixed-gradient white-ink contrast"));
  expect(row, "the PAD §11 ledger must carry the fixed-gradient white-ink row (the mood tile rides the family row)").toBeTruthy();
  expect(
    row!.includes("mood tile") && row!.includes("2.43"),
    "the PAD row must name the mood tile and carry its measured 2.43",
  ).toBe(true);
});

it("WH-22: the Schedule modal's step circles — the reference's own solid purple-500 + white ink, pinned AT its documented 3.96:1 (the parity doctrine, NOT a ≥4.5 assertion)", () => {
  // The reference's Schedule steps number their tiles with SOLID
  // purple-500 circles + white ink (probed 2026-10-31 on two templates of
  // different categories — the FIXED module pair, never the category
  // gradient): white on purple-500 computes 3.96:1 at text-xs (12px
  // semibold — not large text), an AA failure for the number. Byte-
  // identical to the reference's own circle → per the parity doctrine
  // (the family's own precedent): mirrored, documented in the PAD §11
  // family row, pinned here — NOT cured. The pin asserts the fill stays
  // the reference's own purple-500 AND the ratio stays pinned at the
  // documented value.
  const layout = readFileSync(join(import.meta.dirname, "..", "src", "lib", "page-layout.ts"), "utf8");
  const num = layout.match(/stepNum:\s*"([^"]*)"/)?.[1];
  expect(
    num,
    "SCHEDULE_MODAL.stepNum must exist and ride the reference's solid purple-500 + white ink (the FIXED module pair — verified on two different-category templates)",
  ).toBeTruthy();
  expect(num!.includes("bg-purple-500"), "the circle's fill is the fixed purple-500").toBe(true);
  expect(num!.includes("text-white"), "the circle's ink is white").toBe(true);
  const r = ratio(WHITE_LUM, lum(v3("purple-500", "the step circle's fill")));
  expect(
    Math.abs(r - 3.96),
    `white on the circle's fill must stay pinned at the documented 3.96:1 (measured ${r.toFixed(2)}:1) — the reference's own AA-failing form, mirrored per the parity doctrine`,
  ).toBeLessThan(0.005);

  // The lockstep: the PAD family row must name the step circle.
  const pad = readFileSync(join(import.meta.dirname, "..", "Project_Architecture_Document.md"), "utf8");
  const row = pad.split("\n").find((l) => l.includes("Fixed-gradient white-ink contrast"));
  expect(row, "the PAD §11 ledger must carry the fixed-gradient white-ink row").toBeTruthy();
  expect(
    row!.includes("step circle"),
    "the PAD row must name the Schedule modal's step circle (the solid-fill member of the family)",
  ).toBe(true);
});
