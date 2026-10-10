"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import React from "react";

import { cn } from "@/lib/utils";

export interface ProgressiveBlurProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  className?: string;
  height?: string;
  width?: string;
  position?: "top" | "bottom" | "both" | "left" | "right";
  blurLevels?: number[];
  children?: ReactNode;
}

const DEFAULT_BLUR_LEVELS = [0.5, 1, 2, 4, 8, 16, 32, 64];

export function ProgressiveBlur({
  className,
  height = "30%",
  width,
  position = "bottom",
  blurLevels = DEFAULT_BLUR_LEVELS,
  children,
  style,
  ...props
}: ProgressiveBlurProps) {
  if (!blurLevels.length) {
    return null;
  }

  const isBoth = position === "both";
  const isHorizontal = position === "left" || position === "right";

  const containerStyle: CSSProperties = {
    ...(isBoth
      ? { height: "100%", width: "100%" }
      : isHorizontal
        ? { width: width ?? height, height: "100%" }
        : { height, width: "100%" }),
    ...style,
  };

  const positionClasses =
    position === "top"
      ? "inset-x-0 top-0"
      : position === "bottom"
        ? "inset-x-0 bottom-0"
        : position === "left"
          ? "inset-y-0 left-0"
          : position === "right"
            ? "inset-y-0 right-0"
            : "inset-0";

  const totalLevels = blurLevels.length;
  const step = 100 / totalLevels;

  const getGradientDirection = () => {
    switch (position) {
      case "top":
        return "to top";
      case "bottom":
        return "to bottom";
      case "left":
        return "to left";
      case "right":
        return "to right";
      default:
        return "";
    }
  };

  const getMask = (
    start: number,
    mid: number,
    end: number,
    endNext: number,
  ) => {
    if (isBoth) {
      return "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)";
    }

    const dir = getGradientDirection();

    return `linear-gradient(${dir}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${mid}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${endNext}%)`;
  };

  const getEdgeMask = (isLast: boolean) => {
    if (isBoth) {
      return "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)";
    }

    const dir = getGradientDirection();

    if (isLast) {
      const start = Math.max(0, 100 - step);

      return `linear-gradient(${dir}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) 100%)`;
    }

    return `linear-gradient(${dir}, rgba(0,0,0,0) 0%, rgba(0,0,0,1) ${step}%, rgba(0,0,0,1) ${step * 2}%, rgba(0,0,0,0) ${step * 3}%)`;
  };

  const middleCount = Math.max(0, totalLevels - 2);
  const middleElements = Array.from({ length: middleCount });

  const firstMask = getEdgeMask(false);
  const lastMask = getEdgeMask(true);

  return (
    <div
      aria-hidden={children ? undefined : "true"}
      className={cn(
        "gradient-blur pointer-events-none absolute z-10",
        positionClasses,
        className,
      )}
      style={containerStyle}
      {...props}
    >
      {/* First blur layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 1,
          backdropFilter: `blur(${blurLevels[0]}px)`,
          WebkitBackdropFilter: `blur(${blurLevels[0]}px)`,
          maskImage: firstMask,
          WebkitMaskImage: firstMask,
        }}
      />

      {/* Middle blur layers */}
      {middleElements.map((_, index) => {
        const blurIndex = index + 1;
        const startPercent = blurIndex * step;
        const midPercent = (blurIndex + 1) * step;
        const endPercent = (blurIndex + 2) * step;
        const endNextPercent = (blurIndex + 3) * step;
        const mask = getMask(
          startPercent,
          midPercent,
          endPercent,
          endNextPercent,
        );

        return (
          <div
            key={`blur-layer-${index}`}
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              zIndex: index + 2,
              backdropFilter: `blur(${blurLevels[blurIndex]}px)`,
              WebkitBackdropFilter: `blur(${blurLevels[blurIndex]}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}

      {/* Last blur layer */}
      {totalLevels > 1 && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            zIndex: totalLevels,
            backdropFilter: `blur(${blurLevels[totalLevels - 1]}px)`,
            WebkitBackdropFilter: `blur(${blurLevels[totalLevels - 1]}px)`,
            maskImage: lastMask,
            WebkitMaskImage: lastMask,
          }}
        />
      )}

      {children && (
        <div className="relative z-20 pointer-events-auto h-full w-full">
          {children}
        </div>
      )}
    </div>
  );
}
