import type { KeyboardEvent } from 'react'
import { Loader2, Pause, Play } from 'lucide-react'
import { SOUND_ACCENT_COLORS, useSoundPlayer } from '../../context/SoundPlayerContext'
import type { SoundItem } from '../../types/sounds'
import SoundArtwork from './SoundArtwork'
import SoundWaveAnimation from './SoundWaveAnimation'
import { formatCategoryLabel, getSoundIcon } from './soundUtils'

interface SoundCardProps {
  sound: SoundItem
}

export default function SoundCard({ sound }: SoundCardProps) {
  const { selectedSound, status, playSoundFromCard, selectSound } = useSoundPlayer()

  const isSelected = selectedSound?.id === sound.id
  const isPlaying = isSelected && status === 'playing'
  const isPaused = isSelected && status === 'paused'
  const isLoading = isSelected && status === 'loading'
  const accentColor = SOUND_ACCENT_COLORS[sound.accent]
  const Icon = getSoundIcon(sound.accent)

  const actionLabel = isLoading
    ? 'Loading…'
    : isPlaying
      ? 'Pause'
      : isPaused
        ? 'Resume'
        : 'Play Sound'

  const handleCardKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      void selectSound(sound.id)
    }
  }

  return (
    <article
      className={`sound-card group rounded-2xl border bg-bg-card/70 transition-all ${
        isSelected
          ? 'sound-card--selected border-opacity-60'
          : 'border-border-card hover:border-white/20'
      }`}
      style={
        isSelected
          ? {
              borderColor: `${accentColor}66`,
              boxShadow: `0 0 32px ${accentColor}22`,
            }
          : undefined
      }
      tabIndex={0}
      onKeyDown={handleCardKeyDown}
      aria-label={`${sound.title}, ${formatCategoryLabel(sound.category)}`}
    >
      <SoundArtwork
        accent={sound.accent}
        artworkSrc={sound.artworkSrc}
        title={sound.title}
        className="rounded-b-none rounded-t-2xl border-0"
      />

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide"
              style={{
                borderColor: `${accentColor}44`,
                color: accentColor,
                backgroundColor: `${accentColor}14`,
              }}
            >
              {formatCategoryLabel(sound.category)}
            </span>
            <h3 className="mt-2 font-heading text-lg font-semibold text-text-main">
              {sound.title}
            </h3>
          </div>
          <Icon className="h-5 w-5 shrink-0 opacity-60" style={{ color: accentColor }} aria-hidden="true" />
        </div>

        <p className="mt-2 text-sm text-text-muted">{sound.description}</p>

        {isSelected && (
          <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: accentColor }}>
            {isPlaying ? (
              <>
                <SoundWaveAnimation active className="h-3.5" />
                <span>Playing</span>
              </>
            ) : isPaused ? (
              <span className="text-text-muted">Paused · Selected</span>
            ) : isLoading ? (
              <span className="text-text-muted">Loading…</span>
            ) : (
              <span className="text-text-muted">Selected</span>
            )}
          </div>
        )}

        <button
          type="button"
          className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-text-main transition-colors hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => void playSoundFromCard(sound.id)}
          disabled={isLoading}
          aria-pressed={isSelected}
          aria-label={`${actionLabel}: ${sound.title}`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4" aria-hidden="true" />
          )}
          {actionLabel}
        </button>
      </div>
    </article>
  )
}
