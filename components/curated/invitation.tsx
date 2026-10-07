import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import s from "./curated.module.css";

export function Invitation() {
  return <aside className={s.invitation}>
    <div><p className={s.eyebrow}><MessageCircle size={14} /> KEEP THE CONVERSATION GOING</p><h2>读到这里，你想追问什么？</h2><p>文章留下一个阶段的思考。群里的价值，是带着具体问题继续聊：依据够不够，哪里有分歧，新的变化会不会改变判断。</p></div>
    <div className={s.invitationAction}><Link href="/join" className={s.goldButton}>了解加入方式 <ArrowUpRight size={17} /></Link><span>先了解我们的讨论方式，再决定是否同行。</span></div>
  </aside>;
}
