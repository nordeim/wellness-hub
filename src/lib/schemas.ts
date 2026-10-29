// Zod schemas for the API inputs — the Wellness Hub seam.
//
// Pattern donor: zero-balance (`zod ^4`, per-route schemas, field-level
// messages, nothing reaches Prisma unvalidated) at digma's seam placement
// (a dedicated server-side validation module consumed by every route).
// The AUTH family's message strings are the chassis's own pinned strings
// (the unit + e2e suites pin them); the wellness CRUD family carries the
// reference app's own field labels as its messages.
//
//   CREATE defaults — absent/null/""/whitespace keep the route's default
//   (intensity "moderate", priority "medium", status "pending", type
//   "notes", category "personal", repeat "none", theme defaults).
//   PUT three-state — absent → undefined (no write), null/"" → null (the
//   explicit clear), a value → the trimmed value.
//   Field ORDER matches each route's guard order (parseBody answers the
//   FIRST issue — the single-error message equivalence).
//   Caps — the honest .max() reject posture ("must be reasonably sized").

import { z } from "zod";

// ---------------------------------------------------------------------------
// Shared field vocabulary
// ---------------------------------------------------------------------------

/** Email: trim + lowercase + 160 cap (the lookup bound) — the missing/
 *  non-string TYPE error is the caller-specific required message. */
const emailField = (typeMessage: string) =>
  z
    .string({ message: typeMessage })
    .trim()
    .toLowerCase()
    .max(160, "Email must be reasonably sized");

const emailFormat = emailField("Enter a valid email address").regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Enter a valid email address",
);

export const emailSchema = emailFormat;

/** Passwords: the 8-char minimum every password-setting surface enforces. */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const loginSchema = z
  .object({
    email: z
      .string({ message: "Email and password are required" })
      .trim()
      .toLowerCase()
      .max(160, "Email must be reasonably sized"),
    password: z.string({ message: "Email and password are required" }),
  })
  .superRefine((body, ctx) => {
    // The composite required-check, preserved verbatim: EITHER field
    // missing answers the ONE message.
    if (!body.email || !body.password) {
      ctx.addIssue({ code: "custom", message: "Email and password are required", path: [] });
    }
  });

export const signupSchema = z.object({
  name: z
    .string({ message: "Invalid name" })
    .trim()
    .max(80)
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  email: emailFormat,
  password: passwordSchema,
});

const VERIFICATION_CODE_LENGTH = 6;

export const verifySchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
  code: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === VERIFICATION_CODE_LENGTH, "Please enter all 6 digits"),
});

export const resendSchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailFormat,
});

export const resetPasswordSchema = z.object({
  reset_token: z
    .string({ message: "Invalid or expired reset token" })
    .trim()
    .min(1, "Invalid or expired reset token")
    .max(200, "Token must be reasonably sized"),
  new_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(200, "Password must be reasonably sized"),
});

// ---------------------------------------------------------------------------
// Wellness CRUD field builders
// ---------------------------------------------------------------------------

/** A required string: non-string/null/empty/whitespace → the required
 *  message; over-cap → the honest reject; valid → trimmed. */
const requiredString = (message: string, max: number, sized: string) =>
  z.string({ message }).trim().min(1, message).max(max, sized);

/** Optional string that explicitly clears on null/"" (the PUT clear form). */
const clearableString = (message: string, max: number, sized: string) =>
  z
    .string({ message })
    .trim()
    .max(max, sized)
    .transform((v) => (v === "" ? null : v))
    .nullish()
    .transform((v) => v ?? null);

/** Enum with a default: absent/null/garbage → the fallback (the reference's
 *  own backend-defaulted dialog vocabulary). */
const defaultedEnum = (values: readonly string[], fallback: string, message: string) =>
  z
    .string({ message })
    .refine((v) => values.includes(v), message)
    .nullish()
    .transform((v) => v ?? fallback);

const enumValue = (values: readonly string[], message: string) =>
  z.string({ message }).refine((v) => values.includes(v), message);

/** Optional positive int (the calories/rating form). */
const optionalPositiveInt = (message: string) =>
  z
    .number({ message })
    .int(message)
    .min(0, message)
    .nullish()
    .transform((v) => v ?? null);

/** Optional date: accepts ISO strings / null; absent → null. */
const optionalDate = z.coerce.date().nullish().transform((v) => v ?? null);

const requiredDate = z.coerce.date({ message: "Date is required" });

// ---------------------------------------------------------------------------
// Workouts (Exercise Tracker)
// ---------------------------------------------------------------------------

