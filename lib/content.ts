import type {
  Category,
  HomeEntry,
  Program,
  ProgramItem,
} from "@/types/program";

import fs from "fs";
import path from "path";

import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROGRAMS_DIR = path.join(CONTENT_DIR, "programs");
const CATEGORIES_PATH = path.join(CONTENT_DIR, "categories.json");

/**
 * Backward compatibility alias map for legacy year-based slugs
 */
export const SLUG_ALIASES: Record<string, string> = {
  "fatimiyeh-1398": "fatimiyeh-domino",
  "fatimiyeh-1401": "fatimiyeh-dialogue",
  "roundtable-1403": "roundtable",
  "seminar-1403": "seminar",
};

/**
 * Resolve a potentially legacy slug to its current canonical slug
 */
export function resolveSlug(slug: string): string {
  return SLUG_ALIASES[slug] ?? slug;
}

/**
 * Get all categories sorted by order
 */
export function getAllCategories(): Category[] {
  if (!fs.existsSync(CATEGORIES_PATH)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(CATEGORIES_PATH, "utf-8");
    const categories = JSON.parse(raw) as Category[];

    return categories.sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}

/**
 * Get a specific category by slug
 */
export function getCategoryBySlug(slug: string): Category | null {
  const categories = getAllCategories();

  return categories.find((c) => c.slug === slug) ?? null;
}

/**
 * Get list of all programs sorted by order
 */
export function getAllPrograms(): Program[] {
  if (!fs.existsSync(PROGRAMS_DIR)) {
    return [];
  }

  const programFolders = fs
    .readdirSync(PROGRAMS_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const programs: Program[] = [];

  for (const folder of programFolders) {
    const configPath = path.join(PROGRAMS_DIR, folder, "program.json");

    if (fs.existsSync(configPath)) {
      try {
        const raw = fs.readFileSync(configPath, "utf-8");
        const program = JSON.parse(raw) as Program;

        programs.push(program);
      } catch {
        // Skip invalid program configs
      }
    }
  }

  return programs.sort((a, b) => a.order - b.order);
}

/**
 * Get a specific program by slug (supports both canonical and legacy alias slugs)
 */
export function getProgramBySlug(slug: string): Program | null {
  const canonical = resolveSlug(slug);
  const programs = getAllPrograms();

  return programs.find((p) => p.slug === canonical) ?? null;
}

/**
 * Get all programs belonging to a category
 */
export function getProgramsByCategory(categorySlug: string): Program[] {
  const programs = getAllPrograms();

  return programs
    .filter((p) => p.categorySlug === categorySlug)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get dynamic feed entries for the homepage.
 * - Categories with >1 programs appear as a Category entry.
 * - Categories with 1 program appear directly as a Program entry.
 */
export function getHomeFeedEntries(): HomeEntry[] {
  const categories = getAllCategories();
  const allPrograms = getAllPrograms();
  const entries: HomeEntry[] = [];
  const processedProgramSlugs = new Set<string>();

  for (const cat of categories) {
    const programs = allPrograms.filter((p) => p.categorySlug === cat.slug);

    if (programs.length === 0) continue;

    programs.forEach((p) => processedProgramSlugs.add(p.slug));

    if (programs.length > 1) {
      entries.push({
        type: "category",
        category: cat,
        programs,
        count: programs.length,
      });
    } else {
      entries.push({
        type: "program",
        program: programs[0],
      });
    }
  }

  // Include any program not associated with a configured category
  for (const p of allPrograms) {
    if (!processedProgramSlugs.has(p.slug)) {
      entries.push({
        type: "program",
        program: p,
      });
    }
  }

  return entries;
}

/**
 * Get all items for a series program (e.g. tableaux in fatimiyeh-domino)
 */
export function getProgramItems(programSlug: string): ProgramItem[] {
  const canonical = resolveSlug(programSlug);
  const itemsDir = path.join(PROGRAMS_DIR, canonical, "items");

  if (!fs.existsSync(itemsDir)) {
    return [];
  }

  const files = fs
    .readdirSync(itemsDir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
  const items: ProgramItem[] = [];

  for (const file of files) {
    const filePath = path.join(itemsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const slug = data.slug || file.replace(/\.mdx?$/, "").replace(/^\d+-/, "");

    items.push({
      id: data.id || slug,
      slug,
      programSlug: canonical,
      order: data.order ?? 0,
      title: data.title || "",
      summary: data.summary || [],
      image: data.image,
      video: data.video,
      content,
    });
  }

  return items.sort((a, b) => a.order - b.order);
}

/**
 * Get a single item by programSlug and itemSlug
 */
export function getProgramItem(
  programSlug: string,
  itemSlug: string,
): ProgramItem | null {
  const canonical = resolveSlug(programSlug);
  const items = getProgramItems(canonical);

  return items.find((item) => item.slug === itemSlug) ?? null;
}

/**
 * Get standalone program's main MDX script (e.g. for roundtable or seminar)
 */
export function getStandaloneContent(programSlug: string): string | null {
  const canonical = resolveSlug(programSlug);
  const indexPath = path.join(PROGRAMS_DIR, canonical, "index.mdx");

  if (fs.existsSync(indexPath)) {
    const fileContent = fs.readFileSync(indexPath, "utf-8");
    const { content } = matter(fileContent);

    return content;
  }

  return null;
}
