"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star";

export interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  easing?: string;
  variant?: TransitionVariant;
  /** When true, the transition expands from the viewport center instead of the button center. */
  fromCenter?: boolean;
  /**
   * Controlled theme value. When provided, the parent owns persistence
   * (e.g. `next-themes`) and this component will not write to localStorage.
   */
  theme?: "light" | "dark";
  /** Called on toggle. Pair with `theme` for controlled usage. */
  onThemeChange?: (theme: "light" | "dark") => void;
}

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ");

  return `polygon(${pairs})`;
}

// All coordinates are percentages of the snapshot reference box: Chrome 150
// renders absolute px clip-path coordinates on ::view-transition-new(root)
// unscaled on fractional display scales (e.g. Windows 150%) for the first
// transition after load, so px values land at the wrong position (#989).
function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number,
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`;
  // circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the reference box.
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;

  switch (variant) {
    case "circle":
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius * 1.04)} at ${point(cx, cy)})`,
      ];
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(", ");

      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case "triangle": {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(", ");

      return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`];
    }
    case "diamond": {
      // Slightly larger than the view-transition circle radius so axis-aligned coverage matches the circle reveal.
      const R = maxRadius * Math.SQRT2;
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(", ");

      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case "hexagon": {
      const R = maxRadius * Math.SQRT2;
      const verts: string[] = [];

      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;

        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)));
      }

      return [
        polygonCollapsed(point(cx, cy), 6),
        `polygon(${verts.join(", ")})`,
      ];
    }
    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(", ");

      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`];
    }
    case "star": {
      // Small overscan so the last frames never leave a 1px seam before the transition group ends.
      const R = maxRadius * Math.SQRT2 * 1.03;
      const innerRatio = 0.42;
      const starPolygon = (radius: number) => {
        const verts: string[] = [];

        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;

          verts.push(
            point(
              cx + radius * Math.cos(outerA),
              cy + radius * Math.sin(outerA),
            ),
          );
          const innerA = outerA + Math.PI / 5;

          verts.push(
            point(
              cx + radius * innerRatio * Math.cos(innerA),
              cy + radius * innerRatio * Math.sin(innerA),
            ),
          );
        }

        return `polygon(${verts.join(", ")})`;
      };
      const startR = Math.max(2, R * 0.025);

      return [starPolygon(startR), starPolygon(R)];
    }
    default:
      return [
        `circle(0px at ${cx}px ${cy}px)`,
        `circle(${maxRadius}px at ${cx}px ${cy}px)`,
      ];
  }
}

