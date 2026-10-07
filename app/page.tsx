import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AmbientSurface } from "./vip/ambient-surface";
import { JoinFrame, JoinHero } from "@/components/portal/join-frame";
import vip from "./vip/vip.module.css";
import styles from "@/components/portal/join-frame.module.css";

export const metadata = {
  title: "Wise VIP · 把认知，变成长期的复利",
  description: "有价值的讨论，系统的学习，值得反复回看的思考。和 Wise 一起，持续积累研究与学习。",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <JoinFrame>
    <JoinHero
      title={<>把认知，<br /><span>变成长期的复利。</span></>}
      description="有价值的讨论，系统的学习，值得反复回看的思考。"
      action="探索 VIP 内容" href="#explore"
      image="/images/portal/home-reading-room.png" alt="书籍、研究笔记与学习空间" secondary
    />
    <AmbientSurface className={styles.surface}>
      <section id="explore" className={vip.section} aria-labelledby="explore-title">
        <h2 id="explore-title" className={vip.sectionHeading}>让每一次交流，都留下价值。</h2>
        <p className={vip.sectionIntro}>从当下的讨论，走向持续积累的研究与学习。</p>
        <div className={styles.entries}>
          <article data-reveal>
            <div className={styles.entryMedia}><Image src="/images/portal/chat-hero.png" alt="精选讨论与研究笔记" fill sizes="(max-width: 767px) 100vw, 46vw" /></div>
            <div className={styles.entryCopy}><h3>精选讨论</h3><p>梳理观点、依据与后续变化，回看每一次判断的过程。</p><Link className={vip.textLink} href="/chat">浏览讨论<ArrowRight size={16} /></Link></div>
          </article>
          <article data-reveal>
            <div className={styles.entryMedia}><Image src="/images/portal/learn-hero.png" alt="学习书籍与参考资料" fill sizes="(max-width: 767px) 100vw, 46vw" /></div>
            <div className={styles.entryCopy}><h3>资料与工具</h3><p>查找研究工具、数据网站与官方资料，了解用途，直接前往来源。</p><Link className={vip.textLink} href="/learn">浏览资料与工具<ArrowRight size={16} /></Link></div>
          </article>
        </div>
        <div className={styles.closing}><span>认真讨论，持续积累。</span><Link className={vip.textLink} href="/join">加入 Wise VIP<ArrowRight size={16} /></Link></div>
      </section>
    </AmbientSurface>
  </JoinFrame>;
}
