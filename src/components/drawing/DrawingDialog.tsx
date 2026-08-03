import { useEffect } from 'react'
import { useFocusTrap } from '../../hooks/useFocusTrap'

interface DialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  destructive?: boolean
}

export default function DrawingDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Keep Drawing',
  onConfirm,
  onCancel,
  destructive = false,
}: DialogProps) {
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
        aria-labelledby="drawing-dialog-title"
        aria-describedby="drawing-dialog-desc"
        className="relative z-10 w-full max-w-md rounded-2xl border border-border-card bg-bg-secondary p-6 shadow-2xl"
      >
        <h2
          id="drawing-dialog-title"
          className="font-heading text-xl font-semibold text-text-main"
        >
          {title}
        </h2>
        <p
          id="drawing-dialog-desc"
          className="mt-3 text-sm leading-relaxed text-text-muted"
        >
          {description}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-border-card px-5 py-3 text-sm font-medium text-text-main transition-colors hover:border-white/25"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 ${
              destructive
                ? 'bg-white/10 text-text-main hover:bg-white/15'
                : 'btn-primary-glow bg-gradient-to-r from-accent-purple to-calm-cyan'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
