import Link from "next/link";

import { getHomeFeedEntries, getProgramItems } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  const entries = getHomeFeedEntries();

  return (
    <div className="shell py-6 pb-20">
      {/* Editorial Masthead */}
      <Reveal entrance>
        <header className="mb-6">
          {/* Live Indicator Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-medium text-foreground shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="whitespace-nowrap">
              آرشیو تخصصی سناریوها و روایت‌های فاطمیه
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mt-4">
            قاب روایت
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-muted mt-2 max-w-xl">
            مجموعه سناریوهای صحنه‌ای، میزگردها، تابلوهای مصور و گفتارهای تعاملی
            برای بازخوانی، آموختن و اجرای زنده.
          </p>

          {/* Symmetrical Divider Line */}
          <div className="h-px w-full bg-border mt-6" />
        </header>
      </Reveal>

      {/* Symmetrical Feed Stream */}
      <section
        aria-label="فهرست سناریوها و دسته‌بندی‌ها"
        className="flex flex-col gap-4"
      >
        {entries.map((entry, index) => {
          if (entry.type === "category") {
            const { category, count } = entry;
            const countLabel = `${count.toLocaleString("fa-IR")} مجموعه روایی`;
            const actionLabel = "مشاهده مجموعه‌ها";

            return (
              <Reveal key={`category-${category.id}`} entrance={index < 3}>
                <article className="group relative rounded-2xl border border-border bg-surface/50 hover:bg-surface hover:border-accent/40 p-5 sm:p-6 transition-all duration-200 shadow-2xs">
                  <Link
                    className="block focus:outline-hidden"
                    href={`/categories/${category.slug}`}
                  >
                    {/* Top Metadata Eyebrow */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20 whitespace-nowrap">
                          مجموعه
                        </span>
                        <span className="text-border text-xs">/</span>
                        <span className="text-xs font-bold text-accent whitespace-nowrap">
                          {category.formatTitle}
                        </span>
                      </div>

                      <span className="text-xs text-muted font-medium whitespace-nowrap">
                        {category.occasion}
                      </span>
                    </div>

                    {/* Category Title */}
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
                      {category.title}
                    </h2>

                    {/* Subtitle */}
                    {category.subtitle && (
                      <p className="text-xs sm:text-sm font-medium text-foreground/80 mt-1 truncate">
                        {category.subtitle}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm leading-relaxed text-muted mt-2 line-clamp-2">
                      {category.description}
                    </p>

                    {/* Bottom Meta & Action Row */}
                    <div className="flex items-center justify-between gap-3 mt-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-medium text-muted bg-surface-secondary px-2.5 py-1 rounded-full border border-border/60 whitespace-nowrap">
                          {countLabel}
                        </span>
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
          }

          // Single Program Entry
          const { program } = entry;
          const items =
            program.type === "series" ? getProgramItems(program.slug) : [];
          const countLabel =
            program.type === "series"
              ? `${items.length.toLocaleString("fa-IR")} تابلوی روایی`
              : program.downloads?.length
                ? `${program.downloads.length.toLocaleString("fa-IR")} فایل دانلودی`
                : program.summary?.length
                  ? `${program.summary.length.toLocaleString("fa-IR")} بخش تعاملی`
                  : "سناریوی تعاملی اجرا";

          const actionLabel =
            program.type === "series"
              ? "مشاهده تابلوها"
              : program.downloads?.length
                ? "مشاهده و دانلود"
                : "خوانش سناریو";

          return (
            <Reveal key={`program-${program.id}`} entrance={index < 3}>
              <article className="group relative rounded-2xl border border-border bg-surface/50 hover:bg-surface hover:border-accent/40 p-5 sm:p-6 transition-all duration-200 shadow-2xs">
                <Link
                  className="block focus:outline-hidden"
                  href={`/${program.slug}`}
                >
                  {/* Top Metadata Eyebrow */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-accent whitespace-nowrap">
                        {program.formatTitle}
                      </span>
                    </div>

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

                  {/* Bottom Meta & Action Row */}
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
