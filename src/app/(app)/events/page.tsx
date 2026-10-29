import { pageMetadata } from "@/lib/site";
import EventsClientPage from "./events-page";

export const metadata = pageMetadata({ page: "Events Calendar", route: "/Events" });

export default function EventsPage() {
  return <EventsClientPage />;
}
