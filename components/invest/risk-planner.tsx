"use client";

import { useId, useState } from "react";
import styles from "./risk-planner.module.css";

const totalBudget = 100000;
const leverageOptions = [2, 3, 5] as const;
const format = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 2 });
const formatCapital = (value: number) => value >= 10000 ? `${format(value / 10000)} 万` : format(value);

export function RiskPlanner() {
  const id = useId();
  const [margin, setMargin] = useState(20000);
  const [leverage, setLeverage] = useState<number>(2);
  const [stopPercent, setStopPercent] = useState(2.5);
  const [targetPercent, setTargetPercent] = useState(5);
  const position = margin * leverage;
  const loss = position * stopPercent / 100;
  const profit = position * targetPercent / 100;
  const liquidation = 100 * (1 - 1 / leverage) / (1 - 0.005);
  const marginPercent = margin / totalBudget * 100;

  return <section className={styles.planner} aria-labelledby={`${id}-title`}>
    <header className={styles.heading}>
      <div><span className={styles.eyebrow}>把风险变成看得见的数字</span><h3 id={`${id}-title`}>以 10 万元人民币为总预算</h3></div>
      <span className={styles.teaching}>虚拟教学算例</span>
    </header>

    <div className={styles.allocation}>
      <div className={styles.balanceLabels}>
        <span><i className={styles.marginDot} aria-hidden="true" />本次保证金 <strong>{format(margin)} 元</strong></span>
        <span><i className={styles.balanceDot} aria-hidden="true" />其他用途预算 <strong>{format(totalBudget - margin)} 元</strong></span>
      </div>
      <div className={styles.balanceBar} role="img" aria-label={`本次保证金占总预算 ${format(marginPercent)}%，其他用途预算 ${format(100 - marginPercent)}%`}>
        <span style={{ width: `${marginPercent}%` }} />
      </div>
      <p>本例按逐仓、关闭自动追加计算，其余资金不纳入本次合约保证金。所有金额以人民币等值展示，用于预算计算；实际入金与结算币种以平台规则为准。</p>
    </div>

    <div className={styles.controls}>
      <div className={styles.marginControl}>
        <div className={styles.controlLabel}><label htmlFor={`${id}-margin`}>本次投入多少保证金？</label><output htmlFor={`${id}-margin`}>{format(margin)} <small>元</small></output></div>
        <input id={`${id}-margin`} className={styles.slider} type="range" min="2000" max="20000" step="1000" value={margin} aria-valuetext={`${margin} 元 保证金，占总预算 ${format(marginPercent)}%`} aria-describedby={`${id}-limit`} onChange={event => setMargin(Number(event.target.value))} />
        <div className={styles.rangeLabels}><span>2,000 元</span><span>20,000 元</span></div>
        <p id={`${id}-limit`} className={styles.controlNote}>2 万元是合约保证金总预算上限，不必用满；多笔仓位合并计算。</p>
      </div>
      <fieldset className={styles.leverageControl}>
        <legend>换一个杠杆，看看变化</legend>
        <div className={styles.leverageOptions}>{leverageOptions.map(value => <label key={value} className={styles.leverageChoice}>
          <input type="radio" name={`${id}-leverage`} value={value} checked={leverage === value} onChange={() => setLeverage(value)} />
          <span>{value}<small> 倍</small></span>
        </label>)}</div>
        <p className={styles.controlNote}>倍数仅作风险对比，不是杠杆推荐。</p>
      </fieldset>
    </div>

    <div className={styles.equation} aria-label={`${margin} 元 保证金乘以 ${leverage} 倍杠杆，等于 ${position} 元 名义仓位`}>
      <div><span>保证金</span><strong>{formatCapital(margin)}<small> 元</small></strong></div>
      <span className={styles.operator} aria-hidden="true">×</span>
      <div><span>杠杆</span><strong>{leverage}<small> 倍</small></strong></div>
      <span className={styles.operator} aria-hidden="true">=</span>
      <div className={styles.position}><span>名义仓位</span><strong>{formatCapital(position)}<small> 元</small></strong></div>
    </div>

    <div className={styles.exitControls}>
      <div><label htmlFor={`${id}-stop`}>止损距离 <strong>{format(stopPercent)}%</strong></label><input id={`${id}-stop`} className={styles.slider} type="range" min="0.5" max="10" step="0.5" value={stopPercent} aria-valuetext={`价格下跌 ${stopPercent}% 时计划止损`} onChange={event => setStopPercent(Number(event.target.value))} /></div>
      <div><label htmlFor={`${id}-target`}>止盈距离 <strong>{format(targetPercent)}%</strong></label><input id={`${id}-target`} className={styles.slider} type="range" min="1" max="20" step="0.5" value={targetPercent} aria-valuetext={`价格上涨 ${targetPercent}% 时计划止盈`} onChange={event => setTargetPercent(Number(event.target.value))} /></div>
    </div>
    <div className={styles.tradePlan}><span>假设做多入场价 <strong>100</strong></span><span>止损价 <strong>{format(100 - stopPercent)}</strong></span><span>止盈价 <strong>{format(100 + targetPercent)}</strong></span></div>
    <div className={styles.outcomes} aria-live="polite" aria-atomic="true">
      <div className={styles.outcome}>
        <span>下跌 {format(stopPercent)}% · 计划亏损</span>
        <p>−{formatCapital(loss)}<small> 元</small></p>
        <span>占总预算 <strong>{format(loss / totalBudget * 100)}%</strong></span>
      </div>
      <div className={`${styles.outcome} ${styles.target}`}>
        <span>上涨 {format(targetPercent)}% · 目标盈利</span>
        <p>+{formatCapital(profit)}<small> 元</small></p>
        <span>占总预算 <strong>{format(profit / totalBudget * 100)}%</strong></span>
      </div>
    </div>
    <p className={styles.takeaway}>保证金只是投入，<strong>名义仓位决定价格波动带来的盈亏。</strong></p>
    <details className={styles.liquidation}><summary>距离强平还有多远？查看本例的理论估算</summary><p>按当前 {leverage} 倍杠杆，另假设维持保证金率固定为 0.5%，无手续费与资金费，理论强平价约为 <strong>{format(liquidation)}</strong>。计算式：100 ×（1 − 1 ÷ {leverage}）÷（1 − 0.5%）。</p><p>这不是可以扛单到达的位置。你的计划止损价是 <strong>{format(100 - stopPercent)}</strong>；跳空、滑点或订单失败可能让损失超过计划。真实强平价须查交易平台，不能直接套用本模型。</p></details>
    <p className={styles.disclaimer}>虚拟线性合约、虚拟价格，人民币等值预算口径，未计汇率变化、手续费、资金费与滑点。止损不保证按指定价格成交；目标盈利不代表预期收益。实际规则以平台及合约说明为准。</p>
  </section>;
}
