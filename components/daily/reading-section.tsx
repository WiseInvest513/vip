import { Fragment, type ReactNode } from "react";
import { CalendarDays, Check, CornerDownRight } from "lucide-react";
import type { ContentSection } from "@/lib/daily/types";
import s from "./reading-section.module.css";

function Emphasis({ text, phrases = [] }: { text: string; phrases?: string[] }) {
  const terms = phrases.filter(Boolean);
  if (terms.length === 0) return text;
  const pattern = new RegExp(`(${terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, index) => terms.includes(part)
    ? <strong key={index}>{part}</strong>
    : <Fragment key={index}>{part}</Fragment>);
}

/** Read the same paragraphs once, with optional visual groupings for each weekly issue. */
export function ReadingSection({ section, number }: { section: ContentSection; number?: number }) {
  const { presentation } = section;
  const blocks: ReactNode[] = [];
  const paragraph = (index: number, className?: string) => (
    <p key={index} data-reading-paragraph={`${section.id}-${index}`} className={className}>
      <Emphasis text={section.body[index]} phrases={presentation?.emphasis} />
    </p>
  );

  for (let index = 0; index < section.body.length; index++) {
    const group = presentation?.groups?.find(item => item.start === index);
    if (group) {
      blocks.push(
        <div key={`group-${index}`} className={s[group.kind]} data-reading-group={group.kind}>
          {section.body.slice(index, index + group.count).map((text, offset) => {
            const position = index + offset;
            const event = group.kind === "events" ? text.split("｜") : [];
            return (
              <div key={position} className={s.card}>
                {group.kind === "events" && event.length === 3 ? <>
                  <CalendarDays size={17} className={s.eventIcon} aria-hidden="true" />
                  <p data-reading-paragraph={`${section.id}-${position}`} className={s.eventCopy}>
                    <span className={s.eventTime}>{event[0]}</span>
                    <span className={s.srOnly}>｜</span>
                    <strong className={s.eventTitle}>{event[1]}</strong>
                    <span className={s.srOnly}>｜</span>
                    <span className={s.eventDetail}>{event[2]}</span>
                  </p>
                </> : <>
                  {group.labels?.[offset] ? (
                    <div className={s.cardLabel}>
                      {group.kind === "checklist" ? <Check size={15} aria-hidden="true" /> : <CornerDownRight size={15} aria-hidden="true" />}
                      <span>{group.labels[offset]}</span>
                    </div>
                  ) : null}
                  {paragraph(position)}
                </>}
              </div>
            );
          })}
        </div>,
      );
      index += group.count - 1;
    } else {
      blocks.push(paragraph(index, presentation?.callouts?.includes(index) ? s.callout : undefined));
    }

    if (presentation?.metrics?.afterParagraph === index) {
      const { caption, items } = presentation.metrics;
      blocks.push(
        <figure className={s.metrics} key={`metrics-${index}`}>
          <figcaption>{caption}</figcaption>
          <dl>{items.map(item => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd><strong>{item.value}</strong><span>{item.note}</span></dd>
            </div>
          ))}</dl>
        </figure>,
      );
    }
  }

  return (
    <section className={s.section} aria-labelledby={section.heading ? `reading-${section.id}` : undefined}>
      {section.heading ? (
        <header className={s.heading}>
          <span aria-hidden="true">{String(number).padStart(2, "0")}</span>
          <h4 id={`reading-${section.id}`}>{section.heading.replace(/^[一二三四五六七八九十]+、/, "")}</h4>
        </header>
      ) : null}
      <div className={s.body}>{blocks}</div>
    </section>
  );
}
