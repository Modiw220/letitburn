import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ToolCardData } from '../../data/tools'

const accentStyles = {
  orange: {
    iconBg: 'bg-fire-orange/15',
    iconColor: 'text-fire-orange',
    border: 'border-fire-orange/25 hover:border-fire-orange/50',
    glow: 'hover:shadow-[0_8px_32px_rgba(255,106,0,0.15)]',
    link: 'text-fire-orange',
  },
  purple: {
    iconBg: 'bg-accent-purple/15',
    iconColor: 'text-accent-purple',
    border: 'border-accent-purple/25 hover:border-accent-purple/50',
    glow: 'hover:shadow-[0_8px_32px_rgba(154,104,245,0.15)]',
    link: 'text-accent-purple',
  },
  cyan: {
    iconBg: 'bg-calm-cyan/15',
    iconColor: 'text-calm-cyan',
    border: 'border-calm-cyan/25 hover:border-calm-cyan/50',
    glow: 'hover:shadow-[0_8px_32px_rgba(70,202,212,0.15)]',
    link: 'text-calm-cyan',
  },
  blue: {
    iconBg: 'bg-accent-blue/15',
    iconColor: 'text-accent-blue',
    border: 'border-accent-blue/25 hover:border-accent-blue/50',
    glow: 'hover:shadow-[0_8px_32px_rgba(102,138,255,0.15)]',
    link: 'text-accent-blue',
  },
} as const

interface ToolCardProps {
  tool: ToolCardData
}

export default function ToolCard({ tool }: ToolCardProps) {
  const styles = accentStyles[tool.accent]
  const Icon = tool.icon

  return (
    <Link
      to={tool.href}
      className={`group flex min-h-[250px] flex-col rounded-2xl border bg-bg-card p-7 transition-all duration-300 hover:-translate-y-1 ${styles.border} ${styles.glow} focus-visible:-translate-y-1`}
    >
      <span
        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full ${styles.iconBg}`}
        aria-hidden="true"
      >
        <Icon className={`h-6 w-6 ${styles.iconColor}`} strokeWidth={1.75} />
      </span>

      <h3 className="font-heading text-xl font-semibold text-text-main">
        {tool.title}
      </h3>

      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-muted">
        {tool.description}
      </p>

      <span
        className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5 ${styles.link}`}
      >
        {tool.linkText}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  )
}
