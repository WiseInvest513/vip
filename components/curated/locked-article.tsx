import Link from "next/link";
import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";
import type { DiscussionPreview } from "@/lib/portal/curated-types";
import { AmbientSurface } from "@/app/vip/ambient-surface";
import { Footer } from "@/components/portal/shared";
import vip from "@/app/vip/vip.module.css";
import s from "./curated.module.css";
import a from "./reading.module.css";

// Deliberately accepts public preview fields only, never the protected article.
export function LockedArticle({ preview, signedIn }: { preview: Pick<DiscussionPreview, "number" | "category" | "title" | "description" | "slug" | "outcomes">; signedIn: boolean }) {
  return <main className={`${vip.page} ${s.page} ${a.articlePage}`}><div className={s.container}>
    <Link className={a.back} href="/chat#discussions"><ArrowLeft size={14} /> 精选讨论</Link>
    <header className={a.articleHeader}>
      <p className={s.eyebrow}>{preview.number} / {preview.category} · VIP 专享</p>
      <h1>{preview.title}</h1><p className={a.standfirst}>{preview.description}</p>
    </header>
    <AmbientSurface className={a.readingSurface}>
      <div className={a.body}>
        <div className={a.learningGoals}><p>完整讨论将带你理解</p><ul>{preview.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul></div>
        <aside className={s.principleGate} aria-labelledby="article-gate-title">
          <div><p className={s.eyebrow}><LockKeyhole size={14} /> VIP 专享讨论</p><h3 id="article-gate-title">加入 VIP，继续读完整的思考。</h3><p>前五篇精选讨论免费开放。本篇及后续文章，包含群内原话、分析、追问与复盘，开通 VIP 后即可完整阅读。</p></div>
          <div className={s.gateActions}>
            <Link className={s.goldButton} href="/join">了解 VIP 加入方式 <ArrowUpRight size={16} /></Link>
            {!signedIn && <Link href={`/login?callbackUrl=${encodeURIComponent(`/chat/${preview.slug}`)}`}>已是 VIP？登录后继续阅读 <ArrowUpRight size={13} /></Link>}
            <span>{signedIn ? "当前为普通用户，会员权益与主站同步。" : "使用 Wise 主站账户验证会员身份。"}</span>
            <Link href="/chat/investment-principles">先读免费文章 <ArrowUpRight size={13} /></Link>
          </div>
        </aside>
      </div>
    </AmbientSurface>
    <Footer />
  </div></main>;
}
