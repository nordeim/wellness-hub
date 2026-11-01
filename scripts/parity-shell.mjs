// The parity net's THIRD SURFACE (WH-37, F-3 — the WH-36 plan's
// suggested-next (d), the "sidebar shell" candidate): the shell nav
// family — the desktop sidebar + the mobile glass header + the
// drawer battery, the driving instruction's standing mobile-menu
// emphasis. Chosen over the dashboard's stat-tile family because it
// is data-INDEPENDENT (the shell renders no per-user data beyond the
// demo name/email, identical on both apps) and it is the strongest
// same-round verification of exactly the surface the instruction
// names. The two-clocks gap it closes: the watch's PASS-2
// desktopShell + mobileHeader+drawer surfaces pin the REFERENCE
// against the ledger, our e2e mobile-navigation + shell specs pin
// OURS — never diffed in the same round (the lesson-39 class).
//
//   node scripts/parity-shell.mjs        (our dev server must be up)
//
// PASS A (the reference, ONE login — the same budget the watch and
//   parity-moodform spend): /Dashboard at 1280x900 → the desktop
//   member read → 390x844 → the header read → the drawer open → the
//   drawer member read → Escape (close + unlock) → reopen → the
//   viewport-grow auto-close.
// PASS B (our dev server, ONE login — the demo credentials against
//   localhost:3000): the same reads.
// Then the DIFF: member-by-member, ref-vs-ours.
//
// ZERO-WRITE doctrine (both apps): the drawer opens read-only and
// closes via Escape; the grow-close cycle is the reference's own
// auto-close behavior. No submits, no tile clicks, no form writes.
//
// THE LOCATOR DOCTRINE (this round's own decode lesson): every
// locator is a COMPUTED-VALUE ANCHOR, never a structural walk — the
// decode's one artifact was a walk (the h2's first full-height
// ancestor) landing on the reference's INNER 255px column while our
// aside reads 256px, a false "border drift" that a chain read
// resolved (the reference's shadcn wrapper carries the same 256px
// border-box + 1px border-right our aside does). Anchors used here:
// the app-root flex row's sidebar child (the walk continues PAST
// inner columns to the root's direct child), the gradient-TEXT
// element (backgroundImage + the "Wellness Hub" text — the
// reference puts the gradient on the h2, ours on the span inside
// it; the anchor reads the same rendered fact on both), the
// bordered 288px sheet, the visible nav row by href.
//
// THE SERIALIZATION CLASSES (the standing doctrine, lesson 40):
// gradients compare their rgb STOP TRIPLES (both apps carry the same
// triples in different syntax); the sidebar width reads with a ±1
// tolerance (the WH-22 modal-width doctrine); the drawer row ink is
// canvas-normalized (the 1x1 composite — ready for any future alpha
// arm; the current arms are solid on both apps).
//
// Output: a per-member MATCH/DRIFT report + a final line. Exit 0
// only when every member matches; exit 1 on any DRIFT or PROBE-ERROR
// (a drift means one of the two apps moved THIS ROUND — investigate
// before curing, the standing machinery).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const OURS = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

