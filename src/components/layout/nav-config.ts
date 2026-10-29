import {
  Bell,
  LayoutList,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Trophy,
  LayoutGrid,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Main nav — the reference's sidebar set + hrefs, byte-extracted from its
 *  live DOM (2026-10-29): Dashboard /Dashboard, Routine Templates /Routines,
 *  Exercise /Exercise, Mental Health /MentalHealth, Assignments /Assignments,
 *  Events /Events, Study Resources /StudyResources, Reminders /Reminders,
 *  Learning /Learning, Goals & Achievements /Goals. The lowercase routes
 *  stay canonical; the capitalized hrefs mirror the reference's own links
 *  (both casings render the same page — the dual-path pattern). */
export const NAV_ITEMS: NavItem[] = [
  { href: "/Dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/Routines", label: "Routine Templates", icon: LayoutList },
  { href: "/Exercise", label: "Exercise", icon: Dumbbell },
  { href: "/MentalHealth", label: "Mental Health", icon: HeartPulse },
  { href: "/Assignments", label: "Assignments", icon: ClipboardList },
  { href: "/Events", label: "Events", icon: CalendarDays },
  { href: "/StudyResources", label: "Study Resources", icon: BookOpen },
  { href: "/Reminders", label: "Reminders", icon: Bell },
  { href: "/Learning", label: "Learning", icon: GraduationCap },
  { href: "/Goals", label: "Goals & Achievements", icon: Trophy },
];

/** The sidebar's bottom-pinned footer link — the reference's "Profile &
 *  Settings / Customize your experience" card. */
export const NAV_FOOTER_ITEMS: NavItem[] = [
  { href: "/Profile", label: "Profile & Settings", icon: Settings },
];

/** The shared nav-active predicate: CASE-INSENSITIVE matching (the
 *  reference's sidebar links carry the capitalized hrefs while its
 *  router serves both casings), the Dashboard root special case (the
 *  post-login redirect lands on /), and the prefix rule for nested
 *  segments. */
export function isNavActive(pathname: string, href: string): boolean {
  const p = pathname.toLowerCase();
  const h = href.toLowerCase();
  if (h === "/dashboard") return p === "/" || p === "/dashboard";
  return p === h || p.startsWith(`${h}/`);
}
