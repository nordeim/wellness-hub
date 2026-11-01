// The committed WATCH + COMPUTED SPOT-CHECK companion (WH-33, F-1 — the
// standing AGENTS note's own cure: "while the platform keeps the CDN, a
// runtime-compiled Tailwind can drift computed values WITHOUT a bundle
// hash change"). Until now the watch was a hand-driven probe — 15+ evals
// per round, living only in the session agent's head; the WH-29
// capture-round lesson applies verbatim: a procedure that is not a
// committed script is "not reconstructible without the original script".
// Two consecutive JS-bundle changes (rounds 20 + 21) confirmed the
// reference's active development cadence — the watch runs EVERY round
// now, and it must stay a one-command procedure.
//
//   node scripts/watch-round.mjs
//
// PASS 1 (logged out — no login): the ASSET WATCH — the compiled-CSS
//   form (`index-*.css`, either `/static/` or `/assets/` path shape),
//   the JS bundle, the `cdn.tailwindcss.com` Play-CDN pipeline, the
//   `/api/frontend-config.js` config script, and the login family's
//   standing geometry. The watch is INFORMATIONAL: a moved asset is the
//   signal to run the full lesson-30 walk, never a failure by itself.
// PASS 2 (ONE login — the demo credentials; the reference rate-limits
//   logins per IP, so exactly one per run): the COMPUTED SPOT-CHECK —
//   the canonical surface set probed computed-style and compared
//   against the LEDGER below. This is the CDN companion proper: it runs
//   EVERY round regardless of hash stability, because the runtime
//   compiler can move computed values without touching any bundle.
//
// ZERO-WRITE doctrine (enforced): the script navigates, opens
// read-only dialogs (the Schedule modal via Use This Template) and
// read-only inline forms (Add Resource — opened, never submitted), and
// never submits a create form anywhere on the reference.
//
// Output: a per-surface MATCH/DRIFT report. Exit 0 when every
// spot-check matches; exit 1 on any DRIFT or PROBE-ERROR — a drift is
// a FINDING for the round's plan (investigate, cure if it is a real
// parity gap, then re-base the LEDGER in the same commit — the
// md5-ledger doctrine).
//
// LEDGER PROVENANCE: every member below was probed live on the
// reference's round-21 build (2026-11-01, WH-33 — the JS bundle
// index-DT3tkBuH.js, the CSS content hash index-BHjkUcdg.css stable
// since round 20). The run itself is the ledger's verification: on the
// first run after any ledger edit, a mismatch is either a real drift
// (a finding) or a wrong member (fix the member before committing).
// WH-34, F-1 — the doctrine's own amendment: a ledger edit must
// birth-verify BOTH outcomes, the firing state AND the quiet state.
// The WH-33 re-base (the js asset's basename form) shipped without a
// PASS-1 re-run against the stable read; round 23 then fired a
// false-positive MOVED on an unchanged hash — the exact class the
// "the run itself is the ledger's verification" rule exists to catch,
// missed because the re-run only exercised the DRIFT branch.

import { chromium } from "@playwright/test";

const BASE = "https://evolve-well-d6cec85d.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

/** The canonical ledger — round-24 form (WH-35: the js bundle moved
 *  AGAIN — /static/index-CXmO9oF_.js -> /static/index-BKhnHaM4.js, the
 *  FIFTH distinct bundle since round 20, while the CSS content hash
 *  stayed STABLE at index-BHjkUcdg.css — NOT the second consecutive
 *  stable read, so no cooling policy; the 15-surface computed set ALL
 *  MATCHed on the new bundle in the same run, the walk the MOVED
 *  signal demands done by the companion itself). */
