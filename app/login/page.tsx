import { LoginSubmit } from "@/components/portal/login-submit";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { wiseAuth } from "@/lib/auth/settings";
import { sanitizeLoginDestination } from "@/lib/auth/wise-id";
import s from "@/components/portal/portal.module.css";
export const metadata = {title: "登录 · Wise VIP", robots: {index: false, follow: false}};
export default async function Login({searchParams}: {searchParams: Promise<{callbackUrl?: string; error?: string}>}) {
  const query = await searchParams;
  const destination = sanitizeLoginDestination(query.callbackUrl);
  const session = await auth();
  if (session?.user?.id) redirect(destination);
  return <main className={s.loginPage}><section className={s.loginCard}><Image src="/brand/wisevip-icon.png" alt="Wise VIP" width={64} height={64}/><p className={s.gold}>ONE ACCOUNT · WISE INVEST</p><h1>回到你的学习与研究。</h1><p>使用 Wise 主站账户，继续阅读、讨论与学习。<br/>会员权益随主站身份同步。</p>{query.error && <p role="alert">暂时未能完成主站登录。请点击下方按钮重试；如果页面长时间没有变化，请刷新后再试。</p>}{wiseAuth.configured ? <LoginSubmit callbackUrl={destination} /> : <p role="status">主站登录正在接入中，暂未开放。</p>}<small>账户与会员资料统一由主站管理。</small><Link href="/chat">先浏览精选讨论 →</Link></section></main>;
}
