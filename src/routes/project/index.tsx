import { For } from "solid-js"


import firstImage from '/src/assets/static/portofolio1.png';
import telegramBot from '/src/assets/static/bot_tele.png';
import { Meta, Title } from "@solidjs/meta";
import { Motion } from "solid-motionone";

const projects = [
  {
    title: 'first Portfolio',
    description: 'My first portofolio',
    stack: ['Next', 'Shadcn', 'TailwindCSS'],
    link: 'https://portfolio-ikhwans.vercel.app/',
    repo: 'https://github.com/wanto-production/portofolio',
    image: firstImage,
  },
  {
    title: 'tiktok video downloader',
    description: 'A telegram bot that can install tiktok video without watermark',
    stack: ['Next', 'WebHook'],
    link: 'https://t.me/TiktokConverterRobot',
    repo: 'https://github.com/wanto-production/next_webhook',
    image: telegramBot,
  },
]

export default function ProjectPage() {
  return (
    <main class=" w-full">
      <Title>projects | ikhwan satrio</Title>
      <Meta name="keywords" content="project ikhwan satrio" />
      <Meta name="description" content="my project here!" />

      <section class="min-h-screen bg-nishimiya-light text-nishimiya-dark py-16 px-6">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl font-bold text-center text-nishimiya-pink mb-12">🗂️ Projects</h2>
          <div class="grid md:grid-cols-2 gap-10">
            <For each={projects}>{(project, i) => (
              <Motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 100, y: 0 }}
                hover={{ scale: 1.01 }}
                class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <img src={project.image} alt={project.title} class="h-48 w-full object-cover" />
                <div class="p-6 flex flex-col justify-between">
                  <div>
                    <h3 class="text-2xl font-semibold text-nishimiya-pink">{project.title}</h3>
                    <p class="text-sm mt-2 text-nishimiya-dark/80">{project.description}</p>
                    <ul class="flex flex-wrap gap-2 mt-4 text-xs text-white">
                      <For each={project.stack}>{tag => (
                        <li class="bg-nishimiya-pink px-2 py-1 rounded">{tag}</li>
                      )}</For>
                    </ul>
                  </div>
                  <div class="mt-6 flex gap-4 text-sm">
                    <a href={project.link} target="_blank" class="text-blue-500 hover:underline">🔗 Live</a>
                    <a href={project.repo} target="_blank" class="text-gray-500 hover:underline">💻 Code</a>
                  </div>
                </div>
              </Motion.div>
            )}</For>
          </div>
        </div>
      </section>
    </main>
  )
}
