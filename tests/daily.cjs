const assert = require("node:assert/strict");
const { test } = require("node:test");
const { publishedIssues, getPublishedIssues, getIssue, getLatestIssue } = require("../.auth-test/daily/issues.js");
const { getCalendarWeeks, getArchiveMonths, shiftMonth } = require("../.auth-test/daily/calendar.js");

test("November weekly calendar assigns observations to their covered week", () => {
  const weeks = getCalendarWeeks("2026-11", getPublishedIssues());
  assert.equal(weeks.filter(week => week.issue).length, 2);
  assert.equal(weeks[2].issue.id, "weekly-2026-11-16");
  assert.equal(weeks.length, 5);
  assert.equal(weeks[2].label, "第 3 周");
  assert.equal(weeks[2].startISO, "2026-11-16");
  assert.equal(weeks[2].endISO, "2026-11-20");
  assert.equal(weeks[0].issue, undefined);
});

test("cross-year observation remains discoverable in both months", () => {
  const issue = { ...getIssue("weekly-2026-11-16"), id: "weekly-2026-12-28", periodStartISO: "2026-12-28", periodEndISO: "2027-01-01" };
  const weeks = getCalendarWeeks("2027-01", [issue]);
  assert.equal(weeks[0].issue.id, issue.id);
  assert.equal(weeks[0].label, "2026年12月第 4 周");
  assert.deepEqual(getArchiveMonths([issue]), ["2027-01", "2026-12"]);
  assert.equal(shiftMonth("2026-12", 1), "2027-01");
  assert.equal(shiftMonth("2027-01", -1), "2026-12");
});

test("empty and leap-year months cover every weekday exactly once", () => {
  for (let month = 1; month <= 12; month++) {
    const value = `2028-${String(month).padStart(2, "0")}`;
    const weeks = getCalendarWeeks(value, []);
    assert.ok(weeks.length >= 4 && weeks.length <= 6);
    assert.ok(weeks.every(week => new Date(week.startISO).getUTCDay() === 1 && new Date(week.endISO).getUTCDay() === 5));
    const daysInMonth = new Date(Date.UTC(2028, month, 0)).getUTCDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const iso = `${value}-${String(day).padStart(2, "0")}`;
      const weekday = new Date(iso).getUTCDay();
      if (weekday > 0 && weekday < 6) assert.equal(weeks.filter(week => week.startISO <= iso && week.endISO >= iso).length, 1);
    }
    assert.ok(weeks.every(week => !week.issue));
  }
});

test("published archive has unique stable IDs and newest publication first", () => {
  assert.equal(new Set(publishedIssues.map(issue => issue.id)).size, publishedIssues.length);
  assert.deepEqual(publishedIssues.map(issue => issue.dateISO), publishedIssues.map(issue => issue.dateISO).sort().reverse());
  for (const issue of publishedIssues) {
    assert.equal(issue.status, "published");
    assert.equal(getIssue(issue.id), issue);
    assert.equal(new Set(issue.sections.map(section => section.id)).size, issue.sections.length);
  }
  assert.equal(getLatestIssue(), publishedIssues[0]);
  assert.equal(getIssue("missing-issue"), undefined);
});

test("weekly publication and trading-week dates remain distinct and consistent", () => {
  for (const issue of publishedIssues.filter(issue => issue.kind === "weekly")) {
    for (const date of [issue.dateISO, issue.periodStartISO, issue.periodEndISO]) {
      assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(new Date(date).toISOString().slice(0, 10), date);
    }
    assert.equal(issue.date, issue.dateISO.replaceAll("-", "."));
    assert.equal(issue.weekday, ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][new Date(issue.dateISO).getUTCDay()]);
    assert.equal(issue.id, `weekly-${issue.periodStartISO}`);
    assert.equal(new Date(issue.periodStartISO).getUTCDay(), 1);
    assert.equal(new Date(issue.periodEndISO).getUTCDay(), 5);
    assert.equal(new Date(issue.periodEndISO) - new Date(issue.periodStartISO), 4 * 86400000);
  }
  const current = getIssue("weekly-2026-11-16");
  assert.equal(current.dateISO, "2026-11-15");
  assert.equal(current.periodEndISO, "2026-11-20");
});

test("archive navigation contains only metadata, not historical full text", () => {
  const allowed = ["id", "kind", "dateISO", "date", "weekday", "periodStartISO", "periodEndISO", "periodLabel", "title"].sort();
  for (const summary of getPublishedIssues()) assert.deepEqual(Object.keys(summary).sort(), allowed);
});

test("November 16 outlook keeps all four chapters and the author's eight products", () => {
  const issue = getIssue("weekly-2026-11-16");
  assert.equal(issue.sections.filter(section => section.heading).length, 4);
  assert.equal(issue.sections.reduce((count, section) => count + section.body.length, 0), 80);
  assert.deepEqual(issue.watchlist.map(item => item.symbol), ["QQQ", "GOOGL", "NVDA", "MRVL", "MU", "BTC", "ETH", "BNB"]);
  assert.equal(issue.sections.at(-1).body.at(-1), "大家周末愉快，我们下周继续观察。");
});
