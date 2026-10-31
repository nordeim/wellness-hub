"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, User } from "lucide-react";
import { NAV_ITEMS, NAV_FOOTER_ITEMS, isNavActive } from "./nav-config";
import {
  NAV_LAYOUT,
  PROFILE_CARD,
  SIDEBAR_FOOTER_ZONE,
  SIDEBAR_NAV_ZONE,
} from "@/lib/page-layout";
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
 *
 * WH-30 (F-2): the reference's three-zone structure — this component
 * renders the NAV ZONE (`flex min-h-0 flex-1 flex-col gap-2
 * overflow-auto p-3`, the reference's own scroll container) wrapping
 * the link list at its UL form (`flex w-full min-w-0 flex-col gap-1
 * space-y-1`).
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
    <div className={SIDEBAR_NAV_ZONE}>
      <nav aria-label="Main navigation" className={NAV_LAYOUT.list}>
        {NAV_ITEMS.map((item) => renderLink(item, isActive(item.href)))}
      </nav>
    </div>
  );
}

/** WH-30 (F-3): the sidebar's footer ZONE — the reference's
 * `flex flex-col gap-2 border-t border-gray-100 p-4` container carrying
 * the shared ProfileCard (the avatar-card anatomy it renders at BOTH
 * footer sites). WH-9 (F-2c): the `onNavigate` prop retired with
 * SidebarNav's (zero call sites — app-shell renders this bare). */
export function SidebarFooter() {
  return (
    <div className={SIDEBAR_FOOTER_ZONE}>
      <ProfileCard />
    </div>
  );
}

/** WH-30 (F-3): the Profile & Settings card — the reference's
 * avatar-card anatomy, decoded live at BOTH of its footer sites (the
 * desktop sidebar footer AND the drawer's footer zone — the same
 * shadcn Sidebar component renders both): the bare `a` wrapper, the
 * `flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50` card row,
 * the 40px gradient-circle avatar with the white lucide User at 20px,
 * and the truncate title/subtitle pair. Ours shipped a bare lucide
 * icon + texts on desktop and a 36px-circle row in the drawer — three
 * faces across two apps and two sites. The aria-current + the focus
 * ring stay our a11y superset. */
export function ProfileCard({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = NAV_FOOTER_ITEMS.some((item) => isNavActive(pathname, item.href));
  return (
    <Link
      href="/Profile"
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className={PROFILE_CARD.card}>
        <div className={PROFILE_CARD.avatar} aria-hidden="true">
          <User className={PROFILE_CARD.avatarIcon} />
        </div>
        <div className={PROFILE_CARD.body}>
          <p className={PROFILE_CARD.title}>Profile &amp; Settings</p>
          <p className={PROFILE_CARD.subtitle}>Customize your experience</p>
        </div>
      </div>
    </Link>
  );
}

/** Brand mark — the gradient badge + the clipped-gradient wordmark
 *  (live-probed: `font-bold text-lg bg-clip-text text-transparent` over
 *  linear-gradient(135deg, #6366f1, #a855f7)) and the tagline. WH-30:
 *  the row is consumed inside SIDEBAR_HEADER.zone (the reference's
 *  border-b header container — app-shell owns the zone wrapper). */
export function BrandMark() {
  return (
    <div className={NAV_LAYOUT.brand}>
      <div className={NAV_LAYOUT.brandBadge} aria-hidden="true">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        {/* WH-28 (F-4): the reference's own element vocabulary — its
            sidebar wordmark is an <h2> (probed live; ours was a span —
            the tag layer is the sr-chip lesson applied to the shell).
            The classes ride NAV_LAYOUT.brandWordmark unchanged. */}
        <h2 className={NAV_LAYOUT.brandWordmark}>{APP_NAME}</h2>
        <span className={NAV_LAYOUT.brandSubtitle}>{APP_TAGLINE}</span>
      </div>
    </div>
  );
}
