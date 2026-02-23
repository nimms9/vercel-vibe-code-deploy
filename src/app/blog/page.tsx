import MarketingShell from "@/components/marketing-shell";

export default function BlogPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Blog</h1>
          <p className="mt-3 text-sm text-[var(--slate)]">Insights on solubility, diet, and safe supplementing.</p>
        </div>
      </section>
    </MarketingShell>
  );
}
