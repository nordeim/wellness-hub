import { pageMetadata } from "@/lib/site";
import RemindersClientPage from "./reminders-page";

export const metadata = pageMetadata({ page: "Reminders", route: "/Reminders" });

export default function RemindersPage() {
  return <RemindersClientPage />;
}
