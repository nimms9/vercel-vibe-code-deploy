import MarketingShell from "@/components/marketing-shell";

export default function AboutPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">About VitaLens</h1>
          <p className="mt-3 text-sm text-[var(--slate)]">
            We built VitaLens to simplify vitamin guidance with a calm, clinical tone and practical next steps.
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
