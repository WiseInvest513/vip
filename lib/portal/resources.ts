export type ResourceCategory = "研究工具" | "数据网站" | "官方资料";
export type Resource = {
  id: string;
  title: string;
  category: ResourceCategory;
  description: string;
  useCase: string;
  start: string;
  href: string;
  source: string;
  language: string;
};

// Only public resource URLs are included; no private chat records or member identifiers.
export const resources: Resource[] = [
  {
    id: "wise-chain", title: "Wise CHAIN", category: "研究工具",
    description: "从产业与公司研究出发，连接相关资料和学习内容。",
    useCase: "研究一个方向时，寻找相关的产业背景与资料入口。",
    start: "先从你正在研究的产业或公司出发，再打开相关资料；具体模块以 CHAIN 当前页面为准。",
    href: "https://chain.wise-invest.org", source: "Wise 体系", language: "中文",
  },
  {
    id: "wise-crypto", title: "Wise Crypto 工具库", category: "研究工具",
    description: "群里分享过的加密工具与教程入口，集中查找相关资源。",
    useCase: "查找加密领域的工具，以及进一步了解它们的使用方法。",
    start: "进入工具页，按你需要解决的问题选择工具，再阅读对应说明。",
    href: "https://crypto.wise-invest.org/tools", source: "Wise 分享 · 2026.09.10", language: "中文",
  },
  {
    id: "companies-market-cap", title: "CompaniesMarketCap", category: "数据网站",
    description: "查询公司市值、营收、盈利等数据，按行业或国家浏览公司。",
    useCase: "初步了解一家公司的体量，寻找可放在一起比较的同行。",
    start: "搜索公司名称或代码，先看指标和时间口径，再与同业比较；关键数字回到公司披露核对。",
    href: "https://companiesmarketcap.com/", source: "Wise 分享 · 2026.09.15", language: "英文",
  },
  {
    id: "capitol-trades", title: "Capitol Trades", category: "数据网站",
    description: "检索美国国会议员公开披露的交易记录。",
    useCase: "看到有关议员交易的讨论时，查找对应的披露记录。",
    start: "按人物或公司查找记录，区分交易日期与披露日期；已披露交易不等于实时、完整持仓。",
    href: "https://www.capitoltrades.com/", source: "群内分享 · 2026.08.31", language: "英文",
  },
  {
    id: "fred", title: "FRED 宏观数据库", category: "数据网站",
    description: "圣路易斯联储提供的经济数据库，查询利率、通胀、就业等时间序列。",
    useCase: "把宏观讨论里的一个指标放回历史，观察它怎样变化。",
    start: "用指标名称检索，先确认单位、频率和来源，再选择时间区间。",
    href: "https://fred.stlouisfed.org/", source: "编辑补充 · 官方来源", language: "英文",
  },
  {
    id: "edgar", title: "SEC EDGAR 公司披露", category: "官方资料",
    description: "美国证券交易委员会的公开披露检索入口，查找公司定期报告与公告。",
    useCase: "核对财报数字、业务描述和重要事项的原始出处。",
    start: "输入公司名或代码，按报告类型与日期筛选，打开原始文件并确认报告期。",
    href: "https://www.sec.gov/search-filings", source: "编辑补充 · 官方来源", language: "英文",
  },
  {
    id: "fomc", title: "美联储会议与政策文件", category: "官方资料",
    description: "集中查看 FOMC 会议日历、政策声明、会议纪要及预测材料。",
    useCase: "看到利率或政策新闻后，回到当次会议的正式材料核对。",
    start: "选择对应年份与会议，先读声明，再按需要查看纪要与预测；注意文件发布日期。",
    href: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm", source: "编辑补充 · 官方来源", language: "英文",
  },
  {
    id: "financial-statements", title: "SEC 财务报表入门指南", category: "官方资料",
    description: "介绍主要财务报表、每股盈利与市盈率等概念的官方入门材料。",
    useCase: "阅读公司财报前，查清常见术语与报表之间的联系。",
    start: "先从资产负债表、利润表和现金流量表开始，对照一家公司的实际财报阅读。",
    href: "https://www.sec.gov/about/reports-publications/investorpubsbegfinstmtguide", source: "编辑补充 · 官方来源", language: "英文",
  },
];
