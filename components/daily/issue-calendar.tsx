"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import type { DailyIssueSummary } from "@/lib/daily/types";
import { getArchiveMonths, getCalendarWeeks, monthLabel, shiftMonth, weekRange } from "@/lib/daily/calendar";
import s from "./issue-calendar.module.css";

export function IssueCalendar({ issues, selected }: { issues: DailyIssueSummary[]; selected: DailyIssueSummary }) {
  const selectedMonth = (selected.periodStartISO ?? selected.dateISO).slice(0, 7);
  const [month, setMonth] = useState(selectedMonth);
  const weeks = getCalendarWeeks(month, issues);
  const months = [...new Set([...getArchiveMonths(issues), month])].sort().reverse();
  const count = weeks.filter(week => week.issue).length;

  return (
    <section id="observation-calendar" className={s.calendar} aria-labelledby="calendar-heading">
      <div className={s.intro}>
        <h2 id="calendar-heading"><CalendarDays size={18} aria-hidden="true" />观察周历</h2>
        <p>每周一篇，点击周次回看。</p>
      </div>
      <div className={s.panel}>
        <div className={s.toolbar}>
          <div className={s.monthControls}>
            <button type="button" aria-label="上个月" onClick={() => setMonth(value => shiftMonth(value, -1))}><ChevronLeft size={17} /></button>
            <select aria-label="选择归档月份" value={month} onChange={event => setMonth(event.target.value)}>
              {months.map(value => <option key={value} value={value}>{monthLabel(value)}</option>)}
            </select>
            <button type="button" aria-label="下个月" onClick={() => setMonth(value => shiftMonth(value, 1))}><ChevronRight size={17} /></button>
          </div>
          <div className={s.monthStatus}>
            <span aria-live="polite">{count ? `${count} 篇周报` : "本月暂无周报"}</span>
            {month !== selectedMonth ? <button type="button" onClick={() => setMonth(selectedMonth)}>回到本期</button> : null}
          </div>
        </div>
        <div className={s.columns} aria-hidden="true"><span>周次</span><span>观察日期</span><span>本周文章</span><span /></div>
        <div className={s.weeks} aria-label={`${monthLabel(month)}每周观察`}>
          {weeks.map(week => {
            const current = week.issue?.id === selected.id;
            const content = <>
              <strong className={s.weekNumber}>{week.label}</strong>
              <span className={s.weekDates}>{weekRange(week.startISO, week.endISO)}</span>
              <p className={s.title}>{week.issue?.title ?? "暂无周报"}</p>
              <span className={s.weekStatus}>{week.issue ? <>{current ? "正在阅读" : "阅读周报"}<ArrowRight size={14} aria-hidden="true" /></> : "—"}</span>
            </>;
            return week.issue ? <Link
              key={week.startISO}
              href={`/daily?issue=${encodeURIComponent(week.issue.id)}#wise-observation`}
              prefetch={false}
              className={s.week}
              aria-current={current ? "page" : undefined}
            >{content}</Link> : <div key={week.startISO} className={`${s.week} ${s.emptyWeek}`}>{content}</div>;
          })}
        </div>
        <p className={s.note}>按当月周一排列周次，观察日期为周一至周五。</p>
      </div>
    </section>
  );
}
