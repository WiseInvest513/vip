export type ArticleCategory = "us-markets" | "earnings" | "companies" | "crypto";

export type ArticlePreview = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  categories: ArticleCategory[];
  tags: string[];
  keywords: string[];
  cover: string;
  coverAlt: string;
  access: "public" | "vip";
  sourceUrl: string;
};

export type ArticleContent = ArticlePreview & {
  body: string;
  preview: string;
};
