"use client";

import * as React from "react";
import { Bell, BellRing, CheckCircle2, Pencil, Plus, Trash2 } from "lucide-react";
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
import {
  REMINDER_TYPES,
  REMINDER_REPEATS,
  ASSIGNMENT_PRIORITIES,
  reminderTypeMeta,
  repeatMeta,
  priorityMeta,
} from "@/lib/constants";
import { reminderStatus } from "@/lib/wellness";
import { formatMonthDayYearTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Reminder } from "@/types";

interface FormState {
  title: string;
  details: string;
  remindAt: string;
  type: string;
  priority: string;
  repeat: string;
}

const EMPTY: FormState = {
  title: "",
  details: "",
  remindAt: "",
  type: "custom",
  priority: "medium",
  repeat: "none",
};

export default function RemindersClientPage() {
  const { reminders, hydrated, fetchReminders, createReminder, updateReminder, deleteReminder } =
    useWellnessStore();
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Reminder | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(EMPTY);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  React.useEffect(() => {
    if (!hydrated) return;
    void fetchReminders();
  }, [hydrated, fetchReminders]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (r: Reminder) => {
    setEditing(r);
    const d = new Date(r.remindAt);
    const pad = (n: number) => String(n).padStart(2, "0");
    setForm({
      title: r.title,
      details: r.details ?? "",
      remindAt: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`,
      type: r.type,
      priority: r.priority,
      repeat: r.repeat,
    });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.title.trim()) {
      toast.error("A reminder needs a title");
      return;
    }
    if (!form.remindAt) {
      toast.error("Choose when to remind you");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      details: form.details || null,
      remindAt: form.remindAt,
      type: form.type,
      priority: form.priority,
      repeat: form.repeat,
    };
    const res = editing ? await updateReminder(editing.id, payload) : await createReminder(payload);
    setSaving(false);
    if (res.ok) {
      toast.success(editing ? "Reminder updated" : "Reminder set — we've got your back! 🔔");
      setOpen(false);
    } else {
      toast.error(res.error);
    }
  };

  const toggleComplete = async (r: Reminder) => {
    const res = await updateReminder(r.id, { completed: !r.completed });
    if (!res.ok) toast.error(res.error);
  };

  const remove = async (r: Reminder) => {
    const res = await deleteReminder(r.id);
    if (!res.ok) toast.error(res.error);
  };

  const now = new Date();
  const upcoming = reminders.filter((r) => reminderStatus(r, now) === "upcoming").length;
  const overdue = reminders.filter((r) => reminderStatus(r, now) === "overdue").length;
  const completed = reminders.filter((r) => reminderStatus(r, now) === "completed").length;

  if (!hydrated) {
    return (
      <div className={PAGE_THEMES.reminders.root}>
        <LoadingBlock label="Loading reminders…" />
      </div>
    );
  }

  const sorted = [...reminders].sort((a, b) => {
    const sa = a.completed ? 2 : reminderStatus(a, now) === "overdue" ? 0 : 1;
    const sb = b.completed ? 2 : reminderStatus(b, now) === "overdue" ? 0 : 1;
    if (sa !== sb) return sa - sb;
    return new Date(a.remindAt).getTime() - new Date(b.remindAt).getTime();
  });

  return (
    <div className={PAGE_THEMES.reminders.root}>
      <div className={PAGE_THEMES.reminders.container}>
      <PageHeader
        title="Reminders"
        subtitle="Never miss an important task or deadline"
        theme={PAGE_THEMES.reminders}
        actions={
          <GradientButton onClick={openCreate} gradient={PAGE_THEMES.reminders.button}>
            <Plus className="h-4 w-4" /> New Reminder
          </GradientButton>
        }
      />

      <div className={PAGE_KPI_GRIDS.three}>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <p className={STAT_CARD.label}>Upcoming</p>
          <h3 className={cn(STAT_CARD.value, "mt-1")}>{upcoming}</h3>
        </div>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <p className={STAT_CARD.label}>Overdue</p>
          <h3 className={cn(STAT_CARD.value, "mt-1")}>{overdue}</h3>
        </div>
        <div className={cn(STAT_CARD.card, "p-5")}>
          <p className={STAT_CARD.label}>Completed</p>
          <h3 className={cn(STAT_CARD.value, "mt-1")}>{completed}</h3>
        </div>
      </div>

      <SectionCard icon={BellRing} title="Upcoming Reminders">
        {reminders.length === 0 ? (
          <EmptyState
            icon={Bell}
            hint="No upcoming reminders. Create one to stay organized!"
          />
        ) : (
          <ul className="space-y-3">
            {sorted.map((r) => {
              const status = reminderStatus(r, now);
              const t = reminderTypeMeta(r.type);
              const p = priorityMeta(r.priority);
              const rep = repeatMeta(r.repeat);
              return (
                <li
                  key={r.id}
                  className={cn(
                    "flex flex-wrap items-center justify-between gap-2 rounded-lg border px-4 py-3",
                    status === "overdue"
                      ? "border-red-200 bg-red-50/70 dark:bg-red-950/30"
                      : status === "completed"
                        ? "border-line bg-line-soft/50 opacity-70"
                        : "border-line bg-line-soft/50",
                  )}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <button
                      type="button"
                      onClick={() => void toggleComplete(r)}
                      aria-label={r.completed ? `Reopen ${r.title}` : `Complete ${r.title}`}
                      className={cn(
                        "mt-0.5 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        r.completed ? "text-emerald-500" : "text-gray-300 hover:text-gray-400",
                      )}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </button>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium text-foreground",
                          r.completed && "line-through text-muted",
                        )}
                      >
                        {r.title}
                      </p>
                      <p className="text-xs text-muted">
                        {formatMonthDayYearTime(r.remindAt)}
                        {r.details ? ` · ${r.details}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <OptionChip label={t.label} tint={t.tint} text={t.text} />
                    {r.priority !== "low" && (
                      <OptionChip label={p.label} tint={p.tint} text={p.text} />
                    )}
                    {r.repeat !== "none" && (
                      <OptionChip label={rep.label} tint={rep.tint} text={rep.text} />
                    )}
                    <button
                      type="button"
                      className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-muted hover:bg-line-soft")}
                      onClick={() => openEdit(r)}
                      aria-label={`Edit ${r.title}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-red-600 hover:bg-red-50")}
                      onClick={() => void remove(r)}
                      aria-label={`Delete ${r.title}`}
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

      {/* The Create dialog — the reference's field set. */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Reminder" : "Create New Reminder"}</DialogTitle>
            <DialogDescription>Small nudges, big wins.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rm-title">What should we remind you about?</Label>
              <Input
                id="rm-title"
                required
                className="mt-2"
                placeholder="e.g., Study for Math exam"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rm-details">Additional Details (optional)</Label>
              <textarea
                id="rm-details"
                className="mt-2 flex min-h-16 w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Any specific notes..."
                value={form.details}
                onChange={(e) => set("details", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rm-when">Remind Me On</Label>
              <Input
                id="rm-when"
                type="datetime-local"
                required
                className="mt-2"
                value={form.remindAt}
                onChange={(e) => set("remindAt", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rm-type">Type</Label>
                <Select value={form.type} onValueChange={(v) => set("type", v)}>
                  <SelectTrigger id="rm-type" className="mt-2 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REMINDER_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rm-priority">Priority</Label>
                <Select value={form.priority} onValueChange={(v) => set("priority", v)}>
                  <SelectTrigger id="rm-priority" className="mt-2 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSIGNMENT_PRIORITIES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rm-repeat">Repeat</Label>
                <Select value={form.repeat} onValueChange={(v) => set("repeat", v)}>
                  <SelectTrigger id="rm-repeat" className="mt-2 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REMINDER_REPEATS.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
            <GradientButton onClick={() => void submit()} disabled={saving} gradient={PAGE_THEMES.reminders.button}>
              {saving ? "Saving…" : editing ? "Save Changes" : "Create Reminder"}
            </GradientButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
