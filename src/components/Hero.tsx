import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'LSDiet', href: '#lsdiet' },
  { label: 'ATTL', href: '#attl' },
  { label: 'Music', href: '#music' },
  { label: 'Toolbook', href: '#toolbook' },
]

type Accent = 'emerald' | 'amber' | 'indigo' | 'sky'

const ACCENT_STYLES: Record<
  Accent,
  { border: string; text: string; tagBorder: string; tagBg: string; ring: string }
> = {
  emerald: { border: 'border-t-emerald-500', text: 'text-emerald-600', tagBorder: 'border-emerald-200', tagBg: 'bg-emerald-50', ring: 'border-emerald-500/50 ring-emerald-500/10' },
  amber: { border: 'border-t-amber-500', text: 'text-amber-600', tagBorder: 'border-amber-200', tagBg: 'bg-amber-50', ring: 'border-amber-500/50 ring-amber-500/10' },
  indigo: { border: 'border-t-indigo-500', text: 'text-indigo-600', tagBorder: 'border-indigo-200', tagBg: 'bg-indigo-50', ring: 'border-indigo-500/50 ring-indigo-500/10' },
  sky: { border: 'border-t-sky-500', text: 'text-sky-600', tagBorder: 'border-sky-200', tagBg: 'bg-sky-50', ring: 'border-sky-500/50 ring-sky-500/10' },
}

const CARDS: {
  title: string
  category: string
  desc: string
  href: string
  tag: string
  accent: Accent
}[] = [
  {
    title: 'LSDiet.com',
    category: 'WEIGHT REGAIN PREVENTION',
    desc: 'Free, science-backed training built to end the weight-regain cycle.',
    href: '#lsdiet',
    tag: 'Free training',
    accent: 'emerald',
  },
  {
    title: 'Anti-Time-Theft Logger',
    category: 'TIME-THEFT DEFENSE',
    desc: 'A private, time-stamped log that protects you from time-theft claims.',
    href: '#attl',
    tag: 'Chrome Extension',
    accent: 'amber',
  },
  {
    title: 'Original Music',
    category: 'ORIGINAL SONGS',
    desc: 'Vocal tracks that turn the weight-loss journey into music.',
    href: '#music',
    tag: 'Free to listen',
    accent: 'indigo',
  },
  {
    title: 'WPT Toolbook',
    category: 'THE COMPANION MANUAL',
    desc: '267 questions, 5 stages, one rebuilt identity.',
    href: '#toolbook',
    tag: 'Interactive Toolbook',
    accent: 'sky',
  },
]

function CardMotif({ accent }: { accent: Accent }) {
  if (accent === 'emerald') {
    return (
      <svg
        aria-hidden
        viewBox="0 0 200 60"
        className="absolute left-0 right-0 bottom-14 h-10 w-full opacity-[0.12] pointer-events-none"
        preserveAspectRatio="none"
      >
        <polyline
          points="0,45 25,40 45,48 70,20 95,30 120,10 145,25 170,15 200,5"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="240"
          style={{ animation: 'sparkline-draw 3.5s ease-in-out infinite alternate' }}
        />
      </svg>
    )
  }
  if (accent === 'amber') {
    return (
      <div className="absolute top-5 right-5 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-[8px] font-mono font-bold tracking-widest text-amber-500/70 uppercase">
          Logging
        </span>
      </div>
    )
  }
  if (accent === 'indigo') {
    return (
      <div className="absolute left-5 right-5 bottom-14 h-4 flex items-end gap-[3px] opacity-[0.18] pointer-events-none">
        {[6, 12, 8, 16, 10, 14, 7, 11, 5, 13, 9, 15].map((h, i) => (
          <span
            key={i}
            className="flex-1 bg-indigo-500 rounded-full origin-bottom"
            style={{
              height: `${h}px`,
              animation: `waveform-bounce ${0.6 + (i % 4) * 0.15}s ease-in-out infinite`,
              animationDelay: `${i * 0.07}s`,
            }}
          />
        ))}
      </div>
    )
  }
  return (
    <div
      aria-hidden
      className="absolute top-0 right-0 w-7 h-7 pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, transparent 50%, rgba(14,165,233,0.18) 50%)',
        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
      }}
    />
  )
}

