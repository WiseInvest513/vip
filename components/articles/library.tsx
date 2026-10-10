import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Crown } from "lucide-react";
import { JoinFrame } from "@/components/portal/join-frame";
import { AmbientSurface } from "@/app/vip/ambient-surface";
import { articles } from "@/lib/articles/content";
import type { ArticleCategory, ArticlePreview } from "@/lib/articles/types";
import { wiseAvatar } from "@/lib/media/wise-avatar";
import { ArticleCatalog } from "./catalog";
import vip from "@/app/vip/vip.module.css";
import s from "./articles.module.css";

export function ArticleLibrary({ category }: { category?: ArticleCategory }) {
  const previews: ArticlePreview[] = articles.map(({ slug, title, summary, date, readingMinutes, categories, tags, keywords, cover, coverAlt, access, sourceUrl }) => ({ slug, title, summary, date, readingMinutes, categories, tags, keywords, cover, coverAlt, access, sourceUrl }));
  return <JoinFrame>
    <header className={s.libraryHeader}>
      <div><p className={vip.welcome}><Crown size={16} aria-hidden="true" />WISE VIP<span>研究文章 · ARTICLE</span></p><h1>把市场的变化，写成有依据的判断。</h1><p className={s.libraryDescription}>美股、公司、财报与加密市场，读完整的分析，理解观点背后的依据。</p></div>
      <div className={s.authorNote}><Image src={wiseAvatar} alt="WiseInvest" width={40} height={40} sizes="40px" /><div><strong>WiseInvest</strong><span>市场手记与深度研究</span></div></div>
    </header>
    <AmbientSurface className={s.librarySurface}><ArticleCatalog key={category ?? "all"} articles={previews} category={category} /><div className={s.libraryFooter}><div><h2>一篇文章，是下一次讨论的起点。</h2><p>文章可先试读。加入 VIP 后，阅读全文，也和我们继续聊市场的变化。</p></div><Link className={vip.primary} href="/join">了解 Wise VIP<ArrowRight size={16} /></Link></div></AmbientSurface>
  </JoinFrame>;
}
