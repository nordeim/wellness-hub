// The parity net's FOURTH SURFACE (WH-38, F-2 — the WH-37 plan's
// suggested-next (d), the "dashboard stat-tile" candidate): the
// dashboard's stat-tile family — the app's MAIN FACE. The shell was
// chosen over this family at WH-37 for its data independence; the
// WH-37 F-2 seed cure removed that blocker (both demo accounts now
// carry the MIRRORED demo mood entry, so the tile DATA values are
// comparable by construction) and the shell surface's second
// consecutive quiet flight (WH-37's born-verification + the WH-38
// standing run) landed the widening's precondition.
//
// The two-clocks gap it closes: the watch's `dashboard` surface pins
// the REFERENCE's H1 + tile label/value presence against its ledger;
// our e2e pins label VISIBILITY + the Mood-Entries tile value on OUR
// tree — the tiles' computed CHROME (the STAT_CARD anatomy:
// card/wash/content/iconRow/iconTile/icon/label/value/sub) has never
// been diffed same-round, and the DATA values never live-vs-live.
//
//   node scripts/parity-dashboard.mjs     (our dev server must be up)
//
// PASS A (the reference, ONE login — the same budget the watch and
//   parity-moodform/shell spend): /Dashboard at 1280x900 → the member
//   read. PASS B (our dev server, ONE login likewise): the same read.
//   Then the DIFF: every member compared ref-vs-ours, 105 members.
//
// DECODE PROVENANCE (WH-38, probed live on BOTH apps before this
// script was written): 105 scalars read — 94 MATCH + the known
// serialization classes (the 9 gradients — h1Bg + the four tiles'
// wash/iconTile pairs — carry the SAME rgb stop-triples in our
// build-time v4 `in oklab ... 0%/100%` form vs the reference CDN's
// bare `to right bottom, rgb(...), rgb(...)` form; the card shadow
// carries the v4 var-chain zero-layer prefix `rgba(0,0,0,0) 0px 0px
// 0px 0px` x4 before the real shadow-lg layers — the reference's CDN
// emits the real layers alone). Both classes normalized below (lesson
// 40: compare RENDERED FACTS, not serialized strings — the stop
// triples and the real shadow layers ARE the rendered facts). The
// decode's ONE artifact: the KPI grid was found via the header's
// nesting depth, which differs between the apps — the grid is
// anchored on the CARDS here (walk up from tile[0]'s card until the
// element contains tile[1]'s card AND computes display:grid — a
// rendered-fact anchor, the WH-37 bordered-column lesson's class).
//
// THE DATA MEMBERS (valueText/subText/the tile labels): compared
// AS-IS. A data drift is a FINDING to decode — the reference's demo
// account is a live fact that moves (lesson 41) — never a silent
// re-base. The chrome members ride the computed values, immune to
// data moves.
//
// ZERO-WRITE doctrine (enforced): login + read only. No tile is
// clicked, no form opened, nothing hovered — the cleanest read class.
//
// Output: a per-member MATCH/DRIFT report + a final line. Exit 0 only
// when every member matches; exit 1 on any DRIFT or PROBE-ERROR (a
// drift means one of the two apps moved THIS ROUND — investigate
// before curing, the standing machinery).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const OURS = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

// The four tiles, dashboard order (the label text is itself a member —
// the anchor AND the assertion).
const TILE_LABELS = [
  "Workouts This Week",
  "Mood Entries",
  "Active Assignments",
  "Goals Completed",
];

// The member names, flattened per pass (t0..t3 = the four tiles in
// dashboard order). Every member was decode-verified comparable on
// both apps before this list froze.
const HEADER_MEMBERS = [
  "h1Text",
  "h1Fs",
  "h1Fw",
  "h1Bg",
  "subText",
  "subFs",
  "subColor",
  "gridCols",
  "gridGap",
];
const TILE_MEMBERS = [
  "labelText",
  "cardBg",
  "cardR",
  "cardW",
  "cardShadow",
  "washBg",
  "washOpacity",
  "iconTileBg",
  "iconTileW",
  "iconTileR",
  "iconW",
  "iconColor",
  "labelFs",
  "labelFw",
  "labelColor",
  "labelMb",
  "valueText",
  "valueFs",
  "valueFw",
  "valueColor",
  "valueMb",
  "subText",
  "subFs",
  "subColor",
];
// The gradient members — compared as rgb stop-TRIPLES (the standing
// lesson-40 doctrine; the syntax around the triples differs by
// compiler, the triples are the rendered fact).
const GRADIENT_MEMBERS = new Set([
  "h1Bg",
  "t0_washBg",
  "t0_iconTileBg",
  "t1_washBg",
  "t1_iconTileBg",
  "t2_washBg",
  "t2_iconTileBg",
  "t3_washBg",
  "t3_iconTileBg",
]);
// The shadow members — compared as their REAL layers (the v4
// var-chain zero-layers filtered out; the real layers are the
// rendered fact — the shadow instance of the lesson-40 class).
const SHADOW_MEMBERS = new Set([
  "t0_cardShadow",
  "t1_cardShadow",
  "t2_cardShadow",
  "t3_cardShadow",
]);

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
const gotoApp = async (page, base, route, { sel = "main", settleMs = 900 } = {}) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector(sel, { timeout: 15000 });
  await page.waitForTimeout(settleMs);
};

