import MarketingShell from "@/components/marketing-shell";

export default function FeaturesPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Features</h1>
          <ul className="mt-4 space-y-2 text-sm text-[var(--slate)]">
            <li>Personalized profile questionnaire</li>
            <li>Solubility-aware vitamin plan</li>
            <li>Safety notes and food-first guidance</li>
            <li>Plan history and updates</li>
          </ul>
        </div>
      </section>
    </MarketingShell>
  );
}
