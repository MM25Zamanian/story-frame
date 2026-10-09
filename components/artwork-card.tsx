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
    <Link className="tableau-card" href={"/artworks/" + artwork.slug}>
      <div className="tableau-image">
        <Image
          alt={artwork.image.alt}
          height={artwork.image.height}
          priority={priority}
          sizes="(max-width:639px) 100vw, (max-width:1023px) 50vw, 25vw"
          src={artwork.image.url}
          width={artwork.image.width}
        />
      </div>
      <div className="tableau-caption">
        <span className="index">
          {(index + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
        </span>
        <h2>{artwork.title}</h2>
        <span aria-hidden="true" className="card-arrow">
          ←
        </span>
      </div>
    </Link>
  );
}
