// probe-typography.mjs — the WH-55 eighteenth-surface candidate walk,
// (c) leg: the Profile Typography preview's NON-DEFAULT font state,
// decoded ZERO-WRITE via React props inspection (the WH-53 instrument
// class — reading the handler source NEVER fires it; the interaction
// itself would WRITE on the reference, whose onChange persists to the
// shared account, so the wiring is decoded from the props + the
// at-rest faces already pinned by parity-profile's 433 members).
//
//   node scripts/probe-typography.mjs
//
// The decodable wiring facts (both apps, one login each):
//   1. the Font Family select's at-rest rendered value + its React
//      props: the onChange/onValueChange handler source, value,
//      controlled-ness — is the selection LIVE-APPLIED (state set +
//      persist) or form-buffered (saved by the bar)?
//   2. the preview paragraph's class wiring: does it ride the
//      --font-sans token (font-sans utility) so a non-default font
//      re-resolves it live — or is it a static face?
//   3. the preview's computed font-family vs the body's (at rest both
//      read the default stack; the QUESTION is whether they share the
//      SAME resolution source — the token — which the class wiring
//      answers without ever firing the change).
//   4. the "Preview of X" label wiring at rest.
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
  // Appearance is the default landing tab on both apps (view state
  // only — no clicks needed to reach the Typography family).
  const out = await page.evaluate(() => {
    // The Typography panel: anchored by the preview paragraph's fixed
    // sentence (both apps render the quick-brown-fox line — pinned by
    // parity-profile's typography members).
    const fox = Array.from(document.querySelectorAll("main p")).find((p) =>
      /quick brown fox/i.test(p.textContent),
    );
    if (!fox) return { found: false };

    const panel = fox.closest("section") || fox.parentElement?.parentElement?.parentElement;

    // The Font Family select: the reference's and ours are both
    // custom select triggers (button[role=combobox]) or a native
    // select — accept either shape inside the panel.
    const combos = panel
      ? Array.from(panel.querySelectorAll('[role="combobox"], select, button')).filter(
          (el) => el.closest('[role="combobox"]') === el || el.tagName === "SELECT",
        )
      : [];
    const nativeSelects = panel ? Array.from(panel.querySelectorAll("select")) : [];

    const reactProps = (el) => {
      const k = Object.keys(el).find(
        (x) => x.startsWith("__reactProps$") || x.startsWith("__reactEventHandlers$"),
      );
      if (!k) return null;
      const p = el[k];
      const out = {};
      for (const name of ["onChange", "onValueChange", "onInput", "onClick"]) {
        if (typeof p[name] === "function") out[name] = p[name].toString().slice(0, 300);
      }
      out.value = p.value;
      out.controlled = p.value !== undefined;
      return out;
    };

    // The "Preview of X" line: the sibling small gray line in the preview block.
    const previewBlock = fox.parentElement;
    const previewOf = previewBlock
      ? Array.from(previewBlock.querySelectorAll("p")).find((p) => /preview of/i.test(p.textContent))
      : null;

    // THE ANCESTOR WALK (the second WH-53 instrument arm): the Select's
    // onValueChange lives on the PARENT React element, not the trigger.
    // Walk up from the trigger until an element's props carry a change
    // handler; read its source — NEVER fire it (zero-write).
    const findChangeHandler = (start) => {
      let el = start;
      for (let i = 0; el && i < 12; i++) {
        const k = Object.keys(el).find(
          (x) => x.startsWith("__reactProps$") || x.startsWith("__reactEventHandlers$"),
        );
        if (k) {
          const p = el[k];
          for (const name of ["onValueChange", "onChange", "onSelect"]) {
            if (typeof p[name] === "function") {
              return { depth: i, handler: name, source: p[name].toString().slice(0, 500) };
            }
          }
        }
        el = el.parentElement;
      }
      return null;
    };
    const changeHandler = combos[0] ? findChangeHandler(combos[0]) : null;

    const foxCs = getComputedStyle(fox);
    const bodyCs = getComputedStyle(document.body);

    return {
      found: true,
      foxClass: fox.className,
      foxFontFamily: foxCs.fontFamily,
      bodyFontFamily: bodyCs.fontFamily,
      foxSharesBodyResolution: foxCs.fontFamily === bodyCs.fontFamily,
      // does the preview ride the --font-sans token? read the token's
      // CURRENT resolution at :root (the live-apply channel) + whether
      // the fox class carries font-sans (the token consumer)
      rootFontSans: getComputedStyle(document.documentElement).getPropertyValue("--font-sans").trim().slice(0, 120),
      foxRidesFontSansUtility: /(^|\s)font-sans(\s|$)/.test(fox.className),
      previewOfText: previewOf ? previewOf.textContent.trim().slice(0, 60) : null,
      previewOfClass: previewOf ? previewOf.className : null,
      triggerCount: combos.length + nativeSelects.length,
      triggerText: combos[0] ? combos[0].textContent.trim().slice(0, 40) : null,
      triggerProps: combos[0] ? reactProps(combos[0]) : null,
      nativeSelectProps: nativeSelects[0] ? reactProps(nativeSelects[0]) : null,
      changeHandler,
      panelClass: panel ? (panel.className || "").slice(0, 120) : null,
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

  // the comparison: the WIRING facts that matter for the non-default state
  console.log("\n===== WIRING COMPARISON =====");
  const cmp = (name, a, b) =>
    console.log(`${name}: ref=${JSON.stringify(a)?.slice(0, 140)} | ours=${JSON.stringify(b)?.slice(0, 140)}`);
  cmp("panel found", ref.found, ours.found);
  cmp("fox rides font-sans utility", ref.foxRidesFontSansUtility, ours.foxRidesFontSansUtility);
  cmp("fox shares body font resolution", ref.foxSharesBodyResolution, ours.foxSharesBodyResolution);
  cmp("root --font-sans present", !!ref.rootFontSans, !!ours.rootFontSans);
  cmp("select trigger count", ref.triggerCount, ours.triggerCount);
  cmp("trigger at-rest text", ref.triggerText, ours.triggerText);
  cmp("trigger controlled", ref.triggerProps?.controlled, ours.triggerProps?.controlled);
  cmp("trigger has change handler", !!(ref.triggerProps?.onValueChange || ref.triggerProps?.onChange || ref.nativeSelectProps?.onChange),
    !!(ours.triggerProps?.onValueChange || ours.triggerProps?.onChange || ours.nativeSelectProps?.onChange));
  console.log("--- the ancestor-walk change-handler source (zero-write read) ---");
  console.log(`REF  handler: ${ref.changeHandler ? `${ref.changeHandler.handler} @depth ${ref.changeHandler.depth}` : "NOT FOUND"}`);
  console.log(`REF  source:  ${ref.changeHandler?.source?.slice(0, 200) || "-"}`);
  console.log(`OURS handler: ${ours.changeHandler ? `${ours.changeHandler.handler} @depth ${ours.changeHandler.depth}` : "NOT FOUND"}`);
  console.log(`OURS source:  ${ours.changeHandler?.source?.slice(0, 200) || "-"}`);
  cmp("preview-of label text", ref.previewOfText, ours.previewOfText);
  cmp("preview-of label class", ref.previewOfClass, ours.previewOfClass);
} finally {
  await browser.close();
}
