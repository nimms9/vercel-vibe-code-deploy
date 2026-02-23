import MarketingShell from "@/components/marketing-shell";

export default function SciencePage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Science-backed approach</h1>
          <p className="mt-3 text-sm text-[var(--slate)]">
            VitaLens follows nutrition fundamentals: solubility, absorption timing, and safety ranges.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(31,59,47,0.12)] bg-white/80 p-5">
              <h3 className="text-lg font-semibold text-[var(--moss)]">Fat-soluble vitamins</h3>
              <p className="mt-2 text-sm text-[var(--slate)]">
                A, D, E, K are stored in tissue and can accumulate. We emphasize steady, measured intake with food.
              </p>
            </div>
            <div className="rounded-3xl border border-[rgba(31,59,47,0.12)] bg-white/80 p-5">
              <h3 className="text-lg font-semibold text-[var(--moss)]">Water-soluble vitamins</h3>
              <p className="mt-2 text-sm text-[var(--slate)]">
                B-complex and C are replenished often. We highlight food-first sources and split timing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
