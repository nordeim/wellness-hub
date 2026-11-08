// WH-90 (F-1): the clean-account contract — the theme-axis extension of
// the WH-25 capture-state doctrine.
//
// The round's finding: the WH-89 surgical 19 re-capture's dark flip (the
// procedure's own context-B state reproduction — fresh seed, one login,
// the dark flip through the real UI) left themeMode="dark" on the demo
// account's UserPrefs row as the round's LAST prefs write (updatedAt
// 00:55:56 UTC Nov 8, after the main 34-file run's ~00:52 landing), and
// the seed's idempotent wipe never touched UserPrefs — the residue rode
// through `bun run db:seed` (the WH-25 doctrine's own cure command) into
// this round, where the parity battery's logged-in legs read our DARK
// computed tokens against the reference's LIGHT faces (moodForm 3 + shell
// 5 false drifts, every value the .dark family: --color-line #27272a,
// --color-muted #a1a1aa, --color-sidebar-foreground #d4d4d8,
// --color-neutral-700 #404040, --color-gray-400 #9ca3af — against the
// reference's gray-200/gray-500/zinc-700/line light set). The e2e and
// smoke gates never saw it (db/e2e.db + db/smoke.db are isolated; the
// census counts rows, not prefs) — the battery caught it, as designed.
//
// This suite pins the cure at the SOURCE level (the seed and the capture
// script are executable scripts, not importable modules — the fs-read
// pattern the seed-parity and route-census pins own): (a) the seed's
// wipe block resets the demo account's UserPrefs row, so `bun run
// db:seed` restores the clean account the WH-25 doctrine promises (the
// prefs seam's lazy create at GET /api/prefs rebuilds the schema
// defaults — themeMode "light"); (b) the capture procedure asserts the
// light state before the light set, the same early-fail guard the
// badgesEarned assertion established at WH-29 — a dirty theme state can
// never again silently corrupt a capture round.

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const REPO_ROOT = join(import.meta.dirname, "..");
const SEED = readFileSync(join(REPO_ROOT, "prisma", "seed.ts"), "utf8");
const CAPTURE = readFileSync(join(REPO_ROOT, "scripts", "capture-round.mjs"), "utf8");

const DEMO_EMAIL = "sepnetflix2023@outlook.com";

describe("WH-90 F-1: the clean-account contract (the theme axis)", () => {
  it("the seed resets the demo account's UserPrefs — the re-seed restores the clean account on the theme axis", () => {
    // the wipe block carries the demo-account UserPrefs reset (the WH-89
    // residue's cure: a dark flip from any capture reproduction used to
    // ride through every re-seed on the row the wipe never touched)
    expect(
      SEED,
      "the seed's wipe deletes the demo account's UserPrefs row",
    ).toMatch(/db\.userPrefs\.deleteMany\(\s*\{\s*where:\s*\{\s*user:\s*\{\s*email:\s*"sepnetflix2023@outlook\.com",?\s*\},?\s*\},?\s*\},?\s*\);/);
  });

  it("the capture procedure asserts themeMode=light before the light set — the badgesEarned guard's theme-axis sibling", () => {
    // the guard reads the prefs seam and fails closed on a dirty theme
    expect(CAPTURE, "the capture script reads the prefs seam for the theme state").toMatch(
      /fetch\("\/api\/prefs"\)/,
    );
    expect(CAPTURE, "the guard asserts the light state").toMatch(/themeMode/);
    expect(CAPTURE, "the guard fails closed with the doctrine's cure message").toMatch(
      /CAPTURE-STATE DOCTRINE FAILED: themeMode=/,
    );
    // the guard must sit inside the clean-account assertion block, BEFORE
    // the light set flies (the phase-1 logged-out captures) — the same
    // position doctrine as the badgesEarned assertion
    const guardPos = CAPTURE.indexOf("CAPTURE-STATE DOCTRINE FAILED: themeMode=");
    const badgesPos = CAPTURE.indexOf("CAPTURE-STATE DOCTRINE FAILED: badgesEarned=");
    const lightSetPos = CAPTURE.indexOf('snap(page, "01-login")');
    expect(guardPos, "the theme guard exists").toBeGreaterThan(-1);
    expect(badgesPos, "the badges guard exists").toBeGreaterThan(-1);
    expect(guardPos, "the theme guard lands before the light set").toBeLessThan(lightSetPos);
  });
});
