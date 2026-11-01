// The parity net's SIXTH SURFACE (WH-40, F-2 — the WH-39 plan's
// suggested-next (c), the "module toolbars" candidate): the TOOLBAR
// record family — the module pages' search/filter toolbar rows (the
// stock Input + pl-10 search, the Filter-icon select wrappers, the
// fixed-width triggers) plus the LANDSCAPE fact itself (which of the
// ten non-dashboard pages render a toolbar at all).
//
// The two-clocks gap it closes: the WH-24 census pins OUR toolbar
// source forms (the TOOLBAR record's five strings + the two consumer
// pages' stock-input + fixed-width classes) and the watch's
// studyResources/learning surfaces pin the reference's EMPTY-state
// faces — but the toolbars' computed CHROME (the input's interior, the
// icons, the container geometry, the triggers' full anatomy) had never
// been diffed same-round live-vs-live as a family. This surface is
// data-independent end to end (the toolbar renders regardless of row
// state) — the shell/headers surface class.
//
//   node scripts/parity-toolbars.mjs     (our dev server must be up)
//
// PASS A (the reference, ONE login): the 10 non-dashboard pages at
//   1280x900 → the member read. PASS B (our dev server, ONE login
//   likewise): the same read. Then the DIFF: every member compared
//   ref-vs-ours.
//
// DECODE PROVENANCE (WH-40, probed live on BOTH apps before this
// script was written): the landscape is a parity fact — exactly TWO of
// the ten pages render a toolbar on BOTH apps (StudyResources: search
// + 2 fixed-w-40 triggers; Learning: search + 1 fixed-w-48 trigger)
// and EIGHT render none on both — the absence pages are MEMBERS (a
// toolbar appearing or disappearing on either app fires). Every scalar
// member is either byte-identical across the two apps or a member of
// exactly two known classes:
//   (1) the lesson-40 shadow var-chain zero-layers class (the input +
//       every trigger: our build-time v4 emits the four
//       `rgba(0,0,0,0) 0px 0px 0px 0px` zero-layers before the real
//       `rgba(0,0,0,0.05) 0px 1px 2px 0px` pair; the reference's CDN
//       emits the real pair alone) — compared via the real-layers
//       filter (the parity-dashboard precedent, verbatim);
//   (2) the transform-vs-translate INTER-PROPERTY class (the lesson-44
//       form): the search icon's centering (`-translate-y-1/2`)
//       computes as `transform: matrix(1, 0, 0, 1, 0, -10)` on the
//       reference's CDN build vs our v4's SEPARATE-PROPERTY
//       `translate: 0px -50%` (our computed `transform` reads `none` —
//       NOT the absence of translation). Compared as the RENDERED
//       bounding-box position (iconRect vs wrapRect — verified 8px
//       top / 12px left on both apps), never either property's string.
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

