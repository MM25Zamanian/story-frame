import { ArtworkCard } from "@/components/artwork-card";
import { Reveal } from "@/components/reveal";

export function GalleryView({
  artworks,
  programSlug,
}: {
  artworks: any[];
  programSlug?: string;
}) {
  return (
    <section
      aria-label="فهرست تابلوها"
      className="flex flex-col gap-6"
      id="tableaus"
    >
      {artworks.map((artwork, index) => (
        <Reveal key={artwork.id} media entrance={index < 2}>
          <ArtworkCard
            artwork={artwork}
            index={index}
            priority={index < 2}
            programSlug={programSlug}
          />
        </Reveal>
      ))}
    </section>
  );
}
