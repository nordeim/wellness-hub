"use client";

import * as React from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Play,
  Sun,
  Trash2,
} from "lucide-react";
import { useWellnessStore } from "@/stores/wellness-store";
import { toast } from "@/components/ui/toast";
import {
  PageHeader,
  SectionCard,
  EmptyState,
  LoadingBlock,
  GradientButton,
  OptionChip,
} from "@/components/shared/page-parts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PAGE_ROOT, DIALOG_GROUP, BUTTON_CLASSES } from "@/lib/page-layout";
import { difficultyMeta } from "@/lib/constants";
import { parseJsonArray } from "@/lib/wellness";
import { formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { RoutineTemplate, UserRoutine } from "@/types";

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function RoutinesClientPage() {
  const {
    routineTemplates,
    routines,
    hydrated,
    fetchRoutineTemplates,
    fetchRoutines,
    createRoutine,
    updateRoutine,
    deleteRoutine,
  } = useWellnessStore();

  const [scheduling, setScheduling] = React.useState<RoutineTemplate | null>(null);
  const [date, setDate] = React.useState(todayIso());
  const [time, setTime] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!hydrated) return;
    void fetchRoutineTemplates();
    void fetchRoutines();
  }, [hydrated, fetchRoutineTemplates, fetchRoutines]);

  const openSchedule = (t: RoutineTemplate) => {
    setScheduling(t);
    setDate(todayIso());
    setTime("");
    setNotes("");
  };

  const submitSchedule = async () => {
    if (!scheduling) return;
    setSaving(true);
    const res = await createRoutine({
      templateId: scheduling.id,
      title: scheduling.name,
      date,
      time: time || null,
      notes: notes || null,
    });
    setSaving(false);
    if (res.ok) {
      toast.success(`"${scheduling.name}" scheduled — you've got this! 🌟`);
      setScheduling(null);
    } else {
      toast.error(res.error);
    }
  };

  const completeRoutine = async (r: UserRoutine) => {
    const res = await updateRoutine(r.id, { completed: true });
    if (res.ok) toast.success("Routine completed — momentum! 💪");
    else toast.error(res.error);
  };

  const removeRoutine = async (r: UserRoutine) => {
    const res = await deleteRoutine(r.id);
    if (!res.ok) toast.error(res.error);
  };

  if (!hydrated) {
    return (
      <div className={PAGE_ROOT.standard}>
        <LoadingBlock label="Loading templates…" />
      </div>
    );
  }

  const upcoming = routines.filter((r) => !r.completed);

  return (
    <div className={PAGE_ROOT.standard}>
      <PageHeader
        title="Routine Templates"
        subtitle="Start small, build momentum. These templates make it easy to begin—perfect for beating procrastination! 💪"
      />

      {/* My routines (the scheduled list — the reference stores these; the
          page surfaces them so scheduling has a visible home). */}
      <SectionCard
        icon={CalendarCheck}
        title="My Routines"
        action={<span className="text-xs text-muted">{upcoming.length} scheduled</span>}
      >
        {upcoming.length === 0 ? (
          <EmptyState
            icon={CalendarCheck}
            hint="Schedule a template below to see it here!"
          />
        ) : (
          <ul className="space-y-3">
            {upcoming.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-line-soft/50 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{r.title}</p>
                  <p className="text-xs text-muted">
                    {formatDateShort(r.date)}
                    {r.time ? ` · ${r.time}` : ""}
                    {r.notes ? ` · ${r.notes}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className={cn(BUTTON_CLASSES, "h-8 rounded-md px-3 text-xs text-emerald-600 hover:bg-emerald-50")}
                    onClick={() => void completeRoutine(r)}
                    aria-label={`Complete ${r.title}`}
                  >
                    <CheckCircle2 className="h-4 w-4" /> Done
                  </button>
                  <button
                    type="button"
                    className={cn(BUTTON_CLASSES, "h-8 rounded-md px-3 text-xs text-red-600 hover:bg-red-50")}
                    onClick={() => void removeRoutine(r)}
                    aria-label={`Delete ${r.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <h2 className="text-xl font-semibold text-foreground mt-8 mb-1">Browse Templates</h2>
      <p className="text-sm text-muted mb-6">
        Choose a template that resonates with you. Remember: starting is the hardest part, but you've got this! 🌟
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routineTemplates.map((t) => {
          const diff = difficultyMeta(t.difficulty);
          const benefits = parseJsonArray(t.benefits);
          return (
            <section
              key={t.id}
              className="overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
            >
              {t.thumbnail && (
                <div className="relative">
                  { }
                  <img
                    src={t.thumbnail}
                    alt={t.name}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                  {t.videoUrl && (
                    <button
                      type="button"
                      className="absolute inset-0 flex items-center justify-center gap-2 bg-black/30 text-sm font-medium text-white transition-colors hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() => {
                        const url = t.videoUrl;
                        if (url) window.open(url, "_blank", "noopener,noreferrer");
                      }}
                    >
                      <Play className="h-5 w-5" /> Watch Video
                    </button>
                  )}
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{t.name}</h3>
                  <OptionChip label={diff.label} tint={diff.tint} text={diff.text} />
                </div>
                <p className="text-sm text-muted">{t.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {t.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Sun className="h-3.5 w-3.5" aria-hidden="true" /> {t.timeOfDay}
                  </span>
                </div>
                {t.tipsForProcrastinators && (
                  <div className="mt-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 p-3 text-sm">
                    <p className="font-medium text-amber-800 dark:text-amber-300">💡 Pro Tip:</p>
                    <p className="mt-1 text-amber-800/90 dark:text-amber-300/90">
                      {t.tipsForProcrastinators}
                    </p>
                  </div>
                )}
                <p className="mt-4 text-sm font-medium text-foreground">Benefits:</p>
                <ul className="mt-1 space-y-1">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between gap-2">
                  <GradientButton onClick={() => openSchedule(t)}>
                    Use This Template
                  </GradientButton>
                  {t.videoUrl && !t.thumbnail && (
                    <button
                      type="button"
                      className={cn(BUTTON_CLASSES, "h-10 rounded-md border border-line px-4 hover:bg-line-soft")}
                      onClick={() => {
                        const url = t.videoUrl;
                        if (url) window.open(url, "_blank", "noopener,noreferrer");
                      }}
                    >
                      <Play className="h-4 w-4" /> Watch Video
                    </button>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* The Schedule dialog — the reference's own: steps, date, time, notes. */}
      <Dialog open={scheduling !== null} onOpenChange={(o) => !o && setScheduling(null)}>
        <DialogContent className="max-w-lg">
          {scheduling && (
            <>
              <DialogHeader>
                <DialogTitle>Schedule: {scheduling.name}</DialogTitle>
                <DialogDescription>{scheduling.description}</DialogDescription>
              </DialogHeader>
              {scheduling.tipsForProcrastinators && (
                <p className="rounded-lg bg-amber-50 dark:bg-amber-950/40 p-3 text-sm text-amber-800 dark:text-amber-300">
                  💪 Remember: {scheduling.tipsForProcrastinators}
                </p>
              )}
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Routine Steps:</p>
                <ol className="space-y-3">
                  {scheduling.steps.map((s, i) => (
                    <li key={s.id} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {s.title} <span className="font-normal text-muted">({s.duration})</span>
                        </p>
                        {s.description && <p className="text-xs text-muted">{s.description}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className={cn(DIALOG_GROUP.group, "space-y-4")}>
                <div className={DIALOG_GROUP.group}>
                  <Label htmlFor="routine-date">When? (Date)</Label>
                  <Input
                    id="routine-date"
                    type="date"
                    className="mt-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className={DIALOG_GROUP.group}>
                  <Label htmlFor="routine-time">What time? (Optional)</Label>
                  <Input
                    id="routine-time"
                    type="time"
                    className="mt-2"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className={DIALOG_GROUP.group}>
                  <Label htmlFor="routine-notes">Personal Notes (Optional)</Label>
                  <textarea
                    id="routine-notes"
                    className="mt-2 flex min-h-20 w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Any modifications or reminders for yourself?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <button
                  type="button"
                  className={cn(BUTTON_CLASSES, "h-10 rounded-md border border-line px-8 hover:bg-line-soft")}
                  onClick={() => setScheduling(null)}
                >
                  Cancel
                </button>
                <GradientButton onClick={() => void submitSchedule()} disabled={saving || !date}>
                  {saving ? "Scheduling…" : "Schedule This Routine"}
                </GradientButton>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
