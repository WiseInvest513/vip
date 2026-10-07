import { AmbientSurface } from "../vip/ambient-surface";
import { JoinFrame, JoinHero } from "@/components/portal/join-frame";
import { Learning } from "@/components/portal/learning";
import vip from "../vip/vip.module.css";
import styles from "@/components/portal/join-frame.module.css";

export const metadata = { title: "资料与工具 · Wise VIP", description: "群内分享的研究工具、数据网站与官方资料，按用途查找，直接前往来源。", alternates: { canonical: "/learn" } };

export default function Learn() {
  return <JoinFrame>
    <JoinHero title={<>好用的资料，<br /><span>放在顺手的地方。</span></>} description="研究工具、数据网站与官方资料。查数据、找出处、用工具，从这里开始。" action="浏览资料与工具" href="#resources" image="/images/portal/learn-hero.png" alt="学习书籍与研究参考资料" />
    <AmbientSurface className={styles.surface}>
      <section id="resources" className={vip.section} aria-labelledby="resources-title">
        <h2 id="resources-title" className={vip.sectionHeading}>研究时，用得上的资源</h2>
        <p className={vip.sectionIntro}>收录群内分享与补充的官方来源，每项说明用途和使用起点。</p>
        <Learning />
      </section>
    </AmbientSurface>
  </JoinFrame>;
}
