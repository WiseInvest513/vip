"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, LogIn, UserRound, ArrowUpRight } from "lucide-react";
import s from "./portal.module.css";
type Profile = {name: string; image?: string | null; tier: string};
export function AccountControl({profile,children}: {profile?: Profile; children?: ReactNode}) {
 const path = usePathname();
 const [open,setOpen] = useState(false);
 const [imageFailed,setImageFailed] = useState(false);
 const [signingIn,setSigningIn] = useState(false);
 const root = useRef<HTMLDivElement>(null);
 const trigger = useRef<HTMLButtonElement>(null);
 useEffect(() => {
   if (!open) return;
   const outside = (e: PointerEvent) => {if(!root.current?.contains(e.target as Node)) setOpen(false);};
   const escape = (e: KeyboardEvent) => {if(e.key === "Escape") {setOpen(false);trigger.current?.focus();}};
   document.addEventListener("pointerdown",outside);document.addEventListener("keydown",escape);
   return () => {document.removeEventListener("pointerdown",outside);document.removeEventListener("keydown",escape);};
 },[open]);
 if(!profile) return <a className={s.loginButton} href={`/auth/login?callbackUrl=${encodeURIComponent(path === '/login' ? '/' : path)}`} aria-busy={signingIn} onClick={()=>setSigningIn(true)}><LogIn size={16}/>{signingIn ? "正在跳转…" : "登录"}</a>;
 const label = Array.from(profile.name).slice(0,6).join('') + (Array.from(profile.name).length > 6 ? '…' : '');
 return <div ref={root} className={s.accountRoot} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}><button ref={trigger} type="button" className={s.accountTrigger} aria-expanded={open} aria-controls="wise-account-panel" onClick={()=>setOpen(!open)}><span className={s.avatar}>{profile.image && !imageFailed ? <img src={profile.image} alt="" referrerPolicy="no-referrer" onError={()=>setImageFailed(true)}/> : <UserRound size={17}/>}</span><span className={s.accountCopy}><span>{label}</span><small>{profile.tier}</small></span><ChevronDown size={13}/></button>{open && <div id="wise-account-panel" className={s.accountPanel}><p>{profile.name}<small>{profile.tier} · Wise 主站账户</small></p><a href="https://www.wise-invest.org/account">账户管理<ArrowUpRight size={15}/></a><Link href="/join" onClick={()=>setOpen(false)}>VIP 会员权益<ArrowUpRight size={15}/></Link>{children}</div>}</div>;
}
