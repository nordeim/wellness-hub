import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AxeResults } from "axe-core";

// WH-17 (F-7): the a11y net — the accessibility assertion layer. The docs
// claimed WCAG AA (README's superset row, SKILL §8's contrast math) through
// sixteen rounds while ZERO tests read semantics: the exact WH-16 error
// class (the console shipped error-free claims behind a gate that never
// read the console). This net is the family pattern (the repo's own
// skills/web-application/SKILL.md §2: "A11y | axe-core (Playwright) | A11y
// assertions in the e2e suite, not just manual review").
//
// The net's RED was deterministic (unlike the WH-16 timing race): pre-cure
// it flagged the chip vocabulary (30 color-contrast nodes on Routines/
// Learning — every rendered chip rode the stale -50/-600 form at
// 3.07–3.58:1), the Watch-Now overlay labels (12 label-content-name-
// mismatch nodes), the Goals badge-catalog text (8 nodes at 4.48:1), the
// Profile theme-mode chips (6 nodes — the active chip's indigo-500 text
// on a 10% wash at 3.71:1) and the drawer's footer subtitle (1 node at
// 3.1:1). The cures landed with the net in the same commit; the counts
// above are the audit's evidence, not a live state.
//
// Scope decisions (the plan's §3):
// - WCAG 2.1 A+AA tags (the docs' claim); WCAG 2.2 deferred to a future
//   widening round.
// - WH-18: the deferral retired — the tags widen to 2.1+2.2 A+AA on every
//   walk (the light surfaces probed clean at 2.2 first; the standard the
//   docs claim moves to "WCAG 2.1+2.2 A+AA").
// - STRICT ZERO violations, no ignore list. If a legitimate benign class
//   ever appears, the net FAILS and that round cures it or pins the
//   documented ignore entry — the console-net doctrine verbatim.
// - axe "incomplete" results (gradient washes — axe cannot resolve
//   backgrounds under CSS gradients) are not violations; the net asserts
//   violations only. The mobile drawer (solid sheet) is the assertion
//   surface for the sidebar-family colors the desktop gradient hides.
// - The reference's OWN a11y state (axe-walked this round for the parity
//   ledger): its Dashboard carries a text-gray-400 contrast fail, its
//   Learning an unnamed button, its Profile four unnamed buttons + two
//   unlabeled sliders + the tab-strip contrast fails our superset cures.
//   Our tree is held to ZERO.
//
// WH-18 (F-5): the rendered-STATES widening — every net, capture and e2e
// walked LIGHT mode only through seventeen rounds while the mode a user
// flips in one Profile click shipped broken (the dark:* utilities rode
// the prefers-color-scheme media query — v4's default — never the .dark
// class the theme store flips; 138 axe nodes in dark, gray-400-on-white
// for every OS-dark user in light). The new walks: the DARK state (every
// module route + the open drawer, flipped through the real Profile UI,
// reverted at the end — the probe-hygiene protocol INSIDE the suite),
// the OS-DARK CORNER (colorScheme dark + mode light — the reverse leak,
// asserted classless AND clean), the DARK LOGIN (the persisted state
// seeded on the logged-out surface — the ThemeBoot mount's pin), and the
// DARK INTERACTIONS (an open Select listbox + a live toast — the two
// transient surfaces the route walks can never see).

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"];

/** The reference's own capitalized hrefs — the same route family the
 * shell walker and the console-hygiene net walk. */
const MODULE_ROUTES = [
  "/Dashboard", "/Routines", "/Exercise", "/MentalHealth", "/Assignments",
  "/Events", "/StudyResources", "/Reminders", "/Learning", "/Goals",
  "/Profile",
];

/** Format an axe violation for the failure message (route + rule + the
 * first targets — enough to diagnose without flooding the log). */
function describeViolations(route: string, violations: AxeResults["violations"]): string[] {
  return violations.map(
    (v) => `${route} :: ${v.id} (${v.nodes.length}) :: ${v.help} :: ${v.nodes
      .slice(0, 3)
      .map((n) => n.target.join(" "))
      .join(" | ")}`,
  );
}

