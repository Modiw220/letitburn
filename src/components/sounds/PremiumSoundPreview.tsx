import {
  BadgeCheck,
  Heart,
  Lock,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'
import { premiumSoundFeatures } from '../../data/premiumSoundFeatures'

const iconMap = {
  sliders: SlidersHorizontal,
  heart: Heart,
  sparkles: Sparkles,
  badge: BadgeCheck,
} as const

export default function PremiumSoundPreview() {
  return (
    <section
      id="premium-preview"
      className="mt-14 rounded-3xl border border-border-card bg-bg-card/40 p-6 md:mt-16 md:p-8"
      aria-labelledby="premium-preview-heading"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
        Coming later
      </p>
      <h2
        id="premium-preview-heading"
        className="mt-2 font-heading text-2xl font-semibold text-text-main md:text-3xl"
      >
        Build your own atmosphere.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-text-muted md:text-base">
        More listening tools are planned for the future.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {premiumSoundFeatures.map((feature) => {
          const Icon = iconMap[feature.icon]
          return (
            <div
              key={feature.id}
              className="relative rounded-2xl border border-white/8 bg-bg-main/30 p-5 opacity-80"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-text-muted">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium text-text-muted">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  Future Premium
                </span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-text-main">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
