import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

// The reference's root face: a logged-out visitor lands on the LOGIN WALL
// (its platform serves the auth screen at "/"); a signed-in session lands
// on the dashboard. A server redirect models both — no marketing layer
// (the reference ships none; the CRM-era landing retired with the
// session-142 parity event it mirrored).
//
// NO page-level metadata export: the ROOT layout's object is the landing
// head (title "Wellness Hub" absolute, the description, the bare-origin
// canonical, the OG/Twitter families, the PWA metas).
export const dynamic = "force-dynamic";

export default async function RootRoute() {
  const user = await getSessionUser();
  redirect(user ? "/Dashboard" : "/login");
}
