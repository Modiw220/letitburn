import { AlertCircle } from 'lucide-react'

interface AudioErrorNoticeProps {
  message: string
  onRetry: () => void
  onDismiss: () => void
}

export default function AudioErrorNotice({
  message,
  onRetry,
  onDismiss,
}: AudioErrorNoticeProps) {
  return (
    <div
      className="mt-4 rounded-xl border border-fire-orange/30 bg-fire-orange/5 px-4 py-4"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-fire-orange" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-text-main">{message}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-text-main transition-colors hover:bg-white/5"
              onClick={() => void onRetry()}
            >
              Try Again
            </button>
            <button
              type="button"
              className="min-h-[44px] rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text-main"
              onClick={onDismiss}
            >
              Choose Another Sound
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
