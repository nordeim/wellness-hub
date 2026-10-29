import { pageMetadata } from "@/lib/site";
import RoutinesClientPage from "./routines-page";

export const metadata = pageMetadata({ page: "Routine Templates", route: "/Routines" });

export default function RoutinesPage() {
  return <RoutinesClientPage />;
}
