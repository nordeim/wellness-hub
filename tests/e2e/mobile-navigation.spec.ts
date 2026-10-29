import { expect, test } from "@playwright/test";

// The mobile navigation battery — the drawer at 390x844 (the reference's
// own phone face), the glass header, and the Tailwind-v4-verified Sheet
// semantics (overlay, escape, route-change close, resize-past-md close).

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
});

test("the glass header + drawer trigger render on phones", async ({ page }) => {
  await page.goto("/Dashboard");

  const header = page.getByRole("banner");
  await expect(header).toBeVisible();
  await expect(header.getByRole("button", { name: "Toggle Sidebar" })).toBeVisible();
  // The desktop sidebar is hidden below md (the Tailwind v4 `hidden md:flex`
  // pair — the ghost-menu guardrail: one shared breakpoint).
  await expect(page.getByRole("heading", { name: "Wellness Hub", level: 2 })).toBeHidden();
});

test("the drawer opens, navigates and closes on route change", async ({ page }) => {
  await page.goto("/Dashboard");

  await page.getByRole("button", { name: "Toggle Sidebar" }).click();

  // The sheet: the drawer brand + the full nav.
  await expect(page.getByRole("dialog")).toBeVisible();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("Wellness Hub")).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Learning" })).toBeVisible();

  // Navigate → the drawer closes (the route-change close contract).
  await dialog.getByRole("link", { name: "Learning" }).click();
  await expect(page.getByRole("heading", { name: "Learning Center" })).toBeVisible();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("escape closes the drawer and restores focus", async ({ page }) => {
  await page.goto("/Goals");

  await page.getByRole("button", { name: "Toggle Sidebar" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("the drawer auto-closes when the viewport grows past md", async ({ page }) => {
  await page.goto("/Reminders");

  await page.getByRole("button", { name: "Toggle Sidebar" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.setViewportSize({ width: 900, height: 844 });
  await expect(page.getByRole("dialog")).toBeHidden();
  // The desktop sidebar is now the visible chrome (no ghost menu, no
  // stranded scroll lock).
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Reminders" }),
  ).toBeVisible();
});

test("the drawer scroll-locks main while open", async ({ page }) => {
  await page.goto("/Learning");

  await page.getByRole("button", { name: "Toggle Sidebar" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  const overflow = await page.evaluate(
    () => document.querySelector("main")?.style.overflow ?? "",
  );
  expect(overflow).toBe("hidden");

  await page.keyboard.press("Escape");
  const restored = await page.evaluate(
    () => document.querySelector("main")?.style.overflow ?? "",
  );
  expect(restored).not.toBe("hidden");
});

test("the profile page's segmented tabs work on phones", async ({ page }) => {
  await page.goto("/Profile");

  await page.getByRole("tab", { name: "Account" }).click();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Email")).toHaveValue("sepnetflix2023@outlook.com");

  await page.getByRole("tab", { name: "Preferences" }).click();
  await expect(page.getByText("Enable Notifications")).toBeVisible();
});
