import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'LSDiet', href: '#lsdiet' },
  { label: 'ATTL', href: '#attl' },
  { label: 'Music', href: '#music' },
  { label: 'Toolbook', href: '#toolbook' },
]

type Accent = 'emerald' | 'amber' | 'indigo' | 'sky' | 'violet'

const ACCENT_STYLES: Record<
  Accent,
  { border: string; text: string; tagBorder: string; tagBg: string; ring: string }
> = {
  emerald: { border: 'border-t-emerald-500', text: 'text-emerald-600', tagBorder: 'border-emerald-200', tagBg: 'bg-emerald-50', ring: 'border-emerald-500/50 ring-emerald-500/10' },
  amber: { border: 'border-t-amber-500', text: 'text-amber-600', tagBorder: 'border-amber-200', tagBg: 'bg-amber-50', ring: 'border-amber-500/50 ring-amber-500/10' },
  indigo: { border: 'border-t-indigo-500', text: 'text-indigo-600', tagBorder: 'border-indigo-200', tagBg: 'bg-indigo-50', ring: 'border-indigo-500/50 ring-indigo-500/10' },
  sky: { border: 'border-t-sky-500', text: 'text-sky-600', tagBorder: 'border-sky-200', tagBg: 'bg-sky-50', ring: 'border-sky-500/50 ring-sky-500/10' },
  violet: { border: 'border-t-violet-500', text: 'text-violet-600', tagBorder: 'border-violet-200', tagBg: 'bg-violet-50', ring: 'border-violet-500/50 ring-violet-500/10' },
}

type CardMediaKind =
  | { type: 'video'; src: string }
  | { type: 'image'; src: string }
  | { type: 'gallery'; images: { src: string; caption: string }[] }
  | { type: 'saas' }
  | { type: 'covers' }
  | { type: 'book' }

const SAAS_PRODUCTS = [
  {
    title: 'Anti-Time-Theft Logger',
    tagline: '',
    href: '#attl',
    image: '/media/attl-static.jpg',
  },
  {
    title: 'NoMath',
    tagline: 'Canadian bill-splitting app that collects money for you',
    href: 'https://nomath.ca',
    image: '/media/nomath-static.jpg',
  },
]

const CARDS: {
  title: string
  category: string
  href: string
  tag: string
  accent: Accent
  media: CardMediaKind
}[] = [
  {
    title: 'LSDiet.com',
    category: 'WEIGHT REGAIN PREVENTION',
    href: '#lsdiet',
    tag: 'Free training',
    accent: 'emerald',
    media: {
      type: 'gallery',
      images: [
        { src: '/media/lsdiet-shot-1.jpg', caption: 'FREE Psych Class on Weight Loss' },
        { src: '/media/lsdiet-shot-2.jpg', caption: 'Real Client Videos' },
        { src: '/media/lsdiet-shot-3.jpg', caption: 'Why You Keep Losing and Regaining' },
      ],
    },
  },
  {
    title: SAAS_PRODUCTS[0].title,
    category: 'SaaS',
    href: SAAS_PRODUCTS[0].href,
    tag: 'Developed by Oscar',
    accent: 'amber',
    media: { type: 'saas' },
  },
  {
    title: 'Original Music',
    category: 'ORIGINAL SONGS',
    href: '#music',
    tag: 'Free to listen',
    accent: 'indigo',
    media: { type: 'covers' },
  },
  {
    title: 'Weight Permanence Toolbook',
    category: 'THE COMPANION MANUAL',
    href: '#toolbook',
    tag: '$500 value',
    accent: 'sky',
    media: { type: 'book' },
  },
]

function CardVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (active) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [active])

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-full object-cover pointer-events-none"
    />
  )
}

function CardImage({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      className="w-full h-full object-cover pointer-events-none select-none"
    />
  )
}

function CardGallery({
  images,
  active,
}: {
  images: { src: string; caption: string }[]
  active: boolean
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % images.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [active, images.length])

  return (
    <div className="relative w-full h-full bg-zinc-900">
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.caption}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-bottom transition-opacity duration-300"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
      <span className="absolute bottom-2 left-3 right-3 text-[9px] font-bold tracking-wider text-white/90 uppercase drop-shadow pointer-events-none">
        {images[idx].caption}
      </span>
    </div>
  )
}

function CardSaasImage({ productIdx }: { productIdx: number }) {
  return (
    <div className="relative w-full h-full bg-zinc-900">
      {SAAS_PRODUCTS.map((p, i) => (
        <img
          key={p.image}
          src={p.image}
          alt={p.title}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none select-none"
          style={{ opacity: i === productIdx ? 1 : 0 }}
        />
      ))}
    </div>
  )
}

