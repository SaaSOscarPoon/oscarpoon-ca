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
    body: "When a time-theft accusation comes up, you're not relying on your memory against theirs. You have a log that can't be quietly edited after the fact.",
  },
  {
    title: 'Always free',
    body: 'Your three most recent sessions are always 100% free, forever.',
  },
]

const FAQS = [
  {
    q: 'How does this protect me?',
    a: "Time-theft accusations don't need to be true to cost you your job. When one lands on you, ATTL gives you an automatic record of every session that can't be quietly edited — real evidence, not your word against theirs.",
  },
  {
    q: 'Can the log be edited after the fact — even by you, or by the developer?',
    a: 'No. Every entry is linked to the one before it with a cryptographic hash and independently anchored, so any retroactive edit is detectable. See the full technical breakdown on the tamper-proof page.',
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

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const PLATFORMS = [
  {
    name: 'Safari',
    progress: 70,
    status: 'Waiting on DUNS number',
    logo: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'iPhone',
    progress: 20,
    status: '(Coding)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
  },
  {
    name: 'Android',
    progress: 15,
    status: '(Coding)',
    logo: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
        <path d="M6 9v6a1 1 0 0 0 1 1h1v3a1.5 1.5 0 0 0 3 0v-3h2v3a1.5 1.5 0 0 0 3 0v-3h1a1 1 0 0 0 1-1V9H6z" />
        <circle cx="9" cy="6" r="1" />
        <circle cx="15" cy="6" r="1" />
        <path d="M8 8a4 4 0 0 1 8 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="10" x2="4" y2="15" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="10" x2="20" y2="15" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export default function ATTLLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Anti-Time-Theft Logger — Proof You Were Working</title>
        <meta
          name="description"
          content="A free Chrome extension that keeps a log of your work sessions that can't be edited after the fact, so a time-theft accusation has to compete with a record instead of your word."
        />
        <link rel="canonical" href="https://oscarpoon.ca/attl" />
        <meta property="og:title" content="Anti-Time-Theft Logger — Proof You Were Working" />
        <meta
          property="og:description"
          content="A free Chrome extension that keeps a log of your work sessions that can't be edited after the fact."
        />
        <meta property="og:url" content="https://oscarpoon.ca/attl" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(FAQ_LD)}</script>
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
          Runs quietly in the background, building a record nobody can secretly rewrite — so when
          a time-theft accusation shows up, you have proof instead of just your word.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6">
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
        <div className="rounded-3xl border border-zinc-200 bg-zinc-900 text-white p-8 md:p-12 space-y-8">
          <div className="text-center md:text-left space-y-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">
              The part that actually matters
            </span>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              A log only proves anything if it can't be quietly edited later. Here's what v1.5
              actually did about that.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-amber-500/30 bg-white/5 p-5 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-amber-400">
                🤓 For nerds
              </span>
              <ul className="text-zinc-300 text-xs leading-relaxed space-y-2 list-disc list-inside">
                <li>SHA-256 hash chain — every row's hash is derived from the row before it</li>
                <li>UPDATE and DELETE revoked at the grant level, even from our own service role</li>
                <li>A daily cron job anchors the chain tip to a public GitHub repo</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-700 bg-white/5 p-5 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-zinc-300">
                🧒 In plain English
              </span>
              <ul className="text-zinc-300 text-xs leading-relaxed space-y-2 list-disc list-inside">
                <li>Every entry is sealed to the one before it, like a chain of wax seals</li>
                <li>Nobody, not even us, can quietly edit or delete a past entry</li>
                <li>We publish a daily fingerprint of the log so nobody can secretly rewrite history</li>
              </ul>
            </div>
          </div>

          <div className="text-center md:text-left">
            <a
              href="/attl/tamper-proof"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-amber-500 text-zinc-900 font-bold text-sm hover:bg-amber-400 transition-colors whitespace-nowrap"
            >
              How the log is tamper-proof →
            </a>
          </div>
        </div>
      </section>

      {/* Platform roadmap */}
      <section className="bg-[#FAFAF9] border-y border-zinc-100">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mb-3">
            Chrome today. Safari, iPhone, and Android next.
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto leading-relaxed mb-12">
            Chrome is live now. Here's where the rest of the platforms stand.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col items-center gap-3"
              >
                <div className="text-zinc-700">{platform.logo}</div>
                <span className="text-sm font-bold text-zinc-900">{platform.name}</span>
                <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${platform.progress}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
                  {platform.status}
                </span>
              </div>
            ))}
          </div>
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
