import { ChevronDown } from 'lucide-react'
import type { PrivacySection } from '../../types/privacy'
import PrivacySectionContent from './PrivacySectionContent'
import { getPrivacyIcon, PRIVACY_ACCENT_COLORS } from './privacyUtils'

interface PrivacyAccordionItemProps {
  section: PrivacySection
  expanded: boolean
  onToggle: () => void
}

export default function PrivacyAccordionItem({
  section,
  expanded,
  onToggle,
}: PrivacyAccordionItemProps) {
  const Icon = getPrivacyIcon(section.icon)
  const accent =
    PRIVACY_ACCENT_COLORS[section.accent as keyof typeof PRIVACY_ACCENT_COLORS] ??
    PRIVACY_ACCENT_COLORS.purple
  const panelId = `${section.id}-panel`

  return (
    <section
      id={section.id}
      className="privacy-anchor-section privacy-accordion-item rounded-2xl border border-white/10 bg-bg-card/50"
    >
      <h2 className="sr-only">{section.title}</h2>
      <button
        type="button"
        className="privacy-accordion-trigger flex min-h-[56px] w-full items-start gap-4 rounded-2xl px-4 py-4 text-left md:px-5"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
          style={{ backgroundColor: `${accent}18`, color: accent }}
          aria-hidden="true"
        >
          {section.number}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4 shrink-0" style={{ color: accent }} aria-hidden="true" />
            <span className="font-heading text-lg font-semibold text-text-main">{section.title}</span>
          </span>
          <span className="text-sm text-text-muted">{section.summary}</span>
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-text-muted transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        className={`privacy-accordion-panel overflow-hidden px-4 pb-5 md:px-5 ${
          expanded ? 'block' : 'hidden print:block'
        }`}
        hidden={!expanded}
      >
        <PrivacySectionContent sectionId={section.id} />
      </div>
    </section>
  )
}
