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
    button: "",
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
  morning: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
  exercise: "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600",
  study: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
  evening: "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
  self_care: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
  creative: "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
  productivity: "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600",
};

/** The bare gradient-stop pair for a routine category (the card's h-2
 *  top bar — the buttonless form of ROUTINE_CATEGORY_GRADIENTS). */
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

/** The stat-card family — the redesign's two forms (probed live):
 *  the WHITE tile (a borderless bg-surface card with a 5%-opacity gradient
 *  WASH that intensifies to 10% on hover, a `rounded-2xl` gradient icon
 *  tile, a gray-600 label, a gray-900 value and a gray-500 sub) and the
 *  module HERO tile (the solid gradient card with white text, the label
 *  in the module's -100 tint — the per-module label tints are authored
 *  at the call sites exactly as the reference's per-tile tints are). */
export const STAT_CARD = {
  card: "relative overflow-hidden rounded-xl border-none bg-surface shadow-lg hover:shadow-xl transition-all duration-300 group",
  wash: "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
  iconTile: "p-3 rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center text-white mb-4",
  value: "text-3xl font-bold text-gray-900 dark:text-gray-100",
  label: "text-sm font-medium text-gray-600 dark:text-gray-400",
  sub: "text-sm text-gray-500 dark:text-gray-400",
  hero: "rounded-xl border-none shadow-lg bg-gradient-to-br text-white",
  heroLabel: "text-sm font-medium",
  heroValue: "text-4xl font-bold text-white",
} as const;

/** Section card — the white list/panel cards. WH-15: the redesign's
 *  borderless form (probed: `border-none shadow-lg` on every list
 *  card). */
export const SECTION_CARD = {
  card: "bg-surface rounded-xl border-none shadow-lg",
  header: "flex items-center gap-2 px-5 py-4 border-b border-line",
  title: "font-semibold text-foreground",
  body: "p-5",
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
  swatch: "mb-2 block h-8 w-full rounded-md bg-gradient-to-r",
  label: "text-xs font-medium text-foreground",
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

export const EMPTY_STATE = {
  wrap: "flex flex-col items-center justify-center py-12 text-center",
  icon: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-line-soft",
  iconGlyph: "h-6 w-6 text-muted",
  // WH-9 (F-2b): the `title` face retired with EmptyState's dead title
  // prop — every live call site passes icon + hint only.
  hint: "mt-1 text-sm text-muted",
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

export const CHECKBOX = {
  control:
    "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-900 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=checked]:text-neutral-50",
  indicator: "flex items-center justify-center text-current",
} as const;
// WH-12 (F-2): the `row`/`label` pair retired with its only consumer —
// Checkbox's label-render arm (zero pass sites; both live callers are
// controlled and wrap their own <label>). The value census owns this
// module's export surface — the TABS_PILL/EMPTY_STATE.title precedent.

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

export const DIALOG_FOOTER = "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";

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
