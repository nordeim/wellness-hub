"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { PAGE_HEADER, SECTION_CARD, EMPTY_STATE, GRADIENT_BUTTON } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

/** The wellness page header — the gradient H1 + subtitle + right actions
 *  (the reference's anatomy on every page). */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className={PAGE_HEADER.row}>
      <div>
        <h1 className={PAGE_HEADER.title}>{title}</h1>
        {subtitle && <p className={PAGE_HEADER.subtitle}>{subtitle}</p>}
      </div>
      {actions && <div className={PAGE_HEADER.actions}>{actions}</div>}
    </div>
  );
}

/** The primary gradient button (the reference's own: indigo→purple,
 *  shadow-lg, rounded-md h-10 px-8). WH-12 (F-1): the `className` param
 *  retired — zero pass sites across all 17 call sites in 9 files (every
 *  site passes onClick/disabled + children; the pass-site census owns
 *  the class — the OptionChip.className precedent, same file). */
export function GradientButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button type="button" className={GRADIENT_BUTTON} {...props}>
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

/** A white section card with an icon + title header (the Recent Workouts /
 *  Your Journey / Upcoming Events panels). WH-9 (F-2b): the `bodyClassName`
 *  prop retired — zero call sites (every live SectionCard passes the bare
 *  body constant); the component-prop census owns this surface. */
export function SectionCard({
  icon: Icon,
  title,
  action,
  children,
}: {
  icon: LucideIcon;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={SECTION_CARD.card}>
      <div className={SECTION_CARD.header}>
        <Icon className="h-5 w-5 text-muted shrink-0" aria-hidden="true" />
        <h2 className={cn(SECTION_CARD.title, "flex-1")}>{title}</h2>
        {action}
      </div>
      <div className={SECTION_CARD.body}>{children}</div>
    </section>
  );
}

/** The empty-state block (the reference's "No workouts logged yet…" family).
 *  WH-9 (F-2b): the `title` prop retired — every live call site passes
 *  icon + hint only; the constant's title face went with it. */
export function EmptyState({
  icon: Icon,
  hint,
}: {
  icon: LucideIcon;
  hint?: string;
}) {
  return (
    <div className={EMPTY_STATE.wrap}>
      <div className={EMPTY_STATE.icon} aria-hidden="true">
        <Icon className={EMPTY_STATE.iconGlyph} />
      </div>
      {hint && <p className={EMPTY_STATE.hint}>{hint}</p>}
    </div>
  );
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

/** The chip pair every option vocabulary renders (the tinted pill:
 *  bg-emerald-50 text-emerald-600 rounded-full px-2.5 py-0.5). WH-9 (F-2b):
 *  the `className` prop retired — zero call sites (studyresources's icon
 *  chip is the only live `icon` consumer; none styles the span). */
export function OptionChip({
  label,
  icon,
  tint,
  text,
}: {
  label: string;
  icon?: string;
  tint: string;
  text: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tint,
        text,
      )}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </span>
  );
}
