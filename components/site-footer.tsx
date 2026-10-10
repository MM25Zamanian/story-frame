import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="shell pt-6 pb-16 flex items-center justify-between gap-4 text-xs text-muted">
      <span>استوری فریم · سلسله تابلوهای دومینو</span>
      <Link className="text-accent hover:underline transition-colors" href="/">
        فهرست تابلوها
      </Link>
    </footer>
  );
}
