// The parity net's FIFTH SURFACE (WH-39, F-2 — the WH-38 plan's
// suggested-next (c), the "module page headers" candidate): the
// PAGE_THEMES identity family — the per-module page header + the
// page-root wash + the container + the header activator pair, across
// ALL TEN non-dashboard pages (the dashboard's own header is owned by
// parity-dashboard's 9 header members — the family surface leaves it
// there, no duplicate members).
//
// The two-clocks gap it closes: the watch's per-surface digests pin
// the reference's H1 TEXT/font-size per page against its ledger, but
// the headers' computed CHROME (the H1 gradient stops, the subtitle
// geometry, the page-root WASH, the container width, the activator
// button pair) had never been diffed same-round live-vs-live as a
// FAMILY. This surface is data-independent end to end (titles,
// subtitles, washes and buttons render regardless of row state) —
// the shell-surface class.
//
//   node scripts/parity-headers.mjs     (our dev server must be up)
//
// PASS A (the reference, ONE login): the 10 pages at 1280x900 → the
//   member read. PASS B (our dev server, ONE login likewise): the same
//   read. Then the DIFF: every member compared ref-vs-ours.
//
// DECODE PROVENANCE (WH-39, probed live on BOTH apps before this
// script was written): every scalar member is either byte-identical
// across the two apps or a member of exactly three known classes —
//   (1) the lesson-40 stop-triple class on the OPAQUE gradients (the
//       h1Bg + the activator btnBg: same rgb stop-triples, the v4
//       `in oklab`-syntax wrapper vs the CDN's bare form) — compared
//       via the stopsOf precedent (the rgb stop-triples);
//   (2) the oklab ALPHA-stop class (NEW, lesson 43): the page-root
//       washes' third stop (`to-X-50/30`) computes as
//       `oklab(L a b / 0.3)` on our v4 build vs the reference's
//       `rgba(r, g, b, 0.3)`; the 6-decimal oklab re-converts to sRGB
//       with a sub-byte channel drift (±3/255 on one channel before
//       alpha), which shifts the canvas gradient dither phase —
//       quantified live at WH-39 on all 10 washes: maxDelta 1/255 on
//       0.21%–1.44% of composited bytes (the same-string control
//       reads BYTE-EQUAL — the machinery is deterministic). Compared
//       as: the first TWO stops' exact triples (opaque on both apps)
//       + the stop COUNT + the composited wash under the documented
//       tolerance (maxDelta ≤ 1 AND ≤ 2% of bytes) — the pixel-
//       quantify precedent's own sub-visible threshold;
//   (3) the margin-collapse pair (NEW, lesson 43): our subtitle
//       carries `mt-1` (computed marginTop 4px) where the reference's
//       carries none (0px), but the h1's `mb-2` (8px, byte-identical
//       both sides) collapses over it — the RENDERED gap is 8px on
//       both apps. Compared as the bounding-box gap
//       (subRect.top − h1Rect.bottom), never the serialized margin.
// One PROBE ARTIFACT cured in the design: a generic button walk
// over-climbs on the stacked pages (the reference's stacked header
// nests one level shallower than ours — the decode caught its
// "All Categories" filter trigger on Learning and its "Appearance"
// tab trigger on Profile). The activator is read ONLY on the seven
// action pages (the `PAGE_THEMES.stacked` fact, pinned by the
// page-theme census), anchored as the container's FIRST visible
// button in DOM order — the header renders before the toolbars.
//
// ZERO-WRITE on both apps (login + read only, nothing clicked).
// Exit 0 when every member matches; exit 1 on any DRIFT or
// PROBE-ERROR — a drift is a FINDING for the round's plan (the
// lesson-41 live-fact class: investigate, never a silent re-base).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const DEV = "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

// The ten non-dashboard pages. hasBtn = the PAGE_THEMES.stacked fact
// (false = an action page with a header activator).
const PAGES = [
  { key: "routines", route: "/Routines", hasBtn: false },
  { key: "exercise", route: "/Exercise", hasBtn: true },
  { key: "mentalhealth", route: "/MentalHealth", hasBtn: true },
  { key: "assignments", route: "/Assignments", hasBtn: true },
  { key: "events", route: "/Events", hasBtn: true },
  { key: "studyresources", route: "/StudyResources", hasBtn: true },
  { key: "reminders", route: "/Reminders", hasBtn: true },
  { key: "learning", route: "/Learning", hasBtn: false },
  { key: "goals", route: "/Goals", hasBtn: true },
  { key: "profile", route: "/Profile", hasBtn: false },
];

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

