import { useRef, useState } from 'react'

interface VideoCardProps {
  src: string
  label: string
  aspect?: 'portrait' | 'wide'
}

export default function VideoCard({ src, label, aspect = 'portrait' }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    if (!next) video.play()
    setMuted(next)
  }

  return (
    <div
      className={`relative ${
        aspect === 'wide' ? 'aspect-[8/5]' : 'aspect-[4/5]'
      } rounded-3xl overflow-hidden border border-zinc-200/80 bg-black shadow-xl`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain"
        autoPlay
        loop
        muted={muted}
        playsInline
        src={src}
      />
      <span className="absolute top-4 left-4 text-[9px] font-bold tracking-widest text-white/70 uppercase bg-black/40 backdrop-blur px-2 py-1 rounded">
        {label}
      </span>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-4 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur text-white/90 hover:bg-black/60 transition-colors"
      >
        {muted ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63z" />
            <path d="M19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71z" />
            <path d="M4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z" />
            <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </div>
  )
}
