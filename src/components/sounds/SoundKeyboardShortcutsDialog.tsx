import { Keyboard, X } from 'lucide-react'
import { useEffect } from 'react'

interface SoundKeyboardShortcutsDialogProps {
  open: boolean
  onClose: () => void
}

const shortcuts = [
  { keys: 'Space', action: 'Play or pause selected sound' },
  { keys: 'S', action: 'Stop playback' },
  { keys: 'M', action: 'Mute or unmute' },
  { keys: '↑ / ↓', action: 'Increase or decrease volume by 5%' },
  { keys: 'T', action: 'Focus sleep timer controls' },
]

export default function SoundKeyboardShortcutsDialog({
  open,
  onClose,
}: SoundKeyboardShortcutsDialogProps) {
  useEffect(() => {
    if (!open) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-shortcuts-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border-card bg-bg-secondary p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id="keyboard-shortcuts-title"
            className="flex items-center gap-2 font-heading text-lg font-semibold text-text-main"
          >
            <Keyboard className="h-5 w-5 text-calm-cyan" aria-hidden="true" />
            Keyboard shortcuts
          </h2>
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-muted hover:text-text-main"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-5 space-y-3">
          {shortcuts.map((item) => (
            <li key={item.keys} className="flex items-center justify-between gap-4 text-sm">
              <span className="text-text-muted">{item.action}</span>
              <kbd className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-text-main">
                {item.keys}
              </kbd>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-text-muted">
          Shortcuts are disabled while typing in inputs or adjusting the volume slider.
        </p>
      </div>
    </div>
  )
}

export function KeyboardShortcutsButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-text-muted transition-colors hover:text-text-main"
      onClick={onOpen}
    >
      <Keyboard className="h-4 w-4" aria-hidden="true" />
      Keyboard shortcuts
    </button>
  )
}
