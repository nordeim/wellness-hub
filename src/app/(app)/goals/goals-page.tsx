"use client";

import * as React from "react";
import { Award, CheckCircle2, Pencil, Plus, Target, Trash2 } from "lucide-react";
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
import { PAGE_THEMES, PAGE_KPI_GRIDS, STAT_CARD, BUTTON_BASE, BUTTON_CLASSES } from "@/lib/page-layout";
import { GOAL_CATEGORIES, GOAL_FREQUENCIES, goalCategoryMeta, goalFrequencyMeta } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Goal } from "@/types";

interface FormState {
  title: string;
  description: string;
  category: string;
  frequency: string;
  targetValue: string;
  unit: string;
  deadline: string;
}

const EMPTY: FormState = {
  title: "",
  description: "",
  category: "personal",
  frequency: "one_time",
  targetValue: "",
  unit: "",
  deadline: "",
};

export default function GoalsClientPage() {
  const {
    goals,
    achievements,
    hydrated,
    fetchGoals,
    fetchAchievements,
    createGoal,
    updateGoal,
    deleteGoal,
  } = useWellnessStore();
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Goal | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(EMPTY);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  React.useEffect(() => {
    if (!hydrated) return;
    void fetchGoals();
    void fetchAchievements();
  }, [hydrated, fetchGoals, fetchAchievements]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (g: Goal) => {
    setEditing(g);
    setForm({
      title: g.title,
      description: g.description ?? "",
      category: g.category,
      frequency: g.frequency,
      targetValue: String(g.targetValue),
      unit: g.unit,
      deadline: g.deadline ? g.deadline.slice(0, 10) : "",
    });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.title.trim()) {
      toast.error("Goal title is required");
      return;
    }
    const target = Number(form.targetValue);
    if (!Number.isFinite(target) || target < 1) {
      toast.error("Target value must be at least 1");
      return;
    }
    if (!form.unit.trim()) {
      toast.error("Unit is required (e.g., times, hours, days)");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description || null,
      category: form.category,
      frequency: form.frequency,
      targetValue: Math.round(target),
      unit: form.unit,
      deadline: form.deadline || null,
    };
    const res = editing ? await updateGoal(editing.id, payload) : await createGoal(payload);
    setSaving(false);
    if (res.ok) {
      toast.success(editing ? "Goal updated" : "Goal created — you're on your way! 🎯");
      setOpen(false);
    } else {
      toast.error(res.error);
    }
  };

  const logProgress = async (g: Goal) => {
    const next = g.currentValue + 1;
    const done = next >= g.targetValue;
    const res = await updateGoal(g.id, {
      currentValue: next,
      ...(done ? { status: "completed" } : {}),
    });
    if (res.ok) {
      const badges = (res.data as Goal & { newBadges?: { name: string }[] }).newBadges ?? [];
      if (done) {
        toast.success(`Goal completed — "${g.title}"! Points earned 🏆`);
      } else {
        toast.success(`Progress logged: ${next}/${g.targetValue} ${g.unit}`);
      }
      badges.forEach((b) => toast.success(`Badge earned: ${b.name}! 🏅`));
    } else {
      toast.error(res.error);
    }
  };

  const remove = async (g: Goal) => {
    const res = await deleteGoal(g.id);
    if (!res.ok) toast.error(res.error);
  };

  const active = goals.filter((g) => g.status !== "completed");
  const completedCount = achievements?.goalsCompleted ?? goals.filter((g) => g.status === "completed").length;
  const goalsTotal = achievements?.goalsTotal ?? goals.length;
  const totalPoints = achievements?.totalPoints ?? 0;
  const badgesEarned = achievements?.badgesEarned ?? 0;
  const badgesTotal = achievements?.badgesTotal ?? 0;

  if (!hydrated) {
    return (
      <div className={PAGE_THEMES.goals.root}>
        <LoadingBlock label="Loading your goals…" />
      </div>
    );
  }

  return (
    <div className={PAGE_THEMES.goals.root}>
      <div className={PAGE_THEMES.goals.container}>
      <PageHeader
        title="Goals & Achievements"
        subtitle="Track your progress and celebrate wins"
        theme={PAGE_THEMES.goals}
        actions={
          <GradientButton onClick={openCreate} gradient={PAGE_THEMES.goals.button}>
            <Plus className="h-4 w-4" /> New Goal
          </GradientButton>
        }
      />

      <div className={PAGE_KPI_GRIDS.three}>
        <div className={cn(STAT_CARD.hero, "from-yellow-500 to-amber-600 p-5")}>
          <p className={cn(STAT_CARD.heroLabel, "text-yellow-100")}>Total Points</p>
          <h3 className={cn(STAT_CARD.heroValue, "mt-1")}>{totalPoints}</h3>
        </div>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <p className={STAT_CARD.label}>Goals Completed</p>
          <h3 className={cn(STAT_CARD.value, "mt-1")}>{completedCount}</h3>
          <p className={STAT_CARD.sub}>of {goalsTotal} total</p>
        </div>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <p className={STAT_CARD.label}>Badges Earned</p>
          <h3 className={cn(STAT_CARD.value, "mt-1")}>{badgesEarned}</h3>
          <p className={STAT_CARD.sub}>of {badgesTotal} total</p>
        </div>
      </div>

      <SectionCard icon={Target} title="Active Goals">
        {active.length === 0 ? (
          <EmptyState
            icon={Target}
            hint="No goals yet. Create your first goal to start tracking!"
          />
        ) : (
          <ul className="space-y-4">
            {active.map((g) => {
              const c = goalCategoryMeta(g.category);
              const f = goalFrequencyMeta(g.frequency);
              const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));
              return (
                <li key={g.id} className="rounded-lg border border-line bg-line-soft/50 px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{g.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {g.currentValue}/{g.targetValue} {g.unit} · {f.label}
                        {g.deadline ? ` · by ${formatDate(g.deadline)}` : ""}
                        {g.description ? ` · ${g.description}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <OptionChip label={c.label} tint={c.tint} text={c.text} />
                      <button
                        type="button"
                        className={cn(BUTTON_CLASSES, "h-8 rounded-md bg-primary/10 px-3 text-xs text-primary hover:bg-primary/20")}
                        onClick={() => void logProgress(g)}
                      >
                        +1 {g.unit}
                      </button>
                      <button
                        type="button"
                        className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-muted hover:bg-line-soft")}
                        onClick={() => openEdit(g)}
                        aria-label={`Edit ${g.title}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-red-600 hover:bg-red-50")}
                        onClick={() => void remove(g)}
                        aria-label={`Delete ${g.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="mt-3 h-2 overflow-hidden rounded-full bg-line"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${g.title} progress`}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </SectionCard>

      <SectionCard
        icon={Award}
        title="Achievements"
        action={
          <span className="text-xs text-muted">
            {badgesEarned}/{badgesTotal} earned
          </span>
        }
      >
        {(achievements?.badges.length ?? 0) === 0 ? (
          <EmptyState icon={Award} hint="Achievements will appear here as you progress!" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievements?.badges.map((b) => {
              const earned = b.earnedAt != null;
              return (
                <div
                  key={b.id}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-4 text-center",
                    earned ? "border-primary/30 bg-primary/5" : "border-line bg-line-soft/40",
                  )}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                    style={{ backgroundColor: earned ? `${b.color}22` : undefined }}
                    aria-hidden="true"
                  >
                    {b.icon}
                  </span>
                  <p className="text-sm font-semibold text-foreground">{b.name}</p>
                  {/* WH-17 (F-4): gray-600 over gray-500 — the muted token
                      computed 4.48:1 on the line-soft/40 wash (the badge
                      catalog is our superset surface; the reference ships an
                      empty state here), and the card-level opacity-60
                      dimming retired with it (an axe-invisible contrast
                      hazard — the effective fg compounds far below the
                      reported ratio). */}
                  <p className="text-xs text-gray-600 dark:text-gray-400">{b.description}</p>
                  {earned && (
                    <p className="text-xs font-medium text-primary">
                      Earned {formatDate(b.earnedAt as string)} · +{b.points} pts
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>

      {/* The Create dialog — the reference's field set. */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Goal" : "Create New Goal"}</DialogTitle>
            <DialogDescription>
              {editing ? "Update the details below." : "Dream big, start small! ✨"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gl-title">Goal Title</Label>
              <Input
                id="gl-title"
                required
                className="mt-2"
                placeholder="e.g., Exercise 3 times per week"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gl-desc">Description</Label>
              <textarea
                id="gl-desc"
                className="mt-2 flex min-h-16 w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Why is this goal important?"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gl-category">Category</Label>
                <Select value={form.category} onValueChange={(v) => set("category", v)}>
                  <SelectTrigger id="gl-category" className="mt-2 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GOAL_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gl-frequency">Frequency</Label>
                <Select value={form.frequency} onValueChange={(v) => set("frequency", v)}>
                  <SelectTrigger id="gl-frequency" className="mt-2 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GOAL_FREQUENCIES.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gl-target">Target Value</Label>
                <Input
                  id="gl-target"
                  type="number"
                  min={1}
                  required
                  className="mt-2"
                  placeholder="3"
                  value={form.targetValue}
                  onChange={(e) => set("targetValue", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gl-unit">Unit</Label>
                <Input
                  id="gl-unit"
                  required
                  className="mt-2"
                  placeholder="e.g., times, hours, days"
                  value={form.unit}
                  onChange={(e) => set("unit", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gl-deadline">Deadline (optional)</Label>
              <Input
                id="gl-deadline"
                type="date"
                className="mt-2"
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
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
            <GradientButton onClick={() => void submit()} disabled={saving} gradient={PAGE_THEMES.goals.button}>
              {saving ? "Saving…" : editing ? "Save Changes" : "Create Goal"}
            </GradientButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
