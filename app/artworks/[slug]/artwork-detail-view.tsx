"use client";

import type { Artwork } from "@/types/artwork";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

import { Reveal } from "@/components/reveal";
import { ImmersiveHeroBackdrop } from "@/components/immersive-hero-backdrop";

export function ArtworkDetailView({
  artwork,
  prevArtwork,
  nextArtwork,
  index,
}: {
  artwork: Artwork;
  prevArtwork: Artwork;
  nextArtwork: Artwork;
  index: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <article className="relative flex flex-col pb-28">
      {/* Layer 1: Immersive Sticky Hero Backdrop */}
      <ImmersiveHeroBackdrop
        alt={artwork.image.alt}
        blurDataURL={artwork.image.blurDataURL}
        height={artwork.image.height}
        priority={true}
        src={artwork.image.url}
        width={artwork.image.width}
        onExpand={() => dialog.current?.showModal()}
      />

      {/* Layer 2: Floating Content Sheet */}
      <div className="relative z-10 -mt-[16vh] sm:-mt-[20vh] w-full px-0 sm:px-4">
        <div className="w-full sm:max-w-[540px] mx-auto rounded-t-3xl border-t sm:border-x border-border/60 bg-surface/85 backdrop-blur-2xl shadow-2xl p-5 sm:p-7 min-h-[60vh] flex flex-col gap-6">
          {/* Subtle Top Drag/Indicator Pill */}
          <div
            aria-hidden="true"
            className="w-10 h-1 rounded-full bg-foreground/15 mx-auto -mt-1 mb-1"
          />

          {/* Sheet Header Peek Area */}
          <header className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                تابلوی {(index + 1).toLocaleString("fa-IR")} از ۸
              </span>
              <span className="text-[11px] text-muted">
                مجموعه تابلوهای مصور
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-foreground">
              {artwork.title}
            </h1>
          </header>

          {/* Quick Section Navigation Links */}
          <nav
            aria-label="بخش‌های تابلو"
            className="flex items-center gap-4 border-b border-border/60 pb-2 text-xs font-medium"
          >
            {artwork.summary && artwork.summary.length > 0 && (
              <a
                className="min-h-[36px] flex items-center text-accent hover:underline"
                href="#summary"
              >
                خلاصه سناریو
              </a>
            )}
            <a
              className="min-h-[36px] flex items-center text-accent hover:underline"
              href="#full-text"
            >
              روایت و متن کامل
            </a>
            {artwork.video?.url && (
              <a
                className="min-h-[36px] flex items-center text-accent hover:underline"
                href="#video"
              >
                ویدیو
              </a>
            )}
          </nav>

          {/* Compressed Keywords / Scenario Summary */}
          {artwork.summary && artwork.summary.length > 0 && (
            <Reveal>
              <section
                className="bg-surface/70 border border-accent/40 rounded-2xl p-4 sm:p-5 shadow-2xs"
                id="summary"
              >
                <p className="text-xs font-bold text-accent mb-2.5 flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>کلید واژه‌های سناریو</span>
                </p>
                <div className="flex flex-col gap-2">
                  {artwork.summary.map((s) => (
                    <div
                      key={s}
                      className="relative pe-0 ps-4 text-xs leading-relaxed text-foreground/90"
                    >
                      <span className="absolute right-0 top-1.5 w-2 h-1 rounded-full bg-accent" />
                      {s}
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* Full Text / Narrative */}
          <section className="pt-2" id="full-text">
            <h2 className="text-base font-bold text-foreground mb-4 border-b border-border/70 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              توضیحات و متن راوی
            </h2>
            <div className="space-y-4 text-[15px] leading-[2] text-foreground/90">
              {artwork.description.split("\n\n").map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          {/* Video Section if available */}
          {artwork.video?.url && (
            <Reveal media>
              <section className="pt-2 flex flex-col gap-3" id="video">
                <h2 className="text-base font-bold text-foreground">
                  ویدیوی مرور
                </h2>
                {artwork.video.duration && (
                  <p className="text-xs text-muted">
                    مرور تصویری · {artwork.video.duration}
                  </p>
                )}
                <video
                  controls
                  playsInline
                  aria-label={"ویدیوی مرور " + artwork.title}
                  className="w-full max-h-[480px] aspect-[4/5] object-cover bg-surface rounded-2xl border border-border"
                  poster={artwork.image.url}
                  preload="none"
                  onError={() => setVideoFailed(true)}
                >
                  <source src={artwork.video.url} type="video/mp4" />
                  <track
                    kind="captions"
                    label="فارسی"
                    src={artwork.video.url.replace(".mp4", ".vtt")}
                    srcLang="fa"
                  />
                </video>
                {videoFailed && (
                  <p className="text-xs text-danger" role="alert">
                    ویدیو بارگذاری نشد.{" "}
                    <a
                      className="underline hover:no-underline font-medium"
                      href={artwork.video.url}
                    >
                      باز کردن فایل ویدیو
                    </a>
                  </p>
                )}
              </section>
            </Reveal>
          )}
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <nav
        aria-label="مرور تابلوها"
        className="fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-t border-border py-2.5 px-4 pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
      >
        <div className="max-w-[480px] mx-auto flex items-center justify-between gap-3 text-xs">
          <Link
            className="flex flex-col gap-0.5 text-foreground hover:text-accent transition-colors"
            href={"/artworks/" + prevArtwork.slug}
          >
            <small className="text-[10px] text-muted">تابلوی قبلی</small>
            <span className="font-semibold truncate max-w-[120px]">
              → {prevArtwork.title}
            </span>
          </Link>
          <Link
            className="text-[11px] text-muted hover:text-accent px-3 py-1.5 rounded-md bg-surface border border-border transition-colors shrink-0"
            href="/"
          >
            فهرست تابلوها
          </Link>
          <Link
            className="flex flex-col gap-0.5 text-left text-accent hover:underline transition-colors"
            href={"/artworks/" + nextArtwork.slug}
          >
            <small className="text-[10px] text-muted">تابلوی بعدی</small>
            <span className="font-semibold truncate max-w-[120px]">
              {nextArtwork.title} ←
            </span>
          </Link>
        </div>
      </nav>

      {/* Zoom Lightbox Dialog */}
      <dialog
        ref={dialog}
        aria-label={artwork.title}
        className="m-auto backdrop:bg-black/85 bg-background text-foreground p-4 border border-border rounded-2xl max-w-[95vw] max-h-[95dvh] shadow-2xl"
      >
        <div className="flex justify-end mb-2">
          <Button
            className="min-h-[36px] rounded-lg text-xs"
            variant="secondary"
            onPress={() => dialog.current?.close()}
          >
            بستن تصویر
          </Button>
        </div>
        <Image
          alt={artwork.image.alt}
          blurDataURL={artwork.image.blurDataURL}
          className="block w-full max-w-[85vw] h-auto max-h-[75dvh] object-contain rounded-lg"
          height={artwork.image.height}
          placeholder={artwork.image.blurDataURL ? "blur" : "empty"}
          src={artwork.image.zoomUrl || artwork.image.url}
          width={artwork.image.width}
        />
      </dialog>
    </article>
  );
}
