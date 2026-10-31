// Wellness domain logic — the pure, unit-tested seams of the app.
//
// Every consumer of these helpers passes plain data (dates as ISO strings
// or Date, arrays pre-parsed), so the whole module is node-safe and
// Vitest-pinned (tests/wellness-*.test.ts): streak math, points, badge
// awarding, reminder status derivation and the tag JSON codec.

import { GOAL_FREQUENCY_POINTS } from "@/lib/constants";
import type { Badge } from "@/types";

// ---------------------------------------------------------------------------
// Date helpers (day-anchored — the journal streak is date-based, the
// reference's "Current Streak N days" stat).
// ---------------------------------------------------------------------------

export function toDayKey(d: Date | string): string {
  const x = typeof d === "string" ? new Date(d) : d;
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isSameCalendarDay(a: Date | string, b: Date | string): boolean {
  return toDayKey(a) === toDayKey(b);
}

/** Day difference between two dates, calendar-based (a - b). */
export function dayDiff(a: Date | string, b: Date | string): number {
  const da = new Date(`${toDayKey(a)}T00:00:00`);
  const db = new Date(`${toDayKey(b)}T00:00:00`);
  return Math.round((da.getTime() - db.getTime()) / 86_400_000);
}

// ---------------------------------------------------------------------------
// Streaks — the longest run of CONSECUTIVE calendar days ending today (or
// yesterday, so an entry earlier today isn't required — the forgiving
// journal convention).
// ---------------------------------------------------------------------------

export function currentStreak(dates: (Date | string)[], now: Date = new Date()): number {
  if (dates.length === 0) return 0;
  const keys = [...new Set(dates.map((d) => toDayKey(d)))].sort();
  const last = keys[keys.length - 1];
  // The streak must be "live": the newest entry is today or yesterday.
  if (dayDiff(now, last) > 1) return 0;
  let streak = 1;
  for (let i = keys.length - 1; i > 0; i--) {
    if (dayDiff(keys[i], keys[i - 1]) === 1) streak++;
    else break;
  }
  return streak;
}

// WH-28 (F-3): the TWO-CONSUMER SPLIT — `currentStreak` above is the
// BADGE ENGINE's math (the "7-Day Streak" badge is "Journal your mood
// 7 days in a row" — the real consecutive-day semantics, unchanged);
// the mood page's "Current Streak" TILE mirrors the reference's own
// formula instead, decoded from its compiled bundle:
//   `e.length>0?Math.min(7,e.length):0`
// — the ENTRY COUNT capped at 7, not a streak at all (an entry 2 days
// ago reads 1 there; ours read 0 on identical data — the drift this
// round cured). The tile is the parity surface; the engine is our
// documented superset.
export function displayStreak(entryCount: number): number {
  return Math.min(7, entryCount);
}

// ---------------------------------------------------------------------------
// Points — goal completion awards the frequency-derived value; badges add
// their own. Total Points = sum(goal.points where completed) + sum(earned
// badge points).
// ---------------------------------------------------------------------------

export function goalPointsForFrequency(frequency: string): number {
  return GOAL_FREQUENCY_POINTS[frequency] ?? GOAL_FREQUENCY_POINTS.one_time;
}

export function totalPoints(
  completedGoals: { points: number }[],
  earnedBadges: { points: number }[],
): number {
  return (
    completedGoals.reduce((sum, g) => sum + (g.points ?? 0), 0) +
    earnedBadges.reduce((sum, b) => sum + (b.points ?? 0), 0)
  );
}

// ---------------------------------------------------------------------------
// Badge awarding — pure predicates over the user's live counts. The API
// routes call awardBadges(db, userId) after each mutation; the function
// returns the FRESHLY earned keys (for the toast).
// ---------------------------------------------------------------------------

interface BadgeCounts {
  workouts: number;
  moodEntries: number;
  moodStreak: number;
  completedGoals: number;
  completedAssignments: number;
  totalPoints: number;
}

export function earnedBadgeKeys(counts: BadgeCounts): string[] {
  const earned: string[] = [];
  if (counts.workouts >= 1) earned.push("first_workout");
  if (counts.workouts >= 10) earned.push("workout_10");
  if (counts.moodEntries >= 1) earned.push("mood_first");
  if (counts.moodStreak >= 7) earned.push("streak_7");
  if (counts.completedGoals >= 1) earned.push("goal_first");
  if (counts.completedGoals >= 5) earned.push("goals_5");
  if (counts.completedAssignments >= 10) earned.push("assignment_ace");
  if (counts.totalPoints >= 500) earned.push("wellness_warrior");
  return earned;
}

/** The badge catalog rows that are NOT yet earned (the Achievements grid's
 *  locked state). */
export function unearnedBadges(catalog: Badge[], earnedIds: Set<string>): Badge[] {
  return catalog.filter((b) => !earnedIds.has(b.id));
}

// ---------------------------------------------------------------------------
// Reminder status — Upcoming / Overdue / Completed (the reference's three
// stat tiles; derived, never stored).
// ---------------------------------------------------------------------------

type ReminderStatus = "upcoming" | "overdue" | "completed";

export function reminderStatus(
  r: { completed: boolean; remindAt: Date | string },
  now: Date = new Date(),
): ReminderStatus {
  if (r.completed) return "completed";
  return new Date(r.remindAt).getTime() < now.getTime() ? "overdue" : "upcoming";
}

// ---------------------------------------------------------------------------
// Assignment urgency — the Urgent tile counts pending assignments that are
// due within 48h (or overdue), plus urgent-priority pending ones.
// ---------------------------------------------------------------------------

export function isAssignmentUrgent(
  a: { status: string; dueDate: Date | string | null; priority: string },
  now: Date = new Date(),
): boolean {
  if (a.status === "completed") return false;
  if (a.priority === "urgent") return true;
  if (!a.dueDate) return false;
  const due = new Date(a.dueDate).getTime();
  return due - now.getTime() <= 48 * 3600_000;
}

// ---------------------------------------------------------------------------
// JSON tag codec — tags/activities/benefits ride SQLite as JSON strings;
// the codec never throws (a corrupt payload parses to []).
// ---------------------------------------------------------------------------

export function parseJsonArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

/** A display tag list for an input's Add-button vocabulary: trims, drops
 *  empties and duplicates, caps the list. */
export function normalizeTags(tags: string[], max = 20): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of tags) {
    const v = t.trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
    if (out.length >= max) break;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Mood averages — the Avg Energy stat (0-10, one decimal when needed).
// ---------------------------------------------------------------------------

export function averageEnergy(energies: number[]): number {
  if (energies.length === 0) return 0;
  const avg = energies.reduce((sum, e) => sum + e, 0) / energies.length;
  return Math.round(avg * 10) / 10;
}

// ---------------------------------------------------------------------------
// Calendar grid math — the Events page's month matrix (Sun-anchored, 6
// rows x 7 cols like the reference's grid).
// ---------------------------------------------------------------------------

export function monthGrid(year: number, month: number): Date[][] {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d));
    }
    weeks.push(week);
  }
  return weeks;
}

// ---------------------------------------------------------------------------
// Search — the reference's tutorial/resource search matches the title,
// description and tags (case-insensitive substring).
// ---------------------------------------------------------------------------

export function matchesQuery(
  query: string,
  fields: (string | null | undefined)[],
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((f) => (f ?? "").toLowerCase().includes(q));
}

/** Format an "HH:mm" 24h string to 12h display ("2:30 PM"); invalid or
 *  empty input returns "" (the panels omit the time arm entirely). */
export function formatTimeString(hhmm: string | null | undefined): string {
  if (!hhmm) return "";
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(hhmm);
  if (!m) return "";
  const h = Number(m[1]);
  const min = m[2];
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${min} ${ampm}`;
}
