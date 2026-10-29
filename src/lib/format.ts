// Pure date-formatting helpers (unit-tested seam — tests/format.test.ts).
//
// WH-7 (the format.ts retirement): this module's CRM-era subgraph retired —
// the money family (formatCurrency/formatCompactCurrency and their
// session-32/68 fixed-scale variants), the relative-time pair (timeAgo/
// timeUntil), the calendar family (calendarGrid/calendarFetchBounds — the
// events page uses wellness.ts monthGrid, its live twin, pinned separately
// in tests/wellness-helpers.test.ts), and the date primitives that fed only
// that subgraph (isSameDay/startOfDay/endOfDay/addDays/startOfWeek/
// startOfMonth/subMonthsClamped/startOfYear/toLocalInputValue/formatTime).
// Every one of them had ZERO src consumers — the tests that pinned them
// narrated CRM surfaces ("the reports uppercase-K variant", "the Sales
// Target formula", "the topbar hint") that never shipped in this domain.
// The wellness domain computes its own date math (toDayKey/isSameCalendarDay/
// dayDiff/monthGrid in src/lib/wellness.ts — all production-live).
//
// What stays is the surface the nine wellness pages actually render:
// formatDate / formatDateShort / formatMonthYear / formatMonthDayYearTime
// (+ the private MONTHS_SHORT/MONTHS_LONG/asDate feeds). The
// export-census pin owns this module's export surface — a value returns
// only consciously, in the same commit as its consumer.

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function asDate(d: Date | string | number): Date {
  return d instanceof Date ? d : new Date(d);
}

export function formatDate(d: Date | string | number | null | undefined): string {
  if (!d) return "—";
  const date = asDate(d);
  if (Number.isNaN(date.getTime())) return "—";
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatDateShort(d: Date | string | number | null | undefined): string {
  if (!d) return "—";
  const date = asDate(d);
  if (Number.isNaN(date.getTime())) return "—";
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}`;
}

export function formatMonthYear(d: Date | string | number): string {
  const date = asDate(d);
  // Session-45 (S45-P5): the NaN guard — a bad input renders the em-dash
  // convention every other formatter here carries, never "undefined NaN".
  if (Number.isNaN(date.getTime())) return "—";
  return `${MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`;
}

/** Session-82 (M-82c3, bundle-decoded from the reference's card anatomy):
 *  the moment format "MMM D, YYYY h:mm A" (e.g. "Oct 5, 2026 10:00 AM"),
 *  with the year AND the 12-hour time — the reminders list and the
 *  dashboard's upcoming rows carry it. */
export function formatMonthDayYearTime(d: Date | string | number | null | undefined): string {
  if (!d) return "—";
  const date = asDate(d);
  if (Number.isNaN(date.getTime())) return "—";
  let h = date.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${h}:${date.getMinutes().toString().padStart(2, "0")} ${ampm}`;
}
