"use client";

import type { Program } from "@/types/program";

import React, { useState } from "react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";

export function StandaloneProgramView({
  program,
  children,
}: {
  program: Program;
  children: React.ReactNode;
}) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <article className="flex flex-col gap-6 pb-12">
      {/* Header section */}
      <Reveal entrance>
        <header className="flex flex-col gap-3 border-b border-border/80 pb-6">
          <div className="flex items-center justify-between gap-2">
            <Link
              className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
              href="/"
            >
              <span>← بازگشت به فهرست برنامه‌ها</span>
            </Link>
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
              {program.formatTitle} · {program.year}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-foreground">
              {program.title}
            </h1>
            {program.subtitle && (
              <p className="text-sm font-medium text-accent mt-1.5">
                {program.subtitle}
              </p>
            )}
            <p className="text-sm leading-relaxed text-muted mt-2">
              {program.description}
            </p>
          </div>
        </header>
      </Reveal>

      {/* Intro Video section if available */}
      {program.video?.url && (
        <Reveal media>
          <section
            className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/50 p-4"
            id="video"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span>📹</span>
                <span>{program.video.title || "ویدئوی معرفی نحوه اجرا"}</span>
              </h2>
              {program.video.duration && (
                <span className="text-xs text-muted font-mono">
                  {program.video.duration}
                </span>
              )}
            </div>

            <video
              controls
              playsInline
              aria-label={program.video.title}
              className="w-full aspect-video object-cover bg-background rounded-xl border border-border"
              poster={program.video.poster || program.coverImage?.url}
              preload="none"
              onError={() => setVideoFailed(true)}
            >
              <source src={program.video.url} type="video/mp4" />
              <track kind="captions" label="فارسی" srcLang="fa" />
            </video>

            {videoFailed && (
              <p className="text-xs text-danger" role="alert">
                ویدیو در دسترس نیست یا در حال بارگذاری است.
              </p>
            )}
          </section>
        </Reveal>
      )}

      {/* Compressed Keywords / Cheat-sheet for Execution */}
      {program.summary && program.summary.length > 0 && (
        <Reveal>
          <section
            className="rounded-2xl border border-accent/40 bg-surface/70 p-4 sm:p-5 shadow-xs"
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
              {program.summary.map((point, i) => (
                <div
                  key={point}
                  className="relative pe-0 ps-4 text-xs leading-relaxed text-foreground/90"
                >
                  <span className="absolute right-0 top-1.5 w-2 h-1 rounded-full bg-accent" />
                  <span className="font-semibold text-foreground/80 me-1">
                    {(i + 1).toLocaleString("fa-IR")}.
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* Main Narrative Script */}
      <section className="pt-2" id="full-script">
        {children}
      </section>

      {/* Bottom Back Button */}
      <div className="pt-8 border-t border-border/80 flex justify-center">
        <Link
          className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-surface hover:bg-accent hover:text-accent-foreground px-4 py-2.5 rounded-xl border border-border transition-colors"
          href="/"
        >
          <span>← مشاهده سایر برنامه‌ها و تابلوهای مصور</span>
        </Link>
      </div>
    </article>
  );
}
