// parity-listinteriors.mjs — the THIRTEENTH committed parity surface
// (WH-47, F-3): the list interiors + empty states the content surfaces
// render at the shared demo state — the dashboard's Recent Activity
// feed row (the app's main list face, the WH-28 decode's standing
// builder), the exercise page's zero-row empty, the StudyResources
// special empty card, and the Goals Achievements empty state (the
// WH-46 plan's (c) candidates, decode-settled live first).
//
//   node scripts/parity-listinteriors.mjs   (our dev server must be up)
//
// ONE login per app, FOUR routes, ZERO-WRITE (login + read only, the
//   cleanest read class — nothing clicked, nothing hovered). The
//   reference login budget: ONE (the battery's two-window pacing
//   applies; our dev server runs the same per-process limiter —
//   restart it between the battery and any decode phase, the
//   lesson-46 doctrine).
//
// THE MEMBER SET (~75): the FEED family (the card chrome 12px /
//   border-none / white / 632×160 + the header title + the 20px icon +
//   the rows container + the row's flex/flex-start/gap-12/p-12/radius-8
//   anatomy + the 💚 glyph 24px/32px + the title 16px/500/gray-900 +
//   the detail 14px/gray-500 + the SPAN date 12px/gray-400 + the full
//   y-ladder + the landscape counts) + the EXERCISE zero-row family
//   (the card-title landscape + the icon-less "Recent Workouts" header
//   + the empty paragraph 16px/gray-500/centered at the byte-identical
//   y/w/h) + the SR special empty card (the card chrome + the
//   p-6-py-20 body + the 64px gray-300 BookOpen + the 18px/400/gray-500
//   hint + the y-ladder — the F-1 cure's verification members: the
//   whole ladder sits 48px lower once the toolbar's card wrapper
//   lands) + the GOALS Achievements empty state (the title + the 20px
//   trophy + the 14px/gray-500/centered paragraph).
//
// THE SERIALIZATION CLASS (decoded live at WH-47 before this script
//   was written): the transition-colors compiled-vocabulary split —
//   the reference's CDN (v3-era) compiles the feed row's
//   `transition-colors` to the six-property list; our build-time v4
//   expands it to ten (adds outline-color + the three --tw-gradient-*
//   custom properties). BOTH apps author the same class; the
//   vocabulary is the toolchain's own, and the property only renders
//   during a hover transition (the at-rest no-render class, the
//   parity-authviews inherited-ink precedent). PINNED at both apps'
//   own documented values — a pin failing is a DRIFT (either app's
//   authored class or toolchain moved).
//
// DOM-SHAPE FACTS (decoded, zero rendered-face consequence — the
//   lesson-27/48 class, documented not cured): our SectionCards render
//   as <section> elements where the reference's are plain <div>s (our
//   semantic superset) — the card anchor matches BOTH tags; the
//   exercise "Recent Workouts" header carries NO icon on either app.
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
/** The PINNED-deviation reporter: both apps must sit at their OWN
 *  documented values (the toolchain-vocabulary class) — a pin that
 *  fails is a drift (either app's authored class moved). */
const pinned = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "PINNED" : "DRIFT "} ${member}: ${detail}`);
};

// ONE self-contained in-page helper factory (eval returns the bundle).
// The card anchor matches div AND section — our SectionCards are
// <section> elements (the semantic superset), the reference's are
// plain divs (the lesson-47/48 vocabulary lesson).
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
    return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
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
  return { cs, rect, cardsOf, cardByTitle };
})()
`;

/** SPA-safe navigation — the battery's gotoApp form, verbatim. */
const gotoApp = async (page, base, route) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector("main", { timeout: 20000 });
  await page.waitForTimeout(1100);
};

