/**
 * Layout-system contracts — Wellness Hub.
 *
 * The generic shell/dialog/control records carried over from the chassis
 * keep their battle-tested geometry (the Radix dialog family, the select/
 * checkbox/tab contracts the ui/ kit pins); the CRM records retired with
 * their consumers. The wellness-specific records (NAV_LAYOUT's light
 * sidebar, the stat grids, the gradient headings) are live-pinned to the
 * reference's DOM (computed-style probes 2026-10-29 — see
 * docs/plans/2026-10-29-wellness-hub-build.md §1.3).
 */

/** The app shell — the reference's model: the LIGHT sidebar is an in-flow
 *  flex child (visible from md), the main column's `main` owns scrolling,
 *  and on phones the chrome is the sticky glass header. WH-15: the
 *  redeployed reference carries two shell washes (probed live — the root
 *  from-slate-50 via-white to-slate-50 at to-br; the sidebar from-white
 *  via-gray-50 to-white) where ours shipped solid tokens; the dark
 *  variants ride our neutral tokens (the reference's own dark mode is
 *  the partially-broken surface our token system supersedes). */
export const SHELL_LAYOUT = {
  root: "flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
  sidebar:
    "hidden md:flex w-64 shrink-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 text-sidebar-foreground flex-col border-r border-line",
  mainColumn: "flex-1 flex flex-col min-w-0",
  main: "flex-1 overflow-y-auto bg-background",
} as const;

export const APP_FOOTER = {
  // WH-20 (F-3): the footer shipped ZERO dark pairs — a white strip on
  // every dark module page (the loudest possible island; both dark walks
  // passed it because its self-contrast is AA-fine — the WH-19
  // light-island class, the 404's twin, on the most-travelled surface).
  footer:
    "border-t border-gray-200 bg-white px-4 sm:px-8 py-4 text-sm text-gray-500 flex flex-wrap items-center gap-x-5 gap-y-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400",
  link: "hover:text-gray-800 transition-colors dark:hover:text-neutral-200",
  copyright: "© 2026 Wellness Hub",
  note: "Made with 💜 for your wellbeing",
} as const;

/** The per-module page identity — the reference's 2026-10-30 redesign
 *  (probed live on all 11 pages after its redeployment: the stylesheet
 *  moved index-eZhxKCJC.css → index-heGLHP2e.css). Every module page
 *  carries: a page-root WASH (`bg-gradient-to-br from-<m1>-50 via-white
 *  to-<m2>-50/30` — the dark variants ride our neutral tokens, the
 *  documented superset over the reference's partially-broken dark), a
 *  HEADING gradient (the module's 600-family stops on a `text-4xl` H1
 *  with `mb-2`), a BUTTON pair (the module's 500-family stops — the
 *  FIXED palette classes, NOT theme tokens: verified live, applying the
 *  reference's Ocean Blue preset re-skinned its brand surfaces while the
 *  Exercise button stayed orange→red), and a CONTAINER (`max-w-{5,6,7}xl
 *  mx-auto space-y-8` — the reference's per-page width). `stacked`
 *  selects the header form: the four pages whose H1 spans the full row
 *  (Dashboard, Routines, Learning, Profile — probed at 960px block)
 *  vs the seven action pages whose flex-col md:flex-row header
 *  shrink-wraps it. */
export type PageTheme = {
  /** The page root: the module wash + the reference's `p-4 md:p-8`. */
  root: string;
  /** The H1's gradient stops (composed onto PAGE_HEADER.title). */
  heading: string;
  /** The primary button's gradient classes (composed onto
   *  GRADIENT_BUTTON_COMPACT via GradientButton's `gradient` prop). */
  button: string;
  /** The content container. */
  container: string;
  /** The header form: block (H1 full-width) vs the flex action row. */
  stacked: boolean;
};

export const PAGE_THEMES: Record<
  "dashboard" | "routines" | "exercise" | "mentalhealth" | "assignments" | "events" | "studyresources" | "reminders" | "learning" | "goals" | "profile",
  PageTheme
> = {
  dashboard: {
    root: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-indigo-600 via-purple-600 to-pink-600",
    button: "",
    container: "max-w-7xl mx-auto space-y-8",
    stacked: true,
  },
  routines: {
    root: "min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-purple-600 via-pink-600 to-rose-600",
    // WH-22: the routines MODULE pair — the Schedule modal's primary (the
    // reference's own: probed on two different-category templates, both
    // render purple→pink — the module family, never the template
    // category's gradient, never the brand pair). The slot was empty
    // since WH-15 (the stacked pages carry no header button); the
    // Schedule modal is its consumer.
    button: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    container: "max-w-7xl mx-auto space-y-8",
    stacked: true,
  },
  exercise: {
    root: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-orange-600 to-red-600",
    button: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
    container: "max-w-6xl mx-auto space-y-8",
    stacked: false,
  },
  mentalhealth: {
    root: "min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-emerald-600 to-teal-600",
    button: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
    container: "max-w-6xl mx-auto space-y-8",
    stacked: false,
  },
  assignments: {
    root: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-blue-600 to-cyan-600",
    button: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
    container: "max-w-6xl mx-auto space-y-8",
    stacked: false,
  },
  events: {
    root: "min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-violet-600 to-purple-600",
    button: "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600",
    container: "max-w-7xl mx-auto space-y-8",
    stacked: false,
  },
  studyresources: {
    root: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-blue-600 to-indigo-600",
    button: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
    container: "max-w-7xl mx-auto space-y-8",
    stacked: false,
  },
  reminders: {
    root: "min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-rose-600 to-purple-600",
    button: "bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600",
    container: "max-w-6xl mx-auto space-y-8",
    stacked: false,
  },
  learning: {
    root: "min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-amber-600 to-orange-600",
    button: "",
    container: "max-w-7xl mx-auto space-y-8",
    stacked: true,
  },
  goals: {
    root: "min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-yellow-600 via-amber-600 to-orange-600",
    button: "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700",
    container: "max-w-7xl mx-auto space-y-8",
    stacked: false,
  },
  profile: {
    root: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 md:p-8 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900",
    heading: "from-indigo-600 to-purple-600",
    button: "",
    container: "max-w-5xl mx-auto space-y-8",
    stacked: true,
  },
};

/** The routines page's per-category gradients (the reference's card
 *  top bars + "Use This Template" buttons, probed on all 11 seeded
 *  templates in grid order — the category→pair mapping is exact). */
export const ROUTINE_CATEGORY_GRADIENTS: Record<string, string> = {
  morning: "bg-gradient-to-r from-amber-500 to-orange-500",
  exercise: "bg-gradient-to-r from-red-500 to-pink-500",
  study: "bg-gradient-to-r from-blue-500 to-cyan-500",
  evening: "bg-gradient-to-r from-indigo-500 to-purple-500",
  self_care: "bg-gradient-to-r from-emerald-500 to-teal-500",
  creative: "bg-gradient-to-r from-pink-500 to-rose-500",
  productivity: "bg-gradient-to-r from-violet-500 to-purple-500",
};

