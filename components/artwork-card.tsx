import type { Artwork } from "@/types/artwork";

import Image from "next/image";
import Link from "next/link";

export function ArtworkCard({
  artwork,
  index,
  priority = false,
}: {
  artwork: Artwork;
  index: number;
  priority?: boolean;
}) {
  return (
    <Link
      className="group block rounded-2xl overflow-hidden border border-border bg-surface/40 hover:border-accent/50 transition-all duration-200"
      href={"/artworks/" + artwork.slug}
    >
      <div className="aspect-[5120/3656] overflow-hidden bg-surface">
        <Image
          alt={artwork.image.alt}
          blurDataURL={artwork.image.blurDataURL}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
          height={artwork.image.height}
          placeholder={artwork.image.blurDataURL ? "blur" : "empty"}
          priority={priority}
          sizes="(max-width: 520px) 100vw, 480px"
          src={artwork.image.url}
          width={artwork.image.width}
        />
      </div>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="text-xs font-mono font-medium text-muted bg-border/50 px-2 py-0.5 rounded">
          {(index + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
        </span>
        <h2 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
          {artwork.title}
        </h2>
        <span
          aria-hidden="true"
          className="ms-auto text-base text-accent transition-transform duration-200 group-hover:-translate-x-1"
        >
          ←
        </span>
      </div>
    </Link>
  );
}
