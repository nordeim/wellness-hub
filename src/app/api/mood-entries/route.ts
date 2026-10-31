import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { moodEntryCreateSchema } from "@/lib/schemas";
import { awardBadges } from "@/lib/badges-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const rows = await db.moodEntry.findMany({
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
  const parsed = await parseBody(req, moodEntryCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const row = await db.moodEntry.create({
      data: { ...body, userId: guard.user.id }
    });
    // Self-Aware + 7-Day Streak badge check.
    const fresh = await awardBadges(guard.user.id);
    return ok({ ...row, newBadges: fresh });
  } catch {
    return ERR.INTERNAL();
  }
}
