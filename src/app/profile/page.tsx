"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/app-shell";
import { ErrorBanner, LoadingPill } from "@/components/ui-feedback";

const goalsOptions = ["energy", "sleep", "stress", "fitness", "immunity"];
const ageRanges = ["18-24", "25-29", "30-39", "40-49", "50-59", "60+"];
const dietOptions = ["Balanced", "Vegetarian", "Vegan", "Pescatarian", "Gluten-free", "Dairy-free"];
const budgetOptions = ["$10-$25", "$15-$35", "$35-$60", "$60+"];

export default function ProfilePage() {
  const [form, setForm] = useState({
    ageRange: "30-39",
    sex: "female",
    dietStyle: "Balanced",
    goals: ["energy"],
    allergies: "",
    budget: "$15-$35",
    healthFlags: { pregnancy: false, anticoagulants: false, thyroidMeds: false },
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/profile");
        if (!res.ok) {
          setError("Unable to load profile. Please retry.");
          return;
        }
        const data = await res.json();
        if (data.profile) {
          setForm({
            ageRange: data.profile.ageRange,
            sex: data.profile.sex ?? "female",
            dietStyle: data.profile.dietStyle,
            goals: JSON.parse(data.profile.goals || "[]"),
            allergies: data.profile.allergies || "",
            budget: data.profile.budget,
            healthFlags: JSON.parse(data.profile.healthFlags || "{}"),
          });
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleGoal = (goal: string) => {
    setForm((prev) => {
      const exists = prev.goals.includes(goal);
      const goals = exists ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal];
      return { ...prev, goals };
    });
  };

  const handleSave = async (generatePlan: boolean) => {
    setStatus("Saving…");
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError("Save failed. Please retry.");
        setStatus(null);
        return;
      }
      if (generatePlan) {
        const planRes = await fetch("/api/plan/generate", { method: "POST" });
        if (!planRes.ok) {
          setError("Plan generation failed. Please retry.");
          setStatus(null);
          return;
        }
      }
      setStatus(generatePlan ? "Saved & plan generated." : "Saved.");
    } catch {
      setError("Save failed. Please retry.");
      setStatus(null);
    }
  };

  return (
    <AppShell title="Profile" subtitle="Update your preferences to personalize your plan.">
      <div className="grid gap-6">
        {loading ? <LoadingPill label="Loading profile…" /> : null}
        {error ? <ErrorBanner message={error} onRetry={() => window.location.reload()} /> : null}
        <div className="glass rounded-3xl p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[var(--slate)]">
              Age range
              <select
                value={form.ageRange}
                onChange={(event) => setForm({ ...form, ageRange: event.target.value })}
                className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
                disabled={loading}
              >
                {ageRanges.map((range) => (
                  <option key={range}>{range}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[var(--slate)]">
              Sex (optional)
              <select
                value={form.sex}
                onChange={(event) => setForm({ ...form, sex: event.target.value })}
                className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
                disabled={loading}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Nonbinary</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[var(--slate)]">
              Diet style
              <select
                value={form.dietStyle}
                onChange={(event) => setForm({ ...form, dietStyle: event.target.value })}
                className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
                disabled={loading}
              >
                {dietOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[var(--slate)]">
              Budget range
              <select
                value={form.budget}
                onChange={(event) => setForm({ ...form, budget: event.target.value })}
                className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
                disabled={loading}
              >
                {budgetOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="text-sm font-semibold text-[var(--slate)]">Goals</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {goalsOptions.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => toggleGoal(goal)}
                disabled={loading}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  form.goals.includes(goal)
                    ? "bg-[var(--moss)] text-white"
                    : "bg-white/80 text-[var(--moss)]"
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <label className="grid gap-2 text-sm font-semibold text-[var(--slate)]">
            Allergies or avoid list
            <input
              value={form.allergies}
              onChange={(event) => setForm({ ...form, allergies: event.target.value })}
              className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-sm"
              placeholder="Nuts, Shellfish, Soy"
              disabled={loading}
            />
          </label>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="text-sm font-semibold text-[var(--slate)]">Health flags</div>
          <div className="mt-3 grid gap-2 text-sm text-[var(--slate)]">
            {[
              { key: "pregnancy", label: "Pregnancy" },
              { key: "anticoagulants", label: "Blood thinners" },
              { key: "thyroidMeds", label: "Thyroid medication" },
            ].map((flag) => (
              <label key={flag.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(form.healthFlags as Record<string, boolean>)[flag.key] || false}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      healthFlags: { ...form.healthFlags, [flag.key]: event.target.checked },
                    })
                  }
                  disabled={loading}
                />
                {flag.label}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="rounded-full bg-[var(--moss)] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="rounded-full border border-[rgba(31,59,47,0.2)] bg-white/80 px-5 py-2 text-sm font-semibold text-[var(--moss)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            Save & generate plan
          </button>
          {status ? <span className="text-sm text-[var(--slate)]">{status}</span> : null}
        </div>
      </div>
    </AppShell>
  );
}
