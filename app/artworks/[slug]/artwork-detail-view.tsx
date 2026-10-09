"use client";
import type { Artwork } from "@/types/artwork";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@heroui/react";

import { Reveal } from "@/components/reveal";
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
    <article className="detail-page">
      <div className="detail-heading">
        <p className="eyebrow">
          تابلوی {(index + 1).toLocaleString("fa-IR")} از ۸
        </p>
        <h1>{artwork.title}</h1>
      </div>
      <div className="detail-grid">
        <Reveal entrance media>
          <figure className="detail-figure">
            <Image
              priority
              alt={artwork.image.alt}
              height={artwork.image.height}
              sizes="(max-width:767px) 100vw, 50vw"
              src={artwork.image.url}
              width={artwork.image.width}
            />
            <Button
              variant="secondary"
              onPress={() => dialog.current?.showModal()}
            >
              بزرگ‌نمایی تصویر
            </Button>
          </figure>
        </Reveal>
        <div className="detail-copy">
          <nav aria-label="بخش‌های تابلو" className="section-links">
            <a href="#summary">خلاصه سناریو</a>
            <a href="#full-text">روایت و متن کامل</a>
            {artwork.video?.url && <a href="#video">ویدیو</a>}
          </nav>
          <Reveal>
            <section className="summary" id="summary">
              <p className="eyebrow">سیر سناریویی فوق‌فشرده</p>
              <h2>نکات کلیدی تابلو</h2>
              <ul>
                {artwork.summary.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          </Reveal>
          <section className="full-text" id="full-text">
            <h2>توضیحات و متن راوی</h2>
            {artwork.description.split("\n\n").map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
          {artwork.video?.url && (
            <Reveal media>
              <section className="video-section" id="video">
                <h2>ویدیوی مرور</h2>
                {artwork.video.duration && (
                  <p className="muted">
                    مرور تصویری · {artwork.video.duration}
                  </p>
                )}
                <video
                  controls
                  playsInline
                  aria-label={"ویدیوی مرور " + artwork.title}
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
                  <p role="alert">
                    ویدیو بارگذاری نشد.{" "}
                    <a href={artwork.video.url}>باز کردن فایل ویدیو</a>
                  </p>
                )}
              </section>
            </Reveal>
          )}
        </div>
      </div>
      <nav aria-label="مرور تابلوها" className="sequence-nav">
        <Link href={"/artworks/" + prevArtwork.slug}>
          <small>تابلوی قبلی</small>
          <span>→ {prevArtwork.title}</span>
        </Link>
        <Link className="all-tableaus" href="/">
          فهرست تابلوها
        </Link>
        <Link className="next-tableau" href={"/artworks/" + nextArtwork.slug}>
          <small>تابلوی بعدی</small>
          <span>{nextArtwork.title} ←</span>
        </Link>
      </nav>
      <dialog ref={dialog} aria-label={artwork.title} className="image-dialog">
        <Button variant="secondary" onPress={() => dialog.current?.close()}>
          بستن تصویر
        </Button>
        <Image
          alt={artwork.image.alt}
          height={artwork.image.height}
          src={artwork.image.url}
          width={artwork.image.width}
        />
      </dialog>
    </article>
  );
}
