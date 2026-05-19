import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const HUNTS_DIR = path.join(process.cwd(), "content", "hunts");
const FISHING_DIR = path.join(process.cwd(), "content", "fishing");

export interface HuntContent {
  slug: string;
  title: string;
  description: string;
  html: string;
  raw: string;
}

export async function getHuntContent(slug: string): Promise<HuntContent | null> {
  return loadMarkdown(path.join(HUNTS_DIR, `${slug}.md`), slug);
}

export async function getFishingContent(slug: string): Promise<HuntContent | null> {
  return loadMarkdown(path.join(FISHING_DIR, `${slug}.md`), slug);
}

async function loadMarkdown(file: string, slug: string): Promise<HuntContent | null> {
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    html: processed.toString(),
    raw: content,
  };
}
