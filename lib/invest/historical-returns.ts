/**
 * Snapshot checked on 2026-10-14 against the primary disclosures below.
 * Values are the issuer's published total-return index, NOT share prices.
 * Preserve the source's fiscal/calendar endpoints and rounded precision.
 * META uses the 2026 proxy's 2020-based TSR table (footnote 5); other rows use annual reports.
 * ETN's 2026 proxy is deliberately excluded: the displayed historic rows appear to retain
 * an older base while 2025 uses a new base, so ratios would not be reliable without reconciliation.
 */
export type ReturnPeriod = 3 | 4 | 5;
export type ReturnSector = "科技" | "消费" | "支付" | "医疗";
export type ReturnPoint = { date: string; value: number };
export type HistoricalCompany = {
  ticker: string;
  name: string;
  sector: ReturnSector;
  business: string;
  endDate: string;
  points: readonly [ReturnPoint, ReturnPoint, ReturnPoint, ReturnPoint, ReturnPoint, ReturnPoint];
  source: { label: string; href: string; location: string };
  note?: string;
};

const calendar = (values: readonly [number, number, number, number, number, number]): HistoricalCompany["points"] =>
  values.map((value, index) => ({ date: `${2020 + index}-12-31`, value })) as unknown as HistoricalCompany["points"];
const june = (values: readonly [number, number, number, number, number, number]): HistoricalCompany["points"] =>
  values.map((value, index) => ({ date: `${2020 + index}-06-30`, value })) as unknown as HistoricalCompany["points"];