const LEDGER = {
  // The watch (informational — reported, never fails the run).
  // FORM CONTRACT (WH-34, F-1): both asset entries carry the probe's
  // RETURN form — the FULL PATH. The WH-33 re-base wrote jsBundle as the
  // bare basename while the probe returns "/static/index-*.js", so the js
  // comparison could NEVER read stable and PASS 1 fired a false-positive
  // MOVED on every quiet round (round 23 proved it live: both content
  // hashes unchanged, the js axis still read "run the full lesson-30
  // walk"). An informational signal that always fires is a signal that
  // gets ignored — the entry is jsPath now, form-matched to cssPath.
  cssPath: "/static/index-BHjkUcdg.css",
  // WH-35 re-base (round 24's genuine move; birth-verified on the quiet
  // state per the WH-34 doctrine — the re-run read "assets stable").
  jsPath: "/static/index-BKhnHaM4.js",
  cdnPipeline: true,
  frontendConfig: true,
  // The computed spot-check (the CDN companion — MATCH/DRIFT):
  login: { h1Fs: "30px", h1Weight: "700", inputH: "48px", inputW: "368px", inputR: "12px" },
  dashboard: {
    h1: "Welcome Back!",
    h1Fs: "36px",
    h1Weight: "700",
    gradient: ["79, 70, 229", "147, 51, 234", "219, 39, 119"],
    tiles: ["Workouts This Week", "0", "Mood Entries", "1", "Active Assignments", "Goals Completed"],
  },
  mobileHeader: { padL: "24px", triggerW: "28px", triggerH: "28px", triggerR: "8px", titleX: 68 },
  drawer: {
    width: 288,
    borderR: "1px",
    borderRColor: "rgb(229, 229, 229)",
    xDisplay: "none",
    cappedHrefs: 11,
    rowH: "32px",
    escapeCloses: true,
    growAutoCloses: true,
  },
  desktopShell: {
    rowH: "32px",
    iconW: "16px",
    avatarW: "40px",
    avatarGradient: ["99, 102, 241", "168, 85, 247"],
    footers: 0,
    asides: 0,
    navs: 0,
  },
  goals: { badges: "Badges Earned", zero: "0", of: "of 0 total", tiles: 0 },
  routines: {
    templates: 11,
    withImg: 6,
    withWatch: 6,
    zoneH: "160px",
    zoneOverflow: "hidden",
    imgFit: "cover",
    overlayBg: "rgba(0, 0, 0, 0.4)",
    overlayOpacity: "0",
    watchBtnH: "32px",
    watchBtnBg: "rgb(255, 255, 255)",
    watchBtnFs: "12px",
  },
  scheduleModal: {
    width: 672,
    familyACircles: 3,
    familyBCircles: 5,
  },
  learning: { imgs: 12, watchNow: 12, chipBorder: "rgb(229, 229, 229)" },
  calendar: { trioBorder: "rgb(229, 229, 229)", gap: "8px" },
  profile: { tablistW: 960, tabs: 3, comboboxes: 4 },
  mentalHealth: { entries: "1", avg: "5.0/10", streak: "1", journey: "Your Journey" },
  // WH-34 (F-3, the (d) surface): the mood form's computed interior —
  // every member probed live this round (three passes: the structural
  // ladder, the active-tile/Save-Entry states, the default open state).
  // The form opens with GOOD pre-selected on BOTH apps (our
  // useState("good") — the default-state question settled by a dedicated
  // probe), so the active-tile read needs NO click: the zero-write
  // doctrine at its cleanest (open → read → Cancel).
  moodForm: {
    heading: "How are you feeling today?",
    groupCount: 7, // the ONE space-y-6 form (its siblings ride space-y-4)
    groupGap: 24, // the space-y-6 ladder's computed gap
    moodLabelMb: 16, // the mb-4 label→grid gap
    tiles: 5, // Amazing/Good/Okay/Low/Struggling
    activeTileText: "😊Good", // the DEFAULT-selected tile (no click)
    activeTileStops: ["59, 130, 246", "6, 182, 212"], // blue-500 → cyan-500
    activeTileColor: "rgb(255, 255, 255)",
    inactiveTileBorder: "rgb(229, 231, 235)", // gray-200
    energyLabel: "Energy Level: 5/10", // the useState(5) default, both apps
    rangeH: 8, // the h-2 track
    rangeMin: "1", // min=1 (the schema's min(0) stays the API superset)
    rangeBg: "rgb(229, 231, 235)", // the gray-200 track
    lowHighMt: "4px", // mt-1
    lowHighColor: "rgb(107, 114, 128)", // gray-500
    reflectH: 96, // the h-24 reflection
    reflectMinH: "60px", // the stock gratitude form both textareas share
    cancelH: 36, // the h-9 outline Cancel
    saveEntryH: 36,
    saveEntryStops: ["16, 185, 129", "20, 184, 166"], // emerald-500 → teal-500
    saveEntryColor: "rgb(250, 250, 250)", // neutral-50 ink
  },
  studyResources: { empty: "No resource", uploadField: "Upload File (optional)" },
  exercise: { empty: "No workouts" },
  assignments: { listSectionAbsent: true },
};

const results = [];
const report = (surface, ok, detail) => {
  results.push({ surface, ok, detail });
  console.log(`${ok ? "MATCH " : "DRIFT "} ${surface}: ${detail}`);
};
const probe = async (fn) => {
  try {
    return await fn();
  } catch (e) {
    return { __error: String(e).slice(0, 200) };
  }
};

/**
 * SPA-safe navigation: `waitUntil: "load"` fires BEFORE the reference's
 * React tree renders the route (the first run's lesson — every probe
 * that read straight after goto raced an unrendered page and read
 * nulls). Land on the route, wait for the app shell's <main>, then
 * settle for the route content.
 */
