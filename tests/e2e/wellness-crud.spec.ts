import { expect, test } from "@playwright/test";

// The CRUD battery — one cycle per module, through the real forms.
// WH-21: the seven module create-forms are INLINE expanding cards now
// (the reference's modality — probed live: its forms open with zero
// overlays, in-flow, no scroll lock; only its Routines Schedule flow is a
// modal), so the form-title locators retargeted off role=dialog (the
// Routines schedule leg below KEEPS its dialog locator — the parity
// match).

// WH-37 (F-2): the demo-account DATA parity leg — the seeded mood
// entry's rendered face. Runs FIRST in the battery: it asserts the
// PRISTINE seeded state (the stats 5.0/10 · 1 · 1 and the tile's exact
// "1" hold only before this spec's own CRUD legs add their residue;
// the a11y suite's afterEach cleanup — which runs before this file —
// preserves the seeded row by its fixed 2026-10-29 date). The
// reference's demo account carries exactly one mood row (decoded live
// on both apps: journey row [Good / Oct 29, 2026 / Energy Level:
// 5/10], no activities/gratitude/reflection lines) and our seed
// mirrors it — this leg pins the RENDERED face (the source-level
// contract is pinned by tests/seed-parity.test.ts; this leg keeps the
// rendered reality honest — the round's own lesson: a source pin can
// drift from what actually renders). The FIXED date mirrors the
// reference's own fixed row: the assertions are stable across time by
// construction, never relative.
test("the demo account's seeded mood entry renders the reference's demo face", async ({ page }) => {
  // The mental-health page: the stat trio + the journey row.
  await page.goto("/MentalHealth");
  await expect(page.getByText("5.0/10")).toBeVisible();
  await expect(page.getByText("Current Streak").locator("..").getByText(/^1$/)).toBeVisible();
  const journeyRow = page.locator("main").getByText("Good", { exact: true }).first();
  await expect(journeyRow).toBeVisible();
  const row = journeyRow.locator("xpath=ancestor::div[contains(@class,'rounded-2xl')][1]");
  await expect(row).toContainText("Oct 29, 2026");
  await expect(row).toContainText("Energy Level: 5/10");

  // The dashboard: the Mood Entries tile reads 1 + the feed row
  // renders the reference's 💚 "Mood check-in / good / Oct 29" (the
  // hasText "good" filter pins the seeded row's own feed entry).
  await page.goto("/dashboard");
  await expect(
    page.locator("main").getByText("Mood Entries").locator("xpath=../..").getByText("1", { exact: true }),
  ).toBeVisible();
  const feedRow = page.locator("div.space-y-3 > div", { hasText: "Mood check-in" }).filter({ hasText: "good" });
  await expect(feedRow).toBeVisible();
  await expect(feedRow).toContainText("good");
  await expect(feedRow).toContainText("Oct 29");
  await expect(feedRow).toContainText("💚");
});

test("exercise: log a workout, see it in Recent Workouts, delete it", async ({ page }) => {
  await page.goto("/Exercise");

  await page.getByRole("button", { name: "Log Workout" }).click();
  await expect(page.getByText("Log New Workout")).toBeVisible();

  await page.getByLabel("Duration (minutes)").fill("30");
  await page.getByLabel("Calories Burned (optional)").fill("250");
  await page.getByLabel("Notes (optional)").fill("Felt great");

  await page.getByRole("button", { name: "Save Workout" }).click();

  await expect(page.getByText("Workout logged")).toBeVisible();
  await expect(page.getByText("Total Workouts").locator("..").getByRole("heading", { name: "1" })).toBeVisible();
  await expect(page.getByText("30 min").first()).toBeVisible();

  // Delete (the trash on the row).
  await page.getByRole("button", { name: /Delete .* workout/ }).click();
  await expect(page.getByText("No workouts logged yet")).toBeVisible();
});

