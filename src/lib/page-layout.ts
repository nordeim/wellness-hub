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
 *  and on phones the chrome is the sticky glass header. */
export const SHELL_LAYOUT = {
  root: "flex min-h-screen bg-background",
  sidebar: "hidden md:flex w-64 shrink-0 bg-sidebar text-sidebar-foreground flex-col border-r border-line",
  mainColumn: "flex-1 flex flex-col min-w-0",
  main: "flex-1 overflow-y-auto bg-background",
} as const;

export const APP_FOOTER = {
  footer:
    "border-t border-gray-200 bg-white px-4 sm:px-8 py-4 text-sm text-gray-500 flex flex-wrap items-center gap-x-5 gap-y-2",
  link: "hover:text-gray-800 transition-colors",
  copyright: "© 2026 Wellness Hub",
  note: "Made with 💜 for your wellbeing",
} as const;

export const PAGE_ROOT = {
  standard: "p-4 sm:p-6 lg:p-8 bg-background min-h-screen",
  bare: "p-4 sm:p-6 lg:p-8",
} as const;

/** Sidebar navigation — the reference's LIGHT sidebar: bg neutral-50,
 *  zinc-700 menu text, rounded-xl menu buttons, an indigo wash + indigo
 *  bold text on the active item (live-probed 2026-10-29). */
export const NAV_LAYOUT = {
  brand: "px-6 pt-6 pb-4 flex items-center gap-3",
  brandBadge:
    "w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg",
  brandWordmark:
    "font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
  brandSubtitle: "text-xs text-muted -mt-0.5",
  container: "flex-1 px-3 space-y-1 flex flex-col overflow-y-auto scrollbar-thin",
  group: "space-y-1",
  link: "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  linkActive:
    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium bg-primary/10 text-primary font-semibold transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  icon: "h-5 w-5 shrink-0",
  label: "truncate",
  footerGroup: "space-y-1 border-t border-line px-3 pt-3 pb-4",
  footerLink:
    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-muted transition-colors hover:bg-sidebar-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
} as const;

/** The mobile glass header (the reference's own chrome). */
export const MOBILE_HEADER = {
  bar: "sticky top-0 z-10 md:hidden bg-white/60 dark:bg-black/50 backdrop-blur-xl border-b border-gray-100 px-4 py-4 flex items-center justify-between",
  title:
    "font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
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
  title: "text-left text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-0",
  description: "text-xs text-muted",
  nav: "flex flex-col gap-1 px-3",
  navFooter: "mt-4 flex flex-col gap-1 border-t border-line px-3 pt-4 pb-6",
  link: "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-hover hover:text-sidebar-foreground",
  linkActive:
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary shadow-lg transition-colors",
  footerLink:
    "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  footerAvatar:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white",
  footerTitle: "text-sm font-semibold text-foreground leading-tight",
  footerSubtitle: "text-xs text-subtle",
  icon: "h-5 w-5",
} as const;

/** Page header — the reference's anatomy: a gradient H1 (text-3xl
 *  sm:text-4xl, clipped), a muted subtitle, right-aligned actions. */
export const PAGE_HEADER = {
  row: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6",
  title:
    "text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
  subtitle: "text-muted mt-1",
  actions: "flex gap-2 w-full sm:w-auto",
  buttonStretch: "w-full sm:w-auto",
} as const;

/** KPI stat-card rows. */
export const PAGE_KPI_GRIDS = {
  three: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6",
  four: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
} as const;

/** The tinted stat card — the reference's pastel family. */
export const STAT_CARD = {
  card: "rounded-xl p-5 shadow-lg",
  iconChip: "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
  value: "text-3xl font-bold text-gray-900 dark:text-gray-100",
  label: "text-sm font-medium text-muted",
  sub: "text-xs text-subtle",
} as const;

/** Section card — the white list/panel cards. */
export const SECTION_CARD = {
  card: "bg-surface rounded-xl shadow-lg",
  header: "flex items-center gap-2 px-5 py-4 border-b border-line",
  title: "font-semibold text-foreground",
  body: "p-5",
} as const;

/** The primary gradient button (the reference's own family). */
export const GRADIENT_BUTTON =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 rounded-md px-8 bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:from-primary-hover hover:to-secondary-hover";

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
    "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary",
  inner: "p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10",
  centered: "flex flex-col items-center text-center space-y-6 sm:space-y-8",
  logoWrap: "relative group",
  logoGlow:
    "absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-40",
  logo: "relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-xl sm:h-24 sm:w-24",
  logoBadge:
    "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white sm:h-14 sm:w-14",
  title: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight dark:text-slate-100",
  subtitle: "text-slate-500 text-sm sm:text-base font-medium",
  google:
    "flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 font-medium text-slate-700 text-[16px] transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700",
  googleIcon: "-ml-4 transition-transform duration-200",
  divider: "relative my-6",
  dividerLine: "shrink-0 h-[1px] w-full bg-slate-200 dark:bg-neutral-700",
  dividerLabel: "relative flex justify-center text-xs uppercase",
  dividerLabelSpan: "bg-white px-3 font-medium tracking-wider text-slate-500 dark:bg-neutral-900",
  form: "w-full space-y-4 sm:space-y-5",
  fields: "space-y-3 sm:space-y-4",
  field: "[&>*+*]:mt-1.5",
  label: "text-sm font-medium text-slate-700 dark:text-slate-300",
  inputWrap: "relative",
  inputIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500",
  input:
    "h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 placeholder:text-slate-600 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-base md:text-sm sm:h-12 dark:border-neutral-700 dark:bg-neutral-800/60",
  submit:
    "flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-slate-900 font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm sm:h-12 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
  footer: "flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0",
  footerLink: "text-sm text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400",
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
  track: "h-9 items-center justify-center rounded-lg bg-line-soft p-1 text-muted-ink grid w-full",
  trigger:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow data-[state=active]:bg-white data-[state=active]:text-foreground",
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
  page: "min-h-screen flex items-center justify-center p-6 bg-slate-50",
  card: "max-w-md w-full",
  center: "text-center space-y-6",
  headingGroup: "space-y-2",
  h1: "text-7xl font-light text-slate-300",
  divider: "h-0.5 w-16 bg-slate-200 mx-auto",
  textGroup: "space-y-3",
  h2: "text-2xl font-medium text-slate-800",
  p: "text-slate-600 leading-relaxed",
  pathSpan: "font-medium text-slate-700",
  buttonGroup: "pt-6",
  homeButton:
    "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
  homeIcon: "w-4 h-4 mr-2",
  homeHref: "/",
} as const;
