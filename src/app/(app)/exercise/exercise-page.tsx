"use client";

import * as React from "react";
import { Dumbbell, Trash2 } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PAGE_THEMES, PAGE_KPI_GRIDS, STAT_CARD, DIALOG_GROUP, BUTTON_CLASSES } from "@/lib/page-layout";
import { WORKOUT_TYPES, WORKOUT_INTENSITIES, workoutTypeMeta, intensityMeta } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Workout } from "@/types";

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function ExerciseClientPage() {
  const { workouts, hydrated, fetchWorkouts, createWorkout, deleteWorkout } = useWellnessStore();
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // The dialog state — the reference's field set verbatim.
  const [type, setType] = React.useState(WORKOUT_TYPES[0].value);
  const [duration, setDuration] = React.useState("");
  const [intensity, setIntensity] = React.useState("moderate");
  const [calories, setCalories] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [date, setDate] = React.useState(todayIso());

  React.useEffect(() => {
    if (!hydrated) return;
    void fetchWorkouts();
  }, [hydrated, fetchWorkouts]);

  const reset = () => {
    setType(WORKOUT_TYPES[0].value);
    setDuration("");
    setIntensity("moderate");
    setCalories("");
    setNotes("");
    setDate(todayIso());
  };

  const submit = async () => {
    const minutes = Number(duration);
    if (!Number.isFinite(minutes) || minutes < 1) {
      toast.error("Enter a duration of at least 1 minute");
      return;
    }
    setSaving(true);
    const res = await createWorkout({
      type,
      durationMinutes: Math.round(minutes),
      intensity,
      caloriesBurned: calories ? Math.round(Number(calories)) : null,
      notes: notes || null,
      date,
    });
    setSaving(false);
    if (res.ok) {
      const badges = (res.data as Workout & { newBadges?: { name: string }[] }).newBadges ?? [];
      toast.success("Workout logged — great job! 🎉");
      badges.forEach((b) => toast.success(`Badge earned: ${b.name}! 🏅`));
      setOpen(false);
      reset();
    } else {
      toast.error(res.error);
    }
  };

  const totalMinutes = workouts.reduce((sum, w) => sum + w.durationMinutes, 0);
  const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned ?? 0), 0);

  if (!hydrated) {
    return (
      <div className={PAGE_THEMES.exercise.root}>
        <LoadingBlock label="Loading workouts…" />
      </div>
    );
  }

  return (
    <div className={PAGE_THEMES.exercise.root}>
      <div className={PAGE_THEMES.exercise.container}>
      <PageHeader
        title="Exercise Tracker"
        subtitle="Track your workouts and stay active"
        theme={PAGE_THEMES.exercise}
        actions={
          <GradientButton onClick={() => setOpen(true)} gradient={PAGE_THEMES.exercise.button}>
            <Dumbbell className="h-4 w-4" /> Log Workout
          </GradientButton>
        }
      />

      <div className={PAGE_KPI_GRIDS.three}>
        <div className={cn(STAT_CARD.hero, "from-orange-500 to-red-500 p-5")}>
          <p className={cn(STAT_CARD.heroLabel, "text-orange-100")}>Total Workouts</p>
          <h3 className={cn(STAT_CARD.heroValue, "mt-1")}>{workouts.length}</h3>
        </div>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <p className={STAT_CARD.label}>Total Minutes</p>
          <h3 className={cn(STAT_CARD.value, "mt-1")}>{totalMinutes}</h3>
        </div>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <p className={STAT_CARD.label}>Calories Burned</p>
          <h3 className={cn(STAT_CARD.value, "mt-1")}>{totalCalories}</h3>
        </div>
      </div>

      <SectionCard icon={Dumbbell} title="Recent Workouts">
        {workouts.length === 0 ? (
          <EmptyState
            icon={Dumbbell}
            hint="No workouts logged yet. Start tracking your fitness journey!"
          />
        ) : (
          <ul className="space-y-3">
            {workouts.map((w) => {
              const t = workoutTypeMeta(w.type);
              const i = intensityMeta(w.intensity);
              return (
                <li
                  key={w.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-line-soft/50 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {t.icon} {t.label}
                      <span className="ml-2 font-normal text-muted">{w.durationMinutes} min</span>
                    </p>
                    <p className="text-xs text-muted">
                      {formatDate(w.date)} · {i.label}
                      {w.caloriesBurned ? ` · ${w.caloriesBurned} cal` : ""}
                      {w.notes ? ` · ${w.notes}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <OptionChip label={i.label} tint={i.tint} text={i.text} />
                    <button
                      type="button"
                      className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-red-600 hover:bg-red-50")}
                      onClick={async () => {
                        const res = await deleteWorkout(w.id);
                        if (!res.ok) toast.error(res.error);
                      }}
                      aria-label={`Delete ${t.label} workout`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </SectionCard>

      {/* The Log Workout dialog — the reference's field set. */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Log New Workout</DialogTitle>
            <DialogDescription>Every session counts — even the small ones!</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="workout-type">Exercise Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="workout-type" className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WORKOUT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.icon} {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="workout-duration">Duration (minutes)</Label>
              <Input
                id="workout-duration"
                type="number"
                min={1}
                required
                className="mt-2"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="30"
              />
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="workout-intensity">Intensity</Label>
              <Select value={intensity} onValueChange={setIntensity}>
                <SelectTrigger id="workout-intensity" className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WORKOUT_INTENSITIES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="workout-calories">Calories Burned (optional)</Label>
              <Input
                id="workout-calories"
                type="number"
                min={0}
                className="mt-2"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="250"
              />
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="workout-date">Date</Label>
              <Input
                id="workout-date"
                type="date"
                className="mt-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="workout-notes">Notes (optional)</Label>
              <textarea
                id="workout-notes"
                className="mt-2 flex min-h-20 w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="How did you feel? Any achievements?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <button
              type="button"
              className={cn(BUTTON_CLASSES, "h-10 rounded-md border border-line px-8 hover:bg-line-soft")}
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <GradientButton onClick={() => void submit()} disabled={saving} gradient={PAGE_THEMES.exercise.button}>
              {saving ? "Saving…" : "Save Workout"}
            </GradientButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
