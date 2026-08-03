import { Loader2, Pause, Play, Square } from 'lucide-react'
import type { AudioStatus } from '../../types/sounds'

interface PlaybackControlsProps {
  status: AudioStatus
  onPlayPause: () => void
  onStop: () => void
  disabled?: boolean
  size?: 'default' | 'large'
}

export default function PlaybackControls({
  status,
  onPlayPause,
  onStop,
  disabled = false,
  size = 'default',
}: PlaybackControlsProps) {
  const isPlaying = status === 'playing'
  const isLoading = status === 'loading'
  const playDisabled = disabled || isLoading || status === 'idle'
  const stopDisabled = disabled || status === 'idle' || status === 'loading'

  const playBtnClass =
    size === 'large'
      ? 'h-16 w-16 md:h-[72px] md:w-[72px]'
      : 'h-12 w-12'

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className={`flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-text-main transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40 ${playBtnClass}`}
        onClick={onPlayPause}
        disabled={playDisabled}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
        ) : isPlaying ? (
          <Pause className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Play className="h-6 w-6 translate-x-0.5" aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-text-muted transition-colors hover:text-text-main disabled:cursor-not-allowed disabled:opacity-40"
        onClick={onStop}
        disabled={stopDisabled}
        aria-label="Stop"
      >
        <Square className="mr-2 h-4 w-4" aria-hidden="true" />
        Stop
      </button>
    </div>
  )
}
