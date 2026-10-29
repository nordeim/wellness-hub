import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { tutorialViewSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

/** Watch Now — the reference's view counter seam (its Tutorial entity carries
 *  views; opening the video bumps it). */
export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const parsed = await parseBody(req, tutorialViewSchema);
  if (!parsed.ok) return parsed.response;
  try {
    const tutorial = await db.tutorial.findUnique({ where: { id: parsed.data.id } });
    if (!tutorial) return ERR.NOT_FOUND();
    const row = await db.tutorial.update({
      where: { id: tutorial.id },
      data: { views: { increment: 1 } },
    });
    return ok(row);
  } catch {
    return ERR.INTERNAL();
  }
}
