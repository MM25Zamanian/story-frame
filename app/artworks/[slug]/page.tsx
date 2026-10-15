import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { ArtworkDetailView } from "./artwork-detail-view";

import { artworks, getArtworkBySlug } from "@/data/artworks";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artworks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artwork = getArtworkBySlug((await params).slug);

  return {
    title: artwork?.title ?? "تابلو یافت نشد",
    description: artwork?.summary.join(" "),
  };
}

export default async function ArtworkPage({ params }: Props) {
  const artwork = getArtworkBySlug((await params).slug);

  if (!artwork) notFound();
  const index = artworks.indexOf(artwork);

  return (
    <div className="w-full">
      <ArtworkDetailView
        key={artwork.id}
        artwork={artwork}
        index={index}
        nextArtwork={artworks[(index + 1) % artworks.length]}
        prevArtwork={artworks[(index + artworks.length - 1) % artworks.length]}
      />
    </div>
  );
}