const gotoApp = async (route, { sel = "main", settleMs = 900 } = {}) => {
  await page.goto(`${BASE}${route}`, { waitUntil: "load" });
  await page.waitForSelector(sel, { timeout: 15000 });
  await page.waitForTimeout(settleMs);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

// ---------- PASS 1: the asset watch (logged out — no login) ----------
console.log("--- PASS 1: the asset watch (informational) ---");
// The login page carries no <main> — its shell is the bare auth card.
await gotoApp("/login", { sel: "h1" });

const assets = await probe(() =>
  page.evaluate(() => {
    const css = Array.from(document.querySelectorAll("link[rel=stylesheet]"))
      .map((l) => new URL(l.href).pathname)
      .find((p) => /index-.*\.css$/.test(p));
    const js = Array.from(document.querySelectorAll("script[src]"))
      .map((s) => new URL(s.src).pathname)
      .find((p) => /index-.*\.js$/.test(p));
    const cdn = Array.from(document.querySelectorAll("script[src]")).some((s) =>
      s.src.includes("cdn.tailwindcss.com"),
    );
    const cfg = Array.from(document.querySelectorAll("script[src]")).some((s) =>
      s.src.includes("frontend-config"),
    );
    return { css, js, cdn, cfg };
  }),
);
if (assets.__error) {
  console.log(`PROBE-ERROR assets: ${assets.__error}`);
} else {
  const moved = [];
  if (assets.css !== LEDGER.cssPath) moved.push(`css ${LEDGER.cssPath} -> ${assets.css}`);
  if (assets.js !== LEDGER.jsPath) moved.push(`js ${LEDGER.jsPath} -> ${assets.js}`);
  if (assets.cdn !== LEDGER.cdnPipeline) moved.push(`cdnPipeline -> ${assets.cdn}`);
  if (assets.cfg !== LEDGER.frontendConfig) moved.push(`frontendConfig -> ${assets.cfg}`);
  console.log(
    moved.length === 0
      ? `WATCH  assets stable (css ${assets.css}, js ${assets.js}, cdn ${assets.cdn}, cfg ${assets.cfg})`
      : `WATCH  MOVED since the ledger — ${moved.join("; ")} — run the full lesson-30 walk`,
  );
}

// The login family's standing geometry (the (l)-leg map's reference side).
const loginFace = await probe(() =>
  page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const input = document.querySelector("input[type=email]");
    const hs = h1 ? getComputedStyle(h1) : null;
    const is = input ? getComputedStyle(input) : null;
    const r = input ? input.getBoundingClientRect() : null;
    return {
      h1Fs: hs ? hs.fontSize : null,
      h1Weight: hs ? hs.fontWeight : null,
      inputH: r ? `${Math.round(r.height)}px` : null,
      inputW: r ? `${Math.round(r.width)}px` : null,
      inputR: is ? is.borderRadius : null,
    };
  }),
);
if (loginFace.__error) {
  report("login", false, `PROBE-ERROR ${loginFace.__error}`);
} else {
  const L = LEDGER.login;
  const diffs = Object.keys(L).filter((k) => loginFace[k] !== L[k]);
  report(
    "login",
    diffs.length === 0,
    diffs.length === 0
      ? `h1 ${loginFace.h1Fs}/${loginFace.h1Weight}, inputs ${loginFace.inputH}x${loginFace.inputW} r${loginFace.inputR}`
      : diffs.map((k) => `${k} ${L[k]} -> ${loginFace[k]}`).join("; "),
  );
}

// ---------- PASS 2: the one login, then the computed spot-check ----------
console.log("--- PASS 2: the computed spot-check (ONE login) ---");
await page.fill("input[type=email]", EMAIL);
await page.fill("input[type=password]", PASSWORD);
await page.click("button[type=submit]");
await page.waitForURL(`${BASE}/`);
await page.waitForSelector("main", { timeout: 15000 });
await page.waitForTimeout(1200); // the tiles render async — the first run raced them

// — the dashboard —
{
  const d = await probe(() =>
    page.evaluate(() => {
      const h1 = Array.from(document.querySelectorAll("h1")).find((h) => h.offsetParent !== null);
      const cs = h1 ? getComputedStyle(h1) : null;
      const body = document.querySelector("main").textContent.replace(/\s+/g, " ");
      return {
        h1: h1 ? h1.textContent.trim() : null,
        h1Fs: cs ? cs.fontSize : null,
        h1Weight: cs ? cs.fontWeight : null,
        gradient: cs ? cs.backgroundImage : null,
        body,
      };
    }),
  );
  if (d.__error) report("dashboard", false, `PROBE-ERROR ${d.__error}`);
  else {
    const L = LEDGER.dashboard;
    const miss = L.tiles.filter((t) => !d.body.includes(t));
    const gradMiss = L.gradient.filter((stop) => !d.gradient.includes(stop));
    const ok =
      d.h1 === L.h1 && d.h1Fs === L.h1Fs && d.h1Weight === L.h1Weight && miss.length === 0 && gradMiss.length === 0;
    report(
      "dashboard",
      ok,
      ok
        ? `H1 "${d.h1}" ${d.h1Fs}/${d.h1Weight}, gradient stops + tiles 0/1/0/0 all present`
        : `h1 ${d.h1}/${d.h1Fs}/${d.h1Weight}; tiles missing [${miss}]; gradient missing [${gradMiss}]`,
    );
  }
}

