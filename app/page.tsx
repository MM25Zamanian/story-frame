import { artworks } from "@/data/artworks";
import { GalleryView } from "@/components/gallery-view";
import { Reveal } from "@/components/reveal";
export default function HomePage() {
  return (
    <div className="shell home-page">
      <Reveal entrance>
        <section className="page-intro">
          <div>
            <p className="eyebrow">سلسله روایت‌های تصویری</p>
            <h1>تابلوهای دومینو</h1>
            <p>
              تابلوی مورد نظر را برای مشاهده سیر سناریویی و متن روایی انتخاب
              کنید.
            </p>
          </div>
          <span className="sample-label">۸ تابلو · مجموعه کامل</span>
        </section>
      </Reveal>
      <GalleryView artworks={artworks} />
    </div>
  );
}
