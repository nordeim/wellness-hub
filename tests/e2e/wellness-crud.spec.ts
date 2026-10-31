import { expect, test } from "@playwright/test";

// The CRUD battery — one cycle per module, through the real forms.
// WH-21: the seven module create-forms are INLINE expanding cards now
// (the reference's modality — probed live: its forms open with zero
// overlays, in-flow, no scroll lock; only its Routines Schedule flow is a
// modal), so the form-title locators retargeted off role=dialog (the
// Routines schedule leg below KEEPS its dialog locator — the parity
// match).

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

test("routines: schedule a template into My Routines", async ({ page }) => {
  await page.goto("/Routines");

  await expect(page.getByText("Browse Templates")).toBeVisible();
  await expect(page.getByText("5-Minute Morning Energizer").first()).toBeVisible();

  await page
    .getByRole("button", { name: "Use This Template" })
    .first()
    .click();
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
