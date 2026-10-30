import { expect, test } from "@playwright/test";

// The shell battery: the sidebar's 10 nav items + the footer link + the
// gradient wordmark + the case-insensitive alias family.

test("dashboard renders the four stat tiles and quick actions", async ({ page }) => {
  await page.goto("/Dashboard");

  await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
  await expect(page.getByText("Workouts This Week")).toBeVisible();
  await expect(page.getByText("Mood Entries")).toBeVisible();
  await expect(page.getByText("Active Assignments")).toBeVisible();
  await expect(page.getByText("Goals Completed")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Quick Actions" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Log Exercise" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Mood Check" })).toBeVisible();
});

test("the sidebar carries the full wellness nav", async ({ page }) => {
  await page.goto("/Dashboard");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  for (const label of [
    "Dashboard",
    "Routine Templates",
    "Exercise",
    "Mental Health",
    "Assignments",
    "Events",
    "Study Resources",
    "Reminders",
    "Learning",
    "Goals & Achievements",
  ]) {
    await expect(nav.getByRole("link", { name: label })).toBeVisible();
  }
  await expect(
    page.getByRole("link", { name: /Profile & Settings/ }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Wellness Hub", level: 2 })).toBeHidden();
});

test("the capitalized alias routes render their pages", async ({ page }) => {
  const faces: [string, string][] = [
    ["/Routines", "Routine Templates"],
    ["/Exercise", "Exercise Tracker"],
    ["/MentalHealth", "Mental Health Journal"],
    ["/Assignments", "Assignments"],
    ["/Events", "Events Calendar"],
    ["/StudyResources", "Study Resources"],
    ["/Reminders", "Reminders"],
    ["/Learning", "Learning Center"],
    ["/Goals", "Goals & Achievements"],
    ["/Profile", "Profile & Customization"],
  ];
  for (const [route, heading] of faces) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }
});

test("the lowercase canonical routes render their pages", async ({ page }) => {
  const faces: [string, string][] = [
    ["/dashboard", "Welcome Back"],
    ["/routines", "Routine Templates"],
    ["/exercise", "Exercise Tracker"],
    ["/mentalhealth", "Mental Health Journal"],
    ["/learning", "Learning Center"],
  ];
  for (const [route, heading] of faces) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
});

test("the active nav state follows the route (case-insensitive)", async ({ page }) => {
  await page.goto("/Learning");
  const active = page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Learning" });
  await expect(active).toHaveAttribute("aria-current", "page");
});

test("the dashboard quick actions deep-link to their modules", async ({ page }) => {
  await page.goto("/Dashboard");
  await page.getByRole("link", { name: "Log Exercise" }).click();
  await expect(page.getByRole("heading", { name: "Exercise Tracker" })).toBeVisible();
});

// WH-16 (F-3): the console-hygiene net. The suite's assertions see the
// DOM — an error class that only surfaces in the console ships invisibly
// (F-1's hydration mismatch rode fifteen green rounds exactly this way).
// This check walks every module route with the console + pageerror
// collectors attached and asserts ZERO error/warning messages: any React
// error (hydration races, bad aria props, key warnings), any browser
// error class on the walked surfaces, fails the gate here. Strict by
// design — the production standalone build's console is clean (verified
// cold/warm/stored-preset/throttled before the net landed); a "benign"
// warning that appears later gets cured or pinned as a documented ignore
// entry, never silently allowed.
test("the module pages boot with a clean console (the console-hygiene net)", async ({ page }) => {
  const offenders: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      offenders.push(`[${msg.type()}] ${msg.text().split("\n")[0]}`);
    }
  });
  page.on("pageerror", (err) => offenders.push(`[pageerror] ${String(err)}`));

  const routes = [
    "/Dashboard",
    "/Routines",
    "/Exercise",
    "/MentalHealth",
    "/Assignments",
    "/Events",
    "/StudyResources",
    "/Reminders",
    "/Learning",
    "/Goals",
    "/Profile",
  ];
  for (const route of routes) {
    await page.goto(route);
    // settle each page: the theme store's boot writes, hydration and the
    // per-module fetches all complete before the next navigation
    await expect(page.locator("main")).toBeVisible();
    await page.waitForTimeout(250);
  }

  expect(offenders, offenders.join("\n")).toEqual([]);
});
