// parity-profile.mjs — the TENTH committed parity surface (WH-44, F-7):
// the Profile appearance family. The WH-43 plan's (c) candidate,
// decode-settled live this round by three consolidated flights.
//
//   node scripts/parity-profile.mjs      (our dev server must be up)
//
// PASS A (the reference, ONE login — the same budget the watch and the
//   sibling surfaces spend): /Profile at 1280×900 → the Appearance tab
//   (a VIEW-STATE click only — never a preset/mode click, those write
//   prefs on ours) → the member read. PASS B (our dev server, ONE login
//   likewise): the same read. Then the DIFF: every member compared
//   live-vs-live, exit 1 on any DRIFT/PROBE-ERROR.
//
// THE MEMBER SET (~340): the tablist (the row geometry + the 3 tabs'
// full anatomy + the selected identity) + the five section cards (the
// chrome + the title face + the body pads) + the Theme Mode grid (the
// 3 cards' anatomy + the active pair) + the Colors family (the 8 preset
// cards — the chrome, the swatch-pair DATA AS-IS (the F-1 catalog
// cure's live pin), the labels, the ORDER; the picker rows; the color
// inputs; the hex inputs; the preview tile) + the Typography (the combo
// + the quick-brown-fox preview) + the Background Image (the input +
// the hint) + the Visual Style (the 3 combos) + the Save bar.
//
// THE ANCHORS (LESSONS 27/47/48): the sections are anchored
// STRUCTURALLY — the 12px-radius panel cards in <main> (the reference's
// section titles are plain DIVs where ours are H2s; the titles are read
// as DATA, never keyed by tag); the preset label is the card's LAST
// element child (the reference's is a P, ours a SPAN — same computed
// face); the preview tile is the Colors card's leaf gradient element;
// the preset cards are found by their TWO-ROUND-SWATCH children (never
// by computed display); the tab row by the tab TEXT.
//
// KNOWN SERIALIZATION CLASSES (normalized, the standing set): (1) the
// lesson-40 gradient stop-triples (the preview tile + the save button);
// (2) the lesson-40 shadow real-layers (the section cards + the active
// tab + the save button).
//
// PINNED DOCUMENTED DEVIATIONS (asserted as BOTH-APPS-AT-THEIR-OWN-
// DOCUMENTED-VALUES — a pin failing is a DRIFT, never a silent
// re-base):
//   (a) the INACTIVE TAB INK — the reference's own #737373 fails WCAG
//       AA at 4.35:1 on its track; ours supersedes with neutral-600
//       (7.17:1) — the WH-17 accessible superset, PAD §11;
//   (b) the ACTIVE PRESET CARD — the reference carries NO visible
//       active state; ours adds the ring + "✓ Active" label (the WH-17
//       functional superset): the border color, the ring shadow, the
//       "+Active" text and the row-1 stretch (+28px: the active card
//       AND its row-1 grid siblings) are pinned at their documented
//       values, the Colors card height at its +28 delta;
//   (c) the MODE CARDS' aria-pressed — our a11y superset (the
//       reference's buttons carry none).
//
// DOM-SHAPE FACTS (decoded, zero rendered-face consequence — the
// lesson-27 class, documented not cured): the section titles DIV/H2,
// the preset label P/SPAN, the swatch row DIV/SPAN, the preview tile
// DIV/P.
//
// ZERO-WRITE on both apps (login + the Appearance tab click + read
// only). Exit 0 when every member matches; exit 1 on any DRIFT or
// PROBE-ERROR — a drift is a FINDING for the round's plan (the
// lesson-41 live-fact class: investigate, never a silent re-base).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const DEV = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const results = [];
const report = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "MATCH " : "DRIFT "} ${member}: ${detail}`);
};
/** The PINNED-deviation reporter: both apps must sit at their OWN
 *  documented values (the ledgered supersets) — a pin that fails is a
 *  drift (the superset changed shape on either side). */
const pinned = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "PINNED" : "DRIFT "} ${member}: ${detail}`);
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
  await page.waitForSelector("main", { timeout: 25000 });
  await page.waitForTimeout(1200);
};

/** One app's full pass: login → /Profile (1280×900) → the Appearance
 *  tab (view state) → the member read. Raw computed strings; every
 *  normalization runs Node-side, one implementation for both apps. */
