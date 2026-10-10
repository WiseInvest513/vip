import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { AmbientSurface } from "./vip/ambient-surface";
import { Motion } from "@/components/portal/motion";
import { Footer } from "@/components/portal/shared";
import { curatedDiscussions } from "@/lib/portal/curated-discussions";
import { principles } from "@/lib/portal/principles";
import { resources } from "@/lib/portal/resources";
import { isFreeDiscussion } from "@/lib/auth/discussion-access";
import { PUBLIC_PRINCIPLE_LIMIT } from "@/lib/auth/principle-access";
import { articles } from "@/lib/articles/content";
import records from "@/lib/point/records.json";
import { fedCycleCover, getArticleCover } from "@/lib/media/article-covers";
import { heroArtwork, discussionArtwork, reviewArtwork, learningArtwork } from "@/lib/media/portal-artwork";
import vip from "./vip/vip.module.css";
import frame from "@/components/portal/join-frame.module.css";
import s from "./home.module.css";

export const metadata = {
  title: "Wise VIP · 把认知，变成长期的复利",
  description: "阅读 WiseInvest 的市场手记、投资准则与精选讨论，回看历史观点，查找研究资料与工具。让每一次思考都有所积累。",
  alternates: { canonical: "/" },
};

const freeDiscussions = curatedDiscussions.filter(item => isFreeDiscussion(item.slug));
// Only public article previews are rendered; membership-only bodies stay on the server.
const startingDiscussions = freeDiscussions.slice(0, 3);
const latestArticles = [...articles]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 2)
  .map(({ slug, title, summary, date, readingMinutes, cover, coverAlt, access }) => ({ slug, title, summary, date, readingMinutes, cover, coverAlt, access }));
// The 160px-tall, contain-fit artwork paints at these widths, not the full card width.
// Browsers still select higher-resolution srcset variants for high-DPR screens.
const entries = [
  {
    title: "研究文章", href: "/article", action: "阅读市场手记",
    image: fedCycleCover, imageDisplayWidth: 285, alt: "读懂美联储，看清资产的变化 · WiseInvest",
    count: `${articles.length} 篇长文 · WiseInvest 原创`,
    description: "从美股、利率到公司与加密市场，阅读完整分析，理解当时的判断与依据。",
    access: "开放试读 · VIP 阅读全文",
  },
  {
    title: "精选讨论", href: "/chat", action: "读准则与讨论",
    image: discussionArtwork, imageDisplayWidth: 240, alt: "精选讨论与研究笔记",
    count: `${principles.length} 条准则 · ${curatedDiscussions.length} 篇讨论`,
    description: "从真实问题出发，读投资准则与群内讨论，理解分析、追问和复盘的过程。",
    access: `前 ${PUBLIC_PRINCIPLE_LIMIT} 条准则、${freeDiscussions.length} 篇讨论免费阅读`,
  },
  {
    title: "观点追踪", href: "/point", action: "回看历史观点",
    image: reviewArtwork, imageDisplayWidth: 240, alt: "研究笔记与观点复盘",
    count: `${records.length} 个重点标的 · 原话与后续变化`,
    description: "回看重点标的的历史观点，对照当时的原话、讨论日期与后续的价格变化。",
    access: "全部公开 · 无需登录",
  },
  {
    title: "资料与工具", href: "/learn", action: "查找研究资源",
    image: learningArtwork, imageDisplayWidth: 240, alt: "学习书籍与参考资料",
    count: `${resources.length} 项资源 · 按用途查找`,
    description: "按研究问题查找财报、宏观与产业资料，了解工具用途，再回到官方来源核对。",
    access: "目录公开 · 附用途与使用起点",
  },
];

