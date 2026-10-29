// Seed: Wellness Hub demo workspace.
// Idempotent: content tables are wiped and re-seeded (templates, tutorials,
// badges); the demo user lands through UPSERT-BY-EMAIL so session-cookie
// provenance survives a re-seed. Run: bun run db:seed
//
// Demo login (mirrors the reference app): sepnetflix2023@outlook.com / $Abcd1234
//
// Content provenance: the 11 routine templates (with their steps, benefits
// and pro tips) and the 12 Learning Center tutorials are byte-exact
// transcriptions of the reference app's seeded entities, live-decoded from
// its entity API on 2026-10-29 (see docs/plans/2026-10-29-wellness-hub-build.md).

import { PrismaClient } from "@prisma/client";
// The PURE crypto seam (node:crypto-only) — the seed and src/lib/auth.ts
// import the ONE scrypt implementation.
import { hashPassword } from "../src/lib/password";
// Explicit datasource URL: never let the Prisma engine (or bun's .env
// absolutization) pick the database location — the shared resolver pins
// every consumer to <repo>/db/<name> (see src/lib/db-path.ts).
import { runtimeDatabaseUrl } from "../src/lib/db-path";

const db = new PrismaClient({
  datasources: { db: { url: runtimeDatabaseUrl() } },
});

interface SeedStep {
  title: string;
  duration: string;
  description: string;
}

interface SeedTemplate {
  key: string;
  name: string;
  description: string;
  category: string;
  timeOfDay: string;
  duration: string;
  difficulty: string;
  benefits: string[];
  tipsForProcrastinators: string;
  videoUrl: string | null;
  thumbnail: string | null;
  sortOrder: number;
  steps: SeedStep[];
}

interface SeedTutorial {
  key: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string | null;
  thumbnail: string | null;
  duration: string;
  difficulty: string;
  sortOrder: number;
}

