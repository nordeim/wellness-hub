import { pageMetadata } from "@/lib/site";
import MentalHealthClientPage from "./mentalhealth-page";

export const metadata = pageMetadata({ page: "Mental Health Journal", route: "/MentalHealth" });

export default function MentalHealthPage() {
  return <MentalHealthClientPage />;
}
