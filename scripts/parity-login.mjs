// The parity net's SECOND SURFACE (WH-36, F-2 — the WH-35 plan's
// suggested-next (d)): the login family, the app's root face. The
// mood-form surface closed lesson 39's two-clocks gap for ONE family;
// the login family still rides two pin sets that never meet — the
// watch's PASS-1 login probe (the REFERENCE's geometry, 5 members) and
// our (l) e2e leg (OUR five views' computed interior) — each green on
// its own clock, never diffed in the same round. The moodForm parity
// run stayed quiet for two consecutive flights (the WH-35
// born-verification + the WH-36 standing run), so the widening's
// precondition landed.
//
//   node scripts/parity-login.mjs        (our dev server must be up)
//
// PASS A (the reference — ZERO LOGINS: /login is the logged-out face,
//   no session needed, no rate-limit budget spent): goto /login →
//   settle on the h1 → the computed member read.
// PASS B (our dev server — zero logins likewise): the same read.
// Then the DIFF: every member compared ref-vs-ours, 34 members.
//
// ZERO-INTERACTION doctrine (stronger than the moodForm's zero-write):
// this probe performs NO clicks, NO logins, NO writes on EITHER app —
// the surface is the logged-out card at rest; nothing needs opening.
//
// THE SERIALIZATION CLASSES (decoded live at WH-36 before this script
// was written — a naive string diff would false-DRIFT on every one):
//   (a) oklab/rgba — our BUILD-TIME Tailwind v4 emits alpha colors as
//       oklab(...), the reference's CDN runtime compiler emits rgba(...).
//       Cure: the 1x1-canvas composite (fill the computed color over
//       opaque black, read the byte quad) — the readout is identical
//       across serializations because the CANVAS, not the compiler,
//       does the math (byte-verified on both apps: inputBg
//       "124,125,126,255", cardBg "242,242,242,255").
//   (b) gradients — both serializations carry the same rgb() stop
//       triples with different surrounding syntax (percent markers, the
//       "in oklab" colorspace tag). Cure: the stop-triple containment
//       check (the parity-moodform doctrine, verbatim).
//   (c) infinite radius — v4's rounded-full computes
//       calc(infinity * 1px) => "3.35544e+07px" here, the reference's
//       CDN => "9999px". Cure: the is-round normalization (parsed radius
//       >= half the disc's width — at 96px both values are a full
//       circle; the FACT the pixels carry, not the syntax).
//
// Output: a per-member MATCH/DRIFT report + a final line. Exit 0 only
// when every member matches; exit 1 on any DRIFT or PROBE-ERROR (a
// drift is a FINDING for the round's plan — this script compares the
// two live faces, so a drift means one of the two apps moved THIS
// ROUND).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const OURS = "http://localhost:3000";

// The comparable member family — decode-backed (WH-36: 27 scalars
// probed live on BOTH apps before the script was written; the known
// deliberate supersets — our Sprout icon inside the badge vs their
// hosted logo, our toast-on-google-click vs their OAuth redirect, our
// dark-mode vocabulary — are not computed-style members of the resting
// light-mode face and so are naturally out of scope).
const MEMBERS = [
  // the title block
  "h1Text",
  "h1Fs",
  "h1Fw",
  "h1Color",
  "h1W",
  "subText",
  "subFs",
  "subColor",
  // the email input (the reference's own watch-ledger members + kin)
  "inputH",
  "inputW",
  "inputR",
  "inputBorder",
  // the primary submit
  "submitText",
  "submitH",
  "submitR",
  "submitBg",
  "submitColor",
  // the card shell
  "cardW",
  "cardR",
  "accentH",
  // the google button (the face, not the click behavior)
  "googleText",
  "googleH",
  "googleR",
  "googleBorder",
  "googleColor",
  "googleBg",
  // the divider
  "dividerLineBg",
  // the canvas-normalized alpha colors (class (a))
  "inputBgNorm",
  "cardBgNorm",
  // the logo disc's normalized geometry (class (c))
  "logoDiscW",
  "logoDiscRound",
];
// Gradient members compare their rgb STOP TRIPLES, not the full
// property string (class (b) — the platform serialization differs; the
// stops are the parity claim, the parity-moodform doctrine).
const GRADIENT_STOPS = {
  shellBg: ["248, 250, 252", "241, 245, 249"], // slate-50 -> slate-100
  accentBg: ["226, 232, 240", "203, 213, 225"], // slate-200 -> slate-300 (-> 200)
  logoDiscBg: ["226, 232, 240", "203, 213, 225"], // slate-200 -> slate-300
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

/** SPA-safe navigation — the watch's gotoApp form, verbatim: land,
 * wait for the route-content marker (the login card's h1 — the
 * reference's login page carries no <main>), then settle. */
const gotoApp = async (page, base, route, { sel = "h1", settleMs = 900 } = {}) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector(sel, { timeout: 15000 });
  await page.waitForTimeout(settleMs);
};