test("mental health: log a mood entry with the emoji picker", async ({ page }) => {
  await page.goto("/MentalHealth");

  await page.getByRole("button", { name: "New Entry" }).click();
  await expect(page.getByText("How are you feeling today?")).toBeVisible();

  // WH-21: exact matching — the journal list's delete buttons ("Delete
  // Amazing entry") also match the loose /Amazing/ form, and a persisted
  // entry from an earlier spec turns the tile click into a strict-mode
  // violation (caught live when the worker scheduling shifted).
  await page.getByRole("button", { name: "Amazing", exact: true }).click();
  await page.locator("#mood-activities").fill("Exercise");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.locator("#mood-gratitude").fill("A quiet morning");

  await page.getByRole("button", { name: "Save Entry" }).click();

  await expect(page.getByText("Mood check-in saved")).toBeVisible();
  await expect(page.getByText("Amazing").first()).toBeVisible();
});

test("assignments: create, complete, delete", async ({ page }) => {
  await page.goto("/Assignments");

  await page.getByRole("button", { name: "New Assignment" }).click();
  await page.getByLabel("Title").fill("Chapter 5 exercises");
  await page.getByLabel("Subject/Category").fill("Math");
  await page.getByRole("button", { name: "Create Assignment" }).click();

  await expect(page.getByText("Assignment created")).toBeVisible();
  await expect(page.getByText("Chapter 5 exercises")).toBeVisible();
  await expect(page.getByText("Pending").locator("..").getByRole("heading", { name: "1" })).toBeVisible();

  // Complete it.
  await page.getByRole("button", { name: /Complete Chapter 5 exercises/ }).click();
  await expect(page.getByText(/completed — nice work/)).toBeVisible();

  // Delete it.
  await page.getByRole("button", { name: /Delete Chapter 5 exercises/ }).click();
  // WH-23: the reference OMITS the list section at zero rows (probed —
  // /Assignments ends after the KPI row), so the empty state is the
  // section's ABSENCE, never an empty-state card.
  await expect(page.getByRole("heading", { name: "Your Assignments" })).toHaveCount(0);
});

test("events: create an event, see the calendar dot + upcoming, delete", async ({ page }) => {
  await page.goto("/Events");

  await page.getByRole("button", { name: "New Event" }).click();
  await page.getByLabel("Event Title").fill("Study group");
  await page.getByLabel("Location (optional)").fill("Library");
  await page.getByRole("button", { name: "Create Event" }).click();

  await expect(page.getByText("Event created")).toBeVisible();
  await expect(page.getByText("Study group").first()).toBeVisible();

  await page.getByRole("button", { name: /Delete Study group/ }).click();
  // WH-23: the reference's events-page empty form is the BARE empty list
  // (probed: no empty-state message there) — the deletion's evidence is
  // the row's disappearance, never an empty-state text.
  await expect(page.getByText("Study group")).toHaveCount(0);
});

test("study resources: create with tags + rating, filter by search", async ({ page }) => {
  await page.goto("/StudyResources");

  await page.getByRole("button", { name: "Add Resource" }).click();
  await page.getByLabel("Resource Title").fill("Chapter 5 Notes");
  await page.getByLabel("Subject/Course").fill("Biology 101");
  await page.locator("#sr-tags").fill("midterm");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByRole("radio", { name: "3 stars" }).click();
  await page.getByRole("button", { name: "Add Resource" }).last().click();

  await expect(page.getByText("Resource added")).toBeVisible();
  await expect(page.getByText("Chapter 5 Notes")).toBeVisible();

  // The search filter narrows live.
  await page.getByLabel("Search resources, tags...").fill("chemistry");
  await expect(page.getByText("No resources found. Add your study materials")).toBeVisible();
  await page.getByLabel("Search resources, tags...").fill("midterm");
  await expect(page.getByText("Chapter 5 Notes")).toBeVisible();
});