/** One app's full pass: login → /Dashboard (1280x900) → the read. */
const runPass = async (page, base) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login", { sel: "h1" });
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 15000 });
  await page.waitForTimeout(1200);
  await gotoApp(page, base, "/Dashboard");
  // The reference renders the tiles only after its dashboard aggregate
  // resolves — wait for the FIRST TILE's label text (a rendered-fact
  // wait, never a fixed timeout), then settle for the values.
  await page.waitForSelector("text=Workouts This Week", { timeout: 20000 });
  await page.waitForTimeout(900);
  // WH-52 (F-2): the VALUE settle-poll — the reference's post-redeploy
  // aggregate resolves the tile VALUES slower than the LABELS (the
  // battery's intermittent ref-0 reads: the label wait fires, the
  // fixed 900ms settle expires mid-resolution, the value reads its
  // pre-resolution 0 — the same class the capture-24 row-wait cured at
  // WH-51). Poll the four tile values until two consecutive reads
  // agree (bounded at 6 tries), then read — a REAL data change still
  // reads its stable value fast and drifts HONESTLY (the lesson-41
  // doctrine: a data drift is a finding to decode, never a re-base).
  {
    let prev = "";
    for (let i = 0; i < 6; i++) {
      const vals = await page.evaluate(() => {
        const vis = (el) => el && el.offsetParent !== null;
        const read = (label) => {
          const el = Array.from(document.querySelectorAll("p,span,div")).find(
            (e) => vis(e) && e.childElementCount === 0 && e.textContent.trim() === label,
          );
          if (!el) return null;
          const h3 = el.parentElement ? el.parentElement.querySelector("h3") : null;
          return h3 ? h3.textContent.trim() : null;
        };
        return ["Workouts This Week", "Mood Entries", "Active Assignments", "Goals Completed"]
          .map(read)
          .join("|");
      });
      if (vals === prev && !vals.includes("null")) break;
      prev = vals;
      await page.waitForTimeout(1200);
    }
  }

  return await page.evaluate((labels) => {
    const vis = (el) => el && el.offsetParent !== null;

    // ---- the page header ----
    const h1 = Array.from(document.querySelectorAll("h1")).find(vis);
    const hcs = h1 ? getComputedStyle(h1) : null;
    // the subtitle: the h1's first text-bearing button-free sibling
    // (decode-proven on both apps — an h1-anchored read, never a
    // header-depth walk)
    let sub = null;
    if (h1) {
      for (const c of h1.parentElement.children) {
        if (c !== h1 && c.textContent.trim() && !c.querySelector("button")) {
          sub = c;
          break;
        }
      }
    }
    const scs = sub ? getComputedStyle(sub) : null;

    // ---- the four tiles, anchored on each LABEL text (the rendered
    // fact; the decode's proven anchor chain) ----
    const tiles = labels.map((label) => {
      const p = Array.from(document.querySelectorAll("p,span,div")).find(
        (el) => vis(el) && el.childElementCount === 0 && el.textContent.trim() === label,
      );
      if (!p) return { labelText: label, error: "label element not found" };
      // the card: the closest ancestor carrying a computed box-shadow
      // (the STAT_CARD shell — shadow-lg; decode-proven to stop at the
      // card on both apps)
      let card = p.parentElement;
      while (card && card !== document.body) {
        if (getComputedStyle(card).boxShadow !== "none") break;
        card = card.parentElement;
      }
      const ccs = card ? getComputedStyle(card) : null;
      // the wash: the card child with a gradient + sub-1 opacity
      const wash = card
        ? Array.from(card.children).find(
            (c) =>
              (getComputedStyle(c).backgroundImage || "").includes("gradient") &&
              parseFloat(getComputedStyle(c).opacity) < 1,
          )
        : null;
      const wcs = wash ? getComputedStyle(wash) : null;
      // the iconTile: the card descendant with a gradient + radius
      // >=12px + a small box (<=72px — excludes the full-bleed wash)
      const iconTile = card
        ? Array.from(card.querySelectorAll("div")).find((c) => {
            const s = getComputedStyle(c);
            const r = c.getBoundingClientRect();
            return (
              (s.backgroundImage || "").includes("gradient") &&
              parseFloat(s.borderTopLeftRadius) >= 12 &&
              r.width > 0 &&
              r.width <= 72
            );
          })
        : null;
      const ics = iconTile ? getComputedStyle(iconTile) : null;
      const icon = iconTile ? iconTile.querySelector("svg") : null;
      const iscs = icon ? getComputedStyle(icon) : null;
      // the value: the label's parent block's h-tag (the big number)
      const vparent = p.parentElement;
      const value = vparent ? vparent.querySelector("h3,h2,h4") : null;
      const vcs = value ? getComputedStyle(value) : null;
      // the sub: the parent block's remaining leaf text (the caption)
      let subT = null;
      if (vparent && value) {
        for (const c of vparent.children) {
          if (c !== value && c !== p && c.childElementCount === 0 && c.textContent.trim()) {
            subT = c;
            break;
          }
        }
      }
      const stcs = subT ? getComputedStyle(subT) : null;
      return {
        labelText: label,
        cardBg: ccs ? ccs.backgroundColor : null,
        cardR: ccs ? ccs.borderTopLeftRadius : null,
        cardW: card ? Math.round(card.getBoundingClientRect().width) : null,
        cardShadow: ccs ? ccs.boxShadow : null,
        washBg: wcs ? wcs.backgroundImage : null,
        washOpacity: wcs ? wcs.opacity : null,
        iconTileBg: ics ? ics.backgroundImage : null,
        iconTileW: iconTile ? Math.round(iconTile.getBoundingClientRect().width) : null,
        iconTileR: ics ? ics.borderTopLeftRadius : null,
        iconW: iscs ? iscs.width : null,
        iconColor: iscs ? iscs.color : null,
        labelFs: getComputedStyle(p).fontSize,
        labelFw: getComputedStyle(p).fontWeight,
        labelColor: getComputedStyle(p).color,
        labelMb: getComputedStyle(p).marginBottom,
        valueText: value ? value.textContent.trim() : null,
        valueFs: vcs ? vcs.fontSize : null,
        valueFw: vcs ? vcs.fontWeight : null,
        valueColor: vcs ? vcs.color : null,
        valueMb: vcs ? vcs.marginBottom : null,
        subText: subT ? subT.textContent.trim() : null,
        subFs: stcs ? stcs.fontSize : null,
        subColor: stcs ? stcs.color : null,
        __card: card || null,
      };
    });

    // ---- the KPI grid — anchored on the CARDS (the decode's artifact
    // cure: our PageHeader nests the grid one level deeper than the
    // reference's, so a header-depth walk misses ours; walk up from
    // tile[0]'s card until the element CONTAINS tile[1]'s card and
    // computes display:grid — a rendered-fact anchor, the
    // bordered-column lesson's class) ----
    let grid = null;
    const c0 = tiles[0] && tiles[0].__card ? tiles[0].__card : null;
    const c1 = tiles[1] && tiles[1].__card ? tiles[1].__card : null;
    if (c0 && c1) {
      let n = c0.parentElement;
      while (n && n !== document.body) {
        if (n.contains(c1) && getComputedStyle(n).display === "grid") {
          grid = n;
          break;
        }
        n = n.parentElement;
      }
    }
    const gcs = grid ? getComputedStyle(grid) : null;

    return {
      h1Text: h1 ? h1.textContent.trim() : null,
      h1Fs: hcs ? hcs.fontSize : null,
      h1Fw: hcs ? hcs.fontWeight : null,
      h1Bg: hcs ? hcs.backgroundImage : null,
      subText: sub ? sub.textContent.trim() : null,
      subFs: scs ? scs.fontSize : null,
      subColor: scs ? scs.color : null,
      gridCols: gcs ? gcs.gridTemplateColumns.split(" ").length : null,
      gridGap: gcs ? gcs.gap : null,
      tiles: tiles.map(({ __card, ...t }) => t),
    };
  }, TILE_LABELS);
};