export default function Hero() {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280,
  )
  const dragStartRef = useRef<number | null>(null)

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (isDragging) return
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.004) % (Math.PI * 2))
    }, 16)
    return () => clearInterval(interval)
  }, [isDragging])

  useEffect(() => {
    const cardAngles = CARDS.map((_, idx) => (idx * Math.PI) / 2)
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

  const handleDragStart = (clientX: number) => {
    dragStartRef.current = clientX
    setIsDragging(true)
  }

  const handleDragMove = (clientX: number) => {
    if (dragStartRef.current === null) return
    const diff = clientX - dragStartRef.current
    setRotation((prev) => (prev - diff * 0.0025) % (Math.PI * 2))
    dragStartRef.current = clientX
  }

  const handleDragEnd = () => {
    dragStartRef.current = null
    setIsDragging(false)
  }

  return (
    <section
      id="top"
      className="snap-section relative h-screen w-full flex flex-col overflow-hidden bg-[#F9F9FB]"
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
          I built these to solve different problems.
        </h1>
        <p className="text-zinc-500 text-xs mt-1 max-w-md mx-auto font-medium">
          Drag to see all four
        </p>
      </div>

      <div
        className="relative flex-1 w-full flex items-end justify-center cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => isDragging && handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div className="relative w-full max-w-[1600px] h-full flex items-end justify-center">
          <div className="absolute bottom-0 h-full z-20 flex justify-center items-end pointer-events-none">
            <img
              src="/media/oscar-portrait.png"
              alt="Oscar Poon"
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_15px_40px_rgba(0,0,0,0.15)] select-none"
              draggable={false}
            />
            <div className="absolute bottom-0 w-40 h-4 bg-emerald-500/10 blur-lg rounded-full" />
          </div>

          {CARDS.map((card, idx) => {
            const cardAngleOffset = (idx * Math.PI) / 2
            const currentAngle = (rotation + cardAngleOffset) % (Math.PI * 2)

            const Rx = viewportWidth < 768 ? 200 : Math.min(420, viewportWidth * 0.22)
            const Ry = viewportWidth < 768 ? 20 : 30

            const x = Math.sin(currentAngle) * Rx
            const y = Math.cos(currentAngle) * Ry

            const scale = 0.78 + 0.24 * Math.cos(currentAngle)
            const blurAmount = (1 - Math.cos(currentAngle)) * 3
            const zIndex = Math.cos(currentAngle) > 0 ? 30 : 10
            const opacity = 0.65 + 0.35 * Math.cos(currentAngle)
            const isFocus = activeCardIndex === idx
            const accent = ACCENT_STYLES[card.accent]

            return (
              <a
                key={card.title}
                href={card.href}
                className={`absolute bottom-8 md:bottom-12 w-[240px] h-[280px] md:w-[300px] md:h-[340px] rounded-3xl p-5 md:p-6 flex flex-col justify-between border border-t-4 border-zinc-200/80 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.06)] bg-white/85 select-none overflow-hidden ${
                  accent.border
                } ${isFocus ? `ring-1 ${accent.ring}` : ''}`}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  zIndex,
                  opacity,
                  filter: `blur(${blurAmount}px)`,
                  transition: isDragging ? 'none' : 'opacity 0.15s ease-out',
                }}
                draggable={false}
              >
                <CardMotif accent={card.accent} />
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-extrabold tracking-widest uppercase ${accent.text}`}>
                      {card.category}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider border text-zinc-600 ${accent.tagBg} ${accent.tagBorder}`}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 tracking-tight">{card.title}</h3>
                  <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase">View</span>
                  <div className="p-1 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-600">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
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
