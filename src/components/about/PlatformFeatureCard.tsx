import type { AboutFeature } from '../../types/about'
import { ABOUT_ACCENT_COLORS, getAboutIcon } from './aboutUtils'

interface PlatformFeatureCardProps {
  feature: AboutFeature
}

export default function PlatformFeatureCard({ feature }: PlatformFeatureCardProps) {
  const Icon = getAboutIcon(feature.icon)
  const color = ABOUT_ACCENT_COLORS[feature.accent]

  return (
    <article
      className="about-feature-card flex h-full flex-col rounded-2xl border border-border-card bg-bg-card/60 p-5 md:p-6"
      style={{ boxShadow: `0 0 0 1px ${color}10` }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}18`, color }}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-text-main">{feature.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{feature.description}</p>
    </article>
  )
}
