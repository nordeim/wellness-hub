"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity,
  Bell,
  BookOpen,
  Calendar,
  Plus,
  Dumbbell,
  HeartPulse,
  Target,
} from "lucide-react";
import { useWellnessStore } from "@/stores/wellness-store";
import { PageHeader, SectionCard, LoadingBlock } from "@/components/shared/page-parts";
import { PAGE_THEMES, PAGE_KPI_GRIDS, STAT_CARD, SECTION_CARD, QUICK_ACTIONS, EMPTY_STATE } from "@/lib/page-layout";
import { formatMonthDayYearTime, formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DashboardData } from "@/types";

/** The Quick Actions — the reference's four link-cards (each deep-links
 *  the module's page). The key addresses the QUICK_ACTIONS.pairs map —
 *  the per-module dead gradient arms the reference carries in its own
 *  cell strings (probed: they compute nothing — mirrored byte-for-byte). */
const QUICK_ACTION_LINKS = [
  { key: "exercise", href: "/Exercise", label: "Log Exercise", icon: Dumbbell },
  { key: "mentalhealth", href: "/MentalHealth", label: "Mood Check", icon: HeartPulse },
  { key: "assignments", href: "/Assignments", label: "Add Assignment", icon: BookOpen },
  { key: "events", href: "/Events", label: "New Event", icon: Calendar },
] as const;

/** The Recent Activity glyph per kind — the reference's own feed glyphs,
 *  decoded from its compiled bundle (WH-28 — the feed was unobservable
 *  through WH-27 at zero rows): exercise 🏃, mood 💚, completed
 *  assignments ✅. The 💪/📚/📅/🎯 inventions retired with the
 *  five-kind builder. */
const ACTIVITY_EMOJI: Record<string, string> = {
  workout: "🏃",
  mood: "💚",
  assignment: "✅",
};

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

      {/* The stat tiles — the reference's probed anatomy (WH-23): the card
          + the 5%-opacity gradient WASH + a `relative p-6` content wrapper
          above it + the `flex items-start justify-between mb-4` icon row +
          the bare p-3 rounded-2xl gradient tile carrying a default-stroke
          w-6 h-6 white icon + the mb-1 label/value rhythm. The per-tile
          gradient pairs (orange→red, emerald→teal, blue→cyan,
          yellow→amber-600) are the WH-15 identity, unchanged. */}
      <div className={PAGE_KPI_GRIDS.four}>
        <div className={STAT_CARD.card}>
          <div className={cn(STAT_CARD.wash, "from-orange-500 to-red-500")} aria-hidden="true" />
          <div className={STAT_CARD.content}>
            <div className={STAT_CARD.iconRow}>
              <div className={cn(STAT_CARD.iconTile, "from-orange-500 to-red-500")} aria-hidden="true">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className={STAT_CARD.label}>Workouts This Week</p>
              <h3 className={STAT_CARD.value}>{d.workoutsThisWeek}</h3>
              <p className={STAT_CARD.sub}>{d.workoutMinutesThisWeek} total minutes</p>
            </div>
          </div>
        </div>
        <div className={STAT_CARD.card}>
          <div className={cn(STAT_CARD.wash, "from-emerald-500 to-teal-500")} aria-hidden="true" />
          <div className={STAT_CARD.content}>
            <div className={STAT_CARD.iconRow}>
              <div className={cn(STAT_CARD.iconTile, "from-emerald-500 to-teal-500")} aria-hidden="true">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className={STAT_CARD.label}>Mood Entries</p>
              <h3 className={STAT_CARD.value}>{d.moodEntries}</h3>
              <p className={STAT_CARD.sub}>Total check-ins</p>
            </div>
          </div>
        </div>
        <div className={STAT_CARD.card}>
          <div className={cn(STAT_CARD.wash, "from-blue-500 to-cyan-500")} aria-hidden="true" />
          <div className={STAT_CARD.content}>
            <div className={STAT_CARD.iconRow}>
              <div className={cn(STAT_CARD.iconTile, "from-blue-500 to-cyan-500")} aria-hidden="true">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className={STAT_CARD.label}>Active Assignments</p>
              <h3 className={STAT_CARD.value}>{d.activeAssignments}</h3>
              <p className={STAT_CARD.sub}>Need attention</p>
            </div>
          </div>
        </div>
        <div className={STAT_CARD.card}>
          <div className={cn(STAT_CARD.wash, "from-yellow-500 to-amber-600")} aria-hidden="true" />
          <div className={STAT_CARD.content}>
            <div className={STAT_CARD.iconRow}>
              <div className={cn(STAT_CARD.iconTile, "from-yellow-500 to-amber-600")} aria-hidden="true">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className={STAT_CARD.label}>Goals Completed</p>
              <h3 className={STAT_CARD.value}>{d.goalsCompleted}</h3>
              <p className={STAT_CARD.sub}>of {d.goalsTotal} total</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: quick actions + recent activity. */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions — the reference's own construction (probed live
              WH-23): ONE white card in the CardHeader/CardContent anatomy,
              the "+" title row, a 2×2 gap-3 grid of fixed h-24 centered
              icon+label cells whose hover is the icon SCALE + the label
              lighten (never a background wash — the dead gradient arms in
              the cell strings compute nothing on the reference either). */}
          <section className={SECTION_CARD.card}>
            <div className={QUICK_ACTIONS.header}>
              <div className={QUICK_ACTIONS.title}>
                <Plus className="h-5 w-5" aria-hidden="true" />
                <h2>Quick Actions</h2>
              </div>
            </div>
            <div className={QUICK_ACTIONS.body}>
              <div className={QUICK_ACTIONS.grid}>
                {QUICK_ACTION_LINKS.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className={cn(QUICK_ACTIONS.cell, QUICK_ACTIONS.pairs[a.key])}
                  >
                    <a.icon className={QUICK_ACTIONS.icon} aria-hidden="true" />
                    <span className={QUICK_ACTIONS.label}>{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <SectionCard icon={Activity} title="Recent Activity">
            {d.recentActivity.length === 0 ? (
              <p className={EMPTY_STATE.dash}>No recent activity</p>
            ) : (
              <div className="space-y-3">
                {d.recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors dark:hover:bg-neutral-800/60"
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {ACTIVITY_EMOJI[item.kind] ?? "✨"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate dark:text-gray-100">{item.title}</p>
                      {item.detail && <p className="text-sm text-gray-500 dark:text-gray-400">{item.detail}</p>}
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{formatDateShort(item.at)}</span>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        {/* Right column: upcoming reminders + events. */}
        <div className="space-y-6">
          <SectionCard icon={Bell} title="Upcoming Reminders">
            {d.upcomingReminders.length === 0 ? (
              <p className={EMPTY_STATE.dash}>No upcoming reminders</p>
            ) : (
              <div className="space-y-3">
                {d.upcomingReminders.map((r) => (
                  <div key={r.id} className="text-sm">
                    <p className="font-medium text-foreground">{r.title}</p>
                    <p className="text-xs text-muted">{formatMonthDayYearTime(r.remindAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard icon={Calendar} title="Upcoming Events">
            {d.upcomingEvents.length === 0 ? (
              <p className={EMPTY_STATE.dash}>No upcoming events</p>
            ) : (
              <div className="space-y-3">
                {d.upcomingEvents.map((e) => (
                  <div key={e.id} className="text-sm">
                    <p className="font-medium text-foreground">{e.title}</p>
                    <p className="text-xs text-muted">
                      {formatDateShort(e.date)}
                      {e.time ? ` · ${e.time}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </div>
      </div>
    </div>
  );
}