// The ten non-dashboard pages. hasToolbar = the decode-settled
// landscape fact (WH-40: exactly StudyResources + Learning render a
// toolbar row on both apps; the other eight render none — the absence
// pins are members of this surface).
const PAGES = [
  { key: "routines", route: "/Routines", hasToolbar: false },
  { key: "exercise", route: "/Exercise", hasToolbar: false },
  { key: "mentalhealth", route: "/MentalHealth", hasToolbar: false },
  { key: "assignments", route: "/Assignments", hasToolbar: false },
  { key: "events", route: "/Events", hasToolbar: false },
  { key: "studyresources", route: "/StudyResources", hasToolbar: true },
  { key: "reminders", route: "/Reminders", hasToolbar: false },
  { key: "learning", route: "/Learning", hasToolbar: true },
  { key: "goals", route: "/Goals", hasToolbar: false },
  { key: "profile", route: "/Profile", hasToolbar: false },
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
    out[p.key] = await page.evaluate(() => {
      const vis = (el) => el && el.offsetParent !== null;
      // the toolbar anchor: a visible text input whose placeholder
      // carries "search" (both apps' toolbar searches) — dialog inputs
      // never match this on the walked pages (the decode's anchor)
      const inputs = Array.from(document.querySelectorAll("input")).filter(
        (i) => vis(i) && /search/i.test(i.placeholder || ""),
      );
      if (inputs.length === 0) return { toolbar: false };
      const input = inputs[0];
      const wrap = input.parentElement; // the .relative icon wrapper
      const cont = wrap ? wrap.parentElement : null;
      if (!cont) return { toolbar: false };
      const ics = getComputedStyle(input);
      const ccs = getComputedStyle(cont);
      // the search icon: the wrap's first svg + its RENDERED position
      // (the lesson-44 inter-property class's member — the rect, never
      // the transform/translate serialization)
      const sicon = wrap.querySelector("svg");
      let siconPos = null;
      if (sicon) {
        const wr = wrap.getBoundingClientRect();
        const ir = sicon.getBoundingClientRect();
        siconPos = {
          top: Math.round((ir.top - wr.top) * 10) / 10,
          left: Math.round((ir.left - wr.left) * 10) / 10,
        };
      }
      const scs = sicon ? getComputedStyle(sicon) : null;
      // the selects wrapper: the container's other child holding the
      // comboboxes/icons (the decode anchor — proven on both apps)
      let selwrap = null;
      for (const c of cont.children) {
        if (c !== wrap && (c.querySelector('[role="combobox"]') || c.querySelector("svg"))) {
          selwrap = c;
          break;
        }
      }
      // the Filter icon: the selects wrapper's DIRECT-child svg (the
      // leading icon before the triggers — never a trigger's chevron)
      let ficon = null;
      if (selwrap) {
        for (const c of selwrap.children) {
          if (c.tagName === "svg") {
            const fcs = getComputedStyle(c);
            ficon = { w: fcs.width, h: fcs.height, color: fcs.color };
            break;
          }
        }
      }
      const triggers = Array.from(cont.querySelectorAll('[role="combobox"]')).filter(vis);
      const trig = triggers.map((t) => {
        const tcs = getComputedStyle(t);
        return {
          text: t.textContent.trim().slice(0, 24),
          w: tcs.width,
          h: tcs.height,
          border: `${tcs.borderTopWidth} ${tcs.borderTopColor}`,
          r: tcs.borderTopLeftRadius,
          fs: tcs.fontSize,
          fw: tcs.fontWeight,
          pl: tcs.paddingLeft,
          pr: tcs.paddingRight,
          bg: tcs.backgroundColor,
          color: tcs.color,
          shadow: tcs.boxShadow,
        };
      });
      return {
        toolbar: true,
        input: {
          placeholder: input.placeholder,
          h: ics.height,
          pl: ics.paddingLeft,
          pr: ics.paddingRight,
          border: `${ics.borderTopWidth} ${ics.borderTopColor}`,
          r: ics.borderTopLeftRadius,
          fs: ics.fontSize,
          bg: ics.backgroundColor,
          color: ics.color,
          shadow: ics.boxShadow,
        },
        sicon: scs
          ? { w: scs.width, h: scs.height, color: scs.color, left: scs.left, pos: siconPos }
          : null,
        cont: {
          display: ccs.display,
          dir: ccs.flexDirection,
          colGap: ccs.columnGap,
          rowGap: ccs.rowGap,
          mt: ccs.marginTop,
        },
        selwrap: selwrap
          ? { display: getComputedStyle(selwrap).display, gap: getComputedStyle(selwrap).columnGap }
          : null,
        ficon,
        trigCount: triggers.length,
        trig,
      };
    });
  }
  return out;
};

// ---------- the normalizers (Node-side) ----------
/** The real-layers shadow filter — the lesson-40 var-chain zero-layers
 *  class (the parity-dashboard precedent, verbatim): our build-time v4
 *  emits the zero-alpha var-chain layers before the real pair; the
 *  reference's CDN emits the real pair alone. The member is the REAL
 *  layer list. */
const realLayers = (s) =>
  String(s || "")
    .split(/,\s*(?=[a-z])/)
    .filter((l) => !/rgba\(\d+, \d+, \d+, 0\)/.test(l))
    .join(", ");

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

