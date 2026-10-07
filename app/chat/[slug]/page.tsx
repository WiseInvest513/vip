import {notFound} from "next/navigation";
import Link from "next/link";
import {ArrowLeft,ArrowRight,LockKeyhole} from "lucide-react";
import {discussions} from "@/lib/portal/discussions";
import {getContentViewerTier} from "@/lib/identity/content-viewer";
import {AmbientSurface} from "../../vip/ambient-surface";
import {Footer} from "@/components/portal/shared";
import s from "@/components/portal/portal.module.css";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const d=discussions.find(d=>d.slug===slug);return {title:`${d?.title??"讨论未找到"} · Wise VIP`,alternates:{canonical:`/chat/${slug}`}};}
export default async function Discussion({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const d=discussions.find(d=>d.slug===slug);if(!d)notFound();const tier=await getContentViewerTier();const allowed=!d.vip||tier==="VIP"||tier==="VIP_PLUS";return <main className={s.page}><Link className={s.back} href="/chat"><ArrowLeft size={16}/>返回精选讨论</Link><AmbientSurface className={s.readSurface}><article className={s.reading}><p className={s.gold}>{d.category} · 内容示例</p><h1>{d.title}</h1><p className={s.readLead}>{d.excerpt}</p><hr/><h2>从问题开始</h2><p>{d.paragraphs[0]}</p>{allowed?d.paragraphs.slice(1).map((p,i)=><section key={p}><h2>{i===0?"把依据写下来":"持续跟踪与复盘"}</h2><p>{p}</p></section>):<div className={s.lock}><LockKeyhole size={25}/><h2>继续阅读完整讨论</h2><p>普通用户可阅读摘要，VIP 可查看完整笔记与后续复盘。</p><Link className={s.primary} href="/join">了解 VIP 权益<ArrowRight size={17}/></Link><small>主站登录与会员身份同步将在后续接入。</small></div>}<p className={s.note}>此页为展示阅读流程的示例内容，不是实际群聊记录或投资建议。</p></article></AmbientSurface><Footer/></main>}
