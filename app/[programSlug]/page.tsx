import type { Metadata } from "next";

import { notFound } from "next/navigation";
import Link from "next/link";

import {
  getAllPrograms,
  getCategoryBySlug,
  getProgramBySlug,
  getProgramItems,
  getProgramsByCategory,
  getStandaloneContent,
  SLUG_ALIASES,
} from "@/lib/content";
import { GalleryView } from "@/components/gallery-view";
import { Reveal } from "@/components/reveal";
import { StandaloneProgramView } from "@/components/standalone-program-view";
import { MDXRenderer } from "@/components/narrative/mdx-renderer";

type Props = {
  params: Promise<{ programSlug: string }>;
};

export function generateStaticParams() {
  const programs = getAllPrograms();
  const params = programs.map((p) => ({ programSlug: p.slug }));

  for (const alias of Object.keys(SLUG_ALIASES)) {
    params.push({ programSlug: alias });
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { programSlug } = await params;
  const program = getProgramBySlug(programSlug);

  if (!program) {
    return { title: "برنامه یافت نشد" };
  }

  return {
    title: program.title,
    description: program.description,
  };
}

export default async function ProgramPage({ params }: Props) {
  const { programSlug } = await params;
  const program = getProgramBySlug(programSlug);

  if (!program) {
    notFound();
  }

  // Standalone Program (e.g., Roundtable, Seminar)
  if (program.type === "standalone") {
    const mdxContent = getStandaloneContent(programSlug);

    if (!mdxContent) notFound();

    return (
      <div className="w-full">
        <StandaloneProgramView program={program}>
          <MDXRenderer source={mdxContent} />
        </StandaloneProgramView>
      </div>
    );
  }

  // Series Program (e.g., Tableau Collections)
  const items = getProgramItems(programSlug);

  const category = program.categorySlug
    ? getCategoryBySlug(program.categorySlug)
    : null;
  const categoryCount = program.categorySlug
    ? getProgramsByCategory(program.categorySlug).length
    : 0;

  const backHref =
    category && categoryCount > 1 ? `/categories/${category.slug}` : "/";
  const backLabel =
    category && categoryCount > 1
      ? `← بازگشت به ${category.title}`
      : "← بازگشت به صفحه اصلی";

  return (
    <div className="shell py-6 pb-12">
      <Reveal entrance>
        <section className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between gap-2">
            <Link
              className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
              href={backHref}
            >
              <span>{backLabel}</span>
            </Link>
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
              {program.formatTitle}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-foreground">
              {program.title}
            </h1>
            {program.subtitle && (
              <p className="text-sm font-medium text-accent mt-1">
                {program.subtitle}
              </p>
            )}
            <p className="text-sm leading-relaxed text-muted mt-2">
              {program.description}
            </p>
          </div>

          <div className="flex items-center pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted bg-surface px-2.5 py-1 rounded-full border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {items.length.toLocaleString("fa-IR")} تابلو · مجموعه کامل
            </span>
          </div>
        </section>
      </Reveal>

      <GalleryView artworks={items} programSlug={programSlug} />
    </div>
  );
}
