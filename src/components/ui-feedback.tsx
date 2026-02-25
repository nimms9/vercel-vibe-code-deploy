"use client";

export function LoadingPill({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--moss)]">
      <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--moss)]" />
      {label}
    </div>
  );
}

export function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span>{message}</span>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white"
          >
            Retry
          </button>
        ) : null}
      </div>
    </div>
  );
}
