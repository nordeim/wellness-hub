"use client";

import * as React from "react";
import {
  BookOpen,
  ExternalLink,
  Filter,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { useWellnessStore } from "@/stores/wellness-store";
import { toast } from "@/components/ui/toast";
import {
  PageHeader,
  EmptyState,
  LoadingBlock,
  GradientButton,
  OptionChip,
} from "@/components/shared/page-parts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PAGE_THEMES, BUTTON_CLASSES, FORM_CARD, SECTION_CARD, EMPTY_STATE, TOOLBAR , TEXTAREA_FIELD } from "@/lib/page-layout";
import { RESOURCE_TYPES, resourceTypeMeta } from "@/lib/constants";
import { matchesQuery, normalizeTags, parseJsonArray } from "@/lib/wellness";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { StudyResource } from "@/types";

interface FormState {
  title: string;
  subject: string;
  description: string;
  type: string;
  examDate: string;
  url: string;
  tags: string[];
  personalNotes: string;
  rating: number;
}

const EMPTY: FormState = {
  title: "",
  subject: "",
  description: "",
  type: "notes",
  examDate: "",
  url: "",
  tags: [],
  personalNotes: "",
  rating: 0,
};

export default function StudyResourcesClientPage() {
  const {
    studyResources,
    hydrated,
    fetchStudyResources,
    createStudyResource,
    updateStudyResource,
    deleteStudyResource,
  } = useWellnessStore();
  const [query, setQuery] = React.useState("");
  const [subject, setSubject] = React.useState("all");
  const [type, setType] = React.useState("all");
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<StudyResource | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(EMPTY);
  const [tagInput, setTagInput] = React.useState("");

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  React.useEffect(() => {
    if (!hydrated) return;
    void fetchStudyResources();
  }, [hydrated, fetchStudyResources]);

  const subjects = React.useMemo(
    () => [...new Set(studyResources.map((r) => r.subject))].sort(),
    [studyResources],
  );

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setTagInput("");
    setOpen(true);
  };

  const openEdit = (r: StudyResource) => {
    setEditing(r);
    setForm({
      title: r.title,
      subject: r.subject,
      description: r.description ?? "",
      type: r.type,
      examDate: r.examDate ? r.examDate.slice(0, 10) : "",
      url: r.url ?? "",
      tags: parseJsonArray(r.tags),
      personalNotes: r.personalNotes ?? "",
      rating: r.rating ?? 0,
    });
    setTagInput("");
    setOpen(true);
  };

  const addTag = () => {
    set("tags", normalizeTags([...form.tags, tagInput]));
    setTagInput("");
  };

  const submit = async () => {
    if (!form.title.trim() || !form.subject.trim()) {
      toast.error("Title and subject are required");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      subject: form.subject,
      description: form.description || null,
      type: form.type,
      examDate: form.examDate || null,
      url: form.url || null,
      tags: form.tags,
      personalNotes: form.personalNotes || null,
      rating: form.rating > 0 ? form.rating : null,
    };
    const res = editing
      ? await updateStudyResource(editing.id, payload)
      : await createStudyResource(payload);
    setSaving(false);
    if (res.ok) {
      toast.success(editing ? "Resource updated" : "Resource added — organized and ready! 📚");
      setOpen(false);
    } else {
      toast.error(res.error);
    }
  };

  const remove = async (r: StudyResource) => {
    const res = await deleteStudyResource(r.id);
    if (!res.ok) toast.error(res.error);
  };

  const filtered = studyResources.filter(
    (r) =>
      (subject === "all" || r.subject === subject) &&
      (type === "all" || r.type === type) &&
      matchesQuery(query, [
        r.title,
        r.description,
        r.subject,
        ...parseJsonArray(r.tags),
      ]),
  );

  if (!hydrated) {
    return (
      <div className={PAGE_THEMES.studyresources.root}>
        <LoadingBlock label="Loading resources…" />
      </div>
    );
  }

  return (
    <div className={PAGE_THEMES.studyresources.root}>
      <div className={PAGE_THEMES.studyresources.container}>
      <PageHeader
        title="Study Resources"
        subtitle="Organize all your study materials in one place"
        theme={PAGE_THEMES.studyresources}
        actions={
          <GradientButton onClick={openCreate} gradient={PAGE_THEMES.studyresources.button}>
            <Plus className="h-4 w-4" /> Add Resource
          </GradientButton>
        }
      />

      {/* The Create/Edit form — the reference's INLINE EXPANDING CARD
          (WH-21, the modality cure: probed live — its create-forms open
          in the page flow, no overlay, no scroll lock; only its Routines
          Schedule flow is a modal). */}
      {open && (
        <section className={FORM_CARD.card}>
          <div className={FORM_CARD.header}>
            <h2 className={FORM_CARD.title}>{editing ? "Edit Study Resource" : "Add Study Resource"}</h2>
          </div>
          <div className={FORM_CARD.body}>
            <div className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="sr-title">Resource Title</Label>
              <Input
                id="sr-title"
                required
                className="mt-2"
                placeholder="e.g., Chapter 5 Notes"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sr-subject">Subject/Course</Label>
              <Input
                id="sr-subject"
                required
                className="mt-2"
                placeholder="e.g., Biology 101"
                value={form.subject}
                onChange={(e) => set("subject", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sr-desc">Description</Label>
              <textarea
                id="sr-desc"
                className={TEXTAREA_FIELD}
                placeholder="What does this resource cover?"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sr-type">Resource Type</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger id="sr-type" className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RESOURCE_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.icon} {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sr-exam">Exam/Test Date (optional)</Label>
                <Input
                  id="sr-exam"
                  type="date"
                  className="mt-2"
                  value={form.examDate}
                  onChange={(e) => set("examDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sr-url">URL Link (optional)</Label>
                <Input
                  id="sr-url"
                  type="url"
                  className="mt-2"
                  placeholder="https://..."
                  value={form.url}
                  onChange={(e) => set("url", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sr-tags">Tags</Label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="sr-tags"
                  placeholder="e.g., midterm, chapter3"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <button
                  type="button"
                  className={cn(BUTTON_CLASSES, "h-9 rounded-md border border-line px-4 hover:bg-line-soft")}
                  onClick={addTag}
                >
                  Add
                </button>
              </div>
              {form.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      #{tag}
                      <button
                        type="button"
                        aria-label={`Remove tag ${tag}`}
                        className="text-primary/70 hover:text-primary"
                        onClick={() => set("tags", form.tags.filter((x) => x !== tag))}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sr-notes">Personal Notes (optional)</Label>
              <textarea
                id="sr-notes"
                className={TEXTAREA_FIELD}
                placeholder="Your thoughts about this resource..."
                value={form.personalNotes}
                onChange={(e) => set("personalNotes", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Rating (optional)</Label>
              <div className="mt-2 flex items-center gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={form.rating === n}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    onClick={() => set("rating", form.rating === n ? 0 : n)}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <Star
                      className={cn(
                        "h-6 w-6 transition-transform hover:scale-110",
                        n <= form.rating ? "fill-amber-400 text-amber-400" : "text-gray-300",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          
              <div className={FORM_CARD.footer}>
              <button
                type="button"
                className={cn(BUTTON_CLASSES, "h-10 rounded-md border border-line px-8 hover:bg-line-soft")}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <GradientButton onClick={() => void submit()} disabled={saving} gradient={PAGE_THEMES.studyresources.button}>
                {saving ? "Saving…" : editing ? "Save Changes" : "Add Resource"}
              </GradientButton>
          
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The toolbar — search + subject + type (WH-24: the reference's
          stock family — the Input + pl-10, the Filter-icon wrapper, the
          fixed w-40 pair, the gap-4/md container). */}
      <div className={TOOLBAR.container}>
        <div className={TOOLBAR.searchWrap}>
          <Search className={TOOLBAR.searchIcon} aria-hidden="true" />
          <Input
            type="search"
            aria-label="Search resources, tags..."
            placeholder="Search resources, tags..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={TOOLBAR.selectsWrap}>
          <Filter className={TOOLBAR.filterIcon} aria-hidden="true" />
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="w-40" aria-label="Filter by subject">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-40" aria-label="Filter by type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {RESOURCE_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.icon} {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* WH-23: the reference's OWN special empty card (probed): the
          p-6 py-20 body + the big w-16 h-16 gray-300 book-open + the
          text-lg hint — not the module pages' bare-paragraph form. */}
      {filtered.length === 0 ? (
        <div className={SECTION_CARD.card}>
          <div className={EMPTY_STATE.study.body}>
            <BookOpen className={EMPTY_STATE.study.icon} aria-hidden="true" />
            <p className={EMPTY_STATE.study.text}>No resources found. Add your study materials to get started!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((r) => {
            const t = resourceTypeMeta(r.type);
            const tags = parseJsonArray(r.tags);
            return (
              <section key={r.id} className="rounded-xl border border-line bg-surface p-5 shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="min-w-0 font-semibold text-foreground">{r.title}</h3>
                  <OptionChip label={t.label} icon={t.icon} tint={t.tint} text={t.text} />
                </div>
                <p className="mt-0.5 text-xs font-medium text-primary">{r.subject}</p>
                {r.description && <p className="mt-2 text-sm text-muted">{r.description}</p>}
                {r.examDate && (
                  <p className="mt-2 text-xs text-amber-600">Exam: {formatDate(r.examDate)}</p>
                )}
                {tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-line-soft px-2 py-0.5 text-xs text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-0.5" aria-label={`Rated ${r.rating ?? 0} of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={cn(
                          "h-4 w-4",
                          n <= (r.rating ?? 0) ? "fill-amber-400 text-amber-400" : "text-gray-300",
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    {r.url && (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-primary hover:bg-primary/10")}
                        aria-label={`Open ${r.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
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
                      className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50")}
                      onClick={() => void remove(r)}
                      aria-label={`Delete ${r.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      </div>
    </div>
  );
}