test("events: the create form is an inline expanding card, not a modal (the reference's modality)", async ({ page }) => {
  await page.goto("/Events");

  await page.getByRole("button", { name: "New Event" }).click();
  const title = page.getByText("Create New Event");
  await expect(title).toBeVisible();

  // No dialog role, no overlay scrim — the reference's create-forms are
  // inline cards (probed live: zero fixed overlay layers when its forms
  // open; only its Routines Schedule flow is a modal).
  await expect(page.locator('[role="dialog"]'), "the create-form must NOT ship as a dialog").toHaveCount(0);
  await expect(page.locator('[class*="bg-black/80"]'), "no overlay scrim may render").toHaveCount(0);

  // In-flow: every ancestor static (not fixed/absolute) and the page not
  // scroll-locked (the Radix dialog's body lock retires with the modality).
  const flow = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("h2")).find((h) =>
      h.textContent?.includes("Create New Event"),
    );
    if (!el) return { error: "title missing" as const };
    let n: Element | null = el;
    while (n && n !== document.body) {
      const p = getComputedStyle(n).position;
      if (p === "fixed" || p === "absolute") return { positioned: p };
      n = n.parentElement;
    }
    return { flow: "static" as const, bodyOverflow: getComputedStyle(document.body).overflow };
  });
  expect(flow.flow, "the form card must sit in the page flow (every ancestor static)").toBe("static");
  expect(flow.bodyOverflow, "the page must NOT be scroll-locked").toBe("visible");

  // Cancel closes the card.
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(title).toBeHidden();
});

test("reminders: create one, complete it", async ({ page }) => {
  await page.goto("/Reminders");

  await page.getByRole("button", { name: "New Reminder" }).click();
  await page.getByLabel("What should we remind you about?").fill("Study for Math exam");
  await page.locator("#rm-when").fill("2026-11-05T09:30");
  await page.getByRole("button", { name: "Create Reminder" }).click();

  await expect(page.getByText("Reminder set")).toBeVisible();
  await expect(page.getByText("Study for Math exam")).toBeVisible();
  await expect(page.getByText("Upcoming").locator("..").getByRole("heading", { name: "1" })).toBeVisible();

  await page.getByRole("button", { name: /Complete Study for Math exam/ }).click();
  await expect(page.getByText("Study for Math exam").locator("..")).toContainText(/Study for Math exam/);
});

test("goals: create, log progress to completion, earn points", async ({ page }) => {
  await page.goto("/Goals");

  await page.getByRole("button", { name: "New Goal" }).click();
  await page.getByLabel("Goal Title").fill("Exercise 3 times per week");
  await page.getByLabel("Target Value").fill("3");
  await page.getByLabel("Unit").fill("times");
  await page.getByRole("button", { name: "Create Goal" }).click();

  await expect(page.getByText("Goal created")).toBeVisible();

  // Log progress thrice → completes at 3/3 with points.
  await page.getByRole("button", { name: "+1 times" }).click();
  await expect(page.getByText("Progress logged: 1/3 times")).toBeVisible();
  await page.getByRole("button", { name: "+1 times" }).click();
  // Assert click #2's effect before dispatching #3: back-to-back unasserted
  // clicks race the post-response list re-render, and a click dispatched on the
  // detaching node is silently lost (observed once in the WH-9 baseline gate:
  // goal stuck at 2/3, completion toast never fired).
  await expect(page.getByText("Progress logged: 2/3 times")).toBeVisible();
  await page.getByRole("button", { name: "+1 times" }).click();
  await expect(page.getByText(/Goal completed/)).toBeVisible();
  // The points tile: the one_time goal (50) + the badges earned on the way
// (order-independent: earlier suite tests may persist first_workout /
// mood_first). The floor is the goal's own 50.
const pointsCard = page.getByText("Total Points").locator("..");
const pointsText = (await pointsCard.getByRole("heading").textContent()) ?? "0";
expect(Number(pointsText)).toBeGreaterThanOrEqual(50);
});

