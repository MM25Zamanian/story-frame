"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function Reveal({
  children,
  entrance = false,
  media = false,
}: {
  children: ReactNode;
  entrance?: boolean;
  media?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    let observer: IntersectionObserver | undefined;
    const finish = () => {
      observer?.disconnect();
      animation?.cancel();
    };
    const play = () => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = "true";
      animation = el.animate(
        media
          ? [
              { opacity: 0.6, transform: "scale(.97)" },
              { opacity: 1, transform: "scale(1)" },
            ]
          : [
              { opacity: 0.6, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
        { duration: media ? 650 : 500, easing: "cubic-bezier(.23,1,.32,1)" },
      );
    };

    if (preference.matches) {
      el.dataset.revealed = "true";

      return;
    }
    if (el.getBoundingClientRect().top < innerHeight) {
      if (entrance && scrollY < 20) play();
      else el.dataset.revealed = "true";
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer?.disconnect();
            play();
          }
        },
        { threshold: 0, rootMargin: "0px 0px 100px 0px" },
      );
      observer.observe(el);
    }
    const change = () => {
      finish();
      el.dataset.revealed = "true";
    };

    preference.addEventListener("change", change);

    return () => {
      finish();
      preference.removeEventListener("change", change);
    };
  }, [entrance, media]);

  return (
    <div ref={ref} className="reveal-group">
      {children}
    </div>
  );
}
