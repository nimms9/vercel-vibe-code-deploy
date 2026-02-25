import Link from "next/link";
import { Droplet } from "lucide-react";

export default function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grain min-h-screen px-5 pb-20 pt-8 text-[15px] text-[var(--ink)] sm:px-10 lg:px-16">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-[var(--mist)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--moss)]"
          >
            <Droplet className="h-4 w-4" />
            VitaLens
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[var(--slate)]">
            <Link href="/how-it-works" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              How it works
            </Link>
            <Link href="/science" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              Science
            </Link>
            <Link href="/signup" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              Sign up
            </Link>
            <Link href="/login" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-[var(--moss)] px-4 py-2 text-white shadow-[0_15px_35px_rgba(31,59,47,0.28)] transition hover:-translate-y-0.5"
            >
              Try for free
            </Link>
            <Link href="/contact" className="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[var(--ink)]">
              Contact
            </Link>
          </div>
        </nav>
      </header>
      {children}
      <footer className="mx-auto mt-16 w-full max-w-6xl rounded-3xl border border-[rgba(31,59,47,0.12)] bg-white/80 px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 rounded-full bg-[var(--mist)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--moss)]">
              <Droplet className="h-4 w-4" />
              VitaLens
            </div>
            <p className="mt-4 max-w-sm text-sm text-[var(--slate)]">
              A calm, science-informed way to understand daily vitamins by solubility, diet, and lifestyle.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">Company</div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--slate)]">
              <li>
                <Link href="/about" className="transition hover:text-[var(--moss)]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-[var(--moss)]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">Product</div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--slate)]">
              <li>
                <Link href="/features" className="transition hover:text-[var(--moss)]">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="transition hover:text-[var(--moss)]">
                  How it works
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-xs text-[var(--slate)]">
          © 2026 VitaLens. Not medical advice.
        </div>
      </footer>
    </div>
  );
}