// — the desktop shell (rows/icons/avatar/footers/landmarks) —
{
  const s = await probe(() =>
    page.evaluate(() => {
      const row = Array.from(document.querySelectorAll('a[href^="/Exercise"]')).find(
        (a) => a.offsetParent !== null,
      );
      const icon = row ? row.querySelector("svg") : null;
      const prof = Array.from(document.querySelectorAll('a[href^="/Profile"]')).find(
        (a) => a.offsetParent !== null,
      );
      const circle = prof ? prof.querySelector("[class*=rounded-full]") : null;
      const cs = circle ? getComputedStyle(circle) : null;
      return {
        rowH: row ? getComputedStyle(row).height : null,
        iconW: icon ? getComputedStyle(icon).width : null,
        avatarW: cs ? cs.width : null,
        avatarGradient: cs ? cs.backgroundImage : null,
        footers: document.querySelectorAll("footer").length,
        asides: document.querySelectorAll("aside").length,
        navs: document.querySelectorAll("nav").length,
      };
    }),
  );
  if (s.__error) report("desktopShell", false, `PROBE-ERROR ${s.__error}`);
  else {
    const L = LEDGER.desktopShell;
    const gradMiss = L.avatarGradient.filter((g) => !s.avatarGradient.includes(g));
    const diffs = [];
    if (s.rowH !== L.rowH) diffs.push(`rowH ${L.rowH} -> ${s.rowH}`);
    if (s.iconW !== L.iconW) diffs.push(`iconW ${L.iconW} -> ${s.iconW}`);
    if (s.avatarW !== L.avatarW) diffs.push(`avatarW ${L.avatarW} -> ${s.avatarW}`);
    if (gradMiss.length) diffs.push(`avatarGradient missing [${gradMiss}]`);
    if (s.footers !== L.footers) diffs.push(`footers ${L.footers} -> ${s.footers}`);
    if (s.asides !== L.asides) diffs.push(`asides ${L.asides} -> ${s.asides}`);
    if (s.navs !== L.navs) diffs.push(`navs ${L.navs} -> ${s.navs}`);
    report(
      "desktopShell",
      diffs.length === 0,
      diffs.length === 0
        ? `rows ${s.rowH}, icons ${s.iconW}, avatar ${s.avatarW}, footers ${s.footers}, landmarks 0`
        : diffs.join("; "),
    );
  }
}

// — the goals standing block —
{
  const g = await probe(async () => {
    await gotoApp("/Goals");
    return page.evaluate(() => {
      const t = document.querySelector("main").textContent.replace(/\s+/g, " ");
      return {
        badges: t.includes("Badges Earned"),
        zero: /Badges Earned\s*0/.test(t),
        of: t.includes("of 0 total"),
        tiles: document.querySelectorAll("main [class*=space-y-3] [class*=rounded-xl]").length,
      };
    });
  });
  if (g.__error) report("goals", false, `PROBE-ERROR ${g.__error}`);
  else {
    const L = LEDGER.goals;
    const ok = g.badges && g.zero && g.of && g.tiles === L.tiles;
    report(
      "goals",
      ok,
      ok
        ? `"Badges Earned 0 of 0 total", ${g.tiles} tiles (the demo account's own state)`
        : `badges=${g.badges} zero=${g.zero} of=${g.of} tiles ${L.tiles} -> ${g.tiles}`,
    );
  }
}

// — the routines family split + the video-card computed set —
{
  const r = await probe(async () => {
    await gotoApp("/Routines");
    // The video family's marker: the thumbnail imgs (the first run raced
    // an unrendered grid and read "no video card" — wait for the imgs).
    await page.waitForSelector("main .rounded-xl.border img", { timeout: 15000 });
    await page.waitForTimeout(600);
    return page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll("main .rounded-xl.border")).filter((c) =>
        c.querySelector("img, h3, [class*=font-semibold]"),
      );
      const withImg = cards.filter((c) => c.querySelector("img"));
      const card = withImg[0];
      if (!card) return { __error: "no video card" };
      const zone = card.querySelector("[class*=h-40]");
      const img = card.querySelector("img");
      const btn = Array.from(card.querySelectorAll("button")).find((b) => /Watch Video/i.test(b.textContent));
      const ov = btn ? btn.parentElement : null;
      const zcs = zone ? getComputedStyle(zone) : null;
      const ics = img ? getComputedStyle(img) : null;
      const bcs = btn ? getComputedStyle(btn) : null;
      const ocs = ov ? getComputedStyle(ov) : null;
      return {
        templates: cards.length,
        withImg: withImg.length,
        withWatch: cards.filter((c) =>
          Array.from(c.querySelectorAll("button")).some((b) => /Watch Video/i.test(b.textContent)),
        ).length,
        zoneH: zcs ? zcs.height : null,
        zoneOverflow: zcs ? zcs.overflow : null,
        imgFit: ics ? ics.objectFit : null,
        overlayBg: ocs ? ocs.backgroundColor : null,
        overlayOpacity: ocs ? ocs.opacity : null,
        watchBtnH: bcs ? bcs.height : null,
        watchBtnBg: bcs ? bcs.backgroundColor : null,
        watchBtnFs: bcs ? bcs.fontSize : null,
      };
    });
  });
  if (r.__error) report("routines", false, `PROBE-ERROR ${r.__error}`);
  else {
    const L = LEDGER.routines;
    const diffs = Object.keys(L).filter((k) => r[k] !== L[k]);
    report(
      "routines",
      diffs.length === 0,
      diffs.length === 0
        ? `11 templates (6 video + 5 plain), the video-card computed set (zone ${r.zoneH}/${r.zoneOverflow}, overlay ${r.overlayBg} @${r.overlayOpacity}, btn ${r.watchBtnH} ${r.watchBtnFs})`
        : diffs.map((k) => `${k} ${L[k]} -> ${r[k]}`).join("; "),
    );
  }
}

