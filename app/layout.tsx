import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import {Header} from "@/components/portal/header";
import { Account } from "@/components/portal/account";
import s from "@/components/portal/portal.module.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://vip.wise-invest.org"),
  title: "Wise VIP | 和认真关注市场的人，把投资聊透",
  description: "Wise VIP 美股与加密社群、研究工具、历史记录与会员加入方式。"
};
export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang="zh-CN" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html: `(function(){try{var t=localStorage.getItem("wisevip-theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}})()`}}/></head><body><Header account={<div className={s.accountSlot}><Account/></div>}/>{children}<Script id="wise-global-popup-script" src="/wise-popup.js" strategy="afterInteractive" data-site="vip" data-config-url={process.env.NODE_ENV === "development" ? "http://127.0.0.1:3002/api/public/popup" : "https://www.wise-invest.org/api/public/popup"} /></body></html>;
}
