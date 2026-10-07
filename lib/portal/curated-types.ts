export type DiscussionSource = {
  id: string;
  date: string;
  label: string;
  messageIndices: number[];
  note: string;
};

export type Principle = {
  id: string;
  title: string;
  brief: string;
  context: string;
  explanation: string;
  sourceLabel: string;
  practice: string;
  quote: string;
  date: string;
  messageIndices: number[];
  articleSlug: string;
};

export type CuratedSection = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  quote?: { text: string; attribution: string; sourceId: string };
  conversation?: {
    speaker: "群友" | "Wise";
    text: string;
    sourceId: string;
  }[];
  points?: { title: string; text: string }[];
  diagram?: "macro";
};

export type CuratedDiscussion = {
  slug: string;
  number: string;
  category: "投资原则" | "宏观观察" | "公司研究" | "交易执行" | "研究方法";
  englishCategory: string;
  title: string;
  description: string;
  question: string;
  readingMinutes: number;
  period: string;
  keywords: string[];
  outcomes: string[];
  sections: CuratedSection[];
  takeaway: string;
  exercise: {
    question: string;
    options: { label: string; feedback: string }[];
    takeaway: string;
  };
  sources: DiscussionSource[];
  references: { title: string; url: string; note: string }[];
};

export type DiscussionPreview = Pick<
  CuratedDiscussion,
  "slug" | "number" | "category" | "englishCategory" | "title" | "description" | "readingMinutes" | "keywords" | "outcomes"
> & { vipOnly: boolean };
