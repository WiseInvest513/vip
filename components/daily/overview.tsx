"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Crown,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { IssueCalendar } from "./issue-calendar";
import { AmbientSurface } from "@/app/vip/ambient-surface";
import { wiseAvatar } from "@/lib/media/wise-avatar";
import type { DailyIssue, DailyIssueSummary, MarketQuote } from "@/lib/daily/types";
import vip from "@/app/vip/vip.module.css";
import s from "./overview.module.css";

function Quote({ quote }: { quote: MarketQuote }) {
  const direction = quote.change === null ? "neutral" : quote.change >= 0 ? "up" : "down";
  const Icon = direction === "neutral" ? Minus : direction === "up" ? TrendingUp : TrendingDown;
  const points = quote.points.map((y, x) => `${(x * 200) / (quote.points.length - 1)},${60 - y * 0.5}`).join(" ");
  return (
    <article className={s.quote} data-direction={direction}>
      <div className={s.quoteName}>
        <h3>{quote.name}</h3>
        <span>{quote.symbol}</span>
      </div>
      <div className={s.quoteValue}>
        <strong>{quote.value}</strong>
        <span className={s.change}>
          <Icon size={14} aria-hidden="true" />
          {quote.change === null ? "休市" : `${quote.change > 0 ? "+" : ""}${quote.change.toFixed(2)}%`}
        </span>
      </div>
      <svg className={s.spark} viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 58H200" className={s.baseline} />
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <p>{quote.basis}</p>
    </article>
  );
}

function kindLabel(issue: DailyIssueSummary) {
  return issue.kind === "weekly" ? "周展望" : "日报";
}

function authorSubtitle(issue: DailyIssue) {
  if (issue.authorNote) return issue.authorNote;
  if (issue.kind === "weekly") return "周展望 · Wise";
  return "市场观察 · Wise";
}

function issueHref(issue: DailyIssueSummary) {
  return `/daily?issue=${encodeURIComponent(issue.id)}`;
}

function IssuePeriod({ issue }: { issue: DailyIssueSummary }) {
  return issue.periodStartISO && issue.periodEndISO ? (
    <span className={s.periodDate}>
      <time dateTime={issue.periodStartISO}>{issue.periodStartISO.replaceAll("-", ".")}</time>
      –<time dateTime={issue.periodEndISO}>{issue.periodEndISO.slice(0, 4) === issue.periodStartISO.slice(0, 4)
        ? issue.periodEndISO.slice(5).replace("-", ".") : issue.periodEndISO.replaceAll("-", ".")}</time>
    </span>
  ) : <span className={s.periodDate}>{issue.periodLabel ?? issue.date}</span>;
}

