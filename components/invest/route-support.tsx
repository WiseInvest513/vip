import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Building2, Globe2, Landmark } from "lucide-react";
import styles from "./route-support.module.css";

type Route = "dca" | "companies" | "risk";

const channels = [
  { title: "境内证券账户", subtitle: "从场内基金了解起", icon: Landmark, body: "在账户中查找对应市场的境内上市 ETF；跟踪海外指数的 QDII ETF，与直接持有美国上市 ETF 是不同产品。先核对基金代码、跟踪指数和交易单位。", check: "确认折溢价、跟踪误差、费用与汇率影响。定期手动买入也能形成计划，自动定投功能须向券商确认。", href: "https://www.wise-invest.org/perk/broker#a-share-broker", label: "境内券商与开户说明" },
  { title: "香港券商账户", subtitle: "了解港美股与月供功能", icon: Building2, body: "在已获准交易的市场里，查找股票或 ETF。部分平台提供月供或定投功能；例如富途的美股定投需要碎股权限，并限于其支持名单。", check: "先确认开户资格、可买市场与入金费用。定投前保证足够现金，核对会不会自动使用融资购买力。", href: "https://www.wise-invest.org/perk/broker#hk-broker", label: "港资券商与开户教程" },
  { title: "美国及国际券商账户", subtitle: "直接研究美股与 ETF", icon: Globe2, body: "按账户权限寻找目标证券。IBKR 的 Recurring Investments 可对支持的证券设置金额与周期，需要开通碎股交易；其他券商的支持范围各不相同。", check: "确认服务主体、居住地资格、税务表格、换汇和佣金。购买真实股票时，检查订单的产品类型与交易所。", href: "https://www.wise-invest.org/perk/broker#us-broker", label: "美资券商与开户教程" },
];

const companyChannelCopy = [
  { subtitle: "通过基金参与相关市场", body: "如果通过境内上市 ETF 参与海外市场，持有的是基金份额。先看基金持仓能否覆盖你关注的行业；持有一篮子公司，与单独买入其中一家公司的股票不同。", check: "核对基金代码、底层持仓、折溢价与费用。不要把跟踪海外市场的基金，与同名公司股票混淆。" },
  { subtitle: "核对港美股权限与真实股票", body: "选择具有对应市场交易权限的账户，在证券页面核对公司、代码和交易所。想长期持有真实股票，就在订单里确认买入的是股票，而非以股价为参考的合约。", check: "查看可用现金、结算币种、交易费与股息处理。核对订单会不会动用融资，避免无意中把长期持有变成杠杆仓位。" },
  { subtitle: "把账户服务与持有计划对应起来", body: "通过符合自身地区与身份条件的券商账户研究美股。除了买卖费，还要了解资金存取、公司行动、股息处理与转仓，选择能支持自己长期使用的账户。", check: "开户前核对服务主体与资格；买入前看已结算现金、订单类型和费用，不把历史股息或涨幅当作未来承诺。" },
];

export function InvestmentChannels({ mode }: { mode: "dca" | "companies" }) {
  return <section className={styles.channels} aria-labelledby={`${mode}-channels-title`} id={`${mode}-channels`}>
    <div className={styles.heading}><span>把计划落到实际账户</span><h3 id={`${mode}-channels-title`}>{mode === "dca" ? "想开始定投，可以从哪里入手？" : "想长期持有，通过什么账户参与？"}</h3><p>先按自己的地区、账户和目标市场选渠道，再确认能买到的具体产品。</p></div>
    <div className={styles.channelGrid}>{channels.map(({ title, subtitle, icon: Icon, body, check, href, label }, index) => <article key={title}>
      <Icon size={22} strokeWidth={1.4} aria-hidden="true" /><h4>{title}</h4><span>{mode === "companies" ? companyChannelCopy[index].subtitle : subtitle}</span><p>{mode === "companies" ? companyChannelCopy[index].body : body}</p><details><summary>操作前核对什么？</summary><p>{mode === "companies" ? companyChannelCopy[index].check : check}</p></details><a href={href} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={14} aria-hidden="true" /></a>
    </article>)}</div>
    <div className={styles.sourceRow}><span>功能说明</span><a href="https://www.interactivebrokers.com/en/trading/recurring-investments.php" target="_blank" rel="noopener noreferrer">IBKR 定投</a><a href="https://www.futuhk.com/cn/en/support/topic2_1673" target="_blank" rel="noopener noreferrer">富途定投</a><a href="https://www.sse.com.cn/disclosure/fund/announcement/c/new/2025-08-22/513870_20250822_7P7D.pdf" target="_blank" rel="noopener noreferrer">QDII ETF 产品与风险说明</a></div>
    <p className={styles.note}>以上是渠道与功能示例，不代表所有地区均可开户或所有产品均可定投；实际资格、费用及支持名单以对应机构当前规则为准。主站教程含 Wise 合作渠道，是否使用与本页学习无关。</p>
  </section>;
}