const ALBUM_COVERS = [
  { src: '/media/cover-symphony.jpg', title: 'Symphony of Awakening' },
  { src: '/media/cover-emberlight.jpg', title: 'Emberlight' },
  { src: '/media/cover-feelit.jpg', title: 'Feel It' },
]

function MusicFlashcards({ active }: { active: boolean }) {
  const [coverIdx, setCoverIdx] = useState(0)

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setCoverIdx((i) => (i + 1) % ALBUM_COVERS.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [active])

  return (
    <div className="relative w-full h-full bg-zinc-900">
      {ALBUM_COVERS.map((cover, i) => (
        <img
          key={cover.src}
          src={cover.src}
          alt={`${cover.title} album art`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: i === coverIdx ? 1 : 0 }}
        />
      ))}
      <span className="absolute bottom-2 left-3 right-3 text-[9px] font-bold tracking-wider text-white/90 uppercase drop-shadow pointer-events-none">
        {ALBUM_COVERS[coverIdx].title}
      </span>
    </div>
  )
}

function MiniBook() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-sky-50 to-zinc-100">
      <div className="relative w-24 h-32 md:w-28 md:h-36 rounded-r-lg bg-gradient-to-br from-sky-500 to-blue-700 shadow-xl border border-sky-400/20 p-2.5 flex flex-col justify-between rotate-[-4deg]">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/15 rounded-l-sm" />
        <div className="pl-1">
          <span className="block text-[5px] md:text-[6px] font-black tracking-widest text-sky-100 uppercase">
            Weight Permanence
          </span>
          <span className="block text-[9px] md:text-[11px] font-black text-white leading-tight mt-0.5">
            THE TOOLBOOK
          </span>
        </div>
        <span className="pl-1 text-[5px] md:text-[6px] font-mono text-sky-100">Oscar Poon</span>
      </div>
    </div>
  )
}

function CardMedia({
  media,
  active,
  saasProductIdx,
}: {
  media: CardMediaKind
  active: boolean
  saasProductIdx: number
}) {
  if (media.type === 'video') return <CardVideo src={media.src} active={active} />
  if (media.type === 'image') return <CardImage src={media.src} />
  if (media.type === 'gallery') return <CardGallery images={media.images} active={active} />
  if (media.type === 'saas') return <CardSaasImage productIdx={saasProductIdx} />
  if (media.type === 'covers') return <MusicFlashcards active={active} />
  return <MiniBook />
}

const SAAS_CARD_INDEX = CARDS.findIndex((c) => c.media.type === 'saas')

