import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useQuizEngine } from '../../hooks/useQuizEngine'

interface QuizDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

function QuizDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: QuizDialogProps) {
  const trapRef = useFocusTrap(open)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-dialog-title"
        className="w-full max-w-md rounded-2xl border border-border-card bg-bg-secondary p-6 shadow-2xl"
      >
        <h2 id="quiz-dialog-title" className="font-heading text-lg font-semibold text-text-main">
          {title}
        </h2>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            type="button"
            className="min-h-[48px] rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-text-main"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            className="min-h-[48px] rounded-xl border border-calm-cyan/30 bg-calm-cyan/10 px-5 py-3 text-sm font-semibold text-calm-cyan"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ExitQuizDialog() {
  const {
    exitDialogOpen,
    leaveDialogOpen,
    confirmExit,
    cancelExit,
    confirmLeave,
    stayOnQuiz,
  } = useQuizEngine()

  return (
    <>
      <QuizDialog
        open={exitDialogOpen}
        title="Leave this check-in?"
        description="Your answers will be cleared when you leave."
        confirmLabel="Leave Quiz"
        cancelLabel="Continue Check-In"
        onConfirm={confirmExit}
        onCancel={cancelExit}
      />
      <QuizDialog
        open={leaveDialogOpen}
        title="Leave this quiz?"
        description="Your answers and current result will be cleared."
        confirmLabel="Leave and Clear"
        cancelLabel="Stay"
        onConfirm={confirmLeave}
        onCancel={stayOnQuiz}
      />
    </>
  )
}