export default function Home() {
  return <main className={`${vip.page} ${frame.page} ${s.home}`}>
    <Motion>
      <section className={s.hero} aria-labelledby="home-title">
        <div className={s.heroScene} aria-hidden="true"><Image src={heroArtwork} alt="" fill priority sizes="(max-width: 359px) calc(100vw - 32px), (max-width: 760px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 56px), (max-width: 1240px) calc(100vw - 80px), 1160px" className={s.heroArtwork} /></div>
        <div className={s.heroContent}>
          <p className={s.heroBrand}>Wise <span>VIP</span></p>
          <h1 id="home-title">把认知，变成长期的复利。</h1>
          <p className={s.heroDescription}>研究市场，交流判断，让每一次思考都有所积累。</p>
          <div className={`${vip.actions} ${s.heroActions}`}>
            <Link href="/article" className={vip.primary}>开始阅读<ArrowRight size={17} aria-hidden="true" /></Link>
            <Link href="/join" className={vip.secondary}>了解 Wise VIP<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <div className={s.container}>
        <section id="explore" className={s.section} aria-labelledby="explore-title">
          <p className={vip.eyebrow}>01 / 内容导航</p>
          <h2 id="explore-title" className={vip.sectionHeading}>读懂思考，回看判断，继续研究。</h2>
          <p className={vip.sectionIntro}>从完整文章、群内讨论到观点追踪与研究工具，找到你想深入的问题。</p>
          <div className={s.entries}>
            {entries.map(entry => <article key={entry.href} data-reveal><Link href={entry.href} className={s.entryLink}>
              <div className={s.artwork}><Image src={entry.image} alt={entry.alt} fill sizes={`${entry.imageDisplayWidth}px`} /></div>
              <div className={s.entryBody}>
                <p className={s.count}>{entry.count}</p><h3>{entry.title}</h3><p>{entry.description}</p>
                <div className={s.entryFooter}><span className={`${vip.textLink} ${s.entryAction}`}>{entry.action}<ArrowRight size={16} aria-hidden="true" /></span><p className={s.access}>{entry.access}</p></div>
              </div>
            </Link></article>)}
          </div>
        </section>

        <section className={`${s.section} ${s.sectionDivider}`} aria-labelledby="articles-title">
          <div className={s.sectionHeader}>
            <div><p className={vip.eyebrow}>02 / 研究文章</p><h2 id="articles-title" className={vip.sectionHeading}>最近的市场手记</h2><p className={vip.sectionIntro}>把当时的判断展开，读清楚它背后的依据。</p></div>
            <Link className={vip.textLink} href="/article">全部研究文章<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className={s.articles}>
            {latestArticles.map(article => <article key={article.slug} data-reveal><Link href={`/article/${article.slug}`} className={s.articleLink}>
              <div className={s.articleArtwork}><Image src={getArticleCover(article.cover)} alt={article.coverAlt} fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1240px) 45vw, 562px" /></div>
              <div className={s.articleMeta}><time dateTime={article.date}>{article.date.replaceAll("-", ".")}</time><span>约 {article.readingMinutes} 分钟</span></div>
              <h3>{article.title}</h3><p>{article.summary}</p>
              <div className={s.articleFooter}><span>{article.access === "public" ? "公开阅读" : "开放试读 · VIP 阅读全文"}</span><span>阅读文章<ArrowRight size={16} aria-hidden="true" /></span></div>
            </Link></article>)}
          </div>
        </section>

        <section className={`${s.section} ${s.sectionDivider}`} aria-labelledby="reading-title">
          <div className={s.sectionHeader}>
            <div><p className={vip.eyebrow}>03 / 从这里开始</p><h2 id="reading-title" className={vip.sectionHeading}>先带走一个想明白的问题。</h2><p className={vip.sectionIntro}>第一次来，可以先读这几篇。无需登录，直接阅读全文。</p></div>
            <Link className={vip.textLink} href="/chat#discussions">全部 {curatedDiscussions.length} 篇讨论<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <ol className={s.readings}>
            {startingDiscussions.map((item, index) => <li key={item.slug}><Link href={`/chat/${item.slug}`} className={s.reading}>
              <span className={s.readingNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className={s.readingMeta}>{item.category}<span>约 {item.readingMinutes} 分钟</span></span>
              <div className={s.readingCopy}><h3>{item.title}</h3><p>{item.description}</p></div>
              <ArrowRight size={20} aria-hidden="true" />
            </Link></li>)}
          </ol>
          <Link href="/chat#principles" className={`${vip.textLink} ${s.principlesLink}`}><BookOpen size={18} aria-hidden="true" />也可以先读投资准则，看看背后的原话与上下文。<ArrowRight size={16} aria-hidden="true" /></Link>
        </section>
      </div>

      <AmbientSurface className={s.invitationBand}>
        <section className={`${s.container} ${s.invitation}`} aria-labelledby="join-title">
          <div><p className={vip.eyebrow}>04 / 继续一起讨论</p><h2 id="join-title" className={vip.sectionHeading}>有些问题，值得一起聊。</h2><p className={vip.sectionIntro}>读完整的研究，也参与后续的交流、跟踪与复盘。<br />先了解我们聊什么，再决定是否同行。</p></div>
          <Link className={vip.primary} href="/join">了解 VIP 与加入方式<ArrowRight size={16} aria-hidden="true" /></Link>
        </section>
      </AmbientSurface>
    </Motion>
    <div className={s.container}><Footer /></div>
  </main>;
}
