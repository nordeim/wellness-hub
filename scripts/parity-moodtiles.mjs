// parity-moodtiles.mjs — the SEVENTEENTH committed parity surface
// (WH-51): the mood form's NON-DEFAULT tile SELECTED states — the
// five-state selector's PER-MOOD active gradients, the round's core
// drift (four of the five pairs shipped wrong through twenty-six green
// rounds: every standing surface read the DEFAULT-selected Good tile
// only — the watch's moodForm leg, parity-moodform's "no click"
// doctrine, the e2e (f) leg, all three pinning the SAME default face).
//
//   node scripts/parity-moodtiles.mjs   (our dev server must be up)
//
// PASS A (ONE reference login — the same budget the watch spends):
//   /MentalHealth's New Entry form, the AT-REST read (Good
//   pre-selected), then EACH of the five tiles clicked in turn with its
//   active face read, then Cancel.
// PASS B (ONE our-side login, the demo credentials against
//   localhost:3000): the same read on OUR dev server.
// Then the DIFF: every member compared ref-vs-ours.
//
// ZERO-WRITE doctrine (enforced on BOTH apps): a tile click sets CLIENT
//   STATE only (nothing persists until Save Entry — never clicked); the
//   form closes via Cancel; the close is asserted (the form left the
//   DOM). The energy slider and every other field are never touched.
//
// THE MEMBER SET (~67): per tile (×5) — the active gradient STOP
//   TRIPLES (the lesson-40 convention: the two rgb triples present in
//   the serialized backgroundImage; the platforms' oklab/`%`-hint
//   differences are the known serialization class), the white ink, the
//   2px transparent border, the shadow-lg REAL LAYERS (the two
//   non-zero-alpha layers — the lesson-40 real-layers convention), the
//   EFFECTIVE 1.05 lift (ours the v4 `scale` property, the reference's
//   CDN transform matrix — the is-lift normalization, the WH-21
//   pipeline class), the label's color/fs/weight (the LAST element
//   child — ours a span, the reference's a div, tag-agnostic per the
//   lesson-27/48 vocabulary), the icon fs (the FIRST element child),
//   the rect (181×109) + the AT-REST family (the five-tile count, the
//   default-active Good tile's text + pair, the inactive border
//   gray-200, the inactive ink, the inactive bg none) + the zero-write
//   close proof.
//
// DOM-SHAPE FACTS (decoded live, zero rendered-face consequence — the
//   lesson-27/48 class, documented not cured): the tile children —
//   ours spans, the reference's DIVs; the aria-pressed state attribute
//   is OUR semantics superset (the reference's tiles carry none).
//
// Exit 0 when every member matches; exit 1 on any DRIFT or
// PROBE-ERROR — a drift is a FINDING for the round's plan (the
// lesson-41 live-fact class: investigate, never a silent re-base).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const OURS = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const results = [];
const report = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "MATCH " : "DRIFT "} ${member}: ${detail}`);
};

const gotoApp = async (page, base, route, { sel = "main", settleMs = 900 } = {}) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector(sel, { timeout: 15000 });
  await page.waitForTimeout(settleMs);
};

/** The five-tile read — the SAME evaluate payload serves both apps
 * (every locator is face-identical: the shadow-xl card walk from the
 * range input, the grid-cols-2 grid, the button tiles). */
const readTiles = async (page) => {
  const rest = await page.evaluate(() => {
    const range = document.querySelector("input[type='range']");
    if (!range) return { error: "no range (form not open?)" };
    let card = range;
    while (card && card !== document.body) {
      if ((card.getAttribute("class") || "").includes("shadow-xl")) break;
      card = card.parentElement;
    }
    const grid = card.querySelector("div[class*='grid-cols-2']");
    const tiles = grid ? Array.from(grid.querySelectorAll("button")) : [];
    const active = tiles.find((t) => (getComputedStyle(t).backgroundImage || "").includes("gradient"));
    const inactive = tiles.find((t) => t !== active);
    return {
      count: tiles.length,
      activeText: active?.textContent.replace(/\s+/g, "").trim() ?? null,
      activeBg: active ? getComputedStyle(active).backgroundImage : null,
      inactiveBorder: inactive ? getComputedStyle(inactive).borderColor : null,
      inactiveInk: inactive ? getComputedStyle(inactive).color : null,
      inactiveBg: inactive ? getComputedStyle(inactive).backgroundImage : null,
    };
  });
  if (rest.error) return rest;

  const tiles = [];
  const count = rest.count ?? 0;
  for (let i = 0; i < count; i++) {
    await page.locator("div[class*='grid-cols-2'] button").nth(i).click();
    await page.waitForTimeout(350);
    const face = await page.evaluate((idx) => {
      const range = document.querySelector("input[type='range']");
      let card = range;
      while (card && card !== document.body) {
        if ((card.getAttribute("class") || "").includes("shadow-xl")) break;
        card = card.parentElement;
      }
      const grid = card.querySelector("div[class*='grid-cols-2']");
      const t = Array.from(grid.querySelectorAll("button"))[idx];
      if (!t) return { error: `tile[${idx}] not found` };
      const kids = Array.from(t.children);
      const labelEl = kids[kids.length - 1];
      const iconEl = kids[0];
      // the is-lift normalization: v4's scale property (ours) vs the
      // CDN's transform matrix (the reference's) — read whichever owns
      // the 1.05
      const s = getComputedStyle(t);
      let lift = "none";
      if (s.scale && s.scale !== "none") lift = s.scale;
      else if (s.transform && s.transform !== "none") {
        const m = s.transform.match(/matrix\(([\d.]+),/);
        lift = m ? m[1] : s.transform;
      }
      // the shadow's REAL layers (non-zero-alpha) — the real-layers
      // normalization (the platforms pad differently with zero layers)
      const realLayers = (s.boxShadow || "none")
        .split(/,(?![^(]*\))/)
        .map((l) => l.trim())
        .filter((l) => !/rgba\(0, 0, 0, 0\)/.test(l))
        .join(", ");
      const r = t.getBoundingClientRect();
      return {
        text: (t.textContent || "").replace(/\s+/g, " ").trim(),
        bg: s.backgroundImage,
        ink: s.color,
        border: s.borderColor,
        borderW: s.borderWidth,
        shadow: realLayers,
        lift,
        labelColor: labelEl ? getComputedStyle(labelEl).color : null,
        labelFs: labelEl ? getComputedStyle(labelEl).fontSize : null,
        labelWeight: labelEl ? getComputedStyle(labelEl).fontWeight : null,
        iconFs: iconEl ? getComputedStyle(iconEl).fontSize : null,
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    }, i);
    if (face.error) return { error: face.error };
    tiles.push(face);
  }

  // zero-write: Cancel + assert the form left the DOM
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await page.waitForTimeout(400);
  const closed = await page.evaluate(() => document.querySelector("input[type='range']") === null);
  return { rest, tiles, closed };
};

const runPass = async (page, base) => {
  await gotoApp(page, base, "/login", { sel: "h1" });
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 15000 });
  await page.waitForTimeout(1200);
  await gotoApp(page, base, "/MentalHealth");
  await page.locator("main button", { hasText: /New Entry/i }).first().click();
  await page.waitForSelector("text=How are you feeling today?", { timeout: 8000 });
  await page.waitForTimeout(450);
  return readTiles(page);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const passes = [];
for (const [label, base] of [
  ["A: the reference", REF],
  ["B: our dev server", OURS],
]) {
  console.log(`--- PASS ${label} (one login) ---`);
  let read;
  try {
    read = await runPass(page, base);
  } catch (e) {
    console.log(`PROBE-ERROR ${label}: ${String(e).slice(0, 200)}`);
    await browser.close();
    process.exit(1);
  }
  if (read.error) {
    console.log(`PROBE-ERROR ${label}: ${read.error}`);
    await browser.close();
    process.exit(1);
  }
  if (!read.closed) {
    console.log(`PROBE-ERROR ${label}: the form did not close via Cancel (the zero-write proof)`);
    await browser.close();
    process.exit(1);
  }
  console.log(
    `${label}: ${read.rest.count} tiles, at-rest active "${read.rest.activeText}", closed=${read.closed}`,
  );
  passes.push(read);
}
const [ref, ours] = passes;

// ---------- the live-vs-live diff ----------
console.log("--- the member diff (reference vs ours, same round) ---");
// the at-rest family — the default-active gradient compares its STOP
// TRIPLES (the lesson-40 serialization class: the reference's CDN emits
// `to right bottom` bare, our v4 emits `in oklab` + `%` hints; the rgb
// stops are the parity claim — the same normalization the per-tile
// bgStops members ride)
const stopsOf = (bg) => (bg.match(/rgb\(\d+, \d+, \d+\)/g) || []).slice(0, 2);
const restMembers = ["count", "activeText", "inactiveBorder", "inactiveInk", "inactiveBg"];
for (const m of restMembers) {
  const a = ref.rest[m];
  const b = ours.rest[m];
  report(`rest.${m}`, a === b, a === b ? `${a}` : `ref ${a} vs ours ${b}`);
}
{
  const sa = stopsOf(ref.rest.activeBg || "");
  const sb = stopsOf(ours.rest.activeBg || "");
  const ok =
    sa.length === 2 && sb.length === 2 && sa.every((s) => sb.includes(s));
  report(
    "rest.activeBgStops",
    ok,
    ok ? `stops ${sa.join(" → ")}` : `ref [${sa}] vs ours [${sb}]`,
  );
}
// the five active faces
const n = Math.min(ref.tiles.length, ours.tiles.length);
if (ref.tiles.length !== ours.tiles.length) {
  report("tileCount", false, `ref ${ref.tiles.length} vs ours ${ours.tiles.length}`);
}
for (let i = 0; i < n; i++) {
  const a = ref.tiles[i];
  const b = ours.tiles[i];
  if (!a || !b) {
    report(`tile[${i}].present`, false, "missing tile read");
    continue;
  }
  // the stop triples: both rgb triples present in the serialized string
  const sa = stopsOf(a.bg);
  const sb = stopsOf(b.bg);
  report(
    `tile[${i}].bgStops`,
    sa.length === 2 && sb.length === 2 && sa.every((s) => sb.includes(s)) && a.text === b.text,
    sa.length === 2 && sb.length === 2 && sa.every((s) => sb.includes(s))
      ? `${a.text} stops ${sa.join(" → ")}`
      : `${a.text} ref [${sa}] vs ours [${sb}]`,
  );
  for (const m of ["ink", "border", "borderW", "shadow", "lift", "labelColor", "labelFs", "labelWeight", "iconFs", "w", "h"]) {
    const ok = a[m] === b[m];
    report(`tile[${i}].${m}`, ok, ok ? `${a[m]}` : `ref ${a[m]} vs ours ${b[m]}`);
  }
}
// the zero-write close (both apps)
report("closed", ref.closed && ours.closed, "both forms closed via Cancel");

await browser.close();
const bad = results.filter((r) => !r.ok).length;
console.log(
  bad === 0
    ? `PARITY-MOODTILES RESULT: ${results.length}/${results.length} members MATCH (both apps, same round)`
    : `PARITY-MOODTILES RESULT: ${bad} DRIFT of ${results.length} members — investigate (one of the two apps moved this round)`,
);
process.exit(bad === 0 ? 0 : 1);
