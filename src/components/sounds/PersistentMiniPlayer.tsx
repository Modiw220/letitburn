import { ChevronUp, Pause, Play, Square, Timer, Volume2, VolumeX } from 'lucide-react'
import { SOUND_ACCENT_COLORS, useSoundPlayer } from '../../context/SoundPlayerContext'
import { getSoundIcon } from './soundUtils'
import VolumeControl from './VolumeControl'

interface PersistentMiniPlayerProps {
  visible: boolean
  onScrollToPlayer: () => void
}

export default function PersistentMiniPlayer({
  visible,
  onScrollToPlayer,
}: PersistentMiniPlayerProps) {
  const {
    selectedSound,
    status,
    volume,
    muted,
    timerActive,
    timerFormatted,
    togglePlayPause,
    stop,
    toggleMute,
    setVolume,
  } = useSoundPlayer()

  if (!selectedSound || !visible) return null

  const accentColor = SOUND_ACCENT_COLORS[selectedSound.accent]
  const Icon = getSoundIcon(selectedSound.accent)
  const isPlaying = status === 'playing'

  return (
    <div
      className="sound-mini-player fixed inset-x-0 bottom-0 z-40 border-t border-border-card bg-bg-secondary/95 px-4 py-3 backdrop-blur-md md:inset-x-auto md:left-1/2 md:max-w-[760px] md:-translate-x-1/2 md:rounded-t-2xl md:border md:border-b-0"
      role="region"
      aria-label="Mini sound player"
    >
      <div className="mx-auto flex max-w-[760px] flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5"
            style={{ color: accentColor }}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-text-main">{selectedSound.title}</p>
            {timerActive && (
              <p className="flex items-center gap-1 text-xs text-calm-cyan">
                <Timer className="h-3 w-3" aria-hidden="true" />
                {timerFormatted}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-main"
            onClick={() => void togglePlayPause()}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5 translate-x-0.5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-muted hover:text-text-main"
            onClick={stop}
            aria-label="Stop"
          >
            <Square className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-muted hover:text-text-main sm:hidden"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            aria-pressed={muted}
          >
            {muted ? (
              <VolumeX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Volume2 className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <div className="hidden min-w-[140px] sm:block">
            <VolumeControl
              volume={volume}
              muted={muted}
              onVolumeChange={setVolume}
              onToggleMute={toggleMute}
              compact
            />
          </div>

          <button
            type="button"
            className="flex min-h-[44px] items-center gap-1 rounded-lg px-2 text-xs font-medium text-text-muted hover:text-text-main"
            onClick={onScrollToPlayer}
            aria-label="Scroll to full player"
          >
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
            <span className="hidden md:inline">Player</span>
          </button>
        </div>
      </div>
    </div>
  )
}
