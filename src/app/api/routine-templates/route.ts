import { db } from "@/lib/db";
import { ok, ERR, isGuarded, requireSession } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Seeded content — readable by any signed-in user (the reference serves
 *  the same catalog to every account; rows carry no userId). */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const templates = await db.routineTemplate.findMany({
      orderBy: [{ sortOrder: "asc" }],
      include: { steps: { orderBy: { sortOrder: "asc" } } },
    });
    return ok(templates);
  } catch {
    return ERR.INTERNAL();
  }
}
