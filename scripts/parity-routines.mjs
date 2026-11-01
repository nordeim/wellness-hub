// The parity net's EIGHTH SURFACE (WH-42, F-2 — the WH-41 plan's
// suggested-next (c), the "Routines template-card family" candidate):
// the ROUTINE_VIDEO_CARD record family + the seeded-card face — the
// eleven template cards' full computed anatomy (the card chrome, the
// h-2 category strip, the six video zones, the title/chip/description/
// meta/tip/benefits interiors, the Use This Template buttons) + the
// DATA texts as-is (the parity-dashboard doctrine) + the GRID ORDER
// itself (the member that would have caught the round's F-1 drift the
// day the reference re-ordered its catalog).
//
// The two-clocks gap it closes: the WH-24/29/32 censuses pin OUR card
// source forms and the watch's routines surface pins the reference's
// first video card — but the full eleven-card family had never been
// diffed same-round live-vs-live, and the ORDER rode invisible through
// every round since WH-24 (the seeded-content watch byte-pins the
// NAMES; the e2e finds templates by text).
//
//   node scripts/parity-routines.mjs   (our dev server must be up)
//
// PASS A (the reference, ONE login): /Routines at 1280x900 → the
//   member read. PASS B (our dev server, ONE login likewise): the
//   same read. Then the DIFF: every member compared ref-vs-ours.
//
// DECODE PROVENANCE (WH-42, probed live on BOTH apps before this
// script was written — two consecutive same-round reads): every scalar
// member is byte-identical across the two apps or a member of exactly
// THREE KNOWN classes:
//   (1) the lesson-40 gradient stop-triples class (the strip + the
//       Use This Template button: the reference serializes
//       `linear-gradient(to right, rgb(a,b,c), rgb(d,e,f))` vs our
//       v4's `linear-gradient(to right in oklab, rgb(a,b,c) 0%,
//       rgb(d,e,f) 100%)` — the rgb triples are the parity claim);
//   (2) the lesson-40 shadow var-chain zero-layers class (the card's
//       shadow-lg + the button's shadow: the reference's CDN emits two
//       rgba(0,0,0,0) zero-layers before the real pair, our build-time
//       v4 emits four) — compared via the real-layers filter;
//   (3) the ALPHA-BLACK oklab form — the round's NEW class (the
//       lesson-40 color class's ALPHA sibling, the WH-39 oklab
//       alpha-stop form on a backgroundColor): our v4 compiles
//       `bg-black/40` to `oklab(0 0 0 / 0.4)` where the reference's
//       CDN emits `rgba(0, 0, 0, 0.4)` — the member is the (black,
//       alpha) pair, normalized.
// DOM-SHAPE FACTS (decoded, zero rendered-face consequence — the
// lesson-27 same-pixels-different-trees class; NOT cured, documented):
// the reference wraps each card in an anonymous block div inside the
// grid (and the grid in another anonymous block before the max-w-7xl
// container), and wraps the Benefits label + list in a div.mb-4 where
// ours puts them in the card body directly. THE ANCHOR LESSON: the
// card root is the first 12px-radius ancestor of the Use This Template
// button — never "the grid child" (the wrapper defeats it on the
// reference), and the benefits row is the label's NEXT SIBLING's first
// p (the label's parent querySelector matches the label itself on the
// reference's wrapper — the decode's own artifact lesson).
//
// ZERO-WRITE on both apps (login + read only, nothing clicked, nothing
// hovered). Exit 0 when every member matches; exit 1 on any DRIFT or
// PROBE-ERROR — a drift is a FINDING for the round's plan (the
// lesson-41 live-fact class: investigate, never a silent re-base).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const DEV = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

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
const gotoApp = async (page, base, route) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector("main", { timeout: 20000 });
  await page.waitForTimeout(1100);
};

/** One app's full pass: login → /Routines (1280x900) → the read.
 *  The read returns RAW computed strings; every normalization runs in
 *  the diff phase (Node-side), one implementation for both apps. */
