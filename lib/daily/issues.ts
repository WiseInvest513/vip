import "server-only";
import type { DailyIssue, DailyIssueSummary } from "./types";
import { weekly20261109 } from "./weekly/2026-11-09";
import { weekly20261116 } from "./weekly/2026-11-16";

/** Add one immutable issue per week; ordering does not depend on insertion order. */
export const publishedIssues: DailyIssue[] = [weekly20261109, weekly20261116]
  .filter(issue => issue.status === "published")
  .sort((a, b) => b.dateISO.localeCompare(a.dateISO) || b.id.localeCompare(a.id));

export function getPublishedIssues(): DailyIssueSummary[] {
  return publishedIssues.map(({ id, kind, dateISO, date, weekday, periodStartISO, periodEndISO, periodLabel, title }) => ({
    id, kind, dateISO, date, weekday, periodStartISO, periodEndISO, periodLabel, title,
  }));
}

export function getLatestIssue(): DailyIssue | undefined {
  return publishedIssues[0];
}

export function getIssue(id: string): DailyIssue | undefined {
  return publishedIssues.find(issue => issue.id === id);
}
