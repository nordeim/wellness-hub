import { describe, expect, it } from "vitest";
import {
  averageEnergy,
  currentStreak,
  dayDiff,
  displayStreak,
  earnedBadgeKeys,
  goalPointsForFrequency,
  isAssignmentUrgent,
  reminderStatus,
  toDayKey,
  totalPoints,
} from "@/lib/wellness";

// The streak engine — the reference's "Current Streak N days" stat. The
// forgiving journal convention: the streak is live if the newest entry is
// today OR yesterday (a this-morning streak isn't zeroed by bedtime).

const DAY = 86_400_000;
const now = new Date("2026-10-29T12:00:00");

function daysAgo(n: number): Date {
  return new Date(now.getTime() - n * DAY);
}

describe("currentStreak", () => {
  it("is 0 for an empty journal", () => {
    expect(currentStreak([], now)).toBe(0);
  });

  it("counts a today entry as 1", () => {
    expect(currentStreak([now], now)).toBe(1);
  });

  it("keeps yesterday's streak live (the forgiving convention)", () => {
    expect(currentStreak([daysAgo(1)], now)).toBe(1);
  });

  it("counts consecutive days", () => {
    expect(currentStreak([now, daysAgo(1), daysAgo(2), daysAgo(3)], now)).toBe(4);
  });

  it("stops at the gap", () => {
    expect(currentStreak([now, daysAgo(1), daysAgo(3), daysAgo(4)], now)).toBe(2);
  });

  it("dies when the newest entry is 2+ days old", () => {
    expect(currentStreak([daysAgo(2), daysAgo(3)], now)).toBe(0);
  });

  it("dedupes same-day entries (two check-ins on one day = one day)", () => {
    expect(
      currentStreak(
        [
          new Date("2026-10-29T08:00:00"),
          new Date("2026-10-29T21:00:00"),
          new Date("2026-10-28T08:00:00"),
        ],
        now,
      ),
    ).toBe(2);
  });

  it("accepts ISO strings and Date objects interchangeably", () => {
    expect(currentStreak([now.toISOString(), new Date(daysAgo(1))], now)).toBe(2);
  });
});

describe("toDayKey + dayDiff", () => {
  it("anchors to the calendar day", () => {
    expect(toDayKey("2026-10-29T23:59:59")).toBe("2026-10-29");
    expect(toDayKey("2026-10-29T00:00:00")).toBe("2026-10-29");
  });

  it("dayDiff is calendar-based", () => {
    expect(dayDiff("2026-10-29T00:00:00", "2026-10-28T23:59:59")).toBe(1);
    expect(dayDiff("2026-10-28T00:00:00", "2026-10-28T10:00:00")).toBe(0);
  });
});

describe("points", () => {
  it("awards the frequency table", () => {
    expect(goalPointsForFrequency("daily")).toBe(10);
    expect(goalPointsForFrequency("weekly")).toBe(20);
    expect(goalPointsForFrequency("monthly")).toBe(30);
    expect(goalPointsForFrequency("yearly")).toBe(40);
    expect(goalPointsForFrequency("one_time")).toBe(50);
  });

  it("falls back to one_time on an unknown frequency", () => {
    expect(goalPointsForFrequency("nonsense")).toBe(50);
  });

  it("totals goals + badges", () => {
    expect(totalPoints([{ points: 50 }, { points: 20 }], [{ points: 10 }])).toBe(80);
    expect(totalPoints([], [])).toBe(0);
  });
});

describe("earnedBadgeKeys", () => {
  it("starts with first_workout + mood_first at the first log", () => {
    expect(
      earnedBadgeKeys({
        workouts: 1,
        moodEntries: 0,
        moodStreak: 0,
        completedGoals: 0,
        completedAssignments: 0,
        totalPoints: 0,
      }),
    ).toEqual(["first_workout"]);
  });

  it("earns every badge at the full counts", () => {
    const earned = earnedBadgeKeys({
      workouts: 12,
      moodEntries: 10,
      moodStreak: 7,
      completedGoals: 5,
      completedAssignments: 11,
      totalPoints: 600,
    });
    expect(earned).toEqual([
      "first_workout",
      "workout_10",
      "mood_first",
      "streak_7",
      "goal_first",
      "goals_5",
      "assignment_ace",
      "wellness_warrior",
    ]);
  });

  it("earns nothing at zero", () => {
    expect(
      earnedBadgeKeys({
        workouts: 0,
        moodEntries: 0,
        moodStreak: 0,
        completedGoals: 0,
        completedAssignments: 0,
        totalPoints: 0,
      }),
    ).toEqual([]);
  });
});

describe("reminderStatus", () => {
  it("classifies upcoming / overdue / completed", () => {
    expect(
      reminderStatus({ completed: false, remindAt: new Date("2026-10-30T09:00:00") }, now),
    ).toBe("upcoming");
    expect(
      reminderStatus({ completed: false, remindAt: new Date("2026-10-28T09:00:00") }, now),
    ).toBe("overdue");
    expect(
      reminderStatus(
        { completed: true, remindAt: new Date("2026-10-28T09:00:00") },
        now,
      ),
    ).toBe("completed");
  });
});

describe("isAssignmentUrgent", () => {
  it("flags urgent-priority pending work regardless of date", () => {
    expect(isAssignmentUrgent({ status: "pending", dueDate: null, priority: "urgent" }, now)).toBe(
      true,
    );
  });

  it("flags due-within-48h pending work", () => {
    expect(
      isAssignmentUrgent(
        { status: "pending", dueDate: new Date(now.getTime() + 24 * 3600_000), priority: "low" },
        now,
      ),
    ).toBe(true);
  });

  it("leaves distant and completed work alone", () => {
    expect(
      isAssignmentUrgent(
        { status: "pending", dueDate: new Date(now.getTime() + 10 * DAY), priority: "low" },
        now,
      ),
    ).toBe(false);
    expect(
      isAssignmentUrgent(
        { status: "completed", dueDate: new Date(now.getTime() + 3600_000), priority: "urgent" },
        now,
      ),
    ).toBe(false);
  });
});

describe("averageEnergy", () => {
  it("averages with one decimal", () => {
    expect(averageEnergy([])).toBe(0);
    expect(averageEnergy([5])).toBe(5);
    expect(averageEnergy([5, 6])).toBe(5.5);
    expect(averageEnergy([5, 6, 7])).toBe(6);
    expect(averageEnergy([5, 5, 5, 6])).toBe(5.3);
  });
});

// WH-28 (F-3): the mood page's "Current Streak" TILE mirrors the
// reference's own formula — decoded from its compiled bundle
// (`e.length>0?Math.min(7,e.length):0`): the ENTRY COUNT capped at 7,
// not a consecutive-day streak. The BADGE ENGINE keeps the real math
// (`currentStreak` above) — the two-consumer split: the tile is the
// parity surface, "7-Day Streak" ("Journal your mood 7 days in a
// row") is our superset.
describe("displayStreak (the tile's reference-mirroring stat)", () => {
  it("is the entry count capped at 7 — the reference's own bundle formula", () => {
    expect(displayStreak(0)).toBe(0);
    expect(displayStreak(1)).toBe(1);
    expect(displayStreak(3)).toBe(3);
    expect(displayStreak(7)).toBe(7);
    expect(displayStreak(20)).toBe(7);
  });
});