// The comparable member family — decode-backed (WH-37: probed live on
// BOTH apps before this script was written; the known deliberate
// supersets — our complementary/navigation landmarks + aria-hidden
// icons + aria-current + focus-visible rings, the reference's
// landmark-free list — are TREE-shape differences, not computed-style
// members, and so are naturally out of scope; the weight/ink/mt arms
// this round CURED are pinned equal by construction and verified by
// this very flight).
const DESKTOP_MEMBERS = [
  // the sidebar column (the root child anchor)
  "sidebarW",
  "sidebarBorderRW",
  // the wordmark block
  "wordmarkText",
  "wordmarkFs",
  "wordmarkFw",
  "brandColH",
  "subText",
  "subFs",
  "subColor",
  "subMt",
  // the brand badge
  "badgeW",
  "badgeH",
  "badgeR",
  // the nav rows (the visible /Exercise row) + the active pill
  "navRowH",
  "navRowFs",
  "navRowFw",
  "navRowColor",
  "navIconW",
  "activeH",
  "activeFw",
  "activeColor",
  // the footer zone + the Profile avatar
  "footerBorderT",
  "footerPad",
  "avatarW",
];
const MOBILE_MEMBERS = [
  // the glass header (the pad keys match the read's own names)
  "padL",
  "padT",
  "barBorderB",
  "triggerW",
  "triggerH",
  "triggerR",
  "triggerIconW",
  "titleX",
  "titleFs",
  "titleText",
  // the drawer sheet + its rows
  "drawerW",
  "drawerBorderR",
  "drawerBorderRColor",
  "xDisplay",
  "cappedHrefs",
  "rowH",
  "rowFs",
  "rowFw",
  "activeFw",
  "activeColor",
  // the drawer's brand block (the gradient-TEXT anchor)
  "dTitleText",
  "dTitleFs",
  "dTitleFw",
  "dDescText",
  "dDescFs",
  "dDescColor",
  // the drawer rows' ink, canvas-normalized (lesson 40 — solid on
  // both apps today; the composite stays ready for any future alpha)
  "rowColorNorm",
  // the drawer's footer avatar
  "drawerAvatarW",
  // the behavior battery
  "escapeCloses",
  "scrollUnlocked",
  "growAutoCloses",
];
// Gradient members compare their rgb STOP TRIPLES (the standing class).
const GRADIENT_STOPS = {
  wordmarkStops: ["99, 102, 241", "168, 85, 247"], // indigo-500 → purple-500 (the default preset's brand pair)
  badgeStops: ["99, 102, 241", "168, 85, 247"],
  activeStops: ["99, 102, 241", "168, 85, 247"],
  avatarStops: ["99, 102, 241", "168, 85, 247"],
  titleStops: ["99, 102, 241", "168, 85, 247"],
  dTitleStops: ["99, 102, 241", "168, 85, 247"],
};

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