// ---------- the normalizers (Node-side) ----------
/** The gradient stop-TRIPLES — the lesson-40 rendered fact. */
const stopsOf = (s) => {
  const m = String(s || "").match(/rgb\(\d+, \d+, \d+\)/g);
  return m ? m.join(" → ") : String(s || "");
};
/** The shadow's REAL layers — the v4 var-chain zero-layers stripped
 *  (the rendered fact; the zero-prefix is the compiler's syntax). */
const realShadowLayers = (s) =>
  String(s || "")
    .split(/,\s*(?=rgba)/)
    .filter((l) => !/^rgba\(0, 0, 0, 0\) 0px 0px 0px 0px$/.test(l.trim()))
    .map((l) => l.trim())
    .join(" | ");

// ---------- the passes ----------
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

console.log("--- PASS A: the reference (one login) ---");
const ref = await probe(() => runPass(page, REF));
const refErr =
  ref.__error || (ref.tiles || []).find((t) => t && t.error) || (ref.tiles || []).length !== 4;
if (refErr) {
  console.log(
    `PROBE-ERROR reference: ${refErr.__error || refErr.error || "tile set incomplete"}`,
  );
  console.log(`  raw read: ${JSON.stringify(ref).slice(0, 300)}`);
  await browser.close();
  process.exit(1);
}
console.log(
  `reference read: h1 "${ref.h1Text}" ${ref.h1Fs}/${ref.h1Fw}, grid ${ref.gridCols} cols gap ${ref.gridGap}; tiles ${ref.tiles
    .map((t) => `${t.labelText.split(" ")[0]}=${t.valueText}`)
    .join(" · ")}`,
);

