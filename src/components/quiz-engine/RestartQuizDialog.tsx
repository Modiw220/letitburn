import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useQuizEngine } from '../../hooks/useQuizEngine'

export default function RestartQuizDialog() {
  const { restartDialogOpen, confirmRestart, cancelRestart } = useQuizEngine()
  const trapRef = useFocusTrap(restartDialogOpen)

  if (!restartDialogOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="restart-dialog-title"
        className="w-full max-w-md rounded-2xl border border-border-card bg-bg-secondary p-6 shadow-2xl"
      >
        <h2 id="restart-dialog-title" className="font-heading text-lg font-semibold text-text-main">
          Start again?
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          This will clear your current answers and result.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            type="button"
            className="min-h-[48px] rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-text-main"
            onClick={confirmRestart}
          >
            Start Again
          </button>
          <button
            type="button"
            className="min-h-[48px] rounded-xl border border-calm-cyan/30 bg-calm-cyan/10 px-5 py-3 text-sm font-semibold text-calm-cyan"
            onClick={cancelRestart}
          >
            Keep Result
          </button>
        </div>
      </div>
    </div>
  )
}
