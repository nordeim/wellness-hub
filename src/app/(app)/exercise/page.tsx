import { pageMetadata } from "@/lib/site";
import ExerciseClientPage from "./exercise-page";

export const metadata = pageMetadata({ page: "Exercise Tracker", route: "/Exercise" });

export default function ExercisePage() {
  return <ExerciseClientPage />;
}
