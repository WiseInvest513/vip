"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { annualReturns, companyReturn, historicalCompanies, historicalReturnsCheckedOn, type HistoricalCompany, type ReturnPeriod, type ReturnSector } from "@/lib/invest/historical-returns";
import styles from "./historical-returns.module.css";

const periods: readonly ReturnPeriod[] = [3, 4, 5];
const sectors: readonly (ReturnSector | "全部")[] = ["全部", "科技", "消费", "支付", "医疗"];
const percentage = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
const dollars = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;

function ReturnDetail({ company, period }: { company: HistoricalCompany; period: ReturnPeriod }) {
  const result = companyReturn(company, period);
  const years = annualReturns(company);
  const min = Math.min(...company.points.map(point => point.value));
  const max = Math.max(...company.points.map(point => point.value));
  const points = company.points.map((point, index) => `${16 + index * 56},${104 - ((point.value - min) / (max - min || 1)) * 80}`).join(" ");
  return <div className={styles.detail}>
    <div className={styles.example}>
      <div><span>在这段 {period} 年历史的起点投入 $10,000</span><strong>{dollars(result.valueOfTenThousand)}</strong><p>{result.start} → {result.end}<br />含股息再投资 · 未扣个人税费与交易成本</p></div>
      <div className={styles.chart}><svg viewBox="0 0 312 128" role="img" aria-label={`${company.ticker} 五个财年的股东回报指数年度节点，起点 100，终点 ${company.points[5].value}；不是日线走势`}><line x1="16" y1="108" x2="296" y2="108" stroke="currentColor" opacity=".15" /><polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />{company.points.map((point, index) => <circle key={point.date} cx={16 + index * 56} cy={104 - ((point.value - min) / (max - min || 1)) * 80} r="3" fill="currentColor" />)}</svg><p>完整五年窗口的年度节点 · 不是日线或最大回撤图</p></div>
    </div>
    <div className={styles.yearGrid} aria-label={`${company.ticker} 各年度回报`}>{years.map(year => <div key={year.end}><span>{year.end.slice(0, 4)} 年度</span><strong className={year.value < 0 ? styles.negative : undefined}>{percentage(year.value)}</strong></div>)}</div>
    <p className={styles.detailNote}>逐年看，长期回报也可能经过亏损。这里只使用财年或年末节点，年内跌幅可能更大。{company.note ? ` ${company.note}` : ""}</p>
    <div className={styles.source}><span>{company.source.location}</span><a href={company.source.href} target="_blank" rel="noopener noreferrer">核对官方原表<ArrowUpRight size={14} aria-hidden="true" /></a></div>
  </div>;
}

export function HistoricalReturns() {
  const [sector, setSector] = useState<ReturnSector | "全部">("全部");
  const [mode, setMode] = useState<"cumulative" | "annualized">("cumulative");
  const [period, setPeriod] = useState<ReturnPeriod>(5);
  const companies = historicalCompanies.filter(company => sector === "全部" || company.sector === sector);
  return <section className={styles.section} aria-labelledby="history-return-heading">
    <div className={styles.heading}><div><span className={styles.eyebrow}>真实历史 / 持有的时间</span><h3 id="history-return-heading">把 3 年、4 年、5 年，放在一起看。</h3><p>按公司年报与官方披露计算。每行标明截止日；财年不同，先看区间，再理解回报。</p></div></div>
    <div className={styles.controls}>
      <div className={styles.filters} aria-label="按行业筛选历史回报">{sectors.map(item => <button key={item} type="button" onClick={() => setSector(item)} aria-pressed={sector === item}>{item}</button>)}</div>
      <label className={styles.metric}>显示口径<select aria-label="历史回报口径" value={mode} onChange={event => setMode(event.target.value as "cumulative" | "annualized")}><option value="cumulative">累计回报</option><option value="annualized">年化回报</option></select></label>
    </div>
    <p className={styles.basis}>{mode === "cumulative" ? "累计回报：这段时间一共增长或减少多少。" : "年化回报：把整段回报折算为每年的复合增长率，不表示每年都取得这一收益。"}美元口径，含股息再投资。选取业务研究样本，非全部市场或收益排名。</p>
    <div className={styles.table}>
      <div className={styles.columnHeader} aria-hidden="true"><span>公司 / 统计截止日</span>{periods.map(year => <span key={year}>{year} 年{mode === "cumulative" ? "累计" : "年化"}</span>)}<span /></div>
      {companies.map(company => <details key={company.ticker} className={styles.row}>
        <summary aria-label={`${company.ticker} ${company.name}，展开历史回报与来源`}><span className={styles.identity}><span><strong>{company.ticker}</strong><span>{company.name}</span></span><small>{company.business}</small><time dateTime={company.endDate}>截至 {company.endDate}</time></span>{periods.map(year => { const result = companyReturn(company, year); return <span className={styles.return} key={year}><small>{year} 年{mode === "cumulative" ? "累计" : "年化"}</small><strong>{percentage(result[mode])}</strong></span>; })}<ChevronDown className={styles.chevron} size={17} aria-hidden="true" /></summary>
        <div className={styles.exampleControls}><span>历史金额示例</span><div aria-label={`${company.ticker} 金额示例持有年数`}>{periods.map(year => <button key={year} type="button" aria-pressed={period === year} onClick={() => setPeriod(year)}>{year} 年</button>)}</div></div>
        <ReturnDetail company={company} period={period} />
      </details>)}
    </div>
    <details className={styles.method}><summary>数据与计算口径<ChevronDown size={15} aria-hidden="true" /></summary><p>数据核对日期：{historicalReturnsCheckedOn}。这是所列年度报告的历史快照，不是截至今天的滚动收益。3 / 4 / 5 年对应各报告最近 3 / 4 / 5 个完整年度区间，具体起止见展开内容。</p><p>累计回报 = 终点回报指数 ÷ 起点回报指数 − 1；年化回报 =（终点 ÷ 起点）的 1 / 年数 次方 − 1。以同一指数比例计算一次性 $10,000 的历史期末金额，不包含追加投入。原表有四舍五入，显示结果取一位小数；未计个人税费、手续费和换汇影响。</p><p>样本涵盖科技、支付、消费与医疗中的部分公司；未列公司不代表不值得研究。历史回报不保证未来收益，也不能单凭收益高低判断现在的买入价值。</p></details>
  </section>;
}