/** One app's full pass: login → the desktop read → the mobile read. */
const runPass = async (page, base) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login", { sel: "h1" });
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 15000 });
  await page.waitForTimeout(1200);
  await gotoApp(page, base, "/Dashboard");

  // ---- the desktop sidebar ----
  const desktop = await page.evaluate(() => {
    const vis = (a) => a.offsetParent !== null;
    const row = Array.from(document.querySelectorAll('a[href^="/Exercise"]')).find(vis);
    const dash = Array.from(document.querySelectorAll('a[href^="/Dashboard"]')).find(vis);
    const prof = Array.from(document.querySelectorAll('a[href^="/Profile"]')).find(vis);
    if (!row || !dash || !prof) return { error: "nav rows incomplete" };
    const icon = row.querySelector("svg");
    const avatar = prof.querySelector("[class*=rounded-full]");
    // THE BORDERED-COLUMN ANCHOR (the decode's lesson, refined): walk up
    // from the wordmark h2 to the first full-height ancestor CARRYING a
    // right border — the reference nests its bordered 256px sidebar
    // column inside a borderless shadcn group wrapper (a root-child walk
    // stops one level early on its side and reads the wrapper's 0px
    // border); ours IS the bordered aside. Both apps' visible column:
    // 256px border-box, 1px border-right.
    const h2 = document.querySelector("h2");
    let root = h2;
    while (root && root !== document.body) {
      const r = root.getBoundingClientRect();
      const st = getComputedStyle(root);
      if (r.height >= 600 && parseFloat(st.borderRightWidth) > 0) break;
      root = root.parentElement;
    }
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const rcs = cs(row), dcs = cs(dash), acs = cs(avatar);
    // the wordmark column + subtitle (the h2's parent block)
    const col = h2.parentElement;
    const sub = col.children.length > 1 ? col.children[1] : null;
    const scs = cs(sub);
    // the brand badge: the brand row's gradient-bearing non-column child
    const badge = Array.from(col.parentElement.children).find(
      (c) => c !== col && (getComputedStyle(c).backgroundImage || "").includes("gradient"),
    );
    const bcs = cs(badge);
    // the footer zone: the Profile link's border-t ancestor
    const footer = prof.closest("[class*=border-t]");
    const fcs = cs(footer);
    return {
      sidebarW: root ? Math.round(root.getBoundingClientRect().width) : null,
      sidebarBorderRW: root ? cs(root).borderRightWidth : null,
      wordmarkText: h2.textContent.trim(),
      wordmarkFs: cs(h2).fontSize,
      wordmarkFw: cs(h2).fontWeight,
      brandColH: Math.round(col.getBoundingClientRect().height),
      subText: sub ? sub.textContent.trim() : null,
      subFs: scs ? scs.fontSize : null,
      subColor: scs ? scs.color : null,
      subMt: scs ? scs.marginTop : null,
      badgeW: badge ? Math.round(badge.getBoundingClientRect().width) : null,
      badgeH: badge ? Math.round(badge.getBoundingClientRect().height) : null,
      badgeR: bcs ? bcs.borderRadius : null,
      badgeStops: bcs ? bcs.backgroundImage : null,
      navRowH: rcs.height,
      navRowFs: rcs.fontSize,
      navRowFw: rcs.fontWeight,
      navRowColor: rcs.color,
      navIconW: icon ? cs(icon).width : null,
      activeH: dcs.height,
      activeFw: dcs.fontWeight,
      activeColor: dcs.color,
      activeStops: dcs.backgroundImage,
      wordmarkStops: cs(h2).backgroundImage,
      footerBorderT: fcs ? fcs.borderTopWidth : null,
      footerPad: fcs ? fcs.paddingLeft : null,
      avatarW: avatar ? Math.round(avatar.getBoundingClientRect().width) : null,
      avatarStops: acs ? acs.backgroundImage : null,
    };
  });

  // ---- the mobile header + the drawer battery ----
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  const header = await page.evaluate(() => {
    const hdr = document.querySelector("header");
    const title = hdr ? hdr.querySelector("h1") : null;
    const trig = hdr ? hdr.querySelector("button") : null;
    const icon = trig ? trig.querySelector("svg") : null;
    const hcs = hdr ? getComputedStyle(hdr) : null;
    const tcs = trig ? getComputedStyle(trig) : null;
    return {
      padL: hcs ? hcs.paddingLeft : null,
      padT: hcs ? hcs.paddingTop : null,
      barBorderB: hcs ? hcs.borderBottomWidth : null,
      triggerW: tcs ? tcs.width : null,
      triggerH: tcs ? tcs.height : null,
      triggerR: tcs ? tcs.borderRadius : null,
      triggerIconW: icon ? getComputedStyle(icon).width : null,
      titleX: title ? Math.round(title.getBoundingClientRect().x) : null,
      titleFs: title ? getComputedStyle(title).fontSize : null,
      titleText: title ? title.textContent.trim() : null,
      titleStops: title ? getComputedStyle(title).backgroundImage : null,
    };
  });
  await page.evaluate(() => document.querySelector("header button").click());
  await page.waitForTimeout(800);
  const drawer = await page.evaluate(() => {
    const cand = Array.from(document.querySelectorAll("div")).filter((d) => {
      const r = d.getBoundingClientRect();
      const c = getComputedStyle(d);
      return r.width >= 287 && r.width <= 289 && r.height > 600 && parseFloat(c.borderRightWidth) > 0;
    });
    const s = cand[0];
    if (!s) return { sheetFound: false };
    const cs = getComputedStyle(s);
    const x = s.querySelector("button");
    const links = Array.from(s.querySelectorAll("a"));
    // the module rows (scoped to the sheet, the active row excluded)
    const moduleLinks = links.filter((a) => {
      const h = a.getAttribute("href") || "";
      return /^\/[A-Z]/.test(h) && !/^\/Dashboard/.test(h);
    });
    const row = moduleLinks[0];
    const rcs = getComputedStyle(row);
    const active = links.find((a) => /^\/Dashboard/.test(a.getAttribute("href") || ""));
    const acs = active ? getComputedStyle(active) : null;
    // the drawer's brand block: THE GRADIENT-TEXT ANCHOR (the element
    // whose backgroundImage is a gradient AND whose text is the app
    // name — the reference puts it on the h2, ours on the span inside
    // it; the anchor reads the rendered fact on both)
    const dTitle = Array.from(s.querySelectorAll("*")).find((el) => {
      const st = getComputedStyle(el);
      return (
        (st.backgroundImage || "").includes("gradient") &&
        /Wellness/.test(el.textContent || "") &&
        el.getBoundingClientRect().width < 200
      );
    });
    const dcs2 = dTitle ? getComputedStyle(dTitle) : null;
    // the description: the TITLE ELEMENT's next sibling (the reference
    // puts the gradient on its h2 — nextElementSibling is the
    // description; ours puts it on the span INSIDE the h2 Title — walk
    // up to the h2 first, then the next sibling is the Description)
    const titleEl = dTitle ? (dTitle.closest("h2") || dTitle) : null;
    const dDesc = titleEl ? titleEl.nextElementSibling : null;
    const ddcs = dDesc ? getComputedStyle(dDesc) : null;
    // the drawer's footer avatar
    const prof2 = links.find((a) => /^\/Profile/.test(a.getAttribute("href") || ""));
    const av2 = prof2 ? prof2.querySelector("[class*=rounded-full]") : null;
    // the canvas composite (lesson 40, ready for any future alpha arm)
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
      return `${d[0]},${d[1]},${d[2]},${d[3]}`;
    };
    return {
      sheetFound: true,
      drawerW: Math.round(s.getBoundingClientRect().width),
      drawerBorderR: cs.borderRightWidth,
      drawerBorderRColor: cs.borderRightColor,
      xDisplay: x ? getComputedStyle(x).display : "none",
      cappedHrefs: links.filter((a) => /^\/[A-Z]/.test(a.getAttribute("href") || "")).length,
      rowH: rcs.height,
      rowFs: rcs.fontSize,
      rowFw: rcs.fontWeight,
      rowColor: rcs.color,
      rowColorNorm: norm(rcs.color),
      activeFw: acs ? acs.fontWeight : null,
      activeColor: acs ? acs.color : null,
      dTitleText: dTitle ? dTitle.textContent.trim() : null,
      dTitleFs: dcs2 ? dcs2.fontSize : null,
      dTitleFw: dcs2 ? dcs2.fontWeight : null,
      dTitleStops: dcs2 ? dcs2.backgroundImage : null,
      dDescText: dDesc ? dDesc.textContent.trim() : null,
      dDescFs: ddcs ? ddcs.fontSize : null,
      dDescColor: ddcs ? ddcs.color : null,
      drawerAvatarW: av2 ? Math.round(av2.getBoundingClientRect().width) : null,
    };
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const afterEscape = await page.evaluate(() => {
    const cand = Array.from(document.querySelectorAll("div")).filter((d) => {
      const r = d.getBoundingClientRect();
      return r.width >= 287 && r.width <= 289 && r.height > 600;
    });
    return { closed: cand.length === 0, unlocked: !document.documentElement.dataset.scrollLocked };
  });
  await page.evaluate(() => document.querySelector("header button").click());
  await page.waitForTimeout(800);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(800);
  const afterGrow = await page.evaluate(() => {
    const cand = Array.from(document.querySelectorAll("div")).filter((d) => {
      const r = d.getBoundingClientRect();
      return r.width >= 287 && r.width <= 289 && r.height > 600;
    });
    return { closed: cand.length === 0 };
  });

  return {
    desktop,
    header,
    drawer,
    escapeCloses: afterEscape.closed,
    scrollUnlocked: afterEscape.unlocked,
    growAutoCloses: afterGrow.closed,
  };
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

console.log("--- PASS A: the reference (one login) ---");
const ref = await probe(() => runPass(page, REF));
if (ref.__error || ref.desktop?.error) {
  console.log(`PROBE-ERROR reference: ${ref.__error || ref.desktop?.error}`);
  await browser.close();
  process.exit(1);
}
console.log(
  `reference read: sidebar ${ref.desktop.sidebarW}px (border ${ref.desktop.sidebarBorderRW}), rows ${ref.desktop.navRowH}/${ref.desktop.navRowFw}, active ${ref.desktop.activeFw}, wordmark ${ref.desktop.wordmarkFs}/${ref.desktop.wordmarkFw} col ${ref.desktop.brandColH}px`,
);
console.log(
  `  mobile: trigger ${ref.header.triggerW} r${ref.header.triggerR}, title x=${ref.header.titleX}; drawer ${ref.drawer.drawerW}px rows ${ref.drawer.rowH}/${ref.drawer.rowFw}, X ${ref.drawer.xDisplay}, ${ref.drawer.cappedHrefs} hrefs, escape=${ref.escapeCloses} unlock=${ref.scrollUnlocked} grow=${ref.growAutoCloses}`,
);
if (!ref.drawer.sheetFound) {
  console.log("PROBE-ERROR reference: the drawer sheet was not found");
  await browser.close();
  process.exit(1);
}

console.log("--- PASS B: our dev server (one login) ---");
const ours = await probe(() => runPass(page, OURS));
if (ours.__error || ours.desktop?.error) {
  console.log(`PROBE-ERROR ours: ${ours.__error || ours.desktop?.error}`);
  await browser.close();
  process.exit(1);
}
console.log(
  `ours read:      sidebar ${ours.desktop.sidebarW}px (border ${ours.desktop.sidebarBorderRW}), rows ${ours.desktop.navRowH}/${ours.desktop.navRowFw}, active ${ours.desktop.activeFw}, wordmark ${ours.desktop.wordmarkFs}/${ours.desktop.wordmarkFw} col ${ours.desktop.brandColH}px`,
);
console.log(
  `  mobile: trigger ${ours.header.triggerW} r${ours.header.triggerR}, title x=${ours.header.titleX}; drawer ${ours.drawer.drawerW}px rows ${ours.drawer.rowH}/${ours.drawer.rowFw}, X ${ours.drawer.xDisplay}, ${ours.drawer.cappedHrefs} hrefs, escape=${ours.escapeCloses} unlock=${ours.scrollUnlocked} grow=${ours.growAutoCloses}`,
);
if (!ours.drawer.sheetFound) {
  console.log("PROBE-ERROR ours: the drawer sheet was not found");
  await browser.close();
  process.exit(1);
}

// ---------- the live-vs-live diff ----------
console.log("--- the member diff (reference vs ours, same round) ---");
// flatten each pass into one face: desktop.* + header.* + drawer.* +
// the three behavior booleans (rowColorNorm is the canvas-normalized
// ink, compared alongside rowColor)
const flat = (p) => ({
  ...p.desktop,
  ...p.header,
  ...p.drawer,
  escapeCloses: p.escapeCloses,
  scrollUnlocked: p.scrollUnlocked,
  growAutoCloses: p.growAutoCloses,
});
const A = flat(ref);
const B = flat(ours);
for (const m of [...DESKTOP_MEMBERS, ...MOBILE_MEMBERS]) {
  const a = A[m];
  const b = B[m];
  // the ±1 tolerance: the two sheet widths (the WH-22 sub-pixel doctrine)
  if (m === "sidebarW" || m === "drawerW") {
    const ok = a != null && b != null && Math.abs(Number(a) - Number(b)) <= 1;
    report(m, ok, ok ? `${a}≈${b} (±1)` : `ref ${a} vs ours ${b}`);
    continue;
  }
  report(m, a === b, a === b ? `${a}` : `ref ${a} vs ours ${b}`);
}
for (const [m, stops] of Object.entries(GRADIENT_STOPS)) {
  const a = A[m] || "";
  const b = B[m] || "";
  const missA = stops.filter((s) => !a.includes(s));
  const missB = stops.filter((s) => !b.includes(s));
  const ok = missA.length === 0 && missB.length === 0;
  report(
    m,
    ok,
    ok ? `stops ${stops.join(" → ")}` : `missing ref [${missA}] / ours [${missB}]`,
  );
}

await browser.close();
const bad = results.filter((r) => !r.ok).length;
console.log(
  bad === 0
    ? `PARITY-SHELL RESULT: ${results.length}/${results.length} members MATCH (both apps, same round)`
    : `PARITY-SHELL RESULT: ${bad} DRIFT of ${results.length} members — investigate (one of the two apps moved this round)`,
);
process.exit(bad === 0 ? 0 : 1);
