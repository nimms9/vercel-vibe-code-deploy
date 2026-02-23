"use client";

import { useEffect, useState } from "react";

type Plan = {
  id: string;
  createdAt: string;
  recommendations: string;
  estimatedCost: string;
};

export default function PlanHistory() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/plan?history=1");
      if (res.ok) {
        const data = await res.json();
        setPlans(data.plans ?? []);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return <div className="glass rounded-3xl p-6">Loading history…</div>;
  }

  if (plans.length === 0) {
    return <div className="glass rounded-3xl p-6">No past plans yet.</div>;
  }

  return (
    <div className="grid gap-4">
      {plans.map((plan) => {
        const parsed = JSON.parse(plan.recommendations || "{}");
        const summary = parsed?.items?.[0]?.name ?? "Personalized plan";
        return (
          <div key={plan.id} className="glass rounded-3xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-sm font-semibold text-[var(--moss)]">{summary}</div>
                <div className="text-xs text-[var(--slate)]">
                  {new Date(plan.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--moss)]">
                {plan.estimatedCost}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
