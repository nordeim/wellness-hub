// Wellness Hub domain vocabularies — every option list, emoji mapping and
// tint decoded live from the reference app's DOM/comboboxes on 2026-10-29
// (see docs/plans/2026-10-29-wellness-hub-build.md §1.5). The shape follows
// the reference's {label, icon?, tint} card-chip vocabulary so every page
// renders the same chip anatomy from one source.

// WH-7: the chassis-era NAV_ICONS glyph map (and its ten lucide-react
// imports) retired — the sidebar/mobile drawer render from
// src/components/layout/nav-config.ts, which carries its OWN icon set
// byte-extracted from the reference's live DOM; this map had zero
// importers since the build. The export-census pin owns this module's
// export surface.

// ---------------------------------------------------------------------------
// Workouts (Exercise Tracker)
// ---------------------------------------------------------------------------
export interface OptionMeta {
  value: string;
  label: string;
  icon?: string; // emoji, when the reference's option carries one
  tint: string; // the pastel chip background (tailwind class)
  text: string; // the chip's foreground
}

export const WORKOUT_TYPES: OptionMeta[] = [
  { value: "cardio", label: "Cardio", icon: "🏃", tint: "bg-red-50", text: "text-red-600" },
  { value: "strength", label: "Strength Training", icon: "💪", tint: "bg-orange-50", text: "text-orange-600" },
  { value: "yoga", label: "Yoga", icon: "🧘", tint: "bg-emerald-50", text: "text-emerald-600" },
  { value: "sports", label: "Sports", icon: "⚽", tint: "bg-blue-50", text: "text-blue-600" },
  { value: "walking", label: "Walking", icon: "🚶", tint: "bg-teal-50", text: "text-teal-600" },
  { value: "cycling", label: "Cycling", icon: "🚴", tint: "bg-cyan-50", text: "text-cyan-600" },
  { value: "swimming", label: "Swimming", icon: "🏊", tint: "bg-sky-50", text: "text-sky-600" },
  { value: "other", label: "Other", icon: "🏋️", tint: "bg-violet-50", text: "text-violet-600" },
];

export const WORKOUT_INTENSITIES: OptionMeta[] = [
  { value: "light", label: "Light", tint: "bg-emerald-50", text: "text-emerald-600" },
  { value: "moderate", label: "Moderate", tint: "bg-amber-50", text: "text-amber-600" },
  { value: "intense", label: "Intense", tint: "bg-red-50", text: "text-red-600" },
];

export function workoutTypeMeta(value: string): OptionMeta {
  return WORKOUT_TYPES.find((t) => t.value === value) ?? WORKOUT_TYPES[WORKOUT_TYPES.length - 1];
}

export function intensityMeta(value: string): OptionMeta {
  return WORKOUT_INTENSITIES.find((t) => t.value === value) ?? WORKOUT_INTENSITIES[1];
}

// ---------------------------------------------------------------------------
// Mental Health Journal
// ---------------------------------------------------------------------------
export const MOODS: OptionMeta[] = [
  { value: "amazing", label: "Amazing", icon: "😄", tint: "bg-green-50", text: "text-green-600" },
  { value: "good", label: "Good", icon: "😊", tint: "bg-emerald-50", text: "text-emerald-600" },
  { value: "okay", label: "Okay", icon: "😐", tint: "bg-amber-50", text: "text-amber-600" },
  { value: "low", label: "Low", icon: "😔", tint: "bg-orange-50", text: "text-orange-600" },
  { value: "struggling", label: "Struggling", icon: "😢", tint: "bg-red-50", text: "text-red-600" },
];

export function moodMeta(value: string): OptionMeta {
  return MOODS.find((m) => m.value === value) ?? MOODS[2];
}

// ---------------------------------------------------------------------------
// Assignments
// ---------------------------------------------------------------------------
export const ASSIGNMENT_PRIORITIES: OptionMeta[] = [
  { value: "low", label: "Low", tint: "bg-emerald-50", text: "text-emerald-600" },
  { value: "medium", label: "Medium", tint: "bg-amber-50", text: "text-amber-600" },
  { value: "high", label: "High", tint: "bg-orange-50", text: "text-orange-600" },
  { value: "urgent", label: "Urgent", tint: "bg-red-50", text: "text-red-600" },
];

