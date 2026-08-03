import { useState } from 'react'
import { SOUND_ACCENT_COLORS } from '../../context/SoundPlayerContext'
import type { SoundAccent } from '../../types/sounds'
import { getSoundIcon } from './soundUtils'

interface SoundArtworkProps {
  accent: SoundAccent
  artworkSrc?: string
  title: string
  className?: string
  large?: boolean
}

export default function SoundArtwork({
  accent,
  artworkSrc,
  title,
  className = '',
  large = false,
}: SoundArtworkProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const color = SOUND_ACCENT_COLORS[accent]
  const Icon = getSoundIcon(accent)
  const showImage = artworkSrc && !imageFailed

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 ${large ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/3]'} ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 20%, ${color}33, transparent 55%), linear-gradient(145deg, ${color}22, rgba(6, 16, 29, 0.9))`,
      }}
      aria-hidden="true"
    >
      {showImage ? (
        <img
          src={artworkSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          onError={() => setImageFailed(true)}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-main/70 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          className={large ? 'h-16 w-16 md:h-20 md:w-20' : 'h-10 w-10'}
          style={{ color }}
          strokeWidth={1.25}
        />
      </div>
      <span className="sr-only">{title} artwork</span>
    </div>
  )
}