const nextSteps: Record<Route, { title: string; steps: [string, string][]; reading: { title: string; summary: string; href: string; label: string }[] }> = {
  dca: {
    title: "把第一份定投计划定下来。",
    steps: [["定金额", "从可持续的结余里确定每月投入，单独留出近期生活所需。"], ["定产品", "先理解一个方向，再检查同类 ETF 和已有持仓是否重叠。"], ["定节奏", "确认账户与费用，设定日期；首次执行后核对成交和剩余现金。"]],
    reading: [{ title: "研究少一点，理解深一点", summary: "把注意力留给能持续跟踪的对象，避免同时买入一堆自己不熟悉的产品。", href: "/chat/research-fewer-products", label: "阅读精选讨论" }, { title: "资料与工具", summary: "从书籍、官方资料和研究网站继续查证，把定投变成能够长期执行的计划。", href: "/learn", label: "打开资料目录" }],
  },
  companies: {
    title: "先选一家，跟踪一门真实的生意。",
    steps: [["看业务", "能用自己的话说明：客户是谁，为什么愿意付钱。"], ["看财报", "核对收入、利润与现金流，区分经营增长和市场给出的估值。"], ["持续跟踪", "记住判断依据；下一次财报到来时，检查经营是否按预期发展。"]],
    reading: [{ title: "从财报中看增长质量", summary: "收入增长只是起点，继续追问利润和现金流能否兑现，以及增长需要付出什么代价。", href: "/chat/earnings-quality", label: "阅读财报讨论" }, { title: "从 AI 需求看产业机会", summary: "黑石的八个判断：从企业真实回报出发，理解下一阶段的产业机会与投资选择。", href: "/article/blackstone-ai-age-of-discovery", label: "试读研究文章" }],
  },
  risk: {
    title: "先走完一笔模拟交易。",
    steps: [["确认规则", "查清真实合约类型、逐仓或全仓、标记价、维持保证金与费用。"], ["计算损失", "先设退出条件，再计算保证金与仓位；把其他持仓的共同风险一起考虑。"], ["模拟复盘", "模拟一次入场与退出，比较计划与成交差异。能接受损失，再决定是否参与。"]],
    reading: [{ title: "挂单、成交与执行", summary: "价格到过某个位置，不等于你的订单必然成交。把交易计划与真实执行分开理解。", href: "/chat/orders-and-execution", label: "阅读执行讨论" }, { title: "把纪律放在操作之前", summary: "回到群里的真实问题，看计划如何制定、什么情况下需要退出，以及事后如何复盘。", href: "/chat/investment-principles", label: "阅读投资原则" }],
  },
};

export function RouteSupport({ route }: { route: Route }) {
  const content = nextSteps[route];
  return <section className={styles.support} aria-labelledby={`${route}-next-title`}>
    <div className={styles.heading}><span>你的下一步</span><h3 id={`${route}-next-title`}>{content.title}</h3></div>
    <ol className={styles.steps}>{content.steps.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{body}</p></li>)}</ol>
    <div className={styles.readingHeading}><BookOpen size={17} aria-hidden="true" /><span>在 Wise VIP，沿这个方向继续学</span></div>
    <div className={styles.readings}>{content.reading.map(item => <article key={item.href}><h4>{item.title}</h4><p>{item.summary}</p><Link href={item.href}>{item.label}<ArrowRight size={14} aria-hidden="true" /></Link></article>)}</div>
    {route === "companies" ? <a className={styles.chain} href="https://chain.wise-invest.org/" target="_blank" rel="noopener noreferrer">在 CHAIN 继续看产业链与公司关系<ArrowUpRight size={14} aria-hidden="true" /></a> : null}
  </section>;
}