/** The bare gradient-stop pair for a routine category (the card's h-2
 *  top bar — the buttonless form of ROUTINE_CATEGORY_GRADIENTS). WH-24:
 *  the map's members are BARE pairs — the reference's Use This Template
 *  button carries NO 600 hover arms (its hover is opacity-90 alone,
 *  probed live); the MODULE primaries are the family that darkens its
 *  stops on hover (PAGE_THEMES' buttons, probed live on New Event + Log
 *  Workout — a different button family entirely). */
export const routineCategoryStops = (category: string): string =>
  (ROUTINE_CATEGORY_GRADIENTS[category] ?? ROUTINE_CATEGORY_GRADIENTS.morning)
    .split(" ")
    .filter((cls) => cls.startsWith("from-") || cls.startsWith("to-"))
    .join(" ");

/** Sidebar navigation — the reference's LIGHT sidebar: zinc-700 menu
 *  text, rounded-xl menu buttons. WH-15 (the redesign, probed live on the
 *  redeployed reference): the brand wordmark and badge ride the 135deg
 *  to-br brand gradient (ours shipped to-r), the badge is rounded-2xl
 *  (16px), and the ACTIVE item is the gradient pill — white text on the
 *  to-br brand gradient (the pre-redesign indigo wash is gone). */
export const NAV_LAYOUT = {
  brand: "px-6 pt-6 pb-4 flex items-center gap-3",
  brandBadge:
    "w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg",
  brandWordmark:
    "font-bold text-lg bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent",
  brandSubtitle: "text-xs text-muted -mt-0.5",
  container: "flex-1 px-3 space-y-1 flex flex-col overflow-y-auto scrollbar-thin",
  group: "space-y-1",
  link: "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  linkActive:
    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-primary to-secondary shadow-lg transition-colors hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  icon: "h-5 w-5 shrink-0",
  label: "truncate",
  footerGroup: "space-y-1 border-t border-line px-3 pt-3 pb-4",
  footerLink:
    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-muted transition-colors hover:bg-sidebar-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
} as const;

/** The mobile glass header (the reference's own chrome). WH-15: the
 *  title rides the 135deg to-br brand gradient (probed — ours shipped
 *  to-r). */
export const MOBILE_HEADER = {
  bar: "sticky top-0 z-10 md:hidden bg-white/60 dark:bg-black/50 backdrop-blur-xl border-b border-gray-100 px-4 py-4 flex items-center justify-between",
  title:
    "font-bold text-lg bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent",
  trigger:
    "md:hidden inline-flex items-center justify-center rounded-md h-10 w-10 text-muted hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
} as const;

export const MOBILE_NAV_LAYOUT = {
  drawerRange: "md:hidden",
  autoCloseQuery: "(min-width: 768px)",
} as const;

/** The mobile drawer — a left-anchored Radix Sheet (the chassis's proven
 *  construction: the reference's own mobile-nav fix), re-skinned to the
 *  light sidebar family. */
export const MOBILE_NAV_SHEET = {
  content:
    "fixed z-50 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out inset-y-0 left-0 h-full data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left w-72 border-0 bg-sidebar p-0 text-sidebar-foreground",
  header: "flex flex-col space-y-1 p-6",
  title: "text-left text-lg font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-0",
  description: "text-xs text-muted",
  nav: "flex flex-col gap-1 px-3",
  navFooter: "mt-4 flex flex-col gap-1 border-t border-line px-3 pt-4 pb-6",
  link: "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-hover hover:text-sidebar-foreground",
  linkActive:
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white bg-gradient-to-br from-primary to-secondary shadow-lg transition-colors hover:opacity-95",
  footerLink:
    "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  footerAvatar:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white",
  footerTitle: "text-sm font-semibold text-foreground leading-tight",
  footerSubtitle: "text-xs text-muted",
  icon: "h-5 w-5",
} as const;

/** WH-28 (F-1): the mood list "Your Journey" entry interior — probed
 *  LIVE on the reference's demo data (the surface was "data-blocked"
 *  through WH-27; the demo account's existing row opened it read-only).
 *  The reference's entry (the full DOM decode):
 *  `p-6 rounded-2xl border border-gray-100 hover:shadow-lg
 *  transition-all` tiles in a `space-y-4` DIV (16px gap — ours shipped
 *  ul/space-y-3), the `flex items-start gap-4` row with the 64px
 *  blue→cyan emoji chip, and the label row `flex items-center
 *  justify-between mb-2` carrying the label as an H4 at `text-lg`
 *  (18px — ours shipped a 14px p) with the date as its OWN right-side
 *  span at `text-sm text-gray-500` (justify-between spreads them —
 *  ours folded the date inline after the label). The dark twins are
 *  our documented superset (the reference's list is light-only). */
export const MOOD_ENTRY_LIST = {
  container: "space-y-4",
  tile: "p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all dark:border-neutral-800",
  row: "flex items-start gap-4",
  chip: "w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg",
  labelRow: "flex items-center justify-between mb-2",
  label: "font-semibold text-lg text-gray-900 dark:text-gray-100",
  date: "text-sm text-gray-500 dark:text-gray-400",
  energy: "text-sm text-gray-600 mb-3 dark:text-gray-400",
} as const;

/** The Goals page's Achievements rows — WH-29 (F-G), decoded from the
 *  reference's own compiled bundle (`/assets/index-Bn9GF0-W.js`, the
 *  GU() goals component): its Achievement entity is a PER-USER row
 *  table (the demo account carries ZERO rows — the empty state is the
 *  FACE, not a data gap), rendered as a vertical space-y-3 list of
 *  earned/unearned tiles. The decoded template:
 *
 *    <div class="p-4 rounded-xl border transition-all
 *         bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
 *      <div class="flex items-start gap-3">
 *        <div class="text-3xl">{badge_icon || "🏆"}</div>
 *        <div class="flex-1">
 *          <h5 class="font-semibold text-gray-900 mb-1">{name}</h5>
 *          <p class="text-xs text-gray-600 mb-2">{description}</p>
 *          <div class="flex items-center justify-between">
 *            <Badge variant="outline" class="text-xs">{category…}</Badge>
 *            {earned && <span class="text-xs text-amber-600 font-semibold">
 *              +{points} pts</span>}
 *          </div>
 *        </div>
 *      </div>
 *    </div>
 *
 *  TWO documented deviations (PAD §11): the category chip OMITS — the
 *  reference's platform rows carry a category whose values are
 *  unobservable at zero rows and our Badge model has no category
 *  column (inventing one is not decode) — and the points span rides
 *  justify-end (the reference's justify-between carries its category
 *  chip on the left; with the chip omitted, the right-side placement
 *  is the face). Our dark twins follow the amber tip-box convention. */
