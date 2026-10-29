import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatDateShort,
  formatMonthYear,
  formatMonthDayYearTime,
} from "@/lib/format";

// WH-7 (the format.ts retirement): the CRM-era subgraph's pins retired with
// the subgraph — the money family (12 checks narrating "the reports
// uppercase-K variant" / "the Sales Target formula" / "the topbar hint"),
// the relative-time pair, the calendarGrid family (its live twin is
// wellness.ts monthGrid, pinned in tests/wellness-helpers.test.ts), and
// the date primitives that fed only the dead subgraph. Zero of them had a
// src consumer; the tests pinned CRM surfaces that never shipped here.
//
// What stays: the four live formatters the nine wellness pages render,
// each now pinned — three of them for the first time (they had shipped
// unpinned; the retirement audit caught the gap and the pins landed in the
// same commit).

describe("date formatting", () => {
  const mar4 = new Date(2026, 2, 4, 15, 30);

  it("formats a long date", () => {
    expect(formatDate(mar4)).toBe("Mar 4, 2026");
  });

  it("renders em-dashes for missing dates", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate(undefined)).toBe("—");
    expect(formatDate("not-a-date")).toBe("—");
  });

  it("formats the short date without the year (routines/goals/events lists)", () => {
    expect(formatDateShort(mar4)).toBe("Mar 4");
    expect(formatDateShort(new Date(2026, 11, 31))).toBe("Dec 31");
    expect(formatDateShort(null)).toBe("—");
  });

  it("formats the long month + year (the events calendar header)", () => {
    expect(formatMonthYear(new Date(2026, 9, 15))).toBe("October 2026");
    expect(formatMonthYear(new Date(2026, 0, 1))).toBe("January 2026");
    expect(formatMonthYear("not-a-date")).toBe("—");
  });

  it("formats the moment form with year + 12h clock (reminders + dashboard upcoming rows)", () => {
    expect(formatMonthDayYearTime(mar4)).toBe("Mar 4, 2026 3:30 PM");
    expect(formatMonthDayYearTime(new Date(2026, 2, 4, 0, 5))).toBe("Mar 4, 2026 12:05 AM");
    expect(formatMonthDayYearTime(null)).toBe("—");
  });
});
