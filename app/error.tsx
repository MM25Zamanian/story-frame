"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="shell py-24 text-center flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-foreground">صفحه بارگذاری نشد</h1>
      <p className="text-sm text-muted">دوباره تلاش کنید.</p>
      <button
        className="text-accent hover:underline font-medium text-sm cursor-pointer transition-colors"
        onClick={reset}
      >
        تلاش دوباره
      </button>
    </div>
  );
}