const runPass = async (page, base) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login");
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 25000 });
  await page.waitForTimeout(1400);

  await gotoApp(page, base, "/Profile");
  // normalize the tab: Appearance active on both (view state only)
  await page.locator("button", { hasText: "Appearance" }).first().click({ timeout: 8000 });
  await page.waitForTimeout(900);

  return await page.evaluate(() => {
    const out = { tablist: {}, sections: [], save: {}, landscape: {} };
    const cs = (el, props) => {
      const s = getComputedStyle(el);
      const o = {};
      for (const p of props) o[p] = s[p];
      return o;
    };
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };

    // --- the tab row (text-anchored; the row = the Appearance tab's
    //     parent — lesson 47a: text content, never attribute presence) ---
    const tabBtns = Array.from(document.querySelectorAll("button")).filter((b) =>
      ["Appearance", "Account", "Preferences"].includes(b.textContent.trim()),
    );
    out.landscape.tabCount = tabBtns.length;
    if (tabBtns.length >= 3) {
      const row = tabBtns[0].parentElement;
      const rs = getComputedStyle(row);
      out.tablist = {
        rowW: rect(row).w,
        rowH: rect(row).h,
        rowY: rect(row).y,
        rowDisplay: rs.display,
        rowCols: rs.gridTemplateColumns,
        rowMt: rs.marginTop,
        tabs: Array.from(row.querySelectorAll("button")).map((b) => ({
          text: b.textContent.trim(),
          role: b.getAttribute("role"),
          selected: b.getAttribute("aria-selected"),
          w: rect(b).w,
          h: rect(b).h,
          ...cs(b, ["paddingTop", "paddingBottom", "paddingLeft", "borderRadius", "backgroundColor", "color", "fontSize", "fontWeight", "boxShadow"]),
        })),
      };
    }

    // --- THE SECTIONS — anchored STRUCTURALLY (lesson 48): the
    //     12px-radius panel cards in <main> (width > 300, height > 60),
    //     in DOM order. The titles are DATA (the reference's are DIVs).
    const cards = Array.from(document.querySelectorAll("main *")).filter((el) => {
      if (el.children.length === 0 || el.getBoundingClientRect().width < 300) return false;
      if (getComputedStyle(el).borderRadius !== "12px") return false;
      return el.getBoundingClientRect().height > 60;
    });
    out.landscape.sectionCount = cards.length;
    out.landscape.sectionTitles = cards.map((c) =>
      (c.textContent || "").trim().slice(0, 12),
    );

    // the two-round-swatch finder (the preset-card anchor — never
    // computed display; the swatches blockify inside flex rows)
    const roundSpans = (b) =>
      Array.from(b.querySelectorAll("span, div")).filter((s) => {
        const r = parseFloat(getComputedStyle(s).borderRadius);
        const w = s.getBoundingClientRect().width;
        return r > 1000 && w > 10 && w < 40;
      });

    for (const card of cards.slice(0, 6)) {
      const sec = { card: {}, title: {}, header: {}, body: {} };
      Object.assign(sec.card, { w: rect(card).w, h: rect(card).h }, cs(card, ["backgroundColor", "borderWidth", "boxShadow"]));
      const header = card.firstElementChild;
      if (header) {
        Object.assign(sec.header, cs(header, ["paddingTop", "paddingLeft", "rowGap"]));
        const title = header.firstElementChild;
        if (title) {
          Object.assign(sec.title, { text: title.textContent.trim().slice(0, 30) }, cs(title, ["fontSize", "fontWeight", "color"]));
          const icon = title.querySelector("svg");
          sec.title.iconW = icon ? Math.round(icon.getBoundingClientRect().width) : null;
        }
        const body = header.nextElementSibling;
        if (body) Object.assign(sec.body, cs(body, ["paddingTop", "paddingLeft", "rowGap"]));
      }

      // the Theme Mode family (Light/Dark/Auto buttons carrying an svg)
      const modeBtns = Array.from(card.querySelectorAll("button")).filter((b) =>
        ["Light", "Dark", "Auto"].includes(b.textContent.trim()) && b.querySelector("svg"),
      );
      if (modeBtns.length >= 3) {
        const grid = modeBtns[0].parentElement;
        const gs = getComputedStyle(grid);
        sec.mode = {
          gridDisplay: gs.display,
          gridCols: gs.gridTemplateColumns,
          gridGap: gs.gap,
          cards: modeBtns.slice(0, 3).map((b) => ({
            text: b.textContent.trim(),
            pressed: b.getAttribute("aria-pressed"),
            w: rect(b).w,
            h: rect(b).h,
            ...cs(b, ["paddingTop", "paddingBottom", "borderWidth", "borderColor", "borderRadius", "backgroundColor", "color"]),
            iconW: b.querySelector("svg") ? Math.round(b.querySelector("svg").getBoundingClientRect().width) : null,
            labelFs: b.querySelector("span") ? getComputedStyle(b.querySelector("span")).fontSize : null,
          })),
        };
      }

      // the preset family (the two-round-swatch anchor)
      const presetBtns = Array.from(card.querySelectorAll("button")).filter((b) => roundSpans(b).length === 2);
      if (presetBtns.length >= 4) {
        const grid = presetBtns[0].parentElement;
        const gs = getComputedStyle(grid);
        sec.presets = {
          gridDisplay: gs.display,
          gridCols: gs.gridTemplateColumns,
          gridGap: gs.gap,
          count: presetBtns.length,
          cards: presetBtns.map((b) => {
            const kids = Array.from(b.children);
            // THE LABEL ANCHOR (lesson 48): the child AFTER the swatch row
            // (kids[1]) — never the LAST child (our active card's third
            // child is the "✓ Active" superset label, which would poison
            // the label members on ours only).
            const label = kids[1];
            const sw = roundSpans(b);
            const ls = label ? getComputedStyle(label) : null;
            return {
              label: label ? label.textContent.trim().slice(0, 20) : null,
              texts: b.textContent.trim().slice(0, 40),
              w: rect(b).w,
              h: rect(b).h,
              ...cs(b, ["paddingTop", "paddingBottom", "borderWidth", "borderColor", "borderRadius", "boxShadow"]),
              swatchW: sw[0] ? Math.round(sw[0].getBoundingClientRect().width) : null,
              swatch1bg: sw[0] ? getComputedStyle(sw[0]).backgroundColor : null,
              swatch2bg: sw[1] ? getComputedStyle(sw[1]).backgroundColor : null,
              labelFs: ls ? ls.fontSize : null,
              labelLh: ls ? ls.lineHeight : null,
              labelFw: ls ? ls.fontWeight : null,
              labelDisplay: ls ? ls.display : null,
              labelColor: ls ? ls.color : null,
            };
          }),
        };
      }

      // the color inputs + hex inputs (typed)
      const colorIn = Array.from(card.querySelectorAll('input[type="color"]'));
      if (colorIn.length === 2) {
        sec.colorInputs = colorIn.map((i) => ({ w: rect(i).w, h: rect(i).h, value: i.value, ...cs(i, ["borderRadius", "fontSize"]) }));
        const hexes = Array.from(card.querySelectorAll("input")).filter(
          (i) => i.type !== "color" && (i.value + i.placeholder).includes("#"),
        );
        sec.hexInputs = hexes.map((i) => ({ value: i.value, placeholder: i.placeholder, ...cs(i, ["height", "borderRadius", "fontSize", "paddingLeft"]) }));
        const row = colorIn[0].parentElement;
        sec.pickerRow = cs(row, ["display", "gap", "alignItems", "marginTop"]);
      }

      // the preview tile (the Colors card's leaf gradient element)
      const grad = Array.from(card.querySelectorAll("*")).find(
        (el) => el.children.length === 0 && getComputedStyle(el).backgroundImage.includes("gradient") && el.textContent.trim().length > 4,
      );
      if (grad) {
        Object.assign(sec, {
          previewTile: {
            text: grad.textContent.trim().slice(0, 40),
            w: rect(grad).w,
            h: rect(grad).h,
            ...cs(grad, ["padding", "borderRadius", "backgroundImage", "color", "fontSize", "fontWeight", "textAlign"]),
          },
        });
      }

      // the quick-brown-fox preview (Typography)
      const fox = Array.from(card.querySelectorAll("p, div")).find((p) => p.textContent.includes("quick brown fox") && p.children.length === 0);
      if (fox) {
        const blk = fox.parentElement;
        const sub = Array.from(blk.querySelectorAll("p, div")).find((p) => p !== fox && p.textContent.trim().startsWith("Preview of"));
        sec.typePreview = {
          text: fox.textContent.trim().slice(0, 45),
          ...cs(fox, ["fontSize", "fontWeight"]),
          block: cs(blk, ["marginTop", "padding", "borderWidth", "borderRadius"]),
          subText: sub ? sub.textContent.trim().slice(0, 30) : null,
          subFs: sub ? getComputedStyle(sub).fontSize : null,
          subColor: sub ? getComputedStyle(sub).color : null,
        };
      }

      // the comboboxes
      const combos = Array.from(card.querySelectorAll('[role="combobox"], select'));
      if (combos.length) {
        sec.combos = combos.map((c) => ({
          text: c.textContent.trim().slice(0, 32),
          w: rect(c).w,
          ...cs(c, ["height", "borderRadius", "fontSize", "borderWidth", "borderColor", "backgroundColor", "paddingLeft"]),
        }));
      }

      // the plain inputs (Background Image URL) + the hint
      const plain = Array.from(card.querySelectorAll("input")).filter(
        (i) => !["color", "checkbox"].includes(i.type) && !(i.value + i.placeholder).includes("#"),
      );
      if (plain.length) {
        sec.plainInputs = plain.map((i) => ({ placeholder: i.placeholder.slice(0, 45), ...cs(i, ["height", "borderRadius", "fontSize"]) }));
      }
      const hint = Array.from(card.querySelectorAll("p, div")).find(
        (p) => p.textContent.includes("Pro tip") && p.children.length === 0,
      );
      if (hint) sec.hint = { text: hint.textContent.trim().slice(0, 60), ...cs(hint, ["fontSize", "color", "marginTop"]) };
      // the labels
      const labels = Array.from(card.querySelectorAll("label")).map((l) => l.textContent.trim().slice(0, 30)).filter(Boolean);
      if (labels.length) sec.labels = labels.slice(0, 12);

      out.sections.push(sec);
    }

    // --- the Save bar (text-anchored) ---
    const save = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Save All Changes"),
    );
    if (save) {
      out.save = {
        text: save.textContent.trim().slice(0, 40),
        w: rect(save).w,
        ...cs(save, ["height", "paddingLeft", "paddingRight", "borderRadius", "backgroundImage", "color", "fontSize", "fontWeight", "boxShadow"]),
        wrapper: cs(save.parentElement, ["position", "bottom", "gap", "justifyContent"]),
      };
    }
    return out;
  });
};

