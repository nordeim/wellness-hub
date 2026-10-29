"use client";

// The mobile drawer — a left-anchored Radix Sheet (the chassis's proven
// construction: the reference's own mobile-nav fix, re-skinned to the
// light sidebar family).
//
// Tailwind v4 pitfalls deliberately avoided (the vendored tw-animate.css
// powers the data-[state] animate family):
//  - No `hidden` attribute fighting display utilities (v4: `hidden` WINS).
//  - The sheet is portal'd to body level — long lists are never clipped
//    by an ancestor.
//  - z-index stays on the flat scale (the sheet z-50, below toasts 100).
//
// React 19 / Radix semantics:
//  - Radix's FocusScope traps + wraps Tab, focuses the Close button on
//    open, and restores focus to the trigger on close.
//  - Escape + scrim-click close (DismissableLayer + the overlay click).
//  - Body scroll lock rides react-remove-scroll.
//
// OUR kept behavioral supersets (invisible to pixels, e2e-pinned):
//  - Auto-close when the viewport grows past md (the pinned regression:
//    resizing past 768px with the drawer open used to leave both scroll
//    locks engaged under the md:hidden drawer).
//  - The MAIN-scroller lock: `main` owns scrolling in the shell model,
//    so the lock clamps it too (body alone never covered it).
//  - The route-change close (AppShell's adjust-during-render).

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Sparkles, X } from "lucide-react";
import {
  NAV_ITEMS,
  NAV_FOOTER_ITEMS,
  isNavActive,
  type NavItem,
} from "./nav-config";
import { DialogOverlay } from "@/components/ui/dialog";
import { MOBILE_NAV_LAYOUT, MOBILE_NAV_SHEET, NAV_LAYOUT } from "@/lib/page-layout";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  // Auto-close when the viewport grows past the mobile breakpoint. The
  // query MUST match the trigger's `md:hidden` range (768px).
  React.useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia(MOBILE_NAV_LAYOUT.autoCloseQuery);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) onOpenChange(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open, onOpenChange]);

  // The MAIN-scroller lock (kept superset): Radix locks body via
  // react-remove-scroll, but `main` is the shell's ONLY scroller — body
  // alone never covered it.
  React.useEffect(() => {
    if (!open) return;
    const scroller = document.querySelector<HTMLElement>("main");
    const prevScrollerOverflow = scroller?.style.overflow ?? "";
    if (scroller) scroller.style.overflow = "hidden";
    return () => {
      if (scroller) scroller.style.overflow = prevScrollerOverflow;
    };
  }, [open]);

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content className={MOBILE_NAV_SHEET.content}>
        <DialogPrimitive.Close className={DIALOG_CLOSE_CLASS}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <div className={MOBILE_NAV_SHEET.header}>
          <DialogPrimitive.Title className="flex items-center gap-2">
            <span className={NAV_LAYOUT.brandBadge} aria-hidden="true">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className={MOBILE_NAV_SHEET.title}>{APP_NAME}</span>
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className={MOBILE_NAV_SHEET.description}>
            {APP_TAGLINE}
          </DialogPrimitive.Description>
        </div>
        <DrawerNav onNavigate={() => onOpenChange(false)} />
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

const DIALOG_CLOSE_CLASS =
  "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none";

/** The drawer's nav — the full set + the Profile & Settings footer card
 *  (the reference's own footer anatomy: the circular badge, the bold
 *  title, the "Customize your experience" subtitle). */
function DrawerNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const renderLink = (item: NavItem, active: boolean) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        active ? MOBILE_NAV_SHEET.linkActive : MOBILE_NAV_SHEET.link,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <item.icon className={cn(MOBILE_NAV_SHEET.icon, "shrink-0")} strokeWidth={2} />
      <span className="truncate">{item.label}</span>
    </Link>
  );

  return (
    <>
      <nav aria-label="Main navigation" className={MOBILE_NAV_SHEET.nav}>
        {NAV_ITEMS.map((item) => renderLink(item, isNavActive(pathname, item.href)))}
      </nav>
      <nav aria-label="Profile and settings" className={MOBILE_NAV_SHEET.navFooter}>
        {NAV_FOOTER_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                MOBILE_NAV_SHEET.footerLink,
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <span className={MOBILE_NAV_SHEET.footerAvatar} aria-hidden="true">
                <item.icon className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className={MOBILE_NAV_SHEET.footerTitle}>{item.label}</span>
                <span className={MOBILE_NAV_SHEET.footerSubtitle}>
                  Customize your experience
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
