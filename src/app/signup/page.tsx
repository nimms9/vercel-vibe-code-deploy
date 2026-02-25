"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import MarketingShell from "@/components/marketing-shell";
import { ErrorBanner, LoadingPill } from "@/components/ui-feedback";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setFieldError(null);

    if (!/.+@.+\..+/.test(email)) {
      setFieldError("Enter a valid email address.");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setFieldError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setFieldError("Password must include an uppercase letter, a number, and a symbol.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setFieldError("Passwords do not match.");
      setLoading(false);
      return;
    }
    setStatus("Creating your account…");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Unable to sign up.");
      setStatus(null);
      setLoading(false);
      return;
    }
    await signIn("credentials", { redirect: false, email, password });
    setStatus(null);
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
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
              placeholder="Confirm password"
              required
            />
            {fieldError ? (
              <p className="text-sm text-red-600">{fieldError}</p>
            ) : null}
            {status ? <LoadingPill label={status} /> : null}
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating…" : "Create account"}
            </button>
          </form>
          {error ? <ErrorBanner message={error} /> : null}
        </div>
      </section>
    </MarketingShell>
  );
}
