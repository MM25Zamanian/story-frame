export type ProgramType = "series" | "standalone";

export interface ProgramCover {
  url: string;
  zoomUrl?: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface VideoSource {
  src: string;
  type: string; // e.g. 'video/mp4; codecs="hvc1"' or 'video/mp4; codecs="avc1"'
  quality?: string;
}

export interface ProgramVideo {
  url?: string;
  sources?: VideoSource[];
  poster?: string;
  title?: string;
  duration?: string;
  placement?: "top" | "inline";
}

export interface ProgramDownloadItem {
  id: string;
  title: string;
  subtitle?: string;
  filename: string;
  url: string;
  format: "pdf" | "pptx" | "zip" | "other";
  fileSize?: string;
  pageCount?: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  formatTitle: string;
  occasion: string;
  order: number;
  coverImage?: ProgramCover;
}

export type HomeEntry =
  | {
      type: "category";
      category: Category;
      programs: Program[];
      count: number;
    }
  | {
      type: "program";
      program: Program;
    };

export interface Program {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  year?: string;
  occasion: string; // e.g. "فاطمیه"
  type: ProgramType; // "series" for tableaux lists, "standalone" for roundtable/seminar
  formatTitle: string; // e.g. "تابلو مصور", "میزگرد", "سمینار"
  categorySlug?: string;
  coverImage?: ProgramCover;
  video?: ProgramVideo;
  downloads?: ProgramDownloadItem[];
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
