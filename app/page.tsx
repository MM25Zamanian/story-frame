import { artworks } from "@/data/artworks";
import { GalleryView } from "@/components/gallery-view";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return (
    <div className="shell py-6 pb-12">
      <Reveal entrance>
        <section className="flex flex-col gap-3 mb-6">
          <div>
            <p className="text-xs font-semibold text-accent mb-1.5">
              سلسله روایت‌های تصویری
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-foreground">
              تابلوهای دومینو
            </h1>
            <p className="text-sm leading-relaxed text-muted mt-2">
              تابلوی مورد نظر را برای مشاهده سیر سناریویی و متن روایی انتخاب
              کنید.
            </p>
          </div>
          <div className="flex items-center pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted bg-surface px-2.5 py-1 rounded-full border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />۸ تابلو ·
              مجموعه کامل
            </span>
          </div>
        </section>
      </Reveal>

      <GalleryView artworks={artworks} />
    </div>
  );
}
