import { Helmet } from 'react-helmet-async'

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Terms of Use | Oscar Poon</title>
        <meta
          name="description"
          content="The terms governing your use of oscarpoon.ca, operated by NTL Learning Solutions Inc."
        />
        <link rel="canonical" href="https://oscarpoon.ca/terms" />
        <meta property="og:title" content="Terms of Use | Oscar Poon" />
        <meta
          property="og:description"
          content="The terms governing your use of oscarpoon.ca."
        />
        <meta property="og:url" content="https://oscarpoon.ca/terms" />
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
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Terms of Use</h1>
        <p className="text-sm text-zinc-400 mb-10">Last updated: July 10, 2026</p>

        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
          <p>By accessing or using oscarpoon.ca, you agree to these Terms of Use.</p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Purpose of the Site</h2>
          <p>
            oscarpoon.ca is operated by NTL Learning Solutions Inc. as a personal hub for
            Oscar Poon's work — LSDiet, the Anti-Time-Theft Logger, original music, and the
            WPT Toolbook. It is an informational and linking site, not a store or service
            in itself.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">No Medical or Legal Advice</h2>
          <p>
            Nothing on this site constitutes medical, legal, or financial advice. Products
            linked from this site (such as LSDiet or the WPT Toolbook) provide their own
            disclaimers on their respective sites.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Third-Party Products</h2>
          <p>
            LSDiet, the Anti-Time-Theft Logger, and the WPT Toolbook are each governed by
            their own terms on their own platforms (lsdiet.com, the Chrome Web Store, and
            book.lsdiet.com respectively). These Terms of Use cover oscarpoon.ca only.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Intellectual Property</h2>
          <p>
            All content on this site — including text, graphics, video, audio, and code —
            is the property of NTL Learning Solutions Inc. unless otherwise noted.
            Unauthorized use is prohibited.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Limitation of Liability</h2>
          <p>
            NTL Learning Solutions Inc. is not liable for any direct, indirect, incidental,
            or consequential damages resulting from your use of this site or reliance on
            its content.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Governing Law</h2>
          <p>
            These Terms are governed by the laws of British Columbia, Canada. Any disputes
            arising from these Terms shall be resolved in the courts of British Columbia.
          </p>
        </div>
      </main>
    </div>
  )
}
