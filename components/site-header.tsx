import Link from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { ExhibitionLogo } from "@/components/icons";
import { ProgressiveBlur } from "@/components/progressive-blur";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full isolate">
      {/* Background layer with progressive blur separation instead of border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 -z-10 overflow-hidden">
        <div className="absolute z-20 inset-0 bg-linear-to-b from-background to-transparent" />

        <ProgressiveBlur
          blurLevels={[0.5, 2, 4, 8, 16, 24, 32, 64, 128]}
          className="pointer-events-none"
          height="100%"
          position="top"
        />
      </div>

      <div className="shell relative z-20 h-16 flex items-center justify-between">
        <Link
          className="flex items-center gap-2.5 text-base font-semibold text-foreground"
          href="/"
        >
          <ExhibitionLogo className="text-accent shrink-0" size={28} />
          <span className="flex flex-col leading-tight">
            <span>قاب روایت</span>
            <small className="text-[11px] font-normal text-muted mt-0.5">
              تابلوهای مصور و سناریوهای صحنه
            </small>
          </span>
        </Link>

        <div className="flex items-center gap-3.5 text-sm">
          <Link
            className="text-xs font-medium text-muted hover:text-accent transition-colors"
            href="/"
          >
            برنامه‌ها
          </Link>
          <div className="w-10 h-10 flex items-center justify-center">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
