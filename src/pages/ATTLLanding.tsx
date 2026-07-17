import { Helmet } from 'react-helmet-async'

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/anti-time-theft-logger/bniggplaeiohmnfbfiihengidickgbog'

const STEPS = [
  {
    title: 'Install the extension',
    body: 'One click from the Chrome Web Store. No account, no setup — it starts working the moment you install it.',
  },
  {
    title: 'Work like normal',
    body: 'ATTL quietly timestamps your active sessions in the background. You never have to open it or remember to clock in.',
  },
  {
    title: 'Pull up the ledger',
    body: 'Every session is written to a running log you can open any time — a plain record of when you worked, not a screenshot or a story.',
  },
  {
    title: 'Point to proof, not memory',
    body: "If a time-theft accusation ever comes up, you're not relying on your memory against theirs. You have a log that can't be quietly edited after the fact.",
  },
]

const FAQS = [
  {
    q: 'Why would I need this?',
    a: "Remote and hybrid work created a new accusation employers reach for: that you weren't really working. ATTL exists so that claim has to compete with a record, not just your word.",
  },
  {
    q: 'Can the log be edited after the fact — even by you, or by the developer?',
    a: 'No. Every entry is hash-chained and independently anchored, so any retroactive edit is detectable. See the full technical breakdown on the tamper-proof page.',
  },
  {
    q: 'Does it track anything besides session times?',
    a: 'No. ATTL logs when a work session starts and ends — not keystrokes, not screenshots, not which sites you visit. It is a time record, not surveillance software.',
  },
  {
    q: 'Is it free?',
    a: 'Yes, the core logger is free. The Chrome Web Store listing has current details on what is free versus premium.',
  },
]

export default function ATTLLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Anti-Time-Theft Logger — Proof You Were Working</title>
        <meta
          name="description"
          content="A free Chrome extension that keeps a tamper-proof log of your work sessions, so a time-theft accusation has to compete with a record instead of your word."
        />
        <link rel="canonical" href="https://oscarpoon.ca/attl" />
        <meta property="og:title" content="Anti-Time-Theft Logger — Proof You Were Working" />
        <meta
          property="og:description"
          content="A free Chrome extension that keeps a tamper-proof log of your work sessions."
        />
        <meta property="og:url" content="https://oscarpoon.ca/attl" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
          <span className="font-bold text-xs tracking-[0.25em] text-zinc-700 group-hover:text-black transition-colors">
            OSCAR POON
          </span>
        </a>
        <a
          href="/attl/tamper-proof"
          className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 hover:text-amber-600 transition-colors"
        >
          How it's tamper-proof →
        </a>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-8 md:pt-14 pb-14 md:pb-20 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold tracking-widest uppercase mb-6">
          Free Chrome extension
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 leading-[1.05] mb-5">
          Proof you were working,
          <br className="hidden md:block" /> not just your word for it.
        </h1>
        <p className="text-zinc-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-8">
          Anti-Time-Theft Logger quietly keeps a tamper-evident record of your work sessions in
          the background — so if a "you weren't really working" accusation ever lands on your
          desk, you have a log to point to instead of a memory to defend.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-amber-600 transition-colors"
          >
            Get the Chrome extension — free
          </a>
          <a
            href="/attl/tamper-proof"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-zinc-300 text-zinc-700 font-bold text-sm hover:border-amber-400 hover:text-amber-700 transition-colors"
          >
            See how the log can't be faked
          </a>
        </div>

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="relative aspect-[8/5] rounded-3xl overflow-hidden border border-zinc-200/80 bg-black shadow-xl">
            <video
              className="absolute inset-0 w-full h-full object-contain"
              src="/media/attl-demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
            <span className="absolute top-4 left-4 text-[9px] font-bold tracking-widest text-white/70 uppercase bg-black/40 backdrop-blur px-2 py-1 rounded">
              ATTL · Live demo
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#FAFAF9] border-y border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {STEPS.map((step, i) => (
              <div key={step.title} className="space-y-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white text-sm font-black">
                  {i + 1}
                </span>
                <h3 className="text-sm font-bold text-zinc-900">{step.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tamper-proof callout */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-900 text-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-3 text-center md:text-left">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">
              The part that actually matters
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              A log only proves anything if it can't be quietly edited later.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
              Every entry is hash-chained and independently anchored, so tampering is detectable —
              even by the app's own developer. Read the technical breakdown, or the plain-English
              version if code isn't your thing.
            </p>
          </div>
          <a
            href="/attl/tamper-proof"
            className="flex-shrink-0 inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-amber-500 text-zinc-900 font-bold text-sm hover:bg-amber-400 transition-colors whitespace-nowrap"
          >
            How the log is tamper-proof →
          </a>
        </div>
      </section>

      {/* Platform roadmap */}
      <section className="bg-[#FAFAF9] border-y border-zinc-100">
        <div className="max-w-2xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mb-3">
            Chrome today. Safari, iPhone, and Android next.
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto leading-relaxed">
            The Safari version is in build. iPhone and Android apps follow.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 text-center mb-10">
          Questions
        </h2>
        <div className="space-y-6">
          {FAQS.map((item) => (
            <div key={item.q} className="border-b border-zinc-100 pb-6">
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5">{item.q}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-zinc-100">
        <div className="max-w-2xl mx-auto px-6 py-16 md:py-20 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900">
            Start the log before you need it.
          </h2>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-amber-600 transition-colors"
          >
            Get the Chrome extension — free
          </a>
          <div className="pt-4">
            <a href="/" className="text-[11px] font-bold tracking-widest uppercase text-zinc-400 hover:text-black transition-colors">
              ← Back to oscarpoon.ca
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
