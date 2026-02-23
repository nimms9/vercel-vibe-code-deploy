import MarketingShell from "@/components/marketing-shell";

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Privacy policy</h1>
          <p className="mt-3 text-sm text-[var(--slate)]">
            We only collect what we need to personalize your plan. No selling of personal data.
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
