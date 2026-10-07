import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import type { CuratedDiscussion } from "@/lib/portal/curated-types";
import { Footer } from "@/components/portal/shared";
import { AmbientSurface } from "@/app/vip/ambient-surface";
import vip from "@/app/vip/vip.module.css";
import { Practice } from "./practice";
import { ValuationLab } from "./valuation-lab";
import { Invitation } from "./invitation";
import s from "./curated.module.css";
import a from "./reading.module.css";

function MacroDiagram() {
  return <div className={a.macroDiagram} aria-label="从企业、定价和预期三个角度理解价格变化">
    <p>把一个价格变化，拆成三个问题</p>
    <div>
      <section><span>企业端</span><h3>未来能赚多少？</h3><p>订单、利润与现金流<br />原来的增长依据还在吗？</p></section>
      <section><span>定价端</span><h3>今天愿意付多少？</h3><p>利率与承担风险的补偿<br />市场要求的回报变了吗？</p></section>
      <section><span>预期端</span><h3>之前已经期待多少？</h3><p>实际表现与原有预期<br />好消息是否已被计入价格？</p></section>
    </div>
    <small>三个角度可以同时变化。单个指标不足以直接推导买卖方向。</small>
  </div>;
}

export function CuratedArticle({ discussion, nextDiscussion, vipOnly }: { discussion: CuratedDiscussion; nextDiscussion: Pick<CuratedDiscussion, "slug" | "title" | "category">; vipOnly: boolean }) {
  return <main className={`${vip.page} ${s.page} ${a.articlePage}`}>
    <div className={s.container}>
      <Link className={a.back} href="/chat#discussions"><ArrowLeft size={14} /> 精选讨论</Link>
      <header className={a.articleHeader}>
        <p className={s.eyebrow}>{discussion.number} / {discussion.englishCategory}<span className={a.category}>{discussion.category}</span></p>
        <h1>{discussion.title}</h1>
        <p className={a.standfirst}>{discussion.description}</p>
        <div className={a.byline}>
          <Image src="/brand/wisevip-icon.png" alt="" width={29} height={29} />
          <span><strong>Wise</strong><small>群内讨论 · 编辑整理</small></span>
          <span className={a.readTime}><Clock3 size={13} /> {discussion.readingMinutes} 分钟</span>
          <span className={a.openBadge}>{vipOnly ? "VIP 专享" : "免费阅读"}</span>
        </div>
        <p className={a.period}>讨论时间：{discussion.period} <span>·</span> 整理于 2026.10.07</p>
      </header>
      <div className={a.readingLayout}>
        <aside className={a.sidebar}>
          <nav aria-label="文章目录">
            <p>这一场讨论</p>
            {discussion.sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</a>)}
            <a href="#practice"><span>＋</span>试着判断</a>
          </nav>
          <Link href="/chat#principles" className={a.rulesLink}><BookOpen size={14} /> 回看十条准则 <ArrowUpRight size={13} /></Link>
        </aside>
        <AmbientSurface className={a.readingSurface}><article className={a.body}>
          <div className={a.learningGoals}><p>读完这篇，你会带走</p><ul>{discussion.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div>
          <div className={a.openingQuestion}><span>我们在讨论什么？</span><p>{discussion.question}</p></div>
          {discussion.sections.map((section, index) => <section className={a.articleSection} key={section.id} id={section.id}>
            <p className={a.sectionLabel}>{String(index + 1).padStart(2, "0")} / {section.label}</p>
            <h2>{section.title}</h2>
            {section.conversation && <div className={a.conversation}>
              <p className={a.conversationCaption}>群内原话节选 · 群友已匿名</p>
              {section.conversation.map((message, messageIndex) => <div className={a.message} key={`${message.sourceId}-${messageIndex}`}>
                <span className={`${a.speakerAvatar} ${message.speaker === "Wise" ? a.wiseAvatar : ""}`} aria-hidden="true">{message.speaker === "Wise" ? "W" : "问"}</span>
                <div><span className={a.speakerName}>{message.speaker}<a href={`#source-${message.sourceId}`}>查看出处 ↗</a></span><p>{message.text}</p></div>
              </div>)}
            </div>}
            {section.paragraphs.map((paragraph, paragraphIndex) => <div className={a.paragraph} key={paragraph}><p>{paragraph}</p>{section.diagram === "macro" && paragraphIndex === 1 && <ValuationLab />}</div>)}
            {section.quote && <blockquote className={a.pullQuote}><p>“{section.quote.text}”</p><cite>{section.quote.attribution}<a href={`#source-${section.quote.sourceId}`}>群内原话 ↗</a></cite></blockquote>}
            {section.diagram === "macro" && <MacroDiagram />}
            {section.points && <div className={a.observationPoints}>{section.points.map((point) => <div key={point.title}><h3>{point.title}</h3><p>{point.text}</p></div>)}</div>}
          </section>)}
          <aside className={a.takeaway}><span>值得带走的一句话</span><p>{discussion.takeaway}</p><small>本篇讨论的编辑归纳</small></aside>
          <section id="practice" className={a.practiceSection}><Practice id={discussion.slug} {...discussion.exercise} /></section>
          <section className={a.sources} aria-label="讨论出处与延伸阅读">
            <h2>讨论出处</h2>
            <p>本文按主题重组不同时段的讨论。引文保留原话，其余为编辑整理与延伸；历史观点保留当时语境，不作为当前买卖指令。</p>
            <div>{discussion.sources.map((source) => <details key={source.id} id={`source-${source.id}`}><summary>{source.date}<span>{source.label}</span></summary><p>{source.note}</p></details>)}</div>
            {discussion.references.length > 0 && <div className={a.referenceLinks}><h3>概念核对与延伸阅读</h3>{discussion.references.map((reference) => <p key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.title}<ArrowUpRight size={12} /></a><span>{reference.note}</span></p>)}</div>}
          </section>
          <Link href={`/chat/${nextDiscussion.slug}`} className={a.nextArticle}><span>下一场讨论 · {nextDiscussion.category}</span><strong>{nextDiscussion.title}</strong><ArrowRight size={22} /></Link>
        </article></AmbientSurface>
      </div>
      <Invitation />
      <Footer />
    </div>
  </main>;
}
