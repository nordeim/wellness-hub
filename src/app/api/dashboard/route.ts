import { db } from "@/lib/db";
import { ok, ERR, isGuarded, requireSession } from "@/lib/api";

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
          take: 5,
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

    // Recent Activity — the five latest writes across the modules, merged
    // and time-ordered (the reference's "No recent activity" tile fills
    // with the same kinds: workouts, moods, assignments, events, goals).
    const activity = [
      ...workouts.slice(0, 5).map((w) => ({
        kind: "workout" as const,
        id: w.id,
        title: `Logged a ${w.durationMinutes}-minute workout`,
        detail: w.notes,
        at: w.createdAt,
      })),
      ...moods.map((m) => ({
        kind: "mood" as const,
        id: m.id,
        title: `Mood check-in: ${m.mood}`,
        detail: m.gratitude,
        at: m.createdAt,
      })),
      ...assignments.slice(0, 5).map((a) => ({
        kind: "assignment" as const,
        id: a.id,
        title: `Assignment "${a.title}" ${a.status === "completed" ? "completed" : "added"}`,
        detail: a.subject,
        at: a.createdAt,
      })),
      ...events.slice(0, 5).map((e) => ({
        kind: "event" as const,
        id: e.id,
        title: `Event "${e.title}" scheduled`,
        detail: e.location,
        at: e.createdAt,
      })),
      ...goals.slice(0, 5).map((g) => ({
        kind: "goal" as const,
        id: g.id,
        title: `Goal "${g.title}" ${g.status === "completed" ? "completed" : "created"}`,
        detail: null,
        at: g.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
      .slice(0, 5);

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