// ---------- the normalizers (Node-side) ----------
/** The real-layers shadow filter — the lesson-40 var-chain zero-layers
 *  class (the parity-dashboard precedent, verbatim). */
const realLayers = (s) =>
  String(s || "")
    .split(/,\s*(?=[a-z])/)
    .filter((l) => !/rgba\(\d+, \d+, \d+, 0\)/.test(l))
    .join(", ");

/** The gradient stop-triples normalizer — the lesson-40 color class
 *  (the moodForm/dashboard precedent, verbatim). */
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

// the landscape
report("landscape.tabCount", ref.landscape.tabCount === ours.landscape.tabCount, `${ours.landscape.tabCount} (ref ${ref.landscape.tabCount})`);
report("landscape.sectionCount", ref.landscape.sectionCount === ours.landscape.sectionCount, `${ours.landscape.sectionCount} (ref ${ref.landscape.sectionCount})`);

// the tablist
for (const m of ["rowW", "rowH", "rowY", "rowDisplay", "rowCols", "rowMt"]) {
  const av = ref.tablist[m];
  const bv = ours.tablist[m];
  report(`tablist.${m}`, av === bv, av === bv ? `${bv}` : `ref ${av} vs ours ${bv}`);
}
const tabN = Math.min(ref.tablist.tabs?.length ?? 0, ours.tablist.tabs?.length ?? 0);
for (let i = 0; i < tabN; i++) {
  const a = ref.tablist.tabs[i];
  const b = ours.tablist.tabs[i];
  for (const m of ["text", "role", "selected", "w", "h", "paddingTop", "paddingBottom", "paddingLeft", "borderRadius", "backgroundColor", "fontSize", "fontWeight"]) {
    report(`tab${i + 1}.${m}`, a[m] === b[m], a[m] === b[m] ? `${b[m]}` : `ref ${a[m]} vs ours ${b[m]}`);
  }
  report(
    `tab${i + 1}.shadow`,
    realLayers(a.boxShadow) === realLayers(b.boxShadow),
    realLayers(a.boxShadow) === realLayers(b.boxShadow) ? `real layers [${realLayers(b.boxShadow)}]` : `ref [${realLayers(a.boxShadow)}] vs ours [${realLayers(b.boxShadow)}]`,
  );
  // THE PINNED DEVIATION (a): the inactive tab ink — the reference's own
  // #737373 fails AA (4.35:1); ours supersedes with neutral-600 (7.17:1,
  // the WH-17 accessible superset, PAD §11).
  if (a.selected !== "true") {
    pinned(
      `tab${i + 1}.color (PINNED: the WH-17 a11y superset)`,
      a.color === "rgb(115, 115, 115)" && b.color === "rgb(82, 82, 82)",
      `ref ${a.color} (its own 4.35:1 AA failure) / ours ${b.color} (the superseding 7.17:1)`,
    );
  } else {
    report(`tab${i + 1}.color`, a.color === b.color, a.color === b.color ? `${b.color}` : `ref ${a.color} vs ours ${b.color}`);
  }
}

