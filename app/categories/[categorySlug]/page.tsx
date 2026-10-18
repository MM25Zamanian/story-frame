import type { Metadata } from "next";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  getAllCategories,
  getCategoryBySlug,
  getProgramsByCategory,
  getProgramItems,
} from "@/lib/content";
import { Reveal } from "@/components/reveal";

type Props = {
  params: Promise<{ categorySlug: string }>;
};

export function generateStaticParams() {
  const categories = getAllCategories();

  return categories.map((cat) => ({
    categorySlug: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: "دسته‌بندی یافت نشد" };
  }

  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const programs = getProgramsByCategory(categorySlug);

  return (
    <div className="shell py-6 pb-20">
      {/* Category Editorial Masthead */}
      <Reveal entrance>
        <header className="mb-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <Link
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent transition-colors"
              href="/"
            >
              <span>← بازگشت به صفحه اصلی</span>
            </Link>
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
              {category.formatTitle}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-medium text-foreground shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span>
              {programs.length.toLocaleString("fa-IR")} مجموعه روایی اختصاصی
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4">
            {category.title}
          </h1>

          {category.subtitle && (
            <p className="text-sm sm:text-base font-medium text-foreground/85 mt-1.5">
              {category.subtitle}
            </p>
          )}

          <p className="text-sm leading-relaxed text-muted mt-2 max-w-xl">
            {category.description}
          </p>

          <div className="h-px w-full bg-border mt-6" />
        </header>
      </Reveal>

      {/* Program Cards Stream */}
      <section
        aria-label={`فهرست برنامه‌های ${category.title}`}
        className="flex flex-col gap-4"
      >
        {programs.map((program, index) => {
          const items =
            program.type === "series" ? getProgramItems(program.slug) : [];
          const countLabel =
            program.type === "series"
              ? `${items.length.toLocaleString("fa-IR")} تابلوی روایی`
              : program.downloads?.length
                ? `${program.downloads.length.toLocaleString("fa-IR")} فایل دانلودی`
                : "سناریوی تعاملی";

          const actionLabel =
            program.type === "series" ? "مشاهده تابلوها" : "خوانش سناریو";

          return (
            <Reveal key={program.id} entrance={index < 3}>
              <article className="group relative rounded-2xl border border-border bg-surface/50 hover:bg-surface hover:border-accent/40 p-5 sm:p-6 transition-all duration-200 shadow-2xs">
                <Link
                  className="block focus:outline-hidden"
                  href={`/${program.slug}`}
                >
                  {/* Optional Visual Banner Thumbnail */}
                  {program.coverImage && (
                    <div className="relative w-full aspect-21/9 sm:aspect-24/7 rounded-xl overflow-hidden mb-4 border border-border/60 bg-surface-secondary">
                      <Image
                        fill
                        alt={program.coverImage.alt || program.title}
                        blurDataURL={program.coverImage.blurDataURL}
                        className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-102"
                        placeholder={
                          program.coverImage.blurDataURL ? "blur" : "empty"
                        }
                        sizes="(max-width: 640px) 100vw, 540px"
                        src={program.coverImage.url}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Eyebrow Format Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-accent whitespace-nowrap">
                      {program.formatTitle}
                    </span>
                    <span className="text-xs text-muted font-medium whitespace-nowrap">
                      {program.occasion}
                    </span>
                  </div>

                  {/* Program Title */}
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
                    {program.title}
                  </h2>

                  {/* Subtitle */}
                  {program.subtitle && (
                    <p className="text-xs sm:text-sm font-medium text-foreground/80 mt-1 truncate">
                      {program.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-muted mt-2 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Symmetrical Bottom Meta & Action Row */}
                  <div className="flex items-center justify-between gap-3 mt-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-medium text-muted bg-surface-secondary px-2.5 py-1 rounded-full border border-border/60 whitespace-nowrap">
                        {countLabel}
                      </span>
                      {program.video?.duration && (
                        <span className="text-[11px] font-medium text-muted bg-surface-secondary px-2.5 py-1 rounded-full border border-border/60 whitespace-nowrap">
                          {program.video.duration} ویدیو
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent whitespace-nowrap">
                      <span>{actionLabel}</span>
                      <span className="text-base transition-transform duration-200 ease-out group-hover:-translate-x-1">
                        ←
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
