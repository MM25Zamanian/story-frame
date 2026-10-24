"use client";

import { useEffect, useState } from "react";
import { Package, Utensils, GlassWater, Store } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: typeof Package;
}

const navItems: NavItem[] = [
  { id: "equipment", label: "تجهیزات و سازه‌ها", icon: Package },
  { id: "food", label: "پذیرایی و غذای گرم", icon: Utensils },
  { id: "refreshments", label: "آبمیوه و بستنی", icon: GlassWater },
  { id: "cultural-shops", label: "فروشگاه‌ها و هدایا", icon: Store },
];

export function ServicesNav() {
  const [activeSection, setActiveSection] = useState<string>("equipment");

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry with the largest intersection ratio that is intersecting
      const intersecting = entries.filter((e) => e.isIntersecting);

      if (intersecting.length > 0) {
        // Sort by bounding top
        const mostVisible = intersecting.reduce((prev, curr) =>
          curr.intersectionRatio > prev.intersectionRatio ? curr : prev,
        );

        setActiveSection(mostVisible.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-80px 0px -40% 0px",
      threshold: [0.1, 0.3, 0.6],
    });

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);

      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      const yOffset = -90; // offset for sticky header + nav
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav
      aria-label="فهرست دسترسی سریع به بخش‌های خدمات"
      className="sticky top-16 z-30 w-full py-2 mb-8 sm:mb-10"
    >
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1.5 p-1.5 rounded-2xl bg-background/85 backdrop-blur-xl border border-border/80 shadow-xs">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;

          return (
            <a
              key={id}
              aria-current={isActive ? "true" : undefined}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 whitespace-nowrap transition-all duration-150 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? "bg-accent text-accent-foreground shadow-2xs"
                  : "text-muted hover:text-foreground hover:bg-surface/80"
              }`}
              href={`#${id}`}
              onClick={(e) => handleScrollTo(e, id)}
            >
              <Icon
                className={isActive ? "text-accent-foreground" : "text-muted"}
                size={16}
              />
              <span>{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
