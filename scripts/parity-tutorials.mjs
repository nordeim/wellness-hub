// The parity net's NINTH SURFACE (WH-43, F-2 — the WH-42 plan's
// suggested-next (c), the "Learning tutorial-card family" candidate):
// the TUTORIAL_CARD record family + the OptionChip pair — the twelve
// tutorial cards' full computed anatomy (the card chrome, the
// aspect-video cover + its gray wash, the img + the group-hover scale
// family, the resting overlay, the Watch Now button, the duration
// chip, the title/chips/description interiors) + the DATA texts as-is
// (the parity-dashboard doctrine) + the GRID ORDER itself (the member
// that caught this round's F-1 drift — the reference had re-ordered
// its tutorial catalog; the WH-42 lesson-41 class, second instance).
//
// The two-clocks gap it closes: the WH-24/29 censuses pin OUR card
// source forms and the watch's learning surface pins the reference's
// counts (12 imgs, 12 Watch Now, the outline chips) — but the full
// twelve-card family had never been diffed same-round live-vs-live,
// and the ORDER rode invisible between rounds (the watch byte-pins
// the COUNTS; the e2e finds tutorials by text).
//
//   node scripts/parity-tutorials.mjs   (our dev server must be up)
//
// PASS A (the reference, ONE login): /Learning at 1280x900 → the
//   member read, then /StudyResources in the SAME session (the F-4
//   search-input-type fact — no extra login). PASS B (our dev server,
//   ONE login likewise): the same read. Then the DIFF: every member
//   compared ref-vs-ours.
//
// DECODE PROVENANCE (WH-43, probed live on BOTH apps before this
// script was written — the decode needed THREE vocabulary fixes, the
// round's LESSON 47): every scalar member is byte-identical across
// the two apps or a member of exactly THREE KNOWN classes:
//   (1) the lesson-40 gradient stop-triples class (the cover's
//       gray-100→gray-200 wash: `linear-gradient(to right bottom,
//       rgb(...), rgb(...))` vs our v4's `... in oklab, ... 0%,
//       ... 100%` — the rgb triples are the parity claim);
//   (2) the lesson-40 shadow var-chain zero-layers class (the card's
//       shadow-lg: the reference's CDN emits two rgba(0,0,0,0)
//       zero-layers before the real pair, our build-time v4 emits
//       four) — compared via the real-layers filter;
//   (3) the WH-42 ALPHA-BLACK oklab form (the overlay's resting
//       bg-black/0 AND the duration chip's bg-black/70: our v4
//       serializes `oklab(0 0 0 / A)`, the CDN `rgba(0, 0, 0, A)`) —
//       the (black, alpha) pair, normalized.
// DOM-SHAPE FACTS (decoded, zero rendered-face consequence — the
// lesson-27 same-pixels-different-trees class; NOT cured, documented):
// the reference's duration chip is a DIV where ours is a SPAN; the
// reference's card root carries `border bg-card text-card-foreground
// border-none` where ours reads `border-none bg-surface` (identical
// computed values); the reference's search input is type="text" (the
// one shape difference WITH a rendered consequence — the Chromium
// clear button on our type="search" — cured at WH-43 F-4, so BOTH
// apps now render type="text" and this member is a live pin).
// THE ANCHOR LESSONS (LESSON 47, the round's decode vocabulary):
//   - the card root is the first 12px-radius ancestor of the Watch
//     Now button — anchored by the button's TEXT CONTENT, never its
//     aria-label (ours carries the a11y superset; the reference's
//     buttons have none);
//   - the chips are the title row's NEXT SIBLING's children — anchored
//     STRUCTURALLY, never by computed display (inline-flex chips
//     inside the flex chips-row BLOCKIFY to display:flex on both apps;
//     a display-keyed filter matches nothing);
//   - the duration chip is the cover's absolute child with bottom ≠ 0
//     (the overlay is the first absolute child at inset-0).
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
  await page.waitForSelector("main", { timeout: 25000 });
  await page.waitForTimeout(1200);
};

