// probe-quickactionfocus.mjs — the WH-59 candidate walk: the dashboard
// QUICK-ACTION cells' FOCUS RINGS (the last read-only candidate named in
// the session_111 tail's queue) — decoded ZERO-WRITE via a REAL keyboard
// Tab + React props inspection (the WH-53/55/56/57/58 instrument class).
// Tab navigation never writes on either app; the click would navigate
// (the module deep-link) and is NEVER fired — the href/on click source
// is read WITHOUT firing it. Zero fires, zero writes on both apps.
//
//   node scripts/probe-quickactionfocus.mjs
//
// THE CANDIDATE: the quick-action grid's four link-cells (ours: <Link>
// anchors carrying the stock shadcn focus arms
// `focus-visible:outline-none focus-visible:ring-1
// focus-visible:ring-ring`; the reference: the documented <a><button>
// nest — the INVALID-HTML face ours deliberately supersedes, its
// focusable element decoded live here). The FOCUS face has never been
// probed: the a11y net walks RESTING pages, the interaction-contrast
// pins pair the hover/focus ARMS' colors, and the capture set's
// 25-dark-login-focus pins the LOGIN input's ring — the quick-action
// cell's OWN keyboard focus ring is the unread face.
//
// THE WH-20 DOCTRINE, mirrored for the keyboard axis: a REAL Tab key
// press (page.keyboard.press), never a programmatic .focus() — the
// :focus-visible heuristic only arms on real keyboard input — and a
// >=400 ms settle before reading (the transition-all interpolation
// reads t=0 transparent if sampled synchronously).
import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const DEV = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const gotoApp = async (page, base, route) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector("main", { timeout: 25000 });
  await page.waitForTimeout(1200);
};

const readApp = async (page, base, label) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login");
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 25000 });
  await page.waitForTimeout(1400);
  await gotoApp(page, base, "/Dashboard");

  // Anchor: the first quick-action cell — "Log Exercise" on both apps
  // (the reference's own label, pinned by parity-dashboard's grid walk).
  const cell = page
    .getByRole("link", { name: /Log Exercise/i })
    .first();
  await cell.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForTimeout(600);

  const readFaces = (which) =>
    page.evaluate((sel) => {
      // The focusable element: the anchor (ours) or the <a>/<button>
      // nest's active child (the reference) — resolved by whoever
      // holds the label text and is keyboard-focusable.
      const all = Array.from(document.querySelectorAll("main a, main button"));
      const el =
        all.find(
          (e) =>
            e.textContent.includes("Log Exercise") &&
            e.closest("main") !== null,
        ) || null;
      if (!el) return { error: "anchor not found", which: sel };
      const cs = getComputedStyle(el);
      // The props read (zero-write: reading the source never fires it).
      const k = Object.keys(el).find(
        (x) =>
          x.startsWith("__reactProps$") || x.startsWith("__reactEventHandlers$"),
      );
      const props = k ? el[k] : null;
      const onClick =
        props && typeof props.onClick === "function"
          ? props.onClick.toString().slice(0, 200)
          : null;
      const svg = el.querySelector("svg");
      return {
        which: sel,
        tag: el.tagName.toLowerCase(),
        active: document.activeElement === el,
        faces: {
          outlineStyle: cs.outlineStyle,
          outlineWidth: cs.outlineWidth,
          outlineColor: cs.outlineColor,
          boxShadow: (cs.boxShadow || "").slice(0, 160),
          borderRadius: cs.borderRadius,
          opacity: cs.opacity,
          color: cs.color,
          transitionProperty: cs.transitionProperty,
          transitionDuration: cs.transitionDuration,
        },
        href: el.getAttribute("href"),
        svgH: svg ? getComputedStyle(svg).height : null,
        onClickSource: onClick,
      };
    }, which);

  // PASS 1 — the at-rest face (nothing focused in the grid).
  const atRest = await readFaces("atRest");

  // PASS 2 — the REAL-keyboard focus face (the WH-20 doctrine on the
  // keyboard axis: real Tab presses until the cell's focusable element
  // is activeElement, then a >=400 ms settle before the read).
  let focused = false;
  for (let i = 0; i < 45; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(90);
    const isIt = await page.evaluate(() => {
      const ae = document.activeElement;
      return !!ae && ae.textContent && ae.textContent.includes("Log Exercise");
    });
    if (isIt) {
      focused = true;
      break;
    }
  }
  if (!focused) {
    console.log(`[${label}] WARNING: the cell never took focus via Tab — reading whatever holds it`);
  }
  await page.waitForTimeout(500); // the settle
  const focusFace = await readFaces("focused");

  // PASS 3 — the NEXT tab stop (the reference's <a><button> nest makes
  // the nested button the SECOND stop of the same cell — the invalid-
  // HTML artifact; ours has a single stop, so this Tab lands on the
  // NEXT cell). Read the new activeElement's own faces — zero-write.
  await page.keyboard.press("Tab");
  await page.waitForTimeout(500);
  const nextStop = await page.evaluate(() => {
    const ae = document.activeElement;
    if (!ae || ae === document.body) return { tag: "body-or-none" };
    const cs = getComputedStyle(ae);
    return {
      tag: ae.tagName.toLowerCase(),
      text: (ae.textContent || "").trim().slice(0, 30),
      faces: {
        outlineStyle: cs.outlineStyle,
        outlineWidth: cs.outlineWidth,
        boxShadow: (cs.boxShadow || "").slice(0, 160),
        borderRadius: cs.borderRadius,
      },
    };
  });

  // PASS 4 — the RELAX read: the cell anchor's ring must be gone (the
  // focus moved off it in PASS 3).
  const relaxed = await readFaces("relaxed");

  const out = { atRest, focusFace, nextStop, relaxed, tookFocus: focused };
  console.log(`\n===== ${label} =====`);
  console.log(JSON.stringify(out, null, 1));
  return out;
};

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const ref = await readApp(page, REF, "REFERENCE");
  await ctx.close();

  const ctx2 = await browser.newContext();
  const page2 = await ctx2.newPage();
  const ours = await readApp(page2, DEV, "OURS");
  await ctx2.close();

  console.log("\n===== THE FOCUS-RING COMPARISON (the read-only decode) =====");
  const cmp = (name, a, b) =>
    console.log(`${name}:\n  ref=${JSON.stringify(a)}\n  ours=${JSON.stringify(b)}`);
  cmp("focusable tag", ref.atRest.tag, ours.atRest.tag);
  cmp("AT-REST faces", ref.atRest.faces, ours.atRest.faces);
  cmp("FOCUSED faces (real Tab, 500ms settle)", ref.focusFace.faces, ours.focusFace.faces);
  cmp("NEXT tab stop (the nest's 2nd stop vs our next cell)", ref.nextStop, ours.nextStop);
  cmp("RELAXED faces (Tabbed off)", ref.relaxed.faces, ours.relaxed.faces);
  cmp("href", ref.atRest.href, ours.atRest.href);
  cmp("icon height", ref.atRest.svgH, ours.atRest.svgH);
  console.log("--- the onClick sources (zero-write reads, never fired) ---");
  console.log(`REF  source: ${ref.atRest.onClickSource?.slice(0, 200) || "-"}`);
  console.log(`OURS source: ${ours.atRest.onClickSource?.slice(0, 200) || "-"}`);
  console.log("--- took-focus flags ---");
  console.log(`REF  tookFocus=${ref.tookFocus}  OURS tookFocus=${ours.tookFocus}`);
} finally {
  await browser.close();
}