const ROUTINE_TEMPLATES: SeedTemplate[] = [
  {
    key: "5_minute_morning_energizer",
    name: "5-Minute Morning Energizer",
    description: "A super quick morning routine to jumpstart your day—perfect when you hit snooze too many times!",
    category: "morning",
    timeOfDay: "Right after waking up",
    duration: "5 minutes",
    difficulty: "easy",
    benefits: ["Increases energy", "Creates momentum", "Improves hydration"],
    tipsForProcrastinators: "Keep a water bottle by your bed so you literally just have to reach for it. The key is starting SUPER small—once you're up and moving, the rest flows naturally!",
    videoUrl: null,
    thumbnail: null,
    sortOrder: 0,
    steps: [
        { title: "Drink a glass of water", duration: "1 min", description: "Rehydrate after sleep" },
        { title: "2-minute stretch", duration: "2 min", description: "Simple stretches in bed or standing" },
        { title: "Make your bed", duration: "2 min", description: "Start with one small win" }
    ],
  },
  {
    key: "10_minute_home_workout",
    name: "10-Minute Home Workout",
    description: "No equipment needed—get your body moving even when you don't feel like it",
    category: "exercise",
    timeOfDay: "Morning or afternoon",
    duration: "10 minutes",
    difficulty: "moderate",
    benefits: ["Boosts energy", "Improves mood", "Builds consistency"],
    tipsForProcrastinators: "Tell yourself you're just doing the warm-up. Once you start moving, your body will want to continue. And if you stop after 2 minutes? That's still better than nothing!",
    videoUrl: null,
    thumbnail: null,
    sortOrder: 1,
    steps: [
        { title: "Warm-up: Jumping jacks", duration: "2 min", description: "Get your heart rate up" },
        { title: "20 squats", duration: "2 min", description: "Focus on form" },
        { title: "10 push-ups (modified OK!)", duration: "2 min", description: "Do what you can" },
        { title: "30-second plank", duration: "2 min", description: "Core strength" },
        { title: "Cool-down stretch", duration: "2 min", description: "Gentle stretching" }
    ],
  },
  {
    key: "the_pomodoro_power_study_session",
    name: "The Pomodoro Power Study Session",
    description: "Beat procrastination with focused 25-minute study bursts",
    category: "study",
    timeOfDay: "Anytime you need to study",
    duration: "30 minutes total",
    difficulty: "easy",
    benefits: ["Improves focus", "Reduces overwhelm", "Makes studying less daunting"],
    tipsForProcrastinators: "Promise yourself just ONE 25-minute session. That's it. No pressure to do more. You'll often find that once you start, you'll want to keep going!",
    videoUrl: null,
    thumbnail: null,
    sortOrder: 2,
    steps: [
        { title: "Set timer for 25 minutes", duration: "0 min", description: "Use your phone or a Pomodoro app" },
        { title: "Study with ZERO distractions", duration: "25 min", description: "Phone away, one task only" },
        { title: "Take a 5-minute break", duration: "5 min", description: "Stand up, stretch, hydrate" }
    ],
  },
  {
    key: "calm_evening_wind_down",
    name: "Calm Evening Wind-Down",
    description: "Prepare your mind and body for better sleep",
    category: "evening",
    timeOfDay: "1 hour before bed",
    duration: "20 minutes",
    difficulty: "easy",
    benefits: ["Better sleep quality", "Reduced anxiety", "Clearer mind"],
    tipsForProcrastinators: "Start with JUST putting your phone away. That's the hardest part. The rest will feel easier once you're not scrolling mindlessly.",
    videoUrl: null,
    thumbnail: null,
    sortOrder: 3,
    steps: [
        { title: "Put phone on Do Not Disturb", duration: "1 min", description: "Reduce blue light exposure" },
        { title: "Light stretching or yoga", duration: "10 min", description: "Release physical tension" },
        { title: "Gratitude journal", duration: "5 min", description: "Write 3 things you're grateful for" },
        { title: "Deep breathing", duration: "4 min", description: "4-7-8 breathing technique" }
    ],
  },
  {
    key: "self_care_sunday_reset",
    name: "Self-Care Sunday Reset",
    description: "Recharge and prepare for the week ahead",
    category: "self_care",
    timeOfDay: "Sunday afternoon/evening",
    duration: "45 minutes",
    difficulty: "easy",
    benefits: ["Reduces Monday anxiety", "Creates structure", "Improves organization"],
    tipsForProcrastinators: "Pick ONE thing from this list. Just one. Even cleaning your desk for 5 minutes counts. Progress over perfection!",
    videoUrl: null,
    thumbnail: null,
    sortOrder: 4,
    steps: [
        { title: "Clean your space", duration: "15 min", description: "Clear desk, make bed, tidy room" },
        { title: "Meal prep for Monday", duration: "15 min", description: "Prepare something easy" },
        { title: "Review weekly goals", duration: "10 min", description: "Plan your week" },
        { title: "Do something fun", duration: "5 min", description: "Read, music, or hobby" }
    ],
  },
  {
    key: "creative_flow_session",
    name: "Creative Flow Session",
    description: "Unlock your creativity without judgment or pressure",
    category: "creative",
    timeOfDay: "When you feel inspired",
    duration: "60 minutes",
    difficulty: "easy",
    benefits: ["Reduces perfectionism", "Builds creative confidence", "Provides stress relief", "Reconnects with your passions"],
    tipsForProcrastinators: "Give yourself permission to make 'bad' art. The goal is process, not product. Just showing up is creative success! 🎨",
    videoUrl: "https://youtube.com/watch?v=example-creative",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    sortOrder: 5,
    steps: [
        { title: "Set up inspiring space", duration: "5 min", description: "Good lighting, music, materials ready" },
        { title: "Warm-up exercise", duration: "10 min", description: "Doodle, free write, improvise—no rules" },
        { title: "Main creative work", duration: "35 min", description: "Create without editing or judging" },
        { title: "Step back and appreciate", duration: "5 min", description: "Acknowledge what you made, no criticism" },
        { title: "Note ideas for next time", duration: "5 min", description: "Capture inspiration while fresh" }
    ],
  },
  {
    key: "quick_productivity_reset",
    name: "Quick Productivity Reset",
    description: "15-minute reboot when you're stuck or overwhelmed",
    category: "productivity",
    timeOfDay: "Whenever needed",
    duration: "15 minutes",
    difficulty: "easy",
    benefits: ["Clears mental fog", "Reduces overwhelm", "Restores motivation", "Creates quick wins"],
    tipsForProcrastinators: "This is your procrastination escape hatch! When stuck, do this routine instead of scrolling. It breaks the paralysis. 🚀",
    videoUrl: "https://youtube.com/watch?v=example-reset",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    sortOrder: 6,
    steps: [
        { title: "Brain dump", duration: "3 min", description: "Write down everything in your head" },
        { title: "Pick ONE thing", duration: "2 min", description: "What's the smallest next step?" },
        { title: "Movement break", duration: "5 min", description: "Walk, dance, stretch—anything physical" },
        { title: "Clean workspace", duration: "3 min", description: "Clear desk = clear mind" },
        { title: "Start that ONE thing", duration: "2 min", description: "Just begin. Progress beats perfection." }
    ],
  },
  {
    key: "energizing_morning_kickstart",
    name: "Energizing Morning Kickstart",
    description: "Start your day with intention and energy—even if you're not a morning person!",
    category: "morning",
    timeOfDay: "7:00 AM - 8:00 AM",
    duration: "30 minutes",
    difficulty: "easy",
    benefits: ["Boosts energy and alertness", "Reduces morning stress", "Creates positive momentum for the day", "Improves focus and productivity"],
    tipsForProcrastinators: "Just do the first step (drink water). Momentum builds naturally. You don't have to be perfect—any start is a good start! 💧",
    videoUrl: "https://youtube.com/watch?v=example-morning",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    sortOrder: 7,
    steps: [
        { title: "Hydrate immediately", duration: "2 min", description: "Drink a full glass of water before anything else" },
        { title: "Light stretching or yoga", duration: "5 min", description: "Gentle movements to wake up your body" },
        { title: "Quick shower", duration: "8 min", description: "End with 30 seconds of cold water for alertness" },
        { title: "Healthy breakfast", duration: "10 min", description: "Protein + complex carbs fuel your brain" },
        { title: "Set 3 intentions for the day", duration: "5 min", description: "Write down your top 3 priorities" }
    ],
  },
  {
    key: "self_care_sunday",
    name: "Self-Care Sunday",
    description: "Weekly reset for your mind, body, and soul",
    category: "self_care",
    timeOfDay: "Sunday afternoon",
    duration: "2 hours",
    difficulty: "easy",
    benefits: ["Reduces Sunday anxiety", "Makes the week feel manageable", "Prioritizes self-compassion", "Creates something to look forward to"],
    tipsForProcrastinators: "Treat this as non-negotiable 'you' time. Future you will thank present you! Start with just the bath if that's all you can manage. 🛁",
    videoUrl: "https://youtube.com/watch?v=example-selfcare",
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    sortOrder: 8,
    steps: [
        { title: "Long bath or shower", duration: "20 min", description: "Add epsom salts, music, candles" },
        { title: "Face mask & skincare", duration: "15 min", description: "Pamper yourself" },
        { title: "Meal prep for the week", duration: "45 min", description: "Prep 3-4 easy meals" },
        { title: "Plan the week ahead", duration: "15 min", description: "Calendar check, to-do list" },
        { title: "Do something purely for joy", duration: "25 min", description: "Read, draw, game, whatever you love" }
    ],
  },
  {
    key: "focused_study_session",
    name: "Focused Study Session",
    description: "Beat procrastination with structured study time that actually works",
    category: "study",
    timeOfDay: "Any focused time block",
    duration: "90 minutes",
    difficulty: "moderate",
    benefits: ["Maximizes retention and understanding", "Prevents burnout", "Builds consistent study habits", "Makes studying feel less overwhelming"],
    tipsForProcrastinators: "Commit to just ONE 25-minute block. Tell yourself you can stop after. Usually you'll want to continue! The hardest part is starting. 📚",
    videoUrl: "https://youtube.com/watch?v=example-study",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    sortOrder: 9,
    steps: [
        { title: "Gather all materials", duration: "5 min", description: "Books, notes, laptop, snacks, water" },
        { title: "Deep work block 1", duration: "25 min", description: "Pure focus on hardest task first (Pomodoro)" },
        { title: "Break: move & hydrate", duration: "5 min", description: "Walk around, stretch, drink water" },
        { title: "Deep work block 2", duration: "25 min", description: "Continue or switch to next priority" },
        { title: "Break: snack & refresh", duration: "10 min", description: "Healthy snack, fresh air if possible" },
        { title: "Deep work block 3", duration: "25 min", description: "Final push or review what you learned" }
    ],
  },
  {
    key: "peaceful_evening_wind_down",
    name: "Peaceful Evening Wind-Down",
    description: "Release the day's stress and prepare for restorative sleep",
    category: "evening",
    timeOfDay: "9:00 PM - 10:00 PM",
    duration: "45 minutes",
    difficulty: "easy",
    benefits: ["Improves sleep quality", "Reduces anxiety", "Creates closure on the day", "Makes mornings easier"],
    tipsForProcrastinators: "Start just 15 minutes before bed. Small rituals compound into better sleep over time. You deserve rest! 🌙",
    videoUrl: "https://youtube.com/watch?v=example-evening",
    thumbnail: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=800",
    sortOrder: 10,
    steps: [
        { title: "No screens for 30 minutes", duration: "30 min", description: "Put phone away and dim lights" },
        { title: "Light journaling", duration: "5 min", description: "Write 3 things you're grateful for" },
        { title: "Gentle stretching", duration: "5 min", description: "Release physical tension" },
        { title: "Calming tea or warm milk", duration: "5 min", description: "Chamomile, lavender, or golden milk" },
        { title: "Prep for tomorrow", duration: "5 min", description: "Lay out clothes, plan breakfast" }
    ],
  },
];

