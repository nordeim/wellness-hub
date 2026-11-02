// parity-authviews.mjs — the TWELFTH committed parity surface (WH-46,
// F-1): the login family's FORGOT + SENT + SIGNUP views — three of the
// four non-signin views (the login view itself rode parity-login since
// WH-36; the VERIFY view stays data-blocked: the reference's OTP
// delivery is email-only, the PAD §11 standing block). The (l) e2e leg
// pins OUR five views' geometry standing; this surface is the
// live-vs-live read — the reference's re-authorings of these views
// fire same-round from now on.
//
//   node scripts/parity-authviews.mjs      (our dev server must be up)
//
// ZERO-LOGIN on both sides (logged-out views — no reference login
//   budget, no dev-server login budget) and ZERO-WRITE on the
//   reference: the view swaps are client state, and the reference's
//   own "Send reset link" renders the sent view PURELY FROM CLIENT
//   STATE — no network fires (the login-reset.ts session-11 decode).
//   Our side: ONE no-enumeration POST /api/auth/forgot-password per
//   flight with a NONEXISTENT probe email — the same 200 + message
//   whether or not the account exists, zero account impact (the
//   forgot limiter is 10/15min; pace re-flights accordingly).
//
// PASS A (the reference): /login at 1280×900 → Forgot password? → the
//   reset view read → fill parity-probe@example.com → Send reset link
//   → the sent view read → Back to sign in → Need an account? Sign up
//   → the signup view read. PASS B (our dev server): the same walk.
//   Then the DIFF: every member compared live-vs-live, exit 1 on any
//   DRIFT/PROBE-ERROR.
//
// THE MEMBER SET (~190): the FORGOT view (the landscape counts, the
//   back button's face + 16px icon + gap, the h2 title, the
//   description p, the email label, the input box's full anatomy —
//   w/h/radius/border/bg/font/paddingLeft/placeholder — the 16px
//   slate-400 mail icon, the Send reset link button, the view
//   y-ladder) + the SENT view (the 64px icon circle + its 28px icon,
//   the h2, the email line + the medium-weight span, the 368px green
//   callout, the centered back button, the ladder) + the SIGNUP view
//   (the landscape counts, the back button, the h2, the three labels,
//   the three inputs' full anatomy + placeholders, the Create account
//   submit, the field y-ladder 263/291/369/455/541/601).
//
// THE SERIALIZATION CLASSES (decoded live at WH-46 before this script
// was written — a naive string diff would false-DRIFT on every one):
//   (a) oklab/rgba alpha — our BUILD-TIME Tailwind v4 emits the
//       inputs' slate-50/50 wash and the callout's green-50/70 as
//       oklab(...), the reference's CDN runtime compiler emits
//       rgba(...). Cure: the 1×1-canvas composite (the parity-login
//       class (a), verbatim — the byte quad is identical across
//       serializations because the canvas does the math).
//   (b) rounded-full 9999px vs calc(infinity) — the sent icon circle.
//       Cure: the is-round normalization (the parity-login class (c),
//       verbatim — parsed radius ≥ half the disc's width is the
//       rendered fact).
//   (c) the input padding box-model split — the reference's inputs
//       compute paddingTop 8px where ours compute 0px, with the
//       rendered 44px boxes and the y-ladders byte-identical (8px pad
//       + 26px content vs 0px pad + 42px content center the line box
//       at the same offset). The member is the RENDERED BOX (w/h/y) +
//       the placeholder face — the padding arm is NEVER asserted (the
//       lesson-43 GEOMETRY form: the bounding box is the fact, the
//       mechanism is not).
//
// PINNED DOCUMENTED DEVIATIONS (asserted as BOTH-APPS-AT-THEIR-OWN-
// DOCUMENTED-VALUES — a pin failing is a DRIFT, never a silent
// re-base): the INHERITED-INK TOKEN SPLIT — the reference's inherited
// ink is zinc-950 rgb(9, 9, 11); ours is neutral-950 rgb(10, 10, 10)
// (the --color-foreground token). It shows at the inputs and the
// callout's box arm (no explicit class overrides there). At rest the
// inputs render only the PLACEHOLDER (slate-400, matched
// byte-for-byte) — the ink has zero rendered-pixel consequence until
// a user types; the reference's own internal zinc/neutral mix is
// documented by the WH-44 theme-mode decode (its own card title
// computes neutral-950 rgb(10, 10, 10)). Pinned at both apps' own
// values; if either app re-authors its ink token, the pin fires
// same-round.
//
// DOM-SHAPE FACTS (decoded, zero rendered-face consequence — the
// lesson-27/48 class, documented not cured): the sent callout's text
// carries NO inner <p> on either app (calloutP null on both); the
// email line concatenates "…instructions to" + the span with no
// space on both apps (the reference's own markup).
//
// Exit 0 when every member matches; exit 1 on any DRIFT or
// PROBE-ERROR — a drift is a FINDING for the round's plan (the
// lesson-41 live-fact class: investigate, never a silent re-base).

