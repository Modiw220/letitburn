import { Lock } from 'lucide-react'

export default function PrivacyNotice() {
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
