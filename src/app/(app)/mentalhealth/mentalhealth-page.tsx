"use client";

import * as React from "react";
import { Heart, HeartPulse, Smile, Trash2, TrendingUp } from "lucide-react";
import { useWellnessStore } from "@/stores/wellness-store";
import { toast } from "@/components/ui/toast";
import {
  PageHeader,
  SectionCard,
  EmptyState,
  LoadingBlock,
  GradientButton,
} from "@/components/shared/page-parts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PAGE_THEMES, PAGE_KPI_GRIDS, STAT_CARD, MODULE_KPI, DIALOG_GROUP, BUTTON_CLASSES, FORM_CARD } from "@/lib/page-layout";
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
      <div className={PAGE_THEMES.mentalhealth.root}>
        <LoadingBlock label="Loading your journal…" />
      </div>
    );
  }

  return (
    <div className={PAGE_THEMES.mentalhealth.root}>
      <div className={PAGE_THEMES.mentalhealth.container}>
      <PageHeader
        title="Mental Health Journal"
        subtitle="Track your mood and emotional wellness"
        theme={PAGE_THEMES.mentalhealth}
        actions={
          <GradientButton onClick={() => setOpen(true)} gradient={PAGE_THEMES.mentalhealth.button}>
            <HeartPulse className="h-4 w-4" /> New Entry
          </GradientButton>
        }
      />

      {/* The New Entry form — the reference's INLINE EXPANDING CARD (WH-21,
          the modality cure: probed live — its create-forms open in the page
          flow, no overlay, no scroll lock; only its Routines Schedule flow
          is a modal) carrying the mood TILE selector (F-3: the reference's
          own anatomy — block-stacked 173×104 tiles, the FIXED blue→cyan
          active pair, never the preset-themeable primary). */}
      {open && (
        <section className={FORM_CARD.card}>
          <div className={FORM_CARD.header}>
            <h2 className={FORM_CARD.title}>How are you feeling today?</h2>
          </div>
          <div className={FORM_CARD.body}>
            <div className="space-y-4">
              <div className={DIALOG_GROUP.group}>
                <Label>Choose your mood</Label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-3">
                  {MOODS.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setMood(m.value)}
                      aria-pressed={mood === m.value}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all text-center",
                        mood === m.value
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-transparent shadow-lg scale-105"
                          : "border-gray-200 hover:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600",
                      )}
                    >
                      <span aria-hidden="true" className="block text-4xl mb-2">
                        {m.icon}
                      </span>
                      <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        {m.label}
                      </span>
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
              <div className={FORM_CARD.footer}>
                <button
                  type="button"
                  className={cn(BUTTON_CLASSES, "h-10 rounded-md border border-line px-8 hover:bg-line-soft")}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <GradientButton onClick={() => void submit()} disabled={saving} gradient={PAGE_THEMES.mentalhealth.button}>
                  {saving ? "Saving…" : "Save Entry"}
                </GradientButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The KPI row — the reference's probed anatomy (WH-23): the
          emerald→teal hero + two plain tiles with the big module-tinted
          right icons (heart / trending-up / smile). */}
      <div className={PAGE_KPI_GRIDS.three}>
        <div className={cn(MODULE_KPI.hero, "from-emerald-500 to-teal-500")}>
          <div className={MODULE_KPI.wrap}>
            <div className={MODULE_KPI.row}>
              <div>
                <p className={cn(MODULE_KPI.heroLabel, "text-emerald-100")}>Total Entries</p>
                <h3 className={MODULE_KPI.heroValue}>{moodEntries.length}</h3>
              </div>
              <Heart className={cn(MODULE_KPI.bigIcon, "text-emerald-100")} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className={STAT_CARD.card}>
          <div className={MODULE_KPI.wrap}>
            <div className={MODULE_KPI.row}>
              <div>
                <p className={MODULE_KPI.label}>Avg Energy</p>
                <h3 className={MODULE_KPI.value}>{avgEnergy}/10</h3>
              </div>
              <TrendingUp className={cn(MODULE_KPI.bigIcon, "text-emerald-500")} aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className={STAT_CARD.card}>
          <div className={MODULE_KPI.wrap}>
            <div className={MODULE_KPI.row}>
              <div>
                <p className={MODULE_KPI.label}>Current Streak</p>
                <h3 className={MODULE_KPI.value}>{streak}</h3>
                <p className={STAT_CARD.sub}>days</p>
              </div>
              <Smile className={cn(MODULE_KPI.bigIcon, "text-yellow-500")} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <SectionCard title="Your Journey">
        {moodEntries.length === 0 ? (
          <EmptyState hint="Start your mental health journey by logging your first mood entry!" />
        ) : (
          <ul className="space-y-3">
            {moodEntries.map((m) => {
              const meta = moodMeta(m.mood);
              const acts = parseJsonArray(m.activities);
              return (
                <li
                  key={m.id}
                  className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition dark:border-neutral-800"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg"
                      aria-hidden="true"
                    >
                      {meta.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {meta.label}
                          <span className="ml-2 font-normal text-muted">{formatDate(m.date)}</span>
                        </p>
                        <button
                          type="button"
                          className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40")}
                          onClick={async () => {
                            const res = await deleteMoodEntry(m.id);
                            if (!res.ok) toast.error(res.error);
                          }}
                          aria-label={`Delete ${meta.label} entry`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Energy Level: {m.energy}/10</p>
                      {acts.length > 0 && (
                        <p className="text-xs text-muted">Activities: {acts.join(", ")}</p>
                      )}
                      {m.gratitude && (
                        <p className="mt-1 text-xs text-muted">Grateful for: {m.gratitude}</p>
                      )}
                      {m.reflection && <p className="mt-1 text-xs text-muted">{m.reflection}</p>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        </SectionCard>
      </div>
    </div>
  );
}
