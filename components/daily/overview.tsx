"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crown,
  History,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { AmbientSurface } from "@/app/vip/ambient-surface";
import { wiseAvatar } from "@/lib/media/wise-avatar";
import { getPublishedIssues, type DailyIssue, type MarketQuote } from "@/lib/daily";
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

function kindLabel(issue: DailyIssue) {
  return issue.kind === "weekly" ? "周展望" : "日报";
}

function authorSubtitle(issue: DailyIssue) {
  if (issue.authorNote) return issue.authorNote;
  if (issue.kind === "weekly") return "周展望 · Wise";
  return "市场观察 · Wise";
}

export function DailyOverview() {
  const issues = useMemo(() => getPublishedIssues(), []);
  const [index, setIndex] = useState(0);
  const [period, setPeriod] = useState<"current" | "next">("current");
  const issue = issues[index];
  const hasQuotes = Boolean(issue.quotes && issue.quotes.length > 0);
  const agenda = issue.agenda ?? { current: [], next: [] };
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

      <div className={s.issueBar}>
        <div className={s.issueDate} aria-live="polite">
          {issue.kind === "weekly" && issue.periodLabel ? (
            <>
              <time dateTime={issue.dateISO}>{issue.periodLabel}</time>
              <span className={s.kindBadge}>{kindLabel(issue)}</span>
              <span>发布于 {issue.date}{issue.weekday ? ` · ${issue.weekday}` : ""}</span>
            </>
          ) : (
            <>
              <time dateTime={issue.dateISO}>{issue.date}</time>
              {issue.weekday ? <span>{issue.weekday}</span> : null}
              <span className={s.kindBadge}>{kindLabel(issue)}</span>
            </>
          )}
        </div>
        {issues.length > 1 ? (
          <div className={s.issueControls}>
            <button
              type="button"
              aria-label="查看较早一期"
              disabled={index === issues.length - 1}
              onClick={() => setIndex(index + 1)}
            >
              <ChevronLeft size={17} />
            </button>
            <label className={s.issueSelect}>
              <History size={15} aria-hidden="true" />
              <span className={s.srOnly}>选择观察期</span>
              <select value={index} onChange={(e) => setIndex(Number(e.target.value))}>
                {issues.map((item, i) => (
                  <option key={item.id} value={i}>
                    {item.kind === "weekly" && item.periodLabel
                      ? `${item.periodLabel} · 周展望`
                      : `${item.date} · ${kindLabel(item)}`}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              aria-label="查看较新一期"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        ) : null}
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
            <p>本周跟踪清单</p>
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
              <span>每一期，保留当时的思考。</span>
              {issues.length > 1 ? (
                <a href="#past-issues" className={vip.textLink}>
                  查看往期
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
                本周
              </button>
              <button type="button" aria-pressed={period === "next"} onClick={() => setPeriod("next")}>
                下周
              </button>
            </div>
            <p className={s.agendaContext}>
              {issue.kind === "weekly" && issue.periodLabel
                ? `${issue.periodLabel} · ${period === "current" ? "本周事件" : "后续安排"}`
                : `${period === "current" ? "本周" : "下周"}安排`}
            </p>
            <div className={s.events} aria-live="polite">
              {periodEvents.length === 0 ? (
                <article>
                  <div className={s.eventMeta}>
                    <CalendarDays size={14} aria-hidden="true" />
                    <span>待补充</span>
                  </div>
                  <h3>日程确认后更新</h3>
                  <p>具体时间以官方公告为准，确认后再写入这一栏。</p>
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
            <p className={s.agendaNote}>事件钟点未逐一核对处，均以官方日程为准；不把未核实的时间写成确定事实。</p>
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

      {issues.length > 1 ? (
        <section id="past-issues" className={s.archive} aria-labelledby="archive-heading">
          <div className={s.sectionHead}>
            <div>
              <p className={vip.eyebrow}>往期观察</p>
              <h2 id="archive-heading" className={vip.sectionHeading}>
                把每周的思考，连起来看。
              </h2>
            </div>
            <span className={s.archiveHint}>正式发布内容</span>
          </div>
          <div className={s.archiveRows}>
            {issues.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={index === i}
                onClick={() => {
                  setIndex(i);
                  document.getElementById("wise-observation")?.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                    block: "start",
                  });
                }}
              >
                <time dateTime={item.dateISO}>
                  {item.kind === "weekly" && item.periodLabel ? item.periodLabel : item.date}
                </time>
                <strong>{item.title}</strong>
                <span>{index === i ? "正在阅读" : kindLabel(item)}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>
      ) : null}

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