const runPass = async (page, base) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login");
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 20000 });
  await page.waitForTimeout(1200);
  await gotoApp(page, base, "/Routines");
  // wait for the grid to render its cards (the img race the watch met)
  await page.waitForSelector('main button:has-text("Use This Template")', { timeout: 20000 });
  await page.waitForTimeout(1200);

  return page.evaluate(() => {
    const cs = (el, props) => {
      const c = getComputedStyle(el);
      return Object.fromEntries(props.map((p) => [p, c[p]]));
    };
    // ANCHOR: the Use This Template buttons; the card root is the
    // first ancestor with borderRadius 12px (rounded-xl — the
    // reference's per-card wrapper defeats a "grid child" walk).
    const btns = Array.from(document.querySelectorAll("main button")).filter((b) =>
      /Use This Template/i.test(b.textContent || ""),
    );
    const cards = btns.map((btn) => {
      let card = btn.parentElement;
      while (card && card !== document.body) {
        if (getComputedStyle(card).borderRadius === "12px") break;
        card = card.parentElement;
      }
      return { btn, card };
    });
    if (cards.length === 0 || !cards[0].card) return { __error: "no template cards" };

    // the grid: climb from the first card to the first grid ancestor
    // (the reference wraps the cards — the card's parent is an
    // anonymous block div there, not the grid).
    let grid = cards[0].card.parentElement;
    while (grid && grid !== document.body && getComputedStyle(grid).display !== "grid") {
      grid = grid.parentElement;
    }
    const gcs = grid ? getComputedStyle(grid) : null;

    // the section heading (Browse Templates + subtitle)
    const h2 = Array.from(document.querySelectorAll("main h2")).find((h) =>
      /Browse Templates/i.test(h.textContent || ""),
    );
    const sub = h2 ? h2.parentElement.querySelector("p") : null;
    const h2cs = h2 ? getComputedStyle(h2) : null;
    const scs = sub ? getComputedStyle(sub) : null;

    const out = {
      landscape: {
        cardCount: cards.length,
        videoCount: 0,
        grid: gcs
          ? { display: gcs.display, cols: gcs.gridTemplateColumns, gap: gcs.columnGap }
          : null,
        h2: h2cs
          ? { fs: h2cs.fontSize, fw: h2cs.fontWeight, color: h2cs.color, mb: h2cs.marginBottom }
          : null,
        sub: scs ? { fs: scs.fontSize, color: scs.color, mb: scs.marginBottom } : null,
        order: [],
      },
      cards: [],
    };

    for (const { btn, card } of cards) {
      if (!card) continue;
      const ccs = getComputedStyle(card);
      // the category strip: the card's first element child (h-2)
      const strip = card.firstElementChild;
      const stcs = strip ? getComputedStyle(strip) : null;
      // the video zone: a 160px-tall child between strip + header
      let zone = null;
      for (const ch of Array.from(card.children)) {
        if (ch === strip) continue;
        if (getComputedStyle(ch).height === "160px") {
          zone = ch;
          break;
        }
      }
      let video = null;
      if (zone) {
        out.landscape.videoCount++;
        const img = zone.querySelector("img");
        const wbtn = Array.from(zone.querySelectorAll("button")).find((b) =>
          /Watch Video/i.test(b.textContent || ""),
        );
        const ov = wbtn ? wbtn.parentElement : null;
        const wicon = wbtn ? wbtn.querySelector("svg") : null;
        const ics = img ? getComputedStyle(img) : null;
        const wcs = wbtn ? getComputedStyle(wbtn) : null;
        const ocs = ov ? getComputedStyle(ov) : null;
        video = {
          zoneH: zone ? getComputedStyle(zone).height : null,
          zoneOverflow: zone ? getComputedStyle(zone).overflow : null,
          imgFit: ics ? ics.objectFit : null,
          imgTransform: ics ? ics.transform : null,
          imgScale: ics ? ics.scale : null,
          overlayOpacity: ocs ? ocs.opacity : null,
          overlayBg: ocs ? ocs.backgroundColor : null,
          overlayPos: ocs ? ocs.position : null,
          overlayInset: ocs ? ocs.inset : null,
          watchBtnH: wcs ? wcs.height : null,
          watchBtnFs: wcs ? wcs.fontSize : null,
          watchBtnBg: wcs ? wcs.backgroundColor : null,
          watchBtnColor: wcs ? wcs.color : null,
          watchBtnRadius: wcs ? wcs.borderRadius : null,
          watchIconSize: wicon ? Math.round(wicon.getBoundingClientRect().width) : null,
          watchIconMr: wicon ? getComputedStyle(wicon).marginRight : null,
        };
      }
      // the title (the bare DIV at font-semibold tracking-tight)
      const title = card.querySelector(".font-semibold.tracking-tight");
      const tcs = title ? getComputedStyle(title) : null;
      out.landscape.order.push(title ? (title.textContent || "").trim() : "?");
      // the difficulty chip (the title row's inline-flex sibling)
      const chip = title
        ? title.parentElement.querySelector("div[class*=inline-flex], span[class*=inline-flex]")
        : null;
      const ccs2 = chip ? getComputedStyle(chip) : null;
      // the description (the p.text-sm under the header)
      const desc = card.querySelector("p.text-sm");
      const dcs = desc ? getComputedStyle(desc) : null;
      // the meta rows (Clock/Calendar — the gap-2 rows above the tip)
      const metaRows = Array.from(card.querySelectorAll("div.flex.items-center.gap-2")).filter(
        (r) => {
          const c = getComputedStyle(r);
          return c.fontSize === "14px" && r.querySelector("svg");
        },
      );
      const meta1 = metaRows[0] || null;
      const meta2 = metaRows[1] || null;
      const m1icon = meta1 ? meta1.querySelector("svg") : null;
      // the Pro Tip tile (the amber-50 bordered tile)
      const tipTile = Array.from(card.querySelectorAll("div")).find((d) => {
        const c = getComputedStyle(d);
        return c.backgroundColor === "rgb(255, 251, 235)" && d.querySelector("p");
      });
      const tipLabel = tipTile ? tipTile.querySelector("p") : null;
      const ttcs = tipTile ? getComputedStyle(tipTile) : null;
      const tlcs = tipLabel ? getComputedStyle(tipLabel) : null;
      // the benefits family — the label's NEXT SIBLING is the list (the
      // reference wraps label+list in a div.mb-4; ours puts them in the
      // body — the label's parent querySelector matches the label
      // itself on the reference, the decode's own artifact lesson)
      const benLabel = Array.from(card.querySelectorAll("p")).find((p) =>
        /^Benefits:?$/.test((p.textContent || "").trim()),
      );
      const benList = benLabel ? benLabel.nextElementSibling : null;
      const benRow = benList ? benList.querySelector("p") : null;
      const check = benRow ? benRow.querySelector("span") : null;
      const blcs = benLabel ? getComputedStyle(benLabel) : null;
      const brcs = benRow ? getComputedStyle(benRow) : null;
      const benTexts = benList
        ? Array.from(benList.children).map((p) => (p.textContent || "").trim())
        : [];
      // the Use This Template button + its arrow
      const arrow = btn.querySelector("svg");
      const bcs = getComputedStyle(btn);

      out.cards.push({
        card: {
          radius: ccs.borderRadius,
          shadow: ccs.boxShadow,
          borderW: ccs.borderWidth,
          borderStyle: ccs.borderStyle,
          borderColor: ccs.borderColor,
          overflow: ccs.overflow,
          bg: ccs.backgroundColor,
          display: ccs.display,
        },
        strip: stcs ? { h: stcs.height, w: stcs.width, bg: stcs.backgroundImage } : null,
        video,
        title: title
          ? {
              tag: title.tagName,
              text: (title.textContent || "").trim(),
              fs: tcs.fontSize,
              fw: tcs.fontWeight,
              tracking: tcs.letterSpacing,
              color: tcs.color,
            }
          : null,
        chip: ccs2
          ? {
              text: (chip.textContent || "").trim(),
              fs: ccs2.fontSize,
              fw: ccs2.fontWeight,
              bg: ccs2.backgroundColor,
              border: ccs2.borderColor,
              radius: ccs2.borderRadius,
            }
          : null,
        desc: desc
          ? { text: (desc.textContent || "").trim(), fs: dcs.fontSize, color: dcs.color }
          : null,
        meta1: meta1
          ? {
              text: (meta1.textContent || "").trim(),
              fs: getComputedStyle(meta1).fontSize,
              color: getComputedStyle(meta1).color,
              iconSize: m1icon ? Math.round(m1icon.getBoundingClientRect().width) : null,
            }
          : null,
        meta2: meta2 ? { text: (meta2.textContent || "").trim() } : null,
        tip: tipTile
          ? {
              label: tipLabel ? (tipLabel.textContent || "").trim() : null,
              labelFs: tlcs ? tlcs.fontSize : null,
              labelColor: tlcs ? tlcs.color : null,
              tileBg: ttcs.backgroundColor,
              tileBorder: ttcs.borderColor,
              tileRadius: ttcs.borderRadius,
              tileP: ttcs.padding,
            }
          : null,
        benefits: benLabel
          ? {
              labelFs: blcs.fontSize,
              labelColor: blcs.color,
              rowFs: brcs ? brcs.fontSize : null,
              rowColor: brcs ? brcs.color : null,
              checkColor: check ? getComputedStyle(check).color : null,
              texts: benTexts,
            }
          : null,
        useBtn: {
          h: bcs.height,
          w: bcs.width,
          fs: bcs.fontSize,
          color: bcs.color,
          bg: bcs.backgroundImage,
          radius: bcs.borderRadius,
          shadow: bcs.boxShadow,
          arrowSize: arrow ? Math.round(arrow.getBoundingClientRect().width) : null,
          arrowMl: arrow ? getComputedStyle(arrow).marginLeft : null,
        },
      });
    }
    return out;
  });
};

