import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getAllPrograms, getProgramItems, getProgramItem } from "@/lib/content";
import { ProgramItemDetailView } from "@/components/program-item-detail";
import { MDXRenderer } from "@/components/narrative/mdx-renderer";

type Props = {
  params: Promise<{ programSlug: string; itemSlug: string }>;
};

export function generateStaticParams() {
  const programs = getAllPrograms().filter((p) => p.type === "series");
  const params: { programSlug: string; itemSlug: string }[] = [];

  for (const prog of programs) {
    const items = getProgramItems(prog.slug);

    for (const item of items) {
      params.push({
        programSlug: prog.slug,
        itemSlug: item.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { programSlug, itemSlug } = await params;
  const item = getProgramItem(programSlug, itemSlug);

  return {
    title: item?.title ?? "تابلو یافت نشد",
    description: item?.summary?.join(" "),
  };
}

export default async function ProgramItemPage({ params }: Props) {
  const { programSlug, itemSlug } = await params;
  const item = getProgramItem(programSlug, itemSlug);

  if (!item) {
    notFound();
  }

  const items = getProgramItems(programSlug);
  const index = items.findIndex((it) => it.slug === item.slug);
  const prevItem = items[(index + items.length - 1) % items.length];
  const nextItem = items[(index + 1) % items.length];

  return (
    <div className="w-full">
      <ProgramItemDetailView
        index={index}
        item={item}
        nextItem={nextItem}
        prevItem={prevItem}
        programSlug={programSlug}
        totalItems={items.length}
      >
        <MDXRenderer source={item.content} />
      </ProgramItemDetailView>
    </div>
  );
}
