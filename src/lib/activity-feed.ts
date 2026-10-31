// WH-28 (F-2): the Recent Activity feed builder — a PURE seam extracted
// from the dashboard route so the builder's shape is unit-pinnable.
// The construction is the reference's own, decoded from its compiled
// bundle (the feed was unobservable through WH-27 — zero rows on the
// reference; the demo account's data + the bundle decode opened it):
//
//   exercise → `${type} workout` + `${duration} minutes` (🏃, the ENTITY date)
//   mood     → "Mood check-in" + the raw mood value (💚, the ENTITY date)
//   assignments → COMPLETED ONLY: `${title}` + "Completed" (✅, updated_date)
//   merged → sorted by date DESC → capped at 8
//
// The row date keys off the ENTITY's date fields — NEVER createdAt
// (the drift this round cured: ours keyed rows off createdAt and
// rendered "Oct 31" where the reference renders "Oct 29" on identical
// data). The seam speaks OUR wire names (kind/title/detail/at — the
// reference's type/title/subtitle/date are its internals); parity is
// the rendered face. The glyph map lives at the page (the reference's
// 🏃/💚/✅); the delete/never-delete affordances are not feed concerns.

/** The narrow row shapes the seam consumes (the Prisma rows satisfy
 *  these structurally — the seam never imports the client). Kept
 *  module-private (the WH-11 doctrine: a same-module-only type cures
 *  by dropping the `export` keyword, keeping the declaration — the
 *  call sites satisfy these structurally). */
interface FeedWorkout {
  id: string;
  type: string;
  durationMinutes: number;
  date: Date | string;
}

interface FeedMood {
  id: string;
  mood: string;
  date: Date | string;
}

interface FeedAssignment {
  id: string;
  title: string;
  status: string;
  updatedAt: Date | string;
}

interface ActivityFeedItem {
  kind: "workout" | "mood" | "assignment";
  id: string;
  title: string;
  detail: string | null;
  at: Date | string;
}

const asTime = (d: Date | string): number => new Date(d).getTime();

export function recentActivityFeed(
  workouts: readonly FeedWorkout[],
  moods: readonly FeedMood[],
  assignments: readonly FeedAssignment[],
): ActivityFeedItem[] {
  const items: ActivityFeedItem[] = [
    ...workouts.map((w) => ({
      kind: "workout" as const,
      id: w.id,
      title: `${w.type} workout`,
      detail: `${w.durationMinutes} minutes`,
      at: w.date,
    })),
    ...moods.map((m) => ({
      kind: "mood" as const,
      id: m.id,
      title: "Mood check-in",
      detail: m.mood,
      at: m.date,
    })),
    ...assignments
      .filter((a) => a.status === "completed")
      .map((a) => ({
        kind: "assignment" as const,
        id: a.id,
        title: a.title,
        detail: "Completed",
        at: a.updatedAt,
      })),
  ];
  return items.sort((a, b) => asTime(b.at) - asTime(a.at)).slice(0, 8);
}
