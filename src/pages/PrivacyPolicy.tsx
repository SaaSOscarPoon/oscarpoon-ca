import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy | Oscar Poon</title>
        <meta
          name="description"
          content="How oscarpoon.ca (NTL Learning Solutions Inc.) handles your personal information under Canadian privacy law."
        />
        <link rel="canonical" href="https://oscarpoon.ca/privacy" />
        <meta property="og:title" content="Privacy Policy | Oscar Poon" />
        <meta
          property="og:description"
          content="How oscarpoon.ca handles your personal information under Canadian privacy law."
        />
        <meta property="og:url" content="https://oscarpoon.ca/privacy" />
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
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-zinc-400 mb-10">Last updated: July 10, 2026</p>

        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
          <p>
            NTL Learning Solutions Inc., operating this site at oscarpoon.ca, respects your
            privacy and is committed to protecting your personal information in accordance
            with Canadian privacy law, including the Personal Information Protection and
            Electronic Documents Act (PIPEDA).
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">What This Site Does</h2>
          <p>
            oscarpoon.ca is a personal hub linking out to four independent products —
            LSDiet, the Anti-Time-Theft Logger, original music, and the WPT Toolbook. This
            site itself does not run analytics, does not use cookies, does not create
            accounts, and does not process payments. It links out to other sites (lsdiet.com,
            the Chrome Web Store, YouTube, book.lsdiet.com) that have their own privacy
            policies governing what happens once you leave oscarpoon.ca.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Information We Collect</h2>
          <p>
            The only information we receive directly is what you choose to send us — for
            example, by emailing support@oscarpoon.ca. We do not collect personal
            information through forms, cookies, or tracking scripts on this site.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">How We Use Information</h2>
          <p>
            Any information you send us directly (such as an email) is used only to respond
            to you. We do not sell or share this information with third parties.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Third-Party Links</h2>
          <p>
            This site links to lsdiet.com, the Chrome Web Store, YouTube, and
            book.lsdiet.com. Each of those destinations has its own privacy policy — this
            policy only covers oscarpoon.ca itself.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of any information you've
            sent us by contacting support@oscarpoon.ca.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Contact</h2>
          <p>
            For privacy inquiries, email{' '}
            <a href="mailto:support@oscarpoon.ca" className="text-emerald-600 hover:underline">
              support@oscarpoon.ca
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}