export function priorityMeta(value: string): OptionMeta {
  return ASSIGNMENT_PRIORITIES.find((p) => p.value === value) ?? ASSIGNMENT_PRIORITIES[1];
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
export const EVENT_CATEGORIES: OptionMeta[] = [
  { value: "personal", label: "Personal", tint: "bg-indigo-50", text: "text-indigo-600" },
  { value: "work", label: "Work", tint: "bg-blue-50", text: "text-blue-600" },
  { value: "social", label: "Social", tint: "bg-purple-50", text: "text-purple-600" },
  { value: "health", label: "Health", tint: "bg-emerald-50", text: "text-emerald-600" },
  { value: "education", label: "Education", tint: "bg-amber-50", text: "text-amber-600" },
  { value: "other", label: "Other", tint: "bg-gray-100", text: "text-gray-600" },
];

export function eventCategoryMeta(value: string): OptionMeta {
  return EVENT_CATEGORIES.find((c) => c.value === value) ?? EVENT_CATEGORIES[0];
}

// ---------------------------------------------------------------------------
// Study Resources
// ---------------------------------------------------------------------------
export const RESOURCE_TYPES: OptionMeta[] = [
  { value: "notes", label: "Notes", icon: "📝", tint: "bg-blue-50", text: "text-blue-600" },
  { value: "video", label: "Video", icon: "🎥", tint: "bg-red-50", text: "text-red-600" },
  { value: "practice_test", label: "Practice Test", icon: "✍️", tint: "bg-purple-50", text: "text-purple-600" },
  { value: "textbook", label: "Textbook", icon: "📚", tint: "bg-amber-50", text: "text-amber-600" },
  { value: "article", label: "Article", icon: "📄", tint: "bg-teal-50", text: "text-teal-600" },
  { value: "website", label: "Website", icon: "🌐", tint: "bg-cyan-50", text: "text-cyan-600" },
  { value: "flashcards", label: "Flashcards", icon: "🃏", tint: "bg-pink-50", text: "text-pink-600" },
  { value: "other", label: "Other", icon: "📎", tint: "bg-gray-100", text: "text-gray-600" },
];

export function resourceTypeMeta(value: string): OptionMeta {
  return RESOURCE_TYPES.find((t) => t.value === value) ?? RESOURCE_TYPES[0];
}

// ---------------------------------------------------------------------------
// Reminders
// ---------------------------------------------------------------------------
export const REMINDER_TYPES: OptionMeta[] = [
  { value: "custom", label: "Custom", tint: "bg-indigo-50", text: "text-indigo-600" },
  { value: "assignment", label: "Assignment", tint: "bg-blue-50", text: "text-blue-600" },
  { value: "event", label: "Event", tint: "bg-purple-50", text: "text-purple-600" },
  { value: "goal", label: "Goal", tint: "bg-amber-50", text: "text-amber-600" },
  { value: "routine", label: "Routine", tint: "bg-emerald-50", text: "text-emerald-600" },
];

export const REMINDER_REPEATS: OptionMeta[] = [
  { value: "none", label: "No Repeat", tint: "bg-gray-100", text: "text-gray-600" },
  { value: "daily", label: "Daily", tint: "bg-blue-50", text: "text-blue-600" },
  { value: "weekly", label: "Weekly", tint: "bg-indigo-50", text: "text-indigo-600" },
  { value: "monthly", label: "Monthly", tint: "bg-purple-50", text: "text-purple-600" },
];

export function reminderTypeMeta(value: string): OptionMeta {
  return REMINDER_TYPES.find((t) => t.value === value) ?? REMINDER_TYPES[0];
}

export function repeatMeta(value: string): OptionMeta {
  return REMINDER_REPEATS.find((r) => r.value === value) ?? REMINDER_REPEATS[0];
}

// ---------------------------------------------------------------------------
// Goals & Achievements
// ---------------------------------------------------------------------------
export const GOAL_CATEGORIES: OptionMeta[] = [
  { value: "exercise", label: "Exercise", tint: "bg-red-50", text: "text-red-600" },
  { value: "mental_health", label: "Mental Health", tint: "bg-emerald-50", text: "text-emerald-600" },
  { value: "learning", label: "Learning", tint: "bg-blue-50", text: "text-blue-600" },
  { value: "productivity", label: "Productivity", tint: "bg-amber-50", text: "text-amber-600" },
  { value: "personal", label: "Personal", tint: "bg-indigo-50", text: "text-indigo-600" },
  { value: "other", label: "Other", tint: "bg-gray-100", text: "text-gray-600" },
];

export const GOAL_FREQUENCIES: OptionMeta[] = [
  { value: "daily", label: "Daily", tint: "bg-blue-50", text: "text-blue-600" },
  { value: "weekly", label: "Weekly", tint: "bg-indigo-50", text: "text-indigo-600" },
  { value: "monthly", label: "Monthly", tint: "bg-purple-50", text: "text-purple-600" },
  { value: "yearly", label: "Yearly", tint: "bg-pink-50", text: "text-pink-600" },
  { value: "one_time", label: "One Time", tint: "bg-gray-100", text: "text-gray-600" },
];

export function goalCategoryMeta(value: string): OptionMeta {
  return GOAL_CATEGORIES.find((c) => c.value === value) ?? GOAL_CATEGORIES[4];
}

export function goalFrequencyMeta(value: string): OptionMeta {
  return GOAL_FREQUENCIES.find((f) => f.value === value) ?? GOAL_FREQUENCIES[4];
}

/** Points awarded when a goal completes, by frequency (the reference shows
 *  a Total Points stat; the awarding itself is our functional superset —
 *  deterministic, test-pinned values). */
export const GOAL_FREQUENCY_POINTS: Record<string, number> = {
  daily: 10,
  weekly: 20,
  monthly: 30,
  yearly: 40,
  one_time: 50,
};

// ---------------------------------------------------------------------------
// Routine Templates
// ---------------------------------------------------------------------------
const TEMPLATE_DIFFICULTIES: OptionMeta[] = [
  { value: "easy", label: "easy", tint: "bg-emerald-50", text: "text-emerald-600" },
  { value: "moderate", label: "moderate", tint: "bg-amber-50", text: "text-amber-600" },
];

export function difficultyMeta(value: string): OptionMeta {
  return TEMPLATE_DIFFICULTIES.find((d) => d.value === value) ?? TEMPLATE_DIFFICULTIES[0];
}

// ---------------------------------------------------------------------------
// Learning Center
// ---------------------------------------------------------------------------
export const TUTORIAL_CATEGORIES: OptionMeta[] = [
  { value: "productivity", label: "productivity", tint: "bg-amber-50", text: "text-amber-600" },
  { value: "life_skills", label: "life skills", tint: "bg-indigo-50", text: "text-indigo-600" },
  { value: "mental_health", label: "mental health", tint: "bg-emerald-50", text: "text-emerald-600" },
  { value: "wellness", label: "wellness", tint: "bg-teal-50", text: "text-teal-600" },
  { value: "study_skills", label: "study skills", tint: "bg-blue-50", text: "text-blue-600" },
  { value: "exercise", label: "exercise", tint: "bg-red-50", text: "text-red-600" },
];

export const TUTORIAL_DIFFICULTIES: OptionMeta[] = [
  { value: "beginner", label: "beginner", tint: "bg-emerald-50", text: "text-emerald-600" },
  { value: "intermediate", label: "intermediate", tint: "bg-amber-50", text: "text-amber-600" },
];

export function tutorialCategoryMeta(value: string): OptionMeta {
  return TUTORIAL_CATEGORIES.find((c) => c.value === value) ?? TUTORIAL_CATEGORIES[0];
}

export function tutorialDifficultyMeta(value: string): OptionMeta {
  return TUTORIAL_DIFFICULTIES.find((d) => d.value === value) ?? TUTORIAL_DIFFICULTIES[0];
}

// ---------------------------------------------------------------------------
// Profile & Customization — the Appearance tab vocabulary (live-captured).
// ---------------------------------------------------------------------------
export interface ColorPreset {
  key: string;
  label: string;
  primary: string;
  secondary: string;
}

/** The reference's Quick Presets (its Appearance tab, decoded live). */
export const COLOR_PRESETS: ColorPreset[] = [
  { key: "indigo_dream", label: "Indigo Dream", primary: "#6366f1", secondary: "#a855f7" },
  { key: "ocean_blue", label: "Ocean Blue", primary: "#0ea5e9", secondary: "#6366f1" },
  { key: "forest_green", label: "Forest Green", primary: "#10b981", secondary: "#84cc16" },
  { key: "sunset_orange", label: "Sunset Orange", primary: "#f97316", secondary: "#f43f5e" },
  { key: "rose_pink", label: "Rose Pink", primary: "#f43f5e", secondary: "#ec4899" },
  { key: "royal_purple", label: "Royal Purple", primary: "#8b5cf6", secondary: "#6366f1" },
  { key: "crimson_red", label: "Crimson Red", primary: "#ef4444", secondary: "#f97316" },
  { key: "golden_yellow", label: "Golden Yellow", primary: "#eab308", secondary: "#f59e0b" },
];

export const THEME_MODES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
] as const;

