import styles from "./allocation-planner.module.css";

const allocations = [
  { key: "dca", label: "持续定投", percent: 30, amount: 30000, detail: "按计划投入，持续积累。" },
  { key: "longTerm", label: "长线持有", percent: 50, amount: 50000, detail: "研究企业，给价值以时间。" },
  { key: "margin", label: "合约保证金", percent: 20, amount: 20000, detail: "预算设上限，交易守纪律。" },
] as const;

export function AllocationPlanner() {
  return <div className={styles.planner}>
    <div className={styles.layout}>
      <div className={styles.chart} role="img" aria-label="以 10 万元人民币投资资金为例：持续定投 30%，3 万元；长线持有 50%，5 万元；合约保证金预算上限 20%，2 万元。圆环表示资金用途，不表示风险大小。">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          {allocations.map((part, index) => <circle
            key={part.key}
            cx="100" cy="100" r="83" pathLength="100"
            className={styles[part.key]}
            strokeDasharray={`${part.percent} ${100 - part.percent}`}
            strokeDashoffset={-allocations.slice(0, index).reduce((sum, previous) => sum + previous.percent, 0)}
            transform="rotate(-90 100 100)"
          />)}
        </svg>
        <div className={styles.chartCenter} aria-hidden="true"><span>以投资资金为例</span><strong>10<span> 万元</span></strong><small>人民币 · RMB</small></div>
      </div>
      <dl className={styles.allocations}>
        {allocations.map(part => <div key={part.key} className={styles.allocation}>
          <dt><i className={styles[`${part.key}Dot`]} aria-hidden="true" />{part.label}</dt>
          <dd>
            <strong className={styles.percentage}>{part.percent}<span>%</span></strong>
            <span className={styles.amount}>{part.amount / 10000} 万元</span>
            <p className={styles.detail}>{part.detail}</p>
          </dd>
        </div>)}
      </dl>
    </div>
    <div className={styles.notes}>
      <p><strong>20% 是保证金预算上限，不是总仓位，也不必用满。</strong>不熟悉合约，可以暂不启用这部分预算。</p>
      <p>先预留生活与应急资金；投资期限与风险承受能力不同，比例可相应调整。</p>
    </div>
  </div>;
}
