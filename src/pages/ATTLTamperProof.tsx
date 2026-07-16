import { Helmet } from 'react-helmet-async'

const Code = ({ children }: { children: string }) => (
  <pre className="bg-zinc-900 text-zinc-100 text-xs md:text-sm rounded-lg p-4 overflow-x-auto not-prose">
    <code>{children}</code>
  </pre>
)

export default function ATTLTamperProof() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>How the Log Is Tamper-Proof | Anti-Time-Theft Logger</title>
        <meta
          name="description"
          content="Three mechanisms that make Anti-Time-Theft Logger's session log tamper evident and independently verifiable, even by the app's own owner. Technical and plain-English detail."
        />
        <link rel="canonical" href="https://oscarpoon.ca/attl/tamper-proof" />
        <meta property="og:title" content="How the Log Is Tamper-Proof | Anti-Time-Theft Logger" />
        <meta
          property="og:description"
          content="Three mechanisms that make the log tamper evident and independently verifiable, even by the app's own owner."
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

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">
          How the Log Is Tamper-Proof
        </h1>
        <p className="text-sm text-zinc-400 mb-10">Last updated: July 15, 2026</p>

        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
          <p>
            Anti-Time-Theft Logger exists to give you a session record you can point to with
            confidence in a dispute. That only works if the record can't quietly be changed after
            the fact, by anyone, including us. Below are the three mechanisms that make that true,
            each explained twice: once for a professional coder who wants to verify the claim
            directly, and once in plain English.
          </p>

          {/* ============ 1. HASH CHAIN ============ */}
          <h2 className="text-2xl font-bold text-zinc-900 mt-12 mb-4 pb-2 border-b border-zinc-200">
            1. Hash Chain
          </h2>

          <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-400 mt-6 mb-2">
            Technical
          </h3>
          <p>
            Every row inserted into the <code>device_logs</code> table passes through a Postgres{' '}
            <code>before insert</code> trigger. The trigger reads the <code>entry_hash</code> of
            the most recent row (serialized against concurrent inserts with{' '}
            <code>pg_advisory_xact_lock</code>, so two rows can never read the same tip and fork
            the chain), then computes:
          </p>
          <Code>{`new.prev_hash := coalesce(last_hash, repeat('0', 64));
new.entry_hash := encode(
  digest(
    new.prev_hash || new.device_id || coalesce(new.license_key, '')
    || new.entry::text || new.created_at::text,
    'sha256'
  ),
  'hex'
);`}</Code>
          <p>
            Each entry's hash is a function of the previous entry's hash plus its own content, so
            the table forms a singly linked hash chain identical in structure to a blockchain's
            block chain (minus the distributed consensus). Mutating any historical row's{' '}
            <code>device_id</code>, <code>license_key</code>, <code>entry</code>, or{' '}
            <code>created_at</code> changes what that row's <code>entry_hash</code> should be,
            which no longer matches the value every subsequent row was chained against. Verifying
            integrity is just recomputing the chain from row 1 and confirming the tip matches.
          </p>

          <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-400 mt-6 mb-2">
            Plain English
          </h3>
          <p>
            Every log entry is cryptographically linked to the one before it, like a chain of wax
            seals, each one calculated from everything that came before it. Change so much as a
            single character in an old entry, and that seal, and every seal after it, no longer
            matches.
          </p>

          <p>
            <strong>What this protects you from:</strong> anyone quietly editing or backdating a
            single past entry. The tampering isn't just against the rules, it's mathematically
            detectable.
          </p>

          {/* ============ 2. APPEND-ONLY DATABASE ============ */}
          <h2 className="text-2xl font-bold text-zinc-900 mt-12 mb-4 pb-2 border-b border-zinc-200">
            2. Append-Only Database
          </h2>

          <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-400 mt-6 mb-2">
            Technical
          </h3>
          <p>
            Row Level Security on <code>device_logs</code> grants <code>anon</code> an insert-only
            policy (no update or delete policy exists for it, and RLS defaults to deny). That
            alone doesn't stop us: Supabase's <code>service_role</code> bypasses RLS entirely.
            So the privilege is revoked at the grant level, for every role our own application
            ever authenticates as:
          </p>
          <Code>{`revoke update, delete on public.device_logs
  from anon, authenticated, service_role;`}</Code>
          <p>
            After this statement runs, no API call, no Edge Function, and no bug in our own
            backend can issue an <code>UPDATE</code> or <code>DELETE</code> against this table.
            Only the underlying Postgres owner role, reachable solely through the Supabase
            dashboard's SQL editor under separate account authentication, retains those
            privileges, and Supabase logs that access path independently of our application.
          </p>

          <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-400 mt-6 mb-2">
            Plain English
          </h3>
          <p>
            The database that stores your log entries is configured so that nothing running the
            app, including our own backend, automatically, 24 hours a day, is allowed to edit or
            delete a past entry. It's not a policy or a promise; the database itself refuses the
            request, the same way a locked door refuses a key that doesn't fit.
          </p>
          <p>
            <strong>What this protects you from:</strong> any automated process, bug, or misuse of
            an admin account silently altering your history. The only way a past entry is ever
            touched is a deliberate, individually logged manual action by the database owner, for
            example honouring a specific data deletion request, never something invisible or
            automatic.
          </p>

          {/* ============ 3. PUBLIC TIMESTAMPING ============ */}
          <h2 className="text-2xl font-bold text-zinc-900 mt-12 mb-4 pb-2 border-b border-zinc-200">
            3. Public, Independent Timestamping
          </h2>

          <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-400 mt-6 mb-2">
            Technical
          </h3>
          <p>
            A hash chain and a revoked grant stop edits to existing rows, but neither stops
            someone with database owner access from truncating the table and replaying a
            fabricated history from scratch, a new chain is just as internally consistent as the
            real one. Closing that gap requires an external, independent witness to what the
            chain looked like on a given day. A scheduled job (<code>pg_cron</code> +{' '}
            <code>pg_net</code>, <code>0 8 * * *</code> UTC) invokes an Edge Function that reads
            the current chain tip and commits it, via the GitHub Contents API, to a public
            repository this application has no standing write access to outside that one
            scoped token:
          </p>
          <Code>{`PUT /repos/SaaSOscarPoon/attl-transparency-log/contents/anchors/2026-07-15.json
{
  "date": "2026-07-15",
  "tip_hash": "d35bb4cf...b547473",
  "entry_count": 30
}`}</Code>
          <p>
            The commit is also mirrored into a read-only Postgres table (<code>log_anchors</code>,
            anon <code>select</code> granted, update and delete revoked from every role) so the
            history of published anchors is queryable from the same API the log itself uses.
            Anyone can independently verify a given day's entries against that day's published
            hash by rerunning the chain formula above and comparing the result. See the live
            record:{' '}
            <a
              href="https://github.com/SaaSOscarPoon/attl-transparency-log"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 hover:underline"
            >
              github.com/SaaSOscarPoon/attl-transparency-log
            </a>
            .
          </p>

          <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-400 mt-6 mb-2">
            Plain English
          </h3>
          <p>
            To be clear about what actually gets published: <strong>never your log itself, only a
            fingerprint of it.</strong> Think of a fingerprint like feeding the entire log through
            a shredder that always turns the same input into the exact same confetti pattern, and
            any change, even one letter, into a completely different pattern. There's no way to
            run the confetti backwards and reconstruct what went in. So once a day, we shred the
            log and publish only the resulting pattern, a short scrambled code, to a public page
            outside our own systems. Nobody looking at it, not your employer, not a stranger, not
            even us, can see your session times, your notes, or anything else about you from it.
            All it's good for is confirming whether a given day's log matches the pattern we
            published for that day. No email, no notification, just that pattern quietly posted
            where anyone can compare it.
          </p>
          <p>
            <strong>What this protects you from:</strong> wholesale deletion or recreation of the
            log. Even a full database wipe couldn't produce a fake history that matches a
            fingerprint already published on a previous day, and that mismatch is checkable by
            anyone, not just us.
          </p>

          {/* ============ SCOPE ============ */}
          <h2 className="text-2xl font-bold text-zinc-900 mt-12 mb-4 pb-2 border-b border-zinc-200">
            What This Doesn't Cover
          </h2>
          <p>
            These mechanisms prove a log entry wasn't altered after it was created. They don't
            verify what you were doing at your computer in the first place, that's between you
            and whoever you're accountable to. Our job is making sure your record stays exactly as
            it was recorded.
          </p>

          <h2 className="text-2xl font-bold text-zinc-900 mt-12 mb-4 pb-2 border-b border-zinc-200">
            Questions
          </h2>
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
