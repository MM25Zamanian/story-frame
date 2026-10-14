import Link from "next/link";

import { getAllPrograms, getProgramItems } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  const programs = getAllPrograms();

  return (
    <div className="shell py-6 pb-16">
      <Reveal entrance>
        <section className="flex flex-col gap-2 mb-8">
          <p className="text-xs font-semibold text-accent tracking-wide">
            سامانه تخصصی محتواهای روایی و صحنه‌ای
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-foreground">
            فهرست دوره‌ها و برنامه‌ها
          </h1>
          <p className="text-sm leading-relaxed text-muted mt-1">
            مجموعه تابلوهای مصور، سناریوهای صحنه‌ای، میزگردها و سمینارهای تخصصی.
            جهت مشاهده سیر سناریو، کلیدواژه‌ها و محتوای اجرا برنامه مورد نظر را
            انتخاب کنید.
          </p>
        </section>
      </Reveal>

      <section aria-label="فهرست برنامه‌ها" className="flex flex-col gap-4">
        {programs.map((program, index) => {
          const items =
            program.type === "series" ? getProgramItems(program.slug) : [];
          const countLabel =
            program.type === "series"
              ? `${items.length.toLocaleString("fa-IR")} تابلوی مصور`
              : "سناریوی تعاملی اجرا";

          return (
            <Reveal key={program.id} media entrance={index < 2}>
              <Link
                className="group block rounded-2xl border border-border bg-surface/40 hover:bg-surface/80 hover:border-accent/50 p-4 sm:p-5 transition-all duration-200 shadow-xs"
                href={`/${program.slug}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                        {program.formatTitle}
                      </span>
                      <span className="text-[11px] text-muted bg-surface px-2 py-0.5 rounded-md border border-border font-mono">
                        سال {program.year}
                      </span>
                      <span className="text-[11px] text-muted">
                        · {countLabel}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {program.title}
                    </h2>

                    {program.subtitle && (
                      <p className="text-xs font-medium text-foreground/70 mt-1 line-clamp-1">
                        {program.subtitle}
                      </p>
                    )}

                    <p className="text-xs leading-relaxed text-muted mt-1.5 line-clamp-2">
                      {program.description}
                    </p>
                  </div>

                  <div className="flex items-center text-accent shrink-0 ps-2">
                    <span className="text-lg transition-transform duration-200 group-hover:-translate-x-1">
                      ←
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