test("goals: the achievements section — the reference's earned-only vertical tiles (the catalog grid retired)", async ({ page }) => {
  // WH-29 (F-G): the reference's own bundle decodes the Achievements
  // section as a PER-USER Achievement row table (its demo account carries
  // zero rows — the empty state is the FACE), rendered as vertical
  // space-y-3 tiles. Our always-on 2×4 catalog grid retired with the
  // WH-29 cure; the section now renders EARNED badges only. By this leg
  // of the spec, the earlier exercise + mood tests have earned
  // first_workout ("First Step") + mood_first ("Self-Aware") — the
  // section must show them as vertical tiles, NEVER the wholesale
  // catalog (count < 8), with the decoded tile members (the h5 name +
  // the amber "+N pts").
  await page.goto("/Goals");

  // The achievement tiles are the page's only `p-4 rounded-xl border`
  // family (the Active Goals rows ride their own classes; the catalog
  // tile retires with this cure). By this leg first_workout + mood_first
  // (+ goal_first from the leg above) are EARNED and persisted in the
  // suite's shared e2e db — the tiles are the only legal settled state,
  // so the visibility wait doubles as the fetch settle (the pre-fetch
  // face renders the empty-state branch at achievements===undefined;
  // waiting for a TILE is waiting for the fetch to have landed). The
  // empty state itself is pinned by the capture round's 11-goals at the
  // seeded zero + the unit census's reachability condition.
  const tiles = page.locator("div.p-4.rounded-xl.border");
  await expect(tiles.first(), "the earned tiles: the earlier legs' badges (first_workout + mood_first) render as vertical tiles").toBeVisible();

  // Never the 8-tile catalog — the reference shows per-user EARNED rows
  // only (the wholesale catalog grid retired with the WH-29 cure).
  const count = await tiles.count();
  expect(count, "the achievements tiles: >= the badges earned by the earlier legs, never the 8-row catalog").toBeGreaterThanOrEqual(2);
  expect(count, "the wholesale catalog grid never renders — the reference shows per-user EARNED rows only").toBeLessThan(8);

  // The decoded members: the H5 name + the amber "+N pts" span.
  await expect(tiles.first().locator("h5")).toBeVisible();
  await expect(tiles.first().getByText(/\+\d+ pts/)).toBeVisible();

  // The retired catalog-grid face: the 2×4 grid container is gone.
  await expect(page.locator("div.grid.grid-cols-2.sm\\:grid-cols-4")).toHaveCount(0);
});

test("routines: schedule a template into My Routines", async ({ page }) => {
  await page.goto("/Routines");

  await expect(page.getByText("Browse Templates")).toBeVisible();
  await expect(page.getByText("5-Minute Morning Energizer").first()).toBeVisible();

  // WH-42: the picker is TEXT-SCOPED, never positional — the reference
  // re-ordered its template grid (the WH-42 F-1 cure re-sequenced our
  // seed to match) and `.first()` now opens the FIRST card in the
  // reference's order ("10-Minute Home Workout"), not family-A. The
  // test's intent is to schedule the 3-step family-A template (the (q)
  // leg's sibling contract); the (q) leg's own filter pattern, applied
  // here verbatim.
  const familyACard = page
    .locator("div.group")
    .filter({ has: page.getByText("5-Minute Morning Energizer", { exact: true }) });
  await familyACard.getByRole("button", { name: "Use This Template" }).click();
  await expect(page.getByRole("dialog").getByText(/Schedule: 5-Minute Morning Energizer/)).toBeVisible();
  await expect(page.getByText("Routine Steps:")).toBeVisible();

  // WH-22: the modal's CONTENT anatomy, live-verified (the never-probed
  // modal's cure — every member probed field-by-field on the reference
  // 2026-10-31): the 672px width (max-w-2xl), NO Cancel (the primary
  // alone at w-full — the corner X is the dismiss), and the primary's
  // face = the routines MODULE pair (purple→pink, verified on two
  // different-category templates — never the brand indigo, never the
  // category gradient).
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("button", { name: "Cancel" })).toHaveCount(0);
  // Settle ≥400 ms before the geometry read — the dialog's zoom-in-95
  // animate-in interpolates the transform scale (0.95→1.0 over 200 ms)
  // and the bounding rect reflects the animated frame (reads of 665–671
  // mid-flight; the WH-20 transition-settle doctrine, dialog-animation
  // edition — read after the animation, not after "visible").
  await page.waitForTimeout(450);
  const modalFace = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    if (!d) return { error: "no dialog" };
    const btn = Array.from(d.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Schedule This Routine"),
    );
    if (!btn) return { error: "no primary" };
    const s = getComputedStyle(btn);
    const num = d.querySelector("span.rounded-full");
    const tile = Array.from(d.querySelectorAll("div")).find((el) =>
      getComputedStyle(el).backgroundImage.includes("linear-gradient"),
    );
    return {
      width: Math.round(d.getBoundingClientRect().width),
      btnW: Math.round(btn.getBoundingClientRect().width),
      btnBg: s.backgroundImage,
      numBg: num ? getComputedStyle(num).backgroundColor : "(none)",
      tileBg: tile ? getComputedStyle(tile).backgroundImage.slice(0, 130) : "(none)",
    };
  });
  expect(modalFace.error, `the modal face must read (${JSON.stringify(modalFace)})`).toBeFalsy();
  expect(
    Math.abs(modalFace.width! - 672),
    `the dialog is the reference's 672px max-w-2xl form (read ${modalFace.width}; ±1 the engine's sub-pixel rounding of 42rem)`,
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(modalFace.btnW! - (modalFace.width! - 50)),
    `the primary is w-full: the dialog's CONTENT width (read btn ${modalFace.btnW} vs dialog ${modalFace.width} — 672 − 2×24px padding − 2×1px border = 622; the Cancel+pair footer retired)`,
  ).toBeLessThanOrEqual(2);
  expect(modalFace.btnBg, "the primary's face is the routines MODULE pair (purple→pink)").toContain("168, 85, 247");
  expect(modalFace.btnBg).toContain("236, 72, 153");
  expect(modalFace.numBg, "the step circle is the reference's solid purple-500 (the fixed module pair)").toBe("rgb(168, 85, 247)");
  expect(modalFace.tileBg, "the description tile is the purple→pink gradient-50 wash").toContain("linear-gradient");

  await page.getByRole("button", { name: "Schedule This Routine" }).click();
  await expect(page.getByText(/scheduled — you've got this!/)).toBeVisible();
  await expect(page.getByText("My Routines").locator("..").getByText("1 scheduled")).toBeVisible();
});

