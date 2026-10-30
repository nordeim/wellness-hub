"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  BookOpen,
  CalendarPlus,
  Plus,
  Dumbbell,
  HeartPulse,
  Target,
} from "lucide-react";
import { useWellnessStore } from "@/stores/wellness-store";
import { PageHeader, SectionCard, LoadingBlock } from "@/components/shared/page-parts";
import { PAGE_THEMES, PAGE_KPI_GRIDS, STAT_CARD, SECTION_CARD } from "@/lib/page-layout";
import { formatMonthDayYearTime, formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DashboardData } from "@/types";

/** The Quick Actions — the reference's four link-cards (each deep-links to
 *  the module's page). */
const QUICK_ACTIONS = [
  { href: "/Exercise", label: "Log Exercise", icon: Dumbbell },
  { href: "/MentalHealth", label: "Mood Check", icon: HeartPulse },
  { href: "/Assignments", label: "Add Assignment", icon: BookOpen },
  { href: "/Events", label: "New Event", icon: CalendarPlus },
] as const;

export default function DashboardClientPage() {
  const { dashboard, hydrated } = useWellnessStore();

  // The aggregate loads through hydrate(); this effect covers the
  // direct-landing + refetch-after-mutation cases.
  const fetchDashboard = useWellnessStore((s) => s.fetchDashboard);
  React.useEffect(() => {
    if (hydrated) void fetchDashboard();
  }, [hydrated, fetchDashboard]);

  if (!hydrated || !dashboard) {
    return (
      <div className={PAGE_THEMES.dashboard.root}>
        <LoadingBlock label="Loading your wellness overview…" />
      </div>
    );
  }

  const d: DashboardData = dashboard;

  return (
    <div className={PAGE_THEMES.dashboard.root}>
      <div className={PAGE_THEMES.dashboard.container}>
      <PageHeader
        title="Welcome Back!"
        subtitle="Here's your wellness overview for today"
        theme={PAGE_THEMES.dashboard}
      />

      {/* The stat tiles — the redesign's white cards with the 5%-opacity
          module washes + the rounded-2xl gradient icon tiles (probed:
          orange→red, emerald→teal, blue→cyan, yellow→amber-600). */}
      <div className={PAGE_KPI_GRIDS.four}>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <div className={cn(STAT_CARD.wash, "from-orange-500 to-red-500")} aria-hidden="true" />
          <div className={cn(STAT_CARD.iconTile, "from-orange-500 to-red-500")} aria-hidden="true">
            <Dumbbell className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className={STAT_CARD.label}>Workouts This Week</p>
          <h3 className={STAT_CARD.value}>{d.workoutsThisWeek}</h3>
          <p className={STAT_CARD.sub}>{d.workoutMinutesThisWeek} total minutes</p>
        </div>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <div className={cn(STAT_CARD.wash, "from-emerald-500 to-teal-500")} aria-hidden="true" />
          <div className={cn(STAT_CARD.iconTile, "from-emerald-500 to-teal-500")} aria-hidden="true">
            <HeartPulse className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className={STAT_CARD.label}>Mood Entries</p>
          <h3 className={STAT_CARD.value}>{d.moodEntries}</h3>
          <p className={STAT_CARD.sub}>Total check-ins</p>
        </div>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <div className={cn(STAT_CARD.wash, "from-blue-500 to-cyan-500")} aria-hidden="true" />
          <div className={cn(STAT_CARD.iconTile, "from-blue-500 to-cyan-500")} aria-hidden="true">
            <BookOpen className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className={STAT_CARD.label}>Active Assignments</p>
          <h3 className={STAT_CARD.value}>{d.activeAssignments}</h3>
          <p className={STAT_CARD.sub}>Need attention</p>
        </div>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <div className={cn(STAT_CARD.wash, "from-yellow-500 to-amber-600")} aria-hidden="true" />
          <div className={cn(STAT_CARD.iconTile, "from-yellow-500 to-amber-600")} aria-hidden="true">
            <Target className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className={STAT_CARD.label}>Goals Completed</p>
          <h3 className={STAT_CARD.value}>{d.goalsCompleted}</h3>
          <p className={STAT_CARD.sub}>of {d.goalsTotal} total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: quick actions + recent activity. */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions — the reference's own construction: ONE white
              card, the "+" header, a 2x2 grid of centered icon+label
              cells with thin dividers. */}
          <section className={SECTION_CARD.card}>
            <div className="flex items-center gap-2 px-5 py-4 border-b border-line">
              <Plus className="h-5 w-5 text-foreground" aria-hidden="true" />
              <h2 className="font-semibold text-foreground">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2">
              {QUICK_ACTIONS.map((a, i) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className={cn(
                    "group flex flex-col items-center justify-center gap-2 px-4 py-6 text-center transition-colors hover:bg-line-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    // The thin dividers: right arm on the left column,
                    // top arm on the second row.
                    i % 2 === 0 && "border-r border-line",
                    i >= 2 && "border-t border-line",
                  )}
                >
                  <a.icon className="h-6 w-6 text-muted group-hover:text-primary" strokeWidth={1.75} aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{a.label}</span>
                </Link>
              ))}
            </div>
          </section>

          <SectionCard icon={Activity} title="Recent Activity">
            {d.recentActivity.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">No recent activity</p>
            ) : (
              <ul className="space-y-3">
                {d.recentActivity.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                      aria-hidden="true"
                    >
                      <Activity className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted">
                        {formatMonthDayYearTime(item.at)}
                        {item.detail ? ` · ${item.detail}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </div>

        {/* Right column: upcoming reminders + events. */}
        <div className="space-y-6">
          <SectionCard icon={BarChart3} title="Upcoming Reminders">
            {d.upcomingReminders.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">No upcoming reminders</p>
            ) : (
              <ul className="space-y-3">
                {d.upcomingReminders.map((r) => (
                  <li key={r.id} className="text-sm">
                    <p className="font-medium text-foreground">{r.title}</p>
                    <p className="text-xs text-muted">{formatMonthDayYearTime(r.remindAt)}</p>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard icon={CalendarPlus} title="Upcoming Events">
            {d.upcomingEvents.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">No upcoming events</p>
            ) : (
              <ul className="space-y-3">
                {d.upcomingEvents.map((e) => (
                  <li key={e.id} className="text-sm">
                    <p className="font-medium text-foreground">{e.title}</p>
                    <p className="text-xs text-muted">
                      {formatDateShort(e.date)}
                      {e.time ? ` · ${e.time}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </div>
      </div>
      </div>
    </div>
  );
}
