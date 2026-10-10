"use client";
import type { Artwork } from "@/types/artwork";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@heroui/react";

import { Reveal } from "@/components/reveal";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { ExpandIcon } from "@/components/icons";

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
  const [failed, setFailed] = useState(false);

  return (
    <article className="flex flex-col">
      <div className="flex flex-col gap-6">
        <Reveal entrance media>
          <figure className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <Image
              priority
              alt={artwork.image.alt}
              blurDataURL={artwork.image.blurDataURL}
              className="w-full h-auto object-cover"
              height={artwork.image.height}
              placeholder={artwork.image.blurDataURL ? "blur" : "empty"}
              sizes="(max-width: 520px) 100vw, 480px"
              src={artwork.image.url}
              width={artwork.image.width}
            />

            {/* Top-Left Blur Layer & Zoom Icon Trigger */}
            {/* <ProgressiveBlur
              className="pointer-events-none"
              height="28%"
              position="top"
            /> */}

            <div className="absolute top-3 left-3 z-20">
              <Button
                aria-label="بزرگ‌نمایی تصویر"
                className="w-10 h-10 min-w-10 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-border text-foreground shadow-sm flex items-center justify-center p-0 transition-transform active:scale-95 cursor-pointer"
                size="sm"
                variant="tertiary"
                onPress={() => dialog.current?.showModal()}
              >
                <ExpandIcon size={18} />
              </Button>
            </div>

            {/* Bottom-Right Blur Layer & Artwork Title */}
            <ProgressiveBlur
              blurLevels={[1, 2, 8, 16]}
              className="pointer-events-none"
              height="50%"
              position="bottom"
            />

            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-tl from-foreground/50 to-50% to-transparent pointer-events-none" />

            <div className="absolute inset-x-0 bottom-0 z-20 pt-10 pb-4 px-4 text-right">
              <p className="text-sm font-black text-background mb-1 opacity-80">
                تابلوی {(index + 1).toLocaleString("fa-IR")} از ۸
              </p>
              <h1 className="text-xl font-bold leading-tight text-background">
                {artwork.title}
              </h1>
            </div>
          </figure>
        </Reveal>

        <div className="flex flex-col gap-6">
          <nav
            aria-label="بخش‌های تابلو"
            className="flex items-center gap-4 border-b border-border pb-2 text-xs font-medium"
          >
            <a
              className="min-h-[36px] flex items-center text-accent hover:underline"
              href="#summary"
            >
              خلاصه سناریو
            </a>
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

          <Reveal>
            <section
              className="bg-surface border border-accent rounded-xl p-5"
              id="summary"
            >
              <p className="text-xs font-semibold text-accent mb-2">
                کلید واژه های سناریو
              </p>
              <div className="flex flex-col gap-2">
                {artwork.summary.map((s) => (
                  <div key={s} className="relative pe-0 ps-4 text-xs">
                    <span className="absolute right-0 top-1.5 w-2 h-1 rounded-full bg-accent" />

                    {s}
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <section className="pt-2" id="full-text">
            <h2 className="text-base font-bold text-foreground mb-3">
              توضیحات و متن راوی
            </h2>
            <div className="space-y-4 text-[15px] leading-[2] text-foreground/90">
              {artwork.description.split("\n\n").map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

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
                  className="w-full max-h-[480px] aspect-[4/5] object-cover bg-surface rounded-xl border border-border"
                  poster={artwork.image.url}
                  preload="none"
                  onError={() => setFailed(true)}
                >
                  <source src={artwork.video.url} type="video/mp4" />
                  <track
                    kind="captions"
                    label="فارسی"
                    src={artwork.video.url.replace(".mp4", ".vtt")}
                    srcLang="fa"
                  />
                </video>
                {failed && (
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
            className="text-[11px] text-muted hover:text-accent px-2.5 py-1 rounded-md bg-surface transition-colors shrink-0"
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

      <dialog
        ref={dialog}
        aria-label={artwork.title}
        className="m-auto backdrop:bg-black/80 bg-background text-foreground p-4 border border-border rounded-2xl max-w-[95vw] max-h-[95dvh] shadow-2xl"
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
          src={artwork.image.url}
          width={artwork.image.width}
        />
      </dialog>
    </article>
  );
}
