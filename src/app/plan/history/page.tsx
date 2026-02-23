import AppShell from "@/components/app-shell";
import PlanHistory from "@/components/plan-history";

export default function PlanHistoryPage() {
  return (
    <AppShell title="Plan history" subtitle="Review past recommendations.">
      <PlanHistory />
    </AppShell>
  );
}