export const ACHIEVEMENT_TILE = {
  container: "space-y-3",
  tile: "p-4 rounded-xl border transition-all bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-950/40 dark:to-amber-950/40 dark:border-yellow-900",
  inner: "flex items-start gap-3",
  icon: "text-3xl",
  name: "font-semibold text-gray-900 mb-1 dark:text-gray-100",
  description: "text-xs text-gray-600 mb-2 dark:text-gray-400",
  row: "flex items-center justify-end",
  points: "text-xs text-amber-600 font-semibold dark:text-amber-400",
} as const;

/** Page header — the redesign's anatomy: a `text-4xl` gradient H1 (the
 *  module's stops land via the theme, `mb-2` against the subtitle), a
 *  `text-gray-600` subtitle, right-aligned actions. The ROW form is the
 *  seven action pages' flex header; the four stacked pages (Dashboard,
 *  Routines, Learning, Profile) render the bare block so the H1 spans
 *  the full container width — the gradient covers the row, exactly the
 *  reference's probed geometry (960px span, ~310px text). */
export const PAGE_HEADER = {
  row: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
  title:
    "text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2",
  subtitle: "text-gray-600 dark:text-gray-400 mt-1",
  actions: "flex gap-2 w-full md:w-auto",
  buttonStretch: "w-full md:w-auto",
} as const;

/** KPI stat-card rows. WH-15: the container's `space-y-8` owns the
 *  vertical rhythm (the reference's per-page container) — the grids
 *  carry no margin of their own, and the gap rides the reference's
 *  `gap-6` (probed: 3×304 + 2×24 = 960). */
export const PAGE_KPI_GRIDS = {
  three: "grid grid-cols-1 sm:grid-cols-3 gap-6",
  four: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
} as const;

/** The stat-card family — the dashboard's WHITE tiles (probed live
 *  field-by-field WH-23: the card + the 5%-opacity gradient WASH that
 *  intensifies to 10% on hover + a `relative p-6` content wrapper that
 *  sits above the wash + a `flex items-start justify-between mb-4` icon
 *  row + the bare `p-3 rounded-2xl` gradient iconTile carrying a
 *  `w-6 h-6 text-white` default-stroke icon + the mb-1 label/value
 *  rhythm + the gray-500 sub). The module pages' HERO tiles moved to
 *  MODULE_KPI at WH-23 (with their big right icons ours never shipped). */
export const STAT_CARD = {
  card: "relative overflow-hidden rounded-xl border-none bg-surface shadow-lg hover:shadow-xl transition-all duration-300 group",
  wash: "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
  /** WH-23: the content wrapper — the reference's `relative p-6` div
   *  between the wash and the tile's rows (the positioned wrapper is
   *  what paints the content above the absolute wash). */
  content: "relative p-6",
  iconRow: "flex items-start justify-between mb-4",
  iconTile: "p-3 rounded-2xl bg-gradient-to-br shadow-lg",
  value: "text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1",
  label: "text-sm font-medium text-gray-600 dark:text-gray-400 mb-1",
  sub: "text-sm text-gray-500 dark:text-gray-400",
} as const;

/** The module KPI tiles — WH-23 (probed field-by-field on all five
 *  pages): the reference's form is a `p-6 pt-6` wrapper + a `flex
 *  items-center justify-between` row carrying the label+value LEFT and
 *  a BIG `w-12 h-12` module-tinted icon RIGHT (ours shipped no icons at
 *  all), the hero labels in the module's -100 tint (`text-<m>-100
 *  text-sm mb-1`), the plain labels `text-gray-600 text-sm mb-1` (no
 *  font-medium), the values `text-4xl font-bold`. The per-tile tints
 *  and icons are authored at the call sites exactly as the reference's
 *  are. The hero label inks on the gradient cards are the
 *  gradient-ink family's -100-tint members (reference-shared, low
 *  contrast — the PAD §11 family row documents them). */
export const MODULE_KPI = {
  hero: "rounded-xl border-none shadow-lg bg-gradient-to-br text-white",
  wrap: "p-6 pt-6",
  row: "flex items-center justify-between",
  heroLabel: "text-sm mb-1",
  label: "text-gray-600 text-sm mb-1 dark:text-gray-400",
  heroValue: "text-4xl font-bold",
  value: "text-4xl font-bold text-gray-900 dark:text-gray-100",
  bigIcon: "h-12 w-12",
} as const;

/** Section card — the white list/panel cards. WH-15 probed the card
 *  face (border-none shadow-lg); WH-23 walked the GEOMETRY: the
 *  reference's list cards everywhere ride the shadcn CardHeader/
 *  CardContent anatomy — `flex flex-col space-y-1.5 p-6` (NO bottom
 *  border), the title `font-semibold leading-none tracking-tight` with
 *  the header icon INSIDE the title row (`w-5 h-5`, inherited ink —
 *  never muted), the body `p-6 pt-0`. Ours shipped a px-5 py-4 header
 *  with a border-b and a p-5 body for twenty-three rounds. */
export const SECTION_CARD = {
  card: "bg-surface text-ink rounded-xl border-none shadow-lg",
  header: "flex flex-col space-y-1.5 p-6",
  title: "font-semibold leading-none tracking-tight",
  titleRow: "flex items-center gap-2",
  body: "p-6 pt-0",
} as const;

/** The Quick Actions — WH-23 (the round's declared target, probed live
 *  with a real pointer): the reference's card rides the CardHeader/
 *  CardContent forms, the grid is `grid grid-cols-2 gap-3` (a 12px gap —
 *  NO dividers), and each cell is a fixed `h-24` full-width column of
 *  icon+label whose hover family is an ICON SCALE (group-hover:scale-110
 *  transition-transform) + a label lighten (hover:text-accent-foreground
 *  ≈ neutral-900) — NO background wash, NO icon color change (probed:
 *  the cell bg stays transparent through the hover; the icon stays
 *  text-gray-700). The per-module gradient arms in the reference's cell
 *  string are DEAD v3-era forms (`from-* to-*` without a gradient
 *  utility, `bg-opacity-*` with no bg color — computed transparent at
 *  rest and hover on the reference, verified) — mirrored byte-for-byte
 *  per the parity doctrine. Our cells stay `<Link>` anchors (the
 *  reference's `<a><button>` nesting is invalid HTML — the documented
 *  superset class). Dark twins: the icon gray-400 + the hover arm's
 *  neutral-100 (the interaction-arm census). */
