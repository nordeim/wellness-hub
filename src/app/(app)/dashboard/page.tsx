import { pageMetadata } from "@/lib/site";
import DashboardClientPage from "./dashboard-page";

// The dashboard inherits the ROOT layout's canonical at "/" (the reference
// serves the same unprefixed metadata family at / and /Dashboard).
export const metadata = pageMetadata({ page: null, route: "/" });

export default function DashboardPage() {
  return <DashboardClientPage />;
}
