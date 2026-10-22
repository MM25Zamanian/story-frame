"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServicesBreadcrumb() {
  const [lastProgram, setLastProgram] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("storyframe_last_program");

      setLastProgram(saved);
    }
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-muted mb-3">
      {lastProgram ? (
        <Link
          className="inline-flex items-center gap-1 text-accent hover:underline transition-colors font-medium"
          href={`/${lastProgram}/`}
        >
          <ArrowRight size={14} />
          <span>بازگشت به برنامه</span>
        </Link>
      ) : (
        <Link className="hover:text-foreground transition-colors" href="/">
          صفحه اصلی
        </Link>
      )}
      <span>/</span>
      <span className="text-foreground font-semibold">خدمات ما</span>
    </div>
  );
}
