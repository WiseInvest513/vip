import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { discussions } from "@/lib/portal/discussions";
import { curatedDiscussions } from "@/lib/portal/curated-discussions";
import { CuratedArticle } from "@/components/curated/article";
import { LockedArticle } from "@/components/curated/locked-article";
import { canReadDiscussion, isFreeDiscussion } from "@/lib/auth/discussion-access";
import { getContentViewerTier } from "@/lib/identity/content-viewer";
import { AmbientSurface } from "../../vip/ambient-surface";
import { Footer } from "@/components/portal/shared";
import s from "@/components/portal/portal.module.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const curated = curatedDiscussions.find((discussion) => discussion.slug === slug);
  const legacy = discussions.find((discussion) => discussion.slug === slug);
  return {
    title: `${curated?.title ?? legacy?.title ?? "讨论未找到"} · Wise VIP`,
    description: curated?.description ?? legacy?.excerpt,
    alternates: { canonical: `/chat/${slug}` },
  };
}

export default async function Discussion({ params }: Props) {
  const { slug } = await params;
  const tier = await getContentViewerTier();
  const curated = curatedDiscussions.find((discussion) => discussion.slug === slug);
  if (curated) {
    if (!canReadDiscussion(slug, tier)) {
      const { number, category, title, description, outcomes } = curated;
      return <LockedArticle preview={{ slug, number, category, title, description, outcomes }} signedIn={tier !== null} />;
    }
    const currentIndex = curatedDiscussions.indexOf(curated);
    const next = curatedDiscussions[(currentIndex + 1) % curatedDiscussions.length];
    return <CuratedArticle key={slug} discussion={curated} nextDiscussion={{ slug: next.slug, title: next.title, category: next.category }} vipOnly={!isFreeDiscussion(slug)} />;
  }

  // Older example URLs must not become extra free articles outside the allowlist.
  const discussion = discussions.find((item) => item.slug === slug);
  if (!discussion) notFound();
  const allowed = canReadDiscussion(slug, tier);
  return <main className={s.page}>
    <Link className={s.back} href="/chat"><ArrowLeft size={16} />返回精选讨论</Link>
    <AmbientSurface className={s.readSurface}><article className={s.reading}>
      <p className={s.gold}>{discussion.category} · 内容示例</p>
      <h1>{discussion.title}</h1><p className={s.readLead}>{discussion.excerpt}</p><hr />
      {allowed && <><h2>从问题开始</h2><p>{discussion.paragraphs[0]}</p></>}
      {allowed ? discussion.paragraphs.slice(1).map((paragraph, index) => <section key={paragraph}><h2>{index === 0 ? "把依据写下来" : "持续跟踪与复盘"}</h2><p>{paragraph}</p></section>) : <div className={s.lock}>
        <LockKeyhole size={25} /><h2>继续阅读完整讨论</h2><p>普通用户可阅读摘要，VIP 可查看完整笔记与后续复盘。</p>
        <Link className={s.primary} href="/join">了解 VIP 权益<ArrowRight size={17} /></Link>
        <Link href={`/login?callbackUrl=${encodeURIComponent(`/chat/${slug}`)}`}>已有会员？通过主站登录</Link>
      </div>}
      <p className={s.note}>此页为展示阅读流程的示例内容，不是实际群聊记录或投资建议。</p>
    </article></AmbientSurface><Footer />
  </main>;
}
