"use client";

import * as React from "react";
import { AlertTriangle, BookOpen, CheckCircle2, ClipboardList, Pencil, Trash2 } from "lucide-react";
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
import { PAGE_ROOT, PAGE_KPI_GRIDS, DIALOG_GROUP, BUTTON_CLASSES } from "@/lib/page-layout";
import { ASSIGNMENT_PRIORITIES, priorityMeta } from "@/lib/constants";
import { isAssignmentUrgent } from "@/lib/wellness";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Assignment } from "@/types";

interface FormState {
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  priority: string;
  estimatedHours: string;
}

const EMPTY: FormState = {
  title: "",
  description: "",
  subject: "",
  dueDate: "",
  priority: "medium",
  estimatedHours: "",
};

export default function AssignmentsClientPage() {
  const { assignments, hydrated, fetchAssignments, createAssignment, updateAssignment, deleteAssignment } =
    useWellnessStore();
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Assignment | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(EMPTY);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  React.useEffect(() => {
    if (!hydrated) return;
    void fetchAssignments();
  }, [hydrated, fetchAssignments]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (a: Assignment) => {
    setEditing(a);
    setForm({
      title: a.title,
      description: a.description ?? "",
      subject: a.subject ?? "",
      dueDate: a.dueDate ? a.dueDate.slice(0, 10) : "",
      priority: a.priority,
      estimatedHours: a.estimatedHours != null ? String(a.estimatedHours) : "",
    });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description || null,
      subject: form.subject || null,
      dueDate: form.dueDate || null,
      priority: form.priority,
      estimatedHours: form.estimatedHours ? Number(form.estimatedHours) : null,
    };
    const res = editing
      ? await updateAssignment(editing.id, payload)
      : await createAssignment(payload);
    setSaving(false);
    if (res.ok) {
      const badges = (res.data as Assignment & { newBadges?: { name: string }[] }).newBadges ?? [];
      toast.success(editing ? "Assignment updated" : "Assignment created — one step ahead! 📚");
      badges.forEach((b) => toast.success(`Badge earned: ${b.name}! 🏅`));
      setOpen(false);
    } else {
      toast.error(res.error);
    }
  };

  const toggleComplete = async (a: Assignment) => {
    const res = await updateAssignment(a.id, {
      status: a.status === "completed" ? "pending" : "completed",
    });
    if (res.ok) {
      const badges = (res.data as Assignment & { newBadges?: { name: string }[] }).newBadges ?? [];
      if (a.status !== "completed") toast.success(`"${a.title}" completed — nice work! ✅`);
      badges.forEach((b) => toast.success(`Badge earned: ${b.name}! 🏅`));
    } else {
      toast.error(res.error);
    }
  };

  const remove = async (a: Assignment) => {
    const res = await deleteAssignment(a.id);
    if (!res.ok) toast.error(res.error);
  };

  const pending = assignments.filter((a) => a.status !== "completed");
  const completed = assignments.filter((a) => a.status === "completed");
  const urgent = assignments.filter((a) => isAssignmentUrgent(a)).length;

  if (!hydrated) {
    return (
      <div className={PAGE_ROOT.standard}>
        <LoadingBlock label="Loading assignments…" />
      </div>
    );
  }

  const sorted = [...assignments].sort((a, b) => {
    if (a.status !== b.status) return a.status === "completed" ? 1 : -1;
    const da = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const db = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
    return da - db;
  });

  return (
    <div className={PAGE_ROOT.standard}>
      <PageHeader
        title="Assignments"
        subtitle="Manage your tasks and deadlines"
        actions={
          <GradientButton onClick={openCreate}>
            <ClipboardList className="h-4 w-4" /> New Assignment
          </GradientButton>
        }
      />

      <div className={PAGE_KPI_GRIDS.three}>
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/40 p-5 shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white" aria-hidden="true">
            <BookOpen className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className="text-sm font-medium text-muted">Pending</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{pending.length}</h3>
        </div>
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white" aria-hidden="true">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-muted">Completed</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{completed.length}</h3>
        </div>
        <div className="rounded-xl bg-red-50 dark:bg-red-950/40 p-5 shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-white" aria-hidden="true">
            <AlertTriangle className="h-5 w-5" fill="currentColor" strokeWidth={1} />
          </div>
          <p className="text-sm font-medium text-muted">Urgent</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{urgent}</h3>
        </div>
      </div>

      <SectionCard icon={BookOpen} title="Your Assignments">
        {assignments.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            hint="No assignments yet. Add one to stay on top of your deadlines!"
          />
        ) : (
          <ul className="space-y-3">
            {sorted.map((a) => {
              const p = priorityMeta(a.priority);
              return (
                <li
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-line-soft/50 px-4 py-3"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <button
                      type="button"
                      onClick={() => void toggleComplete(a)}
                      aria-label={a.status === "completed" ? `Mark ${a.title} pending` : `Complete ${a.title}`}
                      className={cn(
                        "mt-0.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full",
                        a.status === "completed" ? "text-emerald-500" : "text-gray-300 hover:text-gray-400",
                      )}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </button>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium text-foreground",
                          a.status === "completed" && "line-through text-muted",
                        )}
                      >
                        {a.title}
                      </p>
                      <p className="text-xs text-muted">
                        {a.subject ? `${a.subject} · ` : ""}
                        {a.dueDate ? `Due ${formatDate(a.dueDate)}` : "No due date"}
                        {a.estimatedHours != null ? ` · ~${a.estimatedHours}h` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <OptionChip label={p.label} tint={p.tint} text={p.text} />
                    <button
                      type="button"
                      className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-muted hover:bg-line-soft")}
                      onClick={() => openEdit(a)}
                      aria-label={`Edit ${a.title}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-red-600 hover:bg-red-50")}
                      onClick={() => void remove(a)}
                      aria-label={`Delete ${a.title}`}
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

      {/* The Create/Edit dialog — the reference's field set. */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Assignment" : "Create New Assignment"}</DialogTitle>
            <DialogDescription>
              {editing ? "Update the details below." : "Break it down — small steps count!"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="as-title">Title</Label>
              <Input
                id="as-title"
                required
                className="mt-2"
                placeholder="Chapter 5 exercises"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="as-desc">Description</Label>
              <textarea
                id="as-desc"
                className="mt-2 flex min-h-20 w-full rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Assignment details..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="as-subject">Subject/Category</Label>
              <Input
                id="as-subject"
                className="mt-2"
                placeholder="Math, Science, etc."
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
              />
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="as-due">Due Date</Label>
              <Input
                id="as-due"
                type="date"
                className="mt-2"
                value={form.dueDate}
                onChange={(e) => set("dueDate", e.target.value)}
              />
            </div>
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="as-priority">Priority</Label>
              <Select value={form.priority} onValueChange={(v) => set("priority", v)}>
                <SelectTrigger id="as-priority" className="mt-2 w-full">
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
            <div className={DIALOG_GROUP.group}>
              <Label htmlFor="as-hours">Estimated Hours</Label>
              <Input
                id="as-hours"
                type="number"
                min={0}
                step="0.5"
                className="mt-2"
                placeholder="Optional"
                value={form.estimatedHours}
                onChange={(e) => set("estimatedHours", e.target.value)}
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
              {saving ? "Saving…" : editing ? "Save Changes" : "Create Assignment"}
            </GradientButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
