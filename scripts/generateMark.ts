import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const OUTPUT_FILE = path.join(process.cwd(), "public/blogs.json");

async function generate() {
  const files = (await fs.readdir(BLOG_DIR)).filter(f => f.endsWith(".md"));

  const blogs = await Promise.all(
    files.map(async (filename) => {
      const content = await fs.readFile(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content: body } = matter(content);

      return {
        slug: filename.replace(/\.md$/, ""),
        meta: data,
        content: body,
      };
    })
  );

  // sort by newest
  blogs.sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date));

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(blogs, null, 2));
  console.log("✅ blogs.json generated!");
}

generate();