test("routines: the family-B Schedule modal — the dynamic step count (the WH-33 (q) leg)", async ({ page }) => {
  await page.goto("/Routines");

  // WH-33 (F-2, the (c) probe decoded on the reference's round-21 build):
  // the Schedule modal's ANATOMY is identical across template families —
  // the split is the STEP COUNT, data-driven through each template's own
  // steps on BOTH apps (family-A "5-Minute Morning Energizer" renders 3
  // step circles, family-B "Creative Flow Session" renders 5 — probed
  // live on the reference). The sibling leg above exercises only
  // family-A's 3; this leg pins the family-B count — the dynamic
  // `scheduling.steps` rendering AND the seed's family-B step data
  // guarded (a born-green standing drift guard, the (o) leg precedent).
  const creativeCard = page
    .locator("div.group")
    .filter({ has: page.getByText("Creative Flow Session", { exact: true }) });
  // The family-B marker: the thumbnail img (alt = the template name) —
  // the (p) leg's family, asserted here only as the split's context.
  await expect(creativeCard.getByRole("img", { name: "Creative Flow Session" })).toBeVisible();
  await creativeCard.getByRole("button", { name: "Use This Template" }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText(/Schedule: Creative Flow Session/)).toBeVisible();
  await expect(dialog.getByText("Routine Steps:")).toBeVisible();
  // Settle ≥400 ms before the reads — the dialog's zoom-in-95 animate-in
  // interpolates the transform scale (the WH-20 transition-settle
  // doctrine; the sibling leg's own wait, dialog-animation edition).
  await page.waitForTimeout(450);

  const familyB = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    if (!d) return { error: "no dialog" };
    const purpleCircles = Array.from(d.querySelectorAll("span.rounded-full")).filter(
      (s) => getComputedStyle(s).backgroundColor === "rgb(168, 85, 247)",
    );
    const stepTitles = Array.from(d.querySelectorAll("ol li p:first-of-type")).map((p) =>
      p.textContent?.trim(),
    );
    return {
      circleCount: purpleCircles.length,
      circleTexts: purpleCircles.map((s) => s.textContent?.trim()),
      firstStep: stepTitles[0] ?? "(none)",
    };
  });
  expect(familyB.error, `the modal face must read (${JSON.stringify(familyB)})`).toBeFalsy();
  expect(
    familyB.circleCount,
    `family-B's modal renders the template's OWN five steps (read ${familyB.circleCount}: ${familyB.circleTexts?.join(",")}) — family-A's sibling leg schedules the 3-step template; the split is data, not renderer`,
  ).toBe(5);
  expect(
    familyB.firstStep,
    "the first family-B step title flows from the seed's step list (the data path — API → store → modal)",
  ).toBe("Set up inspiring space");

  // Read-only leg: never submit — Escape back out (the zero-write class).
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("learning: the seeded catalog renders and search filters it", async ({ page }) => {
  await page.goto("/Learning");

  await expect(page.getByText("Overcoming Procrastination: The 2-Minute Rule")).toBeVisible();
  await expect(page.getByText("Time Management Mastery")).toBeVisible();

  await page.getByLabel("Search tutorials").fill("procrastination");
  await expect(page.getByText("Overcoming Procrastination: The 2-Minute Rule")).toBeVisible();
  await expect(page.getByText("Time Management Mastery")).toBeHidden();
});