export const workoutCreateSchema = z.object({
  type: defaultedEnum(
    ["cardio", "strength", "yoga", "sports", "walking", "cycling", "swimming", "other"],
    "cardio",
    "Choose a valid exercise type",
  ),
  durationMinutes: z
    .number({ message: "Duration (minutes) is required" })
    .int("Duration must be a whole number")
    .min(1, "Duration must be at least 1 minute")
    .max(1440, "Duration must be realistic (under a day)"),
  intensity: defaultedEnum(["light", "moderate", "intense"], "moderate", "Choose a valid intensity"),
  caloriesBurned: optionalPositiveInt("Calories burned must be a number"),
  notes: clearableString("Notes must be reasonably sized", 2000, "Notes must be reasonably sized"),
  date: requiredDate,
});

export const workoutUpdateSchema = workoutCreateSchema.partial();

// ---------------------------------------------------------------------------
// Mood entries (Mental Health Journal)
// ---------------------------------------------------------------------------

export const moodEntryCreateSchema = z.object({
  mood: enumValue(
    ["amazing", "good", "okay", "low", "struggling"],
    "Choose your mood",
  ),
  energy: z
    .number({ message: "Energy level must be a number" })
    .int("Energy level must be a whole number")
    .min(0, "Energy level is 0-10")
    .max(10, "Energy level is 0-10"),
  activities: z
    .array(z.string().trim().min(1).max(60))
    .max(20, "Keep the activity list reasonably sized")
    .nullish()
    .transform((v) => JSON.stringify(v ?? [])),
  gratitude: clearableString("Gratitude must be reasonably sized", 2000, "Gratitude must be reasonably sized"),
  reflection: clearableString("Reflection must be reasonably sized", 4000, "Reflection must be reasonably sized"),
  date: requiredDate,
});

export const moodEntryUpdateSchema = z.object({
  mood: moodEntryCreateSchema.shape.mood.optional(),
  energy: moodEntryCreateSchema.shape.energy.optional(),
  activities: moodEntryCreateSchema.shape.activities.optional(),
  gratitude: clearableString("Gratitude must be reasonably sized", 2000, "Gratitude must be reasonably sized").optional(),
  reflection: clearableString("Reflection must be reasonably sized", 4000, "Reflection must be reasonably sized").optional(),
  date: z.coerce.date().optional(),
});

// ---------------------------------------------------------------------------
// Assignments
// ---------------------------------------------------------------------------

export const assignmentCreateSchema = z.object({
  title: requiredString("Title is required", 200, "Title must be reasonably sized"),
  description: clearableString("Description must be reasonably sized", 4000, "Description must be reasonably sized"),
  subject: clearableString("Subject must be reasonably sized", 120, "Subject must be reasonably sized"),
  dueDate: optionalDate,
  priority: defaultedEnum(["low", "medium", "high", "urgent"], "medium", "Choose a valid priority"),
  estimatedHours: z
    .number({ message: "Estimated hours must be a number" })
    .min(0, "Estimated hours cannot be negative")
    .max(1000, "Estimated hours must be realistic")
    .nullish()
    .transform((v) => v ?? null),
});

export const assignmentUpdateSchema = z.object({
  title: requiredString("Title is required", 200, "Title must be reasonably sized").optional(),
  description: clearableString("Description must be reasonably sized", 4000, "Description must be reasonably sized").optional(),
  subject: clearableString("Subject must be reasonably sized", 120, "Subject must be reasonably sized").optional(),
  dueDate: optionalDate.optional(),
  priority: enumValue(["low", "medium", "high", "urgent"], "Choose a valid priority").optional(),
  estimatedHours: z
    .number({ message: "Estimated hours must be a number" })
    .min(0, "Estimated hours cannot be negative")
    .max(1000, "Estimated hours must be realistic")
    .nullish()
    .transform((v) => v ?? null)
    .optional(),
  status: enumValue(["pending", "completed"], "Choose a valid status").optional(),
});

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export const eventCreateSchema = z.object({
  title: requiredString("Event title is required", 200, "Title must be reasonably sized"),
  description: clearableString("Description must be reasonably sized", 4000, "Description must be reasonably sized"),
  date: requiredDate,
  time: z
    .string({ message: "Time must be a valid time" })
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be a valid time (HH:MM)")
    .nullish()
    .transform((v) => v ?? null),
  category: defaultedEnum(
    ["personal", "work", "social", "health", "education", "other"],
    "personal",
    "Choose a valid category",
  ),
  location: clearableString("Location must be reasonably sized", 200, "Location must be reasonably sized"),
});