export const AnimatedThemeToggler = ({
  className,
  duration = 1000,
  easing: userEasing,
  variant,
  fromCenter = false,
  theme,
  onThemeChange,
  ...props
}: AnimatedThemeTogglerProps) => {
  const shape = variant ?? "circle";
  const effectiveEasing =
    userEasing ??
    (shape === "star" ? "linear" : "cubic-bezier(0.16, 1, 0.3, 1)");
  const isControlled = theme !== undefined;
  const [internalIsDark, setInternalIsDark] = useState(false);
  const isDark = isControlled ? theme === "dark" : internalIsDark;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTransitioningRef = useRef(false);
  const activeAnimRef = useRef<Animation | null>(null);

  const cancelAnim = useCallback(() => {
    activeAnimRef.current?.cancel();
    activeAnimRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cancelAnim();
      const root = document.documentElement;

      if (root.dataset.magicuiThemeVt) {
        delete root.dataset.magicuiThemeVt;
      }
    };
  }, [cancelAnim]);

  useEffect(() => {
    if (isControlled) return;

    const updateTheme = () => {
      setInternalIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [isControlled]);

  const toggleTheme = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      const root = document.documentElement;

      // If already locked, resume and unlock
      if (root.dataset.magicuiThemeVt === "locked") {
        const unlock = (
          window as unknown as { __unlockThemeTransition?: () => void }
        ).__unlockThemeTransition;

        if (unlock) {
          unlock();

          return;
        }
      }

      if (
        !button ||
        isTransitioningRef.current ||
        root.dataset.magicuiThemeVt === "active"
      ) {
        return;
      }

      const isLockRequested = Boolean(
        event?.shiftKey ||
        event?.altKey ||
        (typeof window !== "undefined" &&
          (window as unknown as { __lockThemeTransition?: boolean })
            .__lockThemeTransition),
      );

      // innerWidth/innerHeight (not visualViewport): percentages must resolve
      // against the snapshot reference box, which includes classic scrollbars.
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x: number;
      let y: number;

      if (fromCenter) {
        x = viewportWidth / 2;
        y = viewportHeight / 2;
      } else {
        const { top, left, width, height } = button.getBoundingClientRect();

        x = left + width / 2;
        y = top + height / 2;
      }

      const maxRadius = Math.hypot(
        Math.max(x, viewportWidth - x),
        Math.max(y, viewportHeight - y),
      );

      const applyTheme = () => {
        const newTheme = !isDark;

        // Always toggle the class synchronously so the View Transitions API
        // snapshots the new theme inside the startViewTransition callback.
        document.documentElement.classList.toggle("dark", newTheme);
        document.documentElement.classList.toggle("light", !newTheme);
        document.documentElement.setAttribute(
          "data-theme",
          newTheme ? "dark" : "light",
        );

        if (isControlled) {
          onThemeChange?.(newTheme ? "dark" : "light");
        } else {
          setInternalIsDark(newTheme);
          localStorage.setItem("theme", newTheme ? "dark" : "light");
        }
      };

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (
        prefersReducedMotion ||
        typeof document.startViewTransition !== "function"
      ) {
        applyTheme();

        return;
      }

      const clipPath = getThemeTransitionClipPaths(
        shape,
        x,
        y,
        maxRadius,
        viewportWidth,
        viewportHeight,
      );

      root.dataset.magicuiThemeVt = isLockRequested ? "locked" : "active";
      root.style.setProperty(
        "--magicui-theme-toggle-vt-duration",
        isLockRequested ? "999999s" : `${duration}ms`,
      );
      root.style.setProperty(
        "--magicui-theme-toggle-vt-easing",
        effectiveEasing,
      );
      // Pin the collapsed clip-path via CSS so Firefox does not paint the new
      // theme unclipped between snapshot and the ready.then() JS animation.
      root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0]);

      const cleanup = () => {
        isTransitioningRef.current = false;
        delete root.dataset.magicuiThemeVt;
        root.style.removeProperty("--magicui-theme-toggle-vt-duration");
        root.style.removeProperty("--magicui-theme-toggle-vt-easing");
        root.style.removeProperty("--magicui-theme-vt-clip-from");
        delete (window as unknown as { __unlockThemeTransition?: () => void })
          .__unlockThemeTransition;
        cancelAnim();
      };

      isTransitioningRef.current = true;
      const transition = document.startViewTransition(() => {
        flushSync(applyTheme);
      });

      if (typeof transition?.finished?.finally === "function") {
        transition.finished.finally(cleanup).catch(() => {});
      } else {
        cleanup();
      }

      const ready = transition?.ready;

      if (ready && typeof ready.then === "function") {
        ready
          .then(() => {
            const anim = document.documentElement.animate(
              {
                clipPath,
              },
              {
                duration: isLockRequested ? 1000 : duration,
                easing: effectiveEasing,
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
              },
            );

            activeAnimRef.current = anim;

            if (isLockRequested) {
              // Freeze at 45% expansion for visual inspection
              setTimeout(() => {
                if (activeAnimRef.current === anim) {
                  anim.currentTime = 450;
                  anim.pause();
                  // eslint-disable-next-line no-console
                  console.log(
                    "%c🔒 [Theme Transition Locked at 45%]",
                    "background: #1c663c; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
                    "The View Transition layer is locked on screen. You can inspect ::view-transition in Chrome DevTools Elements. Press Escape, click the button again, or run window.__unlockThemeTransition() to resume.",
                  );
                }
              }, 30);

              const unlock = () => {
                window.removeEventListener("keydown", onKeyDown);
                delete (
                  window as unknown as { __unlockThemeTransition?: () => void }
                ).__unlockThemeTransition;
                root.dataset.magicuiThemeVt = "active";
                root.style.setProperty(
                  "--magicui-theme-toggle-vt-duration",
                  `${duration}ms`,
                );
                anim.currentTime = 450;
                anim.play();
                setTimeout(
                  () => {
                    cleanup();
                  },
                  duration * 0.6 + 60,
                );
              };

              const onKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                  unlock();
                }
              };

              window.addEventListener("keydown", onKeyDown);
              (
                window as unknown as { __unlockThemeTransition?: () => void }
              ).__unlockThemeTransition = unlock;
            }
          })
          .catch(() => {
            cleanup();
          });
      }
    },
    [
      shape,
      effectiveEasing,
      fromCenter,
      duration,
      isDark,
      isControlled,
      onThemeChange,
      cancelAnim,
    ],
  );

  return (
    <button
      ref={buttonRef}
      className={cn(className)}
      type="button"
      onClick={toggleTheme}
      {...props}
    >
      {isDark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
