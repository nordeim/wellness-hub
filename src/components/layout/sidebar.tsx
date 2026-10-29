"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { NAV_ITEMS, NAV_FOOTER_ITEMS, isNavActive } from "./nav-config";
import { NAV_LAYOUT } from "@/lib/page-layout";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Shared navigation list — rendered inside BOTH the desktop sidebar and
 * the mobile drawer so the two stay in lockstep (the chassis doctrine).
 */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => isNavActive(pathname, href);

  const renderLink = (item: (typeof NAV_ITEMS)[number], active: boolean) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={onNavigate}
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
 *  experience" card, pinned to the sidebar bottom behind a divider. */
export function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className={NAV_LAYOUT.footerGroup}>
      {NAV_FOOTER_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              active ? NAV_LAYOUT.linkActive : NAV_LAYOUT.footerLink,
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <item.icon className={cn(NAV_LAYOUT.icon, "shrink-0")} strokeWidth={2} />
            <span className="flex flex-col">
              <span className="text-sm font-medium leading-tight">{item.label}</span>
              <span className="text-xs text-subtle">Customize your experience</span>
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
