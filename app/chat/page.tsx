import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { JoinFrame, JoinHero } from "@/components/portal/join-frame";
import { AmbientSurface } from "@/app/vip/ambient-surface";
import frame from "@/components/portal/join-frame.module.css";
import { Principles } from "@/components/curated/principles";
import { Collection } from "@/components/curated/collection";
import { Invitation } from "@/components/curated/invitation";
import { principles } from "@/lib/portal/principles";
import { getContentViewerTier } from "@/lib/identity/content-viewer";
import { selectPrinciplesForViewer } from "@/lib/auth/principle-access";
import { isFreeDiscussion } from "@/lib/auth/discussion-access";
import { curatedDiscussions } from "@/lib/portal/curated-discussions";
import s from "@/components/curated/curated.module.css";

export const metadata = {
  title: "精选讨论 · Wise VIP",
  description: "从 Wise 的十条投资准则开始，读懂真实群聊里的分析、追问与复盘。前五条准则开放阅读，VIP 可阅读完整十条及讨论上下文。",
  alternates: { canonical: "/chat" },
};

// Membership-dependent HTML and RSC responses must never become a shared static page.
export const dynamic = "force-dynamic";

export default async function Chat() {
  const tier = await getContentViewerTier();
  const access = selectPrinciplesForViewer(principles, tier);
  const previews = curatedDiscussions.map(({ slug, number, category, englishCategory, title, description, readingMinutes, keywords, outcomes }) => ({ slug, number, category, englishCategory, title, description, readingMinutes, keywords, outcomes, vipOnly: !isFreeDiscussion(slug) }));
  return <JoinFrame className={s.page}>
    <JoinHero title={<>先有自己的准则，<br />再做市场的判断。</>} description="我们聊公司，也聊市场；聊为什么看好，更聊什么时候需要重新判断。从真实的提问里，把投资这件事慢慢想明白。" action="先读十条准则" href="#principles" image="/images/portal/chat-hero.png" alt="精选讨论与研究笔记" secondary />
    <div className={s.topics}><span>投资原则</span><span>公司研究</span><span>宏观观察</span><span>交易复盘</span></div>
    <AmbientSurface className={frame.surface}>
    <nav className={s.routeStrip} aria-label="精选讨论阅读顺序"><a href="#principles"><span>01</span>读十条准则 <ArrowDown size={12} /></a><a href="#discussions"><span>02</span>进入真实讨论 <ArrowDown size={12} /></a><span>从一句话，读到背后的思考。</span></nav>
    <section id="principles" className={s.section}>
      <div className={s.sectionHeading}><div><p className={s.eyebrow}>01 / THE PRINCIPLES</p><h2>十条准则，先于每一次操作。</h2><p>Wise 的投资纪律。展开一句话，读懂背后的判断与讨论。</p></div><p className={s.sectionHint}>{access.hasFullAccess ? "VIP 专享 · 完整十条" : "免费试读 · 前五条"}<br />保留原话与上下文，新增准则单独注明。</p></div>
      <Principles principles={access.visible} total={access.total} hasFullAccess={access.hasFullAccess} signedIn={tier !== null} />
      <div className={s.bridge}><p>准则需要放回具体问题里，才会变成自己的判断。</p><a href="#discussions">浏览全部精选讨论 <ArrowDown size={14} /></a></div>
    </section>
    <section id="discussions" className={s.discussionSection}>
      <div className={s.sectionHeading}><div><p className={s.eyebrow}>02 / INSIDE THE CONVERSATION</p><h2>一个问题，值得聊得更深。</h2><p>真实问题 → 分析 → 追问 → 复盘。把思考过程完整留下来。</p></div><p className={s.sectionHint}>{curatedDiscussions.length} 篇精选讨论 · 前五篇免费。<br />VIP 可阅读全部文章与复盘。</p></div>
      <Collection discussions={previews} hasFullAccess={access.hasFullAccess} />
      <div className={s.bridge}><p>想查数据、核对出处或找研究工具？</p><Link href="/learn">浏览资料与工具 <ArrowUpRight size={14} /></Link></div>
    </section>
    <Invitation />
    </AmbientSurface>
  </JoinFrame>;
}
