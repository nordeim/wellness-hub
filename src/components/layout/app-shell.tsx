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
  APP_FOOTER,
  MOBILE_HEADER,
  SHELL_LAYOUT,
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
        {/* Desktop sidebar — in-flow flex child, visible from md. */}
        <aside className={SHELL_LAYOUT.sidebar}>
          <BrandMark />
          <div className="min-h-0 flex-1 flex flex-col">
            <SidebarNav />
            <SidebarFooter />
          </div>
        </aside>

        {/* Mobile sheet (< md) — the drawer. */}
        <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />

        {/* Main column: the phone glass header + the main scroller. The
            pages own their padding + wash (PAGE_THEMES.<module>.root); the
            footer follows the page children inside main (the chassis
            placement). */}
        <div className={SHELL_LAYOUT.mainColumn}>
          <header className={MOBILE_HEADER.bar}>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Toggle Sidebar"
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-nav-sheet"
                className={MOBILE_HEADER.trigger}
              >
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Open navigation</span>
              </button>
            </DialogTrigger>
            <span className={MOBILE_HEADER.title}>{APP_NAME}</span>
            <span aria-hidden="true" className="w-10" />
          </header>
          {/* WH-16 (F-2): suppressHydrationWarning — applyTheme's
              bgImageUrl branch materializes a client-only style attribute
              on this element pre-hydration when a background image is
              persisted (the F-1 write class one element down); the
              element-scoped canonical cure, children unaffected. */}
          <main suppressHydrationWarning className={SHELL_LAYOUT.main}>
            {children}
            <footer className={APP_FOOTER.footer}>
              <span>{APP_FOOTER.copyright}</span>
              <span className={APP_FOOTER.link}>{APP_FOOTER.note}</span>
            </footer>
          </main>
        </div>
      </div>
    </Dialog>
  );
}