export const QUICK_ACTIONS = {
  header: "flex flex-col space-y-1.5 p-6",
  title: "font-semibold leading-none tracking-tight flex items-center gap-2",
  body: "p-6 pt-0",
  grid: "grid grid-cols-2 gap-3",
  /** The cell base — the reference's stock shadcn button base + the
   *  outline arms + the cell geometry, self-contained (the lesson-25
   *  form: never composing BUTTON_CLASSES, whose inline-flex/
   *  transition-colors arms fight this column-stacked transition-all
   *  anatomy). Our additions: the explicit text-ink (the reference
   *  inherits its card foreground through the button) + the hover arm
   *  as the literal neutral-900 (the reference's accent-foreground
   *  token computes rgb(23,23,23)) + the dark twin. NOTE the
   *  `[&_svg]:size-4`: the reference's own cell carries it and it
   *  WINS the cascade over the svg's own w-6 h-6 (higher specificity)
   *  — the reference's icon computes 16px (probed), so ours must carry
   *  the arm too. */
  cell: "whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm px-4 py-2 w-full h-24 flex flex-col items-center justify-center gap-2 border-none bg-opacity-5 hover:bg-opacity-10 transition-all group text-ink hover:text-neutral-900 dark:hover:text-neutral-100",
  pairs: {
    exercise: "from-orange-500 to-red-500",
    mentalhealth: "from-emerald-500 to-teal-500",
    assignments: "from-blue-500 to-cyan-500",
    events: "from-violet-500 to-purple-500",
  },
  icon: "h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform dark:text-gray-400",
  label: "text-sm font-medium",
} as const;

/** The Learning tutorial cards — WH-24 (the one card family WH-23 did
 *  not walk, probed live field-by-field with a real pointer): a
 *  GROUP-HOVER REVEAL family — the card is the `group`, the cover's img
 *  SCALES to 1.05 (`group-hover:scale-105 transition-transform
 *  duration-300`), the scrim is INVISIBLE at rest (`bg-black/0`) going
 *  20% black on hover, and the Watch Now button is a rounded-md
 *  RECTANGLE (the stock base + `shadow h-9 px-4 py-2`) that fades from
 *  `opacity-0` to `opacity-100` on card hover — NEVER our permanent
 *  scrim + always-visible rounded-full pill. The body rides the
 *  CardHeader/CardContent anatomy (the `p-6` header holding the
 *  `flex items-start justify-between gap-2 mb-2` title row + the gap-2
 *  chips row; the `p-6 pt-0` body holding the line-clamp-3 description),
 *  the title is `text-lg` with `line-clamp-2` + `tracking-tight` (18px,
 *  clamped — ours shipped 16px unclamped), and the grid is `gap-6` with
 *  2-col from md / 3-col from lg (ours shipped gap-5 with sm/xl arms).
 *  Our h3 title keeps heading semantics (the SectionCard superset
 *  precedent); the dark twins follow the WH-23 pattern. */
export const TUTORIAL_CARD = {
  card: "overflow-hidden rounded-xl border-none bg-surface shadow-lg hover:shadow-xl transition-all group",
  cover: "relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden dark:from-neutral-800 dark:to-neutral-900",
  img: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
  overlay: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center",
  /** The stock shadcn base + the reveal arms (self-contained per the
   *  lesson-25 form — the reference's own string, minus nothing; its
   *  Play icon carries `w-5 h-5 mr-2` at the call site). The dark twin
   *  on the hover arm declares the mode-independent VALUE explicitly —
   *  the button's face is white in both modes, so the wash stays
   *  gray-100 in dark exactly as in light (the dark-pair census's
   *  structural contract). */
  watchBtn:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-100",
  duration: "absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded",
  header: "flex flex-col space-y-1.5 p-6",
  titleRow: "flex items-start justify-between gap-2 mb-2",
  title: "font-semibold tracking-tight text-lg line-clamp-2",
  chipsRow: "flex flex-wrap gap-2",
  body: "p-6 pt-0",
  desc: "text-sm text-gray-600 line-clamp-3 dark:text-gray-400",
  grid: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
} as const;

/** The module toolbar — WH-24 (probed live on the reference's Learning +
 *  StudyResources pages, desktop + 390px): the container `flex flex-col
 *  md:flex-row gap-4` (16px gaps, row from md), the search a STOCK
 *  Input + `pl-10` in a `flex-1 relative` wrapper with the Search icon
 *  `absolute left-3 top-1/2 h-5 w-5 text-gray-400` (ours shipped a
 *  hand-rolled py-2 text-sm shadow-xs pl-9 string with an h-4 w-4 muted
 *  icon), and the selects in a `flex items-center gap-2` wrapper LED by
 *  the lucide Filter icon `w-5 h-5 text-gray-400` at FIXED widths
 *  (w-48 the category select / w-40 the pair — fixed at every viewport;
 *  ours shipped w-full-sm: breakpoints with no wrapper and no icon). */
export const TOOLBAR = {
  container: "flex flex-col md:flex-row gap-4",
  searchWrap: "flex-1 relative",
  searchIcon: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400",
  selectsWrap: "flex items-center gap-2",
  filterIcon: "h-5 w-5 text-gray-400",
} as const;

/** The Events calendar card — WH-24 (the calendar escaped the WH-23
 *  card-geometry cure because it never rides the SectionCard component;
 *  probed live): the card rides the CardHeader/CardContent anatomy —
 *  the `p-6` header wrapping the TITLE ROW `font-semibold leading-none
 *  tracking-tight flex items-center justify-between` (the title classes
 *  ON the row, the month text a bare span — our h2 keeps the heading
 *  semantics carrying the same classes), the nav row `flex gap-2` of
 *  the stock OUTLINE trio (`h-8 rounded-md px-3 text-xs` — computed:
 *  the border rgb(229,229,229), the bg white, the hovered bg
 *  rgb(245,245,245) = our line-soft, the hovered label rgb(23,23,23))
 *  with TEXT arrows ←/→ (no lucide glyphs — our aria-labels stay, the
 *  superset), the body `p-6 pt-0` wrapping the BARE `grid grid-cols-7
 *  gap-2` (ours shipped the grid padding p-4 pt-2), and the day numbers
 *  `text-sm font-medium mb-1` with the events container `space-y-1`
 *  (ours shipped no mb-1 + a flex-wrap row). The day-cell borders +
 *  hover + the today-cell gradient were ALREADY parity (verified with a
 *  real pointer). */
export const CALENDAR = {
  headerRow: "font-semibold leading-none tracking-tight flex items-center justify-between",
  navRow: "flex gap-2",
  /** The nav button — BUTTON_CLASSES + the outline arms in our
   *  computed-equal tokens (border-line = the reference's border-input's
   *  rgb(229,229,229); bg-surface = its white bg-background; the hover
   *  wash the line-soft = its accent's rgb(245,245,245)), plus the
   *  focus arms the reference's own base carries. */
  navBtn:
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-line bg-surface shadow-sm hover:bg-line-soft hover:text-neutral-900 dark:hover:text-neutral-100 h-8 rounded-md px-3 text-xs",
  grid: "grid grid-cols-7 gap-2",
  dayNum: "text-sm font-medium mb-1",
  dayEvents: "space-y-1",
} as const;

