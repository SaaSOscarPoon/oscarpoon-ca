const TEAM = [
  {
    name: 'Oscar Poon',
    role: 'Founder',
    initials: 'OP',
    bio: 'Lost and regained 80+ lbs three times before building Weight Permanence Training to make weight regain emotionally unacceptable — now runs NTL Learning Solutions Inc. and everything under this roof.',
  },
  {
    name: 'Jam',
    role: 'Video Editor',
    initials: 'J',
    bio: '[bio placeholder — details to come]',
  },
]

export default function Team() {
  return (
    <div className="max-w-2xl mx-auto px-6 mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
      {TEAM.map((member) => (
        <div
          key={member.name}
          className="rounded-2xl border border-zinc-200/80 bg-[#F9F9FB] p-5 flex items-start gap-4"
        >
          <span className="flex-shrink-0 w-11 h-11 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-bold tracking-wide">
            {member.initials}
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-zinc-900">{member.name}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                {member.role}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
