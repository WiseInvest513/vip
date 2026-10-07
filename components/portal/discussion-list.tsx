"use client";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight,Crown,Search} from "lucide-react";
import type {discussions as DiscussionData} from "@/lib/portal/discussions";
import s from "./portal.module.css";
const categories=["全部讨论","公司研究","投资方法","市场观察"];
export function DiscussionList({discussions}: {discussions: Omit<(typeof DiscussionData)[number], "paragraphs">[]}){const [query,setQuery]=useState("");const[category,setCategory]=useState("全部讨论");const filtered=discussions.filter(d=>(category==="全部讨论"||d.category===category)&&`${d.title}${d.excerpt}`.includes(query.trim()));return <><label className={s.search}><Search size={19}/><input aria-label="搜索讨论" value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索讨论主题、关键词"/>{query&&<button onClick={()=>setQuery("")}>清除</button>}</label><div className={s.tabs} aria-label="讨论分类">{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className={s.discussionGrid} aria-live="polite">{filtered.map((d,i)=><Link data-reveal href={`/chat/${d.slug}`} key={d.slug} className={`${s.article} ${i===0?s.featured:""}`}><div className={s.articleCopy}><h3>{d.title}</h3><p>{d.excerpt}</p><div className={s.articleMeta}><span className={d.vip?s.vip:s.public}>{d.vip&&<Crown size={15}/>} {d.vip?"VIP 内容":"公开阅读"}</span><span>阅读讨论<ArrowRight size={15}/></span></div></div><div className={s.articleArt}><Image src={d.image} alt="" fill sizes="(max-width:760px) 100px, 300px"/></div></Link>)}{!filtered.length&&<div className={s.empty}><h3>还没有找到相关讨论</h3><p>换一个关键词，或查看全部讨论。</p><button className={s.secondary} onClick={()=>{setQuery("");setCategory("全部讨论");}}>查看全部讨论</button></div>}</div></>}
