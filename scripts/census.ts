// DB census: prints the resolved database path + per-model counts, and
// compares them against the seed contract.
//
// Why this exists (session-53, S53-P2 — the N-53b lesson; the path
// resolution it depends on is pinned by tests/db-path.test.ts):
//   • a raw `new PrismaClient()` run from the repo root opens the WRONG
//     file under both node (relative `file:` resolves against the CWD)
//     and bun (which absolutizes the .env value against the .env
//     location).
//   • the closure: censuses go through the app's own client — the SAME
//     singleton the running server uses (`src/lib/db`, re-anchored by
//     runtimeDatabaseUrl) — and PRINT the resolved URL, so every count
//     is bound to a named file. A count without its path is not
//     evidence.
// The expected counts are the prisma/seed.ts row counts; a mismatch is
// probe residue unless you deliberately added data (reseed with
// `bun run db:seed` to restore the contract).
//
// Run: bun run db:census   (or: bun scripts/census.ts)

import { db } from "../src/lib/db";
import { runtimeDatabaseUrl } from "../src/lib/db-path";

// The seed contract — prisma/seed.ts's row counts. Keep in sync with the
// seed: the demo user (1), 11 routine templates, their steps, 12
// tutorials, 8 badges; the per-user domain tables seed EMPTY (the
// reference's own fresh-account face).
const EXPECTED = {
  users: 1,
  routineTemplates: 11,
  routineSteps: 50,
  tutorials: 12,
  badges: 8,
  workouts: 0,
  moodEntries: 0,
  assignments: 0,
  events: 0,
  studyResources: 0,
  reminders: 0,
  goals: 0,
  userRoutines: 0,
  userBadges: 0,
} as const;

type Counts = keyof typeof EXPECTED;

async function main(): Promise<void> {
  const url = runtimeDatabaseUrl();
  const counts: Record<Counts, number> = {
    users: await db.user.count(),
    routineTemplates: await db.routineTemplate.count(),
    routineSteps: await db.routineStep.count(),
    tutorials: await db.tutorial.count(),
    badges: await db.badge.count(),
    workouts: await db.workout.count(),
    moodEntries: await db.moodEntry.count(),
    assignments: await db.assignment.count(),
    events: await db.event.count(),
    studyResources: await db.studyResource.count(),
    reminders: await db.reminder.count(),
    goals: await db.goal.count(),
    userRoutines: await db.userRoutine.count(),
    userBadges: await db.userBadge.count(),
  };

  console.log(`database: ${url}`);
  console.log(
    `counts: users=${counts.users} templates=${counts.routineTemplates} ` +
      `steps=${counts.routineSteps} tutorials=${counts.tutorials} badges=${counts.badges} ` +
      `workouts=${counts.workouts} moods=${counts.moodEntries} assignments=${counts.assignments} ` +
      `events=${counts.events} resources=${counts.studyResources} reminders=${counts.reminders} ` +
      `goals=${counts.goals} routines=${counts.userRoutines} earned=${counts.userBadges}`,
  );

  let mismatch = false;
  for (const key of Object.keys(EXPECTED) as Counts[]) {
    if (counts[key] !== EXPECTED[key]) {
      console.error(
        `  MISMATCH ${key}: expected ${EXPECTED[key]}, found ${counts[key]} ` +
          `(probe residue? reseed with \`bun run db:seed\`)`,
      );
      mismatch = true;
    }
  }
  if (mismatch) process.exit(1);
  console.log("census: MATCH (the seed contract holds)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
