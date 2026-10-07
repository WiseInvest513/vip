"use client";

import { useState } from "react";
import { ArrowUpRight, Search, X, ChevronDown } from "lucide-react";
import { resources, type ResourceCategory } from "@/lib/portal/resources";
import s from "./resources.module.css";

const categories: ("全部" | ResourceCategory)[] = ["全部", "研究工具", "数据网站", "官方资料"];

export function Learning() {
  const [category, setCategory] = useState<(typeof categories)[number]>("全部");
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase();
  const filtered = resources.filter(resource =>
    (category === "全部" || resource.category === category) &&
    `${resource.title} ${resource.description} ${resource.useCase} ${resource.start}`.toLocaleLowerCase().includes(search),
  );

  return <div className={s.library}>
    <div className={s.controls}>
      <div className={s.categories} role="group" aria-label="资源分类">
        {categories.map(name => <button type="button" key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}
      </div>
      <label className={s.search}><Search size={17} aria-hidden="true" /><input type="search" aria-label="搜索资料与工具" placeholder="搜索名称或用途" value={query} onChange={event => setQuery(event.target.value)} />{query ? <button type="button" aria-label="清除搜索" onClick={() => setQuery("")}><X size={16} /></button> : null}</label>
    </div>
    <p className={s.count} role="status">{filtered.length} 项资源 · 按用途查找，直接前往来源</p>
    <div className={s.grid}>
      {filtered.map(resource => <article key={resource.id} className={s.card}>
        <div className={s.meta}><span>{resource.category}</span><span>{resource.language}</span></div>
        <h3>{resource.title}</h3>
        <p className={s.description}>{resource.description}</p>
        <div className={s.useCase}><span>什么时候用</span><p>{resource.useCase}</p></div>
        <details className={s.guide}><summary>从哪里开始<ChevronDown size={14} aria-hidden="true" /></summary><p>{resource.start}</p></details>
        <div className={s.bottom}><span>{resource.source}</span><a href={resource.href} target="_blank" rel="noopener noreferrer" aria-label={`打开 ${resource.title}（新窗口）`}>打开资源<ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </article>)}
      {filtered.length === 0 ? <div className={s.empty}><h3>没有找到匹配的资源</h3><p>试试“财报”“公司”或“宏观”，也可以查看全部资源。</p><button type="button" onClick={() => { setQuery(""); setCategory("全部"); }}>查看全部资源</button></div> : null}
    </div>
  </div>;
}
