"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole, Search, X } from "lucide-react";
import type { DiscussionPreview } from "@/lib/portal/curated-types";
import s from "./curated.module.css";

const categories = ["全部讨论", "投资原则", "公司研究", "宏观观察", "交易执行", "研究方法"];

export function Collection({ discussions, hasFullAccess }: { discussions: DiscussionPreview[]; hasFullAccess: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部讨论");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filtered = discussions.filter((discussion) =>
    (category === "全部讨论" || category === discussion.category) &&
    `${discussion.title} ${discussion.description} ${discussion.keywords.join(" ")} ${discussion.outcomes.join(" ")}`.toLocaleLowerCase().includes(normalizedQuery),
  );

  return <>
    <div className={s.collectionTools}>
      <div className={s.filters} role="group" aria-label="讨论分类">
        {categories.map((name) => <button type="button" key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}
      </div>
      <label className={s.search}>
        <Search size={16} aria-hidden="true" />
        <input aria-label="搜索精选讨论" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索问题、主题…" />
        {query && <button type="button" aria-label="清除搜索" onClick={() => setQuery("")}><X size={15} /></button>}
      </label>
    </div>
    <p className={s.resultCount} aria-live="polite">{filtered.length} 篇讨论 · {hasFullAccess ? "VIP 已解锁全部文章" : "前五篇免费阅读，其余 VIP 专享"}</p>
    <div className={s.collection}>
      {filtered.map((discussion) => <Link href={`/chat/${discussion.slug}`} key={discussion.slug} className={s.discussionCard}>
        <div className={s.cardTop}><span>{discussion.category}</span><span>{discussion.vipOnly ? <><LockKeyhole size={12} />{hasFullAccess ? "VIP 已解锁" : "VIP 专享"}</> : "免费阅读"} · {discussion.readingMinutes} 分钟</span></div>
        <span className={s.cardNumber} aria-hidden="true">{discussion.number}</span>
        <div className={s.cardBody}><p className={s.eyebrow}>{discussion.englishCategory}</p><h3>{discussion.title}</h3><p>{discussion.description}</p></div>
        <div className={s.cardOutcomes}><span>读完，你会带走</span><p>{discussion.outcomes[0]}</p><span className={s.readLink}>{discussion.vipOnly && !hasFullAccess ? "了解讨论 · VIP 阅读全文" : "进入这场讨论"} <ArrowUpRight size={17} /></span></div>
      </Link>)}
      {filtered.length === 0 && <div className={s.empty}><h3>这个问题，还没有收录。</h3><p>试试“纪律”“美债”或“长期”，也可以查看全部精选。</p><button type="button" onClick={() => { setQuery(""); setCategory("全部讨论"); }}>查看全部讨论 <ArrowUpRight size={15} /></button></div>}
    </div>
  </>;
}
