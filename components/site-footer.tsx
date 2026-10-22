"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Layers, HeartHandshake } from "lucide-react";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const pathname = usePathname();
  const [lastProgram, setLastProgram] = useState<string | null>(null);

  const segments = pathname.split("/").filter(Boolean);
  const isHome = pathname === "/";
  const isServices = pathname.startsWith("/services");
  const isCategories = pathname.startsWith("/categories");
  const isArtworks = pathname.startsWith("/artworks");

  const isProgramRoute =
    !isHome &&
    !isServices &&
    !isCategories &&
    !isArtworks &&
    segments.length >= 1;
  const programSlug = isProgramRoute ? segments[0] : null;

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isHome) {
      setLastProgram(null);
    } else if (isProgramRoute && programSlug) {
      setLastProgram(programSlug);
    } else {
      setLastProgram(sessionStorage.getItem("storyframe_last_program"));
    }
  }, [pathname, isHome, isProgramRoute, programSlug]);

  const targetProgram = programSlug || lastProgram;
  const programsHref = targetProgram ? `/${targetProgram}/` : "/";

  return (
    <footer className="w-full border-t border-border bg-surface/30 mt-auto">
      <div className="shell py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex flex-col gap-2 max-w-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="font-extrabold text-base tracking-tight text-foreground">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              مرور تابلوهای مصور، سناریوهای صحنه‌ای و ملزومات برگزاری مراسم‌ها و
              رویدادهای آیینی.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav
            aria-label="پیوندهای فوتر"
            className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium"
          >
            <Link
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border bg-surface hover:bg-surface-hover hover:border-accent/40 text-foreground transition-all duration-150"
              href={programsHref}
            >
              <Layers className="text-muted" size={14} />
              <span>تابلوها و سناریوها</span>
            </Link>

            <Link
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border bg-surface hover:bg-surface-hover hover:border-accent/40 text-foreground transition-all duration-150"
              href="/services/"
            >
              <HeartHandshake className="text-accent" size={14} />
              <span className="font-semibold text-accent">خدمات ما</span>
            </Link>
          </nav>
        </div>

        {/* Symmetrical Divider Line */}
        <div className="h-px w-full bg-border my-6" />

        {/* Bottom Metadata & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted">
          <div className="flex items-center gap-1.5">
            <Sparkles className="text-accent" size={12} />
            <span>
              نذر فرهنگی جهت اعتلای فرهنگ و معارف اهل‌بیت (ع) — استفاده و بازنشر
              برای تمامی مجالس آزاد است.
            </span>
          </div>
          <span className="font-mono opacity-70">
            {new Date().getFullYear()} — Story Frame
          </span>
        </div>
      </div>
    </footer>
  );
}
