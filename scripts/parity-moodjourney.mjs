// parity-moodjourney.mjs — the FOURTEENTH committed parity surface
// (WH-48): the mood list "Your Journey" tile interior + the MH KPI row's
// days-sub ladder + the dashboard's Upcoming Reminders/Events card
// interiors — the WH-47 plan's (c) candidates, decode-settled live first.
//
//   node scripts/parity-moodjourney.mjs   (our dev server must be up)
//
// ONE login per app, TWO routes (/mentalhealth + /dashboard), ZERO-WRITE
//   (login + read only — nothing clicked, nothing hovered). The reference
//   login budget: ONE (the battery's two-window pacing applies; our dev
//   server runs the same per-process limiter — restart it between the
//   battery and any decode phase, the lesson-46 doctrine).
//
// THE MEMBER SET (~66): the JOURNEY family (the card chrome 12px/white/
//   960x206 + the p-24 h=64 header + the 0-24-24 body at h=142 + the
//   tile p-24/radius-16/border-1px-gray-100/transition-all-0.15s at
//   912x118 + the row flex/flex-start/gap-16 at h=68 + the 64x64 chip
//   (radius 16, the blue-500→cyan-500 to-bottom-right gradient, the
//   real-layers shadow, the 30px emoji) + the labelRow flex/center/
//   space-between/mb-8 at h=28 + the H4 label 18px/600 + the SPAN date
//   14px + the energy p 14px + the full y-ladder 296/360/385) + the
//   KPI-DAYS family (the MH grid h=128, the Current Streak tile's days
//   sub at fs 12px/lh 16px — the WH-48 F-1 cure's verification member,
//   the reference's own two-site split: its dashboard/goals subs stay
//   text-sm) + the LADDER family (the KPI bottom 264 → the card y 296,
//   the 32px gap) + the UPCOMING family (both dashboard cards: the chrome
//   12px/white/304x180 + the p-24 h=68 headers + the 16px/600 titles +
//   the 20px icons + the 0-24-24 bodies at h=112 + the empty ps 16px/400
//   gray-500 centered at 256x88 + the landscape counts).
//
// THE PINNED-DEVIATION member: the journey tile's DELETE button — ours
//   PRESENT at h=28px (the h-7 cure: exactly the reference's labelRow
//   line box, the WH-48 F-2 cure), the reference's ABSENT (it carries no
//   delete anywhere — our documented functional superset). A pin failing
//   is a DRIFT: if the reference ever GAINS a delete surface, or our
//   button drifts off the 28px line box, the pin fires (the
//   parity-account Session-card precedent).
//
// DOM-SHAPE FACTS (documented, zero rendered-face consequence — the
//   lesson-27/48 class): our journey card is a <section> where the
//   reference's is a plain <div>; our card title is an <h2>, the
//   reference's a bare <div>; our journey label/date ride the SAME H4/
//   SPAN tags as the reference's. The card anchor matches BOTH tags.
//
// Exit 0 when every member matches; exit 1 on any DRIFT or PROBE-ERROR
//   — a drift is a FINDING for the round's plan (the lesson-41 class:
//   investigate, never a silent re-base).
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
const pinned = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "PINNED" : "DRIFT "} ${member}: ${detail}`);
};

// The shared in-page helper factory (the parity-listinteriors anchor,
// verbatim) — symmetric across both apps.
const FACTORY = `
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
    return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x) };
  };
  const cardsOf = () => {
    const all = Array.from(document.querySelectorAll("div, section"));
    return all.filter((d) => {
      const r = d.getBoundingClientRect();
      const s = getComputedStyle(d);
      return r.width >= 200 && r.height >= 24 && s.borderRadius === "12px";
    }).filter((d) => {
      return !all.some((o) => o !== d && o.contains(d) && getComputedStyle(o).borderRadius === "12px" &&
        o.getBoundingClientRect().width >= 200);
    });
  };
  const cardByTitle = (title) => {
    const c = cardsOf().filter((d) => (d.textContent || "").trim().startsWith(title))
      .sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width);
    return c[0] || null;
  };
  const realLayers = (shadow) => {
    if (!shadow || shadow === "none") return "none";
    return shadow.split(/,(?![^(]*\\))/).map((l) => l.trim()).filter((l) => {
      const m = l.match(/rgba?\\([^)]*\\)/g);
      if (!m) return true;
      return m.some((c) => { const a = c.match(/,\\s*([\\d.]+)\\)/); return !a || parseFloat(a[1]) > 0; });
    }).join(" | ");
  };
  return { cs, rect, cardsOf, cardByTitle, realLayers };
})()
`;

/** The real-layers shadow normalizer (lesson 40, the parity standing
 *  form): v4's var-chain zero layers vs the CDN's — extract only the
 *  layers with non-zero alpha, canonicalized as "x,y,blur,spread,alpha". */
const realLayers = (shadow) => {
  if (!shadow || shadow === "none") return "none";
  return shadow.split(/,(?![^(]*\))/).map((l) => l.trim()).filter((l) => {
    const m = l.match(/rgba?\([^)]*\)/g);
    if (!m) return true;
    return m.some((c) => { const a = c.match(/,\s*([\d.]+)\)/); return !a || parseFloat(a[1]) > 0; });
  }).join(" | ");
};

/** The gradient-stop normalizer (lesson 40): parse a linear-gradient
 *  into direction + stops list — the CDN's `to right bottom` and v4's
 *  computed forms compare as parsed stops. */
const gradStops = (bg) => {
  if (!bg || !bg.includes("gradient")) return "none";
  const inner = bg.slice(bg.indexOf("(") + 1, bg.lastIndexOf(")"));
  const parts = inner.split(/,(?![^)]*\))/).map((s) => s.trim()).filter(Boolean);
  const dir = parts.shift() || "";
  return `${dir.split(" ").slice(-2).join(" ")} :: ${parts.join(", ")}`;
};

const gotoApp = async (page, base, route) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector("main", { timeout: 20000 });
  await page.waitForTimeout(900);
};

// The read bodies are built on the factory's return value; assemble via
// an IIFE string that first evaluates the factory.
const buildRead = (body) => `
(() => {
  const H = ${FACTORY};
  ${body}
})()
`;

const JOURNEY_BODY = `
  const out = {};
  const card = H.cardByTitle("Your Journey");
  if (!card) return { found: false };
  const kids = Array.from(card.children);
  const header = kids[0];
  const body = kids[kids.length - 1];
  out.found = true;
  out.cardTag = card.tagName;
  out.card = { ...H.cs(card, ["borderRadius", "backgroundColor"]), shadow: H.realLayers(getComputedStyle(card).boxShadow), ...H.rect(card) };
  out.header = header ? { ...H.cs(header, ["display", "padding"]), ...H.rect(header) } : null;
  const titleEl = header ? Array.from(header.querySelectorAll("*")).find((e) => (e.textContent || "").trim() === "Your Journey") : null;
  out.title = titleEl ? { tag: titleEl.tagName, ...H.cs(titleEl, ["fontSize", "fontWeight", "color"]) } : null;
  out.body = body ? { ...H.cs(body, ["padding"]), ...H.rect(body), childCount: body.children.length } : null;
  const container = body ? Array.from(body.children).find((c) => c.children.length > 0) : null;
  out.container = container ? { ...H.cs(container, ["display"]), ...H.rect(container), childCount: container.children.length } : null;
  const tile = container ? container.firstElementChild : null;
  if (tile) {
    out.tile = { ...H.cs(tile, ["padding", "borderRadius", "borderWidth", "borderColor", "backgroundColor", "transitionProperty", "transitionDuration"]), shadow: H.realLayers(getComputedStyle(tile).boxShadow), ...H.rect(tile) };
    const row = tile.firstElementChild;
    if (row) {
      out.row = { ...H.cs(row, ["display", "alignItems", "gap"]), ...H.rect(row) };
      const chip = row.firstElementChild;
      if (chip) out.chip = { ...H.cs(chip, ["width", "height", "borderRadius", "fontSize"]), grad: getComputedStyle(chip).backgroundImage || "", shadow: H.realLayers(getComputedStyle(chip).boxShadow), ...H.rect(chip), text: (chip.textContent || "").trim().slice(0, 4) };
      const content = row.lastElementChild;
      if (content) {
        const labelRow = content.firstElementChild;
        if (labelRow) {
          out.labelRow = { ...H.cs(labelRow, ["display", "alignItems", "justifyContent", "marginBottom"]), ...H.rect(labelRow) };
          const kids2 = Array.from(labelRow.children);
          out.label = kids2[0] ? { tag: kids2[0].tagName, ...H.cs(kids2[0], ["fontSize", "fontWeight", "color"]), text: (kids2[0].textContent || "").trim().slice(0, 20) } : null;
          // the date: the labelRow's SPAN (ours nests it inside the right-side
          // group div beside the delete button; the reference's sits bare) —
          // anchor the SPAN, never the group wrapper (its inherited ink)
          const dateEl = labelRow.querySelector("span");
          out.date = dateEl ? { tag: dateEl.tagName, ...H.cs(dateEl, ["fontSize", "color"]), text: (dateEl.textContent || "").trim().slice(0, 24) } : null;
          const del = labelRow.querySelector("button");
          out.deleteBtn = del ? { present: true, h: Math.round(del.getBoundingClientRect().height) } : { present: false };
        }
        const ps = Array.from(content.querySelectorAll(":scope > p")).filter((p) => p.textContent.trim());
        out.energy = ps[0] ? { ...H.cs(ps[0], ["fontSize", "color"]), text: (ps[0].textContent || "").trim().slice(0, 30) } : null;
      }
    }
  }
  return out;
