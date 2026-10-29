import { pageMetadata } from "@/lib/site";
import { getSessionUser } from "@/lib/auth";
import ProfileClientPage from "./profile-page";

export const metadata = pageMetadata({ page: "Profile & Customization", route: "/Profile" });

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  // The Account tab's disabled fields ride the server-read session user
  // (name/email/role — exactly the reference's own read-only account card).
  // WH-4 (F-1): SessionUser and the wire User are now the same shape
  // (id/email/name/role) — the avatar-chain fields retired with the dead
  // avatar surface.
  const user = await getSessionUser();
  return <ProfileClientPage user={user} />;
}
