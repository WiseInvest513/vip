import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://vip.wise-invest.org"),
  title: "Wise VIP | 和认真关注市场的人，把投资聊透",
  description: "Wise VIP 美股与加密社群、研究工具、历史记录与会员加入方式。"
};
export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
