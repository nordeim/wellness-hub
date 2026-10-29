import { db } from "@/lib/db";
import { ok, ERR, isGuarded, requireSession } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Seeded Learning Center content (the reference's Tutorial entity). */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const tutorials = await db.tutorial.findMany({
      orderBy: [{ sortOrder: "asc" }],
    });
    return ok(tutorials);
  } catch {
    return ERR.INTERNAL();
  }
}
