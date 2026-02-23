"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import MarketingShell from "@/components/marketing-shell";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Unable to sign up.");
      setLoading(false);
      return;
    }
    await signIn("credentials", { redirect: false, email, password });
    router.push("/dashboard");
  };

  return (
    <MarketingShell>
      <section className="mx-auto mt-12 w-full max-w-2xl">
        <div className="glass rounded-3xl p-8">
          <h1 className="font-display text-3xl text-[var(--ink)]">Create account</h1>
          <p className="mt-2 text-sm text-[var(--slate)]">
            Start building your personalized plan in minutes.
          </p>
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
              placeholder="Password"
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-white"
            >
              {loading ? "Creating…" : "Create account"}
            </button>
          </form>
        </div>
      </section>
    </MarketingShell>
  );
}
