import { describe, expect, it } from "vitest";
import {
  assignmentCreateSchema,
  assignmentUpdateSchema,
  eventCreateSchema,
  goalCreateSchema,
  goalUpdateSchema,
  moodEntryCreateSchema,
  prefsSchema,
  reminderCreateSchema,
  studyResourceCreateSchema,
  userRoutineCreateSchema,
  workoutCreateSchema,
  workoutUpdateSchema,
} from "@/lib/schemas";

// The wellness CRUD seam — every boundary a route parses, pinned.

describe("workoutCreateSchema", () => {
  const base = { durationMinutes: 30, date: "2026-10-29" };

  it("defaults type/intensity and passes the required pair", () => {
    const r = workoutCreateSchema.parse(base);
    expect(r.type).toBe("cardio");
    expect(r.intensity).toBe("moderate");
    expect(r.durationMinutes).toBe(30);
  });

  it("rejects a non-positive duration", () => {
    expect(() => workoutCreateSchema.parse({ ...base, durationMinutes: 0 })).toThrow();
  });

  it("rejects an unknown type", () => {
    expect(() => workoutCreateSchema.parse({ ...base, type: "moonwalk" })).toThrow();
  });

  it("update partial: absent fields leave no write", () => {
    const r = workoutUpdateSchema.parse({ durationMinutes: 45 });
    expect(r).toEqual({ durationMinutes: 45 });
  });
});

describe("moodEntryCreateSchema", () => {
  it("stringifies the activities array", () => {
    const r = moodEntryCreateSchema.parse({
      mood: "amazing",
      energy: 8,
      activities: ["Exercise", "Friends"],
      date: "2026-10-29",
    });
    expect(r.activities).toBe('["Exercise","Friends"]');
  });

  it("rejects an out-of-range energy", () => {
    expect(() =>
      moodEntryCreateSchema.parse({ mood: "good", energy: 11, date: "2026-10-29" }),
    ).toThrow();
    expect(() =>
      moodEntryCreateSchema.parse({ mood: "good", energy: -1, date: "2026-10-29" }),
    ).toThrow();
  });

  it("rejects an unknown mood", () => {
    expect(() =>
      moodEntryCreateSchema.parse({ mood: "ecstatic", energy: 5, date: "2026-10-29" }),
    ).toThrow();
  });

  it("keeps the five moods valid", () => {
    for (const mood of ["amazing", "good", "okay", "low", "struggling"]) {
      expect(() =>
        moodEntryCreateSchema.parse({ mood, energy: 5, date: "2026-10-29" }),
      ).not.toThrow();
    }
  });
});

describe("assignmentCreateSchema", () => {
  it("requires the title and defaults the priority", () => {
    const r = assignmentCreateSchema.parse({ title: "Essay" });
    expect(r.priority).toBe("medium");
  });

  it("rejects a blank title", () => {
    expect(() => assignmentCreateSchema.parse({ title: "   " })).toThrow();
  });

  it("update accepts the status toggle", () => {
    const r = assignmentUpdateSchema.parse({ status: "completed" });
    expect(r.status).toBe("completed");
    expect(() => assignmentUpdateSchema.parse({ status: "archived" })).toThrow();
  });
});

describe("eventCreateSchema", () => {
  it("requires title + date, defaults personal", () => {
    const r = eventCreateSchema.parse({ title: "Study group", date: "2026-11-01" });
    expect(r.category).toBe("personal");
    expect(r.time).toBeNull();
  });

  it("validates the HH:MM time arm", () => {
    expect(eventCreateSchema.parse({ title: "X", date: "2026-11-01", time: "18:30" }).time).toBe("18:30");
    expect(() => eventCreateSchema.parse({ title: "X", date: "2026-11-01", time: "6pm" })).toThrow();
  });

  it("rejects an unknown category", () => {
    expect(() =>
      eventCreateSchema.parse({ title: "X", date: "2026-11-01", category: "party" }),
    ).toThrow();
  });
});

describe("studyResourceCreateSchema", () => {
  it("requires title + subject, defaults notes type", () => {
    const r = studyResourceCreateSchema.parse({ title: "Notes", subject: "Biology 101" });
    expect(r.type).toBe("notes");
    expect(r.tags).toBe("[]");
  });

  it("requires an http(s) URL when one is present", () => {
    expect(() =>
      studyResourceCreateSchema.parse({ title: "N", subject: "S", url: "javascript:alert(1)" }),
    ).toThrow();
    expect(
      studyResourceCreateSchema.parse({ title: "N", subject: "S", url: "https://x.dev/a" }).url,
    ).toBe("https://x.dev/a");
  });

  it("caps the rating at 1-5 stars", () => {
    expect(() =>
      studyResourceCreateSchema.parse({ title: "N", subject: "S", rating: 6 }),
    ).toThrow();
    expect(studyResourceCreateSchema.parse({ title: "N", subject: "S", rating: 5 }).rating).toBe(5);
  });
});

describe("reminderCreateSchema", () => {
  it("requires the title + remindAt, defaults custom/medium/none", () => {
    const r = reminderCreateSchema.parse({ title: "Study", remindAt: "2026-11-05T09:30" });
    expect(r.type).toBe("custom");
    expect(r.priority).toBe("medium");
    expect(r.repeat).toBe("none");
  });

  it("update accepts the completed toggle", () => {
    expect(reminderCreateSchema.parse({ title: "X", remindAt: "2026-11-05T09:30", repeat: "daily" }).repeat).toBe("daily");
  });
});

describe("goalCreateSchema", () => {
  it("requires target + unit, defaults personal/one_time", () => {
    const r = goalCreateSchema.parse({ title: "Run", targetValue: 3, unit: "times" });
    expect(r.category).toBe("personal");
    expect(r.frequency).toBe("one_time");
    expect(r.currentValue).toBe(0);
  });

  it("rejects a zero target", () => {
    expect(() => goalCreateSchema.parse({ title: "X", targetValue: 0, unit: "u" })).toThrow();
  });

  it("update accepts the completion status", () => {
    expect(goalUpdateSchema.parse({ status: "completed" }).status).toBe("completed");
  });
});

describe("userRoutineCreateSchema", () => {
  it("carries the templateId + date pair, nulling the optional time", () => {
    const r = userRoutineCreateSchema.parse({
      templateId: "tpl1",
      title: "Morning",
      date: "2026-10-30",
    });
    expect(r.templateId).toBe("tpl1");
    expect(r.time).toBeNull();
  });

  it("rejects a blank title", () => {
    expect(() => userRoutineCreateSchema.parse({ title: " ", date: "2026-10-30" })).toThrow();
  });
});

describe("prefsSchema", () => {
  it("validates the hex colors and the enums", () => {
    expect(prefsSchema.parse({ primaryColor: "#6366f1" }).primaryColor).toBe("#6366f1");
    expect(() => prefsSchema.parse({ primaryColor: "indigo" })).toThrow();
    expect(() => prefsSchema.parse({ themeMode: "solarized" })).toThrow();
    expect(prefsSchema.parse({ notificationsEnabled: false }).notificationsEnabled).toBe(false);
  });

  it("requires http(s) on the bg image URL", () => {
    expect(() => prefsSchema.parse({ bgImageUrl: "data:text/html,x" })).toThrow();
    expect(prefsSchema.parse({ bgImageUrl: "" }).bgImageUrl).toBeNull();
  });
});
