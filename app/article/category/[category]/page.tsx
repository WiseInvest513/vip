import { notFound } from "next/navigation";
import { ArticleLibrary } from "@/components/articles/library";
import { articleCategories, categoryHref } from "@/lib/articles/categories";
type Props = { params: Promise<{ category: string }> };
export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const selected = articleCategories.find(item => item.id === category);
  return { title: `${selected?.name ?? "目录未找到"} · 研究文章 · Wise VIP`, description: selected?.description, alternates: { canonical: selected ? categoryHref(selected.id) : "/article" } };
}
export default async function ArticleCategoryPage({ params }: Props) {
  const { category } = await params;
  const selected = articleCategories.find(item => item.id === category);
  if (!selected) notFound();
  return <ArticleLibrary category={selected.id} />;
}
