"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import type { DailyIssue } from "@/lib/daily/types";
import s from "./issue-agenda.module.css";

export function IssueAgenda({ issue }: { issue: DailyIssue }) {
  const [period, setPeriod] = useState<"current" | "next">("current");
  const agenda = issue.agenda ?? { current: [], next: [] };
  const events = agenda[period];

  return (
    <details className={s.agenda}>
      <summary>
        <span className={s.icon}><CalendarDays size={20} aria-hidden="true" /></span>
        <div className={s.summaryCopy}>
          <h2>本周事件与安排</h2>
          <p>{issue.periodLabel ?? issue.date} · {agenda.current.length} 项观察</p>
        </div>
        <span className={s.toggle}><span className={s.closedLabel}>展开日程</span><span className={s.openLabel}>收起日程</span><ChevronDown size={16} aria-hidden="true" /></span>
      </summary>
      <div className={s.content}>
        <div className={s.periods} role="group" aria-label="日程范围">
          <button type="button" aria-pressed={period === "current"} onClick={() => setPeriod("current")}>观察周</button>
          <button type="button" aria-pressed={period === "next"} onClick={() => setPeriod("next")}>后续安排</button>
        </div>
        <div className={s.events} aria-live="polite">
          {events.length === 0 ? <p className={s.empty}>本期未列出{period === "next" ? "后续" : "具体"}日程，可通过观察周历回看其他周报。</p> : events.map(event => (
            <article key={`${event.label}-${event.title}`}>
              <span className={s.label}>{event.label}</span>
              <p className={s.when}>{event.when ?? "以官方日程为准"}</p>
              <h3>{event.title}</h3>
              <p className={s.detail}>{event.detail}</p>
            </article>
          ))}
        </div>
        <p className={s.note}>时间均为北京时间，按本期原文整理；如有调整，以官方公告为准。</p>
      </div>
    </details>
  );
}
