import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import { COLOR_PRESETS } from "../src/lib/constants";

/** WH-19 (F-2): the preset-axis arithmetic pin. The brand family rides
 * white ink (`text-white`, computed #ffffff) on the preset gradient
 * (135deg, --primary → --secondary) — the active nav pill, the wordmark,
 * the badge tile, the mobile/drawer titles. Measured for the first time
 * at WH-19: ALL 8 presets fail WCAG AA (4.5:1) at the worst stop. The
 * WH-18 ledger documented only "Golden Yellow ≈1.8:1" — the entry
 * understated the class by seven presets (Forest Green is 1.98, Ocean
 * Blue 2.77). The class is reference-shared (the catalog is
 * byte-identical, the engine is the reference's own) → per the WH-18
 * parity doctrine: documented, NOT cured. This pin computes the table
 * from COLOR_PRESETS at runtime and asserts the PAD §11 ledger carries
 * the same numbers — a preset value change anywhere forces the ledger
 * and this pin to move together (the WH-10 "pin the arithmetic"
 * doctrine: the ledger cannot silently understate the class again). */

// WCAG 2.x relative luminance + contrast ratio (the same math the
// live probe used — scripts/preset-contrast.ts, the round's audit
// evidence; the pure form lives here so the pin is self-contained).
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

const WHITE_LUM = lum("#ffffff"); // the brand family's text-white, computed #ffffff

/** The worst-stop ratio per preset: white ink on the gradient's darker
 * moment — the conservative measure for a gradient surface (the worst
 * stop governs; the interpolated midpoints can only sit between). */
function worstStopRatio(primary: string, secondary: string) {
  return Math.min(ratio(WHITE_LUM, lum(primary)), ratio(WHITE_LUM, lum(secondary)));
}

it("WH-19: the preset-axis contrast table — all 8 presets measured, the PAD ledger carrying the same numbers (the arithmetic pin)", () => {
  const computed = COLOR_PRESETS.map((p) => ({
    label: p.label,
    ratio: worstStopRatio(p.primary, p.secondary),
  }));

  // The documented table (PAD §11) — the exact numbers the ledger entry
  // carries. Rounded to 2 decimals, the live probe's precision.
  const documented: Record<string, number> = {
    "Indigo Dream": 3.96,
    "Ocean Blue": 2.77,
    "Forest Green": 1.98,
    "Sunset Orange": 2.8,
    "Rose Pink": 3.53,
    "Royal Purple": 4.23,
    "Crimson Red": 2.8,
    "Golden Yellow": 1.92,
  };

  for (const { label, ratio: r } of computed) {
    expect(
      Math.abs(r - documented[label]),
      `${label}: the computed worst-stop ratio (${r.toFixed(2)}) must equal the documented table (${documented[label]}) — if COLOR_PRESETS changed, the PAD ledger entry and this pin move in the SAME commit`,
    ).toBeLessThan(0.005);
    expect(
      r,
      `${label}: the reference-shared preset contrast class — every preset must stay documented as AA-failing (all 8 fail 4.5:1 at the worst stop; if a value change makes one pass, the ledger entry and this pin's class claim move together)`,
    ).toBeLessThan(4.5);
  }

  // The lockstep: the PAD §11 ledger entry must carry the full measured
  // table — the WH-18 entry understated the class as "Golden Yellow
  // ≈1.8:1" only; this scan cannot leave the ledger behind again.
  const pad = readFileSync(join(import.meta.dirname, "..", "Project_Architecture_Document.md"), "utf8");
  const presetRow = pad.split("\n").find((l) => l.includes("Preset white-on-gradient contrast"));
  expect(presetRow, "the PAD §11 ledger must carry the preset white-on-gradient row").toBeTruthy();
  for (const { label } of computed) {
    expect(
      presetRow!.includes(label),
      `the PAD preset row must name ${label} — the ledger carries the full 8-preset table, not a single-patient summary`,
    ).toBe(true);
  }
  for (const [, v] of Object.entries(documented)) {
    const spelled = v === 2.8 ? "2.80" : v.toFixed(2);
    expect(
      presetRow!.includes(spelled),
      `the PAD preset row must carry the measured ${spelled} ratio`,
    ).toBe(true);
  }
});
