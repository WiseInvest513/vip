import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Crown, Plus } from "lucide-react";
import { JoinFrame } from "@/components/portal/join-frame";
import { GuideTabs } from "@/components/invest/guide-tabs";
import { RiskPlanner } from "@/components/invest/risk-planner";
import { CompoundCalculator } from "@/components/invest/compound-calculator";
import { HistoricalReturns } from "@/components/invest/historical-returns";
import { AllocationPlanner } from "@/components/invest/allocation-planner";
import { InvestmentChannels, RouteSupport } from "@/components/invest/route-support";
import { dcaFamilies, dcaLessons } from "@/lib/invest/dca";
import { companySectors, companyLessons } from "@/lib/invest/companies";
import vip from "@/app/vip/vip.module.css";
import s from "./invest.module.css";

export const metadata = {
  title: "投资 Invest · Wise VIP",
  description: "Wise 寄语：不求每一次全垒打，更希望一起走得长远。从 30% 定投、50% 长线、20% 合约保证金预算出发，学习资金安排、企业研究与交易纪律。",
  alternates: { canonical: "/invest" },
};

function Sources({ items }: { items: { label: string; href: string }[] }) {
  return <div className={s.sources}><span>官方资料</span>{items.map(item => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div>;
}

function More({ title, children }: { title: string; children: ReactNode }) {
  return <details className={s.more}><summary>{title}<Plus size={17} aria-hidden="true" /></summary><div className={s.moreBody}>{children}</div></details>;
}

function Dca() {
  return <article aria-labelledby="dca-heading">
    <div className={s.routeHead}><p className={vip.eyebrow}>01 / 持续定投</p><h2 id="dca-heading" className={vip.sectionHeading}>让每个月的投入，<br />慢慢成为你的积累。</h2><p className={vip.sectionIntro}>想开始投资，又不想每天盯盘，可以先了解 DCA：按固定节奏投入一定金额。先把金额与时间算清楚，再选择自己理解的资产。</p></div>
    <div className={s.routeMap} aria-label="定投学习路径"><span>看懂投入节奏</span><ArrowRight size={13} /><span>试算积累过程</span><ArrowRight size={13} /><span>选产品与渠道</span></div>
    <div id="dca-calculator" className={s.toolAnchor} tabIndex={-1}><CompoundCalculator /></div>
    <div className={s.blockHeading}><div><h3>先从一个方向开始。</h3><p>按底层资产选择，再展开比较同类产品。</p></div><span className={s.collectionCount}>6 个方向 / 10 只产品</span></div>
    <div id="dca-products" className={s.productGrid}>{dcaFamilies.map(item => <details key={item.title} className={s.product}>
      <summary><span className={s.productHeading}>{item.title}<Plus size={16} aria-hidden="true" /></span><span className={s.productCodes}>{item.tickers.map(ticker => <span key={ticker}>{ticker}</span>)}</span><span className={s.productLead}>{item.role}</span><span className={s.detailHint}>了解产品与区别 <ArrowUpRight size={14} aria-hidden="true" /></span></summary>
      <div className={s.productBody}><p>{item.explanation}</p><p className={s.insight}>{item.question}</p><Sources items={item.sources} /></div>
    </details>)}</div>
    <p className={s.note}>这是产品研究入口，非统一配置。近期要用的钱与借来的钱不用于定投；买入前确认账户可买范围、费用与税务条件。</p>
    <More title="第一次定投前，再了解这几件事">
      {dcaLessons.map(item => <div className={s.lesson} key={item.title}><h4>{item.title}</h4><p>{item.body}</p></div>)}
      <div className={s.example}><h4>小例子：成本下降了，也可能仍在亏损</h4><p>假设连续四次各投入 100，买入价格分别为 100、80、100、80。共投入 400，买到 4.5 份，平均成本约 88.89。若期末价格是 80，持仓价值是 360，仍亏损 40（10%）。</p><p className={s.note}>虚拟价格，仅解释定投机制；忽略费用、税费与分红，不代表任何产品的历史收益。</p></div>
      <Sources items={[{ label: "Investor.gov：定投", href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging" }]} />
    </More>
    <InvestmentChannels mode="dca" />
    <RouteSupport route="dca" />
  </article>;
}

const companyNames: Record<string, string> = { V: "Visa", COST: "Costco", ISRG: "直觉外科", ETN: "Eaton", ASML: "阿斯麦", ENB: "Enbridge" };
const companyEntrances: Record<string, string> = { V: "每一次刷卡背后的支付网络", COST: "低价、会员费与不断复购的日常消费", ISRG: "从手术设备，到持续使用的器械与服务", ETN: "让数据中心、工厂与建筑用上电", ASML: "把芯片设计变成实物的关键设备", ENB: "连接能源产地与用户的长期基础设施" };


function Companies() {
  return <article aria-labelledby="companies-heading">
    <div className={s.routeHead}><p className={vip.eyebrow}>02 / 长线持有</p><h2 id="companies-heading" className={vip.sectionHeading}>从看得懂的生意开始。</h2><p className={vip.sectionIntro}>从你熟悉的产品与服务，找到背后的公司。看真实业务，跟踪盈利和现金流，再判断什么价格值得长期参与。</p></div>
    <div className={s.routeMap} aria-label="长期持有学习路径"><span>了解公司业务</span><ArrowRight size={13} /><span>对照历史表现</span><ArrowRight size={13} /><span>跟踪经营变化</span></div>
    <div id="company-performance" className={s.toolAnchor} tabIndex={-1}><HistoricalReturns /></div>
    <div className={s.blockHeading}><div><h3>把视野，再打开一些。</h3><p>支付、消费、医疗、工业……从生活和产业里寻找好生意。</p></div><span className={s.collectionCount}>6 个行业样本</span></div>
    <div className={s.productGrid}>{companySectors.map(item => <details key={item.id} className={s.product}>
      <summary><span className={s.productHeading}>{item.title}<Plus size={16} aria-hidden="true" /></span><span className={s.companyIdentity}><strong>{item.tickers[0]}</strong><span>{companyNames[item.tickers[0]]}</span></span><span className={s.productLead}>{companyEntrances[item.tickers[0]]}</span><span className={s.detailHint}>了解业务与观察重点 <ArrowUpRight size={14} aria-hidden="true" /></span></summary>
      <div className={s.productBody}><p className={s.insight}>{item.question}</p><h4>业务是什么</h4><p>{item.business}</p><h4>持续看哪些数据</h4><p>{item.watch}</p><h4>什么可能改变判断</h4><p>{item.risk}</p><Sources items={item.sources} /></div>
    </details>)}</div>
    <p className={s.note}>以上是业务研究样本，尚未逐一评估当前估值，不是现价买入名单。长期持有也需要持续跟踪经营变化。</p>
    <More title="看财报时，重点留意什么？">{companyLessons.map(item => <div className={s.lesson} key={item.title}><h4>{item.title}</h4><p>{item.body}</p></div>)}<Link className={vip.textLink} href="/chat/earnings-quality">继续阅读：财报中的增长质量<ArrowRight size={14} aria-hidden="true" /></Link></More>
    <InvestmentChannels mode="companies" />
    <RouteSupport route="companies" />
  </article>;
}

function Risk() {
  return <article aria-labelledby="risk-heading">
    <div className={s.routeHead}><p className={vip.eyebrow}>03 / 合约风控</p><h2 id="risk-heading" className={vip.sectionHeading}>动手算一次，再决定开多少。</h2><p className={vip.sectionIntro}>以 10 万元人民币投资预算为例，最多划出 2 万元作为合约保证金预算。调整金额与倍数，看看名义仓位和计划亏损怎样变化。</p></div>
    <div className={s.routeMap} aria-label="合约风控学习路径"><span>划定资金</span><ArrowRight size={13} /><span>计算仓位与损失</span><ArrowRight size={13} /><span>模拟退出与复盘</span></div>
    <div id="risk-example" className={s.toolAnchor} tabIndex={-1}><RiskPlanner /></div>
    <div className={s.actionGrid}>
      <div><span>开仓前</span><h3>先写退出条件</h3><p>确认合约类型、标记价、保证金模式和费用。先确定止损位置，再用计划亏损反推仓位；2 万元是合约保证金预算上限，多笔仓位合并计算，也不必用满。</p></div>
      <div><span>持仓时</span><h3>按计划处理</h3><p>到达止损位置按原计划退出，不因为不想亏而不断放宽。检查多个仓位的共同风险；同方向持仓不能只看单笔用了多少保证金。</p></div>
      <div><span>交易后</span><h3>连亏时先暂停</h3><p>可以在模拟计划里设定连亏两笔后暂停，复盘再决定是否继续。暂停阈值需要事先确定，不能用加倍开仓把上一笔亏损追回来。</p></div>
    </div>
    <More title="能扛到什么时候？为什么不能等强平才退出？">
      <p>强平取决于标记价格、维持保证金、费用及平台规则，不能只看杠杆倍数。上方工具会随当前倍数更新理论估算；它用于识别风险边界，不是等待退出的位置。</p>
      <p><strong>按自己的计划止损，不能把“还能扛住”当成继续持有的理由。</strong>跳空、滑点或止损单未成交时，实际损失可能超过计划值；交易前要查明触发价格、订单类型和平台强平规则。</p>
      <p>若改为全仓或开启自动追加，其他余额也可能被用于支持仓位。只要平台、合约或设置不同，就要重新核对，不能套用本例的资金隔离假设。</p>
    </More>
    <More title="同样是 2 万元保证金预算，提高杠杆会怎样？">
      <div className={s.tableWrap} tabIndex={0} role="region" aria-label="不同杠杆下的示例损失，人民币等值口径"><table><thead><tr><th>杠杆</th><th>名义仓位</th><th>价格下跌 2.5%</th></tr></thead><tbody><tr><td>2 倍</td><td>40,000 元</td><td>亏损 1,000 元</td></tr><tr><td>3 倍</td><td>60,000 元</td><td>亏损 1,500 元</td></tr><tr><td>5 倍</td><td>100,000 元</td><td>亏损 2,500 元</td></tr></tbody></table></div>
      <p>如果单笔计划亏损仍是 1,000 元、止损距离仍是 2.5%，名义仓位就应维持在 40,000 元。使用 5 倍时对应保证金约 8,000 元，而不是因为预算上限是 20,000 元，就把仓位扩大到 100,000 元。</p><p className={s.note}>金额均为人民币等值预算，未计汇率变化与费用。以上倍数只用于对比，不是可用杠杆推荐；实际结算币种、强平与保证金要求以平台规则为准。</p>
    </More>
    <More title="代币化美股，下单前先看清你交易的是什么">
      <p>股票、现货代币和以股票价格为参考的永续合约，代表的权利可能不同。先查发行人或交易平台的正式说明：有没有底层资产支持、如何托管或赎回、是否享有股息与投票权，以及所在地区是否允许参与。</p><p>对于合约，还要确认参考价格、标记价格与交易时段。美股休市时的流动性、开盘跳空、资金费和强平规则，都可能影响成交；股票代码相似，并不说明风险和持有真实股票相同。</p>
    </More>
    <RouteSupport route="risk" />
    <Sources items={[{ label: "CFTC：杠杆交易风险", href: "https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html" }, { label: "Investor.gov：止损单", href: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15" }, { label: "平台规则示例：永续合约", href: "https://www.coinbase.com/international-exchange/legal/trading-rules" }]} />
  </article>;
}

export default function Invest() {
  return <JoinFrame>
    <section className={`${vip.hero} ${s.hero}`} aria-labelledby="invest-title">
      <div className={vip.heroCopy}>
        <p className={vip.welcome}><Crown size={16} aria-hidden="true" />Wise 寄语<span>投资 · INVEST</span></p>
        <h1 id="invest-title">不求每一次全垒打，<br />更希望我们走得长远。</h1>
        <blockquote className={s.message}>
          <p>市场里，风险与收益始终相伴。我们不追求每一次都押中，更希望每一位朋友都能走得稳一些，在市场里留得久一些。</p>
          <p>这就是我们聚在一起的意义，也是<strong>「要买就买十年」</strong>想传达的态度：把眼光放长，把风险管住，让时间成为积累的一部分。</p>
        </blockquote>
        <p className={s.signature}>— Wise</p>
      </div>
    </section>
    <section id="investment-allocation" className={s.allocationSection} tabIndex={-1} aria-labelledby="allocation-heading">
      <div className={s.routeHead}><p className={vip.eyebrow}>先分好资金，再开始行动</p><h2 id="allocation-heading" className={vip.sectionHeading}>我们提倡的资金配比。</h2><p className={vip.sectionIntro}>把大部分资金留给持续积累与企业成长，为合约交易划定单独的预算。</p></div>
      <AllocationPlanner />
    </section>
    <div className={s.learningIntro}><p className={vip.eyebrow}>把配比落实到行动</p><h2 className={vip.sectionHeading}>每一份资金，都有自己的功课。</h2><p className={vip.sectionIntro}>从定投开始，逐步理解企业；准备做合约之前，先把仓位、止损和退出计划算清楚。</p></div>
    <GuideTabs dca={<Dca />} companies={<Companies />} risk={<Risk />} />
    <div className={s.followThrough}><div><h2>从一个方向开始，和我们持续研究。</h2><p>研究文章、产业观察、群内讨论与定期交流，帮助你持续理解自己关注的方向。公开内容可以先学，深度内容按各页面会员权限阅读。</p></div><Link className={vip.secondary} href="/join">了解 VIP 体系<ArrowRight size={16} aria-hidden="true" /></Link></div>
  </JoinFrame>;
}
