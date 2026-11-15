import type { DailyIssueSummary } from "./types";

// Calendar arithmetic uses UTC calendar dates, independent of browser timezone.
const DAY = 86400000;
const date = (iso: string) => new Date(`${iso}T00:00:00Z`);
const iso = (value: Date) => value.toISOString().slice(0, 10);
const addDays = (value: Date, days: number) => new Date(value.getTime() + days * DAY);

export function shiftMonth(month: string, offset: number) {
  const value = date(`${month}-01`);
  value.setUTCMonth(value.getUTCMonth() + offset);
  return iso(value).slice(0, 7);
}

export function monthLabel(month: string) {
  return `${month.slice(0, 4)} 年 ${Number(month.slice(5))} 月`;
}

export function weekLabel(startISO: string, month: string) {
  const prefix = startISO.startsWith(month) ? "" : `${startISO.slice(0, 4) === month.slice(0, 4) ? "" : `${startISO.slice(0, 4)}年`}${Number(startISO.slice(5, 7))}月`;
  return `${prefix}第 ${Math.ceil(Number(startISO.slice(8)) / 7)} 周`;
}

export function weekRange(startISO: string, endISO: string) {
  const short = (value: string) => `${Number(value.slice(5, 7))}月${Number(value.slice(8))}日`;
  return `${short(startISO)}–${startISO.slice(0, 4) === endISO.slice(0, 4) ? "" : `${endISO.slice(0, 4)}年`}${short(endISO)}`;
}

export function getCalendarWeeks(month: string, issues: DailyIssueSummary[]) {
  const first = date(`${month}-01`);
  const last = addDays(date(`${shiftMonth(month, 1)}-01`), -1);
  const firstMonday = addDays(first, -((first.getUTCDay() + 6) % 7));
  const weekly = issues.filter(issue => issue.kind === "weekly" && issue.periodStartISO && issue.periodEndISO);
  const weeks = [];
  for (let monday = firstMonday; monday <= last; monday = addDays(monday, 7)) {
    const startISO = iso(monday);
    const endISO = iso(addDays(monday, 4));
    if (endISO < iso(first)) continue;
    weeks.push({
      startISO,
      endISO,
      label: weekLabel(startISO, month),
      issue: weekly.find(issue => issue.periodStartISO === startISO),
    });
  }
  return weeks;
}

/** Months with an article, including both months of a cross-month observation. */
export function getArchiveMonths(issues: DailyIssueSummary[]) {
  const months = new Set<string>();
  for (const issue of issues) {
    if (issue.kind !== "weekly" || !issue.periodStartISO || !issue.periodEndISO) continue;
    months.add(issue.periodStartISO.slice(0, 7));
    months.add(issue.periodEndISO.slice(0, 7));
  }
  return [...months].sort().reverse();
}
