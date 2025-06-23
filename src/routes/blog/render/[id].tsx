// src/routes/blog/render/[slug].tsx
import { RouteDefinition, query, useParams } from "@solidjs/router";
import { createAsync } from "@solidjs/router";
import { Title, Meta } from "@solidjs/meta";
import { getAllBlogs } from "~/composables/fetchBlog";
import { Show } from "solid-js";
import { A } from "@solidjs/router";
import { marked } from "marked"

const getBlog = query(async (params) => {
  "use server";
  const all = await getAllBlogs()

  return all.find(b => b.slug == params)
}, 'blog')

export const route = {
  preload: ({ params }) => {
    getBlog(params.id)
  }
} satisfies RouteDefinition;

export default function BlogDetailPage() {
  const params = useParams()
  const post = createAsync(() => getBlog(params.id));

  return (
    <>
      <Title>{params.id} | ikhwan satrio</Title>
      <Meta
        name="description"
        content={post()?.meta.description ?? "Blog post by Ikhwan Satria"}
      />



      <article class="max-w-full h-screen mx-auto px-4 py-8 overflow-y-auto">

        {/* 🔙 Back Button */}
        <div class="mb-6">
          <A href="/blog" class="inline-flex items-center text-sm">
            <button class="bg-nishimiya-pink/20 hover:bg-nishimiya-pink/30 text-nishimiya-dark px-3 py-1.5 rounded flex items-center gap-1">
              <span class="text-xl">←</span> Back
            </button>
          </A>
        </div>

        {/* 📷 Cover Image */}
        <Show when={post()?.meta.thumbnail}>
          <div class="mb-6 rounded-xl overflow-hidden shadow">
            <img
              src={post()?.meta.thumbnail}
              alt={post()?.meta.title}
              class="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
            />
          </div>
        </Show>

        {/* 📝 Title and Date */}
        <h1 class="text-3xl md:text-4xl font-bold mb-3 leading-tight">
          {post()?.meta.title}
        </h1>
        <p class="text-sm text-gray-500 mb-6">{post()?.meta.date}</p>

        {/* 📃 Markdown Content */}
        <Show when={post()?.content}>
          <div
            class=" max-w-none prose "
            innerHTML={marked(post()?.content)}
          ></div>
        </Show>
      </article>
    </>
  );
}

