import type { Artwork } from "@/types/artwork";

import { ArtworkCard } from "@/components/artwork-card";
import { Reveal } from "@/components/reveal";
export function GalleryView({ artworks }: { artworks: Artwork[] }) {
  return (
    <section aria-label="فهرست تابلوها" className="tableau-grid" id="tableaus">
      {artworks.map((artwork, index) => (
        <Reveal key={artwork.id} media entrance={index < 2}>
          <ArtworkCard artwork={artwork} index={index} priority={index < 2} />
        </Reveal>
      ))}
    </section>
  );
}
