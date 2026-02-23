import AppShell from "@/components/app-shell";

export default function InsightsPage() {
  return (
    <AppShell title="Insights" subtitle="Solubility education and safe routines.">
      <div className="grid gap-4">
        <div className="glass rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-[var(--moss)]">Solubility basics</h2>
          <p className="mt-2 text-sm text-[var(--slate)]">
            Fat-soluble vitamins accumulate over time, while water-soluble vitamins require regular replenishment.
          </p>
        </div>
        <div className="glass rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-[var(--moss)]">Food-first approach</h2>
          <p className="mt-2 text-sm text-[var(--slate)]">
            Prioritize nutrient-dense foods and use supplements to close gaps, not replace meals.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
