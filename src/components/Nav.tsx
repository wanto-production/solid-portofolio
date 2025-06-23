import { createSignal, Show } from "solid-js";
import { Presence, Motion } from "solid-motionone";
import { FaSolidBars, FaSolidXmark } from "solid-icons/fa";

export default function Nav() {
  const [showMenu, setShowMenu] = createSignal(false);

  return (
    <nav class="sticky top-0 w-full z-50 bg-nishimiya-light text-nishimiya-dark shadow-md">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" class="text-xl font-bold text-nishimiya-pink">
          Ikhwan Satrio
        </a>

        {/* Desktop Menu */}
        <ul class="hidden md:flex space-x-6 font-medium">
          <li><a href="/" class="hover:underline">Home</a></li>
          <li><a href="/project" class="hover:underline">Projects</a></li>
          <li><a href="/blog" class="hover:underline">Blog</a></li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setShowMenu(!showMenu())}
          class="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {showMenu() ? (<FaSolidXmark />) : (<FaSolidBars />)}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <Presence>
        <Show when={showMenu()}>
          <Motion.ul
            class="md:hidden px-4 pb-4 space-y-3 font-medium bg-nishimiya-light"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, easing: "ease-in-out" }}
          >
            <li><a href="/" class="block py-1 hover:underline">Home</a></li>
            <li><a href="/project" class="block py-1 hover:underline">Projects</a></li>
            <li><a href="/blog" class="block py-1 hover:underline">Blog</a></li>
          </Motion.ul>
        </Show>
      </Presence>
    </nav>
  );
}