/** One app's full pass: login → the 10 pages (1280x900) → the read.
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

  const out = {};
  for (const p of PAGES) {
    await gotoApp(page, base, p.route);
    out[p.key] = await page.evaluate((hasBtn) => {
      const vis = (el) => el && el.offsetParent !== null;
      const h1 = Array.from(document.querySelectorAll("h1")).find(vis);
      if (!h1) return { error: "no visible h1" };
      const hcs = getComputedStyle(h1);
      // the subtitle: the h1's first text-bearing button-free sibling
      // (the parity-dashboard anchor — proven on both apps)
      let sub = null;
      for (const c of h1.parentElement.children) {
        if (c !== h1 && c.textContent.trim() && !c.querySelector("button")) {
          sub = c;
          break;
        }
      }
      const scs = sub ? getComputedStyle(sub) : null;
      // the container: walk up from the h1's block until maxWidth is
      // set (the PAGE_THEMES.container — decode-proven on both apps)
      let cont = h1.parentElement;
      let guard = 0;
      while (cont && cont !== document.body && guard < 12) {
        if (getComputedStyle(cont).maxWidth !== "none") break;
        cont = cont.parentElement;
        guard++;
      }
      const ccs = cont ? getComputedStyle(cont) : null;
      // the page-root wash: the container's parent
      const root = cont ? cont.parentElement : null;
      const rcs = root ? getComputedStyle(root) : null;
      // the rendered subtitle gap (the margin-collapse class's member):
      // bounding boxes, never the serialized margin
      let subGap = null;
      if (sub) {
        const hr = h1.getBoundingClientRect();
        const sr = sub.getBoundingClientRect();
        subGap = Math.round((sr.top - hr.bottom) * 10) / 10;
      }
      // the header activator: the container's FIRST visible button in
      // DOM order (the header renders before the toolbars) — read ONLY
      // on the seven action pages (the stacked pages carry no header
      // actions on either app; the decode's over-climb artifact cured)
      let btn = null;
      if (hasBtn) {
        const cand = Array.from(cont.querySelectorAll("button")).find(vis);
        if (cand) {
          const bcs = getComputedStyle(cand);
          btn = {
            text: cand.textContent.trim().slice(0, 30),
            bg: bcs.backgroundImage,
            color: bcs.color,
            h: bcs.height,
            r: bcs.borderTopLeftRadius,
            fw: bcs.fontWeight,
          };
        }
      }
      return {
        h1Text: h1.textContent.trim(),
        h1Fs: hcs.fontSize,
        h1Fw: hcs.fontWeight,
        h1Bg: hcs.backgroundImage,
        h1Mb: hcs.marginBottom,
        subText: sub ? sub.textContent.trim() : null,
        subFs: scs ? scs.fontSize : null,
        subColor: scs ? scs.color : null,
        subGap,
        washBg: rcs ? rcs.backgroundImage : null,
        rootMinH: rcs ? rcs.minHeight : null,
        contMaxW: ccs ? ccs.maxWidth : null,
        contW: cont ? getComputedStyle(cont).width : null,
        btn,
      };
    }, p.hasBtn);
  }
  return out;
};

// ---------- the normalizers (Node-side) ----------
/** The gradient stop-TRIPLES — the lesson-40 rendered fact (the
 *  parity-dashboard precedent, verbatim). */
const stopsOf = (s) => {
  const m = String(s || "").match(/rgb\(\d+, \d+, \d+\)/g);
  return m ? m.join(" → ") : String(s || "");
};
/** The wash's parsed stop count (structure pin — a dropped/added stop
 *  fires even inside the pixel tolerance). */
const stopCountOf = (s) =>
  (String(s || "").match(/(rgba?\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\))/g) || []).length;
/** The wash's first-two stop TRIPLES, exact (opaque on both apps —
 *  the decode: stop 1 + stop 2 serialize rgb() on both sides). */
const washStops12Of = (s) => {
  const m = String(s || "").match(/rgb\(\d+, \d+, \d+\)/g);
  return m ? m.slice(0, 2).join(" → ") : String(s || "");
};

/** The composited wash: both apps' raw wash strings painted over
 *  white on a 64x64 canvas (the oklab alpha-stop class's member).
 *  Returns { maxDelta, diffPct } — the caller applies the documented
 *  tolerance (maxDelta ≤ 1 AND diffPct ≤ 2). Runs in the still-open
 *  browser on an about:blank page. */
