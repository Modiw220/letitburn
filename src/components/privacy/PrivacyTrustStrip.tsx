import { getPrivacyIcon } from './privacyUtils'

const trustItems = [
  {
    id: 'privacy-conscious-design',
    title: 'Privacy-conscious design',
    description: 'Sensitive content should be collected only when needed.',
    icon: 'shield-check',
  },
  {
    id: 'secure-handling',
    title: 'Secure handling',
    description: 'Configured services should use appropriate transport and access controls.',
    icon: 'lock',
  },
  {
    id: 'built-with-care',
    title: 'Built with care',
    description: 'Privacy and emotional safety influence product decisions.',
    icon: 'heart',
  },
  {
    id: 'sustainable-access',
    title: 'Sustainable access',
    description: 'Support helps reduce pressure for intrusive monetization.',
    icon: 'leaf',
  },
]

export default function PrivacyTrustStrip() {
  return (
    <section className="privacy-trust-strip mt-16 border-t border-white/8 pt-10 md:mt-20" aria-label="Privacy trust highlights">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {trustItems.map((item) => {
          const Icon = getPrivacyIcon(item.icon)
          return (
            <article
              key={item.id}
              className="privacy-trust-strip-item rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-center"
            >
              <div
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h2 className="mt-4 text-sm font-semibold text-text-main">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
            </article>
          )
        })}
      </div>
      <p className="mt-4 text-center text-xs text-text-muted/80">
        These highlights describe product intentions, not legal guarantees.
      </p>
    </section>
  )
}
