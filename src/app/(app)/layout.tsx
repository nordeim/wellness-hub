import { getSessionUser } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";
import { GuestLoginRedirect } from "@/components/layout/guest-login-redirect";

export const dynamic = "force-dynamic";

// Session-147 (F-147c2): the (app) guard keeps its SERVER-side session
// decision (the guest never receives the CRM page's HTML — the fix-over-
// defect property survives; the reference serves its data pages to
// guests as its platform face, a behavior we never mirrored) but the
// server 307 became the reference's own client-side mechanism: the
// GuestLoginRedirect shim lands guests on
// /login?from_url=<absolute-url> — mirroring the reference's guard
// (walk37: guest /Dashboard → the wall with from_url, post-login →
// /Dashboard). The 307 retired because a server layout cannot know the
// current path (headers() carries none — probed live this session), and
// the from_url round-trip needs it.
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) return <GuestLoginRedirect />;
  // WH-4 (F-1): the shell takes no user prop (it renders no user chip —
  // the reference's sidebar carries the whole nav); the session read stays
  // as the guard's own decision.
  return <AppShell>{children}</AppShell>;
}
