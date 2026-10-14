// Educational product map, not a model portfolio or a buy list.
// Product descriptions were checked against issuer pages on 2026-10-14.
export const dcaFamilies = [
  {
    title: "美股大盘与全市场", tickers: ["VOO", "SPY", "VTI"],
    role: "先理解自己买了多大的市场",
    explanation: "VOO 与 SPY 都跟踪标普 500，主要覆盖美国大型企业；VTI 的覆盖范围还包括中小型公司。选择时先比较指数范围，再看费用、买卖价差、账户是否支持碎股与自动投入。",
    question: "VOO 加 SPY 增加了两只基金，却没有增加多少新的企业。VTI 也包含大量相同的大公司。看组合时，要穿透到实际持仓。",
    sources: [{ label: "VOO", href: "https://investor.vanguard.com/investment-products/etfs/profile/voo" }, { label: "SPY", href: "https://www.ssga.com/us/en/individual/etfs/state-street-spdr-sp-500-etf-trust-spy" }, { label: "VTI", href: "https://investor.vanguard.com/investment-products/etfs/profile/vti" }],
  },
  {
    title: "全球与美国以外的股票", tickers: ["VT", "VXUS"],
    role: "把地区与货币风险也放进视野",
    explanation: "VT 覆盖全球股票，包含美国；VXUS 覆盖美国以外的股票。它们让研究范围延伸到不同地区与经济结构。全球分散并不意味着每一年都比美股表现好，也无法消除全球市场共同下跌的风险。",
    question: "选择 VT 后再增加 VTI，实际上是在额外提高美国股票权重。这个变化可以有自己的理由，但不能误认为只是多买一个代码。",
    sources: [{ label: "VT", href: "https://investor.vanguard.com/investment-products/etfs/profile/vt" }, { label: "VXUS", href: "https://investor.vanguard.com/investment-products/etfs/profile/vxus" }],
  },
  {
    title: "成长与科技相关敞口", tickers: ["QQQ", "QQQM"],
    role: "理解增长，也理解集中度",
    explanation: "两者都跟踪纳斯达克 100，覆盖纳斯达克上市的大型非金融企业，并非纯科技指数。研究重点是行业权重、大型成分股集中度，以及这些公司的盈利能否支撑估值。定投不会自动消除成长股的估值波动。",
    question: "如果已经持有美股大盘和多家科技龙头，再加纳指产品，可能是在重复增加同一批公司的风险。先合并查看权重，再决定是否需要。",
    sources: [{ label: "QQQ", href: "https://www.invesco.com/qqq-etf/en/about.html" }, { label: "QQQM", href: "https://www.invesco.com/us/financial-products/etfs/product-detail?productId=ETF-QQQM" }],
  },
  {
    title: "股息与企业现金流", tickers: ["SCHD"],
    role: "分红之外，还要看总回报",
    explanation: "SCHD 跟踪美国股息股票指数，筛选会考虑股息和财务质量。股息类产品适合用来学习分配与再投资，但高股息率本身不是好公司的证明。应同时检查盈利、分红可持续性、行业偏重与税后现金流。",
    question: "分红不是凭空多出来的收益。比较时要把价格变化与分红放在一起，并在同一口径下观察，而不是只比较每年到账多少钱。",
    sources: [{ label: "SCHD", href: "https://www.schwabassetmanagement.com/products/schd" }],
  },
  {
    title: "债券与组合中的稳定需求", tickers: ["BND"],
    role: "先问资金何时要用，再看利率",
    explanation: "BND 覆盖美国投资级债券市场，是理解债券组合的一个样本。债券基金仍会因利率、信用和期限结构变化而下跌；它不能直接等同于现金或存款。短期要用的钱，与长期配置债券，是不同的问题。",
    question: "债券的票息、到期收益率和基金未来实际回报不是一回事。先理解久期，再讨论利率变化对价格的影响。",
    sources: [{ label: "BND", href: "https://advisors.vanguard.com/investments/products/bnd/vanguard-total-bond-market-etf" }],
  },
  {
    title: "黄金与其他配置工具", tickers: ["IAU"],
    role: "明确它在组合里承担什么任务",
    explanation: "IAU 提供与实物黄金价格相关的敞口，属于黄金信托。黄金没有企业利润或股息作为现金流来源；它的价格会受到实际利率、货币与避险需求等因素影响，也可能经历长期回撤。",
    question: "加入黄金，是希望改变组合的风险结构，还是追逐近期涨幅？这个问题比选择每周还是每月买入更靠前。",
    sources: [{ label: "IAU", href: "https://www.ishares.com/us/products/239561/ishares-gold-trust-fund" }],
  },
];

export const dcaLessons = [
  { title: "先分清定投解决什么", body: "定投是按既定节奏分批投入资金。它帮助减少临时择时决策，也适合研究如何使用持续新增的收入。但它不能修复资产本身的缺陷。每月有新结余，与手里已经有一笔现金、决定分批入场，是两种不同的情境；后者还要考虑资金等待期间的机会成本。" },
  { title: "产品数量，不等于分散程度", body: "先看指数与底层持仓，再看基金名字。VOO 与 SPY 属于同一类标普 500 敞口；VTI、QQQ 与直接持有的科技龙头也会重叠。全球股票、债券和黄金的作用不同，是否需要搭配，要从资金用途与风险承受能力出发，不能把这里的全部产品都买一遍。" },
  { title: "把一份投入计划说完整", body: "先安排近期生活开支与必要备用资金，再确定能够持续投入的结余。计划至少要说明投入来源、频率、产品承担的角色，以及收入或用钱时间变化时怎样调整。金额应当能在市场下跌时继续承受，而不是由近期涨幅决定。" },
  { title: "比较产品时，把隐形成本带上", body: "同一个指数可以有不同的基金载体。除了管理费，还要考虑买卖价差、交易佣金、换汇成本、基金注册地与个人税务身份。能否购买、能否自动投入和分红怎样处理，也会影响执行体验。先确认自己的账户条件，再比较同类工具。" },
  { title: "定期检查，比每天更改计划重要", body: "检查生活目标是否改变、组合是否过度集中，以及产品的费用或跟踪规则有没有变化。如果需要恢复原有配置，可以先研究用新增资金调整，再评估卖出带来的费用和税务影响。短期跌幅本身不能替代对资金用途、产品质量和风险的判断。" },
];
