"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunIcon, MoonIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

  const handleToggle = () => {
    setTheme(isLight ? "dark" : "light");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        aria-hidden
        className="w-8 h-8 rounded-sm border border-neutral-200/50 dark:border-neutral-800/50"
      />
    );
  }

  return (
    <button
      aria-label={`تغییر حالت به تم ${isLight ? "تاریک" : "روشن"}`}
      className={clsx(
        "group relative w-8 h-8 rounded-sm border border-neutral-200 dark:border-neutral-800",
        "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm",
        "flex items-center justify-center text-neutral-600 dark:text-neutral-400",
        "hover:text-neutral-950 dark:hover:text-neutral-100",
        "hover:border-neutral-400 dark:hover:border-neutral-600",
        "active:scale-95 transition-all duration-200 cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
        className,
      )}
      title={isLight ? "تغییر به حالت تاریک" : "تغییر به حالت روشن"}
      type="button"
      onClick={handleToggle}
    >
      {isLight ? (
        <MoonIcon
          className="transition-transform group-hover:-rotate-12 duration-300"
          size={15}
        />
      ) : (
        <SunIcon
          className="transition-transform group-hover:rotate-45 duration-300"
          size={15}
        />
      )}
    </button>
  );
};