export const eventUpdateSchema = z.object({
  title: requiredString("Event title is required", 200, "Title must be reasonably sized").optional(),
  description: clearableString("Description must be reasonably sized", 4000, "Description must be reasonably sized").optional(),
  date: z.coerce.date().optional(),
  time: z
    .string({ message: "Time must be a valid time" })
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be a valid time (HH:MM)")
    .nullish()
    .transform((v) => v ?? null)
    .optional(),
  category: enumValue(
    ["personal", "work", "social", "health", "education", "other"],
    "Choose a valid category",
  ).optional(),
  location: clearableString("Location must be reasonably sized", 200, "Location must be reasonably sized").optional(),
});

// ---------------------------------------------------------------------------
// Study resources
// ---------------------------------------------------------------------------

export const studyResourceCreateSchema = z.object({
  title: requiredString("Resource title is required", 200, "Title must be reasonably sized"),
  subject: requiredString("Subject is required", 120, "Subject must be reasonably sized"),
  description: clearableString("Description must be reasonably sized", 2000, "Description must be reasonably sized"),
  type: defaultedEnum(
    ["notes", "video", "practice_test", "textbook", "article", "website", "flashcards", "other"],
    "notes",
    "Choose a valid resource type",
  ),
  examDate: optionalDate,
  url: z
    .string({ message: "URL must be reasonably sized" })
    .trim()
    .max(2000, "URL must be reasonably sized")
    .refine((v) => v === "" || /^https?:\/\/.+/i.test(v), "Enter a valid URL (https://…)")
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  tags: z
    .array(z.string().trim().min(1).max(60))
    .max(20, "Keep the tag list reasonably sized")
    .nullish()
    .transform((v) => JSON.stringify(v ?? [])),
  personalNotes: clearableString("Personal notes must be reasonably sized", 4000, "Personal notes must be reasonably sized"),
  rating: z
    .number({ message: "Rating is 1-5 stars" })
    .int("Rating is 1-5 stars")
    .min(1, "Rating is 1-5 stars")
    .max(5, "Rating is 1-5 stars")
    .nullish()
    .transform((v) => v ?? null),
});

export const studyResourceUpdateSchema = studyResourceCreateSchema.partial();

// ---------------------------------------------------------------------------
// Reminders
// ---------------------------------------------------------------------------

export const reminderCreateSchema = z.object({
  title: requiredString("A reminder needs a title", 200, "Title must be reasonably sized"),
  details: clearableString("Details must be reasonably sized", 2000, "Details must be reasonably sized"),
  remindAt: requiredDate,
  type: defaultedEnum(
    ["custom", "assignment", "event", "goal", "routine"],
    "custom",
    "Choose a valid type",
  ),
  priority: defaultedEnum(["low", "medium", "high", "urgent"], "medium", "Choose a valid priority"),
  repeat: defaultedEnum(["none", "daily", "weekly", "monthly"], "none", "Choose a valid repeat"),
});

export const reminderUpdateSchema = z.object({
  title: requiredString("A reminder needs a title", 200, "Title must be reasonably sized").optional(),
  details: clearableString("Details must be reasonably sized", 2000, "Details must be reasonably sized").optional(),
  remindAt: z.coerce.date().optional(),
  type: enumValue(["custom", "assignment", "event", "goal", "routine"], "Choose a valid type").optional(),
  priority: enumValue(["low", "medium", "high", "urgent"], "Choose a valid priority").optional(),
  repeat: enumValue(["none", "daily", "weekly", "monthly"], "Choose a valid repeat").optional(),
  completed: z.boolean({ message: "Completed must be a boolean" }).optional(),
});

// ---------------------------------------------------------------------------
// Goals
// ---------------------------------------------------------------------------

export const goalCreateSchema = z.object({
  title: requiredString("Goal title is required", 200, "Title must be reasonably sized"),
  description: clearableString("Description must be reasonably sized", 2000, "Description must be reasonably sized"),
  category: defaultedEnum(
    ["exercise", "mental_health", "learning", "productivity", "personal", "other"],
    "personal",
    "Choose a valid category",
  ),
  frequency: defaultedEnum(
    ["daily", "weekly", "monthly", "yearly", "one_time"],
    "one_time",
    "Choose a valid frequency",
  ),
  targetValue: z
    .number({ message: "Target value is required" })
    .int("Target value must be a whole number")
    .min(1, "Target value must be at least 1")
    .max(1_000_000, "Target value must be realistic"),
  currentValue: z
    .number({ message: "Current value must be a number" })
    .int("Current value must be a whole number")
    .min(0, "Current value cannot be negative")
    .max(1_000_000, "Current value must be realistic")
    .nullish()
    .transform((v) => v ?? 0),
  unit: requiredString("Unit is required", 40, "Unit must be reasonably sized"),
  deadline: optionalDate,
});

