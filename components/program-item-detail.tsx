"use client";

import type { ProgramItem } from "@/types/program";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

import { ProgressiveBlur } from "./ui/progressive-blur";

import { Reveal } from "@/components/reveal";
import { ExpandIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Subcomponent: 4:3 Sticky Hero Artwork (Pure, No Blur, No Gradients)        */
/* -------------------------------------------------------------------------- */
function ProgramItemHero({
  image,
  title,
  onExpand,
}: {
  image: NonNullable<ProgramItem["image"]>;
  title: string;
  onExpand: () => void;
}) {
  return (
    <div className="sticky top-0 z-0 w-full sm:max-w-135 mx-auto aspect-4/3 bg-surface overflow-hidden select-none">
      <button
        aria-label="بزرگ‌نمایی اثر هنری"
        className="relative block w-full h-full cursor-zoom-in text-start focus:outline-hidden"
        type="button"
        onClick={onExpand}
      >
        <Image
          fill
          priority
          alt={image.alt || title}
          blurDataURL={image.blurDataURL}
          className="w-full h-full object-cover object-center"
          placeholder={image.blurDataURL ? "blur" : "empty"}
          sizes="(max-width: 640px) 100vw, 540px"
          src={image.url}
        />
      </button>

      <div className="absolute inset-0 z-20 bg-radial from-transparent dark:to-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/10 z-20 bg-linear-180 from-transparent dark:to-transparent to-background/30" />

      <ProgressiveBlur height="30%" position="top" />
      <ProgressiveBlur height="30%" position="bottom" />

      {/* Accessible Expand / Lightbox Trigger */}
      <div className="absolute bottom-3 inset-s-3 z-30 pointer-events-auto">
        <Button
          isIconOnly
          aria-label="بزرگ‌نمایی تصویر"
          className="w-9 h-9 min-w-9 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-border/80 text-foreground shadow-xs flex items-center justify-center p-0 transition-transform active:scale-95 cursor-pointer"
          size="sm"
          variant="outline"
          onPress={onExpand}
        >
          <ExpandIcon size={16} />
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Header & Index Eyebrow Badge                                */
/* -------------------------------------------------------------------------- */
function ProgramItemHeader({
  title,
  index,
  totalItems,
}: {
  title: string;
  index: number;
  totalItems: number;
}) {
  return (
    <header className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
          تابلوی {(index + 1).toLocaleString("fa-IR")} از{" "}
          {totalItems.toLocaleString("fa-IR")}
        </span>
        <span className="text-[11px] text-muted">مجموعه تابلوهای مصور</span>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-foreground">
        {title}
      </h1>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Section Anchor Navigation Links                              */
/* -------------------------------------------------------------------------- */
function ProgramItemSectionNav({
  hasSummary,
  hasVideo,
}: {
  hasSummary: boolean;
  hasVideo: boolean;
}) {
  return (
    <nav
      aria-label="بخش‌های تابلو"
      className="flex items-center gap-4 border-b border-border/60 pb-2 text-xs font-medium"
    >
      {hasSummary && (
        <a
          className="min-h-[36px] flex items-center text-accent hover:underline"
          href="#summary"
        >
          کلیدواژه‌ها
        </a>
      )}
      <a
        className="min-h-[36px] flex items-center text-accent hover:underline"
        href="#full-text"
      >
        روایت و متن سناریو
      </a>
      {hasVideo && (
        <a
          className="min-h-[36px] flex items-center text-accent hover:underline"
          href="#video"
        >
          ویدیو
        </a>
      )}
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Scenario Keywords / Summary Pill Card                       */
/* -------------------------------------------------------------------------- */
function ProgramItemSummary({ summary }: { summary: string[] }) {
  return (
    <Reveal>
      <section
        className="bg-surface/70 border border-accent/40 rounded-2xl p-4 sm:p-5 shadow-2xs"
        id="summary"
      >
        <p className="text-xs font-bold text-accent mb-2.5 flex items-center gap-1.5">
          <span>⚡</span>
          <span>کلیدواژه‌های فشرده سناریو</span>
        </p>
        <div className="flex flex-col gap-2">
          {summary.map((s) => (
            <div
              key={s}
              className="relative pe-0 ps-4 text-xs leading-relaxed text-foreground/90"
            >
              <span className="absolute start-0 top-1.5 w-2 h-1 rounded-full bg-accent" />
              {s}
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Video Review Section                                        */
/* -------------------------------------------------------------------------- */
function ProgramItemVideo({
  video,
  posterUrl,
  videoFailed,
  onError,
  title,
}: {
  video: NonNullable<ProgramItem["video"]>;
  posterUrl?: string;
  videoFailed: boolean;
  onError: () => void;
  title: string;
}) {
  return (
    <Reveal media>
      <section className="pt-2 flex flex-col gap-3" id="video">
        <h2 className="text-base font-bold text-foreground">ویدیوی مرور</h2>
        {video.duration && (
          <p className="text-xs text-muted">مرور تصویری · {video.duration}</p>
        )}
        <video
          controls
          playsInline
          aria-label={"ویدیوی مرور " + title}
          className="w-full max-h-[480px] aspect-[4/5] object-cover bg-surface rounded-2xl border border-border"
          poster={posterUrl}
          preload="none"
          onError={onError}
        >
          <source src={video.url} type="video/mp4" />
          <track kind="captions" label="فارسی" srcLang="fa" />
        </video>
        {videoFailed && (
          <p className="text-xs text-danger" role="alert">
            ویدیو بارگذاری نشد.{" "}
            <a
              className="underline hover:no-underline font-medium"
              href={video.url}
            >
              باز کردن فایل ویدیو
            </a>
          </p>
        )}
      </section>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Floating Bottom Prev / Next Navigation                       */
/* -------------------------------------------------------------------------- */
function ProgramItemBottomNav({
  prevItem,
  nextItem,
  programSlug,
}: {
  prevItem?: ProgramItem;
  nextItem?: ProgramItem;
  programSlug: string;
}) {
  return (
    <nav
      aria-label="مرور تابلوها"
      className="fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-t border-border py-2.5 px-4 pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
    >
      <div className="max-w-[480px] mx-auto flex items-center justify-between gap-3 text-xs">
        {prevItem ? (
          <Link
            className="flex flex-col gap-0.5 text-foreground hover:text-accent transition-colors text-start"
            href={`/${programSlug}/${prevItem.slug}`}
          >
            <small className="text-[10px] text-muted">تابلوی قبلی</small>
            <span className="font-semibold truncate max-w-[120px]">
              → {prevItem.title}
            </span>
          </Link>
        ) : (
          <div className="w-16" />
        )}

        <Link
          className="text-[11px] text-muted hover:text-accent px-3 py-1.5 rounded-md bg-surface border border-border transition-colors shrink-0"
          href={`/${programSlug}`}
        >
          فهرست تابلوها
        </Link>

        {nextItem ? (
          <Link
            className="flex flex-col gap-0.5 text-end text-accent hover:underline transition-colors"
            href={`/${programSlug}/${nextItem.slug}`}
          >
            <small className="text-[10px] text-muted">تابلوی بعدی</small>
            <span className="font-semibold truncate max-w-[120px]">
              {nextItem.title} ←
            </span>
          </Link>
        ) : (
          <div className="w-16" />
        )}
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Lightbox Modal Dialog                                        */
/* -------------------------------------------------------------------------- */
function ProgramItemLightbox({
  dialogRef,
  image,
  title,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  image: NonNullable<ProgramItem["image"]>;
  title: string;
}) {
  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      className="m-auto backdrop:bg-black/85 bg-background text-foreground p-4 border border-border rounded-2xl max-w-[95vw] max-h-[95dvh] shadow-2xl"
    >
      <div className="flex justify-end mb-2">
        <Button
          className="min-h-[36px] rounded-lg text-xs"
          variant="secondary"
          onPress={() => dialogRef.current?.close()}
        >
          بستن تصویر
        </Button>
      </div>
      <Image
        alt={image.alt || title}
        blurDataURL={image.blurDataURL}
        className="block w-full max-w-[85vw] h-auto max-h-[75dvh] object-contain rounded-lg"
        height={image.height || 900}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        src={image.url}
        width={image.width || 1200}
      />
    </dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Exported View: ProgramItemDetailView                                  */
/* -------------------------------------------------------------------------- */
export function ProgramItemDetailView({
  item,
  prevItem,
  nextItem,
  index,
  totalItems,
  programSlug,
  children,
}: {
  item: ProgramItem;
  prevItem?: ProgramItem;
  nextItem?: ProgramItem;
  index: number;
  totalItems: number;
  programSlug: string;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasImage = Boolean(item.image?.url);

  return (
    <article
      className={cn(
        "relative flex flex-col pb-28",
        hasImage ? "-mt-16" : "pt-4",
      )}
    >
      {/* 4:3 Hero Artwork (Stuck to top even at scrollY=0, header over it) */}
      {item.image && (
        <ProgramItemHero
          image={item.image}
          title={item.title}
          onExpand={() => dialog.current?.showModal()}
        />
      )}

      {/* Main Content Area - Solid surface smoothly scrolling over hero artwork */}
      <div className="relative z-10 w-full sm:max-w-[540px] mx-auto bg-background px-4 sm:px-6 py-6 flex flex-col gap-6">
        <ProgramItemHeader
          index={index}
          title={item.title}
          totalItems={totalItems}
        />

        <ProgramItemSectionNav
          hasSummary={Boolean(item.summary && item.summary.length > 0)}
          hasVideo={Boolean(item.video?.url)}
        />

        {item.summary && item.summary.length > 0 && (
          <ProgramItemSummary summary={item.summary} />
        )}

        {/* Scenario MDX Full Text */}
        <section className="pt-2" id="full-text">
          <h2 className="text-base font-bold text-foreground mb-4 border-b border-border/70 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            توضیحات و متن سناریو
          </h2>
          <div className="space-y-4">{children}</div>
        </section>

        {/* Video Section if available */}
        {item.video?.url && (
          <ProgramItemVideo
            posterUrl={item.image?.url}
            title={item.title}
            video={item.video}
            videoFailed={videoFailed}
            onError={() => setVideoFailed(true)}
          />
        )}
      </div>

      {/* Floating Bottom Navigation */}
      <ProgramItemBottomNav
        nextItem={nextItem}
        prevItem={prevItem}
        programSlug={programSlug}
      />

      {/* High-Resolution Zoom Lightbox Dialog */}
      {item.image && (
        <ProgramItemLightbox
          dialogRef={dialog}
          image={item.image}
          title={item.title}
        />
      )}
    </article>
  );
}
