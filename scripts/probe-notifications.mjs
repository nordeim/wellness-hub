// probe-notifications.mjs — the WH-57 candidate walk: the Profile
// PREFERENCES tab's APP PREFERENCES checkbox pair (Enable Notifications +
// Weekly Goal Reminders) — the NON-DEFAULT states decoded ZERO-WRITE via
// React props inspection (the WH-53/WH-55/WH-56 instrument class — reading
// the handler source NEVER fires it; the interaction itself would WRITE on
// the reference, whose form state persists to the shared account, so the
// wiring is decoded from the props + the at-rest faces already pinned by
// parity-profile's 433 members).
//
//   node scripts/probe-notifications.mjs
//
// THE TAB PLACEMENT (the WH-56 placement lesson, mirrored): the App
//   Preferences pair rides the PREFERENCES tab on BOTH apps (the
//   reference's Preferences tab carries ONLY the checkboxes — its
//   Typography/Background/Visual Style panels ride Appearance, the
//   probe-preferences decode; ours splits identically). The probe
//   normalizes to the Preferences tab by clicking its tab button.
//   The panel is anchored by its CHECKBOX INVENTORY (the innermost
//   ancestor holding both native input[type=checkbox] elements) — never
//   by a header-text node (the reference's panel titles are DIVs, the
//   parity-profile "the titles are DATA" lesson).
//
// The decodable wiring facts (both apps, one login each):
//   1. the pair's at-rest DOM state: checked (the default state — both
//      false expected), the computed checkbox faces (w/h, appearance,
//      accent-color, cursor) and the row faces (the parity-profile pins
//      carry the geometry; this probe carries the WIRING).
//   2. the pair's React props: the onChange handler source, the checked
//      binding, controlled-ness — is the toggle LIVE-APPLIED (state set +
//      persist) or form-buffered?
//   3. the field-name decode: the reference's onChange source carries its
//      Base44 field vocabulary (the background_image precedent) — the
//      expected class is a snake_case pair against our camelCase pair.
//   4. the live-apply channel: ours writes the store (setTheme → the
//      fire-and-forget /api/prefs sync — the cross-device superset); the
//      reference's Base44 form pattern persists to the shared account
//      (the WH-55/WH-56 decoded class).
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
  // normalize the tab: Preferences active on both (view state only —
  // the same normalize parity-profile performs; clicking a tab is a
  // client-side view flip, never a write).
  await page.locator("button", { hasText: "Preferences" }).first().click({ timeout: 8000 });
  await page.waitForTimeout(900);

  const out = await page.evaluate(() => {
    // The App Preferences panel: anchored by its checkbox inventory —
    // the innermost ancestor holding >= 2 native input[type=checkbox]
    // (both apps render exactly the pair on this tab; the reference's
    // titles are DIVs so a header-text anchor never matches there).
    const boxes = Array.from(document.querySelectorAll("main input[type=checkbox]"));
    let panel = null;
    if (boxes.length >= 2) {
      let el = boxes[0];
      while (el && el !== document.body) {
        if (el.querySelectorAll("input[type=checkbox]").length >= 2) {
          panel = el;
          break;
        }
        el = el.parentElement;
      }
    }
    const panelBoxes = panel
      ? Array.from(panel.querySelectorAll("input[type=checkbox]"))
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
      for (const name of ["onChange", "onInput"]) {
        if (typeof p[name] === "function") o[name] = p[name].toString().slice(0, 300);
      }
      o.checked = p.checked;
      o.defaultChecked = p.defaultChecked;
      o.controlled = p.checked !== undefined;
      return o;
    };

    // The row context: each checkbox's nearest label/parent row (the
    // parity-account anchor — `closest("label") || parentElement`; the
    // reference's rows are DIVs whose checkbox is a DIRECT child, so a
    // grandparent anchor lands on the rows container and both boxes
    // read the FIRST row's title — the instrument bug the probe's first
    // flight caught on itself) — the title + subtitle text (the pair's
    // identity) + the row's computed cursor (the affordance face).
    const readRow = (box) => {
      if (!box) return null;
      const row = box.closest("label") || box.parentElement || null;
      const cs = row ? getComputedStyle(row) : null;
      const title = row
        ? Array.from(row.querySelectorAll("span, div, p"))
            .filter((n) => n.children.length === 0)
            .map((n) => n.textContent.trim())
            .filter((t) => t && t.length > 3)[0] ?? null
        : null;
      return {
        rowTag: row?.tagName ?? null,
        title: title ? title.slice(0, 60) : null,
        rowCursor: cs?.cursor ?? null,
        rowDisplay: cs?.display ?? null,
      };
    };

    return {
      tabCheckBoxCount: boxes.length,
      panelFound: !!panel,
      boxes: panelBoxes.map((b) => {
        const cs = getComputedStyle(b);
        return {
          domChecked: b.checked,
          faces: {
            w: cs.width,
            h: cs.height,
            appearance: cs.appearance,
            accentColor: cs.accentColor,
            cursor: cs.cursor,
          },
          props: readProps(b),
          row: readRow(b),
        };
      }),
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

  console.log("\n===== WIRING COMPARISON (the non-default state decode) =====");
  const cmp = (name, a, b) =>
    console.log(
      `${name}: ref=${JSON.stringify(a)?.slice(0, 200)} | ours=${JSON.stringify(b)?.slice(0, 200)}`,
    );
  cmp("checkboxes on the tab", ref.tabCheckBoxCount, ours.tabCheckBoxCount);
  cmp("panel found (checkbox-anchored)", ref.panelFound, ours.panelFound);
  cmp(
    "at-rest domChecked pair",
    (ref.boxes || []).map((b) => b.domChecked),
    (ours.boxes || []).map((b) => b.domChecked),
  );
  cmp(
    "computed faces (w/h/appearance/accent/cursor)",
    (ref.boxes || []).map((b) => b.faces),
    (ours.boxes || []).map((b) => b.faces),
  );
  cmp(
    "row titles",
    (ref.boxes || []).map((b) => b.row?.title),
    (ours.boxes || []).map((b) => b.row?.title),
  );
  cmp(
    "row tag + cursor",
    (ref.boxes || []).map((b) => [b.row?.rowTag, b.row?.rowCursor]),
    (ours.boxes || []).map((b) => [b.row?.rowTag, b.row?.rowCursor]),
  );
  cmp(
    "controlled pair",
    (ref.boxes || []).map((b) => b.props?.controlled),
    (ours.boxes || []).map((b) => b.props?.controlled),
  );
  cmp(
    "checked prop binding pair",
    (ref.boxes || []).map((b) => b.props?.checked),
    (ours.boxes || []).map((b) => b.props?.checked),
  );
  console.log("--- the onChange sources (zero-write reads, never fired) ---");
  (ref.boxes || []).forEach((b, i) =>
    console.log(`REF  [${i}] source: ${b.props?.onChange?.slice(0, 240) || "-"}`),
  );
  (ours.boxes || []).forEach((b, i) =>
    console.log(`OURS [${i}] source: ${b.props?.onChange?.slice(0, 240) || "-"}`),
  );

  // THE ROW-CURSOR ROOT-CAUSE ARM (ours only, zero reference cost): the
  // pair's row cursors read ref AUTO / ours DEFAULT — is ours AUTHORED or
  // the UA stylesheet's own <label> shape? Bare elements injected into
  // our page, computed cursor read, removed. label=default + div=auto =
  // the UA-stylesheet derivative of the WH-25 LABEL-association a11y
  // superset (the DOM-SHAPE FACT family — documented, not cured; the
  // parity-account rowTag FACT precedent).
  const ctx3 = await browser.newContext();
  const page3 = await ctx3.newPage();
  await page3.goto(`${DEV}/login`, { waitUntil: "load" });
  await page3.waitForSelector("main", { timeout: 25000 });
  const uaCursor = await page3.evaluate(() => {
    const mk = (tag) => {
      const el = document.createElement(tag);
      el.textContent = "probe";
      document.body.appendChild(el);
      const cursor = getComputedStyle(el).cursor;
      el.remove();
      return cursor;
    };
    return { bareLabel: mk("label"), bareDiv: mk("div") };
  });
  await ctx3.close();
  console.log("--- the row-cursor root-cause arm (bare-element UA read, ours) ---");
  console.log(
    `bare <label> cursor: ${uaCursor.bareLabel} | bare <div> cursor: ${uaCursor.bareDiv} — ${
      uaCursor.bareLabel === "default" && uaCursor.bareDiv === "auto"
        ? "the UA-stylesheet derivative of the LABEL superset (documented, not cured)"
        : "AUTHORED — investigate"
    }`,
  );
} finally {
  await browser.close();
}
