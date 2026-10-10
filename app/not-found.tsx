import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24 text-center flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-foreground">تابلو پیدا نشد</h1>
      <p className="text-sm text-muted">
        از فهرست، تابلوی موردنظر را انتخاب کنید.
      </p>
      <Link
        className="text-accent hover:underline font-medium text-sm transition-colors"
        href="/"
      >
        فهرست تابلوها
      </Link>
    </div>
  );
}
