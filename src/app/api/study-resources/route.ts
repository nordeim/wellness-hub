import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { studyResourceCreateSchema } from "@/lib/schemas";


export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const rows = await db.studyResource.findMany({
      where: { userId: guard.user.id },
      orderBy: [{ createdAt: "desc" }],
    });
    return ok(rows);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const parsed = await parseBody(req, studyResourceCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const row = await db.studyResource.create({
      data: { ...body, userId: guard.user.id }
    });
    return ok(row);
    return ok(row);
  } catch {
    return ERR.INTERNAL();
  }
}
