import { useEffect } from 'react'
import { useFocusTrap } from '../../hooks/useFocusTrap'

interface ClearNoteDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ClearNoteDialog({
  open,
  onConfirm,
  onCancel,
}: ClearNoteDialogProps) {
  const containerRef = useFocusTrap(open)

  useEffect(() => {
    if (!open) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onCancel}
      />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-note-title"
        aria-describedby="clear-note-desc"
        className="relative z-10 w-full max-w-md rounded-2xl border border-border-card bg-bg-secondary p-6 shadow-2xl"
      >
        <h2
          id="clear-note-title"
          className="font-heading text-xl font-semibold text-text-main"
        >
          Clear this note?
        </h2>
        <p id="clear-note-desc" className="mt-3 text-sm leading-relaxed text-text-muted">
          This will permanently remove everything you wrote.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-border-card px-5 py-3 text-sm font-medium text-text-main transition-colors hover:border-white/25"
          >
            Keep Writing
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-text-main transition-colors hover:bg-white/15"
          >
            Clear Note
          </button>
        </div>
      </div>
    </div>
  )
}
