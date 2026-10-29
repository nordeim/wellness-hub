import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { assignmentCreateSchema } from "@/lib/schemas";


export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const rows = await db.assignment.findMany({
      where: { userId: guard.user.id },
      orderBy: [{ status: "asc" }, { dueDate: "asc" }, { createdAt: "desc" }],
    });
    return ok(rows);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const parsed = await parseBody(req, assignmentCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const row = await db.assignment.create({
      data: { ...body, userId: guard.user.id }
    });
    return ok(row);
    return ok(row);
  } catch {
    return ERR.INTERNAL();
  }
}