// ---------- the normalizers (Node-side) ----------
/** The real-layers shadow filter — the lesson-40 var-chain zero-layers
 *  class (the parity-dashboard precedent, verbatim). */
const realLayers = (s) =>
  String(s || "")
    .split(/,\s*(?=[a-z])/)
    .filter((l) => !/rgba\(\d+, \d+, \d+, 0\)/.test(l))
    .join(", ");

/** The gradient stop-triples normalizer — the lesson-40 color class
 *  (the moodForm/dashboard precedent, verbatim). */
const gradientStops = (s) =>
  String(s || "")
    .match(/rgb\(\d+, \d+, \d+\)/g)
    ?.join(" → ") ?? String(s || "");

/** The ALPHA-BLACK normalizer — the round's NEW class (the lesson-40
 *  color class's ALPHA sibling): our v4 serializes alpha blacks in the
 *  oklab form `oklab(0 0 0 / A)`, the reference's CDN in the rgba form
 *  `rgba(0, 0, 0, A)`. The member is the (black, alpha) pair. */
const alphaBlack = (s) => {
  const t = String(s || "");
  const oklab = t.match(/^oklab\(0 0 0 \/ ([\d.]+)\)$/);
  if (oklab) return `rgba(0, 0, 0, ${oklab[1]})`;
  return t;
};