const washPixelsOf = async (page, bgA, bgB) =>
  page.evaluate(
    ([a, b]) => {
      const parseStops = (s) => {
        const re = /(rgba?\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\))\s*([\d.]+%)?/g;
        const stops = [];
        let m;
        while ((m = re.exec(String(s))) !== null) {
          stops.push({ color: m[1], pos: m[2] ? parseFloat(m[2]) / 100 : null });
        }
        return stops;
      };
      const paint = (bg) => {
        const stops = parseStops(bg);
        const cv = document.createElement("canvas");
        cv.width = 64;
        cv.height = 64;
        const ctx = cv.getContext("2d");
        ctx.fillStyle = "#ffffff"; // the wash composites over the body's white
        ctx.fillRect(0, 0, 64, 64);
        const g = ctx.createLinearGradient(0, 0, 64, 64); // to right bottom
        const n = stops.length - 1;
        stops.forEach((s, i) => {
          const pos = s.pos !== null ? s.pos : i / n;
          g.addColorStop(Math.min(1, Math.max(0, pos)), s.color);
        });
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 64);
        return ctx.getImageData(0, 0, 64, 64).data;
      };
      const da = paint(a);
      const db = paint(b);
      let diffs = 0;
      let maxDelta = 0;
      for (let i = 0; i < da.length; i++) {
        if (da[i] !== db[i]) {
          diffs++;
          maxDelta = Math.max(maxDelta, Math.abs(da[i] - db[i]));
        }
      }
      return {
        maxDelta,
        diffPct: Math.round((1000 * diffs) / da.length) / 10,
      };
    },
    [bgA, bgB],
  );

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
const dev = await probe(() => runPass(page, DEV));
if (dev.__error) {
  console.log(`PROBE-ERROR dev: ${dev.__error}`);
  await browser.close();
  process.exit(1);
}

// ---------- the diff ----------
console.log("--- DIFF (ref vs ours, member by member) ---");
await page.goto("about:blank");

for (const p of PAGES) {
  const A = ref[p.key] || {};
  const B = dev[p.key] || {};
  if (A.error || B.error) {
    report(`${p.key}.__probe`, false, `ref [${A.error}] vs ours [${B.error}]`);
    continue;
  }
  const flat = (o) => {
    const f = {};
    for (const [k, v] of Object.entries(o)) {
      if (k === "btn") {
        if (v)
          for (const [bk, bv] of Object.entries(v)) f[`btn_${bk}`] = bv;
      } else f[k] = v;
    }
    return f;
  };
  const fa = flat(A);
  const fb = flat(B);

  // the wash members — three forms (exact stops 1-2, the count, the
  // composited tolerance member)
  const washStops12 = `${p.key}.washStops12`;
  report(
    washStops12,
    washStops12Of(A.washBg) === washStops12Of(B.washBg) && washStops12Of(A.washBg) !== "",
    `stops12 ${washStops12Of(A.washBg)}`,
  );
  const washCount = `${p.key}.washStopCount`;
  report(
    washCount,
    stopCountOf(A.washBg) === stopCountOf(B.washBg) && stopCountOf(A.washBg) >= 2,
    `count ${stopCountOf(A.washBg)}`,
  );
  const wp = await washPixelsOf(page, A.washBg, B.washBg);
  report(
    `${p.key}.washPixels`,
    wp.maxDelta <= 1 && wp.diffPct <= 2,
    `composited maxDelta ${wp.maxDelta}, ${wp.diffPct}% bytes (tolerance: the oklab alpha-stop dither class, maxDelta ≤ 1 && ≤ 2%)`,
  );

  // every other member
  for (const k of Object.keys(fa)) {
    if (k === "washBg") continue; // compared in its three forms above
    const a = fa[k];
    const b = fb[k];
    if (k === "h1Bg" || k === "btn_bg") {
      const sa = stopsOf(a);
      const sb = stopsOf(b);
      report(`${p.key}.${k}`, sa === sb && sa !== "", `stops ${sa}`);
      continue;
    }
    report(`${p.key}.${k}`, a === b, `${a}`);
  }
  // a missing btn on an action page is a probe error, not a match
  if (p.hasBtn && !A.btn) report(`${p.key}.__probe`, false, "activator not found on the reference");
  if (p.hasBtn && !B.btn) report(`${p.key}.__probe`, false, "activator not found on our dev server");
}

await browser.close();
const bad = results.filter((r) => !r.ok).length;
console.log(
  bad === 0
    ? `PARITY-HEADERS RESULT: ${results.length}/${results.length} members MATCH (both apps, same round)`
    : `PARITY-HEADERS RESULT: ${bad} DRIFT of ${results.length} members — investigate (one of the two apps moved this round)`,
);
process.exit(bad === 0 ? 0 : 1);