// the sections (DOM order; the titles identify them)
const SEC_NAMES = ["ThemeMode", "Colors", "Typography", "BackgroundImage", "VisualStyle"];
const secN = Math.min(ref.sections.length, ours.sections.length);
for (let i = 0; i < secN; i++) {
  const a = ref.sections[i];
  const b = ours.sections[i];
  const nm = SEC_NAMES[i] || `sec${i + 1}`;

  // the title (the TEXT is the member — the tag is the documented DOM-shape class)
  report(`${nm}.title.text`, a.title?.text === b.title?.text, a.title?.text === b.title?.text ? `${b.title?.text}` : `ref ${a.title?.text} vs ours ${b.title?.text}`);
  for (const m of ["fontSize", "fontWeight", "color", "iconW"]) {
    report(`${nm}.title.${m}`, a.title?.[m] === b.title?.[m], a.title?.[m] === b.title?.[m] ? `${b.title?.[m]}` : `ref ${a.title?.[m]} vs ours ${b.title?.[m]}`);
  }
  // the card chrome (the shadow normalized; the Colors card's height PINNED)
  for (const m of ["w", "backgroundColor", "borderWidth"]) {
    report(`${nm}.card.${m}`, a.card[m] === b.card[m], a.card[m] === b.card[m] ? `${b.card[m]}` : `ref ${a.card[m]} vs ours ${b.card[m]}`);
  }
  report(
    `${nm}.card.shadow`,
    realLayers(a.card.boxShadow) === realLayers(b.card.boxShadow),
    realLayers(a.card.boxShadow) === realLayers(b.card.boxShadow) ? `real layers [${realLayers(b.card.boxShadow)}]` : `ref [${realLayers(a.card.boxShadow)}] vs ours [${realLayers(b.card.boxShadow)}]`,
  );
  if (a.title?.text === "Colors") {
    // THE PINNED DEVIATION (b), the card-height leg: the active-preset
    // row's +20px (the "✓ Active" label line: mt-1 4px + the 16px
    // line) stretches the Colors card AND its row-1 grid siblings.
    const delta = (b.card.h ?? 0) - (a.card.h ?? 0);
    pinned(
      `${nm}.card.h (PINNED: the active-preset superset row)`,
      delta >= 18 && delta <= 22,
      `ref ${a.card.h} / ours ${b.card.h} (the +${delta} delta, the documented superset row)`,
    );
  } else {
    report(`${nm}.card.h`, a.card.h === b.card.h, a.card.h === b.card.h ? `${b.card.h}` : `ref ${a.card.h} vs ours ${b.card.h}`);
  }
  for (const arm of ["header", "body"]) {
    for (const m of ["paddingTop", "paddingLeft", "rowGap"]) {
      const av = a[arm]?.[m];
      const bv = b[arm]?.[m];
      report(`${nm}.${arm}.${m}`, av === bv, av === bv ? `${bv}` : `ref ${av} vs ours ${bv}`);
    }
  }

  // the Theme Mode family
  if (a.mode && b.mode) {
    for (const m of ["gridDisplay", "gridCols", "gridGap"]) {
      report(`${nm}.mode.${m}`, a.mode[m] === b.mode[m], a.mode[m] === b.mode[m] ? `${b.mode[m]}` : `ref ${a.mode[m]} vs ours ${b.mode[m]}`);
    }
    for (let c = 0; c < 3; c++) {
      const am = a.mode.cards[c];
      const bm = b.mode.cards[c];
      for (const m of ["text", "w", "h", "paddingTop", "paddingBottom", "borderWidth", "borderColor", "borderRadius", "backgroundColor", "color", "iconW", "labelFs"]) {
        report(`${nm}.mode.c${c + 1}.${m}`, am[m] === bm[m], am[m] === bm[m] ? `${bm[m]}` : `ref ${am[m]} vs ours ${bm[m]}`);
      }
      // THE PINNED DEVIATION (c): the aria-pressed a11y superset.
      pinned(
        `${nm}.mode.c${c + 1}.pressed (PINNED: the a11y superset)`,
        am.pressed === null && bm.pressed === (c === 0 ? "true" : "false"),
        `ref ${am.pressed} / ours ${bm.pressed}`,
      );
    }
  }

  // the preset family
  if (a.presets && b.presets) {
    for (const m of ["gridDisplay", "gridCols", "gridGap", "count"]) {
      report(`${nm}.presets.${m}`, a.presets[m] === b.presets[m], a.presets[m] === b.presets[m] ? `${b.presets[m]}` : `ref ${a.presets[m]} vs ours ${b.presets[m]}`);
    }
    const pc = Math.min(a.presets.cards.length, b.presets.cards.length);
    for (let c = 0; c < pc; c++) {
      const ap = a.presets.cards[c];
      const bp = b.presets.cards[c];
      const active = c === 0; // the demo default: Indigo Dream — the WH-17 superset site
      for (const m of ["label", "w", "paddingTop", "paddingBottom", "borderWidth", "borderRadius", "swatchW", "swatch1bg", "swatch2bg", "labelFs", "labelLh", "labelFw", "labelDisplay", "labelColor"]) {
        report(`${nm}.preset${c + 1}.${m}`, ap[m] === bp[m], ap[m] === bp[m] ? `${bp[m]}` : `ref ${ap[m]} vs ours ${bp[m]}`);
      }
      if (active) {
        // THE PINNED DEVIATION (b): the active preset card — the reference
        // carries NO visible active state; ours adds the ring + label.
        pinned(
          `${nm}.preset1.borderColor (PINNED: the active-ring superset)`,
          ap.borderColor === "rgb(229, 229, 229)" && bp.borderColor.startsWith("rgb(99, 102, 241)"),
          `ref ${ap.borderColor} (no active state) / ours ${bp.borderColor} (the ring)`,
        );
        pinned(
          `${nm}.preset1.texts (PINNED: the ✓ Active label superset)`,
          ap.texts === ap.label && bp.texts === `${bp.label} Active`,
          `ref "${ap.texts}" / ours "${bp.texts}"`,
        );
        const delta = (bp.h ?? 0) - (ap.h ?? 0);
        pinned(
          `${nm}.preset1.h (PINNED: the superset row)`,
          delta >= 18 && delta <= 22,
          `ref ${ap.h} / ours ${bp.h} (the +${delta} label line)`,
        );
      } else if (c <= 3) {
        // ROW-1 SIBLINGS (Ocean Blue / Forest Green / Sunset Orange): the
        // grid stretch rides the active card's +20 — the documented
        // superset's row consequence, pinned at the same delta.
        const delta = (bp.h ?? 0) - (ap.h ?? 0);
        pinned(
          `${nm}.preset${c + 1}.h (PINNED: the row-1 grid stretch under the active superset)`,
          delta >= 18 && delta <= 22,
          `ref ${ap.h} / ours ${bp.h} (the +${delta} row stretch)`,
        );
        report(`${nm}.preset${c + 1}.borderColor`, ap.borderColor === bp.borderColor, ap.borderColor === bp.borderColor ? `${bp.borderColor}` : `ref ${ap.borderColor} vs ours ${bp.borderColor}`);
        report(`${nm}.preset${c + 1}.texts`, ap.texts === bp.texts, ap.texts === bp.texts ? `${bp.texts}` : `ref ${ap.texts} vs ours ${bp.texts}`);
        report(
          `${nm}.preset${c + 1}.shadow`,
          realLayers(ap.boxShadow) === realLayers(bp.boxShadow),
          realLayers(ap.boxShadow) === realLayers(bp.boxShadow) ? `real layers [${realLayers(bp.boxShadow)}]` : `ref [${realLayers(ap.boxShadow)}] vs ours [${realLayers(bp.boxShadow)}]`,
        );
      } else {
        report(`${nm}.preset${c + 1}.h`, ap.h === bp.h, ap.h === bp.h ? `${ap.h}` : `ref ${ap.h} vs ours ${bp.h}`);
        report(`${nm}.preset${c + 1}.borderColor`, ap.borderColor === bp.borderColor, ap.borderColor === bp.borderColor ? `${bp.borderColor}` : `ref ${ap.borderColor} vs ours ${bp.borderColor}`);
        report(`${nm}.preset${c + 1}.texts`, ap.texts === bp.texts, ap.texts === bp.texts ? `${bp.texts}` : `ref ${ap.texts} vs ours ${bp.texts}`);
        report(
          `${nm}.preset${c + 1}.shadow`,
          realLayers(ap.boxShadow) === realLayers(bp.boxShadow),
          realLayers(ap.boxShadow) === realLayers(bp.boxShadow) ? `real layers [${realLayers(bp.boxShadow)}]` : `ref [${realLayers(ap.boxShadow)}] vs ours [${realLayers(bp.boxShadow)}]`,
        );
      }
    }
  }

  // the color inputs + hex inputs + picker row
  const ciN = Math.min(a.colorInputs?.length ?? 0, b.colorInputs?.length ?? 0);
  for (let c = 0; c < ciN; c++) {
    for (const m of ["w", "h", "value", "borderRadius", "fontSize"]) {
      report(`${nm}.colorInput${c + 1}.${m}`, a.colorInputs[c][m] === b.colorInputs[c][m], a.colorInputs[c][m] === b.colorInputs[c][m] ? `${b.colorInputs[c][m]}` : `ref ${a.colorInputs[c][m]} vs ours ${b.colorInputs[c][m]}`);
    }
  }
  const hxN = Math.min(a.hexInputs?.length ?? 0, b.hexInputs?.length ?? 0);
  for (let c = 0; c < hxN; c++) {
    for (const m of ["value", "placeholder", "height", "borderRadius", "fontSize", "paddingLeft"]) {
      report(`${nm}.hexInput${c + 1}.${m}`, a.hexInputs[c][m] === b.hexInputs[c][m], a.hexInputs[c][m] === b.hexInputs[c][m] ? `${b.hexInputs[c][m]}` : `ref ${a.hexInputs[c][m]} vs ours ${b.hexInputs[c][m]}`);
    }
  }
  if (a.pickerRow && b.pickerRow) {
    for (const m of ["display", "gap", "alignItems", "marginTop"]) {
      report(`${nm}.pickerRow.${m}`, a.pickerRow[m] === b.pickerRow[m], a.pickerRow[m] === b.pickerRow[m] ? `${b.pickerRow[m]}` : `ref ${a.pickerRow[m]} vs ours ${b.pickerRow[m]}`);
    }
  }

  // the preview tile (the gradient normalized)
  if (a.previewTile && b.previewTile) {
    for (const m of ["text", "w", "h", "padding", "borderRadius", "color", "fontSize", "fontWeight", "textAlign"]) {
      report(`${nm}.previewTile.${m}`, a.previewTile[m] === b.previewTile[m], a.previewTile[m] === b.previewTile[m] ? `${b.previewTile[m]}` : `ref ${a.previewTile[m]} vs ours ${b.previewTile[m]}`);
    }
    report(
      `${nm}.previewTile.gradient`,
      gradientStops(a.previewTile.backgroundImage) === gradientStops(b.previewTile.backgroundImage),
      gradientStops(a.previewTile.backgroundImage) === gradientStops(b.previewTile.backgroundImage) ? `stops ${gradientStops(b.previewTile.backgroundImage)}` : `ref [${gradientStops(a.previewTile.backgroundImage)}] vs ours [${gradientStops(b.previewTile.backgroundImage)}]`,
    );
  }

  // the typography preview
  if (a.typePreview && b.typePreview) {
    for (const m of ["text", "fontSize", "fontWeight"]) {
      report(`${nm}.typePreview.${m}`, a.typePreview[m] === b.typePreview[m], a.typePreview[m] === b.typePreview[m] ? `${b.typePreview[m]}` : `ref ${a.typePreview[m]} vs ours ${b.typePreview[m]}`);
    }
    for (const m of ["marginTop", "padding", "borderWidth", "borderRadius"]) {
      report(`${nm}.typePreview.block.${m}`, a.typePreview.block[m] === b.typePreview.block[m], a.typePreview.block[m] === b.typePreview.block[m] ? `${b.typePreview.block[m]}` : `ref ${a.typePreview.block[m]} vs ours ${b.typePreview.block[m]}`);
    }
    for (const m of ["subText", "subFs", "subColor"]) {
      report(`${nm}.typePreview.${m}`, a.typePreview[m] === b.typePreview[m], a.typePreview[m] === b.typePreview[m] ? `${b.typePreview[m]}` : `ref ${a.typePreview[m]} vs ours ${b.typePreview[m]}`);
    }
  }

  // the comboboxes (the value texts are DATA — the demo's default prefs)
  const cbN = Math.min(a.combos?.length ?? 0, b.combos?.length ?? 0);
  report(`${nm}.comboCount`, (a.combos?.length ?? 0) === (b.combos?.length ?? 0), `${b.combos?.length ?? 0} (ref ${a.combos?.length ?? 0})`);
  for (let c = 0; c < cbN; c++) {
    for (const m of ["text", "w", "height", "borderRadius", "fontSize", "borderWidth", "borderColor", "backgroundColor", "paddingLeft"]) {
      report(`${nm}.combo${c + 1}.${m}`, a.combos[c][m] === b.combos[c][m], a.combos[c][m] === b.combos[c][m] ? `${b.combos[c][m]}` : `ref ${a.combos[c][m]} vs ours ${b.combos[c][m]}`);
    }
  }

  // the plain inputs + the hint
  const plN = Math.min(a.plainInputs?.length ?? 0, b.plainInputs?.length ?? 0);
  for (let c = 0; c < plN; c++) {
    for (const m of ["placeholder", "height", "borderRadius", "fontSize"]) {
      report(`${nm}.plainInput${c + 1}.${m}`, a.plainInputs[c][m] === b.plainInputs[c][m], a.plainInputs[c][m] === b.plainInputs[c][m] ? `${b.plainInputs[c][m]}` : `ref ${a.plainInputs[c][m]} vs ours ${b.plainInputs[c][m]}`);
    }
  }
  if (a.hint && b.hint) {
    for (const m of ["text", "fontSize", "color", "marginTop"]) {
      report(`${nm}.hint.${m}`, a.hint[m] === b.hint[m], a.hint[m] === b.hint[m] ? `${b.hint[m]}` : `ref ${a.hint[m]} vs ours ${b.hint[m]}`);
    }
  }
  // the labels
  if (a.labels && b.labels) {
    report(`${nm}.labels`, JSON.stringify(a.labels) === JSON.stringify(b.labels), JSON.stringify(b.labels));
  }
}

