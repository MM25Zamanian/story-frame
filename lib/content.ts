import type { Program, ProgramItem } from "@/types/program";

import fs from "fs";
import path from "path";

import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROGRAMS_DIR = path.join(CONTENT_DIR, "programs");

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
 * Get a specific program by slug
 */
export function getProgramBySlug(slug: string): Program | null {
  const programs = getAllPrograms();

  return programs.find((p) => p.slug === slug) ?? null;
}

/**
 * Get all items for a series program (e.g. tableaux in fatimiyeh-1398)
 */
export function getProgramItems(programSlug: string): ProgramItem[] {
  const itemsDir = path.join(PROGRAMS_DIR, programSlug, "items");

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
      programSlug,
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
  const items = getProgramItems(programSlug);

  return items.find((item) => item.slug === itemSlug) ?? null;
}

/**
 * Get standalone program's main MDX script (e.g. for roundtable or seminar)
 */
export function getStandaloneContent(programSlug: string): string | null {
  const indexPath = path.join(PROGRAMS_DIR, programSlug, "index.mdx");

  if (fs.existsSync(indexPath)) {
    const fileContent = fs.readFileSync(indexPath, "utf-8");
    const { content } = matter(fileContent);

    return content;
  }

  return null;
}
