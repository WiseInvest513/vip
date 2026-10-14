export type CompanySector = {
  id: string;
  title: string;
  tickers: string[];
  business: string;
  watch: string;
  risk: string;
  question: string;
  sources: { label: string; href: string }[];
};

export type CompanyLesson = {
  title: string;
  body: string;
};

// Educational research candidates, checked against company disclosures on 2026-10-14.
// The questions and observation frameworks are editorial guidance, not issuer forecasts.
export const companySectors: CompanySector[] = [
  {
    id: "payment-networks",
    title: "支付网络",
    tickers: ["V"],
    business:
      "Visa 把消费者、商户与金融机构连接起来，提供支付网络和相关服务。研究这门生意，要分清支付金额、处理笔数、跨境业务与增值服务分别怎样贡献收入，以及客户为什么愿意持续使用这张网络。",
    watch:
      "从支付金额、交易笔数和跨境交易变化开始，再看客户激励对净收入的影响。把收入增长拆成消费活动、业务结构和服务拓展，追问新增收入是否需要更高成本，以及客户关系是否仍有持续性。",
    risk:
      "支付网络受到监管、诉讼与竞争约束，账户间转账等替代路径也可能改变交易流向。研究时还要检查网络安全、系统中断及客户激励压力，不能把数字支付普及直接等同于公司的盈利能力必然增强。",
    question: "如果支付越来越方便，为什么银行和商户仍愿意为 Visa 的网络付费？",
    sources: [
      {
        label: "Visa 官方年度报告与经营指标",
        href: "https://annualreport.visa.com/financials/default.aspx",
      },
      {
        label: "Visa 2024 年报：业务与风险因素",
        href: "https://s1.q4cdn.com/050606653/files/doc_financials/2024/ar/Visa-Fiscal-2024-Annual-Report.pdf",
      },
    ],
  },
  {
    id: "membership-retail",
    title: "消费与会员零售",
    tickers: ["COST"],
    business:
      "Costco 通过会员制仓储零售，把有限商品选择、采购规模和库存周转结合起来。研究重点是低价如何吸引复购、会费如何支持经营，以及新门店能否复制这种关系，而不是只记住一家商店人很多。",
    watch:
      "把会员续费、会员数量、客流与客单价分开观察，再核对同店销售和新店贡献。阅读财报时注意汇率、燃油价格等因素对口径的影响，并持续检查库存、人工成本与经营现金流是否跟得上扩张。",
    risk:
      "低毛利经营需要持续控制采购和运营成本，工资、商品成本、关税与竞争变化都可能压缩利润。会员价值感下降或扩张执行不佳，也可能削弱续费和周转，不能用门店热闹替代对盈利质量的核查。",
    question: "会员为什么愿意每年续费，这份理由在门店扩张后还能保持吗？",
    sources: [
      {
        label: "Costco 2025 年报",
        href: "https://s201.q4cdn.com/287523651/files/doc_financials/2025/ar/COST-Annual-Report-2025.pdf",
      },
    ],
  },
  {
    id: "medical-devices",
    title: "医疗与手术设备",
    tickers: ["ISRG"],
    business:
      "Intuitive Surgical 围绕达芬奇手术系统等平台，提供设备、器械耗材与服务。设备进入医院只是起点，后续实际使用才连接持续收入；研究需要同时理解临床价值、医院投入与医生采用这套系统的条件。",
    watch:
      "把设备装机、实际手术量与器械耗材收入放在一起看，判断增长来自更多医院采用，还是已有设备使用增加。继续核对新平台的接受程度、租赁与销售结构，以及医院能否承担相关投入和使用成本。",
    risk:
      "医院预算、竞争技术、产品审批和医疗支付环境都可能影响采用速度，设备安全与产品责任也是重要风险。先进技术并不自动意味着每种手术都适用，装机增长也需要后续使用和服务能力来兑现。",
    question: "一台设备卖进医院之后，什么会决定它被持续使用，以及收入能否延续？",
    sources: [
      {
        label: "Intuitive Surgical 2025 年度 10-K",
        href: "https://isrg.intuitive.com/sec-filings/sec-filing/10-k/0001035267-26-000010/",
      },
      {
        label: "Intuitive Surgical 2025 年度经营结果",
        href: "https://isrg.intuitive.com/news-releases/news-release-details/intuitive-announces-fourth-quarter-earnings-5/",
      },
    ],
  },
  {
    id: "electrical-industrials",
    title: "工业与电气设备",
    tickers: ["ETN"],
    business:
      "Eaton 提供电力管理相关产品与服务，应用覆盖数据中心、工业、建筑等场景，并经营航空等业务。研究时先拆分业务，再看客户为什么需要配电、保护和供电设备，以及公司的产品处在项目的哪一环。",
    watch:
      "先看电气业务的订单和积压订单，再跟踪交付、产能投入与利润率，判断需求能否转化为现金。把数据中心、工业和其他终端市场分开，区分价格、销量与并购贡献，避免只用一个热门主题解释整家公司。",
    risk:
      "客户项目推迟、供应链短缺和原材料涨价，都可能让订单与实际收入出现落差。扩产和并购也需要资金与执行能力；当需求放缓或成本无法传导时，已有规模并不能保证利润率继续改善。",
    question: "订单变多之后，公司能否按时交付，并把这份需求变成经营现金？",
    sources: [
      {
        label: "Eaton 2025 年报",
        href: "https://www.eaton.com/us/en-us/company/investor-relations/investor-toolkit/financial-reports/annual-report.html",
      },
      {
        label: "Eaton 2025 年度经营结果与风险说明",
        href: "https://www.eaton.com/content/dam/eaton/company/investor-relations/quarterly-earnings/filings/2025/q4/4Q-2025-earnings-complete.pdf",
      },
    ],
  },
  {
    id: "semiconductor-equipment",
    title: "半导体设备",
    tickers: ["ASML"],
    business:
      "ASML 向芯片制造企业提供光刻系统及相关服务。研究这家公司，要连接芯片制造需求、客户资本开支和设备技术升级，理解客户为什么需要某类机器，以及设备交付后，维护和升级怎样形成后续业务。",
    watch:
      "同时观察客户扩产计划、设备订单、交付节奏与收入确认，避免把单季订单当成完整趋势。继续核对不同技术产品的采用、装机服务需求和关键供应商产能，判断技术进展能否转化为客户实际投入。",
    risk:
      "客户资本开支具有周期性，订单也可能延后或取消；出口限制与客户地域集中会影响可服务市场。复杂设备还依赖关键供应商和技术执行，技术优势不能消除需求、交付及地缘变化带来的波动。",
    question: "客户为什么需要下一代光刻设备，又有哪些条件会让它推迟采购？",
    sources: [
      {
        label: "ASML 2025 年报与风险披露",
        href: "https://www.investor.asml.com/annual-reports/2025/downloads",
      },
    ],
  },
  {
    id: "energy-infrastructure",
    title: "能源基础设施",
    tickers: ["ENB"],
    business:
      "Enbridge 经营油气管道、储运和天然气公用事业等资产。研究重点是能源如何送到客户手中、服务怎样收费，以及合同与监管机制怎样影响收入；各业务承担的需求、价格和建设风险，需要分别理解。",
    watch:
      "按业务核对输送需求、收费安排和监管决定，再看项目建设进度、资本开支与债务到期。把经营产生的现金、维护投入和扩张资金放在一起，判断既有资产表现与新增项目是否都能支持长期经营。",
    risk:
      "项目审批、收费监管、管道安全和诉讼可能改变经营条件，利率与再融资成本也会影响资金压力。长期合同不能覆盖所有风险，客户信用、工程超支和能源需求变化，都可能影响现金流的持续性。",
    question: "一项长期基础设施合同，究竟锁定了什么收入，又留下了哪些风险？",
    sources: [
      {
        label: "Enbridge 2025 年度 10-K",
        href: "https://www.enbridge.com/investment-center/reports-and-sec-filings/sec-filings/sec-filing-details?docId=265268",
      },
      {
        label: "Enbridge 官方业务介绍",
        href: "https://www.enbridge.com/reports/2025-sustainability-report/about-us",
      },
    ],
  },
];

