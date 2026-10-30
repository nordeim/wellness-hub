"use client";

// Theme store — the Appearance tab's live engine.
//
// The reference applies its theme client-side (its presets live in the
// Profile page; nothing persists server-side). Our superset: the store
// writes the token overrides onto <html> (Tailwind v4 utilities compile
// to var(--color-…) references, so one write re-skins every gradient,
// button and active state), persists to localStorage for instant boot,
// AND mirrors to /api/prefs for cross-device sync.
//
// Mode handling: "auto" resolves through matchMedia(prefers-color-scheme)
// and flips the .dark class live (the listener stays attached).

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeMode = "light" | "dark" | "auto";

interface ThemeState {
  themeMode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  bgImageUrl: string | null;
  sidebarStyle: "gradient" | "solid" | "minimal";
  cardStyle: "elevated" | "flat" | "outline";
  animationLevel: "full" | "subtle" | "none";
  notificationsEnabled: boolean;
  weeklyReminders: boolean;
  // actions (WH-9 F-3: the `reset` action retired — zero call sites; the
  // reference's Appearance tab carries no reset surface, live-verified)
  setTheme: (patch: Partial<Omit<ThemeState, "setTheme">>) => void;
}

const FONT_STACKS: Record<string, string> = {
  system:
    'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  inter: "Inter, ui-sans-serif, system-ui, sans-serif",
  poppins: "Poppins, ui-sans-serif, system-ui, sans-serif",
  roboto: "Roboto, ui-sans-serif, system-ui, sans-serif",
  lora: "Lora, Georgia, ui-serif, serif",
};

function shade(hex: string, factor: number): string {
  // factor < 1 darkens, > 1 lightens — the derived hover pair.
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(((n >> 16) & 0xff) * factor);
  const g = clamp(((n >> 8) & 0xff) * factor);
  const b = clamp((n & 0xff) * factor);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

type ThemeData = Omit<ThemeState, "setTheme">;
// WH-9 (F-3): the dead `reset` member retired with the Omit entry that
// named it — the theme-store member census owns this surface.

function applyTheme(s: ThemeData) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--color-primary", s.primaryColor);
  root.style.setProperty("--color-secondary", s.secondaryColor);
  root.style.setProperty("--color-primary-hover", shade(s.primaryColor, 0.88));
  root.style.setProperty("--color-secondary-hover", shade(s.secondaryColor, 0.88));
  // WH-14: the --color-sidebar-accent-foreground write retired with its
  // token — written on every preset apply since the build, read by no
  // utility or var() (the token-liveness census owns this surface).
  root.style.setProperty(
    "--font-sans",
    FONT_STACKS[s.fontFamily] ?? FONT_STACKS.system,
  );

  // Dark mode: auto resolves through the media query.
  const dark =
    s.themeMode === "dark" ||
    (s.themeMode === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", dark);

  // Card style: elevated = shadow-lg (the reference default); flat = soft
  // tint; outline = bordered.
  root.dataset.cardStyle = s.cardStyle;
  // Animation level rides a data attr consumed by a small CSS gate.
  root.dataset.animation = s.animationLevel;
  // Background image: the main scroll area's optional wash.
  root.dataset.sidebarStyle = s.sidebarStyle;
  const main = document.querySelector("main");
  if (main) {
    if (s.bgImageUrl) {
      main.style.backgroundImage = `url(${s.bgImageUrl})`;
      main.style.backgroundSize = "cover";
      main.style.backgroundAttachment = "fixed";
    } else {
      main.style.backgroundImage = "";
      main.style.backgroundSize = "";
      main.style.backgroundAttachment = "";
    }
  }
}

const DEFAULTS: ThemeData = {
  themeMode: "light" as ThemeMode,
  primaryColor: "#6366f1",
  secondaryColor: "#a855f7",
  fontFamily: "system",
  bgImageUrl: null as string | null,
  sidebarStyle: "gradient" as const,
  cardStyle: "elevated" as const,
  animationLevel: "full" as const,
  notificationsEnabled: true,
  weeklyReminders: true,
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setTheme: (patch) => {
        set(patch);
        applyTheme({ ...useThemeStore.getState(), ...patch });
        // Fire-and-forget server sync (the cross-device superset — a
        // 401 silently no-ops; the local state already applied).
        void fetch("/api/prefs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        }).catch(() => null);
      },
      // WH-9 (F-3): the `reset` action retired — zero call sites (the
      // Profile page consumes every field + setTheme; the reference's
      // Appearance tab carries no reset surface).
    }),
    {
      name: "wellness-theme",
      partialize: (s) => ({
        themeMode: s.themeMode,
        primaryColor: s.primaryColor,
        secondaryColor: s.secondaryColor,
        fontFamily: s.fontFamily,
        bgImageUrl: s.bgImageUrl,
        sidebarStyle: s.sidebarStyle,
        cardStyle: s.cardStyle,
        animationLevel: s.animationLevel,
        notificationsEnabled: s.notificationsEnabled,
        weeklyReminders: s.weeklyReminders,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state);
      },
    },
  ),
);

/** Pull the server-synced prefs once at boot (session start) — a device
 *  without localStorage picks its saved theme up; a device with local
 *  state keeps the local wins (last-write-wins sync). */
export async function syncPrefsFromServer() {
  try {
    const res = await fetch("/api/prefs");
    const body = await res.json();
    if (!res.ok || body.ok === false) return;
    const local = useThemeStore.getState();
    const server = body.data as Partial<ThemeState> | null;
    if (server) {
      const localTouched = local.primaryColor !== DEFAULTS.primaryColor;
      if (!localTouched) {
        const patch: Partial<ThemeState> = {
          themeMode: server.themeMode ?? local.themeMode,
          primaryColor: server.primaryColor ?? local.primaryColor,
          secondaryColor: server.secondaryColor ?? local.secondaryColor,
          fontFamily: server.fontFamily ?? local.fontFamily,
          bgImageUrl: server.bgImageUrl ?? local.bgImageUrl,
          sidebarStyle: server.sidebarStyle ?? local.sidebarStyle,
          cardStyle: server.cardStyle ?? local.cardStyle,
          animationLevel: server.animationLevel ?? local.animationLevel,
          notificationsEnabled: server.notificationsEnabled ?? local.notificationsEnabled,
          weeklyReminders: server.weeklyReminders ?? local.weeklyReminders,
        };
        useThemeStore.setState(patch);
        applyTheme({ ...local, ...patch });
      }
    }
  } catch {
    /* offline boot keeps local defaults */
  }
}