export default function Hero() {
  const [rotation, setRotation] = useState(0)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [saasProductIdx, setSaasProductIdx] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280,
  )

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    let raf: number
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      // 0.004 rad per ~16ms frame, scaled to actual elapsed time so
      // speed stays constant regardless of the display's refresh rate
      setRotation((prev) => (prev + 0.004 * (dt / 16.6667)) % (Math.PI * 2))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const cardAngles = CARDS.map((_, idx) => (idx * 2 * Math.PI) / CARDS.length)
    let minDiff = Infinity
    let closestIndex = 0
    cardAngles.forEach((angle, idx) => {
      const currentAngle = (angle + rotation + Math.PI * 4) % (Math.PI * 2)
      const dist = Math.min(currentAngle, Math.PI * 2 - currentAngle)
      if (dist < minDiff) {
        minDiff = dist
        closestIndex = idx
      }
    })
    setActiveCardIndex(closestIndex)
  }, [rotation])

  useEffect(() => {
    if (activeCardIndex !== SAAS_CARD_INDEX) return
    const interval = setInterval(() => {
      setSaasProductIdx((i) => (i + 1) % SAAS_PRODUCTS.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [activeCardIndex])

  return (
    <section
      id="top"
      className="snap-section relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#F9F9FB]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] left-1/2 w-[900px] h-[700px] rounded-full blur-3xl bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0)_65%)]"
        animate={{
          x: ['-55%', '-45%', '-52%', '-55%'],
          y: [0, 30, -10, 0],
          scale: [1, 1.08, 0.97, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full blur-3xl bg-[radial-gradient(circle,rgba(56,189,248,0.10)_0%,rgba(56,189,248,0)_65%)]"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <header className="relative z-30 w-full">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
            <span className="font-bold text-xs tracking-[0.25em] text-zinc-700 group-hover:text-black transition-colors">
              OSCAR POON
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-black transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="relative z-30 text-center px-6 pt-2 pointer-events-none">
        <p className="text-[10px] tracking-[0.3em] font-extrabold text-emerald-600 uppercase mb-1">
          Health · Security · Music · Identity
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0F172A]">
          Building things I wish already existed
        </h1>
      </div>

      <div className="relative flex-1 w-full flex items-end justify-center select-none">
        <div className="relative w-full max-w-[1600px] h-full flex items-end justify-center">
          <div className="absolute bottom-0 h-full z-20 flex justify-center items-end pointer-events-none">
            <picture className="contents">
              <source srcSet="/media/oscar-portrait.webp" type="image/webp" />
              <img
                src="/media/oscar-portrait.png"
                alt="Oscar Poon"
                className="h-full w-auto object-contain object-bottom drop-shadow-[0_15px_40px_rgba(0,0,0,0.15)] select-none transform-gpu will-change-transform"
                draggable={false}
              />
            </picture>
            <div className="absolute bottom-0 w-40 h-4 bg-emerald-500/10 blur-lg rounded-full" />
          </div>

          {CARDS.map((card, idx) => {
            const cardAngleOffset = (idx * 2 * Math.PI) / CARDS.length
            const currentAngle = (rotation + cardAngleOffset) % (Math.PI * 2)

            const Rx = viewportWidth < 768 ? 200 : Math.min(420, viewportWidth * 0.22)
            const Ry = viewportWidth < 768 ? 20 : 30

            const x = Math.sin(currentAngle) * Rx
            const y = Math.cos(currentAngle) * Ry

            const scale = 0.78 + 0.24 * Math.cos(currentAngle)
            // animated blur() is expensive to repaint every frame — skip it on
            // mobile, where it was the main source of the rotation feeling laggy
            const blurAmount = viewportWidth < 768 ? 0 : (1 - Math.cos(currentAngle)) * 3
            // A binary front/back zIndex (30 vs 10) ties whenever two
            // adjacent cards are both in the "front" half at once, and CSS
            // then falls back to DOM order — so whichever card comes later
            // in CARDS always won the overlap, regardless of which one was
            // actually rotated further forward. Use a continuous value tied
            // to cos(angle) so the physically-closer card always wins.
            const zIndex = Math.round((Math.cos(currentAngle) + 1) * 500)
            // fading a card's whole element opacity dims its solid
            // background too, which reads as transparency again — cards
            // are opaque everywhere now, so skip the fade everywhere
            const opacity = 1
            const isFocus = activeCardIndex === idx
            const accent = ACCENT_STYLES[card.accent]
            const isSaas = idx === SAAS_CARD_INDEX
            const product = isSaas ? SAAS_PRODUCTS[saasProductIdx] : null
            const displayTitle = product ? product.title : card.title
            const displayHref = product ? product.href : card.href
            const isExternal = displayHref.startsWith('http')

            return (
              <a
                key={card.title}
                href={displayHref}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className={`absolute bottom-10 md:bottom-12 w-[260px] md:w-[300px] h-[clamp(280px,46vh,420px)] rounded-3xl flex flex-col border border-t-4 border-zinc-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.06)] bg-white select-none overflow-hidden will-change-[transform,opacity] ${
                  accent.border
                } ${isFocus ? `ring-1 ${accent.ring}` : ''}`}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) translateZ(0)`,
                  zIndex,
                  opacity,
                  filter: `blur(${blurAmount}px)`,
                  transition: 'opacity 0.15s ease-out',
                }}
                draggable={false}
              >
                <div className="px-5 pt-4 pb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[9px] font-extrabold tracking-widest uppercase ${accent.text}`}>
                      {card.category}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider border text-zinc-600 uppercase ${accent.tagBg} ${accent.tagBorder}`}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 tracking-tight text-center">{displayTitle}</h3>
                </div>
                <div className="flex-1 overflow-hidden">
                  <CardMedia media={card.media} active={isFocus} saasProductIdx={saasProductIdx} />
                </div>
              </a>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full max-w-md mx-auto pb-6 px-6 z-30 flex justify-between items-center pointer-events-none">
        <div className="flex gap-1.5">
          {CARDS.map((card, idx) => (
            <span
              key={card.title}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === idx ? 'w-8 bg-emerald-500' : 'w-2 bg-zinc-200'
              }`}
            />
          ))}
        </div>
        <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">Scroll down</span>
      </div>
    </section>
  )
}