const TUTORIALS: SeedTutorial[] = [
  {
    key: "overcoming_procrastination_the_2_minute_rule",
    title: "Overcoming Procrastination: The 2-Minute Rule",
    description: "Learn the simple trick that helps you start any task, no matter how overwhelming it feels",
    category: "productivity",
    videoUrl: "https://youtube.com/watch?v=example-procrastination",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    duration: "8:45",
    difficulty: "beginner",
    sortOrder: 0,
  },
  {
    key: "building_morning_routines_that_actually_stick",
    title: "Building Morning Routines That Actually Stick",
    description: "Why most morning routines fail and how to create one that works for YOUR life",
    category: "life_skills",
    videoUrl: "https://youtube.com/watch?v=example-morning-routine",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    duration: "12:20",
    difficulty: "beginner",
    sortOrder: 1,
  },
  {
    key: "the_power_of_tiny_habits",
    title: "The Power of Tiny Habits",
    description: "Transform your life by making changes so small you can't fail",
    category: "life_skills",
    videoUrl: "https://youtube.com/watch?v=example-tiny-habits",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    duration: "16:30",
    difficulty: "beginner",
    sortOrder: 2,
  },
  {
    key: "the_science_of_motivation",
    title: "The Science of Motivation",
    description: "Understand what actually drives behavior change (hint: it's not willpower)",
    category: "life_skills",
    videoUrl: "https://youtube.com/watch?v=example-motivation",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    duration: "18:40",
    difficulty: "intermediate",
    sortOrder: 3,
  },
  {
    key: "self_compassion_for_perfectionists",
    title: "Self-Compassion for Perfectionists",
    description: "Learn to be kinder to yourself and break free from all-or-nothing thinking",
    category: "mental_health",
    videoUrl: "https://youtube.com/watch?v=example-self-compassion",
    thumbnail: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800",
    duration: "14:15",
    difficulty: "beginner",
    sortOrder: 4,
  },
  {
    key: "beating_decision_fatigue",
    title: "Beating Decision Fatigue",
    description: "Why you're exhausted by simple choices and how to preserve your mental energy",
    category: "productivity",
    videoUrl: "https://youtube.com/watch?v=example-decision-fatigue",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    duration: "10:50",
    difficulty: "intermediate",
    sortOrder: 5,
  },
  {
    key: "healthy_meal_prep_guide",
    title: "Healthy Meal Prep Guide",
    description: "Simple and nutritious meal prep ideas for a busy lifestyle",
    category: "wellness",
    videoUrl: "https://youtube.com/watch?v=example5",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    duration: "25:30",
    difficulty: "beginner",
    sortOrder: 6,
  },
  {
    key: "building_better_habits",
    title: "Building Better Habits",
    description: "Science-backed strategies for forming lasting positive habits",
    category: "life_skills",
    videoUrl: "https://youtube.com/watch?v=example6",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    duration: "20:15",
    difficulty: "beginner",
    sortOrder: 7,
  },
  {
    key: "mindfulness_meditation_for_anxiety",
    title: "Mindfulness Meditation for Anxiety",
    description: "Learn techniques to calm your mind and reduce anxiety through guided meditation",
    category: "mental_health",
    videoUrl: "https://youtube.com/watch?v=example2",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    duration: "15:00",
    difficulty: "beginner",
    sortOrder: 8,
  },
  {
    key: "effective_study_techniques",
    title: "Effective Study Techniques",
    description: "Master proven study methods to improve retention and ace your exams",
    category: "study_skills",
    videoUrl: "https://youtube.com/watch?v=example3",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    duration: "18:45",
    difficulty: "beginner",
    sortOrder: 9,
  },
  {
    key: "10_minute_morning_yoga_flow",
    title: "10-Minute Morning Yoga Flow",
    description: "Start your day with this energizing yoga sequence perfect for beginners",
    category: "exercise",
    videoUrl: "https://youtube.com/watch?v=example1",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    duration: "10:23",
    difficulty: "beginner",
    sortOrder: 10,
  },
  {
    key: "time_management_mastery",
    title: "Time Management Mastery",
    description: "Learn to prioritize tasks and maximize your productivity",
    category: "productivity",
    videoUrl: "https://youtube.com/watch?v=example4",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
    duration: "22:10",
    difficulty: "intermediate",
    sortOrder: 11,
  },
];