/** The Profile appearance panels — WH-17 (F-2): the reference's shadcn
 *  Card anatomy (probed live 2026-10-30 on every Profile panel):
 *  `rounded-xl border bg-card border-none shadow-lg` + the header block
 *  `flex flex-col space-y-1.5 p-6` (title `font-semibold leading-none
 *  tracking-tight flex items-center gap-2` + the w-5 h-5 lucide header
 *  icon — moon/palette/type/image/sparkles per panel) + the body
 *  `p-6 pt-0` (+ space-y-6 on the multi-block panels). Our panels had
 *  carried the build-era `border border-line bg-surface p-5` shell —
 *  the WH-15 redesign's card anatomy reached every module page's
 *  SectionCard but never the Profile panels. */
export const PROFILE_PANEL = {
  card: "bg-surface rounded-xl border-none shadow-lg",
  header: "flex flex-col space-y-1.5 p-6",
  title: "font-semibold leading-none tracking-tight flex items-center gap-2",
  body: "p-6 pt-0",
  bodySpaced: "p-6 pt-0 space-y-6",
  /** WH-25 (probed live): the space-y-4 body form — the Account, the
   *  Background Image and the Preferences cards ride it (ours shipped
   *  the space-y on an inner wrapper div). */
  bodySpaced4: "p-6 pt-0 space-y-4",
} as const;

/** The Profile Preferences rows — WH-25 (probed live): the rows are
 *  `flex items-center justify-between p-4 rounded-lg border` (items-
 *  center, NO gap arm, NO bg wash — ours shipped items-start gap-4
 *  px-4 py-3 bg-line-soft/40), the title `font-medium` (unsized, 16px)
 *  + the subtitle `text-sm text-gray-500`, and the control the NATIVE
 *  bare checkbox `w-5 h-5` (20px — the reference's own form; our <label>
 *  wrapper association stays the a11y superset). */
export const PROFILE_PREFS = {
  row: "flex items-center justify-between p-4 rounded-lg border",
  title: "font-medium",
  subtitle: "text-sm text-gray-500 dark:text-gray-400",
  checkbox: "w-5 h-5",
} as const;

/** The module create-form card — WH-21 (F-2, the modality cure): the
 *  reference's create-forms are INLINE EXPANDING CARDS in the page flow
 *  (probed live 2026-10-31 on its Events page: the form opens with ZERO
 *  overlay layers, every ancestor position:static, no scroll lock; the
 *  card at top=136 directly below the page header, width = the
 *  container's, radius 12, border 0, the shadow-xl stack) — the stock
 *  shadcn Card anatomy (`rounded-xl border bg-card text-card-foreground
 *  border-none shadow-xl` on the reference's own token names; ours rides
 *  the surface/ink tokens) with the header `flex flex-col space-y-1.5
 *  p-6`, a title-only header (the reference carries NO descriptions —
 *  the dialog-era DialogDescriptions retired with the modality), the
 *  body `p-6 pt-0` wrapping ONE `space-y-4` whose LAST child is the
 *  footer (`flex justify-end gap-3` — probed; the dialog footer's
 *  flex-col-reverse form retired with the modality). Only the Routines
 *  "Schedule" flow is a modal on the reference (and ours already
 *  mirrors it). */
export const FORM_CARD = {
  card: "rounded-xl border bg-surface text-ink border-none shadow-xl",
  header: "flex flex-col space-y-1.5 p-6",
  title: "text-base font-semibold leading-none tracking-tight",
  body: "p-6 pt-0",
  footer: "flex justify-end gap-3",
} as const;

/** WH-26 (F-4): the create-forms' trailing-field grid — the reference
 *  pairs the dense fields two-wide at md (probed live on the redeployed
 *  reference, field-by-field on all six sibling forms): events
 *  [Date/Time/Category/Location] · exercise [Type/Duration/Intensity/
 *  Calories/Date] · assignments [Subject/Due/Priority/Hours] ·
 *  reminders [RemindMeOn/Type/Priority/Repeat] · goals ONE grid
 *  [Category/Frequency/Target/Unit/Deadline] · studyresources
 *  [Title/Subject] + [Type/ExamDate] (the URL Link rides a bare group
 *  below). The cell interiors keep the computed-equal 12px label→control
 *  mechanism (the inline-label line box + the control's own mt-2 — the
 *  same face as the space-y-2 groups). */
export const FORM_GRID = {
  grid: "grid md:grid-cols-2 gap-4",
} as const;

/** WH-26 (F-5/F-7): the create-forms' footer/Add buttons — the
 *  reference's STOCK shadcn forms (probed live on the redeployed
 *  reference): the Cancel the OUTLINE variant (`border border-input
 *  bg-background shadow-sm hover:bg-accent hover:text-accent-foreground
 *  h-9 px-4 py-2` — expressed in our computed-equal tokens: --line
 *  #e5e5e5 = its --input, --line-soft #f5f5f5 = its --accent, --surface
 *  = its --background) and the Add the SOLID default variant at the
 *  reference's own --primary value — its --primary is the shadcn stock
 *  zinc rgb(23,23,23), NOT its brand pair (the reference's brand
 *  gradient rides explicit classes; OUR --primary is the indigo brand
 *  pair) — so the fixed neutral-900 classes express its computed face.
 *  The dark twins on the Add are OUR documented superset (the
 *  reference's forms are light-only — its own broken-dark class). */
export const FORM_BUTTONS = {
  cancel:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-line bg-surface shadow-sm hover:bg-line-soft hover:text-ink h-9 px-4 py-2",
  add: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 h-9 px-4 py-2",
} as const;

/** WH-26 (F-6): the tag-chip family — the reference's EMERALD chips
 *  (probed live, client-state on both the mood activities and the sr
 *  tags): `px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full
 *  text-sm flex items-center gap-2` (rgb(209,250,229)/rgb(4,120,87) —
 *  AA at ≈5.9:1) with the × button BARE (zero classes — the reference's
 *  own form; our aria-label stays the association superset) in the
 *  `flex flex-wrap gap-2 mt-3` row. The dark twins are our superset. */
export const TAG_CHIP = {
  chip: "px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center gap-2 dark:bg-emerald-900/50 dark:text-emerald-300",
  row: "flex flex-wrap gap-2 mt-3",
} as const;