import { chromium } from "@playwright/test";

const REF = "https://evolve-well-d6cec85d.base44.app";
const DEV = "http://localhost:3000";
const PROBE_EMAIL = "parity-probe@example.com";

const results = [];
const report = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "MATCH " : "DRIFT "} ${member}: ${detail}`);
};
/** The PINNED-deviation reporter: both apps must sit at their OWN
 *  documented values (the token-split class) — a pin that fails is a
 *  drift (either app's ink token moved). */
const pinned = (member, ok, detail) => {
  results.push({ member, ok });
  console.log(`${ok ? "PINNED" : "DRIFT "} ${member}: ${detail}`);
};

/** SPA-safe navigation — the parity-login gotoApp form, verbatim. */
const gotoApp = async (page, base, route, { sel = "h1", settleMs = 900 } = {}) => {
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  await page.waitForSelector(sel, { timeout: 15000 });
  await page.waitForTimeout(settleMs);
};

/** One app's full zero-login walk: the FORGOT view read → the SENT
 *  view read → the SIGNUP view read. Raw computed strings + the
 *  in-page canvas/is-round normalizations; every remaining
 *  normalization runs Node-side, one implementation for both apps. */
const runPass = async (page, base) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await gotoApp(page, base, "/login");

  // ---- the FORGOT (reset) view ----
  await page.locator("button", { hasText: "Forgot password?" }).first().click({ timeout: 8000 });
  await page.waitForTimeout(900);
  const reset = await page.evaluate(() => {
    const cs = (el, props) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const o = {};
      for (const p of props) o[p] = s[p];
      return o;
    };
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };
    // the canvas composite — class (a): the byte quad of the computed
    // color filled over opaque black (identical across oklab/rgba
    // serializations because the canvas does the math).
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
    const btnByText = (t) =>
      Array.from(document.querySelectorAll("button")).find((b) =>
        (b.textContent || "").toLowerCase().includes(t.toLowerCase()),
      );
    const back = btnByText("back to sign in");
    const backIcon = back ? back.querySelector("svg") : null;
    const h2 = document.querySelector("h2");
    const desc = h2 ? h2.parentElement.querySelector("p") : null;
    const form = document.querySelector("form");
    const label = form ? form.querySelector("label") : null;
    const input = form ? form.querySelector("input") : null;
    const inputIcon = form ? form.querySelector("svg") : null;
    const send = btnByText("send reset link");
    return {
      landscape: {
        h2Count: document.querySelectorAll("h2").length,
        formCount: document.querySelectorAll("form").length,
        inputCount: form ? form.querySelectorAll("input").length : 0,
        buttonCount: document.querySelectorAll("button").length,
      },
      back: {
        text: back ? back.textContent.trim() : null,
        ...cs(back, ["fontSize", "fontWeight", "color", "display", "gap"]),
        iconW: backIcon ? Math.round(backIcon.getBoundingClientRect().width) : null,
        ...rect(back),
      },
      h2: {
        text: h2 ? h2.textContent.trim() : null,
        ...cs(h2, ["fontSize", "fontWeight", "color", "lineHeight"]),
        ...rect(h2),
      },
      desc: {
        text: desc ? desc.textContent.trim().slice(0, 60) : null,
        ...cs(desc, ["fontSize", "color", "lineHeight"]),
        ...rect(desc),
      },
      label: {
        text: label ? label.textContent.trim() : null,
        ...cs(label, ["fontSize", "fontWeight", "color", "display"]),
      },
      input: {
        type: input ? input.type : null,
        placeholder: input ? input.placeholder : null,
        ...rect(input),
        ...cs(input, [
          "color", "borderRadius", "fontSize",
          "paddingLeft", "borderWidth", "borderColor",
        ]),
        bgNorm: input ? norm(getComputedStyle(input).backgroundColor) : null,
      },
      inputIcon: cs(inputIcon, ["width", "height", "color"]),
      send: {
        text: send ? send.textContent.trim() : null,
        ...rect(send),
        ...cs(send, [
          "backgroundColor", "color", "borderRadius", "fontSize",
          "fontWeight", "borderWidth",
        ]),
      },
      ladder: [back, h2, desc, label, input, send].map((el) =>
        el ? Math.round(el.getBoundingClientRect().y) : null,
      ),
    };
  });

  // ---- the SENT view (the reference: pure client state; ours: the
  // no-enumeration POST with a nonexistent probe email) ----
  await page.fill("input[type=email]", PROBE_EMAIL);
  await page.locator("button", { hasText: "Send reset link" }).first().click({ timeout: 8000 });
  await page.waitForTimeout(1200);
  const sent = await page.evaluate(() => {
    const cs = (el, props) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const o = {};
      for (const p of props) o[p] = s[p];
      return o;
    };
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };
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
    const h2 = document.querySelector("h2");
    // the icon circle: the square rounded element 40..90px wrapping an svg
    const circle = Array.from(document.querySelectorAll("div")).find((d) => {
      const r = d.getBoundingClientRect();
      return (
        r.width >= 40 && r.width <= 90 && Math.abs(r.width - r.height) < 2 && d.querySelector("svg") !== null
      );
    });
    const csCircle = circle ? getComputedStyle(circle) : null;
    // class (b): is the circle ROUND? (parsed radius >= half the width —
    // 9999px and calc(infinity) both read true at 64px; the rendered fact)
    const circleRound = circle && csCircle ? parseFloat(csCircle.borderRadius) >= circle.getBoundingClientRect().width / 2 : null;
    const circleIcon = circle ? circle.querySelector("svg") : null;
    const emailLine = Array.from(document.querySelectorAll("p")).find((p) =>
      /sent password reset|parity-probe/i.test(p.textContent || ""),
    );
    const emailSpan = emailLine ? emailLine.querySelector("span, b, strong") : null;
    // the green callout: the green-50/70 box (the composite class (a))
    const callout = Array.from(document.querySelectorAll("div")).find((d) => {
      if (!(d.className || "").toString().includes("green")) return false;
      const s = getComputedStyle(d);
      return s.borderRadius !== "0px" && d.getBoundingClientRect().width > 200;
    });
    const calloutP = callout ? callout.querySelector("p") : null;
    const back = Array.from(document.querySelectorAll("button")).find((b) =>
      /back to sign in/i.test(b.textContent || ""),
    );
    return {
      h2: {
        text: h2 ? h2.textContent.trim() : null,
        ...cs(h2, ["fontSize", "fontWeight", "color"]),
        ...rect(h2),
      },
      circle: {
        ...rect(circle),
        bg: csCircle ? csCircle.backgroundColor : null,
        round: circleRound,
      },
      circleIcon: circleIcon
        ? { w: Math.round(circleIcon.getBoundingClientRect().width), ...cs(circleIcon, ["color"]) }
        : null,
      emailLine: emailLine
        ? { text: (emailLine.textContent || "").trim().slice(0, 70), ...cs(emailLine, ["fontSize", "color"]) }
        : null,
      emailSpan: emailSpan
        ? { text: (emailSpan.textContent || "").trim(), ...cs(emailSpan, ["fontWeight", "color"]) }
        : null,
      callout: callout
        ? {
            text: (callout.textContent || "").trim().slice(0, 80),
            ...rect(callout),
            ...cs(callout, ["borderColor", "borderRadius", "fontSize", "color"]),
            bgNorm: norm(getComputedStyle(callout).backgroundColor),
          }
        : null,
      calloutP: calloutP ? cs(calloutP, ["lineHeight", "fontSize"]) : null,
      back: back
        ? {
            text: back.textContent.trim(),
            ...cs(back, ["fontSize", "color", "display", "justifyContent"]),
            ...rect(back),
          }
        : null,
      ladder: [circle, h2, emailLine, callout, back].map((el) =>
        el ? Math.round(el.getBoundingClientRect().y) : null,
      ),
    };
  });

  // ---- back to signin, then the SIGNUP view ----
  await page.locator("button", { hasText: "Back to sign in" }).first().click({ timeout: 8000 });
  await page.waitForTimeout(600);
  await page.locator("button", { hasText: "Sign up" }).first().click({ timeout: 8000 });
  await page.waitForTimeout(900);
  const signup = await page.evaluate(() => {
    const cs = (el, props) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const o = {};
      for (const p of props) o[p] = s[p];
      return o;
    };
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    };
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
    const btnByText = (t) =>
      Array.from(document.querySelectorAll("button")).find((b) =>
        (b.textContent || "").toLowerCase().includes(t.toLowerCase()),
      );
    const back = btnByText("back to sign in");
    const backIcon = back ? back.querySelector("svg") : null;
    const h2 = document.querySelector("h2");
    const form = document.querySelector("form");
    const labels = form ? Array.from(form.querySelectorAll("label")) : [];
    const inputs = form ? Array.from(form.querySelectorAll("input")) : [];
    const submit = form ? form.querySelector('button[type=submit]') : null;
    return {
      landscape: {
        h2Count: document.querySelectorAll("h2").length,
        formCount: document.querySelectorAll("form").length,
        inputCount: inputs.length,
        labelCount: labels.length,
      },
      back: {
        text: back ? back.textContent.trim() : null,
        ...cs(back, ["fontSize", "fontWeight", "color", "display", "gap"]),
        iconW: backIcon ? Math.round(backIcon.getBoundingClientRect().width) : null,
        ...rect(back),
      },
      h2: {
        text: h2 ? h2.textContent.trim() : null,
        ...cs(h2, ["fontSize", "fontWeight", "color", "lineHeight"]),
        ...rect(h2),
      },
      labels: labels.map((l) => ({
        text: l.textContent.trim(),
        ...cs(l, ["fontSize", "fontWeight", "color", "display"]),
      })),
      inputs: inputs.map((i) => ({
        type: i.type,
        placeholder: i.placeholder,
        ...rect(i),
        ...cs(i, [
          "color", "borderRadius", "fontSize",
          "paddingLeft", "borderWidth", "borderColor",
        ]),
        bgNorm: norm(getComputedStyle(i).backgroundColor),
      })),
      submit: {
        text: submit ? submit.textContent.trim() : null,
        ...rect(submit),
        ...cs(submit, [
          "backgroundColor", "color", "borderRadius", "fontSize",
          "fontWeight", "borderWidth",
        ]),
      },
      ladder: [back, h2, ...inputs, submit].map((el) =>
        el ? Math.round(el.getBoundingClientRect().y) : null,
      ),
    };
  });
  return { reset, sent, signup };
};

// ---------- PASS A: the reference (zero-login) ----------
const browser = await chromium.launch();
const page = await browser.newPage();
console.log("--- PASS A: the reference (the zero-login walk) ---");
const ref = await runPass(page, REF);
await browser.close();

// ---------- PASS B: our dev server (zero-login) ----------
const browser2 = await chromium.launch();
const page2 = await browser2.newPage();
console.log("--- PASS B: our dev server (the zero-login walk) ---");
const ours = await runPass(page2, DEV);
await browser2.close();

// ---------- THE DIFF ----------
const A = ref;
const B = ours;

// ===== the FORGOT (reset) view =====
for (const m of ["h2Count", "formCount", "inputCount", "buttonCount"]) {
  report(`reset.landscape.${m}`, A.reset.landscape[m] === B.reset.landscape[m], `${B.reset.landscape[m]} (ref ${A.reset.landscape[m]})`);
}
for (const m of ["text", "fontSize", "fontWeight", "color", "display", "gap", "iconW", "y", "w", "h"]) {
  report(`reset.back.${m}`, A.reset.back[m] === B.reset.back[m], A.reset.back[m] === B.reset.back[m] ? `${B.reset.back[m]}` : `ref ${A.reset.back[m]} vs ours ${B.reset.back[m]}`);
}
for (const m of ["text", "fontSize", "fontWeight", "color", "lineHeight", "w", "h"]) {
  report(`reset.h2.${m}`, A.reset.h2[m] === B.reset.h2[m], A.reset.h2[m] === B.reset.h2[m] ? `${B.reset.h2[m]}` : `ref ${A.reset.h2[m]} vs ours ${B.reset.h2[m]}`);
}
for (const m of ["text", "fontSize", "color", "lineHeight", "w", "h"]) {
  report(`reset.desc.${m}`, A.reset.desc[m] === B.reset.desc[m], A.reset.desc[m] === B.reset.desc[m] ? `${B.reset.desc[m]}` : `ref ${A.reset.desc[m]} vs ours ${B.reset.desc[m]}`);
}
for (const m of ["text", "fontSize", "fontWeight", "color", "display"]) {
  report(`reset.label.${m}`, A.reset.label[m] === B.reset.label[m], A.reset.label[m] === B.reset.label[m] ? `${B.reset.label[m]}` : `ref ${A.reset.label[m]} vs ours ${B.reset.label[m]}`);
}
for (const m of ["type", "placeholder", "y", "w", "h", "bgNorm", "borderRadius", "fontSize", "paddingLeft", "borderWidth", "borderColor"]) {
  report(`reset.input.${m}`, A.reset.input[m] === B.reset.input[m], A.reset.input[m] === B.reset.input[m] ? `${B.reset.input[m]}` : `ref ${A.reset.input[m]} vs ours ${B.reset.input[m]}`);
}
for (const m of ["width", "height", "color"]) {
  report(`reset.inputIcon.${m}`, A.reset.inputIcon[m] === B.reset.inputIcon[m], A.reset.inputIcon[m] === B.reset.inputIcon[m] ? `${B.reset.inputIcon[m]}` : `ref ${A.reset.inputIcon[m]} vs ours ${B.reset.inputIcon[m]}`);
}
for (const m of ["text", "y", "w", "h", "backgroundColor", "color", "borderRadius", "fontSize", "fontWeight", "borderWidth"]) {
  report(`reset.send.${m}`, A.reset.send[m] === B.reset.send[m], A.reset.send[m] === B.reset.send[m] ? `${B.reset.send[m]}` : `ref ${A.reset.send[m]} vs ours ${B.reset.send[m]}`);
}
for (let i = 0; i < A.reset.ladder.length; i++) {
  report(`reset.ladder${i + 1}`, A.reset.ladder[i] === B.reset.ladder[i], A.reset.ladder[i] === B.reset.ladder[i] ? `${B.reset.ladder[i]}` : `ref ${A.reset.ladder[i]} vs ours ${B.reset.ladder[i]}`);
}

// ===== the SENT view =====
for (const m of ["text", "fontSize", "fontWeight", "color", "w", "h"]) {
  report(`sent.h2.${m}`, A.sent.h2[m] === B.sent.h2[m], A.sent.h2[m] === B.sent.h2[m] ? `${B.sent.h2[m]}` : `ref ${A.sent.h2[m]} vs ours ${B.sent.h2[m]}`);
}
for (const m of ["y", "w", "h", "bg", "round"]) {
  report(`sent.circle.${m}`, A.sent.circle[m] === B.sent.circle[m], A.sent.circle[m] === B.sent.circle[m] ? `${B.sent.circle[m]}` : `ref ${A.sent.circle[m]} vs ours ${B.sent.circle[m]}`);
}
for (const m of ["w", "color"]) {
  report(`sent.circleIcon.${m}`, A.sent.circleIcon[m] === B.sent.circleIcon[m], A.sent.circleIcon[m] === B.sent.circleIcon[m] ? `${B.sent.circleIcon[m]}` : `ref ${A.sent.circleIcon[m]} vs ours ${B.sent.circleIcon[m]}`);
}
for (const m of ["text", "fontSize", "color"]) {
  report(`sent.emailLine.${m}`, A.sent.emailLine[m] === B.sent.emailLine[m], A.sent.emailLine[m] === B.sent.emailLine[m] ? `${B.sent.emailLine[m]}` : `ref ${A.sent.emailLine[m]} vs ours ${B.sent.emailLine[m]}`);
}
for (const m of ["text", "fontWeight", "color"]) {
  report(`sent.emailSpan.${m}`, A.sent.emailSpan[m] === B.sent.emailSpan[m], A.sent.emailSpan[m] === B.sent.emailSpan[m] ? `${B.sent.emailSpan[m]}` : `ref ${A.sent.emailSpan[m]} vs ours ${B.sent.emailSpan[m]}`);
}
for (const m of ["text", "y", "w", "h", "bgNorm", "borderColor", "borderRadius", "fontSize"]) {
  report(`sent.callout.${m}`, A.sent.callout[m] === B.sent.callout[m], A.sent.callout[m] === B.sent.callout[m] ? `${B.sent.callout[m]}` : `ref ${A.sent.callout[m]} vs ours ${B.sent.callout[m]}`);
}
report("sent.calloutP", JSON.stringify(A.sent.calloutP) === JSON.stringify(B.sent.calloutP), `${JSON.stringify(B.sent.calloutP)} (the no-inner-p DOM-shape fact, both apps)`);
for (const m of ["text", "fontSize", "color", "display", "justifyContent", "w", "h"]) {
  report(`sent.back.${m}`, A.sent.back[m] === B.sent.back[m], A.sent.back[m] === B.sent.back[m] ? `${B.sent.back[m]}` : `ref ${A.sent.back[m]} vs ours ${B.sent.back[m]}`);
}
for (let i = 0; i < A.sent.ladder.length; i++) {
  report(`sent.ladder${i + 1}`, A.sent.ladder[i] === B.sent.ladder[i], A.sent.ladder[i] === B.sent.ladder[i] ? `${B.sent.ladder[i]}` : `ref ${A.sent.ladder[i]} vs ours ${B.sent.ladder[i]}`);
}

// ===== the SIGNUP view =====
for (const m of ["h2Count", "formCount", "inputCount", "labelCount"]) {
  report(`signup.landscape.${m}`, A.signup.landscape[m] === B.signup.landscape[m], `${B.signup.landscape[m]} (ref ${A.signup.landscape[m]})`);
}
for (const m of ["text", "fontSize", "fontWeight", "color", "display", "gap", "iconW", "y", "w", "h"]) {
  report(`signup.back.${m}`, A.signup.back[m] === B.signup.back[m], A.signup.back[m] === B.signup.back[m] ? `${B.signup.back[m]}` : `ref ${A.signup.back[m]} vs ours ${B.signup.back[m]}`);
}
for (const m of ["text", "fontSize", "fontWeight", "color", "lineHeight", "w", "h"]) {
  report(`signup.h2.${m}`, A.signup.h2[m] === B.signup.h2[m], A.signup.h2[m] === B.signup.h2[m] ? `${B.signup.h2[m]}` : `ref ${A.signup.h2[m]} vs ours ${B.signup.h2[m]}`);
}
for (let i = 0; i < Math.min(A.signup.labels.length, B.signup.labels.length); i++) {
  for (const m of ["text", "fontSize", "fontWeight", "color", "display"]) {
    report(
      `signup.label${i + 1}.${m}`,
      A.signup.labels[i][m] === B.signup.labels[i][m],
      A.signup.labels[i][m] === B.signup.labels[i][m] ? `${B.signup.labels[i][m]}` : `ref ${A.signup.labels[i][m]} vs ours ${B.signup.labels[i][m]}`,
    );
  }
}
for (let i = 0; i < Math.min(A.signup.inputs.length, B.signup.inputs.length); i++) {
  for (const m of ["type", "placeholder", "y", "w", "h", "bgNorm", "borderRadius", "fontSize", "paddingLeft", "borderWidth", "borderColor"]) {
    report(
      `signup.input${i + 1}.${m}`,
      A.signup.inputs[i][m] === B.signup.inputs[i][m],
      A.signup.inputs[i][m] === B.signup.inputs[i][m] ? `${B.signup.inputs[i][m]}` : `ref ${A.signup.inputs[i][m]} vs ours ${B.signup.inputs[i][m]}`,
    );
  }
}
for (const m of ["text", "y", "w", "h", "backgroundColor", "color", "borderRadius", "fontSize", "fontWeight", "borderWidth"]) {
  report(`signup.submit.${m}`, A.signup.submit[m] === B.signup.submit[m], A.signup.submit[m] === B.signup.submit[m] ? `${B.signup.submit[m]}` : `ref ${A.signup.submit[m]} vs ours ${B.signup.submit[m]}`);
}
for (let i = 0; i < A.signup.ladder.length; i++) {
  report(`signup.ladder${i + 1}`, A.signup.ladder[i] === B.signup.ladder[i], A.signup.ladder[i] === B.signup.ladder[i] ? `${B.signup.ladder[i]}` : `ref ${A.signup.ladder[i]} vs ours ${B.signup.ladder[i]}`);
}

// ===== the PINNED members (the inherited-ink token split) =====
pinned(
  "reset.input.ink (PINNED: the inherited-ink token split)",
  A.reset.input.color === "rgb(9, 9, 11)" && B.reset.input.color === "rgb(10, 10, 10)",
  `ref ${A.reset.input.color} (zinc-950) / ours ${B.reset.input.color} (neutral-950) — the at-rest no-render class (the placeholder is the rendered face)`,
);
pinned(
  "sent.callout.ink (PINNED: the callout box's inherited arm)",
  A.sent.callout?.color === "rgb(9, 9, 11)" && B.sent.callout?.color === "rgb(10, 10, 10)",
  `ref ${A.sent.callout?.color} / ours ${B.sent.callout?.color} — the box arm; the rendered p-less text rides the same inherited ink on both`,
);
for (let i = 0; i < Math.min(A.signup.inputs.length, B.signup.inputs.length); i++) {
  pinned(
    `signup.input${i + 1}.ink (PINNED: the inherited-ink token split)`,
    A.signup.inputs[i].color === "rgb(9, 9, 11)" && B.signup.inputs[i].color === "rgb(10, 10, 10)",
    `ref ${A.signup.inputs[i].color} (zinc-950) / ours ${B.signup.inputs[i].color} (neutral-950)`,
  );
}

const bad = results.filter((r) => !r.ok);
console.log(
  `--- PARITY-AUTHVIEWS RESULT: ${results.length - bad.length}/${results.length} members MATCH (both apps, same round) ---`,
);
if (bad.length > 0) {
  console.log(`DRIFT/ERROR count: ${bad.length}`);
  process.exit(1);
}
process.exit(0);
