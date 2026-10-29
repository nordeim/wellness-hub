import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { workoutCreateSchema } from "@/lib/schemas";
import { awardBadges } from "@/lib/badges-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const rows = await db.workout.findMany({
      where: { userId: guard.user.id },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
    return ok(rows);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const parsed = await parseBody(req, workoutCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const row = await db.workout.create({
      data: { ...body, userId: guard.user.id }
    });
    // First workout / 10th workout badge check.
    const fresh = await awardBadges(guard.user.id);
    return ok({ ...row, newBadges: fresh });
    return ok(row);
  } catch {
    return ERR.INTERNAL();
  }
}