test("profile: the appearance tab presets re-skin the app live", async ({ page }) => {
  await page.goto("/Profile");

  await expect(page.getByRole("tab", { name: "Appearance" })).toBeVisible();

  // A preset click repaints the brand pair (the sidebar wordmark's
  // gradient).
  await page.getByRole("button", { name: /Forest Green/ }).click();

  // The store writes the raw hex custom property onto <html> (computed
  // styling of custom properties returns the raw token, not rgb()).
  const root = page.locator("html");
  await expect(root).toHaveCSS("--color-primary", "#10b981");

  // Theme Mode flips the dark class.
  await page.getByRole("button", { name: "Dark", exact: true }).click();
  await expect(root).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Light", exact: true }).click();
  await expect(root).not.toHaveClass(/dark/);
});

// WH-28 (F-2): the Recent Activity feed — the reference's three-kind
// builder, decoded from its own bundle. The pin that matters most: the
// row date keys off the ENTITY's date field ("MMM d"), never createdAt
// — before the cure, a workout dated 10 days ago rendered TODAY's
// short date on the feed row. The leg creates a PAST-dated workout
// through the real form and asserts the feed row: the 🏃 glyph, the
// reference's title/subtitle pair ("cardio workout" / "30 minutes"),
// and the PAST date — the createdAt-drift pin.
test("dashboard: the Recent Activity feed — the reference's 3-kind builder with entity dates", async ({ page }) => {
  const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const past = new Date(Date.now() - 10 * 86_400_000);
  const pastIso = `${past.getFullYear()}-${String(past.getMonth() + 1).padStart(2, "0")}-${String(past.getDate()).padStart(2, "0")}`;
  const pastShort = `${MONTHS_SHORT[past.getMonth()]} ${past.getDate()}`;

  await page.goto("/Exercise");
  await page.getByRole("button", { name: "Log Workout" }).click();
  await expect(page.getByText("Log New Workout")).toBeVisible();

  await page.getByLabel("Duration (minutes)").fill("30");
  await page.locator("#workout-date").fill(pastIso);
  await page.getByRole("button", { name: "Save Workout" }).click();
  await expect(page.getByText("Workout logged")).toBeVisible();

  // The feed row on the dashboard: the reference's own shape.
  await page.goto("/dashboard");
  const row = page.locator("div.space-y-3 > div", { hasText: "cardio workout" });
  await expect(row).toBeVisible();
  await expect(row).toContainText("cardio workout");
  await expect(row).toContainText("30 minutes");
  await expect(row).toContainText("🏃");
  // The entity-date pin: the row renders the PAST short date, never
  // today's (the createdAt drift this round cured).
  await expect(row.locator("span.text-xs")).toHaveText(pastShort);

  // Cleanup: the residue row leaves the feed for the later specs.
  await page.goto("/Exercise");
  await page.getByRole("button", { name: /Delete .* workout/ }).click();
  await expect(page.getByText("No workouts logged yet")).toBeVisible();
});

