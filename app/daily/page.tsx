import { JoinFrame } from "@/components/portal/join-frame";
import { DailyOverview } from "@/components/daily/overview";
import { notFound } from "next/navigation";
import { getIssue, getLatestIssue, getPublishedIssues } from "@/lib/daily/issues";

export const metadata = {
  title: "市场观察 · Wise VIP",
  description: "每周复盘与下周展望：企业财报、美国政策、宏观数据与加密市场，按期回看当时的判断。",
  robots: { index: false, follow: false },
};

// Observation pages stay dynamic so future membership gating is not frozen into a shared cache.
export const dynamic = "force-dynamic";

export default async function DailyPage({ searchParams }: {
  searchParams: Promise<{ issue?: string | string[] }>;
}) {
  const { issue: requestedIssue } = await searchParams;
  const issueId = Array.isArray(requestedIssue) ? requestedIssue[0] : requestedIssue;
  const issue = issueId ? getIssue(issueId) : getLatestIssue();
  if (issueId && !issue) notFound();

  return (
    <JoinFrame>
      <DailyOverview key={issue?.id ?? "empty"} issue={issue} issues={getPublishedIssues()} />
    </JoinFrame>
  );
}
