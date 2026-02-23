import MarketingShell from "@/components/marketing-shell";

export default function HowItWorksPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">How VitaLens works</h1>
          <p className="mt-3 text-sm text-[var(--slate)]">
            A three-step flow that keeps the guidance grounded and easy to act on.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Answer a few questions",
                copy: "Share age range, diet style, goals, allergies, and any flags.",
              },
              {
                title: "Generate your plan",
                copy: "We combine solubility rules with your inputs to prioritize key nutrients.",
              },
              {
                title: "Adjust and save",
                copy: "Refine your profile and re-run when your routine changes.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-[rgba(31,59,47,0.12)] bg-white/80 p-5">
                <h3 className="text-lg font-semibold text-[var(--moss)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--slate)]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
