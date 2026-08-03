import { useCallback, useMemo, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import MobilePrivacyNavigation from '../components/privacy/MobilePrivacyNavigation'
import PrivacyAccordion from '../components/privacy/PrivacyAccordion'
import PrivacyConfigurationWarning from '../components/privacy/PrivacyConfigurationWarning'
import PrivacyHero from '../components/privacy/PrivacyHero'
import PrivacyRightSidebar from '../components/privacy/PrivacyRightSidebar'
import PrivacySummary from '../components/privacy/PrivacySummary'
import PrivacyTableOfContents from '../components/privacy/PrivacyTableOfContents'
import PrivacyTrustStrip from '../components/privacy/PrivacyTrustStrip'
import { privacySectionIds } from '../data/privacySections'
import { useActivePrivacySection, useHashNavigation } from '../hooks/useActivePrivacySection'
import { usePrivacyAccordions } from '../hooks/usePrivacyAccordions'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { buildPrivacyStructuredData } from '../utils/privacyStructuredData'

interface PrivacyPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function PrivacyPageContent() {
  const structuredData = useMemo(() => buildPrivacyStructuredData(), [])
  const reducedMotion = useReducedMotion()
  const [liveMessage, setLiveMessage] = useState('')

  usePageMeta({
    title: 'Privacy Policy | Let It Burn',
    description:
      'Learn how Let It Burn handles private notes, drawings, sound preferences, quiz answers, payments, reports, cookies, advertising, and privacy rights.',
    canonicalPath: '/privacy',
    structuredData,
  })

  const {
    expandedIds,
    expandAllMode,
    toggleSection,
    expandSection,
    toggleExpandAll,
    expandAll,
  } = usePrivacyAccordions(window.location.hash)

  const activeSection = useActivePrivacySection(privacySectionIds)

  const navigateToSection = useCallback(
    (sectionId: string) => {
      expandSection(sectionId)
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
        window.history.replaceState(null, '', `#${sectionId}`)
      }
    },
    [expandSection, reducedMotion],
  )

  useHashNavigation((hash) => {
    expandSection(hash)
  })

  const handleToggleSection = useCallback(
    (id: string) => {
      toggleSection(id)
      setLiveMessage(expandedIds.has(id) ? 'Privacy section collapsed' : 'Privacy section expanded')
    },
    [expandedIds, toggleSection],
  )

  const handleToggleExpandAll = useCallback(() => {
    if (expandAllMode) {
      toggleExpandAll()
      setLiveMessage('Policy sections collapsed')
    } else {
      expandAll()
      setLiveMessage('All policy sections expanded')
      navigateToSection('privacy-promise')
    }
  }, [expandAll, expandAllMode, navigateToSection, toggleExpandAll])

  return (
    <main
      className={`privacy-page relative py-8 md:py-12 ${
        reducedMotion ? 'privacy-page--reduced' : ''
      }`}
    >
      <div className="privacy-page-glow" aria-hidden="true" />

      <div className="content-container relative z-[1] mx-auto max-w-[1480px]">
        <PrivacyConfigurationWarning />
        <PrivacyHero />
        <PrivacySummary />

        <MobilePrivacyNavigation
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />

        <div className="privacy-layout mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_280px] xl:gap-10">
          <PrivacyTableOfContents
            activeSection={activeSection}
            onNavigate={navigateToSection}
          />

          <div className="privacy-main min-w-0">
            <PrivacyAccordion
              expandedIds={expandedIds}
              onToggle={handleToggleSection}
              expandAllMode={expandAllMode}
              onToggleExpandAll={handleToggleExpandAll}
              liveMessage={liveMessage}
            />

            <div className="privacy-mobile-trust mt-10 lg:hidden">
              <PrivacyRightSidebar onScrollTo={navigateToSection} layout="stack" />
            </div>

            <PrivacyTrustStrip />
          </div>

          <PrivacyRightSidebar onScrollTo={navigateToSection} layout="sidebar" />
        </div>
      </div>
    </main>
  )
}

export default function PrivacyPage({ theme, onToggleTheme }: PrivacyPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <PrivacyPageContent />
      <Footer />
    </>
  )
}