/** The login-face computed read — ONE evaluate, the SAME payload for
 * both apps. Every locator is face-identical across them
 * (decode-verified at WH-36): the h1 / input[type=email] /
 * button[type=submit] direct selectors; the card via the shadow-2xl
 * walk from the email input; the logo disc via the first
 * gradient-bearing element 40..200px wide inside the card (the
 * glow/badge family — structurally consistent on both apps); the
 * accent via the card's absolutely-positioned <=8px child; the google
 * button via its text; the divider line via the "or" label walk; the
 * shell via the gradient-bearing ancestor walk. */
const readLoginFace = async (page) =>
  page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const input = document.querySelector("input[type=email]");
    const submit = document.querySelector("button[type=submit]");
    if (!h1 || !input || !submit) return { error: "login card incomplete (no h1/email/submit)" };
    // the card: walk up from the email input to the shadow-2xl surface
    let card = input;
    while (card && card !== document.body) {
      if ((card.getAttribute("class") || "").includes("shadow-2xl")) break;
      card = card.parentElement;
    }
    if (!card || card === document.body) return { error: "no shadow-2xl card" };
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const h1s = cs(h1);
    const is = cs(input);
    const ss = cs(submit);
    const cards = cs(card);
    const hr = h1.getBoundingClientRect();
    const ir = input.getBoundingClientRect();
    const sr = submit.getBoundingClientRect();
    const cr = card.getBoundingClientRect();
    // the logo disc: the first gradient-bearing element 40..200px wide
    // inside the card (the glow/badge family — both apps render the
    // glow before the badge, so the first match reads the same
    // structural position on both)
    const disc = Array.from(card.querySelectorAll("*")).find((el) => {
      const s = cs(el);
      return (s.backgroundImage || "").includes("gradient") && el.getBoundingClientRect().width >= 40 && el.getBoundingClientRect().width <= 200;
    });
    const ds = cs(disc);
    const dr = disc ? disc.getBoundingClientRect() : null;
    // the accent bar: the card's absolutely-positioned <=8px child
    const accent = Array.from(card.children).find(
      (c) => cs(c).position === "absolute" && c.getBoundingClientRect().height <= 8,
    );
    const as = cs(accent);
    // the google button (the face; never clicked)
    const google = Array.from(document.querySelectorAll("button")).find((b) => /google/i.test(b.textContent || ""));
    const gs = cs(google);
    const gr = google ? google.getBoundingClientRect() : null;
    // the divider line: the 1px line inside the "or" label's walk-up
    const orLabel = Array.from(document.querySelectorAll("span")).find((s) => s.textContent.trim() === "or");
    let dividerLine = null;
    if (orLabel) {
      let walk = orLabel.parentElement;
      while (walk && walk !== document.body) {
        const line = Array.from(walk.querySelectorAll("div")).find(
          (d) => Math.round(d.getBoundingClientRect().height) === 1 && (cs(d).backgroundColor || "").includes("rgb"),
        );
        if (line) {
          dividerLine = line;
          break;
        }
        walk = walk.parentElement;
      }
    }
    const dls = cs(dividerLine);
    // the page shell: the gradient-bearing ancestor of the card
    let shell = card.parentElement;
    while (shell && shell !== document.body) {
      if ((cs(shell).backgroundImage || "").includes("gradient")) break;
      shell = shell.parentElement;
    }
    const shs = cs(shell);
    // the subtitle: the p beside the h1
    const subtitle = h1.parentElement.querySelector("p");
    const subs = cs(subtitle);
    // the canvas composite — class (a) normalization: the byte quad of
    // the computed color filled over opaque black. Identical across
    // oklab/rgba serializations because the canvas does the math.
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
    // class (c) normalization: is the disc ROUND? (parsed radius >=
    // half the width — v4's calc(infinity) and the CDN's 9999px both
    // read true at 96px; the rendered fact, not the syntax)
    const discRound = ds && dr ? parseFloat(ds.borderRadius) >= dr.width / 2 : null;
    return {
      h1Text: h1.textContent.trim(),
      h1Fs: h1s.fontSize,
      h1Fw: h1s.fontWeight,
      h1Color: h1s.color,
      h1W: Math.round(hr.width),
      subText: subtitle?.textContent.trim() ?? null,
      subFs: subs?.fontSize ?? null,
      subColor: subs?.color ?? null,
      inputH: Math.round(ir.height),
      inputW: Math.round(ir.width),
      inputR: is.borderRadius,
      inputBorder: is.borderTopColor,
      inputBgNorm: norm(is.backgroundColor),
      submitText: submit.textContent.trim(),
      submitH: Math.round(sr.height),
      submitR: ss.borderRadius,
      submitBg: ss.backgroundColor,
      submitColor: ss.color,
      cardW: Math.round(cr.width),
      cardR: cards.borderRadius,
      cardBgNorm: norm(cards.backgroundColor),
      accentH: accent ? Math.round(accent.getBoundingClientRect().height) : null,
      accentBg: as ? as.backgroundImage : null,
      googleText: google ? google.textContent.replace(/\s+/g, " ").trim() : null,
      googleH: gr ? Math.round(gr.height) : null,
      googleR: gs?.borderRadius ?? null,
      googleBorder: gs?.borderTopColor ?? null,
      googleColor: gs?.color ?? null,
      googleBg: gs?.backgroundColor ?? null,
      dividerLineBg: dls?.backgroundColor ?? null,
      shellBg: shs ? shs.backgroundImage : null,
      logoDiscW: dr ? Math.round(dr.width) : null,
      logoDiscRound: discRound,
      logoDiscBg: ds ? ds.backgroundImage : null,
    };
  });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

