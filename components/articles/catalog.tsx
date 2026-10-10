"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Grid2X2, List, LockKeyhole, Search, X } from "lucide-react";
import type { ArticleCategory, ArticlePreview } from "@/lib/articles/types";
import { articleCategories, categoryHref } from "@/lib/articles/categories";
import { getArticleCover } from "@/lib/media/article-covers";
import vip from "@/app/vip/vip.module.css";
import s from "./articles.module.css";

export function ArticleCatalog({ articles, category }: { articles: ArticlePreview[]; category?: ArticleCategory }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("newest");
  const selection = articleCategories.find(item => item.id === category);
  const matching = useMemo(() => articles.filter(article => {
    const inCategory = !category || article.categories.includes(category);
    const text = [article.title, article.summary, ...article.tags, ...article.keywords].join(" ").toLowerCase();
    return inCategory && text.includes(query.trim().toLowerCase());
  }).sort((a, b) => sort === "shortest" ? a.readingMinutes - b.readingMinutes : b.date.localeCompare(a.date)), [articles, category, query, sort]);
  return <div className={s.catalogLayout}>
    <aside className={s.categorySidebar}>
      <p>文章目录</p>
      <nav aria-label="文章分类">
        <Link href="/article" aria-current={!category ? "page" : undefined}><span>全部文章</span><small>{articles.length}</small></Link>
        {articleCategories.map(item => <Link key={item.id} href={categoryHref(item.id)} aria-current={category === item.id ? "page" : undefined}><span>{item.name}</span><small>{articles.filter(article => article.categories.includes(item.id)).length}</small></Link>)}
      </nav>
      <div className={s.sidebarNote}><BookOpen size={18} aria-hidden="true" /><p>把当时的思考留下，<br />让后来的变化有迹可循。</p></div>
    </aside>
    <section className={s.catalogContent} aria-labelledby="catalog-title">
      <div className={s.catalogHeading}><div><h2 id="catalog-title" className={vip.sectionHeading}>{selection?.name ?? "全部文章"}</h2><p>{selection?.description ?? "按主题阅读，也按时间回看 Wise 的市场思考。"}</p></div><span className={s.resultCount} aria-live="polite">{matching.length} 篇文章</span></div>
      <div className={s.controls}>
        <label className={s.search}><Search size={18} aria-hidden="true" /><span className={s.srOnly}>搜索文章</span><input type="search" placeholder="搜索文章、公司或关键词" value={query} onChange={event => setQuery(event.target.value)} />{query && <button type="button" aria-label="清空搜索" onClick={() => setQuery("")}><X size={16} /></button>}</label>
        <label className={s.sort}><span className={s.srOnly}>文章排序</span><select value={sort} onChange={event => setSort(event.target.value)}><option value="newest">最新发布</option><option value="shortest">阅读时间最短</option></select></label>
        <div className={s.viewSwitch} role="group" aria-label="文章展示方式"><button type="button" aria-label="网格视图" aria-pressed={view === "grid"} onClick={() => setView("grid")}><Grid2X2 size={18} /></button><button type="button" aria-label="列表视图" aria-pressed={view === "list"} onClick={() => setView("list")}><List size={19} /></button></div>
      </div>
      {matching.length ? <div className={`${s.cards} ${view === "list" ? s.listView : ""}`}>
        {matching.map(article => <article key={article.slug} className={s.card}>
          <Link href={`/article/${article.slug}`} className={s.cardLink}>
            <div className={s.cardCover}><Image src={getArticleCover(article.cover)} alt={article.coverAlt} fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, 440px" /></div>
            <div className={s.cardCopy}>
              <div className={s.meta}><time dateTime={article.date}>{article.date.replaceAll("-", ".")}</time><span>{article.readingMinutes} 分钟阅读</span></div>
              <h3>{article.title}</h3><p>{article.summary}</p>
              <ul className={s.tags} aria-label="文章主题">{article.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul>
              <div className={s.cardFooter}><span>{article.access === "vip" ? <><LockKeyhole size={14} />VIP 全文 · 可试读</> : <><BookOpen size={14} />公开阅读</>}</span><span>阅读文章<ArrowRight size={16} /></span></div>
            </div>
          </Link>
        </article>)}
      </div> : <div className={s.empty}><BookOpen size={28} aria-hidden="true" /><h3>{query ? "没有找到匹配的文章" : "这个目录，等待下一篇研究。"}</h3><p>{query ? "换一个公司名称或关键词，或者清空搜索再看看。" : "先读已有的市场文章，后续内容会按主题收录在这里。"}</p>{query ? <button className={vip.secondary} onClick={() => setQuery("")}>清空搜索</button> : <Link className={vip.secondary} href="/article">浏览全部文章<ArrowRight size={16} /></Link>}</div>}
    </section>
  </div>;
}
