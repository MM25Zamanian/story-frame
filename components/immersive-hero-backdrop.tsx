"use client";

import type { CSSProperties } from "react";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";

import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ExpandIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface ImmersiveHeroBackdropProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  onExpand?: () => void;
  className?: string;
  priority?: boolean;
}

export function ImmersiveHeroBackdrop({
  src,
  alt,
  width,
  height,
  blurDataURL,
  onExpand,
  className,
  priority = true,
}: ImmersiveHeroBackdropProps) {
  // Bi-lateral mask: feathers left & right edges so image dissolves smoothly into page background
  const lateralMaskStyle: CSSProperties = {
    maskImage:
      "linear-gradient(to right, transparent, black 5%, black 95%, transparent), linear-gradient(to bottom, black 55%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 5%, black 95%, transparent), linear-gradient(to bottom, black 55%, transparent 100%)",
    maskComposite: "intersect",
    WebkitMaskComposite: "source-in",
  };

  return (
    <div
      aria-label={alt}
      className={cn(
        "sticky top-0 z-0 w-full h-[62vh] sm:h-[68vh] overflow-hidden select-none pointer-events-none",
        className,
      )}
      role="region"
    >
      {/* Zoom / Lightbox Trigger Button */}
      {onExpand && (
        <div className="absolute top-20 left-4 sm:left-6 z-30 pointer-events-auto">
          <Button
            isIconOnly
            aria-label="بزرگ‌نمایی اثر هنری"
            className="w-10 h-10 min-w-10 rounded-full bg-background/80 hover:bg-background backdrop-blur-xl border border-border/80 text-foreground shadow-sm flex items-center justify-center p-0 transition-transform active:scale-95 cursor-pointer"
            size="sm"
            variant="outline"
            onPress={onExpand}
          >
            <ExpandIcon size={18} />
          </Button>
        </div>
      )}

      {/* Main Artwork with Edge Feathering */}
      <div className="relative w-full h-full" style={lateralMaskStyle}>
        <Image
          fill
          alt={alt}
          blurDataURL={blurDataURL}
          className="w-full h-full object-cover object-center"
          placeholder={blurDataURL ? "blur" : "empty"}
          priority={priority}
          sizes="100vw"
          src={src}
        />

        {/* Ambient Top Shadow behind SiteHeader */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/70 via-background/25 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Multi-Stage Progressive Blur */}
      <ProgressiveBlur
        blurLevels={[1, 2, 6, 12, 24]}
        className="pointer-events-none z-10"
        height="45%"
        position="bottom"
      />

      {/* Bottom Dissolve Gradient blending directly into --background */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-10" />
    </div>
  );
}
