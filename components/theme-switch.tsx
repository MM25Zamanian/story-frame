"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  AnimatedThemeToggler,
  type TransitionVariant,
} from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

export interface ThemeSwitchProps {
  className?: string;
  variant?: TransitionVariant;
  duration?: number;
  easing?: string;
  fromCenter?: boolean;
}

export function ThemeSwitch({
  className,
  variant,
  duration = 1000,
  easing,
  fromCenter,
}: ThemeSwitchProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="size-10 rounded-full border border-border bg-surface/80 shadow-2xs backdrop-blur-md"
      />
    );
  }

  return (
    <AnimatedThemeToggler
      aria-label={`تغییر حالت به تم ${resolvedTheme === "dark" ? "روشن" : "تاریک"}`}
      className={cn(
        "rounded-full shadow-2xs backdrop-blur-md size-10 border border-border bg-surface/80 hover:bg-surface text-foreground inline-flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      duration={duration}
      easing={easing}
      fromCenter={fromCenter}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      variant={variant}
      onThemeChange={setTheme}
    />
  );
}

export { AnimatedThemeToggler };
