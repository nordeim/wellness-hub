import { db } from "@/lib/db";
import { ok, ERR, isGuarded, requireSession } from "@/lib/api";
import { currentStreak, totalPoints } from "@/lib/wellness";

export const dynamic = "force-dynamic";

/** The Goals & Achievements merge: the badge catalog (ordered) with each
 *  row's earnedAt for THIS user, plus the Total Points stat (completed
 *  goals + earned badges — the reference's "Total Points" tile made
 *  real). */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const [catalog, earned, goals, moods] = await Promise.all([
      db.badge.findMany({ orderBy: { sortOrder: "asc" } }),
      db.userBadge.findMany({
        where: { userId: guard.user.id },
        select: { badgeId: true, earnedAt: true },
      }),
      db.goal.findMany({
        where: { userId: guard.user.id },
        select: { status: true, points: true },
      }),
      db.moodEntry.findMany({
        where: { userId: guard.user.id },
        select: { date: true },
      }),
    ]);

    const earnedMap = new Map(earned.map((e) => [e.badgeId, e.earnedAt]));
    const badges = catalog.map((b) => ({
      ...b,
      earnedAt: earnedMap.get(b.id) ?? null,
    }));

    const completedGoals = goals.filter((g) => g.status === "completed");
    const earnedRows = catalog.filter((b) => earnedMap.has(b.id));

    return ok({
      badges,
      goalsCompleted: completedGoals.length,
      goalsTotal: goals.length,
      badgesEarned: earnedRows.length,
      badgesTotal: catalog.length,
      moodStreak: currentStreak(moods.map((m) => m.date)),
      totalPoints: totalPoints(completedGoals, earnedRows),
    });
  } catch {
    return ERR.INTERNAL();
  }
}