// — the Schedule modal on BOTH families (read-only — never submitted) —
{
  const m = await probe(async () => {
    const open = async (cardText) => {
      await gotoApp("/Routines");
      await page.waitForSelector("main .rounded-xl.border img");
      const card = page.locator("main .rounded-xl.border").filter({ hasText: cardText }).first();
      await card.getByRole("button", { name: /Use This Template/i }).click();
      await page.waitForSelector('[role="dialog"]');
      await page.waitForTimeout(450); // the zoom-in-95 settle doctrine
      const out = await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"]');
        const circles = d
          ? Array.from(d.querySelectorAll("span.rounded-full")).filter(
              (s) => getComputedStyle(s).backgroundColor === "rgb(168, 85, 247)",
            )
          : [];
        return {
          width: d ? Math.round(d.getBoundingClientRect().width) : null,
          circles: circles.length,
        };
      });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      return out;
    };
    const familyA = await open("5-Minute Morning Energizer");
    const familyB = await open("Creative Flow Session");
    return { familyA, familyB };
  });
  if (m.__error) report("scheduleModal", false, `PROBE-ERROR ${m.__error}`);
  else {
    const L = LEDGER.scheduleModal;
    const ok =
      m.familyA.width === L.width &&
      m.familyA.circles === L.familyACircles &&
      m.familyB.width === L.width &&
      m.familyB.circles === L.familyBCircles;
    report(
      "scheduleModal",
      ok,
      ok
        ? `${L.width}px on both families; circles A=${m.familyA.circles} B=${m.familyB.circles} (the family split — data, not renderer)`
        : `A ${JSON.stringify(m.familyA)} B ${JSON.stringify(m.familyB)} vs ${JSON.stringify(L)}`,
    );
  }
}

// — the learning trio —
{
  const l = await probe(async () => {
    await gotoApp("/Learning");
    return page.evaluate(() => {
      const chips = Array.from(document.querySelectorAll("main [class*=border]")).filter((c) => {
        const cs = getComputedStyle(c);
        return cs.border === `1px solid ${"rgb(229, 229, 229)"}` && cs.boxShadow === "none";
      });
      return {
        imgs: document.querySelectorAll("main img").length,
        watchNow: Array.from(document.querySelectorAll("main button")).filter((b) =>
          /Watch Now/i.test(b.textContent),
        ).length,
        chipBorder: chips.length > 0,
      };
    });
  });
  if (l.__error) report("learning", false, `PROBE-ERROR ${l.__error}`);
  else {
    const L = LEDGER.learning;
    const ok = l.imgs === L.imgs && l.watchNow === L.watchNow && l.chipBorder;
    report(
      "learning",
      ok,
      ok ? `${l.imgs} imgs, ${l.watchNow} Watch Now, outline chips at rgb(229,229,229)` : JSON.stringify(l),
    );
  }
}

// — the events calendar —
{
  const c = await probe(async () => {
    await gotoApp("/Events");
    return page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("main button")).filter(
        (b) => b.offsetParent !== null && /^[←→]$|^Today$/.test(b.textContent.trim()),
      );
      const ok = btns.length === 3 && btns.every((b) => getComputedStyle(b).border.includes("rgb(229, 229, 229)"));
      const gap = btns[0] ? getComputedStyle(btns[0].parentElement).gap : null;
      return { trio: ok, gap };
    });
  });
  if (c.__error) report("calendar", false, `PROBE-ERROR ${c.__error}`);
  else {
    const ok = c.trio && c.gap === LEDGER.calendar.gap;
    report("calendar", ok, ok ? `outline trio 1px rgb(229,229,229), gap ${c.gap}` : JSON.stringify(c));
  }
}

// — the profile tablist —
{
  const p = await probe(async () => {
    await gotoApp("/Profile");
    return page.evaluate(() => {
      const tablist = document.querySelector("[role=tablist]");
      return {
        tablistW: tablist ? Math.round(tablist.getBoundingClientRect().width) : null,
        tabs: document.querySelectorAll("[role=tab]").length,
        comboboxes: document.querySelectorAll("[role=combobox]").length,
      };
    });
  });
  if (p.__error) report("profile", false, `PROBE-ERROR ${p.__error}`);
  else {
    const L = LEDGER.profile;
    const ok = p.tablistW === L.tablistW && p.tabs === L.tabs && p.comboboxes === L.comboboxes;
    report(
      "profile",
      ok,
      ok ? `tablist ${p.tablistW}px, ${p.tabs} tabs, ${p.comboboxes} comboboxes` : JSON.stringify(p),
    );
  }
}