export const FONT_FAMILIES = [
  { value: "system", label: "System Default" },
  { value: "inter", label: "Inter" },
  { value: "poppins", label: "Poppins" },
  { value: "roboto", label: "Roboto" },
  { value: "lora", label: "Lora (Serif)" },
] as const;

export const SIDEBAR_STYLES = [
  { value: "gradient", label: "Gradient (Colorful)" },
  { value: "solid", label: "Solid (Primary Tint)" },
  { value: "minimal", label: "Minimal (Plain)" },
] as const;

export const CARD_STYLES = [
  { value: "elevated", label: "Elevated (3D Shadows)" },
  { value: "flat", label: "Flat (Soft Tint)" },
  { value: "outline", label: "Outlined (Bordered)" },
] as const;

export const ANIMATION_LEVELS = [
  { value: "full", label: "Full (Smooth & Fluid)" },
  { value: "subtle", label: "Subtle (Gentle)" },
  { value: "none", label: "None (Reduced Motion)" },
] as const;

// ---------------------------------------------------------------------------
// App identity (the reference's own strings). WH-7: the login subtitle
// string retired — the login card renders its reference strings inline
// (LOGIN_LAYOUT classes + the literal pair); only the strings with real
// consumers stay exported.
// ---------------------------------------------------------------------------
export const APP_NAME = "Wellness Hub";
export const APP_TAGLINE = "Your personal companion";
export const APP_LOGIN_TITLE = "Welcome to EvolveWell";
