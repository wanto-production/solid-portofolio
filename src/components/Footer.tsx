
export default function Footer() {
  return (<>

    {/* Footer */}
    <footer class="bg-nishimiya-dark text-white py-10">
      <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-nishimiya-pink">Ikhwan Satria</h3>
          <p class="text-sm leading-relaxed text-gray-300">
            A passionate full-stack developer with a love for clean code, anime, and calisthenics.
          </p>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-3 text-nishimiya-pink">Quick Links</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><a href="/blog">Blog</a></li>
            <li><a href="/project">Projects</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-3 text-nishimiya-pink">Get In Touch</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>Email: <a href="mailto:ikhwansatria3974@gmail.com" class="hover:text-white">ikhwansatria3974@gmail.com</a></li>
            <li>GitHub: <a href="https://github.com/wanto-production" target="_blank" class="hover:text-white">github.com/wanto-production</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Ikhwan Satria. All rights reserved.
      </div>
    </footer>
  </>
  )
}
