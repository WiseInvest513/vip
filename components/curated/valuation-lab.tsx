"use client";

import { useId, useState } from "react";
import styles from "./valuation-lab.module.css";

const BASE_EPS = 10;
const BASE_PE = 30;
const BASE_PRICE = BASE_EPS * BASE_PE;
const priceFormatter = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 });

function percent(value: number) {
  return `${value > 0 ? "+" : ""}${Math.round(value * 10) / 10}%`;
}

function price(value: number) {
  return priceFormatter.format(value);
}

export function ValuationLab() {
  const fieldId = useId();
  const [eps, setEps] = useState(12);
  const [pe, setPe] = useState(20);
  const currentPrice = eps * pe;
  const earningsChange = (eps / BASE_EPS - 1) * 100;
  const valuationChange = (pe / BASE_PE - 1) * 100;
  const priceChange = (currentPrice / BASE_PRICE - 1) * 100;

  function setScenario(nextEps: number, nextPe: number) {
    setEps(nextEps);
    setPe(nextPe);
  }

  return (
    <section className={styles.lab} aria-labelledby={`${fieldId}-title`}>
      <div className={styles.heading}>
        <div>
          <h3 id={`${fieldId}-title`}>盈利增长，价格一定上涨吗？</h3>
        </div>
        <span className={styles.badge}>假设估值实验</span>
      </div>
      <p className={styles.disclaimer} id={`${fieldId}-disclaimer`}>纯教学假设，不对应任何公司或预测。</p>
      <div className={styles.presets} aria-label="选择教学情境">
        <button type="button" aria-pressed={eps === 12 && pe === 20} onClick={() => setScenario(12, 20)}>盈利涨，估值降</button>
        <button type="button" aria-pressed={eps === 10 && pe === 35} onClick={() => setScenario(10, 35)}>盈利不变，估值升</button>
        <button type="button" className={styles.reset} onClick={() => setScenario(BASE_EPS, BASE_PE)}>回到基准</button>
      </div>
      <div className={styles.workspace}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor={`${fieldId}-eps`}>每股盈利 EPS <output htmlFor={`${fieldId}-eps`}>{eps} <span>元</span></output></label>
            <input id={`${fieldId}-eps`} type="range" min={5} max={20} step={0.5} value={eps} onChange={(event) => setEps(Number(event.target.value))} aria-valuetext={`${eps} 元每股盈利`} aria-describedby={`${fieldId}-assumption`} />
          </div>
          <div className={styles.control}>
            <label htmlFor={`${fieldId}-pe`}>市盈率 PE <output htmlFor={`${fieldId}-pe`}>{pe} <span>倍</span></output></label>
            <input id={`${fieldId}-pe`} type="range" min={10} max={40} step={1} value={pe} onChange={(event) => setPe(Number(event.target.value))} aria-valuetext={`${pe} 倍市盈率`} aria-describedby={`${fieldId}-assumption`} />
          </div>
        </div>
        <div className={styles.result} aria-live="polite" aria-atomic="true">
          <div className={styles.prices}>
            <div><span>基准价格</span><strong>{BASE_PRICE}<small> 元</small></strong><p>10 元 × 30 倍</p></div>
            <div><span>调整后的价格</span><strong>{price(currentPrice)}<small> 元</small></strong><p>{eps} 元 × {pe} 倍</p></div>
          </div>
          <div className={styles.changes}>
            <div><span>盈利变化</span><strong>{percent(earningsChange)}</strong></div>
            <div><span>估值变化</span><strong>{percent(valuationChange)}</strong></div>
            <div><span>价格变化</span><strong>{percent(priceChange)}</strong></div>
          </div>
        </div>
      </div>
      <p className={styles.assumption} id={`${fieldId}-assumption`}>价格 = EPS × PE。这里采用口径一致、盈利为正的简化假设；PE 为什么变化，仍要回到研究中找原因。单个指标无法做交易判断。</p>
    </section>
  );
}

export default ValuationLab;