console.log("--- PASS B: our dev server (one login) ---");
const ours = await probe(() => runPass(page, OURS));
const ourErr =
  ours.__error || (ours.tiles || []).find((t) => t && t.error) || (ours.tiles || []).length !== 4;
if (ourErr) {
  console.log(`PROBE-ERROR ours: ${ourErr.__error || ourErr.error || "tile set incomplete"}`);
  console.log(`  raw read: ${JSON.stringify(ours).slice(0, 300)}`);
  await browser.close();
  process.exit(1);
}
console.log(
  `ours read:      h1 "${ours.h1Text}" ${ours.h1Fs}/${ours.h1Fw}, grid ${ours.gridCols} cols gap ${ours.gridGap}; tiles ${ours.tiles
    .map((t) => `${t.labelText.split(" ")[0]}=${t.valueText}`)
    .join(" · ")}`,
);

// ---------- the live-vs-live diff ----------
console.log("--- the member diff (reference vs ours, same round) ---");
// flatten each pass: header + grid + t0..t3 (the tiles in order)
const flat = (p) => {
  const out = {};
  for (const m of HEADER_MEMBERS) out[m] = p[m];
  p.tiles.forEach((t, i) => {
    for (const m of TILE_MEMBERS) out[`t${i}_${m}`] = t[m];
  });
  return out;
};
const A = flat(ref);
const B = flat(ours);
const ALL = [
  ...HEADER_MEMBERS,
  ...TILE_LABELS.flatMap((_, i) => TILE_MEMBERS.map((m) => `t${i}_${m}`)),
];
for (const m of ALL) {
  const a = A[m];
  const b = B[m];
  if (GRADIENT_MEMBERS.has(m)) {
    const sa = stopsOf(a);
    const sb = stopsOf(b);
    const ok = sa === sb && sa !== "";
    report(m, ok, ok ? `stops ${sa}` : `ref [${sa}] vs ours [${sb}]`);
    continue;
  }
  if (SHADOW_MEMBERS.has(m)) {
    const la = realShadowLayers(a);
    const lb = realShadowLayers(b);
    const ok = la === lb && la !== "";
    report(m, ok, ok ? `real layers: ${la}` : `ref [${la}] vs ours [${lb}]`);
    continue;
  }
  report(m, a === b, a === b ? `${a}` : `ref ${a} vs ours ${b}`);
}

await browser.close();
const bad = results.filter((r) => !r.ok).length;
console.log(
  bad === 0
    ? `PARITY-DASHBOARD RESULT: ${results.length}/${results.length} members MATCH (both apps, same round)`
    : `PARITY-DASHBOARD RESULT: ${bad} DRIFT of ${results.length} members — investigate (one of the two apps moved this round)`,
);
process.exit(bad === 0 ? 0 : 1);
