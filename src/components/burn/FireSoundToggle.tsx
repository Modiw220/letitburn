import { Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { FIRE_SOUND_STORAGE_KEY } from '../../types/burn'

interface FireSoundToggleProps {
  disabled?: boolean
  onChange?: (enabled: boolean) => void
}

function readPreference(): boolean {
  try {
    return localStorage.getItem(FIRE_SOUND_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export default function FireSoundToggle({
  disabled = false,
  onChange,
}: FireSoundToggleProps) {
  const [enabled, setEnabled] = useState(readPreference)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    onChangeRef.current?.(enabled)
  }, [enabled])

  useEffect(() => {
    try {
      localStorage.setItem(FIRE_SOUND_STORAGE_KEY, String(enabled))
    } catch {
      /* ignore storage errors */
    }
  }, [enabled])

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setEnabled((value) => !value)}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:text-text-main disabled:cursor-not-allowed disabled:opacity-50"
      aria-pressed={enabled}
      aria-label={enabled ? 'Disable fire sound' : 'Enable fire sound'}
    >
      {enabled ? (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      ) : (
        <VolumeX className="h-4 w-4" aria-hidden="true" />
      )}
      Fire sound
    </button>
  )
}
