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
 *  shadow-lg, rounded-md h-10 px-8). */
export function GradientButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button type="button" className={cn(GRADIENT_BUTTON, className)} {...props}>
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
 *  Your Journey / Upcoming Events panels). */
export function SectionCard({
  icon: Icon,
  title,
  action,
  children,
  bodyClassName,
}: {
  icon: LucideIcon;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  bodyClassName?: string;
}) {
  return (
    <section className={SECTION_CARD.card}>
      <div className={SECTION_CARD.header}>
        <Icon className="h-5 w-5 text-muted shrink-0" aria-hidden="true" />
        <h2 className={cn(SECTION_CARD.title, "flex-1")}>{title}</h2>
        {action}
      </div>
      <div className={cn(SECTION_CARD.body, bodyClassName)}>{children}</div>
    </section>
  );
}

/** The empty-state block (the reference's "No workouts logged yet…" family). */
export function EmptyState({
  icon: Icon,
  hint,
  title,
}: {
  icon: LucideIcon;
  hint?: string;
  title?: string;
}) {
  return (
    <div className={EMPTY_STATE.wrap}>
      <div className={EMPTY_STATE.icon} aria-hidden="true">
        <Icon className={EMPTY_STATE.iconGlyph} />
      </div>
      {title && <p className={EMPTY_STATE.title}>{title}</p>}
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
 *  bg-emerald-50 text-emerald-600 rounded-full px-2.5 py-0.5). */
export function OptionChip({
  label,
  icon,
  tint,
  text,
  className,
}: {
  label: string;
  icon?: string;
  tint: string;
  text: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tint,
        text,
        className,
      )}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </span>
  );
}
