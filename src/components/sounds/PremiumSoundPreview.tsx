import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  Check,
  Heart,
  Lock,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { premiumSoundFeatures } from '../../data/premiumSoundFeatures'
import { useEntitlements } from '../../context/EntitlementsContext'

const iconMap = {
  sliders: SlidersHorizontal,
  heart: Heart,
  sparkles: Sparkles,
  badge: BadgeCheck,
} as const

export default function PremiumSoundPreview() {
  const { hasSoundMixer, isAdFree, hasEntitlement, hasPack } = useEntitlements()

  function isOwned(check: (typeof premiumSoundFeatures)[number]['entitlementCheck']): boolean {
    if (check === 'sound-mixer') return hasSoundMixer
    if (check === 'ad-free') return isAdFree
    return hasEntitlement('premium-sounds') || hasPack('night-rain')
  }

  const ownedCount = premiumSoundFeatures.filter((feature) =>
    isOwned(feature.entitlementCheck),
  ).length

  return (
    <section
      id="premium-preview"
      className="mt-14 rounded-3xl border border-border-card bg-bg-card/40 p-6 md:mt-16 md:p-8"
      aria-labelledby="premium-preview-heading"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
        Optional upgrades
      </p>
      <h2
        id="premium-preview-heading"
        className="mt-2 font-heading text-2xl font-semibold text-text-main md:text-3xl"
      >
        Build your own atmosphere.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-text-muted md:text-base">
        {ownedCount > 0
          ? `You own ${ownedCount} of ${premiumSoundFeatures.length} listening upgrades.`
          : 'Unlock mixing, saved blends, and quieter listening when you want them.'}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {premiumSoundFeatures.map((feature) => {
          const Icon = iconMap[feature.icon]
          const owned = isOwned(feature.entitlementCheck)

          return (
            <div
              key={feature.id}
              className={`relative rounded-2xl border p-5 ${
                owned
                  ? 'border-calm-cyan/25 bg-calm-cyan/8'
                  : 'border-white/8 bg-bg-main/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-text-muted">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                    owned
                      ? 'border-calm-cyan/30 text-calm-cyan'
                      : 'border-white/10 text-text-muted'
                  }`}
                >
                  {owned ? (
                    <>
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Owned
                    </>
                  ) : (
                    <>
                      <Lock className="h-3 w-3" aria-hidden="true" />
                      Available
                    </>
                  )}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-text-main">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{feature.description}</p>
              {!owned && (
                <Link
                  to="/pricing"
                  className="mt-4 inline-flex text-sm font-medium text-calm-cyan hover:underline"
                >
                  View on pricing
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