// the Save bar
if (ref.save && ours.save) {
  report("save.text", ref.save.text === ours.save.text, ref.save.text === ours.save.text ? `${ours.save.text}` : `ref ${ref.save.text} vs ours ${ours.save.text}`);
  for (const m of ["w", "height", "paddingLeft", "paddingRight", "borderRadius", "color", "fontSize", "fontWeight"]) {
    report(`save.${m}`, ref.save[m] === ours.save[m], ref.save[m] === ours.save[m] ? `${ours.save[m]}` : `ref ${ref.save[m]} vs ours ${ours.save[m]}`);
  }
  report(
    "save.gradient",
    gradientStops(ref.save.backgroundImage) === gradientStops(ours.save.backgroundImage),
    gradientStops(ref.save.backgroundImage) === gradientStops(ours.save.backgroundImage) ? `stops ${gradientStops(ours.save.backgroundImage)}` : `ref [${gradientStops(ref.save.backgroundImage)}] vs ours [${gradientStops(ours.save.backgroundImage)}]`,
  );
  report(
    "save.shadow",
    realLayers(ref.save.boxShadow) === realLayers(ours.save.boxShadow),
    realLayers(ref.save.boxShadow) === realLayers(ours.save.boxShadow) ? `real layers [${realLayers(ours.save.boxShadow)}]` : `ref [${realLayers(ref.save.boxShadow)}] vs ours [${realLayers(ours.save.boxShadow)}]`,
  );
  for (const m of ["position", "bottom", "gap", "justifyContent"]) {
    report(`save.wrapper.${m}`, ref.save.wrapper[m] === ours.save.wrapper[m], ref.save.wrapper[m] === ours.save.wrapper[m] ? `${ours.save.wrapper[m]}` : `ref ${ref.save.wrapper[m]} vs ours ${ours.save.wrapper[m]}`);
  }
}

const bad = results.filter((r) => !r.ok);
console.log(
  `--- PARITY-PROFILE RESULT: ${results.length - bad.length}/${results.length} members MATCH (both apps, same round) ---`,
);
if (bad.length > 0) {
  console.log(`DRIFT/ERROR count: ${bad.length}`);
  process.exit(1);
}
process.exit(0);
