import { useEffect } from 'react'
import { useFocusTrap } from '../../hooks/useFocusTrap'

interface KeyboardShortcutsDialogProps {
  open: boolean
  onClose: () => void
}

const shortcuts = [
  { keys: 'P', action: 'Pen' },
  { keys: 'B', action: 'Brush' },
  { keys: 'F', action: 'Fill (coloring templates)' },
  { keys: 'I', action: 'Eyedropper' },
  { keys: 'E', action: 'Eraser' },
  { keys: 'Ctrl/Cmd + Z', action: 'Undo' },
  { keys: 'Ctrl/Cmd + Shift + Z', action: 'Redo' },
  { keys: 'Ctrl/Cmd + Y', action: 'Redo' },
  { keys: 'Ctrl/Cmd + S', action: 'Download artwork' },
]

export default function KeyboardShortcutsDialog({
  open,
  onClose,
}: KeyboardShortcutsDialogProps) {
  const containerRef = useFocusTrap(open)

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
        className="relative z-10 w-full max-w-sm rounded-2xl border border-border-card bg-bg-secondary p-6 shadow-2xl"
      >
        <h2
          id="shortcuts-title"
          className="font-heading text-xl font-semibold text-text-main"
        >
          Keyboard shortcuts
        </h2>
        <ul className="mt-4 space-y-2">
          {shortcuts.map((item) => (
            <li
              key={item.keys}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-text-muted">{item.action}</span>
              <kbd className="rounded-md border border-border-card bg-bg-main px-2 py-1 font-mono text-xs text-text-main">
                {item.keys}
              </kbd>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl border border-border-card py-3 text-sm font-medium text-text-main"
        >
          Close
        </button>
      </div>
    </div>
  )
}
