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

// WH-30 (F-1 — the (m) leg): the mobile glass header's INTERIOR — the
// surfaces the WH-15 color probe and this battery's SHEET reads never
// decoded. Live-probed on both apps at 390x844: the reference's bar
// computes 24px horizontal padding (px-6), wraps (trigger + title) in a
// left-cluster `flex items-center gap-4` div (the title's left edge at
// x=68 — ours shipped justify-between + a w-10 spacer, x=126), and its
// trigger is 28x28 at radius 8px with a 16px ink icon (ours shipped
// 40x40 at 6px with a 20px gray icon). The drawer's close X is HIDDEN
// on the reference (its authored [&>button]:hidden arm) and the sheet
// carries a 1px right border.
test("the glass header's interior geometry matches the reference (the (m) leg)", async ({ page }) => {
  await page.goto("/Dashboard", { waitUntil: "networkidle" });

  const header = page.getByRole("banner");
  await expect(header).toBeVisible();

  const read = await page.evaluate(() => {
    const bar = document.querySelector("header")!;
    const cs = getComputedStyle(bar);
    const trigger = bar.querySelector("button")!;
    const tcs = getComputedStyle(trigger);
    const icon = trigger.querySelector("svg")!;
    const title = bar.querySelector("h1")!;
    const box = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height) };
    };
    return {
      padLeft: cs.paddingLeft,
      padRight: cs.paddingRight,
      triggerBox: box(trigger),
      triggerRadius: tcs.borderRadius,
      iconSize: getComputedStyle(icon).width,
      iconColor: getComputedStyle(icon).color,
      titleX: box(title).x,
      rightChildren: Array.from(bar.children).filter(
        (c) => c.tagName === "SPAN" || (c.tagName === "DIV" && c.querySelectorAll("button, h1").length === 0),
      ).length,
    };
  });

  // the bar: the reference's 24px padding on both sides
  expect(read.padLeft, "the header's left padding is the reference's px-6 (24px)").toBe("24px");
  expect(read.padRight, "the header's right padding is the reference's px-6 (24px)").toBe("24px");

  // the trigger: the reference's 28x28 rounded-lg form with the 16px ink icon
  expect(read.triggerBox.w, "the trigger's width is the reference's h-7 (28px)").toBe(28);
  expect(read.triggerBox.h, "the trigger's height is the reference's w-7 (28px)").toBe(28);
  expect(read.triggerRadius, "the trigger's radius is the reference's rounded-lg (8px)").toBe("8px");
  expect(read.iconSize, "the trigger's icon is the reference's size-4 (16px)").toBe("16px");
  expect(read.iconColor, "the trigger's icon is the reference's ink (rgb(10, 10, 10))").toBe("rgb(10, 10, 10)");

  // the left cluster: 24px pad + 28px trigger + 16px gap = the title at x=68
  expect(read.titleX, "the title's left edge is the reference's left-cluster x=68 (24+28+16)").toBe(68);
  expect(read.rightChildren, "the header carries no right-side spacer element — the reference's header is the left cluster only").toBe(0);

  // the drawer sheet: the close X hidden (the reference's authored arm) + the 1px right border
  await page.getByRole("button", { name: "Toggle Sidebar" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const sheetRead = await page.evaluate(() => {
    const sheet = Array.from(document.querySelectorAll("div")).filter(
      (d) => d.getAttribute("data-state") === "open",
    );
    const content = sheet.length ? sheet[sheet.length - 1] : null;
    if (!content) return { closeDisplay: "none", borderRight: "", footerBottom: 0, sheetBottom: 0 };
    const close = content.querySelector("button");
    const footerZone = content.querySelector(".border-t");
    return {
      closeDisplay: close ? getComputedStyle(close).display : "absent",
      borderRight: getComputedStyle(content).borderRightWidth,
      footerBottom: footerZone ? Math.round(footerZone.getBoundingClientRect().bottom) : 0,
      sheetBottom: Math.round(content.getBoundingClientRect().bottom),
    };
  });
  expect(sheetRead.closeDisplay, "the sheet's close X is hidden — the reference's [&>button]:hidden arm").toBe("none");
  expect(sheetRead.borderRight, "the sheet carries the reference's 1px right border").toBe("1px");
  expect(
    sheetRead.footerBottom,
    "the drawer's footer zone pins to the sheet bottom (the reference's flex column)",
  ).toBe(sheetRead.sheetBottom);

  // the drawer rows: the 32px h-8 family with 16px icons
  const rowRead = await page.evaluate(() => {
    const sheet = Array.from(document.querySelectorAll("div")).filter(
      (d) => d.getAttribute("data-state") === "open",
    );
    const content = sheet.length ? sheet[sheet.length - 1] : null;
    const links = content ? Array.from(content.querySelectorAll("a")) : [];
    const row = links[1];
    const icon = row?.querySelector("svg");
    return {
      rowH: row ? Math.round(row.getBoundingClientRect().height) : 0,
      iconSize: icon ? getComputedStyle(icon).width : "",
      avatarBox: (function () {
        const footerZone = content?.querySelector(".border-t");
        const av = footerZone?.querySelector(".rounded-full");
        if (!av) return { w: 0, h: 0 };
        const r = av.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height) };
      })(),
    };
  });
  expect(rowRead.rowH, "the drawer's nav rows are the reference's 32px h-8 family").toBe(32);
  expect(rowRead.iconSize, "the drawer's nav icons are the reference's 16px").toBe("16px");
  expect(rowRead.avatarBox.w, "the drawer's Profile avatar is the reference's 40px circle").toBe(40);

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});
