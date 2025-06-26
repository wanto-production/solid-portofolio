// src/routes/blog/render/[slug].tsx
import { RouteDefinition, query, useParams } from "@solidjs/router";
import { createAsync } from "@solidjs/router";
import { Title, Meta } from "@solidjs/meta";
import { getAllBlogs } from "~/composables/fetchBlog";
import { createMemo, Show } from "solid-js";
import { A } from "@solidjs/router";
import { marked } from "marked";

const getBlog = query(async (params) => {
  const all = await getAllBlogs();
  return all.find((b) => b.slug === params);
}, "blog");

export const route = {
  preload: ({ params }) => {
    getBlog(params.id);
  },
} satisfies RouteDefinition;

export default function BlogDetailPage() {
  const params = useParams();
  const post = createAsync(() => getBlog(params.id));

  const content = createMemo(() => {
    if (post()?.content) {
      //@ts-ignore
      return marked(post()?.content)
    }
  })

  return (
    <>
      <Title>{post()?.meta.title ?? params.id} | Ikhwan Satrio</Title>
      <Meta
        name="description"
        content={post()?.meta.description ?? "Blog post by Ikhwan Satria"}
      />
      <Meta name="keywords" content={[`post ${post()?.meta.title ?? params.is}`, "blog ikhwan satrio"].join(', ')} />

      <article class="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-nishimiya-dark">
        {/* 🔙 Back Button */}
        <div class="mb-8">
          <A href="/blog">
            <button class="flex items-center gap-2 text-sm text-nishimiya-dark bg-nishimiya-pink/10 hover:bg-nishimiya-pink/20 px-4 py-2 rounded-md shadow-sm transition">
              <span class="text-lg">←</span> Back to Blog
            </button>
          </A>
        </div>

        {/* 📷 Cover Image */}
        <Show when={post()?.meta.thumbnail}>
          <div class="mb-6 rounded-xl overflow-hidden shadow-md">
            <img
              src={post()?.meta.thumbnail}
              alt={post()?.meta.title}
              class="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
            />
          </div>
        </Show>

        {/* 📝 Title and Date */}
        <h1 class="text-3xl md:text-5xl font-bold mb-2 leading-tight tracking-tight">
          {post()?.meta.title}
        </h1>
        <p class="text-sm text-gray-500 mb-6">
          {new Date(post()?.meta.date ?? "").toDateString()}
        </p>

        {/* 📃 Markdown Content */}
        <Show when={post()?.content}>
          <div
            class="prose  max-w-none"
            innerHTML={content()}
          />
        </Show>
      </article>
    </>
  );
}

