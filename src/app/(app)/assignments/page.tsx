import { pageMetadata } from "@/lib/site";
import AssignmentsClientPage from "./assignments-page";

export const metadata = pageMetadata({ page: "Assignments", route: "/Assignments" });

export default function AssignmentsPage() {
  return <AssignmentsClientPage />;
}
