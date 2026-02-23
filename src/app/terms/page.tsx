import MarketingShell from "@/components/marketing-shell";

export default function TermsPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Terms of service</h1>
          <p className="mt-3 text-sm text-[var(--slate)]">
            VitaLens provides informational guidance and does not replace medical advice.
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
