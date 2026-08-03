import { Lock } from 'lucide-react'

export default function DrawingPrivacyNotice() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="inline-flex items-center justify-center gap-2 text-sm text-text-muted">
        <Lock className="h-4 w-4 shrink-0 text-calm-cyan" aria-hidden="true" />
        Your artwork stays on this device unless you choose to download it.
      </p>
      <p className="mt-2 text-xs text-text-muted/80">
        We do not save or upload your drawing.
      </p>
    </div>
  )
}
