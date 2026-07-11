import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const PAGE_STACK = [
  { offset: 6, rotate: 1.6, shade: 'bg-zinc-100' },
  { offset: 4, rotate: 1.0, shade: 'bg-zinc-50' },
  { offset: 2, rotate: 0.4, shade: 'bg-white' },
]

export default function ToolbookFlip() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen((v) => !v)}
        className="relative w-60 h-80 cursor-pointer select-none"
        style={{ perspective: '1600px' }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          {/* stacked page depth behind the cover/content */}
          {PAGE_STACK.map((p, i) => (
            <div
              key={i}
              aria-hidden
              className={`absolute inset-0 rounded-r-xl border border-zinc-200/80 shadow-md ${p.shade}`}
              style={{
                transform: `translate3d(${p.offset}px, ${p.offset}px, ${-6 - i * 4}px) rotateZ(${p.rotate}deg)`,
              }}
            />
          ))}

          {/* content page — real WPT Toolbook content, revealed once the cover opens */}
          <motion.div
            className="absolute inset-0 bg-white rounded-r-xl border border-zinc-200 shadow-inner p-5 flex flex-col justify-between"
            style={{ transform: 'translate3d(0,0,-2px)' }}
            animate={{ opacity: isOpen ? 1 : 0.9, x: isOpen ? 0 : -4 }}
            transition={{ duration: 0.5, delay: isOpen ? 0.25 : 0 }}
          >
            <div>
              <span className="text-[8px] font-black text-sky-600 tracking-widest uppercase">
                WPT Toolbook
              </span>
              <h4 className="text-xs font-bold text-zinc-800 leading-snug mt-1">
                267 Awareness Questions · 5 Stages
              </h4>
              <div className="mt-3 space-y-1.5 text-[10px] text-zinc-500 font-medium">
                <p>01 — Reality Awareness</p>
                <p>02 — Friction Awareness</p>
                <p>03 — Pattern Awareness</p>
                <p>04 — Consequence Awareness</p>
                <p>05 — Identity Awareness</p>
              </div>
              <p className="mt-3 text-[10px] text-zinc-400 italic leading-relaxed border-t border-zinc-100 pt-2">
                "You do not gain 100 lbs from one meal. Just like you do not become
                healthy from one salad."
              </p>
            </div>
            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">
              book.lsdiet.com
            </span>
          </motion.div>

          {/* front cover, flips open on click */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-sky-500 to-blue-700 text-white rounded-r-xl p-5 flex flex-col justify-between shadow-2xl border border-sky-400/20"
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              translateZ: 2,
            }}
            animate={{ rotateY: isOpen ? -150 : 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/15 rounded-l-md" />
            <div className="pl-1">
              <span className="text-[9px] font-black tracking-widest text-sky-100 uppercase block">
                Weight Permanence
              </span>
              <h4 className="text-base font-black tracking-tight leading-tight mt-1">
                THE TOOLBOOK
              </h4>
              <p className="text-[9px] text-sky-100/80 leading-snug mt-2 max-w-[150px]">
                A tool to make weight regain emotionally unacceptable.
              </p>
            </div>
            <div className="pl-1 pt-4 border-t border-white/20 flex justify-between items-center">
              <span className="text-[9px] font-mono text-sky-100 tracking-wider">Oscar Poon</span>
              <span className="text-[8px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded">
                {isOpen ? 'Open' : 'Tap'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
        Click the cover to open it
      </span>
    </div>
  )
}
