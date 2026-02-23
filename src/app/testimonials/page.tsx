import MarketingShell from "@/components/marketing-shell";

export default function TestimonialsPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Testimonials</h1>
          <p className="mt-3 text-sm text-[var(--slate)]">Real people finding clarity in their vitamin routines.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              "The solubility breakdown made it click instantly.",
              "Clean, calm, and responsible guidance.",
              "Finally understood what to prioritize for my family.",
            ].map((quote) => (
              <div key={quote} className="rounded-3xl border border-[rgba(31,59,47,0.12)] bg-white/80 p-5">
                <p className="text-sm text-[var(--slate)]">“{quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
