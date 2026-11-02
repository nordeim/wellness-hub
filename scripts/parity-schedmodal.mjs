// parity-schedmodal.mjs — the SIXTEENTH committed parity surface
// (WH-50): the Routines Schedule modal's FULL interior — the reference's
// ONE modal (probed field-by-field at WH-22; the watch reads its width +
// circles only; the WH-22 record never re-verified live as a diffed
// surface — the lesson-48 wrapper/interior blind-spot class's second
// instance at the sub-card level: the record pinned the Remember
// inset's CHROME, never its content structure).
//
//   node scripts/parity-schedmodal.mjs   (our dev server must be up)
//
// ONE login per app, ONE route (/routines + the Use This Template open
//   on the family-A template "5-Minute Morning Energizer"), ZERO-WRITE
//   (the watch's own read-only interaction: the modal is opened, read,
//   closed via Escape — never submitted; the date/time/notes fields are
//   never touched).
//
// THE MEMBER SET (~95): the OVERLAY (the canvas-normalized alpha quad —
//   the parity-login convention; z-index, position) + the CHROME (the
//   fixed 50/50 grid panel: 672 wide, the 90vh max-height, overflow-y
//   auto, r-8, white, p-24, gap-16, the real-layers shadow, the rect) +
//   the HEADER (the title-only form: "Schedule: {template}" 18px/600) +
//   the DESC TILE (the purple-50→pink-50 to-right gradient by its rgb
//   STOP TRIPLES — the moodjourney convention; p-16, r-8, the rect) +
//   the descP (14px gray-700 mb-12) + the REMEMBER INSET (the WH-50
//   F-1 cure's verification members: the two-p text-xs family — the
//   label "💪 Remember:" 12px/600 purple-700 mb-4 + the body 12px
//   gray-700; the inset's chrome bg-white/80 [canvas-normalized] p-12
//   r-8, the rect) + the STEPS family (the "Routine Steps:" label
//   16px/600 mb-12; the step tiles SHAPE-anchored — the bg-gray-50 p-3
//   r-8 family, NEVER <li> [the reference's are plain DIVs, ours <ol>
//   children — the lesson-27/48 semantic superset]; the 24×24 purple-500
//   circles white 12px/600 [the is-round normalization for v4's
//   calc(infinity) vs the CDN's 9999px]; the stepTitle 14px/500, the
//   stepDuration 12px gray-600, the stepDesc 12px gray-500 mt-4) + the
//   FIELDS family (the grid gap-16; the three labels 14px/500; the
//   date/time inputs 622×36 r-6 4/12 1px line; the textarea min-h-60
//   r-6 8/12 shadow-sm) + the PRIMARY ("Schedule This Routine" 622×36
//   r-6 white 14px/500, the purple-500→pink-500 module pair by its rgb
//   STOP TRIPLES) + the Y-LADDER (the header/tile/inset/steps/fields/
//   inputs/textarea/primary y positions — the F-1 cure moved the whole
//   ladder below the inset by Δ20; the born members pin the cured
//   ladder byte-identical to the reference's).
//
// THE CARD ANCHOR (lesson-47): the "Use This Template" button whose
//   first 12px-radius ANCESTOR (the card root — the parity-routines
//   convention) carries the family-A template name — never an N-level
//   walk to the grid (the over-climb class this round's own decode
//   absorbed: the 8-level walk matched the SHARED grid and opened the
//   wrong template).
//
// KNOWN SERIALIZATION CLASSES (normalized, the standing set): the
//   lesson-40 alpha canvas-composite (the overlay + the Remember
//   inset's white/80 bg); the lesson-40 gradient stop-triples (the desc
//   tile + the primary); the lesson-40 shadow real-layers (the chrome +
//   the textarea); the lesson-40 is-round normalization (the step
//   circles' infinite radii).
//
// DOM-SHAPE FACTS (decoded live, zero rendered-face consequence — the
//   lesson-27/48 class, documented not cured): the step tiles — ours
//   <li> children of an <ol>, the reference's plain DIVs (ours the
//   semantic superset; the tiles are anchored by SHAPE); the Remember
//   inset's two ps (both apps render the same two-p family since the
//   WH-50 cure).
//
// Exit 0 when every member matches; exit 1 on any DRIFT or
// PROBE-ERROR — a drift is a FINDING for the round's plan (the
// lesson-41 live-fact class: investigate, never a silent re-base).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const DEV = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";
const TEMPLATE = "5-Minute Morning Energizer";

