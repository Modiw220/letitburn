import { Link } from 'react-router-dom'
import PrivacyTrustCard from './PrivacyTrustCard'

export default function PrivacySafetyCard() {
  return (
    <PrivacyTrustCard
      icon={
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04] text-text-muted">
          <span className="text-sm font-semibold">+</span>
        </div>
      }
      heading="Need support?"
      text="If you need immediate help, visit the Safety Resources page."
      action={
        <Link
          to="/safety-resources"
          className="inline-flex min-h-[44px] items-center text-sm font-medium text-calm-cyan underline-offset-2 hover:underline"
        >
          View Resources
        </Link>
      }
    />
  )
}
