import Link from "next/link";
import { Droplet } from "lucide-react";

export default function AppShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="grain min-h-screen px-5 pb-20 pt-8 text-[15px] text-[var(--ink)] sm:px-10 lg:px-16">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-full bg-[var(--mist)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--moss)]"
          >
            <Droplet className="h-4 w-4" />
            VitaLens
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[var(--slate)]">
            <Link href="/dashboard" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              Dashboard
            </Link>
            <Link href="/profile" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              Profile
            </Link>
            <Link href="/plan" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              Plan
            </Link>
            <Link href="/history" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              History
            </Link>
            <Link href="/settings" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              Settings
            </Link>
          </div>
        </nav>
        <div>
          <h1 className="font-display text-3xl text-[var(--ink)] sm:text-4xl">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-[var(--slate)]">{subtitle}</p> : null}
        </div>
      </header>
      <main className="mx-auto mt-10 w-full max-w-6xl">{children}</main>
    </div>
  );
}