export function DailyOverview({ issue, issues }: { issue?: DailyIssue; issues: DailyIssueSummary[] }) {
  const [period, setPeriod] = useState<"current" | "next">("current");
  const hasQuotes = Boolean(issue?.quotes && issue.quotes.length > 0);
  const agenda = issue?.agenda ?? { current: [], next: [] };
  const periodEvents = agenda[period];

  if (!issue) {
    return (
      <div className={s.page}>
        <header className={s.header}>
          <div>
            <p className={vip.welcome}>
              <Crown size={16} aria-hidden="true" />
              WISE VIP
              <span className={s.separator} />
              市场观察
            </p>
            <h1>
              市场观察<span>Market Brief</span>
            </h1>
            <p className={vip.heroDescription}>还没有发布的观察内容。</p>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className={s.page}>
      <header className={s.header}>
        <div>
          <p className={vip.welcome}>
            <Crown size={16} aria-hidden="true" />
            WISE VIP
            <span className={s.separator} />
            市场观察
          </p>
          <h1>
            市场观察<span>Market Brief</span>
          </h1>
          <p className={vip.heroDescription}>留下每周的判断，也记下持续的动作与动向。</p>
        </div>
        <a href="#wise-observation" className={vip.secondary}>
          阅读本期观察
          <ArrowRight size={16} />
        </a>
      </header>

      <IssueCalendar issues={issues} selected={issue} />

      <div className={s.issueBar}>
        <div className={s.issueDate} aria-live="polite">
          {issue.kind === "weekly" && issue.periodLabel ? (
            <>
              <IssuePeriod issue={issue} />
              <span className={s.kindBadge}>{kindLabel(issue)}</span>
              <span className={s.publicationDate}>发布于 <time dateTime={issue.dateISO}>{issue.date}</time>{issue.weekday ? ` · ${issue.weekday}` : ""}</span>
            </>
          ) : (
            <>
              <time dateTime={issue.dateISO}>{issue.date}</time>
              {issue.weekday ? <span>{issue.weekday}</span> : null}
              <span className={s.kindBadge}>{kindLabel(issue)}</span>
            </>
          )}
        </div>
      </div>

      {hasQuotes ? (
        <section className={s.market} aria-labelledby="market-heading">
          <div className={s.sectionHead}>
            <h2 id="market-heading">行情一览</h2>
            {issue.marketTime ? (
              <p>
                <Clock3 size={13} aria-hidden="true" />
                截点 {issue.marketTime} 北京时间
              </p>
            ) : null}
          </div>
          <div className={s.quotes}>{issue.quotes!.map((quote) => <Quote key={quote.symbol} quote={quote} />)}</div>
          {issue.marketSummary ? (
            <div className={s.marketSummary}>
              <span>整体来看</span>
              <p>{issue.marketSummary}</p>
            </div>
          ) : null}
        </section>
      ) : null}

      {issue.watchlist && issue.watchlist.length > 0 ? (
        <section className={s.watchlist} aria-labelledby="watchlist-heading">
          <div className={s.sectionHead}>
            <h2 id="watchlist-heading">关注产品</h2>
            <p>本期跟踪清单</p>
          </div>
          <ul className={s.watchlistRows}>
            {issue.watchlist.map((item) => (
              <li key={item.symbol}>
                <strong>{item.symbol}</strong>
                <span>{item.name}</span>
                {item.note ? <em>{item.note}</em> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <AmbientSurface className={s.readingSurface}>
        <div className={s.readingGrid}>
          <section id="wise-observation" className={s.observation} aria-labelledby="observation-heading">
            <div className={s.author}>
              <Image src={wiseAvatar} alt="WiseInvest" width={44} height={44} sizes="44px" />
              <div>
                <h2 id="observation-heading">
                  {issue.kind === "weekly" ? "Wise 周展望" : "Wise 今日观察"}
                </h2>
                <p>{authorSubtitle(issue)}</p>
              </div>
              <span className={s.stance}>{issue.stance}</span>
            </div>
            <p className={s.opinionTime}>
              {issue.kind === "weekly" ? "展望时间" : "观察时间"} {issue.opinionTime} · 北京时间
            </p>
            <h3 className={s.observationTitle}>{issue.title}</h3>
            <p className={s.lead}>{issue.lead}</p>
            <div className={s.prose}>
              {issue.sections.map((section) => (
                <div key={section.id} className={s.sectionBlock}>
                  {section.heading ? <h4 className={s.sectionHeading}>{section.heading}</h4> : null}
                  {section.body.map((paragraph, pi) => (
                    <p key={`${section.id}-${pi}`}>{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
            <div className={s.watch}>
              <span>继续留意</span>
              <p>{issue.watch}</p>
            </div>
            <div className={s.readingFooter}>
              <Link href={issueHref(issue)} className={vip.textLink} scroll={false}>本期固定链接<ArrowUpRight size={14} /></Link>
              {issues.length > 1 ? (
                <a href="#observation-calendar" className={vip.textLink}>
                  返回观察周历
                  <ArrowRight size={14} />
                </a>
              ) : (
                <span>周展望会持续更新在这里。</span>
              )}
            </div>
          </section>

          <aside className={s.agenda} aria-labelledby="agenda-heading">
            <p className={vip.eyebrow}>接下来的安排</p>
            <h2 id="agenda-heading">
              带着问题，
              <br />
              看下一次变化。
            </h2>
            <p className={s.agendaIntro}>留意事件发生的时间，也想清楚它会验证什么。</p>
            <div className={s.periods} role="group" aria-label="日程范围">
              <button type="button" aria-pressed={period === "current"} onClick={() => setPeriod("current")}>
                观察周
              </button>
              <button type="button" aria-pressed={period === "next"} onClick={() => setPeriod("next")}>
                后续安排
              </button>
            </div>
            <p className={s.agendaContext}>
              {issue.kind === "weekly" && issue.periodLabel
                ? `${period === "current" ? issue.periodLabel : `基于 ${issue.date} 的展望`} · ${period === "current" ? "观察周事件" : "后续安排"}`
                : `${period === "current" ? "本期" : "后续"}安排`}
            </p>
            <div className={s.events} aria-live="polite">
              {periodEvents.length === 0 ? (
                <article>
                  <div className={s.eventMeta}>
                    <CalendarDays size={14} aria-hidden="true" />
                    <span>待补充</span>
                  </div>
                  <h3>本期未列出{period === "next" ? "后续" : "具体"}日程</h3>
                  <p>后续观察会随新一期内容发布，可通过上方观察周历回看。</p>
                </article>
              ) : (
                periodEvents.map((event) => (
                  <article key={`${event.label}-${event.title}`}>
                    <div className={s.eventMeta}>
                      <CalendarDays size={14} aria-hidden="true" />
                      <span>{event.label}</span>
                      <span>{event.when ?? "以官方日程为准"}</span>
                    </div>
                    <h3>{event.title}</h3>
                    <p>{event.detail}</p>
                  </article>
                ))
              )}
            </div>
            <p className={s.agendaNote}>时间均为北京时间，按本期原文整理；如有调整，以官方公告为准。</p>
            <div className={s.research}>
              <p>具体企业与产业，继续深入看</p>
              <a href="https://chain.wise-invest.org/" target="_blank" rel="noopener noreferrer">
                美股与产业 · CHAIN
                <ArrowUpRight size={14} />
              </a>
              <a href="https://crypto.wise-invest.org/" target="_blank" rel="noopener noreferrer">
                加密市场 · Crypto
                <ArrowUpRight size={14} />
              </a>
            </div>
          </aside>
        </div>
      </AmbientSurface>

      <div className={s.bottomLinks}>
        <Link href="/" className={vip.textLink}>
          <ArrowLeft size={14} />
          返回 Wise VIP
        </Link>
        <Link href="/article" className={vip.textLink}>
          阅读完整研究
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
