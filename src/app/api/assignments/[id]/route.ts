import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { assignmentUpdateSchema } from "@/lib/schemas";
import { awardBadges } from "@/lib/badges-server";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  const parsed = await parseBody(req, assignmentUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const existing = await db.assignment.findFirst({ where: { id, userId: guard.user.id } });
    if (!existing) return ERR.NOT_FOUND();
    // The completion seam: pending → completed stamps completedAt and runs
    // the Assignment Ace badge check.
    const completing = body.status === "completed" && existing.status !== "completed";
    const row = await db.assignment.update({
      where: { id },
      data: {
        ...body,
        ...(body.status !== undefined
          ? { completedAt: body.status === "completed" ? new Date() : null }
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
    const existing = await db.assignment.findFirst({ where: { id, userId: guard.user.id } });
    if (!existing) return ERR.NOT_FOUND();
    await db.assignment.delete({ where: { id } });
    return ok({ ok: true });
  } catch {
    return ERR.INTERNAL();
  }
}
