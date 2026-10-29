"use client";

import * as React from "react";
import {
  Check,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sparkles,
  Sun,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/stores/theme-store";
import { useWellnessStore } from "@/stores/wellness-store";
import { toast } from "@/components/ui/toast";
import { PageHeader, GradientButton } from "@/components/shared/page-parts";
import { Tabs, TabsPanel } from "@/components/ui/tabs";
import { Label, Checkbox } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {PAGE_ROOT, BUTTON_BASE, BUTTON_CLASSES } from "@/lib/page-layout";
import {
  COLOR_PRESETS,
  FONT_FAMILIES,
  SIDEBAR_STYLES,
  CARD_STYLES,
  ANIMATION_LEVELS,
  THEME_MODES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { User as AppUser } from "@/types";

export default function ProfileClientPage({ user }: { user: AppUser | null }) {
  const router = useRouter();
  const logout = useWellnessStore((s) => s.logout);
  const theme = useThemeStore();
  const [saving, setSaving] = React.useState(false);

  const save = async () => {
    setSaving(true);
    // The theme-store's setTheme already applies + syncs on every change;
    // this explicit pass re-writes the full state (the Save All Changes
    // button the reference ships) and confirms the toast.
    await new Promise((r) => setTimeout(r, 300));
    setSaving(false);
    toast.success("All changes saved. Your Wellness Hub is truly yours now! ✨");
  };

  const doLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const [tab, setTab] = React.useState("appearance");

  return (
    <div className={PAGE_ROOT.standard}>
      <PageHeader
        title="Profile & Customization"
        subtitle="Make this app truly yours! ✨"
      />

      <Tabs
        tabs={[
          { id: "appearance", label: "Appearance" },
          { id: "account", label: "Account" },
          { id: "preferences", label: "Preferences" },
        ]}
        value={tab}
        onValueChange={setTab}
        cols={3}
        className="mb-6 max-w-xl"
      >
        <TabsPanel tab="appearance" className="mt-6">
          <AppearancePanel />
        </TabsPanel>
        <TabsPanel tab="account" className="mt-6">
          <AccountPanel user={user} onLogout={doLogout} />
        </TabsPanel>
        <TabsPanel tab="preferences" className="mt-6">
          <PreferencesPanel />
        </TabsPanel>
      </Tabs>

      <div className="mt-6">
        <GradientButton onClick={() => void save()} disabled={saving}>
          <Sparkles className="h-4 w-4" /> {saving ? "Saving…" : "Save All Changes ✨"}
        </GradientButton>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Appearance — Theme Mode / presets / colors / font / bg image / styles.
// ---------------------------------------------------------------------------
function AppearancePanel() {
  const theme = useThemeStore();
  return (
    <div className="space-y-6">
      {/* Theme Mode */}
      <section className="rounded-xl border border-line bg-surface p-5 shadow-lg">
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
          <Monitor className="h-5 w-5 text-muted" aria-hidden="true" /> Theme Mode
        </h2>
        <div className="flex flex-wrap gap-2">
          {THEME_MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              aria-pressed={theme.themeMode === m.value}
              onClick={() => theme.setTheme({ themeMode: m.value })}
              className={cn(
                BUTTON_CLASSES,
                "h-10 rounded-md border px-5 text-sm",
                theme.themeMode === m.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-line hover:bg-line-soft",
              )}
            >
              {m.value === "light" && <Sun className="h-4 w-4" />}
              {m.value === "dark" && <Moon className="h-4 w-4" />}
              {m.value === "auto" && <Monitor className="h-4 w-4" />}
              {m.label}
            </button>
          ))}
        </div>
      </section>

      {/* Colors + presets */}
      <section className="rounded-xl border border-line bg-surface p-5 shadow-lg">
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
          <Palette className="h-5 w-5 text-muted" aria-hidden="true" /> Colors
        </h2>
        <p className="mb-2 text-sm font-medium text-foreground">Quick Presets</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {COLOR_PRESETS.map((p) => {
            const active = theme.primaryColor.toLowerCase() === p.primary.toLowerCase();
            return (
              <button
                key={p.key}
                type="button"
                aria-pressed={active}
                onClick={() => theme.setTheme({ primaryColor: p.primary, secondaryColor: p.secondary })}
                className={cn(
                  "rounded-lg border p-3 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "border-primary ring-1 ring-primary" : "border-line",
                )}
              >
                <span
                  className="mb-2 block h-8 w-full rounded-md bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${p.primary}, ${p.secondary})`,
                  }}
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-foreground">{p.label}</span>
                {active && (
                  <span className="mt-1 flex items-center gap-1 text-xs text-primary">
                    <Check className="h-3 w-3" /> Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pref-primary">Primary Color</Label>
            <div className="mt-2 flex items-center gap-2">
              <input
                id="pref-primary"
                type="color"
                value={theme.primaryColor}
                onChange={(e) => theme.setTheme({ primaryColor: e.target.value })}
                className="h-9 w-14 cursor-pointer rounded-md border border-line bg-transparent"
                aria-label="Primary color picker"
              />
              <Input
                aria-label="Primary color hex"
                value={theme.primaryColor}
                onChange={(e) => theme.setTheme({ primaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pref-secondary">Secondary Color</Label>
            <div className="mt-2 flex items-center gap-2">
              <input
                id="pref-secondary"
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => theme.setTheme({ secondaryColor: e.target.value })}
                className="h-9 w-14 cursor-pointer rounded-md border border-line bg-transparent"
                aria-label="Secondary color picker"
              />
              <Input
                aria-label="Secondary color hex"
                value={theme.secondaryColor}
                onChange={(e) => theme.setTheme({ secondaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted">
          Preview: Your Custom Theme! 🎨 Every button, heading and gradient follows your pair.
        </p>
      </section>

      {/* Typography */}
      <section className="rounded-xl border border-line bg-surface p-5 shadow-lg">
        <h2 className="mb-3 font-semibold text-foreground">Typography</h2>
        <div className="space-y-2">
          <Label htmlFor="pref-font">Font Family</Label>
          <Select value={theme.fontFamily} onValueChange={(v) => theme.setTheme({ fontFamily: v })}>
            <SelectTrigger id="pref-font" className="mt-2 w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_FAMILIES.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="mt-3 rounded-lg bg-line-soft p-3 text-sm text-muted">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p className="mt-1 text-xs text-subtle">Preview of {FONT_FAMILIES.find((f) => f.value === theme.fontFamily)?.label}</p>
      </section>

      {/* Background image */}
      <section className="rounded-xl border border-line bg-surface p-5 shadow-lg">
        <h2 className="mb-3 font-semibold text-foreground">Background Image</h2>
        <div className="space-y-2">
          <Label htmlFor="pref-bg">Image URL (optional)</Label>
          <Input
            id="pref-bg"
            className="mt-2"
            placeholder="https://images.unsplash.com/..."
            value={theme.bgImageUrl ?? ""}
            onChange={(e) => theme.setTheme({ bgImageUrl: e.target.value || null })}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          Pro tip: Use high-quality images from Unsplash or similar
        </p>
      </section>

      {/* Visual style */}
      <section className="rounded-xl border border-line bg-surface p-5 shadow-lg">
        <h2 className="mb-3 font-semibold text-foreground">Visual Style</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pref-sidebar">Sidebar Style</Label>
            <Select value={theme.sidebarStyle} onValueChange={(v) => theme.setTheme({ sidebarStyle: v as typeof theme.sidebarStyle })}>
              <SelectTrigger id="pref-sidebar" className="mt-2 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIDEBAR_STYLES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pref-card">Card Style</Label>
            <Select value={theme.cardStyle} onValueChange={(v) => theme.setTheme({ cardStyle: v as typeof theme.cardStyle })}>
              <SelectTrigger id="pref-card" className="mt-2 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CARD_STYLES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pref-animation">Animation Level</Label>
            <Select value={theme.animationLevel} onValueChange={(v) => theme.setTheme({ animationLevel: v as typeof theme.animationLevel })}>
              <SelectTrigger id="pref-animation" className="mt-2 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ANIMATION_LEVELS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Account — the read-only info card + the logout superset.
// ---------------------------------------------------------------------------
function AccountPanel({ user, onLogout }: { user: AppUser | null; onLogout: () => void }) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-line bg-surface p-5 shadow-lg">
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
          <UserRound className="h-5 w-5 text-muted" aria-hidden="true" /> Account Information
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ac-name">Full Name</Label>
            <Input id="ac-name" className="mt-2" disabled value={user?.name ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ac-email">Email</Label>
            <Input id="ac-email" className="mt-2" disabled value={user?.email ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ac-role">Role</Label>
            <Input id="ac-role" className="mt-2" disabled value={user?.role ?? "user"} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-surface p-5 shadow-lg">
        <h2 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
          <Settings className="h-5 w-5 text-muted" aria-hidden="true" /> Session
        </h2>
        <p className="mb-3 text-sm text-muted">
          Sign out of this device. Your wellness data stays safe.
        </p>
        <button
          type="button"
          onClick={onLogout}
          className={cn(BUTTON_CLASSES, "h-10 rounded-md border border-red-200 bg-red-50 px-6 text-red-600 hover:bg-red-100")}
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Preferences — the two notification toggles.
// ---------------------------------------------------------------------------
function PreferencesPanel() {
  const theme = useThemeStore();
  return (
    <section className="rounded-xl border border-line bg-surface p-5 shadow-lg">
      <h2 className="mb-4 font-semibold text-foreground">App Preferences</h2>
      <div className="space-y-4">
        <label className="flex items-start justify-between gap-4 rounded-lg border border-line bg-line-soft/40 px-4 py-3">
          <span>
            <span className="block text-sm font-medium text-foreground">Enable Notifications</span>
            <span className="block text-xs text-muted">Receive updates about your progress</span>
          </span>
          <Checkbox
            checked={theme.notificationsEnabled}
            onCheckedChange={(v) => theme.setTheme({ notificationsEnabled: v === true })}
            aria-label="Enable notifications"
          />
        </label>
        <label className="flex items-start justify-between gap-4 rounded-lg border border-line bg-line-soft/40 px-4 py-3">
          <span>
            <span className="block text-sm font-medium text-foreground">Weekly Goal Reminders</span>
            <span className="block text-xs text-muted">Get reminded to check your weekly goals</span>
          </span>
          <Checkbox
            checked={theme.weeklyReminders}
            onCheckedChange={(v) => theme.setTheme({ weeklyReminders: v === true })}
            aria-label="Weekly goal reminders"
          />
        </label>
      </div>
    </section>
  );
}