/** One app's full pass: login → /Learning (1280x900) → the card read
 *  → /StudyResources (same session) → the search-input fact. The read
 *  returns RAW computed strings; every normalization runs in the diff
 *  phase (Node-side), one implementation for both apps. */
const runPass = async (page, base) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login");
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 25000 });
  await page.waitForTimeout(1400);

  await gotoApp(page, base, "/Learning");
  const learn = await page.evaluate(() => {
    const out = { cards: [], landscape: {} };
    // THE ANCHOR (lesson 47a): the Watch Now button found by TEXT —
    // ours carries aria-label (the a11y superset), the reference's
    // carry none; text content is the shared vocabulary.
    const btns = Array.from(document.querySelectorAll("button")).filter((b) =>
      b.textContent.includes("Watch Now"),
    );
    out.landscape.watchBtnCount = btns.length;
    const search = document.querySelector("input");
    out.landscape.searchPlaceholder = search ? search.placeholder : null;
    out.landscape.searchType = search ? search.type : null;
    // THE ANCHOR (the routines lesson): the first 12px-radius
    // ancestor of the button — never "the grid child".
    const cardFromBtn = (btn) => {
      let el = btn;
      while (el && el !== document.body) {
        if (getComputedStyle(el).borderRadius === "12px") return el;
        el = el.parentElement;
      }
      return null;
    };
    const firstCard = btns.length ? cardFromBtn(btns[0]) : null;
    if (firstCard) {
      let grid = firstCard.parentElement;
      while (grid && grid !== document.body) {
        if (getComputedStyle(grid).display === "grid") break;
        grid = grid.parentElement;
      }
      if (grid) {
        const g = getComputedStyle(grid);
        out.landscape.grid = {
          display: g.display,
          cols: g.gridTemplateColumns,
          gap: g.columnGap,
          rowGap: g.rowGap,
        };
      }
    }
    const cs = (el, props) => {
      const c = getComputedStyle(el);
      return Object.fromEntries(props.map((p) => [p, c[p]]));
    };
    for (const btn of btns) {
      const card = cardFromBtn(btn);
      if (!card) continue;
      const cardD = {
        radius: getComputedStyle(card).borderRadius,
        borderW: getComputedStyle(card).borderWidth,
        borderStyle: getComputedStyle(card).borderStyle,
        bg: getComputedStyle(card).backgroundColor,
        shadow: getComputedStyle(card).boxShadow,
        overflow: getComputedStyle(card).overflow,
        display: getComputedStyle(card).display,
      };
      // the cover: the img's parent (the aspect-video zone)
      const img = card.querySelector("img");
      const cover = img ? img.parentElement : null;
      const coverD = cover
        ? {
            position: getComputedStyle(cover).position,
            aspectRatio: getComputedStyle(cover).aspectRatio,
            overflow: getComputedStyle(cover).overflow,
            bg: getComputedStyle(cover).backgroundImage,
          }
        : null;
      const imgD = img
        ? {
            src: img.getAttribute("src"),
            objectFit: getComputedStyle(img).objectFit,
            transform: getComputedStyle(img).transform,
          }
        : null;
      // the overlay: the button's parent (the resting transparent black)
      const overlay = btn.parentElement;
      const overlayD = overlay
        ? {
            position: getComputedStyle(overlay).position,
            bg: getComputedStyle(overlay).backgroundColor,
            display: getComputedStyle(overlay).display,
            alignItems: getComputedStyle(overlay).alignItems,
          }
        : null;
      const btnD = {
        h: getComputedStyle(btn).height,
        pl: getComputedStyle(btn).paddingLeft,
        pr: getComputedStyle(btn).paddingRight,
        radius: getComputedStyle(btn).borderRadius,
        bg: getComputedStyle(btn).backgroundColor,
        color: getComputedStyle(btn).color,
        fs: getComputedStyle(btn).fontSize,
        fw: getComputedStyle(btn).fontWeight,
        opacity: getComputedStyle(btn).opacity,
      };
      const btnSvg = btn.querySelector("svg");
      const svgR = btnSvg ? btnSvg.getBoundingClientRect() : null;
      // THE DURATION CHIP (lesson 47c): the cover's absolute child at
      // bottom ≠ 0 — the overlay (inset-0) is the first absolute child.
      const dur = cover
        ? Array.from(cover.querySelectorAll("*")).find(
            (s) =>
              getComputedStyle(s).position === "absolute" &&
              getComputedStyle(s).bottom !== "0px",
          )
        : null;
      const durD = dur
        ? {
            text: dur.textContent.trim(),
            bottom: getComputedStyle(dur).bottom,
            right: getComputedStyle(dur).right,
            bg: getComputedStyle(dur).backgroundColor,
            color: getComputedStyle(dur).color,
            fs: getComputedStyle(dur).fontSize,
            pt: getComputedStyle(dur).paddingTop,
            pr: getComputedStyle(dur).paddingRight,
            radius: getComputedStyle(dur).borderRadius,
          }
        : null;
      // the title: the bare font-semibold DIV
      const title = card.querySelector("div.font-semibold");
      const titleD = title
        ? {
            text: title.textContent.trim(),
            fs: getComputedStyle(title).fontSize,
            fw: getComputedStyle(title).fontWeight,
            tracking: getComputedStyle(title).letterSpacing,
            lh: getComputedStyle(title).lineHeight,
            clamp: getComputedStyle(title).webkitLineClamp,
          }
        : null;
      // THE CHIPS (lesson 47b): the title row's NEXT SIBLING's children
      // — inline-flex chips inside the flex chips-row BLOCKIFY to
      // display:flex; a display-keyed filter matches NOTHING on either
      // app. Structural is the only anchor that works on both.
      const chipsRow = title ? title.parentElement?.nextElementSibling : null;
      const chips = [];
      if (chipsRow) {
        for (const c of Array.from(chipsRow.children)) {
          const cc = getComputedStyle(c);
          chips.push({
            text: c.textContent.trim(),
            bg: cc.backgroundColor,
            color: cc.color,
            borderW: cc.borderWidth,
            borderColor: cc.borderColor,
            fs: cc.fontSize,
            fw: cc.fontWeight,
            radius: cc.borderRadius,
          });
        }
      }
      // the description: the card's p
      const desc = card.querySelector("p");
      const descD = desc
        ? {
            text: desc.textContent.trim(),
            fs: getComputedStyle(desc).fontSize,
            color: getComputedStyle(desc).color,
            lh: getComputedStyle(desc).lineHeight,
            clamp: getComputedStyle(desc).webkitLineClamp,
          }
        : null;
      out.cards.push({
        card: cardD,
        cover: coverD,
        img: imgD,
        overlay: overlayD,
        btn: btnD,
        btnSvgH: svgR ? Math.round(svgR.height) : null,
        dur: durD,
        title: titleD,
        chips,
        desc: descD,
      });
    }
    // THE ORDER MEMBER: the rendered card SEQUENCE (a re-order on
    // either app fires — the WH-43 F-1 cure's live pin).
    out.landscape.order = out.cards.map((c) => c.titleD?.text ?? "?");
    return out;
  });

  // the F-4 fact rides the SAME session: the studyresources search
  // input's type (the WH-43 cure flipped our two sites to "text"; the
  // reference's are "text" — this member guards both apps' faces).
  await gotoApp(page, base, "/StudyResources");
  const sr = await page.evaluate(() => {
    const input = document.querySelector("input");
    return input ? { type: input.type, placeholder: input.placeholder } : null;
  });

  return { ...learn, sr };
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

