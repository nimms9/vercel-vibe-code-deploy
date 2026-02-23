import MarketingShell from "@/components/marketing-shell";

export default function VerifyEmailPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-2xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Verify your email</h1>
          <p className="mt-3 text-sm text-[var(--slate)]">
            Check your inbox for a verification link. You can close this page once verified.
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
