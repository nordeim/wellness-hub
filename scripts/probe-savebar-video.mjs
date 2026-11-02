// probe-savebar-video.mjs — the WH-54 eighteenth-surface candidate walk,
// (b) the Profile save-bar's DIRTY-STATE face + (c) the routines video
// templates' family BEYOND the reveal face (what the Watch Video button
// actually opens). Decoded ZERO-WRITE on both axes:
//
//   node scripts/probe-savebar-video.mjs
//
// (b) The save bar's at-rest face is already pinned by parity-profile's
//     433 members (save.text/w/height/paddings/radius/color/fontSize/
//     fontWeight/gradient/shadow + the wrapper four). The candidate is
//     the DIRTY axis: does the reference's Save All Changes button carry
//     a disabled-at-rest → enabled-on-dirty transition (a dirty-state
//     gate our stateless always-enabled bar would not mirror)? Reading
//     the disabled/aria-disabled/React-props members NEVER fires the
//     handler (the WH-53 write-blocked decode instrument class) — and
//     making the bar dirty on the reference would WRITE (every control
//     persists on change, the decoded Base44 pattern), so the dirty
//     state itself is write-blocked: the at-rest disabled member + the
//     props' gating source are the decodable facts.
// (c) The reveal face (h-40 thumbnail + the overlay) is pinned by
//     parity-routines. The candidate is the CLICK face: does the
//     reference open an in-page video modal or a new tab? The click is
//     client-state only (no persist to the account — the zero-write
//     doctrine forbids WRITES, not reads/navigation); a window.open
//     popup is caught and closed before it loads anything.
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

const login = async (page, base) => {
  await page.goto(`${base}/login`, { waitUntil: "load" });
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 25000 });
  await page.waitForTimeout(1400);
};

/** (b) the save bar's at-rest + wiring facts, zero-write */
const readSaveBar = async (page) =>
  page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("main button")).find((b) =>
      b.textContent.includes("Save All Changes"),
    );
    if (!btn) return { found: false };
    const reactProps = (el) => {
      const k = Object.keys(el).find(
        (x) => x.startsWith("__reactProps$") || x.startsWith("__reactEventHandlers$"),
      );
      if (!k) return null;
      const p = el[k];
      const out = {};
      for (const name of ["onClick", "disabled"]) {
        if (typeof p[name] === "function") out[name] = p[name].toString().slice(0, 300);
        else if (p[name] !== undefined) out[name] = p[name];
      }
      return out;
    };
    const cs = getComputedStyle(btn);
    return {
      found: true,
      text: btn.textContent.trim().slice(0, 40),
      domDisabled: btn.disabled === true,
      ariaDisabled: btn.getAttribute("aria-disabled"),
      cursor: cs.cursor,
      pointerEvents: cs.pointerEvents,
      opacity: cs.opacity,
      props: reactProps(btn),
      // any dirty-tracking markers in the page's data attributes
      dirtyMarkers: Array.from(document.querySelectorAll("main [data-dirty], main [data-state]"))
        .slice(0, 6)
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          dataState: el.getAttribute("data-state"),
          dataDirty: el.getAttribute("data-dirty"),
          text: (el.textContent || "").trim().slice(0, 24),
        })),
    };
  });

/** (c) the video family's click face, zero-write: click Watch Video on the
 *     FIRST video template card, classify popup-vs-modal, close */
const readVideoFamily = async (page, label) => {
  // the parity-routines anchor: the Watch Video button (the /Watch Video/i
  // text test — the reference's zone button, pin-verified 697/697)
  const btn = page.locator("main button").filter({ hasText: /Watch Video/i }).first();
  if (!(await btn.count())) return { found: false, label };

  const out = { found: true, label };
  // catch a popup BEFORE clicking (window.open / target=_blank)
  const popupPromise = page
    .waitForEvent("popup", { timeout: 4000 })
    .then((p) => ({ popup: true, url: p.url() }))
    .catch(() => null);
  await btn.click();
  await page.waitForTimeout(900);
  out.popup = (await Promise.resolve(popupPromise).catch(() => null)) || { popup: false };

  // in-page modal? (dialog role, new overlay, iframe)
  out.modal = await page.evaluate(() => {
    const dlg = document.querySelector("dialog[open], [role=dialog][data-state=open]");
    if (!dlg) return { open: false };
    const iframe = dlg.querySelector("iframe");
    return {
      open: true,
      rect: (() => {
        const r = dlg.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height) };
      })(),
      iframeSrc: iframe ? iframe.src.slice(0, 120) : null,
      closeBtn: !!dlg.querySelector("button"),
    };
  });
  // URL unchanged (no in-place navigation)?
  out.urlAfter = page.url().replace(/^[a-z]+:\/\//, "").slice(0, 60);
  // close zero-write: Escape for a modal, close any popup context
  if (out.modal?.open) {
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    out.modalClosed = !(await page.evaluate(() => !!document.querySelector("[role=dialog][data-state=open], dialog[open]")));
  }
  return out;
};

const browser = await chromium.launch();
try {
  // ---- the reference flight (ONE login) ----
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await login(page, REF);
  await gotoApp(page, REF, "/Profile");
  const refSave = await readSaveBar(page);
  await gotoApp(page, REF, "/Routines");
  const refVideo = await readVideoFamily(page, "REFERENCE");
  await ctx.close();

  // ---- our flight (ONE login) ----
  const ctx2 = await browser.newContext();
  const page2 = await ctx2.newPage();
  await login(page2, DEV);
  await gotoApp(page2, DEV, "/Profile");
  const ourSave = await readSaveBar(page2);
  await gotoApp(page2, DEV, "/Routines");
  const ourVideo = await readVideoFamily(page2, "OURS");
  await ctx2.close();

  console.log("\n===== (b) SAVE BAR — REFERENCE =====");
  console.log(JSON.stringify(refSave, null, 1));
  console.log("\n===== (b) SAVE BAR — OURS =====");
  console.log(JSON.stringify(ourSave, null, 1));
  console.log("\n===== (c) VIDEO FAMILY =====");
  console.log("REFERENCE:", JSON.stringify(refVideo, null, 1));
  console.log("OURS:", JSON.stringify(ourVideo, null, 1));

  // the wiring comparison
  console.log("\n===== WIRING COMPARISON =====");
  const cmp = (n, a, b) => console.log(`${n}: ref=${JSON.stringify(a)?.slice(0, 140)} | ours=${JSON.stringify(b)?.slice(0, 140)}`);
  cmp("(b) domDisabled", refSave?.domDisabled, ourSave?.domDisabled);
  cmp("(b) ariaDisabled", refSave?.ariaDisabled ?? null, ourSave?.ariaDisabled ?? null);
  cmp("(b) cursor", refSave?.cursor, ourSave?.cursor);
  cmp("(b) props.disabled", refSave?.props?.disabled ?? null, ourSave?.props?.disabled ?? null);
  cmp("(b) props.onClick gates on dirty", /dirty|changed|initial|isEqual|JSON\.stringify/.test(refSave?.props?.onClick ?? ""), /dirty|changed|initial|isEqual|JSON\.stringify/.test(ourSave?.props?.onClick ?? ""));
  cmp("(c) opens popup (new tab)", refVideo?.popup?.popup, ourVideo?.popup?.popup);
  cmp("(c) popup url", refVideo?.popup?.url ?? null, ourVideo?.popup?.url ?? null);
  cmp("(c) in-page modal", refVideo?.modal?.open ?? null, ourVideo?.modal?.open ?? null);
  cmp("(c) url unchanged after click", refVideo?.urlAfter, ourVideo?.urlAfter);
} finally {
  await browser.close();
}
