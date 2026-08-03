import { ArrowRight, AudioLines, Heart, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CompletionActionsProps {
  onWriteAnother: () => void
}

const nextActions = [
  {
    id: 'sounds',
    title: 'White Noise',
    description: 'Settle into a calming sound.',
    action: 'Play White Noise',
    href: '/sounds',
    isExternal: false,
    icon: AudioLines,
    accent: 'text-calm-cyan bg-calm-cyan/10 border-calm-cyan/20',
    linkColor: 'text-calm-cyan',
  },
  {
    id: 'drawing',
    title: 'Relaxing Drawing',
    description: 'Let your hands slow your thoughts.',
    action: 'Start Drawing',
    href: '/relaxing-drawing',
    isExternal: false,
    icon: Palette,
    accent: 'text-accent-purple bg-accent-purple/10 border-accent-purple/20',
    linkColor: 'text-accent-purple',
  },
  {
    id: 'support',
    title: 'Support This Space',
    description: 'Help keep these tools free and private.',
    action: 'Support Us',
    href: '/#support',
    isExternal: true,
    icon: Heart,
    accent: 'text-support-gold bg-support-gold/10 border-support-gold/20',
    linkColor: 'text-support-gold',
  },
] as const

export default function CompletionActions({
  onWriteAnother,
}: CompletionActionsProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="completion-check mx-auto mb-6" aria-hidden="true">
        <span className="completion-check-inner" />
      </div>

      <h2 className="font-heading text-3xl font-semibold text-text-main md:text-4xl">
        It&apos;s gone. Take a breath.
      </h2>
      <p className="mt-3 text-lg text-text-muted">
        You made space for something lighter.
      </p>

      <button
        type="button"
        onClick={onWriteAnother}
        className="btn-primary-glow mt-8 inline-flex min-h-[54px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-fire-orange to-bright-orange px-8 py-3.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
      >
        Write Another Note
      </button>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {nextActions.map((item) => {
          const Icon = item.icon
          const cardClassName =
            'group flex flex-col rounded-2xl border border-border-card bg-bg-card p-5 text-left transition-all hover:-translate-y-1 hover:border-white/20'

          const inner = (
            <>
              <span
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border ${item.accent}`}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="font-heading text-base font-semibold text-text-main">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-text-muted">
                {item.description}
              </p>
              <span
                className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${item.linkColor}`}
              >
                {item.action}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </>
          )

          return item.isExternal ? (
            <a key={item.id} href={item.href} className={cardClassName}>
              {inner}
            </a>
          ) : (
            <Link key={item.id} to={item.href} className={cardClassName}>
              {inner}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
