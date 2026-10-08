import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Crown } from 'lucide-react';
import { LandingExperience } from '@/app/vip/landing-experience';
import { CommunityGallery } from '@/app/vip/community-gallery';
import { Footer } from '@/components/portal/shared';
import { Highlights } from '@/components/point/highlights';
import { Tracker } from '@/components/point/tracker';
import records from '@/lib/point/records.json';
import vip from '@/app/vip/vip.module.css';
import s from '@/components/point/point.module.css';

export const metadata = {
  title: '观点追踪 · Wise VIP',
  description: '公开回看 Wise VIP 的历史观点、关注线索与赛道讨论。保留原话和日期，对照 Nasdaq 官方历史收盘价，理解判断与后续价格变化。',
  alternates: { canonical: '/point' },
};
const sections = [['point-records','重点标的'],['point-watch','关注线索'],['point-sectors','更多赛道']] as const;
const watch = [
  {title:'从一份涨幅榜开始',date:'2026-09-21',kind:'群内转发 · 年度榜单',tickers:['TWST','MRNA','AEHR','DELL','AXTI','PENG','DOCN'],quote:'以下是2026年表现最佳的15只股票',description:'当时转发了一份覆盖存储、光通信、生物科技等方向的年度表现榜单。榜单是发现研究对象的线索，其中的年度涨幅发生在转发之前，不能算作我们关注之后的收益。',lesson:'学习重点：把榜单里的公司重新放回财报、业务和估值中核对。入榜本身不能替代研究。',line:18753},
  {title:'沿产业链扩展观察',date:'2026-09-09',kind:'Wise 原话 · 观察清单',tickers:['LITE','ANET','ETN','CEG','CRM','NOW','SNOW','TEAM','HSAI'],quote:'光： lite anet\n数据中心： etn ceg\n软件：crm now snow team',description:'从光通信和数据中心，延伸到软件与其他方向。这份清单体现了当时的关注范围，没有为每家公司给出具体买入价格。',lesson:'学习重点：先理解公司解决什么问题，再判断产业增长能否转化成公司的收入和利润。',line:10589},
  {title:'带着问题看财报',date:'2026-10-04',kind:'Wise 整理 · 每周日历',tickers:['STZ','PEP','DAL'],quote:null,description:'每周讨论不只有交易点位，也包括财报、经济数据与接下来需要观察的事件。列进日历，表示值得关注披露的信息，并不表示已经形成看多判断。',lesson:'学习重点：提前写清楚要从财报确认什么，再对照披露结果与市场反应。',line:38437},
];
const sectors = [
  {title:'大型科技',tickers:['AAPL','MSFT','GOOGL','AMZN','META','TSLA'],description:'从公司业务、财报和市场预期，讨论大公司的不同增长逻辑。群内既有长期持有的交流，也有需要谨慎的判断。',quote:'meta 他本质和这些科技股不一样 他要去研究就要去研究另外一套逻辑',date:'2026-09-16 11:49:46',line:14947,lesson:'可以学习：同属科技股，不等于用同一套逻辑估值。',href:'/chat/research-fewer-products',link:'阅读公司研究讨论'},
  {title:'软件与云',tickers:['ORCL','NBIS','CRM','NOW','SNOW','TEAM'],description:'既讨论云与算力公司，也把企业软件放进观察清单。明确表达过判断的公司，与仅列入清单的公司分开记录。',quote:'Oracle是一个有点被低估的一个企业',date:'2026-09-10 13:52:33',line:11571,lesson:'可以学习：从一句“低估”继续追问，收入、投入与现金流能否支撑这个判断。',href:'/chat/earnings-quality',link:'阅读财报研究讨论'},
  {title:'金融与交易平台',tickers:['CRCL','HOOD','MSTR','BRK.B','GS'],description:'群内讨论覆盖交易平台、加密相关股票与金融公司。保留判断修正和不同群友的提问，不把所有提及都归为 Wise 的买入建议。',quote:'害害害   crcl 先不着急哈 我看错了 这个别着急上',date:'2026-09-30 21:05:29',line:32996,lesson:'可以学习：先辨认资产和业务，发现看错时及时修正，而不是为了保持立场继续解释。',href:'/chat/investment-principles',link:'阅读投资原则讨论'},
];

