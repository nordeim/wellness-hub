// probe-usetemplate.mjs — the WH-58 candidate walk: the routines
// template card's USE THIS TEMPLATE button's HOVER ARM (the last
// unprobed interaction family on the template card face) — decoded
// ZERO-WRITE via a REAL pointer hover + React props inspection (the
// WH-53/WH-55/WH-56/WH-57 instrument class). Hovering never writes on
// either app; the click would open the read-only Schedule modal (the
// watch opens it every round), and the onClick source is read WITHOUT
// firing it — zero fires, zero writes on both apps.
//
//   node scripts/probe-usetemplate.mjs
//
// THE CANDIDATE (the session_111 tail's queue): the Preferences
// family's decodes are EXHAUSTED (Typography + Background Image +
// Visual Style + the checkbox pair all wiring-equivalent); the next
// queue opens to the read-only interaction families — this probe walks
// the first: the template button's hover state (ours authors
// `hover:opacity-90`; the reference's own button was decoded at WH-24
// as the same arm — this probe verifies the RENDERED hover face +
// the transition channel + the onClick wiring on BOTH apps live).
//
// THE WH-20 LESSON, mirrored: a REAL pointer event (mouse.move to the
// button's center), never a synthetic mouseenter, and a >=400 ms
// settle before reading (the transition-all interpolation reads t=0
// transparent if sampled synchronously).
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
  await gotoApp(page, base, "/Routines");

  // Anchor: the FIRST "Use This Template" button on the template grid
  // (both apps render the 11-template catalog; the first card is the
  // same seeded face — parity-routines pins the full grid).
  const btn = page
    .locator("main button", { hasText: "Use This Template" })
    .first();
  await btn.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForTimeout(600);

  const readFaces = () =>
    btn.evaluate((el) => {
      const cs = getComputedStyle(el);
      // The props read (zero-write: reading the source never fires it).
      const k = Object.keys(el).find(
        (x) => x.startsWith("__reactProps$") || x.startsWith("__reactEventHandlers$"),
      );
      const props = k ? el[k] : null;
      const onClick =
        props && typeof props.onClick === "function"
          ? props.onClick.toString().slice(0, 300)
          : null;
      // The trailing icon (ours: ArrowRight h-4 w-4 ml-2; the
      // reference's own arrow — the WH-24 decode).
      const svg = el.querySelector("svg");
      const scs = svg ? getComputedStyle(svg) : null;
      return {
        text: el.textContent.trim().slice(0, 60),
        faces: {
          opacity: cs.opacity,
          w: cs.width,
          h: cs.height,
          display: cs.display,
          justifyContent: cs.justifyContent,
          backgroundImage: (cs.backgroundImage || "").slice(0, 120),
          boxShadow: (cs.boxShadow || "").slice(0, 120),
          cursor: cs.cursor,
          transitionProperty: cs.transitionProperty,
          transitionDuration: cs.transitionDuration,
        },
        svg: svg
          ? { w: scs.width, h: scs.height, marginLeft: scs.marginLeft }
          : null,
        onClickSource: onClick,
      };
    });

  // PASS 1 — the at-rest face.
  const atRest = await readFaces();

  // PASS 2 — the REAL-pointer hover face (the WH-20 doctrine: a real
  // mouse.move + a >=400 ms settle before the read).
  await btn.hover();
  await page.waitForTimeout(500);
  const hovered = await readFaces();

  // Move the pointer OFF the button and re-read — the arm must RELAX
  // (the hover state is transient; a stuck 0.9 would be a bug find).
  await page.mouse.move(8, 8);
  await page.waitForTimeout(500);
  const relaxed = await readFaces();

  const out = { atRest, hovered, relaxed };
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

  console.log("\n===== THE HOVER-ARM COMPARISON (the read-only decode) =====");
  const cmp = (name, a, b) =>
    console.log(
      `${name}:\n  ref=${JSON.stringify(a)}\n  ours=${JSON.stringify(b)}`,
    );
  cmp("button text", ref.atRest.text, ours.atRest.text);
  cmp("AT-REST faces", ref.atRest.faces, ours.atRest.faces);
  cmp("HOVERED faces (real pointer, 500ms settle)", ref.hovered.faces, ours.hovered.faces);
  cmp("RELAXED faces (pointer moved off)", ref.relaxed.faces, ours.relaxed.faces);
  cmp("trailing icon geometry", ref.atRest.svg, ours.atRest.svg);
  console.log("--- the onClick sources (zero-write reads, never fired) ---");
  console.log(`REF  source: ${ref.atRest.onClickSource?.slice(0, 240) || "-"}`);
  console.log(`OURS source: ${ours.atRest.onClickSource?.slice(0, 240) || "-"}`);

  // The verdict arm: the hover delta (opacity 1 -> 0.9 on both = the
  // authored hover:opacity-90 arm rendered identically; anything else
  // is a finding).
  const arm = (o) => ({
    restOpacity: o.atRest.faces.opacity,
    hoverOpacity: o.hovered.faces.opacity,
    relaxedOpacity: o.relaxed.faces.opacity,
  });
  console.log("--- the verdict (the opacity arm) ---");
  console.log(`REF  arm: ${JSON.stringify(arm(ref))}`);
  console.log(`OURS arm: ${JSON.stringify(arm(ours))}`);
} finally {
  await browser.close();
}