`;

const KPI_BODY = `
  const out = {};
  const main = document.querySelector("main");
  const grids = Array.from(main ? main.querySelectorAll("div") : []).filter((d) => {
    const s = getComputedStyle(d);
    return s.display === "grid" && d.children.length === 3 && s.gridTemplateColumns.split(" ").length === 3;
  });
  const g = grids[0];
  if (!g) return { found: false };
  out.found = true;
  out.grid = { ...H.cs(g, ["gridTemplateColumns", "gap"]), ...H.rect(g) };
  const tiles = Array.from(g.children);
  out.tileHs = tiles.map((t) => Math.round(t.getBoundingClientRect().height));
  // the Current Streak tile (the third) — the days sub (the F-1 member)
  const t3 = tiles[2];
  if (t3) {
    const ps = Array.from(t3.querySelectorAll("p"));
    const days = ps[ps.length - 1];
    out.days = days ? { ...H.cs(days, ["fontSize", "lineHeight", "color"]), text: (days.textContent || "").trim() } : null;
  }
  // the ladder: the KPI grid bottom -> the Your Journey card top
  const journey = H.cardByTitle("Your Journey");
  if (journey) {
    const gr = g.getBoundingClientRect();
    const jr = journey.getBoundingClientRect();
    out.ladder = { kpiBottom: Math.round(gr.y + gr.height), cardY: Math.round(jr.y), gap: Math.round(jr.y - gr.y - gr.height) };
  }
  return out;
