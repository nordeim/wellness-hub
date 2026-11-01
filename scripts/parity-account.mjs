// parity-account.mjs — the ELEVENTH committed parity surface (WH-45,
// F-1): the Profile's Account + Preferences tab interiors (the two
// tabs the tenth surface left unread — the WH-44 plan's (c)
// candidates). ONE login per app; both tabs read in the same flight
// (the tab clicks are view state only). ZERO-WRITE.
//
//   node scripts/parity-account.mjs      (our dev server must be up)
//
// PASS A (the reference, ONE login): /Profile at 1280×900 → the
//   Account tab (view state) → the member read → the Preferences tab
//   (view state) → the member read. PASS B (our dev server, ONE login
//   likewise): the same reads. Then the DIFF: every member compared
//   live-vs-live, exit 1 on any DRIFT/PROBE-ERROR.
//
// THE MEMBER SET (~170): the Account tab (the Account Information
// card's chrome + header pads + title face + the 20px title icon, the
// three disabled inputs' FULL computed anatomy — the gray-50 wash, the
// 6px radius, the 14px font, the 4/12 padding, the line border, the
// not-allowed cursor, the opacity-0.5 disabled arm — the three labels'
// faces, the group y-ladder) + the Preferences tab (the App
// Preferences card, the two checkbox rows' full anatomy — 912×78,
// flex items-center justify-between, p-4, rounded-lg 8px, the line
// border, transparent bg — the title/subtitle faces, the native 20×20
// checkboxes).
//
// THE ANCHORS (LESSONS 47/48): the sections are anchored STRUCTURALLY
// — the 12px-radius panel cards in <main> (the reference's section
// titles are plain DIVs where ours are H2s; the titles are read as
// DATA, never keyed by tag); the tabs are text-anchored buttons; the
// rows are the checkbox-bearing elements; the title/subtitle are the
// row's first two leaf text descendants (the reference's are Ps, ours
// SPANs — same rendered face; display is NOT asserted on them, the
// DOM-shape class).
//
// KNOWN SERIALIZATION CLASSES (normalized, the standing set): the
// lesson-40 shadow real-layers (the section cards — our v4 emits
// zero-alpha prefix layers the CDN build does not).
//
// PINNED DOCUMENTED DEVIATIONS (asserted as BOTH-APPS-AT-THEIR-OWN-
// DOCUMENTED-VALUES — a pin failing is a DRIFT, never a silent
// re-base): the SESSION CARD — the reference's Account tab carries
// exactly ONE card (Account Information; its platform handles logout);
// ours renders a SECOND card (Session: the sign-out description + the
// red Log out button) — the PAD §11 WH-25 ledgered FUNCTIONAL
// superset. The card count, the Session card's title/description/
// button anatomy are pinned at OUR documented values; if the reference
// ever GAINS a logout surface, the count pin fires same-round.
//
// DOM-SHAPE FACTS (decoded, zero rendered-face consequence — the
// lesson-27/48 class, documented not cured): the section titles
// DIV/H2 (ours the semantic superset); the Preferences row
// title/subtitle P/SPAN (the reference computes display:block, ours
// inline — the row heights and checkbox y-ladders are byte-identical,
// the rendered face matches); the reference's Account labels are
// unwired (no for=) where ours carry htmlFor (our a11y superset, the
// WH-25 note).
//
// ZERO-WRITE on both apps (login + the two tab clicks + read only).
// Exit 0 when every member matches; exit 1 on any DRIFT or
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
/** The PINNED-deviation reporter: both apps must sit at their OWN
 *  documented values (the ledgered superset) — a pin that fails is a
 *  drift (the superset changed shape on either side). */
