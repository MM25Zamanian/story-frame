import React from "react";

import { Hadith, QuranVerse } from "./hadith";
import {
  ActionCue,
  ToneCue,
  DramaticPause,
  AudienceInteraction,
  Speech,
} from "./stage-cue";

import { DownloadSection } from "@/components/download-section";
import { VideoPlayer } from "@/components/video-player";

export function BoothVideo() {
  const videoData = {
    title: "مستند تصویری و راهنمای اجرای غرفه‌ای فاطمیه",
    duration: "۵ دقیقه و ۳۴ ثانیه",
    poster: "/assets/booth-1403/cover.webp",
    sources: [
      {
        src: "/assets/booth-1403/1405-07-26_15.11.55_optimized_hevc.mp4",
        type: 'video/mp4; codecs="hvc1"',
        quality: "1080p HEVC",
      },
      {
        src: "/assets/booth-1403/1405-07-26_15.11.55_optimized_web_720p.mp4",
        type: 'video/mp4; codecs="avc1"',
        quality: "720p Web",
      },
    ],
    url: "/assets/booth-1403/1405-07-26_15.11.55_optimized_web_720p.mp4",
  };

  return (
    <div className="my-8 not-prose" id="video">
      <VideoPlayer
        posterUrl={videoData.poster}
        title={videoData.title}
        video={videoData}
      />
    </div>
  );
}

export const narrativeMDXComponents = {
  // Custom Specialized Domain Components
  Hadith,
  QuranVerse,
  ActionCue,
  StageCue: ActionCue,
  ToneCue,
  DramaticPause,
  Pause: DramaticPause,
  AudienceInteraction,
  Speech,
  DownloadSection,
  DownloadFiles: DownloadSection,
  BoothVideo,
  ProgramVideo: BoothVideo,
  VideoPlayer: BoothVideo,

  // Semantic Typography Enhancements
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-xl sm:text-2xl font-bold text-foreground mt-8 mb-4 leading-snug border-b border-border pb-2"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-lg sm:text-xl font-bold text-foreground mt-7 mb-3 leading-snug text-accent"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-base sm:text-lg font-semibold text-foreground mt-5 mb-2 leading-snug"
      {...props}
    >
      {children}
    </h3>
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="my-3 text-[15px] sm:text-base leading-[2.1] text-foreground/90 font-sans"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-4 ps-4 border-r-3 border-accent bg-surface/40 py-2.5 px-3 rounded-l-lg text-sm sm:text-[15px] italic text-foreground/80 leading-relaxed"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-3 space-y-2 ps-5 list-disc text-foreground/90 text-sm sm:text-[15px] leading-relaxed"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-3 space-y-2 ps-5 list-decimal text-foreground/90 text-sm sm:text-[15px] leading-relaxed"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  hr: () => <hr className="my-6 border-border/80" />,
};
