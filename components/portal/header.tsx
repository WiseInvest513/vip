"use client";
import Link, { useLinkStatus } from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { wiseVipIcon } from "@/lib/media/brand";
import s from "./portal.module.css";

// Link owns the pending state, so it also clears on completion or interruption.
function NavigationFeedback({ label }: { label: string }) {
 const { pending } = useLinkStatus();
 return <>
  <span className={s.navigationPending} data-pending={pending} aria-hidden="true" />
  <span className={s.navigationStatus} role="status">{pending ? `正在打开${label}…` : ""}</span>
 </>;
}

export function Header({account}: {account: ReactNode}) {
 const path = usePathname();
 return <header className={s.header}><Link href="/" className={s.logo} aria-label="Wise VIP 首页"><Image className={s.brandIcon} src={wiseVipIcon} alt="" width={36} height={36} sizes="36px" />WISE VIP<NavigationFeedback label="首页" /></Link><nav aria-label="主导航">{[["/article","研究文章"],["/chat","精选讨论"],["/point","观点追踪"],["/learn","资料与工具"],["/join","加入 VIP"]].map(([url,title])=><Link key={url} href={url} aria-current={path===url||(url!=="/"&&path.startsWith(url+"/"))?"page":undefined}>{title}<NavigationFeedback label={title} /></Link>)}</nav><div className={s.headerTools}><ThemeToggle/><a className={s.mainSite} href="https://www.wise-invest.org" title="返回 Wise 主站">主站<ArrowUpRight size={15}/></a>{account}</div></header>;
}