const pinned = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "PINNED" : "DRIFT "} ${member}: ${detail}`);
};

/** SPA-safe navigation — the watch's gotoApp form, verbatim. */
const gotoApp = async (page, base, route) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector("main", { timeout: 25000 });
  await page.waitForTimeout(1200);
};

/** One app's full pass: login → /Profile (1280×900) → the Account tab
 *  → the member read → the Preferences tab → the member read. Raw
 *  computed strings; every normalization runs Node-side, one
 *  implementation for both apps. */
const runPass = async (page, base) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login");
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForSelector("main", { timeout: 25000 });
  await page.waitForTimeout(1400);

  await gotoApp(page, base, "/Profile");
  // normalize the tab: Account active (view state only)
  await page.locator("button", { hasText: "Account" }).first().click({ timeout: 8000 });
  await page.waitForTimeout(900);
  const account = await page.evaluate(() => {
    const out = { landscape: {}, sections: [] };
    const cs = (el, props) => {
      const s = getComputedStyle(el);
      const o = {};
      for (const p of props) o[p] = s[p];
      return o;
    };
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };

    // the 12px-radius section cards in <main> (the lesson-48 anchor)
    const cards = Array.from(document.querySelectorAll("main *")).filter((el) => {
      if (el.children.length === 0 || el.getBoundingClientRect().width < 300) return false;
      if (getComputedStyle(el).borderRadius !== "12px") return false;
      return el.getBoundingClientRect().height > 60;
    });
    out.landscape.cardCount = cards.length;
    out.landscape.cardTitles = cards.map((c) => (c.textContent || "").trim().slice(0, 24));

    for (const card of cards) {
      const sec = { card: {}, header: {}, title: {} };
      Object.assign(sec.card, { w: rect(card).w, h: rect(card).h }, cs(card, ["backgroundColor", "borderWidth", "boxShadow"]));
      const header = card.firstElementChild;
      if (header) {
        Object.assign(sec.header, cs(header, ["display", "paddingTop", "paddingLeft"]));
        const title = header.firstElementChild;
        if (title) {
          Object.assign(
            sec.title,
            { text: (title.textContent || "").trim().slice(0, 30) },
            cs(title, ["fontSize", "fontWeight", "color", "display", "gap", "lineHeight"]),
          );
          const icon = title.querySelector("svg");
          sec.title.iconW = icon ? Math.round(icon.getBoundingClientRect().width) : null;
          sec.title.tag = title.tagName; // DOM-SHAPE FACT (DIV vs H2) — documented, not asserted
        }
      }
      // the disabled inputs — the FULL computed anatomy
      const inputs = Array.from(card.querySelectorAll("input[disabled]"));
      sec.inputs = inputs.map((inp) => ({
        value: inp.value.slice(0, 40),
        ...rect(inp),
        ...cs(inp, [
          "backgroundColor", "color", "borderRadius", "fontSize",
          "paddingTop", "paddingLeft", "borderWidth", "borderColor",
          "cursor", "opacity",
        ]),
      }));
      // the group rhythm — the input y-ladder (the label-to-input
      // spacing rides the ladder; the labels themselves below)
      sec.inputYs = inputs.map((inp) => Math.round(inp.getBoundingClientRect().y));
      // the labels' face (text-anchored: the card's label elements)
      const labels = Array.from(card.querySelectorAll("label"));
      sec.labels = labels.map((l) => ({
        text: (l.textContent || "").trim().slice(0, 20),
        ...cs(l, ["fontSize", "fontWeight", "color", "display", "marginBottom"]),
      }));
      // the label-wiring fact (ours htmlFor — the a11y superset)
      sec.wiredLabels = labels.filter((l) => l.getAttribute("for")).length;
      // the Session card members (ours only): the description p + the button
      const p = card.querySelector("p");
      if (p) sec.p = { text: (p.textContent || "").trim().slice(0, 44), ...cs(p, ["fontSize", "color", "marginBottom"]) };
      const btn = card.querySelector("button");
      if (btn)
        sec.button = {
          text: (btn.textContent || "").trim().slice(0, 20),
          ...rect(btn),
          ...cs(btn, [
            "backgroundColor", "color", "borderRadius", "borderWidth", "borderColor",
            "fontSize", "fontWeight", "paddingLeft", "paddingRight",
          ]),
        };
      out.sections.push(sec);
    }
    return out;
  });

  // the Preferences tab (view state only)
  await page.locator("button", { hasText: "Preferences" }).first().click({ timeout: 8000 });
  await page.waitForTimeout(900);
  const prefs = await page.evaluate(() => {
    const out = { landscape: {}, rows: [] };
    const cs = (el, props) => {
      const s = getComputedStyle(el);
      const o = {};
      for (const p of props) o[p] = s[p];
      return o;
    };
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };
    const cards = Array.from(document.querySelectorAll("main *")).filter((el) => {
      if (el.children.length === 0 || el.getBoundingClientRect().width < 300) return false;
      if (getComputedStyle(el).borderRadius !== "12px") return false;
      return el.getBoundingClientRect().height > 60;
    });
    out.landscape.cardCount = cards.length;
    for (const card of cards) {
      out.card = { w: rect(card).w, h: rect(card).h, ...cs(card, ["backgroundColor", "borderWidth", "boxShadow"]) };
      const header = card.firstElementChild;
      if (header) {
        const title = header.firstElementChild;
        if (title) {
          out.title = {
            text: (title.textContent || "").trim().slice(0, 30),
            ...cs(title, ["fontSize", "fontWeight", "color"]),
          };
          const icon = title.querySelector("svg");
          out.title.iconW = icon ? Math.round(icon.getBoundingClientRect().width) : null;
          out.title.tag = title.tagName; // DOM-SHAPE FACT
        }
      }
      // the checkbox rows: the input's closest label-or-parent
      const boxes = Array.from(card.querySelectorAll("input[type=checkbox]"));
      out.landscape.checkboxCount = boxes.length;
      for (const box of boxes) {
        const row = box.closest("label") || box.parentElement;
        // the title/subtitle: the row's first two leaf text descendants
        // (the reference's are Ps, ours SPANs — lesson 48; display is
        // NOT asserted, the DOM-shape class)
        const textEls = row
          ? Array.from(row.querySelectorAll("*")).filter((el) => el.children.length === 0 && (el.textContent || "").trim().length > 3)
          : [];
        const title = textEls[0];
        const subtitle = textEls[1];
        out.rows.push({
          title: title
            ? {
                text: (title.textContent || "").trim().slice(0, 30),
                ...cs(title, ["fontSize", "fontWeight", "color", "lineHeight"]),
              }
            : null,
          subtitle: subtitle
            ? {
                text: (subtitle.textContent || "").trim().slice(0, 44),
                ...cs(subtitle, ["fontSize", "color", "lineHeight"]),
              }
            : null,
          checkbox: { w: rect(box).w, h: rect(box).h, ...cs(box, ["cursor"]) },
          row: {
            ...rect(row),
            ...cs(row, [
              "display", "alignItems", "justifyContent", "paddingTop", "paddingLeft",
              "borderRadius", "borderWidth", "borderColor", "backgroundColor", "gap",
            ]),
          },
        });
      }
    }
    return out;
  });
  return { account, prefs };
};

// ---------- the normalizers (Node-side) ----------
/** The real-layers shadow filter — the lesson-40 var-chain zero-layers
 *  (our v4 emits rgba(0,0,0,0) prefix layers the CDN build does not). */
const realLayers = (shadow) =>
  String(shadow || "")
    .split(/,(?![^()]*\))/)
    .map((l) => l.trim())
    .filter((l) => l && !/^rgba\(0, 0, 0, 0\)/.test(l));

// ---------- PASS A: the reference ----------
const browser = await chromium.launch();
const page = await browser.newPage();
console.log("--- PASS A: the reference (ONE login) ---");
const ref = await runPass(page, REF);
await browser.close();

// ---------- PASS B: our dev server ----------
const browser2 = await chromium.launch();
const page2 = await browser2.newPage();
console.log("--- PASS B: our dev server (ONE login) ---");
const ours = await runPass(page2, DEV);
await browser2.close();

// ---------- THE DIFF ----------
const A = ref.account;
const B = ours.account;
const P = ref.prefs;
const Q = ours.prefs;

// the Account landscape + the PINNED Session-card superset (the PAD
// §11 WH-25 ledger — the reference's Account tab carries ONE card).
pinned(
  "acct.cardCount (PINNED: the Session-card functional superset)",
  A.landscape.cardCount === 1 && B.landscape.cardCount === 2,
  `ref ${A.landscape.cardCount} (Account Information only) / ours ${B.landscape.cardCount} (+ the Session logout card — the PAD §11 WH-25 superset)`,
);
report(
  "acct.card1Title",
  (A.sections[0]?.title.text || "") === (B.sections[0]?.title.text || ""),
  `ref "${A.sections[0]?.title.text}" vs ours "${B.sections[0]?.title.text}"`,
);

// the Account Information card (the shared card — index 0 on both)
const a1 = A.sections[0] || {};
const b1 = B.sections[0] || {};
for (const m of ["w", "h", "backgroundColor", "borderWidth"]) {
  report(`acct.card.${m}`, a1.card?.[m] === b1.card?.[m], a1.card?.[m] === b1.card?.[m] ? `${b1.card?.[m]}` : `ref ${a1.card?.[m]} vs ours ${b1.card?.[m]}`);
}
report(
  "acct.card.shadow",
  realLayers(a1.card?.boxShadow).join(" | ") === realLayers(b1.card?.boxShadow).join(" | "),
  realLayers(a1.card?.boxShadow).join(" | ") === realLayers(b1.card?.boxShadow).join(" | ")
    ? `real layers [${realLayers(b1.card?.boxShadow).length}]`
    : `ref [${realLayers(a1.card?.boxShadow)}] vs ours [${realLayers(b1.card?.boxShadow)}]`,
);
for (const m of ["display", "paddingTop", "paddingLeft"]) {
  report(`acct.header.${m}`, a1.header?.[m] === b1.header?.[m], a1.header?.[m] === b1.header?.[m] ? `${b1.header?.[m]}` : `ref ${a1.header?.[m]} vs ours ${b1.header?.[m]}`);
}
for (const m of ["text", "fontSize", "fontWeight", "color", "display", "gap", "lineHeight", "iconW"]) {
  report(`acct.title.${m}`, a1.title?.[m] === b1.title?.[m], a1.title?.[m] === b1.title?.[m] ? `${b1.title?.[m]}` : `ref ${a1.title?.[m]} vs ours ${b1.title?.[m]}`);
}
// the DOM-SHAPE FACT (DIV vs H2 — ours the semantic superset): reported
// as a fact, never a MATCH assertion (the lesson-27 class).
console.log(`FACT   acct.title.tag: ref ${a1.title?.tag} / ours ${b1.title?.tag} (the H2 semantic superset — documented, not cured)`);

// the three disabled inputs — the FULL computed anatomy
const inN = Math.min(a1.inputs?.length ?? 0, b1.inputs?.length ?? 0);
report("acct.inputCount", (a1.inputs?.length ?? 0) === (b1.inputs?.length ?? 0), `${b1.inputs?.length ?? 0} (ref ${a1.inputs?.length ?? 0})`);
for (let i = 0; i < inN; i++) {
  for (const m of ["value", "w", "h", "backgroundColor", "color", "borderRadius", "fontSize", "paddingTop", "paddingLeft", "borderWidth", "borderColor", "cursor", "opacity"]) {
    report(
      `acct.input${i + 1}.${m}`,
      a1.inputs[i][m] === b1.inputs[i][m],
      a1.inputs[i][m] === b1.inputs[i][m] ? `${b1.inputs[i][m]}` : `ref ${a1.inputs[i][m]} vs ours ${b1.inputs[i][m]}`,
    );
  }
  report(`acct.input${i + 1}.y`, a1.inputYs?.[i] === b1.inputYs?.[i], a1.inputYs?.[i] === b1.inputYs?.[i] ? `${b1.inputYs?.[i]}` : `ref ${a1.inputYs?.[i]} vs ours ${b1.inputYs?.[i]}`);
}
// the labels' face
const lbN = Math.min(a1.labels?.length ?? 0, b1.labels?.length ?? 0);
report("acct.labelCount", (a1.labels?.length ?? 0) === (b1.labels?.length ?? 0), `${b1.labels?.length ?? 0} (ref ${a1.labels?.length ?? 0})`);
for (let i = 0; i < lbN; i++) {
  for (const m of ["text", "fontSize", "fontWeight", "color", "display", "marginBottom"]) {
    report(
      `acct.label${i + 1}.${m}`,
      a1.labels[i][m] === b1.labels[i][m],
      a1.labels[i][m] === b1.labels[i][m] ? `${b1.labels[i][m]}` : `ref ${a1.labels[i][m]} vs ours ${b1.labels[i][m]}`,
    );
  }
}
// the label-wiring fact (ours htmlFor — the a11y superset)
console.log(`FACT   acct.wiredLabels: ref ${a1.wiredLabels} / ours ${b1.wiredLabels} (the htmlFor a11y superset — documented, not cured)`);

// the SESSION CARD (ours only) — the PINNED-DEVIATION members. The
// reference carries NO second card; ours renders the ledgered logout
// surface. Every member is asserted at OUR documented values; the
// reference's absence is the pin.
const b2 = B.sections[1] || {};
pinned(
  "acct.session.title (PINNED: the logout superset)",
  !A.sections[1] && b2.title?.text === "Session",
  `ref (no card) / ours "${b2.title?.text}"`,
);
pinned(
  "acct.session.p (PINNED: the sign-out description)",
  !A.sections[1] && (b2.p?.text || "").startsWith("Sign out of this device"),
  `ref (no card) / ours "${(b2.p?.text || "").slice(0, 30)}…"`,
);
pinned(
  "acct.session.button (PINNED: the red Log out)",
  !A.sections[1] && b2.button?.text === "Log out" && b2.button?.backgroundColor === "rgb(254, 242, 242)" && b2.button?.color === "rgb(220, 38, 38)",
  `ref (no card) / ours "${b2.button?.text}" bg ${b2.button?.backgroundColor} ink ${b2.button?.color}`,
);
pinned(
  "acct.session.buttonGeometry (PINNED)",
  !A.sections[1] && b2.button?.h === 40 && b2.button?.borderRadius === "6px",
  `ref (no card) / ours h ${b2.button?.h} r ${b2.button?.borderRadius}`,
);

// the Preferences tab
report("prefs.cardCount", P.landscape.cardCount === Q.landscape.cardCount, `${Q.landscape.cardCount} (ref ${P.landscape.cardCount})`);
for (const m of ["w", "h", "backgroundColor", "borderWidth"]) {
  report(`prefs.card.${m}`, P.card?.[m] === Q.card?.[m], P.card?.[m] === Q.card?.[m] ? `${Q.card?.[m]}` : `ref ${P.card?.[m]} vs ours ${Q.card?.[m]}`);
}
report(
  "prefs.card.shadow",
  realLayers(P.card?.boxShadow).join(" | ") === realLayers(Q.card?.boxShadow).join(" | "),
  realLayers(P.card?.boxShadow).join(" | ") === realLayers(Q.card?.boxShadow).join(" | ")
    ? `real layers [${realLayers(Q.card?.boxShadow).length}]`
    : `ref [${realLayers(P.card?.boxShadow)}] vs ours [${realLayers(Q.card?.boxShadow)}]`,
);
for (const m of ["text", "fontSize", "fontWeight", "color", "iconW"]) {
  report(`prefs.title.${m}`, P.title?.[m] === Q.title?.[m], P.title?.[m] === Q.title?.[m] ? `${Q.title?.[m]}` : `ref ${P.title?.[m]} vs ours ${Q.title?.[m]}`);
}
console.log(`FACT   prefs.title.tag: ref ${P.title?.tag} / ours ${Q.title?.tag} (the H2 semantic superset — documented, not cured)`);

// the two checkbox rows
const rowN = Math.min(P.rows?.length ?? 0, Q.rows?.length ?? 0);
report("prefs.rowCount", (P.rows?.length ?? 0) === (Q.rows?.length ?? 0), `${Q.rows?.length ?? 0} (ref ${P.rows?.length ?? 0})`);
for (let r = 0; r < rowN; r++) {
  const pr = P.rows[r];
  const qr = Q.rows[r];
  for (const m of ["w", "h", "display", "alignItems", "justifyContent", "paddingTop", "paddingLeft", "borderRadius", "borderWidth", "borderColor", "backgroundColor", "gap"]) {
    report(
      `prefs.row${r + 1}.${m}`,
      pr.row[m] === qr.row[m],
      pr.row[m] === qr.row[m] ? `${qr.row[m]}` : `ref ${pr.row[m]} vs ours ${qr.row[m]}`,
    );
  }
  report(`prefs.row${r + 1}.y`, pr.row.y === qr.row.y, pr.row.y === qr.row.y ? `${qr.row.y}` : `ref ${pr.row.y} vs ours ${qr.row.y}`);
  for (const m of ["text", "fontSize", "fontWeight", "color", "lineHeight"]) {
    report(
      `prefs.row${r + 1}.title.${m}`,
      pr.title?.[m] === qr.title?.[m],
      pr.title?.[m] === qr.title?.[m] ? `${qr.title?.[m]}` : `ref ${pr.title?.[m]} vs ours ${qr.title?.[m]}`,
    );
  }
  for (const m of ["text", "fontSize", "color", "lineHeight"]) {
    report(
      `prefs.row${r + 1}.subtitle.${m}`,
      pr.subtitle?.[m] === qr.subtitle?.[m],
      pr.subtitle?.[m] === qr.subtitle?.[m] ? `${qr.subtitle?.[m]}` : `ref ${pr.subtitle?.[m]} vs ours ${qr.subtitle?.[m]}`,
    );
  }
  for (const m of ["w", "h", "cursor"]) {
    report(
      `prefs.row${r + 1}.checkbox.${m}`,
      pr.checkbox[m] === qr.checkbox[m],
      pr.checkbox[m] === qr.checkbox[m] ? `${qr.checkbox[m]}` : `ref ${pr.checkbox[m]} vs ours ${qr.checkbox[m]}`,
    );
  }
}

const bad = results.filter((r) => !r.ok);
console.log(
  `--- PARITY-ACCOUNT RESULT: ${results.length - bad.length}/${results.length} members MATCH (both apps, same round) ---`,
);
if (bad.length > 0) {
  console.log(`DRIFT/ERROR count: ${bad.length}`);
  process.exit(1);
}
process.exit(0);
