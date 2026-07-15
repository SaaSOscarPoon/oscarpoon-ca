import { useEffect, useRef, useState } from 'react'

interface JournalEntry {
  title: string
  slug: string
  url: string
  image: string | null
  date: string
  readTimeMinutes: number | null
  topic: string | null
}

interface JustPublishedFeed {
  generatedAt: string
  entries: JournalEntry[]
}

const FEED_URL = 'https://lsdiet.com/just-published.json'
const ITEM_HEIGHT = 34

function formatDate(iso: string): string {
  // Date-only ISO strings ("2026-07-15") parse as UTC midnight, which rolls
  // back a day in western timezones once toLocaleDateString converts to
  // local time. Forcing a local-time parse avoids that (same fix lsdiet-repo
  // uses in BlogPage.tsx's formatShortDate).
  const datePart = iso.length === 10 ? `${iso}T00:00:00` : iso
  const d = new Date(datePart)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogDial() {
  const [entries, setEntries] = useState<JournalEntry[] | null>(null)
  const [error, setError] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const trackRef = useRef<HTMLDivElement>(null)
  const zoneRef = useRef<HTMLDivElement>(null)
  const total = entries?.length ?? 0
  const virtualIndexRef = useRef(0)
  const isTransitioningRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    fetch(FEED_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`)
        return r.json() as Promise<JustPublishedFeed>
      })
      .then((data) => {
        if (cancelled) return
        setEntries(data.entries.slice(0, 6))
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!total) return
    virtualIndexRef.current = total
    positionTrack(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  function centerOffset() {
    const el = zoneRef.current
    if (!el) return 0
    return (el.getBoundingClientRect().height - ITEM_HEIGHT) / 2
  }

  function positionTrack(animate: boolean) {
    const track = trackRef.current
    if (!track) return
    const y = centerOffset() - virtualIndexRef.current * ITEM_HEIGHT
    track.style.transition = animate ? 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' : 'none'
    if (animate) isTransitioningRef.current = true
    track.style.transform = `translateY(${y}px)`
  }

  function move(direction: number) {
    if (isTransitioningRef.current || !total) return
    virtualIndexRef.current += direction
    const newActive = ((virtualIndexRef.current % total) + total) % total
    setActiveIndex(newActive)
    positionTrack(true)
  }

  function goTo(vIdx: number) {
    if (vIdx === virtualIndexRef.current) return
    move(vIdx - virtualIndexRef.current)
  }

  useEffect(() => {
    const track = trackRef.current
    const zone = zoneRef.current
    if (!track || !zone || !total) return

    function onTransitionEnd() {
      isTransitioningRef.current = false
      if (virtualIndexRef.current >= total * 2) {
        virtualIndexRef.current -= total
        positionTrack(false)
      } else if (virtualIndexRef.current < total) {
        virtualIndexRef.current += total
        positionTrack(false)
      }
    }

    let lastWheel = 0
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const now = Date.now()
      if (now - lastWheel < 300) return
      lastWheel = now
      move(e.deltaY > 0 ? 1 : -1)
    }

    let startY = 0
    function onTouchStart(e: TouchEvent) {
      startY = e.touches[0].clientY
    }
    function onTouchEnd(e: TouchEvent) {
      const diff = startY - e.changedTouches[0].clientY
      if (Math.abs(diff) > 25) move(diff > 0 ? 1 : -1)
    }

    function onResize() {
      positionTrack(false)
    }

    track.addEventListener('transitionend', onTransitionEnd)
    zone.addEventListener('wheel', onWheel, { passive: false })
    zone.addEventListener('touchstart', onTouchStart, { passive: true })
    zone.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      track.removeEventListener('transitionend', onTransitionEnd)
      zone.removeEventListener('wheel', onWheel)
      zone.removeEventListener('touchstart', onTouchStart)
      zone.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  if (error || (entries && entries.length === 0)) return null
  if (!entries) {
    return (
      <section id="journal" className="snap-section relative w-full min-h-[100dvh] flex items-center bg-[#050606]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
          <div className="rounded-[18px] h-[64vh] max-h-[560px] animate-pulse bg-white/5" />
        </div>
      </section>
    )
  }

  const active = entries[activeIndex]

  return (
    <section
      id="journal"
      className="snap-section relative w-full min-h-[100dvh] flex items-center bg-[#050606] text-[#f3f4f6]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
        <div className="rounded-[18px] overflow-hidden">
          <div className="relative h-[54vh] min-h-[300px] max-h-[480px] md:h-[56vh] md:max-h-[520px] overflow-hidden">
            {entries.map((e, i) => (
              <div
                key={e.slug}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ backgroundImage: e.image ? `url(${e.image})` : undefined, opacity: i === activeIndex ? 1 : 0 }}
              />
            ))}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, #050606 8%, rgba(5,6,6,0.65) 45%, rgba(5,6,6,0.2) 75%)' }}
            />

            <div className="relative z-[2] h-full px-5 md:px-[52px] py-5 md:py-8 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <span
                  className="inline-block w-fit text-[10px] font-semibold uppercase tracking-[0.25em] px-4 py-2 rounded-full border"
                  style={{ color: '#f59e0b', background: 'rgba(0,0,0,0.6)', borderColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(6px)' }}
                >
                  Currently learning
                </span>
                <p
                  className="hidden md:block text-[12px] tracking-wide text-right max-w-[320px] leading-[1.5] pt-2"
                  style={{ color: '#a1a1aa', fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace' }}
                >
                  // Three times a week I write up what I'm learning about weight, psychology, and behaviour
                </p>
              </div>

              <div className="flex-1 flex flex-col justify-center md:justify-end min-h-0">
                <p
                  className="md:hidden text-[11px] tracking-wide mb-2 text-center"
                  style={{ color: '#f59e0b', fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace' }}
                >
                  {formatDate(active.date)}
                </p>
                <a href={active.url} target="_blank" rel="noreferrer">
                  <h2
                    className="text-[1.9rem] md:text-6xl font-light text-white cursor-pointer transition-colors duration-300 hover:text-amber-500 text-center md:text-left"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      lineHeight: 1.22,
                      letterSpacing: '0.01em',
                      maxWidth: 820,
                      textDecoration: 'underline',
                      textDecorationColor: 'rgba(63,63,70,0.5)',
                      textDecorationThickness: '1px',
                      textUnderlineOffset: '6px',
                      textWrap: 'balance',
                    }}
                  >
                    {active.title}
                  </h2>
                </a>
              </div>

              <div className="flex flex-wrap gap-2 justify-between items-center mt-4 md:mt-7">
                <a
                  href={active.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-white uppercase tracking-[0.14em] text-[9px] md:text-[10px] hover:text-amber-500 transition-colors group"
                >
                  <span>Tap to read the article (free)</span>
                  <span className="w-8 h-px bg-zinc-600 group-hover:w-16 group-hover:bg-amber-500 transition-all duration-500" />
                </a>
                <span
                  className="text-[10px] md:text-[11px] tracking-wide"
                  style={{ color: '#71717a', fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace' }}
                >
                  {active.readTimeMinutes ? `EST. ${active.readTimeMinutes} MIN READ` : 'FREE TO READ'}
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-4 md:gap-7 px-4 md:px-10 py-3 md:py-4"
            style={{ background: 'rgba(9,10,9,0.92)' }}
          >
            <div className="hidden md:block w-[120px] shrink-0">
              <span className="block text-[9.5px] uppercase tracking-[0.16em] text-zinc-600 mb-1">Published</span>
              <div className="text-sm text-zinc-300">{formatDate(active.date)}</div>
            </div>

            <div className="flex-1 relative h-[80px] md:h-[92px] max-w-[640px] mx-auto overflow-hidden">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => move(-1)}
                className="absolute z-10 top-0.5 left-1/2 -translate-x-1/2 w-[20px] h-[20px] rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:border-amber-500 transition-colors"
                style={{ background: 'rgba(9,10,9,0.9)' }}
              >
                ↑
              </button>
              <div
                className="absolute inset-x-0 top-0 h-[22px] z-[5] pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(9,10,9,0.95), transparent)' }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[22px] z-[5] pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(9,10,9,0.95), transparent)' }}
              />
              <div ref={zoneRef} className="w-full h-full relative overflow-hidden" style={{ cursor: 'ns-resize' }}>
                <div ref={trackRef} className="flex flex-col items-center absolute w-full">
                  {[0, 1, 2].flatMap((loop) =>
                    entries.map((e, idx) => {
                      const vIdx = loop * total + idx
                      return (
                        <button
                          type="button"
                          key={vIdx}
                          onClick={() => goTo(vIdx)}
                          className="h-[34px] w-full flex items-center justify-center px-8 shrink-0 font-light text-[13px] md:text-sm transition-colors"
                          style={{ color: idx === activeIndex && loop === 1 ? '#f59e0b' : '#6b7280' }}
                        >
                          <span className="truncate whitespace-nowrap overflow-hidden max-w-full">{e.title}</span>
                        </button>
                      )
                    }),
                  )}
                </div>
              </div>
              <button
                type="button"
                aria-label="Next"
                onClick={() => move(1)}
                className="absolute z-10 bottom-0.5 left-1/2 -translate-x-1/2 w-[20px] h-[20px] rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-amber-500 hover:border-amber-500 transition-colors"
                style={{ background: 'rgba(9,10,9,0.9)' }}
              >
                ↓
              </button>
            </div>
          </div>

          <div
            className="md:hidden px-4 py-2.5 text-center"
            style={{ background: 'rgba(9,10,9,0.92)' }}
          >
            <span
              className="text-[10px] tracking-wide"
              style={{ color: '#71717a', fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace' }}
            >
              // I write what I'm learning — 3 articles a week.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
