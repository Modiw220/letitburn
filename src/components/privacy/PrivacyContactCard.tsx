import { PRIVACY_CONTACT_CONFIG } from '../../config/privacyConfig'
import PrivacyTrustCard from './PrivacyTrustCard'

export default function PrivacyContactCard() {
  if (!PRIVACY_CONTACT_CONFIG.privacyEmail) {
    return (
      <PrivacyTrustCard
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-calm-cyan/10 text-calm-cyan">
            <span className="text-sm font-semibold">@</span>
          </div>
        }
        heading="Questions about privacy?"
        text="Contact us using the verified privacy address when it is published."
      />
    )
  }

  return (
    <PrivacyTrustCard
      icon={
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-calm-cyan/10 text-calm-cyan">
          <span className="text-sm font-semibold">@</span>
        </div>
      }
      heading="Questions about privacy?"
      text="Contact us using the verified privacy address."
      action={
        <a
          href={`mailto:${PRIVACY_CONTACT_CONFIG.privacyEmail}`}
          className="text-sm text-calm-cyan underline-offset-2 hover:underline"
        >
          {PRIVACY_CONTACT_CONFIG.privacyEmail}
        </a>
      }
    />
  )
}
