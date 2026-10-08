import { ArrowDown } from 'lucide-react';
import records from '@/lib/point/records.json';
import { priceChange, formatPrice, formatChange } from '@/lib/point/metrics';
import s from './point.module.css';

// These are explicitly disclosed holding averages, not first-mention market prices.
const examples = [
  { ticker: 'BE', average: 208, line: 14071, followup: '9 月 29 日原话：“be 走了 290！”已保留离场信息，不能视为一直持有至最新日期。' },
  { ticker: 'MRVL', average: 210, line: 14078, followup: '10 月 2 日回顾原话：“mrvl 270 走的”。最新价对照不等于这笔交易的实际收益。' },
  { ticker: 'MU', average: 861, line: 14070, followup: '9 月 14 日原话：“861 的 MU”。这是当时披露的持仓均价，未据此假设买入日期或一直持有。' },
  { ticker: 'GLW', average: 131, line: 14076, followup: '9 月 14 日原话：“131 glw”。同期先说明在报均价；当前文字未明确卖出结果。' },
  { ticker: 'DRAM', average: 51, line: 14077, followup: '9 月 14 日原话：“51 dram”。这是存储主题 ETF 的披露均价，后续对照的是 ETF 收盘价。' },
  { ticker: 'INTC', average: 87, line: 14072, followup: '9 月 21 日原话：“intc 120 可以走”。这是计划位置，没有据此认定已在 120 成交。' },
];

export function Highlights() {
  return <section className={s.highlights} aria-labelledby="price-cases-title">
    <h3 id="price-cases-title">当时说过的均价，后来走到了哪里。</h3>
    <p>9 月 14 日，Wise 先说“我说均价和产品”，随后报出下面的持仓均价。精选六组均价案例，按均价对照涨幅排序；披露日期不是买入日期。</p>
    <div className={s.highlightGrid}>{[...examples].sort((a,b)=>(priceChange(b.average,records.find(r=>r.ticker===b.ticker)!.latest.close)??0)-(priceChange(a.average,records.find(r=>r.ticker===a.ticker)!.latest.close)??0)).map(item=>{
      const r = records.find(r=>r.ticker===item.ticker)!;
      const quote = [r.first,...r.events].find(q=>q.sourceLine===item.line)!;
      return <article className={s.highlightCard} key={item.ticker}>
        <h4>{r.ticker}<span>{r.name}</span></h4>
        <p className={s.highlightChange}>{formatChange(priceChange(item.average,r.latest.close))}</p>
        <small>披露均价 → 10 月 7 日收盘 · 价格差幅</small>
        <dl><div><dt>披露持仓均价</dt><dd>{formatPrice(item.average)}</dd></div><div><dt>最新收盘价</dt><dd>{formatPrice(r.latest.close)}</dd></div></dl>
        <blockquote>“{quote.text}”<cite>Wise 原话 · {quote.time.slice(0,10)}</cite></blockquote>
        <p className={s.highlightFollowup}>{item.followup}</p>
        <a href={`#point-${r.ticker}`}>展开原话与价格依据 <ArrowDown size={13}/></a>
      </article>;
    })}</div>
    <p className={s.note}>计算：（最新收盘价 ÷ 披露均价 − 1）× 100%。均价来自 Wise 当时的原话，最新收盘价来自 Nasdaq；不是实际账户回报，也不是从披露当天买入后的涨幅。下方十三个标的继续使用统一的首次提及收盘口径。</p>
  </section>;
}