test.describe("a11y net — authenticated surfaces (the shared session cookie)", () => {
  test("every module route passes WCAG 2.1 AA (axe)", async ({ page }) => {
    // WH-18: normalize the mode FIRST. The dark-state tests below flip
    // the account's SERVER prefs (the setTheme PUT), and the e2e prefs
    // row survives across runs (the seed reseeds content, not prefs) —
    // a dark test that failed before its revert would otherwise leave
    // THIS walk inheriting dark pages. The unconditional Light click is
    // idempotent and self-heals any polluted state.
    await page.goto("/Profile", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Light", exact: true }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    const offenders: string[] = [];
    for (const route of MODULE_ROUTES) {
      await page.goto(route, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      offenders.push(...describeViolations(route, results.violations));
    }
    expect(
      offenders,
      "a11y net: every module route must pass WCAG 2.1 A+AA with ZERO violations — cure the writer or pin a documented ignore entry, never silence the net",
    ).toEqual([]);
  });
});

test.describe("a11y net — the mobile drawer", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("the open drawer passes WCAG 2.1 AA (axe)", async ({ page }) => {
    await page.goto("/Dashboard", { waitUntil: "networkidle" });
    await page.locator('button[aria-label="Toggle Sidebar"]').click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    await page.waitForTimeout(300);
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    const offenders = describeViolations("drawer-open", results.violations);
    expect(
      offenders,
      "a11y net: the open mobile drawer must pass WCAG 2.1 A+AA — the drawer's solid sheet is the assertion surface for the sidebar-family colors the desktop gradient wash hides from axe",
    ).toEqual([]);
  });
});

test.describe("a11y net — the logged-out login page", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("the login page passes WCAG 2.1 AA (axe)", async ({ page }) => {
    await page.goto("/login", { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    const offenders = describeViolations("/login", results.violations);
    expect(
      offenders,
      "a11y net: the login page (the app's root face) must pass WCAG 2.1 A+AA",
    ).toEqual([]);
  });
});

// WH-18 (F-5): the DARK state — flipped through the real Profile UI (the
// user's path), walked on every module route + the open drawer, asserted
// at 2.1+2.2 A+AA strict zero AND console-clean (the console net's
// collectors riding the dark walk — the state never walked before this
// round shipped 138 contrast-violation nodes through green gates).
// The flip is REVERTED at the end (the UI Light click, which PUTs to
// /api/prefs) so the specs that follow see the light server prefs — the
// probe-hygiene protocol inside the suite.
test.describe("a11y net — the dark state (the WH-18 widening)", () => {
  // The hygiene protocol as an afterEach: a failure mid-walk must not
  // leave the account's server prefs dark for the specs that follow —
  // the state pollution the first RED run taught (the light walk above
  // self-heals, but the revert belongs to the test that flipped). The
  // revert VERIFIES THE PUT LANDED (polling /api/prefs — the setTheme
  // server sync is fire-and-forget, and a revert whose PUT races the
  // context teardown is no revert: the WH-16 lesson, applied to the
  // suite's own hygiene).
  test.afterEach(async ({ page }) => {
    try {
      await page.goto("/Profile", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Light", exact: true }).click({ timeout: 5000 });
      await expect(page.locator("html")).not.toHaveClass(/dark/, { timeout: 5000 });
      await expect
        .poll(
          async () => {
            const body = await page.evaluate(async () => {
              const res = await fetch("/api/prefs");
              return res.json();
            });
            return body?.data?.themeMode ?? "(unsaved)";
          },
          { timeout: 5000 },
        )
        .toBe("light");
    } catch {
      /* best-effort — the next test's normalization is the backstop */
    }
  });

  test("every module route + the drawer pass WCAG 2.1+2.2 AA in dark mode, console-clean", async ({ page }) => {
    const console_offenders: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        console_offenders.push(`[${msg.type()}] ${msg.text().split("\n")[0]}`);
      }
    });
    page.on("pageerror", (err) => console_offenders.push(`[pageerror] ${String(err)}`));

    // Flip Dark through the Profile's Theme Mode picker (the real path).
    await page.goto("/Profile", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Dark", exact: true }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    const offenders: string[] = [];
    for (const route of MODULE_ROUTES) {
      await page.goto(route, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      offenders.push(...describeViolations(`${route} [dark]`, results.violations));
    }

    // The open drawer in dark (the mobile sidebar-family surface) — the
    // same page shrunk to the mobile viewport (the md:hidden header
    // appears, the drawer opens, the solid sheet is the assertion
    // surface the desktop gradient wash hides from axe).
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard", { waitUntil: "networkidle" });
    await page.locator('button[aria-label="Toggle Sidebar"]').click();
    await page.locator('[role="dialog"]').waitFor({ state: "visible" });
    await page.waitForTimeout(300);
    const dres = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    offenders.push(...describeViolations("drawer-open [dark]", dres.violations));
    await page.locator('[role="dialog"]').getByRole("button", { name: "Close" }).click();
    await page.setViewportSize({ width: 1280, height: 900 });

    expect(
      offenders,
      "a11y net: every module route AND the open drawer must pass WCAG 2.1+2.2 A+AA in DARK mode with ZERO violations — the rendered state the gate never read through seventeen rounds",
    ).toEqual([]);
    expect(
      console_offenders,
      "console net (dark walk): the dark state must boot console-clean — the WH-16 doctrine extended to the state axis",
    ).toEqual([]);

    // Revert through the UI (the PUT lands server-side) — the hygiene
    // protocol: the specs that follow must see the light prefs.
    await page.goto("/Profile", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Light", exact: true }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});

// WH-18 (F-1 corner B): the OS-DARK CORNER — a user whose OS prefers dark
// while the app mode stays light. Before the cure the prefers-color-scheme
// media query fired WITHOUT the .dark class: every dark:* utility applied
// over the light tokens (gray-400 on WHITE cards, 2.54:1) — broken light
// mode for every OS-dark user who never touched a setting. After the
// class-based variant the corner is pure light: NO .dark class, and the
// walked routes pass the net.
test.describe("a11y net — the OS-dark corner (mode light, OS dark)", () => {
  test.use({ colorScheme: "dark" });

  test("an OS-dark user in light mode gets pure light — no .dark class, axe clean", async ({ page }) => {
    const offenders: string[] = [];
    for (const route of ["/Dashboard", "/Routines", "/Events", "/Profile"]) {
      await page.goto(route, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      const hasDark = await page.evaluate(() =>
        document.documentElement.classList.contains("dark"));
      if (hasDark) offenders.push(`${route} :: html carries .dark with themeMode=light (the media leak)`);
      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      offenders.push(...describeViolations(`${route} [os-dark/light]`, results.violations));
    }
    expect(
      offenders,
      "a11y net: an OS-dark user in light mode must get PURE LIGHT — the prefers-color-scheme media query must never leak dark:* utilities over the light tokens (the corner that gray-400-on-white'd every OS-dark user before WH-18)",
    ).toEqual([]);
  });
});

// WH-18 (F-3): the DARK LOGIN — the login family carries the chosen mode
// via ThemeBoot (the root-layout mount): the persisted dark state seeded
// on a logged-out context must apply on /login (the class on <html>) and
// the dark login must pass the net. Before the cure the store only
// mounted inside the (app) group — the class vanished on /login and the
// LOGIN_LAYOUT's authored dark vocabulary could only fire on the OS
// preference (the wrong trigger).
test.describe("a11y net — the dark login (the ThemeBoot mount)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("the seeded dark state applies on /login and passes the net", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "wellness-theme",
        JSON.stringify({ state: { themeMode: "dark" }, version: 0 }),
      );
    });
    await page.goto("/login", { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    const hasDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"));
    expect(
      hasDark,
      "the persisted dark state must apply on /login — the login family is the app's root face, not a light-only island (the ThemeBoot mount)",
    ).toBe(true);
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    const offenders = describeViolations("/login [dark]", results.violations);
    expect(
      offenders,
      "a11y net: the dark login must pass WCAG 2.1+2.2 A+AA — the LOGIN_LAYOUT's authored dark vocabulary, finally activatable",
    ).toEqual([]);
  });
});

// WH-18 (F-2): the DARK INTERACTIONS — the two transient surfaces the
// route walks can never see: an open Select (its highlighted option rode
// focus:text-neutral-900 over focus:bg-line-soft — near-black on
// near-black in dark before the cure) and a live toast (fixed bg-white
// with token text — text-foreground #fafafa on white, INVISIBLE in dark
// before the cure). Scoped axe (include) on each live element.
test.describe("a11y net — the dark interactions (select + toast)", () => {
  // The same afterEach hygiene as the dark-state walk (this test flips
  // the server prefs through the Profile UI too — with the same
  // PUT-landing verification).
  test.afterEach(async ({ page }) => {
    try {
      await page.goto("/Profile", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Light", exact: true }).click({ timeout: 5000 });
      await expect(page.locator("html")).not.toHaveClass(/dark/, { timeout: 5000 });
      await expect
        .poll(
          async () => {
            const body = await page.evaluate(async () => {
              const res = await fetch("/api/prefs");
              return res.json();
            });
            return body?.data?.themeMode ?? "(unsaved)";
          },
          { timeout: 5000 },
        )
        .toBe("light");
    } catch {
      /* best-effort — the next test's normalization is the backstop */
    }
  });

  test("the open select listbox and the live toast pass in dark mode", async ({ page }) => {
    // Dark via the Profile UI (the reliable path — the server sync
    // overrides a seeded local state on (app) pages).
    await page.goto("/Profile", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Dark", exact: true }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // The open Select: the Exercise log dialog's type picker.
    await page.goto("/Exercise", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Log Workout/ }).click();
    await page.locator("#workout-type").click();
    await page.locator('[role="listbox"]').waitFor({ state: "visible" });
    await page.waitForTimeout(250);
    const selectResults = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .include('[role="listbox"]')
      .analyze();
    const offenders = describeViolations("exercise select [dark]", selectResults.violations);
    await page.keyboard.press("Escape");
    await page.keyboard.press("Escape");

    // The live toast: a mood check-in fires "Mood check-in saved" (4s
    // lifetime — the scoped analyze fits; hovering pauses the timer).
    await page.goto("/MentalHealth", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "New Entry" }).click();
    await page.getByRole("button", { name: /Amazing/ }).click();
    await page.getByRole("button", { name: "Save Entry" }).click();
    const toast = page.locator('[role="status"]').first();
    await toast.waitFor({ state: "visible" });
    await toast.hover(); // pause the 4s auto-dismiss
    const toastResults = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .include('[role="status"]')
      .analyze();
    offenders.push(...describeViolations("toast [dark]", toastResults.violations));

    expect(
      offenders,
      "a11y net: the transient surfaces — the open Select's highlighted option and the live toast — must pass WCAG 2.1+2.2 A+AA in dark mode (the invisible-toast and unreadable-highlight classes the route walks never see)",
    ).toEqual([]);

    // Revert (the hygiene protocol).
    await page.goto("/Profile", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Light", exact: true }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});

// ---------------------------------------------------------------------------
// WH-19 (F-1/F-3/F-5): the DARK CORNERS — the surfaces OUTSIDE the WH-18
// walk set. Lesson 22's own coda: the net walked what it knew, and the
// records outside the walk set shipped with the same broken class — the
// signup view's title computed 1.0:1 on the dark card (an invisible
// "Create your account"), LOGIN_LAYOUT.subtitle 3.77:1 on /login with axe
// FALSE-PASSING it (the alpha card over the page gradient returns
// color-contrast incomplete, not a violation — the WH-18 dark-login walk
// stayed green with a real AA failure on the page), the whole 404 a light
// island in dark (its page root stays bg-slate-50).
//
// The computed-contrast leg (F-3): axe's color-contrast rule returns
// INCOMPLETE for text over semi-transparent cards on gradient pages — the
// login family (bg-white/95 over the slate-50→slate-100 page gradient, in
// dark bg-neutral-900/95 over neutral-900→950) is the axe-ambiguous
// family. The leg measures the RENDERED pages directly: ink vs the
// nearest opaque ancestor background (oklab-aware — Tailwind v4 computes
// oklch/oklab colors), the WCAG large-text rule applied per element
// (≥24px regular or ≥18.66px bold → 3:1, else 4.5:1). The same leg covers
// the LIGHT mode of the same routes — the alpha ambiguity is mode-blind.
//
// F-5: the 404's display heading — the reference's own 404 ships
// slate-300 on slate-50 at 1.42:1 (72px font-light, live-probed on the
// reference: rgb(203,213,225) on rgb(248,250,252)), an axe-RESOLVABLE
// failure no walk ever read (the net walked module routes only). Our tree
// is held to ZERO — the WH-17 superset doctrine: we supersede with a
// documented deviation (the tab-strip precedent), and the net pins it.
const CONTRAST_PROBE = String.raw`
(function () {
  function oklabToRgb(L, a, b) {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
    const enc = (x) => {
      x = Math.min(1, Math.max(0, x));
      return Math.round(255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055));
    };
    return [enc(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
            enc(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
            enc(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)];
  }
  function parseColor(str) {
    if (!str) return null;
    let m = str.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (m) return { rgb: [+m[1], +m[2], +m[3]], alpha: m[4] === undefined ? 1 : +m[4] };
    m = str.match(/oklab\(([\d.-]+) ([\d.e-]+) ([\d.e-]+)(?: \/ ([\d.]+))?\)/);
    if (m) return { rgb: oklabToRgb(+m[1], +m[2], +m[3]), alpha: m[4] === undefined ? 1 : +m[4] };
    m = str.match(/oklch\(([\d.-]+) ([\d.e-]+) ([\d.e-]+)(?: \/ ([\d.]+))?\)/);
    if (m) {
      const rad = (+m[3] / 360) * 2 * Math.PI;
      const c = oklabToRgb(+m[1], Math.cos(rad) * +m[2], Math.sin(rad) * +m[2]);
      return { rgb: c, alpha: m[4] === undefined ? 1 : +m[4] };
    }
    if (str === 'transparent') return { rgb: [0, 0, 0], alpha: 0 };
    return null;
  }
  function lum(rgb) {
    const c = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
    return 0.2126 * c(rgb[0]) + 0.7152 * c(rgb[1]) + 0.0722 * c(rgb[2]);
  }
  const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  function effBg(el) {
    let n = el;
    while (n && n !== document.documentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundImage && s.backgroundImage !== 'none') return { kind: 'gradient' };
      const p = parseColor(s.backgroundColor);
      if (p && p.alpha > 0.6) return { kind: 'solid', rgb: p.rgb };
      n = n.parentElement;
    }
    const p = parseColor(getComputedStyle(document.body).backgroundColor);
    return { kind: 'body', rgb: p ? p.rgb : [255, 255, 255] };
  }
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.offsetParent === null) continue;
    if (!(el.childElementCount === 0 && el.textContent && el.textContent.trim())) continue;
    const s = getComputedStyle(el);
    const ink = parseColor(s.color);
    if (!ink) continue;
    const bg = effBg(el);
    if (bg.kind === 'gradient') continue; // the axe-incomplete gradient family — measured separately (the preset axis)
    const px = parseFloat(s.fontSize);
    const bold = parseInt(s.fontWeight, 10) >= 700;
    const large = px >= 24 || (px >= 18.66 && bold);
    const need = large ? 3 : 4.5;
    const r = ratio(lum(ink.rgb), lum(bg.rgb));
    if (r < need) out.push({
      text: el.textContent.trim().slice(0, 28),
      ink: s.color, bg: 'rgb(' + bg.rgb.join(', ') + ')',
      need: need, got: +r.toFixed(2),
    });
  }
  return out;
})()`;

/** Run the computed-contrast probe in the page and return the offenders
 * (the axe-ambiguous alpha-card family — F-3). */
async function contrastOffenders(page: import("@playwright/test").Page, label: string) {
  const found = (await page.evaluate(CONTRAST_PROBE)) as Array<Record<string, unknown>>;
  return found.map((f) => `${label} :: ${String(f.text)} :: ink ${String(f.ink)} on ${String(f.bg)} :: needs ${String(f.need)}:1, got ${String(f.got)}:1`);
}

test.describe("a11y net — the dark corners (the WH-19 widening)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("/signup, /reset-password and the 404 pass in dark mode (axe + computed contrast, console-clean)", async ({ page }) => {
    const console_offenders: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        const text = msg.text().split("\n")[0];
        // The ONE documented ignore entry (the console-net doctrine): the
        // walk DELIBERATELY visits an unmatched route — the browser's
        // network-level "Failed to load resource: 404" message for the
        // document request itself is the expected status, not an app
        // error. Page errors and every other message stay strict-zero.
        if (/^Failed to load resource.*404/.test(text) && msg.location().url.includes("wh19-no-such-route")) return;
        console_offenders.push(`[${msg.type()}] ${text}`);
      }
    });
    page.on("pageerror", (err) => console_offenders.push(`[pageerror] ${String(err)}`));

    // Seed the persisted dark state (the ThemeBoot path — the logged-out
    // surfaces read the store, never the server prefs).
    await page.addInitScript(() => {
      localStorage.setItem(
        "wellness-theme",
        JSON.stringify({ state: { themeMode: "dark" }, version: 0 }),
      );
    });

    const offenders: string[] = [];
    for (const [label, route] of [
      ["signup", "/signup"],
      ["reset-password", "/reset-password"],
      ["404", "/wh19-no-such-route"],
    ] as const) {
      await page.goto(route, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      const hasDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
      if (!hasDark) offenders.push(`${label} [dark] :: html carries no .dark class (ThemeBoot must apply the persisted state on every logged-out surface)`);
      const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      offenders.push(...describeViolations(`${label} [dark]`, results.violations));
      offenders.push(...(await contrastOffenders(page, `${label} [dark]`)));
    }

    expect(
      offenders,
      "a11y net: the dark corners — /signup, /reset-password and the 404 — must pass WCAG 2.1+2.2 A+AA AND the computed-contrast leg in dark mode (the surfaces outside the WH-18 walk set; the signup title shipped 1.0:1 and the 404 was a light island)",
    ).toEqual([]);
    expect(
      console_offenders,
      "console net (dark corners): the logged-out dark surfaces must boot console-clean",
    ).toEqual([]);
  });
});

test.describe("a11y net — the light computed-contrast leg (the alpha-card family)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("/login, /signup, /reset-password and the 404 pass the computed-contrast leg in light mode", async ({ page }) => {
    const offenders: string[] = [];
    for (const [label, route] of [
      ["login", "/login"],
      ["signup", "/signup"],
      ["reset-password", "/reset-password"],
      ["404", "/wh19-no-such-route"],
    ] as const) {
      await page.goto(route, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      offenders.push(...(await contrastOffenders(page, `${label} [light]`)));
      // The 404's flat page bg is axe-RESOLVABLE — axe catches what the
      // probe skips (the display heading rode slate-300 on slate-50 at
      // 1.42:1 through every green round: F-5).
      if (label === "404") {
        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
        offenders.push(...describeViolations("404 [light]", results.violations));
      }
    }

    expect(
      offenders,
      "a11y net: the light-mode computed-contrast leg — axe returns color-contrast INCOMPLETE for text over the alpha cards on gradient pages (the WH-18 dark-login walk stayed green with a real 3.77:1 failure on the page); the leg measures the rendered pages directly, both modes, WCAG large-text rule applied per element",
    ).toEqual([]);
  });
});

// WH-19 (F-4): the auto-mode live-flip listener — the WH-18 cure (the real
// matchMedia change listener at store init) has no test. This walk flips
// the OS scheme MID-FLIGHT (page.emulateMedia) with mode=auto: the class
// must follow; an explicit Light choice must ignore the OS (the picker's
// promise — the store's own header contract).
test.describe("a11y net — the auto-mode listener (the OS scheme flip)", () => {
  test.afterEach(async ({ page }) => {
    try {
      await page.goto("/Profile", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Light", exact: true }).click({ timeout: 5000 });
      await expect(page.locator("html")).not.toHaveClass(/dark/, { timeout: 5000 });
      await expect
        .poll(
          async () => {
            const body = await page.evaluate(async () => {
              const res = await fetch("/api/prefs");
              return res.json();
            });
            return body?.data?.themeMode ?? "(unsaved)";
          },
          { timeout: 5000 },
        )
        .toBe("light");
    } catch {
      /* best-effort — the next test's normalization is the backstop */
    }
  });

  test("an OS scheme flip re-resolves the class in auto mode; explicit choices ignore the OS", async ({ page }) => {
    // Auto through the real Profile UI.
    await page.goto("/Profile", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Auto", exact: true }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/); // OS defaults light in this context

    // The OS flips dark mid-flight — the listener must apply the class.
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(
      page.locator("html"),
      "mode=auto + OS dark: the listener must re-resolve applyTheme and flip the class (the WH-18 F-4 cure's whole point — the narrated listener that never existed)",
    ).toHaveClass(/dark/, { timeout: 5000 });

    // The OS flips back light — the class must clear.
    await page.emulateMedia({ colorScheme: "light" });
    await expect(
      page.locator("html"),
      "mode=auto + OS light: the class must clear with the scheme",
    ).not.toHaveClass(/dark/, { timeout: 5000 });

    // Explicit Light: the picker's promise — the OS must be ignored.
    await page.getByRole("button", { name: "Light", exact: true }).click();
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(400);
    await expect(
      page.locator("html"),
      "explicit Light + OS dark: the class must NOT appear — explicit choices ignore the OS (the store's own header contract)",
    ).not.toHaveClass(/dark/);
  });
});

// WH-20 (F-6): the interaction-states net — the fourth assertion-surface
// class the gate never read (DOM → console → semantics → interaction).
// The dark e2e walks render EMPTY module lists (the demo account ships
// empty by design), so the ROW surfaces — the delete buttons, the chips —
// never render in any walk; no net anywhere walks a HOVER state or reads a
// FOCUS ring's color. Four legs, all computed-contrast (oklab-aware, the
// WH-19 instrument): (a) the data-bearing dark row walk (one workout
// created through the API with the storageState cookie — the e2e db stays
// the seeded contract; one API row is invisible to every other spec, the
// CRUD spec's own rows demonstrate the pattern is safe), (b) the dark
// login focus ring (real keyboard Tab — program focus() does not match
// :focus-visible after mouse use; ≥400 ms settle on every read, the
// transition-all box-shadow interpolation artifact), (c) the dark footer
// (the F-3 class: a white strip on every dark page passed every walk
// because its self-contrast is AA-fine), (d) the toast hover (real
// agent-browser hover — synthetic mouseenter does not set :hover; the
// F-2 class: the glyph vanishes exactly when the user aims at it).
const ELEMENT_PROBE = String.raw`
(function (sel, settle) {
  function oklabToRgb(L, a, b) {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
    const enc = (x) => {
      x = Math.min(1, Math.max(0, x));
      return Math.round(255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055));
    };
    return [enc(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
            enc(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
            enc(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)];
  }
  function parseColor(str) {
    if (!str) return null;
    let m = str.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (m) return { rgb: [+m[1], +m[2], +m[3]], alpha: m[4] === undefined ? 1 : +m[4] };
    m = str.match(/oklab\(([\d.-]+) ([\d.e-]+) ([\d.e-]+)(?: \/ ([\d.]+))?\)/);
    if (m) return { rgb: oklabToRgb(+m[1], +m[2], +m[3]), alpha: m[4] === undefined ? 1 : +m[4] };
    m = str.match(/oklch\(([\d.-]+) ([\d.e-]+) ([\d.e-]+)(?: \/ ([\d.]+))?\)/);
    if (m) {
      const rad = (+m[3] / 360) * 2 * Math.PI;
      const c = oklabToRgb(+m[1], Math.cos(rad) * +m[2], Math.sin(rad) * +m[2]);
      return { rgb: c, alpha: m[4] === undefined ? 1 : +m[4] };
    }
    if (str === 'transparent') return { rgb: [0, 0, 0], alpha: 0 };
    return null;
  }
  function lum(rgb) {
    const c = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
    return 0.2126 * c(rgb[0]) + 0.7152 * c(rgb[1]) + 0.0722 * c(rgb[2]);
  }
  const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  function effBg(el) {
    let n = el;
    while (n && n !== document.documentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundImage && s.backgroundImage !== 'none') return { kind: 'gradient', rgb: [255, 255, 255] };
      const p = parseColor(s.backgroundColor);
      if (p && p.alpha > 0.6) return { kind: 'solid', rgb: p.rgb };
      n = n.parentElement;
    }
    const p = parseColor(getComputedStyle(document.body).backgroundColor);
    return { kind: 'body', rgb: p ? p.rgb : [255, 255, 255] };
  }
  const el = document.querySelector(sel);
  if (!el) return { error: 'missing: ' + sel };
  const s = getComputedStyle(el);
  const ink = parseColor(s.color);
  const bg = effBg(el);
  if (!ink || ink.alpha === 0) return { error: 'no ink: ' + sel };
  return {
    sel, ink: s.color, bg: 'rgb(' + bg.rgb.join(', ') + ')',
    ratio: +ratio(lum(ink.rgb), lum(bg.rgb)).toFixed(2),
  };
})`;

/** Evaluate the element probe for one selector, after the settle delay
 * (transition-all interpolates box-shadow/color — a synchronous read
 * returns the t≈0 frame; every ring/ink read settles ≥400 ms). The
 * probe source rides the evaluate ARGS — page.evaluate serializes the
 * function body only; a Node-side closure constant is invisible in the
 * page context (the first RED run's ReferenceError). */
async function elementContrast(page: import("@playwright/test").Page, sel: string, settleMs = 450) {
  await page.waitForTimeout(settleMs);
  return (await page.evaluate(
    ([s, src]) => window.eval(src)(s),
    [sel, ELEMENT_PROBE],
  )) as { sel: string; ink?: string; bg?: string; ratio?: number; error?: string };
}

/** WCAG ratio in Node (the (b) leg's ring math — the probe already
 * returned the effective bg; the ring layer parses in Node). */
function nodeContrast(r: number, g: number, b: number, bg: readonly [number, number, number]): number {
  const chan = (x: number) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
  const lum = (v: readonly [number, number, number]) => 0.2126 * chan(v[0]) + 0.7152 * chan(v[1]) + 0.0722 * chan(v[2]);
  const L = (a: number, bb: number) => (Math.max(a, bb) + 0.05) / (Math.min(a, bb) + 0.05);
  return +L(lum([r, g, b]), lum(bg)).toFixed(2);
}

test.describe("a11y net — the interaction states (the WH-20 widening)", () => {
  // The hygiene protocol (the dark-state describe's own form): (a)/(c)/(d)
  // flip the account's server prefs through the real Profile UI — the
  // revert VERIFIES THE PUT LANDED so a failure mid-walk cannot leave the
  // dark state for the specs that follow. The (a)/(d) legs also leave
  // WORKOUT ROWS in the shared e2e db (the API row + the real-form save)
  // — the CRUD spec that runs later asserts the "Total Workouts" stat at
  // exactly 1, so every row this describe creates is deleted FIRST, and
  // the deletion is VERIFIED (the WH-16 lesson: a revert that races the
  // teardown is no revert). A failed leg still cleans (afterEach runs
  // regardless); the next RUN's global-setup reseed is the backstop.
  test.afterEach(async ({ page }) => {
    try {
      await page.evaluate(async () => {
        const list = await fetch("/api/workouts").then((r) => r.json());
        for (const w of list?.data ?? []) {
          await fetch(`/api/workouts/${w.id}`, { method: "DELETE" });
        }
        const after = await fetch("/api/workouts").then((r) => r.json());
        if ((after?.data ?? []).length > 0) throw new Error("workout cleanup incomplete");
      });
    } catch {
      /* best-effort — the reseed backstop below */
    }
    try {
      await page.goto("/Profile", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Light", exact: true }).click({ timeout: 5000 });
      await expect(page.locator("html")).not.toHaveClass(/dark/, { timeout: 5000 });
      await expect
        .poll(
          async () => {
            const body = await page.evaluate(async () => {
              const res = await fetch("/api/prefs");
              return res.json();
            });
            return body?.data?.themeMode ?? "(unsaved)";
          },
          { timeout: 5000 },
        )
        .toBe("light");
    } catch {
      /* best-effort — the next test's normalization is the backstop */
    }
  });

  test("(a) the data-bearing dark row walk — the delete icon ≥3:1 on the rendered row", async ({ page }) => {
    // Normalize light FIRST (the shared-suite hygiene), then flip dark
    // through the real UI.
    await page.goto("/Profile", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Light", exact: true }).click();
    await page.getByRole("button", { name: "Dark", exact: true }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // One row through the API (the storageState cookie) — the empty-list
    // class the state walks render is the whole reason this leg exists.
    await page.evaluate(async () => {
      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "cardio", durationMinutes: 30, intensity: "moderate", date: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("row create failed " + res.status);
    });

    await page.goto("/Exercise", { waitUntil: "networkidle" });
    const rowBtn = page.locator('button[aria-label^="Delete "]').first();
    await expect(rowBtn, "the row must render (the data-bearing leg's whole point — the empty lists the state walks see)").toBeVisible();
    const del = await elementContrast(page, 'button[aria-label^="Delete "]');
    expect(del.error, "the delete button probe must resolve").toBeFalsy();
    expect(
      del.ratio,
      `the dark row's delete icon must compute ≥3:1 (got ${del.ratio}:1, ink ${del.ink} on ${del.bg}) — the F-4 class: the light-only red-600 rode 3.1:1 marginal with a red-50 light-island hover`,
    ).toBeGreaterThanOrEqual(3);
  });

  test("(b) the dark login focus ring — the keyboard ring layer ≥3:1 (real Tab, settled)", async ({ page }) => {
    // The persisted dark state seeds the logged-out surface (the
    // ThemeBoot path); NO server flip needed — the probe-hygiene form.
    await page.addInitScript(() => {
      localStorage.setItem("wellness-theme", JSON.stringify({ state: { themeMode: "dark" }, version: 0 }));
    });
    await page.goto("/login", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Real keyboard Tab to the email input — :focus-visible is the state
    // the indicator rides; program focus() does not match it after mouse
    // use. Tab from the body until #email carries the focus.
    for (let i = 0; i < 12; i++) {
      if (await page.evaluate(() => document.activeElement?.id === "email")) break;
      await page.keyboard.press("Tab");
    }
    await expect(page.locator("#email")).toBeFocused();
    // Settle ≥400 ms — transition-all interpolates box-shadow; a
    // synchronous read returns the t≈0 transparent frame (the round's
    // methodology find).
    await page.waitForTimeout(450);
    const layers = await page.evaluate(() => {
      const el = document.querySelector("#email");
      return el ? getComputedStyle(el).boxShadow : "(missing)";
    });
    // The ring layer: split the computed string on top-level commas that
    // precede a color (each element = one shadow layer), drop the
    // transparent Tailwind empties, and take the OUTERMOST opaque layer
    // by spread radius — the offset renders as the inner white layer, the
    // ring as the wider colored one (debug-verified: `rgba(0,0,0,0) 0 0 0
    // 0, rgba(0,0,0,0) 0 0 0 0, rgb(255,255,255) 0 0 0 2px, rgb(82,82,82)
    // 0 0 0 4px` — the FIRST RED run's lookahead regex matched nothing on
    // this form; split, don't lookahead).
    const probe = await page.evaluate(
      ([probeSrc]) => window.eval(probeSrc)("#email"),
      [ELEMENT_PROBE],
    );
    const layerList = String(layers)
      .split(/,\s*(?=rgba?\()/)
      .filter((l) => /^rgba?\(\d+, \d+, \d+, 0\)/.test(l) === false && /^rgba?\(/.test(l));
    expect(layerList.length, `the focused input must carry the offset + ring layers (boxShadow: ${String(layers)})`).toBeGreaterThanOrEqual(2);
    const spreadOf = (l: string) => Number(l.match(/0px 0px 0px (\d+)px/)?.[1] ?? 0);
    const ringLayer = [...layerList].sort((a, b) => spreadOf(a) - spreadOf(b)).at(-1)!; // outermost opaque = the ring
    const ringRgb = ringLayer.match(/rgba?\((\d+), (\d+), (\d+)/)!.slice(1).map(Number);
    const cardBg = (probe as { bg: string }).bg.match(/\d+, \d+, \d+/)![0].split(", ").map(Number) as [number, number, number];
    const ratio = nodeContrast(ringRgb[0]!, ringRgb[1]!, ringRgb[2]!, cardBg);
    expect(
      ratio,
      `the dark login ring layer must compute ≥3:1 against the dark card (ring ${ringLayer} on ${probe.bg}) — the F-1 class: WH-19 shipped the paired arm at 2.29:1 (neutral-600); the cure is neutral-400 at 7.11:1`,
    ).toBeGreaterThanOrEqual(3);
  });

  test("(c) the dark footer — the strip must be the dark pair, not a white island", async ({ page }) => {
    await page.goto("/Profile", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Light", exact: true }).click();
    await page.getByRole("button", { name: "Dark", exact: true }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    for (const route of ["/Dashboard", "/Exercise", "/Profile"]) {
      await page.goto(route, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      const footer = await page.evaluate(() => {
        const f = document.querySelector("footer");
        return f ? getComputedStyle(f).backgroundColor : "(missing)";
      });
      expect(footer, `${route}: the dark footer must be the dark pair (the F-3 class: a white strip on every dark page passed every walk because its self-contrast is AA-fine)`).toBe("rgb(10, 10, 10)");
    }
  });

  test("(d) the toast hover — the dismiss glyph ≥3:1 under a REAL hover", async ({ page }) => {
    await page.goto("/Profile", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Light", exact: true }).click();
    await page.getByRole("button", { name: "Dark", exact: true }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Trigger a live toast through the real form (the save path), then
    // hover its dismiss button with a REAL pointer event.
    await page.goto("/Exercise", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Log Workout/ }).click();
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ state: "visible" });
    await page.locator("#workout-duration").fill("30");
    await dialog.getByRole("button", { name: /Save|Log/i }).click();
    const toast = page.locator('[role="status"]').first();
    await expect(toast, "the save toast must appear (the live hover surface)").toBeVisible({ timeout: 5000 });

    const dismiss = toast.locator('button[aria-label="Dismiss notification"]');
    await dismiss.hover(); // a real pointer — synthetic mouseenter never sets :hover
    const x = await elementContrast(page, '[role="status"] button[aria-label="Dismiss notification"]');
    expect(x.error, "the dismiss probe must resolve").toBeFalsy();
    expect(
      x.ratio,
      `the HOVERED dismiss glyph must compute ≥3:1 (got ${x.ratio}:1, ink ${x.ink} on ${x.bg}) — the F-2 class: the glyph vanished at 1.05:1 exactly when the user aims at it`,
    ).toBeGreaterThanOrEqual(3);
  });
});
