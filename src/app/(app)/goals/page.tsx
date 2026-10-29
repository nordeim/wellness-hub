import { pageMetadata } from "@/lib/site";
import GoalsClientPage from "./goals-page";

export const metadata = pageMetadata({ page: "Goals & Achievements", route: "/Goals" });

export default function GoalsPage() {
  return <GoalsClientPage />;
}
