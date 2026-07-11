import Team from './Team'

export default function Footer() {
  return (
    <footer className="snap-section relative min-h-[70vh] w-full flex flex-col justify-center border-t border-zinc-200/60 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold tracking-widest text-zinc-700 text-sm">OSCAR POON</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 leading-tight">
          Building things that don't need me to keep showing up.
        </h2>
        <p className="text-zinc-500 text-sm">
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

      <Team />

      <div className="max-w-6xl w-full mx-auto px-6 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-zinc-100 pt-8 text-[10px] text-zinc-400">
        <div className="flex gap-6 font-bold tracking-widest uppercase">
          <a href="#lsdiet" className="hover:text-black transition-colors">LSDiet</a>
          <a href="#attl" className="hover:text-black transition-colors">ATTL</a>
          <a href="#music" className="hover:text-black transition-colors">Music</a>
          <a href="#toolbook" className="hover:text-black transition-colors">Toolbook</a>
          <a href="/privacy" className="hover:text-black transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-black transition-colors">Terms</a>
        </div>
        <div className="font-mono">© 2026 Oscar Poon</div>
      </div>
    </footer>
  )
}
