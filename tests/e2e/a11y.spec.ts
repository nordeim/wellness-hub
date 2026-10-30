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
