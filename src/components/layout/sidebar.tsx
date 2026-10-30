"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { NAV_ITEMS, NAV_FOOTER_ITEMS, isNavActive } from "./nav-config";
import { NAV_LAYOUT } from "@/lib/page-layout";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * The desktop sidebar's navigation list. WH-9 (F-4): the "rendered
 * inside BOTH the desktop sidebar and the mobile drawer" narration
 * retired — the drawer has carried its own sheet-styled nav
 * (mobile-nav.tsx's DrawerNav) since the build; this list renders in
 * the desktop sidebar only, and the `onNavigate` prop that served the
 * phantom sharing went with it (zero call sites — app-shell renders
 * both exports bare). The component-prop census owns this surface.
 */
export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => isNavActive(pathname, href);

  const renderLink = (item: (typeof NAV_ITEMS)[number], active: boolean) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        active ? NAV_LAYOUT.linkActive : NAV_LAYOUT.link,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <item.icon className={cn(NAV_LAYOUT.icon, "shrink-0")} strokeWidth={2} />
      <span className={cn(NAV_LAYOUT.label, "truncate")}>{item.label}</span>
    </Link>
  );

  return (
    <nav aria-label="Main navigation" className={NAV_LAYOUT.container}>
      <div className={NAV_LAYOUT.group}>
        {NAV_ITEMS.map((item) => renderLink(item, isActive(item.href)))}
      </div>
    </nav>
  );
}

/** The footer link — the reference's "Profile & Settings / Customize your
 *  experience" card, pinned to the sidebar bottom behind a divider. WH-9
 *  (F-2c): the `onNavigate` prop retired with SidebarNav's (zero call
 *  sites — app-shell renders this bare). */
export function SidebarFooter() {
  const pathname = usePathname();
  return (
    <div className={NAV_LAYOUT.footerGroup}>
      {NAV_FOOTER_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              active ? NAV_LAYOUT.linkActive : NAV_LAYOUT.footerLink,
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <item.icon className={cn(NAV_LAYOUT.icon, "shrink-0")} strokeWidth={2} />
            <span className="flex flex-col">
              <span className="text-sm font-medium leading-tight">{item.label}</span>
              <span className="text-xs text-muted">Customize your experience</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/** Brand mark — the gradient badge + the clipped-gradient wordmark
 *  (live-probed: `font-bold text-lg bg-clip-text text-transparent` over
 *  linear-gradient(135deg, #6366f1, #a855f7)) and the tagline. */
export function BrandMark() {
  return (
    <div className={NAV_LAYOUT.brand}>
      <div className={NAV_LAYOUT.brandBadge} aria-hidden="true">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className={NAV_LAYOUT.brandWordmark}>{APP_NAME}</span>
        <span className={NAV_LAYOUT.brandSubtitle}>{APP_TAGLINE}</span>
      </div>
    </div>
  );
}
