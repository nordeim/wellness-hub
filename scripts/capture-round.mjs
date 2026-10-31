// The canonical 34-file capture procedure (committed at WH-29 to END the
// procedure-state reconstruction class — the WH-28 round's 32/33 lesson:
// "not reconstructible without the original script"). Run from the repo
// root against a booted dev server (bun run dev) AFTER a fresh seed:
//   bun run db:seed && node scripts/capture-round.mjs
// The capture-state doctrine (badgesEarned=0 before the light set), the
// phase-split (light logged-out first — the dark-leak class), the ONE
// login, the capture-24 write position (after the dark set, staying
// through 29/30), and the 34 mood-mirror write are ALL load-bearing —
// the md5 ledger (docs/screenshots/md5-ledger.txt) is only comparable
// across rounds when this procedure runs unmodified.
//
// WH-29 capture round — the 34-file set under the capture-state doctrine.
// The WH-28 procedure lessons, applied + this round's three fixes:
//   1. badgesEarned === 0 asserted BEFORE the light set (the 11-goals lesson).
//   2. Phase-split: the light logged-out captures (01/13) run in their own
//      context BEFORE any dark seeding (the dark-leak class).
//   3. ONE login total (the two-context design; logout/login cycles trip
//      the login rate limiter).
//   4. 14-mobile-dashboard: captured with the drawer CLOSED (the drawer
//      opens for 15) — this round's fix.
//   5. The capture-24 write lands AFTER the dark set (17-19) and the dark
//      logged-out family (20-25), BEFORE 24 — and stays through 29/30 (the
//      feed row's face) — the WH-28 ordering, now explicit.
//   6. The light flip back happens BEFORE 29/30/34 (29/30 are LIGHT
//      captures; the WH-28 base had 34 light too) — this round's fix.
//   7. The 34 mood-mirror write lands LAST, then re-seed + census MATCH.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { execSync } from "node:child_process";

const BASE = "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let shots = 0;
const snap = async (page, name) => {
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  shots++;
  console.log(`captured ${name}`);
};