/** One app's full pass: login → the four routes (1280x900) → the read.
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

  const out = {};

  // ---- 1. /dashboard — the Recent Activity feed interior ----
  await page.goto(`${base}/dashboard`, { waitUntil: "load" });
  await page.waitForSelector("text=Recent Activity", { timeout: 25000 });
  await page.waitForTimeout(1500);
  out.feed = await page.evaluate((H) => {
    const { cs, rect, cardsOf, cardByTitle } = eval(H);
    const card = cardByTitle("Recent Activity");
    if (!card) return { found: false };
    const header = card.children[0];
    const body = card.children[1];
    let container = body && body.tagName === "DIV" ? body.querySelector(":scope > div") : null;
    if (!container || !container.querySelector("span")) container = body;
    const rows = container ? Array.from(container.children) : [];
    const row = rows[0] || null;
    const glyph = row ? row.querySelector("span") : null;
    const textCol = row ? Array.from(row.children).find((c) => c.tagName === "DIV" && c.querySelector("p")) : null;
    const titleP = textCol ? textCol.querySelector("p") : null;
    const detailP = titleP ? titleP.nextElementSibling : null;
    const dateEl = row ? Array.from(row.children).filter((c) => c !== glyph && c !== textCol)[0] : null;
    return {
      found: true,
      landscape: {
        cardCount: cardsOf().length,
        rowCount: rows.length,
      },
      card: { ...cs(card, ["borderRadius", "borderWidth", "borderColor", "backgroundColor"]), ...rect(card) },
      headerTitle: header ? header.textContent.trim() : null,
      headerIconW: header && header.querySelector("svg") ? Math.round(header.querySelector("svg").getBoundingClientRect().width) + "px" : null,
      containerTag: container ? container.tagName : null,
      containerDisplay: container ? cs(container, ["display"]).display : null,
      row: row
        ? { ...cs(row, ["display", "alignItems", "gap", "padding", "borderRadius", "transitionProperty"]), ...rect(row) }
        : null,
      glyph: glyph ? { text: glyph.textContent, ...cs(glyph, ["fontSize", "lineHeight"]), ...rect(glyph) } : null,
      titleP: titleP ? { text: titleP.textContent.trim(), ...cs(titleP, ["fontSize", "fontWeight", "color"]) } : null,
      detailP: detailP && detailP.tagName === "P" ? { text: detailP.textContent.trim(), ...cs(detailP, ["fontSize", "color"]) } : null,
      dateEl: dateEl ? { text: dateEl.textContent.trim(), tag: dateEl.tagName, ...cs(dateEl, ["fontSize", "color", "fontWeight"]) } : null,
      ladder: [card, row, glyph, titleP, dateEl].map((el) => (el ? Math.round(el.getBoundingClientRect().y) : null)),
    };
  }, HELPERS);

  // ---- 2. /exercise — the zero-row empty interior ----
  await page.goto(`${base}/exercise`, { waitUntil: "load" });
  await page.waitForSelector("text=Calories Burned", { timeout: 25000 });
  await page.waitForTimeout(1200);
  out.exercise = await page.evaluate((H) => {
    const { cs, rect, cardsOf } = eval(H);
    const cards = cardsOf();
    const titles = cards.map((c) => (c.children[0] ? c.children[0].textContent.trim().slice(0, 40) : "(bare)"));
    const listCard = cards.find((c) => (c.textContent || "").trim().startsWith("Recent Workouts"));
    if (!listCard) return { found: false, titles };
    const body = listCard.children[1];
    const emptyP = body ? body.querySelector("p") : null;
    return {
      found: true,
      titles,
      headerTitle: listCard.children[0] ? listCard.children[0].textContent.trim() : null,
      headerIconW: listCard.children[0] && listCard.children[0].querySelector("svg")
        ? Math.round(listCard.children[0].querySelector("svg").getBoundingClientRect().width) + "px"
        : null,
      emptyP: emptyP
        ? { text: emptyP.textContent.trim(), ...cs(emptyP, ["fontSize", "color", "textAlign"]), ...rect(emptyP) }
        : null,
      bodyChildCount: body ? body.children.length : 0,
    };
  }, HELPERS);

  // ---- 3. /studyresources — the special empty card ----
  await page.goto(`${base}/studyresources`, { waitUntil: "load" });
  await page.waitForSelector("text=No resources found", { timeout: 25000 });
  await page.waitForTimeout(1200);
  out.sr = await page.evaluate((H) => {
    const { cs, rect, cardsOf } = eval(H);
    const card = cardsOf().find((c) => (c.textContent || "").includes("No resources found"));
    if (!card) return { found: false };
    const body = card.children[0];
    const icon = body ? body.querySelector("svg") : null;
    const p = body ? body.querySelector("p") : null;
    return {
      found: true,
      card: { ...cs(card, ["borderRadius", "borderWidth", "borderColor", "backgroundColor"]) },
      body: body ? { ...cs(body, ["padding", "display", "textAlign"]), ...rect(body) } : null,
      icon: icon ? { ...cs(icon, ["width", "height", "color"]), ...rect(icon) } : null,
      p: p ? { text: p.textContent.trim(), ...cs(p, ["fontSize", "fontWeight", "color"]), ...rect(p) } : null,
      childCount: card.children.length,
    };
  }, HELPERS);

  // ---- 4. /goals — the Achievements empty state ----
  await page.goto(`${base}/goals`, { waitUntil: "load" });
  await page.waitForSelector("text=Achievements", { timeout: 25000 });
  await page.waitForTimeout(1200);
  out.goals = await page.evaluate((H) => {
    const { cs, cardByTitle } = eval(H);
    const card = cardByTitle("Achievements");
    if (!card) return { found: false };
    const header = card.children[0];
    const body = card.children[1];
    const emptyP = body ? body.querySelector("p") : null;
    return {
      found: true,
      headerTitle: header ? header.textContent.trim() : null,
      headerIconW: header && header.querySelector("svg") ? Math.round(header.querySelector("svg").getBoundingClientRect().width) + "px" : null,
      emptyP: emptyP ? { text: emptyP.textContent.trim(), ...cs(emptyP, ["fontSize", "color", "textAlign", "fontWeight"]) } : null,
      bodyChildCount: body ? body.children.length : 0,
    };
  }, HELPERS);

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

// ===== 1. the FEED family =====
if (!A.feed?.found || !B.feed?.found) {
  report("feed.__probe", false, `ref found=${A.feed?.found} vs ours found=${B.feed?.found}`);
} else {
  for (const m of ["cardCount", "rowCount"]) {
    report(`feed.landscape.${m}`, A.feed.landscape[m] === B.feed.landscape[m], `${B.feed.landscape[m]} (ref ${A.feed.landscape[m]})`);
  }
  for (const m of ["borderRadius", "borderWidth", "borderColor", "backgroundColor", "y", "w", "h"]) {
    report(`feed.card.${m}`, A.feed.card[m] === B.feed.card[m], A.feed.card[m] === B.feed.card[m] ? `${B.feed.card[m]}` : `ref ${A.feed.card[m]} vs ours ${B.feed.card[m]}`);
  }
  report("feed.headerTitle", A.feed.headerTitle === B.feed.headerTitle, `${B.feed.headerTitle}`);
  report("feed.headerIconW", A.feed.headerIconW === B.feed.headerIconW, `${B.feed.headerIconW}`);
  report("feed.containerTag", A.feed.containerTag === B.feed.containerTag, `${B.feed.containerTag}`);
  report("feed.containerDisplay", A.feed.containerDisplay === B.feed.containerDisplay, `${B.feed.containerDisplay}`);
  for (const m of ["display", "alignItems", "gap", "padding", "borderRadius", "y", "w", "h"]) {
    report(`feed.row.${m}`, A.feed.row[m] === B.feed.row[m], A.feed.row[m] === B.feed.row[m] ? `${B.feed.row[m]}` : `ref ${A.feed.row[m]} vs ours ${B.feed.row[m]}`);
  }
  for (const m of ["text", "fontSize", "lineHeight", "y", "w", "h"]) {
    report(`feed.glyph.${m}`, A.feed.glyph[m] === B.feed.glyph[m], A.feed.glyph[m] === B.feed.glyph[m] ? `${B.feed.glyph[m]}` : `ref ${A.feed.glyph[m]} vs ours ${B.feed.glyph[m]}`);
  }
  for (const m of ["text", "fontSize", "fontWeight", "color"]) {
    report(`feed.titleP.${m}`, A.feed.titleP[m] === B.feed.titleP[m], A.feed.titleP[m] === B.feed.titleP[m] ? `${B.feed.titleP[m]}` : `ref ${A.feed.titleP[m]} vs ours ${B.feed.titleP[m]}`);
  }
  for (const m of ["text", "fontSize", "color"]) {
    report(`feed.detailP.${m}`, A.feed.detailP[m] === B.feed.detailP[m], A.feed.detailP[m] === B.feed.detailP[m] ? `${B.feed.detailP[m]}` : `ref ${A.feed.detailP[m]} vs ours ${B.feed.detailP[m]}`);
  }
  for (const m of ["text", "tag", "fontSize", "color", "fontWeight"]) {
    report(`feed.dateEl.${m}`, A.feed.dateEl[m] === B.feed.dateEl[m], A.feed.dateEl[m] === B.feed.dateEl[m] ? `${B.feed.dateEl[m]}` : `ref ${A.feed.dateEl[m]} vs ours ${B.feed.dateEl[m]}`);
  }
  for (let i = 0; i < A.feed.ladder.length; i++) {
    report(`feed.ladder${i + 1}`, A.feed.ladder[i] === B.feed.ladder[i], A.feed.ladder[i] === B.feed.ladder[i] ? `${B.feed.ladder[i]}` : `ref ${A.feed.ladder[i]} vs ours ${B.feed.ladder[i]}`);
  }
  // THE PINNED MEMBER — the transition-colors compiled-vocabulary split
  // (the toolchain's own serialization; the authored class is
  // transition-colors on BOTH apps — the at-rest no-render class)
  pinned(
    "feed.row.transitionProperty (PINNED: the transition-colors compiled-vocabulary split)",
    A.feed.row.transitionProperty === "color, background-color, border-color, text-decoration-color, fill, stroke" &&
      B.feed.row.transitionProperty.startsWith("color, background-color, border-color,"),
    `ref [${A.feed.row.transitionProperty}] (the CDN's six-prop v3 form) / ours [${B.feed.row.transitionProperty}] (the v4 ten-prop expansion)`,
  );
}

// ===== 2. the EXERCISE zero-row family =====
if (!A.exercise?.found || !B.exercise?.found) {
  report("exercise.__probe", false, `ref found=${A.exercise?.found} vs ours found=${B.exercise?.found}`);
} else {
  report(
    "exercise.cardTitles",
    JSON.stringify(A.exercise.titles) === JSON.stringify(B.exercise.titles),
    `${JSON.stringify(B.exercise.titles)}`,
  );
  report("exercise.headerTitle", A.exercise.headerTitle === B.exercise.headerTitle, `${B.exercise.headerTitle}`);
  report("exercise.headerIconW", A.exercise.headerIconW === B.exercise.headerIconW, `${B.exercise.headerIconW} (the icon-less header — the DOM-shape fact, both apps)`);
  for (const m of ["text", "fontSize", "color", "textAlign", "y", "w", "h"]) {
    report(`exercise.emptyP.${m}`, A.exercise.emptyP[m] === B.exercise.emptyP[m], A.exercise.emptyP[m] === B.exercise.emptyP[m] ? `${B.exercise.emptyP[m]}` : `ref ${A.exercise.emptyP[m]} vs ours ${B.exercise.emptyP[m]}`);
  }
  report("exercise.bodyChildCount", A.exercise.bodyChildCount === B.exercise.bodyChildCount, `${B.exercise.bodyChildCount}`);
}

// ===== 3. the SR special empty card =====
if (!A.sr?.found || !B.sr?.found) {
  report("sr.__probe", false, `ref found=${A.sr?.found} vs ours found=${B.sr?.found}`);
} else {
  for (const m of ["borderRadius", "borderWidth", "borderColor", "backgroundColor"]) {
    report(`sr.card.${m}`, A.sr.card[m] === B.sr.card[m], A.sr.card[m] === B.sr.card[m] ? `${B.sr.card[m]}` : `ref ${A.sr.card[m]} vs ours ${B.sr.card[m]}`);
  }
  for (const m of ["padding", "display", "textAlign", "y", "w", "h"]) {
    report(`sr.body.${m}`, A.sr.body[m] === B.sr.body[m], A.sr.body[m] === B.sr.body[m] ? `${B.sr.body[m]}` : `ref ${A.sr.body[m]} vs ours ${B.sr.body[m]}`);
  }
  for (const m of ["width", "height", "color", "y", "w", "h"]) {
    report(`sr.icon.${m}`, A.sr.icon[m] === B.sr.icon[m], A.sr.icon[m] === B.sr.icon[m] ? `${B.sr.icon[m]}` : `ref ${A.sr.icon[m]} vs ours ${B.sr.icon[m]}`);
  }
  for (const m of ["text", "fontSize", "fontWeight", "color", "y", "w", "h"]) {
    report(`sr.p.${m}`, A.sr.p[m] === B.sr.p[m], A.sr.p[m] === B.sr.p[m] ? `${B.sr.p[m]}` : `ref ${A.sr.p[m]} vs ours ${B.sr.p[m]}`);
  }
  report("sr.childCount", A.sr.childCount === B.sr.childCount, `${B.sr.childCount}`);
}

// ===== 4. the GOALS Achievements empty state =====
if (!A.goals?.found || !B.goals?.found) {
  report("goals.__probe", false, `ref found=${A.goals?.found} vs ours found=${B.goals?.found}`);
} else {
  report("goals.headerTitle", A.goals.headerTitle === B.goals.headerTitle, `${B.goals.headerTitle}`);
  report("goals.headerIconW", A.goals.headerIconW === B.goals.headerIconW, `${B.goals.headerIconW}`);
  for (const m of ["text", "fontSize", "color", "textAlign", "fontWeight"]) {
    report(`goals.emptyP.${m}`, A.goals.emptyP[m] === B.goals.emptyP[m], A.goals.emptyP[m] === B.goals.emptyP[m] ? `${B.goals.emptyP[m]}` : `ref ${A.goals.emptyP[m]} vs ours ${B.goals.emptyP[m]}`);
  }
  report("goals.bodyChildCount", A.goals.bodyChildCount === B.goals.bodyChildCount, `${B.goals.bodyChildCount}`);
}

await browser.close();
const bad = results.filter((r) => !r.ok).length;
console.log(
  bad === 0
    ? `PARITY-LISTINTERIORS RESULT: ${results.length}/${results.length} members MATCH (both apps, same round)`
    : `PARITY-LISTINTERIORS RESULT: ${bad} DRIFT of ${results.length} members — investigate (one of the two apps moved this round)`,
);
process.exit(bad === 0 ? 0 : 1);
