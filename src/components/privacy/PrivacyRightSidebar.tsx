import { Lock } from 'lucide-react'
import { PRIVACY_CONTACT_CONFIG } from '../../config/privacyConfig'
import PrivacyContactCard from './PrivacyContactCard'
import PrivacySafetyCard from './PrivacySafetyCard'
import PrivacyTrustCard from './PrivacyTrustCard'

interface PrivacyRightSidebarProps {
  onScrollTo: (hash: string) => void
  layout?: 'sidebar' | 'stack'
}

export default function PrivacyRightSidebar({
  onScrollTo,
  layout = 'sidebar',
}: PrivacyRightSidebarProps) {
  return (
    <aside
      className={`privacy-right-sidebar ${layout === 'sidebar' ? 'hidden lg:block' : 'block lg:hidden'}`}
      aria-label="Privacy trust information"
    >
      <div className="sticky top-[96px] space-y-4">
        <PrivacyTrustCard
          icon={
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple/15 text-accent-purple">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </div>
          }
          heading="We avoid saving what does not need to be saved."
          text="Core tools are designed to minimize storage of sensitive content."
        />

        <PrivacyTrustCard
          icon={
            <div className="privacy-trust-illustration flex h-16 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03]" aria-hidden="true">
              <Lock className="h-8 w-8 text-accent-purple/70" />
            </div>
          }
          heading="No emotional targeting."
          text="Private notes, artwork, and quiz answers are not used to choose advertisements."
          action={
            <button
              type="button"
              className="text-sm text-calm-cyan underline-offset-2 hover:underline"
              onClick={() => onScrollTo('cookies')}
            >
              Learn about cookies and ads
            </button>
          }
        />

        <PrivacyContactCard />

        <PrivacySafetyCard />

        {!PRIVACY_CONTACT_CONFIG.privacyEmail && import.meta.env.DEV && (
          <p className="text-xs text-text-muted">Privacy contact not configured.</p>
        )}
      </div>
    </aside>
  )
}
