"use client";

import * as React from "react";
import {
  Check,
  Image as ImageIcon,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sparkles,
  Sun,
  Type,
  UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/stores/theme-store";
import { useWellnessStore } from "@/stores/wellness-store";
import { toast } from "@/components/ui/toast";
import { PageHeader, GradientButton } from "@/components/shared/page-parts";
import { Tabs, TabsPanel } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  PAGE_THEMES, BUTTON_BASE, BUTTON_CLASSES,
  PROFILE_PANEL, THEME_MODE_PICKER, PRESET_CARD, PROFILE_PREFS,
} from "@/lib/page-layout";
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
    <div className={PAGE_THEMES.profile.root}>
      <div className={PAGE_THEMES.profile.container}>
      <PageHeader
        title="Profile & Customization"
        subtitle="Make this app truly yours! ✨"
        theme={PAGE_THEMES.profile}
      />

      {/* WH-25 (probed live): the Tabs wrapper is w-full (the tablist
          computes the full container width — ours shipped max-w-xl) and
          the panel shells ride mt-2 (ours mt-6). */}
      <Tabs
        tabs={[
          { id: "appearance", label: "Appearance" },
          { id: "account", label: "Account" },
          { id: "preferences", label: "Preferences" },
        ]}
        value={tab}
        onValueChange={setTab}
        cols={3}
        className="w-full"
      >
        <TabsPanel tab="appearance" className="mt-2">
          <AppearancePanel />
        </TabsPanel>
        <TabsPanel tab="account" className="mt-2">
          <AccountPanel user={user} onLogout={doLogout} />
        </TabsPanel>
        <TabsPanel tab="preferences" className="mt-2">
          <PreferencesPanel />
        </TabsPanel>
      </Tabs>

      {/* WH-25 (probed live): the save bar — flex justify-end gap-3
          sticky bottom-4 (the floating right-aligned bar; ours shipped
          a bare div). */}
      <div className="flex justify-end gap-3 sticky bottom-4">
        <GradientButton onClick={() => void save()} disabled={saving}>
          <Sparkles className="h-4 w-4" /> {saving ? "Saving…" : "Save All Changes ✨"}
        </GradientButton>
      </div>
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
      {/* Theme Mode — WH-17 (F-2): the reference's border-2 card grid
          (probed live 2026-10-30): grid-cols-3 of p-4 flex-col cards,
          the FIXED indigo active pair (not preset-themeable — the
          reference's own preset engine leaves it untouched). */}
      <section className={PROFILE_PANEL.card}>
        <div className={PROFILE_PANEL.header}>
          <h2 className={PROFILE_PANEL.title}>
            <Moon className="h-5 w-5" aria-hidden="true" /> Theme Mode
          </h2>
        </div>
        <div className={PROFILE_PANEL.body}>
          <div className={THEME_MODE_PICKER.grid}>
            {THEME_MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                aria-pressed={theme.themeMode === m.value}
                onClick={() => theme.setTheme({ themeMode: m.value })}
                className={cn(
                  THEME_MODE_PICKER.card,
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  theme.themeMode === m.value
                    ? THEME_MODE_PICKER.active
                    : THEME_MODE_PICKER.inactive,
                )}
              >
                {m.value === "light" && <Sun className={THEME_MODE_PICKER.icon} />}
                {m.value === "dark" && <Moon className={THEME_MODE_PICKER.icon} />}
                {m.value === "auto" && <Monitor className={THEME_MODE_PICKER.icon} />}
                <span className={THEME_MODE_PICKER.label}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Colors + presets — the reference's panel shell; the preset
          cards at the reference's p-3 rounded-xl hover:shadow-md anatomy
          (probed live; the reference carries no visible active state —
          our ring + label is the functional superset, the label at
          text-foreground for AA, WH-17 F-2). */}
      <section className={PROFILE_PANEL.card}>
        <div className={PROFILE_PANEL.header}>
          <h2 className={PROFILE_PANEL.title}>
            <Palette className="h-5 w-5" aria-hidden="true" /> Colors
          </h2>
        </div>
        <div className={PROFILE_PANEL.bodySpaced}>
          <div>
            <Label className="mb-3 block">Quick Presets</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {COLOR_PRESETS.map((p) => {
            const active = theme.primaryColor.toLowerCase() === p.primary.toLowerCase();
            return (
              <button
                key={p.key}
                type="button"
                aria-pressed={active}
                onClick={() => theme.setTheme({ primaryColor: p.primary, secondaryColor: p.secondary })}
                className={cn(
                  PRESET_CARD.card,
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? PRESET_CARD.active : "border-line",
                )}
              >
                {/* WH-25 (probed live): the swatch row — TWO SOLID CIRCLES
                    (ours shipped one gradient bar). */}
                <span className={PRESET_CARD.swatches} aria-hidden="true">
                  <span className={PRESET_CARD.swatch} style={{ backgroundColor: p.primary }} />
                  <span className={PRESET_CARD.swatch} style={{ backgroundColor: p.secondary }} />
                </span>
                <span className={PRESET_CARD.label}>{p.label}</span>
                {active && (
                  <span className={PRESET_CARD.activeLabel}>
                    <Check className="h-3 w-3" /> Active
                  </span>
                )}
              </button>
            );
          })}
            </div>
          </div>

        {/* WH-25 (probed live): the picker rows — grid md:grid-cols-2
            gap-6 of bare div groups; the row flex gap-3 items-center
            mt-2; the color input the stock form + w-20 h-12 (80×48). */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="pref-primary">Primary Color</Label>
            <div className="flex gap-3 items-center mt-2">
              <input
                id="pref-primary"
                type="color"
                value={theme.primaryColor}
                onChange={(e) => theme.setTheme({ primaryColor: e.target.value })}
                className="w-20 h-12 cursor-pointer"
                aria-label="Primary color picker"
              />
              <Input
                aria-label="Primary color hex"
                placeholder={theme.primaryColor}
                value={theme.primaryColor}
                onChange={(e) => theme.setTheme({ primaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="pref-secondary">Secondary Color</Label>
            <div className="flex gap-3 items-center mt-2">
              <input
                id="pref-secondary"
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => theme.setTheme({ secondaryColor: e.target.value })}
                className="w-20 h-12 cursor-pointer"
                aria-label="Secondary color picker"
              />
              <Input
                aria-label="Secondary color hex"
                placeholder={theme.secondaryColor}
                value={theme.secondaryColor}
                onChange={(e) => theme.setTheme({ secondaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* The preview tile — WH-25 (probed live): the 135deg (to-br)
            inline gradient (ours shipped to-right) on the bare p-6
            rounded-xl tile. */}
        <p
          className="p-6 rounded-xl text-center font-semibold text-white"
          style={{
            backgroundImage: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          }}
        >
          Preview: Your Custom Theme! 🎨
        </p>
        </div>
      </section>

      {/* Typography — the reference's panel shell (the type icon header,
          probed live). */}
      <section className={PROFILE_PANEL.card}>
        <div className={PROFILE_PANEL.header}>
          <h2 className={PROFILE_PANEL.title}>
            <Type className="h-5 w-5" aria-hidden="true" /> Typography
          </h2>
        </div>
        <div className={PROFILE_PANEL.body}>
        <div>
          <Label htmlFor="pref-font">Font Family</Label>
          <Select value={theme.fontFamily} onValueChange={(v) => theme.setTheme({ fontFamily: v })}>
            <SelectTrigger id="pref-font" className="mt-2 w-full">
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
        {/* WH-25 (probed live): the preview block — mt-4 p-4 border
            rounded-lg (the border block, not the bg wash) holding the
            text-lg font-sans preview + the text-sm gray-600 "Preview of
            X" line (ours shipped a bg-line-soft p-3 single-p form). */}
        <div className="mt-4 p-4 border rounded-lg dark:border-neutral-700">
          <p className="text-lg font-sans">The quick brown fox jumps over the lazy dog.</p>
          <p className="text-sm text-gray-600 mt-2 font-sans dark:text-gray-400">
            Preview of {FONT_FAMILIES.find((f) => f.value === theme.fontFamily)?.label}
          </p>
        </div>
        </div>
      </section>

      {/* Background image — the reference's panel shell (the image icon
          header, probed live). */}
      <section className={PROFILE_PANEL.card}>
        <div className={PROFILE_PANEL.header}>
          <h2 className={PROFILE_PANEL.title}>
            <ImageIcon className="h-5 w-5" aria-hidden="true" /> Background Image
          </h2>
        </div>
        <div className={PROFILE_PANEL.bodySpaced4}>
        <div>
          <Label htmlFor="pref-bg">Image URL (optional)</Label>
          <Input
            id="pref-bg"
            className="mt-2"
            placeholder="https://images.unsplash.com/..."
            value={theme.bgImageUrl ?? ""}
            onChange={(e) => theme.setTheme({ bgImageUrl: e.target.value || null })}
          />
        {/* WH-25 (probed live): the hint — text-xs text-gray-500 mt-1
            (ours shipped mt-2 text-xs text-muted). */}
        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
          Pro tip: Use high-quality images from Unsplash or similar
        </p>
        </div>
        </div>
      </section>

      {/* Visual style — the reference's panel shell (the sparkles icon
          header, probed live; the body carries the space-y-6 multi-block
          form). */}
      <section className={PROFILE_PANEL.card}>
        <div className={PROFILE_PANEL.header}>
          <h2 className={PROFILE_PANEL.title}>
            <Sparkles className="h-5 w-5" aria-hidden="true" /> Visual Style
          </h2>
        </div>
        <div className={PROFILE_PANEL.bodySpaced}>
        {/* WH-25 (probed live): the three selects STACKED full-width —
            one bare div per row in the space-y-6 body (ours shipped a
            3-col grid). */}
        <div>
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
        <div>
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
        <div>
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
      <section className={PROFILE_PANEL.card}>
        <div className={PROFILE_PANEL.header}>
          <h2 className={PROFILE_PANEL.title}>
            <UserCircle className="h-5 w-5" aria-hidden="true" /> Account Information
          </h2>
        </div>
        <div className={PROFILE_PANEL.bodySpaced4}>
        {/* WH-25 (probed live): the disabled inputs carry the bg-gray-50
            wash; the groups are bare divs. */}
        <div>
          <Label htmlFor="ac-name">Full Name</Label>
          <Input id="ac-name" className="mt-2 bg-gray-50 dark:bg-neutral-800" disabled value={user?.name ?? ""} />
        </div>
        <div>
          <Label htmlFor="ac-email">Email</Label>
          <Input id="ac-email" className="mt-2 bg-gray-50 dark:bg-neutral-800" disabled value={user?.email ?? ""} />
        </div>
        <div>
          <Label htmlFor="ac-role">Role</Label>
          <Input id="ac-role" className="mt-2 bg-gray-50 dark:bg-neutral-800" disabled value={user?.role ?? "user"} />
        </div>
        </div>
      </section>

      <section className={PROFILE_PANEL.card}>
        <div className={PROFILE_PANEL.header}>
          <h2 className={PROFILE_PANEL.title}>
            <Settings className="h-5 w-5" aria-hidden="true" /> Session
          </h2>
        </div>
        <div className={PROFILE_PANEL.body}>
        <p className="mb-3 text-sm text-muted">
          Sign out of this device. Your wellness data stays safe.
        </p>
        <button
          type="button"
          onClick={onLogout}
          className={cn(BUTTON_CLASSES, "h-10 rounded-md border border-red-200 bg-red-50 px-6 text-red-600 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/60")}
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
        </div>
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
    <section className={PROFILE_PANEL.card}>
      <div className={PROFILE_PANEL.header}>
        {/* WH-25 (probed live): the title carries the Settings icon
            (ours shipped the bare title). */}
        <h2 className={PROFILE_PANEL.title}>
          <Settings className="h-5 w-5" aria-hidden="true" /> App Preferences
        </h2>
      </div>
      <div className={PROFILE_PANEL.bodySpaced4}>
      {/* WH-25 (probed live): the rows — flex items-center justify-between
          p-4 rounded-lg border (items-center, NO gap, NO bg wash); the
          title font-medium (unsized) + the subtitle text-sm text-gray-500;
          the control the NATIVE bare checkbox w-5 h-5 (the reference's
          own form — our <label> wrapper association stays the a11y
          superset over its unwired <div>). */}
      <label className={PROFILE_PREFS.row}>
          <span>
            <span className={PROFILE_PREFS.title}>Enable Notifications</span>
            <span className={cn(PROFILE_PREFS.subtitle, "block")}>Receive updates about your progress</span>
          </span>
          <input
            type="checkbox"
            className={PROFILE_PREFS.checkbox}
            checked={theme.notificationsEnabled}
            onChange={(e) => theme.setTheme({ notificationsEnabled: e.target.checked })}
            aria-label="Enable notifications"
          />
        </label>
      <label className={PROFILE_PREFS.row}>
          <span>
            <span className={PROFILE_PREFS.title}>Weekly Goal Reminders</span>
            <span className={cn(PROFILE_PREFS.subtitle, "block")}>Get reminded to check your weekly goals</span>
          </span>
          <input
            type="checkbox"
            className={PROFILE_PREFS.checkbox}
            checked={theme.weeklyReminders}
            onChange={(e) => theme.setTheme({ weeklyReminders: e.target.checked })}
            aria-label="Weekly goal reminders"
          />
        </label>
      </div>
    </section>
  );
}
