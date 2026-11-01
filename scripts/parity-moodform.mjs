// The committed SAME-ROUND DUAL-APP comparison (WH-35, F-2 — the WH-34
// plan's suggested-next (c)): the reference's mood-form interior is
// ledgered in the watch script (WH-34, F-3), OUR side is pinned by the
// (k) e2e leg — but the two verifications run on two clocks. The e2e
// gate boots OUR production standalone (its own scratch db, its own
// moment); the watch reads the reference (its own login, its own
// moment). Each app is compared against its own yesterday, never
// against the other's today — a same-round drift on EITHER app between
// those moments is invisible to both pins.
//
// This script closes the gap the direct way: it reads BOTH apps' mood
// forms LIVE in one session and diffs them member-by-member — the
// live-vs-live read. Any drift on either side surfaces against the
// other app's same-round face, not against a stale pin.
//
//   node scripts/parity-moodform.mjs        (our dev server must be up)
//
// PASS A (ONE reference login — the same budget the watch spends): open
//   /MentalHealth's New Entry form read-only, read the computed member
//   set, close via Cancel, assert the form left the DOM.
// PASS B (ONE our-side login, the demo credentials against
//   localhost:3000): the same read on OUR dev server.
// Then the DIFF: every member compared ref-vs-ours. Gradients compare
// their rgb STOP TRIPLES (the two platforms serialize the full property
// string with different whitespace — the stops are the parity claim).
//
// ZERO-WRITE doctrine (enforced on BOTH apps): the form is opened
// read-only and closed via Cancel — never a submit, never a tile click
// (both apps open with Good pre-selected, so the active-tile read needs
// no interaction at all).
//
// Output: a per-member MATCH/DRIFT report + a final line. Exit 0 only
// when every member matches; exit 1 on any DRIFT or PROBE-ERROR (a
// drift is a FINDING for the round's plan — investigate, cure, and
// re-run; this script compares the two live faces, so a drift means one
// of the two apps moved THIS ROUND).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const OURS = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

// The comparable member family — the watch ledger's moodForm set (the
// computed geometry both apps render identically; the known deliberate
// supersets — our aria-pressed tiles, our h2 heading element — are NOT
// computed-style members and so are naturally out of scope).
const MEMBERS = [
  "groupCount",
  "groupGap",
  "moodLabelMb",
  "tiles",
  "activeTileText",
  "activeTileColor",
  "inactiveTileBorder",
  "energyLabel",
  "rangeH",
  "rangeMin",
  "rangeBg",
  "lowHighMt",
  "lowHighColor",
  "reflectH",
  "reflectMinH",
  "cancelH",
  "saveEntryH",
  "saveEntryColor",
];
// Gradient members compare their STOP TRIPLES, not the full property
// string (platform serialization differs in whitespace; the rgb stops
// are the parity claim — the watch ledger's own form).
const GRADIENT_STOPS = {
  activeTileBg: ["59, 130, 246", "6, 182, 212"], // blue-500 → cyan-500
  saveEntryBg: ["16, 185, 129", "20, 184, 166"], // emerald-500 → teal-500
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

/** SPA-safe navigation — the watch's gotoApp, verbatim: `waitUntil:
 *  "load"` fires BEFORE an SPA renders its route, so land, wait for the
 *  app shell's <main>, then settle. A plain async function — failures
 *  throw and propagate to the pass's outer probe (the watch's own
 *  form; wrapping the body in a probe would return undefined on
 *  success). */
const gotoApp = async (page, base, route, { sel = "main", settleMs = 900 } = {}) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector(sel, { timeout: 15000 });
  await page.waitForTimeout(settleMs);
};

/** The mood-form computed read — the watch script's moodForm probe,
 *  parameterized by page (the SAME evaluate payload serves both apps;
 *  every locator used here is face-identical across them: the
 *  shadow-xl card walk from the range input, the pt-0 body → its ONE
 *  wrapper child, the grid tiles, the collapsed-text Low/High row). */