// — the mental-health demo state —
{
  const mh = await probe(async () => {
    await gotoApp("/MentalHealth");
    return page.evaluate(() => {
      const t = document.querySelector("main").textContent.replace(/\s+/g, " ");
      return {
        entries: /Total Entries\s*1/.test(t) ? "1" : null,
        avg: t.includes("5.0/10") ? "5.0/10" : null,
        streak: /Current Streak\s*1/.test(t) ? "1" : null,
        journey: t.includes("Your Journey"),
      };
    });
  });
  if (mh.__error) report("mentalHealth", false, `PROBE-ERROR ${mh.__error}`);
  else {
    const L = LEDGER.mentalHealth;
    const ok =
      mh.entries === L.entries && mh.avg === L.avg && mh.streak === L.streak && mh.journey;
    report(
      "mentalHealth",
      ok,
      ok ? `1 entry, 5.0/10 avg, streak 1, the Your Journey list` : JSON.stringify(mh),
    );
  }
}

// — the mood form's computed interior (WH-34, F-3 — the (d) surface; the
//   (k) leg's map on our side, the reference side finally ledgered: the
//   form rides the SAME inline-card modality as the sr form — opened
//   read-only, closed via Cancel, ZERO-WRITE) —
{
  const mf = await probe(async () => {
    await gotoApp("/MentalHealth");
    const openBtn = page.locator("main button", { hasText: /New Entry/i }).first();
    await openBtn.click();
    // settle on the form's own heading (the SPA-render lesson: never read
    // straight after the click)
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
      const heading = Array.from(card.querySelectorAll("h2, h3, [class*='font-semibold']")).find((h) =>
        /How are you feeling today\?/i.test(h.textContent || ""),
      );
      // the body (p-6 pt-0) → its ONE child = the space-y-6 wrapper → the groups
      const body = Array.from(card.children).find((c) => (c.getAttribute("class") || "").includes("pt-0"));
      const wrapper = body?.firstElementChild;
      const groups = wrapper ? Array.from(wrapper.children) : [];
      const grid = card.querySelector("div[class*='grid-cols-2']");
      const tiles = grid ? Array.from(grid.querySelectorAll("button")) : [];
      // the DEFAULT-selected tile — no click: both apps open with Good
      // pre-selected (probed; our useState("good") twin)
      const active = tiles.find((t) => (getComputedStyle(t).backgroundImage || "").includes("gradient"));
      const inactive = tiles.find((t) => t !== active);
      const labels = Array.from(card.querySelectorAll("label"));
      const energyLabel = labels.find((l) => /Energy/i.test(l.textContent || ""));
      const textareas = Array.from(card.querySelectorAll("textarea"));
      const reflect = textareas[textareas.length - 1];
      const buttons = Array.from(card.querySelectorAll("button"));
      const cancel = buttons.find((b) => b.textContent.trim() === "Cancel");
      const save = buttons.find((b) => /Save Entry/i.test(b.textContent.trim()));
      return {
        heading: heading?.textContent.trim(),
        wrapperCls: wrapper?.getAttribute("class"),
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
        lowHighMt: null,
        lowHighColor: null,
        reflectH: reflect ? Math.round(reflect.getBoundingClientRect().height) : null,
        reflectMinH: reflect ? getComputedStyle(reflect).minHeight : null,
        cancelH: cancel ? Math.round(cancel.getBoundingClientRect().height) : null,
        saveEntryH: save ? Math.round(save.getBoundingClientRect().height) : null,
        saveEntryBg: save ? getComputedStyle(save).backgroundImage : null,
        saveEntryColor: save ? getComputedStyle(save).color : null,
      };
    });
    if (read.error) return read;
    // the Low/High row (computed AFTER the card walk — its locator needs
    // the collapsed-text match, evaluated in the same context)
    const lowHigh = await page.evaluate(() => {
      const range = document.querySelector("input[type='range']");
      let card = range;
      while (card && card !== document.body) {
        if ((card.getAttribute("class") || "").includes("shadow-xl")) break;
        card = card.parentElement;
      }
      const row = Array.from(card.querySelectorAll("div")).find(
        (d) => d.textContent.replace(/\s+/g, "") === "LowHigh" && d.querySelector("span"),
      );
      return row
        ? { lowHighMt: getComputedStyle(row).marginTop, lowHighColor: getComputedStyle(row.querySelector("span")).color }
        : { lowHighMt: null, lowHighColor: null };
    });
    // close read-only via Cancel (the inline form's own affordance —
    // Escape is not it, probed)
    await page.getByRole("button", { name: "Cancel", exact: true }).click();
    await page.waitForTimeout(400);
    const closed = await page.evaluate(() => {
      const range = document.querySelector("input[type='range']");
      return range === null;
    });
    return { ...read, ...lowHigh, closed };
  });
  if (mf.__error) report("moodForm", false, `PROBE-ERROR ${mf.__error}`);
  else if (mf.error) report("moodForm", false, `PROBE-ERROR ${mf.error}`);
  else {
    const L = LEDGER.moodForm;
    const activeStopsOk = L.activeTileStops.every((s) => (mf.activeTileBg || "").includes(s));
    const saveStopsOk = L.saveEntryStops.every((s) => (mf.saveEntryBg || "").includes(s));
    const ok =
      mf.heading === L.heading &&
      (mf.wrapperCls || "").includes("space-y-6") &&
      mf.groupCount === L.groupCount &&
      mf.groupGap === L.groupGap &&
      mf.moodLabelMb === L.moodLabelMb &&
      mf.tiles === L.tiles &&
      mf.activeTileText === L.activeTileText &&
      activeStopsOk &&
      mf.activeTileColor === L.activeTileColor &&
      mf.inactiveTileBorder === L.inactiveTileBorder &&
      mf.energyLabel === L.energyLabel &&
      mf.rangeH === L.rangeH &&
      mf.rangeMin === L.rangeMin &&
      mf.rangeBg === L.rangeBg &&
      mf.lowHighMt === L.lowHighMt &&
      mf.lowHighColor === L.lowHighColor &&
      mf.reflectH === L.reflectH &&
      mf.reflectMinH === L.reflectMinH &&
      mf.cancelH === L.cancelH &&
      mf.saveEntryH === L.saveEntryH &&
      saveStopsOk &&
      mf.saveEntryColor === L.saveEntryColor &&
      mf.closed;
    report(
      "moodForm",
      ok,
      ok
        ? `space-y-6 x${mf.groupCount}@${mf.groupGap}px, mb-4 ${mf.moodLabelMb}px, ${mf.tiles} tiles (default ${mf.activeTileText} blue→cyan), range 8px/min1 gray-200, Low/High mt-1 gray-500, reflect ${mf.reflectH}px, Cancel/Save Entry 36px (emerald→teal), closed via Cancel`
        : JSON.stringify(mf),
    );
  }
}

