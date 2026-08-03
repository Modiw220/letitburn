import type { DonationTierAccent } from '../../types/donations'
import { IMPACT_ACCENT_COLORS, getImpactIcon } from './supportUtils'

interface ImpactCardProps {
  icon: string
  title: string
  text: string
  accent: DonationTierAccent
}

export default function ImpactCard({ icon, title, text, accent }: ImpactCardProps) {
  const Icon = getImpactIcon(icon)
  const color = IMPACT_ACCENT_COLORS[accent]

  return (
    <article
      className="support-impact-card flex h-full flex-col rounded-2xl border border-border-card bg-bg-card/70 p-6"
      style={{ boxShadow: `0 0 0 1px ${color}12` }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}18`, color }}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-text-main">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{text}</p>
    </article>
  )
}