/** WH-27 (F-1): the sr form's tags chip — the OTHER family. Probed live
 *  (client-state, the full-HTML decode — the chip renders as a DIV the
 *  WH-26 span-search could never see): the reference's sr chip is the
 *  stock shadcn Badge DEFAULT variant, NOT the mood form's emerald pill
 *  — `inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs
 *  font-semibold transition-colors focus:outline-none focus:ring-2
 *  focus:ring-ring focus:ring-offset-2 text-foreground gap-2` (computed:
 *  22px tall, transparent bg, border rgb(229,229,229), ink rgb(10,10,10))
 *  + the same bare × button, in the chips row `flex flex-wrap gap-2`
 *  BARE (the mood site's mt-3 is its own). Expressed in our
 *  computed-equal tokens (border-line = its border-input's
 *  rgb(229,229,229); text-ink = its text-foreground's rgb(10,10,10) —
 *  the WH-25 token doctrine); the dark twins are our documented superset
 *  (the reference's form is light-only — its own broken-dark class).
 *  The WH-26 conversion generalized the mood decode to this site — the
 *  two-site split is the lesson: probe EVERY consumption site before
 *  converting a shared record. */
export const SR_CHIP = {
  chip: "inline-flex items-center rounded-md border border-line px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-ink gap-2 dark:border-neutral-700 dark:text-neutral-100",
  row: "flex flex-wrap gap-2",
} as const;

/** WH-26 (F-1/F-2/F-3/F-8/F-11): the mood form's own interior — the ONE
 *  create-form that deviates from its space-y-4 siblings (probed live on
 *  the redeployed reference, the full DOM + computed walk): the wrapper
 *  `<form class="space-y-6">` (24px group gaps), the mood label the
 *  stock Label + `mb-4 block` (a 16px label→grid gap — the grid rides
 *  BARE), the active tile's label `text-white` (the F-1 bug: the label
 *  must flip with the tile state, never ride a constant gray — the
 *  constant text-gray-700 rendered GRAY on the blue gradient), the
 *  energy slider the 8px gray-200 track (`w-full h-2 bg-gray-200
 *  rounded-lg appearance-none cursor-pointer` — Chrome keeps a NATIVE
 *  blue thumb under `appearance:none`, pixel-verified; min=1, the value
 *  5) with the Low/High row `flex justify-between text-xs text-gray-500
 *  mt-1`, and the Daily Reflection textarea at h-24 (96px — the
 *  gratitude field keeps the 60px stock form). */
export const MOOD_FORM = {
  label: "mb-4 block",
  grid: "grid grid-cols-2 md:grid-cols-5 gap-3",
  tile: "p-4 rounded-2xl border-2 transition-all text-center",
  active: "bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-transparent shadow-lg scale-105",
  inactive: "border-gray-200 hover:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600",
  icon: "text-4xl mb-2",
  labelActive: "text-sm font-medium text-white",
  labelInactive: "text-sm font-medium text-gray-700 dark:text-gray-400",
  range: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700",
  lowHigh: "flex justify-between text-xs text-gray-500 mt-1 dark:text-gray-400",
} as const;

/** WH-26 (F-9): the studyresources Upload File field — the WH-4 absence
 *  claim ("the reference carries no upload surface anywhere,
 *  live-probed") is FALSE on the redeployed reference: its form carries
 *  a bare stock `<input type="file" class="…stock… flex-1">` inside a
 *  `flex items-center gap-2` row. RENDER-ONLY mirror: the native picker
 *  opens, nothing persists, no /api/upload route (the WH-4 route
 *  retirement pin stays — the PAD §11 row documents the mirror). */
export const UPLOAD_FIELD = {
  wrap: "flex items-center gap-2",
} as const;

/** WH-26 (F-10) + WH-27 (F-2): the sr Rating picker — the reference's five
 *  BARE `text-2xl` buttons in a `flex gap-2` row (probed live). WH-27
 *  corrected the click state: the fill IS interactive — the selected
 *  stars flip to the ⭐ EMOJI (U+2B50), the unselected stay ☆ (probed:
 *  ⭐⭐⭐☆☆ after the 3-star click; the WH-26 "inert" reading was the
 *  probe-regex trap — a ☆/★ regex cannot match the emoji codepoint; the
 *  fill glyph lives at the page's call site). Our radiogroup semantics +
 *  the click-toggle stay the functional superset. */
export const RATING_PICKER = {
  row: "flex gap-2",
  star: "text-2xl",
} as const;

/** The Routines Schedule modal's content — WH-22 (the never-probed
 *  modal's cure): the reference's ONE modal (probed live 2026-10-31,
 *  field-by-field on two templates of different categories — the
 *  module-vs-category question): a 672px (max-w-2xl) panel whose header
 *  is TITLE-ONLY (the description rides the gradient TILE, not a
 *  DialogDescription), the tile a purple→pink gradient-50 wash
 *  (`bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg`)
 *  carrying the description (`text-sm text-gray-700 mb-3`) with the
 *  Remember block NESTED as a `bg-white/80 p-3 rounded-lg` inset (the
 *  ink inherited — rgb(10,10,10)), the steps as per-step gray-50 tiles
 *  (`flex items-start gap-3 p-3 bg-gray-50 rounded-lg`) in a space-y-2
 *  list with SOLID purple-500 white-ink number circles (the FIXED
 *  module pair — the circle's 3.96:1 is reference-shared, pinned by
 *  tests/gradient-ink.test.ts), the title/duration/description as three
 *  separate <p>s, the fields in a `grid gap-4`, and the primary ALONE
 *  at w-full in the module pair (NO Cancel — the corner X is the
 *  dismiss). The dark twins on the tile/inks are OUR superset (the
 *  reference's light-only forms are its own broken-dark class); the
 *  circle + the button pair are mode-independent (the module family,
 *  per the WH-15 identity). */