// — the study-resources block (the inline form opened read-only) —
{
  const sr = await probe(async () => {
    // The reference's true href is the PLURAL /StudyResources (its own
    // sidebar link; the singular 404s — a full-load quirk the WH-33
    // first run rediscovered: the session-62 narrative's URL-guess trap).
    await gotoApp("/StudyResources");
    const t1 = await page.evaluate(() => document.querySelector("main").textContent.replace(/\s+/g, " "));
    const addBtn = page.locator("main button", { hasText: /Add Resource/i }).first();
    if ((await addBtn.count()) === 0) {
      return { empty: t1.includes("No resource") ? "No resource" : null, uploadField: null };
    }
    await addBtn.click();
    await page.waitForTimeout(400);
    return page.evaluate(() => ({
      empty: document.querySelector("main").textContent.includes("No resource") ? "No resource" : null,
      uploadField: Array.from(document.querySelectorAll("input[type=file]"))
        .filter((i) => i.offsetParent !== null)
        .some((i) => (i.parentElement?.parentElement?.textContent || "").includes("Upload File (optional)"))
        ? "Upload File (optional)"
        : null,
      dialogs: document.querySelectorAll('[role="dialog"]').length,
    }));
  });
  if (sr.__error) report("studyResources", false, `PROBE-ERROR ${sr.__error}`);
  else {
    const L = LEDGER.studyResources;
    const ok = sr.empty === L.empty && sr.uploadField === L.uploadField;
    report(
      "studyResources",
      ok,
      ok ? `zero rows + the inline "Upload File (optional)" field (no overlay)` : JSON.stringify(sr),
    );
  }
}

// — the exercise + assignments zero-row states —
{
  const ex = await probe(async () => {
    await gotoApp("/Exercise");
    return page.evaluate(() => document.querySelector("main").textContent.replace(/\s+/g, " "));
  });
  if (ex.__error) report("exercise", false, `PROBE-ERROR ${ex.__error}`);
  else {
    const ok = ex.includes(LEDGER.exercise.empty);
    report("exercise", ok, ok ? `"${LEDGER.exercise.empty}" (the zero-row state)` : "empty state missing");
  }
  const asg = await probe(async () => {
    await gotoApp("/Assignments");
    return page.evaluate(() => {
      const t = document.querySelector("main").textContent.replace(/\s+/g, " ");
      return { noList: !/Recent Assignments|assignment list/i.test(t) };
    });
  });
  if (asg.__error) report("assignments", false, `PROBE-ERROR ${asg.__error}`);
  else {
    const ok = asg.noList === LEDGER.assignments.listSectionAbsent;
    report("assignments", ok, ok ? "the zero-row section omission (no list section)" : JSON.stringify(asg));
  }
}