const BADGES = [
  {
    key: "first_workout", name: "First Step", description: "Log your very first workout", icon: "🏃",
    color: "#ef4444", points: 10, sortOrder: 0,
  },
  {
    key: "workout_10", name: "Fitness Enthusiast", description: "Complete 10 workouts", icon: "💪",
    color: "#f97316", points: 25, sortOrder: 1,
  },
  {
    key: "mood_first", name: "Self-Aware", description: "Write your first mood journal entry", icon: "🧘",
    color: "#10b981", points: 10, sortOrder: 2,
  },
  {
    key: "streak_7", name: "7-Day Streak", description: "Journal your mood 7 days in a row", icon: "🔥",
    color: "#f59e0b", points: 50, sortOrder: 3,
  },
  {
    key: "goal_first", name: "Goal Getter", description: "Complete your first goal", icon: "🎯",
    color: "#6366f1", points: 25, sortOrder: 4,
  },
  {
    key: "goals_5", name: "High Achiever", description: "Complete 5 goals", icon: "🏆",
    color: "#a855f7", points: 100, sortOrder: 5,
  },
  {
    key: "assignment_ace", name: "Assignment Ace", description: "Complete 10 assignments", icon: "📝",
    color: "#3b82f6", points: 50, sortOrder: 6,
  },
  {
    key: "wellness_warrior", name: "Wellness Warrior", description: "Earn 500 total points", icon: "⭐",
    color: "#ec4899", points: 100, sortOrder: 7,
  },];

