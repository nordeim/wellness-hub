import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { prefsSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

/** The per-user preferences singleton — the Profile & Customization tab's
 *  persistence seam. The client theme-store applies instantly from
 *  localStorage; this row is the cross-device sync (a superset — the
 *  reference keeps its theme client-side only). */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    let prefs = await db.userPrefs.findUnique({ where: { userId: guard.user.id } });
    if (!prefs) {
      prefs = await db.userPrefs.create({ data: { userId: guard.user.id } });
    }
    return ok(prefs);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function PUT(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const parsed = await parseBody(req, prefsSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  try {
    const prefs = await db.userPrefs.upsert({
      where: { userId: guard.user.id },
      update: body,
      create: { userId: guard.user.id, ...body },
    });
    return ok(prefs);
  } catch {
    return ERR.INTERNAL();
  }
}
