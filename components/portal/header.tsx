"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Crown } from "lucide-react";
import s from "./portal.module.css";
export function Header() {
 const path = usePathname();
 return <header className={s.header}><Link href="/" className={s.logo} aria-label="Wise VIP 首页"><Crown size={22}/>WISE VIP</Link><nav aria-label="主导航">{[["/","首页"],["/chat","精选讨论"],["/learn","学习资料"],["/join","加入 VIP"]].map(([url,title])=><Link key={url} href={url} aria-current={path===url||(url!=="/"&&path.startsWith(url+"/"))?"page":undefined}>{title}</Link>)}</nav><a className={s.login} href="https://www.wise-invest.org/login">主站登录<ArrowRight size={15}/></a></header>;
}
