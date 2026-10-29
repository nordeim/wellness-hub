import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  ASSIGNMENT_PRIORITIES,
  COLOR_PRESETS,
  EVENT_CATEGORIES,
  GOAL_CATEGORIES,
  GOAL_FREQUENCIES,
  GOAL_FREQUENCY_POINTS,
  MOODS,
  REMINDER_REPEATS,
  REMINDER_TYPES,
  RESOURCE_TYPES,
  THEME_MODES,
  TUTORIAL_CATEGORIES,
  WORKOUT_INTENSITIES,
  WORKOUT_TYPES,
  APP_NAME,
  APP_TAGLINE,
  APP_LOGIN_TITLE,
  difficultyMeta,
  eventCategoryMeta,
  goalCategoryMeta,
  goalFrequencyMeta,
  intensityMeta,
  moodMeta,
  priorityMeta,
  reminderTypeMeta,
  repeatMeta,
  resourceTypeMeta,
  tutorialCategoryMeta,
  workoutTypeMeta,
} from "@/lib/constants";
import { isNavActive, NAV_FOOTER_ITEMS, NAV_ITEMS } from "@/components/layout/nav-config";

const read = (p: string) => readFileSync(path.resolve(import.meta.dirname, "..", "src", p), "utf8");

// The vocabularies — byte-verified against the reference's live DOM
// (2026-10-29): every option list the comboboxes serve.

describe("the option vocabularies match the reference", () => {
  it("workout types: the 8 emoji options", () => {
    expect(WORKOUT_TYPES.map((t) => t.value)).toEqual([
      "cardio", "strength", "yoga", "sports", "walking", "cycling", "swimming", "other",
    ]);
    expect(WORKOUT_TYPES[0].label).toBe("Cardio");
    expect(WORKOUT_TYPES[0].icon).toBe("🏃");
  });

  it("intensities: Light/Moderate/Intense", () => {
    expect(WORKOUT_INTENSITIES.map((t) => t.value)).toEqual(["light", "moderate", "intense"]);
  });

  it("moods: the 5 emoji buttons", () => {
    expect(MOODS.map((m) => m.value)).toEqual(["amazing", "good", "okay", "low", "struggling"]);
    expect(MOODS.map((m) => m.icon)).toEqual(["😄", "😊", "😐", "😔", "😢"]);
    expect(MOODS.map((m) => m.label)).toEqual(["Amazing", "Good", "Okay", "Low", "Struggling"]);
  });

  it("assignment priorities: Low/Medium/High/Urgent", () => {
    expect(ASSIGNMENT_PRIORITIES.map((p) => p.value)).toEqual(["low", "medium", "high", "urgent"]);
  });

  it("event categories: the reference's 6", () => {
    expect(EVENT_CATEGORIES.map((c) => c.value)).toEqual([
      "personal", "work", "social", "health", "education", "other",
    ]);
  });

  it("resource types: the 8 emoji options", () => {
    expect(RESOURCE_TYPES.map((t) => t.value)).toEqual([
      "notes", "video", "practice_test", "textbook", "article", "website", "flashcards", "other",
    ]);
    expect(RESOURCE_TYPES[0].icon).toBe("📝");
  });

  it("reminder types + repeats", () => {
    expect(REMINDER_TYPES.map((t) => t.value)).toEqual([
      "custom", "assignment", "event", "goal", "routine",
    ]);
    expect(REMINDER_REPEATS.map((r) => r.value)).toEqual(["none", "daily", "weekly", "monthly"]);
  });

  it("goal categories + frequencies", () => {
    expect(GOAL_CATEGORIES.map((c) => c.value)).toEqual([
      "exercise", "mental_health", "learning", "productivity", "personal", "other",
    ]);
    expect(GOAL_FREQUENCIES.map((f) => f.value)).toEqual([
      "daily", "weekly", "monthly", "yearly", "one_time",
    ]);
  });

  it("every frequency has a points value", () => {
    for (const f of GOAL_FREQUENCIES) {
      expect(typeof GOAL_FREQUENCY_POINTS[f.value]).toBe("number");
    }
  });

  it("tutorial categories: the reference's 6", () => {
    expect(TUTORIAL_CATEGORIES.map((c) => c.value)).toEqual([
      "productivity", "life_skills", "mental_health", "wellness", "study_skills", "exercise",
    ]);
  });

  it("the meta lookups fall back to their defaults on garbage", () => {
    expect(workoutTypeMeta("zzz").value).toBe("other");
    expect(intensityMeta("zzz").value).toBe("moderate");
    expect(moodMeta("zzz").value).toBe("okay");
    expect(priorityMeta("zzz").value).toBe("medium");
    expect(eventCategoryMeta("zzz").value).toBe("personal");
    expect(resourceTypeMeta("zzz").value).toBe("notes");
    expect(reminderTypeMeta("zzz").value).toBe("custom");
    expect(repeatMeta("zzz").value).toBe("none");
    expect(goalCategoryMeta("zzz").value).toBe("personal");
    expect(goalFrequencyMeta("zzz").value).toBe("one_time");
    expect(tutorialCategoryMeta("zzz").value).toBe("productivity");
    expect(difficultyMeta("zzz").value).toBe("easy");
  });
});

