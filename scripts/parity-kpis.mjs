// The parity net's SEVENTH SURFACE (WH-41, F-2 — the WH-40 plan's
// suggested-next (c), the "module KPI rows" candidate): the
// MODULE_KPI record family — the non-dashboard pages' stat rows (the
// 3-tile `grid gap-6` rows with their big tinted right icons + the
// hero gradient tiles) plus the LANDSCAPE fact itself (which of the
// ten non-dashboard pages render a KPI row at all).
//
// The two-clocks gap it closes: the WH-23 card-geometry census pins
// OUR KPI source forms (the MODULE_KPI + PAGE_KPI_GRIDS + STAT_CARD
// records' strings + the five consumer pages' authored tints) and the
// watch's per-page surfaces pin the reference's empty-state faces —
// but the KPI rows' computed CHROME (the tile interiors, the hero
// gradients, the big icons, the grid geometry) had never been diffed
// same-round live-vs-live as a family. The DATA values ride as-is
// (the parity-dashboard doctrine): the demo accounts share the zero
// state AND the one-entry mood state, so a data drift is a finding to
// decode, not a normalization.
//
//   node scripts/parity-kpis.mjs      (our dev server must be up)
//
// PASS A (the reference, ONE login): the 10 non-dashboard pages at
//   1280x900 → the member read. PASS B (our dev server, ONE login
//   likewise): the same read. Then the DIFF: every member compared
//   ref-vs-ours.
//
// DECODE PROVENANCE (WH-41, probed live on BOTH apps before this
// script was written): the landscape is a parity fact — exactly FIVE
// of the ten pages render a KPI row on BOTH apps (exercise: the
// orange→red hero + 2 plain; mentalhealth: the emerald→teal hero + 2
// plain; assignments: 1 plain + the green→emerald hero + 1 plain;
// reminders: all 3 plain; goals: the yellow→amber hero + 2 plain)
// and FIVE render none on both (routines, events, studyresources,
// learning, profile — the absence pins are MEMBERS: a KPI row
// appearing or disappearing on either app fires). Every scalar member
// is byte-identical across the two apps or a member of exactly two
// KNOWN classes:
//   (1) the lesson-40 gradient stop-triples class (the hero tiles:
//       the reference serializes `linear-gradient(to right bottom,
//       rgb(a, b, c), rgb(d, e, f))` vs our v4's
//       `linear-gradient(to right bottom in oklab, rgb(a, b, c) 0%,
//       rgb(d, e, f) 100%)` — the rgb triples are the parity claim,
//       the moodForm/dashboard precedent verbatim);
//   (2) the lesson-40 shadow var-chain zero-layers class (the
//       reference's CDN emits two rgba(0,0,0,0) zero-layers before
//       the real `rgba(0,0,0,0.1) 0px 10px 15px -3px` +
//       `rgba(0,0,0,0.1) 0px 4px 6px -4px` pair; our build-time v4
//       emits four zero-layers before the same real pair) — compared
//       via the real-layers filter (the parity-dashboard precedent,
//       verbatim).
// The 48x48 SVG anchor is the MODULE_KPI.bigIcon signature — nothing
// else on the walked pages renders a 48px icon (decode-verified on
// both apps; the sidebar icons are 16px, the brand/avatar icons 20
// and 40px, the mood-form tiles carry no icons).
//
// ZERO-WRITE on both apps (login + read only, nothing clicked).
// Exit 0 when every member matches; exit 1 on any DRIFT or
// PROBE-ERROR — a drift is a FINDING for the round's plan (the
// lesson-41 live-fact class: investigate, never a silent re-base).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const DEV = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

// The ten non-dashboard pages. hasKpi = the decode-settled landscape
// fact (WH-41: exactly exercise, mentalhealth, assignments, reminders
// and goals render a KPI row on both apps; the other five render none
// — the absence pins are members of this surface).
const PAGES = [
  { key: "routines", route: "/Routines", hasKpi: false },
  { key: "exercise", route: "/Exercise", hasKpi: true },
  { key: "mentalhealth", route: "/MentalHealth", hasKpi: true },
  { key: "assignments", route: "/Assignments", hasKpi: true },
  { key: "events", route: "/Events", hasKpi: false },
  { key: "studyresources", route: "/StudyResources", hasKpi: false },
  { key: "reminders", route: "/Reminders", hasKpi: true },
  { key: "learning", route: "/Learning", hasKpi: false },
  { key: "goals", route: "/Goals", hasKpi: true },
  { key: "profile", route: "/Profile", hasKpi: false },
];

