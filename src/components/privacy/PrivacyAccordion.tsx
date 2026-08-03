import { privacySections } from '../../data/privacySections'
import PrivacyAccordionItem from './PrivacyAccordionItem'

interface PrivacyAccordionProps {
  expandedIds: Set<string>
  onToggle: (id: string) => void
  expandAllMode: boolean
  onToggleExpandAll: () => void
  liveMessage: string
}

export default function PrivacyAccordion({
  expandedIds,
  onToggle,
  expandAllMode,
  onToggleExpandAll,
  liveMessage,
}: PrivacyAccordionProps) {
  return (
    <section className="privacy-accordion mt-10" aria-label="Privacy policy sections">
      <div className="sr-only" aria-live="polite">
        {liveMessage}
      </div>

      <div className="space-y-4">
        {privacySections.map((section) => (
          <PrivacyAccordionItem
            key={section.id}
            section={section}
            expanded={expandedIds.has(section.id)}
            onToggle={() => onToggle(section.id)}
          />
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="privacy-expand-all min-h-[44px] rounded-xl border border-accent-purple/30 bg-accent-purple/10 px-5 py-2.5 text-sm font-medium text-accent-purple"
          aria-expanded={expandAllMode}
          onClick={onToggleExpandAll}
        >
          {expandAllMode ? 'Collapse policy details' : 'Read full policy details'}
        </button>
      </div>
    </section>
  )
}
