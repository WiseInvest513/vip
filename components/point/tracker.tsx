"use client";
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Search, Download } from 'lucide-react';
import type records from '@/lib/point/records.json';
import { priceChange, formatPrice, formatChange } from '@/lib/point/metrics';
import s from './point.module.css';
type Record = (typeof records)[number];
const shortDate = (date: string) => date.slice(0, 10).replaceAll('-', '.');
export function Tracker({ records }: { records: Record[] }) {
  const [query, setQuery] = useState('');
  const ranked = [...records].sort((a,b) => (priceChange(b.baseline.close,b.latest.close) ?? -Infinity) - (priceChange(a.baseline.close,a.latest.close) ?? -Infinity));
  const filtered = ranked.filter(r => `${r.ticker} ${r.name} ${r.sector}`.toLowerCase().includes(query.trim().toLowerCase()));
  useEffect(() => {
    const open = () => { const id = window.location.hash.slice(1); const element = document.getElementById(id); if (element instanceof HTMLDetailsElement) element.open = true; };
    open(); window.addEventListener('hashchange', open); return () => window.removeEventListener('hashchange', open);
  }, []);
  function download() {
    const cells = (row: (string | number)[]) => row.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',');
    const lines = [cells(['代码','名称','首次聊到时间（北京时间）','基准收盘日期（纽约）','基准收盘价（USD）','最新收盘日期（纽约）','最新收盘价（USD）','价格变化（%）','观点性质','行情来源'])];
    ranked.forEach(r => lines.push(cells([r.ticker,r.name,r.first.time,r.baseline.date,r.baseline.close,r.latest.date,r.latest.close,priceChange(r.baseline.close,r.latest.close)?.toFixed(4) ?? '',r.stance,r.source.apiUrl])));
    const url = URL.createObjectURL(new Blob(['\uFEFF'+lines.join('\r\n')], {type:'text/csv;charset=utf-8'}));
    const a = document.createElement('a');a.href=url;a.download='wise-point-2026-10-07.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <>
    <div className={s.toolbar}><label className={s.search}><Search size={16} aria-hidden="true"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索代码、公司或赛道" aria-label="搜索历史观点"/>{query && <button type="button" onClick={()=>setQuery('')}>清除</button>}</label><button className={s.download} type="button" onClick={download}><Download size={14}/>下载价格对照</button></div>
    <p className={s.resultCount} role="status">{filtered.length} / {records.length} 个重点标的 · 按区间涨幅从高到低 · 点击展开原话与价格依据</p>
    <div className={s.tableHead} aria-hidden="true"><span>标的 / 观点性质</span><span>首次聊到</span><span>基准收盘价</span><span>最新收盘价</span><span>价格变化</span><span/></div>
    <div className={s.records}>
    {filtered.map(r=>{ const change=priceChange(r.baseline.close,r.latest.close);return <details className={s.record} key={r.ticker} id={`point-${r.ticker}`}>
      <summary aria-label={`展开 ${r.ticker} ${r.name} 的历史观点`}><span className={s.symbol}><strong>{r.ticker}</strong><span>{r.name}</span><small>{r.stance}</small></span><span className={s.cell}><small>首次聊到</small>{shortDate(r.first.time)}<em>北京时间</em></span><span className={s.cell}><small>基准收盘价</small>{formatPrice(r.baseline.close)}<em>{shortDate(r.baseline.date)}</em></span><span className={s.cell}><small>最新收盘价</small>{formatPrice(r.latest.close)}<em>{shortDate(r.latest.date)}</em></span><span className={`${s.cell} ${change!==null&&change<0?s.down:s.up}`}><small>价格变化</small><strong>{formatChange(change)}</strong></span><ChevronDown className={s.chevron} size={16}/></summary>
      <div className={s.detail}><div><h3>回到当时的讨论</h3><p className={s.context}>{r.context}</p><ol className={s.timeline}>{[r.first,...r.events].sort((a,b)=>a.time.localeCompare(b.time)).map((q,i)=><li key={`${q.sourceLine}-${i}`}><time dateTime={q.time.replace(' ','T')+'+08:00'}>{q.time} · 北京时间</time><blockquote>{q.text}</blockquote><span>Wise 原话{q.excerpt?' · 节选':''}</span></li>)}</ol></div>
      <aside className={s.evidence}><h3>这组价格如何对照</h3><p>基准取首次聊到之后，第一个美股常规交易时段的收盘价。遇到盘后、周末或休市，顺延至下一次常规收盘。</p><dl><div><dt>基准交易日</dt><dd>{r.baseline.date}</dd></div><div><dt>最新交易日</dt><dd>{r.latest.date}</dd></div><div><dt>币种与口径</dt><dd>USD · Nasdaq Close/Last</dd></div></dl><p className={s.formula}>({formatPrice(r.latest.close)} ÷ {formatPrice(r.baseline.close)} − 1) × 100<br/><strong>{formatChange(change)}</strong></p><p>这是该区间内的标的价格变化，不是买入成交价或实际持仓收益；未计分红、杠杆和交易费用。</p><a href={r.source.url} target="_blank" rel="noopener noreferrer">查看 Nasdaq 行情 <ArrowUpRight size={13}/></a><a href={r.source.apiUrl} target="_blank" rel="noopener noreferrer">查看本次原始行情数据 <ArrowUpRight size={13}/></a><small>核对日期：{r.source.retrievedAt.slice(0,10)}。这是定日期快照，不是实时行情。</small><h3>可以从中学习什么</h3><p>{r.lesson}</p></aside></div>
    </details>;})}
    {filtered.length===0&&<div className={s.empty}><p>没有找到对应标的。</p><button onClick={()=>setQuery('')} type="button">查看全部标的</button></div>}
    </div>
  </>;
}
