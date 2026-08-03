import { Volume2, VolumeX } from 'lucide-react'

interface VolumeControlProps {
  volume: number
  muted: boolean
  onVolumeChange: (value: number) => void
  onToggleMute: () => void
  compact?: boolean
}

export default function VolumeControl({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
  compact = false,
}: VolumeControlProps) {
  const displayVolume = muted ? 0 : volume

  return (
    <div className={`flex items-center gap-3 ${compact ? 'flex-1' : ''}`}>
      <button
        type="button"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-muted transition-colors hover:text-text-main"
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        aria-pressed={muted}
      >
        {muted || volume === 0 ? (
          <VolumeX className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Volume2 className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {!compact && (
          <label htmlFor="sound-volume" className="text-xs font-medium text-text-muted">
            Volume
          </label>
        )}
        <div className="flex items-center gap-3">
          <input
            id="sound-volume"
            type="range"
            min={0}
            max={100}
            step={1}
            value={displayVolume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="sound-volume-slider min-h-[44px] flex-1 cursor-pointer"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={displayVolume}
            aria-valuetext={`${displayVolume} percent`}
          />
          <span className="w-10 shrink-0 text-right text-xs tabular-nums text-text-muted">
            {displayVolume}%
          </span>
        </div>
      </div>
    </div>
  )
}
