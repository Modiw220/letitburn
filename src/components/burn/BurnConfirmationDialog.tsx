import { Flame } from 'lucide-react'
import { useEffect } from 'react'
import { useFocusTrap } from '../../hooks/useFocusTrap'

interface BurnConfirmationDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function BurnConfirmationDialog({
  open,
  onConfirm,
  onCancel,
}: BurnConfirmationDialogProps) {
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
        aria-labelledby="burn-confirm-title"
        aria-describedby="burn-confirm-desc"
        className="relative z-10 w-full max-w-md rounded-2xl border border-border-card bg-bg-secondary p-6 shadow-2xl"
      >
        <h2
          id="burn-confirm-title"
          className="font-heading text-xl font-semibold text-text-main"
        >
          Ready to let this go?
        </h2>
        <p id="burn-confirm-desc" className="mt-3 text-sm leading-relaxed text-text-muted">
          Once the note burns, the words cannot be recovered.
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
            className="btn-primary-glow inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fire-orange to-bright-orange px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <Flame className="h-4 w-4" aria-hidden="true" />
            Burn It
          </button>
        </div>
      </div>
    </div>
  )
}
