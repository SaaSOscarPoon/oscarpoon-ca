export default function Footer() {
  return (
    <footer className="snap-section relative min-h-[70vh] w-full flex flex-col justify-center border-t border-zinc-200/60 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold tracking-widest text-zinc-700 text-sm">OSCAR POON</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 leading-tight">
          Connect socials
        </h2>

        <div className="flex items-center justify-center gap-7 pt-2">
          <a
            href="https://www.facebook.com/oscarpoon.ca"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="text-zinc-400 hover:text-emerald-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/joinlsdiet"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-zinc-400 hover:text-emerald-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
              <path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47-.66.26-1.22.6-1.77 1.15C3.13 4.23 2.79 4.79 2.53 5.45c-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.15 1.77.55.55 1.11.89 1.77 1.15.64.25 1.37.42 2.43.47C8.94 21.99 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47.66-.26 1.22-.6 1.77-1.15.55-.55.89-1.11 1.15-1.77.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43-.26-.66-.6-1.22-1.15-1.77-.55-.55-1.11-.89-1.77-1.15-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.85.34.47.18.8.4 1.15.75.35.35.57.68.75 1.15.13.35.3.87.34 1.85.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.34 1.85-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.35.13-.87.3-1.85.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.85-.34-.47-.18-.8-.4-1.15-.75-.35-.35-.57-.68-.75-1.15-.13-.35-.3-.87-.34-1.85C3.81 14.99 3.8 14.67 3.8 12s.01-2.99.06-4.04c.04-.98.21-1.5.34-1.85.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.35-.13.87-.3 1.85-.34C9.01 3.81 9.33 3.8 12 3.8zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7zm5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
            </svg>
          </a>
          <a
            href="https://x.com/JoinLSDiet"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="text-zinc-400 hover:text-emerald-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
              <path d="M18.24 2h3.29l-7.19 8.21L22.86 22h-6.62l-5.18-6.78L4.99 22H1.7l7.69-8.79L1.14 2h6.79l4.68 6.2L18.24 2zm-1.16 18h1.82L7.02 3.9H5.06L17.08 20z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/poonoscar/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-zinc-400 hover:text-emerald-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
              <path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48z" />
            </svg>
          </a>
        </div>

        <p className="text-zinc-500 text-sm pt-2">
          Say hello, or ask about a partnership.
        </p>
        <div className="pt-4">
          <a
            href="mailto:support@oscarpoon.ca"
            className="inline-block px-7 py-3 rounded-full bg-zinc-900 text-white font-bold tracking-wide hover:bg-emerald-600 transition-colors text-xs"
          >
            support@oscarpoon.ca
          </a>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto px-6 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-zinc-100 pt-8 text-[10px] text-zinc-400">
        <div className="flex gap-6 font-bold tracking-widest uppercase">
          <a href="#lsdiet" className="hover:text-black transition-colors">LSDiet</a>
          <a href="#attl" className="hover:text-black transition-colors">ATTL</a>
          <a href="#music" className="hover:text-black transition-colors">Music</a>
          <a href="#toolbook" className="hover:text-black transition-colors">Toolbook</a>
          <a href="/teams" className="hover:text-black transition-colors">Team</a>
          <a href="/privacy" className="hover:text-black transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-black transition-colors">Terms</a>
        </div>
        <div className="font-mono">© 2026 Oscar Poon</div>
      </div>
    </footer>
  )
}
