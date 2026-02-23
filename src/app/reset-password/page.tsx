import MarketingShell from "@/components/marketing-shell";

export default function ResetPasswordPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-2xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Set a new password</h1>
          <input
            className="mt-6 w-full rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
            placeholder="New password"
          />
          <button className="mt-4 rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-white">
            Save password
          </button>
        </div>
      </section>
    </MarketingShell>
  );
}
