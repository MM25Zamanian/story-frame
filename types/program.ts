export type ProgramType = "series" | "standalone";

export interface ProgramCover {
  url: string;
  zoomUrl?: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface ProgramVideo {
  url: string;
  poster?: string;
  title?: string;
  duration?: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  year: string;
  occasion: string; // e.g. "فاطمیه"
  type: ProgramType; // "series" for tableaux lists, "standalone" for roundtable/seminar
  formatTitle: string; // e.g. "تابلو مصور", "میزگرد", "سمینار"
  coverImage?: ProgramCover;
  video?: ProgramVideo;
  summary?: string[]; // Compressed keywords for the overall program or execution
  order: number;
}

export interface ProgramItem {
  id: string;
  slug: string;
  programSlug: string;
  order: number;
  title: string;
  summary: string[]; // کلیدواژه‌های فشرده
  image?: {
    url: string;
    zoomUrl?: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;
    aspectRatio?: string;
  };
  video?: ProgramVideo;
  content: string; // Raw MDX content
}
