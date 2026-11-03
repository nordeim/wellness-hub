// probe-preferences.mjs — the WH-56 candidate walk: the Profile
// Appearance tab's BACKGROUND IMAGE input + the VISUAL STYLE selects'
// NON-DEFAULT states, decoded ZERO-WRITE via React props inspection
// (the WH-53/WH-55 instrument class — reading the handler source NEVER
// fires it; the interaction itself would WRITE on the reference, whose
// form state persists to the shared account, so the wiring is decoded
// from the props + the at-rest faces already pinned by parity-profile's
// 433 members).
//
//   node scripts/probe-preferences.mjs
//
// THE TAB PLACEMENT DECODE (this round's own lesson): the panels ride
//   the APPEARANCE tab on BOTH apps (our AppearancePanel carries Theme
//   Mode + Colors + Typography + Background Image + Visual Style; the
//   reference's Appearance tab carries the same five cards — its
//   Preferences tab carries only the App Preferences checkboxes, as
//   does ours). The probe therefore normalizes to Appearance (the
//   default landing tab), the same normalize parity-profile performs;
//   anchoring the Visual Style panel by an h2 "Visual Style" header
//   NEVER matches the reference (its panel titles are DIVs — the
//   parity-profile "the titles are DATA" lesson): the vs panel is
//   anchored by its combobox inventory instead (the innermost ancestor
//   holding all three triggers).
//
// The decodable wiring facts (both apps, one login each):
//   1. the Background Image input's at-rest rendered value + its React
//      props: the onChange handler source, value binding,
//      controlled-ness, placeholder — is the URL LIVE-APPLIED (state
//      set + persist) or form-buffered?
//   2. the hint line + the input's at-rest faces (the parity-profile
//      pins carry the geometry; this probe carries the WIRING).
//   3. the three Visual Style selects (Sidebar Style / Card Style /
//      Animation Level): at-rest trigger labels + React props on the
//      triggers, plus the ancestor-walk arm for the Select's
//      onValueChange (the WH-55 framework-shape finding: the Radix
//      root renders no DOM element — the walk is expected to find
//      NOTHING on both apps, which is itself the decode).
//   4. the live-apply channel: ours writes the store (setTheme →
//      applyTheme → the <main> style branch for bgImageUrl [the WH-16
//      suppressHydrationWarning client-only attribute] + the
//      fire-and-forget /api/prefs sync); the reference's Base44 form
//      pattern persists to the shared account (the WH-55 Typography
//      retirement's decoded class).
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
  // normalize the tab: Appearance active on both (the default landing —
  // the same normalize parity-profile performs; view state only).
  await page.locator("button", { hasText: "Appearance" }).first().click({ timeout: 8000 });
  await page.waitForTimeout(900);

  const out = await page.evaluate(() => {
    // The Background Image input: anchored by its placeholder (both
    // apps render the unsplash placeholder — the parity-profile pins).
    const bgInput = Array.from(document.querySelectorAll("main input")).find((i) =>
      /images\.unsplash\.com/i.test(i.placeholder || ""),
    );
    const bgPanel = bgInput
      ? bgInput.closest("section") || bgInput.parentElement
      : null;
    const bgHint = bgPanel
      ? Array.from(bgPanel.querySelectorAll("p")).find((p) => /pro tip/i.test(p.textContent))
      : null;

    // The Visual Style panel: anchored by its combobox inventory — the
    // innermost ancestor holding >= 3 comboboxes whose first reads
    // "Gradient (Colorful)" (the reference's titles are DIVs, so a
    // header-text anchor never matches there — see the placement note).
    const vsFirst = Array.from(document.querySelectorAll('[role="combobox"]')).find((t) =>
      /Gradient \(Colorful\)/i.test(t.textContent || ""),
    );
    let vsPanel = null;
    if (vsFirst) {
      let el = vsFirst;
      while (el && el !== document.body) {
        if (el.querySelectorAll('[role="combobox"]').length >= 3) {
          vsPanel = el;
          break;
        }
        el = el.parentElement;
      }
    }
    const vsCombos = vsPanel
      ? Array.from(vsPanel.querySelectorAll('[role="combobox"]'))
      : [];

    // The props reads (zero-write: reading the source never fires it).
    const readProps = (el) => {
      if (!el) return null;
      const k = Object.keys(el).find(
        (x) => x.startsWith("__reactProps$") || x.startsWith("__reactEventHandlers$"),
      );
      if (!k) return null;
      const p = el[k];
      const o = {};
      for (const name of ["onChange", "onValueChange", "onInput"]) {
        if (typeof p[name] === "function") o[name] = p[name].toString().slice(0, 300);
      }
      o.value = p.value;
      o.controlled = p.value !== undefined;
      return o;
    };

    // The live-apply channel on OUR side: the <main> element carries the
    // client-only style attribute when a bgImageUrl is persisted (the
    // WH-16 branch). At rest (no image persisted) the style is absent on
    // both apps — the channel's EXISTENCE is what the decode compares.
    const mainEl = document.querySelector("main");
    const mainStyleAttr = mainEl ? mainEl.getAttribute("style") : null;

    return {
      found: true,
      bg: {
        inputFound: !!bgInput,
        placeholder: bgInput?.placeholder ?? null,
        domValue: bgInput?.value ?? null,
        props: bgInput ? readProps(bgInput) : null,
        hint: bgHint ? bgHint.textContent.trim().slice(0, 80) : null,
      },
      vs: {
        panelFound: !!vsPanel,
        triggerLabels: vsCombos.map((t) => ({ text: t.textContent.trim().slice(0, 40) })),
        triggerCount: vsCombos.length,
        propsByTrigger: vsCombos.map((t) => readProps(t)),
      },
      mainStyleAttr,
    };
  });

  // The ancestor walks for the Visual Style selects (one per trigger).
  const walkResults = [];
  const triggerCount = out.vs?.triggerCount ?? 0;
  for (let i = 0; i < triggerCount; i++) {
    // the Nth combobox inside the anchored vs panel, via evaluateHandle
    const trigHandle = await page.evaluateHandle(
      ({ idx }) => {
        const first = Array.from(document.querySelectorAll('[role="combobox"]')).find((t) =>
          /Gradient \(Colorful\)/i.test(t.textContent || ""),
        );
        if (!first) return null;
        let el = first;
        while (el && el !== document.body) {
          if (el.querySelectorAll('[role="combobox"]').length >= 3) break;
          el = el.parentElement;
        }
        if (!el) return null;
        const combos = Array.from(el.querySelectorAll('[role="combobox"]'));
        return combos[idx] ?? null;
      },
      { idx: i },
    );
    walkResults.push(
      await page
        .evaluate((el) => {
          if (!el) return null;
          let cur = el;
          for (let d = 0; cur && d < 12; d++) {
            const k = Object.keys(cur).find(
              (x) => x.startsWith("__reactProps$") || x.startsWith("__reactEventHandlers$"),
            );
            if (k) {
              const p = cur[k];
              for (const name of ["onValueChange", "onChange", "onSelect"]) {
                if (typeof p[name] === "function") {
                  return {
                    depth: d,
                    handler: name,
                    source: p[name].toString().slice(0, 400),
                  };
                }
              }
            }
            cur = cur.parentElement;
          }
          return null;
        }, trigHandle)
        .catch(() => null),
    );
    await trigHandle.dispose().catch(() => {});
  }

  console.log(`\n===== ${label} =====`);
  console.log(JSON.stringify(out, null, 1));
  console.log(`ancestor-walk per Visual Style trigger:`);
  walkResults.forEach((r, i) => {
    console.log(
      `  [${i}] ${
        r ? `${r.handler} @depth ${r.depth}: ${r.source.slice(0, 160)}` : "NOT FOUND (the framework-shape class)"
      }`,
    );
  });
  return { ...out, walkResults };
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

  console.log("\n===== WIRING COMPARISON (the non-default state decode) =====");
  const cmp = (name, a, b) =>
    console.log(
      `${name}: ref=${JSON.stringify(a)?.slice(0, 160)} | ours=${JSON.stringify(b)?.slice(0, 160)}`,
    );
  cmp("bg input found", ref.bg?.inputFound, ours.bg?.inputFound);
  cmp("bg placeholder", ref.bg?.placeholder, ours.bg?.placeholder);
  cmp("bg at-rest DOM value", ref.bg?.domValue, ours.bg?.domValue);
  cmp("bg at-rest props value", ref.bg?.props?.value, ours.bg?.props?.value);
  cmp("bg controlled", ref.bg?.props?.controlled, ours.bg?.props?.controlled);
  cmp("bg onChange present", !!ref.bg?.props?.onChange, !!ours.bg?.props?.onChange);
  console.log("--- the bg input's onChange source (zero-write read) ---");
  console.log(`REF  source: ${ref.bg?.props?.onChange?.slice(0, 220) || "-"}`);
  console.log(`OURS source: ${ours.bg?.props?.onChange?.slice(0, 220) || "-"}`);
  cmp("bg hint line", ref.bg?.hint, ours.bg?.hint);
  cmp("vs panel found", ref.vs?.panelFound, ours.vs?.panelFound);
  cmp("vs trigger count", ref.vs?.triggerCount, ours.vs?.triggerCount);
  cmp("vs trigger labels", ref.vs?.triggerLabels, ours.vs?.triggerLabels);
  cmp(
    "vs triggers controlled",
    (ref.vs?.propsByTrigger || []).map((p) => p?.controlled ?? null),
    (ours.vs?.propsByTrigger || []).map((p) => p?.controlled ?? null),
  );
  console.log("--- the vs selects' ancestor-walk (the WH-55 framework-shape expectation) ---");
  console.log(
    `REF  walks: ${(ref.walkResults || []).map((r) => (r ? `${r.handler}@${r.depth}` : "NONE")).join(" , ") || "NONE"}`,
  );
  console.log(
    `OURS walks: ${(ours.walkResults || []).map((r) => (r ? `${r.handler}@${r.depth}` : "NONE")).join(" , ") || "NONE"}`,
  );
  cmp("main style attr at rest", ref.mainStyleAttr, ours.mainStyleAttr);
} finally {
  await browser.close();
}
