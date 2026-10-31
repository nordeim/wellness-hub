import { describe, expect, it } from "vitest";
import { recentActivityFeed } from "@/lib/activity-feed";

// WH-28 (F-2): the Recent Activity feed builder — the reference's own
// construction, decoded from its compiled bundle (zero rows on the
// reference made it unobservable through WH-27; the demo account's
// data + the bundle decode opened it):
//   exercise → `${type} workout` + `${duration} minutes` (🏃, the entity DATE)
//   mood     → "Mood check-in" + the raw mood value (💚, the entity DATE)
//   assignments → COMPLETED only: `${title}` + "Completed" (✅, updated_date)
//   merged → sorted by date DESC → capped at 8; the row date renders
//   date-fns "MMM d" OF THE ENTITY DATE — never createdAt (the drift
//   this round cured: ours keyed rows off createdAt and rendered
//   "Oct 31" where the reference renders "Oct 29").
// The seam speaks OUR wire names (kind/title/detail/at) — the
// reference's type/title/subtitle/date are its internals; parity is
// the rendered face.

// The row literals satisfy the seam's (module-private) param shapes
// structurally — no type imports needed (the WH-11 doctrine keeps the
// interfaces un-exported).
const workout = (over: Record<string, unknown>) => ({
  id: "w1",
  type: "cardio",
  durationMinutes: 30,
  date: new Date("2026-10-29T10:00:00"),
  ...over,
});

const mood = (over: Record<string, unknown>) => ({
  id: "m1",
  mood: "good",
  date: new Date("2026-10-29T09:00:00"),
  ...over,
});

const assignment = (over: Record<string, unknown>) => ({
  id: "a1",
  title: "Chapter 5 Notes",
  status: "completed",
  updatedAt: new Date("2026-10-28T18:00:00"),
  ...over,
});

describe("recentActivityFeed — the reference's three kinds", () => {
  it("builds the exercise/mood/completed-assignment rows at the reference's titles, subtitles and glyphs' feed shapes", () => {
    const feed = recentActivityFeed(
      [workout({})],
      [mood({})],
      [assignment({})],
    );
    expect(feed).toHaveLength(3);
    const byKind = Object.fromEntries(feed.map((i) => [i.kind, i]));
    expect(byKind.workout).toMatchObject({
      title: "cardio workout",
      detail: "30 minutes",
      at: new Date("2026-10-29T10:00:00"),
    });
    expect(byKind.mood).toMatchObject({
      title: "Mood check-in",
      detail: "good",
      at: new Date("2026-10-29T09:00:00"),
    });
    expect(byKind.assignment).toMatchObject({
      title: "Chapter 5 Notes",
      detail: "Completed",
      at: new Date("2026-10-28T18:00:00"),
    });
  });

  it("drops pending assignments, keys every row off the ENTITY date, sorts DESC and caps at 8 — never createdAt, never five kinds", () => {
    const pending = assignment({ id: "a-pending", title: "Essay draft", status: "pending", updatedAt: new Date("2026-10-30T08:00:00") });
    // The pending row is NEWER than everything else — it must never
    // appear, and its newer updatedAt must not leak into the sort.
    const wOld = workout({ id: "w-old", date: new Date("2026-10-01T10:00:00") });
    const wNew = workout({ id: "w-new", date: new Date("2026-10-30T10:00:00") });
    const mOld = mood({ id: "m-old", date: new Date("2026-10-02T09:00:00") });
    const aDone = assignment({ id: "a-done", title: "Lab report", updatedAt: new Date("2026-10-28T18:00:00") });
    const feed = recentActivityFeed([wOld, wNew], [mOld], [aDone, pending]);
    expect(feed.map((i) => i.id)).toEqual(["w-new", "a-done", "m-old", "w-old"]);
    // The cap: 12 feedable rows → the 8 newest by ENTITY date.
    const many = recentActivityFeed(
      Array.from({ length: 10 }, (_, n) => workout({ id: `w-${n}`, date: new Date(2026, 9, 20 - n) })),
      [mood({ id: "m-a", date: new Date(2026, 9, 19) }), mood({ id: "m-b", date: new Date(2026, 9, 18) })],
      [],
    );
    expect(many).toHaveLength(8);
    expect(many[0].id).toBe("w-0"); // newest first
    // The two moods interleave into the top 8 (Oct 19/18 collide with
    // w-1/w-2) — the cap drops the FOUR OLDEST workouts (w-6..w-9),
    // never a kind: the newest 8 by ENTITY date survive, order intact.
    expect(many[7].id).toBe("w-5");
    expect(many.every((i) => ["workout", "mood", "assignment"].includes(i.kind))).toBe(true);
  });
});
