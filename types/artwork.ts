export interface ArtworkImage {
  url: string;
  zoomUrl?: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio?: string;
  blurDataURL?: string;
}

export interface ArtworkVideo {
  url: string;
  poster?: string;
  title?: string;
  duration?: string;
  type?: string;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  description: string;
  summary: string[];
  image: ArtworkImage;
  video?: ArtworkVideo;
  // Realistic curation attributes for exhibition depth
  year?: string;
  medium?: string;
  artist?: string;
  curatorNote?: string;
  dimensions?: string;
  category?: string;
}
