"use client";

import React, { useState } from "react";

import { CopyIcon, CheckIcon } from "@/components/icons";

interface HadithProps {
  speaker?: string;
  source?: string;
  arabic: string;
  translation: string;
  className?: string;
}

export function Hadith({
  speaker,
  source,
  arabic,
  translation,
  className = "",
}: HadithProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `${speaker ? `[${speaker}]: ` : ""}${arabic}\n\n${translation}${source ? `\n(منبع: ${source})` : ""}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback if clipboard api fails
    }
  };

  return (
    <figure
      className={`my-6 rounded-2xl border border-accent/25 bg-accent/5 dark:bg-accent/10 p-4 sm:p-5 shadow-xs transition-colors hover:border-accent/40 ${className}`}
    >
      {/* Header with speaker, source and copy button */}
      <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 text-xs border-b border-accent/15">
        <div className="flex flex-wrap items-center gap-2">
          {speaker && (
            <span className="inline-flex items-center gap-1.5 font-bold text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/25">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {speaker}
            </span>
          )}
          {source && (
            <span className="text-[11px] text-muted">منبع: {source}</span>
          )}
        </div>

        <button
          aria-label="کپی متن و ترجمه"
          className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-accent bg-background/80 hover:bg-background px-2 py-1 rounded-md border border-border transition-colors cursor-pointer"
          type="button"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <CheckIcon className="text-success" size={13} />
              <span className="text-success font-medium">کپی شد</span>
            </>
          ) : (
            <>
              <CopyIcon size={13} />
              <span>کپی</span>
            </>
          )}
        </button>
      </div>

      {/* Arabic text - Styled in bold deep tone harmonized with card's accent background */}
      <blockquote className="font-arabic font-semibold text-lg sm:text-xl leading-[2.3] sm:leading-[2.5] text-accent text-right px-1 select-text">
        «{arabic}»
      </blockquote>

      {/* Persian Translation directly beneath without dividing line or 'ترجمه:' label */}
      <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-foreground/85 font-sans select-text">
        {translation}
      </p>
    </figure>
  );
}

export function QuranVerse({
  surah,
  ayah,
  verse,
  arabic,
  translation,
}: {
  surah?: string;
  ayah?: number | string;
  verse?: number | string;
  arabic: string;
  translation: string;
}) {
  const rawAyah =
    ayah !== undefined && ayah !== null && String(ayah).trim() !== ""
      ? String(ayah).trim()
      : verse !== undefined && verse !== null && String(verse).trim() !== ""
        ? String(verse).trim()
        : "";

  const speakerLabel = surah
    ? `قرآن کریم — سوره ${surah}${rawAyah ? `، آیه ${rawAyah}` : ""}`
    : "قرآن کریم";

  return (
    <Hadith arabic={arabic} speaker={speakerLabel} translation={translation} />
  );
}
