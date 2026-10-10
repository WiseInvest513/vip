"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import s from "./portal.module.css";
export function Header({account}: {account: ReactNode}) {
 const path = usePathname();
 return <header className={s.header}><Link href="/" className={s.logo} aria-label="Wise VIP 首页"><Image className={s.brandIcon} src="/brand/wisevip-icon.png" alt="" width={36} height={36} sizes="36px" />WISE VIP</Link><nav aria-label="主导航">{[["/article","研究文章"],["/chat","精选讨论"],["/point","观点追踪"],["/learn","资料与工具"],["/join","加入 VIP"]].map(([url,title])=><Link key={url} href={url} aria-current={path===url||(url!=="/"&&path.startsWith(url+"/"))?"page":undefined}>{title}</Link>)}</nav><div className={s.headerTools}><ThemeToggle/><a className={s.mainSite} href="https://www.wise-invest.org" title="返回 Wise 主站">主站<ArrowUpRight size={15}/></a>{account}</div></header>;
}
