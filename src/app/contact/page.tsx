import MarketingShell from "@/components/marketing-shell";

export default function ContactPage() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Contact us</h1>
          <p className="mt-3 text-sm text-[var(--slate)]">Questions or feedback? We’d love to hear from you.</p>
          <form className="mt-6 grid gap-4">
            <input
              className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
              placeholder="Name"
            />
            <input
              className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
              placeholder="Email"
            />
            <textarea
              className="min-h-[140px] rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
              placeholder="Message"
            />
            <button
              type="button"
              className="rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-white"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </MarketingShell>
  );
}
