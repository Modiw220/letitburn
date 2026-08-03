import { ShieldCheck } from 'lucide-react'
import { privacySections } from '../../data/privacySections'
import { getPrivacyIcon, PRIVACY_ACCENT_COLORS } from './privacyUtils'

interface PrivacyTableOfContentsProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export default function PrivacyTableOfContents({
  activeSection,
  onNavigate,
}: PrivacyTableOfContentsProps) {
  return (
    <aside className="privacy-toc hidden xl:block" aria-label="On this page">
      <div className="privacy-toc-panel sticky top-[96px]">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-text-muted">
          On this page
        </h2>
        <nav className="mt-4">
          <ul className="space-y-1">
            {privacySections.map((section) => {
              const Icon = getPrivacyIcon(section.icon)
              const isActive = activeSection === section.id
              const accent =
                PRIVACY_ACCENT_COLORS[section.accent as keyof typeof PRIVACY_ACCENT_COLORS] ??
                PRIVACY_ACCENT_COLORS.purple

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`privacy-toc-link flex min-h-[44px] items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-accent-purple/10 text-text-main'
                        : 'text-text-muted hover:bg-white/[0.04] hover:text-text-main'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate(section.id)
                    }}
                  >
                    <Icon
                      className="h-4 w-4 shrink-0"
                      style={{ color: isActive ? accent : undefined }}
                      aria-hidden="true"
                    />
                    <span>{section.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="privacy-toc-card mt-6 rounded-2xl border border-accent-purple/20 bg-accent-purple/5 p-4">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-purple/15 text-accent-purple"
            aria-hidden="true"
          >
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-text-main">Your privacy matters.</h3>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">
            We design each tool to collect as little sensitive information as the feature requires.
          </p>
        </div>
      </div>
    </aside>
  )
}
