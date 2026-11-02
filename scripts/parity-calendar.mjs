// parity-calendar.mjs — the FIFTEENTH committed parity surface
// (WH-49): the Events calendar card's day-cell interiors — the WH-48
// plan's (c) candidate, decode-settled live first (one our-side flight
// + one reference flight + one targeted header probe per side, both
// apps byte-identical below the header; the header family identical
// modulo the H2/DIV tag).
//
//   node scripts/parity-calendar.mjs   (our dev server must be up)
//
// ONE login per app, ONE route (/events), ZERO-WRITE (login + read
//   only — nothing clicked, nothing hovered; the nav trio is READ, the
//   month is NEVER navigated: the calendar stays on the current month).
//   The reference login budget: ONE (the battery's two-window pacing
//   applies; our dev server runs the same per-process limiter — restart
//   it between the battery and any decode phase, the lesson-46
//   doctrine).
//
// THE MEMBER SET (~70): the CARD family (12px radius / border-none /
//   white / 632x660 at (288,136) — the lg:col-span-2 calendar card) +
//   the HEADER family (the p-24 header block; the title row — flex /
//   16px/600 / letter-spacing -0.4px / 584x32 at y=160; the month SPAN
//   — block / 137x16 at (312,168); the nav trio — h=32 / radius 6px /
//   1px rgb(229,229,229) border / white bg / 12px font, the x-ladder
//   750/794/860 with widths 36/59/36) + the GRID family (display grid /
//   7 columns ~76.5px / gap 8px / 584x556 at (312,216)) + the WEEKDAY
//   family (7 headers — center / 14px/600 / rgb(75,85,99) / py-8 /
//   77x36 at y=216, the row y- ladder) + the LANDSCAPE family (the
//   grid kid count = 7 + spacers + days, the day-cell count, the
//   spacer count, the today index — ALL DATE-DERIVED, computed live on
//   each app, never hardcoded: the same-round pair renders the same
//   "today" by construction) + the CELL family (the plain cell —
//   min-h 96px / p-8 / radius 8px / 1px rgb(229,231,235) border /
//   transparent bg / cursor pointer / transition-all / 77x96; the plain
//   dayNum — 14px/500 / rgb(55,65,81) / mb-4px / 59x20; the TODAY cell
//   — border rgb(196,181,253) [violet-300] + the violet-100→purple-100
//   `to right bottom` gradient BY ITS RGB STOP TRIPLES [the
//   parity-moodjourney convention — v4 serializes `to bottom right` +
//   `in oklab` + `%` position hints where the CDN gives `to right
//   bottom` bare]; the TODAY dayNum — rgb(109,40,217) [violet-700];
//   the events box — block / 0 children at the demo state) + the
//   LADDER family (the week-1 y=260, the week-2 y=364, the 104px
//   stride, the dayNum y-offset +9).
//
// THE DATE AXIS (documented): the month title text, the day-cell count,
//   the spacer count, the today index and the today cell's grid
//   position all derive from the CURRENT DATE — both apps render the
//   same live date, so a same-round pair is stable by construction;
//   cross-round capture moves on this axis are the documented
//   environmental class (the WH-46 events-calendar capture precedent:
//   the TODAY cell moved Nov 1 → Nov 2 between rounds).
//
// DOM-SHAPE FACTS (decoded live, zero rendered-face consequence — the
//   lesson-27/48 class, documented not cured): the title row — ours an
//   <h2> (the reference's a plain <div>), the SPAN/nav/BUTTON subtree
//   byte-identical; our SectionCards are <section> elements where the
//   reference's are plain <div>s (the semantic superset — the card
//   anchor matches BOTH tags, the parity-listinteriors convention).
//
// Exit 0 when every member matches; exit 1 on any DRIFT or
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
  // the calendar card: the 12px-radius card whose text carries the
  // weekday row — matched as the "SunMonTue" SEQUENCE (the headers
  // concatenate in textContent with NO word boundaries between them;
  // \b-anchored forms never match — the decode's own artifact lesson).
  const calCardOf = () => cardsOf().find((c) => {
    const t = c.textContent || "";
    return t.includes("SunMonTue") && t.includes("Sat");
  }) || null;
  // the stop-triples gradient normalizer (the parity-moodjourney
  // convention verbatim): extract the rgb() stop TRIPLES in order —
  // proof against v4's 'in oklab' + '%' hints and the CDN's bare form.
  const gradStops = (bg) => {
    if (!bg || bg === "none") return null;
    const m = bg.match(/rgb\\((\\d+, \\d+, \\d+)\\)/g);
    return m ? m.join(" -> ") : null;
  };
  return { cs, rect, cardsOf, calCardOf, gradStops };
})()
`;

/** SPA-safe navigation — the battery's gotoApp form, verbatim. */
const gotoApp = async (page, base, route) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector("main", { timeout: 20000 });
  await page.waitForTimeout(1100);
};

/** One app's full pass: login → /events (1280x900) → the read.
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

  await page.goto(`${base}/events`, { waitUntil: "load" });
  await page.waitForSelector("text=Sun", { timeout: 25000 });
  await page.waitForTimeout(1500);

  return page.evaluate((H) => {
    const { cs, rect, cardsOf, calCardOf, gradStops } = eval(H);
    const card = calCardOf();
    if (!card) return { found: false, cardTitles: cardsOf().map((c) => (c.children[0] ? c.children[0].textContent.trim().slice(0, 30) : "(bare)")) };

    const header = card.children[0];
    const body = card.children[1];
    // the title row: the header's flex child carrying the month SPAN
    // (ours an <h2>, the reference's a <div> — anchored by STRUCTURE,
    // never by tag, the lesson-47/48 vocabulary lesson)
    const titleRow = header
      ? Array.from(header.querySelectorAll("*")).find((el) => {
          const s = getComputedStyle(el);
          return s.display === "flex" && el.querySelector("span") && el.querySelector("button");
        })
      : null;
    const monthSpan = titleRow ? titleRow.querySelector("span") : null;
    const navRow = titleRow
      ? Array.from(titleRow.children).find((c) => c.tagName === "DIV" && c.querySelector("button"))
      : null;
    const navBtns = navRow ? Array.from(navRow.querySelectorAll("button")) : [];
    // the grid: the body's grid-display child
    const grid = body ? Array.from(body.children).find((c) => getComputedStyle(c).display === "grid") : null;
    const gridKids = grid ? Array.from(grid.children) : [];
    const weekdayHeaders = gridKids.filter((k) => /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)$/.test((k.textContent || "").trim()));
    const dayCells = gridKids.filter((k) => /^\d{1,2}$/.test((k.textContent || "").trim()));
    const spacers = gridKids.filter((k) => (k.textContent || "").trim() === "");
    let todayCell = null;
    let todayIdx = -1;
    dayCells.forEach((c, i) => {
      const bg = getComputedStyle(c).backgroundImage;
      if (bg && bg !== "none" && bg.includes("gradient")) { todayCell = c; todayIdx = i; }
    });
    const plainCell = dayCells.find((c) => c !== todayCell) || null;
    const dayNumOf = (cell) => (cell ? cell.querySelector("div") : null);
    const eventsBoxOf = (cell) => (cell ? Array.from(cell.children).filter((c) => c !== dayNumOf(cell))[0] || null : null);

    return {
      found: true,
      landscape: {
        cardCount: cardsOf().length,
        gridKidCount: gridKids.length,
        weekdayCount: weekdayHeaders.length,
        dayCellCount: dayCells.length,
        spacerCount: spacers.length,
        todayIdx,
      },
      card: { ...cs(card, ["borderRadius", "borderWidth", "backgroundColor"]), ...rect(card) },
      headerPad: header ? cs(header, ["padding"]).padding : null,
      titleRow: titleRow
        ? { ...cs(titleRow, ["display", "alignItems", "justifyContent", "fontSize", "fontWeight", "letterSpacing"]), ...rect(titleRow) }
        : null,
      monthSpan: monthSpan
        ? { text: monthSpan.textContent.trim(), ...cs(monthSpan, ["display", "fontSize", "fontWeight", "letterSpacing"]), ...rect(monthSpan) }
        : null,
      navBtns: navBtns.map((b) => ({
        text: b.textContent.trim(),
        ...cs(b, ["height", "borderRadius", "borderWidth", "borderColor", "backgroundColor", "fontSize"]),
        ...rect(b),
      })),
      grid: grid ? { ...cs(grid, ["display", "gridTemplateColumns", "gap"]), ...rect(grid) } : null,
      weekdayHeader: weekdayHeaders[0]
        ? { text: weekdayHeaders[0].textContent.trim(), ...cs(weekdayHeaders[0], ["textAlign", "fontSize", "fontWeight", "color", "paddingTop", "paddingBottom"]), ...rect(weekdayHeaders[0]) }
        : null,
      weekdayRowYs: weekdayHeaders.map((h) => Math.round(h.getBoundingClientRect().y)),
      plainCell: plainCell
        ? { text: plainCell.textContent.trim(), ...cs(plainCell, ["minHeight", "padding", "borderRadius", "borderWidth", "borderColor", "backgroundColor", "cursor", "transitionProperty"]), ...rect(plainCell) }
        : null,
      plainDayNum: dayNumOf(plainCell)
        ? { text: dayNumOf(plainCell).textContent.trim(), ...cs(dayNumOf(plainCell), ["fontSize", "fontWeight", "color", "marginBottom"]), ...rect(dayNumOf(plainCell)) }
        : null,
      todayCell: todayCell
        ? { text: todayCell.textContent.trim(), ...cs(todayCell, ["minHeight", "padding", "borderRadius", "borderWidth", "borderColor", "backgroundColor"]), stops: gradStops(cs(todayCell, ["backgroundImage"]).backgroundImage), ...rect(todayCell) }
        : null,
      todayDayNum: dayNumOf(todayCell)
        ? { text: dayNumOf(todayCell).textContent.trim(), ...cs(dayNumOf(todayCell), ["fontSize", "fontWeight", "color"]), ...rect(dayNumOf(todayCell)) }
        : null,
      eventsBox: eventsBoxOf(plainCell)
        ? { ...cs(eventsBoxOf(plainCell), ["display", "paddingTop"]), childCount: eventsBoxOf(plainCell).children.length }
        : null,
      cellYs: dayCells.slice(0, 8).map((c) => Math.round(c.getBoundingClientRect().y)),
      cellHs: dayCells.slice(0, 3).map((c) => Math.round(c.getBoundingClientRect().height)),
    };
  }, HELPERS);
};

/** The scalar-pair reporter (the battery's standard diff loop). */
const pairs = (a, b, list) => {
  for (const [name, key] of list) {
    const av = key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), a);
    const bv = key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), b);
    report(name, JSON.stringify(av) === JSON.stringify(bv), `${JSON.stringify(av)} vs ${JSON.stringify(bv)}`);
  }
};

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
  console.log(`PROBE-ERROR card-anchor: ref found=${A.found} dev found=${B.found}`);
  process.exit(1);
}

// ---- the landscape (date-derived, computed live on both apps) ----
pairs(A, B, [
  ["landscape.cardCount", "landscape.cardCount"],
  ["landscape.gridKidCount", "landscape.gridKidCount"],
  ["landscape.weekdayCount", "landscape.weekdayCount"],
  ["landscape.dayCellCount", "landscape.dayCellCount"],
  ["landscape.spacerCount", "landscape.spacerCount"],
  ["landscape.todayIdx", "landscape.todayIdx"],
]);

// ---- the card chrome ----
pairs(A, B, [
  ["card.radius", "card.borderRadius"],
  ["card.borderWidth", "card.borderWidth"],
  ["card.bg", "card.backgroundColor"],
  ["card.rect", "card"],
]);

// ---- the header family ----
pairs(A, B, [
  ["header.pad", "headerPad"],
  ["titleRow.display", "titleRow.display"],
  ["titleRow.alignItems", "titleRow.alignItems"],
  ["titleRow.justifyContent", "titleRow.justifyContent"],
  ["titleRow.fs", "titleRow.fontSize"],
  ["titleRow.fw", "titleRow.fontWeight"],
  ["titleRow.ls", "titleRow.letterSpacing"],
  ["titleRow.rect", "titleRow"],
  ["monthSpan.text", "monthSpan.text"],
  ["monthSpan.display", "monthSpan.display"],
  ["monthSpan.fs", "monthSpan.fontSize"],
  ["monthSpan.fw", "monthSpan.fontWeight"],
  ["monthSpan.rect", "monthSpan"],
]);
for (let i = 0; i < 3; i++) {
  pairs(A, B, [
    [`nav${i}.text`, `navBtns.${i}.text`],
    [`nav${i}.h`, `navBtns.${i}.height`],
    [`nav${i}.radius`, `navBtns.${i}.borderRadius`],
    [`nav${i}.borderW`, `navBtns.${i}.borderWidth`],
    [`nav${i}.borderC`, `navBtns.${i}.borderColor`],
    [`nav${i}.bg`, `navBtns.${i}.backgroundColor`],
    [`nav${i}.fs`, `navBtns.${i}.fontSize`],
    [`nav${i}.rect`, `navBtns.${i}`],
  ]);
}

// ---- the grid + weekday family ----
pairs(A, B, [
  ["grid.display", "grid.display"],
  ["grid.cols", "grid.gridTemplateColumns"],
  ["grid.gap", "grid.gap"],
  ["grid.rect", "grid"],
  ["weekday.text", "weekdayHeader.text"],
  ["weekday.align", "weekdayHeader.textAlign"],
  ["weekday.fs", "weekdayHeader.fontSize"],
  ["weekday.fw", "weekdayHeader.fontWeight"],
  ["weekday.color", "weekdayHeader.color"],
  ["weekday.padY", "weekdayHeader.paddingTop"],
  ["weekday.rect", "weekdayHeader"],
  ["weekday.rowYs", "weekdayRowYs"],
]);

// ---- the cell family ----
pairs(A, B, [
  ["plainCell.text", "plainCell.text"],
  ["plainCell.minH", "plainCell.minHeight"],
  ["plainCell.pad", "plainCell.padding"],
  ["plainCell.radius", "plainCell.borderRadius"],
  ["plainCell.borderW", "plainCell.borderWidth"],
  ["plainCell.borderC", "plainCell.borderColor"],
  ["plainCell.bg", "plainCell.backgroundColor"],
  ["plainCell.cursor", "plainCell.cursor"],
  ["plainCell.transition", "plainCell.transitionProperty"],
  ["plainCell.rect", "plainCell"],
  ["plainDayNum.text", "plainDayNum.text"],
  ["plainDayNum.fs", "plainDayNum.fontSize"],
  ["plainDayNum.fw", "plainDayNum.fontWeight"],
  ["plainDayNum.color", "plainDayNum.color"],
  ["plainDayNum.mb", "plainDayNum.marginBottom"],
  ["plainDayNum.rect", "plainDayNum"],
  ["todayCell.text", "todayCell.text"],
  ["todayCell.minH", "todayCell.minHeight"],
  ["todayCell.pad", "todayCell.padding"],
  ["todayCell.radius", "todayCell.borderRadius"],
  ["todayCell.borderW", "todayCell.borderWidth"],
  ["todayCell.borderC", "todayCell.borderColor"],
  ["todayCell.stops", "todayCell.stops"],
  ["todayCell.rect", "todayCell"],
  ["todayDayNum.text", "todayDayNum.text"],
  ["todayDayNum.fs", "todayDayNum.fontSize"],
  ["todayDayNum.fw", "todayDayNum.fontWeight"],
  ["todayDayNum.color", "todayDayNum.color"],
  ["todayDayNum.rect", "todayDayNum"],
  ["eventsBox.display", "eventsBox.display"],
  ["eventsBox.children", "eventsBox.childCount"],
  ["cellYs", "cellYs"],
  ["cellHs", "cellHs"],
]);

const bad = results.filter((r) => !r.ok);
console.log(
  `\nPARITY-CALENDAR RESULT: ${results.length - bad.length}/${results.length} members MATCH (both apps, same round)` +
    (bad.length ? " — DRIFTS PRESENT" : ""),
);
process.exit(bad.length ? 1 : 0);
