"use client";

import * as React from "react";
import { MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { useWellnessStore } from "@/stores/wellness-store";
import { toast } from "@/components/ui/toast";
import {
  PageHeader,
  SectionCard,
  LoadingBlock,
  GradientButton,
  OptionChip,
} from "@/components/shared/page-parts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PAGE_THEMES, SECTION_CARD, BUTTON_BASE, BUTTON_CLASSES, FORM_CARD, CALENDAR, TEXTAREA_FIELD, FORM_GRID, FORM_BUTTONS } from "@/lib/page-layout";
import { EVENT_CATEGORIES, eventCategoryMeta } from "@/lib/constants";
import { monthGrid, isSameCalendarDay, formatTimeString } from "@/lib/wellness";
import { formatMonthYear, formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/types";

interface FormState {
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  location: string;
}

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const EMPTY: FormState = {
  title: "",
  description: "",
  date: todayIso(),
  time: "",
  category: "personal",
  location: "",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export default function EventsClientPage() {
  const { events, hydrated, fetchEvents, createEvent, updateEvent, deleteEvent } = useWellnessStore();
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<EventItem | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(EMPTY);
  const [cursor, setCursor] = React.useState(() => new Date());

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  React.useEffect(() => {
    if (!hydrated) return;
    void fetchEvents();
  }, [hydrated, fetchEvents]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY, date: todayIso() });
    setOpen(true);
  };

  const openEdit = (e: EventItem) => {
    setEditing(e);
    setForm({
      title: e.title,
      description: e.description ?? "",
      date: e.date.slice(0, 10),
      time: e.time ?? "",
      category: e.category,
      location: e.location ?? "",
    });
    setOpen(true);
  };

  const submit = async () => {
    if (!form.title.trim()) {
      toast.error("Event title is required");
      return;
    }
    if (!form.date) {
      toast.error("Date is required");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description || null,
      date: form.date,
      time: form.time || null,
      category: form.category,
      location: form.location || null,
    };
    const res = editing ? await updateEvent(editing.id, payload) : await createEvent(payload);
    setSaving(false);
    if (res.ok) {
      toast.success(editing ? "Event updated" : "Event created — see you there! 📅");
      setOpen(false);
    } else {
      toast.error(res.error);
    }
  };

  const remove = async (e: EventItem) => {
    const res = await deleteEvent(e.id);
    if (!res.ok) toast.error(res.error);
  };

  if (!hydrated) {
    return (
      <div className={PAGE_THEMES.events.root}>
        <LoadingBlock label="Loading your calendar…" />
      </div>
    );
  }

  const weeks = monthGrid(cursor.getFullYear(), cursor.getMonth());
  // The reference's grid: the month's days only, with EMPTY leading
  // spacers for the first week's out-month positions (probed — no
  // trailing week, no leading numbers).
  const monthDays = weeks.flat().filter((d) => d.getMonth() === cursor.getMonth());
  const leading = weeks[0].filter((d) => d.getMonth() !== cursor.getMonth()).length;
  const today = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={PAGE_THEMES.events.root}>
      <div className={PAGE_THEMES.events.container}>
      <PageHeader
        title="Events Calendar"
        subtitle="Organize your schedule and important dates"
        theme={PAGE_THEMES.events}
        actions={
          <GradientButton onClick={openCreate} gradient={PAGE_THEMES.events.button}>
            <Plus className="h-4 w-4" /> New Event
          </GradientButton>
        }
      />

      {/* The Create/Edit form — the reference's INLINE EXPANDING CARD
          (WH-21, the modality cure: probed live — its create-forms open
          in the page flow, no overlay, no scroll lock, the card directly
          below the page header; only its Routines Schedule flow is a
          modal). */}
      {open && (
        <section className={FORM_CARD.card}>
          <div className={FORM_CARD.header}>
            <h2 className={FORM_CARD.title}>{editing ? "Edit Event" : "Create New Event"}</h2>
          </div>
          <div className={FORM_CARD.body}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ev-title">Event Title</Label>
                <Input
                  id="ev-title"
                  required
                  className="mt-2"
                  placeholder="Study group"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ev-desc">Description</Label>
                <textarea
                  id="ev-desc"
                  className={TEXTAREA_FIELD}
                  placeholder="Event details..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>
              {/* WH-26 (F-4): the trailing fields ride the reference's
                  grid md:grid-cols-2 gap-4 (probed live — the four dense
                  fields pair two-wide at md, never stacked). */}
              <div className={FORM_GRID.grid}>
                <div className="space-y-2">
                  <Label htmlFor="ev-date">Date</Label>
                  <Input
                    id="ev-date"
                    type="date"
                    required
                    className="mt-2"
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ev-time">Time (optional)</Label>
                  <Input
                    id="ev-time"
                    type="time"
                    className="mt-2"
                    value={form.time}
                    onChange={(e) => set("time", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ev-category">Category</Label>
                  <Select value={form.category} onValueChange={(v) => set("category", v)}>
                    <SelectTrigger id="ev-category" className="mt-2 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ev-location">Location (optional)</Label>
                  <Input
                    id="ev-location"
                    className="mt-2"
                    placeholder="Where?"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                  />
                </div>
              </div>
              <div className={FORM_CARD.footer}>
                <button type="button" className={FORM_BUTTONS.cancel} onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <GradientButton onClick={() => void submit()} disabled={saving} gradient={PAGE_THEMES.events.button}>
                  {saving ? "Saving…" : editing ? "Save Changes" : "Create Event"}
                </GradientButton>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The month grid — the reference's Sun-anchored 6x7 matrix
            (WH-24: the calendar card rides the CardHeader/CardContent
            anatomy — the p-6 header wrapping the title row whose classes
            ARE the row's, the stock OUTLINE nav trio with TEXT arrows at
            flex gap-2, the bare gap-2 grid inside the p-6 pt-0 body, the
            mb-1 day numbers and the space-y-1 events container). */}
        <section className={cn(SECTION_CARD.card, "lg:col-span-2")}>
          <div className={SECTION_CARD.header}>
            <h2 className={CALENDAR.headerRow}>
              <span>{formatMonthYear(cursor)}</span>
              <div className={CALENDAR.navRow}>
                <button
                  type="button"
                  aria-label="Previous month"
                  className={cn(BUTTON_CLASSES, CALENDAR.navBtn)}
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
                >
                  ←
                </button>
                <button
                  type="button"
                  className={cn(BUTTON_CLASSES, CALENDAR.navBtn)}
                  onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}
                >
                  Today
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  className={cn(BUTTON_CLASSES, CALENDAR.navBtn)}
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
                >
                  →
                </button>
              </div>
            </h2>
          </div>
          {/* The redesign's calendar (probed live): ONE grid — the 7
              weekday headers, the month's leading EMPTY spacers, then
              the month's days as the full cells (no trailing week). */}
          <div className={SECTION_CARD.body}>
            <div className={CALENDAR.grid}>
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
                  {d}
                </div>
              ))}
              {Array.from({ length: leading }, (_, i) => (
                <div key={`lead-${i}`} aria-hidden="true" />
              ))}
              {monthDays.map((day) => {
                const isToday = isSameCalendarDay(day, today);
                const dayEvents = events.filter((e) => isSameCalendarDay(e.date, day));
                return (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      "min-h-24 p-2 rounded-lg border transition-all cursor-pointer",
                      isToday
                        ? "bg-gradient-to-br from-violet-100 to-purple-100 border-violet-300"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-800",
                    )}
                  >
                    <div
                      className={cn(
                        CALENDAR.dayNum,
                        isToday ? "text-violet-700" : "text-gray-700 dark:text-gray-400",
                      )}
                    >
                      {day.getDate()}
                    </div>
                    <div className={CALENDAR.dayEvents}>
                      {dayEvents.slice(0, 3).map((e) => (
                        <span
                          key={e.id}
                          className="h-1.5 w-1.5 rounded-full bg-violet-500"
                          aria-label={e.title}
                          title={e.title}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[10px] text-muted">+{dayEvents.length - 3}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The upcoming panel — WH-23: the reference's empty form is the
            BARE empty list (probed: its body innerHTML is just
            `<div class="space-y-3"></div>` — no empty-state message on
            the events page, unlike Exercise/Goals/Reminders). */}
        <SectionCard title="Upcoming Events">
          {upcoming.length > 0 && (
            <ul className="space-y-3">
              {upcoming.map((e) => {
                const c = eventCategoryMeta(e.category);
                return (
                  <li
                    key={e.id}
                    className="flex flex-wrap items-start justify-between gap-2 rounded-lg border border-line bg-line-soft/50 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{e.title}</p>
                      <p className="text-xs text-muted">
                        {formatDateShort(e.date)}
                        {e.time ? ` · ${formatTimeString(e.time)}` : ""}
                      </p>
                      {e.location && (
                        <p className="text-xs text-muted inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" aria-hidden="true" /> {e.location}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <OptionChip label={c.label} tint={c.tint} text={c.text} />
                      <button
                        type="button"
                        className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-muted hover:bg-line-soft")}
                        onClick={() => openEdit(e)}
                        aria-label={`Edit ${e.title}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className={cn(BUTTON_CLASSES, "h-8 rounded-md px-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50")}
                        onClick={() => void remove(e)}
                        aria-label={`Delete ${e.title}`}
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
      </div>
      </div>
    </div>
  );
}