export const historicalReturnsCheckedOn = "2026-10-14";
export const historicalCompanies: readonly HistoricalCompany[] = [
  {
    ticker: "AAPL", name: "苹果", sector: "科技", business: "消费硬件与服务", endDate: "2025-09-27",
    points: [
      { date: "2020-09-25", value: 100 }, { date: "2021-09-25", value: 132 },
      { date: "2022-09-24", value: 136 }, { date: "2023-09-30", value: 155 },
      { date: "2024-09-28", value: 208 }, { date: "2025-09-27", value: 234 },
    ],
    source: { label: "Apple 2025 年报", href: "https://s2.q4cdn.com/470004039/files/doc_financials/2025/ar/_10-K-2025-As-Filed.pdf#page=23", location: "Stock Performance，第 20 页（PDF 第 23 页）" },
    note: "原报告指数取整数，计算结果为近似值；日期沿用报告中的财年末标记。",
  },
  {
    ticker: "MSFT", name: "微软", sector: "科技", business: "企业软件与云服务", endDate: "2025-06-30",
    points: june([100, 134.41, 128.48, 172.01, 227.51, 255.13]),
    source: { label: "Microsoft 2025 年报", href: "https://www.microsoft.com/investor/reports/ar25/index.html", location: "Stock Performance：6/20 至 6/25" },
  },
  {
    ticker: "NVDA", name: "英伟达", sector: "科技", business: "计算平台与 AI 芯片", endDate: "2026-01-25",
    points: [
      { date: "2021-01-31", value: 100 }, { date: "2022-01-30", value: 175.98 },
      { date: "2023-01-29", value: 157.05 }, { date: "2024-01-28", value: 470.88 },
      { date: "2025-01-26", value: 1100.68 }, { date: "2026-01-25", value: 1448.75 },
    ],
    source: { label: "NVIDIA 2026 财年 10-K", href: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm", location: "Item 5 / Stock Performance，第 35 页" },
    note: "2026 财年截至 2026-01-25；不是 2026 全年数据。",
  },
  {
    ticker: "META", name: "Meta", sector: "科技", business: "社交平台与广告", endDate: "2025-12-31",
    points: calendar([100, 123.13, 44.05, 129.58, 215.16, 243.32]),
    source: { label: "Meta 2026 股东委托书", href: "https://www.sec.gov/Archives/edgar/data/1326801/000162828026025532/meta-20260416.htm", location: "Pay Versus Performance，第 54–55 页；TSR 列及注 5" },
    note: "使用官方 TSR 表，起点为 2020-12-31 的 100；股息再投资口径与 2025 年报一致。",
  },
  {
    ticker: "V", name: "Visa", sector: "支付", business: "支付网络", endDate: "2025-09-30",
    points: [
      { date: "2020-09-30", value: 100 }, { date: "2021-09-30", value: 112 },
      { date: "2022-09-30", value: 90 }, { date: "2023-09-30", value: 117 },
      { date: "2024-09-30", value: 142 }, { date: "2025-09-30", value: 177 },
    ],
    source: { label: "Visa 2025 年报", href: "https://annualreport.visa.com/financials/default.aspx", location: "Stock performance / Indexed returns" },
    note: "原报告指数取整数，计算结果为近似值。",
  },
  {
    ticker: "COST", name: "Costco", sector: "消费", business: "会员制零售", endDate: "2025-08-31",
    points: [
      { date: "2020 财年末", value: 100 }, { date: "2021 财年末", value: 135 },
      { date: "2022 财年末", value: 160 }, { date: "2023 财年末", value: 165 },
      { date: "2024 财年末", value: 278 }, { date: "2025 财年末", value: 295 },
    ],
    source: { label: "Costco 2025 年报", href: "https://www.sec.gov/Archives/edgar/data/909832/000090983225000157/costannualreport2025.pdf", location: "Performance Graph / Comparison of 5-Year Cumulative Total Returns" },
    note: "基准日起于 2020-08-30，止于 2025-08-31；中间节点为各财年末，含普通与特别股息再投资。图中指数取整数，计算结果为近似值。",
  },
  {
    ticker: "ISRG", name: "直觉外科", sector: "医疗", business: "手术系统与耗材", endDate: "2025-12-31",
    points: calendar([100, 131.76, 97.30, 123.71, 191.40, 207.69]),
    source: { label: "Intuitive Surgical 2025 年报", href: "https://www.sec.gov/Archives/edgar/data/1035267/000103526726000010/isrg-20251231.htm", location: "Item 5 / Performance Graph，第 61 页" },
  },
  {
    ticker: "JNJ", name: "强生", sector: "医疗", business: "创新药与医疗科技", endDate: "2025-12-31",
    points: calendar([100, 111.40, 118.08, 107.93, 102.75, 151.55]),
    source: { label: "Johnson & Johnson 2025 年报", href: "https://www.sec.gov/Archives/edgar/data/200406/000020040626000016/jnj-20251228.htm", location: "Shareholder return performance graphs，第 112 页" },
    note: "股东回报图截至 2025-12-31；财务报表的财年截止日为 2025-12-28，两者不同。",
  },
  {
    ticker: "PG", name: "宝洁", sector: "消费", business: "日常消费品牌", endDate: "2025-06-30",
    points: june([100, 116, 126, 137, 152, 151]),
    source: { label: "Procter & Gamble 2025 年报", href: "https://www.sec.gov/Archives/edgar/data/80424/000008042425000076/pg-20250630.htm", location: "Shareholder Return，第 13 页" },
    note: "原报告指数取整数，计算结果为近似值。",
  },
];

export function companyReturn(company: HistoricalCompany, period: ReturnPeriod) {
  const start = company.points[5 - period];
  const end = company.points[5];
  const multiple = end.value / start.value;
  return {
    start: start.date,
    end: company.endDate,
    cumulative: (multiple - 1) * 100,
    annualized: (Math.pow(multiple, 1 / period) - 1) * 100,
    valueOfTenThousand: 10000 * multiple,
  };
}

export function annualReturns(company: HistoricalCompany) {
  return company.points.slice(1).map((point, index) => ({
    start: company.points[index].date,
    end: point.date,
    value: (point.value / company.points[index].value - 1) * 100,
  }));
}
