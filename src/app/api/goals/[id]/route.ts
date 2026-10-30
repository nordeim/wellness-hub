import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { goalUpdateSchema } from "@/lib/schemas";
import { awardBadges } from "@/lib/badges-server";
import { goalPointsForFrequency } from "@/lib/wellness";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  const parsed = await parseBody(req, goalUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const existing = await db.goal.findFirst({ where: { id, userId: guard.user.id } });
    if (!existing) return ERR.NOT_FOUND();
    // The completion seam: active → completed runs the Goal Getter / High
    // Achiever / Wellness Warrior badge checks (WH-13: the completedAt
    // stamping retired with the column — written at every seam, read by
    // nobody; the status flip drives it).
    const completing = body.status === "completed" && existing.status !== "completed";
    const row = await db.goal.update({
      where: { id },
      data: {
        ...body,
        ...(body.frequency !== undefined && body.frequency !== existing.frequency
          ? { points: goalPointsForFrequency(body.frequency) }
          : {}),
      },
    });
    if (completing) {
      const fresh = await awardBadges(guard.user.id);
      return ok({ ...row, newBadges: fresh });
    }
    return ok(row);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  try {
    const existing = await db.goal.findFirst({ where: { id, userId: guard.user.id } });
    if (!existing) return ERR.NOT_FOUND();
    await db.goal.delete({ where: { id } });
    return ok({ ok: true });
  } catch {
    return ERR.INTERNAL();
  }
}
