import dynamic from "next/dynamic";
import { AppHeader } from "@/components/layout/app-header";
import { PageTransition } from "@/components/layout/page-transition";
import { KpiCards } from "@/features/dashboard/kpi-cards";
import { RoleBanner } from "@/features/dashboard/role-banner";
import { Skeleton } from "@/components/ui/skeleton";

const SalesLineChart = dynamic(
  () => import("@/features/dashboard/sales-line-chart").then((m) => m.SalesLineChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[340px] w-full rounded-xl border border-white/10 bg-white/[0.04]" />,
  }
);

const CategoryBarChart = dynamic(
  () => import("@/features/dashboard/category-bar-chart").then((m) => m.CategoryBarChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[340px] w-full rounded-xl border border-white/10 bg-white/[0.04]" />,
  }
);

export default function DashboardPage() {
  return (
    <>
      <AppHeader
        title="Overview"
        subtitle="Pipeline health, revenue motion, and segment mix."
      />
      <PageTransition className="flex-1 space-y-8 px-4 py-8 md:px-8">
        <RoleBanner />
        <KpiCards />
        <div className="grid min-w-0 gap-6 xl:grid-cols-2">
          <SalesLineChart />
          <CategoryBarChart />
        </div>
      </PageTransition>
    </>
  );
}
