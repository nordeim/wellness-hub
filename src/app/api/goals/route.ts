import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { goalCreateSchema } from "@/lib/schemas";
import { goalPointsForFrequency } from "@/lib/wellness";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const rows = await db.goal.findMany({
      where: { userId: guard.user.id },
      orderBy: [{ status: "asc" }, { deadline: "asc" }, { createdAt: "desc" }],
    });
    return ok(rows);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const parsed = await parseBody(req, goalCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const row = await db.goal.create({
      data: {
        ...body,
        points: goalPointsForFrequency(body.frequency),
        userId: guard.user.id,
      },
    });
    return ok(row);
  } catch {
    return ERR.INTERNAL();
  }
}
