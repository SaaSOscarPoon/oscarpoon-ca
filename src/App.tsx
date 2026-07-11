import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import VideoCard from './components/VideoCard'
import MusicPlayer from './components/MusicPlayer'
import ToolbookFlip from './components/ToolbookFlip'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="snap-container h-screen overflow-y-scroll bg-[#F9F9FB]">
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
        media={<VideoCard src="/media/lsdiet-hero.mp4" label="LSDiet · WPT" />}
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
          <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            Safari · iPhone · Android — coming soon
          </span>
        }
      />

      <ProductSection
        id="music"
        eyebrow="Independent Music"
        problem="Some songs help you feel the change. Others help you move through it."
        accent="indigo"
        ctaLabel="support@oscarpoon.ca to support a track"
        ctaHref="mailto:support@oscarpoon.ca?subject=Supporting a track"
        mediaSide="left"
        bg="white"
        media={<MusicPlayer />}
        extra={
          <div className="space-y-2.5">
            <span className="block text-[10px] font-bold tracking-widest uppercase text-zinc-400">
              Full songs available on
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
                className="flex items-center gap-2.5 text-sm font-semibold text-zinc-700 hover:text-red-600 transition-colors w-fit"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4L15.8 12Z" />
                </svg>
                <span>{track.title}</span>
              </a>
            ))}
          </div>
        }
      />

      <ProductSection
        id="toolbook"
        eyebrow="The Companion Manual"
        problem="267 questions built to make weight regain emotionally unacceptable."
        accent="sky"
        ctaLabel="Get the Toolbook"
        ctaHref="https://book.lsdiet.com/products-list"
        mediaSide="right"
        bg="tint"
        media={<ToolbookFlip />}
      />

      <Footer />
    </div>
  )
}
