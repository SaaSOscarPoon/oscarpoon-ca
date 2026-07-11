import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Accent = 'emerald' | 'amber' | 'indigo' | 'sky'

const ACCENT_TEXT: Record<Accent, string> = {
  emerald: 'text-emerald-600',
  amber: 'text-amber-600',
  indigo: 'text-indigo-600',
  sky: 'text-sky-600',
}

const ACCENT_HOVER: Record<Accent, string> = {
  emerald: 'hover:text-emerald-600',
  amber: 'hover:text-amber-600',
  indigo: 'hover:text-indigo-600',
  sky: 'hover:text-sky-600',
}

interface ProductSectionProps {
  id: string
  eyebrow: string
  problem: string
  accent: Accent
  ctaLabel: string
  ctaHref: string
  mediaSide: 'left' | 'right'
  media: ReactNode
  extra?: ReactNode
  bg?: 'white' | 'tint'
  mediaMaxWidth?: string
}

export default function ProductSection({
  id,
  eyebrow,
  problem,
  accent,
  ctaLabel,
  ctaHref,
  mediaSide,
  media,
  extra,
  bg = 'white',
  mediaMaxWidth = 'max-w-md',
}: ProductSectionProps) {
  const textOrder = mediaSide === 'left' ? 'md:order-2' : 'md:order-1'
  const mediaOrder = mediaSide === 'left' ? 'md:order-1' : 'md:order-2'

  return (
    <section
      id={id}
      className={`snap-section relative min-h-screen w-full flex items-center border-t border-zinc-200/60 ${
        bg === 'white' ? 'bg-white' : 'bg-[#F9F9FB]'
      }`}
    >
      <div className="max-w-6xl w-full mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div className={`${mediaOrder} flex justify-center`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`w-full ${mediaMaxWidth}`}
          >
            {media}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className={`${textOrder} space-y-7`}
        >
          <span className={`text-xs font-bold tracking-[0.25em] uppercase ${ACCENT_TEXT[accent]}`}>
            {eyebrow}
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 leading-[1.15] tracking-tight">
            {problem}
          </h2>

          {extra}

          <div className="pt-2">
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-bold text-zinc-900 transition-colors ${ACCENT_HOVER[accent]}`}
            >
              <span>{ctaLabel}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
