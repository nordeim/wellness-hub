"use client";

// ThemeBoot (WH-18, F-3): the login-surface theme mount. The theme store
// only loaded inside the (app) route group (AppShell + the Profile page)
// — /login, /signup and /reset-password never ran it, so the .dark class
// and the preset custom properties never applied on the app's root face
// (live-verified: the class vanished on /login mid-walk, and the
// LOGIN_LAYOUT's authored dark vocabulary could only ever fire on the OS
// preference — the wrong trigger).
//
// The mechanism: importing the store module is the whole point — the
// zustand persist middleware rehydrates SYNCHRONOUSLY from localStorage
// at module init and its onRehydrateStorage hook applies the theme (the
// .dark class, the preset vars, the font stack, the data attrs) — the
// same pre-hydration write class WH-16 suppressed on <html>/<main>
// (suppressHydrationWarning, pinned by the hydration-suppression census;
// no new suppression needed). On the server the storage getter returns
// undefined and applyTheme guards on typeof document — the module is
// SSR-safe. Renders nothing.
//
// Pinned by tests/src-census.test.ts (the ThemeBoot mount census) and
// tests/e2e/a11y.spec.ts (the dark login — the seeded persisted state
// must apply on /login and pass the net).

import "@/stores/theme-store";

export function ThemeBoot() {
  return null;
}
