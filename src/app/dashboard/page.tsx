import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/app-shell";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  const plan = user
    ? await prisma.plan.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      })
    : null;

  return (
    <AppShell
      title="Dashboard"
      subtitle="Your personalized vitamin plan at a glance."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-3xl p-6">
          <h2 className="text-lg font-semibold text-[var(--moss)]">Welcome back</h2>
          <p className="mt-2 text-sm text-[var(--slate)]">{session.user.email}</p>
          <div className="mt-4 rounded-2xl border border-[rgba(31,59,47,0.12)] bg-white/80 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">
              Profile status
            </div>
            <div className="mt-2 text-sm text-[var(--moss)]">
              {user?.profile ? "Profile complete" : "Profile incomplete"}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/profile"
              className="rounded-full bg-[var(--moss)] px-5 py-2 text-sm font-semibold text-white"
            >
              {user?.profile ? "Edit profile" : "Complete profile"}
            </a>
            <a
              href="/plan"
              className="rounded-full border border-[rgba(31,59,47,0.2)] bg-white/80 px-5 py-2 text-sm font-semibold text-[var(--moss)]"
            >
              View plan
            </a>
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-[var(--moss)]">Latest plan</h3>
          <p className="mt-2 text-sm text-[var(--slate)]">
            {plan
              ? new Date(plan.createdAt).toLocaleDateString()
              : "No plan generated yet."}
          </p>
          <a
            href="/plan"
            className="mt-4 inline-flex rounded-full bg-[var(--moss)] px-4 py-2 text-xs font-semibold text-white"
          >
            {plan ? "Open plan" : "Generate plan"}
          </a>
        </div>
      </div>
    </AppShell>
  );
}