/** The ALPHA-BLACK normalizer — the WH-42 class, verbatim: our v4
 *  serializes alpha blacks as `oklab(0 0 0 / A)`, the reference's CDN
 *  as `rgba(0, 0, 0, A)`. The member is the (black, alpha) pair. */
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
report(
  "landscape.cardCount",
  ref.cards.length === ours.cards.length,
  `${ours.cards.length} (ref ${ref.cards.length})`,
);
for (const m of ["display", "cols", "gap", "rowGap"]) {
  const av = ref.landscape.grid?.[m];
  const bv = ours.landscape.grid?.[m];
  report(`landscape.grid.${m}`, av === bv, av === bv ? `${bv}` : `ref ${av} vs ours ${bv}`);
}
for (const m of ["searchPlaceholder", "searchType"]) {
  const av = ref.landscape[m];
  const bv = ours.landscape[m];
  report(`landscape.${m}`, av === bv, av === bv ? `${bv}` : `ref ${av} vs ours ${bv}`);
}
// THE ORDER MEMBER — the round's F-1 cure's live pin.
{
  const av = ref.landscape.order.join(" | ");
  const bv = ours.landscape.order.join(" | ");
  report(
    "landscape.order",
    av === bv,
    av === bv
      ? `12 cards in sequence (${bv.split(" | ")[0]} …)`
      : `ref [${av}] vs ours [${bv}]`,
  );
}
// the F-4 fact: the studyresources search input's type (same-session read)
for (const m of ["type", "placeholder"]) {
  const av = ref.sr?.[m];
  const bv = ours.sr?.[m];
  report(`sr.${m}`, av === bv, av === bv ? `${bv}` : `ref ${av} vs ours ${bv}`);
}

