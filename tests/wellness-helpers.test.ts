import { describe, expect, it } from "vitest";
import {
  formatTimeString,
  matchesQuery,
  monthGrid,
  normalizeTags,
  parseJsonArray,
  unearnedBadges,
} from "@/lib/wellness";
import type { Badge } from "@/types";

// The JSON tag codec — tags/activities/benefits ride SQLite as JSON
// strings; the codec NEVER throws (a corrupt payload parses to []).

describe("parseJsonArray", () => {
  it("parses a stored list", () => {
    expect(parseJsonArray('["a","b"]')).toEqual(["a", "b"]);
  });

  it("returns [] on null/undefined/empty", () => {
    expect(parseJsonArray(null)).toEqual([]);
    expect(parseJsonArray(undefined)).toEqual([]);
    expect(parseJsonArray("")).toEqual([]);
  });

  it("returns [] on a corrupt payload (never throws)", () => {
    expect(parseJsonArray("{not json")).toEqual([]);
    expect(parseJsonArray('{"a":1}')).toEqual([]);
    expect(parseJsonArray('[1,2,3]')).toEqual([]);
  });
});

describe("normalizeTags", () => {
  it("trims, drops empties and duplicates", () => {
    expect(normalizeTags([" mid ", "", "mid", "exam "])).toEqual(["mid", "exam"]);
  });

  it("caps the list", () => {
    const many = Array.from({ length: 30 }, (_, i) => `t${i}`);
    expect(normalizeTags(many)).toHaveLength(20);
  });
});

describe("monthGrid", () => {
  it("builds a Sun-anchored 6x7 matrix", () => {
    const weeks = monthGrid(2026, 9); // October 2026
    expect(weeks).toHaveLength(6);
    weeks.forEach((w) => expect(w).toHaveLength(7));
    // October 2026 starts on Thursday — the first row opens Sep 27 (Sunday).
    expect(weeks[0][0]).toEqual(new Date(2026, 8, 27));
    // The 1st of October sits in row 0, index 4 (Sun..Wed = Sep 27-30).
    expect(weeks[0][4]).toEqual(new Date(2026, 9, 1));
    // Every date is present exactly once across the matrix.
    const all = weeks.flat().map((d) => d.toDateString());
    expect(new Set(all).size).toBe(42);
    expect(all).toContain(new Date(2026, 9, 31).toDateString());
  });
});

describe("matchesQuery", () => {
  it("matches case-insensitively across all fields", () => {
    expect(matchesQuery("MATH", ["Math 101"])).toBe(true);
    expect(matchesQuery("midterm", [null, "Chapter 5", "midterm"])).toBe(true);
    expect(matchesQuery("  ", ["anything"])).toBe(true);
    expect(matchesQuery("zzz", ["Math", "Science"])).toBe(false);
  });
});

describe("formatTimeString", () => {
  it("formats 24h to 12h display", () => {
    expect(formatTimeString("09:30")).toBe("9:30 AM");
    expect(formatTimeString("14:05")).toBe("2:05 PM");
    expect(formatTimeString("00:00")).toBe("12:00 AM");
    expect(formatTimeString("12:00")).toBe("12:00 PM");
  });

  it("returns empty on null/invalid (the panels omit the arm)", () => {
    expect(formatTimeString(null)).toBe("");
    expect(formatTimeString(undefined)).toBe("");
    expect(formatTimeString("25:99")).toBe("");
    expect(formatTimeString("")).toBe("");
  });
});

describe("unearnedBadges", () => {
  const catalog: Badge[] = [
    { id: "a", key: "first_workout", name: "A", description: "", icon: "🏃", color: "#fff", points: 10, sortOrder: 0, earnedAt: null },
    { id: "b", key: "streak_7", name: "B", description: "", icon: "🔥", color: "#fff", points: 50, sortOrder: 1, earnedAt: null },
  ];

  it("splits the catalog on the earned set", () => {
    expect(unearnedBadges(catalog, new Set(["a"]))).toHaveLength(1);
    expect(unearnedBadges(catalog, new Set(["a", "b"]))).toHaveLength(0);
    expect(unearnedBadges(catalog, new Set())).toHaveLength(2);
  });
});
