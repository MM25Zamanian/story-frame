"use client";

import type { Program } from "@/types/program";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

import { Reveal } from "@/components/reveal";
import { ExpandIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Subcomponent: 4:3 Sticky Hero Artwork (Pure, No Blur, No Gradients)        */
/* -------------------------------------------------------------------------- */
function StandaloneHero({
  image,
  title,
  onExpand,
}: {
  image: NonNullable<Program["coverImage"]>;
  title: string;
  onExpand: () => void;
}) {
  return (
    <div className="sticky top-0 z-0 w-full sm:max-w-[540px] mx-auto aspect-[4/3] bg-surface overflow-hidden select-none">
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

      {/* Accessible Expand / Lightbox Trigger */}
      <div className="absolute bottom-3 start-3 z-10 pointer-events-auto">
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
/* Subcomponent: Program Header                                               */
/* -------------------------------------------------------------------------- */
function StandaloneHeader({
  title,
  subtitle,
  description,
  formatTitle,
  year,
}: {
  title: string;
  subtitle?: string;
  description: string;
  formatTitle: string;
  year: string;
}) {
  return (
    <header className="flex flex-col gap-3 border-b border-border/70 pb-5">
      <div className="flex items-center justify-between gap-2">
        <Link
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
          href="/"
        >
          <span>← بازگشت به فهرست برنامه‌ها</span>
        </Link>
        <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
          {formatTitle} · {year}
        </span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-medium text-accent mt-1.5">{subtitle}</p>
        )}
        <p className="text-sm leading-relaxed text-muted mt-2">{description}</p>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Section Anchor Navigation Links                              */
/* -------------------------------------------------------------------------- */
function StandaloneSectionNav({
  hasSummary,
  hasVideo,
}: {
  hasSummary: boolean;
  hasVideo: boolean;
}) {
  return (
    <nav
      aria-label="بخش‌های برنامه"
      className="flex items-center gap-4 border-b border-border/60 pb-2 text-xs font-medium"
    >
      {hasSummary && (
        <a
          className="min-h-[36px] flex items-center text-accent hover:underline"
          href="#summary-cheatsheet"
        >
          کلیدواژه‌های اجرا
        </a>
      )}
      <a
        className="min-h-[36px] flex items-center text-accent hover:underline"
        href="#full-script"
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
/* Subcomponent: Cheat-sheet / Summary Section                                */
/* -------------------------------------------------------------------------- */
function StandaloneSummary({ summary }: { summary: string[] }) {
  return (
    <Reveal>
      <section
        className="rounded-2xl border border-accent/40 bg-surface/70 p-4 sm:p-5 shadow-2xs"
        id="summary-cheatsheet"
      >
        <div className="flex items-center justify-between mb-3 border-b border-border/70 pb-2">
          <h2 className="text-xs font-bold text-accent flex items-center gap-1.5">
            <span>⚡</span>
            <span>سیر فشرده و کلیدواژه‌های اجرا</span>
          </h2>
          <span className="text-[10px] text-muted">راهنمای سریع صحنه</span>
        </div>

        <div className="flex flex-col gap-2">
          {summary.map((point, i) => (
            <div
              key={point}
              className="relative pe-0 ps-4 text-xs leading-relaxed text-foreground/90"
            >
              <span className="absolute start-0 top-1.5 w-2 h-1 rounded-full bg-accent" />
              <span className="font-semibold text-foreground/80 me-1">
                {(i + 1).toLocaleString("fa-IR")}.
              </span>
              {point}
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
function StandaloneVideo({
  video,
  posterUrl,
  videoFailed,
  onError,
}: {
  video: NonNullable<Program["video"]>;
  posterUrl?: string;
  videoFailed: boolean;
  onError: () => void;
}) {
  return (
    <Reveal media>
      <section
        className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/50 p-4"
        id="video"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <span>📹</span>
            <span>{video.title || "ویدئوی معرفی نحوه اجرا"}</span>
          </h2>
          {video.duration && (
            <span className="text-xs text-muted font-mono">
              {video.duration}
            </span>
          )}
        </div>

        <video
          controls
          playsInline
          aria-label={video.title || "ویدئوی معرفی"}
          className="w-full aspect-video object-cover bg-background rounded-xl border border-border"
          poster={video.poster || posterUrl}
          preload="none"
          onError={onError}
        >
          <source src={video.url} type="video/mp4" />
          <track kind="captions" label="فارسی" srcLang="fa" />
        </video>

        {videoFailed && (
          <p className="text-xs text-danger" role="alert">
            ویدیو در دسترس نیست یا در حال بارگذاری است.
          </p>
        )}
      </section>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponent: Lightbox Modal Dialog                                        */
/* -------------------------------------------------------------------------- */
function StandaloneLightbox({
  dialogRef,
  image,
  title,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  image: NonNullable<Program["coverImage"]>;
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
        src={image.zoomUrl || image.url}
        width={image.width || 1200}
      />
    </dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Exported View: StandaloneProgramView                                  */
/* -------------------------------------------------------------------------- */
export function StandaloneProgramView({
  program,
  children,
}: {
  program: Program;
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasImage = Boolean(program.coverImage?.url);

  return (
    <article
      className={cn(
        "relative flex flex-col pb-24",
        hasImage ? "-mt-16" : "pt-4",
      )}
    >
      {/* 4:3 Hero Artwork (Stuck to top even at scrollY=0, header over it) */}
      {program.coverImage && (
        <StandaloneHero
          image={program.coverImage}
          title={program.title}
          onExpand={() => dialog.current?.showModal()}
        />
      )}

      {/* Main Content Area - Solid surface smoothly scrolling over hero artwork */}
      <div className="relative z-10 w-full sm:max-w-[540px] mx-auto bg-background px-4 sm:px-6 py-6 flex flex-col gap-6">
        <StandaloneHeader
          description={program.description}
          formatTitle={program.formatTitle}
          subtitle={program.subtitle}
          title={program.title}
          year={program.year}
        />

        <StandaloneSectionNav
          hasSummary={Boolean(program.summary && program.summary.length > 0)}
          hasVideo={Boolean(program.video?.url)}
        />

        {/* Intro Video section if available */}
        {program.video?.url && (
          <StandaloneVideo
            posterUrl={program.coverImage?.url}
            video={program.video}
            videoFailed={videoFailed}
            onError={() => setVideoFailed(true)}
          />
        )}

        {/* Compressed Keywords / Cheat-sheet for Execution */}
        {program.summary && program.summary.length > 0 && (
          <StandaloneSummary summary={program.summary} />
        )}

        {/* Main Narrative Script */}
        <section className="pt-2" id="full-script">
          {children}
        </section>

        {/* Bottom Back Button */}
        <div className="pt-6 border-t border-border/80 flex justify-center">
          <Link
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-surface hover:bg-accent hover:text-accent-foreground px-4 py-2.5 rounded-xl border border-border transition-colors"
            href="/"
          >
            <span>← مشاهده سایر برنامه‌ها و تابلوهای مصور</span>
          </Link>
        </div>
      </div>

      {/* Lightbox Zoom Dialog for Cover Image */}
      {program.coverImage && (
        <StandaloneLightbox
          dialogRef={dialog}
          image={program.coverImage}
          title={program.title}
        />
      )}
    </article>
  );
}
