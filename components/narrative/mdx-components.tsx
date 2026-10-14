import React from "react";

import { Hadith, QuranVerse } from "./hadith";
import {
  ActionCue,
  ToneCue,
  DramaticPause,
  AudienceInteraction,
  Speech,
} from "./stage-cue";

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
