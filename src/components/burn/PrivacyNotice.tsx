import { Lock } from 'lucide-react'

interface PrivacyNoticeProps {
  compact?: boolean
}

export default function PrivacyNotice({ compact = false }: PrivacyNoticeProps) {
  if (compact) {
    return (
      <div className="text-left">
        <p className="inline-flex items-start gap-2 text-xs leading-relaxed text-text-muted md:text-sm">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-calm-cyan" aria-hidden="true" />
          <span>
            Your note stays in this tab only and is cleared when burned. Nothing is saved or
            sent anywhere.
          </span>
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg text-center">
      <p className="inline-flex items-center justify-center gap-2 text-sm text-text-muted">
        <Lock className="h-4 w-4 shrink-0 text-calm-cyan" aria-hidden="true" />
        Your note stays only in this browser tab and is permanently cleared
        when burned.
      </p>
      <p className="mt-2 text-xs text-text-muted/80">
        Nothing you write here is saved or sent anywhere.
      </p>
    </div>
  )
}