// — the mobile header + the drawer battery (390px, ending back at desktop) —
{
  const mb = await probe(async () => {
    await gotoApp("/Dashboard");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(600);
    const header = await page.evaluate(() => {
      const hdr = document.querySelector("header");
      const title = hdr ? hdr.querySelector("h1") : null;
      const trig = hdr ? hdr.querySelector("button") : null;
      const tcs = trig ? getComputedStyle(trig) : null;
      return {
        padL: hdr ? getComputedStyle(hdr).paddingLeft : null,
        triggerW: tcs ? tcs.width : null,
        triggerH: tcs ? tcs.height : null,
        triggerR: tcs ? tcs.borderRadius : null,
        titleX: title ? Math.round(title.getBoundingClientRect().x) : null,
      };
    });
    // open the drawer
    await page.evaluate(() => document.querySelector("header button").click());
    await page.waitForTimeout(800);
    const drawer = await page.evaluate(() => {
      const cand = Array.from(document.querySelectorAll("div")).filter((d) => {
        const r = d.getBoundingClientRect();
        const cs = getComputedStyle(d);
        return r.width >= 287 && r.width <= 289 && r.height > 600 && parseFloat(cs.borderRightWidth) > 0;
      });
      const s = cand[0];
      if (!s) return { sheetFound: false };
      const cs = getComputedStyle(s);
      const x = s.querySelector("button");
      const links = Array.from(s.querySelectorAll("a"));
      const rows = links.map((a) => getComputedStyle(a).height);
      return {
        sheetFound: true,
        width: Math.round(s.getBoundingClientRect().width), // the border-box rect
        borderR: cs.borderRightWidth,
        borderRColor: cs.borderRightColor,
        xDisplay: x ? getComputedStyle(x).display : "none",
        // Scoped to the SHEET (the document-wide count picks up the
        // dashboard's own capitalized Quick Action links — the first
        // run's 15-vs-11 lesson; the sheet's own set is the 10 module
        // links + the Profile card).
        cappedHrefs: links.filter((a) => /^\/[A-Z]/.test(a.getAttribute("href") || "")).length,
        rowH: rows[0],
        focusOnSheet: document.activeElement.classList.contains("fixed"),
      };
    });
    // escape closes + unlocks
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    const afterEscape = await page.evaluate(() => {
      const cand = Array.from(document.querySelectorAll("div")).filter((d) => {
        const r = d.getBoundingClientRect();
        return r.width >= 287 && r.width <= 289 && r.height > 600;
      });
      return {
        closed: cand.length === 0,
        unlocked: !document.documentElement.dataset.scrollLocked,
      };
    });
    // reopen, then grow the viewport — the drawer must auto-close
    await page.evaluate(() => document.querySelector("header button").click());
    await page.waitForTimeout(800);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.waitForTimeout(800);
    const afterGrow = await page.evaluate(() => {
      const cand = Array.from(document.querySelectorAll("div")).filter((d) => {
        const r = d.getBoundingClientRect();
        return r.width >= 287 && r.width <= 289 && r.height > 600;
      });
      return { closed: cand.length === 0 };
    });
    return { header, drawer, afterEscape, afterGrow };
  });
  if (mb.__error) {
    report("mobileHeader+drawer", false, `PROBE-ERROR ${mb.__error}`);
  } else {
    const H = LEDGER.mobileHeader;
    const D = LEDGER.drawer;
    const diffs = [];
    for (const k of Object.keys(H)) if (mb.header[k] !== H[k]) diffs.push(`${k} ${H[k]} -> ${mb.header[k]}`);
    if (!mb.drawer.sheetFound) diffs.push("sheet not found");
    else {
      // ±1 the engine's sub-pixel rounding of the 288px sheet (the WH-22
      // modal-width doctrine, applied to the drawer).
      if (Math.abs(mb.drawer.width - D.width) > 1) diffs.push(`width ${D.width} -> ${mb.drawer.width}`);
      if (mb.drawer.borderR !== D.borderR) diffs.push(`borderR ${D.borderR} -> ${mb.drawer.borderR}`);
      if (mb.drawer.borderRColor !== D.borderRColor) diffs.push(`borderRColor -> ${mb.drawer.borderRColor}`);
      if (mb.drawer.xDisplay !== D.xDisplay) diffs.push(`xDisplay ${D.xDisplay} -> ${mb.drawer.xDisplay}`);
      if (mb.drawer.cappedHrefs !== D.cappedHrefs) diffs.push(`hrefs ${D.cappedHrefs} -> ${mb.drawer.cappedHrefs}`);
      if (mb.drawer.rowH !== D.rowH) diffs.push(`rowH ${D.rowH} -> ${mb.drawer.rowH}`);
    }
    if (!mb.afterEscape.closed) diffs.push("escape did not close");
    if (!mb.afterEscape.unlocked) diffs.push("scroll lock held after escape");
    if (!mb.afterGrow.closed) diffs.push("viewport-grow did not auto-close");
    report(
      "mobileHeader+drawer",
      diffs.length === 0,
      diffs.length === 0
        ? `header padL ${mb.header.padL}, trigger ${mb.header.triggerW} r${mb.header.triggerR}, title x=${mb.header.titleX}; drawer ${mb.drawer.width}px, border-r ${mb.drawer.borderR} ${mb.drawer.borderRColor}, X ${mb.drawer.xDisplay}, ${mb.drawer.cappedHrefs} hrefs, rows ${mb.drawer.rowH}, escape + unlock + grow-auto-close all pass`
        : diffs.join("; "),
    );
  }
}

await browser.close();

// ---------- the report ----------
const drifts = results.filter((r) => !r.ok);
console.log("---");
console.log(
  `WATCH-ROUND RESULT: ${results.length - drifts.length}/${results.length} spot-checks MATCH` +
    (drifts.length > 0 ? `, ${drifts.length} DRIFT — investigate, cure, re-base the LEDGER in the same commit` : ""),
);
process.exit(drifts.length > 0 ? 1 : 0);