`;

const UPCOMING_BODY = `
  const out = { reminders: { found: false }, events: { found: false } };
  for (const kind of ["reminders", "events"]) {
    const title = kind === "reminders" ? "Upcoming Reminders" : "Upcoming Events";
    const card = H.cardByTitle(title);
    if (!card) continue;
    const kids = Array.from(card.children);
    const header = kids[0];
    const body = kids[kids.length - 1];
    const titleEl = header ? Array.from(header.querySelectorAll("*")).find((e) => (e.textContent || "").trim() === title) : null;
    const icon = header ? header.querySelector("svg") : null;
    const p = body ? body.querySelector("p") : null;
    out[kind] = {
      found: true,
      cardTag: card.tagName,
      card: { ...H.cs(card, ["borderRadius", "backgroundColor"]), ...H.rect(card) },
      header: header ? { ...H.cs(header, ["display", "padding"]), ...H.rect(header) } : null,
      title: titleEl ? { tag: titleEl.tagName, ...H.cs(titleEl, ["fontSize", "fontWeight", "color"]) } : null,
      titleIcon: icon ? { ...H.cs(icon, ["width", "height", "color"]) } : null,
      body: body ? { ...H.cs(body, ["padding"]), ...H.rect(body), childCount: body.children.length } : null,
      emptyP: p ? { text: (p.textContent || "").trim().slice(0, 40), ...H.cs(p, ["fontSize", "fontWeight", "color", "textAlign"]), ...H.rect(p) } : null,
    };
  }
  return out;
