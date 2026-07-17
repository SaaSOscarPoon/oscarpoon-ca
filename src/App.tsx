import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import VideoCard from './components/VideoCard'
import MusicPlayer from './components/MusicPlayer'
import ToolbookFlip from './components/ToolbookFlip'
import BlogDial from './components/BlogDial'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="snap-container h-[100dvh] overflow-y-scroll bg-[#F9F9FB]">
      <Hero />

      <ProductSection
        id="lsdiet"
        eyebrow="LSDiet · Weight Regain Prevention"
        problem="You've lost the weight before. Your body just doesn't believe it's permanent yet."
        accent="emerald"
        ctaLabel="Start Weight Permanence Training"
        ctaHref="https://lsdiet.com"
        mediaSide="left"
        bg="white"
        media={<VideoCard src="/media/lsdiet-hero.mp4" label="LSDiet · WPT" aspect="wide" />}
      />

      <ProductSection
        id="attl"
        eyebrow="Anti-Time-Theft Logger"
        problem="A tool to protect you from your employer's time-theft accusations."
        accent="amber"
        ctaLabel="Get the Chrome extension"
        ctaHref="https://chromewebstore.google.com/detail/anti-time-theft-logger/bniggplaeiohmnfbfiihengidickgbog"
        mediaSide="right"
        bg="tint"
        mediaMaxWidth="max-w-xl"
        media={<VideoCard src="/media/attl-demo.mp4" label="ATTL · Live demo" aspect="wide" />}
        extra={
          <div className="space-y-2">
            <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400">
              Safari · iPhone · Android — coming soon
            </span>
            <a
              href="/attl"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-amber-600 transition-colors"
            >
              <span>See the full details</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        }
      />

      <ProductSection
        id="music"
        eyebrow="Independent Music"
        problem="Some songs help you feel the change. Others help you move through it."
        accent="indigo"
        mediaSide="left"
        bg="white"
        media={<MusicPlayer />}
        extra={
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                Listen free on YouTube
              </span>
              {[
                { title: 'Symphony of Awakening', href: 'https://youtu.be/Bf_XnjzQAP8' },
                { title: 'Emberlight', href: 'https://youtu.be/18bMUPhdhsw' },
                { title: 'Feel It', href: 'https://youtu.be/eVXoyOA8xF8' },
              ].map((track) => (
                <a
                  key={track.title}
                  href={track.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-red-600 transition-colors w-fit"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4L15.8 12Z" />
                  </svg>
                  <span>{track.title}</span>
                </a>
              ))}
            </div>

            <div className="space-y-2.5">
              <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                Support the artist
              </span>
              {[
                {
                  title: 'Symphony of Awakening',
                  href: 'https://music.apple.com/ca/album/symphony-of-awakening-single/6787885601',
                },
                { title: 'Emberlight', href: 'https://music.apple.com/us/song/emberlight/6770726547' },
                { title: 'Feel It', href: 'https://music.apple.com/us/song/feel-it/6770281670' },
              ].map((track) => (
                <a
                  key={track.title}
                  href={track.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-pink-600 transition-colors w-fit"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
                    <path d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" />
                  </svg>
                  <span>{track.title}</span>
                </a>
              ))}
            </div>
          </div>
        }
      />

      <ProductSection
        id="toolbook"
        eyebrow="Psycho-behavioural manual for endless motivations"
        problem="A tool to make weight regain emotionally unacceptable."
        accent="sky"
        ctaLabel="Get the Toolbook"
        ctaHref="https://book.lsdiet.com/products-list"
        mediaSide="right"
        bg="tint"
        media={<ToolbookFlip />}
        extra={
          <div className="space-y-2 md:space-y-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold tracking-wide uppercase">
              $500 value
            </span>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm">
              360+ guided questions across 5 stages, plus 4 private coaching calls with Oscar and
              free access to the LS Diet community — not a book you read once and shelve.
            </p>
          </div>
        }
      />

      <BlogDial />

      <Footer />
    </div>
  )
}
