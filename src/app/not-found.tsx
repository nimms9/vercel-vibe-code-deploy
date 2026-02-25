import Link from "next/link";
import MarketingShell from "@/components/marketing-shell";

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-4xl">
        <div className="glass rounded-3xl p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">
            404
          </p>
          <h1 className="font-display mt-2 text-3xl text-[var(--ink)]">
            Page not found
          </h1>
          <p className="mt-3 text-sm text-[var(--slate)]">
            The page you’re looking for doesn’t exist or has moved.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[var(--moss)] px-5 py-2 text-sm font-semibold text-white"
          >
            Back to home
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
