import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroScene } from "@/components/home/hero-scene";
import styles from "@/components/home/home.module.css";

export const metadata = {
  title: "Wise VIP · 把认知，变成长期的复利",
  description: "有价值的讨论，系统的学习，值得反复回看的思考。和 Wise 一起，持续积累研究与学习。",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className={styles.home}>
      <HeroScene>
        <div className={styles.copy}>
          <h1 id="home-title"><span>把认知，</span><span>变成长期的<em>复利</em>。</span></h1>
          <p className={styles.description}><span>有价值的讨论，系统的学习，</span><span>值得反复回看的思考。</span></p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="#explore">探索 VIP 内容<ArrowRight size={17} /></Link>
            <Link className={styles.secondary} href="/join">了解加入方式<ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </HeroScene>
      <section id="explore" className={styles.content} aria-labelledby="explore-title">
        <h2 id="explore-title" className={styles.sectionHeading}><span>让每一次交流，</span><span>都留下价值。</span></h2>
        <p className={styles.sectionIntro}>从当下的讨论，走向持续积累的研究与学习。</p>
        <div className={styles.entries}>
          <article className={styles.entry}>
            <span className={styles.number}>01</span>
            <h3>精选讨论</h3>
            <p>梳理观点、依据与后续变化，<br />回看每一次判断的过程。</p>
            <Link className={styles.entryLink} href="/chat">浏览讨论<ArrowRight size={18} /></Link>
          </article>
          <article className={styles.entry}>
            <span className={styles.number}>02</span>
            <h3>学习资料</h3>
            <p>用学习路径串起书籍、网站与参考资料，建立自己的研究方法。</p>
            <Link className={styles.entryLink} href="/learn">开始学习<ArrowRight size={18} /></Link>
          </article>
        </div>
        <footer className={styles.footer}>
          <span>认真讨论，持续积累。</span>
          <Link href="/join">加入 Wise VIP<ArrowRight size={17} /></Link>
        </footer>
      </section>
    </main>
  );
}
