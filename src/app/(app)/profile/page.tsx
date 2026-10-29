import { pageMetadata } from "@/lib/site";
import { getSessionUser } from "@/lib/auth";
import ProfileClientPage from "./profile-page";
import type { User as AppUser } from "@/types";

export const metadata = pageMetadata({ page: "Profile & Customization", route: "/Profile" });

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  // The Account tab's disabled fields ride the server-read session user
  // (name/email/role — exactly the reference's own read-only account card).
  const user = (await getSessionUser()) as AppUser | null;
  return <ProfileClientPage user={user} />;
}
