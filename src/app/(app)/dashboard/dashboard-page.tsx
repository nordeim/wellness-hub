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
import { PAGE_ROOT, PAGE_KPI_GRIDS, STAT_CARD } from "@/lib/page-layout";
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
      <div className={PAGE_ROOT.standard}>
        <LoadingBlock label="Loading your wellness overview…" />
      </div>
    );
  }

  const d: DashboardData = dashboard;

  return (
    <div className={PAGE_ROOT.standard}>
      <PageHeader
        title="Welcome Back!"
        subtitle="Here's your wellness overview for today"
      />

      {/* The stat tiles — the reference's four pastel cards. */}
      <div className={PAGE_KPI_GRIDS.four}>
        <div className={cn(STAT_CARD.card, "bg-red-50 dark:bg-red-950/40")}>
          <div className={cn(STAT_CARD.iconChip, "bg-red-500 text-white")} aria-hidden="true">
            <Dumbbell className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className={STAT_CARD.label}>Workouts This Week</p>
          <h3 className={STAT_CARD.value}>{d.workoutsThisWeek}</h3>
          <p className={STAT_CARD.sub}>{d.workoutMinutesThisWeek} total minutes</p>
        </div>
        <div className={cn(STAT_CARD.card, "bg-emerald-50 dark:bg-emerald-950/40")}>
          <div className={cn(STAT_CARD.iconChip, "bg-emerald-500 text-white")} aria-hidden="true">
            <HeartPulse className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className={STAT_CARD.label}>Mood Entries</p>
          <h3 className={STAT_CARD.value}>{d.moodEntries}</h3>
          <p className={STAT_CARD.sub}>Total check-ins</p>
        </div>
        <div className={cn(STAT_CARD.card, "bg-blue-50 dark:bg-blue-950/40")}>
          <div className={cn(STAT_CARD.iconChip, "bg-blue-500 text-white")} aria-hidden="true">
            <BookOpen className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className={STAT_CARD.label}>Active Assignments</p>
          <h3 className={STAT_CARD.value}>{d.activeAssignments}</h3>
          <p className={STAT_CARD.sub}>Need attention</p>
        </div>
        <div className={cn(STAT_CARD.card, "bg-amber-50 dark:bg-amber-950/40")}>
          <div className={cn(STAT_CARD.iconChip, "bg-amber-500 text-white")} aria-hidden="true">
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
          <section className="rounded-xl bg-surface shadow-lg">
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
  );
}
