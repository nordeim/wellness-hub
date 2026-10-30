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

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

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
