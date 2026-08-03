import { Loader2 } from 'lucide-react'

interface DonationVerificationProps {
  message?: string
}

export default function DonationVerification({
  message = 'Confirming your donation…',
}: DonationVerificationProps) {
  return (
    <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-card/70 p-5" aria-live="polite">
      <Loader2 className="h-5 w-5 animate-spin text-calm-cyan" aria-hidden="true" />
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  )
}