async function main() {
  // Idempotency: wipe domain + content data, keep schema and users.
  await db.userBadge.deleteMany();
  await db.userRoutine.deleteMany();
  await db.routineStep.deleteMany();
  await db.routineTemplate.deleteMany();
  await db.tutorial.deleteMany();
  await db.badge.deleteMany();
  await db.workout.deleteMany();
  await db.moodEntry.deleteMany();
  await db.assignment.deleteMany();
  await db.event.deleteMany();
  await db.studyResource.deleteMany();
  await db.reminder.deleteMany();
  await db.goal.deleteMany();

  // ---- demo user (UPSERT-BY-EMAIL — ids stay stable across re-seeds) ----
  const demo = await db.user.upsert({
    where: { email: "sepnetflix2023@outlook.com" },
    update: {
      name: "sepnetflix2023",
      role: "user",
      verificationCodeHash: null,
      verificationAttempts: 0,
      verificationExpiresAt: null,
      resetToken: null,
      resetTokenExpiresAt: null,
    },
    create: {
      email: "sepnetflix2023@outlook.com",
      name: "sepnetflix2023",
      passwordHash: hashPassword("$Abcd1234"),
      role: "user",
    },
  });
  console.log(`[seed] demo user upserted: ${demo.email}`);

  // ---- routine templates + steps ------------------------------------------
  for (const t of ROUTINE_TEMPLATES) {
    const created = await db.routineTemplate.create({
      data: {
        key: t.key,
        name: t.name,
        description: t.description,
        category: t.category,
        timeOfDay: t.timeOfDay,
        duration: t.duration,
        difficulty: t.difficulty,
        benefits: JSON.stringify(t.benefits),
        tipsForProcrastinators: t.tipsForProcrastinators,
        videoUrl: t.videoUrl || null,
        thumbnail: t.thumbnail || null,
        sortOrder: t.sortOrder,
      },
    });
    let order = 0;
    for (const s of t.steps) {
      await db.routineStep.create({
        data: {
          templateId: created.id,
          title: s.title,
          duration: s.duration,
          description: s.description,
          sortOrder: order++,
        },
      });
    }
  }
  console.log(`[seed] ${ROUTINE_TEMPLATES.length} routine templates seeded`);

  // ---- tutorials -----------------------------------------------------------
  for (const t of TUTORIALS) {
    await db.tutorial.create({
      data: {
        key: t.key,
        title: t.title,
        description: t.description,
        category: t.category,
        videoUrl: t.videoUrl || null,
        thumbnail: t.thumbnail || null,
        duration: t.duration,
        difficulty: t.difficulty,
        sortOrder: t.sortOrder,
      },
    });
  }
  console.log(`[seed] ${TUTORIALS.length} tutorials seeded`);

  // ---- badge catalog --------------------------------------------------------
  for (const b of BADGES) {
    await db.badge.create({
      data: {
        key: b.key,
        name: b.name,
        description: b.description,
        icon: b.icon,
        color: b.color,
        points: b.points,
        sortOrder: b.sortOrder,
      },
    });
  }
  console.log(`[seed] ${BADGES.length} badges seeded`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