console.log("--- PASS A: the reference (zero logins — the logged-out face) ---");
const ref = await probe(() => gotoApp(page, REF, "/login").then(() => readLoginFace(page)));
if (ref.__error || ref.error) {
  console.log(`PROBE-ERROR reference: ${ref.__error || ref.error}`);
  await browser.close();
  process.exit(1);
}
console.log(`reference read: h1 "${ref.h1Text}" ${ref.h1Fs}/${ref.h1Fw}, card ${ref.cardW}x? r${ref.cardR}, inputs ${ref.inputH}x${ref.inputW} r${ref.inputR}, submit ${ref.submitH}px`);

console.log("--- PASS B: our dev server (zero logins) ---");
const ours = await probe(() => gotoApp(page, OURS, "/login").then(() => readLoginFace(page)));
if (ours.__error || ours.error) {
  console.log(`PROBE-ERROR ours: ${ours.__error || ours.error}`);
  await browser.close();
  process.exit(1);
}
console.log(`ours read:      h1 "${ours.h1Text}" ${ours.h1Fs}/${ours.h1Fw}, card ${ours.cardW}x? r${ours.cardR}, inputs ${ours.inputH}x${ours.inputW} r${ours.inputR}, submit ${ours.submitH}px`);

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
    ? `PARITY-LOGIN RESULT: ${results.length}/${results.length} members MATCH (both apps, same round)`
    : `PARITY-LOGIN RESULT: ${bad} DRIFT of ${results.length} members — investigate (one of the two apps moved this round)`,
);
process.exit(bad === 0 ? 0 : 1);
