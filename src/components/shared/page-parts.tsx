"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  PAGE_HEADER,
  SECTION_CARD,
  EMPTY_STATE,
  GRADIENT_BUTTON,
  GRADIENT_BUTTON_COMPACT,
} from "@/lib/page-layout";
import type { PageTheme } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

/** The wellness page header — the redesign's anatomy: the module's
 *  gradient H1 (text-4xl, clipped) + a gray-600 subtitle + right
 *  actions. The theme selects the header form: the four stacked pages
 *  (Dashboard/Routines/Learning/Profile) render the bare block — the
 *  H1 spans the full container width — while the seven action pages
 *  render the flex row (WH-15, probed on the redeployed reference). */
export function PageHeader({
  title,
  subtitle,
  actions,
  theme,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  theme: PageTheme;
}) {
  return (
    <div className={theme.stacked ? undefined : PAGE_HEADER.row}>
      <div>
        <h1 className={cn(PAGE_HEADER.title, theme.heading)}>{title}</h1>
        {subtitle && <p className={PAGE_HEADER.subtitle}>{subtitle}</p>}
      </div>
      {actions && <div className={PAGE_HEADER.actions}>{actions}</div>}
    </div>
  );
}

/** The primary gradient button (the reference's redesigned family —
 *  see page-layout.ts). WH-15: the `gradient` prop selects the COMPACT
 *  module form (h-9 px-4 py-2 + the module's pair); the bare form is
 *  the BIG brand pair (h-10 px-8, indigo/purple — Profile's save). The
 *  pairs are FIXED palette classes: the reference's own preset engine
 *  does not re-skin them (verified live), and neither does ours. */
export function GradientButton({
  children,
  gradient,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  gradient?: string;
}) {
  return (
    <button
      type="button"
      className={gradient ? cn(GRADIENT_BUTTON_COMPACT, gradient) : GRADIENT_BUTTON}
      {...props}
    >
      {children}
    </button>
  );
}

// WH-7: the outline-secondary button and the tinted stat-card component
// retired — zero JSX consumers across the tree (the dialogs render their
// cancel/submit pair from BUTTON_CLASSES + DIALOG_FOOTER families, and the
// stat pages inline their tiles through the STAT_CARD class constants for
// the authored per-tile tints the reference carries). The export-census pin
// owns this module's export surface.

/** A white section card with an optional icon + title header (the Recent
 *  Workouts / Your Journey / Upcoming Events panels). WH-9 (F-2b): the
 *  `bodyClassName` prop retired — zero call sites. WH-23: the header
 *  rides the reference's CardHeader/CardContent anatomy (probed on
 *  every list card — `flex flex-col space-y-1.5 p-6`, NO bottom border,
 *  the title `font-semibold leading-none tracking-tight`, the icon
 *  INSIDE the title row at `h-5 w-5` inheriting the card ink — the
 *  icon becomes OPTIONAL for the reference's per-card parity:
 *  Exercise/MentalHealth/Events ship the bare title, the Dashboard /
 *  Reminders / Goals cards carry theirs). The `<h2>` stays our a11y
 *  superset (the reference's titles are bare divs — our heading
 *  semantics is the documented deviation class). */
export function SectionCard({
  icon: Icon,
  title,
  action,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={SECTION_CARD.card}>
      <div className={SECTION_CARD.header}>
        <div className={cn(SECTION_CARD.title, Icon && SECTION_CARD.titleRow)}>
          {Icon && <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />}
          <h2 className="flex-1">{title}</h2>
          {action}
        </div>
      </div>
      <div className={SECTION_CARD.body}>{children}</div>
    </section>
  );
}

/** The empty-state block — the reference's bare centered paragraph
 *  (probed WH-23: the module empty states carry NO icon chip; the full
 *  body innerHTML is the single `<p>`). WH-9 (F-2b) retired the
 *  `title` prop; WH-23 retired the `icon` prop with the chip. The
 *  dashboard's py-8 form + the StudyResources special card ride the
 *  EMPTY_STATE record's other members at their call sites. */
export function EmptyState({ hint }: { hint?: string }) {
  return <p className={EMPTY_STATE.p}>{hint}</p>;
}

/** The loading face — a centered pulse (pages render it until their first
 *  fetch resolves; the reference's own Loading activities… convention). */
export function LoadingBlock({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-12 text-sm text-muted" role="status">
      <span className="animate-pulse">{label}</span>
    </div>
  );
}

/** The chip pair every option vocabulary renders (the WH-17 re-capture:
 *  the reference's post-redesign Badge anatomy — rounded-md (6px), the 1px
 *  transparent border, font-semibold — with the bg-*-100/text-*-700 pairs,
 *  probed live 2026-10-30: every rendered pair passes WCAG AA, where the
 *  stale rounded-full font-medium -50/-600 form failed on every surface.
 *  The verified maps live in constants.ts; the WH-17 chip-vocabulary
 *  census in tests/src-census.test.ts pins the system. WH-9 (F-2b):
 *  the `className` prop retired — zero call sites (studyresources's icon
 *  chip is the only live `icon` consumer; none styles the span).
 *
 *  WH-29 (F-B/F-C): the reference's chips are the stock shadcn Badge —
 *  a DIV, not a span (the sr-chip lesson: an element-tag vocabulary
 *  hides behind identical visual faces) — and it carries TWO variants
 *  per chip ROLE, decoded live on its Learning card: the category chip
 *  the SECONDARY family (below) and the difficulty chip the OUTLINE
 *  family (a plain VISIBLE border, no border-transparent, no shadow,
 *  no hover arm, no bg — 12 instances). The variant prop owns the
 *  split; the tint/text classes compose after either base exactly as
 *  the reference's variants do. */
const SOLID_BASE =
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80";
const OUTLINE_BASE =
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground";

export function OptionChip({
  label,
  icon,
  tint,
  text,
  variant = "solid",
}: {
  label: string;
  icon?: string;
  tint: string;
  text: string;
  /** "solid" (default — the secondary Badge family: the category chips,
   *  the routines easy/moderate difficulty chips) | "outline" (the
   *  outline Badge family — the Learning difficulty chips). */
  variant?: "solid" | "outline";
}) {
  return (
    <div
      className={cn(
        variant === "outline" ? OUTLINE_BASE : SOLID_BASE,
        tint,
        text,
      )}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </div>
  );
}
