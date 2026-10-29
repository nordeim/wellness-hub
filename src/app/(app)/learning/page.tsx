import { pageMetadata } from "@/lib/site";
import LearningClientPage from "./learning-page";

export const metadata = pageMetadata({ page: "Learning Center", route: "/Learning" });

export default function LearningPage() {
  return <LearningClientPage />;
}
