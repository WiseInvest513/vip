"use client";

import { useState, type FormEvent } from "react";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { LogOut, UserRound } from "lucide-react";
import { AccountControl } from "./account-control";
import s from "./portal.module.css";
export function AccountPending() {
 return <span className={s.accountPending} data-account-pending="" role="status" aria-label="正在读取账户" aria-busy="true"><UserRound size={16} aria-hidden="true"/><span>加载中</span></span>;
}
// This island only displays account details. Protected content continues to use
// server-side auth() and fresh main-site membership checks before rendering.
export function Account() {
 return <SessionProvider basePath="/api/auth" refetchOnWindowFocus refetchInterval={0}><AccountSession/></SessionProvider>;
}
function AccountSession() {
 const { data: session, status } = useSession();
 const [signingOut, setSigningOut] = useState(false);
 const [signOutFailed, setSignOutFailed] = useState(false);
 if(status === "loading") return <AccountPending/>;
 if(!session?.user?.id) return <AccountControl/>;
 const {user} = session;
 const raw = user.name?.trim() || "";
 const name = !raw || raw.includes('@') || raw === user.id || raw === user.wiseUserId || /^[\d\s()+-]{7,}$/.test(raw) ? "我的账户" : raw;
 const tier = user.membershipTier === 'VIP_PLUS' ? 'VIP+' : user.membershipTier === 'VIP' ? 'VIP 会员' : '普通用户';
 const handleSignOut = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(signingOut) return;
  setSigningOut(true);
  setSignOutFailed(false);
  try {
   // A full navigation also clears previously rendered, member-specific routes.
   await signOut({redirectTo:"/"});
  } catch {
   setSigningOut(false);
   setSignOutFailed(true);
  }
 };
 return <AccountControl key={`${user.id}:${user.image ?? ""}`} profile={{name,tier,image:user.image}}><form onSubmit={handleSignOut}><button type="submit" disabled={signingOut} aria-busy={signingOut}><LogOut size={15}/>{signingOut ? "正在退出…" : "退出登录"}</button>{signOutFailed && <p role="alert">退出暂未完成，请重试。</p>}</form></AccountControl>;
}
