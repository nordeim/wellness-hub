import { db } from "@/lib/db";
import { ok, ERR, isGuarded, requireSession } from "@/lib/api";
import { recentActivityFeed } from "@/lib/activity-feed";

export const dynamic = "force-dynamic";

/** The dashboard aggregate — ONE read powering every tile (the reference
 *  fires eight entity queries at mount; the envelope collapses them into
 *  a single server-side join — a superset that halves the waterfalls). */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // Monday
    weekStart.setHours(0, 0, 0, 0);

    const [workouts, moods, moodCount, assignments, goals, reminders, events] =
      await Promise.all([
        db.workout.findMany({
          where: { userId: guard.user.id },
          orderBy: { date: "desc" },
        }),
        db.moodEntry.findMany({
          where: { userId: guard.user.id },
          orderBy: { date: "desc" },
          // WH-28 (F-2): 5 → 50 — the reference's own mood-list bound; the
          // feed merges ALL moods before its cap, and a take of 5 starved
          // it (the top-8-by-entity-date face).
          take: 50,
        }),
        db.moodEntry.count({ where: { userId: guard.user.id } }),
        db.assignment.findMany({
          where: { userId: guard.user.id },
          orderBy: { createdAt: "desc" },
        }),
        db.goal.findMany({
          where: { userId: guard.user.id },
          orderBy: { createdAt: "desc" },
        }),
        db.reminder.findMany({
          where: { userId: guard.user.id, completed: false },
          orderBy: { remindAt: "asc" },
        }),
        db.event.findMany({
          where: { userId: guard.user.id },
          orderBy: { date: "asc" },
        }),
      ]);

    const weekWorkouts = workouts.filter((w) => new Date(w.date) >= weekStart);
    const dayStart = new Date(now);
    dayStart.setHours(0, 0, 0, 0);

    // WH-28 (F-2): the feed rides the pure seam — the reference's own
    // three-kind builder (exercise/mood/completed-assignments), the
    // row dates keyed off the ENTITY date fields, merged + sorted by
    // date DESC + capped at 8. The five-kind createdAt-keyed builder
    // retired with this conversion (src/lib/activity-feed.ts carries
    // the decode provenance).
    const activity = recentActivityFeed(workouts, moods, assignments);

    const upcomingReminders = reminders
      .filter((r) => new Date(r.remindAt) >= dayStart)
      .slice(0, 5);
    const upcomingEvents = events
      .filter((e) => new Date(e.date) >= dayStart)
      .slice(0, 5);

    return ok({
      workoutsThisWeek: weekWorkouts.length,
      workoutMinutesThisWeek: weekWorkouts.reduce(
        (sum, w) => sum + w.durationMinutes,
        0,
      ),
      moodEntries: moodCount,
      activeAssignments: assignments.filter((a) => a.status !== "completed").length,
      goalsCompleted: goals.filter((g) => g.status === "completed").length,
      goalsTotal: goals.length,
      recentActivity: activity,
      upcomingReminders,
      upcomingEvents,
    });
  } catch {
    return ERR.INTERNAL();
  }
}
