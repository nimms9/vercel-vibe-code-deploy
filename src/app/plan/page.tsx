"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/app-shell";
import { ErrorBanner, LoadingPill } from "@/components/ui-feedback";

type PlanRecord = {
  recommendations: { items?: Recommendation[] } | string;
  safetyNotes: string;
  createdAt: string;
};

type Recommendation = {
  name: string;
  dose: string;
  timing: string;
  why: string;
  cautions: string[];
};

export default function PlanPage() {
  const [plan, setPlan] = useState<PlanRecord | null>(null);
  const [items, setItems] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/plan");
      if (res.ok) {
        const data = await res.json();
        if (data.plan) {
          const parsed =
            typeof data.plan.recommendations === "string"
              ? JSON.parse(data.plan.recommendations || "{}")
              : data.plan.recommendations ?? {};
          setPlan(data.plan);
          setItems(parsed.items || []);
        }
      } else {
        setError("Unable to load plan. Please retry.");
      }
    } catch {
      setError("Unable to load plan. Please retry.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPlan();
  }, []);

  const generate = async () => {
    setStatus("Generating…");
    setError(null);
    try {
      const res = await fetch("/api/plan/generate", { method: "POST" });
      if (res.ok) {
        await loadPlan();
        setStatus("Plan updated.");
      } else {
        setError("Unable to generate plan. Complete your profile first.");
        setStatus(null);
      }
    } catch {
      setError("Unable to generate plan. Please retry.");
      setStatus(null);
    }
  };

  return (
    <AppShell title="Your plan" subtitle="Personalized recommendations and safety notes.">
      <div className="grid gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={generate}
            className="rounded-full bg-[var(--moss)] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading || status === "Generating…"}
          >
            Generate plan
          </button>
          {status ? <span className="text-sm text-[var(--slate)]">{status}</span> : null}
        </div>

        {loading ? <LoadingPill label="Loading plan…" /> : null}
        {error ? <ErrorBanner message={error} onRetry={loadPlan} /> : null}

        {loading ? (
          <div className="glass rounded-3xl p-6">Loading plan…</div>
        ) : !plan ? (
          <div className="glass rounded-3xl p-6">
            No plan yet. Generate one after completing your profile.
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="glass rounded-3xl p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">
                Last generated
              </div>
              <div className="mt-2 text-sm text-[var(--moss)]">
                {new Date(plan.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {items.map((item) => (
                <div key={item.name} className="glass rounded-3xl p-5">
                  <h3 className="text-lg font-semibold text-[var(--moss)]">{item.name}</h3>
                  <p className="mt-2 text-sm text-[var(--slate)]">{item.why}</p>
                  <div className="mt-3 text-xs text-[var(--slate)]">
                    <div>Dosage: {item.dose}</div>
                    <div>Timing: {item.timing}</div>
                  </div>
                  <div className="mt-3 text-xs text-[var(--slate)]">
                    {item.cautions.join(" · ")}
                  </div>
                </div>
              ))}
            </div>
            <div className="glass rounded-3xl p-6">
              <div className="text-sm text-[var(--slate)]">{plan.safetyNotes}</div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
