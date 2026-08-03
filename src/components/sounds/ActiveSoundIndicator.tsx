import { Loader2 } from 'lucide-react'
import type { AudioStatus } from '../../types/sounds'
import SoundWaveAnimation from './SoundWaveAnimation'

interface ActiveSoundIndicatorProps {
  status: AudioStatus
  accentColor: string
}

export default function ActiveSoundIndicator({
  status,
  accentColor,
}: ActiveSoundIndicatorProps) {
  if (status === 'loading') {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-text-muted">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        Loading sound…
      </span>
    )
  }

  if (status === 'playing') {
    return (
      <span className="inline-flex items-center gap-2 text-sm" style={{ color: accentColor }}>
        <SoundWaveAnimation active className="h-4 text-current" />
        Playing
      </span>
    )
  }

  if (status === 'paused') {
    return <span className="text-sm text-text-muted">Paused</span>
  }

  if (status === 'stopped') {
    return <span className="text-sm text-text-muted">Stopped</span>
  }

  if (status === 'ready') {
    return <span className="text-sm text-text-muted">Ready</span>
  }

  return null
}
