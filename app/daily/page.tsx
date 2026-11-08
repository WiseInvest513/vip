import { JoinFrame } from "@/components/portal/join-frame";
import { DailyOverview } from "@/components/daily/overview";

export const metadata = {
  title: "市场观察 · Wise VIP",
  description: "每周展望与持续市场观察：云业务验证、宏观数据与关注产品，留下当时的判断。",
  robots: { index: false, follow: false },
};

// Observation pages stay dynamic so future membership gating is not frozen into a shared cache.
export const dynamic = "force-dynamic";

export default function DailyPage() {
  return (
    <JoinFrame>
      <DailyOverview />
    </JoinFrame>
  );
}
