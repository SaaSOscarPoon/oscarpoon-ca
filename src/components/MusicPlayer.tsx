import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TRACKS = [
  { title: 'Symphony of Awakening', mood: 'Sample', src: '/media/track-symphony.mp3' },
  { title: 'Emberlight', mood: 'Sample', src: '/media/track-emberlight.mp3' },
  { title: 'Feel It', mood: 'Sample', src: '/media/track-feelit.mp3' },
]

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playingIdx, setPlayingIdx] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    const onEnd = () => {
      setPlayingIdx(null)
      setProgress(0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggleTrack = (idx: number) => {
    const audio = audioRef.current
    if (!audio) return

    if (playingIdx === idx) {
      audio.pause()
      setPlayingIdx(null)
      return
    }

    audio.src = TRACKS[idx].src
    audio.currentTime = 0
    audio.play()
    setPlayingIdx(idx)
    setProgress(0)
  }

  return (
    <div className="bg-[#F9F9FB] border border-zinc-200/80 rounded-2xl p-5 space-y-2 shadow-sm">
      <audio ref={audioRef} />
      {TRACKS.map((track, idx) => {
        const isActive = playingIdx === idx
        return (
          <button
            key={track.title}
            onClick={() => toggleTrack(idx)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-colors text-left ${
              isActive
                ? 'bg-indigo-500/10 border-indigo-500/30'
                : 'bg-white border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <span
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border ${
                isActive ? 'border-indigo-400 text-indigo-500' : 'border-zinc-300 text-zinc-500'
              }`}
            >
              {isActive ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </span>

            <span className="flex-1 min-w-0">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-bold text-zinc-900 truncate">{track.title}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex-shrink-0">
                  {track.mood}
                </span>
              </span>
              <span className="mt-2 block h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                <motion.span
                  className="block h-full bg-indigo-500 rounded-full"
                  animate={{ width: `${isActive ? progress * 100 : 0}%` }}
                  transition={{ ease: 'linear', duration: 0.15 }}
                />
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
