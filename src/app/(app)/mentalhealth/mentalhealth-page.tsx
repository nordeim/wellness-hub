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
import { PAGE_THEMES, PAGE_KPI_GRIDS, STAT_CARD, MODULE_KPI, DIALOG_GROUP, BUTTON_CLASSES, FORM_CARD, TEXTAREA_FIELD, MOOD_FORM, FORM_BUTTONS, TAG_CHIP, MOOD_ENTRY_LIST } from "@/lib/page-layout";
import { MOODS, moodMeta } from "@/lib/constants";
import { averageEnergy, displayStreak, normalizeTags, parseJsonArray } from "@/lib/wellness";
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

  // WH-28 (F-3): the tile formulas mirror the reference's own bundle —
  //   Avg Energy: `(sum/length).toFixed(1)` → always one decimal place
  //     ("5.0/10"; at zero entries ours deliberately renders "0.0/10"
  //     where the reference renders "NaN/10" — its (0/0) bug, fixed
  //     here, the deviation documented in PAD §11)
  //   Current Streak: `min(7, entry count)` — NEVER a consecutive-day
  //     streak (an entry 2 days ago reads 1). The BADGE ENGINE keeps the
  //     real math (`currentStreak` — "7-Day Streak" is "7 days in a
  //     row"): the tile is the parity surface, the engine our superset.
  const avgEnergy = averageEnergy(moodEntries.map((m) => m.energy));
  const streak = displayStreak(moodEntries.length);

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
            {/* WH-26: the mood form's own wrapper — the reference's ONE
                space-y-6 form (24px group gaps; its siblings ride
                space-y-4 — probed on the redeployed reference). */}
            <div className="space-y-6">
              <div className={DIALOG_GROUP.group}>
                <Label className={MOOD_FORM.label}>Choose your mood</Label>
                <div className={MOOD_FORM.grid}>
                  {MOODS.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setMood(m.value)}
                      aria-pressed={mood === m.value}
                      className={cn(
                        MOOD_FORM.tile,
                        mood === m.value ? MOOD_FORM.active : MOOD_FORM.inactive,
                      )}
                    >
                      <span aria-hidden="true" className={cn("block", MOOD_FORM.icon)}>
                        {m.icon}
                      </span>
                      {/* WH-26 (F-1): the label flips with the tile state —
                          the reference's active label div is text-white;
                          our old CONSTANT text-gray-700 rendered gray on
                          the blue gradient (the WH-21 pin asserted the
                          button's arm, never the rendered label span). */}
                      <span
                        className={cn(
                          "block",
                          mood === m.value ? MOOD_FORM.labelActive : MOOD_FORM.labelInactive,
                        )}
                      >
                        {m.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              {/* WH-26 (F-3): the energy slider — the reference's 8px
                  gray-200 track at min=1 (Chrome keeps the native blue
                  thumb under appearance:none — pixel-verified); the
                  label→range gap is the line-box artifact (13px probed). */}
              <div>
                <Label htmlFor="mood-energy">Energy Level: {energy}/10</Label>
                <input
                  id="mood-energy"
                  type="range"
                  min={1}
                  max={10}
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className={MOOD_FORM.range}
                />
                <div className={MOOD_FORM.lowHigh}>
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              <div className={DIALOG_GROUP.group}>
                <Label htmlFor="mood-activities">Activities that affected your mood</Label>
                <div className="flex gap-2 mt-2">
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
                  <button type="button" className={FORM_BUTTONS.add} onClick={addActivity}>
                    Add
                  </button>
                </div>
                {activities.length > 0 && (
                  <div className={TAG_CHIP.row}>
                    {activities.map((a) => (
                      <span key={a} className={TAG_CHIP.chip}>
                        {a}
                        <button
                          type="button"
                          aria-label={`Remove ${a}`}
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
                  className={TEXTAREA_FIELD}
                  placeholder="Write something you're thankful for..."
                  value={gratitude}
                  onChange={(e) => setGratitude(e.target.value)}
                />
              </div>
              <div className={DIALOG_GROUP.group}>
                <Label htmlFor="mood-reflection">Daily Reflection</Label>
                {/* WH-26 (F-8): the reference's reflection textarea rides
                    h-24 (96px) where the gratitude field keeps the 60px
                    stock form — probed. */}
                <textarea
                  id="mood-reflection"
                  className={cn(TEXTAREA_FIELD, "h-24")}
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
                <button type="button" className={FORM_BUTTONS.cancel} onClick={() => setOpen(false)}>
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
                <h3 className={MODULE_KPI.value}>{avgEnergy.toFixed(1)}/10</h3>
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
          <div className={MOOD_ENTRY_LIST.container}>
            {moodEntries.map((m) => {
              const meta = moodMeta(m.mood);
              const acts = parseJsonArray(m.activities);
              return (
                <div key={m.id} className={MOOD_ENTRY_LIST.tile}>
                  <div className={MOOD_ENTRY_LIST.row}>
                    <div className={MOOD_ENTRY_LIST.chip} aria-hidden="true">
                      {meta.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      {/* WH-28 (F-1): the reference's label row — the H4 at
                          text-lg (18px) LEFT, the date its OWN right-side
                          span (justify-between spreads them); our delete
                          rides in the right-side group beside the date —
                          the reference's spread preserved, the superset
                          kept (it carries no delete anywhere). */}
                      <div className={MOOD_ENTRY_LIST.labelRow}>
                        <h4 className={MOOD_ENTRY_LIST.label}>{meta.label}</h4>
                        <div className="flex items-center gap-2">
                          <span className={MOOD_ENTRY_LIST.date}>{formatDate(m.date)}</span>
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
                      </div>
                      <p className={MOOD_ENTRY_LIST.energy}>Energy Level: {m.energy}/10</p>
                      {acts.length > 0 && (
                        <p className="text-xs text-muted">Activities: {acts.join(", ")}</p>
                      )}
                      {m.gratitude && (
                        <p className="mt-1 text-xs text-muted">Grateful for: {m.gratitude}</p>
                      )}
                      {m.reflection && <p className="mt-1 text-xs text-muted">{m.reflection}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </SectionCard>
      </div>
    </div>
  );
}
