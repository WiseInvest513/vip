import { ArticleLibrary } from "@/components/articles/library";
export const metadata = {
  title: "研究文章 · Wise VIP",
  description: "WiseInvest 的市场手记与深度研究。按美股市场、财报解析、公司研究和加密市场阅读，公开试读，VIP 阅读全文。",
  alternates: { canonical: "/article" },
};
export default function ArticlesPage() { return <ArticleLibrary />; }