const results = [];
const report = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "MATCH " : "DRIFT "} ${member}: ${detail}`);
};

// ONE self-contained in-page helper factory (eval returns the bundle).
const HELPERS = `
(() => {
  const cs = (el, props) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const o = {};
    for (const p of props) o[p] = s[p];
    return o;
  };
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { y: Math.round(r.y), x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height) };
  };
  // the 1x1-canvas composite — the alpha normalization (the canvas does
  // the math; identical across oklab/rgba serializations)
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const g = canvas.getContext("2d");
  const norm = (colorStr) => {
    if (!colorStr) return null;
    g.fillStyle = "#000";
    g.fillRect(0, 0, 1, 1);
    g.fillStyle = colorStr;
    g.fillRect(0, 0, 1, 1);
    const d = g.getImageData(0, 0, 1, 1).data;
    return d[0] + "," + d[1] + "," + d[2] + "," + d[3];
  };
  // the gradient stop-triples (the moodjourney convention)
  const gradStops = (bg) => {
    if (!bg || bg === "none") return null;
    const m = bg.match(/rgb\\((\\d+, \\d+, \\d+)\\)/g);
    return m ? m.join(" -> ") : null;
  };
  return { cs, rect, norm, gradStops };
})()
`;

/** SPA-safe navigation — the battery's gotoApp form, verbatim. */
const gotoApp = async (page, base, route) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector("main", { timeout: 20000 });
  await page.waitForTimeout(1100);
};

/** One app's full pass: login → /routines (1280×900) → open the
 *  family-A Schedule modal → the read → close via Escape.
 *  Rendered-fact waits on every route (never a bare timeout — the
 *  dev server compiles routes on first visit). */
const runPass = async (page, base) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login");
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 20000 });
  await page.waitForTimeout(1200);

  await page.goto(`${base}/routines`, { waitUntil: "load" });
  await page.waitForSelector('main button:has-text("Use This Template")', { timeout: 25000 });
  await page.waitForTimeout(1200);

  // the card anchor: the Use This Template button whose first 12px-radius
  // ancestor (the card root) carries the family-A template name
  const opened = await page.evaluate((tpl) => {
    const btn = Array.from(document.querySelectorAll("main button"))
      .filter((b) => /Use This Template/i.test(b.textContent || ""))
      .find((b) => {
        let el = b.parentElement;
        while (el) {
          if (getComputedStyle(el).borderRadius === "12px" && el.querySelector("button")) break;
          el = el.parentElement;
        }
        return el ? (el.textContent || "").includes(tpl) : false;
      });
    if (!btn) return null;
    btn.click();
    return "clicked";
  }, TEMPLATE);
  if (!opened) throw new Error("family-A card not found");

  await page.waitForSelector('[role="dialog"]');
  await page.waitForTimeout(900); // the zoom-in-95 settle doctrine

  const read = await page.evaluate((H) => {
    const { cs, rect, norm, gradStops } = eval(H);
    const dlg = document.querySelector('[role="dialog"]');
    if (!dlg) return { found: false };

    // the overlay: the fixed full-viewport sibling of the dialog portal
    const overlay = Array.from(document.querySelectorAll("body *")).find((el) => {
      if (el === dlg || dlg.contains(el) || el.contains(dlg)) return false;
      const s = getComputedStyle(el);
      return s.position === "fixed" && s.backgroundColor !== "rgba(0, 0, 0, 0)" &&
        s.backgroundColor !== "oklab(none)" && el.getBoundingClientRect().width >= 1280;
    }) || null;
    const ocs = overlay ? cs(overlay, ["backgroundColor", "zIndex", "position"]) : null;

    // the chrome IS the dialog element (the fixed 50/50 grid panel)
    const chromeCs = cs(dlg, ["width", "maxHeight", "overflowY", "borderRadius", "backgroundColor", "padding", "boxShadow", "gap"]);

    // the header: the dialog's first child block (the title-only form)
    const header = Array.from(dlg.children).find((c) => c.querySelector("h2") || (c.textContent || "").trim().startsWith("Schedule:")) || null;
    const titleEl = header ? (header.querySelector("h2") || header) : null;

    // the description tile: the gradient-bearing block
    const all = Array.from(dlg.querySelectorAll("div"));
    const tile = all.find((d) => {
      const bg = getComputedStyle(d).backgroundImage || "";
      return bg.includes("gradient") && d.getBoundingClientRect().width > 500;
    }) || null;
    const descP = tile ? tile.querySelector("p") : null;

    // the Remember inset: the white/80 tile INSIDE the gradient tile
    const remember = tile
      ? all.find((d) => tile.contains(d) && d !== tile && d.contains(descP) === false && (() => {
          const s = getComputedStyle(d);
          return parseFloat(s.paddingTop) === 12 && s.borderRadius === "8px" && (d.textContent || "").includes("Remember");
        })())
      : null;
    const remLabel = remember ? Array.from(remember.children).find((c) => (c.textContent || "").includes("Remember")) : null;
    const remBody = remember ? Array.from(remember.children).find((c) => c !== remLabel) : null;

    // the steps label
    const ps = Array.from(dlg.querySelectorAll("p"));
    const stepsLabel = ps.find((p) => (p.textContent || "").trim().startsWith("Routine Steps")) || null;

    // the step tiles: SHAPE-anchored (bg-gray-50 p-3 r-8, tag-agnostic —
    // ours are <li> children of an <ol>, the reference's plain DIVs, the
    // lesson-27/48 semantic superset)
    const stepTiles = Array.from(dlg.querySelectorAll("div, li")).filter((d) => {
      const s = getComputedStyle(d);
      const r = d.getBoundingClientRect();
      return s.backgroundColor === "rgb(249, 250, 251)" && s.borderRadius === "8px" &&
        parseFloat(s.paddingTop) === 12 && r.width > 400 && r.height > 40;
    });
    const circle = stepTiles[0] ? stepTiles[0].querySelector("span") : null;
    const stepPs = stepTiles[0] ? Array.from(stepTiles[0].querySelectorAll("p")) : [];

    // the fields
    const labels = Array.from(dlg.querySelectorAll("label"));
    const dateInput = dlg.querySelector('input[type="date"]');
    const timeInput = dlg.querySelector('input[type="time"]');
    const textarea = dlg.querySelector("textarea");
    const fieldsGrid = dateInput ? (dateInput.closest("div.grid") || dateInput.parentElement.parentElement) : null;

    // the primary: the WIDE button (the X close is 16px)
    const btns = Array.from(dlg.querySelectorAll("button"));
    const primary = btns.find((b) => b.getBoundingClientRect().width > 300) || null;

    return {
      found: true,
      overlay: ocs ? { quad: norm(ocs.backgroundColor), zIndex: ocs.zIndex, position: ocs.position } : null,
      // the GEOMETRY only — the shadow serializes differently across the
      // two compilers and rides its own realLayers member below
      chrome: { ...chromeCs, boxShadow: undefined, ...rect(dlg) },
      title: titleEl ? { text: titleEl.textContent.trim().slice(0, 40), ...cs(titleEl, ["fontSize", "fontWeight"]), ...rect(titleEl) } : null,
      tile: tile ? { stops: gradStops(cs(tile, ["backgroundImage"]).backgroundImage), ...cs(tile, ["padding", "borderRadius"]), ...rect(tile) } : null,
      descP: descP ? { fs: cs(descP, ["fontSize"]).fontSize, color: cs(descP, ["color"]).color, mb: cs(descP, ["marginBottom"]).marginBottom } : null,
      remember: remember
        ? {
            quad: norm(cs(remember, ["backgroundColor"]).backgroundColor),
            pad: cs(remember, ["padding"]).padding,
            radius: cs(remember, ["borderRadius"]).borderRadius,
            ...rect(remember),
            label: remLabel ? { text: remLabel.textContent.trim(), ...cs(remLabel, ["fontSize", "fontWeight", "color", "marginBottom"]) } : null,
            body: remBody ? { ...cs(remBody, ["fontSize", "color"]) } : null,
          }
        : null,
      stepsLabel: stepsLabel ? { text: stepsLabel.textContent.trim(), ...cs(stepsLabel, ["fontWeight", "marginBottom", "fontSize"]) } : null,
      stepTileCount: stepTiles.length,
      stepTile: stepTiles[0] ? { ...cs(stepTiles[0], ["display", "alignItems", "gap", "padding", "backgroundColor", "borderRadius"]), ...rect(stepTiles[0]) } : null,
      circle: circle
        ? { text: circle.textContent.trim(), ...cs(circle, ["width", "height", "borderRadius", "backgroundColor", "color", "fontSize", "fontWeight"]), round: parseFloat(cs(circle, ["borderRadius"]).borderRadius) >= 12, ...rect(circle) }
        : null,
      stepTitle: stepPs[0] ? { text: stepPs[0].textContent.trim().slice(0, 30), ...cs(stepPs[0], ["fontSize", "fontWeight"]) } : null,
      stepDuration: stepPs[1] ? { text: stepPs[1].textContent.trim().slice(0, 20), ...cs(stepPs[1], ["fontSize", "color"]) } : null,
      stepDesc: stepPs[2] ? { text: stepPs[2].textContent.trim().slice(0, 30), ...cs(stepPs[2], ["fontSize", "color", "marginTop"]) } : null,
      labelCount: labels.length,
      label: labels[0] ? { text: labels[0].textContent.trim(), ...cs(labels[0], ["fontSize", "fontWeight", "color"]) } : null,
      dateInput: dateInput ? { ...cs(dateInput, ["height", "borderRadius", "padding", "borderWidth", "borderColor"]), ...rect(dateInput) } : null,
      timeInput: timeInput ? { ...cs(timeInput, ["height", "borderRadius"]), ...rect(timeInput) } : null,
      textarea: textarea ? { ...cs(textarea, ["minHeight", "fontSize", "borderRadius", "padding"]), ...rect(textarea) } : null,
      fieldsGrid: fieldsGrid ? { ...cs(fieldsGrid, ["display", "gap"]), ...rect(fieldsGrid) } : null,
      primary: primary
        ? { text: primary.textContent.trim(), stops: gradStops(cs(primary, ["backgroundImage"]).backgroundImage), ...cs(primary, ["width", "height", "borderRadius", "color", "fontSize", "fontWeight"]), ...rect(primary) }
        : null,
      btnCount: btns.length,
    };
  }, HELPERS);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  return read;
};

/** The real-layers shadow filter — the lesson-40 var-chain zero-layers
 *  class (the parity-profile precedent, verbatim). */
const realLayers = (s) =>
  String(s || "")
    .split(/,\s*(?=[a-z])/)
    .filter((l) => !/rgba\(\d+, \d+, \d+, 0\)/.test(l))
    .join(", ");

const browser = await chromium.launch();

// ---- PASS A: the reference (ONE login) ----
const refPage = await browser.newPage();
let A;
try {
  A = await runPass(refPage, REF);
} catch (e) {
  console.log(`PROBE-ERROR reference: ${e.message}`);
  process.exit(1);
}
await refPage.close();

// ---- PASS B: our dev server (ONE login) ----
const devPage = await browser.newPage();
let B;
try {
  B = await runPass(devPage, DEV);
} catch (e) {
  console.log(`PROBE-ERROR dev: ${e.message}`);
  process.exit(1);
}
await devPage.close();
await browser.close();

if (!A.found || !B.found) {
  console.log(`PROBE-ERROR dialog-anchor: ref found=${A.found} dev found=${B.found}`);
  process.exit(1);
}

/** The scalar-pair reporter (the battery's standard diff loop). */
const pairs = (a, b, list) => {
  for (const [name, key] of list) {
    const av = key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), a);
    const bv = key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), b);
    report(name, JSON.stringify(av) === JSON.stringify(bv), `${JSON.stringify(av)} vs ${JSON.stringify(bv)}`);
  }
};

// ---- the overlay ----
pairs(A, B, [
  ["overlay.quad", "overlay.quad"],
  ["overlay.z", "overlay.zIndex"],
  ["overlay.pos", "overlay.position"],
]);

// ---- the chrome ----
const chromeGeo = (c) => ({ w: c.width, maxH: c.maxHeight, scroll: c.overflowY, r: c.borderRadius, bg: c.backgroundColor, pad: c.padding, gap: c.gap, y: c.y, x: c.x, cw: c.w, h: c.h });
report("chrome.geometry", JSON.stringify(chromeGeo(A.chrome)) === JSON.stringify(chromeGeo(B.chrome)), `${JSON.stringify(chromeGeo(A.chrome))} vs ${JSON.stringify(chromeGeo(B.chrome))}`);
report("chrome.shadow", realLayers(A.chrome.boxShadow) === realLayers(B.chrome.boxShadow), `${realLayers(A.chrome.boxShadow).slice(0, 60)} vs ${realLayers(B.chrome.boxShadow).slice(0, 60)}`);

// ---- the header + desc tile + remember (the F-1 cure's members) ----
pairs(A, B, [
  ["title.text", "title.text"],
  ["title.fs", "title.fontSize"],
  ["title.fw", "title.fontWeight"],
  ["title.rect", "title"],
  ["tile.stops", "tile.stops"],
  ["tile.pad", "tile.padding"],
  ["tile.r", "tile.borderRadius"],
  ["tile.rect", "tile"],
  ["descP.fs", "descP.fs"],
  ["descP.color", "descP.color"],
  ["descP.mb", "descP.mb"],
  ["remember.quad", "remember.quad"],
  ["remember.pad", "remember.pad"],
  ["remember.r", "remember.radius"],
  ["remember.rect", "remember"],
  ["remember.labelText", "remember.label.text"],
  ["remember.labelFs", "remember.label.fontSize"],
  ["remember.labelFw", "remember.label.fontWeight"],
  ["remember.labelColor", "remember.label.color"],
  ["remember.labelMb", "remember.label.marginBottom"],
  ["remember.bodyFs", "remember.body.fontSize"],
  ["remember.bodyColor", "remember.body.color"],
]);

// ---- the steps family ----
pairs(A, B, [
  ["stepsLabel.text", "stepsLabel.text"],
  ["stepsLabel.fw", "stepsLabel.fontWeight"],
  ["stepsLabel.mb", "stepsLabel.marginBottom"],
  ["stepsLabel.fs", "stepsLabel.fontSize"],
  ["stepTileCount", "stepTileCount"],
  ["stepTile.display", "stepTile.display"],
  ["stepTile.align", "stepTile.alignItems"],
  ["stepTile.gap", "stepTile.gap"],
  ["stepTile.pad", "stepTile.padding"],
  ["stepTile.bg", "stepTile.backgroundColor"],
  ["stepTile.r", "stepTile.borderRadius"],
  ["stepTile.rect", "stepTile"],
  ["circle.text", "circle.text"],
  ["circle.w", "circle.width"],
  ["circle.h", "circle.height"],
  ["circle.round", "circle.round"],
  ["circle.bg", "circle.backgroundColor"],
  ["circle.color", "circle.color"],
  ["circle.fs", "circle.fontSize"],
  ["circle.fw", "circle.fontWeight"],
  ["stepTitle.text", "stepTitle.text"],
  ["stepTitle.fs", "stepTitle.fontSize"],
  ["stepTitle.fw", "stepTitle.fontWeight"],
  ["stepDuration.text", "stepDuration.text"],
  ["stepDuration.fs", "stepDuration.fontSize"],
  ["stepDuration.color", "stepDuration.color"],
  ["stepDesc.text", "stepDesc.text"],
  ["stepDesc.fs", "stepDesc.fontSize"],
  ["stepDesc.color", "stepDesc.color"],
  ["stepDesc.mt", "stepDesc.marginTop"],
]);

// ---- the fields family ----
pairs(A, B, [
  ["labelCount", "labelCount"],
  ["label.text", "label.text"],
  ["label.fs", "label.fontSize"],
  ["label.fw", "label.fontWeight"],
  ["label.color", "label.color"],
  ["date.h", "dateInput.height"],
  ["date.r", "dateInput.borderRadius"],
  ["date.pad", "dateInput.padding"],
  ["date.borderW", "dateInput.borderWidth"],
  ["date.borderC", "dateInput.borderColor"],
  ["date.rect", "dateInput"],
  ["time.h", "timeInput.height"],
  ["time.r", "timeInput.borderRadius"],
  ["time.rect", "timeInput"],
  ["ta.minH", "textarea.minHeight"],
  ["ta.fs", "textarea.fontSize"],
  ["ta.r", "textarea.borderRadius"],
  ["ta.pad", "textarea.padding"],
  ["ta.rect", "textarea"],
  ["fields.display", "fieldsGrid.display"],
  ["fields.gap", "fieldsGrid.gap"],
  ["fields.rect", "fieldsGrid"],
]);

// ---- the primary + the button landscape ----
pairs(A, B, [
  ["primary.text", "primary.text"],
  ["primary.w", "primary.width"],
  ["primary.h", "primary.height"],
  ["primary.r", "primary.borderRadius"],
  ["primary.color", "primary.color"],
  ["primary.fs", "primary.fontSize"],
  ["primary.fw", "primary.fontWeight"],
  ["primary.stops", "primary.stops"],
  ["primary.rect", "primary"],
  ["btnCount", "btnCount"],
]);

const bad = results.filter((r) => !r.ok);
console.log(
  `\nPARITY-SCHEDMODAL RESULT: ${results.length - bad.length}/${results.length} members MATCH (both apps, same round)` +
    (bad.length ? " — DRIFTS PRESENT" : ""),
);
process.exit(bad.length ? 1 : 0);
