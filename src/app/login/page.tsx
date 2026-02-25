"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import MarketingShell from "@/components/marketing-shell";
import { ErrorBanner, LoadingPill } from "@/components/ui-feedback";

export const dynamic = "force-dynamic";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("demo@vitalens.app");
  const [password, setPassword] = useState("DemoPass123!");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setStatus("Authenticating…");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid credentials. Try the demo account.");
      setStatus(null);
      return;
    }
    setStatus(null);
    router.push(callbackUrl);
  };

  return (
    <section className="mx-auto mt-12 w-full max-w-2xl">
      <div className="glass rounded-3xl p-8">
        <h1 className="font-display text-3xl text-[var(--ink)]">Sign in</h1>
        <p className="mt-2 text-sm text-[var(--slate)]">
          Demo account: demo@vitalens.app / DemoPass123!
        </p>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
            placeholder="Password"
          />
          {status ? <LoadingPill label={status} /> : null}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        {error ? <ErrorBanner message={error} /> : null}
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <MarketingShell>
      <Suspense fallback={<div className="mx-auto mt-12 w-full max-w-2xl">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </MarketingShell>
  );
}
