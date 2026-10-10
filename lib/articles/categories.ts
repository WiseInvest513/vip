import type { ArticleCategory } from "./types";

export const articleCategories: { id: ArticleCategory; name: string; description: string }[] = [
  { id: "us-markets", name: "美股市场", description: "从利率、资金与市场预期，理解美股的变化。" },
  { id: "earnings", name: "财报解析", description: "回到收入、利润与现金流，拆解增长的成色。" },
  { id: "companies", name: "公司研究", description: "沿着产品、竞争格局与产业链，认识一家公司。" },
  { id: "crypto", name: "加密市场", description: "把 BTC 与加密资产放回宏观、流动性和周期中。" },
];

export function categoryHref(id?: ArticleCategory) {
  return id ? `/article/category/${id}` : "/article";
}
