"use client";

import type { PlayerSrc } from "@vidstack/react";
import type { DefaultLayoutTranslations } from "@vidstack/react/player/layouts/default";
import type { ProgramVideo } from "@/types/program";

import React from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import { cn } from "@/lib/utils";

// Persian translations dictionary for Vidstack player
const farsiTranslations: Partial<DefaultLayoutTranslations> = {
  Play: "پخش",
  Pause: "توقف",
  Settings: "تنظیمات",
  Speed: "سرعت پخش",
  Normal: "عادی",
  Quality: "کیفیت",
  Auto: "خودکار",
  "Enter Fullscreen": "تمام‌صفحه",
  "Exit Fullscreen": "خروج از تمام‌صفحه",
  "Enter PiP": "تصویر در تصویر",
  "Exit PiP": "خروج از تصویر در تصویر",
  Mute: "بی‌صدا",
  Unmute: "وصل صدا",
  Volume: "بلندی صدا",
  "Seek Forward": "۱۰ ثانیه بعد",
  "Seek Backward": "۱۰ ثانیه قبل",
  Seek: "پیمایش زمان",
  Playback: "پخش",
  Loop: "تکرار خودکار",
  Disabled: "غیرفعال",
  Default: "پیش‌فرض",
  Accessibility: "دسترسی‌پذیری",
  "Keyboard Animations": "پویانمایی کلیدها",
  Announcements: "اعلان‌های صوتی",
  Audio: "صدا",
  Captions: "زیرنویس",
  "Caption Styles": "سبک زیرنویس",
  "Captions look like this": "پیش‌نمایش زیرنویس",
  "Closed-Captions Off": "خاموش کردن زیرنویس",
  "Closed-Captions On": "روشن کردن زیرنویس",
  Chapters: "بخش‌ها",
  Download: "دانلود",
  Fullscreen: "تمام‌صفحه",
  "Google Cast": "ارسال به نمایشگر",
  AirPlay: "پخش با AirPlay",
  Replay: "پخش مجدد",
  Reset: "بازنشانی",
  Continue: "ادامه",
  Boost: "تقویت صدا",
  Color: "رنگ",
  Opacity: "شفافیت",
  Font: "قلم",
  Family: "خانواده قلم",
  Size: "اندازه",
  Shadow: "سایه",
  Text: "متن",
  "Text Background": "پس‌زمینه متن",
  "Display Background": "پس‌زمینه نمایش",
  Track: "ترک صوتی",
  Connected: "متصل شد",
  Connecting: "در حال اتصال...",
  Disconnected: "قطع شد",
  LIVE: "پخش زنده",
  "Skip To Live": "رفتن به پخش زنده",
  Off: "خاموش",
};

export interface VideoPlayerProps {
  video: ProgramVideo;
  posterUrl?: string;
  title?: string;
  className?: string;
}

export function VideoPlayer({
  video,
  posterUrl,
  title,
  className,
}: VideoPlayerProps) {
  const displayTitle = video.title || title || "مستند تصویری";
  const poster = video.poster || posterUrl;

  // Format sources for Vidstack Player
  const sources: PlayerSrc =
    video.sources && video.sources.length > 0
      ? video.sources.map((s) => ({
          src: s.src,
          type: "video/mp4",
          codec: s.type.includes("hvc1")
            ? "hvc1"
            : s.type.includes("avc1")
              ? "avc1"
              : undefined,
        }))
      : video.url || "";

  const isPortrait =
    video.aspectRatio === "3/4" || video.aspectRatio === "portrait";

  return (
    <section
      aria-label={displayTitle}
      className={cn("w-full flex flex-col gap-3", className)}
    >
      {/* Top Header Row with Title and Duration */}
      <div className="flex items-center justify-between pb-2 border-b border-border/70">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          <h2 className="text-sm sm:text-base font-bold text-foreground truncate">
            {displayTitle}
          </h2>
        </div>

        {video.duration && (
          <span className="text-xs text-muted font-mono shrink-0 tabular-nums bg-surface px-2 py-0.5 rounded-md border border-border/80">
            {video.duration}
          </span>
        )}
      </div>

      {/* Vidstack Player Container */}
      <div
        className={cn(
          "relative w-full bg-neutral-950 overflow-hidden rounded-2xl border border-border shadow-md",
          isPortrait
            ? "aspect-[3/4] max-h-[480px] sm:max-h-[540px] mx-auto"
            : "aspect-video",
        )}
      >
        <MediaPlayer
          playsInline
          className="w-full h-full object-contain"
          preload="metadata"
          src={sources}
          title={displayTitle}
        >
          <MediaProvider>
            {poster && (
              <Poster
                alt={displayTitle}
                className="vds-poster object-cover"
                src={poster}
              />
            )}
          </MediaProvider>

          <DefaultVideoLayout
            icons={defaultLayoutIcons}
            noAudioGain={true}
            slots={{
              airPlayButton: null,
              googleCastButton: null,
              downloadButton: null,
              captionButton: null,
            }}
            smallLayoutWhen={({ width }) => width < 576}
            translations={farsiTranslations}
          />
        </MediaPlayer>
      </div>

      {/* Video Colophon */}
      <div className="flex items-center justify-between text-[11px] text-muted font-mono pt-1">
        <span>پخش جریانی با بهینه‌سازی دوگانه HEVC و H.264 Fallback</span>
        <span className="hidden sm:inline">
          {isPortrait ? "کیفیت استودیویی HD" : "کیفیت استودیویی ۱۰۸۰p"}
        </span>
      </div>
    </section>
  );
}
