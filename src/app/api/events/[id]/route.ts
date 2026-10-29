import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { eventUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  const parsed = await parseBody(req, eventUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const existing = await db.event.findFirst({ where: { id, userId: guard.user.id } });
    if (!existing) return ERR.NOT_FOUND();
    const row = await db.event.update({ where: { id }, data: body });
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
    const existing = await db.event.findFirst({ where: { id, userId: guard.user.id } });
    if (!existing) return ERR.NOT_FOUND();
    await db.event.delete({ where: { id } });
    return ok({ ok: true });
  } catch {
    return ERR.INTERNAL();
  }
}
