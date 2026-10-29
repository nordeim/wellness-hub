// Server-side badge awarding — the achievements engine's DB seam.
//
// Pure counting lives in src/lib/wellness.ts (earnedBadgeKeys — the
// Vitest-pinned predicate); this module is the Prisma side: it reads the
// live counts, computes the earned key set, and inserts ONLY the missing
// UserBadge rows (idempotent — the unique [userId, badgeId] pair is the
// backstop). Returns the freshly earned Badge rows so the route can toast
// the win.

import { db } from "@/lib/db";
import { currentStreak, earnedBadgeKeys, totalPoints } from "@/lib/wellness";

export async function awardBadges(userId: string) {
  const [workouts, moodEntries, assignments, goals, existing, catalog] = await Promise.all([
    db.workout.findMany({ where: { userId }, select: { date: true } }),
    db.moodEntry.findMany({ where: { userId }, select: { date: true } }),
    db.assignment.count({ where: { userId, status: "completed" } }),
    db.goal.findMany({ where: { userId }, select: { status: true, points: true } }),
    db.userBadge.findMany({ where: { userId }, select: { badgeId: true } }),
    db.badge.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const completedGoals = goals.filter((g) => g.status === "completed");
  const points = totalPoints(completedGoals, []);

  const keys = earnedBadgeKeys({
    workouts: workouts.length,
    moodEntries: moodEntries.length,
    moodStreak: currentStreak(moodEntries.map((m) => m.date)),
    completedGoals: completedGoals.length,
    completedAssignments: assignments,
    totalPoints: points,
  });

  const byKey = new Map(catalog.map((b) => [b.key, b]));
  const have = new Set(existing.map((e) => e.badgeId));
  const fresh: string[] = [];
  for (const key of keys) {
    const badge = byKey.get(key);
    if (!badge || have.has(badge.id)) continue;
    await db.userBadge.create({ data: { userId, badgeId: badge.id } });
    fresh.push(badge.id);
  }

  if (fresh.length === 0) return [];
  return db.badge.findMany({ where: { id: { in: fresh } }, orderBy: { sortOrder: "asc" } });
}
