// probe-customcolor.mjs — the WH-53 eighteenth-surface candidate walk,
// (a) leg: the preset picker's custom-color input state, decoded
// ZERO-WRITE via React props inspection (reading the handler source
// NEVER fires it — the interaction itself would WRITE on the reference
// (their onChange persists to the shared account), so the wiring is
// decoded from the props + the at-rest faces already pinned by
// parity-profile's 433 members).
//
//   node scripts/probe-customcolor.mjs
//
// Reads on BOTH apps (one login each):
//   1. the color inputs' React props: onChange.toString(), value,
//      defaultValue, the controlled-ness (value !== undefined)
//   2. the hex inputs' props likewise
//   3. the preview tile's style wiring (inline gradient?)
//   4. any preset-card "custom" state markers (aria-pressed forms)
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
  await gotoApp(page, base, "/Profile");
  // the Appearance tab is the default landing tab on both apps; the
  // color family is on it (view state only — no clicks needed)
  const out = await page.evaluate(() => {
    const colorInputs = Array.from(document.querySelectorAll('input[type="color"]'));
    const hexInputs = Array.from(document.querySelectorAll("input")).filter(
      (i) => i.type !== "color" && (i.value + i.placeholder).includes("#"),
    );
    const reactProps = (el) => {
      const k = Object.keys(el).find(
        (x) => x.startsWith("__reactProps$") || x.startsWith("__reactEventHandlers$"),
      );
      if (!k) return null;
      const p = el[k];
      const out = {};
      for (const name of ["onChange", "onInput", "onBlur", "onClick"]) {
        if (typeof p[name] === "function") out[name] = p[name].toString().slice(0, 400);
      }
      out.value = p.value;
      out.defaultValue = p.defaultValue;
      out.controlled = p.value !== undefined;
      return out;
    };
    // the preview tile: the leaf gradient element (parity-profile anchor)
    const grad = Array.from(document.querySelectorAll("main *")).find(
      (el) =>
        el.children.length === 0 &&
        getComputedStyle(el).backgroundImage.includes("gradient") &&
        el.textContent.trim().length > 4,
    );
    // any preset card marked custom/active
    const presetBtns = Array.from(document.querySelectorAll("main button")).filter(
      (b) => b.getAttribute("aria-pressed") !== null || /active|custom/i.test(b.className),
    );
    return {
      colorInputCount: colorInputs.length,
      hexInputCount: hexInputs.length,
      colorProps: colorInputs.map(reactProps),
      hexProps: hexInputs.map(reactProps),
      colorAtRest: colorInputs.map((i) => ({
        value: i.value,
        w: Math.round(i.getBoundingClientRect().width),
        h: Math.round(i.getBoundingClientRect().height),
      })),
      hexAtRest: hexInputs.map((i) => ({ value: i.value, placeholder: i.placeholder })),
      previewTile: grad
        ? {
            text: grad.textContent.trim().slice(0, 40),
            inlineStyle: (grad.getAttribute("style") || "").slice(0, 200),
            bg: getComputedStyle(grad).backgroundImage.slice(0, 160),
          }
        : null,
      presetMarkers: presetBtns
        .slice(0, 10)
        .map((b) => ({ text: b.textContent.trim().slice(0, 24), pressed: b.getAttribute("aria-pressed") })),
    };
  });
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

  // the comparison: the WIRING facts that matter for parity
  console.log("\n===== WIRING COMPARISON =====");
  const cmp = (name, a, b) => console.log(`${name}: ref=${JSON.stringify(a)?.slice(0, 120)} | ours=${JSON.stringify(b)?.slice(0, 120)}`);
  cmp("colorInput count", ref.colorInputCount, ours.colorInputCount);
  cmp("hexInput count", ref.hexInputCount, ours.hexInputCount);
  cmp("color controlled", ref.colorProps.map((p) => p?.controlled), ours.colorProps.map((p) => p?.controlled));
  cmp("color onChange has handler", ref.colorProps.map((p) => !!p?.onChange), ours.colorProps.map((p) => !!p?.onChange));
  cmp("hex controlled", ref.hexProps.map((p) => p?.controlled), ours.hexProps.map((p) => p?.controlled));
  cmp("hex onChange has handler", ref.hexProps.map((p) => !!p?.onChange), ours.hexProps.map((p) => !!p?.onChange));
  cmp("preview inline style", !!ref.previewTile?.inlineStyle, !!ours.previewTile?.inlineStyle);
} finally {
  await browser.close();
}
