"use client";

import * as React from "react";
import { Flame, HeartPulse, Trash2 } from "lucide-react";
import { useWellnessStore } from "@/stores/wellness-store";
import { toast } from "@/components/ui/toast";
import {
  PageHeader,
  SectionCard,
  EmptyState,
  LoadingBlock,
  GradientButton,
} from "@/components/shared/page-parts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PAGE_ROOT, PAGE_KPI_GRIDS, DIALOG_GROUP, BUTTON_CLASSES } from "@/lib/page-layout";
import { MOODS, moodMeta } from "@/lib/constants";
import { averageEnergy, currentStreak, normalizeTags, parseJsonArray } from "@/lib/wellness";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { MoodEntry } from "@/types";

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function MentalHealthClientPage() {
  const { moodEntries, hydrated, fetchMoodEntries, createMoodEntry, deleteMoodEntry } =
    useWellnessStore();
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // The dialog state — the reference's field set verbatim.
  const [mood, setMood] = React.useState("good");
  const [energy, setEnergy] = React.useState(5);
  const [activityInput, setActivityInput] = React.useState("");
  const [activities, setActivities] = React.useState<string[]>([]);
  const [gratitude, setGratitude] = React.useState("");
  const [reflection, setReflection] = React.useState("");
  const [date, setDate] = React.useState(todayIso());

  React.useEffect(() => {
    if (!hydrated) return;
    void fetchMoodEntries();
  }, [hydrated, fetchMoodEntries]);

  const reset = () => {
    setMood("good");
    setEnergy(5);
    setActivityInput("");
    setActivities([]);
    setGratitude("");
    setReflection("");
    setDate(todayIso());
  };

  const addActivity = () => {
    const next = normalizeTags([...activities, activityInput]);
    setActivities(next);
    setActivityInput("");
  };

  const submit = async () => {
    setSaving(true);
    const res = await createMoodEntry({
      mood,
      energy,
      activities,
      gratitude: gratitude || null,
      reflection: reflection || null,
      date,
    });
    setSaving(false);
    if (res.ok) {
      const badges = (res.data as MoodEntry & { newBadges?: { name: string }[] }).newBadges ?? [];
      toast.success("Mood check-in saved. Thank you for showing up for yourself 💜");
      badges.forEach((b) => toast.success(`Badge earned: ${b.name}! 🏅`));
      setOpen(false);
      reset();
    } else {
      toast.error(res.error);
    }
  };

  const avgEnergy = averageEnergy(moodEntries.map((m) => m.energy));
  const streak = currentStreak(moodEntries.map((m) => m.date));

  if (!hydrated) {
    return (
      <div className={PAGE_ROOT.standard}>
        <LoadingBlock label="Loading your journal…" />
      </div>
    );
  }

  return (
    <div className={PAGE_ROOT.standard}>
      <PageHeader
        title="Mental Health Journal"
        subtitle="Track your mood and emotional wellness"
        actions={
          <GradientButton onClick={() => setOpen(true)}>
            <HeartPulse className="h-4 w-4" /> New Entry
          </GradientButton>
        }
      />

      <div className={PAGE_KPI_GRIDS.three}>
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white" aria-hidden="true">
            <HeartPulse className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className="text-sm font-medium text-muted">Total Entries</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{moodEntries.length}</h3>
        </div>
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/40 p-5 shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white" aria-hidden="true">
            <Flame className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className="text-sm font-medium text-muted">Avg Energy</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{avgEnergy}/10</h3>
        </div>
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 p-5 shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white" aria-hidden="true">
            <Flame className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className="text-sm font-medium text-muted">Current Streak</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{streak}</h3>
          <p className="text-xs text-subtle">days</p>
        </div>
      </div>

      <SectionCard icon={HeartPulse} title="Your Journey">
        {moodEntries.length === 0 ? (
          <EmptyState
            icon={HeartPulse}
            hint="Start your mental health journey by logging your first mood entry!"
          />
        ) : (
          <ul className="space-y-3">
            {moodEntries.map((m) => {
              const meta = moodMeta(m.mood);
              const acts = parseJsonArray(m.activities);
              return (
                <li
                  key={m.id}
                  className="flex flex-wrap items-start justify-between gap-2 rounded-lg border border-line bg-line-soft/50 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {meta.icon} {meta.label}
                      <span className="ml-2 font-normal text-muted">Energy {m.energy}/10</span>
                    </p>
                    <p className="text-xs text-muted">{formatDate(m.date)}</p>
                    {acts.length > 0 && (
                      <p className="mt-1 text-xs text-muted">Activities: {acts.join(", ")}</p>
                    )}
                    {m.gratitude && (
                      <p className="mt-1 text-xs text-muted">Grateful for: {m.gratitude}</p>
                    )}
                    {m.reflection && <p className="mt-1 text-xs text-muted">{m.reflection}</p>}
                  </div>
                  <button
                    type="button"
                    className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-red-600 hover:bg-red-50")}
                    onClick={async () => {
                      const res = await deleteMoodEntry(m.id);
                      if (!res.ok) toast.error(res.error);
                    }}
                    aria-label={`Delete ${meta.label} entry`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </SectionCard>

      {/* The New Entry dialog — "How are you feeling today?" */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>How are you feeling today?</DialogTitle>
            <DialogDescription>
              There are no wrong answers. This is your space. 💜
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className={DIALOG_GROUP.group}>
              <Label>Choose your mood</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMood(m.value)}
                    aria-pressed={mood === m.value}
                    className={cn(
                      BUTTON_CLASSES,
                      "h-10 rounded-full border px-4 text-sm",
                      mood === m.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-line bg-surface hover:bg-line-soft",
                    )}
                  >
                    <span aria-hidden="true">{m.icon}</span> {m.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="mood-energy">Energy Level: {energy}/10</Label>
              <input
                id="mood-energy"
                type="range"
                min={0}
                max={10}
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--color-primary)]"
              />
              <div className="flex justify-between text-xs text-subtle">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="mood-activities">Activities that affected your mood</Label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="mood-activities"
                  placeholder="e.g., Exercise, Work, Friends"
                  value={activityInput}
                  onChange={(e) => setActivityInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addActivity();
                    }
                  }}
                />
                <button
                  type="button"
                  className={cn(BUTTON_CLASSES, "h-9 rounded-md border border-line px-4 hover:bg-line-soft")}
                  onClick={addActivity}
                >
                  Add
                </button>
              </div>
              {activities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {activities.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {a}
                      <button
                        type="button"
                        aria-label={`Remove ${a}`}
                        className="text-primary/70 hover:text-primary"
                        onClick={() => setActivities(activities.filter((x) => x !== a))}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="mood-gratitude">What are you grateful for today?</Label>
              <textarea
                id="mood-gratitude"
                className="mt-2 flex min-h-16 w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Write something you're thankful for..."
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
              />
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="mood-reflection">Daily Reflection</Label>
              <textarea
                id="mood-reflection"
                className="mt-2 flex min-h-20 w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="How was your day? Any thoughts or feelings to note?"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="mood-date">Date</Label>
              <Input
                id="mood-date"
                type="date"
                className="mt-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
            <GradientButton onClick={() => void submit()} disabled={saving}>
              {saving ? "Saving…" : "Save Entry"}
            </GradientButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
