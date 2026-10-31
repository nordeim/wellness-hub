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
  // WH-28 (F-4): the reference's own shell element vocabulary, pinned
  // live: the sidebar wordmark is an <h2> (VISIBLE at desktop) and the
  // mobile glass-header title an <h1> (hidden at desktop, shown at
  // mobile — two visible h1s there, its own semantics). The build-era
  // assertion (level 2 toBeHidden) passed vacuously through the span
  // era; the tag census + this leg now pin it standing.
  await expect(
    page.getByRole("heading", { name: "Wellness Hub", level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Wellness Hub", level: 1 }),
  ).toBeHidden();
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

// WH-30 (F-2/F-3/F-4 — the (n) leg): the desktop sidebar's chrome — the
// surfaces the WH-15 color probe never measured. Live-probed on both
// apps at 1280px: the reference's nav rows compute 32px (h-8 capping
// py-3) with 16px icons and the gray-50 hover wash (ours shipped 40px
// py-2.5 rows with 20px icons and the zinc token wash); the Profile
// block is the AVATAR CARD (the 40px gradient circle + the truncate
// title pair — ours shipped a bare lucide icon + texts on desktop);
// and the shell carries NO footer element (the reference's pages simply
// end — our chassis © strip retired with this round).
test("the sidebar chrome geometry matches the reference and no footer renders (the (n) leg)", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/Dashboard", { waitUntil: "networkidle" });

  const read = await page.evaluate(() => {
    const aside = document.querySelector("aside");
    if (!aside) return { rowH: 0, iconSize: "", avatarW: 0, avatarRadius: "", footers: -1, headerDivider: "", activeH: 0 };
    const links = Array.from(aside.querySelectorAll("a"));
    const row = links.find((l) => /routine templates/i.test(l.textContent || ""))!;
    const active = links.find((l) => /dashboard/i.test(l.textContent || ""))!;
    const icon = row.querySelector("svg");
    const footerZone = aside.querySelector(".border-t");
    const avatar = footerZone?.querySelector(".rounded-full");
    const headerZone = aside.querySelector(".border-b");
    return {
      rowH: Math.round(row.getBoundingClientRect().height),
      activeH: Math.round(active.getBoundingClientRect().height),
      iconSize: icon ? getComputedStyle(icon).width : "",
      avatarW: avatar ? Math.round(avatar.getBoundingClientRect().width) : 0,
      avatarRadius: avatar ? getComputedStyle(avatar).borderRadius : "",
      footers: document.querySelectorAll("footer").length,
      headerDivider: headerZone ? getComputedStyle(headerZone).borderBottomWidth : "none",
    };
  });

  expect(read.rowH, "the sidebar's nav rows are the reference's 32px h-8 family").toBe(32);
  expect(read.activeH, "the active gradient pill rides the same 32px row family").toBe(32);
  expect(read.iconSize, "the sidebar's nav icons are the reference's 16px").toBe("16px");
  expect(read.avatarW, "the Profile card's avatar is the reference's 40px circle").toBe(40);
  // rounded-full: the dev server serializes 9999px, the standalone build
  // 3.35544e+07px — parse the number, the circle is the contract
  expect(
    Number.parseFloat(read.avatarRadius),
    "the Profile card's avatar is round (rounded-full)",
  ).toBeGreaterThanOrEqual(9999);
  expect(read.footers, "NO footer element renders anywhere — the reference's pages simply end").toBe(0);
  expect(read.headerDivider, "the sidebar's brand header carries the reference's border-b divider").toBe("1px");
});
