// src/routes/blog/index.tsx
import { createSignal, For, Show, createMemo } from "solid-js";
import { Motion } from "solid-motionone";
import { Meta, Title } from "@solidjs/meta";
import { createAsync, query } from "@solidjs/router";
import { getAllBlogs } from "~/composables/fetchBlog";

const getBlogs = query(async () => {
  "use server";
  const blogs = await getAllBlogs();
  return blogs;
}, 'blogs');

export default function BlogPage() {
  const [search, setSearch] = createSignal<string>("");
  const [selectedTag, setSelectedTag] = createSignal<string>("");
  const blogs = createAsync(() => getBlogs());

  const allTags = createMemo(() => {
    const tagSet = new Set<string>();
    blogs()?.forEach((b) => {
      b.meta?.tags?.forEach((tag) => tagSet.add(tag));
    });
    return [...tagSet];
  });

  const filteredBlogs = createMemo(() => {
    const all = blogs();
    const keyword = search().toLowerCase().trim();
    const selected = selectedTag().trim().toLowerCase();

    if (!all) return [];

    return all.filter((b) => {
      const titleMatch = keyword
        ? b.meta.title.toLowerCase().includes(keyword)
        : true;

      const tagsMatch = selected
        ? b.meta.tags?.some((tag) => tag.toLowerCase().includes(selected))
        : true;

      return titleMatch && tagsMatch;
    });
  });


  return (
    <main class="min-h-screen bg-nishimiya-light text-nishimiya-dark py-16 px-4 sm:px-6 lg:px-8">
      <Title>blogs | ikhwan satrio</Title>
      <Meta
        name="description"
        content="Read blogs by Ikhwan Satria on programming, anime, and dev tools like NeoVim, Nuxt, and more."
      />

      <div class="max-w-6xl mx-auto">
        {/* 🔍 Filter */}
        <div class="mb-12 grid gap-4 md:grid-cols-2 items-center">
          <input
            type="text"
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search by title..."
            class="normal-case w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nishimiya-pink"
          />

          <select
            value={selectedTag()}
            onChange={(e) => setSelectedTag(e.currentTarget.value)}
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nishimiya-pink"
          >
            <option value="">All Tags</option>
            <For each={allTags()}>
              {(tag) => (
                <option value={tag}>
                  {tag}
                </option>
              )}
            </For>
          </select>
        </div>

        {/* 🔁 Blog Grid */}
        <div
          class={`grid gap-6 place-items-stretch ${filteredBlogs()?.length === 1
            ? "grid-cols-1 place-items-center"
            : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
        >
          {/* Skeletons */}
          <Show when={!blogs()}>
            <For each={[...Array(6)]}>
              {(_, i) => (
                <div class="bg-white rounded-xl overflow-hidden shadow-md animate-pulse flex flex-col w-full max-w-md" >
                  <div class="h-48 w-full bg-gray-200" />
                  <div class="p-5 space-y-3">
                    <div class="h-5 bg-gray-300 rounded w-3/4" />
                    <div class="h-3 bg-gray-200 rounded w-1/3" />
                    <div class="h-4 bg-gray-300 rounded w-full" />
                    <div class="h-4 bg-gray-200 rounded w-5/6" />
                    <div class="h-4 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              )}
            </For>
          </Show>

          {/* No Result */}
          <Show when={blogs() && filteredBlogs()?.length < 1}>
            <div class="col-span-full text-center text-gray-500 py-12">
              🔍 No results found for "<strong>{search()}</strong>"
            </div>
          </Show>

          {/* Blogs */}
          <Show when={blogs() && filteredBlogs()?.length > 0}>
            <For each={filteredBlogs()}>
              {(blog, i) => (
                <Motion.div
                  class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all flex flex-col w-full max-w-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i() * 0.1, duration: 0.5, easing: "ease-in-out" }}
                >
                  <a
                    href={`/blog/render/${blog.slug}`}
                    class="block h-full"
                  >
                    <Show when={blog.meta.thumbnail}>
                      <img
                        src={blog.meta.thumbnail}
                        alt={blog.meta.title}
                        loading="lazy"
                        class="h-48 w-full object-cover"
                      />
                    </Show>
                    <Show when={!blog.meta.thumbnail}>
                      <div class="flex justify-center items-center h-48 w-full bg-nishimiya-soft">
                        <p>No image</p>
                      </div>
                    </Show>
                    <div class="p-5 flex flex-col justify-between h-full">
                      <div>
                        <h2 class="text-xl font-semibold text-nishimiya-pink">
                          {blog.meta.title}
                        </h2>
                        <p class="text-xs text-gray-500">
                          {new Date(blog.meta.date).toDateString()}
                        </p>
                        <p class="text-sm mt-2 text-nishimiya-dark/80 line-clamp-3">
                          {blog.meta.description}
                        </p>
                      </div>
                      <p class="mt-4 text-blue-500 text-sm hover:underline">
                        📖 Read more
                      </p>
                    </div>
                  </a>
                </Motion.div>
              )}
            </For>
          </Show>
        </div>
      </div>
    </main>
  );
}