// ---------- the clean-account assertion (the doctrine, before the light set)
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/login`);
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForURL("**/Dashboard");
  const ach = await page.evaluate(async () => {
    const r = await fetch("/api/achievements");
    const j = await r.json();
    return j.data?.badgesEarned;
  });
  if (ach !== 0) {
    console.error(`CAPTURE-STATE DOCTRINE FAILED: badgesEarned=${ach} — re-seed and re-run`);
    process.exit(1);
  }
  console.log(`clean account asserted: badgesEarned=0`);
  await ctx.close();
}

// ---------- phase 1: light, LOGGED OUT (context A — no dark seeded)
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/login`);
  await snap(page, "01-login");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/login`);
  await snap(page, "13-mobile-login");
  await ctx.close();
}

// ---------- phase 2-4: light, LOGGED IN (context B — the ONE login)
const ctxB = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const pageB = await ctxB.newPage();
{
  await pageB.goto(`${BASE}/login`);
  await pageB.fill("input[type=email]", EMAIL);
  await pageB.fill("input[type=password]", PASSWORD);
  await pageB.click("button[type=submit]");
  await pageB.waitForURL("**/Dashboard");

  // the desktop light set (the feed is EMPTY — the write lands after the dark set)
  await snap(pageB, "02-dashboard");
  await pageB.goto(`${BASE}/Routines`); await snap(pageB, "03-routines");
  await pageB.goto(`${BASE}/Exercise`); await snap(pageB, "04-exercise");
  await pageB.goto(`${BASE}/MentalHealth`); await snap(pageB, "05-mentalhealth");
  await pageB.goto(`${BASE}/Assignments`); await snap(pageB, "06-assignments");
  await pageB.goto(`${BASE}/Events`); await snap(pageB, "07-events");
  await pageB.goto(`${BASE}/StudyResources`); await snap(pageB, "08-studyresources");
  await pageB.goto(`${BASE}/Reminders`); await snap(pageB, "09-reminders");
  await pageB.goto(`${BASE}/Learning`); await snap(pageB, "10-learning");
  await pageB.goto(`${BASE}/Goals`); await snap(pageB, "11-goals");
  await pageB.goto(`${BASE}/Profile`); await snap(pageB, "12-profile");

  // the mobile light set — 14 FIRST with the drawer CLOSED (this round's fix)
  await pageB.setViewportSize({ width: 390, height: 844 });
  await pageB.goto(`${BASE}/Dashboard`);
  await pageB.waitForTimeout(600);
  await snap(pageB, "14-mobile-dashboard");
  await pageB.evaluate(() => document.querySelector("header button")?.click());
  await pageB.waitForTimeout(600);
  await snap(pageB, "15-mobile-nav-open");
  await pageB.evaluate(() => {
    const links = Array.from(document.querySelectorAll("[role=dialog] a"));
    links.find((a) => a.getAttribute("href") === "/Exercise")?.click();
  });
  await pageB.waitForTimeout(900);
  await snap(pageB, "16-mobile-drawer-nav-exercise");
  await pageB.setViewportSize({ width: 1280, height: 900 });

  // the interior set (light, the feed still empty)
  await pageB.goto(`${BASE}/Events`);
  await pageB.getByRole("button", { name: "New Event" }).click();
  await pageB.waitForTimeout(500);
  await snap(pageB, "26-events-inline-form");
  await pageB.goto(`${BASE}/Routines`);
  await pageB.getByRole("button", { name: "Use This Template" }).first().click();
  await pageB.waitForTimeout(600);
  await snap(pageB, "28-routines-schedule-modal");
  await pageB.keyboard.press("Escape");
  await pageB.goto(`${BASE}/Profile`);
  await pageB.getByRole("tab", { name: "Preferences" }).click();
  await pageB.waitForTimeout(500);
  await snap(pageB, "31-profile-preferences");
  await pageB.goto(`${BASE}/MentalHealth`);
  await pageB.getByRole("button", { name: /Log Mood|New Mood|Add Mood/ }).first().click().catch(async () => {
    await pageB.locator("main button").first().click();
  });
  await pageB.waitForTimeout(500);
  await snap(pageB, "32-mentalhealth-form-interior");
  await pageB.goto(`${BASE}/StudyResources`);
  await pageB.getByRole("button", { name: /Add Resource|New Resource/ }).first().click();
  await pageB.waitForTimeout(500);
  await snap(pageB, "33-sr-form-interior");
}

// ---------- phase 5: DARK, logged in (context B flipped through the real UI) — feed still empty
{
  await pageB.goto(`${BASE}/Profile`);
  await pageB.getByRole("tab", { name: "Appearance" }).click();
  await pageB.getByRole("button", { name: "Dark" }).click();
  await pageB.waitForTimeout(700);
  await pageB.goto(`${BASE}/Dashboard`); await snap(pageB, "17-dark-dashboard");
  await pageB.goto(`${BASE}/Routines`); await snap(pageB, "18-dark-routines");
  await pageB.setViewportSize({ width: 390, height: 844 });
  await pageB.goto(`${BASE}/Dashboard`);
  await pageB.evaluate(() => document.querySelector("header button")?.click());
  await pageB.waitForTimeout(600);
  await snap(pageB, "19-dark-mobile-nav-open");
  await pageB.setViewportSize({ width: 1280, height: 900 });
}

// ---------- phase 6: DARK, logged OUT (context C — the persisted seed)
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem("wellness-theme", JSON.stringify({ state: { themeMode: "dark", primaryColor: "#6366f1", secondaryColor: "#a855f7", fontFamily: "system", bgImageUrl: null, sidebarStyle: "gradient", cardStyle: "elevated", animationLevel: "full", notificationsEnabled: true, weeklyReminders: true }, version: 0 }));
  });
  await page.goto(`${BASE}/login`);
  await page.waitForTimeout(700);
  await snap(page, "20-dark-login");
  await page.goto(`${BASE}/signup`); await snap(page, "21-dark-signup");
  await page.goto(`${BASE}/reset-password`); await snap(page, "22-dark-reset-password");
  await page.goto(`${BASE}/no-such-page`); await snap(page, "23-dark-404");
  // the focus ring: real Tab + the ≥400ms settle (the WH-20 lesson)
  await page.goto(`${BASE}/login`);
  await page.waitForTimeout(600);
  await page.keyboard.press("Tab");
  await page.waitForTimeout(500);
  await snap(page, "25-dark-login-focus");
  await ctx.close();
}

// ---------- phase 7: THE WRITE (the capture-24 workout — stays through 29/30)
await pageB.evaluate(async () => {
  await fetch("/api/workouts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "cardio", durationMinutes: 30, intensity: "moderate", caloriesBurned: 250, date: "2026-10-21" }),
  });
});
console.log("capture-24 write: the workout (stays through 29/30)");

// 24 — dark exercise rows (context B is still dark)
await pageB.goto(`${BASE}/Exercise`);
await snap(pageB, "24-dark-exercise-rows");

// the light flip back — 29/30 are LIGHT captures (this round's fix)
await pageB.goto(`${BASE}/Profile`);
await pageB.getByRole("tab", { name: "Appearance" }).click();
await pageB.getByRole("button", { name: "Light" }).click();
await pageB.waitForTimeout(700);

// 29 — the quick-actions hover with the feed row in the account
await pageB.goto(`${BASE}/Dashboard`);
await pageB.waitForTimeout(800);
await pageB.locator("a", { hasText: "Log Exercise" }).first().hover();
await pageB.waitForTimeout(500);
await snap(pageB, "29-quick-actions-hover");

// 30 — the tutorial card hover (light)
await pageB.goto(`${BASE}/Learning`);
await pageB.locator("main div.group").first().hover();
await pageB.waitForTimeout(500);
await snap(pageB, "30-tutorial-card-hover");

// ---------- phase 8: the 34 mirror write (LAST, LIGHT) — then re-seed
await pageB.evaluate(async () => {
  await fetch("/api/mood-entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood: "good", energy: 5, activities: [], gratitude: "", reflection: "", date: "2026-10-29" }),
  });
});
await pageB.goto(`${BASE}/MentalHealth`);
await pageB.waitForTimeout(900);
await snap(pageB, "34-mood-list-interior");

await ctxB.close();
await browser.close();

console.log(`\n${shots} captures taken — re-seeding + census`);
execSync("bun run db:seed", { stdio: "inherit" });
execSync("bun run db:census", { stdio: "inherit" });
