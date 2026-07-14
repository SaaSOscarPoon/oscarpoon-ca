import { Helmet } from 'react-helmet-async'

const PROFILE_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://oscarpoon.ca/about',
  mainEntity: { '@id': 'https://oscarpoon.ca/#oscar-poon' },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Oscar Poon</title>
        <meta
          name="description"
          content="Oscar Poon lost 80+ lbs three times and regained it every time, until a near-fatal COVID illness forced a rebuild. Founder of NTL Learning Solutions Inc. — LSDiet, the Anti-Time-Theft Logger, and original music."
        />
        <link rel="canonical" href="https://oscarpoon.ca/about" />
        <meta property="og:title" content="About Oscar Poon" />
        <meta
          property="og:description"
          content="Founder of NTL Learning Solutions Inc. — LSDiet, the Anti-Time-Theft Logger, and original music."
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://oscarpoon.ca/about" />
        <script type="application/ld+json">{JSON.stringify(PROFILE_LD)}</script>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
        <a href="/" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
          <span className="font-bold text-xs tracking-[0.25em] text-zinc-700 group-hover:text-black transition-colors">
            OSCAR POON
          </span>
        </a>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-10">About Oscar Poon</h1>

        <div className="space-y-5 text-zinc-700 leading-relaxed text-base md:text-lg">
          <p>
            A near-fatal COVID illness forced a health reckoning. Oscar Poon had already lost and
            regained 80+ lbs three separate times using strict calorie counting, then extreme
            keto — this time he built{' '}
            <a href="https://lsdiet.com" className="text-emerald-600 hover:underline">
              Weight Permanence Training™
            </a>{' '}
            instead of another diet cycle.
          </p>
          <p>
            He holds a BA in Psychology from Simon Fraser University and spent 10 years as a
            surgical market data consultant, studying how decision-makers in high-stakes
            environments change their behaviour under pressure — the same question he later
            turned on his own relationship with food.
          </p>
          <p>
            He's the founder of NTL Learning Solutions Inc., based in Vancouver, BC. Under that
            roof:{' '}
            <a href="https://lsdiet.com" className="text-emerald-600 hover:underline">
              LSDiet
            </a>{' '}
            and Weight Permanence Training, a free system to stop weight regain; the{' '}
            <a href="/#attl" className="text-emerald-600 hover:underline">
              Anti-Time-Theft Logger
            </a>
            , a Chrome extension that protects employees from time-theft accusations; original
            music connected to the LSDiet transformation story; and the WPT Toolbook, a
            360-question self-awareness workbook.
          </p>
          <p className="text-sm text-zinc-500">
            Full weight-loss story at{' '}
            <a href="https://lsdiet.com/oscar-poon" className="text-emerald-600 hover:underline">
              lsdiet.com/oscar-poon
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
