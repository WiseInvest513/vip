import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { AmbientSurface } from "./vip/ambient-surface";
import { JoinFrame, JoinHero } from "@/components/portal/join-frame";
import { curatedDiscussions } from "@/lib/portal/curated-discussions";
import { principles } from "@/lib/portal/principles";
import { resources } from "@/lib/portal/resources";
import { isFreeDiscussion } from "@/lib/auth/discussion-access";
import { PUBLIC_PRINCIPLE_LIMIT } from "@/lib/auth/principle-access";
import records from "@/lib/point/records.json";
import vip from "./vip/vip.module.css";
import frame from "@/components/portal/join-frame.module.css";
import s from "./home.module.css";

export const metadata = {
  title: "Wise VIP · 把认知，变成长期的复利",
  description: "从投资准则与精选讨论，到历史观点追踪、研究资料与工具。回看 Wise VIP 的真实思考，找到自己的学习与研究起点。",
  alternates: { canonical: "/" },
};

const freeDiscussions = curatedDiscussions.filter(item => isFreeDiscussion(item.slug));
// Only public article previews are rendered; membership-only bodies stay on the server.
const startingDiscussions = freeDiscussions.slice(0, 3);
const entries = [
  {
    title: "精选讨论", href: "/chat", action: "读准则与讨论",
    image: "/images/portal/chat-hero.png", alt: "精选讨论与研究笔记",
    count: `${principles.length} 条准则 · ${curatedDiscussions.length} 篇讨论`,
    description: "从一个真实问题出发，读懂分析、追问与复盘。先理解 Wise 的投资纪律，再看判断是怎样形成的。",
    tags: ["投资原则", "公司研究", "宏观观察"],
    access: `前 ${PUBLIC_PRINCIPLE_LIMIT} 条准则、${freeDiscussions.length} 篇讨论免费阅读`,
  },
  {
    title: "观点追踪", href: "/point", action: "回看历史观点",
    image: "/images/vip/topic-review.png", alt: "研究笔记与观点复盘",
    count: `${records.length} 个重点标的 · 原话与后续变化`,
    description: "AVGO、MRVL、INTC、BE……当时为什么聊到，后来发生了什么？把原话、日期与价格变化放在一起看。",
    tags: ["重点标的", "关注线索", "更多赛道"], access: "全部公开 · 无需登录",
  },
  {
    title: "资料与工具", href: "/learn", action: "查找研究资源",
    image: "/images/portal/learn-hero.png", alt: "学习书籍与参考资料",
    count: `${resources.length} 项资源 · 按用途查找`,
    description: "想核对财报、查宏观数据，或了解产业背景？找到对应的工具与官方资料，带着问题回到来源。",
    tags: ["研究工具", "数据网站", "官方资料"], access: "目录公开 · 附用途与使用起点",
  },
];

export default function Home() {
  return <JoinFrame>
    <JoinHero
      title={<>把认知，<br /><span>变成长期的复利。</span></>}
      description="从投资准则出发，读真实讨论，回看观点的变化，再用资料与工具继续研究。把群里的每一次交流，变成值得留下的理解。"
      action="开始探索内容" href="#explore"
      image="/images/portal/home-reading-room.png" alt="书籍、研究笔记与学习空间" secondary
    />
    <AmbientSurface className={frame.surface}>
      <section id="explore" className={vip.section} aria-labelledby="explore-title">
        <p className={vip.eyebrow}>01 / 内容导航</p>
        <h2 id="explore-title" className={vip.sectionHeading}>读懂思考，回看判断，继续研究。</h2>
        <p className={vip.sectionIntro}>三个入口，连接我们在群里聊过的问题，和你接下来想做的研究。</p>
        <div className={`${vip.topicGrid} ${s.entries}`}>
          {entries.map(entry => <article key={entry.href} data-reveal>
            <div className={s.artwork}><Image src={entry.image} alt={entry.alt} fill sizes="(max-width: 767px) calc(100vw - 126px), 310px" /></div>
            <div className={s.entryBody}>
              <p className={s.count}>{entry.count}</p>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              <ul className={vip.topicTags} aria-label={`${entry.title}内容`}>{entry.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              <div className={s.entryFooter}>
                <Link className={vip.textLink} href={entry.href}>{entry.action}<ArrowRight size={16} aria-hidden="true" /></Link>
                <p className={s.access}>{entry.access}</p>
              </div>
            </div>
          </article>)}
        </div>
      </section>
      <section className={`${vip.section} ${s.sectionDivider}`} aria-labelledby="reading-title">
        <div className={`${vip.sectionHeader} ${s.readingHeader}`}>
          <div><p className={vip.eyebrow}>02 / 从这里开始</p><h2 id="reading-title" className={vip.sectionHeading}>先带走一个想明白的问题。</h2><p className={vip.sectionIntro}>第一次来，可以先读这几篇。无需登录，直接阅读全文。</p></div>
          <Link className={vip.textLink} href="/chat#discussions">全部 {curatedDiscussions.length} 篇讨论<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className={s.readings}>
          {startingDiscussions.map(item => <Link key={item.slug} href={`/chat/${item.slug}`} className={s.reading}>
            <span className={s.readingMeta}>{item.category}<span>约 {item.readingMinutes} 分钟</span></span>
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
            <ArrowRight size={20} aria-hidden="true" />
          </Link>)}
        </div>
        <Link href="/chat#principles" className={vip.readingStrip}><BookOpen size={18} aria-hidden="true" /><span><small>也可以先从一句话开始</small>读投资准则，再看背后的原话与上下文。</span><span className={vip.readingAction}>查看准则<ArrowRight size={16} aria-hidden="true" /></span></Link>
      </section>
      <section className={`${vip.section} ${s.invitation} ${s.sectionDivider}`} aria-labelledby="join-title">
        <div><p className={vip.eyebrow}>03 / 继续一起讨论</p><h2 id="join-title" className={vip.sectionHeading}>读到这里，有些问题值得一起聊。</h2><p className={vip.sectionIntro}>加入 Wise VIP，阅读完整准则与精选讨论，参与群内交流、跟踪与复盘。先了解我们聊什么，再决定是否同行。</p></div>
        <Link className={vip.primary} href="/join">了解 VIP 与加入方式<ArrowRight size={16} aria-hidden="true" /></Link>
      </section>
    </AmbientSurface>
  </JoinFrame>;
}
