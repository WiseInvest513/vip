/** Layout fixtures only. No quotes, calendar dates or opinions here are live data.
 * Replace with reviewed, dated publications before enabling real membership content.
 * Kept for daily-layout development; not mixed into the published /daily feed.
 */
import type { DailyIssue, MarketQuote } from "./types";

export type { MarketQuote, DailyIssue };

const stockPath = [20, 28, 23, 38, 32, 44, 40, 54, 50, 62, 58, 72];
const calmPath = [42, 45, 41, 44, 43, 46, 42, 45, 43, 44, 42, 44];
const cryptoPath = [62, 57, 64, 48, 53, 42, 46, 31, 36, 28, 34, 30];

export const demoIssues: DailyIssue[] = [
  {
    id: "demo-2026-11-04",
    kind: "daily",
    dateISO: "2026-11-04",
    date: "2026.11.04",
    weekday: "周三",
    scenario: "交易日样稿",
    marketTime: "11.04 09:00",
    opinionTime: "11.04 09:20",
    marketSummary: "本期示意：美股指数回升，加密表现分化。价格方向之外，还需要看上涨是否扩散。",
    title: "指数回升之后，继续看上涨的范围。",
    lead: "价格告诉我们市场在动，变化的范围，才帮助我们理解它走到了哪一步。",
    sections: [
      {
        id: "body",
        body: [
          "如果指数走高，但上涨主要来自少数权重公司，我会把它与更广泛的市场回暖分开看。前者说明部分企业仍有支撑，后者才意味着更多行业开始一起改善。",
          "加密市场也需要单独观察。BTC 与 ETH 的不同表现，只能先说明价格出现分化；资金是否持续进入，还需要结合成交、基金流向等信息验证。",
          "这一期先延续原有的观察方向，把注意力放在后续数据能否补足证据。关于具体企业的经营进展，仍回到对应的公司研究里继续跟踪。",
        ],
      },
    ],
    stance: "延续观察",
    watch: "接下来，观察市场广度是否改善，以及新的经营数据能否支持当前预期。",
    status: "demo",
    quotes: [
      { name: "标普 500", symbol: "S&P 500", value: "6,812.40", change: .64, basis: "示例：11.03 收盘 · 较前收盘", points: stockPath },
      { name: "纳斯达克综合", symbol: "NASDAQ", value: "23,140.60", change: 1.12, basis: "示例：11.03 收盘 · 较前收盘", points: [12, 24, 20, 29, 22, 39, 36, 52, 47, 61, 65, 78] },
      { name: "比特币", symbol: "BTC / USD", value: "$86,420", change: -.38, basis: "示例：11.04 09:00 · 过去 24h", points: cryptoPath },
      { name: "以太坊", symbol: "ETH / USD", value: "$2,748.60", change: .82, basis: "示例：11.04 09:00 · 过去 24h", points: [30, 25, 33, 29, 43, 36, 39, 50, 46, 59, 54, 67] },
    ],
  },
  {
    id: "demo-2026-11-03",
    kind: "daily",
    dateISO: "2026-11-03",
    date: "2026.11.03",
    weekday: "周二",
    scenario: "平静日样稿",
    marketTime: "11.03 09:00",
    opinionTime: "11.03 09:10",
    marketSummary: "本期示意：主要资产窄幅变化。缺少新的验证信息，观察重点与前一期保持一致。",
    title: "变化不多的日子，也值得把判断留住。",
    lead: "今天没有足以改变原判断的新证据。把等待的条件说清楚，也是一份完整的观察。",
    sections: [
      {
        id: "body",
        body: [
          "如果市场只是围绕原来的区间小幅波动，我不会仅凭一天的涨跌给它换一个解释。此前关注的企业盈利、需求变化和流动性条件，仍然是接下来需要验证的问题。",
          "这期可以很短：原判断维持，待验证的问题保留。后续出现实质变化，再说明新增了哪些证据、为什么需要调整。",
        ],
      },
    ],
    stance: "判断维持",
    watch: "继续等待已列入日程的数据与财报；没有新证据时，不为更新而补充结论。",
    status: "demo",
    quotes: [
      { name: "标普 500", symbol: "S&P 500", value: "6,769.08", change: .08, basis: "示例：11.02 收盘 · 较前收盘", points: calmPath },
      { name: "纳斯达克综合", symbol: "NASDAQ", value: "22,884.30", change: -.12, basis: "示例：11.02 收盘 · 较前收盘", points: calmPath.map(n => 88 - n) },
      { name: "比特币", symbol: "BTC / USD", value: "$86,749.65", change: .16, basis: "示例：11.03 09:00 · 过去 24h", points: calmPath },
      { name: "以太坊", symbol: "ETH / USD", value: "$2,726.25", change: -.21, basis: "示例：11.03 09:00 · 过去 24h", points: calmPath.map(n => 88 - n) },
    ],
  },
  {
    id: "demo-2026-11-01",
    kind: "weekly",
    dateISO: "2026-11-01",
    date: "2026.11.01",
    weekday: "周日",
    scenario: "休市日样稿",
    periodLabel: "样稿周度",
    marketTime: "11.01 09:00",
    opinionTime: "11.01 10:00",
    marketSummary: "本期示意：美股休市，保留上一交易日收盘值；加密按本期截点展示过去 24 小时的变化。",
    title: "周末，把这一周的变化放在一起看。",
    lead: "先回看哪些判断得到了验证，再带着还没解决的问题，进入下一周。",
    sections: [
      {
        id: "body",
        body: [
          "休市日无需重复解读同一组收盘数字。可以把这一周的观察放在一起，检查原来关心的事情有没有进展，以及有没有忽略与判断相反的证据。",
          "加密市场仍然交易，但周末的波动需要结合当时的成交环境理解。把价格变化记录下来，也把暂时无法解释的部分保留下来。",
          "下周准备从重大事件的时间开始，再明确每个事件要验证什么。具体日程确认后更新，不把尚未核实的安排写成已确定的事实。",
        ],
      },
    ],
    stance: "周度回看",
    watch: "下周日程确认后，优先记录事件会验证哪个问题，再跟踪结果。",
    status: "demo",
    quotes: [
      { name: "标普 500", symbol: "S&P 500", value: "6,763.67", change: null, basis: "示例：10.30 最近收盘 · 休市", points: stockPath },
      { name: "纳斯达克综合", symbol: "NASDAQ", value: "22,911.79", change: null, basis: "示例：10.30 最近收盘 · 休市", points: stockPath },
      { name: "比特币", symbol: "BTC / USD", value: "$86,580", change: .24, basis: "示例：11.01 09:00 · 过去 24h", points: calmPath },
      { name: "以太坊", symbol: "ETH / USD", value: "$2,732.00", change: -.32, basis: "示例：11.01 09:00 · 过去 24h", points: cryptoPath },
    ],
  },
];

export const demoAgenda = {
  current: [
    { label: "宏观数据", title: "经济数据与政策预期", detail: "观察新数据是否改变利率预期，并对照美股与加密市场的反应。" },
    { label: "企业财报", title: "盈利与下一阶段的指引", detail: "对照收入、利润及管理层展望，区分当期兑现与未来预期。" },
  ],
  next: [
    { label: "周度准备", title: "下周重大事件清单", detail: "核实发布日程后，列出事件时间、影响范围和需要验证的问题。" },
    { label: "研究安排", title: "下一次研究与交流", detail: "整理本周未解决的问题，确定后续研究主题与交流安排。" },
  ],
};