// ---------- the passes ----------
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

console.log("--- PASS A: the reference (one login) ---");
const ref = await probe(() => runPass(page, REF));
if (ref.__error) {
  console.log(`PROBE-ERROR reference: ${ref.__error}`);
  await browser.close();
  process.exit(1);
}

console.log("--- PASS B: our dev server (one login) ---");
const ours = await probe(() => runPass(page, DEV));
if (ours.__error) {
  console.log(`PROBE-ERROR ours: ${ours.__error}`);
  await browser.close();
  process.exit(1);
}
await browser.close();

// ---------- the live-vs-live diff ----------
console.log("--- the member diff (reference vs ours, same round) ---");
const L = ["cardCount", "videoCount"];
for (const m of L) {
  const av = ref.landscape[m];
  const bv = ours.landscape[m];
  report(`landscape.${m}`, av === bv, av === bv ? `${bv}` : `ref ${av} vs ours ${bv}`);
}
for (const m of ["display", "cols", "gap"]) {
  const av = ref.landscape.grid?.[m];
  const bv = ours.landscape.grid?.[m];
  report(`landscape.grid.${m}`, av === bv, av === bv ? `${av}` : `ref ${av} vs ours ${bv}`);
}
for (const m of ["fs", "fw", "color", "mb"]) {
  const av = ref.landscape.h2?.[m];
  const bv = ours.landscape.h2?.[m];
  report(`landscape.h2.${m}`, av === bv, av === bv ? `${av}` : `ref ${av} vs ours ${bv}`);
}
for (const m of ["fs", "color", "mb"]) {
  const av = ref.landscape.sub?.[m];
  const bv = ours.landscape.sub?.[m];
  report(`landscape.sub.${m}`, av === bv, av === bv ? `${av}` : `ref ${av} vs ours ${bv}`);
}
// THE ORDER MEMBER — the round's F-1 cure's live pin: the rendered
// card SEQUENCE compared positionally (a re-order on either app fires).
{
  const av = ref.landscape.order.join(" | ");
  const bv = ours.landscape.order.join(" | ");
  report(
    "landscape.order",
    av === bv,
    av === bv ? `11 cards in sequence (${bv.split(" | ")[0]} …)` : `ref [${av}] vs ours [${bv}]`,
  );
}

