// Shared client-side domain types (API wire shapes) — Wellness Hub.

export type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

export interface User {
  id: string;
  email: string;
  name: string;
  avatarColor: string;
  // The profile-photo URL (the reference's profile_picture) — null = the
  // gray-200 initial fallback.
  photoUrl: string | null;
  role: string;
}

export interface Workout {
  id: string;
  type: string;
  durationMinutes: number;
  intensity: string;
  caloriesBurned: number | null;
  notes: string | null;
  date: string; // ISO
  createdAt: string;
  updatedAt: string;
}

export interface MoodEntry {
  id: string;
  mood: string;
  energy: number;
  activities: string; // JSON array
  gratitude: string | null;
  reflection: string | null;
  date: string; // ISO
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  dueDate: string | null;
  priority: string;
  estimatedHours: number | null;
  status: string; // pending | completed
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string | null;
  date: string; // ISO (day-anchored)
  time: string | null; // "HH:mm"
  category: string;
  location: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StudyResource {
  id: string;
  title: string;
  subject: string;
  description: string | null;
  type: string;
  examDate: string | null;
  url: string | null;
  tags: string; // JSON array
  personalNotes: string | null;
  rating: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Reminder {
  id: string;
  title: string;
  details: string | null;
  remindAt: string; // ISO
  type: string;
  priority: string;
  repeat: string;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string | null;
  category: string;
  frequency: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string | null;
  points: number;
  status: string; // active | completed
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Badge {
  id: string;
  key: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  points: number;
  sortOrder: number;
  earnedAt?: string | null; // present when earned (the /api/achievements merge)
}

export interface RoutineStep {
  id: string;
  templateId: string;
  title: string;
  duration: string;
  description: string | null;
  sortOrder: number;
}

export interface RoutineTemplate {
  id: string;
  key: string;
  name: string;
  description: string;
  category: string;
  timeOfDay: string;
  duration: string;
  difficulty: string;
  benefits: string; // JSON array
  tipsForProcrastinators: string | null;
  videoUrl: string | null;
  thumbnail: string | null;
  sortOrder: number;
  steps: RoutineStep[];
}

export interface UserRoutine {
  id: string;
  templateId: string | null;
  title: string;
  date: string; // ISO
  time: string | null;
  notes: string | null;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Tutorial {
  id: string;
  key: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string | null;
  thumbnail: string | null;
  duration: string;
  difficulty: string;
  views: number;
  sortOrder: number;
}

export interface UserPrefs {
  themeMode: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  bgImageUrl: string | null;
  sidebarStyle: string;
  cardStyle: string;
  animationLevel: string;
  notificationsEnabled: boolean;
  weeklyReminders: boolean;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Dashboard aggregate (the /api/dashboard envelope — one read, all tiles).
// ---------------------------------------------------------------------------

export interface DashboardData {
  workoutsThisWeek: number;
  workoutMinutesThisWeek: number;
  moodEntries: number;
  activeAssignments: number;
  goalsCompleted: number;
  goalsTotal: number;
  recentActivity: {
    kind: "workout" | "mood" | "assignment" | "event" | "reminder" | "goal" | "routine";
    id: string;
    title: string;
    detail: string | null;
    at: string;
  }[];
  upcomingReminders: Reminder[];
  upcomingEvents: EventItem[];
}
