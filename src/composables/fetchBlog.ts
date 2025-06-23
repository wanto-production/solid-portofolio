import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type BlogMeta = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
};

export type BlogPost = {
  meta: BlogMeta;
  slug: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getAllBlogs(): Promise<BlogPost[]> {
  const files = (await fs.readdir(BLOG_DIR)).filter(file => file.endsWith(".md"));

  const blogs = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        meta: data as BlogMeta,
        slug: filename.replace(/\.md$/, ""),
        content,
      };
    })
  );

  return blogs.sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date));
}