export const goalUpdateSchema = z.object({
  title: requiredString("Goal title is required", 200, "Title must be reasonably sized").optional(),
  description: clearableString("Description must be reasonably sized", 2000, "Description must be reasonably sized").optional(),
  category: enumValue(
    ["exercise", "mental_health", "learning", "productivity", "personal", "other"],
    "Choose a valid category",
  ).optional(),
  frequency: enumValue(
    ["daily", "weekly", "monthly", "yearly", "one_time"],
    "Choose a valid frequency",
  ).optional(),
  targetValue: z
    .number({ message: "Target value must be a number" })
    .int("Target value must be a whole number")
    .min(1, "Target value must be at least 1")
    .max(1_000_000, "Target value must be realistic")
    .optional(),
  currentValue: z
    .number({ message: "Current value must be a number" })
    .int("Current value must be a whole number")
    .min(0, "Current value cannot be negative")
    .max(1_000_000, "Current value must be realistic")
    .optional(),
  unit: requiredString("Unit is required", 40, "Unit must be reasonably sized").optional(),
  deadline: optionalDate.optional(),
  status: enumValue(["active", "completed"], "Choose a valid status").optional(),
});

// ---------------------------------------------------------------------------
// Scheduled routines (Use This Template → Schedule dialog)
// ---------------------------------------------------------------------------

export const userRoutineCreateSchema = z.object({
  templateId: z
    .string({ message: "Choose a valid template" })
    .trim()
    .min(1, "Choose a valid template")
    .max(64)
    .nullish()
    .transform((v) => v ?? null),
  title: requiredString("A routine needs a title", 200, "Title must be reasonably sized"),
  date: requiredDate,
  time: z
    .string({ message: "Time must be a valid time" })
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be a valid time (HH:MM)")
    .nullish()
    .transform((v) => v ?? null),
  notes: clearableString("Notes must be reasonably sized", 2000, "Notes must be reasonably sized"),
});

export const userRoutineUpdateSchema = z.object({
  date: z.coerce.date().optional(),
  time: z
    .string({ message: "Time must be a valid time" })
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be a valid time (HH:MM)")
    .nullish()
    .transform((v) => v ?? null)
    .optional(),
  notes: clearableString("Notes must be reasonably sized", 2000, "Notes must be reasonably sized").optional(),
  completed: z.boolean({ message: "Completed must be a boolean" }).optional(),
});

// ---------------------------------------------------------------------------
// User preferences (Profile & Customization — the Save All Changes seam)
// ---------------------------------------------------------------------------

const hexColor = z
  .string({ message: "Choose a valid color" })
  .regex(/^#[0-9a-fA-F]{6}$/, "Choose a valid color (#rrggbb)");

export const prefsSchema = z.object({
  themeMode: enumValue(["light", "dark", "auto"], "Choose a valid theme mode").optional(),
  primaryColor: hexColor.optional(),
  secondaryColor: hexColor.optional(),
  fontFamily: enumValue(["system", "inter", "poppins", "roboto", "lora"], "Choose a valid font").optional(),
  bgImageUrl: z
    .string({ message: "Image URL must be reasonably sized" })
    .trim()
    .max(2000, "Image URL must be reasonably sized")
    .refine((v) => v === "" || /^https?:\/\/.+/i.test(v), "Enter a valid image URL (https://…)")
    .nullish()
    .transform((v) => (v === "" ? null : v))
    .optional(),
  sidebarStyle: enumValue(["gradient", "solid", "minimal"], "Choose a valid sidebar style").optional(),
  cardStyle: enumValue(["elevated", "flat", "outline"], "Choose a valid card style").optional(),
  animationLevel: enumValue(["full", "subtle", "none"], "Choose a valid animation level").optional(),
  notificationsEnabled: z.boolean({ message: "Notifications must be a boolean" }).optional(),
  weeklyReminders: z.boolean({ message: "Weekly reminders must be a boolean" }).optional(),
});

// ---------------------------------------------------------------------------
// Tutorial view counter (the Watch Now superset touch)
// ---------------------------------------------------------------------------

export const tutorialViewSchema = z.object({
  id: z.string({ message: "Choose a valid tutorial" }).trim().min(1).max(64),
});
