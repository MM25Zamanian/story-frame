"use client";

import type { ProgramItem } from "@/types/program";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@heroui/react";

import { Reveal } from "@/components/reveal";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { ExpandIcon } from "@/components/icons";

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
  const [failed, setFailed] = useState(false);

  return (
    <article className="flex flex-col pb-16">
      <div className="flex flex-col gap-6">
        {item.image && (
          <Reveal entrance media>
            <figure className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
              <Image
                priority
                alt={item.image.alt}
                blurDataURL={item.image.blurDataURL}
                className="w-full h-auto object-cover"
                height={item.image.height}
                placeholder={item.image.blurDataURL ? "blur" : "empty"}
                sizes="(max-width: 520px) 100vw, 480px"
                src={item.image.url}
                width={item.image.width}
              />

              <div className="absolute top-3 left-3 z-20">
                <Button
                  aria-label="بزرگ‌نمایی تصویر"
                  className="w-10 h-10 min-w-10 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-border text-foreground shadow-xs flex items-center justify-center p-0 transition-transform active:scale-95 cursor-pointer"
                  size="sm"
                  variant="tertiary"
                  onPress={() => dialog.current?.showModal()}
                >
                  <ExpandIcon size={18} />
                </Button>
              </div>

              <ProgressiveBlur
                blurLevels={[1, 2, 8, 16]}
                className="pointer-events-none"
                height="50%"
                position="bottom"
              />

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-tl from-foreground/60 to-50% to-transparent pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 z-20 pt-10 pb-4 px-4 text-right">
                <p className="text-xs font-black text-background mb-1 opacity-90">
                  تابلوی {(index + 1).toLocaleString("fa-IR")} از{" "}
                  {totalItems.toLocaleString("fa-IR")}
                </p>
                <h1 className="text-lg sm:text-xl font-bold leading-tight text-background">
                  {item.title}
                </h1>
              </div>
            </figure>
          </Reveal>
        )}

        <div className="flex flex-col gap-6">
          <nav
            aria-label="بخش‌های تابلو"
            className="flex items-center gap-4 border-b border-border pb-2 text-xs font-medium"
          >
            <a
              className="min-h-[36px] flex items-center text-accent hover:underline"
              href="#summary"
            >
              کلیدواژه‌ها
            </a>
            <a
              className="min-h-[36px] flex items-center text-accent hover:underline"
              href="#full-text"
            >
              روایت و متن کامل
            </a>
            {item.video?.url && (
              <a
                className="min-h-[36px] flex items-center text-accent hover:underline"
                href="#video"
              >
                ویدیو
              </a>
            )}
          </nav>

          {item.summary && item.summary.length > 0 && (
            <Reveal>
              <section
                className="bg-surface/70 border border-accent/40 rounded-xl p-4 sm:p-5"
                id="summary"
              >
                <p className="text-xs font-bold text-accent mb-2.5">
                  کلیدواژه‌های فشرده سناریو
                </p>
                <div className="flex flex-col gap-2">
                  {item.summary.map((s) => (
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

          <section className="pt-2" id="full-text">
            <h2 className="text-base font-bold text-foreground mb-4 border-b border-border/70 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              توضیحات و متن سناریو
            </h2>
            <div className="space-y-4">{children}</div>
          </section>

          {item.video?.url && (
            <Reveal media>
              <section className="pt-2 flex flex-col gap-3" id="video">
                <h2 className="text-base font-bold text-foreground">
                  ویدیوی مرور
                </h2>
                {item.video.duration && (
                  <p className="text-xs text-muted">
                    مرور تصویری · {item.video.duration}
                  </p>
                )}
                <video
                  controls
                  playsInline
                  aria-label={"ویدیوی مرور " + item.title}
                  className="w-full max-h-[480px] aspect-[4/5] object-cover bg-surface rounded-xl border border-border"
                  poster={item.image?.url}
                  preload="none"
                  onError={() => setFailed(true)}
                >
                  <source src={item.video.url} type="video/mp4" />
                  <track kind="captions" label="فارسی" srcLang="fa" />
                </video>
                {failed && (
                  <p className="text-xs text-danger" role="alert">
                    ویدیو بارگذاری نشد.{" "}
                    <a
                      className="underline hover:no-underline font-medium"
                      href={item.video.url}
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

      {/* Floating Bottom Nav */}
      <nav
        aria-label="مرور تابلوها"
        className="fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-t border-border py-2.5 px-4 pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
      >
        <div className="max-w-[480px] mx-auto flex items-center justify-between gap-3 text-xs">
          {prevItem ? (
            <Link
              className="flex flex-col gap-0.5 text-foreground hover:text-accent transition-colors text-right"
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
              className="flex flex-col gap-0.5 text-left text-accent hover:underline transition-colors"
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

      {item.image && (
        <dialog
          ref={dialog}
          aria-label={item.title}
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
            alt={item.image.alt}
            blurDataURL={item.image.blurDataURL}
            className="block w-full max-w-[85vw] h-auto max-h-[75dvh] object-contain rounded-lg"
            height={item.image.height}
            placeholder={item.image.blurDataURL ? "blur" : "empty"}
            src={item.image.url}
            width={item.image.width}
          />
        </dialog>
      )}
    </article>
  );
}