export const SCHEDULE_MODAL = {
  tile: "bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg dark:from-neutral-800/60 dark:to-neutral-900/60",
  tileDesc: "text-sm text-gray-700 mb-3 dark:text-gray-400",
  remember: "bg-white/80 p-3 rounded-lg dark:bg-neutral-800",
  stepsLabel: "font-semibold mb-3",
  stepsList: "space-y-2",
  stepTile: "flex items-start gap-3 p-3 bg-gray-50 rounded-lg dark:bg-neutral-800/60",
  stepNum: "flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-semibold",
  stepTitle: "font-medium text-sm",
  stepDuration: "text-xs text-gray-600 dark:text-gray-400",
  stepDesc: "text-xs text-gray-500 mt-1 dark:text-gray-400",
  fields: "grid gap-4",
  /** The w-full module-pair primary — the reference's stock shadcn base
   *  + `shadow h-9 px-4 py-2 w-full` + the module pair (the one arm we
   *  drop from the reference's string is the dead `hover:bg-primary/90`
   *  stock-variant leftover — invisible behind the opaque gradient in
   *  every state). */
  button: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 px-4 py-2 w-full ${PAGE_THEMES.routines.button} text-white`,
} as const;

/** The Profile Theme Mode picker — WH-17 (F-2): the reference's border-2
 *  card grid (probed live): `grid grid-cols-3 gap-3` of `p-4 rounded-xl
 *  border-2 transition-all flex flex-col items-center gap-2` cards with
 *  the w-6 h-6 icon above the `font-medium` label — active
 *  `border-indigo-500 bg-indigo-50` (near-black text ≈ 15:1 — FIXED
 *  palette classes, not preset-themeable: the reference's own preset
 *  engine does not re-skin them), inactive
 *  `border-gray-200 hover:border-gray-300`. Our build-era chips (h-10
 *  rounded-md, active `border-primary bg-primary/10 text-primary`)
 *  failed WCAG AA at 3.71:1 on the active state. */
export const THEME_MODE_PICKER = {
  grid: "grid grid-cols-3 gap-3",
  card: "p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
  // WH-18: the active card's explicit near-black — the fixed indigo-50
  // chip in dark mode inherits the DARK foreground (#fafafa on
  // #eef2ff = 1.2:1); the near-black is mode-independent (the WH-17
  // "fixed indigo active pair" completed for the dark state).
  active: "border-indigo-500 bg-indigo-50 text-neutral-900",
  // WH-18: the inactive card's dark border pair (coherence — the fixed
  // gray-200 border rides the light token set).
  inactive: "border-gray-200 hover:border-gray-300 dark:border-neutral-700 dark:hover:border-neutral-600",
  icon: "h-6 w-6",
  label: "font-medium",
} as const;

/** The Profile quick-preset cards — the reference's `p-3 rounded-xl
 *  border hover:shadow-md transition-all text-left` anatomy (probed
 *  live; the reference carries NO visible active state — our active ring
 *  + label is the functional superset, restyled at WH-17 so the label
 *  passes AA: text-foreground over the reference's text-primary at
 *  4.1:1). */
export const PRESET_CARD = {
  card: "p-3 rounded-xl border hover:shadow-md transition-all text-left",
  active: "border-primary ring-1 ring-primary",
  /** WH-25: the reference's swatch row — TWO SOLID CIRCLES (the flex
   *  gap-2 mb-2 row holding two w-6 h-6 rounded-full divs with inline
   *  solid backgrounds — probed live; ours shipped ONE gradient bar
   *  h-8 w-full). The inline colors come from the preset's pair at the
   *  call site. */
  swatches: "flex gap-2 mb-2",
  swatch: "w-6 h-6 rounded-full",
  label: "text-xs font-medium",
  activeLabel: "mt-1 flex items-center gap-1 text-xs text-foreground",
} as const;

/** The primary gradient button — the reference's redesigned family
 *  (probed live): the FIXED palette pairs with -600 hovers (the preset
 *  engine does NOT re-skin these — verified: Ocean Blue left the
 *  reference's indigo/purple save button untouched while the brand
 *  wordmark went sky/cyan). The BIG form is Profile's save (h-10 px-8,
 *  the indigo/purple pair); the COMPACT form is the module pages'
 *  primaries and the dialogs' submits (h-9 px-4 py-2, the pair passed
 *  at the call site via GradientButton's `gradient` prop). */
const GRADIENT_BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white shadow-lg";

export const GRADIENT_BUTTON = `${GRADIENT_BUTTON_BASE} h-10 rounded-md px-8 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600`;

export const GRADIENT_BUTTON_COMPACT = `${GRADIENT_BUTTON_BASE} h-9 rounded-md px-4 py-2`;

export const BUTTON_BASE = {
  focusRing: "focus-visible:ring-1 focus-visible:ring-ring",
  svgSize: "[&_svg]:size-4",
  rounded: "rounded-md",
} as const;

/** The BUTTON_BASE utilities composed (the flat string the pages ride). */
export const BUTTON_CLASSES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

export const INPUT_BASE = {
  size: "text-base md:text-sm",
  bg: "bg-transparent",
  ink: "text-ink",
  placeholder: "placeholder:text-muted-ink",
  transition: "transition-colors",
  focusRing: "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  file: "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
} as const;

/** The form textareas — WH-24 (probed live on EVERY form the reference
 *  renders: events + studyresources + exercise + assignments +
 *  mentalhealth x2 + the Schedule modal — all eight ride the IDENTICAL
 *  stock form): `flex min-h-[60px] w-full rounded-md border border-input
 *  bg-transparent px-3 py-2 text-base shadow-sm ... md:text-sm` — ours
 *  shipped min-h-16/min-h-20 (64/80px) + text-sm-only + shadow-xs
 *  hand-rolled strings (the same family as the toolbar searches; the
 *  mobile 16px text + the 60px floor were never ours). Our token
 *  substitutions compute equal: border-line = the reference's
 *  border-input (#e5e5e5), placeholder:muted-ink = its
 *  muted-foreground (#737373). The mt-2 rides the WH-22-probed field
 *  form (the label+mt-2-input groups). */
export const TEXTAREA_FIELD =
  "mt-2 flex min-h-[60px] w-full rounded-md border border-line bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

/** The empty states — WH-23 (probed: the reference's module empty states
 *  are a BARE centered paragraph, the full body innerHTML carrying no
 *  icon chip — `<p class="text-center text-gray-500 py-12">`); the
 *  dashboard's upcoming empties are the py-8 form; StudyResources ships
 *  its own special card (a `p-6 py-20` body + a big `w-16 h-16`
 *  gray-300 book-open + the text-lg hint). The icon-chip members and
 *  the `icon` prop retired at WH-23. Dark twins are our superset (the
 *  reference's gray-500/gray-300 forms are its own broken-dark class).
 *  Achievements adds `text-sm` per the reference's own card. */
export const EMPTY_STATE = {
  p: "text-center text-gray-500 py-12 dark:text-gray-400",
  dash: "text-gray-500 text-center py-8 dark:text-gray-400",
  study: {
    body: "p-6 py-20 text-center",
    icon: "h-16 w-16 text-gray-300 mx-auto mb-4 dark:text-gray-600",
    text: "text-gray-500 text-lg dark:text-gray-400",
  },
} as const;

/** Login card — the EvolveWell wall (the full ladder's chrome: the
 *  centered card on the soft slate wash, the badge logo, the Google
 *  outline + or-divider + the dark submit). */
export const LOGIN_LAYOUT = {
  page: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-neutral-900 dark:to-neutral-950",
  card: "relative overflow-hidden rounded-2xl border-0 bg-white/95 shadow-2xl backdrop-blur-sm dark:bg-neutral-900/95",
  accent:
    "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800",
  inner: "p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10",
  centered: "flex flex-col items-center text-center space-y-6 sm:space-y-8",
  logoWrap: "relative group",
  logoGlow:
    "absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-40 dark:from-neutral-800 dark:to-neutral-900",
  logoBadge:
    "relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-900 shadow-lg sm:h-24 sm:w-24 dark:from-neutral-800 dark:to-neutral-900 dark:text-slate-300",
  title: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight dark:text-slate-100",
  subtitle: "text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium",
  google:
    "flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 font-medium text-slate-700 text-[16px] transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700 dark:hover:border-neutral-600",
  googleIcon: "-ml-4 transition-transform duration-200",
  divider: "relative my-6",
  dividerLine: "shrink-0 h-[1px] w-full bg-slate-200 dark:bg-neutral-700",
  dividerLabel: "relative flex justify-center text-xs uppercase",
  dividerLabelSpan: "bg-white px-3 font-medium tracking-wider text-slate-500 dark:bg-neutral-900 dark:text-slate-400",
  form: "w-full space-y-4 sm:space-y-5",
  fields: "space-y-3 sm:space-y-4",
  field: "[&>*+*]:mt-1.5",
  label: "text-sm font-medium text-slate-700 dark:text-slate-300",
  inputWrap: "relative",
  inputIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-neutral-400",
  input:
    "h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 placeholder:text-slate-600 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-base md:text-sm sm:h-12 dark:border-neutral-700 dark:bg-neutral-800/60 dark:placeholder:text-slate-500 dark:focus:border-neutral-500 dark:focus:ring-neutral-400",
  submit:
    "flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-slate-900 font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm sm:h-12 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
  footer: "flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0",
  footerLink: "text-sm text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
  footerLinkStrong: "font-medium text-slate-700 dark:text-slate-200",
} as const;

// ---------------------------------------------------------------------------
// UI-kit records — the stock shadcn-family geometry the ui/ components pin
// (carried from the chassis; SELECT_TRIGGER's placeholderState arm and the
// focus rings are the reference's own).
// WH-7: the dashboard-tint map, the card-title record, the dialog-submit
// record, the dropdown menu pair and the search-input padding all retired
// — zero consumers across the tree since the build (the dashboard inlines
// its tints, the WH-4-retired ui/card was the card record's last consumer,
// and the reference's dropdown/search surfaces never shipped). The
// export-census pin owns this module's export surface.
// ---------------------------------------------------------------------------
export const SELECT_TRIGGER = {
  base: "flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-line bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background",
  placeholderState: "data-[placeholder]:text-muted-ink",
  focusRing: "focus:outline-none focus:ring-1 focus:ring-ring",
} as const;

// WH-25: the CHECKBOX record RETIRED with its last consumer and its
// false premise — the WH-21 claim "the reference ships ZERO checkboxes
// (probed live on its Profile → Preferences tab)" was written without
// opening the tab: the live read shows NATIVE bare
// input[type=checkbox] w-5 h-5 controls there. The CRM-chassis custom
// Checkbox (the Session-17 button-role form), its WH-21 dark-state cure,
// its interaction-contrast pin and its a11y (e) leg all shipped on the
// untested premise; the Preferences pair renders the native form (the
// PROFILE_PREFS.checkbox member).

/** The segmented tab control — the Profile page's tablist track. WH-9
 *  (F-2a): the TABS_PILL twin retired with its only consumer (the tabs
 *  `pill` variant, zero call sites since the build) — the value census
 *  owns this module's export surface. */
export const TABS_SEGMENTED = {
  // WH-18: the dark pairs — the track's text-neutral-600 and the active
  // trigger's fixed bg-white both fail on the dark token set (the class
  // flip the theme store performs; the dark: variant itself was the
  // round's root-cause fix).
  track: "h-9 items-center justify-center rounded-lg bg-line-soft p-1 text-neutral-600 dark:text-neutral-400 grid w-full",
  trigger:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow data-[state=active]:bg-white data-[state=active]:text-foreground dark:data-[state=active]:bg-neutral-800",
} as const;

export const DIALOG_CONTENT = {
  base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-line bg-surface p-6 shadow-lg outline-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  /** The wide variant caps at 672px with the scroll-cap pair. */
  wide: "max-w-2xl max-h-[90vh] overflow-y-auto",
} as const;

export const DIALOG_OVERLAY =
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

export const DIALOG_HEADER = "flex flex-col space-y-1.5 text-center sm:text-left";

// WH-22: DIALOG_FOOTER retired with its last consumer (the DialogFooter
// wrapper) — the seven create-forms went inline at WH-21 (the reference's
// modality: the footer `flex justify-end gap-3` rides FORM_CARD.footer
// inside the space-y-4) and the Schedule modal's primary went w-full
// ALONE at WH-22 (the reference's own footer — NO Cancel, the corner X
// is the dismiss). The value census owns this module's export surface.

export const DIALOG_TITLE = "text-lg font-semibold leading-none tracking-tight";

export const DIALOG_CLOSE =
  "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground";

export const DIALOG_GROUP = {
  group: "space-y-2",
  controlMt: "mt-2 mb-0",
} as const;

// WH-8 (F-5): DIALOG_FOOTER_WIDE + DIALOG_TEXTAREA retired with their
// zero-importer wrappers (DialogFooterWide, Textarea) — the value census
// owns the liveness class.

export const NOT_FOUND_LAYOUT = {
  // WH-19 (F-1/F-5): the 404 joins the dark family (it was a full light
  // island under a dark html — the page root stayed bg-slate-50, the
  // error-pages decision's third member error.tsx/global-error.tsx
  // never reached). AND the display heading's light ink is superseded:
  // the reference's own 404 ships slate-300 on slate-50 at 1.42:1 (72px
  // font-light, live-probed on the reference: rgb(203,213,225) on
  // rgb(248,250,252)) — an axe-resolvable AA failure (large text needs
  // 3:1) no walk ever read. Our tree is held to ZERO (the WH-17
  // superset doctrine, the tab-strip precedent): slate-500 in light
  // (4.54:1), neutral-500 in dark (4.18:1) — the documented deviation,
  // PAD §11's ledger.
  page: "min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-neutral-950",
  card: "max-w-md w-full",
  center: "text-center space-y-6",
  headingGroup: "space-y-2",
  h1: "text-7xl font-light text-slate-500 dark:text-neutral-500",
  divider: "h-0.5 w-16 bg-slate-200 dark:bg-neutral-800 mx-auto",
  textGroup: "space-y-3",
  h2: "text-2xl font-medium text-slate-800 dark:text-slate-100",
  p: "text-slate-600 dark:text-slate-400 leading-relaxed",
  pathSpan: "font-medium text-slate-700 dark:text-slate-300",
  buttonGroup: "pt-6",
  homeButton:
    "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:text-slate-300 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:border-neutral-500 dark:focus:ring-neutral-400",
  homeIcon: "w-4 h-4 mr-2",
  homeHref: "/",
} as const;
