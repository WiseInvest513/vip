"use client";

import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { calculateCompound, compoundDefaults, compoundLimits, type CompoundInputs } from "@/lib/invest/compound";
import styles from "./compound-calculator.module.css";

type Field = keyof CompoundInputs;
const fields: { key: Field; label: string; unit: string; step: number }[] = [
  { key: "initial", label: "初始资金", unit: "USD", step: 100 },
  { key: "monthly", label: "每月定投", unit: "USD", step: 100 },
  { key: "annualRate", label: "假设年化收益率", unit: "%", step: 0.5 },
  { key: "years", label: "持续投入", unit: "年", step: 1 },
];
const presets = [{ rate: -5, label: "−5% 下行情景" }, { rate: 2, label: "2% 较低增长" }, { rate: 8, label: "8% 增长假设" }];
const number = (value: number, digits = 0) => value.toLocaleString("en-US", { maximumFractionDigits: digits });
const money = (value: number) => Math.abs(value) >= 100_000_000 ? `${number(value / 100_000_000, 2)} 亿` : number(value);
const axisMoney = (value: number) => value >= 100_000_000 ? `${number(value / 100_000_000, 1)} 亿` : value >= 10_000 ? `${number(value / 10_000, 1)} 万` : number(value);

export function CompoundCalculator() {
  const id = useId();
  const [draft, setDraft] = useState<Record<Field, string>>({
    initial: String(compoundDefaults.initial), monthly: String(compoundDefaults.monthly),
    annualRate: String(compoundDefaults.annualRate), years: String(compoundDefaults.years),
  });
  const input = Object.fromEntries(fields.map(({ key }) => [key, draft[key].trim() === "" ? compoundLimits[key].min > 0 ? compoundLimits[key].min : 0 : Number(draft[key])])) as CompoundInputs;
  const result = calculateCompound(input);
  const { inputs, points, contributed, balance, profit } = result;
  const chart = { left: 56, right: 576, top: 18, bottom: 188 };
  const chartMax = Math.max(...points.flatMap(point => [point.contributed, point.balance]), 1) * 1.08;
  const x = (year: number) => chart.left + year / inputs.years * (chart.right - chart.left);
  const y = (amount: number) => chart.bottom - amount / chartMax * (chart.bottom - chart.top);
  const line = (key: "contributed" | "balance") => points.map(point => `${x(point.year).toFixed(2)},${y(point[key]).toFixed(2)}`).join(" ");
  const xYears = inputs.years > 1 ? [0, Math.floor(inputs.years / 2), inputs.years] : [0, 1];
  const adjusted = fields.some(({ key }) => draft[key].trim() !== "" && (!Number.isFinite(input[key]) || input[key] !== inputs[key]));

  return <section className={styles.calculator} aria-labelledby={`${id}-title`}>
    <header className={styles.heading}>
      <div><span className={styles.eyebrow}>先算一笔自己的账</span><h3 id={`${id}-title`}>每月的投入，能积累成什么？</h3></div>
      <span className={styles.unit}>金额统一使用美元 · USD</span>
    </header>
    <div className={styles.fields}>
      {fields.map(({ key, label, unit, step }) => <div className={styles.field} key={key}>
        <label htmlFor={`${id}-${key}`}>{label}</label>
        <div className={styles.inputWrap}>
          <input id={`${id}-${key}`} type="number" inputMode={key === "years" ? "numeric" : "decimal"} min={compoundLimits[key].min} max={compoundLimits[key].max} step={step} value={draft[key]} aria-describedby={`${id}-bounds`} onChange={event => setDraft(previous => ({ ...previous, [key]: event.target.value }))} onBlur={() => setDraft(previous => ({ ...previous, [key]: String(inputs[key]) }))} />
          <span aria-hidden="true">{unit}</span>
        </div>
      </div>)}
    </div>
    <p id={`${id}-bounds`} className={styles.bounds}>{adjusted ? "输入已按试算范围计算，离开输入框后会更新：" : "试算范围："}初始资金 0–1,000 万美元，月投 0–100 万美元，年化 −20%–30%，期限 1–40 个整年。</p>
    <div className={styles.scenarios}>
      <span>换个情景看看</span>
      {presets.map(preset => <button type="button" key={preset.rate} aria-pressed={inputs.annualRate === preset.rate} onClick={() => setDraft(previous => ({ ...previous, annualRate: String(preset.rate) }))}>{preset.label}</button>)}
    </div>
    <div className={styles.results} aria-live="polite" aria-atomic="true">
      <div><span>{inputs.years} 年累计本金</span><strong>{money(contributed)}</strong><small>自己投入的资金 · USD</small></div>
      <div><span>模拟{profit < 0 ? "亏损" : "收益"}</span><strong>{profit > 0 ? "+" : ""}{money(profit)}</strong><small>{profit < 0 ? "定投同样可能亏损" : "假设条件下的增长"} · USD</small></div>
      <div className={styles.total}><span>期末模拟资产</span><strong>{money(balance)}</strong><small>本金与模拟盈亏之和 · USD</small></div>
    </div>
    <figure className={styles.figure}>
      <div className={styles.legend}><span><i className={styles.balanceKey} />模拟资产</span><span><i className={styles.principalKey} />累计本金</span><small>单位：美元</small></div>
      <svg className={styles.chart} viewBox="0 0 600 222" role="img" aria-labelledby={`${id}-chart-title ${id}-chart-desc`}>
        <title id={`${id}-chart-title`}>累计本金与模拟资产的变化</title>
        <desc id={`${id}-chart-desc`}>假设名义年化 {inputs.annualRate}%，月末投入。{inputs.years} 年累计投入 {number(contributed)} 美元，期末模拟资产 {number(balance)} 美元。曲线是假设计算，不是历史走势或收益预测。</desc>
        {[0, .5, 1].map(fraction => <g key={fraction}>
          <line x1={chart.left} x2={chart.right} y1={y(chartMax * fraction)} y2={y(chartMax * fraction)} className={styles.gridline} />
          <text x={chart.left - 10} y={y(chartMax * fraction) + 4} textAnchor="end" className={styles.axis}>{axisMoney(chartMax * fraction)}</text>
        </g>)}
        <polyline points={line("contributed")} className={styles.principalLine} />
        <polyline points={line("balance")} className={styles.balanceLine} />
        <circle cx={x(inputs.years)} cy={y(balance)} r="4" className={styles.endpoint} />
        {xYears.map(year => <text key={year} x={x(year)} y="214" textAnchor={year === 0 ? "start" : year === inputs.years ? "end" : "middle"} className={styles.axis}>{year === 0 ? "现在" : `第 ${year} 年`}</text>)}
      </svg>
      <figcaption>收益假设只用于理解金额、时间与投入的关系。真实回报会波动，可能低于本金。</figcaption>
    </figure>
    <footer className={styles.footer}>
      <details className={styles.method}>
        <summary>计算方式与口径</summary>
        <p>每个月先按已有余额计息，再在月末投入。本例月收益率＝{inputs.annualRate}% ÷ 12，按月复利，对应有效年化约 {number(result.effectiveAnnualRate, 2)}%。没有计入税费、通胀、汇率变化或实际价格波动；曲线平滑仅来自固定收益率假设。</p>
        <p>主站完整计算器默认采用月初投入，因此相同参数的结果会略有不同。</p>
      </details>
      <a href="https://www.wise-invest.org/tools/compound-calculator" target="_blank" rel="noopener noreferrer">打开主站完整计算器 <ArrowUpRight size={14} /></a>
    </footer>
  </section>;
}
