import { privacySections } from '../../data/privacySections'

interface MobilePrivacyNavigationProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export default function MobilePrivacyNavigation({
  activeSection,
  onNavigate,
}: MobilePrivacyNavigationProps) {
  const activeTitle =
    privacySections.find((section) => section.id === activeSection)?.title ?? 'Jump to a section'

  return (
    <div className="privacy-mobile-nav sticky top-[78px] z-20 -mx-[var(--spacing-section-x-mobile)] border-b border-white/10 bg-bg-main/95 px-[var(--spacing-section-x-mobile)] py-3 backdrop-blur-md xl:hidden">
      <label htmlFor="privacy-section-select" className="sr-only">
        Jump to a section
      </label>
      <select
        id="privacy-section-select"
        className="min-h-[44px] w-full rounded-xl border border-white/10 bg-bg-card/80 px-4 py-2.5 text-sm text-text-main"
        value={activeSection}
        onChange={(event) => onNavigate(event.target.value)}
        aria-label={`Jump to a section. Current section: ${activeTitle}`}
      >
        <option value="" disabled>
          Jump to a section
        </option>
        {privacySections.map((section) => (
          <option key={section.id} value={section.id}>
            {section.number}. {section.title}
          </option>
        ))}
      </select>
    </div>
  )
}
