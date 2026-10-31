"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon } from "lucide-react";
import { BrandMark, SidebarNav, SidebarFooter } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useWellnessStore } from "@/stores/wellness-store";
import { syncPrefsFromServer } from "@/stores/theme-store";
import {
  MOBILE_HEADER,
  SHELL_LAYOUT,
  SIDEBAR_HEADER,
} from "@/lib/page-layout";
import { APP_NAME } from "@/lib/constants";

/**
 * App chrome — the reference's model: a `min-h-screen` row holds the
 * LIGHT sidebar as an in-flow flex child (visible from `md`) and a main
 * column whose `main` owns scrolling. On phones (< md) the chrome is the
 * reference's own sticky glass header (`bg-white/60 backdrop-blur-xl
 * border-b border-gray-100`) with the drawer trigger — no desktop topbar
 * exists (the reference's sidebar carries the whole nav).
 *
 * WH-4 (F-1): the `user` prop retired — the shell renders no user chip
 * (the reference carries none); the store's `hydrate()` owns the session
 * bootstrap, and the (app) layout's guard owns the auth decision.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const hydrate = useWellnessStore((s) => s.hydrate);

  // Close the sheet on navigation — adjust-during-render for this
  // component's OWN state (the sanctioned React pattern; browser
  // back/forward navigations with the sheet open included).
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileNavOpen) setMobileNavOpen(false);
  }

  // One-time bootstrap of the client store from the session cookie, plus
  // the cross-device prefs pull (the theme superset's boot seam).
  React.useEffect(() => {
    void hydrate();
    void syncPrefsFromServer();
  }, [hydrate]);

  return (
    // The Radix Dialog Root (no DOM) wraps the whole shell so the glass
    // header's DialogTrigger and the portal'd sheet share the
    // AppShell-owned controlled open state.
    <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
      <div className={SHELL_LAYOUT.root}>
        {/* Desktop sidebar — in-flow flex child, visible from md. WH-30:
            the reference's three-zone structure — the brand header zone
            (border-b), the nav zone (its own flex-1 scroll container) and
            the footer zone (border-t, the ProfileCard). */}
        <aside className={SHELL_LAYOUT.sidebar}>
          <div className={SIDEBAR_HEADER.zone}>
            <BrandMark />
          </div>
          <SidebarNav />
          <SidebarFooter />
        </aside>

        {/* Mobile sheet (< md) — the drawer. */}
        <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />

        {/* Main column: the phone glass header + the main scroller. The
            pages own their padding + wash (PAGE_THEMES.<module>.root) —
            and the page children are the LAST thing in main (WH-30: the
            chassis © footer retired; the reference's pages simply end). */}
        <div className={SHELL_LAYOUT.mainColumn}>
          {/* WH-30 (F-1): the header's INTERIOR decoded live at 390px — the
              reference wraps (trigger + title) in a `flex items-center
              gap-4` LEFT CLUSTER (the title's left edge at x=68); the bar
              carries no flex utilities of its own and no right-side
              element exists (our w-10 spacer + justify-between retired
              with this round). */}
          <header className={MOBILE_HEADER.bar}>
            <div className={MOBILE_HEADER.interior}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label="Toggle Sidebar"
                  aria-expanded={mobileNavOpen}
                  aria-controls="mobile-nav-sheet"
                  className={MOBILE_HEADER.trigger}
                >
                  <MenuIcon className={MOBILE_HEADER.triggerIcon} />
                </button>
              </DialogTrigger>
              {/* WH-28 (F-4): the reference's own element vocabulary — its
                  mobile glass-header title is an <h1> (hidden at desktop,
                  shown at mobile — two visible h1s there, its own
                  semantics; ours was a span). The classes ride
                  MOBILE_HEADER.title unchanged. */}
              <h1 className={MOBILE_HEADER.title}>{APP_NAME}</h1>
            </div>
          </header>
          {/* WH-16 (F-2): suppressHydrationWarning — applyTheme's
              bgImageUrl branch materializes a client-only style attribute
              on this element pre-hydration when a background image is
              persisted (the F-1 write class one element down); the
              element-scoped canonical cure, children unaffected. */}
          <main suppressHydrationWarning className={SHELL_LAYOUT.main}>
            {children}
          </main>
        </div>
      </div>
    </Dialog>
  );
}
