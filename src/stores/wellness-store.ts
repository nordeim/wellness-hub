"use client";

// Single Zustand store for all server state (scaffold convention — no
// React Query, no SWR). Actions call the API envelope, then refresh the
// affected slice. call() is the only sanctioned JSON-ENVELOPE client.

import { create } from "zustand";
import type {
  Assignment,
  Badge,
  DashboardData,
  EventItem,
  Goal,
  MoodEntry,
  Reminder,
  Result,
  RoutineTemplate,
  StudyResource,
  Tutorial,
  User,
  UserRoutine,
  Workout,
} from "@/types";

interface ApiEnvelope<T> {
  ok: boolean;
  data?: T;
  error?: { code: string; message: string };
}

async function call<T>(path: string, init?: RequestInit): Promise<Result<T, string>> {
  try {
    const res = await fetch(path, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    const body = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
    if (!res.ok || !body || body.ok === false) {
      const message =
        body && body.error ? body.error.message : `Request failed (${res.status})`;
      return { ok: false, error: message };
    }
    return { ok: true, data: body.data as T };
  } catch {
    return { ok: false, error: "Network error — check your connection and try again." };
  }
}

// The logout write-guard: every fetch captures this token at entry and may
// only write while it still matches; logout bumps it immediately before
// clearing — an in-flight resolution can never re-populate a cleared slice
// (no cross-user flash on a fast logout → login).
let sessionWriteToken = 0;

export interface AchievementsData {
  badges: Badge[];
  goalsCompleted: number;
  goalsTotal: number;
  badgesEarned: number;
  badgesTotal: number;
  moodStreak: number;
  totalPoints: number;
}

export interface WellnessState {
  // session bootstrap flag (the auth decision is the (app) layout's
  // server guard; a page needing the session user takes it as a server
  // prop — the Profile page's pattern. No user slice: WH-8 retired the
  // write-only field nothing read since WH-4's user-chip retirement.)
  hydrated: boolean;

  // domain slices
  workouts: Workout[];
  moodEntries: MoodEntry[];
  assignments: Assignment[];
  events: EventItem[];
  studyResources: StudyResource[];
  reminders: Reminder[];
  goals: Goal[];
  routines: UserRoutine[];
  routineTemplates: RoutineTemplate[];
  tutorials: Tutorial[];
  achievements: AchievementsData | null;
  dashboard: DashboardData | null;

  // actions
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
  fetchWorkouts: () => Promise<void>;
  fetchMoodEntries: () => Promise<void>;
  fetchAssignments: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchStudyResources: () => Promise<void>;
  fetchReminders: () => Promise<void>;
  fetchGoals: () => Promise<void>;
  fetchRoutines: () => Promise<void>;
  fetchRoutineTemplates: () => Promise<void>;
  fetchTutorials: () => Promise<void>;
  fetchAchievements: () => Promise<void>;
  fetchDashboard: () => Promise<void>;

  createWorkout: (input: Record<string, unknown>) => Promise<Result<Workout, string>>;
  deleteWorkout: (id: string) => Promise<Result<null, string>>;

  createMoodEntry: (input: Record<string, unknown>) => Promise<Result<MoodEntry, string>>;
  deleteMoodEntry: (id: string) => Promise<Result<null, string>>;

  createAssignment: (input: Record<string, unknown>) => Promise<Result<Assignment, string>>;
  updateAssignment: (id: string, input: Record<string, unknown>) => Promise<Result<Assignment, string>>;
  deleteAssignment: (id: string) => Promise<Result<null, string>>;

  createEvent: (input: Record<string, unknown>) => Promise<Result<EventItem, string>>;
  updateEvent: (id: string, input: Record<string, unknown>) => Promise<Result<EventItem, string>>;
  deleteEvent: (id: string) => Promise<Result<null, string>>;

  createStudyResource: (input: Record<string, unknown>) => Promise<Result<StudyResource, string>>;
  updateStudyResource: (id: string, input: Record<string, unknown>) => Promise<Result<StudyResource, string>>;
  deleteStudyResource: (id: string) => Promise<Result<null, string>>;

  createReminder: (input: Record<string, unknown>) => Promise<Result<Reminder, string>>;
  updateReminder: (id: string, input: Record<string, unknown>) => Promise<Result<Reminder, string>>;
  deleteReminder: (id: string) => Promise<Result<null, string>>;

  createGoal: (input: Record<string, unknown>) => Promise<Result<Goal, string>>;
  updateGoal: (id: string, input: Record<string, unknown>) => Promise<Result<Goal, string>>;
  deleteGoal: (id: string) => Promise<Result<null, string>>;

  createRoutine: (input: Record<string, unknown>) => Promise<Result<UserRoutine, string>>;
  updateRoutine: (id: string, input: Record<string, unknown>) => Promise<Result<UserRoutine, string>>;
  deleteRoutine: (id: string) => Promise<Result<null, string>>;

  viewTutorial: (id: string) => Promise<Result<Tutorial, string>>;
}

export const useWellnessStore = create<WellnessState>()((set, get) => {
  const guardedSet = (fn: () => void, token: number) => {
    if (token === sessionWriteToken) fn();
  };

  const crud = <T>(path: string, refetch: () => Promise<void>) => ({
    create: async (input: Record<string, unknown>): Promise<Result<T, string>> => {
      const res = await call<T>(path, {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (res.ok) await refetch();
      return res;
    },
    update: async (id: string, input: Record<string, unknown>): Promise<Result<T, string>> => {
      const res = await call<T>(`${path}/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
      });
      if (res.ok) await refetch();
      return res;
    },
    remove: async (id: string): Promise<Result<null, string>> => {
      const res = await call<null>(`${path}/${id}`, { method: "DELETE" });
      if (res.ok) await refetch();
      return res;
    },
  });

  return {
    hydrated: false,

    workouts: [],
    moodEntries: [],
    assignments: [],
    events: [],
    studyResources: [],
    reminders: [],
    goals: [],
    routines: [],
    routineTemplates: [],
    tutorials: [],
    achievements: null,
    dashboard: null,

    hydrate: async () => {
      const token = sessionWriteToken;
      const [me] = await Promise.all([call<User>("/api/auth/me")]);
      guardedSet(() => set({ hydrated: true }), token);
      // The me probe only gates the catalog bootstrap (a dead session
      // hydrates the flag and stops — pages render their empty lists
      // instead of loading forever). Content catalogs load once per
      // session; per-user slices stay lazy (each page fetches its own
      // on mount). WH-8: the write-only `user` slice retired with this
      // convergence — the store-member census owns the liveness class.
      if (me.ok) {
        await Promise.all([
          get().fetchRoutineTemplates(),
          get().fetchTutorials(),
          get().fetchDashboard(),
        ]);
      }
    },

    logout: async () => {
      sessionWriteToken++;
      await call("/api/auth/logout", { method: "POST" });
      set({
        workouts: [],
        moodEntries: [],
        assignments: [],
        events: [],
        studyResources: [],
        reminders: [],
        goals: [],
        routines: [],
        achievements: null,
        dashboard: null,
      });
    },

    fetchWorkouts: async () => {
      const token = sessionWriteToken;
      const res = await call<Workout[]>("/api/workouts");
      if (res.ok) guardedSet(() => set({ workouts: res.data }), token);
    },
    fetchMoodEntries: async () => {
      const token = sessionWriteToken;
      const res = await call<MoodEntry[]>("/api/mood-entries");
      if (res.ok) guardedSet(() => set({ moodEntries: res.data }), token);
    },
    fetchAssignments: async () => {
      const token = sessionWriteToken;
      const res = await call<Assignment[]>("/api/assignments");
      if (res.ok) guardedSet(() => set({ assignments: res.data }), token);
    },
    fetchEvents: async () => {
      const token = sessionWriteToken;
      const res = await call<EventItem[]>("/api/events");
      if (res.ok) guardedSet(() => set({ events: res.data }), token);
    },
    fetchStudyResources: async () => {
      const token = sessionWriteToken;
      const res = await call<StudyResource[]>("/api/study-resources");
      if (res.ok) guardedSet(() => set({ studyResources: res.data }), token);
    },
    fetchReminders: async () => {
      const token = sessionWriteToken;
      const res = await call<Reminder[]>("/api/reminders");
      if (res.ok) guardedSet(() => set({ reminders: res.data }), token);
    },
    fetchGoals: async () => {
      const token = sessionWriteToken;
      const res = await call<Goal[]>("/api/goals");
      if (res.ok) guardedSet(() => set({ goals: res.data }), token);
    },
    fetchRoutines: async () => {
      const token = sessionWriteToken;
      const res = await call<UserRoutine[]>("/api/routines");
      if (res.ok) guardedSet(() => set({ routines: res.data }), token);
    },
    fetchRoutineTemplates: async () => {
      const token = sessionWriteToken;
      const res = await call<RoutineTemplate[]>("/api/routine-templates");
      if (res.ok)
        guardedSet(
          () => set({ routineTemplates: res.data }),
          token,
        );
    },
    fetchTutorials: async () => {
      const token = sessionWriteToken;
      const res = await call<Tutorial[]>("/api/tutorials");
      if (res.ok) guardedSet(() => set({ tutorials: res.data }), token);
    },
    fetchAchievements: async () => {
      const token = sessionWriteToken;
      const res = await call<AchievementsData>("/api/achievements");
      if (res.ok) guardedSet(() => set({ achievements: res.data }), token);
    },
    fetchDashboard: async () => {
      const token = sessionWriteToken;
      const res = await call<DashboardData>("/api/dashboard");
      if (res.ok) guardedSet(() => set({ dashboard: res.data }), token);
    },

    ...(() => {
      const workouts = crud<Workout>("/api/workouts", async () => {
        await get().fetchWorkouts();
        await get().fetchDashboard();
      });
      const moods = crud<MoodEntry>("/api/mood-entries", async () => {
        await get().fetchMoodEntries();
        await get().fetchDashboard();
        await get().fetchAchievements();
      });
      const assignments = crud<Assignment>("/api/assignments", async () => {
        await get().fetchAssignments();
        await get().fetchDashboard();
      });
      const events = crud<EventItem>("/api/events", async () => {
        await get().fetchEvents();
        await get().fetchDashboard();
      });
      const resources = crud<StudyResource>("/api/study-resources", async () => {
        await get().fetchStudyResources();
      });
      const reminders = crud<Reminder>("/api/reminders", async () => {
        await get().fetchReminders();
        await get().fetchDashboard();
      });
      const goals = crud<Goal>("/api/goals", async () => {
        await get().fetchGoals();
        await get().fetchAchievements();
        await get().fetchDashboard();
      });
      const routines = crud<UserRoutine>("/api/routines", async () => {
        await get().fetchRoutines();
      });
      return {
        createWorkout: workouts.create,
        deleteWorkout: workouts.remove,
        createMoodEntry: moods.create,
        deleteMoodEntry: moods.remove,
        createAssignment: assignments.create,
        updateAssignment: assignments.update,
        deleteAssignment: assignments.remove,
        createEvent: events.create,
        updateEvent: events.update,
        deleteEvent: events.remove,
        createStudyResource: resources.create,
        updateStudyResource: resources.update,
        deleteStudyResource: resources.remove,
        createReminder: reminders.create,
        updateReminder: reminders.update,
        deleteReminder: reminders.remove,
        createGoal: goals.create,
        updateGoal: goals.update,
        deleteGoal: goals.remove,
        createRoutine: routines.create,
        updateRoutine: routines.update,
        deleteRoutine: routines.remove,
        viewTutorial: async (id: string) => {
          const res = await call<Tutorial>("/api/tutorials/view", {
            method: "POST",
            body: JSON.stringify({ id }),
          });
          if (res.ok) await get().fetchTutorials();
          return res;
        },
      };
    })(),
  };
});
