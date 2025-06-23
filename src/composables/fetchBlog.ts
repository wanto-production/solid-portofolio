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

// src/composables/fetchBlog.ts
export async function getAllBlogs(): Promise<BlogPost[]> {
  const res = await fetch("/blogs.json");
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return await res.json();
}