describe("the appearance vocabulary", () => {
  it("theme modes: Light/Dark/Auto", () => {
    expect(THEME_MODES.map((m) => m.value)).toEqual(["light", "dark", "auto"]);
  });

  it("the 8 Quick Presets, Indigo Dream first (the reference's default)", () => {
    expect(COLOR_PRESETS).toHaveLength(8);
    expect(COLOR_PRESETS[0]).toEqual({
      key: "indigo_dream",
      label: "Indigo Dream",
      primary: "#6366f1",
      secondary: "#a855f7",
    });
    expect(COLOR_PRESETS.map((p) => p.label)).toEqual([
      "Indigo Dream", "Ocean Blue", "Forest Green", "Sunset Orange",
      "Rose Pink", "Royal Purple", "Crimson Red", "Golden Yellow",
    ]);
  });

  it("every preset color is a valid #rrggbb", () => {
    for (const p of COLOR_PRESETS) {
      expect(p.primary).toMatch(/^#[0-9a-f]{6}$/);
      expect(p.secondary).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});

describe("the app identity strings", () => {
  it("carries the reference's names", () => {
    expect(APP_NAME).toBe("Wellness Hub");
    expect(APP_TAGLINE).toBe("Your personal companion");
    expect(APP_LOGIN_TITLE).toBe("Welcome to EvolveWell");
  });

  it("the login card renders the EvolveWell title", () => {
    expect(read("components/layout/login-card.tsx")).toContain("Welcome to EvolveWell");
  });
});

describe("the nav config", () => {
  it("carries the 10 items + the Profile & Settings footer", () => {
    expect(NAV_ITEMS.map((i) => i.href)).toEqual([
      "/Dashboard", "/Routines", "/Exercise", "/MentalHealth", "/Assignments",
      "/Events", "/StudyResources", "/Reminders", "/Learning", "/Goals",
    ]);
    expect(NAV_ITEMS.map((i) => i.label)).toEqual([
      "Dashboard", "Routine Templates", "Exercise", "Mental Health", "Assignments",
      "Events", "Study Resources", "Reminders", "Learning", "Goals & Achievements",
    ]);
    expect(NAV_FOOTER_ITEMS.map((i) => i.href)).toEqual(["/Profile"]);
    expect(NAV_FOOTER_ITEMS[0].label).toBe("Profile & Settings");
  });

  it("isNavActive is case-insensitive + prefix-aware", () => {
    expect(isNavActive("/learning", "/Learning")).toBe(true);
    expect(isNavActive("/Learning", "/learning")).toBe(true);
    expect(isNavActive("/", "/Dashboard")).toBe(true);
    expect(isNavActive("/dashboard", "/Dashboard")).toBe(true);
    expect(isNavActive("/goals/extra", "/Goals")).toBe(true);
    expect(isNavActive("/routines", "/Goals")).toBe(false);
    expect(isNavActive("/login", "/Dashboard")).toBe(false);
  });

  it("the sidebar + drawer share the one nav source", () => {
    const sidebar = read("components/layout/sidebar.tsx");
    const drawer = read("components/layout/mobile-nav.tsx");
    expect(sidebar).toContain("NAV_ITEMS");
    expect(drawer).toContain("NAV_ITEMS");
    expect(drawer).toContain("NAV_FOOTER_ITEMS");
  });
});