const readMoodForm = async (page) => {
  const openBtn = page.locator("main button", { hasText: /New Entry/i }).first();
  await openBtn.click();
  await page.waitForSelector("text=How are you feeling today?", { timeout: 8000 });
  await page.waitForTimeout(450);
  const read = await page.evaluate(() => {
    const range = document.querySelector("input[type='range']");
    if (!range) return { error: "no range (form not open?)" };
    let card = range;
    while (card && card !== document.body) {
      if ((card.getAttribute("class") || "").includes("shadow-xl")) break;
      card = card.parentElement;
    }
    const body = Array.from(card.children).find((c) => (c.getAttribute("class") || "").includes("pt-0"));
    const wrapper = body?.firstElementChild;
    const groups = wrapper ? Array.from(wrapper.children) : [];
    const grid = card.querySelector("div[class*='grid-cols-2']");
    const tiles = grid ? Array.from(grid.querySelectorAll("button")) : [];
    // the DEFAULT-selected tile — no click: both apps open with Good
    // pre-selected (probed at WH-34; our useState("good") twin)
    const active = tiles.find((t) => (getComputedStyle(t).backgroundImage || "").includes("gradient"));
    const inactive = tiles.find((t) => t !== active);
    const labels = Array.from(card.querySelectorAll("label"));
    const energyLabel = labels.find((l) => /Energy/i.test(l.textContent || ""));
    const textareas = Array.from(card.querySelectorAll("textarea"));
    const reflect = textareas[textareas.length - 1];
    const buttons = Array.from(card.querySelectorAll("button"));
    const cancel = buttons.find((b) => b.textContent.trim() === "Cancel");
    const save = buttons.find((b) => /Save Entry/i.test(b.textContent.trim()));
    const row = Array.from(card.querySelectorAll("div")).find(
      (d) => d.textContent.replace(/\s+/g, "") === "LowHigh" && d.querySelector("span"),
    );
    return {
      groupCount: groups.length,
      groupGap:
        groups.length >= 2
          ? Math.round(groups[1].getBoundingClientRect().y - groups[0].getBoundingClientRect().y - groups[0].getBoundingClientRect().height)
          : null,
      moodLabelMb:
        grid && labels[0]
          ? Math.round(grid.getBoundingClientRect().y - labels[0].getBoundingClientRect().bottom)
          : null,
      tiles: tiles.length,
      activeTileText: active?.textContent.replace(/\s+/g, "").trim(),
      activeTileBg: active ? getComputedStyle(active).backgroundImage : null,
      activeTileColor: active ? getComputedStyle(active).color : null,
      inactiveTileBorder: inactive ? getComputedStyle(inactive).borderColor : null,
      energyLabel: energyLabel?.textContent.replace(/\s+/g, " ").trim(),
      rangeH: Math.round(range.getBoundingClientRect().height),
      rangeMin: range.min,
      rangeBg: getComputedStyle(range).backgroundColor,
      lowHighMt: row ? getComputedStyle(row).marginTop : null,
      lowHighColor: row ? getComputedStyle(row.querySelector("span")).color : null,
      reflectH: reflect ? Math.round(reflect.getBoundingClientRect().height) : null,
      reflectMinH: reflect ? getComputedStyle(reflect).minHeight : null,
      cancelH: cancel ? Math.round(cancel.getBoundingClientRect().height) : null,
      saveEntryH: save ? Math.round(save.getBoundingClientRect().height) : null,
      saveEntryBg: save ? getComputedStyle(save).backgroundImage : null,
      saveEntryColor: save ? getComputedStyle(save).color : null,
    };
  });
  if (read.error) return read;
  // close read-only via Cancel (the inline form's own affordance), then
  // assert the form left the DOM — the zero-write proof
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await page.waitForTimeout(400);
  const closed = await page.evaluate(() => document.querySelector("input[type='range']") === null);
  return { ...read, closed };
};

/** One app's pass: login → /MentalHealth → the read. Both apps share
 *  the login form's face (email + password inputs, a submit button) —
 *  the reference lands on `/`, ours on `/` too (the authed dashboard);
 *  the post-login wait is selector-based, not URL-based, so both shapes
 *  serve. */
const runPass = async (page, base, label) => {
  await gotoApp(page, base, "/login", { sel: "h1" });
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 15000 });
  await page.waitForTimeout(1200); // the tiles render async — the watch's settle
  await gotoApp(page, base, "/MentalHealth");
  return readMoodForm(page);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

console.log("--- PASS A: the reference (one login) ---");
const ref = await probe(() => runPass(page, REF, "reference"));
if (ref.__error || ref.error) {
  console.log(`PROBE-ERROR reference: ${ref.__error || ref.error}`);
  await browser.close();
  process.exit(1);
}
console.log(
  `reference read: ${ref.groupCount} groups @${ref.groupGap}px, ${ref.tiles} tiles (active ${ref.activeTileText}), energy "${ref.energyLabel}", closed=${ref.closed}`,
);
if (!ref.closed) {
  console.log("PROBE-ERROR reference: the form did not close via Cancel");
  await browser.close();
  process.exit(1);
}

console.log("--- PASS B: our dev server (one login) ---");
const ours = await probe(() => runPass(page, OURS, "ours"));
if (ours.__error || ours.error) {
  console.log(`PROBE-ERROR ours: ${ours.__error || ours.error}`);
  await browser.close();
  process.exit(1);
}
console.log(
  `ours read:      ${ours.groupCount} groups @${ours.groupGap}px, ${ours.tiles} tiles (active ${ours.activeTileText}), energy "${ours.energyLabel}", closed=${ours.closed}`,
);
if (!ours.closed) {
  console.log("PROBE-ERROR ours: the form did not close via Cancel");
  await browser.close();
  process.exit(1);
}

// ---------- the live-vs-live diff ----------
console.log("--- the member diff (reference vs ours, same round) ---");
for (const m of MEMBERS) {
  const a = ref[m];
  const b = ours[m];
  report(m, a === b, a === b ? `${a}` : `ref ${a} vs ours ${b}`);
}
for (const [m, stops] of Object.entries(GRADIENT_STOPS)) {
  const a = ref[m] || "";
  const b = ours[m] || "";
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
    ? `PARITY-MOODFORM RESULT: ${results.length}/${results.length} members MATCH (both apps, same round)`
    : `PARITY-MOODFORM RESULT: ${bad} DRIFT of ${results.length} members — investigate (one of the two apps moved this round)`,
);
process.exit(bad === 0 ? 0 : 1);
