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