const results = [];
const report = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "MATCH " : "DRIFT "} ${member}: ${detail}`);
};
const probe = async (fn) => {
  try {
    return await fn();
  } catch (e) {
    return { __error: String(e).slice(0, 200) };
  }
};

/** SPA-safe navigation — the watch's gotoApp form, verbatim. */
const gotoApp = async (page, base, route) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector("main", { timeout: 20000 });
  await page.waitForTimeout(1100);
};

/** One app's full pass: login → the 10 pages (1280x900) → the read.
 *  The read returns RAW computed strings; every normalization runs in
 *  the diff phase (Node-side), one implementation for both apps. */
const runPass = async (page, base) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login");
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 20000 });
  await page.waitForTimeout(1200);

  const out = {};
  for (const p of PAGES) {
    await gotoApp(page, base, p.route);
    out[p.key] = await page.evaluate(() => {
      const vis = (el) => el && el.offsetParent !== null;
      // the KPI anchor: a visible SVG rendered at 48x48
      // (MODULE_KPI.bigIcon — the family's signature)
      const icons = Array.from(document.querySelectorAll("svg")).filter((s) => {
        if (!vis(s)) return false;
        const r = s.getBoundingClientRect();
        return Math.round(r.width) === 48 && Math.round(r.height) === 48;
      });
      if (icons.length === 0) return { kpi: false };
      const cs = (el, props) => {
        const c = getComputedStyle(el);
        return Object.fromEntries(props.map((p) => [p, c[p]]));
      };
      const tiles = icons.map((icon) => {
        // the row: the icon's nearest flex ancestor
        let row = icon.parentElement;
        while (row && getComputedStyle(row).display !== "flex") row = row.parentElement;
        // the tile: walk up until a real background/shadow (the hero
        // gradient or the STAT_CARD white card) — the wrap (p-6 pt-6)
        // carries none
        let tile = row;
        while (tile && tile !== document.body) {
          const c = getComputedStyle(tile);
          const hasBg =
            c.backgroundImage !== "none" ||
            (c.boxShadow && c.boxShadow !== "none") ||
            (c.backgroundColor && c.backgroundColor !== "rgba(0, 0, 0, 0)");
          if (hasBg) break;
          tile = tile.parentElement;
        }
        const wrap = row.parentElement; // p-6 pt-6 between tile and row
        const label = row.querySelector("p");
        const value = row.querySelector("h1,h2,h3,h4");
        return {
          tile,
          data: {
            iconColor: cs(icon, ["color"]).color,
            label: label ? label.textContent.trim() : null,
            labelFs: label ? cs(label, ["fontSize"]).fontSize : null,
            labelMb: label ? cs(label, ["marginBottom"]).marginBottom : null,
            labelColor: label ? cs(label, ["color"]).color : null,
            value: value ? value.textContent.trim() : null,
            valueFs: value ? cs(value, ["fontSize"]).fontSize : null,
            valueFw: value ? cs(value, ["fontWeight"]).fontWeight : null,
            valueLh: value ? cs(value, ["lineHeight"]).lineHeight : null,
            valueColor: value ? cs(value, ["color"]).color : null,
            tileBg: cs(tile, ["backgroundImage"]).backgroundImage,
            tileBgColor: cs(tile, ["backgroundColor"]).backgroundColor,
            tileShadow: cs(tile, ["boxShadow"]).boxShadow,
            tileRadius: cs(tile, ["borderRadius"]).borderRadius,
            tileBorder: cs(tile, ["borderWidth"]).borderWidth,
            wrapP: cs(wrap, ["padding"]).padding,
            rowDisplay: cs(row, ["display"]).display,
            rowAlign: cs(row, ["alignItems"]).alignItems,
            rowJustify: cs(row, ["justifyContent"]).justifyContent,
          },
        };
      });
      // the grid container: the first tile's parent
      const grid = tiles[0].tile ? tiles[0].tile.parentElement : null;
      const gcs = grid ? getComputedStyle(grid) : null;
      return {
        kpi: true,
        grid: gcs
          ? { display: gcs.display, cols: gcs.gridTemplateColumns, gap: gcs.columnGap }
          : null,
        tiles: tiles.map((t) => t.data),
      };
    });
  }
  return out;
};

// ---------- the normalizers (Node-side) ----------
/** The real-layers shadow filter — the lesson-40 var-chain zero-layers
 *  class (the parity-dashboard precedent, verbatim): our build-time v4
 *  emits the zero-alpha var-chain layers before the real pair; the
 *  reference's CDN emits fewer of them. The member is the REAL layer
 *  list. */
const realLayers = (s) =>
  String(s || "")
    .split(/,\s*(?=[a-z])/)
    .filter((l) => !/rgba\(\d+, \d+, \d+, 0\)/.test(l))
    .join(", ");

/** The gradient stop-triples normalizer — the lesson-40 color class
 *  (the moodForm/dashboard precedent): the two platforms serialize the
 *  interpolation space and the stop markers differently (`to right
 *  bottom,` vs `to right bottom in oklab,` + `0%`/`100%`); the rgb
 *  stop TRIPLES are the parity claim. */
const gradientStops = (s) =>
  String(s || "")
    .match(/rgb\(\d+, \d+, \d+\)/g)
    ?.join(" → ") ?? String(s || "");

// ---------- the passes ----------
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

console.log("--- PASS A: the reference (one login) ---");
const ref = await probe(() => runPass(page, REF));
if (ref.__error) {
  console.log(`PROBE-ERROR reference: ${ref.__error}`);
  await browser.close();
  process.exit(1);
}

console.log("--- PASS B: our dev server (one login) ---");
const ours = await probe(() => runPass(page, DEV));
if (ours.__error) {
  console.log(`PROBE-ERROR ours: ${ours.__error}`);
  await browser.close();
  process.exit(1);
}
await browser.close();

// ---------- the live-vs-live diff ----------
console.log("--- the member diff (reference vs ours, same round) ---");
for (const p of PAGES) {
  const a = ref[p.key];
  const b = ours[p.key];
  // the landscape pin (the absence pages are members)
  report(
    `${p.key}.landscape`,
    a.kpi === b.kpi && a.kpi === p.hasKpi,
    a.kpi ? `${b.tiles?.length ?? "?"} tiles (ref ${a.tiles.length})` : "no KPI row (the absence pin)",
  );
  if (!a.kpi || !b.kpi) continue;

  // the grid container
  for (const m of ["display", "cols", "gap"]) {
    const av = a.grid?.[m];
    const bv = b.grid?.[m];
    report(`${p.key}.grid.${m}`, av === bv, av === bv ? `${av}` : `ref ${av} vs ours ${bv}`);
  }
  // the tile count
  report(
    `${p.key}.tileCount`,
    a.tiles.length === b.tiles.length,
    `${b.tiles.length} (ref ${a.tiles.length})`,
  );

  const per = Math.min(a.tiles.length, b.tiles.length);
  for (let i = 0; i < per; i++) {
    const at = a.tiles[i];
    const bt = b.tiles[i];
    const scalars = [
      "iconColor",
      "label",
      "labelFs",
      "labelMb",
      "labelColor",
      "value",
      "valueFs",
      "valueFw",
      "valueLh",
      "valueColor",
      "tileBgColor",
      "tileRadius",
      "tileBorder",
      "wrapP",
      "rowDisplay",
      "rowAlign",
      "rowJustify",
    ];
    for (const m of scalars) {
      const av = at[m];
      const bv = bt[m];
      report(`${p.key}.t${i + 1}.${m}`, av === bv, av === bv ? `${av}` : `ref ${av} vs ours ${bv}`);
    }
    // the hero gradient: the stop triples, never the full string
    const ag = gradientStops(at.tileBg);
    const bg = gradientStops(bt.tileBg);
    report(
      `${p.key}.t${i + 1}.tileBgStops`,
      ag === bg,
      ag === bg ? (at.tileBg === "none" ? "none" : `stops ${ag}`) : `ref ${ag} vs ours ${bg}`,
    );
    // the shadow: the real layers only
    const as = realLayers(at.tileShadow);
    const bs = realLayers(bt.tileShadow);
    report(
      `${p.key}.t${i + 1}.tileShadowReal`,
      as === bs,
      as === bs ? as : `ref ${as} vs ours ${bs}`,
    );
  }
}

const bad = results.filter((r) => !r.ok).length;
console.log(
  `\nPARITY-KPIS RESULT: ${results.length - bad}/${results.length} members MATCH (both apps, same round)`,
);
process.exit(bad > 0 ? 1 : 0);