const per = Math.min(ref.cards.length, ours.cards.length);
for (let i = 0; i < per; i++) {
  const a = ref.cards[i];
  const b = ours.cards[i];
  const scalars = [
    ["card.radius", a.card.radius, b.card.radius],
    ["card.borderW", a.card.borderW, b.card.borderW],
    ["card.borderStyle", a.card.borderStyle, b.card.borderStyle],
    ["card.borderColor", a.card.borderColor, b.card.borderColor],
    ["card.overflow", a.card.overflow, b.card.overflow],
    ["card.bg", a.card.bg, b.card.bg],
    ["card.display", a.card.display, b.card.display],
    ["strip.h", a.strip.h, b.strip.h],
    ["strip.w", a.strip.w, b.strip.w],
    ["title.tag", a.title.tag, b.title.tag],
    ["title.text", a.title.text, b.title.text],
    ["title.fs", a.title.fs, b.title.fs],
    ["title.fw", a.title.fw, b.title.fw],
    ["title.tracking", a.title.tracking, b.title.tracking],
    ["title.color", a.title.color, b.title.color],
    ["chip.text", a.chip.text, b.chip.text],
    ["chip.fs", a.chip.fs, b.chip.fs],
    ["chip.fw", a.chip.fw, b.chip.fw],
    ["chip.bg", a.chip.bg, b.chip.bg],
    ["chip.border", a.chip.border, b.chip.border],
    ["chip.radius", a.chip.radius, b.chip.radius],
    ["desc.text", a.desc.text, b.desc.text],
    ["desc.fs", a.desc.fs, b.desc.fs],
    ["desc.color", a.desc.color, b.desc.color],
    ["meta1.text", a.meta1.text, b.meta1.text],
    ["meta1.fs", a.meta1.fs, b.meta1.fs],
    ["meta1.color", a.meta1.color, b.meta1.color],
    ["meta1.iconSize", a.meta1.iconSize, b.meta1.iconSize],
    ["meta2.text", a.meta2?.text ?? null, b.meta2?.text ?? null],
    ["tip.label", a.tip?.label ?? null, b.tip?.label ?? null],
    ["tip.labelFs", a.tip?.labelFs ?? null, b.tip?.labelFs ?? null],
    ["tip.labelColor", a.tip?.labelColor ?? null, b.tip?.labelColor ?? null],
    ["tip.tileBg", a.tip?.tileBg ?? null, b.tip?.tileBg ?? null],
    ["tip.tileBorder", a.tip?.tileBorder ?? null, b.tip?.tileBorder ?? null],
    ["tip.tileRadius", a.tip?.tileRadius ?? null, b.tip?.tileRadius ?? null],
    ["tip.tileP", a.tip?.tileP ?? null, b.tip?.tileP ?? null],
    ["benefits.labelFs", a.benefits.labelFs, b.benefits.labelFs],
    ["benefits.labelColor", a.benefits.labelColor, b.benefits.labelColor],
    ["benefits.rowFs", a.benefits.rowFs, b.benefits.rowFs],
    ["benefits.rowColor", a.benefits.rowColor, b.benefits.rowColor],
    ["benefits.checkColor", a.benefits.checkColor, b.benefits.checkColor],
    [
      "benefits.texts",
      (a.benefits.texts || []).join(" | "),
      (b.benefits.texts || []).join(" | "),
    ],
    ["useBtn.h", a.useBtn.h, b.useBtn.h],
    ["useBtn.w", a.useBtn.w, b.useBtn.w],
    ["useBtn.fs", a.useBtn.fs, b.useBtn.fs],
    ["useBtn.color", a.useBtn.color, b.useBtn.color],
    ["useBtn.radius", a.useBtn.radius, b.useBtn.radius],
    ["useBtn.arrowSize", a.useBtn.arrowSize, b.useBtn.arrowSize],
    ["useBtn.arrowMl", a.useBtn.arrowMl, b.useBtn.arrowMl],
  ];
  for (const [m, av, bv] of scalars) {
    report(`c${i + 1}.${m}`, av === bv, av === bv ? `${av}` : `ref ${av} vs ours ${bv}`);
  }
  // the known-class members (normalized)
  report(
    `c${i + 1}.card.shadowReal`,
    realLayers(a.card.shadow) === realLayers(b.card.shadow),
    realLayers(a.card.shadow) === realLayers(b.card.shadow)
      ? "the real shadow-lg pair"
      : `ref ${realLayers(a.card.shadow)} vs ours ${realLayers(b.card.shadow)}`,
  );
  report(
    `c${i + 1}.strip.stops`,
    gradientStops(a.strip.bg) === gradientStops(b.strip.bg),
    gradientStops(a.strip.bg) === gradientStops(b.strip.bg)
      ? `stops ${gradientStops(a.strip.bg)}`
      : `ref ${gradientStops(a.strip.bg)} vs ours ${gradientStops(b.strip.bg)}`,
  );
  report(
    `c${i + 1}.useBtn.stops`,
    gradientStops(a.useBtn.bg) === gradientStops(b.useBtn.bg),
    gradientStops(a.useBtn.bg) === gradientStops(b.useBtn.bg)
      ? `stops ${gradientStops(a.useBtn.bg)}`
      : `ref ${gradientStops(a.useBtn.bg)} vs ours ${gradientStops(b.useBtn.bg)}`,
  );
  report(
    `c${i + 1}.useBtn.shadowReal`,
    realLayers(a.useBtn.shadow) === realLayers(b.useBtn.shadow),
    realLayers(a.useBtn.shadow) === realLayers(b.useBtn.shadow)
      ? "the real shadow pair"
      : `ref ${realLayers(a.useBtn.shadow)} vs ours ${realLayers(b.useBtn.shadow)}`,
  );
  // the video zone (six cards; the bare five are absence-pinned by
  // videoCount + the null read)
  if (a.video && b.video) {
    for (const m of [
      "zoneH",
      "zoneOverflow",
      "imgFit",
      "imgTransform",
      "imgScale",
      "overlayOpacity",
      "overlayPos",
      "overlayInset",
      "watchBtnH",
      "watchBtnFs",
      "watchBtnBg",
      "watchBtnColor",
      "watchBtnRadius",
      "watchIconSize",
      "watchIconMr",
    ]) {
      const av = a.video[m];
      const bv = b.video[m];
      report(`c${i + 1}.video.${m}`, av === bv, av === bv ? `${av}` : `ref ${av} vs ours ${bv}`);
    }
    // the alpha-black overlay (the NEW third class, normalized)
    const av = alphaBlack(a.video.overlayBg);
    const bv = alphaBlack(b.video.overlayBg);
    report(
      `c${i + 1}.video.overlayBgNorm`,
      av === bv,
      av === bv ? `${av} (normalized)` : `ref ${av} vs ours ${bv}`,
    );
  } else {
    report(
      `c${i + 1}.video.presence`,
      (a.video == null) === (b.video == null),
      a.video == null ? "bare card (the absence pin)" : "video card",
    );
  }
}

const bad = results.filter((r) => !r.ok).length;
console.log(
  `\nPARITY-ROUTINES RESULT: ${results.length - bad}/${results.length} members MATCH (both apps, same round)`,
);
process.exit(bad > 0 ? 1 : 0);