export const companyLessons: CompanyLesson[] = [
  {
    title: "盈利质量：增长从哪里来",
    body:
      "先把营收、利润和现金流分开，再问增长来自销量、价格、并购，还是一次性项目。将利润表与现金流量表、应收账款和库存一起核对，确认会计口径与报告期。一个季度的漂亮数字只能提出问题，持续性需要后续经营来验证。",
  },
  {
    title: "护城河：客户为什么留下",
    body:
      "从客户选择出发：产品解决什么问题，换供应商需要付出什么，竞争者为什么难以复制。品牌、网络和规模只是可能的原因，要用续费、客户留存、定价和竞争变化检查。优势会变化，不能仅凭公司知名或过去成功就认定它永久存在。",
  },
  {
    title: "资本配置：赚到的钱去了哪里",
    body:
      "公司赚到钱之后，会选择研发、扩产、收购、偿债、分红或回购。逐项核对投入的目的、资金来源和后续回报，也看管理层有没有为扩张付出过高代价。回购金额大不等于每股价值增加，新增债务、买入价格和股权稀释都要一起考虑。",
  },
  {
    title: "估值：好生意需要多少预期兑现",
    body:
      "把公司质量与支付的价格分开。先选择适合业务和盈利阶段的指标，再写下增长、利润率与资金需求的假设，分别检查乐观和不利情形。同行比较要对齐口径；看似便宜可能反映业务恶化，高增长也不能证明任何价格都合理。",
  },
  {
    title: "退出条件：什么会让判断改变",
    body:
      "在形成持有判断时，就写清它依赖的业务条件、预期观察周期，以及哪些证据会推翻理由。区分价格波动、预期未兑现和竞争地位受损，出现新信息后重新评价。长期持有需要持续核对，不能只因已经投入时间或出现亏损而拒绝修正。",
  },
];