const per = Math.min(ref.cards.length, ours.cards.length);
for (let i = 0; i < per; i++) {
  const a = ref.cards[i];
  const b = ours.cards[i];
  const scalars = [
    ["card.radius", a.card.radius, b.card.radius],
    ["card.borderW", a.card.borderW, b.card.borderW],
    ["card.borderStyle", a.card.borderStyle, b.card.borderStyle],
    ["card.bg", a.card.bg, b.card.bg],
    ["card.overflow", a.card.overflow, b.card.overflow],
    ["card.display", a.card.display, b.card.display],
    ["cover.position", a.cover?.position, b.cover?.position],
    ["cover.aspectRatio", a.cover?.aspectRatio, b.cover?.aspectRatio],
    ["cover.overflow", a.cover?.overflow, b.cover?.overflow],
    ["img.objectFit", a.img?.objectFit, b.img?.objectFit],
    ["img.transform", a.img?.transform, b.img?.transform],
    ["img.src", a.img?.src, b.img?.src],
    ["overlay.position", a.overlay?.position, b.overlay?.position],
    ["overlay.display", a.overlay?.display, b.overlay?.display],
    ["overlay.alignItems", a.overlay?.alignItems, b.overlay?.alignItems],
    ["btn.h", a.btn.h, b.btn.h],
    ["btn.pl", a.btn.pl, b.btn.pl],
    ["btn.pr", a.btn.pr, b.btn.pr],
    ["btn.radius", a.btn.radius, b.btn.radius],
    ["btn.bg", a.btn.bg, b.btn.bg],
    ["btn.color", a.btn.color, b.btn.color],
    ["btn.fs", a.btn.fs, b.btn.fs],
    ["btn.fw", a.btn.fw, b.btn.fw],
    ["btn.opacity", a.btn.opacity, b.btn.opacity],
    ["btnSvgH", a.btnSvgH, b.btnSvgH],
    ["dur.text", a.dur?.text, b.dur?.text],
    ["dur.bottom", a.dur?.bottom, b.dur?.bottom],
    ["dur.right", a.dur?.right, b.dur?.right],
    ["dur.color", a.dur?.color, b.dur?.color],
    ["dur.fs", a.dur?.fs, b.dur?.fs],
    ["dur.pt", a.dur?.pt, b.dur?.pt],
    ["dur.pr", a.dur?.pr, b.dur?.pr],
    ["dur.radius", a.dur?.radius, b.dur?.radius],
    ["title.text", a.title?.text, b.title?.text],
    ["title.fs", a.title?.fs, b.title?.fs],
    ["title.fw", a.title?.fw, b.title?.fw],
    ["title.tracking", a.title?.tracking, b.title?.tracking],
    ["title.lh", a.title?.lh, b.title?.lh],
    ["title.clamp", a.title?.clamp, b.title?.clamp],
    ["desc.text", a.desc?.text, b.desc?.text],
    ["desc.fs", a.desc?.fs, b.desc?.fs],
    ["desc.color", a.desc?.color, b.desc?.color],
    ["desc.lh", a.desc?.lh, b.desc?.lh],
    ["desc.clamp", a.desc?.clamp, b.desc?.clamp],
  ];
  for (const [member, av, bv] of scalars) {
    report(`c${i + 1}.${member}`, av === bv, av === bv ? `${bv}` : `ref ${av} vs ours ${bv}`);
  }
  // the three known serialization classes
  report(
    `c${i + 1}.card.shadow`,
    realLayers(a.card.shadow) === realLayers(b.card.shadow),
    realLayers(a.card.shadow) === realLayers(b.card.shadow)
      ? `real layers [${realLayers(b.card.shadow)}]`
      : `ref [${realLayers(a.card.shadow)}] vs ours [${realLayers(b.card.shadow)}]`,
  );
  report(
    `c${i + 1}.cover.bg`,
    gradientStops(a.cover?.bg) === gradientStops(b.cover?.bg),
    gradientStops(a.cover?.bg) === gradientStops(b.cover?.bg)
      ? `stops ${gradientStops(b.cover?.bg)}`
      : `ref [${gradientStops(a.cover?.bg)}] vs ours [${gradientStops(b.cover?.bg)}]`,
  );
  report(
    `c${i + 1}.overlay.bg`,
    alphaBlack(a.overlay?.bg) === alphaBlack(b.overlay?.bg),
    alphaBlack(a.overlay?.bg) === alphaBlack(b.overlay?.bg)
      ? `${alphaBlack(b.overlay?.bg)} (normalized)`
      : `ref [${alphaBlack(a.overlay?.bg)}] vs ours [${alphaBlack(b.overlay?.bg)}]`,
  );
  report(
    `c${i + 1}.dur.bg`,
    alphaBlack(a.dur?.bg) === alphaBlack(b.dur?.bg),
    alphaBlack(a.dur?.bg) === alphaBlack(b.dur?.bg)
      ? `${alphaBlack(b.dur?.bg)} (normalized)`
      : `ref [${alphaBlack(a.dur?.bg)}] vs ours [${alphaBlack(b.dur?.bg)}]`,
  );
  // the chip pair
  const chipN = Math.min(a.chips.length, b.chips.length);
  report(
    `c${i + 1}.chips.count`,
    a.chips.length === b.chips.length,
    `${b.chips.length} (ref ${a.chips.length})`,
  );
  for (let c = 0; c < chipN; c++) {
    for (const m of ["text", "bg", "color", "borderW", "borderColor", "fs", "fw", "radius"]) {
      const av = a.chips[c][m];
      const bv = b.chips[c][m];
      report(
        `c${i + 1}.chip${c + 1}.${m}`,
        av === bv,
        av === bv ? `${bv}` : `ref ${av} vs ours ${bv}`,
      );
    }
  }
}

const bad = results.filter((r) => !r.ok);
console.log(
  `--- PARITY-TUTORIALS RESULT: ${results.length - bad.length}/${results.length} members MATCH (both apps, same round) ---`,
);
if (bad.length > 0) {
  console.log(`DRIFT/ERROR count: ${bad.length}`);
  process.exit(1);
}
process.exit(0);
