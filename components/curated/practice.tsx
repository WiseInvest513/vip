"use client";

import { useId, useState } from "react";
import styles from "./practice.module.css";

export type PracticeProps = {
  id: string;
  question: string;
  options: { label: string; feedback: string }[];
  takeaway: string;
};

export function Practice({ id, question, options, takeaway }: PracticeProps) {
  const radioName = useId();
  const [selected, setSelected] = useState<number | null>(null);
  const answer = selected === null ? undefined : options[selected];

  return (
    <section className={styles.practice} id={id} aria-label="情境思考">
      <p className={styles.eyebrow}>带着问题，试着判断</p>
      <fieldset className={styles.question}>
        <legend>{question}</legend>
        <div className={styles.options}>
          {options.map((option, index) => (
            <label className={styles.option} key={option.label}>
              <input
                type="radio"
                name={radioName}
                value={index}
                checked={selected === index}
                onChange={() => setSelected(index)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {answer ? (
          <div className={styles.feedback}>
            <p>{answer.feedback}</p>
            <p className={styles.takeaway}>
              <strong>把这个思路带走</strong>
              {takeaway}
            </p>
            <span className={styles.hint}>也可以换一个选择，看看不同判断背后的思路。</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Practice;
