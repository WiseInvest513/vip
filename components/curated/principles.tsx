import Link from "next/link";
import { ArrowUpRight, LockKeyhole, Plus } from "lucide-react";
import type { Principle } from "@/lib/portal/curated-types";
import s from "./curated.module.css";

export function Principles({ principles, total, hasFullAccess, signedIn }: { principles: Principle[]; total: number; hasFullAccess: boolean; signedIn: boolean }) {
  const split = Math.ceil(principles.length / 2);
  return <>
    <div className={s.principleColumns}>
      {[principles.slice(0, split), principles.slice(split)].map((column, columnIndex) => (
        <div key={columnIndex}>
          {column.map((principle, index) => (
            <details className={s.principle} key={principle.id} id={principle.id}>
              <summary>
                <span className={s.ruleNumber}>{String(columnIndex * split + index + 1).padStart(2, "0")}</span>
                <span className={s.ruleCopy}><strong>{principle.title}</strong><span>{principle.brief}</span></span>
                <Plus size={17} className={s.expandIcon} aria-hidden="true" />
              </summary>
              <div className={s.ruleDetail}>
                <p className={s.rulePractice}><span>当时在聊什么</span>{principle.context}</p>
                <p>{principle.explanation}</p>
                <blockquote><p>“{principle.quote}”</p><cite>Wise · {principle.date} · {principle.sourceLabel}</cite></blockquote>
                <p className={s.rulePractice}><span>如何落到操作里</span>{principle.practice}</p>
                <Link href={`/chat/${principle.articleSlug}`}>读懂背后的讨论 <ArrowUpRight size={14} /></Link>
              </div>
            </details>
          ))}
        </div>
      ))}
    </div>
    {!hasFullAccess && <aside className={s.principleGate} aria-labelledby="principle-gate-title">
      <div><p className={s.eyebrow}><LockKeyhole size={14} /> 已开放 {principles.length} / {total} 条</p><h3 id="principle-gate-title">把余下 {total - principles.length} 条，也变成你的判断。</h3><p>VIP 可阅读完整十条准则，以及每条背后的群聊原话、讨论背景与执行方法。</p></div>
      <div className={s.gateActions}>
        <Link className={s.goldButton} href={signedIn ? "/join" : "/login?callbackUrl=%2Fchat%23principles"}>{signedIn ? "了解 VIP 加入方式" : "登录并验证 VIP 身份"}<ArrowUpRight size={16} /></Link>
        {!signedIn && <Link href="/join">还不是 VIP？了解加入方式 <ArrowUpRight size={13} /></Link>}
        <span>{signedIn ? "当前为普通用户，可阅读前五条。" : "普通用户与访客可阅读前五条。"}会员权益与主站同步。</span>
      </div>
    </aside>}
  </>;
}