`;

const runPass = async (page, base) => {
  await page.goto(`${base}/login`, { waitUntil: "networkidle" });
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForSelector("main", { timeout: 30000 });
  await page.waitForTimeout(900);
  const out = {};
  await gotoApp(page, base, "/mentalhealth");
  out.journey = await page.evaluate(buildRead(JOURNEY_BODY));
  out.kpi = await page.evaluate(buildRead(KPI_BODY));
  await gotoApp(page, base, "/dashboard");
  out.upcoming = await page.evaluate(buildRead(UPCOMING_BODY));
  return out;
};

// ---------- the passes ----------
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const probe = async (fn) => {
  try {
    return await fn();
  } catch (e) {
    return { __error: String(e).slice(0, 200) };
  }
};

console.log("--- PASS A: the reference (one login) ---");
const A = await probe(() => runPass(page, REF));
if (A.__error) {
  console.log(`PROBE-ERROR reference: ${A.__error}`);
  await browser.close();
  process.exit(1);
}
console.log("--- PASS B: our dev server (one login) ---");
const B = await probe(() => runPass(page, DEV));
if (B.__error) {
  console.log(`PROBE-ERROR dev: ${B.__error}`);
  await browser.close();
  process.exit(1);
}

console.log("--- DIFF (ref vs ours, member by member) ---");

// ===== 1. the JOURNEY family =====
if (!A.journey?.found || !B.journey?.found) {
  report("journey.__probe", false, `ref found=${A.journey?.found} vs ours found=${B.journey?.found}`);
} else {
  const Aj = A.journey, Bj = B.journey;
  for (const m of ["borderRadius", "backgroundColor", "shadow"]) {
    report(`journey.card.${m}`, Aj.card[m] === Bj.card[m], `${Bj.card[m]} (ref ${Aj.card[m]})`);
  }
  for (const m of ["y", "w", "h"]) {
    report(`journey.card.${m}`, Aj.card[m] === Bj.card[m], `${Bj.card[m]} (ref ${Aj.card[m]})`);
  }
  for (const m of ["display", "padding"]) {
    report(`journey.header.${m}`, Aj.header[m] === Bj.header[m], `${Bj.header[m]}`);
  }
  report(`journey.header.h`, Aj.header.h === Bj.header.h, `${Bj.header.h} (ref ${Aj.header.h})`);
  report(`journey.title.fs`, Aj.title.fontSize === Bj.title.fontSize, `${Bj.title.fontSize}`);
  report(`journey.title.fw`, Aj.title.fontWeight === Bj.title.fontWeight, `${Bj.title.fontWeight}`);
  report(`journey.title.color`, Aj.title.color === Bj.title.color, `${Bj.title.color}`);
  for (const m of ["padding"]) {
    report(`journey.body.${m}`, Aj.body[m] === Bj.body[m], `${Bj.body[m]}`);
  }
  for (const m of ["y", "h"]) {
    report(`journey.body.${m}`, Aj.body[m] === Bj.body[m], `${Bj.body[m]} (ref ${Aj.body[m]})`);
  }
  report(`journey.body.childCount`, Aj.body.childCount === Bj.body.childCount, `${Bj.body.childCount}`);
  report(`journey.container.childCount`, Aj.container.childCount === Bj.container.childCount, `${Bj.container.childCount}`);
  report(`journey.container.display`, Aj.container.display === Bj.container.display, `${Bj.container.display}`);
  for (const m of ["padding", "borderRadius", "borderWidth", "borderColor", "backgroundColor", "transitionProperty", "transitionDuration", "shadow"]) {
    report(`journey.tile.${m}`, Aj.tile[m] === Bj.tile[m], `${Bj.tile[m]} (ref ${Aj.tile[m]})`);
  }
  for (const m of ["y", "w", "h"]) {
    report(`journey.tile.${m}`, Aj.tile[m] === Bj.tile[m], `${Bj.tile[m]} (ref ${Aj.tile[m]})`);
  }
  report(`journey.row.display`, Aj.row.display === Bj.row.display, `${Bj.row.display}`);
  report(`journey.row.alignItems`, Aj.row.alignItems === Bj.row.alignItems, `${Bj.row.alignItems}`);
  report(`journey.row.gap`, Aj.row.gap === Bj.row.gap, `${Bj.row.gap}`);
  for (const m of ["y", "h"]) {
    report(`journey.row.${m}`, Aj.row[m] === Bj.row[m], `${Bj.row[m]} (ref ${Aj.row[m]})`);
  }
  report(`journey.chip.w`, Aj.chip.width === Bj.chip.width, `${Bj.chip.width}`);
  report(`journey.chip.h`, Aj.chip.height === Bj.chip.height, `${Bj.chip.height}`);
  report(`journey.chip.borderRadius`, Aj.chip.borderRadius === Bj.chip.borderRadius, `${Bj.chip.borderRadius}`);
  report(`journey.chip.fontSize`, Aj.chip.fontSize === Bj.chip.fontSize, `${Bj.chip.fontSize}`);
  // gradients compare their rgb STOP TRIPLES (the parity-moodform
  // GRADIENT_STOPS convention — the platforms serialize the full property
  // differently [whitespace, oklab, % hints, direction word order]; the
  // stops are the parity claim). The pair: blue-500 → cyan-500 (the
  // moodform activeTileBg's own family).
  const CHIP_STOPS = ["59, 130, 246", "6, 182, 212"];
  report(`journey.chip.gradStops`, CHIP_STOPS.every((x) => Aj.chip.grad.includes(x)) && CHIP_STOPS.every((x) => Bj.chip.grad.includes(x)), `stops ${CHIP_STOPS.join(" -> ")} (blue-500 -> cyan-500, the moodform convention)`);
  report(`journey.chip.shadow`, Aj.chip.shadow === Bj.chip.shadow, `${Bj.chip.shadow.slice(0, 60)} (ref ${Aj.chip.shadow.slice(0, 60)})`);
  report(`journey.chip.text`, Aj.chip.text === Bj.chip.text, `${Bj.chip.text}`);
  report(`journey.chip.x`, Aj.chip.x === Bj.chip.x, `${Bj.chip.x} (ref ${Aj.chip.x})`);
  report(`journey.chip.y`, Aj.chip.y === Bj.chip.y, `${Bj.chip.y} (ref ${Aj.chip.y})`);
  report(`journey.labelRow.display`, Aj.labelRow.display === Bj.labelRow.display, `${Bj.labelRow.display}`);
  report(`journey.labelRow.alignItems`, Aj.labelRow.alignItems === Bj.labelRow.alignItems, `${Bj.labelRow.alignItems}`);
  report(`journey.labelRow.justifyContent`, Aj.labelRow.justifyContent === Bj.labelRow.justifyContent, `${Bj.labelRow.justifyContent}`);
  report(`journey.labelRow.marginBottom`, Aj.labelRow.marginBottom === Bj.labelRow.marginBottom, `${Bj.labelRow.marginBottom}`);
  report(`journey.labelRow.h`, Aj.labelRow.h === Bj.labelRow.h, `${Bj.labelRow.h} (ref ${Aj.labelRow.h})`);
  report(`journey.label.fs`, Aj.label.fontSize === Bj.label.fontSize, `${Bj.label.fontSize}`);
  report(`journey.label.fw`, Aj.label.fontWeight === Bj.label.fontWeight, `${Bj.label.fontWeight}`);
  report(`journey.label.color`, Aj.label.color === Bj.label.color, `${Bj.label.color}`);
  report(`journey.label.text`, Aj.label.text === Bj.label.text, `${Bj.label.text}`);
  report(`journey.date.fs`, Aj.date.fontSize === Bj.date.fontSize, `${Bj.date.fontSize}`);
  report(`journey.date.color`, Aj.date.color === Bj.date.color, `${Bj.date.color}`);
  report(`journey.date.text`, Aj.date.text === Bj.date.text, `${Bj.date.text}`);
  report(`journey.energy.fs`, Aj.energy.fontSize === Bj.energy.fontSize, `${Bj.energy.fontSize}`);
  report(`journey.energy.color`, Aj.energy.color === Bj.energy.color, `${Bj.energy.color}`);
  report(`journey.energy.text`, Aj.energy.text === Bj.energy.text, `${Bj.energy.text}`);
  // THE PINNED-DEVIATION member — the delete button (the F-2 cure's pin)
  pinned(
    "journey.deleteBtn (PINNED: ours present at the 28px line box, the reference's absent — the documented superset)",
    Boolean(Bj.deleteBtn?.present) && Bj.deleteBtn.h === 28 && !Aj.deleteBtn?.present,
    `ours ${Bj.deleteBtn?.present ? `present h=${Bj.deleteBtn.h}px` : "ABSENT"} / ref ${Aj.deleteBtn?.present ? `present h=${Aj.deleteBtn.h}px` : "absent"}`
  );
}

// ===== 2. the KPI-DAYS family (the F-1 cure's verification members) =====
if (!A.kpi?.found || !B.kpi?.found) {
  report("kpi.__probe", false, `ref found=${A.kpi?.found} vs ours found=${B.kpi?.found}`);
} else {
  report(`kpi.grid.h`, A.kpi.grid.h === B.kpi.grid.h, `${B.kpi.grid.h} (ref ${A.kpi.grid.h})`);
  report(`kpi.grid.cols`, A.kpi.grid.gridTemplateColumns === B.kpi.grid.gridTemplateColumns, `${B.kpi.grid.gridTemplateColumns}`);
  report(`kpi.grid.gap`, A.kpi.grid.gap === B.kpi.grid.gap, `${B.kpi.grid.gap}`);
  for (let i = 0; i < 3; i++) {
    report(`kpi.tile${i + 1}H`, A.kpi.tileHs[i] === B.kpi.tileHs[i], `${B.kpi.tileHs[i]} (ref ${A.kpi.tileHs[i]})`);
  }
  report(`kpi.days.fs`, A.kpi.days.fontSize === B.kpi.days.fontSize, `${B.kpi.days.fontSize} (ref ${A.kpi.days.fontSize})`);
  report(`kpi.days.lh`, A.kpi.days.lineHeight === B.kpi.days.lineHeight, `${B.kpi.days.lineHeight} (ref ${A.kpi.days.lineHeight})`);
  report(`kpi.days.color`, A.kpi.days.color === B.kpi.days.color, `${B.kpi.days.color}`);
  report(`kpi.days.text`, A.kpi.days.text === B.kpi.days.text, `${B.kpi.days.text}`);
  for (const m of ["kpiBottom", "cardY", "gap"]) {
    report(`kpi.ladder.${m}`, A.kpi.ladder[m] === B.kpi.ladder[m], `${B.kpi.ladder[m]} (ref ${A.kpi.ladder[m]})`);
  }
}

// ===== 3. the UPCOMING family =====
for (const kind of ["reminders", "events"]) {
  const Ak = A.upcoming[kind], Bk = B.upcoming[kind];
  if (!Ak?.found || !Bk?.found) {
    report(`upcoming.${kind}.__probe`, false, `ref found=${Ak?.found} vs ours found=${Bk?.found}`);
    continue;
  }
  for (const m of ["borderRadius", "backgroundColor"]) {
    report(`upcoming.${kind}.card.${m}`, Ak.card[m] === Bk.card[m], `${Bk.card[m]}`);
  }
  for (const m of ["y", "w", "h"]) {
    report(`upcoming.${kind}.card.${m}`, Ak.card[m] === Bk.card[m], `${Bk.card[m]} (ref ${Ak.card[m]})`);
  }
  report(`upcoming.${kind}.header.padding`, Ak.header.padding === Bk.header.padding, `${Bk.header.padding}`);
  report(`upcoming.${kind}.header.h`, Ak.header.h === Bk.header.h, `${Bk.header.h} (ref ${Ak.header.h})`);
  report(`upcoming.${kind}.title.fs`, Ak.title.fontSize === Bk.title.fontSize, `${Bk.title.fontSize}`);
  report(`upcoming.${kind}.title.fw`, Ak.title.fontWeight === Bk.title.fontWeight, `${Bk.title.fontWeight}`);
  report(`upcoming.${kind}.title.color`, Ak.title.color === Bk.title.color, `${Bk.title.color}`);
  report(`upcoming.${kind}.titleIcon.w`, Ak.titleIcon.width === Bk.titleIcon.width, `${Bk.titleIcon.width}`);
  report(`upcoming.${kind}.titleIcon.h`, Ak.titleIcon.height === Bk.titleIcon.height, `${Bk.titleIcon.height}`);
  report(`upcoming.${kind}.titleIcon.color`, Ak.titleIcon.color === Bk.titleIcon.color, `${Bk.titleIcon.color}`);
  report(`upcoming.${kind}.body.padding`, Ak.body.padding === Bk.body.padding, `${Bk.body.padding}`);
  report(`upcoming.${kind}.body.h`, Ak.body.h === Bk.body.h, `${Bk.body.h} (ref ${Ak.body.h})`);
  report(`upcoming.${kind}.body.childCount`, Ak.body.childCount === Bk.body.childCount, `${Bk.body.childCount}`);
  report(`upcoming.${kind}.emptyP.text`, Ak.emptyP.text === Bk.emptyP.text, `${Bk.emptyP.text}`);
  report(`upcoming.${kind}.emptyP.fs`, Ak.emptyP.fontSize === Bk.emptyP.fontSize, `${Bk.emptyP.fontSize}`);
  report(`upcoming.${kind}.emptyP.color`, Ak.emptyP.color === Bk.emptyP.color, `${Bk.emptyP.color}`);
  report(`upcoming.${kind}.emptyP.textAlign`, Ak.emptyP.textAlign === Bk.emptyP.textAlign, `${Bk.emptyP.textAlign}`);
  report(`upcoming.${kind}.emptyP.w`, Ak.emptyP.w === Bk.emptyP.w, `${Bk.emptyP.w}`);
  report(`upcoming.${kind}.emptyP.h`, Ak.emptyP.h === Bk.emptyP.h, `${Bk.emptyP.h} (ref ${Ak.emptyP.h})`);
}

// ---------- the verdict ----------
const bad = results.filter((r) => !r.ok);
console.log(`--- PARITY-MOODJOURNEY RESULT: ${results.length - bad.length}/${results.length} members ${bad.length === 0 ? "MATCH" : "DRIFT"} (both apps, same round) ---`);
if (bad.length > 0) {
  for (const b of bad) console.log(`  DRIFT: ${b.member}`);
  process.exit(1);
}
await browser.close();
process.exit(0);