export default function PointPage() {
  return <main className={`${vip.page} ${s.page}`}>
    <LandingExperience sections={sections} label="观点追踪目录" hero={
      <section id="invitation" tabIndex={-1} aria-labelledby="point-title" className={vip.hero}>
        <div className={vip.heroCopy}>
          <p className={vip.welcome}><Crown size={16} aria-hidden="true"/>WISE VIP<span>一起关注，也一起复盘</span></p>
          <h1 id="point-title">当时的观点，后来的变化。<br/><span>和 Wise 一起，把判断看完整。</span></h1>
          <p className={vip.heroDescription}>回到群里聊过的公司，保留当时的原话与日期。<br/>对照市场价格，也看见观点变化和判断的边界。</p>
          <div className={vip.actions}><a className={vip.primary} href="#point-records">查看历史观点<ArrowRight size={16}/></a><Link className={vip.secondary} href="/join">了解加入方式<ArrowUpRight size={15}/></Link></div>
          <p className={`${vip.heroFootnote} ${s.heroFootnote}`}>本页全部公开 · 无需登录 · 行情快照截至 2026.10.07 美股收盘</p>
        </div>
        <div className={vip.heroGallery}><CommunityGallery/></div>
      </section>
    }>
      <section id="point-records" tabIndex={-1} className={vip.section} aria-labelledby="records-title">
        <div className={vip.sectionHeader}><div><p className={vip.eyebrow}>01 / 重点标的</p><h2 id="records-title" className={vip.sectionHeading}>当时聊过的位置，现在走到哪里。</h2><p className={`${vip.sectionIntro} ${s.sectionIntro}`}>十三个重点标的，从原始讨论到后续跟踪。展开一个标的，查看原话、日期和官方价格依据。</p></div><span className={`${vip.sectionAside} ${s.sectionAside}`}>统一收盘口径<br/>上涨与下跌都如实保留</span></div>
        <Highlights/>
        <details className={s.method}><summary>先看统计口径：首次提及，不等于买入推荐</summary><p>讨论时间范围：2026 年 8 月 24 日至 10 月 7 日。本页“首次聊到”指本份聊天导出中 Wise 本人的最早文字提及，不代表建群以来首次推荐；AAOI、PENG 最早来自转发榜单，CEG 是关注建议。</p><p>聊天时间为北京时间，交易日为纽约时间。基准取消息出现之后的第一个常规交易收盘价，盘后、周末或休市顺延。最新价为 2026 年 10 月 7 日常规收盘，固定快照不自动更新。区间价格变化 =（最新收盘价 ÷ 基准收盘价 − 1）× 100%，不是实际账户收益。</p><p>价格来自 Nasdaq 官方历史行情 Close/Last 字段，未计分红、杠杆和费用。原话中的均价、目标价、离场价单独保留，不混入统一价格对照；不使用最高价替代期末价格。图片和语音中的内容尚未纳入首次提及核验。</p></details>
        <Tracker records={records}/>
        <p className={s.note}>展示范围为本次选定的十三个重点标的，不是完整荐股记录、胜率统计或投资组合回报。历史价格变化不代表未来表现。</p>
      </section>
      <section id="point-watch" tabIndex={-1} className={vip.section} aria-labelledby="watch-title">
        <div className={vip.sectionHeader}><div><p className={vip.eyebrow}>02 / 关注线索</p><h2 id="watch-title" className={vip.sectionHeading}>值得留下的，也有关注的方向。</h2><p className={`${vip.sectionIntro} ${s.sectionIntro}`}>转发过的资料、列过的清单、提前留意的事件，都可以成为进一步研究的起点。</p></div></div>
        <div className={s.editorial}>{watch.map(item=><article key={item.title} data-vip-reveal><div><h3>{item.title}</h3><time dateTime={item.date}>{item.date}</time><small>{item.kind}</small></div><div><p>{item.description}</p><div className={s.tags}>{item.tickers.map(t=><span key={t}>{t}</span>)}</div>{item.quote&&<blockquote>{item.quote}<small>Wise 原话 · 节选</small></blockquote>}<p>{item.lesson}</p><Link href="/learn">去资料与工具核对 <ArrowUpRight size={13}/></Link></div></article>)}</div>
      </section>
      <section id="point-sectors" tabIndex={-1} className={vip.section} aria-labelledby="sectors-title">
        <div className={vip.sectionHeader}><div><p className={vip.eyebrow}>03 / 更多赛道</p><h2 id="sectors-title" className={vip.sectionHeading}>从一家公司，走进更大的问题。</h2><p className={`${vip.sectionIntro} ${s.sectionIntro}`}>除了半导体、存储与电力，我们也讨论大型科技、软件与云，以及金融和交易平台。</p></div></div>
        <div className={s.editorial}>{sectors.map(item=><article key={item.title} data-vip-reveal><div><h3>{item.title}</h3><div className={s.tags}>{item.tickers.map(t=><span key={t}>{t}</span>)}</div></div><div><p>{item.description}</p><blockquote>{item.quote}<small>Wise 原话 · {item.date} 北京时间</small></blockquote><p>{item.lesson}</p><Link href={item.href}>{item.link} <ArrowUpRight size={13}/></Link></div></article>)}</div>
      </section>
      <div className={s.closing}><div><h2>不只看结果，也读懂判断的过程。</h2><p>继续阅读精选讨论，或者和我们一起，把下一个问题聊透。</p></div><div className={vip.actions}><Link className={vip.primary} href="/chat">阅读精选讨论<ArrowRight size={16}/></Link><Link className={vip.secondary} href="/join">了解 VIP<ArrowUpRight size={15}/></Link></div></div>
    </LandingExperience><div className={vip.shell}><div className={s.footerContent}><Footer/></div></div>
  </main>;
}
