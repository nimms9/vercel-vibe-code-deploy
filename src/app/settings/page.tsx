"use client";

import { signOut, useSession } from "next-auth/react";
import AppShell from "@/components/app-shell";

export default function SettingsPage() {
  const { data } = useSession();

  return (
    <AppShell title="Settings" subtitle="Manage your account and session.">
      <div className="glass rounded-3xl p-6">
        <div className="text-sm text-[var(--slate)]">Signed in as</div>
        <div className="mt-1 text-sm font-semibold text-[var(--moss)]">
          {data?.user?.email}
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-4 rounded-full bg-[var(--moss)] px-5 py-2 text-sm font-semibold text-white"
        >
          Sign out
        </button>
      </div>
    </AppShell>
  );
}
