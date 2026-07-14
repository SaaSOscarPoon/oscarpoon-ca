import { Helmet } from 'react-helmet-async'
import Team from '../components/Team'

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Team | Oscar Poon</title>
        <meta name="description" content="The people behind oscarpoon.ca and everything built under it." />
        <link rel="canonical" href="https://oscarpoon.ca/teams" />
        <meta property="og:title" content="Team | Oscar Poon" />
        <meta property="og:description" content="The people behind oscarpoon.ca and everything built under it." />
        <meta property="og:url" content="https://oscarpoon.ca/teams" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
        <a href="/" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
          <span className="font-bold text-xs tracking-[0.25em] text-zinc-700 group-hover:text-black transition-colors">
            OSCAR POON
          </span>
        </a>
      </div>

      <main className="py-16">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-10 text-center max-w-2xl mx-auto px-6">
          Team
        </h1>
        <Team />
      </main>
    </div>
  )
}
