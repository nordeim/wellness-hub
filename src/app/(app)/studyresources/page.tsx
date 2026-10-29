import { pageMetadata } from "@/lib/site";
import StudyResourcesClientPage from "./studyresources-page";

export const metadata = pageMetadata({ page: "Study Resources", route: "/StudyResources" });

export default function StudyResourcesPage() {
  return <StudyResourcesClientPage />;
}
