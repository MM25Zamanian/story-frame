import Image from "next/image";
import Link from "next/link";

import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export function ArtworkCard({
  artwork,
  index,
  priority = false,
  programSlug,
}: {
  artwork: any;
  index: number;
  priority?: boolean;
  programSlug?: string;
}) {
  const targetHref = programSlug
    ? `/${programSlug}/${artwork.slug}`
    : `/artworks/${artwork.slug}`;

  const firstSummary =
    Array.isArray(artwork.summary) && artwork.summary.length > 0
      ? artwork.summary[0]
      : "";

  return (
    <Link
      className="group relative block w-full aspect-4/3 rounded-3xl overflow-hidden border border-border/60 bg-surface shadow-xs hover:border-accent/60 hover:shadow-md transition-all duration-300"
      href={targetHref}
    >
      {/* Background Cover Image with Hover Zoom */}
      <Image
        fill
        alt={artwork.image?.alt || artwork.title}
        blurDataURL={artwork.image?.blurDataURL}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        placeholder={artwork.image?.blurDataURL ? "blur" : "empty"}
        priority={priority}
        sizes="(max-width: 520px) 100vw, 480px"
        src={artwork.image?.url}
      />

      {/* Progressive Blur Layer */}

      <ProgressiveBlur height="70%" position="bottom" />

      {/* Scrim Gradient Layer */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-transparent pointer-events-none z-20" />

      {/* Overlaid Content at Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-white text-right z-30">
        {/* Title + Index Badge (Strictly Single Line, No Wrap) */}
        <div className="flex items-center gap-2 max-w-full">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight truncate whitespace-nowrap flex-1">
            {artwork.title}
          </h2>
          <span className="inline-flex items-center justify-center font-mono text-[11px] font-semibold text-white/95 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full shrink-0 border border-white/20">
            {(index + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
          </span>
        </div>

        {/* Subtitle / Scenario Summary (Strictly Single Line, No Wrap) */}
        {firstSummary && (
          <p className="text-xs sm:text-[13px] text-white/80 font-normal truncate whitespace-nowrap mt-1 leading-normal">
            {firstSummary}
          </p>
        )}

        {/* Bottom Row: Meta Stats on Right + CTA Pill on Left */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/15 text-xs">
          {/* Info stats */}
          <div className="flex items-center gap-3 text-white/80 text-[11px] truncate whitespace-nowrap">
            {artwork.summary?.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <span>📋</span>
                <span>
                  {artwork.summary.length.toLocaleString("fa-IR")} کلیدواژه
                </span>
              </span>
            )}
            {artwork.video?.url && (
              <span className="inline-flex items-center gap-1 text-white/90">
                <span>🎬</span>
                <span>ویدیو</span>
              </span>
            )}
          </div>

          {/* CTA Pill Button */}
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white text-black px-3.5 py-1.5 rounded-full shadow-xs group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200 shrink-0">
            <span>مشاهده</span>
            <span className="text-[13px] transition-transform duration-200 group-hover:-translate-x-0.5">
              ←
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
