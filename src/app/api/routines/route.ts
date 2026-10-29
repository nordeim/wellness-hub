import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { userRoutineCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const rows = await db.userRoutine.findMany({
      where: { userId: guard.user.id },
      orderBy: [{ completed: "asc" }, { date: "asc" }, { createdAt: "desc" }],
    });
    return ok(rows);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const parsed = await parseBody(req, userRoutineCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    // The Use This Template seam: a templateId must reference a real
    // template (the title defaults from it client-side; the server
    // re-validates the FK — a stale client list cannot plant one).
    if (body.templateId) {
      const template = await db.routineTemplate.findUnique({ where: { id: body.templateId } });
      if (!template) return ERR.BAD_REQUEST("Choose a valid template");
    }
    const row = await db.userRoutine.create({
      data: { ...body, userId: guard.user.id },
    });
    return ok(row);
  } catch {
    return ERR.INTERNAL();
  }
}
