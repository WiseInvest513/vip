import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, LockKeyhole } from "lucide-react";
import { JoinFrame } from "@/components/portal/join-frame";
import { AmbientSurface } from "@/app/vip/ambient-surface";
import { ArticleMarkdown, articleOutline } from "@/components/articles/markdown";
import { articles, getArticle } from "@/lib/articles/content";
import { articleCategories, categoryHref } from "@/lib/articles/categories";
import { getContentViewerTier } from "@/lib/identity/content-viewer";
import { canReadArticle } from "@/lib/auth/article-access";
import { wiseAvatar } from "@/lib/media/wise-avatar";
import vip from "@/app/vip/vip.module.css";
import s from "@/components/articles/articles.module.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "文章未找到 · Wise VIP" };
  return { title: `${article.title} · Wise VIP`, description: article.summary, alternates: { canonical: `/article/${slug}` }, openGraph: { title: article.title, description: article.summary, type: "article", publishedTime: article.date, authors: ["WiseInvest"], images: [{ url: article.cover, alt: article.coverAlt }] } };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const tier = await getContentViewerTier();
  const canRead = canReadArticle(article.access, tier);
  const visibleBody = canRead ? article.body : article.preview;
  const outline = articleOutline(visibleBody);
  const related = articles.find(item => item.slug !== slug);
  return <JoinFrame>
    <nav className={s.breadcrumb} aria-label="面包屑"><Link href="/article"><ArrowLeft size={14} />研究文章</Link><span>/</span><span>市场手记</span></nav>
    <header className={s.articleHeader}>
      <div className={s.articleCategories}>{article.categories.map(id => <Link key={id} href={categoryHref(id)}>{articleCategories.find(item => item.id === id)?.name}</Link>)}</div>
      <h1>{article.title}</h1>
      <div className={s.byline}><Image src={wiseAvatar} alt="" width={40} height={40} sizes="40px" /><div><strong>WiseInvest</strong><time dateTime={article.date}>{article.date.replaceAll("-", ".")} 发布</time></div><span><Clock3 size={15} />约 {article.readingMinutes} 分钟</span><span className={s.accessBadge}>{article.access === "public" ? "公开文章" : canRead ? "VIP 完整阅读" : "VIP 文章 · 公开试读"}</span></div>
    </header>
    <div className={s.readerLayout}>
      <aside className={s.outline}><p>本文目录</p><nav className={s.desktopOutline} aria-label="文章章节">{outline.map(item => <a key={item.id} href={`#${item.id}`}>{item.title}</a>)}{!canRead && <a href="#continue-reading"><LockKeyhole size={13} />继续阅读全文</a>}</nav><details className={s.mobileOutline}><summary>本文目录<span>展开章节</span></summary><nav aria-label="文章章节">{outline.map(item => <a key={item.id} href={`#${item.id}`}>{item.title}</a>)}{!canRead && <a href="#continue-reading"><LockKeyhole size={13} />继续阅读全文</a>}</nav></details><Link href="/article">返回文章目录<ArrowLeft size={13} /></Link></aside>
      <AmbientSurface className={s.readerSurface}>
        <article className={s.prose} aria-label="文章正文">
          <ArticleMarkdown body={visibleBody} />
          {!canRead && <section id="continue-reading" className={s.paywall} aria-labelledby="continue-title"><LockKeyhole size={24} aria-hidden="true" /><p className={vip.eyebrow}>继续这一次研究</p><h2 id="continue-title">完整的判断，值得读到最后。</h2><p>以上为公开试读。VIP 可阅读后续分析与完整结论，并参与群内的持续讨论。</p><div className={vip.actions}><Link href="/join" className={vip.primary}>了解 VIP 与加入方式<ArrowRight size={16} /></Link><Link href={`/login?callbackUrl=${encodeURIComponent(`/article/${slug}`)}`} className={vip.secondary}>{tier ? "刷新会员身份" : "已有 VIP？登录阅读"}</Link></div></section>}
        </article>
        {related && <Link className={s.nextArticle} href={`/article/${related.slug}`}><span>继续阅读 · 市场手记</span><strong>{related.title}</strong><ArrowRight size={20} /></Link>}
      </AmbientSurface>
    </div>
  </JoinFrame>;
}
