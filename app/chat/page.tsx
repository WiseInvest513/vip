import {AmbientSurface} from "../vip/ambient-surface";
import {Hero,Footer} from "@/components/portal/shared";
import {Motion} from "@/components/portal/motion";
import {DiscussionList} from "@/components/portal/discussion-list";
import {discussions} from "@/lib/portal/discussions";
import s from "@/components/portal/portal.module.css";
export const metadata={title:"精选讨论 · Wise VIP",alternates:{canonical:"/chat"}};
export default function Chat(){return <main className={s.page}><Motion><Hero title={<>群里聊过的，<br/>值得留下来。</>} description="把有价值的讨论，整理成可以反复阅读的研究笔记。" action="浏览精选讨论" href="#discussions" image="/images/portal/chat-hero.png"/><AmbientSurface className={s.surface}><section id="discussions" className={s.section}><h2>精选讨论</h2><p className={s.intro}>来自群里的真实思考，沉淀为可长期阅读的研究笔记。</p><DiscussionList discussions={discussions.map(({paragraphs, ...preview})=>preview)}/><p className={s.note}>当前为内容结构示例，正式群聊精选将陆续整理。</p></section></AmbientSurface></Motion><Footer/></main>}