for (const p of PAGES) {
  const A = ref[p.key] || {};
  const B = dev[p.key] || {};

  // the LANDSCAPE member: a toolbar page must read a toolbar on both
  // apps; an absence page must read none on both (a flip either way is
  // a drift — a toolbar appeared or disappeared)
  report(
    `${p.key}.landscape`,
    !!A.toolbar === !!B.toolbar && !!A.toolbar === p.hasToolbar,
    A.toolbar
      ? `toolbar present (${(B.trigCount ?? A.trigCount)} triggers)`
      : "no toolbar (the absence pin)",
  );
  if (!A.toolbar || !B.toolbar) continue;

  // the input — 9 scalars + the real-layers shadow member
  for (const k of Object.keys(A.input)) {
    const a = A.input[k];
    const b = (B.input || {})[k];
    if (k === "shadow") {
      const ra = realLayers(a);
      const rb = realLayers(b);
      report(`${p.key}.input.shadow`, ra === rb && ra !== "", `real layers [${ra}]`);
      continue;
    }
    report(`${p.key}.input.${k}`, a === b, `${a}`);
  }

  // the search icon — w/h/color/left (computed) + the RENDERED
  // position pair (the lesson-44 member: the rect, never the
  // transform/translate serialization)
  if (!A.sicon || !B.sicon) {
    report(`${p.key}.sicon.__probe`, false, `ref [${JSON.stringify(A.sicon)}] vs ours [${JSON.stringify(B.sicon)}]`);
  } else {
    for (const k of ["w", "h", "color", "left"]) {
      report(`${p.key}.sicon.${k}`, A.sicon[k] === B.sicon[k], `${A.sicon[k]}`);
    }
    if (!A.sicon.pos || !B.sicon.pos) {
      report(`${p.key}.sicon.pos.__probe`, false, "rendered position unread");
    } else {
      report(
        `${p.key}.sicon.pos`,
        A.sicon.pos.top === B.sicon.pos.top && A.sicon.pos.left === B.sicon.pos.left,
        `rendered top ${A.sicon.pos.top} / left ${A.sicon.pos.left} (the inter-property class: the rect is the member)`,
      );
    }
  }

  // the container + the selects wrapper + the Filter icon
  for (const k of Object.keys(A.cont)) {
    report(`${p.key}.cont.${k}`, A.cont[k] === (B.cont || {})[k], `${A.cont[k]}`);
  }
  if (A.selwrap && B.selwrap) {
    for (const k of Object.keys(A.selwrap)) {
      report(`${p.key}.selwrap.${k}`, A.selwrap[k] === B.selwrap[k], `${A.selwrap[k]}`);
    }
  } else {
    report(`${p.key}.selwrap.__probe`, false, `ref [${JSON.stringify(A.selwrap)}] vs ours [${JSON.stringify(B.selwrap)}]`);
  }
  if (A.ficon && B.ficon) {
    for (const k of Object.keys(A.ficon)) {
      report(`${p.key}.ficon.${k}`, A.ficon[k] === B.ficon[k], `${A.ficon[k]}`);
    }
  } else {
    report(`${p.key}.ficon.__probe`, false, `ref [${JSON.stringify(A.ficon)}] vs ours [${JSON.stringify(B.ficon)}]`);
  }

  // the triggers — the count + each trigger's 12 members (11 scalars +
  // the real-layers shadow)
  report(`${p.key}.trigCount`, A.trigCount === B.trigCount, `${A.trigCount}`);
  const n = Math.min(A.trigCount || 0, B.trigCount || 0);
  for (let i = 0; i < n; i++) {
    for (const k of Object.keys(A.trig[i])) {
      const a = A.trig[i][k];
      const b = B.trig[i][k];
      if (k === "shadow") {
        const ra = realLayers(a);
        const rb = realLayers(b);
        report(`${p.key}.trig[${i}].shadow`, ra === rb && ra !== "", `real layers [${ra}]`);
        continue;
      }
      report(`${p.key}.trig[${i}].${k}`, a === b, `${a}`);
    }
  }
}

await browser.close();
const bad = results.filter((r) => !r.ok).length;
console.log(
  bad === 0
    ? `PARITY-TOOLBARS RESULT: ${results.length}/${results.length} members MATCH (both apps, same round)`
    : `PARITY-TOOLBARS RESULT: ${bad} DRIFT of ${results.length} members — investigate (one of the two apps moved this round)`,
);
process.exit(bad === 0 ? 0 : 1);
