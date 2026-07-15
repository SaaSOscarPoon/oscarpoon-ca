import { Helmet } from 'react-helmet-async'

export default function ATTLTamperProof() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>How the Log Is Tamper-Proof | Anti-Time-Theft Logger</title>
        <meta
          name="description"
          content="Three mechanisms that make Anti-Time-Theft Logger's session log tamper-evident and independently verifiable — even by the app's own owner."
        />
        <link rel="canonical" href="https://oscarpoon.ca/attl/tamper-proof" />
        <meta property="og:title" content="How the Log Is Tamper-Proof | Anti-Time-Theft Logger" />
        <meta
          property="og:description"
          content="Three mechanisms that make the log tamper-evident and independently verifiable — even by the app's own owner."
        />
        <meta property="og:url" content="https://oscarpoon.ca/attl/tamper-proof" />
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
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">
          How the Log Is Tamper-Proof
        </h1>
        <p className="text-sm text-zinc-400 mb-10">Last updated: July 15, 2026</p>

        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
          <p>
            Anti-Time-Theft Logger exists to give you a session record you can point to with
            confidence in a dispute. That only works if the record can't quietly be changed after
            the fact — by anyone, including us. Below are the three mechanisms that make that true,
            and how each one protects you.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">1. Hash Chain</h2>
          <p>
            Every log entry is cryptographically linked to the one before it, like a chain of wax
            seals, each one calculated from everything that came before it. Change so much as a
            single character in an old entry, and that seal — and every seal after it — no longer
            matches.
          </p>
          <p>
            <strong>What this protects you from:</strong> anyone quietly editing or backdating a
            single past entry. The tampering isn't just against the rules — it's mathematically
            detectable.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">2. Append-Only Database</h2>
          <p>
            The database that stores your log entries is configured so that nothing running the
            app — including our own backend, automatically, 24/7 — is allowed to edit or delete a
            past entry. It's not a policy or a promise; the database itself refuses the request,
            the same way a locked door refuses a key that doesn't fit.
          </p>
          <p>
            <strong>What this protects you from:</strong> any automated process, bug, or misuse of
            an admin account silently altering your history. The only way a past entry is ever
            touched is a deliberate, individually-logged manual action by the database owner — for
            example, honoring a specific data-deletion request — never something invisible or
            automatic.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">3. Public, Independent Timestamping</h2>
          <p>
            Once a day, without any user involved, a fingerprint of the entire log is published
            to a{' '}
            <a
              href="https://github.com/SaaSOscarPoon/attl-transparency-log"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 hover:underline"
            >
              public, independent record
            </a>{' '}
            outside our own systems. No email, no notification — just a quiet, ongoing public
            trail that anyone can check.
          </p>
          <p>
            <strong>What this protects you from:</strong> wholesale deletion or recreation of the
            log. Even a full database wipe couldn't produce a fake history that matches a
            fingerprint already published on a previous day — and that mismatch is checkable by
            anyone, not just us.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">What This Doesn't Cover</h2>
          <p>
            These mechanisms prove a log entry wasn't altered after it was created. They don't
            verify what you were doing at your computer in the first place — that's between you
            and whoever you're accountable to. Our job is making sure your record stays exactly as
            it was recorded.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-3">Questions</h2>
          <p>
            For anything about how this works, email{' '}
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
