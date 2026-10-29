import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { moodEntryUpdateSchema } from "@/lib/schemas";
import { awardBadges } from "@/lib/badges-server";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  const parsed = await parseBody(req, moodEntryUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const existing = await db.moodEntry.findFirst({ where: { id, userId: guard.user.id } });
    if (!existing) return ERR.NOT_FOUND();
    const row = await db.moodEntry.update({ where: { id }, data: body });
    const fresh = await awardBadges(guard.user.id);
    return ok({ ...row, newBadges: fresh });
  } catch {
    return ERR.INTERNAL();
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  try {
    const existing = await db.moodEntry.findFirst({ where: { id, userId: guard.user.id } });
    if (!existing) return ERR.NOT_FOUND();
    await db.moodEntry.delete({ where: { id } });
    return ok({ ok: true });
  } catch {
    return ERR.INTERNAL();
  }
}
