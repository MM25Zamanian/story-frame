import type { ProgramDownloadItem } from "@/types/program";

import React from "react";

import { DownloadIcon, PdfFileIcon, PresentationFileIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface DownloadSectionProps {
  downloads?: ProgramDownloadItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function DownloadSection({
  downloads,
  title = "فایل‌ها و مستندات برنامه",
  subtitle = "نسخه‌های اصلی کتابچه و اسلایدهای ارائه برای مطالعه آفلاین یا بازنشر",
  className,
  id = "downloads",
}: DownloadSectionProps) {
  if (!downloads || downloads.length === 0) {
    return null;
  }

  return (
    <Reveal>
      <section
        className={cn(
          "rounded-2xl border border-border bg-surface/60 p-4 sm:p-5 shadow-2xs flex flex-col gap-4",
          className,
        )}
        id={id}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/70 pb-3">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="text-accent">📥</span>
              <span>{title}</span>
            </h2>
            {subtitle && (
              <p className="text-[11px] text-muted leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-[11px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
            {downloads.length.toLocaleString("fa-IR")} فایل پیوست
          </span>
        </div>

        {/* List of downloadable files */}
        <div className="flex flex-col gap-3">
          {downloads.map((item) => {
            const isPdf = item.format === "pdf";
            const isPptx = item.format === "pptx";

            return (
              <div
                key={item.id}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/80 bg-background/60 hover:bg-background hover:border-accent/40 transition-all duration-200"
              >
                {/* File Details */}
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 sm:mt-0 transition-colors",
                      isPdf
                        ? "bg-danger-50 dark:bg-danger-950/40 border-danger-200 dark:border-danger-900/50 text-danger-600 dark:text-danger-400"
                        : isPptx
                          ? "bg-warning-50 dark:bg-warning-950/40 border-warning-200 dark:border-warning-900/50 text-warning-600 dark:text-warning-400"
                          : "bg-surface-secondary border-border text-foreground",
                    )}
                  >
                    {isPdf ? (
                      <PdfFileIcon size={20} />
                    ) : isPptx ? (
                      <PresentationFileIcon size={20} />
                    ) : (
                      <DownloadIcon size={18} />
                    )}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-foreground truncate group-hover:text-accent transition-colors">
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded border",
                          isPdf
                            ? "bg-danger-100/50 dark:bg-danger-950/60 border-danger-200 dark:border-danger-800 text-danger-700 dark:text-danger-300"
                            : "bg-warning-100/50 dark:bg-warning-950/60 border-warning-200 dark:border-warning-800 text-warning-700 dark:text-warning-300",
                        )}
                      >
                        {item.format}
                      </span>
                    </div>

                    {item.subtitle && (
                      <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-muted font-mono mt-1">
                      {item.fileSize && <span>{item.fileSize}</span>}
                      {item.pageCount && (
                        <>
                          <span className="text-border">•</span>
                          <span>{item.pageCount}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Download CTA Link */}
                <div className="flex items-center justify-end sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                  <a
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 rounded-lg text-xs font-semibold text-foreground bg-surface hover:bg-accent hover:text-accent-foreground border border-border hover:border-accent transition-all active:scale-98 shadow-2xs cursor-pointer"
                    download={item.filename}
                    href={item.url}
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon size={14} />
                    <span>دریافت فایل</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
}
